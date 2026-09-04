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
      
      <div className="flex items-center justify-between print:hidden">
        <button
          onClick={() => setActiveTab('risk-checker')}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Risk Checker</span>
        </button>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-mediteal-500 to-mediblue-600 hover:from-mediteal-400 hover:to-mediblue-500 text-slate-950 font-bold text-xs shadow-lg transition"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save as Clinical PDF</span>
        </button>
      </div>

      <div className="p-8 sm:p-12 rounded-2xl bg-white text-slate-900 border border-slate-200 shadow-2xl space-y-8 print:border-none print:shadow-none print:p-0">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-950 text-white flex items-center justify-center font-black text-xl">
              M
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-950">
                MediSafe AI • Clinical Safety Report
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Explainable Medicine Risk Assessment & Alternative Analysis
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right text-xs space-y-0.5">
            <div><strong>Report ID:</strong> <span className="font-mono">{reportId}</span></div>
            <div><strong>Generated:</strong> {currentDate}</div>
            <div><strong>Engine:</strong> MediSafe v2.0 (SHAP + XGBoost)</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-500 block uppercase tracking-wider text-[10px] font-bold">Patient Name</span>
            <strong className="text-slate-900 text-sm">{patient.name}</strong>
          </div>
          <div>
            <span className="text-slate-500 block uppercase tracking-wider text-[10px] font-bold">Age & Gender</span>
            <strong className="text-slate-900 text-sm">{patient.age} yrs • {patient.gender}</strong>
          </div>
          <div>
            <span className="text-slate-500 block uppercase tracking-wider text-[10px] font-bold">Patient Weight</span>
            <strong className="text-slate-900 text-sm">{patient.weight} kg</strong>
          </div>
          <div>
            <span className="text-slate-500 block uppercase tracking-wider text-[10px] font-bold">Known Allergies</span>
            <strong className="text-rose-700 text-sm">
              {patient.allergies.length > 0 ? patient.allergies.join(', ') : 'None Reported'}
            </strong>
          </div>
        </div>

        <div className="text-xs space-y-1">
          <strong className="text-slate-700 block uppercase tracking-wider text-[10px]">
            Diagnosed Chronic Conditions:
          </strong>
          <p className="text-slate-800 font-medium">
            {patient.diseases.length > 0 ? patient.diseases.join('; ') : 'None documented in profile.'}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-100 border border-slate-300 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                Medication Evaluated
              </span>
              <h2 className="text-xl font-extrabold text-slate-950">
                {currentAnalysis.medicineName} ({currentAnalysis.dosage})
              </h2>
              <span className="text-xs text-slate-600 font-medium">
                Prescribed Intake: {currentAnalysis.frequency}
              </span>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                Calculated Safety Score
              </span>
              <span className="text-2xl font-black font-mono text-slate-900">
                {currentAnalysis.riskScore}%
              </span>
              <span className={`block text-xs font-bold ${
                currentAnalysis.riskLevel === 'HIGH' ? 'text-rose-700' : 'text-emerald-700'
              }`}>
                {currentAnalysis.riskLevel === 'HIGH' ? '⚠ HIGH RISK CONTRAINDICATION' : 'LOW RISK PROFILE'}
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 text-xs text-slate-700 leading-relaxed">
            <strong>Clinical Synthesis:</strong> {currentAnalysis.plainEnglishExplanation}
          </div>
        </div>

        <div className="space-y-3 text-xs">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
            Explainable AI Factor Attribution (SHAP Analysis)
          </h3>
          <table className="w-full border-collapse border border-slate-200 text-left">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200 text-slate-700">
                <th className="p-2.5 font-bold">Health Factor</th>
                <th className="p-2.5 font-bold">Mathematical Impact</th>
                <th className="p-2.5 font-bold">Clinical Rationale</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {currentAnalysis.shapFactors.map((f, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="p-2.5 font-semibold text-slate-900">{f.factor}</td>
                  <td className={`p-2.5 font-mono font-bold ${f.type === 'risk' ? 'text-rose-600' : 'text-emerald-600'}`}>
                    {f.impact}
                  </td>
                  <td className="p-2.5 text-slate-600">{f.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {currentAnalysis.alternatives && currentAnalysis.alternatives.length > 0 && (
          <div className="space-y-3 text-xs">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
              Suggested Safer Alternative Medications for Doctor Review
            </h3>
            <div className="space-y-2">
              {currentAnalysis.alternatives.map((alt, i) => (
                <div key={i} className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-950 font-bold">{alt.name} ({alt.dosage})</strong>
                    <span className="text-[11px] font-bold text-emerald-700 font-mono">
                      Projected Risk: {alt.projectedRiskScore}% (LOW)
                    </span>
                  </div>
                  <p className="text-slate-600">{alt.whySafer}</p>
                  <p className="text-[11px] text-slate-500 italic">Physician Note: {alt.doctorNote}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-8 border-t-2 border-slate-300 grid grid-cols-2 gap-8 text-xs text-slate-600">
          <div>
            <div className="h-12 border-b border-slate-400 mb-1" />
            <span>Prescribing Physician / Pharmacist Signature</span>
          </div>
          <div>
            <div className="h-12 border-b border-slate-400 mb-1" />
            <span>Review Date & Clinical License Number</span>
          </div>
        </div>

        <div className="text-[10px] text-slate-400 leading-relaxed text-center pt-4">
          This document is generated by MediSafe AI for clinical decision support. Final prescription authority remains solely with licensed medical practitioners.
        </div>

      </div>

    </div>
  );
}
