import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, Minus, X } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import type { Product } from '../../../types/database';
import NewsletterBanner from '../../../components/layout/NewsletterBanner';
import SplitText from '../../../components/ui/SplitText';
import Button from '../../../components/ui/Button';

const CATEGORIES = [
  'All', 'Apron', 'Bright', 'Builder', 'Canda', 'Completo', 
  'Clever', 'Cube', 'Elevare', 'Laundry', 'Onyxo', 'Pietra', 
  'Pietra K+', 'Styluxe', 'Versa'
];

const COLORS = ['Black', 'Gray', 'White', 'Brushed Satin', 'Graphite Black'];

const MATERIALS = ['Granite Composite', 'Stainless Steel Sinks'];

const KitchenSinks = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedColor, setSelectedColor] = useState<string>('All');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('All');
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isColorOpen, setIsColorOpen] = useState(true);
  const [isMaterialOpen, setIsMaterialOpen] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    document.title = 'Kitchen Sinks | Coppola Home';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Professional-grade kitchen sinks built for culinary excellence. Durable surfaces that withstand daily kitchen demands.'
      );
    }
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

  // Filter products for kitchen sinks
  const kitchenProducts = products.filter((product) => product.filters?.sink_type === 'Kitchen');

  // Apply filters
  const filteredProducts = kitchenProducts.filter((product) => {
    const categoryMatch = selectedCategory === 'All' ||
      product.brand?.toLowerCase().includes(selectedCategory.toLowerCase());
    const colorMatch = selectedColor === 'All' ||
      product.filters?.finish?.toLowerCase().includes(selectedColor.toLowerCase());
    const materialMatch = selectedMaterial === 'All' ||
      product.filters?.material?.toLowerCase().includes(selectedMaterial.toLowerCase());

    return categoryMatch && colorMatch && materialMatch;
  });

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedColor('All');
    setSelectedMaterial('All');
  };

  const FilterSection = () => (
    <div className="space-y-4">
      {/* Category Filter */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
        <button
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <h4 className="text-sm font-medium text-gray-900 dark:text-white font-secondary">
            Options
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
              <div className="px-5 pb-5 space-y-3">
                {CATEGORIES.map((category) => (
                  <label key={category} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === category}
                      onChange={() => setSelectedCategory(category)}
                      className="w-4 h-4 text-[#001f54] focus:ring-[#001f54] focus:ring-offset-0 cursor-pointer"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-[#001f54] dark:group-hover:text-[#0466c8] transition-colors font-secondary">
                      {category}
                    </span>
                  </label>
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
          className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <h4 className="text-sm font-medium text-gray-900 dark:text-white font-secondary">
            Colour
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
              <div className="px-5 pb-5 space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="color"
                    checked={selectedColor === 'All'}
                    onChange={() => setSelectedColor('All')}
                    className="w-4 h-4 text-[#001f54] focus:ring-[#001f54] focus:ring-offset-0 cursor-pointer"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-[#001f54] dark:group-hover:text-[#0466c8] transition-colors font-secondary">
                    All
                  </span>
                </label>
                {COLORS.map((color) => (
                  <label key={color} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="color"
                      checked={selectedColor === color}
                      onChange={() => setSelectedColor(color)}
                      className="w-4 h-4 text-[#001f54] focus:ring-[#001f54] focus:ring-offset-0 cursor-pointer"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-[#001f54] dark:group-hover:text-[#0466c8] transition-colors font-secondary">
                      {color}
                    </span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Material Filter */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
        <button
          onClick={() => setIsMaterialOpen(!isMaterialOpen)}
          className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <h4 className="text-sm font-medium text-gray-900 dark:text-white font-secondary">
            Material
          </h4>
          <motion.svg
            animate={{ rotate: isMaterialOpen ? 45 : 0 }}
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
          {isMaterialOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="material"
                    checked={selectedMaterial === 'All'}
                    onChange={() => setSelectedMaterial('All')}
                    className="w-4 h-4 text-[#001f54] focus:ring-[#001f54] focus:ring-offset-0 cursor-pointer"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-[#001f54] dark:group-hover:text-[#0466c8] transition-colors font-secondary">
                    All
                  </span>
                </label>
                {MATERIALS.map((material) => (
                  <label key={material} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="material"
                      checked={selectedMaterial === material}
                      onChange={() => setSelectedMaterial(material)}
                      className="w-4 h-4 text-[#001f54] focus:ring-[#001f54] focus:ring-offset-0 cursor-pointer"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-[#001f54] dark:group-hover:text-[#0466c8] transition-colors font-secondary">
                      {material}
                    </span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Clear Filters */}
      {(selectedCategory !== 'All' || selectedColor !== 'All' || selectedMaterial !== 'All') && (
        <button
          onClick={clearFilters}
          className="w-full px-4 py-2 text-sm text-[#001f54] dark:text-[#0466c8] hover:underline transition-colors"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-[#000000] motion-safe:animate-fadeIn">
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
            src="/assets/gallery/kitchen-sinks-header-image.jpg"
            alt="Kitchen Sinks"
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

          {/* Heading with SplitText */}
          <SplitText
            text="Kitchen Sinks"
            tag="h1"
            className="text-page-title font-normal text-white mb-4 font-serif"
            splitType="chars"
            delay={35}
            duration={0.8}
            textAlign="left"
          />
          <p className="text-base text-white/90 font-secondary max-w-2xl">
            Professional-grade sinks built for culinary excellence. Durable surfaces that withstand daily kitchen demands.
          </p>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Filter Button - Mobile Only */}
          <div className="lg:hidden mb-6">
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl text-gray-900 dark:text-white font-medium hover:border-[#001f54] dark:hover:border-[#0466c8] transition-all shadow-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span>Filters</span>
              {(selectedCategory !== 'All' || selectedColor !== 'All' || selectedMaterial !== 'All') && (
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
                  className="w-full lg:w-80 flex-shrink-0"
                >
                  {/* Filter Header */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-normal text-gray-900 dark:text-white font-serif">
                      Filters
                    </h3>
                    {(selectedCategory !== 'All' || selectedColor !== 'All' || selectedMaterial !== 'All') && (
                      <button
                        onClick={clearFilters}
                        className="text-xs text-[#001f54] dark:text-[#0466c8] hover:underline font-secondary"
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                  <FilterSection />
                </motion.aside>
              )}
            </AnimatePresence>

            {/* Mobile Filter Drawer - Keep for backwards compatibility if needed */}
            {isMobileFilterOpen && isMobile && (
              <div className="fixed inset-0 z-50 lg:hidden">
                <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileFilterOpen(false)} />
                <div className="absolute right-0 top-0 bottom-0 w-80 max-w-full bg-white dark:bg-gray-900 p-6 overflow-y-auto motion-safe:animate-slideLeft">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-serif text-gray-900 dark:text-white">Filters</h2>
                    <button
                      onClick={() => setIsMobileFilterOpen(false)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <FilterSection />
                </div>
              </div>
            )}

            {/* Products Grid */}
            <div className="flex-1 min-w-0">
              {/* Results Count */}
              <div className="mb-6">
                <p className="text-sm text-gray-600 dark:text-gray-400 font-secondary">
                  Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'sink' : 'sinks'}
                </p>
              </div>

              {/* Products */}
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden animate-pulse">
                      <div className="aspect-square bg-gray-200 dark:bg-gray-800" />
                      <div className="p-4 space-y-2">
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                      <Link
                        to={`/products/sinks/${product.slug}`}
                        className="group bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-500 block shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)]"
                      >
                        {/* Image Container */}
                        <div className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-gray-800">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>

                        {/* Content */}
                        <div className="p-4">
                          <h3 className="text-base font-normal text-gray-900 dark:text-white mb-1.5 font-serif group-hover:text-[#001f54] dark:group-hover:text-[#0466c8] transition-colors line-clamp-2">
                            {product.name}
                          </h3>
                          {product.brand && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 font-secondary mb-3">
                              {product.brand}
                            </p>
                          )}
                          
                          {/* View Details Link */}
                          <div className="flex items-center gap-2 text-sm font-medium text-[#001f54] dark:text-[#0466c8]">
                            <span className="relative">
                              View Details
                              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#001f54] dark:bg-[#0466c8] transition-all duration-300 group-hover:w-full"></span>
                            </span>
                            <svg 
                              className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                            </svg>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <svg className="w-20 h-20 text-gray-300 dark:text-gray-700 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <h3 className="text-xl font-normal text-gray-900 dark:text-white mb-2 font-serif">
                    No sinks found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 font-secondary mb-4">
                    Try adjusting your filters to find more products.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-[#001f54] dark:text-[#0466c8] hover:underline font-secondary"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-gray-900 dark:text-white leading-tight font-serif">
            Need help choosing the perfect kitchen sink?
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto font-secondary">
            Our experts are here to help you find the ideal sink for your kitchen.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/quote">
              <Button variant="primary" size="md">
                Get a Quote
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="md">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Banner */}
      <NewsletterBanner />
    </div>
  );
};

export default KitchenSinks;

