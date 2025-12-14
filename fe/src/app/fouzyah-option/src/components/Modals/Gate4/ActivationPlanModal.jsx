import React, { useState } from 'react';

const ActivationPlanModal = ({ data, onClose, onSave }) => {
    const [plan, setPlan] = useState(data || []);
    const [newRow, setNewRow] = useState({ activity: '', classification: 'حزمة عمل', date: '' });

    const addRow = () => {
        if (newRow.activity) {
            setPlan([...plan, { ...newRow, id: Date.now() }]);
            setNewRow({ activity: '', classification: 'حزمة عمل', date: '' });
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm fade-in">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 border-t-8 border-secondary-gold">
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <h3 className="text-xl font-bold text-primary-900">خطة التفعيل (Activation Plan)</h3>
                    <button onClick={onClose}><i className="fa-solid fa-xmark text-gray-400 hover:text-red-600 text-xl"></i></button>
                </div>

                <div className="grid grid-cols-12 gap-2 mb-4 bg-gray-50 p-4 rounded border">
                    <div className="col-span-5"><input className="w-full p-2 border rounded text-sm" placeholder="نشاط التفعيل" value={newRow.activity} onChange={e=>setNewRow({...newRow, activity:e.target.value})} /></div>
                    <div className="col-span-3">
                        <select className="w-full p-2 border rounded text-sm" value={newRow.classification} onChange={e=>setNewRow({...newRow, classification:e.target.value})}>
                            <option value="حزمة عمل">حزمة عمل</option>
                            <option value="نشاط تفعيل">نشاط تفعيل</option>
                            <option value="معلم رئيسي">معلم رئيسي</option>
                        </select>
                    </div>
                    <div className="col-span-2"><input type="date" className="w-full p-2 border rounded text-sm" value={newRow.date} onChange={e=>setNewRow({...newRow, date:e.target.value})} /></div>
                    <div className="col-span-2"><button onClick={addRow} className="bg-primary-600 text-white w-full py-2 rounded font-bold text-sm">إضافة</button></div>
                </div>

                <div className="overflow-x-auto border rounded-lg">
                    <table className="w-full text-sm text-right">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="p-3">النشاط</th>
                                <th className="p-3">تصنيف النشاط</th>
                                <th className="p-3">التاريخ المستهدف</th>
                                <th className="p-3"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {plan.map((r) => (
                                <tr key={r.id}>
                                    <td className="p-3 font-bold">{r.activity}</td>
                                    <td className="p-3">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                                            r.classification === 'حزمة عمل' ? 'bg-blue-100 text-blue-700' :
                                            r.classification === 'نشاط تفعيل' ? 'bg-green-100 text-green-700' :
                                            'bg-purple-100 text-purple-700'
                                        }`}>
                                            {r.classification}
                                        </span>
                                    </td>
                                    <td className="p-3">{r.date}</td>
                                    <td className="p-3"><i className="fa-solid fa-trash text-red-400 cursor-pointer" onClick={()=>setPlan(plan.filter(i=>i.id!==r.id))}></i></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-6 flex justify-end gap-3 pt-4 border-t">
                    <button onClick={onClose} className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded font-bold">إلغاء</button>
                    <button onClick={()=>onSave(plan)} className="px-8 py-2 bg-primary-600 text-white rounded font-bold shadow">حفظ الخطة</button>
                </div>
            </div>
        </div>
    );
};

export default ActivationPlanModal;