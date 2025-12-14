import React, { useState } from 'react';

const RiskModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '', category: 'threat', 
    prob: 3, impact: 3, 
    mitigationPlan: '', responseType: 'تخفيف (Mitigate)', 
    status: 'مفتوح (Open)', impactScope: '', subImpactScope: ''
  });

  const impactMap = {
    "الاستراتيجية": ["الحوكمة", "المستهدفات"], "المالية": ["التكاليف", "السيولة"],
    "التشغيلية": ["الإجراءات", "الموارد"], "التقنية": ["الأنظمة", "البيانات"],
    "السمعة": ["المصداقية", "العملاء"]
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = () => {
      if(!formData.title) return alert("يرجى كتابة وصف الخطر");
      onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 backdrop-blur-sm fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl border-t-8 border-red-600 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b bg-gray-50 rounded-t-xl">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <i className="fa-solid fa-shield-virus text-red-600"></i> تسجيل خطر جديد
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition"><i className="fa-solid fa-xmark text-xl"></i></button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-12 gap-4 mb-6">
                <div className="col-span-3">
                    <label className="block text-xs font-bold mb-1 text-gray-600">النوع</label>
                    <select name="category" className="w-full p-2.5 border rounded-lg bg-white focus:ring-2 focus:ring-red-500 outline-none" value={formData.category} onChange={handleChange}>
                        <option value="threat">تهديد (Threat)</option>
                        <option value="opportunity">فرصة (Opportunity)</option>
                    </select>
                </div>
                <div className="col-span-9">
                    <label className="block text-xs font-bold mb-1 text-gray-600">وصف الخطر / الفرصة</label>
                    <input name="title" className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="مثال: تأخر توريد الأجهزة..." value={formData.title} onChange={handleChange} />
                </div>
            </div>

            {/* شريط التقييم (Sliders) */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-6">
                <div className="flex justify-between items-center mb-4">
                    <div className="text-center w-24 bg-white p-2 rounded border shadow-sm">
                        <span className="block text-[10px] text-gray-400 font-bold uppercase">درجة الخطر</span>
                        <span className={`text-3xl font-bold ${formData.prob*formData.impact >= 15 ? 'text-red-600' : 'text-gray-800'}`}>{formData.prob * formData.impact}</span>
                    </div>
                    <div className="flex-1 px-6 space-y-4">
                        <div>
                            <div className="flex justify-between text-xs font-bold text-gray-600 mb-1"><span>الاحتمالية (1-5)</span><span>{formData.prob}</span></div>
                            <input type="range" name="prob" min="1" max="5" className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-red-600" value={formData.prob} onChange={handleChange} />
                        </div>
                        <div>
                            <div className="flex justify-between text-xs font-bold text-gray-600 mb-1"><span>الأثر (1-5)</span><span>{formData.impact}</span></div>
                            <input type="range" name="impact" min="1" max="5" className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-red-600" value={formData.impact} onChange={handleChange} />
                        </div>
                    </div>
                </div>
            </div>

            {/* خطة الاستجابة */}
            <div className="mb-6">
                <label className="block text-xs font-bold mb-1 text-gray-600">خطة الاستجابة (Mitigation Plan)</label>
                <textarea name="mitigationPlan" className="w-full p-3 border rounded-lg h-24 focus:ring-2 focus:ring-red-500 outline-none resize-none" placeholder="الإجراءات المخططة للتعامل مع الخطر..." value={formData.mitigationPlan} onChange={handleChange}></textarea>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-xs font-bold mb-1 text-gray-600">استراتيجية الاستجابة</label>
                    <select name="responseType" className="w-full p-2.5 border rounded-lg bg-white" value={formData.responseType} onChange={handleChange}>
                        <option>تخفيف (Mitigate)</option><option>تجنب (Avoid)</option><option>نقل (Transfer)</option><option>قبول (Accept)</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-bold mb-1 text-gray-600">الحالة</label>
                    <select name="status" className="w-full p-2.5 border rounded-lg bg-white" value={formData.status} onChange={handleChange}>
                        <option>مفتوح (Open)</option><option>مغلق (Closed)</option><option>قيد المراقبة</option>
                    </select>
                </div>
            </div>
            
             <div className="grid grid-cols-2 gap-4">
                  <div>
                      <label className="block text-xs font-bold mb-1 text-gray-600">نطاق الأثر</label>
                      <select name="impactScope" className="w-full p-2.5 border rounded-lg bg-white" value={formData.impactScope} onChange={handleChange}>
                          <option value="">-- اختر --</option>
                          {Object.keys(impactMap).map(k=><option key={k} value={k}>{k}</option>)}
                      </select>
                  </div>
                  <div>
                      <label className="block text-xs font-bold mb-1 text-gray-600">النطاق الفرعي</label>
                      <select name="subImpactScope" className="w-full p-2.5 border rounded-lg bg-white" value={formData.subImpactScope} onChange={handleChange} disabled={!formData.impactScope}>
                          <option value="">-- اختر --</option>
                          {formData.impactScope && impactMap[formData.impactScope].map(s=><option key={s} value={s}>{s}</option>)}
                      </select>
                  </div>
             </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50 flex justify-end gap-3 rounded-b-2xl">
            <button onClick={onClose} className="px-6 py-2 rounded-lg text-gray-600 hover:bg-gray-200 font-bold transition">إلغاء</button>
            <button onClick={handleSubmit} className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-lg font-bold transition transform active:scale-95 flex items-center gap-2">
                <i className="fa-solid fa-plus"></i> إضافة للقائمة
            </button>
        </div>
      </div>
    </div>
  );
};

export default RiskModal;