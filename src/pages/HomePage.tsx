import React from 'react';
import { Hero } from '../components/Hero.tsx';
import { QuickInfo } from '../components/QuickInfo.tsx';
import { FeaturedService } from '../components/FeaturedService.tsx';
import { AmenitiesSection } from '../components/AmenitiesSection.tsx';
import { BookingCtaSection } from '../components/BookingCtaSection.tsx';

export const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <QuickInfo />
      <FeaturedService />
      <AmenitiesSection />
      <BookingCtaSection />
    </>
  );
};
