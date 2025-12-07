'use client';
import React, { useState } from 'react';
import { FileText, X, Info, Save } from 'lucide-react';

export default function CharterModal({ project, onClose, onSave }: any) {
  const [data, setData] = useState({
    name: project.name,
    desc: project.description,
    manager: project.charterData?.projectManager || '',
    strategicObj: project.charterData?.strategicObj || '',
    strategicRes: project.charterData?.strategicRes || '',
    portfolio: project.charterData?.portfolio || '',
    portfolioManager: project.charterData?.portfolioManager || '',
    progName: project.charterData?.programName || '',
    progManager: project.charterData?.programManager || '',
    dependencies: project.charterData?.dependencies || '',
    techCommittee: project.charterData?.techCommittee || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if(!data.name || !data.manager || !data.portfolio) {
      alert("يرجى تعبئة الحقول الأساسية");
      return;
    }
    onSave({
      projectManager: data.manager,
      strategicObj: data.strategicObj,
      strategicRes: data.strategicRes,
      programName: data.progName,
      programManager: data.progManager,
      portfolio: data.portfolio,
      portfolioManager: data.portfolioManager,
      dependencies: data.dependencies,
      techCommittee: data.techCommittee
    });
  };

  return (
    <div className="fixed inset-0 bg-[#003319]/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl h-auto max-h-[90vh] flex flex-col border-t-8 border-[#006C35]">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-[#f2fcf5] rounded-t-lg">
          <h2 className="text-2xl font-bold text-[#004d25] flex items-center gap-2">
            <FileText className="text-[#C5A96F]" /> بطاقة ميثاق المشروع (Charter)
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-red-600 transition"><X /></button>
        </div>
        <div className="p-8 overflow-y-auto custom-scrollbar space-y-8 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="col-span-full border-b border-gray-100 pb-6">
              <h3 className="text-lg font-bold text-[#006C35] mb-4 border-r-4 border-[#C5A96F] pr-3">معلومات المشروع الأساسية</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">اسم المشروع</label>
                  <input name="name" value={data.name} onChange={handleChange} className="w-full p-3 bg-white border border-gray-300 rounded-lg outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">مدير المشروع</label>
                  <input name="manager" value={data.manager} onChange={handleChange} className="w-full p-3 bg-white border border-gray-300 rounded-lg outline-none" />
                </div>
                <div className="col-span-full">
                  <label className="block text-sm font-bold text-gray-700 mb-1">وصف المشروع</label>
                  <textarea name="desc" value={data.desc} onChange={handleChange} rows={3} className="w-full p-3 bg-white border border-gray-300 rounded-lg outline-none"></textarea>
                </div>
              </div>
            </div>

            <div className="col-span-full border-b border-gray-100 pb-6">
              <h3 className="text-lg font-bold text-[#006C35] mb-4 border-r-4 border-[#C5A96F] pr-3">المواءمة الاستراتيجية</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><label className="block text-sm font-bold text-gray-700 mb-1">الهدف الاستراتيجي</label><input name="strategicObj" value={data.strategicObj} onChange={handleChange} className="w-full p-3 bg-white border border-gray-300 rounded-lg outline-none" /></div>
                <div><label className="block text-sm font-bold text-gray-700 mb-1">النتيجة الاستراتيجية</label><input name="strategicRes" value={data.strategicRes} onChange={handleChange} className="w-full p-3 bg-white border border-gray-300 rounded-lg outline-none" /></div>
              </div>
            </div>

            <div className="col-span-full border-b border-gray-100 pb-6">
              <h3 className="text-lg font-bold text-[#006C35] mb-4 border-r-4 border-[#C5A96F] pr-3">البرنامج والمحفظة</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">المحفظة</label>
                  <select name="portfolio" value={data.portfolio} onChange={handleChange} className="w-full p-3 bg-white border border-gray-300 rounded-lg outline-none">
                    <option value="">اختر المحفظة...</option>
                    <option value="الشؤون الصحية">الشؤون الصحية</option>
                    <option value="الشؤون التنفيذية">الشؤون التنفيذية</option>
                    <option value="الشؤون العسكرية">الشؤون العسكرية</option>
                  </select>
                </div>
                <div><label className="block text-sm font-bold text-gray-700 mb-1">مدير المحفظة</label><input name="portfolioManager" value={data.portfolioManager} onChange={handleChange} className="w-full p-3 bg-white border border-gray-300 rounded-lg outline-none" /></div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">اسم البرنامج</label>
                  <select name="progName" value={data.progName} onChange={handleChange} className="w-full p-3 bg-white border border-gray-300 rounded-lg outline-none">
                    <option value="">اختر البرنامج...</option>
                    <option value="برنامج التحول الرقمي">برنامج التحول الرقمي</option>
                    <option value="برنامج تطوير الكفاءات">برنامج تطوير الكفاءات</option>
                    <option value="برنامج البنية التحتية">برنامج البنية التحتية</option>
                  </select>
                </div>
                <div><label className="block text-sm font-bold text-gray-700 mb-1">مدير البرنامج</label><input name="progManager" value={data.progManager} onChange={handleChange} className="w-full p-3 bg-white border border-gray-300 rounded-lg outline-none" /></div>
              </div>
            </div>
            <div className="col-span-full"><h3 className="text-lg font-bold text-[#006C35] mb-4 border-r-4 border-[#C5A96F] pr-3">تفاصيل إضافية</h3>
              <div className="grid grid-cols-1 gap-6">
                <div><label className="block text-sm font-bold text-gray-700 mb-1">أبرز الاعتماديات (Dependencies)</label><textarea name="dependencies" value={data.dependencies} onChange={handleChange} rows={2} className="w-full p-3 bg-white border border-gray-300 rounded-lg outline-none"></textarea></div>
                <div><label className="block text-sm font-bold text-gray-700 mb-1">أعضاء اللجنة الفنية</label><textarea name="techCommittee" value={data.techCommittee} onChange={handleChange} rows={2} className="w-full p-3 bg-white border border-gray-300 rounded-lg outline-none"></textarea></div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-xl flex justify-between items-center">
          <span className="text-xs text-gray-500 font-bold flex items-center gap-1"><Info size={14} className="text-[#C5A96F]" /> يجب تعبئة جميع الحقول</span>
          <button onClick={handleSave} className="px-8 py-3 bg-[#006C35] hover:bg-[#004d25] text-white rounded-lg font-bold shadow-md transition flex items-center gap-2">
            <Save size={18} /> حفظ البيانات
          </button>
        </div>
      </div>
    </div>
  );
}