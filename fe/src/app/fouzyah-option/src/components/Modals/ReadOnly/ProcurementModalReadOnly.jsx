import React from 'react';

const ProcurementModalReadOnly = ({ data, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm fade-in">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="p-4 rounded-t-xl flex justify-between items-center" style={{background: 'linear-gradient(to right, #f9f5eb, #dccc9f)'}}>
                    <h2 className="text-base font-bold text-primary-900">
                        خطة المشتريات وتحليل الخيارات <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">للعرض فقط</span>
                    </h2>
                    <button onClick={onClose}><i className="fa-solid fa-xmark text-gray-400 hover:text-red-600 text-xl"></i></button>
                </div>
                <div className="p-6">
                    {data.selectedOption && (
                        <div className="mb-4">
                            <label className="block text-xs font-bold mb-2 text-gray-700">الخيار المختار</label>
                            <div className="w-full p-3 border rounded text-sm bg-gray-50">
                                {data.selectedOption}
                            </div>
                        </div>
                    )}
                    
                    {data.selectedOptionAnalysis && (
                        <div className="space-y-4">
                            {data.selectedOptionAnalysis.pros && (
                                <div>
                                    <label className="block text-xs font-bold mb-2 text-green-700">المميزات</label>
                                    <div className="w-full p-3 border rounded text-sm bg-green-50">
                                        {data.selectedOptionAnalysis.pros}
                                    </div>
                                </div>
                            )}
                            {data.selectedOptionAnalysis.cons && (
                                <div>
                                    <label className="block text-xs font-bold mb-2 text-red-700">العيوب</label>
                                    <div className="w-full p-3 border rounded text-sm bg-red-50">
                                        {data.selectedOptionAnalysis.cons}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="mt-8 flex justify-end pt-4 border-t">
                        <button onClick={onClose} className="px-8 py-2 bg-primary-600 text-white rounded font-bold shadow">إغلاق</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProcurementModalReadOnly;
