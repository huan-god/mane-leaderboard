-- Approved rows cannot be archived under mane_entries_only_rejected_archive.
-- Keep the public report within the existing anonymous column grants.
create or replace view public.mane_daily_scores with (security_invoker = true) as
select e.id, e.map_id, e.division, e.display_name, e.carry, e.team, e.score,
  e.created_at, e.approved_at, e.related_url
from public.mane_entries e
join public.mane_maps m on m.id = e.map_id
where e.status = 'approved' and m.active;
