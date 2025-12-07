'use client';
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
}