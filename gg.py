import zipfile
import os

# Define the file structure and content
files = {
    "src/lib/constants.ts": """export const MNG_COLORS = {
  green: {
    50: '#f2fcf5',
    100: '#e1f8e8',
    600: '#006C35', // Primary
    800: '#004d25',
    900: '#003319',
  },
  gold: {
    100: '#f9f5eb',
    400: '#dccc9f',
    500: '#C5A96F', // Secondary
  },
  blue: {
    900: '#1A3C6E', // Accent
  }
};

export const GATES_TEMPLATE = [
  {
    name: "البوابة الأولى",
    subTitle: "التأسيس والموافقة",
    icon: "lightbulb",
    requirements: [
      { txt: "تعبئة بطاقة المشروع (Project Charter)", type: "charter_form", done: false },
      { txt: "تعبئة سجل المخاطر", type: "risk_register", done: false },
      { txt: "تعبئة الدروس المستفادة", type: "checkbox", done: false }
    ]
  },
  {
    name: "البوابة الثانية",
    subTitle: "التخطيط التفصيلي",
    icon: "map",
    requirements: [
      { txt: "خطة إدارة النطاق والجدول الزمني", type: "checkbox", done: false },
      { txt: "خطة إدارة الموارد والمخاطر", type: "checkbox", done: false },
      { txt: "اعتماد دراسة الجدوى النهائية", type: "checkbox", done: false }
    ]
  },
  {
    name: "البوابة الثالثة",
    subTitle: "التنفيذ والتطوير",
    icon: "hammer",
    requirements: [
      { txt: "تقارير الإنجاز الدورية", type: "checkbox", done: false },
      { txt: "ضمان الجودة للمخرجات", type: "checkbox", done: false },
      { txt: "تحديث سجل المخاطر", type: "risk_register", done: false }
    ]
  },
  {
    name: "البوابة الرابعة",
    subTitle: "الإغلاق والتسليم",
    icon: "flag",
    requirements: [
      { txt: "تسليم المنتج النهائي للمستفيد", type: "checkbox", done: false },
      { txt: "تقرير الدروس المستفادة النهائي", type: "checkbox", done: false },
      { txt: "إغلاق العقود والمشتريات", type: "checkbox", done: false }
    ]
  }
];""",

    "src/components/ui/NavButton.tsx": """import React from 'react';

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

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
}""",

    "src/components/ui/StatCard.tsx": """import React from 'react';

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
}""",

    "src/components/modals/NewProjectModal.tsx": """'use client';
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
}""",

    "src/components/modals/CharterModal.tsx": """'use client';
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
}""",

    "src/components/modals/RiskRegisterModal.tsx": """'use client';
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
}""",

    "src/components/Navbar.tsx": """'use client';
import React from 'react';
import { LayoutGrid, PieChart, RotateCw } from 'lucide-react';
import NavButton from './ui/NavButton';

export default function Navbar({ currentView, setCurrentView, onReset }: any) {
  return (
    <nav className="bg-[#006C35] text-white shadow-lg shrink-0 z-30 border-b-4 border-[#C5A96F]">
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
}""",

    "src/components/PortfolioView.tsx": """'use client';
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
}""",

    "src/components/AnalyticsView.tsx": """'use client';
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { FolderOpen, CheckCheck, AlertTriangle, Flame } from 'lucide-react';
import StatCard from './ui/StatCard';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

export default function AnalyticsView({ projects }: { projects: any[] }) {
  const totalProjects = projects.length;
  const completedProjects = projects.filter(p => p.currentGateIndex >= 4).length;
  const activeProjects = totalProjects - completedProjects;

  let totalRisks = 0;
  let highRisks = 0;
  const gateCounts = [0, 0, 0, 0];

  projects.forEach(p => {
    if (p.risks) {
      totalRisks += p.risks.length;
      highRisks += p.risks.filter((r: any) => (r.probability * r.impact) >= 15).length;
    }
    if (p.currentGateIndex < 4) {
      gateCounts[p.currentGateIndex]++;
    }
  });

  const barData = {
    labels: ['البوابة 1', 'البوابة 2', 'البوابة 3', 'البوابة 4'],
    datasets: [{
      label: 'عدد المشاريع',
      data: gateCounts,
      backgroundColor: '#006C35',
      borderRadius: 4,
    }]
  };

  const doughnutData = {
    labels: ['نشط', 'مكتمل'],
    datasets: [{
      data: [activeProjects, completedProjects],
      backgroundColor: ['#C5A96F', '#006C35'],
      borderWidth: 0,
    }]
  };

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <h2 className="text-3xl font-extrabold text-[#004d25] mb-2">لوحة المعلومات والإحصائيات</h2>
      <p className="text-gray-500 mb-10 font-medium">نظرة شاملة على أداء المحفظة والمخاطر</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <StatCard title="إجمالي المشاريع" value={totalProjects} icon={<FolderOpen />} colorClass="text-[#006C35]" bgClass="bg-[#f2fcf5]" />
        <StatCard title="المشاريع المكتملة" value={completedProjects} icon={<CheckCheck />} colorClass="text-[#C5A96F]" bgClass="bg-[#f9f5eb]" />
        <StatCard title="إجمالي المخاطر" value={totalRisks} icon={<AlertTriangle />} colorClass="text-red-600" bgClass="bg-red-50" />
        <StatCard title="مخاطر عالية" value={highRisks} icon={<Flame />} colorClass="text-red-800" bgClass="bg-red-100" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2">توزيع المشاريع حسب البوابات</h3>
          <div className="h-64 relative">
            <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2">حالة المشاريع</h3>
          <div className="h-64 relative flex justify-center">
            <Doughnut data={doughnutData} options={{ responsive: true, maintainAspectRatio: false, cutout: '75%', plugins: { legend: { position: 'bottom' } } }} />
          </div>
        </div>
      </div>
    </div>
  );
}""",

    "src/components/ProjectDetailsView.tsx": """'use client';
import React from 'react';
import { ArrowRight, CheckCircle2, Trophy, Target, FileText, Circle, ShieldAlert, List, Plus, CheckCheck, Unlock, Lock, ArrowLeft } from 'lucide-react';

export default function ProjectDetailsView({ project, onUpdateProject, onBack, openCharter, openRisks }: any) {
  const isComplete = project.currentGateIndex >= 4;
  const currentGate = isComplete ? null : project.gates[project.currentGateIndex];

  const toggleRequirement = (reqIndex: number) => {
    if (!currentGate) return;
    const req = currentGate.requirements[reqIndex];
    if (req.type === 'charter_form' || req.type === 'risk_register') return;

    const updatedProject = { ...project };
    updatedProject.gates[project.currentGateIndex].requirements[reqIndex].done = !req.done;
    onUpdateProject(updatedProject);
  };

  const passGate = () => {
    const updatedProject = { ...project };
    updatedProject.currentGateIndex++;
    onUpdateProject(updatedProject);
    alert(updatedProject.currentGateIndex >= 4 ? "مبروك! تم إنجاز المشروع بالكامل." : "تم عبور البوابة بنجاح!");
  };

  const allReqsMet = currentGate ? currentGate.requirements.every((r: any) => r.done) : false;
  const progress = Math.min(project.currentGateIndex, 3) / 3 * 100;

  let gateBtnText = "رفع طلب دخول البوابة الأولى";
  let gateBtnSub = "إرسال المتطلبات للاعتماد";
  if (project.currentGateIndex > 0) {
    gateBtnText = "الموافقة والعبور";
    gateBtnSub = "الموافقة على الانتقال للمرحلة التالية";
  }

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="w-12 h-12 bg-white rounded-xl border border-gray-200 flex items-center justify-center hover:bg-[#f2fcf5] hover:text-[#006C35] hover:border-[#e1f8e8] transition shadow-sm"
        >
          <ArrowRight size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-extrabold text-[#004d25]">{project.name}</h1>
          <p className="text-sm text-gray-500 mt-1">تتبع مسار البوابات الاستراتيجية</p>
        </div>
      </div>

      <div className="relative flex justify-between items-center mb-12 px-8">
        <div className="absolute top-6 right-8 left-8 h-1 bg-gray-200 z-0 rounded-full">
            <div
                className="h-full bg-[#C5A96F] transition-all duration-700 ease-out rounded-full"
                style={{ width: `${progress}%` }}
            ></div>
        </div>

        {project.gates.map((gate: any, idx: number) => {
          let stateClass = "bg-white border-4 border-gray-200 text-gray-400";
          if (idx < project.currentGateIndex) stateClass = "bg-[#006C35] border-4 border-[#006C35] text-white";
          else if (idx === project.currentGateIndex && !isComplete) stateClass = "bg-white border-4 border-[#C5A96F] text-[#006C35] scale-110 shadow-[0_0_15px_rgba(197,169,111,0.3)]";

          return (
            <div key={idx} className="relative z-10 flex flex-col items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-500 ${stateClass}`}>
                {idx < project.currentGateIndex ? <CheckCircle2 size={24} /> : (idx + 1)}
              </div>
              <span className={`absolute top-14 text-xs font-bold w-24 text-center ${idx === project.currentGateIndex ? 'text-[#004d25]' : 'text-gray-400'}`}>
                {gate.name}
              </span>
            </div>
          );
        })}
      </div>

      {isComplete ? (
        <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-green-100">
          <div className="w-24 h-24 bg-[#f2fcf5] rounded-full flex items-center justify-center mx-auto mb-6 text-[#006C35] border border-[#e1f8e8]">
            <Trophy size={48} />
          </div>
          <h2 className="text-3xl font-bold text-[#004d25] mb-2">تم إنجاز المشروع بالكامل!</h2>
          <p className="text-gray-500 mb-8">تم إغلاق جميع البوابات واعتماد المخرجات وفق معايير MNGDP</p>
          <button onClick={onBack} className="px-8 py-3 bg-[#003319] text-white rounded-lg font-bold hover:bg-black transition shadow-lg">
            العودة للمحفظة
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-xl font-bold text-[#004d25] mb-6 flex items-center gap-3 border-b border-gray-100 pb-4">
                <span className="w-10 h-10 rounded-lg bg-[#f2fcf5] flex items-center justify-center text-[#006C35] border border-[#e1f8e8]">
                  <Target size={20} />
                </span>
                متطلبات {currentGate.name}
              </h3>
              <div className="space-y-4">
                {currentGate.requirements.map((req: any, i: number) => (
                  <RequirementItem
                    key={i}
                    req={req}
                    onToggle={() => toggleRequirement(i)}
                    openCharter={openCharter}
                    openRisks={openRisks}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 text-center relative overflow-hidden h-full flex flex-col justify-center min-h-[350px]">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#006C35] to-[#004d25]"></div>
              <div className="mb-6 relative">
                <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center text-4xl shadow-inner transition-colors duration-500 ${allReqsMet ? 'bg-[#f2fcf5] text-[#006C35]' : 'bg-gray-50 text-gray-300'}`}>
                  {allReqsMet ? <Unlock size={40} /> : <Lock size={40} />}
                </div>
              </div>

              {allReqsMet ? (
                <>
                  <button
                    onClick={passGate}
                    className="w-full py-4 rounded-xl font-bold text-lg text-white shadow-md transition transform hover:scale-105 flex items-center justify-center gap-2 bg-gradient-to-br from-[#006C35] to-[#004d25] border-b-4 border-[#C5A96F]"
                  >
                    {gateBtnText} <ArrowLeft size={20} />
                  </button>
                  <p className="mt-4 text-sm text-[#006C35] font-medium">{gateBtnSub}</p>
                </>
              ) : (
                <>
                  <button disabled className="w-full py-4 rounded-xl font-bold text-lg bg-gray-200 text-gray-400 cursor-not-allowed border border-dashed border-gray-300">
                    البوابة مغلقة
                  </button>
                  <p className="mt-4 text-sm text-gray-400">يرجى إكمال جميع المتطلبات لتفعيل زر العبور</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function RequirementItem({ req, onToggle, openCharter, openRisks }: any) {
  if (req.type === 'charter_form') {
    return (
      <div className={`flex items-center justify-between p-5 rounded-xl border transition-all duration-200 ${req.done ? 'border-[#e1f8e8] bg-[#f2fcf5]' : 'border-gray-100 bg-white shadow-sm hover:border-[#C5A96F]'}`}>
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${req.done ? 'bg-[#006C35] text-white' : 'bg-[#f2fcf5] text-[#006C35] border border-[#e1f8e8]'}`}>
            <FileText size={24} />
          </div>
          <div>
            <p className="font-bold text-gray-800 text-lg">{req.txt}</p>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              {req.done ? <><CheckCircle2 size={14} className="text-[#006C35]" /> تم التعبئة والاعتماد</> : <><Circle size={14} /> مطلوب للمتابعة</>}
            </p>
          </div>
        </div>
        <button
          onClick={openCharter}
          className={`px-5 py-2.5 rounded-lg font-bold text-sm transition flex items-center gap-2 ${req.done ? 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50' : 'bg-[#006C35] text-white hover:bg-[#004d25] shadow-lg animate-pulse'}`}
        >
          {req.done ? 'عرض/تعديل' : 'تعبئة النموذج'}
        </button>
      </div>
    );
  }

  if (req.type === 'risk_register') {
    return (
      <div className={`flex items-center justify-between p-5 rounded-xl border transition-all duration-200 ${req.done ? 'border-red-200 bg-red-50' : 'border-gray-100 bg-white shadow-sm hover:border-red-300'}`}>
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${req.done ? 'bg-red-600 text-white' : 'bg-red-50 text-red-600 border border-red-100'}`}>
            <ShieldAlert size={24} />
          </div>
          <div>
            <p className="font-bold text-gray-800 text-lg">{req.txt}</p>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              {req.done ? <><CheckCircle2 size={14} className="text-red-600" /> تم التحديث</> : <><Circle size={14} /> مطلوب للمتابعة</>}</p>
          </div>
        </div>
        <button
          onClick={openRisks}
          className={`px-5 py-2.5 rounded-lg font-bold text-sm transition flex items-center gap-2 ${req.done ? 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50' : 'bg-red-600 text-white hover:bg-red-700 shadow-lg'}`}
        >
          {req.done ? <><List size={16}/> عرض السجل</> : <><Plus size={16}/> تعبئة السجل</>}
        </button>
      </div>
    );
  }

  return (
    <div
      onClick={onToggle}
      className={`flex items-center p-4 rounded-xl border cursor-pointer transition-all duration-200 ${req.done ? 'border-[#e1f8e8] bg-[#f2fcf5]' : 'border-gray-100 hover:border-[#C5A96F] bg-white shadow-sm'}`}
    >
      <div className={`w-6 h-6 rounded-md border-2 mr-4 flex items-center justify-center transition ${req.done ? 'bg-[#006C35] border-[#006C35] text-white' : 'border-gray-300 bg-white'}`}>
        {req.done && <CheckCheck size={14} />}
      </div>
      <span className={`font-medium ${req.done ? 'text-[#004d25] line-through opacity-70' : 'text-gray-700'}`}>
        {req.txt}
      </span>
    </div>
  );
}""",

    "src/app/page.tsx": """'use client';
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import PortfolioView from '@/components/PortfolioView';
import AnalyticsView from '@/components/AnalyticsView';
import ProjectDetailsView from '@/components/ProjectDetailsView';
import NewProjectModal from '@/components/modals/NewProjectModal';
import CharterModal from '@/components/modals/CharterModal';
import RiskRegisterModal from '@/components/modals/RiskRegisterModal';
import { GATES_TEMPLATE } from '@/lib/constants';

export default function Home() {
  const [projects, setProjects] = useState<any[]>([]);
  const [currentView, setCurrentView] = useState('portfolio');
  const [activeProjectId, setActiveProjectId] = useState<number | null>(null);

  // Modals State
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [showCharterModal, setShowCharterModal] = useState(false);
  const [showRiskModal, setShowRiskModal] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('strategic_pms_react_v2');
    if (stored) {
      setProjects(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('strategic_pms_react_v2', JSON.stringify(projects));
  }, [projects]);

  const handleCreateProject = (name: string, desc: string) => {
    const newProj = {
      id: Date.now(),
      name,
      description: desc,
      charterData: {},
      risks: [],
      currentGateIndex: 0,
      gates: JSON.parse(JSON.stringify(GATES_TEMPLATE)),
      status: 'active'
    };
    setProjects([...projects, newProj]);
    setShowNewProjectModal(false);
    setActiveProjectId(newProj.id);
    setCurrentView('project_details');
  };

  const handleUpdateProject = (updatedProject: any) => {
    setProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p));
  };

  const handleResetSystem = () => {
    if (confirm("تحذير: سيتم حذف جميع البيانات والبدء من جديد. هل أنت متأكد؟")) {
      localStorage.removeItem('strategic_pms_react_v2');
      setProjects([]);
      setCurrentView('portfolio');
    }
  };

  const navigateToProject = (id: number) => {
    setActiveProjectId(id);
    setCurrentView('project_details');
  };

  const activeProject = projects.find(p => p.id === activeProjectId);

  return (
    <div dir="rtl" className="h-screen flex flex-col bg-[#f8faf9] font-sans text-gray-800 overflow-hidden">
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        onReset={handleResetSystem}
      />

      <main className="flex-1 overflow-auto p-8 relative">
        {currentView === 'portfolio' && (
          <PortfolioView
            projects={projects}
            onOpenNewProject={() => setShowNewProjectModal(true)}
            onSelectProject={navigateToProject}
          />
        )}

        {currentView === 'analytics' && (
          <AnalyticsView projects={projects} />
        )}

        {currentView === 'project_details' && activeProject && (
          <ProjectDetailsView
            project={activeProject}
            onUpdateProject={handleUpdateProject}
            onBack={() => setCurrentView('portfolio')}
            openCharter={() => setShowCharterModal(true)}
            openRisks={() => setShowRiskModal(true)}
          />
        )}
      </main>

      {/* Modals */}
      {showNewProjectModal && (
        <NewProjectModal
          onClose={() => setShowNewProjectModal(false)}
          onCreate={handleCreateProject}
        />
      )}

      {showCharterModal && activeProject && (
        <CharterModal
          project={activeProject}
          onClose={() => setShowCharterModal(false)}
          onSave={(updatedCharter: any) => {
            const updatedProject = { ...activeProject, charterData: updatedCharter };
            // Mark charter requirement as done in Gate 1 (index 0)
            const gate1Req = updatedProject.gates[0].requirements.find((r: any) => r.type === 'charter_form');
            if(gate1Req) gate1Req.done = true;
            handleUpdateProject(updatedProject);
            setShowCharterModal(false);
          }}
        />
      )}

      {showRiskModal && activeProject && (
        <RiskRegisterModal
          project={activeProject}
          onClose={() => {
             if(activeProject.risks && activeProject.risks.length > 0) {
                 const updatedProject = { ...activeProject };
                 if (updatedProject.currentGateIndex < updatedProject.gates.length) {
                    const currentGate = updatedProject.gates[updatedProject.currentGateIndex];
                    const req = currentGate.requirements.find((r: any) => r.type === 'risk_register');
                    if(req) {
                        req.done = true;
                        handleUpdateProject(updatedProject);
                    }
                 }
             }
             setShowRiskModal(false);
          }}
          onSaveRisks={(newRisks: any[]) => {
            handleUpdateProject({ ...activeProject, risks: newRisks });
          }}
        />
      )}
    </div>
  );
}"""
}

# Create the ZIP file
zip_filename = "nextjs_project_files.zip"
with zipfile.ZipFile(zip_filename, 'w') as zipf:
    for file_path, content in files.items():
        zipf.writestr(file_path, content)

print(f"Created {zip_filename}")

