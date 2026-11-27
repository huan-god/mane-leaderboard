// Reverse: 1999 Global & CN Bilingual i18n Engine (ZH default, split JSON packs + instant EN/ZH toggle)
// Pure ESM module with zero internal dependencies to avoid circular imports.

const LANG_STORAGE_KEY = 'r1999-lang';

let currentLang = null;

function normalizeLang(raw) {
  const val = String(raw ?? '').trim().toLowerCase();
  if (!val) return null;
  if (val === 'zh' || val.startsWith('zh-') || val === 'cn' || val === 'zh_cn') return 'zh';
  if (val === 'en' || val.startsWith('en-')) return 'en';
  return null;
}

function applyLangToDom(lang) {
  if (typeof document === 'undefined') return;
  try {
    if (document.documentElement) {
      document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    }
    if (document.body) {
      document.body.dataset.lang = lang;
    }
  } catch {
    // Ignore DOM access issues in restricted contexts
  }
}

function readUrlLang() {
  if (typeof location === 'undefined') return null;
  try {
    const params = new URLSearchParams(location.search || '');
    const fromSearch = normalizeLang(params.get('lang'));
    if (fromSearch) return fromSearch;
  } catch {
    // Ignore URL parsing issues
  }
  return null;
}

function readStoredLang() {
  if (typeof window === 'undefined') return null;
  try {
    return normalizeLang(window.localStorage?.getItem(LANG_STORAGE_KEY));
  } catch {
    return null;
  }
}

function readNavigatorLang() {
  if (typeof navigator === 'undefined') return null;
  const list = Array.isArray(navigator.languages) && navigator.languages.length
    ? navigator.languages
    : [navigator.language];
  for (const item of list) {
    const matched = normalizeLang(item);
    if (matched) return matched;
  }
  return null;
}

function resolveDefaultSetting(raw) {
  if (String(raw ?? '').trim().toLowerCase() === 'auto') {
    return readNavigatorLang() || 'zh';
  }
  return normalizeLang(raw);
}

export function initLang() {
  const fromUrl = readUrlLang();
  const fromStorage = readStoredLang();
  const fromDom = typeof document !== 'undefined'
    ? resolveDefaultSetting(document.documentElement?.dataset?.defaultLang)
    : null;
  const fromConfig = resolveDefaultSetting(globalThis.LEADERBOARD_CONFIG?.defaultLang);

  const resolved = fromUrl || fromStorage || fromDom || fromConfig || 'zh';
  currentLang = resolved;
  applyLangToDom(resolved);
  return resolved;
}

export function getLang() {
  if (!currentLang) return initLang();
  return currentLang;
}

export function setLang(lang) {
  const normalized = normalizeLang(lang) || 'zh';
  currentLang = normalized;
  if (typeof window !== 'undefined') {
    try {
      window.localStorage?.setItem(LANG_STORAGE_KEY, normalized);
    } catch {
      // Ignore storage quota / file:// privacy restrictions
    }
  }
  applyLangToDom(normalized);
  return normalized;
}

export function isEn(lang = getLang()) {
  return (normalizeLang(lang) || getLang()) === 'en';
}


const FALLBACK_DICTS = {
  en: {
    brandTitleMane: "Mane's Bulletin · Global Archive",
    brandTitleFb: 'Focused Flashback · Speedrun Archive',
    brandSub: 'REVERSE: 1999 · COMMUNITY LEADERBOARD',
    statusSyncing: 'Syncing Archive…',
    emptyTitleLoading: 'Syncing live leaderboard…',
    offlineSyncFail: 'Unable to reach live archive. Check network or retry.',
    btnSyncLive: 'Sync Live',
    langToggleAria: 'Switch language between English and Chinese'
  },
  zh: {
    brandTitleMane: '鬃毛邮报 · 调查总榜',
    brandTitleFb: '焦点闪回 · 纪录档案',
    brandSub: 'REVERSE: 1999 · COMMUNITY ARCHIVE',
    statusSyncing: '同步档案库…',
    emptyTitleLoading: '正在同步最新榜单数据…',
    offlineSyncFail: '实时数据库暂时无法连接，请检查网络或点击同步。',
    btnSyncLive: '同步在线库',
    langToggleAria: '切换中英文界面'
  }
};

