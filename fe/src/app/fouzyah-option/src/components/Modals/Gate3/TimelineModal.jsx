import React, { useState } from 'react';

const TimelineModal = ({ data, onClose, onSave }) => {
    const [timeline, setTimeline] = useState(data.timeline || []);
    
    // حالة الصف الجديد
    const [newTask, setNewTask] = useState({ name: '', status: 'لم ينفذ' });

    // خيارات الحالة
    const statusOptions = [
        { value: 'لم ينفذ', label: '⚪ لم ينفذ', color: 'bg-gray-100 text-gray-600' },
        { value: 'منفذ جزئيا', label: '🟡 منفذ جزئياً', color: 'bg-yellow-100 text-yellow-700' },
        { value: 'مكتمل', label: '🟢 مكتمل', color: 'bg-green-100 text-green-700' }
    ];

    // خيارات الجدول (مفتاح الرسم)
    const legendItems = [
        { id: 'deliverable', label: 'تسليم المخرج', color: 'bg-blue-500' },
        { id: 'project', label: 'أنشطة المشروع', color: 'bg-black' },
        { id: 'enablement', label: 'أنشطة التمكين', color: 'bg-yellow-400' },
        { id: 'training', label: 'أنشطة التدريب', color: 'bg-gray-400' },
        { id: null, label: 'إزالة', color: 'bg-white border' }
    ];

    // --- دوال التحكم ---
    const addRow = () => {
        if (!newTask.name.trim()) return alert("يرجى كتابة اسم حزمة العمل");
        
        const newRow = { 
            id: Date.now(), 
            task: newTask.name, 
            status: newTask.status,
            cells: Array(20).fill(null) // 5 أشهر * 4 أسابيع
        };
        
        setTimeline([...timeline, newRow]);
        setNewTask({ name: '', status: 'لم ينفذ' });
    };

    const removeRow = (id) => {
        setTimeline(timeline.filter(row => row.id !== id));
    };

    const updateRowStatus = (id, newStatus) => {
        setTimeline(timeline.map(row => row.id === id ? { ...row, status: newStatus } : row));
    };

    const toggleCell = (rowIndex, cellIndex) => {
        const newTimeline = [...timeline];
        const row = { ...newTimeline[rowIndex], cells: [...newTimeline[rowIndex].cells] };
        
        const currentVal = row.cells[cellIndex];
        let nextVal = 'deliverable';
        if (currentVal === 'deliverable') nextVal = 'project';
        else if (currentVal === 'project') nextVal = 'enablement';
        else if (currentVal === 'enablement') nextVal = 'training';
        else if (currentVal === 'training') nextVal = null;
        
        row.cells[cellIndex] = nextVal;
        newTimeline[rowIndex] = row;
        setTimeline(newTimeline);
    };

    const renderIcon = (type) => { 
        if (!type) return null; 
        const color = legendItems.find(l => l.id === type)?.color; 
        return <div className={`w-3 h-3 transform rotate-45 ${color} shadow-sm mx-auto`}></div>; 
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm fade-in">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-y-auto">
                <div className="p-4 rounded-t-xl flex justify-between items-center" style={{background: 'linear-gradient(to right, #f9f5eb, #dccc9f)'}}>
                    <div className="flex items-center gap-3">
                        <div className="bg-white p-3 rounded-lg shadow-md" style={{minWidth: '64px', minHeight: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <img src="/Logo.png" alt="Logo" style={{width: '56px', height: '56px', objectFit: 'contain', imageRendering: '-webkit-optimize-contrast'}} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">الخطة التفصيلية للمشروع (الجدول الزمني)</h3>
                            <p className="text-xs text-gray-600">تحديد حزم العمل والأنشطة عبر الفترة الزمنية</p>
                        </div>
                    </div>
                    <button onClick={onClose}><i className="fa-solid fa-xmark text-gray-400 hover:text-red-600 text-xl"></i></button>
                </div>
                <div className="p-6">

                {/* Legend */}
                <div className="flex flex-wrap justify-center gap-4 mb-6 p-3 bg-gray-50 rounded-lg border">
                    {legendItems.map(item => (
                        <div key={item.id} className="flex items-center gap-2">
                            <div className={`w-3 h-3 transform rotate-45 ${item.color} border border-gray-300 shadow-sm`}></div>
                            <span className="text-xs font-bold text-gray-600">{item.label}</span>
                        </div>
                    ))}
                </div>

                {/* Add Form */}
                <div className="flex gap-4 items-end mb-6 bg-primary-50 p-4 rounded-xl border border-primary-100">
                    <div className="flex-1">
                        <label className="block text-xs font-bold mb-1 text-primary-900">اسم حزمة العمل</label>
                        <input 
                            className="w-full p-2 border rounded-lg text-sm focus:ring-2 focus:ring-secondary-gold outline-none" 
                            placeholder="مثال: تحليل المتطلبات..." 
                            value={newTask.name}
                            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                        />
                    </div>
                    <div className="w-48">
                        <label className="block text-xs font-bold mb-1 text-primary-900">الحالة الحالية</label>
                        <select 
                            className="w-full p-2 border rounded-lg text-sm cursor-pointer"
                            value={newTask.status}
                            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                        >
                            {statusOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                        </select>
                    </div>
                    <button onClick={addRow} className="bg-secondary-gold text-white px-6 py-2 rounded-lg font-bold shadow hover:bg-yellow-600 transition h-10">
                        <i className="fa-solid fa-plus ml-2"></i> إضافة
                    </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto border rounded-xl shadow-inner mb-6">
                    <table className="w-full text-center border-collapse">
                        <thead>
                            <tr className="bg-primary-900 text-white text-xs">
                                <th className="p-3 border-l border-primary-700 w-64 min-w-[200px]" rowSpan="2">حزمة الأعمال</th>
                                <th className="p-3 border-l border-primary-700 w-32 min-w-[120px]" rowSpan="2">الحالة</th>
                                <th className="p-2 border-l border-primary-700" colSpan="4">الشهر 1</th>
                                <th className="p-2 border-l border-primary-700" colSpan="4">الشهر 2</th>
                                <th className="p-2 border-l border-primary-700" colSpan="4">الشهر 3</th>
                                <th className="p-2 border-l border-primary-700" colSpan="4">الشهر 4</th>
                                <th className="p-2 border-l border-primary-700" colSpan="4">الشهر 5</th>
                                <th className="p-2 w-10" rowSpan="2"></th>
                            </tr>
                            <tr className="bg-primary-800 text-white text-[10px]">
                                {[1,2,3,4,5].map(m => [1,2,3,4].map(w => <th key={`${m}-${w}`} className="p-1 border border-primary-700 w-8">{w}</th>))}
                            </tr>
                        </thead>
                        <tbody className="text-sm bg-white">
                            {timeline.length === 0 ? (
                                <tr><td colSpan="23" className="p-8 text-gray-400">لا توجد حزم أعمال مضافة. ابدأ بالإضافة من النموذج أعلاه.</td></tr>
                            ) : (
                                timeline.map((row, rIndex) => (
                                    <tr key={row.id} className="hover:bg-gray-50 transition border-b group">
                                        {/* اسم الحزمة */}
                                        <td className="border-l p-3 text-right font-bold text-gray-700 bg-gray-50">
                                            {row.task}
                                        </td>
                                        
                                        {/* الحالة (Dropdown داخل الجدول) */}
                                        <td className="border-l p-2 bg-gray-50">
                                            <select 
                                                className={`w-full p-1 rounded text-xs font-bold border-none outline-none cursor-pointer ${statusOptions.find(o => o.value === row.status)?.color}`}
                                                value={row.status}
                                                onChange={(e) => updateRowStatus(row.id, e.target.value)}
                                            >
                                                {statusOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.value}</option>)}
                                            </select>
                                        </td>

                                        {/* الخلايا الزمنية */}
                                        {row.cells.map((cell, cIndex) => (
                                            <td 
                                                key={cIndex} 
                                                className="border-l cursor-pointer hover:bg-gray-200 w-8 h-10 relative transition-colors"
                                                onClick={() => toggleCell(rIndex, cIndex)}
                                            >
                                                {cell && <div className="absolute inset-x-0 top-1/2 h-1 bg-secondary-light/50 -z-0"></div>}
                                                <div className="relative z-10">{renderIcon(cell)}</div>
                                            </td>
                                        ))}

                                        {/* زر الحذف */}
                                        <td className="p-2 text-center">
                                            <button onClick={() => removeRow(row.id)} className="text-gray-300 hover:text-red-500 transition">
                                                <i className="fa-solid fa-trash-can"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div className="mt-4 flex justify-end gap-3 pt-4 border-t">
                    <button onClick={onClose} className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded font-bold">إلغاء</button>
                    <button onClick={() => onSave({ timeline })} className="px-8 py-2 bg-primary-600 text-white rounded font-bold shadow hover:bg-primary-700">
                        حفظ الجدول الزمني
                    </button>
                </div>
                </div>
            </div>
        </div>
    );
};

export default TimelineModal;