import React from 'react';

const ActivationPlanModalReadOnly = ({ data, onClose }) => {
    const plan = data || [];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm fade-in">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto p-6">
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <h3 className="text-xl font-bold text-gray-800">
                        خطة التفعيل (Activation Plan) <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">للعرض فقط</span>
                    </h3>
                    <button onClick={onClose}><i className="fa-solid fa-xmark text-gray-400 hover:text-red-600 text-xl"></i></button>
                </div>

                <div className="overflow-x-auto border rounded">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3">#</th>
                                <th className="p-3">النشاط</th>
                                <th className="p-3">الوصف</th>
                                <th className="p-3">التاريخ المخطط</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {plan.map((activity, idx) => (
                                <tr key={activity.id || idx} className="hover:bg-gray-50">
                                    <td className="p-3 text-center font-bold text-gray-500">{idx + 1}</td>
                                    <td className="p-3 font-bold">{activity.activity}</td>
                                    <td className="p-3 text-gray-600">{activity.description}</td>
                                    <td className="p-3 text-center">{activity.plannedDate}</td>
                                </tr>
                            ))}
                            {plan.length === 0 && (
                                <tr><td colSpan="4" className="p-8 text-center text-gray-400">لا توجد أنشطة مسجلة</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="mt-6 flex justify-end pt-4 border-t">
                    <button onClick={onClose} className="px-8 py-2 bg-primary-600 text-white rounded font-bold shadow">إغلاق</button>
                </div>
            </div>
        </div>
    );
};

export default ActivationPlanModalReadOnly;
