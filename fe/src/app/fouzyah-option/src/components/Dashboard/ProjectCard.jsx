import React from 'react';

const ProjectCard = ({ project, onClick, needsMyApproval }) => {
  // مسميات البوابات
  const gates = [
    { id: 1, title: 'المرحلة 1: التأسيس' },
    { id: 2, title: 'المرحلة 2: التفصيل' },
    { id: 3, title: 'المرحلة 3: التخطيط' },
    { id: 4, title: 'المرحلة 4: التنفيذ' },
    { id: 5, title: 'المرحلة 5: التفعيل' }
  ];
  
  const currentGate = gates.find(g => g.id === project.stage) || { title: 'مكتمل' };
  
  // تنسيق العملة
  const formatMoney = (amount) => amount ? Number(amount).toLocaleString() + ' ر.س' : '---';

  // استخراج البيانات من الهيكل الجديد
  const programName = project.data?.projectInfo?.program || project.programName || '---';
  const manager = project.data?.team?.projectManager || project.manager || '---';
  const budget = project.estimatedBudget || project.budget || 0;
  const startDate = project.data?.dates?.projectStartDate || project.startDate || '--';
  const endDate = project.data?.dates?.projectEndDate || project.endDate || '--';
  const portfolio = project.data?.projectInfo?.portfolio || project.portfolio || '---';

  return (
    <div onClick={() => onClick(project)} className={`relative bg-white rounded-2xl p-5 border-2 shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden hover:-translate-y-3 hover:scale-[1.03] ${
      needsMyApproval ? 'border-green-300 ring-2 ring-green-100' : 'border-[#0d6b3a]'
    }`}>
      {/* اسم المشروع */}
      <h3 className="font-bold text-lg text-primary-900 mb-2 line-clamp-1 group-hover:text-primary-600 transition">
        {project.name}
      </h3>
      {/* اسم البرنامج */}
      <div className="flex items-center gap-2 mb-2">
        <i className="fa-solid fa-briefcase text-secondary-gold w-4"></i>
        <span className="truncate font-bold">{programName}</span>
      </div>
      {/* المرحلة */}
      <div className="mb-3">
        <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-primary-50 text-primary-700 border border-primary-200 whitespace-nowrap">
          {currentGate.title}
        </span>
      </div>
      {/* مسار الموافقات */}
      <div className="mb-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
        <div className="text-[10px] font-bold text-gray-700 mb-2 flex items-center gap-1">
          <i className="fa-solid fa-route text-blue-600"></i>
          مسار الموافقات
        </div>
        <div className="flex items-center justify-between gap-1 text-[9px]">
          {/* مدير البرنامج */}
          <div className={`flex flex-col items-center gap-0.5 ${
            project.approvals?.programManager === 'approved' ? 'text-green-600' :
            project.approvals?.programManager === 'rejected' ? 'text-red-600' :
            project.approvals?.programManager === 'pending' ? 'text-yellow-600' : 'text-gray-400'
          }`}>
            <i className={`fa-solid ${
              project.approvals?.programManager === 'approved' ? 'fa-circle-check' :
              project.approvals?.programManager === 'rejected' ? 'fa-circle-xmark' :
              project.approvals?.programManager === 'pending' ? 'fa-clock' : 'fa-circle'
            } text-sm`}></i>
            <span className="font-bold whitespace-nowrap">مدير برنامج</span>
          </div>
          <i className="fa-solid fa-chevron-left text-gray-300"></i>
          {/* إدارة التخطيط */}
          <div className={`flex flex-col items-center gap-0.5 ${
            project.approvals?.planning === 'approved' ? 'text-green-600' :
            project.approvals?.planning === 'rejected' ? 'text-red-600' :
            project.approvals?.planning === 'pending' ? 'text-yellow-600' : 'text-gray-400'
          }`}>
            <i className={`fa-solid ${
              project.approvals?.planning === 'approved' ? 'fa-circle-check' :
              project.approvals?.planning === 'rejected' ? 'fa-circle-xmark' :
              project.approvals?.planning === 'pending' ? 'fa-clock' : 'fa-circle'
            } text-sm`}></i>
            <span className="font-bold whitespace-nowrap">إدارة تخطيط</span>
          </div>
          <i className="fa-solid fa-chevron-left text-gray-300"></i>
          {/* إدارة الحوكمة */}
          <div className={`flex flex-col items-center gap-0.5 ${
            project.approvals?.governance === 'approved' ? 'text-green-600' :
            project.approvals?.governance === 'rejected' ? 'text-red-600' :
            project.approvals?.governance === 'pending' ? 'text-yellow-600' : 'text-gray-400'
          }`}>
            <i className={`fa-solid ${
              project.approvals?.governance === 'approved' ? 'fa-circle-check' :
              project.approvals?.governance === 'rejected' ? 'fa-circle-xmark' :
              project.approvals?.governance === 'pending' ? 'fa-clock' : 'fa-circle'
            } text-sm`}></i>
            <span className="font-bold whitespace-nowrap">إدارة حوكمة</span>
          </div>
          <i className="fa-solid fa-chevron-left text-gray-300"></i>
          {/* مدير المحافظ */}
          <div className={`flex flex-col items-center gap-0.5 ${
            project.approvals?.portfolio === 'approved' ? 'text-green-600' :
            project.approvals?.portfolio === 'rejected' ? 'text-red-600' :
            project.approvals?.portfolio === 'pending' ? 'text-yellow-600' : 'text-gray-400'
          }`}>
            <i className={`fa-solid ${
              project.approvals?.portfolio === 'approved' ? 'fa-circle-check' :
              project.approvals?.portfolio === 'rejected' ? 'fa-circle-xmark' :
              project.approvals?.portfolio === 'pending' ? 'fa-clock' : 'fa-circle'
            } text-sm`}></i>
            <span className="font-bold whitespace-nowrap">مدير محافظ</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;