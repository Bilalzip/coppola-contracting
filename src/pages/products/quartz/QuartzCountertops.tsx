import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { quartzProducts } from '../../../data/quartzProducts';
import NewsletterBanner from '../../../components/layout/NewsletterBanner';
import Button from '../../../components/ui/Button';
import SplitText from '../../../components/ui/SplitText';

const PAGE_SIZE = 24;

/** Collection names arrive in mixed case from the supplier feed. */
const toTitleCase = (value: string) =>
  value
    .toLowerCase()
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const thicknessList = (thickness: string | string[] | undefined) =>
  Array.isArray(thickness) ? thickness : thickness ? [thickness] : [];

const QuartzCountertops: React.FC = () => {
  const [selectedCollection, setSelectedCollection] = useState('all');
  const [selectedThickness, setSelectedThickness] = useState('all');
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isCollectionOpen, setIsCollectionOpen] = useState(true);
  const [isThicknessOpen, setIsThicknessOpen] = useState(true);

  useEffect(() => {
    document.title = 'Quartz Countertops | Coppola Home';
  }, []);

  const collections = useMemo(() => {
    const counts = new Map<string, number>();
    quartzProducts.forEach((product) => {
      const key = (product.collection ?? '').toLowerCase();
      if (!key) return;
      counts.set(key, (counts.get(key) ?? 0) + 1);
    });

    return [
      { id: 'all', name: 'All Collections', count: quartzProducts.length },
      ...Array.from(counts.entries())
        .sort((a, b) => b[1] - a[1])
        .map(([id, count]) => ({ id, name: toTitleCase(id), count })),
    ];
  }, []);

  const thicknesses = useMemo(() => {
    const counts = new Map<string, number>();
    quartzProducts.forEach((product) => {
      thicknessList(product.thickness).forEach((value) => {
        counts.set(value, (counts.get(value) ?? 0) + 1);
      });
    });

    return [
      { id: 'all', name: 'Any Thickness', count: quartzProducts.length },
      ...Array.from(counts.entries())
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([id, count]) => ({ id, name: id, count })),
    ];
  }, []);

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();

    return quartzProducts.filter((product) => {
      if (selectedCollection !== 'all' && (product.collection ?? '').toLowerCase() !== selectedCollection) {
        return false;
      }
      if (selectedThickness !== 'all' && !thicknessList(product.thickness).includes(selectedThickness)) {
        return false;
      }
      if (search && !product.name.toLowerCase().includes(search)) {
        return false;
      }
      return true;
    });
  }, [selectedCollection, selectedThickness, query]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [selectedCollection, selectedThickness, query]);

  const visible = filtered.slice(0, visibleCount);
  const hasFilters = selectedCollection !== 'all' || selectedThickness !== 'all' || query.trim() !== '';

  const clearFilters = () => {
    setSelectedCollection('all');
    setSelectedThickness('all');
    setQuery('');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a]">
      {/* Header Section - Half Height */}
      <section className="relative h-[50vh] w-full overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          <img
            src="/Images/products/quartz-countertops/Countertops_Mockup_TopImage.webp"
            alt="Quartz countertops collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <div className="max-w-3xl">
            <SplitText
              text="Quartz countertops"
              tag="h1"
              className="text-page-title font-normal text-white mb-4 font-serif"
              splitType="chars"
              delay={30}
              duration={0.8}
              textAlign="center"
            />
            <p className="text-base text-white/90 font-secondary">
              Engineered stone surfaces built for kitchens and baths that get used every day
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section id="collection" className="py-12 px-4 bg-white dark:bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-sm uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-3 font-secondary">
              Coppola Quartz
            </p>
            <SplitText
              text="Browse the slab library"
              tag="h2"
              className="text-4xl md:text-5xl font-normal text-gray-900 dark:text-white mb-4 font-serif"
              splitType="chars"
              delay={30}
              duration={0.7}
              textAlign="center"
            />
            <p className="text-base text-gray-600 dark:text-gray-400 font-secondary max-w-2xl mx-auto">
              Marble-look veining, warm neutrals, and deep darks across our Beyond, Red, and Discovery
              collections — all non-porous, stain resistant, and ready for fabrication.
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar - Filter Panel */}
            <motion.aside
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full lg:w-80 flex-shrink-0 space-y-4"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-normal text-gray-900 dark:text-white font-serif">Filters</h3>
                {hasFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-[#001f54] dark:text-[#0466c8] hover:underline font-secondary"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Search */}
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5">
                <label
                  htmlFor="quartz-search"
                  className="block text-sm font-medium text-gray-900 dark:text-white font-secondary mb-3"
                >
                  Search
                </label>
                <input
                  id="quartz-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Find a colour or name"
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm font-secondary text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-[#001f54] dark:focus:border-[#0466c8] transition-colors"
                />
              </div>

              {/* Collection Filter */}
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setIsCollectionOpen(!isCollectionOpen)}
                  className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white font-secondary">Collection</h4>
                  <motion.svg
                    animate={{ rotate: isCollectionOpen ? 45 : 0 }}
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
                  {isCollectionOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 space-y-1">
                        {collections.map((collection) => (
                          <button
                            key={collection.id}
                            onClick={() => setSelectedCollection(collection.id)}
                            className={`w-full text-left px-3 py-2 rounded-xl text-sm font-secondary transition-all flex items-center justify-between ${
                              selectedCollection === collection.id
                                ? 'bg-[#001f54] text-white'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                            }`}
                          >
                            <span>{collection.name}</span>
                            <span className="text-xs opacity-70">{collection.count}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Thickness Filter */}
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setIsThicknessOpen(!isThicknessOpen)}
                  className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white font-secondary">Thickness</h4>
                  <motion.svg
                    animate={{ rotate: isThicknessOpen ? 45 : 0 }}
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
                  {isThicknessOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 space-y-1">
                        {thicknesses.map((thickness) => (
                          <button
                            key={thickness.id}
                            onClick={() => setSelectedThickness(thickness.id)}
                            className={`w-full text-left px-3 py-2 rounded-xl text-sm font-secondary transition-all flex items-center justify-between ${
                              selectedThickness === thickness.id
                                ? 'bg-[#001f54] text-white'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                            }`}
                          >
                            <span>{thickness.name}</span>
                            <span className="text-xs opacity-70">{thickness.count}</span>
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
              <div className="mb-6">
                <p className="text-sm text-gray-600 dark:text-gray-400 font-secondary">
                  Showing{' '}
                  <span className="font-semibold text-gray-900 dark:text-white">{visible.length}</span> of{' '}
                  <span className="font-semibold text-gray-900 dark:text-white">{filtered.length}</span>{' '}
                  {filtered.length === 1 ? 'slab' : 'slabs'}
                </p>
              </div>

              {filtered.length === 0 ? (
                <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-12 text-center">
                  <p className="text-base text-gray-600 dark:text-gray-400 font-secondary mb-4">
                    No slabs match those filters.
                  </p>
                  <Button variant="outline" size="sm" onClick={clearFilters}>
                    Clear filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                  {visible.map((product, index) => (
                    <motion.div
                      key={product.slug}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: (index % PAGE_SIZE) * 0.03 }}
                    >
                      <Link to={`/quartz-countertops/${product.slug}`}>
                        <div className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-500 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)]">
                          <div className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-gray-800">
                            <img
                              src={product.images[0]}
                              alt={`${product.name} quartz slab`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                            />
                            {product.collection && (
                              <div className="absolute top-2 right-2">
                                <span className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-gray-900 dark:text-white px-2 py-1 text-xs font-medium rounded-md border border-gray-200 dark:border-gray-700">
                                  {toTitleCase(product.collection)}
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="p-3">
                            <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-500 mb-1 font-secondary">
                              {thicknessList(product.thickness).join(' · ') || product.brand}
                            </p>
                            <h3 className="text-sm font-normal text-gray-900 dark:text-white mb-1 font-serif group-hover:text-[#001f54] dark:group-hover:text-[#0466c8] transition-colors line-clamp-1">
                              {product.name}
                            </h3>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 font-secondary line-clamp-2">
                              {product.slabSize} · {product.finish}
                            </p>

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
              )}

              {visibleCount < filtered.length && (
                <div className="mt-12 flex justify-center">
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                  >
                    Load more slabs
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Why Quartz Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative order-2 lg:order-1"
            >
              <div className="aspect-square rounded-3xl overflow-hidden">
                <img
                  src="/Images/products/quartz-countertops/Stauario-Venato-Quartz-on-Kitchen-Countertop.webp"
                  alt="Quartz countertop installed in a kitchen"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6 order-1 lg:order-2"
            >
              <p className="text-sm uppercase tracking-wider text-gray-600 dark:text-gray-400 font-secondary">
                Engineered Stone
              </p>
              <SplitText
                text="Why choose quartz"
                tag="h2"
                className="text-4xl md:text-5xl font-normal text-gray-900 dark:text-white font-serif leading-tight"
                splitType="chars"
                delay={35}
                duration={0.8}
                textAlign="left"
              />
              <p className="text-base text-gray-600 dark:text-gray-400 font-secondary leading-relaxed">
                Quartz gives you the depth and movement of natural stone without the upkeep. Slabs are
                non-porous, so they never need sealing, and the colour runs consistently from one slab to the
                next — which matters when a kitchen needs more than one.
              </p>

              <div className="flex flex-wrap gap-2 pt-4">
                {['Non-Porous', 'Stain Resistant', 'Scratch Resistant', 'No Sealing', '2cm & 3cm', 'Polished Finish'].map(
                  (feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium font-secondary border border-gray-200 dark:border-gray-700"
                    >
                      {feature}
                    </span>
                  )
                )}
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

      <NewsletterBanner />
    </div>
  );
};

export default QuartzCountertops;
