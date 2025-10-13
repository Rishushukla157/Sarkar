import React, { useState, useEffect } from 'react';
import { User } from './types';
import { AuthService } from './lib/auth';
import { LoginPage } from './components/auth/LoginPage';
import { RegisterPage } from './components/auth/RegisterPage';
import { CitizenDashboard } from './components/citizen/CitizenDashboard';
import { OfficialDashboard } from './components/official/OfficialDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Toaster } from './components/ui/sonner';

type AppView = 'login' | 'register' | 'citizen' | 'official' | 'admin';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<AppView>('login');

  // Check for existing session on mount
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      if (user.role === 'CITIZEN') {
        setCurrentView('citizen');
      } else if (user.role === 'ADMIN') {
        setCurrentView('admin');
      } else if (AuthService.canAccessOfficialPortal(user)) {
        setCurrentView('official');
      }
    }
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    if (user.role === 'CITIZEN') {
      setCurrentView('citizen');
    } else if (user.role === 'ADMIN') {
      setCurrentView('admin');
    } else if (AuthService.canAccessOfficialPortal(user)) {
      setCurrentView('official');
    }
  };

  const handleRegister = (user: User) => {
    setCurrentUser(user);
    setCurrentView('citizen');
  };

  const handleLogout = () => {
    AuthService.logout();
    setCurrentUser(null);
    setCurrentView('login');
  };

  const handleShowRegister = () => {
    setCurrentView('register');
  };

  const handleBackToLogin = () => {
    setCurrentView('login');
  };

  return (
    <>
      {currentView === 'login' && (
        <LoginPage onLogin={handleLogin} onRegister={handleShowRegister} />
      )}

      {currentView === 'register' && (
        <RegisterPage onRegister={handleRegister} onBack={handleBackToLogin} />
      )}

      {currentView === 'citizen' && currentUser && (
        <CitizenDashboard user={currentUser} onLogout={handleLogout} />
      )}

      {currentView === 'official' && currentUser && (
        <OfficialDashboard user={currentUser} onLogout={handleLogout} />
      )}

      {currentView === 'admin' && currentUser && (
        <AdminDashboard user={currentUser} onLogout={handleLogout} />
      )}

      <Toaster />
    </>
  );
}
