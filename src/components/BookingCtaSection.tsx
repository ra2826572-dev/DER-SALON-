import React from 'react';
import { useSalon } from '../context/SalonContext.tsx';
import { IMAGES } from '../data/salonData.ts';
import { Phone, Calendar, ArrowRight } from 'lucide-react';

export const BookingCtaSection: React.FC = () => {
  const { openBooking, businessInfo } = useSalon();

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-[#1A1918] text-[#FAF7F2]">
      {/* Background Image with Contrast Scrim */}
      <div className="absolute inset-0">
        <img
          src={IMAGES.hero}
          alt="DER SALON background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/80" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center">
        <span className="text-[11px] uppercase tracking-[0.35em] text-[#C5A880] font-medium mb-4 block">
          Frankfurt-Süd
        </span>

        <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight uppercase text-white mb-4 text-balance">
          READY FOR YOUR NEXT LOOK?
        </h2>

        <p className="text-base sm:text-xl text-[#EDE7DD] font-light mb-10 max-w-xl text-balance">
          Book your appointment at Der Salon.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full sm:w-auto">
          <button
            onClick={() => openBooking()}
            className="w-full sm:w-auto px-9 py-4 bg-[#FAF7F2] text-[#1A1918] hover:bg-[#EFEAE1] transition-all text-xs uppercase tracking-[0.2em] font-medium cursor-pointer shadow-lg inline-flex items-center justify-center gap-2.5"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Appointment</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <a
            href={`tel:${businessInfo.phone}`}
            className="w-full sm:w-auto px-8 py-4 border border-white/40 text-white hover:bg-white/10 hover:border-white transition-all text-xs uppercase tracking-[0.2em] font-medium cursor-pointer inline-flex items-center justify-center gap-2.5 backdrop-blur-xs font-mono"
          >
            <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>{businessInfo.phoneDisplay}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
