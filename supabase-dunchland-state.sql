create table if not exists public.dunchland_state (
  id text primary key,
  state jsonb not null default '{}'::jsonb,
  save_slots jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.dunchland_state enable row level security;

drop policy if exists "dunchland_state_select_current" on public.dunchland_state;
drop policy if exists "dunchland_state_insert_current" on public.dunchland_state;
drop policy if exists "dunchland_state_update_current" on public.dunchland_state;

create policy "dunchland_state_select_current"
on public.dunchland_state
for select
to anon
using (id = 'current');

create policy "dunchland_state_insert_current"
on public.dunchland_state
for insert
to anon
with check (id = 'current');

create policy "dunchland_state_update_current"
on public.dunchland_state
for update
to anon
using (id = 'current')
with check (id = 'current');
