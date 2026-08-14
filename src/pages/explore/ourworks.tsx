import { motion } from 'framer-motion';
import { Grid, Home, Building2, Package } from 'lucide-react';
import { usePageSections } from '../../lib/usePageSections';

const OurWorks = () => {
  const { section } = usePageSections('our-works');
  const hero = section('hero', {
    heading: 'Our Work',
    body: 'Explore our portfolio of exceptional projects that showcase our commitment to quality craftsmanship, innovative design, and attention to detail.',
    heading_color: '#111827',
    body_color: '#4B5563',
  });
  const emptyState = section('empty_state', {
    heading: 'Portfolio Coming Soon',
    body: "We're currently curating our portfolio to showcase our finest residential and commercial projects. Each project represents our dedication to exceptional craftsmanship and innovative design solutions.",
    heading_color: '#111827',
    body_color: '#4B5563',
  });

  // Sample projects data structure for future implementation
  const projects = [
    // Projects will be dynamically added through admin panel
  ];

  const categories = [
    { name: 'All Projects', count: 0, icon: Grid },
    { name: 'Residential', count: 0, icon: Home },
    { name: 'Commercial', count: 0, icon: Building2 },
    { name: 'Custom Millwork', count: 0, icon: Package },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] pt-32 pb-20 transition-colors duration-300">
      {/* Hero Section */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-900 rounded-full mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Grid className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400 font-['Poppins',sans-serif]">
              Portfolio
            </span>
          </motion.div>
          
          <motion.h1
            className="text-page-title font-semibold mb-6 italic"
            style={{ fontFamily: "'EB Garamond', serif", color: hero.heading_color }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {hero.heading.split(' ').slice(0, -1).join(' ')}{' '}
            <span style={{ background: 'linear-gradient(135deg, #4a90e2 0%, #001f54 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              {hero.heading.split(' ').slice(-1)}
            </span>
          </motion.h1>

          <motion.p
            className="text-lg font-['Poppins',sans-serif] leading-relaxed"
            style={{ color: hero.body_color }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {hero.body}
          </motion.p>
        </div>
      </motion.div>

      {/* Category Filters */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.name}
                className="group px-5 py-2.5 bg-white dark:bg-[#0F0F0F] border border-gray-200 dark:border-gray-800 rounded-full hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-gray-500 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors font-['Poppins',sans-serif]">
                    {category.name}
                  </span>
                  {category.count > 0 && (
                    <span className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-600 dark:text-gray-400 rounded-full">
                      {category.count}
                    </span>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Projects Grid or Empty State */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {projects.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="group bg-white dark:bg-[#0F0F0F] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-500 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)] cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-2.5 py-1 bg-white/95 dark:bg-black/95 backdrop-blur-sm text-xs font-medium text-gray-900 dark:text-white rounded-full font-['Poppins',sans-serif] uppercase tracking-wide">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 font-['Poppins',sans-serif] group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-['Poppins',sans-serif] leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                  
                  {/* View Project Link */}
                  <div className="mt-4 flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white group-hover:gap-3 transition-all duration-300">
                    <span className="font-['Poppins',sans-serif]">View Project</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* Empty State */
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <div className="max-w-2xl mx-auto bg-white dark:bg-[#0F0F0F] rounded-2xl p-12 border border-gray-200 dark:border-gray-800 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
              {/* Icon */}
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Grid className="w-8 h-8 text-gray-500 dark:text-gray-500" />
              </div>
              
              {/* Heading */}
              <h3 className="text-3xl font-semibold mb-4 font-['EB Garamond',serif] italic" style={{ color: emptyState.heading_color }}>
                {emptyState.heading.split(' ').slice(0, -2).join(' ')}{' '}
                <span style={{ background: 'linear-gradient(135deg, #4a90e2 0%, #001f54 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  {emptyState.heading.split(' ').slice(-2).join(' ')}
                </span>
              </h3>

              {/* Description */}
              <p className="text-base font-['Poppins',sans-serif] leading-relaxed mb-8" style={{ color: emptyState.body_color }}>
                {emptyState.body}
              </p>
              
              {/* Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
                  <div className="flex items-center gap-2 mb-2">
                    <Home className="w-4 h-4 text-gray-500 dark:text-gray-500" />
                    <span className="text-xs font-semibold text-gray-900 dark:text-white font-['Poppins',sans-serif]">Residential Projects</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-['Poppins',sans-serif]">
                    Custom kitchens, bathrooms, and millwork
                  </p>
                </div>
                
                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="w-4 h-4 text-gray-500 dark:text-gray-500" />
                    <span className="text-xs font-semibold text-gray-900 dark:text-white font-['Poppins',sans-serif]">Commercial Projects</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-['Poppins',sans-serif]">
                    Office spaces, retail, and hospitality
                  </p>
                </div>
              </div>
              
              {/* Note - Removed */}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default OurWorks;