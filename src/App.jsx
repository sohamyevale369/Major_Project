import React from 'react';
import { HealthProvider, useHealth } from './context/HealthContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import EmergencyModal from './components/common/EmergencyModal';
import Toast from './components/common/Toast';
import HeroSection from './components/home/HeroSection';
import HealthProfileView from './components/profile/HealthProfileView';
import MedicineRiskView from './components/risk-checker/MedicineRiskView';
import DrugInteractionView from './components/interactions/DrugInteractionView';
import PrescriptionOCRView from './components/ocr/PrescriptionOCRView';
import MedicationHistoryView from './components/history/MedicationHistoryView';
import SafetyReportView from './components/report/SafetyReportView';
import UserDashboard from './components/dashboard/UserDashboard';
import AIChatbotModal from './components/chatbot/AIChatbotModal';
import AuthPortal from './components/auth/AuthPortal';
import AdminDashboardView from './components/admin/AdminDashboardView';
import DoctorPortalView from './components/doctor/DoctorPortalView';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('UI Error Caught by Boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 text-center">
          <div className="max-w-md p-8 rounded-3xl bg-slate-900 border border-rose-500/30 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto text-xl">
              ⚠️
            </div>
            <h2 className="text-xl font-bold text-white">Something went wrong</h2>
            <p className="text-xs text-slate-400 leading-relaxed font-mono">
              {this.state.error?.message || 'An unexpected rendering error occurred.'}
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="px-5 py-2.5 rounded-xl bg-mediteal-500 hover:bg-mediteal-400 text-slate-950 font-bold text-xs transition shadow-md"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function MainApp() {
  const { activeTab, currentUser, isAuthModalOpen, setIsAuthModalOpen } = useHealth();

  React.useEffect(() => {
    console.log(
      '%c[MediSafe AI] Build Active: v2.4 (Guest Landing + Action-Gated Auth)%c',
      'background: #235339; color: #FFFFFF; font-size: 13px; font-weight: bold; padding: 6px 12px; border-radius: 6px;',
      ''
    );
  }, []);

  // When not logged in, the active tab displayed is always the 'home' landing page
  const effectiveTab = !currentUser ? 'home' : activeTab;

  return (
    <div className="min-h-screen bg-[#F6F4ED] text-[#18231C] flex flex-col selection:bg-[#235339]/20 selection:text-[#235339] print:bg-white print:min-h-0">
      {/* Navigation Header (hidden when printing) */}
      <div className="print:hidden">
        <Navbar />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 print:flex-none print:p-0">
        {effectiveTab === 'home' && <HeroSection />}

        {effectiveTab === 'dashboard' && (currentUser?.role === 'clinician' ? <DoctorPortalView initialStep="dashboard" /> : <UserDashboard />)}
        {effectiveTab === 'doctor-dashboard' && <DoctorPortalView initialStep="dashboard" />}
        {effectiveTab === 'doctor-patients' && <DoctorPortalView initialStep="patients" />}
        {effectiveTab === 'doctor-review' && <DoctorPortalView initialStep="review" />}
        {effectiveTab === 'doctor-report' && <DoctorPortalView initialStep="report" />}
        {effectiveTab === 'risk-checker' && <MedicineRiskView />}
        {effectiveTab === 'interactions' && <DrugInteractionView />}
        {effectiveTab === 'ocr' && <PrescriptionOCRView />}
        {effectiveTab === 'profile' && <HealthProfileView />}
        {effectiveTab === 'history' && <MedicationHistoryView />}
        {effectiveTab === 'report' && <SafetyReportView />}
        {effectiveTab === 'admin' && <AdminDashboardView />}
      </main>

      {/* Footer (hidden when printing) */}
      <div className="print:hidden">
        <Footer />
      </div>

      {/* Modals & Overlays (hidden when printing) */}
      <div className="print:hidden">
        <EmergencyModal />
        <AIChatbotModal />
        {isAuthModalOpen && (
          <AuthPortal isModal={true} onClose={() => setIsAuthModalOpen(false)} />
        )}
        <Toast />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <HealthProvider>
        <MainApp />
      </HealthProvider>
    </ErrorBoundary>
  );
}
