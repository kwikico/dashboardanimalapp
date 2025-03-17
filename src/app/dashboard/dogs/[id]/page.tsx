'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { FiEdit2, FiTrash2, FiArrowLeft, FiCalendar, FiAward, FiHeart } from 'react-icons/fi';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { dogs, healthRecords, achievements } from '@/data/mockData';
import { Dog, HealthRecord, Achievement } from '@/types';

export default function DogDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const dogId = Number(params.id);
  
  const [dog, setDog] = useState<Dog | null>(null);
  const [loading, setLoading] = useState(true);
  const [dogHealthRecords, setDogHealthRecords] = useState<HealthRecord[]>([]);
  const [dogAchievements, setDogAchievements] = useState<Achievement[]>([]);
  
  useEffect(() => {
    // In a real app, you would fetch this data from an API
    const foundDog = dogs.find(d => d.id === dogId);
    
    if (foundDog) {
      setDog(foundDog);
      
      // Get related health records
      const relatedHealthRecords = healthRecords.filter(
        record => record.dogName === foundDog.name
      );
      setDogHealthRecords(relatedHealthRecords);
      
      // Get related achievements
      const relatedAchievements = achievements.filter(
        achievement => achievement.dogName === foundDog.name
      );
      setDogAchievements(relatedAchievements);
    }
    
    setLoading(false);
  }, [dogId]);
  
  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Loading...</p>
        </div>
      </DashboardLayout>
    );
  }
  
  if (!dog) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-gray-500 mb-4">Dog not found</p>
          <Button variant="outline" onClick={() => router.push('/dashboard/dogs')}>
            <FiArrowLeft className="mr-2" />
            Back to Dogs
          </Button>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout>
      <div className="mb-6 flex justify-between items-center">
        <Button variant="outline" onClick={() => router.push('/dashboard/dogs')}>
          <FiArrowLeft className="mr-2" />
          Back to Dogs
        </Button>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push(`/dashboard/dogs/${dogId}/edit`)}>
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
        {/* Left Column - Dog Profile */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={dog.image} 
                    alt={dog.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="p-6 md:w-2/3">
                <div className="flex justify-between items-start mb-2">
                  <h1 className="text-2xl font-bold">{dog.name}</h1>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    dog.status === 'Active' ? 'bg-green-100 text-green-800' :
                    dog.status === 'Breeding' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {dog.status}
                  </span>
                </div>
                
                <p className="text-lg text-gray-700 mb-4">{dog.breed}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className="font-medium">{dog.gender}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Age</p>
                    <p className="font-medium">{dog.age}</p>
                  </div>
                  
                  {dog.birthdate && (
                    <div>
                      <p className="text-sm text-gray-500">Birth Date</p>
                      <p className="font-medium">{dog.birthdate}</p>
                    </div>
                  )}
                  
                  <div>
                    <p className="text-sm text-gray-500">Health Status</p>
                    <p className={`font-medium ${
                      dog.healthStatus === 'Excellent' ? 'text-green-600' :
                      dog.healthStatus === 'Good' ? 'text-blue-600' :
                      dog.healthStatus === 'Fair' ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {dog.healthStatus}
                    </p>
                  </div>
                  
                  {dog.titles && (
                    <div>
                      <p className="text-sm text-gray-500">Titles</p>
                      <p className="font-medium text-blue-600">{dog.titles}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
          
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Details</h2>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dog.registrationNumber && (
                  <div>
                    <p className="text-sm text-gray-500">Registration Number</p>
                    <p className="font-medium">{dog.registrationNumber}</p>
                  </div>
                )}
                
                {dog.microchip && (
                  <div>
                    <p className="text-sm text-gray-500">Microchip</p>
                    <p className="font-medium">{dog.microchip}</p>
                  </div>
                )}
                
                {dog.color && (
                  <div>
                    <p className="text-sm text-gray-500">Color</p>
                    <p className="font-medium">{dog.color}</p>
                  </div>
                )}
                
                {dog.weight && (
                  <div>
                    <p className="text-sm text-gray-500">Weight</p>
                    <p className="font-medium">{dog.weight}</p>
                  </div>
                )}
                
                {dog.height && (
                  <div>
                    <p className="text-sm text-gray-500">Height</p>
                    <p className="font-medium">{dog.height}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Pedigree Information */}
          {(dog.sire?.name || dog.dam?.name) && (
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">Pedigree</h2>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {dog.sire?.name && (
                    <div className="flex items-start gap-3">
                      <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
                        <img 
                          src={dog.sire.image} 
                          alt={dog.sire.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Sire (Father)</p>
                        <p className="font-medium">{dog.sire.name}</p>
                        {dog.sire.titles && (
                          <p className="text-sm text-blue-600">{dog.sire.titles}</p>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {dog.dam?.name && (
                    <div className="flex items-start gap-3">
                      <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
                        <img 
                          src={dog.dam.image} 
                          alt={dog.dam.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Dam (Mother)</p>
                        <p className="font-medium">{dog.dam.name}</p>
                        {dog.dam.titles && (
                          <p className="text-sm text-blue-600">{dog.dam.titles}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Right Column - Health Records and Achievements */}
        <div className="space-y-6">
          {/* Health Records */}
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Health Records</h2>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => router.push('/dashboard/health')}
              >
                <FiHeart className="mr-2" size={14} />
                View All
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              {dogHealthRecords.length === 0 ? (
                <div className="p-6 text-center">
                  <p className="text-gray-500">No health records found</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {dogHealthRecords.slice(0, 3).map(record => (
                    <div key={record.id} className="p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-medium">{record.type}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          record.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          record.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {record.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-1">{record.description}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <FiCalendar className="mr-1" size={12} />
                        {record.date}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Achievements */}
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Achievements</h2>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => router.push('/dashboard/achievements')}
              >
                <FiAward className="mr-2" size={14} />
                View All
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              {dogAchievements.length === 0 ? (
                <div className="p-6 text-center">
                  <p className="text-gray-500">No achievements found</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {dogAchievements.slice(0, 3).map(achievement => (
                    <div key={achievement.id} className="p-4 hover:bg-gray-50">
                      <h3 className="font-medium mb-1">{achievement.title}</h3>
                      <p className="text-sm text-gray-500 mb-1">{achievement.event}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <FiCalendar className="mr-1" size={12} />
                        {achievement.date}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
} 