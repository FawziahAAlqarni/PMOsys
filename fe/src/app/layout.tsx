import './global.css';

export const metadata = {
  title: 'نظام إدارة مشاريع التحول',
  description: 'نظام إدارة مشاريع التحول - برنامج تطوير وزارة الحرس الوطني',
};

export default function RootLayout({children,}: { children: React.ReactNode; }) {
  return (
    <html lang="ar" dir="rtl">
    <body className="h-screen flex flex-col bg-[#f8faf9] font-sans text-gray-800 overflow-hidden">
    {children}
    </body>
    </html>
  );
}
