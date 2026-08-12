import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const CallToAction = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 60 },
        {
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 90%',
            end: 'top 60%',
            toggleActions: 'play none none reverse',
            fastScrollEnd: true,
            preventOverlaps: true,
          },
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-transparent px-6 overflow-visible transition-colors duration-300 -mb-32 z-10">
      <div className="max-w-7xl mx-auto relative">
        {/* Floating Card */}
        <div className="relative bg-gradient-to-br from-[#1a2744] via-[#0a1128] to-[#0d1930] rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] hover:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.6)] transition-shadow duration-300">
          {/* Decorative Elements */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-blue-400/10"></div>
          <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-gradient-to-tl from-blue-500/25 via-blue-600/15 to-transparent blur-3xl"></div>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-20">
            <div className="absolute top-10 right-10 w-full h-full rounded-full border border-[#FFFFFF]/20"></div>
            <div className="absolute top-20 right-20 w-[500px] h-[500px]">
              {/* Dotted pattern effect */}
              <svg className="w-full h-full" viewBox="0 0 500 500">
                <defs>
                  <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.5" fill="#FFFFFF" opacity="0.3"/>
                  </pattern>
                </defs>
                <ellipse cx="250" cy="250" rx="240" ry="240" fill="url(#dots)"/>
              </svg>
            </div>
          </div>

          <div className="relative z-20 px-8 md:px-12 lg:px-16 py-16 md:py-20">
            <div ref={contentRef} className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <div className="max-w-2xl">
                {/* Main Heading */}
                <h2
                  className="text-5xl md:text-6xl lg:text-7xl font-medium text-white mb-5 leading-tight"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Experience superior<br />craftsmanship
                </h2>

                {/* Subheading */}
                <p
                  className="text-base text-white/60 max-w-xl"
                  style={{ fontFamily: 'EB Garamond, serif' }}
                >
                  Custom kitchens and bathrooms with precision design.
                </p>
              </div>

              <Button
                onClick={() => navigate('/quote')}
                variant="primary"
                size="lg"
                className="bg-white text-[#0a1128] hover:bg-gray-100 shadow-lg md:mb-1 focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                Inquire
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;




