import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  Truck, HeartPulse, Wrench, ArrowRight, 
  ShieldCheck, GraduationCap, Users, Play, CheckCircle2, Factory, Utensils, Award
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

// --- ZARİF KAYDIRMA ANİMASYONU (SCROLL REVEAL) ---
const Reveal = ({ children, delay = 0, direction = "up", className = "", threshold = 0.2 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  const baseStyles = "transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]";
  
  const getTransform = () => {
    if (isVisible) return "translate-y-0 translate-x-0 opacity-100 scale-100 blur-none";
    switch (direction) {
      case "up": return "translate-y-16 opacity-0 scale-95 blur-[2px]";
      case "left": return "translate-x-16 opacity-0 blur-[2px]";
      case "right": return "-translate-x-16 opacity-0 blur-[2px]";
      default: return "opacity-0";
    }
  };

  return (
    <div ref={ref} className={`${baseStyles} ${getTransform()} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

const Branchen = () => {
  const { i18n } = useTranslation();
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sticky Scroll: Hangi sektörün okunduğunu tespit eden Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setActiveSection(index);
          }
        });
      },
      // Ekranın tam ortasından geçerken tetiklemesi için
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 } 
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const pageTexts = {
    de: {
      heroTag: "Fokus auf Ihre Branche",
      heroTitle: "Wir kennen Ihren",
      heroTitleSpan: "Personalbedarf",
      heroDesc: "Wir haben uns auf Branchen spezialisiert, in denen der Fachkräftemangel am größten ist, und bringen genau die Talente, die Sie wirklich brauchen.",
      industries: [
        { 
          id: 'logistik',
          icon: <Truck />, 
          title: "Transport & Logistik", 
          subtitle: "Zuverlässige Fahrer für Ihre Flotte",
          desc: "Der Logistiksektor duldet keinen Stillstand. Wir vermitteln erfahrene Berufskraftfahrer (CE) aus dem Ausland, kümmern uns um die Anerkennung der BKF-Qualifikation.",
          image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=1200",
          features: ["Fahrer mit CE-Führerschein", "Unterstützung bei Modul 95", "Vorab-Interviews durch Experten"]
        },
        { 
          id: 'gesundheit',
          icon: <HeartPulse />, 
          title: "Gesundheit & Pflege", 
          subtitle: "Qualifiziertes Personal mit Empathie",
          desc: "Krankenhäuser und Pflegeeinrichtungen brauchen mehr als nur Hände – sie brauchen Herz und Verstand. Wir bringen examinierte Pflegekräfte mit B2-Niveau.",
          image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200",
          features: ["Mindestens B2-Sprachniveau", "Begleitung der Urkundenbewertung", "Interkulturelles Coaching"]
        },
        { 
          id: 'handwerk',
          icon: <Wrench />, 
          title: "Handwerk & Bauwesen", 
          subtitle: "Echte Macher für Ihr Team",
          desc: "Das Handwerk sucht händeringend nach Fachleuten, die sofort anpacken können. Ob Elektriker, Anlagenmechaniker oder Mechatroniker – wir rekrutieren Handwerker mit Erfahrung.",
          image: "/images/insaat.jpg",
          features: ["Geprüfte Gesellenbriefe", "Praktische Video-Assessments", "Schnelle Integration"]
        }
      ],
      features: {
        title: "Warum branchenspezifisch?",
        items: [
          { icon: <ShieldCheck />, title: "Fachliche Vorprüfung", desc: "Wir stellen nicht einfach Lebensläufe durch, sondern prüfen die fachliche Eignung für Ihre Branche." },
          { icon: <GraduationCap />, title: "Gezielte Sprachkurse", desc: "Ein LKW-Fahrer lernt anderes Vokabular als eine Pflegekraft. Unsere Kurse sind spezifisch angepasst." },
          { icon: <Users />, title: "Kultureller Fit", desc: "Wir bereiten die Kandidaten auf die Arbeitskultur in deutschen Betrieben vor." }
        ]
      },
      ctaTitle: "Fachkräfte für Ihr Unternehmen sichern",
      ctaBtn: "Kostenloses Erstgespräch"
    },
    tr: {
      heroTag: "Sektörünüze Odaklanıyoruz",
      heroTitle: "Personel İhtiyacınızı",
      heroTitleSpan: "Çok İyi Biliyoruz",
      heroDesc: "Uzman açığının en fazla olduğu sektörlerde uzmanlaşıyor ve işletmenizin tam olarak ihtiyaç duyduğu yetenekleri Almanya'ya getiriyoruz.",
      industries: [
        { 
          id: 'logistik',
          icon: <Truck />, 
          title: "Taşımacılık ve Lojistik", 
          subtitle: "Filonuz için güvenilir sürücüler",
          desc: "Lojistik sektörü duraklamayı affetmez. Yurtdışından deneyimli profesyonel sürücüler (CE) temin ediyor, mesleki yeterlilik denkliklerini hallediyoruz.",
          image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=1200",
          features: ["CE Ehliyetli Sürücüler", "Modül 95 Desteği", "Uzmanlar Tarafından Ön Görüşme"]
        },
        { 
          id: 'gesundheit',
          icon: <HeartPulse />, 
          title: "Sağlık ve Bakım", 
          subtitle: "Empati sahibi nitelikli personel",
          desc: "Hastaneler ve bakım evleri sadece iş gücüne değil, şefkat ve akla da ihtiyaç duyar. B2 Almanca seviyesine sahip lisanslı hemşireleri getiriyoruz.",
          image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200",
          features: ["En az B2 Dil Seviyesi", "Belge Değerlendirme Takibi", "Kültürlerarası Koçluk"]
        },
        { 
          id: 'handwerk',
          icon: <Wrench />, 
          title: "Zanaat ve İnşaat", 
          subtitle: "Ekibiniz için gerçek ustalar",
          desc: "Zanaat sektörü, işe hemen koyulabilecek profesyoneller arıyor. Elektrikçi, tesisatçı veya mekatronik uzmanı fark etmeksizin ustaları işe alıyoruz.",
          image: "/images/insaat.jpg",
          features: ["Doğrulanmış Ustalık Belgeleri", "Pratik Video Değerlendirmeleri", "Hızlı Entegrasyon"]
        }
      ],
      features: {
        title: "Neden sektöre özel?",
        items: [
          { icon: <ShieldCheck />, title: "Mesleki Ön İnceleme", desc: "Sadece özgeçmiş yollamakla kalmıyor, sektörünüze özel mesleki uygunluğu titizlikle test ediyoruz." },
          { icon: <GraduationCap />, title: "Hedefe Yönelik Dil", desc: "Bir tır şoförü ile bir hemşire farklı kelimelere ihtiyaç duyar. Dil kurslarımız buna göre uyarlanır." },
          { icon: <Users />, title: "Kültürel Uyum", desc: "Sürtüşmeleri en aza indirmek için adayları Alman şirketlerindeki çalışma kültürüne özenle hazırlıyoruz." }
        ]
      },
      ctaTitle: "İşletmeniz için uzmanları güvence altına alın",
      ctaBtn: "Ücretsiz Ön Görüşme"
    },
    en: {
      heroTag: "Focus on Your Industry",
      heroTitle: "We Know Your",
      heroTitleSpan: "Personnel Needs",
      heroDesc: "We specialize in industries where the shortage of skilled workers is greatest and bring exactly the talent you really need.",
      industries: [
        { 
          id: 'logistik',
          icon: <Truck />, 
          title: "Transport & Logistics", 
          subtitle: "Reliable drivers for your fleet",
          desc: "The logistics sector cannot afford standstills. We place experienced professional drivers (CE) from abroad and take care of qualifications.",
          image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=1200",
          features: ["Drivers with CE License", "Module 95 Support", "Pre-interviews by Experts"]
        },
        { 
          id: 'gesundheit',
          icon: <HeartPulse />, 
          title: "Healthcare & Nursing", 
          subtitle: "Qualified staff with empathy",
          desc: "Hospitals and care facilities need more than just hands – they need heart and mind. We bring registered nurses with B2 level German.",
          image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200",
          features: ["Minimum B2 Language Level", "Document Evaluation Support", "Intercultural Coaching"]
        },
        { 
          id: 'handwerk',
          icon: <Wrench />, 
          title: "Crafts & Construction", 
          subtitle: "Real doers for your team",
          desc: "The trades are desperately looking for professionals who can get to work immediately. We recruit craftsmen with proven experience.",
          image: "/images/insaat.jpg",
          features: ["Verified Certificates", "Practical Video Assessments", "Fast Integration"]
        }
      ],
      features: {
        title: "Why industry-specific?",
        items: [
          { icon: <ShieldCheck />, title: "Technical Pre-screening", desc: "We don't just forward resumes; we test technical suitability for your specific industry." },
          { icon: <GraduationCap />, title: "Targeted Language", desc: "A truck driver learns a different vocabulary than a nurse. Our courses are adapted accordingly." },
          { icon: <Users />, title: "Cultural Fit", desc: "We prepare candidates for the work culture in German companies to minimize friction." }
        ]
      },
      ctaTitle: "Secure skilled workers for your company",
      ctaBtn: "Free Consultation"
    }
  };

  const currentLang = pageTexts[i18n.language] ? i18n.language : 'de';
  const tPage = pageTexts[currentLang];

  // Marquee İkonları
  const tickerItems = [
    { name: "LOGISTIK", icon: <Truck className="w-6 h-6 md:w-8 md:h-8 mx-4 md:mx-8 text-[#4F9CF9] opacity-80" /> },
    { name: "PFLEGE", icon: <HeartPulse className="w-6 h-6 md:w-8 md:h-8 mx-4 md:mx-8 text-[#4F9CF9] opacity-80" /> },
    { name: "HANDWERK", icon: <Wrench className="w-6 h-6 md:w-8 md:h-8 mx-4 md:mx-8 text-[#4F9CF9] opacity-80" /> },
    { name: "INDUSTRIE", icon: <Factory className="w-6 h-6 md:w-8 md:h-8 mx-4 md:mx-8 text-[#4F9CF9] opacity-80" /> },
    { name: "GASTRONOMIE", icon: <Utensils className="w-6 h-6 md:w-8 md:h-8 mx-4 md:mx-8 text-[#4F9CF9] opacity-80" /> },
  ];

  return (
    // DIKKAT: Ana kapsayıcıda sticky animasyonunun çalışması için "overflow-x-hidden" KULLANMIYORUZ.
    <div className="min-h-screen bg-[#fcfcfd] flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-24 md:pt-32 pb-0">
        
        {/* 1. HERO ALANI (Sadece bu alana taşmayı önlemek için overflow-hidden eklendi) */}
        <div className="w-full bg-[#fcfcfd] py-12 md:py-16 lg:py-24 px-4 sm:px-6 relative z-20 overflow-hidden">
          <div className="max-w-5xl mx-auto text-center relative">
            
            {/* Arka Plan Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] max-w-[600px] h-[300px] md:h-[400px] bg-[#f4f7fe] rounded-full blur-[80px] md:blur-[100px] -z-10"></div>

            <Reveal direction="up" delay={100}>
              <div className="inline-flex items-center space-x-2 md:space-x-3 bg-white border border-gray-100 px-4 md:px-6 py-2 md:py-2.5 rounded-full mb-6 md:mb-8 shadow-sm">
                <Award className="w-4 h-4 md:w-5 md:h-5 text-[#FFE492]" />
                <span className="text-xs md:text-sm font-bold text-[#043873] uppercase tracking-widest">
                  {tPage.heroTag}
                </span>
              </div>
            </Reveal>
            
            <Reveal direction="up" delay={200}>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-[#043873] mb-6 md:mb-8 tracking-tight leading-[1.1] md:leading-[1.1]">
                {tPage.heroTitle} <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#043873] to-[#4F9CF9] ml-2 sm:ml-0">
                  {tPage.heroTitleSpan}
                </span>
              </h1>
            </Reveal>
            
            <Reveal direction="up" delay={300}>
              <p className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto font-medium mb-10 md:mb-16 px-2">
                {tPage.heroDesc}
              </p>
              
              {/* Yavaş Scroll İkonu */}
              <div className="flex justify-center opacity-70">
                <div className="w-7 h-10 md:w-8 md:h-12 border-2 border-[#043873] rounded-full flex justify-center p-1.5 md:p-2 relative overflow-hidden">
                  <div className="w-1 md:w-1.5 h-2 md:h-3 bg-[#4F9CF9] rounded-full animate-[scrollDown_2s_ease-in-out_infinite]"></div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* 2. PREMIUM KAYAN ŞERİT (MARQUEE) */}
        <div className="w-full bg-white py-8 md:py-12 overflow-hidden flex items-center border-y border-gray-100 relative">
          <div className="absolute inset-y-0 left-0 w-16 md:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-16 md:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
          
          <div className="animate-marquee whitespace-nowrap flex items-center">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center">
                {tickerItems.map((item, idx) => (
                  <React.Fragment key={idx}>
                    <span 
                      className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-wider transition-colors duration-500 hover:!text-[#043873] cursor-default"
                      style={{ 
                        WebkitTextStroke: '1px rgba(4, 56, 115, 0.15)', 
                        color: 'transparent'
                      }}
                    >
                      {item.name}
                    </span>
                    {item.icon}
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 3. MOBİL İÇİN SCROLLYTELLING ANİMASYONU (lg'den küçükler) */}
        {/* ======================================================== */}
        <div className="relative w-full lg:hidden bg-[#021124]">
          
          {/* Arkada Sabit Kalan (Sticky) Tam Ekran Görseller */}
          <div className="sticky top-0 h-[100svh] w-full overflow-hidden z-0">
            {tPage.industries.map((industry, i) => (
              <div 
                key={`mobile-bg-${i}`}
                className={`absolute inset-0 w-full h-full transition-all duration-[1200ms] ease-in-out ${
                  activeSection === i ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                }`}
              >
                <img src={industry.image} alt={industry.title} className="w-full h-full object-cover" />
                {/* Kartlar okunabilsin diye lacivert bir karartma filtresi */}
                <div className="absolute inset-0 bg-[#043873]/50 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#021124] via-[#021124]/60 to-transparent"></div>
              </div>
            ))}
          </div>

          {/* Görsellerin Üzerinden Kayan İçerik Kartları */}
          <div className="relative z-10 -mt-[100svh]">
            {tPage.industries.map((industry, i) => (
              <div 
                key={`mobile-text-${i}`} 
                data-index={i}
                // Desktop array'inden sonraki indexleri mobile veriyoruz ki Observer karışmasın
                ref={el => sectionRefs.current[tPage.industries.length + i] = el}
                className="min-h-[100svh] flex flex-col items-center justify-center px-4 py-20"
              >
                <div className={`transition-all duration-[1000ms] ease-out w-full max-w-md bg-white/95 backdrop-blur-xl p-6 sm:p-8 rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.4)] border border-white/20 ${
                  activeSection === i ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-24 scale-95'
                }`}>
                  
                  <div className="w-16 h-16 bg-[#f4f7fe] rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-inner">
                    {React.cloneElement(industry.icon, { className: "w-8 h-8 text-[#4F9CF9]" })}
                  </div>
                  
                  <div className="text-center">
                    <h4 className="text-[#4F9CF9] font-bold text-xs tracking-widest uppercase mb-2">
                      {industry.subtitle}
                    </h4>
                    <h2 className="text-3xl font-black text-[#043873] mb-4 leading-tight">
                      {industry.title}
                    </h2>
                    <p className="text-base text-gray-600 leading-relaxed mb-6 font-medium">
                      {industry.desc}
                    </p>
                  </div>
                  
                  <div className="space-y-3 mb-8 bg-gray-50/80 p-4 rounded-xl border border-gray-100">
                    {industry.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center text-[#043873] font-bold text-sm">
                        <CheckCircle2 className="w-5 h-5 text-[#4F9CF9] mr-3 flex-shrink-0" />
                        <span className="text-left">{feat}</span>
                      </div>
                    ))}
                  </div>

                  <Link to="/anfrage" className="inline-flex items-center justify-center w-full py-4 text-sm font-bold text-white bg-[#043873] hover:bg-[#4F9CF9] rounded-xl transition-colors group">
                    Personalanfrage starten
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 3. MASAÜSTÜ İÇİN SCROLLYTELLING ANİMASYONU (lg ve üzeri) */}
        {/* ======================================================== */}
        <div className="relative w-full bg-[#fcfcfd] hidden lg:block border-b border-gray-100">
          <div className="max-w-[1600px] mx-auto flex items-start">
            
            {/* SOL TARAF: Ekrana Yapışan Sabit Resimler */}
            <div className="sticky top-0 h-screen w-1/2 flex items-center justify-center p-12 xl:p-20">
              <div className="relative w-full h-[75vh] xl:h-[80vh] rounded-[3rem] overflow-hidden shadow-[0_40px_80px_rgba(4,56,115,0.08)] border border-gray-200/60 bg-white">
                
                {tPage.industries.map((industry, i) => (
                  <div 
                    key={`img-${i}`}
                    className={`absolute inset-0 w-full h-full transition-all duration-[1500ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
                      activeSection === i 
                        ? 'opacity-100 scale-100 filter-none z-10' 
                        : activeSection < i 
                          ? 'opacity-0 scale-110 blur-md z-0' 
                          : 'opacity-0 scale-95 blur-md z-0'
                    }`}
                  >
                    <img src={industry.image} alt={industry.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#043873]/40 via-transparent to-transparent"></div>
                    <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-[3rem]"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* SAĞ TARAF: Kayan Metin Blokları */}
            <div className="w-1/2 py-[15vh] px-12 xl:px-24">
              {tPage.industries.map((industry, i) => (
                <div 
                  key={`text-${i}`} 
                  data-index={i} 
                  ref={el => sectionRefs.current[i] = el}
                  className="min-h-screen flex flex-col justify-center py-20 relative"
                >
                  <div className={`transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    activeSection === i ? 'opacity-100 translate-y-0' : 'opacity-20 translate-y-12 blur-[1px]'
                  }`}>
                    
                    <div className="w-16 h-16 xl:w-20 xl:h-20 bg-white border border-gray-100 rounded-2xl xl:rounded-[1.5rem] flex items-center justify-center mb-6 xl:mb-8 shadow-lg shadow-blue-900/5">
                      {React.cloneElement(industry.icon, { className: "w-8 h-8 xl:w-10 xl:h-10 text-[#4F9CF9]" })}
                    </div>
                    
                    <h4 className="text-[#4F9CF9] font-extrabold text-xs xl:text-sm tracking-[0.2em] uppercase mb-3 xl:mb-4 flex items-center">
                      <span className="w-6 xl:w-8 h-[2px] bg-[#4F9CF9] mr-3 xl:mr-4"></span>
                      {industry.subtitle}
                    </h4>
                    
                    <h2 className="text-4xl xl:text-[4rem] font-black text-[#043873] mb-6 xl:mb-8 leading-[1.1] xl:leading-[1.05] tracking-tight">
                      {industry.title}
                    </h2>
                    
                    <p className="text-lg xl:text-xl text-gray-600 leading-relaxed font-medium mb-8 xl:mb-10 max-w-lg">
                      {industry.desc}
                    </p>
                    
                    <div className="space-y-4 xl:space-y-5 mb-10 xl:mb-12 bg-white p-6 xl:p-8 rounded-2xl xl:rounded-3xl border border-gray-100 shadow-sm">
                      {industry.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center text-base xl:text-lg text-[#043873] font-bold">
                          <div className="w-6 h-6 xl:w-8 xl:h-8 rounded-full bg-[#f4f7fe] flex items-center justify-center mr-3 xl:mr-4 flex-shrink-0">
                            <CheckCircle2 className="w-4 h-4 xl:w-5 xl:h-5 text-[#4F9CF9]" />
                          </div>
                          {feat}
                        </div>
                      ))}
                    </div>

                    <Link to="/anfrage" className="inline-flex items-center space-x-3 text-base xl:text-lg text-[#043873] font-bold hover:text-[#4F9CF9] transition-colors group">
                      <span className="border-b-2 border-[#FFE492] pb-1">Personalanfrage starten</span>
                      <ArrowRight className="w-5 h-5 xl:w-6 xl:h-6 group-hover:translate-x-2 transition-transform" />
                    </Link>

                  </div>
                </div>
              ))}
            </div>
            
          </div>
        </div>

        {/* 4. ÖZELLİKLER (Neden Biz?) KISMI */}
        <div className="bg-white py-16 md:py-24 lg:py-32 relative border-t border-gray-100 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal direction="up">
              <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 lg:mb-20">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#043873]">
                  {tPage.features.title}
                </h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
              {tPage.features.items.map((item, idx) => (
                <Reveal key={idx} direction="up" delay={idx * 150}>
                  <div className="bg-[#f8f9fa] p-8 md:p-10 lg:p-12 rounded-[2rem] lg:rounded-[2.5rem] border border-gray-100 hover:border-[#4F9CF9]/30 shadow-sm hover:shadow-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group h-full hover:-translate-y-2 relative overflow-hidden">
                    <div className="absolute -top-16 -right-16 w-32 h-32 lg:w-40 lg:h-40 bg-[#4F9CF9]/10 rounded-full blur-2xl group-hover:bg-[#4F9CF9]/20 transition-colors duration-500"></div>
                    
                    <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white border border-gray-200 text-[#043873] rounded-2xl lg:rounded-[1.5rem] flex items-center justify-center mb-6 lg:mb-8 group-hover:scale-110 group-hover:border-[#4F9CF9] group-hover:text-[#4F9CF9] transition-all duration-500 shadow-sm">
                      {React.cloneElement(item.icon, { className: "w-8 h-8 lg:w-10 lg:h-10" })}
                    </div>
                    <h3 className="text-xl lg:text-2xl font-bold text-[#043873] mb-3 lg:mb-5">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-base lg:text-lg">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* 5. SİNEMATİK CTA ALANI */}
        <div className="bg-[#043873] py-20 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <Reveal direction="up" delay={100}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 md:mb-12 leading-[1.1]">
                {tPage.ctaTitle}
              </h2>
              <Link 
                to="/anfrage" 
                className="group inline-flex justify-center items-center px-8 md:px-12 py-4 md:py-6 text-lg md:text-xl font-bold rounded-full text-[#043873] bg-[#FFE492] hover:bg-white hover:scale-105 transition-all duration-500 shadow-[0_15px_30px_rgba(255,228,146,0.2)] md:shadow-[0_20px_40px_rgba(255,228,146,0.2)]"
              >
                {tPage.ctaBtn}
                <Play className="ml-3 md:ml-4 w-5 h-5 md:w-6 md:h-6 fill-[#043873] group-hover:translate-x-2 transition-transform duration-500" />
              </Link>
            </Reveal>
          </div>
        </div>

        {/* CSS KEYFRAMES */}
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: inline-block;
            animation: marquee 25s linear infinite;
          }
          @media (min-width: 768px) {
            .animate-marquee { animation: marquee 35s linear infinite; }
          }
          @keyframes scrollDown {
            0% { transform: translateY(0); opacity: 1; }
            100% { transform: translateY(12px); opacity: 0; }
          }
        `}</style>

      </main>
      <Footer />
    </div>
  );
};

export default Branchen;