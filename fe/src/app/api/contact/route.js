import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, email, subject, message, to } = await request.json();

    // إعداد transporter للبريد الإلكتروني
    // ملاحظة: يجب تكوين SMTP server في متغيرات البيئة
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // محتوى البريد الإلكتروني
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: to,
      subject: `رسالة جديدة من نظام PMO: ${subject}`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
          <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #006C35; border-bottom: 3px solid #C5A96F; padding-bottom: 10px;">رسالة جديدة من نظام إدارة مشاريع التحول</h2>
            
            <div style="margin: 20px 0;">
              <p style="margin: 10px 0;"><strong>الاسم:</strong> ${name}</p>
              <p style="margin: 10px 0;"><strong>البريد الإلكتروني:</strong> ${email}</p>
              <p style="margin: 10px 0;"><strong>الموضوع:</strong> ${subject}</p>
            </div>
            
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0;">محتوى الرسالة:</h3>
              <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
            
            <p style="color: #6b7280; font-size: 12px; text-align: center;">
              تم إرسال هذه الرسالة من نظام إدارة مشاريع التحول - برنامج تطوير وزارة الحرس الوطني
            </p>
          </div>
        </div>
      `,
    };

    // إرسال البريد
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
