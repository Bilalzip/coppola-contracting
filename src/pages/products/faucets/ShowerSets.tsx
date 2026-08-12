import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { faucetProducts } from '../../../data/faucetProducts';
import NewsletterBanner from '../../../components/layout/NewsletterBanner';
import SplitText from '../../../components/ui/SplitText';

const ShowerSets = () => {
  useEffect(() => {
    document.title = 'Shower Sets | Coppola Home';
    window.scrollTo(0, 0);
  }, []);

  const showerSets = faucetProducts.filter((product) => product.category === 'shower');

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
            src="/assets/gallery/shower-set-header-image.png"
            alt="Shower Sets"
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
            text="Shower Sets"
            tag="h1"
            className="text-page-title font-normal text-white mb-4 font-serif"
            splitType="chars"
            delay={30}
            duration={0.8}
            textAlign="left"
          />
          <p className="text-base text-white/90 font-secondary max-w-2xl">
            Complete shower systems for luxury bathing experiences
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {showerSets.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-gray-600 dark:text-gray-400 font-secondary">
                No shower sets available at the moment. Please check back soon.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {showerSets.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Link
                    to={`/products/faucets/${product.slug}`}
                    className="group bg-white dark:bg-neutral-900 rounded-3xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-500 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)]"
                  >
                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden p-6">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    {/* Content */}
                    <div className="p-3.5 space-y-1">
                      {product.brand && (
                        <p className="text-xs text-neutral-600 dark:text-neutral-400 font-sans">
                          {product.brand}
                        </p>
                      )}
                      <h3 className="font-serif text-sm text-neutral-900 dark:text-neutral-100 line-clamp-2 leading-snug">
                        {product.name}
                      </h3>
                      <div className="pt-1">
                        <span className="relative inline-block text-xs font-medium text-neutral-900 dark:text-neutral-100 font-sans group-hover:text-[#001f54] dark:group-hover:text-[#0466c8] transition-colors">
                          VIEW PRODUCT
                          <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#001f54] dark:bg-[#0466c8] transition-all duration-300 group-hover:w-full"></span>
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <NewsletterBanner />
    </div>
  );
};

export default ShowerSets;

