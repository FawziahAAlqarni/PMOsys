import React, { useState } from 'react';

const RiskRegisterModal = ({ risks, onClose, onUpdate }) => {
  const [showForm, setShowForm] = useState(false);
  const [newRisk, setNewRisk] = useState({ 
      title: '', category: 'threat', prob: 3, impact: 3, 
      responseType: 'تخفيف', mitigationPlan: '', 
      impactScope: '', subImpactScope: '', status: 'نشط' 
  });

  const impactMap = { "الاستراتيجية": ["الحوكمة", "المستهدفات", "الثقافة"], "المالية": ["التكاليف التشغيلية", "التكاليف الرأسمالية","الإستثمار","السيولةالنقدية"], "التشغيلية": ["الإجراءات", "ادارة الموردين", "إدارة المشاريع", "الكوارث البيئية"], "القدرات": ["المنظمة", "التدريب", "المنشأة", "القيادة"], "الالتزام": ["التشريعات", "الاجراءات"], "التقنية والبيانات": ["الاصول المعلوماتية والتقنية", "تهديدات سيبرانية", "استمرارية الاعمال", "انقطاع الخدمة"], "السمعة": ["المصداقية", "الفساد"], "الاشخاص": ["تعيين الموظفين", "انهاء الخدمة", "تطوير الموظفين", "اصحاب المصلحة"] };
  const strategies = { threat: ['تجنب', 'نقل', 'تخفيف', 'قبول'], opportunity: ['استغلال', 'مشاركة', 'تحسين', 'قبول'] };

  const handleAdd = () => {
      if(!newRisk.title) return alert("العنوان مطلوب");
      const updatedRisks = [...risks, { ...newRisk, id: Date.now() }];
      onUpdate(updatedRisks);
      setNewRisk({ title: '', category: 'threat', prob: 3, impact: 3, responseType: 'تخفيف', mitigationPlan: '', impactScope: '', subImpactScope: '', status: 'نشط' });
      setShowForm(false);
  };

  const handleDelete = (id) => {
      if(window.confirm("حذف السجل؟")) onUpdate(risks.filter(r => r.id !== id));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm fade-in">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto p-6 border-t-8 border-red-600">
        
        <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <i className="fa-solid fa-shield-virus text-red-600"></i> سجل المخاطر (Risk Register)
            </h3>
            <button onClick={onClose}><i className="fa-solid fa-xmark text-gray-400 hover:text-red-600 text-xl"></i></button>
        </div>

        {/* زر الإضافة */}
        {!showForm && (
            <div className="mb-6 flex justify-end">
                <button onClick={() => setShowForm(true)} className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold shadow hover:bg-red-700 flex items-center gap-2">
                    <i className="fa-solid fa-plus"></i> إضافة خطر / فرصة
                </button>
            </div>
        )}

        {/* فورم الإضافة */}
        {showForm && (
            <div className="bg-gray-50 p-6 rounded-xl border border-red-200 mb-6 animate-fade-in">
                <h4 className="font-bold text-red-800 mb-4 border-b pb-2">بيانات السجل الجديد</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div className="md:col-span-2">
                        <label className="block text-xs font-bold mb-1">العنوان</label>
                        <input className="w-full p-2 border rounded text-sm" value={newRisk.title} onChange={e=>setNewRisk({...newRisk, title:e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-xs font-bold mb-1">النوع</label>
                        <select className="w-full p-2 border rounded text-sm" value={newRisk.category} onChange={e=>setNewRisk({...newRisk, category:e.target.value})}><option value="threat">تهديد</option><option value="opportunity">فرصة</option></select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold mb-1">الاستجابة</label>
                        <select className="w-full p-2 border rounded text-sm" value={newRisk.responseType} onChange={e=>setNewRisk({...newRisk, responseType:e.target.value})}><option value="">اختر...</option>{strategies[newRisk.category].map(s=><option key={s} value={s}>{s}</option>)}</select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold mb-1">نطاق الأثر</label>
                        <select className="w-full p-2 border rounded text-sm" value={newRisk.impactScope} onChange={e=>setNewRisk({...newRisk, impactScope:e.target.value, subImpactScope:''})}><option value="">اختر...</option>{Object.keys(impactMap).map(k=><option key={k} value={k}>{k}</option>)}</select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold mb-1">النطاق الفرعي</label>
                        <select className="w-full p-2 border rounded text-sm" value={newRisk.subImpactScope} onChange={e=>setNewRisk({...newRisk, subImpactScope:e.target.value})} disabled={!newRisk.impactScope}><option value="">اختر...</option>{newRisk.impactScope && impactMap[newRisk.impactScope].map(s=><option key={s} value={s}>{s}</option>)}</select>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-xs font-bold mb-1">خطة التخفيف</label>
                        <input className="w-full p-2 border rounded text-sm" value={newRisk.mitigationPlan} onChange={e=>setNewRisk({...newRisk, mitigationPlan:e.target.value})} />
                    </div>
                    <div className="flex gap-2 bg-white p-2 rounded border">
                        <div className="flex-1"><label className="block text-[10px] font-bold text-gray-500">احتمالية (1-5)</label><input type="number" min="1" max="5" className="w-full border rounded text-center font-bold" value={newRisk.prob} onChange={e=>setNewRisk({...newRisk, prob:e.target.value})} /></div>
                        <div className="flex-1"><label className="block text-[10px] font-bold text-gray-500">تأثير (1-5)</label><input type="number" min="1" max="5" className="w-full border rounded text-center font-bold" value={newRisk.impact} onChange={e=>setNewRisk({...newRisk, impact:e.target.value})} /></div>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={handleAdd} className="bg-primary-600 text-white px-4 py-2 rounded font-bold flex-1">حفظ</button>
                        <button onClick={()=>setShowForm(false)} className="bg-gray-200 text-gray-600 px-4 py-2 rounded font-bold">إلغاء</button>
                    </div>
                </div>
            </div>
        )}

        {/* الجدول */}
        <div className="overflow-x-auto border rounded-lg">
            <table className="w-full text-sm text-right bg-white">
                <thead className="bg-gray-100 text-gray-700">
                    <tr>
                        <th className="p-3">#</th>
                        <th className="p-3">الخطر / الفرصة</th>
                        <th className="p-3">التصنيف</th>
                        <th className="p-3">التقييم (P×I)</th>
                        <th className="p-3">النطاق</th>
                        <th className="p-3">الاستجابة</th>
                        <th className="p-3">الخطة</th>
                        <th className="p-3"></th>
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {risks.map((r, i) => (
                        <tr key={r.id} className="hover:bg-gray-50">
                            <td className="p-3 font-bold text-gray-500">{i+1}</td>
                            <td className="p-3 font-bold">{r.title}</td>
                            <td className="p-3"><span className={`px-2 py-1 rounded text-xs font-bold ${r.category==='threat'?'bg-red-50 text-red-600':'bg-green-50 text-green-600'}`}>{r.category==='threat'?'تهديد':'فرصة'}</span></td>
                            <td className="p-3"><span className={`font-mono font-bold px-2 py-1 rounded ${r.prob*r.impact>=15?'bg-red-100 text-red-800':'bg-gray-100'}`}>{r.prob * r.impact}</span></td>
                            <td className="p-3 text-xs">{r.impactScope} - {r.subImpactScope}</td>
                            <td className="p-3 text-xs">{r.responseType}</td>
                            <td className="p-3 text-xs text-gray-600 max-w-xs truncate">{r.mitigationPlan}</td>
                            <td className="p-3 text-center"><i className="fa-solid fa-trash text-red-300 hover:text-red-500 cursor-pointer" onClick={()=>handleDelete(r.id)}></i></td>
                        </tr>
                    ))}
                    {risks.length === 0 && <tr><td colSpan="8" className="p-8 text-center text-gray-400">لا توجد مخاطر مسجلة. اضغط زر الإضافة للبدء.</td></tr>}
                </tbody>
            </table>
        </div>

        <div className="mt-6 pt-4 border-t flex justify-end">
            <button onClick={onClose} className="bg-primary-600 text-white px-8 py-2 rounded font-bold shadow">إغلاق</button>
        </div>

      </div>
    </div>
  );
};

export default RiskRegisterModal;