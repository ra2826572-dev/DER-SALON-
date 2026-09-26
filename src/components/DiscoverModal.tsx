import React from 'react';
import { useSalon } from '../context/SalonContext.tsx';
import { X, Sparkles } from 'lucide-react';
import { IMAGES } from '../data/salonData.ts';

export const DiscoverModal: React.FC = () => {
  const { isDiscoverOpen, closeDiscover, openBooking } = useSalon();

  if (!isDiscoverOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-[#FAF7F2] max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-[#E8E2D5] p-6 sm:p-10 relative">
        <button
          onClick={closeDiscover}
          className="absolute top-6 right-6 p-2 text-[#7D7871] hover:text-[#1A1918] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center max-w-lg mx-auto mb-8">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-medium block mb-2">
            The Philosophy
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl text-[#1A1918] uppercase">
            DER SALON FRANKFURT-SÜD
          </h3>
        </div>

        <div className="aspect-[16/9] overflow-hidden mb-8 bg-[#EFEAE1]">
          <img
            src={IMAGES.hero}
            alt="DER SALON interior"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-[#524F4A] leading-relaxed mb-8">
          <p>
            Located in the heart of Frankfurt-Süd on Oppenheimer Landstraße 63, <strong>DER SALON</strong> is dedicated to precision haircuts, personal styling, and bespoke hair care in a calm, sophisticated atmosphere.
          </p>
          <p>
            We believe that great hair begins with careful listening and professional mastery. Whether you are seeking a subtle refresh, a transformative colour, or meticulous styling for an occasion, our team ensures every detail aligns with your individual style.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#E8E2D5]">
          <div className="flex items-center gap-2 text-xs text-[#7D7871]">
            <Sparkles className="w-4 h-4 text-[#C5A880]" />
            <span>Appointments recommended · Oppenheimer Landstraße 63</span>
          </div>
          <button
            onClick={() => {
              closeDiscover();
              openBooking();
            }}
            className="w-full sm:w-auto px-7 py-3 bg-[#1A1918] text-[#FAF7F2] text-xs uppercase tracking-[0.18em]"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};
