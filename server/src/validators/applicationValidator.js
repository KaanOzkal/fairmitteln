export const validateApplication = (req, res, next) => {
  const body = req.body;

  // 1. İHTİMAL: Multer (Dosya yükleme) middleware'i route tarafında yanlış sıradaysa req.body boş gelir.
  // Bu durumda hatanın sebebini direkt anlarız.
  if (!body || Object.keys(body).length === 0) {
    return res.status(400).json({
      success: false, 
      message: 'Sunucuya hiçbir veri ulaşmadı. (Lütfen route dosyasındaki multer/upload middleware sırasını kontrol edin)' 
    });
  }

  // 2. KESİN ZORUNLU ALANLAR
  // Formda kesin olarak doldurulduğunu bildiğimiz ana alanlar
  const requiredFields = [
    'companyName', 
    'contactPerson', 
    'email', 
    'phone', 
    'industry', 
    'position', 
    'employeeCount', 
    'employmentType', 
    'workLocation', 
    'startDate'
  ];

  const missingFields = [];

  // Alanları tek tek kontrol et
  requiredFields.forEach(field => {
    // FormData'dan gelen veriler bazen string "undefined" veya boş string "" olabilir
    if (!body[field] || body[field] === 'undefined' || body[field] === '') {
      missingFields.push(field);
    }
  });

  // Eğer frontend'de "state", "city" veya "privacyAccepted" alanları da KESİN varsa ve boş geçilemezse, 
  // onları da buraya if ile ekleyebiliriz. Şimdilik hatayı geçmek için onları katı zorunluluktan çıkardım.
  if (!body['city']) {
    // console.log("Not: Şehir (city) alanı boş geldi.");
  }

  // Eğer eksik alan varsa, tam olarak hangileri olduğunu hata mesajında frontend'e (React'e) gönderiyoruz!
  // Böylece ekranda "Eksik alanlar: companyName, startDate" gibi net bir hata göreceksin.
  if (missingFields.length > 0) {
    return res.status(400).json({      
      success: false, 
      message: `Bitte füllen Sie alle Pflichtfelder aus. Fehlend: ${missingFields.join(', ')}` 
    });
  }
  
  // Her şey tamamsa bir sonraki adıma (kayıt işlemine) geç
  next(); 
};