import React, { useState } from 'react';
import ProductCard from '../../components/features/ProductCard';
import FilterPanel from '../../components/features/FilterPanel';

const InStockVanities: React.FC = () => {
  const [filters, setFilters] = useState<Record<string, string>>({
    size: '',
    color: '',
    brand: '',
    priceRange: ''
  });

  const vanities = [
    {
      id: 1,
      name: "Modern Single Sink Vanity",
      brand: "Coppola Home",
      size: "36\"",
      color: "White",
      image: "https://images.pexels.com/photos/6969985/pexels-photo-6969985.jpeg?auto=compress&cs=tinysrgb&w=600",
      inStock: true,
      features: ["Soft-close drawers", "Quartz top included", "Modern handles"],
      dimensions: "36\"W x 22\"D x 34\"H",
      material: "Solid Wood",
      specifications: ["Water-resistant finish", "Adjustable shelves", "Pre-drilled for plumbing"]
    },
    {
      id: 2,
      name: "Rustic Double Sink Vanity",
      brand: "Heritage Collection",
      size: "60\"",
      color: "Gray",
      image: "https://images.pexels.com/photos/6969982/pexels-photo-6969982.jpeg?auto=compress&cs=tinysrgb&w=600",
      inStock: true,
      features: ["Dual sinks", "Ample storage", "Rustic finish"],
      dimensions: "60\"W x 22\"D x 34\"H",
      material: "Reclaimed Wood",
      specifications: ["Distressed finish", "Soft-close hinges", "Undermount sink ready"]
    },
    // Add more vanities...
  ];

  const filterOptions = {
    size: ["24\"", "30\"", "36\"", "48\"", "60\"", "72\""],
    color: ["White", "Gray", "Black", "Brown", "Natural"],
    brand: ["Coppola Home", "Heritage Collection", "Modern Living", "Classic Design"],
    priceRange: ["Under $500", "$500-$1000", "$1000-$2000", "Over $2000"]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-page-title font-bold text-gray-900 mb-4">In Stock Vanities</h1>
          <p className="text-gray-600">Ready to ship bathroom vanities in various sizes and styles</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <FilterPanel 
              filters={filters}
              setFilters={setFilters}
              filterOptions={filterOptions}
            />
          </div>

          <div className="lg:w-3/4">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">{vanities.length} vanities available</p>
              <select className="border border-gray-300 rounded-md px-3 py-2">
                <option>Sort by Price: Low to High</option>
                <option>Sort by Price: High to Low</option>
                <option>Sort by Size</option>
                <option>Sort by Brand</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {vanities.map((vanity) => (
                <ProductCard
                  key={vanity.id}
                  title={vanity.name}
                  image={vanity.image}
                  ctaLabel="VIEW VANITY"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InStockVanities;