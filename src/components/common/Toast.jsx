import React from 'react';
import { CheckCircle2, AlertTriangle, Info, XCircle } from 'lucide-react';
import { useHealth } from '../../context/HealthContext';

export default function Toast() {
  const { toast, setToast } = useHealth();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-[#235339] shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
    error: <XCircle className="w-5 h-5 text-rose-600 shrink-0" />,
    info: <Info className="w-5 h-5 text-[#235339] shrink-0" />
  };

  const borderColors = {
    success: 'border-[#C6DDD0] bg-white text-[#18231C] shadow-lg',
    warning: 'border-amber-200 bg-amber-50 text-amber-950 shadow-lg',
    error: 'border-rose-200 bg-rose-50 text-rose-950 shadow-lg',
    info: 'border-[#D5CDBF] bg-white text-[#18231C] shadow-lg'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full px-4 animate-slide-up pointer-events-auto">
      <div
        className={`flex items-center gap-3 p-4 rounded-2xl border shadow-xl ${
          borderColors[toast.type] || borderColors.info
        }`}
      >
        {icons[toast.type] || icons.info}
        <div className="flex-1 text-xs sm:text-sm font-semibold leading-snug">
          {toast.message}
        </div>
        <button
          onClick={() => setToast(null)}
          className="text-[#6A746C] hover:text-[#18231C] text-xs p-1 rounded hover:bg-[#ECE7DC] transition"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
