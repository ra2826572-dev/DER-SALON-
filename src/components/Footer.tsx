import React from 'react';
import { useSalon, PageType } from '../context/SalonContext.tsx';
import { Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  const { businessInfo, openLegalModal, openAdmin, navigateToPage } = useSalon();

  const handleNavClick = (page: PageType) => {
    navigateToPage(page);
  };

  return (
    <footer className="bg-[#141413] text-[#FAF7F2] py-16 sm:py-20 border-t border-[#2C2A28]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-12 pb-12 border-b border-[#2C2A28]">
          {/* Brand & Address */}
          <div className="md:col-span-6 flex flex-col justify-between">
            <div>
              <button
                onClick={() => handleNavClick('home')}
                className="font-serif text-2xl sm:text-3xl tracking-[0.2em] uppercase font-normal text-white block mb-4 text-left bg-transparent border-none cursor-pointer"
              >
                DER SALON
              </button>
              <p className="text-xs text-[#9E988F] font-light leading-relaxed mb-2">
                {businessInfo.street}
              </p>
              <p className="text-xs text-[#9E988F] font-light mb-4">
                {businessInfo.postalCode} {businessInfo.city}, Germany
              </p>
              <a
                href={`tel:${businessInfo.phone}`}
                className="font-mono text-xs text-[#C5A880] tracking-wider hover:underline"
              >
                {businessInfo.phoneDisplay}
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-[#7D7871] font-medium mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-[#C7C2B8] uppercase tracking-[0.15em]">
              <li>
                <button
                  onClick={() => handleNavClick('home')}
                  className="hover:text-white transition-colors bg-transparent border-none cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('services')}
                  className="hover:text-white transition-colors bg-transparent border-none cursor-pointer"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('about')}
                  className="hover:text-white transition-colors bg-transparent border-none cursor-pointer"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('gallery')}
                  className="hover:text-white transition-colors bg-transparent border-none cursor-pointer"
                >
                  Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('reviews')}
                  className="hover:text-white transition-colors bg-transparent border-none cursor-pointer"
                >
                  Reviews
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('contact')}
                  className="hover:text-white transition-colors bg-transparent border-none cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Operations */}
          <div className="md:col-span-3">
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-[#7D7871] font-medium mb-4">
              Legal & Admin
            </h4>
            <ul className="space-y-2.5 text-xs text-[#C7C2B8]">
              <li>
                <button
                  onClick={() => openLegalModal('impressum')}
                  className="hover:text-white transition-colors cursor-pointer bg-transparent border-none"
                >
                  Impressum
                </button>
              </li>
              <li>
                <button
                  onClick={() => openLegalModal('datenschutz')}
                  className="hover:text-white transition-colors cursor-pointer bg-transparent border-none"
                >
                  Datenschutz (Privacy)
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={openAdmin}
                  className="inline-flex items-center gap-1.5 text-xs text-[#9E988F] hover:text-[#C5A880] transition-colors cursor-pointer bg-transparent border-none"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Salon Management</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#6E6962] gap-4">
          <p>© {new Date().getFullYear()} DER SALON. All rights reserved. Frankfurt-Süd.</p>
          <p className="font-light">Oppenheimer Landstraße 63 · 60596 Frankfurt am Main</p>
        </div>
      </div>
    </footer>
  );
};
