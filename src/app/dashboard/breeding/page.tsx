'use client';

import React, { useState, useMemo } from 'react';
import { FiPlus, FiSearch, FiCalendar, FiUsers, FiFilter } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

// Mock litters data
const litters = [
  {
    id: 1,
    litterName: 'Spring 2023 Litter',
    sire: 'Max',
    dam: 'Bella',
    birthDate: '2023-04-15',
    totalPuppies: 6,
    maleCount: 4,
    femaleCount: 2,
    status: 'Active',
    availablePuppies: 3,
    reservedPuppies: 2,
    soldPuppies: 1,
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee'
  },
  {
    id: 2,
    litterName: 'Summer 2023 Litter',
    sire: 'Charlie',
    dam: 'Luna',
    birthDate: '2023-07-22',
    totalPuppies: 8,
    maleCount: 3,
    femaleCount: 5,
    status: 'Completed',
    availablePuppies: 0,
    reservedPuppies: 0,
    soldPuppies: 8,
    image: 'https://images.unsplash.com/photo-1548658146-f142deadf8f7'
  },
  {
    id: 3,
    litterName: 'Fall 2023 Litter',
    sire: 'Max',
    dam: 'Daisy',
    birthDate: '2023-10-10',
    totalPuppies: 5,
    maleCount: 2,
    femaleCount: 3,
    status: 'Active',
    availablePuppies: 2,
    reservedPuppies: 3,
    soldPuppies: 0,
    image: 'https://images.unsplash.com/photo-1601979031925-424e53b6caaa'
  },
  {
    id: 4,
    litterName: 'Winter 2024 Litter',
    sire: 'Rocky',
    dam: 'Bella',
    birthDate: '2024-01-05',
    totalPuppies: 7,
    maleCount: 4,
    femaleCount: 3,
    status: 'Active',
    availablePuppies: 5,
    reservedPuppies: 2,
    soldPuppies: 0,
    image: 'https://images.unsplash.com/photo-1529429617124-95b109e86bb8'
  },
  {
    id: 5,
    litterName: 'Spring 2024 Planned',
    sire: 'Charlie',
    dam: 'Daisy',
    birthDate: '2024-04-20',
    totalPuppies: 0,
    maleCount: 0,
    femaleCount: 0,
    status: 'Planned',
    availablePuppies: 0,
    reservedPuppies: 0,
    soldPuppies: 0,
    image: 'https://images.unsplash.com/photo-1591160690555-5debfba289f0'
  }
];

