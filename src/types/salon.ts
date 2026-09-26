export type ServiceCategory = 'HAIRCUT' | 'STYLING' | 'HAIR CARE' | 'COLOUR' | 'KIDS';

export interface SalonService {
  id: string;
  category: ServiceCategory;
  name: string;
  shortDescription: string;
  priceNote: string;
  durationMinutes: number;
  imageUrl: string;
}

export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Appointment {
  id: string;
  referenceCode: string;
  serviceId: string;
  serviceName: string;
  category: ServiceCategory;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientNotes?: string;
  status: AppointmentStatus;
  createdAt: string;
}

export interface SalonReview {
  id: string;
  author: string;
  quote: string;
  rating: number;
  date: string;
  isGoogleVerified: boolean;
}

export interface DayHours {
  day: string;
  hours: string;
  isClosed: boolean;
  openTime?: string;
  closeTime?: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'All' | 'Salon' | 'Hair' | 'Styling' | 'Team';
  imageUrl: string;
  aspect?: 'portrait' | 'landscape' | 'square';
}

export interface BusinessInfo {
  name: string;
  street: string;
  postalCode: string;
  city: string;
  country: string;
  phone: string;
  phoneDisplay: string;
  rating: number;
  reviewCount: number;
}
