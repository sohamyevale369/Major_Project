import React from 'react';
import { HealthProvider, useHealth } from './context/HealthContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import EmergencyModal from './components/common/EmergencyModal';
import Toast from './components/common/Toast';
import HeroSection from './components/home/HeroSection';
import HowItWorks from './components/home/HowItWorks';
import FeatureGrid from './components/home/FeatureGrid';
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
  const { activeTab, currentUser } = useHealth();

  // Mandatory Authentication Gate:
  // When a user visits the site, they MUST register or sign in first.
  // After successful validation only, the user is allowed to perform tasks.
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-mediteal-500/30 selection:text-mediteal-300">
        <AuthPortal />
        <Toast />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-mediteal-500/30 selection:text-mediteal-300">
      {/* Navigation Header */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <HeroSection />
            <HowItWorks />
            <FeatureGrid />
          </>
        )}

        {activeTab === 'dashboard' && <UserDashboard />}
        {activeTab === 'risk-checker' && <MedicineRiskView />}
        {activeTab === 'interactions' && <DrugInteractionView />}
        {activeTab === 'ocr' && <PrescriptionOCRView />}
        {activeTab === 'profile' && <HealthProfileView />}
        {activeTab === 'history' && <MedicationHistoryView />}
        {activeTab === 'report' && <SafetyReportView />}
        {activeTab === 'admin' && <AdminDashboardView />}
      </main>

      {/* Footer (hidden when printing) */}
      <div className="print:hidden">
        <Footer />
      </div>

      {/* Modals & Overlays */}
      <EmergencyModal />
      <AIChatbotModal />
      <Toast />
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
