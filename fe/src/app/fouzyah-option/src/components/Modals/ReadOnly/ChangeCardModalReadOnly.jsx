import React from 'react';

const ChangeCardModalReadOnly = ({ data, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm fade-in">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6">
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <h3 className="text-xl font-bold text-gray-800">
                        بطاقة التغيير (Change Card) <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">للعرض فقط</span>
                    </h3>
                    <button onClick={onClose}><i className="fa-solid fa-xmark text-gray-400 hover:text-red-600 text-xl"></i></button>
                </div>

                <div className="space-y-4">
                    {data?.justification && (
                        <div>
                            <label className="block text-xs font-bold mb-2 text-gray-700">المبرر</label>
                            <div className="w-full p-3 border rounded text-sm bg-gray-50">
                                {data.justification}
                            </div>
                        </div>
                    )}

                    {data?.impact && (
                        <div>
                            <label className="block text-xs font-bold mb-2 text-gray-700">الأثر المتوقع</label>
                            <div className="w-full p-3 border rounded text-sm bg-gray-50">
                                {data.impact}
                            </div>
                        </div>
                    )}

                    {data?.stakeholders && data.stakeholders.length > 0 && (
                        <div>
                            <label className="block text-xs font-bold mb-2 text-gray-700">أصحاب المصلحة</label>
                            <div className="overflow-x-auto border rounded">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="p-3">الاسم</th>
                                            <th className="p-3">الدور</th>
                                            <th className="p-3">التأثير</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {data.stakeholders.map((s, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50">
                                                <td className="p-3">{s.name}</td>
                                                <td className="p-3">{s.role}</td>
                                                <td className="p-3">{s.influence}</td>
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
    );
};

export default ChangeCardModalReadOnly;
