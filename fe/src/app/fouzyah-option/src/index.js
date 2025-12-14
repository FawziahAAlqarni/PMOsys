
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // <--- استيراد المكتبة
import './index.css';
import App from './App';
import { ProjectProvider } from './context/ProjectContext';
import '@fortawesome/fontawesome-free/css/all.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProjectProvider>
      <BrowserRouter>  {/* <--- تغليف التطبيق */}
        <App />
      </BrowserRouter>
    </ProjectProvider>
  </React.StrictMode>
);