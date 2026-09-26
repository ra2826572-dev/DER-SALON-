import React from 'react';
import { useSalon } from '../context/SalonContext.tsx';
import { MapPin, Phone, Navigation, Clock } from 'lucide-react';

export const LocationHoursSection: React.FC = () => {
  const { hours, businessInfo } = useSalon();

  // Helper to determine if salon is currently open
  const getOpenStatus = () => {
    const now = new Date();
    const dayIndex = now.getDay(); // 0 is Sunday, 1 is Monday, etc.
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDayName = dayNames[dayIndex];
    const todayHours = hours.find((h) => h.day === currentDayName);

    if (!todayHours || todayHours.isClosed) {
      return { isOpen: false, text: 'Closed today · Reopens Tuesday 10:00' };
    }

    const currentHour = now.getHours();
    const currentMin = now.getMinutes();
    const currentTimeMinutes = currentHour * 60 + currentMin;

    const openMin = 10 * 60; // 10:00
    const closeMin = currentDayName === 'Saturday' ? 15 * 60 : 19 * 60;

    if (currentTimeMinutes >= openMin && currentTimeMinutes < closeMin) {
      const closeStr = currentDayName === 'Saturday' ? '15:00' : '19:00';
      return { isOpen: true, text: `Open today until ${closeStr}` };
    } else if (currentTimeMinutes < openMin) {
      return { isOpen: false, text: 'Opens today at 10:00' };
    } else {
      return { isOpen: false, text: 'Closed for today' };
    }
  };

  const status = getOpenStatus();

  const googleMapsUrl = 'https://www.google.com/maps/dir/?api=1&destination=Oppenheimer+Landstra%C3%9Fe+63+60596+Frankfurt+am+Main+Germany';

  return (
    <section id="contact" className="bg-[#FAF7F2] py-20 sm:py-28 border-b border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Visual Map & Location Details */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full">
            <div>
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-medium block mb-3">
                Location
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1A1918] font-normal tracking-tight uppercase mb-6">
                VISIT DER SALON
              </h2>

              <div className="space-y-1 text-base sm:text-lg text-[#1A1918] mb-6 font-light">
                <p className="font-medium text-[#1A1918]">
                  {businessInfo.street}
                </p>
                <p className="text-[#524F4A]">
                  {businessInfo.postalCode} {businessInfo.city}
                </p>
                <p className="text-[#7D7871]">
                  {businessInfo.country}
                </p>
              </div>

              <div className="flex items-center gap-2 text-base text-[#1A1918] mb-8">
                <Phone className="w-4 h-4 text-[#C5A880]" />
                <a
                  href={`tel:${businessInfo.phone}`}
                  className="font-mono text-sm tracking-wider hover:text-[#C5A880] transition-colors"
                >
                  {businessInfo.phoneDisplay}
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-4 mb-8">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#1A1918] text-[#FAF7F2] hover:bg-[#2C2A28] text-xs uppercase tracking-[0.18em] font-medium transition-colors cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                </a>

                <a
                  href={`tel:${businessInfo.phone}`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 border border-[#1A1918] text-[#1A1918] hover:bg-[#1A1918] hover:text-[#FAF7F2] text-xs uppercase tracking-[0.18em] font-medium transition-colors cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Salon</span>
                </a>
              </div>
            </div>

            {/* Embedded interactive map preview with custom styling */}
            <div className="relative aspect-[16/10] w-full overflow-hidden border border-[#E8E2D5] bg-[#EFEAE1] group">
              <iframe
                title="DER SALON Google Maps Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2559.3941459247656!2d8.6789!3d50.1009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bd0ea3b5b6f001%3A0x7d6b389fba7549!2sOppenheimer%20Landstra%C3%9Fe%2063%2C%2060596%20Frankfurt%20am%20Main!5e0!3m2!1sen!2sde!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(60%) contrast(90%)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-3 right-3 bg-[#1A1918] text-[#FAF7F2] text-[11px] uppercase tracking-wider px-3 py-1.5 shadow-sm hover:bg-[#C5A880] transition-colors flex items-center gap-1.5"
              >
                <MapPin className="w-3 h-3" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>

          {/* Right Column: Opening Hours Table */}
          <div className="lg:col-span-6 bg-[#F6F2EB] p-8 sm:p-10 border border-[#E8E2D5]">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E2DBD0]">
              <div>
                <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-medium block mb-1">
                  Schedule
                </span>
                <h3 className="font-serif text-3xl text-[#1A1918] font-normal uppercase">
                  Opening Hours
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    status.isOpen ? 'bg-emerald-600' : 'bg-[#9E988F]'
                  }`}
                />
                <span className="text-xs text-[#524F4A] font-medium">
                  {status.text}
                </span>
              </div>
            </div>

            {/* Timetable Table */}
            <div className="divide-y divide-[#E2DBD0]">
              {hours.map((item) => {
                const now = new Date();
                const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                const isToday = dayNames[now.getDay()] === item.day;

                return (
                  <div
                    key={item.day}
                    className={`py-3.5 flex items-center justify-between text-sm ${
                      isToday ? 'font-medium text-[#1A1918] bg-[#EDE6DC]/40 -mx-4 px-4' : 'text-[#524F4A]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{item.day}</span>
                      {isToday && (
                        <span className="text-[10px] uppercase tracking-wider text-[#C5A880] font-semibold">
                          (Today)
                        </span>
                      )}
                    </span>
                    <span
                      className={`font-mono text-xs tracking-wider tabular-nums ${
                        item.isClosed ? 'text-[#9E988F]' : 'text-[#1A1918]'
                      }`}
                    >
                      {item.hours}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 pt-4 border-t border-[#E2DBD0] flex items-center justify-between text-xs text-[#7D7871]">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Appointments recommended</span>
              </div>
              <span>Frankfurt-Süd</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
