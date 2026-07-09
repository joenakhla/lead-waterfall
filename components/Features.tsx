'use client';

import { motion } from 'framer-motion';
import { Zap, Target, ShieldCheck, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Autonomous Sourcing',
    copy: 'Our AI agents crawl 50+ data networks simultaneously to pinpoint ready-to-buy decision-makers in real-time.',
    gradient: 'from-cyan-500/20 to-blue-500/10',
    iconColor: 'text-cyan-400',
    iconBg: 'bg-cyan-500/10 border-cyan-500/20',
    glowColor: 'rgba(6,182,212,0.15)',
    size: 'col-span-1 md:col-span-2 row-span-1',
  },
  {
    icon: Target,
    title: 'Predictive Intent Scoring',
    copy: 'Stop wasting time on cold leads. Algorithms analyze historical buying patterns to score every prospect before you even reach out.',
    gradient: 'from-teal-500/20 to-cyan-500/10',
    iconColor: 'text-teal-400',
    iconBg: 'bg-teal-500/10 border-teal-500/20',
    glowColor: 'rgba(20,184,166,0.15)',
    size: 'col-span-1 md:col-span-2 row-span-1',
  },
  {
    icon: ShieldCheck,
    title: 'Instant Pipeline Injection',
    copy: 'Zero manual data entry. Fully validated leads with verified emails are pushed instantly into HubSpot, Salesforce, or your CRM via webhook.',
    gradient: 'from-blue-500/20 to-teal-500/10',
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-500/10 border-blue-500/20',
    glowColor: 'rgba(59,130,246,0.15)',
    size: 'col-span-1 md:col-span-2 row-span-1',
  },
  {
    icon: Sparkles,
    title: 'Hyper-Personalized Copy',
    copy: 'AI automatically drafts customized outreach angles based on the prospect\'s recent LinkedIn activity, breaking through the noise instantly.',
    gradient: 'from-purple-500/20 to-cyan-500/10',
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-500/10 border-purple-500/20',
    glowColor: 'rgba(168,85,247,0.15)',
    size: 'col-span-1 md:col-span-2 row-span-1',
  },
];

const statItems = [
  { value: '50+', label: 'Data Networks' },
  { value: '10M+', label: 'Prospects Indexed' },
  { value: '94%', label: 'Email Accuracy' },
  { value: '<2min', label: 'CRM Injection Time' },
];

export default function Features() {
  return (
    <section id="features" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-slate-950">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(ellipse at 50% 50%, rgba(6,182,212,0.05) 0%, transparent 70%)'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-4">
            Core Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Four Engines.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
              One Relentless Flow.
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Every component of the Lead Waterfall system works in concert to deliver a constant, qualified stream into your pipeline.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`group relative rounded-2xl p-6 cursor-default
                  bg-slate-900/60 backdrop-blur-sm
                  border border-slate-800/60 hover:border-cyan-500/30
                  transition-all duration-300 hover:scale-[1.02]`}
                style={{ boxShadow: `0 0 0 0 ${feat.glowColor}` }}
                whileHover={{ boxShadow: `0 8px 40px -8px ${feat.glowColor}` }}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                {/* Content */}
                <div className="relative z-10">
                  <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl border ${feat.iconBg} mb-4`}>
                    <Icon className={`w-5 h-5 ${feat.iconColor}`} />
                  </div>
                  <h3 className="text-white font-bold text-base mb-2">{feat.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feat.copy}</p>
                </div>

                {/* Corner glow on hover */}
                <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-300`}
                  style={{ background: feat.glowColor.replace('0.15', '0.6'), transform: 'translate(30%, -30%)' }} />
              </motion.div>
            );
          })}
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {statItems.map((stat) => (
            <div key={stat.label} className="text-center p-5 rounded-xl bg-slate-900/40 border border-slate-800/50">
              <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300 mb-1">
                {stat.value}
              </div>
              <div className="text-slate-500 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
