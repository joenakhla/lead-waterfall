'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#060e1c]">

      {/* ── Full-bleed hero image ── */}
      <div className="absolute inset-0">
        <Image
          src="/brand/design-idea.png"
          alt="Lead Waterfall — AI-powered B2B lead generation funnel"
          fill
          priority
          quality={90}
          className="object-cover"
          style={{ objectPosition: '72% center' }}
        />
        {/* Left fade so text stays readable */}
        <div className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, rgba(6,14,28,0.97) 0%, rgba(6,14,28,0.95) 38%, rgba(6,14,28,0.60) 55%, rgba(6,14,28,0.05) 75%, transparent 100%)'
          }}
        />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32"
          style={{ background: 'linear-gradient(to top, #060e1c, transparent)' }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12
        min-h-screen flex flex-col justify-center pt-24 pb-16">

        <div className="max-w-2xl">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-7"
          >
            <span className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.22em] uppercase
              text-cyan-400 bg-cyan-500/10 border border-cyan-500/25 px-3.5 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Autonomous AI · Real-Time B2B Leads
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="text-5xl sm:text-6xl xl:text-[4.25rem] font-extrabold leading-[1.07] tracking-tight text-white mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Inject Unstoppable{' '}
            <span className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(90deg, #22d3ee, #2dd4bf)' }}>
              Volume
            </span>{' '}
            Into Your Sales Pipeline.
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="text-slate-400 text-lg leading-relaxed mb-10 max-w-xl"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Lead Waterfall uses autonomous AI agents to scrape, score, and inject
            high-converting B2B prospects directly into your CRM on autopilot.{' '}
            <span className="text-slate-200 font-medium">Stop trickling. Start flooding.</span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.26 }}
            className="flex flex-wrap items-center gap-4 mb-14"
          >
            <button
              onClick={() => document.getElementById('leadcapture')?.scrollIntoView({ behavior: 'smooth' })}
              className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full
                text-sm font-bold text-slate-950 transition-all duration-200
                hover:scale-[1.03] hover:shadow-[0_0_32px_rgba(34,211,238,0.55)]"
              style={{ background: 'linear-gradient(135deg, #22d3ee, #2dd4bf)' }}
            >
              Start Your Free Trial
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full
              text-sm font-semibold text-white border border-white/20
              bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-200"
            >
              <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20
                flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                <Play className="w-2.5 h-2.5 text-white ml-0.5" />
              </div>
              Watch Demo
            </button>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.38 }}
            className="flex flex-wrap items-center gap-x-8 gap-y-3"
          >
            {[
              { value: '12,493', label: 'Leads injected today' },
              { value: '94%',    label: 'Email accuracy' },
              { value: '<2 min', label: 'CRM sync time' },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span className="text-xl font-extrabold text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(90deg, #22d3ee, #2dd4bf)' }}>
                  {s.value}
                </span>
                <span className="text-slate-500 text-xs">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
