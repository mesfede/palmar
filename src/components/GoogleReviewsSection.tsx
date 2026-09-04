import React from 'react';
import { Star, MessageSquare, ExternalLink } from 'lucide-react';
import { VENUE_INFO } from '../data/venueData';
import lugar1Img from './palmar_lugar1.jpg';

interface GoogleReview {
  id: string;
  name: string;
  role: string;
  rating: number;
  date: string;
  comment: string;
  event: string;
}

const REVIEWS: GoogleReview[] = [
  {
    id: '1',
    name: 'Mariana Gomez',
    role: 'Cumpleaños infantil 5 años',
    rating: 5,
    date: 'Hace 3 semanas',
    comment:
      'Hermoso lugar para festejar. El pelotero y el inflable son gigantes y súper seguros para los chicos. El salón estaba impecable, muy buena climatización y los dueños súper atentos a cada detalle. 100% recomendable.',
    event: 'Cumpleaños Infantil',
  },
  {
    id: '2',
    name: 'Esteban R.',
    role: 'Festejo familiar y asado',
    rating: 5,
    date: 'Hace 1 mes',
    comment:
      'Festejamos el cumple de mi hija y quedamos encantados. La parrilla techada es un lujo, muy cómoda y con todo a mano. Los adultos estuvimos comodísimos en los livings mientras los nenes jugaban sin parar.',
    event: 'Festejo Familiar',
  },
  {
    id: '3',
    name: 'Carla Silvestri',
    role: 'Bautismo y Almuerzo',
    rating: 5,
    date: 'Hace 2 meses',
    comment:
      'Excelente atención y cordialidad de los dueños. El espacio es amplio, luminoso y con vajilla y mantelería súper completa. Todos los invitados nos felicitaron por la elección del salón en Villa Elisa.',
    event: 'Bautismo',
  },
  {
    id: '4',
    name: 'Federico Alvarez',
    role: 'Cumpleaños infantil 8 años',
    rating: 5,
    date: 'Hace 2 meses',
    comment:
      'La mejor opción en Villa Elisa para cumples. El laberinto con pelotero y la cancha de fútbol mantienen a todos los chicos entretenidos todo el tiempo. Muy limpio y seguro.',
    event: 'Cumpleaños Infantil',
  },
];

export const GoogleReviewsSection: React.FC = () => {
  return (
    <section
      id="resenas"
      className="py-20 md:py-28 bg-[#E8E4DA] relative overflow-hidden"
    >
      {/* Background Architectural Structure (Estructura frontal del local 'al corte' en tono piedra) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={lugar1Img}
          alt="Estructura El Palmar"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-[50%_40%] scale-105 filter brightness-[1.03] contrast-[1.1]"
        />
        {/* Harmonious Stone Linen Gradient Overlay - reveals white architectural lines softly */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F3F1EC] via-[#E8E4DA]/88 via-40% to-[#DDD7CB]/95" />
      </div>

      {/* Soft Ambient Radiance */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-[#8FC43E]/10 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#6B604E]/10 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Google Badge */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-4xl flex-1">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#6B604E] text-white shadow-xs text-xs font-medium uppercase tracking-wider font-brand">
              <MessageSquare className="w-3.5 h-3.5 text-white" />
              <span>Opiniones Reales</span>
            </div>
            <h2 className="font-brand text-2xl sm:text-3xl lg:text-[32px] xl:text-[36px] font-normal sm:font-medium text-[#1C1A18] tracking-tight whitespace-normal lg:whitespace-nowrap">
              Lo que Dicen Quienes Ya Festejaron en <span className="text-[#6B604E] font-medium">El Palmar</span>
            </h2>
            <p className="text-base text-[#524D48] leading-relaxed font-light">
              Comentarios y experiencias reales compartidas por familias en Google Maps sobre sus festejos en El Palmar.
            </p>
          </div>

          {/* Google Score Summary Card */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#6B604E]/20 shadow-xs flex items-center gap-4 shrink-0">
            {/* Google G logo stylized */}
            <div className="w-12 h-12 rounded-xl bg-white border border-zinc-200 shadow-2xs flex items-center justify-center font-black text-xl text-blue-600">
              <span className="bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 bg-clip-text text-transparent font-bold">
                G
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-brand text-2xl font-medium text-[#1C1A18]">4.9</span>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <span className="text-xs text-[#7A746E] font-medium">
                Calificación en Google Maps
              </span>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-6 border border-[#6B604E]/20 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Header: Stars & Date */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#7A746E] font-medium">
                    {review.date}
                  </span>
                </div>

                {/* Comment */}
                <p className="text-sm text-[#3E3A36] leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              {/* Author & Event Tag */}
              <div className="pt-3 border-t border-[#6B604E]/15 flex items-center justify-between">
                <div>
                  <h4 className="font-brand font-medium text-sm text-[#1C1A18]">
                    {review.name}
                  </h4>
                  <span className="text-[11px] text-[#6B604E] font-normal">
                    {review.role}
                  </span>
                </div>
                <span className="text-[10px] bg-[#FAF9F6] text-[#6B604E] px-2 py-1 rounded-md border border-[#6B604E]/20 font-medium font-brand">
                  {review.event}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Link to Google Maps */}
        <div className="mt-10 text-center">
          <a
            href={VENUE_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1C1A18] hover:text-[#8FC43E] bg-white border border-[#B1A89F]/30 px-5 py-2.5 rounded-full shadow-2xs transition-all hover:scale-105"
          >
            <span>Ver más opiniones y fotos en Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#8FC43E]" />
          </a>
        </div>
      </div>
    </section>
  );
};
