import React from 'react';
import { ShieldCheck, AlertTriangle, AlertOctagon } from 'lucide-react';

export default function RiskBadge({ level = 'LOW', score, size = 'md', showIcon = true }) {
  const normLevel = (level || 'LOW').toUpperCase();

  const configs = {
    LOW: {
      bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
      pill: 'bg-emerald-500 text-slate-950 font-bold',
      dot: 'bg-emerald-400',
      icon: ShieldCheck,
      label: 'Low Risk — Generally Safe',
      shortLabel: 'Low Risk'
    },
    MEDIUM: {
      bg: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
      pill: 'bg-amber-500 text-slate-950 font-bold',
      dot: 'bg-amber-400',
      icon: AlertTriangle,
      label: 'Medium Risk — Exercise Caution',
      shortLabel: 'Medium Risk'
    },
    HIGH: {
      bg: 'bg-rose-500/15 border-rose-500/40 text-rose-300',
      pill: 'bg-rose-500 text-white font-bold',
      dot: 'bg-rose-400',
      icon: AlertOctagon,
      label: 'High Risk — Consult Doctor',
      shortLabel: 'High Risk'
    },
    SEVERE: {
      bg: 'bg-red-600/20 border-red-500/60 text-red-200',
      pill: 'bg-red-600 text-white font-bold',
      dot: 'bg-red-400',
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
        <span className="ml-1 px-1.5 py-0.2 rounded-full bg-slate-900/60 font-mono text-[11px] text-slate-200">
          {score}%
        </span>
      )}
    </span>
  );
}
