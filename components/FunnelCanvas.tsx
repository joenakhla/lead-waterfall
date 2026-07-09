'use client';

import { useEffect, useRef } from 'react';

interface FunnelCanvasProps {
  className?: string;
}

type Particle = {
  x: number; y: number;
  vx: number; vy: number;
  radius: number; alpha: number;
  type: 'dot' | 'person' | 'node';
  phase: 'falling' | 'draining';
  nodeLinks?: { x: number; y: number }[];
  colorIdx: number;
};

const COLORS = ['#22d3ee', '#06b6d4', '#14b8a6', '#5eead4', '#67e8f9'];

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
    const particles: Particle[] = [];

    function resize() {
      W = canvas!.offsetWidth;
      H = canvas!.offsetHeight;
      canvas!.width = W;
      canvas!.height = H;
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function funnel() {
      const cx = W * 0.5;
      const topY = H * 0.07;
      const topRx = W * 0.44;
      const topRy = H * 0.06;
      const botY = H * 0.80;
      const botRx = W * 0.10;
      const botRy = H * 0.03;
      return { cx, topY, topRx, topRy, botY, botRx, botRy };
    }

    function funnelXRange(y: number) {
      const f = funnel();
      const t = Math.max(0, Math.min(1, (y - f.topY) / (f.botY - f.topY)));
      const rx = lerp(f.topRx, f.botRx, t);
      return { cx: f.cx, rx };
    }

    function spawnParticle(): Particle {
      const f = funnel();
      const type = Math.random() < 0.5 ? 'dot' : Math.random() < 0.5 ? 'person' : 'node';
      const side = Math.random() < 0.5 ? -1 : 1;
      const spread = 1.3;
      const x = f.cx + side * (f.topRx * spread * (0.4 + Math.random() * 0.6));
      const y = f.topY - H * (0.05 + Math.random() * 0.18);
      const colorIdx = Math.floor(Math.random() * COLORS.length);
      let nodeLinks: { x: number; y: number }[] | undefined;
      if (type === 'node') {
        nodeLinks = Array.from({ length: 3 }, () => ({
          x: x + (Math.random() - 0.5) * 30,
          y: y + (Math.random() - 0.5) * 30,
        }));
      }
      return {
        x, y,
        vx: -side * (0.2 + Math.random() * 0.4),
        vy: 0.6 + Math.random() * 1.2,
        radius: type === 'dot' ? 2 + Math.random() * 2 : type === 'person' ? 9 : 6,
        alpha: 0.6 + Math.random() * 0.4,
        type, phase: 'falling', colorIdx,
        nodeLinks,
      };
    }

    for (let i = 0; i < 28; i++) {
      const p = spawnParticle();
      p.y -= Math.random() * H * 0.6;
      particles.push(p);
    }

    let frame = 0;

    function drawFunnel() {
      const f = funnel();
      ctx!.save();

      const radGrad = ctx!.createRadialGradient(f.cx, f.topY + (f.botY - f.topY) * 0.4, 0,
        f.cx, f.topY + (f.botY - f.topY) * 0.4, Math.max(f.topRx, f.botRx) * 1.2);
      radGrad.addColorStop(0, 'rgba(6,182,212,0.07)');
      radGrad.addColorStop(1, 'rgba(6,182,212,0)');
      ctx!.fillStyle = radGrad;
      ctx!.fillRect(0, 0, W, H);

      ctx!.beginPath();
      ctx!.moveTo(f.cx - f.topRx, f.topY);
      ctx!.bezierCurveTo(
        f.cx - f.topRx * 0.8, f.topY + (f.botY - f.topY) * 0.6,
        f.cx - f.botRx * 1.5, f.botY - (f.botY - f.topY) * 0.1,
        f.cx - f.botRx, f.botY
      );
      ctx!.lineTo(f.cx + f.botRx, f.botY);
      ctx!.bezierCurveTo(
        f.cx + f.botRx * 1.5, f.botY - (f.botY - f.topY) * 0.1,
        f.cx + f.topRx * 0.8, f.topY + (f.botY - f.topY) * 0.6,
        f.cx + f.topRx, f.topY
      );
      const fillGrad = ctx!.createLinearGradient(f.cx, f.topY, f.cx, f.botY);
      fillGrad.addColorStop(0, 'rgba(6,182,212,0.10)');
      fillGrad.addColorStop(1, 'rgba(20,184,166,0.03)');
      ctx!.fillStyle = fillGrad;
      ctx!.fill();

      function strokeEdge(path: () => void, color1: string, color2: string, blur: number, alpha: number, width: number) {
        ctx!.save();
        ctx!.shadowBlur = blur;
        ctx!.shadowColor = color1;
        ctx!.strokeStyle = color2;
        ctx!.globalAlpha = alpha;
        ctx!.lineWidth = width;
        path();
        ctx!.stroke();
        ctx!.restore();
      }

      function leftEdgePath() {
        ctx!.beginPath();
        ctx!.moveTo(f.cx - f.topRx, f.topY);
        ctx!.bezierCurveTo(
          f.cx - f.topRx * 0.8, f.topY + (f.botY - f.topY) * 0.6,
          f.cx - f.botRx * 1.5, f.botY - (f.botY - f.topY) * 0.1,
          f.cx - f.botRx, f.botY
        );
      }
      function rightEdgePath() {
        ctx!.beginPath();
        ctx!.moveTo(f.cx + f.topRx, f.topY);
        ctx!.bezierCurveTo(
          f.cx + f.topRx * 0.8, f.topY + (f.botY - f.topY) * 0.6,
          f.cx + f.botRx * 1.5, f.botY - (f.botY - f.topY) * 0.1,
          f.cx + f.botRx, f.botY
        );
      }

      strokeEdge(leftEdgePath, '#22d3ee', '#22d3ee', 18, 0.5, 2);
      strokeEdge(rightEdgePath, '#22d3ee', '#22d3ee', 18, 0.5, 2);
      strokeEdge(leftEdgePath, '#22d3ee', 'rgba(34,211,238,0.9)', 4, 1, 1.5);
      strokeEdge(rightEdgePath, '#22d3ee', 'rgba(34,211,238,0.9)', 4, 1, 1.5);

      ctx!.save();
      ctx!.shadowBlur = 20;
      ctx!.shadowColor = '#22d3ee';
      ctx!.strokeStyle = 'rgba(34,211,238,0.85)';
      ctx!.lineWidth = 2;
      ctx!.beginPath();
      ctx!.ellipse(f.cx, f.topY, f.topRx, f.topRy, 0, 0, Math.PI * 2);
      ctx!.stroke();
      ctx!.restore();

      ctx!.save();
      ctx!.shadowBlur = 14;
      ctx!.shadowColor = '#14b8a6';
      ctx!.strokeStyle = 'rgba(20,184,166,0.75)';
      ctx!.lineWidth = 1.5;
      ctx!.beginPath();
      ctx!.ellipse(f.cx, f.botY, f.botRx, f.botRy, 0, 0, Math.PI * 2);
      ctx!.stroke();
      ctx!.restore();

      const steps = 7;
      for (let i = 1; i < steps; i++) {
        const t = i / steps;
        const y = lerp(f.topY, f.botY, t);
        const { rx } = funnelXRange(y);
        ctx!.save();
        ctx!.globalAlpha = 0.18 * (1 - t * 0.7);
        ctx!.strokeStyle = '#22d3ee';
        ctx!.lineWidth = 0.8;
        ctx!.beginPath();
        ctx!.moveTo(f.cx - rx, y);
        ctx!.lineTo(f.cx + rx, y);
        ctx!.stroke();
        ctx!.restore();
      }

      const spoutTopY = f.botY + f.botRy;
      const spoutBotY = spoutTopY + H * 0.10;
      ctx!.save();
      ctx!.shadowBlur = 12;
      ctx!.shadowColor = '#22d3ee';
      ctx!.strokeStyle = 'rgba(34,211,238,0.8)';
      ctx!.lineWidth = 2.5;
      ctx!.beginPath();
      ctx!.moveTo(f.cx, spoutTopY);
      ctx!.lineTo(f.cx, spoutBotY);
      ctx!.stroke();
      ctx!.restore();

      const ah = H * 0.025;
      ctx!.save();
      ctx!.shadowBlur = 16;
      ctx!.shadowColor = '#22d3ee';
      ctx!.fillStyle = '#22d3ee';
      ctx!.beginPath();
      ctx!.moveTo(f.cx - ah * 0.9, spoutBotY - ah * 0.4);
      ctx!.lineTo(f.cx + ah * 0.9, spoutBotY - ah * 0.4);
      ctx!.lineTo(f.cx, spoutBotY + ah * 0.5);
      ctx!.closePath();
      ctx!.fill();
      ctx!.restore();

      const pulseY = spoutBotY + ah * 0.6;
      const pulsePhase = (frame % 90) / 90;
      for (let r = 0; r < 3; r++) {
        const rPhase = (pulsePhase + r * 0.33) % 1;
        const maxR = W * 0.12;
        const rr = maxR * rPhase;
        ctx!.save();
        ctx!.globalAlpha = (1 - rPhase) * 0.3;
        ctx!.strokeStyle = '#22d3ee';
        ctx!.lineWidth = 1;
        ctx!.beginPath();
        ctx!.arc(f.cx, pulseY, rr, 0, Math.PI * 2);
        ctx!.stroke();
        ctx!.restore();
      }

      ctx!.restore();
    }

    function drawParticle(p: Particle) {
      const color = COLORS[p.colorIdx];
      ctx!.save();
      ctx!.globalAlpha = p.alpha;

      if (p.type === 'dot') {
        ctx!.shadowBlur = 10;
        ctx!.shadowColor = color;
        ctx!.fillStyle = color;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.fill();
      } else if (p.type === 'person') {
        ctx!.shadowBlur = 8;
        ctx!.shadowColor = color;
        ctx!.strokeStyle = color;
        ctx!.lineWidth = 1.5;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.stroke();
        ctx!.fillStyle = color;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y - p.radius * 0.2, p.radius * 0.45, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.beginPath();
        ctx!.arc(p.x, p.y + p.radius * 0.6, p.radius * 0.65, Math.PI, 0);
        ctx!.stroke();
      } else if (p.type === 'node' && p.nodeLinks) {
        ctx!.shadowBlur = 8;
        ctx!.shadowColor = color;
        for (const link of p.nodeLinks) {
          ctx!.strokeStyle = color;
          ctx!.lineWidth = 1;
          ctx!.globalAlpha = p.alpha * 0.5;
          ctx!.beginPath();
          ctx!.moveTo(p.x, p.y);
          ctx!.lineTo(link.x, link.y);
          ctx!.stroke();
          ctx!.globalAlpha = p.alpha;
          ctx!.fillStyle = color;
          ctx!.beginPath();
          ctx!.arc(link.x, link.y, 2, 0, Math.PI * 2);
          ctx!.fill();
        }
        ctx!.fillStyle = color;
        ctx!.globalAlpha = p.alpha;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.fill();
      }

      ctx!.restore();
    }

    function updateParticle(p: Particle) {
      const f = funnel();
      p.x += p.vx;
      p.y += p.vy;

      if (p.y > f.topY - H * 0.06) {
        const dx = f.cx - p.x;
        p.vx += dx * 0.004;
        p.vx *= 0.92;
        p.vy += 0.04;
      }

      if (p.y > f.topY + H * 0.04) {
        const { cx, rx } = funnelXRange(p.y);
        const edge = rx - p.radius;
        if (p.x < cx - edge) { p.x = cx - edge; p.vx = Math.abs(p.vx) * 0.3; }
        if (p.x > cx + edge) { p.x = cx + edge; p.vx = -Math.abs(p.vx) * 0.3; }
      }

      if (p.y > f.botY * 0.8) p.vy += 0.06;

      if (p.type === 'node' && p.nodeLinks) {
        p.nodeLinks = p.nodeLinks.map(l => ({ x: l.x + p.vx, y: l.y + p.vy }));
      }

      if (p.y > H + 20 || p.alpha <= 0.02) {
        const fresh = spawnParticle();
        Object.assign(p, fresh);
      }

      p.alpha *= 0.9998;
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H);
      frame++;

      drawFunnel();
      for (const p of particles) {
        updateParticle(p);
        drawParticle(p);
      }

      if (frame % 18 === 0 && particles.length < 45) {
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
