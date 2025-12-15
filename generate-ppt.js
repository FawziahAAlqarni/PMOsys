const PptxGenJS = require("pptxgenjs");

// إنشاء عرض تقديمي جديد
let pptx = new PptxGenJS();

// إعدادات العرض
pptx.layout = "LAYOUT_16x9";
pptx.rtlMode = true; // دعم اللغة العربية

// الألوان
const colors = {
  primary: "1B4F72",
  secondary: "D4AF37",
  green: "27AE60",
  blue: "3498DB",
  red: "E74C3C",
  gold: "F39C12",
  gray: "7F8C8D"
};

// ===== الشريحة 1: الغلاف =====
let slide1 = pptx.addSlide();
slide1.background = { color: colors.primary };
slide1.addText("دليل المستخدم", {
  x: 0.5,
  y: 2.0,
  w: 9,
  h: 1.5,
  fontSize: 54,
  bold: true,
  color: "FFFFFF",
  align: "center"
});
slide1.addText("نظام إدارة مشاريع التحول\nبرنامج تطوير وزارة الحرس الوطني", {
  x: 1,
  y: 3.5,
  w: 8,
  h: 1.5,
  fontSize: 28,
  color: colors.secondary,
  align: "center"
});
slide1.addText("ديسمبر 2025 | الإصدار 1.0", {
  x: 1,
  y: 5.5,
  w: 8,
  h: 0.5,
  fontSize: 18,
  color: "FFFFFF",
  align: "center"
});

// ===== الشريحة 2: جدول المحتويات =====
let slide2 = pptx.addSlide();
slide2.addText("📑 جدول المحتويات", {
  x: 0.5,
  y: 0.3,
  w: 9,
  h: 0.7,
  fontSize: 36,
  bold: true,
  color: colors.primary
});
slide2.addText([
  { text: "1. نظرة عامة\n", options: { fontSize: 18, color: colors.primary } },
  { text: "2. تسجيل الدخول\n", options: { fontSize: 18, color: colors.primary } },
  { text: "3. لوحة التحكم الرئيسية\n", options: { fontSize: 18, color: colors.primary } },
  { text: "4. تسجيل مشروع جديد\n", options: { fontSize: 18, color: colors.primary } },
  { text: "5. البوابات الأربع\n", options: { fontSize: 18, color: colors.primary } },
  { text: "6. مسار الموافقات\n", options: { fontSize: 18, color: colors.primary } },
  { text: "7. مكتبة الدروس المستفادة\n", options: { fontSize: 18, color: colors.primary } },
  { text: "8. إدارة المخاطر\n", options: { fontSize: 18, color: colors.primary } },
  { text: "9. الأدوار والصلاحيات\n", options: { fontSize: 18, color: colors.primary } },
  { text: "10. الأسئلة الشائعة", options: { fontSize: 18, color: colors.primary } }
], {
  x: 1.5,
  y: 1.2,
  w: 7,
  h: 4.5
});

// ===== الشريحة 3: نظرة عامة =====
let slide3 = pptx.addSlide();
slide3.addText("🎯 نظرة عامة", {
  x: 0.5,
  y: 0.3,
  w: 9,
  h: 0.7,
  fontSize: 36,
  bold: true,
  color: colors.primary
});
slide3.addText("ما هو النظام؟", {
  x: 0.8,
  y: 1.2,
  w: 8.4,
  h: 0.5,
  fontSize: 24,
  bold: true,
  color: colors.blue
});
slide3.addText("منصة إلكترونية متكاملة لإدارة دورة حياة المشاريع في برنامج تطوير وزارة الحرس الوطني", {
  x: 0.8,
  y: 1.8,
  w: 8.4,
  h: 0.6,
  fontSize: 18,
  color: colors.gray
});
slide3.addText("الأهداف الرئيسية:", {
  x: 0.8,
  y: 2.6,
  w: 8.4,
  h: 0.5,
  fontSize: 22,
  bold: true,
  color: colors.green
});
slide3.addText([
  { text: "✅ تسجيل وتتبع المشاريع عبر البوابات الأربع\n", options: { fontSize: 16 } },
  { text: "✅ إدارة مسار الموافقات الإلكتروني\n", options: { fontSize: 16 } },
  { text: "✅ تسجيل وإدارة المخاطر\n", options: { fontSize: 16 } },
  { text: "✅ الاستفادة من الدروس المستفادة\n", options: { fontSize: 16 } },
  { text: "✅ تحليل وتقارير أداء المشاريع", options: { fontSize: 16 } }
], {
  x: 1.2,
  y: 3.2,
  w: 7.6,
  h: 2
});

