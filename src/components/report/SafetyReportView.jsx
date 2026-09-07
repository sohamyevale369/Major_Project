import React from 'react';
import { Printer, Shield, FileText, CheckCircle, AlertTriangle, Download, ArrowLeft } from 'lucide-react';
import { useHealth } from '../../context/HealthContext';
import RiskBadge from '../common/RiskBadge';

export default function SafetyReportView() {
  const { patient, currentAnalysis, setActiveTab } = useHealth();

  const handlePrint = () => {
    window.print();
  };

  const reportId = `MSR-${Math.floor(100000 + Math.random() * 900000)}`;
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      
      {/* Action Bar */}
      <div className="flex items-center justify-between print:hidden">
        <button
          onClick={() => setActiveTab('risk-checker')}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#D5CDBF] bg-white hover:bg-[#F3EFE6] text-xs font-bold text-[#18231C] transition shadow-xs"
        >
          <ArrowLeft className="w-4 h-4 text-[#235339]" />
          <span>Back to Risk Checker</span>
        </button>

        <button
          onClick={handlePrint}
          className="pill-btn-primary flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#235339] text-white hover:bg-[#1B432E] font-bold text-xs shadow-md transition"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save as Clinical PDF</span>
        </button>
      </div>

      {/* Printable Clinical Document */}
      {!currentAnalysis ? (
        <div className="p-12 text-center rounded-3xl bg-white text-[#18231C] border border-[#E5DFD1] shadow-xl space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-[#E2EFE7] text-[#235339] mx-auto flex items-center justify-center">
            <FileText className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-black uppercase text-[#18231C]">
              No Active Evaluation Available
            </h3>
            <p className="text-xs text-[#5A645D] max-w-md mx-auto">
              You have not evaluated any medicine in this session yet for {patient.name}. Check a medicine in the Risk Scanner to generate this official clinical safety dossier.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('risk-checker')}
            className="pill-btn-primary text-xs py-2.5 px-5 mx-auto cursor-pointer"
          >
            <span>Go to Risk Checker →</span>
          </button>
        </div>
      ) : (
        <div className="p-8 sm:p-12 rounded-3xl bg-white text-[#18231C] border border-[#E5DFD1] shadow-xl space-y-8 print:border-none print:shadow-none print:p-0">
        
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-[#18231C]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#235339] text-[#F5F2EA] flex items-center justify-center font-black text-xl shadow-xs">
              +
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#235339] font-bold">
                  OFFICIAL MEDICAL DOSSIER
                </span>
              </div>
              <h1 className="text-2xl font-black tracking-tight text-[#18231C]">
                MediSafe AI • Clinical Safety Report
              </h1>
              <p className="text-xs text-[#6F7771] font-medium">
                Explainable Medicine Risk Assessment & Alternative Analysis
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right text-xs space-y-1 font-mono text-[#4F5752]">
            <div><strong className="text-[#18231C]">Report ID:</strong> <span>{reportId}</span></div>
            <div><strong className="text-[#18231C]">Generated:</strong> {currentDate}</div>
            <div><strong className="text-[#18231C]">Engine:</strong> MediSafe v2.0 (SHAP + XGBoost)</div>
          </div>
        </div>

        {/* Patient Profile Card */}
        <div className="p-5 rounded-2xl bg-[#F6F4ED] border border-[#E5DFD1] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-[#6F7771] block uppercase tracking-wider text-[10px] font-mono font-bold">
              Patient Name
            </span>
            <strong className="text-[#18231C] text-sm font-black">{patient.name}</strong>
          </div>
          <div>
            <span className="text-[#6F7771] block uppercase tracking-wider text-[10px] font-mono font-bold">
              Age & Gender
            </span>
            <strong className="text-[#18231C] text-sm font-black">{patient.age} yrs • {patient.gender}</strong>
          </div>
          <div>
            <span className="text-[#6F7771] block uppercase tracking-wider text-[10px] font-mono font-bold">
              Patient Weight
            </span>
            <strong className="text-[#18231C] text-sm font-black">{patient.weight} kg</strong>
          </div>
          <div>
            <span className="text-[#6F7771] block uppercase tracking-wider text-[10px] font-mono font-bold">
              Known Allergies
            </span>
            <strong className="text-rose-700 text-sm font-black">
              {patient.allergies.length > 0 ? patient.allergies.join(', ') : 'None Reported'}
            </strong>
          </div>
        </div>

        {/* Chronic Conditions */}
        <div className="p-4 rounded-2xl bg-[#FBF9F5] border border-[#E5DFD1] text-xs space-y-1">
          <strong className="text-[#6F7771] block uppercase tracking-wider text-[10px] font-mono font-bold">
            Diagnosed Chronic Conditions:
          </strong>
          <p className="text-[#18231C] font-semibold">
            {patient.diseases.length > 0 ? patient.diseases.join('; ') : 'None documented in active profile.'}
          </p>
        </div>

        {/* Medication Evaluated Banner */}
        <div className="p-6 rounded-2xl bg-[#E2EFE7] border border-[#235339]/20 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#235339] font-mono">
                MEDICATION EVALUATED
              </span>
              <h2 className="text-xl font-black text-[#18231C] mt-0.5">
                {currentAnalysis.medicineName} ({currentAnalysis.dosage})
              </h2>
              <span className="text-xs text-[#4F5752] font-semibold">
                Prescribed Intake: {currentAnalysis.frequency}
              </span>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#235339] font-mono block">
                CALCULATED SAFETY SCORE
              </span>
              <span className="text-3xl font-black font-mono text-[#18231C]">
                {currentAnalysis.riskScore}%
              </span>
              <span className={`block text-xs font-black uppercase tracking-wider mt-0.5 ${
                currentAnalysis.riskLevel === 'HIGH' ? 'text-rose-700' : 'text-[#235339]'
              }`}>
                {currentAnalysis.riskLevel === 'HIGH' ? '⚠ HIGH RISK CONTRAINDICATION' : '✓ LOW RISK PROFILE'}
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-[#235339]/20 text-xs text-[#235339] font-medium leading-relaxed">
            <strong className="font-bold text-[#18231C]">Clinical Synthesis:</strong> {currentAnalysis.plainEnglishExplanation}
          </div>
        </div>

        {/* Explainable AI / SHAP Table */}
        <div className="space-y-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="section-tag">SHAP EXPLAINABILITY</span>
            <h3 className="text-xs font-black uppercase tracking-wider text-[#18231C]">
              Explainable AI Factor Attribution
            </h3>
          </div>

          <div className="rounded-2xl border border-[#E5DFD1] overflow-hidden">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-[#F6F4ED] border-b border-[#E5DFD1] text-[#18231C] text-[11px]">
                  <th className="p-3 font-black">Health Factor</th>
                  <th className="p-3 font-black font-mono">Mathematical Impact</th>
                  <th className="p-3 font-black">Clinical Rationale</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5DFD1] bg-white">
                {currentAnalysis.shapFactors.map((f, i) => (
                  <tr key={i} className="hover:bg-[#FBF9F5] transition">
                    <td className="p-3 font-bold text-[#18231C]">{f.factor}</td>
                    <td className={`p-3 font-mono font-black ${f.type === 'risk' ? 'text-rose-600' : 'text-[#235339]'}`}>
                      {f.impact}
                    </td>
                    <td className="p-3 text-[#4F5752]">{f.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Safer Alternatives */}
        {currentAnalysis.alternatives && currentAnalysis.alternatives.length > 0 && (
          <div className="space-y-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="section-tag">RECOMMENDATIONS</span>
              <h3 className="text-xs font-black uppercase tracking-wider text-[#18231C]">
                Suggested Safer Alternative Medications for Doctor Review
              </h3>
            </div>

            <div className="space-y-2">
              {currentAnalysis.alternatives.map((alt, i) => (
                <div key={i} className="p-3.5 rounded-2xl border border-[#E5DFD1] bg-[#FBF9F5] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <strong className="text-[#18231C] font-black text-sm">{alt.name} ({alt.dosage})</strong>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#E2EFE7] text-[#235339] border border-[#235339]/30 text-[10px] font-bold font-mono">
                      Projected Risk: {alt.projectedRiskScore}% (LOW)
                    </span>
                  </div>
                  <p className="text-[#4F5752] leading-relaxed">{alt.whySafer}</p>
                  <p className="text-[11px] text-[#6F7771] italic font-medium">Physician Note: {alt.doctorNote}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Clinical Sign-off */}
        <div className="pt-8 border-t-2 border-[#E5DFD1] grid grid-cols-2 gap-8 text-xs text-[#6F7771]">
          <div>
            <div className="h-12 border-b border-[#D5CDBF] mb-1.5" />
            <span className="font-semibold text-[#18231C]">Prescribing Physician / Pharmacist Signature</span>
          </div>
          <div>
            <div className="h-12 border-b border-[#D5CDBF] mb-1.5" />
            <span className="font-semibold text-[#18231C]">Review Date & Clinical License Number</span>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="text-[10px] font-mono text-[#8C938D] leading-relaxed text-center pt-2">
          This document is generated by MediSafe AI for clinical decision support. Final prescription authority remains solely with licensed medical practitioners.
        </div>

      </div>
      )}

    </div>
  );
}
