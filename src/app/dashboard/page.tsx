'use client';

import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { FiPlus, FiBell, FiUser, FiArrowUp, FiArrowDown, FiMinus } from 'react-icons/fi';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { dogs, healthRecords, achievements, litters } from '@/data/mockData';

export default function Dashboard() {
  // Count statistics
  const stats = [
    {
      title: 'Total Dogs',
      value: dogs.length.toString(),
      change: `+${dogs.filter(d => parseInt(d.age.split(' ')[0]) < 1).length} this month`,
      trend: 'up' as const,
      emoji: '🐕'
    },
    {
      title: 'Upcoming Health Checks',
      value: healthRecords.filter(r => r.status === 'Scheduled').length.toString(),
      change: `Next in ${Math.floor(Math.random() * 7) + 1} days`,
      trend: 'neutral' as const,
      emoji: '🩺'
    },
    {
      title: 'Active Litters',
      value: litters.filter(l => l.status === 'Active').length.toString(),
      change: `${litters.reduce((acc, l) => acc + (l.totalPuppies || 0), 0)} puppies total`,
      trend: 'up' as const,
      emoji: '🐾'
    },
    {
      title: 'Recent Awards',
      value: achievements.length.toString(),
      change: `+${achievements.filter(a => a.date.includes('2022')).length} this year`,
      trend: 'up' as const,
      emoji: '🏆'
    },
  ];

  // Recent activity from various data sources
  const recentActivity = [
    {
      title: `${healthRecords[0].dogName} received vaccination`,
      description: healthRecords[0].description,
      time: "Today, 10:32 AM",
      type: 'health' as const,
      emoji: '💉'
    },
    {
      title: `${litters[2].dam.name}'s litter has a new puppy profile`,
      description: `Added puppy #${litters[2].puppies.length}: ${litters[2].puppies[0].gender}, ${litters[2].puppies[0].color}`,
      time: "Yesterday, 3:15 PM",
      type: 'litter' as const,
      emoji: '🐶'
    },
    {
      title: `${achievements[0].dogName} won ${achievements[0].title}`,
      description: achievements[0].event,
      time: "3 days ago",
      type: 'achievement' as const,
      emoji: '🥇'
    },
    {
      title: `${healthRecords[1].dogName}'s health check completed`,
      description: healthRecords[1].notes || "All parameters normal",
      time: "5 days ago",
      type: 'health' as const,
      emoji: '✅'
    },
  ];

  // Upcoming events
  const upcomingEvents = [
    {
      title: `${dogs[0].name} - Vet Appointment`,
      date: "Tomorrow, 2:00 PM",
      emoji: '🩺'
    },
    {
      title: "Regional Dog Show",
      date: "March 15, 2023",
      emoji: '🎪'
    },
    {
      title: `${dogs[3].name} - Puppies Due`,
      date: "March 28, 2023",
      emoji: '🐾'
    },
  ];
  
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">👋 Welcome, Sarah!</h2>
        <p className="text-gray-500">Here's what's happening with your kennel today.</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard 
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            trend={stat.trend}
            emoji={stat.emoji}
          />
        ))}
      </div>
      
      {/* Recent Activity and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900">📋 Recent Activity</h3>
              <Button variant="ghost" size="sm">View All</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <ActivityItem 
                    key={index}
                    title={activity.title}
                    description={activity.description}
                    time={activity.time}
                    type={activity.type}
                    emoji={activity.emoji}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-bold text-gray-900">⚡ Quick Actions</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/dashboard/dogs/add">
                <Button fullWidth icon={<FiPlus />}>🐕 Add New Dog</Button>
              </Link>
              
              <Link href="/dashboard/health/add">
                <Button fullWidth variant="secondary" icon={<FiPlus />}>❤️ Record Health Check</Button>
              </Link>
              
              <Link href="/dashboard/achievements/add">
                <Button fullWidth variant="secondary" icon={<FiPlus />}>🏆 Log Achievement</Button>
              </Link>
              
              <Link href="/dashboard/litters/add">
                <Button fullWidth variant="secondary" icon={<FiPlus />}>🐾 Add New Litter</Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <h3 className="text-lg font-bold text-gray-900">📅 Upcoming Events</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingEvents.map((event, index) => (
                <EventItem 
                  key={index}
                  title={event.title}
                  date={event.date}
                  emoji={event.emoji}
                />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

// Component for statistics cards
function StatCard({ title, value, change, trend, emoji }: {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  emoji?: string;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-sm font-medium text-gray-500 flex items-center">
          {emoji && <span className="mr-2">{emoji}</span>}
          {title}
        </h3>
        <div className="mt-2 flex items-baseline">
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          <div className="ml-2 flex items-center text-sm">
            {trend === 'up' && <FiArrowUp className="text-green-500 mr-1" size={14} />}
            {trend === 'down' && <FiArrowDown className="text-red-500 mr-1" size={14} />}
            {trend === 'neutral' && <FiMinus className="text-gray-500 mr-1" size={14} />}
            <span className={`${
              trend === 'up' ? 'text-green-600' : 
              trend === 'down' ? 'text-red-600' : 
              'text-gray-500'
            }`}>
              {change}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Component for activity items
function ActivityItem({ title, description, time, type, emoji }: {
  title: string;
  description: string;
  time: string;
  type: 'health' | 'litter' | 'achievement' | 'general';
  emoji?: string;
}) {
  const getBadgeVariant = () => {
    switch (type) {
      case 'health': return 'success';
      case 'litter': return 'info';
      case 'achievement': return 'warning';
      default: return 'default';
    }
  };

  return (
    <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
      <Badge variant={getBadgeVariant()} className="mt-1">
        {emoji || type.charAt(0).toUpperCase()}
      </Badge>
      <div className="flex-1">
        <h4 className="text-sm font-medium text-gray-900">{title}</h4>
        <p className="text-sm text-gray-500">{description}</p>
        <span className="text-xs text-gray-400">{time}</span>
      </div>
    </div>
  );
}

// Component for event items
function EventItem({ title, date, emoji }: { title: string; date: string; emoji?: string }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
      <div className="flex items-center">
        {emoji && <span className="mr-2 text-lg">{emoji}</span>}
        <div>
          <h4 className="text-sm font-medium text-gray-900">{title}</h4>
          <p className="text-xs text-gray-500">{date}</p>
        </div>
      </div>
      <Button variant="outline" size="sm">View</Button>
    </div>
  );
}