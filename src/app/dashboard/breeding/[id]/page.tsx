'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { FiEdit2, FiTrash2, FiArrowLeft, FiCalendar, FiUsers, FiPlusCircle, FiDownload, FiPrinter } from 'react-icons/fi';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

// Mock litters data (same as in the breeding page)
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
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee',
    breedingMethod: 'Natural',
    location: 'Home',
    whelper: 'Self',
    notes: 'Healthy litter with no complications during birth. All puppies nursing well.'
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
    image: 'https://images.unsplash.com/photo-1548658146-f142deadf8f7',
    breedingMethod: 'Natural',
    location: 'Home',
    whelper: 'Self',
    notes: 'All puppies have been placed in loving homes. Follow-up scheduled for 6 months.'
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
    image: 'https://images.unsplash.com/photo-1601979031925-424e53b6caaa',
    breedingMethod: 'Natural',
    location: 'Home',
    whelper: 'Vet Assistant',
    notes: 'One puppy required supplemental feeding for the first week but is now thriving.'
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
    image: 'https://images.unsplash.com/photo-1529429617124-95b109e86bb8',
    breedingMethod: 'Artificial Insemination',
    location: 'Vet Clinic',
    whelper: 'Veterinarian',
    notes: 'C-section delivery. All puppies and dam recovering well.'
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
    image: 'https://images.unsplash.com/photo-1591160690555-5debfba289f0',
    breedingMethod: 'Natural',
    location: 'Home',
    whelper: 'Self',
    notes: "Breeding planned for early March. Dam's health check scheduled for February."
  }
];

// Mock puppies data
const puppies = [
  {
    id: 1,
    litterId: 1,
    name: 'Blue',
    gender: 'Male',
    color: 'Black',
    markings: 'White chest',
    weight: '350g',
    status: 'Reserved',
    notes: 'Largest puppy in the litter. Very active.',
    image: 'https://images.unsplash.com/photo-1591160690555-5debfba289f0'
  },
  {
    id: 2,
    litterId: 1,
    name: 'Red',
    gender: 'Male',
    color: 'Brown',
    markings: 'White paws',
    weight: '320g',
    status: 'Available',
    notes: 'Medium energy level. Good temperament.',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee'
  },
  {
    id: 3,
    litterId: 1,
    name: 'Green',
    gender: 'Male',
    color: 'Black',
    markings: 'None',
    weight: '330g',
    status: 'Available',
    notes: 'Quiet and calm. Good with handling.',
    image: 'https://images.unsplash.com/photo-1548658146-f142deadf8f7'
  },
  {
    id: 4,
    litterId: 1,
    name: 'Yellow',
    gender: 'Male',
    color: 'Golden',
    markings: 'White blaze',
    weight: '310g',
    status: 'Available',
    notes: 'Very social. First to open eyes.',
    image: 'https://images.unsplash.com/photo-1601979031925-424e53b6caaa'
  },
  {
    id: 5,
    litterId: 1,
    name: 'Pink',
    gender: 'Female',
    color: 'Black and Tan',
    markings: 'Tan points',
    weight: '300g',
    status: 'Reserved',
    notes: 'Sweet temperament. Loves to cuddle.',
    image: 'https://images.unsplash.com/photo-1529429617124-95b109e86bb8'
  },
  {
    id: 6,
    litterId: 1,
    name: 'Purple',
    gender: 'Female',
    color: 'Brown',
    markings: 'White chest and paws',
    weight: '290g',
    status: 'Sold',
    notes: 'Runt of the litter but thriving. Very determined.',
    image: 'https://images.unsplash.com/photo-1591160690555-5debfba289f0'
  }
];

