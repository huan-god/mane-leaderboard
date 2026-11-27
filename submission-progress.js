import * as arcanists from './arcanists.js';
import * as i18n from './i18n.js';

const STATUS_LABELS = {
  en: {
    all: 'All',
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected',
    removed: 'Removed',
    local: 'Local Archive'
  },
  zh: {
    all: '全部',
    pending: '待审核',
    approved: '已通过',
    rejected: '已拒绝',
    removed: '已移除',
    local: '本地存档'
  }
};

const FILTER_STATUS_KEYS = ['all', 'pending', 'approved', 'rejected'];
const pageSize = 20;

const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) =>
  ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'})[char]);

const submittedAtEn = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'short', timeStyle: 'short', timeZone: 'Asia/Shanghai'
});
const submittedAtZh = new Intl.DateTimeFormat('zh-CN', {
  dateStyle: 'short', timeStyle: 'short', timeZone: 'Asia/Shanghai'
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

function getStatusLabels(lang) {
  return checkEn(lang) ? STATUS_LABELS.en : STATUS_LABELS.zh;
}

function safeDisplayCharacterName(raw, lang) {
  if (typeof arcanists.displayCharacterName === 'function') {
    return arcanists.displayCharacterName(raw, lang);
  }
  if (typeof arcanists.canonicalDisplayName === 'function') {
    return arcanists.canonicalDisplayName(raw);
  }
  return String(raw ?? '').trim();
}

function safeLocalizeDivision(code, lang) {
  const active = resolveLang(lang);
  if (typeof i18n.localizeDivision === 'function') {
    const localized = i18n.localizeDivision(code, active);
    if (localized) return localized;
  }
  if (checkEn(active)) {
    if (code === 'zero') return 'All P0';
    if (code === 'max') return 'Max Portray';
  } else {
    if (code === 'zero') return '全 0 塑造';
    if (code === 'max') return '全满塑造';
  }
  return String(code ?? '');
}

function formatSubmittedAt(value, en) {
  if (!value) return '';
  const date = value instanceof Date ? value : new Date(value);
  if (!Number.isFinite(date.getTime())) return String(value);
  return (en ? submittedAtEn : submittedAtZh).format(date);
}

function compareOfflineRows(a, b) {
  const ta = Date.parse(a?.created_at || '');
  const tb = Date.parse(b?.created_at || '');
  const aValid = Number.isFinite(ta);
  const bValid = Number.isFinite(tb);
  if (aValid && bValid && tb !== ta) return tb - ta;
  if (aValid !== bValid) return bValid ? 1 : -1;
  return String(b?.id ?? '').localeCompare(String(a?.id ?? ''));
}

export function contactFieldHtml(lang = resolveLang()) {
  const en = checkEn(lang);
  const label = en ? 'Contact (Optional)' : '联系方式（选填）';
  const placeholder = en ? 'e.g. Discord handle or email' : '例如：QQ 123456789 或邮箱';
  const hint = en
    ? 'Only visible to moderators if clarification is needed.'
    : '若成绩有疑问，方便管理员联系你。联系方式仅审核管理员可见。';
  return `<div class="field">
  <label for="submissionContact">${escapeHtml(label)}</label>
  <input id="submissionContact" name="contact" maxlength="120"
    placeholder="${escapeHtml(placeholder)}" aria-describedby="submissionContactHint">
  <span class="field-hint" id="submissionContactHint">${escapeHtml(hint)}</span>
</div>`;
}

export const contactField = contactFieldHtml();

export function adminContact(related, lang = resolveLang()) {
  const contact = typeof related === 'string'
    ? related
    : (Array.isArray(related) ? related[0] : related)?.contact;
  if (!contact) return '';
  const prefix = checkEn(lang) ? 'Contact: ' : '联系方式：';
  return `<p class="review-contact">${prefix}${escapeHtml(contact)}</p>`;
}

export function showRejectionForm(button, save, lang = resolveLang()) {
  const en = checkEn(lang);
  const actions = button.closest('.review-actions');
  const existing = actions.parentElement.querySelector('.rejection-form');
  if (existing) {
    existing.elements.namedItem('reason').focus();
    return;
  }

  const copy = en
    ? {
        ariaLabel: 'Reject Submission',
        reasonLabel: 'Rejection Reason',
        placeholder: 'Enter 2–200 characters',
        hint: 'The submitter can view this reason under "My Submissions".',
        cancel: 'Cancel',
        confirm: 'Confirm Reject',
        submitting: 'Submitting…',
        lengthError: 'Rejection reason must be 2–200 characters.',
        fallbackError: 'Submission failed. Please try again.'
      }
    : {
        ariaLabel: '拒绝成绩',
        reasonLabel: '拒绝理由',
        placeholder: '请填写 2–200 字',
        hint: '投稿者可以在「我的投稿」查看这条理由。',
        cancel: '取消',
        confirm: '确认拒绝',
        submitting: '正在提交…',
        lengthError: '拒绝理由需要 2–200 个字符。',
        fallbackError: '提交失败，请重试。'
      };

  const form = document.createElement('form');
  form.className = 'rejection-form';
  form.noValidate = true;
  form.setAttribute('aria-label', copy.ariaLabel);
  form.innerHTML = `<label class="field">${escapeHtml(copy.reasonLabel)}
    <textarea name="reason" rows="3" maxlength="200" required placeholder="${escapeHtml(copy.placeholder)}"></textarea>
    <span class="field-hint">${escapeHtml(copy.hint)}</span>
  </label><p class="rejection-error" role="alert"></p>
  <div class="form-actions"><button type="button" class="outline-btn">${escapeHtml(copy.cancel)}</button>
    <button type="submit" class="danger-btn">${escapeHtml(copy.confirm)}</button></div>`;
  const input = form.elements.namedItem('reason');
  const cancel = form.querySelector('button[type="button"]');
  const confirm = form.querySelector('button[type="submit"]');
  const error = form.querySelector('[role="alert"]');

  function dismiss() {
    form.remove();
    if (button.isConnected) button.focus();
  }
  cancel.addEventListener('click', dismiss);
  form.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    event.preventDefault();
    event.stopPropagation();
    if (!confirm.disabled) dismiss();
  });
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (confirm.disabled) return;
    const reason = input.value.trim();
    const length = Array.from(reason).length;
    if (length < 2 || length > 200) {
      error.textContent = copy.lengthError;
      input.focus();
      return;
    }
    error.textContent = '';
    confirm.disabled = cancel.disabled = input.disabled = true;
    confirm.textContent = copy.submitting;
    try {
      await save(reason);
      form.remove();
    } catch (failure) {
      error.textContent = failure?.message || copy.fallbackError;
      confirm.disabled = cancel.disabled = input.disabled = false;
      confirm.textContent = copy.confirm;
      input.focus();
    }
  });
  actions.after(form);
  input.focus();
}

