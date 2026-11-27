import supabaseVendor from './vendor/supabase.umd.js';
import {
  cleanStageDisplayName,
  formatBossCount,
  formatCompactScore,
  formatDateTime,
  formatEntries,
  formatMonthDay,
  formatMonthDayTime,
  formatRounds,
  formatScore,
  getLang,
  initLang,
  isEn,
  localizeAfflatus,
  localizeDivision,
  localizeDivisionShort,
  localizeIssueMeta,
  localizeSection,
  localizeStageName,
  localizeStatus,
  localizeVersionLabel,
  setLang,
  t
} from './i18n.js';
import {
  AFFLATUS_META,
  ARC_ROLE_LABELS,
  CHARACTER_LIST,
  WILDCARD_CHOICES,
  afflatusSvg,
  canonicalCharacterKey,
  canonicalDisplayName,
  canonicalWildcard,
  characterMatchesQuery,
  characterMonogram,
  detectTeamArchetypes,
  displayBossName,
  displayBossSubtitle,
  displayBossTags,
  displayCarryNames,
  displayCharacterName,
  displayWildcard,
  extractLineupCharacterNames,
  formatFlexSlot,
  formatWildSlot,
  getArcanistDetail,
  insightWatermarkSvg,
  isWildcardChoice,
  parseLineupSlots,
  rarityOverlaySrc,
  resolveAfflatus,
  resolveBossAsset,
  resolveBossWikiUrl,
  resolveCharacter,
  resolveFlashbackStageArt,
  resolveManeGrade,
  toRoman
} from './arcanists.js';
import {
  getBossThresholdProgress,
  resolveFlashbackStageMechanics,
  resolveManeBossMechanics
} from './boss-mechanics.js';
import {
  PSYCHUBES,
  PSYCHUBE_TAGS_META,
  displayPsychubeName,
  displayPsychubeStat,
  displayPsychubeTag,
  getPsychubeDetail,
  psychubeFrameSrc,
  psychubeIconSrc,
  psychubeMatchesQuery,
  resolvePsychube
} from './psychubes.js';
import {
  STATUS_CATEGORY_META,
  lookupStatusTerm
} from './data/status-glossary.js';
import {
  adminContact,
  bindModerationFilters,
  contactFieldHtml,
  filterModerationRows,
  moderationFilterFields,
  moderationPager,
  moderationPageSize,
  mountSubmissionProgress,
  showRejectionForm
} from './submission-progress.js';
import { canonicalTeam, validateLineup } from './flashback-logic.mjs';
import {
  beijingDayRange,
  beijingTime,
  exportManeWorkbook,
  filterOfflineDailyRows,
  formatApprovedTime,
  latestOfflineDailyDate,
  rankManeCarryTotals,
  shiftBeijingDay,
  todayInBeijing
} from './mane-reports.js';
import { ensureLangPack } from './lang-pack.js';

let cachedOfflineSnapshot = null;
let offlineSnapshotPromise = null;
async function ensureOfflineSnapshot() {
  if (cachedOfflineSnapshot) return cachedOfflineSnapshot;
  if (!offlineSnapshotPromise) {
    const ver = String(globalThis.LEADERBOARD_CONFIG?.assetVersion || globalThis.__R1999_ASSET_VER__ || '').trim();
    const url = ver ? `./data/offline-snapshot.json?v=${encodeURIComponent(ver)}` : './data/offline-snapshot.json';
    offlineSnapshotPromise = fetch(url, { cache: 'default' })
      .then((res) => (res.ok ? res.json() : {}))
      .then((data) => {
        cachedOfflineSnapshot = data && typeof data === 'object' ? data : {};
        return cachedOfflineSnapshot;
      })
      .catch((err) => {
        console.warn('Offline snapshot load failed:', err);
        cachedOfflineSnapshot = {};
        return cachedOfflineSnapshot;
      });
  }
  return offlineSnapshotPromise;
}

let ocrModulePromise = null;
function loadOcrModule() {
  if (globalThis.__R1999_OCR__) return Promise.resolve(globalThis.__R1999_OCR__);
  if (ocrModulePromise) return ocrModulePromise;
  ocrModulePromise = new Promise((resolve, reject) => {
    const ver = String(globalThis.LEADERBOARD_CONFIG?.assetVersion || globalThis.__R1999_ASSET_VER__ || '').trim();
    const s = document.createElement('script');
    s.src = ver ? `./ocr.bundle.js?v=${encodeURIComponent(ver)}` : './ocr.bundle.js';
    s.async = true;
    s.onload = () => {
      if (globalThis.__R1999_OCR__) resolve(globalThis.__R1999_OCR__);
      else {
        ocrModulePromise = null;
        reject(new Error('OCR module did not initialize'));
      }
    };
    s.onerror = () => {
      ocrModulePromise = null;
      reject(new Error('Failed to load OCR module'));
    };
    document.head.appendChild(s);
  });
  return ocrModulePromise;
}

const $ = (sel) => document.querySelector(sel);
const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (ch) =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]
);
const L = (en, zh, lang = getLang()) => (isEn(lang) ? en : zh);

const FILTER_AFFLATUS = ['beast', 'plant', 'star', 'mineral', 'spirit', 'intellect'];
const DIVISION_KEYS = ['zero', 'max'];
const SECTION_KEYS = ['new', 'rerun'];
const ADMIN_STATUS_KEYS = ['pending', 'approved', 'rejected', 'removed'];
const FB_ADMIN_TAB_KEYS = ['pending', 'approved', 'rejected', 'removed', 'historical'];

const FB_ARCHIVE_ACTIONS = {
  'fb-archive-record': { en: 'this record', zh: '这条成绩', rpc: 'archive_submission', arg: 'p_submission_id' },
  'fb-archive-history': { en: 'this archive entry', zh: '这条档案', rpc: 'archive_historical_record', arg: 'p_record_id' },
  'fb-archive-version': { en: 'this cycle and its boards', zh: '这个版本及其榜单', rpc: 'archive_version', arg: 'p_version_id' }
};

const MIME_TO_EXT = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/webp': 'webp'
};
const MAX_PROOF_UPLOAD_BYTES = 5 * 1024 * 1024;
const TARGET_PROOF_BYTES = Math.floor(4.75 * 1024 * 1024);
const MAX_PROOF_RAW_BYTES = 30 * 1024 * 1024;

function resolveProofMime(file) {
  if (!file) return '';
  let type = String(file.type || '').toLowerCase().trim();
  if (type === 'image/jpg') type = 'image/jpeg';
  if (MIME_TO_EXT[type]) return type;
  const name = String(file.name || '').toLowerCase();
  if (name.endsWith('.png')) return 'image/png';
  if (name.endsWith('.jpg') || name.endsWith('.jpeg')) return 'image/jpeg';
  if (name.endsWith('.webp')) return 'image/webp';
  return '';
}

function formatProofBytes(bytes) {
  return bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(2)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function canvasToBlobAsync(canvas, mime, quality) {
  return new Promise((resolve) => canvas.toBlob(resolve, mime, quality));
}

async function prepareProofForUpload(file, lang = getLang()) {
  if (!file || !file.size) throw new Error(t('errProofRequired', {}, lang));
  const mime = resolveProofMime(file);
  if (!mime) throw new Error(t('errProofType', {}, lang));
  if (file.size > MAX_PROOF_RAW_BYTES) {
    throw new Error(L('Screenshot file exceeds 30 MB limit. Please trim or resize it first.', '截图文件超过 30 MB 上限，请先裁剪或压缩后再上传。', lang));
  }
  const img = await decodeImageFile(file);
  if (file.size <= MAX_PROOF_UPLOAD_BYTES) {
    return {
      uploadFile: file,
      mime,
      originalSize: file.size,
      finalSize: file.size,
      width: img.naturalWidth,
      height: img.naturalHeight,
      compressed: false
    };
  }

  const baseName = String(file.name || 'proof').replace(/\.[^.]+$/, '') || 'proof';
  const maxEdges = [2560, 1920, 1600, 1280];
  const attempts = [
    ['image/webp', 0.90],
    ['image/webp', 0.82],
    ['image/webp', 0.72],
    ['image/jpeg', 0.90],
    ['image/jpeg', 0.82],
    ['image/jpeg', 0.72],
    ['image/jpeg', 0.60]
  ];
  const natW = img.naturalWidth;
  const natH = img.naturalHeight;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error(t('errProofSize', {}, lang));

  for (const maxEdge of maxEdges) {
    const scale = Math.min(1, maxEdge / Math.max(natW, natH));
    canvas.width = Math.max(1, Math.round(natW * scale));
    canvas.height = Math.max(1, Math.round(natH * scale));
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    for (const [outMime, quality] of attempts) {
      const blob = await canvasToBlobAsync(canvas, outMime, quality);
      if (blob && blob.size > 0 && blob.size <= TARGET_PROOF_BYTES && MIME_TO_EXT[blob.type]) {
        const uploadFile = new File([blob], `${baseName}.${MIME_TO_EXT[blob.type]}`, { type: blob.type });
        return {
          uploadFile,
          mime: blob.type,
          originalSize: file.size,
          finalSize: blob.size,
          width: natW,
          height: natH,
          compressed: true
        };
      }
    }
  }
  throw new Error(t('errProofSize', {}, lang));
}

const OFFLINE_SUBMISSIONS_KEY = 'r1999-offline-submissions-v1';
const DEFAULT_MODE = location.pathname.toLowerCase().includes('flashback') ? 'flashback' : 'mane';

function isOfflineSandboxMode() {
  return window.LEADERBOARD_CONFIG?.offlineFirst !== false;
}

const state = {
  mode: DEFAULT_MODE,     // 'mane' | 'flashback'
  manePage: 'scores',
  maneDaily: { date: '', division: '', map: '' },
  fbPage: 'leaderboard',  // 'leaderboard' | 'carries' | 'players' | 'rules'

  dataSource: 'offline',  // 'offline' | 'live'
  connected: true,
  loading: false,
  syncingLive: false,
  errorNotice: '',

  // Auth & Profile
  session: null,
  user: null,
  profile: null,
  isAdmin: false,

  // Mane's Bulletin state
  maneSection: 'new',
  maneDivision: 'zero',
  maneMapId: '',
  maneRoleMode: 'carry',  // 'carry' | 'member'
  maneCarry: '',          // canonicalCharacterKey
  maneAfflatus: '',
  maneQuery: '',
  manePlayerScope: 'all', // 'all' | 'new' | 'rerun'
  manePlayerDiv: 'all',   // 'all' | 'zero' | 'max'
  maneMaps: [],
  maneScores: [],
  maneTotals: [],
  maneDailyScores: [],

  // Focused Flashback state
  fbVersionId: '',
  fbStageId: '',
  fbGroup: 'zero',
  fbResonanceOnly: false,
  fbRoleMode: 'carry',    // 'carry' | 'member'
  fbCarry: '',
  fbAfflatus: '',
  fbQuery: '',
  fbCarryScope: 'period',
  fbCarryMetric: 'appearance_count',
  fbVersions: [],
  fbStages: [],
  fbRecords: [],
  fbApprovedRecords: [],
  fbPlayers: [],
  fbArchives: [],
  fbCarries: [],

  // Highlight, Mechanics drawers, Mobile filter drawer & V2 Interactive State
  highlightRecordId: '',
  maneMechOpen: false,
  fbMechOpen: false,
  mobileFilterOpen: false,
  intelCollapsed: typeof window !== 'undefined' && window.innerWidth <= 680,
  maneSelectedAppraisal: -1,
  psyAmpLevel: 5,
  activePsyDossierId: '',
  posterTheme: 'parchment',
  glossaryOpen: null
};

let sb = null;
let toastTimer = null;
let authBound = false;
let startingGuest = false;
let pendingScrollRecordId = '';
const posterIndex = new Map();

// Unified 1–4 Slot Build State for Submit / Edit Modals
const modalBuildState = {
  chars: ['', '', '', ''],
  carries: [false, false, false, false],
  psychubes: ['', '', '', ''],
  resonanceCodes: ['', '', '', '']
};

const charPickerState = {
  open: false,
  slotIndex: 0,
  aff: 'all',
  star: 'all',
  query: '',
  choices: []
};

const psyPickerState = {
  open: false,
  slotIndex: 0,
  charName: '',
  star: 'all',
  tag: '全部',
  query: ''
};

const isAnySlotChoice = (name) => isWildcardChoice(name);
const splitSlotChoices = (value) => String(value || '').split(/[/／]/).map((name) => name.trim()).filter(Boolean);
const canMarkSlotCarry = (name) => Boolean(name) && !isAnySlotChoice(name) && splitSlotChoices(name).length === 1;

function divisionLabelsMap(lang = getLang()) {
  return {
    zero: localizeDivision('zero', lang),
    max: localizeDivision('max', lang)
  };
}

function sectionLabelsMap(lang = getLang()) {
  return {
    new: localizeSection('new', lang),
    rerun: localizeSection('rerun', lang)
  };
}

function resonanceBadgeHtml(lang = getLang()) {
  return `<span class="resonance-tag">✦ ${esc(t('res10FullBadge', {}, lang))}</span>`;
}

function normalizeStringSlots(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value.map((v) => String(v ?? '').trim());
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed.map((v) => String(v ?? '').trim());
    } catch {}
  }
  return [];
}

function extractRecordBuilds(record) {
  let psychubes = normalizeStringSlots(record?.team_psychubes);
  let resonanceCodes = normalizeStringSlots(record?.team_resonance_codes);
  if (!psychubes.length && !resonanceCodes.length && Array.isArray(record?.team_builds)) {
    psychubes = record.team_builds.map((b) => String(b?.psychube ?? '').trim());
    resonanceCodes = record.team_builds.map((b) => String(b?.resonance_code ?? b?.resonanceCode ?? '').trim());
  }
  return { psychubes, resonanceCodes };
}

function localRecordBadgeHtml(record, lang = getLang()) {
  if (!record?.isLocal) return '';
  return `<span class="local-record-tag">✦ ${esc(t('localRecordTag', {}, lang))}</span>`;
}

function canonicalStoredSlotChoice(rawName) {
  const trimmed = String(rawName ?? '').trim();
  if (!trimmed) return '';
  const wc = canonicalWildcard(trimmed);
  if (wc) return wc;
  const resolved = resolveCharacter(trimmed);
  if (resolved) return resolved.name;
  return trimmed;
}

function resetModalBuildState(team = [], carryStr = '', psychubes = [], resonanceCodes = []) {
  const tArr = Array.isArray(team) ? team : splitTeam(team);
  const carryKeys = new Set(splitCarries(carryStr).map(canonicalCharacterKey));
  const pArr = normalizeStringSlots(psychubes);
  const rArr = normalizeStringSlots(resonanceCodes);
  for (let i = 0; i < 4; i++) {
    const rawChar = String(tArr[i] ?? '').trim();
    const choices = splitSlotChoices(rawChar);
    const slot = choices.map(canonicalStoredSlotChoice).filter(Boolean).join('/');
    modalBuildState.chars[i] = slot;
    modalBuildState.carries[i] = canMarkSlotCarry(slot) && carryKeys.has(canonicalCharacterKey(slot));
    modalBuildState.psychubes[i] = pArr[i] || '';
    modalBuildState.resonanceCodes[i] = rArr[i] || '';
  }
}

function readTeamBuilderSubmission() {
  const lang = getLang();
  const team = [];
  const carries = [];
  const psychubes = [];
  const resonanceCodes = [];
  const seenKeys = new Set();

  for (let i = 0; i < 4; i++) {
    const rawChar = String(modalBuildState.chars[i] || '').trim();
    const psy = String(modalBuildState.psychubes[i] || '').trim();
    const res = String(modalBuildState.resonanceCodes[i] || '').trim();
    if (!rawChar) {
      if (psy || res) {
        throw new Error(t('errSlotMissingChar', { n: i + 1 }, lang));
      }
      continue;
    }
    if (Array.from(rawChar).length > 40) throw new Error(t('errSlotNameTooLong', {}, lang));
    for (const name of splitSlotChoices(rawChar)) {
      const key = canonicalCharacterKey(name);
      if (seenKeys.has(key)) {
        throw new Error(t('errDuplicateMember', { name: displayCharacterName(name, lang) }, lang));
      }
      seenKeys.add(key);
    }
    if (res.length > 160) throw new Error(t('errResTooLong', {}, lang));
    team.push(rawChar);
    if (modalBuildState.carries[i] && canMarkSlotCarry(rawChar)) carries.push(rawChar);
    psychubes.push(psy);
    resonanceCodes.push(res);
  }

  if (team.length < 1 || team.length > 4) {
    throw new Error(t('errTeamCount', {}, lang));
  }
  if (!carries.length) {
    throw new Error(t('errCarryRequired', {}, lang));
  }
  const hasPsychubes = psychubes.some(Boolean);
  const hasResonance = resonanceCodes.some(Boolean);
  return {
    team,
    carries,
    carry: carries.join('/'),
    psychubes,
    resonanceCodes,
    hasPsychubes,
    hasResonance,
    hasAny: hasPsychubes || hasResonance
  };
}

function isMissingBuildColumnError(err) {
  const msg = `${err?.code || ''} ${err?.message || ''} ${err?.details || ''}`;
  return /team_psychubes|team_resonance_codes|42703|PGRST204|schema cache/i.test(msg);
}

/* ==================== Offline Local Submission Sandbox Persistence ==================== */
function loadOfflineSubmissions() {
  try {
    const raw = localStorage.getItem(OFFLINE_SUBMISSIONS_KEY);
    if (!raw) return { mane: [], flashback: [] };
    const parsed = JSON.parse(raw);
    return {
      mane: Array.isArray(parsed?.mane) ? parsed.mane : [],
      flashback: Array.isArray(parsed?.flashback) ? parsed.flashback : []
    };
  } catch {
    return { mane: [], flashback: [] };
  }
}

function saveOfflineSubmissions(store) {
  try {
    localStorage.setItem(OFFLINE_SUBMISSIONS_KEY, JSON.stringify({
      mane: Array.isArray(store?.mane) ? store.mane : [],
      flashback: Array.isArray(store?.flashback) ? store.flashback : []
    }));
  } catch {}
}

function clearOfflineSubmissions(board = 'all') {
  const store = loadOfflineSubmissions();
  if (board === 'mane') store.mane = [];
  else if (board === 'flashback') store.flashback = [];
  else {
    store.mane = [];
    store.flashback = [];
  }
  saveOfflineSubmissions(store);
}

function cloneSnapshotList(list) {
  return Array.isArray(list) ? list.map((item) => ({ ...item })) : [];
}

function mergeManeTotalsWithLocal(baseTotals, localManeRows, mapById) {
  // Deep copy base totals map_scores so mutations never pollute OFFLINE_SNAPSHOT
  const cloned = (baseTotals || []).map((row) => ({
    ...row,
    map_scores: Array.isArray(row.map_scores) ? row.map_scores.map((m) => ({ ...m })) : []
  }));
  if (!localManeRows.length) return cloned;

  for (const rec of localManeRows) {
    const map = mapById.get(rec.map_id);
    if (!map) continue;
    const section = map.section || 'new';
    const edition = section === 'new' ? (map.edition || '') : '';
    const division = rec.division;
    const recScore = BigInt(rec.score || 0);

    for (const rawCarry of splitCarries(rec.carry)) {
      const carryKey = canonicalCharacterKey(rawCarry);
      const carryCanon = canonicalDisplayName(rawCarry);
      let bucket = cloned.find((r) =>
        r.section === section &&
        r.edition === edition &&
        r.division === division &&
        canonicalCharacterKey(r.carry_name) === carryKey
      );
      if (!bucket) {
        bucket = {
          section,
          edition,
          division,
          carry_key: carryCanon,
          carry_name: carryCanon,
          total_score: '0',
          map_count: 0,
          map_scores: []
        };
        cloned.push(bucket);
      }
      const existingIdx = bucket.map_scores.findIndex((m) => m.map_id === map.id);
      const mapEntry = {
        name: map.name,
        team: [...(rec.team || [])],
        score: String(recScore),
        map_id: map.id,
        player: rec.display_name
      };
      if (existingIdx >= 0) {
        if (recScore > BigInt(bucket.map_scores[existingIdx].score || 0)) {
          bucket.map_scores[existingIdx] = mapEntry;
        }
      } else {
        bucket.map_scores.push(mapEntry);
      }
      bucket.map_count = bucket.map_scores.length;
      bucket.total_score = String(
        bucket.map_scores.reduce((sum, m) => sum + BigInt(m.score || 0), 0n)
      );
    }
  }
  return cloned;
}

function hydrateFromOfflineSnapshot() {
  const snap = cachedOfflineSnapshot || {};
  const localStore = loadOfflineSubmissions();
  const localMane = localStore.mane.map((r) => ({ ...r, isLocal: true }));
  const localFb = localStore.flashback.map((r) => ({ ...r, isLocal: true }));

  const maneMaps = cloneSnapshotList(snap.maneMaps).sort((a, b) =>
    String(b.edition).localeCompare(String(a.edition), 'en', { numeric: true }) ||
    (a.position - b.position) ||
    String(a.name).localeCompare(String(b.name), 'zh-CN')
  );
  const mapById = new Map(maneMaps.map((m) => [m.id, m]));

  // Merge Mane scores (deduplicate by map_id + division + canonicalTeam)
  const maneByLineup = new Map();
  const allManeCandidates = [...cloneSnapshotList(snap.maneScores), ...localMane];
  for (const row of allManeCandidates) {
    const teamKey = canonicalTeam((row.team || []).map(canonicalCharacterKey));
    const key = `${row.map_id}::${row.division}::${teamKey}`;
    const prev = maneByLineup.get(key);
    if (!prev || compareManeScore(row, prev) < 0) {
      maneByLineup.set(key, row);
    }
  }
  const maneScores = [...maneByLineup.values()];
  const maneDailyScores = [
    ...localMane.map((r) => ({ ...r, approved_at: r.approved_at || r.created_at })),
    ...cloneSnapshotList(snap.maneDailyScores)
  ];
  const maneTotals = mergeManeTotalsWithLocal(snap.maneTotals, localMane, mapById);

  // Merge Flashback versions, stages, records
  const fbVersions = cloneSnapshotList(snap.fbVersions).sort((a, b) =>
    String(b.code).localeCompare(String(a.code), 'en', { numeric: true }) ||
    (Date.parse(b.created_at) - Date.parse(a.created_at))
  );
  const fbStages = cloneSnapshotList(snap.fbStages);
  const stageById = new Map(fbStages.map((s) => [s.id, s]));

  const fbByLineup = new Map();
  const allFbCandidates = [...cloneSnapshotList(snap.fbRecords), ...localFb];
  for (const row of allFbCandidates) {
    const teamKey = row.team_key || canonicalTeam(row.team || []);
    const key = `${row.stage_id}::${row.group_code}::${teamKey}`;
    const prev = fbByLineup.get(key);
    if (!prev || compareFlashbackRecord(row, prev) < 0) {
      fbByLineup.set(key, row);
    }
  }
  const fbRecords = [...fbByLineup.values()];

  // Merge local Flashback players & carries cleanly
  const fbPlayers = cloneSnapshotList(snap.fbPlayers);
  const fbCarries = cloneSnapshotList(snap.fbCarries);
  if (localFb.length) {
    const localWinners = fbRecords.filter((r) => r.isLocal);
    for (const rec of localWinners) {
      const verId = rec.version_id || stageById.get(rec.stage_id)?.version_id || null;
      const pId = rec.player_id || `local-player:${normKey(rec.display_name)}`;
      for (const scopeVer of [null, verId]) {
        const hit = fbPlayers.find((p) => p.version_id === scopeVer && (p.player_id === pId || normKey(p.display_name) === normKey(rec.display_name)));
        if (hit) hit.appearance_count = Number(hit.appearance_count || 0) + 1;
        else fbPlayers.push({ version_id: scopeVer, player_id: pId, display_name: rec.display_name, appearance_count: 1 });
      }
      for (const rawCarry of splitCarries(rec.carry_name)) {
        const cKey = canonicalCharacterKey(rawCarry);
        const cName = canonicalDisplayName(rawCarry);
        for (const scopeVer of [null, verId]) {
          const hit = fbCarries.find((c) => c.version_id === scopeVer && canonicalCharacterKey(c.carry_name) === cKey);
          if (!hit) {
            fbCarries.push({ version_id: scopeVer, carry_name: cName, challenge_count: 1 });
          } else {
            const challengeSet = new Set(
              fbRecords
                .filter((r) => (!scopeVer || r.version_id === scopeVer) && splitCarries(r.carry_name).some((cn) => canonicalCharacterKey(cn) === cKey))
                .map((r) => stageById.get(r.stage_id)?.challenge_id || r.stage_id)
            );
            hit.challenge_count = Math.max(Number(hit.challenge_count || 0), challengeSet.size);
          }
        }
      }
    }
  }

  state.maneMaps = maneMaps;
  state.maneScores = maneScores;
  state.maneTotals = maneTotals;
  state.maneDailyScores = maneDailyScores;
  state.fbVersions = fbVersions;
  state.fbStages = fbStages;
  state.fbRecords = fbRecords;
  state.fbApprovedRecords = [...cloneSnapshotList(snap.fbApprovedRecords || snap.fbRecords), ...localFb];
  state.fbPlayers = fbPlayers;
  state.fbCarries = fbCarries;
  state.fbArchives = cloneSnapshotList(snap.fbArchives);

  syncActiveSelectionsAfterLoad();
  state.dataSource = isOfflineSandboxMode() ? 'offline' : 'disconnected';
  state.connected = isOfflineSandboxMode();
  state.loading = false;
  state.errorNotice = '';
}

function syncActiveSelectionsAfterLoad() {
  if (state.maneMapId) {
    const matchedMap = state.maneMaps.find((m) => m.id === state.maneMapId);
    if (matchedMap && matchedMap.section !== state.maneSection) {
      state.maneSection = matchedMap.section;
    }
  }
  const maps = activeManeMaps();
  if (!maps.some((m) => m.id === state.maneMapId)) state.maneMapId = maps[0]?.id || '';

  if (state.fbStageId) {
    const matchedStage = state.fbStages.find((s) => s.id === state.fbStageId);
    if (matchedStage && matchedStage.version_id !== state.fbVersionId) {
      state.fbVersionId = matchedStage.version_id;
    }
  }
  if (!state.fbVersions.some((v) => v.id === state.fbVersionId)) {
    state.fbVersionId = state.fbVersions[0]?.id || '';
  }
  const stages = standardStages(state.fbVersionId);
  if (!stages.some((s) => s.id === state.fbStageId)) {
    state.fbStageId = stages[0]?.id || '';
  }
}

/* ==================== Build Slot & Picker Rendering (100% Bilingual) ==================== */
function renderPsychubeThumbHtml(rawPsy, sizeClass = '', lang = getLang()) {
  const psy = resolvePsychube(rawPsy);
  if (!psy) {
    return `<span class="psy-thumb is-fallback ${sizeClass}"><span>✦</span></span>`;
  }
  const pName = displayPsychubeName(psy, lang);
  const pStat = displayPsychubeStat(psy, lang);
  return `
    <span class="psy-thumb ${sizeClass}" title="${esc(pName)} (${psy.star}★ · ${esc(pStat)})">
      <img class="psy-thumb-bg" src="${esc(psychubeFrameSrc(psy.star))}" alt="" aria-hidden="true" loading="lazy" decoding="async" />
      <img class="psy-thumb-icon" src="${esc(psychubeIconSrc(psy.id))}" alt="${esc(pName)}" loading="lazy" decoding="async" />
    </span>`;
}

function renderCharPickerThumbHtml(char, lang = getLang()) {
  const affKey = char.aff || 'unknown';
  const aff = AFFLATUS_META[affKey] || AFFLATUS_META.unknown;
  const charDisplay = displayCharacterName(char.name, lang);
  const affDisplay = localizeAfflatus(affKey, lang);
  return `
    <span class="char-picker-card-art">
      <img class="slot-card-bg" src="./assets/uttu/bg_kapaidi.png" alt="" aria-hidden="true" loading="lazy" decoding="async" />
      ${char.portrait ? `<img class="slot-portrait" src="${esc(char.portrait)}" alt="${esc(charDisplay)}" loading="lazy" decoding="async" />` : ''}
      <img class="slot-rarity-layer" src="${esc(rarityOverlaySrc(char.star || 6))}" alt="" aria-hidden="true" loading="lazy" decoding="async" />
      <div class="slot-vignette" aria-hidden="true"></div>
      ${aff.icon ? `<img class="slot-aff-img" src="${esc(aff.icon)}" alt="${esc(affDisplay)}" loading="lazy" decoding="async" />` : ''}
    </span>`;
}

function renderBuildSlotItemHtml(idx, lang = getLang()) {
  const rawChar = String(modalBuildState.chars[idx] || '').trim();
  const canCarry = canMarkSlotCarry(rawChar);
  const resolvedChar = canCarry ? resolveCharacter(rawChar) : null;
  const charLabel = rawChar ? displayCharacterName(rawChar, lang) : '';
  const isCarry = canCarry && modalBuildState.carries[idx];
  const psyVal = modalBuildState.psychubes[idx] || '';
  const psyDisplay = psyVal ? displayPsychubeName(psyVal, lang) : '';
  const resVal = modalBuildState.resonanceCodes[idx] || '';
  const aff = AFFLATUS_META[resolvedChar?.aff || 'unknown'] || AFFLATUS_META.unknown;
  const n = idx + 1;

  return `
    <div class="build-slot-card ${rawChar ? 'has-char' : 'is-unfilled'} ${isCarry ? 'is-carry-slot' : ''}" data-build-slot="${idx}">
      <div class="build-slot-head">
        <div class="build-slot-head-left">
          <span class="build-slot-index">${esc(t('slotLabel', { n }, lang))}</span>
          <span class="build-slot-char">${esc(charLabel || (idx === 0 ? t('slotPendingChar', {}, lang) : t('slotOptional', {}, lang)))}</span>
        </div>
        <button type="button" class="carry-check-btn ${isCarry ? 'checked' : ''}" data-toggle-carry="${idx}" role="checkbox" aria-checked="${isCarry}" ${canCarry ? '' : 'disabled'} title="${esc(canCarry ? t('slotMainDpsTitle', {}, lang) : t('slotMainDpsDisabled', {}, lang))}">
          <span class="carry-check-box" aria-hidden="true">${isCarry ? '✓' : ''}</span>
          <span>${esc(t('slotMainDps', {}, lang))}</span>
        </button>
      </div>
      <div class="build-slot-squares">
        <div class="picker-slot-wrap">
          <button type="button" class="picker-slot-box char-picker-trigger ${rawChar ? 'is-selected' : ''} ${isCarry ? 'is-carry' : ''}" data-pick-char="${idx}" title="${esc(rawChar ? `${t('slotPickChar', {}, lang)} · ${charLabel}` : t('slotPickChar', {}, lang))}">
            ${rawChar
              ? `<span class="char-slot-thumb">
                   <img class="slot-card-bg" src="./assets/uttu/bg_kapaidi.png" alt="" aria-hidden="true" />
                   ${resolvedChar?.portrait ? `<img class="slot-portrait" src="${esc(resolvedChar.portrait)}" alt="" aria-hidden="true" />` : `<span class="char-slot-mono">${esc(characterMonogram(charLabel))}</span>`}
                   <img class="slot-rarity-layer" src="${esc(rarityOverlaySrc(resolvedChar?.star || 6))}" alt="" aria-hidden="true" />
                   ${aff.icon ? `<img class="char-slot-aff" src="${esc(aff.icon)}" alt="" aria-hidden="true" />` : ''}
                 </span>
                 <span class="picker-slot-name">${esc(charLabel)}</span>`
              : `<span class="picker-slot-plus" aria-hidden="true">＋</span>
                 <span class="picker-slot-label">${esc(t('slotPickChar', {}, lang))}</span>`
            }
          </button>
          ${rawChar ? `<button type="button" class="psy-slot-clear" data-clear-char="${idx}" aria-label="${esc(t('slotClearChar', { n }, lang))}" title="${esc(t('slotClearChar', { n }, lang))}">×</button>` : ''}
        </div>

        <div class="picker-slot-wrap">
          <button type="button" class="picker-slot-box ${psyDisplay ? 'is-selected' : ''}" data-pick-psy="${idx}" title="${esc(psyDisplay ? `${t('slotPickPsy', {}, lang)} · ${psyDisplay}` : t('slotPickPsy', {}, lang))}">
            ${psyDisplay
              ? `${renderPsychubeThumbHtml(psyVal, 'in-slot', lang)}
                 <span class="picker-slot-name">${esc(psyDisplay)}</span>`
              : `<span class="picker-slot-plus" aria-hidden="true">＋</span>
                 <span class="picker-slot-label">${esc(t('slotPickPsy', {}, lang))}</span>`
            }
          </button>
          ${psyDisplay ? `<button type="button" class="psy-slot-clear" data-clear-psy="${idx}" aria-label="${esc(t('slotClearPsy', { n }, lang))}" title="${esc(t('slotClearPsy', { n }, lang))}">×</button>` : ''}
        </div>
      </div>
      <div class="res-slot-wrap">
        <input type="text" class="res-code-input" data-res-slot="${idx}" maxlength="160" autocomplete="off" spellcheck="false" placeholder="${esc(t('slotResPlaceholder', { n }, lang))}" value="${esc(resVal)}" aria-label="${esc(t('slotResPlaceholder', { n }, lang))}" />
      </div>
    </div>`;
}

function renderTeamBuilderSummaryText(lang = getLang()) {
  const chosen = modalBuildState.chars.map((c, i) => ({ c, i })).filter((x) => x.c);
  const carries = chosen
    .filter((x) => modalBuildState.carries[x.i])
    .map((x) => displayCharacterName(x.c, lang));
  if (!chosen.length) return t('teamBuilderEmptyHint', {}, lang);
  return t('teamBuilderSummary', {
    n: chosen.length,
    carries: carries.length ? carries.join(' / ') : t('teamBuilderNoCarry', {}, lang)
  }, lang);
}

function renderTeamBuilderFieldHtml(lang = getLang()) {
  return `
    <div class="field build-slots-field">
      <div class="build-slots-label-row">
        <label>${esc(t('teamBuilderLabel', {}, lang))}</label>
        <span class="build-slots-hint" id="teamBuilderSummary">${esc(renderTeamBuilderSummaryText(lang))}</span>
      </div>
      <div class="build-slots-grid" id="buildSlotsGrid">
        ${[0, 1, 2, 3].map((idx) => renderBuildSlotItemHtml(idx, lang)).join('')}
      </div>
    </div>`;
}

function refreshBuildSlotsGrid() {
  const lang = getLang();
  const grid = $('#buildSlotsGrid');
  if (grid) {
    grid.innerHTML = [0, 1, 2, 3].map((idx) => renderBuildSlotItemHtml(idx, lang)).join('');
  }
  const summary = $('#teamBuilderSummary');
  if (summary) summary.textContent = renderTeamBuilderSummaryText(lang);
  const submitForm = $('#maneSubmitForm, #fbSubmitForm');
  if (submitForm) saveSubmitDraftFromForm(submitForm);
}

/* ==================== Submission Draft Storage ==================== */
const SUBMIT_DRAFT_KEYS = {
  mane: 'r1999-mane-submit-draft-v1',
  flashback: 'r1999-fb-submit-draft-v1'
};
const SUBMIT_DRAFT_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function draftHasContent(board, d) {
  if (!d || typeof d !== 'object') return false;
  const hasSlots = (Array.isArray(d.chars) && d.chars.some(Boolean)) ||
    (Array.isArray(d.psychubes) && d.psychubes.some(Boolean)) ||
    (Array.isArray(d.resonanceCodes) && d.resonanceCodes.some(Boolean));
  if (hasSlots) return true;
  if (board === 'mane') {
    return Boolean(String(d.display_name || '').trim() || String(d.score || '').trim() || String(d.related_url || '').trim() || String(d.contact || '').trim());
  }
  return Boolean(String(d.rounds ?? '').trim() !== '' || d.resonanceTen || String(d.relatedUrl || '').trim() || String(d.contact || '').trim());
}

function loadSubmitDraft(board) {
  const key = SUBMIT_DRAFT_KEYS[board];
  if (!key) return null;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    if (parsed.updatedAt && Date.now() - Number(parsed.updatedAt) > SUBMIT_DRAFT_TTL_MS) {
      localStorage.removeItem(key);
      return null;
    }
    return draftHasContent(board, parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function clearSubmitDraft(board) {
  const key = SUBMIT_DRAFT_KEYS[board];
  if (!key) return;
  try { localStorage.removeItem(key); } catch {}
}

function restoreModalBuildFromDraft(draft) {
  resetModalBuildState();
  if (!draft || typeof draft !== 'object') return;
  for (let i = 0; i < 4; i++) {
    const rawChar = String(draft.chars?.[i] ?? '').trim();
    modalBuildState.chars[i] = rawChar;
    modalBuildState.carries[i] = Boolean(canMarkSlotCarry(rawChar) && draft.carries?.[i]);
    modalBuildState.psychubes[i] = String(draft.psychubes?.[i] ?? '').trim();
    modalBuildState.resonanceCodes[i] = String(draft.resonanceCodes?.[i] ?? '').trim();
  }
}

function saveSubmitDraftFromForm(form) {
  if (!form || !form.isConnected) return;
  const board = form.id === 'maneSubmitForm' ? 'mane' : (form.id === 'fbSubmitForm' ? 'flashback' : '');
  if (!board) return;
  const fd = new FormData(form);
  const payload = board === 'mane'
    ? {
        map_id: String(fd.get('map_id') ?? ''),
        division: String(fd.get('division') ?? ''),
        display_name: String(fd.get('display_name') ?? ''),
        score: String(fd.get('score') ?? ''),
        related_url: String(fd.get('related_url') ?? ''),
        contact: String(fd.get('contact') ?? ''),
        chars: [...modalBuildState.chars],
        carries: [...modalBuildState.carries],
        psychubes: [...modalBuildState.psychubes],
        resonanceCodes: [...modalBuildState.resonanceCodes],
        updatedAt: Date.now()
      }
    : {
        nickname: String(fd.get('nickname') ?? ''),
        version: String(fd.get('version') ?? ''),
        stage: String(fd.get('stage') ?? ''),
        group: String(fd.get('group') ?? ''),
        rounds: String(fd.get('rounds') ?? ''),
        resonanceTen: fd.has('resonanceTen'),
        relatedUrl: String(fd.get('relatedUrl') ?? ''),
        contact: String(fd.get('contact') ?? ''),
        chars: [...modalBuildState.chars],
        carries: [...modalBuildState.carries],
        psychubes: [...modalBuildState.psychubes],
        resonanceCodes: [...modalBuildState.resonanceCodes],
        updatedAt: Date.now()
      };
  const hasContent = draftHasContent(board, payload);
  try {
    if (hasContent) localStorage.setItem(SUBMIT_DRAFT_KEYS[board], JSON.stringify(payload));
    else localStorage.removeItem(SUBMIT_DRAFT_KEYS[board]);
  } catch {}
  const clearBtn = form.querySelector('#clearDraftBtn');
  if (clearBtn) clearBtn.hidden = !hasContent;
}

/* ==================== Arcanist & Psychube Codex Pickers ==================== */
function charactersInOtherSlots() {
  const used = new Map();
  for (let i = 0; i < 4; i++) {
    if (i === charPickerState.slotIndex) continue;
    for (const name of splitSlotChoices(modalBuildState.chars[i])) used.set(canonicalCharacterKey(name), i + 1);
  }
  return used;
}

function syncCharPickerSelection() {
  const lang = getLang();
  const overlay = $('#charPickerOverlay');
  if (!overlay) return;
  const choices = charPickerState.choices;
  const selected = new Set(choices.map(canonicalCharacterKey));
  overlay.querySelectorAll('[data-choose-char]').forEach((button) => {
    const pressed = selected.has(canonicalCharacterKey(button.dataset.chooseChar));
    button.classList.toggle('is-selected', pressed && button.classList.contains('char-card-option'));
    button.classList.toggle('active', pressed && button.classList.contains('psy-chip'));
    button.setAttribute('aria-pressed', String(pressed));
  });
  const summary = $('#charPickerSelection');
  if (summary) {
    if (!choices.length) {
      summary.textContent = L('Select an arcanist or flex wildcard', '请选择角色或任意位', lang);
    } else {
      const displayNames = choices.map((c) => displayCharacterName(c, lang)).join(' / ');
      summary.textContent = choices.length > 1
        ? `${t('charPickerMultiHint', { n: choices.length }, lang)}: ${displayNames}`
        : displayNames;
    }
  }
  const confirmBtn = $('#confirmCharSelection');
  if (confirmBtn) confirmBtn.disabled = choices.length === 0;
}

function refreshCharPickerResults() {
  const lang = getLang();
  const grid = $('#charPickerGrid');
  if (!grid) return;
  const q = normKey(charPickerState.query);
  const usedInOtherSlots = charactersInOtherSlots();
  const filtered = CHARACTER_LIST.filter((c) => {
    if (charPickerState.aff !== 'all') {
      const okAff = c.aff === charPickerState.aff ||
        (c.aff === 'mineral_star' && (charPickerState.aff === 'mineral' || charPickerState.aff === 'star'));
      if (!okAff) return false;
    }
    if (charPickerState.star === '6' && c.star !== 6) return false;
    if (charPickerState.star === '5' && c.star !== 5) return false;
    if (charPickerState.star === 'low' && c.star > 4) return false;
    if (!q) return true;
    return characterMatchesQuery(c.name, q);
  });
  grid.innerHTML = filtered.length
    ? filtered.map((c) => {
        const usedSlot = usedInOtherSlots.get(`char:${c.id}`);
        const charDisplay = displayCharacterName(c.name, lang);
        const affDisplay = localizeAfflatus(c.aff, lang);
        const usedText = usedSlot ? L(`In Slot ${usedSlot}`, `已在 ${usedSlot} 号位`, lang) : `${c.star}★ · ${affDisplay}`;
        return `
          <button type="button" class="char-card-option ${usedSlot ? 'is-used' : ''}" data-choose-char="${esc(c.name)}" ${usedSlot ? 'disabled' : ''} title="${esc(charDisplay)} (${c.star}★${usedSlot ? ` · ${usedText}` : ''})">
            ${renderCharPickerThumbHtml(c, lang)}
            <span class="char-opt-name">${esc(charDisplay)}</span>
            <span class="char-opt-meta">${esc(usedText)}</span>
          </button>`;
      }).join('')
    : `<div class="empty-state" style="grid-column:1/-1;padding:12px"><p>${esc(t('charPickerEmpty', {}, lang))}</p></div>`;
  grid.scrollTop = 0;
  $('#charPickerOverlay')?.querySelectorAll('[data-char-aff], [data-char-star]').forEach((button) => {
    const active = button.dataset.charAff === charPickerState.aff || button.dataset.charStar === charPickerState.star;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  syncCharPickerSelection();
}

function renderCharPicker() {
  const lang = getLang();
  const root = $('#charPickerRoot');
  if (!root) return;
  if (!charPickerState.open) {
    root.innerHTML = '';
    return;
  }
  const currentVal = modalBuildState.chars[charPickerState.slotIndex] || '';
  const customVal = splitSlotChoices(currentVal).some((name) => !isAnySlotChoice(name) && !resolveCharacter(name))
    ? currentVal : '';
  const n = charPickerState.slotIndex + 1;

  root.innerHTML = `
    <div class="psy-picker-overlay" id="charPickerOverlay">
      <section class="psy-picker-box" role="dialog" aria-modal="true" aria-label="${esc(t('charPickerTitle', { n }, lang))}">
        <button type="button" class="modal-close" data-action="close-char-picker" aria-label="${esc(t('btnClose', {}, lang))}">×</button>
        <div class="modal-eyebrow">${esc(L(`ARCANIST CODEX · ${CHARACTER_LIST.length} ARCANISTS`, `ARCANIST CODEX · 全角色图鉴（共 ${CHARACTER_LIST.length} 名）`, lang))}</div>
        <h3>${esc(t('charPickerTitle', { n }, lang))}</h3>
        <div class="psy-picker-toolbar">
          <div class="psy-picker-filters">
            <div class="psy-chip-group" role="group" aria-label="${esc(t('afflatusFilterAria', {}, lang))}">
              <button type="button" class="psy-chip ${charPickerState.aff === 'all' ? 'active' : ''}" data-char-aff="all">${esc(t('afflatusAll', {}, lang))}</button>
              ${FILTER_AFFLATUS.map((affKey) => {
                const meta = AFFLATUS_META[affKey];
                return `
                  <button type="button" class="psy-chip has-aff-icon ${charPickerState.aff === affKey ? 'active' : ''}" data-char-aff="${affKey}">
                    <img src="${esc(meta.icon)}" alt="" aria-hidden="true" />
                    <span>${esc(localizeAfflatus(affKey, lang))}</span>
                  </button>`;
              }).join('')}
            </div>
            <div class="psy-chip-group" role="group" aria-label="${esc(t('charPickerAllStars', {}, lang))}">
              ${[
                ['all', t('charPickerAllStars', {}, lang)],
                ['6', '6★'],
                ['5', '5★'],
                ['low', L('≤4★', '4★及以下', lang)]
              ].map(([val, lbl]) =>
                `<button type="button" class="psy-chip ${charPickerState.star === val ? 'active' : ''}" data-char-star="${val}">${esc(lbl)}</button>`
              ).join('')}
            </div>
          </div>
          <div class="search-input-wrap">
            <img class="search-input-icon" src="./assets/uttu/btn_search.webp" alt="" aria-hidden="true" />
            <input id="charPickerSearch" class="filter-input has-icon" type="search" aria-label="${esc(t('charPickerSearchPlaceholder', {}, lang))}" placeholder="${esc(t('charPickerSearchPlaceholder', {}, lang))}" value="${esc(charPickerState.query)}" />
          </div>
        </div>
        <div class="psy-chip-group" role="group" aria-label="${esc(t('charPickerWildcardHeading', {}, lang))}">
          ${WILDCARD_CHOICES.map((wc) => `
            <button type="button" class="psy-chip" data-choose-char="${esc(wc.cn)}">${esc(isEn(lang) ? wc.en : wc.cn)}</button>
          `).join('')}
        </div>
        <div id="charPickerGrid" class="char-picker-grid" style="min-height:0;flex:1 1 auto"></div>
        <div class="char-custom-row" style="align-items:center">
          <small id="charPickerSelection" class="field-hint" role="status" style="flex:1;min-width:0;overflow-wrap:anywhere"></small>
          <button id="confirmCharSelection" type="button" class="copper-btn" data-action="confirm-char-selection">${esc(t('charPickerConfirm', {}, lang))}</button>
        </div>
        <small class="field-hint">${esc(t('charPickerSub', {}, lang))}</small>
        <div class="char-custom-row">
          <input id="charCustomInput" type="text" maxlength="40" aria-label="${esc(L('Custom arcanist input', '手动填写角色', lang))}" placeholder="${esc(L('Custom name or flex options separated by /', '手动填入角色，备选用 / 隔开', lang))}" value="${esc(customVal)}" />
          <button type="button" class="outline-btn" data-action="apply-custom-char">${esc(L('Apply', '手动填入', lang))}</button>
        </div>
      </section>
    </div>`;
  refreshCharPickerResults();
}

function openCharPicker(slotIndex) {
  charPickerState.open = true;
  charPickerState.slotIndex = slotIndex;
  charPickerState.aff = 'all';
  charPickerState.star = 'all';
  charPickerState.query = '';
  charPickerState.choices = splitSlotChoices(modalBuildState.chars[slotIndex]);
  renderCharPicker();
  requestAnimationFrame(() => $('#charPickerSearch')?.focus());
}

function closeCharPicker() {
  charPickerState.open = false;
  renderCharPicker();
}

function chooseCharacterForSlot(name) {
  const canon = canonicalStoredSlotChoice(name);
  const key = canonicalCharacterKey(canon);
  const choices = charPickerState.choices;
  if (choices.some((selected) => canonicalCharacterKey(selected) === key)) {
    charPickerState.choices = choices.filter((selected) => canonicalCharacterKey(selected) !== key);
  } else if (isAnySlotChoice(canon)) {
    charPickerState.choices = [canon];
  } else {
    charPickerState.choices = [...choices.filter((selected) => !isAnySlotChoice(selected)), canon];
  }
  syncCharPickerSelection();
}

function commitCharPickerChoices(choices) {
  const lang = getLang();
  const names = choices.map(canonicalStoredSlotChoice);
  const slot = names.join('/');
  if (!names.length || names.some((name) => !name) || Array.from(slot).length > 40) {
    throw new Error(t('errSlotNameTooLong', {}, lang));
  }
  if (names.length > 1 && names.some(isAnySlotChoice)) {
    throw new Error(L('Wildcard slots must be selected alone.', '任意位需单独选择。', lang));
  }
  const keys = names.map(canonicalCharacterKey);
  if (new Set(keys).size !== keys.length) {
    throw new Error(L('Please pick distinct flex alternatives.', '请选择不同的备选角色。', lang));
  }
  const used = charactersInOtherSlots();
  for (const key of keys) {
    if (used.has(key)) {
      const disp = displayCharacterName(names[keys.indexOf(key)], lang);
      throw new Error(L(`"${disp}" is already in Slot ${used.get(key)}.`, `「${disp}」已在 ${used.get(key)} 号位。`, lang));
    }
  }
  const index = charPickerState.slotIndex;
  const flashbackForm = $('#fbSubmitForm, #fbEditForm');
  if (flashbackForm) {
    const proposedTeam = modalBuildState.chars.map((value, i) => i === index ? slot : value).filter(Boolean);
    validateLineup(proposedTeam, lang);
  }
  modalBuildState.chars[index] = slot;
  if (!canMarkSlotCarry(slot)) modalBuildState.carries[index] = false;
  refreshBuildSlotsGrid();
  closeCharPicker();
}

function refreshPsychubePickerResults() {
  const lang = getLang();
  const grid = $('#psyPickerGrid');
  if (!grid) return;
  const q = psyPickerState.query;
  const filtered = PSYCHUBES.filter((p) => {
    if (psyPickerState.star !== 'all' && String(p.star) !== psyPickerState.star) return false;
    if (psyPickerState.tag !== '全部' && !p.tags.includes(psyPickerState.tag)) return false;
    return psychubeMatchesQuery(p, q);
  });
  grid.innerHTML = filtered.length
    ? filtered.map((p) => {
        const currentPsy = resolvePsychube(modalBuildState.psychubes[psyPickerState.slotIndex]);
        const isSelected = currentPsy?.id === p.id || modalBuildState.psychubes[psyPickerState.slotIndex] === p.name;
        const pName = displayPsychubeName(p, lang);
        const pStat = displayPsychubeStat(p, lang);
        return `
          <button type="button" class="psy-card-option ${isSelected ? 'is-selected' : ''}" data-choose-psy="${esc(p.name)}" title="${esc(pName)} (${p.star}★ · ${esc(pStat)} · v${esc(p.version)})">
            ${renderPsychubeThumbHtml(p.id, 'in-picker', lang)}
            <span class="psy-opt-name">${esc(pName)}</span>
            <span class="psy-opt-meta">${p.star}★ · ${esc(pStat)}</span>
          </button>`;
      }).join('')
    : `<div class="empty-state" style="grid-column:1/-1;padding:28px 12px"><p>${esc(t('psyPickerEmpty', {}, lang))}</p></div>`;
  grid.scrollTop = 0;
  $('#psyPickerOverlay')?.querySelectorAll('[data-psy-star], [data-psy-tag]').forEach((button) => {
    const active = button.dataset.psyStar === psyPickerState.star || button.dataset.psyTag === psyPickerState.tag;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}

function renderPsychubePicker() {
  const lang = getLang();
  const root = $('#psyPickerRoot');
  if (!root) return;
  if (!psyPickerState.open) {
    root.innerHTML = '';
    return;
  }
  const n = psyPickerState.slotIndex + 1;
  const charDisplay = psyPickerState.charName ? displayCharacterName(psyPickerState.charName, lang) : '';
  const targetTitle = charDisplay
    ? `${t('psyPickerTitle', { n }, lang)} · ${charDisplay}`
    : t('psyPickerTitle', { n }, lang);

  root.innerHTML = `
    <div class="psy-picker-overlay" id="psyPickerOverlay">
      <section class="psy-picker-box" role="dialog" aria-modal="true" aria-label="${esc(targetTitle)}">
        <button type="button" class="modal-close" data-action="close-psy-picker" aria-label="${esc(t('btnClose', {}, lang))}">×</button>
        <div class="modal-eyebrow">${esc(L(`PSYCHUBE CODEX · ${PSYCHUBES.length} PSYCHUBES`, `PSYCHUBE CODEX · 官方心相图鉴（共 ${PSYCHUBES.length} 张）`, lang))}</div>
        <h3>${esc(targetTitle)}</h3>
        <div class="psy-picker-toolbar">
          <div class="psy-picker-filters">
            <div class="psy-chip-group" role="group" aria-label="${esc(t('charPickerAllStars', {}, lang))}">
              ${[
                ['all', t('charPickerAllStars', {}, lang)],
                ['6', '6★'],
                ['5', '5★'],
                ['4', '4★']
              ].map(([val, lbl]) =>
                `<button type="button" class="psy-chip ${psyPickerState.star === val ? 'active' : ''}" data-psy-star="${val}">${esc(lbl)}</button>`
              ).join('')}
            </div>
            <div class="psy-chip-group" role="group" aria-label="${esc(L('Filter by Psychube tag', '按定位系别筛选心相', lang))}">
              ${PSYCHUBE_TAGS_META.map((meta) =>
                `<button type="button" class="psy-chip ${psyPickerState.tag === meta.key ? 'active' : ''}" data-psy-tag="${esc(meta.key)}">${esc(displayPsychubeTag(meta.key, lang))}</button>`
              ).join('')}
            </div>
          </div>
          <div class="search-input-wrap">
            <img class="search-input-icon" src="./assets/uttu/btn_search.webp" alt="" aria-hidden="true" />
            <input id="psyPickerSearch" class="filter-input has-icon" type="search" aria-label="${esc(t('psyPickerSearchPlaceholder', {}, lang))}" placeholder="${esc(t('psyPickerSearchPlaceholder', {}, lang))}" value="${esc(psyPickerState.query)}" />
          </div>
        </div>
        <div id="psyPickerGrid" class="psy-picker-grid"></div>
      </section>
    </div>`;
  refreshPsychubePickerResults();
}

function openPsychubePicker(slotIndex) {
  psyPickerState.open = true;
  psyPickerState.slotIndex = slotIndex;
  psyPickerState.charName = String(modalBuildState.chars[slotIndex] || '').trim();
  psyPickerState.star = 'all';
  psyPickerState.tag = '全部';
  psyPickerState.query = '';
  renderPsychubePicker();
  requestAnimationFrame(() => $('#psyPickerSearch')?.focus());
}

function closePsychubePicker() {
  psyPickerState.open = false;
  renderPsychubePicker();
}

/* ==================== Core Utilities ==================== */
function uid() {
  return (globalThis.crypto?.randomUUID)
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function normKey(text) {
  return String(text ?? '').normalize('NFKC').trim().toLowerCase();
}

function splitCarries(value) {
  return String(value ?? '').split(/[/／、]/).map((s) => s.trim()).filter(Boolean);
}

function splitTeam(value) {
  return String(value ?? '').split(/[、，,;；\n]+/).map((s) => s.trim()).filter(Boolean);
}

function parseHttpUrl(value) {
  const text = String(value ?? '').trim();
  if (!text) return '';
  let url;
  try {
    url = new URL(text);
  } catch {
    throw new Error(t('errUrlInvalid'));
  }
  if (
    !['http:', 'https:'].includes(url.protocol) ||
    url.username ||
    url.password ||
    /[\s\\]/u.test(text) ||
    url.href.length > 2048
  ) {
    throw new Error(t('errUrlInvalid'));
  }
  return url.href;
}

function safeLinkHtml(value, label = t('relatedLink')) {
  try {
    const href = parseHttpUrl(value);
    if (!href) return '';
    return `<a class="text-link-btn" href="${esc(href)}" target="_blank" rel="noopener noreferrer ugc">${esc(label)}</a>`;
  } catch {
    return '';
  }
}

function optionsHtml(pairs, selected) {
  return pairs
    .map(([val, lbl]) => `<option value="${esc(val)}"${val === selected ? ' selected' : ''}>${esc(lbl)}</option>`)
    .join('');
}

function toast(message) {
  clearTimeout(toastTimer);
  const el = $('#toast');
  if (!el) return;
  el.textContent = message;
  el.classList.add('visible');
  toastTimer = setTimeout(() => el.classList.remove('visible'), 3800);
}

async function copyText(text) {
  const val = String(text ?? '');
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(val);
      return;
    } catch {}
  }
  const ta = document.createElement('textarea');
  ta.value = val;
  ta.setAttribute('readonly', '');
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  const ok = document.execCommand('copy');
  ta.remove();
  if (!ok) throw new Error(t('toastCopyFailed'));
}

function openModal(html, wide = false) {
  $('#modalRoot').innerHTML = `
    <div class="modal-overlay" id="modalOverlay">
      <section class="modal-box ${wide ? 'wide' : ''}" role="dialog" aria-modal="true">
        <button type="button" class="modal-close" data-action="close-modal" aria-label="${esc(t('btnClose'))}">×</button>
        ${html}
      </section>
    </div>`;
}

let activeUploadPreviewUrl = '';

function renderGlobalServerNoticeHtml(kind, lang = getLang()) {
  if (!isEn(lang)) return '';
  if (kind === 'fb-board') {
    return `
      <div class="global-server-notice is-warning" role="note">
        <div class="global-server-notice-body">
          <span class="global-server-notice-tag">${esc(t('globalFbNoticeTag', {}, lang))}</span>
          <p>${esc(t('globalFbBoardNotice', {}, lang))}</p>
        </div>
        <button type="button" class="outline-btn global-server-notice-cta" data-action="switch-to-mane">${esc(t('globalFbBoardCta', {}, lang))}</button>
      </div>`;
  }
  if (kind === 'fb-submit') {
    return `
      <div class="global-server-notice is-warning in-modal" role="note">
        <div class="global-server-notice-body">
          <span class="global-server-notice-tag">${esc(t('globalFbNoticeTag', {}, lang))}</span>
          <p>${esc(t('globalFbSubmitNotice', {}, lang))}</p>
        </div>
        <button type="button" class="outline-btn global-server-notice-cta" data-action="switch-to-mane-submit">${esc(t('globalFbSubmitCta', {}, lang))}</button>
      </div>`;
  }
  return `
    <div class="global-server-notice is-welcome${kind === 'mane-welcome' ? ' in-modal' : ''}" role="note">
      <div class="global-server-notice-body">
        <span class="global-server-notice-tag">${esc(t('globalManeNoticeTag', {}, lang))}</span>
        <p>${esc(t('globalManeSubmitNotice', {}, lang))}</p>
      </div>
    </div>`;
}

function clearUploadPreview(host) {
  if (activeUploadPreviewUrl) {
    URL.revokeObjectURL(activeUploadPreviewUrl);
    activeUploadPreviewUrl = '';
  }
  if (host) {
    host.innerHTML = '';
    host.hidden = true;
  }
}

function updateUploadPreviewMeta(host, file, extraMeta = '') {
  if (!host || !file) return;
  const metaEl = host.querySelector('.proof-upload-meta');
  if (!metaEl) return;
  const clickHint = L('Click image to zoom', '点击图片可放大');
  const sizeText = formatProofBytes(file.size);
  metaEl.textContent = `${file.name} · ${sizeText}${extraMeta ? ` · ${extraMeta}` : ''} (${clickHint})`;
}

function renderUploadPreview(host, file, extraMeta = '') {
  clearUploadPreview(host);
  const mime = resolveProofMime(file);
  if (!host || !file || !mime || file.size > MAX_PROOF_RAW_BYTES) return;
  activeUploadPreviewUrl = URL.createObjectURL(file);
  const clickHint = L('Click image to zoom', '点击图片可放大');
  host.innerHTML = `<img src="${esc(activeUploadPreviewUrl)}" alt="${esc(L('Screenshot preview', '已选截图预览'))}" title="${esc(clickHint)}" /><span class="proof-upload-meta"></span>`;
  updateUploadPreviewMeta(host, file, extraMeta);
  host.hidden = false;
}

function openProofLightbox(src, alt = L('Screenshot zoom preview', '截图放大预览')) {
  if (!src) return;
  closeProofLightbox();
  const overlay = document.createElement('div');
  overlay.id = 'proofLightboxOverlay';
  overlay.className = 'proof-lightbox-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.innerHTML = `<button type="button" class="proof-lightbox-close" data-action="close-lightbox" aria-label="${esc(t('btnClose'))}">×</button><img src="${esc(src)}" alt="${esc(alt)}" />`;
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target.closest('[data-action="close-lightbox"]')) closeProofLightbox();
  });
  document.body.append(overlay);
}

function closeProofLightbox() {
  $('#proofLightboxOverlay')?.remove();
}

function closeModal() {
  closeProofLightbox();
  clearUploadPreview();
  closeCharPicker();
  closePsychubePicker();
  $('#modalRoot').innerHTML = '';
  void refreshReviewedBoards();
}

function decodeImageFile(blob) {
  return new Promise((resolve, reject) => {
    if (!blob?.size) {
      reject(new Error(L('Screenshot file is empty.', '截图文件为空。')));
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error(L('Failed to read screenshot file.', '截图读取失败。')));
    reader.onload = () => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(L('Screenshot could not be decoded. Please check the image file.', '截图无法解码，请检查图片是否损坏。')));
      img.src = reader.result;
    };
    reader.readAsDataURL(blob);
  });
}

async function checked(promise) {
  const res = await promise;
  const { data, error, status } = res || {};
  if (error) {
    if (status && !error.status) {
      try { error.status = status; } catch {}
    }
    throw error;
  }
  return data;
}

function isTransientSupabaseError(err) {
  const status = Number(err?.status ?? err?.statusCode ?? 0);
  if (status >= 400 && status < 500 && status !== 429 && status !== 408) return false;
  const code = String(err?.code || '');
  if (code && (/^(22|23|42)/.test(code) || code === 'PGRST116' || code === 'PGRST301')) return false;
  if (status >= 500 || status === 429 || status === 408 || status === 0) return true;
  const msg = String(err?.message || '');
  return /fetch|network|timeout|500|502|503|504|temporarily|gateway/i.test(msg);
}

async function retryTransient(fn, retries = 2, delayMs = 450) {
  let lastErr;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (attempt >= retries || !isTransientSupabaseError(err)) throw err;
      await new Promise((r) => setTimeout(r, delayMs * (attempt + 1)));
    }
  }
  throw lastErr;
}

async function loadPages(table, orderKeys, select = '*', applyFilters = null) {
  const rows = [];
  for (let from = 0; ; from += 500) {
    const page = await retryTransient(() => {
      let q = sb.from(table).select(select);
      if (applyFilters) q = applyFilters(q);
      for (const k of orderKeys) q = q.order(k);
      return checked(q.range(from, from + 499));
    });
    rows.push(...(page || []));
    if (!page || page.length < 500) return rows;
  }
}

/* ==================== Sorting & Data Helpers ==================== */
function compareManeScore(a, b) {
  const sa = BigInt(a.score || 0);
  const sbVal = BigInt(b.score || 0);
  if (sa !== sbVal) return sbVal > sa ? 1 : -1;
  return Date.parse(a.created_at) - Date.parse(b.created_at) || String(a.id).localeCompare(String(b.id));
}

function compareFlashbackRecord(a, b) {
  return (
    (Number(a.rounds) - Number(b.rounds)) ||
    (Date.parse(a.created_at) - Date.parse(b.created_at)) ||
    String(a.id).localeCompare(String(b.id))
  );
}

function activeManeMaps(section = state.maneSection) {
  const list = state.maneMaps.filter((m) => m.section === section);
  if (section === 'new') {
    const latestEdition = list[0]?.edition;
    return latestEdition ? list.filter((m) => m.edition === latestEdition) : list;
  }
  return list;
}

function isMapOpen(map) {
  return Boolean(map) && (!map.opens_at || Date.parse(map.opens_at) <= Date.now());
}

function standardStages(versionId) {
  return state.fbStages
    .filter((s) => s.version_id === versionId)
    .sort((a, b) => a.stage_no - b.stage_no);
}

function challengeOccurrences(stage) {
  return state.fbStages.filter((s) => s.challenge_id === stage.challenge_id).length;
}

/* ==================== URL Routing & Deep Links ==================== */
function readHash() {
  const raw = (location.hash || '').replace(/^#/, '');
  if (!raw) return;
  const [pathPart, queryPart = ''] = raw.split('?');
  const [m, p] = pathPart.split('/');
  const params = new URLSearchParams(queryPart);
  const rec = params.get('rec');

  if (m === 'mane') {
    state.mode = 'mane';
    if (['scores', 'totals', 'daily', 'players', 'rules'].includes(p)) state.manePage = p;
    if (state.manePage === 'daily') {
      const d = params.get('date');
      state.maneDaily.date = (d && /^\d{4}-\d{2}-\d{2}$/.test(d)) ? d : '';
      const div = params.get('div');
      state.maneDaily.division = (div === 'zero' || div === 'max') ? div : '';
      state.maneDaily.map = params.get('map') || '';
    } else if (state.manePage === 'players') {
      const scope = params.get('scope');
      if (['all', 'new', 'rerun'].includes(scope)) state.manePlayerScope = scope;
      const div = params.get('div');
      if (['all', 'zero', 'max'].includes(div)) state.manePlayerDiv = div;
    } else {
      const sec = params.get('sec');
      if (sec === 'new' || sec === 'rerun') state.maneSection = sec;
      const div = params.get('div');
      if (div === 'zero' || div === 'max') state.maneDivision = div;
      const mapId = params.get('map');
      if (mapId) state.maneMapId = mapId;
    }
    state.maneMechOpen = params.get('mech') === '1';
    if (rec) {
      state.highlightRecordId = `mane-${rec}`;
      pendingScrollRecordId = `mane-${rec}`;
    } else {
      state.highlightRecordId = '';
    }
  } else if (m === 'flashback') {
    state.mode = 'flashback';
    if (['leaderboard', 'carries', 'players', 'rules'].includes(p)) state.fbPage = p;
    const ver = params.get('ver');
    if (ver) state.fbVersionId = ver;
    const stage = params.get('stage');
    if (stage) state.fbStageId = stage;
    const grp = params.get('grp');
    if (grp === 'zero' || grp === 'max') state.fbGroup = grp;
    const scope = params.get('scope');
    if (scope === 'period' || scope === 'all') state.fbCarryScope = scope;
    const metric = params.get('metric');
    if (metric === 'appearance_count' || metric === 'challenge_count') state.fbCarryMetric = metric;
    state.fbResonanceOnly = !rec && state.fbGroup === 'zero' && params.get('res10') === '1';
    state.fbMechOpen = params.get('mech') === '1';
    if (rec) {
      state.highlightRecordId = `fb-${rec}`;
      pendingScrollRecordId = `fb-${rec}`;
    } else {
      state.highlightRecordId = '';
    }
  }
}

function writeHash() {
  if (state.loading && !state.maneMaps.length && !state.fbVersions.length) return;
  const page = state.mode === 'mane' ? state.manePage : state.fbPage;
  const params = new URLSearchParams();

  if (state.mode === 'mane') {
    if (page === 'scores') {
      params.set('sec', state.maneSection);
      if (state.maneMapId) params.set('map', state.maneMapId);
      params.set('div', state.maneDivision);
      if (state.maneMechOpen) params.set('mech', '1');
      if (state.highlightRecordId.startsWith('mane-')) {
        params.set('rec', state.highlightRecordId.slice(5));
      }
    } else if (page === 'totals') {
      params.set('sec', state.maneSection);
      params.set('div', state.maneDivision);
    } else if (page === 'daily') {
      if (state.maneDaily.date) params.set('date', state.maneDaily.date);
      if (state.maneDaily.division) params.set('div', state.maneDaily.division);
      if (state.maneDaily.map) params.set('map', state.maneDaily.map);
    } else if (page === 'players') {
      if (state.manePlayerScope !== 'all') params.set('scope', state.manePlayerScope);
      if (state.manePlayerDiv !== 'all') params.set('div', state.manePlayerDiv);
    }
  } else {
    if (page === 'leaderboard') {
      if (state.fbVersionId) params.set('ver', state.fbVersionId);
      if (state.fbStageId) params.set('stage', state.fbStageId);
      params.set('grp', state.fbGroup);
      if (state.fbGroup === 'zero' && state.fbResonanceOnly) params.set('res10', '1');
      if (state.fbMechOpen) params.set('mech', '1');
      if (state.highlightRecordId.startsWith('fb-')) {
        params.set('rec', state.highlightRecordId.slice(3));
      }
    } else if (page === 'carries') {
      if (state.fbCarryScope !== 'period') params.set('scope', state.fbCarryScope);
      if (state.fbCarryScope === 'period' && state.fbVersionId) params.set('ver', state.fbVersionId);
      if (state.fbCarryMetric !== 'appearance_count') params.set('metric', state.fbCarryMetric);
    } else if (page === 'players') {
      if (state.fbVersionId) params.set('ver', state.fbVersionId);
    }
  }

  const qs = params.toString();
  const next = `#${state.mode}/${page}${qs ? `?${qs}` : ''}`;
  if (location.hash !== next) {
    try {
      history.replaceState(null, '', `${location.search || ''}${next}`);
    } catch {}
  }
}

function updateUrlLangParam(lang) {
  try {
    const url = new URL(location.href);
    url.searchParams.set('lang', lang);
    history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
  } catch {
    // Ignore on restricted file:// histories
  }
}

function buildRecordDeepLink(item) {
  const lang = getLang();
  const originPart = location.origin && location.origin !== 'null' ? location.origin : '';
  const base = `${originPart}${location.pathname}?lang=${encodeURIComponent(lang)}`;
  if (item.mode === 'mane') {
    if (!item.rank && item.dailyDate) {
      const p = new URLSearchParams({ date: item.dailyDate });
      if (item.division) p.set('div', item.division);
      if (item.mapId) p.set('map', item.mapId);
      return `${base}#mane/daily?${p.toString()}`;
    }
    const p = new URLSearchParams({
      sec: item.section || state.maneSection,
      map: item.mapId || state.maneMapId,
      div: item.division || state.maneDivision,
      rec: String(item.recordId || '')
    });
    return `${base}#mane/scores?${p.toString()}`;
  }
  const p = new URLSearchParams({
    ver: item.versionId || state.fbVersionId,
    stage: item.stageId || state.fbStageId,
    grp: item.group || state.fbGroup,
    rec: String(item.recordId || '')
  });
  return `${base}#flashback/leaderboard?${p.toString()}`;
}

/* ==================== Optional Live Supabase Sync ==================== */
async function ensureSupabaseClient() {
  if (sb) return sb;
  const cfg = window.LEADERBOARD_CONFIG;
  if (!cfg?.supabaseUrl || !cfg?.supabaseAnonKey) {
    throw new Error(L('Missing Supabase configuration in config.js.', '缺少 config.js 后端配置。'));
  }
  let createClient = supabaseVendor?.createClient || supabaseVendor?.default?.createClient || globalThis.supabase?.createClient;
  if (typeof createClient !== 'function') {
    const cdnFallbacks = [
      'https://fastly.jsdelivr.net/npm/@supabase/supabase-js@2/+esm',
      'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm',
      'https://esm.sh/@supabase/supabase-js@2'
    ];
    const dynamicImport = new Function('u', 'return import(u)');
    let lastImportErr;
    for (const cdnUrl of cdnFallbacks) {
      try {
        const mod = await dynamicImport(cdnUrl);
        if (typeof mod?.createClient === 'function') {
          createClient = mod.createClient;
          break;
        }
      } catch (err) {
        lastImportErr = err;
      }
    }
    if (typeof createClient !== 'function') {
      throw lastImportErr || new Error(L('Failed to initialize Supabase client.', '初始化数据库连接失败。'));
    }
  }
  sb = createClient(cfg.supabaseUrl, cfg.supabaseAnonKey);
  if (!authBound) {
    authBound = true;
    sb.auth.onAuthStateChange((_ev, nextSession) => {
      setTimeout(() => syncAuth(nextSession).catch(() => {}), 0);
    });
  }
  return sb;
}

async function syncLiveArchive({ silent = false } = {}) {
  if (state.syncingLive) return;
  state.syncingLive = true;
  renderChrome();
  try {
    await ensureSupabaseClient();
    await Promise.all([loadAllData({ keepOfflineOnFail: true }), syncAuth()]);
    if (state.dataSource === 'live' && !silent) {
      toast(t('offlineSyncOk'));
    }
  } catch (err) {
    console.warn('Live sync failed:', err);
    if (!state.maneMaps.length) {
      await ensureOfflineSnapshot();
      hydrateFromOfflineSnapshot();
    }
    if (isOfflineSandboxMode()) {
      state.dataSource = 'offline';
      state.connected = true;
      state.errorNotice = '';
    } else {
      state.dataSource = 'disconnected';
      state.connected = false;
      state.errorNotice = t('offlineSyncFail');
    }
    state.loading = false;
    if (!silent) toast(t('offlineSyncFail'));
  } finally {
    state.syncingLive = false;
    render();
  }
}

async function loadBoardBundle(board) {
  if (board === 'mane') {
    const [maneMaps, maneData] = await Promise.all([
      retryTransient(() => checked(sb.from('mane_maps').select('id,name,section,edition,position,opens_at,active').eq('active', true))),
      fetchPublicBoardData('mane')
    ]);
    state.maneMaps = (maneMaps || []).sort((a, b) =>
      String(b.edition).localeCompare(String(a.edition), 'en', { numeric: true }) ||
      (a.position - b.position) ||
      String(a.name).localeCompare(String(b.name), 'zh-CN')
    );
    Object.assign(state, maneData);
    return;
  }

  const [fbVersions, fbStages, flashbackData, fbArchives] = await Promise.all([
    retryTransient(() => checked(sb.from('versions').select('id,code,label,created_at'))),
    retryTransient(() => checked(sb.from('stages').select('id,version_id,stage_no,name,challenge_id'))),
    fetchPublicBoardData('flashback'),
    retryTransient(() => checked(sb.from('historical_records').select('id,stage_id,group_code,display_order,carry_names,lineup_label,credited_player')))
  ]);
  state.fbVersions = (fbVersions || []).sort((a, b) =>
    String(b.code).localeCompare(String(a.code), 'en', { numeric: true }) ||
    (Date.parse(b.created_at) - Date.parse(a.created_at))
  );
  state.fbStages = fbStages || [];
  state.fbArchives = fbArchives || [];
  Object.assign(state, flashbackData);
}

async function loadAllData({ keepOfflineOnFail = false } = {}) {
  if (isOfflineSandboxMode() && state.dataSource === 'offline' && !sb) {
    await ensureOfflineSnapshot();
    hydrateFromOfflineSnapshot();
    render();
    return;
  }
  await reviewedBoardRefresh;
  const coveredBoards = [...reviewedBoards];
  reviewedBoards.clear();
  state.loading = true;
  renderChrome();
  try {
    const primaryBoard = state.mode === 'flashback' ? 'flashback' : 'mane';
    const secondaryBoard = primaryBoard === 'mane' ? 'flashback' : 'mane';
    await loadBoardBundle(primaryBoard);

    syncActiveSelectionsAfterLoad();
    state.dataSource = 'live';
    state.connected = true;
    state.errorNotice = '';
    state.loading = false;
    render();

    try {
      await loadBoardBundle(secondaryBoard);
      syncActiveSelectionsAfterLoad();
      render();
    } catch (secondaryErr) {
      reviewedBoards.add(secondaryBoard);
      console.warn(`Secondary board (${secondaryBoard}) sync failed, keeping primary live:`, secondaryErr);
    }
  } catch (err) {
    coveredBoards.forEach((board) => { reviewedBoards.add(board); });
    console.error(err);
    if (!state.maneMaps.length) {
      await ensureOfflineSnapshot();
      hydrateFromOfflineSnapshot();
    }
    if (isOfflineSandboxMode() && keepOfflineOnFail) {
      state.dataSource = 'offline';
      state.connected = true;
      state.errorNotice = '';
      throw err;
    }
    state.dataSource = 'disconnected';
    state.connected = false;
    state.errorNotice = t('offlineSyncFail');
    if (keepOfflineOnFail) throw err;
  } finally {
    state.loading = false;
    render();
    if (state.connected && state.dataSource === 'live') void refreshReviewedBoards();
  }
}

const reviewedBoards = new Set();
let reviewedBoardRefresh = null;

async function fetchPublicBoardData(board) {
  if (board === 'mane') {
    const [maneScores, maneTotals, maneDailyScores] = await Promise.all([
      loadPages('mane_leaderboard', ['id']),
      loadPages('mane_carry_total_leaderboard', ['section', 'edition', 'division', 'carry_key']),
      loadPages('mane_daily_scores', ['id'], 'id,map_id,division,display_name,carry,team,score,approved_at,related_url')
    ]);
    return { maneScores, maneTotals, maneDailyScores };
  }

  const [fbRecords, fbPlayers, fbCarries, fbSubmissionsRaw, fbProfiles] = await Promise.all([
    loadPages('leaderboard_records', ['id']),
    loadPages('flashback_player_rankings_by_scope', ['version_id', 'player_id']),
    loadPages('carry_rankings_by_scope', ['version_id', 'carry_name'], 'version_id,carry_name,challenge_count'),
    loadPages(
      'submissions',
      ['id'],
      'id,player_id,stage_id,group_code,team,carry_name,rounds,created_at,credited_player',
      (q) => q.eq('status', 'approved').is('archived_at', null)
    ),
    loadPages('profiles', ['id'], 'id,display_name')
  ]);
  const profileNameById = new Map((fbProfiles || []).map((p) => [p.id, p.display_name]));
  const fbRecordNameById = new Map((fbRecords || []).map((r) => [r.id, r.display_name]));
  const fbApprovedRecords = (fbSubmissionsRaw || []).map((row) => ({
    ...row,
    display_name: row.credited_player || profileNameById.get(row.player_id) || fbRecordNameById.get(row.id) || ''
  }));
  return { fbRecords, fbPlayers, fbCarries, fbApprovedRecords };
}

function refreshReviewedBoards() {
  if (!sb || state.dataSource !== 'live') return;
  if (reviewedBoardRefresh || !reviewedBoards.size || state.loading || $('#modalOverlay')) return;
  const boards = [...reviewedBoards];
  reviewedBoards.clear();
  reviewedBoardRefresh = Promise.allSettled(boards.map(fetchPublicBoardData)).then((results) => {
    let failed = false;
    for (const [index, result] of results.entries()) {
      if (result.status === 'fulfilled') {
        Object.assign(state, result.value);
        continue;
      }
      reviewedBoards.add(boards[index]);
      failed = true;
      console.error(result.reason);
    }
    reviewedBoardRefresh = null;
    if (results.some((result) => result.status === 'fulfilled')) render();
    if (!failed) void refreshReviewedBoards();
  });
}

async function syncAuth(sessionInput) {
  if (!sb) return;
  try {
    let session = sessionInput;
    if (session === undefined) {
      const res = await checked(sb.auth.getSession());
      session = res.session;
    }
    state.session = session || null;
    state.user = session?.user || null;
    state.profile = null;
    state.isAdmin = false;

    if (state.user) {
      const [profileRes, adminRes] = await Promise.all([
        sb.from('profiles').select('id,display_name').eq('id', state.user.id).maybeSingle(),
        sb.rpc('is_admin')
      ]);
      if (!profileRes.error) state.profile = profileRes.data || null;
      if (!adminRes.error) state.isAdmin = Boolean(adminRes.data);
    }
  } catch (err) {
    console.error(err);
  }
  renderChrome();
}

/* ==================== Visual Components (UTTU Cards, Psychube Dock, Medals, Meta Widget) ==================== */
function igHeading(primary, secondary, right = '') {
  return `
    <div class="ig-heading">
      <span class="ig-heading-left">
        <span class="ig-tri" aria-hidden="true">▶</span>
        <span class="ig-cn">${esc(primary)}</span>
        <span class="ig-bar" aria-hidden="true"></span>
        <span class="ig-en">${esc(secondary)}</span>
      </span>
      ${right ? `<span class="ig-right">${esc(right)}</span>` : ''}
    </div>`;
}

function isLegacyShorthandTeam(team) {
  return (
    Array.isArray(team) &&
    team.length === 1 &&
    !resolveCharacter(team[0]) &&
    (/[+/／]/.test(team[0]) || team[0].length >= 4)
  );
}

function matchesAfflatus(rawName, targetAff) {
  if (!targetAff) return true;
  const aff = resolveAfflatus(rawName);
  if (aff === targetAff) return true;
  if (aff === 'mineral_star' && (targetAff === 'mineral' || targetAff === 'star')) return true;
  return false;
}

function collectBoardCharacters(records, roleMode, getCarryStr, lang = getLang()) {
  const locale = isEn(lang) ? 'en' : 'zh-CN';
  const map = new Map();
  for (const row of records) {
    const names = roleMode === 'member'
      ? extractLineupCharacterNames(row.team, getCarryStr(row))
      : splitCarries(getCarryStr(row));
    const seenInRow = new Set();
    for (const raw of names) {
      if (!resolveCharacter(raw) && roleMode === 'member') continue;
      const key = canonicalCharacterKey(raw);
      if (!key || seenInRow.has(key)) continue;
      seenInRow.add(key);
      const label = displayCharacterName(raw, lang);
      const char = resolveCharacter(raw);
      const cur = map.get(key);
      if (cur) cur.count += 1;
      else map.set(key, { label, count: 1, portrait: char?.portrait || '', char });
    }
  }
  return [...map.entries()].sort((a, b) =>
    (b[1].count - a[1].count) ||
    a[1].label.localeCompare(b[1].label, locale)
  );
}

function renderSidebarMetaWidget(records, getCarryStr, activeCarryKey, mode, lang = getLang()) {
  const carries = collectBoardCharacters(records, 'carry', getCarryStr, lang).slice(0, 4);
  if (!carries.length) {
    return `
      <div class="sidebar-meta-widget">
        ${igHeading(t('headingTopCarries', {}, lang), t('headingTopCarriesEn', {}, lang), L('RUNS', '出场次数', lang))}
        <p class="sidebar-note" style="margin:0">${esc(t('topCarriesEmpty', {}, lang))}</p>
      </div>`;
  }
  return `
    <div class="sidebar-meta-widget">
      ${igHeading(t('headingTopCarries', {}, lang), t('headingTopCarriesEn', {}, lang), L('RUNS', '出场次数', lang))}
      <div class="meta-carry-list">
        ${carries.map(([key, info]) => {
          const active = activeCarryKey === key;
          const runText = isEn(lang) ? (info.count === 1 ? '1 run' : `${info.count} runs`) : `${info.count} 次`;
          return `
            <button type="button" class="meta-carry-row ${active ? 'active' : ''}" data-meta-carry="${esc(key)}" data-meta-mode="${esc(mode)}" title="${esc(info.label)} · ${esc(formatEntries(info.count, lang))}">
              <span class="meta-carry-avatar">
                ${info.portrait
                  ? `<img src="${esc(info.portrait)}" alt="${esc(info.label)}" loading="lazy" decoding="async" />`
                  : `<span class="char-slot-mono">${esc(characterMonogram(info.label))}</span>`}
              </span>
              <span class="meta-carry-info">
                <span class="meta-carry-top">
                  <span class="meta-carry-name">${esc(info.label)}</span>
                  <span class="meta-carry-count">${esc(runText)}</span>
                </span>
              </span>
            </button>`;
        }).join('')}
      </div>
    </div>`;
}

function renderAfflatusFilterHtml(selectedAff, dataAttr, lang = getLang()) {
  return `
    <div class="aff-filter-row" role="group" aria-label="${esc(t('afflatusFilterAria', {}, lang))}">
      ${FILTER_AFFLATUS.map((affKey) => {
        const meta = AFFLATUS_META[affKey];
        const affLabel = localizeAfflatus(affKey, lang);
        const active = selectedAff === affKey;
        return `
          <button type="button" class="aff-filter-btn ${active ? 'active' : ''}" ${dataAttr}="${affKey}" aria-pressed="${active}" title="${esc(t('afflatusOnlyTitle', { aff: affLabel }, lang))}">
            <img src="${esc(meta.icon)}" alt="" aria-hidden="true" />
            <span>${esc(affLabel)}</span>
          </button>`;
      }).join('')}
    </div>`;
}

function renderSlotPsychubeDockHtml(rawPsy, lang = getLang()) {
  const val = String(rawPsy ?? '').trim();
  if (!val) return '';
  const psy = resolvePsychube(val);
  const pName = displayPsychubeName(psy || val, lang);
  const openAttr = `data-open-psy="${esc(psy ? psy.id : val)}" role="button" tabindex="0"`;
  if (!psy) {
    return `
      <div class="slot-psy-dock is-clickable" ${openAttr} aria-label="${esc(pName)}">
        <span class="slot-psy-frame"><span>✦</span></span>
        <span class="slot-psy-tooltip">${esc(pName)}</span>
      </div>`;
  }
  const pStat = displayPsychubeStat(psy, lang);
  return `
    <div class="slot-psy-dock is-clickable" ${openAttr} aria-label="${esc(pName)}">
      <span class="slot-psy-frame">
        <img class="slot-psy-bg" src="${esc(psychubeFrameSrc(psy.star))}" alt="" aria-hidden="true" loading="lazy" decoding="async" />
        <img class="slot-psy-icon" src="${esc(psychubeIconSrc(psy.id))}" alt="${esc(pName)}" loading="lazy" decoding="async" />
      </span>
      <span class="slot-psy-tooltip">${esc(pName)} · ${psy.star}★ ${esc(pStat)}</span>
    </div>`;
}

function renderFormationHtml(team, carryStr, psychubes = [], lang = getLang()) {
  const slots = parseLineupSlots(team, carryStr);
  if (!slots.length) return '';

  if (slots.length === 1 && slots[0].type === 'legacy') {
    return `<div class="legacy-team-ribbon"><small>${esc(t('legacyTeamLabel', {}, lang))}</small><span>${esc(slots[0].raw)}</span></div>`;
  }

  const carrySet = new Set(splitCarries(carryStr).map(canonicalCharacterKey));
  const psyList = Array.isArray(psychubes) ? psychubes : [];
  const mainTag = isEn(lang) ? 'MAIN' : '主C';

  return `<div class="formation-strip">${slots.map((slot, idx) => {
    const psyDock = renderSlotPsychubeDockHtml(psyList[idx], lang);

    if (slot.type === 'flex') {
      const pics = slot.chars.slice(0, 4);
      const gridClass = pics.length <= 2 ? 'cols-2' : pics.length === 3 ? 'cols-3' : 'cols-4';
      const fmt = formatFlexSlot(slot, lang);
      return `
        <div class="formation-unit">
          <div class="formation-slot is-flex has-portrait" title="${esc(fmt.title)}">
            <div class="slot-flex-collage ${gridClass}">
              ${pics.map((c) => `<img src="${esc(c.portrait)}" alt="${esc(displayCharacterName(c.name, lang))}" loading="lazy" decoding="async" />`).join('')}
            </div>
            <div class="slot-vignette" aria-hidden="true"></div>
            <span class="slot-flex-tag">${esc(fmt.tag)}</span>
            <div class="slot-namebar">${esc(fmt.label)}</div>
          </div>
          ${psyDock}
        </div>`;
    }

    if (slot.type === 'wild') {
      const fmt = formatWildSlot(slot, lang);
      return `
        <div class="formation-unit">
          <div class="formation-slot is-wild" title="${esc(fmt.title)}">
            <img class="slot-card-bg" src="./assets/uttu/bg_kapaidi.png" alt="" aria-hidden="true" loading="lazy" decoding="async" />
            <div class="slot-wild-body" aria-hidden="true">
              <span class="slot-wild-glyph">✦</span>
              <span class="slot-wild-sub">${esc(fmt.sub)}</span>
            </div>
            <div class="slot-namebar">${esc(fmt.label)}</div>
          </div>
          ${psyDock}
        </div>`;
    }

    const rawName = slot.raw || '';
    const char = slot.char || resolveCharacter(rawName);
    const displayName = char ? displayCharacterName(char.name, lang) : displayCharacterName(rawName, lang);
    const affKey = char?.aff || resolveAfflatus(rawName);
    const aff = AFFLATUS_META[affKey] || AFFLATUS_META.unknown;
    const affDisplay = localizeAfflatus(affKey, lang);
    const isCarry = carrySet.has(char ? `char:${char.id}` : canonicalCharacterKey(rawName));
    const mono = characterMonogram(displayName);
    const hasPortrait = Boolean(char?.portrait);
    const raritySrc = rarityOverlaySrc(char?.star || 6);
    const affHtml = aff.icon
      ? `<img class="slot-aff-img" src="${esc(aff.icon)}" alt="${esc(affDisplay)}" loading="lazy" decoding="async" />`
      : `<span class="slot-ribbon" style="background:${aff.ribbon}" aria-label="${esc(affDisplay)}">${afflatusSvg(affKey)}</span>`;
    const tooltip = [
      displayName,
      affKey !== 'unknown' ? affDisplay : '',
      char?.star ? `${char.star}★` : '',
      isCarry ? t('mainDpsLabel', {}, lang) : ''
    ].filter(Boolean).join(' · ');

    return `
      <div class="formation-unit">
        <div class="formation-slot is-clickable ${isCarry ? 'is-carry' : ''} ${hasPortrait ? 'has-portrait' : ''}" data-open-char="${esc(char ? char.name : rawName)}" role="button" tabindex="0" title="${esc(tooltip)}">
          <img class="slot-card-bg" src="./assets/uttu/bg_kapaidi.png" alt="" aria-hidden="true" loading="lazy" decoding="async" />
          <div class="slot-center" aria-hidden="true">
            ${insightWatermarkSvg()}
            <span class="slot-monogram">${esc(mono)}</span>
          </div>
          ${hasPortrait ? `<img class="slot-portrait" src="${esc(char.portrait)}" alt="${esc(displayName)}" loading="lazy" decoding="async" onerror="this.closest('.formation-slot')?.classList.remove('has-portrait');this.remove()" />` : ''}
          <img class="slot-rarity-layer" src="${esc(raritySrc)}" alt="" aria-hidden="true" loading="lazy" decoding="async" />
          <div class="slot-vignette" aria-hidden="true"></div>
          ${affHtml}
          ${isCarry ? `<span class="slot-carry-tag">${esc(mainTag)}</span>` : ''}
          <div class="slot-namebar">${esc(displayName)}</div>
        </div>
        ${psyDock}
      </div>`;
  }).join('')}</div>`;
}

function renderCarryAvatarHtml(carryName, lang = getLang()) {
  const char = resolveCharacter(carryName);
  const displayName = displayCharacterName(carryName, lang);
  const affKey = char?.aff || resolveAfflatus(carryName);
  const aff = AFFLATUS_META[affKey] || AFFLATUS_META.unknown;
  const affDisplay = localizeAfflatus(affKey, lang);
  if (char?.portrait) {
    return `
      <span class="carry-avatar" title="${esc(displayName)} · ${esc(affDisplay)}">
        <img class="carry-avatar-pic" src="${esc(char.portrait)}" alt="${esc(displayName)}" loading="lazy" decoding="async" onerror="this.remove()" />
        <img class="carry-avatar-rar" src="${esc(rarityOverlaySrc(char.star || 6))}" alt="" aria-hidden="true" loading="lazy" decoding="async" />
        ${aff.icon
          ? `<img class="carry-avatar-aff-img" src="${esc(aff.icon)}" alt="${esc(affDisplay)}" loading="lazy" decoding="async" />`
          : `<span class="carry-avatar-aff" style="background:${aff.ribbon}">${afflatusSvg(affKey)}</span>`}
      </span>`;
  }
  return `<span class="inline-aff-dot" style="background:${aff.ribbon}">${afflatusSvg(affKey)}</span>`;
}

function renderRankBadge(rank, lang = getLang()) {
  const aria = t('rankAria', { rank }, lang);
  if (rank === 1 || rank === 2 || rank === 3) {
    return `<span class="rank-badge medal r${rank} has-official-badge" aria-label="${esc(aria)}"><img class="rank-badge-img" src="./assets/official/ranking-${rank}.png" alt="#${rank}" loading="lazy" decoding="async" /></span>`;
  }
  return `<span class="rank-badge" aria-label="${esc(aria)}">${String(rank).padStart(2, '0')}</span>`;
}

function renderGradeStamp(score, lang = getLang()) {
  const g = resolveManeGrade(score, lang);
  const titleText = `${g.subGrade || g.grade}${g.tag ? ` · ${g.tag}` : ''}`;
  if (g.img) {
    return `
      <span class="grade-badge-wrap ${g.tier}" title="${esc(titleText)}">
        <img class="grade-badge-img" src="${esc(g.img)}" alt="${esc(g.subGrade || g.grade)}" loading="lazy" decoding="async" />
        ${g.tag ? `<span class="grade-mythic-pill">${esc(g.tag)}</span>` : ''}
      </span>`;
  }
  return `<span class="grade-crest ${g.tier}" title="${esc(titleText)}"><span>${esc(g.grade)}</span></span>`;
}

function findManeSitewidePeak() {
  const activeMapById = new Map(state.maneMaps.map((m) => [m.id, m]));
  let best = null;
  let bestScore = -1n;
  for (const rec of state.maneScores) {
    const map = activeMapById.get(rec.map_id);
    if (!map) continue;
    const s = BigInt(rec.score || 0);
    if (s > bestScore || (s === bestScore && best && compareManeScore(rec, best.rec) < 0)) {
      bestScore = s;
      best = { rec, map, score: s };
    }
  }
  return best;
}

function findFlashbackSitewidePeak() {
  const stageById = new Map(state.fbStages.map((s) => [s.id, s]));
  let best = null;
  for (const rec of state.fbRecords) {
    const stage = stageById.get(rec.stage_id);
    if (!stage) continue;
    if (!best || compareFlashbackRecord(rec, best.rec) < 0) {
      best = { rec, stage };
    }
  }
  return best;
}

/* ==================== Topbar Chrome, Footer & Magazine Masthead ==================== */
function renderChrome() {
  const lang = getLang();
  const en = isEn(lang);
  const issue = localizeIssueMeta(window.LEADERBOARD_CONFIG?.issueMeta, lang);

  document.body.dataset.mode = state.mode;
  document.body.dataset.lang = lang;
  document.documentElement.lang = en ? 'en' : 'zh-CN';
  document.title = state.mode === 'mane' ? t('pageTitleMane', {}, lang) : t('pageTitleFb', {}, lang);

  const brandLink = $('#brandHomeLink');
  if (brandLink) brandLink.setAttribute('aria-label', t('brandHomeAria', {}, lang));
  const glyphEl = $('#brandGlyph');
  if (glyphEl) glyphEl.textContent = state.mode === 'mane' ? t('brandGlyphMane', {}, lang) : t('brandGlyphFb', {}, lang);
  const titleEl = $('#brandTitle');
  if (titleEl) titleEl.textContent = state.mode === 'mane' ? t('brandTitleMane', {}, lang) : t('brandTitleFb', {}, lang);
  const subEl = $('#brandSub');
  if (subEl) subEl.textContent = t('brandSub', {}, lang);

  const modeSwitcher = $('#modeSwitcher');
  if (modeSwitcher) modeSwitcher.setAttribute('aria-label', t('modeSwitcherAria', {}, lang));
  const modeManeLabel = $('#modeManeLabel');
  if (modeManeLabel) modeManeLabel.textContent = t('modeMane', {}, lang);
  const modeFbLabel = $('#modeFbLabel');
  if (modeFbLabel) modeFbLabel.textContent = t('modeFlashback', {}, lang);

  document.querySelectorAll('[data-mode-switch]').forEach((btn) => {
    const active = btn.dataset.modeSwitch === state.mode;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-selected', String(active));
  });

  document.querySelectorAll('[data-set-lang]').forEach((btn) => {
    const active = btn.dataset.setLang === lang;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', String(active));
  });

  const badge = $('#connectionBadge');
  const connText = $('#connectionText');
  const isOfflineSandbox = isOfflineSandboxMode() && state.dataSource === 'offline';
  const isDisconnected = !isOfflineSandbox && !state.connected && !state.syncingLive && !state.loading;
  if (badge && connText) {
    badge.classList.toggle('is-offline-archive', isOfflineSandbox && !state.syncingLive);
    badge.classList.toggle('online', !isOfflineSandbox && state.connected && !state.syncingLive);
    badge.classList.toggle('offline', isDisconnected);
    if (state.syncingLive || state.loading) {
      connText.textContent = t('statusSyncing', {}, lang);
    } else if (isOfflineSandbox) {
      connText.textContent = L(`Offline Archive · v${issue.version}`, `离线档案 · v${issue.version}`, lang);
    } else if (state.connected) {
      connText.textContent = t('statusLive', {}, lang);
    } else {
      connText.textContent = L('Connection Lost · Retry', '实时连接中断 · 请重试', lang);
    }
  }

  const syncBtn = $('#syncLiveBtn');
  if (syncBtn) {
    syncBtn.hidden = !(isOfflineSandbox || isDisconnected);
    syncBtn.disabled = state.syncingLive;
    syncBtn.textContent = state.syncingLive ? t('statusSyncing', {}, lang) : `${t('btnSyncLive', {}, lang)} ↻`;
  }

  const canSubmitMane = state.connected && state.maneMaps.some(isMapOpen);
  const canSubmitFb = state.connected && state.fbStages.length > 0;
  const submitBtn = $('#submitBtn');
  if (submitBtn) {
    submitBtn.disabled = state.mode === 'mane' ? !canSubmitMane : !canSubmitFb;
    const submitMain = $('#submitBtnMain');
    const submitSub = $('#submitBtnSub');
    if (submitMain) {
      submitMain.innerHTML = en
        ? `+ Submit<span class="cta-ext"> Record</span>`
        : `＋ 投稿<span class="cta-ext">成绩</span>`;
    }
    if (submitSub) {
      submitSub.textContent = state.mode === 'mane' ? t('ctaSubMane', {}, lang) : t('ctaSubFb', {}, lang);
    }
  }

  const adminBtn = $('#adminCenterBtn');
  if (adminBtn) {
    adminBtn.hidden = !state.isAdmin;
    adminBtn.innerHTML = `<span class="acc-full">${esc(t('btnAdmin', {}, lang))}</span><span class="acc-short">${esc(t('btnAdminShort', {}, lang))}</span>`;
  }

  const mySubBtn = $('#mySubmissionsBtn');
  if (mySubBtn) {
    mySubBtn.innerHTML = `<span class="acc-full">${esc(t('btnMySubmissions', {}, lang))}</span><span class="acc-short">${esc(t('btnMySubmissionsShort', {}, lang))}</span>`;
  }

  const accBtn = $('#accountBtn');
  if (accBtn) {
    let accFull = t('btnAdminLogin', {}, lang);
    let accShort = t('btnAdminLoginShort', {}, lang);
    if (state.isAdmin) {
      accFull = t('accountAdmin', {}, lang);
      accShort = t('accountAdminShort', {}, lang);
    } else if (state.profile?.display_name) {
      accFull = state.profile.display_name;
      accShort = state.profile.display_name.slice(0, 6);
    } else if (state.user && !state.user.is_anonymous) {
      accFull = t('accountUser', {}, lang);
      accShort = t('accountUserShort', {}, lang);
    }
    accBtn.innerHTML = `<span class="acc-full">${esc(accFull)}</span><span class="acc-short">${esc(accShort)}</span>`;
  }

  // Secondary Navigation
  const subnavBar = $('#subnavBar');
  if (subnavBar) subnavBar.setAttribute('aria-label', t('subnavAria', {}, lang));
  const tabs = state.mode === 'mane'
    ? [
        ['scores', t('navScores', {}, lang)],
        ['daily', t('navDaily', {}, lang)],
        ['totals', t('navTotals', {}, lang)],
        ['players', t('navPlayers', {}, lang)],
        ['rules', t('navRules', {}, lang)]
      ]
    : [
        ['leaderboard', t('navFbLeaderboard', {}, lang)],
        ['carries', t('navFbCarries', {}, lang)],
        ['players', t('navFbPlayers', {}, lang)],
        ['rules', t('navFbRules', {}, lang)]
      ];
  const activePage = state.mode === 'mane' ? state.manePage : state.fbPage;
  const subnavTabsHtml = tabs.map(([key, label]) =>
    `<button type="button" class="subnav-tab ${key === activePage ? 'active' : ''}" data-subpage="${key}">${esc(label)}</button>`
  ).join('');
  const subnavMetaText = state.mode === 'mane' ? t('subnavMetaMane', {}, lang) : t('subnavMetaFb', {}, lang);
  const subnavTabsEl = $('#subnavTabs');
  const subnavMetaEl = $('#subnavMeta');
  if (subnavTabsEl) {
    subnavTabsEl.innerHTML = subnavTabsHtml;
    if (subnavMetaEl) subnavMetaEl.textContent = subnavMetaText;
  } else {
    $('#subnav').innerHTML = `
      <div class="subnav-tabs" id="subnavTabs">${subnavTabsHtml}</div>
      <div class="subnav-right" id="subnavRight"><span class="subnav-meta" id="subnavMeta">${esc(subnavMetaText)}</span></div>`;
  }

  // Global notice bar
  const noticeEl = $('#globalNotice');
  if (noticeEl) {
    if (state.errorNotice) {
      noticeEl.hidden = false;
      noticeEl.classList.add('is-error');
      noticeEl.innerHTML = `<span>${esc(state.errorNotice)}</span><button type="button" class="outline-btn" data-action="sync-live">${esc(t('btnReconnect', {}, lang))}</button>`;
    } else {
      noticeEl.hidden = true;
      noticeEl.classList.remove('is-error');
      noticeEl.innerHTML = '';
    }
  }

  // Localized Footer
  const footerEl = $('#siteFooter');
  if (footerEl) {
    const wikiManeHref = en
      ? 'https://reverse1999.fandom.com/wiki/Mane%27s_Bulletin'
      : 'https://res1999.huijiwiki.com/wiki/%E9%AC%83%E6%AF%9B%E9%82%AE%E6%8A%A5';
    const wikiFbHref = en
      ? 'https://reverse1999.fandom.com/wiki/Focused_Flashback'
      : 'https://res1999.huijiwiki.com/wiki/%E7%84%A6%E7%82%B9%E9%97%AA%E5%9B%9E';
    const wikiManeLabel = en
      ? "Reverse: 1999 Wiki · Mane's Bulletin ↗"
      : t('footerWikiMane', {}, lang);
    const wikiFbLabel = en
      ? 'Reverse: 1999 Wiki · Focused Flashback ↗'
      : t('footerWikiFb', {}, lang);
    const creditsHtml = en
      ? `Curator: <span class="is-player-name">幻化凌风</span> (<a href="https://space.bilibili.com/266889606" target="_blank" rel="noopener noreferrer">Bilibili ↗</a>) · Moderators: <span class="is-player-name">寻屿</span>, <span class="is-player-name">莳雨枫椛</span>, <span class="is-player-name">偶尔出现的神秘猫猫头</span>, <span class="is-player-name">椋-喵</span>`
      : `社区榜单站长：幻化凌风（<a href="https://space.bilibili.com/266889606" target="_blank" rel="noopener noreferrer">哔哩哔哩主页 ↗</a>）· 管理员：寻屿、莳雨枫椛、偶尔出现的神秘猫猫头、椋-喵`;

    footerEl.innerHTML = `
      <div class="footer-inner">
        <div class="footer-col">
          <div class="footer-brand">
            <strong>${esc(t('footerBrandTitle', {}, lang))}</strong>
            <span>${esc(t('footerBrandSub', {}, lang))}</span>
          </div>
          <p class="footer-credits">${creditsHtml}</p>
        </div>
        <div class="footer-col footer-links">
          <div class="footer-ref-links">
            <a href="${esc(wikiManeHref)}" target="_blank" rel="noopener noreferrer">${esc(wikiManeLabel)}</a>
            <a href="${esc(wikiFbHref)}" target="_blank" rel="noopener noreferrer">${esc(wikiFbLabel)}</a>
          </div>
          <p class="footer-disclaimer">${esc(t('footerDisclaimer', {}, lang))}</p>
        </div>
      </div>`;
  }
}

function renderMasthead() {
  const lang = getLang();
  const issue = localizeIssueMeta(window.LEADERBOARD_CONFIG?.issueMeta, lang);

  if (state.mode === 'mane') {
    const newMaps = activeManeMaps('new');
    const rerunMaps = activeManeMaps('rerun');
    const players = new Set(state.maneScores.map((r) => normKey(r.display_name)).filter(Boolean)).size;
    const peak = findManeSitewidePeak();
    const peakBossArt = peak ? resolveBossAsset(peak.map.name, peak.map.section) : null;
    const peakGrade = peak ? resolveManeGrade(peak.score, lang) : null;
    const peakSource = peak
      ? `${displayBossName(peak.map.name, lang)} · ${localizeDivisionShort(peak.rec.division, lang)}`
      : t('sitePeakFallback', {}, lang);

    $('#masthead').innerHTML = `
      <span class="masthead-stencil" aria-hidden="true">MANE’S BULLETIN</span>
      <div class="masthead-identity">
        <div class="masthead-title-row">
          <span class="title-seal-orb" aria-hidden="true"></span>
          <h1>${esc(t('maneTitle', {}, lang))}</h1>
          <span class="masthead-en">${esc(t('maneEnTag', {}, lang))}</span>
        </div>
        <span class="masthead-edition-ribbon">
          <span class="edition-hourglass" aria-hidden="true">⧗</span>
          <span>${esc(issue.fullLabel)}</span>
          <span class="edition-sep" aria-hidden="true"></span>
          <span class="edition-badge-text">${esc(localizeSection(state.maneSection, lang))}</span>
        </span>
        <p class="masthead-motto">${esc(t('maneMotto', {}, lang))}</p>
      </div>
      <div class="masthead-metrics" aria-label="${esc(t('mastheadMetricsAria', {}, lang))}">
        <div class="mstat-cell">
          <strong>${state.maneScores.length || '—'}</strong>
          <small>${esc(t('metricRecords', {}, lang))}</small>
        </div>
        <div class="mstat-cell">
          <strong>${players || '—'}</strong>
          <small>${esc(t('metricInvestigators', {}, lang))}</small>
        </div>
        <div class="mstat-cell">
          <strong>${newMaps.length} / ${rerunMaps.length}</strong>
          <small>${esc(t('metricBosses', {}, lang))}</small>
        </div>
        ${peak
          ? `<button type="button" class="mstat-cell mstat-jump is-peak-card" data-jump-mane-record="${esc(peak.rec.id)}" data-jump-section="${esc(peak.map.section)}" data-jump-map="${esc(peak.map.id)}" data-jump-div="${esc(peak.rec.division)}" title="${esc(t('jumpPeakTitle', { source: peakSource }, lang))}">
               ${peakBossArt?.thumb ? `<span class="peak-card-art" style="background-image:url('${esc(peakBossArt.thumb)}')" aria-hidden="true"></span>` : ''}
               <div class="peak-card-top">
                 ${peakGrade?.img ? `<img class="peak-mini-grade" src="${esc(peakGrade.img)}" alt="" aria-hidden="true" />` : ''}
                 <strong>${formatScore(peak.score, lang)}</strong>
               </div>
               <small><span class="jump-tag">${esc(t('jumpTagPeak', {}, lang))}</span><span class="jump-desc">${esc(peakSource)} ↗</span></small>
             </button>`
          : `<div class="mstat-cell"><strong>—</strong><small>${esc(t('metricSitePeak', {}, lang))}</small></div>`
        }
      </div>`;
  } else {
    const activeVer = state.fbVersions.find((v) => v.id === state.fbVersionId) || state.fbVersions[0];
    const activePlayers = buildMergedFlashbackPlayers(state.fbVersionId).length;
    const peak = findFlashbackSitewidePeak();
    const peakArt = peak ? resolveFlashbackStageArt(peak.stage) : null;
    const peakSource = peak
      ? `${cleanStageDisplayName(peak.stage.name, lang)} · ${localizeDivisionShort(peak.rec.group_code, lang)}`
      : t('fbRoundWindowFallback', {}, lang);

    $('#masthead').innerHTML = `
      <span class="masthead-stencil" aria-hidden="true">FLASHBACK</span>
      <div class="astrolabe-ornament" aria-hidden="true"></div>
      <div class="masthead-identity">
        <div class="masthead-title-row">
          <span class="title-seal-orb" aria-hidden="true"></span>
          <h1>${esc(t('fbTitle', {}, lang))}</h1>
          <span class="masthead-en">${esc(t('fbEnTag', {}, lang))}</span>
        </div>
        <span class="masthead-edition-ribbon">
          <span class="edition-hourglass" aria-hidden="true">⧗</span>
          <span>${esc(activeVer ? localizeVersionLabel(activeVer, lang) : t('fbCycleFallback', {}, lang))}</span>
          <span class="edition-sep" aria-hidden="true"></span>
          <span class="edition-badge-text">${esc(t('fbRoundLimitTag', {}, lang))}</span>
        </span>
        <p class="masthead-motto">${esc(t('fbMotto', {}, lang))}</p>
      </div>
      <div class="masthead-metrics" aria-label="${esc(t('fbMetricsAria', {}, lang))}">
        <div class="mstat-cell">
          <strong>${state.fbRecords.length || '—'}</strong>
          <small>${esc(t('metricRecords', {}, lang))}</small>
        </div>
        <div class="mstat-cell">
          <strong>${activePlayers || '—'}</strong>
          <small>${esc(t('metricHonoredPlayers', {}, lang))}</small>
        </div>
        <div class="mstat-cell">
          <strong>${state.fbVersions.length || '—'}</strong>
          <small>${esc(t('metricCycles', {}, lang))}</small>
        </div>
        ${peak
          ? `<button type="button" class="mstat-cell mstat-jump is-peak-card" data-jump-fb-record="${esc(peak.rec.id)}" data-jump-ver="${esc(peak.stage.version_id)}" data-jump-stage="${esc(peak.stage.id)}" data-jump-grp="${esc(peak.rec.group_code)}" title="${esc(t('jumpFastestTitle', { source: peakSource }, lang))}">
               ${peakArt?.thumb ? `<span class="peak-card-art" style="background-image:url('${esc(peakArt.thumb)}')" aria-hidden="true"></span>` : ''}
               <div class="peak-card-top">
                 <strong>${esc(formatRounds(peak.rec.rounds, lang))}</strong>
               </div>
               <small><span class="jump-tag">${esc(t('jumpTagFastest', {}, lang))}</span><span class="jump-desc">${esc(peakSource)} ↗</span></small>
             </button>`
          : `<div class="mstat-cell"><strong>06</strong><small>${esc(t('fbRoundCap', {}, lang))}</small></div>`
        }
      </div>`;
  }
}

/* ==================== Mechanics Drawers, Status Glossary, Board Intel, Dossiers & Comparison ==================== */
function highlightMechText(text, lang = getLang()) {
  return esc(text)
    .replace(/\[([^\]]+)\]/g, (match, inner) => {
      const entry = lookupStatusTerm(inner, lang);
      if (entry) {
        return `<button type="button" class="mech-keyword-btn ${esc(entry.badgeClass)}" data-glossary-term="${esc(entry.key)}">[${inner}]</button>`;
      }
      return `<span class="mech-kw">[${inner}]</span>`;
    })
    .replace(/【([^】]+)】/g, '<strong class="mech-em">【$1】</strong>');
}

function closeGlossaryPopover() {
  state.glossaryOpen = null;
  const root = $('#glossaryPopoverRoot');
  if (root) root.innerHTML = '';
}

function openGlossaryPopover(termKey, anchorEl) {
  const lang = getLang();
  const entry = lookupStatusTerm(termKey, lang);
  const root = $('#glossaryPopoverRoot');
  if (!entry || !root) return;

  const catMeta = STATUS_CATEGORY_META[entry.category] || STATUS_CATEGORY_META.special;
  const catLabel = entry.categoryLabel || (isEn(lang) ? catMeta.labelEn : catMeta.labelZh);
  let subText = '';
  if (isEn(lang)) {
    const enAliases = (entry.aliases || []).filter((a) => a && !/[\u4e00-\u9fff]/.test(a));
    if (enAliases.length) subText = enAliases.slice(0, 3).join(' · ');
  } else if (entry.en && entry.en !== entry.zh) {
    subText = entry.en;
  }

  state.glossaryOpen = { key: entry.key };
  root.innerHTML = `
    <div class="glossary-popover" id="glossaryPopover" role="dialog" aria-label="${esc(t('glossaryTitle', {}, lang))}" style="visibility:hidden;left:12px;top:12px">
      <div class="glossary-pop-head">
        <div>
          <strong>${esc(entry.name)}</strong>
          <div><span class="glossary-pop-cat">${esc(catLabel)}</span></div>
          ${subText ? `<div class="glossary-pop-sub">${esc(subText)}</div>` : ''}
        </div>
        <button type="button" class="glossary-pop-close" data-action="close-glossary" aria-label="${esc(t('glossaryClose', {}, lang))}">×</button>
      </div>
      <div class="glossary-pop-body">
        <p>${highlightMechText(entry.desc, lang)}</p>
      </div>
    </div>`;

  const pop = $('#glossaryPopover');
  if (!pop) return;
  const rect = anchorEl?.getBoundingClientRect ? anchorEl.getBoundingClientRect() : null;
  const vw = window.innerWidth || 1024;
  const vh = window.innerHeight || 768;
  const popRect = pop.getBoundingClientRect();
  const popW = popRect.width || 320;
  const popH = popRect.height || 160;
  let left = rect ? rect.left + (rect.width / 2) - (popW / 2) : (vw - popW) / 2;
  let top = rect ? rect.bottom + 8 : (vh - popH) / 2;
  left = Math.max(10, Math.min(left, vw - popW - 10));
  if (rect && top + popH > vh - 12 && rect.top - popH - 8 >= 10) {
    top = rect.top - popH - 8;
  } else {
    top = Math.max(10, Math.min(top, vh - popH - 10));
  }
  pop.style.left = `${Math.round(left)}px`;
  pop.style.top = `${Math.round(top)}px`;
  pop.style.visibility = 'visible';
}

function renderMechCounterTipsHtml(mech, lang = getLang()) {
  const tips = Array.isArray(mech?.counterTips) ? mech.counterTips.filter(Boolean) : [];
  if (!tips.length) return '';
  return `
    <div class="mech-tips-card">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap">
        <strong>✦ ${esc(t('counterTipsHeading', {}, lang))}</strong>
        <small style="font-size:10.5px;color:var(--brass)">${esc(t('glossaryHint', {}, lang))}</small>
      </div>
      <ul>
        ${tips.map((tip) => `<li>${highlightMechText(tip, lang)}</li>`).join('')}
      </ul>
    </div>`;
}

function renderManeBossMechanicsDrawer(mech, lang = getLang()) {
  if (!mech || !state.maneMechOpen) return '';
  return `
    <div class="boss-mech-drawer" role="region" aria-label="${esc(t('mechAriaMane', {}, lang))}">
      <div class="mech-drawer-top">
        <div class="mech-top-meta">
          <span class="mech-badge">${esc(mech.modeTag)}</span>
          <span class="mech-field-tag">${esc(mech.battlefield)}</span>
          <span class="mech-favored">${esc(mech.favoredText)}</span>
        </div>
        <button type="button" class="mech-close-btn" data-action="toggle-mane-mech">${esc(t('btnCollapseMech', {}, lang))}</button>
      </div>

      <div class="mech-env-block">
        <div class="mech-section-label">${esc(t('mechEnvLabel', {}, lang))}</div>
        <ul class="mech-env-list">
          ${(mech.envRules || []).map((line) => `<li>${highlightMechText(line, lang)}</li>`).join('')}
        </ul>
      </div>

      <div class="mech-passives-block">
        <div class="mech-section-label">${esc(t('mechPassivesLabel', {}, lang))}</div>
        <div class="mech-passives-grid">
          ${(mech.passives || []).map((p) => `
            <div class="mech-passive-card">
              <strong>${esc(p.name)}</strong>
              <p>${highlightMechText(p.desc, lang)}</p>
            </div>`).join('')}
        </div>
      </div>

      ${renderMechCounterTipsHtml(mech, lang)}

      ${mech.thresholds?.length ? `
        <div class="mech-thresholds-block">
          <div class="mech-section-label">${esc(t('mechThresholdsLabel', {}, lang))}</div>
          <div class="mech-threshold-grid">
            ${mech.thresholds.map((step) => `
              <div class="mech-threshold-item">
                <span class="mech-score-pill">${esc(step.score)}</span>
                <p>${highlightMechText(step.desc, lang)}</p>
              </div>`).join('')}
          </div>
        </div>` : ''}
    </div>`;
}

function renderFlashbackStageMechanicsDrawer(mech, lang = getLang()) {
  if (!mech || !state.fbMechOpen) return '';
  return `
    <div class="boss-mech-drawer" role="region" aria-label="${esc(t('mechAriaFb', {}, lang))}">
      <div class="mech-drawer-top">
        <div class="mech-top-meta">
          <span class="mech-badge">${esc(mech.modeTag)}</span>
          <span class="mech-favored">${esc(t('mechEnemiesLabel', {}, lang))}: ${esc(mech.enemies)}</span>
        </div>
        <button type="button" class="mech-close-btn" data-action="toggle-fb-mech">${esc(t('btnCollapseStageMech', {}, lang))}</button>
      </div>

      <div class="mech-env-block">
        <div class="mech-section-label">${esc(t('mechFbEnvLabel', {}, lang))}</div>
        <ul class="mech-env-list">
          ${(mech.envRules || []).map((line) => `<li>${highlightMechText(line, lang)}</li>`).join('')}
        </ul>
      </div>

      <div class="mech-passives-block">
        <div class="mech-section-label">${esc(t('mechFbPassivesLabel', {}, lang))}</div>
        <div class="mech-passives-grid">
          ${(mech.passives || []).map((p) => `
            <div class="mech-passive-card">
              <strong>${esc(p.name)}</strong>
              <p>${highlightMechText(p.desc, lang)}</p>
            </div>`).join('')}
        </div>
      </div>

      ${renderMechCounterTipsHtml(mech, lang)}
    </div>`;
}

function renderBoardIntelBar(mode, ranked, allBoardRecords, lang = getLang()) {
  const isMane = mode === 'mane';
  const getCarryStr = (r) => (isMane ? r.carry : r.carry_name);
  const total = ranked.length;

  let bodyHtml = '';
  if (!state.intelCollapsed) {
    if (!total) {
      bodyHtml = `<div style="font-size:12px;color:var(--ink-muted);padding:4px 2px">${esc(t('intelNoData', {}, lang))}</div>`;
    } else {
      // 1. Top Main DPS
      const topCarries = collectBoardCharacters(ranked, 'carry', getCarryStr, lang).slice(0, 4);

      // 2. Top Supports / Sub-DPS (non-carry teammates)
      const locale = isEn(lang) ? 'en' : 'zh-CN';
      const supMap = new Map();
      for (const row of ranked) {
        const carryKeys = new Set(splitCarries(getCarryStr(row)).map(canonicalCharacterKey));
        const seen = new Set();
        for (const raw of extractLineupCharacterNames(row.team, getCarryStr(row))) {
          const ch = resolveCharacter(raw);
          if (!ch) continue;
          const key = `char:${ch.id}`;
          if (carryKeys.has(key) || seen.has(key)) continue;
          seen.add(key);
          const cur = supMap.get(key);
          if (cur) cur.count += 1;
          else supMap.set(key, { label: displayCharacterName(ch.name, lang), count: 1, portrait: ch.portrait || '' });
        }
      }
      const topSupports = [...supMap.entries()]
        .sort((a, b) => (b[1].count - a[1].count) || a[1].label.localeCompare(b[1].label, locale))
        .slice(0, 4);

      // 3. Top Equipped Psychubes
      const psyMap = new Map();
      for (const row of ranked) {
        const { psychubes } = extractRecordBuilds(row);
        for (const rawPsy of psychubes) {
          if (!rawPsy) continue;
          const psy = resolvePsychube(rawPsy);
          if (!psy) continue;
          const cur = psyMap.get(psy.id);
          if (cur) cur.count += 1;
          else psyMap.set(psy.id, { psy, count: 1 });
        }
      }
      const topPsychubes = [...psyMap.values()]
        .sort((a, b) => (b.count - a.count) || displayPsychubeName(a.psy, lang).localeCompare(displayPsychubeName(b.psy, lang), locale))
        .slice(0, 6);

      // 4. Score or Round Distribution + P0 vs P5 Peak
      let distCardHtml = '';
      if (isMane) {
        const scores = ranked.map((r) => Number(r.score || 0)).filter((n) => Number.isFinite(n)).sort((a, b) => a - b);
        const mid = Math.floor(scores.length / 2);
        const median = scores.length
          ? (scores.length % 2 === 1 ? scores[mid] : Math.round((scores[mid - 1] + scores[mid]) / 2))
          : 0;
        const buckets = [
          { label: isEn(lang) ? '<10M' : '<1千万', min: 0, max: 10000000, count: 0 },
          { label: isEn(lang) ? '10M+' : '1千万+', min: 10000000, max: 30000000, count: 0 },
          { label: isEn(lang) ? '30M+' : '3千万+', min: 30000000, max: 50000000, count: 0 },
          { label: isEn(lang) ? '50M+' : '5千万+', min: 50000000, max: 100000000, count: 0 },
          { label: isEn(lang) ? '100M+' : '1亿+', min: 100000000, max: Infinity, count: 0 }
        ];
        for (const s of scores) {
          const hit = buckets.find((b) => s >= b.min && s < b.max);
          if (hit) hit.count += 1;
        }
        const maxBucket = Math.max(1, ...buckets.map((b) => b.count));
        const p0Best = allBoardRecords.filter((r) => r.division === 'zero').sort(compareManeScore)[0];
        const p5Best = allBoardRecords.filter((r) => r.division === 'max').sort(compareManeScore)[0];

        distCardHtml = `
          <div class="intel-card">
            <div class="intel-card-head">
              <span>${esc(t('intelScoreDist', {}, lang))}</span>
              <small>${esc(t('intelMedianScore', {}, lang))}: ${esc(formatCompactScore(median, lang))}</small>
            </div>
            <div class="intel-dist-chart">
              ${buckets.map((b) => {
                const h = b.count ? Math.max(6, Math.round((b.count / maxBucket) * 44)) : 4;
                return `
                  <div class="intel-dist-col" title="${esc(b.label)}: ${esc(formatEntries(b.count, lang))}">
                    <span>${b.count}</span>
                    <span class="intel-dist-bar" style="height:${h}px;opacity:${b.count ? 1 : 0.28}"></span>
                    <span>${esc(b.label)}</span>
                  </div>`;
              }).join('')}
            </div>
            <div class="intel-peak-diff" title="${esc(t('intelPeakCompare', {}, lang))}">
              <span>${esc(t('intelPeakP0', {}, lang))}: <strong>${p0Best ? esc(formatCompactScore(p0Best.score, lang)) : '—'}</strong></span>
              <span>${esc(t('intelPeakP5', {}, lang))}: <strong>${p5Best ? esc(formatCompactScore(p5Best.score, lang)) : '—'}</strong></span>
            </div>
          </div>`;
      } else {
        const roundVals = ranked.map((r) => Number(r.rounds)).filter((n) => Number.isFinite(n));
        const avg = roundVals.length ? (roundVals.reduce((a, b) => a + b, 0) / roundVals.length).toFixed(1) : '—';
        const buckets = [0, 1, 2, 3, 4, 5, 6].map((r) => ({
          r,
          label: `${r}R`,
          count: roundVals.filter((v) => v === r).length
        }));
        const maxBucket = Math.max(1, ...buckets.map((b) => b.count));
        const p0Best = allBoardRecords.filter((r) => r.group_code === 'zero').sort(compareFlashbackRecord)[0];
        const p5Best = allBoardRecords.filter((r) => r.group_code === 'max').sort(compareFlashbackRecord)[0];

        distCardHtml = `
          <div class="intel-card">
            <div class="intel-card-head">
              <span>${esc(t('intelRoundDist', {}, lang))}</span>
              <small>${esc(t('intelAvgRounds', {}, lang))}: ${esc(avg === '—' ? '—' : `${avg}R`)}</small>
            </div>
            <div class="intel-dist-chart">
              ${buckets.map((b) => {
                const h = b.count ? Math.max(6, Math.round((b.count / maxBucket) * 44)) : 4;
                return `
                  <div class="intel-dist-col" title="${esc(formatRounds(b.r, lang))}: ${esc(formatEntries(b.count, lang))}">
                    <span>${b.count}</span>
                    <span class="intel-dist-bar" style="height:${h}px;opacity:${b.count ? 1 : 0.28}"></span>
                    <span>${esc(b.label)}</span>
                  </div>`;
              }).join('')}
            </div>
            <div class="intel-peak-diff" title="${esc(t('intelPeakCompare', {}, lang))}">
              <span>${esc(t('intelPeakP0', {}, lang))}: <strong>${p0Best ? esc(formatRounds(p0Best.rounds, lang)) : '—'}</strong></span>
              <span>${esc(t('intelPeakP5', {}, lang))}: <strong>${p5Best ? esc(formatRounds(p5Best.rounds, lang)) : '—'}</strong></span>
            </div>
          </div>`;
      }

      bodyHtml = `
        <div class="intel-grid" style="grid-template-columns:repeat(auto-fit,minmax(215px,1fr))">
          <div class="intel-card">
            <div class="intel-card-head">
              <span>${esc(t('intelTopCarries', {}, lang))}</span>
              <small>${esc(t('intelUsageRate', {}, lang))}</small>
            </div>
            <div class="intel-bar-list">
              ${topCarries.map(([key, info]) => {
                const rate = Math.round((info.count / total) * 100);
                const width = rate > 0 ? Math.max(4, Math.min(100, rate)) : 0;
                return `
                  <button type="button" class="intel-bar-row" data-meta-carry="${esc(key)}" data-meta-mode="${esc(mode)}" title="${esc(info.label)} · ${esc(formatEntries(info.count, lang))} (${rate}%)">
                    <span class="intel-bar-avatar">
                      ${info.portrait
                        ? `<img src="${esc(info.portrait)}" alt="${esc(info.label)}" loading="lazy" decoding="async" />`
                        : `<span class="char-slot-mono">${esc(characterMonogram(info.label))}</span>`}
                    </span>
                    <span class="intel-bar-main">
                      <span class="intel-bar-top">
                        <span>${esc(info.label)}</span>
                        <strong>${rate}%</strong>
                      </span>
                      <span class="intel-bar-track"><span class="intel-bar-fill" style="width:${width}%"></span></span>
                    </span>
                  </button>`;
              }).join('')}
            </div>
          </div>

          <div class="intel-card">
            <div class="intel-card-head">
              <span>${esc(t('intelTopSupports', {}, lang))}</span>
              <small>${esc(t('intelUsageRate', {}, lang))}</small>
            </div>
            <div class="intel-bar-list">
              ${topSupports.length
                ? topSupports.map(([key, info]) => {
                    const rate = Math.round((info.count / total) * 100);
                    const width = rate > 0 ? Math.max(4, Math.min(100, rate)) : 0;
                    return `
                      <button type="button" class="intel-bar-row" data-meta-member="${esc(key)}" data-meta-mode="${esc(mode)}" title="${esc(info.label)} · ${esc(formatEntries(info.count, lang))} (${rate}%)">
                        <span class="intel-bar-avatar">
                          ${info.portrait
                            ? `<img src="${esc(info.portrait)}" alt="${esc(info.label)}" loading="lazy" decoding="async" />`
                            : `<span class="char-slot-mono">${esc(characterMonogram(info.label))}</span>`}
                        </span>
                        <span class="intel-bar-main">
                          <span class="intel-bar-top">
                            <span>${esc(info.label)}</span>
                            <strong>${rate}%</strong>
                          </span>
                          <span class="intel-bar-track"><span class="intel-bar-fill" style="width:${width}%"></span></span>
                        </span>
                      </button>`;
                  }).join('')
                : `<div style="font-size:11.5px;color:var(--ink-muted)">${esc(t('intelNoData', {}, lang))}</div>`
              }
            </div>
          </div>

          <div class="intel-card">
            <div class="intel-card-head">
              <span>${esc(t('intelTopPsychubes', {}, lang))}</span>
              <small>${esc(formatEntries(topPsychubes.reduce((sum, x) => sum + x.count, 0), lang))}</small>
            </div>
            ${topPsychubes.length
              ? `<div class="intel-psy-chips">
                  ${topPsychubes.map(({ psy, count }) => {
                    const pName = displayPsychubeName(psy, lang);
                    return `
                      <button type="button" class="intel-psy-chip" data-open-psy="${esc(psy.id)}" title="${esc(pName)} ×${count}">
                        <img src="${esc(psychubeIconSrc(psy.id))}" alt="" aria-hidden="true" loading="lazy" decoding="async" />
                        <span>${esc(pName)}</span>
                        <strong style="color:var(--gold);font-size:10px">×${count}</strong>
                      </button>`;
                  }).join('')}
                </div>`
              : `<div style="font-size:11.5px;color:var(--ink-muted)">${esc(t('intelNoData', {}, lang))}</div>`
            }
          </div>

          ${distCardHtml}
        </div>`;
    }
  }

  return `
    <section class="board-intel-bar ${state.intelCollapsed ? 'is-collapsed' : ''}" aria-label="${esc(t('intelTitle', {}, lang))}">
      <div class="intel-header">
        <div class="intel-title-group">
          <strong>◈ ${esc(t('intelTitle', {}, lang))}</strong>
          <span>${esc(t('intelSubtitle', {}, lang))}</span>
        </div>
        <button type="button" class="intel-collapse-btn" data-action="toggle-intel-bar" aria-expanded="${!state.intelCollapsed}">
          ${esc(state.intelCollapsed ? t('intelExpand', {}, lang) : t('intelCollapse', {}, lang))}
        </button>
      </div>
      ${bodyHtml}
    </section>`;
}

function renderRowIntelColumnHtml({
  mode,
  record,
  rank,
  resonanceCodes,
  boardPeak,
  mapName = '',
  stageFastest,
  lang = getLang()
}) {
  const isMane = mode === 'mane';
  const carryRaw = isMane ? record.carry : record.carry_name;
  const { archetypes } = detectTeamArchetypes(record.team, carryRaw, lang);

  // 1. Archetype Chips + Optional Resonance Code Count
  const archChipsHtml = archetypes.map((a) => `<span class="row-archetype-chip">${esc(a.label)}</span>`).join('');
  const resCount = resonanceCodes.filter(Boolean).length;
  const resBadge = resCount > 0 ? `<span class="row-res-badge">${esc(t('rowResCodesCount', { n: resCount }, lang))}</span>` : '';

  // 2. Boss Mechanism Appraisal Rail (Collector's Edition I–VI stages only; omit relative-to-peak %)
  let peakMeterHtml = '';
  if (isMane) {
    const appraisal = mapName ? getBossThresholdProgress(mapName, record.score, lang) : null;
    const thresholds = appraisal?.thresholds || [];
    if (thresholds.length) {
      const railHtml = thresholds.map((step, i) => {
        const rom = step.roman || toRoman(i + 1);
        const nextStep = thresholds[i + 1];
        const node = `<span class="row-appraisal-node ${step.reached ? 'is-cleared' : ''}" title="${esc(rom)} · ${esc(step.scoreLabel)}">${esc(rom)}</span>`;
        const link = nextStep
          ? `<span class="row-appraisal-link ${step.reached && nextStep.reached ? 'is-cleared' : ''}" aria-hidden="true"></span>`
          : '';
        return node + link;
      }).join('');
      peakMeterHtml = `
        <div class="row-peak-meter has-appraisal-rail">
          <div class="row-appraisal-rail" aria-label="${esc(t('appraisalActiveLabel', {}, lang))}">${railHtml}</div>
        </div>`;
    }
  }

  // 3. Optional Watch Guide Link
  let guideHref = '';
  try { guideHref = parseHttpUrl(record.related_url); } catch { guideHref = ''; }

  return `
    <div class="row-intel-col">
      ${(archChipsHtml || resBadge) ? `<div class="row-archetype-strip">${archChipsHtml}${resBadge}</div>` : ''}
      ${peakMeterHtml}
      ${guideHref ? `<div class="row-quick-actions"><a class="row-quick-btn" href="${esc(guideHref)}" target="_blank" rel="noopener noreferrer ugc">${esc(t('rowWatchGuide', {}, lang))}</a></div>` : ''}
    </div>`;
}

/* ==================== V2 Deep Dossier Modals (Arcanist, Psychube, Investigator) ==================== */
function openArcanistDossier(rawName) {
  const lang = getLang();
  const detail = getArcanistDetail(rawName, lang);
  if (!detail) return;
  closeGlossaryPopover();

  const targetKey = detail.id ? `char:${detail.id}` : canonicalCharacterKey(detail.cn || rawName);
  const affMeta = AFFLATUS_META[detail.aff] || AFFLATUS_META.unknown;
  const affLabel = localizeAfflatus(detail.aff, lang);
  const dmgLabel = detail.dmg === 'mental' ? t('dossierDmgMental', {}, lang) : t('dossierDmgReality', {}, lang);
  const roleLabels = (detail.roleLabels && detail.roleLabels.length)
    ? detail.roleLabels
    : (detail.roles || []).map((r) => {
        const lbl = ARC_ROLE_LABELS[r];
        return lbl ? (isEn(lang) ? lbl.en : lbl.zh) : r;
      });

  let maneCount = 0;
  let fbCount = 0;
  let carryCount = 0;
  let peakManeScore = 0n;
  let fastestFb = null;
  const teammateCounts = new Map();
  const psyCounts = new Map();

  const tallyRun = (team, carryStr, psychubes, isMane, metricVal) => {
    const members = extractLineupCharacterNames(team, carryStr);
    const carries = splitCarries(carryStr);
    const hasChar = members.some((m) => canonicalCharacterKey(m) === targetKey) ||
      carries.some((c) => canonicalCharacterKey(c) === targetKey);
    if (!hasChar) return;
    if (isMane) {
      maneCount += 1;
      const sc = BigInt(metricVal || 0);
      if (sc > peakManeScore) peakManeScore = sc;
    } else {
      fbCount += 1;
      const r = Number(metricVal);
      if (Number.isFinite(r) && (fastestFb === null || r < fastestFb)) fastestFb = r;
    }
    if (carries.some((c) => canonicalCharacterKey(c) === targetKey)) carryCount += 1;

    const seenMate = new Set();
    for (const m of members) {
      const ch = resolveCharacter(m);
      if (!ch) continue;
      const k = `char:${ch.id}`;
      if (k === targetKey || seenMate.has(k)) continue;
      seenMate.add(k);
      const cur = teammateCounts.get(k);
      if (cur) cur.count += 1;
      else teammateCounts.set(k, { char: ch, count: 1 });
    }

    const slots = parseLineupSlots(team, carryStr);
    for (let i = 0; i < slots.length; i++) {
      const sl = slots[i];
      const slKey = sl?.char ? `char:${sl.char.id}` : canonicalCharacterKey(sl?.raw || '');
      if (slKey === targetKey && psychubes[i]) {
        const psy = resolvePsychube(psychubes[i]);
        if (psy) {
          const cur = psyCounts.get(psy.id);
          if (cur) cur.count += 1;
          else psyCounts.set(psy.id, { psy, count: 1 });
        }
      }
    }
  };

  for (const r of state.maneScores) {
    const { psychubes } = extractRecordBuilds(r);
    tallyRun(r.team, r.carry, psychubes, true, r.score);
  }
  for (const r of state.fbRecords) {
    const { psychubes } = extractRecordBuilds(r);
    tallyRun(r.team, r.carry_name, psychubes, false, r.rounds);
  }

  const totalRuns = maneCount + fbCount;
  const carryRate = totalRuns > 0 ? `${Math.round((carryCount / totalRuns) * 100)}%` : '—';
  const topMates = [...teammateCounts.values()].sort((a, b) => b.count - a.count).slice(0, 6);
  const topPsys = [...psyCounts.values()].sort((a, b) => b.count - a.count).slice(0, 6);
  const subName = !isEn(lang) && detail.en && detail.en !== detail.displayName ? detail.en : '';

  openModal(`
    <div class="dossier-modal-head">
      <div class="dossier-portrait-frame">
        ${detail.portrait
          ? `<img src="${esc(detail.portrait)}" alt="${esc(detail.displayName)}" />`
          : `<div style="width:100%;height:100%;display:grid;place-items:center;font-family:var(--font-serif);font-size:24px;color:var(--brass)">${esc(characterMonogram(detail.displayName))}</div>`}
      </div>
      <div style="min-width:0;flex:1">
        <div class="modal-eyebrow">${esc(t('dossierCharEyebrow', {}, lang))}</div>
        <h2 style="margin-bottom:2px">${esc(detail.displayName)}</h2>
        ${subName ? `<div style="font-size:12.5px;color:var(--brass);margin-bottom:4px">${esc(subName)}</div>` : ''}
        <div class="dossier-badges-row">
          <span class="dossier-pill">
            ${affMeta.icon ? `<img src="${esc(affMeta.icon)}" alt="" aria-hidden="true" />` : ''}
            ${esc(affLabel)}
          </span>
          <span class="dossier-pill">${detail.star}★</span>
          <span class="dossier-pill">${esc(dmgLabel)}</span>
          ${detail.euphoria ? `<span class="dossier-pill" style="border-color:var(--gold);color:#fbe3a6">✦ ${esc(t('dossierEuphoria', {}, lang))}</span>` : ''}
          ${detail.version ? `<span class="dossier-pill">${esc(t('dossierVersion', { ver: `v${detail.version}` }, lang))}</span>` : ''}
          ${roleLabels.map((lbl) => `<span class="dossier-pill">${esc(lbl)}</span>`).join('')}
        </div>
      </div>
    </div>

    <div class="dossier-section-title"><span>${esc(t('dossierArchiveStats', {}, lang))}</span></div>
    <div class="dossier-stat-grid">
      <div class="dossier-stat-box">
        <strong>${maneCount}</strong>
        <small>${esc(t('dossierManeAppearances', {}, lang))}</small>
      </div>
      <div class="dossier-stat-box">
        <strong>${fbCount}</strong>
        <small>${esc(t('dossierFbAppearances', {}, lang))}</small>
      </div>
      <div class="dossier-stat-box">
        <strong>${esc(carryRate)}</strong>
        <small>${esc(t('dossierMainDpsRate', {}, lang))}</small>
      </div>
      <div class="dossier-stat-box">
        <strong>${peakManeScore > 0n ? esc(formatCompactScore(peakManeScore, lang)) : (fastestFb !== null ? esc(formatRounds(fastestFb, lang)) : '—')}</strong>
        <small>${esc(peakManeScore > 0n ? t('dossierPeakScore', {}, lang) : t('dossierFastestClear', {}, lang))}</small>
      </div>
    </div>

    <div class="dossier-section-title"><span>${esc(t('dossierTopTeammates', {}, lang))}</span></div>
    ${topMates.length
      ? `<div class="dossier-chip-list">
          ${topMates.map(({ char, count }) => {
            const name = displayCharacterName(char.name, lang);
            return `
              <button type="button" class="dossier-chip" data-open-char="${esc(char.name)}">
                ${char.portrait ? `<img src="${esc(char.portrait)}" alt="" aria-hidden="true" />` : ''}
                <span>${esc(name)}</span>
                <small style="color:var(--gold)">×${count}</small>
              </button>`;
          }).join('')}
        </div>`
      : `<p class="field-hint">${esc(t('dossierNoData', {}, lang))}</p>`}

    <div class="dossier-section-title"><span>${esc(t('dossierTopPsychubes', {}, lang))}</span></div>
    ${topPsys.length
      ? `<div class="dossier-chip-list">
          ${topPsys.map(({ psy, count }) => {
            const pName = displayPsychubeName(psy, lang);
            return `
              <button type="button" class="dossier-chip" data-open-psy="${esc(psy.id)}">
                <img src="${esc(psychubeIconSrc(psy.id))}" alt="" aria-hidden="true" style="width:20px;height:20px;object-fit:contain" />
                <span>${esc(pName)}</span>
                <small style="color:var(--gold)">×${count}</small>
              </button>`;
          }).join('')}
        </div>`
      : `<p class="field-hint">${esc(t('dossierNoData', {}, lang))}</p>`}

    <div class="dossier-actions-row">
      <button type="button" class="copper-btn" data-filter-dossier-char="${esc(targetKey)}">${esc(t('dossierFilterBoard', {}, lang))}</button>
      ${detail.wikiUrl ? `<a class="outline-btn" href="${esc(detail.wikiUrl)}" target="_blank" rel="noopener noreferrer">${esc(t('dossierOpenWiki', {}, lang))}</a>` : ''}
      <button type="button" class="ghost-btn" data-action="close-modal">${esc(t('btnClose', {}, lang))}</button>
    </div>`, true);
}

const CIRCLED_NUMS = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧'];

function parsePsychubeAmpPassive(rawPassive) {
  const src = String(rawPassive || '');
  const re = /(\d+(?:\.\d+)?)(%?)\s*[–—\-~至]\s*(\d+(?:\.\d+)?)(%?)/g;
  const groupByKey = new Map();
  const uniqueGroups = [];
  let occCounter = 0;

  const templateText = src.replace(re, (full, aStr, u1, bStr, u2) => {
    const a = Number(aStr);
    const b = Number(bStr);
    if (!Number.isFinite(a) || !Number.isFinite(b) || b <= a) return full;
    if ((u1 === '%' && !u2) || (!u1 && u2 === '%' && a >= 100)) return full;
    const isPct = u1 === '%' || u2 === '%';
    const unit = isPct ? '%' : '';
    const key = `${a}|${b}|${unit}`;
    let grp = groupByKey.get(key);
    if (!grp) {
      const levels = [0, 1, 2, 3, 4].map((i) => {
        if (isPct) {
          const v = a + ((b - a) * i) / 4;
          return `${Number(v.toFixed(2))}%`;
        }
        const v = i === 0 ? a : (i === 4 ? b : Math.floor(a + ((b - a) * i) / 4));
        return String(v);
      });
      grp = { idx: uniqueGroups.length + 1, a, b, unit, levels };
      groupByKey.set(key, grp);
      uniqueGroups.push(grp);
    }
    occCounter += 1;
    return `@@PSYAMP_${grp.idx}_${occCounter}@@`;
  });

  return { templateText, uniqueGroups };
}

function renderPsychubePassiveBlockHtml(rawPassive, ampLevel = 5, lang = getLang()) {
  if (!rawPassive) return '';
  const { templateText, uniqueGroups } = parsePsychubeAmpPassive(rawPassive);
  if (!uniqueGroups.length) {
    return `<div class="psy-passive-box">${highlightMechText(rawPassive, lang)}</div>`;
  }

  const level = Math.min(5, Math.max(1, Number(ampLevel) || 5));
  const lvIdx = level - 1;
  const multi = uniqueGroups.length > 1;
  const ampLabel = isEn(lang) ? 'Amplification' : '增幅等级';

  const renderedBody = highlightMechText(templateText, lang).replace(/@@PSYAMP_(\d+)_(\d+)@@/g, (_, gi) => {
    const g = uniqueGroups[Number(gi) - 1];
    if (!g) return '';
    const circ = CIRCLED_NUMS[g.idx - 1] || `(${g.idx})`;
    return `<span class="psy-amp-val">${esc(g.levels[lvIdx])}${multi ? `<sup>${circ}</sup>` : ''}</span>`;
  });

  return `
    <div class="psy-amp-bar">
      <span style="font-size:11.5px;color:var(--brass);font-family:var(--font-serif);font-weight:600">${esc(ampLabel)}</span>
      <div class="psy-amp-pills" role="group" aria-label="${esc(ampLabel)}">
        ${[1, 2, 3, 4, 5].map((lv) => `
          <button type="button" class="psy-amp-btn ${lv === level ? 'active' : ''}" data-psy-amp-level="${lv}" aria-pressed="${lv === level}">Lv.${lv}</button>`).join('')}
      </div>
    </div>
    <div class="psy-passive-box">${renderedBody}</div>
    <div class="psy-amp-grid" aria-label="${esc(ampLabel)}">
      <div class="psy-amp-row is-head ${multi ? 'has-label' : ''}">
        ${multi ? `<span class="psy-amp-idx">#</span>` : ''}
        ${[1, 2, 3, 4, 5].map((lv) => `
          <button type="button" class="psy-amp-cell ${lv === level ? 'is-active' : ''}" data-psy-amp-level="${lv}">Lv.${lv}</button>`).join('')}
      </div>
      ${uniqueGroups.map((g) => `
        <div class="psy-amp-row ${multi ? 'has-label' : ''}">
          ${multi ? `<span class="psy-amp-idx">${CIRCLED_NUMS[g.idx - 1] || g.idx}</span>` : ''}
          ${g.levels.map((val, i) => `
            <button type="button" class="psy-amp-cell ${(i + 1) === level ? 'is-active' : ''}" data-psy-amp-level="${i + 1}">${esc(val)}</button>`).join('')}
        </div>`).join('')}
    </div>`;
}

function openPsychubeDossier(rawPsy) {
  const lang = getLang();
  const detail = getPsychubeDetail(rawPsy, lang);
  if (!detail) return;
  closeGlossaryPopover();
  state.activePsyDossierId = detail.id;
  state.psyAmpLevel = 5;

  let equipCount = 0;
  const carrierCounts = new Map();
  const scanRecords = (list, getCarryStr) => {
    for (const r of list) {
      const { psychubes } = extractRecordBuilds(r);
      const slots = parseLineupSlots(r.team, getCarryStr(r));
      for (let i = 0; i < psychubes.length; i++) {
        const p = psychubes[i] ? resolvePsychube(psychubes[i]) : null;
        if (!p || p.id !== detail.id) continue;
        equipCount += 1;
        const ch = slots[i]?.char || null;
        if (ch) {
          const cur = carrierCounts.get(ch.id);
          if (cur) cur.count += 1;
          else carrierCounts.set(ch.id, { char: ch, count: 1 });
        }
      }
    }
  };
  scanRecords(state.maneScores, (r) => r.carry);
  scanRecords(state.fbRecords, (r) => r.carry_name);

  const topCarriers = [...carrierCounts.values()].sort((a, b) => b.count - a.count).slice(0, 6);
  const subName = !isEn(lang) && detail.en && detail.en !== detail.displayName ? detail.en : '';
  const stats = detail.stats60;
  const subStatVal = stats ? (isEn(lang) ? stats.subStatEn : stats.subStatZh) : detail.displayStat;
  const tagsList = isEn(lang)
    ? (detail.tagsEn || (detail.tags || []).map((tg) => displayPsychubeTag(tg, 'en')))
    : (detail.tags || []);

  openModal(`
    <div class="dossier-modal-head">
      <div class="dossier-psy-frame">
        <img src="${esc(psychubeFrameSrc(detail.star))}" alt="" aria-hidden="true" style="position:absolute;inset:0;width:100%;height:100%;object-fit:contain;transform:scale(1.16)" />
        <img src="${esc(psychubeIconSrc(detail.id))}" alt="${esc(detail.displayName)}" style="position:relative;z-index:1;width:100%;height:100%;object-fit:contain;transform:scale(1.16)" />
      </div>
      <div style="min-width:0;flex:1">
        <div class="modal-eyebrow">${esc(t('dossierPsyEyebrow', {}, lang))}</div>
        <h2 style="margin-bottom:2px">${esc(detail.displayName)}</h2>
        ${subName ? `<div style="font-size:12.5px;color:var(--brass);margin-bottom:4px">${esc(subName)}</div>` : ''}
        <div class="dossier-badges-row">
          <span class="dossier-pill">${detail.star}★</span>
          <span class="dossier-pill">${esc(detail.displayStat)}</span>
          ${detail.version ? `<span class="dossier-pill">${esc(t('dossierVersion', { ver: `v${detail.version}` }, lang))}</span>` : ''}
          ${tagsList.map((tg) => `<span class="dossier-pill">${esc(tg)}</span>`).join('')}
        </div>
      </div>
    </div>

    ${stats ? `
      <div class="dossier-section-title">
        <span>${esc(t('dossierPsyStats60', {}, lang))}</span>
        ${subStatVal ? `<span class="dossier-pill">${esc(t('dossierPsySubStat', {}, lang))}: ${esc(subStatVal)}</span>` : ''}
      </div>
      <div class="psy-stat60-grid">
        <div class="psy-stat60-item"><span>${esc(t('dossierPsyAtk', {}, lang))}</span><strong>${stats.atk}</strong></div>
        <div class="psy-stat60-item"><span>${esc(t('dossierPsyHp', {}, lang))}</span><strong>${stats.hp}</strong></div>
        <div class="psy-stat60-item"><span>${esc(t('dossierPsyRDef', {}, lang))}</span><strong>${stats.rDef}</strong></div>
        <div class="psy-stat60-item"><span>${esc(t('dossierPsyMDef', {}, lang))}</span><strong>${stats.mDef}</strong></div>
      </div>` : ''}

    ${detail.passive ? `
      <div class="dossier-section-title">
        <span>${esc(t('dossierPsyPassive', {}, lang))}</span>
        <small style="font-family:var(--font-sans);text-transform:none;letter-spacing:0;color:var(--ink-muted)">${esc(t('glossaryHint', {}, lang))}</small>
      </div>
      <div id="psyPassiveHost" data-psy-id="${esc(detail.id)}">${renderPsychubePassiveBlockHtml(detail.passive, state.psyAmpLevel, lang)}</div>` : ''}

    <div class="dossier-section-title">
      <span>${esc(t('dossierPsyTopCarriers', {}, lang))}</span>
      <span>${esc(t('dossierPsyUsage', {}, lang))}: ${equipCount}</span>
    </div>
    ${topCarriers.length
      ? `<div class="dossier-chip-list">
          ${topCarriers.map(({ char, count }) => {
            const cName = displayCharacterName(char.name, lang);
            return `
              <button type="button" class="dossier-chip" data-open-char="${esc(char.name)}">
                ${char.portrait ? `<img src="${esc(char.portrait)}" alt="" aria-hidden="true" />` : ''}
                <span>${esc(cName)}</span>
                <small style="color:var(--gold)">×${count}</small>
              </button>`;
          }).join('')}
        </div>`
      : `<p class="field-hint">${esc(t('dossierNoData', {}, lang))}</p>`}

    <div class="dossier-actions-row">
      ${detail.wikiUrl ? `<a class="outline-btn" href="${esc(detail.wikiUrl)}" target="_blank" rel="noopener noreferrer">${esc(t('dossierOpenWiki', {}, lang))}</a>` : ''}
      <button type="button" class="ghost-btn" data-action="close-modal">${esc(t('btnClose', {}, lang))}</button>
    </div>`, true);
}

function formatDossierLineupText(team, carryStr, lang = getLang()) {
  const slots = parseLineupSlots(team, carryStr);
  if (!slots.length) return '';
  if (slots.length === 1 && slots[0].type === 'legacy') {
    return t('legacyTeamLabel', {}, lang);
  }
  const joiner = isEn(lang) ? ' / ' : ' · ';
  return slots.map((slot) => {
    if (slot.type === 'flex') return formatFlexSlot(slot, lang).label;
    if (slot.type === 'wild') return formatWildSlot(slot, lang).label;
    const rawName = slot.raw || '';
    const char = slot.char || resolveCharacter(rawName);
    return char ? displayCharacterName(char.name, lang) : displayCharacterName(rawName, lang);
  }).filter(Boolean).join(joiner);
}

function openInvestigatorDossier(playerName) {
  const lang = getLang();
  const targetKey = normKey(playerName);
  if (!targetKey) return;
  closeGlossaryPopover();

  const mapById = new Map(state.maneMaps.map((m) => [m.id, m]));
  const stageById = new Map(state.fbStages.map((s) => [s.id, s]));
  const verById = new Map(state.fbVersions.map((v) => [v.id, v]));

  // Compute exact ranks per board
  const maneGroups = new Map();
  for (const r of state.maneScores) {
    const gk = `${r.map_id}::${r.division}`;
    if (!maneGroups.has(gk)) maneGroups.set(gk, []);
    maneGroups.get(gk).push(r);
  }
  const runs = [];
  let crowns = 0;
  let podiums = 0;
  let bestManeScore = 0n;
  let bestFbRounds = null;
  let canonicalHandle = playerName;
  const favCarryMap = new Map();

  const addCarryCount = (carryStr) => {
    for (const raw of splitCarries(carryStr)) {
      const ch = resolveCharacter(raw);
      if (!ch) continue;
      const cur = favCarryMap.get(ch.id);
      if (cur) cur.count += 1;
      else favCarryMap.set(ch.id, { char: ch, count: 1 });
    }
  };

  for (const list of maneGroups.values()) {
    list.sort(compareManeScore);
    list.forEach((rec, idx) => {
      if (normKey(rec.display_name) !== targetKey) return;
      canonicalHandle = rec.display_name || canonicalHandle;
      const rank = idx + 1;
      if (rank === 1) crowns += 1;
      if (rank <= 3) podiums += 1;
      const sc = BigInt(rec.score || 0);
      if (sc > bestManeScore) bestManeScore = sc;
      addCarryCount(rec.carry);
      const map = mapById.get(rec.map_id);
      runs.push({
        mode: 'mane',
        id: rec.id,
        rank,
        title: map ? displayBossName(map.name, lang) : t('modeMane', {}, lang),
        division: localizeDivisionShort(rec.division, lang),
        metricText: formatScore(rec.score, lang),
        carry: displayCarryNames(rec.carry, lang),
        section: map?.section || 'new',
        mapId: rec.map_id,
        rawDiv: rec.division,
        sortVal: Number(rec.score || 0)
      });
    });
  }

  const fbGroups = new Map();
  for (const r of state.fbRecords) {
    const gk = `${r.stage_id}::${r.group_code}`;
    if (!fbGroups.has(gk)) fbGroups.set(gk, []);
    fbGroups.get(gk).push(r);
  }
  for (const list of fbGroups.values()) {
    list.sort(compareFlashbackRecord);
    list.forEach((rec, idx) => {
      if (normKey(rec.display_name) !== targetKey) return;
      canonicalHandle = rec.display_name || canonicalHandle;
      const rank = idx + 1;
      if (rank === 1) crowns += 1;
      if (rank <= 3) podiums += 1;
      const rNum = Number(rec.rounds);
      if (Number.isFinite(rNum) && (bestFbRounds === null || rNum < bestFbRounds)) bestFbRounds = rNum;
      addCarryCount(rec.carry_name);
      const st = stageById.get(rec.stage_id);
      const ver = st ? verById.get(st.version_id) : null;
      runs.push({
        mode: 'flashback',
        id: rec.id,
        rank,
        title: `${ver ? `${ver.code} · ` : ''}${st ? cleanStageDisplayName(st.name, lang) : t('modeFlashback', {}, lang)}`,
        division: localizeDivisionShort(rec.group_code, lang),
        metricText: formatRounds(rec.rounds, lang),
        carry: displayCarryNames(rec.carry_name, lang),
        verId: st?.version_id || rec.version_id || '',
        stageId: rec.stage_id,
        rawDiv: rec.group_code,
        sortVal: 0
      });
    });
  }

  runs.sort((a, b) => (a.rank - b.rank) || (b.sortVal - a.sortVal));
  const favCarries = [...favCarryMap.values()].sort((a, b) => b.count - a.count).slice(0, 6);

  const activeManeIds = new Set(state.maneScores.map((r) => r.id));
  const activeFbIds = new Set(state.fbRecords.map((r) => r.id));
  const supersededByKey = new Map();
  for (const rec of state.maneDailyScores || []) {
    if (!rec?.id || activeManeIds.has(rec.id) || normKey(rec.display_name) !== targetKey) continue;
    const key = `mane:${rec.id}`;
    if (supersededByKey.has(key)) continue;
    const map = mapById.get(rec.map_id);
    supersededByKey.set(key, {
      mode: 'mane',
      id: rec.id,
      title: map ? displayBossName(map.name, lang) : t('modeMane', {}, lang),
      division: localizeDivisionShort(rec.division, lang),
      metricText: formatScore(rec.score, lang),
      carry: displayCarryNames(rec.carry, lang),
      teamText: formatDossierLineupText(rec.team, rec.carry, lang),
      dateMs: Date.parse(rec.approved_at || rec.created_at || '') || 0,
      scoreVal: Number(rec.score || 0)
    });
  }
  for (const rec of state.fbApprovedRecords || []) {
    if (!rec?.id || activeFbIds.has(rec.id) || normKey(rec.display_name) !== targetKey) continue;
    const key = `flashback:${rec.id}`;
    if (supersededByKey.has(key)) continue;
    const st = stageById.get(rec.stage_id);
    const ver = st ? verById.get(st.version_id) : null;
    supersededByKey.set(key, {
      mode: 'flashback',
      id: rec.id,
      title: `${ver ? `${ver.code} · ` : ''}${st ? cleanStageDisplayName(st.name, lang) : t('modeFlashback', {}, lang)}`,
      division: localizeDivisionShort(rec.group_code, lang),
      metricText: formatRounds(rec.rounds, lang),
      carry: displayCarryNames(rec.carry_name, lang),
      teamText: formatDossierLineupText(rec.team, rec.carry_name, lang),
      dateMs: Date.parse(rec.created_at || '') || 0,
      scoreVal: 0
    });
  }
  const supersededRuns = [...supersededByKey.values()].sort(
    (a, b) => (b.dateMs - a.dateMs) || (b.scoreVal - a.scoreVal)
  );

  openModal(`
    <div class="dossier-modal-head">
      <div style="min-width:0;flex:1">
        <div class="modal-eyebrow">${esc(t('dossierPlayerEyebrow', {}, lang))}</div>
        <h2 class="is-player-name" style="margin-bottom:4px">${esc(canonicalHandle)}</h2>
        <div class="dossier-badges-row">
          ${crowns > 0 ? `<span class="hof-crown-pill">♛ ${esc(t('hofCrownsLabel', {}, lang))} ×${crowns}</span>` : ''}
          ${podiums > 0 ? `<span class="dossier-pill">✦ ${esc(t('hofPodiumsLabel', {}, lang))} ×${podiums}</span>` : ''}
          <span class="dossier-pill">${esc(formatEntries(runs.length, lang))}</span>
        </div>
      </div>
    </div>

    <div class="dossier-stat-grid">
      <div class="dossier-stat-box">
        <strong>${crowns}</strong>
        <small>${esc(t('dossierPlayerCrowns', {}, lang))}</small>
      </div>
      <div class="dossier-stat-box">
        <strong>${podiums}</strong>
        <small>${esc(t('dossierPlayerPodiums', {}, lang))}</small>
      </div>
      <div class="dossier-stat-box">
        <strong>${runs.length}</strong>
        <small>${esc(t('dossierPlayerRuns', {}, lang))}</small>
      </div>
      <div class="dossier-stat-box">
        <strong>${bestManeScore > 0n ? esc(formatCompactScore(bestManeScore, lang)) : (bestFbRounds !== null ? esc(formatRounds(bestFbRounds, lang)) : '—')}</strong>
        <small>${esc(bestManeScore > 0n ? t('dossierPlayerBestMane', {}, lang) : t('dossierPlayerBestFb', {}, lang))}</small>
      </div>
    </div>

    <div class="dossier-section-title"><span>${esc(t('dossierPlayerFavCarries', {}, lang))}</span></div>
    ${favCarries.length
      ? `<div class="dossier-chip-list">
          ${favCarries.map(({ char, count }) => {
            const name = displayCharacterName(char.name, lang);
            return `
              <button type="button" class="dossier-chip" data-open-char="${esc(char.name)}">
                ${char.portrait ? `<img src="${esc(char.portrait)}" alt="" aria-hidden="true" />` : ''}
                <span>${esc(name)}</span>
                <small style="color:var(--gold)">×${count}</small>
              </button>`;
          }).join('')}
        </div>`
      : `<p class="field-hint">${esc(t('dossierNoData', {}, lang))}</p>`}

    <div class="dossier-section-title">
      <span>${esc(t('dossierPlayerHistory', {}, lang))}</span>
      <span>${esc(formatEntries(runs.length, lang))}</span>
    </div>
    ${runs.length
      ? `<div class="dossier-run-list">
          ${runs.map((run) => {
            const jumpAttrs = run.mode === 'mane'
              ? `data-jump-mane-record="${esc(run.id)}" data-jump-section="${esc(run.section)}" data-jump-map="${esc(run.mapId)}" data-jump-div="${esc(run.rawDiv)}"`
              : `data-jump-fb-record="${esc(run.id)}" data-jump-ver="${esc(run.verId)}" data-jump-stage="${esc(run.stageId)}" data-jump-grp="${esc(run.rawDiv)}"`;
            return `
              <div class="dossier-run-row">
                <div style="min-width:0;flex:1">
                  <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
                    <span class="dossier-pill">${esc(run.mode === 'mane' ? t('modeMane', {}, lang) : t('modeFlashback', {}, lang))}</span>
                    <strong style="color:var(--gold)">#${run.rank}</strong>
                    <strong>${esc(run.title)}</strong>
                    <span style="color:var(--ink-muted)">(${esc(run.division)})</span>
                  </div>
                  <div style="font-size:11px;color:var(--ink-muted);margin-top:3px">
                    ${esc(t('mainDpsLabel', {}, lang))}: ${esc(run.carry)}
                  </div>
                </div>
                <div style="display:flex;align-items:center;gap:10px;flex-shrink:0">
                  <strong style="font-family:var(--font-display);color:var(--copper-bright)">${esc(run.metricText)}</strong>
                  <button type="button" class="text-link-btn" ${jumpAttrs}>${esc(t('dossierJumpToBoard', {}, lang))}</button>
                </div>
              </div>`;
          }).join('')}
        </div>`
      : `<p class="field-hint">${esc(t('dossierNoData', {}, lang))}</p>`}

    ${supersededRuns.length
      ? `<div class="dossier-section-title">
           <span>${esc(t('dossierPlayerSuperseded', {}, lang))}</span>
           <span>${esc(formatEntries(supersededRuns.length, lang))}</span>
         </div>
         <p class="dossier-superseded-note">${esc(t('dossierSupersededNote', {}, lang))}</p>
         <div class="dossier-run-list">
           ${supersededRuns.map((run) => `
             <div class="dossier-run-row is-superseded">
               <div style="min-width:0;flex:1">
                 <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
                   <span class="dossier-pill">${esc(run.mode === 'mane' ? t('modeMane', {}, lang) : t('modeFlashback', {}, lang))}</span>
                   <span class="dossier-superseded-pill">${esc(t('dossierSupersededTag', {}, lang))}</span>
                   <strong>${esc(run.title)}</strong>
                   <span style="color:var(--ink-muted)">(${esc(run.division)})</span>
                 </div>
                 <div style="font-size:11px;color:var(--ink-muted);margin-top:3px">
                   ${esc(t('mainDpsLabel', {}, lang))}: ${esc(run.carry)}${run.teamText ? ` · ${esc(run.teamText)}` : ''}
                 </div>
               </div>
               <div style="display:flex;align-items:center;gap:10px;flex-shrink:0">
                 <strong style="font-family:var(--font-display);color:var(--ink-muted)">${esc(run.metricText)}</strong>
               </div>
             </div>`).join('')}
         </div>`
      : ''}

    <div class="dossier-actions-row">
      <button type="button" class="ghost-btn" data-action="close-modal">${esc(t('btnClose', {}, lang))}</button>
    </div>`, true);
}

/* ==================== Mane's Bulletin Pages ==================== */
let maneDailyLoadSeq = 0;

async function loadManeDailyRows({ date, division, mapIds }) {
  if ((isOfflineSandboxMode() && state.dataSource === 'offline') || !sb) {
    return filterOfflineDailyRows(state.maneDailyScores, { date, division, mapIds });
  }
  const [start, end] = beijingDayRange(date, getLang());
  const rows = [];
  for (let offset = 0; ; offset += 500) {
    const page = await retryTransient(() => {
      let query = sb.from('mane_daily_scores').select('id,map_id,division,display_name,carry,team,score,approved_at,related_url')
        .gte('approved_at', start).lt('approved_at', end);
      if (division) query = query.eq('division', division);
      if (mapIds.length) query = query.in('map_id', mapIds);
      return checked(query.order('approved_at', { ascending: false }).order('id').range(offset, offset + 499));
    });
    rows.push(...page);
    if (page.length < 500) return rows;
  }
}

function getEffectiveDailyDate() {
  const { date } = state.maneDaily;
  if (date && /^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
  if (isOfflineSandboxMode() && state.dataSource === 'offline') {
    return latestOfflineDailyDate(state.maneDailyScores);
  }
  return todayInBeijing();
}

function renderManeDaily() {
  const lang = getLang();
  const { division, map } = state.maneDaily;
  const today = todayInBeijing();
  const yesterday = shiftBeijingDay(today, -1, lang);
  const selectedDate = getEffectiveDailyDate();
  const divLabels = divisionLabelsMap(lang);
  const mapOptions = state.maneMaps.map((m) => [m.id, `${m.edition} · ${displayBossName(m.name, lang)}`]);
  const offlineExportBtn = (isOfflineSandboxMode() && state.dataSource === 'offline')
    ? `<button type="button" class="paper-btn btn-export-offline" data-action="export-offline-excel">${esc(t('btnExportExcel', {}, lang))}</button>`
    : '';

  // Active Beijing dates ribbon (up to 8 newest dates from state.maneDailyScores)
  const dateCounts = new Map();
  for (const row of state.maneDailyScores || []) {
    const bt = beijingTime(row?.approved_at);
    const day = bt ? bt.slice(0, 10) : '';
    if (!day) continue;
    dateCounts.set(day, (dateCounts.get(day) || 0) + 1);
  }
  const activeDates = [...dateCounts.entries()]
    .sort((a, b) => b[0].localeCompare(a[0]))
    .slice(0, 8);

  const activeDatesBarHtml = activeDates.length
    ? `<div class="daily-dates-bar" role="group" aria-label="${esc(t('dailyActiveDates', {}, lang))}">
         <span style="font-family:var(--font-display);font-size:10px;letter-spacing:0.12em;color:var(--brass);text-transform:uppercase;flex-shrink:0">${esc(t('dailyActiveDates', {}, lang))}</span>
         ${activeDates.map(([d, cnt]) => `
           <button type="button" class="daily-date-chip ${d === selectedDate ? 'active' : ''}" data-mane-daily-date="${esc(d)}">
             <span>${esc(d)}</span>
             <small style="opacity:0.78">(${cnt})</small>
           </button>`).join('')}
       </div>`
    : '';

  return `<section class="board-panel">
    <div class="board-header">
      <div class="board-title-stack">
        <h2>${esc(t('dailyTitle', {}, lang))}</h2>
        <p class="board-subtitle">${esc(t('dailySubtitle', {}, lang))}${(isOfflineSandboxMode() && state.dataSource === 'offline') ? ` · ${esc(t('dailyOfflineHint', {}, lang))}` : ''}</p>
      </div>
      <div class="board-header-right">
        ${offlineExportBtn}
        <button type="button" class="outline-btn" data-action="refresh-mane-daily">${esc(t('btnRefresh', {}, lang))}</button>
      </div>
    </div>
    <div class="daily-filter-grid">
      <div class="field"><label for="maneDailyDate">${esc(t('dailyDateLabel', {}, lang))}</label>
        <div class="daily-date-controls">
          <button type="button" class="daily-quick-btn ${selectedDate === today ? 'active' : ''}" data-mane-daily-date="${today}">${esc(t('dailyToday', {}, lang))}</button>
          <button type="button" class="daily-quick-btn ${selectedDate === yesterday ? 'active' : ''}" data-mane-daily-date="${yesterday}">${esc(t('dailyYesterday', {}, lang))}</button>
          <input id="maneDailyDate" type="date" data-mane-daily="date" value="${selectedDate}" max="${today}" aria-label="${esc(t('dailyDateLabel', {}, lang))}" />
        </div>
      </div>
      <div class="field"><label for="maneDailyDivision">${esc(t('fieldDivision', {}, lang))}</label>
        <select id="maneDailyDivision" data-mane-daily="division">${optionsHtml([['', t('dailyAllDivisions', {}, lang)], ...Object.entries(divLabels)], division)}</select>
      </div>
      <div class="field"><label for="maneDailyMap">${esc(t('fieldBoss', {}, lang))}</label>
        <select id="maneDailyMap" data-mane-daily="map">${optionsHtml([['', t('dailyAllMaps', {}, lang)], ...mapOptions], map)}</select>
      </div>
    </div>
    ${activeDatesBarHtml}
    <div id="maneDailyResults" data-date="${selectedDate}" aria-live="polite"><p class="board-foot">${esc(state.loading ? t('emptyTitleLoading', {}, lang) : t('dailyLoading', {}, lang))}</p></div>
  </section>`;
}

async function fillManeDailyResults(host) {
  const lang = getLang();
  if (!state.connected) {
    if (!state.loading) host.textContent = t('offlineSyncFail', {}, lang);
    return;
  }
  const seq = ++maneDailyLoadSeq;
  const selectedDate = host.dataset.date;
  const { division, map } = state.maneDaily;
  try {
    const rows = await loadManeDailyRows({ date: selectedDate, division, mapIds: map ? [map] : [] });
    if (!host.isConnected || seq !== maneDailyLoadSeq) return;
    if (!rows.length) {
      host.innerHTML = `<div class="empty-state"><h3>${esc(t('dailyEmpty', {}, lang))}</h3></div>`;
      return;
    }

    const scoreById = new Map();
    const rankById = new Map();
    const byBoard = new Map();
    for (const r of state.maneScores) {
      scoreById.set(r.id, r);
      const boardKey = `${r.map_id}::${r.division}`;
      if (!byBoard.has(boardKey)) byBoard.set(boardKey, []);
      byBoard.get(boardKey).push(r);
    }
    for (const list of byBoard.values()) {
      list.sort(compareManeScore);
      list.forEach((r, idx) => rankById.set(r.id, idx + 1));
    }

    const extraBuildsById = new Map();
    const missingIds = rows.filter((r) => !scoreById.has(r.id)).map((r) => r.id);
    if (missingIds.length && state.dataSource === 'live' && sb) {
      try {
        for (let i = 0; i < missingIds.length; i += 200) {
          const chunk = missingIds.slice(i, i + 200);
          const extra = await checked(
            sb.from('mane_entries').select('id,team_psychubes,team_resonance_codes').in('id', chunk)
          );
          for (const entry of extra || []) extraBuildsById.set(entry.id, entry);
        }
      } catch (err) {
        console.warn('Could not load extra daily builds:', err);
      }
      if (!host.isConnected || seq !== maneDailyLoadSeq) return;
    }

    const mapById = new Map(state.maneMaps.map((m) => [m.id, m]));
    const teamJoiner = isEn(lang) ? ', ' : '、';
    const rowsHtml = rows.map((row) => {
      const mapObj = mapById.get(row.map_id);
      const section = mapObj?.section || 'new';
      const bossAsset = resolveBossAsset(mapObj?.name || '', section);
      const bossTitle = mapObj ? displayBossName(mapObj.name, lang) : t('modeMane', {}, lang);
      const bossSub = mapObj ? displayBossSubtitle(mapObj.name, section, lang) : '';
      const liveRow = scoreById.get(row.id);
      const liveRank = rankById.get(row.id) || 0;
      const { psychubes, resonanceCodes } = extractRecordBuilds(liveRow || extraBuildsById.get(row.id) || row);
      const carryDisplay = displayCarryNames(row.carry, lang);
      const teamDisplay = (row.team || []).map((n) => displayCharacterName(n, lang));
      const pid = `mane-daily-${row.id}`;

      posterIndex.set(pid, {
        mode: 'mane',
        recordId: row.id,
        dailyDate: selectedDate,
        section,
        mapId: row.map_id,
        division: row.division,
        rank: liveRank,
        title: bossTitle,
        bossEn: bossSub,
        bossThumb: bossAsset.thumb,
        subtitle: `${localizeSection(section, lang)} · ${localizeDivision(row.division, lang)}`,
        player: row.display_name,
        carry: carryDisplay,
        rawCarry: row.carry,
        team: row.team,
        displayTeam: teamDisplay,
        psychubes,
        resonanceCodes,
        score: row.score,
        date: beijingTime(row.approved_at),
        related_url: row.related_url
      });

      const colTime = L('Time', '时间', lang);
      const colBoss = t('fieldBoss', {}, lang);
      const colDiv = t('fieldDivision', {}, lang);
      const colPlayer = t('colInvestigator', {}, lang);
      const colLineup = t('colLineup', {}, lang);
      const colScore = t('scoreLabel', {}, lang);
      const colAction = L('Actions', '操作', lang);

      const miniSlots = parseLineupSlots(row.team, row.carry);
      const miniLineupHtml = miniSlots.some((s) => s.type === 'char' && s.char?.portrait)
        ? `<div class="daily-mini-lineup" style="margin-top:4px">${miniSlots.slice(0, 4).map((s) => {
            if (s.type === 'char' && s.char?.portrait) {
              const cName = displayCharacterName(s.char.name, lang);
              return `<span class="daily-mini-card" data-open-char="${esc(s.char.name)}" role="button" tabindex="0" style="cursor:pointer" title="${esc(cName)}"><img src="${esc(s.char.portrait)}" alt="${esc(cName)}" loading="lazy" decoding="async" /></span>`;
            }
            return '';
          }).join('')}</div>`
        : '';

      return `<tr>
        <td class="cell-daily-time" data-label="${esc(colTime)}">${esc(formatApprovedTime(row.approved_at, lang))}</td>
        <td class="cell-daily-map" data-label="${esc(colBoss)}">${esc(bossTitle)}</td>
        <td class="cell-daily-div" data-label="${esc(colDiv)}">${esc(localizeDivisionShort(row.division, lang))}</td>
        <td class="cell-daily-player" data-label="${esc(colPlayer)}"><span class="player-name is-clickable is-player-name" data-open-player="${esc(row.display_name)}" role="button" tabindex="0">${esc(row.display_name)}</span> ${localRecordBadgeHtml(row, lang)}</td>
        <td class="cell-daily-lineup" data-label="${esc(colLineup)}"><strong>${esc(carryDisplay)}</strong><br>${esc(teamDisplay.join(teamJoiner))} ${safeLinkHtml(row.related_url, t('relatedLink', {}, lang))}${miniLineupHtml}</td>
        <td class="num-col cell-daily-score" data-label="${esc(colScore)}"><span class="score-value">${formatScore(row.score, lang)}</span></td>
        <td class="cell-daily-actions" data-label="${esc(colAction)}"><span class="daily-actions-wrap"><button type="button" class="card-trigger daily-action-btn" data-poster="${esc(pid)}">${esc(t('viewCardBtn', {}, lang))}</button>${liveRow ? `<button type="button" class="text-link-btn" data-jump-mane-record="${esc(row.id)}" data-jump-section="${esc(section)}" data-jump-map="${esc(row.map_id)}" data-jump-div="${esc(row.division)}">${esc(t('dailyJumpBtn', {}, lang))}</button>` : ''}</span></td>
      </tr>`;
    }).join('');

    host.innerHTML = `<p class="board-foot">${esc(t('dailyCountFoot', { n: rows.length, date: selectedDate }, lang))}</p>
      <div class="table-scroll"><table class="archive-table table-mane-daily">
        <thead><tr><th>${esc(L('Time', '时间', lang))}</th><th>${esc(t('fieldBoss', {}, lang))}</th><th>${esc(t('fieldDivision', {}, lang))}</th><th>${esc(t('colInvestigator', {}, lang))}</th><th>${esc(t('mainDpsLabel', {}, lang))} / ${esc(t('colLineup', {}, lang))}</th><th class="num-col">${esc(t('scoreLabel', {}, lang))}</th><th style="text-align:right">${esc(L('Actions', '操作', lang))}</th></tr></thead>
        <tbody>${rowsHtml}</tbody>
      </table></div>`;
  } catch {
    if (host.isConnected && seq === maneDailyLoadSeq) {
      host.textContent = L('Unable to load daily scores right now. Click Refresh to try again.', '成绩暂时无法读取，请点击刷新。', lang);
    }
  }
}

function renderManeWorkspace() {
  const lang = getLang();
  if (state.manePage === 'daily') return renderManeDaily();

  const newMaps = activeManeMaps('new');
  const rerunMaps = activeManeMaps('rerun');
  const maps = activeManeMaps(state.maneSection);
  if (state.maneMaps.length && !maps.some((m) => m.id === state.maneMapId)) state.maneMapId = maps[0]?.id || '';

  const sectionBar = `
    <div class="section-bar">
      <div class="section-tabs" role="group" aria-label="${esc(t('sectionLabel', {}, lang))}">
        <button type="button" class="section-tab-btn ${state.maneSection === 'new' ? 'active' : ''}" data-mane-section="new">
          <span>${esc(localizeSection('new', lang))}</span>
          <span class="tab-count">${newMaps.length}</span>
        </button>
        <button type="button" class="section-tab-btn ${state.maneSection === 'rerun' ? 'active' : ''}" data-mane-section="rerun">
          <span>${esc(localizeSection('rerun', lang))}</span>
          <span class="tab-count">${rerunMaps.length}</span>
        </button>
      </div>
      <button type="button" class="ghost-btn icon-btn section-refresh-btn" data-action="refresh" title="${esc(t('btnRefresh', {}, lang))}" aria-label="${esc(t('btnRefresh', {}, lang))}"><img class="uttu-micro-icon" src="./assets/uttu/btn_reset.webp" alt="" aria-hidden="true" /><span class="btn-label">${esc(t('btnRefresh', {}, lang))}</span></button>
    </div>`;

  if (state.manePage === 'rules') return renderManeRules();
  if (state.manePage === 'players') return renderManePlayers();
  if (state.manePage === 'totals') return sectionBar + renderManeTotals(maps[0]?.edition || '', maps);

  const map = maps.find((m) => m.id === state.maneMapId);
  const bossAsset = resolveBossAsset(map?.name || '', state.maneSection);
  const bossMech = resolveManeBossMechanics(map?.name || '', lang);
  const bossTitle = map ? displayBossName(map.name, lang) : t('navScores', {}, lang);
  const bossSub = map ? displayBossSubtitle(map.name, state.maneSection, lang) : '';
  const bossTags = map ? displayBossTags(map.name, lang) : [];
  const bossWikiUrl = map ? resolveBossWikiUrl(map.name, state.maneSection, lang) : '';
  const isWideCutout = bossAsset.hero && bossAsset.hero !== bossAsset.thumb;

  const mapCounts = new Map();
  const mapPeaks = new Map();
  for (const r of state.maneScores) {
    if (r.division === state.maneDivision) {
      mapCounts.set(r.map_id, (mapCounts.get(r.map_id) || 0) + 1);
      const curBest = mapPeaks.get(r.map_id);
      if (!curBest || compareManeScore(r, curBest) < 0) mapPeaks.set(r.map_id, r);
    }
  }

  const zeroCount = state.maneScores.filter((r) => r.map_id === state.maneMapId && r.division === 'zero').length;
  const maxCount = state.maneScores.filter((r) => r.map_id === state.maneMapId && r.division === 'max').length;

  const ranked = state.maneScores
    .filter((r) => r.map_id === state.maneMapId && r.division === state.maneDivision)
    .sort(compareManeScore);
  const boardPeak = ranked[0] || null;

  const charEntries = collectBoardCharacters(ranked, state.maneRoleMode, (r) => r.carry, lang);
  const charLabelByKey = new Map(charEntries.map(([k, info]) => [k, info.label]));
  if (state.maneCarry && !charLabelByKey.has(state.maneCarry)) state.maneCarry = '';

  const q = normKey(state.maneQuery);
  const hasFilter = Boolean(state.maneCarry || state.maneAfflatus || q);
  const filteredRows = ranked
    .map((record, idx) => ({ record, rank: idx + 1 }))
    .filter(({ record }) => {
      const targetNames = state.maneRoleMode === 'member'
        ? extractLineupCharacterNames(record.team, record.carry)
        : splitCarries(record.carry);
      if (state.maneCarry && !targetNames.some((n) => canonicalCharacterKey(n) === state.maneCarry)) {
        return false;
      }
      if (state.maneAfflatus && !targetNames.some((n) => matchesAfflatus(n, state.maneAfflatus))) {
        return false;
      }
      if (!q) return true;
      return (
        normKey(record.display_name).includes(q) ||
        splitCarries(record.carry).some((c) => characterMatchesQuery(c, q)) ||
        (record.team || []).some((m) => characterMatchesQuery(m, q))
      );
    });

  const rowsHtml = filteredRows.map(({ record, rank }) => {
    const pid = `mane-${record.id}`;
    const carryDisplay = displayCarryNames(record.carry, lang);
    const teamDisplay = (record.team || []).map((n) => displayCharacterName(n, lang));
    const { psychubes, resonanceCodes } = extractRecordBuilds(record);

    posterIndex.set(pid, {
      mode: 'mane',
      recordId: record.id,
      section: state.maneSection,
      mapId: map?.id || state.maneMapId,
      division: state.maneDivision,
      rank,
      title: bossTitle,
      bossEn: bossSub,
      bossThumb: bossAsset.thumb,
      subtitle: `${localizeSection(state.maneSection, lang)} · ${localizeDivision(state.maneDivision, lang)}`,
      player: record.display_name,
      carry: carryDisplay,
      rawCarry: record.carry,
      team: record.team,
      displayTeam: teamDisplay,
      psychubes,
      resonanceCodes,
      score: record.score,
      date: formatDateTime(record.created_at, lang),
      related_url: record.related_url
    });

    const tierClass = rank <= 3 ? `top-${rank} is-podium` : 'is-regular';
    const highlightClass = state.highlightRecordId === pid ? 'is-highlighted' : '';
    const localTag = localRecordBadgeHtml(record, lang);

    return `
      <article class="rank-row ${tierClass} ${highlightClass}" data-record-row="${esc(pid)}">
        <div>${renderRankBadge(rank, lang)}</div>
        <div class="player-cell">
          <span class="player-name is-clickable is-player-name" data-open-player="${esc(record.display_name)}" role="button" tabindex="0">${esc(record.display_name)}</span>
          <div class="player-meta">
            <span title="${esc(formatDateTime(record.created_at, lang))}">${esc(formatMonthDayTime(record.created_at, lang))}</span>
            ${safeLinkHtml(record.related_url, t('videoGuideLink', {}, lang))}
            ${localTag}
          </div>
        </div>
        <div class="lineup-cell">
          <div class="carry-line">
            <span class="carry-label">${esc(t('mainDpsLabel', {}, lang))}</span>
            <span>${esc(carryDisplay)}</span>
          </div>
          ${renderFormationHtml(record.team, record.carry, psychubes, lang)}
        </div>
        ${renderRowIntelColumnHtml({
          mode: 'mane',
          record,
          rank,
          pid,
          psychubes,
          resonanceCodes,
          boardPeak,
          mapName: map?.name || '',
          stageFastest: null,
          lang
        })}
        <div class="result-cell">
          <div class="peak-score-ticket">
            <div class="peak-score-text">
              <span class="peak-label">${esc(t('scoreLabel', {}, lang))}</span>
              <span class="score-value">${formatScore(record.score, lang)}</span>
            </div>
            ${renderGradeStamp(record.score, lang)}
          </div>
          <div class="row-actions">
            <button type="button" class="card-trigger" data-poster="${esc(pid)}">${esc(t('viewCardBtn', {}, lang))}</button>
          </div>
        </div>
      </article>`;
  }).join('');

  const boardCountText = hasFilter
    ? `${filteredRows.length} / ${ranked.length}`
    : `${localizeDivisionShort(state.maneDivision, lang)} · ${formatEntries(ranked.length, lang)}`;

  const weaknessLabel = state.maneSection === 'new' ? t('weaknessLabel', {}, lang) : t('favoredLabel', {}, lang);
  const weaknessHtml = (bossAsset.weakness || []).length
    ? `<span class="glance-weakness"><span class="glance-label">${esc(weaknessLabel)}</span>${bossAsset.weakness.map((k) => {
        const meta = AFFLATUS_META[k];
        return meta ? `<span class="glance-aff-chip"><img src="${esc(meta.icon)}" alt="" aria-hidden="true" />${esc(localizeAfflatus(k, lang))}</span>` : '';
      }).join('')}</span>`
    : '';

  const thresholdProg = map ? getBossThresholdProgress(map.name, boardPeak?.score || 0, lang) : null;
  const thresholdSteps = thresholdProg?.thresholds?.length ? thresholdProg.thresholds : [];
  const selectedAppIdx = (state.maneSelectedAppraisal >= 0 && state.maneSelectedAppraisal < thresholdSteps.length)
    ? state.maneSelectedAppraisal
    : -1;
  const selectedAppStep = selectedAppIdx >= 0 ? thresholdSteps[selectedAppIdx] : null;

  const appraisalStripHtml = thresholdSteps.length
    ? `<div class="boss-appraisal-strip" title="${esc(t('appraisalClickHint', {}, lang))}">
         <div class="appraisal-rail">
           ${thresholdSteps.map((step, i) => `
             <button type="button" class="appraisal-step ${step.reached ? 'is-cleared' : ''} ${selectedAppIdx === i ? 'is-selected' : ''}" data-select-appraisal="${i}" aria-pressed="${selectedAppIdx === i}" title="${esc(step.scoreLabel)} · ${esc(t('appraisalClickHint', {}, lang))}">
               <span class="appraisal-roman">${esc(step.roman || toRoman(i + 1))}</span>
               <span class="appraisal-val">${esc(step.scoreLabel)}</span>
             </button>`).join('')}
         </div>
       </div>
       ${selectedAppStep ? `
         <div class="appraisal-callout" role="region" aria-label="${esc(t('appraisalActiveLabel', {}, lang))}">
           <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap">
             <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
               <strong>${esc(t('rowAppraisalStage', { roman: selectedAppStep.roman || toRoman(selectedAppIdx + 1) }, lang))} · ${esc(selectedAppStep.scoreLabel)}</strong>
               ${selectedAppStep.reached ? `<span class="dossier-pill" style="border-color:rgba(130,196,136,0.52);color:#b5ebb9;background:rgba(84,152,92,0.2)">✓ ${esc(t('appraisalClearedBadge', {}, lang))}</span>` : ''}
             </div>
             <button type="button" class="text-link-btn" data-action="toggle-mane-mech">${esc(state.maneMechOpen ? t('btnCollapseMech', {}, lang) : t('btnExpandMech', {}, lang))}</button>
           </div>
           <p>${highlightMechText(selectedAppStep.desc, lang)}</p>
         </div>` : ''}`
    : '';

  const mapAllDivRecords = state.maneScores.filter((r) => r.map_id === state.maneMapId);
  const canResetFilter = Boolean(hasFilter || state.maneRoleMode !== 'carry');
  const activeFilterCount = (state.maneCarry ? 1 : 0) + (state.maneAfflatus ? 1 : 0) + (q ? 1 : 0) + (state.maneRoleMode === 'member' ? 1 : 0);

  return `
    ${sectionBar}
    <div class="board-grid">
      <aside class="sidebar-panel ${state.mobileFilterOpen ? 'is-filter-open' : ''}" aria-label="${esc(t('headingLineupFilter', {}, lang))}">
        <div class="sidebar-dossier-block">
          ${igHeading(t('headingSurvey', {}, lang), t('headingSurveyEn', {}, lang), localizeDivisionShort(state.maneDivision, lang))}
          <div class="dossier-list" role="listbox" aria-label="${esc(t('headingSurvey', {}, lang))}">
            ${maps.map((m, idx) => {
              const cnt = mapCounts.get(m.id) || 0;
              const peakRow = mapPeaks.get(m.id);
              const mArt = resolveBossAsset(m.name, state.maneSection);
              const mTitle = displayBossName(m.name, lang);
              const affIconsHtml = (mArt.weakness || []).length
                ? `<span class="dossier-aff-icons">${mArt.weakness.map((k) => {
                    const meta = AFFLATUS_META[k];
                    return meta?.icon ? `<img src="${esc(meta.icon)}" alt="${esc(localizeAfflatus(k, lang))}" loading="lazy" decoding="async" />` : '';
                  }).join('')}</span>`
                : '';
              const subText = m.opens_at
                ? t('opensAt', { time: formatMonthDay(m.opens_at, lang) }, lang)
                : (mArt.version ? `v${mArt.version}` : localizeSection('rerun', lang));
              return `
                <button type="button" class="dossier-item ${m.id === state.maneMapId ? 'active' : ''} ${mArt.thumb ? 'has-boss-bg' : ''}" data-mane-map="${esc(m.id)}" title="${esc(mTitle)} (${esc(formatEntries(cnt, lang))})">
                  ${mArt.thumb ? `<span class="dossier-boss-art" style="background-image:url('${esc(mArt.thumb)}');background-position:${esc(mArt.pos)}" aria-hidden="true"></span>` : ''}
                  <span class="survey-num-box" aria-hidden="true">${idx + 1}</span>
                  <span class="dossier-main">
                    <span class="dossier-name">${esc(mTitle)}</span>
                    <span class="dossier-meta-line">
                      ${affIconsHtml}
                      <span class="dossier-sub">${esc(subText)}</span>
                    </span>
                  </span>
                  <span class="dossier-right-col">
                    ${peakRow ? `<span class="dossier-peak-preview">${esc(formatCompactScore(peakRow.score, lang))}</span>` : ''}
                    <span class="dossier-badge">${esc(formatEntries(cnt, lang))}</span>
                  </span>
                </button>`;
            }).join('') || `<p class="sidebar-note">${esc(t('emptyTitleLoading', {}, lang))}</p>`}
          </div>
        </div>

        <div class="sidebar-portrayal-block">
          ${igHeading(t('headingPortrayal', {}, lang), t('headingPortrayalEn', {}, lang))}
          <div class="portrayal-control-row">
            <div class="segmented-toggle">
              <button type="button" class="seg-btn ${state.maneDivision === 'zero' ? 'active' : ''}" data-mane-div="zero">
                <span>${esc(localizeDivision('zero', lang))}</span><small>${esc(formatEntries(zeroCount, lang))}</small>
              </button>
              <button type="button" class="seg-btn ${state.maneDivision === 'max' ? 'active' : ''}" data-mane-div="max">
                <span>${esc(localizeDivision('max', lang))}</span><small>${esc(formatEntries(maxCount, lang))}</small>
              </button>
            </div>
            <button type="button" class="mobile-filter-toggle ${state.mobileFilterOpen ? 'open' : ''} ${activeFilterCount ? 'has-active' : ''}" data-action="toggle-mobile-filter" aria-expanded="${state.mobileFilterOpen}">
              <img class="uttu-micro-icon" src="./assets/uttu/btn_search.webp" alt="" aria-hidden="true" />
              <span>${esc(t('mobileFilterBtn', {}, lang))}${activeFilterCount ? ` (${activeFilterCount})` : ''}</span>
              <span class="filter-caret" aria-hidden="true">${state.mobileFilterOpen ? '▴' : '▾'}</span>
            </button>
          </div>
        </div>

        <div class="lineup-filter-box">
          <div class="ig-heading">
            <span class="ig-heading-left">
              <span class="ig-tri" aria-hidden="true">▶</span>
              <span class="ig-cn">${esc(t('headingLineupFilter', {}, lang))}</span>
              <span class="ig-bar" aria-hidden="true"></span>
              <span class="ig-en">${esc(t('headingLineupFilterEn', {}, lang))}</span>
            </span>
            <button type="button" class="filter-reset-btn" data-action="reset-mane-filter" ${canResetFilter ? '' : 'disabled'} title="${esc(t('clearFilter', {}, lang))}">
              <img src="./assets/uttu/btn_reset.webp" alt="" aria-hidden="true" />
              <span>${esc(t('resetFilter', {}, lang))}</span>
            </button>
          </div>

          <div class="role-mode-toggle" role="group" aria-label="${esc(t('headingLineupFilter', {}, lang))}">
            <button type="button" class="role-pill ${state.maneRoleMode === 'carry' ? 'active' : ''}" data-mane-role="carry">${esc(t('roleCarryOnly', {}, lang))}</button>
            <button type="button" class="role-pill ${state.maneRoleMode === 'member' ? 'active' : ''}" data-mane-role="member">${esc(t('roleAnyMember', {}, lang))}</button>
          </div>

          <div class="field" style="margin-bottom:8px">
            <select id="maneCarrySelect" class="filter-select" aria-label="${esc(state.maneRoleMode === 'carry' ? t('allCarriesOption', {}, lang) : t('allMembersOption', {}, lang))}">
              <option value="">${esc(state.maneRoleMode === 'carry' ? `${t('allCarriesOption', {}, lang)} (${charEntries.length})` : `${t('allMembersOption', {}, lang)} (${charEntries.length})`)}</option>
              ${optionsHtml(charEntries.map(([k, info]) => [k, `${info.label} (${info.count})`]), state.maneCarry)}
            </select>
          </div>

          ${renderAfflatusFilterHtml(state.maneAfflatus, 'data-mane-aff', lang)}

          <div class="search-input-wrap">
            <img class="search-input-icon" src="./assets/uttu/btn_search.webp" alt="" aria-hidden="true" />
            <input id="maneSearchInput" class="filter-input has-icon" type="search" placeholder="${esc(t('searchPlaceholderMane', {}, lang))}" value="${esc(state.maneQuery)}" aria-label="${esc(t('searchPlaceholderMane', {}, lang))}" />
          </div>
        </div>

        ${renderSidebarMetaWidget(ranked, (r) => r.carry, state.maneCarry, 'mane', lang)}

        <div class="sidebar-note">
          ${esc(state.maneSection === 'rerun' ? t('sidebarNoteRerun', {}, lang) : t('sidebarNoteMane', {}, lang))}
        </div>
      </aside>

      <section class="board-panel" aria-label="${esc(t('maneTitle', {}, lang))}">
        <div class="board-header ${bossAsset.thumb ? 'has-boss-art' : ''}">
          <span class="boss-stamp-edge" aria-hidden="true"></span>
          ${bossAsset.thumb ? `<div class="boss-header-backdrop" style="background-image:url('${esc(bossAsset.thumb)}');background-position:${esc(bossAsset.pos)}" aria-hidden="true"></div>` : ''}
          <span class="boss-wanted-wm" aria-hidden="true">WANTED</span>
          ${isWideCutout ? `<img class="boss-header-cutout" src="${esc(bossAsset.hero)}" alt="" aria-hidden="true" loading="eager" fetchpriority="high" decoding="async" />` : ''}
          <div class="boss-header-scrim" aria-hidden="true"></div>
          <div class="board-title-stack">
            <div class="boss-tips-row">
              <span class="boss-tips-label">${esc(t('tipsLabel', {}, lang))}</span>
              ${weaknessHtml}
              ${bossTags.map((tag) => `<span class="tip-paper-tag">${esc(tag)}</span>`).join('')}
            </div>
            <div class="boss-headline-wrap">
              <h2>${esc(bossTitle)}</h2>
              ${bossSub ? `<span class="boss-en-sub">${esc(bossSub)}</span>` : ''}
            </div>
            <div class="boss-quick-glance">
              <span class="glance-meta">${bossMech?.turns ? esc(formatRounds(bossMech.turns, lang)) : ''}${map?.opens_at ? ` · ${esc(t('opensAt', { time: formatMonthDay(map.opens_at, lang) }, lang))}` : ''}</span>
              ${bossMech ? `<button type="button" class="mech-toggle-btn ${state.maneMechOpen ? 'active' : ''}" data-action="toggle-mane-mech" aria-expanded="${state.maneMechOpen}">${esc(state.maneMechOpen ? t('btnCollapseMech', {}, lang) : t('btnExpandMech', {}, lang))}</button>` : ''}
              ${bossWikiUrl ? `<a class="text-link-btn" href="${esc(bossWikiUrl)}" target="_blank" rel="noopener noreferrer">${esc(t('bossWikiLink', {}, lang))}</a>` : ''}
              ${state.maneCarry ? `<span class="glance-active-chip">${esc(state.maneRoleMode === 'carry' ? t('mainDpsLabel', {}, lang) : t('roleAnyMember', {}, lang))}: ${esc(charLabelByKey.get(state.maneCarry) || '')}</span>` : ''}
              ${state.maneAfflatus ? `<span class="glance-active-chip">${esc(localizeAfflatus(state.maneAfflatus, lang))}</span>` : ''}
              ${hasFilter ? `<button type="button" class="glance-clear-btn" data-action="reset-mane-filter">✕ ${esc(t('clearFilter', {}, lang))}</button>` : ''}
            </div>
            ${appraisalStripHtml}
          </div>
          <div class="boss-peak-widget">
            <div class="boss-peak-eyebrow">
              <span>${esc(t('bossPeakLabel', {}, lang))}</span>
              <span class="boss-peak-count">${esc(boardCountText)}</span>
            </div>
            ${boardPeak
              ? `<div class="peak-score-ticket">
                   <div class="peak-score-text">
                     <span class="peak-label is-player-name">${esc(boardPeak.display_name)}</span>
                     <span class="score-value">${formatScore(boardPeak.score, lang)}</span>
                   </div>
                   ${renderGradeStamp(boardPeak.score, lang)}
                 </div>`
              : `<div class="peak-score-ticket"><div class="peak-score-text"><span class="peak-label">${esc(t('emptyTitleEmpty', {}, lang))}</span><span class="score-value">—</span></div></div>`
            }
            <div class="boss-peak-actions">
              ${state.connected && isMapOpen(map) ? `<button type="button" class="paper-btn boss-submit-btn" data-action="open-submit">${esc(t('submitThisBoss', {}, lang))}</button>` : ''}
            </div>
          </div>
        </div>

        ${renderManeBossMechanicsDrawer(bossMech, lang)}

        ${renderBoardIntelBar('mane', ranked, mapAllDivRecords, lang)}

        ${filteredRows.length
          ? `<div class="rank-list">
               <div class="rank-list-head">
                 <span>${esc(t('colRank', {}, lang))}</span><span>${esc(t('colInvestigator', {}, lang))}</span><span>${esc(t('colLineup', {}, lang))}</span><span>${esc(t('colTactical', {}, lang))}</span><span class="col-right">${esc(t('colScoreGrade', {}, lang))}</span>
               </div>
               ${rowsHtml}
             </div>`
          : `<div class="empty-state">
               <span class="empty-glyph">✦</span>
               <h3>${esc(state.loading ? t('emptyTitleLoading', {}, lang) : (ranked.length ? t('emptyTitleFiltered', {}, lang) : t('emptyTitleEmpty', {}, lang)))}</h3>
               <p>${esc(state.loading ? t('statusSyncing', {}, lang) : (ranked.length ? t('emptyDescFiltered', {}, lang) : t('emptyDescMane', {}, lang)))}</p>
               ${ranked.length ? `<button type="button" class="outline-btn" data-action="reset-mane-filter">${esc(t('clearFilter', {}, lang))}</button>` : (state.connected && isMapOpen(map) ? `<button type="button" class="copper-btn" data-action="open-submit">${esc(t('emptyActionSubmit', {}, lang))}</button>` : '')}
             </div>`
        }
        <div class="board-foot">
          <span>${esc(t('boardFootMane', {}, lang))}</span>
        </div>
      </section>
    </div>`;
}

function renderManeTotals(latestEdition, sectionMaps = []) {
  const lang = getLang();
  const editionKey = state.maneSection === 'new' ? latestEdition : '';
  const totalMapsCount = sectionMaps.length;
  const rows = rankManeCarryTotals(state.maneTotals, state.maneSection, editionKey, state.maneDivision, null, lang);
  const teamJoiner = isEn(lang) ? ', ' : '、';
  const offlineExportBtn = (isOfflineSandboxMode() && state.dataSource === 'offline')
    ? `<button type="button" class="paper-btn btn-export-offline" data-action="export-offline-excel">${esc(t('btnExportExcel', {}, lang))}</button>`
    : '';

  const maxTotalNum = rows.length ? Math.max(1, Number(rows[0].total || 1n)) : 1;

  return `
    <div class="board-panel">
      <div class="board-header">
        <div class="board-title-stack">
          <div class="board-survey-tag"><span>${esc(t('totalsEyebrow', {}, lang))}</span></div>
          <div class="boss-headline-wrap">
            <h2>${esc(t('totalsTitle', {}, lang))}</h2>
            <span class="boss-en-sub">${esc(localizeSection(state.maneSection, lang))}</span>
          </div>
          <div class="paper-tag-row">
            <span class="paper-tag">${esc(localizeDivision(state.maneDivision, lang))}</span>
            <span class="paper-tag dark">${esc(formatBossCount(totalMapsCount, lang))}</span>
          </div>
        </div>
        <div class="board-header-right">
          ${offlineExportBtn}
          <div class="segmented-toggle" style="min-width:210px">
            <button type="button" class="seg-btn ${state.maneDivision === 'zero' ? 'active' : ''}" data-mane-div="zero"><span>${esc(localizeDivision('zero', lang))}</span></button>
            <button type="button" class="seg-btn ${state.maneDivision === 'max' ? 'active' : ''}" data-mane-div="max"><span>${esc(localizeDivision('max', lang))}</span></button>
          </div>
        </div>
      </div>

      <div class="totals-methodology">
        <div class="method-item">${esc(t('totalsMethodScope', {}, lang))}</div>
        <div class="method-item">${esc(t('totalsMethodZero', {}, lang))}</div>
        <div class="method-item">${esc(t('totalsMethodMerge', {}, lang))}</div>
      </div>

      ${rows.length
        ? `<div class="table-scroll">
            <table class="archive-table table-mane-totals">
              <thead><tr><th style="width:76px">${esc(t('colRank', {}, lang))}</th><th>${esc(t('mainDpsLabel', {}, lang))}</th><th>${esc(L('Per-Boss Best Breakdown', '各图最高分明细', lang))}</th><th class="num-col">${esc(L('Total Score', '调查总分', lang))}</th></tr></thead>
              <tbody>
                ${rows.map((row, idx) => {
                  const barPct = Math.min(100, Math.max(4, Math.round((Number(row.total || 0n) / maxTotalNum) * 100)));
                  return `
                    <tr>
                      <td class="cell-rank">${renderRankBadge(idx + 1, lang)}</td>
                      <td class="cell-entity">
                        <div style="display:flex;align-items:center;gap:6px">
                          <span data-open-char="${esc(row.carry_cn || row.carry_name)}" role="button" tabindex="0" style="cursor:pointer;display:inline-flex" title="${esc(row.carry_name)}">${renderCarryAvatarHtml(row.carry_cn || row.carry_name, lang)}</span>
                          <button type="button" class="entity-jump-btn" data-jump-mane-carry="${esc(row.carry_key)}" data-jump-carry-name="${esc(row.carry_name)}" data-jump-map="${esc(row.map_scores?.[0]?.map_id || '')}" title="${esc(row.carry_name)}">
                            <span style="min-width:0">
                              <strong style="font-family:var(--font-serif);font-size:15px">${esc(row.carry_name)}</strong>
                            </span>
                            <span class="entity-jump-arrow" aria-hidden="true">↗</span>
                          </button>
                        </div>
                      </td>
                      <td class="cell-detail">
                        <details class="map-breakdown">
                          <summary>${esc(t('totalsBreakdownSummary', { count: row.map_count }, lang))}${totalMapsCount ? ` / ${totalMapsCount}` : ''}</summary>
                          <ul>
                            ${(row.map_scores || []).map((m) => {
                              const bArt = resolveBossAsset(m.name, state.maneSection);
                              return `
                              <li>
                                ${bArt?.thumb ? `<img class="breakdown-boss-thumb" src="${esc(bArt.thumb)}" alt="" aria-hidden="true" loading="lazy" decoding="async" />` : ''}
                                <strong>${esc(displayBossName(m.name, lang))}</strong> · <span style="display:inline;color:var(--copper-bright)">${formatScore(m.score, lang)}</span>
                                <button type="button" class="text-link-btn" style="margin-left:8px" data-jump-mane-carry="${esc(row.carry_key)}" data-jump-carry-name="${esc(row.carry_name)}" data-jump-map="${esc(m.map_id)}">${esc(t('totalsWatchMap', {}, lang))}</button>
                                <span>${esc(t('colInvestigator', {}, lang))}: <em class="is-player-name" style="font-style:normal">${esc(m.player)}</em> · ${esc((m.team || []).map((n) => displayCharacterName(n, lang)).join(teamJoiner))}</span>
                              </li>`;
                            }).join('')}
                          </ul>
                        </details>
                      </td>
                      <td class="num-col cell-primary" data-label="${esc(L('Total Score', '调查总分', lang))}">
                        <span class="score-value">${formatScore(row.total, lang)}</span>
                        <div class="totals-bar-track"><div class="totals-bar-fill" style="width:${barPct}%"></div></div>
                      </td>
                    </tr>`;
                }).join('')}
              </tbody>
            </table>
          </div>`
        : `<div class="empty-state"><span class="empty-glyph">✦</span><h3>${esc(t('totalsEmpty', {}, lang))}</h3></div>`
      }
      <div class="board-foot">
        <span>${esc(localizeDivision(state.maneDivision, lang))} · ${esc(formatEntries(rows.length, lang))}</span>
      </div>
    </div>`;
}

function renderManePlayers() {
  const lang = getLang();
  const locale = isEn(lang) ? 'en' : 'zh-CN';
  const scopes = {
    all: t('playersScopeAll', {}, lang),
    new: t('playersScopeNew', {}, lang),
    rerun: t('playersScopeRerun', {}, lang)
  };
  const divs = {
    all: t('playersDivAll', {}, lang),
    zero: localizeDivision('zero', lang),
    max: localizeDivision('max', lang)
  };

  const newMaps = activeManeMaps('new');
  const rerunMaps = activeManeMaps('rerun');
  const scopedMaps = state.manePlayerScope === 'new'
    ? newMaps
    : state.manePlayerScope === 'rerun'
      ? rerunMaps
      : [...newMaps, ...rerunMaps];
  const mapById = new Map(scopedMaps.map((m) => [m.id, m]));

  const boardGroups = new Map();
  for (const rec of state.maneScores) {
    if (!mapById.has(rec.map_id)) continue;
    if (state.manePlayerDiv !== 'all' && rec.division !== state.manePlayerDiv) continue;
    const gKey = `${rec.map_id}::${rec.division}`;
    if (!boardGroups.has(gKey)) boardGroups.set(gKey, []);
    boardGroups.get(gKey).push(rec);
  }

  const playersMap = new Map();
  for (const list of boardGroups.values()) {
    list.sort(compareManeScore);
    list.forEach((rec, idx) => {
      const rank = idx + 1;
      const pKey = normKey(rec.display_name);
      if (!pKey) return;
      let p = playersMap.get(pKey);
      if (!p) {
        p = {
          name: rec.display_name,
          recordCount: 0,
          firstCount: 0,
          podiumCount: 0,
          bestScore: 0n,
          bestLabel: '',
          carryCounts: new Map(),
          entries: []
        };
        playersMap.set(pKey, p);
      }
      const map = mapById.get(rec.map_id);
      const mapLabel = map ? displayBossName(map.name, lang) : t('modeMane', {}, lang);
      const score = BigInt(rec.score || 0);
      p.recordCount += 1;
      if (rank === 1) p.firstCount += 1;
      if (rank <= 3) p.podiumCount += 1;
      for (const rawC of splitCarries(rec.carry)) {
        const ch = resolveCharacter(rawC);
        if (!ch) continue;
        const cur = p.carryCounts.get(ch.id);
        if (cur) cur.count += 1;
        else p.carryCounts.set(ch.id, { char: ch, count: 1 });
      }
      if (score > p.bestScore) {
        p.bestScore = score;
        p.bestLabel = `${mapLabel} · ${localizeDivisionShort(rec.division, lang)}`;
      }
      p.entries.push({
        id: rec.id,
        section: map?.section || 'new',
        mapId: rec.map_id,
        mapName: mapLabel,
        division: rec.division,
        rank,
        score,
        carry: displayCarryNames(rec.carry, lang)
      });
    });
  }

  const rows = [...playersMap.values()]
    .map((p) => {
      p.entries.sort((a, b) => (a.rank - b.rank) || (b.score > a.score ? 1 : b.score < a.score ? -1 : 0));
      p.favChars = [...p.carryCounts.values()].sort((a, b) => b.count - a.count).slice(0, 3);
      return p;
    })
    .sort((a, b) =>
      (b.recordCount - a.recordCount) ||
      (b.firstCount - a.firstCount) ||
      (b.podiumCount - a.podiumCount) ||
      (b.bestScore > a.bestScore ? 1 : b.bestScore < a.bestScore ? -1 : 0) ||
      String(a.name).localeCompare(String(b.name), locale)
    );

  return `
    <div class="section-bar">
      <div class="section-tabs" role="group" aria-label="${esc(t('sectionLabel', {}, lang))}">
        ${Object.entries(scopes).map(([k, lbl]) =>
          `<button type="button" class="section-tab-btn ${k === state.manePlayerScope ? 'active' : ''}" data-mane-player-scope="${k}">${esc(lbl)}</button>`
        ).join('')}
      </div>
      <div class="section-tabs" role="group" aria-label="${esc(t('fieldDivision', {}, lang))}">
        ${Object.entries(divs).map(([k, lbl]) =>
          `<button type="button" class="outline-btn ${k === state.manePlayerDiv ? 'selected' : ''}" data-mane-player-div="${k}">${esc(lbl)}</button>`
        ).join('')}
      </div>
    </div>

    <div class="board-panel">
      <div class="board-header">
        <div class="board-title-stack">
          <div class="boss-headline-wrap">
            <h2>${esc(t('playersManeTitle', {}, lang))}</h2>
            <span class="boss-en-sub">Hall of Fame</span>
          </div>
          <div class="paper-tag-row">
            <span class="paper-tag">${esc(scopes[state.manePlayerScope])}</span>
            <span class="paper-tag dark">${esc(divs[state.manePlayerDiv])}</span>
          </div>
        </div>
        <span class="count-tag">${esc(formatEntries(rows.length, lang))}</span>
      </div>

      ${rows.length
        ? `<div class="table-scroll">
            <table class="archive-table table-mane-players">
              <thead>
                <tr>
                  <th style="width:70px">${esc(t('colRank', {}, lang))}</th>
                  <th>${esc(L('Timekeeper', '调查员', lang))}</th>
                  <th>${esc(L('Honors & Active Rankings', '荣誉分布与持榜明细', lang))}</th>
                  <th class="num-col">${esc(t('playersBestScore', {}, lang))}</th>
                  <th class="num-col" style="width:128px">${esc(t('playersHoldings', {}, lang))}</th>
                </tr>
              </thead>
              <tbody>
                ${rows.map((p, idx) => `
                  <tr>
                    <td class="cell-rank">${renderRankBadge(idx + 1, lang)}</td>
                    <td class="cell-entity">
                      <div style="display:flex;flex-direction:column;gap:4px">
                        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
                          <span class="player-name is-clickable is-player-name" data-open-player="${esc(p.name)}" role="button" tabindex="0">${esc(p.name)}</span>
                          <button type="button" class="text-link-btn" data-jump-mane-player="${esc(p.name)}" data-jump-section="${esc(p.entries[0]?.section || 'new')}" data-jump-map="${esc(p.entries[0]?.mapId || '')}" data-jump-div="${esc(p.entries[0]?.division || 'zero')}">${esc(t('totalsWatchMap', {}, lang))}</button>
                        </div>
                        ${p.favChars.length ? `
                          <div class="hof-fav-chars">
                            ${p.favChars.map(({ char }) => {
                              const cDisp = displayCharacterName(char.name, lang);
                              return char.portrait
                                ? `<img src="${esc(char.portrait)}" alt="${esc(cDisp)}" title="${esc(cDisp)}" data-open-char="${esc(char.name)}" role="button" tabindex="0" style="cursor:pointer" loading="lazy" decoding="async" />`
                                : '';
                            }).join('')}
                          </div>` : ''}
                      </div>
                    </td>
                    <td class="cell-detail">
                      <div class="honor-badges-row hof-medals">
                        ${p.firstCount ? `<span class="hof-crown-pill">♛ ${esc(t('hofCrownsLabel', {}, lang))} ×${p.firstCount}</span>` : ''}
                        ${p.podiumCount ? `<span class="honor-chip bronze">${esc(t('hofPodiumsLabel', {}, lang))} ×${p.podiumCount}</span>` : ''}
                      </div>
                      <details class="map-breakdown">
                        <summary>${esc(t('playersExpandRecords', { n: p.recordCount }, lang))}</summary>
                        <ul>
                          ${p.entries.map((e) => `
                            <li>
                              <strong>#${e.rank} ${esc(e.mapName)}</strong> (${esc(localizeDivisionShort(e.division, lang))}) ·
                              <span style="display:inline;color:var(--copper-bright)">${formatScore(e.score, lang)}</span>
                              <button type="button" class="text-link-btn" style="margin-left:8px" data-jump-mane-record="${esc(e.id)}" data-jump-section="${esc(e.section)}" data-jump-map="${esc(e.mapId)}" data-jump-div="${esc(e.division)}">${esc(t('totalsWatchMap', {}, lang))}</button>
                              <span>${esc(t('mainDpsLabel', {}, lang))}: ${esc(e.carry)}</span>
                            </li>`).join('')}
                        </ul>
                      </details>
                    </td>
                    <td class="num-col cell-secondary" data-label="${esc(t('playersBestScore', {}, lang))}">
                      <div class="cell-metric-val">
                        <span class="score-value" style="font-size:15.5px">${formatScore(p.bestScore, lang)}</span>
                        <div class="cell-metric-sub">${esc(p.bestLabel)}</div>
                      </div>
                    </td>
                    <td class="num-col cell-primary" data-label="${esc(t('playersHoldings', {}, lang))}"><span class="score-value">${p.recordCount}</span></td>
                  </tr>`).join('')}
              </tbody>
            </table>
          </div>`
        : `<div class="empty-state"><span class="empty-glyph">♙</span><h3>${esc(t('playersEmpty', {}, lang))}</h3></div>`
      }
      <div class="board-foot">
        <span>${esc(t('playersManeFoot', {}, lang))}</span>
      </div>
    </div>`;
}

function renderManeRules() {
  const lang = getLang();
  const items = t('rulesManeItems', {}, lang) || [];
  return `
    ${renderGlobalServerNoticeHtml('mane-rules', lang)}
    <div class="rules-grid">
      ${items.map(([num, title, desc]) => `
        <article class="rule-card">
          <span class="rule-num">${esc(num)}</span>
          <h3>${esc(title)}</h3>
          <p>${esc(desc)}</p>
        </article>`).join('')}
    </div>`;
}

/* ==================== Focused Flashback Pages ==================== */
function parseFlashbackEnemyHpChips(stageArt, stageMech, lang = getLang()) {
  const enemies = stageArt?.enemies || [];
  if (!enemies.length) return [];
  const rawDesc = String(stageMech?.enemies || '');
  const segments = rawDesc.split('+').map((s) => s.trim()).filter(Boolean);
  return enemies.map((enemy, idx) => {
    const seg = segments[idx] || '';
    const hpMatch = seg.match(/[（(]([^）)]+)[）)]/);
    const countMatch = seg.match(/×\s*(\d+)/);
    const hpText = hpMatch ? `${hpMatch[1]}${countMatch ? ` ×${countMatch[1]}` : ''}` : '';
    return {
      name: isEn(lang) ? enemy.en : enemy.name,
      icon: enemy.icon,
      hp: hpText
    };
  });
}

function renderFlashbackWorkspace() {
  const lang = getLang();
  if (state.fbPage === 'rules') return renderFlashbackRules();
  if (state.fbPage === 'carries') return renderFlashbackCarries();
  if (state.fbPage === 'players') return renderFlashbackPlayers();

  const ver = state.fbVersions.find((v) => v.id === state.fbVersionId);
  const stages = standardStages(state.fbVersionId);
  if (state.fbVersions.length && !stages.some((s) => s.id === state.fbStageId)) state.fbStageId = stages[0]?.id || '';
  const stage = stages.find((s) => s.id === state.fbStageId);
  const stageMech = resolveFlashbackStageMechanics(stage, lang);
  const stageArt = resolveFlashbackStageArt(stage);
  const stageCleanTitle = stage ? cleanStageDisplayName(stage.name, lang) : t('fbTitle', {}, lang);
  const archetypes = stageCleanTitle.split(/\s*[\/／]\s*/).map((s) => s.trim()).filter(Boolean);
  const enemyChips = parseFlashbackEnemyHpChips(stageArt, stageMech, lang);
  const stageWikiUrl = isEn(lang) ? stageArt?.wikiEn : stageArt?.wikiZh;

  const stageCounts = new Map();
  const stageBestRounds = new Map();
  for (const r of state.fbRecords) {
    if (r.group_code === state.fbGroup) {
      stageCounts.set(r.stage_id, (stageCounts.get(r.stage_id) || 0) + 1);
      const curBest = stageBestRounds.get(r.stage_id);
      if (curBest === undefined || Number(r.rounds) < curBest) {
        stageBestRounds.set(r.stage_id, Number(r.rounds));
      }
    }
  }

  const zeroCount = state.fbRecords.filter((r) => r.stage_id === state.fbStageId && r.group_code === 'zero').length;
  const maxCount = state.fbRecords.filter((r) => r.stage_id === state.fbStageId && r.group_code === 'max').length;

  const ranked = state.fbRecords
    .filter((r) => r.stage_id === state.fbStageId && r.group_code === state.fbGroup)
    .sort(compareFlashbackRecord);
  const stageFastest = ranked[0] || null;

  const charEntries = collectBoardCharacters(ranked, state.fbRoleMode, (r) => r.carry_name, lang);
  const charLabelByKey = new Map(charEntries.map(([k, info]) => [k, info.label]));
  if (state.fbCarry && !charLabelByKey.has(state.fbCarry)) state.fbCarry = '';

  const q = normKey(state.fbQuery);
  const resonanceOnly = state.fbGroup === 'zero' && state.fbResonanceOnly;
  const hasFilter = Boolean(state.fbCarry || state.fbAfflatus || q || resonanceOnly);
  const filteredRows = ranked
    .map((record, idx) => ({ record, rank: idx + 1 }))
    .filter(({ record }) => {
      if (resonanceOnly && !record.resonance_ten) return false;
      const decodedMembers = extractLineupCharacterNames(record.team, record.carry_name);
      const targetNames = state.fbRoleMode === 'member'
        ? decodedMembers
        : splitCarries(record.carry_name);
      if (state.fbCarry && !targetNames.some((n) => canonicalCharacterKey(n) === state.fbCarry)) {
        return false;
      }
      if (state.fbAfflatus && !targetNames.some((n) => matchesAfflatus(n, state.fbAfflatus))) {
        return false;
      }
      if (!q) return true;
      return (
        normKey(record.display_name).includes(q) ||
        splitCarries(record.carry_name).some((c) => characterMatchesQuery(c, q)) ||
        decodedMembers.some((m) => characterMatchesQuery(m, q)) ||
        (record.team || []).some((m) => normKey(m).includes(q))
      );
    });

  const archives = state.fbArchives
    .filter((a) => !resonanceOnly && a.stage_id === state.fbStageId && a.group_code === state.fbGroup)
    .sort((a, b) => a.display_order - b.display_order);

  const rowsHtml = filteredRows.map(({ record, rank }) => {
    const pid = `fb-${record.id}`;
    const carryDisplay = displayCarryNames(record.carry_name, lang);
    const teamDisplay = isLegacyShorthandTeam(record.team)
      ? record.team
      : (record.team || []).map((n) => displayCharacterName(n, lang));
    const { psychubes, resonanceCodes } = extractRecordBuilds(record);

    posterIndex.set(pid, {
      mode: 'flashback',
      recordId: record.id,
      versionId: ver?.id || state.fbVersionId,
      stageId: stage?.id || state.fbStageId,
      group: state.fbGroup,
      rank,
      title: stageCleanTitle,
      bossEn: stageMech?.code || '',
      bossThumb: stageArt?.hero || '',
      subtitle: `${ver ? localizeVersionLabel(ver, lang) : ''} · ${localizeDivision(state.fbGroup, lang)}`,
      player: record.display_name,
      carry: carryDisplay,
      rawCarry: record.carry_name,
      team: record.team,
      displayTeam: teamDisplay,
      psychubes,
      resonanceCodes,
      resonanceTen: Boolean(record.group_code === 'zero' && record.resonance_ten),
      rounds: record.rounds,
      date: formatDateTime(record.created_at, lang),
      related_url: record.related_url
    });

    const tierClass = rank <= 3 ? `top-${rank} is-podium` : 'is-regular';
    const highlightClass = state.highlightRecordId === pid ? 'is-highlighted' : '';
    const localTag = localRecordBadgeHtml(record, lang);
    const isFast = Number(record.rounds) <= 2;

    return `
      <article class="rank-row ${tierClass} ${highlightClass}" data-record-row="${esc(pid)}">
        <div>${renderRankBadge(rank, lang)}</div>
        <div class="player-cell">
          <span class="player-name is-clickable is-player-name" data-open-player="${esc(record.display_name)}" role="button" tabindex="0">${esc(record.display_name)}</span>
          <div class="player-meta">
            <span title="${esc(formatDateTime(record.created_at, lang))}">${esc(formatMonthDayTime(record.created_at, lang))}</span>
            ${safeLinkHtml(record.related_url, t('videoGuideLink', {}, lang))}
            ${record.group_code === 'zero' && record.resonance_ten ? resonanceBadgeHtml(lang) : ''}
            ${localTag}
          </div>
        </div>
        <div class="lineup-cell">
          <div class="carry-line">
            <span class="carry-label">${esc(t('mainDpsLabel', {}, lang))}</span>
            <span>${esc(carryDisplay)}</span>
          </div>
          ${renderFormationHtml(record.team, record.carry_name, psychubes, lang)}
        </div>
        ${renderRowIntelColumnHtml({
          mode: 'flashback',
          record,
          rank,
          pid,
          psychubes,
          resonanceCodes,
          boardPeak: null,
          mapName: '',
          stageFastest,
          lang
        })}
        <div class="result-cell">
          <span class="round-badge ${isFast ? 'is-fast' : ''}">${record.rounds}<small>${esc(isEn(lang) ? (Number(record.rounds) === 1 ? 'Round' : 'Rounds') : '回合')}</small></span>
          <div class="row-actions">
            <button type="button" class="card-trigger" data-poster="${esc(pid)}">${esc(t('viewCardBtn', {}, lang))}</button>
          </div>
        </div>
      </article>`;
  }).join('');

  const archiveHtml = archives.length ? `
    <div class="board-foot"><span>${esc(t('adminTabHistorical', {}, lang))} · ${esc(localizeDivision(state.fbGroup, lang))}</span></div>
    <div class="table-scroll">
      <table class="archive-table table-fb-archives">
        <thead><tr><th>${esc(t('mainDpsLabel', {}, lang))}</th><th>${esc(t('legacyTeamLabel', {}, lang))}</th><th>${esc(t('colInvestigator', {}, lang))}</th><th class="num-col">${esc(t('colRounds', {}, lang))}</th></tr></thead>
        <tbody>
          ${archives.map((row) => `
            <tr>
              <td class="cell-entity" data-label="${esc(t('mainDpsLabel', {}, lang))}">${(row.carry_names || []).map((c) => esc(displayCharacterName(c, lang))).join(' / ')}</td>
              <td class="cell-detail" data-label="${esc(t('legacyTeamLabel', {}, lang))}">${esc(row.lineup_label)}</td>
              <td class="cell-secondary is-player-name" data-label="${esc(t('colInvestigator', {}, lang))}">${esc(row.credited_player)}</td>
              <td class="num-col cell-primary" data-label="${esc(t('colRounds', {}, lang))}">≤ 6R</td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>` : '';

  const boardCountText = hasFilter
    ? `${filteredRows.length} / ${ranked.length}`
    : `${localizeDivisionShort(state.fbGroup, lang)} · ${formatEntries(ranked.length, lang)}`;

  const stageAllGroupRecords = state.fbRecords.filter((r) => r.stage_id === state.fbStageId);
  const canResetFilter = Boolean(hasFilter || state.fbRoleMode !== 'carry');
  const activeFilterCount = [state.fbCarry, state.fbAfflatus, q, state.fbRoleMode === 'member', resonanceOnly].filter(Boolean).length;

  return `
    <div class="section-bar fb-section-bar">
      <div class="fb-version-picker">
        <label for="fbVersionSelect" class="fb-version-label">${esc(t('versionSelectLabel', {}, lang))}</label>
        <select id="fbVersionSelect" class="filter-select fb-version-select">
          ${optionsHtml(state.fbVersions.map((v) => [v.id, localizeVersionLabel(v, lang)]), state.fbVersionId)}
        </select>
      </div>
      <button type="button" class="ghost-btn icon-btn section-refresh-btn" data-action="refresh" title="${esc(t('btnRefresh', {}, lang))}" aria-label="${esc(t('btnRefresh', {}, lang))}"><img class="uttu-micro-icon" src="./assets/uttu/btn_reset.webp" alt="" aria-hidden="true" /><span class="btn-label">${esc(t('btnRefresh', {}, lang))}</span></button>
    </div>

    ${renderGlobalServerNoticeHtml('fb-board', lang)}

    <div class="board-grid">
      <aside class="sidebar-panel ${state.mobileFilterOpen ? 'is-filter-open' : ''}" aria-label="${esc(t('headingLineupFilter', {}, lang))}">
        <div class="sidebar-dossier-block">
          ${igHeading(t('headingStageSelect', {}, lang), t('headingStageSelectEn', {}, lang), localizeDivisionShort(state.fbGroup, lang))}
          <div class="dossier-list">
            ${stages.map((s) => {
              const cnt = stageCounts.get(s.id) || 0;
              const bestR = stageBestRounds.get(s.id);
              const sArt = resolveFlashbackStageArt(s);
              const cleanName = cleanStageDisplayName(s.name, lang);
              const enemyBrief = (sArt?.enemies || []).map((e) => (isEn(lang) ? e.en : e.name)).join(' · ') || `Stage ${s.stage_no}`;
              return `
                <button type="button" class="dossier-item ${s.id === state.fbStageId ? 'active' : ''} ${sArt?.thumb ? 'has-boss-bg' : ''}" data-fb-stage="${esc(s.id)}" title="${esc(cleanName)} (${esc(formatEntries(cnt, lang))})">
                  ${sArt?.thumb ? `<span class="dossier-boss-art" style="background-image:url('${esc(sArt.thumb)}');background-position:${esc(sArt.pos)}" aria-hidden="true"></span>` : ''}
                  <span class="survey-num-box" aria-hidden="true">${toRoman(s.stage_no)}</span>
                  <span class="dossier-main">
                    <span class="dossier-name">${esc(cleanName)}</span>
                    <span class="dossier-sub">${esc(enemyBrief)}</span>
                  </span>
                  <span class="dossier-right-col">
                    ${bestR !== undefined ? `<span class="dossier-peak-preview">${esc(t('roundsUnit', { n: bestR }, lang))}</span>` : ''}
                    <span class="dossier-badge">${esc(formatEntries(cnt, lang))}</span>
                  </span>
                </button>`;
            }).join('') || `<p class="sidebar-note">${esc(state.loading ? t('emptyTitleLoading', {}, lang) : t('emptyTitleEmpty', {}, lang))}</p>`}
          </div>
        </div>

        <div class="sidebar-portrayal-block">
          ${igHeading(t('headingPortrayal', {}, lang), t('headingPortrayalEn', {}, lang))}
          <div class="portrayal-control-row">
            <div class="segmented-toggle">
              <button type="button" class="seg-btn ${state.fbGroup === 'zero' ? 'active' : ''}" data-fb-group="zero">
                <span>${esc(localizeDivision('zero', lang))}</span><small>${esc(formatEntries(zeroCount, lang))}</small>
              </button>
              <button type="button" class="seg-btn ${state.fbGroup === 'max' ? 'active' : ''}" data-fb-group="max">
                <span>${esc(localizeDivision('max', lang))}</span><small>${esc(formatEntries(maxCount, lang))}</small>
              </button>
            </div>
            <button type="button" class="mobile-filter-toggle ${state.mobileFilterOpen ? 'open' : ''} ${activeFilterCount ? 'has-active' : ''}" data-action="toggle-mobile-filter" aria-expanded="${state.mobileFilterOpen}">
              <img class="uttu-micro-icon" src="./assets/uttu/btn_search.webp" alt="" aria-hidden="true" />
              <span>${esc(t('mobileFilterBtn', {}, lang))}${activeFilterCount ? ` (${activeFilterCount})` : ''}</span>
              <span class="filter-caret" aria-hidden="true">${state.mobileFilterOpen ? '▴' : '▾'}</span>
            </button>
          </div>
        </div>

        <div class="lineup-filter-box">
          <div class="ig-heading">
            <span class="ig-heading-left">
              <span class="ig-tri" aria-hidden="true">▶</span>
              <span class="ig-cn">${esc(t('headingLineupFilter', {}, lang))}</span>
              <span class="ig-bar" aria-hidden="true"></span>
              <span class="ig-en">${esc(t('headingLineupFilterEn', {}, lang))}</span>
            </span>
            <button type="button" class="filter-reset-btn" data-action="reset-fb-filter" ${canResetFilter ? '' : 'disabled'} title="${esc(t('clearFilter', {}, lang))}">
              <img src="./assets/uttu/btn_reset.webp" alt="" aria-hidden="true" />
              <span>${esc(t('resetFilter', {}, lang))}</span>
            </button>
          </div>

          <div class="role-mode-toggle" role="group" aria-label="${esc(t('headingLineupFilter', {}, lang))}">
            <button type="button" class="role-pill ${state.fbRoleMode === 'carry' ? 'active' : ''}" data-fb-role="carry">${esc(t('roleCarryOnly', {}, lang))}</button>
            <button type="button" class="role-pill ${state.fbRoleMode === 'member' ? 'active' : ''}" data-fb-role="member">${esc(t('roleAnyMember', {}, lang))}</button>
          </div>

          <div class="field" style="margin-bottom:8px">
            <select id="fbCarrySelect" class="filter-select" aria-label="${esc(state.fbRoleMode === 'carry' ? t('allCarriesOption', {}, lang) : t('allMembersOption', {}, lang))}">
              <option value="">${esc(state.fbRoleMode === 'carry' ? `${t('allCarriesOption', {}, lang)} (${charEntries.length})` : `${t('allMembersOption', {}, lang)} (${charEntries.length})`)}</option>
              ${optionsHtml(charEntries.map(([k, info]) => [k, `${info.label} (${info.count})`]), state.fbCarry)}
            </select>
          </div>

          ${renderAfflatusFilterHtml(state.fbAfflatus, 'data-fb-aff', lang)}

          <div class="search-input-wrap">
            <img class="search-input-icon" src="./assets/uttu/btn_search.webp" alt="" aria-hidden="true" />
            <input id="fbSearchInput" class="filter-input has-icon" type="search" placeholder="${esc(t('searchPlaceholderFb', {}, lang))}" value="${esc(state.fbQuery)}" aria-label="${esc(t('searchPlaceholderFb', {}, lang))}" />
          </div>
        </div>

        ${renderSidebarMetaWidget(ranked, (r) => r.carry_name, state.fbCarry, 'flashback', lang)}

        <div class="sidebar-note">
          ${esc(t('sidebarNoteFb', {}, lang))}
        </div>
      </aside>

      <div>
        <section class="board-panel">
          <div class="board-header ${stageArt?.hero ? 'has-fb-art' : ''}">
            <span class="boss-stamp-edge" aria-hidden="true"></span>
            ${stageArt?.hero ? `<div class="boss-header-backdrop" style="background-image:url('${esc(stageArt.hero)}');background-position:${esc(stageArt.pos)}" aria-hidden="true"></div>` : ''}
            <div class="boss-header-scrim" aria-hidden="true"></div>
            <div class="board-title-stack">
              <div class="boss-headline-wrap">
                <h2>${esc(stageCleanTitle)}</h2>
                <span class="boss-en-sub">${esc(stageMech?.code || `STAGE ${stage?.stage_no || ''}`)}</span>
              </div>
              ${archetypes.length ? `
                <div class="fb-archetype-row">
                  ${archetypes.map((tag) => `<span class="fb-archetype-tag">✦ ${esc(tag)}</span>`).join('')}
                </div>` : ''}
              ${enemyChips.length ? `
                <div class="fb-enemy-strip">
                  ${enemyChips.map((enemy) => `
                    <div class="fb-enemy-chip">
                      <img class="fb-enemy-avatar" src="${esc(enemy.icon)}" alt="${esc(enemy.name)}" loading="eager" decoding="async" />
                      <div class="fb-enemy-meta">
                        <span class="fb-enemy-name">${esc(enemy.name)}</span>
                        ${enemy.hp ? `<span class="fb-enemy-hp">${esc(enemy.hp)}</span>` : ''}
                      </div>
                    </div>`).join('')}
                </div>` : ''}
              <div class="boss-quick-glance">
                ${state.fbGroup === 'zero' ? `<button type="button" class="resonance-tag" data-action="fb-resonance" aria-pressed="${resonanceOnly}">✦ ${esc(t('res10Filter', {}, lang))}</button>` : ''}
                ${stageMech ? `<button type="button" class="mech-toggle-btn ${state.fbMechOpen ? 'active' : ''}" data-action="toggle-fb-mech" aria-expanded="${state.fbMechOpen}">${esc(state.fbMechOpen ? t('btnCollapseStageMech', {}, lang) : t('btnExpandStageMech', {}, lang))}</button>` : ''}
                ${stageWikiUrl ? `<a class="text-link-btn" href="${esc(stageWikiUrl)}" target="_blank" rel="noopener noreferrer">${esc(t('stageWikiLink', {}, lang))}</a>` : ''}
                ${state.fbCarry ? `<span class="glance-active-chip">${esc(state.fbRoleMode === 'carry' ? t('mainDpsLabel', {}, lang) : t('roleAnyMember', {}, lang))}: ${esc(charLabelByKey.get(state.fbCarry) || '')}</span>` : ''}
                ${state.fbAfflatus ? `<span class="glance-active-chip">${esc(localizeAfflatus(state.fbAfflatus, lang))}</span>` : ''}
                ${hasFilter ? `<button type="button" class="glance-clear-btn" data-action="reset-fb-filter">✕ ${esc(t('clearFilter', {}, lang))}</button>` : ''}
              </div>
            </div>
            <div class="boss-peak-widget">
              <div class="boss-peak-eyebrow">
                <span>${esc(t('metricFastest', {}, lang))}</span>
                <span class="boss-peak-count">${esc(boardCountText)}</span>
              </div>
              ${stageFastest
                ? `<div class="peak-score-ticket">
                     <div class="peak-score-text">
                       <span class="peak-label is-player-name">${esc(stageFastest.display_name)}</span>
                       <span class="score-value">${esc(formatRounds(stageFastest.rounds, lang))}</span>
                     </div>
                   </div>`
                : `<div class="peak-score-ticket"><div class="peak-score-text"><span class="peak-label">${esc(t('emptyTitleEmpty', {}, lang))}</span><span class="score-value">—</span></div></div>`
              }
              <div class="boss-peak-actions">
                ${state.connected && stage ? `<button type="button" class="paper-btn boss-submit-btn" data-action="open-submit">${esc(t('submitThisStage', {}, lang))}</button>` : ''}
              </div>
            </div>
          </div>

          ${renderFlashbackStageMechanicsDrawer(stageMech, lang)}

          ${renderBoardIntelBar('flashback', ranked, stageAllGroupRecords, lang)}

          ${filteredRows.length
            ? `<div class="rank-list">
                 <div class="rank-list-head">
                   <span>${esc(t('colRank', {}, lang))}</span><span>${esc(t('colPlayerTime', {}, lang))}</span><span>${esc(t('colLineup', {}, lang))}</span><span>${esc(t('colArchetype', {}, lang))}</span><span class="col-right">${esc(t('colRounds', {}, lang))}</span>
                 </div>
                 ${rowsHtml}
               </div>`
            : (archives.length ? '' : `<div class="empty-state">
                 <span class="empty-glyph">✧</span>
                 <h3>${esc(state.loading ? t('emptyTitleLoading', {}, lang) : (hasFilter ? t('emptyTitleFiltered', {}, lang) : t('emptyTitleEmpty', {}, lang)))}</h3>
                 <p>${esc(state.loading ? t('statusSyncing', {}, lang) : (hasFilter ? t('emptyDescFiltered', {}, lang) : t('emptyDescFb', {}, lang)))}</p>
                 ${hasFilter ? `<button type="button" class="outline-btn" data-action="reset-fb-filter">${esc(t('clearFilter', {}, lang))}</button>` : (state.connected ? `<button type="button" class="copper-btn" data-action="open-submit">${esc(t('emptyActionSubmit', {}, lang))}</button>` : '')}
               </div>`)
          }
          ${archiveHtml}
          <div class="board-foot">
            <span>${esc(t('boardFootFb', {}, lang))}</span>
            <button type="button" class="text-link-btn" data-action="refresh">${esc(t('btnRefresh', {}, lang))}</button>
          </div>
        </section>

        <div class="two-cards">
          <article class="rule-card">
            <span class="rule-num">01</span>
            <h3>${esc(t('fbRuleCard1Title', {}, lang))}</h3>
            <p>${esc(t('fbRuleCard1Desc', {}, lang))}</p>
          </article>
          <article class="rule-card">
            <span class="rule-num">02</span>
            <h3>${esc(t('fbRuleCard2Title', {}, lang))}</h3>
            <p>${esc(t('fbRuleCard2Desc', {}, lang))}</p>
          </article>
        </div>
      </div>
    </div>`;
}

function renderFlashbackCarries() {
  const lang = getLang();
  const locale = isEn(lang) ? 'en' : 'zh-CN';
  const scopes = {
    period: t('carryScopePeriod', {}, lang),
    all: t('carryScopeAll', {}, lang)
  };
  const metrics = {
    appearance_count: t('carryMetricAppearances', {}, lang),
    challenge_count: L('Stages Cleared', '通关关卡数', lang)
  };
  const versionId = state.fbCarryScope === 'period' ? state.fbVersionId : null;
  const ver = state.fbVersions.find((v) => v.id === versionId);
  const primary = state.fbCarryMetric;
  const secondary = primary === 'appearance_count' ? 'challenge_count' : 'appearance_count';

  const maxChallenges = versionId
    ? standardStages(versionId).length
    : new Set(state.fbStages.map((s) => s.challenge_id)).size;
  const stages = new Map(state.fbStages.map((stage) => [stage.id, stage]));
  const winningLineups = new Map();
  for (const record of state.fbRecords) {
    if (versionId && record.version_id !== versionId) continue;
    const challenge = stages.get(record.stage_id)?.challenge_id || record.stage_id;
    const lineup = JSON.stringify([challenge, record.group_code, record.team_key || canonicalTeam(record.team)]);
    for (const name of splitCarries(record.carry_name)) {
      const key = canonicalCharacterKey(name);
      if (!winningLineups.has(key)) winningLineups.set(key, new Set());
      winningLineups.get(key).add(lineup);
    }
  }

  const merged = new Map();
  for (const row of state.fbCarries) {
    if (row.version_id !== versionId) continue;
    const key = canonicalCharacterKey(row.carry_name);
    const displayName = displayCharacterName(row.carry_name, lang);
    const canonCn = canonicalDisplayName(row.carry_name);
    const prev = merged.get(key);
    if (!prev) {
      merged.set(key, {
        carry_key: key,
        carry_name: displayName,
        carry_cn: canonCn,
        appearance_count: winningLineups.get(key)?.size || 0,
        challenge_count: Number(row.challenge_count || 0)
      });
    } else {
      prev.challenge_count = Math.min(maxChallenges || 999, Math.max(prev.challenge_count, Number(row.challenge_count || 0)));
    }
  }

  const rows = [...merged.values()]
    .filter((row) => row[primary] > 0)
    .sort((a, b) =>
      (b[primary] - a[primary]) ||
      (b[secondary] - a[secondary]) ||
      String(a.carry_name).localeCompare(String(b.carry_name), locale)
    );

  return `
    <div class="section-bar">
      <div class="section-tabs">
        ${Object.entries(scopes).map(([k, lbl]) =>
          `<button type="button" class="section-tab-btn ${k === state.fbCarryScope ? 'active' : ''}" data-fb-carry-scope="${k}">${esc(lbl)}</button>`
        ).join('')}
      </div>
      <div class="section-tabs">
        ${Object.entries(metrics).map(([k, lbl]) =>
          `<button type="button" class="outline-btn ${k === primary ? 'selected' : ''}" data-fb-carry-metric="${k}">${esc(lbl)}</button>`
        ).join('')}
      </div>
    </div>

    <div class="board-panel">
      <div class="board-header">
        <div class="board-title-stack">
          <div class="board-survey-tag"><span>${esc(L('CARRY RANKING · MAIN DPS METRICS', 'CARRY RANKING · 主 C 登场统计', lang))}</span></div>
          <div class="boss-headline-wrap">
            <h2>${esc(t('carriesPageTitle', {}, lang))}</h2>
            <span class="boss-en-sub">Top Arcanist Carries</span>
          </div>
          <div class="paper-tag-row">
            <span class="paper-tag dark">${esc(state.fbCarryScope === 'all' ? t('carryScopeAll', {}, lang) : (ver ? localizeVersionLabel(ver, lang) : t('carryScopePeriod', {}, lang)))}</span>
          </div>
        </div>
        <span class="count-tag">${esc(formatEntries(rows.length, lang))}</span>
      </div>
      ${rows.length
        ? `<div class="table-scroll">
            <table class="archive-table table-fb-carries">
              <thead><tr><th style="width:76px">${esc(t('colRank', {}, lang))}</th><th>${esc(t('mainDpsLabel', {}, lang))}</th><th class="num-col">${esc(metrics[primary])}</th><th class="num-col">${esc(metrics[secondary])}</th></tr></thead>
              <tbody>
                ${rows.map((row, idx) => `
                    <tr>
                      <td class="cell-rank">${renderRankBadge(idx + 1, lang)}</td>
                      <td class="cell-entity">
                        <div style="display:flex;align-items:center;gap:6px">
                          <span data-open-char="${esc(row.carry_cn)}" role="button" tabindex="0" style="cursor:pointer;display:inline-flex" title="${esc(row.carry_name)}">${renderCarryAvatarHtml(row.carry_cn, lang)}</span>
                          <button type="button" class="entity-jump-btn" data-jump-fb-carry="${esc(row.carry_key)}" data-jump-carry-name="${esc(row.carry_name)}" title="${esc(row.carry_name)}">
                            <span style="min-width:0">
                              <strong style="font-family:var(--font-serif);font-size:15px">${esc(row.carry_name)}</strong>
                            </span>
                            <span class="entity-jump-arrow" aria-hidden="true">↗</span>
                          </button>
                        </div>
                      </td>
                      <td class="num-col cell-primary" data-label="${esc(metrics[primary])}"><span class="score-value">${row[primary]}</span></td>
                      <td class="num-col cell-secondary" data-label="${esc(metrics[secondary])}" style="color:var(--linen)">${row[secondary]}</td>
                    </tr>`).join('')}
              </tbody>
            </table>
          </div>`
        : `<div class="empty-state"><span class="empty-glyph">◇</span><h3>${esc(t('emptyTitleEmpty', {}, lang))}</h3></div>`
      }
      <div class="board-foot"><span>${esc(t('carriesPageSub', {}, lang))}</span></div>
    </div>`;
}

function buildMergedFlashbackPlayers(versionId = state.fbVersionId) {
  const stageById = new Map(state.fbStages.map((s) => [s.id, s]));
  const byName = new Map();

  for (const rec of state.fbRecords) {
    const rawName = String(rec.display_name || '').trim();
    const nameKey = normKey(rawName);
    if (!nameKey) continue;

    let entry = byName.get(nameKey);
    if (!entry) {
      entry = {
        key: nameKey,
        display_name: rawName,
        latestAt: rec.created_at || '',
        periodKeys: new Set(),
        allTimeKeys: new Set()
      };
      byName.set(nameKey, entry);
    } else if (rec.created_at && (!entry.latestAt || String(rec.created_at) > String(entry.latestAt))) {
      entry.display_name = rawName;
      entry.latestAt = rec.created_at;
    }

    const stage = stageById.get(rec.stage_id);
    const recVersionId = rec.version_id || stage?.version_id || null;
    const challenge = stage?.challenge_id || rec.stage_id;
    const teamKey = rec.team_key || canonicalTeam(rec.team || []);

    entry.allTimeKeys.add(JSON.stringify([challenge, rec.group_code, teamKey]));
    if (versionId && recVersionId === versionId) {
      entry.periodKeys.add(JSON.stringify([rec.stage_id, rec.group_code, teamKey]));
    }
  }

  // Fallback for view-only players not present in active records, merged by display name
  const fallbackByName = new Map();
  for (const p of state.fbPlayers) {
    const rawName = String(p.display_name || '').trim();
    const nameKey = normKey(rawName);
    if (!nameKey || byName.has(nameKey)) continue;

    let entry = fallbackByName.get(nameKey);
    if (!entry) {
      entry = { key: nameKey, display_name: rawName, periodCount: 0, appearance_count: 0 };
      fallbackByName.set(nameKey, entry);
    }
    const count = Number(p.appearance_count || 0);
    if (p.version_id === null) entry.appearance_count += count;
    else if (versionId && p.version_id === versionId) entry.periodCount += count;
  }

  return [
    ...[...byName.values()].map((entry) => ({
      key: entry.key,
      display_name: entry.display_name,
      periodCount: entry.periodKeys.size,
      appearance_count: entry.allTimeKeys.size
    })),
    ...[...fallbackByName.values()].filter((entry) => entry.appearance_count > 0 || entry.periodCount > 0)
  ];
}

function renderFlashbackPlayers() {
  const lang = getLang();
  const locale = isEn(lang) ? 'en' : 'zh-CN';
  const version = state.fbVersions.find((v) => v.id === state.fbVersionId);

  // Aggregate Flashback crowns, podiums & favorite carries per player
  const fbMetaByPlayer = new Map();
  const fbBoards = new Map();
  for (const rec of state.fbRecords) {
    const gk = `${rec.stage_id}::${rec.group_code}`;
    if (!fbBoards.has(gk)) fbBoards.set(gk, []);
    fbBoards.get(gk).push(rec);
  }
  for (const list of fbBoards.values()) {
    list.sort(compareFlashbackRecord);
    list.forEach((rec, idx) => {
      const k = normKey(rec.display_name);
      if (!k) return;
      let m = fbMetaByPlayer.get(k);
      if (!m) {
        m = { crowns: 0, podiums: 0, carries: new Map() };
        fbMetaByPlayer.set(k, m);
      }
      if (idx === 0) m.crowns += 1;
      if (idx < 3) m.podiums += 1;
      for (const rawC of splitCarries(rec.carry_name)) {
        const ch = resolveCharacter(rawC);
        if (!ch) continue;
        const cur = m.carries.get(ch.id);
        if (cur) cur.count += 1;
        else m.carries.set(ch.id, { char: ch, count: 1 });
      }
    });
  }

  const rows = buildMergedFlashbackPlayers(state.fbVersionId)
    .map((p) => {
      const m = fbMetaByPlayer.get(p.key);
      return {
        ...p,
        crowns: m?.crowns || 0,
        podiums: m?.podiums || 0,
        favChars: m ? [...m.carries.values()].sort((a, b) => b.count - a.count).slice(0, 3) : []
      };
    })
    .sort((a, b) => (b.periodCount - a.periodCount) || (b.appearance_count - a.appearance_count) ||
      String(a.display_name).localeCompare(String(b.display_name), locale));

  return `
    <div class="section-bar">
      <div class="fb-version-picker">
        <label for="fbVersionSelect" class="fb-version-label">${esc(t('versionSelectLabel', {}, lang))}</label>
        <select id="fbVersionSelect" class="filter-select fb-version-select">
          ${optionsHtml(state.fbVersions.map((v) => [v.id, localizeVersionLabel(v, lang)]), state.fbVersionId)}
        </select>
      </div>
    </div>
    <div class="board-panel">
      <div class="board-header">
        <div class="board-title-stack">
          <div class="board-survey-tag"><span>HALL OF FAME</span></div>
          <div class="boss-headline-wrap">
            <h2>${esc(t('playersFbTitle', {}, lang))}</h2>
            <span class="boss-en-sub">All-Time Honors</span>
          </div>
          <div class="paper-tag-row">
            <span class="paper-tag dark">${esc(version ? localizeVersionLabel(version, lang) : t('fbCycleFallback', {}, lang))}</span>
          </div>
        </div>
        <span class="count-tag">${esc(formatEntries(rows.length, lang))}</span>
      </div>
      ${rows.length
        ? `<div class="table-scroll">
            <table class="archive-table table-fb-players">
              <thead><tr><th style="width:76px">${esc(t('colRank', {}, lang))}</th><th>${esc(L('Timekeeper', '玩家昵称', lang))}</th><th class="num-col">${esc(t('playersPeriodHoldings', {}, lang))}</th><th class="num-col">${esc(t('playersAllTimeHoldings', {}, lang))}</th></tr></thead>
              <tbody>
                ${rows.map((p, idx) => `
                  <tr>
                    <td class="cell-rank">${renderRankBadge(idx + 1, lang)}</td>
                    <td class="cell-entity">
                      <div style="display:flex;flex-direction:column;gap:4px">
                        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
                          <span class="player-name is-clickable is-player-name" data-open-player="${esc(p.display_name)}" role="button" tabindex="0">${esc(p.display_name)}</span>
                          <button type="button" class="text-link-btn" data-jump-fb-player="${esc(p.display_name)}">${esc(t('totalsWatchMap', {}, lang))}</button>
                        </div>
                        ${(p.crowns || p.podiums) ? `
                          <div class="hof-medals">
                            ${p.crowns ? `<span class="hof-crown-pill">♛ ${esc(t('hofCrownsLabel', {}, lang))} ×${p.crowns}</span>` : ''}
                            ${p.podiums ? `<span class="honor-chip bronze">${esc(t('hofPodiumsLabel', {}, lang))} ×${p.podiums}</span>` : ''}
                          </div>` : ''}
                        ${p.favChars.length ? `
                          <div class="hof-fav-chars">
                            ${p.favChars.map(({ char }) => {
                              const cDisp = displayCharacterName(char.name, lang);
                              return char.portrait
                                ? `<img src="${esc(char.portrait)}" alt="${esc(cDisp)}" title="${esc(cDisp)}" data-open-char="${esc(char.name)}" role="button" tabindex="0" style="cursor:pointer" loading="lazy" decoding="async" />`
                                : '';
                            }).join('')}
                          </div>` : ''}
                      </div>
                    </td>
                    <td class="num-col cell-primary" data-label="${esc(t('playersPeriodHoldings', {}, lang))}"><span class="score-value">${p.periodCount}</span></td>
                    <td class="num-col cell-secondary" data-label="${esc(t('playersAllTimeHoldings', {}, lang))}" style="color:var(--linen)">${p.appearance_count}</td>
                  </tr>`).join('')}
              </tbody>
            </table>
          </div>`
        : `<div class="empty-state"><span class="empty-glyph">♙</span><h3>${esc(t('playersEmpty', {}, lang))}</h3></div>`
      }
      <div class="board-foot"><span>${esc(t('playersFbFoot', {}, lang))}</span></div>
    </div>
    <div class="two-cards">
      <article class="rule-card">
        <span class="rule-num">∞</span>
        <h3>${esc(t('fbRuleCard1Title', {}, lang))}</h3>
        <p>${esc(t('fbRuleCard1Desc', {}, lang))}</p>
      </article>
      <article class="rule-card">
        <span class="rule-num">✦</span>
        <h3>${esc(t('fbRuleCard2Title', {}, lang))}</h3>
        <p>${esc(t('fbRuleCard2Desc', {}, lang))}</p>
      </article>
    </div>`;
}

function renderFlashbackRules() {
  const lang = getLang();
  const items = t('rulesFbItems', {}, lang) || [];
  return `
    ${renderGlobalServerNoticeHtml('fb-board', lang)}
    <div class="rules-grid">
      ${items.map(([num, title, desc]) => `
        <article class="rule-card">
          <span class="rule-num">${esc(num)}</span>
          <h3>${esc(title)}</h3>
          <p>${esc(desc)}</p>
        </article>`).join('')}
    </div>
    <div class="sidebar-note" style="margin-top:16px">
      ${esc(t('rulesFbNote', {}, lang))}
    </div>`;
}

/* ==================== Record Archive Card Modal & Bilingual Canvas PNG Export ==================== */
function loadCanvasImg(src) {
  if (!src) return Promise.resolve(null);
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function drawCoverImage(ctx, img, dx, dy, dw, dh, alignY = 0.08) {
  const ir = img.naturalWidth / img.naturalHeight;
  const dr = dw / dh;
  let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
  if (ir > dr) {
    sw = img.naturalHeight * dr;
    sx = (img.naturalWidth - sw) * 0.5;
  } else {
    sh = img.naturalWidth / dr;
    sy = (img.naturalHeight - sh) * alignY;
  }
  ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
}

function fitCanvasFont(ctx, text, maxWidth, startPx, minPx, weight, family) {
  let size = startPx;
  while (size > minPx) {
    ctx.font = `${weight} ${size}px ${family}`;
    if (ctx.measureText(text).width <= maxWidth) break;
    size -= 2;
  }
  ctx.font = `${weight} ${size}px ${family}`;
  return size;
}

async function exportPosterPng(item) {
  const lang = getLang();
  const en = isEn(lang);
  const obsidian = state.posterTheme === 'obsidian';
  try {
    if (document.fonts?.ready) await document.fonts.ready;
  } catch {}

  const psychubes = item.psychubes || [];
  const resonanceCodes = item.resonanceCodes || [];
  const hasPsychubes = psychubes.some(Boolean);
  const hasResonance = resonanceCodes.some(Boolean);
  const W = 1200;
  const H = hasPsychubes ? (hasResonance ? 806 : 770) : (hasResonance ? 726 : 684);
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  const isMane = item.mode === 'mane';
  const serifFont = en
    ? '"UTTU Regular", "Playfair Display", Georgia, serif'
    : '"Noto Serif SC", "UTTU Regular", "Songti SC", "Microsoft YaHei", serif';
  const displayFont = en
    ? '"Cinzel Decorative", "UTTU Regular", Georgia, serif'
    : '"Cinzel Decorative", "Noto Serif SC", Georgia, serif';
  const monoFont = '"UTTU Typewriter", "Courier New", monospace';

  // Theme Palette (Parchment vs. Obsidian Gold)
  const pal = obsidian
    ? {
        bg0: '#211914',
        bg1: '#15100d',
        bg2: '#0e0b09',
        fadeSolid: '#1b1410',
        fadeMid: 'rgba(27,20,16,0.35)',
        fadeEnd: 'rgba(27,20,16,0)',
        wmAlpha: 0.2,
        frameOuter: '#c89b54',
        frameInner: 'rgba(229, 186, 115, 0.34)',
        stripe: isMane ? '#df6931' : '#e5ba73',
        kicker: '#e5ba73',
        title: '#fbf4e8',
        bossSub: '#d8a66a',
        sub: '#c5b7a3',
        rankNum: isMane ? '#f4b068' : '#f6cc78',
        rankLabel: '#bfa98a',
        divider: 'rgba(229, 186, 115, 0.32)',
        labelMuted: '#b9a68c',
        player: '#faf2e4',
        carry: '#d2c2ac',
        score: isMane ? '#f4b068' : '#f6cc78',
        psyTitle: '#f5ebdc',
        psySub: '#b8a892',
        resBg: 'rgba(255, 245, 228, 0.08)',
        resBorder: 'rgba(229, 186, 115, 0.34)',
        resText: '#f3dfba',
        cardBorder: '#9b7b4c',
        cardCarryBorder: '#f0a056',
        legacyBorder: 'rgba(229, 186, 115, 0.5)',
        legacyText: '#efe2ce',
        footLine: 'rgba(229, 186, 115, 0.28)',
        footText: '#bda98e'
      }
    : {
        bg0: '#f3eadb',
        bg1: '#e2d4be',
        bg2: '#d3c0a6',
        fadeSolid: '#efe5d6',
        fadeMid: 'rgba(239,229,214,0.2)',
        fadeEnd: 'rgba(239,229,214,0)',
        wmAlpha: 0.14,
        frameOuter: '#8a5636',
        frameInner: 'rgba(138, 86, 54, 0.35)',
        stripe: isMane ? '#a83328' : '#b2863e',
        kicker: isMane ? '#8c3426' : '#7b5b25',
        title: '#1b120d',
        bossSub: '#9c4e2e',
        sub: '#5c4738',
        rankNum: isMane ? '#b93a2b' : '#8d6423',
        rankLabel: '#6b5241',
        divider: 'rgba(90, 56, 36, 0.32)',
        labelMuted: '#6b5241',
        player: '#1c120d',
        carry: '#5a4334',
        score: isMane ? '#9c3d22' : '#8b5e1d',
        psyTitle: '#2a1d15',
        psySub: '#6b5241',
        resBg: 'rgba(255, 252, 245, 0.65)',
        resBorder: 'rgba(112, 74, 46, 0.38)',
        resText: '#2f2017',
        cardBorder: '#7c5238',
        cardCarryBorder: '#df6931',
        legacyBorder: 'rgba(138, 86, 54, 0.55)',
        legacyText: '#3c2b21',
        footLine: 'rgba(90, 56, 36, 0.3)',
        footText: '#6b5241'
      };

  // 1. Background Gradient
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, pal.bg0);
  bg.addColorStop(0.55, pal.bg1);
  bg.addColorStop(1, pal.bg2);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // 2. Boss / Stage Watermark
  if (item.bossThumb) {
    const bossImg = await loadCanvasImg(item.bossThumb);
    if (bossImg) {
      ctx.save();
      ctx.globalAlpha = pal.wmAlpha;
      drawCoverImage(ctx, bossImg, W * 0.44, 0, W * 0.56, 280, 0.22);
      const fade = ctx.createLinearGradient(W * 0.44, 0, W, 0);
      fade.addColorStop(0, pal.fadeSolid);
      fade.addColorStop(0.45, pal.fadeMid);
      fade.addColorStop(1, pal.fadeEnd);
      ctx.globalAlpha = 1;
      ctx.fillStyle = fade;
      ctx.fillRect(W * 0.44, 0, W * 0.56, 280);
      ctx.restore();
    }
  }

  // 3. Double Hairline Frame & Accent Stripe
  ctx.strokeStyle = pal.frameOuter;
  ctx.lineWidth = 4;
  ctx.strokeRect(16, 16, W - 32, H - 32);
  ctx.strokeStyle = pal.frameInner;
  ctx.lineWidth = 1.5;
  ctx.strokeRect(26, 26, W - 52, H - 52);

  ctx.fillStyle = pal.stripe;
  ctx.fillRect(16, 16, 10, H - 32);

  // 4. Masthead Header
  ctx.fillStyle = pal.kicker;
  ctx.font = `600 15px ${displayFont}`;
  ctx.fillText(isMane ? t('posterKickerMane', {}, lang) : t('posterKickerFb', {}, lang), 58, 70);

  const titleText = item.title || '';
  const maxTitleW = W - 270;
  ctx.fillStyle = pal.title;
  fitCanvasFont(ctx, titleText, maxTitleW, 40, 24, '700', serifFont);
  ctx.fillText(titleText, 58, 122, maxTitleW);

  if (item.bossEn && !en) {
    const titleW = Math.min(ctx.measureText(titleText).width, maxTitleW);
    const subStartX = 58 + titleW + 16;
    const availW = (W - 210) - subStartX;
    if (availW > 120) {
      ctx.fillStyle = pal.bossSub;
      ctx.font = `italic 500 20px ${serifFont}`;
      ctx.fillText(item.bossEn, subStartX, 120, availW);
    }
  }

  ctx.fillStyle = pal.sub;
  ctx.font = `500 16px ${serifFont}`;
  const subText = item.subtitle || '';
  ctx.fillText(subText, 58, 156, W - 260);
  if (!isMane && item.resonanceTen) {
    const subW = Math.min(ctx.measureText(subText).width, W - 460);
    const tagText = t('posterRes10Badge', {}, lang);
    ctx.font = `700 12px ${serifFont}`;
    const tagW = ctx.measureText(tagText).width + 18;
    const tagX = 58 + subW + 14;
    const tagY = 138;
    ctx.fillStyle = '#3d2c1b';
    ctx.fillRect(tagX, tagY, tagW, 24);
    ctx.strokeStyle = '#8d6423';
    ctx.lineWidth = 1;
    ctx.strokeRect(tagX, tagY, tagW, 24);
    ctx.fillStyle = '#f8db9e';
    ctx.fillText(tagText, tagX + 9, 155);
  }

  // Right Rank Stamp
  ctx.textAlign = 'right';
  ctx.fillStyle = pal.rankNum;
  ctx.font = `700 52px ${displayFont}`;
  ctx.fillText(item.rank > 0 ? `#${String(item.rank).padStart(2, '0')}` : t('posterDailyLabel', {}, lang), W - 58, 122);
  ctx.fillStyle = pal.rankLabel;
  ctx.font = `600 13px ${displayFont}`;
  ctx.fillText(item.rank > 0 ? t('posterRankLabel', {}, lang) : t('posterDailyLabel', {}, lang), W - 58, 150);
  ctx.textAlign = 'left';

  // Divider
  ctx.strokeStyle = pal.divider;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(58, 180);
  ctx.lineTo(W - 58, 180);
  ctx.stroke();

  // 5. Investigator & Result
  ctx.fillStyle = pal.labelMuted;
  ctx.font = `600 13px ${displayFont}`;
  ctx.fillText(t('posterInvestigator', {}, lang), 58, 216);

  ctx.fillStyle = pal.player;
  fitCanvasFont(ctx, item.player || '', 560, 30, 20, '700', serifFont);
  ctx.fillText(item.player || '', 58, 256, 560);

  ctx.fillStyle = pal.carry;
  ctx.font = `500 17px ${serifFont}`;
  ctx.fillText(`${t('mainDpsLabel', {}, lang)}: ${item.carry || ''}`, 58, 288, 600);

  if (isMane) {
    const grade = resolveManeGrade(item.score, lang);
    const gradeImg = grade.img ? await loadCanvasImg(grade.img) : null;
    const scoreRight = gradeImg ? W - 144 : W - 58;
    ctx.textAlign = 'right';
    ctx.fillStyle = pal.labelMuted;
    ctx.font = `600 13px ${serifFont}`;
    ctx.fillText(t('scoreLabel', {}, lang), scoreRight, 216);
    ctx.fillStyle = pal.score;
    ctx.font = `700 42px ${displayFont}`;
    ctx.fillText(formatScore(item.score, lang), scoreRight, 266);
    ctx.textAlign = 'left';
    if (gradeImg) {
      ctx.drawImage(gradeImg, W - 130, 202, 72, 72);
    }
  } else {
    ctx.textAlign = 'right';
    ctx.fillStyle = pal.labelMuted;
    ctx.font = `600 13px ${serifFont}`;
    ctx.fillText(t('colRounds', {}, lang), W - 58, 216);
    ctx.fillStyle = pal.score;
    ctx.font = `700 42px ${serifFont}`;
    ctx.fillText(formatRounds(item.rounds, lang), W - 58, 266);
    ctx.textAlign = 'left';
  }

  // 6. Deployed Squad Portrait Cards, Docked Psychubes & Non-Empty Resonance Codes
  const parsedSlots = parseLineupSlots(item.team, item.rawCarry || item.carry);
  if (parsedSlots.length === 1 && parsedSlots[0].type === 'legacy') {
    ctx.save();
    ctx.strokeStyle = pal.legacyBorder;
    ctx.setLineDash([6, 4]);
    ctx.strokeRect(58, 342, W - 116, 110);
    ctx.fillStyle = pal.legacyText;
    ctx.font = `600 22px ${serifFont}`;
    ctx.fillText(`${t('legacyTeamLabel', {}, lang)}: ${parsedSlots[0].raw}`, 82, 406, W - 160);
    ctx.restore();
  } else if (parsedSlots.length) {
    const carrySet = new Set(splitCarries(item.rawCarry || item.carry).map(canonicalCharacterKey));
    const cardW = 248;
    const cardH = 262;
    const gap = 30;
    const startX = 58;
    const startY = 320;
    const cardBaseImg = await loadCanvasImg('./assets/uttu/bg_kapaidi.png');
    const mainTag = en ? 'MAIN' : '主C';

    for (let i = 0; i < Math.min(4, parsedSlots.length); i++) {
      const slot = parsedSlots[i];
      const x = startX + i * (cardW + gap);
      const y = startY;

      ctx.save();
      ctx.fillStyle = '#1b1614';
      ctx.fillRect(x, y, cardW, cardH);

      if (slot.type === 'flex') {
        const fmt = formatFlexSlot(slot, lang);
        const pics = slot.chars.slice(0, 4);
        if (pics.length <= 2) {
          const halfW = cardW / pics.length;
          for (let j = 0; j < pics.length; j++) {
            const pImg = await loadCanvasImg(pics[j].portrait);
            if (pImg) drawCoverImage(ctx, pImg, x + j * halfW, y, halfW, cardH, 0.08);
          }
        } else {
          const hw = cardW / 2;
          const hh = cardH / 2;
          for (let j = 0; j < pics.length; j++) {
            const pImg = await loadCanvasImg(pics[j].portrait);
            if (pImg) drawCoverImage(ctx, pImg, x + (j % 2) * hw, y + Math.floor(j / 2) * hh, hw, hh, 0.08);
          }
        }
        const grad = ctx.createLinearGradient(0, y + cardH - 86, 0, y + cardH);
        grad.addColorStop(0, 'rgba(10,8,7,0)');
        grad.addColorStop(1, 'rgba(10,8,7,0.9)');
        ctx.fillStyle = grad;
        ctx.fillRect(x, y + cardH - 86, cardW, 86);
        ctx.fillStyle = 'rgba(28, 22, 18, 0.88)';
        ctx.fillRect(x + cardW - 72, y + 8, 64, 22);
        ctx.fillStyle = '#f3d191';
        ctx.font = `700 11px ${serifFont}`;
        ctx.textAlign = 'center';
        ctx.fillText(fmt.tag, x + cardW - 40, y + 23, 60);
        ctx.fillStyle = '#fffdf9';
        ctx.font = `600 16px ${serifFont}`;
        ctx.fillText(fmt.label, x + cardW / 2, y + cardH - 14, cardW - 14);
        ctx.textAlign = 'left';
        ctx.strokeStyle = pal.cardBorder;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(x, y, cardW, cardH);
      } else if (slot.type === 'wild') {
        const fmt = formatWildSlot(slot, lang);
        if (cardBaseImg) {
          ctx.globalAlpha = 0.55;
          drawCoverImage(ctx, cardBaseImg, x, y, cardW, cardH, 0.5);
          ctx.globalAlpha = 1;
        }
        ctx.fillStyle = '#d9b086';
        ctx.font = `700 34px ${serifFont}`;
        ctx.textAlign = 'center';
        ctx.fillText('✦', x + cardW / 2, y + cardH / 2 - 6);
        ctx.fillStyle = '#b9a693';
        ctx.font = `600 14px ${serifFont}`;
        ctx.fillText(fmt.sub, x + cardW / 2, y + cardH / 2 + 24);
        ctx.fillStyle = '#fffdf9';
        ctx.font = `600 16px ${serifFont}`;
        ctx.fillText(fmt.label, x + cardW / 2, y + cardH - 14, cardW - 14);
        ctx.textAlign = 'left';
        ctx.strokeStyle = pal.cardBorder;
        ctx.setLineDash([5, 4]);
        ctx.lineWidth = 1.5;
        ctx.strokeRect(x, y, cardW, cardH);
        ctx.setLineDash([]);
      } else {
        const rawName = slot.raw || '';
        const char = slot.char || resolveCharacter(rawName);
        const displayName = char ? displayCharacterName(char.name, lang) : displayCharacterName(rawName, lang);
        const affKey = char?.aff || resolveAfflatus(rawName);
        const aff = AFFLATUS_META[affKey] || AFFLATUS_META.unknown;
        const isCarry = carrySet.has(char ? `char:${char.id}` : canonicalCharacterKey(rawName));

        if (cardBaseImg) {
          ctx.globalAlpha = 0.72;
          drawCoverImage(ctx, cardBaseImg, x, y, cardW, cardH, 0.5);
          ctx.globalAlpha = 1;
        }

        if (char?.portrait) {
          const pic = await loadCanvasImg(char.portrait);
          if (pic) {
            drawCoverImage(ctx, pic, x, y, cardW, cardH, 0.06);
          }
        } else {
          ctx.fillStyle = 'rgba(237,228,215,0.45)';
          ctx.font = `700 32px ${serifFont}`;
          ctx.textAlign = 'center';
          ctx.fillText(characterMonogram(displayName), x + cardW / 2, y + cardH / 2);
          ctx.textAlign = 'left';
        }

        const rarImg = await loadCanvasImg(rarityOverlaySrc(char?.star || 6));
        if (rarImg) {
          const rarH = cardW * (rarImg.naturalHeight / rarImg.naturalWidth);
          ctx.drawImage(rarImg, x - 4, y + cardH - rarH + 4, cardW + 8, rarH);
        }

        const grad = ctx.createLinearGradient(0, y + cardH - 86, 0, y + cardH);
        grad.addColorStop(0, 'rgba(10,8,7,0)');
        grad.addColorStop(1, 'rgba(10,8,7,0.9)');
        ctx.fillStyle = grad;
        ctx.fillRect(x, y + cardH - 86, cardW, 86);

        if (aff.icon) {
          const affImg = await loadCanvasImg(aff.icon);
          if (affImg) {
            const aw = 30;
            const ah = aw * (affImg.naturalHeight / affImg.naturalWidth);
            ctx.drawImage(affImg, x + 8, y, aw, ah);
          }
        }

        if (isCarry) {
          ctx.fillStyle = isMane ? '#a83328' : '#d4a85a';
          ctx.fillRect(x + cardW - 56, y + 8, 48, 22);
          ctx.fillStyle = isMane ? '#fff6ee' : '#18130d';
          ctx.font = `700 12px ${displayFont}`;
          ctx.textAlign = 'center';
          ctx.fillText(mainTag, x + cardW - 32, y + 23);
          ctx.textAlign = 'left';
        }

        ctx.fillStyle = '#fffdf9';
        fitCanvasFont(ctx, displayName, cardW - 18, 17, 13, '600', serifFont);
        ctx.textAlign = 'center';
        ctx.fillText(displayName, x + cardW / 2, y + cardH - 14, cardW - 16);
        ctx.textAlign = 'left';

        ctx.strokeStyle = isCarry ? pal.cardCarryBorder : pal.cardBorder;
        ctx.lineWidth = isCarry ? 3 : 1.5;
        ctx.strokeRect(x, y, cardW, cardH);
      }

      let nextY = y + cardH + 12;
      if (hasPsychubes && psychubes[i]) {
        const psy = resolvePsychube(psychubes[i]);
        const pBox = 50;
        if (psy) {
          const pBg = await loadCanvasImg(psychubeFrameSrc(psy.star));
          const pIcon = await loadCanvasImg(psychubeIconSrc(psy.id));
          if (pBg) ctx.drawImage(pBg, x, nextY, pBox, pBox);
          if (pIcon) ctx.drawImage(pIcon, x, nextY, pBox, pBox);
          ctx.strokeStyle = pal.frameOuter;
          ctx.lineWidth = 1;
          ctx.strokeRect(x, nextY, pBox, pBox);
        }
        const psyTitle = displayPsychubeName(psy || psychubes[i], lang);
        const tx = psy ? x + pBox + 10 : x;
        const maxTw = psy ? cardW - pBox - 10 : cardW;
        ctx.fillStyle = pal.psyTitle;
        ctx.font = `600 14px ${serifFont}`;
        ctx.fillText(psyTitle, tx, nextY + 21, maxTw);
        if (psy) {
          ctx.fillStyle = pal.psySub;
          ctx.font = `500 12px ${serifFont}`;
          ctx.fillText(`${psy.star}★ · ${displayPsychubeStat(psy, lang)}`, tx, nextY + 41, maxTw);
        }
        nextY += pBox + 8;
      } else if (hasPsychubes) {
        nextY += 58;
      }

      if (hasResonance && resonanceCodes[i]) {
        const codeStr = String(resonanceCodes[i]).trim();
        if (codeStr) {
          const rH = 26;
          ctx.fillStyle = pal.resBg;
          ctx.fillRect(x, nextY, cardW, rH);
          ctx.strokeStyle = pal.resBorder;
          ctx.lineWidth = 1;
          ctx.strokeRect(x, nextY, cardW, rH);
          ctx.fillStyle = pal.resText;
          ctx.font = `600 11px ${monoFont}`;
          ctx.fillText(codeStr, x + 7, nextY + 17, cardW - 14);
        }
      }

      ctx.restore();
    }
  }

  // 7. Archive Footer
  const footLineY = H - 64;
  ctx.strokeStyle = pal.footLine;
  ctx.lineWidth = 1;
  ctx.setLineDash([6, 4]);
  ctx.beginPath();
  ctx.moveTo(58, footLineY);
  ctx.lineTo(W - 58, footLineY);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = pal.footText;
  ctx.font = `500 13px ${monoFont}`;
  ctx.fillText(t('posterRecordedAt', { date: item.date || '' }, lang), 58, footLineY + 28);
  ctx.textAlign = 'right';
  ctx.fillText(t('posterCommunityFooter', {}, lang), W - 58, footLineY + 28);
  ctx.textAlign = 'left';

  const safeTitle = String(item.title || 'record').replace(/[\\/:*?"<>|\s]+/g, '-');
  const rankSuffix = item.rank > 0 ? `rank${item.rank}` : 'daily';
  const themeSuffix = obsidian ? '-obsidian' : '';
  const fileName = `r1999-${item.mode}-${safeTitle}-${rankSuffix}${themeSuffix}.png`;

  try {
    const blob = await new Promise((resolve, reject) => {
      try {
        canvas.toBlob((b) => resolve(b), 'image/png');
      } catch (err) {
        reject(err);
      }
    });
    if (!blob) throw new Error('SecurityError');
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  } catch (err) {
    if (err?.name === 'SecurityError' || /tainted|SecurityError/i.test(String(err?.message || ''))) {
      throw new Error(
        L(
          'Browser security blocks PNG export on file://. Double-click Start-Offline-Preview.bat to run via local http://localhost and export PNGs.',
          '本地 file:// 协议下浏览器限制画布导出 PNG，请双击 Start-Offline-Preview.bat 通过本地服务打开即可一键保存。',
          lang
        )
      );
    }
    throw err;
  }
}

function openPoster(posterId) {
  const lang = getLang();
  const item = posterIndex.get(posterId);
  if (!item) return;
  closeGlossaryPopover();

  const isMane = item.mode === 'mane';
  const resultHtml = isMane
    ? `<div style="display:flex;align-items:center;gap:10px">
         <span class="poster-score">${formatScore(item.score, lang)}</span>
         ${renderGradeStamp(item.score, lang)}
       </div>`
    : `<span class="poster-score">${esc(formatRounds(item.rounds, lang))}</span>`;

  let safeUrl = '';
  let urlHost = '';
  try {
    safeUrl = parseHttpUrl(item.related_url);
    if (safeUrl) urlHost = new URL(safeUrl).hostname.replace(/^www\./, '');
  } catch {
    safeUrl = '';
  }

  const evidenceHtml = safeUrl
    ? `<div class="poster-evidence-bar has-link">
         <div>
           <strong>${esc(t('posterEvidenceHasLink', {}, lang))}</strong>
           <span>${esc(t('posterEvidenceDomain', { host: urlHost }, lang))}</span>
         </div>
         <a class="copper-btn" href="${esc(safeUrl)}" target="_blank" rel="noopener noreferrer ugc">${esc(t('posterEvidenceOpen', {}, lang))}</a>
       </div>`
    : `<div class="poster-evidence-bar">
         <span>${esc(t('posterEvidenceNoLink', {}, lang))}</span>
       </div>`;

  const psychubes = item.psychubes || [];
  const resonanceCodes = item.resonanceCodes || [];
  const slotNames = (item.displayTeam && item.displayTeam.length && !isLegacyShorthandTeam(item.team))
    ? item.displayTeam
    : (item.team || []).map((n) => displayCharacterName(n, lang));
  const hasAnyBuilds = psychubes.some(Boolean) || resonanceCodes.some(Boolean);
  const slotCount = Math.max(slotNames.length, psychubes.length, resonanceCodes.length);
  const nonEmptyRes = Array.from({ length: Math.min(4, slotCount) }, (_, idx) => ({
    idx,
    code: resonanceCodes[idx] || '',
    name: slotNames[idx] || t('slotLabel', { n: idx + 1 }, lang)
  })).filter((entry) => entry.code);

  const buildsHtml = hasAnyBuilds
    ? `<div class="poster-builds-section">
         <div class="poster-builds-header">
           <div class="poster-builds-heading">${esc(t('posterBuildsHeading', {}, lang))}</div>
           ${nonEmptyRes.length >= 2
             ? `<button type="button" class="poster-res-copy-all" data-copy-all-res="${esc(posterId)}">${esc(t('posterCopyAllRes', { n: nonEmptyRes.length }, lang))}</button>`
             : ''}
         </div>
         <div class="poster-builds-grid">
           ${Array.from({ length: Math.min(4, slotCount) }, (_, idx) => {
             const pName = psychubes[idx] || '';
             const rCode = resonanceCodes[idx] || '';
             if (!pName && !rCode) return '';
             const psy = pName ? resolvePsychube(pName) : null;
             const psyLabel = displayPsychubeName(psy || pName, lang);
             const charTitle = slotNames[idx] || t('slotLabel', { n: idx + 1 }, lang);
             return `
               <div class="poster-build-card">
                 <div class="poster-build-top">
                   <span class="poster-build-slot">${idx + 1}</span>
                   <strong class="poster-build-char">${esc(charTitle)}</strong>
                 </div>
                 <div class="poster-build-main">
                   ${pName
                     ? `<div class="poster-build-psy" data-open-psy="${esc(psy ? psy.id : pName)}" role="button" tabindex="0" style="cursor:pointer">
                          ${renderPsychubeThumbHtml(pName, 'in-poster', lang)}
                          <div class="poster-psy-info">
                            <strong>${esc(psyLabel)}</strong>
                            ${psy ? `<span>${psy.star}★ · ${esc(displayPsychubeStat(psy, lang))}</span>` : ''}
                          </div>
                        </div>`
                     : `<div class="poster-build-psy-empty">${esc(t('posterNoPsy', {}, lang))}</div>`
                   }
                   ${rCode
                     ? `<div class="poster-res-row">
                          <code class="poster-res-code" title="${esc(rCode)}">${esc(rCode)}</code>
                          <button type="button" class="poster-res-copy" data-copy-res-id="${esc(posterId)}" data-copy-res-idx="${idx}">${esc(t('posterCopyRes', {}, lang))}</button>
                        </div>`
                     : ''
                   }
                 </div>
               </div>`;
           }).join('')}
         </div>
       </div>`
    : `<div class="poster-builds-empty">${esc(t('posterNoBuilds', {}, lang))}</div>`;

  const isObsidian = state.posterTheme === 'obsidian';
  openModal(`
    <div class="modal-eyebrow">${esc(t('posterEyebrow', {}, lang))}</div>
    <h2>${esc(t('posterTitle', {}, lang))}</h2>
    <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;margin-bottom:8px">
      <p class="modal-subtitle" style="margin:0">${esc(t('posterSubtitle', {}, lang))}</p>
      <div class="poster-theme-toggle" role="group" aria-label="${esc(t('posterTitle', {}, lang))}" style="margin-bottom:0">
        <button type="button" class="${!isObsidian ? 'active' : ''}" data-poster-theme="parchment" aria-pressed="${!isObsidian}">${esc(t('posterThemeParchment', {}, lang))}</button>
        <button type="button" class="${isObsidian ? 'active' : ''}" data-poster-theme="obsidian" aria-pressed="${isObsidian}">${esc(t('posterThemeObsidian', {}, lang))}</button>
      </div>
    </div>
    <div class="poster-card ${item.bossThumb ? 'has-boss-watermark' : ''} ${isObsidian ? 'is-obsidian' : ''}" id="activePosterCard">
      ${item.bossThumb ? `<div class="poster-boss-wm" style="background-image:url('${esc(item.bossThumb)}')" aria-hidden="true"></div>` : ''}
      <div class="poster-head">
        <div>
          <div class="poster-kicker">${esc(isMane ? t('posterKickerMane', {}, lang) : t('posterKickerFb', {}, lang))}</div>
          <h3>${esc(item.title)}</h3>
          <div class="poster-sub-row">
            <div class="poster-sub">${esc(item.subtitle)}</div>
            ${!isMane && item.resonanceTen ? `<span class="poster-res10-badge">${esc(t('posterRes10Badge', {}, lang))}</span>` : ''}
          </div>
        </div>
        <div class="poster-rank-box">
          <div class="poster-rank-num">${item.rank > 0 ? `#${String(item.rank).padStart(2, '0')}` : esc(t('posterDailyLabel', {}, lang))}</div>
          <div class="poster-rank-label">${esc(item.rank > 0 ? t('posterRankLabel', {}, lang) : t('posterDailyLabel', {}, lang))}</div>
        </div>
      </div>

      <div class="poster-body">
        <div>
          <div style="font-size:11px;opacity:0.72;letter-spacing:0.1em">${esc(t('posterInvestigator', {}, lang))}</div>
          <div class="poster-player is-player-name">${esc(item.player)}</div>
          <div style="font-size:12px;opacity:0.82;margin-top:3px">${esc(t('mainDpsLabel', {}, lang))}: ${esc(item.carry)}</div>
        </div>
        <div>${resultHtml}</div>
      </div>

      ${renderFormationHtml(item.team, item.rawCarry || item.carry, psychubes, lang)}
      ${buildsHtml}

      <div class="poster-foot">
        <span>${esc(t('posterRecordedAt', { date: item.date }, lang))}</span>
        <span>${esc(t('posterCommunityFooter', {}, lang))}</span>
      </div>
    </div>
    ${evidenceHtml}
    <div class="form-actions">
      <button type="button" class="paper-btn" data-export-poster="${esc(posterId)}">${esc(t('posterBtnSavePng', {}, lang))}</button>
      <button type="button" class="outline-btn" data-copy-link="${esc(posterId)}">${esc(t('posterBtnCopyLink', {}, lang))}</button>
      <button type="button" class="outline-btn" data-copy-poster="${esc(posterId)}">${esc(t('posterBtnCopyText', {}, lang))}</button>
      <button type="button" class="ghost-btn" data-action="close-modal">${esc(t('posterBtnClose', {}, lang))}</button>
    </div>`, true);
}

/* ==================== Submit / Edit Modals & Offline Sandbox Submission ==================== */
function maneMapChoices(maps, selected, lang = getLang()) {
  return SECTION_KEYS.map((sec) => {
    const group = maps.filter((m) => m.section === sec);
    if (!group.length) return '';
    return `<optgroup label="${esc(localizeSection(sec, lang))}">${optionsHtml(group.map((m) => [m.id, `${m.edition} · ${displayBossName(m.name, lang)}`]), selected)}</optgroup>`;
  }).join('');
}

function maneScoreFieldsHtml(record, maps, lang = getLang()) {
  const divLabels = divisionLabelsMap(lang);
  return `
    <div class="form-grid">
      <div class="field"><label for="mMap">${esc(t('fieldBoss', {}, lang))} *</label><select id="mMap" name="map_id" required>${maneMapChoices(maps, record.map_id, lang)}</select></div>
      <div class="field"><label for="mDiv">${esc(t('fieldDivision', {}, lang))} *</label><select id="mDiv" name="division">${optionsHtml(Object.entries(divLabels), record.division || 'zero')}</select></div>
    </div>
    <div class="form-grid">
      <div class="field"><label for="mName">${esc(t('fieldPlayerName', {}, lang))} *</label><input id="mName" name="display_name" required minlength="2" maxlength="32" value="${esc(record.display_name || '')}" /></div>
      <div class="field"><label for="mScore">${esc(t('fieldScore', {}, lang))} *</label><input id="mScore" name="score" required inputmode="numeric" placeholder="${esc(L('e.g. 30635308', '例如 30635308', lang))}" value="${esc(record.score ?? '')}" /></div>
    </div>
    ${renderTeamBuilderFieldHtml(lang)}
    <div class="field"><label for="mLink">${esc(t('fieldRelatedUrl', {}, lang))}</label><input id="mLink" name="related_url" type="url" maxlength="2048" placeholder="${esc(t('fieldRelatedUrlPlaceholder', {}, lang))}" value="${esc(record.related_url || '')}" /></div>`;
}

function readManeFields(fd, { forEdit = false } = {}) {
  const lang = getLang();
  const scoreText = String(fd.get('score') ?? '').trim().replace(/[,，]/g, '');
  const score = Number(scoreText);
  const display_name = String(fd.get('display_name') ?? '').trim();
  const division = String(fd.get('division') ?? '');

  if (!DIVISION_KEYS.includes(division)) throw new Error(L('Please choose All P0 or Max Portray.', '请选择全 0 塑造或全满塑造。', lang));
  if (display_name.length < 2 || display_name.length > 32) throw new Error(t('errPlayerRequired', {}, lang));
  if (!/^\d+$/.test(scoreText) || !Number.isSafeInteger(score) || score < 1) {
    throw new Error(t('errScoreInvalid', {}, lang));
  }
  const built = readTeamBuilderSubmission();
  const res = {
    map_id: String(fd.get('map_id')),
    division,
    display_name,
    team: built.team,
    carry: built.carry,
    score,
    related_url: parseHttpUrl(fd.get('related_url')) || null
  };
  if (forEdit) {
    res.team_psychubes = built.hasPsychubes ? built.psychubes : null;
    res.team_resonance_codes = built.hasResonance ? built.resonanceCodes : null;
  } else {
    if (built.hasPsychubes) res.team_psychubes = built.psychubes;
    if (built.hasResonance) res.team_resonance_codes = built.resonanceCodes;
  }
  return res;
}

function bindManeScreenshot(form, maps) {
  const proof = form.querySelector('#mProof');
  const note = form.querySelector('#mScreenshotStatus');
  const preview = form.querySelector('#mProofPreview');
  const mapField = form.elements.namedItem('map_id');
  const scoreField = form.elements.namedItem('score');
  let mapEdited = false;
  let request = 0;
  let undoPrefill = [];
  mapField.addEventListener('change', () => { mapEdited = true; });
  proof.addEventListener('change', async () => {
    const lang = getLang();
    const current = ++request;
    form._preparedProof = null;
    form._preparedProofPromise = null;
    undoPrefill.reverse().forEach((undo) => undo());
    undoPrefill = [];
    refreshBuildSlotsGrid();

    const file = proof.files[0];
    clearUploadPreview(preview);
    if (!file || !file.size) {
      note.textContent = '';
      return;
    }
    const mime = resolveProofMime(file);
    if (!mime) {
      note.textContent = t('errProofType', {}, lang);
      return;
    }
    if (file.size > MAX_PROOF_RAW_BYTES) {
      note.textContent = L('Screenshot file exceeds 30 MB limit. Please trim or resize it first.', '截图文件超过 30 MB 上限，请先裁剪或压缩后再上传。', lang);
      return;
    }
    renderUploadPreview(preview, file);
    note.textContent = file.size > MAX_PROOF_UPLOAD_BYTES
      ? L('Screenshot > 5 MB: compressing for upload and analyzing…', '截图超过 5 MB，正在自动压缩并识别结算截图…', lang)
      : L('Analyzing result screenshot…', '正在识别结算截图…', lang);

    const prepPromise = prepareProofForUpload(file, lang);
    form._preparedProofPromise = { sourceFile: file, promise: prepPromise };
    const [prepOutcome, ocrOutcome] = await Promise.allSettled([prepPromise, loadOcrModule().then((m) => m.recognizeManeScreenshot(file))]);
    if (!form.isConnected || request !== current) return;

    if (prepOutcome.status === 'fulfilled') {
      form._preparedProof = { sourceFile: file, ...prepOutcome.value };
      if (prepOutcome.value.compressed) {
        updateUploadPreviewMeta(
          preview,
          file,
          L(`Auto-compressed to ${formatProofBytes(prepOutcome.value.finalSize)}`, `已自动压缩至 ${formatProofBytes(prepOutcome.value.finalSize)}`, lang)
        );
      }
    } else {
      clearUploadPreview(preview);
      note.textContent = prepOutcome.reason?.message || t('errProofSize', {}, lang);
      return;
    }

    const compSuffix = form._preparedProof?.compressed
      ? L(` · Auto-compressed to ${formatProofBytes(form._preparedProof.finalSize)}`, ` · 已自动压缩至 ${formatProofBytes(form._preparedProof.finalSize)}`, lang)
      : '';

    if (ocrOutcome.status === 'rejected') {
      note.textContent = L('Unable to parse this screenshot; please fill in manually.', '暂时无法识别这张截图，请手动填写。', lang) + compSuffix;
      return;
    }

    const result = ocrOutcome.value;
    if (!result) {
      note.textContent = L('Could not auto-detect this layout. Please fill in fields manually.', '这张图的结算版式或关卡未识别，请手动填写。', lang) + compSuffix;
      return;
    }

    const match = result.mapName ? maps.find((map) => map.name.replace('饥谨', '饥馑') === result.mapName) : null;
    if (match && !mapEdited) {
      const previous = mapField.value;
      mapField.value = match.id;
      undoPrefill.push(() => {
        if (!mapEdited && mapField.value === match.id) mapField.value = previous;
      });
    }
    if (result.score && !scoreField.value) {
      scoreField.value = result.score;
      undoPrefill.push(() => {
        if (scoreField.value === result.score) scoreField.value = '';
      });
    }
    for (const [i, { character, psychube }] of result.slots.entries()) {
      if (!character) continue;
      if (!modalBuildState.chars[i] && !modalBuildState.chars.includes(character)) {
        modalBuildState.chars[i] = character;
        undoPrefill.push(() => {
          if (modalBuildState.chars[i] === character &&
            !modalBuildState.carries[i] && !modalBuildState.psychubes[i] && !modalBuildState.resonanceCodes[i]) {
            modalBuildState.chars[i] = '';
          }
        });
      }
      if (psychube && modalBuildState.chars[i] === character && !modalBuildState.psychubes[i]) {
        modalBuildState.psychubes[i] = psychube;
        undoPrefill.push(() => {
          if (modalBuildState.chars[i] === character && modalBuildState.psychubes[i] === psychube) {
            modalBuildState.psychubes[i] = '';
          }
        });
      }
    }
    refreshBuildSlotsGrid();
    const identifiedSlots = result.slots.filter((slot) => slot.character).length;
    const identifiedPsychubes = result.slots.filter((slot) => slot.psychube).length;
    const detectedBoss = result.mapName
      ? displayBossName(result.mapName, lang)
      : L('Boss TBD (select manually)', '首领待手选', lang);
    const arcWord = identifiedSlots === 1 ? 'arcanist' : 'arcanists';
    const psyWord = identifiedPsychubes === 1 ? 'psychube' : 'psychubes';
    note.textContent = L(
      `Detected: ${detectedBoss} · ${result.score ? formatScore(result.score, lang) : 'Score TBD'} · ${identifiedSlots} ${arcWord} / ${identifiedPsychubes} ${psyWord}. Verify and mark Main DPS.`,
      `识别结果：${detectedBoss} · ${result.score ? formatScore(result.score, lang) + ' 分' : '积分待确认'} · ${identifiedSlots} 个角色 / ${identifiedPsychubes} 个心相。请核对表单，补填其余信息后提交。`,
      lang
    ) + compSuffix;
  });
}

function openManeSubmitModal() {
  const lang = getLang();
  const maps = state.maneMaps.filter(isMapOpen);
  if (!state.connected || !maps.length) return toast(t('bossNotOpenYet', {}, lang));
  let nick = state.profile?.display_name || '';
  try { nick = nick || localStorage.getItem('mane-nickname') || ''; } catch {}
  const draft = loadSubmitDraft('mane');
  if (draft) restoreModalBuildFromDraft(draft);
  else resetModalBuildState();

  const isOffline = isOfflineSandboxMode() && state.dataSource === 'offline';
  const initialMapId = (draft?.map_id && maps.some((m) => m.id === draft.map_id)) ? draft.map_id : state.maneMapId;
  const initialDiv = (draft?.division && DIVISION_KEYS.includes(draft.division)) ? draft.division : state.maneDivision;
  const initialNick = draft?.display_name || nick;
  const draftBanner = draft
    ? `<div class="draft-restore-bar" id="submitDraftBar"><span>✦ ${esc(t('draftRestored', {}, lang))}</span><button type="button" class="text-link-btn" data-clear-draft="mane">${esc(t('clearDraft', {}, lang))}</button></div>`
    : '';
  const offlineBanner = isOffline
    ? `<div class="draft-restore-bar" style="border-left-color:var(--local-teal);border-color:rgba(140,211,200,0.45);background:rgba(68,148,138,0.16)"><span>✦ ${esc(t('offlineSubmitNote', {}, lang))}</span></div>`
    : '';
  const globalWelcome = renderGlobalServerNoticeHtml('mane-welcome', lang);

  openModal(`
    <div class="modal-eyebrow">MANE’S BULLETIN · SUBMIT</div>
    <h2>${esc(t('submitManeTitle', {}, lang))}</h2>
    <div class="modal-subtitle">
      <span class="resonance-tag">✦ ${esc(L('Screenshot OCR Ready', '已支持图像识别', lang))}</span>
      <small class="field-hint" style="display:block;margin-top:6px">${esc(t('submitManeSub', {}, lang))}</small>
    </div>
    ${globalWelcome}
    ${offlineBanner}
    ${draftBanner}
    <form id="maneSubmitForm">
      <div class="field">
        <label for="mProof">${esc(t('fieldProof', {}, lang))}${isOffline ? ` (${esc(t('slotOptional', {}, lang))})` : ' *'}</label>
        <input id="mProof" name="proof" type="file" accept="image/png,image/jpeg,image/webp" ${isOffline ? '' : 'required'} />
        <span class="field-hint">${esc(isOffline ? L('Offline Sandbox Mode: screenshot optional; saved locally in your browser. Uploading one still runs OCR preview.', '离线沙盒模式：截图选填，投稿保存在本机浏览器中；上传截图仍可体验自动识别。', lang) : t('fieldProofHint', {}, lang))}</span>
        <span class="field-hint" id="mScreenshotStatus" role="status"></span>
        <div id="mProofPreview" class="proof-upload-preview" hidden></div>
      </div>
      ${maneScoreFieldsHtml({
        map_id: initialMapId,
        division: initialDiv,
        display_name: initialNick,
        score: draft?.score || '',
        related_url: draft?.related_url || ''
      }, maps, lang)}
      ${contactFieldHtml(lang)}
      <p class="submit-portray-note">✦ ${esc(t('submitPortrayLimitNote', {}, lang))}</p>
      <div class="form-actions">
        <button type="button" class="ghost-btn" id="clearDraftBtn" data-clear-draft="mane" ${draft ? '' : 'hidden'}>${esc(t('clearDraft', {}, lang))}</button>
        <button type="button" class="outline-btn" data-action="close-modal">${esc(t('btnCancel', {}, lang))}</button>
        <button type="submit" class="copper-btn">${esc(t('btnSubmitNow', {}, lang))} →</button>
      </div>
    </form>`, true);
  const form = $('#maneSubmitForm');
  if (draft?.contact && form?.elements?.namedItem('contact')) {
    form.elements.namedItem('contact').value = draft.contact;
  }
  bindManeScreenshot(form, maps);
}

async function handleManeSubmit(form) {
  const lang = getLang();
  const fd = new FormData(form);
  const record = readManeFields(fd);
  const proof = fd.get('proof');
  const hasFile = Boolean(proof && proof.size > 0);
  let prepared = null;
  if (hasFile) {
    if (form._preparedProof?.sourceFile === proof) {
      prepared = form._preparedProof;
    } else if (form._preparedProofPromise?.sourceFile === proof) {
      prepared = { sourceFile: proof, ...(await form._preparedProofPromise.promise) };
      form._preparedProof = prepared;
    } else {
      prepared = { sourceFile: proof, ...(await prepareProofForUpload(proof, lang)) };
      form._preparedProof = prepared;
    }
  }

  if (isOfflineSandboxMode() && state.dataSource === 'offline') {
    const nowIso = new Date().toISOString();
    const localId = `local-${uid()}`;
    const entry = {
      id: localId,
      player_id: 'local-sandbox',
      map_id: record.map_id,
      division: record.division,
      display_name: record.display_name,
      team: record.team,
      carry: record.carry,
      score: record.score,
      related_url: record.related_url,
      team_psychubes: record.team_psychubes || null,
      team_resonance_codes: record.team_resonance_codes || null,
      status: 'approved',
      isLocal: true,
      created_at: nowIso,
      approved_at: nowIso
    };
    const store = loadOfflineSubmissions();
    store.mane.unshift(entry);
    saveOfflineSubmissions(store);
    try { localStorage.setItem('mane-nickname', record.display_name); } catch {}
    clearSubmitDraft('mane');
    hydrateFromOfflineSnapshot();

    const submittedMap = state.maneMaps.find((m) => m.id === record.map_id);
    state.mode = 'mane';
    state.manePage = 'scores';
    if (submittedMap) state.maneSection = submittedMap.section;
    state.maneMapId = record.map_id;
    state.maneDivision = record.division;
    state.maneCarry = '';
    state.maneAfflatus = '';
    state.maneQuery = '';
    const pid = `mane-${localId}`;
    state.highlightRecordId = pid;
    pendingScrollRecordId = pid;
    closeModal();
    render();
    toast(t('offlineSubmitSuccess', {}, lang));
    return;
  }

  if (!hasFile || !prepared) throw new Error(t('errProofRequired', {}, lang));
  await ensureSupabaseClient();

  const session = state.session || (await checked(sb.auth.signInAnonymously())).session;
  if (!session) throw new Error(L('Could not start submission session. Please retry.', '建立投稿会话失败，请重试。', lang));
  const player_id = session.user.id;
  const path = `${player_id}/${uid()}.${MIME_TO_EXT[prepared.mime]}`;
  const bucket = sb.storage.from('mane-proofs');
  await checked(bucket.upload(path, prepared.uploadFile, { contentType: prepared.mime }));
  try {
    await checked(sb.rpc('submit_mane_result', {
      p_record: { ...record, evidence_path: path },
      p_contact: String(fd.get('contact') ?? '').trim() || null
    }));
  } catch (err) {
    await bucket.remove([path]);
    if (isMissingBuildColumnError(err)) {
      throw new Error(L('Live database has not enabled Psychube/Resonance columns yet. Clear builds or ask an admin to run the migration.', '线上数据库尚未添加心相/共鸣码存储列：请联系站长运行配套迁移 SQL，或暂时清空心相与共鸣码后再提交。', lang));
    }
    throw err;
  }
  state.session = session;
  state.user = session.user;
  try { localStorage.setItem('mane-nickname', record.display_name); } catch {}
  clearSubmitDraft('mane');
  closeModal();
  toast(t('toastSubmitted', {}, lang));
}

function resonanceChoice(group, isChecked = false, lang = getLang()) {
  return `<label class="resonance-choice"${group === 'zero' ? '' : ' hidden'}>
    <input name="resonanceTen" type="checkbox"${group === 'zero' ? '' : ' disabled'}${isChecked && group === 'zero' ? ' checked' : ''}>
    ${esc(t('fieldRes10Check', {}, lang))}</label>`;
}

function fbStageOptionsHtml(versionId, lang = getLang()) {
  return standardStages(versionId)
    .map((s) => `<option value="${esc(s.id)}"${s.id === state.fbStageId ? ' selected' : ''}>${esc(localizeStageName(s, lang))}</option>`)
    .join('');
}

function bindFlashbackScreenshot(form) {
  const proof = form.elements.namedItem('proof');
  const stage = form.elements.namedItem('stage');
  const rounds = form.elements.namedItem('rounds');
  const version = form.elements.namedItem('version');
  const note = form.querySelector('#fbScreenshotStatus');
  const preview = form.querySelector('#fbProofPreview');
  let request = 0;
  let stageEdited = false;
  let roundsEdited = false;
  let undoPrefill = [];

  stage.addEventListener('change', () => {
    stageEdited = true;
    delete form.dataset.ocrStageNumber;
  });
  rounds.addEventListener('change', () => { roundsEdited = true; });

  proof.addEventListener('change', async () => {
    const lang = getLang();
    const current = ++request;
    form._preparedProof = null;
    form._preparedProofPromise = null;
    undoPrefill.reverse().forEach((undo) => undo());
    undoPrefill = [];
    refreshBuildSlotsGrid();
    const file = proof.files[0];
    clearUploadPreview(preview);
    if (!file?.size) {
      note.textContent = '';
      return;
    }
    const mime = resolveProofMime(file);
    if (!mime) {
      note.textContent = t('errProofType', {}, lang);
      return;
    }
    if (file.size > MAX_PROOF_RAW_BYTES) {
      note.textContent = L('Screenshot file exceeds 30 MB limit. Please trim or resize it first.', '截图文件超过 30 MB 上限，请先裁剪或压缩后再上传。', lang);
      return;
    }
    renderUploadPreview(preview, file);
    note.textContent = file.size > MAX_PROOF_UPLOAD_BYTES
      ? L('Screenshot > 5 MB: compressing for upload and analyzing…', '截图超过 5 MB，正在自动压缩并识别通关截图…', lang)
      : L('Analyzing clear screenshot…', '正在识别通关截图…', lang);

    const prepPromise = prepareProofForUpload(file, lang);
    form._preparedProofPromise = { sourceFile: file, promise: prepPromise };
    const [prepOutcome, ocrOutcome] = await Promise.allSettled([prepPromise, loadOcrModule().then((m) => m.recognizeFlashbackScreenshot(file))]);
    if (!form.isConnected || current !== request) return;

    if (prepOutcome.status === 'fulfilled') {
      form._preparedProof = { sourceFile: file, ...prepOutcome.value };
      if (prepOutcome.value.compressed) {
        updateUploadPreviewMeta(
          preview,
          file,
          L(`Auto-compressed to ${formatProofBytes(prepOutcome.value.finalSize)}`, `已自动压缩至 ${formatProofBytes(prepOutcome.value.finalSize)}`, lang)
        );
      }
    } else {
      clearUploadPreview(preview);
      note.textContent = prepOutcome.reason?.message || t('errProofSize', {}, lang);
      return;
    }

    const compSuffix = form._preparedProof?.compressed
      ? L(` · Auto-compressed to ${formatProofBytes(form._preparedProof.finalSize)}`, ` · 已自动压缩至 ${formatProofBytes(form._preparedProof.finalSize)}`, lang)
      : '';

    if (ocrOutcome.status === 'rejected') {
      note.textContent = L('Unable to parse this screenshot; please fill in manually.', '暂时无法识别这张截图，请手动填写。', lang) + compSuffix;
      return;
    }

    const result = ocrOutcome.value;
    if (!result) {
      note.textContent = L('Could not auto-detect this clear screen. Please fill in manually.', '暂未识别这张图的通关画面，请手动填写。', lang) + compSuffix;
      return;
    }

    const detectedStage = standardStages(version.value).find((entry) => entry.stage_no === result.stage);
    if (detectedStage && !stageEdited) {
      const previous = stage.value;
      stage.value = detectedStage.id;
      form.dataset.ocrStageNumber = String(detectedStage.stage_no);
      undoPrefill.push(() => {
        if (stageEdited) return;
        delete form.dataset.ocrStageNumber;
        if ([...stage.options].some((option) => option.value === previous)) stage.value = previous;
        else stage.selectedIndex = 0;
      });
    }
    if (result.rounds !== null && !roundsEdited) {
      rounds.value = String(result.rounds);
      undoPrefill.push(() => {
        if (!roundsEdited) rounds.value = '';
      });
    }

    let filledChars = 0;
    let filledPsychubes = 0;
    for (const [slot, { character, psychube }] of result.slots.entries()) {
      if (!character) continue;
      const elsewhere = modalBuildState.chars.some((value) => splitSlotChoices(value).some(
        (name) => canonicalCharacterKey(name) === canonicalCharacterKey(character)
      ));
      if (!modalBuildState.chars[slot] && !elsewhere) {
        modalBuildState.chars[slot] = character;
        filledChars++;
        undoPrefill.push(() => {
          if (modalBuildState.chars[slot] === character && !modalBuildState.carries[slot] &&
              !modalBuildState.psychubes[slot] && !modalBuildState.resonanceCodes[slot]) {
            modalBuildState.chars[slot] = '';
          }
        });
      }
      if (psychube && modalBuildState.chars[slot] === character && !modalBuildState.psychubes[slot]) {
        modalBuildState.psychubes[slot] = psychube;
        filledPsychubes++;
        undoPrefill.push(() => {
          if (modalBuildState.chars[slot] === character && modalBuildState.psychubes[slot] === psychube) {
            modalBuildState.psychubes[slot] = '';
          }
        });
      }
    }
    if (filledChars || filledPsychubes) refreshBuildSlotsGrid();
    else saveSubmitDraftFromForm(form);
    const stageLabel = detectedStage ? localizeStageName(detectedStage, lang) : L('Stage TBD', '关卡待确认', lang);
    const roundLabel = result.rounds === null ? L('Rounds TBD', '回合待确认', lang) : formatRounds(result.rounds, lang);
    const arcWord = filledChars === 1 ? 'arcanist' : 'arcanists';
    const psyWord = filledPsychubes === 1 ? 'psychube' : 'psychubes';
    note.textContent = L(
      `Detected: ${stageLabel} · ${roundLabel} · ${filledChars} ${arcWord} / ${filledPsychubes} ${psyWord}.`,
      `识别结果：${stageLabel} · ${roundLabel}。已预填 ${filledChars} 个角色、${filledPsychubes} 个心相，请核对并补填其余信息。`,
      lang
    ) + compSuffix;
  });
}

function openFbSubmitModal() {
  const lang = getLang();
  if (!state.connected || !state.fbStages.length || startingGuest) return;
  const isOffline = isOfflineSandboxMode() && state.dataSource === 'offline';

  if (!isOffline && !state.user) {
    openModal(`
      <div class="modal-eyebrow">GUEST PROFILE</div>
      <h2>${esc(L('Set Public Timekeeper Name', '设置公开展示昵称', lang))}</h2>
      <p class="modal-subtitle">${esc(L('Your name will appear publicly on Focused Flashback boards and Hall of Fame.', '昵称将公开显示于焦点闪回榜单与荣誉殿堂，同一浏览器会保留您的投稿身份。', lang))}</p>
      <form id="fbGuestForm">
        <div class="field">
          <label for="fbGuestName">${esc(t('fieldPlayerName', {}, lang))} *</label>
          <input id="fbGuestName" name="name" required minlength="2" maxlength="24" autocomplete="nickname" />
        </div>
        <div class="form-actions">
          <button type="button" class="outline-btn" data-action="close-modal">${esc(t('btnCancel', {}, lang))}</button>
          <button type="submit" class="copper-btn">${esc(L('Continue →', '继续投稿 →', lang))}</button>
        </div>
      </form>`);
    return;
  }
  if (!isOffline && !state.profile) {
    openProfileModal(true);
    return;
  }

  const draft = loadSubmitDraft('flashback');
  if (draft) restoreModalBuildFromDraft(draft);
  else resetModalBuildState();

  let savedNick = state.profile?.display_name || '';
  try { savedNick = savedNick || localStorage.getItem('mane-nickname') || ''; } catch {}
  const initialNick = draft?.nickname || savedNick;
  const initialVerId = (draft?.version && state.fbVersions.some((v) => v.id === draft.version)) ? draft.version : state.fbVersionId;
  const verStages = standardStages(initialVerId);
  const initialStageId = (draft?.stage && verStages.some((s) => s.id === draft.stage)) ? draft.stage : (verStages.some((s) => s.id === state.fbStageId) ? state.fbStageId : (verStages[0]?.id || ''));
  const initialGroup = (draft?.group && DIVISION_KEYS.includes(draft.group)) ? draft.group : state.fbGroup;
  const initialRounds = (draft && /^[0-6]$/.test(String(draft.rounds ?? ''))) ? String(draft.rounds) : '';
  const divLabels = divisionLabelsMap(lang);

  const draftBanner = draft
    ? `<div class="draft-restore-bar" id="submitDraftBar"><span>✦ ${esc(t('draftRestored', {}, lang))}</span><button type="button" class="text-link-btn" data-clear-draft="flashback">${esc(t('clearDraft', {}, lang))}</button></div>`
    : '';
  const offlineBanner = isOffline
    ? `<div class="draft-restore-bar" style="border-left-color:var(--local-teal);border-color:rgba(140,211,200,0.45);background:rgba(68,148,138,0.16)"><span>✦ ${esc(t('offlineSubmitNote', {}, lang))}</span></div>`
    : '';
  const globalFbSubmitNotice = renderGlobalServerNoticeHtml('fb-submit', lang);

  openModal(`
    <div class="modal-eyebrow">FLASHBACK ARCHIVE · SUBMIT</div>
    <h2>${esc(t('submitFbTitle', {}, lang))}</h2>
    <div class="modal-subtitle">
      <span class="resonance-tag">✦ ${esc(L('Screenshot OCR Ready', '已支持图像识别', lang))}</span>
      <small class="field-hint" style="display:block;margin-top:6px">${esc(t('submitFbSub', {}, lang))}</small>
    </div>
    ${globalFbSubmitNotice}
    ${offlineBanner}
    ${draftBanner}
    <form id="fbSubmitForm">
      <div class="field">
        <label for="fbFormProof">${esc(t('fieldProof', {}, lang))}${isOffline ? ` (${esc(t('slotOptional', {}, lang))})` : ' *'}</label>
        <input id="fbFormProof" name="proof" type="file" accept="image/png,image/jpeg,image/webp" ${isOffline ? '' : 'required'} />
        <span class="field-hint">${esc(isOffline ? L('Offline Sandbox Mode: screenshot optional; saved locally in your browser. Uploading one still runs OCR preview.', '离线沙盒模式：截图选填，投稿保存在本机浏览器中；上传截图仍可体验自动识别。', lang) : t('fieldProofHint', {}, lang))}</span>
        <span class="field-hint" id="fbScreenshotStatus" role="status"></span>
        <div id="fbProofPreview" class="proof-upload-preview" hidden></div>
      </div>
      <div class="form-grid">
        <div class="field"><label for="fbNick">${esc(t('fieldPlayerName', {}, lang))} *</label><input id="fbNick" name="nickname" ${isOffline ? 'required minlength="2" maxlength="24"' : 'readonly'} value="${esc(initialNick)}" /></div>
        <div class="field"><label for="fbFormVersion">${esc(t('fieldVersion', {}, lang))} *</label><select id="fbFormVersion" name="version">${optionsHtml(state.fbVersions.map((v) => [v.id, localizeVersionLabel(v, lang)]), initialVerId)}</select></div>
      </div>
      <div class="form-grid">
        <div class="field"><label for="fbFormStage">${esc(t('fieldStage', {}, lang))} *</label><select id="fbFormStage" name="stage">${optionsHtml(verStages.map((s) => [s.id, localizeStageName(s, lang)]), initialStageId)}</select></div>
        <div class="field"><label for="fbFormGroup">${esc(t('fieldDivision', {}, lang))} *</label><select id="fbFormGroup" name="group">${optionsHtml(Object.entries(divLabels), initialGroup)}</select></div>
      </div>
      <div class="field"><label for="fbFormRounds">${esc(t('fieldRounds', {}, lang))} *</label><select id="fbFormRounds" name="rounds" required><option value="">${esc(L('Select rounds (0–6)', '请选择回合数', lang))}</option>${Array.from({ length: 7 }, (_, n) => `<option value="${n}"${initialRounds === String(n) ? ' selected' : ''}>${esc(t('roundsFull', { n }, lang))}</option>`).join('')}</select></div>
      ${resonanceChoice(initialGroup, Boolean(draft?.resonanceTen), lang)}
      ${renderTeamBuilderFieldHtml(lang)}
      <div class="field">
        <label for="fbFormLink">${esc(t('fieldRelatedUrl', {}, lang))}</label>
        <input id="fbFormLink" name="relatedUrl" type="url" maxlength="2048" placeholder="${esc(t('fieldRelatedUrlPlaceholder', {}, lang))}" value="${esc(draft?.relatedUrl || '')}" />
      </div>
      ${contactFieldHtml(lang)}
      <p class="submit-portray-note">✦ ${esc(t('submitPortrayLimitNote', {}, lang))}</p>
      <div class="form-actions">
        <button type="button" class="ghost-btn" id="clearDraftBtn" data-clear-draft="flashback" ${draft ? '' : 'hidden'}>${esc(t('clearDraft', {}, lang))}</button>
        <button type="button" class="outline-btn" data-action="close-modal">${esc(t('btnCancel', {}, lang))}</button>
        <button type="submit" class="copper-btn">${esc(t('btnSubmitNow', {}, lang))} →</button>
      </div>
    </form>`, true);
  const form = $('#fbSubmitForm');
  if (draft?.contact && form?.elements?.namedItem('contact')) {
    form.elements.namedItem('contact').value = draft.contact;
  }
  bindFlashbackScreenshot(form);
}

async function handleFbSubmit(form) {
  const lang = getLang();
  const fd = new FormData(form);
  const nickname = String(fd.get('nickname') ?? '').trim();
  const roundValue = String(fd.get('rounds') ?? '');
  const rounds = Number(roundValue);
  const file = fd.get('proof');
  const hasFile = Boolean(file && file.size > 0);
  const versionId = String(fd.get('version'));
  const stageId = String(fd.get('stage'));
  const group_code = String(fd.get('group'));

  if (nickname.length < 2 || nickname.length > 24) throw new Error(t('errPlayerRequired', {}, lang));
  if (!/^[0-6]$/.test(roundValue)) throw new Error(t('errRoundsInvalid', {}, lang));
  if (!state.fbStages.some((s) => s.id === stageId && s.version_id === versionId)) {
    throw new Error(L('Selected cycle and stage do not match.', '所选版本与关卡不匹配。', lang));
  }
  const built = readTeamBuilderSubmission();
  validateLineup(built.team, lang);
  const related_url = parseHttpUrl(fd.get('relatedUrl')) || null;

  let prepared = null;
  if (hasFile) {
    if (form._preparedProof?.sourceFile === file) {
      prepared = form._preparedProof;
    } else if (form._preparedProofPromise?.sourceFile === file) {
      prepared = { sourceFile: file, ...(await form._preparedProofPromise.promise) };
      form._preparedProof = prepared;
    } else {
      prepared = { sourceFile: file, ...(await prepareProofForUpload(file, lang)) };
      form._preparedProof = prepared;
    }
  }

  if (isOfflineSandboxMode() && state.dataSource === 'offline') {
    const nowIso = new Date().toISOString();
    const localId = `local-${uid()}`;
    const stageObj = state.fbStages.find((s) => s.id === stageId);
    const verObj = state.fbVersions.find((v) => v.id === versionId);
    const entry = {
      id: localId,
      player_id: `local-player:${normKey(nickname)}`,
      stage_id: stageId,
      group_code,
      team: built.team,
      team_key: canonicalTeam(built.team),
      carry_name: built.carry,
      rounds,
      created_at: nowIso,
      display_name: nickname,
      stage_no: stageObj?.stage_no || 1,
      stage_name: stageObj?.name || '',
      version_id: versionId,
      version_name: verObj?.label || '',
      related_url,
      resonance_ten: group_code === 'zero' && fd.has('resonanceTen'),
      team_psychubes: built.hasPsychubes ? built.psychubes : null,
      team_resonance_codes: built.hasResonance ? built.resonanceCodes : null,
      status: 'approved',
      isLocal: true
    };
    const store = loadOfflineSubmissions();
    store.flashback.unshift(entry);
    saveOfflineSubmissions(store);
    try { localStorage.setItem('mane-nickname', nickname); } catch {}
    clearSubmitDraft('flashback');
    hydrateFromOfflineSnapshot();

    state.mode = 'flashback';
    state.fbPage = 'leaderboard';
    state.fbVersionId = versionId;
    state.fbStageId = stageId;
    state.fbGroup = group_code;
    state.fbResonanceOnly = false;
    state.fbCarry = '';
    state.fbAfflatus = '';
    state.fbQuery = '';
    const pid = `fb-${localId}`;
    state.highlightRecordId = pid;
    pendingScrollRecordId = pid;
    closeModal();
    render();
    toast(t('offlineSubmitSuccess', {}, lang));
    return;
  }

  if (!hasFile || !prepared) throw new Error(t('errProofRequired', {}, lang));
  await ensureSupabaseClient();

  const conflicts = await checked(sb.rpc('flashback_existing_lineup', {
    p_stage_id: stageId,
    p_group_code: group_code,
    p_team: built.team,
    p_rounds: rounds
  }));
  if (conflicts?.length) {
    const { matched_team, incumbent_rounds } = conflicts[0];
    const teamText = (matched_team || []).map((n) => displayCharacterName(n, lang)).join(isEn(lang) ? ', ' : '、');
    throw new Error(L(
      `This lineup already exists: ${teamText} (${incumbent_rounds}R). Submit fewer rounds or adjust the lineup.`,
      `已有该队伍：${teamText}（${incumbent_rounds} 回合）。请减少回合，或调整阵容。`,
      lang
    ));
  }

  const path = `${state.user.id}/${uid()}.${MIME_TO_EXT[prepared.mime]}`;
  await checked(sb.storage.from('proofs').upload(path, prepared.uploadFile, { contentType: prepared.mime, upsert: false }));
  const payload = {
    stage_id: stageId,
    group_code,
    team: built.team,
    carry_name: built.carry,
    rounds,
    evidence_path: path,
    related_url,
    resonance_ten: group_code === 'zero' && fd.has('resonanceTen')
  };
  if (built.hasPsychubes) payload.team_psychubes = built.psychubes;
  if (built.hasResonance) payload.team_resonance_codes = built.resonanceCodes;

  try {
    await checked(sb.rpc('submit_flashback_result', {
      p_record: payload,
      p_contact: String(fd.get('contact') ?? '').trim() || null
    }));
  } catch (err) {
    await sb.storage.from('proofs').remove([path]);
    if (isMissingBuildColumnError(err)) {
      throw new Error(L('Live database has not enabled Psychube/Resonance columns yet. Clear builds or ask an admin to run the migration.', '线上数据库尚未添加心相/共鸣码存储列：请联系站长运行配套迁移 SQL，或暂时清空心相与共鸣码后再提交。', lang));
    }
    throw err;
  }
  clearSubmitDraft('flashback');
  closeModal();
  await loadAllData();
  toast(t('toastSubmitted', {}, lang));
}

/* ==================== Offline Excel Export ==================== */
async function exportOfflineExcel() {
  const lang = getLang();
  const date = getEffectiveDailyDate();
  const { division, map } = state.maneDaily;
  const selectedMaps = map ? state.maneMaps.filter((m) => m.id === map) : state.maneMaps;
  const dailyRows = filterOfflineDailyRows(state.maneDailyScores, {
    date,
    division,
    mapIds: map ? [map] : []
  });
  await exportManeWorkbook({
    date,
    divisions: division ? [division] : DIVISION_KEYS,
    maps: selectedMaps.length ? selectedMaps : state.maneMaps,
    dailyRows,
    totals: state.maneTotals,
    divisionLabels: divisionLabelsMap(lang),
    sectionLabels: sectionLabelsMap(lang),
    lang
  });
  toast(L('Excel workbook exported.', 'Excel 表格已导出。', lang));
}

/* ==================== My Submissions & Account / Moderation ==================== */
async function openMySubmissions(mode = state.mode) {
  const lang = getLang();
  const flashback = mode === 'flashback';
  const isOffline = isOfflineSandboxMode() && state.dataSource === 'offline';
  const localStore = isOffline ? loadOfflineSubmissions() : null;
  const offlineRows = isOffline ? (flashback ? localStore.flashback : localStore.mane) : null;
  const footerNote = isOffline
    ? t('mySubOffline', {}, lang)
    : L(
        'Guest submissions are linked to this browser session — check back here for review status and moderator notes.',
        '使用昵称投稿后，请在原浏览器查看审核进度与管理员回复。',
        lang
      );

  openModal(`<div class="moderation-tabs modal-top-tabs" role="group" aria-label="${esc(t('modeSwitcherAria', {}, lang))}">
    <button class="outline-btn ${flashback ? '' : 'selected'}" type="button" data-progress-board="mane">${esc(t('modeMane', {}, lang))}</button>
    <button class="outline-btn ${flashback ? 'selected' : ''}" type="button" data-progress-board="flashback">${esc(t('modeFlashback', {}, lang))}</button>
  </div><section id="progressPanel"></section><p class="field-hint">${esc(footerNote)}</p>`, true);

  const host = $('#progressPanel');
  if (!host) return;

  let activeClient = isOffline ? null : sb;
  if (!isOffline && !activeClient) {
    host.innerHTML = `<div class="section-header"><div><h2>${esc(t('mySubTitle', {}, lang))}</h2><p class="section-subtitle">${esc(t('statusSyncing', {}, lang))}</p></div></div><p class="empty-note">${esc(t('emptyTitleLoading', {}, lang))}</p>`;
    try {
      activeClient = await ensureSupabaseClient();
      await syncAuth();
    } catch (err) {
      if (!host.isConnected) return;
      host.innerHTML = `<div class="section-header"><div><h2>${esc(t('mySubTitle', {}, lang))}</h2></div></div><div class="empty-state"><h3>${esc(L('Unable to reach live server', '暂时无法连接实时服务器', lang))}</h3><p>${esc(err?.message || t('offlineSyncFail', {}, lang))}</p><div class="form-actions"><button type="button" class="outline-btn" data-progress-board="${esc(mode)}">${esc(L('Retry ↻', '重试 ↻', lang))}</button></div></div>`;
      return;
    }
    if (!host.isConnected) return;
  }

  mountSubmissionProgress(host, {
    client: activeClient,
    ownerId: isOffline ? null : state.user?.id,
    table: flashback ? 'submissions' : 'mane_entries',
    columns: flashback ? 'stage_id,group_code,carry_name,rounds,team,resonance_ten' : 'map_id,division,carry,score,team',
    offlineRows,
    onClearOffline: isOffline
      ? () => {
          clearOfflineSubmissions(flashback ? 'flashback' : 'mane');
          hydrateFromOfflineSnapshot();
          render();
          toast(t('offlineClearedToast', {}, lang));
          return [];
        }
      : null,
    lang,
    describe(row) {
      const who = row.display_name ? `${row.display_name} · ` : '';
      if (!flashback) {
        const map = state.maneMaps.find((item) => item.id === row.map_id);
        const bossTitle = map ? displayBossName(map.name, lang) : L('Hidden Boss', '已隐藏地图', lang);
        return {
          title: bossTitle,
          summary: `${who}${localizeDivision(row.division, lang)} · ${t('mainDpsLabel', {}, lang)}: ${displayCarryNames(row.carry, lang)} · ${formatScore(row.score, lang)}`
        };
      }
      const stage = state.fbStages.find((item) => item.id === row.stage_id);
      const stageTitle = stage ? localizeStageName(stage, lang) : L('Hidden Stage', '已隐藏关卡', lang);
      return {
        title: stageTitle,
        summary: `${who}${localizeDivision(row.group_code, lang)}${row.resonance_ten ? ` · ${t('res10Badge', {}, lang)}` : ''} · ${t('mainDpsLabel', {}, lang)}: ${displayCarryNames(row.carry_name, lang)} · ${t('roundsFull', { n: row.rounds }, lang)}`
      };
    }
  });
}

function openLoginModal() {
  const lang = getLang();
  openModal(`
    <div class="modal-eyebrow">ADMIN AUTHENTICATION</div>
    <h2>${esc(t('loginTitle', {}, lang))}</h2>
    <p class="modal-subtitle">${esc(t('loginSub', {}, lang))}</p>
    <form id="adminLoginForm">
      <div class="field">
        <label for="adminEmail">${esc(t('loginEmail', {}, lang))} *</label>
        <input id="adminEmail" name="email" type="email" required autocomplete="email" />
      </div>
      <span class="field-hint">${esc(L('A one-time magic sign-in link will be sent to your authorized moderator email.', '收到邮件后，请在同一浏览器内打开一次性登录链接并返回本页。', lang))}</span>
      <div class="form-actions">
        <button type="button" class="outline-btn" data-action="close-modal">${esc(t('btnCancel', {}, lang))}</button>
        <button type="submit" class="copper-btn">${esc(t('loginBtn', {}, lang))}</button>
      </div>
    </form>`);
}

function openProfileModal(forFbSubmit = false) {
  const lang = getLang();
  openModal(`
    <div class="modal-eyebrow">ACCOUNT &amp; PROFILE</div>
    <h2>${esc(t('profileTitle', {}, lang))}</h2>
    <form id="profileForm" data-for-fb="${forFbSubmit}">
      <div class="field">
        <label for="profileNick">${esc(t('profileDisplayName', {}, lang))}</label>
        <input id="profileNick" name="name" required minlength="2" maxlength="24" value="${esc(state.profile?.display_name || '')}" />
      </div>
      <div class="form-actions">
        ${state.user?.is_anonymous
          ? `<button type="button" class="outline-btn" data-action="open-login">${esc(t('btnAdminLogin', {}, lang))}</button>`
          : `<button type="button" class="outline-btn" data-action="logout">${esc(t('logoutBtn', {}, lang))}</button>`}
        ${state.isAdmin ? `<button type="button" class="outline-btn" data-action="open-admin">${esc(t('btnAdmin', {}, lang))}</button>` : ''}
        <button type="submit" class="copper-btn">${esc(t('profileSave', {}, lang))}</button>
      </div>
    </form>`);
}

function renderAdminBuildSummaryHtml(row, lang = getLang()) {
  const { psychubes, resonanceCodes } = extractRecordBuilds(row);
  if (!psychubes.some(Boolean) && !resonanceCodes.some(Boolean)) return '';
  const items = (row.team || []).map((name, i) => {
    const p = psychubes[i] || '';
    const r = resonanceCodes[i] || '';
    if (!p && !r) return '';
    const cLabel = displayCharacterName(name, lang);
    const pLabel = p ? displayPsychubeName(p, lang) : '';
    return `${esc(cLabel)}: ${pLabel ? `${esc(t('buildTagPsy', {}, lang))} [${esc(pLabel)}]` : ''}${pLabel && r ? ' · ' : ''}${r ? `${esc(t('buildTagRes', {}, lang))} ${esc(r)}` : ''}`;
  }).filter(Boolean);
  return items.length ? `<br/>${esc(L('Builds', '配装', lang))}: ${items.join(' | ')}` : '';
}

const adminFilters = {
  mane: { tab: '', name: '', location: '', division: '', page: 0 },
  flashback: { tab: '', name: '', location: '', division: '', page: 0 }
};
const moderationReloads = new WeakMap();

async function renderFilteredAdmin(list, mode, tab, locationLabel, groups, fetchRows, renderRows) {
  const lang = getLang();
  if (!list?.isConnected) return;
  const filters = adminFilters[mode];
  if (filters.tab !== tab) {
    filters.tab = tab;
    filters.page = 0;
  }
  if (!groups.some(([, items]) => items.some(([id]) => id === filters.location))) {
    filters.location = '';
  }
  list.insertAdjacentHTML('beforebegin', moderationFilterFields(filters, locationLabel, groups, lang));

  let request = 0;
  async function load(keepRows = false) {
    const current = ++request;
    if (!keepRows) list.textContent = t('emptyTitleLoading', {}, lang);
    try {
      const rows = await fetchRows(filters);
      if (!list.isConnected || current !== request) return;
      if (!rows.length && filters.page > 0) {
        filters.page--;
        return load(keepRows);
      }
      list.innerHTML = renderRows(rows.slice(0, moderationPageSize)) +
        moderationPager(filters.page, rows.length > moderationPageSize, lang);
    } catch (error) {
      if (list.isConnected && current === request) list.textContent = `${L('Load failed', '读取失败', lang)}: ${error.message}`;
    }
  }
  moderationReloads.set(list, { tab, load });
  bindModerationFilters(list.previousElementSibling, list, filters, load);
  await load();
}

async function finishReview(dialog, board, tab, message, { changedRankings = false, card = null } = {}) {
  if (changedRankings) reviewedBoards.add(board);
  toast(message);
  if (!dialog?.isConnected) {
    void refreshReviewedBoards();
    return;
  }
  const current = moderationReloads.get(dialog.querySelector('#adminList'));
  if (current?.tab === tab) {
    card?.remove();
    await current.load(true);
  } else if (board === 'mane') {
    await openManeAdmin(tab);
  } else {
    await openFbAdmin(tab);
  }
}

async function showReviewProof(button) {
  const lang = getLang();
  const card = button.closest('.review-card');
  const box = card?.querySelector('.review-proof');
  if (!box) return;
  const status = box.querySelector('.review-proof-status');
  const original = button.dataset.proofSize === 'original';
  const size = original ? 'original' : 'preview';
  if (box.dataset.proofSize === size) return;
  const board = button.dataset.maneProof ? 'mane' : 'flashback';
  const id = button.dataset.maneProof || button.dataset.fbProof;
  const controls = card.querySelectorAll('[data-mane-proof], [data-fb-proof]');
  if ([...controls].some((control) => control.disabled)) return;
  controls.forEach((control) => { control.disabled = true; });
  status.textContent = original ? L('Loading original image…', '正在读取原图…', lang) : L('Generating preview…', '正在生成截图预览…', lang);
  try {
    let file;
    if (original) {
      const table = board === 'mane' ? 'mane_entries' : 'submissions';
      const bucket = board === 'mane' ? 'mane-proofs' : 'proofs';
      const row = await checked(sb.from(table).select('evidence_path').eq('id', id).single());
      file = await checked(sb.storage.from(bucket).download(row.evidence_path));
    } else {
      file = await checked(sb.functions.invoke('moderation-proof-preview', {
        body: { board, id }, region: 'ap-northeast-1', timeout: 15000
      }));
      if (file instanceof Blob) file = new Blob([file], { type: 'image/jpeg' });
    }

    const img = await decodeImageFile(file);
    if (!box.isConnected) return;
    img.alt = original ? L('Original proof screenshot', '审核截图原图', lang) : L('Proof preview', '审核截图预览', lang);
    img.className = 'proof-img';
    box.querySelector('.review-proof-image').replaceChildren(img);
    box.dataset.proofSize = size;
    status.textContent = original ? L('Showing original image.', '正在显示原图。', lang) : L('Showing compressed preview.', '正在显示压缩预览。', lang);
  } catch {
    if (box.isConnected) {
      status.textContent = original
        ? L('Failed to load original screenshot.', '原图读取失败，截图可能已过期。', lang)
        : L('Preview unavailable; try View Original.', '预览暂不可用，可选择「查看原图」。', lang);
    }
  } finally {
    controls.forEach((control) => { control.disabled = false; });
  }
}

function reviewProofHtml(board, id, hasProof, lang = getLang()) {
  if (!hasProof) return '';
  const attribute = board === 'mane' ? 'data-mane-proof' : 'data-fb-proof';
  return `
    <div class="review-proof">
      <span class="review-proof-status" role="status"></span>
      <div class="review-proof-image"></div>
    </div>
    <div class="review-actions">
      <button type="button" class="outline-btn" ${attribute}="${esc(id)}">${esc(L('Preview Proof', '查看截图预览', lang))}</button>
      <button type="button" class="text-link-btn" ${attribute}="${esc(id)}" data-proof-size="original">${esc(L('View Original', '查看原图', lang))}</button>
    </div>`;
}

function openManeExport(status) {
  const lang = getLang();
  if (!state.isAdmin) return toast(L('Admin access required.', '仅管理员可导出成绩。', lang));
  const groups = new Map();
  for (const map of state.maneMaps) {
    const group = `${map.edition} · ${localizeSection(map.section, lang)}`;
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group).push(map);
  }
  openModal(`
    <div class="modal-eyebrow">MANE’S BULLETIN · EXPORT</div>
    <h2>${esc(t('adminExportExcel', {}, lang))}</h2>
    <form id="maneExportForm">
      <fieldset style="border:1px solid var(--line-hair);margin:0 0 12px;min-width:0">
        <legend>${esc(L('Sheets', '导出内容', lang))}</legend>
        <div style="display:flex;flex-wrap:wrap;gap:12px">
          <label><input type="checkbox" name="sheet" value="daily" checked> ${esc(t('navDaily', {}, lang))}</label>
          <label><input type="checkbox" name="sheet" value="totals" checked> ${esc(t('navTotals', {}, lang))}</label>
        </div>
      </fieldset>
      <div class="form-grid">
        <div class="field"><label for="maneExportDivision">${esc(t('fieldDivision', {}, lang))}</label>
          <select id="maneExportDivision" name="division">${optionsHtml([['', t('dailyAllDivisions', {}, lang)], ...Object.entries(divisionLabelsMap(lang))], '')}</select>
        </div>
      </div>
      <fieldset style="border:1px solid var(--line-hair);margin:0 0 12px;min-width:0">
        <legend>${esc(t('fieldBoss', {}, lang))}</legend>
        <div class="form-actions" style="justify-content:flex-start;margin:6px 0">
          <button type="button" class="outline-btn" data-mane-export-maps="all">${esc(t('afflatusAll', {}, lang))}</button>
          <button type="button" class="outline-btn" data-mane-export-maps="none">${esc(t('resetFilter', {}, lang))}</button>
        </div>
        <div style="max-height:190px;overflow:auto">
          ${[...groups].map(([group, maps]) => `<div>
            <strong class="field-hint">${esc(group)}</strong>
            ${maps.map((map) => `<label style="display:flex;align-items:center;gap:8px">
              <input type="checkbox" name="map" value="${esc(map.id)}" checked> ${esc(displayBossName(map.name, lang))}
            </label>`).join('')}
          </div>`).join('')}
        </div>
      </fieldset>
      <div class="form-actions">
        <button type="button" class="outline-btn" data-mane-admin="${esc(status)}">${esc(t('btnCancel', {}, lang))}</button>
        <button type="submit" class="copper-btn">${esc(t('btnExportExcel', {}, lang))}</button>
      </div>
    </form>`, true);
}

async function submitManeExport(form) {
  const lang = getLang();
  if (!state.isAdmin) throw new Error(L('Admin access required.', '仅管理员可导出成绩。', lang));
  const fields = new FormData(form);
  const sheets = new Set(fields.getAll('sheet'));
  const selected = new Set(fields.getAll('map'));
  const maps = state.maneMaps.filter((map) => selected.has(map.id));
  if (!sheets.size) throw new Error(L('Select at least one sheet.', '请至少选择一种导出内容。', lang));
  if (!maps.length) throw new Error(L('Select at least one boss.', '请至少选择一个关卡。', lang));
  const division = fields.get('division');
  if (division && !DIVISION_KEYS.includes(division)) throw new Error(L('Invalid division.', '筛选条件无效。', lang));
  const date = todayInBeijing();
  const [dailyRows, totals] = await Promise.all([
    sheets.has('daily') ? loadManeDailyRows({ date, division, mapIds: maps.map((map) => map.id) }) : null,
    sheets.has('totals') ? loadPages('mane_carry_total_leaderboard', ['section', 'edition', 'division', 'carry_key']) : null
  ]);
  if (!form.isConnected || !state.isAdmin) return;
  await exportManeWorkbook({
    date,
    divisions: division ? [division] : DIVISION_KEYS,
    maps,
    dailyRows,
    totals,
    divisionLabels: divisionLabelsMap(lang),
    sectionLabels: sectionLabelsMap(lang),
    lang,
    canDownload: () => form.isConnected && state.isAdmin
  });
}

async function openManeAdmin(status = 'pending') {
  const lang = getLang();
  if (!state.isAdmin || !sb) return toast(L('Admin access required.', '仅管理员可访问审核后台。', lang));
  openModal(`
    <div class="modal-eyebrow">MODERATION · ${esc(t('modeMane', {}, lang))}</div>
    <h2>${esc(t('adminTitle', {}, lang))}</h2>
    <div class="moderation-tabs">
      ${ADMIN_STATUS_KEYS.map((k) =>
        `<button type="button" class="outline-btn ${k === status ? 'selected' : ''}" data-mane-admin="${k}">${esc(localizeStatus(k, lang))}</button>`
      ).join('')}
      <button type="button" class="outline-btn" data-mane-export="${esc(status)}">${esc(t('adminExportExcel', {}, lang))}</button>
      <button type="button" class="outline-btn" data-action="mane-maps-admin">${esc(t('adminMapsManage', {}, lang))}</button>
      <button type="button" class="ghost-btn" data-action="fb-admin-open">${esc(t('modeFlashback', {}, lang))} ⇄</button>
    </div>
    <div id="adminList"><p class="modal-subtitle">${esc(t('emptyTitleLoading', {}, lang))}</p></div>`, true);

  const list = $('#adminList');
  try {
    const maps = await checked(sb.from('mane_maps').select('id,name,section,edition,active')
      .order('edition', { ascending: false }).order('position'));
    const groups = new Map();
    for (const map of maps) {
      const label = `${map.edition} · ${localizeSection(map.section, lang)}`;
      if (!groups.has(label)) groups.set(label, []);
      const bName = displayBossName(map.name, lang);
      groups.get(label).push([map.id, map.active ? bName : `${bName} (${L('Hidden', '隐藏', lang)})`]);
    }
    const fetchRows = (filters) => checked(filterModerationRows(
      sb.from('mane_entries')
        .select('*,submission_contacts(contact)')
        .eq('status', status)
        .is('archived_at', null),
      filters, 'map_id', 'division'
    ));
    const teamJoiner = isEn(lang) ? ', ' : '、';
    await renderFilteredAdmin(list, 'mane', status, t('fieldBoss', {}, lang), [...groups], fetchRows, (rows) => rows.length
      ? rows.map((row) => {
          const map = maps.find((m) => m.id === row.map_id);
          return `
            <article class="review-card" data-entry="${esc(row.id)}" data-revision="${esc(row.updated_at)}" data-status="${esc(status)}">
              <div class="review-top">
                <strong>${esc(row.display_name)}</strong>
                <span class="score-value" style="font-size:16px">${formatScore(row.score, lang)}</span>
              </div>
              <div class="review-meta">
                ${esc(map ? displayBossName(map.name, lang) : L('Hidden Boss', '已隐藏地图', lang))} · ${esc(localizeDivision(row.division, lang))} · ${esc(formatDateTime(row.created_at, lang))}<br/>
                ${esc(t('mainDpsLabel', {}, lang))}: ${esc(displayCarryNames(row.carry, lang))} | ${esc(t('colLineup', {}, lang))}: ${esc((row.team || []).map((n) => displayCharacterName(n, lang)).join(teamJoiner))}
                ${renderAdminBuildSummaryHtml(row, lang)}
                ${row.review_note ? `<br/>${esc(L('Note', '备注', lang))}: ${esc(row.review_note)}` : ''}
              </div>
              ${adminContact(row.submission_contacts, lang)}${safeLinkHtml(row.related_url, t('relatedLink', {}, lang))}
              ${reviewProofHtml('mane', row.id, row.evidence_path, lang)}
              <div class="review-actions">
                <button type="button" class="outline-btn" data-mane-edit="${esc(row.id)}">${esc(t('adminEdit', {}, lang))}</button>
                ${status === 'pending' ? `<button type="button" class="approve-btn" data-mane-decision="approved">✓ ${esc(t('adminApprove', {}, lang))}</button><button type="button" class="danger-btn" data-mane-decision="rejected">× ${esc(t('adminReject', {}, lang))}</button>` : ''}
                ${status === 'approved' ? `<button type="button" class="danger-btn" data-mane-decision="removed">${esc(t('adminDelete', {}, lang))}</button>` : ''}
                ${status === 'rejected' ? `<button type="button" class="approve-btn" data-action="mane-reopen">${esc(L('Reopen', '退回待审核', lang))}</button><button type="button" class="danger-btn" data-action="mane-delete-rejected">${esc(t('adminDelete', {}, lang))}</button>` : ''}
              </div>
            </article>`;
        }).join('')
      : `<div class="empty-state"><h3>${esc(t('emptyTitleEmpty', {}, lang))}</h3></div>`);
  } catch (err) {
    if (list?.isConnected) list.innerHTML = `<p class="modal-subtitle">${esc(err.message)}</p>`;
  }
}

async function openManeMapsAdmin() {
  const lang = getLang();
  if (!state.isAdmin || !sb) return;
  const maps = await checked(sb.from('mane_maps').select('*').order('edition', { ascending: false }).order('position'));
  openModal(`
    <div class="modal-eyebrow">MANE MAPS</div>
    <h2>${esc(t('adminMapsManage', {}, lang))}</h2>
    <div class="moderation-tabs"><button type="button" class="outline-btn" data-mane-admin="pending">← ${esc(t('btnCancel', {}, lang))}</button></div>
    <form id="maneMapForm" style="margin-bottom:18px">
      <div class="form-grid">
        <div class="field"><label for="mmName">${esc(t('fieldBoss', {}, lang))} *</label><input id="mmName" name="name" required maxlength="60" /></div>
        <div class="field"><label for="mmEd">${esc(t('fieldVersion', {}, lang))} *</label><input id="mmEd" name="edition" required maxlength="30" value="${esc(maps[0]?.edition || '4.1')}" /></div>
        <div class="field"><label for="mmSec">${esc(t('sectionLabel', {}, lang))}</label><select id="mmSec" name="section">${optionsHtml(Object.entries(sectionLabelsMap(lang)), 'new')}</select></div>
        <div class="field"><label for="mmPos">${esc(L('Order', '排序值', lang))}</label><input id="mmPos" name="position" type="number" min="1" value="100" required /></div>
      </div>
      <div class="form-actions"><button type="submit" class="copper-btn">${esc(L('Add Boss', '新增首领地图', lang))}</button></div>
    </form>
    ${maps.map((m) => `
      <article class="review-card" style="display:flex;align-items:center;justify-content:space-between;gap:12px">
        <div>
          <strong>${esc(displayBossName(m.name, lang))}</strong>
          <div class="review-meta" style="margin:2px 0 0">${esc(m.edition)} · ${esc(localizeSection(m.section, lang))} · ${esc(m.active ? L('Visible', '显示中', lang) : L('Hidden', '已隐藏', lang))}</div>
        </div>
        <button type="button" class="outline-btn" data-toggle-mane-map="${esc(m.id)}" data-active="${m.active}">${esc(m.active ? L('Hide', '隐藏地图', lang) : L('Restore', '恢复显示', lang))}</button>
      </article>`).join('')}`, true);
}

async function openFbAdmin(tab = 'pending', openStage = '') {
  const lang = getLang();
  if (!state.isAdmin || !sb) return toast(L('Admin access required.', '仅管理员可访问审核后台。', lang));
  if (!FB_ADMIN_TAB_KEYS.includes(tab)) tab = 'pending';
  openModal(`
    <div class="modal-eyebrow">MODERATION · ${esc(t('modeFlashback', {}, lang))}</div>
    <h2>${esc(t('adminTitle', {}, lang))}</h2>
    <div class="moderation-tabs">
      ${FB_ADMIN_TAB_KEYS
        .filter((k) => k !== 'historical' || state.fbArchives.length)
        .map((k) => `<button type="button" class="outline-btn ${k === tab ? 'selected' : ''}" data-fb-admin="${k}">${esc(localizeStatus(k, lang))}</button>`)
        .join('')}
      <button type="button" class="outline-btn" data-action="fb-versions-admin">${esc(t('adminVersionsManage', {}, lang))}</button>
      <button type="button" class="ghost-btn" data-mane-admin="pending">${esc(t('modeMane', {}, lang))} ⇄</button>
    </div>
    <div id="adminList"><p class="modal-subtitle">${esc(t('emptyTitleLoading', {}, lang))}</p></div>`, true);

  const list = $('#adminList');
  if (tab === 'historical') {
    list.innerHTML = state.fbVersions.flatMap((v) => standardStages(v.id).map((st) => {
      const rows = state.fbArchives.filter((a) => a.stage_id === st.id).sort((a, b) => a.display_order - b.display_order);
      if (!rows.length) return '';
      return `<details class="review-card" ${openStage === st.id ? 'open' : ''}>
        <summary>${esc(localizeVersionLabel(v, lang))} · ${esc(localizeStageName(st, lang))} · ${rows.length}</summary>
        ${rows.map((r) => `<div class="review-card" style="margin-top:8px">
          <strong>${esc(r.credited_player)}</strong>
          <div class="review-meta">${esc(t('mainDpsLabel', {}, lang))}: ${(r.carry_names || []).map((c) => esc(displayCharacterName(c, lang))).join(' / ')} · ${esc(r.lineup_label)}</div>
          <button type="button" class="danger-btn" data-fb-archive="fb-archive-history" data-id="${esc(r.id)}" data-stage="${esc(st.id)}">${esc(t('adminDelete', {}, lang))}</button>
        </div>`).join('')}
      </details>`;
    })).join('') || `<p class="modal-subtitle">${esc(t('emptyTitleEmpty', {}, lang))}</p>`;
    return;
  }

  try {
    const groups = state.fbVersions.map((v) =>
      [localizeVersionLabel(v, lang), standardStages(v.id).map((stage) => [stage.id, localizeStageName(stage, lang)])]);
    const fetchRows = async (filters) => {
      const rows = await checked(filterModerationRows(
        sb.from('flashback_moderation_list').select('*').eq('status', tab),
        filters, 'stage_id', 'group_code'
      ));
      if (!rows.length) return rows;
      const builds = await checked(sb.from('submissions').select('id,team_psychubes,team_resonance_codes')
        .in('id', rows.slice(0, moderationPageSize).map((row) => row.id)));
      const buildsById = new Map(builds.map((build) => [build.id, build]));
      return rows.map((row) => ({ ...row, ...buildsById.get(row.id) }));
    };
    const teamJoiner = isEn(lang) ? ' / ' : ' / ';
    await renderFilteredAdmin(list, 'flashback', tab, t('fieldStage', {}, lang), groups, fetchRows, (rows) => rows.length
      ? rows.map((r) => {
          const st = state.fbStages.find((s) => s.id === r.stage_id);
          const v = state.fbVersions.find((x) => x.id === st?.version_id);
          return `
            <article class="review-card">
              <div class="review-top">
                <strong>${esc(r.display_name)} <span class="division-chip">${esc(t('roundsFull', { n: r.rounds }, lang))}</span></strong>
                <span style="font-size:12px;color:var(--ink-muted)">${esc(formatDateTime(r.created_at, lang))}</span>
              </div>
              <div class="review-meta">
                ${esc(v ? localizeVersionLabel(v, lang) : '')} · ${esc(st ? localizeStageName(st, lang) : '')} · ${esc(localizeDivision(r.group_code, lang))}<br/>
                ${esc(t('mainDpsLabel', {}, lang))}: ${esc(displayCarryNames(r.carry_name, lang))} | ${esc(t('colLineup', {}, lang))}: ${(r.team || []).map((n) => esc(displayCharacterName(n, lang))).join(teamJoiner)}
                ${renderAdminBuildSummaryHtml(r, lang)}
                ${r.review_note ? `<br/>${esc(L('Note', '备注', lang))}: ${esc(r.review_note)}` : ''}
              </div>
              ${r.resonance_ten ? resonanceBadgeHtml(lang) : ''}${adminContact(r.contact, lang)}${safeLinkHtml(r.related_url, t('relatedLink', {}, lang))}
              ${reviewProofHtml('flashback', r.id, r.evidence_path, lang)}
              <div class="review-actions">
                ${tab === 'pending' ? `<button type="button" class="approve-btn" data-fb-review="approved" data-id="${esc(r.id)}">✓ ${esc(t('adminApprove', {}, lang))}</button><button type="button" class="danger-btn" data-fb-review="rejected" data-id="${esc(r.id)}">× ${esc(t('adminReject', {}, lang))}</button>` : ''}
                ${tab === 'approved' ? `<button type="button" class="danger-btn" data-fb-remove="${esc(r.id)}">${esc(t('adminDelete', {}, lang))}</button>` : ''}
                ${tab === 'rejected' ? `<button type="button" class="approve-btn" data-fb-reopen="${esc(r.id)}">${esc(L('Reopen', '退回待审核', lang))}</button>` : ''}
                <button type="button" class="outline-btn" data-fb-edit="${esc(r.id)}" data-tab="${esc(tab)}">${esc(t('adminEdit', {}, lang))}</button>
                <button type="button" class="danger-btn" data-fb-archive="fb-archive-record" data-id="${esc(r.id)}" data-tab="${esc(tab)}">${esc(L('Archive', '删除成绩', lang))}</button>
              </div>
            </article>`;
        }).join('')
      : `<div class="empty-state"><h3>${esc(t('emptyTitleEmpty', {}, lang))}</h3></div>`);
  } catch (err) {
    if (list?.isConnected) list.innerHTML = `<p class="modal-subtitle">${esc(err.message)}</p>`;
  }
}

function openFbVersionManager() {
  const lang = getLang();
  if (!state.isAdmin) return;
  openModal(`
    <div class="modal-eyebrow">FLASHBACK CYCLES</div>
    <h2>${esc(t('adminVersionsManage', {}, lang))}</h2>
    <div class="moderation-tabs">
      <button type="button" class="outline-btn" data-fb-admin="pending">← ${esc(t('btnCancel', {}, lang))}</button>
      <button type="button" class="copper-btn" data-fb-edit-version="">+ ${esc(L('New Cycle', '新建版本', lang))}</button>
    </div>
    ${state.fbVersions.map((v) => `
      <article class="review-card">
        <strong>${esc(localizeVersionLabel(v, lang))}</strong>
        <ul class="review-meta" style="margin:6px 0">
          ${standardStages(v.id).map((s) => `<li>${esc(localizeStageName(s, lang))}${challengeOccurrences(s) > 1 ? ` · ${esc(L('Linked recurring stage', '关联重复关卡', lang))}` : ''}</li>`).join('')}
        </ul>
        <div class="review-actions">
          <button type="button" class="outline-btn" data-fb-edit-version="${esc(v.id)}">${esc(t('adminEdit', {}, lang))}</button>
          <button type="button" class="danger-btn" data-fb-archive="fb-archive-version" data-id="${esc(v.id)}">${esc(t('adminDelete', {}, lang))}</button>
        </div>
      </article>`).join('') || `<p class="modal-subtitle">${esc(t('emptyTitleEmpty', {}, lang))}</p>`}`, true);
}

function openFbVersionEditor(versionId = '') {
  const lang = getLang();
  const version = state.fbVersions.find((v) => v.id === versionId);
  const stages = standardStages(versionId);
  const repeatOpts = (stage) => {
    const groups = new Map();
    for (const v of state.fbVersions) {
      for (const c of standardStages(v.id)) {
        if (c.id === stage?.id || groups.has(c.challenge_id)) continue;
        groups.set(c.challenge_id, `${v.code} · ${localizeStageName(c, lang)}`);
      }
    }
    if (stage && !groups.has(stage.challenge_id)) groups.set(stage.challenge_id, L('Keep current link', '保留此关当前归属', lang));
    return `<option value="">${esc(stage ? L('Unlink as standalone stage', '取消关联，作为新独立关卡', lang) : L('Standalone stage', '作为独立关卡', lang))}</option>` +
      [...groups.entries()].map(([id, lbl]) => `<option value="${esc(id)}"${id === stage?.challenge_id ? ' selected' : ''}>${esc(lbl)}</option>`).join('');
  };
  openModal(`
    <h2>${esc(version ? L('Edit Cycle', '编辑版本', lang) : L('New Cycle', '新建版本', lang))}</h2>
    <form id="fbVersionForm" data-id="${esc(versionId)}">
      <div class="form-grid">
        <div class="field"><label for="fvCode">${esc(L('Version Code *', '版本代号 *', lang))}</label><input id="fvCode" name="code" required maxlength="30" value="${esc(version?.code || '')}" /></div>
        <div class="field"><label for="fvLabel">${esc(L('Display Label *', '展示名称 *', lang))}</label><input id="fvLabel" name="label" required maxlength="80" value="${esc(version?.label || '')}" /></div>
      </div>
      ${[1, 2, 3].map((i) => {
        const st = stages.find((s) => s.stage_no === i);
        return `<div class="form-grid">
          <div class="field"><label for="fvSt${i}">${esc(L(`Stage ${i} Name *`, `第 ${i} 关名称 *`, lang))}</label><input id="fvSt${i}" name="stage${i}" required maxlength="80" value="${esc(st?.name || '')}" /></div>
          <div class="field"><label for="fvRep${i}">${esc(L(`Stage ${i} · Recurring Link`, `第 ${i} 关 · 关联重复关卡`, lang))}</label><select id="fvRep${i}" name="repeat${i}">${repeatOpts(st)}</select></div>
        </div>`;
      }).join('')}
      <div class="form-actions">
        <button type="button" class="outline-btn" data-action="fb-versions-admin">${esc(t('btnCancel', {}, lang))}</button>
        <button type="submit" class="copper-btn">${esc(t('btnSaveChanges', {}, lang))}</button>
      </div>
    </form>`, true);
}

/* ==================== Master Render Entry ==================== */
function render() {
  closeGlossaryPopover();
  posterIndex.clear();
  renderChrome();
  renderMasthead();
  $('#workspace').innerHTML = state.mode === 'mane'
    ? renderManeWorkspace()
    : renderFlashbackWorkspace();
  writeHash();

  const dailyResults = $('#maneDailyResults');
  if (dailyResults) void fillManeDailyResults(dailyResults);

  // Center active boss/stage horizontally on mobile scrollable strip without shifting page scroll
  const dossierList = document.querySelector('.dossier-list');
  const activeDossier = dossierList?.querySelector('.dossier-item.active');
  if (dossierList && activeDossier && dossierList.scrollWidth > dossierList.clientWidth + 4) {
    const targetLeft = activeDossier.offsetLeft - (dossierList.clientWidth - activeDossier.offsetWidth) / 2;
    dossierList.scrollLeft = Math.max(0, targetLeft);
  }

  if (pendingScrollRecordId) {
    const target = document.querySelector(`[data-record-row="${CSS.escape(pendingScrollRecordId)}"]`);
    if (target) {
      pendingScrollRecordId = '';
      requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    }
  }
}

/* ==================== Global Event Delegation ==================== */
document.addEventListener('click', async (ev) => {
  if (state.glossaryOpen && !ev.target.closest('#glossaryPopoverRoot') && !ev.target.closest('[data-glossary-term]')) {
    closeGlossaryPopover();
  }

  const proofImg = ev.target.closest('.proof-img, .proof-upload-preview img');
  if (proofImg?.src) {
    openProofLightbox(proofImg.src, proofImg.alt || L('Screenshot zoom preview', '截图放大预览'));
    return;
  }

  const glossaryBtn = ev.target.closest('[data-glossary-term]');
  if (glossaryBtn) {
    openGlossaryPopover(glossaryBtn.dataset.glossaryTerm, glossaryBtn);
    return;
  }
  if (ev.target.closest('[data-action="close-glossary"]')) {
    closeGlossaryPopover();
    return;
  }

  const openPsyEl = ev.target.closest('[data-open-psy]');
  if (openPsyEl) {
    openPsychubeDossier(openPsyEl.dataset.openPsy);
    return;
  }
  const openCharEl = ev.target.closest('[data-open-char]');
  if (openCharEl) {
    openArcanistDossier(openCharEl.dataset.openChar);
    return;
  }
  const openPlayerEl = ev.target.closest('[data-open-player]');
  if (openPlayerEl) {
    openInvestigatorDossier(openPlayerEl.dataset.openPlayer);
    return;
  }

  const btn = ev.target.closest('button, a[data-switch-mode]');
  if (!btn) return;
  const dialog = btn.closest('.modal-box');

  try {
    // Instant EN / 中文 language toggle
    if (btn.dataset.setLang) {
      const nextLang = setLang(btn.dataset.setLang);
      updateUrlLangParam(nextLang);
      try {
        await ensureLangPack(nextLang);
      } catch (err) {
        console.warn('Language pack load failed:', err);
      }
      render();
      if (charPickerState.open) renderCharPicker();
      if (psyPickerState.open) renderPsychubePicker();
      return;
    }

    if (btn.dataset.modeSwitch) {
      state.mode = btn.dataset.modeSwitch;
      state.maneSelectedAppraisal = -1;
      state.highlightRecordId = '';
      state.mobileFilterOpen = false;
      render();
      return;
    }
    if (btn.dataset.switchMode) {
      ev.preventDefault();
      state.mode = btn.dataset.switchMode;
      state.manePage = 'scores';
      state.maneSelectedAppraisal = -1;
      state.highlightRecordId = '';
      state.mobileFilterOpen = false;
      render();
      return;
    }
    if (btn.dataset.subpage) {
      if (state.mode === 'mane') state.manePage = btn.dataset.subpage;
      else state.fbPage = btn.dataset.subpage;
      state.highlightRecordId = '';
      state.mobileFilterOpen = false;
      render();
      return;
    }

    // Sidebar / Board Intel Main DPS & Support click-to-filter
    if (btn.dataset.metaCarry) {
      const key = btn.dataset.metaCarry;
      const mode = btn.dataset.metaMode || state.mode;
      if (mode === 'mane') {
        state.maneRoleMode = 'carry';
        state.maneCarry = state.maneCarry === key ? '' : key;
      } else {
        state.fbRoleMode = 'carry';
        state.fbCarry = state.fbCarry === key ? '' : key;
      }
      render();
      return;
    }
    if (btn.dataset.metaMember) {
      const key = btn.dataset.metaMember;
      const mode = btn.dataset.metaMode || state.mode;
      if (mode === 'mane') {
        state.maneRoleMode = 'member';
        state.maneCarry = state.maneCarry === key ? '' : key;
      } else {
        state.fbRoleMode = 'member';
        state.fbCarry = state.fbCarry === key ? '' : key;
      }
      render();
      return;
    }

    // V2 Psychube Amplification Lv.1-Lv.5 switcher (live in-place modal update)
    if (btn.dataset.psyAmpLevel !== undefined) {
      const nextLv = Math.min(5, Math.max(1, Number(btn.dataset.psyAmpLevel) || 5));
      state.psyAmpLevel = nextLv;
      const host = $('#psyPassiveHost');
      if (host) {
        const lang = getLang();
        const detail = getPsychubeDetail(host.dataset.psyId || state.activePsyDossierId, lang);
        if (detail?.passive) {
          host.innerHTML = renderPsychubePassiveBlockHtml(detail.passive, nextLv, lang);
        }
      }
      return;
    }

    // V2 Appraisal milestone selection
    if (btn.dataset.selectAppraisal !== undefined) {
      const idx = Number(btn.dataset.selectAppraisal);
      state.maneSelectedAppraisal = state.maneSelectedAppraisal === idx ? -1 : idx;
      render();
      return;
    }

    // V2 Dossier filter current board
    if (btn.dataset.filterDossierChar) {
      const key = btn.dataset.filterDossierChar;
      if (state.mode === 'mane') {
        state.manePage = 'scores';
        state.maneRoleMode = 'member';
        state.maneCarry = key;
        state.maneAfflatus = '';
        state.maneQuery = '';
      } else {
        state.fbPage = 'leaderboard';
        state.fbRoleMode = 'member';
        state.fbCarry = key;
        state.fbAfflatus = '';
        state.fbQuery = '';
      }
      closeModal();
      render();
      return;
    }

    // V2 Poster card theme switcher (live toggle without closing modal)
    if (btn.dataset.posterTheme) {
      const nextTheme = btn.dataset.posterTheme === 'obsidian' ? 'obsidian' : 'parchment';
      state.posterTheme = nextTheme;
      const card = $('#activePosterCard');
      if (card) card.classList.toggle('is-obsidian', nextTheme === 'obsidian');
      document.querySelectorAll('[data-poster-theme]').forEach((b) => {
        const active = b.dataset.posterTheme === nextTheme;
        b.classList.toggle('active', active);
        b.setAttribute('aria-pressed', String(active));
      });
      return;
    }

    // Masthead / Dossier peak & fastest jump
    if (btn.dataset.jumpManeRecord) {
      if (dialog) closeModal();
      state.mode = 'mane';
      state.manePage = 'scores';
      state.maneSection = btn.dataset.jumpSection || 'new';
      state.maneMapId = btn.dataset.jumpMap || '';
      state.maneDivision = btn.dataset.jumpDiv || 'max';
      state.maneRoleMode = 'carry';
      state.maneCarry = '';
      state.maneAfflatus = '';
      state.maneQuery = '';
      state.maneSelectedAppraisal = -1;
      const pid = `mane-${btn.dataset.jumpManeRecord}`;
      state.highlightRecordId = pid;
      pendingScrollRecordId = pid;
      render();
      return;
    }
    if (btn.dataset.jumpFbRecord) {
      if (dialog) closeModal();
      state.mode = 'flashback';
      state.fbPage = 'leaderboard';
      state.fbVersionId = btn.dataset.jumpVer || '';
      state.fbStageId = btn.dataset.jumpStage || '';
      state.fbGroup = btn.dataset.jumpGrp || 'zero';
      state.fbResonanceOnly = false;
      state.fbRoleMode = 'carry';
      state.fbCarry = '';
      state.fbAfflatus = '';
      state.fbQuery = '';
      const pid = `fb-${btn.dataset.jumpFbRecord}`;
      state.highlightRecordId = pid;
      pendingScrollRecordId = pid;
      render();
      return;
    }

    if (btn.dataset.maneDailyDate) {
      state.maneDaily.date = btn.dataset.maneDailyDate;
      render();
      return;
    }
    if (btn.dataset.jumpManeCarry) {
      const carryKey = btn.dataset.jumpManeCarry;
      const preferredMap = btn.dataset.jumpMap || '';
      const sectionMaps = activeManeMaps(state.maneSection);
      const mapMatchesCarry = (mapId) => state.maneScores.some((r) =>
        r.map_id === mapId &&
        r.division === state.maneDivision &&
        splitCarries(r.carry).some((c) => canonicalCharacterKey(c) === carryKey)
      );
      let targetMap = (preferredMap && sectionMaps.some((m) => m.id === preferredMap) && mapMatchesCarry(preferredMap))
        ? preferredMap
        : '';
      if (!targetMap) {
        const hit = sectionMaps.find((m) => mapMatchesCarry(m.id));
        targetMap = hit?.id || (sectionMaps.some((m) => m.id === preferredMap) ? preferredMap : state.maneMapId);
      }
      state.mode = 'mane';
      state.manePage = 'scores';
      if (targetMap) state.maneMapId = targetMap;
      state.maneRoleMode = 'carry';
      state.maneCarry = carryKey;
      state.maneAfflatus = '';
      state.maneQuery = '';
      state.highlightRecordId = '';
      render();
      return;
    }
    if (btn.dataset.jumpManePlayer) {
      const playerName = btn.dataset.jumpManePlayer;
      state.mode = 'mane';
      state.manePage = 'scores';
      state.maneSection = btn.dataset.jumpSection || 'new';
      if (btn.dataset.jumpMap) state.maneMapId = btn.dataset.jumpMap;
      state.maneDivision = btn.dataset.jumpDiv || 'zero';
      state.maneRoleMode = 'carry';
      state.maneCarry = '';
      state.maneAfflatus = '';
      state.maneQuery = playerName;
      state.highlightRecordId = '';
      render();
      return;
    }
    if (btn.dataset.jumpFbCarry) {
      const carryKey = btn.dataset.jumpFbCarry;
      const matches = state.fbRecords.filter((r) =>
        splitCarries(r.carry_name).some((c) => canonicalCharacterKey(c) === carryKey)
      );
      const best =
        (state.fbCarryScope === 'period' && matches.find((r) => r.version_id === state.fbVersionId && r.stage_id === state.fbStageId && r.group_code === state.fbGroup)) ||
        (state.fbCarryScope === 'period' && matches.find((r) => r.version_id === state.fbVersionId && r.stage_id === state.fbStageId)) ||
        (state.fbCarryScope === 'period' && matches.find((r) => r.version_id === state.fbVersionId)) ||
        matches.find((r) => r.stage_id === state.fbStageId && r.group_code === state.fbGroup) ||
        matches[0];
      state.mode = 'flashback';
      state.fbPage = 'leaderboard';
      if (best) {
        state.fbVersionId = best.version_id || state.fbStages.find((s) => s.id === best.stage_id)?.version_id || state.fbVersionId;
        state.fbStageId = best.stage_id;
        state.fbGroup = best.group_code;
      }
      state.fbResonanceOnly = false;
      state.fbRoleMode = 'carry';
      state.fbCarry = carryKey;
      state.fbAfflatus = '';
      state.fbQuery = '';
      state.highlightRecordId = '';
      render();
      return;
    }
    if (btn.dataset.jumpFbPlayer) {
      const playerName = btn.dataset.jumpFbPlayer;
      const targetKey = normKey(playerName);
      const matches = state.fbRecords.filter((r) => normKey(r.display_name) === targetKey);
      const best =
        matches.find((r) => r.version_id === state.fbVersionId && r.stage_id === state.fbStageId && r.group_code === state.fbGroup) ||
        matches.find((r) => r.version_id === state.fbVersionId) ||
        matches[0];
      state.mode = 'flashback';
      state.fbPage = 'leaderboard';
      if (best) {
        state.fbVersionId = best.version_id || state.fbStages.find((s) => s.id === best.stage_id)?.version_id || state.fbVersionId;
        state.fbStageId = best.stage_id;
        state.fbGroup = best.group_code;
      }
      state.fbResonanceOnly = false;
      state.fbRoleMode = 'carry';
      state.fbCarry = '';
      state.fbAfflatus = '';
      state.fbQuery = playerName;
      state.highlightRecordId = '';
      render();
      return;
    }

    // Mane filters
    if (btn.dataset.maneSection) {
      state.maneSection = btn.dataset.maneSection;
      state.maneCarry = '';
      state.maneAfflatus = '';
      state.maneQuery = '';
      state.maneSelectedAppraisal = -1;
      state.highlightRecordId = '';
      render();
      return;
    }
    if (btn.dataset.maneMap) {
      state.maneMapId = btn.dataset.maneMap;
      state.maneCarry = '';
      state.maneSelectedAppraisal = -1;
      state.highlightRecordId = '';
      if (state.manePage !== 'scores') state.manePage = 'scores';
      render();
      return;
    }
    if (btn.dataset.maneDiv) {
      state.maneDivision = btn.dataset.maneDiv;
      state.maneCarry = '';
      state.maneSelectedAppraisal = -1;
      state.highlightRecordId = '';
      render();
      return;
    }
    if (btn.dataset.maneRole) {
      state.maneRoleMode = btn.dataset.maneRole;
      render();
      return;
    }
    if (btn.dataset.maneAff) {
      state.maneAfflatus = state.maneAfflatus === btn.dataset.maneAff ? '' : btn.dataset.maneAff;
      render();
      return;
    }
    if (btn.dataset.manePlayerScope) {
      state.manePlayerScope = btn.dataset.manePlayerScope;
      render();
      return;
    }
    if (btn.dataset.manePlayerDiv) {
      state.manePlayerDiv = btn.dataset.manePlayerDiv;
      render();
      return;
    }

    // Flashback filters
    if (btn.dataset.fbStage) {
      state.fbStageId = btn.dataset.fbStage;
      state.fbCarry = '';
      state.highlightRecordId = '';
      if (state.fbPage !== 'leaderboard') state.fbPage = 'leaderboard';
      render();
      return;
    }
    if (btn.dataset.fbGroup) {
      state.fbGroup = btn.dataset.fbGroup;
      if (state.fbGroup !== 'zero') state.fbResonanceOnly = false;
      state.fbCarry = '';
      state.highlightRecordId = '';
      render();
      return;
    }
    if (btn.dataset.fbRole) {
      state.fbRoleMode = btn.dataset.fbRole;
      render();
      return;
    }
    if (btn.dataset.fbAff) {
      state.fbAfflatus = state.fbAfflatus === btn.dataset.fbAff ? '' : btn.dataset.fbAff;
      render();
      return;
    }
    if (btn.dataset.fbCarryScope) {
      state.fbCarryScope = btn.dataset.fbCarryScope;
      render();
      return;
    }
    if (btn.dataset.fbCarryMetric) {
      state.fbCarryMetric = btn.dataset.fbCarryMetric;
      render();
      return;
    }

    // Poster modal, PNG export, deep link, copy text, resonance copy
    if (btn.dataset.poster) {
      openPoster(btn.dataset.poster);
      return;
    }
    if (btn.dataset.exportPoster) {
      const item = posterIndex.get(btn.dataset.exportPoster);
      if (item) {
        btn.disabled = true;
        const oldText = btn.textContent;
        btn.textContent = t('posterGenerating');
        try {
          await exportPosterPng(item);
          toast(t('posterSavedToast'));
        } finally {
          if (btn.isConnected) {
            btn.disabled = false;
            btn.textContent = oldText;
          }
        }
      }
      return;
    }
    if (btn.dataset.copyLink) {
      const item = posterIndex.get(btn.dataset.copyLink);
      if (item) {
        await copyText(buildRecordDeepLink(item));
        toast(t('posterCopiedLink'));
      }
      return;
    }
    if (btn.dataset.copyPoster) {
      const lang = getLang();
      const item = posterIndex.get(btn.dataset.copyPoster);
      if (item) {
        const teamText = (item.displayTeam || (item.team || []).map((n) => displayCharacterName(n, lang))).join(isEn(lang) ? ', ' : '、');
        const psyText = (item.psychubes || []).some(Boolean)
          ? (isEn(lang)
              ? ` | Psychubes: ${(item.psychubes || []).map((p) => (p ? displayPsychubeName(p, lang) : '—')).join(' / ')}`
              : `｜心相：${(item.psychubes || []).map((p) => (p ? displayPsychubeName(p, lang) : '—')).join('/')}`)
          : '';
        const resText = (item.resonanceCodes || []).some(Boolean)
          ? (isEn(lang)
              ? ` | Resonance: ${(item.resonanceCodes || []).map((c) => c || '—').join(' / ')}`
              : `｜共鸣码：${(item.resonanceCodes || []).map((c) => c || '—').join(' / ')}`)
          : '';
        const link = buildRecordDeepLink(item);
        const rankPrefix = item.rank > 0 ? `#${item.rank}` : t('posterDailyLabel', {}, lang);
        let text;
        if (isEn(lang)) {
          const res10Text = item.mode === 'flashback' && item.resonanceTen ? ' | All P0 R10' : '';
          text = item.mode === 'mane'
            ? `[Reverse: 1999 · Mane's Bulletin] ${rankPrefix} ${item.title} (${item.subtitle}) | Timekeeper: ${item.player} | Main DPS: ${item.carry} | Lineup: ${teamText}${psyText}${resText} | Score: ${formatScore(item.score, lang)} | ${link}`
            : `[Reverse: 1999 · Focused Flashback] ${rankPrefix} ${item.title} (${item.subtitle}${res10Text}) | Timekeeper: ${item.player} | Main DPS: ${item.carry} | Lineup: ${teamText}${psyText}${resText} | Clear: ${formatRounds(item.rounds, lang)} | ${link}`;
        } else {
          const res10Text = item.mode === 'flashback' && item.resonanceTen ? '｜全0塑·共鸣10' : '';
          text = item.mode === 'mane'
            ? `【重返未来：1999 鬃毛邮报】${rankPrefix} ${item.title}（${item.subtitle}）｜调查员：${item.player}｜主C：${item.carry}｜阵容：${teamText}${psyText}${resText}｜积分：${formatScore(item.score, lang)}｜${link}`
            : `【重返未来：1999 焦点闪回】${rankPrefix} ${item.title}（${item.subtitle}${res10Text}）｜玩家：${item.player}｜主C：${item.carry}｜阵容：${teamText}${psyText}${resText}｜成绩：${item.rounds} 回合｜${link}`;
        }
        await copyText(text);
        toast(t('posterCopiedText'));
      }
      return;
    }
    if (btn.dataset.copyAllRes) {
      const lang = getLang();
      const item = posterIndex.get(btn.dataset.copyAllRes);
      if (item) {
        const slotNames = (item.displayTeam && item.displayTeam.length && !isLegacyShorthandTeam(item.team))
          ? item.displayTeam
          : (item.team || []).map((n) => displayCharacterName(n, lang));
        const entries = (item.resonanceCodes || [])
          .map((code, idx) => ({ code: String(code || '').trim(), name: slotNames[idx] || t('slotLabel', { n: idx + 1 }, lang) }))
          .filter((entry) => entry.code);
        if (entries.length) {
          await copyText(entries.map((entry) => `${entry.name}: ${entry.code}`).join('\n'));
          toast(t('posterCopiedAllRes', { n: entries.length }, lang));
        }
      }
      return;
    }
    if (btn.dataset.copyResId) {
      const item = posterIndex.get(btn.dataset.copyResId);
      const idx = Number(btn.dataset.copyResIdx);
      const code = item?.resonanceCodes?.[idx];
      if (code) {
        await copyText(code);
        toast(t('posterCopiedRes'));
      }
      return;
    }

    // Team builder & codex pickers
    if (btn.dataset.toggleCarry !== undefined) {
      const idx = Number(btn.dataset.toggleCarry);
      if (canMarkSlotCarry(modalBuildState.chars[idx])) {
        modalBuildState.carries[idx] = !modalBuildState.carries[idx];
        refreshBuildSlotsGrid();
      }
      return;
    }
    if (btn.dataset.pickChar !== undefined) {
      openCharPicker(Number(btn.dataset.pickChar));
      return;
    }
    if (btn.dataset.clearChar !== undefined) {
      const idx = Number(btn.dataset.clearChar);
      modalBuildState.chars[idx] = '';
      modalBuildState.carries[idx] = false;
      modalBuildState.psychubes[idx] = '';
      modalBuildState.resonanceCodes[idx] = '';
      refreshBuildSlotsGrid();
      return;
    }
    if (btn.dataset.charAff !== undefined) {
      charPickerState.aff = btn.dataset.charAff;
      refreshCharPickerResults();
      return;
    }
    if (btn.dataset.charStar !== undefined) {
      charPickerState.star = btn.dataset.charStar;
      refreshCharPickerResults();
      return;
    }
    if (btn.dataset.chooseChar !== undefined) {
      if (charPickerState.open) chooseCharacterForSlot(btn.dataset.chooseChar);
      return;
    }
    if (btn.dataset.pickPsy !== undefined) {
      openPsychubePicker(Number(btn.dataset.pickPsy));
      return;
    }
    if (btn.dataset.clearPsy !== undefined) {
      const idx = Number(btn.dataset.clearPsy);
      modalBuildState.psychubes[idx] = '';
      refreshBuildSlotsGrid();
      return;
    }
    if (btn.dataset.psyStar !== undefined) {
      psyPickerState.star = btn.dataset.psyStar;
      refreshPsychubePickerResults();
      return;
    }
    if (btn.dataset.psyTag !== undefined) {
      psyPickerState.tag = btn.dataset.psyTag;
      refreshPsychubePickerResults();
      return;
    }
    if (btn.dataset.choosePsy !== undefined) {
      modalBuildState.psychubes[psyPickerState.slotIndex] = btn.dataset.choosePsy;
      refreshBuildSlotsGrid();
      closePsychubePicker();
      return;
    }

    const action = btn.dataset.action;
    if (action === 'toggle-intel-bar') {
      state.intelCollapsed = !state.intelCollapsed;
      render();
      return;
    }
    if (action === 'sync-live') {
      await syncLiveArchive();
      return;
    }
    if (action === 'export-offline-excel') {
      await exportOfflineExcel();
      return;
    }
    if (action === 'toggle-mobile-filter') {
      state.mobileFilterOpen = !state.mobileFilterOpen;
      render();
      return;
    }
    if (action === 'toggle-mane-mech') {
      state.maneMechOpen = !state.maneMechOpen;
      render();
      return;
    }
    if (action === 'toggle-fb-mech') {
      state.fbMechOpen = !state.fbMechOpen;
      render();
      return;
    }
    if (action === 'reset-mane-filter') {
      state.maneRoleMode = 'carry';
      state.maneCarry = '';
      state.maneAfflatus = '';
      state.maneQuery = '';
      render();
      return;
    }
    if (action === 'reset-fb-filter') {
      state.fbResonanceOnly = false;
      state.fbRoleMode = 'carry';
      state.fbCarry = '';
      state.fbAfflatus = '';
      state.fbQuery = '';
      render();
      return;
    }
    if (action === 'fb-resonance' && state.fbGroup === 'zero') {
      state.fbResonanceOnly = !state.fbResonanceOnly;
      render();
      return;
    }
    if (action === 'apply-custom-char') {
      const names = $('#charCustomInput').value.split(/[/／]/).map((name) => name.trim());
      commitCharPickerChoices(names);
      return;
    }
    if (action === 'confirm-char-selection') {
      commitCharPickerChoices(charPickerState.choices);
      return;
    }
    if (action === 'close-char-picker') { closeCharPicker(); return; }
    if (action === 'close-psy-picker') { closePsychubePicker(); return; }
    if (action === 'close-modal') { closeModal(); return; }
    if (btn.dataset.clearDraft) {
      const board = btn.dataset.clearDraft;
      clearSubmitDraft(board);
      if (board === 'mane') openManeSubmitModal();
      else if (board === 'flashback') openFbSubmitModal();
      toast(L('Draft cleared.', '已清空未提交草稿。'));
      return;
    }
    if (action === 'my-submissions' || btn.dataset.progressBoard) {
      await openMySubmissions(btn.dataset.progressBoard || state.mode);
      return;
    }
    if (action === 'refresh') {
      if (isOfflineSandboxMode() && state.dataSource === 'offline') {
        await ensureOfflineSnapshot();
        hydrateFromOfflineSnapshot();
        render();
        toast(t('toastRefreshed'));
      } else {
        await ensureSupabaseClient();
        await loadAllData({ keepOfflineOnFail: isOfflineSandboxMode() });
        if (state.connected) toast(t('toastRefreshed'));
      }
      return;
    }
    if (action === 'refresh-mane-daily') {
      if (isOfflineSandboxMode() && state.dataSource === 'offline') {
        await ensureOfflineSnapshot();
        hydrateFromOfflineSnapshot();
      } else {
        await ensureSupabaseClient();
        state.maneScores = await loadPages('mane_leaderboard', ['id']);
      }
      render();
      toast(t('toastRefreshed'));
      return;
    }
    if (action === 'switch-to-mane' || action === 'switch-to-mane-submit') {
      closeModal();
      state.mode = 'mane';
      state.manePage = 'scores';
      const rerunMaps = activeManeMaps('rerun');
      state.maneSection = rerunMaps.length ? 'rerun' : 'new';
      const targetMaps = activeManeMaps(state.maneSection);
      if (!targetMaps.some((m) => m.id === state.maneMapId)) state.maneMapId = targetMaps[0]?.id || '';
      render();
      if (action === 'switch-to-mane-submit') openManeSubmitModal();
      return;
    }
    if (action === 'open-submit' || btn.id === 'submitBtn') {
      if (state.mode === 'mane') openManeSubmitModal();
      else openFbSubmitModal();
      return;
    }
    if (btn.id === 'accountBtn') {
      if (state.user) openProfileModal(false);
      else openLoginModal();
      return;
    }
    if (action === 'open-login') { openLoginModal(); return; }
    if (action === 'logout') {
      if (sb) await checked(sb.auth.signOut());
      closeModal();
      await syncAuth(null);
      toast(L('Signed out.', '已退出登录。'));
      return;
    }
    if (btn.id === 'adminCenterBtn' || action === 'open-admin') {
      if (state.mode === 'mane') await openManeAdmin('pending');
      else await openFbAdmin('pending');
      return;
    }

    if (!state.isAdmin || !sb) return;

    // Admin actions (Mane)
    if (btn.dataset.maneAdmin) { await openManeAdmin(btn.dataset.maneAdmin); return; }
    if (btn.dataset.maneExport) { openManeExport(btn.dataset.maneExport); return; }
    if (btn.dataset.maneExportMaps) {
      for (const input of btn.closest('form').querySelectorAll('input[name="map"]')) {
        input.checked = btn.dataset.maneExportMaps === 'all';
      }
      return;
    }
    if (action === 'mane-maps-admin') { await openManeMapsAdmin(); return; }
    if (btn.dataset.maneProof || btn.dataset.fbProof) {
      await showReviewProof(btn);
      return;
    }
    if (btn.dataset.maneEdit) {
      const lang = getLang();
      const row = await checked(sb.from('mane_entries').select('*').eq('id', btn.dataset.maneEdit).single());
      const maps = await checked(sb.from('mane_maps').select('*').order('position'));
      const builds = extractRecordBuilds(row);
      resetModalBuildState(row.team, row.carry, builds.psychubes, builds.resonanceCodes);
      openModal(`
        <h2>${esc(t('editRecordTitle', {}, lang))}</h2>
        <form id="maneEditForm" data-id="${esc(row.id)}" data-revision="${esc(row.updated_at)}" data-status="${esc(row.status)}">
          ${maneScoreFieldsHtml(row, maps, lang)}
          <div class="form-actions">
            <button type="button" class="outline-btn" data-mane-admin="${esc(row.status)}">${esc(t('btnCancel', {}, lang))}</button>
            <button type="submit" class="copper-btn">${esc(t('btnSaveChanges', {}, lang))}</button>
          </div>
        </form>`, true);
      return;
    }
    if (btn.dataset.maneDecision) {
      const lang = getLang();
      const card = btn.closest('.review-card');
      const { entry, revision, status } = card.dataset;
      const dec = btn.dataset.maneDecision;
      if (dec === 'rejected') {
        showRejectionForm(btn, async (reason) => {
          const updated = await checked(sb.from('mane_entries').update({ status: 'rejected', review_note: reason })
            .eq('id', entry).eq('updated_at', revision).select('id'));
          if (!updated.length) throw new Error(L('Record was modified by another moderator. Refresh and retry.', '该成绩已被其他管理员修改，请重新打开。', lang));
          await finishReview(dialog, 'mane', status, L('Submission rejected.', '投稿已拒绝。', lang), { card });
        }, lang);
        return;
      }
      if (dec === 'removed' && !window.confirm(L('Remove this approved record?', '确定撤下这条鬃毛成绩？', lang))) return;
      btn.disabled = true;
      try {
        const updated = await checked(sb.from('mane_entries').update({ status: dec }).eq('id', entry).eq('updated_at', revision).select('id'));
        if (!updated.length) throw new Error(L('Record was modified by another moderator.', '该成绩已被其他管理员修改，请重新打开。', lang));
        await finishReview(dialog, 'mane', status, t('toastSaved', {}, lang), { card, changedRankings: true });
      } finally {
        btn.disabled = false;
      }
      return;
    }
    if (action === 'mane-reopen') {
      const { entry, revision } = btn.closest('.review-card').dataset;
      await checked(sb.rpc('reopen_rejected_result', { p_board: 'mane', p_id: entry, p_updated_at: revision }));
      await openManeAdmin('pending');
      toast(L('Reopened to pending queue.', '已退回待审核。'));
      return;
    }
    if (action === 'mane-delete-rejected') {
      const card = btn.closest('.review-card');
      if (!window.confirm(L('Delete this rejected record?', '确定删除这条已拒绝的成绩？'))) return;
      await checked(sb.rpc('mane_archive_rejected', { p_id: card.dataset.entry, p_updated_at: card.dataset.revision }));
      await openManeAdmin('rejected');
      toast(L('Rejected record deleted.', '已删除该条拒绝记录。'));
      return;
    }
    if (btn.dataset.toggleManeMap) {
      const active = btn.dataset.active === 'true';
      if (active && !window.confirm(L('Hide this boss and its public board?', '隐藏此地图及其公开榜单？'))) return;
      await checked(sb.from('mane_maps').update({ active: !active }).eq('id', btn.dataset.toggleManeMap));
      await loadAllData();
      await openManeMapsAdmin();
      toast(t('toastSaved'));
      return;
    }

    // Admin actions (Flashback)
    if (action === 'fb-admin-open') { await openFbAdmin('pending'); return; }
    if (btn.dataset.fbAdmin) { await openFbAdmin(btn.dataset.fbAdmin); return; }
    if (action === 'fb-versions-admin') { openFbVersionManager(); return; }
    if (btn.dataset.fbEditVersion !== undefined) { openFbVersionEditor(btn.dataset.fbEditVersion); return; }
    if (btn.dataset.fbReview) {
      const lang = getLang();
      const approved = btn.dataset.fbReview === 'approved';
      const card = btn.closest('.review-card');
      if (!approved) {
        showRejectionForm(btn, async (reason) => {
          await checked(sb.rpc('review_submission', { p_submission_id: btn.dataset.id, p_decision: 'rejected', p_note: reason }));
          await finishReview(dialog, 'flashback', 'pending', L('Submission rejected.', '投稿已拒绝。', lang), { card });
        }, lang);
        return;
      }
      btn.disabled = true;
      try {
        await checked(sb.rpc('review_submission', { p_submission_id: btn.dataset.id, p_decision: btn.dataset.fbReview, p_note: '' }));
        await finishReview(dialog, 'flashback', 'pending', L('Submission approved.', '审核通过。', lang), { card, changedRankings: true });
      } finally {
        btn.disabled = false;
      }
      return;
    }
    if (btn.dataset.fbReopen) {
      await checked(sb.rpc('reopen_rejected_result', { p_board: 'flashback', p_id: btn.dataset.fbReopen }));
      await openFbAdmin('pending');
      toast(L('Reopened to pending queue.', '已退回待审核。'));
      return;
    }
    if (btn.dataset.fbRemove) {
      const reason = window.prompt(L('Enter removal reason (2–200 chars):', '请输入移除原因（2–200 字）：'));
      if (reason === null) return;
      const note = reason.trim();
      if (note.length < 2 || note.length > 200) return toast(L('Reason must be 2–200 characters.', '移除原因须为 2–200 字。'));
      if (!window.confirm(L('Remove this approved record and recalculate honors?', '确认移除这条已通过成绩并重算荣誉？'))) return;
      await checked(sb.rpc('remove_submission', { p_submission_id: btn.dataset.fbRemove, p_reason: note }));
      await finishReview(dialog, 'flashback', 'approved', L('Record removed.', '成绩已移除。'), {
        card: btn.closest('.review-card'), changedRankings: true
      });
      return;
    }
    if (btn.dataset.fbEdit) {
      const lang = getLang();
      const id = btn.dataset.fbEdit;
      const tab = btn.dataset.tab || 'pending';
      const rec = await checked(sb.from('submissions').select('*,profiles(display_name)').eq('id', id).single());
      const builds = extractRecordBuilds(rec);
      resetModalBuildState(rec.team, rec.carry_name, builds.psychubes, builds.resonanceCodes);
      const stageOpts = state.fbVersions.map((v) =>
        `<optgroup label="${esc(localizeVersionLabel(v, lang))}">${standardStages(v.id).map((s) => `<option value="${esc(s.id)}"${s.id === rec.stage_id ? ' selected' : ''}>${esc(localizeStageName(s, lang))}</option>`).join('')}</optgroup>`
      ).join('');
      openModal(`
        <h2>${esc(t('editRecordTitle', {}, lang))}</h2>
        <form id="fbEditForm" data-id="${esc(id)}" data-tab="${esc(tab)}">
          <div class="form-grid">
            <div class="field"><label for="feStage">${esc(t('fieldStage', {}, lang))}</label><select id="feStage" name="stage" required>${stageOpts}</select></div>
            <div class="field"><label for="feGroup">${esc(t('fieldDivision', {}, lang))}</label><select id="feGroup" name="group">${optionsHtml(Object.entries(divisionLabelsMap(lang)), rec.group_code)}</select></div>
          </div>
          <div class="form-grid">
            <div class="field"><label for="feName">${esc(t('fieldPlayerName', {}, lang))}</label><input id="feName" name="name" value="${esc(rec.credited_player || '')}" placeholder="${esc(rec.profiles?.display_name || '')}" minlength="2" maxlength="80" ${rec.source_history_id ? 'required' : ''} /></div>
            <div class="field"><label for="feRounds">${esc(t('fieldRounds', {}, lang))}</label><select id="feRounds" name="rounds">${Array.from({ length: 7 }, (_, n) => `<option value="${n}"${rec.rounds === n ? ' selected' : ''}>${esc(t('roundsFull', { n }, lang))}</option>`).join('')}</select></div>
          </div>
          ${resonanceChoice(rec.group_code, rec.resonance_ten, lang)}
          ${renderTeamBuilderFieldHtml(lang)}
          <div class="field"><label for="feUrl">${esc(t('fieldRelatedUrl', {}, lang))}</label><input id="feUrl" name="url" type="url" maxlength="2048" placeholder="${esc(t('fieldRelatedUrlPlaceholder', {}, lang))}" value="${esc(rec.related_url || '')}" /></div>
          <div class="form-actions">
            <button type="button" class="outline-btn" data-fb-admin="${esc(tab)}">${esc(t('btnCancel', {}, lang))}</button>
            <button type="submit" class="copper-btn">${esc(t('btnSaveChanges', {}, lang))}</button>
          </div>
        </form>`, true);
      return;
    }
    if (btn.dataset.fbArchive) {
      const lang = getLang();
      const cfg = FB_ARCHIVE_ACTIONS[btn.dataset.fbArchive];
      if (!cfg) return;
      const targetLabel = isEn(lang) ? cfg.en : cfg.zh;
      if (!window.confirm(L(`Delete ${targetLabel}? This removes it from public boards and stats.`, `删除${targetLabel}？删除后会从列表与统计中撤下。`, lang))) return;
      await checked(sb.rpc(cfg.rpc, { [cfg.arg]: btn.dataset.id }));
      if (btn.dataset.fbArchive === 'fb-archive-record') {
        await finishReview(dialog, 'flashback', btn.dataset.tab || 'pending', L('Deleted.', '已删除。', lang), {
          card: btn.closest('.review-card'), changedRankings: btn.dataset.tab === 'approved'
        });
        return;
      }
      await loadAllData();
      if (btn.dataset.fbArchive === 'fb-archive-version') openFbVersionManager();
      else await openFbAdmin(btn.dataset.fbArchive === 'fb-archive-history' ? 'historical' : (btn.dataset.tab || 'pending'), btn.dataset.stage || '');
      toast(L('Deleted.', '已删除。', lang));
    }
  } catch (err) {
    toast(err.message || L('Operation failed. Please try again.', '操作未完成，请重试。'));
  }
});

document.addEventListener('change', (ev) => {
  const target = ev.target;
  if (target.dataset.maneDaily) { state.maneDaily[target.dataset.maneDaily] = target.value; render(); }
  else if (target.id === 'maneCarrySelect') { state.maneCarry = target.value; render(); }
  else if (target.id === 'fbVersionSelect') {
    state.fbVersionId = target.value;
    state.fbStageId = standardStages(state.fbVersionId)[0]?.id || '';
    state.fbCarry = '';
    render();
  }
  else if (target.id === 'fbCarrySelect') { state.fbCarry = target.value; render(); }
  else if (target.id === 'fbFormVersion') {
    const sel = $('#fbFormStage');
    if (sel) {
      sel.innerHTML = fbStageOptionsHtml(target.value);
      const detectedNo = Number(target.form?.dataset.ocrStageNumber);
      const detectedStage = standardStages(target.value).find((stage) => stage.stage_no === detectedNo);
      if (detectedStage) sel.value = detectedStage.id;
    }
  }
  else if (target.id === 'fbFormGroup' || target.id === 'feGroup') {
    const box = target.form?.querySelector('.resonance-choice');
    const cb = box?.querySelector('input[name="resonanceTen"]');
    const isZero = target.value === 'zero';
    if (box) box.hidden = !isZero;
    if (cb) { cb.disabled = !isZero; if (!isZero) cb.checked = false; }
  }
  const draftForm = target.closest?.('#maneSubmitForm, #fbSubmitForm');
  if (draftForm && target.type !== 'file') saveSubmitDraftFromForm(draftForm);
});

function rerenderKeepingSearchFocus(inputId, nextValue, pos) {
  const sx = window.scrollX;
  const sy = window.scrollY;
  if (inputId === 'maneSearchInput') state.maneQuery = nextValue;
  else state.fbQuery = nextValue;
  render();
  const el = document.getElementById(inputId);
  if (el) {
    try { el.focus({ preventScroll: true }); } catch { el.focus(); }
    try { el.setSelectionRange(pos, pos); } catch {}
  }
  if (window.scrollX !== sx || window.scrollY !== sy) {
    window.scrollTo(sx, sy);
  }
}

document.addEventListener('input', (ev) => {
  const target = ev.target;
  if (target.id === 'maneSearchInput') {
    if (ev.isComposing || state.maneQuery === target.value) return;
    rerenderKeepingSearchFocus('maneSearchInput', target.value, target.selectionStart);
  } else if (target.id === 'fbSearchInput') {
    if (ev.isComposing || state.fbQuery === target.value) return;
    rerenderKeepingSearchFocus('fbSearchInput', target.value, target.selectionStart);
  } else if (target.dataset?.resSlot !== undefined) {
    modalBuildState.resonanceCodes[Number(target.dataset.resSlot)] = target.value;
    const sf = target.closest?.('#maneSubmitForm, #fbSubmitForm');
    if (sf) saveSubmitDraftFromForm(sf);
  } else if (target.id === 'charPickerSearch') {
    if (!ev.isComposing && charPickerState.query !== target.value) {
      charPickerState.query = target.value;
      refreshCharPickerResults();
    }
  } else if (target.id === 'psyPickerSearch') {
    if (!ev.isComposing && psyPickerState.query !== target.value) {
      psyPickerState.query = target.value;
      refreshPsychubePickerResults();
    }
  } else {
    const draftForm = target.closest?.('#maneSubmitForm, #fbSubmitForm');
    if (draftForm && target.type !== 'file') saveSubmitDraftFromForm(draftForm);
  }
});

document.addEventListener('compositionend', (ev) => {
  const input = ev.target;
  if (input.id === 'charPickerSearch' && charPickerState.query !== input.value) {
    charPickerState.query = input.value;
    refreshCharPickerResults();
  } else if (input.id === 'psyPickerSearch' && psyPickerState.query !== input.value) {
    psyPickerState.query = input.value;
    refreshPsychubePickerResults();
  } else if (input.id === 'maneSearchInput' && state.maneQuery !== input.value) {
    rerenderKeepingSearchFocus('maneSearchInput', input.value, input.selectionStart);
  } else if (input.id === 'fbSearchInput' && state.fbQuery !== input.value) {
    rerenderKeepingSearchFocus('fbSearchInput', input.value, input.selectionStart);
  }
});

document.addEventListener('submit', async (ev) => {
  const form = ev.target;
  const dialog = form.closest('.modal-box');
  if (!form.id) return;
  ev.preventDefault();
  const submitBtn = form.querySelector('[type="submit"]');
  if (submitBtn?.disabled) return;
  if (submitBtn) submitBtn.disabled = true;

  try {
    if (form.id === 'maneSubmitForm') {
      await handleManeSubmit(form);
    } else if (form.id === 'maneExportForm') {
      await submitManeExport(form);
    } else if (form.id === 'maneEditForm' && state.isAdmin && sb) {
      const patch = readManeFields(new FormData(form), { forEdit: true });
      let updated;
      try {
        updated = await checked(sb.from('mane_entries').update(patch).eq('id', form.dataset.id).eq('updated_at', form.dataset.revision).select('id'));
      } catch (err) {
        if (isMissingBuildColumnError(err)) {
          throw new Error(L('Database has not enabled Psychube/Resonance columns yet.', '线上数据库尚未添加心相/共鸣码存储列，请先运行配套迁移 SQL。'));
        }
        throw err;
      }
      if (!updated.length) throw new Error(L('Record was updated by another moderator.', '成绩已被其他管理员更新，请重新打开。'));
      await finishReview(dialog, 'mane', form.dataset.status, t('toastSaved'), {
        changedRankings: form.dataset.status === 'approved'
      });
    } else if (form.id === 'maneMapForm' && state.isAdmin && sb) {
      const fd = new FormData(form);
      await checked(sb.from('mane_maps').insert({
        name: String(fd.get('name')).trim(),
        edition: String(fd.get('edition')).trim(),
        section: String(fd.get('section')),
        position: Number(fd.get('position'))
      }));
      await loadAllData();
      await openManeMapsAdmin();
      toast(t('toastSaved'));
    } else if (form.id === 'fbGuestForm') {
      const name = String(new FormData(form).get('name') || '').trim();
      if (name.length < 2 || name.length > 24) throw new Error(t('errPlayerRequired'));
      startingGuest = true;
      await ensureSupabaseClient();
      let user = state.user;
      if (!user) {
        const res = await checked(sb.auth.signInAnonymously());
        user = res.user;
      }
      await checked(sb.from('profiles').upsert({ id: user.id, display_name: name }, { onConflict: 'id' }));
      await syncAuth();
      startingGuest = false;
      openFbSubmitModal();
    } else if (form.id === 'profileForm') {
      const name = String(new FormData(form).get('name') || '').trim();
      if (!state.user || name.length < 2 || name.length > 24) throw new Error(t('errPlayerRequired'));
      await checked(sb.from('profiles').upsert({ id: state.user.id, display_name: name }, { onConflict: 'id' }));
      await syncAuth();
      closeModal();
      if (form.dataset.forFb === 'true') openFbSubmitModal();
      else toast(t('toastSaved'));
    } else if (form.id === 'fbSubmitForm') {
      await handleFbSubmit(form);
    } else if (form.id === 'fbEditForm' && state.isAdmin && sb) {
      const fd = new FormData(form);
      const built = readTeamBuilderSubmission();
      const link = parseHttpUrl(fd.get('url')) || null;
      await checked(sb.rpc('edit_submission', {
        p_id: form.dataset.id,
        p_stage_id: fd.get('stage'),
        p_group: fd.get('group'),
        p_team: built.team,
        p_carry: built.carry,
        p_rounds: Number(fd.get('rounds')),
        p_credited_player: fd.get('name'),
        p_related_url: link,
        p_resonance_ten: fd.get('group') === 'zero' && fd.has('resonanceTen')
      }));
      try {
        await checked(sb.rpc('update_submission_builds', {
          p_id: form.dataset.id,
          p_team_psychubes: built.hasPsychubes ? built.psychubes : null,
          p_team_resonance_codes: built.hasResonance ? built.resonanceCodes : null
        }));
      } catch (err) {
        if (isMissingBuildColumnError(err) || /update_submission_builds|PGRST202/i.test(`${err?.code || ''} ${err?.message || ''}`)) {
          if (built.hasAny) {
            throw new Error(L('Core record saved, but Psychube/Resonance DB migration is not installed yet.', '基础成绩已保存，但线上数据库尚未运行心相迁移 SQL。'));
          }
        } else {
          throw err;
        }
      }
      await finishReview(dialog, 'flashback', form.dataset.tab, t('toastSaved'), {
        changedRankings: form.dataset.tab === 'approved'
      });
    } else if (form.id === 'fbVersionForm' && state.isAdmin && sb) {
      const fd = new FormData(form);
      const code = String(fd.get('code') || '').trim();
      const label = String(fd.get('label') || '').trim();
      const names = [1, 2, 3].map((i) => String(fd.get(`stage${i}`) || '').trim());
      if (!code || !label || names.some((n) => !n)) throw new Error(L('Please fill in cycle code, label, and all 3 stages.', '请填写完整版本与三个关卡名称。'));
      const vid = await checked(sb.rpc('save_version', {
        p_version_id: form.dataset.id || null,
        p_code: code,
        p_label: label,
        p_stage_names: names,
        p_challenges: [1, 2, 3].map((i) => fd.get(`repeat${i}`) || null)
      }));
      state.fbVersionId = vid;
      state.fbStageId = '';
      await loadAllData();
      openFbVersionManager();
      toast(t('toastSaved'));
    } else if (form.id === 'adminLoginForm') {
      const email = String(new FormData(form).get('email') || '').trim();
      await ensureSupabaseClient();
      await checked(sb.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: new URL('./', location.href).href }
      }));
      closeModal();
      toast(L('Magic sign-in link sent. Open it in this browser to sign in.', '登录邮件已发送，请在同一浏览器查收并打开链接。'));
    }
  } catch (err) {
    toast(err.message || L('Operation failed. Please try again.', '操作失败，请重试。'));
  } finally {
    startingGuest = false;
    if (submitBtn?.isConnected) submitBtn.disabled = false;
  }
});

document.addEventListener('keydown', (ev) => {
  if (ev.key === 'Escape' && !ev.isComposing) {
    if (state.glossaryOpen) closeGlossaryPopover();
    else if ($('#proofLightboxOverlay')) closeProofLightbox();
    else if (charPickerState.open) closeCharPicker();
    else if (psyPickerState.open) closePsychubePicker();
    else closeModal();
    return;
  }
  if ((ev.key === 'Enter' || ev.key === ' ') && !ev.isComposing) {
    const interactive = ev.target?.closest?.('[role="button"][data-open-char], [role="button"][data-open-psy], [role="button"][data-open-player]');
    if (interactive) {
      ev.preventDefault();
      interactive.click();
    }
  }
});

let overlayDownTargetId = '';
document.addEventListener('pointerdown', (ev) => {
  overlayDownTargetId = ev.target?.id || '';
});

document.addEventListener('click', (ev) => {
  const id = ev.target?.id;
  if (!id || id !== overlayDownTargetId) return;
  if (id === 'charPickerOverlay') closeCharPicker();
  else if (id === 'psyPickerOverlay') closePsychubePicker();
  else if (id === 'modalOverlay') {
    if ($('#modalOverlay form')) return;
    closeModal();
  }
});

window.addEventListener('hashchange', () => {
  readHash();
  render();
});

/* ==================== Offline-First / Lazy Bootstrap ==================== */
async function bootstrap() {
  const lang = initLang();
  readHash();
  try {
    await ensureLangPack(lang);
  } catch (err) {
    console.warn('Language pack load failed:', err);
  }
  const cfg = window.LEADERBOARD_CONFIG;
  const useLive = !isOfflineSandboxMode() && Boolean(cfg?.supabaseUrl && cfg?.supabaseAnonKey);
  if (useLive) {
    state.dataSource = 'live';
    state.loading = true;
    render();
    await syncLiveArchive({ silent: true });
  } else {
    await ensureOfflineSnapshot();
    hydrateFromOfflineSnapshot();
    render();
  }
}

bootstrap();
