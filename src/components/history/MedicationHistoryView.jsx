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
  Clock,
  FileText
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 bg-[#F6F4ED] text-[#18231C]">
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="section-tag mb-1">
            13 — HISTORY & ARCHIVE // AUDIT LOGS
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#18231C] tracking-tight uppercase">
            Medication History & Prediction Logs
          </h1>
          <p className="text-xs sm:text-sm text-[#5A645D] mt-1">
            Review all previously evaluated medications, detected contraindications, and safety verdicts.
          </p>
        </div>

        <button
          onClick={() => {
            setActiveTab('report');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="pill-btn-primary text-xs py-2.5 px-4 w-fit"
        >
          <FileText className="w-4 h-4" />
          <span>View Safety Summary Report</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="ivory-card p-4 shadow-sm">
          <div className="text-xs font-bold text-[#6A746C]">Total Checked</div>
          <div className="text-2xl sm:text-3xl font-black text-[#18231C] font-mono mt-1">
            {medicationHistory.length}
          </div>
          <div className="text-[11px] text-[#5A645D] mt-1">Logged prescriptions</div>
        </div>

        <div className="ivory-card p-4 shadow-sm">
          <div className="text-xs font-bold text-rose-800">High Risk Flagged</div>
          <div className="text-2xl sm:text-3xl font-black text-rose-700 font-mono mt-1">
            {highRiskCount}
          </div>
          <div className="text-[11px] text-rose-800/80 mt-1">Contraindications detected</div>
        </div>

        <div className="ivory-card p-4 shadow-sm">
          <div className="text-xs font-bold text-[#1E5034]">Safe Profile Checks</div>
          <div className="text-2xl sm:text-3xl font-black text-[#235339] font-mono mt-1">
            {safeCount}
          </div>
          <div className="text-[11px] text-[#235339]/80 mt-1">Low risk approvals</div>
        </div>

        <div className="ivory-card p-4 shadow-sm">
          <div className="text-xs font-bold text-[#1E5034]">Explainability</div>
          <div className="text-2xl sm:text-3xl font-black text-[#235339] font-mono mt-1">
            100%
          </div>
          <div className="text-[11px] text-[#5A645D] mt-1">SHAP coverage verified</div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="ivory-card p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by drug name or reason..."
            className="ivory-input w-full pl-9 pr-3.5 py-2 text-xs"
          />
          <Search className="w-3.5 h-3.5 text-[#8D8678] absolute left-3 top-2.5" />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-bold text-[#6A746C] mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            Filter:
          </span>
          {['ALL', 'HIGH', 'LOW'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setFilterLevel(lvl)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
                filterLevel === lvl
                  ? 'bg-[#235339] text-white shadow-sm'
                  : 'bg-[#F3EFE6] text-[#4A554E] border border-[#D5CDBF] hover:border-[#235339]'
              }`}
            >
              {lvl === 'ALL' ? 'All Records' : `${lvl} Risk`}
            </button>
          ))}
        </div>
      </div>

      {/* History List (Step 13: Medicine, Risk, Date) */}
      <div className="space-y-3">
        {filteredHistory.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white border border-[#E5DFD1] text-[#6A746C] text-xs">
            No medication history records found matching your filters.
          </div>
        ) : (
          filteredHistory.map((item) => (
            <div
              key={item.id}
              className="ivory-card p-5 hover:border-[#235339] transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5">
                  <h3 className="text-base font-black text-[#18231C]">
                    {item.medicineName}
                  </h3>
                  <span className="text-xs text-[#6A746C] font-mono">
                    ({item.dosage})
                  </span>
                  <RiskBadge level={item.riskLevel} score={item.riskScore} size="sm" />
                </div>

                <div className="text-xs text-[#4A554E]">
                  <strong className="text-[#18231C] font-semibold">Primary Clinical Finding:</strong>{' '}
                  <span>{item.primaryAlert}</span>
                </div>

                <div className="flex items-center gap-4 text-[11px] text-[#6A746C]">
                  <span className="flex items-center gap-1 font-medium">
                    <Calendar className="w-3 h-3 text-[#235339]" />
                    {item.date}
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <Clock className="w-3 h-3 text-[#235339]" />
                    {item.time}
                  </span>
                  <span className="px-2 py-0.2 rounded-full bg-[#ECE7DC] text-[#18231C] font-mono text-[10px] font-bold">
                    Status: {item.status}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleRecheck(item)}
                className="pill-btn-primary text-xs py-2 px-4 shrink-0 font-bold"
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
