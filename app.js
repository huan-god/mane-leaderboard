import {
  adminContact, askRejectionReason, contactField, mountSubmissionProgress,
  bindModerationFilters, filterModerationRows, moderationFilterFields, moderationPager, moderationPageSize
} from './submission-progress.js?v=1';

const $ = selector => document.querySelector(selector);
const esc = value => String(value ?? '').replace(/[&<>"']/g, char =>
  ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[char]);
const sectionLabels = {new:'本期新三图 · 鉴藏者特版',rerun:'复刻旧图 · 目击者特版'};
const divisions = {zero:'全0塑造',max:'全满塑造'};
const statuses = {pending:'待审核',approved:'已通过',rejected:'已拒绝',removed:'已移除'};
const mimeTypes = {'image/png':'png','image/jpeg':'jpg','image/webp':'webp'};
const formatScore = score => BigInt(score).toLocaleString('zh-CN');
const carryKey = text => String(text).normalize('NFKC').trim().toLowerCase();
const dateLabel = time => new Date(time).toLocaleDateString('zh-CN',{timeZone:'Asia/Shanghai',month:'2-digit',day:'2-digit'});
const carries = value => String(value ?? '').split(/[/／、]/).map(name=>name.trim()).filter(Boolean);
const compareScore = (a,b) => b.score-a.score || Date.parse(a.created_at)-Date.parse(b.created_at) || a.id.localeCompare(b.id);
const state = {page:'scores',section:'new',division:'zero',mapId:'',carry:'',maps:[],scores:[],totals:[],admin:false,ready:false,session:null};
let sb;
let toastTimer;

function httpLink(value) {
  const text = String(value ?? '').trim();
  if (!text) return '';
  const url = new URL(text);
  if (!['http:','https:'].includes(url.protocol) || url.username || url.password ||
      /[\s\\]/u.test(text) || url.href.length>2048) throw Error('请输入有效的 HTTP 或 HTTPS 链接。');
  return url.href;
}
function linkHtml(value) {
  try {
    const link = httpLink(value);
    return link ? `<a class="text-button" href="${esc(link)}" target="_blank" rel="noopener noreferrer ugc">相关链接 ↗</a>` : '';
  } catch { return ''; }
}
function toast(message) {
  clearTimeout(toastTimer);
  const notice = $('#toast');
  notice.textContent=message;
  notice.classList.add('visible');
  toastTimer=setTimeout(()=>notice.classList.remove('visible'),3800);
}
function dialog(title, content) {
  const root=$('#dialog');
  root.innerHTML=`<button type="button" class="modal-close" data-action="close" aria-label="关闭">×</button><h2 id="dialogTitle">${esc(title)}</h2>${content}`;
  if (!root.open) root.showModal();
}
function options(values, selected) {
  return values.map(([value,label])=>`<option value="${esc(value)}"${value===selected?' selected':''}>${esc(label)}</option>`).join('');
}
async function checked(result) {
  const {data,error}=await result;
  if (error) throw error;
  return data;
}
async function loadPages(table, keys) {
  const records=[];
  for(let from=0;;from+=500) {
    let query=sb.from(table).select('*');
    for(const key of keys)query=query.order(key);
    const page=await checked(query.range(from,from+499));
    records.push(...page);
    if(page.length<500)return records;
  }
}
async function loadBoard() {
  const [maps,records,totals]=await Promise.all([
    checked(sb.from('mane_maps').select('id,name,section,edition,position,opens_at,active').eq('active',true)),
    loadPages('mane_leaderboard',['id']),
    loadPages('mane_carry_total_leaderboard',['section','edition','division','carry_key'])
  ]);
  state.maps=maps;
  state.maps.sort((a,b)=>b.edition.localeCompare(a.edition,'zh-CN',{numeric:true})||a.position-b.position||a.name.localeCompare(b.name,'zh-CN'));
  state.scores=records;
  state.totals=totals;
  state.ready=true;
  $('#notice').textContent='';
  render();
}
function activeMaps(section=state.section) {
  const maps=state.maps.filter(map=>map.section===section);
  return section==='new' ? maps.filter(map=>map.edition===maps[0]?.edition) : maps;
}
function isOpen(map) {
  return map && (!map.opens_at || Date.parse(map.opens_at)<=Date.now());
}
function renderSession() {
  $('#account').textContent=state.admin?'管理后台':state.session&&!state.session.user.is_anonymous?'账号':'管理员登录';
  $('#submitScore').disabled=!state.ready||!state.maps.some(isOpen);
}
function render() {
  renderSession();
  document.querySelectorAll('.nav-link').forEach(button=>button.classList.toggle('active',button.dataset.page===state.page));
  if(state.page==='submissions'){
    $('#filters').textContent='';
    $('#board').innerHTML='<div id="submissionProgress"></div>';
    mountSubmissionProgress($('#submissionProgress'),{
      client:sb,ownerId:state.session?.user.id,table:'mane_entries',columns:'map_id,division,team,carry,score',
      describe(row){
        const map=state.maps.find(item=>item.id===row.map_id);
        return {title:map?.name||'已隐藏地图',
          summary:`${divisions[row.division]} · 主 C · ${row.carry} · ${formatScore(row.score)} 分`};
      }
    });
    return;
  }
  const maps=activeMaps();
  if (!maps.some(map=>map.id===state.mapId)) state.mapId=maps[0]?.id||'';
  const map=maps.find(item=>item.id===state.mapId);
  const ranked=state.scores.filter(record=>record.map_id===state.mapId&&record.division===state.division).sort(compareScore);
  const names=new Map();
  for (const row of ranked) for (const name of carries(row.carry)) names.set(carryKey(name),name);
  if(!names.has(state.carry)) state.carry='';
  const buttons=Object.entries(sectionLabels).map(([key,label])=>
    `<button class="outline-button ${key===state.section?'selected':''}" aria-pressed="${key===state.section}" data-action="section" data-value="${key}">${label}</button>`).join('');
  $('#filters').innerHTML=`<div class="moderation-tabs mane-sections" role="group" aria-label="调查分类">${buttons}</div>`;
  const mapOptions=maps.map(item=>[item.id,item.section==='new'?item.name:`${item.name}${item.edition===maps[0]?.edition?'':` · ${item.edition}`}`]);
  const carryOptions=[['',names.size?'全部主 C':'暂无主 C 可选'],...[...names].sort((a,b)=>a[1].localeCompare(b[1],'zh-CN'))];
  $('#board').innerHTML=`<div class="board-wrap">
    <aside class="filter-panel">
      ${state.page==='scores'?`<label for="mapSelect" class="filter-label">调查对象</label><select id="mapSelect" class="version-select mane-select"${map?'':' disabled'}>${options(mapOptions,state.mapId)}</select>`:''}
      <label for="divisionSelect" class="filter-label">塑造分组</label><select id="divisionSelect" class="version-select mane-select">${options(Object.entries(divisions),state.division)}</select>
      ${state.page==='scores'?`<label for="carrySelect" class="filter-label">主 C 筛选</label><select id="carrySelect" class="version-select mane-select"${names.size?'':' disabled'}>${options(carryOptions,state.carry)}</select>`:''}
      <div class="filter-hint">${state.page==='totals'?'同一主 C 每图取所有配队中审核通过的最高分，再把各图分数相加。':'同图、同组、同队保留最高分。积分并列时按投稿时间排。'}</div>
      ${state.section==='rerun'?'<p class="minor">复刻目录参考 Wiki 往期首领。可挑战地图以游戏内「怪相档案」为准。</p>':''}
    </aside>
    ${state.page==='scores'?renderScores(map,ranked):renderTotals(state.section==='new'?maps[0]?.edition:'')}
  </div>`;
}
function renderScores(map, ranked) {
  const rows=ranked.map((record,index)=>({record,rank:index+1}))
    .filter(({record})=>!state.carry||carries(record.carry).some(name=>carryKey(name)===state.carry));
  return `<article class="board-panel"><div class="board-head"><div><h3>${esc(map?.name||'调查积分榜')}</h3>
    <p>${esc(sectionLabels[state.section])} · ${divisions[state.division]}${map?.opens_at?` · ${dateLabel(map.opens_at)} 开放`:''}</p></div>
    <span class="section-count">${rows.length} 条纪录</span></div>
    ${rows.length?`<div class="table-scroll"><table class="board-table"><thead><tr><th>名次</th><th>玩家</th><th>主 C / 队伍</th><th>调查积分</th></tr></thead><tbody>
    ${rows.map(({record,rank})=>`<tr><td><span class="rank-icon ${rank===1?'first':''}">${rank}</span></td>
    <td><span class="player-name">${esc(record.display_name)}</span></td><td><span class="map-meta">主 C · ${esc(record.carry)}</span>
    <div class="team-pills">${record.team.map(name=>`<span class="team-pill">${esc(name)}</span>`).join('')}</div>${linkHtml(record.related_url)}</td>
    <td class="score-number">${formatScore(record.score)}</td></tr>`).join('')}</tbody></table></div>`:
    `<div class="empty"><h3>${state.ready?'暂无审核通过的成绩':'正在加载成绩'}</h3>
    ${state.ready&&isOpen(map)?'<button class="gold-button" data-action="submit">投稿成绩</button>':''}</div>`}</article>`;
}
function renderTotals(edition) {
  const rows=state.totals.filter(row=>row.section===state.section&&row.edition===edition&&row.division===state.division)
    .map(row=>({...row,total:BigInt(row.total_score)})).sort((a,b)=>{
      if(a.total!==b.total)return a.total>b.total?-1:1;
      return b.map_count-a.map_count||a.carry_name.localeCompare(b.carry_name,'zh-CN')||a.carry_key.localeCompare(b.carry_key);
    });
  return `<article class="board-panel"><div class="board-head"><div><h3>主 C 总分榜</h3>
    <p>${sectionLabels[state.section]} · ${divisions[state.division]}</p></div></div>
    ${rows.length?`<div class="table-scroll"><table class="players-table"><thead><tr><th>名次</th><th>主 C</th><th>各图最高分</th><th>调查总分</th></tr></thead><tbody>
    ${rows.map((row,index)=>`<tr><td>${index+1}</td><td>${esc(row.carry_name)}</td><td>
    <details><summary>${row.map_count} 张</summary><ul>${row.map_scores.map(map=>`<li>${esc(map.name)} · ${formatScore(map.score)}<span class="map-meta">${esc(map.player)} · ${esc(map.team.join('、'))}</span></li>`).join('')}</ul></details></td>
    <td class="score-number">${formatScore(row.total)}</td></tr>`).join('')}</tbody></table></div>`:
    `<div class="empty"><h3>${state.ready?'暂无审核通过的成绩':'正在加载成绩'}</h3></div>`}</article>`;
}
function mapChoices(maps, selected) {
  return Object.entries(sectionLabels).map(([key,label])=>
    `<optgroup label="${label}">${options(maps.filter(map=>map.section===key).map(map=>[map.id,`${map.edition} · ${map.name}`]),selected)}</optgroup>`).join('');
}
function scoreFields(record, maps) {
  return `<div class="form-grid"><div class="field"><label for="entryMap">调查对象</label><select id="entryMap" name="map_id" required>${mapChoices(maps,record.map_id)}</select></div>
  <div class="field"><label for="entryDivision">塑造分组</label><select id="entryDivision" name="division">${options(Object.entries(divisions),record.division)}</select></div></div>
  <div class="form-grid"><div class="field"><label for="entryName">玩家昵称</label><input id="entryName" name="display_name" required minlength="2" maxlength="32" value="${esc(record.display_name)}"></div>
  <div class="field"><label for="entryScore">结算调查积分</label><input id="entryScore" name="score" required inputmode="numeric" placeholder="例如 30000000" value="${esc(record.score)}"></div></div>
  <div class="field"><label for="entryCarry">主 C</label><input id="entryCarry" name="carry" required maxlength="170" value="${esc(record.carry)}" placeholder="共同主 C 用 / 分隔"></div>
  <div class="field"><label for="entryTeam">上阵配队</label><textarea id="entryTeam" name="team" required maxlength="170" placeholder="1–4 名角色，用顿号分隔">${esc(record.team?.join('、'))}</textarea></div>
  <div class="field"><label for="entryLink">相关链接（选填）</label><input id="entryLink" name="related_url" type="url" maxlength="2048" value="${esc(record.related_url)}" placeholder="https://"></div>`;
}
function openSubmit() {
  const maps=state.maps.filter(isOpen);
  if (!state.ready||!maps.length) return;
  let nickname='';
  try { nickname=localStorage.getItem('mane-nickname')||''; } catch {}
  dialog('投稿鬃毛邮报成绩',`<form id="entryForm">${scoreFields({map_id:state.mapId,division:state.division,display_name:nickname},maps)}
    <div class="field"><label for="entryProof">结算截图</label><input id="entryProof" name="proof" type="file" accept="image/png,image/jpeg,image/webp" required>
    <span class="field-hint">PNG、JPG 或 WebP，最大 5 MB。截图仅本人及管理员可见。</span></div>
    ${contactField}
    <div class="form-actions"><button type="submit" class="gold-button">提交审核</button></div></form>`);
}
function readScore(fields) {
  const team=String(fields.get('team')).split(/[、，,;；\n]+/).map(name=>name.trim()).filter(Boolean);
  const names=carries(fields.get('carry'));
  const teamKeys=new Set(team.map(carryKey));
  const scoreText=String(fields.get('score')).trim().replace(/[,，]/g,'');
  const score=Number(scoreText);
  const display_name=String(fields.get('display_name')).trim();
  if(!Object.hasOwn(divisions,fields.get('division')))throw Error('请选择全 0 塑造或全满塑造。');
  if(display_name.length<2||display_name.length>32)throw Error('请填写 2–32 字的昵称。');
  if(team.length<1||team.length>4||teamKeys.size!==team.length||team.some(name=>name.length>40))throw Error('请填写 1–4 名不重复的上阵角色。');
  if(!names.length||new Set(names.map(carryKey)).size!==names.length||names.some(name=>!teamKeys.has(carryKey(name))))throw Error('主 C 必须包含在上阵配队中。');
  if(!/^\d+$/.test(scoreText)||!Number.isSafeInteger(score)||score<1)throw Error('请输入完整的正整数调查积分。');
  return {map_id:fields.get('map_id'),division:fields.get('division'),display_name,team,carry:names.join('/'),score,related_url:httpLink(fields.get('related_url'))||null};
}
async function submit(fields) {
  const record=readScore(fields);
  const proof=fields.get('proof');
  if (!proof?.size || !mimeTypes[proof.type] || proof.size>5*1024*1024) throw Error('请上传不超过 5 MB 的 PNG、JPG 或 WebP 截图。');
  const bitmap=await createImageBitmap(proof);
  bitmap.close();
  const {session}=state.session?{session:state.session}:await checked(sb.auth.signInAnonymously());
  if (!session) throw Error('建立投稿会话失败，请重试。');
  const player_id=session.user.id;
  const path=`${player_id}/${crypto.randomUUID()}.${mimeTypes[proof.type]}`;
  const bucket=sb.storage.from('mane-proofs');
  await checked(bucket.upload(path,proof,{contentType:proof.type}));
  try {
    const contact=String(fields.get('contact')??'').trim();
    await checked(sb.rpc('submit_mane_result',{p_record:{...record,evidence_path:path},p_contact:contact||null}));
  } catch(error) {
    await bucket.remove([path]);
    throw error;
  }
  try { localStorage.setItem('mane-nickname',record.display_name); } catch {}
  $('#dialog').close();
  state.session=session;
  if(state.page==='submissions')render();
  toast('已提交，可在「我的投稿」查看审核进度。');
}
const moderationFilters={tab:'',name:'',location:'',division:'',page:0};
async function openAdmin(status='pending') {
  if (!state.admin) return;
  if(status!==moderationFilters.tab){moderationFilters.tab=status;moderationFilters.page=0;}
  dialog('鬃毛邮报管理后台',`<div class="moderation-tabs">${Object.entries(statuses).map(([key,label])=>
    `<button class="outline-button ${key===status?'selected':''}" data-action="admin" data-value="${key}">${label}</button>`).join('')}
    <button class="outline-button" data-action="maps">地图管理</button></div><div id="reviewFilters"></div><div id="reviewList">正在读取…</div>`);
  const list=$('#reviewList');
  const maps=await checked(sb.from('mane_maps').select('id,name,edition,section,active').order('edition',{ascending:false}).order('position'));
  if (!list.isConnected) return;
  const mapNames=new Map();
  const groups=new Map();
  for(const map of maps){
    mapNames.set(map.id,map.name);
    const label=`${map.edition} · ${map.section==='new'?'新三图':'复刻旧图'}`;
    if(!groups.has(label))groups.set(label,[]);
    groups.get(label).push([map.id,map.active?map.name:`${map.name}（隐藏）`]);
  }
  $('#reviewFilters').innerHTML=moderationFilterFields(moderationFilters,'地图',[...groups]);
  let request=0;
  async function load(){
    const current=++request;
    list.textContent='正在读取投稿…';
    try{
      const base=sb.from('mane_entries').select('id,status,display_name,map_id,division,team,carry,score,evidence_path,created_at,updated_at,related_url,review_note,submission_contacts(contact)')
        .eq('status',status).is('archived_at',null);
      const result=await checked(filterModerationRows(base,moderationFilters,'map_id','division'));
      if(!list.isConnected||current!==request)return;
      if(!result.length&&moderationFilters.page>0){moderationFilters.page-=1;return load();}
      const rows=result.slice(0,moderationPageSize);
      list.innerHTML=rows.map(row=>{
        return `<article class="review-card">
          <div class="review-top"><strong>${esc(row.display_name)}</strong><span class="score-number">${formatScore(row.score)}</span></div>
          <div class="review-meta">${esc(mapNames.get(row.map_id)||'已隐藏地图')} · ${divisions[row.division]}<br>主 C · ${esc(row.carry)}<br>配队 · ${esc(row.team.join('、'))}</div>
          ${adminContact(row.submission_contacts)}
          ${linkHtml(row.related_url)}${row.status==='rejected'?`<p class="submission-reason"><strong>拒绝理由：</strong>${esc(row.review_note||'未记录')}</p>`:row.review_note?`<p class="minor">${esc(row.review_note)}</p>`:''}
          <div class="review-actions"><button class="outline-button" data-action="proof" data-id="${row.id}">查看截图</button>
          <button class="outline-button" data-action="edit" data-id="${row.id}">编辑成绩</button>
          ${status==='pending'?'<button class="approve" data-action="approve">审核通过</button><button class="reject" data-action="reject">拒绝</button>':''}
          ${status==='approved'?'<button class="reject" data-action="remove">撤下</button>':''}
          ${status==='rejected'?'<button class="approve" data-action="reopen-result">退回待审核</button><button class="reject" data-action="delete-rejected">删除</button>':''}</div>
          <div class="review-proof" role="status"></div></article>`;
      }).join('')||'<p class="minor">暂无符合条件的投稿。</p>';
      for(const [index,card] of Array.from(list.children).entries()){
        if(!rows[index])break;
        card.dataset.entry=rows[index].id;
        card.dataset.revision=rows[index].updated_at;
        card.dataset.status=status;
      }
      list.insertAdjacentHTML('beforeend',moderationPager(moderationFilters.page,result.length>moderationPageSize));
    }catch(error){if(list.isConnected&&current===request)list.textContent=`读取后台失败：${error.message}`;}
  }
  bindModerationFilters($('.moderation-filter'),list,moderationFilters,load);
  await load();
}
async function updateEntry(id, revision, patch) {
  const updated=await checked(sb.from('mane_entries').update(patch).eq('id',id).eq('updated_at',revision).select('id'));
  if(!updated.length)throw Error('成绩已被其他管理员更新，请重新打开。');
  await loadBoard();
}
async function showProof(id, container) {
  const row=await checked(sb.from('mane_entries').select('evidence_path').eq('id',id).single());
  const {signedUrl}=await checked(sb.storage.from('mane-proofs').createSignedUrl(row.evidence_path,120));
  container.innerHTML=`<img class="entry-proof" alt="结算截图" src="${esc(signedUrl)}">`;
}
async function openEdit(id) {
  const row=await checked(sb.from('mane_entries').select('*').eq('id',id).single());
  const maps=await checked(sb.from('mane_maps').select('*').order('position'));
  dialog('编辑成绩',`<form id="editForm" data-id="${row.id}" data-revision="${esc(row.updated_at)}" data-status="${esc(row.status)}">
    ${scoreFields(row,maps)}<div class="form-actions"><button type="submit" class="gold-button">保存成绩</button></div></form>`);
}
async function openMaps() {
  const maps=await checked(sb.from('mane_maps').select('*').order('edition',{ascending:false}).order('position'));
  dialog('地图管理',`<div class="moderation-tabs"><button class="outline-button" data-action="admin">返回审核</button></div>
    <form id="mapForm"><div class="form-grid">
    <div class="field"><label for="mapName">地图名称</label><input id="mapName" name="name" required maxlength="60"></div>
    <div class="field"><label for="edition">版本</label><input id="edition" name="edition" required maxlength="30" value="${esc(maps[0]?.edition||'4.1')}"></div>
    <div class="field"><label for="mapSection">分类</label><select id="mapSection" name="section">${options(Object.entries(sectionLabels),'new')}</select></div>
    <div class="field"><label for="mapPosition">显示顺序</label><input id="mapPosition" name="position" type="number" min="1" value="100" required></div></div>
    <div class="form-actions"><button type="submit" class="gold-button">新增地图</button></div></form>
    ${maps.map(map=>`<article class="review-card"><strong>${esc(map.name)}</strong><p class="review-meta">${esc(map.edition)} · ${sectionLabels[map.section]}</p>
    <button class="outline-button" data-action="toggle-map" data-id="${map.id}" data-value="${map.active}">${map.active?'隐藏地图':'恢复显示'}</button></article>`).join('')}`);
}
async function openAccount() {
  if(state.admin) return openAdmin();
  if(state.session&&!state.session.user.is_anonymous){
    dialog('站内账号','<p>当前账号未获得榜单审核权限。</p><button type="button" class="outline-button" data-action="signout">退出登录</button>');
    return;
  }
  dialog('管理员登录','<form id="loginForm"><div class="field"><label for="adminEmail">已授权邮箱</label><input id="adminEmail" name="email" type="email" required></div><p class="minor">在同一浏览器打开邮件登录链接，再返回本榜。</p><div class="form-actions"><button type="submit" class="gold-button">发送登录链接</button></div></form>');
}
async function syncSession(session) {
  const changed=state.session?.user.id!==session?.user.id;
  state.session=session;
  state.admin=false;
  if(session&&!session.user.is_anonymous)state.admin=Boolean(await checked(sb.rpc('is_admin')));
  if(changed&&state.page==='submissions')render();
  else renderSession();
}

document.addEventListener('click',async event=>{
  const button=event.target.closest('button');
  if(!button)return;
  const {page,action,value,id}=button.dataset;
  try {
    if (page){state.page=page;render();$('#scores').scrollIntoView({block:'start'});}
    if (button.id==='submitScore'||action==='submit')openSubmit();
    if (button.id==='account'&&sb)await openAccount();
    if (action==='section'){state.section=value;state.carry='';render();}
    if (action==='close')$('#dialog').close();
    if (action==='signout'){await checked(sb.auth.signOut());$('#dialog').close();}
    if (!state.admin)return;
    if (action==='admin')await openAdmin(value);
    if (action==='maps')await openMaps();
    if (action==='edit')await openEdit(id);
    if (action==='proof')await showProof(id,button.closest('.review-card').querySelector('.review-proof'));
    if (action==='reopen-result'&&!button.disabled){
      const {entry,revision}=button.closest('.review-card').dataset;
      button.disabled=true;
      try{
        await checked(sb.rpc('reopen_rejected_result',{p_board:'mane',p_id:entry,p_updated_at:revision}));
        await openAdmin('pending');
        toast('已退回待审核，可以编辑后重新审核。');
      }finally{button.disabled=false;}
      return;
    }
    if (action==='delete-rejected'&&!button.disabled&&window.confirm('删除这条已拒绝的成绩？')){
      const {entry,revision}=button.closest('.review-card').dataset;
      button.disabled=true;
      try{
        await checked(sb.rpc('mane_archive_rejected',{p_id:entry,p_updated_at:revision}));
        await openAdmin('rejected');
        toast('已删除这条成绩。');
      }finally{button.disabled=false;}
      return;
    }
    if (action==='toggle-map'){
      if (value==='true'&&!window.confirm('隐藏此地图和该地图的榜单？'))return;
      await checked(sb.from('mane_maps').update({active:value!=='true'}).eq('id',id));
      await loadBoard();
      await openMaps();
    }
    const decision={approve:'approved',reject:'rejected',remove:'removed'}[action];
    if(decision){
      const {entry,revision,status}=button.closest('.review-card').dataset;
      if(decision==='removed'&&!window.confirm('撤下这条成绩？'))return;
      const note=decision==='rejected'?askRejectionReason(toast):null;
      if(decision==='rejected'&&note===null)return;
      await updateEntry(entry,revision,{status:decision,review_note:note});
      await openAdmin(status);
    }
  }catch(error){toast(error.message||'操作未完成，请重试。');}
});
document.addEventListener('change',event=>{
  const {id,value}=event.target;
  if(id==='mapSelect'){state.mapId=value;state.carry='';}
  else if(id==='divisionSelect'){state.division=value;state.carry='';}
  else if(id==='carrySelect')state.carry=value;
  else return;
  render();
  document.getElementById(id)?.focus({preventScroll:true});
});
document.addEventListener('submit',async event=>{
  const form=event.target;
  event.preventDefault();
  const button=form.querySelector('button[type=submit]');
  if(!button||button.disabled)return;
  button.disabled=true;
  const fields=new FormData(form);
  try {
    if(form.id==='entryForm')await submit(fields);
    if(form.id==='editForm' && state.admin){
      await updateEntry(form.dataset.id,form.dataset.revision,readScore(fields));
      await openAdmin(form.dataset.status);
      toast('成绩已保存。');
    }
    if(form.id==='mapForm' && state.admin){
      await checked(sb.from('mane_maps').insert({...Object.fromEntries(fields),position:Number(fields.get('position'))}));
      await loadBoard();
      await openMaps();
    }
    if(form.id==='loginForm'){
      await checked(sb.auth.signInWithOtp({email:String(fields.get('email')).trim(),options:{emailRedirectTo:new URL('./',location.href).href}}));
      $('#dialog').close();
      toast('请查收登录邮件。');
    }
  }catch(error){toast(error.message||'操作未完成，请重试。');}
  finally{button.disabled=false;}
});

render();
try {
  const {createClient}=await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
  const {supabaseUrl,supabaseAnonKey}=window.MANE_CONFIG;
  sb=createClient(supabaseUrl,supabaseAnonKey);
  const {session}=await checked(sb.auth.getSession());
  await Promise.all([loadBoard(),syncSession(session)]);
  sb.auth.onAuthStateChange((_event,next)=>setTimeout(()=>syncSession(next).catch(()=>toast('身份校验暂不可用。')),0));
}catch(error){
  $('#notice').className='notice error';
  $('#notice').textContent='榜单暂时无法连接，请刷新页面重试。';
  console.error(error);
}
