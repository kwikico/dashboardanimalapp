'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiSave, FiX, FiCalendar, FiPlus, FiMinus } from 'react-icons/fi';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { dogs } from '@/data/mockData';

type PuppyData = {
  id: number;
  name: string;
  gender: 'Male' | 'Female';
  color: string;
  status: 'Available' | 'Reserved' | 'Placed';
};

export default function AddLitterPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    sireId: '',
    damId: '',
    litterName: '',
    whelpingDate: '',
    status: 'Planned',
    totalPuppies: '',
    availablePuppies: '',
    notes: '',
  });
  
  // Puppies state
  const [puppies, setPuppies] = useState<PuppyData[]>([
    {
      id: 1,
      name: '',
      gender: 'Male',
      color: '',
      status: 'Available',
    }
  ]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle puppy data changes
  const handlePuppyChange = (id: number, field: keyof PuppyData, value: string) => {
    setPuppies(prev => 
      prev.map(puppy => 
        puppy.id === id ? { ...puppy, [field]: value } : puppy
      )
    );
  };
  
  // Add a new puppy
  const addPuppy = () => {
    const newId = Math.max(...puppies.map(p => p.id)) + 1;
    setPuppies(prev => [
      ...prev, 
      {
        id: newId,
        name: '',
        gender: 'Male',
        color: '',
        status: 'Available',
      }
    ]);
  };
  
  // Remove a puppy
  const removePuppy = (id: number) => {
    if (puppies.length > 1) {
      setPuppies(prev => prev.filter(puppy => puppy.id !== id));
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // In a real app, you would send this data to an API
    // For now, we'll simulate adding to the mock data
    setTimeout(() => {
      // Find the selected sire and dam
      const selectedSire = dogs.find(dog => dog.id === parseInt(formData.sireId));
      const selectedDam = dogs.find(dog => dog.id === parseInt(formData.damId));
      
      if (selectedSire && selectedDam) {
        // Create a new litter record
        const newLitter = {
          id: Math.floor(Math.random() * 1000) + 1,
          sire: {
            name: selectedSire.name,
            breed: selectedSire.breed,
            image: selectedSire.image,
          },
          dam: {
            name: selectedDam.name,
            breed: selectedDam.breed,
            image: selectedDam.image,
          },
          whelpingDate: formData.whelpingDate,
          status: formData.status as 'Planned' | 'Active' | 'Completed',
          totalPuppies: formData.totalPuppies ? parseInt(formData.totalPuppies) : null,
          availablePuppies: formData.availablePuppies ? parseInt(formData.availablePuppies) : null,
          litterName: formData.litterName,
          puppies: puppies.map(puppy => ({
            ...puppy,
            id: Math.floor(Math.random() * 1000) + 1,
          })),
          images: [],
        };
        
        // In a real app, you would update the state through an API
        console.log('New litter added:', newLitter);
      }
      
      setIsSubmitting(false);
      router.push('/dashboard/litters');
    }, 1000);
  };

  // Get eligible sires (male dogs)
  const eligibleSires = dogs.filter(dog => dog.gender === 'Male');
  
  // Get eligible dams (female dogs)
  const eligibleDams = dogs.filter(dog => dog.gender === 'Female');

  return (
    <DashboardLayout>
      <PageHeader 
        title="Add New Litter" 
        description="Record a new litter of puppies"
      />
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Litter Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sire <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="sireId"
                      value={formData.sireId}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select a sire</option>
                      {eligibleSires.map(dog => (
                        <option key={dog.id} value={dog.id}>
                          {dog.name} ({dog.breed})
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Dam <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="damId"
                      value={formData.damId}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select a dam</option>
                      {eligibleDams.map(dog => (
                        <option key={dog.id} value={dog.id}>
                          {dog.name} ({dog.breed})
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Litter Name/Identifier <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="litterName"
                      value={formData.litterName}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. Spring 2023 Litter"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Whelping Date <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="whelpingDate"
                        value={formData.whelpingDate}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <FiCalendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Planned">Planned</option>
                      <option value="Active">Active</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Total Puppies
                    </label>
                    <input
                      type="number"
                      name="totalPuppies"
                      value={formData.totalPuppies}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Available Puppies
                    </label>
                    <input
                      type="number"
                      name="availablePuppies"
                      value={formData.availablePuppies}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Notes
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Any additional information about this litter..."
                    ></textarea>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Puppies</h2>
                  <Button 
                    type="button" 
                    onClick={addPuppy}
                    variant="outline"
                    size="sm"
                  >
                    <FiPlus className="mr-1" size={14} />
                    Add Puppy
                  </Button>
                </div>
                
                {puppies.map((puppy, index) => (
                  <div key={puppy.id} className="border border-gray-200 rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium">Puppy #{index + 1}</h3>
                      <button
                        type="button"
                        onClick={() => removePuppy(puppy.id)}
                        className="text-gray-400 hover:text-red-500"
                        disabled={puppies.length === 1}
                      >
                        <FiX size={18} />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Name
                        </label>
                        <input
                          type="text"
                          value={puppy.name}
                          onChange={(e) => handlePuppyChange(puppy.id, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Gender
                        </label>
                        <select
                          value={puppy.gender}
                          onChange={(e) => handlePuppyChange(puppy.id, 'gender', e.target.value as 'Male' | 'Female')}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Color
                        </label>
                        <input
                          type="text"
                          value={puppy.color}
                          onChange={(e) => handlePuppyChange(puppy.id, 'color', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Status
                        </label>
                        <select
                          value={puppy.status}
                          onChange={(e) => handlePuppyChange(puppy.id, 'status', e.target.value as 'Available' | 'Reserved' | 'Placed')}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="Available">Available</option>
                          <option value="Reserved">Reserved</option>
                          <option value="Placed">Placed</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column - Actions */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Actions</h2>
                
                <div className="space-y-3">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Saving...' : 'Save Litter'}
                    {!isSubmitting && <FiSave className="ml-2" />}
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => router.push('/dashboard/litters')}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </DashboardLayout>
  );
} 