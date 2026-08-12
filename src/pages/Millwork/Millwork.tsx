import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import AnimatedContent from '../../components/ui/AnimatedContent';
import Button from '../../components/ui/Button';

const Millwork: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const carouselImages = [
    '/assets/gallery/Screenshot 2025-12-27 101500.png',
    '/assets/gallery/Screenshot 2025-12-27 101328.png',
    '/assets/gallery/landing-header-carousel-image-5.png',
    '/assets/gallery/landing-header-carousel-image-6.webp',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [carouselImages.length]);
  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] transition-colors duration-300">
      {/* Hero Image Section */}
      <section className="relative h-[400px] sm:h-[500px] md:h-[600px] bg-gray-200 dark:bg-gray-800 overflow-hidden">
        <img
          src="/assets/gallery/Screenshot 2025-12-27 101328.png"
          alt="Custom Millwork Showcase"
          className="w-full h-full object-cover"
        />
      </section>

      {/* Bespoke Millwork Header Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-white dark:bg-[#0A0A0A] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Column - Title and Tags */}
            <div>
              <h1 
                className="text-page-title text-[#1A1A1A] dark:text-[#F9FAFB] leading-tight tracking-tight font-serif mb-8"
                style={{ fontFamily: "'EB Garamond', 'Times New Roman', 'Georgia', serif", fontWeight: 400 }}
              >
                Bespoke millwork
              </h1>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-1 bg-[#F5F5F5] dark:bg-[#1A1A1A] text-[#1A1A1A] dark:text-[#F9FAFB] text-xs font-medium rounded-full border border-[#E5E7EB] dark:border-[#2A2A2A] font-secondary">
                  Custom
                </span>
                <span className="px-4 py-1 bg-[#F5F5F5] dark:bg-[#1A1A1A] text-[#1A1A1A] dark:text-[#F9FAFB] text-xs font-medium rounded-full border border-[#E5E7EB] dark:border-[#2A2A2A] font-secondary">
                  Luxury
                </span>
                <span className="px-4 py-1 bg-[#F5F5F5] dark:bg-[#1A1A1A] text-[#1A1A1A] dark:text-[#F9FAFB] text-xs font-medium rounded-full border border-[#E5E7EB] dark:border-[#2A2A2A] font-secondary">
                  Artisan
                </span>
              </div>
            </div>

            {/* Right Column - Description */}
            <div className="lg:pt-4">
              <p className="text-sm sm:text-base text-[#666] dark:text-[#999] leading-relaxed font-secondary">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-white dark:bg-[#0A0A0A] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Center Content */}
          <AnimatedContent distance={50} duration={0.8} threshold={0.15}>
            <div className="text-center mb-16 sm:mb-20 md:mb-24">
              <p className="text-xs uppercase tracking-[0.15em] text-[#666] dark:text-[#999] font-secondary mb-6">
                Craftsmanship
              </p>
              <h2 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#1A1A1A] dark:text-[#F9FAFB] leading-tight tracking-tight font-serif mb-6 max-w-4xl mx-auto"
                style={{ fontFamily: "'EB Garamond', 'Times New Roman', 'Georgia', serif", fontWeight: 400 }}
              >
                Precision woodwork designed for exceptional living
              </h2>
              <p className="text-sm sm:text-base text-[#666] dark:text-[#999] font-secondary mb-8 max-w-2xl mx-auto">
                We build with purpose. Each piece tells a story of skill and dedication.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button
                  variant="primary"
                  size="md"
                  className="flex items-center gap-2"
                >
                  Explore
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  className="flex items-center gap-2 group"
                >
                  Learn more
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </div>
            </div>
          </AnimatedContent>

          {/* Two Column Layout - Features & Image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Features List */}
            <div className="space-y-8">
              <AnimatedContent distance={50} duration={0.8} threshold={0.15} delay={0}>
                <div className="border-b border-gray-200 dark:border-[#2A2A2A] pb-6">
                  <div className="flex items-start gap-4 mb-3">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full border border-[#E5E7EB] dark:border-[#2A2A2A] text-xs font-semibold text-[#2C3539] dark:text-[#F9FAFB] font-secondary">
                      01
                    </span>
                    <div className="flex-1">
                      <h3 
                        className="text-2xl sm:text-3xl text-[#1A1A1A] dark:text-[#F9FAFB] font-serif mb-1"
                        style={{ fontFamily: "'EB Garamond', 'Times New Roman', 'Georgia', serif", fontWeight: 400 }}
                      >
                        Custom Measurements
                      </h3>
                      <div className="h-[2px] w-10 bg-[#2C3539] dark:bg-[#F9FAFB] mb-2 opacity-60" />
                      <p className="text-sm text-[#666] dark:text-[#999] font-secondary leading-relaxed">
                        Precise measurements for perfect fit
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedContent>

              <AnimatedContent distance={50} duration={0.8} threshold={0.15} delay={0.1}>
                <div className="border-b border-gray-200 dark:border-[#2A2A2A] pb-6">
                  <div className="flex items-start gap-4 mb-3">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full border border-[#E5E7EB] dark:border-[#2A2A2A] text-xs font-semibold text-[#2C3539] dark:text-[#F9FAFB] font-secondary">
                      02
                    </span>
                    <div className="flex-1">
                      <h3 
                        className="text-2xl sm:text-3xl text-[#1A1A1A] dark:text-[#F9FAFB] font-serif mb-1"
                        style={{ fontFamily: "'EB Garamond', 'Times New Roman', 'Georgia', serif", fontWeight: 400 }}
                      >
                        Design Consultation
                      </h3>
                      <div className="h-[2px] w-10 bg-[#2C3539] dark:bg-[#F9FAFB] mb-2 opacity-60" />
                      <p className="text-sm text-[#666] dark:text-[#999] font-secondary leading-relaxed">
                        Expert design guidance and planning
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedContent>

              <AnimatedContent distance={50} duration={0.8} threshold={0.15} delay={0.2}>
                <div className="border-b border-gray-200 dark:border-[#2A2A2A] pb-6">
                  <div className="flex items-start gap-4 mb-3">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full border border-[#E5E7EB] dark:border-[#2A2A2A] text-xs font-semibold text-[#2C3539] dark:text-[#F9FAFB] font-secondary">
                      03
                    </span>
                    <div className="flex-1">
                      <h3 
                        className="text-2xl sm:text-3xl text-[#1A1A1A] dark:text-[#F9FAFB] font-serif mb-1"
                        style={{ fontFamily: "'EB Garamond', 'Times New Roman', 'Georgia', serif", fontWeight: 400 }}
                      >
                        Expert Craftsmanship
                      </h3>
                      <div className="h-[2px] w-10 bg-[#2C3539] dark:bg-[#F9FAFB] mb-2 opacity-60" />
                      <p className="text-sm text-[#666] dark:text-[#999] font-secondary leading-relaxed">
                        Skilled artisans and quality materials
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedContent>

              <AnimatedContent distance={50} duration={0.8} threshold={0.15} delay={0.3}>
                <div>
                  <div className="flex items-start gap-4 mb-3">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full border border-[#E5E7EB] dark:border-[#2A2A2A] text-xs font-semibold text-[#2C3539] dark:text-[#F9FAFB] font-secondary">
                      04
                    </span>
                    <div className="flex-1">
                      <h3 
                        className="text-2xl sm:text-3xl text-[#1A1A1A] dark:text-[#F9FAFB] font-serif mb-1"
                        style={{ fontFamily: "'EB Garamond', 'Times New Roman', 'Georgia', serif", fontWeight: 400 }}
                      >
                        Timely Delivery
                      </h3>
                      <div className="h-[2px] w-10 bg-[#2C3539] dark:bg-[#F9FAFB] mb-2 opacity-60" />
                      <p className="text-sm text-[#666] dark:text-[#999] font-secondary leading-relaxed">
                        On-schedule project completion
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedContent>
            </div>

            {/* Right Column - Single Image Carousel */}
            <AnimatedContent distance={50} duration={0.8} threshold={0.15} delay={0.2}>
              <div className="relative h-[400px] sm:h-[500px] lg:h-[600px]">
                <div className="relative w-full h-full rounded-3xl overflow-hidden bg-gray-200 dark:bg-gray-800">
                  {carouselImages.map((image, index) => {
                    const isActive = index === currentImageIndex;
                    return (
                      <div
                        key={index}
                        className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                          isActive
                            ? 'opacity-100 scale-100'
                            : 'opacity-0 scale-[1.02]'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`Millwork showcase ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/5" />
                      </div>
                    );
                  })}
                </div>

                {/* Minimal Progress Dots */}
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
                  {carouselImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`transition-all duration-300 rounded-full ${
                        index === currentImageIndex
                          ? 'w-6 h-2 bg-white'
                          : 'w-2 h-2 bg-white/50 hover:bg-white/80'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </AnimatedContent>
          </div>
        </div>
      </section>

      {/* Start Your Journey Section */}
      <section className="py-20 sm:py-24 md:py-28 bg-[#F5F5F5] dark:bg-[#0F0F0F] transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedContent distance={50} duration={0.8} threshold={0.15}>
            <div className="text-center">
              <h2 
                className="text-4xl sm:text-5xl md:text-6xl font-normal text-[#1A1A1A] dark:text-[#F9FAFB] mb-6 font-serif"
                style={{ fontFamily: "'EB Garamond', 'Times New Roman', 'Georgia', serif", fontWeight: 400 }}
              >
                Start your millwork journey
              </h2>
              <p className="text-base sm:text-lg text-[#666] dark:text-[#999] font-secondary mb-10">
                Tell us about your vision. We will bring it to life.
              </p>
              
              {/* Buttons */}
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <Button
                  variant="outline"
                  size="md"
                  className="flex items-center gap-2"
                >
                  Project details
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  className="flex items-center gap-2"
                >
                  Inquire
                </Button>
              </div>
              
              {/* Disclaimer */}
              <p className="text-xs text-[#666] dark:text-[#999] font-secondary">
                By submitting, you agree to our consultation process and design standards.
              </p>
            </div>
          </AnimatedContent>
        </div>
      </section>
    </div>
  );
};

export default Millwork;