import React from 'react';
import Link from 'next/link';
import { Litter } from '../../types';
import { Card, CardContent, CardFooter } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { FiCalendar } from 'react-icons/fi';

interface LitterCardProps {
  litter: Litter;
}

export const LitterCard: React.FC<LitterCardProps> = ({ litter }) => {
  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'success';
      case 'planned':
        return 'info';
      case 'completed':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <Link href={`/dashboard/litters/${litter.id}`}>
      <Card hoverable className="h-full">
        {litter.images && litter.images.length > 0 ? (
          <div className="relative h-48 overflow-hidden rounded-t-xl">
            <img
              src={litter.images[0]}
              alt={`${litter.litterName || 'Litter'}`}
              className="object-cover w-full h-full"
            />
            <div className="absolute top-2 right-2">
              <Badge variant={getStatusVariant(litter.status)}>{litter.status}</Badge>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-48 bg-gray-100 rounded-t-xl">
            <Badge variant={getStatusVariant(litter.status)}>{litter.status}</Badge>
          </div>
        )}
        <CardContent>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {litter.litterName || `${litter.sire.name} x ${litter.dam.name}`}
          </h3>
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <FiCalendar className="mr-2 text-gray-400" size={14} />
            <span>Whelping Date: {litter.whelpingDate}</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center space-x-2">
              <div className="flex-shrink-0 w-10 h-10 overflow-hidden rounded-full">
                <img
                  src={litter.sire.image}
                  alt={litter.sire.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <p className="text-xs text-gray-500">Sire</p>
                <p className="text-sm font-medium">{litter.sire.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex-shrink-0 w-10 h-10 overflow-hidden rounded-full">
                <img
                  src={litter.dam.image}
                  alt={litter.dam.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <p className="text-xs text-gray-500">Dam</p>
                <p className="text-sm font-medium">{litter.dam.name}</p>
              </div>
            </div>
          </div>
        </CardContent>
        {(litter.totalPuppies !== null && litter.availablePuppies !== null) && (
          <CardFooter className="flex justify-between text-sm">
            <span>Total: {litter.totalPuppies} puppies</span>
            <span>Available: {litter.availablePuppies}</span>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
};