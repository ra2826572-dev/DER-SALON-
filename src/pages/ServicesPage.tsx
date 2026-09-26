import React from 'react';
import { ServicesSection } from '../components/ServicesSection.tsx';
import { BookingCtaSection } from '../components/BookingCtaSection.tsx';

export const ServicesPage: React.FC = () => {
  return (
    <div className="pt-20">
      <ServicesSection />
      <BookingCtaSection />
    </div>
  );
};
