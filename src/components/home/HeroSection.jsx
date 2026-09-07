import React, { useState, useEffect } from 'react';
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
  Search,
  Activity,
  Zap,
  ShieldAlert,
  CheckCircle2,
  Play,
  Pause,
  ArrowUpRight
} from 'lucide-react';
import { useHealth } from '../../context/HealthContext';
import RiskBadge from '../common/RiskBadge';

const HERO_DRUG_CASES = [
  {
    id: 'paracetamol',
    name: 'Paracetamol',
    fullName: 'Paracetamol (Acetaminophen)',
    dosage: '500mg',
    category: 'Analgesic & Antipyretic',
    safetyScore: 94,
    riskLevel: 'LOW',
    status: 'Optimal / Safe Match',
    statusColor: 'emerald',
    badgeText: 'Low Risk 15%',
    headline: 'Routine Clinical Check',
    conflictDetail: 'Zero drug-disease or cross-allergen excipients detected for profile.',
    shapFactors: [
      { name: 'Hepatic & Renal Clearance', value: '+45%', positive: true, width: '92%' },
      { name: 'Allergy Cross-Match (0 Clashes)', value: 'Clear', positive: true, width: '98%' },
      { name: 'Therapeutic Safety Margin', value: 'Optimal', positive: true, width: '88%' }
    ],
    safeAlternative: null
  },
  {
    id: 'ibuprofen',
    name: 'Ibuprofen',
    fullName: 'Ibuprofen (NSAID)',
    dosage: '400mg',
    category: 'NSAID / Anti-inflammatory',
    safetyScore: 18,
    riskLevel: 'HIGH',
    status: 'Renal Contraindication',
    statusColor: 'rose',
    badgeText: 'High Risk 85%',
    headline: 'Kidney Disease Conflict',
    conflictDetail: 'Inhibits renal prostaglandins, reducing glomerular filtration rate (GFR).',
    shapFactors: [
      { name: 'Renal Perfusion Inhibition', value: '-68%', positive: false, width: '86%' },
      { name: 'Blood Pressure / ACE-I Clash', value: '-32%', positive: false, width: '64%' },
      { name: 'Gastric Mucosa Tolerance', value: '-24%', positive: false, width: '48%' }
    ],
    safeAlternative: {
      name: 'Paracetamol (Acetaminophen)',
      dosage: '500mg',
      reason: 'Clinician-approved renal-safe substitute'
    }
  },
  {
    id: 'amoxicillin',
    name: 'Amoxicillin',
    fullName: 'Amoxicillin Trihydrate',
    dosage: '500mg',
    category: 'Beta-Lactam Antibiotic',
    safetyScore: 12,
    riskLevel: 'CRITICAL',
    status: 'Severe Allergy Clash',
    statusColor: 'rose',
    badgeText: 'High Risk 92%',
    headline: 'Anaphylaxis Cross-Reactivity',
    conflictDetail: 'Cross-reactive beta-lactam core triggers acute IgE-mediated hypersensitivity.',
    shapFactors: [
      { name: 'Beta-Lactam Ring Excipient', value: '-86%', positive: false, width: '94%' },
      { name: 'Immunological Sensitization', value: '-52%', positive: false, width: '76%' },
      { name: 'Metabolic Tolerance Margin', value: '+14%', positive: true, width: '42%' }
    ],
    safeAlternative: {
      name: 'Azithromycin (Macrolide)',
      dosage: '500mg',
      reason: 'Non-beta-lactam safe antibiotic substitute'
    }
  }
];

