import React, { useState, useEffect } from 'react';
import {
  Stethoscope,
  Users,
  Search,
  User,
  HeartPulse,
  AlertTriangle,
  Pill,
  Activity,
  Sparkles,
  FileText,
  Printer,
  CheckCircle2,
  AlertOctagon,
  ChevronRight,
  ShieldCheck,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Sliders,
  FileCheck,
  Camera,
  ExternalLink
} from 'lucide-react';
import { useHealth } from '../../context/HealthContext';
import { COMMON_MEDICATIONS } from '../../data/drugDatabase';
import { evaluateMedicationSafety } from '../../data/mockAI';
import DoctorPatientCard from './DoctorPatientCard';
import DoctorReviewForm from './DoctorReviewForm';
import RiskBadge from '../common/RiskBadge';
import RiskGauge from '../risk-checker/RiskGauge';
import SideEffectBars from '../risk-checker/SideEffectBars';
import ExplainableAIView from '../risk-checker/ExplainableAIView';
import { MediSafeLogoMark } from '../common/BrandLogo';

export default function DoctorPortalView({ initialStep = 'dashboard' }) {
  const {
    currentUser,
    activePatients = [],
    saveDoctorReview,
    getDoctorReviewsForPatient,
    doctorReviews = [],
    setActiveTab,
    showToast
  } = useHealth();

  // Workflow steps:
  // 'dashboard' | 'patients' | 'profile' | 'analysis' | 'review' | 'report'
  const [currentStep, setCurrentStep] = useState(initialStep || 'dashboard');

  // Search & Filter in My Patients
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCondition, setFilterCondition] = useState('ALL');

  // Currently Selected Patient for Doctor Review
  const [selectedPatient, setSelectedPatient] = useState(() => {
    return activePatients.length > 0 ? activePatients[0] : null;
  });

  // Selected Medicine being analyzed
  const [analyzedMedName, setAnalyzedMedName] = useState('Lisinopril');
  const [analyzedDosage, setAnalyzedDosage] = useState('10mg');
  const [analyzedFrequency, setAnalyzedFrequency] = useState('Once daily');

  // Real-time AI Analysis object
  const [doctorAnalysis, setDoctorAnalysis] = useState(() => {
    if (selectedPatient) {
      const med = selectedPatient.recommendedTestDrug || selectedPatient.currentMedicines?.[0]?.name || 'Lisinopril';
      const dose = selectedPatient.currentMedicines?.[0]?.dosage || '10mg';
      const freq = selectedPatient.currentMedicines?.[0]?.frequency || 'Once daily';
      return evaluateMedicationSafety(selectedPatient, med, dose, freq);
    }
    return null;
  });

  // Finalized Doctor Review for the active patient
  const [latestDoctorReview, setLatestDoctorReview] = useState(null);

  // Synchronize analysis whenever selected patient or medicine changes
  useEffect(() => {
    if (selectedPatient && analyzedMedName) {
      const result = evaluateMedicationSafety(
        selectedPatient,
        analyzedMedName,
        analyzedDosage,
        analyzedFrequency
      );
      setDoctorAnalysis(result);

      // Check if this patient already has a review for this medicine
      const patientReviews = getDoctorReviewsForPatient(selectedPatient.id) || [];
      const match = patientReviews.find(
        (r) => r.medicineName.toLowerCase() === analyzedMedName.toLowerCase()
      );
      setLatestDoctorReview(match || patientReviews[0] || null);
    }
  }, [selectedPatient, analyzedMedName, analyzedDosage, analyzedFrequency]);

  // Handle selecting a patient from My Patients list
  const handleSelectPatient = (p) => {
    setSelectedPatient(p);
    const initialMed = p.currentMedicines?.[0]?.name || p.recommendedTestDrug || 'Paracetamol (Acetaminophen)';
    const initialDose = p.currentMedicines?.[0]?.dosage || '500mg';
    const initialFreq = p.currentMedicines?.[0]?.frequency || 'As directed';

    setAnalyzedMedName(initialMed);
    setAnalyzedDosage(initialDose);
    setAnalyzedFrequency(initialFreq);

    const initialAnalysis = evaluateMedicationSafety(p, initialMed, initialDose, initialFreq);
    setDoctorAnalysis(initialAnalysis);

    const patientReviews = getDoctorReviewsForPatient(p.id) || [];
    const match = patientReviews.find(
      (r) => r.medicineName.toLowerCase() === initialMed.toLowerCase()
    );
    setLatestDoctorReview(match || patientReviews[0] || null);

    setCurrentStep('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Loaded clinical profile for ${p.name}`, 'info');
  };

  // Handle finalizing doctor review
  const handleFinalizeDoctorReview = (reviewData) => {
    const saved = saveDoctorReview(reviewData);
    setLatestDoctorReview(saved);
    setCurrentStep('report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered patients list
  const filteredPatients = (activePatients || []).filter((p) => {
    if (!p) return false;
    const nameMatch = (p.name || '').toLowerCase().includes(searchQuery.toLowerCase());
    const conditionMatch =
      filterCondition === 'ALL' ||
      (p.diseases && p.diseases.some((d) => d.toLowerCase().includes(filterCondition.toLowerCase())));
    return nameMatch && conditionMatch;
  });

  // Calculate Doctor Dashboard Metrics
  const totalPatients = activePatients.length;
  const highRiskPatientsCount = activePatients.filter(
    (p) => (p.diseases && p.diseases.length > 0) || (p.allergies && p.allergies.length > 0)
  ).length;
  const reviewsCount = doctorReviews.length;
  const pendingReviewsCount = Math.max(0, totalPatients - reviewsCount);

  // Compute BMI for selected patient if available
  const calculateBMI = (weight, heightCm = 172) => {
    if (!weight) return { bmi: 23.5, label: 'Normal' };
    const hM = heightCm / 100;
    const bmiVal = (weight / (hM * hM)).toFixed(1);
    let label = 'Normal';
    if (bmiVal < 18.5) label = 'Underweight';
    else if (bmiVal >= 25 && bmiVal < 30) label = 'Overweight';
    else if (bmiVal >= 30) label = 'Obese';
    return { bmi: bmiVal, label };
  };

  const patientBMI = calculateBMI(selectedPatient?.weight, 172);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-[#F6F4ED] text-[#18231C] print:max-w-full print:p-0 print:m-0 print:space-y-0 print:bg-white">
      {/* Top Clinician Header Banner (hidden when printing report) */}
      <div className="ivory-card p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm border-l-4 border-l-[#235339] print:hidden">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#235339] text-white flex items-center justify-center text-xl shadow-xs shrink-0 font-bold">
            <Stethoscope className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="section-tag mb-0">CLINICAL PHYSICIAN PORTAL</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#E2EFE7] text-[#1E5034] text-[10px] font-mono border border-[#C6DDD0] font-bold">
                LIC #{currentUser?.licenseNumber || 'MD-98421'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#18231C] tracking-tight">
              {currentUser?.name || 'Dr. Rajesh Sharma, MD'}
            </h1>
            <p className="text-xs sm:text-sm text-[#5A645D] mt-0.5">
              {currentUser?.department || 'Internal Medicine & Clinical Pharmacology'} • MediSafe AI Attending Physician
            </p>
          </div>
        </div>

        {/* Right Side: Active Case Status & Action */}
        <div className="flex items-center gap-3 self-start md:self-center">
          {selectedPatient ? (
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#ECE7DC] border border-[#D5CDBF]">
              <div className="w-9 h-9 rounded-xl bg-[#235339] text-white flex items-center justify-center font-black text-sm shrink-0 shadow-xs">
                {selectedPatient.name.charAt(0)}
              </div>
              <div className="text-left">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#6A746C] font-bold">
                  Active Patient Case
                </div>
                <div className="text-xs font-bold text-[#18231C] truncate max-w-[150px] sm:max-w-[200px]">
                  {selectedPatient.name} ({selectedPatient.age}y)
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setCurrentStep('patients');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="ml-1 text-[11px] font-bold text-[#235339] hover:underline cursor-pointer shrink-0"
              >
                Change
              </button>
            </div>
          ) : (
            <div className="px-3.5 py-2 rounded-2xl bg-[#ECE7DC] border border-[#D5CDBF] text-xs text-[#5A645D] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-semibold">{activePatients.length} Assigned Patients</span>
            </div>
          )}
        </div>
      </div>

      {/* 6-Step Clinical Workflow Stepper Bar (hidden when printing report) */}
      <div className="ivory-card p-2 sm:p-2.5 shadow-xs border border-[#D5CDBF] print:hidden">
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1 sm:gap-2 min-w-max">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Activity },
              { id: 'patients', label: `My Patients (${activePatients.length})`, icon: Users },
              { id: 'profile', label: 'Patient Profile & Meds', icon: User },
              { id: 'analysis', label: 'AI Risk & SHAP', icon: Sparkles },
              { id: 'review', label: 'Doctor Review', icon: FileText },
              { id: 'report', label: 'Final Report', icon: FileCheck }
            ].map((tab, idx) => {
              const isActive = currentStep === tab.id;
              const Icon = tab.icon;
              return (
                <React.Fragment key={tab.id}>
                  <button
                    type="button"
                    onClick={() => {
                      if (['profile', 'analysis', 'review', 'report'].includes(tab.id) && !selectedPatient) {
                        if (activePatients.length > 0) {
                          handleSelectPatient(activePatients[0]);
                          setCurrentStep(tab.id);
                        } else {
                          setCurrentStep('patients');
                          showToast('Please select a patient first from your roster', 'info');
                        }
                      } else {
                        setCurrentStep(tab.id);
                      }
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 ${
                      isActive
                        ? 'bg-[#235339] text-white shadow-xs'
                        : 'text-[#4A554E] hover:text-[#18231C] hover:bg-[#ECE7DC]'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-mono font-bold shrink-0 ${
                        isActive ? 'bg-white/20 text-white' : 'bg-[#ECE7DC] text-[#4A554E]'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-[#6A746C]'}`} />
                    <span>{tab.label}</span>
                  </button>

                  {idx < 5 && (
                    <ChevronRight className="w-3.5 h-3.5 text-[#B8AF9F] shrink-0 select-none" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* STEP 1: DOCTOR DASHBOARD */}
      {/* ========================================================================= */}
      {currentStep === 'dashboard' && (
        <div className="space-y-8 animate-fade-in">
          {/* KPI Cards Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="ivory-card p-5 shadow-xs">
              <div className="flex items-center justify-between text-[#6F7771] text-xs">
                <span className="font-bold">Assigned Patients</span>
                <Users className="w-4 h-4 text-[#235339]" />
              </div>
              <div className="text-3xl font-black text-[#18231C] font-mono mt-2">
                {totalPatients}
              </div>
              <span className="text-[11px] text-[#5A645D] block mt-1">
                Active in clinical roster
              </span>
            </div>

            <div className="ivory-card p-5 shadow-xs">
              <div className="flex items-center justify-between text-rose-700 text-xs font-bold">
                <span>High Risk Alerts</span>
                <AlertTriangle className="w-4 h-4 text-rose-600" />
              </div>
              <div className="text-3xl font-black text-rose-700 font-mono mt-2">
                {highRiskPatientsCount}
              </div>
              <span className="text-[11px] text-[#5A645D] block mt-1">
                Patients with contraindications
              </span>
            </div>

            <div className="ivory-card p-5 shadow-xs">
              <div className="flex items-center justify-between text-amber-800 text-xs font-bold">
                <span>Pending Reviews</span>
                <Activity className="w-4 h-4 text-amber-600" />
              </div>
              <div className="text-3xl font-black text-amber-800 font-mono mt-2">
                {pendingReviewsCount}
              </div>
              <span className="text-[11px] text-[#5A645D] block mt-1">
                Requires physician sign-off
              </span>
            </div>

            <div className="ivory-card p-5 shadow-xs">
              <div className="flex items-center justify-between text-[#235339] text-xs font-bold">
                <span>Finalized Reports</span>
                <FileCheck className="w-4 h-4 text-[#235339]" />
              </div>
              <div className="text-3xl font-black text-[#235339] font-mono mt-2">
                {reviewsCount}
              </div>
              <span className="text-[11px] text-[#5A645D] block mt-1">
                Doctor-approved dossiers
              </span>
            </div>
          </div>

          {/* Quick Action Patient Search & Selection */}
          <div className="ivory-card p-6 sm:p-7 space-y-5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#E5DFD1]">
              <div>
                <h2 className="text-lg font-black text-[#18231C] tracking-tight uppercase">
                  Select Patient for Clinical Evaluation
                </h2>
                <p className="text-xs text-[#5A645D]">
                  Choose any assigned patient below to review their profile, run AI drug safety checks, and add your clinical opinion.
                </p>
              </div>

              <button
                onClick={() => setCurrentStep('patients')}
                className="pill-btn-primary text-xs py-2 px-4 flex items-center gap-1.5 self-start sm:self-auto"
              >
                <Users className="w-3.5 h-3.5" />
                <span>View Full Patients Directory →</span>
              </button>
            </div>

            {/* Patients Grid Preview (Top 4) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {activePatients.slice(0, 3).map((p) => {
                const isSelected = selectedPatient?.id === p.id;
                const pReviews = getDoctorReviewsForPatient(p.id);
                return (
                  <DoctorPatientCard
                    key={p.id}
                    patient={p}
                    isSelected={isSelected}
                    onSelect={() => handleSelectPatient(p)}
                    latestReview={pReviews[0] || null}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 2: MY PATIENTS (SEARCH & SELECT) */}
      {/* ========================================================================= */}
      {currentStep === 'patients' && (
        <div className="space-y-6 animate-fade-in text-left">
          {/* Search & Filter Bar */}
          <div className="ivory-card p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="relative w-full md:w-80">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search assigned patients by name..."
                className="ivory-input w-full pl-9 pr-3.5 py-2 text-xs"
              />
              <Search className="w-4 h-4 text-[#8D8678] absolute left-3 top-2.5" />
            </div>

            {/* Condition Filters */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <span className="text-xs text-[#6F7771] font-mono font-bold">Filter Condition:</span>
              {['ALL', 'Kidney', 'Hypertension', 'Diabetes'].map((cond) => (
                <button
                  key={cond}
                  onClick={() => setFilterCondition(cond)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                    filterCondition === cond
                      ? 'bg-[#235339] text-white'
                      : 'bg-[#ECE7DC] text-[#424C44] hover:bg-[#DCD5C5]'
                  }`}
                >
                  {cond === 'ALL' ? 'All Conditions' : cond}
                </button>
              ))}
            </div>
          </div>

          {/* Patients List Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPatients.length === 0 ? (
              <div className="col-span-full ivory-card p-12 text-center text-xs text-[#6F7771] space-y-2">
                <Users className="w-8 h-8 text-[#8D8678] mx-auto" />
                <h4 className="text-sm font-bold text-[#18231C]">No matching patient records found</h4>
                <p>Try searching with another query or reset the condition filter.</p>
              </div>
            ) : (
              filteredPatients.map((p) => {
                const isSelected = selectedPatient?.id === p.id;
                const pReviews = getDoctorReviewsForPatient(p.id);
                return (
                  <DoctorPatientCard
                    key={p.id}
                    patient={p}
                    isSelected={isSelected}
                    onSelect={() => handleSelectPatient(p)}
                    latestReview={pReviews[0] || null}
                  />
                );
              })
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 3: PATIENT HEALTH PROFILE & CURRENT MEDICINES */}
      {/* ========================================================================= */}
      {currentStep === 'profile' && selectedPatient && (
        <div className="space-y-6 animate-fade-in text-left">
          {/* Action Bar */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentStep('patients')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#235339] hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Patients List</span>
            </button>

            <button
              onClick={() => {
                setCurrentStep('analysis');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="pill-btn-primary text-xs py-2 px-4 flex items-center gap-1.5 shadow-sm"
            >
              <span>Proceed to AI Safety Analysis →</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Demographics Card */}
          <div className="ivory-card p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5DFD1]">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#235339] text-white font-black flex items-center justify-center text-lg shadow-xs">
                  {selectedPatient.name.charAt(0)}
                </div>
                <div>
                  <span className="section-tag mb-0.5">CLINICAL HEALTH PROFILE</span>
                  <h2 className="text-xl sm:text-2xl font-black text-[#18231C] tracking-tight">
                    {selectedPatient.name}
                  </h2>
                  <p className="text-xs text-[#5A645D]">
                    ID: <code className="font-mono text-[#235339] font-bold">{selectedPatient.id}</code> • Registered MediSafe Patient Record
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#E2EFE7] text-[#1E5034] text-xs font-bold font-mono border border-[#C6DDD0]">
                  Verified Clinical Record
                </span>
              </div>
            </div>

            {/* Demographics 4-box strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
              <div className="p-3.5 rounded-2xl bg-[#F6F4ED] border border-[#E5DFD1]">
                <span className="text-[#6F7771] block uppercase text-[10px] font-bold">Age & Gender</span>
                <strong className="text-[#18231C] text-sm block mt-0.5">
                  {selectedPatient.age} yrs • {selectedPatient.gender}
                </strong>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F6F4ED] border border-[#E5DFD1]">
                <span className="text-[#6F7771] block uppercase text-[10px] font-bold">Weight & Height</span>
                <strong className="text-[#18231C] text-sm block mt-0.5">
                  {selectedPatient.weight || 70} kg • 172 cm
                </strong>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F6F4ED] border border-[#E5DFD1]">
                <span className="text-[#6F7771] block uppercase text-[10px] font-bold">Calculated BMI</span>
                <strong className="text-[#235339] text-sm block mt-0.5">
                  {patientBMI.bmi} ({patientBMI.label})
                </strong>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F6F4ED] border border-[#E5DFD1]">
                <span className="text-[#6F7771] block uppercase text-[10px] font-bold">Allergy Count</span>
                <strong className="text-rose-700 text-sm block mt-0.5">
                  {selectedPatient.allergies?.length || 0} Documented
                </strong>
              </div>
            </div>

            {/* Chronic Conditions & Allergies */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2 text-xs">
                <span className="font-bold text-[#18231C] uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <HeartPulse className="w-4 h-4 text-rose-600" />
                  Diagnosed Chronic Diseases
                </span>
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E5DFD1] space-y-2">
                  {(selectedPatient.chronicDiseases || selectedPatient.diseases || []).length === 0 ? (
                    <span className="text-[#8C938D] italic">No chronic illnesses recorded in this profile.</span>
                  ) : (
                    (selectedPatient.chronicDiseases || selectedPatient.diseases || []).map((d, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                        <span className="font-semibold text-[#18231C]">{d}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <span className="font-bold text-[#18231C] uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  Documented Drug Allergies
                </span>
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E5DFD1] space-y-2">
                  {(selectedPatient.allergies || []).length === 0 ? (
                    <span className="text-emerald-800 font-medium">✓ No known drug allergies documented (Clear).</span>
                  ) : (
                    (selectedPatient.allergies || []).map((a, i) => (
                      <div key={i} className="flex items-center gap-2 text-amber-900 font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                        <span>⚠ {a}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Current Medicines Section */}
            <div className="space-y-3 pt-4 border-t border-[#E5DFD1]">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#18231C] uppercase tracking-wider font-mono flex items-center gap-1.5 text-xs">
                  <Pill className="w-4 h-4 text-[#235339]" />
                  Active Current Medications ({selectedPatient.currentMedicines?.length || 0})
                </span>
                <span className="text-[11px] text-[#6F7771]">Click a medicine to evaluate with AI</span>
              </div>

              {(selectedPatient.currentMedicines || []).length === 0 ? (
                <div className="p-6 rounded-2xl bg-[#F6F4ED] text-center text-xs text-[#6F7771]">
                  No active prescriptions recorded for this patient.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {selectedPatient.currentMedicines.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white border border-[#D5CDBF] flex items-center justify-between gap-3 shadow-2xs hover:border-[#235339] transition"
                    >
                      <div>
                        <strong className="text-sm text-[#18231C] block">{m.name}</strong>
                        <span className="text-[11px] text-[#5A645D]">
                          {m.dosage} • {m.frequency}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          setAnalyzedMedName(m.name);
                          setAnalyzedDosage(m.dosage);
                          setAnalyzedFrequency(m.frequency);
                          setCurrentStep('analysis');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="px-3 py-1.5 rounded-full bg-[#E2EFE7] hover:bg-[#235339] text-[#1E5034] hover:text-white font-bold text-xs transition"
                      >
                        Evaluate with AI →
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 4 & 5: AI MEDICINE ANALYSIS + EXPLAINABLE AI (SHAP) */}
      {/* ========================================================================= */}
      {currentStep === 'analysis' && selectedPatient && (
        <div className="space-y-6 animate-fade-in text-left">
          {/* Action Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentStep('profile')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#235339] hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Patient Profile</span>
            </button>

            <button
              onClick={() => {
                setCurrentStep('review');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="pill-btn-primary text-xs py-2 px-4 flex items-center gap-1.5 shadow-sm"
            >
              <span>Give Doctor’s Review & Opinion →</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Evaluated Medicine Switcher Card */}
          <div className="ivory-card p-5 space-y-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="section-tag mb-0.5">AI MEDICINE ANALYSIS ENGINE</span>
                <h3 className="text-lg font-black text-[#18231C]">
                  Evaluating: {analyzedMedName} ({analyzedDosage})
                </h3>
                <p className="text-xs text-[#5A645D]">
                  Calibrated for <strong>{selectedPatient.name}</strong> ({selectedPatient.age}y, {selectedPatient.gender})
                </p>
              </div>

              {/* Quick Medication Switcher */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-mono uppercase font-bold text-[#6F7771]">Switch Test Drug:</span>
                {['Lisinopril', 'Ibuprofen', 'Paracetamol (Acetaminophen)', 'Amoxicillin'].map((med) => (
                  <button
                    key={med}
                    type="button"
                    onClick={() => {
                      setAnalyzedMedName(med);
                      setAnalyzedDosage(med === 'Ibuprofen' ? '400mg' : med === 'Amoxicillin' ? '500mg' : '10mg');
                    }}
                    className={`px-2.5 py-1 rounded-full text-xs font-bold transition ${
                      analyzedMedName.toLowerCase() === med.toLowerCase()
                        ? 'bg-[#235339] text-white'
                        : 'bg-[#ECE7DC] text-[#424C44] hover:bg-[#DCD5C5]'
                    }`}
                  >
                    {med}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* AI Result Cards Grid */}
          {doctorAnalysis && (
            <div className="space-y-6">
              {/* 1. Risk Gauge Card */}
              <RiskGauge
                score={doctorAnalysis.riskScore}
                level={doctorAnalysis.riskLevel}
                medicineName={doctorAnalysis.medicineName}
              />

              {/* 2. Severe Allergy Warning Banner if detected */}
              {doctorAnalysis.allergyAlert && (
                <div className="p-5 rounded-2xl bg-rose-50 border-2 border-rose-300 shadow-sm flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-rose-100 text-rose-800 border border-rose-200 shrink-0">
                    <AlertOctagon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold uppercase tracking-wider text-rose-800 bg-rose-100 px-2 py-0.5 rounded-full border border-rose-200">
                        Critical Allergy Conflict
                      </span>
                      <strong className="text-rose-900">{doctorAnalysis.allergyAlert.detectedAllergy}</strong>
                    </div>
                    <h4 className="text-base font-bold text-rose-950">Hypersensitivity Contraindication</h4>
                    <p className="text-rose-900 leading-relaxed">{doctorAnalysis.allergyAlert.warning}</p>
                  </div>
                </div>
              )}

              {/* 3. Drug-Disease Conflicts */}
              {doctorAnalysis.diseaseConflicts?.length > 0 && (
                <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 shadow-sm space-y-3 text-xs">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
                    <span>Drug–Disease Contraindication Warnings ({doctorAnalysis.diseaseConflicts.length})</span>
                  </div>
                  <div className="space-y-2">
                    {doctorAnalysis.diseaseConflicts.map((dc, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-white border border-amber-200">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <strong className="text-[#18231C] text-sm">{dc.disease}</strong>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-100 text-amber-900 border border-amber-300">
                            {dc.severity} Contraindication
                          </span>
                        </div>
                        <p className="text-[#5A645D] leading-relaxed">{dc.explanation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Drug-Drug Interactions */}
              {doctorAnalysis.drugDrugConflicts?.length > 0 && (
                <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 shadow-sm space-y-3 text-xs">
                  <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>Drug–Drug Interactions Flagged ({doctorAnalysis.drugDrugConflicts.length})</span>
                  </div>
                  <div className="space-y-2">
                    {doctorAnalysis.drugDrugConflicts.map((dd, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-white border border-rose-200">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <strong className="text-[#18231C] text-sm">Clash with: {dd.withDrug}</strong>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-rose-100 text-rose-800 border border-rose-300">
                            {dd.severity} Clash
                          </span>
                        </div>
                        <p className="text-[#5A645D] leading-relaxed">{dd.summary}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. Predicted Side Effects Bars */}
              <SideEffectBars
                sideEffects={doctorAnalysis.sideEffects}
                patientAge={selectedPatient.age}
                medicineName={doctorAnalysis.medicineName}
              />

              {/* 6. Explainable AI (SHAP Waterfall Breakdown) */}
              <ExplainableAIView
                shapFactors={doctorAnalysis.shapFactors}
                riskLevel={doctorAnalysis.riskLevel}
                plainEnglishExplanation={doctorAnalysis.plainEnglishExplanation}
                medicineName={doctorAnalysis.medicineName}
              />
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 6: DOCTOR REVIEW & COMMENTS */}
      {/* ========================================================================= */}
      {currentStep === 'review' && selectedPatient && doctorAnalysis && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentStep('analysis')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#235339] hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to AI Risk & SHAP Findings</span>
            </button>
          </div>

          {/* Interactive Doctor Review Form */}
          <DoctorReviewForm
            patient={selectedPatient}
            analysis={doctorAnalysis}
            doctor={currentUser}
            onFinalizeReview={handleFinalizeDoctorReview}
            existingReview={latestDoctorReview}
          />
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 7: FINAL REVIEWED REPORT */}
      {/* ========================================================================= */}
      {currentStep === 'report' && selectedPatient && (
        <div className="space-y-6 animate-fade-in text-left">
          {/* Action Bar */}
          <div className="flex items-center justify-between print:hidden">
            <button
              onClick={() => setCurrentStep('review')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#D5CDBF] bg-white hover:bg-[#F3EFE6] text-xs font-bold text-[#18231C] transition"
            >
              <ArrowLeft className="w-4 h-4 text-[#235339]" />
              <span>Modify Doctor Review</span>
            </button>

            <button
              onClick={() => window.print()}
              className="pill-btn-primary flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#235339] text-white hover:bg-[#1B432E] font-bold text-xs shadow-md transition"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save Final Clinical Dossier (PDF)</span>
            </button>
          </div>

          {/* Success Banner */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 flex items-center justify-between gap-3 text-emerald-900 print:hidden shadow-xs">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
              <div className="text-xs">
                <strong>Doctor Review Attached:</strong> This clinical opinion has been signed and saved to <strong>{selectedPatient.name}’s</strong> official health record.
              </div>
            </div>

            <button
              onClick={() => {
                setCurrentStep('patients');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-3.5 py-1.5 rounded-full bg-[#235339] text-white text-xs font-bold shadow-xs hover:bg-[#1A3E2B] transition shrink-0"
            >
              Review Next Patient →
            </button>
          </div>

          {/* Printable Official Clinical Report */}
          <div className="p-8 sm:p-12 rounded-3xl bg-white text-[#18231C] border border-[#E5DFD1] shadow-xl space-y-8 print:border-none print:shadow-none print:p-0 print:m-0 print:space-y-3 print:text-xs print-compact-report">
            {/* Document Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-[#18231C] print:pb-2.5 print:gap-2 print:border-b print:border-black print-avoid-break">
              <div className="flex items-center gap-3">
                <MediSafeLogoMark size={44} />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#235339] font-bold">
                      OFFICIAL MEDICAL DOSSIER • CLINICALLY FINALIZED
                    </span>
                  </div>
                  <h1 className="text-2xl font-black tracking-tight text-[#18231C] print:text-lg">
                    MediSafe AI • Doctor-Reviewed Clinical Safety Report
                  </h1>
                  <p className="text-xs text-[#6F7771] font-medium print:text-[10px]">
                    Attending Physician Evaluation & Explainable AI Decision Support
                  </p>
                </div>
              </div>

              <div className="text-left sm:text-right text-xs space-y-1 font-mono text-[#4F5752] print:text-[10px] print:space-y-0.5">
                <div><strong className="text-[#18231C]">Dossier ID:</strong> <span>MSR-DOC-{Math.floor(100000 + Math.random() * 900000)}</span></div>
                <div><strong className="text-[#18231C]">Evaluation Date:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                <div><strong className="text-[#18231C]">Attending Doctor:</strong> {currentUser?.name || 'Dr. Rajesh Sharma, MD'}</div>
              </div>
            </div>

            {/* Patient Profile Card */}
            <div className="p-5 rounded-2xl bg-[#F6F4ED] border border-[#E5DFD1] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs print:p-2.5 print:gap-2 print:rounded-xl print:bg-gray-50 print:border-gray-300 print-avoid-break">
              <div>
                <span className="text-[#6F7771] block uppercase tracking-wider text-[10px] font-mono font-bold print:text-[9px]">Patient Name</span>
                <strong className="text-[#18231C] text-sm font-black print:text-xs">{selectedPatient.name}</strong>
              </div>
              <div>
                <span className="text-[#6F7771] block uppercase tracking-wider text-[10px] font-mono font-bold print:text-[9px]">Demographics</span>
                <strong className="text-[#18231C] text-sm font-black print:text-xs">{selectedPatient.age} yrs • {selectedPatient.gender}</strong>
              </div>
              <div>
                <span className="text-[#6F7771] block uppercase tracking-wider text-[10px] font-mono font-bold print:text-[9px]">Weight & BMI</span>
                <strong className="text-[#18231C] text-sm font-black print:text-xs">{selectedPatient.weight || 70} kg • BMI {patientBMI.bmi}</strong>
              </div>
              <div>
                <span className="text-[#6F7771] block uppercase tracking-wider text-[10px] font-mono font-bold print:text-[9px]">Documented Allergies</span>
                <strong className="text-rose-700 text-sm font-black print:text-xs">
                  {selectedPatient.allergies?.length > 0 ? selectedPatient.allergies.join(', ') : 'None Reported'}
                </strong>
              </div>
            </div>

            {/* Evaluated Prescription Banner */}
            <div className="p-6 rounded-2xl bg-[#E2EFE7] border border-[#235339]/20 space-y-3 print:p-2.5 print:space-y-1.5 print:rounded-xl print:border-emerald-800/30 print-avoid-break">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 print:gap-1">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#235339] font-mono print:text-[9px]">
                    MEDICATION EVALUATED
                  </span>
                  <h2 className="text-xl font-black text-[#18231C] mt-0.5 print:text-sm">
                    {doctorAnalysis?.medicineName} ({doctorAnalysis?.dosage})
                  </h2>
                  <span className="text-xs text-[#4F5752] font-semibold print:text-[10px]">
                    Prescribed Intake: {doctorAnalysis?.frequency}
                  </span>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#235339] font-mono block print:text-[9px]">
                    AI SAFETY SCORE
                  </span>
                  <span className="text-3xl font-black font-mono text-[#18231C] print:text-xl">
                    {doctorAnalysis?.riskScore}%
                  </span>
                  <span className={`block text-xs font-black uppercase tracking-wider mt-0.5 print:text-[9.5px] ${
                    doctorAnalysis?.riskLevel === 'HIGH' ? 'text-rose-700' : 'text-[#235339]'
                  }`}>
                    {doctorAnalysis?.riskLevel === 'HIGH' ? '⚠ HIGH RISK CONTRAINDICATION' : '✓ LOW RISK PROFILE'}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#235339]/20 text-xs text-[#235339] font-medium print:pt-1 print:text-[10px]">
                <strong className="font-bold text-[#18231C]">AI Synthesis:</strong> {doctorAnalysis?.plainEnglishExplanation}
              </div>
            </div>

            {/* =============================================================== */}
            {/* OFFICIAL ATTENDING PHYSICIAN REVIEW SECTION */}
            {/* =============================================================== */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#FAF8F5] border-2 border-[#235339] space-y-5 print:p-3 print:space-y-2 print:rounded-xl print:border print:border-[#235339] print-avoid-break">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#D5CDBF] print:pb-1.5">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#235339] print:w-4 print:h-4" />
                  <h3 className="text-base font-black uppercase tracking-wide text-[#18231C] print:text-xs">
                    Official Attending Physician Review & Decision
                  </h3>
                </div>

                <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono uppercase tracking-wider print:text-[9.5px] print:px-2 print:py-0.5 ${
                  latestDoctorReview?.decision === 'AGREE'
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    : latestDoctorReview?.decision === 'DISAGREE'
                    ? 'bg-rose-100 text-rose-900 border border-rose-300'
                    : 'bg-sky-100 text-sky-900 border border-sky-300'
                }`}>
                  {latestDoctorReview?.decisionLabel || 'Physician Approved & Finalized'}
                </span>
              </div>

              <div className="space-y-4 text-xs print:space-y-1.5">
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-[#6F7771] block mb-1 print:mb-0.5 print:text-[9px]">
                    Doctor’s Clinical Opinion & Rationale:
                  </span>
                  <p className="p-3.5 rounded-2xl bg-white border border-[#D5CDBF] text-[#18231C] leading-relaxed font-medium print:p-2 print:rounded-lg print:text-[10px] print:leading-normal">
                    {latestDoctorReview?.doctorComments || 'Prescription evaluated and approved for patient clinical regimen.'}
                  </p>
                </div>

                {latestDoctorReview?.additionalPrecautions && latestDoctorReview.additionalPrecautions.length > 0 && (
                  <div>
                    <span className="text-[10px] font-mono uppercase font-bold text-[#6F7771] block mb-1.5 print:mb-0.5 print:text-[9px]">
                      Prescribed Additional Precautions & Monitoring Instructions:
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 print:gap-1">
                      {latestDoctorReview.additionalPrecautions.map((prec, i) => (
                        <li
                          key={i}
                          className="p-2.5 rounded-xl bg-white border border-[#D5CDBF] text-[#235339] font-semibold flex items-center gap-2 print:p-1.5 print:text-[9.5px]"
                        >
                          <span className="w-4 h-4 rounded-full bg-[#E2EFE7] text-[#235339] flex items-center justify-center text-[10px] shrink-0 print:w-3.5 print:h-3.5 print:text-[8px]">✓</span>
                          <span>{prec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-[#6F7771] block mb-1 print:mb-0.5 print:text-[9px]">
                    Prescribing Directive:
                  </span>
                  <div className="font-bold text-[#18231C] bg-white px-3 py-2 rounded-xl border border-[#D5CDBF] inline-block font-mono print:px-2 print:py-0.5 print:text-[10px]">
                    {latestDoctorReview?.recommendedAction || 'Approve Prescription as Prescribed'}
                  </div>
                </div>
              </div>

              {/* Physician Signature Block */}
              <div className="pt-4 border-t border-[#D5CDBF] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono print:pt-1.5 print:gap-1.5 print:text-[9.5px]">
                <div>
                  <span className="text-[10px] text-[#6F7771] block uppercase font-bold print:text-[8.5px]">Attending Doctor</span>
                  <strong className="text-[#18231C] block text-sm print:text-[11px]">{currentUser?.name || 'Dr. Rajesh Sharma, MD'}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-[#6F7771] block uppercase font-bold print:text-[8.5px]">License / NPI Number</span>
                  <strong className="text-[#18231C] block text-sm print:text-[11px]">{currentUser?.licenseNumber || 'MD-98421'}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-[#6F7771] block uppercase font-bold print:text-[8.5px]">Digital Signature Stamp</span>
                  <span className="text-emerald-800 font-bold block text-sm print:text-[11px]">✓ DIGITALLY VERIFIED</span>
                </div>
              </div>
            </div>

            {/* Explainable AI Factor Attribution Table */}
            {doctorAnalysis?.shapFactors && (
              <div className="space-y-3 text-xs print:space-y-1.5 print-avoid-break">
                <div className="flex items-center gap-2">
                  <span className="section-tag print:text-[9px] print:py-0.5">SHAP EXPLAINABILITY</span>
                  <h3 className="text-xs font-black uppercase tracking-wider text-[#18231C] print:text-[10px]">
                    Explainable AI Attribution Breakdown
                  </h3>
                </div>

                <div className="rounded-2xl border border-[#E5DFD1] overflow-hidden print:rounded-xl">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="bg-[#F6F4ED] border-b border-[#E5DFD1] text-[#18231C] text-[11px] print:text-[9.5px]">
                        <th className="p-3 font-black print:p-1.5">Health Factor</th>
                        <th className="p-3 font-black font-mono print:p-1.5">Mathematical Impact</th>
                        <th className="p-3 font-black print:p-1.5">Clinical Rationale</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5DFD1] bg-white">
                      {doctorAnalysis.shapFactors.map((f, i) => (
                        <tr key={i} className="hover:bg-[#FBF9F5] transition">
                          <td className="p-3 font-bold text-[#18231C] print:p-1.5 print:text-[9.5px]">{f.factor}</td>
                          <td className={`p-3 font-mono font-black print:p-1.5 print:text-[9.5px] ${f.type === 'risk' ? 'text-rose-600' : 'text-[#235339]'}`}>
                            {f.impact}
                          </td>
                          <td className="p-3 text-[#4F5752] print:p-1.5 print:text-[9.5px]">{f.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Legal Medical Disclaimer */}
            <div className="text-[10px] font-mono text-[#8C938D] leading-relaxed text-center pt-4 border-t border-[#E5DFD1] print:pt-1.5 print:text-[8px] print:leading-tight print-avoid-break">
              This clinical document has been reviewed and certified by a licensed healthcare physician using MediSafe AI decision support. Prescription authority is executed under HIPAA / clinical governance protocols.
            </div>
          </div>
        </div>
      )}

      {/* Fallback if a patient is not selected for patient-specific steps (hidden when printing) */}
      {['profile', 'analysis', 'review', 'report'].includes(currentStep) && !selectedPatient && (
        <div className="ivory-card p-12 text-center space-y-4 animate-fade-in print:hidden">
          <div className="w-14 h-14 rounded-2xl bg-[#235339]/10 text-[#235339] flex items-center justify-center mx-auto">
            <Users className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-[#18231C]">No Patient Selected</h3>
          <p className="text-sm text-[#5A645D] max-w-md mx-auto">
            Please select an assigned patient from your clinical roster to view their health profile, AI safety analysis, and medical review.
          </p>
          <button
            type="button"
            onClick={() => {
              setCurrentStep('patients');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="pill-btn-primary px-5 py-2.5 text-xs font-bold shadow-sm inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Browse Assigned Patients List</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
