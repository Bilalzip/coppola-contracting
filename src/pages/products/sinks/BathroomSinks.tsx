import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { sinkProducts } from '../../../data/sinkProducts';
import NewsletterBanner from '../../../components/layout/NewsletterBanner';
import SplitText from '../../../components/ui/SplitText';
import Button from '../../../components/ui/Button';

const BathroomSinks = () => {
  useEffect(() => {
    document.title = 'Bathroom Sinks | Coppola Home';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Elegant bathroom sinks that elevate your personal space. Refined designs that combine form and function.'
      );
    }
  }, []);

  // Filter products for bathroom sinks
  const bathroomProducts = sinkProducts.filter((product) => product.sinkType === 'bathroom');

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
            src="/assets/gallery/sink-collection-carousel-image-1.jpg"
            alt="Bathroom Sinks"
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
            text="Bathroom Sinks"
            tag="h1"
            className="text-page-title font-normal text-white mb-4 font-serif"
            splitType="chars"
            delay={35}
            duration={0.8}
            textAlign="left"
          />
          <p className="text-base text-white/90 font-secondary max-w-2xl">
            Elegant fixtures that elevate your personal space. Refined designs that combine form and function.
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Results Count */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 font-secondary">
              Showing <span className="font-semibold text-gray-900 dark:text-white">{bathroomProducts.length}</span> {bathroomProducts.length === 1 ? 'sink' : 'sinks'}
            </p>
          </div>

          {/* Products Grid */}
          {bathroomProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {bathroomProducts.map((product, index) => (
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
                No bathroom sinks found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-secondary">
                Please check back later for available products.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-gray-900 dark:text-white leading-tight font-serif">
            Need help choosing the perfect bathroom sink?
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto font-secondary">
            Our experts are here to help you find the ideal sink for your bathroom.
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

export default BathroomSinks;

