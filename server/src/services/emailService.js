import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Çevresel değişkenleri bu dosyada da garanti altına alıyoruz
dotenv.config();

export const sendConfirmationEmail = async (applicationData, applicationNumber, file) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // --- 1. MÜŞTERİYE GİDECEK ONAY MAİLİ (Dosyasız) ---
    const clientMailOptions = {
      from: `"FAIRMITTELN" <${process.env.EMAIL_USER}>`, 
      to: applicationData.email,
      subject: `Ihre Personalanfrage bei FAIRMITTELN (Ref: ${applicationNumber})`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #1e293b; max-w-2xl mx-auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #0f172a; padding: 24px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 2px;">FAIRMITTELN</h1>
          </div>
          <div style="padding: 32px; background-color: #f8fafc;">
            <p style="font-size: 16px;">Sehr geehrte(r) Herr/Frau <strong>${applicationData.contactPerson}</strong>,</p>
            <p style="font-size: 16px; line-height: 1.6;">vielen Dank für Ihre Anfrage. Wir haben Ihren Personalbedarf für die Position <strong>${applicationData.position}</strong> erfolgreich aufgenommen.</p>
            
            <div style="background-color: #ffffff; padding: 20px; border-radius: 6px; margin: 24px 0; border-left: 4px solid #2563eb;">
              <p style="margin: 0; font-size: 14px; color: #64748b; text-transform: uppercase;">Ihre Referenznummer</p>
              <p style="margin: 8px 0 0 0; font-size: 20px; font-weight: bold; color: #2563eb;">${applicationNumber}</p>
            </div>

            <p style="font-size: 16px; line-height: 1.6;">Unser Team wird Ihre Anforderungen umgehend prüfen und sich in Kürze persönlich bei Ihnen melden, um die nächsten Schritte zu besprechen.</p>
            <br>
            <p style="font-size: 16px; margin: 0;">Mit freundlichen Grüßen,</p>
            <p style="font-size: 16px; font-weight: bold; margin-top: 8px;">Ihr FAIRMITTELN Team</p>
          </div>
        </div>
      `
    };

    // --- 2. SANA (YÖNETİCİYE) GELECEK BİLDİRİM VE DOSYA EKİ MAİLİ ---
    const adminMailOptions = {
      from: `"Sistem Bildirimi" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // .env dosyasındaki kendi mailine gelir
      subject: `YENİ BAŞVURU: ${applicationData.companyName} (${applicationNumber})`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Yeni Bir Personel Talebi Geldi! 🚀</h2>
          <p><strong>Firma Adı:</strong> ${applicationData.companyName}</p>
          <p><strong>Yetkili Kişi:</strong> ${applicationData.contactPerson}</p>
          <p><strong>Telefon:</strong> ${applicationData.phone}</p>
          <p><strong>E-posta:</strong> ${applicationData.email}</p>
          <p><strong>Aranan Pozisyon:</strong> ${applicationData.position}</p>
          <hr>
          <p><em>Not: Tüm detaylar ve tır seçimleri Google Sheets tablonuza otomatik olarak işlenmiştir.</em></p>
          ${file ? '<p><strong>Müşterinin yüklediği belge bu e-postanın ektedir.</strong></p>' : '<p>Müşteri herhangi bir belge yüklemedi.</p>'}
        </div>
      `,
      attachments: [] // Başlangıçta boş
    };

    // Eğer kullanıcı forma dosya yüklediyse, bu dosyayı admin mailine ek (attachment) olarak koy!
    if (file) {
      adminMailOptions.attachments.push({
        filename: file.originalname,
        content: file.buffer // Multer'in RAM'de tuttuğu asıl dosya verisi
      });
    }

    // 3. Mailleri gönder
    await transporter.sendMail(clientMailOptions);
    console.log(`✉️ Müşteriye onay maili başarıyla gönderildi: ${applicationData.email}`);
    
    await transporter.sendMail(adminMailOptions);
    console.log(`📥 Yöneticiye (sana) dosya eklentili bildirim maili başarıyla gönderildi.`);
    
  } catch (error) {
    console.error("❌ E-posta Gönderim Hatası:", error);
  }
};