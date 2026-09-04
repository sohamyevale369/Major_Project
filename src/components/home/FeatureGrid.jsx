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
      description: 'Calculates side effect probabilities (e.g. Headache 75%, Nausea 62%) tailored specifically to your age, weight, and health history.',
      icon: Activity,
      actionTab: 'risk-checker',
      color: 'text-mediteal-400 bg-mediteal-500/10 border-mediteal-500/20'
    },
    {
      id: 'drug-drug',
      title: 'Drug–Drug Interaction Detection',
      tag: 'Multi-Pill Safety',
      description: 'Checks if two or more medicines interfere with one another (such as Warfarin + Aspirin creating fatal bleeding hazards).',
      icon: RefreshCw,
      actionTab: 'interactions',
      color: 'text-sky-400 bg-sky-500/10 border-sky-500/20'
    },
    {
      id: 'drug-disease',
      title: 'Drug–Disease Interaction Detection',
      tag: 'Organ Protection',
      description: 'Identifies dangerous conflicts between medicines and chronic illnesses (e.g. Ibuprofen damaging kidneys in renal patients).',
      icon: AlertOctagon,
      actionTab: 'risk-checker',
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/20'
    },
    {
      id: 'allergy',
      title: 'Allergy Cross-Reactivity Detection',
      tag: 'Anaphylaxis Shield',
      description: 'Alerts you instantly if a prescribed pill shares chemical traits with your known allergies (e.g. Penicillin vs Amoxicillin).',
      icon: ShieldAlert,
      actionTab: 'profile',
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20'
    },
    {
      id: 'explainable-ai',
      title: 'Explainable AI (SHAP / LIME)',
      tag: 'Transparent Reasoning',
      description: 'Explains exactly why a risk score was assigned (+25% Senior Age, +35% Kidney Disease) so you and your doctor understand every recommendation.',
      icon: Sparkles,
      actionTab: 'risk-checker',
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20'
    },
    {
      id: 'ocr',
      title: 'Prescription OCR Scanner',
      tag: 'Tesseract OCR Ready',
      description: 'Upload doctor slips or prescription labels; MediSafe automatically extracts the medicine name, dosage, and intake frequency.',
      icon: Camera,
      actionTab: 'ocr',
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    },
    {
      id: 'alternatives',
      title: 'Safe Alternative Recommendations',
      tag: 'Clinical Review Options',
      description: 'Suggests lower-risk medications with clinical rationale for doctor review when current choices are deemed high-risk.',
      icon: HeartHandshake,
      actionTab: 'risk-checker',
      color: 'text-teal-400 bg-teal-500/10 border-teal-500/20'
    },
    {
      id: 'safety-report',
      title: 'Clinical Safety Report & History',
      tag: 'Doctor-Ready Summaries',
      description: 'Stores previous predictions and exports formatted clinical safety summaries to share directly with your pharmacist or physician.',
      icon: FileText,
      actionTab: 'report',
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/20'
    }
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
            Comprehensive Medical Intelligence
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
            Complete Medicine Safety Features
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2">
            Engineered to detect every level of medication risk before it happens.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 flex flex-col justify-between hover:border-slate-700 transition hover:-translate-y-1 shadow-md hover:shadow-xl group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2.5 rounded-xl border ${feat.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                      {feat.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-mediteal-300 transition mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800/80">
                  <button
                    onClick={() => {
                      setActiveTab(feat.actionTab);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex items-center gap-1.5 text-xs font-semibold text-mediteal-400 hover:text-white transition"
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
