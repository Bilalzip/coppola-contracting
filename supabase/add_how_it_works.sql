-- Run this once in Supabase SQL Editor to add the "How It Works" process
-- section: an eyebrow/heading/subheading intro plus a numbered list of
-- process steps, shown on the home page.
-- (schema.sql has also been updated so future fresh setups include this automatically.)

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

create trigger how_it_works_steps_updated_at before update on public.how_it_works_steps
  for each row execute function update_updated_at();

alter table public.how_it_works_steps enable row level security;

create policy "Public read active how it works steps" on public.how_it_works_steps for select using (true);
create policy "Admin all how it works steps" on public.how_it_works_steps for all using (auth.role() = 'authenticated');

-- The intro copy (eyebrow/heading/subheading) and the two CTA buttons reuse
-- the existing page_sections table so they're editable the same way as
-- every other page's heading/body text.
insert into public.page_sections (page_key, section_key, sort_order, label, heading, subheading, body, items)
values (
  'home', 'how_it_works', 4, 'How It Works',
  'A clear path from start to finish',
  'How It Works',
  'Clear steps, one dedicated team, and a transparent plan before anything goes into production.',
  '[
    {"label": "Get Your Estimate", "link": "/contact"},
    {"label": "See The Full Process", "link": "/custom-cabinetry"}
  ]'::jsonb
);

-- Seed 5 placeholder steps matching the reference layout (numbers/weeks are
-- placeholders — edit via Admin -> How It Works to match Coppola Home's
-- actual process and timeline before publishing).
insert into public.how_it_works_steps (step_number, phase_label, title, description, sort_order) values
  (1, 'WEEK 0 · DISCOVERY', 'Your first conversation', 'Get clarity on your project, budget, and what''s possible with a designer who can help you decide the right next step.', 0),
  (2, 'WEEKS 1-2 · DESIGN', 'Design your space', 'We bring your kitchen or bath to life with renderings, curated materials, and a complete plan we refine with you until it feels right.', 1),
  (3, 'WEEKS 3-4 · FINALIZE', 'Finalize your design', 'We''ll lock in your plan, pricing, and everything you need to move forward with confidence.', 2),
  (4, 'WEEKS 4-11 · PRODUCTION', 'Your project is built', 'We handle fabrication and quality checks with trusted Canadian manufacturing partners while keeping you updated along the way.', 3),
  (5, 'WEEK 12 · DELIVERY', 'Delivered and ready to install', 'Your cabinetry arrives fully assembled, and we''ll support your contractor or installer through the install.', 4);
