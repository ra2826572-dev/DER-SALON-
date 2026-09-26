import React, { useEffect } from 'react';
import { useSalon } from '../context/SalonContext.tsx';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export const GalleryLightbox: React.FC = () => {
  const { gallery, activeLightboxIndex, closeLightbox, openLightbox } = useSalon();

  if (activeLightboxIndex === null || !gallery[activeLightboxIndex]) return null;

  const currentPhoto = gallery[activeLightboxIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIndex = (activeLightboxIndex - 1 + gallery.length) % gallery.length;
    openLightbox(newIndex);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIndex = (activeLightboxIndex + 1) % gallery.length;
    openLightbox(newIndex);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') {
        const newIndex = (activeLightboxIndex - 1 + gallery.length) % gallery.length;
        openLightbox(newIndex);
      }
      if (e.key === 'ArrowRight') {
        const newIndex = (activeLightboxIndex + 1) % gallery.length;
        openLightbox(newIndex);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, gallery.length]);

  return (
    <div
      onClick={closeLightbox}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
    >
      {/* Top Bar controls */}
      <div className="absolute top-6 right-6 z-10 flex items-center gap-4">
        <span className="text-xs font-mono text-white/70">
          {activeLightboxIndex + 1} / {gallery.length}
        </span>
        <button
          onClick={closeLightbox}
          className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
          aria-label="Close Lightbox"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Prev Button */}
      <button
        onClick={handlePrev}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer z-10"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer z-10"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Image Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center"
      >
        <img
          src={currentPhoto.imageUrl}
          alt={currentPhoto.title}
          referrerPolicy="no-referrer"
          className="max-h-[75vh] w-auto object-contain shadow-2xl border border-white/10"
        />
        <div className="mt-4 text-center">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] block mb-1">
            {currentPhoto.category}
          </span>
          <h3 className="font-serif text-xl sm:text-2xl text-white font-light">
            {currentPhoto.title}
          </h3>
        </div>
      </div>
    </div>
  );
};
