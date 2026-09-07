import React, { useState, useEffect } from 'react';
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
  ShieldCheck,
  LogOut,
  Shield,
  FileText
} from 'lucide-react';
import { useHealth } from '../../context/HealthContext';
import { DISEASE_LIST, ALLERGY_LIST } from '../../data/drugDatabase';

export default function HealthProfileView() {
  const { patient, updatePatient, loadPatientPreset, setActiveTab, activePatients = [], currentUser, logout, showToast } = useHealth();

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

  // Keep formData synchronized with active patient record
  useEffect(() => {
    if (patient) {
      setFormData({
        name: patient.name || '',
        age: patient.age || 45,
        gender: patient.gender || 'Male',
        weight: patient.weight || 70,
        diseases: patient.diseases || [],
        allergies: patient.allergies || [],
        medicalHistory: patient.medicalHistory || '',
        currentMedicines: patient.currentMedicines || []
      });
    }
  }, [patient]);

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
      currentMedicines: prev.currentMedicines.filter((_, idx) => idx !== index)
    }));
  };

  const handleSave = () => {
    updatePatient(formData);
    showToast('Health Profile saved successfully!', 'success');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 bg-[#F6F4ED] text-[#18231C]">
      
      {/* Header Banner */}
      <div className="ivory-card p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div>
          <span className="section-tag mb-1">
            04 — HEALTH PROFILE // CLINICAL INPUT
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#18231C] tracking-tight uppercase">
            Personal Health Profile & History
          </h1>
          <p className="text-xs sm:text-sm text-[#5A645D] max-w-xl mt-1">
            This information becomes the direct input for personalized AI risk predictions, allergy cross-reactivity, and safe drug alternatives.
          </p>
        </div>

        {/* Clinical Case Presets for Clinicians */}
        {currentUser?.role !== 'patient' && activePatients.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-[#5A645D] font-bold">Case Presets:</span>
            {activePatients.map(p => (
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
                className={`px-3 py-1.5 rounded-full text-xs font-bold border transition ${
                  patient.id === p.id || patient.name === p.name
                    ? 'bg-[#235339] text-white border-[#235339]'
                    : 'bg-white text-[#4A554E] border-[#D5CDBF] hover:border-[#235339]'
                }`}
              >
                {p.name.split(' ')[0]} ({p.age}y)
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Editable Form Cards */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Section 1: Demographics */}
          <div className="ivory-card p-6 sm:p-7 shadow-sm">
            <h2 className="text-base font-black text-[#18231C] mb-4 flex items-center gap-2 uppercase tracking-tight">
              <User className="w-4 h-4 text-[#235339]" />
              1. Basic Demographics
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#18231C] mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="ivory-input w-full px-3.5 py-2 text-sm"
                  placeholder="e.g. Soham Vikas Yevale"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#18231C] mb-1.5">
                  Age (Years)
                </label>
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
                  className="ivory-input w-full px-3.5 py-2 text-sm"
                />
                {formData.age >= 65 && (
                  <span className="text-[10px] text-amber-800 font-bold block mt-1">
                    Senior Age Factor Active (+25% sensitivity)
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#18231C] mb-1.5">
                  Biological Gender
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="ivory-input w-full px-3.5 py-2 text-sm"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other / Non-binary</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#18231C] mb-1.5">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  min="10"
                  max="250"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: parseInt(e.target.value) || 0 })}
                  className="ivory-input w-full px-3.5 py-2 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Diagnosed Diseases & Conditions */}
          <div className="ivory-card p-6 sm:p-7 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-black text-[#18231C] flex items-center gap-2 uppercase tracking-tight">
                <HeartPulse className="w-4 h-4 text-rose-600" />
                2. Diagnosed Medical Conditions
              </h2>
              <span className="text-xs text-[#5A645D] font-mono font-bold">
                {formData.diseases.length} selected
              </span>
            </div>
            <p className="text-xs text-[#5A645D] mb-4">
              Select conditions you have. MediSafe AI uses these to detect Drug–Disease contraindications (e.g. Kidney Disease with Ibuprofen).
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {DISEASE_LIST.map((disease) => {
                const isSelected = formData.diseases.includes(disease);
                return (
                  <button
                    key={disease}
                    type="button"
                    onClick={() => toggleDisease(disease)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                      isSelected
                        ? 'bg-rose-100 text-rose-900 border border-rose-300 shadow-sm font-bold'
                        : 'bg-[#F3EFE6] text-[#4A554E] border border-[#D5CDBF] hover:border-[#235339]'
                    }`}
                  >
                    {isSelected ? <Check className="w-3.5 h-3.5 text-rose-700" /> : <Plus className="w-3.5 h-3.5 text-[#8D8678]" />}
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
                className="ivory-input flex-1 px-3.5 py-2 text-xs"
              />
              <button
                type="button"
                onClick={handleAddCustomDisease}
                className="pill-btn-secondary text-xs py-2 px-4"
              >
                Add Condition
              </button>
            </div>
          </div>

          {/* Section 3: Known Allergies */}
          <div className="ivory-card p-6 sm:p-7 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-black text-[#18231C] flex items-center gap-2 uppercase tracking-tight">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                3. Known Drug Allergies
              </h2>
              <span className="text-xs text-[#5A645D] font-mono font-bold">
                {formData.allergies.length} selected
              </span>
            </div>
            <p className="text-xs text-[#5A645D] mb-4">
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
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                      isSelected
                        ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-sm font-bold'
                        : 'bg-[#F3EFE6] text-[#4A554E] border border-[#D5CDBF] hover:border-[#235339]'
                    }`}
                  >
                    {isSelected ? <Check className="w-3.5 h-3.5 text-amber-700" /> : <Plus className="w-3.5 h-3.5 text-[#8D8678]" />}
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
                className="ivory-input flex-1 px-3.5 py-2 text-xs"
              />
              <button
                type="button"
                onClick={handleAddCustomAllergy}
                className="pill-btn-secondary text-xs py-2 px-4"
              >
                Add Allergy
              </button>
            </div>
          </div>

          {/* Section 4: Current Medications (Step 6: My Medicines) */}
          <div className="ivory-card p-6 sm:p-7 shadow-sm">
            <h2 className="text-base font-black text-[#18231C] mb-2 flex items-center gap-2 uppercase tracking-tight">
              <Pill className="w-4 h-4 text-[#235339]" />
              4. Current Medications Taken Regularly
            </h2>
            <p className="text-xs text-[#5A645D] mb-4">
              Medicines you already take. MediSafe AI checks these for Drug–Drug interactions whenever a new medicine is evaluated.
            </p>

            <div className="space-y-2 mb-4">
              {formData.currentMedicines.length === 0 ? (
                <div className="text-xs text-[#6A746C] italic p-3 rounded-xl bg-[#F3EFE6] border border-[#D5CDBF] text-center">
                  No active medicines listed. Add your regular prescriptions below.
                </div>
              ) : (
                formData.currentMedicines.map((med, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#F3EFE6] border border-[#D5CDBF] text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <Pill className="w-3.5 h-3.5 text-[#235339]" />
                      <strong className="text-[#18231C] text-sm">{med.name}</strong>
                      <span className="text-[#6A746C] font-mono">({med.dosage})</span>
                      <span className="text-[#5A645D]">• {med.frequency}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveCurrentMed(idx)}
                      className="text-rose-600 hover:text-rose-800 p-1"
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
                className="ivory-input px-3.5 py-2 text-xs"
              />
              <input
                type="text"
                value={newMedDosage}
                onChange={(e) => setNewMedDosage(e.target.value)}
                placeholder="Dosage (e.g. 5mg daily)"
                className="ivory-input px-3.5 py-2 text-xs"
              />
              <button
                type="button"
                onClick={handleAddCurrentMed}
                className="pill-btn-primary text-xs py-2 px-3 justify-center"
              >
                + Add Medicine
              </button>
            </div>
          </div>

          {/* Section 5: Medical History */}
          <div className="ivory-card p-6 sm:p-7 shadow-sm">
            <h2 className="text-base font-black text-[#18231C] mb-2 flex items-center gap-2 uppercase tracking-tight">
              <FileText className="w-4 h-4 text-[#235339]" />
              5. Past Medical & Surgical History (Optional)
            </h2>
            <textarea
              rows={3}
              value={formData.medicalHistory}
              onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })}
              placeholder="e.g. Appendectomy in 2018, family history of hypertension..."
              className="ivory-input w-full p-3 text-xs"
            />
          </div>

          {/* Save Button Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleSave}
              className="pill-btn-primary w-full sm:w-auto flex-1 py-3.5 text-sm font-bold shadow-md"
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
              className="pill-btn-secondary w-full sm:w-auto py-3.5 text-sm font-bold"
            >
              Run Medicine Safety Check →
            </button>
          </div>

        </div>

        {/* Right Column: Live Profile Summary Card */}
        <div className="space-y-6">
          <div className="ivory-card p-6 sm:p-7 shadow-sm sticky top-24 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5DFD1]">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#6A746C]">
                ACTIVE HEALTH CARD
              </span>
              <ShieldCheck className="w-5 h-5 text-[#235339]" />
            </div>

            <div className="text-center pb-4 border-b border-[#E5DFD1]">
              <div className="w-16 h-16 rounded-2xl bg-[#235339] text-white text-2xl font-black flex items-center justify-center mx-auto mb-2 shadow-sm">
                {formData.name.charAt(0) || 'P'}
              </div>
              <h3 className="text-lg font-black text-[#18231C]">
                {formData.name || 'Patient Name'}
              </h3>
              <p className="text-xs text-[#5A645D]">
                {formData.age} years old • {formData.gender} • {formData.weight} kg
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[#6A746C] block font-bold mb-1">
                  Conditions ({formData.diseases.length}):
                </span>
                {formData.diseases.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {formData.diseases.map(d => (
                      <span key={d} className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-800 border border-rose-200 text-[11px]">
                        {d}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-[#8D8678] italic">None reported</span>
                )}
              </div>

              <div>
                <span className="text-[#6A746C] block font-bold mb-1">
                  Known Allergies ({formData.allergies.length}):
                </span>
                {formData.allergies.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {formData.allergies.map(a => (
                      <span key={a} className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[11px]">
                        {a}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-[#235339] font-medium">None reported (Safe)</span>
                )}
              </div>

              <div>
                <span className="text-[#6A746C] block font-bold mb-1">
                  Active Prescriptions ({formData.currentMedicines.length}):
                </span>
                <ul className="space-y-1">
                  {formData.currentMedicines.map((m, i) => (
                    <li key={i} className="text-[#37423B] flex justify-between">
                      <span>• {m.name}</span>
                      <span className="text-[#6A746C] font-mono text-[10px]">{m.dosage}</span>
                    </li>
                  ))}
                  {formData.currentMedicines.length === 0 && <li className="text-[#8D8678] italic">None</li>}
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E5DFD1]">
              <div className="p-3 rounded-xl bg-[#E2EFE7] border border-[#C6DDD0] text-[11px] text-[#1E5034]">
                <strong>AI Ready:</strong> Updates here instantly synchronize with the explainable risk engine.
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
