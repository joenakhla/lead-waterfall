'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Users } from 'lucide-react';

const MIN_LEADS = 500;
const MAX_LEADS = 10000;
const AVG_DEAL_VALUE = 4200;
const CLOSE_RATE = 0.08;

function formatCurrency(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n}`;
}

function ParticleStream({ speed }: { speed: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const speedRef = useRef(speed);

  useEffect(() => { speedRef.current = speed; }, [speed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width = canvas.offsetWidth;
    const H = canvas.height = canvas.offsetHeight;

    type P = { x: number; y: number; vy: number; alpha: number; radius: number; color: string };
    const colors = ['#22d3ee', '#06b6d4', '#14b8a6', '#5eead4', '#67e8f9'];

    const particles: P[] = Array.from({ length: 80 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vy: 0.5 + Math.random() * 2,
      alpha: 0.3 + Math.random() * 0.7,
      radius: 1 + Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    let animId: number;
    function draw() {
      ctx!.clearRect(0, 0, W, H);
      const s = speedRef.current;
      for (const p of particles) {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.fillStyle = p.color + Math.round(p.alpha * 255).toString(16).padStart(2, '0');
        ctx!.fill();
        p.y += p.vy * s;
        if (p.y > H) { p.y = -5; p.x = Math.random() * W; }
      }
      animId = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full rounded-xl" />;
}

export default function PipelineSimulator() {
  const [leads, setLeads] = useState(2500);

  const revenue = Math.round(leads * CLOSE_RATE * AVG_DEAL_VALUE);
  const closedDeals = Math.round(leads * CLOSE_RATE);
  const pct = (leads - MIN_LEADS) / (MAX_LEADS - MIN_LEADS);
  const particleSpeed = 0.4 + pct * 2.6;

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLeads(Number(e.target.value));
  }, []);

  return (
    <section id="process" className="relative py-24 overflow-hidden bg-slate-950">
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(ellipse at 30% 60%, rgba(6,182,212,0.06) 0%, transparent 60%)'
      }} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-4">
            Pipeline Simulator
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            See Your Revenue{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
              Multiply.
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Drag the slider to see how many leads you want per month and watch your projected revenue update instantly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative rounded-2xl border border-cyan-500/20 bg-slate-900/60 backdrop-blur-sm p-6 sm:p-10"
          style={{ boxShadow: '0 0 60px rgba(6,182,212,0.08)' }}
        >
          {/* Particle canvas */}
          <div className="relative rounded-xl overflow-hidden h-36 mb-8 border border-slate-800/60 bg-slate-950/80">
            <ParticleStream speed={particleSpeed} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-slate-400 text-xs font-medium uppercase tracking-widest mb-1">Flow Intensity</div>
                <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
                  {leads.toLocaleString()} leads/mo
                </div>
              </div>
            </div>
          </div>

          {/* Slider */}
          <div className="mb-10">
            <div className="flex justify-between text-xs text-slate-500 mb-3">
              <span>500 leads</span>
              <span>10,000 leads</span>
            </div>
            <div className="relative">
              <input
                type="range"
                min={MIN_LEADS}
                max={MAX_LEADS}
                step={100}
                value={leads}
                onChange={handleChange}
                className="w-full h-2 rounded-full appearance-none cursor-pointer outline-none"
                style={{
                  background: `linear-gradient(to right, #06b6d4 0%, #14b8a6 ${pct * 100}%, #1e293b ${pct * 100}%, #1e293b 100%)`,
                }}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <motion.div
              key={leads + '-revenue'}
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
              className="rounded-xl bg-slate-800/50 border border-cyan-500/15 p-5 text-center"
            >
              <div className="flex items-center justify-center gap-2 text-slate-400 text-xs font-medium mb-2">
                <DollarSign className="w-3.5 h-3.5 text-cyan-400" />
                Est. Monthly Revenue Added
              </div>
              <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
                {formatCurrency(revenue)}
              </div>
              <div className="text-slate-500 text-xs mt-1">based on 8% close rate</div>
            </motion.div>

            <div className="rounded-xl bg-slate-800/50 border border-slate-700/40 p-5 text-center">
              <div className="flex items-center justify-center gap-2 text-slate-400 text-xs font-medium mb-2">
                <Users className="w-3.5 h-3.5 text-teal-400" />
                Closed Deals / Month
              </div>
              <div className="text-3xl font-extrabold text-teal-400">{closedDeals}</div>
              <div className="text-slate-500 text-xs mt-1">new customers</div>
            </div>

            <div className="rounded-xl bg-slate-800/50 border border-slate-700/40 p-5 text-center">
              <div className="flex items-center justify-center gap-2 text-slate-400 text-xs font-medium mb-2">
                <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
                12-Month Pipeline
              </div>
              <div className="text-3xl font-extrabold text-purple-400">
                {formatCurrency(revenue * 12)}
              </div>
              <div className="text-slate-500 text-xs mt-1">annual projection</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* eslint-disable-next-line react/no-unknown-property */}
      <style>{`
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px; height: 20px; border-radius: 50%;
          background: linear-gradient(135deg, #22d3ee, #14b8a6);
          cursor: pointer; box-shadow: 0 0 12px rgba(6,182,212,0.6);
          border: 2px solid rgba(255,255,255,0.1);
        }
        input[type='range']::-moz-range-thumb {
          width: 20px; height: 20px; border-radius: 50%;
          background: linear-gradient(135deg, #22d3ee, #14b8a6);
          cursor: pointer; box-shadow: 0 0 12px rgba(6,182,212,0.6);
          border: 2px solid rgba(255,255,255,0.1);
        }
      `}</style>
    </section>
  );
}
