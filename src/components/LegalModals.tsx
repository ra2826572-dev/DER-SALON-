import React from 'react';
import { useSalon } from '../context/SalonContext.tsx';
import { X } from 'lucide-react';

export const LegalModals: React.FC = () => {
  const { activeLegalModal, closeLegalModal, businessInfo } = useSalon();

  if (!activeLegalModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-[#FAF7F2] max-w-2xl w-full max-h-[85vh] overflow-y-auto border border-[#E8E2D5] p-6 sm:p-8 relative">
        <button
          onClick={closeLegalModal}
          className="absolute top-6 right-6 p-2 text-[#7D7871] hover:text-[#1A1918] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {activeLegalModal === 'impressum' ? (
          <div className="space-y-4 text-xs sm:text-sm text-[#524F4A] leading-relaxed">
            <h3 className="font-serif text-3xl text-[#1A1918] mb-4">Impressum</h3>
            
            <p className="font-medium text-[#1A1918]">Angaben gemäß § 5 TMG</p>
            <p>
              {businessInfo.name}<br />
              {businessInfo.street}<br />
              {businessInfo.postalCode} {businessInfo.city}, Germany
            </p>

            <p className="font-medium text-[#1A1918] pt-2">Kontakt</p>
            <p>
              Telefon: {businessInfo.phoneDisplay}<br />
              E-Mail: info@der-salon-frankfurt.de
            </p>

            <p className="font-medium text-[#1A1918] pt-2">Verbraucherstreitbeilegung / Universalschlichtungsstelle</p>
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </div>
        ) : (
          <div className="space-y-4 text-xs sm:text-sm text-[#524F4A] leading-relaxed">
            <h3 className="font-serif text-3xl text-[#1A1918] mb-4">Datenschutz (Privacy Policy)</h3>

            <p className="font-medium text-[#1A1918]">1. Datenschutz auf einen Blick</p>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
            </p>

            <p className="font-medium text-[#1A1918] pt-2">2. Datenerfassung auf unserer Website</p>
            <p>
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Angaben gemäß § 5 TMG“ in unserem Impressum entnehmen.
            </p>

            <p className="font-medium text-[#1A1918] pt-2">3. Terminbuchung</p>
            <p>
              Wenn Sie über unsere Website einen Termin buchen, werden die von Ihnen eingegebenen Daten (Name, E-Mail, Telefonnummer, Notizen) ausschließlich zur Durchführung und Verwaltung des Termins gespeichert und verarbeitet.
            </p>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-[#E8E2D5] flex justify-end">
          <button
            onClick={closeLegalModal}
            className="px-6 py-2.5 bg-[#1A1918] text-[#FAF7F2] text-xs uppercase tracking-[0.15em]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
