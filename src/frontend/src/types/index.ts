// Project types
export interface Project {
  id: string;
  title: string;
  description: string;
  location: string;
  status: 'active' | 'completed' | 'planned';
  progress: number;
  startDate: string;
  image?: string;
}

// Event types
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'cleanup' | 'reforestation' | 'workshop' | 'other';
  attendees: number;
  maxAttendees?: number;
  image?: string;
}

// News types
export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  category: 'conservation' | 'events' | 'education';
  date: string;
  author?: string;
  image?: string;
  featured?: boolean;
}

// Team types
export interface TeamMemberData {
  id: string;
  name: string;
  role: string;
  bio: string;
  email?: string;
  image?: string;
}

// Chart data types
export interface BarChartData {
  [key: string]: string | number;
}

export interface PieChartData {
  id: string;
  label: string;
  value: number;
}

// Gallery types
export interface GalleryImage {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: 'project' | 'event' | 'nature' | 'team';
  date: string;
  photographer?: string;
  tags: string[];
}
