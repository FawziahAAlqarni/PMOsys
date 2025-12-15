'use client';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const FouzyahApp = dynamic(() => import('./fouzyah-option/src/index'), { ssr: false });

export default function Home() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-900 mx-auto mb-4"></div>
        <p className="text-gray-600">جاري التحميل...</p>
      </div>
    </div>}>
      <FouzyahApp />
    </Suspense>
  );
}
