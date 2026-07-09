'use client';

import { Droplets, X, Link, GitBranch, Mail } from 'lucide-react';

const footerLinks = {
  Product: ['Features', 'Pricing', 'Integrations', 'Changelog', 'Roadmap'],
  Company: ['About', 'Blog', 'Careers', 'Press', 'Contact'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR', 'Security'],
};

const socials = [
  { icon: X, label: 'X / Twitter', href: '#' },
  { icon: Link, label: 'LinkedIn', href: '#' },
  { icon: GitBranch, label: 'GitHub', href: '#' },
  { icon: Mail, label: 'Email', href: 'mailto:hello@leadwaterfall.ai' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-slate-800/60 bg-slate-950">
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(ellipse at 50% 100%, rgba(6,182,212,0.04) 0%, transparent 60%)'
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center shadow-[0_0_12px_rgba(6,182,212,0.4)]">
                <Droplets className="w-4 h-4 text-slate-950" strokeWidth={2.5} />
              </div>
              <span className="text-white font-bold text-lg">
                Lead <span className="text-cyan-400">Waterfall</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs mb-6">
              Autonomous AI agents that flood your sales pipeline with high-intent B2B prospects. Stop trickling. Start flooding.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <div className="text-white text-sm font-semibold mb-4">{group}</div>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-slate-500 hover:text-cyan-400 text-sm transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} Lead Waterfall, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-slate-600 text-xs">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
