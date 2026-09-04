import React from 'react';
import { ShieldCheck, AlertTriangle, AlertOctagon, CheckCircle2 } from 'lucide-react';
import RiskBadge from '../common/RiskBadge';

export default function RiskGauge({ score = 15, level = 'LOW', medicineName = '' }) {
  const radius = 70;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const colorConfigs = {
    LOW: {
      strokeColor: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.3)',
      textGradient: 'from-emerald-300 to-teal-400',
      label: 'Low Safety Risk',
      summary: 'Safe to take as directed for your profile',
      bgGlow: 'bg-emerald-500/10 border-emerald-500/30'
    },
    MEDIUM: {
      strokeColor: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.3)',
      textGradient: 'from-amber-300 to-yellow-400',
      label: 'Moderate Risk Detected',
      summary: 'Caution advised. Monitor for potential side effects',
      bgGlow: 'bg-amber-500/10 border-amber-500/30'
    },
    HIGH: {
      strokeColor: '#f43f5e',
      glowColor: 'rgba(244, 63, 94, 0.35)',
      textGradient: 'from-rose-300 to-red-400',
      label: 'High Risk Hazard',
      summary: 'Significant safety concern detected. Do not take without doctor review',
      bgGlow: 'bg-rose-500/15 border-rose-500/40'
    }
  };

  const current = colorConfigs[level.toUpperCase()] || colorConfigs.LOW;

  return (
    <div className={`p-6 rounded-2xl border ${current.bgGlow} bg-slate-900/90 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6`}>
      
      <div className="relative flex items-center justify-center shrink-0">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90"
        >
          <circle
            stroke="rgba(51, 65, 85, 0.4)"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke={current.strokeColor}
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={`${circumference} ${circumference}`}
            style={{ strokeDashoffset, transition: 'stroke-dashoffset 1s ease-in-out' }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <span className={`text-3xl font-black bg-gradient-to-br ${current.textGradient} bg-clip-text text-transparent font-mono`}>
            {score}%
          </span>
          <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400 mt-0.5">
            Risk Score
          </span>
        </div>
      </div>

      <div className="flex-1 text-center sm:text-left space-y-2">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <RiskBadge level={level} score={score} size="lg" />
          <span className="text-xs font-mono text-slate-400">
            Evaluating: <strong className="text-white">{medicineName}</strong>
          </span>
        </div>

        <h3 className="text-lg font-bold text-white tracking-tight">
          {current.label}
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg">
          {current.summary}
        </p>

        <div className="pt-2 flex items-center justify-center sm:justify-start gap-3 text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            0–34% Safe
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            35–69% Caution
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-400" />
            70–100% Danger
          </span>
        </div>
      </div>

    </div>
  );
}
