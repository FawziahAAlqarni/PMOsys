'use client';
import React, { useState } from 'react';
import { FileText, X, Info, Save } from 'lucide-react';
import {PORTFOLIOS} from '@/lib/constants';

export default function CharterModal({ project, onClose, onSave }: any) {
  const [data, setData] = useState({
    name: project.name,
    desc: project.description,
    manager: project.charterData?.projectManager || '',
    strategicObj: project.charterData?.strategicObj || '',
    strategicRes: project.charterData?.strategicRes || '',
    portfolio: project.charterData?.portfolio || '',
    portfolioManager: project.charterData?.portfolioManager || '',
    progName: project.charterData?.programName || '',
    progManager: project.charterData?.programManager || '',
    dependencies: project.charterData?.dependencies || '',
    techCommittee: project.charterData?.techCommittee || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if(!data.name || !data.manager || !data.portfolio) {
      alert("يرجى تعبئة الحقول الأساسية");
      return;
    }
    onSave({
      projectManager: data.manager,
      strategicObj: data.strategicObj,
      strategicRes: data.strategicRes,
      programName: data.progName,
      programManager: data.progManager,
      portfolio: data.portfolio,
      portfolioManager: data.portfolioManager,
      dependencies: data.dependencies,
      techCommittee: data.techCommittee
    });
  };

  return (
    <div className="fixed inset-0 bg-[#003319]/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl h-auto max-h-[90vh] flex flex-col border-t-8 border-[#006C35]">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-[#f2fcf5] rounded-t-lg">
          <h2 className="text-2xl font-bold text-[#004d25] flex items-center gap-2">
            <FileText className="text-[#C5A96F]" /> بطاقة ميثاق المشروع (Charter)
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-red-600 transition"><X /></button>
        </div>
        <div className="p-8 overflow-y-auto custom-scrollbar space-y-8 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="col-span-full border-b border-gray-100 pb-6">
              <h3 className="text-lg font-bold text-[#006C35] mb-4 border-r-4 border-[#C5A96F] pr-3">معلومات المشروع الأساسية</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">اسم المشروع</label>
                  <input name="name" value={data.name} onChange={handleChange} className="w-full p-3 bg-white border border-gray-300 rounded-lg outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">مدير المشروع</label>
                  <input name="manager" value={data.manager} onChange={handleChange} className="w-full p-3 bg-white border border-gray-300 rounded-lg outline-none" />
                </div>
                <div className="col-span-full">
                  <label className="block text-sm font-bold text-gray-700 mb-1">وصف المشروع</label>
                  <textarea name="desc" value={data.desc} onChange={handleChange} rows={3} className="w-full p-3 bg-white border border-gray-300 rounded-lg outline-none"></textarea>
                </div>
              </div>
            </div>

            <div className="col-span-full border-b border-gray-100 pb-6">
              <h3 className="text-lg font-bold text-[#006C35] mb-4 border-r-4 border-[#C5A96F] pr-3">المواءمة الاستراتيجية</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><label className="block text-sm font-bold text-gray-700 mb-1">الهدف الاستراتيجي</label><input name="strategicObj" value={data.strategicObj} onChange={handleChange} className="w-full p-3 bg-white border border-gray-300 rounded-lg outline-none" /></div>
                <div><label className="block text-sm font-bold text-gray-700 mb-1">النتيجة الاستراتيجية</label><input name="strategicRes" value={data.strategicRes} onChange={handleChange} className="w-full p-3 bg-white border border-gray-300 rounded-lg outline-none" /></div>
              </div>
            </div>

            <div className="col-span-full border-b border-gray-100 pb-6">
              <h3 className="text-lg font-bold text-[#006C35] mb-4 border-r-4 border-[#C5A96F] pr-3">البرنامج والمحفظة</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">المحفظة</label>
                  <select name="portfolio" value={data.portfolio} onChange={handleChange} className="w-full p-3 bg-white border border-gray-300 rounded-lg outline-none">
                    <option value="">اختر المحفظة...</option>
                    {PORTFOLIOS.map(portfolio => (
                      <option key={portfolio.id} value={portfolio.nameAr}>{portfolio.nameAr}</option>
                    ))}
                  </select>
                </div>
                <div><label className="block text-sm font-bold text-gray-700 mb-1">مدير المحفظة</label><input name="portfolioManager" value={data.portfolioManager} onChange={handleChange} className="w-full p-3 bg-white border border-gray-300 rounded-lg outline-none" /></div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">اسم البرنامج</label>
                  <select name="progName" value={data.progName} onChange={handleChange} className="w-full p-3 bg-white border border-gray-300 rounded-lg outline-none">
                    <option value="">اختر البرنامج...</option>
                    <option value="برنامج تطوير السياسات والإجراءات المتكاملة">برنامج تطوير السياسات والإجراءات المتكاملة</option>
                    <option value="برنامج تحقيق التميز المؤسسي">برنامج تحقيق التميز المؤسسي</option>
                    <option value="برنامج رفع كفاءة التحليل الاستراتيجي للوزارة والمواءمة مع منظومة الأمن والدفاع">برنامج رفع كفاءة التحليل الاستراتيجي للوزارة والمواءمة مع منظومة الأمن والدفاع</option>
                    <option value="برنامج تطوير البنية التحتية لمراكز البيانات والتطبيقات">برنامج تطوير البنية التحتية لمراكز البيانات والتطبيقات</option>
                    <option value="برنامج التحول الرقمي">برنامج التحول الرقمي</option>
                    <option value="برنامج رفع كفاءة الخدمات الرقمية والتقنية">برنامج رفع كفاءة الخدمات الرقمية والتقنية</option>
                    <option value="برنامج رفع كفاءة إدارة وحوكمة البيانات">برنامج رفع كفاءة إدارة وحوكمة البيانات</option>
                    <option value="برنامج تطوير قدرات الاتصالات العسكرية">برنامج تطوير قدرات الاتصالات العسكرية</option>
                    <option value="برنامج تطوير وإدارة الأصول السيبرانية">برنامج تطوير وإدارة الأصول السيبرانية</option>
                    <option value="برنامج التميز في تقديم خدمات الأمن السيبراني">برنامج التميز في تقديم خدمات الأمن السيبراني</option>
                    <option value="برنامج رفع كفاءة الوقاية من الحوادث السيبرانية والاستجابة لها">برنامج رفع كفاءة الوقاية من الحوادث السيبرانية والاستجابة لها</option>
                    <option value="برنامج تعزيز الجاهزية للتحول">برنامج تعزيز الجاهزية للتحول</option>
                    <option value="برنامج تعزيز قدرات التواصل الداخلي والإعلام">برنامج تعزيز قدرات التواصل الداخلي والإعلام</option>
                    <option value="برنامج تطوير رأس المال البشري">برنامج تطوير رأس المال البشري</option>
                    <option value="برنامج تطوير القدرات وتنمية المهارات">برنامج تطوير القدرات وتنمية المهارات</option>
                    <option value="برنامج تمكين تحول وزارة الحرس الوطني">برنامج تمكين تحول وزارة الحرس الوطني</option>
                    <option value="برنامج توطين الصناعات العسكرية ورفع مستوى المحتوى المحلي">برنامج توطين الصناعات العسكرية ورفع مستوى المحتوى المحلي</option>
                    <option value="رفع مستوى اعتزاز ووعي منسوبي الوزارة">رفع مستوى اعتزاز ووعي منسوبي الوزارة</option>
                    <option value="برنامج دراسة وتطوير البنية التحتية للشؤون التنفيذية">برنامج دراسة وتطوير البنية التحتية للشؤون التنفيذية</option>
                    <option value="برنامج تطوير المشتريات والتسليح">برنامج تطوير المشتريات والتسليح</option>
                    <option value="برنامج رفع كفاءة إدارة المحافظ والمشاريع">برنامج رفع كفاءة إدارة المحافظ والمشاريع</option>
                    <option value="برنامج رفع كفاءة التخطيط المالي">برنامج رفع كفاءة التخطيط المالي</option>
                    <option value="برنامج رفع فاعلية اتخاذ القرار">برنامج رفع فاعلية اتخاذ القرار</option>
                    <option value="رفع كفاءة وجودة الخدمات الممكنة في وزارة الحرس الوطني">رفع كفاءة وجودة الخدمات الممكنة في وزارة الحرس الوطني</option>
                    <option value="برنامج إدارة المخاطر والامتثال">برنامج إدارة المخاطر والامتثال</option>
                    <option value="برنامج تأسيس وتطوير  البنية التحتية للرعاية الوقائية">برنامج تأسيس وتطوير  البنية التحتية للرعاية الوقائية</option>
                    <option value="برنامج ازدهار  ورفاهية منسوبي الشؤون الصحية">برنامج ازدهار  ورفاهية منسوبي الشؤون الصحية</option>
                    <option value="برامج رفع الجاهزية  الطبية ضد الكوارث">برامج رفع الجاهزية  الطبية ضد الكوارث</option>
                    <option value="برنامج تفعيل الرعاية الوقائية">برنامج تفعيل الرعاية الوقائية</option>
                    <option value="برنامج تحسين الوصول الى الرعاية الصحية">برنامج تحسين الوصول الى الرعاية الصحية</option>
                    <option value="برنامج تعزيز جودة الرعاية الصحية">برنامج تعزيز جودة الرعاية الصحية</option>
                    <option value="برنامج تحسين الكفاءة والاستدامة المالية">برنامج تحسين الكفاءة والاستدامة المالية</option>
                    <option value="برنامج التحول المؤسسي">برنامج التحول المؤسسي</option>
                    <option value="برنامج  التميز البحثي والابتكار">برنامج  التميز البحثي والابتكار</option>
                    <option value="برنامج تطوير عمليات الموارد البشرية">برنامج تطوير عمليات الموارد البشرية</option>
                    <option value="برنامج تنمية الكادر الإداري">برنامج تنمية الكادر الإداري</option>
                    <option value="برنامج تعزيز قدرات الجمع والتحليل الاستخباراتي">برنامج تعزيز قدرات الجمع والتحليل الاستخباراتي</option>
                    <option value="برنامج تأسيس وتطوير العقيدة والتدريب">برنامج تأسيس وتطوير العقيدة والتدريب</option>
                    <option value="برنامج تحسين وتخطيط التدريب">برنامج تحسين وتخطيط التدريب</option>
                    <option value="برنامج إدارة القوى البشرية">برنامج إدارة القوى البشرية</option>
                    <option value="برنامج تعزيز قدرات الأمن والسلامة">برنامج تعزيز قدرات الأمن والسلامة</option>
                    <option value="برنامج تعزيز قدرات الاتصالات">برنامج تعزيز قدرات الاتصالات</option>
                    <option value="برنامج تطوير الأفواج">برنامج تطوير الأفواج</option>
                    <option value="برنامج تعزيز التخطيط العملياتي">برنامج تعزيز التخطيط العملياتي</option>
                    <option value="برنامج تطوير الخدمات اللوجستية">برنامج تطوير الخدمات اللوجستية</option>
                    <option value="تطوير المنظومة القيادية في الجهاز العسكري">تطوير المنظومة القيادية في الجهاز العسكري</option>
                    <option value="برنامج التميز المؤسسي العسكري">برنامج التميز المؤسسي العسكري</option>
                    <option value="برنامج تعزيز قدرات الطب العسكري الميداني">برنامج تعزيز قدرات الطب العسكري الميداني</option>
                    <option value="برنامج تطوير وتكامل القدرات">برنامج تطوير وتكامل القدرات</option>
                    <option value="برنامج الكفاءة والتميز  للطب العسكري الميداني">برنامج الكفاءة والتميز  للطب العسكري الميداني</option>
                    <option value="برنامج التكامل مع شركاء المنظومة">برنامج التكامل مع شركاء المنظومة</option>
                    <option value="برنامج التميز العملياتي">برنامج التميز العملياتي</option>
                    <option value="تعزيز الجاهزية والتفوق في تنفيذ المهام">تعزيز الجاهزية والتفوق في تنفيذ المهام</option>
                    <option value="برنامج هيكلة وتموضع قوات وزارة الحرس الوطني">برنامج هيكلة وتموضع قوات وزارة الحرس الوطني</option>
                    <option value="برنامج تعزيز كفاءة القوات">برنامج تعزيز كفاءة القوات</option>
                    <option value="برنامج تطوير الكليات العسكرية">برنامج تطوير الكليات العسكرية</option>
                  </select>
                </div>
                <div><label className="block text-sm font-bold text-gray-700 mb-1">مدير البرنامج</label><input name="progManager" value={data.progManager} onChange={handleChange} className="w-full p-3 bg-white border border-gray-300 rounded-lg outline-none" /></div>
              </div>
            </div>
            <div className="col-span-full"><h3 className="text-lg font-bold text-[#006C35] mb-4 border-r-4 border-[#C5A96F] pr-3">تفاصيل إضافية</h3>
              <div className="grid grid-cols-1 gap-6">
                <div><label className="block text-sm font-bold text-gray-700 mb-1">أبرز الاعتماديات (Dependencies)</label><textarea name="dependencies" value={data.dependencies} onChange={handleChange} rows={2} className="w-full p-3 bg-white border border-gray-300 rounded-lg outline-none"></textarea></div>
                <div><label className="block text-sm font-bold text-gray-700 mb-1">أعضاء اللجنة الفنية</label><textarea name="techCommittee" value={data.techCommittee} onChange={handleChange} rows={2} className="w-full p-3 bg-white border border-gray-300 rounded-lg outline-none"></textarea></div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-xl flex justify-between items-center">
          <span className="text-xs text-gray-500 font-bold flex items-center gap-1"><Info size={14} className="text-[#C5A96F]" /> يجب تعبئة جميع الحقول</span>
          <button onClick={handleSave} className="px-8 py-3 bg-[#006C35] hover:bg-[#004d25] text-white rounded-lg font-bold shadow-md transition flex items-center gap-2">
            <Save size={18} /> حفظ البيانات
          </button>
        </div>
      </div>
    </div>
  );
}
