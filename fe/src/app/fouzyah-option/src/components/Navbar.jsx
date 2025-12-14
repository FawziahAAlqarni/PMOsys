import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-sm z-10 border-b-4 border-secondary-gold h-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          
          {/* اليمين: الشعار والعناوين */}
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 flex items-center justify-center">
               {/* تأكد أن الصورة في مجلد public */}
               <img src="/Logo.png" alt="Logo" className="h-full object-contain" />
            </div>
            <div className="border-r-2 border-gray-200 pr-4 mr-2">
                <h1 className="font-bold text-lg text-primary-800 leading-tight">نظام إدارة مشاريع التحول | PMO System</h1>
                <p className="text-xs text-secondary-gold font-bold">برنامج تطوير وزارة الحرس الوطني</p>
            </div>
          </div>

          {/* الوسط: القوائم */}
          <div className="flex items-center gap-6">
            <button 
                onClick={() => navigate('/')}
                className="text-gray-700 hover:text-primary-600 font-semibold text-sm transition flex items-center gap-2"
            >
                <i className="fa-solid fa-house"></i>
                الرئيسية
            </button>
            <button 
                onClick={() => window.open('https://tickets.mngdp.com/', '_blank')}
                className="text-gray-700 hover:text-primary-600 font-semibold text-sm transition flex items-center gap-2"
            >
                <i className="fa-solid fa-headset"></i>
                الدعم والمساعدة
            </button>
            <button 
                onClick={() => navigate('/contact')}
                className="text-gray-700 hover:text-primary-600 font-semibold text-sm transition flex items-center gap-2"
            >
                <i className="fa-solid fa-envelope"></i>
                التواصل
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;