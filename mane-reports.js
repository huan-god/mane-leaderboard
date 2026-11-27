import * as arcanists from './arcanists.js';
import * as i18n from './i18n.js';

const beijingDate = new Intl.DateTimeFormat('sv-SE', {timeZone: 'Asia/Shanghai', dateStyle: 'short'});
const beijingDateTime = new Intl.DateTimeFormat('sv-SE', {
  timeZone: 'Asia/Shanghai', dateStyle: 'short', timeStyle: 'medium'
});

function resolveLang(lang) {
  if (lang === 'en' || lang === 'zh') return lang;
  if (typeof lang === 'string' && lang.trim()) {
    return lang.trim().toLowerCase().startsWith('zh') ? 'zh' : 'en';
  }
  if (typeof i18n.getLang === 'function') return i18n.getLang();
  if (typeof document !== 'undefined' && document.body?.dataset?.lang === 'zh') return 'zh';
  return 'en';
}

function checkEn(lang) {
  const active = resolveLang(lang);
  if (typeof i18n.isEn === 'function') return i18n.isEn(active);
  return active !== 'zh';
}

function safeCanonicalCharacterKey(raw) {
  if (typeof arcanists.canonicalCharacterKey === 'function') {
    return arcanists.canonicalCharacterKey(raw);
  }
  return String(raw ?? '').normalize('NFKC').trim().toLowerCase();
}

function safeCanonicalDisplayName(raw) {
  if (typeof arcanists.canonicalDisplayName === 'function') {
    return arcanists.canonicalDisplayName(raw);
  }
  return String(raw ?? '').trim();
}

function safeDisplayCharacterName(raw, lang) {
  if (typeof arcanists.displayCharacterName === 'function') {
    return arcanists.displayCharacterName(raw, lang);
  }
  return safeCanonicalDisplayName(raw);
}

function safeDisplayCarryNames(carryStr, lang) {
  if (typeof arcanists.displayCarryNames === 'function') {
    return arcanists.displayCarryNames(carryStr, lang);
  }
  const text = String(carryStr ?? '').trim();
  if (!text) return '';
  const sep = checkEn(lang) ? ' / ' : '/';
  return text
    .split(/[/／、,+＋]+/)
    .map((part) => safeDisplayCharacterName(part, lang))
    .filter(Boolean)
    .join(sep);
}

function safeDisplayBossName(cnName, lang) {
  if (typeof arcanists.displayBossName === 'function') {
    return arcanists.displayBossName(cnName, lang);
  }
  const text = String(cnName ?? '').trim();
  if (!text) return '';
  if (checkEn(lang) && typeof arcanists.resolveBossSubtitle === 'function') {
    return arcanists.resolveBossSubtitle(text) || text;
  }
  return text;
}

function safeLocalizeDivision(code, divisionLabels, lang) {
  const active = resolveLang(lang);
  if (checkEn(active)) {
    if (typeof i18n.localizeDivision === 'function') {
      const localized = i18n.localizeDivision(code, active);
      if (localized) return localized;
    }
    if (code === 'zero') return 'All P0';
    if (code === 'max') return 'Max Portray';
    return divisionLabels?.[code] || String(code ?? '');
  }
  if (divisionLabels?.[code]) return divisionLabels[code];
  if (typeof i18n.localizeDivision === 'function') {
    const localized = i18n.localizeDivision(code, active);
    if (localized) return localized;
  }
  if (code === 'zero') return '全 0 塑造';
  if (code === 'max') return '全满塑造';
  return String(code ?? '');
}

function safeLocalizeSection(sec, sectionLabels, lang) {
  const active = resolveLang(lang);
  if (checkEn(active)) {
    if (typeof i18n.localizeSection === 'function') {
      const localized = i18n.localizeSection(sec, active);
      if (localized) return localized;
    }
    if (sec === 'new') return "Collector's Edition";
    if (sec === 'rerun') return 'Anomaly Gallery';
    return sectionLabels?.[sec] || String(sec ?? '');
  }
  if (sectionLabels?.[sec]) return sectionLabels[sec];
  if (typeof i18n.localizeSection === 'function') {
    const localized = i18n.localizeSection(sec, active);
    if (localized) return localized;
  }
  if (sec === 'new') return '鉴藏者特版';
  if (sec === 'rerun') return '怪相档案';
  return String(sec ?? '');
}

