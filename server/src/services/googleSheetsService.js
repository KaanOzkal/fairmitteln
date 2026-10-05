import { google } from 'googleapis';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const truckDataMap = {
  'cekici': { name: 'Çekici (Standart)', img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=600' },
  'tenteli': { name: 'Tenteli Tır (Curtainsider)', img: 'https://images.unsplash.com/photo-1591768793355-74d04bb6608f?auto=format&fit=crop&q=80&w=600' },
  'mega': { name: 'Mega Tır (Mega Trailer)', img: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&q=80&w=600' },
  'frigo': { name: 'Frigo Tır (Refrigerated)', img: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=600' },
  'lowbed': { name: 'Lowbed Tır', img: 'https://images.unsplash.com/photo-1566838848149-c167094ba490?auto=format&fit=crop&q=80&w=600' },
  'konteyner': { name: 'Konteyner Taşıyıcı', img: 'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&q=80&w=600' },
  'tanker': { name: 'Tanker Tır', img: 'https://images.unsplash.com/photo-1604515598642-1262d08920bc?auto=format&fit=crop&q=80&w=600' },
  'silobas': { name: 'Silobas Tır', img: 'https://images.unsplash.com/photo-1616422285623-14c194b6938a?auto=format&fit=crop&q=80&w=600' },
  'damperli': { name: 'Damperli Tır', img: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&q=80&w=600' },
  'oto': { name: 'Oto Taşıyıcı Tır', img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600' }
};

export const appendToSheet = async (applicationData) => {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(__dirname, '../../google-credentials.json'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.SPREADSHEET_ID;

    const year = new Date().getFullYear();
    const randomId = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    const applicationNumber = `BRL-${year}-${randomId}`;

    const timestamp = new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' });

    // Uyruk Formatı (Eğer "Diğer" seçildiyse yanına yazıyı ekle)
    let finalNationality = applicationData.nationality || '-';
    if (finalNationality === 'Diğer' && applicationData.otherNationality) {
      finalNationality = `Diğer (${applicationData.otherNationality})`;
    }

    // Çoklu seçilen Rotayı virgülle ayır
    let routeStr = '-';
    if (applicationData.drivingRoute && applicationData.drivingRoute.length > 0) {
      routeStr = Array.isArray(applicationData.drivingRoute) ? applicationData.drivingRoute.join(', ') : applicationData.drivingRoute;
    }

    // Tır Verilerini İşleme
    let truckTypesStr = '-';
    let truckNames = [];  
    let truckImages = []; 

    if (applicationData.truckType && applicationData.truckType.length > 0) {
      const typesArray = Array.isArray(applicationData.truckType) ? applicationData.truckType : [applicationData.truckType];
      truckTypesStr = typesArray.map(t => truckDataMap[t] ? truckDataMap[t].name : t).join(', ');

      typesArray.forEach(t => {
        const name = truckDataMap[t] ? truckDataMap[t].name : t;
        const imageUrl = truckDataMap[t] ? truckDataMap[t].img : null;
        truckNames.push(name);
        truckImages.push(imageUrl ? `=IMAGE("${imageUrl}")` : '');
      });
    }

    // 1. SATIR: Müşteri Bilgileri + Yeni Alanlar + Tır İsimleri
    const rowData1 = [
      timestamp,                               // A: Tarih
      applicationNumber,                       // B: Referans No
      applicationData.companyName || '',       // C: Firma
      applicationData.contactPerson || '',     // D: Yetkili
      applicationData.email || '',             // E: Email
      applicationData.phone || '',             // F: Telefon
      applicationData.website || '-',          // G: Web
      applicationData.street || '',            // H: Sokak
      applicationData.postalCode || '',        // I: Posta Kodu
      applicationData.city || '',              // J: Şehir
      applicationData.state || '',             // K: Eyalet
      applicationData.industry || '',          // L: Sektör
      applicationData.position || '',          // M: Pozisyon
      applicationData.employeeCount || '',     // N: Kaç İşçi
      applicationData.employmentType || '',    // O: İstihdam Türü
      applicationData.workLocation || '',      // P: Çalışma Yeri
      applicationData.startDate || '',         // Q: Başlangıç
      finalNationality,                        // R: YENİ - Uyruk
      applicationData.weeklyHours || '-',      // S: YENİ - Haftalık Saat
      applicationData.hourlyWage || '-',       // T: YENİ - Saatlik Ücret
      applicationData.germanLevel || '-',      // U: YENİ - Almanca Seviyesi
      applicationData.experience || '-',       // V: YENİ - Deneyim
      applicationData.certificates || '-',     // W: YENİ - Sertifikalar
      applicationData.specialSkills || '-',    // X: YENİ - Özel Beceriler
      applicationData.drivingLicense || '-',   // Y: Ehliyet
      routeStr,                                // Z: YENİ - Çalışma Rotası (Kısa, Uzun)
      applicationData.accommodation || '-',    // AA: Konaklama
      applicationData.requirements || '-',     // AB: Ek Talepler (Açıklama)
      truckTypesStr,                           // AC: Tırların virgüllü listesi
      ...truckNames                            // AD, AE, AF... (Tır İsimleri)
    ];

    // 2. SATIR: Sadece Tır Resimleri (A'dan AC'ye kadar olan 29 sütun boş bırakılır)
    const emptyCells = Array(29).fill(''); // 29 Adet boşluk (A-AC)
    const rowData2 = [
      ...emptyCells,                           
      ...truckImages                           // AD, AE, AF... (Resimler isimlerin tam altına hizalanır)
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:ZZ', 
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: { values: [rowData1, rowData2] },
    });

    console.log(`✅ Başvuru başarıyla Google Sheets'e yazıldı: ${applicationNumber}`);
    return { success: true, applicationNumber };

  } catch (error) {
    console.error('❌ Google Sheets API Detaylı Hata:', error);
    throw new Error('Fehler beim Speichern in Google Sheets');
  }
};