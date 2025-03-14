import { Dog, HealthRecord, Achievement, Litter } from '../types';

// Mock Dogs Data
export const dogs: Dog[] = [
  {
    id: 1,
    name: 'Max',
    breed: 'German Shepherd',
    gender: 'Male',
    age: '3 years',
    birthdate: 'March 15, 2020',
    registrationNumber: 'AKC123456789',
    color: 'Black and Tan',
    microchip: '985121054896532',
    image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80',
    status: 'Active',
    titles: 'CH',
    healthStatus: 'Excellent',
    weight: '85 lbs',
    height: '26 inches',
    sire: {
      name: 'Apollo',
      titles: 'GCH',
      image: 'https://images.unsplash.com/photo-1568572933382-74d440642117?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80',
    },
    dam: {
      name: 'Athena',
      titles: 'CH',
      image: 'https://images.unsplash.com/photo-1553882809-a4f57e59501d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80',
    }
  },
  {
    id: 2,
    name: 'Luna',
    breed: 'Golden Retriever',
    gender: 'Female',
    age: '4 years',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80',
    status: 'Active',
    titles: 'GCH, BIS',
    healthStatus: 'Excellent'
  },
  {
    id: 3,
    name: 'Rocky',
    breed: 'Rottweiler',
    gender: 'Male',
    age: '2 years',
    image: 'https://images.unsplash.com/photo-1567752881298-894bb81f9379?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80',
    status: 'Active',
    titles: '',
    healthStatus: 'Good'
  },
  {
    id: 4,
    name: 'Bella',
    breed: 'Labrador Retriever',
    gender: 'Female',
    age: '5 years',
    image: 'https://images.unsplash.com/photo-1591769225440-811ad7d6eab7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80',
    status: 'Breeding',
    titles: 'CH',
    healthStatus: 'Good'
  },
  {
    id: 5,
    name: 'Charlie',
    breed: 'Beagle',
    gender: 'Male',
    age: '1 year',
    image: 'https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80',
    status: 'Active',
    titles: '',
    healthStatus: 'Excellent'
  },
  {
    id: 6,
    name: 'Daisy',
    breed: 'Border Collie',
    gender: 'Female',
    age: '3 years',
    image: 'https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80',
    status: 'Active',
    titles: 'CH, AG1',
    healthStatus: 'Good'
  }
];

// Mock Health Records Data
export const healthRecords: HealthRecord[] = [
  {
    id: 1,
    dogName: 'Max',
    dogImage: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80',
    date: 'February 10, 2023',
    type: 'Vaccination',
    description: 'DHPP Booster',
    provider: 'Valley View Veterinary Clinic',
    notes: 'Next due in 1 year',
    status: 'Completed'
  },
  {
    id: 2,
    dogName: 'Luna',
    dogImage: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80',
    date: 'January 15, 2023',
    type: 'Check-up',
    description: 'Annual Health Examination',
    provider: 'Valley View Veterinary Clinic',
    notes: 'All parameters normal',
    status: 'Completed'
  },
  {
    id: 3,
    dogName: 'Rocky',
    dogImage: 'https://images.unsplash.com/photo-1567752881298-894bb81f9379?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80',
    date: 'March 15, 2023',
    type: 'Vaccination',
    description: 'Rabies Vaccination',
    provider: 'Valley View Veterinary Clinic',
    notes: 'Next due in 3 years',
    status: 'Scheduled'
  },
  {
    id: 4,
    dogName: 'Bella',
    dogImage: 'https://images.unsplash.com/photo-1591769225440-811ad7d6eab7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80',
    date: 'March 20, 2023',
    type: 'Test',
    description: 'Hip and Elbow Evaluation',
    provider: 'Animal Diagnostic Center',
    notes: 'Pre-breeding assessment',
    status: 'Scheduled'
  }
];

