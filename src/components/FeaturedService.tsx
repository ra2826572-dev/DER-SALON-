import React from 'react';
import { useSalon } from '../context/SalonContext.tsx';
import { IMAGES } from '../data/salonData.ts';
import { ArrowRight } from 'lucide-react';

export const FeaturedService: React.FC = () => {
  const { openBooking } = useSalon();

  return (
    <section className="bg-[#1A1918] text-[#FAF7F2] py-20 sm:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Editorial Image Side */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[3/4] max-h-[580px] w-full overflow-hidden bg-[#242321]">
              <img
                src={IMAGES.editorial}
                alt="Teen Boy & Men Hairstyles - DER SALON"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center filter grayscale-[10%] hover:grayscale-0 transition-all duration-700"
              />
              {/* Subtle architectural frame */}
              <div className="absolute inset-0 border border-white/10 pointer-events-none" />
            </div>
          </div>

          {/* Editorial Text Side */}
          <div className="lg:col-span-6 flex flex-col justify-center lg:pl-6">
            <span className="text-[11px] uppercase tracking-[0.35em] text-[#C5A880] font-medium mb-4 block">
              Modern Cuts & Styling
            </span>

            <span className="text-xs uppercase tracking-[0.3em] text-[#C7C2B8] font-light mb-2 block">
              35+ Teen Boy
            </span>
            <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl text-[#FAF7F2] font-normal tracking-tight uppercase leading-[1.05] mb-2">
              Hairstyles
            </h2>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#C5A880] font-normal tracking-wide uppercase mb-6">
              & Modern Fades
            </h2>

            <p className="text-base sm:text-lg text-[#C7C2B8] font-light leading-relaxed mb-8 max-w-md">
              Precision cuts, textured crops, tapers, and modern styling tailored for teens and young adults at DER SALON Frankfurt-Süd.
            </p>

            <div>
              <button
                onClick={() => openBooking()}
                className="px-8 py-4 bg-[#FAF7F2] text-[#1A1918] hover:bg-[#EFEAE1] transition-all text-xs uppercase tracking-[0.2em] font-medium cursor-pointer inline-flex items-center gap-3"
              >
                <span>Book Appointment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
