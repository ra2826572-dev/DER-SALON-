import React, { useState } from 'react';
import { useSalon } from '../context/SalonContext.tsx';
import { Maximize2 } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const { gallery, openLightbox } = useSalon();
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Salon' | 'Hair' | 'Styling' | 'Team'>('All');

  const categories: Array<'All' | 'Salon' | 'Hair' | 'Styling' | 'Team'> = [
    'All',
    'Salon',
    'Hair',
    'Styling',
    'Team',
  ];

  const filteredGallery = selectedCategory === 'All'
    ? gallery
    : gallery.filter((item) => item.category === selectedCategory);

  return (
    <section id="gallery" className="bg-[#FAF7F2] py-20 sm:py-28 border-b border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-medium block mb-3">
              Atmosphere & Craft
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#1A1918] font-normal tracking-tight">
              Inside Der Salon
            </h2>
          </div>

          {/* Category Tabs (Segmented interactive buttons) */}
          <div className="flex flex-wrap items-center gap-2 border-b border-[#E8E2D5] pb-2 md:pb-0 md:border-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs uppercase tracking-[0.16em] transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#1A1918] text-[#FAF7F2] font-medium'
                    : 'text-[#7D7871] hover:text-[#1A1918] hover:bg-[#EFEAE1]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Grid Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredGallery.map((item) => {
            const originalIndex = gallery.findIndex((g) => g.id === item.id);
            return (
              <div
                key={item.id}
                onClick={() => openLightbox(originalIndex >= 0 ? originalIndex : 0)}
                className="group relative cursor-pointer overflow-hidden bg-[#EFEAE1] border border-[#E8E2D5] aspect-[4/3]"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                />

                {/* Quiet hover overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                  <div className="flex justify-end">
                    <span className="p-2 bg-white/20 backdrop-blur-xs rounded-full text-white">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#E0D7C8] block mb-1">
                      {item.category}
                    </span>
                    <h3 className="font-serif text-lg text-white font-medium">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
