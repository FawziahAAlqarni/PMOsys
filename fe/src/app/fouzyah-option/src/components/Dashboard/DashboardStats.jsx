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
      
      {/* العنوان */}
      <div className="flex justify-between items-end mb-6">
        <div>
            <h2 className="text-2xl font-bold text-primary-900">لوحة المعلومات والإحصائيات</h2>
            <p className="text-sm text-gray-500">نظرة شاملة على أداء المحفظة والمخاطر</p>
        </div>
      </div>

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

          {/* توزيع البوابات (Bar Chart) */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h4 className="font-bold text-primary-900 mb-6 text-right border-b pb-2 flex items-center gap-2">
                  <i className="fa-solid fa-chart-bar text-secondary-gold"></i>
                  توزيع المشاريع حسب البوابات
              </h4>
              <div className="h-56 flex items-end justify-around gap-3 px-4 py-4 bg-gray-50 rounded-lg relative">
                  {/* خطوط الشبكة الأفقية */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none px-4 py-4">
                      {[0, 1, 2, 3, 4].map(i => (
                          <div key={i} className="flex items-center w-full">
                              <span className="text-[9px] text-gray-400 mr-1">{(4-i)*25}%</span>
                              <div className="border-t border-gray-300 border-dashed flex-1 opacity-50"></div>
                          </div>
                      ))}
                  </div>

                  {gateCounts.map((count, index) => {
                      const maxCount = Math.max(...gateCounts, 1);
                      const height = (count / maxCount) * 85; // 85% من ارتفاع الحاوية
                      
                      const colors = {
                          0: { bg: 'bg-blue-500', shadow: 'shadow-blue-200', border: 'border-blue-600' },
                          1: { bg: 'bg-orange-500', shadow: 'shadow-orange-200', border: 'border-orange-600' },
                          2: { bg: 'bg-secondary-gold', shadow: 'shadow-yellow-200', border: 'border-yellow-600' },
                          3: { bg: 'bg-green-400', shadow: 'shadow-green-200', border: 'border-green-500' },
                          4: { bg: 'bg-green-700', shadow: 'shadow-green-300', border: 'border-green-800' }
                      };
                      
                      const color = colors[index];
                      const gateLabel = index === 4 ? 'مغلق' : `البوابة ${index + 1}`;
                      
                      return (
                          <div key={index} className="flex flex-col items-center flex-1 z-10 group relative">
                              {/* عدد المشاريع فوق العمود */}
                              <div className="absolute -top-8 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg transform scale-0 group-hover:scale-100 transition-transform">
                                  <div className="font-bold">{count}</div>
                                  <div className="text-[10px] opacity-80">مشروع</div>
                              </div>
                              
                              {/* العمود */}
                              <div className="relative w-full flex flex-col items-center">
                                  <div className="text-sm font-bold text-gray-800 mb-1">{count}</div>
                                  <div 
                                    className={`w-full max-w-[50px] rounded-t-xl transition-all duration-700 ${color.bg} ${color.shadow} shadow-lg border-2 ${color.border} hover:scale-105 cursor-pointer relative`} 
                                    style={{ height: height < 10 ? '10%' : `${height}%` }}
                                  >
                                      {/* تأثير اللمعان */}
                                      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white opacity-20 rounded-t-xl"></div>
                                  </div>
                              </div>
                              
                              {/* التسمية */}
                              <div className="text-xs text-gray-700 mt-3 font-bold text-center whitespace-nowrap">
                                  {gateLabel}
                              </div>
                          </div>
                      );
                  })}
              </div>
              
              {/* مفتاح الألوان */}
              <div className="mt-4 pt-4 border-t flex flex-wrap justify-center gap-3">
                  <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded bg-blue-500"></div>
                      <span className="text-[10px] text-gray-600">البوابة 1</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded bg-orange-500"></div>
                      <span className="text-[10px] text-gray-600">البوابة 2</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded bg-secondary-gold"></div>
                      <span className="text-[10px] text-gray-600">البوابة 3</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded bg-green-400"></div>
                      <span className="text-[10px] text-gray-600">البوابة 4</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded bg-green-700"></div>
                      <span className="text-[10px] text-gray-600">مغلق</span>
                  </div>
              </div>
          </div>

      </div>
    </div>
  );
};

export default DashboardStats;