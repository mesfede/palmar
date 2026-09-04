import React from 'react';
import { VENUE_INFO } from '../data/venueData';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const whatsappUrl = `https://wa.me/${VENUE_INFO.phoneRaw}?text=${encodeURIComponent(
    '¡Hola El Palmar Multiespacio! Quisiera consultar disponibilidad para un evento.'
  )}`;

  return (
    <div className="hidden sm:block fixed bottom-6 right-6 z-50">
      <a
        id="floating-whatsapp-btn"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 bg-[#8FC43E] hover:bg-[#7eaf35] text-white px-4 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-[#8FC43E]/30"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-white text-[#8FC43E]" />
        <span className="text-sm font-bold pr-1">
          Consultar por WhatsApp
        </span>
      </a>
    </div>
  );
};

