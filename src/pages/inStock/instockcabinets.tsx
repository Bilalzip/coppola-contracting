import React, { useState } from 'react';
import ProductCard from '../../components/features/ProductCard';
import FilterPanel from '../../components/features/FilterPanel';

const InStockCabinets: React.FC = () => {
  const [filters, setFilters] = useState<Record<string, string>>({
    type: '',
    size: '',
    color: '',
    style: ''
  });

  const cabinets = [
    {
      id: 1,
      name: "Shaker Style Base Cabinet",
      type: "Base Cabinet",
      size: "36\"",
      color: "White",
      image: "https://images.pexels.com/photos/6782351/pexels-photo-6782351.jpeg?auto=compress&cs=tinysrgb&w=600",
      inStock: true,
      features: ["Soft-close hinges", "Adjustable shelves", "Solid wood doors"],
      dimensions: "36\"W x 24\"D x 34.5\"H",
      material: "Solid Maple",
      specifications: ["3/4\" plywood construction", "Full extension drawers", "Concealed hinges"]
    },
    {
      id: 2,
      name: "Modern Wall Cabinet",
      type: "Wall Cabinet",
      size: "30\"",
      color: "Gray",
      image: "https://images.pexels.com/photos/6782344/pexels-photo-6782344.jpeg?auto=compress&cs=tinysrgb&w=600",
      inStock: true,
      features: ["Glass doors", "LED lighting ready", "Modern design"],
      dimensions: "30\"W x 12\"D x 30\"H",
      material: "MDF with Veneer",
      specifications: ["Tempered glass doors", "Interior lighting prep", "Adjustable shelving"]
    },
    // Add more cabinets...
  ];

  const filterOptions = {
    type: ["Base Cabinet", "Wall Cabinet", "Tall Cabinet", "Pantry Cabinet"],
    size: ["12\"", "18\"", "24\"", "30\"", "36\"", "42\""],
    color: ["White", "Gray", "Black", "Brown", "Natural"],
    style: ["Shaker", "Modern", "Traditional", "Rustic"]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-page-title font-bold text-gray-900 mb-4">In Stock Cabinets</h1>
          <p className="text-gray-600">Ready to ship kitchen and bathroom cabinets</p>
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
              <p className="text-gray-600">{cabinets.length} cabinets available</p>
              <select className="border border-gray-300 rounded-md px-3 py-2">
                <option>Sort by Price: Low to High</option>
                <option>Sort by Price: High to Low</option>
                <option>Sort by Size</option>
                <option>Sort by Type</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {cabinets.map((cabinet) => (
                <ProductCard
                  key={cabinet.id}
                  title={cabinet.name}
                  image={cabinet.image}
                  ctaLabel="VIEW CABINET"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InStockCabinets;