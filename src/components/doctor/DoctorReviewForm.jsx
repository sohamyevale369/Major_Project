import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertOctagon,
  Sliders,
  FileCheck,
  ShieldCheck,
  Stethoscope,
  Plus,
  X,
  Clock,
  Sparkles,
  ArrowRight,
  Info
} from 'lucide-react';
import RiskBadge from '../common/RiskBadge';

const PRECAUTION_PRESETS = [
  'Take with a full glass of water after meals',
  'Monitor serum creatinine / eGFR in 7 days',
  'Perform Liver Function Tests (LFT) within 2 weeks',
  'Discontinue immediately if skin rash or hives appear',
  'Avoid concurrent OTC NSAIDs (Ibuprofen / Naproxen)',
  'Monitor blood pressure daily each morning',
  'Report any unexplained muscle pain or dark urine immediately',
  'Drink at least 2.5 liters of fluids daily during therapy'
];

export default function DoctorReviewForm({
  patient,
  analysis,
  doctor,
  onFinalizeReview,
  existingReview
}) {
  const [decision, setDecision] = useState(existingReview?.decision || 'AGREE');
  const [doctorComments, setDoctorComments] = useState(
    existingReview?.doctorComments ||
      (analysis?.riskLevel === 'LOW'
        ? 'Patient exhibits no clinical contraindications or metabolic barriers to this prescription. Safe to administer as indicated.'
        : 'Carefully evaluated the AI contraindication warning. Patient will be managed under structured clinical precautions and scheduled follow-up.')
  );
  const [selectedPrecautions, setSelectedPrecautions] = useState(
    existingReview?.additionalPrecautions || [
      'Take with a full glass of water after meals',
      'Discontinue immediately if skin rash or hives appear'
    ]
  );
  const [customPrecaution, setCustomPrecaution] = useState('');
  const [recommendedAction, setRecommendedAction] = useState(
    existingReview?.recommendedAction ||
      (analysis?.riskLevel === 'HIGH' ? 'Adjust Dosage / Monitor Closely' : 'Approve Prescription as Prescribed')
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const togglePrecaution = (item) => {
    if (selectedPrecautions.includes(item)) {
      setSelectedPrecautions(selectedPrecautions.filter((p) => p !== item));
    } else {
      setSelectedPrecautions([...selectedPrecautions, item]);
    }
  };

  const handleAddCustomPrecaution = (e) => {
    if (e) e.preventDefault();
    const val = customPrecaution.trim();
    if (val && !selectedPrecautions.includes(val)) {
      setSelectedPrecautions([...selectedPrecautions, val]);
      setCustomPrecaution('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const reviewData = {
      patientId: patient.id,
      patientName: patient.name,
      patientEmail: patient.email,
      doctorId: doctor?.id || 'usr-doc-1',
      doctorName: doctor?.name || 'Dr. Rajesh Sharma, MD',
      doctorDepartment: doctor?.department || 'Internal Medicine & Pharmacology',
      doctorLicense: doctor?.licenseNumber || 'MD-98421',
      medicineName: analysis?.medicineName || 'Prescribed Medication',
      dosage: analysis?.dosage || 'Standard dose',
      frequency: analysis?.frequency || 'As directed',
      aiRiskScore: analysis?.riskScore ?? 15,
      aiRiskLevel: analysis?.riskLevel || 'LOW',
      decision,
      decisionLabel:
        decision === 'AGREE'
          ? 'Agreed with AI Risk Assessment'
          : decision === 'DISAGREE'
          ? 'Physician Override (Disagree with AI)'
          : 'Approved with Clinical Modifications',
      doctorComments: doctorComments.trim(),
      additionalPrecautions: selectedPrecautions,
      customPrecautions: customPrecaution.trim(),
      recommendedAction,
      reviewedAt: new Date().toISOString(),
      reviewDate: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      status: 'Finalized & Clinically Signed'
    };

    setTimeout(() => {
      onFinalizeReview(reviewData);
      setIsSubmitting(false);
    }, 450);
  };

  return (
    <form onSubmit={handleSubmit} className="ivory-card p-6 sm:p-8 space-y-7 shadow-sm text-left">
      {/* Form Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E5DFD1]">
        <div>
          <span className="section-tag mb-0.5">ATTENDING PHYSICIAN REVIEW</span>
          <h2 className="text-xl sm:text-2xl font-black text-[#18231C] tracking-tight uppercase">
            Clinical Decision & Doctor’s Opinion
          </h2>
          <p className="text-xs text-[#5A645D]">
            Review AI computational findings for <strong>{patient?.name}</strong>, record your clinical judgment, and finalize the patient dossier.
          </p>
        </div>

        <div className="flex items-center gap-2.5 p-2 rounded-2xl bg-[#F6F4ED] border border-[#D5CDBF] text-xs shrink-0">
          <div className="w-9 h-9 rounded-xl bg-[#235339] text-white flex items-center justify-center font-bold">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-[#18231C] text-[11px] leading-tight">
              {doctor?.name || 'Dr. Rajesh Sharma, MD'}
            </div>
            <div className="text-[10px] text-[#6A746C] font-mono leading-tight">
              Lic #{doctor?.licenseNumber || 'MD-98421'} • {doctor?.department || 'Internal Medicine'}
            </div>
          </div>
        </div>
      </div>

      {/* Evaluated Prescription & AI Score Summary Strip */}
      <div className="p-4 rounded-2xl bg-[#E2EFE7] border border-[#235339]/20 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-mono uppercase font-bold text-[#235339] tracking-wider block">
            EVALUATING PRESCRIPTION:
          </span>
          <div className="text-base font-black text-[#18231C] mt-0.5">
            {analysis?.medicineName} ({analysis?.dosage}) — {analysis?.frequency}
          </div>
          <div className="text-xs text-[#37423B] mt-0.5">
            Patient: <strong className="text-[#18231C]">{patient?.name}</strong> ({patient?.age}y, {patient?.gender})
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-[#6A746C] font-mono block">AI Safety Score</span>
            <span className="text-2xl font-black text-[#18231C] font-mono">
              {analysis?.riskScore}%
            </span>
          </div>
          <RiskBadge level={analysis?.riskLevel || 'LOW'} score={analysis?.riskScore || 15} size="md" />
        </div>
      </div>

      {/* 1. Doctor Opinion & Agreement Selector */}
      <div className="space-y-2.5">
        <label className="block text-xs font-bold text-[#18231C] uppercase tracking-wider font-mono">
          Step 1: Clinical Opinion on AI Assessment <span className="text-rose-600">*</span>
        </label>
        <p className="text-xs text-[#6F7771]">
          Do you agree with the predicted risks, or does clinical judgment suggest a modification or override?
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {/* Option A: Agree */}
          <button
            type="button"
            onClick={() => setDecision('AGREE')}
            className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between space-y-2 ${
              decision === 'AGREE'
                ? 'bg-[#EAF3ED] border-[#235339] ring-2 ring-[#235339]/30 text-[#18231C] shadow-xs'
                : 'bg-white hover:bg-[#FBF9F5] border-[#D5CDBF] text-[#424C44]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-[#235339] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#235339]" />
                Agree with AI
              </span>
              <span className="text-[10px] font-mono font-bold bg-[#D4E8DC] px-2 py-0.5 rounded-full text-[#1E5034]">
                Concur
              </span>
            </div>
            <p className="text-[11px] text-[#5A645D] leading-relaxed">
              I agree with the AI safety score and flagged side effects based on patient condition.
            </p>
          </button>

          {/* Option B: Disagree / Override */}
          <button
            type="button"
            onClick={() => setDecision('DISAGREE')}
            className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between space-y-2 ${
              decision === 'DISAGREE'
                ? 'bg-rose-50 border-rose-500 ring-2 ring-rose-500/20 text-[#18231C] shadow-xs'
                : 'bg-white hover:bg-[#FBF9F5] border-[#D5CDBF] text-[#424C44]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-rose-700 flex items-center gap-1.5">
                <AlertOctagon className="w-4 h-4 text-rose-600" />
                Disagree / Override
              </span>
              <span className="text-[10px] font-mono font-bold bg-rose-100 px-2 py-0.5 rounded-full text-rose-800">
                Override
              </span>
            </div>
            <p className="text-[11px] text-[#5A645D] leading-relaxed">
              Clinical benefit outweighs flagged risks, or patient has documented prior tolerance.
            </p>
          </button>

          {/* Option C: Modified Approval */}
          <button
            type="button"
            onClick={() => setDecision('MODIFIED')}
            className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between space-y-2 ${
              decision === 'MODIFIED'
                ? 'bg-sky-50 border-sky-500 ring-2 ring-sky-500/20 text-[#18231C] shadow-xs'
                : 'bg-white hover:bg-[#FBF9F5] border-[#D5CDBF] text-[#424C44]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-sky-800 flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-sky-600" />
                Approved with Modifications
              </span>
              <span className="text-[10px] font-mono font-bold bg-sky-100 px-2 py-0.5 rounded-full text-sky-800">
                Adjusted
              </span>
            </div>
            <p className="text-[11px] text-[#5A645D] leading-relaxed">
              Approved subject to dose adjustment, lab monitoring, or shorter therapy course.
            </p>
          </button>
        </div>
      </div>

      {/* 2. Doctor Clinical Comments */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-[#18231C] uppercase tracking-wider font-mono">
            Step 2: Doctor Clinical Comments & Observations <span className="text-rose-600">*</span>
          </label>
          <span className="text-[11px] text-[#6F7771]">Included in patient's official report</span>
        </div>
        <textarea
          rows={3}
          required
          value={doctorComments}
          onChange={(e) => setDoctorComments(e.target.value)}
          placeholder="Enter your physician opinion, rationale, examination findings, or reasoning for override..."
          className="ivory-input w-full p-3.5 text-xs leading-relaxed"
        />

        {/* Quick Suggestion Chips for Comments */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[10px] uppercase font-bold text-[#8C938D] font-mono">Insert Rationale:</span>
          {[
            'Patient has documented prior tolerance',
            'Renal panel within acceptable limits',
            'Take with food to minimize gastric stress',
            'Dose reduced by 50% for geriatric safety',
            'Substitute recommended due to allergy'
          ].map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => setDoctorComments((prev) => (prev ? `${prev} ${chip}.` : `${chip}.`))}
              className="px-2.5 py-0.5 rounded-full bg-[#ECE7DC] hover:bg-[#D4E8DC] text-[#424C44] text-[11px] transition"
            >
              + {chip}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Additional Precautions & Instructions */}
      <div className="space-y-3">
        <label className="block text-xs font-bold text-[#18231C] uppercase tracking-wider font-mono">
          Step 3: Additional Precautions & Monitoring Instructions
        </label>
        <p className="text-xs text-[#6F7771]">
          Select mandatory clinical precautions to attach to the patient's verified prescription report:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {PRECAUTION_PRESETS.map((item) => {
            const isChecked = selectedPrecautions.includes(item);
            return (
              <button
                key={item}
                type="button"
                onClick={() => togglePrecaution(item)}
                className={`p-2.5 rounded-xl border text-xs text-left transition flex items-start gap-2 ${
                  isChecked
                    ? 'bg-[#EAF3ED] border-[#235339] text-[#1E5034] font-semibold'
                    : 'bg-white hover:bg-[#FBF9F5] border-[#D5CDBF] text-[#424C44]'
                }`}
              >
                <span className={`w-4 h-4 rounded flex items-center justify-center text-[10px] shrink-0 mt-0.5 ${
                  isChecked ? 'bg-[#235339] text-white' : 'border border-[#8D8678]'
                }`}>
                  {isChecked ? '✓' : ''}
                </span>
                <span>{item}</span>
              </button>
            );
          })}
        </div>

        {/* Add Custom Precaution */}
        <div className="flex items-center gap-2 pt-1">
          <input
            type="text"
            value={customPrecaution}
            onChange={(e) => setCustomPrecaution(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddCustomPrecaution();
              }
            }}
            placeholder="Type custom clinical precaution or instruction..."
            className="ivory-input flex-1 px-3 py-2 text-xs"
          />
          <button
            type="button"
            onClick={handleAddCustomPrecaution}
            className="pill-btn-secondary text-xs py-2 px-3 flex items-center gap-1 shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Precaution</span>
          </button>
        </div>
      </div>

      {/* 4. Action Recommendation */}
      <div className="space-y-2 pt-1 border-t border-[#ECE7DC]">
        <label className="block text-xs font-bold text-[#18231C] uppercase tracking-wider font-mono">
          Step 4: Final Prescribing Action
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <select
              value={recommendedAction}
              onChange={(e) => setRecommendedAction(e.target.value)}
              className="ivory-input w-full px-3 py-2.5 text-xs font-bold"
            >
              <option value="Approve Prescription as Prescribed">Approve Prescription as Prescribed</option>
              <option value="Switch to Suggested Safer Alternative">Switch to Suggested Safer Alternative</option>
              <option value="Adjust Dosage / Monitor Closely">Adjust Dosage / Monitor Closely</option>
              <option value="Withhold Medication Pending Further Labs">Withhold Medication Pending Further Labs</option>
            </select>
          </div>

          <div className="p-2.5 rounded-xl bg-[#F6F4ED] border border-[#D5CDBF] text-[11px] text-[#5A645D] flex items-center gap-2">
            <Info className="w-4 h-4 text-[#235339] shrink-0" />
            <span>This directive will be recorded in the patient’s permanent health chart.</span>
          </div>
        </div>
      </div>

      {/* 5. Electronic Signature Stamp & Submission */}
      <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#D5CDBF] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#235339]" />
            <span className="font-bold text-[#18231C]">Electronic Attending Signature Stamp:</span>
          </div>
          <span className="text-[10px] font-mono text-[#6A746C]">
            Verified Medical License: <strong>{doctor?.licenseNumber || 'MD-98421'}</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
          <div className="p-2.5 rounded-xl bg-white border border-[#E5DFD1]">
            <span className="text-[10px] text-[#8C938D] block uppercase">Physician</span>
            <span className="font-bold text-[#18231C] truncate block">{doctor?.name || 'Dr. Rajesh Sharma, MD'}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white border border-[#E5DFD1]">
            <span className="text-[10px] text-[#8C938D] block uppercase">Department</span>
            <span className="font-bold text-[#18231C] truncate block">{doctor?.department || 'Internal Medicine'}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white border border-[#E5DFD1]">
            <span className="text-[10px] text-[#8C938D] block uppercase">Verification Date</span>
            <span className="font-bold text-[#235339] block">
              {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !doctorComments.trim()}
          className="pill-btn-primary w-full py-3.5 text-xs sm:text-sm font-bold shadow-md flex items-center justify-center gap-2 mt-2 disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Finalizing & Digitally Signing Report…</span>
            </>
          ) : (
            <>
              <FileCheck className="w-4 h-4" />
              <span>Finalize & Include Doctor Review in Patient Report →</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
