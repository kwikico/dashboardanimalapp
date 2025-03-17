'use client';

import React, { useState } from 'react';
import LineageTree from '@/components/LineageTree';
import { lineageDogs } from '@/data/lineageData';
import { FaSearch } from 'react-icons/fa';

export default function LineagePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDog, setSelectedDog] = useState<number | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredDogs = lineageDogs.filter(dog => 
    dog.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dog.breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Dog Lineage Tree 🐕</h1>
        <p className="text-gray-600">
          Explore your dogs' ancestry and relationships with this interactive lineage tree.
        </p>
      </div>

      <div className="mb-6 flex items-center">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search by dog name or breed..."
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Lineage Visualization</h2>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              Expand All
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition">
              Collapse All
            </button>
          </div>
        </div>
        
        <div className="h-[600px] w-full border border-gray-200 rounded-lg overflow-hidden">
          <LineageTree 
            dogs={filteredDogs} 
            selectedDog={selectedDog}
            setSelectedDog={setSelectedDog}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Legend</h2>
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
              <span>Male Dogs 🐕‍🦺</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-pink-500 rounded-full mr-2"></div>
              <span>Female Dogs 🐩</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full mr-2 border-2 border-yellow-500"></div>
              <span>Champion Dogs ✨</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-0.5 bg-blue-500 mr-2"></div>
              <span>Paternal Line</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-0.5 bg-pink-500 mr-2"></div>
              <span>Maternal Line</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Tips</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Click on a dog to view more details 🔍</li>
            <li>Use the search bar to find specific dogs 🔎</li>
            <li>Hover over a dog to see a preview of their information ℹ️</li>
            <li>Use the mouse wheel to zoom in and out 🔍</li>
            <li>Click and drag to pan around the tree 🖱️</li>
            <li>Use the zoom controls in the bottom right corner ⚙️</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 