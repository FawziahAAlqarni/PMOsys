import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  colorClass: string;
  bgClass: string;
}

export default function StatCard({ title, value, icon, colorClass, bgClass }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm font-bold mb-1">{title}</p>
        <h3 className={`text-4xl font-extrabold ${colorClass}`}>{value}</h3>
      </div>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${bgClass} ${colorClass} border border-opacity-20 border-current`}>
        {icon}
      </div>
    </div>
  );
}