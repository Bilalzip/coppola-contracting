import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { Brand } from '../../types/database';

interface BrandCarouselProps {
  /** Compact strip for the hero, without the full section chrome. */
  inline?: boolean;
}

const FALLBACK_BRANDS = Array.from({ length: 15 }, (_, i) => ({
  id: `fallback-${i + 1}`,
  name: `Brand ${i + 1}`,
  logo_url: `/assets/brands/brand${i + 1}.png`,
}));

const BrandCarousel = ({ inline = false }: BrandCarouselProps) => {
  const [brands, setBrands] = useState<Pick<Brand, 'id' | 'name' | 'logo_url'>[]>(FALLBACK_BRANDS);

  useEffect(() => {
    supabase
      .from('brands')
      .select('id, name, logo_url')
      .eq('active', true)
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) setBrands(data);
      });
  }, []);

  if (brands.length === 0) return null;

  const track = (
    <div className="group relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      <div
        className={`flex w-max animate-marquee items-center group-hover:[animation-play-state:paused] ${
          inline ? 'gap-10 sm:gap-14 py-2' : 'gap-8 sm:gap-10 md:gap-12 py-6'
        }`}
      >
        {[...brands, ...brands].map((brand, index) => (
          <div
            key={`${brand.id}-${index}`}
            className={`flex-shrink-0 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
              inline
                ? 'w-20 h-12 sm:w-24 sm:h-14 md:w-28 md:h-16'
                : 'w-24 h-16 sm:w-28 sm:h-18 md:w-32 md:h-20 lg:w-36 lg:h-22'
            }`}
          >
            <img
              src={brand.logo_url}
              alt={brand.name}
              className="max-w-full max-h-full object-contain transition-all duration-300"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (inline) {
    return (
      <div>
        <p className="text-center text-xs font-medium uppercase tracking-[0.25em] text-[#666] dark:text-[#a1a1a1]">
          Partnered Brands
        </p>
        <div className="mt-6">{track}</div>
      </div>
    );
  }

  return (
    <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden border-t border-b border-white/20 dark:border-gray-700/20">
      {/* Glassmorphism Background */}
      <div className="absolute inset-0 backdrop-blur-xl bg-gradient-to-br from-white/40 via-blue-50/30 to-white/40 dark:from-gray-900/40 dark:via-blue-950/20 dark:to-gray-900/40"></div>

      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent dark:from-transparent dark:via-blue-950/10 dark:to-transparent"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-12">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-gray-900 dark:text-white font-serif mb-3">
              Partnered Brands
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-['Poppins',sans-serif]">
              Collaborating with industry-leading manufacturers to bring you premium quality products
            </p>
          </div>
        </div>

        {/* Carousel */}
        {track}
      </div>
    </section>
  );
};

export default BrandCarousel;
