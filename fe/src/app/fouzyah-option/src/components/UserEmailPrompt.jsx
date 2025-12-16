import React, { useState, useEffect } from 'react';

const UserEmailPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (!storedEmail) {
      setShowPrompt(true);
    }
  }, []);

  const handleSave = () => {
    if (email.trim()) {
      localStorage.setItem('userEmail', email.trim());
      setShowPrompt(false);
    } else {
      alert('يرجى إدخال البريد الإلكتروني');
    }
  };

  const handleChangeEmail = () => {
    const newEmail = prompt('أدخل البريد الإلكتروني الجديد:', localStorage.getItem('userEmail') || '');
    if (newEmail && newEmail.trim()) {
      localStorage.setItem('userEmail', newEmail.trim());
      window.location.reload();
    }
  };

  if (!showPrompt) {
    return (
      <button
        onClick={handleChangeEmail}
        className="fixed bottom-4 right-4 bg-primary-600 text-white px-3 py-2 rounded-lg text-xs shadow-lg hover:bg-primary-700 transition z-50"
        title="تغيير البريد الإلكتروني"
      >
        <i className="fa-solid fa-user ml-1"></i>
        {localStorage.getItem('userEmail') || 'تسجيل الدخول'}
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
        <div className="text-center mb-6">
          <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fa-solid fa-user text-primary-600 text-2xl"></i>
          </div>
          <h3 className="text-xl font-bold text-primary-900">مرحباً بك!</h3>
          <p className="text-gray-600 text-sm mt-2">يرجى إدخال البريد الإلكتروني الخاص بك</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            البريد الإلكتروني *
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSave()}
            placeholder="example@mngdp.sa"
            className="w-full p-3 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none"
            autoFocus
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-primary-600 text-white py-3 rounded-lg font-bold hover:bg-primary-700 transition"
        >
          <i className="fa-solid fa-check ml-2"></i>
          تأكيد
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          سيتم استخدام هذا البريد للتحقق من صلاحيات الموافقة
        </p>
      </div>
    </div>
  );
};

export default UserEmailPrompt;
