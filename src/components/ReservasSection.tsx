import React, { useState } from 'react';
import { VENUE_INFO, EVENT_TYPES, TIME_SLOTS } from '../data/venueData';
import { ReservationFormData } from '../types';
import lugar1Img from './palmar_lugar1.jpg';
import globosImg from './vippe globos.jpg';
import playerImg from './player.jpg';
import {
  CalendarCheck,
  MessageCircle,
  Clock,
  Users,
  Sparkles,
  Phone,
  Send,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sun,
  Sunset,
  Moon,
  Info,
} from 'lucide-react';

export const ReservasSection: React.FC = () => {
  const [formData, setFormData] = useState<ReservationFormData>({
    fullName: '',
    phone: '',
    eventType: EVENT_TYPES[0],
    date: '',
    timeSlot: TIME_SLOTS[0],
    guestCount: '30-40 personas',
    includedServices: [],
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Calendar State: Default to current or upcoming month
  const today = new Date();
  const [calendarDate, setCalendarDate] = useState<Date>(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDay, setSelectedDay] = useState<number | null>(today.getDate());

  // Exact requested services options with their logos
  const availableServices = [
    {
      id: '@vipeglobos.villaelisa - decoracion de globos',
      instagram: '@vipeglobos.villaelisa',
      title: 'Decoración de Globos',
      image: globosImg,
    },
    {
      id: '@playersonido - SONIDO/ ILUMINACIÓN/ FPV DRON VIDEO/ DJ.',
      instagram: '@playersonido',
      title: 'Sonido, Iluminación & DJ',
      image: playerImg,
    },
  ];

  const handleServiceToggle = (serviceId: string) => {
    setFormData((prev) => {
      const exists = prev.includedServices.includes(serviceId);
      if (exists) {
        return {
          ...prev,
          includedServices: prev.includedServices.filter((s) => s !== serviceId),
        };
      } else {
        return {
          ...prev,
          includedServices: [...prev.includedServices, serviceId],
        };
      }
    });
  };

  const generateWhatsAppMessage = () => {
    const dateFormatted = formData.date ? formData.date : 'A coordinar';
    const servicesText =
      formData.includedServices.length > 0
        ? formData.includedServices.join(', ')
        : 'A definir';

    // Using standard ASCII list hyphens to guarantee 100% error-free text on all devices and WhatsApp versions
    return (
      `¡Hola El Palmar Multiespacio! Me gustaría consultar disponibilidad para un evento.\n\n` +
      `- *Nombre:* ${formData.fullName || 'No especificado'}\n` +
      `- *Tipo de Evento:* ${formData.eventType}\n` +
      `- *Fecha Deseada:* ${dateFormatted}\n` +
      `- *Turno / Horario:* ${formData.timeSlot}\n` +
      `- *Invitados estimados:* ${formData.guestCount}\n` +
      `- *Servicios de interés:* ${servicesText}\n` +
      (formData.message ? `- *Consulta adicional:* ${formData.message}\n` : '') +
      `\n¡Muchas gracias!`
    );
  };

  const handleWhatsAppSend = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const message = generateWhatsAppMessage();
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${VENUE_INFO.phoneRaw}?text=${encoded}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      window.open(url, '_blank', 'noopener,noreferrer');
    }, 400);
  };

  // Calendar Helpers
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
  ];
  const dayLabels = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'];

  const currentYear = calendarDate.getFullYear();
  const currentMonthIndex = calendarDate.getMonth();
  const daysInMonth = new Date(currentYear, currentMonthIndex + 1, 0).getDate();
  const firstDayIndex = (new Date(currentYear, currentMonthIndex, 1).getDay() + 6) % 7; // Monday = 0

  const handlePrevMonth = () => {
    setCalendarDate(new Date(currentYear, currentMonthIndex - 1, 1));
    setSelectedDay(null);
  };

  const handleNextMonth = () => {
    setCalendarDate(new Date(currentYear, currentMonthIndex + 1, 1));
    setSelectedDay(null);
  };

  // Deterministic availability status generator based on date for realistic simulation
  const getDayAvailability = (day: number) => {
    // Weekends (Friday, Saturday, Sunday) are high demand
    const dayOfWeek = (firstDayIndex + day - 1) % 7;
    const seed = (currentYear * 12 + currentMonthIndex) * 31 + day;
    
    // Check if in past
    const checkDate = new Date(currentYear, currentMonthIndex, day);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    if (checkDate < now) {
      return { status: 'past', label: 'Pasado', spots: 0, slots: [] };
    }

    if (dayOfWeek === 5 || dayOfWeek === 6) {
      // Sat / Sun: mostly booked or 1 spot left
      if (seed % 3 === 0) {
        return {
          status: 'few',
          label: '1 lugar',
          spots: 1,
          slots: [TIME_SLOTS[0]],
        };
      } else if (seed % 3 === 1) {
        return {
          status: 'booked',
          label: 'Completo',
          spots: 0,
          slots: [],
        };
      }
      return {
        status: 'available',
        label: '2 lugares',
        spots: 2,
        slots: [TIME_SLOTS[0], TIME_SLOTS[2]],
      };
    } else if (dayOfWeek === 4) {
      // Friday
      if (seed % 4 === 0) {
        return {
          status: 'few',
          label: '1 lugar',
          spots: 1,
          slots: [TIME_SLOTS[1]],
        };
      }
      return {
        status: 'available',
        label: '2 lugares',
        spots: 2,
        slots: [TIME_SLOTS[0], TIME_SLOTS[1]],
      };
    } else {
      // Mon - Thu
      if (seed % 7 === 0) {
        return {
          status: 'booked',
          label: 'Completo',
          spots: 0,
          slots: [],
        };
      }
      return {
        status: 'available',
        label: 'Disponible',
        spots: 3,
        slots: [TIME_SLOTS[0], TIME_SLOTS[1], TIME_SLOTS[2]],
      };
    }
  };

  const handleDaySelect = (day: number) => {
    const availability = getDayAvailability(day);
    if (availability.status === 'past' || availability.status === 'booked') return;
    
    setSelectedDay(day);
    const monthStr = String(currentMonthIndex + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    const formattedDate = `${currentYear}-${monthStr}-${dayStr}`;
    
    setFormData((prev) => ({
      ...prev,
      date: formattedDate,
      timeSlot: availability.slots[0] || prev.timeSlot,
    }));
  };

  const activeDayAvailability = selectedDay ? getDayAvailability(selectedDay) : null;

  return (
    <section
      id="reservas"
      className="py-20 md:py-28 bg-[#E2D5C2] relative overflow-hidden"
    >
      {/* Background Architectural Structure (El frente del local 'al corte' con líneas blancas y sombras) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={lugar1Img}
          alt="Estructura El Palmar"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-[78%_22%] scale-105 filter brightness-[1.05] contrast-[1.12]"
        />
        {/* Harmonious Warm Gradient Overlay 'al corte' - reveals white structural lines */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#ECE3D4] via-[#E2D5C2]/85 via-42% to-[#D5C4AD]/95" />
        {/* Dynamic diagonal warm light highlighting the architectural cut */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#E2D5C2]/30 to-[#ECE3D4]/80" />
      </div>

      {/* Ambient Warm & Brand Tone Highlights */}
      <div className="absolute -top-12 left-1/3 w-[500px] h-[500px] bg-[#8FC43E]/12 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute -bottom-10 right-10 w-[450px] h-[450px] bg-[#6B604E]/15 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#6B604E] text-white shadow-xs text-xs font-medium uppercase tracking-wider font-brand">
            <CalendarCheck className="w-4 h-4 text-white" />
            <span>Disponibilidad & Reservas</span>
          </div>
          <h2 className="font-brand text-3xl sm:text-5xl font-normal sm:font-medium text-[#1C1A18] tracking-tight">
            Consultá tu Fecha en <span className="text-[#6B604E] font-medium">El Palmar</span>
          </h2>
          <p className="text-sm sm:text-base text-[#524D48] leading-relaxed max-w-2xl mx-auto font-light">
            Mirá los turnos y días libres en nuestro calendario en tiempo real, elegí la fecha deseada y envianos tu consulta directa por WhatsApp.
          </p>
        </div>

        {/* 2-Column Responsive Layout: Calendar on Left, Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* COLUMN 1: CALENDARIO DE DISPONIBILIDAD */}
          <div className="lg:col-span-5 bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-7 border-t-4 border-t-[#6B604E] border border-[#6B604E]/25 shadow-lg space-y-5">
            {/* Calendar Title & Month Navigation */}
            <div className="flex items-center justify-between pb-3 border-b border-[#6B604E]/15">
              <div>
                <span className="text-[11px] font-semibold text-[#6B604E] uppercase tracking-wider font-brand">
                  Lugares Disponibles
                </span>
                <h3 className="font-brand text-lg sm:text-xl font-medium text-[#1C1A18] capitalize">
                  {monthNames[currentMonthIndex]} {currentYear}
                </h3>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  className="p-2 rounded-xl text-[#6B604E] hover:bg-[#6B604E]/10 active:bg-[#6B604E]/20 transition-colors"
                  aria-label="Mes anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="p-2 rounded-xl text-[#6B604E] hover:bg-[#6B604E]/10 active:bg-[#6B604E]/20 transition-colors"
                  aria-label="Mes siguiente"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-[#6B604E] font-brand">
              {dayLabels.map((lbl, idx) => (
                <div key={idx} className="py-1">
                  {lbl}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
              {/* Empty leading days */}
              {Array.from({ length: firstDayIndex }).map((_, idx) => (
                <div key={`empty-${idx}`} className="h-10 sm:h-11" />
              ))}

              {/* Month Days */}
              {Array.from({ length: daysInMonth }).map((_, idx) => {
                const day = idx + 1;
                const avail = getDayAvailability(day);
                const isSelected = selectedDay === day;

                let badgeColor = 'bg-emerald-500';
                let cellBg = 'bg-[#FAF8F5] hover:bg-[#6B604E]/10 text-[#1C1A18]';

                if (avail.status === 'past') {
                  badgeColor = 'bg-zinc-300';
                  cellBg = 'bg-zinc-100/60 text-zinc-300 cursor-not-allowed';
                } else if (avail.status === 'booked') {
                  badgeColor = 'bg-rose-400';
                  cellBg = 'bg-rose-50/50 text-zinc-400 cursor-not-allowed';
                } else if (avail.status === 'few') {
                  badgeColor = 'bg-amber-400';
                  cellBg = 'bg-amber-50/50 hover:bg-amber-100/60 text-[#1C1A18]';
                }

                if (isSelected) {
                  cellBg = 'bg-[#6B604E] text-white shadow-md ring-2 ring-[#6B604E]/40 font-semibold';
                }

                return (
                  <button
                    key={`day-${day}`}
                    type="button"
                    onClick={() => handleDaySelect(day)}
                    disabled={avail.status === 'past' || avail.status === 'booked'}
                    className={`h-10 sm:h-11 rounded-xl flex flex-col items-center justify-center relative transition-all text-xs font-medium font-brand ${cellBg}`}
                  >
                    <span>{day}</span>
                    {avail.status !== 'past' && (
                      <span
                        className={`w-1.5 h-1.5 rounded-full mt-0.5 ${
                          isSelected ? 'bg-white' : badgeColor
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Calendar Legend */}
            <div className="flex items-center justify-between pt-3 border-t border-[#6B604E]/15 text-[11px] text-[#524D48] font-brand flex-wrap gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                <span>Disponible (3 turnos)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0" />
                <span>Último lugar</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400 shrink-0" />
                <span>Completo</span>
              </div>
            </div>

            {/* Selected Date Turn Details Box */}
            {selectedDay && activeDayAvailability && activeDayAvailability.status !== 'booked' && activeDayAvailability.status !== 'past' && (
              <div className="p-4 rounded-2xl bg-[#6B604E]/10 border border-[#6B604E]/25 space-y-2.5 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#6B604E] font-brand uppercase tracking-wider">
                    Turnos Libres para el {selectedDay} de {monthNames[currentMonthIndex]}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#8FC43E] text-white font-bold">
                    {activeDayAvailability.label}
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  {activeDayAvailability.slots.map((slot, sIdx) => {
                    const isSlotSelected = formData.timeSlot === slot;
                    return (
                      <button
                        key={sIdx}
                        type="button"
                        onClick={() => setFormData({ ...formData, timeSlot: slot })}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                          isSlotSelected
                            ? 'bg-[#6B604E] text-white shadow-xs'
                            : 'bg-white text-[#1C1A18] hover:bg-[#6B604E]/10 border border-[#6B604E]/20'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {slot.includes('Mañana') ? (
                            <Sun className="w-3.5 h-3.5" />
                          ) : slot.includes('Tarde') ? (
                            <Sunset className="w-3.5 h-3.5" />
                          ) : (
                            <Moon className="w-3.5 h-3.5" />
                          )}
                          <span>{slot}</span>
                        </div>
                        <span className="text-[11px] font-bold">
                          {isSlotSelected ? '✓ Seleccionado' : 'Elegir'}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <p className="text-[11px] text-[#524D48] leading-tight flex items-center gap-1 pt-1 font-light">
                  <Info className="w-3.5 h-3.5 text-[#6B604E] shrink-0" />
                  <span>Al hacer click en el turno se autocompleta en el formulario contiguo.</span>
                </p>
              </div>
            )}
          </div>

          {/* COLUMN 2: FORMULARIO DE CONSULTA */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border-t-4 border-t-[#6B604E] border border-[#6B604E]/25 shadow-lg">
            <form onSubmit={handleWhatsAppSend} className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                <h3 className="font-brand text-xl font-medium text-[#1C1A18]">
                  Datos de tu Festejo
                </h3>
                <span className="text-xs text-[#6B604E] font-medium font-brand">
                  Atención personalizada
                </span>
              </div>

              {/* Event Type & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#1C1A18] uppercase tracking-wider mb-2 font-brand">
                    Tipo de Evento *
                  </label>
                  <select
                    id="reserva-tipo-evento"
                    value={formData.eventType}
                    onChange={(e) =>
                      setFormData({ ...formData, eventType: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-[#F9F8F6] border border-[#B1A89F]/40 text-[#1C1A18] text-sm focus:outline-none focus:ring-2 focus:ring-[#6B604E]"
                  >
                    {EVENT_TYPES.map((type, i) => (
                      <option key={i} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#1C1A18] uppercase tracking-wider mb-2 font-brand">
                    Fecha Deseada
                  </label>
                  <input
                    type="date"
                    id="reserva-fecha"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-[#F9F8F6] border border-[#B1A89F]/40 text-[#1C1A18] text-sm focus:outline-none focus:ring-2 focus:ring-[#6B604E]"
                  />
                </div>
              </div>

              {/* Time Slot & Guest Count */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#1C1A18] uppercase tracking-wider mb-2 flex items-center gap-1.5 font-brand">
                    <Clock className="w-3.5 h-3.5 text-[#6B604E]" />
                    <span>Turno / Franja Horaria</span>
                  </label>
                  <select
                    id="reserva-turno"
                    value={formData.timeSlot}
                    onChange={(e) =>
                      setFormData({ ...formData, timeSlot: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-[#F9F8F6] border border-[#B1A89F]/40 text-[#1C1A18] text-sm focus:outline-none focus:ring-2 focus:ring-[#6B604E]"
                  >
                    {TIME_SLOTS.map((slot, i) => (
                      <option key={i} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#1C1A18] uppercase tracking-wider mb-2 flex items-center gap-1.5 font-brand">
                    <Users className="w-3.5 h-3.5 text-[#6B604E]" />
                    <span>Cantidad de Invitados</span>
                  </label>
                  <select
                    id="reserva-invitados"
                    value={formData.guestCount}
                    onChange={(e) =>
                      setFormData({ ...formData, guestCount: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-[#F9F8F6] border border-[#B1A89F]/40 text-[#1C1A18] text-sm focus:outline-none focus:ring-2 focus:ring-[#6B604E]"
                  >
                    <option value="Hasta 25 personas">Hasta 25 personas</option>
                    <option value="25 a 40 personas">25 a 40 personas</option>
                    <option value="40 a 60 personas">40 a 60 personas</option>
                    <option value="Más de 60 personas">Más de 60 personas</option>
                  </select>
                </div>
              </div>

              {/* Instalación y Servicios de Interés */}
              <div className="bg-[#FAF9F6] p-4.5 sm:p-5 rounded-2xl border border-[#6B604E]/15 shadow-2xs space-y-3">
                <div className="flex flex-col">
                  <label className="block text-xs font-bold text-[#1C1A18] uppercase tracking-wider font-brand">
                    Instalación y Servicios de Interés
                  </label>
                  <p className="text-[10.5px] text-[#524D48] font-light mt-0.5">
                    Servicios opcionales premium para sumar a tu festejo:
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {availableServices.map((service, i) => {
                    const isChecked = formData.includedServices.includes(service.id);
                    return (
                      <button
                        type="button"
                        key={i}
                        onClick={() => handleServiceToggle(service.id)}
                        className={`p-3 sm:p-3.5 rounded-xl text-xs font-medium text-left border transition-all flex items-center gap-3.5 font-brand cursor-pointer select-none w-full ${
                          isChecked
                            ? 'bg-white border-[#6B604E] text-[#3c362b] shadow-sm ring-1 ring-[#6B604E]/25'
                            : 'bg-white border-[#B1A89F]/30 text-[#4A4540] hover:border-[#6B604E]/50 hover:bg-white/80'
                        }`}
                      >
                        {/* Checkbox indicator */}
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center text-xs shrink-0 ${
                            isChecked
                              ? 'bg-[#6B604E] text-white font-bold'
                              : 'border border-[#B1A89F]/60 bg-[#F9F8F6]'
                          }`}
                        >
                          {isChecked && '✓'}
                        </div>
                        
                        {/* Logo Image */}
                        <img
                          src={service.image}
                          alt={`Logo ${service.title}`}
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 rounded-full object-cover border border-[#6B604E]/15 shrink-0"
                        />
                        
                        {/* Text and handle */}
                        <div className="min-w-0">
                          <h4 className="font-bold text-xs text-[#1C1A18] leading-tight">
                            {service.title}
                          </h4>
                          <span className="text-[9.5px] font-medium text-[#8FC43E] mt-0.5 block truncate">
                            {service.instagram}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#1C1A18] uppercase tracking-wider mb-2 font-brand">
                    Tu Nombre y Apellido
                  </label>
                  <input
                    type="text"
                    id="reserva-nombre"
                    placeholder="Ej. Martín Pérez"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-[#F9F8F6] border border-[#B1A89F]/40 text-[#1C1A18] text-sm focus:outline-none focus:ring-2 focus:ring-[#6B604E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#1C1A18] uppercase tracking-wider mb-2 flex items-center gap-1.5 font-brand">
                    <Phone className="w-3.5 h-3.5 text-[#6B604E]" />
                    <span>Teléfono / WhatsApp</span>
                  </label>
                  <input
                    type="tel"
                    id="reserva-telefono"
                    placeholder="Ej. 221 420-4507"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-[#F9F8F6] border border-[#B1A89F]/40 text-[#1C1A18] text-sm focus:outline-none focus:ring-2 focus:ring-[#6B604E]"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-medium text-[#1C1A18] uppercase tracking-wider mb-2 font-brand">
                  Mensaje o Consulta Adicional (Opcional)
                </label>
                <textarea
                  id="reserva-mensaje"
                  rows={2}
                  placeholder="¿Querés consultar por temática, horario especial o visita previa?"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-[#F9F8F6] border border-[#B1A89F]/40 text-[#1C1A18] text-sm focus:outline-none focus:ring-2 focus:ring-[#6B604E]"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                id="btn-enviar-whatsapp-reserva"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#8FC43E] hover:bg-[#7eaf35] text-white py-4 rounded-xl font-medium text-base shadow-md hover:shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-75 font-brand"
              >
                <MessageCircle className="w-5 h-5" />
                <span>
                  {isSubmitting
                    ? 'Preparando WhatsApp...'
                    : 'Enviar Consulta Directa por WhatsApp'}
                </span>
                <Send className="w-4 h-4 ml-1" />
              </button>

              {submitted && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-[#8FC43E]/15 border border-[#8FC43E]/30 text-[#4c7512] text-xs font-medium font-brand">
                  <CheckCircle2 className="w-4 h-4 text-[#8FC43E]" />
                  <span>¡Consulta generada con éxito! Abriendo WhatsApp...</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
