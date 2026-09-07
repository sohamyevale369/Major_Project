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
  const [addAdminToken, setAddAdminToken] = useState('');

  // Access Guard: The Admin Console is strictly restricted to verified Administrator users
  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6 animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center mx-auto shadow-sm">
          <Lock className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
            Access Prohibited
          </span>
          <h1 className="text-2xl font-black text-[#18231C]">
            No access to Admin Console for patients and doctors.
          </h1>
          <p className="text-xs sm:text-sm text-[#6F7771] max-w-md mx-auto leading-relaxed">
            Patients and doctors are strictly forbidden from accessing the Admin Console. Administrator rights to inspect user databases, alter statuses, or remove records are restricted solely to authorized administrators.
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-[#E5DFD1] text-xs max-w-sm mx-auto space-y-1.5 font-mono text-left text-[#4F5752] shadow-xs">
          <div><span className="text-[#8C938D]">Current User:</span> <span className="text-[#18231C] font-bold">{currentUser?.name || 'Guest'}</span></div>
          <div><span className="text-[#8C938D]">Role:</span> <span className="capitalize font-bold text-amber-600">{currentUser?.role || 'None'}</span></div>
          <div><span className="text-[#8C938D]">Access Status:</span> <span className="text-rose-600 font-bold">REJECTED (Non-Admin)</span></div>
        </div>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setActiveTab(currentUser?.role === 'patient' ? 'profile' : 'dashboard')}
            className="pill-btn-primary px-6 py-2.5 rounded-full bg-[#235339] text-white hover:bg-[#1B432E] font-bold text-xs transition shadow-md"
          >
            {currentUser?.role === 'patient' ? 'Go to My Personal Details' : 'Return to My Dashboard'}
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

    if (addRole === 'admin') {
      const trimmed = (addAdminToken || '').trim().toUpperCase();
      if (!trimmed || trimmed !== 'MEDI0284517') {
        showToast('Incorrect Token ID: Only authorized clinical employees can create an Admin account.', 'error');
        return;
      }
    }

    const result = adminAddUser({
      name: addName,
      email: addEmail,
      password: addPassword,
      role: addRole,
      adminToken: addRole === 'admin' ? addAdminToken.trim().toUpperCase() : undefined,
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
      setAddAdminToken('');
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
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5DFD1] shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#235339] text-[#F5F2EA] flex items-center justify-center text-2xl shadow-xs shrink-0 font-bold">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="section-tag">
                SYSTEM ADMINISTRATOR
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#E2EFE7] text-[#235339] text-[10px] font-mono border border-[#235339]/30 font-bold">
                FULL PRIVILEGES
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#18231C] tracking-tight">
              User Registry & Database Deduplication
            </h1>
            <p className="text-xs sm:text-sm text-[#6F7771] mt-1">
              Manage existing patient/doctor accounts, track newly registered users, enforce data uniqueness, and review system audit logs.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={handleRunDeduplication}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 text-xs font-bold transition shadow-xs"
            title="Scan database and remove all duplicate records"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Remove Duplicate Records</span>
          </button>

          <button
            onClick={() => setIsAddUserOpen(true)}
            className="pill-btn-primary flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#235339] hover:bg-[#1B432E] text-white text-xs font-bold transition shadow-xs"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add User</span>
          </button>

          <button
            onClick={handleExportData}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white hover:bg-[#F3EFE6] text-[#18231C] text-xs font-bold border border-[#D5CDBF] transition"
            title="Export user registry data as JSON"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        
        <div className="p-4 rounded-2xl bg-white border border-[#E5DFD1] shadow-xs">
          <div className="flex items-center justify-between text-[#6F7771] text-xs">
            <span className="font-medium">Total Users</span>
            <Users className="w-3.5 h-3.5 text-[#6F7771]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#18231C] font-mono mt-1">
            {totalUsersCount}
          </div>
          <div className="text-[11px] text-[#8C938D] mt-0.5">Stored accounts</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E5DFD1] shadow-xs">
          <div className="flex items-center justify-between text-[#235339] text-xs font-semibold">
            <span>New Users</span>
            <Sparkles className="w-3.5 h-3.5 text-[#235339]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#235339] font-mono mt-1">
            {newUsersCount}
          </div>
          <div className="text-[11px] text-[#4F5752] mt-0.5">Online registrations</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E5DFD1] shadow-xs">
          <div className="flex items-center justify-between text-purple-700 text-xs font-semibold">
            <span>Existing Users</span>
            <Building2 className="w-3.5 h-3.5 text-purple-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-purple-900 font-mono mt-1">
            {existingUsersCount}
          </div>
          <div className="text-[11px] text-purple-700 mt-0.5">Pre-seeded accounts</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E5DFD1] shadow-xs">
          <div className="flex items-center justify-between text-sky-700 text-xs font-semibold">
            <span>Clinicians</span>
            <Stethoscope className="w-3.5 h-3.5 text-sky-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-sky-900 font-mono mt-1">
            {cliniciansCount}
          </div>
          <div className="text-[11px] text-sky-700 mt-0.5">Doctors & Pharmacists</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E5DFD1] shadow-xs">
          <div className="flex items-center justify-between text-[#235339] text-xs font-semibold">
            <span>Patients</span>
            <HeartPulse className="w-3.5 h-3.5 text-[#235339]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#18231C] font-mono mt-1">
            {patientsCount}
          </div>
          <div className="text-[11px] text-[#4F5752] mt-0.5">Clinical profiles</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E5DFD1] shadow-xs">
          <div className="flex items-center justify-between text-[#235339] text-xs font-semibold">
            <span>Data Health</span>
            <FileCheck className="w-3.5 h-3.5 text-[#235339]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#235339] font-mono mt-1">
            100%
          </div>
          <div className="text-[11px] text-[#4F5752] mt-0.5">Zero duplicates</div>
        </div>

      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-[#E5DFD1] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, department..."
            className="w-full pl-9 pr-3.5 py-2 rounded-full bg-[#F3EFE6] border border-[#D5CDBF] text-[#18231C] text-xs focus:border-[#235339] focus:outline-none placeholder:text-[#8C938D] transition"
          />
          <Search className="w-3.5 h-3.5 text-[#8C938D] absolute left-3 top-2.5" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          
          {/* Role Filter */}
          <div className="flex items-center gap-1 bg-[#F6F4ED] p-1 rounded-full border border-[#E5DFD1] text-xs">
            <span className="text-[11px] text-[#6F7771] px-2 flex items-center gap-1 font-mono">
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
                className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                  roleFilter === r.id
                    ? 'bg-[#235339] text-white shadow-xs'
                    : 'text-[#6F7771] hover:text-[#18231C]'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          {/* User Type Filter */}
          <div className="flex items-center gap-1 bg-[#F6F4ED] p-1 rounded-full border border-[#E5DFD1] text-xs">
            <span className="text-[11px] text-[#6F7771] px-2 font-mono">Type:</span>
            {[
              { id: 'ALL', label: 'All' },
              { id: 'NEW', label: 'New Users' },
              { id: 'EXISTING', label: 'Existing' }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTypeFilter(t.id)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                  typeFilter === t.id
                    ? 'bg-[#235339] text-white shadow-xs'
                    : 'text-[#6F7771] hover:text-[#18231C]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Users Database Table */}
      <div className="rounded-3xl border border-[#E5DFD1] bg-white shadow-md overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-[#E5DFD1] flex items-center justify-between bg-[#F6F4ED]">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#235339]" />
            <h2 className="text-sm sm:text-base font-bold text-[#18231C]">
              Stored User Records ({filteredUsers.length} of {users.length})
            </h2>
          </div>
          <div className="text-xs text-[#6F7771] font-mono">
            Key: <code className="text-[#235339] font-bold">email_normalized</code>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F5] text-[#6F7771] uppercase tracking-wider text-[10px] font-bold border-b border-[#E5DFD1]">
              <tr>
                <th className="py-3.5 px-4 font-bold font-mono">User</th>
                <th className="py-3.5 px-4 font-bold font-mono">Role</th>
                <th className="py-3.5 px-4 font-bold font-mono">Record Type</th>
                <th className="py-3.5 px-4 font-bold font-mono">Registration Date</th>
                <th className="py-3.5 px-4 font-bold font-mono">Status</th>
                <th className="py-3.5 px-4 text-right font-bold font-mono">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5DFD1]">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-[#8C938D]">
                    No user records match your search query or active filters.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const isAdmin = user.role === 'admin';
                  const isClinician = user.role === 'clinician';
                  const isPatient = user.role === 'patient';

                  return (
                    <tr key={user.id} className="hover:bg-[#FBF9F5] transition group">
                      
                      {/* User Info */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                            isAdmin
                              ? 'bg-purple-100 text-purple-800 border border-purple-200'
                              : isClinician
                              ? 'bg-sky-100 text-sky-800 border border-sky-200'
                              : 'bg-[#E2EFE7] text-[#235339] border border-[#235339]/30'
                          }`}>
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-[#18231C] text-xs sm:text-sm group-hover:text-[#235339] transition">
                              {user.name}
                            </div>
                            <div className="text-[11px] text-[#6F7771] font-mono">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          isAdmin
                            ? 'bg-purple-100 text-purple-800 border-purple-200'
                            : isClinician
                            ? 'bg-sky-100 text-sky-800 border-sky-200'
                            : 'bg-[#E2EFE7] text-[#235339] border-[#235339]/30'
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
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E2EFE7] text-[#235339] border border-[#235339]/30 text-[10px] font-bold">
                            <Sparkles className="w-2.5 h-2.5" />
                            <span>New User</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#F3EFE6] text-[#4F5752] border border-[#D5CDBF] text-[10px] font-semibold">
                            <span>Existing / Seeded</span>
                          </span>
                        )}
                      </td>

                      {/* Registration Date */}
                      <td className="py-3 px-4 text-[#6F7771] text-[11px]">
                        <div className="flex items-center gap-1 font-medium">
                          <Calendar className="w-3 h-3 text-[#8C938D]" />
                          <span>{user.registeredAt ? new Date(user.registeredAt).toLocaleDateString() : '2024-01-10'}</span>
                        </div>
                        <div className="text-[10px] text-[#8C938D] mt-0.5">
                          ID: <span className="font-mono">{user.id}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold ${
                          user.status === 'Active' ? 'text-[#235339]' : 'text-rose-700'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            user.status === 'Active' ? 'bg-[#235339] animate-pulse' : 'bg-rose-600'
                          }`} />
                          <span>{user.status || 'Active'}</span>
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="px-2.5 py-1 rounded-full bg-white hover:bg-[#F3EFE6] text-[#18231C] text-xs font-bold border border-[#D5CDBF] transition"
                          title="View Full User Details"
                        >
                          Details
                        </button>

                        <button
                          onClick={() => changeUserStatus(user.id, user.status === 'Active' ? 'Suspended' : 'Active')}
                          className={`px-2.5 py-1 rounded-full text-xs font-bold border transition ${
                            user.status === 'Active'
                              ? 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
                              : 'bg-[#E2EFE7] text-[#235339] border-[#235339]/40 hover:bg-[#D4E8DC]'
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
                            className="p-1.5 text-[#8C938D] hover:text-rose-600 hover:bg-rose-50 rounded-full transition"
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
      <div className="rounded-3xl border border-[#E5DFD1] bg-white shadow-md p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-[#E5DFD1] pb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#235339]" />
            <h3 className="text-sm font-bold text-[#18231C]">
              Live System Activity & Audit Trail ({safeLogs.length} Events)
            </h3>
          </div>
          <span className="text-[11px] text-[#6F7771] font-mono">HIPAA Compliant Log Stream</span>
        </div>

        <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
          {safeLogs.map((log) => (
            <div
              key={log.id}
              className="p-3 rounded-2xl bg-[#F6F4ED] border border-[#E5DFD1] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#18231C]">{log.action}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-[#D5CDBF] text-[#4F5752] font-mono font-medium">
                    {log.performedBy}
                  </span>
                </div>
                <div className="text-[#6F7771] text-[11px]">{log.details}</div>
              </div>
              <div className="text-[10px] text-[#8C938D] font-mono shrink-0">
                {new Date(log.timestamp).toLocaleTimeString()} • {new Date(log.timestamp).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===================== USER DETAILS MODAL ===================== */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl border border-[#E5DFD1] bg-white shadow-2xl p-6 sm:p-8 space-y-5">
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-4 right-4 p-2 text-[#6F7771] hover:text-[#18231C] rounded-full hover:bg-[#F3EFE6] transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-[#E5DFD1] pb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#E2EFE7] text-[#235339] font-black flex items-center justify-center text-lg border border-[#235339]/30">
                {selectedUser.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-black text-[#18231C]">{selectedUser.name}</h3>
                <p className="text-xs text-[#6F7771] font-mono">{selectedUser.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-[#F6F4ED] border border-[#E5DFD1]">
                <span className="text-[#6F7771] block text-[10px] uppercase font-mono font-bold">Account Role</span>
                <span className="font-bold text-[#18231C] capitalize mt-0.5 block">{selectedUser.role}</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#F6F4ED] border border-[#E5DFD1]">
                <span className="text-[#6F7771] block text-[10px] uppercase font-mono font-bold">Classification</span>
                <span className="font-bold text-[#18231C] mt-0.5 block">
                  {selectedUser.isNewUser ? 'Newly Registered' : 'Pre-existing Seed'}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-[#F6F4ED] border border-[#E5DFD1]">
                <span className="text-[#6F7771] block text-[10px] uppercase font-mono font-bold">Status</span>
                <span className="font-bold text-[#235339] mt-0.5 block">{selectedUser.status || 'Active'}</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#F6F4ED] border border-[#E5DFD1]">
                <span className="text-[#6F7771] block text-[10px] uppercase font-mono font-bold">Password / Credential</span>
                <span className="font-bold text-[#4F5752] font-mono mt-0.5 block">{selectedUser.password}</span>
              </div>
            </div>

            {selectedUser.role === 'clinician' && (
              <div className="p-3 rounded-2xl bg-[#F6F4ED] border border-[#E5DFD1] text-xs space-y-1">
                <span className="text-sky-700 block text-[10px] uppercase font-bold font-mono">Clinical Data</span>
                <div>Department: <strong className="text-[#18231C]">{selectedUser.department || 'General Medicine'}</strong></div>
                <div>License / NPI: <strong className="text-[#18231C]">{selectedUser.licenseNumber || 'N/A'}</strong></div>
              </div>
            )}

            {selectedUser.role === 'patient' && (
              <div className="p-3 rounded-2xl bg-[#F6F4ED] border border-[#E5DFD1] text-xs space-y-1">
                <span className="text-[#235339] block text-[10px] uppercase font-bold font-mono">Patient Data</span>
                <div>Age: <strong className="text-[#18231C]">{selectedUser.age || 40}y</strong> • Gender: <strong className="text-[#18231C]">{selectedUser.gender || 'Not specified'}</strong></div>
                <div>Conditions: <strong className="text-[#18231C]">{selectedUser.chronicDiseases?.join(', ') || 'None reported'}</strong></div>
              </div>
            )}

            <div className="p-3 rounded-2xl bg-[#F6F4ED] border border-[#E5DFD1] text-xs">
              <span className="text-[#6F7771] block text-[10px] uppercase font-mono font-bold">Internal Admin Notes</span>
              <p className="text-[#4F5752] mt-1 leading-relaxed">{selectedUser.notes || 'No notes.'}</p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-5 py-2 rounded-full bg-white hover:bg-[#F3EFE6] text-[#18231C] text-xs font-bold border border-[#D5CDBF] transition"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== ADD USER MODAL ===================== */}
      {isAddUserOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl border border-[#E5DFD1] bg-white shadow-2xl p-6 sm:p-8 space-y-5">
            <button
              onClick={() => setIsAddUserOpen(false)}
              className="absolute top-4 right-4 p-2 text-[#6F7771] hover:text-[#18231C] rounded-full hover:bg-[#F3EFE6] transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-[#E5DFD1] pb-3">
              <div className="w-10 h-10 rounded-2xl bg-[#E2EFE7] text-[#235339] flex items-center justify-center font-bold border border-[#235339]/30">
                <UserPlus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-[#18231C]">Add New User to Registry</h3>
                <p className="text-xs text-[#6F7771]">Stores new credentials into persistent database</p>
              </div>
            </div>

            <form onSubmit={handleAddUserSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#18231C] font-semibold mb-1">Account Role</label>
                <div className="grid grid-cols-3 gap-2">
                  {['patient', 'clinician', 'admin'].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setAddRole(r)}
                      className={`py-2 rounded-xl capitalize font-bold border transition ${
                        addRole === r
                          ? 'bg-[#235339] text-white border-[#235339]'
                          : 'bg-[#F3EFE6] text-[#4F5752] border-[#D5CDBF]'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[#18231C] font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={addName}
                  onChange={(e) => setAddName(e.target.value)}
                  placeholder="e.g. Dr. Emily Thorne"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F3EFE6] border border-[#D5CDBF] text-[#18231C] focus:border-[#235339] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#18231C] font-semibold mb-1">Email (Unique Login)</label>
                <input
                  type="email"
                  required
                  value={addEmail}
                  onChange={(e) => setAddEmail(e.target.value)}
                  placeholder="emily.thorne@hospital.org"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F3EFE6] border border-[#D5CDBF] text-[#18231C] focus:border-[#235339] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#18231C] font-semibold mb-1">Temporary Password</label>
                <input
                  type="password"
                  required
                  value={addPassword}
                  onChange={(e) => setAddPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F3EFE6] border border-[#D5CDBF] text-[#18231C] focus:border-[#235339] focus:outline-none"
                />
              </div>

              {addRole === 'clinician' && (
                <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-[#F6F4ED] border border-[#E5DFD1]">
                  <div>
                    <label className="block text-[11px] text-[#6F7771] mb-1">Department</label>
                    <input
                      type="text"
                      value={addDepartment}
                      onChange={(e) => setAddDepartment(e.target.value)}
                      placeholder="e.g. Oncology"
                      className="w-full px-2.5 py-2 rounded-lg bg-white border border-[#D5CDBF] text-[#18231C]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#6F7771] mb-1">License #</label>
                    <input
                      type="text"
                      value={addLicense}
                      onChange={(e) => setAddLicense(e.target.value)}
                      placeholder="MD-12345"
                      className="w-full px-2.5 py-2 rounded-lg bg-white border border-[#D5CDBF] text-[#18231C]"
                    />
                  </div>
                </div>
              )}

              {addRole === 'admin' && (
                <div className="p-3 rounded-2xl bg-[#F6F4ED] border border-purple-300 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-[11px] font-bold text-purple-900">
                      Admin Authorization Token ID <span className="text-rose-600">*</span>
                    </label>
                    <span className="text-[10px] text-purple-700 font-mono font-bold">MEDI0284517</span>
                  </div>
                  <input
                    type="text"
                    required
                    value={addAdminToken}
                    onChange={(e) => setAddAdminToken(e.target.value)}
                    placeholder="Enter Unique Key (e.g. MEDI0284517)"
                    className="w-full px-3 py-2 rounded-lg bg-white border border-purple-400 text-[#18231C] font-mono text-xs focus:outline-none"
                  />
                  <p className="text-[10px] text-[#6F7771]">Required security key for administrator activation</p>
                </div>
              )}

              {addRole === 'patient' && (
                <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-[#F6F4ED] border border-[#E5DFD1]">
                  <div>
                    <label className="block text-[11px] text-[#6F7771] mb-1">Age</label>
                    <input
                      type="number"
                      value={addAge}
                      onChange={(e) => setAddAge(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-lg bg-white border border-[#D5CDBF] text-[#18231C]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#6F7771] mb-1">Gender</label>
                    <select
                      value={addGender}
                      onChange={(e) => setAddGender(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-lg bg-white border border-[#D5CDBF] text-[#18231C]"
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
                  className="px-4 py-2 rounded-full bg-white text-[#4F5752] font-semibold hover:bg-[#F3EFE6] border border-[#D5CDBF] transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="pill-btn-primary px-5 py-2 rounded-full bg-[#235339] hover:bg-[#1B432E] text-white font-bold transition shadow-sm"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-md rounded-3xl border border-[#E5DFD1] bg-white shadow-2xl p-6 sm:p-8 space-y-5 text-center">
            
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto ${
              dedupReport.duplicatesRemovedCount > 0
                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                : 'bg-[#E2EFE7] text-[#235339] border border-[#235339]/30'
            }`}>
              {dedupReport.duplicatesRemovedCount > 0 ? (
                <CheckCircle2 className="w-8 h-8" />
              ) : (
                <ShieldCheck className="w-8 h-8" />
              )}
            </div>

            <div>
              <h3 className="text-xl font-black text-[#18231C]">Database Deduplication Scan</h3>
              <p className="text-xs text-[#6F7771] mt-1">
                Scan algorithm: <code className="text-[#235339] font-mono font-bold">case_insensitive_email_hash</code>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F6F4ED] border border-[#E5DFD1] text-xs space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-[#6F7771]">Total Records Inspected:</span>
                <span className="font-bold text-[#18231C] font-mono">{dedupReport.initialCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6F7771]">Duplicate Records Removed:</span>
                <span className="font-bold text-rose-600 font-mono">{dedupReport.duplicatesRemovedCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6F7771]">Verified Unique Records:</span>
                <span className="font-bold text-[#235339] font-mono">{dedupReport.finalCount}</span>
              </div>
            </div>

            {dedupReport.duplicatesRemovedCount > 0 ? (
              <p className="text-xs text-amber-800 leading-relaxed font-medium">
                Successfully pruned {dedupReport.duplicatesRemovedCount} redundant duplicate account entries. The database is now clean and deduplicated.
              </p>
            ) : (
              <p className="text-xs text-[#235339] leading-relaxed font-semibold">
                All records in the MediSafe user database are strictly unique! No duplicate emails or conflicting identifiers were found.
              </p>
            )}

            <button
              onClick={() => setDedupReport(null)}
              className="pill-btn-primary w-full py-2.5 rounded-full bg-[#235339] hover:bg-[#1B432E] text-white font-bold text-xs transition shadow-sm"
            >
              Dismiss Report
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
