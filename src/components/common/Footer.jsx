import React from 'react';
import { Shield, Heart, AlertTriangle, Phone, FileCheck, Sparkles } from 'lucide-react';
import { useHealth } from '../../context/HealthContext';

export default function Footer() {
  const { setActiveTab } = useHealth();

  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-slate-950 text-slate-400 text-xs">
      {/* Disclaimer Banner */}
      <div className="bg-slate-900/80 border-b border-slate-800 px-4 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-3 text-slate-300">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <p className="text-xs leading-relaxed">
            <strong className="text-amber-300">Important Healthcare Notice:</strong> MediSafe AI provides explainable clinical decision support based on pharmacological guidelines, interaction models, and peer-reviewed drug data. It is intended to assist patients, caregivers, and clinicians. It does not replace individualized medical advice from your doctor or pharmacist.
          </p>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-mediteal-400 to-mediblue-500 text-slate-950 font-bold">
                <Shield className="w-4 h-4 text-slate-950" />
              </div>
              <span className="text-base font-bold text-white">
                MediSafe<span className="text-mediteal-400">.AI</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Empowering patients and clinicians with explainable AI to prevent medication errors, predict personalized side effects, and suggest safer alternatives.
            </p>
            <div className="flex items-center gap-2 text-slate-400 text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-mediteal-400" />
              <span>Built with React + Tailwind CSS</span>
            </div>
          </div>

          {/* Core Modules */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Safety Modules
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => { setActiveTab('risk-checker'); window.scrollTo(0, 0); }}
                  className="hover:text-mediteal-300 transition"
                >
                  Personalized Side Effect Predictor
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('interactions'); window.scrollTo(0, 0); }}
                  className="hover:text-mediteal-300 transition"
                >
                  Drug–Drug Interaction Checker
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('ocr'); window.scrollTo(0, 0); }}
                  className="hover:text-mediteal-300 transition"
                >
                  Prescription OCR Scanner
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('risk-checker'); window.scrollTo(0, 0); }}
                  className="hover:text-mediteal-300 transition"
                >
                  Explainable AI (SHAP / LIME)
                </button>
              </li>
            </ul>
          </div>

          {/* Patient Tools */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Patient Tools
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => { setActiveTab('profile'); window.scrollTo(0, 0); }}
                  className="hover:text-mediteal-300 transition"
                >
                  Health Profile & Allergies
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('history'); window.scrollTo(0, 0); }}
                  className="hover:text-mediteal-300 transition"
                >
                  Medication History Log
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('report'); window.scrollTo(0, 0); }}
                  className="hover:text-mediteal-300 transition"
                >
                  Printable Safety Summary
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('dashboard'); window.scrollTo(0, 0); }}
                  className="hover:text-mediteal-300 transition"
                >
                  Safety Metrics Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Emergency & Poison Control */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Emergency & Helplines
            </h4>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs">
                <Phone className="w-3.5 h-3.5" />
                <span>Emergency: 911 / 112</span>
              </div>
              <div className="text-slate-300 text-[11px]">
                Poison Control Help: <span className="text-white font-mono font-semibold">1-800-222-1222</span>
              </div>
              <div className="text-slate-400 text-[11px]">
                Free, confidential medical advice 24/7.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-3">
          <p>© 2025 MediSafe AI Project • Explainable Medicine Recommendation System.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <FileCheck className="w-3.5 h-3.5 text-mediteal-400" />
              HIPAA-Ready Interface Design
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
