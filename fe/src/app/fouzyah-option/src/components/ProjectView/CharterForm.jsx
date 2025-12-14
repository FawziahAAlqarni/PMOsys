import React, { useState } from 'react';

const CharterForm = ({ project, onUpdate }) => {
  const [data, setData] = useState(project.charter || { stratObj: '', stratRes: '', budget: '', scope: '', sponsor: '', progMgr: '' });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const save = () => {
    onUpdate({ ...project, charter: data });
    alert("✅ تم حفظ ميثاق المشروع بنجاح");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-primary-900">ميثاق المشروع (Project Charter)</h3>
            <button onClick={save} className="bg-primary-600 text-white px-6 py-2 rounded-lg font-bold shadow hover:bg-primary-700"><i className="fa-solid fa-save ml-2"></i>حفظ التعديلات</button>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. التوافق الاستراتيجي */}
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 col-span-2 md:col-span-2">
                <h4 className="font-bold text-secondary-gold mb-3 border-b pb-2">1. التوافق الاستراتيجي</h4>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">الهدف الاستراتيجي</label>
                        <input name="stratObj" value={data.stratObj} onChange={handleChange} className="w-full p-2.5 border rounded-lg text-sm bg-white" placeholder="الهدف..." />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">النتيجة الاستراتيجية</label>
                        <input name="stratRes" value={data.stratRes} onChange={handleChange} className="w-full p-2.5 border rounded-lg text-sm bg-white" placeholder="النتيجة..." />
                    </div>
                </div>
            </div>

            {/* 2. النطاق والمالية */}
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                <h4 className="font-bold text-secondary-gold mb-3 border-b pb-2">2. النطاق والمالية</h4>
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">الميزانية المعتمدة (ر.س)</label>
                        <input type="number" name="budget" value={data.budget} onChange={handleChange} className="w-full p-2.5 border rounded-lg text-sm bg-white" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">نطاق العمل</label>
                        <textarea name="scope" rows="4" value={data.scope} onChange={handleChange} className="w-full p-2.5 border rounded-lg text-sm bg-white" placeholder="وصف النطاق..."></textarea>
                    </div>
                </div>
            </div>

            {/* 3. أصحاب المصلحة */}
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                <h4 className="font-bold text-secondary-gold mb-3 border-b pb-2">3. أصحاب المصلحة</h4>
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">راعي المشروع (Sponsor)</label>
                        <input name="sponsor" value={data.sponsor} onChange={handleChange} className="w-full p-2.5 border rounded-lg text-sm bg-white" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">مدير البرنامج</label>
                        <input name="progMgr" value={data.progMgr} onChange={handleChange} className="w-full p-2.5 border rounded-lg text-sm bg-white" />
                    </div>
                </div>
            </div>
        </form>
    </div>
  );
};

export default CharterForm;