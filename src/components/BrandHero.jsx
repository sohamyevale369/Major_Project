import React from 'react';
import { 
  ShieldCheck, 
  Activity, 
  Sparkles, 
  Lock, 
  Stethoscope, 
  FileCheck2, 
  BrainCircuit, 
  CheckCircle2,
  Users,
  Cpu
} from 'lucide-react';

export default function BrandHero() {
  return (
    <div className="relative flex flex-col justify-between h-full p-8 lg:p-12 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-darkbg-800 to-slate-950 border border-slate-800/80 shadow-2xl">
      {/* Background ambient lighting */}
      <div className="absolute top-0 -left-20 w-80 h-80 bg-mediteal-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-mediblue-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* Top Header & Brand Identity */}
      <div className="relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-mediteal-500/10 border border-mediteal-500/25 text-mediteal-300 text-xs font-semibold backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mediteal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-mediteal-500"></span>
          </span>
          <span>v2.4 Live • Enterprise Clinical AI Security</span>
        </div>

        <div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-mediteal-500 via-mediteal-600 to-mediblue-500 p-0.5 shadow-lg shadow-mediteal-500/30 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-mediteal-400">
                <BrainCircuit className="w-6 h-6 animate-pulse" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
                MediSafe <span className="bg-gradient-to-r from-mediteal-400 to-cyan-400 bg-clip-text text-transparent">AI</span>
              </h1>
              <p className="text-xs text-slate-400 font-medium tracking-wide">
                Next-Gen Healthcare Security & Diagnosis Engine
              </p>
            </div>
          </div>

          <p className="mt-5 text-slate-300 text-sm leading-relaxed max-w-lg font-normal">
            Safeguarding clinical workflows with multi-agent AI verification, instant drug-interaction conflict detection, and zero-knowledge patient data privacy.
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md flex items-start gap-3 hover:border-mediteal-500/40 transition-all">
            <div className="p-2 rounded-xl bg-mediteal-500/10 text-mediteal-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-200">HIPAA & SOC-2 Validated</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">End-to-end 256-bit encrypted health records</p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md flex items-start gap-3 hover:border-mediblue-500/40 transition-all">
            <div className="p-2 rounded-xl bg-mediblue-500/10 text-mediblue-400 shrink-0">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-200">99.8% Prescription Accuracy</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">AI cross-referencing 500,000+ compounds</p>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Interactive / Visual Showcase Card */}
      <div className="relative z-10 my-6">
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-700/60 shadow-xl backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-mediteal-400 animate-pulse" />
              <span className="text-xs font-bold tracking-wide uppercase text-slate-300">
                Live AI Diagnostic Telemetry
              </span>
            </div>
            <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Online
            </span>
          </div>

          {/* Simulated ECG Rhythm SVG */}
          <div className="relative h-12 w-full overflow-hidden rounded-lg bg-slate-950/80 border border-slate-800/60 flex items-center">
            <svg className="w-full h-10 text-mediteal-400/80" viewBox="0 0 500 40" preserveAspectRatio="none">
              <path
                d="M 0 20 L 60 20 L 80 5 L 95 35 L 115 10 L 130 25 L 140 20 L 220 20 L 240 5 L 255 35 L 275 10 L 290 25 L 300 20 L 380 20 L 400 5 L 415 35 L 435 10 L 450 25 L 460 20 L 500 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-mediteal-400/20 to-transparent w-24 animate-ecg" />
          </div>

          {/* Quick Stats Rows */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 rounded-xl bg-slate-950/50 border border-slate-800/60">
              <div className="text-[10px] text-slate-400 uppercase font-medium">Latency</div>
              <div className="text-xs font-bold text-mediteal-300 mt-0.5">12 ms</div>
            </div>
            <div className="p-2 rounded-xl bg-slate-950/50 border border-slate-800/60">
              <div className="text-[10px] text-slate-400 uppercase font-medium">Anomalies</div>
              <div className="text-xs font-bold text-emerald-400 mt-0.5">0 Detected</div>
            </div>
            <div className="p-2 rounded-xl bg-slate-950/50 border border-slate-800/60">
              <div className="text-[10px] text-slate-400 uppercase font-medium">Integrity</div>
              <div className="text-xs font-bold text-cyan-300 mt-0.5">100% Guarded</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Trust & Compliance Footer */}
      <div className="relative z-10 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-slate-500" />
          <span>Trusted by 450+ Hospitals & Research Labs</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Lock className="w-3.5 h-3.5 text-mediteal-400" /> AES-256
          </span>
          <span className="flex items-center gap-1">
            <FileCheck2 className="w-3.5 h-3.5 text-mediblue-400" /> ISO 27001
          </span>
        </div>
      </div>
    </div>
  );
}
