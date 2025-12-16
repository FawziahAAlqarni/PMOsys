import React, { useState } from 'react';
import RiskModal from '../Modals/RiskModal';

const RiskRegister = ({ risks, onUpdate }) => {
  const [showModal, setShowModal] = useState(false);

  const addRisk = (newRisk) => {
    const updatedRisks = [...(risks || []), { ...newRisk, id: Date.now(), status: 'نشط' }];
    onUpdate(updatedRisks);
    setShowModal(false);
  };

  const deleteRisk = (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا السجل؟")) {
      const updatedRisks = risks.filter((r) => r.id !== id);
      onUpdate(updatedRisks);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mt-8 border-t-4 border-t-red-500">
      
      {/* الرأس (Header) */}
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <div className="flex items-center gap-3">
          <div className="bg-red-50 p-2 rounded-lg text-red-500">
            <i className="fa-solid fa-shield-virus text-2xl"></i>
          </div>
          <div>
            <h4 className="font-bold text-lg text-gray-800">سجل المخاطر (Risk Register)</h4>
            <p className="text-xs text-gray-400">تحديد وتقييم المخاطر المحتملة واستراتيجيات التعامل معها</p>
          </div>
        </div>
        
        {/* زر الإضافة الأحمر الكبير */}
        <button 
          onClick={() => setShowModal(true)} 
          className="bg-red-600 text-white px-6 py-2 rounded-lg text-sm font-bold shadow hover:bg-red-700 transition flex items-center gap-2"
        >
          <i className="fa-solid fa-plus"></i> إضافة للقائمة
        </button>
      </div>

      {/* قائمة المخاطر (Cards List) */}
      <div className="space-y-3">
        {(!risks || risks.length === 0) ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400">
            <i className="fa-solid fa-shield-cat text-4xl mb-3 opacity-20"></i>
            <p>لا توجد مخاطر مسجلة حالياً</p>
          </div>
        ) : (
          risks.map((r, i) => {
            const score = r.prob * r.impact;
            const isThreat = r.category === 'threat';
            return (
              <div key={r.id} className={`flex justify-between items-center p-4 border rounded-xl hover:shadow-md transition bg-white border-r-4 ${isThreat ? 'border-r-red-500' : 'border-r-green-500'}`}>
                
                {/* المعلومات اليسرى */}
                <div className="flex items-center gap-4">
                  <span className="text-gray-300 font-bold text-xl w-8 text-center bg-gray-50 rounded h-8 flex items-center justify-center">{i + 1}</span>
                  <div>
                    <div className="flex items-center gap-2">
                        <h5 className="font-bold text-gray-800 text-sm">{r.title}</h5>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${isThreat ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                            {isThreat ? 'تهديد' : 'فرصة'}
                        </span>
                    </div>
                    <div className="text-[10px] text-gray-500 mt-1 flex gap-3">
                        <span className="bg-gray-100 px-2 rounded">الاستجابة: {r.responseType || '-'}</span>
                        <span className="bg-gray-100 px-2 rounded">الحالة: {r.status || 'مفتوح'}</span>
                    </div>
                  </div>
                </div>

                {/* المعلومات اليمنى (التقييم والحذف) */}
                <div className="flex items-center gap-6">
                  <div className="text-center bg-gray-50 px-3 py-1 rounded border border-gray-100">
                    <span className="block text-[9px] text-gray-400 uppercase tracking-wider">الدرجة</span>
                    <span className={`font-bold text-lg font-mono ${score >= 15 ? 'text-red-600' : score >= 10 ? 'text-yellow-600' : 'text-green-600'}`}>
                        {score}
                    </span>
                  </div>
                  
                  <div className="w-px h-8 bg-gray-200"></div>

                  <button 
                    onClick={() => deleteRisk(r.id)} 
                    className="text-gray-300 hover:text-red-500 transition p-2 rounded-full hover:bg-red-50"
                    title="حذف السجل"
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* النافذة المنبثقة (Modal) */}
      {showModal && <RiskModal onClose={() => setShowModal(false)} onSave={addRisk} />}
    </div>
  );
};

export default RiskRegister;