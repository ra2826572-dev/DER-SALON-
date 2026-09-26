import React from 'react';
import { useSalon } from '../context/SalonContext.tsx';
import { ArrowRight } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const { services, openBooking } = useSalon();

  return (
    <section id="services" className="bg-[#FAF7F2] py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-medium block mb-3">
            Menu
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#1A1918] font-normal tracking-tight mb-4">
            Our Services
          </h2>
          <p className="text-sm sm:text-base text-[#7D7871] font-light tracking-wide">
            Professional care. Personal style.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-[#FAF7F2] border border-[#E8E2D5] overflow-hidden flex flex-col transition-all duration-300 hover:border-[#C5A880]/60 hover:shadow-xs"
            >
              {/* Image Frame with hover zoom */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#EFEAE1]">
                <img
                  src={service.imageUrl}
                  alt={service.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 bg-[#1A1918]/80 text-[#FAF7F2] backdrop-blur-xs font-medium">
                    {service.category}
                  </span>
                </div>
              </div>

              {/* Service Details */}
              <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="font-serif text-2xl text-[#1A1918] font-medium group-hover:text-[#9F7A4C] transition-colors">
                      {service.name}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#7D7871] font-light leading-relaxed mb-4">
                    {service.shortDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8E2D5] flex items-center justify-between">
                  <span className="text-xs text-[#9E988F] font-light">
                    {service.priceNote}
                  </span>
                  <button
                    onClick={() => openBooking(service.id)}
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] font-medium text-[#1A1918] group-hover:text-[#C5A880] transition-colors cursor-pointer py-1"
                  >
                    <span>Book</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
