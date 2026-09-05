import React, { createContext, useContext, useState, useEffect } from 'react';
import { SAMPLE_PATIENTS } from '../data/samplePatients';
import { evaluateMedicationSafety } from '../data/mockAI';
import {
  getAllUsers,
  sanitizeUsers,
  getActiveUserSession,
  setActiveUserSession,
  authenticateUser,
  registerNewUser,
  deduplicateUserDatabase,
  updateUserDetails,
  deleteUserAccount,
  adminCreateUser,
  getSystemAuditLogs,
  logSystemActivity
} from '../data/userStorage';

const HealthContext = createContext();

export function HealthProvider({ children }) {
  // Authentication & Active User Session
  // User must be authenticated to perform clinical tasks
  const [currentUser, setCurrentUser] = useState(() => getActiveUserSession());

  // Database of users (both existing legacy users & newly registered users)
  const [users, setUsers] = useState(() => getAllUsers());
  const [auditLogs, setAuditLogs] = useState(() => getSystemAuditLogs());

  // Dynamic patient list strictly derived from live users database in real-time
  const activePatients = (users || [])
    .filter(u => u && u.role === 'patient')
    .map(u => ({
      id: u.id,
      name: u.name,
      age: u.age || 40,
      gender: u.gender || 'Not specified',
      weight: u.weight || 70,
      description: `${u.gender || 'Patient'}, ${u.age || 40}y — ${u.chronicDiseases?.join(', ') || 'No recorded conditions'}`,
      diseases: u.chronicDiseases || [],
      allergies: u.allergies || [],
      medicalHistory: u.medicalHistory || u.notes || 'Registered MediSafe clinical profile.',
      currentMedicines: u.currentMedicines || (u.chronicDiseases?.length ? [{ name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily' }] : []),
      recommendedTestDrug: u.recommendedTestDrug || (u.chronicDiseases?.length ? 'Ibuprofen' : 'Paracetamol (Acetaminophen)'),
      testScenarioTitle: `${u.name} Clinical Scenario`,
      testScenarioHighlight: `${u.chronicDiseases?.join(', ') || 'Standard Clinical Monitoring'}`
    }));

  // Active patient profile initialized from stored users
  const [patient, setPatient] = useState(() => {
    const initialUsers = getAllUsers();
    const patientUsers = initialUsers.filter(u => u && u.role === 'patient');
    if (patientUsers.length > 0) {
      const p0 = patientUsers[0];
      return {
        id: p0.id,
        name: p0.name,
        age: p0.age || 40,
        gender: p0.gender || 'Not specified',
        weight: p0.weight || 70,
        description: `${p0.gender || 'Patient'}, ${p0.age || 40}y — ${p0.chronicDiseases?.join(', ') || 'No recorded conditions'}`,
        diseases: p0.chronicDiseases || [],
        allergies: p0.allergies || [],
        medicalHistory: p0.medicalHistory || p0.notes || 'Registered MediSafe clinical profile.',
        currentMedicines: p0.currentMedicines || []
      };
    }
    return {
      id: 'usr-default',
      name: 'Clinical Patient Profile',
      age: 45,
      gender: 'Male',
      weight: 70,
      description: 'Active Patient Profile',
      diseases: [],
      allergies: [],
      medicalHistory: 'Clinical record.',
      currentMedicines: []
    };
  });

  // Active view: 'home' | 'dashboard' | 'risk-checker' | 'interactions' | 'ocr' | 'profile' | 'history' | 'report' | 'admin'
  const [activeTab, setActiveTab] = useState('home');

  // Pre-computed initial analysis
  const [currentAnalysis, setCurrentAnalysis] = useState(() =>
    evaluateMedicationSafety(
      patient,
      'Ibuprofen',
      '400mg',
      'Twice daily with meals'
    )
  );

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

  // Global Toast
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const refreshUsersAndLogs = () => {
    setUsers(getAllUsers());
    setAuditLogs(getSystemAuditLogs());
  };

  // Synchronize on mount directly from physical disk file src/data/users.json via dev server API
  useEffect(() => {
    if (typeof fetch !== 'undefined') {
      fetch('/api/users')
        .then(res => res.json())
        .then(diskUsers => {
          if (Array.isArray(diskUsers) && diskUsers.length > 0) {
            const sanitized = sanitizeUsers(diskUsers);
            setUsers(sanitized);
            try {
              localStorage.setItem('medisafe_users', JSON.stringify(sanitized));
            } catch (e) {}
          }
        })
        .catch(() => {});
    }
  }, []);

  // Sync active patient profile whenever users or currentUser changes in real-time
  useEffect(() => {
    const patientUsers = (users || []).filter(u => u && u.role === 'patient');

    if (patientUsers.length > 0) {
      // 1. If currentUser is a patient, make currentUser the active patient
      if (currentUser && currentUser.role === 'patient') {
        const found = patientUsers.find(u => u.email.toLowerCase() === currentUser.email.toLowerCase());
        if (found) {
          setPatient({
            id: found.id,
            name: found.name,
            age: found.age || 40,
            gender: found.gender || 'Not specified',
            weight: found.weight || 70,
            description: `${found.gender || 'Patient'}, ${found.age || 40}y — ${found.chronicDiseases?.join(', ') || 'No recorded conditions'}`,
            diseases: found.chronicDiseases || [],
            allergies: found.allergies || [],
            medicalHistory: found.medicalHistory || found.notes || 'Registered MediSafe profile.',
            currentMedicines: found.currentMedicines || []
          });
          return;
        }
      }

      // 2. Otherwise check if the current active patient still exists in database
      const stillExists = patientUsers.some(
        u => u.id === patient?.id || (u.name && patient?.name && u.name.toLowerCase() === patient.name.toLowerCase())
      );

      // 3. If patient was deleted from admin, switch immediately to the first remaining patient!
      if (!stillExists) {
        const next = patientUsers[0];
        const newPatient = {
          id: next.id,
          name: next.name,
          age: next.age || 40,
          gender: next.gender || 'Not specified',
          weight: next.weight || 70,
          description: `${next.gender || 'Patient'}, ${next.age || 40}y — ${next.chronicDiseases?.join(', ') || 'No recorded conditions'}`,
          diseases: next.chronicDiseases || [],
          allergies: next.allergies || [],
          medicalHistory: next.medicalHistory || next.notes || 'Registered MediSafe profile.',
          currentMedicines: next.currentMedicines || []
        };
        setPatient(newPatient);
        const testMed = newPatient.recommendedTestDrug || 'Paracetamol (Acetaminophen)';
        setCurrentAnalysis(evaluateMedicationSafety(newPatient, testMed));
      }
    } else {
      // If all patients were deleted, fallback to neutral general profile
      const fallback = {
        id: 'usr-default',
        name: currentUser?.name || 'General Patient',
        age: currentUser?.age || 45,
        gender: currentUser?.gender || 'Not specified',
        weight: 70,
        description: 'Active Patient Profile',
        diseases: [],
        allergies: [],
        medicalHistory: 'Clinical record.',
        currentMedicines: []
      };
      setPatient(fallback);
      setCurrentAnalysis(evaluateMedicationSafety(fallback, 'Paracetamol (Acetaminophen)'));
    }
  }, [users, currentUser]);

  // Authentication: Login with validation
  const login = (email, password) => {
    const result = authenticateUser(email, password);
    if (!result.success) {
      showToast(result.message, 'error');
      return result;
    }

    setCurrentUser(result.user);
    refreshUsersAndLogs();

    if (result.user.role === 'admin') {
      setActiveTab('admin');
      showToast(`Welcome Administrator ${result.user.name}`, 'success');
    } else {
      setActiveTab('dashboard');
      showToast(`Signed in successfully as ${result.user.role === 'clinician' ? 'Healthcare Clinician' : 'Patient'}`, 'success');
    }

    return result;
  };

  // Authentication: Register new user
  const register = (userData) => {
    try {
      const newUser = registerNewUser(userData);
      setActiveUserSession(newUser);
      setCurrentUser(newUser);
      refreshUsersAndLogs();

      if (newUser.role === 'admin') {
        setActiveTab('admin');
      } else {
        setActiveTab('dashboard');
      }

      showToast(`Account created successfully! Welcome, ${newUser.name}`, 'success');
      return { success: true, user: newUser };
    } catch (err) {
      showToast(err.message, 'error');
      return { success: false, message: err.message };
    }
  };

  // Authentication: Sign Out
  const logout = () => {
    if (currentUser) {
      logSystemActivity('User Sign Out', `User ended active session`, currentUser);
    }
    setActiveUserSession(null);
    setCurrentUser(null);
    setActiveTab('home');
    refreshUsersAndLogs();
    showToast('Signed out successfully. Task portal is locked until next login.', 'info');
  };

  // Admin: Deduplicate user database records
  const deduplicateUsers = () => {
    const report = deduplicateUserDatabase();
    refreshUsersAndLogs();
    if (report.duplicatesRemovedCount > 0) {
      showToast(`Deduplication complete: Removed ${report.duplicatesRemovedCount} duplicate record(s)!`, 'success');
    } else {
      showToast('Database integrity scan complete: No duplicate records found.', 'info');
    }
    return report;
  };

  // Admin: Toggle or change user status
  const changeUserStatus = (userId, newStatus) => {
    updateUserDetails(userId, { status: newStatus });
    refreshUsersAndLogs();
    showToast(`User status updated to ${newStatus}`, 'success');
  };

  // Admin: Delete user
  const removeUser = (userId) => {
    deleteUserAccount(userId);
    refreshUsersAndLogs();
    showToast('User record permanently removed from database', 'info');
  };

  // Admin: Manually add a user
  const adminAddUser = (userData) => {
    try {
      const user = adminCreateUser(userData);
      refreshUsersAndLogs();
      showToast(`Created account for ${user.name} (${user.role.toUpperCase()})`, 'success');
      return { success: true, user };
    } catch (err) {
      showToast(err.message, 'error');
      return { success: false, message: err.message };
    }
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

    if (currentUser) {
      logSystemActivity(
        'Medicine Risk Evaluated',
        `Evaluated ${medicineName} (${dosage || 'standard'}). Risk Score: ${analysis.riskScore}% (${analysis.riskLevel})`,
        currentUser
      );
    }

    return analysis;
  };

  return (
    <HealthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        login,
        register,
        logout,
        users,
        activePatients,
        auditLogs,
        refreshUsersAndLogs,
        deduplicateUsers,
        changeUserStatus,
        removeUser,
        adminAddUser,
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
