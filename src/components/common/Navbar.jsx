import React, { useState } from 'react';
import {
  Shield,
  Activity,
  Pill,
  RefreshCw,
  Camera,
  User,
  History,
  FileText,
  Bot,
  AlertCircle,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  LogOut,
  Stethoscope,
  HeartPulse,
  KeyRound
} from 'lucide-react';
import { useHealth } from '../../context/HealthContext';

export default function Navbar() {
  const {
    activeTab,
    setActiveTab,
    patient,
    activePatients = [],
    loadPatientPreset,
    setIsChatbotOpen,
    currentUser,
    logout,
    setEmergencyAlert,
    showToast
  } = useHealth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [patientDropdownOpen, setPatientDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const isAdmin = currentUser?.role === 'admin';
  const isClinician = currentUser?.role === 'clinician';

  const navItems = [
    { id: 'home', label: 'Home', icon: Shield },
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'risk-checker', label: 'Medicine Risk Check', icon: Pill, highlight: true },
    { id: 'interactions', label: 'Drug Interactions', icon: RefreshCw },
    { id: 'ocr', label: 'Prescription OCR', icon: Camera },
    { id: 'profile', label: 'Health Profile', icon: User },
    { id: 'history', label: 'History & Report', icon: History },
    ...(isAdmin ? [{ id: 'admin', label: 'Admin Console', icon: ShieldCheck, adminBadge: true }] : [])
  ];

  const handleNavClick = (id) => {
    if (id === 'admin' && !isAdmin) {
      showToast('No access to Admin Console for patients and doctors.', 'error');
      return;
    }
    setActiveTab(id);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl transition-all">
      {/* Top Emergency & Trust Alert Bar */}
      <div className="bg-gradient-to-r from-mediteal-950/80 via-slate-900 to-mediblue-950/80 px-4 py-1.5 border-b border-slate-800/50 text-[11px] sm:text-xs text-slate-300 flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
          <span className="font-semibold text-mediteal-300">Explainable AI Safety Engine:</span>
          <span className="hidden sm:inline text-slate-300">SHAP / LIME Powered Clinical Decision Support</span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setEmergencyAlert({
              title: 'Emergency Medical Hotline & Help',
              medicine: null,
              details: 'If you or someone else is experiencing an acute allergic reaction, difficulty breathing, or severe chest pain after taking medication, call 911 or visit the nearest emergency room immediately.'
            })}
            className="text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1 hover:underline transition"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Emergency? Click here</span>
            <span className="md:hidden">Emergency</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-mediteal-400 to-mediblue-600 text-slate-950 shadow-md shadow-mediteal-500/20 group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5 text-slate-950 stroke-[2.5]" />
              <Sparkles className="w-3 h-3 text-white absolute -top-1 -right-1" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white group-hover:text-mediteal-300 transition-colors">
                  MediSafe<span className="text-mediteal-400">.AI</span>
                </span>
                <span className="text-[10px] px-1.5 py-0.2 font-bold tracking-wider uppercase rounded bg-mediteal-500/20 text-mediteal-300 border border-mediteal-500/40">
                  v2.0
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                Explainable Medicine Safety & Recommendations
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? item.adminBadge
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                        : 'bg-mediteal-500/15 text-mediteal-300 border border-mediteal-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-850'
                  } ${item.highlight && !isActive ? 'ring-1 ring-mediteal-500/20' : ''}`}
                >
                  <Icon className={`w-3.5 h-3.5 ${
                    item.adminBadge
                      ? 'text-purple-400'
                      : isActive ? 'text-mediteal-400' : 'text-slate-400'
                  }`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right-Hand Controls (Patient Switcher, AI Chatbot, User Account & Sign Out) */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Patient Profile / Switcher: Single-patient isolation */}
            {currentUser?.role === 'patient' ? (
              /* Single Patient Direct Link to Personal Details Page */
              <button
                onClick={() => handleNavClick('profile')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs transition-all group ${
                  activeTab === 'profile'
                    ? 'border-mediteal-400 bg-mediteal-500/20 text-white ring-1 ring-mediteal-400/30'
                    : 'border-slate-700/80 bg-slate-900/90 hover:border-mediteal-500/50 text-slate-200'
                }`}
                title="View My Personal Details"
                id="navbar-patient-profile-btn"
              >
                <div className="w-6 h-6 rounded-lg bg-mediteal-500/20 text-mediteal-300 flex items-center justify-center font-bold text-xs">
                  {patient?.name ? patient.name.charAt(0) : 'P'}
                </div>
                <div className="text-left hidden md:block">
                  <div className="text-[11px] font-bold text-slate-200 group-hover:text-mediteal-300 leading-none">
                    {patient?.name || currentUser?.name || 'Personal Details'}
                  </div>
                  <div className="text-[10px] text-mediteal-400 font-semibold leading-none mt-0.5">
                    Personal Details →
                  </div>
                </div>
              </button>
            ) : (
              /* Clinician / Admin Clinical Preset Switcher */
              <div className="relative">
                <button
                  onClick={() => setPatientDropdownOpen(!patientDropdownOpen)}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-slate-700/80 bg-slate-900/90 hover:border-mediteal-500/50 text-xs text-slate-200 transition-all group"
                  title="Switch Clinical Patient Case"
                >
                  <div className="w-6 h-6 rounded-lg bg-mediteal-500/20 text-mediteal-300 flex items-center justify-center font-bold text-xs">
                    {patient?.name ? patient.name.charAt(0) : 'P'}
                  </div>
                  <div className="text-left hidden md:block">
                    <div className="text-[11px] font-bold text-slate-200 group-hover:text-mediteal-300 leading-none">
                      {patient?.name || 'No Patient Selected'}
                    </div>
                    <div className="text-[10px] text-slate-400 leading-none mt-0.5">
                      {patient?.age ? `Age ${patient.age}` : 'Profile'} • {patient?.diseases?.[0] ? patient.diseases[0].slice(0, 15) + '…' : 'Active'}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Patient Dropdown Menu */}
                {patientDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-2 z-50 animate-fade-in">
                    <div className="px-3 py-2 border-b border-slate-800 text-xs">
                      <span className="font-bold text-white block">Clinical Patients ({activePatients.length})</span>
                      <span className="text-slate-400 text-[11px]">Real-time synchronized with User Database</span>
                    </div>
                    <div className="py-1 space-y-1">
                      {activePatients.length === 0 ? (
                        <div className="px-3 py-4 text-center text-slate-400 text-xs">
                          No patient records currently in database.
                        </div>
                      ) : (
                        activePatients.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => {
                              loadPatientPreset(p);
                              setPatientDropdownOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-xl text-xs transition flex items-start gap-2.5 ${
                              patient?.id === p.id || patient?.name === p.name
                                ? 'bg-mediteal-500/20 text-mediteal-300 font-semibold border border-mediteal-500/30'
                                : 'text-slate-300 hover:bg-slate-800'
                            }`}
                          >
                            <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 text-mediteal-400">
                              {p.name.charAt(0)}
                            </span>
                            <div>
                              <div className="font-semibold text-white">{p.name} ({p.age}y)</div>
                              <div className="text-[11px] text-slate-400 line-clamp-1">{p.description}</div>
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                    <div className="pt-2 mt-1 border-t border-slate-800 text-center">
                      <button
                        onClick={() => {
                          setActiveTab('profile');
                          setPatientDropdownOpen(false);
                        }}
                        className="text-xs text-mediteal-400 hover:underline font-semibold"
                      >
                        Customize Profile Manually →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* AI Assistant Button */}
            <button
              onClick={() => setIsChatbotOpen(true)}
              className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-mediteal-500/20 to-mediblue-500/20 hover:from-mediteal-500/30 hover:to-mediblue-500/30 border border-mediteal-500/40 text-xs font-semibold text-mediteal-300 transition-all shadow-sm group"
            >
              <Bot className="w-4 h-4 text-mediteal-400 group-hover:rotate-12 transition-transform" />
              <span className="hidden sm:inline">AI Guide</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mediteal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-mediteal-500"></span>
              </span>
            </button>

            {/* User Account & Logout Menu */}
            {currentUser && (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-slate-700 bg-slate-900 hover:border-slate-600 text-xs text-slate-200 transition"
                  title="User Profile & Account"
                >
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs ${
                    isAdmin
                      ? 'bg-purple-500/20 text-purple-300'
                      : isClinician
                      ? 'bg-sky-500/20 text-sky-300'
                      : 'bg-emerald-500/20 text-emerald-300'
                  }`}>
                    {currentUser.name ? currentUser.name.charAt(0) : 'U'}
                  </div>
                  <div className="text-left hidden lg:block">
                    <div className="text-[11px] font-bold text-white leading-none">
                      {currentUser.name}
                    </div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mt-0.5 leading-none">
                      {currentUser.role}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-2 z-50 animate-fade-in text-xs">
                    <div className="px-3 py-2 border-b border-slate-800">
                      <span className="font-bold text-white block">{currentUser.name}</span>
                      <span className="text-slate-400 text-[11px] font-mono truncate block">{currentUser.email}</span>
                      <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        isAdmin
                          ? 'bg-purple-500/20 text-purple-300'
                          : isClinician
                          ? 'bg-sky-500/20 text-sky-300'
                          : 'bg-emerald-500/20 text-emerald-300'
                      }`}>
                        {currentUser.role} Account
                      </span>
                    </div>

                    <div className="py-1 space-y-0.5">
                      {isAdmin && (
                        <button
                          onClick={() => handleNavClick('admin')}
                          className="w-full text-left px-3 py-2 rounded-xl text-purple-300 hover:bg-purple-500/10 font-semibold flex items-center gap-2 transition"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Admin Console</span>
                        </button>
                      )}

                      <button
                        onClick={() => handleNavClick('profile')}
                        className="w-full text-left px-3 py-2 rounded-xl text-slate-300 hover:bg-slate-800 flex items-center gap-2 transition"
                      >
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span>Health Profile</span>
                      </button>

                      <button
                        onClick={() => handleNavClick('dashboard')}
                        className="w-full text-left px-3 py-2 rounded-xl text-slate-300 hover:bg-slate-800 flex items-center gap-2 transition"
                      >
                        <Activity className="w-3.5 h-3.5 text-slate-400" />
                        <span>My Dashboard</span>
                      </button>
                    </div>

                    <div className="pt-1 border-t border-slate-800">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logout();
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-rose-400 hover:bg-rose-500/10 font-semibold flex items-center gap-2 transition"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out (Lock Tasks)</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl border border-slate-700 bg-slate-900 text-slate-300 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-800 bg-slate-950/98 px-4 pt-3 pb-6 space-y-2 animate-fade-in shadow-2xl">
          <div className="grid grid-cols-2 gap-2 mb-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium text-left transition ${
                    isActive
                      ? item.adminBadge
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                        : 'bg-mediteal-500/20 text-mediteal-300 border border-mediteal-500/40'
                      : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${item.adminBadge ? 'text-purple-400' : 'text-mediteal-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {currentUser && (
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs flex items-center justify-between">
              <div>
                <span className="text-slate-400 text-[10px] block">Signed in as:</span>
                <span className="font-bold text-white block">{currentUser.name}</span>
                <span className="text-mediteal-300 text-[11px] font-mono">{currentUser.email}</span>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
                className="px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-300 border border-rose-500/30 text-xs font-bold"
              >
                Sign Out
              </button>
            </div>
          )}

          <button
            onClick={() => handleNavClick('profile')}
            className="w-full text-left p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs hover:border-mediteal-500/50 transition block"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">
                {currentUser?.role === 'patient' ? 'My Personal Profile' : 'Active Patient Case'}
              </span>
              <span className="text-[10px] text-mediteal-400 font-semibold">View Details →</span>
            </div>
            <span className="font-bold text-white block">{patient.name} ({patient.age}y, {patient.gender})</span>
            <span className="text-mediteal-300 text-[11px] block mt-0.5">{patient.diseases.join(', ') || 'No recorded conditions'}</span>
          </button>
        </div>
      )}
    </header>
  );
}
