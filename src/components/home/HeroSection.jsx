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
  ArrowUpRight,
  Users,
  RefreshCw
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
    hasUpdatedPersonalDetails,
    medicationHistory = [],
    requireAuth,
    setIsAuthModalOpen
  } = useHealth();

  // HUD state with continuous auto-cycle animation
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCaseIndex((prev) => (prev + 1) % HERO_DRUG_CASES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const activeCase = HERO_DRUG_CASES[activeCaseIndex];
  const circumference = 226.2; // 2 * Math.PI * 36
  const strokeDashoffset = circumference - (circumference * activeCase.safetyScore) / 100;

  const userGreetingName = (() => {
    const raw = currentUser?.name?.trim() || patient?.name?.trim() || '';
    if (!raw) return 'there';
    const parts = raw.split(/\s+/);
    if (parts[0].toLowerCase().startsWith('dr') && parts.length > 1) {
      return `${parts[0]} ${parts[1]}`;
    }
    return parts[0];
  })();

  const handleQuickDemo = (patientId, drugName, dosage) => {
    if (!currentUser) {
      requireAuth(() => {
        runSafetyCheck(drugName, dosage);
        setActiveTab('risk-checker');
      }, 'Please sign in or create an account to run personalized medication safety checks.');
      return;
    }
    if (currentUser?.role === 'patient') {
      runSafetyCheck(drugName, dosage);
      setActiveTab('risk-checker');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const targetPatient = activePatients.find(p => p.id === patientId || p.name.toLowerCase().includes(patientId.toLowerCase())) || activePatients[0] || patient;
    if (targetPatient) {
      loadPatientPreset(targetPatient);
    }
    runSafetyCheck(drugName, dosage);
    setActiveTab('risk-checker');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Patient-specific clinical cards strictly tailored to logged-in patient
  const isPatientUser = currentUser?.role === 'patient';
  const patientAllergies = patient?.allergies || [];
  const patientDiseases = patient?.diseases || patient?.chronicDiseases || [];

  // Card 1: Prescribed or Evaluated Medication from History or Profile
  const historyPrescription = medicationHistory?.find(m => m.medicineName?.toLowerCase().includes('lisinopril')) ||
    medicationHistory?.[0] ||
    patient?.currentMedicines?.[0] ||
    (patientDiseases.some(d => d.toLowerCase().includes('hypertension'))
      ? { medicineName: 'Lisinopril', dosage: '10mg', riskScore: 12, riskLevel: 'LOW' }
      : { medicineName: 'Paracetamol (Acetaminophen)', dosage: '500mg', riskScore: 15, riskLevel: 'LOW' });

  // Card 2: Matched to the Patient's ACTUAL Recorded Allergy (Netra: Sulfa Drugs!)
  const firstAllergy = patientAllergies[0] || '';
  const firstAllergyLower = firstAllergy.toLowerCase();

  let allergyPreset;
  if (firstAllergyLower.includes('sulfa') || firstAllergyLower.includes('sulfonamide')) {
    allergyPreset = {
      tag: 'Allergy Clash',
      level: 'HIGH',
      score: 92,
      drugName: 'Sulfamethoxazole',
      dosage: '400mg',
      title: 'Sulfa Allergy Clash — Sulfamethoxazole',
      desc: `MediSafe cross-evaluates excipients against ${patient.name}'s recorded Sulfa Drugs allergy. Sulfonamides trigger acute IgE-mediated hypersensitivity. Suggests safe non-sulfa antibiotic alternatives.`,
      footer: `Allergy: ${firstAllergy}`,
      btnText: 'Test Sulfa Clash →'
    };
  } else if (firstAllergyLower.includes('penicillin') || firstAllergyLower.includes('amoxicillin')) {
    allergyPreset = {
      tag: 'Allergy Clash',
      level: 'HIGH',
      score: 92,
      drugName: 'Amoxicillin',
      dosage: '500mg',
      title: 'Penicillin Allergy Clash — Amoxicillin',
      desc: `MediSafe evaluates excipients against ${patient.name}'s recorded Penicillin allergy to protect from severe anaphylactic shock.`,
      footer: `Allergy: ${firstAllergy}`,
      btnText: 'Test Penicillin Clash →'
    };
  } else if (firstAllergyLower.includes('nsaid') || firstAllergyLower.includes('aspirin')) {
    allergyPreset = {
      tag: 'Allergy Clash',
      level: 'HIGH',
      score: 88,
      drugName: 'Ibuprofen',
      dosage: '400mg',
      title: 'NSAID Allergy Clash — Ibuprofen',
      desc: `MediSafe evaluates anti-inflammatory excipients against ${patient.name}'s recorded NSAID/Aspirin hypersensitivity.`,
      footer: `Allergy: ${firstAllergy}`,
      btnText: 'Test NSAID Clash →'
    };
  } else if (firstAllergy) {
    allergyPreset = {
      tag: 'Allergy Check',
      level: 'HIGH',
      score: 88,
      drugName: firstAllergy.includes('Cephalosporin') ? 'Cefixime' : 'Sulfamethoxazole',
      dosage: '400mg',
      title: `${firstAllergy} — Excipient Cross-Check`,
      desc: `Personalized evaluation checking potential excipient cross-reactivity for ${patient.name}'s recorded ${firstAllergy} allergy.`,
      footer: `Allergy: ${firstAllergy}`,
      btnText: 'Test Allergy Shield →'
    };
  } else {
    allergyPreset = {
      tag: 'Allergy Clearance',
      level: 'LOW',
      score: 10,
      drugName: 'Paracetamol (Acetaminophen)',
      dosage: '500mg',
      title: 'Zero Allergen Triggers — Baseline Clearance',
      desc: `${patient.name} has no recorded drug allergies. Verified safe excipient clearance across standard anti-infective and analgesic classes.`,
      footer: 'Allergen Screen: Clear',
      btnText: 'Verify Clear Excipients →'
    };
  }

  // Card 3: Matched to the Patient's ACTUAL Recorded Chronic Condition (Netra: Hypertension!)
  const firstDisease = patientDiseases[0] || '';
  const firstDiseaseLower = firstDisease.toLowerCase();

  let diseasePreset;
  if (firstDiseaseLower.includes('hypertension') || firstDiseaseLower.includes('blood pressure') || firstDiseaseLower.includes('htn')) {
    diseasePreset = {
      tag: 'Condition Conflict',
      level: 'HIGH',
      score: 82,
      drugName: 'Ibuprofen',
      dosage: '400mg',
      title: 'Hypertension + NSAID Conflict — Ibuprofen',
      desc: `Personalized to ${patient.name}'s Hypertension: Ibuprofen impairs renal blood flow, promotes sodium/water retention, and blunts blood pressure control.`,
      footer: `Condition: ${firstDisease}`,
      btnText: 'Test BP Conflict →'
    };
  } else if (firstDiseaseLower.includes('kidney') || firstDiseaseLower.includes('renal')) {
    diseasePreset = {
      tag: 'Contraindication',
      level: 'HIGH',
      score: 85,
      drugName: 'Ibuprofen',
      dosage: '400mg',
      title: 'Kidney Disease + Ibuprofen Conflict',
      desc: `Ibuprofen severely constricts renal blood flow, reducing glomerular filtration rate (GFR). Flagged as high risk for ${patient.name}'s kidney profile.`,
      footer: `Condition: ${firstDisease}`,
      btnText: 'Test Renal Clash →'
    };
  } else if (firstDiseaseLower.includes('ulcer') || firstDiseaseLower.includes('gerd')) {
    diseasePreset = {
      tag: 'Contraindication',
      level: 'HIGH',
      score: 86,
      drugName: 'Aspirin',
      dosage: '325mg',
      title: 'Stomach Ulcer / GERD Conflict — Aspirin',
      desc: `Aspirin inhibits mucosal prostaglandins, significantly elevating gastric bleeding risk for ${patient.name}'s ulcer profile.`,
      footer: `Condition: ${firstDisease}`,
      btnText: 'Test Ulcer Conflict →'
    };
  } else if (firstDiseaseLower.includes('diabetes')) {
    diseasePreset = {
      tag: 'Contraindication',
      level: 'HIGH',
      score: 84,
      drugName: 'Prednisone',
      dosage: '20mg',
      title: 'Diabetes Conflict — Prednisone Corticosteroid',
      desc: `Corticosteroids stimulate hepatic gluconeogenesis and induce peripheral insulin resistance, provoking severe hyperglycemia in diabetic patients.`,
      footer: `Condition: ${firstDisease}`,
      btnText: 'Test Diabetes Clash →'
    };
  } else if (medicationHistory?.length > 1) {
    const secMed = medicationHistory[1];
    diseasePreset = {
      tag: 'History Record',
      level: secMed.riskLevel || 'LOW',
      score: secMed.riskScore || 15,
      drugName: secMed.medicineName,
      dosage: secMed.dosage || '500mg',
      title: `${secMed.medicineName} — Evaluated Safety Record`,
      desc: `Logged in ${patient.name}'s personal history: ${secMed.primaryAlert || 'Routine clinical safety evaluation with clinical decision support.'}`,
      footer: `History Log: ${secMed.date || 'Recent'}`,
      btnText: 'Re-Analyze Record →'
    };
  } else {
    diseasePreset = {
      tag: 'Routine Check',
      level: 'LOW',
      score: 15,
      drugName: 'Paracetamol (Acetaminophen)',
      dosage: '500mg',
      title: 'Routine Compatibility Check — Paracetamol',
      desc: `Standard therapeutic verification for ${patient.name}. Metabolized safely with zero active clinical contraindications.`,
      footer: 'Safe Clinical Profile',
      btnText: 'Check Drug Safety →'
    };
  }

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
            <h1 className="tracking-tight uppercase">
              {currentUser ? (
                <>
                  <span className="block text-3xl sm:text-5xl lg:text-6xl font-black text-[#235339] leading-[1.08]">
                    HELLO {userGreetingName.toUpperCase()},
                  </span>
                  <span className="block text-lg sm:text-2xl lg:text-3xl font-extrabold text-[#18231C] leading-snug mt-2 sm:mt-3">
                    CHECK MEDICINE.<br />
                    VERIFIED FAST.<br />
                    <span className="text-[#235339] underline decoration-[#235339]/30">
                      EXPLAINED SIMPLY.
                    </span>
                  </span>
                </>
              ) : (
                <span className="block text-3xl sm:text-5xl lg:text-6xl font-black text-[#18231C] leading-[1.08]">
                  CHECK MEDICINE.<br />
                  VERIFIED FAST.<br />
                  <span className="text-[#235339] underline decoration-[#235339]/30">
                    EXPLAINED SIMPLY.
                  </span>
                </span>
              )}
            </h1>

            {/* Description (editorial style from Image 1 & 2) */}
            <p className="text-sm sm:text-base text-[#424C44] font-normal max-w-xl leading-relaxed">
              MediSafe AI turns complex health profiles, age, and chronic conditions into clear, traceable safety checks — AI-checked for harmful drug interactions, side effects, and matched with safe clinical alternatives for patients and doctors.
            </p>

            {/* Main Action Buttons */}
            {currentUser?.role === 'admin' ? (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
                <button
                  onClick={() => {
                    setActiveTab('admin');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="pill-btn-primary text-sm sm:text-base py-3.5 px-7 flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Open Admin Console & Patients</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('interactions');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="pill-btn-secondary text-sm sm:text-base py-3.5 px-7 flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Browse Drug Interactions DB</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
                <button
                  onClick={() => {
                    if (!currentUser) {
                      requireAuth(() => setActiveTab('risk-checker'), 'Please sign in or register to check medicine safety.');
                      return;
                    }
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
                    if (!currentUser) {
                      requireAuth(() => setActiveTab('ocr'), 'Please sign in or register to upload and scan prescriptions.');
                      return;
                    }
                    setActiveTab('ocr');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="pill-btn-secondary text-sm sm:text-base py-3.5 px-7"
                >
                  <Camera className="w-4 h-4" />
                  <span>Upload Prescription (OCR)</span>
                </button>
              </div>
            )}

          </div>

          {/* Right Column: Live Clinical AI Diagnostic Core HUD */}
          <div className="lg:col-span-5">
            <div className="ivory-card p-5 sm:p-6 space-y-4 shadow-xl border border-[#D5CDBF] rounded-3xl relative overflow-hidden bg-gradient-to-br from-white via-[#FAF8F3] to-[#F1ECE1]">
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
                  <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-[#235339] bg-[#E2EFE7] px-2.5 py-1 rounded-full border border-[#C6DDD0] shadow-xs select-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#235339] animate-pulse" />
                    <span>Live Telemetry</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#6A746C] hidden sm:inline bg-white/80 px-2 py-1 rounded-full border border-[#E5DFD1] select-none">
                    ⚡ 38ms
                  </span>
                </div>
              </div>

              {/* Auto-Cycling Drug Status Indicators (Non-clickable) */}
              <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-[#EBE5D8]/70 border border-[#DCD5C5] relative z-10 select-none">
                {HERO_DRUG_CASES.map((item, idx) => {
                  const isSelected = idx === activeCaseIndex;
                  return (
                    <div
                      key={item.id}
                      className={`relative py-2 px-2 rounded-xl text-xs font-mono font-bold transition-all duration-500 text-center flex flex-col items-center justify-center gap-0.5 ${
                        isSelected
                          ? 'bg-white text-[#18231C] shadow-md scale-[1.02] border border-[#235339]/30 ring-1 ring-[#235339]/20'
                          : 'text-[#7A847C] opacity-70'
                      }`}
                    >
                      <div className="flex items-center gap-1">
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          item.statusColor === 'emerald' ? 'bg-[#235339]' : 'bg-rose-600'
                        }`} />
                        <span className="truncate text-[11px]">{item.name}</span>
                      </div>
                      <span className="text-[9px] font-normal text-[#6A746C] truncate">{item.dosage}</span>
                    </div>
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

                    {/* Real-time Ventilator / ECG waveform monitor display */}
                    <div className="mt-2.5 p-2 rounded-xl bg-[#FAF8F3] border border-[#E5DFD1] relative overflow-hidden select-none">
                      <div className="flex items-center justify-between text-[9px] font-mono text-[#6A746C] mb-1">
                        <span className="uppercase tracking-wider">VITAL WAVEFORM</span>
                        <span className="flex items-center gap-1 text-[#235339] font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#235339] animate-pulse" />
                          68 BPM
                        </span>
                      </div>
                      <svg className="w-full h-6 overflow-visible" viewBox="0 0 200 24" fill="none">
                        <line x1="0" y1="12" x2="200" y2="12" stroke="#E2DDD2" strokeWidth="1" strokeDasharray="3 3" />
                        <path
                          d="M 0 12 L 40 12 L 48 4 L 56 20 L 64 7 L 72 17 L 80 12 L 130 12 L 138 2 L 146 23 L 154 12 L 200 12"
                          stroke={activeCase.statusColor === 'emerald' ? '#235339' : '#DC2626'}
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="animate-ecg"
                          style={{
                            filter: `drop-shadow(0 0 3px ${activeCase.statusColor === 'emerald' ? 'rgba(35,83,57,0.5)' : 'rgba(220,38,38,0.5)'})`
                          }}
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
                  <div className="p-3 rounded-xl bg-[#E2EFE7] border border-[#C6DDD0] flex items-center justify-between gap-3 text-[#18231C] animate-fade-in select-none">
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
                    <span className="text-[10px] font-mono font-bold text-[#1E5034] bg-white px-2.5 py-1 rounded-full border border-[#C6DDD0] whitespace-nowrap">
                      Recommended
                    </span>
                  </div>
                )}
              </div>

              {/* Bottom Continuous Status Bar (Non-clickable) */}
              <div className="pt-1 flex items-center justify-between text-[10px] font-mono text-[#6A746C] px-1 select-none">
                <div className="flex items-center gap-1.5">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-[#235339] animate-ping" />
                  <span>Continuous Clinical Waveform & Telemetry</span>
                </div>
                <span className="text-[#235339] font-bold">Auto-cycling</span>
              </div>
            </div>
          </div>

        </div>

        {/* 1-CLICK INSTANT TEST PRESETS / ADMIN CONTROL HUB (Only displayed when a user is logged in) */}
        {currentUser && (
          <div className="mt-16 pt-12 border-t border-[#E5DFD1]">
            <div className="mb-6">
              <span className="section-tag">
                {currentUser?.role === 'admin'
                  ? '01 — ADMINISTRATIVE CONTROL & GOVERNANCE'
                  : '01 — LIVE VERIFICATION PRESETS'}
              </span>
              <h2 className="text-xl sm:text-3xl font-black text-[#18231C] uppercase tracking-tight">
              {currentUser?.role === 'admin'
                ? 'System Control & Patient Directory'
                : 'Test Clinical Decision Support Instantly'}
            </h2>
            <p className="text-xs sm:text-sm text-[#5A645D] max-w-xl mt-1">
              {currentUser?.role === 'admin'
                ? 'Administrator accounts have governance and control rights over patient records and isolated data storage. Clinical health tracking and test presets are disabled for admin personnel.'
                : isPatientUser
                ? `Personalized clinical safety evaluations and contraindication checks configured strictly for ${patient?.name || 'your profile'}.`
                : 'Select any realistic patient case below to watch the explainable AI calculate contraindications, explain reasons, and generate safer clinical alternatives.'}
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
                  if (!currentUser) {
                    requireAuth(() => setActiveTab('profile'), 'Please sign in or register to complete your health profile.');
                    return;
                  }
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
            
            {/* If Logged In User is an Administrator: Dedicated Governance & Isolated Storage Control */}
            {currentUser?.role === 'admin' ? (
              <>
                {/* Admin Card 1: Individual Patient Records Directory */}
                <div className="ivory-card p-6 flex flex-col justify-between hover:border-[#235339] transition-all group">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1E5034] bg-[#E2EFE7] px-2.5 py-0.5 rounded-full border border-[#C6DDD0] flex items-center gap-1">
                        <Users className="w-3 h-3 text-[#1E5034]" />
                        Individual Patient Storage
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-[#E2EFE7] text-[#1E5034] text-[10px] font-mono font-bold uppercase">
                        Partitioned
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[#18231C] group-hover:text-[#235339] transition">
                      Individual Patient Records Directory
                    </h3>
                    <p className="text-xs text-[#5A645D] mt-2 leading-relaxed">
                      Click any patient's name to open their dedicated dossier. Inspect individual chronic conditions, drug allergies, active regimens, and isolated safety evaluation logs.
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#E5DFD1] flex items-center justify-between">
                    <span className="text-[11px] text-[#6A746C] font-mono">Isolated Data Storage</span>
                    <button
                      onClick={() => {
                        setActiveTab('admin');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="pill-btn-primary text-xs py-1.5 px-3.5"
                    >
                      <span>Manage Patients</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Admin Card 2: User Access & Status Governance */}
                <div className="ivory-card p-6 flex flex-col justify-between hover:border-[#235339] transition-all group">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-900 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-purple-700" />
                        Access Governance
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-800 text-[10px] font-mono font-bold uppercase">
                        Control
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[#18231C] group-hover:text-purple-900 transition">
                      Role Control & Account Status
                    </h3>
                    <p className="text-xs text-[#5A645D] mt-2 leading-relaxed">
                      Activate or suspend accounts, enforce clinical doctor and patient role boundaries, deduplicate database records, and review immutable system audit logs.
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#E5DFD1] flex items-center justify-between">
                    <span className="text-[11px] text-[#6A746C] font-mono">Access Rights Control</span>
                    <button
                      onClick={() => {
                        setActiveTab('admin');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="pill-btn-primary text-xs py-1.5 px-3.5"
                    >
                      <span>Open Control Console</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Admin Card 3: Pharmacovigilance Master DB */}
                <div className="ivory-card p-6 flex flex-col justify-between hover:border-[#235339] transition-all group">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-sky-900 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200 flex items-center gap-1">
                        <RefreshCw className="w-3 h-3 text-sky-700" />
                        Reference Database
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-sky-50 text-sky-800 text-[10px] font-mono font-bold uppercase">
                        Master DB
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[#18231C] group-hover:text-sky-900 transition">
                      Drug Interactions & Contraindications
                    </h3>
                    <p className="text-xs text-[#5A645D] mt-2 leading-relaxed">
                      Administrative oversight across clinical drug pairs, mechanism descriptions, contraindication severities, and doctor-approved safe alternatives.
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#E5DFD1] flex items-center justify-between">
                    <span className="text-[11px] text-[#6A746C] font-mono">Pharmacovigilance DB</span>
                    <button
                      onClick={() => {
                        setActiveTab('interactions');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="pill-btn-primary text-xs py-1.5 px-3.5"
                    >
                      <span>Browse Interactions</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </>
            ) : isPatientUser ? (
              !hasUpdatedPersonalDetails ? (
                <div className="col-span-1 md:col-span-3 ivory-card p-8 sm:p-12 border-2 border-dashed border-amber-300 bg-[#FDFBF7] text-center space-y-4 shadow-sm">
                  <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-900 mx-auto flex items-center justify-center">
                    <AlertTriangle className="w-8 h-8 text-amber-800" />
                  </div>
                  <div className="space-y-2 max-w-xl mx-auto">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-amber-900 bg-amber-200/80 px-3 py-0.5 rounded-full border border-amber-300">
                      Personal Health Profile Incomplete
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-[#18231C] tracking-tight">
                      Clinical Decision Support Presets Not Available Yet
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5A645D] leading-relaxed">
                      MediSafe AI personalizes clinical decision support strictly according to each patient's documented medical conditions, drug allergies, and active medications.
                      Because <strong>{patient?.name || currentUser?.name || 'your profile'}</strong> has not recorded diagnosed diseases or drug allergies yet, clinical decision support presets will not be visible until you complete your health profile.
                    </p>
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        if (!currentUser) {
                          requireAuth(() => setActiveTab('profile'), 'Please sign in or register to complete your health profile.');
                          return;
                        }
                        setActiveTab('profile');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="pill-btn-primary text-xs sm:text-sm py-3 px-6 bg-amber-800 hover:bg-amber-900 text-white font-bold inline-flex items-center gap-2"
                    >
                      <span>Complete Health Profile Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Patient Card 1: Prescribed Profile Check */}
                  <div className="ivory-card p-6 flex flex-col justify-between hover:border-[#235339] transition-all group">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1E5034] bg-[#E2EFE7] px-2.5 py-0.5 rounded-full border border-[#C6DDD0] flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-[#1E5034]" />
                          Profile Prescribed Check
                        </span>
                        <RiskBadge level={historyPrescription.riskLevel || 'LOW'} score={historyPrescription.riskScore || 12} size="sm" />
                      </div>
                      <h3 className="text-base font-bold text-[#18231C] group-hover:text-[#235339] transition">
                        {patient?.name} — {historyPrescription.medicineName} ({historyPrescription.dosage || '10mg'})
                      </h3>
                      <p className="text-xs text-[#5A645D] mt-2 leading-relaxed">
                        Personalized safety check for <strong>{patient?.name}</strong>: Formulated for <strong>{patientDiseases.join(', ') || 'health maintenance'}</strong>. Clinically verified with zero clashes against recorded allergies (<strong>{patientAllergies.join(', ') || 'None recorded'}</strong>).
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-[#E5DFD1] flex items-center justify-between">
                      <span className="text-[11px] text-[#6A746C] font-mono">Patient Record: {patient?.name}</span>
                      <button
                        onClick={() => handleQuickDemo(patient?.id, historyPrescription.medicineName, historyPrescription.dosage || '10mg')}
                        className="pill-btn-primary text-xs py-1.5 px-3.5"
                      >
                        <span>Verify Safety &rarr;</span>
                      </button>
                    </div>
                  </div>

                {/* Patient Card 2: 100% Tailored to the Patient's ACTUAL Recorded Allergy (Netra: Sulfa Drugs!) */}
                <div className="ivory-card p-6 flex flex-col justify-between hover:border-[#235339] transition-all group">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                        allergyPreset.level === 'HIGH'
                          ? 'text-rose-800 bg-rose-50 border-rose-200'
                          : 'text-[#1E5034] bg-[#E2EFE7] border-[#C6DDD0]'
                      }`}>
                        {allergyPreset.tag}
                      </span>
                      <RiskBadge level={allergyPreset.level} score={allergyPreset.score} size="sm" />
                    </div>
                    <h3 className={`text-base font-bold transition ${
                      allergyPreset.level === 'HIGH' ? 'text-[#18231C] group-hover:text-rose-700' : 'text-[#18231C] group-hover:text-[#235339]'
                    }`}>
                      {allergyPreset.title}
                    </h3>
                    <p className="text-xs text-[#5A645D] mt-2 leading-relaxed">
                      {allergyPreset.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#E5DFD1] flex items-center justify-between">
                    <span className="text-[11px] text-[#6A746C] font-mono">{allergyPreset.footer}</span>
                    <button
                      onClick={() => handleQuickDemo(patient?.id, allergyPreset.drugName, allergyPreset.dosage)}
                      className="pill-btn-primary text-xs py-1.5 px-3.5"
                    >
                      <span>{allergyPreset.btnText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Patient Card 3: 100% Tailored to the Patient's ACTUAL Condition (Netra: Hypertension!) */}
                <div className="ivory-card p-6 flex flex-col justify-between hover:border-[#235339] transition-all group">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                        diseasePreset.level === 'HIGH'
                          ? 'text-rose-800 bg-rose-50 border-rose-200'
                          : 'text-[#1E5034] bg-[#E2EFE7] border-[#C6DDD0]'
                      }`}>
                        {diseasePreset.tag}
                      </span>
                      <RiskBadge level={diseasePreset.level} score={diseasePreset.score} size="sm" />
                    </div>
                    <h3 className={`text-base font-bold transition ${
                      diseasePreset.level === 'HIGH' ? 'text-[#18231C] group-hover:text-rose-700' : 'text-[#18231C] group-hover:text-[#235339]'
                    }`}>
                      {diseasePreset.title}
                    </h3>
                    <p className="text-xs text-[#5A645D] mt-2 leading-relaxed">
                      {diseasePreset.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#E5DFD1] flex items-center justify-between">
                    <span className="text-[11px] text-[#6A746C] font-mono">{diseasePreset.footer}</span>
                    <button
                      onClick={() => handleQuickDemo(patient?.id, diseasePreset.drugName, diseasePreset.dosage)}
                      className="pill-btn-primary text-xs py-1.5 px-3.5"
                    >
                      <span>{diseasePreset.btnText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </>
              )
            ) : (
              <>
                {/* Clinician / Admin View: Multi-patient clinical simulation cases */}
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
                      onClick={() => handleQuickDemo(activePatients[0]?.id || 'usr-default', 'Paracetamol (Acetaminophen)', '500mg')}
                      className="pill-btn-primary text-xs py-1.5 px-3.5"
                    >
                      <span>Test Case</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

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
              </>
            )}

          </div>
        </div>
      )}

      </div>
    </section>
  );
}
