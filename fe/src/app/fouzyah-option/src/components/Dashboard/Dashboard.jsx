import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // للتنقل بين الصفحات
import { ProjectContext } from '../../context/ProjectContext'; // لجلب البيانات
import ProjectCard from './ProjectCard'; // بطاقة المشروع
import NewProjectModal from '../Modals/NewProjectModal'; // نافذة التسجيل
import { useAccessToken } from '../../hooks/useAccessToken'; // للحصول على Microsoft token

const Dashboard = () => {
  const { projects, deleteProject } = useContext(ProjectContext);
  const [showModal, setShowModal] = useState(false);
  const [filterMode, setFilterMode] = useState('all'); // all, myApprovals, myProjects
  const { accessToken } = useAccessToken();
  const navigate = useNavigate();

  // الحصول على البريد الإلكتروني للمستخدم الحالي
  const currentUserEmail = localStorage.getItem('userEmail') || '';

  // قائمة الأدمن (يرون جميع المشاريع)
  const adminEmails = ['admin@mngdp.com'];
  const isAdmin = adminEmails.some(adminEmail => adminEmail.toLowerCase() === currentUserEmail.toLowerCase());

  // قائمة الأقسام التي ترى جميع المشاريع + فلتر الموافقات
  const departmentEmails = [
    'planning@mngdp.com',      // إدارة التخطيط
    'risk@mngdp.com',          // إدارة الحوكمة/المخاطر
    'pmo@mngdp.com'            // مدير المحفظة
  ];
  const isDepartmentUser = departmentEmails.some(deptEmail => deptEmail.toLowerCase() === currentUserEmail.toLowerCase());

  // دالة لتحديد إذا كان المشروع يحتاج موافقة المستخدم
  const needsMyApproval = (project) => {
    if (!currentUserEmail || !project.currentApproverOrder) return false;
    
    // مسار الموافقات الثابت (يظهر مدير البرنامج دائماً)
    const approvalWorkflow = [
      { id: 'progMgr', order: 1, email: project.data?.team?.programManager || '' },
      { id: 'planning', order: 2, email: 'planning@mngdp.com' },
      { id: 'governance', order: 3, email: 'risk@mngdp.com' },
      { id: 'portfolio', order: 4, email: project.data?.team?.portfolioManagerEmail || 'pmo@mngdp.com' }
    ];

    const currentStep = approvalWorkflow.find(s => s.order === project.currentApproverOrder);
    return currentStep && currentStep.email && currentStep.email.toLowerCase() === currentUserEmail.toLowerCase();
  };

  // دالة لتحديد إذا كان المشروع خاص بالمستخدم (أو له علاقة به)
  const isMyProject = (project) => {
    if (!currentUserEmail) return false;
    
    const team = project.data?.team || {};
    const userEmailLower = currentUserEmail.toLowerCase();
    
    // فحص جميع الأدوار المرتبطة بالمستخدم
    return (
      (team.projectManagerEmail && team.projectManagerEmail.toLowerCase() === userEmailLower) ||
      (team.projectManager && team.projectManager.toLowerCase() === userEmailLower) ||
      (team.programManager && team.programManager.toLowerCase() === userEmailLower) ||
      (team.portfolioManagerEmail && team.portfolioManagerEmail.toLowerCase() === userEmailLower) ||
      (team.projectOwnerEmail && team.projectOwnerEmail.toLowerCase() === userEmailLower) ||
      (project.managerEmail && project.managerEmail.toLowerCase() === userEmailLower)
    );
  };

  // فلترة المشاريع حسب الوضع
  let filteredProjects = projects;
  
  if (isAdmin) {
    // الأدمن يمكنه التبديل بين الأوضاع
    if (filterMode === 'myApprovals') {
      filteredProjects = projects.filter(p => needsMyApproval(p));
    } else if (filterMode === 'myProjects') {
      filteredProjects = projects.filter(p => isMyProject(p));
    }
    // filterMode === 'all' يبقى على جميع المشاريع
  } else if (isDepartmentUser) {
    // الأقسام (التخطيط، الحوكمة، المحفظة) ترى جميع المشاريع أو المشاريع التي تحتاج موافقتهم
    if (filterMode === 'myApprovals') {
      filteredProjects = projects.filter(p => needsMyApproval(p));
    }
    // filterMode === 'all' يبقى على جميع المشاريع
  } else {
    // المستخدم العادي يرى مشاريعه فقط
    filteredProjects = projects.filter(p => isMyProject(p));
  }

  // دالة لفتح المشروع عند الضغط عليه
  const handleCardClick = (projectId) => {
    navigate(`/project/${projectId}/gate`);
  };

  return (
    <div className="fade-in">
      
      {/* شريط العنوان وزر الإضافة */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold text-primary-900 border-r-4 border-secondary-gold pr-3">قائمة المشاريع</h2>
                  <span className="bg-primary-50 text-primary-600 text-xs px-2 py-1 rounded-full font-bold">
                      {filteredProjects.length} مشاريع
                  </span>
                  {!isAdmin && !isDepartmentUser && (
                      <span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full font-bold flex items-center gap-1">
                          <i className="fa-solid fa-user"></i>
                          مشاريعي فقط
                      </span>
                  )}
                  {isDepartmentUser && (
                      <span className="bg-green-50 text-green-600 text-xs px-2 py-1 rounded-full font-bold flex items-center gap-1">
                          <i className="fa-solid fa-building"></i>
                          {currentUserEmail.includes('planning') ? 'إدارة التخطيط' : 
                           currentUserEmail.includes('risk') ? 'إدارة الحوكمة/المخاطر' : 
                           'مدير المحفظة'}
                      </span>
                  )}
              </div>

              {/* أزرار الفلتر - للأدمن والأقسام */}
              {(isAdmin || isDepartmentUser) && (
                  <div className="flex gap-2">
                      <button
                          onClick={() => setFilterMode('all')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                              filterMode === 'all'
                                  ? 'bg-primary-600 text-white'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                      >
                          <i className="fa-solid fa-list ml-1"></i>
                          الكل
                      </button>
                      {isAdmin && (
                          <button
                              onClick={() => setFilterMode('myProjects')}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                                  filterMode === 'myProjects'
                                      ? 'bg-blue-600 text-white'
                                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                          >
                              <i className="fa-solid fa-user ml-1"></i>
                              مشاريعي
                          </button>
                      )}
                      <button
                          onClick={() => setFilterMode('myApprovals')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition relative ${
                              filterMode === 'myApprovals'
                                  ? 'bg-green-600 text-white'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                      >
                          <i className="fa-solid fa-check-circle ml-1"></i>
                          تحتاج موافقتي
                          {projects.filter(p => needsMyApproval(p)).length > 0 && (
                              <span className="absolute -top-1 -left-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                  {projects.filter(p => needsMyApproval(p)).length}
                              </span>
                          )}
                      </button>
                  </div>
              )}
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
          {filteredProjects.length === 0 ? (
              // حالة عدم وجود مشاريع
              <div className="col-span-full py-24 text-center border-2 border-dashed border-gray-300 rounded-3xl bg-white/50">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                    <i className="fa-solid fa-folder-open text-4xl"></i>
                  </div>
                  <p className="text-gray-500 font-bold text-lg">
                      {filterMode === 'myApprovals'
                          ? 'لا توجد مشاريع تحتاج موافقتك حالياً'
                          : !isAdmin && !isDepartmentUser && projects.length > 0 
                          ? 'ليس لديك مشاريع مسجلة حالياً' 
                          : 'لا توجد مشاريع مسجلة حالياً'}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                      {filterMode === 'myApprovals'
                          ? 'جميع المشاريع قد تم اعتمادها'
                          : !isAdmin && !isDepartmentUser && projects.length > 0
                          ? 'المشاريع المعروضة مقتصرة على المشاريع التي أنت مديرها'
                          : 'ابدأ رحلة النجاح بإضافة مشروعك الأول من الزر أعلاه'}
                  </p>
              </div>
          ) : (
              // رسم البطاقات
              filteredProjects.map(p => (
                  <div key={p.id} className="relative group">
                      {/* البطاقة قابلة للضغط */}
                      <ProjectCard project={p} onClick={() => handleCardClick(p.id)} needsMyApproval={needsMyApproval(p)} />
                      
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