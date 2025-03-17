'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { FiPlus, FiSearch, FiCalendar, FiUsers } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SearchInput } from '@/components/ui/SearchInput';
import { FilterToggle } from '@/components/ui/FilterToggle';
import { Badge } from '@/components/ui/Badge';
import { litters } from '@/data/mockData';
import { Litter } from '@/types';

export default function LittersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const router = useRouter();
  
  // Filter litters based on search term and filters
  const filteredLitters = useMemo(() => {
    return litters.filter(litter => {
      // Search filter
      const matchesSearch = 
        searchTerm === '' || 
        litter.litterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        litter.sire.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        litter.dam.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Status filter
      const matchesStatus = 
        statusFilter === null || 
        litter.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  return (
    <DashboardLayout>
      <PageHeader title="Litters" description="Manage your litters and puppies" />
      
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <FiSearch size={18} />
            </div>
            <input
              type="text"
              className="w-full py-2 pl-10 pr-4 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search litters..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <FilterSelect
            options={[
              { label: 'All Status', value: null },
              { label: 'Planned', value: 'Planned' },
              { label: 'Active', value: 'Active' },
              { label: 'Completed', value: 'Completed' },
            ]}
            value={statusFilter}
            onChange={setStatusFilter}
          />
        </div>
        
        <Button onClick={() => router.push('/dashboard/litters/add')}>
          <FiPlus className="mr-2" />
          Add Litter
        </Button>
      </div>
      
      <div className="space-y-6">
        {filteredLitters.map(litter => (
          <LitterCard key={litter.id} litter={litter} />
        ))}
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
      {options.map((option) => (
        <option key={option.label} value={option.value || ''}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

function LitterCard({ litter }: { litter: Litter }) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 h-full">
            {litter.images.length > 0 && (
              <img 
                src={litter.images[0]} 
                alt={litter.litterName} 
                className="w-full h-full object-cover md:h-64"
              />
            )}
          </div>
          
          <div className="p-6 md:w-2/3">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">{litter.litterName}</h3>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <FiCalendar className="mr-1" size={14} />
                  <span>Whelping Date: {litter.whelpingDate}</span>
                </div>
              </div>
              
              <span className={`text-xs px-2 py-1 rounded-full ${
                litter.status === 'Planned' ? 'bg-yellow-100 text-yellow-800' :
                litter.status === 'Active' ? 'bg-green-100 text-green-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {litter.status}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Sire</p>
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full overflow-hidden mr-2">
                    <img 
                      src={litter.sire.image} 
                      alt={litter.sire.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-medium">{litter.sire.name}</span>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">Dam</p>
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full overflow-hidden mr-2">
                    <img 
                      src={litter.dam.image} 
                      alt={litter.dam.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-medium">{litter.dam.name}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center mb-4">
              <FiUsers className="text-gray-400 mr-2" />
              <span className="text-sm">
                {litter.totalPuppies !== null 
                  ? `${litter.totalPuppies} puppies total` 
                  : 'Puppies not yet born'}
                {litter.availablePuppies !== null && litter.availablePuppies > 0 && 
                  `, ${litter.availablePuppies} available`}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                {litter.puppies.length > 0 && (
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                    {litter.puppies.filter(p => p.gender === 'Male').length} Males
                  </span>
                )}
                {litter.puppies.length > 0 && (
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                    {litter.puppies.filter(p => p.gender === 'Female').length} Females
                  </span>
                )}
              </div>
              
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}