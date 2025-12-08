'use client';
import React, { useState } from 'react';
import { Target } from 'lucide-react';

export default function NewProjectModal({ onClose, onCreate }: { onClose: () => void, onCreate: (name: string, desc: string) => void }) {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  return (
    <div className="fixed inset-0 bg-[#003319]/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl p-8 border-t-8 border-[#C5A96F]">
        <h2 className="text-2xl font-bold mb-6 text-[#004d25] flex items-center gap-3">
          <Target className="text-[#C5A96F]" /> مبادرة استراتيجية جديدة
        </h2>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">اسم المبادرة المبدئي</label>
            <input
              value={name} onChange={e => setName(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#006C35] focus:border-[#006C35] outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">الهدف العام</label>
            <textarea
              value={desc} onChange={e => setDesc(e.target.value)}
              rows={3}
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#006C35] focus:border-[#006C35] outline-none"
            ></textarea>
          </div>
        </div>
        <div className="mt-8 flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-2 rounded-lg hover:bg-gray-100 font-bold text-gray-600">إلغاء</button>
          <button
            onClick={() => { if(name) onCreate(name, desc); }}
            className="px-6 py-2 bg-[#006C35] text-white rounded-lg font-bold shadow-lg hover:bg-[#004d25]"
          >
            إنشاء
          </button>
        </div>
      </div>
    </div>
  );
}