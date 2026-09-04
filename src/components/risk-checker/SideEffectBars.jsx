import React from 'react';
import { Activity, AlertCircle, Info } from 'lucide-react';

export default function SideEffectBars({ sideEffects = [], patientAge, medicineName }) {
  if (!sideEffects || sideEffects.length === 0) {
    return (
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 text-center text-xs text-slate-400">
        No specific side effect data available for this medication.
      </div>
    );
  }

  const getBarColor = (probability) => {
    if (probability >= 60) return 'bg-rose-500 from-rose-500 to-red-600';
    if (probability >= 35) return 'bg-amber-500 from-amber-500 to-amber-600';
    return 'bg-mediteal-500 from-mediteal-500 to-teal-600';
  };

  const getTextColor = (probability) => {
    if (probability >= 60) return 'text-rose-400';
    if (probability >= 35) return 'text-amber-400';
    return 'text-mediteal-300';
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-mediteal-400" />
            Personalized Side Effect Predictions
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            AI calculated probabilities for <span className="text-white font-semibold">{medicineName}</span> tailored to your profile.
          </p>
        </div>
        <span className="text-[11px] font-semibold text-slate-400 bg-slate-800 px-2.5 py-1 rounded-full w-fit">
          Patient Age: {patientAge}y
        </span>
      </div>

      <div className="space-y-4">
        {sideEffects.map((item, idx) => {
          const barGradient = getBarColor(item.probability);
          const textColor = getTextColor(item.probability);

          return (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-200">
                    {item.name}
                  </span>
                  {item.severe && (
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      High Impact
                    </span>
                  )}
                </div>
                <span className={`font-mono font-bold text-sm ${textColor}`}>
                  {item.probability}%
                </span>
              </div>

              <div className="w-full h-2.5 rounded-full bg-slate-800/80 overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${barGradient} transition-all duration-1000 ease-out`}
                  style={{ width: `${item.probability}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-2 text-[11px] text-slate-400 leading-relaxed">
        <Info className="w-4 h-4 text-mediteal-400 shrink-0 mt-0.5" />
        <span>
          <strong>Why these percentages?</strong> MediSafe AI adjusts standard clinical trial rates using patient physiology (age, kidney/liver efficiency, weight, and concurrent drug clearance).
        </span>
      </div>
    </div>
  );
}
