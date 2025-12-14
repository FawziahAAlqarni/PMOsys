import React, { useState } from 'react';

const ProcurementModal = ({ data, onClose, onSave }) => {
    // نضمن وجود قيم افتراضية لكل الحقول حتى لا تتحول المدخلات بين uncontrolled/controlled
    const emptyOption = { cost: '', duration: '', percent: '', startDate: '', notes: '' };
    const buildData = (d) => ({
        options: {
            internal: { ...emptyOption, ...(d?.options?.internal || {}) },
            hybrid: { ...emptyOption, ...(d?.options?.hybrid || {}) },
            outsourced: { ...emptyOption, ...(d?.options?.outsourced || {}) },
        },
        selectedOption: d?.selectedOption || 'الخيار الأول: التنفيذ الداخلي',
        selectedOptionAnalysis: {
            pros: d?.selectedOptionAnalysis?.pros || '',
            cons: d?.selectedOptionAnalysis?.cons || '',
        },
    });

    const [localData, setLocalData] = useState(buildData(data));

    const updateOption = (type, field, value) => {
        setLocalData((prev) => ({
            ...prev,
            options: {
                ...prev.options,
                [type]: { ...prev.options[type], [field]: value },
            },
        }));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm fade-in">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
                <div className="p-4 rounded-t-xl flex justify-between items-center" style={{background: 'linear-gradient(to right, #f9f5eb, #dccc9f)'}}>
                    <div className="flex items-center gap-3">
                        <div className="bg-white p-3 rounded-lg shadow-md" style={{minWidth: '64px', minHeight: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <img src="/Logo.png" alt="Logo" style={{width: '56px', height: '56px', objectFit: 'contain', imageRendering: '-webkit-optimize-contrast'}} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">تحليل خيارات خطة المشتريات</h3>
                            <p className="text-xs text-gray-600">المقارنة بين خيارات التنفيذ واختيار الأنسب</p>
                        </div>
                    </div>
                    <button onClick={onClose}><i className="fa-solid fa-xmark text-gray-400 hover:text-red-600 text-xl"></i></button>
                </div>
                <div className="p-6">

                <div className="overflow-x-auto mb-8 border rounded-lg shadow-sm">
                    <table className="w-full text-sm text-right">
                        <thead className="bg-primary-800 text-white">
                            <tr><th className="p-3 w-1/5">خيار التنفيذ</th><th className="p-3">آلية التنفيذ</th><th className="p-3 w-28">التكلفة التقديرية</th><th className="p-3 w-24">المدة الزمنية</th><th className="p-3 w-32">نسبة التنفيذ الخارجي</th><th className="p-3 w-32">تاريخ البدء</th><th className="p-3 w-40">ملاحظات</th></tr>
                        </thead>
                        <tbody className="divide-y">
                            {['internal', 'hybrid', 'outsourced'].map(opt => (
                                <tr key={opt} className="hover:bg-gray-50">
                                    <td className="p-3 font-bold text-primary-900 bg-gray-50">{opt==='internal'?'الخيار الأول: التنفيذ الداخلي':opt==='hybrid'?'الخيار الثاني: التنفيذ بالتكامل (هجين)':'الخيار الثالث: التنفيذ بالتعاقد الخارجي'}</td>
                                    <td className="p-3 text-xs text-gray-600 leading-relaxed">{opt==='internal'?'يتم تنفيذ المشروع بالكامل بواسطة فريق البرنامج دون أي تعاقد خارجي.':opt==='hybrid'?'يتم تنفيذ النطاق بشكل مشترك بين البرنامج والمورد، بحيث يتولى المورد مخرجات محددة.':'يتم إسناد كامل النطاق لمورد متخصص ينفذه بشكل احترافي شامل.'}</td>
                                    <td className="p-2"><input type="number" className="w-full p-1 border rounded text-center" value={localData.options[opt]?.cost || ''} onChange={e=>updateOption(opt, 'cost', e.target.value)} placeholder="ر.س"/></td>
                                    <td className="p-2"><input type="number" className="w-full p-1 border rounded text-center" value={localData.options[opt]?.duration || ''} onChange={e=>updateOption(opt, 'duration', e.target.value)} placeholder="شهر"/></td>
                                    <td className="p-2"><input type="number" min="0" max="100" className="w-full p-1 border rounded text-center" value={localData.options[opt]?.percent || ''} onChange={e=>updateOption(opt, 'percent', e.target.value)} placeholder="%"/></td>
                                    <td className="p-2"><input type="date" className="w-full p-1 border rounded text-center" value={localData.options[opt]?.startDate || ''} onChange={e=>updateOption(opt, 'startDate', e.target.value)}/></td>
                                    <td className="p-2"><input type="text" className="w-full p-1 border rounded text-center text-xs" value={localData.options[opt]?.notes || ''} onChange={e=>updateOption(opt, 'notes', e.target.value)} placeholder="ملاحظات"/></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <label className="block text-sm font-bold mb-3 text-gray-800">يرجى اختيار الخيار الأنسب للمشروع:</label>
                    <select className="w-full p-3 border-2 border-primary-200 rounded-lg mb-6 font-bold text-primary-800" value={localData.selectedOption || ''} onChange={e=>setLocalData({...localData, selectedOption:e.target.value})}>
                        <option>الخيار الأول: التنفيذ الداخلي</option><option>الخيار الثاني: التنفيذ بالتكامل (هجين)</option><option>الخيار الثالث: التنفيذ بالتعاقد الخارجي</option>
                    </select>
                    
                    <div className="grid grid-cols-2 gap-6">
                        <div className="border border-green-200 bg-white p-4 rounded-xl">
                            <label className="block text-xs font-bold text-green-700 mb-2 flex items-center gap-2"><i className="fa-solid fa-plus-circle"></i> الإيجابيات</label>
                            <textarea className="w-full p-2 border border-gray-200 rounded text-sm h-32 resize-none" value={localData.selectedOptionAnalysis.pros || ''} onChange={e=>setLocalData({...localData, selectedOptionAnalysis:{...localData.selectedOptionAnalysis, pros:e.target.value}})}></textarea>
                        </div>
                        <div className="border border-red-200 bg-white p-4 rounded-xl">
                            <label className="block text-xs font-bold text-red-700 mb-2 flex items-center gap-2"><i className="fa-solid fa-minus-circle"></i> السلبيات</label>
                            <textarea className="w-full p-2 border border-gray-200 rounded text-sm h-32 resize-none" value={localData.selectedOptionAnalysis.cons || ''} onChange={e=>setLocalData({...localData, selectedOptionAnalysis:{...localData.selectedOptionAnalysis, cons:e.target.value}})}></textarea>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-end gap-3 pt-4 border-t">
                    <button onClick={onClose} className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded font-bold">إلغاء</button>
                    <button onClick={()=>onSave(localData)} className="px-8 py-2 bg-primary-600 text-white rounded font-bold shadow hover:bg-primary-700">حفظ التحليل</button>
                </div>
                </div>
            </div>
        </div>
    );
};

export default ProcurementModal;