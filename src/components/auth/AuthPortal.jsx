import React, { useState, useEffect } from 'react';
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
  UserCheck,
  RotateCcw,
  Check,
  Clock,
  ChevronLeft,
  Copy,
  Send,
  X
} from 'lucide-react';
import { useHealth } from '../../context/HealthContext';
import { DISEASE_LIST, ALLERGY_LIST } from '../../data/drugDatabase';
import { MediSafeLogoMark } from '../common/BrandLogo';

export default function AuthPortal({ isModal = false, onClose = null }) {
  const { login, register, requestPasswordResetOtp, resetPassword, senderEmail, setIsAuthModalOpen } = useHealth();

  const handleCloseModal = () => {
    if (typeof onClose === 'function') {
      onClose();
    } else {
      setIsAuthModalOpen(false);
    }
  };
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register' | 'forgot'
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Forgot Password State
  const [forgotStep, setForgotStep] = useState(1); // 1: Email, 2: OTP & New Password, 3: Success
  const [forgotEmail, setForgotEmail] = useState('');
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [forgotNewPassword, setForgotNewPassword] = useState('');
  const [forgotConfirmPassword, setForgotConfirmPassword] = useState('');
  const [showForgotNewPassword, setShowForgotNewPassword] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState('');

  // Timer countdown for OTP resend cooldown
  useEffect(() => {
    let interval = null;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [otpTimer]);

  // Handle OTP digit box change
  const handleOtpChange = (index, value) => {
    const cleaned = value.replace(/\D/g, '');
    if (!cleaned) {
      const updated = [...otpDigits];
      updated[index] = '';
      setOtpDigits(updated);
      return;
    }

    // Handle full paste (e.g. user pastes 6 digits)
    if (cleaned.length > 1) {
      const pasteDigits = cleaned.slice(0, 6).split('');
      const updated = [...otpDigits];
      for (let i = 0; i < 6; i++) {
        updated[i] = pasteDigits[i] || '';
      }
      setOtpDigits(updated);
      const nextIndex = Math.min(pasteDigits.length, 5);
      const nextEl = document.getElementById(`otp-digit-${nextIndex}`);
      if (nextEl) nextEl.focus();
      return;
    }

    const updated = [...otpDigits];
    updated[index] = cleaned[0];
    setOtpDigits(updated);

    if (index < 5) {
      const nextEl = document.getElementById(`otp-digit-${index + 1}`);
      if (nextEl) nextEl.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      const prevEl = document.getElementById(`otp-digit-${index - 1}`);
      if (prevEl) prevEl.focus();
    }
  };

  // Step 1: Send OTP to registered email
  const handleSendOtp = async (e) => {
    if (e) e.preventDefault();
    setForgotError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(forgotEmail)) {
      setForgotError('Please enter a valid registered email address (e.g. user@example.com).');
      return;
    }

    setForgotLoading(true);
    const result = await requestPasswordResetOtp(forgotEmail);
    setForgotLoading(false);

    if (result.success) {
      setOtpDigits(['', '', '', '', '', '']);
      setOtpTimer(60);
      setForgotStep(2);
    } else {
      setForgotError(result.message);
    }
  };

  // Step 2: Verify OTP and save new password
  const handleVerifyAndUpdatePassword = (e) => {
    e.preventDefault();
    setForgotError('');

    const enteredOtp = otpDigits.join('');
    if (enteredOtp.length !== 6) {
      setForgotError('Please enter the complete 6-digit OTP code dispatched to your email.');
      return;
    }

    if (forgotNewPassword.length < 6) {
      setForgotError('New password must be at least 6 characters in length.');
      return;
    }

    if (forgotNewPassword !== forgotConfirmPassword) {
      setForgotError('Passwords do not match. Please re-enter your new password.');
      return;
    }

    setForgotLoading(true);
    setTimeout(() => {
      const result = resetPassword(forgotEmail, enteredOtp, forgotNewPassword);
      setForgotLoading(false);
      if (result.success) {
        setForgotStep(3);
      } else {
        setForgotError(result.message);
      }
    }, 450);
  };

  const handleProceedToSignIn = () => {
    setLoginEmail(forgotEmail);
    setLoginPassword('');
    setForgotStep(1);
    setForgotError('');
    setErrorMessage('');
    setActiveTab('login');
  };

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

  // Existing Admin Credentials State (Manual input option - always blank by default)
  const [showAdminInput, setShowAdminInput] = useState(false);
  const [adminInputEmail, setAdminInputEmail] = useState('');
  const [adminInputPassword, setAdminInputPassword] = useState('');
  const [showAdminPassword, setShowAdminPassword] = useState(false);

  // Toggle Existing Admin Credentials input option (NO auto-fill, inputs remain blank)
  const handleToggleAdminInput = () => {
    setErrorMessage('');
    setShowAdminInput((prev) => !prev);
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
  const handleRegisterSubmit = async (e) => {
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

    try {
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

      const result = await register(payload);
      setLoading(false);
      if (!result.success) {
        setErrorMessage(result.message || 'Registration could not be completed.');
      }
    } catch (err) {
      setLoading(false);
      setErrorMessage(err.message || 'An unexpected error occurred during registration.');
    }
  };

  const formContent = (
    <>
      <div className={`w-full max-w-xl relative z-10 space-y-6 ${isModal ? 'my-6 sm:my-8' : ''}`}>
      {/* If modal, close button at top-right */}
      {isModal && (
        <div className="flex justify-end -mb-3">
          <button
            type="button"
            onClick={handleCloseModal}
            className="p-2 rounded-full bg-white hover:bg-[#F3EFE6] text-[#424C44] hover:text-[#18231C] border border-[#D5CDBF] shadow-md transition group"
            title="Close and continue browsing"
          >
            <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      )}

      {/* Brand Header */}
      <div className="text-center space-y-3">
          <div className="flex items-center justify-center mb-1 drop-shadow-md">
            <MediSafeLogoMark size={58} />
          </div>
          <div>
            <div className="flex items-center justify-center gap-2">
              <h1 className={`text-2xl sm:text-3xl font-black tracking-tight uppercase ${
                isModal ? 'text-white drop-shadow-md' : 'text-[#18231C]'
              }`}>
                MEDISAVE<span className={isModal ? 'text-emerald-400 drop-shadow-sm' : 'text-[#235339]'}>.AI</span>
              </h1>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border shadow-xs ${
                isModal
                  ? 'bg-emerald-500/25 text-emerald-300 border-emerald-400/40'
                  : 'bg-[#E2EFE7] text-[#1E5034] border-[#C6DDD0]'
              }`}>
                v2.4
              </span>
            </div>
            <p className={`text-xs sm:text-sm mt-1.5 max-w-md mx-auto font-medium ${
              isModal ? 'text-slate-100 drop-shadow-sm' : 'text-[#5A645D]'
            }`}>
              Clinical Drug Safety, Pharmacological Clash Scanner & Explainable AI
            </p>
          </div>

          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold border shadow-md ${
            isModal
              ? 'bg-white text-[#18231C] border-[#D5CDBF]'
              : 'bg-[#E2EFE7] border-[#C6DDD0] text-[#1E5034]'
          }`}>
            <Lock className="w-3.5 h-3.5 text-[#235339]" />
            <span>Secure Authentication Required to Access Decision Engine</span>
          </div>
        </div>

        {/* Authentication Card */}
        <div className="ivory-card p-6 sm:p-8 space-y-6">

          {/* Mode Tabs (Clean 3-Pill Toggle) */}
          <div className="grid grid-cols-3 p-1 rounded-full bg-[#ECE7DC] border border-[#D5CDBF]">
            <button
              type="button"
              onClick={() => {
                setActiveTab('login');
                setErrorMessage('');
                setForgotError('');
              }}
              className={`py-2 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'login'
                  ? 'bg-[#235339] text-white shadow-sm'
                  : 'text-[#5A645D] hover:text-[#18231C]'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('register');
                setErrorMessage('');
                setForgotError('');
              }}
              className={`py-2 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'register'
                  ? 'bg-[#235339] text-white shadow-sm'
                  : 'text-[#5A645D] hover:text-[#18231C]'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Create Account</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('forgot');
                setForgotEmail(loginEmail || regEmail || '');
                setErrorMessage('');
                setForgotError('');
              }}
              className={`py-2 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'forgot'
                  ? 'bg-[#235339] text-white shadow-sm'
                  : 'text-[#5A645D] hover:text-[#18231C]'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Forgot Password</span>
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
                    autoComplete="off"
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
                    autoComplete="off"
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

                {/* Option to Reset / Forgot Password in Sign In */}
                <div className="flex items-center justify-between text-xs pt-1.5">
                  <span className="text-[11px] text-[#6A746C]">Forgotten password?</span>
                  <button
                    type="button"
                    onClick={() => {
                      setForgotEmail(loginEmail || '');
                      setForgotStep(1);
                      setErrorMessage('');
                      setForgotError('');
                      setActiveTab('forgot');
                    }}
                    className="text-[11px] font-bold text-[#235339] hover:underline flex items-center gap-1 group"
                  >
                    <RotateCcw className="w-3 h-3 text-[#235339] group-hover:rotate-180 transition-transform duration-300" />
                    <span>Forgot Password?</span>
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
                  onClick={handleToggleAdminInput}
                  className={`w-full py-3 px-4 rounded-2xl border transition-all duration-200 shadow-sm hover:shadow group ${
                    showAdminInput
                      ? 'bg-[#EAF3ED] border-[#235339] text-[#18231C] ring-1 ring-[#235339]/30'
                      : 'bg-[#ECE7DC] hover:bg-[#E3DDD0] border-[#D5CDBF] hover:border-[#235339]/60 text-[#18231C]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 text-left">
                    <div className="w-8 h-8 rounded-xl bg-[#235339] text-white flex items-center justify-center text-xs shadow-sm group-hover:scale-105 transition-transform shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold flex items-center gap-1.5 text-[#18231C]">
                        <span>Login as Existing Admin</span>
                        <span className="text-[10px] bg-[#E2EFE7] text-[#1E5034] border border-[#C6DDD0] font-mono px-1.5 py-0.2 rounded font-bold">
                          Admin
                        </span>
                      </div>
                      <div className="text-[11px] text-[#5A645D] font-mono">
                        Manual Verification
                      </div>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 font-bold text-xs px-2.5 py-1 rounded-full transition-colors shrink-0 ${
                    showAdminInput
                      ? 'bg-[#235339] text-white'
                      : 'bg-[#E2EFE7] text-[#1E5034] border border-[#C6DDD0] group-hover:bg-[#235339] group-hover:text-white'
                  }`}>
                    <span>{showAdminInput ? 'Hide Inputs ▲' : 'Input Credentials ▼'}</span>
                  </div>
                </button>

                {/* Option to Input User Existing Credentials (NO direct login, inputs always blank) */}
                {showAdminInput && (
                  <div className="p-4 rounded-2xl bg-[#EAF3ED]/80 border-2 border-[#C6DDD0] space-y-3 animate-fade-in text-left mt-2 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <KeyRound className="w-4 h-4 text-[#235339]" />
                        <span className="text-xs font-bold text-[#18231C]">
                          Input Existing Admin Credentials
                        </span>
                      </div>
                      <span className="text-[10px] uppercase font-bold text-[#1E5034] bg-[#E2EFE7] border border-[#C6DDD0] px-2 py-0.5 rounded-full font-mono">
                        Manual Verification
                      </span>
                    </div>

                    <p className="text-[11px] text-[#5A645D] leading-relaxed">
                      Enter your administrator credentials below:
                    </p>

                    {/* Manual Input Fields for Credentials */}
                    <div className="space-y-2.5 pt-1">
                      <div>
                        <label className="block text-[11px] font-bold text-[#18231C] mb-1">
                          Admin Email Address
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            required
                            autoComplete="off"
                            value={adminInputEmail}
                            onChange={(e) => setAdminInputEmail(e.target.value)}
                            placeholder="Enter admin email address"
                            className="ivory-input w-full pl-9 pr-3 py-2 text-xs font-mono bg-white border-[#C6DDD0] focus:border-[#235339]"
                          />
                          <Mail className="w-3.5 h-3.5 text-[#235339] absolute left-3 top-2.5" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-[#18231C] mb-1">
                          Admin Password
                        </label>
                        <div className="relative">
                          <input
                            type={showAdminPassword ? 'text' : 'password'}
                            required
                            autoComplete="new-password"
                            value={adminInputPassword}
                            onChange={(e) => setAdminInputPassword(e.target.value)}
                            placeholder="Enter admin password"
                            className="ivory-input w-full pl-9 pr-9 py-2 text-xs font-mono bg-white border-[#C6DDD0] focus:border-[#235339]"
                          />
                          <Lock className="w-3.5 h-3.5 text-[#235339] absolute left-3 top-2.5" />
                          <button
                            type="button"
                            onClick={() => setShowAdminPassword(!showAdminPassword)}
                            className="p-1 absolute right-2.5 top-2 text-[#6A746C] hover:text-[#18231C]"
                            aria-label={showAdminPassword ? 'Hide password' : 'Show password'}
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
                      className="pill-btn-primary w-full py-2.5 text-xs font-bold shadow-md bg-[#235339] hover:bg-[#1A3E2B] text-white mt-1 disabled:opacity-50"
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
                    <ShieldCheck className={`w-4 h-4 mx-auto mb-1 ${regRole === 'admin' ? 'text-white' : 'text-[#235339]'}`} />
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
                <div className="p-4 rounded-2xl bg-[#EAF3ED]/80 border border-[#C6DDD0] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-[#18231C] flex items-center gap-1.5">
                      <KeyRound className="w-4 h-4 text-[#235339]" />
                      <span>Admin Security Authorization</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#1E5034] bg-[#E2EFE7] border border-[#C6DDD0] px-2 py-0.5 rounded-full">
                      Restricted
                    </span>
                  </div>
                  <p className="text-[11px] text-[#4A554E] leading-relaxed">
                    System Administrators have full control over user records, database deduplication, and audits. Only authorized clinical employees with a verified security token can register.
                  </p>
                  <div>
                    <label className="block text-xs font-bold text-[#18231C] mb-1.5">
                      Authorization Token ID <span className="text-rose-600">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={regAdminToken}
                        onChange={(e) => setRegAdminToken(e.target.value)}
                        placeholder="Enter Unique Key (e.g. MEDI0284517)"
                        className="ivory-input w-full pl-10 pr-3.5 py-2.5 font-mono font-bold tracking-wider bg-white border-[#C6DDD0] focus:border-[#235339]"
                      />
                      <KeyRound className="w-4 h-4 text-[#235339] absolute left-3.5 top-3" />
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

              {/* Option to Reset / Forgot Password in Register */}
              <div className="text-center text-xs text-[#5A645D] pt-3 border-t border-[#D5CDBF] flex items-center justify-center gap-1.5">
                <span>Already have an account but forgot your password?</span>
                <button
                  type="button"
                  onClick={() => {
                    setForgotEmail(regEmail || '');
                    setForgotStep(1);
                    setErrorMessage('');
                    setForgotError('');
                    setActiveTab('forgot');
                  }}
                  className="text-[#235339] font-bold hover:underline inline-flex items-center gap-1 group"
                >
                  <RotateCcw className="w-3 h-3 text-[#235339] group-hover:rotate-180 transition-transform duration-300" />
                  <span>Forgot Password?</span>
                </button>
              </div>
            </form>
          )}

          {/* ======================= FORGOT PASSWORD / RESET WORKFLOW ======================= */}
          {activeTab === 'forgot' && (
            <div className="space-y-5 animate-fade-in text-left">

              {/* Header Info */}
              <div className="flex items-center justify-between border-b border-[#D5CDBF] pb-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#235339] text-white flex items-center justify-center text-xs shadow-sm">
                    <RotateCcw className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-[#18231C] tracking-tight uppercase">
                      Reset Password
                    </h3>
                    <p className="text-[11px] text-[#5A645D]">
                      6-digit OTP verification sent from sender
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E2EFE7] border border-[#C6DDD0] text-[10px] font-mono text-[#1E5034] font-bold">
                  <Mail className="w-3 h-3 text-[#235339]" />
                  <span>sohamyevale1126@gmail.com</span>
                </div>
              </div>

              {/* Sender & Security Notice Badge */}
              <div className="p-3 rounded-2xl bg-[#EAF3ED] border border-[#C6DDD0] flex items-start gap-2.5 text-xs text-[#1E5034]">
                <ShieldCheck className="w-4 h-4 text-[#235339] shrink-0 mt-0.5" />
                <div className="leading-relaxed text-[11px]">
                  <span>Authorized verification code will be sent to your registered email from </span>
                  <strong className="font-mono text-[#18231C] bg-white px-1.5 py-0.5 rounded border border-[#C6DDD0]">
                    sohamyevale1126@gmail.com
                  </strong>.
                </div>
              </div>

              {/* Error Message Box */}
              {forgotError && (
                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-start gap-2.5 animate-fade-in font-medium">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div className="leading-relaxed">{forgotError}</div>
                </div>
              )}

              {/* Mailbox Notice (No OTP displayed on screen - user must check their inbox) */}
              {forgotStep === 2 && (
                <div className="p-4 rounded-2xl bg-[#EAF3ED] border border-[#C6DDD0] space-y-2.5 animate-fade-in text-left">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#235339] text-white flex items-center justify-center text-xs shadow-sm shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#18231C] flex items-center gap-1.5">
                        <span>OTP Dispatched to Your Mailbox</span>
                        <span className="text-[10px] font-mono text-[#235339] bg-white border border-[#C6DDD0] px-1.5 py-0.5 rounded font-bold">
                          Sent
                        </span>
                      </div>
                      <div className="text-[11px] text-[#5A645D]">
                        Verification code sent to <strong className="text-[#18231C] font-mono">{forgotEmail}</strong>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#4A554E] leading-relaxed border-t border-[#D5CDBF]/70 pt-2 font-medium">
                    Please open your email application and check your inbox (and spam/junk folder) for the 6-digit OTP code dispatched from <strong className="text-[#235339] font-mono">sohamyevale1126@gmail.com</strong>. Enter the code below to reset your password.
                  </p>
                </div>
              )}

              {/* ================= STEP 1: ENTER REGISTERED EMAIL ================= */}
              {forgotStep === 1 && (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#18231C] mb-1.5">
                      Enter Your Registered Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        autoComplete="email"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder="e.g. user@hospital.org or personal email"
                        className="ivory-input w-full pl-10 pr-3.5 py-2.5 text-xs"
                      />
                      <Mail className="w-4 h-4 text-[#8D8678] absolute left-3.5 top-3" />
                    </div>
                    <span className="text-[11px] text-[#6A746C] mt-1.5 block">
                      We will check our medical records database and dispatch a 6-digit OTP code.
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={forgotLoading || !forgotEmail}
                    className="pill-btn-primary w-full py-3 text-xs sm:text-sm font-bold shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {forgotLoading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Dispatching OTP from sohamyevale1126@gmail.com…</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send 6-Digit Verification OTP</span>
                      </>
                    )}
                  </button>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('login')}
                      className="text-xs font-semibold text-[#5A645D] hover:text-[#18231C] inline-flex items-center gap-1"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>Back to Sign In</span>
                    </button>
                  </div>
                </form>
              )}

              {/* ================= STEP 2: VERIFY OTP & SET NEW PASSWORD ================= */}
              {forgotStep === 2 && (
                <form onSubmit={handleVerifyAndUpdatePassword} className="space-y-4">
                  
                  {/* Email Target & Edit Option */}
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#ECE7DC] border border-[#D5CDBF] text-xs">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <Mail className="w-3.5 h-3.5 text-[#235339] shrink-0" />
                      <span className="font-mono text-[#18231C] font-semibold truncate">{forgotEmail}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setForgotStep(1);
                        setForgotError('');
                      }}
                      className="text-[11px] text-[#235339] font-bold hover:underline shrink-0 ml-2"
                    >
                      Change
                    </button>
                  </div>

                  {/* 6-Digit OTP Individual Inputs */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold text-[#18231C]">
                        Enter 6-Digit OTP Code
                      </label>
                      <span className="text-[11px] text-[#6A746C] font-mono">10 min validity</span>
                    </div>

                    <div className="flex items-center justify-between gap-2 sm:gap-2.5">
                      {otpDigits.map((digit, idx) => (
                        <input
                          key={idx}
                          id={`otp-digit-${idx}`}
                          type="text"
                          inputMode="numeric"
                          maxLength={6}
                          value={digit}
                          onChange={(e) => handleOtpChange(idx, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                          className="w-11 h-12 sm:w-12 sm:h-12 text-center text-lg sm:text-xl font-bold font-mono rounded-xl bg-white border-2 border-[#D5CDBF] focus:border-[#235339] focus:ring-2 focus:ring-[#235339]/20 text-[#18231C] transition-all outline-none"
                        />
                      ))}
                    </div>

                    {/* Resend OTP button with cooldown */}
                    <div className="flex items-center justify-between text-xs text-[#5A645D] mt-2">
                      <span>Didn’t receive the code?</span>
                      {otpTimer > 0 ? (
                        <span className="font-mono text-[11px] text-[#6A746C] flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#6A746C]" />
                          <span>Resend in {otpTimer}s</span>
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={handleSendOtp}
                          disabled={forgotLoading}
                          className="text-[#235339] font-bold hover:underline flex items-center gap-1"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Resend 6-Digit OTP</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* New Password & Confirm Password Fields */}
                  <div className="space-y-3 pt-1">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-bold text-[#18231C]">
                          New Password
                        </label>
                        <span className="text-[11px] text-[#6A746C]">Min 6 characters</span>
                      </div>
                      <div className="relative">
                        <input
                          type={showForgotNewPassword ? 'text' : 'password'}
                          required
                          value={forgotNewPassword}
                          onChange={(e) => setForgotNewPassword(e.target.value)}
                          placeholder="Enter strong new password"
                          className="ivory-input w-full pl-10 pr-10 py-2.5 text-xs"
                        />
                        <Lock className="w-4 h-4 text-[#8D8678] absolute left-3.5 top-3" />
                        <button
                          type="button"
                          onClick={() => setShowForgotNewPassword(!showForgotNewPassword)}
                          className="p-1 absolute right-3 top-2.5 text-[#6A746C] hover:text-[#18231C]"
                        >
                          {showForgotNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-bold text-[#18231C]">
                          Confirm New Password
                        </label>
                        {forgotConfirmPassword && (
                          <span className={`text-[11px] font-bold ${
                            forgotNewPassword === forgotConfirmPassword ? 'text-emerald-700' : 'text-rose-600'
                          }`}>
                            {forgotNewPassword === forgotConfirmPassword ? '✓ Passwords Match' : '✗ Do not match'}
                          </span>
                        )}
                      </div>
                      <div className="relative">
                        <input
                          type="password"
                          required
                          value={forgotConfirmPassword}
                          onChange={(e) => setForgotConfirmPassword(e.target.value)}
                          placeholder="Repeat new password"
                          className={`ivory-input w-full pl-10 pr-3.5 py-2.5 text-xs ${
                            forgotConfirmPassword && forgotNewPassword !== forgotConfirmPassword
                              ? 'border-rose-400 focus:border-rose-500'
                              : ''
                          }`}
                        />
                        <Lock className="w-4 h-4 text-[#8D8678] absolute left-3.5 top-3" />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={forgotLoading || otpDigits.join('').length !== 6 || !forgotNewPassword || !forgotConfirmPassword}
                    className="pill-btn-primary w-full py-3 text-xs sm:text-sm font-bold shadow-md disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
                  >
                    {forgotLoading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Verifying OTP & Updating Password…</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Verify OTP & Update Password</span>
                      </>
                    )}
                  </button>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('login')}
                      className="text-xs font-semibold text-[#5A645D] hover:text-[#18231C] inline-flex items-center gap-1"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>Cancel & Back to Sign In</span>
                    </button>
                  </div>
                </form>
              )}

              {/* ================= STEP 3: SUCCESS CONFIRMATION ================= */}
              {forgotStep === 3 && (
                <div className="py-4 space-y-5 text-center animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300 flex items-center justify-center mx-auto text-3xl shadow-sm animate-bounce">
                    ✓
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-lg sm:text-xl font-black text-[#18231C] tracking-tight">
                      Password Reset Successfully!
                    </h3>
                    <p className="text-xs text-[#5A645D] max-w-sm mx-auto leading-relaxed">
                      Your MediSafe AI clinical account credentials for <strong className="text-[#18231C] font-mono">{forgotEmail}</strong> have been verified via 6-digit OTP and updated.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#F3EFE6] border border-[#D5CDBF] text-left text-xs space-y-1.5 font-mono max-w-sm mx-auto">
                    <div className="flex justify-between text-[#5A645D]">
                      <span>Account Email:</span>
                      <span className="text-[#18231C] font-bold">{forgotEmail}</span>
                    </div>
                    <div className="flex justify-between text-[#5A645D]">
                      <span>Dispatched From:</span>
                      <span className="text-[#235339] font-bold">sohamyevale1126@gmail.com</span>
                    </div>
                    <div className="flex justify-between text-[#5A645D]">
                      <span>Verification Status:</span>
                      <span className="text-emerald-700 font-bold">OTP VERIFIED & SAVED</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleProceedToSignIn}
                    className="pill-btn-primary w-full py-3.5 text-xs sm:text-sm font-bold shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Sign In with New Password</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

            </div>
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
                <span className="text-[#235339] font-bold">SYSTEM ADMIN</span>
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
    </>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
        <div className="fixed inset-0" onClick={handleCloseModal} aria-hidden="true" />
        {formContent}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F4ED] text-[#18231C] flex flex-col justify-center items-center px-4 py-12 relative selection:bg-[#235339]/20 selection:text-[#235339]">
      {formContent}
    </div>
  );
}
