import React, { useContext, useState } from 'react';
import { ProjectContext } from '../../context/ProjectContext';
import ProjectCard from '../Dashboard/ProjectCard';
import DashboardStats from '../Dashboard/DashboardStats';

const PMOView = ({ onNavigate }) => {
  const { projects } = useContext(ProjectContext);
  const [selectedProject, setSelectedProject] = useState(null);
  const [filterStage, setFilterStage] = useState('all');
  const [expandedStage, setExpandedStage] = useState(null);

  const stageNames = {
    1: 'المرحلة الأولى: التأسيس',
    2: 'المرحلة الثانية: التخطيط',
    3: 'المرحلة الثالثة: التنفيذ',
    4: 'المرحلة الرابعة: الإغلاق',
    5: 'المرحلة الخامسة: ما بعد التسليم'
  };

  // فلترة المشاريع حسب المرحلة
  const filteredProjects = filterStage === 'all' 
    ? projects 
    : projects.filter(p => p.stage === Number(filterStage));

  // عرض تفاصيل المشروع (نفس فورم التسجيل ولكن للقراءة فقط)
  const ProjectDetails = ({ project }) => {
    if (!project) return null;

    // تهيئة بيانات المراحل
    const gate2Data = project.gate2Data || { scope: {}, procurement: {}, assumptions: [], changeCard: {} };
    const gate3Data = project.gate3Data || { timeline: [], charter: {} };
    const gate4Data = project.gate4Data || { timeline: [], lessons: [] };
    const gate5Data = project.gate5Data || { lessons: [], activationPlan: [] };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm fade-in">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl border-t-8 border-secondary-gold flex flex-col max-h-[90vh]">
          
          {/* Header */}
          <div className="flex justify-between items-center p-5 border-b bg-gray-50 rounded-t-xl">
            <h2 className="text-xl font-bold text-primary-900 flex items-center gap-2">
              <i className="fa-solid fa-folder-open text-secondary-gold"></i>
              عرض بيانات المشروع: {project.name}
            </h2>
            <button 
              onClick={() => setSelectedProject(null)} 
              className="text-gray-400 hover:text-red-600 transition"
            >
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
          </div>

          {/* Body */}
          <div className="overflow-y-auto p-6 custom-scrollbar flex-1">
            <div className="space-y-6">
              
              {/* 1. المعلومات الأساسية */}
              <div className="bg-primary-50 p-5 rounded-xl border border-primary-100">
                <h3 className="text-primary-800 font-bold mb-4 border-b border-primary-200 pb-2 flex items-center gap-2">
                  <i className="fa-solid fa-file-signature text-secondary-gold"></i> المعلومات الأساسية والنطاق
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="col-span-3">
                    <label className="block text-xs font-bold text-primary-900 mb-1">اسم المشروع</label>
                    <div className="w-full p-2 border rounded-lg text-sm bg-white">{project.name || '-'}</div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">البرنامج</label>
                    <div className="w-full p-2 border rounded-lg text-sm bg-white">{project.data?.projectInfo?.program || '-'}</div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">الميزانية المقدرة</label>
                    <div className="w-full p-2 border rounded-lg text-sm bg-white">{Number(project.estimatedBudget || 0).toLocaleString()} ريال</div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">المحفظة</label>
                    <div className="w-full p-2 border rounded-lg text-sm bg-white">{project.data?.projectInfo?.portfolio || '-'}</div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">تاريخ البداية</label>
                    <div className="w-full p-2 border rounded-lg text-sm bg-white">{project.data?.dates?.projectStartDate || '-'}</div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">تاريخ النهاية</label>
                    <div className="w-full p-2 border rounded-lg text-sm bg-white">{project.data?.dates?.projectEndDate || '-'}</div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">المدة (أسابيع)</label>
                    <div className="w-full p-2 border rounded-lg text-sm bg-white">{project.durationInWeeks || 0}</div>
                  </div>
                  <div className="col-span-3">
                    <label className="block text-xs font-bold mb-1">الوصف</label>
                    <div className="w-full p-2 border rounded-lg text-sm bg-white min-h-[60px]">{project.description || 'غير محدد'}</div>
                  </div>
                </div>
              </div>

              {/* 2. فريق العمل */}
              <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                <h3 className="text-blue-800 font-bold mb-4 border-b border-blue-200 pb-2 flex items-center gap-2">
                  <i className="fa-solid fa-users text-secondary-gold"></i> فريق العمل
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold mb-1">مدير المشروع</label>
                    <div className="w-full p-2 border rounded-lg text-sm bg-white">{project.data?.team?.projectManagerEmail || '-'}</div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">صاحب المشروع</label>
                    <div className="w-full p-2 border rounded-lg text-sm bg-white">{project.data?.team?.projectOwnerEmail || '-'}</div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">مدير البرنامج</label>
                    <div className="w-full p-2 border rounded-lg text-sm bg-white">{project.data?.team?.programManagerEmail || '-'}</div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">مدير المحفظة</label>
                    <div className="w-full p-2 border rounded-lg text-sm bg-white">{project.data?.team?.portfolioManagerEmail || '-'}</div>
                  </div>
                </div>
              </div>

              {/* 3. الاستراتيجية */}
              <div className="bg-amber-50 p-5 rounded-xl border border-amber-100">
                <h3 className="text-amber-800 font-bold mb-4 border-b border-amber-200 pb-2 flex items-center gap-2">
                  <i className="fa-solid fa-bullseye text-secondary-gold"></i> الاستراتيجية والأهداف
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold mb-1">الهدف الاستراتيجي</label>
                    <div className="w-full p-2 border rounded-lg text-sm bg-white min-h-[80px]">{project.data?.strategy?.objective || 'غير محدد'}</div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">النتيجة الاستراتيجية</label>
                    <div className="w-full p-2 border rounded-lg text-sm bg-white min-h-[80px]">{project.data?.strategy?.result || 'غير محدد'}</div>
                  </div>
                </div>
              </div>

              {/* 4. المخاطر */}
              <div className="bg-red-50 p-5 rounded-xl border border-red-100">
                <h3 className="text-red-800 font-bold mb-4 border-b border-red-200 pb-2 flex items-center gap-2">
                  <i className="fa-solid fa-triangle-exclamation text-secondary-gold"></i> المخاطر المسجلة ({project.risks?.length || 0})
                </h3>
                {project.risks && project.risks.length > 0 ? (
                  <div className="space-y-2">
                    {project.risks.map((risk, idx) => (
                      <div key={idx} className="bg-white p-3 rounded-lg border border-gray-200">
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-bold text-sm">{risk.title}</div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            risk.category === 'threat' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                          }`}>
                            {risk.category === 'threat' ? 'تهديد' : 'فرصة'}
                          </span>
                        </div>
                        <div className="grid grid-cols-4 gap-2 text-xs">
                          <div><span className="text-gray-500">الاحتمالية:</span> <span className="font-bold">{risk.prob}</span></div>
                          <div><span className="text-gray-500">التأثير:</span> <span className="font-bold">{risk.impact}</span></div>
                          <div><span className="text-gray-500">الاستجابة:</span> <span className="font-bold">{risk.responseType}</span></div>
                          <div><span className="text-gray-500">الحالة:</span> <span className="font-bold">{risk.status}</span></div>
                        </div>
                        {risk.mitigationPlan && (
                          <div className="mt-2 text-xs text-gray-600">
                            <span className="font-bold">خطة التخفيف:</span> {risk.mitigationPlan}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 text-sm py-4">لا توجد مخاطر مسجلة</div>
                )}
              </div>

              {/* 5. حالة الموافقات */}
              <div className="bg-green-50 p-5 rounded-xl border border-green-100">
                <h3 className="text-green-800 font-bold mb-4 border-b border-green-200 pb-2 flex items-center gap-2">
                  <i className="fa-solid fa-check-circle text-secondary-gold"></i> حالة الموافقات
                </h3>
                {project.approvals && Object.keys(project.approvals).length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {Object.entries(project.approvals).map(([role, status]) => {
                      const roleNames = {
                        progMgr: 'مدير البرنامج',
                        planning: 'التخطيط',
                        portfolio: 'المحفظة',
                        governance: 'الحوكمة'
                      };
                      return (
                        <div key={role} className={`p-3 rounded-lg text-center ${
                          status === 'approved' ? 'bg-green-100 border-2 border-green-500' :
                          status === 'rejected' ? 'bg-red-100 border-2 border-red-500' :
                          'bg-yellow-100 border-2 border-yellow-500'
                        }`}>
                          <div className="text-xs font-bold mb-1">{roleNames[role] || role}</div>
                          <div className="text-sm font-bold">
                            {status === 'approved' ? '✓ موافق' :
                             status === 'rejected' ? '✗ مرفوض' : '⏳ معلق'}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 text-sm py-4">لا توجد موافقات بعد</div>
                )}
              </div>

              {/* بيانات المراحل المختلفة */}
              <div className="space-y-4">
                {/* أزرار عرض المراحل */}
                <div className="flex gap-2 flex-wrap justify-center border-t pt-4">
                  {[1, 2, 3, 4, 5].map(stage => {
                    if (project.stage < stage) return null; // لا تعرض مراحل لم يصل لها المشروع
                    return (
                      <button
                        key={stage}
                        onClick={() => setExpandedStage(expandedStage === stage ? null : stage)}
                        className={`px-4 py-2 rounded-lg font-bold text-sm transition ${
                          expandedStage === stage
                            ? 'bg-secondary-gold text-primary-900 shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-primary-50'
                        }`}
                      >
                        {stageNames[stage]}
                        <i className={`fa-solid fa-chevron-${expandedStage === stage ? 'up' : 'down'} mr-2`}></i>
                      </button>
                    );
                  })}
                </div>

                {/* عرض بيانات المرحلة الثانية */}
                {expandedStage === 2 && gate2Data && (
                  <div className="bg-purple-50 p-5 rounded-xl border border-purple-100">
                    <h3 className="text-purple-800 font-bold mb-4 border-b border-purple-200 pb-2">
                      <i className="fa-solid fa-clipboard-list text-secondary-gold ml-2"></i>
                      المرحلة الثانية: التخطيط
                    </h3>
                    
                    {/* النطاق */}
                    {gate2Data.scope && (
                      <div className="mb-4 bg-white p-4 rounded-lg">
                        <h4 className="font-bold text-sm mb-3 text-purple-700">النطاق والأهداف</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                          <div>
                            <label className="font-bold text-gray-600">الوصف العام:</label>
                            <p className="text-gray-800 mt-1">{gate2Data.scope.generalDescription || '-'}</p>
                          </div>
                          <div>
                            <label className="font-bold text-gray-600">الهدف المباشر:</label>
                            <p className="text-gray-800 mt-1">{gate2Data.scope.directGoal || '-'}</p>
                          </div>
                          <div>
                            <label className="font-bold text-gray-600">الوضع المستهدف:</label>
                            <p className="text-gray-800 mt-1">{gate2Data.scope.targetState || '-'}</p>
                          </div>
                          <div>
                            <label className="font-bold text-gray-600">الوضع الحالي:</label>
                            <p className="text-gray-800 mt-1">{gate2Data.scope.currentState || '-'}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* المشتريات */}
                    {gate2Data.procurement && gate2Data.procurement.selectedOption && (
                      <div className="mb-4 bg-white p-4 rounded-lg">
                        <h4 className="font-bold text-sm mb-2 text-purple-700">خيار التنفيذ</h4>
                        <p className="text-xs text-gray-800">
                          <span className="font-bold">الخيار المختار:</span> {gate2Data.procurement.selectedOption}
                        </p>
                      </div>
                    )}

                    {/* الافتراضات */}
                    {gate2Data.assumptions && gate2Data.assumptions.length > 0 && (
                      <div className="mb-4 bg-white p-4 rounded-lg">
                        <h4 className="font-bold text-sm mb-2 text-purple-700">الافتراضات ({gate2Data.assumptions.length})</h4>
                        <ul className="list-disc list-inside text-xs text-gray-800 space-y-1">
                          {gate2Data.assumptions.map((assumption, idx) => (
                            <li key={idx}>{assumption.text || assumption}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* عرض بيانات المرحلة الثالثة */}
                {expandedStage === 3 && gate3Data && (
                  <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100">
                    <h3 className="text-indigo-800 font-bold mb-4 border-b border-indigo-200 pb-2">
                      <i className="fa-solid fa-tasks text-secondary-gold ml-2"></i>
                      المرحلة الثالثة: التنفيذ
                    </h3>
                    
                    {/* الجدول الزمني */}
                    {gate3Data.timeline && gate3Data.timeline.length > 0 && (
                      <div className="bg-white p-4 rounded-lg">
                        <h4 className="font-bold text-sm mb-3 text-indigo-700">الجدول الزمني ({gate3Data.timeline.length} مهام)</h4>
                        <div className="space-y-2">
                          {gate3Data.timeline.slice(0, 5).map((task, idx) => (
                            <div key={idx} className="flex justify-between items-center text-xs bg-gray-50 p-2 rounded">
                              <span className="font-bold">{task.task || task.name}</span>
                              <span className="text-gray-600">{task.date || task.deadline}</span>
                            </div>
                          ))}
                          {gate3Data.timeline.length > 5 && (
                            <p className="text-xs text-gray-500 text-center">... و {gate3Data.timeline.length - 5} مهام أخرى</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* عرض بيانات المرحلة الرابعة */}
                {expandedStage === 4 && gate4Data && (
                  <div className="bg-orange-50 p-5 rounded-xl border border-orange-100">
                    <h3 className="text-orange-800 font-bold mb-4 border-b border-orange-200 pb-2">
                      <i className="fa-solid fa-flag-checkered text-secondary-gold ml-2"></i>
                      المرحلة الرابعة: الإغلاق
                    </h3>
                    
                    {/* الدروس المستفادة */}
                    {gate4Data.lessons && gate4Data.lessons.length > 0 && (
                      <div className="bg-white p-4 rounded-lg">
                        <h4 className="font-bold text-sm mb-3 text-orange-700">الدروس المستفادة ({gate4Data.lessons.length})</h4>
                        <div className="space-y-2">
                          {gate4Data.lessons.map((lesson, idx) => (
                            <div key={idx} className="text-xs bg-gray-50 p-3 rounded">
                              <p className="font-bold text-gray-800">{lesson.title || lesson.lesson}</p>
                              <p className="text-gray-600 mt-1">{lesson.description || lesson.details}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* عرض بيانات المرحلة الخامسة */}
                {expandedStage === 5 && gate5Data && (
                  <div className="bg-teal-50 p-5 rounded-xl border border-teal-100">
                    <h3 className="text-teal-800 font-bold mb-4 border-b border-teal-200 pb-2">
                      <i className="fa-solid fa-rocket text-secondary-gold ml-2"></i>
                      المرحلة الخامسة: ما بعد التسليم
                    </h3>
                    
                    {/* خطة التفعيل */}
                    {gate5Data.activationPlan && gate5Data.activationPlan.length > 0 && (
                      <div className="bg-white p-4 rounded-lg mb-4">
                        <h4 className="font-bold text-sm mb-3 text-teal-700">خطة التفعيل ({gate5Data.activationPlan.length} عناصر)</h4>
                        <div className="space-y-2">
                          {gate5Data.activationPlan.map((item, idx) => (
                            <div key={idx} className="text-xs bg-gray-50 p-2 rounded">
                              <p className="font-bold">{item.activity || item.title}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* الدروس المستفادة النهائية */}
                    {gate5Data.lessons && gate5Data.lessons.length > 0 && (
                      <div className="bg-white p-4 rounded-lg">
                        <h4 className="font-bold text-sm mb-3 text-teal-700">الدروس المستفادة النهائية ({gate5Data.lessons.length})</h4>
                        <div className="space-y-2">
                          {gate5Data.lessons.map((lesson, idx) => (
                            <div key={idx} className="text-xs bg-gray-50 p-2 rounded">
                              {lesson.lesson || lesson.title || lesson}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 p-5 border-t bg-gray-50">
            <button
              onClick={() => setSelectedProject(null)}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition font-bold"
            >
              إغلاق
            </button>
          </div>

        </div>
      </div>
    );
  };

  // فتح المشروع عند الضغط
  const handleCardClick = (project) => {
    setSelectedProject(project);
  };

  return (
    <div className="fade-in">
      {/* Modal لعرض التفاصيل */}
      {selectedProject && <ProjectDetails project={selectedProject} />}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-primary-900 border-r-4 border-secondary-gold pr-3">
              واجهة PMO - عرض المشاريع
            </h2>
            <span className="bg-primary-50 text-primary-600 text-xs px-2 py-1 rounded-full font-bold">
              {filteredProjects.length} مشاريع
            </span>
          </div>
        </div>
        <button
          onClick={() => onNavigate('dashboard')}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition flex items-center gap-2"
        >
          <i className="fa-solid fa-arrow-left"></i>
          العودة للرئيسية
        </button>
      </div>

      {/* الإحصائيات */}
      <DashboardStats projects={projects} />

      {/* فلتر المراحل */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6 border-l-4 border-primary-600">
        <div className="flex items-center gap-2 mb-3">
          <i className="fa-solid fa-filter text-primary-600"></i>
          <h3 className="font-bold text-primary-900">تصفية حسب المرحلة</h3>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilterStage('all')}
            className={`px-4 py-2 rounded-lg font-bold transition ${
              filterStage === 'all' 
                ? 'bg-primary-600 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-700 hover:bg-primary-50 hover:text-primary-800'
            }`}
          >
            الكل ({projects.length})
          </button>
          {[1, 2, 3, 4, 5].map(stage => (
            <button
              key={stage}
              onClick={() => setFilterStage(stage.toString())}
              className={`px-4 py-2 rounded-lg font-bold transition ${
                filterStage === stage.toString() 
                  ? 'bg-secondary-gold text-primary-900 shadow-lg' 
                  : 'bg-gray-100 text-gray-700 hover:bg-amber-50'
              }`}
            >
              المرحلة {stage} ({projects.filter(p => p.stage === stage).length})
            </button>
          ))}
        </div>
      </div>

      {/* قائمة المشاريع */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.length === 0 ? (
          <div className="col-span-full text-center py-20 bg-white rounded-xl shadow">
            <i className="fa-solid fa-folder-open text-6xl text-gray-300 mb-4"></i>
            <p className="text-gray-500 text-lg">لا توجد مشاريع</p>
          </div>
        ) : (
          filteredProjects.map(project => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onClick={handleCardClick}
              needsMyApproval={false}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default PMOView;
