import React from 'react';

const DashboardStats = ({ projects }) => {
  
  // 1. الحسابات
  const totalProjects = projects.length;
  
  // المشروع مكتمل فقط عند إغلاقه (stage === 5)
  const completedProjects = projects.filter(p => p.stage === 5).length;
  const activeProjects = totalProjects - completedProjects;
  
  // حساب المخاطر
  let totalRisks = 0;
  let highRisks = 0;
  
  projects.forEach(p => {
    if (p.risks) {
      totalRisks += p.risks.length;
      // نعتبر الخطر عالي إذا كان حاصل الضرب >= 15 (أو حسب معيارك)
      highRisks += p.risks.filter(r => (r.prob * r.impact) >= 15).length;
    }
  });

  // توزيع البوابات (للبار تشارت)
  const gateCounts = [0, 0, 0, 0, 0]; // [Gate1, Gate2, Gate3, Gate4, Closed]
  projects.forEach(p => {
    if(p.stage >= 1 && p.stage <= 5) {
        gateCounts[p.stage - 1]++;
    }
  });

  // حساب النسب للدائرة (Donut Chart)
  const completedPercent = totalProjects === 0 ? 0 : (completedProjects / totalProjects) * 100;
  const activePercent = totalProjects === 0 ? 0 : (activeProjects / totalProjects) * 100;
  // محيط الدائرة لعمل الرسم = 2 * pi * r (r=16) ≈ 100
  const dashArrayCompleted = `${completedPercent}, 100`;

  return (
    <div className="mb-10 fade-in">
      
      {/* البطاقات الأربعة */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* إجمالي المشاريع */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
                <p className="text-xs text-gray-500 font-bold mb-1">إجمالي المشاريع</p>
                <h3 className="text-3xl font-bold text-primary-600">{totalProjects}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 text-xl border border-primary-100">
                <i className="fa-regular fa-folder-open"></i>
            </div>
        </div>

        {/* المشاريع المكتملة */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
                <p className="text-xs text-gray-500 font-bold mb-1">المشاريع المكتملة</p>
                <h3 className="text-3xl font-bold text-secondary-gold">{completedProjects}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center text-secondary-gold text-xl border border-yellow-100">
                <i className="fa-solid fa-check"></i>
            </div>
        </div>

        {/* إجمالي المخاطر */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
                <p className="text-xs text-gray-500 font-bold mb-1">إجمالي المخاطر</p>
                <h3 className="text-3xl font-bold text-red-500">{totalRisks}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-500 text-xl border border-red-100">
                <i className="fa-solid fa-triangle-exclamation"></i>
            </div>
        </div>

        {/* مخاطر عالية */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
                <p className="text-xs text-gray-500 font-bold mb-1">مخاطر عالية</p>
                <h3 className="text-3xl font-bold text-red-700">{highRisks}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-700 text-xl border border-red-200">
                <i className="fa-solid fa-fire"></i>
            </div>
        </div>

      </div>

      {/* الرسوم البيانية */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* حالة المشاريع (Donut Chart) */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h4 className="font-bold text-primary-900 mb-6 text-left border-b pb-2">حالة المشاريع</h4>
              <div className="flex items-center justify-center gap-8">
                  <div className="relative w-40 h-40">
                      <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                          {/* الخلفية (نشط) */}
                          <path className="text-secondary-gold" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.8" />
                          {/* المكتمل */}
                          <path className="text-primary-600" strokeDasharray={dashArrayCompleted} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.8" />
                      </svg>
                      {/* النص في الوسط */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 text-xs">
                          <span className="text-xl font-bold text-primary-900">{totalProjects}</span>
                          <span>مشروع</span>
                      </div>
                  </div>
                  <div className="space-y-3">
                      <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-secondary-gold"></div>
                          <span className="text-sm text-gray-600">نشط ({activeProjects})</span>
                      </div>
                      <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-primary-600"></div>
                          <span className="text-sm text-gray-600">مكتمل ({completedProjects})</span>
                      </div>
                  </div>
              </div>
          </div>

          {/* توزيع المشاريع حسب البرامج */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h4 className="font-bold text-primary-900 mb-6 text-right border-b pb-2 flex items-center gap-2">
                  <i className="fa-solid fa-briefcase text-secondary-gold"></i>
                  توزيع المشاريع حسب البرامج
              </h4>
              <div className="space-y-3 max-h-56 overflow-y-auto">
                  {(() => {
                      // حساب توزيع المشاريع حسب البرامج
                      const programStats = {};
                      projects.forEach(p => {
                          const program = p.data?.projectInfo?.program || p.programName || 'غير محدد';
                          programStats[program] = (programStats[program] || 0) + 1;
                      });
                      
                      // ترتيب البرامج حسب عدد المشاريع
                      const sortedPrograms = Object.entries(programStats)
                          .sort((a, b) => b[1] - a[1])
                          .slice(0, 8); // أعلى 8 برامج
                      
                      const maxCount = Math.max(...sortedPrograms.map(([, count]) => count), 1);
                      
                      return sortedPrograms.map(([program, count], index) => {
                          const percentage = (count / totalProjects * 100).toFixed(1);
                          const barWidth = (count / maxCount * 100).toFixed(1);
                          
                          const colors = [
                              'bg-primary-600',
                              'bg-secondary-gold',
                              'bg-blue-500',
                              'bg-indigo-500',
                              'bg-purple-500',
                              'bg-pink-500',
                              'bg-green-500',
                              'bg-orange-500'
                          ];
                          
                          const color = colors[index % colors.length];
                          
                          return (
                              <div key={index} className="group">
                                  <div className="flex items-center justify-between mb-1.5">
                                      <span className="text-xs font-medium text-gray-700 truncate flex-1 ml-2">
                                          {program}
                                      </span>
                                      <span className="text-xs font-bold text-gray-900 whitespace-nowrap">
                                          {count} ({percentage}%)
                                      </span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                                      <div 
                                          className={`${color} h-2.5 rounded-full transition-all duration-700 group-hover:opacity-80`}
                                          style={{ width: `${barWidth}%` }}
                                      ></div>
                                  </div>
                              </div>
                          );
                      });
                  })()}
              </div>
          </div>

      </div>
    </div>
  );
};

export default DashboardStats;