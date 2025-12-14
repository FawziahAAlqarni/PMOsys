import React from 'react';

const ProjectCard = ({ project, onClick }) => {
  // مسميات البوابات (محدثة)
  const gates = [
    { id: 1, title: 'البوابة 1: التأسيس' },
    { id: 2, title: 'البوابة 2: التفصيل' },
    { id: 3, title: 'البوابة 3: التخطيط' },
    { id: 4, title: 'البوابة 4: التنفيذ والإغلاق' }
  ];
  
  const currentGate = gates.find(g => g.id === project.stage) || { title: 'مكتمل' };
  
  // تنسيق العملة
  const formatMoney = (amount) => amount ? Number(amount).toLocaleString() + ' ر.س' : '---';

  return (
    <div onClick={() => onClick(project)} className="relative bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-lg transition cursor-pointer group overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-primary-600 to-secondary-gold"></div>
      
      <div className="flex justify-between items-start mt-2 mb-3">
        <h3 className="font-bold text-lg text-primary-900 line-clamp-1 group-hover:text-primary-600 transition">
          {project.name}
        </h3>
        <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-primary-50 text-primary-700 border border-primary-200 whitespace-nowrap">
          {currentGate.title}
        </span>
      </div>

      <p className="text-xs text-gray-500 mb-4 line-clamp-2 h-8 leading-relaxed">
        {project.description || 'لا يوجد وصف مضاف.'}
      </p>

      <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs text-gray-600 mb-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
        <div className="col-span-2 flex items-center gap-2">
            <i className="fa-solid fa-briefcase text-secondary-gold w-4"></i>
            <span className="truncate">{project.programName || '---'}</span>
        </div>
        <div className="flex items-center gap-2">
            <i className="fa-solid fa-user-tie text-primary-600 w-4"></i>
            <span className="truncate">{project.manager || '---'}</span>
        </div>
        <div className="flex items-center gap-2 font-mono font-bold text-green-700">
            <i className="fa-solid fa-coins w-4"></i>
            <span>{formatMoney(project.budget)}</span>
        </div>
      </div>

      <div className="flex justify-between items-center text-[10px] text-gray-400 border-t pt-3">
        <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded font-mono">
            <span>{project.startDate || '--'}</span>
            <i className="fa-solid fa-arrow-left text-gray-300 mx-1"></i>
            <span>{project.endDate || '--'}</span>
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