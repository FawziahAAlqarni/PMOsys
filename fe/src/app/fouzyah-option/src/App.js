'use client'; 
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import ProjectView from './components/ProjectView/ProjectView';
import ContactPage from './components/ContactPage';
import StatisticsPage from './components/StatisticsPage/StatisticsPage';
import UserEmailPrompt from './components/UserEmailPrompt';

function App() {
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
        <Navbar /> 
        <main className="p-8 max-w-7xl mx-auto fade-in pb-20">
          <Routes>
            {/* الصفحة الرئيسية: قائمة المشاريع */}
            <Route path="/" element={<Dashboard />} />
            
            {/* صفحة تفاصيل المشروع والبوابات */}
            <Route path="/project/:id/gate" element={<ProjectView />} />
            
            {/* صفحة الإحصائيات */}
            <Route path="/statistics" element={<StatisticsPage />} />
            
            {/* صفحة التواصل */}
            <Route path="/contact" element={<ContactPage />} />
            
            {/* توجيه أي رابط خاطئ للرئيسية */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;