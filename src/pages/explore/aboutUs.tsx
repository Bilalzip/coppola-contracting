import { useEffect, useRef, useState } from 'react';
import { Heart, Award, ArrowRight, CheckCircle, Users, Clock, Home, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';
import SplitText from '../../components/ui/SplitText';
import Button from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { usePageSections } from '../../lib/usePageSections';

const VALUE_ICONS = [Heart, Award, Users, CheckCircle];
const WHY_CHOOSE_ICONS = [Home, Users, Award, Clock, CheckCircle, Headphones];

const AboutUs = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const navigate = useNavigate();
  const { section } = usePageSections('about');

  const hero = section('hero', {
    heading: 'Coppola Home',
    subheading: 'Premium Kitchen & Bathroom Showroom',
    body: "We are a trusted destination for discerning homeowners, designers, and builders seeking thoughtfully selected products that elevate the everyday.",
    heading_color: '#FFFFFF',
    subheading_color: 'rgba(255,255,255,0.9)',
    body_color: 'rgba(255,255,255,0.9)',
  });
  const story = section('story', {
    heading: 'A Legacy of Excellence',
    subheading: 'Our Story',
    body: "At Coppola Home, we bring over two decades of expertise in transforming kitchens and bathrooms into spaces of unparalleled elegance and functionality. Founded on principles of meticulous craftsmanship and unwavering dedication to quality, we've established ourselves as Thunder Bay's premier destination for luxury home interiors.\n\nOur showroom showcases an extensive collection of premium products from the world's most respected manufacturers. From custom cabinetry and millwork to designer fixtures and hardware, every piece is carefully selected to meet our exacting standards.",
    image_url: '/assets/site/coppola-about-banner-image .jpg',
    heading_color: '#2C3539',
    subheading_color: '#5D6D74',
    body_color: '#2C3539',
  });
  const values = section('values', {
    heading: 'What We Stand For',
    subheading: 'Our Values',
    body: 'Our core values guide everything we do',
    heading_color: '#2C3539',
    subheading_color: '#5D6D74',
    body_color: '#5D6D74',
    items: [
      { title: 'Passion', description: 'We love what we do and it shows in every project' },
      { title: 'Excellence', description: 'Commitment to the highest standards of quality' },
      { title: 'Partnership', description: 'Building lasting relationships with our clients' },
      { title: 'Integrity', description: 'Honest, transparent, and reliable service' },
    ],
  });
  const whyChoose = section('why_choose', {
    heading: 'Why Choose Coppola Home',
    subheading: 'Why Choose Us',
    heading_color: '#2C3539',
    subheading_color: '#5D6D74',
    items: [
      { title: 'Extensive Showroom', description: 'Explore our 10,000+ sq ft showroom featuring the latest in kitchen and bathroom design' },
      { title: 'Expert Consultation', description: 'Our knowledgeable team provides personalized guidance for your project' },
      { title: 'Premium Brands', description: 'We partner with industry-leading manufacturers to bring you the best products' },
      { title: 'Timely Service', description: 'Efficient project management ensuring your timeline is met' },
      { title: 'Quality Assured', description: 'Every product meets our rigorous standards for durability and beauty' },
      { title: 'Ongoing Support', description: 'We are here for you from initial consultation through installation and beyond' },
    ],
  });
  const storyParagraphs = story.body.split('\n\n');

  useEffect(() => {
    document.title = 'About Us | Coppola Home';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Learn about Coppola Home - Thunder Bay\'s premier destination for luxury kitchen and bathroom design. Over two decades of excellence in craftsmanship and quality.'
      );
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const elements = document.querySelectorAll('.fade-in-element');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#000000] transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative h-[90vh] w-full overflow-hidden">
        {/* Hero Image with Zoom Out Animation */}
        <motion.div 
          className="absolute inset-0"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <img
            src={hero.image_url}
            alt="Coppola Home luxury kitchen and bathroom showroom"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
        </motion.div>

        {/* Hero Content */}
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6 z-10">
          <SplitText
            text={hero.heading}
            tag="h1"
            className="text-page-title font-normal mb-6 font-serif"
            style={{ color: hero.heading_color }}
            splitType="chars"
            delay={40}
            duration={0.8}
            from={{ opacity: 0, y: 50, rotateX: -90 }}
            to={{ opacity: 1, y: 0, rotateX: 0 }}
            textAlign="center"
            threshold={0.3}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-sm md:text-base tracking-[0.25em] mb-6 font-medium font-['Poppins',sans-serif] uppercase"
            style={{ color: hero.subheading_color }}
          >
            {hero.subheading}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-base md:text-lg max-w-3xl leading-relaxed font-['Poppins',sans-serif]"
            style={{ color: hero.body_color }}
          >
            {hero.body}
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 md:py-28 lg:py-32 px-6 bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Text Content */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div>
                <motion.p
                  className="text-xs md:text-sm font-medium mb-4 tracking-[0.2em] uppercase font-['Poppins',sans-serif]"
                  style={{ color: story.subheading_color }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  {story.subheading}
                </motion.p>

                <SplitText
                  text={story.heading}
                  tag="h2"
                  className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight font-serif"
                  style={{ color: story.heading_color }}
                  splitType="chars"
                  delay={30}
                  duration={0.8}
                  from={{ opacity: 0, y: 30 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.3}
                />
              </div>

              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                {storyParagraphs.map((paragraph, i) => (
                  <p key={i} className="text-base md:text-lg leading-relaxed font-['Poppins',sans-serif]" style={{ color: story.body_color }}>
                    {paragraph}
                  </p>
                ))}
              </motion.div>

              <motion.div 
                className="pt-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="group"
                  onClick={() => navigate('/contact')}
                >
                  Get in Touch
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Column - Image */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={story.image_url}
                  alt="Coppola Home premium kitchen interior showcase"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              
              {/* Decorative Element */}
              <motion.div
                className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#2C3539] dark:bg-white rounded-3xl -z-10"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 0.1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-28 px-6 bg-[#F9FAFB] dark:bg-[#000000] transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.p
              className="text-xs md:text-sm font-medium mb-4 tracking-[0.2em] uppercase font-['Poppins',sans-serif]"
              style={{ color: values.subheading_color }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {values.subheading}
            </motion.p>

            <SplitText
              text={values.heading}
              tag="h2"
              className="text-4xl md:text-5xl lg:text-6xl font-normal mb-6 font-serif"
              style={{ color: values.heading_color }}
              splitType="chars"
              delay={30}
              duration={0.8}
              from={{ opacity: 0, y: 30 }}
              to={{ opacity: 1, y: 0 }}
              textAlign="center"
              threshold={0.3}
            />

            <motion.p
              className="text-base md:text-lg max-w-2xl mx-auto font-['Poppins',sans-serif]"
              style={{ color: values.body_color }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {values.body}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {(values.items as { title: string; description: string }[]).map((value, index) => {
              const Icon = VALUE_ICONS[index % VALUE_ICONS.length];
              return (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-[#0a0a0a] p-8 rounded-2xl text-center group transition-all duration-500 border border-gray-100 dark:border-[#1a1a1a] shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <motion.div 
                    className="inline-flex items-center justify-center w-16 h-16 bg-[#F9FAFB] dark:bg-[#1a1a1a] rounded-full mb-6 group-hover:scale-110 transition-transform duration-300"
                  >
                    <Icon className="w-8 h-8 text-[#2C3539] dark:text-[#F9FAFB]" />
                  </motion.div>
                  
                  <h3 className="text-xl font-semibold text-[#2C3539] dark:text-[#FFFFFF] mb-3 font-['Poppins',sans-serif]">
                    {value.title}
                  </h3>
                  
                  <p className="text-[#5D6D74] dark:text-[#D1D5DB] leading-relaxed font-['Poppins',sans-serif]">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 md:py-28 px-6 bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.p
              className="text-xs md:text-sm font-medium mb-4 tracking-[0.2em] uppercase font-['Poppins',sans-serif]"
              style={{ color: whyChoose.subheading_color }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {whyChoose.subheading}
            </motion.p>

            <SplitText
              text={whyChoose.heading}
              tag="h2"
              className="text-4xl md:text-5xl lg:text-6xl font-normal font-serif"
              style={{ color: whyChoose.heading_color }}
              splitType="chars"
              delay={30}
              duration={0.8}
              from={{ opacity: 0, y: 30 }}
              to={{ opacity: 1, y: 0 }}
              textAlign="center"
              threshold={0.3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {(whyChoose.items as { title: string; description: string }[]).map((feature, index) => {
              const Icon = WHY_CHOOSE_ICONS[index % WHY_CHOOSE_ICONS.length];
              return (
                <motion.div
                  key={index}
                  className="group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-[#F9FAFB] dark:bg-[#000000] p-8 rounded-2xl border border-gray-100 dark:border-[#1a1a1a] group-hover:border-[#2C3539] dark:group-hover:border-[#F9FAFB] transition-all duration-300">
                      <Icon className="w-12 h-12 text-[#2C3539] dark:text-[#F9FAFB] mb-6 group-hover:scale-110 transition-transform duration-300" />
                      
                      <h3 className="text-xl font-semibold text-[#2C3539] dark:text-[#FFFFFF] mb-3 font-['Poppins',sans-serif]">
                        {feature.title}
                      </h3>
                      
                      <p className="text-[#5D6D74] dark:text-[#D1D5DB] leading-relaxed font-['Poppins',sans-serif]">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <style>{`
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

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AboutUs;
