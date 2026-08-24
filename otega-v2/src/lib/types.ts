export interface Evangelist {
  id: string;
  name: string;
  slug: string;
  title: string;
  region: string;
  state: string;
  bio: string;
  photo_url: string | null;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  souls_won: number;
  testimony_count: number;
  featured: boolean;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string | null;
  author: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published';
  views: number;
  created_at: string;
  updated_at: string;
}

export interface Testimony {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  evangelist_id: string | null;
  title: string;
  content: string;
  image_url: string | null;
  approved: boolean;
  featured: boolean;
  created_at: string;
}

export interface PrayerRequest {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  category: string;
  request: string;
  status: 'new' | 'in_progress' | 'answered' | 'archived';
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'archived';
  created_at: string;
}

export interface Photo {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
  status: 'pending' | 'published' | 'rejected';
  views: number;
  created_at: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  video_url: string | null;
  thumbnail_url: string | null;
  source: 'upload' | 'youtube';
  youtube_id: string | null;
  status: 'pending' | 'published' | 'rejected';
  views: number;
  created_at: string;
}

export interface Partner {
  id: string;
  name: string;
  logo_url: string | null;
  website_url: string | null;
  description: string;
  status: 'draft' | 'published';
  order: number;
  created_at: string;
}

export interface Donation {
  id: string;
  donor_name: string;
  donor_email: string | null;
  donor_phone: string | null;
  amount: number;
  currency: string;
  purpose: string;
  payment_method: string;
  tx_ref: string | null;
  status: 'pending' | 'successful' | 'failed';
  created_at: string;
}

export interface AppNotification {
  id: string;
  type: string;
  title: string;
  message: string;
  link: string | null;
  read: boolean;
  created_at: string;
}

export interface SiteSettings {
  id: string;
  org_name: string;
  tagline: string;
  logo_url: string | null;
  hero_video_url: string | null;
  hero_image_url: string | null;
  hero_headline: string;
  hero_subtext: string;
  founder_name: string;
  founder_title: string;
  founder_photo_url: string | null;
  founder_signature_url: string | null;
  founder_quote: string;
  founder_bio: string;
  founder_vision: string;
  founder_mission: string;
  founder_facebook_url: string | null;
  founder_instagram_url: string | null;
  founder_youtube_url: string | null;
  contact_email: string;
  contact_phone: string;
  whatsapp_number: string;
  address: string;
  facebook_url: string | null;
  instagram_url: string | null;
  youtube_url: string | null;
  twitter_url: string | null;
  bank_name: string;
  account_number: string;
  account_name: string;
  flutterwave_public_key: string;
}
