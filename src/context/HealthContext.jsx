import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { SAMPLE_PATIENTS } from '../data/samplePatients';
import { evaluateMedicationSafety } from '../data/mockAI';
import {
  getAllUsers,
  sanitizeUsers,
  saveAllUsers,
  getActiveUserSession,
  setActiveUserSession,
  authenticateUser,
  registerNewUser,
  deduplicateUserDatabase,
  updateUserDetails,
  deleteUserAccount,
  adminCreateUser,
  getSystemAuditLogs,
  logSystemActivity,
  getUserTasksKey,
  loadUserSessionTasks,
  saveUserSessionTasks,
  clearGlobalTaskCaches
} from '../data/userStorage';

// Pre-seeded tasks for Soham so his previous session is preserved
function getSohamDefaultTasks(user) {
  const sohamAnalysis = evaluateMedicationSafety(
    user,
    'Diclofenac',
    '50mg',
    'If required (SOS)'
  );
  const sohamHist = [
    {
      id: 'hist-soham-1',
      date: '2026-09-07',
      time: '10:15 PM',
      medicineName: 'Diclofenac',
      dosage: '50mg',
      riskScore: 35,
      riskLevel: 'MEDIUM',
      primaryAlert: 'Chronic Kidney Disease Caution — Monitor Renal Function',
      status: 'Evaluated in OCR Session'
    },
    {
      id: 'hist-soham-2',
      date: '2026-09-07',
      time: '09:40 PM',
      medicineName: 'Paracetamol',
      dosage: '500mg',
      riskScore: 18,
      riskLevel: 'LOW',
      primaryAlert: 'Safe for Kidney Profile with Liver Monitoring',
      status: 'Evaluated Safe'
    }
  ];
  return {
    currentAnalysis: sohamAnalysis,
    selectedMedName: 'Diclofenac',
    dosage: '50mg',
    frequency: 'If required (SOS)',
    medicationHistory: sohamHist
  };
}

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
  const [activeTab, setActiveTabState] = useState(() => {
    try {
      return sessionStorage.getItem('medisafe_active_tab') || 'home';
    } catch (e) {
      return 'home';
    }
  });

  const handleTabChange = (newTab) => {
    if (newTab === 'admin' && currentUser?.role !== 'admin') {
      showToast('No access to Admin Console for patients and doctors.', 'error');
      return;
    }
    try {
      sessionStorage.setItem('medisafe_active_tab', newTab);
    } catch (e) {}
    setActiveTabState(newTab);
  };

  // User-isolated active analysis & task session
  const [currentAnalysis, setCurrentAnalysisState] = useState(() => {
    const activeUser = getActiveUserSession();
    if (!activeUser) return null;
    const tasks = loadUserSessionTasks(activeUser);
    if (tasks && tasks.currentAnalysis) {
      return tasks.currentAnalysis;
    }
    // Pre-populate Soham's previous session analysis so his previous work is preserved
    if (activeUser.email?.toLowerCase().includes('soham')) {
      return getSohamDefaultTasks(activeUser).currentAnalysis;
    }
    // Vikas and all other users start with a fresh clean state
    return null;
  });

  const setCurrentAnalysis = (newAnalysis) => {
    setCurrentAnalysisState(newAnalysis);
    if (currentUser) {
      const existing = loadUserSessionTasks(currentUser) || {};
      saveUserSessionTasks(currentUser, {
        ...existing,
        currentAnalysis: newAnalysis,
        selectedMedName: newAnalysis?.medicineName || existing.selectedMedName,
        dosage: newAnalysis?.dosage || existing.dosage,
        frequency: newAnalysis?.frequency || existing.frequency
      });
    }
  };

  // User-isolated Medication History Log
  const [medicationHistory, setMedicationHistoryState] = useState(() => {
    const activeUser = getActiveUserSession();
    if (!activeUser) return [];
    const tasks = loadUserSessionTasks(activeUser);
    if (tasks && Array.isArray(tasks.medicationHistory)) {
      return tasks.medicationHistory;
    }
    // Pre-populate Soham's previous evaluation logs
    if (activeUser.email?.toLowerCase().includes('soham')) {
      return getSohamDefaultTasks(activeUser).medicationHistory;
    }
    // Vikas and other users start with clean 0 logs
    return [];
  });

  const setMedicationHistory = (updater) => {
    setMedicationHistoryState(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      if (currentUser) {
        const existing = loadUserSessionTasks(currentUser) || {};
        saveUserSessionTasks(currentUser, {
          ...existing,
          medicationHistory: next
        });
      }
      return next;
    });
  };

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
        const userDiseases = Array.isArray(found.chronicDiseases)
          ? found.chronicDiseases
          : (Array.isArray(found.diseases) ? found.diseases : []);
        const userAllergies = Array.isArray(found.allergies)
          ? found.allergies
          : [];
        const userMedicines = Array.isArray(found.currentMedicines)
          ? found.currentMedicines
          : [];

        const hasUpdated = Boolean(
          found.hasUpdatedProfile ||
          currentUser.hasUpdatedProfile ||
          userDiseases.length > 0 ||
          userAllergies.length > 0 ||
          userMedicines.length > 0
        );

        setPatient({
          id: found.id || currentUser.id,
          name: found.name || currentUser.name,
          email: found.email || currentUser.email,
          age: found.age !== undefined ? Number(found.age) : (currentUser.age ? Number(currentUser.age) : 40),
          gender: found.gender || currentUser.gender || 'Not specified',
          weight: found.weight !== undefined ? Number(found.weight) : 70,
          description: `${found.gender || currentUser.gender || 'Patient'}, ${found.age || 40}y — ${userDiseases.length > 0 ? userDiseases.join(', ') : 'No recorded conditions'}`,
          diseases: userDiseases,
          chronicDiseases: userDiseases,
          allergies: userAllergies,
          medicalHistory: found.medicalHistory || found.notes || currentUser.notes || 'Registered MediSafe personal profile.',
          currentMedicines: userMedicines,
          hasUpdatedProfile: hasUpdated
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

    const loggedUser = result.user;

    // Purge old global caches so another user's session never leaks
    clearGlobalTaskCaches();

    // 1. Set active user session
    setCurrentUser(loggedUser);

    // 2. Load isolated task session for this user
    const userTasks = loadUserSessionTasks(loggedUser);
    if (userTasks) {
      setCurrentAnalysisState(userTasks.currentAnalysis || null);
      setMedicationHistoryState(Array.isArray(userTasks.medicationHistory) ? userTasks.medicationHistory : []);
    } else {
      // If user is Soham and hasn't saved tasks yet, pre-populate Soham's previous session
      if (loggedUser.email?.toLowerCase().includes('soham')) {
        const defaults = getSohamDefaultTasks(loggedUser);
        saveUserSessionTasks(loggedUser, defaults);
        setCurrentAnalysisState(defaults.currentAnalysis);
        setMedicationHistoryState(defaults.medicationHistory);
      } else {
        // Vikas or any other new user starts with a fresh clean session!
        setCurrentAnalysisState(null);
        setMedicationHistoryState([]);
        saveUserSessionTasks(loggedUser, { currentAnalysis: null, medicationHistory: [] });
      }
    }

    if (loggedUser.role === 'patient') {
      const uDiseases = Array.isArray(loggedUser.chronicDiseases) ? loggedUser.chronicDiseases : (Array.isArray(loggedUser.diseases) ? loggedUser.diseases : []);
      const uAllergies = Array.isArray(loggedUser.allergies) ? loggedUser.allergies : [];
      const uMedicines = Array.isArray(loggedUser.currentMedicines) ? loggedUser.currentMedicines : [];

      setPatient({
        id: loggedUser.id,
        name: loggedUser.name,
        email: loggedUser.email,
        age: loggedUser.age !== undefined ? Number(loggedUser.age) : 40,
        gender: loggedUser.gender || 'Not specified',
        weight: loggedUser.weight !== undefined ? Number(loggedUser.weight) : 70,
        description: `${loggedUser.gender || 'Patient'}, ${loggedUser.age || 40}y — ${uDiseases.length > 0 ? uDiseases.join(', ') : 'No recorded conditions'}`,
        diseases: uDiseases,
        chronicDiseases: uDiseases,
        allergies: uAllergies,
        medicalHistory: loggedUser.medicalHistory || loggedUser.notes || 'Registered MediSafe personal profile.',
        currentMedicines: uMedicines
      });
    }

    refreshUsersAndLogs();

    if (loggedUser.role === 'admin') {
      setActiveTab('admin');
      showToast(`Welcome Administrator ${loggedUser.name}`, 'success');
    } else {
      setActiveTab('dashboard');
      showToast(`Signed in successfully as ${loggedUser.name} (${loggedUser.role === 'clinician' ? 'Healthcare Clinician' : 'Patient'})`, 'success');
    }

    return result;
  };

  // Authentication: Register new user
  const register = (userData) => {
    try {
      const newUser = registerNewUser(userData);
      setActiveUserSession(newUser);
      setCurrentUser(newUser);

      // Clean fresh session for newly registered user
      setCurrentAnalysisState(null);
      setMedicationHistoryState([]);
      saveUserSessionTasks(newUser, { currentAnalysis: null, medicationHistory: [] });
      clearGlobalTaskCaches();

      if (newUser.role === 'patient') {
        const uDiseases = Array.isArray(newUser.chronicDiseases) ? newUser.chronicDiseases : [];
        const uAllergies = Array.isArray(newUser.allergies) ? newUser.allergies : [];
        const uMedicines = Array.isArray(newUser.currentMedicines) ? newUser.currentMedicines : [];

        setPatient({
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          age: newUser.age !== undefined ? Number(newUser.age) : 40,
          gender: newUser.gender || 'Not specified',
          weight: newUser.weight !== undefined ? Number(newUser.weight) : 70,
          description: `${newUser.gender || 'Patient'}, ${newUser.age || 40}y — ${uDiseases.length > 0 ? uDiseases.join(', ') : 'No recorded conditions'}`,
          diseases: uDiseases,
          chronicDiseases: uDiseases,
          allergies: uAllergies,
          medicalHistory: newUser.medicalHistory || newUser.notes || 'Registered MediSafe personal profile.',
          currentMedicines: uMedicines
        });
      }

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
      // Persist current session tasks for this user before clearing
      const currentTasks = loadUserSessionTasks(currentUser) || {};
      saveUserSessionTasks(currentUser, {
        ...currentTasks,
        currentAnalysis,
        medicationHistory
      });
    }

    // Reset active session
    setActiveUserSession(null);
    setCurrentUser(null);

    // Reset patient profile so it doesn't leak into the next session
    setPatient({
      id: 'usr-default',
      name: 'Clinical Patient Profile',
      email: '',
      age: 40,
      gender: 'Not specified',
      weight: 70,
      description: 'Active Patient Profile',
      diseases: [],
      chronicDiseases: [],
      allergies: [],
      medicalHistory: '',
      currentMedicines: []
    });

    // Refresh & reset task memory so no data leaks to the next user!
    setCurrentAnalysisState(null);
    setMedicationHistoryState([]);
    clearGlobalTaskCaches();

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

  // Update specific patient details and persist across storage
  const updatePatient = (updatedFields) => {
    const rawDiseases = updatedFields.diseases !== undefined ? updatedFields.diseases : (updatedFields.chronicDiseases !== undefined ? updatedFields.chronicDiseases : (patient?.diseases || patient?.chronicDiseases || []));
    const diseases = Array.isArray(rawDiseases) ? rawDiseases : [];
    const rawAllergies = updatedFields.allergies !== undefined ? updatedFields.allergies : (patient?.allergies || []);
    const allergies = Array.isArray(rawAllergies) ? rawAllergies : [];
    const name = updatedFields.name !== undefined ? updatedFields.name : (patient?.name || '');
    const age = updatedFields.age !== undefined ? Number(updatedFields.age) : (patient?.age || 40);
    const gender = updatedFields.gender !== undefined ? updatedFields.gender : (patient?.gender || 'Not specified');
    const weight = updatedFields.weight !== undefined ? Number(updatedFields.weight) : (patient?.weight || 70);
    const currentMedicines = updatedFields.currentMedicines || patient?.currentMedicines || [];
    const medicalHistory = updatedFields.medicalHistory || patient?.medicalHistory || '';

    const newPatientData = {
      ...patient,
      ...updatedFields,
      name,
      age,
      gender,
      weight,
      diseases,
      chronicDiseases: diseases,
      allergies,
      currentMedicines,
      medicalHistory,
      hasUpdatedProfile: true,
      description: `${gender || 'Patient'}, ${age}y — ${diseases.length > 0 ? diseases.join(', ') : 'Personal Profile'}`
    };

    setPatient(newPatientData);

    // Persist to currentUser if active session is patient or matches this patient
    if (currentUser) {
      const isCurrentPatient = currentUser.role === 'patient' ||
        currentUser.id === newPatientData.id ||
        (currentUser.email && newPatientData.email && currentUser.email.toLowerCase() === newPatientData.email.toLowerCase());

      if (isCurrentPatient) {
        const updatedCurrentUser = {
          ...currentUser,
          name,
          age,
          gender,
          weight,
          chronicDiseases: diseases,
          allergies,
          currentMedicines,
          hasUpdatedProfile: true,
          notes: medicalHistory || currentUser.notes
        };
        setActiveUserSession(updatedCurrentUser);
        setCurrentUser(updatedCurrentUser);
      }

      // Persist to users list (in localStorage and /api/users)
      const allUsers = getAllUsers();
      const updatedUsers = allUsers.map(u => {
        const isTarget = u.id === newPatientData.id ||
          (u.email && newPatientData.email && u.email.toLowerCase() === newPatientData.email.toLowerCase()) ||
          (currentUser.role === 'patient' && u.email && currentUser.email && u.email.toLowerCase() === currentUser.email.toLowerCase());

        if (isTarget) {
          return {
            ...u,
            name,
            age,
            gender,
            weight,
            chronicDiseases: diseases,
            allergies,
            currentMedicines,
            hasUpdatedProfile: true,
            notes: medicalHistory || u.notes
          };
        }
        return u;
      });
      saveAllUsers(updatedUsers);
      setUsers(updatedUsers);
    }

    if (currentAnalysis?.medicineName) {
      const recheck = evaluateMedicationSafety(
        newPatientData,
        currentAnalysis.medicineName,
        currentAnalysis.dosage,
        currentAnalysis.frequency
      );
      setCurrentAnalysis(recheck);
    }

    showToast('Health profile updated successfully', 'success');
    return newPatientData;
  };

  // Run analysis on a new medicine (accepts optional targetPatient for immediate synchronous analysis)
  const runSafetyCheck = (medicineName, dosage, frequency, targetPatient) => {
    const patientToEvaluate = targetPatient || patient;
    const analysis = evaluateMedicationSafety(patientToEvaluate, medicineName, dosage, frequency);
    setCurrentAnalysis(analysis);

    if (analysis.allergyAlert) {
      setEmergencyAlert({
        title: 'Allergy Conflict Detected!',
        medicine: medicineName,
        details: analysis.allergyAlert.warning
      });
    }

    const primaryAlert = analysis.allergyAlert
      ? `Severe Allergy (${analysis.allergyAlert.detectedAllergy})`
      : (analysis.diseaseConflicts[0]?.disease ? `${analysis.diseaseConflicts[0].disease} Contraindication` : 'Routine Safety Evaluation');

    const historyEntry = {
      id: `hist-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      medicineName: analysis.medicineName,
      dosage: analysis.dosage,
      riskScore: analysis.riskScore,
      riskLevel: analysis.riskLevel,
      primaryAlert,
      status: analysis.riskLevel === 'HIGH' ? 'Flagged High Risk' : 'Evaluated Safe'
    };
    setMedicationHistory(prev => [historyEntry, ...prev]);

    if (currentUser) {
      const currentTasks = loadUserSessionTasks(currentUser) || {};
      const updatedHistory = [historyEntry, ...(currentTasks.medicationHistory || [])];
      saveUserSessionTasks(currentUser, {
        ...currentTasks,
        currentAnalysis: analysis,
        selectedMedName: medicineName,
        dosage: analysis.dosage,
        frequency: analysis.frequency,
        medicationHistory: updatedHistory
      });

      logSystemActivity(
        'Medicine Risk Evaluated',
        `Evaluated ${medicineName} (${analysis.dosage}). Risk Score: ${analysis.riskScore}% (${analysis.riskLevel}) for ${patientToEvaluate.name}`,
        currentUser
      );
    }

    return analysis;
  };

  // Computed status: Has the active patient updated their personal health profile?
  const hasUpdatedPersonalDetails = Boolean(
    currentUser?.hasUpdatedProfile ||
    patient?.hasUpdatedProfile ||
    (patient?.diseases && patient.diseases.length > 0) ||
    (patient?.allergies && patient.allergies.length > 0) ||
    (patient?.currentMedicines && patient.currentMedicines.length > 0)
  );

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
        hasUpdatedPersonalDetails,
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
