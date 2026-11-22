const characterKey = name => String(name).normalize('NFKC').trim().toLowerCase();
const choicesFor = team => team.map(slot => slot.split(/[/／]/).map(name => name.trim()));

export function validateLineup(team) {
  if (team.length < 1 || team.length > 4) throw Error('请填写 1—4 个出战位置。');
  if (team.some(slot => Array.from(slot).length > 40)) throw Error('每个出战位置最多填写 40 个字符。');
  const slots = choicesFor(team);
  if (slots.filter(choices => choices.length > 1).length > 1) {
    throw Error('请将 / 备选填写在同一个出战位置。');
  }
  const names = slots.flat().map(characterKey);
  if (names.some(name => !name)) throw Error('请填写 / 两侧的角色名。');
  if (new Set(names).size !== names.length) throw Error('配队和备选里不能重复填写同一角色。');
}

export function canonicalTeam(team) {
  if (!Array.isArray(team)) return '';
  return team.map(characterKey).sort().join('|');
}
export function scopeKey(s) { return `${s.stage_id}::${s.group_code}::${canonicalTeam(s.team)}`; }
export function compareRecord(a,b) {
  return Number(a.rounds) - Number(b.rounds)
    || new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    || String(a.id).localeCompare(String(b.id));
}
export function chooseWinners(rows) {
  const map = new Map();
  for (const row of rows.filter(x => x.status === 'approved')) {
    let variants = [row.team];
    let opaque = Boolean(row.source_history_id) && row.team.length === 1;
    if (!opaque) {
      try { validateLineup(row.team); } catch { opaque = true; }
    }
    if (!opaque) {
      const slots = choicesFor(row.team);
      const flexible = slots.findIndex(choices => choices.length > 1);
      if (flexible >= 0) variants = slots[flexible].map(name => slots.map((choices,index) =>
        index === flexible ? name : choices[0]));
    }
    for (const displayed of variants) {
      const characters = opaque ? null : displayed.map(characterKey).sort();
      const key = JSON.stringify([row.stage_id, row.group_code, characters ?? canonicalTeam(displayed)]);
      const current = map.get(key);
      if (!current || compareRecord(row,current.row) < 0) map.set(key,{row,characters,displayed});
    }
  }
  const best = [...map.values()];
  const winners = new Map();
  for (const {row,characters,displayed} of best) {
    if (characters && best.some(other => other.characters &&
      other.row.stage_id === row.stage_id && other.row.group_code === row.group_code &&
      other.characters.length < characters.length && other.characters.every(name => characters.includes(name)))) continue;
    if (!winners.has(row.id)) winners.set(row.id,{row,choices:displayed.map(()=>new Set())});
    displayed.forEach((name,index)=>winners.get(row.id).choices[index].add(name));
  }
  return [...winners.values()].map(({row,choices})=>({...row,team:choices.map(names=>[...names].sort().join('/'))}))
    .sort(compareRecord);
}
export function playerRanking(rows, events) {
  const winners = chooseWinners(rows);
  const players = new Map();
  function ensure(id, name) {
    if (!players.has(id)) players.set(id, {player_id:id,display_name:name,historical_count:0,current_count:0});
    return players.get(id);
  }
  for (const r of rows) if (r.status === 'approved') ensure(r.player_id, r.display_name);
  for (const r of winners) ensure(r.player_id, r.display_name).current_count++;
  const validSubmissions = new Map(rows.filter(r=>r.status==='approved').map(r=>[r.id,r]));
  const seen = new Set();
  for (const ev of events) {
    const sub = validSubmissions.get(ev.submission_id);
    if (!sub) continue;
    const identity = `${ev.player_id}::${ev.stage_id}::${ev.group_code}::${ev.team_key}`;
    if (!seen.has(identity)) {seen.add(identity); ensure(ev.player_id, sub.display_name).historical_count++;}
  }
  return [...players.values()].sort((a,b)=>b.historical_count-a.historical_count||b.current_count-a.current_count||a.display_name.localeCompare(b.display_name,'zh-CN'));
}
