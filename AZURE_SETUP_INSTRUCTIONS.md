# 🔧 تعليمات إعداد Azure AD للأدمن

## 📋 الخطوات المطلوبة من مسؤول Azure

---

## 1️⃣ إنشاء App Registration

### الخطوات:

1. **الدخول إلى Azure Portal**
   - انتقل إلى: https://portal.azure.com
   - سجل الدخول بحساب الأدمن

2. **إنشاء التطبيق**
   - من القائمة الجانبية، اختر **Azure Active Directory** (أو **Microsoft Entra ID**)
   - اضغط على **App registrations**
   - اضغط **+ New registration**

3. **ملء بيانات التطبيق**
   ```
   Name: PMO Project Management System
   Supported account types: Accounts in this organizational directory only (Single tenant)
   Redirect URI: Web → http://localhost:3000/api/auth/callback/azure-ad
   ```

4. **احفظ المعلومات التالية** (ستحتاجها لاحقاً):
   - ✅ **Application (client) ID**
   - ✅ **Directory (tenant) ID**

---

## 2️⃣ إنشاء Client Secret

### الخطوات:

1. من صفحة التطبيق، اذهب إلى **Certificates & secrets**
2. اضغط **+ New client secret**
3. املأ البيانات:
   ```
   Description: PMO System Secret
   Expires: 24 months (أو حسب سياسة المؤسسة)
   ```
4. اضغط **Add**
5. **⚠️ مهم جداً**: انسخ **Value** فوراً (لن يظهر مرة أخرى)
   - ✅ احفظ **Client Secret Value**

---

## 3️⃣ إضافة Redirect URIs

### الخطوات:

1. من صفحة التطبيق، اذهب إلى **Authentication**
2. في قسم **Platform configurations**، اضغط **+ Add a platform**
3. اختر **Web**
4. أضف عناوين إعادة التوجيه:

#### للتطوير (Development):
```
http://localhost:3000/api/auth/callback/azure-ad
```

#### للإنتاج (Production):
```
https://pmo.mngdp.com/api/auth/callback/azure-ad
```
*(غيّر النطاق حسب النطاق الفعلي)*

5. في **Implicit grant and hybrid flows**:
   - ✅ فعّل **ID tokens**

6. اضغط **Save**

---

## 4️⃣ إضافة API Permissions

### الخطوات:

1. من صفحة التطبيق، اذهب إلى **API permissions**
2. اضغط **+ Add a permission**
3. اختر **Microsoft Graph**
4. اختر **Delegated permissions**
5. أضف الصلاحيات التالية:

### الصلاحيات المطلوبة:

#### **أساسية (Basic):**
- ✅ `User.Read` - قراءة بيانات المستخدم
- ✅ `openid` - تسجيل الدخول
- ✅ `profile` - معلومات الملف الشخصي
- ✅ `email` - الوصول للبريد الإلكتروني
- ✅ `offline_access` - تحديث الرمز المميز

#### **للبحث عن المستخدمين:**
- ✅ `User.ReadBasic.All` - البحث في Active Directory

#### **لإرسال البريد (اختياري):**
- ✅ `Mail.Send` - إرسال بريد نيابة عن المستخدم

---

## 5️⃣ الموافقة على الصلاحيات (Grant Admin Consent)

### ⚠️ **خطوة مهمة جداً**

1. في صفحة **API permissions**
2. اضغط على **✔️ Grant admin consent for [Organization]**
3. أكد الموافقة

### لماذا مهمة؟
- بدون موافقة الأدمن، سيُطلب من كل مستخدم الموافقة الفردية
- هذا يسبب مشاكل ويُبطئ العمل

---

## 6️⃣ تكوين Token Configuration (اختياري)

### الخطوات:

1. من صفحة التطبيق، اذهب إلى **Token configuration**
2. اضغط **+ Add optional claim**
3. نوع الرمز: **ID**
4. أضف:
   - ✅ `email`
   - ✅ `family_name`
   - ✅ `given_name`

---

## 📝 ملخص البيانات المطلوبة

بعد إتمام الخطوات أعلاه، أرسل البيانات التالية للمطور:

```
1. Application (client) ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
2. Directory (tenant) ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
3. Client Secret Value: xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 🔒 إعدادات الأمان الإضافية (موصى بها)

### 1. تقييد الوصول:
في **Enterprise applications** → اختر التطبيق:
- **Properties** → فعّل **User assignment required**
- **Users and groups** → أضف المستخدمين المصرح لهم

### 2. تفعيل Conditional Access:
- حدد سياسات الوصول (مثل: من داخل الشبكة فقط)
- فعّل MFA إذا لزم الأمر

### 3. مراجعة Audit logs:
- تابع سجلات تسجيل الدخول
- راجع الصلاحيات الممنوحة

---

## ✅ التحقق من الإعداد

### بعد إتمام الخطوات:

1. **Application (client) ID**: موجود ✅
2. **Directory (tenant) ID**: موجود ✅
3. **Client Secret**: منسوخ ومحفوظ بأمان ✅
4. **Redirect URIs**: مضافة ✅
5. **API Permissions**: مضافة وموافق عليها ✅
6. **ID tokens**: مفعلة ✅

---

## 🚨 تحذيرات مهمة

### ⚠️ أمان البيانات:
- **لا تشارك** Client Secret عبر البريد غير المشفر
- استخدم **Azure Key Vault** أو أداة آمنة للمشاركة
- غيّر Secret بانتظام (كل 6-12 شهر)

### ⚠️ الصلاحيات:
- لا تضف صلاحيات أكثر من اللازم
- راجع الصلاحيات بانتظام
- الغِ الصلاحيات غير المستخدمة

### ⚠️ المراقبة:
- فعّل **Sign-in logs**
- راقب محاولات الوصول المشبوهة
- أنشئ تنبيهات للأنشطة غير العادية

---

## 📞 الدعم

في حال واجهت أي مشكلة:
- 📧 **البريد الإلكتروني**: falqarni@mngdp.com
- 📖 **وثائق Microsoft**: https://docs.microsoft.com/azure/active-directory/

---

## 🔗 روابط مفيدة

- Azure Portal: https://portal.azure.com
- Microsoft Graph Explorer: https://developer.microsoft.com/graph/graph-explorer
- Azure AD documentation: https://docs.microsoft.com/azure/active-directory/

---

*آخر تحديث: ديسمبر 2025*
