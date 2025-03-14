import React from 'react';
import Link from 'next/link';
import { Dog } from '../../types';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface DogCardProps {
  dog: Dog;
}

export const DogCard: React.FC<DogCardProps> = ({ dog }) => {
  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'success';
      case 'breeding':
        return 'info';
      case 'retired':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <Link href={`/dashboard/dogs/${dog.id}`}>
      <Card hoverable className="h-full">
        <div className="relative h-48 overflow-hidden rounded-t-xl">
          <img
            src={dog.image}
            alt={dog.name}
            className="object-cover w-full h-full"
          />
          {dog.titles && (
            <div className="absolute top-2 right-2">
              <Badge variant="info" size="sm">{dog.titles}</Badge>
            </div>
          )}
        </div>
        <CardContent>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{dog.name}</h3>
            <Badge variant={getStatusVariant(dog.status || '')}>{dog.status}</Badge>
          </div>
          <div className="space-y-1 text-sm text-gray-500">
            <p>{dog.breed}</p>
            <p>{dog.gender} • {dog.age}</p>
            {dog.healthStatus && (
              <p className="flex items-center mt-2">
                <span className={`inline-block w-2 h-2 mr-1 rounded-full ${
                  dog.healthStatus === 'Excellent' 
                    ? 'bg-green-500' 
                    : dog.healthStatus === 'Good' 
                    ? 'bg-yellow-500' 
                    : 'bg-red-500'
                }`}></span>
                {dog.healthStatus}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};