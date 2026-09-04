import React from 'react';
import { AlertOctagon, PhoneCall, X, ShieldAlert, HeartHandshake } from 'lucide-react';
import { useHealth } from '../../context/HealthContext';

export default function EmergencyModal() {
  const { emergencyAlert, setEmergencyAlert, setActiveTab } = useHealth();

  if (!emergencyAlert) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-rose-500/60 bg-gradient-to-b from-slate-900 via-slate-900 to-rose-950/30 p-6 sm:p-8 shadow-2xl shadow-rose-950/80">
        {/* Glow Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-rose-500 to-red-600 animate-pulse" />

        {/* Close Button */}
        <button
          onClick={() => setEmergencyAlert(null)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          aria-label="Dismiss Emergency Alert"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon & Title */}
        <div className="flex items-start gap-4">
          <div className="p-3.5 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 shrink-0">
            <AlertOctagon className="w-8 h-8 animate-bounce" />
          </div>
          <div>
            <span className="inline-block px-2.5 py-0.5 mb-1.5 text-xs font-bold tracking-wider uppercase bg-rose-500/20 text-rose-300 border border-rose-500/40 rounded-full">
              High Priority Warning
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {emergencyAlert.title || 'Critical Medication Alert'}
            </h3>
            {emergencyAlert.medicine && (
              <p className="text-sm text-rose-300 font-medium mt-0.5">
                Flagged Medicine: <span className="font-bold underline">{emergencyAlert.medicine}</span>
              </p>
            )}
          </div>
        </div>

        {/* Details Box */}
        <div className="mt-5 p-4 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-100 text-sm leading-relaxed">
          <p className="font-semibold text-rose-200 mb-1 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
            Plain-English Safety Notice:
          </p>
          <p>{emergencyAlert.details}</p>
        </div>

        {/* Recommended Action Steps for Non-tech / Senior users */}
        <div className="mt-4 space-y-2">
          <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            What you should do right now:
          </h4>
          <ul className="text-xs sm:text-sm text-slate-300 space-y-1.5">
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span>
              <span><strong>Do not swallow or inject this medicine</strong> until speaking with your doctor or pharmacist.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
              <span>Check the <strong>Safe Alternatives</strong> recommended by MediSafe AI below for safer options.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</span>
              <span>If you are already feeling sick, short of breath, or swollen, call emergency services immediately.</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          <a
            href="tel:911"
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-semibold text-sm shadow-lg shadow-rose-900/50 transition-all transform active:scale-95"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call Emergency / Helpline</span>
          </a>

          <button
            onClick={() => {
              setEmergencyAlert(null);
              setActiveTab('risk-checker');
            }}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-medium text-sm border border-slate-700 transition"
          >
            <HeartHandshake className="w-4 h-4 inline mr-1.5 text-mediteal-400" />
            View Safe Alternatives
          </button>
        </div>
      </div>
    </div>
  );
}
