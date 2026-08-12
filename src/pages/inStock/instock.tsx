import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import AnimatedContent from '../../components/ui/AnimatedContent';
import SplitText from '../../components/ui/SplitText';

const headerImages = [
  '/gallery/Copy-of-1-1.jpg',
  '/gallery/Copy-of-1a-1500x1000.jpg',
  '/gallery/Copy-of-6-1-1500x1001.jpg',
  '/gallery/Copy-of-Image-28.jpg',
];

const InStock: React.FC = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % headerImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] transition-colors duration-300">
      {/* Hero Header with Carousel */}
      <section className="relative h-[500px] sm:h-[580px] md:h-[650px] overflow-hidden">
        <style>{`
          @keyframes zoom-out {
            from {
              transform: scale(1.1);
            }
            to {
              transform: scale(1);
            }
          }

          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-zoom-out {
            animation: zoom-out 2s ease-out forwards;
          }

          .animate-fade-in-up {
            animation: fade-in-up 1s ease-out 0.3s forwards;
            opacity: 0;
          }
        `}</style>

        {/* Image Carousel Background */}
        <div className="absolute inset-0">
          {headerImages.map((image, index) => (
            <div
              key={image}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt={`In stock showcase ${index + 1}`}
                className={`w-full h-full object-cover ${index === 0 ? 'animate-zoom-out' : ''}`}
              />
            </div>
          ))}
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center animate-fade-in-up">
            <p className="text-xs uppercase tracking-[0.2em] text-white/90 font-secondary mb-6">
              Instant
            </p>
            <SplitText
              text="In stock products"
              tag="h1"
              className="text-page-title text-white leading-tight tracking-tight font-serif mb-8"
              style={{ fontFamily: "'EB Garamond', 'Times New Roman', 'Georgia', serif", fontWeight: 400 }}
              splitType="chars"
              delay={30}
              duration={0.8}
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              textAlign="center"
            />
            <p className="text-sm sm:text-base md:text-lg text-white/90 font-secondary max-w-3xl mx-auto mb-10 leading-relaxed">
              Discover our curated selection of premium vanities and cabinets ready for immediate installation. Quality crafted, immediately available.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  // Scroll to products section
                  const productsSection = document.getElementById('products-section');
                  if (productsSection) {
                    productsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Explore
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => navigate('/contact')}
              >
                Quote
              </Button>
            </div>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {headerImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentImageIndex 
                  ? 'w-8 h-2 bg-white' 
                  : 'w-2 h-2 bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section id="products-section" className="py-16 sm:py-20 md:py-24 bg-[#FAFAFA] dark:bg-[#0F0F0F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SplitText
              text="Available Now"
              tag="h2"
              className="text-3xl sm:text-4xl md:text-5xl text-[#1A1A1A] dark:text-[#F9FAFB] font-serif mb-4"
              style={{ fontFamily: "'EB Garamond', 'Times New Roman', 'Georgia', serif", fontWeight: 400 }}
              splitType="chars"
              delay={25}
              duration={0.7}
              from={{ opacity: 0, y: 30 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              textAlign="center"
            />
            <p className="text-sm sm:text-base text-[#666] dark:text-[#999] font-secondary">
              Browse our ready-to-ship inventory
            </p>
          </div>

          {/* Product Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Vanities Card */}
            <AnimatedContent distance={50} duration={0.8} threshold={0.1} direction="vertical">
              <div 
                className="group bg-white dark:bg-[#1A1A1A] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)] hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-500 cursor-pointer"
                onClick={() => navigate('/products/vanities')}
              >
              <div className="relative h-64 overflow-hidden">
                <img
                  src="/gallery/Copy-of-1-1.jpg"
                  alt="In Stock Vanities"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3
                    className="text-2xl text-white font-serif mb-1"
                    style={{ fontFamily: "'EB Garamond', 'Times New Roman', 'Georgia', serif", fontWeight: 400 }}
                  >
                    Vanities
                  </h3>
                  <p className="text-sm text-white/80 font-secondary">
                    Ready for immediate delivery
                  </p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-[#666] dark:text-[#999] font-secondary mb-4">
                  Premium bathroom vanities in various styles and finishes, available for quick installation.
                </p>
                <div className="relative inline-block">
                  <span className="text-sm font-semibold text-[#1A1A1A] dark:text-[#F9FAFB] font-secondary">
                    View Collection ↗
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#1A1A1A] dark:bg-[#F9FAFB] transition-all duration-300 group-hover:w-full"></span>
                </div>
              </div>
              </div>
            </AnimatedContent>

            {/* Cabinets Card */}
            <AnimatedContent distance={50} duration={0.8} threshold={0.1} direction="vertical" delay={0.1}>
              <div 
                className="group bg-white dark:bg-[#1A1A1A] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)] hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-500 cursor-pointer"
                onClick={() => navigate('/custom-cabinetry')}
              >
              <div className="relative h-64 overflow-hidden">
                <img
                  src="/gallery/Copy-of-1a-1500x1000.jpg"
                  alt="In Stock Cabinets"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3
                    className="text-2xl text-white font-serif mb-1"
                    style={{ fontFamily: "'EB Garamond', 'Times New Roman', 'Georgia', serif", fontWeight: 400 }}
                  >
                    Cabinets
                  </h3>
                  <p className="text-sm text-white/80 font-secondary">
                    Quality craftsmanship, ready now
                  </p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-[#666] dark:text-[#999] font-secondary mb-4">
                  Custom cabinetry solutions designed for functionality and elegance, ready to ship.
                </p>
                <div className="relative inline-block">
                  <span className="text-sm font-semibold text-[#1A1A1A] dark:text-[#F9FAFB] font-secondary">
                    View Collection ↗
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#1A1A1A] dark:bg-[#F9FAFB] transition-all duration-300 group-hover:w-full"></span>
                </div>
              </div>
              </div>
            </AnimatedContent>

            {/* Faucets Card */}
            <AnimatedContent distance={50} duration={0.8} threshold={0.1} direction="vertical" delay={0.2}>
              <div 
                className="group bg-white dark:bg-[#1A1A1A] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)] hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-500 cursor-pointer"
                onClick={() => navigate('/products/faucets')}
              >
              <div className="relative h-64 overflow-hidden">
                <img
                  src="/gallery/Copy-of-6-1-1500x1001.jpg"
                  alt="In Stock Faucets"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3
                    className="text-2xl text-white font-serif mb-1"
                    style={{ fontFamily: "'EB Garamond', 'Times New Roman', 'Georgia', serif", fontWeight: 400 }}
                  >
                    Faucets
                  </h3>
                  <p className="text-sm text-white/80 font-secondary">
                    Premium fixtures in stock
                  </p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-[#666] dark:text-[#999] font-secondary mb-4">
                  High-quality faucets and fixtures from leading brands, available for immediate purchase.
                </p>
                <div className="relative inline-block">
                  <span className="text-sm font-semibold text-[#1A1A1A] dark:text-[#F9FAFB] font-secondary">
                    View Collection ↗
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#1A1A1A] dark:bg-[#F9FAFB] transition-all duration-300 group-hover:w-full"></span>
                </div>
              </div>
              </div>
            </AnimatedContent>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-white dark:bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SplitText
              text="Why Choose In Stock?"
              tag="h2"
              className="text-3xl sm:text-4xl md:text-5xl text-[#1A1A1A] dark:text-[#F9FAFB] font-serif mb-4"
              style={{ fontFamily: "'EB Garamond', 'Times New Roman', 'Georgia', serif", fontWeight: 400 }}
              splitType="chars"
              delay={25}
              duration={0.7}
              from={{ opacity: 0, y: 30 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              textAlign="center"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Immediate Availability',
                description: 'Products ready to ship within 24-48 hours',
              },
              {
                title: 'Quality Assured',
                description: 'Pre-inspected and certified for excellence',
              },
              {
                title: 'Competitive Pricing',
                description: 'Best value without compromising quality',
              },
              {
                title: 'Expert Support',
                description: 'Professional guidance for your selection',
              },
            ].map((benefit, index) => (
              <div key={benefit.title} className="text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#F5F5F5] dark:bg-[#1A1A1A] border border-[#E5E7EB] dark:border-[#2A2A2A] mx-auto mb-4">
                  <span className="text-lg font-semibold text-[#1A1A1A] dark:text-[#F9FAFB] font-secondary">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3
                  className="text-xl text-[#1A1A1A] dark:text-[#F9FAFB] font-serif mb-2"
                  style={{ fontFamily: "'EB Garamond', 'Times New Roman', 'Georgia', serif", fontWeight: 400 }}
                >
                  {benefit.title}
                </h3>
                <p className="text-sm text-[#666] dark:text-[#999] font-secondary">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-24 md:py-28 bg-[#F5F5F5] dark:bg-[#0F0F0F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SplitText
            text="Ready to get started?"
            tag="h2"
            className="text-4xl sm:text-5xl md:text-6xl text-[#1A1A1A] dark:text-[#F9FAFB] font-serif mb-6"
            style={{ fontFamily: "'EB Garamond', 'Times New Roman', 'Georgia', serif", fontWeight: 400 }}
            splitType="chars"
            delay={25}
            duration={0.7}
            from={{ opacity: 0, y: 30 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            textAlign="center"
          />
          <p className="text-base sm:text-lg text-[#666] dark:text-[#999] font-secondary mb-10">
            Contact us today for pricing and availability.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate('/contact')}
            >
              Get a Quote
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => navigate('/products')}
            >
              Browse All Products
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InStock;