// Mock Achievements Data
export const achievements: Achievement[] = [
  {
    id: 1,
    dogName: 'Luna',
    dogImage: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80',
    date: 'May 15, 2022',
    title: 'Best of Breed',
    event: 'National Dog Show 2022',
    location: 'Philadelphia, PA',
    photos: ['https://images.unsplash.com/photo-1551730459-92db2a308d6a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80'],
    judge: 'Sarah Johnson',
    category: 'Show'
  },
  {
    id: 2,
    dogName: 'Max',
    dogImage: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80',
    date: 'June 10, 2022',
    title: 'First Place',
    event: 'Regional Agility Championship',
    location: 'Boston, MA',
    photos: ['https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80'],
    judge: 'Michael Thompson',
    category: 'Agility'
  },
  {
    id: 3,
    dogName: 'Luna',
    dogImage: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80',
    date: 'March 8, 2022',
    title: 'Winners Dog',
    event: 'Regional Championship',
    location: 'Boston, MA',
    photos: ['https://images.unsplash.com/photo-1576201836106-db1758fd1c97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80'],
    judge: 'Robert Davis',
    category: 'Show'
  },
  {
    id: 4,
    dogName: 'Daisy',
    dogImage: 'https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80',
    date: 'April 23, 2022',
    title: 'Canine Good Citizen',
    event: 'AKC Certification Program',
    location: 'New York, NY',
    photos: [],
    judge: 'Emily Wilson',
    category: 'Certification'
  }
];

// Mock Litters Data
export const litters: Litter[] = [
  {
    id: 1,
    sire: {
      name: 'Max',
      breed: 'German Shepherd',
      image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80',
    },
    dam: {
      name: 'Bella',
      breed: 'German Shepherd',
      image: 'https://images.unsplash.com/photo-1591769225440-811ad7d6eab7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80',
    },
    whelpingDate: 'April 10, 2022',
    status: 'Completed',
    totalPuppies: 7,
    availablePuppies: 0,
    litterName: 'B Litter',
    puppies: [
      { id: 101, name: 'Baron', gender: 'Male', color: 'Black & Tan', status: 'Placed' },
      { id: 102, name: 'Bella', gender: 'Female', color: 'Black', status: 'Placed' },
      { id: 103, name: 'Bruno', gender: 'Male', color: 'Sable', status: 'Placed' },
      { id: 104, name: 'Bianca', gender: 'Female', color: 'Black & Tan', status: 'Placed' },
      { id: 105, name: 'Boomer', gender: 'Male', color: 'Black', status: 'Placed' },
      { id: 106, name: 'Bonnie', gender: 'Female', color: 'Sable', status: 'Placed' },
      { id: 107, name: 'Buddy', gender: 'Male', color: 'Black & Tan', status: 'Placed' },
    ],
    images: ['https://images.unsplash.com/photo-1548199569-3e1c6aa8f469?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80']
  },
  {
    id: 2,
    sire: {
      name: 'Rocky',
      breed: 'Rottweiler',
      image: 'https://images.unsplash.com/photo-1567752881298-894bb81f9379?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80',
    },
    dam: {
      name: 'Luna',
      breed: 'Rottweiler',
      image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80',
    },
    whelpingDate: 'June 15, 2023',
    status: 'Planned',
    totalPuppies: null,
    availablePuppies: null,
    litterName: 'A Litter',
    puppies: [],
    images: []
  },
  {
    id: 3,
    sire: {
      name: 'Charlie',
      breed: 'Beagle',
      image: 'https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80',
    },
    dam: {
      name: 'Daisy',
      breed: 'Beagle',
      image: 'https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80',
    },
    whelpingDate: 'May 5, 2023',
    status: 'Active',
    totalPuppies: 5,
    availablePuppies: 3,
    litterName: 'C Litter',
    puppies: [
      { id: 201, name: 'Cooper', gender: 'Male', color: 'Tri-color', status: 'Available' },
      { id: 202, name: 'Chloe', gender: 'Female', color: 'Tri-color', status: 'Available' },
      { id: 203, name: 'Chase', gender: 'Male', color: 'Tri-color', status: 'Reserved' },
      { id: 204, name: 'Coco', gender: 'Female', color: 'Tri-color', status: 'Available' },
      { id: 205, name: 'Casper', gender: 'Male', color: 'Tri-color', status: 'Reserved' },
    ],
    images: ['https://images.unsplash.com/photo-1605897472359-5416d908fdd9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80']
  }
];