// ===== الشريحة 4: تسجيل الدخول =====
let slide4 = pptx.addSlide();
slide4.addText("🔐 تسجيل الدخول", {
  x: 0.5,
  y: 0.3,
  w: 9,
  h: 0.7,
  fontSize: 36,
  bold: true,
  color: colors.primary
});
slide4.addText("خطوات الدخول:", {
  x: 0.8,
  y: 1.2,
  w: 8.4,
  h: 0.4,
  fontSize: 20,
  bold: true,
  color: colors.blue
});
slide4.addText("1. افتح المتصفح وانتقل إلى النظام\n2. أدخل بريدك الإلكتروني الرسمي (@mngdp.com)\n3. اضغط 'تأكيد'", {
  x: 1.2,
  y: 1.7,
  w: 7.6,
  h: 1.2,
  fontSize: 16
});
slide4.addText("البريد الإلكتروني والصلاحيات:", {
  x: 0.8,
  y: 3.1,
  w: 8.4,
  h: 0.4,
  fontSize: 20,
  bold: true,
  color: colors.blue
});
slide4.addText([
  { text: "• admin@mngdp.com → صلاحيات كاملة (إدارة النظام)\n", options: { fontSize: 14 } },
  { text: "• planning@mngdp.com → إدارة التخطيط\n", options: { fontSize: 14 } },
  { text: "• risk@mngdp.com → إدارة الحوكمة والمخاطر\n", options: { fontSize: 14 } },
  { text: "• pmo@mngdp.com → مدير المحفظة\n", options: { fontSize: 14 } },
  { text: "• أي بريد آخر → مدير مشروع / مستخدم عادي", options: { fontSize: 14 } }
], {
  x: 1.2,
  y: 3.6,
  w: 7.6,
  h: 1.8
});

// ===== الشريحة 5: لوحة التحكم =====
let slide5 = pptx.addSlide();
slide5.addText("📊 لوحة التحكم الرئيسية", {
  x: 0.5,
  y: 0.3,
  w: 9,
  h: 0.7,
  fontSize: 36,
  bold: true,
  color: colors.primary
});
slide5.addText("الإحصائيات العلوية:", {
  x: 0.8,
  y: 1.2,
  w: 4,
  h: 0.4,
  fontSize: 20,
  bold: true,
  color: colors.blue
});
slide5.addText("📁 إجمالي المشاريع\n✅ البوابة الأولى\n⏳ قيد التنفيذ\n🎯 مكتملة\n⚠️ معلقة", {
  x: 1,
  y: 1.7,
  w: 3.5,
  h: 2,
  fontSize: 14
});
slide5.addText("بطاقات المشاريع تعرض:", {
  x: 5,
  y: 1.2,
  w: 4.5,
  h: 0.4,
  fontSize: 20,
  bold: true,
  color: colors.green
});
slide5.addText("• اسم المشروع والبرنامج\n• مدير المشروع\n• الميزانية المقدرة\n• المحفظة وتواريخ البداية/النهاية\n• عدد المخاطر ومرحلة الموافقة", {
  x: 5.2,
  y: 1.7,
  w: 4.3,
  h: 2,
  fontSize: 14
});

