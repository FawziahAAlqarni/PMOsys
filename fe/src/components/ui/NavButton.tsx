import React from 'react';
import type { NavButtonProps } from '@/types';

export default function NavButton({ active, onClick, icon, label }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2.5 rounded-lg transition flex items-center gap-2 font-medium border ${
        active
          ? 'bg-white/10 border-[#C5A96F]/50 text-white'
          : 'border-transparent hover:bg-white/5 hover:border-[#C5A96F]/30 text-white/80'
      }`}
    >
      <span className={active ? 'text-[#C5A96F]' : ''}>{icon}</span>
      {label}
    </button>
  );
}