import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';

type FilterId = 'all' | 'faucets' | 'sinks' | 'cabinets' | 'mirrors';

const filters: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'All Products' },
  { id: 'faucets', label: 'Faucets' },
  { id: 'sinks', label: 'Sinks' },
  { id: 'cabinets', label: 'Cabinets' },
  { id: 'mirrors', label: 'Mirrors' },
];

interface FeaturedItem {
  title: string;
  image: string;
  href: string;
  tags: FilterId[];
  external?: boolean;
}

const items: FeaturedItem[] = [
  {
    title: 'In Stock',
    image: '/assets/gallery/landing-header-carousel-image-9.png',
    href: '/in-stock',
    tags: [],
  },
  {
    title: 'Luxury Vanities',
    image:
      '/Images/products/vanities-images/james-martin-vanity/brittany-30-single-vanity-in-victory-blue-single-bathroom-vanity-james-martin-vanities-select-your-top-959063.webp',
    href: '/products/vanities',
    tags: ['cabinets'],
  },
  {
    title: 'Custom Cabinetry',
    image: '/assets/gallery/Screenshot 2025-12-27 101328.png',
    href: '/custom-cabinetry',
    tags: ['cabinets'],
  },
  {
    title: 'Outdoor Kitchens',
    image: '/assets/gallery/landing-header-carousel-image-5.png',
    href: 'https://q-boo.com/',
    tags: [],
    external: true,
  },
  {
    title: 'Hardware',
    image: '/assets/gallery/Screenshot 2025-12-27 100544.png',
    href: '/hardware',
    tags: [],
  },
  {
    title: 'Kitchen Faucets',
    image: '/assets/gallery/kitchen-faucets-card-image.avif',
    href: '/products/faucets/kitchen',
    tags: ['faucets'],
  },
  {
    title: 'Bathroom Faucets',
    image: '/assets/gallery/bathroom-faucets-card-image.avif',
    href: '/products/faucets/bathroom',
    tags: ['faucets'],
  },
  {
    title: 'Shower Sets',
    image: '/assets/gallery/Shower-set-card-image.webp',
    href: '/products/faucets/shower',
    tags: ['faucets'],
  },
  {
    title: 'Kitchen Sinks',
    image: '/assets/gallery/kitchen-sink-card-image.avif',
    href: '/products/sinks/kitchen',
    tags: ['sinks'],
  },
  {
    title: 'Bathroom Sinks',
    image: '/assets/gallery/bathroom-sink-card-image.avif',
    href: '/products/sinks/bathroom',
    tags: ['sinks'],
  },
  {
    title: 'Undermount Sinks',
    image: '/assets/gallery/undermount-sink-card-image.avif',
    href: '/products/sinks/undermount',
    tags: ['sinks'],
  },
  {
    title: 'Vessel Sinks',
    image: '/assets/gallery/vesel-sink-card-image.avif',
    href: '/products/sinks/vessel',
    tags: ['sinks'],
  },
  {
    title: 'Modern Mirrors',
    image: '/assets/gallery/mirros-page-morder-card.webp',
    href: '/products/mirrors/modern',
    tags: ['mirrors'],
  },
  {
    title: 'Timeless Mirrors',
    image: '/assets/gallery/mirror-page-timeless-card.webp',
    href: '/products/mirrors/timeless',
    tags: ['mirrors'],
  },
  {
    title: 'Contemporary Mirrors',
    image: '/assets/gallery/mirror-page-seemless-contemporary-card.webp',
    href: '/products/mirrors/contemporary',
    tags: ['mirrors'],
  },
  {
    title: 'Custom Millwork',
    image: '/assets/gallery/Screenshot 2025-12-27 101500.png',
    href: '/commercial-millwork',
    tags: [],
  },
];

const FeaturedCollections = () => {
  const [active, setActive] = useState<FilterId>('all');
  const trackRef = useRef<HTMLDivElement>(null);

  const visible = active === 'all' ? items : items.filter((item) => item.tags.includes(active));

  // One card plus its gap, so a click always lands on a card edge.
  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>('[data-card]');
    const step = card ? card.offsetWidth + 20 : track.clientWidth * 0.8;
    track.scrollBy({ left: step * direction, behavior: 'smooth' });
  };

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
          {filters.map((filter) => {
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
            {visible.map((item) => {
              const inner = (
                <>
                  <div className="aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-base font-normal text-gray-900 dark:text-white font-serif">
                      {item.title}
                    </h3>
                    <span className="mt-2 inline-flex items-center gap-1.5 text-caption text-gray-600 dark:text-gray-400 font-secondary group-hover:text-[#001f54] dark:group-hover:text-[#0466c8] transition-colors">
                      <span className="relative">
                        View Collection
                        <span className="absolute left-0 -bottom-0.5 h-[1px] w-0 bg-current transition-all duration-300 group-hover:w-full" />
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </>
              );

              const cardClass =
                'group block w-[240px] sm:w-[260px] flex-shrink-0 snap-start overflow-hidden rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] transition-all duration-500';

              return item.external ? (
                <a
                  key={item.title}
                  data-card
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${item.title} collection`}
                  className={cardClass}
                >
                  {inner}
                </a>
              ) : (
                <Link
                  key={item.title}
                  data-card
                  to={item.href}
                  aria-label={`View ${item.title} collection`}
                  className={cardClass}
                >
                  {inner}
                </Link>
              );
            })}
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
