import React from 'react';
import { Logo } from '../assets/Logo';
import { VENUE_INFO } from '../data/venueData';
import { MapPin, Phone, Instagram, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#1C1A18] text-[#FAF9F6] pt-14 pb-10 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-emerald-900/60">
          {/* Brand & Tagline */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center">
              <Logo variant="light" className="h-28 sm:h-32 w-auto -my-7" />
            </div>
            <p className="text-sm text-emerald-100/80 max-w-sm leading-relaxed">
              Alquiler de multiespacio para festejo de cumpleaños infantiles, bautismos, comuniones y eventos familiares en Villa Elisa, La Plata.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={VENUE_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-emerald-100 hover:text-white hover:bg-[#8FC43E] transition-colors"
                aria-label="Instagram de El Palmar Multiespacio"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${VENUE_INFO.phoneRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-emerald-100 hover:text-white hover:bg-[#8FC43E] transition-colors"
                aria-label="WhatsApp de El Palmar Multiespacio"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#A6E04E]">
              Navegación
            </h4>
            <ul className="space-y-2 text-sm text-emerald-100/80">
              <li>
                <button
                  onClick={() => onNavigate('inicio')}
                  className="hover:text-white transition-colors"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('el-lugar')}
                  className="hover:text-white transition-colors"
                >
                  El Lugar e Instalaciones
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('festejos')}
                  className="hover:text-white transition-colors"
                >
                  Así son los Festejos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('reservas')}
                  className="hover:text-white transition-colors"
                >
                  Reservas & Disponibilidad
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-white transition-colors"
                >
                  Preguntas Frecuentes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contacto')}
                  className="hover:text-white transition-colors"
                >
                  Contacto & Ubicación
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Contact Info */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#A6E04E]">
              Información de Contacto
            </h4>
            <ul className="space-y-3 text-sm text-emerald-100/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#8FC43E] shrink-0 mt-0.5" />
                <span>{VENUE_INFO.address}, Villa Elisa, La Plata</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#8FC43E] shrink-0" />
                <a
                  href={`https://wa.me/${VENUE_INFO.phoneRaw}`}
                  className="hover:text-white transition-colors"
                >
                  {VENUE_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Instagram className="w-4 h-4 text-[#8FC43E] shrink-0" />
                <a
                  href={VENUE_INFO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {VENUE_INFO.instagramUser}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & Back to top button */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-200/70">
          <p>© {new Date().getFullYear()} El Palmar Multiespacio. Todos los derechos reservados.</p>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-emerald-200 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/10"
          >
            <span>Volver arriba</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
