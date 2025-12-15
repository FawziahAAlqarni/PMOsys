'use client';
import dynamic from 'next/dynamic';

const FouzyahApp = dynamic(() => import('./fouzyah-option/src/index'), { ssr: false });

export default function Home() {
  return <FouzyahApp />;
}
