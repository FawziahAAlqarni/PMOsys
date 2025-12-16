import React from 'react';

const ScopeModalReadOnly = ({ data, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm fade-in">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
                <style>{`
                  .read-only-view input,
                  .read-only-view textarea,
                  .read-only-view select {
                    background-color: #f9fafb !important;
                    cursor: not-allowed !important;
                    pointer-events: none !important;
                  }
                `}</style>
                <div className="p-4 rounded-t-xl flex justify-between items-center" style={{background: 'linear-gradient(to right, #f9f5eb, #dccc9f)'}}>
                    <div className="flex items-center gap-3">
                        <div className="bg-white p-3 rounded-lg shadow-md" style={{minWidth: '64px', minHeight: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <img src="/Logo.png" alt="Logo" style={{width: '56px', height: '56px', objectFit: 'contain', imageRendering: '-webkit-optimize-contrast'}} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">نطاق المشروع التفصيلي <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">للعرض فقط</span></h3>
                            <p className="text-xs text-gray-600">تحديد نطاق العمل والمخرجات وأصحاب المصلحة</p>
                        </div>
                    </div>
                    <button onClick={onClose}><i className="fa-solid fa-xmark text-gray-400 hover:text-red-600 text-xl"></i></button>
                </div>
                <div className="p-6 read-only-view">

                <div className="space-y-4 mb-6">
                    
                    {/* الوصف العام للمشروع */}
                    {data.generalDescription && (
                        <div>
                            <label className="block text-xs font-bold mb-2 text-gray-700">الوصف العام للمشروع</label>
                            <div className="w-full p-2 border rounded text-sm bg-gray-50 min-h-[80px]">
                                {data.generalDescription}
                            </div>
                        </div>
                    )}

                    {/* الوضع الراهن والوضع المستهدف */}
                    <div className="grid grid-cols-2 gap-4">
                        {data.currentState && (
                            <div>
                                <label className="block text-xs font-bold mb-2 text-gray-700">الوضع الراهن</label>
                                <div className="w-full p-2 border rounded text-sm bg-gray-50 min-h-[96px]">
                                    {data.currentState}
                                </div>
                            </div>
                        )}
                        
                        {data.targetState && (
                            <div>
                                <label className="block text-xs font-bold mb-2 text-gray-700">الوضع المستهدف والأهداف</label>
                                <div className="w-full p-2 border rounded text-sm bg-gray-50 min-h-[96px]">
                                    {data.targetState}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* نطاق العمل */}
                    {data.workScope && (
                        <div>
                            <label className="block text-xs font-bold mb-2 text-gray-700">نطاق العمل (Scope of Work)</label>
                            <div className="w-full p-2 border rounded text-sm bg-gray-50 min-h-[96px]">
                                {data.workScope}
                            </div>
                        </div>
                    )}

                    {/* الأنشطة والنتائج */}
                    {data.activities && data.activities.length > 0 && (
                        <div>
                            <h3 className="text-xs font-bold mb-2 text-gray-700">الأنشطة والنتائج</h3>
                            <div className="overflow-x-auto border rounded">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-primary-800 text-white text-xs">
                                            <th className="p-2">#</th>
                                            <th className="p-2">النشاط / Activity</th>
                                            <th className="p-2">النتيجة / Result</th>
                                            <th className="p-2">النوع</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.activities.map((act, idx) => (
                                            <tr key={act.id || idx} className="border-b hover:bg-gray-50">
                                                <td className="p-2 text-center text-xs">{idx + 1}</td>
                                                <td className="p-2 text-sm">{act.activity}</td>
                                                <td className="p-2 text-sm">{act.result}</td>
                                                <td className="p-2 text-center">
                                                    <span className={`px-2 py-1 rounded text-xs ${act.type === 'استراتيجي' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                                                        {act.type}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* المخرجات */}
                    {data.deliverables && data.deliverables.length > 0 && (
                        <div>
                            <h3 className="text-xs font-bold mb-2 text-gray-700">قائمة المخرجات</h3>
                            <div className="overflow-x-auto border rounded">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-primary-800 text-white text-xs">
                                            <th className="p-2">#</th>
                                            <th className="p-2">اسم المخرج</th>
                                            <th className="p-2">تاريخ التسليم</th>
                                            <th className="p-2">الوصف</th>
                                            <th className="p-2">المسؤوليات</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.deliverables.map((del, idx) => (
                                            <tr key={del.id || idx} className="border-b hover:bg-gray-50">
                                                <td className="p-2 text-center text-xs">{idx + 1}</td>
                                                <td className="p-2 text-sm">{del.name}</td>
                                                <td className="p-2 text-sm text-center">{del.deliveryDate}</td>
                                                <td className="p-2 text-sm">{del.description}</td>
                                                <td className="p-2 text-sm">{del.responsibilities}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* متطلبات التحول */}
                    {data.transformationReq && (
                        <div>
                            <label className="block text-xs font-bold mb-2 text-gray-700">متطلبات التحول</label>
                            <div className="w-full p-2 border rounded text-sm bg-gray-50 min-h-[96px]">
                                {data.transformationReq}
                            </div>
                        </div>
                    )}

                </div>

                <div className="mt-8 flex justify-end gap-3 pt-4 border-t">
                    <button onClick={onClose} className="px-8 py-2 bg-primary-600 text-white rounded font-bold shadow hover:bg-primary-700">إغلاق</button>
                </div>
                </div>
            </div>
        </div>
    );
};

export default ScopeModalReadOnly;
