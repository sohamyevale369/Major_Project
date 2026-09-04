import React from 'react';
import { UserCheck, Camera, Activity, HeartHandshake, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useHealth } from '../../context/HealthContext';

export default function HowItWorks() {
  const { setActiveTab } = useHealth();

  const steps = [
    {
      stepNumber: '01',
      title: 'Enter Your Health Details',
      subtitle: 'Takes less than 1 minute',
      description: 'Input simple details like your age, any conditions you have (like kidney disease or high blood pressure), and known allergies.',
      icon: UserCheck,
      color: 'from-sky-500 to-mediblue-600',
      badge: 'Step 1: Your Profile',
      actionText: 'View Sample Profile',
      actionTab: 'profile'
    },
    {
      stepNumber: '02',
      title: 'Add Your Medicine or Rx Slip',
      subtitle: 'Type pill name or snap a photo',
      description: 'Type the medicine name (like Ibuprofen or Amoxicillin) or upload a photo of your doctor’s prescription for automatic scanning.',
      icon: Camera,
      color: 'from-mediteal-400 to-emerald-600',
      badge: 'Step 2: Medication',
      actionText: 'Try Rx Scanner',
      actionTab: 'ocr'
    },
    {
      stepNumber: '03',
      title: 'See Your Safety Color & Why',
      subtitle: 'Green 🟢, Yellow 🟡, Red 🔴',
      description: 'Get an instant safety score from 0 to 100%. MediSafe AI explains in plain English why your age, dosage, or condition triggered the score.',
      icon: Activity,
      color: 'from-amber-400 to-rose-500',
      badge: 'Step 3: Explainable AI',
      actionText: 'See Risk Checker',
      actionTab: 'risk-checker'
    },
    {
      stepNumber: '04',
      title: 'Discover Safer Alternatives',
      subtitle: 'Doctor-reviewed options',
      description: 'If your medicine poses a high risk, MediSafe AI suggests lower-risk alternatives to discuss with your healthcare professional.',
      icon: HeartHandshake,
      color: 'from-emerald-400 to-teal-600',
      badge: 'Step 4: Safer Recs',
      actionText: 'Check Alternatives',
      actionTab: 'risk-checker'
    }
  ];

  return (
    <section className="py-16 bg-slate-900/50 border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-mediteal-400 bg-mediteal-500/10 px-3 py-1 rounded-full border border-mediteal-500/20">
            Simple & Easy To Use
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
            How MediSafe AI Protects You in 4 Steps
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2">
            No technical knowledge needed. Designed for everyday patients, families, and healthcare workers.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.stepNumber}
                className="relative rounded-2xl border border-slate-800 bg-slate-900/90 p-6 flex flex-col justify-between hover:border-slate-700 transition-all hover:-translate-y-1 shadow-md hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {step.badge}
                    </span>
                    <span className="font-mono text-2xl font-black text-slate-700">
                      {step.stepNumber}
                    </span>
                  </div>

                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} p-2.5 text-slate-950 flex items-center justify-center mb-4 shadow-lg`}>
                    <Icon className="w-6 h-6 stroke-[2.5]" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1">
                    {step.title}
                  </h3>
                  <div className="text-xs font-semibold text-mediteal-400 mb-2">
                    {step.subtitle}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80">
                  <button
                    onClick={() => {
                      setActiveTab(step.actionTab);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex items-center gap-1.5 text-xs font-semibold text-mediteal-300 hover:text-white transition group"
                  >
                    <span>{step.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Traffic Light Quick Guide Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-700/80 shadow-lg">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center lg:text-left">
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center justify-center lg:justify-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                The Simple Traffic-Light Color Guide
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                You never have to decipher complicated medical charts to know if a medicine is safe:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto">
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs">
                <span className="w-3 h-3 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
                <div>
                  <strong className="block font-bold">🟢 Green (0–34%)</strong>
                  <span className="text-[11px] text-emerald-200">Safe to take as directed</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs">
                <span className="w-3 h-3 rounded-full bg-amber-400 shrink-0 animate-pulse" />
                <div>
                  <strong className="block font-bold">🟡 Yellow (35–69%)</strong>
                  <span className="text-[11px] text-amber-200">Caution: Monitor side effects</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs">
                <span className="w-3 h-3 rounded-full bg-rose-400 shrink-0 animate-pulse" />
                <div>
                  <strong className="block font-bold">🔴 Red (70–100%)</strong>
                  <span className="text-[11px] text-rose-200">High Risk: Call your doctor</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
