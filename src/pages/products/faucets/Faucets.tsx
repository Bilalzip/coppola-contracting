import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../../components/ui/Button';
import SplitText from '../../../components/ui/SplitText';

const Faucets = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    document.title = 'Premium Faucets | Coppola Home';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Explore our premium collection of faucets. Precision crafted. Designed to last. Each faucet tells a story of quality and elegance.'
      );
    }
  }, []);

  const faqs = [
    {
      question: "What faucet styles do you carry?",
      answer: "We carry a wide range of styles — from sleek modern single-handle faucets to classic bridge and wall-mounted designs. We are proud to offer the highest quality Canadian made faucets from Rubinet and Aqualem that are not only stylish but also built for durability, performance, and water efficiency."
    },
    {
      question: "Are your faucets compatible with all sink types?",
      answer: "Yes. Whether you're installing a deck-mounted, wall-mounted, or vessel sink faucet, we'll help you choose the right fit. Our team ensures the faucet you select works perfectly with your sink setup and cabinetry."
    },
    {
      question: "Do your faucets come with warranties?",
      answer: "Yes — most of the faucets we supply come with manufacturer warranties that cover finish and mechanical function. We work with trusted brands known for both style and longevity."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#000000]">
      {/* Hero Section with Background Image */}
      <section className="relative h-[92vh] w-full flex items-center justify-center overflow-hidden">
        {/* Background Image with Zoom Out Effect */}
        <motion.div 
          className="absolute inset-0 w-full h-full"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <img
            src="/assets/gallery/kitchen-faucets-header-image.jpg"
            alt="Premium Faucets"
            className="w-full h-full object-cover"
          />
          {/* Subtle Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
        </motion.div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 py-20">
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <SplitText
              text="Premium faucets for every space"
              tag="h1"
              className="text-page-title font-normal text-white mb-8 leading-tight font-serif"
              splitType="chars"
              delay={30}
              duration={0.8}
            />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base md:text-lg text-white/90 mb-10 max-w-3xl mx-auto font-secondary"
          >
            Precision crafted. Designed to last. Each faucet tells a story of quality and elegance.
          </motion.p>

          {/* Simple Buttons - Smaller Size */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            <a href="#collections">
              <button className="px-6 py-2.5 text-sm rounded-2xl bg-white text-gray-900 font-medium hover:bg-gray-100 transition-all duration-300">
                Explore Collections
              </button>
            </a>
            <Link to="/quote">
              <button className="px-6 py-2.5 text-sm rounded-2xl bg-[#001f54] text-white font-medium hover:bg-[#002a6b] transition-all duration-300">
                Get a Quote
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Faucet Collections Section - Like Reference Image */}
      <section id="collections" className="py-24 px-4 bg-white dark:bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-4"
          >
            <p className="text-sm uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-3 font-secondary">
              Precision
            </p>
            <SplitText
              text="Faucet collections"
              tag="h2"
              className="text-4xl md:text-5xl font-normal text-gray-900 dark:text-white mb-4 font-serif"
              splitType="chars"
              delay={30}
              duration={0.7}
            />
            <p className="text-base text-gray-600 dark:text-gray-400 font-secondary max-w-2xl mx-auto">
              Engineered for performance and style in every room.
            </p>
          </motion.div>

          {/* Collections Grid - 2 Small Cards + 1 Large Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1fr_2fr] gap-6 mt-14">
            {/* Kitchen Faucets Card - Small */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group bg-gray-50 dark:bg-gray-900 rounded-3xl overflow-hidden transition-all duration-500 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
            >
              <Link to="/products/faucets/kitchen" className="block">
                {/* Image Section */}
                <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-800 overflow-hidden">
                  <img 
                    src="/assets/gallery/kitchen-faucets-card-image.avif" 
                    alt="Kitchen faucets"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Content Section */}
                <div className="p-5">
                  <h3 className="text-lg font-normal text-gray-900 dark:text-white mb-2 group-hover:text-[#001f54] dark:group-hover:text-[#0466c8] transition-colors font-serif">
                    Kitchen faucets
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 font-secondary leading-relaxed">
                    Sleek designs that transform your culinary workspace.
                  </p>
                  <div className="flex items-center text-gray-900 dark:text-white font-medium text-xs group-hover:text-[#001f54] dark:group-hover:text-[#0466c8] transition-colors">
                    <span className="relative inline-block">
                      View all
                      <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#001f54] dark:bg-[#0466c8] transition-all duration-300 group-hover:w-full"></span>
                    </span>
                    <svg className="w-3.5 h-3.5 ml-1.5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Bathroom Faucets Card - Small */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group bg-gray-50 dark:bg-gray-900 rounded-3xl overflow-hidden transition-all duration-500 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
            >
              <Link to="/products/faucets/bathroom" className="block">
                {/* Image Section */}
                <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-800 overflow-hidden">
                  <img 
                    src="/assets/gallery/bathroom-faucets-card-image.avif" 
                    alt="Bathroom faucets"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Content Section */}
                <div className="p-5">
                  <h3 className="text-lg font-normal text-gray-900 dark:text-white mb-2 group-hover:text-[#001f54] dark:group-hover:text-[#0466c8] transition-colors font-serif">
                    Bathroom faucets
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 font-secondary leading-relaxed">
                    Elegant solutions for modern bathroom design.
                  </p>
                  <div className="flex items-center text-gray-900 dark:text-white font-medium text-xs group-hover:text-[#001f54] dark:group-hover:text-[#0466c8] transition-colors">
                    <span className="relative inline-block">
                      View all
                      <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#001f54] dark:bg-[#0466c8] transition-all duration-300 group-hover:w-full"></span>
                    </span>
                    <svg className="w-3.5 h-3.5 ml-1.5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Shower Sets Card - Large Horizontal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group bg-gray-50 dark:bg-gray-900 rounded-3xl overflow-hidden transition-all duration-500 md:col-span-2 lg:col-span-1 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
            >
              <Link to="/products/faucets/shower" className="block h-full">
                <div className="flex flex-col lg:flex-row h-full">
                  {/* Large Image Section - Left Half */}
                  <div className="lg:w-1/2 h-64 lg:h-auto bg-gray-200 dark:bg-gray-800 overflow-hidden">
                    <img 
                      src="/assets/gallery/Shower-set-card-image.webp" 
                      alt="Shower sets"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  {/* Content Section - Right Half */}
                  <div className="lg:w-1/2 p-8 flex flex-col justify-center bg-white dark:bg-gray-900">
                    <h3 className="text-2xl font-normal text-gray-900 dark:text-white mb-3 group-hover:text-[#001f54] dark:group-hover:text-[#0466c8] transition-colors font-serif">
                      Shower sets
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 font-secondary leading-relaxed">
                      Precision water control with minimalist aesthetic.
                    </p>
                    <div className="flex items-center text-gray-900 dark:text-white font-medium text-sm group-hover:text-[#001f54] dark:group-hover:text-[#0466c8] transition-colors">
                      <span className="relative inline-block">
                        View all
                        <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#001f54] dark:bg-[#0466c8] transition-all duration-300 group-hover:w-full"></span>
                      </span>
                      <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Detailed Faucet Types Section - Split Layout */}
      <section className="py-20 px-4 bg-white dark:bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-10"
            >
              {/* Kitchen Faucets */}
              <div>
                <h3 className="text-2xl font-normal text-gray-900 dark:text-white mb-3 font-serif">
                  Kitchen faucets
                </h3>
                <p className="text-base text-gray-600 dark:text-gray-400 font-secondary leading-relaxed mb-0">
                  Functional art that transforms your kitchen into a professional culinary space.
                </p>
              </div>

              {/* Bathroom Faucets */}
              <div>
                <h3 className="text-2xl font-normal text-gray-900 dark:text-white mb-3 font-serif">
                  Bathroom faucets
                </h3>
                <p className="text-base text-gray-600 dark:text-gray-400 font-secondary leading-relaxed mb-0">
                  Refined designs that elevate your bathroom's aesthetic and functionality.
                </p>
              </div>

              {/* Shower Faucets */}
              <div>
                <h3 className="text-2xl font-normal text-gray-900 dark:text-white mb-3 font-serif">
                  Shower faucets
                </h3>
                <p className="text-base text-gray-600 dark:text-gray-400 font-secondary leading-relaxed mb-0">
                  Engineered for smooth water flow and lasting performance.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/quote">
                  <Button variant="outline" size="sm">
                    Quote
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="primary" size="sm" className="flex items-center gap-2">
                    Contact
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Right Column - Large Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="aspect-[4/3] lg:aspect-[3/4] bg-gray-200 dark:bg-gray-800 rounded-3xl overflow-hidden">
                {/* Placeholder - Replace with actual image */}
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-32 h-32 text-gray-300 dark:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-white dark:bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <SplitText
              text="FAQs"
              tag="h2"
              className="text-4xl md:text-5xl font-normal text-gray-900 dark:text-white mb-4 font-serif"
              splitType="chars"
              delay={40}
              duration={0.7}
              textAlign="left"
            />
            <p className="text-base text-gray-600 dark:text-gray-400 font-secondary">
              Answers to common questions about our precision-engineered faucet collections.
            </p>
          </motion.div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden"
              >
                {/* Question Button */}
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 flex items-start justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  <span className="text-lg font-normal text-gray-900 dark:text-white font-secondary pr-8 leading-relaxed">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex-shrink-0 mt-0.5"
                  >
                    <svg 
                      className="w-5 h-5 text-gray-900 dark:text-white" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M6 18L18 6M6 6l12 12" 
                      />
                    </svg>
                  </motion.div>
                </button>

                {/* Answer - Animated */}
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-0 border-t border-gray-100 dark:border-gray-800">
                        <p className="text-base text-gray-600 dark:text-gray-400 font-secondary leading-relaxed pt-4">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Faucets;
