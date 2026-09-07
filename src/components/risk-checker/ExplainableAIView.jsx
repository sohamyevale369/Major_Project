import React from 'react';
import { Sparkles, HelpCircle, BookOpen, CheckCircle, ShieldAlert } from 'lucide-react';

export default function ExplainableAIView({
  shapFactors = [],
  riskLevel = 'LOW',
  plainEnglishExplanation = '',
  medicineName = ''
}) {
  return (
    <div className="ivory-card p-6 sm:p-7 space-y-6 shadow-sm">
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-[#E5DFD1]">
        <div>
          <span className="section-tag mb-1">
            09 — EXPLAINABLE AI (SHAP / LIME)
          </span>
          <h3 className="text-lg sm:text-xl font-black text-[#18231C] tracking-tight uppercase">
            Why Did MediSafe AI Predict This Risk Score?
          </h3>
          <p className="text-xs text-[#5A645D]">
            Transparent clinical reasoning showing exactly how each patient factor and medication interaction influenced the prediction.
          </p>
        </div>

        <div className="shrink-0 px-3.5 py-1.5 rounded-full bg-[#E2EFE7] border border-[#C6DDD0] text-right">
          <span className="text-[10px] text-[#4A554E] uppercase font-bold tracking-wider block">Framework</span>
          <span className="text-xs font-mono font-black text-[#1E5034]">SHAP Feature Attribution</span>
        </div>
      </div>

      {plainEnglishExplanation && (
        <div className="p-4 rounded-2xl bg-[#E2EFE7] border border-[#C6DDD0] flex items-start gap-3">
          <div className="p-2 rounded-xl bg-[#D2E7DC] text-[#1E5034] shrink-0 mt-0.5">
            <BookOpen className="w-4 h-4 text-[#235339]" />
          </div>
          <div className="space-y-1 text-xs sm:text-sm">
            <strong className="text-[#1E5034] block font-bold uppercase text-[11px] tracking-wider">
              AI Clinical Summary:
            </strong>
            <p className="text-[#18231C] leading-relaxed font-medium">
              {plainEnglishExplanation}
            </p>
          </div>
        </div>
      )}

      <div className="space-y-3">
        <h4 className="text-xs font-black uppercase tracking-wider text-[#18231C]">
          Factor-by-Factor Risk Contribution:
        </h4>

        <div className="space-y-2.5">
          {shapFactors.length === 0 ? (
            <div className="text-xs text-[#6A746C] p-3.5 bg-[#F3EFE6] rounded-xl border border-[#D5CDBF]">
              Standard physiological baseline. No adverse risk factors detected.
            </div>
          ) : (
            shapFactors.map((item, idx) => {
              const isRisk = item.type === 'risk';
              const badgeClass = isRisk
                ? 'bg-rose-100 border-rose-200 text-rose-900'
                : 'bg-[#E2EFE7] border-[#C6DDD0] text-[#1E5034]';
              const signColor = isRisk ? 'text-rose-700 font-mono font-black' : 'text-[#235339] font-mono font-black';

              return (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#F3EFE6] border border-[#D5CDBF] hover:border-[#235339] transition"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${badgeClass}`}>
                        {item.factor}
                      </span>
                    </div>

                    <span className={`text-sm ${signColor}`}>
                      {item.impact}
                    </span>
                  </div>

                  <p className="text-xs text-[#4A554E] mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="p-3.5 rounded-2xl bg-[#ECE7DC] border border-[#D5CDBF] text-[11px] text-[#5A645D] leading-relaxed flex items-start gap-2">
        <HelpCircle className="w-4 h-4 text-[#235339] shrink-0 mt-0.5" />
        <span>
          <strong>What is SHAP?</strong> In machine learning, <em>SHapley Additive exPlanations</em> measures how much each clinical parameter (such as age, kidney health, or dosage) pushes the model’s prediction higher or lower from normal baseline.
        </span>
      </div>

    </div>
  );
}
