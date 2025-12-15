import React, { useState } from 'react';

const CharterModal = ({ data, onClose, onSave, project }) => {
    // التأكد من وجود البيانات وتحميل بيانات الفريق من المشروع
    const teamData = project?.data?.team || {};
    const strategyData = project?.data?.strategy || {};
    const committeeData = project?.data?.committee || [];
    const gate2Data = project?.gate2Data || project?.data?.gate2Data || {};
    const scopeData = gate2Data?.scope || {};
    
    // قراءة المخرجات من النطاق إذا لم تكن موجودة في الميثاق
    const deliverablesFromScope = scopeData?.deliverables || [];
    
    const [localData, setLocalData] = useState(data || { 
        stratObj: strategyData.objective || '', 
        stratRes: strategyData.result || '', 
        budget: project?.estimatedBudget || '', 
        scope: scopeData.workScope || scopeData.currentState || scopeData.targetState || scopeData.goal || '', 
        projectManager: teamData.projectManager || '',
        projectOwner: teamData.projectOwner || '',
        programManager: teamData.programManager || '', 
        portfolioManager: teamData.portfolioManager || '',
        techCommittee: committeeData.length > 0 ? committeeData.map(c => c.name || c).join(', ') : '',
        deliverables: deliverablesFromScope.length > 0 ? deliverablesFromScope : [], 
        stakeholders: []
    });

    const handleChange = (e) => {
        setLocalData({ ...localData, [e.target.name]: e.target.value });
    };

    const addDeliverable = () => {
        setLocalData({ 
            ...localData, 
            deliverables: [...(localData.deliverables || []), { id: Date.now(), name: '', deliveryDate: '', description: '', responsibilities: '' }] 
        });
    };

    const removeDeliverable = (id) => {
        setLocalData({ 
            ...localData, 
            deliverables: localData.deliverables.filter(d => d.id !== id) 
        });
    };

    // أصحاب المصلحة
    const [stakeIn, setStakeIn] = useState({name:'', position:'', phone:'', email:''});
    
    const addStakeholder = () => { 
        if(stakeIn.name){ 
            setLocalData({
                ...localData, 
                stakeholders:[...(localData.stakeholders || []), {...stakeIn, id:Date.now()}]
            }); 
            setStakeIn({name:'', position:'', phone:'', email:''}); 
        } 
    };
    
    const updateStakeholder = (id, field, value) => {
        setLocalData({
            ...localData, 
            stakeholders: localData.stakeholders.map(s => s.id === id ? {...s, [field]: value} : s)
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm fade-in">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="p-4 rounded-t-xl flex justify-between items-center" style={{background: 'linear-gradient(to right, #f9f5eb, #dccc9f)'}}>
                    <div className="flex items-center gap-3">
                        <div className="bg-white p-3 rounded-lg shadow-md" style={{minWidth: '64px', minHeight: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <img src="/Logo.png" alt="Logo" style={{width: '56px', height: '56px', objectFit: 'contain', imageRendering: '-webkit-optimize-contrast'}} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">ميثاق المشروع (Project Charter)</h3>
                            <p className="text-xs text-gray-600">الوثيقة الرسمية لاعتماد المشروع</p>
                        </div>
                    </div>
                    <button onClick={onClose}><i className="fa-solid fa-xmark text-gray-400 hover:text-red-600 text-xl"></i></button>
                </div>
                <div className="p-6">

                <div className="space-y-6">
                    {/* 1. التوافق الاستراتيجي */}
                    <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                        <div className="flex items-start justify-between mb-4 border-b pb-2">
                            <h4 className="font-bold text-secondary-gold">1. التوافق الاستراتيجي</h4>
                            <div className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded flex items-center gap-1">
                                <i className="fa-solid fa-info-circle"></i>
                                <span>تم تعبئة البيانات من تسجيل المشروع</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">الهدف الاستراتيجي</label>
                                <input name="stratObj" value={localData.stratObj} onChange={handleChange} className="w-full p-2.5 border rounded-lg text-sm bg-white focus:ring-1 focus:ring-secondary-gold outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">النتيجة الاستراتيجية</label>
                                <input name="stratRes" value={localData.stratRes} onChange={handleChange} className="w-full p-2.5 border rounded-lg text-sm bg-white focus:ring-1 focus:ring-secondary-gold outline-none" />
                            </div>
                        </div>
                    </div>

                    {/* 2. النطاق والمالية */}
                    <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                        <div className="flex items-start justify-between mb-4 border-b pb-2">
                            <h4 className="font-bold text-secondary-gold">2. النطاق والمالية</h4>
                            <div className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded flex items-center gap-1">
                                <i className="fa-solid fa-info-circle"></i>
                                <span>تم تعبئة البيانات من تسجيل المشروع والنطاق</span>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">الميزانية المعتمدة (ر.س)</label>
                                <input type="number" name="budget" value={localData.budget} onChange={handleChange} className="w-full p-2.5 border rounded-lg text-sm bg-white focus:ring-1 focus:ring-secondary-gold outline-none" placeholder="يمكنك التعديل هنا" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">نطاق العمل</label>
                                <textarea name="scope" rows="4" value={localData.scope} onChange={handleChange} className="w-full p-2.5 border rounded-lg text-sm bg-white focus:ring-1 focus:ring-secondary-gold outline-none" placeholder="يمكنك التعديل أو الإضافة هنا"></textarea>
                            </div>
                        </div>
                    </div>

                    {/* 3. الهيكل الإداري */}
                    <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                        <div className="flex items-start justify-between mb-4 border-b pb-2">
                            <h4 className="font-bold text-secondary-gold">3. الهيكل الإداري</h4>
                            <div className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded flex items-center gap-1">
                                <i className="fa-solid fa-info-circle"></i>
                                <span>تم تعبئة البيانات من تسجيل المشروع</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">مدير المشروع</label>
                                <input name="projectManager" value={localData.projectManager} onChange={handleChange} className="w-full p-2.5 border rounded-lg text-sm bg-white focus:ring-1 focus:ring-secondary-gold outline-none" placeholder="يمكنك التعديل هنا" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">مالك المشروع</label>
                                <input name="projectOwner" value={localData.projectOwner} onChange={handleChange} className="w-full p-2.5 border rounded-lg text-sm bg-white focus:ring-1 focus:ring-secondary-gold outline-none" placeholder="يمكنك التعديل هنا" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">مدير البرنامج</label>
                                <input name="programManager" value={localData.programManager} onChange={handleChange} className="w-full p-2.5 border rounded-lg text-sm bg-white focus:ring-1 focus:ring-secondary-gold outline-none" placeholder="يمكنك التعديل هنا" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">مدير المحفظة</label>
                                <input name="portfolioManager" value={localData.portfolioManager} onChange={handleChange} className="w-full p-2.5 border rounded-lg text-sm bg-white focus:ring-1 focus:ring-secondary-gold outline-none" placeholder="يمكنك التعديل هنا" />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-xs font-bold text-gray-700 mb-1">اللجنة الفنية</label>
                                <input name="techCommittee" value={localData.techCommittee} onChange={handleChange} className="w-full p-2.5 border rounded-lg text-sm bg-white focus:ring-1 focus:ring-secondary-gold outline-none" placeholder="يمكنك التعديل هنا" />
                            </div>
                        </div>
                    </div>

                    {/* 4. المخرجات */}
                    <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                        <div className="flex items-start justify-between mb-4 border-b pb-2">
                            <h4 className="font-bold text-secondary-gold">4. المخرجات</h4>
                            <div className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded flex items-center gap-1">
                                <i className="fa-solid fa-info-circle"></i>
                                <span>تم تعبئة البيانات من النطاق</span>
                            </div>
                        </div>
                        
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
                                                    onClick={()=>removeDeliverable(d.id)}
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
                            onClick={addDeliverable}
                            className="mt-2 px-4 py-1.5 bg-primary-600 text-white rounded hover:bg-primary-700 text-xs"
                        >
                            + إضافة مخرج
                        </button>
                    </div>

                    {/* 5. أصحاب المصلحة */}
                    <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                        <h4 className="font-bold text-secondary-gold mb-4 border-b pb-2">5. أصحاب المصلحة</h4>
                        
                        <div className="mb-3 flex gap-2">
                            <input 
                                className="flex-1 p-2 border rounded text-sm bg-white" 
                                placeholder="الاسم / الجهة..." 
                                value={stakeIn.name} 
                                onChange={e=>setStakeIn({...stakeIn, name:e.target.value})}
                            />
                            <input 
                                className="flex-1 p-2 border rounded text-sm bg-white" 
                                placeholder="المنصب..." 
                                value={stakeIn.position} 
                                onChange={e=>setStakeIn({...stakeIn, position:e.target.value})}
                            />
                            <button 
                                onClick={addStakeholder} 
                                className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 text-sm font-bold"
                            >
                                + إضافة
                            </button>
                        </div>

                        <div className="overflow-x-auto border rounded">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-primary-800 text-white text-xs">
                                        <th className="p-2 text-right border-l border-primary-700">الاسم / الجهة</th>
                                        <th className="p-2 text-right border-l border-primary-700">المنصب</th>
                                        <th className="p-2 text-right border-l border-primary-700">رقم التواصل</th>
                                        <th className="p-2 text-right border-l border-primary-700">البريد الإلكتروني</th>
                                        <th className="p-2 text-center" style={{width:'5%'}}>حذف</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {(localData.stakeholders || []).map(s => (
                                        <tr key={s.id} className="border-b last:border-b-0">
                                            <td className="p-2 border-l">
                                                <input 
                                                    className="w-full p-1.5 border rounded text-xs" 
                                                    value={s.name || ''} 
                                                    onChange={e=>updateStakeholder(s.id,'name',e.target.value)} 
                                                />
                                            </td>
                                            <td className="p-2 border-l">
                                                <input 
                                                    className="w-full p-1.5 border rounded text-xs" 
                                                    value={s.position || ''} 
                                                    onChange={e=>updateStakeholder(s.id,'position',e.target.value)} 
                                                    placeholder="المنصب"
                                                />
                                            </td>
                                            <td className="p-2 border-l">
                                                <input 
                                                    type="tel"
                                                    className="w-full p-1.5 border rounded text-xs" 
                                                    value={s.phone || ''} 
                                                    onChange={e=>updateStakeholder(s.id,'phone',e.target.value)} 
                                                    placeholder="05xxxxxxxx"
                                                />
                                            </td>
                                            <td className="p-2 border-l">
                                                <input 
                                                    type="email"
                                                    className="w-full p-1.5 border rounded text-xs" 
                                                    value={s.email || ''} 
                                                    onChange={e=>updateStakeholder(s.id,'email',e.target.value)} 
                                                    placeholder="email@example.com"
                                                />
                                            </td>
                                            <td className="p-2 text-center">
                                                <button 
                                                    onClick={()=>setLocalData({...localData, stakeholders:localData.stakeholders.filter(i=>i.id!==s.id)})}
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
                    </div>

                </div>

                <div className="mt-8 flex justify-end gap-3 pt-4 border-t">
                    <button onClick={onClose} className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded font-bold">إلغاء</button>
                    <button onClick={() => onSave(localData)} className="px-8 py-2 bg-primary-600 text-white rounded font-bold shadow hover:bg-primary-700">
                        حفظ الميثاق
                    </button>
                </div>
                </div>
            </div>
        </div>
    );
};

export default CharterModal;