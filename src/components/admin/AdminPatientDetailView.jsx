import React, { useState } from 'react';
import {
  ArrowLeft,
  User,
  HeartPulse,
  AlertTriangle,
  ShieldCheck,
  Pill,
  Calendar,
  Clock,
  Trash2,
  Save,
  Printer,
  Plus,
  X,
  Lock,
  Mail,
  Activity,
  FileText,
  CheckCircle2,
  Database
} from 'lucide-react';
import { useHealth } from '../../context/HealthContext';
import { COMMON_MEDICATIONS, ALLERGY_LIST, DISEASE_LIST } from '../../data/drugDatabase';
import { getUserTasksKey, loadUserSessionTasks } from '../../data/userStorage';
import RiskBadge from '../common/RiskBadge';

export default function AdminPatientDetailView({ patient, onBack }) {
  const {
    currentUser,
    adminUpdatePatientRecord,
    changeUserStatus,
    removeUser,
    auditLogs = [],
    showToast
  } = useHealth();

  if (!patient) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center space-y-4">
        <p className="text-sm text-[#6F7771]">No patient record selected.</p>
        <button onClick={onBack} className="pill-btn-primary text-xs py-2 px-4">
          ← Back to Admin Console
        </button>
      </div>
    );
  }

  // Load this specific patient's isolated tasks and evaluations
  const patientTasksKey = getUserTasksKey(patient);
  const patientTasks = loadUserSessionTasks(patient) || {};
  
  // Fallback for Netra's pre-seeded evaluations if not in localStorage
  const getInitialHistory = () => {
    if (patientTasks.medicationHistory && patientTasks.medicationHistory.length > 0) {
      return patientTasks.medicationHistory;
    }
    if (patient.email?.toLowerCase().includes('netra')) {
      return [
        {
          id: 'hist-netra-1',
          date: '2026-09-07',
          time: '10:58 PM',
          medicineName: 'Amoxicillin Trihydrate',
          dosage: '500mg',
          riskScore: 35,
          riskLevel: 'MEDIUM',
          primaryAlert: 'Routine Safety Evaluation',
          status: 'Evaluated Safe'
        },
        {
          id: 'hist-netra-2',
          date: '2026-09-07',
          time: '10:51 PM',
          medicineName: 'Lisinopril',
          dosage: '10mg',
          riskScore: 12,
          riskLevel: 'LOW',
          primaryAlert: 'Routine Safety Evaluation',
          status: 'Evaluated Safe'
        }
      ];
    }
    return [];
  };

  const patientHistory = getInitialHistory();

  // Local editable state for patient record
  const [formData, setFormData] = useState({
    name: patient.name || '',
    email: patient.email || '',
    age: patient.age !== undefined ? Number(patient.age) : 40,
    gender: patient.gender || 'Not specified',
    weight: patient.weight !== undefined ? Number(patient.weight) : 70,
    status: patient.status || 'Active',
    notes: patient.notes || '',
    chronicDiseases: Array.isArray(patient.chronicDiseases) ? [...patient.chronicDiseases] : (Array.isArray(patient.diseases) ? [...patient.diseases] : []),
    allergies: Array.isArray(patient.allergies) ? [...patient.allergies] : [],
    currentMedicines: Array.isArray(patient.currentMedicines) ? [...patient.currentMedicines] : []
  });

  const [newDisease, setNewDisease] = useState('');
  const [newAllergy, setNewAllergy] = useState('');
  const [newMedName, setNewMedName] = useState('');
  const [newMedDose, setNewMedDose] = useState('');
  const [newMedFreq, setNewMedFreq] = useState('Once daily');
  const [isSaving, setIsSaving] = useState(false);

  // Disease management
  const handleAddDisease = (disease) => {
    const val = disease.trim();
    if (val && !formData.chronicDiseases.includes(val)) {
      setFormData(prev => ({
        ...prev,
        chronicDiseases: [...prev.chronicDiseases, val]
      }));
      setNewDisease('');
    }
  };

  const handleRemoveDisease = (index) => {
    setFormData(prev => ({
      ...prev,
      chronicDiseases: prev.chronicDiseases.filter((_, idx) => idx !== index)
    }));
  };

  // Allergy management
  const handleAddAllergy = (allergy) => {
    const val = allergy.trim();
    if (val && !formData.allergies.includes(val)) {
      setFormData(prev => ({
        ...prev,
        allergies: [...prev.allergies, val]
      }));
      setNewAllergy('');
    }
  };

  const handleRemoveAllergy = (index) => {
    setFormData(prev => ({
      ...prev,
      allergies: prev.allergies.filter((_, idx) => idx !== index)
    }));
  };

  // Medication management
  const handleAddMedication = () => {
    if (!newMedName.trim()) return;
    const newMed = {
      name: newMedName.trim(),
      dosage: newMedDose.trim() || 'Standard dose',
      frequency: newMedFreq.trim() || 'Daily'
    };
    setFormData(prev => ({
      ...prev,
      currentMedicines: [...prev.currentMedicines, newMed]
    }));
    setNewMedName('');
    setNewMedDose('');
    setNewMedFreq('Once daily');
  };

  const handleRemoveMedication = (index) => {
    setFormData(prev => ({
      ...prev,
      currentMedicines: prev.currentMedicines.filter((_, idx) => idx !== index)
    }));
  };

  // Save changes to database
  const handleSavePatientRecord = () => {
    setIsSaving(true);
    const hasProfileNow = Boolean(
      formData.chronicDiseases.length > 0 ||
      formData.allergies.length > 0 ||
      formData.currentMedicines.length > 0
    );

    const updates = {
      name: formData.name.trim(),
      age: Number(formData.age),
      gender: formData.gender,
      weight: Number(formData.weight),
      status: formData.status,
      notes: formData.notes,
      chronicDiseases: formData.chronicDiseases,
      diseases: formData.chronicDiseases,
      allergies: formData.allergies,
      currentMedicines: formData.currentMedicines,
      hasUpdatedProfile: hasProfileNow
    };

    if (adminUpdatePatientRecord) {
      adminUpdatePatientRecord(patient.id, updates);
    }

    setTimeout(() => {
      setIsSaving(false);
      showToast(`Updated individual patient record for ${formData.name}`, 'success');
    }, 300);
  };

  // Toggle active / suspended status
  const handleToggleStatus = () => {
    const nextStatus = formData.status === 'Active' ? 'Suspended' : 'Active';
    setFormData(prev => ({ ...prev, status: nextStatus }));
    changeUserStatus(patient.id, nextStatus);
  };

  // Delete patient
  const handleDeletePatient = () => {
    if (window.confirm(`Are you sure you want to permanently delete patient "${patient.name}"? All associated clinical records and storage will be removed.`)) {
      removeUser(patient.id);
      onBack();
    }
  };

  // Filter audit logs for this patient
  const patientAuditLogs = (auditLogs || []).filter(log => {
    const text = (log.details || '').toLowerCase() + (log.user || '').toLowerCase();
    const pName = (patient.name || '').toLowerCase();
    const pEmail = (patient.email || '').toLowerCase();
    return text.includes(pName) || text.includes(pEmail) || text.includes(patient.id);
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 bg-[#F6F4ED] text-[#18231C]">
      
      {/* Top Back Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#235339] hover:underline mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Patients Directory & Admin Console</span>
          </button>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="section-tag">ADMINISTRATIVE PATIENT DOSSIER</span>
            <span className="text-xs text-[#6F7771] font-mono">ID: {patient.id}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#18231C] tracking-tight uppercase mt-1">
            {formData.name || 'Patient Record'}
          </h1>
          <p className="text-xs sm:text-sm text-[#5A645D]">
            Individual patient record, clinical health profile, and isolated safety evaluation logs.
          </p>
        </div>

        {/* Quick Top Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => window.print()}
            className="pill-btn-secondary text-xs py-2 px-3.5 flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Dossier</span>
          </button>

          <button
            onClick={handleToggleStatus}
            className={`px-3 py-2 rounded-full text-xs font-bold border transition cursor-pointer ${
              formData.status === 'Active'
                ? 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
                : 'bg-[#E2EFE7] text-[#235339] border-[#235339]/40 hover:bg-[#D4E8DC]'
            }`}
          >
            {formData.status === 'Active' ? 'Suspend Account' : 'Activate Account'}
          </button>

          <button
            onClick={handleSavePatientRecord}
            disabled={isSaving}
            className="pill-btn-primary text-xs py-2 px-4 flex items-center gap-1.5 shadow-sm"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? 'Saving…' : 'Save Patient Record'}</span>
          </button>
        </div>
      </div>

      {/* Storage Partition Isolation Badge */}
      <div className="p-4 rounded-2xl bg-white border border-[#E5DFD1] flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#E2EFE7] text-[#235339] flex items-center justify-center shrink-0">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#18231C] flex items-center gap-2">
              <span>Individual Patient Storage Partition</span>
              <span className="px-2 py-0.2 rounded-full bg-[#E2EFE7] text-[#1E5034] text-[10px] font-mono font-bold uppercase">
                Isolated
              </span>
            </div>
            <div className="text-[11px] text-[#6F7771] font-mono mt-0.5">
              Storage Key: <strong className="text-[#235339]">{patientTasksKey}</strong>
            </div>
          </div>
        </div>

        <div className="text-xs text-[#5A645D] flex items-center gap-4">
          <div>
            Registered: <strong className="text-[#18231C]">{patient.registeredAt ? new Date(patient.registeredAt).toLocaleDateString() : 'Initial'}</strong>
          </div>
          <div className="flex items-center gap-1.5">
            Status:
            <span className={`inline-flex items-center gap-1 px-2 py-0.2 rounded-full font-bold text-[10px] ${
              formData.status === 'Active' ? 'bg-[#E2EFE7] text-[#1E5034]' : 'bg-rose-100 text-rose-800'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${formData.status === 'Active' ? 'bg-[#235339]' : 'bg-rose-600'}`} />
              {formData.status}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Clinical Profile & Medical Data */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 1. Personal Demographics Form */}
          <div className="ivory-card p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5DFD1]">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#235339]" />
                <h3 className="text-sm font-bold text-[#18231C] uppercase tracking-wide">
                  Demographics & Account Details
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold uppercase text-[#6F7771]">
                Admin Editable
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-[#18231C] font-bold mb-1">Full Legal Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="ivory-input w-full px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-[#18231C] font-bold mb-1">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  readOnly
                  className="ivory-input w-full px-3 py-2 bg-[#ECE7DC] text-[#6F7771] cursor-not-allowed font-mono"
                  title="Email serves as primary normalized lookup key and cannot be altered"
                />
              </div>

              <div>
                <label className="block text-[#18231C] font-bold mb-1">Patient Age (years)</label>
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={formData.age}
                  onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                  className="ivory-input w-full px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-[#18231C] font-bold mb-1">Biological Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))}
                  className="ivory-input w-full px-3 py-2"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other / Not specified</option>
                </select>
              </div>

              <div>
                <label className="block text-[#18231C] font-bold mb-1">Body Weight (kg)</label>
                <input
                  type="number"
                  min="10"
                  max="300"
                  value={formData.weight}
                  onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                  className="ivory-input w-full px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-[#18231C] font-bold mb-1">Account Classification</label>
                <div className="px-3 py-2 rounded-xl bg-[#F3EFE6] border border-[#D5CDBF] text-[#4F5752] font-semibold">
                  {patient.isNewUser ? 'Newly Registered User' : 'Pre-existing Seed Patient'}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[#18231C] font-bold mb-1">Clinical & Administrative Notes</label>
                <textarea
                  rows="2"
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Record hospital notes, compliance audit notes, or doctor remarks..."
                  className="ivory-input w-full px-3 py-2 text-xs"
                />
              </div>
            </div>
          </div>

          {/* 2. Diagnosed Chronic Conditions */}
          <div className="ivory-card p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5DFD1]">
              <div className="flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-[#235339]" />
                <h3 className="text-sm font-bold text-[#18231C] uppercase tracking-wide">
                  Diagnosed Chronic Diseases ({formData.chronicDiseases.length})
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold text-[#6F7771]">
                Isolated to {formData.name}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {formData.chronicDiseases.length === 0 ? (
                <span className="text-xs text-[#8C938D] italic">No diagnosed conditions recorded for this patient.</span>
              ) : (
                formData.chronicDiseases.map((d, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-900 border border-rose-200 text-xs font-semibold"
                  >
                    <span>{d}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveDisease(i)}
                      className="text-rose-600 hover:text-rose-900 hover:bg-rose-200/60 rounded-full p-0.5 transition"
                      title="Remove condition"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))
              )}
            </div>

            {/* Add Condition Input */}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                value={newDisease}
                onChange={(e) => setNewDisease(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddDisease(newDisease);
                  }
                }}
                placeholder="Add chronic illness (e.g. Hypertension, Diabetes, CKD)..."
                className="ivory-input flex-1 px-3 py-2 text-xs"
              />
              <button
                type="button"
                onClick={() => handleAddDisease(newDisease)}
                className="pill-btn-secondary text-xs py-2 px-3 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* 3. Known Drug Allergies */}
          <div className="ivory-card p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5DFD1]">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-700" />
                <h3 className="text-sm font-bold text-[#18231C] uppercase tracking-wide">
                  Documented Drug Allergies ({formData.allergies.length})
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold text-[#6F7771]">
                Severe Contraindications
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {formData.allergies.length === 0 ? (
                <span className="text-xs text-[#235339] font-medium bg-[#E2EFE7] px-3 py-1 rounded-full">
                  ✓ No drug allergies reported (Clear)
                </span>
              ) : (
                formData.allergies.map((a, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-950 border border-amber-300 text-xs font-semibold"
                  >
                    <span>⚠ {a}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveAllergy(i)}
                      className="text-amber-800 hover:text-amber-950 hover:bg-amber-200/60 rounded-full p-0.5 transition"
                      title="Remove allergy"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))
              )}
            </div>

            {/* Add Allergy Input */}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                value={newAllergy}
                onChange={(e) => setNewAllergy(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddAllergy(newAllergy);
                  }
                }}
                placeholder="Add drug allergy (e.g. Sulfa Drugs, Penicillin, Aspirin)..."
                className="ivory-input flex-1 px-3 py-2 text-xs"
              />
              <button
                type="button"
                onClick={() => handleAddAllergy(newAllergy)}
                className="pill-btn-secondary text-xs py-2 px-3 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* 4. Active Medications / Prescriptions */}
          <div className="ivory-card p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5DFD1]">
              <div className="flex items-center gap-2">
                <Pill className="w-4 h-4 text-[#235339]" />
                <h3 className="text-sm font-bold text-[#18231C] uppercase tracking-wide">
                  Active Prescriptions ({formData.currentMedicines.length})
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold text-[#6F7771]">
                Monitored Regimen
              </span>
            </div>

            <div className="space-y-2">
              {formData.currentMedicines.length === 0 ? (
                <span className="text-xs text-[#8C938D] italic">No active prescriptions recorded for this patient.</span>
              ) : (
                formData.currentMedicines.map((m, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-white border border-[#D5CDBF] flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#E2EFE7] text-[#235339] font-black flex items-center justify-center text-[10px]">
                        ✓
                      </span>
                      <strong className="text-[#18231C]">{m.name}</strong>
                      <span className="text-[#6F7771] font-mono">({m.dosage})</span>
                      <span className="text-[#1E5034] font-medium">• {m.frequency}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveMedication(i)}
                      className="text-[#8C938D] hover:text-rose-600 p-1 rounded-full transition cursor-pointer"
                      title="Remove prescription"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Add Medication Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-2">
              <input
                type="text"
                value={newMedName}
                onChange={(e) => setNewMedName(e.target.value)}
                placeholder="Medicine Name..."
                className="ivory-input sm:col-span-2 px-3 py-2 text-xs"
              />
              <input
                type="text"
                value={newMedDose}
                onChange={(e) => setNewMedDose(e.target.value)}
                placeholder="Dose (e.g. 10mg)..."
                className="ivory-input px-3 py-2 text-xs"
              />
              <button
                type="button"
                onClick={handleAddMedication}
                className="pill-btn-secondary text-xs py-2 px-3 flex items-center justify-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Med</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right Col: Individual Evaluation History & Audit */}
        <div className="space-y-6">
          
          {/* Individual Safety Evaluation Logs */}
          <div className="ivory-card p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5DFD1]">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#235339]" />
                <h3 className="text-sm font-bold text-[#18231C] uppercase tracking-wide">
                  Medication Check Logs
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-[#235339]">
                {patientHistory.length} Recorded
              </span>
            </div>

            {patientHistory.length === 0 ? (
              <div className="p-6 text-center rounded-2xl bg-[#F6F4ED] border border-[#E5DFD1] text-xs text-[#6F7771] space-y-1">
                <strong className="text-[#18231C] block">No Safety Evaluations Yet</strong>
                <p>This patient has not performed or generated any medication risk evaluations in this session.</p>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
                {patientHistory.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className="p-3.5 rounded-2xl bg-white border border-[#D5CDBF] space-y-1.5 shadow-2xs hover:border-[#235339] transition"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <strong className="text-xs text-[#18231C]">{item.medicineName}</strong>
                      <RiskBadge level={item.riskLevel} score={item.riskScore} size="sm" />
                    </div>

                    <div className="text-[11px] text-[#5A645D]">
                      Dosage: <span className="font-mono text-[#18231C]">{item.dosage || 'Standard'}</span> • {item.primaryAlert || item.status}
                    </div>

                    <div className="text-[10px] text-[#8C938D] flex items-center justify-between pt-1 border-t border-[#ECE7DC]">
                      <span className="flex items-center gap-1 font-mono">
                        <Calendar className="w-2.5 h-2.5" />
                        {item.date} {item.time}
                      </span>
                      <span className="font-bold text-[#235339]">{item.status || 'Evaluated'}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Individual System Audit Trail */}
          <div className="ivory-card p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5DFD1]">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#235339]" />
                <h3 className="text-sm font-bold text-[#18231C] uppercase tracking-wide">
                  Account Audit Trail
                </h3>
              </div>
              <span className="text-[10px] font-mono text-[#6F7771]">Isolated Events</span>
            </div>

            <div className="space-y-2 text-xs max-h-56 overflow-y-auto pr-1">
              {patientAuditLogs.length === 0 ? (
                <div className="text-[#8C938D] text-xs italic">No specific audit entries logged for this account.</div>
              ) : (
                patientAuditLogs.map((log) => (
                  <div key={log.id} className="p-2.5 rounded-xl bg-[#F6F4ED] border border-[#E5DFD1] space-y-0.5">
                    <div className="flex items-center justify-between font-bold text-[#18231C] text-[11px]">
                      <span>{log.action}</span>
                      <span className="text-[10px] text-[#6F7771] font-mono">
                        {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-[10px] text-[#5A645D] leading-snug">{log.details}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Danger Zone: Account Deletion */}
          <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 space-y-3">
            <div className="flex items-center gap-2 text-rose-900 font-bold text-xs">
              <Trash2 className="w-4 h-4 text-rose-700" />
              <span>Permanent Record Removal</span>
            </div>
            <p className="text-[11px] text-rose-800 leading-relaxed">
              Deleting this patient will permanently purge their credentials, health profile, and individual evaluation history from the database.
            </p>
            <button
              onClick={handleDeletePatient}
              className="w-full py-2 px-3 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition cursor-pointer shadow-xs"
            >
              Delete Patient Account & Records
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