// ===== الشريحة 6: تسجيل مشروع جديد =====
let slide6 = pptx.addSlide();
slide6.addText("➕ تسجيل مشروع جديد", {
  x: 0.5,
  y: 0.3,
  w: 9,
  h: 0.7,
  fontSize: 36,
  bold: true,
  color: colors.primary
});
slide6.addText("الحقول الإلزامية:", {
  x: 0.8,
  y: 1.2,
  w: 8.4,
  h: 0.4,
  fontSize: 22,
  bold: true,
  color: colors.red
});
slide6.addText([
  { text: "✅ اسم المشروع*\n", options: { fontSize: 15 } },
  { text: "✅ اسم البرنامج* (بحث من 56 برنامج)\n", options: { fontSize: 15 } },
  { text: "✅ الميزانية المقدرة*\n", options: { fontSize: 15 } },
  { text: "✅ المحفظة*\n", options: { fontSize: 15 } },
  { text: "✅ تاريخ البداية والنهاية*\n", options: { fontSize: 15 } },
  { text: "✅ مدير المشروع ومدير البرنامج*\n", options: { fontSize: 15 } },
  { text: "✅ تسجيل خطر واحد على الأقل*", options: { fontSize: 15, color: colors.red, bold: true } }
], {
  x: 1,
  y: 1.7,
  w: 8,
  h: 2.5
});
slide6.addText("خطوات إضافية: اختيار الدروس المستفادة، إضافة الهيكل الإداري", {
  x: 1,
  y: 4.5,
  w: 8,
  h: 0.8,
  fontSize: 14,
  color: colors.gray,
  italic: true
});

// ===== الشريحة 7: البوابات الأربع =====
let slide7 = pptx.addSlide();
slide7.addText("🚪 البوابات الأربع", {
  x: 0.5,
  y: 0.3,
  w: 9,
  h: 0.7,
  fontSize: 36,
  bold: true,
  color: colors.primary
});
slide7.addShape(pptx.ShapeType.rect, {
  x: 0.8,
  y: 1.3,
  w: 4,
  h: 1.2,
  fill: { color: "27AE60" },
  line: { width: 0 }
});
slide7.addText("🟢 البوابة 1: التأسيس", {
  x: 0.9,
  y: 1.4,
  w: 3.8,
  h: 0.4,
  fontSize: 18,
  bold: true,
  color: "FFFFFF"
});
slide7.addText("مسار الموافقات (4 مراحل)", {
  x: 0.9,
  y: 1.9,
  w: 3.8,
  h: 0.4,
  fontSize: 14,
  color: "FFFFFF"
});

slide7.addShape(pptx.ShapeType.rect, {
  x: 5.2,
  y: 1.3,
  w: 4,
  h: 1.2,
  fill: { color: "F39C12" },
  line: { width: 0 }
});
slide7.addText("🟡 البوابة 2: التخطيط التفصيلي", {
  x: 5.3,
  y: 1.4,
  w: 3.8,
  h: 0.4,
  fontSize: 18,
  bold: true,
  color: "FFFFFF"
});
slide7.addText("النطاق وخيارات التنفيذ", {
  x: 5.3,
  y: 1.9,
  w: 3.8,
  h: 0.4,
  fontSize: 14,
  color: "FFFFFF"
});

slide7.addShape(pptx.ShapeType.rect, {
  x: 0.8,
  y: 2.8,
  w: 4,
  h: 1.2,
  fill: { color: "3498DB" },
  line: { width: 0 }
});
slide7.addText("🔵 البوابة 3: التنفيذ", {
  x: 0.9,
  y: 2.9,
  w: 3.8,
  h: 0.4,
  fontSize: 18,
  bold: true,
  color: "FFFFFF"
});
slide7.addText("الجدول الزمني وميثاق المشروع", {
  x: 0.9,
  y: 3.4,
  w: 3.8,
  h: 0.4,
  fontSize: 14,
  color: "FFFFFF"
});

slide7.addShape(pptx.ShapeType.rect, {
  x: 5.2,
  y: 2.8,
  w: 4,
  h: 1.2,
  fill: { color: "9B59B6" },
  line: { width: 0 }
});
slide7.addText("🟣 البوابة 4: الإغلاق", {
  x: 5.3,
  y: 2.9,
  w: 3.8,
  h: 0.4,
  fontSize: 18,
  bold: true,
  color: "FFFFFF"
});
slide7.addText("الدروس المستفادة وخطة التفعيل", {
  x: 5.3,
  y: 3.4,
  w: 3.8,
  h: 0.4,
  fontSize: 14,
  color: "FFFFFF"
});

