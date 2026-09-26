import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SalonService,
  DayHours,
  SalonReview,
  GalleryPhoto,
  Appointment,
  BusinessInfo,
} from '../types/salon.ts';
import {
  INITIAL_SERVICES,
  INITIAL_HOURS,
  INITIAL_REVIEWS,
  INITIAL_GALLERY,
  INITIAL_APPOINTMENTS,
  INITIAL_BUSINESS_INFO,
} from '../data/salonData.ts';

export type PageType = 'home' | 'services' | 'about' | 'gallery' | 'reviews' | 'contact' | 'admin';

interface SalonContextType {
  currentPage: PageType;
  navigateToPage: (page: PageType) => void;

  services: SalonService[];
  hours: DayHours[];
  reviews: SalonReview[];
  gallery: GalleryPhoto[];
  appointments: Appointment[];
  businessInfo: BusinessInfo;
  
  // Booking modal
  isBookingOpen: boolean;
  selectedServiceId: string | null;
  openBooking: (serviceId?: string) => void;
  closeBooking: () => void;
  addAppointment: (appointment: Omit<Appointment, 'id' | 'referenceCode' | 'createdAt' | 'status'>) => Appointment;
  updateAppointmentStatus: (id: string, status: Appointment['status']) => void;
  deleteAppointment: (id: string) => void;

  // Gallery Lightbox
  activeLightboxIndex: number | null;
  openLightbox: (index: number) => void;
  closeLightbox: () => void;

  // Admin
  isAdminOpen: boolean;
  isAdminLoggedIn: boolean;
  openAdmin: () => void;
  closeAdmin: () => void;
  loginAdmin: (pin: string) => boolean;
  logoutAdmin: () => void;

  // Service management
  addService: (service: Omit<SalonService, 'id'>) => void;
  updateService: (id: string, service: Partial<SalonService>) => void;
  deleteService: (id: string) => void;

  // Hours management
  updateHours: (day: string, hours: string, isClosed: boolean) => void;

  // Reviews management
  addReview: (review: Omit<SalonReview, 'id' | 'date'>) => void;
  deleteReview: (id: string) => void;

  // Gallery management
  addGalleryPhoto: (photo: Omit<GalleryPhoto, 'id'>) => void;
  deleteGalleryPhoto: (id: string) => void;

  // Legal modals
  activeLegalModal: 'impressum' | 'datenschutz' | null;
  openLegalModal: (type: 'impressum' | 'datenschutz') => void;
  closeLegalModal: () => void;

  // Discover modal
  isDiscoverOpen: boolean;
  openDiscover: () => void;
  closeDiscover: () => void;
}

const SalonContext = createContext<SalonContextType | undefined>(undefined);

const STORAGE_KEYS = {
  SERVICES: 'ds_services_v1',
  HOURS: 'ds_hours_v1',
  REVIEWS: 'ds_reviews_v1',
  GALLERY: 'ds_gallery_v1',
  APPOINTMENTS: 'ds_appointments_v1',
  ADMIN_AUTH: 'ds_admin_auth_v1',
};

