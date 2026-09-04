import React, { useEffect, useRef } from 'react';

interface ConfettiParticle {
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
  decay: number;
  shape: 'rect' | 'circle' | 'ribbon';
  wobble: number;
  wobbleSpeed: number;
  gravity: number;
  drag: number;
}

// Elegant celebratory palette: Champagne gold, bright white, platinum silver, and brand olive green
const BURST_PALETTE = [
  '#FFFFFF', // Bright White Glint
  '#FFF8DC', // Cream Pearl
  '#D4AF37', // Metallic Gold
  '#FFDF73', // Light Gold
  '#F5E296', // Champagne
  '#E6E6E6', // Platinum
  '#C0C0C0', // Silver
  '#8FC43E', // Palmar Olive Green
  '#A3DE48', // Bright Spring Olive
];

interface ModalConfettiBurstProps {
  triggerKey?: number | string;
}

export const ModalConfettiBurst: React.FC<ModalConfettiBurstProps> = ({ triggerKey = 0 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: ConfettiParticle[] = [];
    const count = window.innerWidth < 640 ? 180 : 320;

    // Burst center at the photo's approximate middle
    const originX = width * 0.5;
    const originY = height * 0.45;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      // Much more explosive initial speed to cover the entire background
      const speed = 10 + Math.random() * 32;
      const color = BURST_PALETTE[Math.floor(Math.random() * BURST_PALETTE.length)];

      const randShape = Math.random();
      let shape: 'rect' | 'circle' | 'ribbon' = 'rect';
      // Slightly larger particles for beautiful visibility in the background
      let w = 11 + Math.random() * 12;
      let h = 8 + Math.random() * 9;

      if (randShape > 0.7) {
        shape = 'ribbon';
        w = 18 + Math.random() * 14;
        h = 5 + Math.random() * 4;
      } else if (randShape > 0.5) {
        shape = 'circle';
        w = 8 + Math.random() * 8;
        h = w;
      }

      particles.push({
        x: originX + (Math.random() - 0.5) * 80,
        y: originY + (Math.random() - 0.5) * 80,
        vx: Math.cos(angle) * speed,
        // Strong, high-velocity upward and outward expansion
        vy: Math.sin(angle) * speed - (5 + Math.random() * 8),
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 18,
        width: w,
        height: h,
        color,
        opacity: 1,
        // Slower decay for a premium, floating, atmospheric fade
        decay: 0.0018 + Math.random() * 0.0028,
        shape,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.03 + Math.random() * 0.05,
        // Lower gravity so they sail like feathers across the full screen
        gravity: 0.07 + Math.random() * 0.07,
        // Lower air drag so they travel much farther to the screen edges
        drag: 0.965 + Math.random() * 0.015,
      });
    }

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 16.66, 2.5);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      let aliveCount = 0;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p.opacity <= 0.01) continue;
        aliveCount++;

        // Physics: drag and gravity
        p.vx *= Math.pow(p.drag, dt);
        p.vy = p.vy * Math.pow(p.drag, dt) + p.gravity * dt;

        p.wobble += p.wobbleSpeed * dt;
        const swayX = Math.sin(p.wobble) * 1.2;

        p.x += (p.vx + swayX) * dt;
        p.y += p.vy * dt;
        p.rotation += p.vRot * dt;
        p.opacity = Math.max(0, p.opacity - p.decay * dt);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        // Subtle glow on celebratory particles
        if (p.color === '#FFFFFF' || p.color.includes('D4A') || p.color.includes('FFD')) {
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 6;
        }

        if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.width / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === 'ribbon') {
          ctx.beginPath();
          ctx.ellipse(0, 0, p.width / 2, p.height / 2, Math.PI / 4, 0, 2 * Math.PI);
          ctx.fill();
        } else {
          // 3D paper flutter flipping
          const flipScale = Math.sin(p.wobble * 2);
          ctx.fillRect(-p.width / 2, (-p.height / 2) * flipScale, p.width, p.height * Math.abs(flipScale));
        }

        ctx.restore();
      }

      if (aliveCount > 0) {
        animId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [triggerKey]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
    />
  );
};
