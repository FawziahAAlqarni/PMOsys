import React, { useState } from 'react';

const ContactPage = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      // إنشاء رابط mailto
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok && data.mailtoLink) {
        // فتح تطبيق البريد الإلكتروني
        window.location.href = data.mailtoLink;
        
        // عرض رسالة النجاح
        setSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (error) {
      console.error('Error generating email:', error);
      alert('حدث خطأ أثناء إنشاء البريد الإلكتروني');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={() => onNavigate('dashboard')}
            className="mb-4 flex items-center gap-2 text-gray-600 hover:text-primary-600 transition"
          >
            <i className="fa-solid fa-arrow-left"></i>
            العودة
          </button>
          <h1 className="text-3xl font-bold text-primary-900 mb-2">تواصل معنا</h1>
          <p className="text-gray-600">يسعدنا تواصلك معنا. املأ النموذج أدناه وسنرد عليك في أقرب وقت</p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
            <i className="fa-solid fa-check-circle"></i>
            <span>تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.</span>
          </div>
        )}

        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                الاسم <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                placeholder="أدخل اسمك الكامل"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                البريد الإلكتروني <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                placeholder="example@email.com"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                الموضوع <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                placeholder="موضوع الرسالة"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                الرسالة <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition resize-none"
                placeholder="اكتب رسالتك هنا..."
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={sending}
                className={`flex-1 py-3 px-6 rounded-lg font-bold text-white transition flex items-center justify-center gap-2 ${
                  sending 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-primary-600 hover:bg-primary-700'
                }`}
              >
                {sending ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin"></i>
                    جاري الإرسال...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-paper-plane"></i>
                    إرسال الرسالة
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Contact Info */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">معلومات التواصل</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-600">
                <i className="fa-solid fa-envelope text-primary-600"></i>
                <span dir="ltr">falqarmi@mngdp.sa</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <i className="fa-solid fa-building text-primary-600"></i>
                <span>برنامج تطوير وزارة الحرس الوطني</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
