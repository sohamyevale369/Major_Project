// Persistent User Management & Deduplication Service for MediSafe AI
// Manages both Existing (Pre-seeded/Legacy) Users and Newly Registered Users

const USERS_STORAGE_KEY = 'medisafe_users';
const CURRENT_USER_KEY = 'medisafe_active_user';
const AUDIT_LOGS_KEY = 'medisafe_audit_logs';

export const SEED_USERS = [
  {
    id: 'usr-admin-1',
    name: 'System Administrator',
    email: 'admin@medisafe.ai',
    password: 'Admin@123',
    role: 'admin',
    department: 'Clinical IT & Compliance',
    licenseNumber: 'SYS-ADMIN-001',
    status: 'Active',
    isNewUser: false,
    registeredAt: '2024-01-10T08:30:00.000Z',
    lastLogin: '2025-03-01T10:15:00.000Z',
    notes: 'Master administrator with full system audit, user management & deduplication rights.'
  },
  {
    id: 'usr-doc-1',
    name: 'Dr. Rajesh Sharma, MD',
    email: 'dr.sharma@medisafe.ai',
    password: 'Doctor@123',
    role: 'clinician',
    department: 'Internal Medicine & Pharmacology',
    licenseNumber: 'MD-98421',
    status: 'Active',
    isNewUser: false,
    registeredAt: '2024-03-15T09:00:00.000Z',
    lastLogin: '2025-03-02T14:20:00.000Z',
    notes: 'Chief Attending Physician. Consulted for senior nephrotoxicity alerts.'
  },
  {
    id: 'usr-doc-2',
    name: 'Dr. Helen Adams, FACC',
    email: 'dr.adams@medisafe.ai',
    password: 'Doctor@123',
    role: 'clinician',
    department: 'Cardiovascular Care Unit',
    licenseNumber: 'MD-77123',
    status: 'Active',
    isNewUser: false,
    registeredAt: '2024-05-20T11:45:00.000Z',
    lastLogin: '2025-02-28T16:00:00.000Z',
    notes: 'Cardiology Specialist. Supervises anticoagulant interaction protocols.'
  },
  {
    id: 'usr-pat-1',
    name: 'Robert Jenkins',
    email: 'robert.jenkins@medisafe.care',
    password: 'Patient@123',
    role: 'patient',
    age: 68,
    gender: 'Male',
    chronicDiseases: ['Chronic Kidney Disease', 'Hypertension (High Blood Pressure)'],
    allergies: ['Sulfa Drugs (Sulfonamides)'],
    status: 'Active',
    isNewUser: false,
    registeredAt: '2024-06-01T10:00:00.000Z',
    lastLogin: '2025-03-02T10:30:00.000Z',
    notes: 'Senior patient on Lisinopril therapy; high sensitivity to NSAIDs.'
  },
  {
    id: 'usr-pat-2',
    name: 'Eleanor Vance',
    email: 'eleanor.vance@medisafe.care',
    password: 'Patient@123',
    role: 'patient',
    age: 54,
    gender: 'Female',
    chronicDiseases: ['Atrial Fibrillation / Heart Failure'],
    allergies: ['Penicillin', 'Beta-lactam Allergy'],
    status: 'Active',
    isNewUser: false,
    registeredAt: '2024-07-12T13:10:00.000Z',
    lastLogin: '2025-02-27T11:40:00.000Z',
    notes: 'Patient on Warfarin anticoagulation with severe penicillin hypersensitivity.'
  },
  {
    id: 'usr-pat-3',
    name: 'Marcus Brody',
    email: 'marcus.brody@medisafe.care',
    password: 'Patient@123',
    role: 'patient',
    age: 58,
    gender: 'Male',
    chronicDiseases: ['Hypertension (High Blood Pressure)', 'History of Stroke'],
    allergies: [],
    status: 'Active',
    isNewUser: false,
    registeredAt: '2024-08-04T15:30:00.000Z',
    lastLogin: '2025-02-25T09:15:00.000Z',
    notes: 'Stroke recovery profile; blood thinner monitored.'
  },
  {
    id: 'usr-pat-4',
    name: 'Devon Clark',
    email: 'devon.clark@medisafe.care',
    password: 'Patient@123',
    role: 'patient',
    age: 32,
    gender: 'Male',
    chronicDiseases: ['Type 2 Diabetes'],
    allergies: [],
    status: 'Active',
    isNewUser: false,
    registeredAt: '2024-09-18T12:00:00.000Z',
    lastLogin: '2025-02-20T17:45:00.000Z',
    notes: 'Young adult diabetic profile on Metformin.'
  }
];