export function mountSubmissionProgress(host, {
  client,
  ownerId,
  table,
  columns,
  describe,
  offlineRows = null,
  onClearOffline = null,
  lang = resolveLang()
} = {}) {
  const activeLang = resolveLang(lang);
  const en = checkEn(activeLang);
  const statusLabels = getStatusLabels(activeLang);
  const isOffline = Array.isArray(offlineRows);
  let currentOfflineRows = isOffline ? offlineRows : null;

  const copy = en
    ? {
        heading: 'My Submissions',
        subtitleOnline: 'Track moderation progress for your current submitter identity. Guest submissions are stored per browser.',
        subtitleOffline: 'Offline preview mode — showing submissions archived locally in this browser.',
        noIdentityTitle: 'No submissions available to view',
        noIdentityBody: 'Submit a score first, then return here to check its review status.',
        filterAriaLabel: 'Filter by review status',
        refresh: 'Refresh ↻',
        clearOffline: 'Clear Local Submissions',
        loading: 'Loading submissions…',
        loadError: 'Unable to load submission progress right now. Click Refresh to try again.',
        emptyOfflineTitle: 'No local submissions yet',
        emptyOfflineBody: 'Submit a run in offline preview mode to archive it locally in this browser.',
        emptyStatusTitle: 'No submissions with this status',
        lineupPrefix: 'Lineup · ',
        submittedPrefix: 'Submitted ',
        rejectedLabel: 'Rejection Reason: ',
        rejectedFallback: 'No reason provided by moderator.',
        removedLabel: 'Removal Reason: ',
        prevPage: 'Previous',
        nextPage: 'Next'
      }
    : {
        heading: '我的投稿',
        subtitleOnline: '查看当前投稿身份的审核进度。使用昵称投稿后，请在原浏览器查看。',
        subtitleOffline: '当前为离线预览模式，正在展示本浏览器中保存的本地存档投稿。',
        noIdentityTitle: '当前没有可查询的投稿',
        noIdentityBody: '提交成绩后，可以回到这里查看审核结果。',
        filterAriaLabel: '筛选审核状态',
        refresh: '刷新 ↻',
        clearOffline: '清空本地测试投稿',
        loading: '正在读取投稿…',
        loadError: '审核进度暂时无法读取，请点击刷新重试。',
        emptyOfflineTitle: '暂无本地测试投稿',
        emptyOfflineBody: '在离线预览模式下提交成绩后，会保存在本浏览器中并显示在这里。',
        emptyStatusTitle: '暂无此状态的投稿',
        lineupPrefix: '配队 · ',
        submittedPrefix: '投稿于 ',
        rejectedLabel: '拒绝理由：',
        rejectedFallback: '管理员未填写理由。',
        removedLabel: '移除原因：',
        prevPage: '上一页',
        nextPage: '下一页'
      };

  host.innerHTML = `<div class="section-header"><div><h2>${escapeHtml(copy.heading)}</h2>
    <p class="section-subtitle">${escapeHtml(isOffline ? copy.subtitleOffline : copy.subtitleOnline)}</p>
    </div></div>`;

  if (!isOffline && (!client || !ownerId)) {
    host.insertAdjacentHTML('beforeend', `<div class="empty-state"><h3>${escapeHtml(copy.noIdentityTitle)}</h3><p>${escapeHtml(copy.noIdentityBody)}</p></div>`);
    return;
  }

  const showClearBtn = isOffline && currentOfflineRows.length > 0 && typeof onClearOffline === 'function';

  host.insertAdjacentHTML('beforeend', `<div class="moderation-tabs" role="group" aria-label="${escapeHtml(copy.filterAriaLabel)}">
    ${FILTER_STATUS_KEYS.map((key) =>
      `<button class="outline-btn" type="button" data-status-filter="${key}" aria-pressed="false">${escapeHtml(statusLabels[key])}</button>`).join('')}
    <button class="text-link-btn" type="button" data-progress-refresh>${escapeHtml(copy.refresh)}</button>
    ${showClearBtn ? `<button class="text-link-btn" type="button" data-progress-clear-offline>${escapeHtml(copy.clearOffline)}</button>` : ''}
  </div><div data-progress-list aria-live="polite"></div>`);

  let status = 'all';
  let page = 0;
  let request = 0;
  const list = host.querySelector('[data-progress-list]');
  const buttons = [...host.querySelectorAll('[data-status-filter]')];
  const clearOfflineBtn = host.querySelector('[data-progress-clear-offline]');

  function renderCards(rows, hasMore) {
    const teamJoiner = en ? ', ' : '、';
    if (!rows.length) {
      if (isOffline && (!currentOfflineRows || currentOfflineRows.length === 0)) {
        list.innerHTML = `<div class="empty-state"><h3>${escapeHtml(copy.emptyOfflineTitle)}</h3><p>${escapeHtml(copy.emptyOfflineBody)}</p></div>`;
      } else {
        list.innerHTML = `<div class="empty-state"><h3>${escapeHtml(copy.emptyStatusTitle)}</h3></div>`;
      }
      return;
    }

    list.innerHTML = rows.map((row) => {
      const details = typeof describe === 'function' ? describe(row) : {title: row?.id || '', summary: ''};
      const rowStatus = row?.status || (isOffline ? 'approved' : 'pending');
      const isLocalRow = isOffline || Boolean(row?.isLocal || row?.offline || row?._local);
      const statusText = statusLabels[rowStatus] || rowStatus;
      const teamText = (Array.isArray(row?.team) ? row.team : [])
        .map((name) => safeDisplayCharacterName(name, activeLang))
        .filter(Boolean)
        .join(teamJoiner);
      const timeText = formatSubmittedAt(row?.created_at, en);

      const note = rowStatus === 'rejected'
        ? `<p class="submission-reason"><strong>${escapeHtml(copy.rejectedLabel)}</strong>${escapeHtml(row.review_note || copy.rejectedFallback)}</p>`
        : rowStatus === 'removed' && row?.review_note
          ? `<p class="submission-reason"><strong>${escapeHtml(copy.removedLabel)}</strong>${escapeHtml(row.review_note)}</p>`
          : '';

      const localBadge = isLocalRow
        ? `<span class="submission-status status-local" style="color:var(--gold,#e0b86a);border-color:currentColor">${escapeHtml(statusLabels.local)}</span>`
        : '';

      return `<article class="review-card"><div class="review-top">
        <strong>${escapeHtml(details?.title)}</strong>
        <span class="submission-badges" style="display:inline-flex;align-items:center;gap:6px;flex-wrap:wrap;justify-content:flex-end">${localBadge}<span class="submission-status status-${escapeHtml(rowStatus)}">${escapeHtml(statusText)}</span></span></div>
        <div class="review-meta">${escapeHtml(details?.summary)}<br>${escapeHtml(copy.lineupPrefix)}${escapeHtml(teamText)}${timeText ? `<br>${escapeHtml(copy.submittedPrefix)}${escapeHtml(timeText)}` : ''}</div>${note}</article>`;
    }).join('');

    if (page > 0 || hasMore) {
      list.insertAdjacentHTML('beforeend', `<div class="form-actions">
        <button class="outline-btn" type="button" data-progress-page="-1" ${page === 0 ? 'disabled' : ''}>${escapeHtml(copy.prevPage)}</button>
        <button class="outline-btn" type="button" data-progress-page="1" ${hasMore ? '' : 'disabled'}>${escapeHtml(copy.nextPage)}</button></div>`);
    }
  }

  async function load() {
    const current = ++request;
    for (const button of buttons) {
      const selected = button.dataset.statusFilter === status;
      button.setAttribute('aria-pressed', String(selected));
      button.classList.toggle('selected', selected);
    }

    if (isOffline) {
      const filtered = [...(currentOfflineRows || [])]
        .filter((row) => {
          const rowStatus = row?.status || 'approved';
          return status === 'all' ? true : rowStatus === status;
        })
        .sort(compareOfflineRows);
      const start = page * pageSize;
      const slice = filtered.slice(start, start + pageSize + 1);
      if (slice.length === 0 && page > 0) {
        page -= 1;
        await load();
        return;
      }
      renderCards(slice.slice(0, pageSize), slice.length > pageSize);
      return;
    }

    list.textContent = copy.loading;
    try {
      let query = client.from(table).select(`id,status,review_note,created_at,${columns}`)
        .eq('player_id', ownerId).order('created_at', {ascending: false}).order('id', {ascending: false});
      if (status !== 'all') query = query.eq('status', status);
      const {data, error} = await query.range(page * pageSize, (page + 1) * pageSize);
      if (!host.isConnected || current !== request) return;
      if (error) throw error;
      if (data.length === 0 && page > 0) {
        page -= 1;
        await load();
        return;
      }
      renderCards(data.slice(0, pageSize), data.length > pageSize);
    } catch {
      if (host.isConnected && current === request) list.textContent = copy.loadError;
    }
  }

  for (const button of buttons) {
    button.addEventListener('click', () => {
      status = button.dataset.statusFilter;
      page = 0;
      void load();
    });
  }
  host.querySelector('[data-progress-refresh]').addEventListener('click', () => void load());
  if (clearOfflineBtn) {
    clearOfflineBtn.addEventListener('click', async () => {
      if (clearOfflineBtn.disabled) return;
      clearOfflineBtn.disabled = true;
      try {
        const nextRows = await onClearOffline();
        if (!clearOfflineBtn.isConnected || !host.isConnected) return;
        currentOfflineRows = Array.isArray(nextRows) ? nextRows : [];
        if (currentOfflineRows.length === 0) clearOfflineBtn.remove();
        page = 0;
        await load();
      } finally {
        if (clearOfflineBtn.isConnected) clearOfflineBtn.disabled = false;
      }
    });
  }
  list.addEventListener('click', (event) => {
    const button = event.target.closest('[data-progress-page]');
    if (!button || button.disabled) return;
    page += Number(button.dataset.progressPage);
    void load();
  });
  void load();
}

