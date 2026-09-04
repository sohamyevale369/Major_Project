import React from 'react';
import { 
  ShieldCheck, 
  BrainCircuit, 
  HelpCircle, 
  Lock, 
  Globe2, 
  Sparkles,
  HeartHandshake
} from 'lucide-react';
import BrandHero from './BrandHero';

export default function AuthLayout({ 
  children, 
  activeTab, 
  setActiveTab,
  onOpenHelp 
}) {
  return (
    <div className="min-h-screen w-full bg-slate-950 bg-radial-gradient text-slate-100 flex flex-col justify-between relative overflow-hidden">
      {/* Background Grid & Ambient Glows */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-mediteal-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Navigation Bar */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between border-b border-slate-800/40 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-mediteal-500 to-mediblue-600 flex items-center justify-center text-white shadow-md shadow-mediteal-500/20">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1">
              MediSafe <span className="text-mediteal-400">AI</span>
            </span>
            <span className="hidden sm:inline-block text-[11px] text-slate-400 block -mt-1">
              Clinical Safety & Diagnostic Gateway
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>HIPAA Compliant Node #402</span>
          </div>

          <button
            onClick={onOpenHelp}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-700 hover:bg-slate-800 transition-all"
          >
            <HelpCircle className="w-4 h-4 text-mediteal-400" />
            <span className="hidden sm:inline">Clinical Support</span>
          </button>
        </div>
      </header>

      {/* Main Authentication Arena */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex items-center justify-center flex-1">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Brand Hero & Live Healthcare Telemetry (Hidden on small mobile if preferred, or stacked cleanly) */}
          <div className="hidden lg:flex lg:col-span-6 xl:col-span-7 flex-col">
            <BrandHero />
          </div>

          {/* Right Column: Authentication Card */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl shadow-2xl border border-slate-800/80 relative overflow-hidden">
              {/* Subtle top card glow */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-mediteal-500 via-cyan-400 to-mediblue-600" />

              {/* Tab Switcher */}
              <div className="flex rounded-2xl bg-slate-950/80 p-1 border border-slate-800/80 mb-6">
                <button
                  type="button"
                  onClick={() => setActiveTab('login')}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                    activeTab === 'login'
                      ? 'bg-gradient-to-r from-mediteal-500/20 to-mediblue-500/20 text-mediteal-300 border border-mediteal-500/40 shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('register')}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                    activeTab === 'register'
                      ? 'bg-gradient-to-r from-mediteal-500/20 to-mediblue-500/20 text-mediteal-300 border border-mediteal-500/40 shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* Form Content */}
              {children}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-t border-slate-800/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span>&copy; {new Date().getFullYear()} MediSafe AI Platform Inc. All rights reserved.</span>
        </div>

        <div className="flex items-center gap-4">
          <a href="#privacy" className="hover:text-slate-300 transition-colors">HIPAA Privacy Charter</a>
          <span>•</span>
          <a href="#terms" className="hover:text-slate-300 transition-colors">Terms of Diagnostic Service</a>
          <span>•</span>
          <a href="#security" className="hover:text-slate-300 transition-colors">Zero-Trust Whitepaper</a>
        </div>
      </footer>
    </div>
  );
}
