import React from 'react';
import { 
  ShieldCheck, 
  User, 
  LogOut, 
  BrainCircuit, 
  Activity, 
  FileText, 
  Stethoscope, 
  Bell, 
  Database,
  ArrowRight,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export default function DashboardPreview({ user, onLogout }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8">
      {/* Top Navbar */}
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-mediteal-500 to-mediblue-600 flex items-center justify-center text-white font-bold">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-base text-white flex items-center gap-2">
              MediSafe AI <span className="text-xs px-2 py-0.5 rounded bg-mediteal-500/20 text-mediteal-300 font-normal">Console</span>
            </h2>
            <p className="text-xs text-slate-400">Authenticated Session Active</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-bold text-slate-200">{user?.name || 'Verified User'}</div>
            <div className="text-[11px] text-mediteal-400 capitalize">{user?.role || 'Clinician'} Account</div>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-500/20 hover:text-rose-300 border border-slate-700 text-xs font-semibold text-slate-300 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Success Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Authentication Successful!</h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Logged in as <span className="text-emerald-300 font-semibold">{user?.email}</span> with{' '}
                <span className="text-emerald-300 font-semibold capitalize">{user?.role}</span> security clearance.
              </p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors shrink-0"
          >
            Return to Login Screen
          </button>
        </div>

        {/* Quick Diagnostic Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase">AI Prescriptions Analyzed</span>
              <Activity className="w-4 h-4 text-mediteal-400" />
            </div>
            <div className="text-2xl font-extrabold text-white">1,492</div>
            <div className="text-xs text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 100% Zero Drug-Drug Conflicts
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase">Patient Data Encryption</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-extrabold text-white">AES-256 GCM</div>
            <div className="text-xs text-slate-400">
              HIPAA Audit logs encrypted & verified
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase">Active EHR Sync</span>
              <Database className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-extrabold text-white">Online</div>
            <div className="text-xs text-cyan-300">
              Fast Healthcare Interoperability Resources (FHIR)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
