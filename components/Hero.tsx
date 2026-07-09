'use client';

import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Users, Zap, CheckCircle } from 'lucide-react';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: 'easeOut' },
} as const);

const metrics = [
  { value: '12,493', label: 'Leads injected today', icon: TrendingUp, color: '#0891b2' },
  { value: '94%', label: 'Email accuracy rate', icon: CheckCircle, color: '#0d9488' },
  { value: '<2 min', label: 'CRM sync time', icon: Zap, color: '#7c3aed' },
];

const steps = [
  { label: 'Data Sourcing', sub: '50+ networks crawled', pct: 100 },
  { label: 'Intent Scoring', sub: 'AI-ranked by signal', pct: 78 },
  { label: 'Enrichment', sub: 'Email + LinkedIn verified', pct: 60 },
  { label: 'CRM Injection', sub: 'Real-time pipeline push', pct: 44 },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white pt-16">

      {/* Subtle dot-grid background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #e2e8f0 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          opacity: 0.55,
        }}
      />
      {/* Soft cyan bloom — top right */}
      <div className="absolute -top-40 right-0 w-[680px] h-[680px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(8,145,178,0.07) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">

          {/* ── LEFT ── */}
          <div className="flex flex-col">

            {/* Eyebrow */}
            <motion.div {...fade(0)} className="flex items-center gap-2 mb-8">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.18em] uppercase text-cyan-700 bg-cyan-50 border border-cyan-200 px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                AI · B2B Lead Generation
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 {...fade(0.08)}
              className="mb-6 leading-[1.08] tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <span className="block text-5xl sm:text-6xl xl:text-7xl font-light text-slate-900">
                Stop chasing.
              </span>
              <span className="block text-5xl sm:text-6xl xl:text-7xl font-extrabold text-slate-900 mt-1">
                Start{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 text-transparent bg-clip-text"
                    style={{ backgroundImage: 'linear-gradient(135deg, #0891b2, #0d9488)' }}>
                    flooding.
                  </span>
                  {/* Underline accent */}
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.7, delay: 0.55, ease: 'easeOut' }}
                    className="absolute -bottom-1 left-0 right-0 h-1 rounded-full origin-left"
                    style={{ background: 'linear-gradient(90deg, #0891b2, #0d9488)' }}
                  />
                </span>
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p {...fade(0.16)}
              className="text-slate-500 text-lg leading-relaxed mb-10 max-w-lg"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Lead Waterfall deploys autonomous AI agents that scrape, score, and inject
              high-converting B2B prospects directly into your CRM —
              <span className="text-slate-800 font-medium"> without lifting a finger.</span>
            </motion.p>

            {/* CTAs */}
            <motion.div {...fade(0.22)} className="flex flex-wrap items-center gap-4 mb-12">
              <button
                onClick={() => document.getElementById('leadcapture')?.scrollIntoView({ behavior: 'smooth' })}
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold text-white
                  transition-all duration-200 hover:scale-[1.03] hover:shadow-xl"
                style={{ background: 'linear-gradient(135deg, #0891b2, #0d9488)', boxShadow: '0 4px 24px rgba(8,145,178,0.30)' }}
              >
                Start Free Trial
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-slate-700
                border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50
                transition-all duration-200"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                See how it works
              </button>
            </motion.div>

            {/* Trust strip */}
            <motion.div {...fade(0.30)} className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {['No credit card required', '7-day free trial', 'Cancel anytime'].map((t) => (
                <span key={t} className="flex items-center gap-1.5 text-xs text-slate-400"
                  style={{ fontFamily: 'var(--font-body)' }}>
                  <CheckCircle className="w-3.5 h-3.5 text-teal-500 flex-shrink-0" />
                  {t}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Clean dashboard visual ── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="relative"
          >
            {/* Main card */}
            <div className="relative bg-white rounded-3xl border border-slate-100 shadow-2xl shadow-slate-200/60 p-6 overflow-hidden">

              {/* Card header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-[11px] font-semibold tracking-widest uppercase text-slate-400 mb-0.5"
                    style={{ fontFamily: 'var(--font-body)' }}>Pipeline Status</p>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-sm font-bold text-slate-800"
                      style={{ fontFamily: 'var(--font-display)' }}>Active · Injecting now</span>
                  </div>
                </div>
                <span className="text-[10px] font-semibold tracking-widest uppercase bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full">
                  LIVE
                </span>
              </div>

              {/* Metric cards row */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {metrics.map((m, i) => {
                  const Icon = m.icon;
                  return (
                    <motion.div
                      key={m.label}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                      className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100"
                    >
                      <Icon className="w-4 h-4 mb-2" style={{ color: m.color }} />
                      <div className="text-xl font-extrabold text-slate-900 leading-tight"
                        style={{ fontFamily: 'var(--font-display)' }}>{m.value}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5 leading-tight"
                        style={{ fontFamily: 'var(--font-body)' }}>{m.label}</div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Pipeline funnel bars */}
              <div className="space-y-3">
                <p className="text-[11px] font-semibold tracking-widest uppercase text-slate-400 mb-3"
                  style={{ fontFamily: 'var(--font-body)' }}>Pipeline Flow</p>
                {steps.map((s, i) => (
                  <div key={s.label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-100 text-[10px] font-bold text-slate-500 flex items-center justify-center"
                          style={{ fontFamily: 'var(--font-display)' }}>{i + 1}</span>
                        <span className="text-xs font-semibold text-slate-700"
                          style={{ fontFamily: 'var(--font-body)' }}>{s.label}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">{s.sub}</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${s.pct}%` }}
                        transition={{ duration: 0.9, delay: 0.6 + i * 0.12, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{ background: 'linear-gradient(90deg, #0891b2, #0d9488)' }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom tag */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-[11px] text-slate-400" style={{ fontFamily: 'var(--font-body)' }}>
                    50+ data networks connected
                  </span>
                </div>
                <span className="text-[10px] font-bold text-cyan-600 tracking-wide uppercase">
                  Updated 2s ago
                </span>
              </div>
            </div>

            {/* Floating badge — top left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="absolute -top-4 -left-4 bg-white rounded-2xl border border-slate-100 shadow-lg px-4 py-2.5 flex items-center gap-2.5"
            >
              <span className="text-xl">🎯</span>
              <div>
                <div className="text-xs font-bold text-slate-800" style={{ fontFamily: 'var(--font-display)' }}>Intent matched</div>
                <div className="text-[10px] text-slate-400">3 hot leads just added</div>
              </div>
            </motion.div>

            {/* Floating badge — bottom right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.05 }}
              className="absolute -bottom-4 -right-4 bg-white rounded-2xl border border-slate-100 shadow-lg px-4 py-2.5 flex items-center gap-2.5"
            >
              <span className="text-xl">⚡</span>
              <div>
                <div className="text-xs font-bold text-slate-800" style={{ fontFamily: 'var(--font-display)' }}>CRM synced</div>
                <div className="text-[10px] text-slate-400">Salesforce · 1 min ago</div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
