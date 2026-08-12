import React from 'react';
import { X } from 'lucide-react';

interface FilterPanelProps {
  filters: Record<string, string>;
  setFilters: (filters: Record<string, string>) => void;
  filterOptions: Record<string, string[]>;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, setFilters, filterOptions }) => {
  const handleFilterChange = (filterType: string, value: string) => {
    setFilters({
      ...filters,
      [filterType]: filters[filterType] === value ? '' : value
    });
  };

  const clearAllFilters = () => {
    const clearedFilters = Object.keys(filters).reduce((acc, key) => {
      acc[key] = '';
      return acc;
    }, {} as Record<string, string>);
    setFilters(clearedFilters);
  };

  const activeFiltersCount = Object.values(filters).filter(value => value !== '').length;

  return (
    <div className="minimalist-filter">
      <div className="filter-section">
        <h3 className="filter-header">Filters</h3>
        {activeFiltersCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="clear-button mb-4"
          >
            Clear All ({activeFiltersCount})
          </button>
        )}
      </div>

      <div className="space-y-8">
        {Object.entries(filterOptions).map(([filterType, options]) => (
          <div key={filterType} className="filter-section">
            <h4 className="filter-header capitalize">
              {filterType.replace(/([A-Z])/g, ' $1').trim()}
            </h4>
            <div className="space-y-3">
              {options.map((option) => (
                <label key={option} className="filter-option">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters[filterType] === option}
                      onChange={() => handleFilterChange(filterType, option)}
                      className="filter-checkbox"
                    />
                    <span className="filter-label">
                      {option}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterPanel;