import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProjectContext } from '../../context/ProjectContext';
import GateControl from './GateControl';
import ProjectHeader from './ProjectHeader';

const ProjectView = () => {
  const { id, gateNumber } = useParams(); // قراءة المعاملات من الرابط
  const navigate = useNavigate();
  const { projects, updateProject } = useContext(ProjectContext);
  
  const project = projects.find(p => p.id === Number(id));

  if (!project) return <div className="text-center py-20">المشروع غير موجود</div>;

  return (
    <div className="fade-in">
      <ProjectHeader project={project} onBack={() => navigate('/')} />
      
      {/* تمرير رقم البوابة الحالية من الرابط إلى GateControl */}
      <div className="bg-white border rounded-xl min-h-[500px] shadow-sm mt-6 overflow-hidden">
         <GateControl 
            project={project} 
            onUpdate={updateProject} 
            currentGateView={Number(gateNumber)} // تمرير رقم البوابة للعرض
         />
      </div>
    </div>
  );
};

export default ProjectView;