import React from 'react';

const CharterModalReadOnly = ({ data, onClose, project }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm fade-in">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="p-4 rounded-t-xl flex justify-between items-center" style={{background: 'linear-gradient(to right, #f9f5eb, #dccc9f)'}}>
                    <div className="flex items-center gap-3">
                        <div className="bg-white p-3 rounded-lg shadow-md" style={{minWidth: '64px', minHeight: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <img src="/Logo.png" alt="Logo" style={{width: '56px', height: '56px', objectFit: 'contain', imageRendering: '-webkit-optimize-contrast'}} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">
                                ميثاق المشروع (Project Charter) <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">للعرض فقط</span>
                            </h3>
                            <p className="text-xs text-gray-600">الوثيقة الرسمية لاعتماد المشروع</p>
                        </div>
                    </div>
                    <button onClick={onClose}><i className="fa-solid fa-xmark text-gray-400 hover:text-red-600 text-xl"></i></button>
                </div>
                <div className="p-6">
                    <div className="space-y-4">
                        {data?.stratObj && (
                            <div>
                                <label className="block text-xs font-bold mb-2 text-gray-700">الهدف الاستراتيجي</label>
                                <div className="w-full p-3 border rounded text-sm bg-gray-50">{data.stratObj}</div>
                            </div>
                        )}

                        {data?.stratRes && (
                            <div>
                                <label className="block text-xs font-bold mb-2 text-gray-700">النتيجة الاستراتيجية</label>
                                <div className="w-full p-3 border rounded text-sm bg-gray-50">{data.stratRes}</div>
                            </div>
                        )}

                        {data?.budget && (
                            <div>
                                <label className="block text-xs font-bold mb-2 text-gray-700">الميزانية</label>
                                <div className="w-full p-3 border rounded text-sm bg-gray-50">{Number(data.budget).toLocaleString()} ريال</div>
                            </div>
                        )}

                        {data?.scope && (
                            <div>
                                <label className="block text-xs font-bold mb-2 text-gray-700">نطاق المشروع</label>
                                <div className="w-full p-3 border rounded text-sm bg-gray-50">{data.scope}</div>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            {data?.projectManager && (
                                <div>
                                    <label className="block text-xs font-bold mb-2 text-gray-700">مدير المشروع</label>
                                    <div className="w-full p-3 border rounded text-sm bg-gray-50">{data.projectManager}</div>
                                </div>
                            )}

                            {data?.projectOwner && (
                                <div>
                                    <label className="block text-xs font-bold mb-2 text-gray-700">صاحب المشروع</label>
                                    <div className="w-full p-3 border rounded text-sm bg-gray-50">{data.projectOwner}</div>
                                </div>
                            )}

                            {data?.programManager && (
                                <div>
                                    <label className="block text-xs font-bold mb-2 text-gray-700">مدير البرنامج</label>
                                    <div className="w-full p-3 border rounded text-sm bg-gray-50">{data.programManager}</div>
                                </div>
                            )}

                            {data?.portfolioManager && (
                                <div>
                                    <label className="block text-xs font-bold mb-2 text-gray-700">مدير المحفظة</label>
                                    <div className="w-full p-3 border rounded text-sm bg-gray-50">{data.portfolioManager}</div>
                                </div>
                            )}
                        </div>

                        {data?.deliverables && data.deliverables.length > 0 && (
                            <div>
                                <label className="block text-xs font-bold mb-2 text-gray-700">المخرجات الرئيسية</label>
                                <div className="overflow-x-auto border rounded">
                                    <table className="w-full text-sm">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="p-3">المخرج</th>
                                                <th className="p-3">تاريخ التسليم</th>
                                                <th className="p-3">الوصف</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y">
                                            {data.deliverables.map((d, idx) => (
                                                <tr key={idx} className="hover:bg-gray-50">
                                                    <td className="p-3">{d.name}</td>
                                                    <td className="p-3">{d.deliveryDate}</td>
                                                    <td className="p-3">{d.description}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-6 flex justify-end pt-4 border-t">
                        <button onClick={onClose} className="px-8 py-2 bg-primary-600 text-white rounded font-bold shadow">إغلاق</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CharterModalReadOnly;
