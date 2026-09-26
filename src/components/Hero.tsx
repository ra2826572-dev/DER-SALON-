import React from 'react';
import { useSalon } from '../context/SalonContext.tsx';
import { IMAGES } from '../data/salonData.ts';
import { Star, ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const { openBooking, businessInfo } = useSalon();

  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Measured Scrim */}
      <div className="absolute inset-0">
        <img
          src={IMAGES.hero}
          alt="DER SALON luxury interior Frankfurt-Süd"
          className="w-full h-full object-cover object-center scale-105 animate-fade-in transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        {/* Soft luxury film overlay: deep charcoal gradient into warm dark tone */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/35" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 text-center text-white pt-24 pb-16 flex flex-col items-center">
        {/* Frankfurt-Süd location line */}
        <span className="text-xs sm:text-sm uppercase tracking-[0.35em] text-[#E0D7C8] mb-4 font-light">
          {businessInfo.city}
        </span>

        {/* Brand headline */}
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-normal tracking-[0.08em] uppercase text-[#FAF7F2] mb-4 text-balance">
          DER SALON
        </h1>

        {/* Tagline */}
        <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[#EDE7DD] font-light mb-8 sm:mb-10 text-balance">
          Hair, styled your way.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 mb-12 sm:mb-14 w-full sm:w-auto">
          <button
            onClick={() => openBooking()}
            className="w-full sm:w-auto px-8 py-4 bg-[#FAF7F2] text-[#1A1918] hover:bg-[#F2ECE1] transition-all text-xs uppercase tracking-[0.2em] font-medium shadow-md cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Book Appointment</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={scrollToServices}
            className="w-full sm:w-auto px-8 py-4 border border-[#FAF7F2]/60 text-[#FAF7F2] hover:bg-white/10 hover:border-white transition-all text-xs uppercase tracking-[0.2em] font-medium backdrop-blur-xs cursor-pointer"
          >
            Explore Services
          </button>
        </div>

        {/* Trust badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 border border-white/20 bg-black/25 backdrop-blur-md text-xs tracking-wider text-[#F0EBE1]">
          <div className="flex items-center text-[#E5C384]">
            <Star className="w-3.5 h-3.5 fill-[#E5C384]" />
          </div>
          <span className="font-medium text-white">{businessInfo.rating} ★</span>
          <span className="text-white/40">·</span>
          <span className="text-white/90">{businessInfo.reviewCount} Reviews</span>
        </div>
      </div>

      {/* Subtle bottom scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-white/50 text-[10px] uppercase tracking-[0.3em]">
        <span>Scroll</span>
        <div className="w-[1px] h-6 bg-white/30 animate-pulse" />
      </div>
    </section>
  );
};
