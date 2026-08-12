import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { faucetProducts } from '../../../data/faucetProducts';
import NewsletterBanner from '../../../components/layout/NewsletterBanner';
import SplitText from '../../../components/ui/SplitText';

const KitchenFaucets = () => {
  useEffect(() => {
    document.title = 'Kitchen Faucets | Coppola Home';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Premium kitchen faucets combining exceptional performance with elegant design. Built for the demands of modern cooking.'
      );
    }
  }, []);

  const kitchenFaucets = faucetProducts.filter((product) => product.category === 'kitchen');
  
  console.log('All faucet products:', faucetProducts);
  console.log('Kitchen faucets:', kitchenFaucets);
  console.log('Kitchen faucets count:', kitchenFaucets.length);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      {/* Header Section with Full-Width Background Image */}
      <section 
        className="relative pt-24 pb-16 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-[#0a0a0a]"
        style={{
          backgroundImage: 'url(/assets/gallery/kitchen-faucets-page-header-image.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              to="/products/faucets"
              className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors font-secondary"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Faucets
            </Link>
          </motion.div>

          {/* Header Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-3xl"
          >
            <p className="text-sm uppercase tracking-wider text-white/70 mb-4 font-secondary">
              Faucet Collection
            </p>
            <SplitText
              text="Kitchen Faucets"
              tag="h1"
              className="text-page-title font-normal text-white mb-6 font-serif"
              splitType="chars"
              delay={30}
              duration={0.8}
            />
            <p className="text-base md:text-lg text-white/90 font-secondary leading-relaxed">
              Premium kitchen faucets combining exceptional performance with elegant design. Built for the demands of modern cooking.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {kitchenFaucets.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-neutral-600 dark:text-neutral-400 font-sans">
                No kitchen faucets available at the moment. Please check back soon.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {kitchenFaucets.map((product, index) => (
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
                      <div className="p-3.5">
                        {product.brand && (
                          <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-500 mb-1 font-secondary">
                            {product.brand}
                          </p>
                        )}
                        <h3 className="text-sm font-normal text-gray-900 dark:text-white mb-1.5 font-serif group-hover:text-[#001f54] dark:group-hover:text-[#0466c8] transition-colors line-clamp-2">
                          {product.name}
                        </h3>

                        {/* View Details Link */}
                        <div className="flex items-center gap-1.5 text-xs font-medium text-[#001f54] dark:text-[#0466c8] mt-2">
                          <span className="relative">
                            View Details
                            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#001f54] dark:bg-[#0466c8] transition-all duration-300 group-hover:w-full"></span>
                          </span>
                          <svg 
                            className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" 
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
        </div>
      </section>

      <NewsletterBanner />
    </div>
  );
};

export default KitchenFaucets;

