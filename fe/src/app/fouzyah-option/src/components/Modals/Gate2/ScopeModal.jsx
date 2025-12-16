import React, { useState } from 'react';

const ScopeModal = ({ data, onClose, onSave }) => {
    const [localData, setLocalData] = useState(data);

    const addActivity = () => {
        const activities = localData.activities || [];
        setLocalData({ 
            ...localData, 
            activities: [...activities, { 
                activity: '', 
                result: '', 
                type: 'استراتيجي', 
                id: Date.now() 
            }] 
        });
    };

    const removeActivity = (id) => {
        setLocalData({
            ...localData,
            activities: (localData.activities || []).filter(a => a.id !== id)
        });
    };

    const addDeliv = () => {
        const deliverables = localData.deliverables || [];
        setLocalData({ 
            ...localData, 
            deliverables: [...deliverables, { 
                name: '',
                deliveryDate: '',
                description: '',
                responsibilities: '',
                id: Date.now() 
            }] 
        });
    };

    const removeDeliv = (id) => {
        setLocalData({
            ...localData,
            deliverables: (localData.deliverables || []).filter(d => d.id !== id)
        });
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
                            <h3 className="text-lg font-bold text-gray-800">نطاق المشروع التفصيلي</h3>
                            <p className="text-xs text-gray-600">تحديد نطاق العمل والمخرجات وأصحاب المصلحة</p>
                        </div>
                    </div>
                    <button onClick={onClose}><i className="fa-solid fa-xmark text-gray-400 hover:text-red-600 text-xl"></i></button>
                </div>
                <div className="p-6">

                <div className="space-y-4 mb-6">
                    
                    {/* الوصف العام للمشروع (اختياري) */}
                    <div>
                        <label className="block text-xs font-bold mb-2 text-gray-700">الوصف العام للمشروع (اختياري)</label>
                        <textarea 
                            className="w-full p-2 border rounded text-sm h-20 bg-white resize-none" 
                            value={localData.generalDescription || ''} 
                            onChange={e=>setLocalData({...localData, generalDescription:e.target.value})}
                        ></textarea>
                    </div>

                    {/* الوضع الراهن والوضع المستهدف والأهداف */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold mb-2 text-gray-700">الوضع الراهن</label>
                            <textarea 
                                className="w-full p-2 border rounded text-sm h-24 bg-white resize-none" 
                                placeholder="ما الذي تستهدف تحقيقه في النهاية..."
                                value={localData.currentState || ''} 
                                onChange={e=>setLocalData({...localData, currentState:e.target.value})}
                            ></textarea>
                        </div>
                        
                        <div>
                            <label className="block text-xs font-bold mb-2 text-gray-700">الوضع المستهدف والأهداف</label>
                            <textarea 
                                className="w-full p-2 border rounded text-sm h-24 bg-white resize-none" 
                                placeholder="ما الذي تستهدف تحقيقه في النهاية..."
                                value={localData.targetState || ''} 
                                onChange={e=>setLocalData({...localData, targetState:e.target.value})}
                            ></textarea>
                        </div>
                    </div>

                    {/* نطاق العمل (Scope of Work) */}
                    <div>
                        <label className="block text-xs font-bold mb-2 text-gray-700">نطاق العمل (Scope of Work)</label>
                        <textarea 
                            className="w-full p-2 border rounded text-sm h-24 bg-white resize-none" 
                            placeholder="حدد نطاق العمل بالتفصيل والمسؤوليات..."
                            value={localData.workScope || ''} 
                            onChange={e=>setLocalData({...localData, workScope:e.target.value})}
                        ></textarea>
                    </div>

                    {/* قائمة الأنشطة المتوقعة والنتائج المرجوة */}
                    <div>
                        <h3 className="text-xs font-bold mb-2 text-gray-700">قائمة الأنشطة المتوقعة والنتائج المرجوة</h3>
                        
                        <div className="overflow-x-auto border rounded">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-primary-800 text-white text-xs">
                                        <th className="p-2 text-right border-l border-primary-700" style={{width:'15%'}}>النوع</th>
                                        <th className="p-2 text-right border-l border-primary-700" style={{width:'40%'}}>الأنشطة المتوقعة</th>
                                        <th className="p-2 text-right border-l border-primary-700" style={{width:'40%'}}>النتيجة المرجوة</th>
                                        <th className="p-2 text-center" style={{width:'5%'}}>حذف</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {(localData.activities || []).map((act)=>(
                                        <tr key={act.id} className="border-b last:border-b-0">
                                            <td className="p-2 border-l">
                                                <select 
                                                    className="w-full p-1.5 border rounded text-xs"
                                                    value={act.type || 'استراتيجي'}
                                                    onChange={e=>{
                                                        const updated = localData.activities.map(a => 
                                                            a.id === act.id ? {...a, type: e.target.value} : a
                                                        );
                                                        setLocalData({...localData, activities: updated});
                                                    }}
                                                >
                                                    <option value="استراتيجي">استراتيجي</option>
                                                    <option value="تنفيذي">تنفيذي</option>
                                                    <option value="إداري">إداري</option>
                                                </select>
                                            </td>
                                            <td className="p-2 border-l">
                                                <textarea 
                                                    className="w-full p-1.5 border rounded text-xs h-16 resize-none"
                                                    value={act.activity || ''}
                                                    onChange={e=>{
                                                        const updated = localData.activities.map(a => 
                                                            a.id === act.id ? {...a, activity: e.target.value} : a
                                                        );
                                                        setLocalData({...localData, activities: updated});
                                                    }}
                                                />
                                            </td>
                                            <td className="p-2 border-l">
                                                <textarea 
                                                    className="w-full p-1.5 border rounded text-xs h-16 resize-none"
                                                    value={act.result || ''}
                                                    onChange={e=>{
                                                        const updated = localData.activities.map(a => 
                                                            a.id === act.id ? {...a, result: e.target.value} : a
                                                        );
                                                        setLocalData({...localData, activities: updated});
                                                    }}
                                                />
                                            </td>
                                            <td className="p-2 text-center">
                                                <button 
                                                    onClick={()=>removeActivity(act.id)}
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

                        <button
                            type="button"
                            onClick={addActivity}
                            className="mt-2 px-4 py-1.5 bg-primary-600 text-white rounded hover:bg-primary-700 text-xs"
                        >
                            + إضافة نشاط
                        </button>
                    </div>

                    {/* قائمة المخرجات */}
                    <div>
                        <h3 className="text-xs font-bold mb-2 text-gray-700">قائمة المخرجات</h3>
                        
                        <div className="overflow-x-auto border rounded">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-primary-800 text-white text-xs">
                                        <th className="p-2 text-right border-l border-primary-700">اسم المخرج</th>
                                        <th className="p-2 text-right border-l border-primary-700">تاريخ التسليم</th>
                                        <th className="p-2 text-right border-l border-primary-700">وصف المخرج</th>
                                        <th className="p-2 text-right border-l border-primary-700">الإدارات المسؤولة</th>
                                        <th className="p-2 text-center" style={{width:'5%'}}>حذف</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {(localData.deliverables || []).map((d)=>(
                                        <tr key={d.id} className="border-b last:border-b-0">
                                            <td className="p-2 border-l">
                                                <input 
                                                    className="w-full p-1.5 border rounded text-xs"
                                                    value={d.name || ''}
                                                    onChange={e=>{
                                                        const updated = localData.deliverables.map(item => 
                                                            item.id === d.id ? {...item, name: e.target.value} : item
                                                        );
                                                        setLocalData({...localData, deliverables: updated});
                                                    }}
                                                />
                                            </td>
                                            <td className="p-2 border-l">
                                                <input 
                                                    type="date"
                                                    className="w-full p-1.5 border rounded text-xs"
                                                    value={d.deliveryDate || ''}
                                                    onChange={e=>{
                                                        const updated = localData.deliverables.map(item => 
                                                            item.id === d.id ? {...item, deliveryDate: e.target.value} : item
                                                        );
                                                        setLocalData({...localData, deliverables: updated});
                                                    }}
                                                />
                                            </td>
                                            <td className="p-2 border-l">
                                                <textarea 
                                                    className="w-full p-1.5 border rounded text-xs h-16 resize-none"
                                                    value={d.description || ''}
                                                    onChange={e=>{
                                                        const updated = localData.deliverables.map(item => 
                                                            item.id === d.id ? {...item, description: e.target.value} : item
                                                        );
                                                        setLocalData({...localData, deliverables: updated});
                                                    }}
                                                />
                                            </td>
                                            <td className="p-2 border-l">
                                                <div className="space-y-1.5 p-1">
                                                    <label className="flex items-center gap-2 text-xs hover:bg-gray-50 p-1 rounded cursor-pointer">
                                                        <input 
                                                            type="checkbox" 
                                                            className="w-3.5 h-3.5"
                                                            checked={d.responsibilities?.includes('التمكين')}
                                                            onChange={e=>{
                                                                const updated = localData.deliverables.map(item => {
                                                                    if (item.id === d.id) {
                                                                        let resp = item.responsibilities || '';
                                                                        if (e.target.checked) {
                                                                            resp = resp ? resp + ', التمكين' : 'التمكين';
                                                                        } else {
                                                                            resp = resp.split(', ').filter(r => r !== 'التمكين').join(', ');
                                                                        }
                                                                        return {...item, responsibilities: resp};
                                                                    }
                                                                    return item;
                                                                });
                                                                setLocalData({...localData, deliverables: updated});
                                                            }}
                                                        />
                                                        <span>التمكين</span>
                                                    </label>
                                                    <label className="flex items-center gap-2 text-xs hover:bg-gray-50 p-1 rounded cursor-pointer">
                                                        <input 
                                                            type="checkbox" 
                                                            className="w-3.5 h-3.5"
                                                            checked={d.responsibilities?.includes('الاستراتيجية والأداء')}
                                                            onChange={e=>{
                                                                const updated = localData.deliverables.map(item => {
                                                                    if (item.id === d.id) {
                                                                        let resp = item.responsibilities || '';
                                                                        if (e.target.checked) {
                                                                            resp = resp ? resp + ', الاستراتيجية والأداء' : 'الاستراتيجية والأداء';
                                                                        } else {
                                                                            resp = resp.split(', ').filter(r => r !== 'الاستراتيجية والأداء').join(', ');
                                                                        }
                                                                        return {...item, responsibilities: resp};
                                                                    }
                                                                    return item;
                                                                });
                                                                setLocalData({...localData, deliverables: updated});
                                                            }}
                                                        />
                                                        <span>الاستراتيجية والأداء</span>
                                                    </label>
                                                    <label className="flex items-center gap-2 text-xs hover:bg-gray-50 p-1 rounded cursor-pointer">
                                                        <input 
                                                            type="checkbox" 
                                                            className="w-3.5 h-3.5"
                                                            checked={d.responsibilities?.includes('المحافظ والبرامج')}
                                                            onChange={e=>{
                                                                const updated = localData.deliverables.map(item => {
                                                                    if (item.id === d.id) {
                                                                        let resp = item.responsibilities || '';
                                                                        if (e.target.checked) {
                                                                            resp = resp ? resp + ', المحافظ والبرامج' : 'المحافظ والبرامج';
                                                                        } else {
                                                                            resp = resp.split(', ').filter(r => r !== 'المحافظ والبرامج').join(', ');
                                                                        }
                                                                        return {...item, responsibilities: resp};
                                                                    }
                                                                    return item;
                                                                });
                                                                setLocalData({...localData, deliverables: updated});
                                                            }}
                                                        />
                                                        <span>المحافظ والبرامج</span>
                                                    </label>
                                                </div>
                                            </td>
                                            <td className="p-2 text-center">
                                                <button 
                                                    onClick={()=>removeDeliv(d.id)}
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

                        <button
                            type="button"
                            onClick={addDeliv}
                            className="mt-2 px-4 py-1.5 bg-primary-600 text-white rounded hover:bg-primary-700 text-xs"
                        >
                            + إضافة مخرج
                        </button>
                    </div>

                    {/* متطلبات التحول */}
                    <div>
                        <label className="block text-xs font-bold mb-2 text-gray-700">متطلبات التحول</label>
                        <textarea 
                            className="w-full p-2 border rounded text-sm h-24 bg-white resize-none" 
                            placeholder="حدد كيف سيتم التحول والمسؤوليات..."
                            value={localData.transformationReqs || ''} 
                            onChange={e=>setLocalData({...localData, transformationReqs:e.target.value})}
                        ></textarea>
                    </div>

                </div>

                <div className="mt-8 flex justify-end gap-3 pt-4 border-t">
                    <button onClick={onClose} className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded font-bold">إلغاء</button>
                    <button onClick={()=>onSave(localData)} className="px-8 py-2 bg-primary-600 text-white rounded font-bold shadow hover:bg-primary-700">حفظ النطاق</button>
                </div>
                </div>
            </div>
        </div>
    );
};

export default ScopeModal;