import React, { useState } from 'react';
import {
  HelpCircle,
  CalendarDays,
  Building2,
  PartyPopper,
  ChevronDown,
} from 'lucide-react';
import { VENUE_INFO } from '../data/venueData';
import lugar1Img from './palmar_lugar1.jpg';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  faqs: FaqItem[];
}

export const FaqSection: React.FC = () => {
  const [activeCategoryId, setActiveCategoryId] = useState<string>('reservas');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const CATEGORIES: FaqCategory[] = [
    {
      id: 'reservas',
      title: 'Alquiler y Reservas',
      description: 'Precios, horarios, señas y visitas previas',
      icon: <CalendarDays className="w-5 h-5" />,
      faqs: [
        {
          question: '¿Cuántas horas dura el alquiler del salón y qué turnos manejan?',
          answer:
            'Los alquileres estándar suelen contar con turnos de 3 a 4 horas de festejo más 30 a 60 minutos previos para que puedas ingresar a decorar y organizar todo con tranquilidad. Manejamos turnos de mediodía, tarde y noche según disponibilidad.',
        },
        {
          question: '¿Cómo se reserva una fecha y con cuánto se seña?',
          answer:
            'La reserva se realiza mediante el pago de una seña (por transferencia o en efectivo) que congela y asegura tu fecha en el calendario. El saldo restante se cancela antes o el día del evento.',
        },
        {
          question: '¿Podemos ir a conocer el multiespacio en persona antes de señar?',
          answer:
            '¡Claro que sí! Coordinamos una visita previa por WhatsApp para que puedas recorrer las instalaciones, ver el tamaño del espacio y resolver todas tus dudas en persona.',
        },
      ],
    },
    {
      id: 'instalaciones',
      title: 'Salón y Confort',
      description: 'Parrilla, cocina, climatización y seguridad',
      icon: <Building2 className="w-5 h-5" />,
      faqs: [
        {
          question: '¿Cuentan con parrilla, asador y cocina equipada?',
          answer:
            'Sí, disponemos de una parrilla techada completa y cómoda, heladeras/freezer para enfriar bebidas y tortas, horno/microondas y vajilla para el evento.',
        },
        {
          question: '¿El salón está climatizado y cuenta con medidas de seguridad?',
          answer:
            'Sí, el salón dispone de climatización frío/calor para que la temperatura sea ideal en cualquier época del año, además de salidas de emergencia, disyuntores y seguro de emergencias.',
        },
      ],
    },
    {
      id: 'juegos',
      title: 'Juegos y Catering',
      description: 'Pelotero, canchita, comida y animación propia',
      icon: <PartyPopper className="w-5 h-5" />,
      faqs: [
        {
          question: '¿Qué juegos e instalaciones para los chicos incluye el salón?',
          answer:
            'El salón cuenta con un pelotero gigante estructural, laberinto de juegos con redes de seguridad, inflable tipo castillo/tobogán, mini cancha de fútbol con césped sintético y zona blanda/espacio de recreación para los más chiquitos.',
        },
        {
          question: '¿Podemos llevar nuestra propia comida, torta y bebidas?',
          answer:
            '¡Sí, totalmente! Podés traer el catering, comida hecha en casa, bebidas y la torta de cumpleaños que prefieras. Además, podés contratar el servicio de catering o animación externo de tu confianza.',
        },
      ],
    },
  ];

  const activeCategory = CATEGORIES.find((cat) => cat.id === activeCategoryId) || CATEGORIES[0];

  const handleCategoryChange = (id: string) => {
    setActiveCategoryId(id);
    setOpenFaqIndex(0); // Abre la primera pregunta por defecto de la nueva categoría
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faq"
      className="py-20 md:py-28 bg-[#F4EFE7] relative overflow-hidden"
    >
      {/* Background Architectural Structure */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={lugar1Img}
          alt="Estructura frontal El Palmar"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-[18%_55%] scale-105 filter brightness-[1.04] contrast-[1.12]"
        />
        {/* Harmonious Light Warm Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF9F6] via-[#F4EFE7]/88 via-35% to-[#EAE4D8]/95" />
        {/* Subtle diagonal lighting accent */}
        <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-[#F4EFE7]/35 to-[#FAF9F6]/80" />
      </div>

      {/* Ambient Soft Glows */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#8FC43E]/10 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#6B604E]/10 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#6B604E] text-white shadow-xs text-xs font-medium uppercase tracking-wider font-brand">
            <HelpCircle className="w-3.5 h-3.5 text-white" />
            <span>Preguntas Frecuentes</span>
          </div>
          <h2 className="font-brand text-3xl sm:text-4xl font-normal sm:font-medium text-[#1C1A18] tracking-tight">
            Todo lo que Necesitás Saber sobre <span className="text-[#6B604E] font-medium">El Palmar</span>
          </h2>
          <p className="text-base text-[#524D48] leading-relaxed max-w-2xl mx-auto font-light">
            Respuestas a las dudas más habituales sobre el alquiler del salón, instalaciones, juegos y reservas.
          </p>
        </div>

        {/* Option 1 Layout - Split Interactive Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Category Selector */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-3">
            {/* Mobile layout: horizontal scroll pills */}
            <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible pb-3 lg:pb-0 gap-2 sm:gap-3 scrollbar-none snap-x -mx-4 px-4 lg:mx-0 lg:px-0">
              {CATEGORIES.map((cat) => {
                const isActive = cat.id === activeCategoryId;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`flex items-center gap-3.5 px-5 py-4 rounded-2xl border text-left shrink-0 transition-all duration-300 snap-center focus:outline-none w-72 sm:w-80 lg:w-full ${
                      isActive
                        ? 'bg-white border-[#6B604E] text-[#1C1A18] shadow-sm'
                        : 'bg-white/40 border-[#6B604E]/10 hover:border-[#6B604E]/30 text-[#524D48] hover:bg-white/60'
                    }`}
                  >
                    <div
                      className={`p-2.5 rounded-xl transition-all duration-300 ${
                        isActive ? 'bg-[#8FC43E]/10 text-[#6B604E]' : 'bg-[#6B604E]/5 text-[#6B604E]/70'
                      }`}
                    >
                      {cat.icon}
                    </div>
                    <div className="min-w-0">
                      <h4 className={`text-sm font-semibold font-brand ${isActive ? 'text-[#1C1A18]' : 'text-[#1C1A18]/80'}`}>
                        {cat.title}
                      </h4>
                      <p className="text-[11px] text-[#524D48]/70 font-light truncate mt-0.5">
                        {cat.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Accordion list for selected category */}
          <div className="lg:col-span-8 space-y-3.5 min-h-[300px]">
            {activeCategory.faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white/85 backdrop-blur-xs rounded-2xl border border-[#6B604E]/15 overflow-hidden shadow-2xs transition-all duration-200"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left px-5 sm:px-6 py-4.5 flex items-center justify-between gap-4 hover:bg-[#FAF9F6]/50 transition-colors focus:outline-none cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <h3 className="font-brand text-sm sm:text-base font-medium text-[#1C1A18] leading-relaxed">
                      {faq.question}
                    </h3>
                    <div
                      className={`p-1.5 rounded-full bg-[#F5F3EF] text-[#1C1A18] shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 bg-[#8FC43E]/20 text-[#6B604E]' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-[13.5px] text-[#524D48] leading-relaxed border-t border-[#6B604E]/10 bg-white/40">
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
