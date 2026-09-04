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
  Bot
} from 'lucide-react';
import { useHealth } from '../../context/HealthContext';
import RiskBadge from '../common/RiskBadge';

export default function UserDashboard() {
  const {
    patient,
    currentAnalysis,
    medicationHistory,
    setActiveTab,
    setIsChatbotOpen
  } = useHealth();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-mediteal-950/40 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-mediteal-400 to-mediblue-500 text-slate-950 font-black flex items-center justify-center text-xl shadow-lg shrink-0">
            {patient.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-mediteal-400">
                Patient Safety Dashboard
              </span>
              <span className="px-2 py-0.2 rounded-full bg-mediteal-500/10 text-mediteal-300 text-[10px] font-mono border border-mediteal-500/20">
                Monitoring Active
              </span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Welcome back, {patient.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Age {patient.age} • {patient.gender} • {patient.diseases.join(', ') || 'No chronic illnesses logged'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              setActiveTab('risk-checker');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-mediteal-500 to-mediblue-600 hover:from-mediteal-400 hover:to-mediblue-500 text-slate-950 text-xs font-bold shadow-md transition"
          >
            <Pill className="w-4 h-4 text-slate-950" />
            <span>Check A Medicine</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('ocr');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition"
          >
            <Camera className="w-4 h-4 text-mediteal-400" />
            <span>Scan Prescription</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400 font-semibold">Latest Risk Score</span>
          <div className="text-3xl font-black text-white font-mono mt-1 flex items-baseline gap-2">
            <span>{currentAnalysis ? `${currentAnalysis.riskScore}%` : 'N/A'}</span>
            {currentAnalysis && <RiskBadge level={currentAnalysis.riskLevel} size="sm" />}
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">
            Last drug: {currentAnalysis?.medicineName || 'None'}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400 font-semibold">Active Medications</span>
          <div className="text-3xl font-black text-mediteal-400 font-mono mt-1">
            {patient.currentMedicines.length}
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">
            Under regular monitoring
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400 font-semibold">Known Allergies</span>
          <div className="text-3xl font-black text-amber-400 font-mono mt-1">
            {patient.allergies.length}
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">
            Protected against cross-reactivity
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400 font-semibold">Checks Conducted</span>
          <div className="text-3xl font-black text-sky-400 font-mono mt-1">
            {medicationHistory.length}
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">
            Archived in safety logs
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Current Active Evaluation
              </span>
              <h2 className="text-lg font-bold text-white">
                {currentAnalysis?.medicineName} ({currentAnalysis?.dosage})
              </h2>
            </div>
            <RiskBadge level={currentAnalysis?.riskLevel} score={currentAnalysis?.riskScore} size="md" />
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed">
            <strong className="text-mediteal-300 block mb-1">Explainable AI Safety Finding:</strong>
            {currentAnalysis?.plainEnglishExplanation}
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Key Contributing Factors:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {currentAnalysis?.shapFactors.slice(0, 4).map((f, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs flex items-center justify-between">
                  <span className="text-slate-300">{f.factor}</span>
                  <span className={`font-mono font-bold ${f.type === 'risk' ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {f.impact}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              onClick={() => {
                setActiveTab('risk-checker');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-1.5 text-xs font-bold text-mediteal-300 hover:text-white transition"
            >
              <span>View Full SHAP Breakdown & Alternatives</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                setActiveTab('report');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-200 transition"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <User className="w-4 h-4 text-mediteal-400" />
                Health Profile Summary
              </h3>
              <button
                onClick={() => setActiveTab('profile')}
                className="text-xs text-mediteal-400 hover:underline font-semibold"
              >
                Edit
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block font-semibold mb-1">Conditions:</span>
                <div className="flex flex-wrap gap-1">
                  {patient.diseases.map(d => (
                    <span key={d} className="px-2 py-0.5 rounded bg-rose-500/15 text-rose-300 text-[11px]">
                      {d}
                    </span>
                  ))}
                  {patient.diseases.length === 0 && <span className="text-slate-500">None logged</span>}
                </div>
              </div>

              <div>
                <span className="text-slate-400 block font-semibold mb-1">Allergies:</span>
                <div className="flex flex-wrap gap-1">
                  {patient.allergies.map(a => (
                    <span key={a} className="px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 text-[11px]">
                      {a}
                    </span>
                  ))}
                  {patient.allergies.length === 0 && <span className="text-emerald-400">None logged</span>}
                </div>
              </div>

              <div>
                <span className="text-slate-400 block font-semibold mb-1">Current Prescriptions:</span>
                <ul className="space-y-1">
                  {patient.currentMedicines.map((m, i) => (
                    <li key={i} className="text-slate-300 flex justify-between">
                      <span>• {m.name}</span>
                      <span className="text-slate-400 font-mono text-[10px]">{m.dosage}</span>
                    </li>
                  ))}
                  {patient.currentMedicines.length === 0 && <li className="text-slate-500 italic">None</li>}
                </ul>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-br from-mediteal-950/40 via-slate-900 to-mediblue-950/40 border border-mediteal-500/30 shadow-lg space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-mediteal-500/20 text-mediteal-400 border border-mediteal-500/30 shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">MediSafe AI Chatbot</h4>
                <p className="text-[11px] text-slate-300">Need plain-English medication guidance?</p>
              </div>
            </div>
            <button
              onClick={() => setIsChatbotOpen(true)}
              className="w-full py-2 px-3 rounded-xl bg-mediteal-500/20 hover:bg-mediteal-500/30 text-mediteal-300 font-bold text-xs border border-mediteal-500/40 transition"
            >
              Ask MediSafe AI Assistant →
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
