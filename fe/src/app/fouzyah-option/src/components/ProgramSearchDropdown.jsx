import React, { useState, useRef, useEffect } from 'react';

const ProgramSearchDropdown = ({ name, value, onChange, label, placeholder }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // قائمة البرامج الكاملة
  const programs = [
    "برنامج تطوير السياسات والإجراءات المتكاملة",
    "برنامج تحقيق التميز المؤسسي",
    "برنامج رفع كفاءة التحليل الاستراتيجي للوزارة والمواءمة مع منظومة الأمن والدفاع",
    "برنامج تطوير البنية التحتية لمراكز البيانات والتطبيقات",
    "برنامج التحول الرقمي",
    "برنامج رفع كفاءة الخدمات الرقمية والتقنية",
    "برنامج رفع كفاءة إدارة وحوكمة البيانات",
    "برنامج تطوير قدرات الاتصالات العسكرية",
    "برنامج تطوير وإدارة الأصول السيبرانية",
    "برنامج التميز في تقديم خدمات الأمن السيبراني",
    "برنامج رفع كفاءة الوقاية من الحوادث السيبرانية والاستجابة لها",
    "برنامج تعزيز الجاهزية للتحول",
    "برنامج تعزيز قدرات التواصل الداخلي والإعلام",
    "برنامج تطوير رأس المال البشري",
    "برنامج تطوير القدرات وتنمية المهارات",
    "برنامج تمكين تحول وزارة الحرس الوطني",
    "برنامج توطين الصناعات العسكرية ورفع مستوى المحتوى المحلي",
    "رفع مستوى اعتزاز ووعي منسوبي الوزارة",
    "برنامج دراسة وتطوير البنية التحتية للشؤون التنفيذية",
    "برنامج تطوير المشتريات والتسليح",
    "برنامج رفع كفاءة إدارة المحافظ والمشاريع",
    "برنامج رفع كفاءة التخطيط المالي",
    "برنامج رفع فاعلية اتخاذ القرار",
    "رفع كفاءة وجودة الخدمات الممكنة في وزارة الحرس الوطني",
    "برنامج إدارة المخاطر والامتثال",
    "برنامج تأسيس وتطوير البنية التحتية للرعاية الوقائية",
    "برنامج ازدهار ورفاهية منسوبي الشؤون الصحية",
    "برامج رفع الجاهزية الطبية ضد الكوارث",
    "برنامج تفعيل الرعاية الوقائية",
    "برنامج تحسين الوصول الى الرعاية الصحية",
    "برنامج تعزيز جودة الرعاية الصحية",
    "برنامج تحسين الكفاءة والاستدامة المالية",
    "برنامج التحول المؤسسي",
    "برنامج التميز البحثي والابتكار",
    "برنامج تطوير عمليات الموارد البشرية",
    "برنامج تنمية الكادر الإداري",
    "برنامج تعزيز قدرات الجمع والتحليل الاستخباراتي",
    "برنامج تأسيس وتطوير العقيدة والتدريب",
    "برنامج تحسين وتخطيط التدريب",
    "برنامج إدارة القوى البشرية",
    "برنامج تعزيز قدرات الأمن والسلامة",
    "برنامج تعزيز قدرات الاتصالات",
    "برنامج تطوير الأفواج",
    "برنامج تعزيز التخطيط العملياتي",
    "برنامج تطوير الخدمات اللوجستية",
    "تطوير المنظومة القيادية في الجهاز العسكري",
    "برنامج التميز المؤسسي العسكري",
    "برنامج تعزيز قدرات الطب العسكري الميداني",
    "برنامج تطوير وتكامل القدرات",
    "برنامج الكفاءة والتميز للطب العسكري الميداني",
    "برنامج التكامل مع شركاء المنظومة",
    "برنامج التميز العملياتي",
    "تعزيز الجاهزية والتفوق في تنفيذ المهام",
    "برنامج هيكلة وتموضع قوات وزارة الحرس الوطني",
    "برنامج تعزيز كفاءة القوات",
    "برنامج تطوير الكليات العسكرية"
  ];

  // فلترة البرامج حسب البحث
  const filteredPrograms = programs.filter(program =>
    program.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // إغلاق القائمة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (program) => {
    onChange({
      target: {
        name: name,
        value: program
      }
    });
    setSearchTerm('');
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
  };

  const handleClear = () => {
    onChange({
      target: {
        name: name,
        value: ''
      }
    });
    setSearchTerm('');
  };

  return (
    <div ref={dropdownRef} className="relative">
      <label className="block text-xs font-bold text-primary-900 mb-1">
        {label} *
      </label>
      
      {value ? (
        // عرض البرنامج المختار
        <div className="w-full p-2 border rounded-lg text-sm bg-white flex items-center justify-between">
          <span className="text-gray-900 truncate flex-1">{value}</span>
          <button
            type="button"
            onClick={handleClear}
            className="text-red-500 hover:text-red-700 ml-2 flex-shrink-0"
          >
            <i className="fa-solid fa-times"></i>
          </button>
        </div>
      ) : (
        // حقل البحث
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => setIsOpen(true)}
            placeholder={placeholder || "ابحث عن البرنامج..."}
            className="w-full p-2 pr-8 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none"
            autoComplete="off"
          />
          <i className="fa-solid fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs"></i>
        </div>
      )}

      {/* قائمة النتائج */}
      {isOpen && !value && (
        <div className="absolute z-50 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredPrograms.length > 0 ? (
            filteredPrograms.map((program, index) => (
              <div
                key={index}
                onClick={() => handleSelect(program)}
                className="p-2 hover:bg-primary-50 cursor-pointer text-sm border-b last:border-b-0 transition-colors"
              >
                <div className="font-medium text-gray-900">{program}</div>
              </div>
            ))
          ) : (
            <div className="p-3 text-center text-gray-500 text-sm">
              <i className="fa-solid fa-search mb-2"></i>
              <p>لا توجد نتائج</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProgramSearchDropdown;
