import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProjectContext } from '../../context/ProjectContext';
import ProjectCard from './ProjectCard';
import NewProjectModal from '../Modals/NewProjectModal';
import { useAccessToken } from '../../hooks/useAccessToken';

const ProjectList = () => {
  const { projects, deleteProject } = useContext(ProjectContext);
  const [showModal, setShowModal] = useState(false);
  const { accessToken } = useAccessToken();
  const navigate = useNavigate();

  return (
    <div className="fade-in">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 border-b border-gray-200 pb-6">
          <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-primary-900 border-r-4 border-secondary-gold pr-3">قائمة المشاريع</h2>
              <span className="bg-primary-50 text-primary-600 text-xs px-2 py-1 rounded-full font-bold">{projects.length} مشاريع</span>
          </div>
          <button onClick={() => setShowModal(true)} className="bg-primary-600 text-white px-6 py-3 rounded-xl shadow-lg font-bold hover:bg-primary-700 flex items-center gap-2 transition transform active:scale-95">
              <i className="fa-solid fa-plus"></i> تسجيل مشروع جديد
          </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length === 0 ? (
              <div className="col-span-full py-24 text-center border-2 border-dashed border-gray-300 rounded-3xl bg-white/50">
                  <i className="fa-solid fa-folder-open text-4xl text-gray-300 mb-4"></i>
                  <p className="text-gray-500 font-bold">لا توجد مشاريع مسجلة</p>
              </div>
          ) : (
              projects.map(p => (
                  <div key={p.id} className="relative group">
                      {/* التوجيه هنا يذهب للبوابة الحالية للمشروع */}
                      <div onClick={() => navigate(`/project/${p.id}/gate/${p.stage}`)}>
                        <ProjectCard project={p} onClick={() => {}} /> 
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); deleteProject(p.id); }} className="absolute top-4 left-4 text-gray-300 hover:text-red-500 z-10 opacity-0 group-hover:opacity-100 transition bg-white rounded-full p-1 shadow-sm">
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                  </div>
              ))
          )}
      </div>
      {showModal && <NewProjectModal onClose={() => setShowModal(false)} accessToken={accessToken} />}
    </div>
  );
};

export default ProjectList;