// ===== الشريحة 8: مسار الموافقات =====
let slide8 = pptx.addSlide();
slide8.addText("✅ مسار الموافقات", {
  x: 0.5,
  y: 0.3,
  w: 9,
  h: 0.7,
  fontSize: 36,
  bold: true,
  color: colors.primary
});
slide8.addText("الترتيب:", {
  x: 0.8,
  y: 1.2,
  w: 8.4,
  h: 0.4,
  fontSize: 22,
  bold: true,
  color: colors.blue
});
slide8.addText([
  { text: "1️⃣ مدير البرنامج ", options: { fontSize: 16, bold: true } },
  { text: "(أول موافق)\n", options: { fontSize: 14 } },
  { text: "2️⃣ إدارة التخطيط ", options: { fontSize: 16, bold: true } },
  { text: "(planning@mngdp.com)\n", options: { fontSize: 14 } },
  { text: "3️⃣ إدارة الحوكمة/المخاطر ", options: { fontSize: 16, bold: true } },
  { text: "(risk@mngdp.com)\n", options: { fontSize: 14 } },
  { text: "4️⃣ مدير المحفظة ", options: { fontSize: 16, bold: true } },
  { text: "(الموافقة النهائية)", options: { fontSize: 14 } }
], {
  x: 1,
  y: 1.7,
  w: 8,
  h: 2
});
slide8.addText("لكل موافق:", {
  x: 0.8,
  y: 3.9,
  w: 8.4,
  h: 0.3,
  fontSize: 18,
  bold: true,
  color: colors.green
});
slide8.addText("✅ الموافقة → ينتقل للموافق التالي\n❌ الرفض → يعود للمدير مع سبب الرفض", {
  x: 1,
  y: 4.3,
  w: 8,
  h: 0.8,
  fontSize: 15
});

// ===== الشريحة 9: مكتبة الدروس =====
let slide9 = pptx.addSlide();
slide9.addText("📚 مكتبة الدروس المستفادة", {
  x: 0.5,
  y: 0.3,
  w: 9,
  h: 0.7,
  fontSize: 36,
  bold: true,
  color: colors.primary
});
slide9.addText("الفئات (8):", {
  x: 0.8,
  y: 1.2,
  w: 8.4,
  h: 0.4,
  fontSize: 22,
  bold: true,
  color: colors.blue
});
slide9.addText([
  { text: "🎯 استراتيجية  ", options: { fontSize: 15, color: "3498DB" } },
  { text: "💰 مالية  ", options: { fontSize: 15, color: "27AE60" } },
  { text: "⚙️ تشغيلية  ", options: { fontSize: 15, color: "E67E22" } },
  { text: "🎓 قدرات\n", options: { fontSize: 15, color: "9B59B6" } },
  { text: "📋 التزام  ", options: { fontSize: 15, color: "E74C3C" } },
  { text: "💻 تقنية وبيانات  ", options: { fontSize: 15, color: "5DADE2" } },
  { text: "🌟 سمعة  ", options: { fontSize: 15, color: "F39C12" } },
  { text: "👥 أشخاص", options: { fontSize: 15, color: "EC7063" } }
], {
  x: 1,
  y: 1.7,
  w: 8,
  h: 1
});
slide9.addText("كل درس يحتوي على:", {
  x: 0.8,
  y: 2.9,
  w: 8.4,
  h: 0.4,
  fontSize: 20,
  bold: true,
  color: colors.green
});
slide9.addText("• العنوان والفئة والوصف\n• الدرس المستفاد\n• المشكلة والتوصية\n• المشروع المصدر والمرحلة", {
  x: 1,
  y: 3.4,
  w: 8,
  h: 1.3,
  fontSize: 15
});