export const DICTS = {
  en: { ...FALLBACK_DICTS.en },
  zh: { ...FALLBACK_DICTS.zh }
};

export function registerDict(lang, entries) {
  const norm = normalizeLang(lang);
  if (!norm || !entries || typeof entries !== 'object') return;
  Object.assign(DICTS[norm], entries);
}

export function t(key, vars = {}, lang = getLang()) {
  const active = normalizeLang(lang) || getLang();
  if (active === 'en' && vars && typeof vars === 'object') {
    if ((key === 'roundsFull' || key === 'turnsUnit') && vars.n !== undefined && Number(vars.n) === 1) {
      return '1 Round';
    }
    if (key === 'countUnit' && vars.n !== undefined && Number(vars.n) === 1) {
      return '1 entry';
    }
    if (key === 'rowResCodesCount' && vars.n !== undefined && Number(vars.n) === 1) {
      return '1 Res Code';
    }
    if (key === 'totalsBreakdownSummary' && vars.count !== undefined && Number(vars.count) === 1) {
      return '1 boss tallied';
    }
    if (key === 'dailyCountFoot' && vars.n !== undefined && Number(vars.n) === 1) {
      return `1 approved record on ${vars.date ?? '{date}'}`;
    }
    if (key === 'playersExpandRecords' && vars.n !== undefined && Number(vars.n) === 1) {
      return 'View 1 held record ▾';
    }
    if (key === 'posterCopyAllRes' && vars.n !== undefined && Number(vars.n) === 1) {
      return 'Copy Resonance Code (1)';
    }
    if (key === 'posterCopiedAllRes' && vars.n !== undefined && Number(vars.n) === 1) {
      return 'Copied 1 Resonance Code.';
    }
  }
  const val = DICTS[active]?.[key] ?? FALLBACK_DICTS[active]?.[key] ?? DICTS.zh?.[key] ?? DICTS.en?.[key] ?? key;
  if (typeof val !== 'string') return val;
  if (!vars || typeof vars !== 'object') return val;
  return val.replace(/\{([a-zA-Z0-9_]+)\}/g, (match, name) => (
    vars[name] !== undefined && vars[name] !== null ? String(vars[name]) : match
  ));
}

// ==================== Plural-Aware Count Formatters ====================

export function formatRounds(n, lang = getLang()) {
  if (isEn(lang)) {
    return Number(n) === 1 ? '1 Round' : `${n} Rounds`;
  }
  return `${n} 回合`;
}

export function formatEntries(n, lang = getLang()) {
  if (isEn(lang)) {
    return Number(n) === 1 ? '1 entry' : `${n} entries`;
  }
  return `${n} 条`;
}

export function formatBossCount(n, lang = getLang()) {
  if (isEn(lang)) {
    return Number(n) === 1 ? '1 boss' : `${n} bosses`;
  }
  return `${n} 图`;
}

// ==================== Locale Formatters ====================

const EN_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function toValidDate(time) {
  if (!time) return null;
  const d = time instanceof Date ? time : new Date(time);
  return Number.isNaN(d.getTime()) ? null : d;
}

function pad2(n) {
  return String(n).padStart(2, '0');
}

export function formatScore(score, lang = getLang()) {
  if (score === null || score === undefined || score === '') return '—';
  const locale = isEn(lang) ? 'en-US' : 'zh-CN';
  if (typeof score === 'bigint') return score.toLocaleString(locale);
  const str = String(score).replace(/,/g, '').trim();
  if (!str) return '—';
  if (/^-?\d+$/.test(str)) {
    try {
      return BigInt(str).toLocaleString(locale);
    } catch {
      return Number(str).toLocaleString(locale);
    }
  }
  const num = Number(str);
  return Number.isFinite(num) ? num.toLocaleString(locale) : str;
}

