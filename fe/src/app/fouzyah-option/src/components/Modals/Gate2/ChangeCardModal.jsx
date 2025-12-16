import React, { useState } from 'react';

const ChangeCardModal = ({ data, onClose, onSave, project }) => {
    const [localData, setLocalData] = useState(data || {
        justification: '',
        benefit: '',
        changeRisks: [],
        stakeholders: []
    });
    
    // States
    const [riskIn, setRiskIn] = useState({risk:'', size:'متوسط', prob:'متوسطة', mitigation:''});
    const [stakeIn, setStakeIn] = useState({name:'', position:'', phone:'', email:''});

    // إضافة وحذف
    const addRisk = () => { if(riskIn.risk){ setLocalData({...localData, changeRisks:[...localData.changeRisks, {...riskIn, id:Date.now()}]}); setRiskIn({risk:'', size:'متوسط', prob:'متوسطة', mitigation:''}); } };
    const updateRisk = (id, f, v) => setLocalData({...localData, changeRisks: localData.changeRisks.map(r=>r.id===id?{...r, [f]:v}:r)});
    
    const addStake = () => { if(stakeIn.name){ setLocalData({...localData, stakeholders:[...localData.stakeholders, {...stakeIn, id:Date.now()}]}); setStakeIn({name:'', position:'', phone:'', email:''}); } };
    const updateStake = (id, f, v) => setLocalData({...localData, stakeholders: localData.stakeholders.map(s=>s.id===id?{...s, [f]:v}:s)});

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm fade-in">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
                <div className="p-4 rounded-t-xl flex justify-between items-center" style={{background: 'linear-gradient(to right, #f9f5eb, #dccc9f)'}}>
                    <div className="flex items-center gap-3">
                        <div className="bg-white p-3 rounded-lg shadow-md" style={{minWidth: '64px', minHeight: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <img src="/Logo.png" alt="Logo" style={{width: '56px', height: '56px', objectFit: 'contain', imageRendering: '-webkit-optimize-contrast'}} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">بطاقة التغيير (Change Card)</h3>
                            <p className="text-xs text-gray-600">توثيق التغييرات والمخاطر المرتبطة بها</p>
                        </div>
                    </div>
                    <button onClick={onClose}><i className="fa-solid fa-xmark text-gray-400 hover:text-red-600 text-xl"></i></button>
                </div>
                <div className="p-6">

                <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="bg-gray-50 p-4 rounded-xl border">
                        <label className="block text-xs font-bold mb-2 text-gray-700">مبررات التغيير (الوضع الراهن)</label>
                        <textarea className="w-full p-3 border rounded text-sm h-24 bg-white" value={localData.justification} onChange={e=>setLocalData({...localData, justification:e.target.value})}></textarea>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl border">
                        <label className="block text-xs font-bold mb-2 text-gray-700">المنفعة المرجوة (المستهدف)</label>
                        <textarea className="w-full p-3 border rounded text-sm h-24 bg-white" value={localData.benefit} onChange={e=>setLocalData({...localData, benefit:e.target.value})}></textarea>
                    </div>
                </div>

                {/* مخاطر التغيير */}
                <div className="mb-8 border rounded-lg overflow-hidden">
                    <div className="bg-gray-100 p-3 font-bold text-sm border-b text-center text-primary-900 flex justify-between items-center px-4">
                        <span>مخاطر التغيير وطرق التخفيف</span>
                        <div className="flex gap-2">
                             <input className="w-64 p-1 border rounded text-xs bg-white font-normal" placeholder="وصف الخطر..." value={riskIn.risk} onChange={e=>setRiskIn({...riskIn, risk:e.target.value})}/>
                             <button onClick={addRisk} className="text-primary-600 text-xs hover:underline bg-white px-2 py-1 rounded border font-bold">+ إضافة</button>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 bg-primary-800 text-white text-xs p-2 font-bold text-center">
                        <div className="col-span-4">الخطر المحتمل</div><div className="col-span-2">حجم الخطر</div><div className="col-span-2">الاحتمالية</div><div className="col-span-3">طريقة التخفيف</div><div className="col-span-1"></div>
                    </div>
                    {localData.changeRisks.map(r => (
                        <div key={r.id} className="grid grid-cols-12 text-sm p-2 border-b items-center text-center hover:bg-gray-50">
                            <div className="col-span-4 text-right pr-2"><input className="w-full border-none bg-transparent p-0" value={r.risk} onChange={e=>updateRisk(r.id, 'risk', e.target.value)}/></div>
                            <div className="col-span-2"><select className="w-full border p-1 rounded text-xs" value={r.size} onChange={e=>updateRisk(r.id, 'size', e.target.value)}><option>مرتفع</option><option>متوسط</option><option>منخفض</option></select></div>
                            <div className="col-span-2"><select className="w-full border p-1 rounded text-xs" value={r.prob} onChange={e=>updateRisk(r.id, 'prob', e.target.value)}><option>عالية</option><option>متوسطة</option><option>منخفضة</option></select></div>
                            <div className="col-span-3"><input className="w-full border p-1 rounded text-xs" value={r.mitigation} onChange={e=>updateRisk(r.id, 'mitigation', e.target.value)} placeholder="التخفيف..."/></div>
                            <div className="col-span-1"><i className="fa-solid fa-trash text-red-300 hover:text-red-500 cursor-pointer" onClick={()=>setLocalData({...localData, changeRisks:localData.changeRisks.filter(i=>i.id!==r.id)})}></i></div>
                        </div>
                    ))}
                </div>

                {/* أصحاب المصلحة */}
                <div className="mb-8 border rounded-lg overflow-hidden">
                    <div className="bg-gray-100 p-3 font-bold text-sm border-b text-center text-primary-900 flex justify-between items-center px-4">
                        <span>تصنيف أصحاب المصلحة والفئة المتأثرة</span>
                        <div className="flex gap-2">
                             <input className="w-64 p-1 border rounded text-xs bg-white font-normal" placeholder="الاسم..." value={stakeIn.name} onChange={e=>setStakeIn({...stakeIn, name:e.target.value})}/>
                             <button onClick={addStake} className="text-primary-600 text-xs hover:underline bg-white px-2 py-1 rounded border font-bold">+ إضافة</button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
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
                                {localData.stakeholders.map(s => (
                                    <tr key={s.id} className="border-b last:border-b-0">
                                        <td className="p-2 border-l">
                                            <input 
                                                className="w-full p-1.5 border rounded text-xs" 
                                                value={s.name || ''} 
                                                onChange={e=>updateStake(s.id,'name',e.target.value)} 
                                            />
                                        </td>
                                        <td className="p-2 border-l">
                                            <input 
                                                className="w-full p-1.5 border rounded text-xs" 
                                                value={s.position || ''} 
                                                onChange={e=>updateStake(s.id,'position',e.target.value)} 
                                                placeholder="المنصب"
                                            />
                                        </td>
                                        <td className="p-2 border-l">
                                            <input 
                                                type="tel"
                                                className="w-full p-1.5 border rounded text-xs" 
                                                value={s.phone || ''} 
                                                onChange={e=>updateStake(s.id,'phone',e.target.value)} 
                                                placeholder="05xxxxxxxx"
                                            />
                                        </td>
                                        <td className="p-2 border-l">
                                            <input 
                                                type="email"
                                                className="w-full p-1.5 border rounded text-xs" 
                                                value={s.email || ''} 
                                                onChange={e=>updateStake(s.id,'email',e.target.value)} 
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

                <div className="mt-8 flex justify-end gap-3 pt-4 border-t">
                    <button onClick={onClose} className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded font-bold">إلغاء</button>
                    <button onClick={()=>onSave(localData)} className="px-8 py-2 bg-primary-600 text-white rounded font-bold shadow hover:bg-primary-700">حفظ البطاقة</button>
                </div>
                </div>
            </div>
        </div>
    );
};

export default ChangeCardModal;