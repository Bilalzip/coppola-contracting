import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import type { PageSection } from '../types/database';

/**
 * Fetches editable content for a page (Admin -> Appearance) and returns a
 * getter that falls back to the hardcoded default if a section hasn't been
 * customized (or the table isn't seeded) yet, so pages never render blank.
 */
export function usePageSections(pageKey: string) {
  const [sections, setSections] = useState<Record<string, PageSection>>({});

  useEffect(() => {
    supabase
      .from('page_sections')
      .select('*')
      .eq('page_key', pageKey)
      .then(({ data }) => {
        const map: Record<string, PageSection> = {};
        for (const row of data ?? []) map[row.section_key] = row;
        setSections(map);
      });
  }, [pageKey]);

  function section(
    sectionKey: string,
    fallback: {
      heading?: string;
      subheading?: string;
      body?: string;
      image_url?: string;
      video_url?: string;
      heading_color?: string;
      subheading_color?: string;
      body_color?: string;
      items?: unknown[];
    } = {}
  ) {
    const row = sections[sectionKey];
    return {
      heading: row?.heading ?? fallback.heading ?? '',
      subheading: row?.subheading ?? fallback.subheading ?? '',
      body: row?.body ?? fallback.body ?? '',
      image_url: row?.image_url ?? fallback.image_url ?? '',
      video_url: row?.video_url ?? fallback.video_url ?? '',
      heading_color: row?.heading_color ?? fallback.heading_color ?? '',
      subheading_color: row?.subheading_color ?? fallback.subheading_color ?? '',
      body_color: row?.body_color ?? fallback.body_color ?? '',
      items: (row?.items?.length ? row.items : fallback.items) ?? [],
    };
  }

  return { section };
}
