// Dog-related types
export interface Dog {
  id: number;
  name: string;
  breed: string;
  gender: 'Male' | 'Female';
  age: string;
  birthdate?: string;
  registrationNumber?: string;
  color?: string;
  microchip?: string;
  image: string;
  status: 'Active' | 'Breeding' | 'Retired';
  titles?: string;
  healthStatus: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  weight?: string;
  height?: string;
  sire?: DogParent;
  dam?: DogParent;
}

export interface DogParent {
  name: string;
  titles?: string;
  image: string;
  breed?: string;
}

// Health-related types
export interface HealthRecord {
  id: number;
  dogName: string;
  dogImage: string;
  date: string;
  type: 'Vaccination' | 'Check-up' | 'Test' | 'Medication' | 'Surgery';
  description: string;
  provider: string;
  notes?: string;
  status: 'Completed' | 'Scheduled' | 'Pending';
}

// Achievement-related types
export interface Achievement {
  id: number;
  dogName: string;
  dogImage: string;
  date: string;
  title: string;
  event: string;
  location: string;
  photos: string[];
  judge?: string;
  category: 'Show' | 'Agility' | 'Obedience' | 'Rally' | 'Certification';
}

// Litter-related types
export interface Litter {
  id: number;
  sire: DogParent;
  dam: DogParent;
  whelpingDate: string;
  status: 'Planned' | 'Active' | 'Completed';
  totalPuppies: number | null;
  availablePuppies: number | null;
  litterName: string;
  puppies: Puppy[];
  images: string[];
}

export interface Puppy {
  id: number;
  name: string;
  gender: 'Male' | 'Female';
  color: string;
  status: 'Available' | 'Reserved' | 'Placed';
}