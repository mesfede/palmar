import React, { useEffect, useRef } from 'react';

interface FloatingBalloon {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  shineColor: string;
  stringLength: number;
  wobble: number;
  wobbleSpeed: number;
  popping: boolean;
  popProgress: number; // 0 to 1
  popParticles: Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    color: string;
    alpha: number;
  }>;
}

// Festive palette for balloons in El Palmar (Olive Green, Champagne Gold, Silver Platinum, Warm Coral/Rose, Soft White)
const BALLOON_PALETTES = [
  { main: 'rgba(143, 196, 62, 0.78)', shine: 'rgba(215, 245, 160, 0.95)', border: '#74A42C' },   // Olive Green
  { main: 'rgba(212, 175, 55, 0.75)', shine: 'rgba(255, 235, 170, 0.95)', border: '#B89020' },   // Gold
  { main: 'rgba(192, 192, 192, 0.75)', shine: 'rgba(255, 255, 255, 0.95)', border: '#9E9E9E' },  // Platinum Silver
  { main: 'rgba(235, 120, 100, 0.72)', shine: 'rgba(255, 190, 180, 0.95)', border: '#C05040' },  // Festive Coral
  { main: 'rgba(240, 240, 245, 0.85)', shine: 'rgba(255, 255, 255, 0.98)', border: '#D0D0D5' },  // Pearl White
];

export const FloatingBalloonsBg: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 800);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Initial balloon pool
    const balloons: FloatingBalloon[] = [];
    const TOTAL_BALLOONS = window.innerWidth < 640 ? 12 : 22;

    const createBalloon = (initialY?: number): FloatingBalloon => {
      const palette = BALLOON_PALETTES[Math.floor(Math.random() * BALLOON_PALETTES.length)];
      const radius = 22 + Math.random() * 26;
      return {
        x: 40 + Math.random() * (width - 80),
        y: initialY !== undefined ? initialY : height + 50 + Math.random() * 100,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -(0.55 + Math.random() * 0.85), // Gentle upward floating
        radius,
        color: palette.main,
        shineColor: palette.shine,
        stringLength: 35 + Math.random() * 25,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.015 + Math.random() * 0.02,
        popping: false,
        popProgress: 0,
        popParticles: [],
      };
    };

    // Pre-populate distributed balloons vertically
    for (let i = 0; i < TOTAL_BALLOONS; i++) {
      balloons.push(createBalloon(Math.random() * height));
    }

    // Trigger random popping of balloons occasionally
    let lastPopCheck = performance.now();

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Check if a balloon should pop every ~2.5 to 4 seconds
      if (time - lastPopCheck > 2800) {
        lastPopCheck = time;
        // Find an intact balloon in the upper half to pop with nice visual burst
        const candidate = balloons.find(
          (b) => !b.popping && b.y < height * 0.65 && b.y > 60 && Math.random() > 0.35
        );
        if (candidate) {
          candidate.popping = true;
          // Spawn popping rubber shreds and spark particles
          for (let p = 0; p < 12; p++) {
            const angle = Math.random() * Math.PI * 2;
            const spd = 2.5 + Math.random() * 5.5;
            candidate.popParticles.push({
              x: candidate.x,
              y: candidate.y,
              vx: Math.cos(angle) * spd,
              vy: Math.sin(angle) * spd,
              radius: 2 + Math.random() * 3.5,
              color: candidate.color,
              alpha: 1,
            });
          }
        }
      }

      // Update and draw each balloon
      for (let i = 0; i < balloons.length; i++) {
        const b = balloons[i];

        if (b.popping) {
          b.popProgress += 0.05;
          // Render popping particles
          for (let p = 0; p < b.popParticles.length; p++) {
            const part = b.popParticles[p];
            part.x += part.vx;
            part.y += part.vy + 0.15; // gravity on pop shards
            part.alpha -= 0.045;

            if (part.alpha > 0) {
              ctx.save();
              ctx.globalAlpha = Math.max(0, part.alpha);
              ctx.fillStyle = part.color;
              ctx.beginPath();
              ctx.arc(part.x, part.y, part.radius, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();
            }
          }

          // Reset popped balloon when explosion completes
          if (b.popProgress >= 1) {
            balloons[i] = createBalloon(height + 40 + Math.random() * 50);
          }
          continue;
        }

        // Float upward and sway gently
        b.wobble += b.wobbleSpeed;
        const sway = Math.sin(b.wobble) * 0.75;
        b.x += b.vx + sway;
        b.y += b.vy;

        // Reset if floated out the top
        if (b.y < -b.radius - b.stringLength - 20) {
          balloons[i] = createBalloon(height + 30);
          continue;
        }

        // DRAW BALLOON
        ctx.save();
        ctx.translate(b.x, b.y);

        // Curving String
        ctx.beginPath();
        ctx.moveTo(0, b.radius * 1.15);
        const cp1x = Math.sin(b.wobble * 1.5) * 10;
        const cp1y = b.radius * 1.15 + b.stringLength * 0.4;
        const cp2x = -Math.sin(b.wobble * 1.5) * 8;
        const cp2y = b.radius * 1.15 + b.stringLength * 0.8;
        const endX = Math.sin(b.wobble) * 5;
        const endY = b.radius * 1.15 + b.stringLength;
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
        ctx.strokeStyle = 'rgba(120, 115, 110, 0.45)';
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Balloon Knot
        ctx.beginPath();
        ctx.moveTo(-4, b.radius * 1.12);
        ctx.lineTo(4, b.radius * 1.12);
        ctx.lineTo(2, b.radius * 1.22);
        ctx.lineTo(-2, b.radius * 1.22);
        ctx.closePath();
        ctx.fillStyle = b.color;
        ctx.fill();

        // Balloon Body (Oval / Teardrop)
        ctx.beginPath();
        const rx = b.radius * 0.88;
        const ry = b.radius * 1.12;
        ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.fill();

        // Balloon Gloss Highlight / Reflection (3D Spherical shine)
        ctx.beginPath();
        ctx.ellipse(-rx * 0.38, -ry * 0.35, rx * 0.28, ry * 0.4, -Math.PI / 6, 0, Math.PI * 2);
        ctx.fillStyle = b.shineColor;
        ctx.fill();

        // Secondary subtle inner glow
        const glowGrad = ctx.createRadialGradient(
          -rx * 0.2, -ry * 0.2, rx * 0.1,
          0, 0, ry
        );
        glowGrad.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
        glowGrad.addColorStop(0.7, 'rgba(255, 255, 255, 0)');
        glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0.08)');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 w-full h-full"
    />
  );
};
