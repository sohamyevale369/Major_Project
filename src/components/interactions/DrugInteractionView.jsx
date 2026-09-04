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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-semibold mb-2">
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Multi-Medication Safety Scanner</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Drug–Drug Interaction Checker
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          Taking multiple pills together? MediSafe AI analyzes simultaneous pharmacology to prevent hazardous biochemical clashes.
        </p>
      </div>

      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
          1-Click Interaction Presets to Try:
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleLoadCombo(['Warfarin', 'Aspirin'])}
            className="px-3 py-1.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold hover:bg-rose-500/25 transition"
          >
            ⚠️ Warfarin + Aspirin (Severe Bleeding Hazard)
          </button>

          <button
            onClick={() => handleLoadCombo(['Lisinopril', 'Ibuprofen'])}
            className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold hover:bg-amber-500/25 transition"
          >
            ⚠️ Lisinopril + Ibuprofen (Kidney / BP Blunting)
          </button>

          <button
            onClick={() => handleLoadCombo(['Metformin', 'Ciprofloxacin'])}
            className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold hover:bg-slate-700 transition"
          >
            Metformin + Ciprofloxacin (Dysglycemia)
          </button>

          <button
            onClick={() => handleLoadCombo(['Paracetamol (Acetaminophen)', 'Amoxicillin'])}
            className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold hover:bg-emerald-500/25 transition"
          >
            🟢 Paracetamol + Amoxicillin (Safe Combination)
          </button>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
        <div>
          <h2 className="text-base font-bold text-white mb-2 flex items-center gap-2">
            <Pill className="w-4 h-4 text-mediteal-400" />
            Active Medication Combination List ({medsList.length})
          </h2>
          <p className="text-xs text-slate-400">
            Add at least 2 medications to check whether they can be safely swallowed together.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {medsList.map((med, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-semibold shadow-inner"
            >
              <Pill className="w-3.5 h-3.5 text-mediteal-400" />
              <span>{med}</span>
              <button
                onClick={() => handleRemoveDrug(idx)}
                className="text-slate-400 hover:text-rose-400 p-0.5 rounded transition"
                title="Remove"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          {medsList.length === 0 && (
            <div className="text-xs text-slate-400 italic py-2">
              No medications added. Add medications below to test.
            </div>
          )}
        </div>

        <div className="space-y-3 pt-2 border-t border-slate-800">
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
              placeholder="Type drug name (e.g. Omeprazole, Atorvastatin)..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-mediteal-400 focus:outline-none"
            />
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Add to Stack</span>
            </button>
          </form>

          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-400 text-[11px] mr-1">Or click to add:</span>
            {COMMON_MEDICATIONS.map(m => (
              <button
                key={m.id}
                type="button"
                onClick={() => handleAddDrug(m.name)}
                disabled={medsList.includes(m.name)}
                className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 text-[11px] disabled:opacity-40"
              >
                + {m.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">
            Interaction Safety Results
          </h3>
          <span className="text-xs text-slate-400">
            {interactions.length} interaction(s) identified
          </span>
        </div>

        {interactions.length === 0 ? (
          <div className="p-8 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white">
              No Harmful Drug Interactions Detected
            </h4>
            <p className="text-xs sm:text-sm text-emerald-200 max-w-md mx-auto leading-relaxed">
              MediSafe AI reviewed the active medication stack ({medsList.join(' + ')}) against known pharmacology databases and found no high-severity clashes.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {interactions.map((item, idx) => {
              const isSevere = item.severity === 'SEVERE' || item.riskScore >= 80;
              const borderStyle = isSevere
                ? 'border-rose-500/60 bg-gradient-to-b from-slate-900 via-slate-900 to-rose-950/30 shadow-rose-950/50'
                : 'border-amber-500/40 bg-gradient-to-b from-slate-900 via-slate-900 to-amber-950/20 shadow-amber-950/30';

              return (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl border ${borderStyle} shadow-xl space-y-4`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-500/20 px-2.5 py-0.5 rounded border border-rose-500/40">
                          {item.severity} Interaction
                        </span>
                        <RiskBadge level={isSevere ? 'HIGH' : 'MEDIUM'} score={item.riskScore} size="sm" />
                      </div>
                      <h4 className="text-xl font-bold text-white tracking-tight">
                        {item.drug1} + {item.drug2}
                      </h4>
                      <div className="text-xs text-slate-300 font-semibold mt-0.5">
                        {item.summary}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1">
                    <strong className="text-slate-200 block font-semibold">
                      Biochemical Mechanism:
                    </strong>
                    <p className="text-slate-300 leading-relaxed">
                      {item.mechanism}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs space-y-1">
                    <strong className="text-rose-300 block font-semibold flex items-center gap-1.5">
                      <AlertOctagon className="w-4 h-4 text-rose-400 shrink-0" />
                      Clinical Action Required:
                    </strong>
                    <p className="text-rose-100 leading-relaxed">
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
