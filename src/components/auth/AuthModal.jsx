import React, { useState } from 'react';
import { X, Shield, Lock, Mail, User, CheckCircle2 } from 'lucide-react';
import { useHealth } from '../../context/HealthContext';

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, setCurrentUser, showToast } = useHealth();
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('patient');

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
            {mode === 'login' ? 'Sign In to MediSafe AI' : 'Create Clinical Profile'}
          </h3>
          <p className="text-xs text-[#5A645D]">
            {mode === 'login'
              ? 'Access your saved medical histories and safety reports'
              : 'Begin monitoring your medication safety with explainable AI'}
          </p>
        </div>

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
            <label className="block text-xs font-bold text-[#18231C] mb-1">
              Password
            </label>
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

      </div>
    </div>
  );
}
