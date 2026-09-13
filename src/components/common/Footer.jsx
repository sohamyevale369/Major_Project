import React from 'react';
import { Shield, Heart, AlertTriangle, Phone, FileCheck, Sparkles, Users, ArrowUpRight, Briefcase } from 'lucide-react';
import { useHealth } from '../../context/HealthContext';
import { MediSafeLogoMark } from './BrandLogo';

export default function Footer() {
  const { setActiveTab } = useHealth();

  const handleGoToAboutUs = () => {
    setActiveTab('about');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToCareers = () => {
    setActiveTab('careers');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-[#E5DFD1] bg-[#ECE7DC] text-[#4A554E] text-xs">
      {/* Disclaimer Banner */}
      <div className="bg-[#F3EFE6] border-b border-[#E0D9CB] px-4 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-3 text-[#2D3831]">
          <div className="p-2 rounded-xl bg-amber-500/15 text-amber-800 border border-amber-500/30 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <p className="text-xs leading-relaxed">
            <strong className="text-amber-900">Important Healthcare Notice:</strong> MediSafe AI provides explainable clinical decision support based on pharmacological guidelines, interaction models, and peer-reviewed drug data. It is intended to assist patients, caregivers, and clinicians. It does not replace individualized medical advice from your doctor or pharmacist.
          </p>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info & About Team Pill */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <MediSafeLogoMark size={28} />
              <span className="text-base font-black text-[#18231C] uppercase tracking-tight">
                MEDISAVE<span className="text-[#235339]">.AI</span>
              </span>
            </div>
            <p className="text-[#5A645D] text-xs leading-relaxed">
              Empowering patients and clinicians with explainable AI to prevent medication errors, predict personalized side effects, and suggest safer alternatives.
            </p>
            <div className="flex items-center gap-2 text-[#5A645D] text-[11px] font-mono">
              <span className="w-2 h-2 rounded-full bg-[#235339]"></span>
              <span>Explainable AI Clinical Decision Engine</span>
            </div>

            {/* About Us Option in Brand Section */}
            <div className="pt-2">
              <button
                type="button"
                id="footer-btn-about-us-brand"
                onClick={handleGoToAboutUs}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#D5CDBF] hover:border-[#235339] hover:bg-[#E2EFE7] text-[#18231C] hover:text-[#235339] font-bold text-xs transition shadow-2xs group"
              >
                <Users className="w-3.5 h-3.5 text-[#235339]" />
                <span>About Us (Project Team)</span>
                <span className="text-[10px] bg-[#235339] text-white px-1.5 py-0.2 rounded font-mono">
                  3 Members
                </span>
                <ArrowUpRight className="w-3 h-3 text-[#5A645D] group-hover:text-[#235339] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>

          {/* Core Modules */}
          <div>
            <h4 className="text-xs font-black text-[#18231C] uppercase tracking-wider mb-3">
              Safety Modules
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => { setActiveTab('risk-checker'); window.scrollTo(0, 0); }}
                  className="hover:text-[#235339] transition font-medium"
                >
                  Personalized Side Effect Predictor
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('interactions'); window.scrollTo(0, 0); }}
                  className="hover:text-[#235339] transition font-medium"
                >
                  Drug–Drug Interaction Checker
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('ocr'); window.scrollTo(0, 0); }}
                  className="hover:text-[#235339] transition font-medium"
                >
                  Prescription OCR Scanner
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('risk-checker'); window.scrollTo(0, 0); }}
                  className="hover:text-[#235339] transition font-medium"
                >
                  Explainable AI (SHAP / LIME)
                </button>
              </li>
            </ul>
          </div>

          {/* Patient Tools & About Us Link */}
          <div>
            <h4 className="text-xs font-black text-[#18231C] uppercase tracking-wider mb-3">
              Patient Tools
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => { setActiveTab('profile'); window.scrollTo(0, 0); }}
                  className="hover:text-[#235339] transition font-medium"
                >
                  Health Profile & Allergies
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('history'); window.scrollTo(0, 0); }}
                  className="hover:text-[#235339] transition font-medium"
                >
                  Medication History Log
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('report'); window.scrollTo(0, 0); }}
                  className="hover:text-[#235339] transition font-medium"
                >
                  Printable Safety Summary
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('dashboard'); window.scrollTo(0, 0); }}
                  className="hover:text-[#235339] transition font-medium"
                >
                  Safety Metrics Dashboard
                </button>
              </li>
              <li className="pt-1 border-t border-[#D5CDBF]/60">
                <button
                  type="button"
                  id="footer-btn-about-us-link"
                  onClick={handleGoToAboutUs}
                  className="hover:text-[#235339] transition font-bold text-[#235339] flex items-center gap-1.5"
                >
                  <Users className="w-3.5 h-3.5 text-[#235339]" />
                  <span>About Us & Team</span>
                  <span className="text-[9px] bg-emerald-100 text-emerald-800 border border-emerald-300 font-mono px-1 rounded">
                    Team
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  id="footer-btn-careers-link"
                  onClick={handleGoToCareers}
                  className="hover:text-[#235339] transition font-bold text-[#235339] flex items-center gap-1.5"
                >
                  <Briefcase className="w-3.5 h-3.5 text-[#235339]" />
                  <span>Careers & Fellowships</span>
                  <span className="text-[9px] bg-sky-100 text-sky-800 border border-sky-300 font-mono px-1 rounded">
                    Hiring
                  </span>
                </button>
              </li>
            </ul>
          </div>

          {/* Emergency & Poison Control */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-[#18231C] uppercase tracking-wider">
              Emergency & Helplines
            </h4>
            <div className="p-3.5 rounded-2xl bg-white border border-[#D5CDBF] space-y-2">
              <div className="flex items-center gap-2 text-[#C53030] font-bold text-xs">
                <Phone className="w-3.5 h-3.5" />
                <span>Emergency: 911 / 112</span>
              </div>
              <div className="text-[#37423B] text-[11px]">
                Poison Control Help: <span className="text-[#18231C] font-mono font-bold">1-800-222-1222</span>
              </div>
              <div className="text-[#6A746C] text-[11px]">
                Free, confidential medical advice 24/7.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with About Us and Careers */}
        <div className="mt-8 pt-6 border-t border-[#D5CDBF] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#6A746C] gap-3">
          <p>© 2025 MediSafe AI Project • Explainable Medicine Safety & Recommendation System.</p>
          <div className="flex items-center gap-4 flex-wrap">
            <button
              type="button"
              id="footer-btn-about-us-bottom"
              onClick={handleGoToAboutUs}
              className="hover:text-[#235339] transition font-bold text-[#18231C] hover:underline flex items-center gap-1"
            >
              <Users className="w-3.5 h-3.5 text-[#235339]" />
              <span>About Us</span>
            </button>
            <span className="text-[#D5CDBF]">|</span>
            <button
              type="button"
              id="footer-btn-careers-bottom"
              onClick={handleGoToCareers}
              className="hover:text-[#235339] transition font-bold text-[#18231C] hover:underline flex items-center gap-1"
            >
              <Briefcase className="w-3.5 h-3.5 text-[#235339]" />
              <span>Careers</span>
            </button>
            <span className="text-[#D5CDBF]">|</span>
            <span className="flex items-center gap-1 font-medium text-[#235339]">
              <FileCheck className="w-3.5 h-3.5" />
              HIPAA-Ready Architecture
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
