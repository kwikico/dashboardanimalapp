'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { FiEdit2, FiTrash2, FiArrowLeft, FiCalendar, FiUser, FiMapPin, FiPlus } from 'react-icons/fi';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { healthRecords, dogs } from '@/data/mockData';
import { HealthRecord } from '@/types';

export default function HealthRecordDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const recordId = Number(params.id);
  
  const [record, setRecord] = useState<HealthRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedDog, setRelatedDog] = useState<any>(null);
  
  useEffect(() => {
    // In a real app, you would fetch this data from an API
    const foundRecord = healthRecords.find(r => r.id === recordId);
    
    if (foundRecord) {
      setRecord(foundRecord);
      
      // Find the related dog
      const dog = dogs.find(d => d.name === foundRecord.dogName);
      if (dog) {
        setRelatedDog(dog);
      }
    }
    
    setLoading(false);
  }, [recordId]);
  
  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Loading...</p>
        </div>
      </DashboardLayout>
    );
  }
  
  if (!record) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-gray-500 mb-4">Health record not found</p>
          <Button variant="outline" onClick={() => router.push('/dashboard/health')}>
            <FiArrowLeft className="mr-2" />
            Back to Health Records
          </Button>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout>
      <div className="mb-6 flex justify-between items-center">
        <Button variant="outline" onClick={() => router.push('/dashboard/health')}>
          <FiArrowLeft className="mr-2" />
          Back to Health Records
        </Button>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push(`/dashboard/health/${recordId}/edit`)}>
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
        {/* Left Column - Health Record Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">{record.type}</h1>
                <span className={`text-sm px-3 py-1 rounded-full ${
                  record.status === 'Completed' ? 'bg-green-100 text-green-800' :
                  record.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {record.status}
                </span>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">{record.description}</h2>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <FiCalendar className="mr-2" size={16} />
                  <span>{record.date}</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Provider</p>
                    <p className="font-medium">{record.provider}</p>
                  </div>
                  
                  {record.notes && (
                    <div className="md:col-span-2">
                      <p className="text-sm text-gray-500">Notes</p>
                      <p className="font-medium">{record.notes}</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Recommendations based on record type */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-800 mb-2">Recommendations</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  {record.type === 'Vaccination' && (
                    <>
                      <li>• Next vaccination due in 12 months</li>
                      <li>• Keep vaccination certificate in a safe place</li>
                      <li>• Monitor for any adverse reactions in the next 24-48 hours</li>
                    </>
                  )}
                  
                  {record.type === 'Check-up' && (
                    <>
                      <li>• Schedule next check-up in 6-12 months</li>
                      <li>• Follow any dietary recommendations</li>
                      <li>• Maintain regular exercise routine</li>
                    </>
                  )}
                  
                  {record.type === 'Test' && (
                    <>
                      <li>• Discuss test results with your veterinarian</li>
                      <li>• Follow up with any additional testing if recommended</li>
                      <li>• Keep a copy of test results for future reference</li>
                    </>
                  )}
                  
                  {record.type === 'Medication' && (
                    <>
                      <li>• Follow prescribed dosage and schedule</li>
                      <li>• Complete full course of medication</li>
                      <li>• Monitor for side effects and report to veterinarian</li>
                    </>
                  )}
                  
                  {record.type === 'Surgery' && (
                    <>
                      <li>• Follow post-operative care instructions</li>
                      <li>• Keep surgical site clean and dry</li>
                      <li>• Restrict activity as recommended</li>
                      <li>• Attend follow-up appointments</li>
                    </>
                  )}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right Column - Dog Info and Related Records */}
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
          
          {/* Other Health Records for this Dog */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Other Health Records</h2>
            </CardHeader>
            <CardContent className="p-0">
              {healthRecords
                .filter(r => r.dogName === record.dogName && r.id !== record.id)
                .slice(0, 3)
                .map(otherRecord => (
                  <div 
                    key={otherRecord.id} 
                    className="p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 cursor-pointer"
                    onClick={() => router.push(`/dashboard/health/${otherRecord.id}`)}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-medium">{otherRecord.type}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        otherRecord.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        otherRecord.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {otherRecord.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-1">{otherRecord.description}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <FiCalendar className="mr-1" size={12} />
                      {otherRecord.date}
                    </div>
                  </div>
                ))}
              
              {healthRecords.filter(r => r.dogName === record.dogName && r.id !== record.id).length === 0 && (
                <div className="p-6 text-center text-gray-500">
                  No other health records for this dog
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Quick Actions</h2>
            </CardHeader>
            <CardContent className="p-4 space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => router.push('/dashboard/health/add')}
              >
                <FiPlus className="mr-2" />
                Add New Health Record
              </Button>
              
              {record.status === 'Scheduled' && (
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-green-600"
                >
                  <FiCalendar className="mr-2" />
                  Mark as Completed
                </Button>
              )}
              
              {record.status === 'Pending' && (
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-blue-600"
                >
                  <FiCalendar className="mr-2" />
                  Schedule Appointment
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
} 