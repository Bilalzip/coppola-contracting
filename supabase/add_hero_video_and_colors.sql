-- Run this once in Supabase SQL Editor to add hero video + text color support.
-- (schema.sql has also been updated so future fresh setups include this automatically.)

alter table public.page_sections
  add column if not exists video_url text,
  add column if not exists heading_color text,
  add column if not exists subheading_color text,
  add column if not exists body_color text;

-- Public bucket for hero background videos, uploaded from Admin -> Appearance.
insert into storage.buckets (id, name, public)
values ('videos', 'videos', true)
on conflict (id) do nothing;

create policy "Public read videos" on storage.objects for select
  to public using (bucket_id = 'videos');

create policy "Admin upload videos" on storage.objects for insert
  to authenticated with check (bucket_id = 'videos');

create policy "Admin update videos" on storage.objects for update
  to authenticated using (bucket_id = 'videos');

create policy "Admin delete videos" on storage.objects for delete
  to authenticated using (bucket_id = 'videos');

-- Seed the Home hero row with the current video path and text colors, so
-- nothing changes on the live site until the client edits it.
update public.page_sections
set
  video_url = '/videos/coppola-contracting.mp4',
  heading_color = '#FFFFFF',
  subheading_color = 'rgba(255,255,255,0.8)',
  body_color = 'rgba(255,255,255,0.7)'
where page_key = 'home' and section_key = 'hero';
