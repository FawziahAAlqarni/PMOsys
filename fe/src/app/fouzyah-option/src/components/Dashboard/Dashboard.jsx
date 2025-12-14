import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // للتنقل بين الصفحات
import { ProjectContext } from '../../context/ProjectContext'; // لجلب البيانات
import ProjectCard from './ProjectCard'; // بطاقة المشروع
import DashboardStats from './DashboardStats'; // الإحصائيات العلوية
import NewProjectModal from '../Modals/NewProjectModal'; // نافذة التسجيل
import { useAccessToken } from '../../hooks/useAccessToken'; // للحصول على Microsoft token

const Dashboard = () => {
  const { projects, deleteProject } = useContext(ProjectContext);
  const [showModal, setShowModal] = useState(false);
  const { accessToken } = useAccessToken();
  const navigate = useNavigate();

  // دالة لفتح المشروع عند الضغط عليه
  const handleCardClick = (projectId) => {
    navigate(`/project/${projectId}/gate`);
  };

  return (
    <div className="fade-in">
      
      {/* 1. قسم الإحصائيات في الأعلى */}
      <DashboardStats projects={projects} />

      {/* 2. شريط العنوان وزر الإضافة */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 border-t pt-8">
          <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-primary-900 border-r-4 border-secondary-gold pr-3">قائمة المشاريع</h2>
              <span className="bg-primary-50 text-primary-600 text-xs px-2 py-1 rounded-full font-bold">
                  {projects.length} مشاريع
              </span>
          </div>
          
          <button 
              onClick={() => setShowModal(true)} 
              className="bg-primary-600 text-white px-6 py-3 rounded-xl shadow-lg font-bold hover:bg-primary-700 flex items-center gap-2 transition transform active:scale-95"
          >
              <i className="fa-solid fa-plus"></i> تسجيل مشروع جديد
          </button>
      </div>

      {/* 3. شبكة عرض المشاريع (Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length === 0 ? (
              // حالة عدم وجود مشاريع
              <div className="col-span-full py-24 text-center border-2 border-dashed border-gray-300 rounded-3xl bg-white/50">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                    <i className="fa-solid fa-folder-open text-4xl"></i>
                  </div>
                  <p className="text-gray-500 font-bold text-lg">لا توجد مشاريع مسجلة حالياً</p>
                  <p className="text-xs text-gray-400 mt-2">ابدأ رحلة النجاح بإضافة مشروعك الأول من الزر أعلاه</p>
              </div>
          ) : (
              // رسم البطاقات
              projects.map(p => (
                  <div key={p.id} className="relative group">
                      {/* البطاقة قابلة للضغط */}
                      <ProjectCard project={p} onClick={() => handleCardClick(p.id)} />
                      
                      {/* زر الحذف السريع (يظهر عند تمرير الماوس) */}
                      <button 
                        onClick={(e) => { e.stopPropagation(); deleteProject(p.id); }} 
                        className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center bg-white/80 text-gray-400 hover:text-red-500 hover:bg-white rounded-lg shadow-sm z-20 opacity-0 group-hover:opacity-100 transition-all duration-200"
                        title="حذف المشروع"
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                  </div>
              ))
          )}
      </div>

      {/* 4. استدعاء نافذة المشروع الجديد (مخفية وتظهر عند الضغط) */}
      {showModal && <NewProjectModal onClose={() => setShowModal(false)} accessToken={accessToken} />}
    </div>
  );
};

export default Dashboard;