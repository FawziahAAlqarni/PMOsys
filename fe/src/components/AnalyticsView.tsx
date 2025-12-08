'use client';
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { FolderOpen, CheckCheck, AlertTriangle, Flame } from 'lucide-react';
import StatCard from './ui/StatCard';
import { TOTAL_GATES, HIGH_RISK_THRESHOLD } from '@/lib/constants';
import type { AnalyticsViewProps } from '@/types';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

export default function AnalyticsView({ projects }: AnalyticsViewProps) {
  const totalProjects = projects.length;
  const completedProjects = projects.filter(p => p.currentGateIndex >= TOTAL_GATES).length;
  const activeProjects = totalProjects - completedProjects;

  let totalRisks = 0;
  let highRisks = 0;
  const gateCounts = new Array(TOTAL_GATES).fill(0);

  projects.forEach(p => {
    if (p.risks) {
      totalRisks += p.risks.length;
      highRisks += p.risks.filter((r) => (r.probability * r.impact) >= HIGH_RISK_THRESHOLD).length;
    }
    if (p.currentGateIndex < TOTAL_GATES) {
      gateCounts[p.currentGateIndex]++;
    }
  });

  const barData = {
    labels: ['البوابة 1', 'البوابة 2', 'البوابة 3', 'البوابة 4'],
    datasets: [{
      label: 'عدد المشاريع',
      data: gateCounts,
      backgroundColor: '#006C35',
      borderRadius: 4,
    }]
  };

  const doughnutData = {
    labels: ['نشط', 'مكتمل'],
    datasets: [{
      data: [activeProjects, completedProjects],
      backgroundColor: ['#C5A96F', '#006C35'],
      borderWidth: 0,
    }]
  };

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <h2 className="text-3xl font-extrabold text-[#004d25] mb-2">لوحة المعلومات والإحصائيات</h2>
      <p className="text-gray-500 mb-10 font-medium">نظرة شاملة على أداء المحفظة والمخاطر</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <StatCard title="إجمالي المشاريع" value={totalProjects} icon={<FolderOpen />} colorClass="text-[#006C35]" bgClass="bg-[#f2fcf5]" />
        <StatCard title="المشاريع المكتملة" value={completedProjects} icon={<CheckCheck />} colorClass="text-[#C5A96F]" bgClass="bg-[#f9f5eb]" />
        <StatCard title="إجمالي المخاطر" value={totalRisks} icon={<AlertTriangle />} colorClass="text-red-600" bgClass="bg-red-50" />
        <StatCard title="مخاطر عالية" value={highRisks} icon={<Flame />} colorClass="text-red-800" bgClass="bg-red-100" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2">توزيع المشاريع حسب البوابات</h3>
          <div className="h-64 relative">
            <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2">حالة المشاريع</h3>
          <div className="h-64 relative flex justify-center">
            <Doughnut data={doughnutData} options={{ responsive: true, maintainAspectRatio: false, cutout: '75%', plugins: { legend: { position: 'bottom' } } }} />
          </div>
        </div>
      </div>
    </div>
  );
}