import React from 'react';
import { useSalon } from '../context/SalonContext.tsx';
import { IMAGES } from '../data/salonData.ts';
import { Check, ArrowRight } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { openDiscover } = useSalon();

  const points = [
    'Personal service',
    'Professional styling',
    'Welcoming atmosphere',
  ];

  return (
    <section id="about" className="bg-[#FAF7F2] py-20 sm:py-28 border-b border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Salon Image on Left / Top */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#EFEAE1] border border-[#E8E2D5]">
              <img
                src={IMAGES.washLounge}
                alt="DER SALON hair lounge Frankfurt-Süd"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-102"
              />
            </div>
          </div>

          {/* Clean Editorial Text on Right */}
          <div className="lg:col-span-6 order-1 lg:order-2 lg:pl-6">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-medium block mb-3">
              Philosophy
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1A1918] font-normal tracking-tight uppercase mb-4">
              ABOUT DER SALON
            </h2>

            <p className="text-base sm:text-lg text-[#524F4A] font-light mb-8">
              Professional hair care in Frankfurt-Süd.
            </p>

            {/* 3 Small Points */}
            <div className="space-y-3.5 mb-10">
              {points.map((pt) => (
                <div key={pt} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border border-[#C5A880] flex items-center justify-center text-[#9F7A4C] shrink-0">
                    <Check className="w-3 h-3" strokeWidth={2.5} />
                  </div>
                  <span className="text-sm sm:text-base text-[#1A1918] font-light">
                    {pt}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={openDiscover}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 border border-[#1A1918] text-[#1A1918] hover:bg-[#1A1918] hover:text-[#FAF7F2] transition-colors text-xs uppercase tracking-[0.18em] font-medium cursor-pointer"
            >
              <span>Discover Der Salon</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
