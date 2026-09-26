import {
  BusinessInfo,
  DayHours,
  GalleryPhoto,
  SalonReview,
  SalonService,
  Appointment,
} from '../types/salon.ts';

// Verified image assets generated for DER SALON
export const IMAGES = {
  hero: '/src/assets/images/hero_salon_frankfurt_1790425601819.jpg',
  haircut: '/src/assets/images/service_precision_haircut_1790425617133.jpg',
  colour: '/src/assets/images/service_hair_colour_1790425627684.jpg',
  editorial: '/src/assets/images/editorial_salon_portrait_1790425638351.jpg',
  washLounge: '/src/assets/images/salon_interior_wash_1790425651524.jpg',
};

export const INITIAL_BUSINESS_INFO: BusinessInfo = {
  name: 'DER SALON',
  street: 'Oppenheimer Landstraße 63',
  postalCode: '60596',
  city: 'Frankfurt-Süd',
  country: 'Germany',
  phone: '+4969627424',
  phoneDisplay: '+49 69 627424',
  rating: 4.8,
  reviewCount: 63,
};

export const INITIAL_SERVICES: SalonService[] = [
  {
    id: 'srv-haircut',
    category: 'HAIRCUT',
    name: 'Precision Haircut',
    shortDescription: 'Precision cuts and personal styling.',
    priceNote: 'Price on consultation',
    durationMinutes: 45,
    imageUrl: IMAGES.haircut,
  },
  {
    id: 'srv-styling',
    category: 'STYLING',
    name: 'Editorial Styling',
    shortDescription: 'Blow-dry and finishing.',
    priceNote: 'Price on consultation',
    durationMinutes: 45,
    imageUrl: IMAGES.editorial,
  },
  {
    id: 'srv-haircare',
    category: 'HAIR CARE',
    name: 'Deep Treatment',
    shortDescription: 'Moisturising and treatment options.',
    priceNote: 'Price on consultation',
    durationMinutes: 30,
    imageUrl: IMAGES.washLounge,
  },
  {
    id: 'srv-colour',
    category: 'COLOUR',
    name: 'Colour & Balayage',
    shortDescription: 'Colour services and consultation.',
    priceNote: 'Price on consultation',
    durationMinutes: 90,
    imageUrl: IMAGES.colour,
  },
  {
    id: 'srv-kids',
    category: 'KIDS',
    name: 'Junior Haircut',
    shortDescription: 'Haircuts for younger guests.',
    priceNote: 'Price on consultation',
    durationMinutes: 30,
    imageUrl: IMAGES.haircut,
  },
];

export const INITIAL_HOURS: DayHours[] = [
  { day: 'Monday', hours: 'Closed', isClosed: true },
  { day: 'Tuesday', hours: '10:00–19:00', isClosed: false, openTime: '10:00', closeTime: '19:00' },
  { day: 'Wednesday', hours: '10:00–19:00', isClosed: false, openTime: '10:00', closeTime: '19:00' },
  { day: 'Thursday', hours: '10:00–19:00', isClosed: false, openTime: '10:00', closeTime: '19:00' },
  { day: 'Friday', hours: '10:00–19:00', isClosed: false, openTime: '10:00', closeTime: '19:00' },
  { day: 'Saturday', hours: '10:00–15:00', isClosed: false, openTime: '10:00', closeTime: '15:00' },
  { day: 'Sunday', hours: 'Closed', isClosed: true },
];

export const INITIAL_REVIEWS: SalonReview[] = [
  {
    id: 'rev-1',
    author: 'Yavor M',
    quote: 'Great place with great kind people.',
    rating: 5.0,
    date: 'Recent Google Review',
    isGoogleVerified: true,
  },
  {
    id: 'rev-2',
    author: 'Verified Client',
    quote: 'Always very happy with the haircuts.',
    rating: 5.0,
    date: 'Recent Google Review',
    isGoogleVerified: true,
  },
  {
    id: 'rev-3',
    author: 'Verified Client',
    quote: 'He gave me a wonderful blow dry & moisturising mask.',
    rating: 5.0,
    date: 'Recent Google Review',
    isGoogleVerified: true,
  },
];

export const INITIAL_GALLERY: GalleryPhoto[] = [
  {
    id: 'gal-1',
    title: 'Minimalist Styling Stations',
    category: 'Salon',
    imageUrl: IMAGES.hero,
    aspect: 'landscape',
  },
  {
    id: 'gal-2',
    title: 'Precision Scissor Craft',
    category: 'Hair',
    imageUrl: IMAGES.haircut,
    aspect: 'portrait',
  },
  {
    id: 'gal-3',
    title: 'Dimensional Balayage Glow',
    category: 'Styling',
    imageUrl: IMAGES.colour,
    aspect: 'landscape',
  },
  {
    id: 'gal-4',
    title: 'Natural Texture & Finish',
    category: 'Hair',
    imageUrl: IMAGES.editorial,
    aspect: 'portrait',
  },
  {
    id: 'gal-5',
    title: 'Reclining Wash Basin Lounge',
    category: 'Salon',
    imageUrl: IMAGES.washLounge,
    aspect: 'landscape',
  },
  {
    id: 'gal-6',
    title: 'Master Colorist at Work',
    category: 'Team',
    imageUrl: IMAGES.haircut,
    aspect: 'portrait',
  },
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-001',
    referenceCode: 'DS-9214',
    serviceId: 'srv-haircut',
    serviceName: 'Precision Haircut',
    category: 'HAIRCUT',
    date: '2026-09-30',
    time: '11:00',
    clientName: 'Alexander Weber',
    clientEmail: 'alex.weber@example.de',
    clientPhone: '+49 171 498213',
    clientNotes: 'First time visiting the salon.',
    status: 'confirmed',
    createdAt: '2026-09-25T14:30:00Z',
  },
  {
    id: 'apt-002',
    referenceCode: 'DS-8432',
    serviceId: 'srv-colour',
    serviceName: 'Colour & Balayage',
    category: 'COLOUR',
    date: '2026-10-01',
    time: '14:30',
    clientName: 'Clara Schmidt',
    clientEmail: 'clara.s@example.de',
    clientPhone: '+49 176 832941',
    clientNotes: 'Gentle gloss and toner refresh.',
    status: 'confirmed',
    createdAt: '2026-09-26T09:12:00Z',
  },
];

export const AMENITIES_LIST = [
  {
    id: 'wheelchair',
    label: 'Wheelchair accessible entrance',
    tag: 'Accessible',
  },
  {
    id: 'restroom',
    label: 'Private restroom',
    tag: 'Comfort',
  },
  {
    id: 'cards',
    label: 'Credit & Debit cards accepted',
    tag: 'Payments',
  },
  {
    id: 'nfc',
    label: 'NFC & Mobile payments',
    tag: 'Contactless',
  },
  {
    id: 'kids',
    label: 'Good for kids & families',
    tag: 'Family',
  },
  {
    id: 'appointments',
    label: 'Appointments recommended',
    tag: 'Booking',
  },
];
