'use client';

import React, { useState, useMemo } from 'react';
import { FiPlus, FiFilter, FiSearch } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SearchInput } from '@/components/ui/SearchInput';
import { dogs } from '@/data/mockData';
import { Dog } from '@/types';

export default function DogsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [genderFilter, setGenderFilter] = useState<string | null>(null);
  const [filtersExpanded, setFiltersExpanded] = useState(false);
  
  // Filter dogs based on search term and filters
  const filteredDogs = useMemo(() => {
    return dogs.filter(dog => {
      // Search filter
      const matchesSearch = 
        searchTerm === '' || 
        dog.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dog.breed.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Status filter
      const matchesStatus = 
        statusFilter === null || 
        dog.status === statusFilter;
      
      // Gender filter
      const matchesGender = 
        genderFilter === null || 
        dog.gender === genderFilter;
      
      return matchesSearch && matchesStatus && matchesGender;
    });
  }, [searchTerm, statusFilter, genderFilter]);

  return (
    <DashboardLayout>
      <PageHeader title="Dogs" description="Manage your dogs" />
      
      <div className="mb-6 flex flex-col gap-4">
        {/* Search and Add Button Row */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:max-w-xs">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <FiSearch size={18} />
            </div>
            <input
              type="text"
              className="w-full py-2 pl-10 pr-4 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search dogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 justify-between sm:justify-end w-full">
            <Button 
              variant="outline" 
              onClick={() => setFiltersExpanded(!filtersExpanded)}
              className="sm:hidden"
            >
              <FiFilter className="mr-2" />
              Filters
            </Button>
            
            <Button onClick={() => router.push('/dashboard/dogs/add')}>
              <FiPlus className="mr-2" />
              Add Dog
            </Button>
          </div>
        </div>
        
        {/* Filters - Always visible on desktop, toggleable on mobile */}
        <div className={`flex flex-wrap gap-2 ${filtersExpanded ? 'flex' : 'hidden sm:flex'}`}>
          <FilterSelect
            options={[
              { label: 'All Status', value: null },
              { label: 'Active', value: 'Active' },
              { label: 'Breeding', value: 'Breeding' },
              { label: 'Retired', value: 'Retired' },
            ]}
            value={statusFilter}
            onChange={setStatusFilter}
          />
          
          <FilterSelect
            options={[
              { label: 'All Gender', value: null },
              { label: 'Male', value: 'Male' },
              { label: 'Female', value: 'Female' },
            ]}
            value={genderFilter}
            onChange={setGenderFilter}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredDogs.map(dog => (
          <DogCard key={dog.id} dog={dog} />
        ))}
        {filteredDogs.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500">
            No dogs found matching your filters.
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

type FilterOption = {
  label: string;
  value: string | null;
};

function FilterSelect({ 
  options, 
  value, 
  onChange 
}: { 
  options: FilterOption[];
  value: string | null;
  onChange: (value: string | null) => void;
}) {
  return (
    <select
      className="py-2 px-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      value={value || ''}
      onChange={(e) => onChange(e.target.value === '' ? null : e.target.value)}
    >
      {options.map(option => (
        <option key={option.label} value={option.value || ''}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

function DogCard({ dog }: { dog: Dog }) {
  const router = useRouter();
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-48 overflow-hidden">
        <img 
          src={dog.image} 
          alt={dog.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{dog.name}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${
            dog.status === 'Active' ? 'bg-green-100 text-green-800' :
            dog.status === 'Breeding' ? 'bg-blue-100 text-blue-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {dog.status}
          </span>
        </div>
        
        <div className="text-sm text-gray-500 mb-4">
          <p>{dog.breed}</p>
          <p>{dog.gender}, {dog.age}</p>
          {dog.titles && <p className="font-medium text-blue-600">{dog.titles}</p>}
        </div>
        
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => router.push(`/dashboard/dogs/${dog.id}`)}
          >
            View Details
          </Button>
          <span className={`text-xs px-2 py-1 rounded-full ${
            dog.healthStatus === 'Excellent' ? 'bg-green-100 text-green-800' :
            dog.healthStatus === 'Good' ? 'bg-blue-100 text-blue-800' :
            dog.healthStatus === 'Fair' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {dog.healthStatus}
          </span>
        </div>
      </CardContent>
    </Card>
  );
} 