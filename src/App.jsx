import React, { useState } from 'react';
import AuthLayout from './components/AuthLayout';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import TwoFactorModal from './components/TwoFactorModal';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import HelpSupportModal from './components/HelpSupportModal';
import DashboardPreview from './components/DashboardPreview';
import Toast from './components/Toast';

export default function App() {
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  const [selectedRole, setSelectedRole] = useState('doctor'); // 'patient' | 'doctor' | 'admin'
  
  // Modals
  const [is2FAOpen, setIs2FAOpen] = useState(false);
  const [pendingUserEmail, setPendingUserEmail] = useState('');
  const [isForgotOpen, setIsForgotOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Authenticated State & Toast
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const handleLoginSuccess = (userData) => {
    setAuthenticatedUser(userData);
    showToast(`Welcome back, ${userData.name || 'Practitioner'}! Session securely opened.`, 'success');
  };

  const handleTrigger2FA = (email) => {
    setPendingUserEmail(email);
    setIs2FAOpen(true);
  };

  const handle2FAVerified = () => {
    setIs2FAOpen(false);
    setAuthenticatedUser({
      email: pendingUserEmail || 'verified.clinician@medisafe.ai',
      role: selectedRole,
      name: (pendingUserEmail || 'Dr. Verified').split('@')[0],
    });
    showToast('Two-Factor Authentication Verified! Welcome to MediSafe.', 'success');
  };

  const handleRegisterSuccess = (userData) => {
    setAuthenticatedUser(userData);
    showToast(`Account successfully registered for ${userData.name}! Clinical profile created.`, 'success');
  };

  const handleResetSent = (email) => {
    showToast(`Password reset link dispatched to ${email}`, 'info');
  };

  const handleLogout = () => {
    setAuthenticatedUser(null);
    showToast('You have been securely signed out.', 'info');
  };

  // If logged in, show the interactive authenticated console preview
  if (authenticatedUser) {
    return (
      <>
        <DashboardPreview user={authenticatedUser} onLogout={handleLogout} />
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </>
    );
  }

  return (
    <>
      <AuthLayout
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenHelp={() => setIsHelpOpen(true)}
      >
        {activeTab === 'login' ? (
          <LoginForm
            selectedRole={selectedRole}
            setSelectedRole={setSelectedRole}
            onLoginSuccess={handleLoginSuccess}
            onTrigger2FA={handleTrigger2FA}
            onForgotPassword={() => setIsForgotOpen(true)}
            onSwitchToRegister={() => setActiveTab('register')}
          />
        ) : (
          <RegisterForm
            selectedRole={selectedRole}
            setSelectedRole={setSelectedRole}
            onRegisterSuccess={handleRegisterSuccess}
            onSwitchToLogin={() => setActiveTab('login')}
          />
        )}
      </AuthLayout>

      {/* 2FA Modal */}
      <TwoFactorModal
        isOpen={is2FAOpen}
        onClose={() => setIs2FAOpen(false)}
        onVerified={handle2FAVerified}
        userEmail={pendingUserEmail}
      />

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={isForgotOpen}
        onClose={() => setIsForgotOpen(false)}
        onResetSent={handleResetSent}
      />

      {/* Help & Support Modal */}
      <HelpSupportModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />

      {/* Global Toast Alerts */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}