export const moderationPageSize = 40;

export function moderationFilterFields(filters, locationLabel, groups, lang = resolveLang()) {
  const activeLang = resolveLang(lang);
  const en = checkEn(activeLang);
  const options = (items, selected) => items.map(([id, label]) =>
    `<option value="${escapeHtml(id)}"${id === selected ? ' selected' : ''}>${escapeHtml(label)}</option>`).join('');

  const copy = en
    ? {
        nicknameLabel: 'Timekeeper',
        nicknamePlaceholder: 'Search nickname',
        allLocation: `All ${locationLabel}`,
        divisionLabel: 'Portray Tier',
        allDivision: 'All Portray Tiers',
        search: 'Search',
        reset: 'Clear'
      }
    : {
        nicknameLabel: '玩家昵称',
        nicknamePlaceholder: '搜昵称的一部分',
        allLocation: `全部${locationLabel}`,
        divisionLabel: '塑造分组',
        allDivision: '全部塑造',
        search: '搜索',
        reset: '清空'
      };

  const divisionItems = [
    ['zero', safeLocalizeDivision('zero', activeLang)],
    ['max', safeLocalizeDivision('max', activeLang)]
  ];

  return `<form class="moderation-filter">
    <div class="field"><label for="moderationNickname">${escapeHtml(copy.nicknameLabel)}</label>
      <input id="moderationNickname" name="name" type="search" maxlength="80" value="${escapeHtml(filters?.name)}" placeholder="${escapeHtml(copy.nicknamePlaceholder)}"></div>
    <div class="field"><label for="moderationLocation">${escapeHtml(locationLabel)}</label>
      <select id="moderationLocation" name="location"><option value="">${escapeHtml(copy.allLocation)}</option>
        ${(groups || []).map(([group, items]) => `<optgroup label="${escapeHtml(group)}">${options(items, filters?.location)}</optgroup>`).join('')}
      </select></div>
    <div class="field"><label for="moderationDivision">${escapeHtml(copy.divisionLabel)}</label>
      <select id="moderationDivision" name="division"><option value="">${escapeHtml(copy.allDivision)}</option>
        ${options(divisionItems, filters?.division)}
      </select></div>
    <div class="moderation-filter-actions"><button type="submit" class="outline-btn">${escapeHtml(copy.search)}</button>
      <button type="button" class="text-link-btn" data-moderation-reset>${escapeHtml(copy.reset)}</button></div>
  </form>`;
}

