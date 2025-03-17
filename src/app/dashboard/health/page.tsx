'use client';

import React, { useState, useMemo } from 'react';
import { FiPlus, FiSearch, FiCalendar } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { healthRecords, dogs } from '@/data/mockData';
import { HealthRecord } from '@/types';

export default function HealthRecordsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  
  // Filter health records based on search term and filters
  const filteredRecords = useMemo(() => {
    return healthRecords.filter(record => {
      // Search filter
      const matchesSearch = 
        searchTerm === '' || 
        record.dogName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.provider.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Status filter
      const matchesStatus = 
        statusFilter === null || 
        record.status === statusFilter;
      
      // Type filter
      const matchesType = 
        typeFilter === null || 
        record.type === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [searchTerm, statusFilter, typeFilter]);

  return (
    <DashboardLayout>
      <PageHeader title="Health Records" description="Manage your dogs' health records" />
      
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <FiSearch size={18} />
            </div>
            <input
              type="text"
              className="w-full py-2 pl-10 pr-4 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search health records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <FilterSelect
              options={[
                { label: 'All Status', value: null },
                { label: 'Completed', value: 'Completed' },
                { label: 'Scheduled', value: 'Scheduled' },
                { label: 'Pending', value: 'Pending' },
              ]}
              value={statusFilter}
              onChange={setStatusFilter}
            />
            
            <FilterSelect
              options={[
                { label: 'All Types', value: null },
                { label: 'Vaccination', value: 'Vaccination' },
                { label: 'Check-up', value: 'Check-up' },
                { label: 'Test', value: 'Test' },
                { label: 'Medication', value: 'Medication' },
                { label: 'Surgery', value: 'Surgery' },
              ]}
              value={typeFilter}
              onChange={setTypeFilter}
            />
          </div>
        </div>
        
        <Button onClick={() => router.push('/dashboard/health/add')}>
          <FiPlus className="mr-2" />
          Add Health Record
        </Button>
      </div>
      
      <div className="space-y-4">
        {filteredRecords.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-500">No health records found</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => router.push('/dashboard/health/add')}
              >
                <FiPlus className="mr-2" />
                Add Your First Health Record
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredRecords.map(record => (
            <HealthRecordCard 
              key={record.id} 
              record={record} 
              onViewDetails={() => router.push(`/dashboard/health/${record.id}`)}
            />
          ))
        )}
      </div>
    </DashboardLayout>
  );
}

type FilterOption = {
  label: string;
  value: string | null;
};

function FilterSelect({ 
  options, 
  value, 
  onChange 
}: { 
  options: FilterOption[];
  value: string | null;
  onChange: (value: string | null) => void;
}) {
  return (
    <select
      className="py-2 px-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      value={value || ''}
      onChange={(e) => onChange(e.target.value === '' ? null : e.target.value)}
    >
      {options.map((option) => (
        <option key={option.label} value={option.value || ''}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

function HealthRecordCard({ 
  record, 
  onViewDetails 
}: { 
  record: HealthRecord;
  onViewDetails: () => void;
}) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="h-16 w-16 rounded-full overflow-hidden flex-shrink-0">
            <img 
              src={record.dogImage} 
              alt={record.dogName} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-grow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{record.dogName}</h3>
                <p className="text-sm text-gray-500">{record.type}</p>
              </div>
              
              <span className={`text-xs px-2 py-1 rounded-full ${
                record.status === 'Completed' ? 'bg-green-100 text-green-800' :
                record.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {record.status}
              </span>
            </div>
            
            <p className="mt-2 text-sm">{record.description}</p>
            
            <div className="mt-3 flex justify-between items-center">
              <div className="flex items-center text-sm text-gray-500">
                <FiCalendar className="mr-1" size={14} />
                {record.date}
              </div>
              
              <Button variant="outline" size="sm" onClick={onViewDetails}>
                View Details
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 