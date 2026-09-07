import React from 'react';
import { UserCheck, Camera, Activity, HeartHandshake, ArrowRight, CheckCircle2, ShieldCheck, RefreshCw } from 'lucide-react';
import { useHealth } from '../../context/HealthContext';

export default function HowItWorks() {
  const { setActiveTab } = useHealth();

  const pipelineSteps = [
    {
      num: '01',
      title: 'UPLOAD & SEARCH',
      desc: 'Patient or clinician enters medicine name, dosage, frequency, or snaps a prescription photo for instant optical character recognition.',
      tab: 'risk-checker',
      btnText: 'Start Check'
    },
    {
      num: '02',
      title: 'AI VERIFICATION',
      desc: 'Our trained clinical models cross-evaluate patient age, chronic illnesses (kidney, heart, diabetes), and documented allergies against pharmacological datasets.',
      tab: 'profile',
      btnText: 'View Profile Input'
    },
    {
      num: '03',
      title: 'QUALITY & RISK GATE',
      desc: 'Overall personalized risk score (0–100%) is generated with individual side effect probabilities (headache, nausea, renal stress).',
      tab: 'risk-checker',
      btnText: 'See Risk Engine'
    },
    {
      num: '04',
      title: 'DRUG INTERACTION MATCHING',
      desc: 'All active medications are simultaneously cross-checked for severe biochemical clash mechanisms and dangerous compounding reactions.',
      tab: 'interactions',
      btnText: 'Interaction Scanner'
    },
    {
      num: '05',
      title: 'SAFE ALTERNATIVES & REPORT',
      desc: 'If risk is elevated, MediSafe AI recommends evidence-based, doctor-reviewed lower-risk alternatives and printable clinical summaries.',
      tab: 'report',
      btnText: 'View Safety Report'
    }
  ];

  return (
    <section className="py-16 bg-[#F6F4ED] border-t border-[#E5DFD1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Tag & Title (Styled exactly as in Image 3) */}
        <div className="mb-10">
          <span className="section-tag">
            01 — THE PIPELINE
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#18231C] tracking-tight uppercase">
            EVERY MEDICINE FOLLOWS THE SAME FIVE CHECKS.
          </h2>
          <p className="text-xs sm:text-sm text-[#5A645D] mt-1 max-w-xl">
            A transparent clinical protocol powered by Explainable AI (SHAP & LIME) to guarantee safety before a pill is taken.
          </p>
        </div>

        {/* 5 Stacked Cards (Identical Layout to Image 3) */}
        <div className="space-y-3.5">
          {pipelineSteps.map((step) => (
            <div
              key={step.num}
              className="ivory-card p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-[#235339] transition group"
            >
              <div className="space-y-1 max-w-3xl">
                <span className="font-mono text-xs font-bold text-[#8C7D52] tracking-wider block">
                  {step.num}
                </span>
                <h3 className="text-base sm:text-lg font-black text-[#18231C] tracking-tight group-hover:text-[#235339] transition uppercase">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5A645D] leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <button
                onClick={() => {
                  setActiveTab(step.tab);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="shrink-0 pill-btn-primary text-xs py-2 px-4 opacity-90 group-hover:opacity-100"
              >
                <span>{step.btnText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Color Coding Reference Banner */}
        <div className="mt-12 p-6 rounded-3xl bg-[#ECE7DC] border border-[#D5CDBF]">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center lg:text-left">
              <span className="font-mono text-[11px] font-bold uppercase text-[#4A554E]">
                TRIAGE REFERENCE // RISK LEVELS
              </span>
              <h4 className="text-base sm:text-lg font-black text-[#18231C]">
                Clear Three-Tier Risk Thresholds
              </h4>
              <p className="text-xs text-[#5A645D]">
                Simple, actionable visual guidelines for patients, caregivers, and medical teams:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto">
              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white border border-[#C6DDD0] text-xs">
                <span className="w-3 h-3 rounded-full bg-[#235339] shrink-0" />
                <div>
                  <strong className="block font-bold text-[#18231C]">Green (0–34%)</strong>
                  <span className="text-[11px] text-[#235339] font-medium">Safe to take as prescribed</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white border border-amber-200 text-xs">
                <span className="w-3 h-3 rounded-full bg-amber-500 shrink-0" />
                <div>
                  <strong className="block font-bold text-[#18231C]">Yellow (35–69%)</strong>
                  <span className="text-[11px] text-amber-800 font-medium">Monitor potential side effects</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white border border-rose-200 text-xs">
                <span className="w-3 h-3 rounded-full bg-[#C53030] shrink-0" />
                <div>
                  <strong className="block font-bold text-[#18231C]">Red (70–100%)</strong>
                  <span className="text-[11px] text-rose-800 font-medium">High Risk: Consult physician</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
