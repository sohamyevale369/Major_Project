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
import AuthModal from './components/auth/AuthModal';

function MainApp() {
  const { activeTab } = useHealth();

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
      </main>

      {/* Footer (hidden when printing) */}
      <div className="print:hidden">
        <Footer />
      </div>

      {/* Modals & Overlays */}
      <EmergencyModal />
      <AIChatbotModal />
      <AuthModal />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <HealthProvider>
      <MainApp />
    </HealthProvider>
  );
}
