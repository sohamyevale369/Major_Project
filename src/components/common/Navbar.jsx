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
import BrandLogo from './BrandLogo';

export default function Navbar() {
  const {
    activeTab,
    setActiveTab,
    patient,
    hasUpdatedPersonalDetails,
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

  const userGreetingName = (() => {
    const raw = currentUser?.name?.trim() || patient?.name?.trim() || '';
    if (!raw) return 'there';
    const parts = raw.split(/\s+/);
    if (parts[0].toLowerCase().startsWith('dr') && parts.length > 1) {
      return `${parts[0]} ${parts[1]}`;
    }
    return parts[0];
  })();

  const navItems = isAdmin
    ? [
        { id: 'admin', label: 'Admin Console & Patients', icon: ShieldCheck, adminBadge: true },
        { id: 'interactions', label: 'Drug Interactions DB', icon: RefreshCw },
        { id: 'ocr', label: 'Prescription OCR Tool', icon: Camera }
      ]
    : [
        { id: 'home', label: 'Home', icon: Shield },
        { id: 'dashboard', label: 'Dashboard', icon: Activity },
        { id: 'risk-checker', label: 'Medicine Risk Check', icon: Pill, highlight: true },
        { id: 'interactions', label: 'Drug Interactions', icon: RefreshCw },
        { id: 'ocr', label: 'Prescription OCR', icon: Camera },
        { id: 'profile', label: 'Health Profile', icon: User },
        { id: 'history', label: 'History & Report', icon: History }
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
    <header className="sticky top-0 z-40 border-b border-[#E5DFD1] bg-[#F6F4ED]/95 backdrop-blur-md transition-all">
      {/* Top Emergency & Trust Alert Bar */}
      <div className="bg-[#ECE7DC] border-b border-[#DCD5C5] px-4 py-1.5 text-[11px] sm:text-xs text-[#424C44] flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="flex h-2 w-2 rounded-full bg-[#235339] animate-ping shrink-0" />
          {currentUser && (
            <span className="font-bold text-[#235339] border-r border-[#D5CDBF] pr-2 mr-0.5 shrink-0">
              Hello, {userGreetingName} 👋
            </span>
          )}
          <span className="font-semibold text-[#18231C]">Explainable AI Safety Engine:</span>
          <span className="hidden sm:inline text-[#556157]">SHAP / LIME Powered Clinical Decision Support</span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setEmergencyAlert({
              title: 'Emergency Medical Hotline & Help',
              medicine: null,
              details: 'If you or someone else is experiencing an acute allergic reaction, difficulty breathing, or severe chest pain after taking medication, call 911 or visit the nearest emergency room immediately.'
            })}
            className="text-[#C53030] hover:text-[#9B2C2C] font-semibold flex items-center gap-1 hover:underline transition"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Emergency? Click here</span>
            <span className="md:hidden">Emergency</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Brand Logo - MediSafe AI */}
          <BrandLogo onClick={() => handleNavClick('home')} size={38} />

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#235339] text-white shadow-sm'
                      : 'text-[#424C44] hover:text-[#18231C] hover:bg-[#ECE7DC]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${
                    isActive ? 'text-white' : item.adminBadge ? 'text-[#235339]' : 'text-[#5E6860]'
                  }`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right-Hand Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Patient Profile / Switcher / Admin Control Badge */}
            {isAdmin ? (
              <button
                onClick={() => handleNavClick('admin')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-200 bg-purple-50 hover:bg-purple-100 text-xs text-purple-950 transition cursor-pointer"
                title="Administrator Console (Governance & Patient Control Rights)"
              >
                <div className="w-6 h-6 rounded-full bg-purple-200 text-purple-900 flex items-center justify-center font-bold text-xs">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div className="text-left hidden md:block">
                  <div className="text-[11px] font-bold text-purple-950 leading-none">
                    Admin Console
                  </div>
                  <div className="text-[10px] text-purple-700 font-mono leading-none mt-0.5">
                    Control Rights Only
                  </div>
                </div>
              </button>
            ) : currentUser?.role === 'patient' ? (
              <button
                onClick={() => handleNavClick('profile')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs transition-all group ${
                  activeTab === 'profile'
                    ? 'border-[#235339] bg-[#235339] text-white'
                    : hasUpdatedPersonalDetails
                    ? 'border-[#D5CDBF] bg-white hover:border-[#235339] text-[#18231C]'
                    : 'border-amber-300 bg-amber-50/80 hover:border-amber-500 text-amber-950'
                }`}
                title={hasUpdatedPersonalDetails ? "View My Health Profile" : "Personal details not updated yet — click to complete"}
                id="navbar-patient-profile-btn"
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                  activeTab === 'profile'
                    ? 'bg-white text-[#235339]'
                    : hasUpdatedPersonalDetails
                    ? 'bg-[#E2EFE7] text-[#1E5034]'
                    : 'bg-amber-200 text-amber-900'
                }`}>
                  {patient?.name ? patient.name.charAt(0) : 'P'}
                </div>
                <div className="text-left hidden md:block">
                  <div className="text-[11px] font-bold leading-none">
                    Health Profile
                  </div>
                  <div className={`text-[10px] font-semibold leading-none mt-0.5 ${
                    activeTab === 'profile'
                      ? 'text-emerald-100'
                      : hasUpdatedPersonalDetails
                      ? 'text-[#235339]'
                      : 'text-amber-700'
                  }`}>
                    {hasUpdatedPersonalDetails ? 'Details Saved ✓' : 'Not Updated Yet ⚠️'}
                  </div>
                </div>
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setPatientDropdownOpen(!patientDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#D5CDBF] bg-white hover:border-[#235339] text-xs text-[#18231C] transition-all group"
                  title="Switch Clinical Patient Case"
                >
                  <div className="w-6 h-6 rounded-full bg-[#E2EFE7] text-[#1E5034] flex items-center justify-center font-bold text-xs">
                    {patient?.name ? patient.name.charAt(0) : 'P'}
                  </div>
                  <div className="text-left hidden md:block">
                    <div className="text-[11px] font-bold text-[#18231C] leading-none">
                      {patient?.name || 'No Patient Selected'}
                    </div>
                    <div className="text-[10px] text-[#6A746C] leading-none mt-0.5">
                      {patient?.age ? `Age ${patient.age}` : 'Profile'} • {patient?.diseases?.[0] ? patient.diseases[0].slice(0, 15) + '…' : 'Active'}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-[#6A746C]" />
                </button>

                {/* Patient Dropdown Menu */}
                {patientDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-white border border-[#E5DFD1] shadow-2xl p-2 z-50 animate-fade-in text-[#18231C]">
                    <div className="px-3 py-2 border-b border-[#ECE7DC] text-xs">
                      <span className="font-bold text-[#18231C] block">Clinical Patients ({activePatients.length})</span>
                      <span className="text-[#6A746C] text-[11px]">Synchronized with User Database</span>
                    </div>
                    <div className="py-1 space-y-1">
                      {activePatients.length === 0 ? (
                        <div className="px-3 py-4 text-center text-[#6A746C] text-xs">
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
                                ? 'bg-[#E2EFE7] text-[#1E5034] font-semibold border border-[#C6DDD0]'
                                : 'text-[#424C44] hover:bg-[#F6F4ED]'
                            }`}
                          >
                            <span className="w-6 h-6 rounded-full bg-[#ECE7DC] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 text-[#235339]">
                              {p.name.charAt(0)}
                            </span>
                            <div>
                              <div className="font-semibold text-[#18231C]">{p.name} ({p.age}y)</div>
                              <div className="text-[11px] text-[#6A746C] line-clamp-1">{p.description}</div>
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                    <div className="pt-2 mt-1 border-t border-[#ECE7DC] text-center">
                      <button
                        onClick={() => {
                          setActiveTab('profile');
                          setPatientDropdownOpen(false);
                        }}
                        className="text-xs text-[#235339] hover:underline font-bold"
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
              className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E2EFE7] hover:bg-[#D4E8DC] border border-[#C6DDD0] text-xs font-semibold text-[#1E5034] transition-all shadow-sm group"
            >
              <Bot className="w-4 h-4 text-[#235339] group-hover:rotate-12 transition-transform" />
              <span className="hidden sm:inline">AI Guide</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#235339] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#235339]"></span>
              </span>
            </button>

            {/* User Account & Logout Menu */}
            {currentUser && (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-full border border-[#D5CDBF] bg-white hover:border-[#235339] text-xs text-[#18231C] transition shadow-sm"
                  title="User Profile & Account"
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                    isAdmin
                      ? 'bg-[#E2EFE7] text-[#1E5034]'
                      : isClinician
                      ? 'bg-sky-100 text-sky-800'
                      : 'bg-[#E2EFE7] text-[#1E5034]'
                  }`}>
                    {currentUser.name ? currentUser.name.charAt(0) : 'U'}
                  </div>
                  <div className="text-left hidden lg:block">
                    <div className="text-[11px] font-bold text-[#18231C] leading-none">
                      Hello, {userGreetingName}
                    </div>
                    <div className="text-[10px] text-[#6A746C] uppercase tracking-wider font-semibold mt-0.5 leading-none">
                      {currentUser.role}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-[#6A746C] hidden sm:block" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-[#E5DFD1] shadow-2xl p-2 z-50 animate-fade-in text-xs text-[#18231C]">
                    <div className="px-3 py-2 border-b border-[#ECE7DC]">
                      <span className="font-bold text-[#18231C] block">{currentUser.name}</span>
                      <span className="text-[#6A746C] text-[11px] font-mono truncate block">{currentUser.email}</span>
                      <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        isAdmin
                          ? 'bg-[#E2EFE7] text-[#1E5034] border border-[#C6DDD0]'
                          : isClinician
                          ? 'bg-sky-100 text-sky-800'
                          : 'bg-[#E2EFE7] text-[#1E5034]'
                      }`}>
                        {currentUser.role} Account
                      </span>
                    </div>

                    <div className="py-1 space-y-0.5">
                      {isAdmin ? (
                        <button
                          onClick={() => handleNavClick('admin')}
                          className="w-full text-left px-3 py-2 rounded-xl text-purple-900 hover:bg-purple-50 font-bold flex items-center gap-2 transition"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-purple-700" />
                          <span>Admin Console & Patients</span>
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => handleNavClick('profile')}
                            className="w-full text-left px-3 py-2 rounded-xl text-[#424C44] hover:bg-[#F6F4ED] flex items-center gap-2 transition"
                          >
                            <User className="w-3.5 h-3.5 text-[#6A746C]" />
                            <span>Health Profile</span>
                          </button>

                          <button
                            onClick={() => handleNavClick('dashboard')}
                            className="w-full text-left px-3 py-2 rounded-xl text-[#424C44] hover:bg-[#F6F4ED] flex items-center gap-2 transition"
                          >
                            <Activity className="w-3.5 h-3.5 text-[#6A746C]" />
                            <span>My Dashboard</span>
                          </button>
                        </>
                      )}
                    </div>

                    <div className="pt-1 border-t border-[#ECE7DC]">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logout();
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-[#C53030] hover:bg-rose-50 font-bold flex items-center gap-2 transition"
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
              className="xl:hidden p-2 rounded-xl border border-[#D5CDBF] bg-white text-[#18231C] hover:bg-[#F6F4ED]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-[#E5DFD1] bg-[#F6F4ED] px-4 pt-3 pb-6 space-y-2 animate-fade-in shadow-xl">
          <div className="grid grid-cols-2 gap-2 mb-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-full text-xs font-semibold text-left transition ${
                    isActive
                      ? 'bg-[#235339] text-white'
                      : 'bg-white border border-[#E5DFD1] text-[#424C44] hover:bg-[#ECE7DC]'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-[#6A746C]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {currentUser && (
            <div className="p-3 rounded-2xl bg-white border border-[#E5DFD1] text-xs flex items-center justify-between">
              <div>
                <span className="text-[#6A746C] text-[10px] block">Signed in as:</span>
                <span className="font-bold text-[#18231C] block">{currentUser.name}</span>
                <span className="text-[#235339] text-[11px] font-mono">{currentUser.email}</span>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
                className="px-3 py-1.5 rounded-full bg-rose-50 text-[#C53030] border border-rose-200 text-xs font-bold"
              >
                Sign Out
              </button>
            </div>
          )}

          <button
            onClick={() => handleNavClick('profile')}
            className="w-full text-left p-3 rounded-2xl bg-white border border-[#E5DFD1] text-xs hover:border-[#235339] transition block"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[#6A746C] text-[10px] uppercase font-bold tracking-wider">
                {currentUser?.role === 'patient' ? 'My Personal Profile' : 'Active Patient Case'}
              </span>
              <span className="text-[10px] text-[#235339] font-bold">View Details →</span>
            </div>
            <span className="font-bold text-[#18231C] block">{patient.name} ({patient.age}y, {patient.gender})</span>
            <span className="text-[#235339] text-[11px] block mt-0.5">{patient.diseases.join(', ') || 'No recorded conditions'}</span>
          </button>
        </div>
      )}
    </header>
  );
}
