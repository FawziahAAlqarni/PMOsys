import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();
    
    // الإرسال إلى falqarni@mngdp.com
    const to = 'falqarni@mngdp.com';
    
    // إنشاء محتوى البريد الإلكتروني
    const emailBody = `
رسالة جديدة من نظام إدارة مشاريع التحول

الاسم: ${name}
البريد الإلكتروني: ${email}
الموضوع: ${subject}

محتوى الرسالة:
${message}

---
تم إرسال هذه الرسالة من نظام إدارة مشاريع التحول - برنامج تطوير وزارة الحرس الوطني
    `.trim();

    // إنشاء رابط mailto
    const mailtoLink = `mailto:${to}?subject=${encodeURIComponent(`رسالة من نظام PMO: ${subject}`)}&body=${encodeURIComponent(emailBody)}`;
    
    // إرجاع رابط mailto للفرونت إند
    return NextResponse.json({ 
      success: true, 
      mailtoLink,
      message: 'Email link generated successfully' 
    });
  } catch (error) {
    console.error('Error generating email:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate email' },
      { status: 500 }
    );
  }
}
