import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import type { SiteSettings } from '../types/database';

const FALLBACK: SiteSettings = {
  id: true,
  phone: '+1 (807) 345 9989',
  email: 'info@coppolahome.ca',
  address_line1: '269 Red River Rd, Suite 116 #1040',
  address_line2: 'Thunder Bay ON, P7B 1A9, Canada',
  hours: [
    { days: 'Mon – Fri', time: '9:00 AM – 5:00 PM' },
    { days: 'Saturday', time: '9:30 AM – 2:00 PM' },
    { days: 'Sunday', time: 'Closed' },
  ],
  hours_note: '*Closed on statutory holidays',
  facebook_url: null,
  instagram_url: null,
  linkedin_url: null,
  updated_at: '',
};

/** Shared business info (contact, hours, socials) — one row, editable in Admin → Settings. */
export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(FALLBACK);

  useEffect(() => {
    supabase
      .from('site_settings')
      .select('*')
      .eq('id', true)
      .single()
      .then(({ data }) => {
        if (data) setSettings(data as SiteSettings);
      });
  }, []);

  return settings;
}
