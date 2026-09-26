import React from 'react';
import { AboutSection } from '../components/AboutSection.tsx';
import { AmenitiesSection } from '../components/AmenitiesSection.tsx';

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-20">
      <AboutSection />
      <AmenitiesSection />
    </div>
  );
};
