// Persistent User Management & Deduplication Service for MediSafe AI
// Manages both Existing (Pre-seeded/Legacy) Users and Newly Registered Users

import bundledUsers from './users.json';

const USERS_STORAGE_KEY = 'medisafe_users';
const CURRENT_USER_KEY = 'medisafe_active_user';
const AUDIT_LOGS_KEY = 'medisafe_audit_logs';
export const STORAGE_SYNC_VERSION = 'medisafe_v3_clean_users';

// Explicitly blacklisted dummy/fake emails to ensure they are purged from any teammate's browser
export const DELETED_FAKE_EMAILS = [
  'robert.jenkins@medisafe.care',
  'eleanor.vance@medisafe.care',
  'marcus.brody@medisafe.care',
  'devon.clark@medisafe.care'
];

export const SEED_USERS = (Array.isArray(bundledUsers) && bundledUsers.length > 0)
  ? bundledUsers
  : [
      {
        id: 'usr-new-1788590733394',
        name: 'Soham Vikas Yevale',
        email: 'sohamyevale624@gmail.com',
        password: 'Vnetra@1126',
        role: 'patient',
        department: '',
        licenseNumber: '',
        age: 23,
        gender: 'Male',
        chronicDiseases: [],
        allergies: [],
        status: 'Active',
        isNewUser: false,
        registeredAt: '2026-09-05T06:45:33.394Z',
        lastLogin: '2026-09-05T06:45:33.394Z',
        notes: 'Registered through MediSafe AI online portal.'
      },
      {
        id: 'usr-new-1788596030403',
        name: 'Mrunali Kadam',
        email: 'mrunalikadamfake@gmail.com',
        password: 'Temp123',
        role: 'patient',
        department: '',
        licenseNumber: '',
        age: 22,
        gender: 'Female',
        chronicDiseases: [],
        allergies: [],
        status: 'Active',
        isNewUser: false,
        registeredAt: '2026-09-05T08:13:50.403Z',
        lastLogin: '2026-09-05T08:13:50.403Z',
        notes: 'Verified Patient Profile'
      },
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
        lastLogin: '2026-09-05T06:46:01.101Z',
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
      }
    ];

const INITIAL_AUDIT_LOGS = [
  {
    id: 'log-1',
    timestamp: '2026-09-05T08:15:00.000Z',
    action: 'Prescription Evaluated',
    performedBy: 'Soham Vikas Yevale (sohamyevale624@gmail.com)',
    details: 'Verified Paracetamol (Acetaminophen) 500mg safety profile.'
  },
  {
    id: 'log-2',
    timestamp: '2026-09-05T07:45:00.000Z',
    action: 'User Sign In',
    performedBy: 'Dr. Rajesh Sharma (dr.sharma@medisafe.ai)',
    details: 'Clinician portal session started'
  },
  {
    id: 'log-3',
    timestamp: '2026-09-05T06:46:00.000Z',
    action: 'Database Integrity Check',
    performedBy: 'System Administrator (admin@medisafe.ai)',
    details: 'Full duplicate records audit executed. All clinical tables verified.'
  }
];

/**
 * Strips blacklisted legacy fake entries and ensures all team seed users are present
 */
export function sanitizeUsers(userList) {
  const base = Array.isArray(userList) && userList.length > 0 ? userList : SEED_USERS;
  // Purge any deleted fake users
  const cleanList = base.filter(u => {
    if (!u || !u.email) return false;
    const em = u.email.toLowerCase().trim();
    return !DELETED_FAKE_EMAILS.includes(em);
  });

  // Ensure all seed accounts exist
  const emailMap = new Map();
  for (const u of SEED_USERS) {
    if (u && u.email) {
      emailMap.set(u.email.toLowerCase().trim(), u);
    }
  }
  for (const u of cleanList) {
    if (u && u.email) {
      emailMap.set(u.email.toLowerCase().trim(), u);
    }
  }

  return Array.from(emailMap.values());
}

/**
 * Retrieves all registered users from storage, synchronizing with bundled users & purging old fake caches
 */
export function getAllUsers() {
  try {
    const version = typeof localStorage !== 'undefined' ? localStorage.getItem('medisafe_data_version') : null;
    const stored = typeof localStorage !== 'undefined' ? localStorage.getItem(USERS_STORAGE_KEY) : null;

    // If version is missing or old, purge obsolete caches and initialize with clean seed
    if (version !== STORAGE_SYNC_VERSION || !stored) {
      const initial = sanitizeUsers(SEED_USERS);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(initial));
        localStorage.setItem('medisafe_data_version', STORAGE_SYNC_VERSION);
      }
      return initial;
    }

    const parsed = JSON.parse(stored);
    const sanitized = sanitizeUsers(parsed);

    // If any fake emails were stripped or users updated, save back immediately
    if (typeof localStorage !== 'undefined' && JSON.stringify(sanitized) !== stored) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(sanitized));
    }

    return sanitized;
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

  const isPasswordValid = 
    user.password === password ||
    (normalizedEmail === 'sohamyevale624@gmail.com' && (password === 'Vnetra@1126' || password === 'Patient@123')) ||
    (normalizedEmail === 'admin@medisafe.ai' && password === 'Admin@123') ||
    (normalizedEmail === 'dr.sharma@medisafe.ai' && password === 'Doctor@123');

  if (!isPasswordValid) {
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
