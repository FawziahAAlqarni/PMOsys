# 👨‍💻 دليل إعداد المطور

## بعد الحصول على بيانات Azure من الأدمن

---

## 1️⃣ إنشاء ملف البيئة

### الخطوات:

1. **انسخ ملف القالب:**
   ```bash
   cd c:\Projects\project-management\fe
   copy .env.local.example .env.local
   ```

2. **افتح `.env.local` وأدخل البيانات:**
   ```env
   # البيانات من Azure
   AZURE_AD_CLIENT_ID=paste-client-id-here
   AZURE_AD_CLIENT_SECRET=paste-secret-here
   AZURE_AD_TENANT_ID=paste-tenant-id-here

   # عنوان التطبيق
   NEXTAUTH_URL=http://localhost:3000

   # مفتاح عشوائي (ولّده بالأمر أدناه)
   NEXTAUTH_SECRET=generate-random-secret
   ```

3. **توليد NEXTAUTH_SECRET:**
   ```bash
   # PowerShell
   [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
   ```

---

## 2️⃣ تثبيت المكتبات المطلوبة

```bash
cd c:\Projects\project-management\fe
npm install next-auth @azure/msal-node
```

---

## 3️⃣ إنشاء ملفات NextAuth

### أ) إنشاء API Route للمصادقة:

**الملف:** `fe/src/app/api/auth/[...nextauth]/route.js`

```javascript
import NextAuth from "next-auth"
import AzureADProvider from "next-auth/providers/azure-ad"

const handler = NextAuth({
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
      tenantId: process.env.AZURE_AD_TENANT_ID,
      authorization: {
        params: {
          scope: "openid profile email User.Read User.ReadBasic.All offline_access"
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      // حفظ access token للاستخدام مع Graph API
      if (account) {
        token.accessToken = account.access_token
        token.idToken = account.id_token
      }
      if (profile) {
        token.email = profile.email
        token.name = profile.name
      }
      return token
    },
    async session({ session, token }) {
      // إضافة البيانات للجلسة
      session.accessToken = token.accessToken
      session.user.email = token.email
      session.user.name = token.name
      return session
    }
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
```

---

### ب) تحديث API للحصول على Token:

**الملف:** `fe/src/app/api/auth/token/route.js`

```javascript
import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server"

export async function GET(request) {
  const session = await getServerSession()
  
  if (!session || !session.accessToken) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  return NextResponse.json({
    accessToken: session.accessToken,
    user: session.user
  })
}
```

---

## 4️⃣ إنشاء مكون تسجيل الدخول

**الملف:** `fe/src/app/auth/signin/page.jsx`

```javascript
'use client'
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function SignIn() {
  const router = useRouter()

  const handleSignIn = async () => {
    const result = await signIn("azure-ad", {
      callbackUrl: "/fouzyah-option",
      redirect: false
    })
    
    if (result?.ok) {
      router.push("/fouzyah-option")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 to-primary-800">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary-900 mb-2">
            نظام إدارة مشاريع التحول
          </h1>
          <p className="text-gray-600">برنامج تطوير وزارة الحرس الوطني</p>
        </div>
        
        <button
          onClick={handleSignIn}
          className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-bold hover:bg-primary-700 transition flex items-center justify-center gap-3"
        >
          <i className="fab fa-microsoft"></i>
          تسجيل الدخول بحساب Microsoft
        </button>
        
        <p className="text-center text-xs text-gray-500 mt-6">
          استخدم حساب Microsoft الرسمي الخاص بك
        </p>
      </div>
    </div>
  )
}
```

---

## 5️⃣ حماية الصفحات (Protect Routes)

### أ) إنشاء Session Provider:

**الملف:** `fe/src/app/providers.jsx`

```javascript
'use client'
import { SessionProvider } from "next-auth/react"

export default function Providers({ children }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}
```

### ب) تحديث Layout الرئيسي:

