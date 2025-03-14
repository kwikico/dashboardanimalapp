import React from 'react';
import { HealthRecord } from '../../types';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { FiCalendar, FiUser, FiFileText } from 'react-icons/fi';

interface HealthRecordCardProps {
  record: HealthRecord;
}

export const HealthRecordCard: React.FC<HealthRecordCardProps> = ({ record }) => {
  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'success';
      case 'scheduled':
        return 'info';
      case 'overdue':
        return 'danger';
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
              src={record.dogImage}
              alt={record.dogName}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{record.dogName}</h3>
              <Badge variant={getStatusVariant(record.status)}>{record.status}</Badge>
            </div>
            <h4 className="mb-2 text-base font-medium text-gray-800">{record.type}: {record.description}</h4>
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex items-center">
                <FiCalendar className="mr-2 text-gray-400" size={14} />
                <span>{record.date}</span>
              </div>
              {record.provider && (
                <div className="flex items-center">
                  <FiUser className="mr-2 text-gray-400" size={14} />
                  <span>{record.provider}</span>
                </div>
              )}
              {record.notes && (
                <div className="flex items-center">
                  <FiFileText className="mr-2 text-gray-400" size={14} />
                  <span>{record.notes}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};