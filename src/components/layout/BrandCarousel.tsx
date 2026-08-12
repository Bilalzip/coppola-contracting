interface BrandCarouselProps {
  /** Compact strip for the hero, without the full section chrome. */
  inline?: boolean;
}

const brands = [
  { id: 1, name: 'Brand 1', logo: '/assets/brands/brand1.png' },
  { id: 2, name: 'Brand 2', logo: '/assets/brands/brand2.png' },
  { id: 3, name: 'Brand 3', logo: '/assets/brands/brand3.png' },
  { id: 4, name: 'Brand 4', logo: '/assets/brands/brand4.png' },
  { id: 5, name: 'Brand 5', logo: '/assets/brands/brand5.png' },
  { id: 6, name: 'Brand 6', logo: '/assets/brands/brand6.png' },
  { id: 7, name: 'Brand 7', logo: '/assets/brands/brand7.png' },
  { id: 8, name: 'Brand 8', logo: '/assets/brands/brand8.png' },
  { id: 9, name: 'Brand 9', logo: '/assets/brands/brand9.png' },
  { id: 10, name: 'Brand 10', logo: '/assets/brands/brand10.png' },
  { id: 11, name: 'Brand 11', logo: '/assets/brands/brand11.png' },
  { id: 12, name: 'Brand 12', logo: '/assets/brands/brand12.png' },
  { id: 13, name: 'Brand 13', logo: '/assets/brands/brand13.png' },
  { id: 14, name: 'Brand 14', logo: '/assets/brands/brand14.png' },
  { id: 15, name: 'Brand 15', logo: '/assets/brands/brand15.png' },
];

const BrandCarousel = ({ inline = false }: BrandCarouselProps) => {
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
              src={brand.logo}
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
