import React, { useState, useEffect, useRef } from 'react';
import { ASSETS } from '../assets/assetsIndex';
import { FloatingBalloonsBg } from './FloatingBalloonsBg';
import { ModalConfettiBurst } from './ModalConfettiBurst';
import {
  Building2,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface ElLugarSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const ElLugarSection: React.FC<ElLugarSectionProps> = () => {
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const photos = ASSETS.lugar;
  const totalPhotos = photos.length;
  // Duplicate array for seamless infinite looping
  const loopedPhotos = [...photos, ...photos, ...photos];

  // Slow continuous auto-scroll effect
  useEffect(() => {
    let animationFrameId: number;
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollSpeed = 1.35; // Smooth, lively continuous drift

    const scroll = () => {
      if (!isHovered && activeModalIndex === null && container) {
        container.scrollLeft += scrollSpeed;
        // If scrolled more than one full set of items, reset seamlessly
        const singleSetWidth = container.scrollWidth / 3;
        if (container.scrollLeft >= singleSetWidth * 2) {
          container.scrollLeft -= singleSetWidth;
        } else if (container.scrollLeft <= 0) {
          container.scrollLeft += singleSetWidth;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, activeModalIndex]);

  const scrollManual = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollAmount = 360;
    container.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeModalIndex === null) return;
      if (e.key === 'Escape') setActiveModalIndex(null);
      if (e.key === 'ArrowRight') {
        setActiveModalIndex((prev) => (prev !== null ? (prev + 1) % totalPhotos : null));
      }
      if (e.key === 'ArrowLeft') {
        setActiveModalIndex((prev) => (prev !== null ? (prev - 1 + totalPhotos) % totalPhotos : null));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalIndex, totalPhotos]);

  return (
    <section
      id="el-lugar"
      className="relative py-20 md:py-28 bg-gradient-to-b from-[#FAF8F5] via-[#F4F1E8] to-[#ECE7DC] overflow-hidden"
    >
      {/* Clean Ambient Warm & Nature Glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#8FC43E]/10 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-0 left-10 w-[550px] h-[550px] bg-[#6B604E]/8 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Floating & Popping Balloons Festive Background */}
      <FloatingBalloonsBg />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#6B604E] text-white shadow-xs text-xs font-medium uppercase tracking-wider font-brand">
            <Building2 className="w-3.5 h-3.5 text-white" />
            <span>Galería del Salón</span>
          </div>
          <h2 className="font-brand text-3xl sm:text-5xl font-normal sm:font-medium text-[#1C1A18] tracking-tight">
            Conocé <span className="text-[#6B604E] font-medium">El Lugar</span> en Fotos
          </h2>
          <p className="text-sm sm:text-base text-[#524D48] leading-relaxed font-light">
            Instalaciones completas y climatizadas en Villa Elisa. Tocá cualquier foto para verla en pantalla completa.
          </p>
        </div>

        {/* MOBILE VIEW: Visual Photo Grid (Cuadrícula clara y accesible para celulares) */}
        <div className="md:hidden">
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
            {photos.map((photo, index) => (
              <div
                key={`mobile-grid-${photo.id}`}
                onClick={() => setActiveModalIndex(index)}
                className="group relative bg-white rounded-2xl overflow-hidden border border-[#6B604E]/20 shadow-xs active:scale-[0.98] transition-transform cursor-pointer flex flex-col"
              >
                <div className="relative aspect-4/3 w-full overflow-hidden bg-[#E5E1D8]">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 flex items-end p-2">
                    <span className="text-white text-[11px] font-medium leading-tight drop-shadow-sm line-clamp-1 font-brand">
                      {photo.title}
                    </span>
                  </div>
                  <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-xs text-white p-1 rounded-full">
                    <Maximize2 className="w-3 h-3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DESKTOP VIEW: Continuous Smooth Carousel with Hover Pause & Blurred Edges */}
        <div
          className="hidden md:block relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Subtle Side Navigation Arrow Controls */}
          <div className="flex items-center justify-end gap-2 mb-3">
            <button
              onClick={() => scrollManual('left')}
              aria-label="Ver fotos anteriores"
              className="p-2.5 rounded-full bg-white border border-[#6B604E]/25 text-[#1C1A18] hover:bg-[#6B604E] hover:text-white transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollManual('right')}
              aria-label="Ver fotos siguientes"
              className="p-2.5 rounded-full bg-white border border-[#6B604E]/25 text-[#1C1A18] hover:bg-[#6B604E] hover:text-white transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Carousel Viewport Wrapper with Subtle Narrow Fade Masks at extremes */}
          <div className="relative">
            {/* Left Edge Fade Mask - Much narrower so it does not obstruct photos */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-3 sm:w-5 lg:w-6 bg-gradient-to-r from-[#F5F3EF] to-transparent z-20" />
            {/* Right Edge Fade Mask - Much narrower */}
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-3 sm:w-5 lg:w-6 bg-gradient-to-l from-[#F5F3EF] to-transparent z-20" />

            {/* Continuous Scroll Viewport */}
            <div
              ref={scrollContainerRef}
              className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-none py-2 px-2 select-none cursor-grab active:cursor-grabbing"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {loopedPhotos.map((photo, index) => {
                const originalIndex = index % totalPhotos;
                return (
                  <div
                    key={`${photo.id}-${index}`}
                    onClick={() => setActiveModalIndex(originalIndex)}
                    className="group shrink-0 w-[300px] lg:w-[360px] bg-white rounded-2xl overflow-hidden border border-[#6B604E]/20 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col"
                  >
                    {/* Uniform 4:3 Aspect Ratio Image Container */}
                    <div className="relative aspect-4/3 w-full overflow-hidden bg-[#E5E1D8]">
                      <img
                        src={photo.src}
                        alt={photo.title}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      />

                      {/* Hover Overlay with Zoom Action */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                        <span className="inline-flex items-center gap-2 bg-[#8FC43E] text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span>Abrir en Grande</span>
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-1.5 bg-white">
                      <div>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6B604E] font-brand">
                          Instalaciones
                        </span>
                        <h3 className="font-brand font-medium text-base text-[#1C1A18] group-hover:text-[#6B604E] transition-colors leading-snug">
                          {photo.title}
                        </h3>
                      </div>
                      <p className="text-xs text-[#524D48] line-clamp-2 leading-relaxed">
                      {photo.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      </div>

      {/* Lightbox Modal (Fullscreen Zoom View) */}
      {activeModalIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveModalIndex(null)}
        >
          {/* Destello de papelitos explotando de festejos al abrir o cambiar imagen */}
          <ModalConfettiBurst triggerKey={activeModalIndex} />

          <div
            className="relative max-w-5xl w-full max-h-[92vh] flex flex-col items-center z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setActiveModalIndex(null)}
              className="absolute -top-12 right-0 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors focus:outline-none"
              aria-label="Cerrar vista completa"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={() =>
                setActiveModalIndex((activeModalIndex - 1 + totalPhotos) % totalPhotos)
              }
              className="absolute left-2 sm:-left-14 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-xs transition-all focus:outline-none hover:scale-110 active:scale-95"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={() =>
                setActiveModalIndex((activeModalIndex + 1) % totalPhotos)
              }
              className="absolute right-2 sm:-right-14 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-xs transition-all focus:outline-none hover:scale-110 active:scale-95"
              aria-label="Foto siguiente"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Active Fullscreen Image */}
            <div className="w-full bg-black/40 rounded-2xl overflow-hidden flex items-center justify-center max-h-[75vh]">
              <img
                src={photos[activeModalIndex].src}
                alt={photos[activeModalIndex].title}
                referrerPolicy="no-referrer"
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
              />
            </div>

            {/* Lightbox Caption */}
            <div className="w-full mt-4 text-center text-white space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8FC43E] bg-[#8FC43E]/20 px-3 py-1 rounded-full border border-[#8FC43E]/30">
                Instalaciones El Palmar
              </span>
              <h3 className="text-xl font-bold">
                {photos[activeModalIndex].title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-xl mx-auto">
                {photos[activeModalIndex].desc}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
