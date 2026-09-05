import React from 'react';
import {
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Camera,
  AlertTriangle,
  HeartPulse,
  Pill,
  Zap,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { useHealth } from '../../context/HealthContext';
import RiskBadge from '../common/RiskBadge';

export default function HeroSection() {
  const { setActiveTab, loadPatientPreset, runSafetyCheck, activePatients = [], patient } = useHealth();

  const handleQuickDemo = (patientId, drugName, dosage) => {
    const targetPatient = activePatients.find(p => p.id === patientId || p.name.toLowerCase().includes(patientId.toLowerCase())) || activePatients[0] || patient;
    if (targetPatient) {
      loadPatientPreset(targetPatient);
    }
    runSafetyCheck(drugName, dosage);
    setActiveTab('risk-checker');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-radial-gradient pointer-events-none opacity-80" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-mediteal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-24 w-80 h-80 bg-mediblue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Trust Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-mediteal-500/30 bg-mediteal-500/10 text-mediteal-300 text-xs sm:text-sm font-medium shadow-inner animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-mediteal-400" />
            <span>Explainable AI-Powered Medicine Safety for Everyone</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="mt-6 text-center max-w-4xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            Know If Your Medicine Is{' '}
            <span className="bg-gradient-to-r from-mediteal-300 via-mediteal-400 to-sky-400 bg-clip-text text-transparent">
              Truly Safe For You
            </span>{' '}
            In Seconds.
          </h1>
          <p className="text-base sm:text-xl text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed">
            MediSafe AI checks your <strong className="text-white">age, diseases, and allergies</strong> to predict harmful side effects, dangerous pill clashes, and doctor-approved safer alternatives in plain, simple words.
          </p>
        </div>

        {/* Primary Call to Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
          <button
            onClick={() => {
              setActiveTab('risk-checker');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-mediteal-500 to-mediblue-600 hover:from-mediteal-400 hover:to-mediblue-500 text-slate-950 font-bold text-sm sm:text-base shadow-xl shadow-mediteal-500/25 hover:shadow-mediteal-500/40 transform hover:-translate-y-0.5 transition-all"
          >
            <Pill className="w-5 h-5 text-slate-950" />
            <span>Check A Medicine Now</span>
            <ArrowRight className="w-4 h-4 text-slate-950 ml-1" />
          </button>

          <button
            onClick={() => {
              setActiveTab('ocr');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-850 text-white font-semibold text-sm sm:text-base border border-slate-700/80 hover:border-slate-600 shadow-md transition-all"
          >
            <Camera className="w-5 h-5 text-mediteal-400" />
            <span>Upload Prescription (OCR)</span>
          </button>
        </div>

        {/* 1-CLICK INSTANT DEMO PRESETS */}
        <div className="mt-14 pt-10 border-t border-slate-800/80">
          <div className="text-center mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-mediteal-400 bg-mediteal-500/10 px-3 py-1 rounded-full border border-mediteal-500/20">
              ⚡ 1-Click Live Test Demos
            </span>
            <h2 className="text-lg sm:text-2xl font-bold text-white mt-2">
              See How MediSafe AI Works Right Now
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto mt-1">
              Click any realistic patient case below to watch the AI evaluate risks, explain why, and suggest safer options instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            
            {/* Demo Card 1: Senior + Kidney Disease + Ibuprofen */}
            <div className="group relative rounded-2xl border border-rose-500/30 bg-gradient-to-b from-slate-900/90 to-rose-950/20 p-5 hover:border-rose-500/60 transition-all shadow-lg hover:shadow-rose-950/40 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400 bg-rose-500/15 px-2.5 py-0.5 rounded-md border border-rose-500/30">
                    High Risk Conflict
                  </span>
                  <RiskBadge level="HIGH" score={85} size="sm" />
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-rose-200 transition">
                  Senior Patient (68y) + Chronic Kidney Disease + Ibuprofen
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Ibuprofen severely constricts blood flow to impaired kidneys. The AI flags this as <strong className="text-rose-300">85% High Risk</strong> and recommends Paracetamol.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-mono">Patient: Robert Jenkins</span>
                <button
                  onClick={() => handleQuickDemo('patient-1', 'Ibuprofen', '400mg')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-bold border border-rose-500/40 transition group-hover:scale-105"
                >
                  <span>Test Case</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Demo Card 2: Eleanor Vance + Amoxicillin Allergy Conflict */}
            <div className="group relative rounded-2xl border border-amber-500/30 bg-gradient-to-b from-slate-900/90 to-amber-950/20 p-5 hover:border-amber-500/60 transition-all shadow-lg hover:shadow-amber-950/40 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/15 px-2.5 py-0.5 rounded-md border border-amber-500/30">
                    Allergy Alert
                  </span>
                  <RiskBadge level="HIGH" score={89} size="sm" />
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-amber-200 transition">
                  Eleanor (54y) + Penicillin Allergy + Amoxicillin
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Amoxicillin is in the Penicillin antibiotic family. MediSafe AI detects this cross-reactivity and blocks it with an <strong className="text-amber-300">Emergency Allergy Warning</strong>.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-mono">Patient: Eleanor Vance</span>
                <button
                  onClick={() => handleQuickDemo('patient-2', 'Amoxicillin', '500mg')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-bold border border-amber-500/40 transition group-hover:scale-105"
                >
                  <span>Test Case</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Demo Card 3: Devon Clark + Safe Medication Profile */}
            <div className="group relative rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-slate-900/90 to-emerald-950/20 p-5 hover:border-emerald-500/60 transition-all shadow-lg hover:shadow-emerald-950/40 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/15 px-2.5 py-0.5 rounded-md border border-emerald-500/30">
                    Safe Verification
                  </span>
                  <RiskBadge level="LOW" score={15} size="sm" />
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-emerald-200 transition">
                  Young Adult (32y) + Diabetes + Paracetamol
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Standard antipyretic evaluation with no renal, liver, or allergy conflicts. MediSafe assigns a <strong className="text-emerald-300">15% Low Risk</strong> safety score.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-mono">Patient: Devon Clark</span>
                <button
                  onClick={() => handleQuickDemo('patient-4', 'Paracetamol (Acetaminophen)', '500mg')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-bold border border-emerald-500/40 transition group-hover:scale-105"
                >
                  <span>Test Case</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Quick Stats Pill Strip */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-xl sm:text-2xl font-extrabold text-white">100%</div>
            <div className="text-[11px] text-slate-400">Explainable Predictions</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-xl sm:text-2xl font-extrabold text-mediteal-400">0–100%</div>
            <div className="text-[11px] text-slate-400">Side Effect Probabilities</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-xl sm:text-2xl font-extrabold text-sky-400">OCR Ready</div>
            <div className="text-[11px] text-slate-400">Prescription Scanning</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-xl sm:text-2xl font-extrabold text-emerald-400">Safer Recs</div>
            <div className="text-[11px] text-slate-400">Doctor-Reviewed Alternatives</div>
          </div>
        </div>

      </div>
    </section>
  );
}
