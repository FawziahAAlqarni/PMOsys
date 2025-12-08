'use client';
import React, {useState, useEffect} from 'react';
import {useRouter, useParams} from 'next/navigation';
import ProjectDetailsView from '@/components/ProjectDetailsView';
import CharterModal from '@/components/modals/CharterModal';
import RiskRegisterModal from '@/components/modals/RiskRegisterModal';
import type {Project, Risk, Gate} from '@/types';

export default function ProjectPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [gates, setGates] = useState<Gate[]>([]);
  const [showCharterModal, setShowCharterModal] = useState(false);
  const [showRiskModal, setShowRiskModal] = useState(false);

  useEffect(() => {
    fetchProject();
    fetchGates();
  }, [params.id]);

  const fetchProject = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project-cards/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setProject(data);
      } else {
        console.error('Failed to fetch project');
        router.push('/');
      }
    } catch (error) {
      console.error('Error fetching project:', error);
      router.push('/');
    }
  };

  const fetchGates = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project-cards/gates/template`);
      if (response.ok) {
        const data = await response.json();
        setGates(data);
      }
    } catch (error) {
      console.error('Error fetching gates:', error);
    }
  };

  const handleUpdateProject = async (updatedProject: Project) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project-cards/${updatedProject.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProject),
      });

      if (response.ok) {
        const data = await response.json();
        setProject(data);
      } else {
        console.error('Failed to update project');
      }
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  if (!project || gates.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#006C35] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <main className="flex-1 overflow-auto p-8">
        <ProjectDetailsView
          project={project}
          gates={gates}
          onUpdateProject={handleUpdateProject}
          onBack={() => router.push('/')}
          openCharter={() => setShowCharterModal(true)}
          openRisks={() => setShowRiskModal(true)}
        />
      </main>

      {showCharterModal && (
        <CharterModal
          project={project}
          onClose={() => setShowCharterModal(false)}
          onSave={(updates) => {
            const updatedProject = {
              ...project,
              name: updates.name,
              description: updates.description,
              projectManager: updates.projectManager,
              charterData: updates.charterData
            };
            // Mark charter requirement as done in Gate 1 (index 0)
            const gate1Req = updatedProject.gates[0].requirements.find((r) => r.type === 'charter_form');
            if (gate1Req) gate1Req.done = true;
            handleUpdateProject(updatedProject);
            setShowCharterModal(false);
          }}
        />
      )}

      {showRiskModal && (
        <RiskRegisterModal
          project={project}
          onClose={() => {
            if (project.risks && project.risks.length > 0) {
              const updatedProject = {...project};
              if (updatedProject.currentGateIndex < updatedProject.gates.length) {
                const currentGate = updatedProject.gates[updatedProject.currentGateIndex];
                const req = currentGate.requirements.find((r) => r.type === 'risk_register');
                if (req) {
                  req.done = true;
                  handleUpdateProject(updatedProject);
                }
              }
            }
            setShowRiskModal(false);
          }}
          onSaveRisks={(newRisks: Risk[]) => {
            handleUpdateProject({...project, risks: newRisks});
          }}
        />
      )}
    </>
  );
}
