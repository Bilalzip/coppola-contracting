-- Products table
create table public.products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text unique not null,
  category text not null check (category in ('vanity','quartz','faucet','mirror','sink','toilet','flooring','lighting','hardware')),
  brand text,
  description text,
  short_description text,
  specs jsonb default '[]'::jsonb,
  tags text[] default '{}',
  in_stock boolean default true,
  is_catalogue boolean default true,
  price numeric,
  stock_quantity integer,
  images text[] default '{}',
  filters jsonb default '{}'::jsonb,
  featured boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Leads table
create table public.leads (
  id uuid default gen_random_uuid() primary key,
  type text not null check (type in ('contact','quote')),
  name text not null,
  email text not null,
  phone text,
  message text,
  project_type text,
  timeline text,
  budget text,
  address text,
  preferred_contact text,
  status text default 'new' check (status in ('new','read','replied')),
  created_at timestamptz default now()
);

-- Gallery table
create table public.gallery (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  images text[] default '{}',
  category text,
  featured boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Testimonials table
create table public.testimonials (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  quote text not null,
  rating integer default 5 check (rating between 1 and 5),
  featured boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Partnered brand logos shown in the home page marquee
create table public.brands (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  logo_url text not null,
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Home page "Trust Bar": credential stat badges + "As Seen In" press logos.
-- No content seeded here on purpose — these are public claims and must
-- reflect real numbers/press mentions, entered via Admin -> Home -> Trust Bar.
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

-- Home page "How It Works" process steps. The intro copy for this section
-- (eyebrow/heading/subheading + 2 CTA buttons) lives in page_sections under
-- page_key='home', section_key='how_it_works'.
create table public.how_it_works_steps (
  id uuid default gen_random_uuid() primary key,
  step_number integer not null,
  phase_label text not null,
  title text not null,
  description text not null,
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Site settings (singleton row of shared business info: contact, hours, socials)
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
  -- Recipients for contact/quote form lead notification emails, managed
  -- from Admin -> Settings instead of hardcoded in the notify-lead function.
  notification_emails text[] not null default '{}',
  updated_at timestamptz default now(),
  constraint site_settings_singleton check (id)
);

insert into public.site_settings (id, phone, email, address_line1, address_line2, hours, hours_note, notification_emails)
values (
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
  array['info@coppolahome.ca']
);

-- Editable page content (Admin -> Appearance). One row per section of a
-- page; `items` holds repeating card/bullet data where a section needs it.
-- Seed data (matching current on-site copy) lives in supabase/add_page_sections.sql
-- since it's long — run that file after this one on a fresh setup.
create table public.page_sections (
  id uuid default gen_random_uuid() primary key,
  page_key text not null,
  section_key text not null,
  sort_order integer not null default 0,
  label text not null,
  heading text,
  subheading text,
  body text,
  image_url text,
  video_url text,
  heading_color text,
  subheading_color text,
  body_color text,
  items jsonb not null default '[]'::jsonb,
  updated_at timestamptz default now(),
  unique (page_key, section_key)
);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger products_updated_at before update on public.products
  for each row execute function update_updated_at();

create trigger gallery_updated_at before update on public.gallery
  for each row execute function update_updated_at();

create trigger testimonials_updated_at before update on public.testimonials
  for each row execute function update_updated_at();

create trigger brands_updated_at before update on public.brands
  for each row execute function update_updated_at();

create trigger trust_bar_stats_updated_at before update on public.trust_bar_stats
  for each row execute function update_updated_at();

create trigger press_logos_updated_at before update on public.press_logos
  for each row execute function update_updated_at();

create trigger how_it_works_steps_updated_at before update on public.how_it_works_steps
  for each row execute function update_updated_at();

create trigger site_settings_updated_at before update on public.site_settings
  for each row execute function update_updated_at();

create trigger page_sections_updated_at before update on public.page_sections
  for each row execute function update_updated_at();

-- Enable RLS
alter table public.products enable row level security;
alter table public.leads enable row level security;
alter table public.gallery enable row level security;
alter table public.testimonials enable row level security;
alter table public.brands enable row level security;
alter table public.trust_bar_stats enable row level security;
alter table public.press_logos enable row level security;
alter table public.how_it_works_steps enable row level security;
alter table public.site_settings enable row level security;
alter table public.page_sections enable row level security;

-- Public read for products, gallery, testimonials, brands, trust bar, press logos, how-it-works steps, site settings, and page sections (the main site needs to read these)
create policy "Public read products" on public.products for select using (true);
create policy "Public read gallery" on public.gallery for select using (true);
create policy "Public read testimonials" on public.testimonials for select using (true);
create policy "Public read active brands" on public.brands for select using (true);
create policy "Public read active trust bar stats" on public.trust_bar_stats for select using (true);
create policy "Public read active press logos" on public.press_logos for select using (true);
create policy "Public read active how it works steps" on public.how_it_works_steps for select using (true);
create policy "Public read site settings" on public.site_settings for select using (true);
create policy "Public read page sections" on public.page_sections for select using (true);

-- Public insert for leads (contact/quote forms)
create policy "Public insert leads" on public.leads for insert with check (true);

-- Authenticated (admin) full access
create policy "Admin all products" on public.products for all using (auth.role() = 'authenticated');
create policy "Admin all leads" on public.leads for all using (auth.role() = 'authenticated');
create policy "Admin all gallery" on public.gallery for all using (auth.role() = 'authenticated');
create policy "Admin all testimonials" on public.testimonials for all using (auth.role() = 'authenticated');
create policy "Admin all brands" on public.brands for all using (auth.role() = 'authenticated');
create policy "Admin all trust bar stats" on public.trust_bar_stats for all using (auth.role() = 'authenticated');
create policy "Admin all press logos" on public.press_logos for all using (auth.role() = 'authenticated');
create policy "Admin all how it works steps" on public.how_it_works_steps for all using (auth.role() = 'authenticated');
create policy "Admin update site settings" on public.site_settings for update using (auth.role() = 'authenticated');
create policy "Admin all page sections" on public.page_sections for all using (auth.role() = 'authenticated');
