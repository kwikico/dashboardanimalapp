'use client';

import React, { useState, useMemo } from 'react';
import { FiPlus, FiSearch, FiAward, FiCalendar } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { dogs } from '@/data/mockData';

// Mock achievements data
const achievements = [
  {
    id: 1,
    dogId: 1,
    dogName: 'Max',
    dogImage: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1',
    title: 'Best in Show',
    date: '2023-05-15',
    competition: 'National Dog Show 2023',
    category: 'Show',
    description: 'First place in the Working Group category',
    location: 'Chicago, IL',
    judge: 'Sarah Johnson',
    points: 25
  },
  {
    id: 2,
    dogId: 2,
    dogName: 'Bella',
    dogImage: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e',
    title: 'Agility Champion',
    date: '2023-06-22',
    competition: 'Regional Agility Championship',
    category: 'Agility',
    description: 'Completed advanced course in record time',
    location: 'Denver, CO',
    judge: 'Michael Roberts',
    points: 18
  },
  {
    id: 3,
    dogId: 3,
    dogName: 'Charlie',
    dogImage: 'https://images.unsplash.com/photo-1517849845537-4d257902454a',
    title: 'Obedience Trial Winner',
    date: '2023-07-10',
    competition: 'State Obedience Trials',
    category: 'Obedience',
    description: 'Perfect score in advanced obedience class',
    location: 'Portland, OR',
    judge: 'Emily Chen',
    points: 20
  },
  {
    id: 4,
    dogId: 1,
    dogName: 'Max',
    dogImage: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1',
    title: 'Group Winner',
    date: '2023-08-05',
    competition: 'Summer Classic Dog Show',
    category: 'Show',
    description: 'First place in Working Group',
    location: 'Seattle, WA',
    judge: 'David Miller',
    points: 15
  },
  {
    id: 5,
    dogId: 4,
    dogName: 'Luna',
    dogImage: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2',
    title: 'Rally Advanced',
    date: '2023-09-18',
    competition: 'AKC Rally Trial',
    category: 'Rally',
    description: 'Qualified with score of 98/100',
    location: 'Austin, TX',
    judge: 'Patricia Wilson',
    points: 12
  }
];

export default function AchievementsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  
  // Filter achievements based on search term and category filter
  const filteredAchievements = useMemo(() => {
    return achievements.filter(achievement => {
      // Search filter
      const matchesSearch = 
        searchTerm === '' || 
        achievement.dogName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        achievement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        achievement.competition.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Category filter
      const matchesCategory = 
        categoryFilter === null || 
        achievement.category === categoryFilter;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, categoryFilter]);

  return (
    <DashboardLayout>
      <PageHeader title="Achievements" description="Track and manage your dogs' achievements and awards" />
      
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <FiSearch size={18} />
            </div>
            <input
              type="text"
              className="w-full py-2 pl-10 pr-4 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search achievements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <FilterSelect
            options={[
              { label: 'All Categories', value: null },
              { label: 'Show', value: 'Show' },
              { label: 'Agility', value: 'Agility' },
              { label: 'Obedience', value: 'Obedience' },
              { label: 'Rally', value: 'Rally' },
              { label: 'Tracking', value: 'Tracking' },
              { label: 'Field Trial', value: 'Field Trial' },
              { label: 'Herding', value: 'Herding' },
              { label: 'Other', value: 'Other' },
            ]}
            value={categoryFilter}
            onChange={setCategoryFilter}
          />
        </div>
        
        <Button onClick={() => router.push('/dashboard/achievements/add')}>
          <FiPlus className="mr-2" />
          Add Achievement
        </Button>
      </div>
      
      <div className="space-y-4">
        {filteredAchievements.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-500">No achievements found</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => router.push('/dashboard/achievements/add')}
              >
                <FiPlus className="mr-2" />
                Add Your First Achievement
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredAchievements.map(achievement => (
            <AchievementCard 
              key={achievement.id} 
              achievement={achievement} 
              onViewDetails={() => router.push(`/dashboard/achievements/${achievement.id}`)}
            />
          ))
        )}
      </div>
      
      {/* Achievement Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard 
          title="Total Achievements" 
          value={achievements.length.toString()} 
          icon={<FiAward className="text-blue-500" size={24} />} 
        />
        <StatCard 
          title="Top Performer" 
          value={getTopPerformer()} 
          icon={<FiAward className="text-yellow-500" size={24} />} 
        />
        <StatCard 
          title="Recent Achievement" 
          value={getMostRecentAchievement()} 
          icon={<FiCalendar className="text-green-500" size={24} />} 
        />
      </div>
    </DashboardLayout>
  );
}

// Helper functions for stats
function getTopPerformer() {
  const dogAchievements = achievements.reduce((acc, achievement) => {
    acc[achievement.dogName] = (acc[achievement.dogName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  let topDog = '';
  let topCount = 0;
  
  Object.entries(dogAchievements).forEach(([dog, count]) => {
    if (count > topCount) {
      topDog = dog;
      topCount = count;
    }
  });
  
  return topDog;
}

function getMostRecentAchievement() {
  if (achievements.length === 0) return 'None';
  
  const sorted = [...achievements].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  return sorted[0].title;
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

function AchievementCard({ 
  achievement, 
  onViewDetails 
}: { 
  achievement: any;
  onViewDetails: () => void;
}) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="h-16 w-16 rounded-full overflow-hidden flex-shrink-0">
            <img 
              src={achievement.dogImage} 
              alt={achievement.dogName} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-grow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{achievement.title}</h3>
                <p className="text-sm text-gray-500">{achievement.dogName} • {achievement.category}</p>
              </div>
              
              <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
                {achievement.points} pts
              </span>
            </div>
            
            <p className="mt-2 text-sm">{achievement.competition}</p>
            
            <div className="mt-3 flex justify-between items-center">
              <div className="flex items-center text-sm text-gray-500">
                <FiCalendar className="mr-1" size={14} />
                {achievement.date}
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