export function formatCompactScore(score, lang = getLang()) {
  if (score === null || score === undefined || score === '') return '—';
  const num = typeof score === 'bigint' ? Number(score) : Number(String(score).replace(/,/g, '').trim());
  if (!Number.isFinite(num)) return '—';
  const abs = Math.abs(num);
  const trimZero = (val, digits) => val.toFixed(digits).replace(/\.0+$/, '').replace(/(\.\d*[1-9])0+$/, '$1');

  if (isEn(lang)) {
    if (abs >= 1e9) return `${trimZero(num / 1e9, 2)}B`;
    if (abs >= 1e6) return `${trimZero(num / 1e6, abs >= 1e7 ? 1 : 2)}M`;
    if (abs >= 1e3) return `${trimZero(num / 1e3, abs >= 1e5 ? 0 : 1)}K`;
    return formatScore(num, 'en');
  }
  if (abs >= 1e8) return `${trimZero(num / 1e8, 2)}亿`;
  if (abs >= 1e4) return `${trimZero(num / 1e4, abs >= 1e6 ? 0 : 1)}万`;
  return formatScore(num, 'zh');
}

export function formatDateTime(time, lang = getLang()) {
  const d = toValidDate(time);
  if (!d) return '—';
  const y = d.getFullYear();
  const m = d.getMonth();
  const day = d.getDate();
  const hh = pad2(d.getHours());
  const mm = pad2(d.getMinutes());
  if (isEn(lang)) {
    return `${EN_MONTHS[m]} ${day}, ${y}, ${hh}:${mm}`;
  }
  return `${y}-${pad2(m + 1)}-${pad2(day)} ${hh}:${mm}`;
}

export function formatMonthDay(time, lang = getLang()) {
  const d = toValidDate(time);
  if (!d) return '—';
  const m = d.getMonth();
  const day = d.getDate();
  if (isEn(lang)) {
    return `${EN_MONTHS[m]} ${day}`;
  }
  return `${pad2(m + 1)}/${pad2(day)}`;
}

export function formatMonthDayTime(time, lang = getLang()) {
  const d = toValidDate(time);
  if (!d) return '—';
  const m = d.getMonth();
  const day = d.getDate();
  const hh = pad2(d.getHours());
  const mm = pad2(d.getMinutes());
  if (isEn(lang)) {
    return `${EN_MONTHS[m]} ${day}, ${hh}:${mm}`;
  }
  return `${m + 1}月${day}日 ${hh}:${mm}`;
}

export function localizeDivision(code, lang = getLang()) {
  const k = String(code ?? '').trim().toLowerCase();
  if (isEn(lang)) {
    if (k === 'zero' || k === 'p0') return 'All P0';
    if (k === 'max' || k === 'p5') return 'Max Portray (P5)';
    if (k === 'all' || k === '') return 'All Divisions';
    return String(code ?? '');
  }
  if (k === 'zero' || k === 'p0') return '全 0 塑造';
  if (k === 'max' || k === 'p5') return '全满塑造';
  if (k === 'all' || k === '') return '全部塑造';
  return String(code ?? '');
}

export function localizeDivisionShort(code, lang = getLang()) {
  const k = String(code ?? '').trim().toLowerCase();
  if (isEn(lang)) {
    if (k === 'zero' || k === 'p0') return 'P0';
    if (k === 'max' || k === 'p5') return 'P5';
    if (k === 'all' || k === '') return 'All';
    return String(code ?? '');
  }
  if (k === 'zero' || k === 'p0') return '全0塑';
  if (k === 'max' || k === 'p5') return '满塑';
  if (k === 'all' || k === '') return '全部';
  return String(code ?? '');
}

export function localizeSection(section, lang = getLang()) {
  const k = String(section ?? '').trim().toLowerCase();
  if (isEn(lang)) {
    if (k === 'new' || k === 'collector') return "Collector's Edition";
    if (k === 'rerun' || k === 'gallery') return 'Anomaly Gallery';
    if (k === 'all' || k === '') return 'All Editions';
    return String(section ?? '');
  }
  if (k === 'new' || k === 'collector') return '鉴藏者特版';
  if (k === 'rerun' || k === 'gallery') return '怪相档案';
  if (k === 'all' || k === '') return '全部分区';
  return String(section ?? '');
}

