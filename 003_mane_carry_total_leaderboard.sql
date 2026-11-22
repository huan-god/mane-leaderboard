create view public.mane_carry_total_leaderboard with (security_invoker=true) as
with candidates as (
  select e.id,e.map_id,e.division,e.score,e.created_at,e.display_name,e.team,
    m.section,m.edition,m.position,m.name as map_name,
    btrim(c.name) as carry_name,lower(btrim(normalize(c.name,NFKC))) as carry_key
  from public.mane_entries e
  join public.mane_maps m on m.id=e.map_id
  cross join lateral regexp_split_to_table(e.carry,'[/／、]') as c(name)
  where e.status='approved' and m.active and btrim(c.name)<>''
), best_per_map as (
  select distinct on (carry_key,division,map_id) *
  from candidates
  order by carry_key,division,map_id,score desc,created_at,id
)
select section,case when section='new' then edition else '' end as edition,
  division,carry_key,min(carry_name) as carry_name,
  sum(score)::text as total_score,count(*)::integer as map_count,
  jsonb_agg(jsonb_build_object('name',map_name,'score',score::text,'player',display_name,'team',team)
    order by edition desc,position,map_name,map_id) as map_scores
from best_per_map
group by section,case when section='new' then edition else '' end,division,carry_key;

grant select on public.mane_carry_total_leaderboard to anon,authenticated;
