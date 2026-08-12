import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { sinkProducts } from '../../../data/sinkProducts';
import NewsletterBanner from '../../../components/layout/NewsletterBanner';

const UndermountSinks = () => {
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('all');

  useEffect(() => {
    document.title = 'Undermount Sinks | Coppola Home';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Seamless undermount sink solutions. Clean lines and modern installation techniques for professional results.'
      );
    }
  }, []);

  // Filter products for undermount sinks
  const undermountProducts = sinkProducts.filter((product) => product.mountingType === 'undermount');

  // Extract unique brands and materials
  const brands = ['all', ...Array.from(new Set(undermountProducts.map((p) => p.brand).filter(Boolean)))];
  const materials = ['all', ...Array.from(new Set(undermountProducts.map((p) => p.material).filter(Boolean)))];

  // Apply additional filters
  const filteredProducts = undermountProducts.filter((product) => {
    const brandMatch = selectedBrand === 'all' || product.brand === selectedBrand;
    const materialMatch = selectedMaterial === 'all' || product.material === selectedMaterial;
    return brandMatch && materialMatch;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 motion-safe:animate-fadeIn">
      {/* Header Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link
            to="/products/sinks"
            className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Sinks
          </Link>

          {/* Page Header */}
          <div className="space-y-4 max-w-3xl">
            <p className="text-xs sm:text-sm font-medium text-neutral-500 uppercase tracking-[0.2em]">
              Undermount
            </p>
            <h1 className="text-page-title font-serif text-neutral-900 leading-tight">
              Undermount Sinks
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
              Seamless integration with modern countertops. Clean lines and professional installation techniques.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          {(brands.length > 2 || materials.length > 2) && (
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              {brands.length > 2 && (
                <div>
                  <label className="block text-xs font-medium text-neutral-600 uppercase tracking-wider mb-2">
                    Brand
                  </label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-white text-sm min-w-[180px]"
                  >
                    {brands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand === 'all' ? 'All Brands' : brand}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {materials.length > 2 && (
                <div>
                  <label className="block text-xs font-medium text-neutral-600 uppercase tracking-wider mb-2">
                    Material
                  </label>
                  <select
                    value={selectedMaterial}
                    onChange={(e) => setSelectedMaterial(e.target.value)}
                    className="px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-white text-sm min-w-[180px]"
                  >
                    {materials.map((material) => (
                      <option key={material} value={material}>
                        {material === 'all' ? 'All Materials' : material}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}

          {/* Results Count */}
          <div className="text-center mb-8">
            <p className="text-sm text-neutral-600">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'sink' : 'sinks'} available
            </p>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {filteredProducts.map((product, index) => (
                <Link
                  key={product.id}
                  to={`/products/sinks/${product.slug}`}
                  className="group bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:-translate-y-1 transition-all duration-500 motion-safe:animate-fadeInUp shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)] hover:border-gray-400 dark:hover:border-gray-600"
                  style={{ animationDelay: `${0.3 + index * 0.05}s` }}
                >
                  {/* Image */}
                  <div className="aspect-[4/3] bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-2">
                    <h3 className="font-serif text-lg text-neutral-900 dark:text-neutral-100 line-clamp-2 leading-snug">
                      {product.name}
                    </h3>
                    {product.brand && (
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 font-sans">
                        {product.brand}
                      </p>
                    )}
                    <div className="pt-2">
                      <span className="relative inline-block text-sm font-medium text-neutral-900 dark:text-neutral-100 font-sans">
                        VIEW PRODUCT
                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-neutral-900 dark:bg-neutral-100 group-hover:w-full transition-all duration-300"></span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto space-y-4">
                <p className="text-xl font-serif text-neutral-900">No undermount sinks found</p>
                <p className="text-neutral-600">Try adjusting your filters or browse all sinks.</p>
                <button
                  onClick={() => {
                    setSelectedBrand('all');
                    setSelectedMaterial('all');
                  }}
                  className="inline-block px-6 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors text-sm font-medium mt-4"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-20 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-neutral-900">
            Need help choosing the perfect undermount sink?
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto">
            Our experts are here to help you find the ideal sink for your space.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/quote"
              className="w-full sm:w-auto px-8 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors text-sm font-medium"
            >
              Get a Quote
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-3 border border-neutral-300 text-neutral-900 rounded-lg hover:border-neutral-900 hover:bg-neutral-50 transition-all text-sm font-medium"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Banner */}
      <NewsletterBanner />
    </div>
  );
};

export default UndermountSinks;

