'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FiPlus, FiCalendar } from 'react-icons/fi';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SearchInput } from '@/components/ui/SearchInput';
import { FilterToggle } from '@/components/ui/FilterToggle';
import { Badge } from '@/components/ui/Badge';
import { LitterCard } from '@/components/litters/LitterCard';
import { litters } from '@/data/mockData';

export default function LitterManagement() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [breedFilter, setBreedFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');
  
  // Filter litters based on search query, active tab, and filters
  const filteredLitters = litters.filter(litter => {
    // Search query filter
    const matchesSearch = 
      litter.sire.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      litter.dam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (litter.litterName?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      (litter.sire.breed?.toLowerCase() || '').includes(searchQuery.toLowerCase());
    
    // Tab filter
    const matchesTab = 
      activeTab === 'all' ? true :
      activeTab === 'active' ? litter.status === 'Active' :
      activeTab === 'planned' ? litter.status === 'Planned' :
      activeTab === 'completed' ? litter.status === 'Completed' : true;
    
    // Breed filter
    const matchesBreed = breedFilter ? 
      (litter.sire.breed === breedFilter || litter.dam.breed === breedFilter) : true;
    
    // Year filter (simplified for demo)
    const matchesYear = yearFilter ? 
      litter.whelpingDate.includes(yearFilter) : true;
    
    // Availability filter
    const matchesAvailability = availabilityFilter === 'yes' ? 
      (litter.availablePuppies || 0) > 0 : 
      availabilityFilter === 'no' ? 
      (litter.availablePuppies || 0) === 0 : true;
    
    return matchesSearch && matchesTab && matchesBreed && matchesYear && matchesAvailability;
  });
  
  // Get unique breeds for filter
  const breeds = Array.from(new Set([
    ...litters.map(l => l.sire.breed || ''),
    ...litters.map(l => l.dam.breed || '')
  ].filter(breed => breed !== '')));
  
  // Upcoming breeding events
  const upcomingEvents = [
    {
      title: `${litters[1].dam.name} - Expected Whelping`,
      date: litters[1].whelpingDate,
      type: 'whelping'
    },
    {
      title: `${litters[0].dam.name} - Heat Cycle`,
      date: 'July 10, 2023',
      type: 'heat'
    },
    {
      title: `${litters[2].dam.name} - Puppies Ready for Homes`,
      date: 'July 5, 2023',
      type: 'puppies'
    }
  ];
  
  return (
    <DashboardLayout>
      <PageHeader 
        title="Litter Management"
        description="Track and manage your breeding program"
        actions={
          <Link href="/dashboard/litters/add">
            <Button icon={<FiPlus />}>Add New Litter</Button>
          </Link>
        }
      />
      
      {/* Tab Navigation and Search */}
      <Card className="mb-6">
        <div className="grid grid-cols-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('all')}
            className={`py-4 text-center text-sm font-medium ${
              activeTab === 'all'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            All Litters
          </button>
          
          <button
            onClick={() => setActiveTab('active')}
            className={`py-4 text-center text-sm font-medium ${
              activeTab === 'active'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            Active
          </button>
          
          <button
            onClick={() => setActiveTab('planned')}
            className={`py-4 text-center text-sm font-medium ${
              activeTab === 'planned'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            Planned
          </button>
          
          <button
            onClick={() => setActiveTab('completed')}
            className={`py-4 text-center text-sm font-medium ${
              activeTab === 'completed'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            Completed
          </button>
        </div>
        
        {/* Search and Filter */}
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <SearchInput
                placeholder="Search litters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <FilterToggle 
              isOpen={filterOpen}
              onToggle={() => setFilterOpen(!filterOpen)}
              filterCount={
                (breedFilter ? 1 : 0) + 
                (yearFilter ? 1 : 0) + 
                (availabilityFilter ? 1 : 0)
              }
            />
          </div>
          
          {filterOpen && (
            <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Breed
                </label>
                <select 
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={breedFilter}
                  onChange={(e) => setBreedFilter(e.target.value)}
                >
                  <option value="">All Breeds</option>
                  {breeds.map(breed => (
                    <option key={breed} value={breed}>{breed}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year
                </label>
                <select 
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                >
                  <option value="">All Years</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Puppies Available
                </label>
                <select 
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={availabilityFilter}
                  onChange={(e) => setAvailabilityFilter(e.target.value)}
                >
                  <option value="">Any</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Litter Cards */}
      {filteredLitters.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">No litters found.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLitters.map((litter) => (
            <LitterCard key={litter.id} litter={litter} />
          ))}
        </div>
      )}
      
      {/* Breeding Calendar Section */}
      <div className="mt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Breeding Calendar</h2>
          <Link href="/dashboard/litters/calendar">
            <Button variant="outline" size="sm" icon={<FiCalendar />}>View Full Calendar</Button>
          </Link>
        </div>
        
        <Card>
          <CardHeader>
            <h3 className="text-lg font-bold text-gray-900">Upcoming Events</h3>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <Badge 
                      variant={
                        event.type === 'whelping' ? 'info' : 
                        event.type === 'heat' ? 'warning' : 
                        'success'
                      }
                      className="mr-3"
                    >
                      {event.type.charAt(0).toUpperCase()}
                    </Badge>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{event.title}</h4>
                      <p className="text-xs text-gray-500">{event.date}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Details</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}