export const SalonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  const navigateToPage = (page: PageType) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [services, setServices] = useState<SalonService[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SERVICES);
      return saved ? JSON.parse(saved) : INITIAL_SERVICES;
    } catch {
      return INITIAL_SERVICES;
    }
  });

  const [hours, setHours] = useState<DayHours[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.HOURS);
      return saved ? JSON.parse(saved) : INITIAL_HOURS;
    } catch {
      return INITIAL_HOURS;
    }
  });

  const [reviews, setReviews] = useState<SalonReview[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  const [gallery, setGallery] = useState<GalleryPhoto[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.GALLERY);
      return saved ? JSON.parse(saved) : INITIAL_GALLERY;
    } catch {
      return INITIAL_GALLERY;
    }
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
      return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
    } catch {
      return INITIAL_APPOINTMENTS;
    }
  });

  const [businessInfo] = useState<BusinessInfo>(INITIAL_BUSINESS_INFO);

  // Modals & UI States
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return sessionStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  });
  const [activeLegalModal, setActiveLegalModal] = useState<'impressum' | 'datenschutz' | null>(null);
  const [isDiscoverOpen, setIsDiscoverOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [services]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.HOURS, JSON.stringify(hours));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [hours]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [reviews]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(gallery));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [gallery]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [appointments]);

  // Booking handlers
  const openBooking = (serviceId?: string) => {
    setSelectedServiceId(serviceId || null);
    setIsBookingOpen(true);
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
    setSelectedServiceId(null);
  };

  const addAppointment = (data: Omit<Appointment, 'id' | 'referenceCode' | 'createdAt' | 'status'>) => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newAppointment: Appointment = {
      ...data,
      id: `apt-${Date.now()}`,
      referenceCode: `DS-${randomSuffix}`,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };
    setAppointments((prev) => [newAppointment, ...prev]);
    return newAppointment;
  };

  const updateAppointmentStatus = (id: string, status: Appointment['status']) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status } : apt))
    );
  };

  const deleteAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((apt) => apt.id !== id));
  };

  // Lightbox handlers
  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  // Admin handlers
  const openAdmin = () => {
    setIsAdminOpen(true);
    navigateToPage('admin');
  };
  const closeAdmin = () => setIsAdminOpen(false);

  const loginAdmin = (pin: string) => {
    if (pin.trim() === 'salon2026' || pin.trim() === '627424') {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
  };

  // Service management
  const addService = (data: Omit<SalonService, 'id'>) => {
    const newService: SalonService = {
      ...data,
      id: `srv-${Date.now()}`,
    };
    setServices((prev) => [...prev, newService]);
  };

  const updateService = (id: string, updates: Partial<SalonService>) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  // Hours management
  const updateHours = (day: string, newHours: string, isClosed: boolean) => {
    setHours((prev) =>
      prev.map((h) => (h.day === day ? { ...h, hours: newHours, isClosed } : h))
    );
  };

  // Reviews management
  const addReview = (data: Omit<SalonReview, 'id' | 'date'>) => {
    const newReview: SalonReview = {
      ...data,
      id: `rev-${Date.now()}`,
      date: 'Client Verified',
    };
    setReviews((prev) => [newReview, ...prev]);
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  // Gallery management
  const addGalleryPhoto = (data: Omit<GalleryPhoto, 'id'>) => {
    const newPhoto: GalleryPhoto = {
      ...data,
      id: `gal-${Date.now()}`,
    };
    setGallery((prev) => [...prev, newPhoto]);
  };

  const deleteGalleryPhoto = (id: string) => {
    setGallery((prev) => prev.filter((p) => p.id !== id));
  };

  // Legal modals
  const openLegalModal = (type: 'impressum' | 'datenschutz') => setActiveLegalModal(type);
  const closeLegalModal = () => setActiveLegalModal(null);

  // Discover modal
  const openDiscover = () => setIsDiscoverOpen(true);
  const closeDiscover = () => setIsDiscoverOpen(false);

  return (
    <SalonContext.Provider
      value={{
        currentPage,
        navigateToPage,
        services,
        hours,
        reviews,
        gallery,
        appointments,
        businessInfo,
        isBookingOpen,
        selectedServiceId,
        openBooking,
        closeBooking,
        addAppointment,
        updateAppointmentStatus,
        deleteAppointment,
        activeLightboxIndex,
        openLightbox,
        closeLightbox,
        isAdminOpen,
        isAdminLoggedIn,
        openAdmin,
        closeAdmin,
        loginAdmin,
        logoutAdmin,
        addService,
        updateService,
        deleteService,
        updateHours,
        addReview,
        deleteReview,
        addGalleryPhoto,
        deleteGalleryPhoto,
        activeLegalModal,
        openLegalModal,
        closeLegalModal,
        isDiscoverOpen,
        openDiscover,
        closeDiscover,
      }}
    >
      {children}
    </SalonContext.Provider>
  );
};

export const useSalon = () => {
  const context = useContext(SalonContext);
  if (!context) {
    throw new Error('useSalon must be used within a SalonProvider');
  }
  return context;
};
