export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: 'single-origin' | 'espresso' | 'decaf' | 'cold-brew' | 'pastries';
  price: number;
  rating: number;
  reviewsCount: number;
  roastLevel: 'Light' | 'Medium-Light' | 'Medium' | 'Medium-Dark' | 'Dark';
  notes: string[];
  origin: string;
  elevation: string;
  process: string;
  description: string;
  imageBg: string;
  image?: string;
  accentColor: string;
  badge?: string;
  isBestSeller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  grind: 'Whole Bean' | 'French Press' | 'Drip / Filter' | 'Espresso';
  subscriptionFrequency?: 'once' | 'every-2-weeks' | 'monthly';
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  location: string;
  comment: string;
  favoriteBean: string;
  rating: number;
  avatarUrl: string;
}

export interface ProcessStep {
  number: number;
  title: string;
  subtitle: string;
  description: string;
  location: string;
  icon: string;
  detailStats: string;
}

export interface QuizState {
  brewMethod: string;
  flavorPreference: string;
  roastPreference: string;
}
