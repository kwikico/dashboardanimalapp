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
  markings: string;
  weight: string;
  status: 'Available' | 'Reserved' | 'Sold' | 'Keeping';
  notes: string;
};

export default function AddLitterPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    sireId: '',
    damId: '',
    litterName: '',
    birthDate: '',
    totalPuppies: '',
    maleCount: '',
    femaleCount: '',
    notes: '',
    breedingMethod: 'Natural',
    location: '',
    whelper: '',
    status: 'Active',
  });
  
  // Puppies state
  const [puppies, setPuppies] = useState<PuppyData[]>([
    {
      id: 1,
      name: '',
      gender: 'Male',
      color: '',
      markings: '',
      weight: '',
      status: 'Available',
      notes: '',
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
        markings: '',
        weight: '',
        status: 'Available',
        notes: '',
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
          litterName: formData.litterName,
          sire: selectedSire.name,
          dam: selectedDam.name,
          birthDate: formData.birthDate,
          totalPuppies: parseInt(formData.totalPuppies),
          maleCount: parseInt(formData.maleCount),
          femaleCount: parseInt(formData.femaleCount),
          notes: formData.notes,
          breedingMethod: formData.breedingMethod,
          location: formData.location,
          whelper: formData.whelper,
          status: formData.status,
          puppies: puppies,
        };
        
        // In a real app, you would update the state through an API
        console.log('New litter added:', newLitter);
      }
      
      setIsSubmitting(false);
      router.push('/dashboard/breeding');
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
                      Birth Date <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <FiCalendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Total Puppies <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="totalPuppies"
                      value={formData.totalPuppies}
                      onChange={handleInputChange}
                      required
                      min="1"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Breeding Method
                    </label>
                    <select
                      name="breedingMethod"
                      value={formData.breedingMethod}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Natural">Natural</option>
                      <option value="Artificial Insemination">Artificial Insemination</option>
                      <option value="Surgical Implant">Surgical Implant</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Male Puppies
                    </label>
                    <input
                      type="number"
                      name="maleCount"
                      value={formData.maleCount}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Female Puppies
                    </label>
                    <input
                      type="number"
                      name="femaleCount"
                      value={formData.femaleCount}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Whelping Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="e.g. Home, Kennel, Vet Clinic"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Whelper/Assistant
                    </label>
                    <input
                      type="text"
                      name="whelper"
                      value={formData.whelper}
                      onChange={handleInputChange}
                      placeholder="e.g. Self, Vet, Assistant Name"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Active">Active</option>
                      <option value="Completed">Completed</option>
                      <option value="Planned">Planned</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Additional details about the litter"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* Puppies Section */}
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Puppies</h2>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={addPuppy}
                  >
                    <FiPlus className="mr-2" />
                    Add Puppy
                  </Button>
                </div>
                
                {puppies.map((puppy, index) => (
                  <div 
                    key={puppy.id} 
                    className={`p-4 border border-gray-200 rounded-lg mb-4 ${index % 2 === 0 ? 'bg-gray-50' : ''}`}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium">Puppy #{index + 1}</h3>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => removePuppy(puppy.id)}
                        disabled={puppies.length === 1}
                        className="text-red-500 hover:bg-red-50"
                      >
                        <FiMinus className="mr-1" />
                        Remove
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Name/ID
                        </label>
                        <input
                          type="text"
                          value={puppy.name}
                          onChange={(e) => handlePuppyChange(puppy.id, 'name', e.target.value)}
                          placeholder="Puppy name or ID"
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
                          placeholder="e.g. Black, Brown, etc."
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Markings
                        </label>
                        <input
                          type="text"
                          value={puppy.markings}
                          onChange={(e) => handlePuppyChange(puppy.id, 'markings', e.target.value)}
                          placeholder="e.g. White chest, etc."
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Birth Weight
                        </label>
                        <input
                          type="text"
                          value={puppy.weight}
                          onChange={(e) => handlePuppyChange(puppy.id, 'weight', e.target.value)}
                          placeholder="e.g. 350g"
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Status
                        </label>
                        <select
                          value={puppy.status}
                          onChange={(e) => handlePuppyChange(puppy.id, 'status', e.target.value as 'Available' | 'Reserved' | 'Sold' | 'Keeping')}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="Available">Available</option>
                          <option value="Reserved">Reserved</option>
                          <option value="Sold">Sold</option>
                          <option value="Keeping">Keeping</option>
                        </select>
                      </div>
                      
                      <div className="md:col-span-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Notes
                        </label>
                        <textarea
                          value={puppy.notes}
                          onChange={(e) => handlePuppyChange(puppy.id, 'notes', e.target.value)}
                          rows={2}
                          placeholder="Additional details about this puppy"
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column - Actions */}
          <div className="space-y-6">
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
                    onClick={() => router.push('/dashboard/breeding')}
                  >
                    Cancel
                    <FiX className="ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Tips</h2>
                
                <div className="text-sm text-gray-600 space-y-2">
                  <p>• Record each puppy's details as soon as possible after birth</p>
                  <p>• Take photos of each puppy to help with identification</p>
                  <p>• Track weight gain regularly during the first few weeks</p>
                  <p>• Update puppy status as reservations or sales occur</p>
                  <p>• Keep detailed notes on development milestones</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </DashboardLayout>
  );
} 