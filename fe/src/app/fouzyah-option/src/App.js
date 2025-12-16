'use client'; 
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import ProjectView from './components/ProjectView/ProjectView';
import ContactPage from './components/ContactPage';
import StatisticsPage from './components/StatisticsPage/StatisticsPage';
import PMOView from './components/PMOView/PMOView';
import UserEmailPrompt from './components/UserEmailPrompt';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const navigateTo = (page, projectId = null) => {
    setCurrentPage(page);
    if (projectId !== null) {
      setSelectedProjectId(projectId);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={navigateTo} />;
      case 'project':
        return <ProjectView projectId={selectedProjectId} onNavigate={navigateTo} />;
      case 'statistics':
        return <StatisticsPage onNavigate={navigateTo} />;
      case 'pmo':
        return <PMOView onNavigate={navigateTo} />;
      case 'contact':
        return <ContactPage onNavigate={navigateTo} />;
      default:
        return <Dashboard onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-right relative" dir="rtl">
      
      {/* مطالبة البريد الإلكتروني */}
      <UserEmailPrompt />
      
      {/* علامة مائية - شعار واحد في الوسط */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0" style={{ opacity: 0.06 }}>
        <img 
          src="/Logo.png" 
          alt="Watermark" 
          className="w-[600px] h-[600px] object-contain"
          style={{ filter: 'grayscale(100%)' }}
        />
      </div>
      
      {/* المحتوى الرئيسي */}
      <div className="relative z-10">
        <Navbar currentPage={currentPage} onNavigate={navigateTo} /> 
        <main className="p-8 max-w-7xl mx-auto fade-in pb-20">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;