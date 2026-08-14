-- Run this once in Supabase SQL Editor to add the testimonials table.
-- (schema.sql has also been updated so future fresh setups include this automatically.)

create table public.testimonials (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  quote text not null,
  rating integer default 5 check (rating between 1 and 5),
  featured boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create trigger testimonials_updated_at before update on public.testimonials
  for each row execute function update_updated_at();

alter table public.testimonials enable row level security;

create policy "Public read testimonials" on public.testimonials for select using (true);
create policy "Admin all testimonials" on public.testimonials for all using (auth.role() = 'authenticated');
