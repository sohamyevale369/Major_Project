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
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 text-center text-xs text-slate-400">
        No specific alternative suggestions mapped for this drug. Consult your doctor for therapeutic substitutes.
      </div>
    );
  }

  const handleApplyAlternative = (alt) => {
    runSafetyCheck(alt.name, alt.dosage);
    showToast(`Switched analysis to safer alternative: ${alt.name}`, 'success');
  };

  return (
    <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/95 to-mediteal-950/20 border border-mediteal-500/30 shadow-xl space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-mediteal-500/15 border border-mediteal-500/30 text-mediteal-300 text-[11px] font-bold uppercase tracking-wider mb-1.5">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Clinical Decision Support</span>
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
            Safer Medication Alternatives
          </h3>
          <p className="text-xs text-slate-300">
            Options with lower predicted risk profiles for your specific health conditions.
          </p>
        </div>

        <span className="text-xs text-slate-400">
          Showing <strong className="text-white">{alternatives.length}</strong> safer substitute(s)
        </span>
      </div>

      <div className="space-y-4">
        {alternatives.map((alt, idx) => {
          const scoreDifference = currentRiskScore - (alt.projectedRiskScore || 20);

          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-mediteal-500/40 transition-all shadow-md space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Option {idx + 1}:
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-white">
                      {alt.name}
                    </h4>
                    <span className="text-xs text-slate-400 font-mono">({alt.dosage})</span>
                  </div>
                  <span className="text-xs text-mediteal-400 font-medium">
                    Category: {alt.category}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">Projected Risk</div>
                    <RiskBadge level={alt.riskLevel || 'LOW'} score={alt.projectedRiskScore} size="sm" />
                  </div>

                  {scoreDifference > 0 && (
                    <div className="px-2.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1">
                      <span>-{scoreDifference}% Risk</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800/80 text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-300 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Why This Alternative Is Safer For You:</span>
                </div>
                <p className="text-slate-300 leading-relaxed pl-5">
                  {alt.whySafer}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <p className="text-[11px] text-slate-400 italic">
                  ⚕️ <strong>Physician Review Note:</strong> {alt.doctorNote}
                </p>

                <button
                  onClick={() => handleApplyAlternative(alt)}
                  className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-mediteal-500/20 hover:bg-mediteal-500/30 text-mediteal-300 text-xs font-bold border border-mediteal-500/40 transition shrink-0"
                >
                  <span>Evaluate {alt.name.split(' ')[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
        <strong>Important Clinical Protocol:</strong> MediSafe AI recommendations serve as an explainable decision-support tool. Do not switch prescriptions without your primary doctor or pharmacist’s authorization.
      </div>

    </div>
  );
}
