import React, { useState } from 'react';
import { X, Shield, Lock, Mail, User, CheckCircle2, RotateCcw, AlertCircle, Sparkles, Send } from 'lucide-react';
import { useHealth } from '../../context/HealthContext';

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, setCurrentUser, showToast, requestPasswordResetOtp, resetPassword } = useHealth();
  const [mode, setMode] = useState('login'); // 'login' | 'register' | 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('patient');

  // Forgot password states
  const [forgotStep, setForgotStep] = useState(1); // 1: email, 2: otp & new password
  const [forgotOtp, setForgotOtp] = useState('');
  const [forgotNewPassword, setForgotNewPassword] = useState('');
  const [forgotError, setForgotError] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentUser({
      name: name || (email.split('@')[0] || 'Clinician / Patient'),
      email: email || 'user@medisafe.ai',
      role,
      isGuest: false
    });
    setIsAuthModalOpen(false);
    showToast(`Welcome! Signed in as ${role === 'clinician' ? 'Healthcare Professional' : 'Patient'}`, 'success');
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setForgotError('');
    setForgotLoading(true);
    const result = await requestPasswordResetOtp(email);
    setForgotLoading(false);
    if (result.success) {
      setForgotStep(2);
    } else {
      setForgotError(result.message);
    }
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setForgotError('');
    if (forgotOtp.length !== 6) {
      setForgotError('Please enter the 6-digit OTP code.');
      return;
    }
    if (forgotNewPassword.length < 6) {
      setForgotError('Password must be at least 6 characters.');
      return;
    }

    setForgotLoading(true);
    const result = resetPassword(email, forgotOtp, forgotNewPassword);
    setForgotLoading(false);
    if (result.success) {
      setMode('login');
      setPassword('');
      setForgotStep(1);
    } else {
      setForgotError(result.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md rounded-3xl border border-[#E5DFD1] bg-white shadow-2xl p-6 sm:p-8 space-y-6 text-[#18231C]">
        
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-[#6A746C] hover:text-[#18231C] rounded-full hover:bg-[#F3EFE6] transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-xl bg-[#235339] text-white font-black text-2xl flex items-center justify-center mx-auto shadow-sm">
            +
          </div>
          <h3 className="text-xl font-black text-[#18231C] mt-3 uppercase tracking-tight">
            {mode === 'login' && 'Sign In to MediSafe AI'}
            {mode === 'register' && 'Create Clinical Profile'}
            {mode === 'forgot' && 'Reset Account Password'}
          </h3>
          <p className="text-xs text-[#5A645D]">
            {mode === 'login' && 'Access your saved medical histories and safety reports'}
            {mode === 'register' && 'Begin monitoring your medication safety with explainable AI'}
            {mode === 'forgot' && '6-digit OTP dispatched from sohamyevale1126@gmail.com'}
          </p>
        </div>

        {mode !== 'forgot' ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-bold text-[#18231C] mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Soham Vikas Yevale"
                    className="ivory-input w-full pl-9 pr-3.5 py-2 text-xs"
                  />
                  <User className="w-3.5 h-3.5 text-[#8D8678] absolute left-3 top-2.5" />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-[#18231C] mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@hospital.org or personal email"
                  className="ivory-input w-full pl-9 pr-3.5 py-2 text-xs"
                />
                <Mail className="w-3.5 h-3.5 text-[#8D8678] absolute left-3 top-2.5" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-[#18231C]">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setMode('forgot');
                    setForgotStep(1);
                    setForgotError('');
                  }}
                  className="text-[11px] text-[#235339] font-bold hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="ivory-input w-full pl-9 pr-3.5 py-2 text-xs"
                />
                <Lock className="w-3.5 h-3.5 text-[#8D8678] absolute left-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#18231C] mb-1">
                Account Role
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('patient')}
                  className={`py-2 px-3 rounded-full text-xs font-bold border transition ${
                    role === 'patient'
                      ? 'bg-[#235339] text-white border-[#235339]'
                      : 'bg-[#F3EFE6] text-[#4A554E] border-[#D5CDBF]'
                  }`}
                >
                  Patient / Caregiver
                </button>
                <button
                  type="button"
                  onClick={() => setRole('clinician')}
                  className={`py-2 px-3 rounded-full text-xs font-bold border transition ${
                    role === 'clinician'
                      ? 'bg-[#235339] text-white border-[#235339]'
                      : 'bg-[#F3EFE6] text-[#4A554E] border-[#D5CDBF]'
                  }`}
                >
                  Doctor / Pharmacist
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="pill-btn-primary w-full py-2.5 text-xs font-bold shadow-md"
            >
              {mode === 'login' ? 'Sign In Securely' : 'Create Account'}
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            {forgotError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{forgotError}</span>
              </div>
            )}

            {forgotStep === 2 && (
              <div className="p-3 rounded-xl bg-[#EAF3ED] border border-[#C6DDD0] text-xs space-y-1">
                <div className="font-bold text-[#18231C] flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#235339]" />
                  <span>OTP Sent to Your Mailbox</span>
                </div>
                <div className="text-[11px] text-[#4A554E]">
                  Please check your inbox (and spam folder) at <strong>{email}</strong> for the 6-digit code sent from <span className="text-[#235339] font-mono font-bold">sohamyevale1126@gmail.com</span>.
                </div>
              </div>
            )}


            {forgotStep === 1 ? (
              <form onSubmit={handleSendOtp} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-[#18231C] mb-1">
                    Registered Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@hospital.org"
                    className="ivory-input w-full px-3 py-2 text-xs"
                  />
                  <span className="text-[10px] text-[#6A746C] mt-1 block">
                    OTP will be dispatched from sohamyevale1126@gmail.com
                  </span>
                </div>
                <button
                  type="submit"
                  disabled={forgotLoading || !email}
                  className="pill-btn-primary w-full py-2 text-xs font-bold"
                >
                  {forgotLoading ? 'Sending OTP…' : 'Send 6-Digit OTP'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-[#18231C] mb-1">
                    Enter 6-Digit OTP
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    required
                    value={forgotOtp}
                    onChange={(e) => setForgotOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="123456"
                    className="ivory-input w-full px-3 py-2 text-xs font-mono tracking-widest text-center text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#18231C] mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    required
                    value={forgotNewPassword}
                    onChange={(e) => setForgotNewPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="ivory-input w-full px-3 py-2 text-xs"
                  />
                </div>
                <button
                  type="submit"
                  disabled={forgotLoading || forgotOtp.length !== 6 || !forgotNewPassword}
                  className="pill-btn-primary w-full py-2 text-xs font-bold"
                >
                  {forgotLoading ? 'Verifying & Updating…' : 'Update Password'}
                </button>
              </form>
            )}

            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-xs text-[#235339] font-bold hover:underline"
              >
                Back to Sign In
              </button>
            </div>
          </div>
        )}

        {mode !== 'forgot' && (
          <div className="text-center text-xs text-[#5A645D]">
            {mode === 'login' ? (
              <span>
                Don’t have an account?{' '}
                <button
                  onClick={() => setMode('register')}
                  className="text-[#235339] font-bold hover:underline"
                >
                  Register here
                </button>
              </span>
            ) : (
              <span>
                Already registered?{' '}
                <button
                  onClick={() => setMode('login')}
                  className="text-[#235339] font-bold hover:underline"
                >
                  Sign In
                </button>
              </span>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

