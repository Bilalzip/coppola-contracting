import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import SplitText from '../../../components/ui/SplitText';
import { supabase } from '../../../lib/supabase';
import type { Product } from '../../../types/database';

const Vanities = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedFinishes, setSelectedFinishes] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [openSections, setOpenSections] = useState({
    size: false,
    brand: false,
    finish: false
  });

  useEffect(() => {
    document.title = 'Premium Vanities | Coppola Home';
    window.scrollTo(0, 0);

    const checkMobile = () => {
      if (window.innerWidth >= 1024) setIsFilterOpen(true);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    supabase
      .from('products')
      .select('*')
      .eq('category', 'vanity')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setProducts(data ?? []);
        setLoading(false);
      });
  }, []);

  // Extract unique filter values from DB products
  const sizes = Array.from(new Set(products.map(p => p.filters?.size).filter(Boolean))).sort() as string[];
  const finishes = Array.from(new Set(products.map(p => p.filters?.finish).filter(Boolean))).sort() as string[];
  const brands = Array.from(new Set(products.map(p => p.brand).filter(Boolean))).sort() as string[];

  const toggleSize = (size: string) =>
    setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);

  const toggleFinish = (finish: string) =>
    setSelectedFinishes(prev => prev.includes(finish) ? prev.filter(f => f !== finish) : [...prev, finish]);

  const toggleBrand = (brand: string) =>
    setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);

  const toggleSection = (section: 'size' | 'brand' | 'finish') =>
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSize = selectedSizes.length === 0 || (product.filters?.size && selectedSizes.includes(product.filters.size));
    const matchesFinish = selectedFinishes.length === 0 || (product.filters?.finish && selectedFinishes.includes(product.filters.finish));
    const matchesBrand = selectedBrands.length === 0 || (product.brand && selectedBrands.includes(product.brand));
    return matchesSize && matchesFinish && matchesBrand;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedSizes, selectedFinishes, selectedBrands]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  // Filter Section Component
  const FilterSection = ({ 
    title, 
    options, 
    selected, 
    onToggle: onToggleItem,
    isOpen,
    onToggleSection 
  }: {
    title: string;
    options: string[];
    selected: string[];
    onToggle: (value: string) => void;
    isOpen: boolean;
    onToggleSection: () => void;
  }) => (
    <div className="border-b border-gray-200 dark:border-gray-800">
      <button
        onClick={onToggleSection}
        className="w-full flex items-center justify-between py-4 px-5 text-left hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
      >
        <span className="text-base font-semibold text-gray-900 dark:text-white font-['Poppins',sans-serif]">
          {title}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4 space-y-3 max-h-64 overflow-y-auto">
              {options.map(option => (
                <label key={option} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selected.includes(option)}
                    onChange={() => onToggleItem(option)}
                    className="w-4 h-4 rounded border-2 border-gray-300 dark:border-gray-600 text-[#5b51ff] focus:ring-[#5b51ff] focus:ring-offset-0 cursor-pointer"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white font-['Poppins',sans-serif]">
                    {option}
                  </span>
                </label>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] pt-24">
      {/* Hero Header */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <img
            src="/Images/products/vanities-images/coppolahome-vanity/vanities-header.jpg"
            alt="Premium Vanities"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
        </motion.div>

        <div className="relative h-full flex items-center justify-center px-4">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <SplitText
                text="Premium Vanities"
                tag="h1"
                className="text-page-title font-semibold text-white mb-6 leading-tight"
                style={{ fontFamily: "'EB Garamond', serif" }}
                splitType="chars"
                delay={30}
                duration={0.8}
                textAlign="center"
              />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-base md:text-lg text-white/90 font-['Poppins',sans-serif]"
            >
              Crafted with precision. Designed to elevate your bathroom.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Filter Button & Results Count */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400 font-['Poppins',sans-serif]">
              Showing {visibleProducts.length} of {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </p>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 font-['Poppins',sans-serif]">
                Filters
              </span>
              {(selectedSizes.length + selectedFinishes.length + selectedBrands.length) > 0 && (
                <span className="ml-1 px-2 py-0.5 bg-[#5b51ff] text-white text-xs font-semibold rounded-full">
                  {selectedSizes.length + selectedFinishes.length + selectedBrands.length}
                </span>
              )}
            </button>
          </div>

          <div className="flex gap-6">
            {/* Filter Sidebar - Collapsible */}
            <AnimatePresence>
              {isFilterOpen && (
                <motion.aside
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 320, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 overflow-hidden"
                >
                  <div className="w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden sticky top-24">
                    <FilterSection
                      title="Size"
                      options={sizes}
                      selected={selectedSizes}
                      onToggle={toggleSize}
                      isOpen={openSections.size}
                      onToggleSection={() => toggleSection('size')}
                    />
                    
                    <FilterSection
                      title="Brand"
                      options={brands}
                      selected={selectedBrands}
                      onToggle={toggleBrand}
                      isOpen={openSections.brand}
                      onToggleSection={() => toggleSection('brand')}
                    />
                    
                    <FilterSection
                      title="Finish"
                      options={finishes}
                      selected={selectedFinishes}
                      onToggle={toggleFinish}
                      isOpen={openSections.finish}
                      onToggleSection={() => toggleSection('finish')}
                    />

                    {/* Clear Filters Button */}
                    {(selectedSizes.length + selectedFinishes.length + selectedBrands.length) > 0 && (
                      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                        <button
                          onClick={() => {
                            setSelectedSizes([]);
                            setSelectedFinishes([]);
                            setSelectedBrands([]);
                          }}
                          className="w-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-['Poppins',sans-serif]"
                        >
                          Clear All Filters
                        </button>
                      </div>
                    )}
                  </div>
                </motion.aside>
              )}
            </AnimatePresence>

            {/* Products Grid */}
            <div className="flex-1">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden animate-pulse">
                      <div className="aspect-square bg-gray-200 dark:bg-gray-800" />
                      <div className="p-5 space-y-3">
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-500 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)] cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    whileHover={{ y: -5 }}
                  >
                    <Link to={`/products/vanities/${product.slug}`} className="block">
                      {/* Image */}
                      <div className="aspect-square bg-gray-100 dark:bg-gray-800 overflow-hidden">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <div className="flex items-start justify-between mb-2">
                          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 font-['Poppins',sans-serif]">
                            {product.brand}
                          </span>
                          {product.filters?.size && (
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 font-['Poppins',sans-serif]">
                              {product.filters.size}
                            </span>
                          )}
                        </div>
                        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3 font-['Poppins',sans-serif] group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                        <div className="flex items-center text-sm font-normal text-gray-900 dark:text-white transition-colors">
                          <span className="relative font-['Poppins',sans-serif]">
                            View Details
                            <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-gray-900 dark:bg-white transition-all duration-300 group-hover:w-full"></span>
                          </span>
                          <svg className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}

                {filteredProducts.length === 0 && (
                  <div className="col-span-full text-center py-16">
                    <p className="text-gray-500 dark:text-gray-400 font-['Poppins',sans-serif]">
                      No products match your filters. Try adjusting your selection.
                    </p>
                  </div>
                )}
              </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center items-center gap-2">
                  {/* Previous Button */}
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-2 text-sm font-medium transition-colors ${
                      currentPage === 1
                        ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                        : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {/* Page Numbers */}
                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                      // Show first page, last page, current page, and pages around current
                      const showPage = 
                        page === 1 || 
                        page === totalPages || 
                        (page >= currentPage - 1 && page <= currentPage + 1);
                      
                      const showEllipsis = 
                        (page === currentPage - 2 && currentPage > 3) ||
                        (page === currentPage + 2 && currentPage < totalPages - 2);

                      if (showEllipsis) {
                        return (
                          <span key={page} className="px-3 py-2 text-gray-500 dark:text-gray-400">
                            ...
                          </span>
                        );
                      }

                      if (!showPage) return null;

                      return (
                        <button
                          key={page}
                          onClick={() => goToPage(page)}
                          className={`px-4 py-2 text-sm font-medium transition-colors ${
                            currentPage === page
                              ? 'text-gray-900 dark:text-white font-semibold'
                              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-2 text-sm font-medium transition-colors ${
                      currentPage === totalPages
                        ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                        : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
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

export default Vanities;