export function localizeAfflatus(code, lang = getLang()) {
  const k = String(code ?? '').trim().toLowerCase();
  const map = {
    beast:        { en: 'Beast',          zh: '兽' },
    plant:        { en: 'Plant',          zh: '木' },
    star:         { en: 'Star',           zh: '星' },
    mineral:      { en: 'Mineral',        zh: '岩' },
    spirit:       { en: 'Spirit',         zh: '灵' },
    intellect:    { en: 'Intellect',      zh: '智' },
    mineral_star: { en: 'Mineral / Star', zh: '岩/星' },
    unknown:      { en: 'Arcanist',       zh: '秘' }
  };
  const hit = map[k] || map.unknown;
  return isEn(lang) ? hit.en : hit.zh;
}

export function localizeStatus(status, lang = getLang()) {
  const k = String(status ?? '').trim().toLowerCase();
  const map = {
    pending:    { en: 'Pending',    zh: '待审核' },
    approved:   { en: 'Approved',   zh: '已通过' },
    rejected:   { en: 'Rejected',   zh: '已拒绝' },
    removed:    { en: 'Removed',    zh: '已移除' },
    historical: { en: 'Historical', zh: '历史档案' }
  };
  const hit = map[k];
  if (!hit) return String(status ?? '');
  return isEn(lang) ? hit.en : hit.zh;
}

function formatNumericRangeToEn(rangeStr) {
  return String(rangeStr ?? '').replace(/(\d{1,2})\/(\d{1,2})/g, (_, mm, dd) => {
    const idx = Number(mm) - 1;
    const day = Number(dd);
    if (idx >= 0 && idx < 12 && day >= 1 && day <= 31) {
      return `${EN_MONTHS[idx]} ${day}`;
    }
    return `${mm}/${dd}`;
  }).replace(/[–—-]/g, ' – ').replace(/\s{2,}/g, ' ').trim();
}

export function localizeVersionLabel(ver, lang = getLang()) {
  if (!ver) return isEn(lang) ? 'Focused Flashback' : '焦点闪回';
  const rawLabel = typeof ver === 'string' ? ver : String(ver.label || ver.code || '');
  const code = typeof ver === 'object' ? String(ver.code || '') : '';
  if (!isEn(lang)) return rawLabel || code;

  // Example input: "4.1 · 第 7 期（11/07–12/10）"
  const m = rawLabel.match(/([0-9]+\.[0-9]+|S\d+)?\s*[·.\-]?\s*第\s*(\d+)\s*期\s*(?:[（(]([^）)]+)[）)])?/i);
  if (m) {
    const vNum = m[1] || code;
    const cycle = m[2];
    const dates = m[3] ? ` (${formatNumericRangeToEn(m[3])})` : '';
    const vPrefix = vNum ? `v${vNum.replace(/^v/i, '')} · ` : '';
    return `${vPrefix}Cycle ${cycle}${dates}`;
  }

  // Generic cleanup if label contains any Chinese cycle tokens
  let out = rawLabel
    .replace(/第\s*(\d+)\s*期/g, 'Cycle $1')
    .replace(/焦点闪回/g, 'Focused Flashback')
    .replace(/（/g, ' (')
    .replace(/）/g, ')')
    .replace(/(\d{1,2}\/\d{1,2}\s*[–—-]\s*\d{1,2}\/\d{1,2})/g, (seg) => formatNumericRangeToEn(seg))
    .replace(/\s+/g, ' ')
    .trim();

  if (/[\u4e00-\u9fff]/.test(out)) {
    return code ? `v${code.replace(/^v/i, '')} · Focused Flashback` : 'Focused Flashback';
  }
  return out || (code ? `v${code.replace(/^v/i, '')}` : 'Focused Flashback');
}

