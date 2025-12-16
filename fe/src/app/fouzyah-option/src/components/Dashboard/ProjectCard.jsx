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
    <div onClick={() => onClick(project)} className={`relative bg-white rounded-2xl p-5 border shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden hover:-translate-y-3 hover:scale-[1.03] hover:bg-yellow-50 hover:border-secondary-gold ${
      needsMyApproval ? 'border-green-300 ring-2 ring-green-100' : 'border-gray-100'
    }`}>
      {/* شريط علوي ملون */}
      <div className={`absolute top-0 right-0 w-full h-1 ${
        needsMyApproval ? 'bg-gradient-to-r from-green-500 to-green-400' : 'bg-gradient-to-r from-primary-600 to-secondary-gold'
      }`}></div>
      
      {/* شارة "يحتاج موافقتك" */}
      {needsMyApproval && (
        <div className="absolute top-3 left-3 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 animate-pulse">
          <i className="fa-solid fa-bell"></i>
          يحتاج موافقتك
        </div>
      )}
      
      {/* العنوان والحالة */}
      <div className="flex justify-between items-start mt-2 mb-3">
        <h3 className="font-bold text-lg text-primary-900 line-clamp-1 group-hover:text-primary-600 transition">
          {project.name}
        </h3>
        <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-primary-50 text-primary-700 border border-primary-200 whitespace-nowrap">
          {currentGate.title}
        </span>
      </div>

      {/* الوصف */}
      <p className="text-xs text-gray-500 mb-4 line-clamp-2 h-8 leading-relaxed">
        {project.description || 'لا يوجد وصف مضاف.'}
      </p>

      {/* شبكة البيانات */}
      <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs text-gray-600 mb-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
        <div className="col-span-2 flex items-center gap-2">
            <i className="fa-solid fa-briefcase text-secondary-gold w-4"></i>
            <span className="truncate">{programName}</span>
        </div>
        <div className="flex items-center gap-2">
            <i className="fa-solid fa-user-tie text-primary-600 w-4"></i>
            <span className="truncate">{manager}</span>
        </div>
        <div className="flex items-center gap-2 font-mono font-bold text-green-700">
            <i className="fa-solid fa-coins w-4"></i>
            <span>{formatMoney(budget)}</span>
        </div>
        <div className="col-span-2 flex items-center gap-2">
            <i className="fa-solid fa-folder text-blue-600 w-4"></i>
            <span className="truncate">{portfolio}</span>
        </div>
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
          
          {/* مكتب التخطيط */}
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
            <span className="font-bold whitespace-nowrap">مكتب تخطيط</span>
          </div>
          
          <i className="fa-solid fa-chevron-left text-gray-300"></i>
          
          {/* مدير المحفظة */}
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
            <span className="font-bold whitespace-nowrap">مدير محفظة</span>
          </div>
          
          <i className="fa-solid fa-chevron-left text-gray-300"></i>
          
          {/* الحوكمة */}
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
            <span className="font-bold whitespace-nowrap">حوكمة</span>
          </div>
        </div>
      </div>

      {/* التواريخ والمخاطر */}
      <div className="flex justify-between items-center text-[10px] text-gray-400 border-t pt-3">
        <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded font-mono">
            <span>{startDate}</span>
            <i className="fa-solid fa-arrow-left text-gray-300 mx-1"></i>
            <span>{endDate}</span>
        </div>
        <div className="flex items-center gap-1 text-red-500 font-bold">
            <i className="fa-solid fa-shield-halved"></i> 
            {project.risks ? project.risks.length : 0}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;