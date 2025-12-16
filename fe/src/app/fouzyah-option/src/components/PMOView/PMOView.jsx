import React, { useContext, useState } from 'react';
import { ProjectContext } from '../../context/ProjectContext';
import ProjectCard from '../Dashboard/ProjectCard';
import DashboardStats from '../Dashboard/DashboardStats';

const PMOView = ({ onNavigate }) => {
  const { projects } = useContext(ProjectContext);
  const [selectedProject, setSelectedProject] = useState(null);
  const [filterStage, setFilterStage] = useState('all');

  // فلترة المشاريع حسب المرحلة
  const filteredProjects = filterStage === 'all' 
    ? projects 
    : projects.filter(p => p.stage === Number(filterStage));

  // عرض تفاصيل المشروع (نفس فورم التسجيل ولكن للقراءة فقط)
  const ProjectDetails = ({ project }) => {
    if (!project) return null;

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
        {/* Header مع خلفية متدرجة */}
        <div className="bg-gradient-to-r from-primary-600 via-primary-800 to-[#003d1f] rounded-t-lg -mx-4 -mt-4 px-4 py-3 mb-4 text-white">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                  <i className="fa-solid fa-folder-open text-lg"></i>
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-1">{project.name}</h2>
                  <div className="flex gap-3 text-sm opacity-90">
                    <span className="flex items-center gap-1">
                      <i className="fa-solid fa-hashtag"></i>
                      {project.id}
                    </span>
                    <span className="flex items-center gap-1">
                      <i className="fa-solid fa-calendar"></i>
                      تاريخ الإنشاء: {new Date(project.created_at || Date.now()).toLocaleDateString('ar-SA')}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="bg-secondary-gold text-primary-900 px-4 py-1.5 rounded-full font-bold text-sm shadow-md">
                  {stageNames[project.stage] || 'غير محدد'}
                </span>
                <span className={`px-4 py-1.5 rounded-full font-bold text-sm shadow-md ${
                  project.stageStatus === 'approved' ? 'bg-green-500 text-white' :
                  project.stageStatus === 'rejected' ? 'bg-red-500 text-white' :
                  'bg-yellow-400 text-yellow-900'
                }`}>
                  {project.stageStatus === 'approved' ? '✓ معتمد' :
                   project.stageStatus === 'rejected' ? '✕ مرفوض' : '⏳ قيد المراجعة'}
                </span>
              </div>
            </div>
            <button
              onClick={() => setSelectedProject(null)}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center transition"
            >
              <i className="fa-solid fa-times text-xl"></i>
            </button>
          </div>
        </div>

        {/* معلومات المشروع الأساسية */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-primary-600 bg-opacity-10 p-1.5 rounded-lg">
              <i className="fa-solid fa-info-circle text-primary-600 text-sm"></i>
            </div>
            <h3 className="text-base font-bold text-primary-900">المعلومات الأساسية</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="bg-gradient-to-br from-primary-50 to-green-50 border-l-4 border-primary-600 p-2 rounded-lg hover:shadow-md transition">
              <div className="flex items-center gap-1 text-primary-800 font-semibold mb-1 text-xs">
                <i className="fa-solid fa-briefcase"></i>
                <span>المحفظة</span>
              </div>
              <p className="text-gray-900 font-medium text-sm">{project.data?.projectInfo?.portfolio || 'غير محدد'}</p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border-l-4 border-secondary-gold p-2 rounded-lg hover:shadow-md transition">
              <div className="flex items-center gap-1 text-yellow-800 font-semibold mb-1 text-xs">
                <i className="fa-solid fa-layer-group"></i>
                <span>البرنامج</span>
              </div>
              <p className="text-gray-900 font-medium text-sm">{project.data?.projectInfo?.program || 'غير محدد'}</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 border-l-4 border-emerald-600 p-2 rounded-lg hover:shadow-md transition">
              <div className="flex items-center gap-1 text-emerald-700 font-semibold mb-1 text-xs">
                <i className="fa-solid fa-dollar-sign"></i>
                <span>الميزانية المقدرة</span>
              </div>
              <p className="text-gray-900 font-bold text-sm">{Number(project.estimatedBudget || 0).toLocaleString()} <span className="text-xs font-normal">ريال</span></p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-l-4 border-purple-500 p-2 rounded-lg">
              <div className="flex items-center gap-1 text-purple-700 font-semibold mb-1 text-xs">
                <i className="fa-solid fa-clock"></i>
                <span>المدة</span>
              </div>
              <p className="text-gray-900 font-bold text-sm">{project.durationInWeeks || 0} <span className="text-xs font-normal">أسبوع</span></p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-l-4 border-orange-500 p-2 rounded-lg">
              <div className="flex items-center gap-1 text-orange-700 font-semibold mb-1 text-xs">
                <i className="fa-solid fa-calendar-plus"></i>
                <span>تاريخ البداية</span>
              </div>
              <p className="text-gray-900 font-medium text-sm">{project.data?.dates?.projectStartDate || 'غير محدد'}</p>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 border-l-4 border-red-500 p-2 rounded-lg">
              <div className="flex items-center gap-1 text-red-700 font-semibold mb-1 text-xs">
                <i className="fa-solid fa-calendar-check"></i>
                <span>تاريخ النهاية</span>
              </div>
              <p className="text-gray-900 font-medium text-sm">{project.data?.dates?.projectEndDate || 'غير محدد'}</p>
            </div>
          </div>
        </div>

        {/* فريق العمل */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-purple-100 p-1.5 rounded-lg">
              <i className="fa-solid fa-users text-purple-600 text-sm"></i>
            </div>
            <h3 className="text-base font-bold text-gray-800">فريق العمل</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="bg-white border border-gray-200 rounded-lg p-2 hover:shadow-md transition">
              <div className="flex items-start gap-2">
                <div className="bg-cyan-100 p-1.5 rounded-full">
                  <i className="fa-solid fa-user-tie text-cyan-600 text-xs"></i>
                </div>
                <div className="flex-1">
                  <h4 className="text-gray-500 text-xs font-semibold mb-0.5">مدير المشروع</h4>
                  <p className="text-gray-900 font-medium text-xs">{project.data?.team?.projectManagerEmail || 'غير محدد'}</p>
                </div>
              </div>
            </div>
            <div className="bg-white border-2 border-gray-200 rounded-xl p-5 hover:shadow-lg transition">
              <div className="flex items-start gap-3">
                <div className="bg-indigo-100 p-3 rounded-full">
                  <i className="fa-solid fa-user-gear text-indigo-600 text-xl"></i>
                </div>
                <div className="flex-1">
                  <h4 className="text-gray-500 text-sm font-semibold mb-1">مدير البرنامج</h4>
                  <p className="text-gray-900 font-medium">{project.data?.team?.programManagerEmail || 'غير محدد'}</p>
                </div>
              </div>
            </div>
            <div className="bg-white border-2 border-gray-200 rounded-xl p-5 hover:shadow-lg transition">
              <div className="flex items-start gap-3">
                <div className="bg-purple-100 p-3 rounded-full">
                  <i className="fa-solid fa-briefcase text-purple-600 text-xl"></i>
                </div>
                <div className="flex-1">
                  <h4 className="text-gray-500 text-sm font-semibold mb-1">مدير المحفظة</h4>
                  <p className="text-gray-900 font-medium">{project.data?.team?.portfolioManagerEmail || 'غير محدد'}</p>
                </div>
              </div>
            </div>
            <div className="bg-white border-2 border-gray-200 rounded-xl p-5 hover:shadow-lg transition">
              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-3 rounded-full">
                  <i className="fa-solid fa-crown text-green-600 text-xl"></i>
                </div>
                <div className="flex-1">
                  <h4 className="text-gray-500 text-sm font-semibold mb-1">صاحب المشروع</h4>
                  <p className="text-gray-900 font-medium">{project.data?.team?.projectOwnerEmail || 'غير محدد'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* الاستراتيجية */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-amber-100 p-1.5 rounded-lg">
              <i className="fa-solid fa-bullseye text-amber-600 text-sm"></i>
            </div>
            <h3 className="text-base font-bold text-gray-800">الاستراتيجية</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border-l-4 border-amber-500 rounded-lg p-2">
              <div className="flex items-center gap-1 text-amber-700 font-semibold mb-1 text-xs">
                <i className="fa-solid fa-target"></i>
                <span>الهدف الاستراتيجي</span>
              </div>
              <p className="text-gray-900 text-xs leading-relaxed">{project.data?.strategy?.objective || 'غير محدد'}</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 border-l-4 border-emerald-500 rounded-lg p-2">
              <div className="flex items-center gap-1 text-emerald-700 font-semibold mb-1 text-xs">
                <i className="fa-solid fa-trophy"></i>
                <span>النتيجة الاستراتيجية</span>
              </div>
              <p className="text-gray-900 text-xs leading-relaxed">{project.data?.strategy?.result || 'غير محدد'}</p>
            </div>
          </div>
        </div>

        {/* المخاطر */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-red-100 p-1.5 rounded-lg">
              <i className="fa-solid fa-triangle-exclamation text-red-600 text-sm"></i>
            </div>
            <h3 className="text-base font-bold text-gray-800">المخاطر</h3>
            <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs font-bold">
              {project.risks?.length || 0} مخاطر
            </span>
          </div>
          {project.risks && project.risks.length > 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                      <th className="px-2 py-2 text-right text-xs font-bold text-gray-700 border-b border-gray-200">العنوان</th>
                      <th className="px-2 py-2 text-right text-xs font-bold text-gray-700 border-b border-gray-200">النوع</th>
                      <th className="px-2 py-2 text-center text-xs font-bold text-gray-700 border-b border-gray-200">الاحتمالية</th>
                      <th className="px-2 py-2 text-center text-xs font-bold text-gray-700 border-b border-gray-200">التأثير</th>
                      <th className="px-2 py-2 text-right text-xs font-bold text-gray-700 border-b border-gray-200">الحالة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {project.risks.map((risk, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition border-b border-gray-100">
                        <td className="px-2 py-1.5 font-medium text-gray-900 text-xs">{risk.title || 'غير محدد'}</td>
                        <td className="px-2 py-1.5">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                            risk.category === 'threat' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                          }`}>
                            {risk.category === 'threat' ? 'تهديد' : 'فرصة'}
                          </span>
                        </td>
                        <td className="px-2 py-1.5 text-center">
                          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-bold">
                            {risk.prob || '-'}
                          </span>
                        </td>
                        <td className="px-2 py-1.5 text-center">
                          <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-xs font-bold">
                            {risk.impact || '-'}
                          </span>
                        </td>
                        <td className="px-2 py-1.5">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                            risk.status === 'نشط' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {risk.status || 'نشط'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-3 text-center text-gray-500 text-xs">
              لا توجد مخاطر مسجلة
            </div>
          )}
        </div>

        {/* حالة الموافقات */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-emerald-100 p-1.5 rounded-lg">
              <i className="fa-solid fa-check-circle text-emerald-600 text-sm"></i>
            </div>
            <h3 className="text-base font-bold text-gray-800">حالة الموافقات</h3>
          </div>
          {project.approvals && Object.keys(project.approvals).length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {Object.entries(project.approvals).map(([role, status]) => {
                const roleNames = {
                  progMgr: 'مدير البرنامج',
                  planning: 'التخطيط',
                  portfolio: 'المحفظة',
                  governance: 'الحوكمة'
                };
                const statusInfo = {
                  approved: { 
                    bg: 'bg-gradient-to-br from-green-50 to-emerald-50',
                    border: 'border-green-200',
                    icon: 'fa-check',
                    iconBg: 'bg-green-100',
                    iconColor: 'text-green-600',
                    textColor: 'text-green-800',
                    label: 'موافق'
                  },
                  rejected: { 
                    bg: 'bg-gradient-to-br from-red-50 to-rose-50',
                    border: 'border-red-200',
                    icon: 'fa-times',
                    iconBg: 'bg-red-100',
                    iconColor: 'text-red-600',
                    textColor: 'text-red-800',
                    label: 'مرفوض'
                  },
                  pending: { 
                    bg: 'bg-gradient-to-br from-yellow-50 to-amber-50',
                    border: 'border-yellow-200',
                    icon: 'fa-clock',
                    iconBg: 'bg-yellow-100',
                    iconColor: 'text-yellow-600',
                    textColor: 'text-yellow-800',
                    label: 'معلق'
                  }
                };
                const info = statusInfo[status] || statusInfo['pending'];
                return (
                  <div key={role} className={`${info.bg} border ${info.border} rounded-lg p-2 hover:shadow-md transition`}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-xs font-bold text-gray-700">{roleNames[role] || role}</div>
                      <div className={`${info.iconBg} p-1 rounded-lg`}>
                        <i className={`fa-solid ${info.icon} ${info.iconColor} text-xs`}></i>
                      </div>
                    </div>
                    <div className={`text-sm font-bold ${info.textColor}`}>
                      {info.label}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-3 text-center text-gray-500 text-xs">
              لا توجد بيانات موافقات
            </div>
          )}
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
