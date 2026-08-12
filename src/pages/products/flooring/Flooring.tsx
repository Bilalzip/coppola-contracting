import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { flooringProducts } from '../../../data/flooringProducts';
import SplitText from '../../../components/ui/SplitText';
import Button from '../../../components/ui/Button';

const Flooring = (): JSX.Element => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<{
    category: string[];
    thickness: string[];
  }>({
    category: [],
    thickness: []
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const faqs = [
    {
      question: "What types of flooring do you carry?",
      answer: "We carry Engineered Hardwood with real 2mm and 3mm American and European Oak wear layers, Luxury Vinyl Plank in Home 55mil and Estate 65mil collections, and Luxury LooseLay Vinyl with an I4F locking system — all crafted for residential and commercial use."
    },
    {
      question: "Is your flooring waterproof?",
      answer: "Our Luxury Vinyl and LooseLay collections are 100% waterproof, ideal for kitchens, bathrooms, and basements. Engineered Hardwood provides superior moisture resistance compared to solid hardwood and is best suited for above-grade or on-grade installations."
    },
    {
      question: "What warranties do your flooring products come with?",
      answer: "Warranty varies by collection. Engineered Hardwood carries a 30-Year Residential warranty. Luxury LooseLay and Estate Luxury Vinyl (65mil) both include Lifetime Residential warranties. All products include manufacturer warranties covering structural integrity and finish defects."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const toggleFilter = (category: keyof typeof selectedFilters, value: string) => {
    setSelectedFilters(prev => {
      const currentValues = prev[category];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];

      return {
        ...prev,
        [category]: newValues
      };
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      category: [],
      thickness: []
    });
    setCurrentPage(1);
  };

  const getActiveFilterCount = () => {
    return Object.values(selectedFilters).reduce((total, filters) => total + filters.length, 0);
  };

  const filteredProducts = useMemo(() => {
    if (getActiveFilterCount() === 0) {
      return flooringProducts;
    }

    return flooringProducts.filter(product => {
      // Check category filter
      if (selectedFilters.category.length > 0) {
        const hasMatchingCategory = selectedFilters.category.some(filter =>
          product.tags?.some(tag => tag.toLowerCase().includes(filter.toLowerCase()))
        );
        if (!hasMatchingCategory) {
          return false;
        }
      }

      // Check thickness filter
      if (selectedFilters.thickness.length > 0) {
        const hasMatchingThickness = selectedFilters.thickness.some(filter =>
          product.tags?.some(tag => tag.toLowerCase().includes(filter.toLowerCase()))
        );
        if (!hasMatchingThickness) {
          return false;
        }
      }

      return true;
    });
  }, [selectedFilters]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedFilters]);

  const filterSections = [
    {
      id: 'category',
      title: 'Flooring Category',
      options: [
        { value: 'engineered-hardwood', label: 'Engineered Hardwood', count: flooringProducts.filter(p => p.tags?.includes('engineered-hardwood')).length },
        { value: 'luxury-loose-lay', label: 'Luxury LooseLay', count: flooringProducts.filter(p => p.tags?.includes('luxury-loose-lay')).length },
        { value: 'luxury-vinyl', label: 'Luxury Vinyl', count: flooringProducts.filter(p => p.tags?.includes('luxury-vinyl')).length }
      ]
    }
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
                  text="Premium flooring for every space"
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
                Transform your space with our exquisite collection of engineered hardwood, luxury vinyl, and LooseLay flooring solutions.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <a href="#collections">
                  <Button variant="primary" size="md">
                    Explore Collections
                  </Button>
                </a>
                <Link to="/quote">
                  <Button variant="outline" size="md">
                    Get a Quote
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
              backgroundImage: 'url(/Images/products/flooring-images/SUNSET-GREY.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
          </motion.div>
        </div>
      </motion.section>

      {/* Flooring Collections Section */}
      <section id="collections" className="py-24 px-4 bg-white dark:bg-[#0a0a0a]">
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
              Flooring
            </p>
            <SplitText
              text="Our flooring collection"
              tag="h2"
              className="text-4xl md:text-5xl font-normal text-gray-900 dark:text-white mb-4 font-serif"
              splitType="chars"
              delay={30}
              duration={0.7}
            />
            <p className="text-base text-gray-600 dark:text-gray-400 font-secondary max-w-2xl mx-auto">
              Engineered for durability and designed for beauty in every room.
            </p>
          </motion.div>

          {/* Collections Grid - 2 Small Cards + 1 Large Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1fr_2fr] gap-6 mt-14">
            {/* Engineered Hardwood Card - Small */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group bg-gray-50 dark:bg-gray-900 rounded-3xl overflow-hidden transition-all duration-500 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
            >
              <a href="#catalog" onClick={() => {
                toggleFilter('category', 'engineered-hardwood');
                setTimeout(() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' }), 100);
              }} className="block">
                {/* Image Section */}
                <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-800 overflow-hidden">
                  <img 
                    src="/Images/products/flooring-images/Screenshot 2025-09-02 102611.png" 
                    alt="Engineered hardwood flooring"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Content Section */}
                <div className="p-5">
                  <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-500 mb-1.5 font-secondary">
                    Premium
                  </p>
                  <h3 className="text-lg font-normal text-gray-900 dark:text-white mb-2 group-hover:text-[#001f54] dark:group-hover:text-[#0466c8] transition-colors font-serif">
                    Engineered hardwood
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 font-secondary leading-relaxed">
                    Real American & European Oak with superior moisture resistance
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
              </a>
            </motion.div>

            {/* Luxury Vinyl Card - Small */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group bg-gray-50 dark:bg-gray-900 rounded-3xl overflow-hidden transition-all duration-500 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
            >
              <a href="#catalog" onClick={() => {
                toggleFilter('category', 'luxury-vinyl');
                setTimeout(() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' }), 100);
              }} className="block">
                {/* Image Section */}
                <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-800 overflow-hidden">
                  <img 
                    src="https://triforestfloors.com/wp-content/uploads/2021/08/FLS1012-Ranch-scaled.jpg" 
                    alt="Luxury vinyl flooring"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Content Section */}
                <div className="p-5">
                  <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-500 mb-1.5 font-secondary">
                    Durable
                  </p>
                  <h3 className="text-lg font-normal text-gray-900 dark:text-white mb-2 group-hover:text-[#001f54] dark:group-hover:text-[#0466c8] transition-colors font-serif">
                    Luxury vinyl
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 font-secondary leading-relaxed">
                    100% waterproof with lifetime residential warranty
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
              </a>
            </motion.div>

            {/* LooseLay Card - Large Horizontal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group bg-white dark:bg-gray-900 rounded-3xl overflow-hidden transition-all duration-500 md:col-span-2 lg:col-span-1 border border-gray-200 dark:border-gray-800 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)] hover:border-gray-400 dark:hover:border-gray-600"
            >
              <a href="#catalog" onClick={() => {
                toggleFilter('category', 'luxury-loose-lay');
                setTimeout(() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' }), 100);
              }} className="block h-full">
                <div className="flex flex-col lg:flex-row h-full">
                  {/* Large Image Section - Left Half */}
                  <div className="lg:w-1/2 h-64 lg:h-auto bg-gray-200 dark:bg-gray-800 overflow-hidden">
                    <img 
                      src="https://triforestfloors.com/wp-content/uploads/2021/08/FLL6010-Urban-Maple-min-scaled.jpg" 
                      alt="Luxury LooseLay vinyl flooring"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  {/* Content Section - Right Half */}
                  <div className="lg:w-1/2 p-8 flex flex-col justify-center bg-white dark:bg-gray-900">
                    <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-500 mb-2 font-secondary">
                      Versatile
                    </p>
                    <h3 className="text-2xl font-normal text-gray-900 dark:text-white mb-3 group-hover:text-[#001f54] dark:group-hover:text-[#0466c8] transition-colors font-serif">
                      Luxury LooseLay
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 font-secondary leading-relaxed">
                      I4F locking system with extreme scratch resistance
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
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Catalog Section */}
      <section id="catalog" className="py-20 px-4 bg-gray-50 dark:bg-[#000000]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Filter Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 sticky top-24 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                <div className="space-y-6">
                  {/* Filter Sections */}
                  {filterSections.map((section) => (
                    <div key={section.id} className="border-b border-gray-200 dark:border-gray-800 pb-6 last:border-b-0 last:pb-0">
                      {/* Section Header */}
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 font-secondary uppercase tracking-wider">
                        {section.title}
                      </h3>

                      {/* Filter Options */}
                      <ul className="space-y-3">
                        {section.options.map((option) => (
                          <li key={option.value}>
                            <label className="flex items-center justify-between cursor-pointer group">
                              <div className="flex items-center gap-3">
                                <input
                                  type="checkbox"
                                  checked={selectedFilters[section.id as keyof typeof selectedFilters]?.includes(option.value) || false}
                                  onChange={() => toggleFilter(section.id as keyof typeof selectedFilters, option.value)}
                                  className="w-4 h-4 rounded border-gray-300 text-[#001f54] focus:ring-[#001f54] dark:border-gray-600 dark:bg-gray-800 cursor-pointer"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors font-secondary">
                                  {option.label}
                                </span>
                              </div>
                              <span className="text-xs text-gray-500 dark:text-gray-500 font-secondary">
                                {option.count}
                              </span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  {/* Clear All Button */}
                  {getActiveFilterCount() > 0 && (
                    <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
                      <button
                        onClick={clearAllFilters}
                        className="w-full px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        Clear all filters
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:w-3/4">
              <div className="space-y-8">
                {/* Results Header */}
                <div className="flex justify-between items-center">
                  <p className="text-gray-600 dark:text-gray-400 font-secondary">
                    {filteredProducts.length} flooring product{filteredProducts.length !== 1 ? 's' : ''} found
                    {getActiveFilterCount() > 0 && ` (filtered)`}
                    {filteredProducts.length > productsPerPage && (
                      <span className="ml-4 text-sm">
                        Page {currentPage} of {totalPages} •
                        Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length}
                      </span>
                    )}
                  </p>
                </div>

                {/* Products Grid */}
                {currentProducts.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {currentProducts.map((product) => (
                        <Link
                          key={product.id}
                          to={`/products/flooring/${product.slug}`}
                          className="group bg-white dark:bg-gray-900 rounded-3xl overflow-hidden transition-all duration-500 border border-gray-200 dark:border-gray-800 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)] hover:border-gray-400 dark:hover:border-gray-600 cursor-pointer block"
                        >
                          {/* Product Image */}
                          <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
                            <img
                              src={product.images[0]}
                              alt={`${product.name} flooring`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          
                          {/* Product Info */}
                          <div className="p-5">
                            <h3 className="text-base font-normal text-gray-900 dark:text-white mb-1 group-hover:text-[#001f54] dark:group-hover:text-[#0466c8] transition-colors font-serif">
                              {product.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 font-secondary line-clamp-2">
                              {product.shortDescription}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    
                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex justify-center items-center space-x-2 mt-8">
                        {/* Previous Button */}
                        <button
                          onClick={goToPrevPage}
                          disabled={currentPage === 1}
                          className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors duration-200 ${
                            currentPage === 1
                              ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                          }`}
                          aria-label="Previous page"
                        >
                          ← Previous
                        </button>

                        {/* Page Numbers */}
                        <div className="flex space-x-1">
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                            const showPage =
                              page === 1 ||
                              page === totalPages ||
                              (page >= currentPage - 1 && page <= currentPage + 1);

                            if (!showPage && page === currentPage - 2) {
                              return (
                                <span key={page} className="px-3 py-2 text-sm text-gray-500 dark:text-gray-500">
                                  ...
                                </span>
                              );
                            }

                            if (!showPage && page === currentPage + 2) {
                              return null;
                            }

                            if (!showPage) return null;

                            return (
                              <button
                                key={page}
                                onClick={() => goToPage(page)}
                                className={`px-3 py-2 text-sm font-medium rounded-xl transition-colors duration-200 ${
                                  page === currentPage
                                    ? 'bg-[#001f54] text-white'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                }`}
                                aria-label={`Go to page ${page}`}
                                aria-current={page === currentPage ? 'page' : undefined}
                              >
                                {page}
                              </button>
                            );
                          })}
                        </div>
                    
                        {/* Next Button */}
                        <button
                          onClick={goToNextPage}
                          disabled={currentPage === totalPages}
                          className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors duration-200 ${
                            currentPage === totalPages
                              ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                          }`}
                          aria-label="Next page"
                        >
                          Next →
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="min-h-[400px] flex items-center justify-center">
                    <div className="text-center space-y-6">
                      <div className="w-24 h-24 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-2xl font-normal text-gray-900 dark:text-white mb-2 font-serif">No products found</h3>
                        <p className="text-base text-gray-600 dark:text-gray-400 font-secondary max-w-md mx-auto">
                          Try adjusting your filters to discover our flooring collections.
                        </p>
                      </div>
                      <button 
                        onClick={clearAllFilters} 
                        className="px-6 py-3 rounded-2xl bg-[#001f54] text-white font-medium hover:bg-[#002a6b] transition-all duration-300"
                      >
                        Clear all filters
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-white dark:bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <SplitText
              text="FAQs"
              tag="h2"
              className="text-4xl md:text-5xl font-normal text-gray-900 dark:text-white mb-4 font-serif"
              splitType="chars"
              delay={40}
              duration={0.7}
              textAlign="left"
            />
            <p className="text-base text-gray-600 dark:text-gray-400 font-secondary">
              Answers to common questions about our premium flooring collections.
            </p>
          </motion.div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden"
              >
                {/* Question Button */}
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 flex items-start justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  <span className="text-lg font-normal text-gray-900 dark:text-white font-secondary pr-8 leading-relaxed">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex-shrink-0 mt-0.5"
                  >
                    <svg 
                      className="w-5 h-5 text-gray-900 dark:text-white" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M6 18L18 6M6 6l12 12" 
                      />
                    </svg>
                  </motion.div>
                </button>

                {/* Answer - Animated */}
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-0 border-t border-gray-100 dark:border-gray-800">
                        <p className="text-base text-gray-600 dark:text-gray-400 font-secondary leading-relaxed pt-4">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Flooring;
