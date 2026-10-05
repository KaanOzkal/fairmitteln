import { appendToSheet } from '../services/googleSheetsService.js';
import { sendConfirmationEmail } from '../services/emailService.js';

export const submitApplication = async (req, res, next) => {
  try {
    const formData = req.body;
    const file = req.file; // Multer'ın yakaladığı dosya burada!
    
    // 1. Google Sheets'e veriyi kaydet (Yazılar ve Tır resimleri)
    const result = await appendToSheet(formData);

    if (result.success) {
      // 2. E-posta işlemlerini başlat (Dosyayı da parametre olarak gönderiyoruz)
      sendConfirmationEmail(formData, result.applicationNumber, file);

      return res.status(200).json({
        success: true,
        message: "Ihre Anfrage wurde erfolgreich übermittelt.",
        applicationNumber: result.applicationNumber
      });
    } else {
      throw new Error("Speichern fehlgeschlagen");
    }
  } catch (error) {
    next(error); 
  }
};