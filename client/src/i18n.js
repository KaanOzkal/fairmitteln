import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  de: {
    translation: {
      nav: { companies: "Unternehmen", process: "Ablauf", about: "Über uns", request: "Mitarbeiter anfragen", sub: "Personal aus der Türkei" },
      hero: { tag: "B2B Recruitment Platform", t1: "Qualifizierte Mitarbeiter aus der ", t2: "Türkei", t3: " für Unternehmen in ", t4: "Deutschland", desc: "Wir unterstützen deutsche Unternehmen bei der Suche und Vermittlung qualifizierter Mitarbeiter aus der Türkei – insbesondere im Transport- und Logistikbereich.", cta1: "Mitarbeiter anfragen", cta2: "So funktioniert es", b1: "Persönliche Betreuung", b2: "Qualifizierte Mitarbeiter", b3: "Schnelle Anfrage", b4: "Deutschlandweit", stat1: "Status", stat2: "LKW-Fahrer verfügbar" },
      ind: { title: "Personal für Ihre Branche", c1t: "Transport & Logistik", c1d: "LKW-Fahrer, Berufskraftfahrer und weitere Fachkräfte für den Transportbereich.", c2t: "Spedition", c2d: "Unterstützung bei der Suche nach qualifiziertem Personal.", c3t: "Lager & Logistik", c3d: "Mitarbeiter für Lager, Logistik und operative Bereiche.", c4t: "Weitere Branchen", c4d: "Personalbedarf individuell nach Ihren Anforderungen." },
      proc: { title: "So funktioniert es", s1t: "Anfrage senden", s1d: "Teilen Sie uns mit, welche Mitarbeiter Sie suchen.", s2t: "Bedarf besprechen", s2d: "Wir prüfen Ihre Anforderungen und besprechen die Details.", s3t: "Kandidaten finden", s3d: "Wir suchen passende Kandidaten aus der Türkei.", s4t: "Prozess begleiten", s4d: "Wir begleiten Sie während des weiteren Vermittlungsprozesses." },
      ben: { title: "Warum FairMitteln?", desc: "Wir verstehen die Herausforderungen des deutschen Arbeitsmarktes und bieten passgenaue Lösungen für Ihren Personalbedarf.", b1t: "Persönliche Betreuung", b1d: "Direkter Ansprechpartner während des gesamten Prozesses.", b2t: "Internationale Personalgewinnung", b2d: "Zugang zu qualifizierten Arbeitskräften aus der Türkei.", b3t: "Branchenfokus", b3d: "Besondere Erfahrung im Transport- und Logistikbereich.", b4t: "Individuelle Lösungen", b4d: "Der Personalbedarf jedes Unternehmens wird individuell betrachtet." },
      cta: { title: "Sie suchen Mitarbeiter aus der Türkei?", desc: "Teilen Sie uns Ihren Personalbedarf mit. Wir melden uns persönlich bei Ihnen und besprechen die nächsten Schritte.", btn: "Jetzt Mitarbeiter anfragen" },
      foot: { desc: "Personal aus der Türkei für Unternehmen in Deutschland. Wir bringen qualifizierte Fachkräfte und deutsche Unternehmen erfolgreich zusammen.", t1: "Unternehmen", t2: "Kontakt & Rechtliches", l1: "Leistungen", l2: "Ablauf", l3: "Über uns", l4: "Mitarbeiter anfragen", l5: "Datenschutz", l6: "Impressum", rights: "Alle Rechte vorbehalten." },
      form: {
        title: "Mitarbeiter anfragen", desc: "Teilen Sie uns Ihren Personalbedarf mit. Füllen Sie das Formular aus und wir melden uns persönlich bei Ihnen.",
        steps: { s1: "Unternehmen", s2: "Personalbedarf", s3: "Abschluss" },
        btns: { back: "Zurück", next: "Weiter", submit: "Anfrage senden" },
        errors: { required: "Dieses Feld ist erforderlich.", email: "Ungültige E-Mail.", min1: "Mindestens 1." },
        company: {
          title: "Über Ihr Unternehmen", desc: "Bitte geben Sie die grundlegenden Informationen ein.",
          name: "Firmenname *", contact: "Ansprechpartner *", email: "E-Mail *", phone: "Telefonnummer *",
          web: "Firmenwebsite", street: "Straße", zip: "PLZ", city: "Stadt *", state: "Bundesland *"
        },
        demand: {
          title: "Welche Mitarbeiter suchen Sie?", desc: "Details zu den gewünschten Qualifikationen.",
          ind: "Branche *", pos: "Position *", count: "Anzahl der Mitarbeiter *", type: "Beschäftigungsart *",
          loc: "Arbeitsort (Stadt) *", start: "Gewünschter Arbeitsbeginn *",
          driverTitle: "Zusatzqualifikationen für Fahrer", license: "Führerschein", exp: "Berufserfahrung", 
          lang: "Deutschkenntnisse", acc: "Unterkunft gestellt?", select: "Bitte wählen..."
        },
        opts: {
          transport: "Transport", logistik: "Logistik", spedition: "Spedition", lager: "Lager", produktion: "Produktion", bau: "Bau", sonstige: "Sonstige",
          lkw: "LKW-Fahrer", beruf: "Berufskraftfahrer", lagerhelfer: "Lagerhelfer", lagermit: "Lagermitarbeiter", prodmit: "Produktionsmitarbeiter",
          vollzeit: "Vollzeit", teilzeit: "Teilzeit", minijob: "Minijob",
          sofort: "Sofort", monat1: "Innerhalb eines Monats", monat3: "In 1–3 Monaten", spaeter: "Später",
          c: "Klasse C", ce: "Klasse CE", cce: "C + CE", keine: "Keine", u1: "Unter 1 Jahr", y13: "1–3 Jahre", y35: "3–5 Jahre", y5: "5+ Jahre",
          ja: "Ja", nein: "Nein", unklar: "Noch unklar"
        },
        add: {
          title: "Zusätzliche Informationen", desc: "Haben Sie noch weitere Anforderungen?",
          req: "Weitere Anforderungen", reqPlace: "Beschreiben Sie kurz Ihren Personalbedarf...",
          privacy: "Ich akzeptiere die Datenschutzbestimmungen und stimme der Verarbeitung meiner Daten zu. *"
        }
      }
    }
  },
  tr: {
    translation: {
      nav: { companies: "Şirketler", process: "Süreç", about: "Hakkımızda", request: "Personel Talep Et", sub: "Türkiye'den Personel" },
      hero: { tag: "B2B İşe Alım Platformu", t1: "Almanya'daki Şirketler için ", t2: "Türkiye'den", t3: " Nitelikli ", t4: "Personel", desc: "Alman şirketlerine Türkiye'den nitelikli personel bulma ve yerleştirme konusunda destek oluyoruz – özellikle nakliye ve lojistik sektöründe.", cta1: "Personel Talep Et", cta2: "Nasıl Çalışır", b1: "Kişisel Destek", b2: "Nitelikli Personel", b3: "Hızlı Talep", b4: "Tüm Almanya", stat1: "Durum", stat2: "Tır Şoförü Müsait" },
      ind: { title: "Sektörünüz İçin Personel", c1t: "Nakliye & Lojistik", c1d: "Nakliye sektörü için tır şoförleri ve diğer uzmanlar.", c2t: "Spedisyon", c2d: "Nitelikli personel arayışında destek.", c3t: "Depo & Lojistik", c3d: "Depo ve operasyonel alanlar için çalışanlar.", c4t: "Diğer Sektörler", c4d: "İhtiyaçlarınıza göre özel personel talebi." },
      proc: { title: "Nasıl Çalışır?", s1t: "Talep Gönderin", s1d: "Hangi personeli aradığınızı bize bildirin.", s2t: "İhtiyacı Görüşelim", s2d: "Taleplerinizi inceler ve detayları konuşuruz.", s3t: "Adayları Bulalım", s3d: "Türkiye'den uygun adayları araştırırız.", s4t: "Süreci Yönetelim", s4d: "İşe alım sürecinin tamamında size eşlik ederiz." },
      ben: { title: "Neden BERLINER?", desc: "Alman işgücü piyasasının zorluklarını anlıyor ve personel ihtiyacınıza uygun çözümler sunuyoruz.", b1t: "Kişisel Destek", b1d: "Tüm süreç boyunca doğrudan iletişim.", b2t: "Uluslararası İşe Alım", b2d: "Türkiye'den nitelikli işgücüne erişim.", b3t: "Sektör Odaklı", b3d: "Nakliye ve lojistik alanında özel deneyim.", b4t: "Özel Çözümler", b4d: "Her şirketin personel ihtiyacı bireysel olarak değerlendirilir." },
      cta: { title: "Türkiye'den Personel mi Arıyorsunuz?", desc: "Personel ihtiyacınızı bizimle paylaşın. Sizinle iletişime geçip sonraki adımları konuşalım.", btn: "Hemen Personel Talep Et" },
      foot: { desc: "Almanya'daki şirketler için Türkiye'den personel. Nitelikli uzmanları ve Alman şirketlerini başarıyla bir araya getiriyoruz.", t1: "Şirketler", t2: "İletişim & Yasal", l1: "Hizmetler", l2: "Süreç", l3: "Hakkımızda", l4: "Personel Talep Et", l5: "Gizlilik Politikası", l6: "Künye", rights: "Tüm Hakları Saklıdır." },
      form: {
        title: "Personel Talep Et", desc: "Personel ihtiyacınızı bizimle paylaşın. Formu doldurun, sizinle bizzat iletişime geçelim.",
        steps: { s1: "Firma Bilgileri", s2: "Personel İhtiyacı", s3: "Sonuç & Onay" },
        btns: { back: "Geri", next: "İleri", submit: "Talebi Gönder" },
        errors: { required: "Bu alan zorunludur.", email: "Geçersiz e-posta.", min1: "En az 1 olmalıdır." },
        company: {
          title: "Şirketiniz Hakkında", desc: "Lütfen şirketinizle ilgili temel bilgileri girin.",
          name: "Firma Adı *", contact: "Yetkili Kişi *", email: "E-Posta *", phone: "Telefon *",
          web: "Web Sitesi", street: "Sokak/Adres", zip: "Posta Kodu", city: "Şehir *", state: "Eyalet *"
        },
        demand: {
          title: "Hangi Çalışanları Arıyorsunuz?", desc: "İstenen nitelikler ve şartlar hakkında detaylar.",
          ind: "Sektör *", pos: "Pozisyon *", count: "Çalışan Sayısı *", type: "Çalışma Şekli *",
          loc: "Çalışma Yeri (Şehir) *", start: "İstenen Başlangıç *",
          driverTitle: "Şoförler İçin Ek Nitelikler", license: "Ehliyet Sınıfı", exp: "Mesleki Deneyim", 
          lang: "Almanca Seviyesi", acc: "Konaklama Sağlanıyor mu?", select: "Lütfen seçin..."
        },
        opts: {
          transport: "Nakliye", logistik: "Lojistik", spedition: "Spedisyon", lager: "Depo", produktion: "Üretim", bau: "İnşaat", sonstige: "Diğer",
          lkw: "Tır Şoförü", beruf: "Profesyonel Şoför", lagerhelfer: "Depo Yardımcısı", lagermit: "Depo Elemanı", prodmit: "Üretim Elemanı",
          vollzeit: "Tam Zamanlı", teilzeit: "Yarı Zamanlı", minijob: "Minijob (Yarı Zamanlı)",
          sofort: "Hemen", monat1: "1 Ay İçinde", monat3: "1-3 Ay İçinde", spaeter: "Daha Sonra",
          c: "C Sınıfı", ce: "CE Sınıfı", cce: "C + CE", keine: "Yok", u1: "1 Yıldan Az", y13: "1-3 Yıl", y35: "3-5 Yıl", y5: "5+ Yıl",
          ja: "Evet", nein: "Hayır", unklar: "Henüz Belli Değil"
        },
        add: {
          title: "Ek Bilgiler", desc: "Başka gereksinimleriniz var mı?",
          req: "Diğer Talepler", reqPlace: "Personel ihtiyacınızı kısaca açıklayın...",
          privacy: "Gizlilik politikasını kabul ediyor ve verilerimin işlenmesini onaylıyorum. *"
        }
      }
    }
  },
  en: {
    translation: {
      nav: { companies: "Companies", process: "Process", about: "About Us", request: "Request Staff", sub: "Staff from Turkey" },
      hero: { tag: "B2B Recruitment Platform", t1: "Qualified Staff from ", t2: "Turkey", t3: " for Companies in ", t4: "Germany", desc: "We support German companies in finding and placing qualified staff from Turkey – especially in the transport and logistics sector.", cta1: "Request Staff", cta2: "How it works", b1: "Personal Support", b2: "Qualified Staff", b3: "Fast Request", b4: "Nationwide", stat1: "Status", stat2: "Truck Driver Available" },
      ind: { title: "Staff for Your Industry", c1t: "Transport & Logistics", c1d: "Truck drivers and other professionals for the transport sector.", c2t: "Freight Forwarding", c2d: "Support in finding qualified personnel.", c3t: "Warehouse & Logistics", c3d: "Employees for warehouse and operational areas.", c4t: "Other Industries", c4d: "Personnel requirements individually according to your needs." },
      proc: { title: "How it works", s1t: "Send Request", s1d: "Tell us which employees you are looking for.", s2t: "Discuss Needs", s2d: "We review your requirements and discuss details.", s3t: "Find Candidates", s3d: "We search for suitable candidates from Turkey.", s4t: "Accompany Process", s4d: "We support you throughout the entire placement process." },
      ben: { title: "Why BERLINER?", desc: "We understand the challenges of the German labor market and offer tailored solutions for your personnel needs.", b1t: "Personal Support", b1d: "Direct contact person throughout the process.", b2t: "International Recruiting", b2d: "Access to qualified workforce from Turkey.", b3t: "Industry Focus", b3d: "Special experience in transport and logistics.", b4t: "Individual Solutions", b4d: "Each company's personnel needs are considered individually." },
      cta: { title: "Looking for Staff from Turkey?", desc: "Tell us your personnel needs. We will contact you personally to discuss the next steps.", btn: "Request Staff Now" },
      foot: { desc: "Staff from Turkey for companies in Germany. We successfully bring qualified professionals and German companies together.", t1: "Company", t2: "Contact & Legal", l1: "Services", l2: "Process", l3: "About Us", l4: "Request Staff", l5: "Privacy Policy", l6: "Imprint", rights: "All Rights Reserved." },
      form: {
        title: "Request Staff", desc: "Tell us your personnel needs. Fill out the form and we will contact you personally.",
        steps: { s1: "Company Info", s2: "Requirements", s3: "Completion" },
        btns: { back: "Back", next: "Next", submit: "Send Request" },
        errors: { required: "This field is required.", email: "Invalid email.", min1: "At least 1." },
        company: {
          title: "About Your Company", desc: "Please enter basic information about your company.",
          name: "Company Name *", contact: "Contact Person *", email: "Email *", phone: "Phone Number *",
          web: "Website", street: "Street", zip: "Zip Code", city: "City *", state: "State *"
        },
        demand: {
          title: "Which employees are you looking for?", desc: "Details about the desired qualifications.",
          ind: "Industry *", pos: "Position *", count: "Number of Employees *", type: "Employment Type *",
          loc: "Work Location (City) *", start: "Desired Start Date *",
          driverTitle: "Additional Qualifications for Drivers", license: "Driving License", exp: "Professional Experience", 
          lang: "German Knowledge", acc: "Accommodation Provided?", select: "Please select..."
        },
        opts: {
          transport: "Transport", logistik: "Logistics", spedition: "Freight Forwarding", lager: "Warehouse", produktion: "Production", bau: "Construction", sonstige: "Other",
          lkw: "Truck Driver", beruf: "Professional Driver", lagerhelfer: "Warehouse Helper", lagermit: "Warehouse Staff", prodmit: "Production Staff",
          vollzeit: "Full-time", teilzeit: "Part-time", minijob: "Minijob",
          sofort: "Immediately", monat1: "Within 1 month", monat3: "In 1-3 months", spaeter: "Later",
          c: "Class C", ce: "Class CE", cce: "C + CE", keine: "None", u1: "Under 1 year", y13: "1-3 years", y35: "3-5 years", y5: "5+ years",
          ja: "Yes", nein: "No", unklar: "Not yet clear"
        },
        add: {
          title: "Additional Information", desc: "Do you have any other requirements?",
          req: "Further Requirements", reqPlace: "Briefly describe your personnel needs...",
          privacy: "I accept the privacy policy and agree to the processing of my data. *"
        }
      }
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "de", 
  fallbackLng: "de",
  interpolation: { escapeValue: false }
});

export default i18n;