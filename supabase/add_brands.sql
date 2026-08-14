-- Run this once in Supabase SQL Editor to add the brands table for the
-- "Partnered Brands" carousel on the home page.
-- (schema.sql has also been updated so future fresh setups include this automatically.)

create table public.brands (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  logo_url text not null,
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create trigger brands_updated_at before update on public.brands
  for each row execute function update_updated_at();

alter table public.brands enable row level security;

create policy "Public read active brands" on public.brands for select using (true);
create policy "Admin all brands" on public.brands for all using (auth.role() = 'authenticated');
