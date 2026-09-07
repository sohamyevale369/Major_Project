import React from 'react';
import { AlertOctagon, PhoneCall, X, ShieldAlert, HeartHandshake } from 'lucide-react';
import { useHealth } from '../../context/HealthContext';

export default function EmergencyModal() {
  const { emergencyAlert, setEmergencyAlert, setActiveTab } = useHealth();

  if (!emergencyAlert) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-rose-300 bg-white p-6 sm:p-8 shadow-2xl text-[#18231C]">
        {/* Top Accent line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#C53030]" />

        {/* Close Button */}
        <button
          onClick={() => setEmergencyAlert(null)}
          className="absolute top-4 right-4 p-2 text-[#6A746C] hover:text-[#18231C] rounded-full hover:bg-[#F3EFE6] transition"
          aria-label="Dismiss Emergency Alert"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon & Title */}
        <div className="flex items-start gap-4">
          <div className="p-3.5 rounded-2xl bg-rose-100 text-[#C53030] border border-rose-200 shrink-0">
            <AlertOctagon className="w-8 h-8" />
          </div>
          <div>
            <span className="inline-block px-2.5 py-0.5 mb-1.5 text-xs font-mono font-bold tracking-wider uppercase bg-rose-100 text-rose-800 border border-rose-200 rounded-full">
              High Priority Warning
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[#18231C] tracking-tight">
              {emergencyAlert.title || 'Critical Medication Alert'}
            </h3>
            {emergencyAlert.medicine && (
              <p className="text-sm text-rose-800 font-semibold mt-0.5">
                Flagged Medicine: <span className="font-bold underline">{emergencyAlert.medicine}</span>
              </p>
            )}
          </div>
        </div>

        {/* Details Box */}
        <div className="mt-5 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 text-sm leading-relaxed">
          <p className="font-bold text-rose-900 mb-1 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
            Plain-English Safety Notice:
          </p>
          <p className="text-xs sm:text-sm text-rose-900">{emergencyAlert.details}</p>
        </div>

        {/* Recommended Action Steps */}
        <div className="mt-4 space-y-2">
          <h4 className="text-xs font-bold text-[#18231C] uppercase tracking-wider">
            What you should do right now:
          </h4>
          <ul className="text-xs sm:text-sm text-[#424C44] space-y-1.5">
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span>
              <span><strong>Do not swallow or inject this medicine</strong> until speaking with your doctor or pharmacist.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
              <span>Check the <strong>Safe Alternatives</strong> recommended by MediSafe AI below for safer options.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</span>
              <span>If you are already feeling sick, short of breath, or swollen, call emergency services immediately.</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          <a
            href="tel:911"
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C53030] hover:bg-[#9B2C2C] text-white font-bold text-sm shadow-md transition-all"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call Emergency / Helpline</span>
          </a>

          <button
            onClick={() => {
              setEmergencyAlert(null);
              setActiveTab('risk-checker');
            }}
            className="w-full sm:w-auto px-5 py-3 rounded-full bg-white hover:bg-[#F3EFE6] text-[#18231C] font-bold text-sm border-2 border-[#18231C] transition"
          >
            <HeartHandshake className="w-4 h-4 inline mr-1.5 text-[#235339]" />
            View Safe Alternatives
          </button>
        </div>
      </div>
    </div>
  );
}
