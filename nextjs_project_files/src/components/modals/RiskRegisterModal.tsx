'use client';
import React, { useState, useMemo } from 'react';
import { ShieldAlert, X, Plus, List, TrendingUp } from 'lucide-react';

export default function RiskRegisterModal({ project, onClose, onSaveRisks }: any) {
  const [risks, setRisks] = useState(project.risks || []);
  const [selectedRiskId, setSelectedRiskId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const getEmptyRiskForm = () => ({
    title: '', desc: '', scope: '', subScope: '', type: 'Threat', response: 'Mitigate',
    prob: 1, impact: 1, mitigation: '', phase: 'Elaboration', status: 'Open',
    indicator: '', indDate: '', isChallenge: false
  });

  const [formData, setFormData] = useState(getEmptyRiskForm());

  const subScopeOptions = useMemo(() => {
    const main = formData.scope;
    if(main === 'الاستراتيجية') return ['تغير في الأولويات', 'عدم وضوح الأهداف'];
    if(main === 'المالية') return ['تجاوز الميزانية', 'تأخر التمويل', 'تغير أسعار الصرف'];
    if(main === 'القدرات') return ['نقص الكوادر', 'نقص المهارات'];
    if(main === 'التشغيلية') return ['تعطل الأنظمة', 'تأخر الموردين'];
    if(main === 'الالتزام') return ['تغير التشريعات', 'عدم الامتثال'];
    if(main === 'التقنية والبيانات') return ['فقدان بيانات', 'اختراق أمني'];
    if(main === 'السمعة') return ['تغطية إعلامية سلبية', 'شكاوى المستفيدين'];
    if(main === 'الأشخاص') return ['دوران وظيفي', 'ضعف الأداء'];
    return ['عام'];
  }, [formData.scope]);

  const handlePrepareNew = () => {
    setFormData(getEmptyRiskForm());
    setSelectedRiskId(null);
    setIsEditing(true);
  };

  const handleEdit = (risk: any) => {
    setFormData({
      title: risk.title, desc: risk.description, scope: risk.impactScope, subScope: risk.subImpactScope,
      type: risk.type, response: risk.responseType, prob: risk.probability, impact: risk.impact,
      mitigation: risk.mitigationPlan, phase: risk.phase, status: risk.status,
      indicator: risk.occurrenceIndicator, indDate: risk.occurrenceDate, isChallenge: risk.isChallenge
    });
    setSelectedRiskId(risk.id);
    setIsEditing(true);
  };

  const handleSaveForm = () => {
    if(!formData.title) { alert("العنوان مطلوب"); return; }

    const riskObj = {
      id: selectedRiskId || Date.now(),
      title: formData.title,
      description: formData.desc,
      impactScope: formData.scope,
      subImpactScope: formData.subScope,
      type: formData.type,
      responseType: formData.response,
      probability: Number(formData.prob),
      impact: Number(formData.impact),
      mitigationPlan: formData.mitigation,
      phase: formData.phase,
      status: formData.status,
      occurrenceIndicator: formData.indicator,
      occurrenceDate: formData.indDate,
      isChallenge: formData.isChallenge
    };

    let updatedRisks;
    if (selectedRiskId) {
      updatedRisks = risks.map((r: any) => r.id === selectedRiskId ? riskObj : r);
    } else {
      updatedRisks = [...risks, riskObj];
    }
    setRisks(updatedRisks);
    onSaveRisks(updatedRisks);
    setIsEditing(false);
    setSelectedRiskId(null);
  };

  const handleConvertToChallenge = () => {
    if (confirm("هل أنت متأكد من تحويل الخطر إلى تحدي؟")) {
      setFormData({ ...formData, isChallenge: true });
    }
  };

  const score = formData.prob * formData.impact;

  return (
    <div className="fixed inset-0 bg-[#003319]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-6xl rounded-xl shadow-2xl h-[90vh] flex flex-col border-t-8 border-red-700">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-red-600">
              <ShieldAlert />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">سجل المخاطر (Risk Register)</h2>
              <p className="text-xs text-gray-500">{project.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-red-600 transition"><X /></button>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          {/* List Sidebar */}
          <div className="w-full md:w-1/3 border-l border-gray-200 flex flex-col bg-gray-50/50">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white">
              <h3 className="font-bold text-gray-700">قائمة المخاطر</h3>
              <button onClick={handlePrepareNew} className="text-xs bg-red-600 text-white px-3 py-1.5 rounded-md hover:bg-red-700 transition flex items-center gap-1">
                <Plus size={12} /> إضافة خطر
              </button>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
              {risks.length === 0 && <div className="text-center text-gray-400 py-8 text-sm">لا توجد مخاطر مسجلة</div>}
              {risks.map((r: any) => {
                const s = r.probability * r.impact;
                const badgeColor = s >= 15 ? 'bg-red-100 text-red-800 border-red-200' : s >= 8 ? 'bg-yellow-100 text-yellow-800 border-yellow-200' : 'bg-green-100 text-green-800 border-green-200';
                return (
                  <div key={r.id} onClick={() => handleEdit(r)} className={`bg-white p-3 rounded-lg border cursor-pointer shadow-sm transition hover:border-red-300 ${selectedRiskId === r.id ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'}`}>
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-sm text-gray-800 line-clamp-1">{r.title}</span>
                      <span className={`text-xs px-1.5 rounded border ${badgeColor}`}>{s}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>{r.type === 'Threat' ? 'تهديد' : 'فرصة'}</span>
                      <span className={r.isChallenge ? 'text-blue-600 font-bold' : ''}>{r.isChallenge ? 'تحدي' : (r.status === 'Open' ? 'مفتوح' : 'مغلق')}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form Area */}
          <div className="w-full md:w-2/3 overflow-y-auto custom-scrollbar bg-white p-6 relative">
            {!isEditing ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-300">
                <List size={64} className="mb-4" />
                <p>اختر خطراً من القائمة لعرض التفاصيل أو أضف خطراً جديداً</p>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-xl font-bold text-[#004d25] border-r-4 border-[#C5A96F] pr-3">تفاصيل الخطر</h3>
                  {formData.isChallenge && <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-bold border border-blue-200">تم التحويل لتحدي</span>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-full">
                    <label className="block text-sm font-bold text-gray-700 mb-1">عنوان الخطر</label>
                    <input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:border-red-500 outline-none" />
                  </div>
                  <div className="col-span-full">
                    <label className="block text-sm font-bold text-gray-700 mb-1">وصف الخطر</label>
                    <textarea value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} rows={2} className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:border-red-500 outline-none"></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">نطاق الأثر</label>
                    <select value={formData.scope} onChange={e => setFormData({...formData, scope: e.target.value})} className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg outline-none">
                      <option value="">اختر...</option>
                      <option value="الاستراتيجية">الاستراتيجية</option>
                      <option value="المالية">المالية</option>
                      <option value="التشغيلية">التشغيلية</option>
                      <option value="القدرات">القدرات</option>
                      <option value="الالتزام">الالتزام</option>
                      <option value="التقنية والبيانات">التقنية والبيانات</option>
                      <option value="السمعة">السمعة</option>
                      <option value="الأشخاص">الأشخاص</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">نطاق الأثر الفرعي</label>
                    <select value={formData.subScope} onChange={e => setFormData({...formData, subScope: e.target.value})} className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg outline-none">
                        <option value="">اختر...</option>
                        {subScopeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 col-span-full grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">الاحتمالية (1-5)</label>
                      <input type="number" min="1" max="5" value={formData.prob} onChange={e => setFormData({...formData, prob: Number(e.target.value)})} className="w-full p-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">التأثير (1-5)</label>
                      <input type="number" min="1" max="5" value={formData.impact} onChange={e => setFormData({...formData, impact: Number(e.target.value)})} className="w-full p-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div className="col-span-full text-center border-t border-gray-200 pt-2 mt-2">
                      <span className="text-xs text-gray-500">درجة الخطورة:</span>
                      <span className={`font-bold text-lg px-3 py-1 rounded ml-2 text-white ${score >= 15 ? 'bg-red-600' : score >= 8 ? 'bg-yellow-500' : 'bg-green-600'}`}>{score}</span>
                    </div>
                  </div>

                  <div className="col-span-full"><label className="block text-sm font-bold text-gray-700 mb-1">خطة التخفيف</label><textarea value={formData.mitigation} onChange={e => setFormData({...formData, mitigation: e.target.value})} rows={2} className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg outline-none"></textarea></div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">نوع الخطر</label>
                    <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg outline-none">
                      <option value="Threat">تهديد (سلبي)</option>
                      <option value="Opportunity">فرصة (إيجابي)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">نوع الاستجابة</label>
                    <select value={formData.response} onChange={e => setFormData({...formData, response: e.target.value})} className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg outline-none">
                      <option value="Mitigate">تخفيف (Mitigate)</option>
                      <option value="Avoid">تجنب (Avoid)</option>
                      <option value="Transfer">تحويل (Transfer)</option>
                      <option value="Accept">قبول (Accept)</option>
                    </select>
                  </div>

                  <div><label className="block text-sm font-bold text-gray-700 mb-1">المرحلة</label>
                    <select value={formData.phase} onChange={e => setFormData({...formData, phase: e.target.value})} className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg outline-none">
                      <option value="Elaboration">التخطيط / التفصيل</option>
                      <option value="Execution">التنفيذ</option>
                      <option value="Closing">الإغلاق</option>
                    </select>
                  </div>
                  <div><label className="block text-sm font-bold text-gray-700 mb-1">حالة الخطر</label>
                    <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg outline-none">
                      <option value="Open">مفتوح</option>
                      <option value="Closed">مغلق</option>
                    </select>
                  </div>
                  <div><label className="block text-sm font-bold text-gray-700 mb-1">مؤشر الحدوث</label><input type="text" value={formData.indicator} onChange={e => setFormData({...formData, indicator: e.target.value})} className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg outline-none" /></div>
                  <div><label className="block text-sm font-bold text-gray-700 mb-1">تاريخ مؤشر الحدوث</label><input type="date" value={formData.indDate} onChange={e => setFormData({...formData, indDate: e.target.value})} className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg outline-none" /></div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center">
                  {!formData.isChallenge && selectedRiskId && (
                    <button onClick={handleConvertToChallenge} className="text-xs bg-white border border-[#1A3C6E] text-[#1A3C6E] px-4 py-2 rounded hover:bg-[#1A3C6E] hover:text-white transition flex items-center gap-1"><TrendingUp size={14} /> تحويل الخطر إلى تحدي</button>
                  )}
                  <div className="flex gap-2 mr-auto">
                    <button onClick={() => setIsEditing(false)} className="px-5 py-2 rounded-lg text-gray-600 hover:bg-gray-100">إلغاء</button>
                    <button onClick={handleSaveForm} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-md">حفظ الخطر</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}