import '../globals.css';
import './global.css';

export const metadata = {
  title: 'نظام إدارة مشاريع التحول',
  description: 'نظام إدارة مشاريع التحول - برنامج تطوير وزارة الحرس الوطني',
};

export default function RootLayout({children,}: { children: React.ReactNode; }) {
  return (
    <html lang="ar" dir="rtl">
    <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    </head>
    <body className="min-h-screen flex flex-col bg-[#f8faf9] font-sans text-gray-800 overflow-y-auto">
    {children}
    </body>
    </html>
  );
}
