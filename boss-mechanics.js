// 《重返未来：1999》鬃毛邮报 & 焦点闪回 关卡机制运行时适配器
// 完整双语原始数据位于 ./src-data/boss-mechanics-data.js，构建时分包输出至 data/lang-{zh,en}.json

import { getLang } from './i18n.js';

const MANE_BY_LANG = {
  en: new Map(),
  zh: new Map()
};
const MANE_EN_TO_CN = new Map();
const FB_BY_LANG = {
  en: [],
  zh: []
};

export const MANE_BOSS_MECHANICS = new Map();
export const FLASHBACK_STAGE_MECHANICS = [];
export const FLASHBACK_STAGES_MECHANICS = FLASHBACK_STAGE_MECHANICS;

function normalizeLangKey(lang) {
  return String(lang || getLang()).trim().toLowerCase().startsWith('en') ? 'en' : 'zh';
}

export function registerBossMechanics(lang, maneMapObj, maneEnToCnObj, fbList) {
  const norm = normalizeLangKey(lang);
  if (maneMapObj && typeof maneMapObj === 'object') {
    const targetMap = MANE_BY_LANG[norm];
    targetMap.clear();
    for (const [k, v] of Object.entries(maneMapObj)) {
      targetMap.set(k, v);
      MANE_BOSS_MECHANICS.set(k, v);
    }
    if (targetMap.has('生命的饥馑') && !targetMap.has('生命的饥谨')) {
      const aliasVal = targetMap.get('生命的饥馑');
      targetMap.set('生命的饥谨', aliasVal);
      MANE_BOSS_MECHANICS.set('生命的饥谨', aliasVal);
    }
  }
  if (maneEnToCnObj && typeof maneEnToCnObj === 'object') {
    for (const [k, v] of Object.entries(maneEnToCnObj)) {
      MANE_EN_TO_CN.set(String(k).toLowerCase(), v);
    }
  }
  if (Array.isArray(fbList)) {
    FB_BY_LANG[norm] = fbList;
    FLASHBACK_STAGE_MECHANICS.length = 0;
    FLASHBACK_STAGE_MECHANICS.push(...fbList);
  }
}

function getManeMapForLang(norm) {
  if (MANE_BY_LANG[norm].size) return MANE_BY_LANG[norm];
  const other = norm === 'en' ? 'zh' : 'en';
  if (MANE_BY_LANG[other].size) return MANE_BY_LANG[other];
  return MANE_BOSS_MECHANICS;
}

function getFbListForLang(norm) {
  if (FB_BY_LANG[norm].length) return FB_BY_LANG[norm];
  const other = norm === 'en' ? 'zh' : 'en';
  return FB_BY_LANG[other].length ? FB_BY_LANG[other] : FLASHBACK_STAGE_MECHANICS;
}

function lookupManeRawEntry(bossName, norm) {
  const key = String(bossName ?? '').trim();
  if (!key) return null;
  const map = getManeMapForLang(norm);
  let entry = map.get(key);
  if (!entry) {
    const mappedCn = MANE_EN_TO_CN.get(key.toLowerCase());
    if (mappedCn) entry = map.get(mappedCn);
  }
  return entry || null;
}

export function resolveManeBossMechanics(bossName, lang = getLang()) {
  const norm = normalizeLangKey(lang);
  const entry = lookupManeRawEntry(bossName, norm);
  if (!entry) return null;
  return {
    turns: entry.turns,
    nameEn: entry.nameEn,
    modeTag: entry.modeTag || '',
    battlefield: entry.battlefield || '',
    favoredText: entry.favoredText || '',
    envRules: entry.envRules || [],
    passives: entry.passives || [],
    counterTips: entry.counterTips || [],
    thresholds: entry.thresholds || []
  };
}

export function getBossThresholdProgress(bossName, score, lang = getLang()) {
  const norm = normalizeLangKey(lang);
  const entry = lookupManeRawEntry(bossName, norm);
  const rawList = entry?.thresholds || null;
  if (!Array.isArray(rawList) || rawList.length === 0) {
    return {
      currentStage: 0,
      roman: '',
      scoreLabel: '',
      desc: '',
      nextStage: null,
      thresholds: []
    };
  }

  const parsedScore = typeof score === 'string'
    ? Number(score.replace(/,/g, '').trim())
    : Number(score);
  const numericScore = Number.isFinite(parsedScore) ? parsedScore : 0;

  let currentStage = 0;
  const thresholds = rawList.map((step, idx) => {
    const minScore = Number(step.minScore) || 0;
    const reached = numericScore >= minScore;
    if (reached) currentStage = idx + 1;
    return {
      stage: idx + 1,
      roman: step.roman || '',
      minScore,
      score: step.score,
      scoreLabel: step.score,
      desc: step.desc,
      reached
    };
  });

  const activeStep = currentStage > 0 ? thresholds[currentStage - 1] : null;
  const upcomingStep = currentStage < thresholds.length ? thresholds[currentStage] : null;

  return {
    currentStage,
    roman: activeStep ? activeStep.roman : '',
    scoreLabel: activeStep ? activeStep.scoreLabel : '',
    desc: activeStep ? activeStep.desc : '',
    nextStage: upcomingStep
      ? {
          roman: upcomingStep.roman,
          minScore: upcomingStep.minScore,
          scoreLabel: upcomingStep.scoreLabel,
          desc: upcomingStep.desc
        }
      : null,
    thresholds
  };
}

function localizeFlashbackEntry(item) {
  if (!item) return null;
  return {
    stageNo: item.stageNo,
    code: item.code,
    name: item.name || item.nameCn || item.nameEn || '',
    modeTag: item.modeTag || '',
    enemies: item.enemies || '',
    envRules: item.envRules || [],
    passives: item.passives || [],
    counterTips: item.counterTips || []
  };
}

export function resolveFlashbackStageMechanics(stage, lang = getLang()) {
  if (stage === null || stage === undefined) return null;
  const norm = normalizeLangKey(lang);
  const list = getFbListForLang(norm);
  if (typeof stage === 'number') {
    const byNum = list.find((item) => item.stageNo === stage) || null;
    return localizeFlashbackEntry(byNum);
  }
  const name = typeof stage === 'string' ? stage : String(stage.name || '');
  const lowName = name.toLowerCase();
  const byName = list.find((item) =>
    (item.match || []).some((kw) => lowName.includes(String(kw).toLowerCase()))
  );
  if (byName) return localizeFlashbackEntry(byName);
  const stageNo = typeof stage === 'object' ? Number(stage.stage_no || stage.stageNo) : Number(stage);
  const byNo = list.find((item) => item.stageNo === stageNo) || null;
  return localizeFlashbackEntry(byNo);
}
