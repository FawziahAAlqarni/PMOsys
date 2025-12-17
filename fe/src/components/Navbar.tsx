'use client';
import React from 'react';
import { LayoutGrid, PieChart, RotateCw } from 'lucide-react';
import NavButton from './ui/NavButton';

export default function Navbar({ currentView, setCurrentView, onReset }: any) {
  return (
    <nav className="bg-[#0d6b3a] text-white shadow-lg shrink-0 z-30 border-b-4 border-[#C5A96F]">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center p-1 shadow-md">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/68/MNGDP_LOGO_1.png"
              alt="MNGDP Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="border-r border-[#C5A96F] pr-5 mr-2">
            <h1 className="font-bold text-xl tracking-wide leading-tight">نظام إدارة مشاريع التحول</h1>
            <p className="text-xs text-[#dccc9f] font-light mt-1 tracking-wider">برنامج تطوير وزارة الحرس الوطني</p>
          </div>
        </div>
        <div className="flex gap-3">
          <NavButton
            active={currentView === 'portfolio' || currentView === 'project_details'}
            onClick={() => setCurrentView('portfolio')}
            icon={<LayoutGrid size={18} />}
            label="جميع المشاريع"
          />
          <NavButton
            active={currentView === 'analytics'}
            onClick={() => setCurrentView('analytics')}
            icon={<PieChart size={18} />}
            label="الإحصائيات"
          />
          <div className="h-8 w-px bg-[#C5A96F]/30 mx-2 self-center"></div>
          <button
            onClick={onReset}
            className="w-10 h-10 rounded-lg hover:bg-red-500/20 text-red-200 hover:text-white transition flex items-center justify-center"
            title="إعادة تعيين النظام"
          >
            <RotateCw size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
}