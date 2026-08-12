import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../../components/ui/Button';
import SplitText from '../../../components/ui/SplitText';

const Sinks = () => {
  const [currentImageSet, setCurrentImageSet] = useState(0);

  useEffect(() => {
    document.title = 'Premium Sinks Thunder Bay | Kitchen & Bathroom Sinks Canada | Coppola Home';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Premium kitchen and bathroom sinks in Thunder Bay, Ontario. Shop our curated collection of undermount, vessel, and farmhouse sinks. Serving Northern Ontario and Canada with quality products for your home renovation.'
      );
    }
    
    // Add keywords meta tag
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'sinks Thunder Bay, kitchen sinks Ontario, bathroom sinks Canada, undermount sinks, vessel sinks, premium sinks Northern Ontario, sink installation Thunder Bay');
  }, []);

  // Auto-rotate carousel every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageSet((prev) => (prev + 1) % 2);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Carousel images
  const carouselImages = [
    '/assets/gallery/sink-collection-carousel-image-1.jpg',
    '/assets/gallery/sink-collection-carousel-image-2.jpg',
    '/assets/gallery/sink-collection-carousel-image-3.jpg',
    '/assets/gallery/sink-collection-carousel-image-4.jpg',
    '/assets/gallery/sink-collection-carousel-image-5.jpg',
    '/assets/gallery/sink-collection-carousel-image-6.webp',
  ];

  // Two different bento grid layouts with animation states
  const bentoLayouts = [
    // Layout 1
    [
      { id: 1, size: 'large', position: 'col-span-2 row-span-2', delay: 0, image: carouselImages[0] },
      { id: 2, size: 'small', position: 'col-span-1 row-span-1', delay: 0.1, image: carouselImages[1] },
      { id: 3, size: 'small', position: 'col-span-1 row-span-1', delay: 0.2, image: carouselImages[2] },
    ],
    // Layout 2
    [
      { id: 4, size: 'medium', position: 'col-span-1 row-span-2', delay: 0, image: carouselImages[3] },
      { id: 5, size: 'medium', position: 'col-span-2 row-span-1', delay: 0.1, image: carouselImages[4] },
      { id: 6, size: 'small', position: 'col-span-2 row-span-1', delay: 0.2, image: carouselImages[5] },
    ],
  ];

  const sinkCategories = [
    {
      name: 'Kitchen Sinks',
      path: '/products/sinks/kitchen',
      image: '/assets/gallery/kitchen-sink-card-image.avif',
      description: 'Durable and stylish sinks for your kitchen'
    },
    {
      name: 'Bathroom Sinks',
      path: '/products/sinks/bathroom',
      image: '/assets/gallery/bathroom-sink-card-image.avif',
      description: 'Elegant sinks for modern bathrooms'
    },
    {
      name: 'Undermount Sinks',
      path: '/products/sinks/undermount',
      image: '/assets/gallery/undermount-sink-card-image.avif',
      description: 'Seamless integration with your countertops'
    },
    {
      name: 'Vessel Sinks',
      path: '/products/sinks/vessel',
      image: '/assets/gallery/vesel-sink-card-image.avif',
      description: 'Statement pieces for contemporary spaces'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#000000]">
      {/* Hero Section with Background Image */}
      <section className="relative h-[92vh] w-full flex items-center justify-center overflow-hidden">
        {/* Background Image with Zoom Out Effect */}
        <motion.div 
          className="absolute inset-0 w-full h-full"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <img
            src="/assets/gallery/kitchen-sink-header-image.jpg"
            alt="Premium Sinks"
            className="w-full h-full object-cover"
          />
          {/* Subtle Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
        </motion.div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 py-20">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="text-sm font-medium text-white/90 tracking-wider uppercase font-secondary">
              Precision
            </span>
          </motion.div>

          {/* Main Heading */}
          <SplitText
            text="Sinks for every space"
            tag="h1"
            className="text-page-title font-normal text-white mb-8 leading-tight font-serif"
            splitType="chars"
            delay={30}
            duration={0.7}
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            textAlign="center"
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-white/90 mb-10 max-w-2xl mx-auto font-secondary"
          >
            Crafted with precision. Designed for performance. Engineered to last.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <a href="#explore">
              <Button variant="primary" size="md">
                Explore
              </Button>
            </a>
            <Link to="/quote">
              <Button variant="outline" size="md">
                Quote
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="explore" className="py-20 px-4 bg-white dark:bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <SplitText
              text="Explore Our Collection"
              tag="h2"
              className="text-4xl md:text-5xl font-normal text-gray-900 dark:text-white mb-4 font-serif"
              splitType="chars"
              delay={30}
              duration={0.7}
            />
            <p className="text-lg text-gray-600 dark:text-gray-400 font-secondary">
              Find the perfect sink for your space
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sinkCategories.map((category, index) => (
              <motion.div
                key={category.path}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.7, 
                  delay: index * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="group bg-gray-50 dark:bg-gray-900 rounded-3xl overflow-hidden transition-all duration-500 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
              >
                <Link to={category.path} className="block">
                  {/* Image Section */}
                  <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-800 overflow-hidden">
                    <motion.img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.2 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    />
                  </div>
                  {/* Content Section */}
                  <div className="p-4">
                    <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-500 mb-1 font-secondary">
                      {category.name.split(' ')[0]}
                    </p>
                    <h3 className="text-lg font-normal text-gray-900 dark:text-white mb-1.5 group-hover:text-[#001f54] dark:group-hover:text-[#0466c8] transition-colors font-serif">
                      {category.name}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2.5 font-secondary leading-relaxed">
                      {category.description}
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
            ))}
          </div>
        </div>
      </section>

      {/* Complete Sink Collection Section - Split Layout with Carousel */}
      <section className="py-20 px-4 bg-white dark:bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-sm uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-3 font-secondary">
              Selection
            </p>
            <SplitText
              text="Our complete sink collection"
              tag="h2"
              className="text-4xl md:text-5xl font-normal text-gray-900 dark:text-white mb-4 font-serif"
              splitType="chars"
              delay={30}
              duration={0.7}
            />
            <p className="text-base text-gray-600 dark:text-gray-400 font-secondary max-w-2xl mx-auto">
              Curated selection of premium sinks for discerning homeowners.
            </p>
          </motion.div>

          {/* Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Bento Grid Carousel */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
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
                          transformStyle: 'preserve-3d',
                          perspective: '1000px'
                        }}
                      >
                        {/* Image */}
                        <img
                          src={item.image}
                          alt={`Sink collection ${item.id}`}
                          className="absolute inset-0 w-full h-full object-cover"
                        />

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
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent z-10"
                          style={{ transform: 'skewX(-20deg)' }}
                        />

                        {/* Subtle Overlay on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#001f54]/0 to-[#0466c8]/0 hover:from-[#001f54]/10 hover:to-[#0466c8]/10 transition-all duration-500 z-20" />
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

            {/* Right Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <p className="text-sm uppercase tracking-wider text-gray-600 dark:text-gray-400 font-secondary">
                Premium Sinks in Thunder Bay & Canada
              </p>
              <h3 className="text-4xl md:text-5xl font-normal text-gray-900 dark:text-white font-serif leading-tight">
                Find your perfect sink
              </h3>
              <p className="text-base text-gray-600 dark:text-gray-400 font-secondary leading-relaxed">
                Customize your search by size, color, and brand. Precision meets possibility. Proudly serving Thunder Bay, Northern Ontario, and customers across Canada with premium kitchen and bathroom sinks designed for Canadian homes.
              </p>

              {/* SEO Text */}
              <div className="text-sm text-gray-500 dark:text-gray-500 font-secondary leading-relaxed space-y-2 pt-2">
                <p>
                  Whether you're renovating your Thunder Bay home or building new in Ontario, our curated collection of premium sinks combines functionality with timeless design. From undermount kitchen sinks to elegant vessel bathroom sinks, we deliver quality products throughout Canada.
                </p>
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <Link to="/products/sinks/explore">
                  <Button variant="primary" size="md" className="flex items-center gap-2">
                    Explore all
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sinks;