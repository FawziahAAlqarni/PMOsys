import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col gap-4 p-8">
        <h1 className="text-2xl font-bold mb-4 text-center">نظام إدارة مشاريع التحول</h1>
        <div className="flex gap-4 justify-center">

          <Link
            href="/akbar-option"
            className="bg-cyan-900 text-white px-6 py-3 rounded-lg hover:bg-cyan-700 font-medium text-center"
          >
            كود عبدالله
          </Link>
          <Link
            href="/fouzyah-option"
            className="bg-cyan-900 text-white px-6 py-3 rounded-lg hover:bg-cyan-700 font-medium text-center"
          >
            كود فوزية
          </Link>
          <Link
            href="/test"
            className="bg-cyan-900 text-white px-6 py-3 rounded-lg hover:bg-cyan-700 font-medium text-center"
          >
            تست، مع تسجيل الدخول
          </Link>

        </div>
      </div>
    </main>
  );
}
