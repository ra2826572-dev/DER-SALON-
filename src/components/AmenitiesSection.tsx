import React from 'react';
import {
  Accessibility,
  DoorClosed,
  CreditCard,
  SmartphoneNfc,
  HeartHandshake,
  CalendarCheck,
} from 'lucide-react';

export const AmenitiesSection: React.FC = () => {
  const amenities = [
    {
      icon: Accessibility,
      label: 'Wheelchair accessible',
      detail: 'Step-free entrance & salon space',
    },
    {
      icon: DoorClosed,
      label: 'Private Restroom',
      detail: 'Clean client facilities on site',
    },
    {
      icon: CreditCard,
      label: 'Card payments',
      detail: 'Credit & Debit cards accepted',
    },
    {
      icon: SmartphoneNfc,
      label: 'NFC payments',
      detail: 'Apple Pay & contactless checkout',
    },
    {
      icon: HeartHandshake,
      label: 'Good for kids',
      detail: 'Gentle haircuts for younger guests',
    },
    {
      icon: CalendarCheck,
      label: 'Appointments recommended',
      detail: 'Online booking for prompt service',
    },
  ];

  return (
    <section className="bg-[#FAF7F2] py-16 sm:py-24 border-b border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-medium block mb-2">
            Comfort & Convenience
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1918] font-normal tracking-tight uppercase">
            GOOD TO KNOW
          </h2>
        </div>

        {/* Small elegant cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {amenities.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="bg-[#F6F2EB] p-5 border border-[#E8E2D5] flex flex-col items-start transition-all hover:border-[#C5A880]/60 hover:shadow-2xs"
              >
                <div className="w-8 h-8 rounded-full border border-[#DCD6CA] flex items-center justify-center text-[#9F7A4C] mb-4">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="font-medium text-xs sm:text-sm text-[#1A1918] mb-1">
                  {item.label}
                </h3>
                <p className="text-[11px] text-[#7D7871] font-light leading-snug">
                  {item.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
