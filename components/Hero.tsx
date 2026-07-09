'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import FunnelCanvas from './FunnelCanvas';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0 bg-[#080c14]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(ellipse at 72% 50%, rgba(6,182,212,0.13) 0%, transparent 50%),
            radial-gradient(ellipse at 18% 40%, rgba(20,184,166,0.05) 0%, transparent 45%)
          `
        }} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[calc(100vh-4rem)] py-16 lg:py-24">

          {/* ── LEFT: Text content ── */}
          <div className="flex flex-col justify-center order-2 lg:order-1">

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08 }}
              className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-[1.05] mb-6"
            >
              Push Unstoppable{' '}
              <span
                className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-500"
                style={{ filter: 'drop-shadow(0 0 18px rgba(6,182,212,0.45))' }}
              >
                Volume
              </span>{' '}
              Into Your Sales Pipeline
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.16 }}
              className="text-slate-400 text-lg leading-relaxed mb-10 max-w-xl"
            >
              Lead Waterfall uses autonomous AI agents to scrape, score, and inject high-converting B2B prospects directly into your CRM on autopilot.{' '}
              <span className="text-slate-200 font-medium">Stop trickling. Start flooding.</span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-12"
            >
              <button
                onClick={() => document.getElementById('leadcapture')?.scrollIntoView({ behavior: 'smooth' })}
                className="group flex items-center gap-2.5 px-8 py-3.5 rounded-full text-base font-semibold text-slate-950
                  bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300
                  transition-all duration-200 shadow-[0_0_24px_rgba(6,182,212,0.4)] hover:shadow-[0_0_36px_rgba(6,182,212,0.65)]
                  hover:scale-[1.03]"
              >
                Start Your Free Trial
              </button>
              <button className="group flex items-center gap-2.5 px-7 py-3.5 rounded-full text-base font-semibold text-white
                border border-slate-600/70 hover:border-cyan-500/40 bg-slate-900/40 hover:bg-slate-800/60
                transition-all duration-200"
              >
                <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center group-hover:border-cyan-500/50 transition-colors">
                  <Play className="w-2.5 h-2.5 text-white ml-0.5" />
                </div>
                Watch Demo
              </button>
            </motion.div>

            {/* Social proof strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap items-center gap-6"
            >
              {[
                { value: '12,493', label: 'Leads injected today' },
                { value: '94%', label: 'Email accuracy' },
                { value: '<2 min', label: 'CRM sync time' },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-2">
                  <div className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
                    {s.value}
                  </div>
                  <div className="text-slate-500 text-xs leading-tight">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Funnel visual ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
            className="relative order-1 lg:order-2 flex flex-col items-center"
          >
            {/* Outer glow halo */}
            <div className="absolute inset-0 rounded-3xl"
              style={{ background: 'radial-gradient(ellipse at 50% 45%, rgba(6,182,212,0.12) 0%, transparent 70%)' }} />

            {/* Canvas container */}
            <div className="relative w-full aspect-[4/5] max-w-sm sm:max-w-md lg:max-w-full lg:h-[580px] lg:aspect-auto">
              <FunnelCanvas className="rounded-2xl" />

              {/* Dashboard card overlay — bottom right */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                className="absolute bottom-4 right-2 sm:right-4 w-52 sm:w-60 rounded-xl border border-cyan-500/25 bg-slate-950/90 backdrop-blur-sm p-3.5 shadow-xl"
                style={{ boxShadow: '0 0 30px rgba(6,182,212,0.12)' }}
              >
                {/* Top glow line */}
                <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />

                <div className="flex items-center gap-1.5 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-cyan-400 text-[9px] font-bold tracking-[0.2em] uppercase">Live Pipeline Injection</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-slate-500 text-[9px] font-medium uppercase tracking-wide mb-0.5">Leads Pushed</div>
                    <div className="flex items-end gap-1">
                      <span className="text-xl font-extrabold text-white">12,493</span>
                      <span className="text-cyan-400 text-xs mb-0.5 font-bold">↑</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-500 text-[9px] font-medium uppercase tracking-wide mb-1">AI Conversion</div>
                    {/* Mini bar chart */}
                    <div className="flex items-end gap-0.5 h-6">
                      {[6, 9, 7, 11, 10, 14, 13].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-sm bg-cyan-500/70"
                          style={{ height: `${(h / 14) * 100}%` }}
                        />
                      ))}
                    </div>
                    <div className="text-cyan-400 text-xs font-bold mt-0.5">66%</div>
                  </div>
                </div>
              </motion.div>

              {/* Top-left floating stat pill */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="absolute top-6 left-2 sm:left-4 flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal-500/25 bg-slate-950/85 backdrop-blur-sm text-xs"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                <span className="text-teal-400 font-semibold">50+ data networks</span>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
