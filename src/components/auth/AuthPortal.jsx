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

  // Existing Admin Credentials State (Manual input option)
  const [showAdminInput, setShowAdminInput] = useState(false);
  const [adminInputEmail, setAdminInputEmail] = useState('tradersoham.369@gmail.com');
  const [adminInputPassword, setAdminInputPassword] = useState('Vnetra@1126');
  const [showAdminPassword, setShowAdminPassword] = useState(false);

  // Toggle Existing Admin Credentials input option (NO direct auto-login)
  const handleToggleAdminInput = (defaultEmail = 'tradersoham.369@gmail.com', defaultPass = 'Vnetra@1126') => {
    setErrorMessage('');
    if (showAdminInput && adminInputEmail === defaultEmail) {
      setShowAdminInput(false);
    } else {
      setAdminInputEmail(defaultEmail);
      setAdminInputPassword(defaultPass);
      setShowAdminInput(true);
    }
  };

  // Submit entered Admin credentials manually
  const handleAdminCredentialsSubmit = (e) => {
    if (e) e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    setTimeout(() => {
      const result = login(adminInputEmail, adminInputPassword);
      setLoading(false);
      if (!result.success) {
        setErrorMessage(result.message);
      }
    }, 400);
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
    <div className="min-h-screen bg-[#F6F4ED] text-[#18231C] flex flex-col justify-center items-center px-4 py-12 relative selection:bg-[#235339]/20 selection:text-[#235339]">
      
      {/* Main Container */}
      <div className="w-full max-w-xl relative z-10 space-y-6">

        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#235339] text-white shadow-sm mb-1">
            <span className="text-3xl font-black leading-none">+</span>
          </div>
          <div>
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-[#18231C] tracking-tight uppercase">
                MEDISAVE<span className="text-[#235339]">.AI</span>
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-[#E2EFE7] text-[#1E5034] border border-[#C6DDD0] text-[10px] font-mono font-bold tracking-wider uppercase">
                v2.0
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#5A645D] mt-1 max-w-md mx-auto">
              Clinical Drug Safety, Pharmacological Clash Scanner & Explainable AI
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E2EFE7] border border-[#C6DDD0] text-[11px] text-[#1E5034] font-semibold">
            <Lock className="w-3 h-3 text-[#235339]" />
            <span>Secure Authentication Required to Access Decision Engine</span>
          </div>
        </div>

        {/* Authentication Card */}
        <div className="ivory-card p-6 sm:p-8 space-y-6">

          {/* Mode Tabs (Clean Pill Toggle) */}
          <div className="grid grid-cols-2 p-1 rounded-full bg-[#ECE7DC] border border-[#D5CDBF]">
            <button
              type="button"
              onClick={() => {
                setActiveTab('login');
                setErrorMessage('');
              }}
              className={`py-2 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'login'
                  ? 'bg-[#235339] text-white shadow-sm'
                  : 'text-[#5A645D] hover:text-[#18231C]'
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
              className={`py-2 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'register'
                  ? 'bg-[#235339] text-white shadow-sm'
                  : 'text-[#5A645D] hover:text-[#18231C]'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Create Account</span>
            </button>
          </div>

          {/* Error Alert Box */}
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-start gap-2.5 animate-fade-in font-medium">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="leading-relaxed">{errorMessage}</div>
            </div>
          )}

          {/* ======================= SIGN IN FORM ======================= */}
          {activeTab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">

              <div>
                <label className="block text-xs font-bold text-[#18231C] mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="e.g. user@hospital.org or personal email"
                    className="ivory-input w-full pl-10 pr-3.5 py-2.5"
                  />
                  <Mail className="w-4 h-4 text-[#8D8678] absolute left-3.5 top-3" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-[#18231C]">
                    Password
                  </label>
                  <span className="text-[11px] text-[#6A746C]">Case-sensitive</span>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="ivory-input w-full pl-10 pr-10 py-2.5"
                  />
                  <Lock className="w-4 h-4 text-[#8D8678] absolute left-3.5 top-3" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1 absolute right-3 top-2.5 text-[#6A746C] hover:text-[#18231C]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="pill-btn-primary w-full py-3.5 text-sm font-bold shadow-md mt-2 disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Validating Credentials…
                  </span>
                ) : (
                  <>
                    <span>Sign In to Unlock Tasks</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Administrator Quick Access Divider */}
              <div className="relative flex py-1.5 items-center">
                <div className="flex-grow border-t border-[#D5CDBF]" />
                <span className="flex-shrink mx-2.5 text-[10px] font-bold tracking-wider text-[#6A746C] uppercase font-mono">
                  Administrator Access
                </span>
                <div className="flex-grow border-t border-[#D5CDBF]" />
              </div>

              {/* Option to Input User Existing Admin Credentials */}
              <div className="space-y-2">
                <button
                  type="button"
                  id="btn-login-existing-admin"
                  onClick={() => handleToggleAdminInput('tradersoham.369@gmail.com', 'Vnetra@1126')}
                  className={`w-full py-3 px-4 rounded-2xl border transition-all duration-200 shadow-sm hover:shadow group ${
                    showAdminInput
                      ? 'bg-purple-50 border-purple-400 text-purple-950 ring-1 ring-purple-300'
                      : 'bg-[#ECE7DC] hover:bg-[#E3DDD0] border-[#D5CDBF] hover:border-purple-300 text-[#18231C]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 text-left">
                    <div className="w-8 h-8 rounded-xl bg-purple-800 text-white flex items-center justify-center text-xs shadow-sm group-hover:scale-105 transition-transform shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold flex items-center gap-1.5">
                        <span>Login as Existing Admin</span>
                        <span className="text-[10px] bg-purple-100 text-purple-800 font-mono px-1.5 py-0.2 rounded font-bold">
                          Admin
                        </span>
                      </div>
                      <div className="text-[11px] text-[#5A645D] font-mono">
                        Input Previous Credentials (Manual Login)
                      </div>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 font-bold text-xs px-2.5 py-1 rounded-full transition-colors shrink-0 ${
                    showAdminInput
                      ? 'bg-purple-800 text-white'
                      : 'bg-purple-100 text-purple-900 group-hover:bg-purple-800 group-hover:text-white'
                  }`}>
                    <span>{showAdminInput ? 'Hide Inputs ▲' : 'Input Credentials ▼'}</span>
                  </div>
                </button>

                {/* Sub-bar showing previous accounts */}
                <div className="flex items-center justify-between text-[11px] text-[#6A746C] px-1 font-mono pt-0.5">
                  <span>Previous ID:</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleToggleAdminInput('tradersoham.369@gmail.com', 'Vnetra@1126')}
                      className="text-purple-800 hover:text-purple-950 font-bold hover:underline"
                      title="Select Soham Vikas Yevale (Admin)"
                    >
                      Soham Admin
                    </button>
                    <span>•</span>
                    <button
                      type="button"
                      onClick={() => handleToggleAdminInput('admin@medisafe.ai', 'Admin@123')}
                      className="text-purple-800 hover:text-purple-950 font-bold hover:underline"
                      title="Select System Administrator (Admin@123)"
                    >
                      System Admin
                    </button>
                  </div>
                </div>

                {/* Option to Input User Existing Credentials (NO direct login) */}
                {showAdminInput && (
                  <div className="p-4 rounded-2xl bg-purple-50/95 border-2 border-purple-200/90 space-y-3 animate-fade-in text-left mt-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <KeyRound className="w-4 h-4 text-purple-800" />
                        <span className="text-xs font-bold text-purple-950">
                          Input Existing Admin Credentials
                        </span>
                      </div>
                      <span className="text-[10px] uppercase font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded-full font-mono">
                        Manual Verification
                      </span>
                    </div>

                    <p className="text-[11px] text-[#5A645D] leading-relaxed">
                      Select an existing account to pre-fill or type your admin credentials below:
                    </p>

                    {/* Pre-fill Profile Chips */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                      <span className="text-[10px] font-bold text-[#6A746C] uppercase font-mono">
                        Select:
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setAdminInputEmail('tradersoham.369@gmail.com');
                          setAdminInputPassword('Vnetra@1126');
                        }}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition ${
                          adminInputEmail === 'tradersoham.369@gmail.com'
                            ? 'bg-purple-800 text-white border-purple-800 shadow-xs'
                            : 'bg-white text-purple-900 border-purple-200 hover:border-purple-400'
                        }`}
                      >
                        Soham Admin
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setAdminInputEmail('admin@medisafe.ai');
                          setAdminInputPassword('Admin@123');
                        }}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition ${
                          adminInputEmail === 'admin@medisafe.ai'
                            ? 'bg-purple-800 text-white border-purple-800 shadow-xs'
                            : 'bg-white text-purple-900 border-purple-200 hover:border-purple-400'
                        }`}
                      >
                        System Admin
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setAdminInputEmail('');
                          setAdminInputPassword('');
                        }}
                        className="px-2 py-0.5 rounded-full text-[11px] font-medium text-[#6A746C] hover:text-[#18231C] border border-transparent hover:border-slate-300"
                      >
                        Clear
                      </button>
                    </div>

                    {/* Manual Input Fields for Credentials */}
                    <div className="space-y-2.5 pt-1">
                      <div>
                        <label className="block text-[11px] font-bold text-purple-950 mb-1">
                          Admin Email Address
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            required
                            value={adminInputEmail}
                            onChange={(e) => setAdminInputEmail(e.target.value)}
                            placeholder="tradersoham.369@gmail.com or admin@medisafe.ai"
                            className="ivory-input w-full pl-9 pr-3 py-2 text-xs font-mono"
                          />
                          <Mail className="w-3.5 h-3.5 text-purple-600 absolute left-3 top-2.5" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-purple-950 mb-1">
                          Admin Password
                        </label>
                        <div className="relative">
                          <input
                            type={showAdminPassword ? 'text' : 'password'}
                            required
                            value={adminInputPassword}
                            onChange={(e) => setAdminInputPassword(e.target.value)}
                            placeholder="Enter previous admin password"
                            className="ivory-input w-full pl-9 pr-9 py-2 text-xs font-mono"
                          />
                          <Lock className="w-3.5 h-3.5 text-purple-600 absolute left-3 top-2.5" />
                          <button
                            type="button"
                            onClick={() => setShowAdminPassword(!showAdminPassword)}
                            className="p-1 absolute right-2.5 top-2 text-[#6A746C] hover:text-[#18231C]"
                          >
                            {showAdminPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Manual Submit Button */}
                    <button
                      type="button"
                      disabled={loading || !adminInputEmail || !adminInputPassword}
                      onClick={handleAdminCredentialsSubmit}
                      className="pill-btn-primary w-full py-2.5 text-xs font-bold bg-purple-800 hover:bg-purple-900 text-white shadow-sm mt-1 disabled:opacity-50"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Validating Admin Credentials…
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <ShieldCheck className="w-4 h-4" />
                          <span>Sign In with Admin Credentials</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </button>
                  </div>
                )}
              </div>

            </form>
          )}

          {/* ======================= REGISTRATION FORM ======================= */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold text-[#18231C] mb-1.5">
                  Select Your Account Role
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setRegRole('patient')}
                    className={`p-2.5 rounded-2xl text-xs font-bold border transition text-center ${
                      regRole === 'patient'
                        ? 'bg-[#235339] text-white border-[#235339] shadow-sm'
                        : 'bg-[#F3EFE6] text-[#4A554E] border-[#D5CDBF] hover:border-[#235339]'
                    }`}
                  >
                    <HeartPulse className={`w-4 h-4 mx-auto mb-1 ${regRole === 'patient' ? 'text-white' : 'text-[#235339]'}`} />
                    <span>Patient</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRegRole('clinician')}
                    className={`p-2.5 rounded-2xl text-xs font-bold border transition text-center ${
                      regRole === 'clinician'
                        ? 'bg-[#235339] text-white border-[#235339] shadow-sm'
                        : 'bg-[#F3EFE6] text-[#4A554E] border-[#D5CDBF] hover:border-[#235339]'
                    }`}
                  >
                    <Stethoscope className={`w-4 h-4 mx-auto mb-1 ${regRole === 'clinician' ? 'text-white' : 'text-sky-700'}`} />
                    <span>Doctor / Staff</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRegRole('admin')}
                    className={`p-2.5 rounded-2xl text-xs font-bold border transition text-center ${
                      regRole === 'admin'
                        ? 'bg-[#235339] text-white border-[#235339] shadow-sm'
                        : 'bg-[#F3EFE6] text-[#4A554E] border-[#D5CDBF] hover:border-[#235339]'
                    }`}
                  >
                    <ShieldCheck className={`w-4 h-4 mx-auto mb-1 ${regRole === 'admin' ? 'text-white' : 'text-purple-700'}`} />
                    <span>Admin</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#18231C] mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. Soham Vikas Yevale or Dr. Rajesh Sharma"
                    className="ivory-input w-full pl-10 pr-3.5 py-2.5"
                  />
                  <User className="w-4 h-4 text-[#8D8678] absolute left-3.5 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#18231C] mb-1.5">
                  Email Address <span className="text-[#6A746C] font-normal">(Unique Login ID)</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="your.email@hospital.org or personal email"
                    className="ivory-input w-full pl-10 pr-3.5 py-2.5"
                  />
                  <Mail className="w-4 h-4 text-[#8D8678] absolute left-3.5 top-2.5" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#18231C] mb-1.5">
                    Create Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Min 6 chars"
                      className="ivory-input w-full pl-10 pr-3.5 py-2.5"
                    />
                    <Lock className="w-4 h-4 text-[#8D8678] absolute left-3.5 top-2.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#18231C] mb-1.5">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="Repeat password"
                      className={`ivory-input w-full pl-10 pr-3.5 py-2.5 ${
                        regConfirmPassword && regPassword !== regConfirmPassword
                          ? 'border-rose-400 focus:border-rose-500'
                          : ''
                      }`}
                    />
                    <Lock className="w-4 h-4 text-[#8D8678] absolute left-3.5 top-2.5" />
                  </div>
                </div>
              </div>

              {/* Dynamic Role-specific details */}
              {regRole === 'clinician' && (
                <div className="p-3.5 rounded-2xl bg-[#ECE7DC] border border-[#D5CDBF] space-y-3">
                  <div className="text-xs font-bold text-[#18231C] flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#235339]" />
                    <span>Clinical Credentials</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] text-[#5A645D] font-bold mb-1">Medical Department</label>
                      <select
                        value={regDepartment}
                        onChange={(e) => setRegDepartment(e.target.value)}
                        className="ivory-input w-full px-2.5 py-1.5 text-xs"
                      >
                        <option value="General Medicine">General Medicine</option>
                        <option value="Cardiology">Cardiology</option>
                        <option value="Nephrology">Nephrology</option>
                        <option value="Endocrinology">Endocrinology</option>
                        <option value="Clinical Pharmacology">Clinical Pharmacology</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#5A645D] font-bold mb-1">License # or NPI</label>
                      <input
                        type="text"
                        value={regLicense}
                        onChange={(e) => setRegLicense(e.target.value)}
                        placeholder="e.g. MD-98421"
                        className="ivory-input w-full px-2.5 py-1.5 text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {regRole === 'patient' && (
                <div className="p-3.5 rounded-2xl bg-[#ECE7DC] border border-[#D5CDBF] space-y-3">
                  <div className="text-xs font-bold text-[#18231C] flex items-center gap-1.5">
                    <HeartPulse className="w-3.5 h-3.5 text-[#235339]" />
                    <span>Initial Patient Profile Setup</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] text-[#5A645D] font-bold mb-1">Age</label>
                      <input
                        type="number"
                        min="1"
                        max="120"
                        value={regAge}
                        onChange={(e) => setRegAge(e.target.value)}
                        className="ivory-input w-full px-2.5 py-1.5 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#5A645D] font-bold mb-1">Gender</label>
                      <select
                        value={regGender}
                        onChange={(e) => setRegGender(e.target.value)}
                        className="ivory-input w-full px-2.5 py-1.5 text-xs"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#5A645D] font-bold mb-1">Primary Chronic Condition (Optional)</label>
                    <select
                      value={regCondition}
                      onChange={(e) => setRegCondition(e.target.value)}
                      className="ivory-input w-full px-2.5 py-1.5 text-xs"
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
                <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-purple-900 flex items-center gap-1.5">
                      <KeyRound className="w-4 h-4 text-purple-700" />
                      <span>Admin Security Authorization</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-purple-800 bg-purple-100 px-2 py-0.5 rounded-full">
                      Restricted
                    </span>
                  </div>
                  <p className="text-[11px] text-[#4A554E] leading-relaxed">
                    System Administrators have full control over user records, database deduplication, and audits. Only authorized clinical employees with a verified security token can register.
                  </p>
                  <div>
                    <label className="block text-xs font-bold text-purple-950 mb-1.5">
                      Authorization Token ID <span className="text-rose-600">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={regAdminToken}
                        onChange={(e) => setRegAdminToken(e.target.value)}
                        placeholder="Enter Unique Key (e.g. MEDI0284517)"
                        className="ivory-input w-full pl-10 pr-3.5 py-2.5 font-mono font-bold tracking-wider"
                      />
                      <KeyRound className="w-4 h-4 text-purple-700 absolute left-3.5 top-3" />
                    </div>
                    <span className="text-[10px] text-[#6A746C] mt-1 block">
                      Case-insensitive • Required for administrator account activation
                    </span>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="pill-btn-primary w-full py-3.5 text-sm font-bold shadow-md mt-2 disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
        <div className="flex flex-wrap items-center justify-center gap-4 text-[#6A746C] text-xs text-center font-mono">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#235339]" />
            <span>256-Bit Encrypted Portal</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#235339]" />
            <span>Explainable AI Engine</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <FileCheck className="w-4 h-4 text-[#235339]" />
            <span>Automatic Deduplication</span>
          </span>
        </div>

      </div>

      {/* ================= INCORRECT TOKEN POPUP MODAL ================= */}
      {tokenErrorPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md rounded-3xl border border-rose-200 bg-white shadow-2xl p-6 sm:p-8 space-y-5 text-center text-[#18231C]">
            <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-700 border border-rose-200 flex items-center justify-center mx-auto text-2xl shadow-inner">
              🚫
            </div>
            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-bold text-[#18231C]">
                {tokenErrorPopup.title}
              </h3>
              <p className="text-xs text-[#5A645D] leading-relaxed pt-1.5">
                {tokenErrorPopup.message}
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#F3EFE6] border border-[#D5CDBF] text-left text-xs space-y-1.5 font-mono">
              <div className="flex justify-between text-[#5A645D]">
                <span>Attempted Role:</span>
                <span className="text-purple-700 font-bold">SYSTEM ADMIN</span>
              </div>
              <div className="flex justify-between text-[#5A645D]">
                <span>Security Rule:</span>
                <span className="text-[#18231C] font-semibold">Authorized Employees Only</span>
              </div>
              <div className="flex justify-between text-[#5A645D]">
                <span>Verification:</span>
                <span className="text-rose-700 font-bold">REJECTED (INVALID TOKEN)</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setTokenErrorPopup(null)}
              className="w-full py-2.5 rounded-full bg-[#C53030] hover:bg-[#9B2C2C] text-white font-bold text-xs transition shadow-md"
            >
              Close & Enter Correct Token
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
