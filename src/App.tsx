/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SalonProvider, useSalon } from './context/SalonContext.tsx';
import { Navbar } from './components/Navbar.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { ServicesPage } from './pages/ServicesPage.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { GalleryPage } from './pages/GalleryPage.tsx';
import { ReviewsPage } from './pages/ReviewsPage.tsx';
import { ContactPage } from './pages/ContactPage.tsx';
import { Footer } from './components/Footer.tsx';
import { BookingModal } from './components/BookingModal.tsx';
import { GalleryLightbox } from './components/GalleryLightbox.tsx';
import { AdminModal } from './components/AdminModal.tsx';
import { LegalModals } from './components/LegalModals.tsx';
import { DiscoverModal } from './components/DiscoverModal.tsx';
import { MobileStickyBar } from './components/MobileStickyBar.tsx';

function MainRouter() {
  const { currentPage } = useSalon();

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1A1918] selection:bg-[#EAE2D5] selection:text-[#171717] pb-16 sm:pb-0 flex flex-col justify-between">
      <div>
        <Navbar />
        <main>
          {currentPage === 'home' && <HomePage />}
          {currentPage === 'services' && <ServicesPage />}
          {currentPage === 'about' && <AboutPage />}
          {currentPage === 'gallery' && <GalleryPage />}
          {currentPage === 'reviews' && <ReviewsPage />}
          {currentPage === 'contact' && <ContactPage />}
          {currentPage === 'admin' && <HomePage />} {/* Fallback home when admin is open in modal */}
        </main>
      </div>
      <Footer />

      {/* Interactive Modals & Overlays */}
      <BookingModal />
      <GalleryLightbox />
      <AdminModal />
      <LegalModals />
      <DiscoverModal />
      <MobileStickyBar />
    </div>
  );
}

export default function App() {
  return (
    <SalonProvider>
      <MainRouter />
    </SalonProvider>
  );
}
