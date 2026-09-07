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
      strokeColor: '#235339',
      label: 'Low Safety Risk',
      summary: 'Safe to take as prescribed for your profile',
      bgGlow: 'bg-[#E2EFE7] border-[#C6DDD0] text-[#1E5034]',
      badgeText: 'text-[#235339]'
    },
    MEDIUM: {
      strokeColor: '#D97706',
      label: 'Moderate Risk Detected',
      summary: 'Caution advised. Monitor for potential side effects',
      bgGlow: 'bg-amber-50 border-amber-200 text-amber-950',
      badgeText: 'text-amber-800'
    },
    HIGH: {
      strokeColor: '#C53030',
      label: 'High Risk Hazard',
      summary: 'Significant contraindication detected. Do not take without physician review',
      bgGlow: 'bg-rose-50 border-rose-200 text-rose-950',
      badgeText: 'text-rose-800'
    }
  };

  const current = colorConfigs[level.toUpperCase()] || colorConfigs.LOW;

  return (
    <div className={`p-6 rounded-2xl border ${current.bgGlow} shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6`}>
      
      <div className="relative flex items-center justify-center shrink-0">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90"
        >
          <circle
            stroke="#D5CDBF"
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
          <span className="text-3xl font-black text-[#18231C] font-mono">
            {score}%
          </span>
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#6A746C] mt-0.5">
            Risk Score
          </span>
        </div>
      </div>

      <div className="flex-1 text-center sm:text-left space-y-2">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <RiskBadge level={level} score={score} size="lg" />
          <span className="text-xs font-mono text-[#5A645D]">
            Evaluating: <strong className="text-[#18231C]">{medicineName}</strong>
          </span>
        </div>

        <h3 className="text-lg font-black text-[#18231C] tracking-tight uppercase">
          {current.label}
        </h3>
        <p className="text-xs sm:text-sm text-[#4A554E] leading-relaxed max-w-lg">
          {current.summary}
        </p>

        <div className="pt-2 flex items-center justify-center sm:justify-start gap-3 text-[11px] text-[#6A746C] font-mono">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#235339]" />
            0–34% Safe
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            35–69% Caution
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#C53030]" />
            70–100% Danger
          </span>
        </div>
      </div>

    </div>
  );
}
