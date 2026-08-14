import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from '../ui/SplitText';
import { supabase } from '../../lib/supabase';
import type { Testimonial } from '../../types/database';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const [testimonialsData, setTestimonialsData] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState(3);

  useEffect(() => {
    supabase
      .from('testimonials')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .then(({ data }) => setTestimonialsData(data ?? []));
  }, []);

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 768) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 50 },
        {
          scrollTrigger: {
            trigger: headerRef.current,
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

      const cards = document.querySelectorAll('.testimonial-card');
      gsap.fromTo(cards,
        { opacity: 0, y: 60 },
        {
          scrollTrigger: {
            trigger: '.testimonials-container',
            start: 'top 90%',
            end: 'top 60%',
            toggleActions: 'play none none reverse',
            fastScrollEnd: true,
            preventOverlaps: true,
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [testimonialsData]);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + visibleCards >= testimonialsData.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, testimonialsData.length - visibleCards) : prev - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const maxIndex = Math.max(0, testimonialsData.length - visibleCards);

  if (testimonialsData.length === 0) return null;

  return (
    <section ref={sectionRef} className="py-20 px-6 transition-colors duration-300 relative border-t border-oxford-blue/10 dark:border-white/10">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <p
            className="text-sm font-medium text-gray-900 dark:text-white mb-4 tracking-wider uppercase font-semibold"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            TESTIMONIALS
          </p>
          <SplitText
            text="What Our Client Say!"
            tag="h2"
            className="text-5xl lg:text-6xl font-serif text-[#2C3539] dark:text-[#FFFFFF]"
            style={{ fontFamily: 'Poppins, sans-serif' }}
            splitType="chars"
            delay={30}
            duration={0.7}
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            textAlign="center"
          />
        </div>

        {/* Carousel Container */}
        <div className="relative testimonials-container">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-10 w-11 h-11 rounded-full bg-white/60 dark:bg-white/5 backdrop-blur border border-oxford-blue/10 dark:border-white/10 flex items-center justify-center text-[#2C3539] dark:text-[#FFFFFF] hover:bg-[#0a1128] hover:text-white hover:border-transparent dark:hover:bg-[#FFFFFF] dark:hover:text-[#0a1128] transition-all duration-300 disabled:opacity-25 disabled:cursor-not-allowed"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-10 w-11 h-11 rounded-full bg-white/60 dark:bg-white/5 backdrop-blur border border-oxford-blue/10 dark:border-white/10 flex items-center justify-center text-[#2C3539] dark:text-[#FFFFFF] hover:bg-[#0a1128] hover:text-white hover:border-transparent dark:hover:bg-[#FFFFFF] dark:hover:text-[#0a1128] transition-all duration-300 disabled:opacity-25 disabled:cursor-not-allowed"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Testimonial Cards */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out gap-6"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`
              }}
            >
              {testimonialsData.map((testimonial) => (
                <article
                  key={testimonial.id}
                  className="testimonial-card group flex-shrink-0 flex flex-col rounded-2xl p-8 border border-oxford-blue/10 dark:border-white/10 bg-white/40 dark:bg-white/[0.03] backdrop-blur-sm transition-colors duration-300 hover:bg-white/70 dark:hover:bg-white/[0.06] hover:border-oxford-blue/20 dark:hover:border-white/20"
                  style={{
                    width: `calc(${100 / visibleCards}% - ${(visibleCards - 1) * 24 / visibleCards}px)`
                  }}
                >
                  {/* Quote Mark */}
                  <span
                    aria-hidden="true"
                    className="font-serif text-6xl leading-[0.6] text-oxford-blue/15 dark:text-white/20 select-none"
                  >
                    &ldquo;
                  </span>

                  {/* Testimonial Text */}
                  <p className="mt-6 flex-1 font-serif text-lg leading-relaxed text-[#2C3539] dark:text-[#E5E7EB]">
                    {testimonial.quote}
                  </p>

                  {/* Author Info */}
                  <div className="mt-7 pt-5 border-t border-oxford-blue/10 dark:border-white/10">
                    {/* font-secondary outranks the global serif rule on headings */}
                    <h3 className="font-secondary font-medium text-xs uppercase tracking-[0.18em] text-[#5D6D74] dark:text-[#9CA3AF]">
                      {testimonial.name}
                    </h3>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? 'w-8 bg-[#0a1128] dark:bg-white'
                    : 'w-1.5 bg-oxford-blue/25 dark:bg-white/30'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

