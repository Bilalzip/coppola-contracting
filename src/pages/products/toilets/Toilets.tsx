import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toiletProducts } from '../../../data/toiletProducts';
import NewsletterBanner from '../../../components/layout/NewsletterBanner';
import Button from '../../../components/ui/Button';
import SplitText from '../../../components/ui/SplitText';

const Toilets: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);

  // Map products to add category
  const toilets = toiletProducts.map(product => ({
    ...product,
    category: product.category === 'Smart Toilets' ? 'intelligent' : 'regular',
    image: product.images[0]
  }));

  const categories = [
    { id: 'all', name: 'All Toilets', count: toilets.length },
    { id: 'intelligent', name: 'Intelligent Toilets', count: toilets.filter(t => t.category === 'intelligent').length },
    { id: 'regular', name: 'Regular Toilets', count: toilets.filter(t => t.category === 'regular').length }
  ];

  const filteredToilets = selectedCategory === 'all'
    ? toilets
    : toilets.filter(toilet => toilet.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a]">
      {/* Header Section - Half Height */}
      <section className="relative h-[50vh] w-full overflow-hidden">
        {/* Background Image with Zoom Out Animation */}
        <motion.div 
          className="absolute inset-0"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <img
            src="/assets/gallery/toilet-header-image.png"
            alt="Premium Toilets Collection"
            className="w-full h-full object-cover"
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          {/* Heading - Centered */}
          <div className="max-w-3xl">
            <SplitText
              text="Premium intelligent toilets"
              tag="h1"
              className="text-page-title font-normal text-white mb-4 font-serif"
              splitType="chars"
              delay={30}
              duration={0.8}
              textAlign="center"
            />
            <p className="text-base text-white/90 font-secondary">
              Experience luxury and innovation with our collection of smart toilets
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section id="collection" className="py-12 px-4 bg-white dark:bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          {/* Section Header - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-sm uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-3 font-secondary">
              Premium Toilets
            </p>
            <SplitText
              text="Our toilet collection"
              tag="h2"
              className="text-4xl md:text-5xl font-normal text-gray-900 dark:text-white mb-4 font-serif"
              splitType="chars"
              delay={30}
              duration={0.7}
              textAlign="center"
            />
            <p className="text-base text-gray-600 dark:text-gray-400 font-secondary max-w-2xl mx-auto">
              Discover our range of premium toilets featuring intelligent technology, efficient performance, 
              and elegant design to elevate your bathroom experience.
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar - Filter Panel (Same as ExploreMirrors) */}
            <motion.aside
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full lg:w-80 flex-shrink-0 space-y-4"
            >
              {/* Filter Header */}
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-normal text-gray-900 dark:text-white font-serif">
                  Filters
                </h3>
                {selectedCategory !== 'all' && (
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="text-xs text-[#001f54] dark:text-[#0466c8] hover:underline font-secondary"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white font-secondary">
                    Category
                  </h4>
                  <motion.svg
                    animate={{ rotate: isCategoryOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </motion.svg>
                </button>
                <AnimatePresence>
                  {isCategoryOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 space-y-1">
                        {categories.map((category) => (
                          <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`w-full text-left px-3 py-2 rounded-xl text-sm font-secondary transition-all flex items-center justify-between ${
                              selectedCategory === category.id
                                ? 'bg-[#001f54] text-white'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                            }`}
                          >
                            <span>{category.name}</span>
                            <span className="text-xs opacity-70">{category.count}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.aside>

            {/* Right Content - Products Grid */}
            <div className="flex-1">
              {/* Results Count */}
              <div className="mb-6">
                <p className="text-sm text-gray-600 dark:text-gray-400 font-secondary">
                  Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredToilets.length}</span> {filteredToilets.length === 1 ? 'toilet' : 'toilets'}
                </p>
              </div>

              {/* Products Grid - Smaller cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredToilets.map((toilet, index) => (
                  <motion.div
                    key={toilet.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <Link to={`/products/toilets/${toilet.slug}`}>
                      <div className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-500 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)]">
                        {/* Image Container */}
                        <div className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-gray-800">
                          <img 
                            src={toilet.image} 
                            alt={`${toilet.name} - Premium toilet`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          {/* Smart Badge - Minimalistic */}
                          {toilet.category === 'intelligent' && (
                            <div className="absolute top-2 right-2">
                              <span className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-gray-900 dark:text-white px-2 py-1 text-xs font-medium rounded-md border border-gray-200 dark:border-gray-700">
                                Smart
                              </span>
                            </div>
                          )}
                        </div>
                        
                        {/* Content */}
                        <div className="p-3">
                          <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-500 mb-1 font-secondary">
                            {toilet.brand}
                          </p>
                          <h3 className="text-sm font-normal text-gray-900 dark:text-white mb-1 font-serif group-hover:text-[#001f54] dark:group-hover:text-[#0466c8] transition-colors line-clamp-1">
                            {toilet.name}
                          </h3>
                          
                          {toilet.shortDescription && (
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 font-secondary line-clamp-2">
                              {toilet.shortDescription}
                            </p>
                          )}

                          {/* View Details Link */}
                          <div className="flex items-center gap-1 text-xs font-medium text-[#001f54] dark:text-[#0466c8]">
                            <span className="relative">
                              View details
                              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#001f54] dark:bg-[#0466c8] transition-all duration-300 group-hover:w-full"></span>
                            </span>
                            <svg 
                              className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Right Aligned */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative order-2 lg:order-1"
            >
              <div className="aspect-square rounded-3xl overflow-hidden">
                <img
                  src="/Images/products/toilets-images/4K_top-1024x621.png"
                  alt="Smart toilet features"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Right Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6 order-1 lg:order-2"
            >
              <p className="text-sm uppercase tracking-wider text-gray-600 dark:text-gray-400 font-secondary">
                Advanced Technology
              </p>
              <SplitText
                text="Intelligent toilet features"
                tag="h2"
                className="text-4xl md:text-5xl font-normal text-gray-900 dark:text-white font-serif leading-tight"
                splitType="chars"
                delay={35}
                duration={0.8}
                textAlign="left"
              />
              <p className="text-base text-gray-600 dark:text-gray-400 font-secondary leading-relaxed">
                Experience the future of bathroom comfort with advanced features including heated seats, 
                bidet functionality, automatic flushing, LED lighting, and AI-powered smart controls that 
                adapt to your preferences.
              </p>

              {/* Features Tags */}
              <div className="flex flex-wrap gap-2 pt-4">
                <span className="px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium font-secondary border border-gray-200 dark:border-gray-700">
                  Heated Seats
                </span>
                <span className="px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium font-secondary border border-gray-200 dark:border-gray-700">
                  Bidet Function
                </span>
                <span className="px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium font-secondary border border-gray-200 dark:border-gray-700">
                  Auto Flush
                </span>
                <span className="px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium font-secondary border border-gray-200 dark:border-gray-700">
                  LED Lighting
                </span>
                <span className="px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium font-secondary border border-gray-200 dark:border-gray-700">
                  Water Saving
                </span>
                <span className="px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium font-secondary border border-gray-200 dark:border-gray-700">
                  Comfort Height
                </span>
              </div>

              <div className="pt-4">
                <Link to="/quote">
                  <Button variant="primary" size="md" className="flex items-center gap-2">
                    Get a quote
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

      {/* Newsletter Banner */}
      <NewsletterBanner />
    </div>
  );
};

export default Toilets;
