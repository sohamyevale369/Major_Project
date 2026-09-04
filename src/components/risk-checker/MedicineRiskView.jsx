import React, { useState } from 'react';
import {
  Pill,
  Search,
  Activity,
  AlertTriangle,
  AlertOctagon,
  ShieldAlert,
  ShieldCheck,
  RefreshCw,
  Sparkles,
  HeartPulse,
  User,
  Sliders,
  FileText,
  Printer
} from 'lucide-react';
import { useHealth } from '../../context/HealthContext';
import { COMMON_MEDICATIONS } from '../../data/drugDatabase';
import RiskGauge from './RiskGauge';
import SideEffectBars from './SideEffectBars';
import ExplainableAIView from './ExplainableAIView';
import SafeAlternatives from './SafeAlternatives';
import RiskBadge from '../common/RiskBadge';

export default function MedicineRiskView() {
  const {
    patient,
    currentAnalysis,
    runSafetyCheck,
    setActiveTab,
    showToast
  } = useHealth();

  const [selectedMedName, setSelectedMedName] = useState(currentAnalysis?.medicineName || 'Ibuprofen');
  const [dosage, setDosage] = useState(currentAnalysis?.dosage || '400mg');
  const [frequency, setFrequency] = useState(currentAnalysis?.frequency || 'Twice daily with meals');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const currentMedMeta = COMMON_MEDICATIONS.find(
    m => m.name.toLowerCase() === selectedMedName.toLowerCase() ||
         m.brandNames.some(b => b.toLowerCase() === selectedMedName.toLowerCase())
  );

  const handleSelectMedChip = (med) => {
    setSelectedMedName(med.name);
    setDosage(med.defaultDosage);
    setFrequency(med.defaultFrequency);
    executeAnalysis(med.name, med.defaultDosage, med.defaultFrequency);
  };

  const executeAnalysis = (medName, medDose, medFreq) => {
    setIsAnalyzing(true);
    setTimeout(() => {
      runSafetyCheck(medName, medDose, medFreq);
      setIsAnalyzing(false);
      showToast(`Analyzed ${medName} for ${patient.name}`, 'success');
    }, 450);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (selectedMedName.trim()) {
      executeAnalysis(selectedMedName.trim(), dosage, frequency);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Top Banner: Patient Context */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-mediteal-400 to-mediblue-500 text-slate-950 font-black flex items-center justify-center text-sm shrink-0">
            {patient.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Evaluating safety for:</span>
              <strong className="text-white text-sm">{patient.name}</strong>
              <span className="text-xs text-slate-400 font-mono">({patient.age}y, {patient.gender})</span>
            </div>
            <div className="text-xs text-slate-300 mt-0.5">
              Conditions: <strong className="text-mediteal-300">{patient.diseases.join(', ') || 'None'}</strong> • Allergies: <strong className="text-amber-300">{patient.allergies.join(', ') || 'None'}</strong>
            </div>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('profile')}
          className="text-xs text-mediteal-400 hover:text-mediteal-300 font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 transition flex items-center gap-1.5 w-fit"
        >
          <User className="w-3.5 h-3.5" />
          <span>Edit Patient Profile</span>
        </button>
      </div>

      {/* Main Section: Search & Input Form */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Pill className="w-6 h-6 text-mediteal-400" />
            Personalized Medicine Risk & Side Effect Checker
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Choose a medicine below or type any prescription to run the Explainable AI safety engine.
          </p>
        </div>

        {/* Quick Popular Drug Chips */}
        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
            Quick-Select Common Medications:
          </span>
          <div className="flex flex-wrap gap-2">
            {COMMON_MEDICATIONS.map((med) => {
              const isSelected = selectedMedName.toLowerCase() === med.name.toLowerCase();
              return (
                <button
                  key={med.id}
                  onClick={() => handleSelectMedChip(med)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-mediteal-500 text-slate-950 border border-mediteal-400 shadow-sm font-bold'
                      : 'bg-slate-950 text-slate-300 border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <Pill className="w-3.5 h-3.5" />
                  <span>{med.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Form */}
        <form onSubmit={handleFormSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
          <div className="sm:col-span-5">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Medicine Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={selectedMedName}
                onChange={(e) => setSelectedMedName(e.target.value)}
                placeholder="e.g. Ibuprofen, Paracetamol, Amoxicillin..."
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-mediteal-400 focus:outline-none"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Strength / Dosage
            </label>
            {currentMedMeta?.commonDosages ? (
              <select
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-mediteal-400 focus:outline-none"
              >
                {currentMedMeta.commonDosages.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                placeholder="e.g. 500mg"
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-mediteal-400 focus:outline-none"
              />
            )}
          </div>

          <div className="sm:col-span-4 flex items-end">
            <button
              type="submit"
              disabled={isAnalyzing}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-mediteal-500 to-mediblue-600 hover:from-mediteal-400 hover:to-mediblue-500 text-slate-950 font-bold text-sm shadow-lg shadow-mediteal-500/20 transition disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Computing AI Safety...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Analyze Medicine Safety</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* AI ANALYSIS RESULTS VIEW */}
      {currentAnalysis && (
        <div className="space-y-6 animate-fade-in">
          
          {/* 1. The Risk Score Gauge Card */}
          <RiskGauge
            score={currentAnalysis.riskScore}
            level={currentAnalysis.riskLevel}
            medicineName={currentAnalysis.medicineName}
          />

          {/* 2. Emergency Allergy Alert Banner */}
          {currentAnalysis.allergyAlert && (
            <div className="p-5 rounded-2xl bg-rose-950/40 border-2 border-rose-500/60 shadow-lg flex items-start gap-4">
              <div className="p-3 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40 shrink-0">
                <ShieldAlert className="w-6 h-6 animate-pulse" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-500/20 px-2 py-0.5 rounded">
                    Severe Allergy Warning
                  </span>
                  <span className="text-xs text-rose-300 font-bold">
                    Detected Trigger: {currentAnalysis.allergyAlert.detectedAllergy}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white">
                  Hypersensitivity Conflict Detected
                </h4>
                <p className="text-xs sm:text-sm text-rose-200 leading-relaxed">
                  {currentAnalysis.allergyAlert.warning}
                </p>
              </div>
            </div>
          )}

          {/* 3. Drug-Disease Conflicts Banner */}
          {currentAnalysis.diseaseConflicts.length > 0 && (
            <div className="p-5 rounded-2xl bg-amber-950/30 border border-amber-500/40 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Drug–Disease Contraindication Warnings ({currentAnalysis.diseaseConflicts.length})</span>
              </div>
              <div className="space-y-2">
                {currentAnalysis.diseaseConflicts.map((dc, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-slate-950/80 border border-amber-500/30 text-xs">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <strong className="text-white text-sm">{dc.disease}</strong>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {dc.severity} Contraindication
                      </span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      {dc.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. Drug–Drug Conflicts Banner */}
          {currentAnalysis.drugDrugConflicts.length > 0 && (
            <div className="p-5 rounded-2xl bg-rose-950/30 border border-rose-500/40 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <RefreshCw className="w-4 h-4 shrink-0" />
                <span>Drug–Drug Interaction Detected with Existing Prescriptions</span>
              </div>
              <div className="space-y-2">
                {currentAnalysis.drugDrugConflicts.map((ddc, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-slate-950/80 border border-rose-500/30 text-xs space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <strong className="text-white text-sm">
                        {currentAnalysis.medicineName} + {ddc.withDrug} ({ddc.currentDosage})
                      </strong>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        {ddc.severity} Interaction
                      </span>
                    </div>
                    <p className="text-slate-300 font-medium">{ddc.summary}</p>
                    <p className="text-slate-400">{ddc.mechanism}</p>
                    <div className="pt-1 text-[11px] text-amber-300 font-semibold">
                      Action Required: {ddc.action}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. Two-Column Grid: Side Effects & Explainable AI */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SideEffectBars
              sideEffects={currentAnalysis.sideEffects}
              patientAge={patient.age}
              medicineName={currentAnalysis.medicineName}
            />

            <ExplainableAIView
              shapFactors={currentAnalysis.shapFactors}
              riskLevel={currentAnalysis.riskLevel}
              plainEnglishExplanation={currentAnalysis.plainEnglishExplanation}
              medicineName={currentAnalysis.medicineName}
            />
          </div>

          {/* 6. Safe Alternative Recommendations */}
          <SafeAlternatives
            alternatives={currentAnalysis.alternatives}
            currentMedicine={currentAnalysis.medicineName}
            currentRiskScore={currentAnalysis.riskScore}
          />

          {/* Bottom Action Strip: Report & History */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-xs text-slate-400">
              Evaluated on {new Date().toLocaleDateString()} • Ready for clinical consultation
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setActiveTab('history');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
              >
                View Medication History
              </button>

              <button
                onClick={() => {
                  setActiveTab('report');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-mediteal-500/20 hover:bg-mediteal-500/30 text-mediteal-300 text-xs font-bold border border-mediteal-500/40 transition"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Export Safety Report</span>
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
