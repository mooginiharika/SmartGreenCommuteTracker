export interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  totalCO2Saved: number;
  streak: number;
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
}

export interface CommuteEntry {
  id: string;
  date: string;
  transportType: TransportType;
  distance: number;
  co2Saved: number;
  duration?: number;
}

export type TransportType = 'walking' | 'biking' | 'public_transit' | 'carpool' | 'electric_vehicle';

export interface LeaderboardEntry {
  id: string;
  name: string;
  department: string;
  totalCO2Saved: number;
  rank: number;
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  image?: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
  type: 'achievement' | 'milestone' | 'general';
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: string;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  totalCO2Saved: number;
  image: string;
}

export interface UserProfile extends User {
  bio: string;
  phone: string;
  college: string;
  joinDate: string;
  followers: string[];
  following: string[];
  profileImage: string;
  emailVerified: boolean;
}

export interface AnalyticsData {
  date: string;
  commutes: CommuteEntry[];
  totalCO2Saved: number;
  totalDistance: number;
  averageTime: number;
}

export interface EnvironmentalFact {
  id: string;
  title: string;
  description: string;
  icon: string;
}