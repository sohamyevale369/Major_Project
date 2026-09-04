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

  const handleGuest = () => {
    setCurrentUser({
      name: 'Guest Explorer',
      email: 'guest@medisafe.ai',
      role: 'patient',
      isGuest: true
    });
    setIsAuthModalOpen(false);
    showToast('Continuing in Guest Demo Mode', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl p-6 sm:p-8 space-y-6">
        
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-mediteal-400 to-mediblue-600 text-slate-950 font-black flex items-center justify-center mx-auto shadow-md">
            <Shield className="w-6 h-6 stroke-[2.5]" />
          </div>
          <h3 className="text-xl font-bold text-white mt-3">
            {mode === 'login' ? 'Sign In to MediSafe AI' : 'Create Your Clinical Profile'}
          </h3>
          <p className="text-xs text-slate-400">
            {mode === 'login'
              ? 'Access your saved medical histories and safety reports'
              : 'Begin monitoring your medication safety with explainable AI'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Eleanor Vance"
                  className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:border-mediteal-400 focus:outline-none"
                />
                <User className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@hospital.org or personal email"
                className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:border-mediteal-400 focus:outline-none"
              />
              <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:border-mediteal-400 focus:outline-none"
              />
              <Lock className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Account Role
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRole('patient')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition ${
                  role === 'patient'
                    ? 'bg-mediteal-500/20 text-mediteal-300 border-mediteal-500/40'
                    : 'bg-slate-950 text-slate-400 border-slate-800'
                }`}
              >
                Patient / Caregiver
              </button>
              <button
                type="button"
                onClick={() => setRole('clinician')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition ${
                  role === 'clinician'
                    ? 'bg-mediteal-500/20 text-mediteal-300 border-mediteal-500/40'
                    : 'bg-slate-950 text-slate-400 border-slate-800'
                }`}
              >
                Doctor / Pharmacist
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-mediteal-500 to-mediblue-600 hover:from-mediteal-400 hover:to-mediblue-500 text-slate-950 font-bold text-xs shadow-lg transition"
          >
            {mode === 'login' ? 'Sign In Securely' : 'Create Account'}
          </button>
        </form>

        <div className="relative border-t border-slate-800 text-center">
          <span className="bg-slate-900 px-3 text-[10px] uppercase tracking-wider text-slate-500 relative -top-2">
            Or quick explore
          </span>
        </div>

        <button
          type="button"
          onClick={handleGuest}
          className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold border border-slate-700 transition"
        >
          Explore As Guest (No Signup Required)
        </button>

        <div className="text-center text-xs text-slate-400">
          {mode === 'login' ? (
            <span>
              Don’t have an account?{' '}
              <button
                onClick={() => setMode('register')}
                className="text-mediteal-400 font-semibold hover:underline"
              >
                Register here
              </button>
            </span>
          ) : (
            <span>
              Already registered?{' '}
              <button
                onClick={() => setMode('login')}
                className="text-mediteal-400 font-semibold hover:underline"
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
