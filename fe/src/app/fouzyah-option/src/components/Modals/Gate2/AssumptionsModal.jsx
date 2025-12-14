import React, { useState } from 'react';

const AssumptionsModal = ({ data, onClose, onSave, onConvertToRisk }) => {
    const [assumptions, setAssumptions] = useState(data || []);
    const [showForm, setShowForm] = useState(false);
    const [newRow, setNewRow] = useState({
        title: '', 
        type: 'افتراض (Assumption)', 
        description: '', 
        impact: '', 
        reversalEffect: '', 
        convertToRisk: 'لا'
    });

    const addRow = () => { 
        if(newRow.title.trim()) { 
            const newItem = { ...newRow, id: Date.now() };
            setAssumptions([...assumptions, newItem]); 
            
            // إذا تم اختيار تحويل لخطر
            if(newRow.convertToRisk === 'نعم' && onConvertToRisk) {
                onConvertToRisk({
                    title: newRow.title,
                    description: newRow.description,
                    impact: newRow.reversalEffect || newRow.impact,
                    source: 'افتراض محول',
                    category: 'threat',
                    prob: 3,
                    impact: 3,
                    responseType: 'تخفيف',
                    status: 'نشط'
                });
            }
            
            setNewRow({title: '', type: 'افتراض (Assumption)', description: '', impact: '', reversalEffect: '', convertToRisk: 'لا'}); 
            setShowForm(false);
        } 
    };

    const handleDelete = (id) => {
        if(window.confirm('هل تريد حذف هذا السجل؟')) {
            setAssumptions(assumptions.filter(item => item.id !== id));
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm fade-in">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
                <div className="p-4 rounded-t-xl flex justify-between items-center" style={{background: 'linear-gradient(to right, #f9f5eb, #dccc9f)'}}>
                    <div className="flex items-center gap-3">
                        <div className="bg-white p-3 rounded-lg shadow-md" style={{minWidth: '64px', minHeight: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <img src="/Logo.png" alt="Logo" style={{width: '56px', height: '56px', objectFit: 'contain', imageRendering: '-webkit-optimize-contrast'}} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">سجل الافتراضات والقيود</h3>
                            <p className="text-xs text-gray-600">توثيق الافتراضات والقيود وتأثيرها على المشروع</p>
                        </div>
                    </div>
                    <button onClick={onClose}><i className="fa-solid fa-xmark text-gray-400 hover:text-red-600 text-xl"></i></button>
                </div>
                <div className="p-6">

                <div>
                    {/* قائمة الافتراضات والقيود */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="font-bold text-gray-700">قائمة الافتراضات والقيود</h4>
                            {!showForm && (
                                <button 
                                    onClick={() => setShowForm(true)} 
                                    className="bg-primary-600 text-white px-4 py-2 rounded font-bold text-sm hover:bg-primary-700"
                                >
                                    <i className="fa-solid fa-plus"></i> إضافة سجل جديد
                                </button>
                            )}
                        </div>

                        {/* فورم إضافة عنصر جديد */}
                        {showForm && (
                            <div className="bg-gray-50 p-4 rounded-lg border mb-4">
                                <h5 className="font-bold text-gray-800 mb-3">إضافة سجل جديد</h5>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold mb-1 text-gray-700">العنوان</label>
                                        <input 
                                            type="text" 
                                            className="w-full p-2 border rounded text-sm"
                                            value={newRow.title}
                                            onChange={e => setNewRow({...newRow, title: e.target.value})}
                                            placeholder="عنوان الافتراض أو القيد"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold mb-1 text-gray-700">النوع</label>
                                        <select 
                                            className="w-full p-2 border rounded text-sm"
                                            value={newRow.type}
                                            onChange={e => setNewRow({...newRow, type: e.target.value})}
                                        >
                                            <option value="افتراض (Assumption)">افتراض (Assumption)</option>
                                            <option value="قيد (Constraint)">قيد (Constraint)</option>
                                        </select>
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-xs font-bold mb-1 text-gray-700">الوصف</label>
                                        <textarea 
                                            className="w-full p-2 border rounded text-sm h-20 resize-none"
                                            value={newRow.description}
                                            onChange={e => setNewRow({...newRow, description: e.target.value})}
                                            placeholder="وصف تفصيلي..."
                                        ></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold mb-1 text-gray-700">التأثير على الأهداف</label>
                                        <textarea 
                                            className="w-full p-2 border rounded text-sm h-20 resize-none"
                                            value={newRow.impact}
                                            onChange={e => setNewRow({...newRow, impact: e.target.value})}
                                            placeholder="كيف يؤثر على أهداف المشروع..."
                                        ></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold mb-1 text-gray-700">أثر الانعكاس (للافتراضات)</label>
                                        <textarea 
                                            className="w-full p-2 border rounded text-sm h-20 resize-none"
                                            value={newRow.reversalEffect}
                                            onChange={e => setNewRow({...newRow, reversalEffect: e.target.value})}
                                            placeholder="ماذا يحدث إذا لم يتحقق..."
                                        ></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold mb-1 text-gray-700">تحويل إلى خطر؟</label>
                                        <select 
                                            className="w-full p-2 border rounded text-sm"
                                            value={newRow.convertToRisk}
                                            onChange={e => setNewRow({...newRow, convertToRisk: e.target.value})}
                                        >
                                            <option value="لا">لا</option>
                                            <option value="نعم">نعم</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex gap-2 mt-4">
                                    <button 
                                        onClick={addRow}
                                        className="bg-primary-600 text-white px-4 py-2 rounded font-bold text-sm hover:bg-primary-700"
                                    >
                                        <i className="fa-solid fa-check"></i> حفظ
                                    </button>
                                    <button 
                                        onClick={() => setShowForm(false)}
                                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded font-bold text-sm hover:bg-gray-400"
                                    >
                                        <i className="fa-solid fa-times"></i> إلغاء
                                    </button>
                                </div>
                            </div>
                        )}
                        
                        {/* جدول القائمة */}
                        {assumptions.length > 0 ? (
                            <div className="overflow-x-auto border rounded-lg">
                                <table className="w-full text-sm">
                                    <thead className="bg-primary-800 text-white">
                                        <tr>
                                            <th className="p-3 text-center w-12">#</th>
                                            <th className="p-3 text-right">العنوان</th>
                                            <th className="p-3 text-center w-40">النوع</th>
                                            <th className="p-3 text-right">التأثير على الأهداف</th>
                                            <th className="p-3 text-center w-20">حذف</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {assumptions.map((item, index) => (
                                            <tr key={item.id} className="hover:bg-gray-50">
                                                <td className="p-2 text-center font-bold text-gray-500">{index + 1}</td>
                                                <td className="p-2 text-right font-bold text-gray-800">{item.title}</td>
                                                <td className="p-2 text-center">
                                                    <span className={`px-3 py-1 rounded text-xs font-bold ${
                                                        item.type.includes('افتراض') ? 'bg-gray-100' : 'bg-gray-100'
                                                    }`}>
                                                        {item.type}
                                                    </span>
                                                </td>
                                                <td className="p-2 text-sm text-gray-700">{item.impact || '-'}</td>
                                                <td className="p-2 text-center">
                                                    <button 
                                                        onClick={() => handleDelete(item.id)}
                                                        className="text-red-600 hover:bg-red-50 p-1 rounded text-xs"
                                                    >
                                                        <span className="text-lg">×</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-400">
                                <i className="fa-solid fa-inbox text-4xl mb-3"></i>
                                <p>لا توجد عناصر مسجلة</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-8 flex justify-end gap-3 pt-4 border-t">
                    <button onClick={onClose} className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded font-bold">إلغاء</button>
                    <button onClick={() => onSave(assumptions)} className="px-8 py-2 bg-primary-600 text-white rounded font-bold shadow hover:bg-primary-700">حفظ السجل</button>
                </div>
                </div>
            </div>
        </div>
    );
};

export default AssumptionsModal;