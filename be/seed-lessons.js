const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'project_management',
  password: 'postgres',
  port: 5432,
});

const sampleLessons = [
  {
    title: 'الموائمة مع أصحاب المصلحة - مسار التوطين',
    category: 'أصحاب المصلحة',
    description: 'الموائمة مع جميع أصحاب المصلحة خصوصا في مسار التوطين من خلال اتفاقيات مستوى خدمة',
    lessonLearned: 'وضع خط الأساس لمؤشرات أداء مسار التوطين والانتهاء من نموذج التقرير الشهري لسمو الوزير',
    problem: 'عدم قدرة البرنامج للحصول على البيانات بشكل سلس',
    recommendation: 'ضمان الوصول للبيانات في الوقت المناسب والحصول على الدعم المطلوب من جميع أصحاب المصلحة',
    projectName: 'وضع خط الأساس لمؤشرات أداء مسار التوطين',
    phase: 'تقييم مؤشرات الأداء الحالية',
    status: 'نشط'
  },
  {
    title: 'قياس مستوى جاهزية الأطراف الخارجية',
    category: 'المخاطر',
    description: 'في حالة الاعتمادية على أطراف خارجية يجب قياس مستوى الجاهزية',
    lessonLearned: 'دراسة المنظومة بشكل كافي قبل بداية المشروع',
    problem: 'عدم دراسة المنظومة بشكل كافي قبل بداية المشروع',
    recommendation: 'قياس مستوى الجاهزية لدى الطرف الخارجي ومدى إمكانية الاعتماد عليه',
    projectName: 'وضع خط الأساس لمؤشرات أداء مسار التوطين',
    phase: 'التخطيط',
    status: 'نشط'
  },
  {
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
  {
    title: 'تحديد الاحتياج الفعلي من الجهة المستفيدة',
    category: 'التخطيط',
    description: 'الموائمة المبكرة مع أصحاب المصلحة في مرحلة دراسة الوضع الراهن',
    lessonLearned: 'عدم القدرة على تحديد الاحتياج الفعلي من الجهة المستفيدة',
    problem: 'عدم القدرة على تحديد الاحتياج الفعلي من الجهة المستفيدة مما أثر على تحقيق المستهدفات',
    recommendation: 'الموائمة المبكرة مع أصحاب المصلحة وتوفير الأدوات اللازمة في مرحلة مبكرة',
    projectName: 'توطين الأسلحة الخفيفة - المرحلة الثانية',
    phase: 'التنفيذ',
    status: 'نشط'
  }
];

async function seedLessons() {
  try {
    console.log('🌱 بدء إضافة البيانات التجريبية...');
    
    // حذف البيانات القديمة
    await pool.query('DELETE FROM lessons_learned');
    console.log('✓ تم حذف البيانات القديمة');
    
    // إضافة الدروس الجديدة
    for (const lesson of sampleLessons) {
      await pool.query(`
        INSERT INTO lessons_learned 
        (title, category, description, lesson_learned, problem, recommendation, project_name, phase, status)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `, [
        lesson.title,
        lesson.category,
        lesson.description,
        lesson.lessonLearned,
        lesson.problem,
        lesson.recommendation,
        lesson.projectName,
        lesson.phase,
        lesson.status
      ]);
      console.log(`✓ تم إضافة: ${lesson.title}`);
    }
    
    console.log(`\n✅ تم إضافة ${sampleLessons.length} درس مستفاد بنجاح!`);
    process.exit(0);
  } catch (error) {
    console.error('❌ خطأ:', error);
    process.exit(1);
  }
}

seedLessons();
