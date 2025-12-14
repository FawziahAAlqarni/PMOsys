import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// استيراد النوافذ المنبثقة
import RiskRegisterModal from '../Modals/RiskRegisterModal';
import ScopeModal from '../Modals/Gate2/ScopeModal';
import ProcurementModal from '../Modals/Gate2/ProcurementModal';
import AssumptionsModal from '../Modals/Gate2/AssumptionsModal';
import ChangeCardModal from '../Modals/Gate2/ChangeCardModal';
import TimelineModal from '../Modals/Gate3/TimelineModal';
import CharterModal from '../Modals/Gate3/CharterModal';
import LessonsLearnedModal from '../Modals/Gate4/LessonsLearnedModal';
import ActivationPlanModal from '../Modals/Gate4/ActivationPlanModal';

const GateControl = ({ project, onUpdate, currentGateView }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  // تحديد البوابة المعروضة (من الرابط أو البوابة الحالية للمشروع)
  const viewGate = currentGateView || project.stage;

  // ================= 1. تهيئة البيانات =================
  const ensureGate2Data = () => {
    return {
        scope: { 
            generalDescription: '',
            directGoal: '', 
            targetState: '', 
            currentState: '', 
            workScope: '',
            activities: [],
            deliverables: [], 
            stakeholders: [], 
            transformationReqs: '',
            // الحقول القديمة للتوافق
            goal: '', 
            result: '', 
            initiative: '', 
            program: '', 
            dependsOn: '', 
            dependentOn: '' 
        },
        procurement: { options: { internal: {}, hybrid: {}, outsourced: {} }, selectedOption: 'الخيار الأول: التنفيذ الداخلي', selectedOptionAnalysis: { pros: '', cons: '' } },
        assumptions: [],
        changeCard: { justification: '', benefit: '', changeRisks: [], stakeholders: [], interventions: { low: false, medium: false, high: false, applied: null } },
        ...project.gate2Data
    };
  };

  const gate2Data = ensureGate2Data();
  const gate3Data = project.gate3Data || { timeline: [] };
  const gate4Data = project.gate4Data || { timeline: [], lessons: [], activationPlan: [] };
  const projectRisks = project.risks || [];

  // ================= 2. دوال التحديث (مع الحفظ التلقائي) =================
  const updateProjectData = async (section, data) => {
    const updatedProject = { ...project, [section]: data };
    try {
      await onUpdate(updatedProject);
      console.log(`✅ تم حفظ ${section} في قاعدة البيانات`);
    } catch (error) {
      console.error(`❌ خطأ في حفظ ${section}:`, error);
      alert('حدث خطأ أثناء الحفظ. يرجى المحاولة مرة أخرى.');
    }
  };
  
  const saveGate2 = async (section, newData) => { 
    const updatedGate2 = { ...gate2Data, [section]: newData }; 
    await updateProjectData('gate2Data', updatedGate2); 
  };
  
  const updateGate3 = async (newData) => await updateProjectData('gate3Data', { ...gate3Data, ...newData });
  const updateGate4 = async (newData) => await updateProjectData('gate4Data', { ...gate4Data, ...newData });
  const updateRisks = async (newRisks) => {
    try {
      await onUpdate({ ...project, risks: newRisks });
      console.log('✅ تم حفظ المخاطر في قاعدة البيانات');
    } catch (error) {
      console.error('❌ خطأ في حفظ المخاطر:', error);
    }
  };

  // ================= 3. إدارة النوافذ =================
  const [activeModal, setActiveModal] = useState(null); 

  // ================= 4. منطق الموافقات (البوابة 1) =================
  const approvalWorkflow = [
    { id: 'progMgr', role: 'مدير البرنامج', order: 1 },
    { id: 'planning', role: 'إدارة التخطيط', order: 2 },
    { id: 'governance', role: 'إدارة الحوكمة/المخاطر', order: 3 },
    { id: 'portfolio', role: 'مدير الإدارة العامة للمحافظ', order: 4 }
  ];

  const handleApprovalAction = async (roleId, action) => {
    let nextOrder = project.currentApproverOrder || 1;
    let nextStage = project.stage;
    let newRejectionNotes = { ...(project.rejectionNotes || {}) };
    let newApprovals = { ...(project.approvals || {}) };
    const step = approvalWorkflow.find(s => s.id === roleId);

    if (action === 'approve') {
        newApprovals[roleId] = 'approved';
        newRejectionNotes[roleId] = '';
        
        if (step.order < 4) {
            nextOrder = step.order + 1;
        } else {
            nextOrder = 5; 
            nextStage = 2;
            alert(`✅ تم الاعتماد النهائي. انتقل المشروع إلى البوابة الثانية.`);
            navigate(`/project/${id}/gate/2`);
        }
    } else {
        const reason = prompt(`الرجاء كتابة سبب الرفض (${step.role}):`);
        if (!reason) return;
        newApprovals[roleId] = 'rejected';
        newRejectionNotes[roleId] = reason;
    }

    try {
      await onUpdate({ 
          ...project, 
          approvals: newApprovals, 
          rejectionNotes: newRejectionNotes, 
          currentApproverOrder: nextOrder, 
          stage: nextStage 
      });
      console.log('✅ تم حفظ حالة الموافقة في قاعدة البيانات');
    } catch (error) {
      console.error('❌ خطأ في حفظ الموافقة:', error);
      alert('حدث خطأ أثناء حفظ الموافقة. يرجى المحاولة مرة أخرى.');
    }
  };

  // دالة الانتقال بين البوابات
  const transitionToGate = async (nextGate) => {
      if(window.confirm(`هل أنت متأكد من اكتمال المتطلبات والانتقال للبوابة ${nextGate}؟`)) {
          try {
            await onUpdate({ ...project, stage: nextGate });
            navigate(`/project/${id}/gate/${nextGate}`);
            window.scrollTo(0,0);
            console.log(`✅ تم الانتقال إلى البوابة ${nextGate}`);
          } catch (error) {
            console.error('❌ خطأ في الانتقال للبوابة:', error);
            alert('حدث خطأ أثناء الانتقال. يرجى المحاولة مرة أخرى.');
          }
      }
  };


  // ================= 5. مكون واجهة البطاقة (Requirement Item) =================
  const RequirementItem = ({ title, status, icon, btnText, onClick, btnColor = "bg-primary-600", subText }) => (
      <div className={`p-6 rounded-xl border-2 shadow-md hover:shadow-lg transition flex justify-between items-center mb-4 group ${status === 'done' ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl transition-colors shadow-sm ${status === 'done' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500 group-hover:bg-primary-100 group-hover:text-primary-700'}`}>
                  {status === 'done' ? <i className="fa-solid fa-check"></i> : <i className={`fa-solid ${icon}`}></i>}
              </div>
              <div>
                  <h4 className="font-bold text-gray-900 text-base">{title}</h4>
                  <p className="text-sm text-gray-500 mt-1">{subText || (status === 'done' ? 'تم الإكمال' : 'مطلوب للمتابعة')}</p>
              </div>
          </div>
          <button 
            onClick={onClick} 
            className={`${status === 'done' ? 'bg-green-600' : btnColor} text-white px-8 py-3 rounded-lg text-sm font-bold hover:opacity-90 transition shadow-md hover:shadow-lg`}
          >
              {status === 'done' ? 'عرض / تعديل' : btnText}
          </button>
      </div>
  );


  // ================= 6. العرض (Renders) =================

  // --- شاشة القفل (إذا حاول الدخول لبوابة مستقبلية) ---
  if (viewGate > project.stage) {
      return (
          <div className="flex flex-col items-center justify-center py-32 text-center bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4 text-gray-400">
                  <i className="fa-solid fa-lock text-4xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-600 mb-2">هذه البوابة مغلقة حالياً</h3>
              <p className="text-gray-500 text-sm mb-6">يجب إكمال متطلبات البوابة {project.stage} واعتمادها أولاً.</p>
              <button onClick={() => navigate(`/project/${id}/gate/${project.stage}`)} className="text-primary-600 font-bold hover:underline">
                  الذهاب للبوابة الحالية <i className="fa-solid fa-arrow-left mr-1"></i>
              </button>
          </div>
      );
  }

  // --- البوابة 1: التأسيس (مسار الموافقات) ---
  const renderGate1 = () => (
      <div className="max-w-4xl mx-auto py-6">
          <div className="text-center mb-10">
              <h3 className="text-2xl font-bold text-primary-900">البوابة الأولى: التأسيس</h3>
              <span className="inline-block mt-2 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">
                  حالة المسار: {project.currentApproverOrder > 4 ? 'مكتمل' : 'قيد الموافقات'}
              </span>
          </div>

          <div className="bg-white p-8 rounded-2xl border shadow-sm mb-6">
              <h4 className="font-bold text-primary-800 mb-6 border-b pb-2">مسار الموافقات الإلكتروني</h4>
              <div className="space-y-6 relative border-r-2 border-gray-100 mr-3">
                  {approvalWorkflow.map((step) => {
                      const status = project.approvals?.[step.id]; // 'approved', 'rejected', 'pending'
                      const isCurrent = (project.currentApproverOrder || 1) === step.order;
                      const rejectionNote = project.rejectionNotes?.[step.id];

                      let iconClass = "bg-gray-50 text-gray-300 border-gray-200";
                      let icon = <i className="fa-solid fa-lock"></i>;
                      let statusText = "في الانتظار";

                      if (status === 'approved') {
                          iconClass = "bg-green-100 text-green-600 border-green-200";
                          icon = <i className="fa-solid fa-check"></i>;
                          statusText = `تم الاعتماد بتاريخ ${new Date().toLocaleDateString('en-GB')}`; // تاريخ وهمي
                      } else if (status === 'rejected') {
                          iconClass = "bg-red-100 text-red-600 border-red-200";
                          icon = <i className="fa-solid fa-xmark"></i>;
                          statusText = "تم الرفض - يرجى المراجعة";
                      } else if (isCurrent) {
                          iconClass = "bg-white text-secondary-gold border-secondary-gold ring-4 ring-orange-50";
                          icon = <i className="fa-solid fa-hourglass-half fa-spin"></i>;
                          statusText = "في انتظار الإجراء...";
                      }

                      return (
                          <div key={step.id} className="relative flex items-start gap-4 pr-8">
                              {/* Icon on Timeline */}
                              <div className={`absolute -right-[19px] w-8 h-8 rounded-full border-2 flex items-center justify-center z-10 transition-all ${iconClass}`}>
                                  {icon}
                              </div>
                              
                              {/* Card Content */}
                              <div className={`flex-1 p-4 rounded-xl border transition-all ${isCurrent ? 'bg-blue-50 border-blue-200 shadow-sm' : 'bg-gray-50 border-gray-100 opacity-90'}`}>
                                  <div className="flex justify-between items-start">
                                      <div>
                                          <h5 className={`font-bold text-sm ${isCurrent ? 'text-primary-900' : 'text-gray-600'}`}>{step.role}</h5>
                                          <p className="text-[10px] text-gray-500 mt-1">{statusText}</p>
                                      </div>
                                      
                                      {/* Action Buttons (Only for current step) */}
                                      {isCurrent && status !== 'approved' && (
                                          <div className="flex gap-2">
                                              <button onClick={() => handleApprovalAction(step.id, 'approve')} className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-green-700 shadow-sm flex items-center gap-1"><i className="fa-solid fa-check"></i> اعتماد</button>
                                              <button onClick={() => handleApprovalAction(step.id, 'reject')} className="bg-white text-red-600 border border-red-200 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-50 flex items-center gap-1"><i className="fa-solid fa-xmark"></i> رفض</button>
                                          </div>
                                      )}
                                  </div>

                                  {/* Rejection Note Display */}
                                  {status === 'rejected' && rejectionNote && (
                                      <div className="mt-3 bg-red-50 p-3 rounded-lg border border-red-100 text-xs">
                                          <p className="font-bold text-red-800 mb-1"><i className="fa-solid fa-circle-exclamation ml-1"></i> سبب الرفض:</p>
                                          <p className="text-red-700">{rejectionNote}</p>
                                          <button onClick={() => handleApprovalAction(step.id, 'approve')} className="mt-2 text-primary-600 underline font-bold hover:text-primary-800">إعادة تقديم الطلب</button>
                                      </div>
                                  )}
                              </div>
                          </div>
                      );
                  })}
              </div>
          </div>

          <div className="border-t pt-6">
             <h4 className="font-bold text-gray-700 mb-4 text-sm">المتطلبات الإضافية:</h4>
             <RequirementItem 
                  title="سجل المخاطر الأولي" 
                  subText="تحديد المخاطر عالية المستوى في مرحلة التأسيس"
                  icon="fa-shield-virus" 
                  btnText="عرض / تحديث السجل" 
                  btnColor="bg-red-600" 
             ى      status={projectRisks.length > 0 ? 'done' : ''} 
                  onClick={() => setActiveModal('risks')} 
              />
          </div>
      </div>
  );

  // --- البوابة 2: التفصيل ---
  const renderGate2 = () => (
      <div className="max-w-4xl mx-auto py-6">
          <div className="text-center mb-10"><h3 className="text-2xl font-bold text-primary-900">البوابة الثانية: التفصيل</h3></div>

          <div className="space-y-4">
              <RequirementItem title="نطاق المشروع التفصيلي" subText="تحديد الأهداف، المخرجات، والاعتمادات" icon="fa-bullseye" btnText="تحديد النطاق" btnColor="bg-secondary-gold" status={gate2Data.scope.directGoal || gate2Data.scope.goal ? 'done' : ''} onClick={() => setActiveModal('scope')} />
              <RequirementItem title="خطة المشتريات وتحليل الخيارات" subText="مقارنة الخيارات (داخلي/خارجي) والتكاليف" icon="fa-shopping-cart" btnText="تحليل الخيارات" btnColor="bg-primary-600" status={gate2Data.procurement.options.internal.cost ? 'done' : ''} onClick={() => setActiveModal('procurement')} />
              <RequirementItem title="سجل الافتراضات والقيود" subText="توثيق الافتراضات وتأثيرها" icon="fa-list-check" btnText="فتح السجل" btnColor="bg-yellow-600" status={gate2Data.assumptions.length > 0 ? 'done' : ''} onClick={() => setActiveModal('assumptions')} />
              <RequirementItem title="بطاقة التغيير (Change Card)" subText="إدارة التغيير وأصحاب المصلحة" icon="fa-exchange-alt" btnText="إعداد البطاقة" btnColor="bg-gray-600" status={gate2Data.changeCard.changeRisks.length > 0 ? 'done' : ''} onClick={() => setActiveModal('change')} />
              <RequirementItem title="تحديث سجل المخاطر" subText="مراجعة وتحديث المخاطر للمرحلة الحالية" icon="fa-shield-virus" btnText="تحديث السجل" btnColor="bg-red-600" status={projectRisks.length > 0 ? 'done' : ''} onClick={() => setActiveModal('risks')} />
          </div>

          <div className="text-center mt-10 border-t pt-6">
              <button onClick={() => transitionToGate(3)} className="bg-secondary-gold text-white px-12 py-3 rounded-xl font-bold shadow-lg hover:bg-yellow-600 transition transform hover:scale-105">
                  اعتماد المرحلة والانتقال للبوابة الثالثة
              </button>
          </div>
      </div>
  );

  // --- البوابة 3: التخطيط ---
  const renderGate3 = () => (
      <div className="max-w-4xl mx-auto py-6">
          <div className="text-center mb-10"><h3 className="text-2xl font-bold text-primary-900">البوابة الثالثة: التخطيط</h3></div>

          <div className="space-y-4">
              <RequirementItem title="ميثاق المشروع (Charter)" subText="الوثيقة المرجعية المعتمدة للمشروع" icon="fa-file-contract" btnText="تعبئة الميثاق" btnColor="bg-yellow-600" status={project.charter?.budget?.consult ? 'done' : ''} onClick={() => setActiveModal('charter')} />
              <RequirementItem title="الخطة التفصيلية (الجدول الزمني)" subText="توزيع حزم الأعمال على الجدول الزمني" icon="fa-calendar-days" btnText="إعداد الجدول" btnColor="bg-blue-600" status={gate3Data.timeline.length > 0 ? 'done' : ''} onClick={() => setActiveModal('timeline')} />
              <RequirementItem title="تحديث سجل المخاطر" subText="إضافة مخاطر مرحلة التخطيط" icon="fa-shield-virus" btnText="تحديث السجل" btnColor="bg-red-600" status={projectRisks.length > 0 ? 'done' : ''} onClick={() => setActiveModal('risks')} />
          </div>

          <div className="text-center mt-10 border-t pt-6">
              <button onClick={() => transitionToGate(4)} className="bg-secondary-gold text-white px-12 py-3 rounded-xl font-bold shadow-lg hover:bg-yellow-600 transition transform hover:scale-105">
                  اعتماد الخطة والانتقال للبوابة الرابعة
              </button>
          </div>
      </div>
  );

  // --- البوابة 4: التنفيذ والإغلاق ---
  const renderGate4 = () => (
      <div className="max-w-4xl mx-auto py-6">
          <div className="text-center mb-10"><h3 className="text-2xl font-bold text-primary-900">البوابة الرابعة: التنفيذ والإغلاق</h3></div>

          <div className="space-y-4">
              <RequirementItem 
                  title="تحديث الجدول الزمني (متابعة الإنجاز)" subText="تحديث حالة المهام ونسب الإنجاز" icon="fa-calendar-check" btnText="تحديث الجدول" btnColor="bg-blue-700" status={gate4Data.timeline.length > 0 ? 'done' : ''} 
                  onClick={() => {
                      // نسخ الجدول من البوابة 3 إذا كان فارغاً عند أول دخول
                      if (!gate4Data.timeline.length && gate3Data.timeline.length) { updateGate4({ timeline: gate3Data.timeline }); }
                      setActiveModal('gate4Timeline');
                  }} 
              />
              <RequirementItem title="خطة التفعيل (Activation Plan)" subText="خطة تسليم المنتج وتشغيله" icon="fa-rocket" btnText="إعداد الخطة" btnColor="bg-purple-600" status={gate4Data.activationPlan?.length > 0 ? 'done' : ''} onClick={() => setActiveModal('activation')} />
              <RequirementItem title="الدروس المستفادة" subText="توثيق الدروس للمشاريع المستقبلية" icon="fa-book-open" btnText="توثيق الدروس" btnColor="bg-yellow-600" status={gate4Data.lessons?.length > 0 ? 'done' : ''} onClick={() => setActiveModal('lessons')} />
              <RequirementItem title="تحديث سجل المخاطر النهائي" subText="إغلاق المخاطر المتبقية" icon="fa-shield-virus" btnText="تحديث السجل" btnColor="bg-red-600" status={projectRisks.length > 0 ? 'done' : ''} onClick={() => setActiveModal('risks')} />
          </div>

          <div className="text-center mt-10 border-t pt-6">
              <button onClick={() => transitionToGate(5)} className="bg-green-800 text-white px-12 py-3 rounded-xl font-bold shadow-lg hover:bg-green-900 transition transform hover:scale-105">
                  إغلاق المشروع وأرشفته نهائياً
              </button>
          </div>
      </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {viewGate === 1 && renderGate1()}
      {viewGate === 2 && renderGate2()}
      {viewGate === 3 && renderGate3()}
      {viewGate === 4 && renderGate4()}
      {viewGate === 5 && <div className="text-center py-20 bg-white rounded-xl shadow"><i className="fa-solid fa-check-circle text-green-600 text-6xl mb-4"></i><h2 className="text-2xl font-bold text-gray-800">تم إغلاق المشروع بنجاح</h2></div>}

      {/* Modals Injection */}
      {activeModal === 'risks' && <RiskRegisterModal risks={projectRisks} onClose={() => setActiveModal(null)} onUpdate={updateRisks} />}
      {activeModal === 'scope' && <ScopeModal data={gate2Data.scope} onClose={()=>setActiveModal(null)} onSave={(d)=>{saveGate2('scope', d); setActiveModal(null);}} />}
      {activeModal === 'procurement' && <ProcurementModal data={gate2Data.procurement} onClose={()=>setActiveModal(null)} onSave={(d)=>{saveGate2('procurement', d); setActiveModal(null);}} />}
      {activeModal === 'assumptions' && <AssumptionsModal 
        data={gate2Data.assumptions} 
        onClose={()=>setActiveModal(null)} 
        onSave={(d)=>{saveGate2('assumptions', d); setActiveModal(null);}} 
        onConvertToRisk={(riskData) => {
          // إضافة الخطر المحول إلى سجل المخاطر
          const newRisk = { ...riskData, id: Date.now() };
          updateRisks([...projectRisks, newRisk]);
        }}
      />}
      {activeModal === 'change' && <ChangeCardModal data={gate2Data.changeCard} project={project} onClose={()=>setActiveModal(null)} onSave={(d)=>{saveGate2('changeCard', d); setActiveModal(null);}} />}
      {activeModal === 'timeline' && <TimelineModal data={gate3Data} onClose={()=>setActiveModal(null)} onSave={(d)=>{updateGate3(d); setActiveModal(null);}} />}
      {activeModal === 'charter' && <CharterModal data={project.charter} project={project} onClose={()=>setActiveModal(null)} onSave={(d)=>{onUpdate({...project, charter:d}); setActiveModal(null);}} />}
      {activeModal === 'gate4Timeline' && <TimelineModal data={gate4Data.timeline.length ? gate4Data : gate3Data} onClose={()=>setActiveModal(null)} onSave={(d)=>{updateGate4(d); setActiveModal(null);}} />}
      {activeModal === 'lessons' && <LessonsLearnedModal data={gate4Data.lessons} onClose={()=>setActiveModal(null)} onSave={async (d)=>{
        try {
          // حفظ الدروس في البوابة 4
          updateGate4({lessons:d});
          
          // حفظ الدروس الجديدة في قاعدة البيانات
          const currentGlobalLessons = project.data?.lessonsLearned || [];
          const existingIds = new Set(currentGlobalLessons.map(l => l.id));
          const newLessons = d.filter(lesson => !existingIds.has(lesson.id));
          
          if (newLessons.length > 0) {
            // إرسال الدروس إلى API
            const response = await fetch('http://localhost:3030/lessons-learned/bulk', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                lessons: newLessons,
                projectId: project.id,
                projectName: project.name
              })
            });
            
            if (response.ok) {
              const savedLessons = await response.json();
              console.log('✓ تم حفظ الدروس في قاعدة البيانات:', savedLessons);
              
              // تحديث السجل المحلي
              const updatedGlobalLessons = [...currentGlobalLessons, ...savedLessons];
              onUpdate({...project, data: {...project.data, lessonsLearned: updatedGlobalLessons}});
            } else {
              console.error('خطأ في حفظ الدروس');
              // حفظ محلياً فقط في حالة فشل API
              const updatedGlobalLessons = [...currentGlobalLessons, ...newLessons];
              onUpdate({...project, data: {...project.data, lessonsLearned: updatedGlobalLessons}});
            }
          }
          setActiveModal(null);
        } catch (error) {
          console.error('خطأ في حفظ الدروس المستفادة:', error);
          // في حالة الخطأ، احفظ محلياً فقط
          updateGate4({lessons:d});
          setActiveModal(null);
        }
      }} />}
      {activeModal === 'activation' && <ActivationPlanModal data={gate4Data.activationPlan} onClose={()=>setActiveModal(null)} onSave={(d)=>{updateGate4({activationPlan:d}); setActiveModal(null);}} />}
    </div>  
  );
};

export default GateControl;