import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import AnimatedContent from '../components/ui/AnimatedContent';
import Button from '../components/ui/Button';
import SplitText from '../components/ui/SplitText';

const galleryImages = [
  '/gallery/Copy-of-1-1.jpg',
  '/gallery/Copy-of-1a-1500x1000.jpg',
  '/gallery/Copy-of-6-1-1500x1001.jpg',
  '/gallery/Copy-of-Image-28.jpg',
];

const CustomCabinetry: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] transition-colors duration-300">
        {/* Hero Header - Custom cabinetry masterpieces */}
        <section className="relative h-[400px] sm:h-[480px] md:h-[520px] bg-gray-700 dark:bg-gray-900 overflow-hidden">
          <div className="absolute inset-0 animate-zoom-out">
            <img
              src="/gallery/24-1-2.jpg"
              alt="Custom cabinetry showcase"
              className="w-full h-full object-cover opacity-40"
            />
          </div>
          <div className="absolute inset-0 bg-black/30" />
          
          <div className="relative h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
              <SplitText
                text="Custom cabinetry masterpieces"
                tag="h1"
                className="text-page-title text-white leading-tight tracking-tight"
                style={{ fontFamily: "'EB Garamond', 'Times New Roman', 'Georgia', serif", fontWeight: 400 }}
                splitType="chars"
                delay={30}
                duration={0.7}
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                textAlign="center"
              />
              <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-3xl mx-auto font-secondary mt-6">
                Precision engineering meets artisan craftsmanship in every cabinet we design and build.
              </p>
            </div>
          </div>
        </section>

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

        {/* Bespoke Cabinetry Design - Text Left, Image Right */}
        <section className="py-16 sm:py-20 md:py-24 bg-[#FAFAFA] dark:bg-[#0F0F0F] transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Column - Text */}
              <AnimatedContent distance={60} duration={0.8} threshold={0.05} direction="horizontal" reverse={true}>
                <div>
                  <h2
                    className="text-3xl sm:text-4xl md:text-5xl text-[#1A1A1A] dark:text-[#F9FAFB] leading-tight tracking-tight font-serif mb-6"
                    style={{ fontFamily: "'EB Garamond', 'Times New Roman', 'Georgia', serif", fontWeight: 400 }}
                  >
                    Bespoke Cabinetry Design
                  </h2>
                  <p className="text-sm sm:text-base text-[#666] dark:text-[#999] leading-relaxed font-secondary mb-6">
                    Transform your space with custom cabinetry that perfectly fits your style and requirements. Our expert craftsmen create beautiful, functional pieces using premium materials and innovative design solutions.
                  </p>
                  <ul className="space-y-3">
                    {['Custom sizing for perfect fit', 'Premium wood selection', 'Professional installation', 'Lifetime warranty'].map((item) => (
                      <li key={item} className="flex items-center text-sm text-[#666] dark:text-[#999] font-secondary">
                        <span className="inline-block w-1.5 h-1.5 bg-[#2C3539] dark:bg-[#F9FAFB] rounded-full mr-3 flex-shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedContent>

              {/* Right Column - Image */}
              <AnimatedContent distance={60} duration={0.8} threshold={0.05} delay={0.1} direction="horizontal" reverse={false}>
                <div className="relative h-[320px] sm:h-[380px] lg:h-[420px] rounded-3xl overflow-hidden bg-gray-200 dark:bg-gray-800">
                  <img
                    src={galleryImages[0]}
                    alt="Bespoke cabinetry design"
                    className="w-full h-full object-cover"
                  />
                </div>
              </AnimatedContent>
            </div>
          </div>
        </section>

        {/* Premium Materials & Craftsmanship - Image Left, Text Right */}
        <section className="py-16 sm:py-20 md:py-24 bg-white dark:bg-[#0A0A0A] transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Column - Image */}
              <AnimatedContent distance={60} duration={0.8} threshold={0.05} direction="horizontal" reverse={true}>
                <div className="relative h-[320px] sm:h-[380px] lg:h-[420px] rounded-3xl overflow-hidden bg-gray-200 dark:bg-gray-800">
                  <img
                    src={galleryImages[1]}
                    alt="Premium materials and craftsmanship"
                    className="w-full h-full object-cover"
                  />
                </div>
              </AnimatedContent>

              {/* Right Column - Text */}
              <AnimatedContent distance={60} duration={0.8} threshold={0.05} delay={0.1} direction="horizontal" reverse={false}>
                <div>
                  <h2
                    className="text-3xl sm:text-4xl md:text-5xl text-[#1A1A1A] dark:text-[#F9FAFB] leading-tight tracking-tight font-serif mb-6"
                    style={{ fontFamily: "'EB Garamond', 'Times New Roman', 'Georgia', serif", fontWeight: 400 }}
                  >
                    Premium Materials & Craftsmanship
                  </h2>
                  <p className="text-sm sm:text-base text-[#666] dark:text-[#999] leading-relaxed font-secondary mb-6">
                    Our cabinetry combines elegant design with practical functionality, crafted to your exact specifications. We use only the finest materials and traditional techniques to ensure lasting beauty and durability.
                  </p>
                  <ul className="space-y-3">
                    {['Personalized design consultation', 'Quality craftsmanship guarantee', 'Custom finishes and hardware', 'Expert project management'].map((item) => (
                      <li key={item} className="flex items-center text-sm text-[#666] dark:text-[#999] font-secondary">
                        <span className="inline-block w-1.5 h-1.5 bg-[#2C3539] dark:bg-[#F9FAFB] rounded-full mr-3 flex-shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedContent>
            </div>
          </div>
        </section>

        {/* Innovative Storage Solutions - Text Left, Image Right */}
        <section className="py-16 sm:py-20 md:py-24 bg-[#FAFAFA] dark:bg-[#0F0F0F] transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Column - Text */}
              <AnimatedContent distance={60} duration={0.8} threshold={0.05} direction="horizontal" reverse={true}>
                <div>
                  <h2
                    className="text-3xl sm:text-4xl md:text-5xl text-[#1A1A1A] dark:text-[#F9FAFB] leading-tight tracking-tight font-serif mb-6"
                    style={{ fontFamily: "'EB Garamond', 'Times New Roman', 'Georgia', serif", fontWeight: 400 }}
                  >
                    Innovative Storage Solutions
                  </h2>
                  <p className="text-sm sm:text-base text-[#666] dark:text-[#999] leading-relaxed font-secondary mb-6">
                    Maximize your space with intelligent storage solutions designed specifically for your needs. From hidden compartments to specialized organizers, we create cabinetry that works as hard as you do.
                  </p>
                  <ul className="space-y-3">
                    {['Smart storage integration', 'Space optimization', 'Custom organization systems', 'Accessibility considerations'].map((item) => (
                      <li key={item} className="flex items-center text-sm text-[#666] dark:text-[#999] font-secondary">
                        <span className="inline-block w-1.5 h-1.5 bg-[#2C3539] dark:bg-[#F9FAFB] rounded-full mr-3 flex-shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedContent>

              {/* Right Column - Image */}
              <AnimatedContent distance={60} duration={0.8} threshold={0.05} delay={0.1} direction="horizontal" reverse={false}>
                <div className="relative h-[320px] sm:h-[380px] lg:h-[420px] rounded-3xl overflow-hidden bg-gray-200 dark:bg-gray-800">
                  <img
                    src={galleryImages[2]}
                    alt="Innovative storage solutions"
                    className="w-full h-full object-cover"
                  />
                </div>
              </AnimatedContent>
            </div>
          </div>
        </section>

        {/* Commercial & Residential Excellence - Image Left, Text Right */}
        <section className="py-16 sm:py-20 md:py-24 bg-white dark:bg-[#0A0A0A] transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Column - Image */}
              <AnimatedContent distance={60} duration={0.8} threshold={0.05} direction="horizontal" reverse={true}>
                <div className="relative h-[320px] sm:h-[380px] lg:h-[420px] rounded-3xl overflow-hidden bg-gray-200 dark:bg-gray-800">
                  <img
                    src={galleryImages[3]}
                    alt="Commercial and residential excellence"
                    className="w-full h-full object-cover"
                  />
                </div>
              </AnimatedContent>

              {/* Right Column - Text */}
              <AnimatedContent distance={60} duration={0.8} threshold={0.05} delay={0.1} direction="horizontal" reverse={false}>
                <div>
                  <h2
                    className="text-3xl sm:text-4xl md:text-5xl text-[#1A1A1A] dark:text-[#F9FAFB] leading-tight tracking-tight font-serif mb-6"
                    style={{ fontFamily: "'EB Garamond', 'Times New Roman', 'Georgia', serif", fontWeight: 400 }}
                  >
                    Commercial & Residential Excellence
                  </h2>
                  <p className="text-sm sm:text-base text-[#666] dark:text-[#999] leading-relaxed font-secondary mb-6">
                    Whether for your home or business, our cabinetry solutions deliver exceptional quality and performance. We handle projects of all sizes with the same attention to detail and commitment to excellence.
                  </p>
                  <ul className="space-y-3">
                    {['Commercial-grade materials', 'Large-scale project expertise', 'On-time delivery guarantee', 'Professional installation team'].map((item) => (
                      <li key={item} className="flex items-center text-sm text-[#666] dark:text-[#999] font-secondary">
                        <span className="inline-block w-1.5 h-1.5 bg-[#2C3539] dark:bg-[#F9FAFB] rounded-full mr-3 flex-shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedContent>
            </div>
          </div>
        </section>

        {/* Start Your Journey */}
        <section className="py-20 sm:py-24 md:py-28 bg-[#F5F5F5] dark:bg-[#0F0F0F] transition-colors duration-300">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedContent distance={30} duration={0.6} threshold={0.05}>
              <div className="text-center">
                <h2
                  className="text-4xl sm:text-5xl md:text-6xl font-normal text-[#1A1A1A] dark:text-[#F9FAFB] mb-6 font-serif"
                  style={{ fontFamily: "'EB Garamond', 'Times New Roman', 'Georgia', serif", fontWeight: 400 }}
                >
                  Start your cabinetry journey
                </h2>
                <p className="text-base sm:text-lg text-[#666] dark:text-[#999] font-secondary mb-10">
                  Tell us about your vision. We will bring it to life.
                </p>
                <div className="flex flex-wrap justify-center gap-4 mb-6">
                  <Button
                    variant="outline"
                    size="md"
                    className="flex items-center gap-2"
                    onClick={() => navigate('/contact')}
                  >
                    Project details
                  </Button>
                  <Button
                    variant="primary"
                    size="md"
                    className="flex items-center gap-2"
                    onClick={() => navigate('/contact')}
                  >
                    Get in touch
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-[#666] dark:text-[#999] font-secondary">
                  By submitting, you agree to our consultation process and design standards.
                </p>
              </div>
            </AnimatedContent>
          </div>
        </section>
      </div>
    </>
  );
};

export default CustomCabinetry;
