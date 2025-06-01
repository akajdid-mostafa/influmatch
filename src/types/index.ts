// User Types
export type UserRole = 'brand' | 'influencer' | 'admin';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
}

export interface InfluencerProfile extends User {
  bio?: string;
  niche?: string[];
  location?: string;
  followers?: {
    instagram?: number;
    tiktok?: number;
    youtube?: number;
    other?: Record<string, number>;
  };
  engagementRate?: number;
  socialLinks?: {
    instagram?: string;
    tiktok?: string;
    youtube?: string;
    website?: string;
    other?: Record<string, string>;
  };
  previousWork?: CampaignReference[];
  averageRating?: number;
}

export interface BrandProfile extends User {
  description?: string;
  industry?: string[];
  website?: string;
  logo?: string;
  previousCampaigns?: CampaignReference[];
}

// Authentication Types
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: any) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

// Campaign Types
export interface Campaign {
  id: string;
  title: string;
  description: string;
  brand: BrandProfile;
  budget: {
    min: number;
    max: number;
    currency: string;
  };
  requirements: {
    niches: string[];
    minFollowers: number;
    platforms: string[];
    locations?: string[];
  };
  timeline: {
    startDate: string;
    endDate: string;
    submissionDeadline?: string;
  };
  status: 'draft' | 'open' | 'in-progress' | 'completed' | 'cancelled' | 'pending-approval';
  applications?: CampaignApplication[];
  collaborators?: InfluencerProfile[];
  content?: {
    description: string;
    guidelines: string;
    examples?: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface CampaignReference {
  id: string;
  title: string;
  imageUrl?: string;
  brand?: {
    id: number;
    name: string;
    logo?: string;
  };
  date: string;
  performance?: {
    views?: number;
    engagement?: number;
    clicks?: number;
  };
}

export interface CampaignApplication {
  id: string;
  campaign: {
    id: string;
    title: string;
  };
  influencer: InfluencerProfile;
  proposal: string;
  rate: number;
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
  submittedAt: string;
}

// Messaging Types
export interface Message {
  id: string;
  conversationId: string;
  senderId: number;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: User[];
  lastMessage?: Message;
  title?: string;
  unreadCount: number;
  updatedAt: string;
}

// Notification Types
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  createdAt: string;
  read: boolean;
  link?: string;
  relatedTo?: {
    type: 'campaign' | 'message' | 'user' | 'system';
    id: string;
  };
}

// Statistics and Analytics
export interface InfluencerStats {
  profileViews: number;
  campaignsCompleted: number;
  averageRating: number;
  totalEarnings: number;
  engagementRate: number;
  growth: {
    followers: number;
    engagement: number;
    earnings: number;
  };
  conversionRate?: number;
}

export interface BrandStats {
  campaignsLaunched: number;
  influencersCollaborated: number;
  totalSpent: number;
  averageEngagement: number;
  roi: number;
  reach: number;
  conversionRate?: number;
}

// Admin Types
export interface SystemStats {
  users: {
    total: number;
    brands: number;
    influencers: number;
    admins: number;
    newToday: number;
    growth: number;
  };
  campaigns: {
    total: number;
    active: number;
    completed: number;
    totalValue: number;
  };
  messages: {
    total: number;
    today: number;
  };
  earnings: {
    total: number;
    thisMonth: number;
    growth: number;
  };
}