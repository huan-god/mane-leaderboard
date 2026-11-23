import {canonicalCharacterKey, canonicalDisplayName} from './arcanists.js';

const beijingDate = new Intl.DateTimeFormat('sv-SE', {timeZone: 'Asia/Shanghai', dateStyle: 'short'});
const beijingDateTime = new Intl.DateTimeFormat('sv-SE', {
  timeZone: 'Asia/Shanghai', dateStyle: 'short', timeStyle: 'medium'
});

export function todayInBeijing() {
  return beijingDate.format(new Date());
}

export function beijingTime(value) {
  return value ? beijingDateTime.format(new Date(value)) : '';
}

export function beijingDayRange(day) {
  const start = new Date(`${day}T00:00:00+08:00`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day) || !Number.isFinite(start.getTime()) ||
    beijingDate.format(start) !== day) throw new Error('请选择有效日期。');
  const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);
  return [start.toISOString(), end.toISOString()];
}

export function rankManeCarryTotals(totals, section, edition, division, mapIds) {
  const mergedByChar = new Map();
  for (const row of totals) {
    if (row.section !== section || row.edition !== edition || row.division !== division) continue;
    const key = canonicalCharacterKey(row.carry_name);
    let bucket = mergedByChar.get(key);
    if (!bucket) {
      bucket = {key, carry_name: canonicalDisplayName(row.carry_name), rawNames: new Set(), mapBest: new Map()};
      mergedByChar.set(key, bucket);
    }
    bucket.rawNames.add(row.carry_name);
    for (const map of row.map_scores || []) {
      if (mapIds && !mapIds.has(map.map_id)) continue;
      const mapKey = map.map_id || map.name;
      const previous = bucket.mapBest.get(mapKey);
      if (!previous || BigInt(map.score || 0) > BigInt(previous.score || 0)) bucket.mapBest.set(mapKey, map);
    }
  }
  return [...mergedByChar.values()]
    .filter((bucket) => bucket.mapBest.size)
    .map((bucket) => {
      const mapScores = [...bucket.mapBest.values()].sort((a, b) => {
        const diff = BigInt(b.score || 0) - BigInt(a.score || 0);
        return diff > 0n ? 1 : diff < 0n ? -1 : String(a.name).localeCompare(String(b.name), 'zh-CN');
      });
      return {
        carry_key: bucket.key,
        carry_name: bucket.carry_name,
        mergedAliases: bucket.rawNames.size > 1 ? [...bucket.rawNames] : [],
        map_count: mapScores.length,
        map_scores: mapScores,
        total: mapScores.reduce((sum, map) => sum + BigInt(map.score || 0), 0n)
      };
    })
    .sort((a, b) => {
      if (a.total !== b.total) return a.total > b.total ? -1 : 1;
      return (b.map_count - a.map_count) ||
        String(a.carry_name).localeCompare(String(b.carry_name), 'zh-CN') ||
        String(a.carry_key).localeCompare(String(b.carry_key));
    });
}

function excelScore(score) {
  const value = BigInt(score);
  // Excel rounds numeric cells beyond 15 significant digits.
  return value <= 999999999999999n ? Number(value) : value.toString();
}

let sheetJs;
function loadWorkbookWriter() {
  if (!sheetJs) {
    sheetJs = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = new URL('./xlsx-0.20.3.min.js', import.meta.url).href;
      script.onload = () => {
        if (window.XLSX?.writeFileXLSX) resolve(window.XLSX);
        else reject(new Error('Excel 导出组件无法启动，请重试。'));
      };
      script.onerror = () => {
        script.remove();
        reject(new Error('Excel 导出组件暂时无法加载，请重试。'));
      };
      document.head.append(script);
    }).catch((error) => {
      sheetJs = undefined;
      throw error;
    });
  }
  return sheetJs;
}

export async function exportManeWorkbook({date, divisions, maps, dailyRows, totals, divisionLabels, sectionLabels, canDownload}) {
  const XLSX = await loadWorkbookWriter();
  const workbook = XLSX.utils.book_new();
  const mapById = new Map(maps.map((map) => [map.id, map]));
  const addSheet = (name, headers, values, widths) => {
    const sheet = XLSX.utils.aoa_to_sheet([headers, ...values]);
    sheet['!cols'] = widths.map((wch) => ({wch}));
    sheet['!autofilter'] = {ref: sheet['!ref']};
    XLSX.utils.book_append_sheet(workbook, sheet, name);
  };

  if (dailyRows !== null) {
    const headers = ['通过时间（北京时间）', '版本', '分区', '关卡', '塑造', '玩家昵称', '主 C', '阵容', '积分', '相关链接'];
    const values = dailyRows.map((row) => {
      const map = mapById.get(row.map_id);
      return [beijingTime(row.approved_at), map?.edition, sectionLabels[map?.section], map?.name,
        divisionLabels[row.division], row.display_name, row.carry,
        (row.team || []).join('、'), excelScore(row.score), row.related_url || ''];
    });
    addSheet('每日新分', headers, values, [24,12,16,22,14,22,26,48,18,40]);
  }

  if (totals !== null) {
    const mapIds = new Set(maps.map((map) => map.id));
    const groups = new Map();
    for (const map of maps) {
      const edition = map.section === 'new' ? map.edition : '';
      groups.set(`${map.section}/${edition}`, {section: map.section, edition});
    }
    const values = [];
    for (const {section, edition} of groups.values()) {
      for (const division of divisions) {
        const ranks = rankManeCarryTotals(totals, section, edition, division, mapIds);
        for (const [index, row] of ranks.entries()) {
          const byMap = new Map(row.map_scores.map((map) => [map.map_id, excelScore(map.score)]));
          values.push([index + 1, sectionLabels[section], edition, divisionLabels[division],
            row.carry_name, excelScore(row.total), row.map_count, ...maps.map((map) => byMap.get(map.id) ?? null)]);
        }
      }
    }
    addSheet('主 C 总计', ['排名','分区','版本','塑造','主 C','总积分','关卡数',
      ...maps.map((map) => `${map.edition} · ${map.name}`)],
    values, [10,16,12,14,26,18,10,...maps.map(() => 25)]);
  }
  if (canDownload()) XLSX.writeFileXLSX(workbook, `鬃毛邮报-${date}.xlsx`, {compression: true});
}
