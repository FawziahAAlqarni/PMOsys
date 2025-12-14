import React, { useContext, useState } from 'react';
import { ProjectContext } from '../app/fouzyah-option/src/context/ProjectContext';
import DashboardStats from './DashboardStats';

const Dashboard = () => {
  const { projects, deleteProject } = useContext(ProjectContext);
  const [showModal, setShowModal] = useState(false);
  
  return (
    <div className="fade-in">
      {/* 1. الإحصائيات */}
      <DashboardStats projects={projects} />

      {/* 2. الشريط الفاصل وزر الإضافة */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 border-t pt-8">
          <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-primary-900 border-r-4 border-secondary-gold pr-3">قائمة المشاريع</h2>
              <span className="bg-primary-50 text-primary-600 text-xs px-2 py-1 rounded-full font-bold">{projects.length} مشاريع</span>
          </div>
          
          <button 
              onClick={() => setShowModal(true)} 
              className="bg-primary-600 text-white px-6 py-3 rounded-xl shadow-lg font-bold hover:bg-primary-700 flex items-center gap-2 transition transform active:scale-95"
          >
              <i className="fa-solid fa-plus"></i> تسجيل مشروع جديد
          </button>
      </div>

      {/* 3. قائمة المشاريع */}
      <div className="space-y-4">
          {projects.length === 0 ? (
              <div className="py-24 text-center border-2 border-dashed border-gray-300 rounded-3xl bg-white/50">
                  <i className="fa-solid fa-folder-open text-4xl text-gray-300 mb-4"></i>
                  <p className="text-gray-500 font-bold">لا توجد مشاريع مسجلة حالياً</p>
                  <p className="text-xs text-gray-400 mt-1">ابدأ بإضافة مشروع جديد من الزر أعلاه</p>
              </div>
          ) : (
              projects.map(p => (
                  <div key={p.id} className="p-4 border rounded-lg bg-white shadow hover:shadow-lg transition">
                      <div className="flex justify-between items-start">
                          <div>
                              <h3 className="font-bold text-lg text-primary-900">{p.name}</h3>
                              <p className="text-gray-600 text-sm mt-1">{p.description}</p>
                          </div>
                          <button 
                            onClick={() => deleteProject(p.id)} 
                            className="text-gray-300 hover:text-red-500 transition"
                            title="حذف المشروع"
                          >
                            <i className="fa-solid fa-trash-can"></i>
                          </button>
                      </div>
                  </div>
              ))
          )}
      </div>
    </div>
  );
};

export default Dashboard;