import React, { useState, useMemo, useEffect } from 'react';

const LessonsLibrary = ({ onSelect, onClose, selectedLessons = [] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [localSelected, setLocalSelected] = useState(Array.isArray(selectedLessons) ? selectedLessons : []);
  const [lessonsDatabase, setLessonsDatabase] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // جلب الدروس المستفادة من قاعدة البيانات
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('http://localhost:3030/lessons-learned');
        if (!response.ok) throw new Error('فشل في جلب الدروس المستفادة');
        const data = await response.json();
        
        // تحويل البيانات من snake_case إلى camelCase
        const formattedData = data.map(lesson => ({
          id: lesson.id,
          title: lesson.title,
          category: lesson.category,
          description: lesson.description,
          lessonLearned: lesson.lesson_learned,
          problem: lesson.problem,
          recommendation: lesson.recommendation,
          projectName: lesson.project_name,
          phase: lesson.phase,
          status: lesson.status
        }));
        
        setLessonsDatabase(formattedData);
      } catch (err) {
        console.error('خطأ في جلب الدروس:', err);
        setError(err.message);
        setLessonsDatabase(defaultLessons); // استخدام البيانات الافتراضية في حالة الخطأ
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  // البيانات الافتراضية في حالة فشل الاتصال
  const defaultLessons = [
    // ========== CardId1: وضع خط الأساس لمؤشرات أداء مسار التوطين ==========
    {
      id: 1,
      title: 'الموائمة مع أصحاب المصلحة - مسار التوطين',
      category: 'أصحاب المصلحة',
      description: 'الموائمة مع جميع أصحاب المصلحة خصوصا في مسار التوطين من خلال اتفاقيات مستوى خدمة',
      lessonLearned: 'وضع خط الأساس لمؤشرات أداء مسار التوطين والانتهاء من نموذج التقرير الشهري لسمو الوزير',
      problem: 'عدم قدرة البرنامج للحصول على البيانات بشكل سلس',
      recommendation: 'ضمان الوصول للبيانات في الوقت المناسب والحصول على الدعم المطلوب من جميع أصحاب المصلحة',
      projectName: 'وضع خط الأساس لمؤشرات أداء مسار التوطين والانتهاء من نموذج التقرير الشهري لسمو الوزير',
      phase: 'تقييم مؤشرات الأداء الحالية',
      status: 'نشط'
    },
    {
      id: 2,
      title: 'قياس مستوى جاهزية الأطراف الخارجية',
      category: 'المخاطر',
      description: 'في حالة الاعتمادية على أطراف خارجية يجب قياس مستوى الجاهزية',
      lessonLearned: 'دراسة المنظومة بشكل كافي قبل بداية المشروع',
      problem: 'عدم دراسة المنظومة بشكل كافي قبل بداية المشروع',
      recommendation: 'قياس مستوى الجاهزية لدى الطرف الخارجي ومدى إمكانية الاعتماد عليه',
      projectName: 'وضع خط الأساس لمؤشرات أداء مسار التوطين والانتهاء من نموذج التقرير الشهري لسمو الوزير',
      phase: 'التخطيط',
      status: 'نشط'
    },

    // ========== CardId2: نظام إدارة المشاريع ==========
    {
      id: 3,
      title: 'إعداد حالات الاختبار مسبقاً',
      category: 'الجودة',
      description: 'التحضير الجيد لمرحلة الاختبار بوضع حالات الاختبار مسبقاً',
      lessonLearned: 'A better preparation for the testing phase by setting up test case in advance',
      problem: 'The testing phase for the system took longer than anticipated',
      recommendation: 'إعداد حالات الاختبار بشكل متقدم والاستفادة من أدوات مثل Jira لإدارة الأخطاء',
      projectName: 'نظام إدارة المشاريع',
      phase: 'مرحلة الاختبار',
      status: 'نشط'
    },
    {
      id: 4,
      title: 'زيادة مستوى الانخراط لتجنب النطاق الزاحف',
      category: 'التنفيذ',
      description: 'الانخراط الكافي مع أصحاب المصلحة يقلل من النطاق الزاحف (Scope Creep)',
      lessonLearned: 'Scope creep occurred during the execution of the project',
      problem: 'Scope creep occurred during the execution of the project',
      recommendation: 'زيادة مستوى الانخراط مع أصحاب المصلحة لالتقاط جميع جوانب المتطلبات',
      projectName: 'نظام إدارة المشاريع',
      phase: 'مرحلة التنفيذ',
      status: 'نشط'
    },

    // ========== CardId3: توطين الأسلحة الخفيفة ==========
    {
      id: 5,
      title: 'تحديد الاحتياج الفعلي من الجهة المستفيدة',
      category: 'التخطيط',
      description: 'الموائمة المبكرة مع أصحاب المصلحة في مرحلة دراسة الوضع الراهن',
      lessonLearned: 'عدم القدرة على تحديد الاحتياج الفعلي من الجهة المستفيدة',
      problem: 'عدم القدرة على تحديد الاحتياج الفعلي من الجهة المستفيدة مما أثر على تحقيق المستهدفات',
      recommendation: 'الموائمة المبكرة مع أصحاب المصلحة وتوفير الأدوات اللازمة في مرحلة مبكرة',
      projectName: 'وثيقة مشروع توطين الأسلحة الخفيفة الحالية - المرحلة الثانية',
      phase: 'التنفيذ',
      status: 'نشط'
    },

    // ========== CardId4: كراسة الشروط والمواصفات ==========
    {
      id: 6,
      title: 'الموائمة والاعتماد قبل الموافقة النهائية',
      category: 'التعاقدات',
      description: 'الاعتمادية على جهات متعددة للموافقة والموائمة على المخرج',
      lessonLearned: 'اعتماد مخرج كراسة الشروط والمواصفات',
      problem: 'الاعتمادية على جهات متعددة للموافقة والموائمة على المخرج قبل اعتماده',
      recommendation: 'تضمين مرحلة الموائمة والاعتماد ضمن خطة المشروع لتفادي المخاطر',
      projectName: 'مشروع EW',
      phase: 'اعتماد مخرج كراسة الشروط والمواصفات',
      status: 'نشط'
    },

    // ========== CardId5: القدرات المستقبلية ==========
    {
      id: 7,
      title: 'استثمار الموارد المتخصصة والجدول الزمني الدقيق',
      category: 'الموارد البشرية',
      description: 'تحقيق المستهدفات للقدرات المستقبلية بوقت قياسي',
      lessonLearned: 'النجاح: تحقيق المستهدقات للقدرات المستقبلية بوقت قياسي',
      problem: 'النجاح في التنفيذ يعتمد على الموارد المخصصة والجدول الزمني',
      recommendation: 'ضرورة استثمار الموارد المتخصصة من خلال استمرارية جهود فرق العمل المتخصصة',
      projectName: 'الانتهاء من الاحتياج التفصيلي للقدرات المستقبلية_المرحلة الثانية',
      phase: 'التنفيذ',
      status: 'نشط'
    },
    {
      id: 8,
      title: 'الموائمة مع الجهات ذات العلاقة',
      category: 'أصحاب المصلحة',
      description: 'أهمية الموائمة مع الجهات ذات العلاقة بتسهيل مهام فريق العمل',
      lessonLearned: 'بتسهيل مهام فريق العمل وبتكوين نواة تأسيسية لإدارة القدرات',
      problem: 'الاحتياج للموائمة المستمرة',
      recommendation: 'أهمية الموائمة مع الجهات ذات العلاقة بتسهيل مهام فريق العمل',
      projectName: 'الانتهاء من الاحتياج التفصيلي للقدرات المستقبلية_المرحلة الثانية',
      phase: 'التنفيذ',
      status: 'نشط'
    },

    // ========== CardId6: إعادة عمرة صواريخ الأميسترال ==========
    {
      id: 9,
      title: 'الدراسة القانونية المستفيضة قبل الموافقة',
      category: 'التخطيط',
      description: 'أهمية الدراسة القانونية المستفيضة قبل بحث موافقة صاحب الصلاحية',
      lessonLearned: 'تأخر المقاول الفرنسي بتقديم التكاليف التقديرية',
      problem: 'تأخر في تقديم التكاليف وعدم اعتماد الخطة مع الشركة الوطنية',
      recommendation: 'أهمية الدراسة القانونية المستفيضة قبل بحث موافقة صاحب الصلاحية',
      projectName: 'مشروع تقديم التوصيات النهائية لمشروع توطين إعادة عمرة صواريخ الاميسترال2 - المرحلة الثانية',
      phase: 'التنفيذ',
      status: 'نشط'
    },
    {
      id: 10,
      title: 'الموائمة على استبدال المنظومة',
      category: 'أصحاب المصلحة',
      description: 'أهمية الموائمة وبحث موافقة صاحب الصلاحية على استبدال المنظومة',
      lessonLearned: 'النجاح في تضمين بدائل متعددة مماثلة للمنظومة',
      problem: 'عدم اعتماد خطة العمل مع الشركة الوطنية',
      recommendation: 'أهمية الموائمة وبحث موافقة صاحب الصلاحية على استبدال المنظومة',
      projectName: 'مشروع تقديم التوصيات النهائية لمشروع توطين إعادة عمرة صواريخ الاميسترال2 - المرحلة الثانية',
      phase: 'التنفيذ',
      status: 'نشط'
    },

    // ========== CardId7: خطة تنفيذ للبرامج ==========
    {
      id: 11,
      title: 'تضمين مدة لمراجعة المخرجات وتعديلها',
      category: 'التخطيط',
      description: 'مدة المشروع غير كافية لمراجعة المخرجات وتعديلها',
      lessonLearned: 'مدة المشروع غير كافية لمراجعة المخرجات وتعديلها',
      problem: 'مدة المشروع غير كافية لمراجعة المخرجات وتعديلها',
      recommendation: 'تضمين مدة لمراجعة المخرجات وتعديلها حسب توصيات اللجنة التنفيذية',
      projectName: 'خطة تنفيذ للبرامج',
      phase: 'جميع المراحل',
      status: 'نشط'
    },
    {
      id: 12,
      title: 'إعادة توزيع المهام وتعديل خطة المشروع',
      category: 'التنفيذ',
      description: 'تأخير في الإنهاء من بعض المهام المجدولة',
      lessonLearned: 'تم إعادة توزيع المهام وتعديل خطة المشروع التفصيلية',
      problem: 'تأخير في الإنهاء من بعض المهام المجدولة لتعارض مع مواعيد زيارات',
      recommendation: 'تم إعادة توزيع المهام وتعديل خطة المشروع التفصيلية لضمان الإنهاء خلال مدة المشروع',
      projectName: 'خطة تنفيذ للبرامج',
      phase: 'الكل',
      status: 'نشط'
    },

    // ========== CardId8: النموذج التشغيلي للأسلحة والذخائر ==========
    {
      id: 13,
      title: 'ضرورة موائمة المخرجات مع أصحاب المصلحة',
      category: 'أصحاب المصلحة',
      description: 'عدم الموائمة يؤدي لعدم قبول المخرجات',
      lessonLearned: 'عدم الموائمة',
      problem: 'عدم الموائمة في مرحلة تصميم النموذج التشغيلي',
      recommendation: 'ضرورة موائمة المخرجات مع أصحاب المصلحة',
      projectName: 'نموذج التشغيل المستهدف للأسلحة والذخائر',
      phase: 'مرحلة تصميم النموذج التشغيلي',
      status: 'نشط'
    },
    {
      id: 14,
      title: 'ضرورة الحصول على دعم قيادة الجهاز العسكري',
      category: 'أصحاب المصلحة',
      description: 'دعم قيادة الجهاز العسكري يؤثر على نجاح المشروع',
      lessonLearned: 'دعم قيادة الجهاز العسكري',
      problem: 'الحاجة لدعم قيادة الجهاز العسكري',
      recommendation: 'ضرورة الحصول على الدعم من قيادة الجهاز العسكري',
      projectName: 'نموذج التشغيل المستهدف للأسلحة والذخائر',
      phase: 'كامل المشروع',
      status: 'نشط'
    },
    {
      id: 15,
      title: 'ضرورة عرض المخرجات على سمو الوزير',
      category: 'أصحاب المصلحة',
      description: 'التأخر في عرض المخرجات يؤدي لتأخر المشروع',
      lessonLearned: 'التأخر في عرض المخرجات على سمو الوزير',
      problem: 'التأخر في عرض المخرجات على سمو الوزير',
      recommendation: 'ضرورة عرض المخرجات على سمو الوزير لضمان عدم تأخر المشروع',
      projectName: 'نموذج التشغيل المستهدف للأسلحة والذخائر',
      phase: 'النموذج التشغيلي',
      status: 'نشط'
    },

    // ========== CardId9: توطين GIS ==========
    {
      id: 16,
      title: 'تطوير خطة مقاربة للواقع والموائمة المستمرة',
      category: 'التخطيط',
      description: 'تسليم المخرجات قبل تاريخ التسليم المخطط',
      lessonLearned: 'تسليم المخرجات قبل تاريخ التسليم المخطط',
      problem: 'تسليم المخرجات قبل تاريخ التسليم المخطط',
      recommendation: 'تطوير خطة مقاربة للواقع بالإضافة إلى الموائمة مع جميع الجهات',
      projectName: 'توطين التطوير والتشغيل GIS المرحلة الثانيه',
      phase: 'جميع المراحل',
      status: 'نشط'
    },

    // ========== CardId10: استدامة منظومات الحرس الوطني ==========
    {
      id: 17,
      title: 'المسح الميداني لبناء صورة واضحة',
      category: 'البيانات',
      description: 'عدم القدرة على بناء صورة واضحة للشركات عن حالة المرافق',
      lessonLearned: 'ساهم المسح الميداني بتمكين الشركات من الاطلاع على جميع المرافق والورش',
      problem: 'عدم القدرة على بناء صورة واضحة للشركات عن حالة المرافق',
      recommendation: 'إجراء مسح ميداني مع الشركات لجميع وحدات الوزارة',
      projectName: 'مشروع استدامة منظومات وزارة الحرس الوطني',
      phase: 'بناء متطلبات تجهيز الورش في كراسة طلب المعلومات (RFI)',
      status: 'نشط'
    },
    {
      id: 18,
      title: 'دراسة البنية التحتية الشاملة للمشاريع الضخمة',
      category: 'التخطيط',
      description: 'عدم وجود البنية التحتية اللازمة للصيانة الإسناد المباشر',
      lessonLearned: 'من الممكن استخدام الكتائب التي لديها الممكنات',
      problem: 'عدم وجود البنية التحتية اللازمة لبعض الوحدات',
      recommendation: 'دراسة البنية التحتية بشكل كامل للبحث عن موارد يمكن استخدامها',
      projectName: 'مشروع استدامة منظومات وزارة الحرس الوطني',
      phase: 'بناء متطلبات مواقع تنفيذ الأعمال في كراسة طلب المعلومات (RFI)',
      status: 'نشط'
    },
    {
      id: 19,
      title: 'منهجية متعددة المراحل للموائمة',
      category: 'الحوكمة',
      description: 'صعوبة المؤامة مع جميع أصحاب المصلحة',
      lessonLearned: 'بتباع المنهجية المحددة تم ضمان المؤامة المستمرة',
      problem: 'صعوبة المؤامة مع جميع أصحاب المصلحة',
      recommendation: 'اتباع منهجية محوكمة: البناء، التقويم، التوجيه، التصحيح، الاعتماد',
      projectName: 'مشروع استدامة منظومات وزارة الحرس الوطني',
      phase: 'إعداد واعتماد نطاقات العمل',
      status: 'نشط'
    },

    // ========== CardId11: توطين الذخائر ==========
    {
      id: 20,
      title: 'تحديد الهدف النهائي للبرنامج',
      category: 'التخطيط',
      description: 'عدم وضوح النطاق والفائدة المتوقعة يؤدي لتوقعات مختلفة',
      lessonLearned: 'Scope misalignment and unmet expectations',
      problem: 'عدم توافق بين ماهو متوقع من المشروع والنطاق والفائدة',
      recommendation: 'تحديد الهدف النهائي للبرنامج الكلي ما الذي نحاول تحقيقه',
      projectName: 'مشروع توطين الذخائر - المرحلة الثانية',
      phase: 'Execution',
      status: 'نشط'
    },
    {
      id: 21,
      title: 'تخصيص فترة تخطيط كافية للمشاريع',
      category: 'التخطيط',
      description: 'الفترة المحدودة للتخطيط تؤدي لعدم وضوح',
      lessonLearned: 'الفترة المحدودة للتخطيط تؤدي لعدم وضوح النطاق',
      problem: 'Short time allocated for planning',
      recommendation: 'تخصيص 5 أشهر للتنفيذ و شهر للإغلاق بدلاً من 6 أشهر للمشروع كاملاً',
      projectName: 'مشروع توطين الذخائر - المرحلة الثانية',
      phase: 'Execution',
      status: 'نشط'
    },
    {
      id: 22,
      title: 'مرحلة السرد القصصي (Storyboarding)',
      category: 'التخطيط',
      description: 'المخرجات يجب أن تمر بمرحلة السرد القصصي',
      lessonLearned: 'المخرجات يجب أن تمر بمرحلة السرد القصصي',
      problem: 'عدم وضوح الطرق والمنهجيات المتفق عليها',
      recommendation: 'المخرجات يجب أن تمر بمرحلة السرد القصصي قبل التخطيط والتنفيذ',
      projectName: 'مشروع توطين الذخائر - المرحلة الثانية',
      phase: 'Execution',
      status: 'نشط'
    },
    {
      id: 23,
      title: 'توحيد المنهجيات لمشاريع التوطين',
      category: 'التنظيم',
      description: 'عدم وجود منهجيات موحدة يؤدي لاختلافات',
      lessonLearned: 'عدم الموائمة ونقل المعرفة والمنهجيات الموحدة',
      problem: 'عدم وجود منهجيات موحدة لمسار التوطين',
      recommendation: 'توحيد أعمال التوطين تحت منهجيات موحدة لكل مرحلة',
      projectName: 'مشروع توطين الذخائر - المرحلة الثانية',
      phase: 'Execution',
      status: 'نشط'
    },
    {
      id: 24,
      title: 'تحسين البحث والوصول للمعلومات',
      category: 'البيانات',
      description: 'محدودية البحث والابداع في غرف البيانات السرية',
      lessonLearned: 'إنشاء مكتبة رقمية محلية للمراجع والبيانات',
      problem: 'محدودية البحث والابداع: لا يوجد إنترنت ولا مكتبة متاحة',
      recommendation: 'إنشاء مكتبة رقمية محلية للمراجع والبيانات ذات الصلة',
      projectName: 'مشروع توطين الذخائر - المرحلة الثانية',
      phase: 'Execution',
      status: 'نشط'
    },
    {
      id: 25,
      title: 'قياس وقت استجابة الجهات الخارجية',
      category: 'المخاطر',
      description: 'استغرقت أوقات الاستجابة من الشركات وقتاً أطول',
      lessonLearned: 'استغرقت أوقات الاستجابة من الشركات وقتاً أطول من المتوقع',
      problem: 'استغرقت أوقات الاستجابة من الشركات وقتاً أطول',
      recommendation: 'عدم تضمين مهام انتظار الاستجابة كهدف شهري أو عدم معاملة كمشروع بحد زمني',
      projectName: 'مشروع توطين الذخائر - المرحلة الثانية',
      phase: 'Execution',
      status: 'نشط'
    },

    // ========== CardId12: توطين الأميسترال المرحلة الثالثة ==========
    {
      id: 26,
      title: 'توثيق مشاركات أصحاب المصلحة',
      category: 'التوثيق',
      description: 'عدم توثيق مشاركات أصحاب المصلحة يؤدي لنزاعات',
      lessonLearned: 'اهمية التوثيق لجميع أعمال ومشاركات أصحاب المصلحة',
      problem: 'في حال تعذر توقيع المحاضر من أي جهة يجب حل هذه المشكلة',
      recommendation: 'توثيق جميع أعمال ومشاركات أصحاب المصلحة في الوقت المناسب',
      projectName: 'مشروع توطين إعادة عمرة صواريخ الاميسترال 2 - المرحلة الثالثة',
      phase: 'التنفيذ',
      status: 'نشط'
    },

    // ========== CardId13: تطوير التعويضات ==========
    {
      id: 27,
      title: 'الموائمة الفعالة قبل بدء المشاريع',
      category: 'أصحاب المصلحة',
      description: 'الموائمة الفعالة مع الجهات قبل البدء',
      lessonLearned: 'الموائمة الفعالة مع الشؤون الصحية قبل بدء المشاريع',
      problem: 'عدم وجود موائمة مسبقة مع الشؤون الصحية',
      recommendation: 'موائمة مسبقة مع الجهات المعنية في مرحلة مبكرة',
      projectName: 'دراسة المسارات المختلفة لمشروع تطوير التعويضات والمزايا',
      phase: 'تحليل الوضع الراهن',
      status: 'نشط'
    },

    // ========== CardId14: ترقية أداة إدارة المشاريع ==========
    {
      id: 28,
      title: 'عدم فتح بطاقة قبل الموافقات اللازمة',
      category: 'التخطيط',
      description: 'عدم أخذ الموافقات اللازمة قبل الطرح',
      lessonLearned: 'بسبب عدم اخذ الموافقات اللازمة تم الغاء المشروع',
      problem: 'الغاء المشروع بسبب عدم الموافقات',
      recommendation: 'عدم فتح بطاقة لأي مشروع قبل التأكد من الموافقات اللازمة',
      projectName: 'ترقية أداة إدارة المشاريع (EPM)',
      phase: 'التنفيذ',
      status: 'نشط'
    },

    // ========== CardId15: حوكمة التحول ==========
    {
      id: 29,
      title: 'الاجتماع اليومي مع المنفذ',
      category: 'التنفيذ',
      description: 'الاجتماع اليومي يضمن التزام الشركة بالتقدم',
      lessonLearned: 'الاجتماع اليومي مع الشركة أدى إلى التزام الشركة',
      problem: 'الحاجة للاجتماع اليومي لضمان التقدم',
      recommendation: 'الالتزام بعقد الاجتماع اليومي مع الشركة المنفذة',
      projectName: 'حوكمة التحول التفصيلية',
      phase: 'التنفيذ',
      status: 'نشط'
    },
    {
      id: 30,
      title: 'اختيار مدير مشروع متخصص',
      category: 'الموارد البشرية',
      description: 'تغيير مدير المشروع لشخص متخصص',
      lessonLearned: 'تغيير مدير المشروع ليكون الشخص ذا الخبرة',
      problem: 'عدم تعيين مدير مشروع متخصص',
      recommendation: 'الزام الشركة بأن يكون مدير المشروع ذا الخبرة في المجال',
      projectName: 'حوكمة التحول التفصيلية',
      phase: 'التنفيذ',
      status: 'نشط'
    },
    {
      id: 31,
      title: 'التحقق من تضمين المتطلبات في العروض',
      category: 'التعاقدات',
      description: 'مقاومة الشركة تنفيذ المتطلبات المتفق عليها',
      lessonLearned: 'التحقق من تضمين كافة المتطلبات في العروض',
      problem: 'مقاومة الشركة بحجة عدم تضمينها في العرض',
      recommendation: 'التحقق من تضمين جميع المتطلبات بشكل واضح في العروض الفنية والمالية',
      projectName: 'حوكمة التحول التفصيلية',
      phase: 'التنفيذ',
      status: 'نشط'
    },
    {
      id: 32,
      title: 'جودة الترجمة للمخرجات',
      category: 'الجودة',
      description: 'ضعف جودة ترجمة المخرجات من قبل الشركة',
      lessonLearned: 'وجود فريق معني بالتحقق من الجودة اللغوية',
      problem: 'ضعف جودة ترجمة المخرجات',
      recommendation: 'وجود فريق بالبرنامج معني بالتحقق من الجودة اللغوية والترجمة',
      projectName: 'حوكمة التحول التفصيلية',
      phase: 'التنفيذ',
      status: 'نشط'
    },
    {
      id: 33,
      title: 'المحافظة على وتيرة اجتماعات اللجنة التوجيهية',
      category: 'الحوكمة',
      description: 'المحافظة على وتيرة الاجتماعات ساهمت في النجاح',
      lessonLearned: 'المحافظة على وتيرة اجتماعات اللجنة التوجيهية',
      problem: 'الحاجة للاجتماعات المنتظمة',
      recommendation: 'الالتزام بعقد الاجتماعات حتى لو لم تكن هناك مخرجات',
      projectName: 'حوكمة التحول التفصيلية',
      phase: 'التنفيذ',
      status: 'نشط'
    },

    // ========== CardId16: المكاتب التنفيذية ==========
    {
      id: 34,
      title: 'تقييم فريق العمل من الشريك الاستشاري',
      category: 'الموارد البشرية',
      description: 'وجود فريق متخصص يساهم في النجاح',
      lessonLearned: 'وجود فريق متخصص وذو خبرة ساهم في تحقيق المستهدفات',
      problem: 'الحاجة لفريق متخصص',
      recommendation: 'تقييم فريق العمل واختيار فريق عمل متخصص',
      projectName: 'مبادرة تطوير المكاتب التنفيذية في وزارة الحرس الوطني',
      phase: 'التنفيذ',
      status: 'نشط'
    },
    {
      id: 35,
      title: 'تطوير آلية قبول التغييرات المقترحة',
      category: 'الحوكمة',
      description: 'عدم وجود معايير واضحة لقبول التغييرات',
      lessonLearned: 'تطوير آلية ومعايير واضحة',
      problem: 'عدم وجود آلية ومعايير واضحة',
      recommendation: 'تطوير آلية ومعايير واضحة موحدة للنموذج التشغيلي',
      projectName: 'مبادرة تطوير المكاتب التنفيذية في وزارة الحرس الوطني',
      phase: 'التنفيذ',
      status: 'نشط'
    },
    {
      id: 36,
      title: 'خطة تواصل محكمة مع القادة',
      category: 'أصحاب المصلحة',
      description: 'عدم التزام أصحاب المصلحة الرئيسيين بالجدول الزمني',
      lessonLearned: 'تطوير خطة تواصل محكمة',
      problem: 'عدم التزام بالجدول الزمني المتفق عليه',
      recommendation: 'تطوير خطة تواصل محكمة بقيادة قادة البرنامج',
      projectName: 'مبادرة تطوير المكاتب التنفيذية في وزارة الحرس الوطني',
      phase: 'التنفيذ',
      status: 'نشط'
    },
    {
      id: 37,
      title: 'الالتزام بنموذج حوكمة مبادرة المكاتب التنفيذية',
      category: 'الحوكمة',
      description: 'عدم الالتزام بنموذج الحوكمة المعتمد',
      lessonLearned: 'تطوير نموذج حوكمة يتناسب مع طبيعة الوزارة',
      problem: 'عدم الالتزام بنموذج الحوكمة المعتمد',
      recommendation: 'تطوير نموذج حوكمة يتناسب مع طبيعة الوزارة',
      projectName: 'مبادرة تطوير المكاتب التنفيذية في وزارة الحرس الوطني',
      phase: 'التنفيذ',
      status: 'نشط'
    },

    // ========== CardId17: نظام إدارة الإجراءات ==========
    {
      id: 38,
      title: 'التنسيق المبكر مع إدارة الأمن',
      category: 'البيانات',
      description: 'عدم إمكانية مشاركة البيانات مع الشركة',
      lessonLearned: 'يجب العمل مع إدارة الأمن في أوقات مبكرة',
      problem: 'عدم إمكانية مشاركة البيانات',
      recommendation: 'العمل مع إدارة الأمن في أوقات مبكرة للاتفاق على الآلية',
      projectName: 'نظام إدارة الإجراءات والسياسات',
      phase: 'تخصيص النظام ونقل البيانات',
      status: 'نشط'
    },
    {
      id: 39,
      title: 'تحديد بيئة الاستضافة المناسبة',
      category: 'البيانات',
      description: 'تجهيز بيئة الاستضافة المناسبة للنظام',
      lessonLearned: 'يجب العمل مع جميع المعنيين لتحديد البيئة',
      problem: 'عدم تجهيز بيئة الاستضافة المناسبة',
      recommendation: 'تحديد بيئة الاستضافة (سحابية أو محلية) مع جميع المعنيين',
      projectName: 'نظام إدارة الإجراءات والسياسات',
      phase: 'التنفيذ',
      status: 'نشط'
    },

    // ========== CardId18: شراكات القطاع ==========
    {
      id: 40,
      title: 'المحافظة على وتيرة اجتماعات اللجنة التوجيهية',
      category: 'الحوكمة',
      description: 'المحافظة على الاجتماعات ساهمت في النجاح',
      lessonLearned: 'المحافظة على وتيرة الاجتماعات ساهمت بشكل كبير',
      problem: 'الحاجة للاجتماعات المنتظمة',
      recommendation: 'الالتزام بعقد اجتماعات اللجنة التوجيهية بشكل منتظم',
      projectName: 'شراكات القطاع العام والخاص (اثبات مفهوم)',
      phase: 'التنفيذ',
      status: 'نشط'
    },
    {
      id: 41,
      title: 'وجود فريق متخصص في الشراكات',
      category: 'الموارد البشرية',
      description: 'وجود فريق متخصص يساهم في النجاح',
      lessonLearned: 'وجود فريق متخصص وذو خبرة في الشراكات',
      problem: 'الحاجة لفريق متخصص',
      recommendation: 'اختيار فريق عمل متخصص أثناء مرحلة التعاقد',
      projectName: 'شراكات القطاع العام والخاص (اثبات مفهوم)',
      phase: 'التجهيز',
      status: 'نشط'
    },
    {
      id: 42,
      title: 'وجود فريق يتحدث باللغة العربية',
      category: 'التواصل',
      description: 'عدم وجود فريق يتحدث العربية أدى لصعوبة الفهم',
      lessonLearned: 'أهمية وجود فريق يتحدث العربية',
      problem: 'عدم وجود فريق يتحدث باللغة العربية',
      recommendation: 'التأكد من وجود الغالبية من الفريق الاستشاري يتحدث العربية',
      projectName: 'شراكات القطاع العام والخاص (اثبات مفهوم)',
      phase: 'التنفيذ',
      status: 'نشط'
    },

    // ========== CardId19: مشروع القدرات المستقبلية ==========
    {
      id: 43,
      title: 'تقييم احتياج الموارد البشرية بشكل دقيق',
      category: 'الموارد البشرية',
      description: 'وضوح المخرجات يساعد في تقييم الموارد الصحيح',
      lessonLearned: 'وضوح المخرجات يساهم في التقييم الصحيح',
      problem: 'حجم المشروع واتساع النطاق تطلب موارد أكبر',
      recommendation: 'تقسيم الفريق إلى قسمين أو ثلاثة مع إضافة عضو معني',
      projectName: 'مشروع القدرات المستقبلية وخطة التزام الشركات المحلية- المرحلة الثالثة',
      phase: 'مارس ابريل مايو جون جولاي اغسطس سبتمبر اكتوبر',
      status: 'نشط'
    },
    {
      id: 44,
      title: 'تفرغ الموارد بشكل كامل للمشروع',
      category: 'الموارد البشرية',
      description: 'تفرغ الموارد بنسبة 100% يضمن عدم التأخير',
      lessonLearned: 'ضرورة تفرغ الأعضاء بشكل كامل',
      problem: 'عدم تفرغ الموارد بشكل كامل يؤثر على الجودة',
      recommendation: 'تفرغ الأعضاء بشكل كامل بنسبة 100% للمشاريع الضخمة',
      projectName: 'مشروع القدرات المستقبلية وخطة التزام الشركات المحلية- المرحلة الثالثة',
      phase: 'التنفيذ',
      status: 'نشط'
    },

    // ========== CardId20: توطين الذخائر المرحلة الثالثة ==========
    {
      id: 45,
      title: 'عدم تضمين أوقات الانتظار كهدف شهري',
      category: 'التخطيط',
      description: 'استغرقت أوقات الاستجابة وقت أطول من المتوقع',
      lessonLearned: 'عدم تضمين مهام الانتظار كهدف شهري',
      problem: 'استغرقت أوقات الاستجابة وقت أطول',
      recommendation: 'عدم معاملة المسار كمشروع بحد زمني محدد',
      projectName: 'مشروع توطين الذخائر - المرحلة الثالثة',
      phase: 'التنفيذ',
      status: 'نشط'
    },
    {
      id: 46,
      title: 'توحيد المنهجيات والمخرجات',
      category: 'التنظيم',
      description: 'عدم الموائمة ونقل المعرفة بين المسارات',
      lessonLearned: 'عدم الموائمة ونقل المعرفة',
      problem: 'اختلافات في شكل وطبيعة ومستوى النضج',
      recommendation: 'توحيد أعمال التوطين تحت منهجيات موحدة',
      projectName: 'مشروع توطين الذخائر - المرحلة الثالثة',
      phase: 'التنفيذ',
      status: 'نشط'
    },
    {
      id: 47,
      title: 'العمل في غرف البيانات السرية',
      category: 'البيانات',
      description: 'محدودية الموارد والمساحة والأجهزة',
      lessonLearned: 'بناءً على سرية البيانات تم العمل في غرفة البيانات',
      problem: 'محدودية المساحة والأجهزة والوصول للمعلومات',
      recommendation: 'توسيع مساحة العمل وإضافة أجهزة وإنشاء مكتبة رقمية محلية',
      projectName: 'مشروع توطين الذخائر - المرحلة الثالثة',
      phase: 'التنفيذ',
      status: 'نشط'
    },

    // ========== CardId21: تطوير الإدارة العامة ==========
    {
      id: 48,
      title: 'اختيار جهات محلية للمقارنة المعيارية',
      category: 'التخطيط',
      description: 'محدودية المعلومات في جهات المقارنة الدولية',
      lessonLearned: 'اختيار جهات محلية للمقارنة',
      problem: 'محدودية المعلومات بسبب سرية المعلومات',
      recommendation: 'اختيار جهات محلية للمقارنة المعيارية',
      projectName: 'تطوير الإدارة العامة لشؤون الضباط',
      phase: 'المقارنة المعيارية',
      status: 'نشط'
    },
    {
      id: 49,
      title: 'البدء بتفصيل النموذج التشغيلي',
      category: 'التخطيط',
      description: 'غير مكتملة التفاصيل في مرحلة الموائمة',
      lessonLearned: 'البدء بتفصيل النموذج التشغيلي المستقبلي',
      problem: 'غير مكتملة التفاصيل',
      recommendation: 'البدء بتفصيل النموذج والاستفادة من تفصيل المشاريع السابقة',
      projectName: 'تطوير الإدارة العامة لشؤون الضباط',
      phase: 'تصميم النموذج التشغيلي',
      status: 'نشط'
    },
    {
      id: 50,
      title: 'توافق الأوصاف الوظيفية مع المصطلحات العسكرية',
      category: 'التنظيم',
      description: 'الأوصاف الوظيفية لا تتوائم مع المصطلحات العسكرية',
      lessonLearned: 'توافق الأوصاف مع المصطلحات العسكرية',
      problem: 'عدم توافق الأوصاف مع المصطلحات العسكرية',
      recommendation: 'الاستفادة من تعديل الأوصاف الوظيفية مع مركز بناء القدرات',
      projectName: 'تطوير الإدارة العامة لشؤون الضباط',
      phase: 'تصميم النموذج التشغيلي',
      status: 'نشط'
    }
  ];

  // التصنيفات
  const categories = ['All', ...new Set(lessonsDatabase.map(lesson => lesson.category))];

  // البحث والتصفية
  const filteredLessons = useMemo(() => {
    return lessonsDatabase.filter(lesson => {
      const matchesSearch = 
        searchQuery === '' || 
        lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        lesson.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || lesson.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, lessonsDatabase]);

  const toggleLesson = (lesson) => {
    console.log('Selecting lesson:', lesson.title);
    const isSelected = localSelected.some(l => l.id === lesson.id);
    if (isSelected) {
      setLocalSelected(localSelected.filter(l => l.id !== lesson.id));
    } else {
      setLocalSelected([...localSelected, lesson]);
    }
  };

  const handleConfirm = () => {
    console.log('Confirming with selected:', localSelected);
    onSelect(localSelected);
    onClose();
  };

  const isLessonSelected = (lessonId) => {
    return localSelected.some(l => l.id === lessonId);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] border-t-8 border-primary-600 flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b bg-primary-50 rounded-t-xl">
          <h2 className="text-xl font-bold text-primary-900 flex items-center gap-2">
            <i className="fa-solid fa-book text-primary-600"></i>
            مكتبة الدروس المستفادة
          </h2>
          <button 
            type="button"
            onClick={onClose} 
            className="text-gray-400 hover:text-red-600 transition text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Search and Filter */}
        <div className="p-4 bg-gray-50 border-b space-y-3">
          <div className="relative">
            <input
              type="text"
              placeholder="بحث عن دروس..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition ${
                  selectedCategory === cat
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {cat === 'All' ? 'الكل' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Lessons List */}
        <div className="overflow-y-auto p-4 flex-1">
          {loading ? (
            <div className="text-center py-10">
              <i className="fa-solid fa-spinner fa-spin text-4xl text-primary-600 mb-3"></i>
              <p className="text-gray-600">جاري تحميل الدروس المستفادة...</p>
            </div>
          ) : error ? (
            <div className="text-center py-10 text-red-600">
              <i className="fa-solid fa-exclamation-circle text-4xl mb-3"></i>
              <p>{error}</p>
              <p className="text-sm text-gray-500 mt-2">سيتم استخدام البيانات الافتراضية</p>
            </div>
          ) : filteredLessons.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <p>لم يتم العثور على دروس مطابقة</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredLessons.map(lesson => {
                const selected = isLessonSelected(lesson.id);
                return (
                  <div
                    key={lesson.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition ${
                      selected
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 bg-white hover:border-primary-300'
                    }`}
                  >
                    <div
                      onClick={() => toggleLesson(lesson)}
                      className="flex items-start gap-3"
                    >
                      <div
                        className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                          selected
                            ? 'border-primary-600 bg-primary-600'
                            : 'border-gray-300 bg-white'
                        }`}
                      >
                        {selected && (
                          <span className="text-white text-sm font-bold">✓</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-primary-900 mb-1">{lesson.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {lesson.description}
                        </p>
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">
                            {lesson.category}
                          </span>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded flex items-center gap-1">
                            <i className="text-blue-600">📌</i>
                            {lesson.projectName}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50 flex justify-between items-center rounded-b-2xl">
          <div className="text-sm text-gray-600">
            تم تحديد: <span className="font-bold text-primary-600">{localSelected.length}</span>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg text-gray-600 hover:bg-gray-200 font-bold transition"
            >
              إلغاء
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={localSelected.length === 0}
              className="px-6 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 text-white rounded-lg font-bold transition"
            >
              اعتماد
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonsLibrary;
