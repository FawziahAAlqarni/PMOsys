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
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="border-b pb-4 mb-6 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-primary-900 mb-2">{project.name}</h2>
            <div className="flex gap-4 text-sm text-gray-600">
              <span className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full font-medium">
                {stageNames[project.stage] || 'غير محدد'}
              </span>
              <span>رقم المشروع: #{project.id}</span>
            </div>
          </div>
          <button
            onClick={() => setSelectedProject(null)}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ✕
          </button>
        </div>

        {/* معلومات المشروع الأساسية */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">📋 المعلومات الأساسية</h3>
          <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
            <div>
              <span className="text-gray-600 font-medium">المحفظة:</span>
              <p className="text-gray-900">{project.data?.projectInfo?.portfolio || 'غير محدد'}</p>
            </div>
            <div>
              <span className="text-gray-600 font-medium">البرنامج:</span>
              <p className="text-gray-900">{project.data?.projectInfo?.program || 'غير محدد'}</p>
            </div>
            <div>
              <span className="text-gray-600 font-medium">الميزانية المقدرة:</span>
              <p className="text-gray-900">{Number(project.estimatedBudget || 0).toLocaleString()} ريال</p>
            </div>
            <div>
              <span className="text-gray-600 font-medium">المدة بالأسابيع:</span>
              <p className="text-gray-900">{project.durationInWeeks || 0} أسبوع</p>
            </div>
            <div>
              <span className="text-gray-600 font-medium">تاريخ البداية:</span>
              <p className="text-gray-900">{project.data?.dates?.projectStartDate || 'غير محدد'}</p>
            </div>
            <div>
              <span className="text-gray-600 font-medium">تاريخ النهاية:</span>
              <p className="text-gray-900">{project.data?.dates?.projectEndDate || 'غير محدد'}</p>
            </div>
          </div>
        </div>

        {/* فريق العمل */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">👥 فريق العمل</h3>
          <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
            <div>
              <span className="text-gray-600 font-medium">مدير المشروع:</span>
              <p className="text-gray-900">{project.data?.team?.projectManagerEmail || 'غير محدد'}</p>
            </div>
            <div>
              <span className="text-gray-600 font-medium">مدير البرنامج:</span>
              <p className="text-gray-900">{project.data?.team?.programManagerEmail || 'غير محدد'}</p>
            </div>
            <div>
              <span className="text-gray-600 font-medium">مدير المحفظة:</span>
              <p className="text-gray-900">{project.data?.team?.portfolioManagerEmail || 'غير محدد'}</p>
            </div>
            <div>
              <span className="text-gray-600 font-medium">صاحب المشروع:</span>
              <p className="text-gray-900">{project.data?.team?.projectOwnerEmail || 'غير محدد'}</p>
            </div>
          </div>
        </div>

        {/* الاستراتيجية */}
        {(project.data?.strategy?.objective || project.data?.strategy?.result) && (
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">🎯 الاستراتيجية</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              {project.data?.strategy?.objective && (
                <div>
                  <span className="text-gray-600 font-medium">الهدف الاستراتيجي:</span>
                  <p className="text-gray-900">{project.data.strategy.objective}</p>
                </div>
              )}
              {project.data?.strategy?.result && (
                <div>
                  <span className="text-gray-600 font-medium">النتيجة الاستراتيجية:</span>
                  <p className="text-gray-900">{project.data.strategy.result}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* المخاطر */}
        {project.risks && project.risks.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">⚠️ المخاطر ({project.risks.length})</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-right">العنوان</th>
                    <th className="border p-2 text-right">النوع</th>
                    <th className="border p-2 text-center">الاحتمالية</th>
                    <th className="border p-2 text-center">التأثير</th>
                    <th className="border p-2 text-right">الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {project.risks.map((risk, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="border p-2">{risk.title || 'غير محدد'}</td>
                      <td className="border p-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          risk.category === 'threat' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {risk.category === 'threat' ? 'تهديد' : 'فرصة'}
                        </span>
                      </td>
                      <td className="border p-2 text-center">{risk.prob || '-'}</td>
                      <td className="border p-2 text-center">{risk.impact || '-'}</td>
                      <td className="border p-2">{risk.status || 'نشط'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* حالة الموافقات */}
        {project.approvals && Object.keys(project.approvals).length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">✓ حالة الموافقات</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(project.approvals).map(([role, status]) => {
                const roleNames = {
                  progMgr: 'مدير البرنامج',
                  planning: 'التخطيط',
                  portfolio: 'المحفظة',
                  governance: 'الحوكمة'
                };
                const statusColors = {
                  approved: 'bg-green-100 text-green-800',
                  rejected: 'bg-red-100 text-red-800',
                  pending: 'bg-yellow-100 text-yellow-800'
                };
                return (
                  <div key={role} className={`p-3 rounded-lg text-center ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>
                    <div className="font-medium text-sm">{roleNames[role] || role}</div>
                    <div className="text-xs mt-1">
                      {status === 'approved' ? '✓ موافق' : status === 'rejected' ? '✕ مرفوض' : '⏳ معلق'}
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
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary-900 mb-2">واجهة PMO - عرض المشاريع</h1>
          <p className="text-gray-600">عرض تفصيلي لجميع بيانات المشاريع (للقراءة فقط)</p>
        </div>
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition"
        >
          <i className="fa-solid fa-arrow-left"></i>
          العودة للرئيسية
        </button>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <div className="text-3xl font-bold text-primary-900">{projects.length}</div>
          <div className="text-sm text-gray-600 mt-1">إجمالي المشاريع</div>
        </div>
        <div className="bg-blue-50 rounded-lg shadow p-4 text-center">
          <div className="text-3xl font-bold text-blue-600">{projects.filter(p => p.stage === 1).length}</div>
          <div className="text-sm text-gray-600 mt-1">المرحلة 1</div>
        </div>
        <div className="bg-indigo-50 rounded-lg shadow p-4 text-center">
          <div className="text-3xl font-bold text-indigo-600">{projects.filter(p => p.stage === 2).length}</div>
          <div className="text-sm text-gray-600 mt-1">المرحلة 2</div>
        </div>
        <div className="bg-purple-50 rounded-lg shadow p-4 text-center">
          <div className="text-3xl font-bold text-purple-600">{projects.filter(p => p.stage === 3).length}</div>
          <div className="text-sm text-gray-600 mt-1">المرحلة 3</div>
        </div>
        <div className="bg-pink-50 rounded-lg shadow p-4 text-center">
          <div className="text-3xl font-bold text-pink-600">{projects.filter(p => p.stage === 4).length}</div>
          <div className="text-sm text-gray-600 mt-1">المرحلة 4</div>
        </div>
      </div>

      {/* فلتر المراحل */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilterStage('all')}
            className={`px-4 py-2 rounded-lg transition ${
              filterStage === 'all' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            الكل ({projects.length})
          </button>
          {[1, 2, 3, 4, 5].map(stage => (
            <button
              key={stage}
              onClick={() => setFilterStage(stage.toString())}
              className={`px-4 py-2 rounded-lg transition ${
                filterStage === stage.toString() ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
        <div className="bg-white rounded-lg shadow">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-right text-sm font-bold text-gray-700">#</th>
                  <th className="px-4 py-3 text-right text-sm font-bold text-gray-700">اسم المشروع</th>
                  <th className="px-4 py-3 text-right text-sm font-bold text-gray-700">المحفظة</th>
                  <th className="px-4 py-3 text-right text-sm font-bold text-gray-700">البرنامج</th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-gray-700">المرحلة</th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-gray-700">الميزانية</th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-gray-700">المدة</th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-gray-700">إجراءات</th>
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
                        <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-cyan-100 text-cyan-800">
                          {project.stage}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center text-sm text-gray-900">
                        {Number(project.estimatedBudget || 0).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-center text-sm text-gray-900">
                        {project.durationInWeeks || 0}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="text-primary-600 hover:text-primary-800 font-medium text-sm"
                        >
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