const INITIAL_AUDIT_LOGS = [
  {
    id: 'log-1',
    timestamp: '2025-03-02T10:30:00.000Z',
    action: 'Prescription Evaluated',
    performedBy: 'Robert Jenkins (robert.jenkins@medisafe.care)',
    details: 'Checked Ibuprofen 400mg with Chronic Kidney Disease (High Risk Flagged)'
  },
  {
    id: 'log-2',
    timestamp: '2025-03-02T09:15:00.000Z',
    action: 'User Sign In',
    performedBy: 'Dr. Rajesh Sharma (dr.sharma@medisafe.ai)',
    details: 'Clinician portal session started'
  },
  {
    id: 'log-3',
    timestamp: '2025-03-01T10:15:00.000Z',
    action: 'Database Integrity Check',
    performedBy: 'System Administrator (admin@medisafe.ai)',
    details: 'Full duplicate records audit executed. All clinical tables verified.'
  }
];

/**
 * Retrieves all registered users from storage, initializing with seed data if needed
 */
export function getAllUsers() {
  try {
    const stored = localStorage.getItem(USERS_STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(SEED_USERS));
      return SEED_USERS;
    }
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(SEED_USERS));
      return SEED_USERS;
    }
    return parsed;
  } catch (err) {
    console.error('Failed reading user storage, falling back to seed:', err);
    return SEED_USERS;
  }
}

/**
 * Saves users list to storage & syncs to local file
 */
export function saveAllUsers(users) {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (err) {
    console.error('Failed saving users to storage:', err);
  }

  // Also sync to disk file src/data/users.json via local API
  if (typeof fetch !== 'undefined') {
    fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(users)
    }).catch(() => {});
  }
}

/**
 * Retrieves currently logged in user session
 */