// ===== الشريحة 10: إدارة المخاطر =====
let slide10 = pptx.addSlide();
slide10.addText("⚠️ إدارة المخاطر", {
  x: 0.5,
  y: 0.3,
  w: 9,
  h: 0.7,
  fontSize: 36,
  bold: true,
  color: colors.primary
});
slide10.addText("تسجيل خطر جديد:", {
  x: 0.8,
  y: 1.2,
  w: 4,
  h: 0.4,
  fontSize: 20,
  bold: true,
  color: colors.red
});
slide10.addText("• عنوان الخطر ونوعه (تهديد/فرصة)\n• الاحتمالية (1-5) والتأثير (1-5)\n• نطاق التأثير (8 فئات)\n• نوع الاستجابة:\n  تخفيف | تجنب | نقل | قبول\n• خطة التخفيف والحالة", {
  x: 1,
  y: 1.7,
  w: 3.8,
  h: 2.5,
  fontSize: 13
});
slide10.addText("نطاق التأثير:", {
  x: 5.2,
  y: 1.2,
  w: 4.3,
  h: 0.4,
  fontSize: 20,
  bold: true,
  color: colors.blue
});
slide10.addText("استراتيجية | مالية\nتشغيلية | قدرات\nالتزام | تقنية وبيانات\nسمعة | أشخاص", {
  x: 5.4,
  y: 1.7,
  w: 4,
  h: 1.5,
  fontSize: 14
});

// ===== الشريحة 11: الأدوار =====
let slide11 = pptx.addSlide();
slide11.addText("👥 الأدوار والصلاحيات", {
  x: 0.5,
  y: 0.3,
  w: 9,
  h: 0.7,
  fontSize: 36,
  bold: true,
  color: colors.primary
});
slide11.addText([
  { text: "الأدمن: ", options: { fontSize: 16, bold: true, color: colors.red } },
  { text: "صلاحيات كاملة لجميع المشاريع\n\n", options: { fontSize: 14 } },
  { text: "إدارة التخطيط: ", options: { fontSize: 16, bold: true, color: colors.blue } },
  { text: "موافقة المرحلة الثانية\n\n", options: { fontSize: 14 } },
  { text: "إدارة الحوكمة/المخاطر: ", options: { fontSize: 16, bold: true, color: colors.green } },
  { text: "موافقة المرحلة الثالثة\n\n", options: { fontSize: 14 } },
  { text: "مدير المحفظة: ", options: { fontSize: 16, bold: true, color: colors.gold } },
  { text: "الموافقة النهائية\n\n", options: { fontSize: 14 } },
  { text: "مدير البرنامج: ", options: { fontSize: 16, bold: true, color: "9B59B6" } },
  { text: "الموافقة المبدئية\n\n", options: { fontSize: 14 } },
  { text: "مدير المشروع: ", options: { fontSize: 16, bold: true, color: colors.gray } },
  { text: "إدارة مشاريعه فقط", options: { fontSize: 14 } }
], {
  x: 1,
  y: 1.2,
  w: 8,
  h: 4
});

// ===== الشريحة 12: نصائح =====
let slide12 = pptx.addSlide();
slide12.addText("🎓 نصائح للاستخدام الفعال", {
  x: 0.5,
  y: 0.3,
  w: 9,
  h: 0.7,
  fontSize: 36,
  bold: true,
  color: colors.primary
});
slide12.addText("التخطيط:", {
  x: 0.8,
  y: 1.2,
  w: 8.4,
  h: 0.3,
  fontSize: 20,
  bold: true,
  color: colors.blue
});
slide12.addText("• خذ وقتك في ملء البيانات\n• استفد من مكتبة الدروس\n• سجّل جميع المخاطر المحتملة", {
  x: 1,
  y: 1.6,
  w: 8,
  h: 1,
  fontSize: 15
});
slide12.addText("التتبع:", {
  x: 0.8,
  y: 2.8,
  w: 8.4,
  h: 0.3,
  fontSize: 20,
  bold: true,
  color: colors.green
});
slide12.addText("• راجع مشاريعك بانتظام\n• حدّث الجدول الزمني\n• تابع المخاطر الجديدة", {
  x: 1,
  y: 3.2,
  w: 8,
  h: 1,
  fontSize: 15
});
slide12.addText("التوثيق:", {
  x: 0.8,
  y: 4.4,
  w: 8.4,
  h: 0.3,
  fontSize: 20,
  bold: true,
  color: colors.gold
});
slide12.addText("• وثّق جميع القرارات المهمة\n• سجّل الدروس أولاً بأول", {
  x: 1,
  y: 4.8,
  w: 8,
  h: 0.7,
  fontSize: 15
});

