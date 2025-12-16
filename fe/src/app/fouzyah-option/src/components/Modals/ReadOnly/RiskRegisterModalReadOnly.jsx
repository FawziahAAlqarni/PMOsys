import React from 'react';

const RiskRegisterModalReadOnly = ({ risks, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm fade-in">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto p-6 border-t-8 border-red-600">
        
        <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <i className="fa-solid fa-shield-virus text-red-600"></i> سجل المخاطر (Risk Register)
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">للعرض فقط</span>
            </h3>
            <button onClick={onClose}><i className="fa-solid fa-xmark text-gray-400 hover:text-red-600 text-xl"></i></button>
        </div>

        <div className="overflow-x-auto border rounded">
            <table className="w-full text-sm">
                <thead className="bg-gray-100 text-gray-700">
                    <tr>
                        <th className="p-3">#</th>
                        <th className="p-3">الخطر / الفرصة</th>
                        <th className="p-3">التصنيف</th>
                        <th className="p-3">التقييم (P×I)</th>
                        <th className="p-3">النطاق</th>
                        <th className="p-3">الاستجابة</th>
                        <th className="p-3">الخطة</th>
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {risks && risks.map((r, i) => (
                        <tr key={r.id} className="hover:bg-gray-50">
                            <td className="p-3 font-bold text-gray-500">{i+1}</td>
                            <td className="p-3 font-bold">{r.title}</td>
                            <td className="p-3">
                                <span className={`px-2 py-1 rounded text-xs font-bold ${
                                    r.category==='threat' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
                                }`}>
                                    {r.category==='threat' ? 'تهديد' : 'فرصة'}
                                </span>
                            </td>
                            <td className="p-3">
                                <span className={`font-mono font-bold px-2 py-1 rounded ${
                                    r.prob*r.impact>=15 ? 'bg-red-100 text-red-800' : 'bg-gray-100'
                                }`}>
                                    {r.prob * r.impact}
                                </span>
                            </td>
                            <td className="p-3 text-xs">{r.impactScope} - {r.subImpactScope}</td>
                            <td className="p-3 text-xs">{r.responseType}</td>
                            <td className="p-3 text-xs text-gray-600 max-w-xs truncate">{r.mitigationPlan}</td>
                        </tr>
                    ))}
                    {(!risks || risks.length === 0) && (
                        <tr><td colSpan="7" className="p-8 text-center text-gray-400">لا توجد مخاطر مسجلة</td></tr>
                    )}
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

export default RiskRegisterModalReadOnly;
