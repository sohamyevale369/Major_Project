import React from 'react';
import {
  Activity,
  ShieldCheck,
  AlertTriangle,
  AlertOctagon,
  Pill,
  Camera,
  RefreshCw,
  User,
  History,
  FileText,
  ArrowRight,
  Sparkles,
  Bot,
  CheckCircle2
} from 'lucide-react';
import { useHealth } from '../../context/HealthContext';
import RiskBadge from '../common/RiskBadge';

export default function UserDashboard() {
  const {
    patient,
    currentUser,
    currentAnalysis,
    medicationHistory,
    hasUpdatedPersonalDetails,
    setActiveTab,
    setIsChatbotOpen
  } = useHealth();

  const userGreetingName = (() => {
    const raw = currentUser?.name?.trim() || patient?.name?.trim() || '';
    if (!raw) return 'there';
    const parts = raw.split(/\s+/);
    if (parts[0].toLowerCase().startsWith('dr') && parts.length > 1) {
      return `${parts[0]} ${parts[1]}`;
    }
    return parts[0];
  })();

  const safetyScore = currentAnalysis ? (100 - currentAnalysis.riskScore) : (patient.diseases?.length > 0 ? 88 : 98);

  // Admin Guard: Admins do not have personal health tracking
  if (currentUser?.role === 'admin') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-5 animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-purple-50 text-purple-700 border border-purple-200 flex items-center justify-center mx-auto shadow-sm">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="section-tag mb-0">ADMINISTRATIVE NOTICE</span>
          <h1 className="text-2xl font-black text-[#18231C]">
            Personal Health Dashboard Disabled for Admin
          </h1>
          <p className="text-xs sm:text-sm text-[#5A645D] max-w-md mx-auto leading-relaxed">
            The personal health dashboard is dedicated to patients and clinicians. Administrators have oversight and management rights over all patient records.
          </p>
        </div>
        <button
          onClick={() => setActiveTab('admin')}
          className="pill-btn-primary text-xs py-2.5 px-6 mx-auto cursor-pointer"
        >
          Open Admin Console & Patient Records →
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 bg-[#F6F4ED] text-[#18231C]">
      
      {/* Welcome Banner */}
      <div className="ivory-card p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#235339] text-white font-black flex items-center justify-center text-xl shadow-sm shrink-0">
            {(userGreetingName || patient.name || 'P').charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="section-tag mb-0">
                PATIENT DASHBOARD // ACTIVE
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#18231C] tracking-tight">
              Hello {userGreetingName} 👋, Welcome Back!
            </h1>
            <p className="text-xs sm:text-sm text-[#5A645D]">
              Age {patient.age} • {patient.gender} • {patient.diseases?.join(', ') || 'No chronic illnesses logged'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => {
              setActiveTab('risk-checker');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="pill-btn-primary text-xs py-2.5 px-4"
          >
            <Pill className="w-4 h-4" />
            <span>Check Medicine</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('ocr');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="pill-btn-secondary text-xs py-2 px-4"
          >
            <Camera className="w-4 h-4" />
            <span>Scan Prescription</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <div className="ivory-card p-4">
          <span className="text-xs text-[#6A746C] font-bold block">Medication Safety Score</span>
          <div className="text-3xl font-black text-[#235339] font-mono mt-1 flex items-baseline gap-1.5">
            <span>{hasUpdatedPersonalDetails ? `${safetyScore}%` : '—'}</span>
            <span className="text-[10px] font-bold text-[#1E5034] bg-[#E2EFE7] px-1.5 py-0.2 rounded-full">
              {hasUpdatedPersonalDetails ? 'Optimal' : 'Pending Profile'}
            </span>
          </div>
          <span className="text-[11px] text-[#5A645D] block mt-1">
            {hasUpdatedPersonalDetails ? 'Overall clinical profile' : 'Update profile to score'}
          </span>
        </div>

        <div className="ivory-card p-4">
          <span className="text-xs text-[#6A746C] font-bold block">Medicines</span>
          <div className="text-3xl font-black text-[#18231C] font-mono mt-1">
            {patient.currentMedicines?.length ?? 0}
          </div>
          <span className="text-[11px] text-[#5A645D] block mt-1">
            Active prescriptions
          </span>
        </div>

        <div className="ivory-card p-4">
          <span className="text-xs text-[#6A746C] font-bold block">Interactions</span>
          <div className="text-3xl font-black text-amber-600 font-mono mt-1">
            {patient.currentMedicines?.length > 1 ? 1 : 0}
          </div>
          <span className="text-[11px] text-[#5A645D] block mt-1">
            Monitored clash
          </span>
        </div>

        <div className="ivory-card p-4">
          <span className="text-xs text-[#6A746C] font-bold block">Alerts</span>
          <div className="text-3xl font-black text-[#235339] font-mono mt-1">
            0
          </div>
          <span className="text-[11px] text-[#5A645D] block mt-1">
            Zero emergency flags
          </span>
        </div>

        <div className="ivory-card p-4 col-span-2 sm:col-span-1">
          <span className="text-xs text-[#6A746C] font-bold block">Reports</span>
          <div className="text-3xl font-black text-[#18231C] font-mono mt-1">
            {medicationHistory?.length ?? 0}
          </div>
          <span className="text-[11px] text-[#5A645D] block mt-1">
            Saved clinical scans
          </span>
        </div>
      </div>

      {/* Main Content: Current Evaluation & Health Profile */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Evaluation Card */}
        {!hasUpdatedPersonalDetails ? (
          <div className="lg:col-span-2 ivory-card p-8 text-center space-y-4 shadow-sm border-2 border-dashed border-amber-300 bg-[#FDFBF7] flex flex-col items-center justify-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
              <AlertTriangle className="w-7 h-7 text-amber-800" />
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-200/80 text-amber-900 text-[10px] font-bold font-mono uppercase mb-2 border border-amber-300">
                Action Required
              </span>
              <h3 className="text-base sm:text-lg font-black text-[#18231C] uppercase tracking-wide">
                Update Health Profile to Generate Reports
              </h3>
              <p className="text-xs text-[#5A645D] mt-1 max-w-md mx-auto">
                No medical conditions, allergies, or active medications have been recorded for {patient.name}. Update your health profile to generate personalized clinical safety reports.
              </p>
            </div>
            <button
              onClick={() => {
                setActiveTab('profile');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="pill-btn-primary text-xs py-2.5 px-5 bg-amber-800 hover:bg-amber-900 text-white font-bold cursor-pointer"
            >
              <span>Update Health Profile to Generate Reports →</span>
            </button>
          </div>
        ) : currentAnalysis ? (
          <div className="lg:col-span-2 ivory-card p-6 sm:p-7 space-y-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5DFD1]">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#6A746C] block">
                  CURRENT EVALUATION
                </span>
                <h2 className="text-lg font-black text-[#18231C] uppercase tracking-tight">
                  {currentAnalysis.medicineName} ({currentAnalysis.dosage})
                </h2>
              </div>
              <RiskBadge level={currentAnalysis.riskLevel} score={currentAnalysis.riskScore} size="md" />
            </div>

            {/* Sage Result Box matching Image 5 */}
            <div className="sage-result-box p-4 text-xs sm:text-sm text-[#1E5034] leading-relaxed">
              <div className="flex items-center justify-between mb-1.5 font-bold">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#235339]" />
                  Explainable AI Finding
                </span>
                <span className="text-[10px] font-mono uppercase bg-[#C6DDD0] px-2 py-0.5 rounded-full text-[#18231C]">
                  Trained Clinical Model
                </span>
              </div>
              <p className="text-[#18231C] font-medium">{currentAnalysis.plainEnglishExplanation}</p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-[#18231C] uppercase tracking-wider block">
                Contributing Factors (SHAP / LIME):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentAnalysis.shapFactors?.slice(0, 4).map((f, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-[#F3EFE6] border border-[#D5CDBF] text-xs flex items-center justify-between">
                    <span className="text-[#37423B] font-medium">{f.factor}</span>
                    <span className={`font-mono font-bold ${f.type === 'risk' ? 'text-rose-700' : 'text-[#235339]'}`}>
                      {f.impact}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#E5DFD1]">
              <button
                onClick={() => {
                  setActiveTab('risk-checker');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-1.5 text-xs font-bold text-[#235339] hover:underline transition"
              >
                <span>View Full SHAP Breakdown & Alternatives</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  setActiveTab('report');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#5A645D] hover:text-[#18231C] transition"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Export Safety Summary</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-2 ivory-card p-8 text-center space-y-4 shadow-sm border-2 border-dashed border-[#C6DDD0] flex flex-col items-center justify-center">
            <div className="w-14 h-14 rounded-2xl bg-[#E2EFE7] text-[#235339] flex items-center justify-center">
              <Pill className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-base font-black text-[#18231C] uppercase tracking-wide">
                No Medication Evaluated Yet
              </h3>
              <p className="text-xs text-[#5A645D] mt-1 max-w-md mx-auto">
                Your session is clean. Select a medication to see real-time contraindications and personalized side effects for {patient.name}.
              </p>
            </div>
            <button
              onClick={() => {
                setActiveTab('risk-checker');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="pill-btn-primary text-xs py-2.5 px-5 cursor-pointer"
            >
              <Pill className="w-4 h-4" />
              <span>Select Medicine to Evaluate</span>
            </button>
          </div>
        )}

        {/* Right Col: Health Profile & Quick Guide */}
        <div className="space-y-6">
          <div className="ivory-card p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5DFD1]">
              <h3 className="text-sm font-bold text-[#18231C] flex items-center gap-2">
                <User className="w-4 h-4 text-[#235339]" />
                Health Profile Summary
              </h3>
              <button
                onClick={() => setActiveTab('profile')}
                className="text-xs text-[#235339] hover:underline font-bold"
              >
                Edit Profile
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[#6A746C] block font-bold mb-1">Documented Conditions:</span>
                <div className="flex flex-wrap gap-1">
                  {patient.diseases.map(d => (
                    <span key={d} className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-800 border border-rose-200 text-[11px] font-medium">
                      {d}
                    </span>
                  ))}
                  {patient.diseases.length === 0 && <span className="text-[#8D8678]">None logged</span>}
                </div>
              </div>

              <div>
                <span className="text-[#6A746C] block font-bold mb-1">Known Allergies:</span>
                <div className="flex flex-wrap gap-1">
                  {patient.allergies.map(a => (
                    <span key={a} className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-medium">
                      {a}
                    </span>
                  ))}
                  {patient.allergies.length === 0 && <span className="text-[#235339] font-medium">None logged (Safe)</span>}
                </div>
              </div>

              <div>
                <span className="text-[#6A746C] block font-bold mb-1">Active Prescriptions:</span>
                <ul className="space-y-1">
                  {patient.currentMedicines.map((m, i) => (
                    <li key={i} className="text-[#37423B] flex justify-between">
                      <span>• {m.name}</span>
                      <span className="text-[#6A746C] font-mono text-[10px]">{m.dosage}</span>
                    </li>
                  ))}
                  {patient.currentMedicines.length === 0 && <li className="text-[#8D8678] italic">None</li>}
                </ul>
              </div>
            </div>
          </div>

          <div className="ivory-card-tint p-5 space-y-3 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white text-[#235339] border border-[#D5CDBF] shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#18231C]">MediSafe AI Guide</h4>
                <p className="text-[11px] text-[#5A645D]">Have medication questions?</p>
              </div>
            </div>
            <button
              onClick={() => setIsChatbotOpen(true)}
              className="pill-btn-primary w-full py-2 px-3 text-xs"
            >
              Ask AI Clinical Assistant →
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