export function bindModerationFilters(form, list, filters, reload) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    event.stopPropagation();
    const fields = new FormData(form);
    Object.assign(filters, {
      name: String(fields.get('name') ?? '').trim(),
      location: String(fields.get('location') ?? ''),
      division: String(fields.get('division') ?? ''),
      page: 0
    });
    void reload();
  });
  form.addEventListener('change', (event) => {
    if (event.target.matches('select')) form.requestSubmit();
  });
  form.querySelector('[data-moderation-reset]').addEventListener('click', () => {
    for (const name of ['name', 'location', 'division']) {
      const field = form.elements.namedItem(name);
      if (field) field.value = '';
    }
    form.requestSubmit();
  });
  list.addEventListener('click', (event) => {
    const button = event.target.closest('[data-moderation-page]');
    if (!button || button.disabled) return;
    filters.page += Number(button.dataset.moderationPage);
    void reload();
  });
}

export function filterModerationRows(query, filters, locationKey, divisionKey) {
  if (filters.name) query = query.ilike('display_name', `%${filters.name.replace(/[\\%_]/g, '\\$&')}%`);
  if (filters.location) query = query.eq(locationKey, filters.location);
  if (filters.division) query = query.eq(divisionKey, filters.division);
  const first = filters.page * moderationPageSize;
  return query.order('created_at', {ascending: false}).order('id', {ascending: false}).range(first, first + moderationPageSize);
}

export function moderationPager(page, hasMore, lang = resolveLang()) {
  if (page === 0 && !hasMore) return '';
  const en = checkEn(lang);
  const prevLabel = en ? 'Previous' : '上一页';
  const pageLabel = en ? `Page ${page + 1}` : `第 ${page + 1} 页`;
  const nextLabel = en ? 'Next' : '下一页';
  return `<div class="form-actions moderation-pagination">
    <button type="button" class="outline-btn" data-moderation-page="-1" ${page === 0 ? 'disabled' : ''}>${escapeHtml(prevLabel)}</button>
    <span>${escapeHtml(pageLabel)}</span>
    <button type="button" class="outline-btn" data-moderation-page="1" ${hasMore ? '' : 'disabled'}>${escapeHtml(nextLabel)}</button>
  </div>`;
}
