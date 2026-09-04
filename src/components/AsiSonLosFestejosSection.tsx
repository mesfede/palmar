import React, { useState, useEffect } from 'react';
import { ASSETS } from '../assets/assetsIndex';
import { VENUE_INFO } from '../data/venueData';
import { ConfettiExplosionCanvas } from './ConfettiExplosionCanvas';
import { ModalConfettiBurst } from './ModalConfettiBurst';
import {
  PartyPopper,
  CalendarCheck,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Video,
} from 'lucide-react';

interface AsiSonLosFestejosProps {
  onNavigate: (sectionId: string) => void;
}

export const AsiSonLosFestejosSection: React.FC<AsiSonLosFestejosProps> = ({
  onNavigate,
}) => {
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const [burstCount, setBurstCount] = useState(0);

  // Auto rotate carousel gently
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentCarouselIndex((prev) => (prev + 1) % ASSETS.festejos.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const triggerCelebrationBurst = () => {
    setBurstCount((prev) => prev + 1);
  };

  const openLightbox = (index: number) => {
    setActiveModalIndex(index);
  };

  const closeLightbox = () => {
    setActiveModalIndex(null);
  };

  const nextLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeModalIndex !== null) {
      setActiveModalIndex((activeModalIndex + 1) % ASSETS.festejos.length);
    }
  };

  const prevLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeModalIndex !== null) {
      setActiveModalIndex((activeModalIndex - 1 + ASSETS.festejos.length) % ASSETS.festejos.length);
    }
  };

  const prevCarousel = () => {
    setCurrentCarouselIndex((prev) => (prev - 1 + ASSETS.festejos.length) % ASSETS.festejos.length);
  };

  const nextCarousel = () => {
    setCurrentCarouselIndex((prev) => (prev + 1) % ASSETS.festejos.length);
  };

  return (
    <section
      id="festejos"
      className="relative py-20 md:py-28 bg-gradient-to-b from-[#F9EFE2] via-[#F1E1CB] to-[#E5CFB0] overflow-hidden"
    >
      {/* Dynamic Confetti & Streamers Explosion (Papeles flotantes conservados) */}
      <ConfettiExplosionCanvas triggerBurstKey={burstCount} />

      {/* Warm celebratory gold & brand ambient radiance */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-[#D4AF37]/18 via-[#6B604E]/12 to-[#8FC43E]/12 blur-3xl pointer-events-none z-0" />
      <div className="absolute -bottom-10 right-0 w-96 h-96 bg-[#8FC43E]/12 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#6B604E] text-white shadow-xs text-xs font-medium uppercase tracking-wider font-brand">
            <span>Celebraciones & Eventos</span>
          </div>
          <h2 className="font-brand text-3xl sm:text-5xl font-normal sm:font-medium text-[#1C1A18] tracking-tight">
            Así son los Festejos en <span className="text-[#6B604E] font-medium">El Palmar</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#524D48] leading-relaxed max-w-5xl mx-auto font-light whitespace-normal md:whitespace-nowrap">
            Alegría, risas y momentos inolvidables en cada rincón de nuestro multiespacio.
          </p>
        </div>

        {/* Carousel / Interactive Photo Showcase - Pure Visual Clean Cards */}
        <div className="mb-12">
          {/* Main Grid: in mobile 2 compact columns of small square cards so they don't take up excessive space */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {ASSETS.festejos.map((item, index) => (
              <div
                key={item.id}
                onClick={() => openLightbox(index)}
                className="group relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-[#6B604E]/20 shadow-xs sm:shadow-sm hover:shadow-xl hover:border-[#6B604E] transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
              >
                {/* Subtle Over-Photo Tag / Pill */}
                <div className="absolute top-2 left-2 sm:top-3.5 sm:left-3.5 z-20 pointer-events-none max-w-[88%]">
                  <span className="inline-flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-[11px] font-medium tracking-wide text-[#1C1A18] bg-white/95 backdrop-blur-md px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border border-black/5 shadow-xs font-brand truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6B604E] shrink-0" />
                    <span className="truncate">{item.title}</span>
                  </span>
                </div>

                {/* Photo Container: compact square on mobile, spacious card on tablet/desktop */}
                <div className="relative aspect-square sm:aspect-auto sm:h-80 w-full overflow-hidden bg-zinc-100">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />

                  {/* Gentle hover overlay with expansion prompt */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-2 sm:p-4 text-white">
                    <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-[#8FC43E] bg-black/60 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full backdrop-blur-sm">
                      <Maximize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span className="hidden xs:inline">Ampliar</span>
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-zinc-300 bg-black/50 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full">
                      {index + 1}/{ASSETS.festejos.length}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Navigation Indicator Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {ASSETS.festejos.map((_, idx) => (
              <button
                key={idx}
                onClick={() => openLightbox(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentCarouselIndex
                    ? 'w-7 bg-[#8FC43E]'
                    : 'w-2 bg-[#B1A89F]/40 hover:bg-[#B1A89F]/80'
                }`}
                aria-label={`Ver foto ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Shows & Artistas Banner with brand color #6B604E */}
        <div className="bg-[#6B604E] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl border border-[#584F40]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-2 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-medium uppercase tracking-wider font-brand border border-white/20">
                <Video className="w-3.5 h-3.5 text-[#FAF9F6]" />
                <span>Shows, Juegos & Animación</span>
              </div>
              <h3 className="font-brand text-2xl sm:text-3xl font-light sm:font-normal text-white">
                Espacio preparado para artistas y animación
              </h3>
              <p className="text-sm text-zinc-100 max-w-2xl leading-relaxed font-light">
                Pista libre, buena acústica, iluminación y piso seguro para números de magia, títeres, monociclo y burbujas.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <button
                onClick={() => onNavigate('reservas')}
                className="inline-flex items-center justify-center gap-2 bg-[#8FC43E] hover:bg-[#7eaf35] text-white px-6 py-3.5 rounded-xl text-sm font-bold shadow-md transition-all hover:scale-105"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Consultar para tu Fiesta</span>
              </button>
              <a
                href={`https://wa.me/${VENUE_INFO.phoneRaw}?text=${encodeURIComponent(
                  '¡Hola! Estuve viendo las fotos de festejos en El Palmar y me gustaría consultar disponibilidad de fecha.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-black/20 hover:bg-black/30 text-white px-5 py-3 rounded-xl text-xs font-semibold border border-white/20 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-[#8FC43E]" />
                <span>Escribir por WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeModalIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          {/* Destello de papelitos explotando de festejos al abrir o cambiar imagen */}
          <ModalConfettiBurst triggerKey={activeModalIndex} />

          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
            aria-label="Cerrar vista completa"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevLightbox}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
            aria-label="Foto anterior"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>

          <button
            onClick={nextLightbox}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
            aria-label="Foto siguiente"
          >
            <ChevronRight className="w-7 h-7" />
          </button>

          <div
            className="relative max-w-5xl max-h-[90vh] w-full flex flex-col items-center z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-h-[80vh] flex items-center justify-center rounded-2xl overflow-hidden bg-black/40 border border-white/10">
              <img
                src={ASSETS.festejos[activeModalIndex].src}
                alt={ASSETS.festejos[activeModalIndex].title}
                className="max-h-[80vh] w-auto max-w-full object-contain rounded-xl"
              />
            </div>

            <div className="mt-4 text-center text-white space-y-1">
              <div className="flex items-center justify-center gap-2">
                <span className="text-xs font-bold text-[#8FC43E] uppercase tracking-wider">
                  Foto {activeModalIndex + 1} de {ASSETS.festejos.length}
                </span>
                <span>•</span>
                <span className="text-xs text-zinc-300">El Palmar Multiespacio</span>
              </div>
              <h3 className="text-lg font-bold text-white">
                {ASSETS.festejos[activeModalIndex].title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