const STAGE_TERM_MAP = [
  ['额外行动', 'Extra Action'],
  ['马头鱼尾兽', 'Hippocampus'],
  ['卡律布狄斯', 'Charybdis'],
  ['野生斯库拉', 'Wild Scylla'],
  ['斯库拉', 'Scylla'],
  ['金毛羊', 'Golden-Fleeced Ram'],
  ['日熄蝙蝠', 'Eclipse Bat'],
  ['洞知', 'Pursuit'],
  ['余辉', 'Lingering Glow'],
  ['术具', 'Conduit'],
  ['仪式', 'Ultimate'],
  ['电能', 'Dynamo'],
  ['薪血', 'Bloodtithe'],
  ['启示', 'Inspiration'],
  ['升阶', 'Rank Up'],
  ['位移', 'Shift'],
  ['燃烧', 'Burn'],
  ['中毒', 'Poison'],
  ['石化', 'Petrify'],
  ['第一关', 'Stage 1'],
  ['第二关', 'Stage 2'],
  ['第三关', 'Stage 3'],
  ['第1关', 'Stage 1'],
  ['第2关', 'Stage 2'],
  ['第3关', 'Stage 3']
];

const ROMAN_ASCII = { 'Ⅰ': 'I', 'Ⅱ': 'II', 'Ⅲ': 'III', 'Ⅳ': 'IV', 'Ⅴ': 'V', 'Ⅵ': 'VI' };

export function cleanStageDisplayName(name, lang = getLang()) {
  const raw = String(name ?? '').trim();
  const stripped = raw.replace(/^(?:Stage\s*\d+|第[一二三四五六\d]+关|[ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩ]+|\d+)\s*[·．.\-]\s*/i, '').trim() || raw;
  if (!isEn(lang)) return stripped;
  return localizeStageName(stripped, 'en').replace(/^(?:Stage\s*\d+|[IVX]+)\s*·\s*/i, '').trim();
}

export function localizeStageName(stageOrName, lang = getLang()) {
  const rawName = typeof stageOrName === 'string'
    ? stageOrName
    : String(stageOrName?.name ?? '');
  const stageNo = typeof stageOrName === 'object' && stageOrName !== null
    ? Number(stageOrName.stage_no || stageOrName.stageNo || 0)
    : 0;

  if (!isEn(lang)) return rawName || (stageNo ? `第 ${stageNo} 关` : '');

  let text = rawName.normalize('NFKC').trim();
  if (!text) return stageNo ? `Stage ${stageNo}` : '';

  // Replace full-width Roman numerals and slashes
  text = text.replace(/[ⅠⅡⅢⅣⅤⅥ]/g, (ch) => ROMAN_ASCII[ch] || ch);
  text = text.replace(/[／/]/g, ' / ');
  for (const [cn, en] of STAGE_TERM_MAP) {
    if (text.includes(cn)) {
      text = text.split(cn).join(en);
    }
  }
  text = text.replace(/\s*\/\s*/g, ' / ').replace(/\s*·\s*/g, ' · ').replace(/\s{2,}/g, ' ').trim();

  // Safety fallback if any untranslated CJK remains
  if (/[\u4e00-\u9fff]/.test(text)) {
    if (stageNo === 1) return 'I · Pursuit / Extra Action';
    if (stageNo === 2) return 'II · Lingering Glow / Ultimate';
    if (stageNo === 3) return 'III · Conduit / Ultimate';
    return stageNo ? `Stage ${stageNo}` : text.replace(/[\u4e00-\u9fff]+/g, '').trim() || 'Flashback Stage';
  }
  return text;
}

export function localizeIssueMeta(meta = globalThis.LEADERBOARD_CONFIG?.issueMeta, lang = getLang()) {
  const src = meta || {
    version: '4.1',
    title: '亚特兰蒂斯谋杀案',
    titleEn: 'Murder on Atlantis',
    period: '11/05 – 12/10',
    periodEn: 'Nov 5 – Dec 10'
  };
  const version = String(src.version || '4.1');
  if (isEn(lang)) {
    const title = src.titleEn || 'Murder on Atlantis';
    const period = src.periodEn || formatNumericRangeToEn(src.period || '11/05 – 12/10');
    return {
      version,
      title,
      period,
      fullLabel: `v${version.replace(/^v/i, '')} · ${title} (${period})`
    };
  }
  const title = src.title || '亚特兰蒂斯谋杀案';
  const period = src.period || '11/05 – 12/10';
  return {
    version,
    title,
    period,
    fullLabel: `${version} · ${title}（${period}）`
  };
}

