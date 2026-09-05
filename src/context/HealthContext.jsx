import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
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

  // Strict resource visibility isolation:
  // Patients can NEVER view other patients' or doctors' records.
  // Clinicians can view patient medical records, but never other doctors or admin credentials.
  const visibleUsers = useMemo(() => {
    if (!currentUser) return [];
    if (currentUser.role === 'patient') {
      return (users || []).filter(u => u.email?.toLowerCase() === currentUser.email?.toLowerCase());
    }
    if (currentUser.role === 'clinician') {
      return (users || []).filter(u => u.role === 'patient');
    }
    return users || [];
  }, [users, currentUser]);

  // Dynamic patient list strictly derived from live users database in real-time
  // Patient session privacy: If current user is a patient, they can ONLY see their own patient profile.
  // Other patients are never exposed to a patient session.
  const activePatients = (users || [])
    .filter(u => {
      if (!u || u.role !== 'patient') return false;
      if (currentUser?.role === 'patient') {
        return u.email?.toLowerCase() === currentUser.email?.toLowerCase();
      }
      return true;
    })
    .map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
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

  // Active patient profile initialized from stored users or active session
  const [patient, setPatient] = useState(() => {
    const session = getActiveUserSession();
    if (session && session.role === 'patient') {
      return {
        id: session.id,
        name: session.name,
        email: session.email,
        age: session.age || 23,
        gender: session.gender || 'Not specified',
        weight: session.weight || 70,
        description: `${session.gender || 'Patient'}, ${session.age || 23}y — ${session.chronicDiseases?.join(', ') || 'Verified Profile'}`,
        diseases: session.chronicDiseases || [],
        allergies: session.allergies || [],
        medicalHistory: session.medicalHistory || session.notes || 'Registered MediSafe clinical profile.',
        currentMedicines: session.currentMedicines || []
      };
    }
    const initialUsers = getAllUsers();
    const patientUsers = initialUsers.filter(u => u && u.role === 'patient');
    if (patientUsers.length > 0) {
      const p0 = patientUsers[0];
      return {
        id: p0.id,
        name: p0.name,
        email: p0.email,
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
      email: '',
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

  const handleTabChange = (newTab) => {
    if (newTab === 'admin' && currentUser?.role !== 'admin') {
      showToast('No access to Admin Console for patients and doctors.', 'error');
      return;
    }
    setActiveTab(newTab);
  };

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
      // 1. If currentUser is a patient, strictly lock to the logged-in patient's personal record
      if (currentUser && currentUser.role === 'patient') {
        const found = patientUsers.find(u => u.email?.toLowerCase() === currentUser.email?.toLowerCase()) || currentUser;
        setPatient({
          id: found.id,
          name: found.name,
          email: found.email,
          age: found.age || 23,
          gender: found.gender || 'Not specified',
          weight: found.weight || 70,
          description: `${found.gender || 'Patient'}, ${found.age || 23}y — ${found.chronicDiseases?.join(', ') || 'Personal Profile'}`,
          diseases: found.chronicDiseases || [],
          allergies: found.allergies || [],
          medicalHistory: found.medicalHistory || found.notes || 'Registered MediSafe personal profile.',
          currentMedicines: found.currentMedicines || []
        });
        return;
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
    if (currentUser?.role !== 'admin') {
      showToast('No access to Admin Console for patients and doctors.', 'error');
      return { duplicatesRemovedCount: 0, remainingUsers: visibleUsers };
    }
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
    if (currentUser?.role !== 'admin') {
      showToast('No access to Admin Console for patients and doctors.', 'error');
      return;
    }
    updateUserDetails(userId, { status: newStatus });
    refreshUsersAndLogs();
    showToast(`User status updated to ${newStatus}`, 'success');
  };

  // Admin: Delete user
  const removeUser = (userId) => {
    if (currentUser?.role !== 'admin') {
      showToast('No access to Admin Console for patients and doctors.', 'error');
      return;
    }
    deleteUserAccount(userId);
    refreshUsersAndLogs();
    showToast('User record permanently removed from database', 'info');
  };

  // Admin: Manually add a user
  const adminAddUser = (userData) => {
    if (currentUser?.role !== 'admin') {
      showToast('No access to Admin Console for patients and doctors.', 'error');
      return { success: false, message: 'No access to Admin Console for patients and doctors.' };
    }
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
    // If the logged in user is a patient, strictly forbid switching to another patient's data
    if (currentUser?.role === 'patient' && presetPatient?.email && currentUser?.email && presetPatient.email.toLowerCase() !== currentUser.email.toLowerCase()) {
      showToast('No access to other patient records.', 'warning');
      return;
    }
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
        users: visibleUsers,
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
        setActiveTab: handleTabChange,
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
