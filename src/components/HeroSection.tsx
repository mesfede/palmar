import React, { useState, useEffect, useRef } from 'react';
import { ASSETS } from '../assets/assetsIndex';
import {
  CalendarCheck,
  MapPin,
  Volume2,
  VolumeX,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

const SLIDE_TEXTS = [
  {
    tag: 'Villa Elisa • La Plata',
    title: 'El multiespacio perfecto para celebrar',
    subtitle: 'Cumpleaños infantiles, bautismos, comuniones y festejos familiares inolvidables.',
  },
  {
    tag: 'Diversión & Seguridad',
    title: 'Pelotero y plaza blanda para niños',
    subtitle: 'Espacio protegido con redes de contención, tobogán tubular y piso acolchado para que jueguen sin parar.',
  },
  {
    tag: 'Comodidad para Grandes',
    title: 'Living capitoné, vajilla y parrilla techada',
    subtitle: 'Asador equipado, mobiliario completo y salón climatizado con luz natural para disfrutar en familia.',
  },
  {
    tag: 'Momentos Mágicos',
    title: 'Espacio amplio para shows y animación',
    subtitle: 'Lugar ideal para títeres, música en vivo, baile, candy bar y el esperado momento de la torta.',
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn('Autoplay prevented by browser:', err);
          setIsPlaying(false);
        });
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDE_TEXTS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDE_TEXTS.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDE_TEXTS.length) % SLIDE_TEXTS.length);
  };

  const toggleVideoPlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleAudio = () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !isMuted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <section
      id="inicio"
      className="relative min-h-[85vh] lg:min-h-[88vh] flex items-center justify-center overflow-hidden bg-[#1C1A18] text-white"
    >
      {/* Background Video with Subtle Gradient Overlays */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          id="hero-background-video"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/palmar_video_poster.jpg"
          className="w-full h-full object-cover filter brightness-[1.0] contrast-[1.02]"
        >
          <source src={ASSETS.video} type="video/mp4" />
          <source src="/palmar_videook.mp4" type="video/mp4" />
        </video>
        {/* Soft, balanced gradient overlays to ensure text readability while letting the video shine */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A18]/90 via-black/35 to-black/25" />
      </div>

      {/* Floating Video Controls in top-right */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 shadow-lg">
        <button
          onClick={toggleAudio}
          className="p-1.5 rounded-full hover:bg-white/20 text-zinc-200 hover:text-white transition-colors"
          aria-label={isMuted ? 'Activar audio' : 'Silenciar'}
          title={isMuted ? 'Activar audio' : 'Silenciar'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#8FC43E]" />}
        </button>
        <div className="w-px h-3 bg-white/25" />
        <button
          onClick={toggleVideoPlay}
          className="p-1.5 rounded-full hover:bg-white/20 text-zinc-200 hover:text-white transition-colors"
          aria-label={isPlaying ? 'Pausar video' : 'Reproducir video'}
          title={isPlaying ? 'Pausar video' : 'Reproducir video'}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-[#8FC43E]" />}
        </button>
      </div>

      {/* Main Slide Content with smooth entrance animation */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 w-full text-left">
        <div className="space-y-6 max-w-3xl">
          {/* Top Location Badge */}
          <div
            key={`tag-${currentSlide}`}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#6B604E] text-white shadow-md transition-all duration-500 animate-in fade-in slide-in-from-top-2"
          >
            <MapPin className="w-3.5 h-3.5 text-[#8FC43E]" />
            <span className="text-xs sm:text-sm font-medium tracking-wide uppercase font-brand">
              {SLIDE_TEXTS[currentSlide].tag}
            </span>
          </div>

          {/* Animated Slide Title and Subtitle - Fino y Delicado */}
          <div className="min-h-[140px] sm:min-h-[170px] flex flex-col justify-center">
            <h1
              key={`title-${currentSlide}`}
              className="font-brand text-3xl sm:text-5xl lg:text-6xl font-light sm:font-normal tracking-tight leading-[1.18] text-white drop-shadow-md transition-all duration-700 ease-out animate-in fade-in slide-in-from-bottom-5"
            >
              {SLIDE_TEXTS[currentSlide].title}
            </h1>

            <p
              key={`sub-${currentSlide}`}
              className="text-base sm:text-xl text-zinc-200/95 mt-4 max-w-2xl font-light leading-relaxed drop-shadow transition-all duration-700 ease-out delay-150 animate-in fade-in slide-in-from-bottom-3"
            >
              {SLIDE_TEXTS[currentSlide].subtitle}
            </p>
          </div>

          {/* Main Call to Action Buttons with #6B604E integration */}
          <div className="pt-3 flex flex-wrap items-center gap-3">
            <button
              id="hero-cta-reservas"
              onClick={() => onNavigate('reservas')}
              className="inline-flex items-center justify-center gap-2.5 bg-[#8FC43E] hover:bg-[#7eaf35] text-white px-7 py-3.5 rounded-xl font-medium text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98] font-brand w-full sm:w-auto"
            >
              <CalendarCheck className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Consultar Disponibilidad</span>
            </button>
            <button
              id="hero-cta-lugar"
              onClick={() => onNavigate('el-lugar')}
              className="hidden sm:inline-flex items-center justify-center gap-2 bg-[#6B604E] hover:bg-[#5a5040] text-white px-6 py-3.5 rounded-xl font-medium text-sm sm:text-base shadow-md transition-all hover:scale-[1.02] font-brand border border-[#6B604E]"
            >
              <span>Ver Fotos del Salón</span>
            </button>
          </div>

          {/* Slide Navigation Dots & Arrows */}
          <div className="flex items-center gap-4 pt-6">
            <div className="flex items-center gap-2">
              {SLIDE_TEXTS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Ir al slide ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentSlide === idx
                      ? 'w-10 bg-[#8FC43E]'
                      : 'w-2.5 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-1.5 ml-3">
              <button
                onClick={prevSlide}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
                aria-label="Slide anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
                aria-label="Slide siguiente"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
