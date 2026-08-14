import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Testimonials from '../components/layout/Testimonials';
import Button from '../components/ui/Button';
import BrandCarousel from '../components/layout/BrandCarousel';
import TrustBar from '../components/layout/TrustBar';
import HowItWorks from '../components/layout/HowItWorks';
import FeaturedCollections from '../components/layout/FeaturedCollections';
import SplitText from '../components/ui/SplitText';
import { supabase } from '../lib/supabase';
import type { GalleryItem, Product } from '../types/database';
import { usePageSections } from '../lib/usePageSections';

gsap.registerPlugin(ScrollTrigger);

// Listing route per product category — matches the routes in main.tsx.
const CATEGORY_ROUTE: Record<Product['category'], string> = {
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

const CATEGORY_LABEL: Record<Product['category'], string> = {
  vanity: 'Bathroom Vanities',
  quartz: 'Quartz Countertops',
  faucet: 'Faucets',
  mirror: 'Mirrors',
  sink: 'Sinks',
  toilet: 'Toilets',
  flooring: 'Flooring',
  lighting: 'Lighting',
  hardware: 'Hardware',
};

// Service pages have no catalogue products behind them, so they stay as
// fixed navigation tiles alongside the DB-driven product categories below.
const serviceTiles = [
  {
    id: 'custom-cabinetry',
    category: 'Custom Cabinetry',
    description: 'Precision-engineered cabinetry designed to maximize space and style in every room.',
    image: '/assets/gallery/Screenshot 2025-12-27 101328.png',
    link: '/custom-cabinetry',
  },
  {
    id: 'bespoke-millwork',
    category: 'Custom Millwork',
    description: 'Precision engineering for every space',
    image: '/assets/gallery/Screenshot 2025-12-27 101500.png',
    link: '/commercial-millwork',
  },
  {
    id: 'outdoor-kitchens',
    category: 'Outdoor Kitchens',
    description: 'Durable surfaces for modern living',
    image: '/assets/gallery/landing-header-carousel-image-5.png',
    // Matches the navbar: outdoor kitchens live on the Q-Boo site. The
    // internal /outdoor-kitchens route is only a shim that bounces home.
    link: 'https://q-boo.com/',
    external: true,
  },
];

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
  const { section } = usePageSections('home');
  // ============================================
  // STATE AND REFS
  // ============================================
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const collectionsSectionRef = useRef<HTMLElement>(null);
  const collectionsHeaderRef = useRef<HTMLDivElement>(null);
  const collectionsLargeCardRef = useRef<HTMLDivElement>(null);
  const collectionsSmallCardsRef = useRef<HTMLDivElement>(null);
  const whyChooseSectionRef = useRef<HTMLElement>(null);

  // Respect prefers-reduced-motion: pause on the poster frame instead of autoplaying.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      heroVideoRef.current?.pause();
    }
  }, []);

  // ============================================
  // DATA (loaded from Supabase)
  // ============================================

  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [whyChooseItems, setWhyChooseItems] = useState<GalleryItem[]>([]);

  useEffect(() => {
    supabase
      .from('gallery')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setWhyChooseItems((data ?? []).slice(0, 4));
      });

    supabase
      .from('products')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .then(({ data }) => setFeaturedProducts(data ?? []));
  }, []);

  // One representative product per category, for the Signature Collections grid.
  const collectionsByCategory = Object.values(
    featuredProducts.reduce<Partial<Record<Product['category'], Product>>>((acc, product) => {
      if (!acc[product.category]) acc[product.category] = product;
      return acc;
    }, {})
  ) as Product[];

  // Fixed service tiles plus one tile per live product category.
  const signatureTiles = [
    ...serviceTiles.map((tile) => ({
      id: tile.id,
      category: tile.category,
      description: tile.description,
      image: tile.image,
      link: tile.link,
      external: tile.external,
    })),
    ...collectionsByCategory.map((product) => ({
      id: product.id,
      category: CATEGORY_LABEL[product.category],
      description: product.short_description || product.description || '',
      image: product.images[0] ?? '',
      link: CATEGORY_ROUTE[product.category],
      external: false,
    })),
  ];

  const hero = section('hero', {
    heading: 'Custom Kitchens & Bathrooms',
    subheading: 'Crafted with precision',
    body: 'Transform your living spaces with elegant millwork and bespoke design solutions. Premium materials, refined finishes, and a timeless sense of style that reflects who you are.',
    video_url: '/videos/coppola-contracting.mp4',
    heading_color: '#FFFFFF',
    subheading_color: 'rgba(255,255,255,0.8)',
    body_color: 'rgba(255,255,255,0.7)',
  });
  const collectionsIntro = section('collections_intro', {
    heading: 'Our signature collections',
    body: 'Thoughtfully curated collections crafted to elevate every room with timeless style and exceptional craftsmanship.',
    heading_color: '#111827',
    body_color: '#4B5563',
  });
  const whyChooseIntro = section('why_choose_intro', {
    heading: 'Why choose Coppola',
    subheading: 'Excellence',
    body: 'Uncompromising quality meets innovative design.',
    heading_color: '#111827',
    subheading_color: '#111827',
    body_color: '#4B5563',
  });
  // Hero heading splits on the first space so "Custom" stays plain and the
  // rest gets the gradient treatment, matching the original design.
  const [heroHeadingFirst, ...heroHeadingRest] = hero.heading.split(' ');

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



  return (
    <>
      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <section className="relative min-h-[560px] sm:min-h-[620px] lg:min-h-[680px] flex items-center pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
        {/* Background video of cabinet-making craftsmanship */}
        <video
          ref={heroVideoRef}
          key={hero.video_url}
          className="absolute inset-0 w-full h-full object-cover"
          src={hero.video_url}
          poster="/assets/gallery/landing-header-carousel-image-1.webp"
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Dark scrim so the white text stays legible over any frame */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/30" />

        <div className="relative w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 z-10">
          <div className="w-full max-w-2xl">
            {/* Tag Row - Small label */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 backdrop-blur px-4 py-1.5 text-xs tracking-[0.15em] uppercase text-white font-secondary mb-6 font-semibold">
              <span>KITCHEN</span>
              <span className="w-1 h-1 rounded-full bg-white"></span>
              <span>BATH</span>
              <span className="w-1 h-1 rounded-full bg-white"></span>
              <span>MILLWORK</span>
            </div>

            {/* Main Heading - Custom styled */}
            <div className="overflow-visible mb-6">
              <h1
                className="text-page-title !leading-[1.08] -tracking-[0.015em] text-left italic"
                style={{ fontFamily: "'EB Garamond', 'Times New Roman', 'Georgia', serif", fontWeight: 600, color: hero.heading_color }}
              >
                {heroHeadingFirst}
                <span
                  className="font-serif block"
                  style={{
                    background: 'linear-gradient(120deg, var(--heading-accent-from) 0%, var(--heading-accent-to) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {heroHeadingRest.join(' ')}
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <h2
              className="text-xl sm:text-2xl md:text-3xl leading-snug font-serif text-left mb-2"
              style={{ fontFamily: "'EB Garamond', 'Times New Roman', 'Georgia', serif", fontWeight: 400, color: hero.subheading_color }}
            >
              {hero.subheading}
            </h2>

            {/* Description */}
            <p
              className="text-sm sm:text-base leading-[1.75] text-left font-['Poppins',sans-serif] mb-10 max-w-xl"
              style={{ color: hero.body_color }}
            >
              {hero.body}
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
                variant="secondary"
                size="md"
                onClick={() => navigate('/contact')}
              >
                Get Your Estimate
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar - credential badges + press mentions, right below the hero */}
      <TrustBar />

      {/* Partnered brands marquee - own band, clear of the hero video */}
      <div className="py-10 lg:py-12 border-b border-oxford-blue/10 dark:border-white/10 transition-colors duration-300">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <BrandCarousel inline />
        </div>
      </div>

      {/* How It Works - process timeline */}
      <HowItWorks />

      {/* ============================================ */}
      {/* SIGNATURE COLLECTIONS SECTION */}
      {/* ============================================ */}
      <section
        ref={collectionsSectionRef}
        className="relative py-12 sm:py-16 md:py-20 transition-colors duration-300"
        aria-labelledby="collections-heading"
      >
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 max-w-[1600px] mx-auto mb-8 sm:mb-12 md:mb-16">
          <div ref={collectionsHeaderRef} className="text-center">
            {/* SEO Tags */}
            <div className="flex items-center justify-center gap-2 text-xs tracking-[0.15em] uppercase text-gray-500 dark:text-gray-400 font-secondary mb-4 font-semibold">
              <span>LUXURY</span>
              <span className="w-1 h-1 rounded-full bg-gray-400"></span>
              <span>BESPOKE</span>
              <span className="w-1 h-1 rounded-full bg-gray-400"></span>
              <span>REFINED</span>
            </div>
            <h2
              id="collections-heading"
              className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-normal tracking-tight leading-tight mb-4"
              style={{ color: collectionsIntro.heading_color }}
            >
              {collectionsIntro.heading}
            </h2>
            <p className="max-w-2xl mx-auto text-sm sm:text-base" style={{ color: collectionsIntro.body_color }}>
              {collectionsIntro.body}
            </p>
          </div>
        </div>

        <div className="px-6 sm:px-6 md:px-8 lg:px-1 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {signatureTiles.map((tile, index) => (
              <motion.div
                key={tile.id}
                ref={index === 0 ? collectionsLargeCardRef : index === 1 ? collectionsSmallCardsRef : undefined}
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
                  to={tile.link}
                  external={tile.external}
                  label={`Explore ${tile.category}`}
                >
                {/* Image Section */}
                <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-800 overflow-hidden">
                  {tile.image && (
                    <img
                      src={tile.image}
                      alt={`${tile.category} - ${tile.description}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="eager"
                    />
                  )}
                </div>
                {/* Content Section */}
                <div className="p-4 sm:p-5">
                  <h3 className="text-base sm:text-lg font-normal text-gray-900 dark:text-white mb-1.5 sm:mb-2 group-hover:text-[#001f54] dark:group-hover:text-[#0466c8] transition-colors font-serif">
                    {tile.category}
                  </h3>
                  <p className="text-caption text-gray-600 dark:text-gray-400 mb-2.5 sm:mb-3 font-secondary leading-relaxed">
                    {tile.description}
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
      {whyChooseItems.length > 0 && (
        <section ref={whyChooseSectionRef} className="relative py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300 bg-gray-50/50 dark:bg-gray-900/20">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-10 sm:mb-12">
              <p className="text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 font-['Poppins',sans-serif] font-semibold" style={{ color: whyChooseIntro.subheading_color }}>
                {whyChooseIntro.subheading}
              </p>
              <SplitText
                text={whyChooseIntro.heading}
                tag="h2"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal mb-4 font-serif"
                style={{ color: whyChooseIntro.heading_color }}
                splitType="chars"
                delay={30}
                duration={0.7}
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                textAlign="center"
              />
              <p className="text-sm sm:text-base max-w-2xl mx-auto font-['Poppins',sans-serif]" style={{ color: whyChooseIntro.body_color }}>
                {whyChooseIntro.body}
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyChooseItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="relative w-full"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
                >
                  <div
                    className="group relative aspect-[3/4] overflow-hidden rounded-3xl cursor-pointer border border-white/50 dark:border-white/10 shadow-brand-lg transition-transform duration-500 ease-out hover:-translate-y-2 hover:scale-[1.02]"
                    onClick={() => navigate('/our-works')}
                  >
                    {item.images[0] && (
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    )}

                    {/* Scrim keeps the overlaid copy legible against any photo */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                    {item.category && (
                      <span className="absolute top-4 left-4 rounded-full bg-white/85 dark:bg-black/55 backdrop-blur px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-oxford-blue dark:text-white font-['Poppins',sans-serif]">
                        {item.category}
                      </span>
                    )}

                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <h3 className="text-lg sm:text-xl font-normal text-white mb-2 font-serif leading-tight">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-sm text-white/75 mb-4 font-['Poppins',sans-serif] leading-relaxed">
                          {item.description}
                        </p>
                      )}

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
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================ */}
      {/* TESTIMONIALS SECTION */}
      {/* ============================================ */}
      <Testimonials />
    </>
  );
};

export default Home;
