
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { ProjectProvider } from './context/ProjectContext';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function FouzyahApp() {
  return (
    <React.StrictMode>
      <ProjectProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ProjectProvider>
    </React.StrictMode>
  );
}