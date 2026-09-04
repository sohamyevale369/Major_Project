import React, { useState } from 'react';
import {
  User,
  HeartPulse,
  AlertCircle,
  Pill,
  Save,
  RotateCcw,
  Sparkles,
  Plus,
  X,
  Check,
  ShieldCheck
} from 'lucide-react';
import { useHealth } from '../../context/HealthContext';
import { SAMPLE_PATIENTS } from '../../data/samplePatients';
import { DISEASE_LIST, ALLERGY_LIST } from '../../data/drugDatabase';

export default function HealthProfileView() {
  const { patient, updatePatient, loadPatientPreset, setActiveTab } = useHealth();

  const [formData, setFormData] = useState({
    name: patient.name || '',
    age: patient.age || 45,
    gender: patient.gender || 'Male',
    weight: patient.weight || 70,
    diseases: patient.diseases || [],
    allergies: patient.allergies || [],
    medicalHistory: patient.medicalHistory || '',
    currentMedicines: patient.currentMedicines || []
  });

  const [customDisease, setCustomDisease] = useState('');
  const [customAllergy, setCustomAllergy] = useState('');
  const [newMedName, setNewMedName] = useState('');
  const [newMedDosage, setNewMedDosage] = useState('');

  const toggleDisease = (disease) => {
    setFormData(prev => {
      const exists = prev.diseases.includes(disease);
      const nextDiseases = exists
        ? prev.diseases.filter(d => d !== disease)
        : [...prev.diseases, disease];
      return { ...prev, diseases: nextDiseases };
    });
  };

  const toggleAllergy = (allergy) => {
    setFormData(prev => {
      const exists = prev.allergies.includes(allergy);
      const nextAllergies = exists
        ? prev.allergies.filter(a => a !== allergy)
        : [...prev.allergies, allergy];
      return { ...prev, allergies: nextAllergies };
    });
  };

  const handleAddCustomDisease = (e) => {
    e.preventDefault();
    if (customDisease.trim() && !formData.diseases.includes(customDisease.trim())) {
      setFormData(prev => ({
        ...prev,
        diseases: [...prev.diseases, customDisease.trim()]
      }));
      setCustomDisease('');
    }
  };

  const handleAddCustomAllergy = (e) => {
    e.preventDefault();
    if (customAllergy.trim() && !formData.allergies.includes(customAllergy.trim())) {
      setFormData(prev => ({
        ...prev,
        allergies: [...prev.allergies, customAllergy.trim()]
      }));
      setCustomAllergy('');
    }
  };

  const handleAddCurrentMed = (e) => {
    e.preventDefault();
    if (newMedName.trim()) {
      setFormData(prev => ({
        ...prev,
        currentMedicines: [
          ...prev.currentMedicines,
          { name: newMedName.trim(), dosage: newMedDosage.trim() || 'Standard dose', frequency: 'Daily' }
        ]
      }));
      setNewMedName('');
      setNewMedDosage('');
    }
  };

  const handleRemoveCurrentMed = (index) => {
    setFormData(prev => ({
      ...prev,
      currentMedicines: prev.currentMedicines.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    updatePatient(formData);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      
      {/* Title & Quick Presets Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mediteal-500/10 border border-mediteal-500/20 text-mediteal-300 text-xs font-semibold mb-2">
            <User className="w-3.5 h-3.5" />
            <span>Personal Health Profile</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Patient Health Profile & Risk Baseline
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            MediSafe AI uses your age, chronic illnesses, and allergies to predict personal side effects.
          </p>
        </div>

        {/* 1-Click Preset Loaders */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Quick Demo Profiles:</span>
          {SAMPLE_PATIENTS.map(p => (
            <button
              key={p.id}
              onClick={() => {
                loadPatientPreset(p);
                setFormData({
                  name: p.name,
                  age: p.age,
                  gender: p.gender,
                  weight: p.weight,
                  diseases: p.diseases,
                  allergies: p.allergies,
                  medicalHistory: p.medicalHistory,
                  currentMedicines: p.currentMedicines
                });
              }}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition ${
                patient.id === p.id
                  ? 'bg-mediteal-500 text-slate-950 border-mediteal-400'
                  : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500'
              }`}
            >
              {p.name.split(' ')[0]} ({p.age}y)
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Editable Form */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Section 1: Demographics */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
            <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-mediteal-400" />
              1. Basic Demographics
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-mediteal-400 focus:outline-none"
                  placeholder="e.g. John Doe"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Age (Years)
                </label>
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-mediteal-400 focus:outline-none"
                />
                {formData.age >= 65 && (
                  <span className="text-[10px] text-amber-400 font-semibold block mt-1">
                    Senior Age Factor Active (+25% sensitivity)
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Biological Gender
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-mediteal-400 focus:outline-none"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other / Non-binary</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  min="10"
                  max="250"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: parseInt(e.target.value) || 0 })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-mediteal-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Diagnosed Diseases & Conditions */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-rose-400" />
                2. Diagnosed Medical Conditions
              </h2>
              <span className="text-xs text-slate-400 font-medium">
                {formData.diseases.length} selected
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Click conditions you have. MediSafe AI uses these to detect Drug–Disease contraindications (e.g. Kidney Disease with Ibuprofen).
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {DISEASE_LIST.map((disease) => {
                const isSelected = formData.diseases.includes(disease);
                return (
                  <button
                    key={disease}
                    type="button"
                    onClick={() => toggleDisease(disease)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                      isSelected
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50 shadow-sm'
                        : 'bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {isSelected ? <Check className="w-3.5 h-3.5 text-rose-400" /> : <Plus className="w-3.5 h-3.5 text-slate-500" />}
                    <span>{disease}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={customDisease}
                onChange={(e) => setCustomDisease(e.target.value)}
                placeholder="Type another condition (e.g. Glaucoma, Thyroid)..."
                className="flex-1 px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:border-mediteal-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddCustomDisease}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
              >
                Add Condition
              </button>
            </div>
          </div>

          {/* Section 3: Known Allergies */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                3. Known Drug Allergies
              </h2>
              <span className="text-xs text-slate-400 font-medium">
                {formData.allergies.length} selected
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Select allergies to prevent severe cross-reactions and emergency allergic responses.
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {ALLERGY_LIST.map((allergy) => {
                const isSelected = formData.allergies.includes(allergy);
                return (
                  <button
                    key={allergy}
                    type="button"
                    onClick={() => toggleAllergy(allergy)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                      isSelected
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm'
                        : 'bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {isSelected ? <Check className="w-3.5 h-3.5 text-amber-400" /> : <Plus className="w-3.5 h-3.5 text-slate-500" />}
                    <span>{allergy}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={customAllergy}
                onChange={(e) => setCustomAllergy(e.target.value)}
                placeholder="Type another allergy (e.g. Codeine, Erythromycin)..."
                className="flex-1 px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:border-mediteal-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddCustomAllergy}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
              >
                Add Allergy
              </button>
            </div>
          </div>

          {/* Section 4: Current Medications */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
            <h2 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <Pill className="w-4 h-4 text-sky-400" />
              4. Current Medications You Take Regularly
            </h2>
            <p className="text-xs text-slate-400 mb-4">
              Medicines you already take. MediSafe AI checks these for Drug–Drug interactions whenever a new medicine is evaluated.
            </p>

            <div className="space-y-2 mb-4">
              {formData.currentMedicines.length === 0 ? (
                <div className="text-xs text-slate-400 italic p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                  No active medicines listed.
                </div>
              ) : (
                formData.currentMedicines.map((med, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <Pill className="w-3.5 h-3.5 text-mediteal-400" />
                      <strong className="text-white text-sm">{med.name}</strong>
                      <span className="text-slate-400 font-mono">({med.dosage})</span>
                      <span className="text-slate-400">• {med.frequency}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveCurrentMed(idx)}
                      className="text-rose-400 hover:text-rose-300 p-1"
                      title="Remove medicine"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                type="text"
                value={newMedName}
                onChange={(e) => setNewMedName(e.target.value)}
                placeholder="Medicine name (e.g. Warfarin)"
                className="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:border-mediteal-400 focus:outline-none"
              />
              <input
                type="text"
                value={newMedDosage}
                onChange={(e) => setNewMedDosage(e.target.value)}
                placeholder="Dosage (e.g. 5mg daily)"
                className="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:border-mediteal-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddCurrentMed}
                className="px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold transition"
              >
                + Add Medicine
              </button>
            </div>
          </div>

          {/* Save Button Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              onClick={handleSave}
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-mediteal-500 to-mediblue-600 hover:from-mediteal-400 hover:to-mediblue-500 text-slate-950 font-bold text-sm shadow-xl shadow-mediteal-500/20 transition"
            >
              <Save className="w-4 h-4" />
              <span>Save & Update Health Profile</span>
            </button>

            <button
              type="button"
              onClick={() => {
                handleSave();
                setActiveTab('risk-checker');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition"
            >
              Run Medicine Safety Check →
            </button>
          </div>

        </div>

        {/* Right Column: Live Profile Summary Card */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border border-mediteal-500/30 bg-gradient-to-b from-slate-900 via-slate-900 to-mediteal-950/20 shadow-xl sticky top-24">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-mediteal-400">
                Active Health Card
              </span>
              <ShieldCheck className="w-5 h-5 text-mediteal-400" />
            </div>

            <div className="mt-4 text-center pb-4 border-b border-slate-800">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-mediteal-400 to-mediblue-500 text-slate-950 text-2xl font-black flex items-center justify-center mx-auto mb-2 shadow-lg">
                {formData.name.charAt(0) || 'P'}
              </div>
              <h3 className="text-lg font-bold text-white">
                {formData.name || 'Patient Name'}
              </h3>
              <p className="text-xs text-slate-400">
                {formData.age} years old • {formData.gender} • {formData.weight} kg
              </p>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block font-semibold mb-1">
                  Conditions ({formData.diseases.length}):
                </span>
                {formData.diseases.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {formData.diseases.map(d => (
                      <span key={d} className="px-2 py-0.5 rounded-md bg-rose-500/15 text-rose-300 border border-rose-500/30 text-[11px]">
                        {d}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-slate-400 italic">None reported</span>
                )}
              </div>

              <div>
                <span className="text-slate-400 block font-semibold mb-1">
                  Known Allergies ({formData.allergies.length}):
                </span>
                {formData.allergies.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {formData.allergies.map(a => (
                      <span key={a} className="px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[11px]">
                        {a}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-emerald-400 font-medium">No known allergies</span>
                )}
              </div>

              <div>
                <span className="text-slate-400 block font-semibold mb-1">
                  Current Medications ({formData.currentMedicines.length}):
                </span>
                {formData.currentMedicines.length > 0 ? (
                  <ul className="space-y-1">
                    {formData.currentMedicines.map((m, i) => (
                      <li key={i} className="text-slate-300 flex items-center justify-between">
                        <span>• {m.name}</span>
                        <span className="text-slate-400 font-mono text-[10px]">{m.dosage}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-slate-400 italic">No regular medications</span>
                )}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed">
              💡 <strong>How this helps you:</strong> When you test a pill, MediSafe AI automatically scans these conditions to protect you from kidney strain, allergic shock, or medicine clashes.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
