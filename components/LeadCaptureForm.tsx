'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Building2, Target, CheckCircle2, Loader2, Zap } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function LeadCaptureForm() {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [leadGoal, setLeadGoal] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setErrorMsg('');

    try {
      const { error } = await supabase.from('leads').insert([
        {
          email,
          company_name: company || null,
          lead_goal: leadGoal || null,
        },
      ]);

      if (error) throw error;
      setStatus('success');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setErrorMsg(message);
      setStatus('error');
    }
  };

  return (
    <section id="leadcapture" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-slate-950">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(ellipse at 50% 0%, rgba(6,182,212,0.12) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 100%, rgba(20,184,166,0.06) 0%, transparent 50%)
          `
        }} />
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(6,182,212,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.02) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-4">
              <Zap className="w-3 h-3" /> Free Lead List
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
              Ready to Open the{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
                Floodgates?
              </span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              Drop your details below to get a custom, AI-generated list of{' '}
              <span className="text-white font-semibold">50 high-intent leads</span> tailored for your business within{' '}
              <span className="text-cyan-400 font-semibold">10 minutes</span>.
            </p>
          </div>

          {/* Card */}
          <div className="relative rounded-2xl bg-slate-900/70 backdrop-blur-sm border border-slate-800/60 p-6 sm:p-8"
            style={{ boxShadow: '0 0 60px rgba(6,182,212,0.08), inset 0 1px 0 rgba(255,255,255,0.04)' }}
          >
            {/* Glow border top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-10"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-5"
                  >
                    <CheckCircle2 className="w-8 h-8 text-cyan-400" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-2">Pipeline Activated!</h3>
                  <p className="text-slate-400 text-sm">
                    Your AI-generated lead list is being assembled. Expect it in your inbox within 10 minutes.
                  </p>
                  <div className="mt-6 flex items-center justify-center gap-2 text-cyan-400 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    Agents working now...
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  {/* Email */}
                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-1.5">
                      Business Email <span className="text-cyan-400">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-white placeholder-slate-500 text-sm
                          focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-1.5">
                      Company Name
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Acme Inc."
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-white placeholder-slate-500 text-sm
                          focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Lead Goal */}
                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-1.5">
                      Monthly Lead Goal
                    </label>
                    <div className="relative">
                      <Target className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                      <select
                        value={leadGoal}
                        onChange={(e) => setLeadGoal(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-sm
                          focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all duration-200
                          appearance-none cursor-pointer"
                        style={{ color: leadGoal ? '#f8fafc' : '#64748b' }}
                      >
                        <option value="" className="bg-slate-900 text-slate-400">Select a target range...</option>
                        <option value="under_500" className="bg-slate-900 text-white">Under 500 leads/mo</option>
                        <option value="500_2000" className="bg-slate-900 text-white">500 – 2,000 leads/mo</option>
                        <option value="2000_5000" className="bg-slate-900 text-white">2,000 – 5,000 leads/mo</option>
                        <option value="5000_plus" className="bg-slate-900 text-white">5,000+ leads/mo</option>
                      </select>
                    </div>
                  </div>

                  {/* Error */}
                  {status === 'error' && (
                    <p className="text-red-400 text-sm rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2">
                      {errorMsg}
                    </p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full relative flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-base font-semibold text-slate-950
                      bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300
                      disabled:opacity-70 disabled:cursor-not-allowed
                      transition-all duration-200 shadow-[0_0_20px_rgba(6,182,212,0.35)] hover:shadow-[0_0_30px_rgba(6,182,212,0.55)]
                      hover:scale-[1.01] active:scale-[0.99]"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Activating Pipeline...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4" />
                        Activate My Pipeline
                      </>
                    )}
                  </button>

                  <p className="text-center text-slate-600 text-xs">
                    No credit card required · Results in 10 minutes · Cancel anytime
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
