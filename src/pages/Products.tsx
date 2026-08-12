import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SplitText from '../components/ui/SplitText';
import Button from '../components/ui/Button';

const Products: React.FC = () => {
  useEffect(() => {
    document.title = 'Our Products | Coppola Home';
  }, []);

  const productCategories = [
    {
      name: 'Vanities',
      description: 'Elegant bathroom vanities and storage solutions',
      image: '/Images/products/vanities-images/james-martin-vanity/brittany-30-single-vanity-in-victory-blue-single-bathroom-vanity-james-martin-vanities-select-your-top-959063.webp',
      href: '/products/vanities',
      icon: '/assets/icons/nightstand.svg',
      count: '50+'
    },
    {
      name: 'Faucets',
      description: 'Kitchen, bath, and shower collections',
      image: '/assets/gallery/bathroom-faucets-card-image.avif',
      href: '/products/faucets/bathroom',
      icon: '/assets/icons/faucet.svg',
      count: '30+'
    },
    {
      name: 'Luxury Toilets',
      description: 'Comfort-height, rimless, smart washlets',
      image: '/assets/gallery/toilet-header-image.png',
      href: '/products/toilets',
      icon: '/assets/icons/toilet.svg',
      count: '15+'
    },
    {
      name: 'Mirrors',
      description: 'Bathroom mirrors and LED lighting solutions',
      image: '/assets/gallery/mirror-header-image.webp',
      href: '/products/mirrors',
      icon: '/assets/icons/mirror.svg',
      count: '25+'
    },
    {
      name: 'Sinks',
      description: 'Kitchen and bathroom sink collections',
      image: '/assets/gallery/kitchen-sink-card-image.avif',
      href: '/products/sinks',
      icon: '/assets/icons/sink.svg',
      count: '20+'
    },
    {
      name: 'Lighting',
      description: 'Modern lighting fixtures and solutions',
      image: '/assets/gallery/light-comingsoon.png',
      href: '/products/lighting',
      icon: '/assets/icons/lamp.svg',
      count: '40+'
    },
    {
      name: 'Flooring',
      description: 'Premium flooring and tile collections',
      image: '/Images/products/flooring-images/Screenshot 2025-09-02 103303.png',
      href: '/products/flooring',
      icon: '/assets/icons/tiles.svg',
      count: '35+'
    },
    {
      name: 'Quartz Countertops',
      description: 'Durable and elegant quartz surfaces for kitchens and baths',
      image: '/Images/products/quartz-countertops/RW_Calacatta-Supreme_MARS_RED_MOCKUP.webp',
      href: '/quartz-countertops',
      icon: '/assets/icons/tiles.svg',
      count: '20+'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
      {/* Header */}
      <section className="relative h-[50vh] w-full overflow-hidden">
        {/* Background Image with Zoom Out Animation */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          <img
            src="/assets/gallery/landing-header-carousel-image-10.jpg"
            alt="Premium kitchen and bathroom products"
            className="w-full h-full object-cover"
          />
          {/* Even vertical scrim, since the heading is centred over the image */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <div className="max-w-3xl">
            <SplitText
              text="Our Products"
              tag="h1"
              className="text-page-title font-normal text-white mb-4 font-serif"
              splitType="chars"
              delay={30}
              duration={0.8}
              textAlign="center"
            />
            <p className="text-base text-white/90 font-secondary">
              Discover our complete collection of premium kitchen and bathroom products
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SplitText
              text="Browse by Category"
              tag="h2"
              className="text-4xl md:text-5xl font-normal text-gray-900 dark:text-white mb-4 font-serif"
              splitType="chars"
              delay={30}
              duration={0.7}
              textAlign="center"
            />
            <p className="text-base text-gray-600 dark:text-gray-400 font-secondary max-w-2xl mx-auto">
              Explore our extensive range of high-quality products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productCategories.map((category) => (
              <Link
                key={category.name}
                to={category.href}
                className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden transition-all duration-500 transform hover:-translate-y-1 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)] hover:border-gray-400 dark:hover:border-gray-600"
              >
                {/* Product Image */}
                <div className="aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    {/* Line-art icons are near-black, so flip them on dark */}
                    <img src={category.icon} alt="" aria-hidden="true" className="w-6 h-6 dark:invert" />
                    <h3 className="text-xl font-normal text-gray-900 dark:text-white group-hover:text-[#001f54] dark:group-hover:text-[#0466c8] transition-colors duration-300 font-serif">
                      {category.name}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 leading-relaxed font-secondary">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between font-secondary">
                    <span className="text-sm font-medium text-[#0a1128] dark:text-gray-400">
                      {category.count} products
                    </span>
                    <span className="text-[#0a1128] dark:text-[#0466c8] font-medium text-sm">
                      View All →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SplitText
            text="Need Help Choosing?"
            tag="h2"
            className="text-4xl md:text-5xl font-normal text-gray-900 dark:text-white mb-4 font-serif"
            splitType="chars"
            delay={30}
            duration={0.7}
            textAlign="center"
          />
          <p className="text-base text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto font-secondary">
            Our experts are here to help you find the perfect products for your project
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/contact">
              <Button variant="primary" size="md">
                Contact Us
              </Button>
            </Link>
            <Link to="/in-stock">
              <Button variant="outline" size="md">
                View In-Stock Items
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
