// 《重返未来：1999》战斗状态、核心机制与首领词条运行时适配器
// 完整双语原始数据位于 ./src-data/status-glossary-data.js，构建时分包输出至 data/lang-{zh,en}.json

import { getLang } from '../i18n.js';

export const STATUS_CATEGORY_META = {
  pos:     { labelEn: 'Pos Status',            labelZh: '属性增益',     badgeClass: 'is-pos' },
  neg:     { labelEn: 'Neg Status',            labelZh: '负面状态',     badgeClass: 'is-neg' },
  control: { labelEn: 'Control',               labelZh: '控制状态',     badgeClass: 'is-control' },
  stats:   { labelEn: 'Stats Down / Up',       labelZh: '数值增减',     badgeClass: 'is-stats' },
  special: { labelEn: 'Special / Force Field', labelZh: '特殊 / 术阵',  badgeClass: 'is-special' },
  boss:    { labelEn: 'Boss Mechanic',         labelZh: '首领专属词条', badgeClass: 'is-boss' }
};

export const STATUS_GLOSSARY = [];

function normalizeGlossaryKey(raw) {
  return String(raw ?? '')
    .normalize('NFKC')
    .trim()
    .replace(/^[\[\]【】「」『』]+|[\[\]【】「」『』]+$/g, '')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

const GLOSSARY_INDEX_BY_LANG = {
  en: new Map(),
  zh: new Map()
};

function normalizeLangKey(lang) {
  return String(lang || getLang()).trim().toLowerCase().startsWith('en') ? 'en' : 'zh';
}

export function registerStatusGlossary(lang, entries) {
  const norm = normalizeLangKey(lang);
  if (!Array.isArray(entries)) return;
  const index = GLOSSARY_INDEX_BY_LANG[norm];
  index.clear();
  for (const entry of entries) {
    const candidates = [entry.key, entry.en, entry.zh, ...(entry.aliases || [])];
    for (const cand of candidates) {
      const k = normalizeGlossaryKey(cand);
      if (k && !index.has(k)) {
        index.set(k, entry);
      }
    }
  }
}

export function lookupStatusTerm(rawTerm, lang = getLang()) {
  const key = normalizeGlossaryKey(rawTerm);
  if (!key) return null;
  const norm = normalizeLangKey(lang);
  const primary = GLOSSARY_INDEX_BY_LANG[norm];
  const fallback = GLOSSARY_INDEX_BY_LANG[norm === 'en' ? 'zh' : 'en'];
  const entry = primary.get(key) || fallback.get(key);
  if (!entry) return null;
  const cat = STATUS_CATEGORY_META[entry.category] || STATUS_CATEGORY_META.special;
  return {
    ...entry,
    name: norm === 'zh' ? entry.zh : entry.en,
    categoryLabel: norm === 'zh' ? cat.labelZh : cat.labelEn,
    badgeClass: cat.badgeClass,
    desc: entry.desc ?? (norm === 'zh' ? entry.descZh : entry.descEn) ?? ''
  };
}
