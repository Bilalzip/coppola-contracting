import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../../lib/supabase';
import type { Product } from '../../../types/database';
import SplitText from '../../../components/ui/SplitText';

const ExploreSinks = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isColorOpen, setIsColorOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(9);

  useEffect(() => {
    document.title = 'Explore Sinks | Coppola Home';
    window.scrollTo(0, 0);
    supabase.from('products').select('*').eq('category', 'sink').order('created_at', { ascending: false }).then(({ data }) => { setProducts(data ?? []); setLoading(false); });

    // Check screen size
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsFilterOpen(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Sink types
  const sinkTypes = ['Bathroom', 'Kitchen', 'Undermount', 'Vessel'];

  // Colors (in order provided)
  const colors = ['Black', 'Gray', 'White', 'Brushed Satin', 'Graphite Black'];

  // Categories (alphabetically ordered)
  const categories = [
    'Bright',
    'builder',
    'Clever',
    'completo',
    'elevare',
    'Laundry',
    'pietra',
    'Styluxe',
    'Versa'
  ];

  // Get unique categories with product counts
  const categoryData = categories.map(category => {
    const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
    const productsInCategory = products.filter(product => {
      const matchesType = selectedType === 'all' ||
        (product.filters?.sink_type && product.filters.sink_type.toLowerCase() === selectedType.toLowerCase());
      const matchesColor = selectedColor === 'all' ||
        (product.filters?.color && product.filters.color.toLowerCase() === selectedColor.toLowerCase().replace(/\s+/g, '-'));
      const matchesCategory = product.tags?.includes(categorySlug);
      return matchesType && matchesColor && matchesCategory;
    }).length;

    return {
      name: category,
      slug: categorySlug,
      count: productsInCategory
    };
  });

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesType = selectedType === 'all' ||
      (product.filters?.sink_type && product.filters.sink_type.toLowerCase() === selectedType.toLowerCase());
    const matchesColor = selectedColor === 'all' ||
      (product.filters?.color && product.filters.color.toLowerCase() === selectedColor.toLowerCase().replace(/\s+/g, '-'));
    const matchesCategory = !selectedCategory ||
      (product.tags && product.tags.includes(selectedCategory));

    return matchesType && matchesColor && matchesCategory;
  });

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 9);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#000000]">
      {/* Header Section */}
      <section className="relative h-[50vh] w-full overflow-hidden">
        {/* Background Image with Zoom Out Animation */}
        <motion.div 
          className="absolute inset-0"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <img
            src="/assets/gallery/kitchen-sink-header-image.jpg"
            alt="Explore Sinks"
            className="w-full h-full object-cover"
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex flex-col justify-center">
          {/* Back Button */}
          <Link 
            to="/products/sinks"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors mb-6 font-secondary text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Sinks
          </Link>

          {/* Heading */}
          <SplitText
            text="Explore Coppola Home Sinks"
            tag="h1"
            className="text-page-title font-normal text-white mb-4 font-serif"
            splitType="chars"
            delay={30}
            duration={0.8}
            textAlign="left"
          />
          <p className="text-base text-white/90 font-secondary max-w-2xl">
            Discover our complete collection of premium sinks for every space
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Filter Button - Mobile Only */}
          <div className="lg:hidden mb-6">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl text-gray-900 dark:text-white font-medium hover:border-[#001f54] dark:hover:border-[#0466c8] transition-all shadow-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span>Filters</span>
              {(selectedType !== 'all' || selectedColor !== 'all' || selectedCategory) && (
                <span className="w-2 h-2 bg-[#001f54] dark:bg-[#0466c8] rounded-full"></span>
              )}
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar - Filter Panel */}
            <AnimatePresence mode="wait">
              {(isFilterOpen || !isMobile) && (
                <motion.aside
                  initial={isMobile ? { x: -100, opacity: 0 } : false}
                  animate={{ x: 0, opacity: 1 }}
                  exit={isMobile ? { x: -100, opacity: 0 } : {}}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="w-full lg:w-80 flex-shrink-0 space-y-4"
                >
                  {/* Filter Header */}
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-normal text-gray-900 dark:text-white font-serif">
                      Filters
                    </h3>
                    {(selectedType !== 'all' || selectedColor !== 'all' || selectedCategory) && (
                      <button
                        onClick={() => {
                          setSelectedType('all');
                          setSelectedColor('all');
                          setSelectedCategory(null);
                        }}
                        className="text-xs text-[#001f54] dark:text-[#0466c8] hover:underline font-secondary"
                      >
                        Clear all
                      </button>
                    )}
                  </div>

                  {/* Type Filter */}
                  <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setIsTypeOpen(!isTypeOpen)}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white font-secondary">
                        Type
                      </h4>
                      <motion.svg
                        animate={{ rotate: isTypeOpen ? 45 : 0 }}
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
                      {isTypeOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 space-y-2">
                            <button
                              onClick={() => setSelectedType('all')}
                              className={`w-full text-left px-4 py-2.5 rounded-xl transition-all font-secondary text-sm ${
                                selectedType === 'all'
                                  ? 'bg-[#001f54] dark:bg-[#0466c8] text-white'
                                  : 'bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                              }`}
                            >
                              All Types
                            </button>
                            {sinkTypes.map((type) => (
                              <button
                                key={type}
                                onClick={() => setSelectedType(type)}
                                className={`w-full text-left px-4 py-2.5 rounded-xl transition-all font-secondary text-sm ${
                                  selectedType === type
                                    ? 'bg-[#001f54] dark:bg-[#0466c8] text-white'
                                    : 'bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                              >
                                {type}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Color Filter */}
                  <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setIsColorOpen(!isColorOpen)}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white font-secondary">
                        Color
                      </h4>
                      <motion.svg
                        animate={{ rotate: isColorOpen ? 45 : 0 }}
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
                      {isColorOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 space-y-2">
                            <button
                              onClick={() => setSelectedColor('all')}
                              className={`w-full text-left px-4 py-2.5 rounded-xl transition-all font-secondary text-sm ${
                                selectedColor === 'all'
                                  ? 'bg-[#001f54] dark:bg-[#0466c8] text-white'
                                  : 'bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                              }`}
                            >
                              All Colors
                            </button>
                            {colors.map((color) => (
                              <button
                                key={color}
                                onClick={() => setSelectedColor(color)}
                                className={`w-full text-left px-4 py-2.5 rounded-xl transition-all font-secondary text-sm ${
                                  selectedColor === color
                                    ? 'bg-[#001f54] dark:bg-[#0466c8] text-white'
                                    : 'bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                              >
                                {color}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Categories Filter */}
                  <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white font-secondary">
                        Categories
                      </h4>
                      <motion.svg
                        animate={{ rotate: isCategoriesOpen ? 45 : 0 }}
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
                      {isCategoriesOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 space-y-2 max-h-80 overflow-y-auto">
                            {categoryData.map((category) => (
                              <button
                                key={category.slug}
                                onClick={() => setSelectedCategory(
                                  selectedCategory === category.slug ? null : category.slug
                                )}
                                className={`w-full text-left px-4 py-2.5 rounded-xl transition-all font-secondary text-sm flex items-center justify-between ${
                                  selectedCategory === category.slug
                                    ? 'bg-[#001f54] dark:bg-[#0466c8] text-white'
                                    : 'bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                              >
                                <span>{category.name}</span>
                                <span className={`text-xs ${
                                  selectedCategory === category.slug
                                    ? 'text-white/80'
                                    : 'text-gray-500 dark:text-gray-400'
                                }`}>
                                  {category.count}
                                </span>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.aside>
              )}
            </AnimatePresence>

            {/* Right Content - Products Grid */}
            <div className="flex-1">
              {/* Results Count */}
              <div className="mb-6">
                <p className="text-sm text-gray-600 dark:text-gray-400 font-secondary">
                  Showing <span className="font-medium text-gray-900 dark:text-white">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'sink' : 'sinks'}
                </p>
              </div>

              {/* Products Grid */}
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden animate-pulse">
                      <div className="aspect-square bg-gray-200 dark:bg-gray-800" />
                      <div className="p-4 space-y-2">
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : displayedProducts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                      >
                        <Link
                          to={`/products/sinks/${product.slug}`}
                          className="group block bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-500 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)]"
                        >
                          {/* Image */}
                          <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-800 overflow-hidden">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>

                          {/* Content */}
                          <div className="p-5">
                            <h3 className="text-lg font-normal text-gray-900 dark:text-white mb-1.5 group-hover:text-[#001f54] dark:group-hover:text-[#0466c8] transition-colors font-serif line-clamp-2">
                              {product.name}
                            </h3>
                            <p className="text-xs text-gray-600 dark:text-gray-400 font-secondary line-clamp-1">
                              {product.short_description}
                            </p>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {/* Load More Button */}
                  {hasMore && (
                    <div className="mt-12 text-center">
                      <button
                        onClick={handleLoadMore}
                        className="px-8 py-3 bg-white dark:bg-gray-900 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white rounded-2xl font-medium hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all duration-300"
                      >
                        Load More
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-20">
                  <svg className="w-20 h-20 mx-auto text-gray-300 dark:text-gray-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-xl font-normal text-gray-900 dark:text-white mb-2 font-serif">
                    No sinks found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 font-secondary mb-6">
                    Try adjusting your filters to see more results
                  </p>
                  <button
                    onClick={() => {
                      setSelectedType('all');
                      setSelectedColor('all');
                      setSelectedCategory(null);
                    }}
                    className="text-[#001f54] dark:text-[#0466c8] hover:underline font-secondary"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExploreSinks;

