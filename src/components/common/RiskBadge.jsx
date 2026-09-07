import React from 'react';
import { ShieldCheck, AlertTriangle, AlertOctagon } from 'lucide-react';

export default function RiskBadge({ level = 'LOW', score, size = 'md', showIcon = true }) {
  const normLevel = (level || 'LOW').toUpperCase();

  const configs = {
    LOW: {
      bg: 'bg-[#E2EFE7] border-[#C6DDD0] text-[#1E5034]',
      pill: 'bg-[#235339] text-white font-bold',
      dot: 'bg-[#235339]',
      icon: ShieldCheck,
      label: 'Low Risk — Generally Safe',
      shortLabel: 'Low Risk'
    },
    MEDIUM: {
      bg: 'bg-amber-50 border-amber-200 text-amber-900',
      pill: 'bg-amber-600 text-white font-bold',
      dot: 'bg-amber-600',
      icon: AlertTriangle,
      label: 'Medium Risk — Exercise Caution',
      shortLabel: 'Medium Risk'
    },
    HIGH: {
      bg: 'bg-rose-50 border-rose-200 text-rose-900',
      pill: 'bg-rose-600 text-white font-bold',
      dot: 'bg-rose-600',
      icon: AlertOctagon,
      label: 'High Risk — Consult Doctor',
      shortLabel: 'High Risk'
    },
    SEVERE: {
      bg: 'bg-red-100 border-red-300 text-red-950',
      pill: 'bg-red-700 text-white font-bold',
      dot: 'bg-red-700',
      icon: AlertOctagon,
      label: 'Severe Risk — Emergency Hazard',
      shortLabel: 'Severe Hazard'
    }
  };

  const config = configs[normLevel] || configs.LOW;
  const IconComponent = config.icon;

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs sm:text-sm',
    lg: 'px-4 py-1.5 text-sm sm:text-base font-semibold'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${config.bg} ${sizeClasses[size] || sizeClasses.md} font-medium transition-all shadow-sm`}
    >
      <span className={`w-2 h-2 rounded-full ${config.dot} animate-pulse`} />
      {showIcon && <IconComponent className="w-3.5 h-3.5 shrink-0" />}
      <span>{config.shortLabel}</span>
      {score !== undefined && (
        <span className="ml-1 px-1.5 py-0.2 rounded-full bg-white border border-current/20 font-mono text-[11px] font-bold text-[#18231C]">
          {score}%
        </span>
      )}
    </span>
  );
}
