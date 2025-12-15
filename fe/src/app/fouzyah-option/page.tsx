'use client';
import dynamic from 'next/dynamic';

const FouzyahApp = dynamic(() => import('./src/index'), { ssr: false });

export default function Page() {
  return <FouzyahApp />;
}