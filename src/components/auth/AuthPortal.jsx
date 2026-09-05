import React, { useState } from 'react';
import {
  Shield,
  Lock,
  Mail,
  User,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Stethoscope,
  HeartPulse,
  Sparkles,
  ArrowRight,
  KeyRound,
  ShieldCheck,
  Building2,
  FileCheck,
  UserCheck
} from 'lucide-react';
import { useHealth } from '../../context/HealthContext';
import { DISEASE_LIST, ALLERGY_LIST } from '../../data/drugDatabase';

export default function AuthPortal() {
  const { login, register } = useHealth();
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Registration Form State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regRole, setRegRole] = useState('patient'); // 'patient' | 'clinician' | 'admin'
  const [regDepartment, setRegDepartment] = useState('General Medicine');
  const [regLicense, setRegLicense] = useState('');
  const [regAge, setRegAge] = useState('45');
  const [regGender, setRegGender] = useState('Male');
  const [regCondition, setRegCondition] = useState('');
  const [regAdminToken, setRegAdminToken] = useState('');
  const [tokenErrorPopup, setTokenErrorPopup] = useState(null);

  // Handle Login Submit
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    setTimeout(() => {
      const result = login(loginEmail, loginPassword);
      setLoading(false);
      if (!result.success) {
        setErrorMessage(result.message);
      }
    }, 400);
  };

  // 1-Click Demo Login
  const handleDemoLogin = (email, pass) => {
    setLoginEmail(email);
    setLoginPassword(pass);
    setErrorMessage('');
    setLoading(true);

    setTimeout(() => {
      login(email, pass);
      setLoading(false);
    }, 300);
  };

  // Handle Register Submit
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Validation 1: Email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(regEmail)) {
      setErrorMessage('Please provide a valid email address (e.g. user@domain.com).');
      return;
    }

    // Validation 2: Password strength
    if (regPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters in length.');
      return;
    }

    // Validation 3: Passwords match
    if (regPassword !== regConfirmPassword) {
      setErrorMessage('Passwords do not match. Please re-enter your password.');
      return;
    }

    // Validation 4: Admin Authorization Token ID verification
    if (regRole === 'admin') {
      const trimmedToken = (regAdminToken || '').trim().toUpperCase();
      if (!trimmedToken) {
        setTokenErrorPopup({
          title: 'Missing Admin Token ID',
          message: 'An Admin Authorization Token ID is strictly required to register a System Administrator account. Please enter the unique security key.'
        });
        setErrorMessage('Admin Authorization Token ID is required.');
        return;
      }

      if (trimmedToken !== 'MEDI0284517') {
        setTokenErrorPopup({
          title: 'Incorrect Token ID — Access Denied',
          message: 'The token ID entered is incorrect. Only authorized clinical employees with a verified security key can register as System Administrator.'
        });
        setErrorMessage('Incorrect Token ID: Registration rejected. Unauthorized key entered.');
        return;
      }
    }

    setLoading(true);

    setTimeout(() => {
      const payload = {
        name: regName,
        email: regEmail,
        password: regPassword,
        role: regRole,
        adminToken: regRole === 'admin' ? regAdminToken.trim().toUpperCase() : undefined,
        department: regRole === 'clinician' ? regDepartment : undefined,
        licenseNumber: regRole === 'clinician' ? (regLicense || 'MD-ACTIVE') : undefined,
        age: regAge ? Number(regAge) : 40,
        gender: regGender,
        chronicDiseases: regCondition ? [regCondition] : [],
        allergies: []
      };

      const result = register(payload);
      setLoading(false);
      if (!result.success) {
        setErrorMessage(result.message);
      }
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center px-4 py-8 relative overflow-hidden selection:bg-mediteal-500/30 selection:text-mediteal-300">
      
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-mediteal-500/10 via-mediblue-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-xl relative z-10 space-y-6">

        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-mediteal-400 to-mediblue-600 text-slate-950 shadow-xl shadow-mediteal-500/20 mb-1 ring-4 ring-mediteal-500/10 animate-fade-in">
            <Shield className="w-8 h-8 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                MediSafe<span className="text-mediteal-400">.AI</span>
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-mediteal-500/20 text-mediteal-300 border border-mediteal-500/40 text-[10px] font-mono font-bold tracking-wider uppercase">
                v2.0
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md mx-auto">
              Clinical Drug Safety, Pharmacological Clash Scanner & Explainable AI
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-mediteal-300 shadow-sm">
            <Lock className="w-3 h-3 text-mediteal-400" />
            <span>Secure Authentication Required to Access Clinical Tools</span>
          </div>
        </div>

        {/* Authentication Card */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/90 backdrop-blur-2xl shadow-2xl p-6 sm:p-8 space-y-6">

          {/* Mode Tabs */}
          <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-950 border border-slate-800">
            <button
              type="button"
              onClick={() => {
                setActiveTab('login');
                setErrorMessage('');
              }}
              className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'login'
                  ? 'bg-gradient-to-r from-mediteal-500 to-mediblue-600 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <KeyRound className="w-4 h-4" />
              <span>Sign In</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('register');
                setErrorMessage('');
              }}
              className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'register'
                  ? 'bg-gradient-to-r from-mediteal-500 to-mediblue-600 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Create Account</span>
            </button>
          </div>

          {/* Error Alert Box */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5 animate-fade-in">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div className="leading-relaxed">{errorMessage}</div>
            </div>
          )}

          {/* ======================= SIGN IN FORM ======================= */}
          {activeTab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {/* Quick 1-Click Instant Enter Buttons */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-mediteal-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    1-Click Instant Dashboard Access
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">No typing required</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleDemoLogin('sohamyevale624@gmail.com', 'Vnetra@1126')}
                    className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-500/15 to-mediteal-500/15 hover:from-emerald-500/25 hover:to-mediteal-500/25 border border-emerald-500/30 text-left transition group"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300">
                      <HeartPulse className="w-4 h-4 text-emerald-400" />
                      <span>Enter User Dashboard</span>
                    </div>
                    <div className="text-[10px] text-slate-400 truncate mt-0.5">Soham Vikas Yevale (Patient)</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDemoLogin('admin@medisafe.ai', 'Admin@123')}
                    className="p-2.5 rounded-xl bg-gradient-to-r from-purple-500/15 to-indigo-500/15 hover:from-purple-500/25 hover:to-indigo-500/25 border border-purple-500/30 text-left transition group"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold text-purple-300">
                      <ShieldCheck className="w-4 h-4 text-purple-400" />
                      <span>Enter Admin Registry</span>
                    </div>
                    <div className="text-[10px] text-slate-400 truncate mt-0.5">Stored Users & Deduplication</div>
                  </button>
                </div>
              </div>

              <div className="relative border-t border-slate-800 text-center my-1">
                <span className="bg-slate-900 px-3 text-[10px] uppercase tracking-wider text-slate-500 relative -top-2">
                  Or Sign In With Custom Email & Password
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="e.g. sohamyevale624@gmail.com"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:border-mediteal-400 focus:outline-none transition shadow-inner"
                  />
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    Password
                  </label>
                  <span className="text-[11px] text-slate-500">Case-sensitive</span>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:border-mediteal-400 focus:outline-none transition shadow-inner"
                  />
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1 absolute right-3 top-2.5 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-mediteal-500 to-mediblue-600 hover:from-mediteal-400 hover:to-mediblue-500 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-mediteal-500/20 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    Validating Credentials…
                  </span>
                ) : (
                  <>
                    <span>Sign In to Unlock Tasks</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* 1-Click Quick Demo Switcher */}
              <div className="pt-3 border-t border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Quick 1-Click Demo Accounts:
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">Instant Fill</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => handleDemoLogin('sohamyevale624@gmail.com', 'Vnetra@1126')}
                    className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-mediteal-500/40 text-left transition group"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold text-mediteal-300">
                      <HeartPulse className="w-3.5 h-3.5" />
                      <span>Patient</span>
                    </div>
                    <div className="text-[10px] text-slate-400 truncate mt-0.5">Soham Vikas Yevale (Patient)</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDemoLogin('dr.sharma@medisafe.ai', 'Doctor@123')}
                    className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-sky-500/40 text-left transition group"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold text-sky-300">
                      <Stethoscope className="w-3.5 h-3.5" />
                      <span>Clinician</span>
                    </div>
                    <div className="text-[10px] text-slate-400 truncate mt-0.5">Dr. Rajesh Sharma, MD</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDemoLogin('admin@medisafe.ai', 'Admin@123')}
                    className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-purple-500/40 text-left transition group"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold text-purple-300">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Admin</span>
                    </div>
                    <div className="text-[10px] text-slate-400 truncate mt-0.5">Full Audit & Users</div>
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* ======================= REGISTRATION FORM ======================= */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Select Your Account Role
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setRegRole('patient')}
                    className={`p-2 rounded-xl text-xs font-bold border transition text-center ${
                      regRole === 'patient'
                        ? 'bg-mediteal-500/20 text-mediteal-300 border-mediteal-500/60 shadow-sm'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <HeartPulse className="w-4 h-4 mx-auto mb-1 text-mediteal-400" />
                    <span>Patient</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRegRole('clinician')}
                    className={`p-2 rounded-xl text-xs font-bold border transition text-center ${
                      regRole === 'clinician'
                        ? 'bg-mediteal-500/20 text-mediteal-300 border-mediteal-500/60 shadow-sm'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <Stethoscope className="w-4 h-4 mx-auto mb-1 text-sky-400" />
                    <span>Doctor / Staff</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRegRole('admin')}
                    className={`p-2 rounded-xl text-xs font-bold border transition text-center ${
                      regRole === 'admin'
                        ? 'bg-mediteal-500/20 text-mediteal-300 border-mediteal-500/60 shadow-sm'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 mx-auto mb-1 text-purple-400" />
                    <span>Admin</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. Soham Vikas Yevale or Dr. Rajesh Sharma"
                    className="w-full pl-10 pr-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:border-mediteal-400 focus:outline-none transition"
                  />
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Email Address <span className="text-slate-500 font-normal">(Unique Login ID)</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="your.email@hospital.org or personal email"
                    className="w-full pl-10 pr-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:border-mediteal-400 focus:outline-none transition"
                  />
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-2.5" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Create Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Min 6 chars"
                      className="w-full pl-10 pr-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:border-mediteal-400 focus:outline-none transition"
                    />
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-2.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="Repeat password"
                      className={`w-full pl-10 pr-3.5 py-2 rounded-xl bg-slate-950 border text-white text-xs sm:text-sm focus:outline-none transition ${
                        regConfirmPassword && regPassword !== regConfirmPassword
                          ? 'border-rose-500 focus:border-rose-400'
                          : 'border-slate-700 focus:border-mediteal-400'
                      }`}
                    />
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-2.5" />
                  </div>
                </div>
              </div>

              {/* Dynamic Role-specific details */}
              {regRole === 'clinician' && (
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
                  <div className="text-xs font-bold text-sky-300 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Clinical Credentials</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Medical Department</label>
                      <select
                        value={regDepartment}
                        onChange={(e) => setRegDepartment(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                      >
                        <option value="General Medicine">General Medicine</option>
                        <option value="Cardiology">Cardiology</option>
                        <option value="Nephrology">Nephrology</option>
                        <option value="Endocrinology">Endocrinology</option>
                        <option value="Clinical Pharmacology">Clinical Pharmacology</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">License # or NPI</label>
                      <input
                        type="text"
                        value={regLicense}
                        onChange={(e) => setRegLicense(e.target.value)}
                        placeholder="e.g. MD-98421"
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {regRole === 'patient' && (
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
                  <div className="text-xs font-bold text-mediteal-300 flex items-center gap-1.5">
                    <HeartPulse className="w-3.5 h-3.5" />
                    <span>Patient Profile Setup</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Age</label>
                      <input
                        type="number"
                        min="1"
                        max="120"
                        value={regAge}
                        onChange={(e) => setRegAge(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Gender</label>
                      <select
                        value={regGender}
                        onChange={(e) => setRegGender(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Primary Chronic Condition (Optional)</label>
                    <select
                      value={regCondition}
                      onChange={(e) => setRegCondition(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                    >
                      <option value="">None / Healthy</option>
                      {DISEASE_LIST.map((dis) => (
                        <option key={dis} value={dis}>{dis}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {regRole === 'admin' && (
                <div className="p-4 rounded-2xl bg-purple-950/35 border border-purple-500/40 space-y-3 animate-fade-in shadow-inner">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                      <KeyRound className="w-4 h-4 text-purple-400" />
                      <span>Admin Security Authorization</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded-md border border-purple-500/40">
                      Restricted
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    System Administrators have full control over user records, database deduplication, and audits. Only authorized clinical employees with a verified security token can register.
                  </p>
                  <div>
                    <label className="block text-xs font-semibold text-purple-200 mb-1.5">
                      Authorization Token ID <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={regAdminToken}
                        onChange={(e) => setRegAdminToken(e.target.value)}
                        placeholder="Enter Unique Key (e.g. MEDI0284517)"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-purple-500/50 text-white font-mono font-bold tracking-wider text-xs sm:text-sm focus:border-purple-400 focus:outline-none transition shadow-inner"
                      />
                      <KeyRound className="w-4 h-4 text-purple-400 absolute left-3.5 top-3" />
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      Case-insensitive • Required for administrator account activation
                    </span>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-mediteal-500 to-mediblue-600 hover:from-mediteal-400 hover:to-mediblue-500 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-mediteal-500/20 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    Registering Account & Deduplicating…
                  </span>
                ) : (
                  <>
                    <span>Complete Registration & Unlock Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

        </div>

        {/* Security & Regulatory Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400 text-xs text-center">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>256-Bit Encrypted Portal</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-mediteal-400" />
            <span>Explainable AI Engine</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <FileCheck className="w-4 h-4 text-sky-400" />
            <span>Automatic Deduplication</span>
          </span>
        </div>

      </div>

      {/* ================= INCORRECT TOKEN POPUP MODAL ================= */}
      {tokenErrorPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md rounded-3xl border border-rose-500/40 bg-slate-900 shadow-2xl p-6 sm:p-8 space-y-5 text-center">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center mx-auto text-2xl shadow-inner">
              🚫
            </div>
            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {tokenErrorPopup.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed pt-1.5">
                {tokenErrorPopup.message}
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-left text-xs space-y-1.5 font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Attempted Role:</span>
                <span className="text-purple-400 font-bold">SYSTEM ADMIN</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Security Rule:</span>
                <span className="text-slate-200">Authorized Employees Only</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Verification:</span>
                <span className="text-rose-400 font-bold">REJECTED (INVALID TOKEN)</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setTokenErrorPopup(null)}
              className="w-full py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs transition shadow-lg shadow-rose-500/20"
            >
              Close & Enter Correct Token
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
