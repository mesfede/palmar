import React from 'react';
import logoImg from '../components/El_palmar_logo_ok.png';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = 'h-24 w-auto',
  variant = 'dark',
}) => {
  return (
    <div className="overflow-hidden inline-flex items-center justify-center">
      <img
        src={logoImg}
        alt="El Palmar Multiespacio"
        className={`${className} object-contain transition-transform duration-200 hover:scale-[1.03] ${
          variant === 'light' ? 'brightness-0 invert' : ''
        }`}
        loading="eager"
      />
    </div>
  );
};

