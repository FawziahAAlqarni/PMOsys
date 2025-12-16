import React, { useContext, useState } from 'react';
import { ProjectContext } from '../../context/ProjectContext';

const PMOView = ({ onNavigate }) => {
  const { projects } = useContext(ProjectContext);
  const [selectedProject, setSelectedProject] = useState(null);
  const [filterStage, setFilterStage] = useState('all');

  // فلترة المشاريع حسب المرحلة
  const filteredProjects = filterStage === 'all' 
    ? projects 
    : projects.filter(p => p.stage === Number(filterStage));

  // أسماء المراحل
  const stageNames = {
    1: 'المرحلة الأولى: التأسيس',
    2: 'المرحلة الثانية: التفصيل',
    3: 'المرحلة الثالثة: التخطيط',
    4: 'المرحلة الرابعة: التنفيذ والإغلاق',
    5: 'مغلق'
  };

  // عرض تفاصيل المشروع
  const ProjectDetails = ({ project }) => {
    if (!project) return null;

    return (
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-2xl p-8 max-w-7xl mx-auto">
        {/* Header مع خلفية متدرجة */}
        <div className="bg-gradient-to-r from-primary-600 via-primary-800 to-[#003d1f] rounded-t-xl -mx-8 -mt-8 px-8 py-6 mb-8 text-white">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg">
                  <i className="fa-solid fa-folder-open text-2xl"></i>
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-1">{project.name}</h2>
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
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-primary-600 bg-opacity-10 p-2 rounded-lg">
              <i className="fa-solid fa-info-circle text-primary-600 text-xl"></i>
            </div>
            <h3 className="text-xl font-bold text-primary-900">المعلومات الأساسية</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-primary-50 to-green-50 border-l-4 border-primary-600 p-4 rounded-lg hover:shadow-md transition">
              <div className="flex items-center gap-2 text-primary-800 font-semibold mb-2">
                <i className="fa-solid fa-briefcase"></i>
                <span>المحفظة</span>
              </div>
              <p className="text-gray-900 font-medium">{project.data?.projectInfo?.portfolio || 'غير محدد'}</p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border-l-4 border-secondary-gold p-4 rounded-lg hover:shadow-md transition">
              <div className="flex items-center gap-2 text-yellow-800 font-semibold mb-2">
                <i className="fa-solid fa-layer-group"></i>
                <span>البرنامج</span>
              </div>
              <p className="text-gray-900 font-medium text-sm">{project.data?.projectInfo?.program || 'غير محدد'}</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 border-l-4 border-emerald-600 p-4 rounded-lg hover:shadow-md transition">
              <div className="flex items-center gap-2 text-emerald-700 font-semibold mb-2">
                <i className="fa-solid fa-dollar-sign"></i>
                <span>الميزانية المقدرة</span>
              </div>
              <p className="text-gray-900 font-bold text-lg">{Number(project.estimatedBudget || 0).toLocaleString()} <span className="text-sm font-normal">ريال</span></p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-l-4 border-purple-500 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-purple-700 font-semibold mb-2">
                <i className="fa-solid fa-clock"></i>
                <span>المدة</span>
              </div>
              <p className="text-gray-900 font-bold text-lg">{project.durationInWeeks || 0} <span className="text-sm font-normal">أسبوع</span></p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-l-4 border-orange-500 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-orange-700 font-semibold mb-2">
                <i className="fa-solid fa-calendar-plus"></i>
                <span>تاريخ البداية</span>
              </div>
              <p className="text-gray-900 font-medium">{project.data?.dates?.projectStartDate || 'غير محدد'}</p>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 border-l-4 border-red-500 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-red-700 font-semibold mb-2">
                <i className="fa-solid fa-calendar-check"></i>
                <span>تاريخ النهاية</span>
              </div>
              <p className="text-gray-900 font-medium">{project.data?.dates?.projectEndDate || 'غير محدد'}</p>
            </div>
          </div>
        </div>

        {/* فريق العمل */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-purple-100 p-2 rounded-lg">
              <i className="fa-solid fa-users text-purple-600 text-xl"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-800">فريق العمل</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border-2 border-gray-200 rounded-xl p-5 hover:shadow-lg transition">
              <div className="flex items-start gap-3">
                <div className="bg-cyan-100 p-3 rounded-full">
                  <i className="fa-solid fa-user-tie text-cyan-600 text-xl"></i>
                </div>
                <div className="flex-1">
                  <h4 className="text-gray-500 text-sm font-semibold mb-1">مدير المشروع</h4>
                  <p className="text-gray-900 font-medium">{project.data?.team?.projectManagerEmail || 'غير محدد'}</p>
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
        {(project.data?.strategy?.objective || project.data?.strategy?.result) && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-amber-100 p-2 rounded-lg">
                <i className="fa-solid fa-bullseye text-amber-600 text-xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800">الاستراتيجية</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.data?.strategy?.objective && (
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border-l-4 border-amber-500 rounded-xl p-5">
                  <div className="flex items-center gap-2 text-amber-700 font-semibold mb-3">
                    <i className="fa-solid fa-target"></i>
                    <span>الهدف الاستراتيجي</span>
                  </div>
                  <p className="text-gray-900 leading-relaxed">{project.data.strategy.objective}</p>
                </div>
              )}
              {project.data?.strategy?.result && (
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 border-l-4 border-emerald-500 rounded-xl p-5">
                  <div className="flex items-center gap-2 text-emerald-700 font-semibold mb-3">
                    <i className="fa-solid fa-trophy"></i>
                    <span>النتيجة الاستراتيجية</span>
                  </div>
                  <p className="text-gray-900 leading-relaxed">{project.data.strategy.result}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* المخاطر */}
        {project.risks && project.risks.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-red-100 p-2 rounded-lg">
                <i className="fa-solid fa-triangle-exclamation text-red-600 text-xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800">المخاطر</h3>
              <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold">
                {project.risks.length} مخاطر
              </span>
            </div>
            <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                      <th className="px-4 py-3 text-right text-sm font-bold text-gray-700 border-b-2 border-gray-200">العنوان</th>
                      <th className="px-4 py-3 text-right text-sm font-bold text-gray-700 border-b-2 border-gray-200">النوع</th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-gray-700 border-b-2 border-gray-200">الاحتمالية</th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-gray-700 border-b-2 border-gray-200">التأثير</th>
                      <th className="px-4 py-3 text-right text-sm font-bold text-gray-700 border-b-2 border-gray-200">الحالة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {project.risks.map((risk, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition border-b border-gray-100">
                        <td className="px-4 py-3 font-medium text-gray-900">{risk.title || 'غير محدد'}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                            risk.category === 'threat' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                          }`}>
                            {risk.category === 'threat' ? (
                              <><i className="fa-solid fa-exclamation-triangle"></i> تهديد</>
                            ) : (
                              <><i className="fa-solid fa-lightbulb"></i> فرصة</>
                            )}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">
                            {risk.prob || '-'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-bold">
                            {risk.impact || '-'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
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
          </div>
        )}

        {/* حالة الموافقات */}
        {project.approvals && Object.keys(project.approvals).length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-emerald-100 p-2 rounded-lg">
                <i className="fa-solid fa-check-circle text-emerald-600 text-xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800">حالة الموافقات</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                  <div key={role} className={`${info.bg} border-2 ${info.border} rounded-xl p-5 hover:shadow-lg transition`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-sm font-bold text-gray-700">{roleNames[role] || role}</div>
                      <div className={`${info.iconBg} p-2 rounded-lg`}>
                        <i className={`fa-solid ${info.icon} ${info.iconColor}`}></i>
                      </div>
                    </div>
                    <div className={`text-xl font-bold ${info.textColor}`}>
                      {info.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fade-in p-6">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-xl p-6 shadow-lg">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <i className="fa-solid fa-chart-line"></i>
            واجهة PMO - عرض المشاريع
          </h1>
          <p className="text-green-100">عرض تفصيلي لجميع بيانات المشاريع (للقراءة فقط)</p>
        </div>
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-2 bg-white text-primary-800 hover:bg-secondary-gold hover:text-primary-900 px-5 py-2.5 rounded-lg transition font-bold shadow-md"
        >
          <i className="fa-solid fa-arrow-left"></i>
          العودة للرئيسية
        </button>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
        <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl shadow-lg p-5 text-center text-white hover:scale-105 transition">
          <div className="text-4xl font-bold">{projects.length}</div>
          <div className="text-sm mt-2 text-green-100">إجمالي المشاريع</div>
        </div>
        <div className="bg-white rounded-xl border-2 border-primary-600 shadow p-4 text-center hover:shadow-lg transition">
          <div className="text-3xl font-bold text-primary-600">{projects.filter(p => p.stage === 1).length}</div>
          <div className="text-sm text-gray-600 mt-1">المرحلة 1</div>
        </div>
        <div className="bg-white rounded-xl border-2 border-emerald-500 shadow p-4 text-center hover:shadow-lg transition">
          <div className="text-3xl font-bold text-emerald-600">{projects.filter(p => p.stage === 2).length}</div>
          <div className="text-sm text-gray-600 mt-1">المرحلة 2</div>
        </div>
        <div className="bg-white rounded-xl border-2 border-amber-500 shadow p-4 text-center hover:shadow-lg transition">
          <div className="text-3xl font-bold text-amber-600">{projects.filter(p => p.stage === 3).length}</div>
          <div className="text-sm text-gray-600 mt-1">المرحلة 3</div>
        </div>
        <div className="bg-white rounded-xl border-2 border-green-600 shadow p-4 text-center hover:shadow-lg transition">
          <div className="text-3xl font-bold text-green-700">{projects.filter(p => p.stage === 4).length}</div>
          <div className="text-sm text-gray-600 mt-1">المرحلة 4</div>
        </div>
        <div className="bg-gradient-to-br from-amber-100 to-yellow-100 rounded-xl border-2 border-secondary-gold shadow p-4 text-center hover:shadow-lg transition">
          <div className="text-3xl font-bold text-yellow-800">{projects.filter(p => p.stage === 5).length}</div>
          <div className="text-sm text-gray-700 mt-1 font-semibold">المرحلة 5</div>
        </div>
      </div>

      {/* فلتر المراحل */}
      <div className="bg-gradient-to-r from-gray-50 to-green-50 rounded-xl shadow-md p-5 mb-6 border border-primary-200">
        <div className="flex items-center gap-2 mb-3">
          <i className="fa-solid fa-filter text-primary-600"></i>
          <h3 className="font-bold text-primary-900">تصفية حسب المرحلة</h3>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilterStage('all')}
            className={`px-5 py-2.5 rounded-lg font-bold transition shadow-sm ${
              filterStage === 'all' ? 'bg-primary-600 text-white shadow-lg scale-105' : 'bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-800 border border-gray-200'
            }`}
          >
            <i className="fa-solid fa-list mr-1"></i>
            الكل ({projects.length})
          </button>
          {[1, 2, 3, 4, 5].map(stage => (
            <button
              key={stage}
              onClick={() => setFilterStage(stage.toString())}
              className={`px-5 py-2.5 rounded-lg font-bold transition shadow-sm ${
                filterStage === stage.toString() ? 'bg-secondary-gold text-primary-900 shadow-lg scale-105' : 'bg-white text-gray-700 hover:bg-amber-50 hover:text-amber-900 border border-gray-200'
              }`}
            >
              {stageNames[stage]} ({projects.filter(p => p.stage === stage).length})
            </button>
          ))}
        </div>
      </div>

      {/* عرض التفاصيل أو القائمة */}
      {selectedProject ? (
        <ProjectDetails project={selectedProject} />
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-primary-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
                <tr>
                  <th className="px-4 py-4 text-right text-sm font-bold">#</th>
                  <th className="px-4 py-4 text-right text-sm font-bold">اسم المشروع</th>
                  <th className="px-4 py-4 text-right text-sm font-bold">المحفظة</th>
                  <th className="px-4 py-4 text-right text-sm font-bold">البرنامج</th>
                  <th className="px-4 py-4 text-center text-sm font-bold">المرحلة</th>
                  <th className="px-4 py-4 text-center text-sm font-bold">الميزانية</th>
                  <th className="px-4 py-4 text-center text-sm font-bold">المدة</th>
                  <th className="px-4 py-4 text-center text-sm font-bold">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProjects.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-4 py-8 text-center text-gray-500">
                      لا توجد مشاريع
                    </td>
                  </tr>
                ) : (
                  filteredProjects.map((project, idx) => (
                    <tr key={project.id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3 text-sm text-gray-600">{idx + 1}</td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-900">{project.name}</div>
                        <div className="text-xs text-gray-500">ID: {project.id}</div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {project.data?.projectInfo?.portfolio || '-'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {project.data?.projectInfo?.program?.substring(0, 30) || '-'}
                        {project.data?.projectInfo?.program?.length > 30 && '...'}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-secondary-gold text-primary-900 shadow-sm">
                          المرحلة {project.stage}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center text-sm font-semibold text-gray-900">
                        {Number(project.estimatedBudget || 0).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-center text-sm font-semibold text-gray-900">
                        {project.durationInWeeks || 0} أسبوع
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="bg-primary-600 hover:bg-primary-800 text-white px-4 py-2 rounded-lg font-bold text-sm transition shadow-sm hover:shadow-md"
                        >
                          <i className="fa-solid fa-eye ml-1"></i>
                          عرض التفاصيل
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PMOView;
