export type PageId = 'home' | 'about' | 'products' | 'blog' | 'contact' | 'policies';

export type PolicyTab = 'privacy' | 'refund' | 'shipping';

export interface Product {
  id: string;
  name: string;
  category: 'leather-seats' | 'floor-mats' | 'screens-cams' | 'ambient-lights' | 'car-audio' | 'steering-accessories' | 'dashcams-tpms' | 'seat-covers' | 'wheels-exterior' | string;
  categoryName: string;
  price: number;
  originalPrice?: number;
  isBestSeller?: boolean;
  isNew?: boolean;
  isSale?: boolean;
  rating: number;
  reviewCount: number;
  primaryImage: string;
  secondaryImage: string;
  description: string;
  features: string[];
  vehicleTypes: ('sedan' | 'suv' | 'mpv' | 'luxury')[];
  materials: string[];
  colors: { name: string; hex: string }[];
  warrantyMonths: number;
  inStock: boolean;
  installationTimeHours: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedVehicleType?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  experience: string;
  image: string;
  bio: string;
  specialty: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  tags: string[];
  views: number;
}

export interface Testimonial {
  id: string;
  customerName: string;
  carModel: string;
  serviceUsed: string;
  rating: number;
  comment: string;
  avatar: string;
  date: string;
  verified: boolean;
}

export interface ContactFormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  carModel: string;
  serviceInterest: string;
  message: string;
}

export interface FilterState {
  category: string;
  priceRange: string;
  vehicleType: string;
  material: string;
  searchQuery: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'discount';
}
