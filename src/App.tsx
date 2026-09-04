import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ElLugarSection } from './components/ElLugarSection';
import { AsiSonLosFestejosSection } from './components/AsiSonLosFestejosSection';
import { GoogleReviewsSection } from './components/GoogleReviewsSection';
import { ReservasSection } from './components/ReservasSection';
import { FaqSection } from './components/FaqSection';
import { ContactoSection } from './components/ContactoSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('inicio');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'el-lugar', 'festejos', 'reservas', 'faq', 'contacto'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#2C2926] font-sans antialiased flex flex-col selection:bg-[#8FC43E]/20 selection:text-[#1C1A18]">
      {/* Header / Navbar */}
      <Navbar activeSection={activeSection} onNavigate={scrollToSection} />

      {/* Main Content Sections */}
      <main className="flex-1 pb-16 lg:pb-0">
        <HeroSection onNavigate={scrollToSection} />
        <ElLugarSection onNavigate={scrollToSection} />
        <AsiSonLosFestejosSection onNavigate={scrollToSection} />
        <GoogleReviewsSection />
        <ReservasSection />
        <FaqSection />
        <ContactoSection />
      </main>

      {/* Footer */}
      <Footer onNavigate={scrollToSection} />

      {/* Quick Floating WhatsApp Action */}
      <FloatingWhatsApp />
    </div>
  );
}
