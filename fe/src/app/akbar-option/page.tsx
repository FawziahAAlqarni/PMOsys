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
import {useSession, signIn} from 'next-auth/react';

export default function Home() {
  // const [akbar-option, setProjects] = useState<any[]>([]);
  // const {data: session, status} = useSession();
  // const [currentView, setCurrentView] = useState('portfolio');
  // const [activeProjectId, setActiveProjectId] = useState<number | null>(null);
  //
  // // Modals State
  // const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  // const [showCharterModal, setShowCharterModal] = useState(false);
  // const [showRiskModal, setShowRiskModal] = useState(false);
  //
  // useEffect(() => {
  //   const stored = localStorage.getItem('strategic_pms_react_v2');
  //   if (stored) {
  //     setProjects(JSON.parse(stored));
  //   }
  // }, []);
  //
  // useEffect(() => {
  //   localStorage.setItem('strategic_pms_react_v2', JSON.stringify(akbar-option));
  // }, [akbar-option]);
  //
  // const handleCreateProject = (name: string, desc: string) => {
  //   const newProj = {
  //     id: Date.now(),
  //     name,
  //     description: desc,
  //     charterData: {},
  //     risks: [],
  //     currentGateIndex: 0,
  //     gates: JSON.parse(JSON.stringify(GATES_TEMPLATE)),
  //     status: 'active'
  //   };
  //   setProjects([...akbar-option, newProj]);
  //   setShowNewProjectModal(false);
  //   setActiveProjectId(newProj.id);
  //   setCurrentView('project_details');
  // };
  //
  // const handleUpdateProject = (updatedProject: any) => {
  //   setProjects(akbar-option.map(p => p.id === updatedProject.id ? updatedProject : p));
  // };
  //
  // const handleResetSystem = () => {
  //   if (confirm("تحذير: سيتم حذف جميع البيانات والبدء من جديد. هل أنت متأكد؟")) {
  //     localStorage.removeItem('strategic_pms_react_v2');
  //     setProjects([]);
  //     setCurrentView('portfolio');
  //   }
  // };
  //
  // const navigateToProject = (id: number) => {
  //   setActiveProjectId(id);
  //   setCurrentView('project_details');
  // };
  //
  // const activeProject = akbar-option.find(p => p.id === activeProjectId);
  //
  // if (status === 'loading') {
  //   return (
  //     <main className="max-w-5xl mx-auto p-2">
  //       <div className="text-center py-10">Loading...</div>
  //     </main>
  //   );
  // }
  //
  // if (!session) {
  //   return (
  //     <main className="max-w-5xl mx-auto p-2">
  //       <div className="flex flex-col items-center justify-center min-h-screen">
  //         <h1 className="text-2xl font-bold mb-6">Task Management</h1>
  //         <p className="mb-4 text-gray-600">Please sign in with your Microsoft account to continue</p>
  //         <button
  //           onClick={() => signIn('azure-ad')}
  //           className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 font-medium"
  //         >
  //           Sign in with Microsoft
  //         </button>
  //       </div>
  //     </main>
  //   );
  // }
  //
  //
  return (
    <>
      {/*<Navbar*/}
      {/*  currentView={currentView}*/}
      {/*  setCurrentView={setCurrentView}*/}
      {/*  onReset={handleResetSystem}*/}
      {/*/>*/}

      {/*<main className="flex-1 overflow-auto p-8 relative">*/}
      {/*  {currentView === 'portfolio' && (*/}
      {/*    <PortfolioView*/}
      {/*      akbar-option={akbar-option}*/}
      {/*      onOpenNewProject={() => setShowNewProjectModal(true)}*/}
      {/*      onSelectProject={navigateToProject}*/}
      {/*    />*/}
      {/*  )}*/}

      {/*  {currentView === 'analytics' && (*/}
      {/*    <AnalyticsView akbar-option={akbar-option}/>*/}
      {/*  )}*/}

      {/*  {currentView === 'project_details' && activeProject && (*/}
      {/*    <ProjectDetailsView*/}
      {/*      project={activeProject}*/}
      {/*      onUpdateProject={handleUpdateProject}*/}
      {/*      onBack={() => setCurrentView('portfolio')}*/}
      {/*      openCharter={() => setShowCharterModal(true)}*/}
      {/*      openRisks={() => setShowRiskModal(true)}*/}
      {/*    />*/}
      {/*  )}*/}
      {/*</main>*/}

      {/*/!* Modals *!/*/}
      {/*{showNewProjectModal && (*/}
      {/*  <NewProjectModal*/}
      {/*    onClose={() => setShowNewProjectModal(false)}*/}
      {/*    onCreate={handleCreateProject}*/}
      {/*  />*/}
      {/*)}*/}

      {/*{showCharterModal && activeProject && (*/}
      {/*  <CharterModal*/}
      {/*    project={activeProject}*/}
      {/*    onClose={() => setShowCharterModal(false)}*/}
      {/*    onSave={(updatedCharter: any) => {*/}
      {/*      const updatedProject = {...activeProject, charterData: updatedCharter};*/}
      {/*      // Mark charter requirement as done in Gate 1 (index 0)*/}
      {/*      const gate1Req = updatedProject.gates[0].requirements.find((r: any) => r.type === 'charter_form');*/}
      {/*      if (gate1Req) gate1Req.done = true;*/}
      {/*      handleUpdateProject(updatedProject);*/}
      {/*      setShowCharterModal(false);*/}
      {/*    }}*/}
      {/*  />*/}
      {/*)}*/}

      {/*{showRiskModal && activeProject && (*/}
      {/*  <RiskRegisterModal*/}
      {/*    project={activeProject}*/}
      {/*    onClose={() => {*/}
      {/*      if (activeProject.risks && activeProject.risks.length > 0) {*/}
      {/*        const updatedProject = {...activeProject};*/}
      {/*        if (updatedProject.currentGateIndex < updatedProject.gates.length) {*/}
      {/*          const currentGate = updatedProject.gates[updatedProject.currentGateIndex];*/}
      {/*          const req = currentGate.requirements.find((r: any) => r.type === 'risk_register');*/}
      {/*          if (req) {*/}
      {/*            req.done = true;*/}
      {/*            handleUpdateProject(updatedProject);*/}
      {/*          }*/}
      {/*        }*/}
      {/*      }*/}
      {/*      setShowRiskModal(false);*/}
      {/*    }}*/}
      {/*    onSaveRisks={(newRisks: any[]) => {*/}
      {/*      handleUpdateProject({...activeProject, risks: newRisks});*/}
      {/*    }}*/}
      {/*  />*/}
      {/*)}*/}
      <h1>works</h1>
    </>
  );
}
