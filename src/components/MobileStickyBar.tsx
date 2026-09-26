import React from 'react';
import { useSalon } from '../context/SalonContext.tsx';
import { Calendar, Phone } from 'lucide-react';

export const MobileStickyBar: React.FC = () => {
  const { openBooking, businessInfo } = useSalon();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#E8E2D5] p-3 sm:hidden flex items-center justify-between gap-3 shadow-lg">
      <a
        href={`tel:${businessInfo.phone}`}
        className="flex-1 py-3 bg-[#EFEAE1] text-[#1A1918] text-xs uppercase tracking-wider font-medium text-center flex items-center justify-center gap-2 border border-[#DCD6CA]"
      >
        <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
        <span>Call</span>
      </a>

      <button
        onClick={() => openBooking()}
        className="flex-1 py-3 bg-[#1A1918] text-[#FAF7F2] text-xs uppercase tracking-wider font-medium text-center flex items-center justify-center gap-2 shadow-xs cursor-pointer"
      >
        <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
        <span>Book Now</span>
      </button>
    </div>
  );
};
