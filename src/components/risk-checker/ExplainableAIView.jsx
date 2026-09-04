import React from 'react';
import { Sparkles, HelpCircle, ArrowUpRight, CheckCircle, ShieldAlert, BookOpen } from 'lucide-react';

export default function ExplainableAIView({
  shapFactors = [],
  riskLevel = 'LOW',
  plainEnglishExplanation = '',
  medicineName = ''
}) {
  return (
    <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-purple-950/20 border border-purple-500/30 shadow-xl space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-[11px] font-bold uppercase tracking-wider mb-1.5">
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span>Transparent Explainable AI (SHAP / LIME)</span>
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
            Why Did MediSafe AI Predict This Risk Score?
          </h3>
          <p className="text-xs text-slate-300">
            No black-box guesses. Here is the exact clinical breakdown of how your personal health factors contributed to the verdict.
          </p>
        </div>

        <div className="shrink-0 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-right">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Methodology</span>
          <span className="text-xs font-mono font-bold text-purple-300">SHAP Feature Attribution</span>
        </div>
      </div>

      {plainEnglishExplanation && (
        <div className="p-4 rounded-xl bg-slate-950/80 border border-purple-500/30 flex items-start gap-3">
          <div className="p-2 rounded-lg bg-purple-500/20 text-purple-300 shrink-0 mt-0.5">
            <BookOpen className="w-4 h-4" />
          </div>
          <div className="space-y-1 text-xs sm:text-sm">
            <strong className="text-purple-200 block font-bold">
              In Plain Words:
            </strong>
            <p className="text-slate-200 leading-relaxed">
              {plainEnglishExplanation}
            </p>
          </div>
        </div>
      )}

      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Factor-by-Factor Risk Contribution:
        </h4>

        <div className="space-y-2.5">
          {shapFactors.length === 0 ? (
            <div className="text-xs text-slate-400 p-3 bg-slate-950 rounded-xl">
              Standard physiological baseline. No adverse risk factors detected.
            </div>
          ) : (
            shapFactors.map((item, idx) => {
              const isRisk = item.type === 'risk';
              const badgeClass = isRisk
                ? 'bg-rose-500/15 border-rose-500/30 text-rose-300'
                : 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300';
              const signColor = isRisk ? 'text-rose-400 font-mono font-bold' : 'text-emerald-400 font-mono font-bold';

              return (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/90 hover:border-slate-700 transition"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold border ${badgeClass}`}>
                        {item.factor}
                      </span>
                    </div>

                    <span className={`text-sm ${signColor}`}>
                      {item.impact}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 leading-relaxed flex items-start gap-2">
        <HelpCircle className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
        <span>
          <strong>What is SHAP?</strong> In machine learning, <em>SHapley Additive exPlanations</em> measures how much each feature (such as your age, kidney function, or dosage) pushes the model’s prediction higher or lower from baseline. This ensures physicians can verify the AI’s reasoning before prescribing.
        </span>
      </div>

    </div>
  );
}