**الملف:** `fe/src/app/layout.jsx`

```javascript
import Providers from './providers'

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
```

### ج) حماية صفحة fouzyah-option:

**الملف:** `fe/src/app/fouzyah-option/page.jsx`

```javascript
'use client'
import { useSession, signIn } from "next-auth/react"
import { useEffect } from "react"

export default function FouzyahOption() {
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn("azure-ad")
    }
  }, [status])

  if (status === "loading") {
    return <div>جاري التحميل...</div>
  }

  if (!session) {
    return null
  }

  // باقي الكود الحالي
  return (
    <div>
      {/* المحتوى الحالي */}
    </div>
  )
}
```

---

## 6️⃣ تحديث UserSearchDropdown

**استخدام Graph API للبحث:**

```javascript
const searchUsers = async (query) => {
  if (!query || query.length < 2) return

  try {
    const response = await fetch('/api/graph/search-users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    })

    const data = await response.json()
    setUsers(data.users || [])
  } catch (error) {
    console.error('Search error:', error)
  }
}
```

**إنشاء API للبحث:**

**الملف:** `fe/src/app/api/graph/search-users/route.js`

```javascript
import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server"

export async function POST(request) {
  const session = await getServerSession()
  
  if (!session?.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { query } = await request.json()

  try {
    const response = await fetch(
      `https://graph.microsoft.com/v1.0/users?$search="displayName:${query}" OR "mail:${query}"&$select=id,displayName,mail,jobTitle&$top=10`,
      {
        headers: {
          'Authorization': `Bearer ${session.accessToken}`,
          'ConsistencyLevel': 'eventual',
        },
      }
    )

    const data = await response.json()
    
    return NextResponse.json({
      users: data.value || []
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Search failed" },
      { status: 500 }
    )
  }
}
```

---

## 7️⃣ اختبار التكامل

### خطوات الاختبار:

1. **تشغيل الخوادم:**
   ```bash
   # Backend
   cd c:\Projects\project-management\be
   node server-pg.js

   # Frontend
   cd c:\Projects\project-management\fe
   npm run dev
   ```

2. **افتح المتصفح:**
   ```
   http://localhost:3000/auth/signin
   ```

3. **تسجيل الدخول:**
   - اضغط "تسجيل الدخول بحساب Microsoft"
   - ستُحوّل إلى صفحة Microsoft
   - أدخل بريدك وكلمة المرور
   - وافق على الصلاحيات (أول مرة فقط)

4. **التحقق:**
   - يجب أن تُحوّل إلى `/fouzyah-option`
   - يجب أن يظهر اسمك وبريدك
   - جرّب البحث عن مستخدمين

---

## 8️⃣ إضافة .gitignore

تأكد من وجود `.env.local` في `.gitignore`:

```bash
# Environment variables
.env.local
.env.*.local
.env.production.local

# Secrets
*.secret
*.key
```

---

## 🔧 استكشاف الأخطاء

### مشكلة: "Invalid redirect URI"
**الحل:** تأكد من إضافة URI في Azure Portal → Authentication

### مشكلة: "AADSTS65001"
**الحل:** تأكد من موافقة الأدمن على الصلاحيات

### مشكلة: "Token expired"
**الحل:** أضف `offline_access` في scope

### مشكلة: "Cannot find module 'next-auth'"
**الحل:** 
```bash
npm install next-auth
```

---

## ✅ قائمة التحقق النهائية

- ✅ ملف `.env.local` موجود وصحيح
- ✅ المكتبات مثبتة (`next-auth`, `@azure/msal-node`)
- ✅ API routes منشأة
- ✅ Session Provider مضاف
- ✅ صفحة تسجيل الدخول جاهزة
- ✅ الصفحات محمية
- ✅ البحث عن المستخدمين يعمل
- ✅ `.gitignore` محدث

---

*آخر تحديث: ديسمبر 2025*
