import React from 'react';
import {
  Activity,
  RefreshCw,
  AlertOctagon,
  ShieldAlert,
  Sparkles,
  Camera,
  HeartHandshake,
  FileText,
  ArrowRight
} from 'lucide-react';
import { useHealth } from '../../context/HealthContext';

export default function FeatureGrid() {
  const { setActiveTab } = useHealth();

  const features = [
    {
      id: 'side-effects',
      title: 'Personalized Side Effect Prediction',
      tag: 'AI Predictive Engine',
      description: 'Calculates individual side effect probabilities (e.g. Headache 75%, Nausea 62%) tailored specifically to your age, weight, and chronic illnesses.',
      icon: Activity,
      actionTab: 'risk-checker',
      iconBg: 'bg-[#E2EFE7] text-[#1E5034]'
    },
    {
      id: 'drug-drug',
      title: 'Drug–Drug Interaction Detection',
      tag: 'Multi-Pill Safety',
      description: 'Checks if two or more medicines interfere with one another (such as Warfarin + Aspirin creating severe internal bleeding hazards).',
      icon: RefreshCw,
      actionTab: 'interactions',
      iconBg: 'bg-amber-50 text-amber-900'
    },
    {
      id: 'drug-disease',
      title: 'Drug–Disease Interaction Detection',
      tag: 'Organ Protection',
      description: 'Identifies dangerous conflicts between medicines and chronic conditions (e.g. Ibuprofen damaging kidneys in renal patients).',
      icon: AlertOctagon,
      actionTab: 'risk-checker',
      iconBg: 'bg-rose-50 text-rose-800'
    },
    {
      id: 'allergy',
      title: 'Allergy Cross-Reactivity Detection',
      tag: 'Anaphylaxis Shield',
      description: 'Alerts you instantly if a prescribed pill shares chemical traits with your documented allergies (e.g. Penicillin vs Amoxicillin).',
      icon: ShieldAlert,
      actionTab: 'profile',
      iconBg: 'bg-[#E2EFE7] text-[#1E5034]'
    },
    {
      id: 'explainable-ai',
      title: 'Explainable AI (SHAP / LIME)',
      tag: 'Transparent Reasoning',
      description: 'Explains exactly why a risk score was assigned (+25% Senior Age, +35% Kidney Disease) so patients and doctors understand every factor.',
      icon: Sparkles,
      actionTab: 'risk-checker',
      iconBg: 'bg-[#E2EFE7] text-[#1E5034]'
    },
    {
      id: 'ocr',
      title: 'Prescription OCR Scanner',
      tag: 'Optical Character Rec',
      description: 'Upload doctor prescription slips or pill packet photos; MediSafe automatically extracts the medicine name, dosage, and frequency.',
      icon: Camera,
      actionTab: 'ocr',
      iconBg: 'bg-[#E2EFE7] text-[#1E5034]'
    },
    {
      id: 'alternatives',
      title: 'Safe Alternative Recommendations',
      tag: 'Clinical Review Options',
      description: 'Suggests lower-risk medications with clinical rationale for doctor review when current choices are deemed unsafe.',
      icon: HeartHandshake,
      actionTab: 'risk-checker',
      iconBg: 'bg-emerald-50 text-emerald-900'
    },
    {
      id: 'safety-report',
      title: 'Clinical Safety Report & History',
      tag: 'Doctor-Ready Summaries',
      description: 'Stores previous predictions and exports formatted clinical safety summaries to share directly with your pharmacist or physician.',
      icon: FileText,
      actionTab: 'report',
      iconBg: 'bg-[#E2EFE7] text-[#1E5034]'
    }
  ];

  return (
    <section className="py-16 bg-[#F6F4ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-10">
          <span className="section-tag">
            02 — CORE CAPABILITIES
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#18231C] uppercase tracking-tight">
            Complete Medicine Safety Features
          </h2>
          <p className="text-xs sm:text-sm text-[#5A645D] mt-1 max-w-xl">
            Engineered to detect every level of medication risk before it happens.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                className="ivory-card p-6 flex flex-col justify-between hover:border-[#235339] transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2.5 rounded-xl ${feat.iconBg}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#6A746C] bg-[#ECE7DC] px-2 py-0.5 rounded-full">
                      {feat.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#18231C] group-hover:text-[#235339] transition mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-[#5A645D] leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#E5DFD1]">
                  <button
                    onClick={() => {
                      setActiveTab(feat.actionTab);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex items-center gap-1.5 text-xs font-bold text-[#235339] hover:underline transition"
                  >
                    <span>Try Module</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
