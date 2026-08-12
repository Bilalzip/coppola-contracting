import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowLeft, X, Maximize2, Loader, ChevronDown, Facebook, Instagram } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import SplitText from '../ui/SplitText';

interface RelatedProduct {
  id: string;
  name: string;
  slug: string;
  images: string[];
  collection?: string;
  category: string;
}

interface ProductDetailLayoutProps {
  name: string;
  brand: string;
  category: string;
  images: string[];
  description: string;
  shortDescription: string;
  specs: Record<string, string>;
  currentProductId?: string;
  collection?: string;
  relatedProducts?: RelatedProduct[];
  seoTags?: string[]; // Optional SEO tags for each product category
}

export default function ProductDetailLayout({
  name,
  brand,
  category,
  images,
  description,
  shortDescription,
  specs,
  currentProductId,
  relatedProducts = [],
  seoTags = [],
}: ProductDetailLayoutProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    // Go back one step in history
    navigate(-1);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setImageLoading(true);
    setImageError(false);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setImageLoading(true);
    setImageError(false);
  };

  const handleGetQuote = () => {
    navigate('/quote', { state: { productName: `${brand} ${name}` } });
  };

  const openFullscreen = () => {
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  // Keyboard navigation for fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullscreen) return;

      switch (e.key) {
        case 'Escape':
          closeFullscreen();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          handlePrevImage();
          break;
        case 'ArrowRight':
          e.preventDefault();
          handleNextImage();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, currentImageIndex, images.length]);

  // Prevent body scroll when fullscreen is open AND hide navbar
  useEffect(() => {
    if (isFullscreen) {
      // Prevent scrolling
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
      document.body.style.top = '0';
      document.body.style.left = '0';
      
      // Hide navbar
      const navbar = document.querySelector('nav');
      if (navbar) {
        (navbar as HTMLElement).style.display = 'none';
      }
    } else {
      // Restore scrolling
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
      document.body.style.top = '';
      document.body.style.left = '';
      
      // Show navbar
      const navbar = document.querySelector('nav');
      if (navbar) {
        (navbar as HTMLElement).style.display = '';
      }
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
      document.body.style.top = '';
      document.body.style.left = '';
      
      const navbar = document.querySelector('nav');
      if (navbar) {
        (navbar as HTMLElement).style.display = '';
      }
    };
  }, [isFullscreen]);

  // Preload adjacent images for smoother navigation
  useEffect(() => {
    if (images.length > 1) {
      const nextIndex = (currentImageIndex + 1) % images.length;
      const prevIndex = (currentImageIndex - 1 + images.length) % images.length;
      
      const preloadImage = (src: string) => {
        const img = new Image();
        img.src = src;
      };
      
      preloadImage(images[nextIndex]);
      preloadImage(images[prevIndex]);
    }
  }, [currentImageIndex, images]);

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-neutral-950 pt-20 lg:pt-24">
        {/* Back Button - Minimal & Absolute */}
        <motion.button
          onClick={handleBack}
          className="fixed top-24 lg:top-28 left-4 lg:left-8 z-50 text-gray-700 dark:text-gray-300 hover:text-[#001f54] dark:hover:text-[#0466c8] transition-colors duration-200"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ x: -4 }}
          aria-label="Go back"
        >
          <ArrowLeft className="w-6 h-6" />
        </motion.button>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

          {/* Header Section */}
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <motion.h1
              className="text-3xl sm:text-4xl lg:text-5xl font-normal text-gray-900 dark:text-white mb-3 font-serif"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {name}
            </motion.h1>
            <motion.p
              className="text-lg text-gray-600 dark:text-gray-300 mb-2 font-secondary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              {brand}
            </motion.p>
            <motion.p
              className="text-base text-gray-500 dark:text-gray-400 max-w-3xl font-secondary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              {shortDescription}
            </motion.p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Left Column - Images */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Main Image */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                {imageLoading && !imageError && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader className="w-8 h-8 animate-spin text-gray-400" />
                  </div>
                )}

                {imageError ? (
                  <div className="absolute inset-0 flex items-center justify-center flex-col gap-2">
                    <div className="text-gray-400 text-sm font-secondary">Image not available</div>
                  </div>
                ) : (
                  <img
                    src={images[currentImageIndex]}
                    alt={`${name} - View ${currentImageIndex + 1}`}
                    className={`w-full h-full object-contain p-8 cursor-zoom-in transition-opacity duration-300 ${
                      imageLoading ? 'opacity-0' : 'opacity-100'
                    }`}
                    onClick={openFullscreen}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                  />
                )}

                {/* Fullscreen button */}
                {!imageError && (
                  <button
                    onClick={openFullscreen}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-900 dark:text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white dark:hover:bg-gray-700"
                    aria-label="View fullscreen"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                )}

                {/* Navigation Arrows */}
                {images.length > 1 && !imageError && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-900 dark:text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white dark:hover:bg-gray-700"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-900 dark:text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white dark:hover:bg-gray-700"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Image counter */}
                {images.length > 1 && !imageError && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1.5 rounded-full text-xs font-secondary">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {images.length > 1 && !imageError && (
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 justify-center">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentImageIndex(index);
                        setImageLoading(true);
                        setImageError(false);
                      }}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        currentImageIndex === index
                          ? 'border-[#001f54] dark:border-[#0466c8] ring-1 ring-[#001f54] dark:ring-[#0466c8] ring-offset-1'
                          : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${name} thumbnail ${index + 1}`}
                        className="w-full h-full object-contain p-2"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Right Column - Details */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 font-serif">
                  Description
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line font-secondary text-sm">
                  {description}
                </p>
              </motion.div>

              {/* Specifications - Collapsible */}
              {specs && Object.keys(specs).length > 0 && (
                <motion.div
                  className="overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <button
                    onClick={() => setIsSpecsOpen(!isSpecsOpen)}
                    className="w-full flex items-center py-4 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors rounded-xl gap-2"
                  >
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white font-serif">
                      Specifications
                    </h2>
                    <motion.div
                      animate={{ rotate: isSpecsOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {isSpecsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-2 pt-2">
                          {Object.entries(specs).map(([key, value], index) => (
                            <div
                              key={key}
                              className={`flex justify-between py-2.5 gap-4 ${
                                index !== Object.entries(specs).length - 1 
                                  ? 'border-b border-gray-100 dark:border-gray-800' 
                                  : ''
                              }`}
                            >
                              <span className="text-xs text-gray-500 dark:text-gray-400 font-secondary">
                                {key}
                              </span>
                              <span className="text-xs text-gray-900 dark:text-white font-medium text-right font-secondary">
                                {value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* Share Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 font-secondary">
                  Share
                </h3>
                <div className="flex gap-3">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 hover:border-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-colors text-gray-600 dark:text-gray-400"
                    aria-label="Share on Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a
                    href={`https://www.instagram.com/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 hover:border-[#E4405F] hover:bg-[#E4405F] hover:text-white transition-colors text-gray-600 dark:text-gray-400"
                    aria-label="Share on Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.href)}&description=${encodeURIComponent(name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 hover:border-[#E60023] hover:bg-[#E60023] hover:text-white transition-colors text-gray-600 dark:text-gray-400"
                    aria-label="Share on Pinterest"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 hover:border-black hover:bg-black hover:text-white transition-colors text-gray-600 dark:text-gray-400"
                    aria-label="Share on X"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                </div>
              </motion.div>

              {/* Action Buttons - Side by Side */}
              <motion.div
                className="pt-6 flex gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <Button
                  onClick={handleGetQuote}
                  variant="primary"
                  size="sm"
                  className="flex-1 max-w-[180px]"
                >
                  Get a Quote
                </Button>
                <Button
                  onClick={() => navigate('/contact')}
                  variant="outline"
                  size="sm"
                  className="flex-1 max-w-[180px]"
                >
                  Contact Us
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* You May Also Like Section */}
          {relatedProducts.length > 0 && (
            <motion.div
              className="mt-20 pt-12 border-t border-gray-200 dark:border-gray-800"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-12 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                {/* Left: Heading and Description */}
                <div className="max-w-2xl">
                  <h2 className="text-4xl md:text-5xl font-normal text-gray-900 dark:text-white mb-4 font-serif">
                    <SplitText text="You may also like" splitType="chars" delay={35} />
                  </h2>
                  <motion.p
                    className="text-base text-gray-600 dark:text-gray-400 font-secondary leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    Discover additional mirror designs that echo the same attention to detail, refined materials, and modern sophistication.
                  </motion.p>
                </div>

                {/* Right: SEO Tags */}
                {seoTags.length > 0 && (
                  <motion.div
                    className="flex flex-wrap items-center gap-3 lg:justify-end"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    {seoTags.map((tag, index) => (
                      <>
                        <span key={tag} className="text-xs text-gray-500 dark:text-gray-400 font-secondary">
                          {tag}
                        </span>
                        {index < seoTags.length - 1 && (
                          <span key={`dot-${index}`} className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                        )}
                      </>
                    ))}
                  </motion.div>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((product, index) => (
                  <Link
                    key={product.id}
                    to={`/products/${category}s/${product.slug}`}
                    className="group"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1,
                        ease: "easeOut"
                      }}
                      whileHover={{ y: -8 }}
                      className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-500 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
                    >
                      {/* Product Image */}
                      <div className="relative aspect-square overflow-hidden">
                        <motion.img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-contain p-6"
                          loading="lazy"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>

                      {/* Product Info */}
                      <div className="p-4">
                        {product.collection && (
                          <motion.p
                            className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1 font-secondary"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                          >
                            {product.collection}
                          </motion.p>
                        )}
                        <motion.h3
                          className="text-base font-normal text-gray-900 dark:text-white font-serif group-hover:text-[#001f54] dark:group-hover:text-[#0466c8] transition-colors mb-2"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                        >
                          {product.name}
                        </motion.h3>
                        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 font-secondary group-hover:text-[#001f54] dark:group-hover:text-[#0466c8] transition-colors">
                          <span className="relative inline-block">
                            <span className="group-hover:underline underline-offset-4 decoration-[#001f54] dark:decoration-[#0466c8]">
                              View Details
                            </span>
                          </span>
                          <motion.svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            initial={{ x: 0, y: 0 }}
                            whileHover={{ x: 2, y: -2 }}
                            transition={{ duration: 0.2 }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 17L17 7M17 7H7M17 7v10"
                            />
                          </motion.svg>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Fullscreen Image Viewer */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            className="fixed bg-black/95 flex items-center justify-center"
            style={{ 
              zIndex: 999999, 
              margin: 0, 
              padding: 0,
              overflow: 'hidden',
              width: '100vw',
              height: '100vh',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              position: 'fixed'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeFullscreen}
          >
            {/* Close Button - Minimalistic X */}
            <button
              className="fixed flex items-center justify-center text-white hover:text-gray-300 transition-all duration-200"
              style={{ zIndex: 1000000, top: '24px', right: '24px' }}
              onClick={(e) => {
                e.stopPropagation();
                closeFullscreen();
              }}
              aria-label="Close fullscreen view"
            >
              <X className="w-8 h-8" strokeWidth={2} />
            </button>

            {/* Navigation Arrows - Minimalistic */}
            {images.length > 1 && (
              <>
                <button
                  className="fixed flex items-center justify-center text-white hover:text-gray-300 transition-all"
                  style={{ zIndex: 1000000, left: '24px', top: '50%', transform: 'translateY(-50%)' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevImage();
                  }}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-10 h-10" strokeWidth={2} />
                </button>

                <button
                  className="fixed flex items-center justify-center text-white hover:text-gray-300 transition-all"
                  style={{ zIndex: 1000000, right: '24px', top: '50%', transform: 'translateY(-50%)' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextImage();
                  }}
                  aria-label="Next image"
                >
                  <ChevronRight className="w-10 h-10" strokeWidth={2} />
                </button>
              </>
            )}

            {/* Main Image Container - Perfectly Centered */}
            <div
              className="flex items-center justify-center"
              style={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                padding: '80px 100px',
                overflow: 'hidden',
                zIndex: 999999
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[currentImageIndex]}
                alt={`${name} - Fullscreen view ${currentImageIndex + 1}`}
                className="object-contain"
                style={{ 
                  maxWidth: 'calc(100vw - 200px)',
                  maxHeight: 'calc(100vh - 160px)',
                  width: 'auto',
                  height: 'auto',
                  display: 'block'
                }}
                draggable={false}
              />
            </div>

            {/* Image Counter */}
            {images.length > 1 && (
              <div 
                className="fixed text-white text-sm bg-black/50 backdrop-blur-md px-5 py-2.5 rounded-full font-secondary border border-white/20"
                style={{ zIndex: 1000000, bottom: '32px', left: '50%', transform: 'translateX(-50%)' }}
              >
                {currentImageIndex + 1} / {images.length}
              </div>
            )}

            {/* Click Hint */}
            <div 
              className="fixed text-white/70 text-xs font-secondary bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20"
              style={{ zIndex: 1000000, top: '32px', left: '50%', transform: 'translateX(-50%)' }}
            >
              Press ESC or click outside to close
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
