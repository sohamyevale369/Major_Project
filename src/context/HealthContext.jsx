import React, { createContext, useContext, useState } from 'react';
import { SAMPLE_PATIENTS } from '../data/samplePatients';
import { evaluateMedicationSafety } from '../data/mockAI';

const HealthContext = createContext();

export function HealthProvider({ children }) {
  // Active patient profile - initialized with realistic senior profile for easy demo
  const [patient, setPatient] = useState(SAMPLE_PATIENTS[0]);

  // Active view: 'home' | 'dashboard' | 'risk-checker' | 'interactions' | 'ocr' | 'profile' | 'history' | 'report'
  const [activeTab, setActiveTab] = useState('home');

  // Pre-computed initial analysis so user sees immediate results if they navigate directly
  const initialAnalysis = evaluateMedicationSafety(
    SAMPLE_PATIENTS[0],
    'Ibuprofen',
    '400mg',
    'Twice daily with meals'
  );
  const [currentAnalysis, setCurrentAnalysis] = useState(initialAnalysis);

  // Medication History Log
  const [medicationHistory, setMedicationHistory] = useState([
    {
      id: 'hist-1',
      date: '2025-03-02',
      time: '10:30 AM',
      medicineName: 'Ibuprofen',
      dosage: '400mg',
      riskScore: 85,
      riskLevel: 'HIGH',
      primaryAlert: 'Kidney Disease + Senior Age (68) Contraindication',
      status: 'Avoided / Switched to Alternative'
    },
    {
      id: 'hist-2',
      date: '2025-02-14',
      time: '02:15 PM',
      medicineName: 'Paracetamol (Acetaminophen)',
      dosage: '500mg',
      riskScore: 18,
      riskLevel: 'LOW',
      primaryAlert: 'Safe for Kidney Profile with Liver Monitoring',
      status: 'Active / Prescribed'
    },
    {
      id: 'hist-3',
      date: '2025-01-20',
      time: '09:00 AM',
      medicineName: 'Lisinopril',
      dosage: '10mg',
      riskScore: 28,
      riskLevel: 'LOW',
      primaryAlert: 'Routine Antihypertensive — Mild Cough Monitored',
      status: 'Active / Prescribed'
    }
  ]);

  // Modals & Floating Tools
  const [emergencyAlert, setEmergencyAlert] = useState(null);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: 'Robert Jenkins',
    email: 'robert.jenkins@medisafe.care',
    role: 'patient',
    isGuest: false
  });

  // Global Toast
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Swaps patient profile to a pre-configured scenario
  const loadPatientPreset = (presetPatient) => {
    setPatient(presetPatient);
    const testMed = presetPatient.recommendedTestDrug || 'Paracetamol (Acetaminophen)';
    const newAnalysis = evaluateMedicationSafety(presetPatient, testMed);
    setCurrentAnalysis(newAnalysis);

    if (newAnalysis.allergyAlert) {
      setEmergencyAlert({
        title: 'Emergency Allergy Warning Detected',
        medicine: testMed,
        details: newAnalysis.allergyAlert.warning
      });
    }

    showToast(`Loaded profile for ${presetPatient.name} (${presetPatient.description})`, 'success');
  };

  // Update specific patient details
  const updatePatient = (updatedFields) => {
    setPatient(prev => {
      const updated = { ...prev, ...updatedFields };
      if (currentAnalysis?.medicineName) {
        const recheck = evaluateMedicationSafety(
          updated,
          currentAnalysis.medicineName,
          currentAnalysis.dosage,
          currentAnalysis.frequency
        );
        setCurrentAnalysis(recheck);
      }
      return updated;
    });
    showToast('Health profile updated successfully', 'success');
  };

  // Run analysis on a new medicine
  const runSafetyCheck = (medicineName, dosage, frequency) => {
    const analysis = evaluateMedicationSafety(patient, medicineName, dosage, frequency);
    setCurrentAnalysis(analysis);

    if (analysis.allergyAlert) {
      setEmergencyAlert({
        title: 'Allergy Conflict Detected!',
        medicine: medicineName,
        details: analysis.allergyAlert.warning
      });
    }

    const historyEntry = {
      id: `hist-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      medicineName: analysis.medicineName,
      dosage: analysis.dosage,
      riskScore: analysis.riskScore,
      riskLevel: analysis.riskLevel,
      primaryAlert: analysis.allergyAlert ? 'Severe Allergy' : (analysis.diseaseConflicts[0]?.disease || 'Routine Safety Evaluation'),
      status: analysis.riskLevel === 'HIGH' ? 'Flagged High Risk' : 'Evaluated Safe'
    };
    setMedicationHistory(prev => [historyEntry, ...prev]);

    return analysis;
  };

  return (
    <HealthContext.Provider
      value={{
        patient,
        setPatient,
        loadPatientPreset,
        updatePatient,
        activeTab,
        setActiveTab,
        currentAnalysis,
        setCurrentAnalysis,
        runSafetyCheck,
        medicationHistory,
        setMedicationHistory,
        emergencyAlert,
        setEmergencyAlert,
        isChatbotOpen,
        setIsChatbotOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        currentUser,
        setCurrentUser,
        toast,
        showToast,
        setToast
      }}
    >
      {children}
    </HealthContext.Provider>
  );
}

export function useHealth() {
  const context = useContext(HealthContext);
  if (!context) {
    throw new Error('useHealth must be used within a HealthProvider');
  }
  return context;
}
