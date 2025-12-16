import React, { useContext } from 'react';
import { ProjectContext } from '../../context/ProjectContext';
import DashboardStats from '../Dashboard/DashboardStats';

const StatisticsPage = ({ onNavigate }) => {
  const { projects } = useContext(ProjectContext);

  // حساب إحصائيات إضافية
  const completedProjects = projects.filter(p => p.stage === 5 || p.status === 'completed').length;
  const activeProjects = projects.filter(p => p.stage >= 1 && p.stage <= 4).length;
  const totalBudget = projects.reduce((sum, p) => sum + (Number(p.estimatedBudget) || 0), 0);
  const avgBudget = projects.length > 0 ? totalBudget / projects.length : 0;

  // توزيع المشاريع حسب البوابات
  const gateDistribution = [
    { gate: 'المرحلة 1', count: projects.filter(p => p.stage === 1).length, color: 'bg-blue-500' },
    { gate: 'المرحلة 2', count: projects.filter(p => p.stage === 2).length, color: 'bg-green-500' },
    { gate: 'المرحلة 3', count: projects.filter(p => p.stage === 3).length, color: 'bg-yellow-500' },
    { gate: 'المرحلة 4', count: projects.filter(p => p.stage === 4).length, color: 'bg-pink-500' },
    { gate: 'المرحلة 5', count: projects.filter(p => p.stage === 5).length, color: 'bg-purple-500' },
    { gate: 'مكتمل', count: completedProjects, color: 'bg-green-500' }
  ];

  // توزيع المشاريع حسب المحافظ
  const portfolioStats = {};
  projects.forEach(p => {
    const portfolio = p.data?.projectInfo?.portfolio || 'غير محدد';
    portfolioStats[portfolio] = (portfolioStats[portfolio] || 0) + 1;
  });

  // إحصائيات المخاطر
  const totalRisks = projects.reduce((sum, p) => sum + (p.risks?.length || 0), 0);
  const highRisks = projects.reduce((sum, p) => {
    return sum + (p.risks?.filter(r => r.severity === 'high').length || 0);
  }, 0);

  return (
    <div className="min-h-screen">
      {/* العنوان الرئيسي */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary-900 mb-2">
              <i className="fa-solid fa-chart-line ml-2"></i>
              لوحة المعلومات والإحصائيات
            </h1>
            <p className="text-gray-600">نظرة شاملة على أداء المحفظة والمخاطر</p>
          </div>
          <button
            onClick={() => onNavigate('dashboard')}
            className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg border border-gray-200 font-semibold transition flex items-center gap-2 shadow-sm"
          >
            <i className="fa-solid fa-arrow-right"></i>
            العودة للرئيسية
          </button>
        </div>
      </div>

      {/* الإحصائيات الرئيسية */}
      <div className="mb-8">
        <DashboardStats projects={projects} />
      </div>

      {/* صف الإحصائيات الإضافية */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* المشاريع النشطة */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <i className="fa-solid fa-rocket text-blue-600 text-2xl"></i>
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">المشاريع النشطة</h3>
          <p className="text-3xl font-bold text-gray-900">{activeProjects}</p>
        </div>

        {/* المشاريع المكتملة */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <i className="fa-solid fa-circle-check text-green-600 text-2xl"></i>
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">المشاريع المكتملة</h3>
          <p className="text-3xl font-bold text-gray-900">{completedProjects}</p>
        </div>

        {/* إجمالي المخاطر */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-red-100 p-3 rounded-lg">
              <i className="fa-solid fa-shield-halved text-red-600 text-2xl"></i>
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">إجمالي المخاطر</h3>
          <p className="text-3xl font-bold text-gray-900">{totalRisks}</p>
          <p className="text-xs text-red-600 mt-1">
            <i className="fa-solid fa-triangle-exclamation ml-1"></i>
            {highRisks} مخاطر عالية
          </p>
        </div>

        {/* متوسط الميزانية */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <i className="fa-solid fa-coins text-yellow-600 text-2xl"></i>
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">متوسط الميزانية</h3>
          <p className="text-2xl font-bold text-gray-900">
            {avgBudget.toLocaleString('ar-SA', { maximumFractionDigits: 0 })}
          </p>
          <p className="text-xs text-gray-500 mt-1">ريال سعودي</p>
        </div>
      </div>

      {/* صف الرسوم البيانية */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* توزيع المشاريع حسب البوابات - Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <i className="fa-solid fa-chart-bar text-primary-600"></i>
            توزيع المشاريع حسب البوابات
          </h3>
          <div className="h-64 flex items-end justify-around gap-3 px-4 py-4 bg-gray-50 rounded-lg relative">
            {/* خطوط الشبكة الأفقية */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none px-4 py-4">
              {[0, 1, 2, 3, 4].map(i => (
                <div key={i} className="flex items-center w-full">
                  <span className="text-[9px] text-gray-400 mr-1">{(4-i)*25}%</span>
                  <div className="border-t border-gray-300 border-dashed flex-1 opacity-50"></div>
                </div>
              ))}
            </div>

            {gateDistribution.map((item, index) => {
              const maxCount = Math.max(...gateDistribution.map(g => g.count), 1);
              const height = (item.count / maxCount) * 85; // 85% من ارتفاع الحاوية
              const percentage = projects.length > 0 ? (item.count / projects.length * 100).toFixed(1) : 0;
              
              return (
                <div key={index} className="flex flex-col items-center flex-1 z-10 group relative">
                  {/* عدد المشاريع فوق العمود */}
                  <div className="absolute -top-8 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg transform scale-0 group-hover:scale-100 transition-transform">
                    <div className="font-bold">{item.count} مشروع</div>
                    <div className="text-[10px] opacity-80">{percentage}%</div>
                  </div>
                  
                  {/* العمود */}
                  <div className="relative w-full flex flex-col items-center">
                    <div className="text-sm font-bold text-gray-800 mb-1">{item.count}</div>
                    <div 
                      className={`w-full max-w-[60px] rounded-t-xl transition-all duration-700 ${item.color} shadow-lg border-2 border-opacity-50 hover:scale-105 cursor-pointer relative`} 
                      style={{ height: height < 10 ? '10%' : `${height}%` }}
                    >
                      {/* تأثير اللمعان */}
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white opacity-20 rounded-t-xl"></div>
                    </div>
                  </div>
                  
                  {/* التسمية */}
                  <div className="text-xs text-gray-700 mt-3 font-bold text-center whitespace-nowrap">
                    {item.gate}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* توزيع المشاريع حسب المحافظ */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <i className="fa-solid fa-folder-tree text-secondary-gold"></i>
            توزيع المشاريع حسب المحافظ
          </h3>
          <div className="space-y-3">
            {Object.entries(portfolioStats)
              .sort((a, b) => b[1] - a[1])
              .map(([portfolio, count], index) => {
                const percentage = projects.length > 0 ? (count / projects.length * 100).toFixed(1) : 0;
                const colors = ['bg-primary-600', 'bg-secondary-gold', 'bg-indigo-600', 'bg-purple-600', 'bg-pink-600'];
                const color = colors[index % colors.length];
                return (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${color}`}></div>
                      <span className="text-sm font-medium text-gray-700">{portfolio}</span>
                    </div>
                    <div className="text-left">
                      <span className="text-sm font-bold text-gray-900">{count}</span>
                      <span className="text-xs text-gray-500 mr-2">({percentage}%)</span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* الميزانيات */}
      <div className="mt-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <i className="fa-solid fa-sack-dollar text-green-600"></i>
          الميزانيات الإجمالية
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
            <p className="text-sm text-green-700 font-medium mb-2">إجمالي الميزانيات</p>
            <p className="text-3xl font-bold text-green-900">
              {totalBudget.toLocaleString('ar-SA')}
            </p>
            <p className="text-xs text-green-600 mt-1">ريال سعودي</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-700 font-medium mb-2">متوسط ميزانية المشروع</p>
            <p className="text-3xl font-bold text-blue-900">
              {avgBudget.toLocaleString('ar-SA', { maximumFractionDigits: 0 })}
            </p>
            <p className="text-xs text-blue-600 mt-1">ريال سعودي</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
            <p className="text-sm text-purple-700 font-medium mb-2">عدد المشاريع الممولة</p>
            <p className="text-3xl font-bold text-purple-900">
              {projects.filter(p => p.estimatedBudget > 0).length}
            </p>
            <p className="text-xs text-purple-600 mt-1">من أصل {projects.length} مشروع</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
