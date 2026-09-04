import React, { useState, useRef, useEffect } from 'react';
import { ShieldCheck, ArrowRight, RefreshCw, X, CheckCircle2 } from 'lucide-react';

export default function TwoFactorModal({ isOpen, onClose, onVerified, userEmail = 'doctor.demo@medisafe.ai' }) {
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(45);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = useRef([]);

  useEffect(() => {
    if (!isOpen) {
      setDigits(['', '', '', '', '', '']);
      setError('');
      setTimer(45);
      return;
    }

    // Auto focus first input
    setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 100);

    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newDigits = [...digits];
    newDigits[index] = value.slice(-1);
    setDigits(newDigits);
    setError('');

    // Move to next input if filled
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pastedData)) {
      const newDigits = pastedData.split('');
      setDigits(newDigits);
      inputRefs.current[5]?.focus();
    }
  };

  const handleFillDemoCode = () => {
    setDigits(['7', '3', '4', '9', '2', '1']);
    inputRefs.current[5]?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = digits.join('');
    if (code.length < 6) {
      setError('Please enter all 6 digits.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onVerified();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md p-6 sm:p-8 rounded-2xl bg-slate-900 border border-mediteal-500/30 shadow-2xl shadow-mediteal-500/10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-mediteal-600 to-mediblue-500 flex items-center justify-center text-white shadow-lg shadow-mediteal-500/25">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-100">
              Two-Factor Authentication
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
              For HIPAA security, enter the 6-digit clinical verification token sent to{' '}
              <span className="text-mediteal-300 font-medium">{userEmail}</span>
            </p>
          </div>
        </div>

        {/* Demo Fast Fill Button */}
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={handleFillDemoCode}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-mediteal-500/10 text-mediteal-300 border border-mediteal-500/30 hover:bg-mediteal-500/20 transition-all"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-mediteal-400" />
            Auto-fill Mock Code: 734921
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div className="flex justify-center gap-2 sm:gap-3" onPaste={handlePaste}>
            {digits.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e.target.value ? null : e)}
                className={`w-11 h-13 sm:w-12 sm:h-14 text-center text-xl font-bold rounded-xl bg-slate-950 border transition-all ${
                  digit
                    ? 'border-mediteal-500 text-mediteal-300 shadow-md shadow-mediteal-500/20'
                    : 'border-slate-800 text-slate-100 focus:border-mediteal-500/80 focus:ring-2 focus:ring-mediteal-500/20'
                }`}
              />
            ))}
          </div>

          {error && (
            <p className="text-xs text-rose-400 text-center font-medium">
              {error}
            </p>
          )}

          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>
              {timer > 0 ? (
                <>Expires in <span className="text-slate-200 font-medium">{timer}s</span></>
              ) : (
                <span className="text-rose-400">Code expired</span>
              )}
            </span>
            <button
              type="button"
              disabled={timer > 0}
              onClick={() => setTimer(45)}
              className="inline-flex items-center gap-1 font-medium text-mediteal-400 hover:text-mediteal-300 disabled:opacity-40 disabled:hover:text-mediteal-400"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Resend Code
            </button>
          </div>

          <button
            type="submit"
            disabled={loading || digits.join('').length < 6}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-mediteal-500 to-mediblue-600 hover:from-mediteal-400 hover:to-mediblue-500 shadow-lg shadow-mediteal-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>Verify & Grant Access</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
