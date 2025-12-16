import React, { useContext, useState } from 'react';
import { ProjectContext } from '../../context/ProjectContext';
import ProjectCard from '../Dashboard/ProjectCard';
import RiskRegisterModal from '../Modals/RiskRegisterModal';
import ScopeModal from '../Modals/Gate2/ScopeModal';
import ProcurementModal from '../Modals/Gate2/ProcurementModal';
import AssumptionsModal from '../Modals/Gate2/AssumptionsModal';
import ChangeCardModal from '../Modals/Gate2/ChangeCardModal';
import CharterModal from '../Modals/Gate3/CharterModal';
import TimelineModal from '../Modals/Gate3/TimelineModal';
import LessonsLearnedModal from '../Modals/Gate4/LessonsLearnedModal';
import ActivationPlanModal from '../Modals/Gate4/ActivationPlanModal';

const PMOView = ({ onNavigate }) => {
  const { projects } = useContext(ProjectContext);
  const [selectedProject, setSelectedProject] = useState(null);
  const [filterStage, setFilterStage] = useState('all');
  const [filterPortfolio, setFilterPortfolio] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedStage, setExpandedStage] = useState(null);
  
  // States للمودالات
  const [showRiskModal, setShowRiskModal] = useState(false);
  const [showScopeModal, setShowScopeModal] = useState(false);
  const [showProcurementModal, setShowProcurementModal] = useState(false);
  const [showAssumptionsModal, setShowAssumptionsModal] = useState(false);
  const [showChangeCardModal, setShowChangeCardModal] = useState(false);
  const [showCharterModal, setShowCharterModal] = useState(false);
  const [showTimelineModal, setShowTimelineModal] = useState(false);
  const [showLessonsModal, setShowLessonsModal] = useState(false);
  const [showActivationModal, setShowActivationModal] = useState(false);

  const stageNames = {
    1: 'المرحلة الأولى: التأسيس',
    2: 'المرحلة الثانية: التخطيط',
    3: 'المرحلة الثالثة: التنفيذ',
    4: 'المرحلة الرابعة: الإغلاق',
    5: 'المرحلة الخامسة: التفعيل',
    6: 'مكتمل'
  };

  // استخراج المحافظ الفريدة
  const portfolios = [...new Set(projects.map(p => p.portfolio || p.data?.projectInfo?.portfolio).filter(Boolean))];

  // فلترة المشاريع حسب المرحلة والمحفظة والبحث
  const filteredProjects = projects.filter(p => {
    const matchesStage = filterStage === 'all' || p.stage === Number(filterStage);
    const matchesPortfolio = filterPortfolio === 'all' || 
      p.portfolio === filterPortfolio || 
      p.data?.projectInfo?.portfolio === filterPortfolio;
    const matchesSearch = searchQuery === '' || 
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStage && matchesPortfolio && matchesSearch;
  });

  // عرض تفاصيل المشروع بنفس واجهة GateControl (للقراءة فقط)
  const ProjectDetails = ({ project }) => {
    if (!project) return null;

    // تهيئة بيانات المراحل
    const gate2Data = project.gate2Data || { scope: {}, procurement: {}, assumptions: [], changeCard: {} };
    const gate3Data = project.gate3Data || { timeline: [], charter: {} };
    const gate4Data = project.gate4Data || { timeline: [], lessons: [] };
    const gate5Data = project.gate5Data || { lessons: [], activationPlan: [] };
    const projectRisks = project.risks || [];

    // مكون بطاقة المتطلب (للعرض فقط)
    const RequirementItem = ({ title, status, icon, subText, onClick }) => (
      <div 
        onClick={onClick}
        className={`p-6 rounded-xl border-2 shadow-md hover:shadow-2xl transition-all duration-300 flex justify-between items-center mb-4 group hover:-translate-y-2 hover:scale-[1.02] cursor-pointer ${
          status === 'done' ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
        }`}
      >
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl transition-colors shadow-sm ${
            status === 'done' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500 group-hover:bg-primary-100 group-hover:text-primary-700'
          }`}>
            {status === 'done' ? <i className="fa-solid fa-check"></i> : <i className={`fa-solid ${icon}`}></i>}
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-base">{title}</h4>
            <p className="text-sm text-gray-500 mt-1">{subText || (status === 'done' ? 'تم الإكمال' : 'غير مكتمل')}</p>
          </div>
        </div>
        <button className={`${status === 'done' ? 'bg-green-600' : 'bg-gray-400'} text-white px-8 py-3 rounded-lg text-sm font-bold hover:opacity-90 transition shadow-md hover:shadow-lg`}>
          عرض التفاصيل
        </button>
      </div>
    );

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm fade-in">
        <div className="bg-gray-50 rounded-2xl shadow-2xl w-full max-w-6xl border-t-8 border-secondary-gold flex flex-col max-h-[90vh]">
          
          {/* Header */}
          <div className="flex justify-between items-center p-5 border-b bg-white rounded-t-xl sticky top-0 z-10">
            <div>
              <h2 className="text-xl font-bold text-primary-900 flex items-center gap-2">
                <i className="fa-solid fa-folder-open text-secondary-gold"></i>
                {project.name}
              </h2>
              <div className="flex gap-2 mt-2">
                <span className="bg-secondary-gold text-primary-900 px-3 py-1 rounded-full text-xs font-bold">
                  {stageNames[project.stage]}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
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
              className="text-gray-400 hover:text-red-600 transition"
            >
              <i className="fa-solid fa-xmark text-2xl"></i>
            </button>
          </div>

          {/* مسار الموافقات التفصيلي */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 border-b">
            <h3 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
              <i className="fa-solid fa-route text-blue-600"></i>
              مسار الموافقات
            </h3>
            <div className="flex items-center justify-between gap-2">
              {/* مدير البرنامج */}
              <div className="flex-1">
                <div className={`p-4 rounded-xl border-2 shadow-sm transition-all ${
                  project.approvals?.programManager === 'approved' ? 'bg-green-50 border-green-400' :
                  project.approvals?.programManager === 'rejected' ? 'bg-red-50 border-red-400' :
                  project.approvals?.programManager === 'pending' ? 'bg-yellow-50 border-yellow-400 animate-pulse' :
                  'bg-white border-gray-300'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-gray-700">مدير البرنامج</span>
                    <i className={`fa-solid text-lg ${
                      project.approvals?.programManager === 'approved' ? 'fa-circle-check text-green-600' :
                      project.approvals?.programManager === 'rejected' ? 'fa-circle-xmark text-red-600' :
                      project.approvals?.programManager === 'pending' ? 'fa-clock text-yellow-600' :
                      'fa-circle text-gray-300'
                    }`}></i>
                  </div>
                  {project.approvals?.programManager === 'pending' && (
                    <div className="flex gap-2 mt-3">
                      <button className="flex-1 bg-green-500 hover:bg-green-600 text-white text-xs font-bold py-2 rounded-lg transition">
                        <i className="fa-solid fa-check"></i> موافقة
                      </button>
                      <button className="flex-1 bg-red-500 hover:bg-red-600 text-white text-xs font-bold py-2 rounded-lg transition">
                        <i className="fa-solid fa-xmark"></i> رفض
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <i className="fa-solid fa-chevron-left text-gray-400 text-xl mx-2"></i>

              {/* إدارة التخطيط */}
              <div className="flex-1">
                <div className={`p-4 rounded-xl border-2 shadow-sm transition-all ${
                  project.approvals?.planning === 'approved' ? 'bg-green-50 border-green-400' :
                  project.approvals?.planning === 'rejected' ? 'bg-red-50 border-red-400' :
                  project.approvals?.planning === 'pending' ? 'bg-yellow-50 border-yellow-400 animate-pulse' :
                  'bg-white border-gray-300'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-gray-700">إدارة التخطيط</span>
                    <i className={`fa-solid text-lg ${
                      project.approvals?.planning === 'approved' ? 'fa-circle-check text-green-600' :
                      project.approvals?.planning === 'rejected' ? 'fa-circle-xmark text-red-600' :
                      project.approvals?.planning === 'pending' ? 'fa-clock text-yellow-600' :
                      'fa-circle text-gray-300'
                    }`}></i>
                  </div>
                  {project.approvals?.planning === 'pending' && (
                    <div className="flex gap-2 mt-3">
                      <button className="flex-1 bg-green-500 hover:bg-green-600 text-white text-xs font-bold py-2 rounded-lg transition">
                        <i className="fa-solid fa-check"></i> موافقة
                      </button>
                      <button className="flex-1 bg-red-500 hover:bg-red-600 text-white text-xs font-bold py-2 rounded-lg transition">
                        <i className="fa-solid fa-xmark"></i> رفض
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <i className="fa-solid fa-chevron-left text-gray-400 text-xl mx-2"></i>

              {/* إدارة الحوكمة */}
              <div className="flex-1">
                <div className={`p-4 rounded-xl border-2 shadow-sm transition-all ${
                  project.approvals?.governance === 'approved' ? 'bg-green-50 border-green-400' :
                  project.approvals?.governance === 'rejected' ? 'bg-red-50 border-red-400' :
                  project.approvals?.governance === 'pending' ? 'bg-yellow-50 border-yellow-400 animate-pulse' :
                  'bg-white border-gray-300'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-gray-700">إدارة الحوكمة</span>
                    <i className={`fa-solid text-lg ${
                      project.approvals?.governance === 'approved' ? 'fa-circle-check text-green-600' :
                      project.approvals?.governance === 'rejected' ? 'fa-circle-xmark text-red-600' :
                      project.approvals?.governance === 'pending' ? 'fa-clock text-yellow-600' :
                      'fa-circle text-gray-300'
                    }`}></i>
                  </div>
                  {project.approvals?.governance === 'pending' && (
                    <div className="flex gap-2 mt-3">
                      <button className="flex-1 bg-green-500 hover:bg-green-600 text-white text-xs font-bold py-2 rounded-lg transition">
                        <i className="fa-solid fa-check"></i> موافقة
                      </button>
                      <button className="flex-1 bg-red-500 hover:bg-red-600 text-white text-xs font-bold py-2 rounded-lg transition">
                        <i className="fa-solid fa-xmark"></i> رفض
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <i className="fa-solid fa-chevron-left text-gray-400 text-xl mx-2"></i>

              {/* مدير المحافظ */}
              <div className="flex-1">
                <div className={`p-4 rounded-xl border-2 shadow-sm transition-all ${
                  project.approvals?.portfolio === 'approved' ? 'bg-green-50 border-green-400' :
                  project.approvals?.portfolio === 'rejected' ? 'bg-red-50 border-red-400' :
                  project.approvals?.portfolio === 'pending' ? 'bg-yellow-50 border-yellow-400 animate-pulse' :
                  'bg-white border-gray-300'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-gray-700">مدير المحافظ</span>
                    <i className={`fa-solid text-lg ${
                      project.approvals?.portfolio === 'approved' ? 'fa-circle-check text-green-600' :
                      project.approvals?.portfolio === 'rejected' ? 'fa-circle-xmark text-red-600' :
                      project.approvals?.portfolio === 'pending' ? 'fa-clock text-yellow-600' :
                      'fa-circle text-gray-300'
                    }`}></i>
                  </div>
                  {project.approvals?.portfolio === 'pending' && (
                    <div className="flex gap-2 mt-3">
                      <button className="flex-1 bg-green-500 hover:bg-green-600 text-white text-xs font-bold py-2 rounded-lg transition">
                        <i className="fa-solid fa-check"></i> موافقة
                      </button>
                      <button className="flex-1 bg-red-500 hover:bg-red-600 text-white text-xs font-bold py-2 rounded-lg transition">
                        <i className="fa-solid fa-xmark"></i> رفض
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs للمراحل */}
          <div className="bg-white px-6 py-3 border-b flex gap-2 overflow-x-auto">
            {[1, 2, 3, 4, 5].map(stage => {
              if (project.stage < stage) return null;
              return (
                <button
                  key={stage}
                  onClick={() => setExpandedStage(stage)}
                  className={`px-4 py-2 rounded-lg font-bold text-sm transition-all whitespace-nowrap ${
                    expandedStage === stage
                      ? 'bg-secondary-gold text-primary-900 shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  المرحلة {stage}
                </button>
              );
            })}
          </div>

          {/* Body */}
          <div className="overflow-y-auto p-6 custom-scrollbar flex-1 bg-gray-50">
            {/* عرض المرحلة المختارة */}
            {!expandedStage && (
              <div className="text-center py-20">
                <i className="fa-solid fa-hand-pointer text-6xl text-gray-300 mb-4"></i>
                <p className="text-gray-500 text-lg">اختر مرحلة من الأعلى لعرض تفاصيلها</p>
              </div>
            )}

            {/* المرحلة 1: التأسيس */}
            {expandedStage === 1 && (
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-primary-900">المرحلة الأولى: التأسيس</h3>
                  <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                    حالة المسار: مكتمل
                  </span>
                </div>

                {/* معلومات المشروع الأساسية */}
                <div className="bg-white p-6 rounded-xl border shadow-sm mb-6">
                  <h4 className="font-bold text-primary-800 mb-4 border-b pb-2">المعلومات الأساسية</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-primary-50 p-3 rounded-lg">
                      <div className="text-xs font-bold text-primary-800 mb-1">اسم المشروع</div>
                      <div className="text-sm text-gray-900">{project.name}</div>
                    </div>
                    <div className="bg-primary-50 p-3 rounded-lg">
                      <div className="text-xs font-bold text-primary-800 mb-1">المحفظة</div>
                      <div className="text-sm text-gray-900">{project.data?.projectInfo?.portfolio || project.portfolio || '-'}</div>
                    </div>
                    <div className="bg-primary-50 p-3 rounded-lg">
                      <div className="text-xs font-bold text-primary-800 mb-1">البرنامج</div>
                      <div className="text-sm text-gray-900">{project.data?.projectInfo?.program || project.programName || '-'}</div>
                    </div>
                    <div className="bg-amber-50 p-3 rounded-lg">
                      <div className="text-xs font-bold text-amber-800 mb-1">الميزانية المقدرة</div>
                      <div className="text-sm text-gray-900 font-bold">{Number(project.estimatedBudget || 0).toLocaleString()} ريال</div>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <div className="text-xs font-bold text-purple-800 mb-1">المدة</div>
                      <div className="text-sm text-gray-900 font-bold">{project.durationInWeeks || 0} أسبوع</div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="text-xs font-bold text-blue-800 mb-1">مدير المشروع</div>
                      <div className="text-sm text-gray-900">{project.manager || '-'}</div>
                    </div>
                  </div>
                </div>

                {/* فريق العمل */}
                <div className="bg-white p-6 rounded-xl border shadow-sm mb-6">
                  <h4 className="font-bold text-primary-800 mb-4 border-b pb-2">فريق العمل</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="text-xs font-bold text-gray-600 mb-1">مدير المشروع</div>
                      <div className="text-sm">{project.data?.team?.projectManagerEmail || '-'}</div>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <div className="text-xs font-bold text-gray-600 mb-1">صاحب المشروع</div>
                      <div className="text-sm">{project.data?.team?.projectOwnerEmail || '-'}</div>
                    </div>
                    <div className="bg-indigo-50 p-3 rounded-lg">
                      <div className="text-xs font-bold text-gray-600 mb-1">مدير البرنامج</div>
                      <div className="text-sm">{project.data?.team?.programManagerEmail || '-'}</div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="text-xs font-bold text-gray-600 mb-1">مدير المحفظة</div>
                      <div className="text-sm">{project.data?.team?.portfolioManagerEmail || '-'}</div>
                    </div>
                  </div>
                </div>

                {/* الاستراتيجية */}
                <div className="bg-white p-6 rounded-xl border shadow-sm mb-6">
                  <h4 className="font-bold text-primary-800 mb-4 border-b pb-2">الاستراتيجية</h4>
                  <div className="space-y-3">
                    <div className="bg-amber-50 p-3 rounded-lg">
                      <div className="text-xs font-bold text-gray-600 mb-1">الهدف الاستراتيجي</div>
                      <div className="text-sm">{project.data?.strategy?.objective || project.stratObj || '-'}</div>
                    </div>
                    <div className="bg-emerald-50 p-3 rounded-lg">
                      <div className="text-xs font-bold text-gray-600 mb-1">النتيجة الاستراتيجية</div>
                      <div className="text-sm">{project.data?.strategy?.result || project.stratResult || '-'}</div>
                    </div>
                  </div>
                </div>

                {/* المتطلبات */}
                <div className="border-t pt-6">
                  <h4 className="font-bold text-gray-700 mb-4 text-sm">المتطلبات الإضافية:</h4>
                  <RequirementItem 
                    title="سجل المخاطر الأولي" 
                    subText={`${projectRisks.length} مخاطر مسجلة`}
                    icon="fa-shield-virus" 
                    status={projectRisks.length > 0 ? 'done' : ''} 
                    onClick={() => setShowRiskModal(true)} 
                  />
                </div>
              </div>
            )}

            {/* المرحلة 2: التفصيل */}
            {expandedStage === 2 && (
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-primary-900">المرحلة الثانية: التفصيل</h3>
                </div>

                <div className="space-y-4">
                  <RequirementItem 
                    title="نطاق المشروع التفصيلي" 
                    subText="تحديد الأهداف، المخرجات، والاعتمادات" 
                    icon="fa-bullseye" 
                    status={(gate2Data.scope?.currentState || gate2Data.scope?.targetState) ? 'done' : ''} 
                    onClick={() => setShowScopeModal(true)} 
                  />
                  <RequirementItem 
                    title="خطة المشتريات وتحليل الخيارات" 
                    subText="مقارنة الخيارات (داخلي/خارجي) والتكاليف" 
                    icon="fa-shopping-cart" 
                    status={gate2Data.procurement?.selectedOption ? 'done' : ''} 
                    onClick={() => setShowProcurementModal(true)} 
                  />
                  <RequirementItem 
                    title="سجل الافتراضات والقيود" 
                    subText={`${gate2Data.assumptions?.length || 0} افتراض مسجل`}
                    icon="fa-list-check" 
                    status={gate2Data.assumptions?.length > 0 ? 'done' : ''} 
                    onClick={() => setShowAssumptionsModal(true)} 
                  />
                  <RequirementItem 
                    title="بطاقة التغيير (Change Card)" 
                    subText="إدارة التغيير وأصحاب المصلحة" 
                    icon="fa-exchange-alt" 
                    status={gate2Data.changeCard?.justification ? 'done' : ''} 
                    onClick={() => setShowChangeCardModal(true)} 
                  />
                  <RequirementItem 
                    title="تحديث سجل المخاطر" 
                    subText={`${projectRisks.length} مخاطر مسجلة`}
                    icon="fa-shield-virus" 
                    status={projectRisks.length > 0 ? 'done' : ''} 
                    onClick={() => setShowRiskModal(true)} 
                  />
                </div>
              </div>
            )}

            {/* المرحلة 3: التخطيط */}
            {expandedStage === 3 && (
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-primary-900">المرحلة الثالثة: التخطيط</h3>
                </div>

                <div className="space-y-4">
                  <RequirementItem 
                    title="ميثاق المشروع (Charter)" 
                    subText="الوثيقة المرجعية المعتمدة للمشروع" 
                    icon="fa-file-contract" 
                    status={gate3Data.charter?.budget ? 'done' : ''} 
                    onClick={() => setShowCharterModal(true)} 
                  />
                  <RequirementItem 
                    title="الخطة التفصيلية (الجدول الزمني)" 
                    subText={`${gate3Data.timeline?.length || 0} مهمة في الجدول`}
                    icon="fa-calendar-days" 
                    status={gate3Data.timeline?.length > 0 ? 'done' : ''} 
                    onClick={() => setShowTimelineModal(true)} 
                  />
                  <RequirementItem 
                    title="تحديث سجل المخاطر" 
                    subText={`${projectRisks.length} مخاطر مسجلة`}
                    icon="fa-shield-virus" 
                    status={projectRisks.length > 0 ? 'done' : ''} 
                    onClick={() => setShowRiskModal(true)} 
                  />
                </div>
              </div>
            )}

            {/* المرحلة 4: التنفيذ */}
            {expandedStage === 4 && (
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-primary-900">المرحلة الرابعة: التنفيذ</h3>
                </div>

                <div className="space-y-4">
                  <RequirementItem 
                    title="تحديث الجدول الزمني (متابعة الإنجاز)" 
                    subText={`${gate4Data.timeline?.length || 0} مهمة`}
                    icon="fa-calendar-check" 
                    status={gate4Data.timeline?.length > 0 ? 'done' : ''} 
                    onClick={() => setShowTimelineModal(true)} 
                  />
                  <RequirementItem 
                    title="الدروس المستفادة" 
                    subText={`${gate4Data.lessons?.length || 0} درس مسجل`}
                    icon="fa-graduation-cap" 
                    status={gate4Data.lessons?.length > 0 ? 'done' : ''} 
                    onClick={() => setShowLessonsModal(true)} 
                  />
                  <RequirementItem 
                    title="تحديث سجل المخاطر" 
                    subText={`${projectRisks.length} مخاطر مسجلة`}
                    icon="fa-shield-virus" 
                    status={projectRisks.length > 0 ? 'done' : ''} 
                    onClick={() => setShowRiskModal(true)} 
                  />
                </div>
              </div>
            )}

            {/* المرحلة 5: التفعيل */}
            {expandedStage === 5 && (
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-primary-900">المرحلة الخامسة: التفعيل</h3>
                </div>

                <div className="space-y-4">
                  <RequirementItem 
                    title="خطة التفعيل (Activation Plan)" 
                    subText={`${gate5Data.activationPlan?.length || 0} نشاط مخطط`}
                    icon="fa-rocket" 
                    status={gate5Data.activationPlan?.length > 0 ? 'done' : ''} 
                    onClick={() => setShowActivationModal(true)} 
                  />
                  <RequirementItem 
                    title="الدروس المستفادة النهائية" 
                    subText={`${gate5Data.lessons?.length || 0} درس مسجل`}
                    icon="fa-book-open" 
                    status={gate5Data.lessons?.length > 0 ? 'done' : ''} 
                    onClick={() => setShowLessonsModal(true)} 
                  />
                  <RequirementItem 
                    title="إغلاق المخاطر النهائي" 
                    subText={`${projectRisks.length} مخاطر`}
                    icon="fa-shield-check" 
                    status={projectRisks.every(r => r.status === 'مغلق') ? 'done' : ''} 
                    onClick={() => setShowRiskModal(true)} 
                  />
                </div>
              </div>
            )}

            {/* المخاطر (متوفر في جميع المراحل) */}
            {expandedStage && projectRisks.length > 0 && (
              <div className="mt-8 bg-white p-6 rounded-xl border shadow-sm">
                <h4 className="font-bold text-red-700 mb-4 border-b pb-2 flex items-center gap-2">
                  <i className="fa-solid fa-triangle-exclamation"></i>
                  سجل المخاطر ({projectRisks.length} مخاطر)
                </h4>
                <div className="space-y-3">
                  {projectRisks.map((risk, idx) => (
                    <div key={idx} className="bg-red-50 p-4 rounded-lg border border-red-200">
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
                        <div><span className="text-gray-500">الاستجابة:</span> <span className="font-bold">{risk.responseType || risk.response}</span></div>
                        <div><span className="text-gray-500">الحالة:</span> <span className="font-bold">{risk.status}</span></div>
                      </div>
                      {risk.mitigationPlan && (
                        <div className="mt-2 text-xs text-gray-600 bg-white p-2 rounded">
                          <span className="font-bold">خطة التخفيف:</span> {risk.mitigationPlan}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* الموافقات (للمرحلة 1) */}
            {expandedStage === 1 && project.approvals && (
              <div className="bg-white p-6 rounded-xl border shadow-sm">
                <h4 className="font-bold text-primary-800 mb-4 border-b pb-2">مسار الموافقات الإلكتروني</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {Object.entries(project.approvals).map(([role, status]) => {
                    const roleNames = {
                      progMgr: 'مدير البرنامج',
                      planning: 'التخطيط',
                      portfolio: 'المحفظة',
                      governance: 'الحوكمة'
                    };
                    return (
                      <div key={role} className={`p-4 rounded-lg text-center ${
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
              </div>
            )}

          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 p-5 border-t bg-white">
            <button
              onClick={() => setSelectedProject(null)}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition font-bold"
            >
              <i className="fa-solid fa-times ml-2"></i>
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

      {/* حقل البحث */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6 border-l-4 border-secondary-gold">
        <div className="flex items-center gap-2 mb-3">
          <i className="fa-solid fa-search text-secondary-gold"></i>
          <h3 className="font-bold text-primary-900">البحث عن مشروع</h3>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ابحث باسم المشروع أو الوصف..."
          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-secondary-gold focus:outline-none text-right"
        />
      </div>

      {/* الفلاتر */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* فلتر المراحل */}
        <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-primary-600">
          <div className="flex items-center gap-2 mb-3">
            <i className="fa-solid fa-layer-group text-primary-600"></i>
            <h3 className="font-bold text-primary-900">تصفية حسب المرحلة</h3>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilterStage('all')}
              className={`px-3 py-2 rounded-lg font-bold text-sm transition ${
                filterStage === 'all' 
                  ? 'bg-primary-600 text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-700 hover:bg-primary-50 hover:text-primary-800'
              }`}
            >
              الكل ({projects.length})
            </button>
            {[1, 2, 3, 4, 5, 6].map(stage => (
              <button
                key={stage}
                onClick={() => setFilterStage(stage.toString())}
                className={`px-3 py-2 rounded-lg font-bold text-sm transition ${
                  filterStage === stage.toString() 
                    ? 'bg-secondary-gold text-primary-900 shadow-lg' 
                    : 'bg-gray-100 text-gray-700 hover:bg-amber-50'
                }`}
              >
                {stage === 6 ? 'مكتمل' : `${stage} - ${stageNames[stage]?.split(': ')[1] || stageNames[stage]}`} ({projects.filter(p => p.stage === stage).length})
              </button>
            ))}
          </div>
        </div>

        {/* فلتر المحفظة */}
        <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-purple-600">
          <div className="flex items-center gap-2 mb-3">
            <i className="fa-solid fa-briefcase text-purple-600"></i>
            <h3 className="font-bold text-primary-900">تصفية حسب المحفظة</h3>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilterPortfolio('all')}
              className={`px-3 py-2 rounded-lg font-bold text-sm transition ${
                filterPortfolio === 'all' 
                  ? 'bg-purple-600 text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-700 hover:bg-purple-50 hover:text-purple-800'
              }`}
            >
              كل المحافظ ({projects.length})
            </button>
            {portfolios.map(portfolio => (
              <button
                key={portfolio}
                onClick={() => setFilterPortfolio(portfolio)}
                className={`px-3 py-2 rounded-lg font-bold text-sm transition ${
                  filterPortfolio === portfolio 
                    ? 'bg-purple-600 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-700 hover:bg-purple-50 hover:text-purple-800'
                }`}
              >
                {portfolio} ({projects.filter(p => 
                  p.portfolio === portfolio || 
                  p.data?.projectInfo?.portfolio === portfolio
                ).length})
              </button>
            ))}
            {portfolios.length === 0 && (
              <span className="text-gray-500 text-sm">لا توجد محافظ متاحة</span>
            )}
          </div>
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

      {/* المودالات - للقراءة فقط */}
      {selectedProject && (
        <>
          {showRiskModal && (
            <RiskRegisterModal
              isOpen={showRiskModal}
              onClose={() => setShowRiskModal(false)}
              project={selectedProject}
              risks={selectedProject.risks || []}
              onSaveRisks={() => {}}
              readOnly={true}
            />
          )}

          {showScopeModal && (
            <ScopeModal
              isOpen={showScopeModal}
              onClose={() => setShowScopeModal(false)}
              scopeData={selectedProject.gate2Data?.scope || {}}
              onSave={() => {}}
              readOnly={true}
            />
          )}

          {showProcurementModal && (
            <ProcurementModal
              isOpen={showProcurementModal}
              onClose={() => setShowProcurementModal(false)}
              procurementData={selectedProject.gate2Data?.procurement || {}}
              onSave={() => {}}
              readOnly={true}
            />
          )}

          {showAssumptionsModal && (
            <AssumptionsModal
              isOpen={showAssumptionsModal}
              onClose={() => setShowAssumptionsModal(false)}
              assumptions={selectedProject.gate2Data?.assumptions || []}
              onSave={() => {}}
              readOnly={true}
            />
          )}

          {showChangeCardModal && (
            <ChangeCardModal
              isOpen={showChangeCardModal}
              onClose={() => setShowChangeCardModal(false)}
              changeCardData={selectedProject.gate2Data?.changeCard || {}}
              onSave={() => {}}
              readOnly={true}
            />
          )}

          {showCharterModal && (
            <CharterModal
              isOpen={showCharterModal}
              onClose={() => setShowCharterModal(false)}
              charterData={selectedProject.gate3Data?.charter || {}}
              onSave={() => {}}
              readOnly={true}
            />
          )}

          {showTimelineModal && (
            <TimelineModal
              isOpen={showTimelineModal}
              onClose={() => setShowTimelineModal(false)}
              timeline={selectedProject.gate3Data?.timeline || selectedProject.gate4Data?.timeline || []}
              onSave={() => {}}
              readOnly={true}
            />
          )}

          {showLessonsModal && (
            <LessonsLearnedModal
              isOpen={showLessonsModal}
              onClose={() => setShowLessonsModal(false)}
              lessons={selectedProject.gate4Data?.lessons || selectedProject.gate5Data?.lessons || []}
              onSave={() => {}}
              readOnly={true}
            />
          )}

          {showActivationModal && (
            <ActivationPlanModal
              isOpen={showActivationModal}
              onClose={() => setShowActivationModal(false)}
              activationPlan={selectedProject.gate5Data?.activationPlan || []}
              onSave={() => {}}
              readOnly={true}
            />
          )}
        </>
      )}
    </div>
  );
};

export default PMOView;
