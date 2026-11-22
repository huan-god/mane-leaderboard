import {
  AFFLATUS_META,
  afflatusSvg,
  canonicalCharacterKey,
  canonicalDisplayName,
  characterMatchesQuery,
  characterMonogram,
  extractLineupCharacterNames,
  insightWatermarkSvg,
  parseLineupSlots,
  rarityOverlaySrc,
  resolveAfflatus,
  resolveBossAsset,
  resolveCharacter,
  resolveManeGrade,
  toRoman
} from './arcanists.js';
import {
  resolveFlashbackStageMechanics,
  resolveManeBossMechanics
} from './boss-mechanics.js';
import {
  adminContact, bindModerationFilters, contactField, filterModerationRows, moderationFilterFields,
  moderationPager, moderationPageSize, mountSubmissionProgress, showRejectionForm
} from './submission-progress.js';
import {validateLineup} from './flashback-logic.mjs';
import {enhanceTouchLayout, onTouchLayoutChange} from './mobile.js?v=20261122-mobile2';

const $ = (sel) => document.querySelector(sel);
const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (ch) =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]
);

const FILTER_AFFLATUS = ['beast', 'plant', 'star', 'mineral', 'spirit', 'intellect'];

const MANE_SECTIONS = {
  new: '鉴藏者特版',
  rerun: '怪相档案'
};

const DIVISIONS = {
  zero: '全 0 塑造',
  max: '全满塑造'
};

const STATUS_LABELS = {
  pending: '待审核',
  approved: '已通过',
  rejected: '已拒绝',
  removed: '已移除'
};

const FB_ADMIN_TABS = {
  pending: '待审核',
  approved: '已通过',
  rejected: '已拒绝',
  removed: '已移除',
  historical: '历史档案'
};

const FB_ARCHIVE_ACTIONS = {
  'fb-archive-record': { label: '这条成绩', rpc: 'archive_submission', arg: 'p_submission_id' },
  'fb-archive-history': { label: '这条档案', rpc: 'archive_historical_record', arg: 'p_record_id' },
  'fb-archive-version': { label: '这个版本及其榜单', rpc: 'archive_version', arg: 'p_version_id' }
};

const MIME_TO_EXT = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/webp': 'webp'
};

const state = {
  mode: location.pathname.split('/').includes('flashback-leaderboard') ? 'flashback' : 'mane',
  manePage: 'scores',     // 'scores' | 'totals' | 'rules'
  fbPage: 'leaderboard',  // 'leaderboard' | 'carries' | 'players' | 'rules'

  connected: false,
  loading: true,
  errorNotice: '',

  // 共享身份状态
  session: null,
  user: null,
  profile: null,
  isAdmin: false,

  // 鬃毛邮报状态
  maneSection: 'new',
  maneDivision: 'zero',
  maneMapId: '',
  maneRoleMode: 'carry',  // 'carry' | 'member'
  maneCarry: '',          // canonicalCharacterKey
  maneAfflatus: '',       // '' | 'beast'|'plant'|'star'|'mineral'|'spirit'|'intellect'
  maneQuery: '',
  manePlayerScope: 'all', // 'all' | 'new' | 'rerun'
  manePlayerDiv: 'all',   // 'all' | 'zero' | 'max'
  maneMaps: [],
  maneScores: [],
  maneTotals: [],

  // 焦点闪回状态
  fbVersionId: '',
  fbStageId: '',
  fbGroup: 'zero',
  fbResonanceOnly: false,
  fbRoleMode: 'carry',    // 'carry' | 'member'
  fbCarry: '',            // canonicalCharacterKey
  fbAfflatus: '',         // '' | 'beast'|...
  fbQuery: '',
  fbCarryScope: 'period',
  fbCarryMetric: 'appearance_count',
  fbVersions: [],
  fbStages: [],
  fbRecords: [],
  fbPlayers: [],
  fbArchives: [],
  fbCarries: [],

  // 直达定位高亮 & 机制档案展开状态
  highlightRecordId: '',
  maneMechOpen: false,
  fbMechOpen: false
};

let sb = null;
let toastTimer = null;
let authBound = false;
let startingGuest = false;
let pendingScrollRecordId = '';
const posterIndex = new Map();

