import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  ShieldCheck, Globe2, Truck, Settings, Briefcase, 
  FileText, Sparkles, ArrowRight, CheckCircle2, 
  TrendingUp, Users, Clock, ChevronDown
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Leistungen = () => {
  const { i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);

  // Sayfa yüklendiğinde giriş animasyonları
  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  // İstatistikler için Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  // Çok Dilli Metinler 
  const pageTexts = {
    de: {
      heroTitle: "Die Kraft",
      heroTitleSpan: "guter Beratung",
      heroDesc: "Dies ist der Raum, um Ihre Besucher willkommen zu heißen und erstklassige B2B-Lösungen für die Fachkräftegewinnung anzubieten.",
      heroBtn: "Mehr erfahren",
      services: [
        { icon: <Briefcase />, title: "Gezielte Fachkräfte-Rekrutierung", desc: "Wir identifizieren Top-Talente in den Bereichen Logistik, Pflege und Handwerk durch unser etabliertes Netzwerk vor Ort." },
        { icon: <FileText />, title: "Visa & Behördenmanagement", desc: "Komplette Übernahme des beschleunigten Fachkräfteverfahrens (81a), Anerkennung von Zeugnissen und Visa-Prozessen." },
        { icon: <Globe2 />, title: "Intensive Sprachvorbereitung", desc: "Organisation von zertifizierten B1/B2 Sprachkursen und interkulturellem Training im Heimatland vor der Einreise." },
        { icon: <ShieldCheck />, title: "100% Rechtliche Sicherheit", desc: "Rechtskonforme Prozesse, transparente Arbeitsverträge und garantierte Einhaltung des deutschen Arbeitsrechts." },
        { icon: <Truck />, title: "Spezialisierte Branchen", desc: "Expertise in der Vermittlung von LKW-Fahrern (inkl. BKF-Anerkennung), Pflegekräften und technischen Berufen." },
        { icon: <Settings />, title: "Onboarding & Integration", desc: "Wir unterstützen bei der Wohnungssuche, Behördengängen und der erfolgreichen Eingliederung in Ihr Unternehmen." }
      ],
      stats: [
        { icon: <Users />, value: "350+", label: "Erfolgreiche Vermittlungen" },
        { icon: <Clock />, value: "3-5", label: "Monate bis Arbeitsbeginn" },
        { icon: <TrendingUp />, value: "98%", label: "Visa-Erfolgsquote" }
      ],
      faqTitle: "Häufig gestellte Fragen",
      faqs: [
        { q: "Wie lange dauert der gesamte Vermittlungsprozess?", a: "Dank des beschleunigten Fachkräfteverfahrens (81a) dauert der Prozess von der Vertragsunterschrift bis zum Arbeitsbeginn in Deutschland in der Regel 3 bis 5 Monate." },
        { q: "Where are candidates searched for according to your criteria?",  a:"Candidates are sourced from regions determined based on the employer’s needs and industry, through our local networks." },
        { q: "Wo werden Kandidaten entsprechend Ihren Anforderungen gesucht?", a: "Kandidaten werden je nach Bedarf und Branche des Arbeitgebers in den entsprechenden Regionen über unsere lokalen Netzwerke gesucht." }
      ],
      ctaTitle: "Bereit für qualifizierte Fachkräfte?",
      ctaDesc: "Lassen Sie uns gemeinsam Ihren Personalbedarf decken.",
      ctaBtn: "Jetzt Anfrage starten"
    },
    tr: {
      heroTitle: "İyi Danışmanlığın",
      heroTitleSpan: "Gücü",
      heroDesc: "Ziyaretçilerinizi karşılamak ve Türkiye ile Özbekistan'dan nitelikli uzman kazanımı için birinci sınıf B2B çözümleri sunmak için buradayız.",
      heroBtn: "Daha Fazla Bilgi",
      services: [
        { icon: <Briefcase />, title: "Hedefli Uzman İşe Alımı", desc: "Yerel ağımız aracılığıyla lojistik, sağlık ve zanaat sektörlerinde en iyi yetenekleri tespit ediyoruz." },
        { icon: <FileText />, title: "Vize ve Bürokrasi Yönetimi", desc: "Hızlandırılmış uzman prosedürünün (81a), diploma denkliğinin ve vize süreçlerinin tamamen üstlenilmesi." },
        { icon: <Globe2 />, title: "Yoğun Dil Hazırlığı", desc: "Almanya'ya giriş yapmadan önce kendi ülkelerinde sertifikalı B1/B2 dil kurslarının ve kültürlerarası eğitimin organizasyonu." },
        { icon: <ShieldCheck />, title: "%100 Hukuki Güvenlik", desc: "Hukuka uygun süreçler, şeffaf iş sözleşmeleri ve Alman iş hukukuna garantili uyum." },
        { icon: <Truck />, title: "Uzmanlaşmış Sektörler", desc: "Kamyon şoförleri (mesleki yeterlilik tanınması dahil), hemşireler ve teknik mesleklerin yerleştirilmesinde uzmanlık." },
        { icon: <Settings />, title: "Uyum ve Entegrasyon", desc: "Ev arama, resmi kurum işlemleri ve şirketinize başarılı bir şekilde entegre olma konularında destek sağlıyoruz." }
      ],
      stats: [
        { icon: <Users />, value: "350+", label: "Başarılı Yerleştirme" },
        { icon: <Clock />, value: "3-5", label: "İşe Başlama (Ay)" },
        { icon: <TrendingUp />, value: "%98", label: "Vize Başarı Oranı" }
      ],
      faqTitle: "Sıkça Sorulan Sorular",
      faqs: [
        { q: "Tüm yerleştirme süreci ne kadar sürer?", a: "Hızlandırılmış uzman prosedürü (81a) sayesinde, sözleşmenin imzalanmasından Almanya'da işe başlamaya kadar geçen süreç genellikle 3 ila 5 ay sürer." },
        { q: "Adaylar hangi niteliklere sahip?", a: "İşverenin ihtiyaçlarına ve sektörüne göre belirlenen bölgelerde, yerel ağlarımız aracılığıyla aranır." },
        { q: "Vize ve dil kursu masraflarını kim karşılıyor?", a: "Şeffaf B2B paketleri sunuyoruz. Genellikle işveren yerleştirme ücretini karşılarken, biz kursların ve resmi süreçlerin organizasyonunu yönetiyoruz." }
      ],
      ctaTitle: "Nitelikli uzmanlar için hazır mısınız?",
      ctaDesc: "Gelin personel ihtiyacınızı birlikte karşılayalım.",
      ctaBtn: "Hemen Talep Oluşturun"
    },
    en: {
      heroTitle: "The Power",
      heroTitleSpan: "of Good Advice",
      heroDesc: "This is a space to welcome visitors to your site and offer world-class B2B solutions for skilled worker recruitment.",
      heroBtn: "Learn More",
      services: [
        { icon: <Briefcase />, title: "Targeted Skilled Recruitment", desc: "We identify top talent in logistics, healthcare, and crafts through our established local networks." },
        { icon: <FileText />, title: "Visa & Authority Management", desc: "Complete handling of the fast-track skilled worker procedure (81a), credential recognition, and visa processes." },
        { icon: <Globe2 />, title: "Intensive Language Prep", desc: "Organization of certified B1/B2 language courses and intercultural training in the home country before arrival." },
        { icon: <ShieldCheck />, title: "100% Legal Security", desc: "Legally compliant processes, transparent employment contracts, and guaranteed adherence to German labor law." },
        { icon: <Truck />, title: "Specialized Industries", desc: "Expertise in the placement of truck drivers (incl. professional driver recognition), nurses, and technical professions." },
        { icon: <Settings />, title: "Onboarding & Integration", desc: "We provide support with apartment hunting, administrative procedures, and successful integration into your company." }
      ],
      stats: [
        { icon: <Users />, value: "350+", label: "Successful Placements" },
        { icon: <Clock />, value: "3-5", label: "Months to Start Work" },
        { icon: <TrendingUp />, value: "98%", label: "Visa Success Rate" }
      ],
      faqTitle: "Frequently Asked Questions",
      faqs: [
        { q: "How long does the entire placement process take?", a: "Thanks to the fast-track skilled worker procedure (81a), the process from contract signature to starting work in Germany usually takes 3 to 5 months." },
        { q: "İstediğiniz kriterlere göre adaylar nerede aranır?", a: "Adaylar, işverenin ihtiyaçlarına ve sektörüne göre belirlenen bölgelerde, yerel ağlarımız aracılığıyla aranır." },
        { q: "Who covers the costs for visas and language courses?", a: "We offer transparent B2B packages. Typically, the employer covers the placement fee, while we manage the organization of courses and official procedures." }
      ],
      ctaTitle: "Ready for qualified professionals?",
      ctaDesc: "Let's meet your personnel needs together.",
      ctaBtn: "Start Request Now"
    }
  };

  const currentLang = pageTexts[i18n.language] ? i18n.language : 'de';
  const tPage = pageTexts[currentLang];

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans overflow-hidden">
      <Navbar />

      <main className="flex-grow pt-20 pb-0">
        
        {/* 1. YENİ HERO ALANI (GRID + DALGALAR) */}
        <div className="relative w-full h-[85vh] min-h-[600px] bg-[#fbfbfe] flex items-center overflow-hidden">
          
          {/* İnce Izgara (Grid) Arka Planı */}
          <div className="absolute inset-0 z-0 pointer-events-none" style={{
            backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}></div>

          {/* Sol Kısım: Metinler */}
          <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[-10%]">
            <div className={`max-w-xl transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-[#1a173b] leading-[1.1] mb-6">
                {tPage.heroTitle} <br />
                {tPage.heroTitleSpan}
              </h1>
              
              <p className="text-lg text-gray-500 mb-10 max-w-md leading-relaxed font-medium">
                {tPage.heroDesc}
              </p>
              
              <Link 
                to="/anfrage" 
                className="inline-flex justify-center items-center px-10 py-4 text-base font-bold rounded-full text-white bg-gradient-to-r from-[#9f5cff] to-[#7344ff] hover:shadow-[0_10px_30px_rgba(159,92,255,0.4)] transition-all duration-300 hover:-translate-y-1"
              >
                {tPage.heroBtn}
              </Link>
            </div>
          </div>

          {/* Sağ/Alt Kısım: GRAFİK VE DALGA ANİMASYONLARI */}
          <div className="absolute bottom-0 right-0 w-full h-full z-10 pointer-events-none">
            <div className="w-full h-full animate-[floatWave_8s_ease-in-out_infinite_alternate]">
              <svg 
                viewBox="0 0 1440 650" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                className="absolute bottom-0 right-0 w-[150%] md:w-[120%] lg:w-[100%] h-auto object-cover transform translate-x-10 lg:translate-x-0"
                preserveAspectRatio="xMaxYMax slice"
              >
                {/* 1. Arka Soluk Dalga (En alttan yükselir) */}
                <path 
                  className="animate-wave-back"
                  d="M0,500 C200,450 350,600 650,450 C950,300 1150,150 1440,50 L1440,700 L0,700 Z" 
                  fill="url(#wave-grad-1)" 
                />
                
                {/* 2. Ön Ana Dalga (Biraz gecikmeli olarak alttan yükselir) */}
                <path 
                  className="animate-wave-front"
                  d="M0,600 C250,500 400,650 750,400 C1000,200 1200,300 1440,0 L1440,700 L0,700 Z" 
                  fill="url(#wave-grad-2)" 
                />

                {/* 3. Üstteki İnce Beyaz Çizgi (Soldan sağa doğru çizilir) */}
                <path 
                  className="animate-wave-line"
                  d="M0,600 C250,500 400,650 750,400 C1000,200 1200,300 1440,0" 
                  stroke="white" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  fill="none" 
                  opacity="0.7" 
                />

                {/* 4. Grafik Üzerindeki Parlayan Nokta (Çizgi ulaştıktan sonra beliren Pop-in) */}
                <g transform="translate(1000, 200)">
                  <g className="animate-wave-dot">
                    <circle cx="0" cy="0" r="12" fill="white" opacity="0.2" className="animate-[pulse_2s_infinite]" />
                    <circle cx="0" cy="0" r="5" fill="white" />
                    <circle cx="0" cy="0" r="3" fill="#9f5cff" />
                  </g>
                </g>

                {/* Renk Geçiş Tanımlamaları */}
                <defs>
                  <linearGradient id="wave-grad-1" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#c084fc" />
                    <stop offset="100%" stopColor="#60a5fa" />
                  </linearGradient>
                  <linearGradient id="wave-grad-2" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="50%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        {/* GRAFİK ANİMASYONLARI İÇİN CSS - YAVAŞLATILDI */}
        <style>{`
          /* Nefes alma (hafif aşağı yukarı) */
          @keyframes floatWave {
            0% { transform: translateY(0px); }
            100% { transform: translateY(15px); }
          }
          
          /* Soldan Sağa Çizgi Çizme */
          @keyframes drawLine {
            0% { stroke-dashoffset: 2500; }
            100% { stroke-dashoffset: 0; }
          }
          
          /* Arka Dalga Yükselme */
          @keyframes waveRise {
            0% { transform: translateY(400px); opacity: 0; }
            100% { transform: translateY(0); opacity: 0.5; } 
          }
          
          /* Ön Dalga Yükselme */
          @keyframes waveRiseFront {
            0% { transform: translateY(400px); opacity: 0; }
            100% { transform: translateY(0); opacity: 0.95; } 
          }
          
          /* Noktanın Büyüyerek Çıkması */
          @keyframes popIn {
            0% { opacity: 0; transform: scale(0); }
            70% { transform: scale(1.3); }
            100% { opacity: 1; transform: scale(1); }
          }

          /* Sınıflar (Classes) - Süreler Uzatıldı, Gecikmeler Artırıldı */
          .animate-wave-back {
            animation: waveRise 3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            opacity: 0;
          }
          .animate-wave-front {
            animation: waveRiseFront 3s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards;
            opacity: 0;
          }
          .animate-wave-line {
            stroke-dasharray: 2500;
            stroke-dashoffset: 2500;
            animation: drawLine 3.5s cubic-bezier(0.25, 1, 0.5, 1) 1.2s forwards;
          }
          .animate-wave-dot {
            opacity: 0;
            transform-origin: center;
            animation: popIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) 4.0s forwards;
          }
        `}</style>

        {/* 2. STATS BANNER */}
        <div ref={statsRef} className="w-full bg-[#043873] py-16 relative z-10">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
                {tPage.stats.map((stat, idx) => (
                  <div 
                    key={idx} 
                    className={`flex flex-col items-center justify-center text-center p-4 transition-all duration-1000 ease-out ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{ transitionDelay: `${idx * 250}ms` }}
                  >
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4 text-[#FFE492]">
                      {stat.icon}
                    </div>
                    <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-blue-200 text-sm font-medium uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
             </div>
           </div>
        </div>

        {/* 3. SERVICES GRID */}
        <div className="bg-[#f8f9fa] w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tPage.services.map((service, index) => (
                <div 
                  key={index} 
                  className={`bg-white rounded-[24px] p-8 lg:p-10 border border-gray-100 hover:border-[#8b5cf6]/40 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(139,92,246,0.1)] transition-all duration-700 group cursor-default relative overflow-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                  style={{ transitionDelay: `${index * 150 + 600}ms` }}
                >
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-[#f3e8ff] to-transparent rounded-full -z-10 group-hover:scale-150 transition-transform duration-700 ease-out"></div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#8b5cf6] to-[#4F9CF9] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  
                  <div className="w-16 h-16 bg-[#f8f9fa] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#8b5cf6] transition-colors duration-500">
                    {React.cloneElement(service.icon, { className: "w-8 h-8 text-[#043873] group-hover:text-white transition-colors duration-500" })}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-[#1a173b] mb-4 leading-snug">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. FAQ SECTION */}
        <div className="bg-white py-24 border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a173b] text-center mb-12">
              {tPage.faqTitle}
            </h2>
            <div className="space-y-4">
              {tPage.faqs.map((faq, idx) => (
                <div 
                  key={idx} 
                  className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button 
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center bg-gray-50 hover:bg-[#f3e8ff]/50 transition-colors"
                  >
                    <span className="font-bold text-[#1a173b] pr-8">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-500 flex-shrink-0 ${openFaq === idx ? 'rotate-180 text-[#8b5cf6]' : ''}`} />
                  </button>
                  <div 
                    className={`px-6 transition-all duration-500 ease-in-out ${openFaq === idx ? 'max-h-48 py-5 opacity-100' : 'max-h-0 py-0 opacity-0 overflow-hidden'}`}
                  >
                    <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 5. BOTTOM CTA */}
        <div className="bg-[#fbfbfe] py-24 relative overflow-hidden border-t border-gray-100">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#c084fc] rounded-full opacity-10 blur-[100px] pointer-events-none"></div>
          
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-[#1a173b] mb-6">
              {tPage.ctaTitle}
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              {tPage.ctaDesc}
            </p>
            <Link 
              to="/anfrage" 
              className="group inline-flex justify-center items-center px-10 py-5 text-lg font-bold rounded-full text-white bg-gradient-to-r from-[#9f5cff] to-[#7344ff] hover:shadow-[0_15px_30px_rgba(159,92,255,0.4)] hover:-translate-y-1 transition-all duration-500"
            >
              {tPage.ctaBtn}
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default Leistungen;