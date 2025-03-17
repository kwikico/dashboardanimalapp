'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { FiEdit2, FiTrash2, FiArrowLeft, FiCalendar, FiMapPin, FiAward, FiUser } from 'react-icons/fi';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { dogs } from '@/data/mockData';

// Mock achievements data (same as in the achievements page)
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

export default function AchievementDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const achievementId = Number(params.id);
  
  const [achievement, setAchievement] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedDog, setRelatedDog] = useState<any>(null);
  const [relatedAchievements, setRelatedAchievements] = useState<any[]>([]);
  
  useEffect(() => {
    // In a real app, you would fetch this data from an API
    const foundAchievement = achievements.find(a => a.id === achievementId);
    
    if (foundAchievement) {
      setAchievement(foundAchievement);
      
      // Find the related dog
      const dog = dogs.find(d => d.id === foundAchievement.dogId);
      if (dog) {
        setRelatedDog(dog);
      }
      
      // Find related achievements (same dog, same category, or same competition)
      const related = achievements.filter(a => 
        a.id !== achievementId && (
          a.dogId === foundAchievement.dogId || 
          a.category === foundAchievement.category ||
          a.competition === foundAchievement.competition
        )
      ).slice(0, 3);
      
      setRelatedAchievements(related);
    }
    
    setLoading(false);
  }, [achievementId]);
  
  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Loading...</p>
        </div>
      </DashboardLayout>
    );
  }
  
  if (!achievement) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-gray-500 mb-4">Achievement not found</p>
          <Button variant="outline" onClick={() => router.push('/dashboard/achievements')}>
            <FiArrowLeft className="mr-2" />
            Back to Achievements
          </Button>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout>
      <div className="mb-6 flex justify-between items-center">
        <Button variant="outline" onClick={() => router.push('/dashboard/achievements')}>
          <FiArrowLeft className="mr-2" />
          Back to Achievements
        </Button>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push(`/dashboard/achievements/${achievementId}/edit`)}>
            <FiEdit2 className="mr-2" />
            Edit
          </Button>
          <Button variant="outline" className="text-red-600 hover:bg-red-50">
            <FiTrash2 className="mr-2" />
            Delete
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Achievement Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">{achievement.title}</h1>
                <span className="text-sm px-3 py-1 rounded-full bg-yellow-100 text-yellow-800">
                  {achievement.points} points
                </span>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-16 w-16 rounded-full overflow-hidden flex-shrink-0">
                    <img 
                      src={achievement.dogImage} 
                      alt={achievement.dogName} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">{achievement.dogName}</h2>
                    <p className="text-sm text-gray-500">{achievement.category}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-sm text-gray-500">
                    <FiCalendar className="mr-2" size={16} />
                    <span>{achievement.date}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <FiMapPin className="mr-2" size={16} />
                    <span>{achievement.location}</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Competition</h3>
                  <p>{achievement.competition}</p>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Description</h3>
                  <p>{achievement.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium mb-2">Judge</h3>
                    <p>{achievement.judge}</p>
                  </div>
                </div>
              </div>
              
              {/* Achievement Certificate */}
              <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                <div className="text-center mb-4">
                  <FiAward className="mx-auto text-yellow-500" size={48} />
                  <h2 className="text-xl font-bold mt-2">Achievement Certificate</h2>
                </div>
                
                <div className="text-center mb-6">
                  <p className="text-lg">This certifies that</p>
                  <p className="text-xl font-bold my-2">{achievement.dogName}</p>
                  <p className="text-lg">has been awarded</p>
                  <p className="text-xl font-bold my-2">{achievement.title}</p>
                  <p className="text-lg">at the {achievement.competition}</p>
                  <p className="text-sm mt-4">Date: {achievement.date}</p>
                  <p className="text-sm">Judge: {achievement.judge}</p>
                </div>
                
                <div className="flex justify-center">
                  <Button variant="outline" size="sm">
                    <FiAward className="mr-2" />
                    Print Certificate
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right Column - Dog Info and Related Achievements */}
        <div className="space-y-6">
          {/* Dog Information */}
          {relatedDog && (
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">Dog Information</h2>
              </CardHeader>
              <CardContent className="p-0">
                <div className="p-4 flex items-start gap-3">
                  <div className="h-16 w-16 rounded-full overflow-hidden flex-shrink-0">
                    <img 
                      src={relatedDog.image} 
                      alt={relatedDog.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{relatedDog.name}</h3>
                    <p className="text-sm text-gray-500">{relatedDog.breed}</p>
                    <p className="text-sm text-gray-500">{relatedDog.gender}, {relatedDog.age}</p>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => router.push(`/dashboard/dogs/${relatedDog.id}`)}
                    >
                      <FiUser className="mr-2" size={14} />
                      View Dog Profile
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Related Achievements */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Related Achievements</h2>
            </CardHeader>
            <CardContent className="p-0">
              {relatedAchievements.length > 0 ? (
                relatedAchievements.map(relatedAchievement => (
                  <div 
                    key={relatedAchievement.id} 
                    className="p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 cursor-pointer"
                    onClick={() => router.push(`/dashboard/achievements/${relatedAchievement.id}`)}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-medium">{relatedAchievement.title}</h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
                        {relatedAchievement.points} pts
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-1">{relatedAchievement.dogName} • {relatedAchievement.category}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <FiCalendar className="mr-1" size={12} />
                      {relatedAchievement.date}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-gray-500">
                  No related achievements found
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Achievement Stats */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Achievement Stats</h2>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div>
                <p className="text-sm text-gray-500">Total {achievement.category} Achievements</p>
                <p className="text-xl font-semibold">
                  {achievements.filter(a => a.category === achievement.category).length}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">{achievement.dogName}'s Achievements</p>
                <p className="text-xl font-semibold">
                  {achievements.filter(a => a.dogId === achievement.dogId).length}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Total Points Earned</p>
                <p className="text-xl font-semibold">
                  {achievements.filter(a => a.dogId === achievement.dogId).reduce((sum, a) => sum + a.points, 0)}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
} 