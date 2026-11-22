const labels = {
  all: '全部', pending: '待审核', approved: '已通过', rejected: '已拒绝', removed: '已移除'
};
const pageSize = 20;
const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char =>
  ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[char]);
const submittedAt = new Intl.DateTimeFormat('zh-CN', {
  dateStyle:'short', timeStyle:'short', timeZone:'Asia/Shanghai'
});

export const contactField = `<div class="field">
  <label for="submissionContact">联系方式（选填）</label>
  <input id="submissionContact" name="contact" maxlength="120"
    placeholder="例如：QQ 123456789 或邮箱" aria-describedby="submissionContactHint">
  <span class="field-hint" id="submissionContactHint">若成绩有疑问，方便管理员联系你。联系方式仅审核管理员可见。</span>
</div>`;

export function adminContact(related) {
  const contact = typeof related==='string' ? related : (Array.isArray(related) ? related[0] : related)?.contact;
  return contact ? `<p class="review-contact">联系方式：${escapeHtml(contact)}</p>` : '';
}

export function showRejectionForm(button, save) {
  const actions = button.closest('.review-actions');
  const existing = actions.parentElement.querySelector('.rejection-form');
  if (existing) {
    existing.elements.namedItem('reason').focus();
    return;
  }

  const form = document.createElement('form');
  form.className = 'rejection-form';
  form.noValidate = true;
  form.setAttribute('aria-label','拒绝成绩');
  form.innerHTML = `<label class="field">拒绝理由
    <textarea name="reason" rows="3" maxlength="200" required placeholder="请填写 2–200 字"></textarea>
    <span class="field-hint">投稿者可以在「我的投稿」查看这条理由。</span>
  </label><p class="rejection-error" role="alert"></p>
  <div class="form-actions"><button type="button" class="outline-btn">取消</button>
    <button type="submit" class="danger-btn">确认拒绝</button></div>`;
  const input = form.elements.namedItem('reason');
  const cancel = form.querySelector('button[type="button"]');
  const confirm = form.querySelector('button[type="submit"]');
  const error = form.querySelector('[role="alert"]');

  function dismiss() {
    form.remove();
    if (button.isConnected) button.focus();
  }
  cancel.addEventListener('click', dismiss);
  form.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    event.preventDefault();
    event.stopPropagation();
    if (!confirm.disabled) dismiss();
  });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    event.stopPropagation();
    if (confirm.disabled) return;
    const reason = input.value.trim();
    const length = Array.from(reason).length;
    if (length < 2 || length > 200) {
      error.textContent = '拒绝理由需要 2–200 个字符。';
      input.focus();
      return;
    }
    error.textContent = '';
    confirm.disabled = cancel.disabled = input.disabled = true;
    confirm.textContent = '正在提交…';
    try {
      await save(reason);
      form.remove();
    } catch (failure) {
      error.textContent = failure.message || '提交失败，请重试。';
      confirm.disabled = cancel.disabled = input.disabled = false;
      confirm.textContent = '确认拒绝';
      input.focus();
    }
  });
  actions.after(form);
  input.focus();
}

export function mountSubmissionProgress(host, {client, ownerId, table, columns, describe}) {
  host.innerHTML = `<div class="section-header"><div><h2>我的投稿</h2>
    <p class="section-subtitle">查看当前投稿身份的审核进度。使用昵称投稿后，请在原浏览器查看。</p>
    </div></div>`;
  if (!client || !ownerId) {
    host.insertAdjacentHTML('beforeend', '<div class="empty-state"><h3>当前没有可查询的投稿</h3><p>提交成绩后，可以回到这里查看审核结果。</p></div>');
    return;
  }

  host.insertAdjacentHTML('beforeend', `<div class="moderation-tabs" role="group" aria-label="筛选审核状态">
    ${Object.entries(labels).slice(0,4).map(([key,label]) =>
      `<button class="outline-btn" type="button" data-status-filter="${key}" aria-pressed="false">${label}</button>`).join('')}
    <button class="text-link-btn" type="button" data-progress-refresh>刷新 ↻</button>
  </div><div data-progress-list aria-live="polite"></div>`);
  let status = 'all';
  let page = 0;
  let request = 0;
  const list = host.querySelector('[data-progress-list]');
  const buttons = [...host.querySelectorAll('[data-status-filter]')];

  async function load() {
    const current = ++request;
    for (const button of buttons) {
      const selected = button.dataset.statusFilter === status;
      button.setAttribute('aria-pressed', String(selected));
      button.classList.toggle('selected', selected);
    }
    list.textContent = '正在读取投稿…';
    try {
      let query = client.from(table).select(`id,status,review_note,created_at,${columns}`)
        .eq('player_id',ownerId).order('created_at',{ascending:false}).order('id',{ascending:false});
      if (status !== 'all') query = query.eq('status',status);
      const {data,error} = await query.range(page*pageSize, (page+1)*pageSize);
      if (!host.isConnected || current !== request) return;
      if (error) throw error;
      if (data.length === 0 && page > 0) {
        page -= 1;
        await load();
        return;
      }
      list.innerHTML = data.slice(0,pageSize).map(row => {
        const details = describe(row);
        const note = row.status === 'rejected'
          ? `<p class="submission-reason"><strong>拒绝理由：</strong>${escapeHtml(row.review_note || '管理员未填写理由。')}</p>`
          : row.status === 'removed' && row.review_note
            ? `<p class="submission-reason"><strong>移除原因：</strong>${escapeHtml(row.review_note)}</p>` : '';
        return `<article class="review-card"><div class="review-top">
          <strong>${escapeHtml(details.title)}</strong><span class="submission-status status-${escapeHtml(row.status)}">${escapeHtml(labels[row.status])}</span></div>
          <div class="review-meta">${escapeHtml(details.summary)}<br>配队 · ${escapeHtml(row.team.join('、'))}<br>投稿于 ${escapeHtml(submittedAt.format(new Date(row.created_at)))}</div>${note}</article>`;
      }).join('') || '<div class="empty-state"><h3>暂无此状态的投稿</h3></div>';
      if (page > 0 || data.length > pageSize) {
        list.insertAdjacentHTML('beforeend', `<div class="form-actions">
          <button class="outline-btn" type="button" data-progress-page="-1" ${page===0?'disabled':''}>上一页</button>
          <button class="outline-btn" type="button" data-progress-page="1" ${data.length<=pageSize?'disabled':''}>下一页</button></div>`);
      }
    } catch {
      if (host.isConnected && current === request) list.textContent = '审核进度暂时无法读取，请点击刷新重试。';
    }
  }

  for (const button of buttons) button.addEventListener('click', () => {
    status = button.dataset.statusFilter;
    page = 0;
    void load();
  });
  host.querySelector('[data-progress-refresh]').addEventListener('click', () => void load());
  list.addEventListener('click', event => {
    const button = event.target.closest('[data-progress-page]');
    if (!button || button.disabled) return;
    page += Number(button.dataset.progressPage);
    void load();
  });
  void load();
}

