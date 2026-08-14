import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Product } from '../../types/database';

type CategoryId = Product['category'];
type FilterId = 'all' | CategoryId;

const filters: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'All Products' },
  { id: 'vanity', label: 'Vanities' },
  { id: 'quartz', label: 'Quartz' },
  { id: 'faucet', label: 'Faucets' },
  { id: 'mirror', label: 'Mirrors' },
  { id: 'sink', label: 'Sinks' },
  { id: 'toilet', label: 'Toilets' },
  { id: 'flooring', label: 'Flooring' },
];

// Listing route per product category — matches the routes in main.tsx.
const CATEGORY_ROUTE: Record<CategoryId, string> = {
  vanity: '/products/vanities',
  quartz: '/quartz-countertops',
  faucet: '/products/faucets',
  mirror: '/products/mirrors',
  sink: '/products/sinks',
  toilet: '/products/toilets',
  flooring: '/products/flooring',
  lighting: '/products/lighting',
  hardware: '/hardware',
};

const productHref = (product: Product) => `${CATEGORY_ROUTE[product.category]}/${product.slug}`;

const FeaturedCollections = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [active, setActive] = useState<FilterId>('all');
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase
      .from('products')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .then(({ data }) => setProducts(data ?? []));
  }, []);

  const visible = active === 'all' ? products : products.filter((product) => product.category === active);

  // One card plus its gap, so a click always lands on a card edge.
  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>('[data-card]');
    const step = card ? card.offsetWidth + 20 : track.clientWidth * 0.8;
    track.scrollBy({ left: step * direction, behavior: 'smooth' });
  };

  if (products.length === 0) return null;

  return (
    <section
      className="relative py-12 sm:py-16 md:py-20 transition-colors duration-300"
      aria-labelledby="featured-heading"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        <h2
          id="featured-heading"
          className="text-section-title font-normal text-gray-900 dark:text-white font-serif"
        >
          Featured
        </h2>
        <p className="mt-3 max-w-md text-caption text-gray-600 dark:text-gray-400 font-secondary leading-relaxed">
          Curated selection of luxury and high quality products and finishes from world-renowned
          manufacturers.
        </p>

        {/* Filters */}
        <div className="mt-8 sm:mt-10 flex flex-wrap justify-center gap-2 sm:gap-3">
          {filters
            .filter((filter) => filter.id === 'all' || products.some((p) => p.category === filter.id))
            .map((filter) => {
            const isActive = filter.id === active;

            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActive(filter.id)}
                aria-pressed={isActive}
                className={`group inline-flex items-center gap-2 rounded-full px-4 sm:px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] font-secondary transition-all duration-300 ${
                  isActive
                    ? 'bg-[#0a1128] text-white border border-transparent'
                    : 'bg-white/70 dark:bg-white/[0.04] text-gray-700 dark:text-gray-300 border border-oxford-blue/12 dark:border-white/10 hover:border-oxford-blue/35 dark:hover:border-white/25'
                }`}
              >
                {filter.label}
                {isActive && <ArrowRight className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </div>

        {/* Carousel */}
        <div className="relative mt-10 sm:mt-12">
          <div
            ref={trackRef}
            className="no-scrollbar flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2"
          >
            {visible.map((product) => (
              <Link
                key={product.id}
                data-card
                to={productHref(product)}
                aria-label={`View ${product.name}`}
                className="group block w-[240px] sm:w-[260px] flex-shrink-0 snap-start overflow-hidden rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] transition-all duration-500"
              >
                <div className="aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
                  {product.images[0] && (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-base font-normal text-gray-900 dark:text-white font-serif">
                    {product.name}
                  </h3>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-caption text-gray-600 dark:text-gray-400 font-secondary group-hover:text-[#001f54] dark:group-hover:text-[#0466c8] transition-colors">
                    <span className="relative">
                      View Collection
                      <span className="absolute left-0 -bottom-0.5 h-[1px] w-0 bg-current transition-all duration-300 group-hover:w-full" />
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Arrows sit outside the track so they never cover a card */}
          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Scroll featured collections left"
              className="w-10 h-10 rounded-full bg-white/70 dark:bg-white/[0.04] border border-oxford-blue/12 dark:border-white/10 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-[#0a1128] hover:text-white hover:border-transparent transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Scroll featured collections right"
              className="w-10 h-10 rounded-full bg-white/70 dark:bg-white/[0.04] border border-oxford-blue/12 dark:border-white/10 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-[#0a1128] hover:text-white hover:border-transparent transition-all duration-300"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
