# نظام إدارة المشاريع - PostgreSQL

## ✅ النظام الآن متصل بـ PostgreSQL بشكل كامل!

### 📊 قاعدة البيانات

**الاتصال:**
- Host: `localhost`
- Port: `5432`
- Database: `project_management`
- User: `postgres`
- Password: `postgres`

**الجدول الرئيسي: `projects`**
```sql
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    estimated_budget NUMERIC,
    duration_in_weeks INTEGER,
    stage VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data JSONB  -- يحفظ كل بيانات المشروع (البوابات، المخاطر، إلخ)
)
```

### 🚀 تشغيل النظام

**1. تشغيل الخادم الخلفي (PostgreSQL):**
```powershell
cd C:\Projects\project-management\be
node server-pg.js
```
يجب أن ترى:
```
🚀 الخادم يعمل على http://localhost:3030
📊 متصل بـ PostgreSQL: project_management
✅ قاعدة البيانات جاهزة
```

**2. تشغيل الواجهة الأمامية:**
```powershell
cd C:\Projects\project-management\fe
npm run dev
```

**3. فتح التطبيق:**
- التطبيق الرئيسي: http://localhost:3000/fouzyah-option
- صفحة الاختبار: http://localhost:3000/project-cards-demo

### 💾 ما يتم حفظه في قاعدة البيانات

**البيانات الأساسية:**
- اسم المشروع
- الوصف
- الميزانية المقدرة
- المدة بالأسابيع
- المرحلة الحالية

**البيانات التفصيلية (في حقل `data` كـ JSONB):**
- ✅ بيانات البوابة 1 (الموافقات، الميثاق، المخاطر)
- ✅ بيانات البوابة 2 (النطاق، خطة المشتريات، الافتراضات، بطاقة التغيير)
- ✅ بيانات البوابة 3 (الجدول الزمني، ميثاق المشروع الكامل)
- ✅ بيانات البوابة 4 (الجدول الزمني، الدروس المستفادة، خطة التفعيل)
- ✅ المخاطر وسجل المخاطر

### 🔄 الحفظ التلقائي

النظام يحفظ البيانات **تلقائياً** في قاعدة البيانات عند:
- إضافة مشروع جديد
- تحديث أي بيانات في البوابات
- إضافة أو تعديل المخاطر
- الموافقة أو الرفض في البوابة 1
- الانتقال بين البوابات
- حفظ أي مودال (النطاق، المشتريات، إلخ)

**رسائل Console:**
```javascript
✅ تم حفظ gate2Data في قاعدة البيانات
✅ تم حفظ المخاطر في قاعدة البيانات
✅ تم حفظ حالة الموافقة في قاعدة البيانات
```

### 🧪 اختبار النظام

**اختبار API مباشرة:**
```powershell
# جلب جميع المشاريع
Invoke-RestMethod -Uri http://localhost:3030/project-cards -Method Get

# إضافة مشروع جديد
$body = @{
    name='مشروع اختبار'
    description='وصف المشروع'
    estimatedBudget=100000
    durationInWeeks=12
    stage='planning'
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:3030/project-cards -Method Post -Body $body -ContentType 'application/json'

# تحديث مشروع
$updateBody = @{
    name='مشروع محدث'
    stage='gate2'
    gate2Data=@{
        scope=@{goal='هدف المشروع'}
    }
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:3030/project-cards/1 -Method Put -Body $updateBody -ContentType 'application/json'
```

### 📈 المزايا

✅ **التخزين الدائم:** البيانات لا تضيع بعد إعادة تشغيل الخادم
✅ **الحفظ التلقائي:** كل تغيير يُحفظ فوراً في قاعدة البيانات
✅ **البيانات الكاملة:** جميع بيانات البوابات والمخاطر محفوظة
✅ **JSONB:** مرونة في حفظ البيانات المعقدة بدون تعديل هيكل الجدول
✅ **سجل الوقت:** تتبع تاريخ الإنشاء والتحديث لكل مشروع

### 🔍 استعلامات مفيدة

**عرض جميع المشاريع:**
```sql
SELECT id, name, stage, created_at FROM projects ORDER BY id DESC;
```

**عرض بيانات مشروع معين:**
```sql
SELECT data FROM projects WHERE id = 1;
```

**البحث في البيانات:**
```sql
-- البحث عن مشاريع في مرحلة معينة
SELECT * FROM projects WHERE data->>'stage' = 'gate2';

-- البحث عن مشاريع بميزانية محددة
SELECT * FROM projects WHERE (data->>'estimatedBudget')::numeric > 50000;
```

### 📝 ملاحظات

- **الملفات القديمة:** `simple-server.js` لا يُستخدم الآن، استخدم `server-pg.js` بدلاً منه
- **الترميز:** قد تظهر الأحرف العربية كرموز في PowerShell، لكنها تُحفظ بشكل صحيح
- **النسخ الاحتياطي:** يمكن عمل backup لقاعدة البيانات باستخدام:
```powershell
pg_dump -U postgres project_management > backup.sql
```

### 🎯 الخطوات التالية (اختيارية)

- [ ] إضافة Authentication (تسجيل دخول المستخدمين)
- [ ] تحسين أداء الاستعلامات بإضافة Indexes
- [ ] إضافة تصدير تقارير PDF
- [ ] إضافة إشعارات Email عند الموافقات
- [ ] ربط بنظام Single Sign-On (SSO)

---

**تم الإعداد بتاريخ:** 13 ديسمبر 2025
**الحالة:** ✅ جاهز للاستخدام
