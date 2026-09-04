import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  vRot: number;
  width: number;
  height: number;
  color: string;
  opacity: number;
  shape: 'rect' | 'circle' | 'ribbon';
  gravity: number;
  drag: number;
  wobble: number;
  wobbleSpeed: number;
}

// Strictly unified palette: Elegant silver / platinum tones with select touches of Gold and Palmar Olive
const FESTIVE_PALETTE = [
  '#FFFFFF', // Pure White Glint
  '#F0F0F0', // Bright Silver
  '#E0E0E0', // Metallic Silver
  '#D0D0D0', // Polished Platinum
  '#C0C0C0', // Silver
  '#B8B8B8', // Steel Silver
  '#D4AF37', // Touch of Classic Gold
  '#F3CE63', // Champagne Gold
  '#8FC43E', // Palmar Olive Green
  '#9ED64B', // Bright Olive
];

export const ConfettiExplosionCanvas: React.FC<{ triggerBurstKey?: number }> = ({ triggerBurstKey = 0 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const spawnExplosionRef = useRef<() => void>(() => {});

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 650);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const particles: Particle[] = [];
    particlesRef.current = particles;

    // ONE MASSIVE, EXTENDED-DURATION EXPLOSION WITH FEWER, HIGH-QUALITY FLOATING PARTICLES
    const spawnMassiveExplosion = () => {
      particles.length = 0;
      // Menos cantidad para que sea más nítido y elegante, pero con mayor presencia
      const TOTAL_PAPELITOS = window.innerWidth < 640 ? 110 : 170;

      const originX = width * 0.5;
      const originY = height * 0.38;

      for (let i = 0; i < TOTAL_PAPELITOS; i++) {
        const angle = Math.random() * Math.PI * 2;
        // Gran fuerza de expansión inicial para cubrir todo el ancho
        const speed = 7 + Math.random() * 16;
        const color = FESTIVE_PALETTE[Math.floor(Math.random() * FESTIVE_PALETTE.length)];
        
        const randShape = Math.random();
        let shape: 'rect' | 'circle' | 'ribbon' = 'rect';
        let pWidth = 9 + Math.random() * 8;
        let pHeight = 7 + Math.random() * 6;

        if (randShape > 0.72) {
          shape = 'ribbon';
          pWidth = 16 + Math.random() * 10;
          pHeight = 4.5 + Math.random() * 3;
        } else if (randShape > 0.52) {
          shape = 'circle';
          pWidth = 7 + Math.random() * 5;
          pHeight = pWidth;
        }

        particles.push({
          x: originX + (Math.random() - 0.5) * 80,
          y: originY + (Math.random() - 0.5) * 60,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 5.5,
          rotation: Math.random() * 360,
          vRot: (Math.random() - 0.5) * 6, // Rotación más suave y duradera
          width: pWidth,
          height: pHeight,
          color,
          opacity: 0.95,
          shape,
          // Gravedad ultra liviana y resistencia suave para que la caída y el flote duren mucho más tiempo
          gravity: 0.012 + Math.random() * 0.012,
          drag: 0.965 + Math.random() * 0.015, // Desaceleración gradual y prolongada
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: 0.015 + Math.random() * 0.02,
        });
      }
    };

    spawnExplosionRef.current = spawnMassiveExplosion;
    spawnMassiveExplosion();

    const handleCanvasClick = () => {
      spawnMassiveExplosion();
    };

    const parentEl = canvas.parentElement;
    if (parentEl) {
      parentEl.addEventListener('click', handleCanvasClick);
    }

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 16.66, 2);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Decelerate smoothly into prolonged suspended floating
        p.vx *= Math.pow(p.drag, dt);
        p.vy *= Math.pow(p.drag, dt);

        // Slow, elegant sway
        p.wobble += p.wobbleSpeed * dt;
        const floatX = Math.sin(p.wobble) * 0.5;
        const floatY = Math.cos(p.wobble * 0.8) * 0.25;

        p.x += (p.vx + floatX) * dt;
        p.y += (p.vy + p.gravity + floatY) * dt;
        p.rotation += p.vRot * dt;

        // Loop seamlessly to keep the entire background floating peacefully
        if (p.y > height + 25) {
          p.y = -15;
          p.x = Math.random() * width;
          p.vy = 0.15 + Math.random() * 0.3;
          p.vx = (Math.random() - 0.5) * 1.0;
        }
        if (p.x < -30) p.x = width + 15;
        if (p.x > width + 30) p.x = -15;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;

        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.color === '#FFFFFF' || p.color.includes('D4A') ? 5 : 2;

        if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.width / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === 'ribbon') {
          ctx.beginPath();
          ctx.ellipse(0, 0, p.width / 2, p.height / 2, Math.PI / 4, 0, 2 * Math.PI);
          ctx.fill();
        } else {
          const flipScale = Math.sin(p.wobble * 1.8);
          ctx.fillRect(-p.width / 2, (-p.height / 2) * flipScale, p.width, p.height * Math.abs(flipScale));
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (parentEl) {
        parentEl.removeEventListener('click', handleCanvasClick);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    if (triggerBurstKey > 0 && spawnExplosionRef.current) {
      spawnExplosionRef.current();
    }
  }, [triggerBurstKey]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 w-full h-full"
      style={{ opacity: 0.95 }}
    />
  );
};
