
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Instagram, Linkedin, Facebook } from 'lucide-react';
import Button from '../ui/Button';
import StaggeredMenu from './StaggeredMenu';

interface NavbarProps {
  onNavigate?: (page: 'home' | 'about' | 'mirror' | 'faucets' | 'instock' | 'customcabinetry' | 'kitchenfaucet' | 'millwork' | 'ourexpertise' | 'getquote') => void;
  currentPage?: 'home' | 'about' | 'mirror' | 'faucets' | 'instock' | 'customcabinetry' | 'kitchenfaucet' | 'millwork' | 'ourexpertise' | 'getquote';
}

const Navbar = ({ currentPage = 'home' }: NavbarProps) => {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [activeExplorePreview, setActiveExplorePreview] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { name: 'Products', href: '#', hasDropdown: true, dropdownType: 'products' },
    { name: 'Cabinetry', href: '/custom-cabinetry', page: 'customcabinetry' as const },
    { name: 'Millwork', href: '/commercial-millwork', page: 'millwork' as const },
    { name: 'Outdoor Kitchens', href: 'https://q-boo.com/?srsltid=AfmBOors7lrkKMzbn6NDPblHiqPgb66l-TK522KQZnq6bsWEZ0kwFfZ4', isExternal: true },
    { name: 'In Stock', href: '/in-stock', page: 'instock' as const },
    { name: 'Explore', href: '#', hasDropdown: true, dropdownType: 'explore' },
  ];

  const productCategories = [
    { name: 'Vanities', href: '/products/vanities', icon: '/assets/icons/nightstand.svg' },
    { name: 'Faucets', href: '/products/faucets', icon: '/assets/icons/faucet.svg' },
    { name: 'Quartz Countertops', href: '/quartz-countertops', icon: '/assets/icons/tiles.svg' },
    { name: 'Sinks', href: '/products/sinks', icon: '/assets/icons/sink.svg' },
    { name: 'Hardware', href: '/hardware', icon: '/assets/icons/closet.svg' },
    { name: 'Flooring', href: '/products/flooring', icon: '/assets/icons/tiles.svg' },
    { name: 'Lighting', href: '/products/lighting', icon: '/assets/icons/lamp.svg' },
    { name: 'Mirrors', href: '/products/mirrors', icon: '/assets/icons/mirror.svg' },
    { name: 'Toilets', href: '/products/toilets', icon: '/assets/icons/toilet.svg' },
  ];

  const exploreCategories = [
    {
      name: 'About Us',
      title: 'Our Story',
      description: 'Learn about our journey, values, and commitment to excellence.',
      image: 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=800',
      href: '/about-us',
    },
    {
      name: 'Contact Us',
      title: 'Get in Touch',
      description: 'Connect with our team to discuss your project needs and vision.',
      image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800',
      href: '/contact',
    },
    {
      name: 'Our Expertise',
      title: 'Craftsmanship Excellence',
      description: 'Decades of experience in custom millwork and premium home renovations.',
      image: 'https://images.pexels.com/photos/5691608/pexels-photo-5691608.jpeg?auto=compress&cs=tinysrgb&w=800',
      href: '/our-expertise',
    },
    {
      name: 'Our Work',
      title: 'Portfolio Showcase',
      description: 'Browse through our collection of completed projects and transformations.',
      image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
      href: '/our-works',
    },
  ];

  const socialLinks = [
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'LinkedIn', href: '#', icon: Linkedin },
    { name: 'Facebook', href: '#', icon: Facebook },
  ];

  const mobileMenuItems = [
    {
      label: 'Products',
      ariaLabel: 'Products',
      link: '#',
      subItems: [
        { label: 'Vanities', ariaLabel: 'Navigate to Vanities', link: '/products/vanities' },
        { label: 'Faucets', ariaLabel: 'Navigate to Faucets', link: '/products/faucets' },
        { label: 'Quartz Countertops', ariaLabel: 'Navigate to Quartz Countertops', link: '/quartz-countertops' },
        { label: 'Sinks', ariaLabel: 'Navigate to Sinks', link: '/products/sinks' },
        { label: 'Hardware', ariaLabel: 'Navigate to Hardware', link: '/hardware' },
        { label: 'Flooring', ariaLabel: 'Navigate to Flooring', link: '/products/flooring' },
        { label: 'Lighting', ariaLabel: 'Navigate to Lighting', link: '/products/lighting' },
        { label: 'Mirrors', ariaLabel: 'Navigate to Mirrors', link: '/products/mirrors' },
        { label: 'Toilets', ariaLabel: 'Navigate to Toilets', link: '/products/toilets' },
      ],
    },
    { label: 'Cabinetry', ariaLabel: 'Navigate to Cabinetry', link: '/custom-cabinetry' },
    { label: 'Millwork', ariaLabel: 'Navigate to Millwork', link: '/commercial-millwork' },
    { label: 'Outdoor Kitchens', ariaLabel: 'Navigate to Outdoor Kitchens', link: 'https://q-boo.com/?srsltid=AfmBOors7lrkKMzbn6NDPblHiqPgb66l-TK522KQZnq6bsWEZ0kwFfZ4' },
    { label: 'In Stock', ariaLabel: 'Navigate to In Stock page', link: '/in-stock' },
    {
      label: 'Explore',
      ariaLabel: 'Explore',
      link: '#',
      subItems: [
        { label: 'About Us', ariaLabel: 'Navigate to About Us', link: '/about-us' },
        { label: 'Contact Us', ariaLabel: 'Navigate to Contact Us', link: '/contact' },
        { label: 'Our Expertise', ariaLabel: 'Navigate to Our Expertise', link: '/our-expertise' },
        { label: 'Our Work', ariaLabel: 'Navigate to Our Work', link: '/our-works' },
      ],
    },
  ];

  const mobileButtonItems = [
    { label: 'Get Quote', ariaLabel: 'Get a Quote', link: '/quote' },
    { label: 'Contact Us', ariaLabel: 'Contact Us', link: '/contact' },
  ];

  const mobileSocialItems = [
    { label: 'Instagram', link: '#' },
    { label: 'LinkedIn', link: '#' },
    { label: 'Facebook', link: '#' },
  ];

  const featuredProducts = [
    {
      title: 'Contemporary Vanity Collection',
      description: 'Explore our curated selection of modern bathroom vanities.',
      image: '/Images/products/vanities-images/james-martin-vanity/brittany-30-single-vanity-in-victory-blue-single-bathroom-vanity-james-martin-vanities-select-your-top-959063.webp',
      href: '/products/vanities',
    },
    {
      title: 'Designer Faucets & Fixtures',
      description: 'Premium finishes and innovative designs that elevate your space.',
      image: '/assets/gallery/kitchen-faucets-card-image.avif',
      href: '/products/faucets',
    },
    {
      title: 'Premium Sinks',
      description: 'Elegant vessel and undermount sinks for your perfect bathroom.',
      image: '/assets/gallery/bathroom-sink-card-image.avif',
      href: '/products/sinks',
    },
    {
      title: 'Bespoke Mirror Designs',
      description: 'Custom framing and finishes tailored to your interior.',
      image: '/assets/gallery/mirror-header-image.webp',
      href: '/products/mirrors',
    },
    {
      title: 'Handcrafted Hardware',
      description: 'The finishing touch that defines your aesthetic vision.',
      image: '/assets/gallery/Screenshot 2025-12-27 100544.png',
      href: '/hardware',
    },
    {
      title: 'Luxury Flooring Options',
      description: 'From natural stone to engineered wood, discover timeless elegance.',
      image: '/Images/products/flooring-images/Screenshot 2025-09-02 103303.png',
      href: '/products/flooring',
    },
  ];

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      scaleY: 0.95,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      scaleY: 1,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1] as any,
        staggerChildren: 0.05,
      },
    },
  };

  const productCardVariants = {
    hidden: { 
      opacity: 0, 
      x: -30,
    },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        delay: custom * 0.08,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  };

  const categoryItemVariants = {
    hidden: { 
      opacity: 0, 
      x: -20,
    },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: custom * 0.05,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when dropdown is open
  useEffect(() => {
    if (isProductsOpen || isExploreOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isProductsOpen, isExploreOpen]);

  return (
    <>
      {/* Mobile Menu using StaggeredMenu */}
      <div className="lg:hidden">
        <StaggeredMenu
          position="right"
          colors={[]}
          items={mobileMenuItems}
          buttonItems={mobileButtonItems}
          socialItems={mobileSocialItems}
          displaySocials={true}
          displayItemNumbering={false}
          logoUrl="/assets/site/main-logo.svg"
          menuButtonColor={isScrolled || currentPage !== 'home' ? '#2C3539' : '#2C3539'}
          openMenuButtonColor="#2C3539"
          accentColor="#2C3539"
          isFixed={false}
          changeMenuColorOnOpen={true}
          closeOnClickAway={true}
        />
      </div>

      {/* Desktop Navigation */}
      <nav
        className="hidden lg:block fixed top-0 left-0 right-0 z-50 px-6 lg:px-8 pt-3"
      >
        <div
          className={`max-w-7xl mx-auto rounded-2xl border backdrop-blur-xl backdrop-saturate-150 transition-all duration-500 ${
            isScrolled || currentPage !== 'home'
              ? 'bg-white/75 dark:bg-[#0a0a0a]/70 border-white/60 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)]'
              : 'bg-white/55 dark:bg-[#0a0a0a]/50 border-white/40 dark:border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.08)]'
          }`}
        >
          <div className="flex items-center justify-between h-14 lg:h-16 px-5">
            {/* Logo - Left */}
            <div className="flex-shrink-0">
              <Link
                to="/"
                className="flex items-center hover:opacity-80 transition-opacity duration-200"
              >
                {/* Light theme logo */}
                <img
                  src="/assets/site/main-logo.svg"
                  alt="Coppola Home Logo"
                  className="h-9 lg:h-10 w-auto object-contain transition-all duration-300 dark:hidden"
                />
                {/* Dark theme logo */}
                <img
                  src="/assets/site/main-logo-dark-theme.svg"
                  alt="Coppola Home Logo"
                  className="h-9 lg:h-10 w-auto object-contain transition-all duration-300 hidden dark:block"
                />
              </Link>
            </div>

          {/* Desktop: Navigation Links - Center */}
          <div className="hidden lg:flex items-center flex-1 justify-center space-x-4 xl:space-x-6">
            {navLinks.map((link) => {
              const isOpen = link.dropdownType === 'products' ? isProductsOpen : link.dropdownType === 'explore' ? isExploreOpen : false;
              const setOpen = link.dropdownType === 'products' ? setIsProductsOpen : link.dropdownType === 'explore' ? setIsExploreOpen : null;

              return (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => {
                    if (link.hasDropdown && link.dropdownType === 'products') {
                      setIsProductsOpen(true);
                      setIsExploreOpen(false);
                    } else if (link.hasDropdown && link.dropdownType === 'explore') {
                      setIsExploreOpen(true);
                      setIsProductsOpen(false);
                    }
                  }}
                  onMouseLeave={() => link.hasDropdown && setOpen && setOpen(false)}
                >
                  {link.hasDropdown ? (
                    <button
                      className="text-[#2C3539] dark:text-[#F9FAFB] text-sm font-light hover:text-[#5D6D74] dark:hover:text-[#D1D5DB] transition-colors duration-200 flex items-center gap-1 relative group font-serif py-2"
                    >
                      <span className="relative">{link.name}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  ) : link.isExternal ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#2C3539] dark:text-[#F9FAFB] text-sm font-light hover:text-[#5D6D74] dark:hover:text-[#D1D5DB] transition-colors duration-200 flex items-center gap-1 relative group font-serif py-2"
                    >
                      <span className="relative">
                        {link.name}
                        <span className="absolute left-0 right-0 bottom-[-4px] h-[1px] bg-current w-0 group-hover:w-full transition-all duration-300" />
                      </span>
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-[#2C3539] dark:text-[#F9FAFB] text-sm font-light hover:text-[#5D6D74] dark:hover:text-[#D1D5DB] transition-colors duration-200 flex items-center gap-1 relative group font-serif py-2"
                    >
                      <span className="relative">
                        {link.name}
                        <span className={`absolute left-0 right-0 bottom-[-4px] h-[1px] bg-current transition-all duration-300 ${
                          'page' in link && currentPage === link.page ? 'w-full' : 'w-0 group-hover:w-full'
                        }`} />
                      </span>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          {/* Desktop: CTA Buttons - Right */}
          <div className="hidden lg:flex items-center space-x-2 flex-shrink-0">
            <Link to="/quote">
              <Button variant="outline" size="sm" className="text-xs px-4">
                Get a Quote
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="primary" size="sm" className="text-xs px-4">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
        </div>
      </nav>

      <AnimatePresence>
        {isProductsOpen && (
          <>
            {/* Connection Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="hidden lg:block fixed left-0 right-0 top-[84px] h-[1px] bg-gradient-to-r from-transparent via-[#E5E3DF] dark:via-[#1a1a1a] to-transparent z-40"
            />
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={dropdownVariants}
              className="hidden lg:block fixed left-0 right-0 top-[84px] bg-white dark:bg-[#0a0a0a] border-b border-[#E5E3DF] dark:border-[#1a1a1a] shadow-2xl transition-colors duration-300 z-30"
              style={{
                transformOrigin: 'top center'
              }}
              onMouseEnter={() => {
                setIsProductsOpen(true);
                setIsExploreOpen(false);
              }}
              onMouseLeave={() => setIsProductsOpen(false)}
            >
            <div className="max-w-7xl mx-auto px-6 py-8 relative">
              <div className="flex gap-12">
                <div className="w-1/3 flex flex-col">
                  <h3
                    className="text-2xl text-[#2C3539] dark:text-[#F9FAFB] mb-5 font-['Poppins',sans-serif] font-semibold"
                  >
                    Product Categories
                  </h3>
                  <ul className="space-y-3.5 flex-grow">
                    {productCategories.map((category, index) => (
                      <motion.li 
                        key={category.name}
                        custom={index}
                        initial="hidden"
                        animate="visible"
                        variants={categoryItemVariants}
                      >
                        <Link
                          to={category.href}
                          className="text-[#2C3539] dark:text-[#F9FAFB] text-sm hover:text-[#5D6D74] dark:hover:text-[#D1D5DB] transition-colors duration-200 flex items-center gap-3 group font-['Poppins',sans-serif] py-0.5"
                          onClick={() => setIsProductsOpen(false)}
                        >
                          <div className="w-5 h-5 flex items-center justify-center shrink-0">
                            <img 
                              src={category.icon} 
                              alt={category.name}
                              className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-200"
                            />
                          </div>
                          <span className="relative">
                            {category.name}
                            <span className="absolute left-0 right-0 -bottom-0.5 h-[1px] bg-current w-0 group-hover:w-full transition-all duration-300" />
                          </span>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-6 border-t border-[#E5E3DF] dark:border-[#2a2a2a]">
                    <h4
                      className="text-xs font-semibold text-[#2C3539] dark:text-[#F9FAFB] mb-4 uppercase tracking-wider font-['Poppins',sans-serif]"
                    >
                      Follow Us
                    </h4>
                    <div className="flex gap-3">
                      {socialLinks.map((social) => {
                        const Icon = social.icon;
                        return (
                          <a
                            key={social.name}
                            href={social.href}
                            className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 hover:border-[#2C3539] dark:hover:border-[#F9FAFB] hover:bg-[#2C3539] dark:hover:bg-[#F9FAFB] hover:text-white dark:hover:text-[#2C3539] transition-all duration-200 text-[#2C3539] dark:text-[#F9FAFB]"
                            aria-label={social.name}
                            title={social.name}
                          >
                            <Icon className="w-4 h-4" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="w-2/3">
                  <div className="grid grid-cols-3 gap-5">
                    {featuredProducts.map((product, index) => (
                      <motion.div
                        key={index}
                        custom={index}
                        initial="hidden"
                        animate="visible"
                        variants={productCardVariants}
                        className="group"
                      >
                        <Link
                          to={product.href}
                          onClick={() => setIsProductsOpen(false)}
                          className="block h-full"
                        >
                          <div className="h-full bg-white dark:bg-[#0F0F0F] rounded-2xl border border-gray-200 dark:border-gray-800 p-3 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)] hover:-translate-y-1">
                            <div className="mb-3 overflow-hidden rounded-lg">
                              <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                            <h4
                              className="text-sm font-medium text-[#2C3539] dark:text-[#F9FAFB] mb-1.5 font-['Poppins',sans-serif] group-hover:text-[#5D6D74] dark:group-hover:text-[#D1D5DB] transition-colors duration-200"
                            >
                              {product.title}
                            </h4>
                            <p
                              className="text-xs text-[#5D6D74] dark:text-[#D1D5DB] mb-2.5 leading-relaxed font-['Poppins',sans-serif] line-clamp-2"
                            >
                              {product.description}
                            </p>
                            <span className="text-xs font-medium text-[#2C3539] dark:text-[#F9FAFB] inline-flex items-center gap-1 font-['Poppins',sans-serif]">
                              <span className="relative">
                                Explore
                                <span className="absolute left-0 right-0 -bottom-0.5 h-[1px] bg-current w-0 group-hover:w-full transition-all duration-300" />
                              </span>
                              <svg 
                                className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                              </svg>
                            </span>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isExploreOpen && (
          <>
            {/* Connection Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="hidden lg:block fixed left-0 right-0 top-[84px] h-[1px] bg-gradient-to-r from-transparent via-[#E5E3DF] dark:via-[#1a1a1a] to-transparent z-40"
            />
            <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={dropdownVariants}
            className="hidden lg:block fixed left-0 right-0 top-[84px] bg-white dark:bg-[#0a0a0a] border-b border-[#E5E3DF] dark:border-[#1a1a1a] shadow-2xl transition-colors duration-300 z-30"
            style={{
              transformOrigin: 'top center'
            }}
            onMouseEnter={() => {
              setIsExploreOpen(true);
              setIsProductsOpen(false);
            }}
            onMouseLeave={() => setIsExploreOpen(false)}
          >

            <div className="max-w-7xl mx-auto px-6 py-6 relative">
              <div className="flex gap-12">
                <div className="w-1/4 flex flex-col">
                  <h3
                    className="text-xl text-[#2C3539] dark:text-[#F9FAFB] mb-5 font-['Poppins',sans-serif] font-medium"
                  >
                    Explore
                  </h3>
                  <ul className="space-y-4 flex-grow">
                    {exploreCategories.map((category, index) => (
                      <motion.li 
                        key={category.name}
                        custom={index}
                        initial="hidden"
                        animate="visible"
                        variants={categoryItemVariants}
                      >
                        <Link
                          to={category.href}
                          className="text-[#2C3539] dark:text-[#F9FAFB] text-sm hover:text-[#5D6D74] dark:hover:text-[#D1D5DB] transition-colors duration-200 group font-['Poppins',sans-serif] py-0.5 inline-block"
                          onMouseEnter={() => setActiveExplorePreview(index)}
                          onFocus={() => setActiveExplorePreview(index)}
                          onClick={() => setIsExploreOpen(false)}
                        >
                          <span className="relative">
                            {category.name}
                            <span className="absolute left-0 right-0 -bottom-0.5 h-[1px] bg-current w-0 group-hover:w-full transition-all duration-300" />
                          </span>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-6 border-t border-[#E5E3DF] dark:border-[#2a2a2a]">
                    <h4
                      className="text-xs font-semibold text-[#2C3539] dark:text-[#F9FAFB] mb-4 uppercase tracking-wider font-['Poppins',sans-serif]"
                    >
                      Follow Us
                    </h4>
                    <div className="flex gap-3">
                      {socialLinks.map((social) => {
                        const Icon = social.icon;
                        return (
                          <a
                            key={social.name}
                            href={social.href}
                            className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 hover:border-[#2C3539] dark:hover:border-[#F9FAFB] hover:bg-[#2C3539] dark:hover:bg-[#F9FAFB] hover:text-white dark:hover:text-[#2C3539] transition-all duration-200 text-[#2C3539] dark:text-[#F9FAFB]"
                            aria-label={social.name}
                            title={social.name}
                          >
                            <Icon className="w-4 h-4" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="w-3/4">
                  <div className="relative h-full min-h-[400px]">
                    {exploreCategories.map((category, index) => (
                      <motion.div
                        key={category.name}
                        custom={index}
                        initial="hidden"
                        animate={activeExplorePreview === index ? "visible" : "hidden"}
                        variants={productCardVariants}
                        className={`absolute inset-0 ${
                          activeExplorePreview === index ? 'pointer-events-auto' : 'pointer-events-none'
                        }`}
                      >
                        <div className="grid grid-cols-2 gap-8 h-full">
                          <div className="overflow-hidden rounded-lg">
                            <img
                              src={category.image}
                              alt={category.title}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>

                          <div className="flex flex-col justify-center">
                            <h4
                              className="text-3xl text-[#2C3539] dark:text-[#F9FAFB] mb-4 leading-tight font-['Poppins',sans-serif] font-medium"
                            >
                              {category.title}
                            </h4>
                            <p
                              className="text-[#5D6D74] dark:text-[#D1D5DB] text-base mb-6 leading-relaxed font-['Poppins',sans-serif]"
                            >
                              {category.description}
                            </p>
                            <a
                              href="#"
                              className="text-[#2C3539] dark:text-[#F9FAFB] text-sm font-medium hover:text-[#5D6D74] dark:hover:text-[#D1D5DB] transition-colors duration-200 inline-flex items-center group/link self-start font-['Poppins',sans-serif]"
                            >
                              <span className="link-underline-animation">Learn more</span>
                              <span className="ml-1 group-hover/link:ml-2 transition-all duration-200">→</span>
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
