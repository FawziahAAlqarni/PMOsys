'use client';
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import PortfolioView from '@/components/PortfolioView';
import AnalyticsView from '@/components/AnalyticsView';
import ProjectDetailsView from '@/components/ProjectDetailsView';
import NewProjectModal from '@/components/modals/NewProjectModal';
import CharterModal from '@/components/modals/CharterModal';
import RiskRegisterModal from '@/components/modals/RiskRegisterModal';
import { GATES_TEMPLATE, LOCALSTORAGE_KEY } from '@/lib/constants';
import type { Project, ViewType, CharterData, Risk } from '@/types';

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentView, setCurrentView] = useState<ViewType>('portfolio');
  const [activeProjectId, setActiveProjectId] = useState<number | null>(null);

  // Modals State
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [showCharterModal, setShowCharterModal] = useState(false);
  const [showRiskModal, setShowRiskModal] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(LOCALSTORAGE_KEY);
    if (stored) {
      setProjects(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  const handleCreateProject = (name: string, desc: string) => {
    const newProj: Project = {
      id: Date.now(),
      name,
      projectManager: '',
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

  const handleUpdateProject = (updatedProject: Project) => {
    setProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p));
  };

  const handleResetSystem = () => {
    if (confirm("تحذير: سيتم حذف جميع البيانات والبدء من جديد. هل أنت متأكد؟")) {
      localStorage.removeItem(LOCALSTORAGE_KEY);
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
          <AnalyticsView projects={projects} />
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
          onSave={(updates) => {
            const updatedProject = {
              ...activeProject,
              name: updates.name,
              description: updates.description,
              projectManager: updates.projectManager,
              charterData: updates.charterData
            };
            // Mark charter requirement as done in Gate 1 (index 0)
            const gate1Req = updatedProject.gates[0].requirements.find((r) => r.type === 'charter_form');
            if(gate1Req) gate1Req.done = true;
            handleUpdateProject(updatedProject);
            setShowCharterModal(false);
          }}
        />
      )}

      {showRiskModal && activeProject && (
        <RiskRegisterModal
          project={activeProject}
          onClose={() => {
             if(activeProject.risks && activeProject.risks.length > 0) {
                 const updatedProject = { ...activeProject };
                 if (updatedProject.currentGateIndex < updatedProject.gates.length) {
                    const currentGate = updatedProject.gates[updatedProject.currentGateIndex];
                    const req = currentGate.requirements.find((r) => r.type === 'risk_register');
                    if(req) {
                        req.done = true;
                        handleUpdateProject(updatedProject);
                    }
                 }
             }
             setShowRiskModal(false);
          }}
          onSaveRisks={(newRisks: Risk[]) => {
            handleUpdateProject({ ...activeProject, risks: newRisks });
          }}
        />
      )}
    </>
  );
}