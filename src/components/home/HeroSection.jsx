import React from 'react';
import {
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Camera,
  AlertTriangle,
  HeartPulse,
  Pill,
  CheckCircle,
  FileCheck,
  Search
} from 'lucide-react';
import { useHealth } from '../../context/HealthContext';
import RiskBadge from '../common/RiskBadge';

export default function HeroSection() {
  const { setActiveTab, loadPatientPreset, runSafetyCheck, activePatients = [], patient, currentUser } = useHealth();

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
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-[#F6F4ED] text-[#18231C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: Headline & Actions on Left, Pipeline Stepper on Right (as in Image 2) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column (Headline, Details, Actions, Metrics) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Monospace Section Kicker (from Image 1 & 2) */}
            <div>
              <span className="section-tag">
                RX // EXPLAINABLE MEDICINE SAFETY
              </span>
            </div>

            {/* Bold Headline (from Image 1 & 2) */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#18231C] tracking-tight leading-[1.08] uppercase">
              CHECK MEDICINE.<br />
              VERIFIED FAST.<br />
              <span className="text-[#235339] underline decoration-[#235339]/30">
                EXPLAINED SIMPLY.
              </span>
            </h1>

            {/* Description (editorial style from Image 1 & 2) */}
            <p className="text-sm sm:text-base text-[#424C44] font-normal max-w-xl leading-relaxed">
              MediSafe AI turns complex health profiles, age, and chronic conditions into clear, traceable safety checks — AI-checked for harmful drug interactions, side effects, and matched with safe clinical alternatives for patients and doctors.
            </p>

            {/* Main Action Buttons (Pill shapes from Image 1 & 2) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
              <button
                onClick={() => {
                  setActiveTab('risk-checker');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="pill-btn-primary text-sm sm:text-base py-3.5 px-7"
              >
                <Search className="w-4 h-4" />
                <span>Check Medicine Safety</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('ocr');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="pill-btn-secondary text-sm sm:text-base py-3.5 px-7"
              >
                <Camera className="w-4 h-4" />
                <span>Upload Prescription (OCR)</span>
              </button>
            </div>

            {/* Big Metrics Counters (from Image 1 & 2) */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#E5DFD1]">
              <div>
                <div className="text-2xl sm:text-4xl font-black text-[#235339] tracking-tight">
                  4,820
                </div>
                <div className="text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-wider text-[#6A746C] mt-1">
                  Medicines Evaluated
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-4xl font-black text-[#235339] tracking-tight">
                  2,892
                </div>
                <div className="text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-wider text-[#6A746C] mt-1">
                  Patients Protected
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-4xl font-black text-[#235339] tracking-tight">
                  99.4%
                </div>
                <div className="text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-wider text-[#6A746C] mt-1">
                  Clinical Precision
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Live Donation/Medicine Safety Pipeline Card (from Image 1 & 2) */}
          <div className="lg:col-span-5">
            <div className="ivory-card-tint p-6 sm:p-8 space-y-4 shadow-sm">
              <div className="flex items-center justify-between pb-2 border-b border-[#D5CDBF]">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#4A554E]">
                  LIVE SAFETY PIPELINE
                </span>
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-[#235339] bg-[#E2EFE7] px-2.5 py-0.5 rounded-full border border-[#C6DDD0]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#235339] animate-ping" />
                  Active Scan
                </span>
              </div>

              {/* Dashed pill steps (identical to Image 1 & 2) */}
              <div className="space-y-2.5 font-mono text-xs text-[#2D3831]">
                
                <div className="border border-dashed border-[#B8B1A0] rounded-full px-4 py-2.5 bg-white/70 flex items-center gap-3">
                  <span className="w-4 h-4 rounded-full bg-[#C7C3B6] shrink-0" />
                  <span>1. Medicine Input / OCR</span>
                </div>

                <div className="border border-[#235339] rounded-full px-4 py-2.5 bg-[#E2EFE7] flex items-center gap-3 font-bold text-[#1E5034] shadow-sm">
                  <span className="w-4 h-4 rounded-full bg-[#235339] shrink-0" />
                  <span>2. AI Verified & Scanned</span>
                </div>

                <div className="border border-dashed border-[#B8B1A0] rounded-full px-4 py-2.5 bg-white/70 flex items-center gap-3">
                  <span className="w-4 h-4 rounded-full bg-[#C7C3B6] shrink-0" />
                  <span>3. Allergy & Disease Clashes</span>
                </div>

                <div className="border border-dashed border-[#B8B1A0] rounded-full px-4 py-2.5 bg-white/70 flex items-center gap-3">
                  <span className="w-4 h-4 rounded-full bg-[#C7C3B6] shrink-0" />
                  <span>4. SHAP / LIME Explanation</span>
                </div>

                <div className="border border-dashed border-[#B8B1A0] rounded-full px-4 py-2.5 bg-white/70 flex items-center gap-3">
                  <span className="w-4 h-4 rounded-full bg-[#C7C3B6] shrink-0" />
                  <span>5. Safe Clinical Alternative</span>
                </div>

              </div>

              <div className="pt-2 text-center">
                <span className="text-[11px] text-[#6A746C]">
                  Every medication check follows verified clinical guidelines.
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* 1-CLICK INSTANT TEST PRESETS (Clean Ivory Cards) */}
        <div className="mt-16 pt-12 border-t border-[#E5DFD1]">
          <div className="mb-6">
            <span className="section-tag">
              01 — LIVE VERIFICATION PRESETS
            </span>
            <h2 className="text-xl sm:text-3xl font-black text-[#18231C] uppercase tracking-tight">
              Test Clinical Decision Support Instantly
            </h2>
            <p className="text-xs sm:text-sm text-[#5A645D] max-w-xl mt-1">
              Select any realistic patient case below to watch the explainable AI calculate contraindications, explain reasons, and generate safer clinical alternatives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Demo Card 1: Logged-in Patient Routine Safety Check */}
            <div className="ivory-card p-6 flex flex-col justify-between hover:border-[#235339] transition-all group">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1E5034] bg-[#E2EFE7] px-2.5 py-0.5 rounded-full border border-[#C6DDD0]">
                    Routine Check
                  </span>
                  <RiskBadge level="LOW" score={15} size="sm" />
                </div>
                <h3 className="text-base font-bold text-[#18231C] group-hover:text-[#235339] transition">
                  {patient?.name || currentUser?.name || 'Personal Profile'} ({patient?.age || 23}y) + Paracetamol
                </h3>
                <p className="text-xs text-[#5A645D] mt-2 leading-relaxed">
                  Standard antipyretic evaluation with no renal, cardiac, or allergy conflicts. MediSafe assigns a <strong className="text-[#235339]">15% Low Risk</strong> safety score.
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-[#E5DFD1] flex items-center justify-between">
                <span className="text-[11px] text-[#6A746C] font-mono">Patient: {patient?.name || currentUser?.name || 'You'}</span>
                <button
                  onClick={() => handleQuickDemo(patient?.id || 'usr-default', 'Paracetamol (Acetaminophen)', '500mg')}
                  className="pill-btn-primary text-xs py-1.5 px-3.5"
                >
                  <span>Test Case</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Demo Card 2: Allergy Simulation */}
            {currentUser?.role === 'patient' || activePatients.length <= 1 ? (
              <div className="ivory-card p-6 flex flex-col justify-between hover:border-[#235339] transition-all group">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-800 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                      Allergy Check
                    </span>
                    <RiskBadge level="HIGH" score={92} size="sm" />
                  </div>
                  <h3 className="text-base font-bold text-[#18231C] group-hover:text-rose-700 transition">
                    Penicillin / Amoxicillin Allergy Test
                  </h3>
                  <p className="text-xs text-[#5A645D] mt-2 leading-relaxed">
                    MediSafe cross-evaluates drug excipients and chemical classes against allergy history to protect from severe anaphylactic shock.
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#E5DFD1] flex items-center justify-between">
                  <span className="text-[11px] text-[#6A746C] font-mono">Simulated Clinical Case</span>
                  <button
                    onClick={() => handleQuickDemo('simulation', 'Amoxicillin', '500mg')}
                    className="pill-btn-primary text-xs py-1.5 px-3.5"
                  >
                    <span>Test Case</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="ivory-card p-6 flex flex-col justify-between hover:border-[#235339] transition-all group">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1E5034] bg-[#E2EFE7] px-2.5 py-0.5 rounded-full border border-[#C6DDD0]">
                      Active Patient
                    </span>
                    <RiskBadge level="LOW" score={18} size="sm" />
                  </div>
                  <h3 className="text-base font-bold text-[#18231C] group-hover:text-[#235339] transition">
                    {activePatients[1]?.name} ({activePatients[1]?.age}y) + Routine Check
                  </h3>
                  <p className="text-xs text-[#5A645D] mt-2 leading-relaxed">
                    Real-time clinical compatibility assessment for registered patient profile. Verifies zero drug-drug clashes.
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#E5DFD1] flex items-center justify-between">
                  <span className="text-[11px] text-[#6A746C] font-mono">Patient: {activePatients[1]?.name}</span>
                  <button
                    onClick={() => handleQuickDemo(activePatients[1]?.id, 'Paracetamol (Acetaminophen)', '500mg')}
                    className="pill-btn-primary text-xs py-1.5 px-3.5"
                  >
                    <span>Test Case</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Demo Card 3: Clinical High-Risk Simulation Case */}
            <div className="ivory-card p-6 flex flex-col justify-between hover:border-[#235339] transition-all group">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-800 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                    Contraindication
                  </span>
                  <RiskBadge level="HIGH" score={85} size="sm" />
                </div>
                <h3 className="text-base font-bold text-[#18231C] group-hover:text-rose-700 transition">
                  Kidney Disease + Ibuprofen Conflict
                </h3>
                <p className="text-xs text-[#5A645D] mt-2 leading-relaxed">
                  Ibuprofen severely constricts renal blood flow. The AI flags this as <strong className="text-rose-700">85% High Risk</strong> and suggests doctor-approved Paracetamol.
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-[#E5DFD1] flex items-center justify-between">
                <span className="text-[11px] text-[#6A746C] font-mono">Simulated Clinical Case</span>
                <button
                  onClick={() => handleQuickDemo('simulation', 'Ibuprofen', '400mg')}
                  className="pill-btn-primary text-xs py-1.5 px-3.5"
                >
                  <span>Test Case</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