// Mock growth records
const growthRecords = [
  {
    date: '2023-04-15',
    puppyId: 1,
    weight: '350g',
    notes: 'Birth weight'
  },
  {
    date: '2023-04-22',
    puppyId: 1,
    weight: '520g',
    notes: 'Week 1'
  },
  {
    date: '2023-04-29',
    puppyId: 1,
    weight: '780g',
    notes: 'Week 2'
  },
  {
    date: '2023-05-06',
    puppyId: 1,
    weight: '1.1kg',
    notes: 'Week 3'
  },
  {
    date: '2023-05-13',
    puppyId: 1,
    weight: '1.5kg',
    notes: 'Week 4'
  }
];

export default function LitterDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const litterId = Number(params.id);
  
  const [litter, setLitter] = useState<any | null>(null);
  const [litterPuppies, setLitterPuppies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('puppies');
  
  useEffect(() => {
    // In a real app, you would fetch this data from an API
    const foundLitter = litters.find(l => l.id === litterId);
    
    if (foundLitter) {
      setLitter(foundLitter);
      
      // Find puppies for this litter
      const foundPuppies = puppies.filter(p => p.litterId === litterId);
      setLitterPuppies(foundPuppies);
    }
    
    setLoading(false);
  }, [litterId]);
  
  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Loading...</p>
        </div>
      </DashboardLayout>
    );
  }
  
  if (!litter) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-gray-500 mb-4">Litter not found</p>
          <Button variant="outline" onClick={() => router.push('/dashboard/breeding')}>
            <FiArrowLeft className="mr-2" />
            Back to Breeding
          </Button>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout>
      <div className="mb-6 flex justify-between items-center">
        <Button variant="outline" onClick={() => router.push('/dashboard/breeding')}>
          <FiArrowLeft className="mr-2" />
          Back to Breeding
        </Button>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push(`/dashboard/breeding/${litterId}/edit`)}>
            <FiEdit2 className="mr-2" />
            Edit
          </Button>
          <Button variant="outline" className="text-red-600 hover:bg-red-50">
            <FiTrash2 className="mr-2" />
            Delete
          </Button>
        </div>
      </div>
      
      {/* Litter Header */}
      <Card className="mb-6 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3 h-64 md:h-auto">
            <img 
              src={litter.image} 
              alt={litter.litterName} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-6 flex-grow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold">{litter.litterName}</h1>
                <p className="text-gray-500">
                  {litter.sire} × {litter.dam}
                </p>
              </div>
              
              <span className={`text-sm px-3 py-1 rounded-full ${
                litter.status === 'Active' ? 'bg-green-100 text-green-800' :
                litter.status === 'Planned' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {litter.status}
              </span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-500">Birth Date</p>
                <p className="font-medium">
                  {litter.status === 'Planned' ? 'Expected: ' : ''}
                  {litter.birthDate}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Total Puppies</p>
                <p className="font-medium">
                  {litter.status === 'Planned' ? 'TBD' : litter.totalPuppies}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Males / Females</p>
                <p className="font-medium">
                  {litter.status === 'Planned' ? 'TBD' : `${litter.maleCount} / ${litter.femaleCount}`}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Breeding Method</p>
                <p className="font-medium">{litter.breedingMethod}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Whelping Location</p>
                <p className="font-medium">{litter.location}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Whelper/Assistant</p>
                <p className="font-medium">{litter.whelper}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Available Puppies</p>
                <p className="font-medium">
                  {litter.status === 'Planned' ? 'TBD' : litter.availablePuppies}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Reserved/Sold</p>
                <p className="font-medium">
                  {litter.status === 'Planned' ? 'TBD' : `${litter.reservedPuppies}/${litter.soldPuppies}`}
                </p>
              </div>
            </div>
            
            {litter.notes && (
              <div>
                <p className="text-sm text-gray-500 mb-1">Notes</p>
                <p>{litter.notes}</p>
              </div>
            )}
          </div>
        </div>
      </Card>
      
      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex overflow-x-auto">
          <button
            className={`py-2 px-4 font-medium text-sm border-b-2 ${
              activeTab === 'puppies' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('puppies')}
          >
            Puppies
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm border-b-2 ${
              activeTab === 'growth' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('growth')}
          >
            Growth Records
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm border-b-2 ${
              activeTab === 'medical' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('medical')}
          >
            Medical Records
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm border-b-2 ${
              activeTab === 'buyers' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('buyers')}
          >
            Buyers
          </button>
        </div>
      </div>
      
      {/* Tab Content */}
      <div>
        {activeTab === 'puppies' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Puppies</h2>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => router.push(`/dashboard/breeding/${litterId}/add-puppy`)}
              >
                <FiPlusCircle className="mr-2" />
                Add Puppy
              </Button>
            </div>
            
            {litterPuppies.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-gray-500">No puppies recorded yet</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => router.push(`/dashboard/breeding/${litterId}/add-puppy`)}
                  >
                    <FiPlusCircle className="mr-2" />
                    Add First Puppy
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {litterPuppies.map(puppy => (
                  <PuppyCard 
                    key={puppy.id} 
                    puppy={puppy} 
                    onViewDetails={() => router.push(`/dashboard/breeding/puppies/${puppy.id}`)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'growth' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Growth Records</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <FiPlusCircle className="mr-2" />
                  Add Record
                </Button>
                <Button variant="outline" size="sm">
                  <FiDownload className="mr-2" />
                  Export
                </Button>
              </div>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Puppy</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {growthRecords.map((record, index) => {
                        const puppy = puppies.find(p => p.id === record.puppyId);
                        return (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{puppy?.name || 'Unknown'}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.weight}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{record.notes}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                              <button className="text-red-600 hover:text-red-900">Delete</button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {activeTab === 'medical' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Medical Records</h2>
              <Button variant="outline" size="sm">
                <FiPlusCircle className="mr-2" />
                Add Medical Record
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-gray-500">No medical records found</p>
                <Button variant="outline" className="mt-4">
                  <FiPlusCircle className="mr-2" />
                  Add First Medical Record
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
        
        {activeTab === 'buyers' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Buyers & Reservations</h2>
              <Button variant="outline" size="sm">
                <FiPlusCircle className="mr-2" />
                Add Buyer
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-gray-500">No buyers or reservations recorded</p>
                <Button variant="outline" className="mt-4">
                  <FiPlusCircle className="mr-2" />
                  Add First Buyer
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      
      {/* Quick Actions */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Quick Actions</h2>
          </CardHeader>
          <CardContent className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start">
              <FiPrinter className="mr-2" />
              Print Pedigree
            </Button>
            <Button variant="outline" className="justify-start">
              <FiDownload className="mr-2" />
              Export Litter Data
            </Button>
            <Button variant="outline" className="justify-start">
              <FiUsers className="mr-2" />
              Email Puppy Updates
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

function PuppyCard({ 
  puppy, 
  onViewDetails 
}: { 
  puppy: any;
  onViewDetails: () => void;
}) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-48 overflow-hidden">
        <img 
          src={puppy.image} 
          alt={puppy.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{puppy.name}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${
            puppy.status === 'Available' ? 'bg-green-100 text-green-800' :
            puppy.status === 'Reserved' ? 'bg-blue-100 text-blue-800' :
            puppy.status === 'Sold' ? 'bg-gray-100 text-gray-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
            {puppy.status}
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div>
            <p className="text-xs text-gray-500">Gender</p>
            <p className="text-sm">{puppy.gender}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Color</p>
            <p className="text-sm">{puppy.color}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Markings</p>
            <p className="text-sm">{puppy.markings || 'None'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Birth Weight</p>
            <p className="text-sm">{puppy.weight}</p>
          </div>
        </div>
        
        {puppy.notes && (
          <div className="mb-3">
            <p className="text-xs text-gray-500">Notes</p>
            <p className="text-sm">{puppy.notes}</p>
          </div>
        )}
        
        <Button variant="outline" size="sm" className="w-full" onClick={onViewDetails}>
          View Details
        </Button>
      </CardContent>
    </Card>
  );
} 