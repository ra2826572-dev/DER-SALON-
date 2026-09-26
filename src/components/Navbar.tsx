import React, { useState, useEffect } from 'react';
import { useSalon, PageType } from '../context/SalonContext.tsx';
import { Menu, X, Shield } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { openBooking, openAdmin, currentPage, navigateToPage } = useSalon();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40 || currentPage !== 'home');
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const navLinks: Array<{ label: string; page: PageType }> = [
    { label: 'Home', page: 'home' },
    { label: 'Services', page: 'services' },
    { label: 'About', page: 'about' },
    { label: 'Gallery', page: 'gallery' },
    { label: 'Reviews', page: 'reviews' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: PageType) => {
    setIsMobileMenuOpen(false);
    navigateToPage(page);
  };

  const isTransparentHero = currentPage === 'home' && !isScrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isTransparentHero
            ? 'bg-gradient-to-b from-black/60 via-black/30 to-transparent py-5'
            : 'bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8E2D5] shadow-xs py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className={`font-serif text-xl sm:text-2xl tracking-[0.25em] uppercase font-medium transition-colors cursor-pointer bg-transparent border-none ${
              isTransparentHero ? 'text-white' : 'text-[#1A1918]'
            }`}
          >
            DER SALON
          </button>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.page)}
                  className={`text-xs uppercase tracking-[0.18em] font-medium transition-colors relative py-1 cursor-pointer bg-transparent border-none ${
                    isActive
                      ? 'text-[#C5A880] font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-[#C5A880]'
                      : isTransparentHero
                      ? 'text-white/90 hover:text-white'
                      : 'text-[#3E3C38] hover:text-[#1A1918]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary action + admin affordance */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => openBooking()}
              className={`hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-xs uppercase tracking-[0.15em] font-medium transition-all cursor-pointer ${
                isTransparentHero
                  ? 'bg-white text-[#1A1918] hover:bg-[#F3EFE8]'
                  : 'bg-[#1A1918] text-[#FAF7F2] hover:bg-[#2C2A28] shadow-xs'
              }`}
            >
              BOOK APPOINTMENT
            </button>

            {/* Quick Admin Access Key */}
            <button
              onClick={openAdmin}
              title="Salon Management"
              aria-label="Salon Management Admin Portal"
              className={`p-2 transition-colors cursor-pointer rounded-full ${
                isTransparentHero
                  ? 'text-white/70 hover:text-white hover:bg-white/10'
                  : 'text-[#7D7871] hover:text-[#1A1918] hover:bg-[#EFEAE1]'
              }`}
            >
              <Shield className="w-4 h-4" />
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className={`md:hidden p-2 transition-colors cursor-pointer ${
                isTransparentHero ? 'text-white' : 'text-[#1A1918]'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#FAF7F2] flex flex-col justify-between pt-24 pb-8 px-6 md:hidden">
          <nav className="flex flex-col gap-6 py-6">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.page)}
                className={`font-serif text-2xl text-left tracking-wider transition-colors bg-transparent border-none ${
                  currentPage === link.page ? 'text-[#C5A880] font-medium' : 'text-[#1A1918]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="space-y-4 pt-6 border-t border-[#E8E2D5]">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openBooking();
              }}
              className="w-full py-3.5 bg-[#1A1918] text-[#FAF7F2] text-xs uppercase tracking-[0.2em] font-medium"
            >
              BOOK APPOINTMENT
            </button>
            <div className="flex items-center justify-between text-xs text-[#7D7871]">
              <span>Oppenheimer Landstraße 63, Frankfurt-Süd</span>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openAdmin();
                }}
                className="underline hover:text-[#1A1918]"
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
