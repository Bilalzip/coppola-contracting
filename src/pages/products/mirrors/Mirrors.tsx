import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../../components/ui/Button';
import SplitText from '../../../components/ui/SplitText';

const Mirrors: React.FC = () => {
  const [currentImageSet, setCurrentImageSet] = useState(0);

  // Auto-rotate carousel every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageSet((prev) => (prev + 1) % 2);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Curated section images
  const curatedImages = [
    '/assets/gallery/curated-section-carousel-1.png',
    '/assets/gallery/curated-section-carousel-2.jpg',
    '/assets/gallery/curated-section-carousel-3.jpg',
    '/assets/gallery/curated-section-carousel-4.webp',
    '/assets/gallery/curated-section-carousel-5.webp',
    '/assets/gallery/curated-section-carousel-6.webp',
  ];

  // Two different bento grid layouts with animation states
  const bentoLayouts = [
    // Layout 1
    [
      { id: 1, size: 'large', position: 'col-span-2 row-span-2', delay: 0, image: curatedImages[0] },
      { id: 2, size: 'small', position: 'col-span-1 row-span-1', delay: 0.1, image: curatedImages[1] },
      { id: 3, size: 'small', position: 'col-span-1 row-span-1', delay: 0.2, image: curatedImages[2] },
    ],
    // Layout 2
    [
      { id: 4, size: 'medium', position: 'col-span-1 row-span-2', delay: 0, image: curatedImages[3] },
      { id: 5, size: 'medium', position: 'col-span-2 row-span-1', delay: 0.1, image: curatedImages[4] },
      { id: 6, size: 'small', position: 'col-span-2 row-span-1', delay: 0.2, image: curatedImages[5] },
    ],
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative h-[92vh] w-full flex items-stretch overflow-hidden"
      >
        <div className="w-full grid grid-cols-1 lg:grid-cols-[55%_45%]">
          {/* Left Side - Content */}
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex items-center bg-gradient-to-br from-gray-50 to-white px-6 md:px-12 py-16"
          >
            <div className="space-y-8 max-w-xl mx-auto lg:mx-0">
              <div className="overflow-visible">
                <SplitText
                  text="Elegant mirrors for every space"
                  tag="h1"
                  className="text-page-title font-normal text-black !leading-[1.1] text-left font-serif"
                  style={{ paddingTop: 0, paddingBottom: 0, textAlign: 'left' }}
                  splitType="chars"
                  delay={30}
                  duration={0.8}
                  from={{ opacity: 0, y: 50 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                />
              </div>
              <p 
                className="text-base md:text-lg text-gray-800 leading-relaxed font-secondary"
              >
                Discover precision crafted mirrors that transform your interior. Each piece reflects our commitment to design and quality.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link to="/products/mirrors/explore">
                  <Button variant="primary" size="md">
                    Explore
                  </Button>
                </Link>
                <Link to="/quote">
                  <Button variant="outline" size="md">
                    Quote
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Image Container */}
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative overflow-hidden h-full"
            style={{
              backgroundImage: 'url(/assets/gallery/mirror-header-image.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
          </motion.div>
        </div>
      </motion.section>

      {/* Mirror Collections Section */}
      <section className="py-24 px-4 bg-white dark:bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-4"
          >
            <p className="text-sm uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-3 font-secondary">
              Mirrors
            </p>
            <SplitText
              text="Our mirror collection"
              tag="h2"
              className="text-4xl md:text-5xl font-normal text-gray-900 dark:text-white mb-4 font-serif"
              splitType="chars"
              delay={30}
              duration={0.7}
            />
            <p className="text-base text-gray-600 dark:text-gray-400 font-secondary max-w-2xl mx-auto">
              Precision engineered mirrors for discerning spaces. Explore our extensive collection 
              of luxury bathroom mirrors, LED vanity mirrors, and decorative wall mirrors designed 
              to elevate your home's aesthetic.
            </p>
          </motion.div>

          {/* Collections Grid - 2 Small Cards + 1 Large Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1fr_2fr] gap-6 mt-14">
            {/* Modern Minimalist Card - Small */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group bg-white dark:bg-gray-900 rounded-3xl overflow-hidden transition-all duration-500 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)] border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600"
            >
              <Link to="/products/mirrors/modern" className="block">
                {/* Image Section */}
                <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-800 overflow-hidden">
                  <img 
                    src="/assets/gallery/mirros-page-morder-card.webp" 
                    alt="Modern minimalist mirrors"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Content Section */}
                <div className="p-5">
                  <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-500 mb-1.5 font-secondary">
                    Modern
                  </p>
                  <h3 className="text-lg font-normal text-gray-900 dark:text-white mb-2 group-hover:text-[#001f54] dark:group-hover:text-[#0466c8] transition-colors font-serif">
                    Modern minimalist
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 font-secondary leading-relaxed">
                    Clean lines meet sophisticated design in our modern mirror collection
                  </p>
                  <div className="flex items-center text-gray-900 dark:text-white font-medium text-xs group-hover:text-[#001f54] dark:group-hover:text-[#0466c8] transition-colors">
                    <span className="relative inline-block">
                      View all
                      <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#001f54] dark:bg-[#0466c8] transition-all duration-300 group-hover:w-full"></span>
                    </span>
                    <svg className="w-3.5 h-3.5 ml-1.5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Timeless Elegance Card - Small */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group bg-white dark:bg-gray-900 rounded-3xl overflow-hidden transition-all duration-500 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)] border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600"
            >
              <Link to="/products/mirrors/timeless" className="block">
                {/* Image Section */}
                <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-800 overflow-hidden">
                  <img 
                    src="/assets/gallery/mirror-page-timeless-card.webp" 
                    alt="Timeless elegance mirrors"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Content Section */}
                <div className="p-5">
                  <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-500 mb-1.5 font-secondary">
                    Classic
                  </p>
                  <h3 className="text-lg font-normal text-gray-900 dark:text-white mb-2 group-hover:text-[#001f54] dark:group-hover:text-[#0466c8] transition-colors font-serif">
                    Timeless elegance
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 font-secondary leading-relaxed">
                    Refined frames that capture traditional craftsmanship and beauty
                  </p>
                  <div className="flex items-center text-gray-900 dark:text-white font-medium text-xs group-hover:text-[#001f54] dark:group-hover:text-[#0466c8] transition-colors">
                    <span className="relative inline-block">
                      View all
                      <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#001f54] dark:bg-[#0466c8] transition-all duration-300 group-hover:w-full"></span>
                    </span>
                    <svg className="w-3.5 h-3.5 ml-1.5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Frameless Card - Large Horizontal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group bg-white dark:bg-gray-900 rounded-3xl overflow-hidden transition-all duration-500 md:col-span-2 lg:col-span-1 border border-gray-200 dark:border-gray-800 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)] hover:border-gray-400 dark:hover:border-gray-600"
            >
              <Link to="/products/mirrors/contemporary" className="block h-full">
                <div className="flex flex-col lg:flex-row h-full">
                  {/* Large Image Section - Left Half */}
                  <div className="lg:w-1/2 h-64 lg:h-auto bg-gray-200 dark:bg-gray-800 overflow-hidden">
                    <img 
                      src="/assets/gallery/mirror-page-seemless-contemporary-card.webp" 
                      alt="Seamless contemporary mirrors"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  {/* Content Section - Right Half */}
                  <div className="lg:w-1/2 p-8 flex flex-col justify-center bg-white dark:bg-gray-900">
                    <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-500 mb-2 font-secondary">
                      Frameless
                    </p>
                    <h3 className="text-2xl font-normal text-gray-900 dark:text-white mb-3 group-hover:text-[#001f54] dark:group-hover:text-[#0466c8] transition-colors font-serif">
                      Seamless contemporary
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 font-secondary leading-relaxed">
                      Sleek profiles that blend perfectly with modern interiors
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
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Curated Section - Split Layout */}
      <section className="py-20 px-4 bg-white dark:bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <p className="text-sm uppercase tracking-wider text-gray-600 dark:text-gray-400 font-secondary">
                Curated Mirror Collection
              </p>
              <SplitText
                text="Exceptional mirror designs"
                tag="h2"
                className="text-4xl md:text-5xl font-normal text-gray-900 dark:text-white font-serif leading-tight"
                splitType="chars"
                delay={35}
                duration={0.8}
              />
              <p className="text-base text-gray-600 dark:text-gray-400 font-secondary leading-relaxed">
                Each mirror represents our commitment to craftsmanship and aesthetic excellence. 
                From modern LED bathroom mirrors to timeless framed designs, our curated collection 
                features premium quality mirrors that transform any space with style and functionality.
              </p>

              {/* Tag-style features */}
              <div className="flex flex-wrap gap-2 pt-4">
                <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium font-secondary">
                  Bathroom
                </span>
                <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium font-secondary">
                  Vanity
                </span>
                <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium font-secondary">
                  LED
                </span>
                <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium font-secondary">
                  Anti-Fog
                </span>
                <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium font-secondary">
                  Modern
                </span>
                <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium font-secondary">
                  Classic
                </span>
                <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium font-secondary">
                  Contemporary
                </span>
                <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium font-secondary">
                  Single
                </span>
                <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium font-secondary">
                  Double
                </span>
                <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium font-secondary">
                  Premium
                </span>
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <Link to="/products/mirrors/explore">
                  <Button variant="primary" size="md" className="flex items-center gap-2">
                    Explore all
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Right Column - Bento Grid Carousel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative flex items-center justify-center lg:justify-start w-full"
            >
              <div className="w-full max-w-md md:max-w-lg lg:max-w-xl aspect-square relative overflow-hidden">
                {/* Animated Background Gradient */}
                <motion.div
                  animate={{
                    background: [
                      'radial-gradient(circle at 20% 50%, rgba(0, 31, 84, 0.05) 0%, transparent 50%)',
                      'radial-gradient(circle at 80% 50%, rgba(4, 102, 200, 0.05) 0%, transparent 50%)',
                      'radial-gradient(circle at 20% 50%, rgba(0, 31, 84, 0.05) 0%, transparent 50%)',
                    ]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 -z-10"
                />
                
                {/* Grid Container */}
                <div className="grid grid-cols-3 grid-rows-2 gap-2 md:gap-3 h-full relative">
                  <AnimatePresence mode="popLayout">
                    {bentoLayouts[currentImageSet].map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        layoutId={`cell-${item.id}`}
                        initial={{ 
                          scale: 0.8,
                          opacity: 0,
                          rotateY: -20
                        }}
                        animate={{ 
                          scale: 1,
                          opacity: 1,
                          rotateY: 0
                        }}
                        exit={{
                          scale: 0.8,
                          opacity: 0,
                          rotateY: 20,
                          transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
                        }}
                        transition={{ 
                          layout: { 
                            type: "spring", 
                            stiffness: 300, 
                            damping: 30 
                          },
                          scale: { 
                            duration: 0.5, 
                            ease: [0.4, 0, 0.2, 1] 
                          },
                          opacity: { 
                            duration: 0.4 
                          },
                          rotateY: { 
                            duration: 0.5, 
                            ease: [0.4, 0, 0.2, 1] 
                          }
                        }}
                        className={`${item.position} rounded-xl md:rounded-2xl overflow-hidden flex items-center justify-center relative`}
                        style={{
                          background: 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)',
                          transformStyle: 'preserve-3d',
                          perspective: '1000px'
                        }}
                      >
                        {/* Shimmer Effect */}
                        <motion.div
                          animate={{
                            x: ['-100%', '100%']
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 2,
                            ease: "easeInOut"
                          }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent z-20 pointer-events-none"
                          style={{ transform: 'skewX(-20deg)' }}
                        />

                        {/* Image */}
                        <motion.img
                          key={`image-${item.id}`}
                          src={item.image}
                          alt={`Mirror design ${item.id}`}
                          initial={{ scale: 1.2, opacity: 0 }}
                          animate={{ 
                            scale: 1, 
                            opacity: 1 
                          }}
                          exit={{ 
                            scale: 1.2, 
                            opacity: 0,
                            transition: { duration: 0.3 }
                          }}
                          transition={{ 
                            duration: 0.5,
                            ease: [0.4, 0, 0.2, 1]
                          }}
                          className="absolute inset-0 w-full h-full object-cover"
                        />

                        {/* Overlay gradient for depth */}
                        <div className="absolute inset-0 bg-gradient-to-br from-black/0 via-black/0 to-black/20 z-10" />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Enhanced Carousel Indicators */}
                <div className="absolute -bottom-10 md:-bottom-12 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {[0, 1].map((index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrentImageSet(index)}
                      whileTap={{ scale: 0.9 }}
                      className={`h-2 rounded-full transition-all duration-500 ${
                        currentImageSet === index
                          ? 'bg-[#001f54] dark:bg-[#0466c8] w-8'
                          : 'bg-gray-300 dark:bg-gray-600 w-2'
                      }`}
                      aria-label={`View layout ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Mirrors;
