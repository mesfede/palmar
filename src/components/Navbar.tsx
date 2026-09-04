import React, { useState, useEffect } from 'react';
import { ASSETS } from '../assets/assetsIndex';
import {
  Home,
  Building2,
  PartyPopper,
  CalendarCheck,
  HelpCircle,
  MapPin,
  Menu,
  X,
} from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger scroll state smoothly when page moves down
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'el-lugar', label: 'El Lugar', icon: Building2 },
    { id: 'festejos', label: 'Así son los Festejos', icon: PartyPopper },
    { id: 'reservas', label: 'Reservas', icon: CalendarCheck },
    { id: 'faq', label: 'Preguntas', icon: HelpCircle },
    { id: 'contacto', label: 'Contacto', icon: MapPin },
  ];

  // Primary tabs for mobile bottom app bar with Reservar featured in the center
  const mobileTabs = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'el-lugar', label: 'Salón', icon: Building2 },
    { id: 'reservas', label: 'Reservar', icon: CalendarCheck },
    { id: 'festejos', label: 'Festejos', icon: PartyPopper },
    { id: 'contacto', label: 'Contacto', icon: MapPin },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Header - Controlled height, contained margins, dynamic scroll color & size */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ease-in-out ${
          isScrolled
            ? 'bg-[#6B604E] text-white shadow-md border-b border-[#594F40]'
            : 'bg-[#FAF9F6]/95 backdrop-blur-md text-[#1C1A18] shadow-xs border-b border-[#6B604E]/15'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Top Bar */}
          <div
            className={`flex lg:hidden items-center justify-between transition-all duration-300 ${
              isScrolled ? 'h-15' : 'h-20'
            }`}
          >
            {/* Centered Logo: Much bigger visual presence, turns pure white when scrolled */}
            <div className="flex-1 flex items-center justify-center">
              <button
                onClick={() => handleNavClick('inicio')}
                className="flex items-center justify-center focus:outline-none transition-transform active:scale-95"
                aria-label="Ir al inicio"
              >
                <div
                  className={`overflow-hidden flex items-center justify-center transition-all duration-300 ${
                    isScrolled ? 'h-[50px] w-[130px]' : 'h-[64px] w-[165px]'
                  }`}
                >
                  <img
                    src={ASSETS.logo}
                    alt="El Palmar Multiespacio"
                    referrerPolicy="no-referrer"
                    className={`w-auto max-w-none object-contain transition-all duration-300 drop-shadow-xs ${
                      isScrolled
                        ? 'h-[115px] brightness-0 invert'
                        : 'h-[150px] filter-none'
                    }`}
                  />
                </div>
              </button>
            </div>

            {/* Menu Toggle Button */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2">
              <button
                id="mobile-menu-toggle-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-xl focus:outline-none transition-colors ${
                  isScrolled
                    ? 'text-white hover:bg-white/15 active:bg-white/25'
                    : 'text-[#2C2926] hover:bg-[#6B604E]/10 active:bg-[#6B604E]/20'
                }`}
                aria-label="Abrir menú"
              >
                {mobileMenuOpen ? (
                  <X className={`w-6 h-6 ${isScrolled ? 'text-white' : 'text-[#6B604E]'}`} />
                ) : (
                  <Menu className={`w-6 h-6 ${isScrolled ? 'text-white' : 'text-[#6B604E]'}`} />
                )}
              </button>
            </div>
          </div>

          {/* Desktop Header Layout: Logo + Menu together in ONE SINGLE LINE, centered with respect to total header width with comfortable breathing room */}
          <div
            className={`hidden lg:flex items-center justify-center gap-7 xl:gap-10 transition-all duration-300 w-full mx-auto ${
              isScrolled ? 'h-[68px]' : 'h-[92px]'
            }`}
          >
            {/* Brand Logo - Much bigger visual presence (fits proportionally without expanding container) */}
            <button
              id="nav-brand-logo"
              onClick={() => handleNavClick('inicio')}
              className="flex items-center shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-xl group transition-transform hover:scale-[1.03]"
              aria-label="Ir al inicio de El Palmar"
            >
              <div
                className={`overflow-hidden flex items-center justify-center transition-all duration-300 ${
                  isScrolled ? 'h-[52px] w-[140px]' : 'h-[74px] w-[180px]'
                }`}
              >
                <img
                  src={ASSETS.logo}
                  alt="El Palmar Multiespacio"
                  referrerPolicy="no-referrer"
                  className={`w-auto max-w-none object-contain transition-all duration-300 drop-shadow-xs ${
                    isScrolled
                      ? 'h-[118px] brightness-0 invert'
                      : 'h-[162px] filter-none group-hover:scale-105'
                  }`}
                />
              </div>
            </button>

            {/* Navigation Links in the same line, centered beside the logo - Botonera con mayor presencia y tamaño */}
            <nav className="flex items-center gap-1.5 xl:gap-2.5 shrink-0 flex-nowrap">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-link-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-4 xl:px-5 py-2 rounded-full text-sm xl:text-[15px] font-medium tracking-normal whitespace-nowrap transition-all duration-200 font-brand ${
                      isScrolled
                        ? isActive
                          ? 'bg-white text-[#6B604E] font-semibold shadow-xs scale-102'
                          : 'text-white/85 hover:text-white hover:bg-white/15'
                        : isActive
                          ? 'bg-[#6B604E] text-white shadow-xs'
                          : 'text-[#2C2926] hover:bg-[#6B604E]/10 hover:text-[#6B604E]'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Mobile Full Menu Drawer */}
        {mobileMenuOpen && (
          <div
            className={`lg:hidden border-t px-4 pt-3 pb-6 space-y-1.5 shadow-xl animate-in slide-in-from-top-2 transition-colors duration-300 ${
              isScrolled
                ? 'bg-[#6B604E] text-white border-white/15'
                : 'bg-[#FAF9F6] text-[#1C1A18] border-[#6B604E]/15'
            }`}
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              const IconComp = item.icon;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-medium transition-colors flex items-center justify-between font-brand ${
                    isScrolled
                      ? isActive
                        ? 'bg-white text-[#6B604E] shadow-xs font-semibold'
                        : 'text-white/90 hover:bg-white/10'
                      : isActive
                        ? 'bg-[#6B604E] text-white shadow-xs'
                        : 'text-[#1C1A18] hover:bg-[#6B604E]/10 hover:text-[#6B604E]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconComp
                      className={`w-4 h-4 ${
                        isScrolled
                          ? isActive
                            ? 'text-[#6B604E]'
                            : 'text-white'
                          : isActive
                            ? 'text-white'
                            : 'text-[#6B604E]'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {isActive && (
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isScrolled ? 'bg-[#6B604E]' : 'bg-white'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* Mobile Native App Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-lg border-t border-[#6B604E]/20 px-2 py-1.5 shadow-2xl safe-area-pb">
        <nav className="flex items-center justify-around max-w-md mx-auto">
          {mobileTabs.map((tab) => {
            const isActive = activeSection === tab.id;
            const Icon = tab.icon;
            const isFeatured = tab.id === 'reservas';

            if (isFeatured) {
              return (
                <button
                  key={tab.id}
                  id={`app-tab-${tab.id}`}
                  onClick={() => handleNavClick(tab.id)}
                  className="flex flex-col items-center justify-center -mt-6 relative z-10 transition-transform duration-200 active:scale-95 group focus:outline-none"
                  aria-label="Reservar fecha"
                >
                  <div
                    className={`w-13 h-13 rounded-full flex items-center justify-center shadow-xl border-[3px] border-white transition-all ${
                      isActive
                        ? 'bg-[#6B604E] text-white ring-2 ring-[#8FC43E] scale-105'
                        : 'bg-[#8FC43E] text-white hover:bg-[#7eaf35]'
                    }`}
                  >
                    <Icon className="w-6 h-6 text-white stroke-[2.3]" />
                  </div>
                  <span
                    className={`text-[11px] tracking-tight leading-none mt-1 font-bold ${
                      isActive ? 'text-[#6B604E]' : 'text-[#4A453E]'
                    }`}
                  >
                    {tab.label}
                  </span>
                </button>
              );
            }

            return (
              <button
                key={tab.id}
                id={`app-tab-${tab.id}`}
                onClick={() => handleNavClick(tab.id)}
                className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 active:scale-90 ${
                  isActive
                    ? 'text-[#6B604E] font-black'
                    : 'text-[#7A746E] hover:text-[#6B604E]'
                }`}
              >
                <div
                  className={`p-1.5 rounded-full transition-all ${
                    isActive ? 'bg-[#8FC43E]/20 text-[#6B604E]' : ''
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-[#6B604E]' : 'text-[#7A746E]'}`} />
                </div>
                <span className="text-[10px] tracking-tight leading-none mt-0.5 font-semibold">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
};

