import React from 'react';
import { useSalon } from '../context/SalonContext.tsx';
import { MapPin, Star, MessageSquare, Calendar } from 'lucide-react';

export const QuickInfo: React.FC = () => {
  const { businessInfo } = useSalon();

  const cards = [
    {
      icon: MapPin,
      label: 'Location',
      value: businessInfo.city,
      sub: 'Oppenheimer Landstraße 63',
    },
    {
      icon: Star,
      label: 'Rating',
      value: `${businessInfo.rating} / 5`,
      sub: 'Google Verified',
    },
    {
      icon: MessageSquare,
      label: 'Reviews',
      value: `${businessInfo.reviewCount} Reviews`,
      sub: 'Authentic Feedback',
    },
    {
      icon: Calendar,
      label: 'Appointments',
      value: 'Recommended',
      sub: 'Online Booking Available',
    },
  ];

  return (
    <section className="bg-[#FAF7F2] border-b border-[#E8E2D5] py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {cards.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className={`flex flex-col items-start ${
                  idx !== 0 ? 'lg:border-l lg:border-[#E8E2D5] lg:pl-8' : ''
                }`}
              >
                <div className="flex items-center gap-2 mb-2 text-[#C5A880]">
                  <Icon className="w-4 h-4" />
                  <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#7D7871]">
                    {item.label}
                  </span>
                </div>
                <div className="font-serif text-2xl sm:text-3xl text-[#1A1918] font-normal tracking-wide">
                  {item.value}
                </div>
                <div className="text-xs text-[#7D7871] mt-1 font-light">
                  {item.sub}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
