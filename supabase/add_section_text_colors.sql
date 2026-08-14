-- Run this once in Supabase SQL Editor to seed text colors for every page
-- section (extends the video/color columns added in
-- add_hero_video_and_colors.sql from a single hero to every section).
-- Values match what's currently on the live site, so nothing changes until
-- the client edits a color in Admin -> Appearance.

update public.page_sections set heading_color = '#FFFFFF', subheading_color = 'rgba(255,255,255,0.8)', body_color = 'rgba(255,255,255,0.7)'
  where page_key = 'home' and section_key = 'hero';
update public.page_sections set heading_color = '#111827', body_color = '#4B5563'
  where page_key = 'home' and section_key = 'collections_intro';
update public.page_sections set heading_color = '#111827', subheading_color = '#111827', body_color = '#4B5563'
  where page_key = 'home' and section_key = 'why_choose_intro';

update public.page_sections set heading_color = '#FFFFFF', subheading_color = 'rgba(255,255,255,0.9)', body_color = 'rgba(255,255,255,0.9)'
  where page_key = 'about' and section_key = 'hero';
update public.page_sections set heading_color = '#2C3539', subheading_color = '#5D6D74', body_color = '#2C3539'
  where page_key = 'about' and section_key = 'story';
update public.page_sections set heading_color = '#2C3539', subheading_color = '#5D6D74', body_color = '#5D6D74'
  where page_key = 'about' and section_key = 'values';
update public.page_sections set heading_color = '#2C3539', subheading_color = '#5D6D74'
  where page_key = 'about' and section_key = 'why_choose';

update public.page_sections set heading_color = '#FFFFFF', body_color = 'rgba(255,255,255,0.9)'
  where page_key = 'custom-cabinetry' and section_key = 'hero';
update public.page_sections set heading_color = '#1A1A1A', body_color = '#666666'
  where page_key = 'custom-cabinetry' and section_key in ('section_1', 'section_2', 'section_3', 'section_4', 'cta');

update public.page_sections set heading_color = '#1A1A1A', body_color = '#5D6D74'
  where page_key = 'our-expertise' and section_key = 'hero';

update public.page_sections set heading_color = '#111827', body_color = '#4B5563'
  where page_key = 'our-works' and section_key in ('hero', 'empty_state');

update public.page_sections set heading_color = '#111827', body_color = '#4B5563'
  where page_key = 'contact' and section_key = 'hero';

update public.page_sections set heading_color = '#2C3539', body_color = '#5D6D74'
  where page_key = 'get-quote' and section_key = 'hero';

update public.page_sections set heading_color = '#FFFFFF', body_color = 'rgba(255,255,255,0.9)'
  where page_key = 'products' and section_key = 'hero';
update public.page_sections set heading_color = '#111827', body_color = '#4B5563'
  where page_key = 'products' and section_key = 'cta';
