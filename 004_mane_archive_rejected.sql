alter table public.mane_entries
  add column archived_at timestamptz,
  add constraint mane_entries_only_rejected_archive check (archived_at is null or status='rejected');

alter policy "Mane administrator reviews entries" on public.mane_entries
  using (archived_at is null and (select public.is_admin()))
  with check (archived_at is null and (select public.is_admin()));

create function public.mane_archive_rejected(p_id uuid, p_updated_at timestamptz)
returns void language plpgsql security definer set search_path='' as $$
begin
  if not (select public.is_admin()) then
    raise exception '只有管理员可以删除已拒绝的成绩。' using errcode='42501';
  end if;
  update public.mane_entries set archived_at=clock_timestamp()
  where id=p_id and status='rejected' and archived_at is null and updated_at=p_updated_at;
  if not found then
    raise exception '成绩状态已更新，请重新打开列表。';
  end if;
end;
$$;
revoke all on function public.mane_archive_rejected(uuid,timestamptz) from public,anon,authenticated;
grant execute on function public.mane_archive_rejected(uuid,timestamptz) to authenticated;