/* ==================== 通用工具 ==================== */
function uid() {
  return (globalThis.crypto?.randomUUID)
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function formatScore(score) {
  try {
    return BigInt(score).toLocaleString('zh-CN');
  } catch {
    return Number(score || 0).toLocaleString('zh-CN');
  }
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

function formatMonthDay(time) {
  if (!time) return '';
  return new Date(time).toLocaleDateString('zh-CN', {
    timeZone: 'Asia/Shanghai',
    month: '2-digit',
    day: '2-digit'
  });
}

function formatMonthDayTime(time) {
  if (!time) return '';
  const parts = new Intl.DateTimeFormat('zh-CN', {
    timeZone: 'Asia/Shanghai',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).formatToParts(new Date(time));
  const get = (t) => parts.find((p) => p.type === t)?.value || '';
  return `${get('month')}月${get('day')}日 ${get('hour')}:${get('minute')}`;
}

function formatDateTime(time) {
  if (!time) return '';
  return new Date(time).toLocaleString('zh-CN', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
}

function parseHttpUrl(value) {
  const text = String(value ?? '').trim();
  if (!text) return '';
  const url = new URL(text);
  if (
    !['http:', 'https:'].includes(url.protocol) ||
    url.username ||
    url.password ||
    /[\s\\]/u.test(text) ||
    url.href.length > 2048
  ) {
    throw new Error('请输入有效的 HTTP 或 HTTPS 相关链接。');
  }
  return url.href;
}

function safeLinkHtml(value, label = '相关链接 ↗') {
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
  el.textContent = message;
  el.classList.add('visible');
  toastTimer = setTimeout(() => el.classList.remove('visible'), 3600);
}

function openModal(html, wide = false) {
  $('#modalRoot').innerHTML = `
    <div class="modal-overlay" id="modalOverlay">
      <section class="modal-box ${wide ? 'wide' : ''}" role="dialog" aria-modal="true">
        <button type="button" class="modal-close" data-action="close-modal" aria-label="关闭弹窗">×</button>
        ${html}
      </section>
    </div>`;
}

function closeModal() {
  $('#modalRoot').innerHTML = '';
}

function decodeImageFile(blob) {
  return new Promise((resolve, reject) => {
    if (!blob?.size) {
      reject(new Error('截图文件为空。'));
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('截图读取失败。'));
    reader.onload = () => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('截图无法解码，请检查图片是否损坏。'));
      img.src = reader.result;
    };
    reader.readAsDataURL(blob);
  });
}

async function checked(promise) {
  const { data, error } = await promise;
  if (error) throw error;
  return data;
}

async function loadPages(table, orderKeys, select = '*') {
  const rows = [];
  for (let from = 0; ; from += 500) {
    let q = sb.from(table).select(select);
    for (const k of orderKeys) q = q.order(k);
    const page = await checked(q.range(from, from + 499));
    rows.push(...(page || []));
    if (!page || page.length < 500) return rows;
  }
}

/* ==================== 排序与数据辅助 ==================== */
function compareManeScore(a, b) {
  const sa = BigInt(a.score || 0);
  const sbVal = BigInt(b.score || 0);
  if (sa !== sbVal) return sbVal > sa ? 1 : -1;
  return Date.parse(a.created_at) - Date.parse(b.created_at) || String(a.id).localeCompare(String(b.id));
}

function compareFlashbackRecord(a, b) {
  return (
    (a.rounds - b.rounds) ||
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

/* ==================== URL 路由与直达深链同步 ==================== */
function readHash() {
  const raw = (location.hash || '').replace(/^#/, '');
  if (!raw) return;
  const [pathPart, queryPart = ''] = raw.split('?');
  const [m, p] = pathPart.split('/');
  const params = new URLSearchParams(queryPart);

  if (m === 'mane') {
    state.mode = 'mane';
    if (['scores', 'totals', 'players', 'rules'].includes(p)) state.manePage = p;
    const sec = params.get('sec');
    if (sec === 'new' || sec === 'rerun') state.maneSection = sec;
    const div = params.get('div');
    if (div === 'zero' || div === 'max') state.maneDivision = div;
    const mapId = params.get('map');
    if (mapId) state.maneMapId = mapId;
    const rec = params.get('rec');
    if (rec) {
      state.highlightRecordId = `mane-${rec}`;
      pendingScrollRecordId = `mane-${rec}`;
    }
    if (params.get('mech') === '1') state.maneMechOpen = true;
  } else if (m === 'flashback') {
    state.mode = 'flashback';
    if (['leaderboard', 'carries', 'players', 'rules'].includes(p)) state.fbPage = p;
    const ver = params.get('ver');
    if (ver) state.fbVersionId = ver;
    const stage = params.get('stage');
    if (stage) state.fbStageId = stage;
    const grp = params.get('grp');
    if (grp === 'zero' || grp === 'max') state.fbGroup = grp;
    const rec = params.get('rec');
    if (rec) {
      state.highlightRecordId = `fb-${rec}`;
      pendingScrollRecordId = `fb-${rec}`;
    }
    if (params.get('mech') === '1') state.fbMechOpen = true;
  }
}

function writeHash() {
  const fragment = (location.hash || '').slice(1);
  const callback = new URLSearchParams(fragment);
  // Let Supabase consume a sign-in callback before the board writes its route.
  if (callback.has('access_token') || callback.has('refresh_token') || callback.has('error_code')) return;
  const deepLink = new URLSearchParams(fragment.split('?')[1] || '');
  if (deepLink.has('rec') && state.highlightRecordId) return;
  const page = state.mode === 'mane' ? state.manePage : state.fbPage;
  const next = `#${state.mode}/${page}`;
  if (location.hash !== next) {
    history.replaceState(null, '', next);
  }
}

function buildRecordDeepLink(item) {
  const base = `${location.origin}${location.pathname}`;
  if (item.mode === 'mane') {
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

/* ==================== 实时加载双榜数据 ==================== */
async function loadAllData() {
  state.loading = true;
  renderChrome();
  try {
    const [
      maneMaps,
      maneScores,
      maneTotals,
      fbVersions,
      fbStages,
      fbRecords,
      fbPlayers,
      fbArchives,
      fbCarries
    ] = await Promise.all([
      checked(sb.from('mane_maps').select('id,name,section,edition,position,opens_at,active').eq('active', true)),
      loadPages('mane_leaderboard', ['id']),
      loadPages('mane_carry_total_leaderboard', ['section', 'edition', 'division', 'carry_key']),
      checked(sb.from('versions').select('id,code,label,created_at')),
      checked(sb.from('stages').select('id,version_id,stage_no,name,challenge_id')),
      loadPages('leaderboard_records', ['id']),
      loadPages('flashback_player_ranking_by_group', ['group_code','player_id']),
      checked(sb.from('historical_records').select('id,stage_id,group_code,display_order,carry_names,lineup_label,credited_player')),
      loadPages('flashback_carry_ranking_by_group', ['group_code','version_id','carry_name'])
    ]);

    state.maneMaps = (maneMaps || []).sort((a, b) =>
      String(b.edition).localeCompare(String(a.edition), 'zh-CN', { numeric: true }) ||
      (a.position - b.position) ||
      String(a.name).localeCompare(String(b.name), 'zh-CN')
    );
    state.maneScores = maneScores || [];
    state.maneTotals = maneTotals || [];

    state.fbVersions = (fbVersions || []).sort((a, b) =>
      String(b.code).localeCompare(String(a.code), 'zh-CN', { numeric: true }) ||
      (Date.parse(b.created_at) - Date.parse(a.created_at))
    );
    state.fbStages = fbStages || [];
    state.fbRecords = fbRecords || [];
    state.fbArchives = fbArchives || [];
    state.fbCarries = fbCarries || [];
    state.fbPlayers = (fbPlayers || []).sort((a, b) =>
      (b.historical_count - a.historical_count) ||
      (b.current_count - a.current_count) ||
      String(a.display_name).localeCompare(String(b.display_name), 'zh-CN') ||
      String(a.player_id).localeCompare(String(b.player_id))
    );

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

    state.connected = true;
    state.errorNotice = '';
  } catch (err) {
    console.error(err);
    state.connected = false;
    state.errorNotice = '暂时无法连接实时榜单档案库，请检查网络后点击重试。';
  } finally {
    state.loading = false;
    render();
  }
}

async function syncAuth(sessionInput) {
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

/* ==================== 视觉组件：实机风编队阵容卡（对齐 game-mane-team.png + 官方 .sl-lineup_item） ==================== */
function igHeading(cn, en, right = '') {
  return `
    <div class="ig-heading">
      <span class="ig-heading-left">
        <span class="ig-tri" aria-hidden="true">▶</span>
        <span class="ig-cn">${esc(cn)}</span>
        <span class="ig-bar" aria-hidden="true"></span>
        <span class="ig-en">${esc(en)}</span>
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

function formatCanonicalCarry(carryStr) {
  return splitCarries(carryStr).map(canonicalDisplayName).join(' / ');
}

function matchesAfflatus(rawName, targetAff) {
  if (!targetAff) return true;
  const aff = resolveAfflatus(rawName);
  if (aff === targetAff) return true;
  if (aff === 'mineral_star' && (targetAff === 'mineral' || targetAff === 'star')) return true;
  return false;
}

function cleanStageDisplayName(name) {
  const cleaned = String(name ?? '').replace(/^[ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩ\d]+\s*[·．.\-]\s*/, '').trim();
  return cleaned || String(name ?? '');
}

function collectBoardCharacters(records, roleMode, getCarryStr) {
  const map = new Map(); // canonicalKey -> { label, count }
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
      const label = canonicalDisplayName(raw);
      const cur = map.get(key);
      if (cur) cur.count += 1;
      else map.set(key, { label, count: 1 });
    }
  }
  return [...map.entries()].sort((a, b) =>
    (b[1].count - a[1].count) ||
    a[1].label.localeCompare(b[1].label, 'zh-CN')
  );
}

function renderAfflatusFilterHtml(selectedAff, dataAttr) {
  return `
    <div class="aff-filter-row" role="group" aria-label="按灵感快速筛选">
      ${FILTER_AFFLATUS.map((affKey) => {
        const meta = AFFLATUS_META[affKey];
        const active = selectedAff === affKey;
        return `
          <button type="button" class="aff-filter-btn ${active ? 'active' : ''}" ${dataAttr}="${affKey}" aria-pressed="${active}" title="仅看${meta.label}灵感">
            <img src="${esc(meta.icon)}" alt="" aria-hidden="true" />
            <span>${esc(meta.label)}</span>
          </button>`;
      }).join('')}
    </div>`;
}

function renderFormationHtml(team, carryStr) {
  const slots = parseLineupSlots(team, carryStr);
  if (!slots.length) return '';

  if (slots.length === 1 && slots[0].type === 'legacy') {
    return `<div class="legacy-team-ribbon"><small>原表配队</small><span>${esc(slots[0].raw)}</span></div>`;
  }

  const carrySet = new Set(splitCarries(carryStr).map(canonicalCharacterKey));
  return `<div class="formation-strip">${slots.map((slot) => {
    if (slot.type === 'flex') {
      const pics = slot.chars.slice(0, 4);
      const gridClass = pics.length <= 2 ? 'cols-2' : pics.length === 3 ? 'cols-3' : 'cols-4';
      const fullListText = slot.chars.map((c) => c.name).join(' / ');
      return `
        <div class="formation-slot is-flex has-portrait" title="可选替换位（${esc(slot.tag)}）：${esc(fullListText)}（原填：${esc(slot.raw)}）">
          <div class="slot-flex-collage ${gridClass}">
            ${pics.map((c) => `<img src="${esc(c.portrait)}" alt="${esc(c.name)}" loading="lazy" decoding="async" />`).join('')}
          </div>
          <div class="slot-vignette" aria-hidden="true"></div>
          <span class="slot-flex-tag">${esc(slot.tag)}</span>
          <div class="slot-namebar">${esc(slot.label)}</div>
        </div>`;
    }

    if (slot.type === 'wild') {
      return `
        <div class="formation-slot is-wild" title="自由补位：${esc(slot.raw)}">
          <img class="slot-card-bg" src="./assets/uttu/bg_kapaidi.png" alt="" aria-hidden="true" loading="lazy" decoding="async" />
          <div class="slot-wild-body" aria-hidden="true">
            <span class="slot-wild-glyph">✦</span>
            <span class="slot-wild-sub">自由位</span>
          </div>
          <div class="slot-namebar">${esc(slot.label)}</div>
        </div>`;
    }

    const rawName = slot.raw || '';
    const char = slot.char || resolveCharacter(rawName);
    const displayName = char?.name || canonicalDisplayName(rawName);
    const affKey = char?.aff || resolveAfflatus(rawName);
    const aff = AFFLATUS_META[affKey] || AFFLATUS_META.unknown;
    const isCarry = carrySet.has(char ? `char:${char.id}` : canonicalCharacterKey(rawName));
    const mono = characterMonogram(displayName);
    const hasPortrait = Boolean(char?.portrait);
    const raritySrc = rarityOverlaySrc(char?.star || 6);
    const affHtml = aff.icon
      ? `<img class="slot-aff-img" src="${esc(aff.icon)}" alt="${esc(aff.label)}" loading="lazy" decoding="async" />`
      : `<span class="slot-ribbon" style="background:${aff.ribbon}" aria-label="${esc(aff.label)}">${afflatusSvg(affKey)}</span>`;
    const rawNote = rawName && rawName.trim() !== displayName ? `（原填：${rawName}）` : '';

    return `
      <div class="formation-slot ${isCarry ? 'is-carry' : ''} ${hasPortrait ? 'has-portrait' : ''}" title="${esc(displayName)}${esc(rawNote)}${affKey !== 'unknown' ? ` · ${aff.label}灵感` : ''}${char?.star ? ` · ${char.star}★` : ''}${isCarry ? ' · 主C' : ''}">
        <img class="slot-card-bg" src="./assets/uttu/bg_kapaidi.png" alt="" aria-hidden="true" loading="lazy" decoding="async" />
        <div class="slot-center" aria-hidden="true">
          ${insightWatermarkSvg()}
          <span class="slot-monogram">${esc(mono)}</span>
        </div>
        ${hasPortrait ? `<img class="slot-portrait" src="${esc(char.portrait)}" alt="${esc(displayName)}" loading="lazy" decoding="async" onerror="this.closest('.formation-slot')?.classList.remove('has-portrait');this.remove()" />` : ''}
        <img class="slot-rarity-layer" src="${esc(raritySrc)}" alt="" aria-hidden="true" loading="lazy" decoding="async" />
        <div class="slot-vignette" aria-hidden="true"></div>
        ${affHtml}
        ${isCarry ? '<span class="slot-carry-tag">主C</span>' : ''}
        <div class="slot-namebar">${esc(displayName)}</div>
      </div>`;
  }).join('')}</div>`;
}

function renderCarryAvatarHtml(carryName) {
  const char = resolveCharacter(carryName);
  const displayName = canonicalDisplayName(carryName);
  const affKey = char?.aff || resolveAfflatus(carryName);
  const aff = AFFLATUS_META[affKey] || AFFLATUS_META.unknown;
  if (char?.portrait) {
    return `
      <span class="carry-avatar" title="${esc(displayName)} · ${aff.label}灵感">
        <img class="carry-avatar-pic" src="${esc(char.portrait)}" alt="${esc(displayName)}" loading="lazy" decoding="async" onerror="this.remove()" />
        <img class="carry-avatar-rar" src="${esc(rarityOverlaySrc(char.star || 6))}" alt="" aria-hidden="true" loading="lazy" />
        ${aff.icon
          ? `<img class="carry-avatar-aff-img" src="${esc(aff.icon)}" alt="${esc(aff.label)}" loading="lazy" />`
          : `<span class="carry-avatar-aff" style="background:${aff.ribbon}">${afflatusSvg(affKey)}</span>`}
      </span>`;
  }
  return `<span class="inline-aff-dot" style="background:${aff.ribbon}">${afflatusSvg(affKey)}</span>`;
}

function renderRankBadge(rank) {
  if (rank === 1) return '<span class="rank-badge medal r1" aria-label="第 1 名">Ⅰ</span>';
  if (rank === 2) return '<span class="rank-badge medal r2" aria-label="第 2 名">Ⅱ</span>';
  if (rank === 3) return '<span class="rank-badge medal r3" aria-label="第 3 名">Ⅲ</span>';
  return `<span class="rank-badge">${String(rank).padStart(2, '0')}</span>`;
}

function renderGradeStamp(score) {
  const g = resolveManeGrade(score);
  if (g.img) {
    return `
      <span class="grade-badge-wrap ${g.tier}" title="调查评级 ${g.grade}${g.tag ? ' · ' + g.tag : ''}">
        <img class="grade-badge-img" src="${esc(g.img)}" alt="${esc(g.grade)}" loading="eager" decoding="async" />
        ${g.tag ? `<span class="grade-mythic-pill">${esc(g.tag)}</span>` : ''}
      </span>`;
  }
  return `<span class="grade-crest ${g.tier}"><span>${g.grade}</span></span>`;
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

/* ==================== 顶部栏与紧凑刊头（含可跳转全站指标，首屏直达前三名） ==================== */
function renderChrome() {
  document.body.dataset.mode = state.mode;
  $('.brand[data-switch-mode]').href = state.mode === 'mane' ? '#mane/scores' : '#flashback/leaderboard';
  $('#brandGlyph').textContent = state.mode === 'mane' ? '邮' : 'Ⅸ';
  $('#brandTitle').textContent = state.mode === 'mane' ? '鬃毛邮报 · 调查总榜' : '焦点闪回 · 纪录档案';

  document.querySelectorAll('[data-mode-switch]').forEach((btn) => {
    const active = btn.dataset.modeSwitch === state.mode;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-selected', String(active));
  });

  const badge = $('#connectionBadge');
  const connText = $('#connectionText');
  badge.classList.toggle('online', state.connected);
  badge.classList.toggle('offline', !state.connected && !state.loading);
  if (state.loading) connText.textContent = '同步档案库…';
  else if (state.connected) connText.textContent = '实时档案 · 投稿开放';
  else connText.textContent = '暂未连接';

  const canSubmitMane = state.connected && state.maneMaps.some(isMapOpen);
  const canSubmitFb = state.connected && state.fbStages.length > 0;
  const submitBtn = $('#submitBtn');
  submitBtn.disabled = state.mode === 'mane' ? !canSubmitMane : !canSubmitFb;

  const adminBtn = $('#adminCenterBtn');
  adminBtn.hidden = !state.isAdmin;

  const accBtn = $('#accountBtn');
  if (state.isAdmin) {
    accBtn.textContent = '管理员账号';
  } else if (state.profile?.display_name) {
    accBtn.textContent = state.profile.display_name;
  } else if (state.user && !state.user.is_anonymous) {
    accBtn.textContent = '站内账号';
  } else {
    accBtn.textContent = '管理员登录';
  }

  // 次级导航
  const tabs = state.mode === 'mane'
    ? [
        ['scores', '调查积分榜'],
        ['totals', '主 C 总分榜'],
        ['players', '玩家荣誉殿堂'],
        ['rules', '投稿与规则']
      ]
    : [
        ['leaderboard', '关卡排行榜'],
        ['carries', '主 C 排行榜'],
        ['players', '玩家荣誉殿堂'],
        ['rules', '榜单规则']
      ];
  const activePage = state.mode === 'mane' ? state.manePage : state.fbPage;
  $('#subnav').innerHTML = `
    <div class="subnav-tabs">
      ${tabs.map(([key, label]) =>
        `<button class="subnav-tab ${key === activePage ? 'active' : ''}" data-subpage="${key}">${label}</button>`
      ).join('')}
    </div>
    <div class="subnav-meta">${state.mode === 'mane' ? 'MANE’S BULLETIN · HIGH SCORE' : 'FLASHBACK ARCHIVE · MIN ROUNDS'}</div>`;

  // 全局错误条
  const noticeEl = $('#globalNotice');
  if (state.errorNotice) {
    noticeEl.hidden = false;
    noticeEl.innerHTML = `<span>${esc(state.errorNotice)}</span><button class="outline-btn" data-action="refresh">重新连接 ↻</button>`;
  } else {
    noticeEl.hidden = true;
    noticeEl.innerHTML = '';
  }
}

function renderMasthead() {
  const issue = window.LEADERBOARD_CONFIG?.issueMeta || { version: '4.1', title: '亚特兰蒂斯谋杀案', period: '11/05 – 12/10' };

  if (state.mode === 'mane') {
    const newMaps = activeManeMaps('new');
    const rerunMaps = activeManeMaps('rerun');
    const latestVer = newMaps[0]?.edition || issue.version;
    const players = new Set(state.maneScores.map((r) => normKey(r.display_name)).filter(Boolean)).size;
    const peak = findManeSitewidePeak();
    const peakSource = peak ? `${peak.map.name} · ${DIVISIONS[peak.rec.division]}` : '全站最高调查积分';

    $('#masthead').innerHTML = `
      <span class="masthead-stencil" aria-hidden="true">MANE’S BULLETIN</span>
      <div class="masthead-identity">
        <div class="masthead-title-row">
          <span class="title-seal-orb" aria-hidden="true"></span>
          <h1>鬃毛邮报</h1>
          <span class="masthead-en">Mane’s Bulletin</span>
        </div>
        <span class="edition-pill">
          <img class="uttu-micro-icon" src="./assets/uttu/btn_calendar.webp" alt="" aria-hidden="true" />
          <span>${esc(latestVer)} · ${esc(issue.title)}（${esc(issue.period)}）</span>
          <span class="edition-sep" aria-hidden="true"></span>
          <span class="edition-badge-text">${state.maneSection === 'new' ? '鉴藏者特版' : '怪相档案'}</span>
        </span>
      </div>
      <div class="masthead-metrics" aria-label="全站档案实时统计">
        <div class="mstat-cell">
          <strong>${state.maneScores.length || '—'}</strong>
          <small>全站有效纪录</small>
        </div>
        <div class="mstat-cell">
          <strong>${players || '—'}</strong>
          <small>上榜调查员</small>
        </div>
        <div class="mstat-cell">
          <strong>${newMaps.length} / ${rerunMaps.length}</strong>
          <small>鉴藏 / 怪相首领</small>
        </div>
        ${peak
          ? `<button type="button" class="mstat-cell mstat-jump" data-jump-mane-record="${esc(peak.rec.id)}" data-jump-section="${esc(peak.map.section)}" data-jump-map="${esc(peak.map.id)}" data-jump-div="${esc(peak.rec.division)}" title="点击直达全站最高分所属榜单：${esc(peakSource)}">
               <strong>${formatScore(peak.score)}</strong>
               <small><span class="jump-tag">全站最高</span> ${esc(peakSource)} ↗</small>
             </button>`
          : `<div class="mstat-cell"><strong>—</strong><small>全站最高积分</small></div>`
        }
      </div>`;
  } else {
    const activeVer = state.fbVersions.find((v) => v.id === state.fbVersionId) || state.fbVersions[0];
    const activePlayers = new Set(state.fbPlayers.map(p=>p.player_id)).size;
    const peak = findFlashbackSitewidePeak();
    const peakSource = peak ? `${peak.stage.name} · ${DIVISIONS[peak.rec.group_code]}` : '限定 0–6 回合';

    $('#masthead').innerHTML = `
      <span class="masthead-stencil" aria-hidden="true">FLASHBACK</span>
      <div class="masthead-identity">
        <div class="masthead-title-row">
          <span class="title-seal-orb" aria-hidden="true"></span>
          <h1>焦点闪回</h1>
          <span class="masthead-en">Time Leaves Names</span>
        </div>
        <span class="edition-pill">
          <img class="uttu-micro-icon" src="./assets/uttu/btn_calendar.webp" alt="" aria-hidden="true" />
          <span>${esc(activeVer?.label || '焦点闪回周期榜')}</span>
          <span class="edition-sep" aria-hidden="true"></span>
          <span class="edition-badge-text">0–6 回合限定</span>
        </span>
      </div>
      <div class="masthead-metrics" aria-label="焦点闪回全站统计">
        <div class="mstat-cell">
          <strong>${state.fbRecords.length || '—'}</strong>
          <small>全站有效纪录</small>
        </div>
        <div class="mstat-cell">
          <strong>${activePlayers || '—'}</strong>
          <small>荣耀玩家</small>
        </div>
        <div class="mstat-cell">
          <strong>${state.fbVersions.length || '—'}</strong>
          <small>收录版本期次</small>
        </div>
        ${peak
          ? `<button type="button" class="mstat-cell mstat-jump" data-jump-fb-record="${esc(peak.rec.id)}" data-jump-ver="${esc(peak.stage.version_id)}" data-jump-stage="${esc(peak.stage.id)}" data-jump-grp="${esc(peak.rec.group_code)}" title="点击直达最短回合纪录：${esc(peakSource)}">
               <strong>${peak.rec.rounds} 回合</strong>
               <small><span class="jump-tag">全站最快</span> ${esc(peakSource)} ↗</small>
             </button>`
          : `<div class="mstat-cell"><strong>06</strong><small>限定回合上限</small></div>`
        }
      </div>`;
  }
}

/* ==================== 首领 / 关卡机制档案抽屉 ==================== */
function highlightMechText(text) {
  return esc(text)
    .replace(/\[([^\]]+)\]/g, '<span class="mech-kw">[$1]</span>')
    .replace(/【([^】]+)】/g, '<strong class="mech-em">【$1】</strong>');
}

function renderManeBossMechanicsDrawer(mech) {
  if (!mech || !state.maneMechOpen) return '';
  return `
    <div class="boss-mech-drawer" role="region" aria-label="首领核心机制">
      <div class="mech-drawer-top">
        <div class="mech-top-meta">
          <span class="mech-badge">${esc(mech.modeTag)}</span>
          <span class="mech-field-tag">${esc(mech.battlefield)}</span>
          <span class="mech-favored">${esc(mech.favoredText)}</span>
        </div>
        <button type="button" class="mech-close-btn" data-action="toggle-mane-mech">收起机制 ▴</button>
      </div>

      <div class="mech-env-block">
        <div class="mech-section-label">场地规则 · ENVIRONMENT</div>
        <ul class="mech-env-list">
          ${mech.envRules.map((line) => `<li>${highlightMechText(line)}</li>`).join('')}
        </ul>
      </div>

      <div class="mech-passives-block">
        <div class="mech-section-label">首领核心机制 · BOSS PASSIVES</div>
        <div class="mech-passives-grid">
          ${mech.passives.map((p) => `
            <div class="mech-passive-card">
              <strong>${esc(p.name)}</strong>
              <p>${highlightMechText(p.desc)}</p>
            </div>`).join('')}
        </div>
      </div>

      ${mech.thresholds?.length ? `
        <div class="mech-thresholds-block">
          <div class="mech-section-label">沉浸式鉴赏 · 分数阶梯强化</div>
          <div class="mech-threshold-grid">
            ${mech.thresholds.map((t) => `
              <div class="mech-threshold-item">
                <span class="mech-score-pill">${esc(t.score)}</span>
                <p>${highlightMechText(t.desc)}</p>
              </div>`).join('')}
          </div>
        </div>` : ''}
    </div>`;
}

function renderFlashbackStageMechanicsDrawer(mech) {
  if (!mech || !state.fbMechOpen) return '';
  return `
    <div class="boss-mech-drawer" role="region" aria-label="焦点闪回关卡机制">
      <div class="mech-drawer-top">
        <div class="mech-top-meta">
          <span class="mech-badge">${esc(mech.modeTag)}</span>
          <span class="mech-favored">敌方阵容：${esc(mech.enemies)}</span>
        </div>
        <button type="button" class="mech-close-btn" data-action="toggle-fb-mech">收起机制 ▴</button>
      </div>

      <div class="mech-env-block">
        <div class="mech-section-label">场地条件与可用增幅 · ENVIRONMENT &amp; BUFFS</div>
        <ul class="mech-env-list">
          ${mech.envRules.map((line) => `<li>${highlightMechText(line)}</li>`).join('')}
        </ul>
      </div>

      <div class="mech-passives-block">
        <div class="mech-section-label">敌方核心机制 · ENEMY MECHANICS</div>
        <div class="mech-passives-grid">
          ${mech.passives.map((p) => `
            <div class="mech-passive-card">
              <strong>${esc(p.name)}</strong>
              <p>${highlightMechText(p.desc)}</p>
            </div>`).join('')}
        </div>
      </div>
    </div>`;
}

/* ==================== 鬃毛邮报页面渲染 ==================== */
function renderManeWorkspace() {
  const newMaps = activeManeMaps('new');
  const rerunMaps = activeManeMaps('rerun');
  const maps = activeManeMaps(state.maneSection);
  if (!maps.some((m) => m.id === state.maneMapId)) state.maneMapId = maps[0]?.id || '';

  const sectionBar = `
    <div class="section-bar">
      <div class="section-tabs" role="group" aria-label="鬃毛邮报分区">
        <button class="section-tab-btn ${state.maneSection === 'new' ? 'active' : ''}" data-mane-section="new">
          <span>${MANE_SECTIONS.new}</span>
          <span class="tab-count">${newMaps.length}</span>
        </button>
        <button class="section-tab-btn ${state.maneSection === 'rerun' ? 'active' : ''}" data-mane-section="rerun">
          <span>${MANE_SECTIONS.rerun}</span>
          <span class="tab-count">${rerunMaps.length}</span>
        </button>
      </div>
      <button class="ghost-btn icon-btn" data-action="refresh"><img class="uttu-micro-icon" src="./assets/uttu/btn_reset.webp" alt="" aria-hidden="true" /><span>刷新档案</span></button>
    </div>`;

  if (state.manePage === 'rules') {
    return renderManeRules();
  }

  if (state.manePage === 'players') {
    return renderManePlayers();
  }

  if (state.manePage === 'totals') {
    return sectionBar + renderManeTotals(maps[0]?.edition || '', maps);
  }

  const map = maps.find((m) => m.id === state.maneMapId);
  const mapIndex = Math.max(0, maps.findIndex((m) => m.id === state.maneMapId));
  const bossAsset = resolveBossAsset(map?.name || '', state.maneSection);
  const bossMech = resolveManeBossMechanics(map?.name || '');
  const bossEn = bossAsset.en;
  const isWideCutout = bossAsset.hero && bossAsset.hero !== bossAsset.thumb;

  const mapCounts = new Map();
  for (const r of state.maneScores) {
    if (r.division === state.maneDivision) {
      mapCounts.set(r.map_id, (mapCounts.get(r.map_id) || 0) + 1);
    }
  }

  const zeroCount = state.maneScores.filter((r) => r.map_id === state.maneMapId && r.division === 'zero').length;
  const maxCount = state.maneScores.filter((r) => r.map_id === state.maneMapId && r.division === 'max').length;

  const ranked = state.maneScores
    .filter((r) => r.map_id === state.maneMapId && r.division === state.maneDivision)
    .sort(compareManeScore);

  // 统一角色 ID 去重后的筛选项（支持「仅看主 C」与「阵容含该角色」）
  const charEntries = collectBoardCharacters(ranked, state.maneRoleMode, (r) => r.carry);
  const charLabelByKey = new Map(charEntries.map(([k, info]) => [k, info.label]));
  if (state.maneCarry && !charLabelByKey.has(state.maneCarry)) state.maneCarry = '';

  const q = normKey(state.maneQuery);
  const hasFilter = Boolean(state.maneCarry || state.maneAfflatus || q);
  const filteredRows = ranked
    .map((record, idx) => ({ record, rank: idx + 1 }))
    .filter(({ record }) => {
      const targetNames = state.maneRoleMode === 'member'
        ? (record.team || [])
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
    const canonicalCarryText = formatCanonicalCarry(record.carry);
    const canonicalTeam = (record.team || []).map(canonicalDisplayName);
    posterIndex.set(pid, {
      mode: 'mane',
      recordId: record.id,
      section: state.maneSection,
      mapId: map?.id || state.maneMapId,
      division: state.maneDivision,
      rank,
      title: map?.name || '鬃毛邮报',
      bossEn,
      bossThumb: bossAsset.thumb,
      subtitle: `${MANE_SECTIONS[state.maneSection]} · ${DIVISIONS[state.maneDivision]}`,
      player: record.display_name,
      carry: canonicalCarryText,
      team: record.team,
      canonicalTeam,
      score: record.score,
      date: formatDateTime(record.created_at),
      related_url: record.related_url
    });
    const tierClass = rank <= 3 ? `top-${rank} is-podium` : 'is-regular';
    const highlightClass = state.highlightRecordId === pid ? 'is-highlighted' : '';
    const carryTitleAttr = record.carry.trim() !== canonicalCarryText ? ` title="原填：${esc(record.carry)}"` : '';
    return `
      <article class="rank-row ${tierClass} ${highlightClass}" data-record-row="${esc(pid)}">
        <div>${renderRankBadge(rank)}</div>
        <div class="player-cell">
          <span class="player-name">${esc(record.display_name)}</span>
          <div class="player-meta">
            <span title="${esc(formatDateTime(record.created_at))}">${formatMonthDayTime(record.created_at)}</span>
            ${safeLinkHtml(record.related_url, '视频/攻略 ↗')}
          </div>
        </div>
        <div class="lineup-cell">
          <div class="carry-line"${carryTitleAttr}>
            <span>主 C · ${esc(canonicalCarryText)}</span>
          </div>
          ${renderFormationHtml(record.team, record.carry)}
        </div>
        <div class="result-cell">
          <div class="peak-score-ticket">
            <div class="peak-score-text">
              <span class="peak-label">调查积分</span>
              <span class="score-value">${formatScore(record.score)}</span>
            </div>
            ${renderGradeStamp(record.score)}
          </div>
          <div class="row-actions">
            <button class="card-trigger" data-poster="${esc(pid)}">查看</button>
          </div>
        </div>
      </article>`;
  }).join('');

  const boardCountText = hasFilter
    ? `符合条件 ${filteredRows.length} 条 / 共 ${ranked.length} 条`
    : `${DIVISIONS[state.maneDivision]} · 共 ${ranked.length} 条`;

  const weaknessLabel = state.maneSection === 'new' ? '弱点' : '优势';
  const weaknessHtml = (bossAsset.weakness || []).length
    ? `<span class="glance-weakness"><span class="glance-label">${weaknessLabel}</span>${bossAsset.weakness.map((k) => {
        const meta = AFFLATUS_META[k];
        return meta ? `<span class="glance-aff-chip"><img src="${esc(meta.icon)}" alt="" aria-hidden="true" />${esc(meta.label)}</span>` : '';
      }).join('')}</span>`
    : '';

  const canResetFilter = Boolean(hasFilter || state.maneRoleMode !== 'carry');

  return `
    ${sectionBar}
    <div class="board-grid">
      <aside class="sidebar-panel" aria-label="鬃毛邮报筛选条件">
        <div>
          ${igHeading('调查对象', 'SURVEY', `${DIVISIONS[state.maneDivision]}计数`)}
          <div class="dossier-list" role="listbox" aria-label="选择调查对象">
            ${maps.map((m, idx) => {
              const cnt = mapCounts.get(m.id) || 0;
              const mArt = resolveBossAsset(m.name, state.maneSection);
              const weakBrief = (mArt.weakness || []).map((k) => AFFLATUS_META[k]?.label).filter(Boolean).join('/');
              const subText = m.opens_at
                ? `${weakBrief ? `弱点:${weakBrief} · ` : ''}${formatMonthDay(m.opens_at)} 开放`
                : `${weakBrief ? `优势:${weakBrief}` : `${m.edition} 怪相档案`}`;
              return `
                <button class="dossier-item ${m.id === state.maneMapId ? 'active' : ''} ${mArt.thumb ? 'has-boss-bg' : ''}" data-mane-map="${esc(m.id)}" title="${esc(m.name)}（${DIVISIONS[state.maneDivision]}共 ${cnt} 条纪录）">
                  ${mArt.thumb ? `<span class="dossier-boss-art" style="background-image:url('${esc(mArt.thumb)}');background-position:${esc(mArt.pos)}" aria-hidden="true"></span>` : ''}
                  <span class="survey-num-box" aria-hidden="true">${idx + 1}</span>
                  <span class="dossier-main">
                    <span class="dossier-name">${esc(m.name)}</span>
                    <span class="dossier-sub">${esc(subText)}</span>
                  </span>
                  <span class="dossier-badge">${cnt} 条</span>
                </button>`;
            }).join('') || '<p class="sidebar-note">正在读取首领目录…</p>'}
          </div>
        </div>

        <div>
          ${igHeading('塑造分组', 'PORTRAYAL')}
          <div class="segmented-toggle">
            <button class="seg-btn ${state.maneDivision === 'zero' ? 'active' : ''}" data-mane-div="zero">
              <span>全 0 塑造</span><small>${zeroCount} 条纪录</small>
            </button>
            <button class="seg-btn ${state.maneDivision === 'max' ? 'active' : ''}" data-mane-div="max">
              <span>全满塑造</span><small>${maxCount} 条纪录</small>
            </button>
          </div>
        </div>

        <div class="lineup-filter-box">
          <div class="ig-heading">
            <span class="ig-heading-left">
              <span class="ig-tri" aria-hidden="true">▶</span>
              <span class="ig-cn">阵容筛选</span>
              <span class="ig-bar" aria-hidden="true"></span>
              <span class="ig-en">LINEUP FILTER</span>
            </span>
            <button type="button" class="filter-reset-btn" data-action="reset-mane-filter" ${canResetFilter ? '' : 'disabled'} title="清空所有阵容筛选条件">
              <img src="./assets/uttu/btn_reset.webp" alt="" aria-hidden="true" />
              <span>重置</span>
            </button>
          </div>

          <div class="role-mode-toggle" role="group" aria-label="角色筛选口径">
            <button type="button" class="role-pill ${state.maneRoleMode === 'carry' ? 'active' : ''}" data-mane-role="carry">仅看主 C</button>
            <button type="button" class="role-pill ${state.maneRoleMode === 'member' ? 'active' : ''}" data-mane-role="member">阵容含该角色</button>
          </div>

          <div class="field" style="margin-bottom:8px">
            <select id="maneCarrySelect" class="filter-select" aria-label="${state.maneRoleMode === 'carry' ? '按主 C 角色筛选' : '按上阵角色筛选'}">
              <option value="">${state.maneRoleMode === 'carry' ? `全部主 C（${charEntries.length}）` : `全部上阵角色（${charEntries.length}）`}</option>
              ${optionsHtml(charEntries.map(([k, info]) => [k, `${info.label}（${info.count}）`]), state.maneCarry)}
            </select>
          </div>

          ${renderAfflatusFilterHtml(state.maneAfflatus, 'data-mane-aff')}

          <div class="search-input-wrap">
            <img class="search-input-icon" src="./assets/uttu/btn_search.webp" alt="" aria-hidden="true" />
            <input id="maneSearchInput" class="filter-input has-icon" type="search" placeholder="搜索调查员、角色名或简称…" value="${esc(state.maneQuery)}" aria-label="搜索调查员或角色" />
          </div>
        </div>

        <div class="sidebar-note">
          同图、同组、同完整配队仅保留最高分；异体/简称写法已按统一角色 ID 自动关联。
          ${state.maneSection === 'rerun' ? '<br/>复刻目录参考 Wiki 往期首领，可挑战地图以游戏内「怪相档案」为准。' : ''}
        </div>
      </aside>

      <section class="board-panel" aria-label="鬃毛邮报调查积分榜">
        <div class="board-header ${bossAsset.thumb ? 'has-boss-art' : ''}">
          ${bossAsset.thumb ? `<div class="boss-header-backdrop" style="background-image:url('${esc(bossAsset.thumb)}');background-position:${esc(bossAsset.pos)}" aria-hidden="true"></div>` : ''}
          ${isWideCutout ? `<img class="boss-header-cutout" src="${esc(bossAsset.hero)}" alt="" aria-hidden="true" loading="eager" decoding="async" />` : ''}
          <div class="boss-header-scrim" aria-hidden="true"></div>
          <div class="board-title-stack">
            <div class="boss-headline-wrap">
              <h2>${esc(map?.name || '调查积分榜')}</h2>
              <span class="boss-en-sub">${esc(bossEn)}</span>
            </div>
            <div class="boss-quick-glance">
              ${weaknessHtml}
              ${(bossAsset.tags || []).length ? `<span class="glance-tags">${esc(bossAsset.tags.join(' / '))}</span>` : ''}
              <span class="glance-meta">${bossMech?.turns ? `${bossMech.turns} 回合` : ''}${map?.opens_at ? ` · ${formatMonthDay(map.opens_at)} 开放` : ''}</span>
              ${bossMech ? `<button type="button" class="mech-toggle-btn ${state.maneMechOpen ? 'active' : ''}" data-action="toggle-mane-mech" aria-expanded="${state.maneMechOpen}">${state.maneMechOpen ? '收起首领机制 ▴' : '查看首领机制 ▾'}</button>` : ''}
              ${state.maneCarry ? `<span class="glance-active-chip">${state.maneRoleMode === 'carry' ? '主 C' : '含角色'}：${esc(charLabelByKey.get(state.maneCarry) || '')}</span>` : ''}
              ${state.maneAfflatus ? `<span class="glance-active-chip">灵感：${esc(AFFLATUS_META[state.maneAfflatus]?.label || '')}</span>` : ''}
            </div>
          </div>
          <div class="board-header-right">
            <span class="count-tag ${hasFilter ? 'is-filtered' : ''}">${esc(boardCountText)}</span>
            ${state.connected && isMapOpen(map) ? '<button class="paper-btn" data-action="open-submit">投稿此图</button>' : ''}
          </div>
        </div>

        ${renderManeBossMechanicsDrawer(bossMech)}

        ${filteredRows.length
          ? `<div class="rank-list">
               <div class="rank-list-head">
                 <span>名次</span><span>调查员</span><span>主 C 与上阵阵容</span><span class="col-right">调查积分 / 评级</span>
               </div>
               ${rowsHtml}
             </div>`
          : `<div class="empty-state">
               <span class="empty-glyph">✦</span>
               <h3>${state.loading ? '正在检索档案库…' : (ranked.length ? '无匹配的筛选结果' : '暂无审核通过的成绩')}</h3>
               <p>${ranked.length ? '可尝试点击左侧「重置」清空筛选条件。' : '成为该首领与塑造分组的首位纪录保持者。'}</p>
               ${ranked.length ? '<button class="outline-btn" data-action="reset-mane-filter">重置筛选条件</button>' : (state.connected && isMapOpen(map) ? '<button class="copper-btn" data-action="open-submit">立即投稿成绩</button>' : '')}
             </div>`
        }
      </section>
    </div>`;
}

function renderManeTotals(latestEdition, sectionMaps = []) {
  const editionKey = state.maneSection === 'new' ? latestEdition : '';
  const totalMapsCount = sectionMaps.length;
  const mapNamesPreview = state.maneSection === 'new'
    ? sectionMaps.map((m) => `「${m.name}」`).join('、')
    : `全部 ${totalMapsCount} 张怪相档案复刻首领图`;

  // 按统一角色规范 ID 合并异体/简称写法（如「银装小春雀」与「银装小春雀儿」合并并按单图取最高分）
  const mergedByChar = new Map();
  for (const row of state.maneTotals) {
    if (row.section !== state.maneSection || row.edition !== editionKey || row.division !== state.maneDivision) continue;
    const key = canonicalCharacterKey(row.carry_name);
    const displayName = canonicalDisplayName(row.carry_name);
    let bucket = mergedByChar.get(key);
    if (!bucket) {
      bucket = {
        key,
        carry_name: displayName,
        rawNames: new Set(),
        mapBest: new Map()
      };
      mergedByChar.set(key, bucket);
    }
    bucket.rawNames.add(row.carry_name);
    for (const m of (row.map_scores || [])) {
      const mKey = m.map_id || m.name;
      const prev = bucket.mapBest.get(mKey);
      if (!prev || BigInt(m.score || 0) > BigInt(prev.score || 0)) {
        bucket.mapBest.set(mKey, m);
      }
    }
  }

  const rows = [...mergedByChar.values()]
    .map((b) => {
      const mapScores = [...b.mapBest.values()].sort((a, c) => {
        const diff = BigInt(c.score || 0) - BigInt(a.score || 0);
        return diff > 0n ? 1 : diff < 0n ? -1 : String(a.name).localeCompare(String(c.name), 'zh-CN');
      });
      let total = 0n;
      for (const m of mapScores) total += BigInt(m.score || 0);
      return {
        carry_key: b.key,
        carry_name: b.carry_name,
        mergedAliases: b.rawNames.size > 1 ? [...b.rawNames] : [],
        map_count: mapScores.length,
        map_scores: mapScores,
        total
      };
    })
    .sort((a, b) => {
      if (a.total !== b.total) return a.total > b.total ? -1 : 1;
      return (b.map_count - a.map_count) ||
        String(a.carry_name).localeCompare(String(b.carry_name), 'zh-CN') ||
        String(a.carry_key).localeCompare(String(b.carry_key));
    });

  return `
    <div class="board-panel">
      <div class="board-header">
        <div class="board-title-stack">
          <div class="board-survey-tag"><span>AGGREGATE REPORT · 主 C 总分汇总</span></div>
          <div class="boss-headline-wrap">
            <h2>主 C 调查总分榜</h2>
            <span class="boss-en-sub">Carry Aggregate Score</span>
          </div>
          <div class="paper-tag-row">
            <span class="paper-tag">${DIVISIONS[state.maneDivision]}</span>
            <span class="paper-tag dark">${esc(MANE_SECTIONS[state.maneSection])} · 共 ${totalMapsCount} 张图</span>
          </div>
        </div>
        <div class="board-header-right">
          <div class="segmented-toggle" style="min-width:210px">
            <button class="seg-btn ${state.maneDivision === 'zero' ? 'active' : ''}" data-mane-div="zero"><span>全 0 塑造</span></button>
            <button class="seg-btn ${state.maneDivision === 'max' ? 'active' : ''}" data-mane-div="max"><span>全满塑造</span></button>
          </div>
        </div>
      </div>

      <div class="totals-methodology">
        <div class="method-item"><strong>纳入范围：</strong>${esc(mapNamesPreview || '当前分区所有首领图')}。</div>
        <div class="method-item"><strong>缺图计分：</strong>某图暂无该主 C 的已审核成绩时按 <code>0</code> 分计入总分，并在明细标注「已收录 X / ${totalMapsCount || '—'} 张」。</div>
        <div class="method-item"><strong>双主 C 与异名合并：</strong>共同主 C（如 <code>A/B</code>）拆分后各自按单图最高分独立归属；异体/简称写法按统一角色 ID 自动去重合并。</div>
      </div>

      ${rows.length
        ? `<div class="table-scroll">
            <table class="archive-table">
              <thead><tr><th style="width:76px">名次</th><th>主 C 角色</th><th>各图最高分明细</th><th class="num-col">调查总分</th></tr></thead>
              <tbody>
                ${rows.map((row, idx) => `
                    <tr>
                      <td>${renderRankBadge(idx + 1)}</td>
                      <td>
                        <div style="display:flex;align-items:center;gap:10px">
                          ${renderCarryAvatarHtml(row.carry_name)}
                          <div>
                            <strong style="font-family:var(--font-serif);font-size:15px">${esc(row.carry_name)}</strong>
                            ${row.mergedAliases.length ? `<span class="alias-merge-note" title="已自动合并同角色写法：${esc(row.mergedAliases.join(' / '))}">已合并异名</span>` : ''}
                          </div>
                        </div>
                      </td>
                      <td>
                        <details class="map-breakdown">
                          <summary>已收录 ${row.map_count}${totalMapsCount ? ` / ${totalMapsCount}` : ''} 张首领图（点击展开各图纪录）</summary>
                          <ul>
                            ${(row.map_scores || []).map((m) => `
                              <li>
                                <strong>${esc(m.name)}</strong> · <span style="display:inline;color:var(--copper-bright)">${formatScore(m.score)}</span>
                                <span>调查员：${esc(m.player)} · 配队：${esc((m.team || []).map(canonicalDisplayName).join('、'))}</span>
                              </li>`).join('')}
                          </ul>
                        </details>
                      </td>
                      <td class="num-col"><span class="score-value">${formatScore(row.total)}</span></td>
                    </tr>`).join('')}
              </tbody>
            </table>
          </div>`
        : `<div class="empty-state"><span class="empty-glyph">✦</span><h3>暂无可汇总成绩</h3><p>该分区与塑造分组下尚无已审核通过的纪录。</p></div>`
      }
      <div class="board-foot">
        <span>${DIVISIONS[state.maneDivision]} · 共 ${rows.length} 位主 C 上榜</span>
        <span>单图缺席按 0 分计</span>
      </div>
    </div>`;
}

function renderManePlayers() {
  const scopes = { all: '全部首领汇总', new: '鉴藏者特版', rerun: '怪相档案' };
  const divs = { all: '全部分组', zero: '全 0 塑造', max: '全满塑造' };

  const newMaps = activeManeMaps('new');
  const rerunMaps = activeManeMaps('rerun');
  const scopedMaps = state.manePlayerScope === 'new'
    ? newMaps
    : state.manePlayerScope === 'rerun'
      ? rerunMaps
      : [...newMaps, ...rerunMaps];
  const mapById = new Map(scopedMaps.map((m) => [m.id, m]));

  // 先按每张图 × 塑造组计算精确名次，再聚合到各调查员名下
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
          entries: []
        };
        playersMap.set(pKey, p);
      }
      const map = mapById.get(rec.map_id);
      const score = BigInt(rec.score || 0);
      p.recordCount += 1;
      if (rank === 1) p.firstCount += 1;
      if (rank <= 3) p.podiumCount += 1;
      if (score > p.bestScore) {
        p.bestScore = score;
        p.bestLabel = `${map?.name || ''} · ${DIVISIONS[rec.division]}`;
      }
      p.entries.push({
        id: rec.id,
        section: map?.section || 'new',
        mapId: rec.map_id,
        mapName: map?.name || '未知首领',
        division: rec.division,
        rank,
        score,
        carry: formatCanonicalCarry(rec.carry)
      });
    });
  }

  const rows = [...playersMap.values()]
    .map((p) => {
      p.entries.sort((a, b) => (a.rank - b.rank) || (b.score > a.score ? 1 : b.score < a.score ? -1 : 0));
      return p;
    })
    .sort((a, b) =>
      (b.recordCount - a.recordCount) ||
      (b.firstCount - a.firstCount) ||
      (b.podiumCount - a.podiumCount) ||
      (b.bestScore > a.bestScore ? 1 : b.bestScore < a.bestScore ? -1 : 0) ||
      String(a.name).localeCompare(String(b.name), 'zh-CN')
    );

  return `
    <div class="section-bar">
      <div class="section-tabs" role="group" aria-label="荣誉统计范围">
        ${Object.entries(scopes).map(([k, lbl]) =>
          `<button class="section-tab-btn ${k === state.manePlayerScope ? 'active' : ''}" data-mane-player-scope="${k}">${lbl}</button>`
        ).join('')}
      </div>
      <div class="section-tabs" role="group" aria-label="塑造分组范围">
        ${Object.entries(divs).map(([k, lbl]) =>
          `<button class="outline-btn ${k === state.manePlayerDiv ? 'selected' : ''}" data-mane-player-div="${k}">${lbl}</button>`
        ).join('')}
      </div>
    </div>

    <div class="board-panel">
      <div class="board-header">
        <div class="board-title-stack">
          <div class="boss-headline-wrap">
            <h2>玩家荣誉殿堂</h2>
            <span class="boss-en-sub">Mane’s Bulletin Hall of Fame</span>
          </div>
          <div class="paper-tag-row">
            <span class="paper-tag">${scopes[state.manePlayerScope]}</span>
            <span class="paper-tag dark">${divs[state.manePlayerDiv]} · 按持榜数 / 榜首次数 / 前三次数 / 最高分排序</span>
          </div>
        </div>
        <span class="count-tag">${rows.length} 位上榜调查员</span>
      </div>

      ${rows.length
        ? `<div class="table-scroll">
            <table class="archive-table">
              <thead>
                <tr>
                  <th style="width:70px">名次</th>
                  <th>调查员</th>
                  <th>荣誉分布与持榜明细</th>
                  <th class="num-col">最高单图积分</th>
                  <th class="num-col" style="width:116px">当前持榜数</th>
                </tr>
              </thead>
              <tbody>
                ${rows.map((p, idx) => `
                  <tr>
                    <td>${renderRankBadge(idx + 1)}</td>
                    <td><strong class="player-name">${esc(p.name)}</strong></td>
                    <td>
                      <div class="honor-badges-row">
                        ${p.firstCount ? `<span class="honor-chip gold">榜首 ×${p.firstCount}</span>` : ''}
                        ${p.podiumCount ? `<span class="honor-chip bronze">前三 ×${p.podiumCount}</span>` : ''}
                      </div>
                      <details class="map-breakdown">
                        <summary>展开全部 ${p.recordCount} 条持榜纪录</summary>
                        <ul>
                          ${p.entries.map((e) => `
                            <li>
                              <strong>#${e.rank} ${esc(e.mapName)}</strong>（${DIVISIONS[e.division]}）·
                              <span style="display:inline;color:var(--copper-bright)">${formatScore(e.score)}</span>
                              <button type="button" class="text-link-btn" style="margin-left:8px" data-jump-mane-record="${esc(e.id)}" data-jump-section="${esc(e.section)}" data-jump-map="${esc(e.mapId)}" data-jump-div="${esc(e.division)}">直达 ↗</button>
                              <span>主 C：${esc(e.carry)}</span>
                            </li>`).join('')}
                        </ul>
                      </details>
                    </td>
                    <td class="num-col">
                      <span class="score-value" style="font-size:15.5px">${formatScore(p.bestScore)}</span>
                      <div style="font-size:11px;color:var(--ink-muted)">${esc(p.bestLabel)}</div>
                    </td>
                    <td class="num-col"><span class="score-value">${p.recordCount}</span> <span style="color:var(--ink-muted)">条</span></td>
                  </tr>`).join('')}
              </tbody>
            </table>
          </div>`
        : '<div class="empty-state"><span class="empty-glyph">♙</span><h3>当前范围内尚无上榜调查员</h3></div>'
      }
      <div class="board-foot">
        <span>数据实时汇总自当前全部已审核通过的鬃毛邮报持榜纪录（与焦点闪回不同，鬃毛原库未单独记录历史曾持榜次数，此处统计当前在榜荣誉）</span>
      </div>
    </div>`;
}

function renderManeRules() {
  const items = [
    ['01', '两大分区', '「鉴藏者特版」收录当期版本开放的 3 位首领；「怪相档案」收录往期目击者特版复刻首领。'],
    ['02', '全 0 / 全满塑造分榜', '全 0 塑造与全满塑造独立计分与排名，队伍内所有实际出战角色均需符合所选塑造分组要求。'],
    ['03', '主 C 与完整阵容', '填写 1–4 名不重复的上阵角色；支持共同主 C（用 / 分隔），且所有主 C 必须包含在所填上阵配队内。'],
    ['04', '同队取最高分', '同一地图、同一塑造组、同一完整角色组合仅保留最高调查积分；同分时按服务器提交时间先者居前。'],
    ['05', '截图核验与隐私', '须上传清晰结算截图（PNG/JPG/WebP，≤ 5 MB），截图仅本人与审核管理员通过临时签名查看，不对外公开。'],
    ['06', '主 C 总分统计', '主 C 总分榜按分区与塑造分组，汇总该角色在所有地图中的个人最高单图纪录之和，便于横向评估版本表现。']
  ];
  return `
    <div class="rules-grid">
      ${items.map(([num, title, desc]) => `
        <article class="rule-card">
          <span class="rule-num">${num}</span>
          <h3>${title}</h3>
          <p>${desc}</p>
        </article>`).join('')}
    </div>`;
}

/* ==================== 焦点闪回页面渲染 ==================== */
function renderFlashbackWorkspace() {
  if (state.fbPage === 'rules') return renderFlashbackRules();
  if (state.fbPage === 'carries') return renderFlashbackCarries();
  if (state.fbPage === 'players') return renderFlashbackPlayers();

  const ver = state.fbVersions.find((v) => v.id === state.fbVersionId);
  const stages = standardStages(state.fbVersionId);
  if (!stages.some((s) => s.id === state.fbStageId)) state.fbStageId = stages[0]?.id || '';
  const stage = stages.find((s) => s.id === state.fbStageId);
  const stageMech = resolveFlashbackStageMechanics(stage);

  const stageCounts = new Map();
  for (const r of state.fbRecords) {
    if (r.group_code === state.fbGroup) {
      stageCounts.set(r.stage_id, (stageCounts.get(r.stage_id) || 0) + 1);
    }
  }

  const zeroCount = state.fbRecords.filter((r) => r.stage_id === state.fbStageId && r.group_code === 'zero').length;
  const maxCount = state.fbRecords.filter((r) => r.stage_id === state.fbStageId && r.group_code === 'max').length;

  const ranked = state.fbRecords
    .filter((r) => r.stage_id === state.fbStageId && r.group_code === state.fbGroup)
    .sort(compareFlashbackRecord);

  const charEntries = collectBoardCharacters(ranked, state.fbRoleMode, (r) => r.carry_name);
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
    const canonicalCarryText = formatCanonicalCarry(record.carry_name);
    const canonicalTeam = isLegacyShorthandTeam(record.team)
      ? record.team
      : (record.team || []).map(canonicalDisplayName);
    posterIndex.set(pid, {
      mode: 'flashback',
      recordId: record.id,
      versionId: ver?.id || state.fbVersionId,
      stageId: stage?.id || state.fbStageId,
      group: state.fbGroup,
      rank,
      title: stage?.name || '焦点闪回',
      subtitle: `${ver?.label || ''} · ${DIVISIONS[state.fbGroup]}`,
      player: record.display_name,
      carry: canonicalCarryText,
      team: record.team,
      canonicalTeam,
      rounds: record.rounds,
      date: formatDateTime(record.created_at),
      related_url: record.related_url
    });
    const tierClass = rank <= 3 ? `top-${rank} is-podium` : 'is-regular';
    const highlightClass = state.highlightRecordId === pid ? 'is-highlighted' : '';
    const carryTitleAttr = record.carry_name.trim() !== canonicalCarryText ? ` title="原填：${esc(record.carry_name)}"` : '';
    return `
      <article class="rank-row ${tierClass} ${highlightClass}" data-record-row="${esc(pid)}">
        <div>${renderRankBadge(rank)}</div>
        <div class="player-cell">
          <span class="player-name">${esc(record.display_name)}</span>
          <div class="player-meta">
            <span title="${esc(formatDateTime(record.created_at))}">${formatMonthDayTime(record.created_at)}</span>
            ${safeLinkHtml(record.related_url, '视频/攻略 ↗')}
          </div>
        </div>
        <div class="lineup-cell">
          <div class="carry-line"${carryTitleAttr}>
            <span>主 C · ${esc(canonicalCarryText)}</span>
          </div>
          ${record.resonance_ten ? resonanceBadge : ''}
          ${renderFormationHtml(record.team, record.carry_name)}
        </div>
        <div class="result-cell">
          <span class="round-badge">${record.rounds}<small>回合</small></span>
          <div class="row-actions">
            <button class="card-trigger" data-poster="${esc(pid)}">查看</button>
          </div>
        </div>
      </article>`;
  }).join('');

  const archiveHtml = archives.length ? `
    <div class="board-foot"><span>历史档案 · ${DIVISIONS[state.fbGroup]} · 6 回合内满星（沿用原表简称与行序）</span></div>
    <div class="table-scroll">
      <table class="archive-table">
        <thead><tr><th>主 C</th><th>原表配队</th><th>攻略者</th><th class="num-col">成绩</th></tr></thead>
        <tbody>
          ${archives.map((row) => `
            <tr>
              <td>${(row.carry_names || []).map((c) => esc(canonicalDisplayName(c))).join('／')}</td>
              <td>${esc(row.lineup_label)}</td>
              <td>${esc(row.credited_player)}</td>
              <td class="num-col">≤ 6 回合</td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>` : '';

  const boardCountText = hasFilter
    ? `符合条件 ${filteredRows.length} 条 / 共 ${ranked.length} 条`
    : `${DIVISIONS[state.fbGroup]} · 共 ${ranked.length} 条`;

  const canResetFilter = Boolean(hasFilter || state.fbRoleMode !== 'carry');

  return `
    <div class="section-bar">
      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;flex:1">
        <label for="fbVersionSelect" style="font-size:12.5px;color:var(--brass);font-family:var(--font-serif)">收录期次</label>
        <select id="fbVersionSelect" class="filter-select" style="width:auto;min-width:240px;max-width:100%">
          ${optionsHtml(state.fbVersions.map((v) => [v.id, v.label]), state.fbVersionId)}
        </select>
      </div>
      <button class="ghost-btn icon-btn" data-action="refresh"><img class="uttu-micro-icon" src="./assets/uttu/btn_reset.webp" alt="" aria-hidden="true" /><span>刷新榜单</span></button>
    </div>

    <div class="board-grid">
      <aside class="sidebar-panel" aria-label="焦点闪回筛选栏">
        <div>
          ${igHeading('挑战关卡', 'STAGE SELECT', `${DIVISIONS[state.fbGroup]}计数`)}
          <div class="dossier-list">
            ${stages.map((s) => {
              const cnt = stageCounts.get(s.id) || 0;
              const sMech = resolveFlashbackStageMechanics(s);
              const cleanName = cleanStageDisplayName(s.name);
              const enemyBrief = sMech?.enemies
                ? sMech.enemies.replace(/（[^）]*）/g, '').replace(/\s*×\s*\d+/g, '').replace(/\s*\+\s*/g, ' · ')
                : `关卡 ${s.stage_no}`;
              return `
                <button class="dossier-item ${s.id === state.fbStageId ? 'active' : ''}" data-fb-stage="${esc(s.id)}" title="${esc(cleanName)}（${DIVISIONS[state.fbGroup]}共 ${cnt} 条纪录）">
                  <span class="survey-num-box" aria-hidden="true">${s.stage_no}</span>
                  <span class="dossier-main">
                    <span class="dossier-name">${esc(cleanName)}</span>
                    <span class="dossier-sub">${esc(enemyBrief)}</span>
                  </span>
                  <span class="dossier-badge">${cnt} 条</span>
                </button>`;
            }).join('') || '<p class="sidebar-note">暂无关卡数据</p>'}
          </div>
        </div>

        <div>
          ${igHeading('塑造限制', 'PORTRAYAL')}
          <div class="segmented-toggle">
            <button class="seg-btn ${state.fbGroup === 'zero' ? 'active' : ''}" data-fb-group="zero">
              <span>全 0 塑造</span><small>${zeroCount} 条纪录</small>
            </button>
            <button class="seg-btn ${state.fbGroup === 'max' ? 'active' : ''}" data-fb-group="max">
              <span>全满塑造</span><small>${maxCount} 条纪录</small>
            </button>
          </div>
        </div>

        <div class="lineup-filter-box">
          <div class="ig-heading">
            <span class="ig-heading-left">
              <span class="ig-tri" aria-hidden="true">▶</span>
              <span class="ig-cn">阵容筛选</span>
              <span class="ig-bar" aria-hidden="true"></span>
              <span class="ig-en">LINEUP FILTER</span>
            </span>
            <button type="button" class="filter-reset-btn" data-action="reset-fb-filter" ${canResetFilter ? '' : 'disabled'} title="清空所有阵容筛选条件">
              <img src="./assets/uttu/btn_reset.webp" alt="" aria-hidden="true" />
              <span>重置</span>
            </button>
          </div>

          <div class="role-mode-toggle" role="group" aria-label="角色筛选口径">
            <button type="button" class="role-pill ${state.fbRoleMode === 'carry' ? 'active' : ''}" data-fb-role="carry">仅看主 C</button>
            <button type="button" class="role-pill ${state.fbRoleMode === 'member' ? 'active' : ''}" data-fb-role="member">阵容含该角色</button>
          </div>

          <div class="field" style="margin-bottom:8px">
            <select id="fbCarrySelect" class="filter-select" aria-label="${state.fbRoleMode === 'carry' ? '按主 C 角色筛选' : '按上阵角色筛选'}">
              <option value="">${state.fbRoleMode === 'carry' ? `全部主 C（${charEntries.length}）` : `全部上阵角色（${charEntries.length}）`}</option>
              ${optionsHtml(charEntries.map(([k, info]) => [k, `${info.label}（${info.count}）`]), state.fbCarry)}
            </select>
          </div>

          ${renderAfflatusFilterHtml(state.fbAfflatus, 'data-fb-aff')}
          ${state.fbGroup === 'zero' ? `<button type="button" class="outline-btn ${resonanceOnly ? 'selected' : ''}" data-action="fb-resonance" aria-pressed="${resonanceOnly}">✦ 只看全0塑 · 共鸣10</button>` : ''}

          <div class="search-input-wrap">
            <img class="search-input-icon" src="./assets/uttu/btn_search.webp" alt="" aria-hidden="true" />
            <input id="fbSearchInput" class="filter-input has-icon" type="search" placeholder="搜索玩家名、角色名或简称…" value="${esc(state.fbQuery)}" aria-label="搜索玩家或角色" />
          </div>
        </div>

        <div class="sidebar-note">
          同一关卡、同一塑造组内，少人队可覆盖包含其全部角色的多人队。完整配队相同先比回合，再比提交时间。
        </div>
      </aside>

      <div>
        <section class="board-panel">
          <div class="board-header">
            <div class="board-title-stack">
              <div class="boss-headline-wrap">
                <h2>${esc(cleanStageDisplayName(stage?.name || '焦点闪回榜'))}</h2>
                <span class="boss-en-sub">Flashback Challenge</span>
              </div>
              <div class="boss-quick-glance">
                <span class="glance-tags">0–6 回合有效 / 同队取最短回合</span>
                ${stageMech ? `<button type="button" class="mech-toggle-btn ${state.fbMechOpen ? 'active' : ''}" data-action="toggle-fb-mech" aria-expanded="${state.fbMechOpen}">${state.fbMechOpen ? '收起关卡机制 ▴' : '查看关卡机制 ▾'}</button>` : ''}
                ${state.fbCarry ? `<span class="glance-active-chip">${state.fbRoleMode === 'carry' ? '主 C' : '含角色'}：${esc(charLabelByKey.get(state.fbCarry) || '')}</span>` : ''}
                ${state.fbAfflatus ? `<span class="glance-active-chip">灵感：${esc(AFFLATUS_META[state.fbAfflatus]?.label || '')}</span>` : ''}
              </div>
            </div>
            <div class="board-header-right">
              <span class="count-tag ${hasFilter ? 'is-filtered' : ''}">${esc(boardCountText)}</span>
            </div>
          </div>

          ${renderFlashbackStageMechanicsDrawer(stageMech)}

          ${filteredRows.length
            ? `<div class="rank-list">
                 <div class="rank-list-head">
                   <span>排序</span><span>玩家 / 上传时间</span><span>主 C 与完整阵容</span><span class="col-right">通关回合</span>
                 </div>
                 ${rowsHtml}
               </div>`
            : (archives.length ? '' : `<div class="empty-state">
                 <span class="empty-glyph">✧</span>
                 <h3>${state.loading ? '正在加载榜单…' : (ranked.length ? '无匹配的筛选结果' : '当前榜单为空')}</h3>
                 <p>${ranked.length ? '可尝试点击左侧「重置」清空筛选条件。' : '尚无审核通过的 0–6 回合成绩。'}</p>
                 ${ranked.length ? '<button class="outline-btn" data-action="reset-fb-filter">重置筛选条件</button>' : (state.connected ? '<button class="copper-btn" data-action="open-submit">投稿首条纪录</button>' : '')}
               </div>`)
          }
          ${archiveHtml}
          <div class="board-foot">
            <span>以服务器上传时间为准 · 管理员核验通过后自动重算荣誉</span>
            <button class="text-link-btn" data-action="refresh">刷新榜单 ↻</button>
          </div>
        </section>

        <div class="two-cards">
          <article class="rule-card">
            <span class="rule-num">01</span>
            <h3>一队 · 一纪录</h3>
            <p>相同关卡、塑造组和完整阵容，仅保留回合最少的一条记录。主 C 单独高亮，但不改变队伍归属。</p>
          </article>
          <article class="rule-card">
            <span class="rule-num">02</span>
            <h3>荣耀从未消失</h3>
            <p>被后来者刷新超越的纪录不再占榜，但曾经夺得的有效历史荣誉仍永久计入玩家累计上榜次数。</p>
          </article>
        </div>
      </div>
    </div>`;
}

function flashbackDivisionTabs() {
  return `<div class="section-tabs" role="group" aria-label="塑造分组">${Object.entries(DIVISIONS).map(([key,label]) =>
    `<button type="button" class="outline-btn ${state.fbGroup===key?'selected':''}" data-fb-group="${key}" aria-pressed="${state.fbGroup===key}">${label}</button>`).join('')}</div>`;
}

function renderFlashbackCarries() {
  const scopes = { period: '本期', all: '历史总计' };
  const metrics = { appearance_count: '上榜总次数', challenge_count: '通关关卡数' };
  const versionId = state.fbCarryScope === 'period' ? state.fbVersionId : null;
  const ver = state.fbVersions.find((v) => v.id === versionId);
  const primary = state.fbCarryMetric;
  const secondary = primary === 'appearance_count' ? 'challenge_count' : 'appearance_count';

  const maxChallenges = versionId
    ? standardStages(versionId).length
    : new Set(state.fbStages.map((s) => s.challenge_id)).size;

  // 按统一角色 ID 合并焦点闪回主 C 异体/简称写法
  const merged = new Map();
  for (const row of state.fbCarries) {
    if (row.version_id !== versionId || row.group_code !== state.fbGroup) continue;
    const key = canonicalCharacterKey(row.carry_name);
    const displayName = canonicalDisplayName(row.carry_name);
    const prev = merged.get(key);
    if (!prev) {
      merged.set(key, {
        carry_name: displayName,
        rawNames: new Set([row.carry_name]),
        appearance_count: Number(row.appearance_count || 0),
        challenge_count: Number(row.challenge_count || 0)
      });
    } else {
      prev.rawNames.add(row.carry_name);
      prev.appearance_count += Number(row.appearance_count || 0);
      prev.challenge_count = Math.min(maxChallenges || 999, Math.max(prev.challenge_count, Number(row.challenge_count || 0)));
    }
  }

  const rows = [...merged.values()]
    .filter((row) => row[primary] > 0)
    .sort((a, b) =>
      (b[primary] - a[primary]) ||
      (b[secondary] - a[secondary]) ||
      String(a.carry_name).localeCompare(String(b.carry_name), 'zh-CN')
    );

  return `
    <div class="section-bar">
      ${flashbackDivisionTabs()}
      <div class="section-tabs">
        ${Object.entries(scopes).map(([k, lbl]) =>
          `<button class="section-tab-btn ${k === state.fbCarryScope ? 'active' : ''}" data-fb-carry-scope="${k}">${lbl}</button>`
        ).join('')}
      </div>
      <div class="section-tabs">
        ${Object.entries(metrics).map(([k, lbl]) =>
          `<button class="outline-btn ${k === primary ? 'selected' : ''}" data-fb-carry-metric="${k}">${lbl}</button>`
        ).join('')}
      </div>
    </div>

    <div class="board-panel">
      <div class="board-header">
        <div class="board-title-stack">
          <div class="board-survey-tag"><span>CARRY RANKING · 主 C 登场统计</span></div>
          <div class="boss-headline-wrap">
            <h2>主 C 排行榜</h2>
            <span class="boss-en-sub">Top Arcanist Carries</span>
          </div>
          <div class="paper-tag-row">
            <span class="paper-tag dark">${state.fbCarryScope === 'all' ? '所有版本汇总 · 重复关卡合并去重' : esc(ver?.label || '本期统计')}</span>
          </div>
        </div>
        <span class="count-tag">${rows.length} 位主 C</span>
      </div>
      ${rows.length
        ? `<div class="table-scroll">
            <table class="archive-table">
              <thead><tr><th style="width:76px">名次</th><th>主 C</th><th class="num-col">${metrics[primary]}</th><th class="num-col">${metrics[secondary]}</th></tr></thead>
              <tbody>
                ${rows.map((row, idx) => `
                    <tr>
                      <td>${renderRankBadge(idx + 1)}</td>
                      <td>
                        <div style="display:flex;align-items:center;gap:10px">
                          ${renderCarryAvatarHtml(row.carry_name)}
                          <div>
                            <strong style="font-family:var(--font-serif);font-size:15px">${esc(row.carry_name)}</strong>
                            ${row.rawNames.size > 1 ? `<span class="alias-merge-note" title="已自动合并同角色写法：${esc([...row.rawNames].join(' / '))}">已合并异名</span>` : ''}
                          </div>
                        </div>
                      </td>
                      <td class="num-col"><span class="score-value">${row[primary]}</span></td>
                      <td class="num-col" style="color:var(--linen)">${row[secondary]}</td>
                    </tr>`).join('')}
              </tbody>
            </table>
          </div>`
        : '<div class="empty-state"><span class="empty-glyph">◇</span><h3>暂无可统计成绩</h3></div>'
      }
      <div class="board-foot"><span>上榜次数按「关卡 × 塑造组 × 配队」去重；通关数按关卡去重，异体/简称角色已自动合并。</span></div>
    </div>`;
}

function renderFlashbackPlayers() {
  const rows = state.fbPlayers.filter((p) => p.group_code === state.fbGroup);
  return `
    <div class="section-bar">${flashbackDivisionTabs()}</div>
    <div class="board-panel">
      <div class="board-header">
        <div class="board-title-stack">
          <div class="board-survey-tag"><span>HALL OF FAME · 跨版本荣誉统计</span></div>
          <div class="boss-headline-wrap">
            <h2>玩家荣誉殿堂</h2>
            <span class="boss-en-sub">All-Time Honors</span>
          </div>
          <div class="paper-tag-row">
            <span class="paper-tag dark">按历史上榜次数降序 · 同分优先比较当前持榜数</span>
          </div>
        </div>
        <span class="count-tag">${rows.length} 位荣耀玩家</span>
      </div>
      ${rows.length
        ? `<div class="table-scroll">
            <table class="archive-table">
              <thead><tr><th style="width:76px">名次</th><th>玩家昵称</th><th class="num-col">历史上榜次数</th><th class="num-col">当前持榜数量</th></tr></thead>
              <tbody>
                ${rows.map((p, idx) => `
                  <tr>
                    <td>${renderRankBadge(idx + 1)}</td>
                    <td><strong class="player-name">${esc(p.display_name)}</strong></td>
                    <td class="num-col"><span class="score-value">${p.historical_count}</span> <span style="color:var(--ink-muted)">次</span></td>
                    <td class="num-col" style="color:var(--linen)">${p.current_count} 个</td>
                  </tr>`).join('')}
              </tbody>
            </table>
          </div>`
        : '<div class="empty-state"><span class="empty-glyph">♙</span><h3>尚无上榜玩家</h3></div>'
      }
    </div>
    <div class="two-cards">
      <article class="rule-card">
        <span class="rule-num">∞</span>
        <h3>历史上榜次数</h3>
        <p>曾经成为某「版本／关卡／塑造组／具体阵容」的纪录保持者，即记一项历史荣誉。重复夺回同一项不重复累计。</p>
      </article>
      <article class="rule-card">
        <span class="rule-num">✦</span>
        <h3>当前持榜数量</h3>
        <p>目前仍保持最佳回合的阵容数量，随每次审核通过或撤销实时重算。</p>
      </article>
    </div>`;
}

function renderFlashbackRules() {
  const items = [
    ['01', '三个关卡', '每个游戏版本独立设置三个关卡，纪录不会跨版本或关卡比较。'],
    ['02', '两种塑造', '全 0 塑造与全满塑造分榜比较。队伍内所有参战角色必须符合所选塑造组规则。'],
    ['03', '零至六回合', '只能提交 0、1、2、3、4、5、6 回合的有效成绩，须上传通关截图供管理员核验。'],
    ['04', '填写阵容', '用顿号或逗号分隔 1–4 个出战位置。同一位置的备选用 / 分开。已有同队成绩时，回合需更少才能提交。'],
    ['05', '胜负规则', '多人队包含少人队的全部角色时，少人队优先。完整阵容相同先比回合，再比提交时间。'],
    ['06', '历史荣誉', '曾夺得同一「版本／关卡／塑造／队伍」最佳纪录，历史次数最多计一次，重夺不叠加。被取消的无效成绩不计荣誉。']
  ];
  return `
    <div class="rules-grid">
      ${items.map(([num, title, desc]) => `
        <article class="rule-card">
          <span class="rule-num">${num}</span>
          <h3>${title}</h3>
          <p>${desc}</p>
        </article>`).join('')}
    </div>
    <div class="sidebar-note" style="margin-top:16px">
      <strong>玩法参考：</strong>「焦点闪回」是《重返未来：1999》自 3.6 版本推出的周期挑战玩法，具体机制以游戏及中文 Wiki 对应期次为准；0–6 回合上限、塑造分组与唯一纪录为社区排行榜自定义规则。
    </div>`;
}

/* ==================== 官方风格战报分享卡（证据跳转 + 直达链接 + Canvas 导出 PNG） ==================== */
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

async function exportPosterPng(item) {
  const W = 1200;
  const H = 680;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  const isMane = item.mode === 'mane';
  const serifFont = '"Noto Serif SC", "Songti SC", "Microsoft YaHei", Georgia, serif';
  const displayFont = '"Cinzel", Georgia, serif';

  // 1. 羊皮纸底色渐变
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, '#f3eadb');
  bg.addColorStop(0.55, '#e2d4be');
  bg.addColorStop(1, '#d3c0a6');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // 2. 右上柔和首领水印（仅本地同源图片，零跨域污染）
  if (item.bossThumb) {
    const bossImg = await loadCanvasImg(item.bossThumb);
    if (bossImg) {
      ctx.save();
      ctx.globalAlpha = 0.14;
      drawCoverImage(ctx, bossImg, W * 0.44, 0, W * 0.56, 280, 0.22);
      const fade = ctx.createLinearGradient(W * 0.44, 0, W, 0);
      fade.addColorStop(0, '#efe5d6');
      fade.addColorStop(0.45, 'rgba(239,229,214,0.2)');
      fade.addColorStop(1, 'rgba(239,229,214,0)');
      ctx.globalAlpha = 1;
      ctx.fillStyle = fade;
      ctx.fillRect(W * 0.44, 0, W * 0.56, 280);
      ctx.restore();
    }
  }

  // 3. 复古双线框与左朱红/金标线
  ctx.strokeStyle = '#8a5636';
  ctx.lineWidth = 4;
  ctx.strokeRect(16, 16, W - 32, H - 32);
  ctx.strokeStyle = 'rgba(138, 86, 54, 0.35)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(26, 26, W - 52, H - 52);

  ctx.fillStyle = isMane ? '#a83328' : '#b2863e';
  ctx.fillRect(16, 16, 10, H - 32);

  // 4. 刊头文字区
  ctx.fillStyle = isMane ? '#8c3426' : '#7b5b25';
  ctx.font = `600 16px ${displayFont}`;
  ctx.fillText(isMane ? 'MANE’S BULLETIN · 鬃毛邮报' : 'FLASHBACK ARCHIVE · 焦点闪回', 58, 72);

  ctx.fillStyle = '#1b120d';
  ctx.font = `700 42px ${serifFont}`;
  ctx.fillText(item.title || '', 58, 124);
  if (item.bossEn) {
    const titleW = ctx.measureText(item.title || '').width;
    ctx.fillStyle = '#9c4e2e';
    ctx.font = `italic 500 22px Georgia, serif`;
    ctx.fillText(item.bossEn, Math.min(58 + titleW + 18, 760), 122);
  }

  ctx.fillStyle = '#5c4738';
  ctx.font = `500 17px ${serifFont}`;
  ctx.fillText(item.subtitle || '', 58, 158);

  // 右上名次印章
  ctx.textAlign = 'right';
  ctx.fillStyle = isMane ? '#b93a2b' : '#8d6423';
  ctx.font = `700 58px ${displayFont}`;
  ctx.fillText(`#${String(item.rank).padStart(2, '0')}`, W - 58, 124);
  ctx.fillStyle = '#6b5241';
  ctx.font = `600 14px ${displayFont}`;
  ctx.fillText('ARCHIVE RANK', W - 58, 152);
  ctx.textAlign = 'left';

  // 分割线
  ctx.strokeStyle = 'rgba(90, 56, 36, 0.32)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(58, 182);
  ctx.lineTo(W - 58, 182);
  ctx.stroke();

  // 5. 调查员与成绩区
  ctx.fillStyle = '#6b5241';
  ctx.font = `600 14px ${displayFont}`;
  ctx.fillText('INVESTIGATOR · 调查员', 58, 218);

  ctx.fillStyle = '#1c120d';
  ctx.font = `700 32px ${serifFont}`;
  ctx.fillText(item.player || '', 58, 258);

  ctx.fillStyle = '#5a4334';
  ctx.font = `500 18px ${serifFont}`;
  ctx.fillText(`主 C：${item.carry || ''}`, 58, 290);

  if (isMane) {
    const grade = resolveManeGrade(item.score);
    const gradeImg = grade.img ? await loadCanvasImg(grade.img) : null;
    const scoreRight = gradeImg ? W - 144 : W - 58;
    ctx.textAlign = 'right';
    ctx.fillStyle = '#6b5241';
    ctx.font = `600 14px ${serifFont}`;
    ctx.fillText('调查积分', scoreRight, 218);
    ctx.fillStyle = '#9c3d22';
    ctx.font = `700 44px ${displayFont}`;
    ctx.fillText(formatScore(item.score), scoreRight, 268);
    ctx.textAlign = 'left';
    if (gradeImg) {
      ctx.drawImage(gradeImg, W - 130, 204, 72, 72);
    }
  } else {
    ctx.textAlign = 'right';
    ctx.fillStyle = '#6b5241';
    ctx.font = `600 14px ${serifFont}`;
    ctx.fillText('通关成绩', W - 58, 218);
    ctx.fillStyle = '#8b5e1d';
    ctx.font = `700 44px ${serifFont}`;
    ctx.fillText(`${item.rounds} 回合`, W - 58, 268);
    ctx.textAlign = 'left';
  }

  // 6. 上阵阵容卡（含原表简写解码、灵活多选拼图与自由位，复用本地官方立绘）
  const parsedSlots = parseLineupSlots(item.team, item.carry);
  if (parsedSlots.length === 1 && parsedSlots[0].type === 'legacy') {
    ctx.save();
    ctx.strokeStyle = 'rgba(138, 86, 54, 0.55)';
    ctx.setLineDash([6, 4]);
    ctx.strokeRect(58, 344, W - 116, 110);
    ctx.fillStyle = '#3c2b21';
    ctx.font = `600 22px ${serifFont}`;
    ctx.fillText(`原表配队：${parsedSlots[0].raw}`, 82, 408);
    ctx.restore();
  } else if (parsedSlots.length) {
    const carrySet = new Set(splitCarries(item.carry).map(canonicalCharacterKey));
    const cardW = 192;
    const cardH = 256;
    const gap = 22;
    const startX = 58;
    const startY = 324;
    const cardBaseImg = await loadCanvasImg('./assets/uttu/bg_kapaidi.png');

    for (let i = 0; i < Math.min(4, parsedSlots.length); i++) {
      const slot = parsedSlots[i];
      const x = startX + i * (cardW + gap);
      const y = startY;

      ctx.save();
      ctx.fillStyle = '#1b1614';
      ctx.fillRect(x, y, cardW, cardH);

      if (slot.type === 'flex') {
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
        ctx.fillRect(x + cardW - 64, y + 8, 56, 22);
        ctx.fillStyle = '#f3d191';
        ctx.font = `700 12px ${serifFont}`;
        ctx.textAlign = 'center';
        ctx.fillText(slot.tag, x + cardW - 36, y + 23);
        ctx.fillStyle = '#fffdf9';
        ctx.font = `600 17px ${serifFont}`;
        ctx.fillText(slot.label, x + cardW / 2, y + cardH - 14, cardW - 14);
        ctx.textAlign = 'left';
        ctx.strokeStyle = '#9c7853';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(x, y, cardW, cardH);
        ctx.restore();
        continue;
      }

      if (slot.type === 'wild') {
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
        ctx.fillText('自由位', x + cardW / 2, y + cardH / 2 + 24);
        ctx.fillStyle = '#fffdf9';
        ctx.font = `600 17px ${serifFont}`;
        ctx.fillText(slot.label, x + cardW / 2, y + cardH - 14, cardW - 14);
        ctx.textAlign = 'left';
        ctx.strokeStyle = '#8a6b4d';
        ctx.setLineDash([5, 4]);
        ctx.lineWidth = 1.5;
        ctx.strokeRect(x, y, cardW, cardH);
        ctx.restore();
        continue;
      }

      const rawName = slot.raw || '';
      const char = slot.char || resolveCharacter(rawName);
      const displayName = char?.name || canonicalDisplayName(rawName);
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
      grad.addColorStop(1, 'rgba(10,8,7,0.88)');
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
        ctx.fillRect(x + cardW - 48, y + 8, 40, 22);
        ctx.fillStyle = isMane ? '#fff6ee' : '#18130d';
        ctx.font = `700 13px ${serifFont}`;
        ctx.textAlign = 'center';
        ctx.fillText('主C', x + cardW - 28, y + 24);
        ctx.textAlign = 'left';
      }

      ctx.fillStyle = '#fffdf9';
      ctx.font = `600 18px ${serifFont}`;
      ctx.textAlign = 'center';
      ctx.fillText(displayName, x + cardW / 2, y + cardH - 14, cardW - 14);
      ctx.textAlign = 'left';

      ctx.strokeStyle = isCarry ? '#df6931' : '#7c5238';
      ctx.lineWidth = isCarry ? 3 : 1.5;
      ctx.strokeRect(x, y, cardW, cardH);
      ctx.restore();
    }
  }

  // 7. 底部档案注脚
  ctx.strokeStyle = 'rgba(90, 56, 36, 0.3)';
  ctx.lineWidth = 1;
  ctx.setLineDash([6, 4]);
  ctx.beginPath();
  ctx.moveTo(58, 608);
  ctx.lineTo(W - 58, 608);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = '#6b5241';
  ctx.font = `500 14px ${displayFont}`;
  ctx.fillText(`RECORDED ${item.date || ''}`, 58, 636);
  ctx.textAlign = 'right';
  ctx.fillText('REVERSE: 1999 · COMMUNITY LEADERBOARD ARCHIVE', W - 58, 636);
  ctx.textAlign = 'left';

  const safeTitle = String(item.title || 'record').replace(/[\\/:*?"<>|\s]+/g, '-');
  const fileName = `r1999-${item.mode}-${safeTitle}-rank${item.rank}.png`;
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
  if (!blob) throw new Error('浏览器未能导出战报图片。');
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

function openPoster(posterId) {
  const item = posterIndex.get(posterId);
  if (!item) return;

  const isMane = item.mode === 'mane';
  const resultHtml = isMane
    ? `<div style="display:flex;align-items:center;gap:10px">
         <span class="poster-score">${formatScore(item.score)}</span>
         ${renderGradeStamp(item.score)}
       </div>`
    : `<span class="poster-score">${item.rounds} 回合</span>`;

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
           <strong>已附公开通关视频 / 攻略参考</strong>
           <span>来源域名：${esc(urlHost)} · 核验结算截图仅本人及管理员可见</span>
         </div>
         <a class="copper-btn" href="${esc(safeUrl)}" target="_blank" rel="noopener noreferrer ugc">▶ 打开视频 / 攻略 ↗</a>
       </div>`
    : `<div class="poster-evidence-bar">
         <span>本条投稿未附公开视频或攻略链接；核验结算截图按隐私规则仅本人与审核管理员可见。</span>
       </div>`;

  openModal(`
    <div class="modal-eyebrow">ARCHIVE RECORD CARD · 战报档案卡</div>
    <h2>纪录留档卡</h2>
    <p class="modal-subtitle">支持直达原攻略链接、一键导出 PNG 战报图，或复制榜单直达链接与纯文字战报。</p>
    <div class="poster-card ${item.bossThumb ? 'has-boss-watermark' : ''}">
      ${item.bossThumb ? `<div class="poster-boss-wm" style="background-image:url('${esc(item.bossThumb)}')" aria-hidden="true"></div>` : ''}
      <div class="poster-head">
        <div>
          <div class="poster-kicker">${isMane ? 'MANE’S BULLETIN · 鬃毛邮报' : 'FLASHBACK ARCHIVE · 焦点闪回'}</div>
          <h3>${esc(item.title)}</h3>
          <div class="poster-sub">${esc(item.subtitle)}</div>
        </div>
        <div class="poster-rank-box">
          <div class="poster-rank-num">#${String(item.rank).padStart(2, '0')}</div>
          <div class="poster-rank-label">RANK</div>
        </div>
      </div>

      <div class="poster-body">
        <div>
          <div style="font-size:11px;color:#6b5241;letter-spacing:0.1em">INVESTIGATOR · 调查员</div>
          <div class="poster-player">${esc(item.player)}</div>
          <div style="font-size:12px;color:#5b4739;margin-top:3px">主 C：${esc(item.carry)}</div>
        </div>
        <div>${resultHtml}</div>
      </div>

      ${renderFormationHtml(item.team, item.carry)}

      <div class="poster-foot">
        <span>RECORDED ${esc(item.date)}</span>
        <span>REVERSE: 1999 COMMUNITY</span>
      </div>
    </div>
    ${evidenceHtml}
    <div class="form-actions">
      <button type="button" class="paper-btn" data-export-poster="${esc(posterId)}">保存战报图 (PNG)</button>
      <button type="button" class="outline-btn" data-copy-link="${esc(posterId)}">复制直达链接</button>
      <button type="button" class="outline-btn" data-copy-poster="${esc(posterId)}">复制战报文字</button>
      <button type="button" class="ghost-btn" data-action="close-modal">关闭</button>
    </div>`, true);
}

/* ==================== 投稿模态框与完整校验（双榜 100% 兼容） ==================== */
function maneMapChoices(maps, selected) {
  return Object.entries(MANE_SECTIONS).map(([sec, label]) => {
    const group = maps.filter((m) => m.section === sec);
    if (!group.length) return '';
    return `<optgroup label="${esc(label)}">${optionsHtml(group.map((m) => [m.id, `${m.edition} · ${m.name}`]), selected)}</optgroup>`;
  }).join('');
}

function maneScoreFieldsHtml(record, maps) {
  return `
    <div class="form-grid">
      <div class="field"><label for="mMap">调查对象 *</label><select id="mMap" name="map_id" required>${maneMapChoices(maps, record.map_id)}</select></div>
      <div class="field"><label for="mDiv">塑造分组 *</label><select id="mDiv" name="division">${optionsHtml(Object.entries(DIVISIONS), record.division || 'zero')}</select></div>
    </div>
    <div class="form-grid">
      <div class="field"><label for="mName">玩家昵称 *</label><input id="mName" name="display_name" required minlength="2" maxlength="32" value="${esc(record.display_name || '')}" /></div>
      <div class="field"><label for="mScore">结算调查积分 *</label><input id="mScore" name="score" required inputmode="numeric" placeholder="例如 30635308" value="${esc(record.score ?? '')}" /></div>
    </div>
    <div class="field"><label for="mCarry">主 C 角色 *</label><input id="mCarry" name="carry" required maxlength="170" placeholder="共同主 C 用 / 分隔" value="${esc(record.carry || '')}" /></div>
    <div class="field"><label for="mTeam">上阵配队 *</label><textarea id="mTeam" name="team" required maxlength="170" placeholder="填写 1–4 名不重复角色，用顿号或逗号分隔">${esc((record.team || []).join('、'))}</textarea></div>
    <div class="field"><label for="mLink">相关链接（选填）</label><input id="mLink" name="related_url" type="url" maxlength="2048" placeholder="https://" value="${esc(record.related_url || '')}" /></div>`;
}

function readManeFields(fd) {
  const team = splitTeam(fd.get('team'));
  const carries = splitCarries(fd.get('carry'));
  const teamKeys = new Set(team.map(normKey));
  const scoreText = String(fd.get('score') ?? '').trim().replace(/[,，]/g, '');
  const score = Number(scoreText);
  const display_name = String(fd.get('display_name') ?? '').trim();
  const division = String(fd.get('division') ?? '');

  if (!Object.hasOwn(DIVISIONS, division)) throw new Error('请选择全 0 塑造或全满塑造。');
  if (display_name.length < 2 || display_name.length > 32) throw new Error('请填写 2–32 字的玩家昵称。');
  if (team.length < 1 || team.length > 4 || teamKeys.size !== team.length || team.some((n) => n.length > 40)) {
    throw new Error('请填写 1–4 名不重复的上阵角色（单名不超过 40 字）。');
  }
  if (!carries.length || new Set(carries.map(normKey)).size !== carries.length || carries.some((c) => !teamKeys.has(normKey(c)))) {
    throw new Error('每位主 C 必须包含在上阵配队中且不能重复。');
  }
  if (!/^\d+$/.test(scoreText) || !Number.isSafeInteger(score) || score < 1) {
    throw new Error('请输入完整的正整数调查积分。');
  }
  return {
    map_id: String(fd.get('map_id')),
    division,
    display_name,
    team,
    carry: carries.join('/'),
    score,
    related_url: parseHttpUrl(fd.get('related_url')) || null
  };
}

function openManeSubmitModal() {
  const maps = state.maneMaps.filter(isMapOpen);
  if (!state.connected || !maps.length) return toast('当前暂无开放投稿的调查对象。');
  let nick = state.profile?.display_name || '';
  try { nick = nick || localStorage.getItem('mane-nickname') || ''; } catch {}
  openModal(`
    <div class="modal-eyebrow">MANE’S BULLETIN · SUBMIT</div>
    <h2>投稿鬃毛邮报成绩</h2>
    <p class="modal-subtitle">填写结算积分、主 C 与上阵队伍，并附结算截图供管理员核验。</p>
    <form id="maneSubmitForm">
      ${maneScoreFieldsHtml({ map_id: state.maneMapId, division: state.maneDivision, display_name: nick }, maps)}
      <div class="field">
        <label for="mProof">结算截图 *</label>
        <input id="mProof" name="proof" type="file" accept="image/png,image/jpeg,image/webp" required />
        <span class="field-hint">支持 PNG / JPG / WebP，最大 5 MB。截图仅本人及审核管理员可见。</span>
      </div>
      ${contactField}
      <div class="form-actions">
        <button type="button" class="outline-btn" data-action="close-modal">取消</button>
        <button type="submit" class="copper-btn">提交审核 →</button>
      </div>
    </form>`);
}

async function handleManeSubmit(form) {
  const fd = new FormData(form);
  const record = readManeFields(fd);
  const proof = fd.get('proof');
  if (!proof?.size || !MIME_TO_EXT[proof.type] || proof.size > 5 * 1024 * 1024) {
    throw new Error('请上传不超过 5 MB 的 PNG、JPG 或 WebP 截图。');
  }
  await decodeImageFile(proof);

  const session = state.session || (await checked(sb.auth.signInAnonymously())).session;
  if (!session) throw new Error('建立投稿会话失败，请重试。');
  const player_id = session.user.id;
  const path = `${player_id}/${uid()}.${MIME_TO_EXT[proof.type]}`;
  const bucket = sb.storage.from('mane-proofs');
  await checked(bucket.upload(path, proof, { contentType: proof.type }));
  try {
    await checked(sb.rpc('submit_mane_result',{p_record:{...record,evidence_path:path},p_contact:String(fd.get('contact')??'').trim()||null}));
  } catch (err) {
    await bucket.remove([path]);
    throw err;
  }
  try { localStorage.setItem('mane-nickname', record.display_name); } catch {}
  state.session = session;
  state.user = session.user;
  closeModal();
  toast('已提交，可在「我的投稿」查看审核进度。');
}

/* 焦点闪回投稿流程（完整兼容 profiles + proofs + submissions） */
function fbStageOptionsHtml(versionId) {
  return standardStages(versionId)
    .map((s) => `<option value="${esc(s.id)}"${s.id === state.fbStageId ? ' selected' : ''}>${esc(s.name)}</option>`)
    .join('');
}

const resonanceBadge = '<span class="division-chip resonance-badge">✦ 全0塑 · 共鸣10</span>';
function resonanceChoice(group, checked = false) {
  return `<label class="resonance-choice"${group==='zero'?'':' hidden'}>
    <input name="resonanceTen" type="checkbox"${group==='zero'?'':' disabled'}${checked&&group==='zero'?' checked':''}>
    全队 0 塑造、共鸣 10</label>`;
}

function openFbSubmitModal() {
  if (!state.connected || !state.fbStages.length || startingGuest) return;
  if (!state.user) {
    openModal(`
      <div class="modal-eyebrow">GUEST PROFILE · 访客投稿登记</div>
      <h2>设置公开展示昵称</h2>
      <p class="modal-subtitle">昵称将公开显示于焦点闪回榜单与荣誉殿堂，同一浏览器会保留您的投稿身份。</p>
      <form id="fbGuestForm">
        <div class="field">
          <label for="fbGuestName">展示昵称 *</label>
          <input id="fbGuestName" name="name" required minlength="2" maxlength="24" autocomplete="nickname" />
        </div>
        <div class="form-actions">
          <button type="button" class="outline-btn" data-action="close-modal">取消</button>
          <button type="submit" class="copper-btn">继续投稿 →</button>
        </div>
      </form>`);
    return;
  }
  if (!state.profile) {
    openProfileModal(true);
    return;
  }
  openModal(`
    <div class="modal-eyebrow">FLASHBACK ARCHIVE · SUBMIT</div>
    <h2>提交焦点闪回成绩</h2>
    <p class="modal-subtitle">仅收录 0–6 回合有效成绩，管理员核验后自动进入公开榜单。</p>
    <form id="fbSubmitForm">
      <div class="form-grid">
        <div class="field"><label for="fbNick">玩家昵称 *</label><input id="fbNick" name="nickname" readonly value="${esc(state.profile.display_name)}" /></div>
        <div class="field"><label for="fbFormVersion">游戏版本 *</label><select id="fbFormVersion" name="version">${optionsHtml(state.fbVersions.map((v) => [v.id, v.label]), state.fbVersionId)}</select></div>
      </div>
      <div class="form-grid">
        <div class="field"><label for="fbFormStage">挑战关卡 *</label><select id="fbFormStage" name="stage">${fbStageOptionsHtml(state.fbVersionId)}</select></div>
        <div class="field"><label for="fbFormGroup">塑造分组 *</label><select id="fbFormGroup" name="group">${optionsHtml(Object.entries(DIVISIONS), state.fbGroup)}</select></div>
      </div>
      <div class="form-grid">
        <div class="field"><label for="fbFormCarry">主 C 角色 *</label><input id="fbFormCarry" name="carry" required maxlength="170" placeholder="共同主 C 用 / 分隔" /></div>
        <div class="field"><label for="fbFormRounds">通关回合 *</label><select id="fbFormRounds" name="rounds">${Array.from({ length: 7 }, (_, n) => `<option value="${n}">${n} 回合</option>`).join('')}</select></div>
      </div>
      ${resonanceChoice(state.fbGroup)}
      <div class="field">
        <label for="fbFormTeam">完整配队 *</label>
        <textarea id="fbFormTeam" name="team" required maxlength="170" placeholder="填写 1–4 名实际上场角色，用顿号或逗号分隔"></textarea>
        <span class="field-hint">用顿号或逗号分隔出战位置，同一位置的备选用 / 分开。</span>
      </div>
      <div class="field">
        <label for="fbFormProof">通关截图 *</label>
        <input id="fbFormProof" name="proof" type="file" accept="image/png,image/jpeg,image/webp" required />
        <span class="field-hint">PNG / JPG / WebP，最大 5 MB，仅本人及管理员可见。</span>
      </div>
      <div class="field">
        <label for="fbFormLink">相关链接（选填）</label>
        <input id="fbFormLink" name="relatedUrl" type="url" maxlength="2048" placeholder="https://" />
      </div>
      ${contactField}
      <p id="fbSubmitWarning" class="modal-subtitle rejection-error" role="alert"></p>
      <div class="form-actions">
        <button type="button" class="outline-btn" data-action="close-modal">取消</button>
        <button type="submit" class="copper-btn">确认提交 →</button>
      </div>
    </form>`);
}

async function handleFbSubmit(form) {
  const fd = new FormData(form);
  const nickname = String(fd.get('nickname') ?? '').trim();
  const team = splitTeam(fd.get('team'));
  const carries = splitCarries(fd.get('carry'));
  const rounds = Number(fd.get('rounds'));
  const file = fd.get('proof');
  const versionId = String(fd.get('version'));
  const stageId = String(fd.get('stage'));
  const group_code = String(fd.get('group'));

  if (nickname.length < 2 || nickname.length > 24) throw new Error('玩家昵称需在 2–24 个字符之间。');
  validateLineup(team);
  const normTeam = team.map(normKey);
  const normCarries = carries.map(normKey);
  if (!carries.length || carries.length > 4 || new Set(normCarries).size !== carries.length || normCarries.some((c) => !normTeam.includes(c))) {
    throw new Error('每位主 C 都必须属于完整配队且不能重复。');
  }
  if (!Number.isInteger(rounds) || rounds < 0 || rounds > 6) throw new Error('通关回合数必须在 0–6 之间。');
  if (!file?.size || !MIME_TO_EXT[file.type] || file.size > 5 * 1024 * 1024) {
    throw new Error('请上传不超过 5 MB 的 PNG、JPG 或 WebP 通关截图。');
  }
  if (!state.fbStages.some((s) => s.id === stageId && s.version_id === versionId)) {
    throw new Error('所选版本与关卡不匹配。');
  }
  const related_url = parseHttpUrl(fd.get('relatedUrl')) || null;
  const conflicts = await checked(sb.rpc('flashback_existing_lineup',{
    p_stage_id:stageId,p_group_code:group_code,p_team:team,p_rounds:rounds
  }));
  if (conflicts?.length) {
    const {matched_team,incumbent_rounds} = conflicts[0];
    throw Error(`已有该队伍：${matched_team.join('、')}（${incumbent_rounds} 回合）。请减少回合，或移除重复的备选角色。`);
  }
  await decodeImageFile(file);

  const path = `${state.user.id}/${uid()}.${MIME_TO_EXT[file.type]}`;
  await checked(sb.storage.from('proofs').upload(path, file, { contentType: file.type, upsert: false }));
  try {
    await checked(sb.rpc('submit_flashback_result',{p_record:{
      stage_id: stageId,
      group_code,
      team,
      carry_name: carries.join('/'),
      rounds,
      evidence_path: path,
      related_url,
      resonance_ten:group_code==='zero'&&fd.has('resonanceTen')
    },p_contact:String(fd.get('contact')??'').trim()||null}));
  } catch (err) {
    await sb.storage.from('proofs').remove([path]);
    throw err;
  }
  closeModal();
  await loadAllData();
  toast('已提交，可在「我的投稿」查看审核进度。');
}

/* ==================== 账号 / 管理员登录与双榜审核后台 ==================== */
function openMySubmissions(mode = state.mode) {
  const flashback = mode === 'flashback';
  openModal(`<div class="moderation-tabs" role="group" aria-label="投稿所属榜单">
    <button class="outline-btn ${flashback?'':'selected'}" type="button" data-progress-board="mane">鬃毛邮报</button>
    <button class="outline-btn ${flashback?'selected':''}" type="button" data-progress-board="flashback">焦点闪回</button>
  </div><section id="progressPanel"></section><p class="field-hint">使用昵称投稿后，请在原浏览器查看记录。</p>`, true);
  mountSubmissionProgress($('#progressPanel'),{
    client:sb,ownerId:state.user?.id,table:flashback?'submissions':'mane_entries',
    columns:flashback?'stage_id,group_code,carry_name,rounds,team,resonance_ten':'map_id,division,carry,score,team',
    describe(row){
      if(!flashback){
        const map=state.maneMaps.find(item=>item.id===row.map_id);
        return {title:map?.name||'已隐藏地图',summary:`${DIVISIONS[row.division]} · 主 C · ${row.carry} · ${formatScore(row.score)} 分`};
      }
      const stage=state.fbStages.find(item=>item.id===row.stage_id);
      return {title:stage?.name||'已隐藏关卡',
        summary:`${DIVISIONS[row.group_code]}${row.resonance_ten?' · 共鸣10':''} · 主 C · ${row.carry_name} · ${row.rounds} 回合`};
    }
  });
}

function openLoginModal() {
  openModal(`
    <div class="modal-eyebrow">ADMIN AUTHENTICATION</div>
    <h2>管理员邮箱登录</h2>
    <p class="modal-subtitle">请使用站长授权的审核邮箱；登录成功后可同时管理鬃毛邮报与焦点闪回两套榜单。</p>
    <form id="adminLoginForm">
      <div class="field">
        <label for="adminEmail">已授权电子邮箱 *</label>
        <input id="adminEmail" name="email" type="email" required autocomplete="email" />
      </div>
      <span class="field-hint">收到邮件后，请在同一浏览器内打开一次性登录链接并返回本页。</span>
      <div class="form-actions">
        <button type="button" class="outline-btn" data-action="close-modal">取消</button>
        <button type="submit" class="copper-btn">发送登录邮件</button>
      </div>
    </form>`);
}

function openProfileModal(forFbSubmit = false) {
  openModal(`
    <div class="modal-eyebrow">ACCOUNT &amp; PROFILE</div>
    <h2>玩家资料与账号</h2>
    <form id="profileForm" data-for-fb="${forFbSubmit}">
      <div class="field">
        <label for="profileNick">公开展示昵称（焦点闪回）</label>
        <input id="profileNick" name="name" required minlength="2" maxlength="24" value="${esc(state.profile?.display_name || '')}" />
      </div>
      <div class="form-actions">
        ${state.user?.is_anonymous
          ? '<button type="button" class="outline-btn" data-action="open-login">切换管理员登录</button>'
          : '<button type="button" class="outline-btn" data-action="logout">退出登录</button>'}
        ${state.isAdmin ? '<button type="button" class="outline-btn" data-action="open-admin">进入管理后台</button>' : ''}
        <button type="submit" class="copper-btn">保存昵称</button>
      </div>
    </form>`);
}

const adminFilters={
  mane:{tab:'',name:'',location:'',division:'',page:0},
  flashback:{tab:'',name:'',location:'',division:'',page:0}
};

async function renderFilteredAdmin(list,mode,tab,locationLabel,groups,baseQuery,renderRows){
  if(!list?.isConnected)return;
  const filters=adminFilters[mode];
  if(filters.tab!==tab){filters.tab=tab;filters.page=0;}
  const [locationKey,divisionKey]=mode==='mane'?['map_id','division']:['stage_id','group_code'];
  list.insertAdjacentHTML('beforebegin',moderationFilterFields(filters,locationLabel,groups));
  let request=0;
  async function load(){
    const active=++request;
    list.textContent='正在读取投稿…';
    try{
      const rows=await checked(filterModerationRows(baseQuery(),filters,locationKey,divisionKey));
      if(!list.isConnected||active!==request)return;
      if(!rows.length&&filters.page>0){filters.page--;return load();}
      list.innerHTML=renderRows(rows.slice(0,moderationPageSize))+
        moderationPager(filters.page,rows.length>moderationPageSize);
    }catch(error){
      if(list.isConnected&&active===request)list.textContent=`读取失败：${error.message}`;
    }
  }
  bindModerationFilters(list.previousElementSibling,list,filters,load);
  await load();
}

async function openManeAdmin(status = 'pending') {
  if (!state.isAdmin) return toast('仅管理员可访问审核后台。');
  openModal(`
    <div class="modal-eyebrow">MODERATION · 鬃毛邮报管理后台</div>
    <h2>鬃毛邮报审核中心</h2>
    <div class="moderation-tabs">
      ${Object.entries(STATUS_LABELS).map(([k, lbl]) =>
        `<button class="outline-btn ${k === status ? 'selected' : ''}" data-mane-admin="${k}">${lbl}</button>`
      ).join('')}
      <button class="outline-btn" data-action="mane-maps-admin">地图管理</button>
      <button class="ghost-btn" data-action="fb-admin-open">切换至焦点闪回后台 ⇄</button>
    </div>
    <div id="adminList"><p class="modal-subtitle">正在读取 ${STATUS_LABELS[status]} 列表…</p></div>`, true);

  const list = $('#adminList');
  try {
    const maps=await checked(sb.from('mane_maps').select('id,name,section,edition,active').order('edition',{ascending:false}).order('position'));
    const groups=new Map();
    for(const map of maps){
      const label=`${map.edition} · ${MANE_SECTIONS[map.section]}`;
      if(!groups.has(label))groups.set(label,[]);
      groups.get(label).push([map.id,map.active?map.name:`${map.name}（隐藏）`]);
    }
    const query=()=>sb.from('mane_entries')
      .select('id,status,display_name,map_id,division,team,carry,score,evidence_path,created_at,updated_at,related_url,review_note,submission_contacts(contact)')
      .eq('status',status).is('archived_at',null);
    await renderFilteredAdmin(list,'mane',status,'地图',[...groups],query, rows=>rows.length
      ? rows.map((row) => {
          const map = maps.find((m) => m.id === row.map_id);
          return `
            <article class="review-card" data-entry="${esc(row.id)}" data-revision="${esc(row.updated_at)}" data-status="${esc(status)}">
              <div class="review-top">
                <strong>${esc(row.display_name)}</strong>
                <span class="score-value" style="font-size:16px">${formatScore(row.score)}</span>
              </div>
              <div class="review-meta">
                ${esc(map?.name || '已隐藏地图')} · ${DIVISIONS[row.division] || row.division} · ${formatDateTime(row.created_at)}<br/>
                主 C：${esc(row.carry)} ｜ 配队：${esc((row.team || []).join('、'))}
                ${row.review_note ? `<br/>备注：${esc(row.review_note)}` : ''}
              </div>
              ${adminContact(row.submission_contacts)}${safeLinkHtml(row.related_url)}
              <div class="review-actions">
                <button class="outline-btn" data-mane-proof="${esc(row.id)}">查看截图</button>
                <button class="outline-btn" data-mane-edit="${esc(row.id)}">编辑成绩</button>
                ${status === 'pending' ? '<button class="approve-btn" data-mane-decision="approved">✓ 通过</button><button class="danger-btn" data-mane-decision="rejected">× 拒绝</button>' : ''}
                ${status === 'approved' ? '<button class="danger-btn" data-mane-decision="removed">撤下</button>' : ''}
                ${status === 'rejected' ? '<button class="approve-btn" data-action="mane-reopen">退回待审核</button><button class="danger-btn" data-action="mane-delete-rejected">删除</button>' : ''}
              </div>
              <div class="review-proof" role="status"></div>
            </article>`;
        }).join('')
      : '<div class="empty-state"><h3>暂无符合条件的投稿</h3></div>');
  } catch (err) {
    if (list?.isConnected) list.innerHTML = `<p class="modal-subtitle">读取失败：${esc(err.message)}</p>`;
  }
}

async function openManeMapsAdmin() {
  if (!state.isAdmin) return;
  const maps = await checked(sb.from('mane_maps').select('*').order('edition', { ascending: false }).order('position'));
  openModal(`
    <div class="modal-eyebrow">MANE MAPS · 地图管理</div>
    <h2>鬃毛邮报首领地图管理</h2>
    <div class="moderation-tabs"><button class="outline-btn" data-mane-admin="pending">← 返回审核</button></div>
    <form id="maneMapForm" style="margin-bottom:18px">
      <div class="form-grid">
        <div class="field"><label for="mmName">地图名称 *</label><input id="mmName" name="name" required maxlength="60" /></div>
        <div class="field"><label for="mmEd">版本 *</label><input id="mmEd" name="edition" required maxlength="30" value="${esc(maps[0]?.edition || '4.1')}" /></div>
        <div class="field"><label for="mmSec">分区</label><select id="mmSec" name="section">${optionsHtml(Object.entries(MANE_SECTIONS), 'new')}</select></div>
        <div class="field"><label for="mmPos">排序值</label><input id="mmPos" name="position" type="number" min="1" value="100" required /></div>
      </div>
      <div class="form-actions"><button type="submit" class="copper-btn">新增首领地图</button></div>
    </form>
    ${maps.map((m) => `
      <article class="review-card" style="display:flex;align-items:center;justify-content:space-between;gap:12px">
        <div>
          <strong>${esc(m.name)}</strong>
          <div class="review-meta" style="margin:2px 0 0">${esc(m.edition)} · ${MANE_SECTIONS[m.section] || m.section} · 状态：${m.active ? '显示中' : '已隐藏'}</div>
        </div>
        <button class="outline-btn" data-toggle-mane-map="${esc(m.id)}" data-active="${m.active}">${m.active ? '隐藏地图' : '恢复显示'}</button>
      </article>`).join('')}`, true);
}

async function openFbAdmin(tab = 'pending', openStage = '') {
  if (!state.isAdmin) return toast('仅管理员可访问审核后台。');
  if (!Object.hasOwn(FB_ADMIN_TABS, tab)) tab = 'pending';
  openModal(`
    <div class="modal-eyebrow">MODERATION · 焦点闪回管理后台</div>
    <h2>焦点闪回审核中心</h2>
    <div class="moderation-tabs">
      ${Object.entries(FB_ADMIN_TABS)
        .filter(([k]) => k !== 'historical' || state.fbArchives.length)
        .map(([k, lbl]) => `<button class="outline-btn ${k === tab ? 'selected' : ''}" data-fb-admin="${k}">${lbl}</button>`)
        .join('')}
      <button class="outline-btn" data-action="fb-versions-admin">版本管理</button>
      <button class="ghost-btn" data-mane-admin="pending">切换至鬃毛邮报后台 ⇄</button>
    </div>
    <div id="adminList"><p class="modal-subtitle">正在读取 ${FB_ADMIN_TABS[tab]} 列表…</p></div>`, true);

  const list = $('#adminList');
  if (tab === 'historical') {
    list.innerHTML = state.fbVersions.flatMap((v) => standardStages(v.id).map((st) => {
      const rows = state.fbArchives.filter((a) => a.stage_id === st.id).sort((a, b) => a.display_order - b.display_order);
      if (!rows.length) return '';
      return `<details class="review-card" ${openStage === st.id ? 'open' : ''}>
        <summary>${esc(v.label)} · ${esc(st.name)} · ${rows.length} 条</summary>
        ${rows.map((r) => `<div class="review-card" style="margin-top:8px">
          <strong>${esc(r.credited_player)}</strong>
          <div class="review-meta">主 C：${(r.carry_names || []).map(esc).join('／')} · ${esc(r.lineup_label)}</div>
          <button class="danger-btn" data-fb-archive="fb-archive-history" data-id="${esc(r.id)}" data-stage="${esc(st.id)}">删除档案</button>
        </div>`).join('')}
      </details>`;
    })).join('') || '<p class="modal-subtitle">暂无历史档案。</p>';
    return;
  }

  try {
    const groups=state.fbVersions.map(v=>[v.label,standardStages(v.id).map(stage=>[stage.id,stage.name])]);
    const query=()=>sb.from('flashback_moderation_list').select('*').eq('status',tab);
    await renderFilteredAdmin(list,'flashback',tab,'关卡',groups,query,rows=>rows.length
      ? rows.map((r) => {
          const name = r.display_name;
          const st = state.fbStages.find((s) => s.id === r.stage_id);
          const v = state.fbVersions.find((x) => x.id === st?.version_id);
          return `
            <article class="review-card">
              <div class="review-top">
                <strong>${esc(name)} <span class="division-chip">${r.rounds} 回合</span></strong>
                <span style="font-size:12px;color:var(--ink-muted)">${formatDateTime(r.created_at)}</span>
              </div>
              <div class="review-meta">
                ${esc(v?.label || '未知版本')} · ${esc(st?.name || '未知关卡')} · ${DIVISIONS[r.group_code] || r.group_code}<br/>
                主 C：${esc(r.carry_name)} ｜ 队伍：${(r.team || []).map(esc).join(' / ')}
                ${r.status === 'removed' ? `<br/>撤销原因：${esc(r.review_note || '未记录')}` :
                  r.status === 'rejected' ? `<br/>拒绝理由：${esc(r.review_note || '未记录')}` : ''}
              </div>
              ${r.resonance_ten?resonanceBadge:''}${adminContact(r.contact)}${safeLinkHtml(r.related_url)}
              <div id="fb-proof-${esc(r.id)}" class="review-proof" role="status"></div>
              <div class="review-actions">
                ${r.evidence_path ? `<button class="outline-btn" data-fb-proof="${esc(r.id)}">查看截图</button>` : ''}
                ${tab === 'pending' ? `<button class="approve-btn" data-fb-review="approved" data-id="${esc(r.id)}">✓ 审核通过</button><button class="danger-btn" data-fb-review="rejected" data-id="${esc(r.id)}">× 拒绝</button>` : ''}
                ${tab === 'approved' ? `<button class="danger-btn" data-fb-remove="${esc(r.id)}">移除成绩</button>` : ''}
                ${tab === 'rejected' ? `<button class="approve-btn" data-fb-reopen="${esc(r.id)}">退回待审核</button>` : ''}
                <button class="outline-btn" data-fb-edit="${esc(r.id)}" data-tab="${esc(tab)}">编辑成绩</button>
                <button class="danger-btn" data-fb-archive="fb-archive-record" data-id="${esc(r.id)}" data-tab="${esc(tab)}">删除成绩</button>
              </div>
            </article>`;
        }).join('')
      : '<div class="empty-state"><h3>暂无符合条件的投稿</h3></div>');
  } catch (err) {
    if (list?.isConnected) list.innerHTML = `<p class="modal-subtitle">读取失败：${esc(err.message)}</p>`;
  }
}

function openFbVersionManager() {
  if (!state.isAdmin) return;
  openModal(`
    <div class="modal-eyebrow">FLASHBACK VERSIONS · 版本管理</div>
    <h2>焦点闪回版本与重复关卡管理</h2>
    <div class="moderation-tabs">
      <button class="outline-btn" data-fb-admin="pending">← 返回审核</button>
      <button class="copper-btn" data-fb-edit-version="">＋ 新建版本</button>
    </div>
    ${state.fbVersions.map((v) => `
      <article class="review-card">
        <strong>${esc(v.label)}</strong>
        <ul class="review-meta" style="margin:6px 0">
          ${standardStages(v.id).map((s) => `<li>${esc(s.name)}${challengeOccurrences(s) > 1 ? ' · 关联重复关卡' : ''}</li>`).join('')}
        </ul>
        <div class="review-actions">
          <button class="outline-btn" data-fb-edit-version="${esc(v.id)}">编辑版本</button>
          <button class="danger-btn" data-fb-archive="fb-archive-version" data-id="${esc(v.id)}">删除版本</button>
        </div>
      </article>`).join('') || '<p class="modal-subtitle">暂无版本。</p>'}`, true);
}

function openFbVersionEditor(versionId = '') {
  const version = state.fbVersions.find((v) => v.id === versionId);
  const stages = standardStages(versionId);
  const repeatOpts = (stage) => {
    const groups = new Map();
    for (const v of state.fbVersions) {
      for (const c of standardStages(v.id)) {
        if (c.id === stage?.id || groups.has(c.challenge_id)) continue;
        groups.set(c.challenge_id, `${v.code} · ${c.name}`);
      }
    }
    if (stage && !groups.has(stage.challenge_id)) groups.set(stage.challenge_id, '保留此关当前归属');
    return `<option value="">${stage ? '取消关联，作为新独立关卡' : '作为独立关卡'}</option>` +
      [...groups.entries()].map(([id, lbl]) => `<option value="${esc(id)}"${id === stage?.challenge_id ? ' selected' : ''}>${esc(lbl)}</option>`).join('');
  };
  openModal(`
    <h2>${version ? '编辑版本' : '新建版本'}</h2>
    <form id="fbVersionForm" data-id="${esc(versionId)}">
      <div class="form-grid">
        <div class="field"><label for="fvCode">版本代号 *</label><input id="fvCode" name="code" required maxlength="30" value="${esc(version?.code || '')}" /></div>
        <div class="field"><label for="fvLabel">展示名称 *</label><input id="fvLabel" name="label" required maxlength="80" value="${esc(version?.label || '')}" /></div>
      </div>
      ${[1, 2, 3].map((i) => {
        const st = stages.find((s) => s.stage_no === i);
        return `<div class="form-grid">
          <div class="field"><label for="fvSt${i}">第 ${i} 关名称 *</label><input id="fvSt${i}" name="stage${i}" required maxlength="80" value="${esc(st?.name || '')}" /></div>
          <div class="field"><label for="fvRep${i}">第 ${i} 关 · 关联重复关卡</label><select id="fvRep${i}" name="repeat${i}">${repeatOpts(st)}</select></div>
        </div>`;
      }).join('')}
      <div class="form-actions">
        <button type="button" class="outline-btn" data-action="fb-versions-admin">返回</button>
        <button type="submit" class="copper-btn">保存版本</button>
      </div>
    </form>`, true);
}

/* ==================== 总渲染入口 ==================== */
function render() {
  posterIndex.clear();
  writeHash();
  renderChrome();
  renderMasthead();
  const workspace = $('#workspace');
  workspace.innerHTML = state.mode === 'mane'
    ? renderManeWorkspace()
    : renderFlashbackWorkspace();
  enhanceTouchLayout(workspace, state);

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

/* ==================== 全局事件委托 ==================== */
document.addEventListener('click', async (ev) => {
  const btn = ev.target.closest('button, a[data-switch-mode]');
  if (!btn) return;

  try {
    if (btn.dataset.modeSwitch) {
      state.mode = btn.dataset.modeSwitch;
      state.highlightRecordId = '';
      render();
      return;
    }
    if (btn.dataset.switchMode) {
      ev.preventDefault();
      state.mode = btn.dataset.switchMode;
      state.manePage = 'scores';
      state.highlightRecordId = '';
      render();
      return;
    }
    if (btn.dataset.subpage) {
      if (state.mode === 'mane') state.manePage = btn.dataset.subpage;
      else state.fbPage = btn.dataset.subpage;
      state.highlightRecordId = '';
      render();
      return;
    }

    // 刊头「全站最高分 / 全站最快」直达对应榜单并定位高亮
    if (btn.dataset.jumpManeRecord) {
      state.mode = 'mane';
      state.manePage = 'scores';
      state.maneSection = btn.dataset.jumpSection || 'new';
      state.maneMapId = btn.dataset.jumpMap || '';
      state.maneDivision = btn.dataset.jumpDiv || 'max';
      state.maneRoleMode = 'carry';
      state.maneCarry = '';
      state.maneAfflatus = '';
      state.maneQuery = '';
      const pid = `mane-${btn.dataset.jumpManeRecord}`;
      state.highlightRecordId = pid;
      pendingScrollRecordId = pid;
      render();
      toast('已跳转并定位该条榜单纪录。');
      return;
    }
    if (btn.dataset.jumpFbRecord) {
      state.mode = 'flashback';
      state.fbPage = 'leaderboard';
      state.fbVersionId = btn.dataset.jumpVer || '';
      state.fbStageId = btn.dataset.jumpStage || '';
      state.fbGroup = btn.dataset.jumpGrp || 'zero';
      state.fbRoleMode = 'carry';
      state.fbCarry = '';
      state.fbAfflatus = '';
      state.fbQuery = '';
      const pid = `fb-${btn.dataset.jumpFbRecord}`;
      state.highlightRecordId = pid;
      pendingScrollRecordId = pid;
      render();
      toast('已跳转至最短回合纪录所在关卡。');
      return;
    }

    // 鬃毛筛选项
    if (btn.dataset.maneSection) {
      state.maneSection = btn.dataset.maneSection;
      state.maneCarry = '';
      state.maneAfflatus = '';
      state.maneQuery = '';
      state.highlightRecordId = '';
      render();
      return;
    }
    if (btn.dataset.maneMap) {
      state.maneMapId = btn.dataset.maneMap;
      state.maneCarry = '';
      state.highlightRecordId = '';
      if (state.manePage !== 'scores') state.manePage = 'scores';
      render();
      return;
    }
    if (btn.dataset.maneDiv) {
      state.maneDivision = btn.dataset.maneDiv;
      state.maneCarry = '';
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

    // 焦点闪回筛选项
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
      state.fbResonanceOnly = false;
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

    // 战报档案卡：导出图片 / 复制直达链接 / 复制文字
    if (btn.dataset.poster) {
      openPoster(btn.dataset.poster);
      return;
    }
    if (btn.dataset.exportPoster) {
      const item = posterIndex.get(btn.dataset.exportPoster);
      if (item) {
        btn.disabled = true;
        const oldText = btn.textContent;
        btn.textContent = '生成中…';
        try {
          await exportPosterPng(item);
          toast('战报图（PNG）已生成并开始下载。');
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
        await navigator.clipboard.writeText(buildRecordDeepLink(item));
        toast('战报直达链接已复制到剪贴板。');
      }
      return;
    }
    if (btn.dataset.copyPoster) {
      const item = posterIndex.get(btn.dataset.copyPoster);
      if (item) {
        const teamText = (item.canonicalTeam || item.team || []).join('、');
        const link = buildRecordDeepLink(item);
        const text = item.mode === 'mane'
          ? `【重返未来：1999 鬃毛邮报】#${item.rank} ${item.title}（${item.subtitle}）｜调查员：${item.player}｜主C：${item.carry}｜阵容：${teamText}｜积分：${formatScore(item.score)}｜${link}`
          : `【重返未来：1999 焦点闪回】#${item.rank} ${item.title}（${item.subtitle}）｜玩家：${item.player}｜主C：${item.carry}｜阵容：${teamText}｜成绩：${item.rounds} 回合｜${link}`;
        await navigator.clipboard.writeText(text);
        toast('战报文字与直达链接已复制到剪贴板。');
      }
      return;
    }

    const action = btn.dataset.action;
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
      state.fbResonanceOnly=false;
      state.fbRoleMode = 'carry';
      state.fbCarry = '';
      state.fbAfflatus = '';
      state.fbQuery = '';
      render();
      return;
    }
    if (action === 'close-modal') { closeModal(); return; }
    if (action === 'my-submissions' || btn.dataset.progressBoard) {
      openMySubmissions(btn.dataset.progressBoard || state.mode);
      return;
    }
    if (action === 'fb-resonance') {
      state.fbResonanceOnly = !state.fbResonanceOnly;
      render();
      return;
    }
    if (action === 'refresh') { await loadAllData(); if (state.connected) toast('实时榜单档案已更新。'); return; }
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
      await checked(sb.auth.signOut());
      closeModal();
      await syncAuth(null);
      toast('已退出登录。');
      return;
    }
    if (btn.id === 'adminCenterBtn' || action === 'open-admin') {
      if (state.mode === 'mane') await openManeAdmin('pending');
      else await openFbAdmin('pending');
      return;
    }

    if (!state.isAdmin) return;

    // 鬃毛管理员操作
    if (btn.dataset.maneAdmin) { await openManeAdmin(btn.dataset.maneAdmin); return; }
    if (action === 'mane-maps-admin') { await openManeMapsAdmin(); return; }
    if (btn.dataset.maneProof) {
      const card = btn.closest('.review-card');
      const box = card?.querySelector('.review-proof');
      const row = await checked(sb.from('mane_entries').select('evidence_path').eq('id', btn.dataset.maneProof).single());
      const { signedUrl } = await checked(sb.storage.from('mane-proofs').createSignedUrl(row.evidence_path, 120));
      if (box) box.innerHTML = `<img class="proof-img" alt="结算截图" src="${esc(signedUrl)}" />`;
      return;
    }
    if (btn.dataset.maneEdit) {
      const row = await checked(sb.from('mane_entries').select('*').eq('id', btn.dataset.maneEdit).single());
      const maps = await checked(sb.from('mane_maps').select('*').order('position'));
      openModal(`
        <h2>编辑鬃毛成绩</h2>
        <form id="maneEditForm" data-id="${esc(row.id)}" data-revision="${esc(row.updated_at)}" data-status="${esc(row.status)}">
          ${maneScoreFieldsHtml(row, maps)}
          <div class="form-actions">
            <button type="button" class="outline-btn" data-mane-admin="${esc(row.status)}">返回</button>
            <button type="submit" class="copper-btn">保存修改</button>
          </div>
        </form>`);
      return;
    }
    if (btn.dataset.maneDecision) {
      const card = btn.closest('.review-card');
      const { entry, revision, status } = card.dataset;
      const dec = btn.dataset.maneDecision;
      if (dec === 'rejected') {
        showRejectionForm(btn, async reason => {
          const updated = await checked(sb.from('mane_entries').update({status:'rejected',review_note:reason})
            .eq('id',entry).eq('updated_at',revision).select('id'));
          if (!updated.length) throw Error('该成绩已被其他管理员修改，请重新打开。');
          await openManeAdmin(status);
          toast('投稿已拒绝。');
        });
        return;
      }
      if (dec === 'removed' && !window.confirm('确定撤下这条鬃毛成绩？')) return;
      const updated = await checked(sb.from('mane_entries').update({ status: dec }).eq('id', entry).eq('updated_at', revision).select('id'));
      if (!updated.length) throw new Error('该成绩已被其他管理员修改，请重新打开。');
      await loadAllData();
      await openManeAdmin(status);
      toast('审核状态已更新。');
      return;
    }
    if (action === 'mane-delete-rejected') {
      const card = btn.closest('.review-card');
      if (!window.confirm('确定删除这条已拒绝的成绩？')) return;
      await checked(sb.rpc('mane_archive_rejected', { p_id: card.dataset.entry, p_updated_at: card.dataset.revision }));
      await openManeAdmin('rejected');
      toast('已删除该条拒绝记录。');
      return;
    }
    if (action === 'mane-reopen') {
      const {entry,revision}=btn.closest('.review-card').dataset;
      await checked(sb.rpc('reopen_rejected_result',{p_board:'mane',p_id:entry,p_updated_at:revision}));
      await openManeAdmin('pending');
      toast('已退回待审核。');
      return;
    }
    if (btn.dataset.toggleManeMap) {
      const active = btn.dataset.active === 'true';
      if (active && !window.confirm('隐藏此地图及其公开榜单？')) return;
      await checked(sb.from('mane_maps').update({ active: !active }).eq('id', btn.dataset.toggleManeMap));
      await loadAllData();
      await openManeMapsAdmin();
      toast('地图显示状态已更新。');
      return;
    }

    // 焦点闪回管理员操作
    if (action === 'fb-admin-open') { await openFbAdmin('pending'); return; }
    if (btn.dataset.fbAdmin) { await openFbAdmin(btn.dataset.fbAdmin); return; }
    if (action === 'fb-versions-admin') { openFbVersionManager(); return; }
    if (btn.dataset.fbEditVersion !== undefined) { openFbVersionEditor(btn.dataset.fbEditVersion); return; }
    if (btn.dataset.fbProof) {
      const id = btn.dataset.fbProof;
      const box = document.getElementById(`fb-proof-${id}`);
      if (!box) return;
      box.textContent = '正在读取截图…';
      const row = await checked(sb.from('submissions').select('evidence_path').eq('id', id).single());
      const blob = await checked(sb.storage.from('proofs').download(row.evidence_path));
      const img = await decodeImageFile(blob);
      img.alt = '焦点闪回通关截图';
      img.className = 'proof-img';
      box.replaceChildren(img);
      return;
    }
    if (btn.dataset.fbReview) {
      const approved = btn.dataset.fbReview === 'approved';
      if (!approved) {
        showRejectionForm(btn, async reason => {
          await checked(sb.rpc('review_submission',{p_submission_id:btn.dataset.id,p_decision:'rejected',p_note:reason}));
          await openFbAdmin('pending');
          toast('投稿已拒绝。');
        });
        return;
      }
      await checked(sb.rpc('review_submission', { p_submission_id: btn.dataset.id, p_decision: btn.dataset.fbReview, p_note: '' }));
      await loadAllData();
      await openFbAdmin('pending');
      toast(approved ? '审核通过，排行榜已重算。' : '投稿已拒绝。');
      return;
    }
    if (btn.dataset.fbReopen) {
      await checked(sb.rpc('reopen_rejected_result',{p_board:'flashback',p_id:btn.dataset.fbReopen}));
      await openFbAdmin('pending');
      toast('已退回待审核。');
      return;
    }
    if (btn.dataset.fbRemove) {
      const reason = window.prompt('请输入移除原因（2–200 字）：');
      if (reason === null) return;
      const note = reason.trim();
      if (note.length < 2 || note.length > 200) return toast('移除原因须为 2–200 字。');
      if (!window.confirm('确认移除这条已通过成绩并重算荣誉？')) return;
      await checked(sb.rpc('remove_submission', { p_submission_id: btn.dataset.fbRemove, p_reason: note }));
      await loadAllData();
      await openFbAdmin('approved');
      toast('成绩已移除，荣誉已重算。');
      return;
    }
    if (btn.dataset.fbEdit) {
      const id = btn.dataset.fbEdit;
      const tab = btn.dataset.tab || 'pending';
      const rec = await checked(sb.from('submissions')
        .select('stage_id,group_code,team,carry_name,rounds,credited_player,related_url,source_history_id,resonance_ten,profiles(display_name)')
        .eq('id', id).single());
      const stageOpts = state.fbVersions.map((v) =>
        `<optgroup label="${esc(v.label)}">${standardStages(v.id).map((s) => `<option value="${esc(s.id)}"${s.id === rec.stage_id ? ' selected' : ''}>${esc(s.name)}</option>`).join('')}</optgroup>`
      ).join('');
      openModal(`
        <h2>编辑焦点闪回成绩</h2>
        <form id="fbEditForm" data-id="${esc(id)}" data-tab="${esc(tab)}">
          <div class="form-grid">
            <div class="field"><label for="feStage">版本与关卡</label><select id="feStage" name="stage" required>${stageOpts}</select></div>
            <div class="field"><label for="feGroup">塑造分组</label><select id="feGroup" name="group">${optionsHtml(Object.entries(DIVISIONS), rec.group_code)}</select></div>
          </div>
          <div class="form-grid">
            <div class="field"><label for="feName">展示昵称</label><input id="feName" name="name" value="${esc(rec.credited_player || '')}" placeholder="${esc(rec.profiles?.display_name || '')}" minlength="2" maxlength="80" ${rec.source_history_id ? 'required' : ''} /></div>
            <div class="field"><label for="feRounds">通关回合</label><select id="feRounds" name="rounds">${Array.from({ length: 7 }, (_, n) => `<option value="${n}"${rec.rounds === n ? ' selected' : ''}>${n} 回合</option>`).join('')}</select></div>
          </div>
          <div class="field"><label for="feCarry">主 C</label><input id="feCarry" name="carry" required maxlength="170" value="${esc(rec.carry_name || '')}" /></div>
          ${resonanceChoice(rec.group_code,rec.resonance_ten)}
          <div class="field"><label for="feTeam">配队</label><textarea id="feTeam" name="team" required maxlength="170" data-original-team="${esc(JSON.stringify(rec.team))}">${esc((rec.team || []).join('、'))}</textarea></div>
          <div class="field"><label for="feUrl">相关链接</label><input id="feUrl" name="url" type="url" maxlength="2048" value="${esc(rec.related_url || '')}" /></div>
          <div class="form-actions">
            <button type="button" class="outline-btn" data-fb-admin="${esc(tab)}">返回</button>
            <button type="submit" class="copper-btn">保存修改</button>
          </div>
        </form>`);
      return;
    }
    if (btn.dataset.fbArchive) {
      const cfg = FB_ARCHIVE_ACTIONS[btn.dataset.fbArchive];
      if (!cfg || !window.confirm(`删除${cfg.label}？删除后会从列表与统计中撤下。`)) return;
      await checked(sb.rpc(cfg.rpc, { [cfg.arg]: btn.dataset.id }));
      await loadAllData();
      if (btn.dataset.fbArchive === 'fb-archive-version') openFbVersionManager();
      else await openFbAdmin(btn.dataset.fbArchive === 'fb-archive-history' ? 'historical' : (btn.dataset.tab || 'pending'), btn.dataset.stage || '');
      toast('已删除。');
    }
  } catch (err) {
    toast(err.message || '操作未完成，请重试。');
  }
});

document.addEventListener('change', (ev) => {
  const t = ev.target;
  if (t.id === 'maneCarrySelect') { state.maneCarry = t.value; render(); }
  else if (t.id === 'fbVersionSelect') {
    state.fbVersionId = t.value;
    state.fbStageId = standardStages(state.fbVersionId)[0]?.id || '';
    state.fbCarry = '';
    render();
  }
  else if (t.id === 'fbCarrySelect') { state.fbCarry = t.value; render(); }
  else if (t.id === 'fbFormGroup' || t.id === 'feGroup') {
    const input=t.form.elements.namedItem('resonanceTen');
    input.disabled=t.value!=='zero';
    input.closest('label').hidden=input.disabled;
    if(input.disabled) input.checked=false;
  }
  else if (t.id === 'fbFormVersion') {
    const sel = $('#fbFormStage');
    if (sel) sel.innerHTML = fbStageOptionsHtml(t.value);
  }
});

document.addEventListener('input', (ev) => {
  const t = ev.target;
  if (t.id === 'maneSearchInput') {
    const pos = t.selectionStart;
    state.maneQuery = t.value;
    render();
    const el = $('#maneSearchInput');
    if (el) { el.focus(); el.setSelectionRange(pos, pos); }
  } else if (t.id === 'fbSearchInput') {
    const pos = t.selectionStart;
    state.fbQuery = t.value;
    render();
    const el = $('#fbSearchInput');
    if (el) { el.focus(); el.setSelectionRange(pos, pos); }
  }
});

document.addEventListener('submit', async (ev) => {
  const form = ev.target;
  if (!form.id) return;
  ev.preventDefault();
  const submitBtn = form.querySelector('[type="submit"]');
  if (submitBtn?.disabled) return;
  if (submitBtn) submitBtn.disabled = true;

  try {
    if (form.id === 'maneSubmitForm') {
      await handleManeSubmit(form);
    } else if (form.id === 'maneEditForm' && state.isAdmin) {
      const patch = readManeFields(new FormData(form));
      const updated = await checked(sb.from('mane_entries').update(patch).eq('id', form.dataset.id).eq('updated_at', form.dataset.revision).select('id'));
      if (!updated.length) throw new Error('成绩已被其他管理员更新，请重新打开。');
      await loadAllData();
      await openManeAdmin(form.dataset.status);
      toast('鬃毛成绩已保存。');
    } else if (form.id === 'maneMapForm' && state.isAdmin) {
      const fd = new FormData(form);
      await checked(sb.from('mane_maps').insert({
        name: String(fd.get('name')).trim(),
        edition: String(fd.get('edition')).trim(),
        section: String(fd.get('section')),
        position: Number(fd.get('position'))
      }));
      await loadAllData();
      await openManeMapsAdmin();
      toast('首领地图已新增。');
    } else if (form.id === 'fbGuestForm') {
      const name = String(new FormData(form).get('name') || '').trim();
      if (name.length < 2 || name.length > 24) throw new Error('昵称须为 2–24 字。');
      startingGuest = true;
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
      if (!state.user || name.length < 2 || name.length > 24) throw new Error('昵称须为 2–24 字。');
      await checked(sb.from('profiles').upsert({ id: state.user.id, display_name: name }, { onConflict: 'id' }));
      await syncAuth();
      closeModal();
      if (form.dataset.forFb === 'true') openFbSubmitModal();
      else toast('展示昵称已保存。');
    } else if (form.id === 'fbSubmitForm') {
      $('#fbSubmitWarning').textContent = '';
      await handleFbSubmit(form);
    } else if (form.id === 'fbEditForm' && state.isAdmin) {
      const fd = new FormData(form);
      const link = parseHttpUrl(fd.get('url')) || null;
      const input = form.elements.namedItem('team');
      const changed = input.value !== input.defaultValue;
      const team = changed?splitTeam(input.value):JSON.parse(input.dataset.originalTeam);
      if(changed)validateLineup(team);
      await checked(sb.rpc('edit_submission', {
        p_id: form.dataset.id,
        p_stage_id: fd.get('stage'),
        p_group: fd.get('group'),
        p_team: team,
        p_carry: splitCarries(fd.get('carry')).join('/'),
        p_rounds: Number(fd.get('rounds')),
        p_credited_player: fd.get('name'),
        p_related_url: link,
        p_resonance_ten: fd.get('group')==='zero'&&fd.has('resonanceTen')
      }));
      await loadAllData();
      await openFbAdmin(form.dataset.tab);
      toast('焦点闪回成绩已保存。');
    } else if (form.id === 'fbVersionForm' && state.isAdmin) {
      const fd = new FormData(form);
      const code = String(fd.get('code') || '').trim();
      const label = String(fd.get('label') || '').trim();
      const names = [1, 2, 3].map((i) => String(fd.get(`stage${i}`) || '').trim());
      if (!code || !label || names.some((n) => !n)) throw new Error('请填写完整版本与三个关卡名称。');
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
      toast('版本与关卡归属已保存。');
    } else if (form.id === 'adminLoginForm') {
      const email = String(new FormData(form).get('email') || '').trim();
      await checked(sb.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: new URL('./', location.href).href }
      }));
      closeModal();
      toast('登录邮件已发送，请在同一浏览器查收并打开链接。');
    }
  } catch (err) {
    const warning=form.querySelector('#fbSubmitWarning');
    if(warning)warning.textContent=err.message||'操作失败，请重试。';
    else toast(err.message || '操作失败，请重试。');
  } finally {
    startingGuest = false;
    if (submitBtn?.isConnected) submitBtn.disabled = false;
  }
});

document.addEventListener('keydown', (ev) => {
  if (ev.key === 'Escape') closeModal();
});

document.addEventListener('click', (ev) => {
  if (ev.target.id === 'modalOverlay') closeModal();
});

window.addEventListener('hashchange', () => {
  readHash();
  render();
});

/* ==================== 启动初始化 ==================== */
async function bootstrap() {
  readHash();
  render();

  const cfg = window.LEADERBOARD_CONFIG;
  if (!cfg?.supabaseUrl || !cfg?.supabaseAnonKey) {
    state.loading = false;
    state.errorNotice = '缺少 config.js 后端配置。';
    render();
    return;
  }

  try {
    const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
    sb = createClient(cfg.supabaseUrl, cfg.supabaseAnonKey);
    await Promise.all([loadAllData(), syncAuth()]);
    if (!authBound) {
      authBound = true;
      sb.auth.onAuthStateChange((_ev, nextSession) => {
        setTimeout(() => syncAuth(nextSession).catch(() => {}), 0);
      });
    }
  } catch (err) {
    console.error(err);
    state.loading = false;
    state.connected = false;
    state.errorNotice = '无法加载榜单客户端模块，请检查网络后刷新。';
    render();
  }
}

onTouchLayoutChange(render);
bootstrap();
