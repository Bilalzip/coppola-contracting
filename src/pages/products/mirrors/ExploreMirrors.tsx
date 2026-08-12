import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import type { Product } from '../../../types/database';
import SplitText from '../../../components/ui/SplitText';

const ExploreMirrors = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVanityType, setSelectedVanityType] = useState<string>('all');
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [selectedVanityCollection, setSelectedVanityCollection] = useState<'single' | 'double' | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [openSections, setOpenSections] = useState({
    vanityType: true,
    collections: true,
    models: false
  });
  const [visibleCount, setVisibleCount] = useState(9);

  useEffect(() => {
    document.title = 'Explore Mirrors | Coppola Home';
    window.scrollTo(0, 0);
    supabase.from('products').select('*').eq('category', 'mirror').order('created_at', { ascending: false }).then(({ data }) => { setProducts(data ?? []); setLoading(false); });

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

  // Mirror collections/categories
  const collections = [
    'RADIANCE COLLECTION',
    'ELEGANCE COLLECTION',
    'MEDIA COLLECTION',
    'ORIGIN COLLECTION',
    'VELATERRA COLLECTION',
    'CONCEPT STUDIO',
    'HARMONIA COLLECTION'
  ];

  // Vanity collections with their product lists
  const singleVanityProducts = [
    'ACARI', 'BUTTERFLY', 'DIANO WHITE', 'DIANO BLACK', 'EVOLUTION', 'MORENO',
    'ORO Light', 'ORSO', 'PEBBLE', 'STONE', 'STONE Sensor',
    'VITA', 'VIANO', 'DIMO', 'DUO R', 'COMO', 'AKATO MEDIA'
  ];

  const doubleVanityProducts = [
    'STONE Sensor', 'DIANO BLACK', 'DIANO WHITE', 'BUTTERFLY',
    'DIMO', 'ORO Light', 'STONE', 'PEBBLE', 'ORSO', 'VIANO'
  ];

  const categories = [
    'BUTTERFLY',
    'VIANO',
    'DIANO WHITE',
    'DIANO BLACK',
    'ACARI',
    'MORENO',
    'DIMO',
    'ORSO',
    'EVOLUTION',
    'VITA',
    'DUO R',
    'ORO Light',
    'AKATO MEDIA',
    'STONE',
    'STONE Sensor',
    'PEBBLE',
    'ANABO',
    'MARI',
    'NERO',
    'VARIO STEEL',
    'COMO',
    'Solenne',
    'Elise',
    'MOON',
    'Valentino',
    'Firenze',
    'BOCA Steel',
    'ARIS',
    'BARDI',
    'SOUL',
    'ANIMA',
    'Nano Decor',
    'Costa Decor',
    'Marlowe',
    'Sensa',
    'ACUTO',
    'NORMA',
    'NANO',
    'LUGO',
    'BOCA',
    'ACARI DECOR',
    'PULSE',
    'BENO',
    'Harmonia'
  ];

  // Get unique collections with product counts
  const collectionData = collections.map(collection => {
    const collectionSlug = collection.toLowerCase().replace(/\s+/g, '-');
    const productsInCollection = products.filter(product => {
      const matchesVanityType = selectedVanityType === 'all' || 
        ((product as any).vanityType && (product as any).vanityType.includes(selectedVanityType as 'single' | 'double'));
      const matchesCollection = product.tags?.includes(collectionSlug);
      return matchesVanityType && matchesCollection;
    });
    
    // Set specific images for collections
    let collectionImage = productsInCollection[0]?.images[0] || '';
    if (collection === 'ELEGANCE COLLECTION') {
      collectionImage = 'https://www.clariscompany.com/cdn/shop/files/006_DUO_R_D_G_001_64e498e3-0e8b-4a3d-bf4e-3d79242f11c5.png?v=1754233279&width=1400';
    } else if (collection === 'CONCEPT STUDIO') {
      collectionImage = 'https://www.clariscompany.com/cdn/shop/files/CostaDecor.jpg?v=1745880893&width=1400';
    }
    
    return {
      name: collection,
      slug: collectionSlug,
      count: productsInCollection.length,
      image: collectionImage
    };
  }).filter(col => col.count > 0);

  // Create vanity collection cards
  const vanityCollectionCards = [];
  
  // Single Vanity Card
  const singleVanityMirrors = products.filter(product => 
    (product as any).vanityType?.includes('single') && 
    singleVanityProducts.some(name => product.name === name)
  );
  if (singleVanityMirrors.length > 0) {
    vanityCollectionCards.push({
      name: 'SINGLE VANITY',
      slug: 'single-vanity',
      count: singleVanityMirrors.length,
      image: 'https://www.clariscompany.com/cdn/shop/files/orso2.png?v=1751835968&width=1000',
      type: 'single' as const
    });
  }

  // Double Vanity Card
  const doubleVanityMirrors = products.filter(product => 
    (product as any).vanityType?.includes('double') && 
    doubleVanityProducts.some(name => product.name === name)
  );
  if (doubleVanityMirrors.length > 0) {
    vanityCollectionCards.push({
      name: 'DOUBLE VANITY',
      slug: 'double-vanity',
      count: doubleVanityMirrors.length,
      image: doubleVanityMirrors[0]?.images[0] || '',
      type: 'double' as const
    });
  }

  // Combine all cards
  const allCollectionCards = [...vanityCollectionCards, ...collectionData];

  const filteredProducts = products.filter((product) => {
    // Filter by vanity type
    const matchesVanityType = selectedVanityType === 'all' || 
      ((product as any).vanityType && (product as any).vanityType.includes(selectedVanityType as 'single' | 'double'));
    
    // Filter by vanity collection if one is selected
    if (selectedVanityCollection) {
      const matchesVanityCollection = (product as any).vanityType?.includes(selectedVanityCollection);
      const productList = selectedVanityCollection === 'single' ? singleVanityProducts : doubleVanityProducts;
      const inProductList = productList.includes(product.name);
      return matchesVanityType && matchesVanityCollection && inProductList;
    }
    
    // Filter by collection if one is selected
    if (selectedCollection) {
      const matchesCollection = product.tags?.includes(selectedCollection);
      return matchesVanityType && matchesCollection;
    }
    
    // Filter by selected collections (multiple)
    const matchesCollections = selectedCollections.length === 0 || 
      selectedCollections.some(collection => 
        product.tags?.includes(collection.toLowerCase().replace(/\s+/g, '-'))
      );
    
    // Filter by selected models (multiple)
    const matchesModels = selectedModels.length === 0 || 
      selectedModels.includes(product.name);
    
    return matchesVanityType && matchesCollections && matchesModels;
  });

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const loadMore = () => {
    setVisibleCount(prev => prev + 9);
  };

  const handleCollectionClick = (collectionSlug: string, isVanityCollection: boolean = false, vanityType?: 'single' | 'double') => {
    if (isVanityCollection && vanityType) {
      setSelectedVanityCollection(vanityType);
      setSelectedCollection(null);
    } else {
      setSelectedCollection(collectionSlug);
      setSelectedVanityCollection(null);
    }
    setVisibleCount(9);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleBackToCollections = () => {
    setSelectedCollection(null);
    setSelectedVanityCollection(null);
    setVisibleCount(9);
  };

  const toggleSection = (section: 'vanityType' | 'collections' | 'models') => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleCollection = (collection: string) => {
    setSelectedCollections(prev =>
      prev.includes(collection)
        ? prev.filter(c => c !== collection)
        : [...prev, collection]
    );
  };

  const toggleModel = (model: string) => {
    setSelectedModels(prev =>
      prev.includes(model)
        ? prev.filter(m => m !== model)
        : [...prev, model]
    );
  };

  // Filter Section Component
  const FilterSection = ({ 
    title, 
    options, 
    selected, 
    onToggle: onToggleItem,
    isOpen,
    onToggleSection,
    type = 'checkbox'
  }: {
    title: string;
    options: string[];
    selected: string | string[];
    onToggle: (value: string) => void;
    isOpen: boolean;
    onToggleSection: () => void;
    type?: 'checkbox' | 'radio';
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
                    type={type}
                    name={type === 'radio' ? title : undefined}
                    checked={type === 'radio' ? selected === option : (selected as string[]).includes(option)}
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
            src="/assets/gallery/explore-all-mirros-header.webp"
            alt="Explore Mirrors"
            className="w-full h-full object-cover"
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex flex-col justify-center">
          {/* Back Button */}
          <Link 
            to="/products/mirrors"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors mb-6 font-secondary text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Mirrors
          </Link>

          {/* Heading */}
          <SplitText
            text="Explore Coppola Home Mirrors"
            tag="h1"
            className="text-page-title font-normal text-white mb-4 font-serif"
            splitType="chars"
            delay={30}
            duration={0.8}
            textAlign="left"
          />
          <p className="text-base text-white/90 font-secondary max-w-2xl">
            Discover our complete collection of precision-engineered mirrors
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Filter Button & Results Count */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400 font-['Poppins',sans-serif]">
              {(selectedCollection || selectedVanityCollection) ? (
                <>Showing {visibleProducts.length} of {filteredProducts.length} mirrors</>
              ) : (
                <>Showing {allCollectionCards.length} collections</>
              )}
            </p>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 font-['Poppins',sans-serif]">
                Filters
              </span>
              {(selectedVanityType !== 'all' || selectedCollections.length > 0 || selectedModels.length > 0) && (
                <span className="ml-1 px-2 py-0.5 bg-[#5b51ff] text-white text-xs font-semibold rounded-full">
                  {(selectedVanityType !== 'all' ? 1 : 0) + selectedCollections.length + selectedModels.length}
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
                      title="Vanity Type"
                      options={['All Mirrors', 'Single Vanity', 'Double Vanity']}
                      selected={selectedVanityType === 'all' ? 'All Mirrors' : selectedVanityType === 'single' ? 'Single Vanity' : 'Double Vanity'}
                      onToggle={(value) => {
                        if (value === 'All Mirrors') setSelectedVanityType('all');
                        else if (value === 'Single Vanity') setSelectedVanityType('single');
                        else setSelectedVanityType('double');
                      }}
                      isOpen={openSections.vanityType}
                      onToggleSection={() => toggleSection('vanityType')}
                      type="radio"
                    />
                    
                    <FilterSection
                      title="Collections"
                      options={collections}
                      selected={selectedCollections}
                      onToggle={toggleCollection}
                      isOpen={openSections.collections}
                      onToggleSection={() => toggleSection('collections')}
                      type="checkbox"
                    />
                    
                    <FilterSection
                      title="Models"
                      options={categories}
                      selected={selectedModels}
                      onToggle={toggleModel}
                      isOpen={openSections.models}
                      onToggleSection={() => toggleSection('models')}
                      type="checkbox"
                    />

                    {/* Clear Filters Button */}
                    {(selectedVanityType !== 'all' || selectedCollections.length > 0 || selectedModels.length > 0) && (
                      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                        <button
                          onClick={() => {
                            setSelectedVanityType('all');
                            setSelectedCollections([]);
                            setSelectedModels([]);
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

            {/* Right Content - Collections or Products Grid */}
            <div className="flex-1">
              {/* Back Button (when viewing products) */}
              {(selectedCollection || selectedVanityCollection) && (
                <div className="mb-6">
                  <button
                    onClick={handleBackToCollections}
                    className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors font-['Poppins',sans-serif]"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Collections
                  </button>
                </div>
              )}

              {/* Loading Skeleton */}
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden animate-pulse">
                      <div className="aspect-square bg-gray-200 dark:bg-gray-800" />
                      <div className="p-4 space-y-2">
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
              <>
              {/* Show Collections or Products */}
              {!selectedCollection && !selectedVanityCollection ? (
                /* Collections Grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allCollectionCards.map((collection, index) => (
                    <motion.div
                      key={collection.slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                      <button
                        onClick={() => {
                          const isVanityCollection = 'type' in collection;
                          const vanityType = isVanityCollection && 'type' in collection 
                            ? (collection as { type: 'single' | 'double' }).type 
                            : undefined;
                          handleCollectionClick(collection.slug, isVanityCollection, vanityType);
                        }}
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
                        <Link to={`/products/mirrors/${product.slug}`}>
                          <div className="group bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-500 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)]">
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
                                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#001f54] dark:bg-[#0466c8] transition-all duration-300 group-hover:w-full"></span>
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
                        Load more mirrors
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* Empty State */}
              {((selectedCollection || selectedVanityCollection) && filteredProducts.length === 0) || (!selectedCollection && !selectedVanityCollection && allCollectionCards.length === 0) ? (
                <div className="text-center py-20">
                  <svg className="w-20 h-20 text-gray-300 dark:text-gray-700 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <h3 className="text-xl font-normal text-gray-900 dark:text-white mb-2 font-serif">
                    No mirrors found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 font-secondary">
                    Try adjusting your filters
                  </p>
                </div>
              ) : null}
              </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExploreMirrors;

