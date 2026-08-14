-- Run this once in Supabase SQL Editor to let the admin manage the list of
-- email addresses that receive lead notifications, instead of a single
-- address hardcoded in the notify-lead edge function.
-- (schema.sql has also been updated so future fresh setups include this automatically.)

alter table public.site_settings
  add column if not exists notification_emails text[] not null default '{}';

-- Seed with the current hardcoded recipient so nothing changes until edited.
update public.site_settings
set notification_emails = array['info@coppolahome.ca']
where id = true and notification_emails = '{}';
