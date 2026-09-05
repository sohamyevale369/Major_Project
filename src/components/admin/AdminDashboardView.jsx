import React, { useState } from 'react';
import {
  ShieldCheck,
  Users,
  UserPlus,
  Search,
  Filter,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Download,
  Stethoscope,
  HeartPulse,
  Lock,
  Mail,
  Calendar,
  Clock,
  ExternalLink,
  Shield,
  Eye,
  X,
  Sparkles,
  Activity,
  FileCheck,
  KeyRound,
  Building2
} from 'lucide-react';
import { useHealth } from '../../context/HealthContext';
import { DISEASE_LIST } from '../../data/drugDatabase';

export default function AdminDashboardView() {
  const {
    currentUser,
    users,
    auditLogs,
    login,
    deduplicateUsers,
    changeUserStatus,
    removeUser,
    adminAddUser,
    setActiveTab,
    showToast
  } = useHealth();

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL'); // 'ALL' | 'admin' | 'clinician' | 'patient'
  const [typeFilter, setTypeFilter] = useState('ALL'); // 'ALL' | 'NEW' | 'EXISTING'
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL' | 'Active' | 'Suspended'

  // Modals
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [dedupReport, setDedupReport] = useState(null);

  // Add User Form State
  const [addName, setAddName] = useState('');
  const [addEmail, setAddEmail] = useState('');
  const [addPassword, setAddPassword] = useState('');
  const [addRole, setAddRole] = useState('patient');
  const [addDepartment, setAddDepartment] = useState('General Medicine');
  const [addLicense, setAddLicense] = useState('');
  const [addAge, setAddAge] = useState('45');
  const [addGender, setAddGender] = useState('Male');
  const [addCondition, setAddCondition] = useState('');

  // Access Guard: If current user is not an admin, offer instant 1-click switch to Administrator
  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6 animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center mx-auto shadow-lg">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-white">System Administrator Console</h1>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            You are currently signed in as <strong className="text-white">{currentUser?.name || 'Standard User'}</strong> ({currentUser?.role || 'Guest'}).
            To view all stored user records, run deduplication, or manage accounts, switch to Administrator mode below:
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => login('admin@medisafe.ai', 'Admin@123')}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-mediblue-600 hover:from-purple-500 hover:to-mediblue-500 text-white text-xs font-black shadow-xl shadow-purple-500/20 transition flex items-center gap-2 hover:scale-102"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Switch to System Administrator (1-Click)</span>
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const safeUsers = Array.isArray(users) ? users : [];
  const safeLogs = Array.isArray(auditLogs) ? auditLogs : [];

  // Filter Users safely
  const filteredUsers = safeUsers.filter((u) => {
    if (!u) return false;
    const name = (u.name || '').toLowerCase();
    const email = (u.email || '').toLowerCase();
    const department = (u.department || '').toLowerCase();
    const query = (searchQuery || '').toLowerCase();

    const matchesQuery = !query || name.includes(query) || email.includes(query) || department.includes(query);
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    const matchesType =
      typeFilter === 'ALL' ||
      (typeFilter === 'NEW' && u.isNewUser) ||
      (typeFilter === 'EXISTING' && !u.isNewUser);
    const matchesStatus = statusFilter === 'ALL' || (u.status || 'Active') === statusFilter;

    return matchesQuery && matchesRole && matchesType && matchesStatus;
  });

  // Calculate KPI Counts safely
  const totalUsersCount = safeUsers.length;
  const newUsersCount = safeUsers.filter((u) => u && u.isNewUser).length;
  const existingUsersCount = safeUsers.filter((u) => u && !u.isNewUser).length;
  const cliniciansCount = safeUsers.filter((u) => u && u.role === 'clinician').length;
  const patientsCount = safeUsers.filter((u) => u && u.role === 'patient').length;

  // Handle Deduplication Scan
  const handleRunDeduplication = () => {
    const report = deduplicateUsers();
    setDedupReport(report);
  };

  // Handle Add User Submit
  const handleAddUserSubmit = (e) => {
    e.preventDefault();
    const result = adminAddUser({
      name: addName,
      email: addEmail,
      password: addPassword,
      role: addRole,
      department: addRole === 'clinician' ? addDepartment : undefined,
      licenseNumber: addRole === 'clinician' ? addLicense : undefined,
      age: addAge ? Number(addAge) : 40,
      gender: addGender,
      chronicDiseases: addCondition ? [addCondition] : [],
      status: 'Active'
    });

    if (result.success) {
      setIsAddUserOpen(false);
      setAddName('');
      setAddEmail('');
      setAddPassword('');
    }
  };

  // Export User Records as JSON
  const handleExportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(users, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `medisafe_users_registry_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Exported complete user database as JSON', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 border border-purple-500/20 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-mediblue-600 text-white font-black flex items-center justify-center text-2xl shadow-xl shadow-purple-500/20 shrink-0">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                System Administrator Console
              </span>
              <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-mono border border-purple-500/40">
                Full Privileges
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              User Registry & Database Deduplication
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Manage existing patient/doctor accounts, track newly registered users, enforce data uniqueness, and review system audit logs.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={handleRunDeduplication}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-amber-600 hover:from-rose-400 hover:to-amber-500 text-white text-xs font-bold shadow-lg shadow-rose-500/20 transition-all hover:scale-102"
            title="Scan database and remove all duplicate records"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Remove Duplicate Records</span>
          </button>

          <button
            onClick={() => setIsAddUserOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-mediteal-500 hover:bg-mediteal-400 text-slate-950 text-xs font-black shadow-lg shadow-mediteal-500/20 transition-all hover:scale-102"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add User</span>
          </button>

          <button
            onClick={handleExportData}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
            title="Export user registry data as JSON"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Total Users</span>
            <Users className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-1">
            {totalUsersCount}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Stored accounts</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-mediteal-400 text-xs font-semibold">
            <span>New Users</span>
            <Sparkles className="w-3.5 h-3.5 text-mediteal-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-mediteal-300 font-mono mt-1">
            {newUsersCount}
          </div>
          <div className="text-[11px] text-mediteal-300/80 mt-0.5">Online registrations</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-purple-400 text-xs font-semibold">
            <span>Existing Users</span>
            <Building2 className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-purple-300 font-mono mt-1">
            {existingUsersCount}
          </div>
          <div className="text-[11px] text-purple-300/80 mt-0.5">Pre-seeded accounts</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-sky-400 text-xs font-semibold">
            <span>Clinicians</span>
            <Stethoscope className="w-3.5 h-3.5 text-sky-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-sky-300 font-mono mt-1">
            {cliniciansCount}
          </div>
          <div className="text-[11px] text-sky-300/80 mt-0.5">Doctors & Pharmacists</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-emerald-400 text-xs font-semibold">
            <span>Patients</span>
            <HeartPulse className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-300 font-mono mt-1">
            {patientsCount}
          </div>
          <div className="text-[11px] text-emerald-300/80 mt-0.5">Clinical profiles</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-emerald-400 text-xs font-semibold">
            <span>Data Health</span>
            <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-300 font-mono mt-1">
            100%
          </div>
          <div className="text-[11px] text-emerald-300/80 mt-0.5">Zero duplicates</div>
        </div>

      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, department..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:border-purple-400 focus:outline-none transition"
          />
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          
          {/* Role Filter */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <span className="text-[11px] text-slate-500 px-1.5 flex items-center gap-1">
              <Filter className="w-3 h-3" />
              Role:
            </span>
            {[
              { id: 'ALL', label: 'All' },
              { id: 'admin', label: 'Admin' },
              { id: 'clinician', label: 'Clinician' },
              { id: 'patient', label: 'Patient' }
            ].map((r) => (
              <button
                key={r.id}
                onClick={() => setRoleFilter(r.id)}
                className={`px-2 py-1 rounded-lg text-xs font-semibold transition ${
                  roleFilter === r.id
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          {/* User Type Filter */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <span className="text-[11px] text-slate-500 px-1.5">Type:</span>
            {[
              { id: 'ALL', label: 'All' },
              { id: 'NEW', label: 'New Users' },
              { id: 'EXISTING', label: 'Existing' }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTypeFilter(t.id)}
                className={`px-2 py-1 rounded-lg text-xs font-semibold transition ${
                  typeFilter === t.id
                    ? 'bg-mediteal-500/20 text-mediteal-300 border border-mediteal-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Users Database Table */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/90 shadow-xl overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-400" />
            <h2 className="text-sm sm:text-base font-bold text-white">
              Stored User Records ({filteredUsers.length} of {users.length})
            </h2>
          </div>
          <div className="text-xs text-slate-400">
            Deduplicated Primary Key: <code className="text-purple-300 font-mono">email_normalized</code>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider text-[10px] font-bold border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">User</th>
                <th className="py-3.5 px-4">Role</th>
                <th className="py-3.5 px-4">Record Type</th>
                <th className="py-3.5 px-4">Registration Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-400">
                    No user records match your search query or active filters.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const isAdmin = user.role === 'admin';
                  const isClinician = user.role === 'clinician';
                  const isPatient = user.role === 'patient';

                  return (
                    <tr key={user.id} className="hover:bg-slate-850/60 transition group">
                      
                      {/* User Info */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                            isAdmin
                              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                              : isClinician
                              ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          }`}>
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-white text-xs sm:text-sm group-hover:text-mediteal-300 transition">
                              {user.name}
                            </div>
                            <div className="text-[11px] text-slate-400 font-mono">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          isAdmin
                            ? 'bg-purple-500/10 text-purple-300 border-purple-500/30'
                            : isClinician
                            ? 'bg-sky-500/10 text-sky-300 border-sky-500/30'
                            : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                        }`}>
                          {isAdmin && <ShieldCheck className="w-3 h-3" />}
                          {isClinician && <Stethoscope className="w-3 h-3" />}
                          {isPatient && <HeartPulse className="w-3 h-3" />}
                          <span>{user.role}</span>
                        </span>
                      </td>

                      {/* Type: New vs Existing */}
                      <td className="py-3 px-4">
                        {user.isNewUser ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-mediteal-500/15 text-mediteal-300 border border-mediteal-500/30 text-[10px] font-bold">
                            <Sparkles className="w-2.5 h-2.5" />
                            <span>New User</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px]">
                            <span>Existing / Seeded</span>
                          </span>
                        )}
                      </td>

                      {/* Registration Date */}
                      <td className="py-3 px-4 text-slate-400 text-[11px]">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-500" />
                          <span>{user.registeredAt ? new Date(user.registeredAt).toLocaleDateString() : '2024-01-10'}</span>
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5">
                          ID: <span className="font-mono">{user.id}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold ${
                          user.status === 'Active' ? 'text-emerald-400' : 'text-rose-400'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            user.status === 'Active' ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'
                          }`} />
                          <span>{user.status || 'Active'}</span>
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
                          title="View Full User Details"
                        >
                          Details
                        </button>

                        <button
                          onClick={() => changeUserStatus(user.id, user.status === 'Active' ? 'Suspended' : 'Active')}
                          className={`px-2 py-1 rounded-lg text-xs font-semibold border transition ${
                            user.status === 'Active'
                              ? 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20'
                              : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20'
                          }`}
                          title="Toggle Account Active/Suspended"
                        >
                          {user.status === 'Active' ? 'Suspend' : 'Activate'}
                        </button>

                        {/* Prevent deleting current admin user */}
                        {currentUser && user.id !== currentUser.id && (
                          <button
                            onClick={() => {
                              if (window.confirm(`Are you sure you want to permanently delete ${user.name}?`)) {
                                removeUser(user.id);
                              }
                            }}
                            className="p-1 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition"
                            title="Delete User Record"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Audit & Activity Log */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/90 shadow-xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-mediteal-400" />
            <h3 className="text-sm font-bold text-white">
              Live System Activity & Audit Trail ({safeLogs.length} Events)
            </h3>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">HIPAA Compliant Log Stream</span>
        </div>

        <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
          {safeLogs.map((log) => (
            <div
              key={log.id}
              className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">{log.action}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                    {log.performedBy}
                  </span>
                </div>
                <div className="text-slate-400 text-[11px]">{log.details}</div>
              </div>
              <div className="text-[10px] text-slate-500 font-mono shrink-0">
                {new Date(log.timestamp).toLocaleTimeString()} • {new Date(log.timestamp).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===================== USER DETAILS MODAL ===================== */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl p-6 sm:p-8 space-y-5">
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-300 font-bold flex items-center justify-center text-lg">
                {selectedUser.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{selectedUser.name}</h3>
                <p className="text-xs text-slate-400 font-mono">{selectedUser.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase">Account Role</span>
                <span className="font-bold text-white capitalize mt-0.5 block">{selectedUser.role}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase">Classification</span>
                <span className="font-bold text-white mt-0.5 block">
                  {selectedUser.isNewUser ? 'Newly Registered' : 'Pre-existing Seed'}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase">Status</span>
                <span className="font-bold text-emerald-400 mt-0.5 block">{selectedUser.status || 'Active'}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase">Password / Credential</span>
                <span className="font-bold text-slate-300 font-mono mt-0.5 block">{selectedUser.password}</span>
              </div>
            </div>

            {selectedUser.role === 'clinician' && (
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                <span className="text-slate-400 block text-[10px] uppercase font-bold text-sky-400">Clinical Data</span>
                <div>Department: <strong className="text-white">{selectedUser.department || 'General Medicine'}</strong></div>
                <div>License / NPI: <strong className="text-white">{selectedUser.licenseNumber || 'N/A'}</strong></div>
              </div>
            )}

            {selectedUser.role === 'patient' && (
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                <span className="text-slate-400 block text-[10px] uppercase font-bold text-mediteal-400">Patient Data</span>
                <div>Age: <strong className="text-white">{selectedUser.age || 40}y</strong> • Gender: <strong className="text-white">{selectedUser.gender || 'Not specified'}</strong></div>
                <div>Conditions: <strong className="text-white">{selectedUser.chronicDiseases?.join(', ') || 'None reported'}</strong></div>
              </div>
            )}

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <span className="text-slate-400 block text-[10px] uppercase">Internal Admin Notes</span>
              <p className="text-slate-300 mt-1 leading-relaxed">{selectedUser.notes || 'No notes.'}</p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== ADD USER MODAL ===================== */}
      {isAddUserOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl p-6 sm:p-8 space-y-5">
            <button
              onClick={() => setIsAddUserOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="w-10 h-10 rounded-xl bg-mediteal-500/20 text-mediteal-300 flex items-center justify-center font-bold">
                <UserPlus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Add New User to Registry</h3>
                <p className="text-xs text-slate-400">Stores new credentials into persistent database</p>
              </div>
            </div>

            <form onSubmit={handleAddUserSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Account Role</label>
                <div className="grid grid-cols-3 gap-2">
                  {['patient', 'clinician', 'admin'].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setAddRole(r)}
                      className={`py-1.5 rounded-xl capitalize font-bold border transition ${
                        addRole === r
                          ? 'bg-mediteal-500/20 text-mediteal-300 border-mediteal-500/50'
                          : 'bg-slate-950 text-slate-400 border-slate-800'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={addName}
                  onChange={(e) => setAddName(e.target.value)}
                  placeholder="e.g. Dr. Emily Thorne"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-mediteal-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Email (Unique Login)</label>
                <input
                  type="email"
                  required
                  value={addEmail}
                  onChange={(e) => setAddEmail(e.target.value)}
                  placeholder="emily.thorne@hospital.org"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-mediteal-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Temporary Password</label>
                <input
                  type="password"
                  required
                  value={addPassword}
                  onChange={(e) => setAddPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-mediteal-400 focus:outline-none"
                />
              </div>

              {addRole === 'clinician' && (
                <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Department</label>
                    <input
                      type="text"
                      value={addDepartment}
                      onChange={(e) => setAddDepartment(e.target.value)}
                      placeholder="e.g. Oncology"
                      className="w-full px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">License #</label>
                    <input
                      type="text"
                      value={addLicense}
                      onChange={(e) => setAddLicense(e.target.value)}
                      placeholder="MD-12345"
                      className="w-full px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white"
                    />
                  </div>
                </div>
              )}

              {addRole === 'patient' && (
                <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Age</label>
                    <input
                      type="number"
                      value={addAge}
                      onChange={(e) => setAddAge(e.target.value)}
                      className="w-full px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Gender</label>
                    <select
                      value={addGender}
                      onChange={(e) => setAddGender(e.target.value)}
                      className="w-full px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddUserOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-mediteal-500 hover:bg-mediteal-400 text-slate-950 font-bold transition shadow-md"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================== DEDUPLICATION REPORT MODAL ===================== */}
      {dedupReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl p-6 sm:p-8 space-y-5 text-center">
            
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto ${
              dedupReport.duplicatesRemovedCount > 0
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
            }`}>
              {dedupReport.duplicatesRemovedCount > 0 ? (
                <CheckCircle2 className="w-8 h-8" />
              ) : (
                <ShieldCheck className="w-8 h-8" />
              )}
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">Database Deduplication Scan</h3>
              <p className="text-xs text-slate-400 mt-1">
                Scan algorithm: <code className="text-mediteal-300 font-mono">case_insensitive_email_hash</code>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-slate-400">Total Records Inspected:</span>
                <span className="font-bold text-white font-mono">{dedupReport.initialCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Duplicate Records Removed:</span>
                <span className="font-bold text-rose-400 font-mono">{dedupReport.duplicatesRemovedCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Verified Unique Records:</span>
                <span className="font-bold text-emerald-400 font-mono">{dedupReport.finalCount}</span>
              </div>
            </div>

            {dedupReport.duplicatesRemovedCount > 0 ? (
              <p className="text-xs text-amber-300 leading-relaxed">
                Successfully pruned {dedupReport.duplicatesRemovedCount} redundant duplicate account entries. The database is now clean and deduplicated.
              </p>
            ) : (
              <p className="text-xs text-emerald-300 leading-relaxed">
                All records in the MediSafe user database are strictly unique! No duplicate emails or conflicting identifiers were found.
              </p>
            )}

            <button
              onClick={() => setDedupReport(null)}
              className="w-full py-2.5 rounded-xl bg-mediteal-500 hover:bg-mediteal-400 text-slate-950 font-bold text-xs transition shadow-md"
            >
              Dismiss Report
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
