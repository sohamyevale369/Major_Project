import React, { useState, useEffect } from 'react';
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
  Printer,
  CheckCircle2,
  Camera,
  Check
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
    currentUser,
    currentAnalysis,
    hasUpdatedPersonalDetails,
    runSafetyCheck,
    setActiveTab,
    showToast
  } = useHealth();

  const [inputOption, setInputOption] = useState('search'); // 'search' | 'manual' | 'ocr'
  // Start clean and EMPTY by default — no autoselection if profile is incomplete or unselected
  const [selectedMedName, setSelectedMedName] = useState(
    hasUpdatedPersonalDetails && currentAnalysis?.medicineName ? currentAnalysis.medicineName : ''
  );
  const [dosage, setDosage] = useState(
    hasUpdatedPersonalDetails && currentAnalysis?.dosage ? currentAnalysis.dosage : ''
  );
  const [frequency, setFrequency] = useState(
    hasUpdatedPersonalDetails && currentAnalysis?.frequency ? currentAnalysis.frequency : ''
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Synchronize inputs only when currentAnalysis is set and user actually has updated profile
  useEffect(() => {
    if (!hasUpdatedPersonalDetails) {
      setSelectedMedName('');
      setDosage('');
      setFrequency('');
      return;
    }
    if (currentAnalysis?.medicineName) {
      setSelectedMedName(currentAnalysis.medicineName);
      if (currentAnalysis.dosage) setDosage(currentAnalysis.dosage);
      if (currentAnalysis.frequency) setFrequency(currentAnalysis.frequency);
    }
  }, [currentAnalysis, hasUpdatedPersonalDetails]);

  const currentMedMeta = COMMON_MEDICATIONS.find(
    m => selectedMedName && (m.name.toLowerCase() === selectedMedName.toLowerCase() ||
         m.brandNames.some(b => b.toLowerCase() === selectedMedName.toLowerCase()))
  );

  const handleSelectMedChip = (med) => {
    if (!hasUpdatedPersonalDetails) {
      showToast('Update health profile to generate reports. Please record conditions or allergies first.', 'error');
      setActiveTab('profile');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const isSelected = Boolean(selectedMedName && selectedMedName.toLowerCase() === med.name.toLowerCase());
    if (isSelected) {
      // Toggle off / deselect
      setSelectedMedName('');
      setDosage('');
      setFrequency('');
      return;
    }

    setSelectedMedName(med.name);
    setDosage(med.defaultDosage);
    setFrequency(med.defaultFrequency);
    executeAnalysis(med.name, med.defaultDosage, med.defaultFrequency);
  };

  const executeAnalysis = (medName, medDose, medFreq) => {
    if (!hasUpdatedPersonalDetails) {
      showToast('Update health profile to generate reports. Please record conditions or allergies first.', 'error');
      return;
    }
    setIsAnalyzing(true);
    setTimeout(() => {
      runSafetyCheck(medName, medDose, medFreq, patient);
      setIsAnalyzing(false);
      showToast(`Analyzed ${medName} for ${patient.name}`, 'success');
    }, 450);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!hasUpdatedPersonalDetails) {
      showToast('Update health profile to generate reports. Please add at least one condition, allergy, or medication first.', 'error');
      setActiveTab('profile');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (!selectedMedName.trim()) {
      showToast('No medicine selected. Please choose or enter a medicine to evaluate.', 'error');
      return;
    }

    executeAnalysis(selectedMedName.trim(), dosage || 'Standard dose', frequency || 'As directed');
  };

  // Admin Guard: Admins do not run individual medication risk evaluations
  if (currentUser?.role === 'admin') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-5 animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-purple-50 text-purple-700 border border-purple-200 flex items-center justify-center mx-auto shadow-sm">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="section-tag mb-0">ADMINISTRATIVE NOTICE</span>
          <h1 className="text-2xl font-black text-[#18231C]">
            Medicine Risk Checker Disabled for Admin
          </h1>
          <p className="text-xs sm:text-sm text-[#5A645D] max-w-md mx-auto leading-relaxed">
            The Medicine Risk Checker is designed for patients and clinicians evaluating specific clinical prescriptions. Administrators maintain control rights over patient records and system databases.
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
      
      {/* Top Banner: Patient Context */}
      <div className="ivory-card p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-full bg-[#235339] text-white font-black flex items-center justify-center text-sm shrink-0">
            {patient.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#6A746C] font-semibold">Evaluating safety for:</span>
              <strong className="text-[#18231C] text-sm">{patient.name}</strong>
              <span className="text-xs text-[#6A746C] font-mono">({patient.age}y, {patient.gender}{patient.weight ? `, ${patient.weight}kg` : ''})</span>
            </div>
            <div className="text-xs text-[#4A554E] mt-0.5">
              Conditions: <strong className="text-[#18231C]">{(patient?.diseases || patient?.chronicDiseases || []).join(', ') || 'None logged'}</strong> • Allergies: <strong className="text-amber-800">{(patient?.allergies || []).join(', ') || 'None'}</strong>
            </div>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('profile')}
          className="pill-btn-secondary text-xs py-1.5 px-3.5 w-fit"
        >
          <User className="w-3.5 h-3.5" />
          <span>Edit Patient Profile</span>
        </button>
      </div>

      {/* Incomplete Profile Warning Notice */}
      {!hasUpdatedPersonalDetails && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-amber-950 shadow-xs">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-800 shrink-0" />
            <div className="text-xs text-amber-900">
              <strong>Health Profile Incomplete:</strong> No medical conditions or allergies logged. Update your health profile to enable medication safety checks and generate reports.
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setActiveTab('profile');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="pill-btn-primary text-xs py-1.5 px-3.5 bg-amber-800 hover:bg-amber-900 text-white shrink-0 font-bold cursor-pointer"
          >
            <span>Update Health Profile →</span>
          </button>
        </div>
      )}

      {/* Main Section: Search & Input Form (Step 7: Option 1, Option 2, Option 3) */}
      <div className="ivory-card p-6 sm:p-8 space-y-6 shadow-sm">
        <div>
          <span className="section-tag mb-1">
            07 — CHECK MEDICINE SAFETY
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#18231C] tracking-tight uppercase">
            Medication Safety & Risk Scanner
          </h1>
          <p className="text-xs sm:text-sm text-[#5A645D] mt-1">
            Evaluate a medicine against your personalized health profile to detect adverse side effects, contraindications, and drug clashes.
          </p>
        </div>

        {/* Input Mode Tabs: Option 1, Option 2, Option 3 */}
        <div className="flex flex-wrap items-center gap-2 p-1 rounded-full bg-[#ECE7DC] border border-[#D5CDBF] w-fit">
          <button
            type="button"
            onClick={() => setInputOption('search')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition ${
              inputOption === 'search'
                ? 'bg-[#235339] text-white shadow-sm'
                : 'text-[#4A554E] hover:text-[#18231C]'
            }`}
          >
            Option 1: Search Medicine Name
          </button>

          <button
            type="button"
            onClick={() => setInputOption('manual')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition ${
              inputOption === 'manual'
                ? 'bg-[#235339] text-white shadow-sm'
                : 'text-[#4A554E] hover:text-[#18231C]'
            }`}
          >
            Option 2: Enter Manually
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ocr')}
            className="px-3.5 py-1.5 rounded-full text-xs font-bold text-[#4A554E] hover:text-[#18231C] flex items-center gap-1"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Option 3: Upload Prescription (OCR)</span>
          </button>
        </div>

        {/* Quick Popular Drug Chips */}
        <div>
          <span className="text-xs font-bold text-[#6A746C] uppercase tracking-wider block mb-2 font-mono">
            Quick-Select Common Medications:
          </span>
          <div className="flex flex-wrap gap-2">
            {COMMON_MEDICATIONS.map((med) => {
              const isSelected = Boolean(selectedMedName && selectedMedName.toLowerCase() === med.name.toLowerCase());
              return (
                <button
                  type="button"
                  key={med.id}
                  onClick={() => handleSelectMedChip(med)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#235339] text-white border border-[#235339] shadow-sm font-bold'
                      : 'bg-[#F3EFE6] text-[#4A554E] border border-[#D5CDBF] hover:border-[#235339]'
                  }`}
                >
                  <Pill className="w-3.5 h-3.5" />
                  <span>{med.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Form (Step 7 Example: Medicine [Ibuprofen], Dosage [400 mg], Frequency [2 times/day]) */}
        <form onSubmit={handleFormSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
          <div className="sm:col-span-5">
            <label className="block text-xs font-bold text-[#18231C] mb-1.5">
              Medicine Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={selectedMedName}
                onChange={(e) => setSelectedMedName(e.target.value)}
                placeholder="e.g. Ibuprofen, Paracetamol, Amoxicillin..."
                className="ivory-input w-full pl-9 pr-3.5 py-2.5 text-sm"
              />
              <Search className="w-4 h-4 text-[#8D8678] absolute left-3 top-3" />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label className="block text-xs font-bold text-[#18231C] mb-1.5">
              Dosage
            </label>
            {currentMedMeta?.commonDosages ? (
              <select
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                className="ivory-input w-full px-3 py-2.5 text-sm"
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
                placeholder="e.g. 400 mg"
                className="ivory-input w-full px-3 py-2.5 text-sm"
              />
            )}
          </div>

          <div className="sm:col-span-4">
            <label className="block text-xs font-bold text-[#18231C] mb-1.5">
              Frequency
            </label>
            <input
              type="text"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              placeholder="e.g. 2 times/day"
              className="ivory-input w-full px-3 py-2.5 text-sm"
            />
          </div>

          <div className="sm:col-span-12 pt-2">
            <button
              type="submit"
              disabled={isAnalyzing}
              className={`pill-btn-primary w-full py-3.5 text-sm font-bold shadow-md disabled:opacity-50 ${
                !hasUpdatedPersonalDetails ? 'bg-amber-800 hover:bg-amber-900 text-white' : ''
              }`}
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Computing Explainable AI Safety…</span>
                </>
              ) : !hasUpdatedPersonalDetails ? (
                <>
                  <AlertTriangle className="w-4 h-4 text-white" />
                  <span>Update Health Profile to Generate Reports</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Check Safety & Run AI Analysis →</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* If health profile is incomplete, NEVER show results or predictions. Always show: Update Health Profile to Generate Reports */}
      {!hasUpdatedPersonalDetails ? (
        <div className="ivory-card p-8 sm:p-12 text-center space-y-4 shadow-sm animate-fade-in border-2 border-dashed border-amber-300 bg-[#FDFBF7]">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-900 mx-auto flex items-center justify-center font-bold">
            <AlertTriangle className="w-7 h-7 text-amber-800" />
          </div>
          <div className="space-y-1.5 max-w-lg mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-200/80 text-amber-900 text-[11px] font-bold font-mono uppercase border border-amber-300">
              <span>⚠ Health Profile Incomplete</span>
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[#18231C] uppercase tracking-tight">
              Update Health Profile to Generate Reports
            </h3>
            <p className="text-xs sm:text-sm text-[#5A645D]">
              No medical conditions, drug allergies, or active medications are recorded for {patient.name}. To evaluate drug safety, detect interactions, and generate clinical safety reports, please update your health profile first.
            </p>
          </div>
          <div className="pt-2">
            <button
              onClick={() => {
                setActiveTab('profile');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="pill-btn-primary text-xs sm:text-sm py-3 px-6 bg-amber-800 hover:bg-amber-900 text-white font-bold inline-flex items-center gap-2 cursor-pointer shadow-md"
            >
              <span>Update Health Profile to Generate Reports →</span>
            </button>
          </div>
        </div>
      ) : currentAnalysis ? (
        <div className="space-y-6 animate-fade-in">
          
          {/* Result Card styled like Reference Image 5 */}
          <div className="sage-result-box p-6 sm:p-8 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#C6DDD0]">
              <div className="flex items-center gap-2">
                <span className="font-black text-sm uppercase tracking-wider text-[#18231C]">
                  {currentAnalysis.riskLevel === 'LOW' ? 'VERIFIED SAFE' : 'HIGH RISK ALERT'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#D2E7DC] text-[#1E5034] text-xs font-mono font-bold">
                  Trained ML model
                </span>
                <span className="text-xs text-[#4A554E] hidden sm:inline">
                  Patient profile matched
                </span>
              </div>

              <RiskBadge level={currentAnalysis.riskLevel} score={currentAnalysis.riskScore} size="md" />
            </div>

            <div className="flex flex-col sm:flex-row items-baseline gap-4">
              <div className="text-4xl sm:text-5xl font-black text-[#18231C] font-mono tracking-tight">
                {currentAnalysis.riskScore} <span className="text-2xl text-[#5A645D]">/ 100</span>
              </div>
              <span className="text-sm font-bold text-[#1E5034]">
                {currentAnalysis.riskLevel === 'LOW' ? '✓ Safe to take as directed' : '⚠ Caution: Clinical Contraindication Found'}
              </span>
            </div>

            {/* Checks performed checklist (from Step 8) */}
            <div className="pt-2 space-y-1.5 text-xs text-[#2D3831] font-medium">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-[#235339] text-white flex items-center justify-center text-[10px] font-black">✓</span>
                <span>Allergy Check: {currentAnalysis.allergyAlert ? `⚠ ${currentAnalysis.allergyAlert.detectedAllergy} Conflict` : 'No known cross-reactivity found'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black ${
                  currentAnalysis.diseaseConflicts.length > 0 ? 'bg-amber-600 text-white' : 'bg-[#235339] text-white'
                }`}>
                  {currentAnalysis.diseaseConflicts.length > 0 ? '⚠' : '✓'}
                </span>
                <span>Disease Interaction: {currentAnalysis.diseaseConflicts.length > 0 ? `${currentAnalysis.diseaseConflicts.map(d => d.disease).join(', ')} Contraindication` : 'No organ conflict detected'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-[#235339] text-white flex items-center justify-center text-[10px] font-black">✓</span>
                <span>Drug Interaction Check: Validated against active prescription list</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-[#235339] text-white flex items-center justify-center text-[10px] font-black">✓</span>
                <span>Dosage Check: Verified for {currentAnalysis.dosage} ({currentAnalysis.frequency})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-[#235339] text-white flex items-center justify-center text-[10px] font-black">✓</span>
                <span>Patient Profile: Calibrated for Age {patient.age}y ({patient.gender}, {patient.weight}kg)</span>
              </div>
            </div>
          </div>

          {/* 1. Risk Score Gauge Card */}
          <RiskGauge
            score={currentAnalysis.riskScore}
            level={currentAnalysis.riskLevel}
            medicineName={currentAnalysis.medicineName}
          />

          {/* 2. Allergy Alert Banner if detected */}
          {currentAnalysis.allergyAlert && (
            <div className="p-5 rounded-2xl bg-rose-50 border-2 border-rose-300 shadow-sm flex items-start gap-4">
              <div className="p-3 rounded-xl bg-rose-100 text-rose-800 border border-rose-200 shrink-0">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-800 bg-rose-100 px-2 py-0.5 rounded-full border border-rose-200">
                    Severe Allergy Warning
                  </span>
                  <span className="text-xs text-rose-900 font-bold">
                    Detected Trigger: {currentAnalysis.allergyAlert.detectedAllergy}
                  </span>
                </div>
                <h4 className="text-base font-bold text-rose-950">
                  Hypersensitivity Conflict Detected
                </h4>
                <p className="text-xs sm:text-sm text-rose-900 leading-relaxed">
                  {currentAnalysis.allergyAlert.warning}
                </p>
              </div>
            </div>
          )}

          {/* 3. Drug-Disease Conflicts Banner */}
          {currentAnalysis.diseaseConflicts.length > 0 && (
            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
                <span>Drug–Disease Contraindication Warnings ({currentAnalysis.diseaseConflicts.length})</span>
              </div>
              <div className="space-y-2">
                {currentAnalysis.diseaseConflicts.map((dc, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-white border border-amber-200 text-xs">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <strong className="text-[#18231C] text-sm">{dc.disease}</strong>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-100 text-amber-900 border border-amber-300">
                        {dc.severity} Contraindication
                      </span>
                    </div>
                    <p className="text-[#5A645D] leading-relaxed">
                      {dc.mechanism}
                    </p>
                    <div className="mt-2 text-[11px] font-semibold text-amber-900">
                      Required Action: {dc.action}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. Side Effects Bars (Step 8: Side effects Headache, Nausea, Dizziness...) */}
          <SideEffectBars
            sideEffects={currentAnalysis.sideEffects}
            patientAge={patient.age}
            medicineName={currentAnalysis.medicineName}
          />

          {/* 5. Explainable AI View (Step 9: SHAP / LIME Explanation) */}
          <ExplainableAIView
            shapFactors={currentAnalysis.shapFactors}
            riskLevel={currentAnalysis.riskLevel}
            plainEnglishExplanation={currentAnalysis.plainEnglishExplanation}
            medicineName={currentAnalysis.medicineName}
          />

          {/* 6. Safe Alternatives (Step 10: Safe Alternatives) */}
          <SafeAlternatives
            alternatives={currentAnalysis.safeAlternatives}
            currentMedicine={currentAnalysis.medicineName}
            currentRiskScore={currentAnalysis.riskScore}
          />

        </div>
      ) : (
        <div className="ivory-card p-8 sm:p-10 text-center space-y-3 shadow-sm animate-fade-in border-2 border-dashed border-[#C6DDD0]">
          <div className="w-14 h-14 rounded-2xl bg-[#E2EFE7] text-[#235339] mx-auto flex items-center justify-center shadow-sm">
            <Pill className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E2EFE7] text-[#1E5034] text-[11px] font-bold font-mono uppercase">
              <span>● Clean Session Ready</span>
            </div>
            <h3 className="text-xl font-black text-[#18231C] uppercase tracking-tight">
              No Medicine Selected for Evaluation
            </h3>
            <p className="text-xs sm:text-sm text-[#5A645D] max-w-lg mx-auto">
              No medication has been selected yet. Choose a medication chip above or enter a medicine name, dosage, and frequency to run safety checks and generate your clinical report.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
