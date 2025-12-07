'use client';
import React from 'react';
import { Plus, ArrowLeft } from 'lucide-react';

export default function PortfolioView({ projects, onOpenNewProject, onSelectProject }: any) {
  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <div className="flex justify-between items-end mb-10 border-b border-gray-200 pb-4">
        <div>
          <h2 className="text-3xl font-extrabold text-[#004d25]">جميع المشاريع</h2>
          <p className="text-gray-500 mt-2 font-medium">متابعة المبادرات الاستراتيجية</p>
        </div>
        <button
          onClick={onOpenNewProject}
          className="bg-[#006C35] hover:bg-[#004d25] text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 font-bold transition transform active:scale-95"
        >
          <Plus size={20} /> إضافة مبادرة
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="col-span-full py-24 text-center border-4 border-dashed border-gray-200 rounded-3xl opacity-60">
          <h3 className="text-xl font-bold text-gray-400">لا توجد مشاريع</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p: any) => {
            const isFinished = p.currentGateIndex >= 4;
            const gateName = isFinished ? "مكتمل" : p.gates[p.currentGateIndex].name;
            const progress = Math.round((p.currentGateIndex / 4) * 100);

            return (
              <div
                key={p.id}
                onClick={() => onSelectProject(p.id)}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg border border-gray-100 hover:border-[#006C35]/20 hover:-translate-y-1 transition-all cursor-pointer group relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-1.5 h-full ${isFinished ? 'bg-[#C5A96F]' : 'bg-[#006C35]'}`}></div>
                <div className="flex justify-between mb-4 pl-2">
                  <span className="bg-[#f2fcf5] text-[#004d25] text-xs font-bold px-3 py-1 rounded-full border border-[#e1f8e8]">{gateName}</span>
                </div>
                <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-1 group-hover:text-[#006C35] transition">{p.name}</h3>
                <p className="text-sm text-gray-500 mb-6 line-clamp-2 min-h-[40px]">{p.description}</p>
                <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden mb-4">
                  <div className="bg-[#C5A96F] h-full" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-400 font-medium">
                  <span>{isFinished ? '100%' : `${progress}%`} إنجاز</span>
                  <span className="group-hover:text-[#006C35] flex items-center gap-1 transition">
                    <ArrowLeft size={14} /> التفاصيل
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}