function invalidDateError(lang) {
  return new Error(checkEn(lang) ? 'Please select a valid date.' : '请选择有效日期。');
}

export function todayInBeijing() {
  return beijingDate.format(new Date());
}

export function shiftBeijingDay(day, deltaDays, lang = resolveLang()) {
  const anchor = new Date(`${day}T12:00:00+08:00`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day) || !Number.isFinite(anchor.getTime()) ||
    beijingDate.format(anchor) !== day) throw invalidDateError(lang);
  return beijingDate.format(new Date(anchor.getTime() + deltaDays * 24 * 60 * 60 * 1000));
}

export function beijingTime(value) {
  if (!value) return '';
  const date = value instanceof Date ? value : new Date(value);
  return Number.isFinite(date.getTime()) ? beijingDateTime.format(date) : '';
}

export function formatApprovedTime(value, lang = resolveLang(), options = {}) {
  const fullText = beijingTime(value);
  if (!fullText) return '';
  const showFull = options === true || Boolean(options?.full);
  if (showFull) return fullText;
  const timePart = fullText.split(' ')[1];
  return timePart || fullText;
}

export function beijingDayRange(day, lang = resolveLang()) {
  const start = new Date(`${day}T00:00:00+08:00`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day) || !Number.isFinite(start.getTime()) ||
    beijingDate.format(start) !== day) throw invalidDateError(lang);
  const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);
  return [start.toISOString(), end.toISOString()];
}

export function latestOfflineDailyDate(allDailyRows) {
  if (!Array.isArray(allDailyRows) || allDailyRows.length === 0) return todayInBeijing();
  let latest = '';
  for (const row of allDailyRows) {
    if (!row?.approved_at) continue;
    const date = new Date(row.approved_at);
    if (!Number.isFinite(date.getTime())) continue;
    const day = beijingDate.format(date);
    if (!latest || day > latest) latest = day;
  }
  return latest || todayInBeijing();
}

export function filterOfflineDailyRows(allDailyRows, {date, division = '', mapIds = []} = {}) {
  if (!Array.isArray(allDailyRows)) return [];
  const targetDate = date || latestOfflineDailyDate(allDailyRows);
  const [startIso, endIso] = beijingDayRange(targetDate);
  const startMs = Date.parse(startIso);
  const endMs = Date.parse(endIso);
  const mapIdSet = mapIds instanceof Set
    ? mapIds
    : (Array.isArray(mapIds) ? new Set(mapIds.filter(Boolean)) : null);
  const filterByMap = Boolean(mapIdSet && mapIdSet.size > 0);
  const targetDivision = String(division ?? '').trim();

  return allDailyRows
    .filter((row) => {
      if (!row?.approved_at) return false;
      const ms = Date.parse(row.approved_at);
      if (!Number.isFinite(ms) || ms < startMs || ms >= endMs) return false;
      if (targetDivision && row.division !== targetDivision) return false;
      if (filterByMap && !mapIdSet.has(row.map_id)) return false;
      return true;
    })
    .sort((a, b) => {
      const diff = Date.parse(b.approved_at) - Date.parse(a.approved_at);
      if (diff !== 0) return diff;
      return String(a.id ?? '').localeCompare(String(b.id ?? ''));
    });
}

