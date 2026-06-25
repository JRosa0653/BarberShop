export type Language = 'en' | 'es';

export interface Service {
  id: string;
  name: { en: string; es: string };
  category: string;
  price: number;
  duration: number; // in minutes
  description: { en: string; es: string };
  isPopular?: boolean;
}

export interface Barber {
  id: string;
  name: string;
  role: { en: string; es: string };
  rating: number;
  image: string;
  specialties: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  beforeImage?: string; // for before-and-after
  estimatedPrice: number;
  estimatedDuration: number;
  description?: { en: string; es: string };
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: { en: string; es: string };
  date: string;
  avatar: string;
  source: 'google' | 'facebook' | 'direct';
}

export interface Appointment {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  services: string[]; // service IDs
  barberId: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  totalPrice: number;
  totalDuration: number;
  notes?: string;
  createdAt: string;
}

export interface SEOConfig {
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  keywords: string;
  favicon?: string;
  localSchema: {
    name: string;
    address: string;
    telephone: string;
    priceRange: string;
  };
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  subject?: string;
  message: string;
  createdAt: string;
  status: 'unread' | 'read';
}

export interface CustomContentItem {
  id: string;
  type: 'image' | 'video' | 'text';
  mediaUrl?: string;
  titleEn?: string;
  titleEs?: string;
  descEn?: string;
  descEs?: string;
}

export interface CustomSection {
  id: string;
  titleEn: string;
  titleEs: string;
  subtitleEn?: string;
  subtitleEs?: string;
  items: CustomContentItem[];
  order: number;
}


