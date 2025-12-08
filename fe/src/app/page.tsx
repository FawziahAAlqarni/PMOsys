'use client';
import React, { useState, useEffect } from 'react';
import {useRouter} from 'next/navigation';
import Navbar from '@/components/Navbar';
import PortfolioView from '@/components/PortfolioView';
import AnalyticsView from '@/components/AnalyticsView';
import NewProjectModal from '@/components/modals/NewProjectModal';
import type {Project, ViewType} from '@/types';

export default function Home() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentView, setCurrentView] = useState<ViewType>('portfolio');
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project-cards`);
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      } else {
        console.error('Failed to fetch projects');
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleCreateProject = async (name: string, desc: string, budget: number, weeks: number) => {
    try {
      const newProj = {
        name,
        description: desc,
        estimatedBudget: budget,
        durationInWeeks: weeks,
        risks: []
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project-cards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProj),
      });

      if (response.ok) {
        const createdProject = await response.json();
        setProjects([...projects, createdProject]);
        setShowNewProjectModal(false);
        router.push(`/projects/${createdProject.id}`);
      } else {
        console.error('Failed to create project');
      }
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const handleResetSystem = async () => {
    if (confirm("تحذير: سيتم حذف جميع البيانات والبدء من جديد. هل أنت متأكد؟")) {
      // TODO: Implement bulk delete API endpoint
      setProjects([]);
      setCurrentView('portfolio');
      await fetchProjects();
    }
  };

  const navigateToProject = (id: string) => {
    router.push(`/projects/${id}`);
  };

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
      </main>

      {showNewProjectModal && (
        <NewProjectModal
          onClose={() => setShowNewProjectModal(false)}
          onCreate={handleCreateProject}
        />
      )}
    </>
  );
}
