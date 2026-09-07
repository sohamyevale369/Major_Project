import React from 'react';
import { Activity, AlertCircle, Info } from 'lucide-react';

export default function SideEffectBars({ sideEffects = [], patientAge, medicineName }) {
  if (!sideEffects || sideEffects.length === 0) {
    return (
      <div className="ivory-card p-6 text-center text-xs text-[#6A746C]">
        No specific side effect data available for this medication.
      </div>
    );
  }

  const getBarColor = (probability) => {
    if (probability >= 60) return 'bg-[#C53030]';
    if (probability >= 35) return 'bg-amber-500';
    return 'bg-[#235339]';
  };

  const getTextColor = (probability) => {
    if (probability >= 60) return 'text-rose-800';
    if (probability >= 35) return 'text-amber-800';
    return 'text-[#1E5034]';
  };

  return (
    <div className="ivory-card p-6 sm:p-7 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 pb-3 border-b border-[#E5DFD1]">
        <div>
          <h3 className="text-base font-black text-[#18231C] flex items-center gap-2 uppercase tracking-tight">
            <Activity className="w-4 h-4 text-[#235339]" />
            Personalized Side Effect Probabilities
          </h3>
          <p className="text-xs text-[#5A645D] mt-0.5">
            AI calculated risks for <strong className="text-[#18231C]">{medicineName}</strong> tailored to your age and clinical history.
          </p>
        </div>
        <span className="text-[11px] font-mono font-bold text-[#4A554E] bg-[#ECE7DC] px-3 py-1 rounded-full w-fit">
          Patient Age: {patientAge}y
        </span>
      </div>

      <div className="space-y-4">
        {sideEffects.map((item, idx) => {
          const barColor = getBarColor(item.probability);
          const textColor = getTextColor(item.probability);

          return (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#18231C]">
                    {item.name}
                  </span>
                  {item.severe && (
                    <span className="px-2 py-0.2 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-100 text-rose-800 border border-rose-200">
                      Severe
                    </span>
                  )}
                </div>
                <span className={`font-mono font-black text-sm ${textColor}`}>
                  {item.probability}%
                </span>
              </div>

              <div className="w-full h-2.5 rounded-full bg-[#ECE7DC] overflow-hidden">
                <div
                  className={`h-full rounded-full ${barColor} transition-all duration-1000 ease-out`}
                  style={{ width: `${item.probability}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 p-3.5 rounded-2xl bg-[#F3EFE6] border border-[#D5CDBF] flex items-start gap-2 text-[11px] text-[#5A645D] leading-relaxed">
        <Info className="w-4 h-4 text-[#235339] shrink-0 mt-0.5" />
        <span>
          <strong>Why these probabilities?</strong> MediSafe AI adjusts standard clinical trial baselines using patient physiology (age, kidney/liver efficiency, weight, and concurrent drug clearance).
        </span>
      </div>
    </div>
  );
}
