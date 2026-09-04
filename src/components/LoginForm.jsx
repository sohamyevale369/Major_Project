import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Fingerprint, 
  Sparkles, 
  ShieldCheck, 
  Building,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import RoleSelector from './RoleSelector';

export default function LoginForm({ 
  onLoginSuccess, 
  onForgotPassword, 
  onTrigger2FA,
  selectedRole,
  setSelectedRole,
  onSwitchToRegister
}) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Quick Demo Accounts Fill
  const demoAccounts = {
    patient: {
      id: 'sarah.jenkins@medisafe.care',
      pass: 'MediCare#2026',
      label: 'Sarah Jenkins (Patient)'
    },
    doctor: {
      id: 'dr.marcus.chen@medisafe.ai',
      pass: 'NeuroCare*991',
      label: 'Dr. Marcus Chen (Cardiologist)'
    },
    admin: {
      id: 'admin.mayo@hospital-safe.org',
      pass: 'AdminVault!2026',
      label: 'St. Jude Hospital Admin'
    }
  };

  const handleApplyDemo = (roleKey) => {
    setSelectedRole(roleKey);
    setIdentifier(demoAccounts[roleKey].id);
    setPassword(demoAccounts[roleKey].pass);
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!identifier.trim()) {
      newErrors.identifier = 'Please enter your registered Email or Medical ID.';
    }
    if (!password) {
      newErrors.password = 'Please enter your password.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    setTimeout(() => {
      setLoading(false);
      // If doctor or admin, prompt 2FA for extra realism!
      if (selectedRole === 'doctor' || selectedRole === 'admin') {
        onTrigger2FA(identifier);
      } else {
        onLoginSuccess({
          email: identifier,
          role: selectedRole,
          name: identifier.split('@')[0]
        });
      }
    }, 800);
  };

  const handleBiometricAuth = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess({
        email: 'biometric.verified@medisafe.ai',
        role: selectedRole,
        name: 'Biometric Verified User'
      });
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Role Selection */}
      <RoleSelector selectedRole={selectedRole} onSelectRole={setSelectedRole} />

      {/* Quick Demo Selector Strip */}
      <div className="p-3 rounded-2xl bg-gradient-to-r from-mediteal-950/40 via-slate-900 to-mediblue-950/40 border border-mediteal-500/20">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold text-mediteal-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Instant One-Click Demo Accounts:
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {Object.entries(demoAccounts).map(([key, acc]) => (
            <button
              key={key}
              type="button"
              onClick={() => handleApplyDemo(key)}
              className={`text-[11px] px-2.5 py-1 rounded-lg border font-medium transition-all ${
                selectedRole === key && identifier === acc.id
                  ? 'bg-mediteal-500/20 border-mediteal-400 text-mediteal-200 shadow-sm'
                  : 'bg-slate-800/80 border-slate-700/80 text-slate-300 hover:border-slate-500 hover:text-white'
              }`}
            >
              Fill {key.charAt(0).toUpperCase() + key.slice(1)} Demo
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email or ID */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            {selectedRole === 'patient' 
              ? 'Email or Health Record Number (HRN)' 
              : selectedRole === 'doctor' 
              ? 'Medical Practitioner Email / NPI' 
              : 'Enterprise Admin Work Email'}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={identifier}
              onChange={(e) => {
                setIdentifier(e.target.value);
                if (errors.identifier) setErrors({ ...errors, identifier: '' });
              }}
              placeholder={
                selectedRole === 'patient'
                  ? 'sarah.jenkins@medisafe.care'
                  : selectedRole === 'doctor'
                  ? 'dr.marcus.chen@medisafe.ai'
                  : 'admin.mayo@hospital-safe.org'
              }
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm glass-input text-slate-100 placeholder-slate-500 focus:outline-none"
            />
          </div>
          {errors.identifier && (
            <p className="text-xs text-rose-400 mt-1.5">{errors.identifier}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Password
            </label>
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-xs font-medium text-mediteal-400 hover:text-mediteal-300 transition-colors"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: '' });
              }}
              placeholder="••••••••••••"
              className="w-full pl-10 pr-10 py-2.5 rounded-xl text-sm glass-input text-slate-100 placeholder-slate-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-rose-400 mt-1.5">{errors.password}</p>
          )}
        </div>

        {/* Remember me & Security Note */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-mediteal-500 focus:ring-mediteal-500/30 focus:ring-offset-0 cursor-pointer"
            />
            <span className="text-xs text-slate-300 select-none">Remember this workstation (30 days)</span>
          </label>

          <span className="text-[11px] text-slate-500 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-mediteal-400" /> 256-bit Encrypted
          </span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-mediteal-500 via-mediteal-600 to-mediblue-600 hover:from-mediteal-400 hover:to-mediblue-500 shadow-lg shadow-mediteal-500/25 hover:shadow-mediteal-500/40 transition-all duration-200 disabled:opacity-60"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Authenticating Clinical Token...</span>
            </>
          ) : (
            <>
              <span>Sign In to SafeGuard Portal</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        {/* Biometric quick login & SSO Options */}
        <div className="pt-2 space-y-3">
          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-800 w-full" />
            <span className="bg-slate-950 px-3 text-[11px] font-medium text-slate-500 uppercase tracking-wider">
              Or Authenticate Via
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={handleBiometricAuth}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800/80 hover:border-slate-700 text-slate-300 text-xs font-semibold transition-all"
            >
              <Fingerprint className="w-4 h-4 text-cyan-400" />
              <span>Passkey / BioID</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                  onLoginSuccess({
                    email: 'epic.sso@health-network.org',
                    role: selectedRole,
                    name: 'Enterprise SSO User'
                  });
                }, 900);
              }}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800/80 hover:border-slate-700 text-slate-300 text-xs font-semibold transition-all"
            >
              <Building className="w-4 h-4 text-emerald-400" />
              <span>Hospital SSO</span>
            </button>
          </div>
        </div>
      </form>

      {/* Switch to Register */}
      <div className="text-center pt-2 border-t border-slate-800/60">
        <p className="text-xs text-slate-400">
          Don't have a verified medical account?{' '}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="font-semibold text-mediteal-400 hover:text-mediteal-300 transition-colors ml-1"
          >
            Create an Account
          </button>
        </p>
      </div>
    </div>
  );
}
