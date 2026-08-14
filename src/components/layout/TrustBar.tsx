import { useEffect, useState } from 'react';
import { Star, Home, Award, Clock, CheckCircle, Users, Leaf, MapPin } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { PressLogo, TrustBarStat } from '../../types/database';

export const TRUST_BAR_ICONS = {
  star: Star,
  home: Home,
  award: Award,
  clock: Clock,
  check: CheckCircle,
  users: Users,
  leaf: Leaf,
  location: MapPin,
} as const;

export type TrustBarIconKey = keyof typeof TRUST_BAR_ICONS;

const TrustBar = () => {
  const [stats, setStats] = useState<TrustBarStat[]>([]);
  const [press, setPress] = useState<PressLogo[]>([]);

  useEffect(() => {
    supabase
      .from('trust_bar_stats')
      .select('*')
      .eq('active', true)
      .order('sort_order', { ascending: true })
      .then(({ data }) => setStats(data ?? []));

    supabase
      .from('press_logos')
      .select('*')
      .eq('active', true)
      .order('sort_order', { ascending: true })
      .then(({ data }) => setPress(data ?? []));
  }, []);

  if (stats.length === 0 && press.length === 0) return null;

  return (
    <section className="py-10 sm:py-12 border-t border-b border-oxford-blue/10 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {stats.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {stats.map((stat) => {
              const Icon = TRUST_BAR_ICONS[stat.icon as TrustBarIconKey] ?? Star;
              return (
                <div
                  key={stat.id}
                  className="flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.1em] text-gray-800 dark:text-gray-200 font-secondary"
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {stat.label}
                </div>
              );
            })}
          </div>
        )}

        {press.length > 0 && (
          <div className={stats.length > 0 ? 'mt-8 sm:mt-10' : ''}>
            <p className="text-center text-xs font-medium uppercase tracking-[0.25em] text-gray-400 dark:text-gray-500 mb-5">
              As Seen In
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
              {press.map((item) => {
                const logo = (
                  <img
                    src={item.logo_url}
                    alt={item.name}
                    className="h-6 sm:h-7 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 dark:invert dark:opacity-60 dark:hover:opacity-90"
                  />
                );
                return item.link_url ? (
                  <a key={item.id} href={item.link_url} target="_blank" rel="noopener noreferrer">
                    {logo}
                  </a>
                ) : (
                  <div key={item.id}>{logo}</div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TrustBar;
