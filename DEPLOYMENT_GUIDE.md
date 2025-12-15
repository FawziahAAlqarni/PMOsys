# 🚀 دليل نشر النظام على رابط تجريبي

## ✅ **الطريقة الموصى بها: Vercel + Neon (مجاني بالكامل)**

---

## 📋 **المتطلبات:**
- [x] حساب GitHub
- [x] حساب Vercel (مجاني)
- [x] حساب Neon (قاعدة بيانات مجانية)

---

## 🔄 **الخطوة 1: رفع الكود إلى GitHub**

```bash
# إذا لم يكن موجوداً بالفعل
cd C:\Projects\project-management
git init
git add .
git commit -m "Initial deployment setup"
git branch -M main
git remote add origin https://github.com/your-username/project-management.git
git push -u origin main
```

---

## 🗄️ **الخطوة 2: إنشاء قاعدة بيانات على Neon**

1. اذهبي إلى: https://neon.tech
2. سجلي دخول بحساب GitHub
3. اضغطي "Create Project"
4. انسخي **Connection String**:
   ```
   postgresql://user:password@host.neon.tech/dbname?sslmode=require
   ```

---

## 🌐 **الخطوة 3: نشر Backend على Render**

### **أ. إنشاء ملف `render.yaml`:**

```yaml
services:
  - type: web
    name: pmo-backend
    env: node
    buildCommand: npm install
    startCommand: node server-pg.js
    envVars:
      - key: DATABASE_URL
        value: YOUR_NEON_CONNECTION_STRING
      - key: PORT
        value: 3030
```

### **ب. النشر:**
1. اذهبي إلى: https://render.com
2. اربطي حساب GitHub
3. اختاري "New Web Service"
4. اختاري المشروع
5. اضبطي:
   - **Root Directory**: `be`
   - **Build Command**: `npm install`
   - **Start Command**: `node server-pg.js`
6. أضيفي المتغيرات البيئية:
   - `DATABASE_URL`: رابط Neon
7. اضغطي "Create Web Service"

**ستحصلين على رابط مثل:**
```
https://pmo-backend.onrender.com
```

---

## ⚡ **الخطوة 4: نشر Frontend على Vercel**

### **أ. تثبيت Vercel CLI:**

```powershell
npm install -g vercel
```

### **ب. تعديل ملف API URL:**

في `fe/src/app/fouzyah-option/src/context/ProjectContext.js`:

```javascript
// قبل
const API_URL = 'http://localhost:3030/project-cards';

// بعد
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://pmo-backend.onrender.com/project-cards';
```

### **ج. إنشاء ملف `.env.production`:**

```bash
# fe/.env.production
NEXT_PUBLIC_API_URL=https://pmo-backend.onrender.com/project-cards
```

### **د. النشر:**

```powershell
cd C:\Projects\project-management\fe
vercel
```

اتبعي التعليمات:
- Project Name: `pmo-system`
- Directory: `./` (اضغطي Enter)
- Override settings? `N`

**ستحصلين على رابط مثل:**
```
https://pmo-system.vercel.app
```

---

## 🔧 **الخطوة 5: تحديث Backend للسماح بالـ CORS**

في `be/server-pg.js`، تأكدي من السطر:

```javascript
res.setHeader('Access-Control-Allow-Origin', '*');
// أو حددي رابط Vercel:
res.setHeader('Access-Control-Allow-Origin', 'https://pmo-system.vercel.app');
```

---

## ✅ **الخطوة 6: اختبار النظام**

1. افتحي: `https://pmo-system.vercel.app/fouzyah-option`
2. تأكدي من:
   - ✅ تحميل الصفحة
   - ✅ جلب المشاريع من قاعدة البيانات
   - ✅ إضافة مشروع جديد
   - ✅ تعديل البيانات

---

## 🎯 **البديل السريع: كله في مكان واحد (Railway)**

### **الخطوات:**

1. اذهبي إلى: https://railway.app
2. سجلي دخول بـ GitHub
3. اضغطي "New Project"
4. اختاري "Deploy from GitHub repo"
5. اختاري المشروع
6. أضيفي خدمتين:
   - **Frontend**: اختاري `fe` كـ Root Directory
   - **Backend**: اختاري `be` كـ Root Directory
   - **Database**: PostgreSQL
7. اربطي البيئات

**ستحصلين على رابط واحد يعمل بالكامل!**

---

## 📊 **مقارنة الخيارات:**

| الخيار | التكلفة | السهولة | السرعة | قاعدة البيانات |
|--------|---------|---------|---------|----------------|
| **Vercel + Neon** | مجاني | ⭐⭐⭐⭐ | سريع جداً | Neon (مجاني) |
| **Railway** | $5/شهر مجاناً | ⭐⭐⭐⭐⭐ | سريع | مدمج |
| **Render** | مجاني | ⭐⭐⭐ | متوسط | مدمج |
| **Netlify + Backend** | مجاني | ⭐⭐ | سريع | خارجي |

---

## 🔐 **ملاحظات الأمان:**

1. **لا تنشري كلمات المرور** في GitHub
2. استخدمي **Environment Variables** للبيانات الحساسة
3. أضيفي `.env` إلى `.gitignore`
4. استخدمي **HTTPS** فقط في الإنتاج

---

## 🆘 **في حالة المشاكل:**

### **مشكلة: CORS Error**
```javascript
// في server-pg.js
res.setHeader('Access-Control-Allow-Origin', 'https://your-vercel-app.vercel.app');
```

### **مشكلة: Database Connection**
تأكدي من:
- ✅ Connection String صحيح
- ✅ يحتوي على `?sslmode=require`
- ✅ المتغير البيئي `DATABASE_URL` مضبوط

### **مشكلة: API لا يستجيب**
تحققي من:
- ✅ Backend يعمل على Render
- ✅ الرابط صحيح في Frontend
- ✅ Environment Variables مضبوطة

---

## 📞 **الدعم:**

- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs
- **Neon Docs**: https://neon.tech/docs
- **Railway Docs**: https://docs.railway.app

---

## 🎉 **بعد النشر:**

ستحصلين على:
- ✅ رابط عام يعمل: `https://pmo-system.vercel.app`
- ✅ قاعدة بيانات مستقلة
- ✅ تحديثات تلقائية عند Push إلى GitHub
- ✅ مجاني بالكامل!

**جربي النظام ثم شاركي الرابط مع الفريق! 🚀**
