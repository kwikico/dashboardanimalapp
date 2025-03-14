'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FiPlus, FiAward } from 'react-icons/fi';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SearchInput } from '@/components/ui/SearchInput';
import { FilterToggle } from '@/components/ui/FilterToggle';
import { AchievementCard } from '@/components/achievements/AchievementCard';
import { achievements } from '@/data/mockData';

export default function Achievements() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dogFilter, setDogFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  
  // Filter achievements based on search query and filters
  const filteredAchievements = achievements.filter(achievement => {
    // Search query filter
    const matchesSearch = 
      achievement.dogName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      achievement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      achievement.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
      achievement.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category filter
    const matchesCategory = categoryFilter ? achievement.category === categoryFilter : true;
    
    // Dog filter
    const matchesDog = dogFilter ? achievement.dogName === dogFilter : true;
    
    // Date filter (simplified for demo)
    const matchesDate = dateFilter ? achievement.date.includes(dateFilter) : true;
    
    return matchesSearch && matchesCategory && matchesDog && matchesDate;
  });
  
  // Get unique categories for filter
  const categories = Array.from(new Set(achievements.map(a => a.category)));
  
  // Get unique dogs for filter
  const dogs = Array.from(new Set(achievements.map(a => a.dogName)));
  
  // Group achievements by dog
  const achievementsByDog = filteredAchievements.reduce((acc, achievement) => {
    if (!acc[achievement.dogName]) {
      acc[achievement.dogName] = {
        dogName: achievement.dogName,
        dogImage: achievement.dogImage,
        achievements: []
      };
    }
    
    acc[achievement.dogName].achievements.push(achievement);
    return acc;
  }, {} as Record<string, { dogName: string, dogImage: string, achievements: typeof achievements }>);
  
  // Count achievements by category
  const showResults = achievements.filter(a => a.category === 'Show').length;
  const agilityResults = achievements.filter(a => a.category === 'Agility').length;
  const obedienceResults = achievements.filter(a => a.category === 'Obedience').length;
  const certificationResults = achievements.filter(a => a.category === 'Certification').length;
  
  // Count specific achievement types
  const bestOfBreed = achievements.filter(a => a.title.includes('Best of Breed')).length;
  const winnersCount = achievements.filter(a => a.title.includes('Winner')).length;
  const firstPlaceCount = achievements.filter(a => a.title.includes('First Place')).length;
  
  return (
    <DashboardLayout>
      <PageHeader 
        title="Achievements & Awards"
        description="Track and manage your dogs' competition results and awards"
        actions={
          <Link href="/dashboard/achievements/add">
            <Button icon={<FiPlus />}>Log Achievement</Button>
          </Link>
        }
      />
      
      {/* Search and Filter */}
      <div className="mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow">
                <SearchInput
                  placeholder="Search achievements..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <FilterToggle 
                isOpen={filterOpen}
                onToggle={() => setFilterOpen(!filterOpen)}
                filterCount={
                  (categoryFilter ? 1 : 0) + 
                  (dogFilter ? 1 : 0) + 
                  (dateFilter ? 1 : 0)
                }
              />
            </div>
            
            {filterOpen && (
              <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select 
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dog
                  </label>
                  <select 
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={dogFilter}
                    onChange={(e) => setDogFilter(e.target.value)}
                  >
                    <option value="">All Dogs</option>
                    {dogs.map(dog => (
                      <option key={dog} value={dog}>{dog}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date Range
                  </label>
                  <select 
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                  >
                    <option value="">All Time</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                  </select>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Achievement Content */}
      {Object.values(achievementsByDog).length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">No achievements found.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {Object.values(achievementsByDog).map(({ dogName, dogImage, achievements }) => (
            <Card key={dogName}>
              <CardHeader className="border-b border-gray-100">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src={dogImage} 
                      alt={dogName}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{dogName}</h2>
                    <p className="text-gray-500 text-sm">{achievements.length} achievements</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {achievements.map(achievement => (
                    <AchievementCard key={achievement.id} achievement={achievement} />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {/* Awards Summary Section */}
      <div className="mt-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Awards Summary</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <FiAward className="text-blue-600" size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Show Results</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Best of Breed</span>
                  <span className="font-medium text-gray-900">{bestOfBreed}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Winners Dog</span>
                  <span className="font-medium text-gray-900">{winnersCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Group Placement</span>
                  <span className="font-medium text-gray-900">0</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <FiAward className="text-green-600" size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Performance Events</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Agility</span>
                  <span className="font-medium text-gray-900">{agilityResults}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Obedience</span>
                  <span className="font-medium text-gray-900">{obedienceResults}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Rally</span>
                  <span className="font-medium text-gray-900">0</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-yellow-100 p-3 rounded-lg mr-4">
                  <FiAward className="text-yellow-600" size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Certifications</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Canine Good Citizen</span>
                  <span className="font-medium text-gray-900">{certificationResults}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Therapy Dog</span>
                  <span className="font-medium text-gray-900">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Trick Dog</span>
                  <span className="font-medium text-gray-900">0</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}