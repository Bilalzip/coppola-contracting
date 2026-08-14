-- Run this once in Supabase SQL Editor to add the "Trust Bar" section:
-- a row of stat/credential badges (e.g. star rating, projects completed)
-- plus an "As Seen In" press-logo row, shown on the home page.
-- (schema.sql has also been updated so future fresh setups include this automatically.)
--
-- No placeholder content is seeded here on purpose — these are public
-- credibility claims and must reflect Coppola Home's real numbers/press
-- mentions, entered by the client via Admin -> Home -> Trust Bar.

create table public.trust_bar_stats (
  id uuid default gen_random_uuid() primary key,
  icon text not null default 'star',
  label text not null,
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.press_logos (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  logo_url text not null,
  link_url text,
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create trigger trust_bar_stats_updated_at before update on public.trust_bar_stats
  for each row execute function update_updated_at();

create trigger press_logos_updated_at before update on public.press_logos
  for each row execute function update_updated_at();

alter table public.trust_bar_stats enable row level security;
alter table public.press_logos enable row level security;

create policy "Public read active trust bar stats" on public.trust_bar_stats for select using (true);
create policy "Admin all trust bar stats" on public.trust_bar_stats for all using (auth.role() = 'authenticated');

create policy "Public read active press logos" on public.press_logos for select using (true);
create policy "Admin all press logos" on public.press_logos for all using (auth.role() = 'authenticated');
