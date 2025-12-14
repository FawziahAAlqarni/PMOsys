import React from 'react';

const ProjectHeader = ({ project, onBack }) => {
  // تحديث مسميات البوابات لتكون كاملة
  const gates = [
    { id: 1, title: 'البوابة 1: التأسيس' },
    { id: 2, title: 'البوابة 2: التفصيل' },
    { id: 3, title: 'البوابة 3: التخطيط' },
    { id: 4, title: 'البوابة 4: التنفيذ والإغلاق' }
  ];

  // تحديد حالة المشروع الديناميكية
  const getProjectStatus = () => {
    // إذا كان المشروع مغلق (البوابة 5)
    if (project.stage === 5) {
      return { text: 'مكتمل', color: 'bg-green-100 text-green-700', icon: 'fa-check-circle' };
    }

    // إذا كان في البوابة 1 (مسار الموافقات)
    if (project.stage === 1) {
      const approvalWorkflow = [
        { order: 1, role: 'مدير البرنامج' },
        { order: 2, role: 'إدارة التخطيط' },
        { order: 3, role: 'إدارة الحوكمة/المخاطر' },
        { order: 4, role: 'مدير الإدارة العامة للمحافظ' }
      ];
      
      const currentApprover = approvalWorkflow.find(a => a.order === project.currentApproverOrder);
      if (currentApprover && project.currentApproverOrder <= 4) {
        return { 
          text: `في انتظار موافقة ${currentApprover.role}`, 
          color: 'bg-yellow-100 text-yellow-700',
          icon: 'fa-clock'
        };
      }
    }

    // إذا كان في البوابات 2, 3, 4
    if (project.stage >= 2 && project.stage <= 4) {
      const gateNames = {
        2: 'البوابة 2',
        3: 'البوابة 3',
        4: 'البوابة 4'
      };
      return { 
        text: `في انتظار اعتماد ${gateNames[project.stage]}`, 
        color: 'bg-blue-100 text-blue-700',
        icon: 'fa-hourglass-half'
      };
    }

    // الحالة الافتراضية
    return { text: 'قيد المراجعة', color: 'bg-yellow-100 text-yellow-700', icon: 'fa-clock' };
  };

  const status = getProjectStatus();

  return (
    <div className="mb-8 fade-in">
      {/* العنوان وزر الرجوع */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="w-10 h-10 bg-white rounded-xl shadow-md border-2 border-gray-300 flex items-center justify-center hover:bg-primary-600 hover:text-white hover:border-primary-600 transition text-gray-700">
            <i className="fa-solid fa-arrow-right text-lg"></i>
        </button>
        <div>
            <h2 className="text-2xl font-bold text-primary-900 flex items-center gap-2">
                {project.name}
                <span className={`text-xs px-3 py-1.5 rounded-full font-bold flex items-center gap-1.5 ${status.color}`}>
                    <i className={`fa-solid ${status.icon}`}></i>
                    {status.text}
                </span>
            </h2>
            <p className="text-xs text-secondary-gold font-bold mt-1">برنامج تطوير وزارة الحرس الوطني | {project.programName}</p>
        </div>
      </div>

      {/* شريط البوابات (Stepper) */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
        {/* الخط الواصل */}
        <div className="absolute top-[30%] left-0 w-full px-[12%] h-1 z-0 flex -translate-y-1/2">
            <div className={`h-full flex-1 transition-all duration-1000 ${project.stage > 1 ? 'bg-secondary-gold' : 'bg-gray-200'}`}></div>
            <div className={`h-full flex-1 transition-all duration-1000 ${project.stage > 2 ? 'bg-secondary-gold' : 'bg-gray-200'}`}></div>
            <div className={`h-full flex-1 transition-all duration-1000 ${project.stage > 3 ? 'bg-secondary-gold' : 'bg-gray-200'}`}></div>
        </div>

        {/* الدوائر والمسميات */}
        <div className="flex justify-between relative z-10">
            {gates.map((g) => {
                let statusClass = '';
                let icon = '';
                if (project.stage > g.id) { 
                    statusClass = 'bg-secondary-gold border-secondary-gold text-white'; icon = <i className="fa-solid fa-check"></i>; 
                } else if (project.stage === g.id) { 
                    statusClass = 'bg-primary-600 border-primary-600 text-white ring-4 ring-primary-50 shadow-lg scale-110'; icon = g.id; 
                } else { 
                    statusClass = 'bg-white border-gray-200 text-gray-400'; icon = g.id; 
                }
                return (
                    <div key={g.id} className="flex flex-col items-center group w-1/4 cursor-default relative">
                        <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold transition-all duration-500 z-10 ${statusClass}`}>
                            {icon}
                        </div>
                        <div className={`text-xs font-bold mt-4 text-center ${project.stage === g.id ? 'text-primary-800' : 'text-gray-400'}`}>
                            {g.title}
                        </div>
                    </div>
                );
            })}
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;