export const moderationPageSize = 40;

export function moderationFilterFields(filters, locationLabel, groups) {
  const options = (items, selected) => items.map(([id,label]) =>
    `<option value="${escapeHtml(id)}"${id===selected?' selected':''}>${escapeHtml(label)}</option>`).join('');
  return `<form class="moderation-filter">
    <div class="field"><label for="moderationNickname">玩家昵称</label>
      <input id="moderationNickname" name="name" type="search" maxlength="80" value="${escapeHtml(filters.name)}" placeholder="搜昵称的一部分"></div>
    <div class="field"><label for="moderationLocation">${escapeHtml(locationLabel)}</label>
      <select id="moderationLocation" name="location"><option value="">全部${escapeHtml(locationLabel)}</option>
        ${groups.map(([group,items])=>`<optgroup label="${escapeHtml(group)}">${options(items,filters.location)}</optgroup>`).join('')}
      </select></div>
    <div class="field"><label for="moderationDivision">塑造分组</label>
      <select id="moderationDivision" name="division"><option value="">全部塑造</option>
        ${options([['zero','全0塑造'],['max','全满塑造']],filters.division)}
      </select></div>
    <div class="moderation-filter-actions"><button type="submit" class="outline-btn">搜索</button>
      <button type="button" class="text-link-btn" data-moderation-reset>清空</button></div>
  </form>`;
}

export function bindModerationFilters(form, list, filters, reload) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    event.stopPropagation();
    const fields = new FormData(form);
    Object.assign(filters, {name:fields.get('name').trim(),location:fields.get('location'),division:fields.get('division'),page:0});
    void reload();
  });
  form.addEventListener('change', event => {
    if (event.target.matches('select')) form.requestSubmit();
  });
  form.querySelector('[data-moderation-reset]').addEventListener('click', () => {
    for (const name of ['name','location','division']) form.elements.namedItem(name).value = '';
    form.requestSubmit();
  });
  list.addEventListener('click', event => {
    const button = event.target.closest('[data-moderation-page]');
    if (!button || button.disabled) return;
    filters.page += Number(button.dataset.moderationPage);
    void reload();
  });
}

export function filterModerationRows(query, filters, locationKey, divisionKey) {
  if (filters.name) query = query.ilike('display_name',`%${filters.name.replace(/[\\%_]/g,'\\$&')}%`);
  if (filters.location) query = query.eq(locationKey,filters.location);
  if (filters.division) query = query.eq(divisionKey,filters.division);
  const first = filters.page * moderationPageSize;
  return query.order('created_at',{ascending:false}).order('id',{ascending:false}).range(first,first+moderationPageSize);
}

export function moderationPager(page, hasMore) {
  if (page===0 && !hasMore) return '';
  return `<div class="form-actions moderation-pagination">
    <button type="button" class="outline-btn" data-moderation-page="-1" ${page===0?'disabled':''}>上一页</button>
    <span>第 ${page+1} 页</span>
    <button type="button" class="outline-btn" data-moderation-page="1" ${hasMore?'':'disabled'}>下一页</button>
  </div>`;
}
