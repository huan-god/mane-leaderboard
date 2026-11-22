-- Dedicated Mane's Bulletin data within the existing Supabase Auth project.
create table public.mane_maps (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(btrim(name)) between 1 and 60),
  section text not null check (section in ('new', 'rerun')),
  edition text not null check (char_length(btrim(edition)) between 1 and 30),
  position integer not null default 100 check (position > 0),
  opens_at timestamptz,
  active boolean not null default true,
  unique (edition, section, name)
);
create table public.mane_entries (
  id uuid primary key default gen_random_uuid(),
  player_id uuid not null references auth.users(id),
  map_id uuid not null references public.mane_maps(id),
  display_name text not null check (char_length(btrim(display_name)) between 2 and 32),
  division text not null check (division in ('zero','mixed','max')),
  team text[] not null check (public.is_valid_team(team)),
  team_key text generated always as (public.canonical_team(team)) stored,
  carry text not null check (public.team_has_carry(team,carry)),
  score bigint not null check (score between 1 and 9007199254740991),
  evidence_path text not null check (evidence_path like (player_id::text || '/%')),
  related_url text check (
    char_length(related_url) between 1 and 2048 and strpos(related_url,chr(92))=0
    and related_url ~ '^https?://[^/?#@[:space:][:cntrl:]]+([/?#][^[:space:][:cntrl:]]*)?$'
  ),
  status text not null default 'pending' check (status in ('pending','approved','rejected','removed')),
  created_at timestamptz not null default clock_timestamp(),
  updated_at timestamptz not null default clock_timestamp(),
  reviewed_by uuid references auth.users(id),
  review_note text check (char_length(review_note)<=200)
);
create index mane_entries_rank_idx
  on public.mane_entries (map_id,division,team_key,score desc,created_at,id) where status='approved';
create index mane_entries_player_idx on public.mane_entries(player_id);
create index mane_entries_evidence_idx on public.mane_entries(evidence_path);

alter table public.mane_maps enable row level security;
alter table public.mane_entries enable row level security;
revoke all on public.mane_maps,public.mane_entries from public, anon, authenticated;
grant select on public.mane_maps to anon, authenticated;
grant insert (name,section,edition,position,opens_at,active) on public.mane_maps to authenticated;
grant update (name,opens_at,position,active) on public.mane_maps to authenticated;
grant select (id,player_id,map_id,display_name,division,team,team_key,carry,score,status,created_at,related_url)
  on public.mane_entries to anon;
grant select on public.mane_entries to authenticated;
grant insert (player_id,map_id,display_name,division,team,carry,score,evidence_path,related_url)
  on public.mane_entries to authenticated;
grant update (map_id,display_name,division,team,carry,score,related_url,status,review_note)
  on public.mane_entries to authenticated;

create policy "Mane maps read" on public.mane_maps for select to anon,authenticated
  using (active or (select public.is_admin()));
create policy "Mane administrator adds maps" on public.mane_maps for insert to authenticated
  with check ((select public.is_admin()));
create policy "Mane administrator updates maps" on public.mane_maps for update to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()));
create policy "Mane entries read" on public.mane_entries for select to anon,authenticated
  using ((status='approved' and exists(select from public.mane_maps m where m.id=map_id and m.active))
    or player_id=(select auth.uid()) or (select public.is_admin()));
create policy "Mane players submit their own results" on public.mane_entries for insert to authenticated
  with check (player_id=(select auth.uid()) and status='pending'
    and exists (select from public.mane_maps m where m.id=map_id and m.active and (m.opens_at is null or m.opens_at<=now()))
    and exists (select from storage.objects o where o.bucket_id='mane-proofs' and o.name=evidence_path));
create policy "Mane administrator reviews entries" on public.mane_entries for update to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()));

create function flashback_private.mane_stamp_update() returns trigger
language plpgsql set search_path='' as $$
begin
  new.updated_at := clock_timestamp();
  new.reviewed_by := auth.uid();
  return new;
end;
$$;
revoke all on function flashback_private.mane_stamp_update() from public,anon,authenticated;
create trigger mane_stamp_update before update on public.mane_entries
for each row execute function flashback_private.mane_stamp_update();

create view public.mane_leaderboard with (security_invoker=true) as
select distinct on (e.map_id,e.division,e.team_key)
  e.id,e.player_id,e.map_id,e.display_name,e.division,e.team,e.carry,e.score,e.created_at,e.related_url
from public.mane_entries e join public.mane_maps m on e.map_id=m.id
where e.status='approved' and m.active
order by e.map_id,e.division,e.team_key,e.score desc,e.created_at,e.id;
grant select on public.mane_leaderboard to anon,authenticated;

insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('mane-proofs','mane-proofs',false,5242880,array['image/jpeg','image/png','image/webp']);
create policy "Mane upload own screenshots" on storage.objects for insert to authenticated
  with check (bucket_id='mane-proofs' and (storage.foldername(name))[1]=(select auth.uid())::text);
create policy "Mane read own screenshots or review" on storage.objects for select to authenticated
  using (bucket_id='mane-proofs' and owner_id=(select auth.uid())::text);
-- Other players' proofs are served through the short-lived signed Storage URL checked by this policy.
create policy "Mane administrator reads submitted screenshots" on storage.objects for select to authenticated
  using (bucket_id='mane-proofs' and (select public.is_admin()));
create policy "Mane remove own unattached upload" on storage.objects for delete to authenticated
  using (bucket_id='mane-proofs' and owner_id=(select auth.uid())::text
    and not exists (select from public.mane_entries e where e.evidence_path=name));

insert into public.mane_maps(name,section,edition,position,opens_at) values
  ('神话的遗闻','new','4.1',1,'2026-11-05 10:00+08'),
  ('思想的表观','new','4.1',2,'2026-11-12 05:00+08'),
  ('生命的饥馑','new','4.1',3,'2026-11-19 05:00+08');
insert into public.mane_maps(name,section,edition,position) values
  ('子弹的冬年','rerun','4.1',1),('急性猩红症·Ⅱ型','rerun','4.1',2),
  ('太阳的宠臣','rerun','4.1',3),('旧日的荣耀','rerun','4.1',4),
  ('自我同情者','rerun','4.1',5),('超限的囚徒·Ⅱ型','rerun','4.1',6),
  ('信仰的移位·Ⅱ型','rerun','4.1',7),('毁灭的履带','rerun','4.1',8),
  ('急性猩红症','rerun','4.1',9),('超限的囚徒','rerun','4.1',10),
  ('蜕化的残响','rerun','4.1',11),('信仰的移位','rerun','4.1',12);
