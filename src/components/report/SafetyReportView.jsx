import React from 'react';
import { Printer, Shield, FileText, CheckCircle, AlertTriangle, Download, ArrowLeft } from 'lucide-react';
import { useHealth } from '../../context/HealthContext';
import RiskBadge from '../common/RiskBadge';
import { MediSafeLogoMark } from '../common/BrandLogo';

export default function SafetyReportView() {
  const {
    patient,
    currentUser,
    currentAnalysis,
    hasUpdatedPersonalDetails,
    setActiveTab,
    getDoctorReviewsForPatient
  } = useHealth();

  const patientReviews = getDoctorReviewsForPatient ? getDoctorReviewsForPatient(patient?.id) : [];
  const latestDoctorReview = patientReviews.find(
    (r) => currentAnalysis?.medicineName && r.medicineName.toLowerCase() === currentAnalysis.medicineName.toLowerCase()
  ) || patientReviews[0] || null;

  const handlePrint = () => {
    window.print();
  };

  const reportId = `MSR-${Math.floor(100000 + Math.random() * 900000)}`;
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Admin access guard: Admin does not track health or generate self-reports
  if (currentUser?.role === 'admin') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-5 animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-purple-50 text-purple-700 border border-purple-200 flex items-center justify-center mx-auto shadow-sm">
          <Shield className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="section-tag mb-0">ADMINISTRATIVE ROLE NOTICE</span>
          <h1 className="text-2xl font-black text-[#18231C]">
            Health Reports Disabled for Administrators
          </h1>
          <p className="text-xs sm:text-sm text-[#5A645D] max-w-md mx-auto leading-relaxed">
            Administrators do not track personal health or generate self-reports. Your administrative role gives you control rights to manage patient accounts and inspect individual patient dossiers.
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6 print:max-w-full print:p-0 print:m-0 print:space-y-0">
      
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
      {(!hasUpdatedPersonalDetails || (patient.diseases?.length === 0 && patient.allergies?.length === 0 && patient.currentMedicines?.length === 0)) ? (
        <div className="p-12 text-center rounded-3xl bg-white text-[#18231C] border border-[#E5DFD1] shadow-xl space-y-4 print:hidden">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-900 mx-auto flex items-center justify-center font-bold">
            <AlertTriangle className="w-7 h-7 text-amber-800" />
          </div>
          <div className="space-y-1.5 max-w-md mx-auto">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-amber-900 bg-amber-200/80 px-2.5 py-0.5 rounded-full border border-amber-300">
              Health Profile Required
            </span>
            <h3 className="text-xl font-black uppercase text-[#18231C]">
              Update Health Profile to Generate Reports
            </h3>
            <p className="text-xs text-[#5A645D]">
              <strong>{patient?.name || 'Your account'}</strong> has not recorded medical conditions, drug allergies, or active prescriptions yet. Clinical safety reports and dossiers require your health profile to evaluate interactions and contraindications.
            </p>
          </div>
          <button
            onClick={() => {
              setActiveTab('profile');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="pill-btn-primary text-xs py-2.5 px-5 mx-auto bg-amber-800 hover:bg-amber-900 text-white font-bold cursor-pointer"
          >
            <span>Update Health Profile to Generate Reports →</span>
          </button>
        </div>
      ) : !currentAnalysis ? (
        <div className="p-12 text-center rounded-3xl bg-white text-[#18231C] border border-[#E5DFD1] shadow-xl space-y-4 print:hidden">
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
        <div className="p-8 sm:p-12 rounded-3xl bg-white text-[#18231C] border border-[#E5DFD1] shadow-xl space-y-8 print:border-none print:shadow-none print:p-0 print:m-0 print:space-y-3 print:text-xs print-compact-report">
        
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-[#18231C] print:pb-2.5 print:gap-2 print:border-b print:border-black print-avoid-break">
          <div className="flex items-center gap-3">
            <MediSafeLogoMark size={44} />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#235339] font-bold">
                  OFFICIAL MEDICAL DOSSIER
                </span>
              </div>
              <h1 className="text-2xl font-black tracking-tight text-[#18231C] print:text-lg">
                MediSafe AI • Clinical Safety Report
              </h1>
              <p className="text-xs text-[#6F7771] font-medium print:text-[10px]">
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
        <div className="p-5 rounded-2xl bg-[#F6F4ED] border border-[#E5DFD1] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs print:p-2.5 print:gap-2 print:rounded-xl print:bg-gray-50 print:border-gray-300 print-avoid-break">
          <div>
            <span className="text-[#6F7771] block uppercase tracking-wider text-[10px] font-mono font-bold print:text-[9px]">
              Patient Name
            </span>
            <strong className="text-[#18231C] text-sm font-black print:text-xs">{patient.name}</strong>
          </div>
          <div>
            <span className="text-[#6F7771] block uppercase tracking-wider text-[10px] font-mono font-bold print:text-[9px]">
              Age & Gender
            </span>
            <strong className="text-[#18231C] text-sm font-black print:text-xs">{patient.age} yrs • {patient.gender}</strong>
          </div>
          <div>
            <span className="text-[#6F7771] block uppercase tracking-wider text-[10px] font-mono font-bold print:text-[9px]">
              Patient Weight
            </span>
            <strong className="text-[#18231C] text-sm font-black print:text-xs">{patient.weight} kg</strong>
          </div>
          <div>
            <span className="text-[#6F7771] block uppercase tracking-wider text-[10px] font-mono font-bold print:text-[9px]">
              Known Allergies
            </span>
            <strong className="text-rose-700 text-sm font-black print:text-xs">
              {patient.allergies.length > 0 ? patient.allergies.join(', ') : 'None Reported'}
            </strong>
          </div>
        </div>

        {/* Chronic Conditions */}
        <div className="p-4 rounded-2xl bg-[#FBF9F5] border border-[#E5DFD1] text-xs space-y-1 print:p-2 print:rounded-xl print-avoid-break">
          <strong className="text-[#6F7771] block uppercase tracking-wider text-[10px] font-mono font-bold print:text-[9px]">
            Diagnosed Chronic Conditions:
          </strong>
          <p className="text-[#18231C] font-semibold print:text-[10px]">
            {patient.diseases.length > 0 ? patient.diseases.join('; ') : 'None documented in active profile.'}
          </p>
        </div>

        {/* Medication Evaluated Banner */}
        <div className="p-6 rounded-2xl bg-[#E2EFE7] border border-[#235339]/20 space-y-4 print:p-2.5 print:space-y-1.5 print:rounded-xl print:border-emerald-800/30 print-avoid-break">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 print:gap-1">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#235339] font-mono print:text-[9px]">
                MEDICATION EVALUATED
              </span>
              <h2 className="text-xl font-black text-[#18231C] mt-0.5 print:text-sm">
                {currentAnalysis.medicineName} ({currentAnalysis.dosage})
              </h2>
              <span className="text-xs text-[#4F5752] font-semibold print:text-[10px]">
                Prescribed Intake: {currentAnalysis.frequency}
              </span>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#235339] font-mono block print:text-[9px]">
                CALCULATED SAFETY SCORE
              </span>
              <span className="text-3xl font-black font-mono text-[#18231C] print:text-xl">
                {currentAnalysis.riskScore}%
              </span>
              <span className={`block text-xs font-black uppercase tracking-wider mt-0.5 print:text-[9.5px] ${
                currentAnalysis.riskLevel === 'HIGH' ? 'text-rose-700' : 'text-[#235339]'
              }`}>
                {currentAnalysis.riskLevel === 'HIGH' ? '⚠ HIGH RISK CONTRAINDICATION' : '✓ LOW RISK PROFILE'}
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-[#235339]/20 text-xs text-[#235339] font-medium leading-relaxed print:pt-1 print:text-[10px]">
            <strong className="font-bold text-[#18231C]">Clinical Synthesis:</strong> {currentAnalysis.plainEnglishExplanation}
          </div>
        </div>

        {/* Explainable AI / SHAP Table */}
        <div className="space-y-3 text-xs print:space-y-1.5 print-avoid-break">
          <div className="flex items-center gap-2">
            <span className="section-tag print:text-[9px] print:py-0.5">SHAP EXPLAINABILITY</span>
            <h3 className="text-xs font-black uppercase tracking-wider text-[#18231C] print:text-[10px]">
              Explainable AI Factor Attribution
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
                {currentAnalysis.shapFactors.map((f, i) => (
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

        {/* Safer Alternatives */}
        {currentAnalysis.alternatives && currentAnalysis.alternatives.length > 0 && (
          <div className="space-y-3 text-xs print:space-y-1.5 print-avoid-break">
            <div className="flex items-center gap-2">
              <span className="section-tag print:text-[9px] print:py-0.5">RECOMMENDATIONS</span>
              <h3 className="text-xs font-black uppercase tracking-wider text-[#18231C] print:text-[10px]">
                Suggested Safer Alternative Medications for Doctor Review
              </h3>
            </div>

            <div className="space-y-2 print:space-y-1">
              {currentAnalysis.alternatives.map((alt, i) => (
                <div key={i} className="p-3.5 rounded-2xl border border-[#E5DFD1] bg-[#FBF9F5] space-y-1.5 print:p-2 print:rounded-xl">
                  <div className="flex items-center justify-between">
                    <strong className="text-[#18231C] font-black text-sm print:text-xs">{alt.name} ({alt.dosage})</strong>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#E2EFE7] text-[#235339] border border-[#235339]/30 text-[10px] font-bold font-mono print:text-[8.5px]">
                      Projected Risk: {alt.projectedRiskScore}% (LOW)
                    </span>
                  </div>
                  <p className="text-[#4F5752] leading-relaxed print:text-[9.5px]">{alt.whySafer}</p>
                  <p className="text-[11px] text-[#6F7771] italic font-medium print:text-[9px]">Physician Note: {alt.doctorNote}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Official Attending Physician Review & Comments (if reviewed by Doctor) */}
        {latestDoctorReview ? (
          <div className="p-6 sm:p-7 rounded-3xl bg-[#FAF8F5] border-2 border-[#235339] space-y-4 text-xs print:p-3 print:space-y-2 print:rounded-xl print:border print:border-[#235339] print-avoid-break">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#D5CDBF] print:pb-1.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#235339] animate-pulse" />
                <h3 className="text-sm font-black uppercase tracking-wide text-[#18231C] print:text-xs">
                  Official Attending Physician Review & Sign-Off
                </h3>
              </div>
              <span className={`px-3 py-1 rounded-full text-[11px] font-bold font-mono uppercase tracking-wider print:text-[9.5px] print:px-2 print:py-0.5 ${
                latestDoctorReview.decision === 'AGREE'
                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  : latestDoctorReview.decision === 'DISAGREE'
                  ? 'bg-rose-100 text-rose-900 border border-rose-300'
                  : 'bg-sky-100 text-sky-900 border border-sky-300'
              }`}>
                {latestDoctorReview.decisionLabel || 'Physician Approved & Finalized'}
              </span>
            </div>

            <div className="space-y-3 print:space-y-1.5">
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-[#6F7771] block mb-1 print:mb-0.5 print:text-[9px]">
                  Doctor’s Clinical Opinion:
                </span>
                <p className="p-3.5 rounded-2xl bg-white border border-[#D5CDBF] text-[#18231C] leading-relaxed font-medium print:p-2 print:rounded-lg print:text-[10px] print:leading-normal">
                  {latestDoctorReview.doctorComments}
                </p>
              </div>

              {latestDoctorReview.additionalPrecautions && latestDoctorReview.additionalPrecautions.length > 0 && (
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-[#6F7771] block mb-1.5 print:mb-0.5 print:text-[9px]">
                    Doctor's Additional Precautions & Instructions:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 print:gap-1">
                    {latestDoctorReview.additionalPrecautions.map((prec, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-xl bg-white border border-[#D5CDBF] text-[#235339] font-semibold flex items-center gap-2 print:p-1.5 print:text-[9.5px]"
                      >
                        <span className="w-4 h-4 rounded-full bg-[#E2EFE7] text-[#235339] flex items-center justify-center text-[10px] shrink-0 print:w-3.5 print:h-3.5 print:text-[8px]">✓</span>
                        <span>{prec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Electronic Signature Block */}
            <div className="pt-3.5 border-t border-[#D5CDBF] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono print:pt-1.5 print:gap-1.5 print:text-[9.5px]">
              <div>
                <span className="text-[10px] text-[#6F7771] block uppercase font-bold print:text-[8.5px]">Reviewing Doctor</span>
                <strong className="text-[#18231C] block text-sm print:text-[11px]">{latestDoctorReview.doctorName}</strong>
                <span className="text-[10px] text-[#5A645D] print:text-[8.5px]">{latestDoctorReview.doctorDepartment}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#6F7771] block uppercase font-bold print:text-[8.5px]">Medical License #</span>
                <strong className="text-[#18231C] block text-sm print:text-[11px]">{latestDoctorReview.doctorLicense}</strong>
                <span className="text-[10px] text-[#5A645D] print:text-[8.5px]">Verified Practitioner</span>
              </div>
              <div>
                <span className="text-[10px] text-[#6F7771] block uppercase font-bold print:text-[8.5px]">Digital Signature</span>
                <span className="text-emerald-800 font-bold block text-sm print:text-[11px]">✓ SIGNED & CERTIFIED</span>
                <span className="text-[10px] text-[#5A645D] print:text-[8.5px]">{latestDoctorReview.reviewDate}</span>
              </div>
            </div>
          </div>
        ) : (
          /* Standard Manual Signature Lines if not yet reviewed */
          <div className="pt-8 border-t-2 border-[#E5DFD1] grid grid-cols-2 gap-8 text-xs text-[#6F7771] print:pt-3 print:gap-4 print-avoid-break">
            <div>
              <div className="h-12 border-b border-[#D5CDBF] mb-1.5 print:h-8" />
              <span className="font-semibold text-[#18231C] print:text-[10px]">Prescribing Physician / Pharmacist Signature</span>
            </div>
            <div>
              <div className="h-12 border-b border-[#D5CDBF] mb-1.5 print:h-8" />
              <span className="font-semibold text-[#18231C] print:text-[10px]">Review Date & Clinical License Number</span>
            </div>
          </div>
        )}

        {/* Legal Disclaimer */}
        <div className="text-[10px] font-mono text-[#8C938D] leading-relaxed text-center pt-2 print:text-[8px] print:leading-tight print-avoid-break">
          This document is generated by MediSafe AI for clinical decision support. Final prescription authority remains solely with licensed medical practitioners.
        </div>

      </div>
      )}

    </div>
  );
}
