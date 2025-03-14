import React from 'react';
import { FiFilter, FiX } from 'react-icons/fi';

interface FilterToggleProps {
  isOpen: boolean;
  onToggle: () => void;
  filterCount?: number;
}

export const FilterToggle: React.FC<FilterToggleProps> = ({
  isOpen,
  onToggle,
  filterCount = 0,
}) => {
  return (
    <button
      onClick={onToggle}
      className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    >
      {isOpen ? (
        <>
          <FiX className="mr-2" size={16} />
          <span>Close Filters</span>
        </>
      ) : (
        <>
          <FiFilter className="mr-2" size={16} />
          <span>Filters</span>
          {filterCount > 0 && (
            <span className="ml-2 px-1.5 py-0.5 text-xs font-semibold text-white bg-blue-500 rounded-full">
              {filterCount}
            </span>
          )}
        </>
      )}
    </button>
  );
};