export function rankManeCarryTotals(totals, section, edition, division, mapIds, lang = resolveLang()) {
  const activeLang = resolveLang(lang);
  const locale = checkEn(activeLang) ? 'en' : 'zh-CN';
  const mapIdSet = mapIds instanceof Set
    ? mapIds
    : (Array.isArray(mapIds) ? new Set(mapIds) : null);

  const mergedByChar = new Map();
  for (const row of totals || []) {
    if (row.section !== section || row.edition !== edition || row.division !== division) continue;
    const key = safeCanonicalCharacterKey(row.carry_name);
    let bucket = mergedByChar.get(key);
    if (!bucket) {
      bucket = {
        key,
        carry_name: safeDisplayCharacterName(row.carry_name, activeLang),
        carry_cn: safeCanonicalDisplayName(row.carry_name),
        rawNames: new Set(),
        mapBest: new Map()
      };
      mergedByChar.set(key, bucket);
    }
    bucket.rawNames.add(row.carry_name);
    for (const map of row.map_scores || []) {
      if (mapIdSet && !mapIdSet.has(map.map_id)) continue;
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
        if (diff !== 0n) return diff > 0n ? 1 : -1;
        const nameA = safeDisplayBossName(a.name, activeLang);
        const nameB = safeDisplayBossName(b.name, activeLang);
        return String(nameA).localeCompare(String(nameB), locale);
      });
      return {
        carry_key: bucket.key,
        carry_name: bucket.carry_name,
        carry_cn: bucket.carry_cn,
        mergedAliases: bucket.rawNames.size > 1 ? [...bucket.rawNames] : [],
        map_count: mapScores.length,
        map_scores: mapScores,
        total: mapScores.reduce((sum, map) => sum + BigInt(map.score || 0), 0n)
      };
    })
    .sort((a, b) => {
      if (a.total !== b.total) return a.total > b.total ? -1 : 1;
      return (b.map_count - a.map_count) ||
        String(a.carry_name).localeCompare(String(b.carry_name), locale) ||
        String(a.carry_key).localeCompare(String(b.carry_key));
    });
}

function excelScore(score) {
  const value = BigInt(score);
  // Excel rounds numeric cells beyond 15 significant digits.
  return value <= 999999999999999n ? Number(value) : value.toString();
}

function safeExcelText(value) {
  const text = String(value ?? '');
  return /^[\s]*[=+\-@\t\r]/.test(text) ? `'${text}` : text;
}

function resolveXlsxScriptUrl() {
  try {
    if (typeof import.meta !== 'undefined' && import.meta.url) {
      return new URL('./xlsx-0.20.3.min.js', import.meta.url).href;
    }
  } catch {
    // Fallback for bundled IIFE / file:// contexts without import.meta.url
  }
  return './xlsx-0.20.3.min.js';
}

let sheetJs;
function loadWorkbookWriter(lang = resolveLang()) {
  if (typeof window !== 'undefined' && window.XLSX?.writeFileXLSX) {
    return Promise.resolve(window.XLSX);
  }
  const en = checkEn(lang);
  if (!sheetJs) {
    sheetJs = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = resolveXlsxScriptUrl();
      script.onload = () => {
        if (window.XLSX?.writeFileXLSX) resolve(window.XLSX);
        else reject(new Error(en
          ? 'Unable to initialize the Excel export component. Please try again.'
          : 'Excel 导出组件无法启动，请重试。'));
      };
      script.onerror = () => {
        script.remove();
        reject(new Error(en
          ? 'Unable to load the Excel export component right now. Please try again.'
          : 'Excel 导出组件暂时无法加载，请重试。'));
      };
      document.head.append(script);
    }).catch((error) => {
      sheetJs = undefined;
      throw error;
    });
  }
  return sheetJs;
}

export async function exportManeWorkbook({
  date,
  divisions,
  maps,
  dailyRows,
  totals,
  divisionLabels = {},
  sectionLabels = {},
  canDownload,
  lang = resolveLang()
}) {
  const activeLang = resolveLang(lang);
  const en = checkEn(activeLang);
  const XLSX = await loadWorkbookWriter(activeLang);
  const workbook = XLSX.utils.book_new();
  const mapById = new Map((maps || []).map((map) => [map.id, map]));
  const addSheet = (name, headers, values, widths) => {
    const sheet = XLSX.utils.aoa_to_sheet([headers, ...values]);
    sheet['!cols'] = widths.map((wch) => ({wch}));
    sheet['!autofilter'] = {ref: sheet['!ref']};
    XLSX.utils.book_append_sheet(workbook, sheet, name);
  };

  if (dailyRows !== null) {
    if (en) {
      const headers = ['Approved (UTC+8)', 'Version', 'Edition', 'Boss', 'Portray', 'Timekeeper', 'Main DPS', 'Lineup', 'Score', 'Link'];
      const values = dailyRows.map((row) => {
        const map = mapById.get(row.map_id);
        const lineup = (row.team || []).map((n) => safeDisplayCharacterName(n, 'en')).join(', ');
        return [
          beijingTime(row.approved_at),
          safeExcelText(map?.edition),
          safeExcelText(safeLocalizeSection(map?.section, sectionLabels, 'en')),
          safeExcelText(safeDisplayBossName(map?.name, 'en')),
          safeExcelText(safeLocalizeDivision(row.division, divisionLabels, 'en')),
          safeExcelText(row.display_name),
          safeExcelText(safeDisplayCarryNames(row.carry, 'en')),
          safeExcelText(lineup),
          excelScore(row.score),
          safeExcelText(row.related_url || '')
        ];
      });
      addSheet('Daily Scores', headers, values, [24, 12, 20, 30, 14, 22, 26, 52, 18, 40]);
    } else {
      const headers = ['通过时间（北京时间）', '版本', '分区', '关卡', '塑造', '玩家昵称', '主 C', '阵容', '积分', '相关链接'];
      const values = dailyRows.map((row) => {
        const map = mapById.get(row.map_id);
        return [
          beijingTime(row.approved_at),
          safeExcelText(map?.edition),
          safeExcelText(safeLocalizeSection(map?.section, sectionLabels, 'zh')),
          safeExcelText(map?.name),
          safeExcelText(safeLocalizeDivision(row.division, divisionLabels, 'zh')),
          safeExcelText(row.display_name),
          safeExcelText(row.carry),
          safeExcelText((row.team || []).join('、')),
          excelScore(row.score),
          safeExcelText(row.related_url || '')
        ];
      });
      addSheet('每日新分', headers, values, [24, 12, 16, 22, 14, 22, 26, 48, 18, 40]);
    }
  }

  if (totals !== null) {
    const mapIds = new Set((maps || []).map((map) => map.id));
    const groups = new Map();
    for (const map of maps || []) {
      const edition = map.section === 'new' ? map.edition : '';
      groups.set(`${map.section}/${edition}`, {section: map.section, edition});
    }
    const values = [];
    for (const {section, edition} of groups.values()) {
      for (const division of divisions || []) {
        const ranks = rankManeCarryTotals(totals, section, edition, division, mapIds, activeLang);
        for (const [index, row] of ranks.entries()) {
          const byMap = new Map(row.map_scores.map((map) => [map.map_id, excelScore(map.score)]));
          values.push([
            index + 1,
            safeExcelText(safeLocalizeSection(section, sectionLabels, activeLang)),
            safeExcelText(edition),
            safeExcelText(safeLocalizeDivision(division, divisionLabels, activeLang)),
            safeExcelText(row.carry_name),
            excelScore(row.total),
            row.map_count,
            ...(maps || []).map((map) => byMap.get(map.id) ?? null)
          ]);
        }
      }
    }
    if (en) {
      addSheet(
        'Carry Totals',
        ['Rank', 'Edition', 'Version', 'Portray', 'Main DPS', 'Total Score', 'Bosses',
          ...(maps || []).map((map) => safeExcelText(`${map.edition} · ${safeDisplayBossName(map.name, 'en')}`))],
        values,
        [10, 20, 12, 14, 26, 18, 10, ...(maps || []).map(() => 28)]
      );
    } else {
      addSheet(
        '主 C 总计',
        ['排名', '分区', '版本', '塑造', '主 C', '总积分', '关卡数',
          ...(maps || []).map((map) => safeExcelText(`${map.edition} · ${map.name}`))],
        values,
        [10, 16, 12, 14, 26, 18, 10, ...(maps || []).map(() => 25)]
      );
    }
  }

  const filename = en ? `Manes-Bulletin-${date}.xlsx` : `鬃毛邮报-${date}.xlsx`;
  if (typeof canDownload !== 'function' || canDownload()) {
    XLSX.writeFileXLSX(workbook, filename, {compression: true});
  }
}
