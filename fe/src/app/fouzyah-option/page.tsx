'use client';
import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './src/App'; 
import { ProjectProvider } from './src/context/ProjectContext';

export default function Page() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => { setIsClient(true); }, []);

  if (!isClient) return null;

  return (
    <ProjectProvider>
      {/* هنا التعديل المهم: تحديد المسار الأساسي */}
      <BrowserRouter basename="/fouzyah-option">
        <App />
      </BrowserRouter>
    </ProjectProvider>
  );
}