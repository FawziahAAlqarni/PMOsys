import React, { useState } from 'react';

const LessonsLearnedModal = ({ data, onClose, onSave }) => {
    const [lessons, setLessons] = useState(data || []);
    const [newLesson, setNewLesson] = useState({ problem: '', impact: '', lesson: '' });

    const addLesson = () => {
        if (newLesson.problem && newLesson.lesson) {
            setLessons([...lessons, { ...newLesson, id: Date.now() }]);
            setNewLesson({ problem: '', impact: '', lesson: '' });
        } else {
            alert("يرجى تعبئة المشكلة والدرس المستفاد");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm fade-in">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto p-6 border-t-8 border-primary-600">
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <h3 className="text-xl font-bold text-primary-900">سجل الدروس المستفادة</h3>
                    <button onClick={onClose}><i className="fa-solid fa-xmark text-gray-400 hover:text-red-600 text-xl"></i></button>
                </div>

                <div className="grid grid-cols-12 gap-2 mb-4 bg-gray-50 p-4 rounded-lg border">
                    <div className="col-span-4"><input className="w-full p-2 border rounded text-sm" placeholder="المشكلة / وصف النجاح" value={newLesson.problem} onChange={e=>setNewLesson({...newLesson, problem:e.target.value})} /></div>
                    <div className="col-span-4"><input className="w-full p-2 border rounded text-sm" placeholder="الأثر على المرحلة" value={newLesson.impact} onChange={e=>setNewLesson({...newLesson, impact:e.target.value})} /></div>
                    <div className="col-span-3"><input className="w-full p-2 border rounded text-sm" placeholder="الدرس المستفاد / التوصيات" value={newLesson.lesson} onChange={e=>setNewLesson({...newLesson, lesson:e.target.value})} /></div>
                    <div className="col-span-1"><button onClick={addLesson} className="bg-primary-600 text-white w-full py-2 rounded font-bold">+</button></div>
                </div>

                <div className="overflow-x-auto border rounded-lg">
                    <table className="w-full text-sm text-right">
                        <thead className="bg-primary-800 text-white">
                            <tr>
                                <th className="p-3">#</th>
                                <th className="p-3">المشكلة / وصف النجاح</th>
                                <th className="p-3">الأثر على المرحلة</th>
                                <th className="p-3">الدروس المستفادة والتوصيات</th>
                                <th className="p-3"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {lessons.map((l, i) => (
                                <tr key={l.id} className="hover:bg-gray-50">
                                    <td className="p-3 font-bold">{i+1}</td>
                                    <td className="p-3">{l.problem}</td>
                                    <td className="p-3">{l.impact}</td>
                                    <td className="p-3">{l.lesson}</td>
                                    <td className="p-3 text-center"><i className="fa-solid fa-trash text-red-400 cursor-pointer" onClick={()=>setLessons(lessons.filter(item=>item.id!==l.id))}></i></td>
                                </tr>
                            ))}
                            {lessons.length === 0 && <tr><td colSpan="5" className="p-6 text-center text-gray-400">لا توجد دروس مسجلة</td></tr>}
                        </tbody>
                    </table>
                </div>

                <div className="mt-6 flex justify-end gap-3 pt-4 border-t">
                    <button onClick={onClose} className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded font-bold">إلغاء</button>
                    <button onClick={()=>onSave(lessons)} className="px-8 py-2 bg-secondary-gold text-white rounded font-bold shadow">حفظ السجل</button>
                </div>
            </div>
        </div>
    );
};

export default LessonsLearnedModal;