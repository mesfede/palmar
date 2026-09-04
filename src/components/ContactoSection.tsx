import React from 'react';
import { VENUE_INFO } from '../data/venueData';
import { ASSETS } from '../assets/assetsIndex';
import lugar1Img from './palmar_lugar1.jpg';
import {
  MapPin,
  Phone,
  Instagram,
  Navigation,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';

export const ContactoSection: React.FC = () => {
  return (
    <section
      id="contacto"
      className="relative pt-28 pb-16 overflow-hidden bg-[#EAE4D8]"
    >
      {/* Background Image (palmar_lugar1.jpg) */}
      <div className="absolute inset-0 z-0">
        <img
          src={lugar1Img}
          alt="Salón El Palmar"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[0.95] contrast-[1.05]"
        />
        {/* Harmonious Continuous Multi-Stage Gradient Overlay without cut lines */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#EAE4D8] via-[#F4EFE6]/88 via-30% via-[#574E3E]/65 via-65% to-[#1C1A18]/95" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#6B604E] text-white text-xs font-medium uppercase tracking-wider shadow-xs font-brand">
            <MapPin className="w-4 h-4 text-white" />
            <span>Ubicación & Contacto</span>
          </div>
          <h2 className="font-brand text-3xl sm:text-5xl font-normal sm:font-medium text-[#1C1A18] tracking-tight">
            Vení a Conocer <span className="text-[#6B604E] font-medium">El Palmar</span>
          </h2>
          <p className="text-base sm:text-lg text-[#524D48] leading-relaxed max-w-2xl mx-auto font-light">
            Estamos ubicados en Villa Elisa, La Plata. Encontranos fácilmente en el mapa o comunicate con nosotros para coordinar tu visita.
          </p>
        </div>

        {/* Contact Details & Interactive Google Maps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Direct Info Cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {/* Address card */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 border border-[#B1A89F]/30 shadow-md text-[#1C1A18] transition-all hover:shadow-lg">
              <div className="flex items-start gap-4">
                <div className="p-3.5 rounded-xl bg-[#8FC43E]/15 text-[#4c7512] shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#7A746E]">
                    Dirección
                  </span>
                  <h4 className="text-lg font-bold text-[#1C1A18]">
                    {VENUE_INFO.address}
                  </h4>
                  <p className="text-xs text-[#4c7512] font-semibold">
                    Villa Elisa, La Plata, Provincia de Buenos Aires
                  </p>
                  <div className="pt-3">
                    <a
                      href={VENUE_INFO.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1C1A18] hover:text-[#4c7512] transition-colors"
                    >
                      <Navigation className="w-3.5 h-3.5 text-[#8FC43E]" />
                      <span>Abrir en Google Maps</span>
                      <ExternalLink className="w-3 h-3 text-[#B1A89F]" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone & WhatsApp card */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 border border-[#B1A89F]/30 shadow-md text-[#1C1A18] transition-all hover:shadow-lg">
              <div className="flex items-start gap-4">
                <div className="p-3.5 rounded-xl bg-[#8FC43E]/15 text-[#4c7512] shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#7A746E]">
                    Teléfono & WhatsApp
                  </span>
                  <h4 className="text-lg font-bold text-[#1C1A18]">
                    {VENUE_INFO.phone}
                  </h4>
                  <p className="text-xs text-[#524D48]">
                    Consultas directas de disponibilidad y coordinación de visitas.
                  </p>
                  <div className="pt-3 flex items-center gap-3">
                    <a
                      href={`https://wa.me/${VENUE_INFO.phoneRaw}?text=${encodeURIComponent(
                        '¡Hola! Me gustaría coordinar una visita para conocer las instalaciones de El Palmar.'
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#8FC43E] hover:bg-[#7eaf35] px-4 py-2.5 rounded-xl shadow-xs transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Escribir por WhatsApp</span>
                    </a>
                    <a
                      href={`tel:${VENUE_INFO.phone}`}
                      className="text-xs font-bold text-[#1C1A18] hover:text-[#4c7512] transition-colors"
                    >
                      Llamar
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Instagram card */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 border border-[#B1A89F]/30 shadow-md text-[#1C1A18] transition-all hover:shadow-lg">
              <div className="flex items-start gap-4">
                <div className="p-3.5 rounded-xl bg-[#8FC43E]/15 text-[#4c7512] shrink-0">
                  <Instagram className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#7A746E]">
                    Redes Sociales
                  </span>
                  <h4 className="text-lg font-bold text-[#1C1A18]">
                    {VENUE_INFO.instagramUser}
                  </h4>
                  <p className="text-xs text-[#524D48]">
                    Fotos, videos y novedades de los últimos festejos.
                  </p>
                  <div className="pt-3">
                    <a
                      href={VENUE_INFO.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1C1A18] hover:text-[#4c7512] transition-colors"
                    >
                      <span>Seguinos en Instagram</span>
                      <ExternalLink className="w-3 h-3 text-[#B1A89F]" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Embedded Google Maps (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-4 sm:p-5 border border-[#B1A89F]/30 shadow-xl flex flex-col min-h-[420px] text-[#1C1A18]">
            <div className="flex items-center justify-between pb-3 px-2 border-b border-zinc-200 mb-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#4c7512]">
                <MapPin className="w-4 h-4 text-[#8FC43E]" />
                <span>Ubicación en Google Maps</span>
              </div>
              <a
                href={VENUE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#1C1A18] hover:text-[#4c7512] transition-colors"
              >
                <span>Cómo llegar</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#8FC43E]" />
              </a>
            </div>

            {/* Google Maps iFrame */}
            <div className="flex-1 w-full rounded-2xl overflow-hidden min-h-[350px] bg-zinc-100 relative">
              <iframe
                title="Mapa de Ubicación El Palmar Multiespacio"
                src="https://maps.google.com/maps?q=-34.85968674444208,-58.08683794602629&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '350px' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
