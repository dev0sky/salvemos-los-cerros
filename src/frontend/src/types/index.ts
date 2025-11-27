// Project types
export interface Project {
  id: string;
  title: string;
  description: string;
  content?: string; // Markdown content
  location: string;
  latitude?: number;
  longitude?: number;
  status: 'active' | 'completed' | 'planned' | 'paused';
  progress: number;
  startDate: string; // DateTime
  endDate?: string; // DateTime
  image?: string;
  budgetRequested?: number;
  budgetRaised?: number;
  budgetProgress?: number;
  objectives?: string[];
  achievements?: string[];
  teamMembers?: string[]; // IDs of team members
  partners?: string[];
  gallery_images?: string[];
  tags?: string[];
  created_at?: string;
  updated_at?: string;
}

// Event types
export interface Event {
  id: string;
  title: string;
  description: string;
  content?: string; // Markdown content
  startDatetime: string; // DateTime with timezone
  endDatetime?: string; // DateTime with timezone
  timezone?: string;
  location: string;
  locationDetails?: string;
  latitude?: number;
  longitude?: number;
  category: 'cleanup' | 'reforestation' | 'workshop' | 'conference' | 'fundraising' | 'other';
  attendees: number;
  maxAttendees?: number;
  image?: string;
  requirements?: string[];
  organizers?: string[]; // IDs of team members
  contactInfo?: string;
  registrationLink?: string;
  gallery_images?: string[];
  tags?: string[];
  relatedProject?: string;
  isFull?: boolean;
  created_at?: string;
  updated_at?: string;
}

// News types
export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string; // Markdown content
  category: 'conservation' | 'events' | 'education' | 'community' | 'achievements';
  date: string; // DateTime
  author?: TeamMemberData;
  authorId?: string;
  image?: string;
  featured?: boolean;
  tags?: string[];
  relatedProject?: string;
  relatedEvent?: string;
  galleryImages?: string[];
  externalLinks?: string[];
  views?: number;
  created_at?: string;
  updated_at?: string;
}

// Team types
export interface TeamMemberData {
  id: string;
  name: string;
  role: string;
  bio: string;
  email?: string;
  phone?: string;
  image?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  website?: string;
  contributions?: string;
  specialties?: string[];
  joined_date?: string;
  active?: boolean;
  order?: number;
}

// Comment types
export interface Comment {
  id: string;
  project?: string;
  event?: string;
  news_article?: string;
  author_name: string;
  author_email: string;
  content: string;
  parent?: string;
  approved: boolean;
  created_at: string;
  replies?: Comment[];
}

// Donation types
export interface Donation {
  id: string;
  project: string;
  donorName: string;
  donorEmail?: string;
  amount: number;
  message?: string;
  anonymous: boolean;
  created_at: string;
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

// Cerro types
export interface Cerro {
  id: string;
  name: string;
  altitude: number;
  location: {
    municipality: string;
    lat: number;
    lng: number;
  };
  geology: {
    rock: string;
    age: string;
    notes: string;
  };
  ecological_value: {
    flora: string[];
    fauna: string[];
    cultural: string[];
  };
  materials: {
    minerals: string;
  };
  legal_status: {
    proposed_protection: string;
    status: string;
  };
  threats: string[];
  image: string;
}

// Statistics types
export interface Statistics {
  stats: {
    total_events: number;
    total_volunteers: number;
    trees_planted: number;
    protected_cerros: number;
  };
  monthly_activity: {
    month: string;
    eventos: number;
    voluntarios: number;
  }[];
  project_distribution: {
    id: string;
    label: string;
    value: number;
    color: string;
  }[];
}

// Subscriber types
export interface Subscriber {
  id: string;
  email?: string;
  phone?: string;
  receiveNews: boolean;
  receiveEvents: boolean;
  receiveProjects: boolean;
  createdAt: string;
}

// Volunteer types
export interface Volunteer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  interests: string;
  availability: string;
  projects?: string[];
  events?: string[];
  createdAt: string;
}

// FAQ types
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
  created_at?: string;
}

// Contribution Item types
export interface ContributionItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  link?: string;
  order: number;
  created_at?: string;
}