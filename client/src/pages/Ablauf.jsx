import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  PhoneCall, Users, FileSignature, GraduationCap, 
  PlaneTakeoff, ArrowRight, Sparkles, CheckCircle2
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Ablauf = () => {
  const { i18n } = useTranslation();
  
  // Scrollytelling State'leri
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Scroll Hesaplaması
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const { top, height } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const maxScroll = height - windowHeight;
      let currentScroll = -top;
      
      if (currentScroll < 0) currentScroll = 0;
      if (currentScroll > maxScroll) currentScroll = maxScroll;

      const calcProgress = currentScroll / maxScroll;
      setProgress(calcProgress);

      const totalSteps = 5;
      const stepThreshold = 1 / totalSteps;
      let currentStep = Math.floor(calcProgress / stepThreshold);
      
      if (currentStep >= totalSteps) currentStep = totalSteps - 1;
      setActiveIndex(currentStep);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pageTexts = {
    de: {
      tag: "Der Ablauf",
      title: "Perfektion in",
      titleSpan: "jedem Detail",
      desc: "Erleben Sie einen reibungslosen Vermittlungsprozess. Scrollen Sie nach unten und entdecken Sie, wie wir globale Talente in Ihr Unternehmen integrieren.",
      steps: [
        { image: "/images/analiz.jpeg", icon: <PhoneCall />, title: "Bedarfsanalyse & Beratung", desc: "Wir analysieren Ihren genauen Personalbedarf, besprechen die Anforderungsprofile und klären alle Rahmenbedingungen des beschleunigten Fachkräfteverfahrens (81a)." },
        { image: "/images/secim.webp", icon: <Users />, title: "Rekrutierung & Auswahl", desc: "Über unser Netzwerk in der Türkei und Usbekistan identifizieren wir passende Kandidaten, führen Vorinterviews und prüfen alle fachlichen Qualifikationen." },
        { image: "/images/sozlesme.jpg", icon: <FileSignature />, title: "Vertrag & Behörden (81a)", desc: "Nach Ihrer Zusage starten wir das 81a-Verfahren. Wir kümmern uns um die Anerkennung der Zeugnisse, die Vorabzustimmung der Bundesagentur für Arbeit und den Vertrag." },
        { image: "/images/dil.webp", icon: <GraduationCap />, title: "Sprachkurs & Vorbereitung", desc: "Während die Papiere bearbeitet werden, absolvieren die Kandidaten im Heimatland intensive B1/B2 Deutschkurse und ein interkulturelles Training." },
        { image: "/images/vize.webp", icon: <PlaneTakeoff />, title: "Visum, Einreise & Onboarding", desc: "Sobald das Visum erteilt ist, organisieren wir die Einreise. In Deutschland unterstützen wir bei der Wohnungssuche, Anmeldung und der Integration am Arbeitsplatz." }
      ],
      ctaTitle: "Bereit für den nächsten Schritt?",
      ctaBtn: "Kostenloses Erstgespräch"
    },
    tr: {
      tag: "Sürecimiz",
      title: "Her Detayda",
      titleSpan: "Mükemmellik",
      desc: "Pürüzsüz bir yerleştirme sürecini deneyimleyin. Küresel yetenekleri şirketinize nasıl entegre ettiğimizi keşfetmek için aşağı kaydırın.",
      steps: [
        { image: "/images/analiz.jpeg", icon: <PhoneCall />, title: "İhtiyaç Analizi ve Danışmanlık", desc: "Tam personel ihtiyacınızı analiz ediyor, gereksinim profillerini tartışıyor ve hızlandırılmış uzman prosedürünün (81a) tüm şartlarını netleştiriyoruz." },
        { image: "/images/secim.webp", icon: <Users />, title: "İşe Alım ve Seçim", desc: "Türkiye ve Özbekistan'daki ağımız aracılığıyla uygun adayları belirliyor, ön görüşmeler yapıyor ve tüm mesleki nitelikleri kontrol ediyoruz." },
        { image: "/images/sozlesme.jpg", icon: <FileSignature />, title: "Sözleşme ve Bürokrasi (81a)", desc: "Onayınızın ardından 81a prosedürünü başlatıyoruz. Diploma denkliği, Federal İş Kurumu'nun ön onayı ve iş sözleşmesi ile bizzat ilgileniyoruz." },
        { image: "/images/dil.webp", icon: <GraduationCap />, title: "Dil Kursu ve Hazırlık", desc: "Evraklar işlenirken, adaylar kendi ülkelerinde yoğun B1/B2 Almanca kurslarını ve kültürlerarası eğitimleri tamamlarlar." },
        { image: "/images/vize.webp", icon: <PlaneTakeoff />, title: "Vize, Seyahat ve Uyum", desc: "Vize verilir verilmez seyahati organize ediyoruz. Almanya'da konaklama, kayıt ve işyeri entegrasyonu konularında destek oluyoruz." }
      ],
      ctaTitle: "İlk adıma hazır mısınız?",
      ctaBtn: "Ücretsiz Ön Görüşme"
    },
    en: {
      tag: "The Process",
      title: "Perfection in",
      titleSpan: "Every Detail",
      desc: "Experience a seamless placement process. Scroll down to discover how we integrate global talent into your company.",
      steps: [
        { image: "/images/analiz.jpeg", icon: <PhoneCall />, title: "Needs Analysis & Consultation", desc: "We analyze your exact personnel needs, discuss requirement profiles, and clarify all conditions of the fast-track skilled worker procedure (81a)." },
        { image: "/images/secim.webp", icon: <Users />, title: "Recruitment & Selection", desc: "Through our network in Turkey and Uzbekistan, we identify suitable candidates, conduct preliminary interviews, and verify all professional qualifications." },
        { image: "/images/sozlesme.jpg", icon: <FileSignature />, title: "Contracts & Authorities (81a)", desc: "After your approval, we start the 81a procedure. We take care of credential recognition, the pre-approval of the Federal Employment Agency, and the contract." },
        { image: "/images/dil.webp", icon: <GraduationCap />, title: "Language Course & Prep", desc: "While papers are being processed, candidates complete intensive B1/B2 German courses and intercultural training in their home country." },
        { image: "/images/vize.webp", icon: <PlaneTakeoff />, title: "Visa, Arrival & Onboarding", desc: "Once the visa is issued, we organize the journey. In Germany, we assist with finding accommodation, registration, and workplace integration." }
      ],
      ctaTitle: "Ready for the next step?",
      ctaBtn: "Free Consultation"
    }
  };

  const currentLang = pageTexts[i18n.language] ? i18n.language : 'de';
  const tPage = pageTexts[currentLang];

  return (
    <div className="min-h-screen bg-[#021124] flex flex-col font-sans selection:bg-[#4F9CF9] selection:text-white">
      <Navbar />

      <main className="flex-grow">
        
        {/* 1. GİRİŞ KISMI (Hero) */}
        <div className="w-full bg-[#021124] pt-40 pb-20 px-4 text-center relative z-20 overflow-hidden">
          {/* Arka plan ışıkları */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#4F9CF9]/20 rounded-full blur-[120px] pointer-events-none"></div>
          
          <div className="max-w-4xl mx-auto relative z-10 animate-[fadeInUp_1s_ease-out]">
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-6 py-2.5 rounded-full mb-8 backdrop-blur-xl shadow-lg">
              <Sparkles className="w-5 h-5 text-[#FFE492]" />
              <span className="text-sm font-bold text-white uppercase tracking-widest">
                {tPage.tag}
              </span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-8 tracking-tight leading-[1.1]">
              {tPage.title} <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F9CF9] to-[#FFE492] filter drop-shadow-sm">
                {tPage.titleSpan}
              </span>
            </h1>
            
            <p className="text-xl text-blue-100/70 leading-relaxed max-w-2xl mx-auto font-medium">
              {tPage.desc}
            </p>
            
            {/* Aşağı Kaydır İkonu */}
            <div className="mt-16 animate-bounce flex justify-center">
              <div className="w-8 h-12 border-2 border-white/20 rounded-full flex justify-center p-2 backdrop-blur-sm">
                <div className="w-1.5 h-3 bg-[#4F9CF9] rounded-full animate-[scrollDown_1.5s_infinite]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. STICKY SCROLL ALANI (Apple Tarzı Scrollytelling) */}
        <div ref={containerRef} className="relative h-[600vh] bg-[#021124] w-full">
          
          <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-[#021124]">
            
            {/* Dinamik Arka Plan Parıltıları (İndekse Göre Hareket Eder) */}
            <div 
              className="absolute w-[600px] h-[600px] rounded-full blur-[150px] transition-all duration-1000 ease-in-out opacity-40 pointer-events-none"
              style={{
                background: activeIndex % 2 === 0 ? '#4F9CF9' : '#FFE492',
                top: activeIndex % 2 === 0 ? '-10%' : '50%',
                left: activeIndex % 2 === 0 ? '-10%' : '60%',
              }}
            ></div>

            {/* İki Kolonlu İçerik Alanı */}
            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
              
              {/* SOL KISIM: Parallax Görsel Alanı */}
              <div className="lg:col-span-7 relative h-[40vh] lg:h-[75vh] w-full rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/10 bg-[#0a192f]">
                {tPage.steps.map((step, i) => (
                  <div
                    key={`img-${i}`}
                    className={`absolute inset-0 w-full h-full transition-all duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
                      activeIndex === i 
                        ? 'opacity-100 translate-y-0 scale-100 filter-none' 
                        : activeIndex < i 
                          ? 'opacity-0 translate-y-[20%] scale-110 blur-sm' 
                          : 'opacity-0 -translate-y-[20%] scale-90 blur-sm'
                    }`}
                  >
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Görsel Üzeri Zarif Gradyan */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#021124]/90 via-[#021124]/20 to-transparent"></div>
                    
                    {/* Görsel İçi Mini Etiket */}
                    <div className="absolute bottom-8 left-8 flex items-center space-x-3 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20">
                      <CheckCircle2 className="w-5 h-5 text-[#FFE492]" />
                      <span className="text-white font-semibold text-sm tracking-wide">Schritt {i+1} gesichert</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* SAĞ KISIM: Timeline ve Cam Efektli Metinler */}
              <div className="lg:col-span-5 relative h-[45vh] lg:h-[75vh] flex flex-col justify-center">
                
                {/* Dikey İlerleme Çubuğu (Timeline) */}
                <div className="absolute left-0 lg:-left-8 top-[10%] bottom-[10%] w-1 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="w-full bg-gradient-to-b from-[#4F9CF9] to-[#FFE492] rounded-full transition-all duration-300 ease-out shadow-[0_0_15px_#4F9CF9]"
                    style={{ height: `${Math.max(5, progress * 100)}%` }}
                  ></div>
                </div>

                {tPage.steps.map((step, i) => (
                  <div
                    key={`text-${i}`}
                    className={`absolute w-full pl-6 lg:pl-0 transition-all duration-[1000ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
                      activeIndex === i 
                        ? 'opacity-100 translate-y-0 pointer-events-auto' 
                        : activeIndex < i 
                          ? 'opacity-0 translate-y-24 pointer-events-none' 
                          : 'opacity-0 -translate-y-24 pointer-events-none'
                    }`}
                  >
                    {/* Glassmorphism Kart */}
                    <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 lg:p-12 rounded-[2rem] shadow-2xl">
                      
                      {/* İkon ve Numara */}
                      <div className="flex items-center justify-between mb-8">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4F9CF9]/20 to-[#FFE492]/20 border border-white/10 flex items-center justify-center text-[#FFE492] shadow-inner">
                          {React.cloneElement(step.icon, { className: "w-8 h-8" })}
                        </div>
                        <span className="text-6xl font-black text-white/5 select-none">
                          0{i+1}
                        </span>
                      </div>
                      
                      <h4 className="text-[#4F9CF9] font-bold text-sm lg:text-base mb-3 tracking-[0.2em] uppercase">
                        Phase {i+1} / 05
                      </h4>
                      
                      <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
                        {step.title}
                      </h2>
                      
                      <p className="text-lg text-blue-100/70 leading-relaxed font-medium">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>

        {/* Özel Animasyonlar */}
        <style>{`
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes scrollDown {
            0% { transform: translateY(0); opacity: 1; }
            100% { transform: translateY(15px); opacity: 0; }
          }
        `}</style>

        {/* 3. ALT CTA (Süreç Bittiğinde Gelen Kısım) */}
        <div className="bg-[#021124] py-32 relative z-20 border-t border-white/5 overflow-hidden">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#4F9CF9]/10 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8">
              {tPage.ctaTitle}
            </h2>
            <Link 
              to="/anfrage" 
              className="group inline-flex justify-center items-center px-12 py-6 text-xl font-bold rounded-full text-[#021124] bg-gradient-to-r from-[#FFE492] to-[#FFD700] hover:scale-105 transition-all duration-500 shadow-[0_20px_40px_rgba(255,228,146,0.2)] hover:shadow-[0_30px_60px_rgba(255,228,146,0.4)]"
            >
              {tPage.ctaBtn}
              <ArrowRight className="ml-4 w-7 h-7 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default Ablauf;