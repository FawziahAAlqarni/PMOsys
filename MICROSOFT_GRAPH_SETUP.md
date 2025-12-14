# إعداد Microsoft Graph API للبحث عن المستخدمين

## نظرة عامة
تم إضافة ميزة البحث عن المستخدمين من Azure Active Directory في حقول المديرين عند تسجيل مشروع جديد.

## المتطلبات

### 1. تسجيل التطبيق في Azure Portal
1. سجل الدخول إلى [Azure Portal](https://portal.azure.com)
2. انتقل إلى **Azure Active Directory** > **App registrations**
3. انقر على **New registration**
4. قم بتسجيل التطبيق وحفظ:
   - `Application (client) ID` → `AZURE_AD_CLIENT_ID`
   - `Directory (tenant) ID` → `AZURE_AD_TENANT_ID`

### 2. إنشاء Client Secret
1. في تطبيقك، انتقل إلى **Certificates & secrets**
2. انقر على **New client secret**
3. احفظ القيمة → `AZURE_AD_CLIENT_SECRET`

### 3. إضافة الصلاحيات المطلوبة
في **API permissions**، أضف الصلاحيات التالية من **Microsoft Graph**:

#### Delegated permissions:
- `User.Read` - للحصول على بيانات المستخدم الحالي
- `User.ReadBasic.All` - للبحث عن جميع المستخدمين في المؤسسة

### 4. تكوين Redirect URIs
في **Authentication**:
- أضف redirect URI: `http://localhost:3000/api/auth/callback/azure-ad`
- للإنتاج: `https://your-domain.com/api/auth/callback/azure-ad`

### 5. متغيرات البيئة (.env.local)
```env
# Azure AD Configuration
AZURE_AD_CLIENT_ID=your-client-id-here
AZURE_AD_CLIENT_SECRET=your-client-secret-here
AZURE_AD_TENANT_ID=your-tenant-id-here

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-here
```

## كيفية الاستخدام

### في NewProjectModal
عند تسجيل مشروع جديد، تظهر حقول البحث التالية:
- **مدير المشروع**
- **مالك المشروع**
- **مدير البرنامج**
- **مدير المحفظة**

### طريقة البحث
1. ابدأ بالكتابة في حقل البحث (حرفان على الأقل)
2. سيظهر قائمة منسدلة بنتائج البحث من Azure AD
3. اختر المستخدم المطلوب من القائمة
4. سيتم تعبئة الاسم والبريد الإلكتروني تلقائياً

### ملاحظات
- إذا لم يكن المستخدم مسجل الدخول، يمكن الكتابة يدوياً
- البحث يعمل على الاسم والبريد الإلكتروني
- يتم حفظ البريد الإلكتروني للمستخدم مع بيانات المشروع

## الملفات المضافة/المعدلة

### ملفات جديدة:
- `fe/src/components/UserSearchDropdown.tsx` - مكون React للبحث (TypeScript)
- `fe/src/app/fouzyah-option/src/components/UserSearchDropdown.jsx` - مكون React للبحث (JavaScript)
- `fe/src/app/fouzyah-option/src/hooks/useAccessToken.js` - Hook للحصول على access token
- `fe/src/app/api/auth/token/route.ts` - API endpoint للحصول على token

### ملفات معدلة:
- `fe/src/lib/auth.ts` - إضافة صلاحيات Microsoft Graph
- `fe/src/app/fouzyah-option/src/components/Modals/NewProjectModal.jsx` - استخدام مكون البحث
- `fe/src/app/fouzyah-option/src/components/Dashboard/Dashboard.jsx` - تمرير access token
- `fe/src/app/fouzyah-option/src/components/Dashboard/ProjectList.jsx` - تمرير access token

## استكشاف الأخطاء

### خطأ: "يجب تسجيل الدخول أولاً"
- تأكد من تسجيل الدخول باستخدام حساب Microsoft

### خطأ: "فشل البحث عن المستخدمين"
- تحقق من صلاحيات Microsoft Graph API
- تأكد من موافقة المسؤول (Admin Consent) على الصلاحيات

### لا تظهر نتائج البحث
- تأكد من كتابة حرفين على الأقل
- تحقق من صلاحية access token في console

## الأمان
- يتم استخدام JWT tokens لحماية API calls
- Access tokens صالحة لجلسة المستخدم فقط
- لا يتم تخزين passwords أو tokens في قاعدة البيانات
