import React, { useState } from 'react';
import { useSalon } from '../context/SalonContext.tsx';
import { Star, CheckCircle, X } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const { reviews, businessInfo } = useSalon();
  const [showAllReviewsModal, setShowAllReviewsModal] = useState(false);

  return (
    <section id="reviews" className="bg-[#FAF7F2] py-20 sm:py-28 border-b border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Big Rating Block on Left */}
          <div className="lg:col-span-4 flex flex-col justify-start">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-medium block mb-3">
              Client Feedback
            </span>
            <div className="font-serif text-6xl sm:text-7xl md:text-8xl text-[#1A1918] font-normal tracking-tight mb-2">
              {businessInfo.rating}
            </div>

            <div className="flex items-center gap-1.5 text-[#C5A880] mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#C5A880]" />
              ))}
            </div>

            <p className="text-sm font-medium text-[#1A1918] uppercase tracking-[0.15em] mb-6">
              {businessInfo.reviewCount} Google Reviews
            </p>

            <button
              onClick={() => setShowAllReviewsModal(true)}
              className="inline-flex items-center justify-center px-6 py-3 border border-[#1A1918] text-[#1A1918] hover:bg-[#1A1918] hover:text-[#FAF7F2] transition-colors text-xs uppercase tracking-[0.18em] font-medium cursor-pointer w-fit"
            >
              View Reviews
            </button>
          </div>

          {/* 3 Authentic Review Cards on Right */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.slice(0, 3).map((rev) => (
              <div
                key={rev.id}
                className="bg-[#F6F2EB] p-7 border border-[#E8E2D5] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#C5A880] mb-5">
                    {[...Array(Math.floor(rev.rating))].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#C5A880]" />
                    ))}
                  </div>

                  <blockquote className="font-serif italic text-lg sm:text-xl text-[#1A1918] leading-relaxed mb-6">
                    “{rev.quote}”
                  </blockquote>
                </div>

                <div className="pt-4 border-t border-[#E2DBD0] flex items-center justify-between text-xs text-[#7D7871]">
                  <span className="font-medium text-[#1A1918] tracking-wide">
                    {rev.author}
                  </span>
                  {rev.isGoogleVerified && (
                    <span className="inline-flex items-center gap-1 text-[11px] text-[#786C5A]">
                      <CheckCircle className="w-3 h-3 text-[#C5A880]" />
                      Verified
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal: View All Reviews */}
      {showAllReviewsModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
          <div className="bg-[#FAF7F2] max-w-2xl w-full max-h-[85vh] overflow-y-auto border border-[#E8E2D5] p-6 sm:p-8 relative">
            <button
              onClick={() => setShowAllReviewsModal(false)}
              className="absolute top-6 right-6 p-2 text-[#7D7871] hover:text-[#1A1918] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A880] font-medium block mb-2">
              Authentic Feedback
            </span>
            <h3 className="font-serif text-3xl text-[#1A1918] mb-1">
              Google Reviews ({reviews.length})
            </h3>
            <p className="text-xs text-[#7D7871] mb-6">
              Average rating: 4.8 ★ from 63 clients on Google Maps
            </p>

            <div className="space-y-4">
              {reviews.map((rev) => (
                <div key={rev.id} className="p-5 bg-[#F6F2EB] border border-[#E8E2D5]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm text-[#1A1918]">
                      {rev.author}
                    </span>
                    <div className="flex items-center gap-0.5 text-[#C5A880]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-[#C5A880]" />
                      ))}
                    </div>
                  </div>
                  <p className="font-serif italic text-base text-[#2C2A28]">
                    “{rev.quote}”
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[#E8E2D5] flex justify-end">
              <button
                onClick={() => setShowAllReviewsModal(false)}
                className="px-6 py-2.5 bg-[#1A1918] text-[#FAF7F2] text-xs uppercase tracking-[0.15em]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
