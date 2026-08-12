import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Testimonials from '../components/layout/Testimonials';
import Button from '../components/ui/Button';
import BrandCarousel from '../components/layout/BrandCarousel';
import FeaturedCollections from '../components/layout/FeaturedCollections';
import SplitText from '../components/ui/SplitText';

gsap.registerPlugin(ScrollTrigger);

/** Collection cards point at either an app route or an outside site. */
const CollectionLink = ({
  to,
  external,
  label,
  children,
}: {
  to: string;
  external?: boolean;
  label: string;
  children: React.ReactNode;
}) =>
  external ? (
    <a href={to} target="_blank" rel="noopener noreferrer" aria-label={label} className="block h-full">
      {children}
    </a>
  ) : (
    <Link to={to} aria-label={label} className="block h-full">
      {children}
    </Link>
  );

const Home = () => {
  const navigate = useNavigate();
  // ============================================
  // STATE AND REFS
  // ============================================
  const leftCarouselRef = useRef<HTMLDivElement>(null);
  const rightCarouselRef = useRef<HTMLDivElement>(null);
  const carouselStageRef = useRef<HTMLDivElement>(null);
  const collectionsSectionRef = useRef<HTMLElement>(null);
  const collectionsHeaderRef = useRef<HTMLDivElement>(null);
  const collectionsLargeCardRef = useRef<HTMLDivElement>(null);
  const collectionsSmallCardsRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const whyChooseSectionRef = useRef<HTMLElement>(null);

  // ============================================
  // DATA
  // ============================================

  const carouselImages = [
    '/assets/gallery/landing-header-carousel-image-1.webp',
    '/assets/gallery/landing-header-carousel-image-2.webp',
    '/assets/gallery/landing-header-carousel-image-3.png',
    '/assets/gallery/landing-header-carousel-image-4.png',
    '/assets/gallery/landing-header-carousel-image-5.png',
    '/assets/gallery/landing-header-carousel-image-6.webp',
    '/assets/gallery/landing-header-carousel-image-7.webp',
    '/assets/gallery/landing-header-carousel-image-8.avif',
    '/assets/gallery/landing-header-carousel-image-9.png',
    '/assets/gallery/landing-header-carousel-image-10.jpg',
  ];

  // ============================================
  // HERO CAROUSEL ANIMATION EFFECT
  // ============================================

  useEffect(() => {
    const stage = carouselStageRef.current;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let leftAnimationId: number;
    let rightAnimationId: number;
    let leftScrollPos = 0;
    let rightScrollPos = 0;
    let paused = prefersReducedMotion;

    // The two columns travel in opposite directions at different rates, which
    // is what separates them into distinct parallax planes.
    const leftSpeed = 1.2;
    const rightSpeed = 0.75;

    const animateLeftCarousel = () => {
      if (leftCarouselRef.current && !paused) {
        leftScrollPos += leftSpeed;
        const maxScroll = leftCarouselRef.current.scrollHeight / 2;

        if (leftScrollPos >= maxScroll) {
          leftScrollPos = 0;
        }

        leftCarouselRef.current.scrollTop = leftScrollPos;
      }
      leftAnimationId = requestAnimationFrame(animateLeftCarousel);
    };

    const animateRightCarousel = () => {
      if (rightCarouselRef.current && !paused) {
        rightScrollPos += rightSpeed;
        const maxScroll = rightCarouselRef.current.scrollHeight / 2;

        if (rightScrollPos >= maxScroll) {
          rightScrollPos = 0;
        }

        rightCarouselRef.current.scrollTop = maxScroll - rightScrollPos;
      }
      rightAnimationId = requestAnimationFrame(animateRightCarousel);
    };

    leftAnimationId = requestAnimationFrame(animateLeftCarousel);
    rightAnimationId = requestAnimationFrame(animateRightCarousel);

    const handleMouseEnter = () => { paused = true; };
    const handleMouseLeave = () => { paused = prefersReducedMotion; };

    stage?.addEventListener('mouseenter', handleMouseEnter);
    stage?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(leftAnimationId);
      cancelAnimationFrame(rightAnimationId);
      stage?.removeEventListener('mouseenter', handleMouseEnter);
      stage?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // ============================================
  // COLLECTIONS SECTION GSAP ANIMATIONS
  // ============================================

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(collectionsHeaderRef.current,
        { opacity: 0, y: 50 },
        {
          scrollTrigger: {
            trigger: collectionsHeaderRef.current,
            start: 'top 90%',
            end: 'top 60%',
            toggleActions: 'play none none reverse',
            fastScrollEnd: true,
            preventOverlaps: true,
          },
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
        }
      );

      gsap.fromTo(collectionsLargeCardRef.current,
        { opacity: 0, x: -100 },
        {
          scrollTrigger: {
            trigger: collectionsLargeCardRef.current,
            start: 'top 90%',
            end: 'top 60%',
            toggleActions: 'play none none reverse',
            fastScrollEnd: true,
            preventOverlaps: true,
          },
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
        }
      );

      const smallCards = document.querySelectorAll('.collection-small-card');
      smallCards.forEach((card, index) => {
        const isMobile = window.innerWidth < 640;
        const fromX = isMobile ? (index % 2 === 0 ? -100 : 100) : 0;

        gsap.fromTo(card,
          { opacity: 0, x: fromX, y: isMobile ? 0 : 50 },
          {
            scrollTrigger: {
              trigger: card,
              start: 'top 95%',
              end: 'top 70%',
              toggleActions: 'play none none reverse',
              fastScrollEnd: true,
              preventOverlaps: true,
            },
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1,
            ease: 'power3.out',
          }
        );
      });
    }, collectionsSectionRef);

    return () => ctx.revert();
  }, []);



  // ============================================
  // COLLECTIONS DATA
  // ============================================

  const collections = [
    {
      id: 'custom-cabinetry',
      category: 'Custom Cabinetry',
      title: 'Custom Cabinetry',
      description: 'Precision-engineered cabinetry designed to maximize space and style in every room.',
      image: '/assets/gallery/Screenshot 2025-12-27 101328.png',
      size: 'large',
      buttons: ['View', 'Learn'],
      link: '/custom-cabinetry',
    },
    {
      id: 'quartz-countertops',
      category: 'Quartz Countertops',
      description: 'Functional design meets sophistication',
      image: '/Images/products/quartz-countertops/RW_Calacatta-Supreme_MARS_RED_MOCKUP.webp',
      loading: 'eager',
      size: 'small',
      link: '/quartz-countertops',
    },
    {
      id: 'bespoke-millwork',
      category: 'Custom Millwork',
      description: 'Precision engineering for every space',
      image: '/assets/gallery/Screenshot 2025-12-27 101500.png',
      loading: 'eager',
      size: 'small',
      link: '/commercial-millwork',
    },
    {
      id: 'outdoor-kitchens',
      category: 'Outdoor Kitchens',
      description: 'Durable surfaces for modern living',
      image: '/assets/gallery/landing-header-carousel-image-5.png',
      loading: 'eager',
      size: 'small',
      // Matches the navbar: outdoor kitchens live on the Q-Boo site. The
      // internal /outdoor-kitchens route is only a shim that bounces home.
      link: 'https://q-boo.com/',
      external: true,
    },
    {
      id: 'vanities',
      category: 'Bathroom Vanities',
      description: 'Bespoke craftsmanship for discerning homes',
      image: '/Images/products/vanities-images/james-martin-vanity/brittany-30-single-vanity-in-victory-blue-single-bathroom-vanity-james-martin-vanities-select-your-top-959063.webp',
      loading: 'eager',
      size: 'small',
      link: '/products/vanities',
    },
  ];


  // ============================================
  // WHY CHOOSE SERVICES DATA
  // ============================================

  // Fan geometry, outermost cards tilted and dropped furthest so the pair in
  // the middle reads as the front of the stack. Flat below the sm breakpoint.
  const whyChooseFan = [
    { tilt: 'sm:-rotate-[9deg] sm:translate-y-8 sm:scale-[0.9]', z: 'z-10' },
    { tilt: 'sm:-rotate-[3deg] sm:translate-y-1 sm:scale-[0.97]', z: 'z-20' },
    { tilt: 'sm:rotate-[3deg] sm:translate-y-1 sm:scale-[0.97]', z: 'z-20' },
    { tilt: 'sm:rotate-[9deg] sm:translate-y-8 sm:scale-[0.9]', z: 'z-10' },
  ];

  const whyChooseFeatures = [
    {
      category: 'Luxury',
      title: 'Unparalleled design sophistication',
      description: 'Elevating spaces with meticulous attention to detail.',
      image: 'https://images.pexels.com/photos/6585757/pexels-photo-6585757.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '/our-expertise'
    },
    {
      category: 'Bespoke',
      title: 'Custom solutions for unique spaces',
      description: 'Tailored designs that reflect your individual style.',
      image: 'https://images.pexels.com/photos/6585755/pexels-photo-6585755.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '/custom-cabinetry'
    },
    {
      category: 'Expertise',
      title: 'Decades of craftsmanship',
      description: 'Proven techniques and innovative approaches.',
      image: 'https://images.pexels.com/photos/5691608/pexels-photo-5691608.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '/our-expertise'
    },
    {
      category: 'Showroom',
      title: 'Immersive design experience',
      description: 'Visualize your dream space with our expert consultations.',
      image: 'https://images.pexels.com/photos/6585761/pexels-photo-6585761.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '/contact'
    }
  ];

  return (
    <>
      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 transition-colors duration-300">

        <div className="relative w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 xl:gap-20 items-center">
            {/* Left Content - Text aligned left */}
            <div className="lg:order-1 w-full max-w-2xl">
              {/* Tag Row - Small label */}
              <div className="inline-flex items-center gap-2 rounded-full border border-oxford-blue/15 dark:border-white/15 bg-white/60 dark:bg-white/5 backdrop-blur px-4 py-1.5 text-xs tracking-[0.15em] uppercase text-gray-900 dark:text-white font-secondary mb-6 font-semibold">
                <span>KITCHEN</span>
                <span className="w-1 h-1 rounded-full bg-gray-900 dark:bg-white"></span>
                <span>BATH</span>
                <span className="w-1 h-1 rounded-full bg-gray-900 dark:bg-white"></span>
                <span>MILLWORK</span>
              </div>

              {/* Main Heading - Custom styled */}
              <div className="overflow-visible mb-6">
                <h1
                  className="text-page-title text-[#1A1A1A] dark:text-[#F9FAFB] !leading-[1.08] -tracking-[0.015em] text-left italic"
                  style={{ fontFamily: "'EB Garamond', 'Times New Roman', 'Georgia', serif", fontWeight: 600 }}
                >
                  Custom
                  <span
                    className="font-serif block"
                    style={{
                      background: 'linear-gradient(120deg, var(--heading-accent-from) 0%, var(--heading-accent-to) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    Kitchens &amp; Bathrooms
                  </span>
                </h1>
              </div>

              {/* Subtitle */}
              <h2
                className="text-xl sm:text-2xl md:text-3xl text-[#4a5568] dark:text-[#9ca3af] leading-snug font-serif text-left mb-2"
                style={{ fontFamily: "'EB Garamond', 'Times New Roman', 'Georgia', serif", fontWeight: 400 }}
              >
                Crafted with precision
              </h2>

              {/* Description */}
              <p className="text-sm sm:text-base text-[#666] dark:text-[#a1a1a1] leading-[1.75] text-left font-['Poppins',sans-serif] mb-10 max-w-xl">
                Transform your living spaces with elegant millwork and bespoke design solutions. Premium materials, refined finishes, and a timeless sense of style that reflects who you are.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <Button
                  variant="primary"
                  size="md"
                  className="flex items-center gap-2 group"
                      onClick={() => navigate('/products')}
                >
                  Explore
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => navigate('/contact')}
                >
                  Contact Us
                </Button>
              </div>
            </div>

            {/* Right Carousel - Rounded corners */}
            <div
              ref={carouselStageRef}
              className="relative h-[440px] sm:h-[500px] lg:h-[540px] xl:h-[580px] lg:order-2 w-full"
            >
              {/* Spotlight behind the stage, lifting it off the ambient background */}
              <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-true-blue/[0.08] via-transparent to-sapphire/[0.06] blur-2xl" />

              <div className="relative grid grid-cols-2 gap-4 h-full [mask-image:linear-gradient(to_bottom,transparent,black_9%,black_91%,transparent)]">
                <div
                  ref={leftCarouselRef}
                  className="overflow-hidden h-full rounded-2xl"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  <div className="space-y-4">
                    {[...carouselImages, ...carouselImages].map((image, index) => (
                      <div
                        key={`left-${index}`}
                        className="relative overflow-hidden rounded-xl h-56 sm:h-64 md:h-72 lg:h-80 ring-1 ring-oxford-blue/10 dark:ring-white/10 shadow-brand-md"
                      >
                        <img
                          src={image}
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Offset so the two tracks never line up rung-for-rung */}
                <div
                  ref={rightCarouselRef}
                  className="overflow-hidden h-full rounded-2xl translate-y-8"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  <div className="space-y-4">
                    {[...carouselImages, ...carouselImages].map((image, index) => (
                      <div
                        key={`right-${index}`}
                        className="relative overflow-hidden rounded-xl h-56 sm:h-64 md:h-72 lg:h-80 ring-1 ring-oxford-blue/10 dark:ring-white/10 shadow-brand-md"
                      >
                        <img
                          src={image}
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Partnered brands marquee */}
          <div className="mt-20 lg:mt-24">
            <BrandCarousel inline />
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SIGNATURE COLLECTIONS SECTION */}
      {/* ============================================ */}
      <section
        ref={collectionsSectionRef}
        className="relative py-12 sm:py-16 md:py-20 transition-colors duration-300 bg-gradient-to-br from-[#0a1128] via-[#001f54] to-[#0a1128] dark:from-[#050812] dark:via-[#001435] dark:to-[#050812]"
        aria-labelledby="collections-heading"
      >
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 max-w-[1600px] mx-auto mb-8 sm:mb-12 md:mb-16">
          <div ref={collectionsHeaderRef} className="mb-8 sm:mb-12 md:mb-16">
            {/* SEO Tags */}
            <div className="flex items-center justify-center gap-2 text-xs tracking-[0.15em] uppercase text-blue-300 font-secondary mb-4 font-semibold">
              <span>LUXURY</span>
              <span className="w-1 h-1 rounded-full bg-blue-300"></span>
              <span>BESPOKE</span>
              <span className="w-1 h-1 rounded-full bg-blue-300"></span>
              <span>REFINED</span>
            </div>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4 sm:gap-6 lg:gap-8">
              <SplitText
                text="Our signature collections"
                tag="h2"
                className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-normal text-white tracking-tight leading-tight"
                splitType="chars"
                delay={25}
                duration={0.7}
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
              />
              <div className="max-w-md lg:max-w-lg lg:text-right">
                <p
                  className="text-sm sm:text-base text-gray-200 dark:text-gray-300"
                  >
                {!isExpanded ? (
                  <>
                    Discover thoughtfully curated collections crafted to elevate every room with timeless style and exceptional craftsmanship.{' '}
                    <button
                      onClick={() => setIsExpanded(true)}
                      className="font-bold text-blue-300 hover:text-blue-200 hover:underline inline-flex items-center gap-1"
                    >
                      Learn more
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <>
                    Discover thoughtfully curated collections crafted to elevate every room with timeless style and exceptional craftsmanship. Explore handcrafted design selections that blend beauty, functionality, and qualityeach chosen to transform your home effortlessly. From custom vanities to bespoke millwork, our signature offerings showcase the finest materials and finishes for a truly elevated living experience. This refined portfolio of premium home solutions is designed to inspire and help you create spaces that feel personal, functional, and beautifully finishedcrafted with precision, premium materials, and an unwavering commitment to detail.{' '}
                    <button
                      onClick={() => setIsExpanded(false)}
                      className="font-bold text-blue-300 hover:text-blue-200 hover:underline inline-flex items-center gap-1"
                    >
                      Show less
                      <ChevronUp className="w-4 h-4" />
                    </button>
                  </>
                )}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 sm:px-6 md:px-8 lg:px-1 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {/* Large Custom Cabinetry Card - Full Width on Mobile, 2 cols on Desktop */}
            <motion.div 
              ref={collectionsLargeCardRef}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="md:col-span-2 group bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)] border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600"
            >
              <Link
                to={collections[0].link}
                aria-label={`View all ${collections[0].category}`}
                className="flex flex-col lg:flex-row h-full"
              >
                {/* Large Image Section - Left Half */}
                <div className="lg:w-1/2 h-52 sm:h-64 lg:h-auto bg-gray-200 dark:bg-gray-800 overflow-hidden">
                  <img
                    src={collections[0].image}
                    alt="Bespoke storage solutions with precision-engineered cabinetry"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="eager"
                  />
                </div>
                {/* Content Section - Right Half */}
                <div className="lg:w-1/2 p-5 sm:p-8 flex flex-col justify-center bg-white dark:bg-gray-900">
                  <h3 className="text-xl sm:text-2xl font-normal text-gray-900 dark:text-white mb-2 sm:mb-3 group-hover:text-[#001f54] dark:group-hover:text-[#0466c8] transition-colors font-serif">
                    {collections[0].title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 font-secondary leading-relaxed">
                    {collections[0].description}
                  </p>
                  <div className="flex items-center text-gray-900 dark:text-white font-medium text-sm group-hover:text-[#001f54] dark:group-hover:text-[#0466c8] transition-colors">
                    <span className="relative inline-block">
                      View all
                      <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#001f54] dark:bg-[#0466c8] transition-all duration-300 group-hover:w-full"></span>
                    </span>
                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Small Cards */}
            {collections.slice(1).map((collection, index) => (
              <motion.div
                key={collection.id}
                ref={index === 0 ? collectionsSmallCardsRef : undefined}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                className="collection-small-card group bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)] border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600"
              >
                <CollectionLink
                  to={collection.link}
                  external={collection.external}
                  label={`Explore ${collection.category}`}
                >
                {/* Image Section */}
                <div className="aspect-[4/3] sm:aspect-[4/3] bg-gray-200 dark:bg-gray-800 overflow-hidden">
                  <img
                    src={collection.image}
                    alt={`${collection.category} - ${collection.description}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="eager"
                  />
                </div>
                {/* Content Section */}
                <div className="p-4 sm:p-5">
                  <h3 className="text-base sm:text-lg font-normal text-gray-900 dark:text-white mb-1.5 sm:mb-2 group-hover:text-[#001f54] dark:group-hover:text-[#0466c8] transition-colors font-serif">
                    {collection.category}
                  </h3>
                  <p className="text-caption text-gray-600 dark:text-gray-400 mb-2.5 sm:mb-3 font-secondary leading-relaxed">
                    {collection.description}
                  </p>
                  <div className="flex items-center text-gray-900 dark:text-white font-medium text-xs group-hover:text-[#001f54] dark:group-hover:text-[#0466c8] transition-colors">
                    <span className="relative inline-block">
                      Explore
                      <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#001f54] dark:bg-[#0466c8] transition-all duration-300 group-hover:w-full"></span>
                    </span>
                    <svg className="w-3.5 h-3.5 ml-1.5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>
                </div>
                </CollectionLink>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ============================================ */}
      {/* FEATURED SECTION */}
      {/* ============================================ */}
      <FeaturedCollections />

      {/* ============================================ */}
      {/* WHY CHOOSE SECTION */}
      {/* ============================================ */}
      <section ref={whyChooseSectionRef} className="relative py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300 bg-gray-50/50 dark:bg-gray-900/20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-12">
            <p className="text-xs sm:text-sm tracking-[0.2em] uppercase text-gray-900 dark:text-white mb-3 font-['Poppins',sans-serif] font-semibold">
              Excellence
            </p>
            <SplitText
              text="Why choose Coppola"
              tag="h2"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-gray-900 dark:text-white mb-4 font-serif"
              splitType="chars"
              delay={30}
              duration={0.7}
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              textAlign="center"
            />
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-['Poppins',sans-serif]">
              Uncompromising quality meets innovative design.
            </p>
          </div>

          {/* Fanned Cards */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-center gap-6 sm:gap-0 sm:-space-x-2 lg:-space-x-4 sm:pt-6">
            {whyChooseFeatures.map((feature, index) => {
              const fan = whyChooseFan[index] ?? whyChooseFan[whyChooseFan.length - 1];

              return (
                <motion.div
                  key={index}
                  className={`relative w-full sm:w-[clamp(190px,23vw,310px)] sm:shrink-0 hover:z-40 ${fan.z}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
                >
                  <div
                    className={`group relative aspect-[4/3] sm:aspect-[3/4] overflow-hidden rounded-3xl cursor-pointer border border-white/50 dark:border-white/10 shadow-brand-lg transition-transform duration-500 ease-out sm:hover:rotate-0 sm:hover:-translate-y-4 sm:hover:scale-[1.04] ${fan.tilt}`}
                    onClick={() => navigate(feature.link)}
                  >
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Scrim keeps the overlaid copy legible against any photo */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                    <span className="absolute top-4 left-4 rounded-full bg-white/85 dark:bg-black/55 backdrop-blur px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-oxford-blue dark:text-white font-['Poppins',sans-serif]">
                      {feature.category}
                    </span>

                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <h3 className="text-lg sm:text-xl font-normal text-white mb-2 font-serif leading-tight">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-white/75 mb-4 font-['Poppins',sans-serif] leading-relaxed">
                        {feature.description}
                      </p>

                      {/* Explore Button */}
                      <div className="text-sm font-medium text-white inline-flex items-center gap-2 font-['Poppins',sans-serif]">
                        <span className="relative">
                          Explore
                          <span className="absolute left-0 right-0 -bottom-0.5 h-[1px] bg-current w-0 group-hover:w-full transition-all duration-300" />
                        </span>
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* TESTIMONIALS SECTION */}
      {/* ============================================ */}
      <Testimonials />
    </>
  );
};

export default Home;
