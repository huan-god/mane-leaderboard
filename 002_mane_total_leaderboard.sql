alter table public.mane_entries
  drop constraint mane_entries_division_check,
  add constraint mane_entries_division_check check (division in ('zero','max'));

create view public.mane_total_leaderboard with (security_invoker=true) as
with best_per_map as (
  select distinct on (e.player_id,e.division,e.map_id)
    e.player_id,e.division,e.map_id,e.display_name,e.score,e.created_at,e.id,
    m.section,m.edition,m.name,m.position
  from public.mane_entries e join public.mane_maps m on m.id=e.map_id
  where e.status='approved' and m.active
  order by e.player_id,e.division,e.map_id,e.score desc,e.created_at,e.id
)
select section, case when section='new' then edition else '' end as edition,
  division,player_id,
  (array_agg(display_name order by created_at desc,id))[1] as display_name,
  sum(score)::text as total_score, count(*)::integer as map_count,
  jsonb_agg(jsonb_build_object('name',name,'score',score::text)
    order by edition desc,position,name,map_id) as map_scores
from best_per_map
group by section,case when section='new' then edition else '' end,division,player_id;

grant select on public.mane_total_leaderboard to anon,authenticated;