export function getActiveUserSession() {
  try {
    const stored = localStorage.getItem(CURRENT_USER_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (err) {
    return null;
  }
}

/**
 * Sets currently logged in user session
 */
export function setActiveUserSession(user) {
  try {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  } catch (err) {
    console.error('Failed setting active user session:', err);
  }
}

/**
 * Logs a system or user action for compliance & audit tracking
 */
export function logSystemActivity(action, details, performedBy = 'System') {
  try {
    const stored = localStorage.getItem(AUDIT_LOGS_KEY);
    const logs = stored ? JSON.parse(stored) : INITIAL_AUDIT_LOGS;
    const newLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
      action,
      details,
      performedBy: typeof performedBy === 'object' ? `${performedBy.name} (${performedBy.email})` : performedBy
    };
    const updated = [newLog, ...logs.slice(0, 99)]; // retain last 100 logs
    localStorage.setItem(AUDIT_LOGS_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    return INITIAL_AUDIT_LOGS;
  }
}

/**
 * Retrieves audit logs
 */
export function getSystemAuditLogs() {
  try {
    const stored = localStorage.getItem(AUDIT_LOGS_KEY);
    return stored ? JSON.parse(stored) : INITIAL_AUDIT_LOGS;
  } catch (err) {
    return INITIAL_AUDIT_LOGS;
  }
}

/**
 * Registers a new user with duplicate prevention
 */
export function registerNewUser(userData) {
  const users = getAllUsers();
  const normalizedEmail = userData.email.trim().toLowerCase();

  // Strict duplicate check: email must be unique
  const existingUser = users.find(u => u.email.toLowerCase() === normalizedEmail);
  if (existingUser) {
    throw new Error(`An account with email "${userData.email}" already exists. Please sign in instead.`);
  }

  const now = new Date().toISOString();
  const newUser = {
    id: `usr-new-${Date.now()}`,
    name: userData.name.trim(),
    email: normalizedEmail,
    password: userData.password,
    role: userData.role || 'patient',
    department: userData.department || (userData.role === 'clinician' ? 'General Medicine' : ''),
    licenseNumber: userData.licenseNumber || (userData.role === 'clinician' ? 'LIC-PENDING' : ''),
    age: userData.age ? Number(userData.age) : 35,
    gender: userData.gender || 'Not Specified',
    chronicDiseases: userData.chronicDiseases || [],
    allergies: userData.allergies || [],
    status: 'Active',
    isNewUser: true, // Marked as newly registered
    registeredAt: now,
    lastLogin: now,
    notes: userData.notes || 'Registered through MediSafe AI online portal.'
  };

  const updatedUsers = [newUser, ...users];
  saveAllUsers(updatedUsers);
  logSystemActivity('New User Registered', `Account created with role: ${newUser.role.toUpperCase()}`, newUser);

  return newUser;
}

/**
 * Validates login credentials
 */
export function authenticateUser(email, password) {
  const users = getAllUsers();
  const normalizedEmail = (email || '').trim().toLowerCase();

  const user = users.find(u => u.email.toLowerCase() === normalizedEmail);
  if (!user) {
    return {
      success: false,
      message: 'No account registered with this email. Please check your spelling or register a new account.'
    };
  }

  if (user.status === 'Suspended') {
    return {
      success: false,
      message: 'This account is currently suspended. Please contact the clinical administrator.'
    };
  }

  if (user.password !== password) {
    return {
      success: false,
      message: 'Incorrect password. Please verify your credentials and try again.'
    };
  }

  // Update last login timestamp
  const now = new Date().toISOString();
  const updatedUsers = users.map(u => u.id === user.id ? { ...u, lastLogin: now } : u);
  saveAllUsers(updatedUsers);

  const activeUser = { ...user, lastLogin: now };
  setActiveUserSession(activeUser);
  logSystemActivity('User Sign In', `Successful authentication (${activeUser.role.toUpperCase()})`, activeUser);

  return {
    success: true,
    user: activeUser
  };
}

/**
 * Scans for and removes all duplicate records from the user database
 */
export function deduplicateUserDatabase() {
  const users = getAllUsers();
  const seenEmails = new Map();
  const duplicatesFound = [];
  const uniqueUsers = [];

  for (const user of users) {
    const emailKey = user.email.toLowerCase().trim();
    if (seenEmails.has(emailKey)) {
      duplicatesFound.push({
        duplicateUser: user,
        originalId: seenEmails.get(emailKey).id,
        email: user.email
      });
    } else {
      seenEmails.set(emailKey, user);
      uniqueUsers.push(user);
    }
  }

  if (duplicatesFound.length > 0) {
    saveAllUsers(uniqueUsers);
    logSystemActivity(
      'Duplicate Records Removed',
      `Identified & removed ${duplicatesFound.length} duplicate user record(s): ${duplicatesFound.map(d => d.email).join(', ')}`,
      'System Deduplication Utility'
    );
  }

  return {
    duplicatesRemovedCount: duplicatesFound.length,
    initialCount: users.length,
    finalCount: uniqueUsers.length,
    duplicates: duplicatesFound
  };
}

/**
 * Updates a user's record (status, role, details)
 */
export function updateUserDetails(userId, updates) {
  const users = getAllUsers();
  const updated = users.map(u => {
    if (u.id === userId) {
      return { ...u, ...updates };
    }
    return u;
  });
  saveAllUsers(updated);
  logSystemActivity('User Record Updated', `Modified user ID: ${userId}`, 'Admin');
  return updated;
}

/**
 * Deletes a user
 */
export function deleteUserAccount(userId) {
  const users = getAllUsers();
  const target = users.find(u => u.id === userId);
  const filtered = users.filter(u => u.id !== userId);
  saveAllUsers(filtered);
  if (target) {
    logSystemActivity('User Record Deleted', `Removed user: ${target.name} (${target.email})`, 'Admin');
  }
  return filtered;
}

/**
 * Admin manually creates a new user
 */
export function adminCreateUser(userData) {
  return registerNewUser({
    ...userData,
    isNewUser: true,
    notes: userData.notes || 'Created directly by System Administrator.'
  });
}
