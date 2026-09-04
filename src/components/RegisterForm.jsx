import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Phone, 
  Award, 
  Building, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  RefreshCw 
} from 'lucide-react';
import RoleSelector from './RoleSelector';
import PasswordStrengthMeter from './PasswordStrengthMeter';

export default function RegisterForm({ 
  onRegisterSuccess, 
  selectedRole, 
  setSelectedRole, 
  onSwitchToLogin 
}) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    roleId: '', // Medical License / NHS / Hospital Code
    phone: '',
    password: '',
    confirmPassword: '',
    agreedToTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleFillDemoData = () => {
    if (selectedRole === 'doctor') {
      setFormData({
        fullName: 'Dr. Elena Rostova',
        email: 'dr.elena.rostova@mayoclinic.org',
        roleId: 'NPI-8839201948',
        phone: '+1 (555) 438-9201',
        password: 'SecureMedic#2026',
        confirmPassword: 'SecureMedic#2026',
        agreedToTerms: true,
      });
    } else if (selectedRole === 'admin') {
      setFormData({
        fullName: 'James Sterling',
        email: 'j.sterling@hopkins-health.org',
        roleId: 'HOSP-FAC-9921',
        phone: '+1 (555) 782-1920',
        password: 'AdminVault!2026',
        confirmPassword: 'AdminVault!2026',
        agreedToTerms: true,
      });
    } else {
      setFormData({
        fullName: 'Alexander Vance',
        email: 'alex.vance@example.com',
        roleId: 'HRN-449102-CA',
        phone: '+1 (555) 912-3456',
        password: 'HealthCare!2026',
        confirmPassword: 'HealthCare!2026',
        agreedToTerms: true,
      });
    }
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (selectedRole === 'doctor' && !formData.roleId.trim()) {
      newErrors.roleId = 'Medical License or NPI number is required for verification.';
    } else if (selectedRole === 'admin' && !formData.roleId.trim()) {
      newErrors.roleId = 'Facility / Clinic registration ID is required.';
    }

    if (!formData.password) {
      newErrors.password = 'Please provide a secure password.';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    if (!formData.agreedToTerms) {
      newErrors.agreedToTerms = 'You must accept the HIPAA Compliance and Terms of Service.';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    setTimeout(() => {
      setLoading(false);
      onRegisterSuccess({
        name: formData.fullName,
        email: formData.email,
        role: selectedRole,
        roleId: formData.roleId
      });
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Role Selection */}
      <RoleSelector selectedRole={selectedRole} onSelectRole={setSelectedRole} />

      {/* Demo Autofill Banner */}
      <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
        <span>Need sample data for quick preview?</span>
        <button
          type="button"
          onClick={handleFillDemoData}
          className="px-2.5 py-1 rounded-lg bg-mediteal-500/15 border border-mediteal-500/30 text-mediteal-300 font-semibold hover:bg-mediteal-500/25 transition-all text-[11px]"
        >
          Auto-fill Sample {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name & Phone in 2-col on tablet+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Full Legal Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder="Dr. Elena Rostova"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl text-sm glass-input text-slate-100 placeholder-slate-500 focus:outline-none"
              />
            </div>
            {errors.fullName && (
              <p className="text-xs text-rose-400 mt-1">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Mobile / Contact (2FA)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Phone className="w-4 h-4" />
              </div>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+1 (555) 019-2834"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl text-sm glass-input text-slate-100 placeholder-slate-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            {selectedRole === 'doctor' ? 'Professional Medical Email' : 'Email Address'}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="elena.rostova@mayoclinic.org"
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl text-sm glass-input text-slate-100 placeholder-slate-500 focus:outline-none"
            />
          </div>
          {errors.email && (
            <p className="text-xs text-rose-400 mt-1">{errors.email}</p>
          )}
        </div>

        {/* Role-Specific ID Field */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            {selectedRole === 'doctor'
              ? 'Medical License / NPI / GMC Number'
              : selectedRole === 'admin'
              ? 'Hospital Facility / Clinic Code'
              : 'Insurance ID / Patient Medical Record (Optional)'}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              {selectedRole === 'admin' ? (
                <Building className="w-4 h-4" />
              ) : (
                <Award className="w-4 h-4" />
              )}
            </div>
            <input
              type="text"
              value={formData.roleId}
              onChange={(e) => handleInputChange('roleId', e.target.value)}
              placeholder={
                selectedRole === 'doctor'
                  ? 'e.g. NPI-1049283748'
                  : selectedRole === 'admin'
                  ? 'e.g. FACILITY-MAY-770'
                  : 'e.g. HRN-998234 (Optional)'
              }
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl text-sm glass-input text-slate-100 placeholder-slate-500 focus:outline-none"
            />
          </div>
          {errors.roleId && (
            <p className="text-xs text-rose-400 mt-1">{errors.roleId}</p>
          )}
        </div>

        {/* Password & Confirm Password */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Create Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl text-sm glass-input text-slate-100 placeholder-slate-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-rose-400 mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl text-sm glass-input text-slate-100 placeholder-slate-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-rose-400 mt-1">{errors.confirmPassword}</p>
            )}
          </div>
        </div>

        {/* Live Password Strength Meter */}
        <PasswordStrengthMeter password={formData.password} />

        {/* HIPAA & Compliance Consent */}
        <div className="pt-1">
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.agreedToTerms}
              onChange={(e) => handleInputChange('agreedToTerms', e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-slate-700 bg-slate-900 text-mediteal-500 focus:ring-mediteal-500/30 focus:ring-offset-0 cursor-pointer shrink-0"
            />
            <span className="text-xs text-slate-400 leading-relaxed select-none">
              I agree to the{' '}
              <a href="#terms" className="text-mediteal-400 hover:underline">
                Terms of Service
              </a>
              ,{' '}
              <a href="#hipaa" className="text-mediteal-400 hover:underline">
                HIPAA Data Privacy Charter
              </a>
              , and consent to AI diagnostic assistance auditing.
            </span>
          </label>
          {errors.agreedToTerms && (
            <p className="text-xs text-rose-400 mt-1.5">{errors.agreedToTerms}</p>
          )}
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
              <span>Verifying Medical Credentials...</span>
            </>
          ) : (
            <>
              <span>Create Verified Account</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Switch to Login */}
      <div className="text-center pt-2 border-t border-slate-800/60">
        <p className="text-xs text-slate-400">
          Already have an existing MediSafe profile?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="font-semibold text-mediteal-400 hover:text-mediteal-300 transition-colors ml-1"
          >
            Sign In Here
          </button>
        </p>
      </div>
    </div>
  );
}
