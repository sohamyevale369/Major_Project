import React from 'react';
import { CheckCircle2, AlertTriangle, Info, XCircle } from 'lucide-react';
import { useHealth } from '../../context/HealthContext';

export default function Toast() {
  const { toast, setToast } = useHealth();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />,
    error: <XCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-400 shrink-0" />
  };

  const borderColors = {
    success: 'border-emerald-500/40 bg-slate-900/95 text-emerald-100',
    warning: 'border-amber-500/40 bg-slate-900/95 text-amber-100',
    error: 'border-rose-500/40 bg-slate-900/95 text-rose-100',
    info: 'border-sky-500/40 bg-slate-900/95 text-sky-100'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full px-4 animate-slide-up pointer-events-auto">
      <div
        className={`flex items-center gap-3 p-4 rounded-xl border shadow-2xl backdrop-blur-md ${
          borderColors[toast.type] || borderColors.info
        }`}
      >
        {icons[toast.type] || icons.info}
        <div className="flex-1 text-sm font-medium leading-snug">
          {toast.message}
        </div>
        <button
          onClick={() => setToast(null)}
          className="text-slate-400 hover:text-white text-xs p-1 rounded hover:bg-slate-800 transition"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
