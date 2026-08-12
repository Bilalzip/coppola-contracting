import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../../lib/supabase';
import type { Product } from '../../../types/database';
import SplitText from '../../../components/ui/SplitText';

const BathroomFaucets = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(true);
  const [visibleCount, setVisibleCount] = useState(9);

  useEffect(() => {
    document.title = 'Bathroom Faucets | Coppola Home';
    window.scrollTo(0, 0);
    supabase
      .from('products')
      .select('*')
      .eq('category', 'faucet')
      .eq('filters->>faucet_category', 'Bathroom')
      .order('created_at', { ascending: false })
      .then(({ data }) => setAllProducts(data ?? []));

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

  // Bath Collections — derive from DB data, fall back to static slugs for images
  const collections = [
    { name: 'ARCH', count: allProducts.filter(p => p.tags?.includes('arch')).length || 0, slug: 'arch' },
    { name: 'RITTZE', count: allProducts.filter(p => p.tags?.includes('rittze')).length || 0, slug: 'rittze' },
    { name: 'ONO', count: allProducts.filter(p => p.tags?.includes('ono')).length || 0, slug: 'ono' },
    { name: 'NEO', count: allProducts.filter(p => p.tags?.includes('neo')).length || 0, slug: 'neo' },
    { name: 'OPUS', count: allProducts.filter(p => p.tags?.includes('opus')).length || 0, slug: 'opus' },
    { name: 'ORIGIN PLUS', count: allProducts.filter(p => p.tags?.includes('origin-plus')).length || 0, slug: 'origin-plus' },
    { name: 'ORIGIN', count: allProducts.filter(p => p.tags?.includes('origin')).length || 0, slug: 'origin' },
    { name: 'GIO', count: allProducts.filter(p => p.tags?.includes('gio')).length || 0, slug: 'gio' },
    { name: 'MORANDI', count: allProducts.filter(p => p.tags?.includes('morandi')).length || 0, slug: 'morandi' },
    { name: 'PEI', count: allProducts.filter(p => p.tags?.includes('pei')).length || 0, slug: 'pei' },
  ];

  // Create collection cards with specific images
  const collectionCards = collections.map(collection => {
    let collectionImage = allProducts[0]?.images[0] || '/assets/gallery/bathroom-faucets-card-image.avif';
    
    // Set specific images for collections
    if (collection.slug === 'arch') {
      collectionImage = '/assets/gallery/ARCH-faucet-card-image.webp';
    } else if (collection.slug === 'rittze') {
      collectionImage = '/assets/gallery/rittze-collectioncard-image.webp';
    } else if (collection.slug === 'neo') {
      collectionImage = '/assets/gallery/neo-collection-card-image.webp';
    } else if (collection.slug === 'origin-plus') {
      collectionImage = '/assets/gallery/originplus-collection-card-image.webp';
    } else if (collection.slug === 'ono') {
      collectionImage = '/assets/gallery/ono-collection-card-image.webp';
    } else if (collection.slug === 'gio') {
      collectionImage = '/assets/gallery/gio-collection-card-image.webp';
    } else if (collection.slug === 'pei') {
      collectionImage = '/assets/gallery/pei-collection-card-image.webp';
    } else if (collection.slug === 'morandi') {
      collectionImage = '/assets/gallery/morandi-collection-card-image.webp';
    } else if (collection.slug === 'opus') {
      collectionImage = '/assets/gallery/opus-collection-card-image.webp';
    } else if (collection.slug === 'origin') {
      collectionImage = '/assets/gallery/origin-collection-card-image.webp';
    }
    
    return {
      name: collection.name,
      slug: collection.slug,
      count: collection.count,
      image: collectionImage
    };
  });

  const filteredProducts = allProducts.filter((product) => {
    if (selectedCollection) {
      return product.tags?.includes(selectedCollection);
    }
    return true;
  });

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const loadMore = () => {
    setVisibleCount(prev => prev + 9);
  };

  const handleCollectionClick = (collectionSlug: string) => {
    setSelectedCollection(collectionSlug);
    setVisibleCount(9);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleBackToCollections = () => {
    setSelectedCollection(null);
    setVisibleCount(9);
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
            src="/assets/gallery/bathroom-facuets-page-header-image.jpg"
            alt="Bathroom Faucets"
            className="w-full h-full object-cover"
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex flex-col justify-center">
          {/* Back Button */}
          <Link 
            to="/products/faucets"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors mb-6 font-secondary text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Faucets
          </Link>

          {/* Heading */}
          <SplitText
            text="Bathroom Faucet Collections"
            tag="h1"
            className="text-page-title font-normal text-white mb-4 font-serif"
            splitType="chars"
            delay={30}
            duration={0.8}
            textAlign="left"
          />
          <p className="text-base text-white/90 font-secondary max-w-2xl">
            Explore our complete collection of precision-engineered bathroom faucets
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
              <span>Collections</span>
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
                    {selectedCollection && (
                      <button
                        onClick={() => {
                          setSelectedCollection(null);
                          setVisibleCount(9);
                        }}
                        className="text-xs text-[#001f54] dark:text-[#0466c8] hover:underline font-secondary"
                      >
                        Clear all
                      </button>
                    )}
                  </div>

                  {/* Collections Filter */}
                  <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setIsCollectionsOpen(!isCollectionsOpen)}
                      className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white font-secondary">
                        Bath Collections
                      </h4>
                      <motion.svg
                        animate={{ rotate: isCollectionsOpen ? 45 : 0 }}
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
                      {isCollectionsOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 space-y-1 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent pr-2">
                            {collections.map((collection) => (
                              <button
                                key={collection.slug}
                                onClick={() => handleCollectionClick(collection.slug)}
                                className={`w-full text-left px-3 py-2 rounded-xl text-sm font-secondary transition-all flex items-center justify-between ${
                                  selectedCollection === collection.slug
                                    ? 'bg-[#001f54] text-white'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                                }`}
                              >
                                <span>{collection.name}</span>
                                <span className="text-xs opacity-70">({collection.count})</span>
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

            {/* Right Content - Collections or Products Grid */}
            <div className="flex-1">
              {/* Results Count and Back Button */}
              <div className="mb-6 flex items-center justify-between">
                {selectedCollection ? (
                  <button
                    onClick={handleBackToCollections}
                    className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#001f54] dark:hover:text-[#0466c8] transition-colors font-secondary"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Collections
                  </button>
                ) : null}
                <p className="text-sm text-gray-600 dark:text-gray-400 font-secondary ml-auto">
                  {selectedCollection ? (
                    <>Showing <span className="font-semibold text-gray-900 dark:text-white">{visibleProducts.length}</span> of <span className="font-semibold text-gray-900 dark:text-white">{filteredProducts.length}</span> faucets</>
                  ) : (
                    <>Showing <span className="font-semibold text-gray-900 dark:text-white">{collectionCards.length}</span> collections</>
                  )}
                </p>
              </div>

              {/* Show Collections or Products */}
              {!selectedCollection ? (
                /* Collections Grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {collectionCards.map((collection, index) => (
                    <motion.div
                      key={collection.slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                      <button
                        onClick={() => handleCollectionClick(collection.slug)}
                        className="w-full group bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-500 text-left shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)]"
                      >
                        {/* Collection Image */}
                        <div className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-gray-800">
                          <img
                            src={collection.image}
                            alt={collection.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>

                        {/* Collection Info */}
                        <div className="p-4">
                          <h3 className="text-base font-normal text-gray-900 dark:text-white mb-1.5 font-serif group-hover:text-[#001f54] dark:group-hover:text-[#0466c8] transition-colors">
                            {collection.name}<sup className="text-xs ml-0.5">{collection.count}</sup>
                          </h3>

                          {/* Explore Link */}
                          <div className="flex items-center gap-2 text-sm font-medium text-[#001f54] dark:text-[#0466c8]">
                            <span className="relative">
                              Explore Collection
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
                      </button>
                    </motion.div>
                  ))}
                </div>
              ) : (
                /* Products Grid */
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {visibleProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                      >
                        <Link to={`/products/faucets/${product.slug}`}>
                          <div className="group bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-500 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)]">
                            {/* Image Container */}
                            <div className="relative aspect-square overflow-hidden">
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                                loading="lazy"
                              />
                            </div>

                            {/* Content */}
                            <div className="p-4">
                              <h3 className="text-base font-normal text-gray-900 dark:text-white mb-1.5 font-serif group-hover:text-[#001f54] dark:group-hover:text-[#0466c8] transition-colors">
                                {product.name}
                              </h3>
                              
                              {(product.short_description || product.description) && (
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 font-secondary line-clamp-2">
                                  {product.short_description || product.description}
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
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {/* Load More Button */}
                  {hasMore && (
                    <div className="mt-12 text-center">
                      <button
                        onClick={loadMore}
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#001f54] dark:hover:text-[#0466c8] transition-colors font-secondary underline underline-offset-4"
                      >
                        Load more faucets
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* Empty State */}
              {selectedCollection && filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                  <svg className="w-20 h-20 text-gray-300 dark:text-gray-700 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <h3 className="text-xl font-normal text-gray-900 dark:text-white mb-2 font-serif">
                    No faucets found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 font-secondary">
                    Try selecting a different collection
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BathroomFaucets;

