import React, { useContext } from 'react';
import { ProjectContext } from '../../context/ProjectContext';
import GateControl from './GateControl';
import ProjectHeader from './ProjectHeader';

const ProjectView = ({ projectId, onNavigate }) => {
  const { projects, updateProject } = useContext(ProjectContext);
  
  const project = projects.find(p => p.id === Number(projectId));

  if (!project) return <div className="text-center py-20">المشروع غير موجود</div>;

  return (
    <div className="fade-in">
      <ProjectHeader project={project} onBack={() => onNavigate('dashboard')} />
      
      {/* تمرير رقم البوابة الحالية من الرابط إلى GateControl */}
      <div className="bg-white border rounded-xl min-h-[500px] shadow-sm mt-6 overflow-hidden">
         <GateControl 
            project={project} 
            onUpdate={updateProject} 
            currentGateView={project.stage || 1} // تمرير رقم البوابة للعرض
            currentUserEmail={localStorage.getItem('userEmail') || ''} // البريد الإلكتروني للمستخدم الحالي
         />
      </div>
    </div>
  );
};

export default ProjectView;