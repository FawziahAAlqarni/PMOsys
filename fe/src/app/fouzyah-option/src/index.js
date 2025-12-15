
import React from 'react';
import './index.css';
import App from './App';
import { ProjectProvider } from './context/ProjectContext';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function FouzyahApp() {
  return (
    <React.StrictMode>
      <ProjectProvider>
        <App />
      </ProjectProvider>
    </React.StrictMode>
  );
}