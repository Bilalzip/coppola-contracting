-- Run this once in Supabase SQL Editor to add the site_settings table.
-- (schema.sql has also been updated so future fresh setups include this automatically.)

create table public.site_settings (
  id boolean primary key default true,
  phone text not null default '',
  email text not null default '',
  address_line1 text not null default '',
  address_line2 text not null default '',
  hours jsonb not null default '[]'::jsonb,
  hours_note text not null default '',
  facebook_url text,
  instagram_url text,
  linkedin_url text,
  updated_at timestamptz default now(),
  constraint site_settings_singleton check (id)
);

-- Seed the single row with today's real values (consolidates the three
-- drifted copies that used to live in Footer/contactUs/CustomMillworkForm).
insert into public.site_settings (
  id, phone, email, address_line1, address_line2, hours, hours_note,
  facebook_url, instagram_url, linkedin_url
) values (
  true,
  '+1 (807) 345 9989',
  'info@coppolahome.ca',
  '269 Red River Rd, Suite 116 #1040',
  'Thunder Bay ON, P7B 1A9, Canada',
  '[
    {"days": "Mon – Fri", "time": "9:00 AM – 5:00 PM"},
    {"days": "Saturday", "time": "9:30 AM – 2:00 PM"},
    {"days": "Sunday", "time": "Closed"}
  ]'::jsonb,
  '*Closed on statutory holidays',
  null, null, null
);

create trigger site_settings_updated_at before update on public.site_settings
  for each row execute function update_updated_at();

alter table public.site_settings enable row level security;

create policy "Public read site settings" on public.site_settings for select using (true);
create policy "Admin update site settings" on public.site_settings for update using (auth.role() = 'authenticated');
