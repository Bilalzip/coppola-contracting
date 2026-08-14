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

-- Enable RLS
alter table public.products enable row level security;
alter table public.leads enable row level security;
alter table public.gallery enable row level security;
alter table public.testimonials enable row level security;

-- Public read for products, gallery, and testimonials (the main site needs to read these)
create policy "Public read products" on public.products for select using (true);
create policy "Public read gallery" on public.gallery for select using (true);
create policy "Public read testimonials" on public.testimonials for select using (true);

-- Public insert for leads (contact/quote forms)
create policy "Public insert leads" on public.leads for insert with check (true);

-- Authenticated (admin) full access
create policy "Admin all products" on public.products for all using (auth.role() = 'authenticated');
create policy "Admin all leads" on public.leads for all using (auth.role() = 'authenticated');
create policy "Admin all gallery" on public.gallery for all using (auth.role() = 'authenticated');
create policy "Admin all testimonials" on public.testimonials for all using (auth.role() = 'authenticated');
