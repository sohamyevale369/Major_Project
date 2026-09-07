import React, { useState } from 'react';
import {
  RefreshCw,
  Plus,
  Trash2,
  AlertTriangle,
  AlertOctagon,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Pill,
  ArrowRight
} from 'lucide-react';
import { COMMON_MEDICATIONS, DRUG_DRUG_INTERACTIONS } from '../../data/drugDatabase';
import { checkMultiDrugInteractions } from '../../data/mockAI';
import RiskBadge from '../common/RiskBadge';

export default function DrugInteractionView() {
  const [medsList, setMedsList] = useState(['Warfarin', 'Aspirin']);
  const [inputDrug, setInputDrug] = useState('');
  const [interactions, setInteractions] = useState(() => checkMultiDrugInteractions(['Warfarin', 'Aspirin']));

  const handleAddDrug = (name) => {
    const trimmed = name.trim();
    if (trimmed && !medsList.some(m => m.toLowerCase() === trimmed.toLowerCase())) {
      const updated = [...medsList, trimmed];
      setMedsList(updated);
      setInteractions(checkMultiDrugInteractions(updated));
      setInputDrug('');
    }
  };

  const handleRemoveDrug = (index) => {
    const updated = medsList.filter((_, i) => i !== index);
    setMedsList(updated);
    setInteractions(checkMultiDrugInteractions(updated));
  };

  const handleLoadCombo = (combo) => {
    setMedsList(combo);
    setInteractions(checkMultiDrugInteractions(combo));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8 bg-[#F6F4ED] text-[#18231C]">
      
      <div>
        <span className="section-tag mb-1">
          12 — DRUG INTERACTIONS // MULTI-PILL SCANNER
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-[#18231C] tracking-tight uppercase">
          Multi-Drug Interaction Checker
        </h1>
        <p className="text-xs sm:text-sm text-[#5A645D] mt-1">
          Taking multiple pills simultaneously? MediSafe AI evaluates biochemical conflict pathways to prevent dangerous compounding toxicity.
        </p>
      </div>

      {/* 1-Click Combination Presets */}
      <div className="ivory-card p-4 sm:p-5 space-y-2 shadow-sm">
        <span className="text-xs font-mono font-bold text-[#6A746C] uppercase tracking-wider block">
          1-Click Presets to Test:
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleLoadCombo(['Warfarin', 'Aspirin'])}
            className="px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold hover:bg-rose-100 transition"
          >
            ⚠️ Warfarin + Aspirin (Severe Bleeding Hazard)
          </button>

          <button
            onClick={() => handleLoadCombo(['Lisinopril', 'Ibuprofen'])}
            className="px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold hover:bg-amber-100 transition"
          >
            ⚠️ Lisinopril + Ibuprofen (Kidney / BP Conflict)
          </button>

          <button
            onClick={() => handleLoadCombo(['Paracetamol (Acetaminophen)', 'Amoxicillin'])}
            className="px-3 py-1.5 rounded-full bg-[#E2EFE7] border border-[#C6DDD0] text-[#1E5034] text-xs font-bold hover:bg-[#D2E7DC] transition"
          >
            🟢 Paracetamol + Amoxicillin (Safe Combination)
          </button>
        </div>
      </div>

      {/* Active Combination Manager */}
      <div className="ivory-card p-6 sm:p-8 space-y-6 shadow-sm">
        <div>
          <h2 className="text-base font-black text-[#18231C] mb-1 flex items-center gap-2 uppercase tracking-tight">
            <Pill className="w-4 h-4 text-[#235339]" />
            Active Medicine Stack ({medsList.length})
          </h2>
          <p className="text-xs text-[#5A645D]">
            Add 2 or more medicines to check whether they can be safely ingested together.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {medsList.map((med, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#F3EFE6] border border-[#D5CDBF] text-[#18231C] text-xs font-bold"
            >
              <Pill className="w-3.5 h-3.5 text-[#235339]" />
              <span>{med}</span>
              <button
                onClick={() => handleRemoveDrug(idx)}
                className="text-[#6A746C] hover:text-rose-600 p-0.5 rounded transition"
                title="Remove"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          {medsList.length === 0 && (
            <div className="text-xs text-[#6A746C] italic py-2">
              No medications added. Enter drugs below to test.
            </div>
          )}
        </div>

        <div className="space-y-3 pt-2 border-t border-[#E5DFD1]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddDrug(inputDrug);
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={inputDrug}
              onChange={(e) => setInputDrug(e.target.value)}
              placeholder="Type drug name (e.g. Omeprazole, Warfarin, Ibuprofen)..."
              className="ivory-input flex-1 px-4 py-2.5 text-sm"
            />
            <button
              type="submit"
              className="pill-btn-primary text-xs py-2.5 px-5 font-bold"
            >
              <Plus className="w-4 h-4" />
              <span>Add to Stack</span>
            </button>
          </form>

          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-[#6A746C] text-[11px] mr-1 font-bold">Quick add:</span>
            {COMMON_MEDICATIONS.map(m => (
              <button
                key={m.id}
                type="button"
                onClick={() => handleAddDrug(m.name)}
                disabled={medsList.includes(m.name)}
                className="px-2.5 py-1 rounded-full bg-[#F3EFE6] hover:bg-[#ECE7DC] border border-[#D5CDBF] text-[#4A554E] text-[11px] font-semibold disabled:opacity-40"
              >
                + {m.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interaction Safety Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-[#18231C] uppercase tracking-tight">
            Interaction Safety Results
          </h3>
          <span className="text-xs text-[#5A645D] font-mono font-bold">
            {interactions.length} interaction(s) identified
          </span>
        </div>

        {interactions.length === 0 ? (
          <div className="sage-result-box p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#C6DDD0] text-[#1E5034] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6 text-[#235339]" />
            </div>
            <h4 className="text-base font-black text-[#18231C] uppercase">
              No Harmful Drug Interactions Detected
            </h4>
            <p className="text-xs sm:text-sm text-[#37423B] max-w-md mx-auto leading-relaxed">
              MediSafe AI reviewed the active medication stack ({medsList.join(' + ')}) against clinical pharmacology guidelines and found no severe clashes.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {interactions.map((item, idx) => {
              const isSevere = item.severity === 'SEVERE' || item.riskScore >= 80;
              const borderStyle = isSevere
                ? 'border-rose-200 bg-rose-50'
                : 'border-amber-200 bg-amber-50';

              return (
                <div
                  key={idx}
                  className={`p-6 rounded-3xl border ${borderStyle} shadow-sm space-y-4`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-800 bg-rose-100 px-2.5 py-0.5 rounded-full border border-rose-200">
                          {item.severity} Interaction
                        </span>
                        <RiskBadge level={isSevere ? 'HIGH' : 'MEDIUM'} score={item.riskScore} size="sm" />
                      </div>
                      <h4 className="text-xl font-black text-[#18231C] tracking-tight">
                        {item.drug1} + {item.drug2}
                      </h4>
                      <div className="text-xs text-[#4A554E] font-bold mt-0.5">
                        {item.summary}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-[#E5DFD1] text-xs space-y-1">
                    <strong className="text-[#18231C] block font-bold">
                      Biochemical Mechanism:
                    </strong>
                    <p className="text-[#5A645D] leading-relaxed">
                      {item.mechanism}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-rose-200 text-xs space-y-1">
                    <strong className="text-rose-800 block font-bold flex items-center gap-1.5">
                      <AlertOctagon className="w-4 h-4 text-rose-600 shrink-0" />
                      Clinical Action Required:
                    </strong>
                    <p className="text-rose-950 leading-relaxed font-medium">
                      {item.actionRequired}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
