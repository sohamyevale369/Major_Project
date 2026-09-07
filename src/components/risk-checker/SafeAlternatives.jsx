import React from 'react';
import { HeartHandshake, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import RiskBadge from '../common/RiskBadge';
import { useHealth } from '../../context/HealthContext';

export default function SafeAlternatives({
  alternatives = [],
  currentMedicine = '',
  currentRiskScore = 85,
  onSelectAlternative
}) {
  const { runSafetyCheck, showToast } = useHealth();

  if (!alternatives || alternatives.length === 0) {
    return (
      <div className="ivory-card p-6 text-center text-xs text-[#6A746C]">
        No specific alternative suggestions mapped for this drug. Consult your physician for personalized therapeutic substitutes.
      </div>
    );
  }

  const handleApplyAlternative = (alt) => {
    runSafetyCheck(alt.name, alt.dosage);
    showToast(`Switched analysis to safer alternative: ${alt.name}`, 'success');
  };

  return (
    <div className="ivory-card p-6 sm:p-7 space-y-6 shadow-sm">
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-[#E5DFD1]">
        <div>
          <span className="section-tag mb-1">
            10 — CLINICAL DECISION SUPPORT // ALTERNATIVES
          </span>
          <h3 className="text-lg sm:text-xl font-black text-[#18231C] tracking-tight uppercase">
            Safer Medication Alternatives
          </h3>
          <p className="text-xs text-[#5A645D]">
            Therapeutic options with significantly lower predicted risk profiles for your specific health conditions.
          </p>
        </div>

        <span className="text-xs text-[#5A645D]">
          Showing <strong className="text-[#18231C]">{alternatives.length}</strong> doctor-reviewed substitute(s)
        </span>
      </div>

      <div className="space-y-4">
        {alternatives.map((alt, idx) => {
          const scoreDifference = currentRiskScore - (alt.projectedRiskScore || 20);

          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#F3EFE6] border border-[#D5CDBF] hover:border-[#235339] transition-all shadow-sm space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#6A746C]">
                      Option {idx + 1}:
                    </span>
                    <h4 className="text-base sm:text-lg font-black text-[#18231C]">
                      {alt.name}
                    </h4>
                    <span className="text-xs text-[#6A746C] font-mono">({alt.dosage})</span>
                  </div>
                  <span className="text-xs text-[#235339] font-semibold">
                    Category: {alt.category}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-[10px] text-[#6A746C] uppercase font-bold tracking-wider">Projected Risk</div>
                    <RiskBadge level={alt.riskLevel || 'LOW'} score={alt.projectedRiskScore} size="sm" />
                  </div>

                  {scoreDifference > 0 && (
                    <div className="px-3 py-1 rounded-full bg-[#E2EFE7] text-[#1E5034] border border-[#C6DDD0] text-xs font-bold flex items-center gap-1">
                      <span>-{scoreDifference}% Risk</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#E5DFD1] text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-[#1E5034] font-bold">
                  <ShieldCheck className="w-4 h-4 text-[#235339] shrink-0" />
                  <span>Why This Alternative Is Safer For You:</span>
                </div>
                <p className="text-[#37423B] leading-relaxed pl-5">
                  {alt.whySafer}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                <p className="text-[11px] text-[#6A746C] italic">
                  ⚕️ <strong>Physician Review Note:</strong> {alt.doctorNote}
                </p>

                <button
                  onClick={() => handleApplyAlternative(alt)}
                  className="pill-btn-primary text-xs py-2 px-4 shrink-0"
                >
                  <span>Evaluate {alt.name.split(' ')[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-3.5 rounded-2xl bg-[#ECE7DC] border border-[#D5CDBF] text-[11px] text-[#5A645D] leading-relaxed">
        <strong>Important Clinical Protocol:</strong> MediSafe AI recommendations serve strictly as an explainable decision-support tool. Do not alter or discontinue prescribed medication without your doctor or pharmacist’s authorization.
      </div>

    </div>
  );
}
