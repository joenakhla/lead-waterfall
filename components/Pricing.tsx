'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Zap, Building2, ArrowRight } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    icon: Zap,
    price: { monthly: 199, annual: 159 },
    description: 'Perfect for solo founders and small sales teams getting started with AI lead gen.',
    highlight: false,
    badge: null,
    features: [
      '500 verified leads/month',
      'Email + LinkedIn sourcing',
      'Basic intent scoring',
      'CSV export',
      'Webhook (1 CRM)',
      'Email support',
    ],
    cta: 'Start Free Trial',
    ctaStyle: 'border border-slate-700 text-white hover:border-cyan-500/40 hover:bg-slate-800/60',
  },
  {
    name: 'Growth',
    icon: Sparkles,
    price: { monthly: 499, annual: 399 },
    description: 'For growing teams that need high-volume, high-quality pipeline on autopilot.',
    highlight: true,
    badge: 'Most Popular',
    features: [
      '5,000 verified leads/month',
      '50+ data network crawl',
      'Predictive intent scoring',
      'AI outreach copy drafts',
      'Unlimited CRM webhooks',
      'Real-time pipeline injection',
      'Priority support (24h)',
      'Analytics dashboard',
    ],
    cta: 'Start Free Trial',
    ctaStyle: 'bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-bold shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:from-cyan-300 hover:to-teal-300',
  },
  {
    name: 'Enterprise',
    icon: Building2,
    price: { monthly: null, annual: null },
    description: 'Custom volume, dedicated agents, and white-glove onboarding for scaled operations.',
    highlight: false,
    badge: null,
    features: [
      'Unlimited leads/month',
      'Dedicated AI agent cluster',
      'Custom data sources & enrichment',
      'On-prem / private cloud deploy',
      'SLA-backed uptime guarantee',
      'Dedicated CSM + Slack channel',
      'Custom integrations & API',
      'SOC 2 & GDPR compliance',
    ],
    cta: 'Contact Sales',
    ctaStyle: 'border border-slate-700 text-white hover:border-cyan-500/40 hover:bg-slate-800/60',
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="relative py-24 overflow-hidden bg-slate-950">
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(ellipse at 70% 40%, rgba(20,184,166,0.06) 0%, transparent 55%)'
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-4">
            Transparent Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Choose Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
              Flow Rate.
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto mb-8">
            Every plan includes a 7-day free trial. No credit card required to start.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-slate-900/60 border border-slate-800/60 rounded-xl p-1.5">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                !annual ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                annual ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              Annual
              <span className="text-[10px] font-bold text-green-400 bg-green-400/10 px-1.5 py-0.5 rounded-full">-20%</span>
            </button>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className={`relative rounded-2xl p-7 flex flex-col
                  ${plan.highlight
                    ? 'bg-slate-900/80 border-2 border-cyan-500/50'
                    : 'bg-slate-900/40 border border-slate-800/60'
                  }
                  transition-all duration-300 hover:scale-[1.01]
                `}
                style={plan.highlight ? { boxShadow: '0 0 40px rgba(6,182,212,0.15), 0 0 80px rgba(6,182,212,0.05)' } : {}}
              >
                {/* Most Popular badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-400 shadow-[0_0_12px_rgba(6,182,212,0.4)]">
                    {plan.badge}
                  </div>
                )}

                {/* Glow top border for highlighted */}
                {plan.highlight && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                )}

                {/* Plan header */}
                <div className="mb-6">
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-4
                    ${plan.highlight ? 'bg-cyan-500/10 border border-cyan-500/30' : 'bg-slate-800/60 border border-slate-700/40'}`}>
                    <Icon className={`w-5 h-5 ${plan.highlight ? 'text-cyan-400' : 'text-slate-400'}`} />
                  </div>
                  <div className="text-white font-bold text-xl mb-1">{plan.name}</div>
                  <p className="text-slate-500 text-sm leading-relaxed">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  {plan.price.monthly ? (
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-extrabold text-white">
                        ${annual ? plan.price.annual : plan.price.monthly}
                      </span>
                      <span className="text-slate-500 text-sm mb-1.5">/mo</span>
                      {annual && (
                        <span className="ml-2 text-green-400 text-xs font-semibold mb-1.5">
                          billed annually
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
                      Custom
                    </div>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.highlight ? 'text-cyan-400' : 'text-teal-500'}`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => document.getElementById('leadcapture')?.scrollIntoView({ behavior: 'smooth' })}
                  className={`group w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm transition-all duration-200 ${plan.ctaStyle}`}
                >
                  {plan.cta}
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-center text-slate-600 text-sm mt-10"
        >
          All plans include a 7-day free trial · Cancel anytime · No setup fees
        </motion.p>
      </div>
    </section>
  );
}
