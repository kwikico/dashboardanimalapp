'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import Tree from 'react-d3-tree';
import { Dog, HealthRecord, Achievement } from '../types';
import { healthRecords, achievements } from '../data/mockData';
import { FiZoomIn, FiZoomOut, FiRefreshCw } from 'react-icons/fi';
import './LineageTree.css';

// Define the node data structure for the tree
interface TreeNode {
  name: string;
  id: number;
  attributes?: {
    breed: string;
    birthYear?: string;
    gender: string;
    titles?: string;
    traits?: string;
  };
  image?: string;
  children?: TreeNode[];
  nodeSvgShape?: {
    shape: string;
    shapeProps: {
      r: number;
      fill: string;
      stroke: string;
    };
  };
}

interface LineageTreeProps {
  dogs: Dog[];
  selectedDog: number | null;
  setSelectedDog: (id: number | null) => void;
}

const LineageTree: React.FC<LineageTreeProps> = ({ dogs, selectedDog, setSelectedDog }) => {
  const [treeData, setTreeData] = useState<TreeNode[]>([]);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedDogDetails, setSelectedDogDetails] = useState<Dog | null>(null);
  const [selectedDogHealth, setSelectedDogHealth] = useState<HealthRecord[]>([]);
  const [selectedDogAchievements, setSelectedDogAchievements] = useState<Achievement[]>([]);
  const [zoomLevel, setZoomLevel] = useState(0.8);
  const treeContainerRef = useRef<HTMLDivElement>(null);

  // Function to build the tree data
  const buildTreeData = useCallback(() => {
    if (dogs.length === 0) return [];

    // Helper function to recursively build the tree
    const buildTree = (dogId: number | undefined): TreeNode | null => {
      if (!dogId) return null;
      
      const dog = dogs.find(d => d.id === dogId);
      if (!dog) return null;

      const birthYear = dog.birthdate ? new Date(dog.birthdate).getFullYear().toString() : undefined;
      
      const node: TreeNode = {
        name: dog.name,
        id: dog.id,
        attributes: {
          breed: dog.breed,
          birthYear: birthYear,
          gender: dog.gender,
          titles: dog.titles,
          traits: dog.color,
        },
        image: dog.image,
        nodeSvgShape: {
          shape: 'circle',
          shapeProps: {
            r: 15,
            fill: dog.gender === 'Male' ? '#3b82f6' : '#ec4899',
            stroke: dog.titles ? '#fbbf24' : '#6b7280',
          },
        },
        children: [],
      };

      // Find children (dogs where this dog is the sire or dam)
      const children = dogs.filter(d => 
        (d.sire && d.sire.name === dog.name) || 
        (d.dam && d.dam.name === dog.name)
      );

      if (children.length > 0) {
        node.children = children.map(child => buildTree(child.id)).filter(Boolean) as TreeNode[];
      }

      return node;
    };

    // Start with root dogs (those without parents in the dataset)
    const rootDogs = dogs.filter(dog => {
      const hasSireInData = dogs.some(d => d.name === dog.sire?.name);
      const hasDamInData = dogs.some(d => d.name === dog.dam?.name);
      return !hasSireInData && !hasDamInData;
    });

    return rootDogs.map(dog => buildTree(dog.id)).filter(Boolean) as TreeNode[];
  }, [dogs]);

  // Update tree data when dogs change
  useEffect(() => {
    const data = buildTreeData();
    setTreeData(data);
  }, [dogs, buildTreeData]);

  // Set initial translate based on container size
  useEffect(() => {
    if (treeContainerRef.current) {
      const { width, height } = treeContainerRef.current.getBoundingClientRect();
      setTranslate({ x: width / 2, y: height / 5 });
    }
  }, []);

  // Handle node click
  const handleNodeClick = (nodeData: any) => {
    const dogId = nodeData.data.id;
    setSelectedDog(dogId);
    
    const dog = dogs.find(d => d.id === dogId);
    if (dog) {
      setSelectedDogDetails(dog);
      setSelectedDogHealth(healthRecords.filter(record => record.dogName === dog.name));
      setSelectedDogAchievements(achievements.filter(achievement => achievement.dogName === dog.name));
      setDetailsOpen(true);
    }
  };

  // Custom node component
  const renderCustomNodeElement = ({ nodeDatum, toggleNode }: any) => {
    const isSelected = nodeDatum.id === selectedDog;
    
    // Get gender emoji
    const genderEmoji = nodeDatum.attributes?.gender === 'Male' ? '♂️' : 
                        nodeDatum.attributes?.gender === 'Female' ? '♀️' : '🐕';
    
    return (
      <g onClick={() => handleNodeClick(nodeDatum)}>
        {/* Circle for the node */}
        <circle
          r={isSelected ? 20 : 15}
          fill={nodeDatum.nodeSvgShape?.shapeProps.fill || '#3b82f6'}
          stroke={isSelected ? '#2563eb' : nodeDatum.nodeSvgShape?.shapeProps.stroke || '#6b7280'}
          strokeWidth={isSelected ? 3 : 1.5}
        />
        
        {/* Dog name */}
        <text
          fill="white"
          strokeWidth="0.5"
          stroke="white"
          fontSize={10}
          x={0}
          y={0}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {nodeDatum.name.substring(0, 1)}
        </text>
        
        {/* Dog name below the circle */}
        <text
          fill="#374151"
          x={0}
          y={30}
          textAnchor="middle"
          fontSize={12}
          fontWeight="bold"
        >
          {genderEmoji} {nodeDatum.name}
        </text>
        
        {/* Breed below the name */}
        <text
          fill="#6b7280"
          x={0}
          y={45}
          textAnchor="middle"
          fontSize={10}
        >
          🐾 {nodeDatum.attributes?.breed}
        </text>
        
        {/* Birth year */}
        {nodeDatum.attributes?.birthYear && (
          <text
            fill="#6b7280"
            x={0}
            y={60}
            textAnchor="middle"
            fontSize={10}
          >
            📅 {nodeDatum.attributes.birthYear}
          </text>
        )}
        
        {/* Titles if any */}
        {nodeDatum.attributes?.titles && (
          <text
            fill="#6b7280"
            x={0}
            y={75}
            textAnchor="middle"
            fontSize={10}
          >
            🏆 {nodeDatum.attributes.titles}
          </text>
        )}
        
        {/* Traits if any */}
        {nodeDatum.attributes?.traits && (
          <text
            fill="#6b7280"
            x={0}
            y={nodeDatum.attributes?.titles ? 90 : 75}
            textAnchor="middle"
            fontSize={10}
          >
            ⭐ {nodeDatum.attributes.traits}
          </text>
        )}
      </g>
    );
  };

  // Zoom control handlers
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.4));
  };

  const handleResetView = () => {
    if (treeContainerRef.current) {
      const { width, height } = treeContainerRef.current.getBoundingClientRect();
      setTranslate({ x: width / 2, y: height / 5 });
      setZoomLevel(0.8);
    }
  };

  return (
    <div className="relative h-full w-full lineage-tree-container" ref={treeContainerRef}>
      {treeData.length > 0 ? (
        <Tree
          data={treeData[0]}
          orientation="vertical"
          translate={translate}
          renderCustomNodeElement={renderCustomNodeElement}
          pathFunc="straight"
          separation={{ siblings: 2, nonSiblings: 2.5 }}
          zoom={zoomLevel}
          enableLegacyTransitions={true}
          transitionDuration={800}
          pathClassFunc={() => 'custom-path'}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-gray-500">No dogs found to display in the lineage tree.</p>
        </div>
      )}

      {/* Zoom Controls */}
      <div className="zoom-controls">
        <button className="zoom-button" onClick={handleZoomIn} aria-label="Zoom in">
          <FiZoomIn />
        </button>
        <button className="zoom-button" onClick={handleZoomOut} aria-label="Zoom out">
          <FiZoomOut />
        </button>
        <button className="zoom-button" onClick={handleResetView} aria-label="Reset view">
          <FiRefreshCw />
        </button>
      </div>

      {/* Custom CSS for path styling */}
      <style jsx global>{`
        .custom-path {
          stroke-width: 1.5;
        }
        .rd3t-link {
          stroke: #3b82f6;
        }
      `}</style>

      {/* Dog Details Panel */}
      {detailsOpen && selectedDogDetails && (
        <div className="absolute top-0 right-0 w-80 h-full bg-white shadow-lg overflow-y-auto details-panel">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">
                {selectedDogDetails.gender === 'Male' ? '♂️' : '♀️'} {selectedDogDetails.name}
              </h3>
              <button 
                onClick={() => setDetailsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="mb-4">
              <img 
                src={selectedDogDetails.image} 
                alt={selectedDogDetails.name} 
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-700">📋 Basic Information</h4>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="text-sm text-gray-600">Breed:</div>
                  <div className="text-sm font-medium">🐾 {selectedDogDetails.breed}</div>
                  
                  <div className="text-sm text-gray-600">Gender:</div>
                  <div className="text-sm font-medium">
                    {selectedDogDetails.gender === 'Male' ? '♂️ Male' : '♀️ Female'}
                  </div>
                  
                  <div className="text-sm text-gray-600">Age:</div>
                  <div className="text-sm font-medium">🗓️ {selectedDogDetails.age}</div>
                  
                  {selectedDogDetails.birthdate && (
                    <>
                      <div className="text-sm text-gray-600">Birthdate:</div>
                      <div className="text-sm font-medium">📅 {selectedDogDetails.birthdate}</div>
                    </>
                  )}
                  
                  {selectedDogDetails.color && (
                    <>
                      <div className="text-sm text-gray-600">Color:</div>
                      <div className="text-sm font-medium">🎨 {selectedDogDetails.color}</div>
                    </>
                  )}
                  
                  {selectedDogDetails.titles && (
                    <>
                      <div className="text-sm text-gray-600">Titles:</div>
                      <div className="text-sm font-medium">🏆 {selectedDogDetails.titles}</div>
                    </>
                  )}
                  
                  <div className="text-sm text-gray-600">Health Status:</div>
                  <div className="text-sm font-medium">
                    {selectedDogDetails.healthStatus === 'Excellent' ? '💚 ' : 
                     selectedDogDetails.healthStatus === 'Good' ? '💙 ' : 
                     selectedDogDetails.healthStatus === 'Fair' ? '💛 ' : '❤️ '}
                    {selectedDogDetails.healthStatus}
                  </div>
                </div>
              </div>
              
              {/* Health Records Section */}
              {selectedDogHealth.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-700">❤️ Health Records</h4>
                  <div className="mt-2 space-y-2">
                    {selectedDogHealth.map((record, index) => (
                      <div key={index} className="p-2 bg-gray-50 rounded-md">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{record.type}</span>
                          <span className="text-xs text-gray-500">{record.date}</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">
                          {record.status === 'Completed' ? '✅ ' : 
                           record.status === 'Scheduled' ? '📅 ' : '⏳ '}
                          {record.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Achievements Section */}
              {selectedDogAchievements.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-700">🏆 Achievements</h4>
                  <div className="mt-2 space-y-2">
                    {selectedDogAchievements.map((achievement, index) => (
                      <div key={index} className="p-2 bg-gray-50 rounded-md">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">🥇 {achievement.title}</span>
                          <span className="text-xs text-gray-500">{achievement.date}</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">🏅 {achievement.event}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LineageTree; 