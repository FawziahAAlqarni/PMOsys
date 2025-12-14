import React, { useState, useContext, useEffect } from 'react';
import { ProjectContext } from '../../context/ProjectContext';
import LessonsLibrary from './LessonsLibrary';
import UserSearchDropdown from '../UserSearchDropdown';

const NewProjectModal = ({ onClose, accessToken }) => {
  const { addProject } = useContext(ProjectContext);
  
  // الحصول على تاريخ اليوم بصيغة YYYY-MM-DD
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  // 1. حالة جميع البيانات التفصيلية (تمت إعادتها كاملة)
  const [formData, setFormData] = useState({
    name: '', 
    programName: '', 
    budget: '', 
    portfolio: '', 
    startDate: getTodayDate(), 
    endDate: '', 
    manager: '', 
    managerEmail: '',
    owner: '',
    ownerEmail: '',
    programManager: '', 
    programManagerEmail: '',
    portfolioManager: '', 
    portfolioManagerEmail: '',
    techCommittee: '',
    stratObj: '', 
    stratResult: '', 
    description: '', 
    dependencies: '', 
    lessonsLearned: ''
  });

  // 2. حالة الخطر الأولي (إلزامي)
  const [initRisk, setInitRisk] = useState({ 
    title: '', 
    category: 'threat', 
    prob: 3, 
    impact: 3, 
    responseType: 'تخفيف', 
    mitigationPlan: '', 
    impactScope: '', 
    subImpactScope: '', 
    status: 'نشط' 
  });
  const [addedRisks, setAddedRisks] = useState([]);

  // 3. حالة مكتبة الدروس
  const [showLessonsLibrary, setShowLessonsLibrary] = useState(false);
  const [selectedLessons, setSelectedLessons] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    const email = e.target.dataset?.email;
    
    setFormData({ 
      ...formData, 
      [name]: value,
      ...(email && { [`${name}Email`]: email })
    });
  };

  const handleAddRisk = (e) => {
    e.preventDefault();
    if(!initRisk.title) return alert("يرجى كتابة عنوان الخطر");
    
    const newRisk = { 
      id: Date.now(), 
      title: initRisk.title, 
      category: initRisk.category, 
      prob: parseInt(initRisk.prob) || 3, 
      impact: parseInt(initRisk.impact) || 3,
      responseType: initRisk.responseType,
      mitigationPlan: initRisk.mitigationPlan,
      impactScope: initRisk.impactScope,
      subImpactScope: initRisk.subImpactScope,
      status: initRisk.status
    };

    setAddedRisks([...addedRisks, newRisk]);
    setInitRisk({ 
      title: '', 
      category: 'threat', 
      prob: 3, 
      impact: 3, 
      responseType: 'تخفيف', 
      mitigationPlan: '', 
      impactScope: '', 
      subImpactScope: '', 
      status: 'نشط' 
    });
  };

  const handleRemoveRisk = (id) => {
    setAddedRisks(addedRisks.filter(r => r.id !== id));
  };

  const handleSelectLessons = (lessons) => {
    setSelectedLessons(lessons);
    setShowLessonsLibrary(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name) return alert("اسم المشروع مطلوب");
    if (addedRisks.length === 0) return alert("⚠️ شرط إلزامي: يجب تسجيل خطر واحد على الأقل.");

    // تحويل الموافقات إلى صيغة مصفوفة لحفظ في قاعدة البيانات
    const approvalsArray = [
      {
        roleId: 'sponsor',
        status: 'pending',
        date: null,
        approvedBy: '',
        comment: ''
      },
      {
        roleId: 'manager',
        status: 'pending',
        date: null,
        approvedBy: '',
        comment: ''
      },
      {
        roleId: 'director',
        status: 'pending',
        date: null,
        approvedBy: '',
        comment: ''
      }
    ];

    const newProject = {
      name: formData.name,
      description: formData.description,
      estimatedBudget: parseFloat(formData.budget) || 0,
      durationInWeeks: parseInt(formData.budget) || 0,
      stage: 1,
      currentApproverOrder: 1,
      approvals: {},
      rejectionNotes: {},
      stageStatus: 'pending',
      risks: [...addedRisks],  // المخاطر في المستوى الرئيسي
      data: {
        projectInfo: {
          program: formData.programName,
          project: formData.name,
          portfolio: formData.portfolio
        },
        dates: {
          projectStartDate: formData.startDate,
          projectEndDate: formData.endDate
        },
        team: {
          projectManager: formData.manager,
          projectManagerEmail: formData.managerEmail,
          projectOwner: formData.owner,
          projectOwnerEmail: formData.ownerEmail,
          programManager: formData.programManager,
          programManagerEmail: formData.programManagerEmail,
          portfolioManager: formData.portfolioManager,
          portfolioManagerEmail: formData.portfolioManagerEmail
        },
        committee: formData.techCommittee ? [formData.techCommittee] : [],
        strategy: {
          objective: formData.stratObj,
          result: formData.stratResult
        },
        dependencies: formData.dependencies ? [formData.dependencies] : [],
        approvals: approvalsArray,
        risks: [...addedRisks],
        lessonsLearned: selectedLessons,
        gate1Data: {
          approvals: approvalsArray,
          risks: [...addedRisks]
        },
        gate2Data: null,
        gate3Data: null,
        gate4Data: null
      }
    };

    addProject(newProject);
    
    // محاكاة إرسال إيميل
    const mailLink = `mailto:falqarni@mngdp.sa?subject=New Project: ${formData.name}&body=Please review project details.`;
    window.location.href = mailLink; 

    onClose();
  };

  return (
    <>
      {showLessonsLibrary && (
        <LessonsLibrary 
          onSelect={handleSelectLessons}
          onClose={() => setShowLessonsLibrary(false)}
          selectedLessons={selectedLessons}
        />
      )}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm fade-in">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl border-t-8 border-secondary-gold flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b bg-gray-50 rounded-t-xl">
            <h2 className="text-xl font-bold text-primary-900 flex items-center gap-2">
                <i className="fa-solid fa-folder-plus text-secondary-gold"></i>
                تسجيل مشروع جديد (البوابة الأولى)
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-red-600 transition"><i className="fa-solid fa-xmark text-xl"></i></button>
        </div>
        
        {/* Body */}
        <div className="overflow-y-auto p-6 custom-scrollbar flex-1">
            <form className="space-y-6">
                
                {/* 1. المعلومات الأساسية */}
                <div className="bg-primary-50 p-5 rounded-xl border border-primary-100">
                    <h3 className="text-primary-800 font-bold mb-4 border-b border-primary-200 pb-2 flex items-center gap-2">
                        <i className="fa-solid fa-file-signature text-secondary-gold"></i> المعلومات الأساسية والنطاق
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="col-span-3">
                            <label className="block text-xs font-bold text-primary-900 mb-1">اسم المشروع *</label>
                            <input name="name" onChange={handleChange} className="w-full p-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold mb-1">البرنامج *</label>
                            <select name="programName" onChange={handleChange} className="w-full p-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none">
                                <option value="">اختر البرنامج...</option>
                                <option value="برنامج تطوير السياسات والإجراءات المتكاملة">برنامج تطوير السياسات والإجراءات المتكاملة</option>
                                <option value="برنامج تحقيق التميز المؤسسي">برنامج تحقيق التميز المؤسسي</option>
                                <option value="برنامج رفع كفاءة التحليل الاستراتيجي للوزارة والمواءمة مع منظومة الأمن والدفاع">برنامج رفع كفاءة التحليل الاستراتيجي للوزارة والمواءمة مع منظومة الأمن والدفاع</option>
                                <option value="برنامج تطوير البنية التحتية لمراكز البيانات والتطبيقات">برنامج تطوير البنية التحتية لمراكز البيانات والتطبيقات</option>
                                <option value="برنامج التحول الرقمي">برنامج التحول الرقمي</option>
                                <option value="برنامج رفع كفاءة الخدمات الرقمية والتقنية">برنامج رفع كفاءة الخدمات الرقمية والتقنية</option>
                                <option value="برنامج رفع كفاءة إدارة وحوكمة البيانات">برنامج رفع كفاءة إدارة وحوكمة البيانات</option>
                                <option value="برنامج تطوير قدرات الاتصالات العسكرية">برنامج تطوير قدرات الاتصالات العسكرية</option>
                                <option value="برنامج تطوير وإدارة الأصول السيبرانية">برنامج تطوير وإدارة الأصول السيبرانية</option>
                                <option value="برنامج التميز في تقديم خدمات الأمن السيبراني">برنامج التميز في تقديم خدمات الأمن السيبراني</option>
                                <option value="برنامج رفع كفاءة الوقاية من الحوادث السيبرانية والاستجابة لها">برنامج رفع كفاءة الوقاية من الحوادث السيبرانية والاستجابة لها</option>
                                <option value="برنامج تعزيز الجاهزية للتحول">برنامج تعزيز الجاهزية للتحول</option>
                                <option value="برنامج تعزيز قدرات التواصل الداخلي والإعلام">برنامج تعزيز قدرات التواصل الداخلي والإعلام</option>
                                <option value="برنامج تطوير رأس المال البشري">برنامج تطوير رأس المال البشري</option>
                                <option value="برنامج تطوير القدرات وتنمية المهارات">برنامج تطوير القدرات وتنمية المهارات</option>
                                <option value="برنامج تمكين تحول وزارة الحرس الوطني">برنامج تمكين تحول وزارة الحرس الوطني</option>
                                <option value="برنامج توطين الصناعات العسكرية ورفع مستوى المحتوى المحلي">برنامج توطين الصناعات العسكرية ورفع مستوى المحتوى المحلي</option>
                                <option value="رفع مستوى اعتزاز ووعي منسوبي الوزارة">رفع مستوى اعتزاز ووعي منسوبي الوزارة</option>
                                <option value="برنامج دراسة وتطوير البنية التحتية للشؤون التنفيذية">برنامج دراسة وتطوير البنية التحتية للشؤون التنفيذية</option>
                                <option value="برنامج تطوير المشتريات والتسليح">برنامج تطوير المشتريات والتسليح</option>
                                <option value="برنامج رفع كفاءة إدارة المحافظ والمشاريع">برنامج رفع كفاءة إدارة المحافظ والمشاريع</option>
                                <option value="برنامج رفع كفاءة التخطيط المالي">برنامج رفع كفاءة التخطيط المالي</option>
                                <option value="برنامج رفع فاعلية اتخاذ القرار">برنامج رفع فاعلية اتخاذ القرار</option>
                                <option value="رفع كفاءة وجودة الخدمات الممكنة في وزارة الحرس الوطني">رفع كفاءة وجودة الخدمات الممكنة في وزارة الحرس الوطني</option>
                                <option value="برنامج إدارة المخاطر والامتثال">برنامج إدارة المخاطر والامتثال</option>
                                <option value="برنامج تأسيس وتطوير  البنية التحتية للرعاية الوقائية">برنامج تأسيس وتطوير  البنية التحتية للرعاية الوقائية</option>
                                <option value="برنامج ازدهار  ورفاهية منسوبي الشؤون الصحية">برنامج ازدهار  ورفاهية منسوبي الشؤون الصحية</option>
                                <option value="برامج رفع الجاهزية  الطبية ضد الكوارث">برامج رفع الجاهزية  الطبية ضد الكوارث</option>
                                <option value="برنامج تفعيل الرعاية الوقائية">برنامج تفعيل الرعاية الوقائية</option>
                                <option value="برنامج تحسين الوصول الى الرعاية الصحية">برنامج تحسين الوصول الى الرعاية الصحية</option>
                                <option value="برنامج تعزيز جودة الرعاية الصحية">برنامج تعزيز جودة الرعاية الصحية</option>
                                <option value="برنامج تحسين الكفاءة والاستدامة المالية">برنامج تحسين الكفاءة والاستدامة المالية</option>
                                <option value="برنامج التحول المؤسسي">برنامج التحول المؤسسي</option>
                                <option value="برنامج  التميز البحثي والابتكار">برنامج  التميز البحثي والابتكار</option>
                                <option value="برنامج تطوير عمليات الموارد البشرية">برنامج تطوير عمليات الموارد البشرية</option>
                                <option value="برنامج تنمية الكادر الإداري">برنامج تنمية الكادر الإداري</option>
                                <option value="برنامج تعزيز قدرات الجمع والتحليل الاستخباراتي">برنامج تعزيز قدرات الجمع والتحليل الاستخباراتي</option>
                                <option value="برنامج تأسيس وتطوير العقيدة والتدريب">برنامج تأسيس وتطوير العقيدة والتدريب</option>
                                <option value="برنامج تحسين وتخطيط التدريب">برنامج تحسين وتخطيط التدريب</option>
                                <option value="برنامج إدارة القوى البشرية">برنامج إدارة القوى البشرية</option>
                                <option value="برنامج تعزيز قدرات الأمن والسلامة">برنامج تعزيز قدرات الأمن والسلامة</option>
                                <option value="برنامج تعزيز قدرات الاتصالات">برنامج تعزيز قدرات الاتصالات</option>
                                <option value="برنامج تطوير الأفواج">برنامج تطوير الأفواج</option>
                                <option value="برنامج تعزيز التخطيط العملياتي">برنامج تعزيز التخطيط العملياتي</option>
                                <option value="برنامج تطوير الخدمات اللوجستية">برنامج تطوير الخدمات اللوجستية</option>
                                <option value="تطوير المنظومة القيادية في الجهاز العسكري">تطوير المنظومة القيادية في الجهاز العسكري</option>
                                <option value="برنامج التميز المؤسسي العسكري">برنامج التميز المؤسسي العسكري</option>
                                <option value="برنامج تعزيز قدرات الطب العسكري الميداني">برنامج تعزيز قدرات الطب العسكري الميداني</option>
                                <option value="برنامج تطوير وتكامل القدرات">برنامج تطوير وتكامل القدرات</option>
                                <option value="برنامج الكفاءة والتميز  للطب العسكري الميداني">برنامج الكفاءة والتميز  للطب العسكري الميداني</option>
                                <option value="برنامج التكامل مع شركاء المنظومة">برنامج التكامل مع شركاء المنظومة</option>
                                <option value="برنامج التميز العملياتي">برنامج التميز العملياتي</option>
                                <option value="تعزيز الجاهزية والتفوق في تنفيذ المهام">تعزيز الجاهزية والتفوق في تنفيذ المهام</option>
                                <option value="برنامج هيكلة وتموضع قوات وزارة الحرس الوطني">برنامج هيكلة وتموضع قوات وزارة الحرس الوطني</option>
                                <option value="برنامج تعزيز كفاءة القوات">برنامج تعزيز كفاءة القوات</option>
                                <option value="برنامج تطوير الكليات العسكرية">برنامج تطوير الكليات العسكرية</option>
                            </select>
                        </div>
                        <div><label className="block text-xs font-bold mb-1">الميزانية المقدرة</label><input name="budget" type="number" onChange={handleChange} className="w-full p-2 border rounded-lg text-sm"/></div>
                        <div>
                            <label className="block text-xs font-bold mb-1">المحفظة *</label>
                            <select name="portfolio" onChange={handleChange} className="w-full p-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none">
                                <option value="">اختر المحفظة...</option>
                                <option value="مسار مشاريع البرنامج">مسار مشاريع البرنامج</option>
                                <option value="مسار التوطين">مسار التوطين</option>
                                <option value="محفظة الشؤون العسكرية">محفظة الشؤون العسكرية</option>
                                <option value="محفظة الشؤون الصحية">محفظة الشؤون الصحية</option>
                                <option value="محفظة الشؤون التنفيذية">محفظة الشؤون التنفيذية</option>
                            </select>
                        </div>
                        <div><label className="block text-xs font-bold mb-1">تاريخ البداية المتوقع</label><input name="startDate" type="date" value={formData.startDate} onChange={handleChange} className="w-full p-2 border rounded-lg text-sm"/></div>
                        <div><label className="block text-xs font-bold mb-1">تاريخ النهاية المتوقع</label><input name="endDate" type="date" value={formData.endDate} onChange={handleChange} className="w-full p-2 border rounded-lg text-sm"/></div>
                    </div>
                </div>

                {/* 2. الهيكل الإداري (كامل) */}
                <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-100">
                    <h3 className="text-yellow-800 font-bold mb-4 border-b border-yellow-200 pb-2 flex items-center gap-2">
                        <i className="fa-solid fa-users text-secondary-gold"></i> الهيكل الإداري وأصحاب المصلحة
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <UserSearchDropdown 
                            name="manager"
                            value={formData.manager}
                            onChange={handleChange}
                            label="مدير المشروع"
                            placeholder="ابحث عن مدير المشروع..."
                            accessToken={accessToken}
                        />
                        <UserSearchDropdown 
                            name="owner"
                            value={formData.owner}
                            onChange={handleChange}
                            label="مالك المشروع"
                            placeholder="ابحث عن مالك المشروع..."
                            accessToken={accessToken}
                        />
                        <UserSearchDropdown 
                            name="programManager"
                            value={formData.programManager}
                            onChange={handleChange}
                            label="مدير البرنامج"
                            placeholder="ابحث عن مدير البرنامج..."
                            accessToken={accessToken}
                        />
                        <UserSearchDropdown 
                            name="portfolioManager"
                            value={formData.portfolioManager}
                            onChange={handleChange}
                            label="مدير المحفظة"
                            placeholder="ابحث عن مدير المحفظة..."
                            accessToken={accessToken}
                        />
                        <div className="col-span-2"><label className="block text-xs font-bold mb-1">اللجنة الفنية</label><input name="techCommittee" onChange={handleChange} className="w-full p-2 border rounded-lg text-sm" placeholder="أسماء أعضاء اللجنة..."/></div>
                    </div>
                </div>

                {/* 3. التوافق الاستراتيجي (كامل) */}
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                    <h3 className="text-gray-800 font-bold mb-4 border-b border-gray-200 pb-2 flex items-center gap-2">
                        <i className="fa-solid fa-bullseye text-secondary-gold"></i> التوافق الاستراتيجي
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label className="block text-xs font-bold mb-1">الهدف الاستراتيجي</label><input name="stratObj" onChange={handleChange} className="w-full p-2 border rounded-lg text-sm"/></div>
                        <div><label className="block text-xs font-bold mb-1">النتيجة الاستراتيجية</label><input name="stratResult" onChange={handleChange} className="w-full p-2 border rounded-lg text-sm"/></div>
                        <div className="col-span-2"><label className="block text-xs font-bold mb-1">وصف المشروع</label><textarea name="description" rows="2" onChange={handleChange} className="w-full p-2 border rounded-lg text-sm"></textarea></div>
                        <div className="col-span-2"><label className="block text-xs font-bold mb-1">الاعتمادات (Dependencies)</label><textarea name="dependencies" rows="1" onChange={handleChange} className="w-full p-2 border rounded-lg text-sm"></textarea></div>
                        <div className="col-span-2">
                            <label className="block text-xs font-bold mb-2">الدروس المستفادة</label>
                            <button 
                                type="button"
                                onClick={() => setShowLessonsLibrary(true)}
                                className="w-full p-2 border-2 border-primary-300 rounded-lg text-sm bg-primary-50 text-primary-700 font-bold hover:bg-primary-100 transition flex items-center justify-center gap-2"
                            >
                                <i className="fa-solid fa-book"></i>
                                اختر من مكتبة الدروس ({selectedLessons.length} مختارة)
                            </button>
                            {selectedLessons.length > 0 && (
                                <div className="mt-3 space-y-2">
                                    {selectedLessons.map((lesson) => (
                                        <div key={lesson.id} className="bg-primary-50 p-2 rounded-lg border border-primary-200 flex justify-between items-start">
                                            <div className="flex-1">
                                                <p className="text-xs font-bold text-primary-900">{lesson.title}</p>
                                                <p className="text-xs text-gray-600">{lesson.description}</p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setSelectedLessons(selectedLessons.filter(l => l.id !== lesson.id))}
                                                className="text-gray-400 hover:text-red-600 ml-2"
                                            >
                                                <i className="fa-solid fa-xmark"></i>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* 4. المخاطر الأولية */}
                <div className="bg-red-50 p-5 rounded-xl border border-red-200">
                    <h3 className="text-red-800 font-bold mb-4 border-b border-red-200 pb-2 flex items-center gap-2">
                        <i className="fa-solid fa-triangle-exclamation"></i> المخاطر الأولية (إلزامي)
                    </h3>
                    <div className="bg-white p-4 rounded-lg border border-red-200 mb-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
                            <div className="md:col-span-2">
                                <label className="block text-[10px] font-bold text-gray-500 mb-1">عنوان الخطر / الفرصة *</label>
                                <input value={initRisk.title} onChange={(e) => setInitRisk({...initRisk, title: e.target.value})} className="w-full p-2 border rounded-lg text-sm" placeholder="مثال: تأخر في توريد المعدات" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 mb-1">التصنيف</label>
                                <select value={initRisk.category} onChange={(e) => setInitRisk({...initRisk, category: e.target.value, responseType: e.target.value === 'threat' ? 'تخفيف' : 'استغلال'})} className="w-full p-2 border rounded-lg text-sm">
                                    <option value="threat">تهديد</option>
                                    <option value="opportunity">فرصة</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 mb-1">الاستجابة</label>
                                <select value={initRisk.responseType} onChange={(e) => setInitRisk({...initRisk, responseType: e.target.value})} className="w-full p-2 border rounded-lg text-sm">
                                    {initRisk.category === 'threat' ? (
                                        <>
                                            <option value="تجنب">تجنب</option>
                                            <option value="نقل">نقل</option>
                                            <option value="تخفيف">تخفيف</option>
                                            <option value="قبول">قبول</option>
                                        </>
                                    ) : (
                                        <>
                                            <option value="استغلال">استغلال</option>
                                            <option value="مشاركة">مشاركة</option>
                                            <option value="تحسين">تحسين</option>
                                            <option value="قبول">قبول</option>
                                        </>
                                    )}
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 mb-1">نطاق الأثر</label>
                                <select value={initRisk.impactScope} onChange={(e) => setInitRisk({...initRisk, impactScope: e.target.value, subImpactScope: ''})} className="w-full p-2 border rounded-lg text-sm">
                                    <option value="">اختر...</option>
                                    <option value="الاستراتيجية">الاستراتيجية</option>
                                    <option value="المالية">المالية</option>
                                    <option value="التشغيلية">التشغيلية</option>
                                    <option value="التقنية">التقنية</option>
                                    <option value="السمعة">السمعة</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 mb-1">النطاق الفرعي</label>
                                <select value={initRisk.subImpactScope} onChange={(e) => setInitRisk({...initRisk, subImpactScope: e.target.value})} disabled={!initRisk.impactScope} className="w-full p-2 border rounded-lg text-sm disabled:bg-gray-100">
                                    <option value="">اختر...</option>
                                    {initRisk.impactScope === 'الاستراتيجية' && (<><option value="الحوكمة">الحوكمة</option><option value="المستهدفات">المستهدفات</option></>)}
                                    {initRisk.impactScope === 'المالية' && (<><option value="التكاليف">التكاليف</option><option value="السيولة">السيولة</option></>)}
                                    {initRisk.impactScope === 'التشغيلية' && (<><option value="الإجراءات">الإجراءات</option><option value="الموارد">الموارد</option></>)}
                                    {initRisk.impactScope === 'التقنية' && (<><option value="الأنظمة">الأنظمة</option><option value="البيانات">البيانات</option></>)}
                                    {initRisk.impactScope === 'السمعة' && (<><option value="المصداقية">المصداقية</option><option value="العملاء">العملاء</option></>)}
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-[10px] font-bold text-gray-500 mb-1">خطة التخفيف / الاستجابة</label>
                                <input value={initRisk.mitigationPlan} onChange={(e) => setInitRisk({...initRisk, mitigationPlan: e.target.value})} className="w-full p-2 border rounded-lg text-sm" placeholder="وصف الإجراءات المخططة" />
                            </div>
                            <div className="flex gap-2 bg-gray-50 p-2 rounded border">
                                <div className="flex-1">
                                    <label className="block text-[10px] font-bold text-gray-500 mb-1">احتمالية (1-5)</label>
                                    <input type="number" min="1" max="5" value={initRisk.prob} onChange={(e) => setInitRisk({...initRisk, prob: e.target.value})} className="w-full p-1 border rounded text-center font-bold text-sm" />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-[10px] font-bold text-gray-500 mb-1">تأثير (1-5)</label>
                                    <input type="number" min="1" max="5" value={initRisk.impact} onChange={(e) => setInitRisk({...initRisk, impact: e.target.value})} className="w-full p-1 border rounded text-center font-bold text-sm" />
                                </div>
                            </div>
                        </div>
                        <button type="button" onClick={handleAddRisk} className="w-full bg-red-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-red-700 transition flex items-center justify-center gap-2">
                            <i className="fa-solid fa-plus"></i> إضافة إلى سجل المخاطر
                        </button>
                    </div>
                    <div className="space-y-2">
                        {addedRisks.map((risk) => (
                            <div key={risk.id} className="bg-white p-3 border rounded-lg text-sm shadow-sm">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2 flex-1">
                                        <span className={`text-xs font-bold px-2 py-1 rounded ${risk.category === 'threat' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                            {risk.category === 'threat' ? 'تهديد' : 'فرصة'}
                                        </span>
                                        <span className="font-bold text-gray-800">{risk.title}</span>
                                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded font-bold">
                                            P{risk.prob}×I{risk.impact} = {risk.prob * risk.impact}
                                        </span>
                                    </div>
                                    <button type="button" onClick={() => handleRemoveRisk(risk.id)} className="text-gray-400 hover:text-red-600 transition">
                                        <i className="fa-solid fa-trash-can"></i>
                                    </button>
                                </div>
                                {(risk.impactScope || risk.mitigationPlan) && (
                                    <div className="text-xs text-gray-600 space-y-1 mr-6">
                                        {risk.impactScope && (
                                            <div><span className="font-bold">النطاق:</span> {risk.impactScope} {risk.subImpactScope && `→ ${risk.subImpactScope}`}</div>
                                        )}
                                        {risk.responseType && (
                                            <div><span className="font-bold">الاستجابة:</span> {risk.responseType}</div>
                                        )}
                                        {risk.mitigationPlan && (
                                            <div><span className="font-bold">الخطة:</span> {risk.mitigationPlan}</div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

            </form>
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50 flex justify-end gap-3 rounded-b-2xl">
            <button onClick={onClose} className="px-6 py-2 rounded-lg text-gray-600 hover:bg-gray-200 font-bold transition">إلغاء</button>
            <button onClick={handleSubmit} className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg shadow-lg font-bold transition transform active:scale-95">حفظ وإرسال</button>
        </div>
        </div>
      </div>
    </>
  );
};

export default NewProjectModal;