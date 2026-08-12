import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../../../lib/supabase';
import type { Product } from '../../../types/database';
import SplitText from '../../../components/ui/SplitText';

const ModernMirrors = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(9);

  useEffect(() => {
    document.title = 'Modern Minimalist Mirrors | Coppola Home';
    window.scrollTo(0, 0);
    supabase.from('products').select('*').eq('category', 'mirror').order('created_at', { ascending: false }).then(({ data }) => { setProducts(data ?? []); setLoading(false); });
  }, []);

  // Filter for modern/minimalist mirrors
  // You can adjust these tags based on your actual product tags
  const modernMirrors = products.filter(product =>
    product.tags?.some(tag =>
      tag.includes('modern') ||
      tag.includes('minimalist') ||
      tag.includes('contemporary') ||
      tag.includes('stone') ||
      tag.includes('evolution') ||
      tag.includes('acari') ||
      tag.includes('diano')
    )
  );

  const visibleMirrors = modernMirrors.slice(0, visibleCount);
  const hasMore = visibleCount < modernMirrors.length;

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 9, modernMirrors.length));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a]">
      {/* Header Section - Same style as ExploreMirrors */}
      <section className="relative pt-24 pb-16 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-8 font-secondary"
          >
            <Link to="/" className="hover:text-[#001f54] dark:hover:text-[#0466c8] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/products/mirrors" className="hover:text-[#001f54] dark:hover:text-[#0466c8] transition-colors">
              Mirrors
            </Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-white">Modern Minimalist</span>
          </motion.div>

          {/* Header Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-sm uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-4 font-secondary">
              Modern Collection
            </p>
            <SplitText
              text="Modern minimalist mirrors"
              tag="h1"
              className="text-page-title font-normal text-gray-900 dark:text-white mb-6 font-serif"
              splitType="chars"
              delay={30}
              duration={0.8}
            />
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 font-secondary leading-relaxed">
              Clean lines meet sophisticated design in our modern mirror collection. 
              Each piece embodies minimalist elegance and contemporary style.
            </p>
            <div className="mt-6 text-sm text-gray-500 dark:text-gray-500 font-secondary">
              {modernMirrors.length} {modernMirrors.length === 1 ? 'product' : 'products'} available
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 px-4 bg-white dark:bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
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
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
            {visibleMirrors.map((mirror, index) => (
              <motion.div
                key={mirror.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Link to={`/products/mirrors/${mirror.slug}`}>
                  <div className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-500 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)]">
                    {/* Image Container */}
                    <div className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-gray-800">
                      <img
                        src={mirror.images[0]}
                        alt={mirror.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-3">
                      <h3 className="text-sm font-normal text-gray-900 dark:text-white mb-1 font-serif group-hover:text-[#001f54] dark:group-hover:text-[#0466c8] transition-colors line-clamp-1">
                        {mirror.name}
                      </h3>

                      {mirror.short_description && (
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 font-secondary line-clamp-2">
                          {mirror.short_description}
                        </p>
                      )}

                      {/* View Details Link */}
                      <div className="flex items-center gap-1.5 text-xs font-medium text-[#001f54] dark:text-[#0466c8]">
                        <span className="relative">
                          View details
                          <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#001f54] dark:bg-[#0466c8] transition-all duration-300 group-hover:w-full"></span>
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

          {/* Load More Button */}
          {hasMore && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-12 text-center"
            >
              <button
                onClick={loadMore}
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#001f54] dark:bg-[#0466c8] text-white rounded-full hover:bg-[#003380] dark:hover:bg-[#0570d4] transition-all duration-300 font-secondary"
              >
                Load more
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </motion.div>
          )}

          {/* No Products Message */}
          {modernMirrors.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-gray-600 dark:text-gray-400 font-secondary text-lg">
                No modern mirrors found at this time.
              </p>
            </motion.div>
          )}
          </>
          )}
        </div>
      </section>
    </div>
  );
};

export default ModernMirrors;

