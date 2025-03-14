import React, { InputHTMLAttributes } from 'react';
import { FiSearch } from 'react-icons/fi';

interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Search...',
  value,
  onChange,
  className = '',
  ...props
}) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
        <FiSearch size={18} />
      </div>
      <input
        type="text"
        className="w-full py-2 pl-10 pr-4 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};