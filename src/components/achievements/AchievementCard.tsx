import React from 'react';
import { Achievement } from '../../types';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { FiMapPin, FiCalendar, FiUser } from 'react-icons/fi';

interface AchievementCardProps {
  achievement: Achievement;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  const getCategoryVariant = (category: string) => {
    switch (category.toLowerCase()) {
      case 'show':
        return 'info';
      case 'agility':
        return 'success';
      case 'obedience':
        return 'warning';
      case 'certification':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <Card className="h-full">
      <CardContent>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 overflow-hidden rounded-full">
            <img
              src={achievement.dogImage}
              alt={achievement.dogName}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{achievement.title}</h3>
              <Badge variant={getCategoryVariant(achievement.category)}>{achievement.category}</Badge>
            </div>
            <h4 className="mb-2 text-base font-medium text-gray-800">{achievement.event}</h4>
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex items-center">
                <FiCalendar className="mr-2 text-gray-400" size={14} />
                <span>{achievement.date}</span>
              </div>
              <div className="flex items-center">
                <FiMapPin className="mr-2 text-gray-400" size={14} />
                <span>{achievement.location}</span>
              </div>
              {achievement.judge && (
                <div className="flex items-center">
                  <FiUser className="mr-2 text-gray-400" size={14} />
                  <span>Judge: {achievement.judge}</span>
                </div>
              )}
            </div>
            {achievement.photos && achievement.photos.length > 0 && (
              <div className="mt-3 space-x-2">
                {achievement.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`${achievement.title} photo ${index + 1}`}
                    className="inline-block w-16 h-16 rounded-md object-cover"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};