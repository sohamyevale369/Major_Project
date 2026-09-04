import React from 'react';
import { HelpCircle, Phone, Mail, FileQuestion, X, ShieldAlert } from 'lucide-react';

export default function HelpSupportModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-mediteal-500/20 text-mediteal-400 flex items-center justify-center border border-mediteal-500/30">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">
              MediSafe AI Clinical Support
            </h3>
            <p className="text-xs text-slate-400">
              24/7 Security Operations & Access Assistance
            </p>
          </div>
        </div>

        <div className="space-y-3 text-xs text-slate-300">
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
            <Mail className="w-4 h-4 text-mediteal-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-slate-200">Clinical Support Desk</div>
              <div className="text-slate-400 mt-0.5">support@medisafe.ai (Priority responses within 10 min)</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
            <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-slate-200">Emergency 2FA & Account Recovery</div>
              <div className="text-slate-400 mt-0.5">+1 (800) 555-MED-SAFE (Toll-Free Hospital Hotline)</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-slate-200">HIPAA Data Security Officer</div>
              <div className="text-slate-400 mt-0.5">dpo@medisafe.ai (For compliance & EHR interop queries)</div>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            Close Support Dialog
          </button>
        </div>
      </div>
    </div>
  );
}
