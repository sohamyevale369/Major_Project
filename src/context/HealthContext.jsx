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
  clearGlobalTaskCaches,
  updateUserPassword
} from '../data/userStorage';
import {
  dispatchPasswordResetOtp,
  verifyEnteredOtp,
  clearOtpState,
  SENDER_EMAIL
} from '../utils/otpService';

// Pre-seeded tasks for Netra so her verified evaluations (Image 1) are preserved in complete isolation
function getNetraDefaultTasks(user) {
  const netraPatient = {
    ...user,
    name: user?.name || 'Netra Vikas Yevale',
    diseases: ['Hypertension (High Blood Pressure)'],
    chronicDiseases: ['Hypertension (High Blood Pressure)'],
    allergies: ['Sulfa Drugs (Sulfonamides)'],
    currentMedicines: [{ name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily' }],
    age: 45,
    gender: 'Female',
    hasUpdatedProfile: true
  };
  const netraAnalysis = evaluateMedicationSafety(
    netraPatient,
    'Lisinopril',
    '10mg',
    'Once daily'
  );
  const netraHist = [
    {
      id: 'hist-netra-1',
      date: '2026-09-07',
      time: '10:58 PM',
      medicineName: 'Amoxicillin Trihydrate',
      dosage: '',
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
  return {
    currentAnalysis: netraAnalysis,
    selectedMedName: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Once daily',
    medicationHistory: netraHist
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
      const activeUser = getActiveUserSession();
      if (!activeUser) return 'home';
      if (activeUser?.role === 'admin') {
        const stored = sessionStorage.getItem('medisafe_active_tab');
        if (['dashboard', 'risk-checker', 'profile', 'history', 'report'].includes(stored)) {
          return 'admin';
        }
        return stored || 'admin';
      }
      return sessionStorage.getItem('medisafe_active_tab') || 'home';
    } catch (e) {
      return 'home';
    }
  });

  const requireAuth = (callback, message = 'Please sign in or register to perform this task.') => {
    if (!currentUser) {
      showToast(message, 'info');
      setIsAuthModalOpen(true);
      return false;
    }
    if (typeof callback === 'function') {
      callback();
    }
    return true;
  };

  const handleTabChange = (newTab) => {
    // Gate any clinical feature behind authentication:
    // Visiting guests can view the 'home' page freely, but any task/tab requires login.
    if (newTab !== 'home' && !currentUser) {
      showToast('Please sign in or register to access this clinical safety feature.', 'info');
      setIsAuthModalOpen(true);
      return;
    }
    if (newTab === 'admin' && currentUser?.role !== 'admin') {
      showToast('No access to Admin Console for patients and doctors.', 'error');
      return;
    }
    // Admin role should only have control rights and not track personal health or generate self-reports
    if (currentUser?.role === 'admin') {
      const patientTrackingTabs = ['dashboard', 'risk-checker', 'profile', 'history', 'report'];
      if (patientTrackingTabs.includes(newTab)) {
        showToast('Health tracking is for patients only. Admin has governance & patient record access.', 'info');
        setActiveTabState('admin');
        try {
          sessionStorage.setItem('medisafe_active_tab', 'admin');
        } catch (e) {}
        return;
      }
    }
    try {
      sessionStorage.setItem('medisafe_active_tab', newTab);
    } catch (e) {}
    setActiveTabState(newTab);
  };

  // Helper to check if a user record contains documented clinical health profile data
  const userHasProfileData = (u) => {
    if (!u) return false;
    const d = u.chronicDiseases || u.diseases || [];
    const a = u.allergies || [];
    const m = u.currentMedicines || [];
    return d.length > 0 || a.length > 0 || m.length > 0;
  };

  // User-isolated active analysis & task session
  const [currentAnalysis, setCurrentAnalysisState] = useState(() => {
    const activeUser = getActiveUserSession();
    if (!activeUser) return null;

    // Users with incomplete profiles (empty diseases/allergies/meds) NEVER have reports or analysis!
    if (!userHasProfileData(activeUser)) {
      return null;
    }

    const tasks = loadUserSessionTasks(activeUser);
    if (tasks && tasks.currentAnalysis) {
      return tasks.currentAnalysis;
    }

    if (activeUser.email?.toLowerCase().includes('netra')) {
      const def = getNetraDefaultTasks(activeUser);
      saveUserSessionTasks(activeUser, def);
      return def.currentAnalysis;
    }

    return null;
  });

  const setCurrentAnalysis = (newAnalysis) => {
    setCurrentAnalysisState(newAnalysis);
    if (currentUser && userHasProfileData(currentUser)) {
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

    // Users with incomplete profiles (empty diseases/allergies/meds) NEVER have prediction logs!
    if (!userHasProfileData(activeUser)) {
      return [];
    }

    const tasks = loadUserSessionTasks(activeUser);
    if (tasks && Array.isArray(tasks.medicationHistory)) {
      return tasks.medicationHistory;
    }

    if (activeUser.email?.toLowerCase().includes('netra')) {
      const def = getNetraDefaultTasks(activeUser);
      saveUserSessionTasks(activeUser, def);
      return def.medicationHistory;
    }

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

  const syncUsersWithServer = async () => {
    try {
      if (typeof fetch === 'undefined') return;
      const res = await fetch('/api/users');
      if (res.ok) {
        const diskUsers = await res.json();
        if (Array.isArray(diskUsers) && diskUsers.length > 0) {
          const sanitized = sanitizeUsers(diskUsers);
          setUsers(prev => {
            const prevStr = JSON.stringify(prev);
            const nextStr = JSON.stringify(sanitized);
            if (prevStr !== nextStr) {
              return sanitized;
            }
            return prev;
          });
          try {
            localStorage.setItem('medisafe_users', JSON.stringify(sanitized));
          } catch (e) {}
        }
      }
    } catch (e) {}
  };

  // Automated live polling every 3 seconds + window focus listener:
  // Ensures any user registered on another device/browser appears in real-time!
  useEffect(() => {
    syncUsersWithServer();
    const interval = setInterval(syncUsersWithServer, 3000);
    window.addEventListener('focus', syncUsersWithServer);
    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', syncUsersWithServer);
    };
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

        const hasClinicalData = Boolean(
          userDiseases.length > 0 ||
          userAllergies.length > 0 ||
          userMedicines.length > 0
        );

        if (!hasClinicalData) {
          setCurrentAnalysisState(null);
          setMedicationHistoryState([]);
        }

        const hasUpdated = Boolean(hasClinicalData && found.hasUpdatedProfile !== false);

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
    if (!userHasProfileData(loggedUser)) {
      // User with empty conditions/allergies: NO report generated!
      setCurrentAnalysisState(null);
      setMedicationHistoryState([]);
      saveUserSessionTasks(loggedUser, { currentAnalysis: null, medicationHistory: [] });
    } else {
      const userTasks = loadUserSessionTasks(loggedUser);
      if (userTasks && userTasks.currentAnalysis) {
        setCurrentAnalysisState(userTasks.currentAnalysis);
        setMedicationHistoryState(Array.isArray(userTasks.medicationHistory) ? userTasks.medicationHistory : []);
      } else if (loggedUser.email?.toLowerCase().includes('netra')) {
        const defaults = getNetraDefaultTasks(loggedUser);
        saveUserSessionTasks(loggedUser, defaults);
        setCurrentAnalysisState(defaults.currentAnalysis);
        setMedicationHistoryState(defaults.medicationHistory);
      } else {
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
        currentMedicines: uMedicines,
        hasUpdatedProfile: Boolean(loggedUser.hasUpdatedProfile || uDiseases.length > 0 || uAllergies.length > 0 || uMedicines.length > 0)
      });
    }

    refreshUsersAndLogs();
    setIsAuthModalOpen(false);

    if (loggedUser.role === 'admin') {
      setActiveTab('admin');
      showToast(`Welcome Administrator ${loggedUser.name}`, 'success');
    } else {
      setActiveTab('dashboard');
      showToast(`Signed in successfully as ${loggedUser.name} (${loggedUser.role === 'clinician' ? 'Healthcare Clinician' : 'Patient'})`, 'success');
    }

    return result;
  };

  // Authentication: Register new user (persists directly to disk server first)
  const register = async (userData) => {
    try {
      let createdUser = null;
      let allUsers = null;

      // 1. Direct server registration to /api/users/register (ensures immediate persistence on disk)
      try {
        const now = new Date().toISOString();
        const payload = {
          id: `usr-new-${Date.now()}`,
          name: userData.name.trim(),
          email: userData.email.trim().toLowerCase(),
          password: userData.password,
          role: userData.role || 'patient',
          department: userData.department || (userData.role === 'clinician' ? 'General Medicine' : ''),
          licenseNumber: userData.licenseNumber || (userData.role === 'clinician' ? 'LIC-PENDING' : ''),
          age: userData.age ? Number(userData.age) : 35,
          gender: userData.gender || 'Not Specified',
          chronicDiseases: userData.chronicDiseases || [],
          allergies: userData.allergies || [],
          currentMedicines: userData.currentMedicines || [],
          status: 'Active',
          isNewUser: true,
          hasUpdatedProfile: Boolean(
            userData.hasUpdatedProfile ||
            (Array.isArray(userData.chronicDiseases) && userData.chronicDiseases.length > 0) ||
            (Array.isArray(userData.allergies) && userData.allergies.length > 0)
          ),
          registeredAt: now,
          lastLogin: now,
          notes: userData.notes || 'Registered through MediSafe AI online portal.'
        };

        const response = await fetch('/api/users/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await response.json();
        if (!response.ok || !data.success) {
          throw new Error(data.message || 'Server rejected registration');
        }
        createdUser = data.user;
        allUsers = data.users;
      } catch (apiErr) {
        if (apiErr.message && apiErr.message.includes('already exists')) {
          throw apiErr;
        }
        // Fallback to local storage register if offline
        createdUser = registerNewUser(userData);
      }

      if (Array.isArray(allUsers) && allUsers.length > 0) {
        const sanitized = sanitizeUsers(allUsers);
        setUsers(sanitized);
        try {
          localStorage.setItem('medisafe_users', JSON.stringify(sanitized));
        } catch (e) {}
      }

      setActiveUserSession(createdUser);
      setCurrentUser(createdUser);

      // Clean fresh session for newly registered user
      setCurrentAnalysisState(null);
      setMedicationHistoryState([]);
      saveUserSessionTasks(createdUser, { currentAnalysis: null, medicationHistory: [] });
      clearGlobalTaskCaches();

      if (createdUser.role === 'patient') {
        const uDiseases = Array.isArray(createdUser.chronicDiseases) ? createdUser.chronicDiseases : [];
        const uAllergies = Array.isArray(createdUser.allergies) ? createdUser.allergies : [];
        const uMedicines = Array.isArray(createdUser.currentMedicines) ? createdUser.currentMedicines : [];

        setPatient({
          id: createdUser.id,
          name: createdUser.name,
          email: createdUser.email,
          age: createdUser.age !== undefined ? Number(createdUser.age) : 40,
          gender: createdUser.gender || 'Not specified',
          weight: createdUser.weight !== undefined ? Number(createdUser.weight) : 70,
          description: `${createdUser.gender || 'Patient'}, ${createdUser.age || 40}y — ${uDiseases.length > 0 ? uDiseases.join(', ') : 'No recorded conditions'}`,
          diseases: uDiseases,
          chronicDiseases: uDiseases,
          allergies: uAllergies,
          medicalHistory: createdUser.medicalHistory || createdUser.notes || 'Registered MediSafe personal profile.',
          currentMedicines: uMedicines,
          hasUpdatedProfile: Boolean(createdUser.hasUpdatedProfile || uDiseases.length > 0 || uAllergies.length > 0 || uMedicines.length > 0)
        });
      }

      refreshUsersAndLogs();
      setIsAuthModalOpen(false);

      if (createdUser.role === 'admin') {
        setActiveTab('admin');
      } else {
        setActiveTab('dashboard');
      }

      showToast(`Account created successfully! Welcome, ${createdUser.name}`, 'success');
      return { success: true, user: createdUser };
    } catch (err) {
      showToast(err.message, 'error');
      return { success: false, message: err.message };
    }
  };

  // Password Reset with 6-digit OTP verification sent from sohamyevale1126@gmail.com
  const requestPasswordResetOtp = async (email) => {
    try {
      const normalizedEmail = (email || '').trim().toLowerCase();
      if (!normalizedEmail) {
        throw new Error('Please provide your registered email address.');
      }

      const all = getAllUsers();
      const existing = all.find(u => u.email && u.email.toLowerCase().trim() === normalizedEmail);
      if (!existing) {
        throw new Error(`No account found registered with email "${email}". Please verify your email or register.`);
      }

      const dispatchResult = await dispatchPasswordResetOtp(normalizedEmail, existing.name);
      logSystemActivity(
        'OTP Dispatched',
        `Password reset 6-digit OTP dispatched to ${normalizedEmail} from ${SENDER_EMAIL}`,
        existing
      );

      return {
        success: true,
        message: `6-Digit OTP successfully dispatched to ${normalizedEmail} from ${SENDER_EMAIL}`,
        email: normalizedEmail,
        sender: SENDER_EMAIL,
        expiresAt: dispatchResult.expiresAt
      };
    } catch (err) {
      showToast(err.message, 'error');
      return { success: false, message: err.message };
    }
  };

  const verifyPasswordResetOtp = (email, otp) => {
    return verifyEnteredOtp(email, otp);
  };

  const resetPassword = (email, otp, newPassword) => {
    try {
      const otpCheck = verifyEnteredOtp(email, otp);
      if (!otpCheck.success) {
        showToast(otpCheck.message, 'error');
        return otpCheck;
      }

      const updateResult = updateUserPassword(email, newPassword);
      if (!updateResult.success) {
        showToast(updateResult.message, 'error');
        return updateResult;
      }

      refreshUsersAndLogs();
      showToast('Password reset successfully! You can now sign in with your new credentials.', 'success');
      return {
        success: true,
        message: updateResult.message,
        user: updateResult.user
      };
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

  // Admin: Update individual patient record (demographics, chronic diseases, drug allergies, active medicines)
  const adminUpdatePatientRecord = (userId, updates) => {
    if (currentUser?.role !== 'admin') {
      showToast('No access to Admin Console for patients and doctors.', 'error');
      return;
    }
    updateUserDetails(userId, updates);
    if (patient?.id === userId) {
      setPatient(prev => ({ ...prev, ...updates }));
    }
    refreshUsersAndLogs();
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

    const hasProfileNow = Boolean(diseases.length > 0 || allergies.length > 0 || currentMedicines.length > 0);
    if (!hasProfileNow) {
      setCurrentAnalysisState(null);
      setMedicationHistoryState([]);
      if (currentUser) {
        saveUserSessionTasks(currentUser, { currentAnalysis: null, medicationHistory: [] });
      }
    } else if (currentAnalysis?.medicineName) {
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
    const hasProfile = Boolean(
      (patientToEvaluate?.diseases && patientToEvaluate.diseases.length > 0) ||
      (patientToEvaluate?.chronicDiseases && patientToEvaluate.chronicDiseases.length > 0) ||
      (patientToEvaluate?.allergies && patientToEvaluate.allergies.length > 0) ||
      (patientToEvaluate?.currentMedicines && patientToEvaluate.currentMedicines.length > 0)
    );

    if (!hasProfile) {
      showToast('Update health profile to generate reports. Please add at least one condition, allergy, or medication first.', 'error');
      return null;
    }

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
  // An updated profile strictly requires documented clinical details (conditions, allergies, or active medications)
  const hasUpdatedPersonalDetails = Boolean(
    (patient?.diseases && patient.diseases.length > 0) ||
    (patient?.allergies && patient.allergies.length > 0) ||
    (patient?.currentMedicines && patient.currentMedicines.length > 0) ||
    (currentUser?.chronicDiseases && currentUser.chronicDiseases.length > 0) ||
    (currentUser?.allergies && currentUser.allergies.length > 0) ||
    (currentUser?.currentMedicines && currentUser.currentMedicines.length > 0)
  );

  return (
    <HealthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        login,
        register,
        logout,
        requestPasswordResetOtp,
        verifyPasswordResetOtp,
        resetPassword,
        senderEmail: SENDER_EMAIL,
        users: visibleUsers,
        activePatients,
        auditLogs,
        refreshUsersAndLogs,
        deduplicateUsers,
        changeUserStatus,
        removeUser,
        adminAddUser,
        adminUpdatePatientRecord,
        patient,
        setPatient,
        hasUpdatedPersonalDetails,
        loadPatientPreset,
        updatePatient,
        activeTab,
        setActiveTab: handleTabChange,
        requireAuth,
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
        syncUsersWithServer,
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
