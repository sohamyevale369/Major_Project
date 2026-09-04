import React, { useState } from 'react';
import {
  History,
  Search,
  Filter,
  Pill,
  ArrowRight,
  Printer,
  ShieldCheck,
  AlertTriangle,
  AlertOctagon,
  Download,
  Calendar,
  Clock
} from 'lucide-react';
import { useHealth } from '../../context/HealthContext';
import RiskBadge from '../common/RiskBadge';

export default function MedicationHistoryView() {
  const { medicationHistory, setActiveTab, runSafetyCheck } = useHealth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLevel, setFilterLevel] = useState('ALL');

  const filteredHistory = medicationHistory.filter(item => {
    const matchesSearch = item.medicineName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.primaryAlert.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterLevel === 'ALL' || item.riskLevel.toUpperCase() === filterLevel;
    return matchesSearch && matchesFilter;
  });

  const highRiskCount = medicationHistory.filter(m => m.riskLevel === 'HIGH').length;
  const safeCount = medicationHistory.filter(m => m.riskLevel === 'LOW').length;

  const handleRecheck = (item) => {
    runSafetyCheck(item.medicineName, item.dosage);
    setActiveTab('risk-checker');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mediteal-500/10 border border-mediteal-500/20 text-mediteal-300 text-xs font-semibold mb-2">
            <History className="w-3.5 h-3.5" />
            <span>Medication Safety Records</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Medication History & Prediction Logs
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Track all previously analyzed prescriptions, risk evaluations, and safety verdicts.
          </p>
        </div>

        <button
          onClick={() => {
            setActiveTab('report');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-mediteal-500/20 hover:bg-mediteal-500/30 text-mediteal-300 text-xs font-bold border border-mediteal-500/40 transition w-fit"
        >
          <Printer className="w-4 h-4" />
          <span>Generate Full Safety Report</span>
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
          <div className="text-xs font-semibold text-slate-400">Total Checked</div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-1">
            {medicationHistory.length}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Logged prescriptions</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
          <div className="text-xs font-semibold text-rose-400">High Risk Flagged</div>
          <div className="text-2xl sm:text-3xl font-black text-rose-400 font-mono mt-1">
            {highRiskCount}
          </div>
          <div className="text-[11px] text-rose-300/80 mt-1">Contraindications blocked</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
          <div className="text-xs font-semibold text-emerald-400">Safe Profile Checks</div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono mt-1">
            {safeCount}
          </div>
          <div className="text-[11px] text-emerald-300/80 mt-1">Low risk approvals</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
          <div className="text-xs font-semibold text-sky-400">Safety Index</div>
          <div className="text-2xl sm:text-3xl font-black text-sky-400 font-mono mt-1">
            100%
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Explainability coverage</div>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by drug name or reason..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:border-mediteal-400 focus:outline-none"
          />
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs text-slate-400 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            Filter:
          </span>
          {['ALL', 'HIGH', 'LOW'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setFilterLevel(lvl)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                filterLevel === lvl
                  ? 'bg-mediteal-500 text-slate-950 font-bold'
                  : 'bg-slate-950 text-slate-300 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {lvl === 'ALL' ? 'All Records' : `${lvl} Risk`}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filteredHistory.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-slate-900/60 border border-slate-800 text-slate-400 text-xs">
            No medication history records found matching your filters.
          </div>
        ) : (
          filteredHistory.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5">
                  <h3 className="text-base font-bold text-white">
                    {item.medicineName}
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">
                    ({item.dosage})
                  </span>
                  <RiskBadge level={item.riskLevel} score={item.riskScore} size="sm" />
                </div>

                <div className="text-xs text-slate-300">
                  <strong className="text-slate-400 font-normal">Primary Clinical Finding:</strong>{' '}
                  <span className="font-semibold text-slate-200">{item.primaryAlert}</span>
                </div>

                <div className="flex items-center gap-4 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {item.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {item.time}
                  </span>
                  <span className="px-2 py-0.2 rounded-full bg-slate-800 text-slate-300 font-mono text-[10px]">
                    Status: {item.status}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleRecheck(item)}
                className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition shrink-0"
              >
                <span>Re-Analyze</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
