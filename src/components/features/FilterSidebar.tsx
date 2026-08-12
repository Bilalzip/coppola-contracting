import { useState } from 'react';
import { ChevronDown, X, SlidersHorizontal } from 'lucide-react';
import Button from './Button';

export interface FilterState {
  typology: string;
  bathCollection: string;
  kitchenCollection: string;
  category: string;
}

interface FilterSidebarProps {
  onFilterChange: (filters: FilterState) => void;
  isOpen: boolean;
  onClose: () => void;
}

const FilterSidebar = ({ onFilterChange, isOpen, onClose }: FilterSidebarProps) => {
  const [filters, setFilters] = useState<FilterState>({
    typology: 'All Typologies',
    bathCollection: 'All Bath Collections',
    kitchenCollection: 'All Kitchen Collections',
    category: 'All Categories',
  });

  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['typologies'])
  );

  const typologies = [
    { name: 'All Typologies', count: 285 },
    { name: 'Bathroom', count: 280 },
    { name: 'Kitchen', count: 5 },
  ];

  const bathCollections = [
    { name: 'All Bath Collections', count: 280 },
    { name: 'ARCH', count: 7 },
    { name: 'GIO', count: 25 },
    { name: 'MORANDI', count: 12 },
    { name: 'NEO', count: 7 },
    { name: 'ONO', count: 5 },
    { name: 'OPUS', count: 21 },
    { name: 'ORIGIN', count: 20 },
    { name: 'ORIGIN PLUS', count: 6 },
    { name: 'PEI', count: 3 },
    { name: 'RITTZE', count: 14 },
    { name: 'SERIES 05', count: 5 },
    { name: 'SERIES 08', count: 4 },
    { name: 'SERIES 10', count: 5 },
    { name: 'SERIES 19', count: 5 },
    { name: 'UNIVERSAL', count: 141 },
  ];

  const kitchenCollections = [
    { name: 'All Kitchen Collections', count: 5 },
    { name: 'CF2000', count: 2 },
    { name: 'CF8000', count: 1 },
    { name: 'CF9100', count: 1 },
    { name: 'CF9200', count: 1 },
  ];

  const categories = [
    { name: 'All Categories', count: 285 },
    { name: 'Lavatory faucets', count: 55 },
    { name: 'Tub fillers', count: 19 },
    { name: 'Pressure balance controls', count: 5 },
    { name: 'Thermostatic controls', count: 34 },
    { name: 'Shower heads', count: 14 },
    { name: 'Shower arms', count: 13 },
    { name: 'Body sprays & handheld showers', count: 7 },
    { name: 'Tub spouts', count: 6 },
    { name: 'Elbows & handheld holders', count: 6 },
    { name: 'Slide bars & shower hoses', count: 3 },
    { name: 'Handheld kits', count: 8 },
    { name: 'Shower sets', count: 71 },
    { name: 'Rough valves', count: 18 },
    { name: 'Bath Fittings', count: 2 },
    { name: 'Bath accessories', count: 19 },
    { name: 'Kitchen faucets', count: 4 },
    { name: 'Kitchen accessories', count: 1 },
  ];

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const handleFilterChange = (filterType: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    const defaultFilters: FilterState = {
      typology: 'All Typologies',
      bathCollection: 'All Bath Collections',
      kitchenCollection: 'All Kitchen Collections',
      category: 'All Categories',
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  const hasActiveFilters =
    filters.typology !== 'All Typologies' ||
    filters.bathCollection !== 'All Bath Collections' ||
    filters.kitchenCollection !== 'All Kitchen Collections' ||
    filters.category !== 'All Categories';

  const FilterSection = ({
    id,
    title,
    items,
    filterKey,
    selectedValue,
  }: {
    id: string;
    title: string;
    items: { name: string; count: number }[];
    filterKey: keyof FilterState;
    selectedValue: string;
  }) => {
    const isExpanded = expandedSections.has(id);

    return (
      <div className="border-b border-neutral-200/60 dark:border-neutral-800/60 transition-colors duration-200 hover:border-neutral-300/80 dark:hover:border-neutral-700/80">
        <button
          onClick={() => toggleSection(id)}
          className="w-full px-6 py-4 flex items-center justify-between group transition-all duration-200 ease-out hover:bg-neutral-50/50 dark:hover:bg-[#0A0A0A]/50"
          aria-expanded={isExpanded}
        >
          <span
            className="text-sm font-semibold text-[#2C3539] dark:text-[#F9FAFB] transition-colors duration-150 group-hover:text-[#1a2024] dark:group-hover:text-white"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            {title}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-[#5D6D74] dark:text-[#9CA3AF] transition-all duration-250 ease-out group-hover:text-[#2C3539] dark:group-hover:text-[#F9FAFB] ${
              isExpanded ? 'rotate-180' : ''
            }`}
            strokeWidth={1.5}
          />
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 pb-4 space-y-0.5 max-h-[400px] overflow-y-auto custom-scrollbar">
            {items.map((item) => {
              const isSelected = selectedValue === item.name;
              return (
                <label
                  key={item.name}
                  className={`relative flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 ease-out group ${
                    isSelected
                      ? 'bg-[#2C3539] dark:bg-[#F9FAFB] shadow-sm'
                      : 'hover:bg-neutral-50/70 dark:hover:bg-[#1A1A1A]/50 hover:translate-x-0.5'
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="relative">
                      <input
                        type="radio"
                        name={filterKey}
                        checked={isSelected}
                        onChange={() => handleFilterChange(filterKey, item.name)}
                        className="w-4 h-4 flex-shrink-0 accent-[#2C3539] dark:accent-[#F9FAFB] cursor-pointer transition-transform duration-150 hover:scale-110"
                      />
                      {!isSelected && (
                        <div className="absolute inset-0 rounded-full border border-neutral-300/0 dark:border-neutral-700/0 group-hover:border-neutral-300/50 dark:group-hover:border-neutral-700/50 transition-all duration-200 pointer-events-none" />
                      )}
                    </div>
                    <span
                      className={`text-sm truncate transition-all duration-150 ${
                        isSelected
                          ? 'text-white dark:text-[#000000] font-medium'
                          : 'text-[#2C3539] dark:text-[#9CA3AF] group-hover:text-[#1a2024] dark:group-hover:text-[#D1D5DB]'
                      }`}
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {item.name}
                    </span>
                  </div>
                  <span
                    className={`text-xs ml-2 flex-shrink-0 transition-all duration-150 ${
                      isSelected
                        ? 'text-neutral-300 dark:text-[#5D6D74]'
                        : 'text-[#9CA3AF] dark:text-[#6B7280] group-hover:text-[#5D6D74] dark:group-hover:text-[#9CA3AF]'
                    }`}
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    ({item.count})
                  </span>
                  {!isSelected && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-px bg-[#2C3539]/10 dark:bg-[#F9FAFB]/10 group-hover:w-1 transition-all duration-200" />
                  )}
                </label>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen lg:h-auto
          w-[320px] lg:w-full
          bg-white dark:bg-[#000000]
          border-r lg:border-r-0 border-neutral-200 dark:border-neutral-800
          z-50 lg:z-0
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          overflow-y-auto custom-scrollbar
        `}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white/95 dark:bg-[#000000]/95 backdrop-blur-sm z-10 border-b border-neutral-200/60 dark:border-neutral-800/60">
          <div className="px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <SlidersHorizontal className="w-5 h-5 text-[#2C3539] dark:text-[#F9FAFB] transition-transform duration-200 hover:rotate-180" strokeWidth={1.5} />
              <h3
                className="text-lg font-semibold text-[#2C3539] dark:text-[#F9FAFB]"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Filters
              </h3>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-neutral-50/70 dark:hover:bg-[#1A1A1A]/70 rounded-lg transition-all duration-200 ease-out group hover:scale-105"
              aria-label="Close filters"
            >
              <X className="w-5 h-5 text-[#2C3539] dark:text-[#F9FAFB] transition-transform duration-200 group-hover:rotate-90" strokeWidth={1.5} />
            </button>
          </div>

          {hasActiveFilters && (
            <div className="px-6 pb-4 animate-fadeIn">
              <Button
                onClick={clearAllFilters}
                variant="outline"
                size="sm"
                className="w-full hover:shadow-sm"
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>

        {/* Filter Sections */}
        <div>
          <FilterSection
            id="typologies"
            title="Typologies"
            items={typologies}
            filterKey="typology"
            selectedValue={filters.typology}
          />

          <FilterSection
            id="bath-collections"
            title="Bath Collections"
            items={bathCollections}
            filterKey="bathCollection"
            selectedValue={filters.bathCollection}
          />

          <FilterSection
            id="kitchen-collections"
            title="Kitchen Collections"
            items={kitchenCollections}
            filterKey="kitchenCollection"
            selectedValue={filters.kitchenCollection}
          />

          <FilterSection
            id="categories"
            title="Categories"
            items={categories}
            filterKey="category"
            selectedValue={filters.category}
          />
        </div>

        {/* Custom Scrollbar Styles & Animations */}
        <style>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 5px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(209, 213, 219, 0.4);
            border-radius: 3px;
            transition: background 200ms ease-out;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(156, 163, 175, 0.6);
          }
          .dark .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(55, 65, 81, 0.4);
          }
          .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(75, 85, 99, 0.6);
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-4px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fadeIn {
            animation: fadeIn 250ms ease-out;
          }
        `}</style>
      </aside>
    </>
  );
};

export default FilterSidebar;




