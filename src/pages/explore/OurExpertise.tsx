import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SplitText from '../../components/ui/SplitText';

const OurExpertise: React.FC = () => {
  const navigate = useNavigate();

  // Navigation handler for expertise cards
  const handleExpertiseClick = (section: string) => {
    switch (section) {
      case 'Customer Service':
        navigate('/contact');
        break;
      case 'Custom Cabinetry':
        navigate('/custom-cabinetry');
        break;
      case 'Quartz Countertops':
        navigate('/quartz-countertops');
        break;
      case 'Bathroom Vanities':
        navigate('/products/vanities');
        break;
      case 'Affordable Kitchen Solutions':
        navigate('/custom-cabinetry');
        break;
      case 'Commercial Millwork':
        navigate('/commercial-millwork');
        break;
      case 'Multi-Residential':
        navigate('/commercial-millwork');
        break;
      case 'Design & Consultation':
        navigate('/contact');
        break;
      case 'Project Logistics':
        navigate('/contact');
        break;
      default:
        navigate('/contact');
    }
  };

  const expertiseSections = [
    {
      title: "Customer Service",
      description: "Exceptional service is at the heart of everything we do — building trust through clear communication, transparency, and a personal touch from start to finish.",
      image: "/Vanities/Hudson-White-60_01-1024x1024.jpg",
    },
    {
      title: "Custom Cabinetry",
      description: "Bespoke cabinetry crafted to fit your space, style, and storage needs, using premium materials and precise craftsmanship.",
      image: "/Vanities/JamesMartin/addison-60-double-vanity-cabinet-in-glossy-white-double-bathroom-vanity-james-martin-vanities-995683.webp",
    },
    {
      title: "Quartz Countertops",
      description: "Durable, low-maintenance, and timelessly beautiful — we supply and install high-quality quartz surfaces for kitchens, baths, and beyond.",
      image: "/gallery/Copy-of-1-1.jpg",
    },
    {
      title: "Bathroom Vanities",
      description: "From modern minimalism to classic elegance, our vanities combine style, function, and superior build quality.",
      image: "/Vanities/JamesMartin/breckenridge-60-double-vanity-in-bright-white-single-bathroom-vanity-james-martin-vanities-274332.webp",
    },
    {
      title: "Affordable Kitchen Solutions",
      description: "Thoughtfully designed kitchens that deliver quality, style, and value without compromise.",
      image: "/gallery/Copy-of-6-1-1500x1001.jpg",
    },
    {
      title: "Commercial Millwork",
      description: "End-to-end millwork solutions for commercial spaces, from design and fabrication to installation — bringing your vision to life with precision.",
      image: "/gallery/Copy-of-200007-20200610-0.jpg",
    },
    {
      title: "Multi-Residential",
      description: "Expertly managed cabinetry and finishings for apartments, condos, and large-scale developments, delivered on time and on budget.",
      image: "/gallery/Copy-of-200007-20200610-2-1500x816.jpg",
    },
    {
      title: "Design & Consultation",
      description: "Professional design guidance to help you visualize, plan, and perfect every detail of your space.",
      image: "/Vanities/JamesMartin/athens-72-double-vanity-cabinet-glossy-white-double-bathroom-vanity-james-martin-vanities-250723.webp",
    },
    {
      title: "Project Logistics",
      description: "Seamless coordination from start to finish — managing timelines, deliveries, and installation so your project runs smoothly.",
      image: "/gallery/Copy-of-Image-28.jpg",
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A]">
      {/* Hero Section - Centered Header */}
      <section className="py-24 md:py-32 bg-white dark:bg-[#0A0A0A]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            {/* Main Heading with SplitText */}
            <SplitText
              text="Our works"
              tag="h1"
              className="text-page-title font-normal text-[#1A1A1A] dark:text-white font-serif tracking-tight"
              splitType="chars"
              delay={30}
              duration={0.8}
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              textAlign="center"
            />
            
            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base md:text-lg text-[#5D6D74] dark:text-[#D1D5DB] max-w-3xl mx-auto leading-relaxed font-['Poppins',sans-serif]"
            >
              A testament to precision, craftsmanship, and elegant design in every project we touch
            </motion.p>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-3"
            >
              <span className="px-4 py-2 bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#2A2A2A] rounded-md text-sm font-medium text-[#1A1A1A] dark:text-white font-['Poppins',sans-serif]">
                Luxury
              </span>
              <span className="px-4 py-2 bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#2A2A2A] rounded-md text-sm font-medium text-[#1A1A1A] dark:text-white font-['Poppins',sans-serif]">
                Bespoke
              </span>
              <span className="px-4 py-2 bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#2A2A2A] rounded-md text-sm font-medium text-[#1A1A1A] dark:text-white font-['Poppins',sans-serif]">
                Refined
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Expertise Sections Grid */}
      <section className="py-16 pb-24 bg-gray-50/50 dark:bg-[#000000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {expertiseSections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => handleExpertiseClick(section.title)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleExpertiseClick(section.title);
                  }
                }}
              >
                <div className="bg-white dark:bg-[#0a0a0a] rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-500 shadow-sm hover:shadow-lg h-full flex flex-col">
                  {/* Image Section */}
                  <div className="relative h-56 overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img
                      src={section.image}
                      alt={section.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-normal text-[#1A1A1A] dark:text-white mb-3 font-serif group-hover:text-[#001f54] dark:group-hover:text-[#0466c8] transition-colors">
                      {section.title}
                    </h3>
                    <p className="text-sm text-[#5D6D74] dark:text-[#D1D5DB] leading-relaxed font-['Poppins',sans-serif] flex-1">
                      {section.description}
                    </p>

                    {/* Explore Link */}
                    <div className="mt-4 flex items-center text-sm font-medium text-[#001f54] dark:text-[#0466c8] group-hover:gap-2 transition-all duration-300">
                      <span className="relative">
                        Explore
                        <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#001f54] dark:bg-[#0466c8] transition-all duration-300 group-hover:w-full"></span>
                      </span>
                      <svg 
                        className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurExpertise;