// ===== الشريحة 13: الدعم =====
let slide13 = pptx.addSlide();
slide13.addText("📞 الدعم والتواصل", {
  x: 0.5,
  y: 0.3,
  w: 9,
  h: 0.7,
  fontSize: 36,
  bold: true,
  color: colors.primary
});
slide13.addText("للمساعدة:", {
  x: 0.8,
  y: 1.3,
  w: 8.4,
  h: 0.4,
  fontSize: 22,
  bold: true,
  color: colors.blue
});
slide13.addText("📧 البريد الإلكتروني: falqarni@mngdp.com\n📱 صفحة 'تواصل معنا' في النظام", {
  x: 1,
  y: 1.8,
  w: 8,
  h: 0.8,
  fontSize: 16
});
slide13.addText("ساعات الدعم:", {
  x: 0.8,
  y: 2.8,
  w: 8.4,
  h: 0.4,
  fontSize: 22,
  bold: true,
  color: colors.green
});
slide13.addText("الأحد - الخميس: 8:00 ص - 4:00 م", {
  x: 1,
  y: 3.3,
  w: 8,
  h: 0.5,
  fontSize: 16
});
slide13.addText("الأمان:", {
  x: 0.8,
  y: 4.0,
  w: 8.4,
  h: 0.4,
  fontSize: 22,
  bold: true,
  color: colors.red
});
slide13.addText("🔒 البيانات مشفرة\n🔐 الوصول محمي بالبريد الإلكتروني\n📝 تسجيل جميع العمليات", {
  x: 1,
  y: 4.5,
  w: 8,
  h: 1,
  fontSize: 15
});

// ===== الشريحة 14: الختام =====
let slide14 = pptx.addSlide();
slide14.background = { color: colors.primary };
slide14.addText("✅ خلاصة", {
  x: 0.5,
  y: 1.5,
  w: 9,
  h: 0.8,
  fontSize: 44,
  bold: true,
  color: "FFFFFF",
  align: "center"
});
slide14.addText("نظام إدارة مشاريع التحول هو أداة شاملة\nلإدارة دورة حياة المشاريع بكفاءة وشفافية", {
  x: 1,
  y: 2.5,
  w: 8,
  h: 1,
  fontSize: 20,
  color: "FFFFFF",
  align: "center"
});
slide14.addText("في حال واجهت أي مشكلة،\nلا تتردد في التواصل مع فريق الدعم", {
  x: 1,
  y: 3.7,
  w: 8,
  h: 0.8,
  fontSize: 18,
  color: colors.secondary,
  align: "center"
});
slide14.addText("🛡️ برنامج تطوير وزارة الحرس الوطني", {
  x: 1,
  y: 4.8,
  w: 8,
  h: 0.5,
  fontSize: 20,
  bold: true,
  color: colors.secondary,
  align: "center"
});
slide14.addText("آخر تحديث: ديسمبر 2025 | الإصدار: 1.0", {
  x: 1,
  y: 5.5,
  w: 8,
  h: 0.4,
  fontSize: 14,
  color: "FFFFFF",
  align: "center"
});

// حفظ الملف
pptx.writeFile({ fileName: "USER_GUIDE.pptx" })
  .then(() => {
    console.log("✅ تم إنشاء ملف PowerPoint بنجاح: USER_GUIDE.pptx");
  })
  .catch((err) => {
    console.error("❌ خطأ في إنشاء الملف:", err);
  });