export default function HeroSection() {
  const {
    setActiveTab,
    loadPatientPreset,
    runSafetyCheck,
    activePatients = [],
    patient,
    currentUser,
    hasUpdatedPersonalDetails
  } = useHealth();

  // Interactive HUD state with smooth auto-cycle
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveCaseIndex((prev) => (prev + 1) % HERO_DRUG_CASES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const activeCase = HERO_DRUG_CASES[activeCaseIndex];
  const circumference = 226.2; // 2 * Math.PI * 36
  const strokeDashoffset = circumference - (circumference * activeCase.safetyScore) / 100;

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

          {/* Right Column: Live Clinical AI Diagnostic Core HUD */}
          <div className="lg:col-span-5">
            <div 
              className="ivory-card p-5 sm:p-6 space-y-4 shadow-xl border border-[#D5CDBF] rounded-3xl relative overflow-hidden bg-gradient-to-br from-white via-[#FAF8F3] to-[#F1ECE1]"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Subtle ambient corner glow */}
              <div className="absolute -top-16 -right-16 w-44 h-44 bg-[#235339]/10 rounded-full blur-2xl pointer-events-none" />

              {/* HUD Header Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-[#E5DFD1] relative z-10">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#235339] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#235339]"></span>
                  </span>
                  <div>
                    <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#18231C] leading-none">
                      Live Clinical AI HUD
                    </div>
                    <div className="text-[10px] font-mono text-[#6A746C] leading-none mt-0.5">
                      SHAP / LIME Safety Engine • Real-time
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setIsPaused(!isPaused)}
                    title={isPaused ? "Resume auto-simulation" : "Pause auto-simulation"}
                    className="flex items-center gap-1 text-[10px] font-mono font-bold text-[#235339] bg-[#E2EFE7] hover:bg-[#D4E8DC] px-2.5 py-1 rounded-full border border-[#C6DDD0] transition shadow-xs cursor-pointer"
                  >
                    {isPaused ? <Play className="w-2.5 h-2.5 fill-current" /> : <Pause className="w-2.5 h-2.5 fill-current" />}
                    <span>{isPaused ? 'Resume' : 'Live'}</span>
                  </button>
                  <span className="text-[10px] font-mono text-[#6A746C] hidden sm:inline bg-white/80 px-2 py-1 rounded-full border border-[#E5DFD1]">
                    ⚡ 38ms
                  </span>
                </div>
              </div>

              {/* Interactive Drug Selector Pills */}
              <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-[#EBE5D8]/70 border border-[#DCD5C5] relative z-10">
                {HERO_DRUG_CASES.map((item, idx) => {
                  const isSelected = idx === activeCaseIndex;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setActiveCaseIndex(idx);
                        setIsPaused(true);
                      }}
                      className={`relative py-2 px-2 rounded-xl text-xs font-mono font-bold transition-all text-center flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
                        isSelected
                          ? 'bg-white text-[#18231C] shadow-md scale-[1.02] border border-[#235339]/30 ring-1 ring-[#235339]/20'
                          : 'text-[#5A645D] hover:text-[#18231C] hover:bg-white/50'
                      }`}
                    >
                      <div className="flex items-center gap-1">
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          item.statusColor === 'emerald' ? 'bg-[#235339]' : 'bg-rose-600'
                        }`} />
                        <span className="truncate text-[11px]">{item.name}</span>
                      </div>
                      <span className="text-[9px] font-normal text-[#6A746C] truncate">{item.dosage}</span>
                    </button>
                  );
                })}
              </div>

              {/* Holographic Diagnostic Center Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/95 border border-[#E5DFD1] shadow-sm relative overflow-hidden space-y-4">
                {/* Horizontal Sweeping Laser Line */}
                <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#235339] to-transparent animate-scanline pointer-events-none opacity-50 z-20" />

                {/* Top Row: Gauge + Drug Telemetry */}
                <div className="flex items-center justify-between gap-4">
                  {/* Circular Radial Safety Gauge */}
                  <div className="relative shrink-0 flex flex-col items-center">
                    <svg className="w-20 h-20 -rotate-90" viewBox="0 0 84 84">
                      {/* Background circle */}
                      <circle
                        cx="42"
                        cy="42"
                        r="36"
                        fill="none"
                        stroke="#EBE5D8"
                        strokeWidth="7"
                      />
                      {/* Animated Progress Ring */}
                      <circle
                        cx="42"
                        cy="42"
                        r="36"
                        fill="none"
                        stroke={activeCase.statusColor === 'emerald' ? '#235339' : '#DC2626'}
                        strokeWidth="7"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-all duration-700 ease-out"
                      />
                    </svg>

                    {/* Center Score Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-xl font-black font-mono tracking-tight text-[#18231C] leading-none">
                        {activeCase.safetyScore}%
                      </span>
                      <span className="text-[8px] font-mono font-bold uppercase tracking-wider text-[#6A746C] mt-0.5">
                        Safety
                      </span>
                    </div>

                    <span className={`inline-block mt-1 text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                      activeCase.statusColor === 'emerald'
                        ? 'bg-[#E2EFE7] text-[#1E5034] border-[#C6DDD0]'
                        : 'bg-rose-50 text-rose-800 border-rose-200'
                    }`}>
                      {activeCase.riskLevel} Risk
                    </span>
                  </div>

                  {/* Telemetry Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#6A746C]">
                        {activeCase.category}
                      </span>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                        activeCase.statusColor === 'emerald'
                          ? 'bg-[#E2EFE7] text-[#1E5034] border-[#C6DDD0]'
                          : 'bg-rose-50 text-rose-800 border-rose-200'
                      }`}>
                        {activeCase.badgeText}
                      </span>
                    </div>

                    <h4 className="text-sm sm:text-base font-black text-[#18231C] truncate">
                      {activeCase.fullName}
                    </h4>

                    <p className="text-[11px] text-[#5A645D] line-clamp-2 mt-1 leading-snug">
                      {activeCase.conflictDetail}
                    </p>

                    {/* Real-time ECG waveform */}
                    <div className="pt-2">
                      <svg className="w-full h-5 overflow-visible" viewBox="0 0 200 24" fill="none">
                        <path
                          d="M 0 12 L 40 12 L 48 5 L 56 19 L 64 8 L 72 16 L 80 12 L 130 12 L 138 3 L 146 22 L 154 12 L 200 12"
                          stroke={activeCase.statusColor === 'emerald' ? '#235339' : '#DC2626'}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="animate-ecg opacity-75"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Explainable AI (SHAP) Factor Breakdown */}
                <div className="pt-3 border-t border-[#ECE7DC] space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#6A746C] font-bold uppercase tracking-wider">
                    <span>Explainable Feature Weights (SHAP)</span>
                    <span className="text-[#235339]">Impact</span>
                  </div>

                  <div className="space-y-1.5">
                    {activeCase.shapFactors.map((factor, fIdx) => (
                      <div key={fIdx} className="space-y-0.5">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-[#3E4941] truncate max-w-[70%] font-medium">
                            {factor.name}
                          </span>
                          <span className={`font-mono text-[10px] font-bold ${
                            factor.positive ? 'text-[#1E5034]' : 'text-rose-700'
                          }`}>
                            {factor.value}
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-[#EBE5D8] rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-700 ease-out ${
                              factor.positive ? 'bg-[#235339]' : 'bg-rose-600'
                            }`}
                            style={{ width: factor.width }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Doctor-Approved Safe Alternative Card (When high risk) */}
                {activeCase.safeAlternative && (
                  <div className="p-3 rounded-xl bg-[#E2EFE7] border border-[#C6DDD0] flex items-center justify-between gap-3 text-[#18231C] animate-fade-in">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-[#235339] text-white flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1E5034] leading-none">
                          Safe Clinical Alternative
                        </div>
                        <div className="text-xs font-bold text-[#18231C] truncate mt-0.5">
                          {activeCase.safeAlternative.name} ({activeCase.safeAlternative.dosage})
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleQuickDemo(patient?.id || 'usr-default', activeCase.safeAlternative.name, activeCase.safeAlternative.dosage)}
                      className="pill-btn-primary text-[10px] py-1 px-2.5 whitespace-nowrap shadow-xs cursor-pointer"
                    >
                      <span>Test &rarr;</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Bottom Quick Trigger */}
              <div className="pt-1 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleQuickDemo(patient?.id || 'usr-default', activeCase.fullName, activeCase.dosage)}
                  className="pill-btn-primary flex-1 text-xs py-2.5 px-4 shadow-sm cursor-pointer"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Inspect {activeCase.name} in Scanner</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    setActiveTab('ocr');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="pill-btn-secondary text-xs py-2 px-3 shrink-0 cursor-pointer"
                  title="Upload prescription photo to auto-scan"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="text-center text-[10px] font-mono text-[#6A746C] pt-0.5">
                ⚡ Interactive AI Core • Select tabs above to simulate real contraindications
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

          {/* Patient Profile Incomplete Alert Banner */}
          {currentUser?.role === 'patient' && !hasUpdatedPersonalDetails && (
            <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-amber-950 shadow-xs">
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-amber-200 flex items-center justify-center text-amber-900 shrink-0 font-bold">
                  <AlertTriangle className="w-5 h-5 text-amber-800" />
                </div>
                <div>
                  <div className="text-sm font-black text-amber-900 flex items-center gap-2">
                    <span>Personal Health Profile Not Updated</span>
                    <span className="text-[10px] font-mono font-bold bg-amber-200/80 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Pending Input
                    </span>
                  </div>
                  <div className="text-xs text-amber-800 mt-0.5">
                    <strong>{patient?.name || currentUser?.name}</strong> has not added diagnosed medical conditions or drug allergies yet. Complete your health profile to unlock personalized AI safety checks.
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  setActiveTab('profile');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="pill-btn-primary text-xs py-2 px-4 bg-amber-800 hover:bg-amber-900 text-white shrink-0 font-bold"
              >
                <span>Complete Health Profile &rarr;</span>
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Demo Card 1: Patient Profile Status or Routine Antipyretic Case */}
            {currentUser?.role === 'patient' && !hasUpdatedPersonalDetails ? (
              <div className="ivory-card p-6 flex flex-col justify-between border-amber-300 bg-[#FDFBF7] hover:border-amber-500 transition-all group">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-amber-700" />
                      Details Not Updated
                    </span>
                    <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      Profile Incomplete
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#18231C] group-hover:text-amber-900 transition">
                    Personal Health Profile Incomplete
                  </h3>
                  <p className="text-xs text-[#5A645D] mt-2 leading-relaxed">
                    <strong>{patient?.name || currentUser?.name}</strong> has not recorded diagnosed diseases, allergies, or active medications yet. Please complete your profile to enable personalized safety evaluations.
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-amber-200/60 flex items-center justify-between">
                  <span className="text-[11px] text-amber-800 font-mono font-semibold">0 Conditions • 0 Allergies</span>
                  <button
                    onClick={() => {
                      setActiveTab('profile');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="pill-btn-primary text-xs py-1.5 px-3.5 bg-amber-800 hover:bg-amber-900 text-white"
                  >
                    <span>Add Details &rarr;</span>
                  </button>
                </div>
              </div>
            ) : currentUser?.role === 'patient' && hasUpdatedPersonalDetails ? (
              <div className="ivory-card p-6 flex flex-col justify-between hover:border-[#235339] transition-all group">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1E5034] bg-[#E2EFE7] px-2.5 py-0.5 rounded-full border border-[#C6DDD0] flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-[#1E5034]" />
                      Profile Configured
                    </span>
                    <RiskBadge level="LOW" score={15} size="sm" />
                  </div>
                  <h3 className="text-base font-bold text-[#18231C] group-hover:text-[#235339] transition">
                    {patient?.name} ({patient?.age}y) — Personalized Check
                  </h3>
                  <p className="text-xs text-[#5A645D] mt-2 leading-relaxed">
                    Active conditions: <strong>{patient.diseases?.join(', ') || 'None recorded'}</strong>. Allergies: <strong>{patient.allergies?.join(', ') || 'None recorded'}</strong>.
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#E5DFD1] flex items-center justify-between">
                  <span className="text-[11px] text-[#6A746C] font-mono">Patient Profile Active</span>
                  <button
                    onClick={() => handleQuickDemo(patient?.id || 'usr-default', 'Paracetamol (Acetaminophen)', '500mg')}
                    className="pill-btn-primary text-xs py-1.5 px-3.5"
                  >
                    <span>Check Drug &rarr;</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="ivory-card p-6 flex flex-col justify-between hover:border-[#235339] transition-all group">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1E5034] bg-[#E2EFE7] px-2.5 py-0.5 rounded-full border border-[#C6DDD0]">
                      Routine Check
                    </span>
                    <RiskBadge level="LOW" score={15} size="sm" />
                  </div>
                  <h3 className="text-base font-bold text-[#18231C] group-hover:text-[#235339] transition">
                    Routine Antipyretic Case — Paracetamol (500mg)
                  </h3>
                  <p className="text-xs text-[#5A645D] mt-2 leading-relaxed">
                    Standard antipyretic evaluation with no renal, cardiac, or allergy conflicts. MediSafe assigns a <strong className="text-[#235339]">15% Low Risk</strong> safety score.
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#E5DFD1] flex items-center justify-between">
                  <span className="text-[11px] text-[#6A746C] font-mono">Simulated Clinical Case</span>
                  <button
                    onClick={() => handleQuickDemo(patient?.id || 'usr-default', 'Paracetamol (Acetaminophen)', '500mg')}
                    className="pill-btn-primary text-xs py-1.5 px-3.5"
                  >
                    <span>Test Case</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

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
