'use client';

import { useEffect, useRef } from 'react';

interface FunnelCanvasProps {
  className?: string;
}

const COLORS = ['#22d3ee', '#06b6d4', '#14b8a6', '#5eead4', '#67e8f9', '#a5f3fc'];

type IconType = 'person' | 'molecule' | 'sparkle' | 'diamond' | 'dot';

type EjectParticle = {
  x: number; y: number;
  vx: number; vy: number;
  alpha: number;
  size: number;
  type: IconType;
  colorIdx: number;
  angle: number;
  spin: number;
};

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

export default function FunnelCanvas({ className = '' }: FunnelCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0;
    let animId: number;
    let frame = 0;
    const particles: EjectParticle[] = [];

    function resize() {
      W = canvas!.offsetWidth;
      H = canvas!.offsetHeight;
      canvas!.width = W;
      canvas!.height = H;
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function funnelGeom() {
      const cx = W * 0.5;
      const topY = H * 0.12;
      const topRx = W * 0.42;
      const topRy = H * 0.05;
      const botY = H * 0.82;
      const botRx = W * 0.065;
      const botRy = H * 0.025;
      return { cx, topY, topRx, topRy, botY, botRx, botRy };
    }

    function spawnParticle(): EjectParticle {
      const f = funnelGeom();
      // Spawn at the top opening, shoot outward and upward
      const angle = (Math.random() - 0.5) * Math.PI * 1.1; // fan upward
      const speed = 0.8 + Math.random() * 1.8;
      // Start from funnel top opening, slightly randomised
      const startX = f.cx + (Math.random() - 0.5) * f.topRx * 0.6;
      const startY = f.topY + (Math.random() - 0.5) * f.topRy * 2;
      const types: IconType[] = ['person', 'molecule', 'sparkle', 'diamond', 'dot', 'dot'];
      const type = types[Math.floor(Math.random() * types.length)];
      return {
        x: startX,
        y: startY,
        vx: Math.sin(angle) * speed,
        vy: -Math.cos(Math.abs(angle) * 0.5) * speed - 0.4,
        alpha: 0.85 + Math.random() * 0.15,
        size: type === 'dot' ? 2.5 + Math.random() * 2 : 10 + Math.random() * 10,
        type,
        colorIdx: Math.floor(Math.random() * COLORS.length),
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.06,
      };
    }

    // Pre-seed particles at random heights above funnel
    for (let i = 0; i < 22; i++) {
      const p = spawnParticle();
      const f = funnelGeom();
      p.y = f.topY - Math.random() * H * 0.55;
      p.x = p.x + (Math.random() - 0.5) * W * 0.7;
      p.alpha = Math.random() * 0.7;
      particles.push(p);
    }

    function drawPersonIcon(x: number, y: number, size: number, color: string, alpha: number) {
      ctx!.save();
      ctx!.globalAlpha = alpha;
      ctx!.shadowBlur = 12;
      ctx!.shadowColor = color;

      // Outer circle border
      ctx!.strokeStyle = color;
      ctx!.lineWidth = 1.5;
      ctx!.beginPath();
      ctx!.arc(x, y, size * 0.55, 0, Math.PI * 2);
      ctx!.stroke();

      // Head
      ctx!.fillStyle = color;
      ctx!.beginPath();
      ctx!.arc(x, y - size * 0.16, size * 0.2, 0, Math.PI * 2);
      ctx!.fill();

      // Shoulders arc
      ctx!.beginPath();
      ctx!.arc(x, y + size * 0.22, size * 0.3, Math.PI, 0);
      ctx!.stroke();

      ctx!.restore();
    }

    function drawMoleculeIcon(x: number, y: number, size: number, color: string, alpha: number, angle: number) {
      ctx!.save();
      ctx!.globalAlpha = alpha;
      ctx!.shadowBlur = 10;
      ctx!.shadowColor = color;
      ctx!.translate(x, y);
      ctx!.rotate(angle);

      const r = size * 0.38;
      const satellites = 3;
      ctx!.strokeStyle = color;
      ctx!.lineWidth = 1.2;

      for (let i = 0; i < satellites; i++) {
        const a = (i / satellites) * Math.PI * 2;
        const sx = Math.cos(a) * r;
        const sy = Math.sin(a) * r;
        ctx!.beginPath();
        ctx!.moveTo(0, 0);
        ctx!.lineTo(sx, sy);
        ctx!.stroke();
        ctx!.fillStyle = color;
        ctx!.beginPath();
        ctx!.arc(sx, sy, size * 0.12, 0, Math.PI * 2);
        ctx!.fill();
      }
      // Center
      ctx!.beginPath();
      ctx!.arc(0, 0, size * 0.18, 0, Math.PI * 2);
      ctx!.fill();

      ctx!.restore();
    }

    function drawSparkleIcon(x: number, y: number, size: number, color: string, alpha: number, angle: number) {
      ctx!.save();
      ctx!.globalAlpha = alpha;
      ctx!.shadowBlur = 14;
      ctx!.shadowColor = color;
      ctx!.fillStyle = color;
      ctx!.translate(x, y);
      ctx!.rotate(angle);

      // 4-point star
      const arms = 4;
      const outer = size * 0.45;
      const inner = size * 0.12;
      ctx!.beginPath();
      for (let i = 0; i < arms * 2; i++) {
        const a = (i / (arms * 2)) * Math.PI * 2 - Math.PI / 2;
        const r2 = i % 2 === 0 ? outer : inner;
        if (i === 0) ctx!.moveTo(Math.cos(a) * r2, Math.sin(a) * r2);
        else ctx!.lineTo(Math.cos(a) * r2, Math.sin(a) * r2);
      }
      ctx!.closePath();
      ctx!.fill();

      ctx!.restore();
    }

    function drawDiamondIcon(x: number, y: number, size: number, color: string, alpha: number, angle: number) {
      ctx!.save();
      ctx!.globalAlpha = alpha;
      ctx!.shadowBlur = 10;
      ctx!.shadowColor = color;
      ctx!.strokeStyle = color;
      ctx!.lineWidth = 1.5;
      ctx!.translate(x, y);
      ctx!.rotate(angle);

      const s = size * 0.42;
      ctx!.beginPath();
      ctx!.moveTo(0, -s);
      ctx!.lineTo(s * 0.65, 0);
      ctx!.lineTo(0, s);
      ctx!.lineTo(-s * 0.65, 0);
      ctx!.closePath();
      ctx!.stroke();

      ctx!.restore();
    }

    function drawFunnel() {
      const f = funnelGeom();

      // ── Big radial glow behind funnel ──
      const rg = ctx!.createRadialGradient(f.cx, f.topY, 0, f.cx, f.topY, f.topRx * 1.6);
      rg.addColorStop(0, 'rgba(6,182,212,0.18)');
      rg.addColorStop(0.4, 'rgba(6,182,212,0.06)');
      rg.addColorStop(1, 'rgba(6,182,212,0)');
      ctx!.fillStyle = rg;
      ctx!.fillRect(0, 0, W, H);

      // ── Light rays shooting upward from top ellipse ──
      const rayCount = 6;
      for (let i = 0; i < rayCount; i++) {
        const spread = 0.75;
        const t = (i / (rayCount - 1)) - 0.5;
        const rayAngle = t * spread;
        const rayLen = H * 0.55;
        const startX = f.cx + Math.sin(rayAngle) * f.topRx * 0.7;
        const endX = startX + Math.sin(rayAngle) * rayLen;
        const endY = f.topY - rayLen;

        const rayGrad = ctx!.createLinearGradient(startX, f.topY, endX, endY);
        const intensity = 1 - Math.abs(t) * 1.2;
        rayGrad.addColorStop(0, `rgba(6,182,212,${0.35 * Math.max(0, intensity)})`);
        rayGrad.addColorStop(0.4, `rgba(6,182,212,${0.10 * Math.max(0, intensity)})`);
        rayGrad.addColorStop(1, 'rgba(6,182,212,0)');

        ctx!.save();
        ctx!.strokeStyle = rayGrad;
        ctx!.lineWidth = 2 + intensity * 4;
        ctx!.globalAlpha = 0.7;
        ctx!.beginPath();
        ctx!.moveTo(startX, f.topY);
        ctx!.lineTo(endX, endY);
        ctx!.stroke();
        ctx!.restore();
      }

      // ── Funnel fill ──
      ctx!.save();
      ctx!.beginPath();
      ctx!.moveTo(f.cx - f.topRx, f.topY);
      ctx!.bezierCurveTo(
        f.cx - f.topRx * 0.75, f.topY + (f.botY - f.topY) * 0.55,
        f.cx - f.botRx * 1.8, f.botY - (f.botY - f.topY) * 0.08,
        f.cx - f.botRx, f.botY
      );
      ctx!.lineTo(f.cx + f.botRx, f.botY);
      ctx!.bezierCurveTo(
        f.cx + f.botRx * 1.8, f.botY - (f.botY - f.topY) * 0.08,
        f.cx + f.topRx * 0.75, f.topY + (f.botY - f.topY) * 0.55,
        f.cx + f.topRx, f.topY
      );
      ctx!.closePath();
      const fill = ctx!.createLinearGradient(f.cx, f.topY, f.cx, f.botY);
      fill.addColorStop(0, 'rgba(6,182,212,0.14)');
      fill.addColorStop(0.5, 'rgba(6,182,212,0.06)');
      fill.addColorStop(1, 'rgba(20,184,166,0.02)');
      ctx!.fillStyle = fill;
      ctx!.fill();
      ctx!.restore();

      // ── Funnel edges (glow + crisp) ──
      function funnelLeftPath() {
        ctx!.beginPath();
        ctx!.moveTo(f.cx - f.topRx, f.topY);
        ctx!.bezierCurveTo(
          f.cx - f.topRx * 0.75, f.topY + (f.botY - f.topY) * 0.55,
          f.cx - f.botRx * 1.8, f.botY - (f.botY - f.topY) * 0.08,
          f.cx - f.botRx, f.botY
        );
      }
      function funnelRightPath() {
        ctx!.beginPath();
        ctx!.moveTo(f.cx + f.topRx, f.topY);
        ctx!.bezierCurveTo(
          f.cx + f.topRx * 0.75, f.topY + (f.botY - f.topY) * 0.55,
          f.cx + f.botRx * 1.8, f.botY - (f.botY - f.topY) * 0.08,
          f.cx + f.botRx, f.botY
        );
      }
      for (const path of [funnelLeftPath, funnelRightPath]) {
        // Glow pass
        ctx!.save();
        ctx!.shadowBlur = 22; ctx!.shadowColor = '#22d3ee';
        ctx!.strokeStyle = 'rgba(34,211,238,0.55)';
        ctx!.lineWidth = 3; path(); ctx!.stroke();
        ctx!.restore();
        // Crisp pass
        ctx!.save();
        ctx!.strokeStyle = 'rgba(34,211,238,0.92)';
        ctx!.lineWidth = 1.5; path(); ctx!.stroke();
        ctx!.restore();
      }

      // ── Top ellipse (bright glowing ring) ──
      ctx!.save();
      ctx!.shadowBlur = 30; ctx!.shadowColor = '#22d3ee';
      ctx!.strokeStyle = 'rgba(34,211,238,0.95)';
      ctx!.lineWidth = 2.5;
      ctx!.beginPath();
      ctx!.ellipse(f.cx, f.topY, f.topRx, f.topRy, 0, 0, Math.PI * 2);
      ctx!.stroke();
      ctx!.restore();

      // Inner ellipse fill glow
      ctx!.save();
      ctx!.globalAlpha = 0.22;
      const eg = ctx!.createRadialGradient(f.cx, f.topY, 0, f.cx, f.topY, f.topRx);
      eg.addColorStop(0, '#22d3ee');
      eg.addColorStop(1, 'rgba(34,211,238,0)');
      ctx!.fillStyle = eg;
      ctx!.beginPath();
      ctx!.ellipse(f.cx, f.topY, f.topRx, f.topRy, 0, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.restore();

      // ── Horizontal depth lines ──
      for (let i = 1; i <= 8; i++) {
        const t2 = i / 9;
        const y = lerp(f.topY, f.botY, t2);
        const rx2 = lerp(f.topRx, f.botRx, t2);
        ctx!.save();
        ctx!.globalAlpha = 0.12 * (1 - t2 * 0.6);
        ctx!.strokeStyle = '#22d3ee';
        ctx!.lineWidth = 0.8;
        ctx!.beginPath();
        ctx!.moveTo(f.cx - rx2, y);
        ctx!.lineTo(f.cx + rx2, y);
        ctx!.stroke();
        ctx!.restore();
      }

      // ── Bottom ellipse ──
      ctx!.save();
      ctx!.shadowBlur = 16; ctx!.shadowColor = '#14b8a6';
      ctx!.strokeStyle = 'rgba(20,184,166,0.8)';
      ctx!.lineWidth = 1.5;
      ctx!.beginPath();
      ctx!.ellipse(f.cx, f.botY, f.botRx, f.botRy, 0, 0, Math.PI * 2);
      ctx!.stroke();
      ctx!.restore();

      // ── Spout drip line ──
      const spoutTopY = f.botY + f.botRy;
      const spoutBotY = spoutTopY + H * 0.07;
      ctx!.save();
      ctx!.shadowBlur = 14; ctx!.shadowColor = '#22d3ee';
      ctx!.strokeStyle = 'rgba(34,211,238,0.85)';
      ctx!.lineWidth = 2.5;
      ctx!.beginPath();
      ctx!.moveTo(f.cx, spoutTopY);
      ctx!.lineTo(f.cx, spoutBotY);
      ctx!.stroke();
      const ah = H * 0.022;
      ctx!.fillStyle = '#22d3ee';
      ctx!.beginPath();
      ctx!.moveTo(f.cx - ah, spoutBotY - ah * 0.3);
      ctx!.lineTo(f.cx + ah, spoutBotY - ah * 0.3);
      ctx!.lineTo(f.cx, spoutBotY + ah * 0.6);
      ctx!.closePath();
      ctx!.fill();
      ctx!.restore();

      // ── Concentric pulse rings at bottom ──
      const pulseY = spoutBotY + ah;
      const pulsePhase = (frame % 80) / 80;
      for (let r = 0; r < 3; r++) {
        const rp = (pulsePhase + r * 0.33) % 1;
        ctx!.save();
        ctx!.globalAlpha = (1 - rp) * 0.28;
        ctx!.strokeStyle = '#22d3ee';
        ctx!.lineWidth = 1;
        ctx!.beginPath();
        ctx!.arc(f.cx, pulseY, W * 0.14 * rp, 0, Math.PI * 2);
        ctx!.stroke();
        ctx!.restore();
      }
    }

    function drawParticle(p: EjectParticle) {
      const color = COLORS[p.colorIdx];
      if (p.type === 'dot') {
        ctx!.save();
        ctx!.globalAlpha = p.alpha;
        ctx!.shadowBlur = 12; ctx!.shadowColor = color;
        ctx!.fillStyle = color;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.restore();
      } else if (p.type === 'person') {
        drawPersonIcon(p.x, p.y, p.size, color, p.alpha);
      } else if (p.type === 'molecule') {
        drawMoleculeIcon(p.x, p.y, p.size, color, p.alpha, p.angle);
      } else if (p.type === 'sparkle') {
        drawSparkleIcon(p.x, p.y, p.size, color, p.alpha, p.angle);
      } else if (p.type === 'diamond') {
        drawDiamondIcon(p.x, p.y, p.size, color, p.alpha, p.angle);
      }
    }

    function updateParticle(p: EjectParticle) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.008; // slight gravity
      p.vx *= 0.998;
      p.angle += p.spin;
      p.alpha -= 0.003;

      // Reset when faded or off screen
      if (p.alpha <= 0.02 || p.y < -p.size * 2 || p.x < -W * 0.3 || p.x > W * 1.3) {
        const fresh = spawnParticle();
        Object.assign(p, fresh);
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H);
      frame++;

      drawFunnel();

      for (const p of particles) {
        updateParticle(p);
        drawParticle(p);
      }

      if (frame % 12 === 0 && particles.length < 40) {
        particles.push(spawnParticle());
      }

      animId = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{ display: 'block' }}
    />
  );
}