export default function BreedingPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter litters based on search term and status filter
  const filteredLitters = useMemo(() => {
    return litters.filter(litter => {
      // Search filter
      const matchesSearch = 
        searchTerm === '' || 
        litter.litterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        litter.sire.toLowerCase().includes(searchTerm.toLowerCase()) ||
        litter.dam.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Status filter
      const matchesStatus = 
        statusFilter === null || 
        litter.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  // Get stats for the dashboard
  const activeLittersCount = litters.filter(l => l.status === 'Active').length;
  const totalPuppiesCount = litters.reduce((sum, l) => sum + l.totalPuppies, 0);
  const availablePuppiesCount = litters.reduce((sum, l) => sum + l.availablePuppies, 0);

  return (
    <DashboardLayout>
      <PageHeader title="Breeding Program" description="Manage your litters and breeding program" />
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard 
          title="Active Litters" 
          value={activeLittersCount.toString()} 
          icon={<FiUsers className="text-blue-500" size={24} />} 
        />
        <StatCard 
          title="Total Puppies" 
          value={totalPuppiesCount.toString()} 
          icon={<FiUsers className="text-green-500" size={24} />} 
        />
        <StatCard 
          title="Available Puppies" 
          value={availablePuppiesCount.toString()} 
          icon={<FiUsers className="text-yellow-500" size={24} />} 
        />
      </div>
      
      {/* Search and Filters */}
      <div className="mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-col sm:flex-row gap-2 sm:items-center w-full sm:w-auto">
                <div className="relative w-full sm:w-64">
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
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-full sm:w-auto"
                >
                  <FiFilter className="mr-2" />
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </Button>
              </div>
              
              <Button onClick={() => router.push('/dashboard/breeding/add-litter')}>
                <FiPlus className="mr-2" />
                Add New Litter
              </Button>
            </div>
            
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      className="w-full px-3 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={statusFilter || ''}
                      onChange={(e) => setStatusFilter(e.target.value === '' ? null : e.target.value)}
                    >
                      <option value="">All Statuses</option>
                      <option value="Planned">Planned</option>
                      <option value="Active">Active</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date Range
                    </label>
                    <select
                      className="w-full px-3 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">All Time</option>
                      <option value="last30">Last 30 Days</option>
                      <option value="last90">Last 90 Days</option>
                      <option value="last365">Last Year</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sort By
                    </label>
                    <select
                      className="w-full px-3 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="dateDesc">Date (Newest First)</option>
                      <option value="dateAsc">Date (Oldest First)</option>
                      <option value="puppiesDesc">Puppies (Most First)</option>
                      <option value="puppiesAsc">Puppies (Least First)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Litters List */}
      <div className="space-y-6">
        {filteredLitters.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-500">No litters found</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => router.push('/dashboard/breeding/add-litter')}
              >
                <FiPlus className="mr-2" />
                Add Your First Litter
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredLitters.map(litter => (
            <LitterCard 
              key={litter.id} 
              litter={litter} 
              onViewDetails={() => router.push(`/dashboard/breeding/${litter.id}`)}
            />
          ))
        )}
      </div>
      
      {/* Breeding Calendar */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Breeding Calendar</h2>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-center p-8 border border-dashed border-gray-300 rounded-lg">
              <FiCalendar className="mx-auto text-gray-400" size={48} />
              <p className="mt-4 text-gray-500">Breeding calendar will be available in a future update</p>
              <Button variant="outline" className="mt-4">
                Schedule Breeding
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

function LitterCard({ 
  litter, 
  onViewDetails 
}: { 
  litter: any;
  onViewDetails: () => void;
}) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/4 h-48 md:h-auto">
            <img 
              src={litter.image} 
              alt={litter.litterName} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-6 flex-grow">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-semibold">{litter.litterName}</h3>
                <p className="text-sm text-gray-500">
                  {litter.sire} × {litter.dam}
                </p>
              </div>
              
              <span className={`text-xs px-2 py-1 rounded-full ${
                litter.status === 'Active' ? 'bg-green-100 text-green-800' :
                litter.status === 'Planned' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {litter.status}
              </span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500">Birth Date</p>
                <p className="font-medium">
                  {litter.status === 'Planned' ? 'Expected: ' : ''}
                  {litter.birthDate}
                </p>
              </div>
              
              <div>
                <p className="text-xs text-gray-500">Total Puppies</p>
                <p className="font-medium">
                  {litter.status === 'Planned' ? 'TBD' : litter.totalPuppies}
                </p>
              </div>
              
              <div>
                <p className="text-xs text-gray-500">Males / Females</p>
                <p className="font-medium">
                  {litter.status === 'Planned' ? 'TBD' : `${litter.maleCount} / ${litter.femaleCount}`}
                </p>
              </div>
              
              <div>
                <p className="text-xs text-gray-500">Available</p>
                <p className="font-medium">
                  {litter.status === 'Planned' ? 'TBD' : litter.availablePuppies}
                </p>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center text-sm text-gray-500">
                <FiCalendar className="mr-1" size={14} />
                {litter.status === 'Planned' 
                  ? `Expected: ${litter.birthDate}` 
                  : `Born: ${litter.birthDate}`
                }
              </div>
              
              <Button variant="outline" size="sm" onClick={onViewDetails}>
                View Details
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StatCard({ 
  title, 
  value, 
  icon 
}: { 
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-xl font-semibold mt-1">{value}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-full">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 