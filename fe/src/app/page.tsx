'use client';
import React, {useState, useEffect} from 'react';
import Navbar from '@/components/Navbar';
import PortfolioView from '@/components/PortfolioView';
import AnalyticsView from '@/components/AnalyticsView';
import ProjectDetailsView from '@/components/ProjectDetailsView';
import NewProjectModal from '@/components/modals/NewProjectModal';
import CharterModal from '@/components/modals/CharterModal';
import RiskRegisterModal from '@/components/modals/RiskRegisterModal';
import {GATES_TEMPLATE} from '@/lib/constants';

export default function Home() {
  const [projects, setProjects] = useState<any[]>([]);
  const [currentView, setCurrentView] = useState('portfolio');
  const [activeProjectId, setActiveProjectId] = useState<number | null>(null);

  // Modals State
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [showCharterModal, setShowCharterModal] = useState(false);
  const [showRiskModal, setShowRiskModal] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('strategic_pms_react_v2');
    if (stored) {
      setProjects(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('strategic_pms_react_v2', JSON.stringify(projects));
  }, [projects]);

  const handleCreateProject = (name: string, desc: string) => {
    const newProj = {
      id: Date.now(),
      name,
      description: desc,
      charterData: {},
      risks: [],
      currentGateIndex: 0,
      gates: JSON.parse(JSON.stringify(GATES_TEMPLATE)),
      status: 'active'
    };
    setProjects([...projects, newProj]);
    setShowNewProjectModal(false);
    setActiveProjectId(newProj.id);
    setCurrentView('project_details');
  };

  const handleUpdateProject = (updatedProject: any) => {
    setProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p));
  };

  const handleResetSystem = () => {
    if (confirm("تحذير: سيتم حذف جميع البيانات والبدء من جديد. هل أنت متأكد؟")) {
      localStorage.removeItem('strategic_pms_react_v2');
      setProjects([]);
      setCurrentView('portfolio');
    }
  };

  const navigateToProject = (id: number) => {
    setActiveProjectId(id);
    setCurrentView('project_details');
  };

  const activeProject = projects.find(p => p.id === activeProjectId);

  return (
    <>
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        onReset={handleResetSystem}
      />

      <main className="flex-1 overflow-auto p-8 relative">
        {currentView === 'portfolio' && (
          <PortfolioView
            projects={projects}
            onOpenNewProject={() => setShowNewProjectModal(true)}
            onSelectProject={navigateToProject}
          />
        )}

        {currentView === 'analytics' && (
          <AnalyticsView projects={projects}/>
        )}

        {currentView === 'project_details' && activeProject && (
          <ProjectDetailsView
            project={activeProject}
            onUpdateProject={handleUpdateProject}
            onBack={() => setCurrentView('portfolio')}
            openCharter={() => setShowCharterModal(true)}
            openRisks={() => setShowRiskModal(true)}
          />
        )}
      </main>

      {/* Modals */}
      {showNewProjectModal && (
        <NewProjectModal
          onClose={() => setShowNewProjectModal(false)}
          onCreate={handleCreateProject}
        />
      )}

      {showCharterModal && activeProject && (
        <CharterModal
          project={activeProject}
          onClose={() => setShowCharterModal(false)}
          onSave={(updatedCharter: any) => {
            const updatedProject = {...activeProject, charterData: updatedCharter};
            // Mark charter requirement as done in Gate 1 (index 0)
            const gate1Req = updatedProject.gates[0].requirements.find((r: any) => r.type === 'charter_form');
            if (gate1Req) gate1Req.done = true;
            handleUpdateProject(updatedProject);
            setShowCharterModal(false);
          }}
        />
      )}

      {showRiskModal && activeProject && (
        <RiskRegisterModal
          project={activeProject}
          onClose={() => {
            if (activeProject.risks && activeProject.risks.length > 0) {
              const updatedProject = {...activeProject};
              if (updatedProject.currentGateIndex < updatedProject.gates.length) {
                const currentGate = updatedProject.gates[updatedProject.currentGateIndex];
                const req = currentGate.requirements.find((r: any) => r.type === 'risk_register');
                if (req) {
                  req.done = true;
                  handleUpdateProject(updatedProject);
                }
              }
            }
            setShowRiskModal(false);
          }}
          onSaveRisks={(newRisks: any[]) => {
            handleUpdateProject({...activeProject, risks: newRisks});
          }}
        />
      )}
    </>
  );
}
