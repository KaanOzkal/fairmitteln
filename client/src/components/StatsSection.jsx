import React, { useEffect, useState, useRef } from 'react';
import { 
  Users, Building, CheckCircle, Briefcase, Download, 
  TrendingUp, Activity, BarChart3, MapPin
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

// --- Animasyonlu Sayaç Bileşeni ---
const AnimatedCounter = ({ end, suffix = "", isVisible }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, isVisible]);

  return <span>{count}{suffix}</span>;
};

const StatsSection = () => {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Çok dilli metinler
  const texts = {
    de: {
      title: "Dashboard & Performance",
      subtitle: "Echtzeit-Daten unserer Vermittlungserfolge",
      statsTitle: "Aktuelle Statistiken",
      statsSub: "Vermittlungs-Zusammenfassung",
      card1Title: "Erfolgreiche Vermittlungen",
      card1Desc: "diesen Monat",
      card2Title: "Aktive Unternehmen",
      card2Desc: "diesen Monat",
      card3Title: "Visa-Erfolgsquote",
      card3Desc: "diesen Monat",
      card4Title: "Geprüfte Kandidaten",
      card4Desc: "diesen Monat",
      chart1: "Bewerber Zuwachs",
      chart2: "Vermittlungen (Monat)",
      chart3: "Kundenzufriedenheit",
      chart4: "Ziel vs Realität",
      chart5: "Top Branchen",
      chart6: "Sales Mapping by Country",
      chart6Sub: "Präsenz in Deutschland, Türkei & Usbekistan",
      chart7: "Volume vs Service Level",
      lastMonth: "Letzter Monat",
      thisMonth: "Dieser Monat",
      logistics: "Logistik",
      technician: "Technischer Mitarbeiter",
      health: "Gesundheit",
      other: "Sonstige"
    },
    tr: {
      title: "Gösterge Paneli ve Performans",
      subtitle: "Yerleştirme başarılarımızın anlık verileri",
      statsTitle: "Güncel İstatistikler",
      statsSub: "Yerleştirme Özeti",
      card1Title: "Başarılı Yerleştirmeler",
      card1Desc: "bu ay",
      card2Title: "Aktif Şirketler",
      card2Desc: "bu ay",
      card3Title: "Vize Başarı Oranı",
      card3Desc: "bu ay",
      card4Title: "Onaylı Adaylar",
      card4Desc: "bu ay",
      chart1: "Aday Artışı",
      chart2: "Yerleştirmeler (Aylık)",
      chart3: "Müşteri Memnuniyeti",
      chart4: "Hedef ve Gerçekleşen",
      chart5: "En Popüler Sektörler",
      chart6: "Ülkelere Göre Dağılım",
      chart6Sub: "Almanya, Türkiye ve Özbekistan Ağı",
      chart7: "Hacim ve Hizmet Seviyesi",
      lastMonth: "Geçen Ay",
      thisMonth: "Bu Ay",
      logistics: "Lojistik",
      technician: "Teknik Eleman",
      health: "Sağlık",
      other: "Diğer"
    },
    en: {
      title: "Dashboard & Performance",
      subtitle: "Real-time data of our placement success",
      statsTitle: "Current Statistics",
      statsSub: "Placement Summary",
      card1Title: "Successful Placements",
      card1Desc: "this month",
      card2Title: "Active Companies",
      card2Desc: "this month",
      card3Title: "Visa Success Rate",
      card3Desc: "this month",
      card4Title: "Verified Candidates",
      card4Desc: "this month",
      chart1: "Applicant Growth",
      chart2: "Placements (Monthly)",
      chart3: "Customer Satisfaction",
      chart4: "Target vs Reality",
      chart5: "Top Industries",
      chart6: "Sales Mapping by Country",
      chart6Sub: "Presence in Germany, Turkey & Uzbekistan",
      chart7: "Volume vs Service Level",
      lastMonth: "Last Month",
      thisMonth: "This Month",
      logistics: "Logistics",
      technician: "Technical Staff",
      health: "Healthcare",
      other: "Other"
    }
  };

  const currentLang = texts[i18n.language] ? i18n.language : 'de';
  const tDash = texts[currentLang];

  return (
    <section className="py-24 bg-gradient-to-br from-[#f4f7fe] to-[#e6ecf8] font-sans relative overflow-hidden" ref={sectionRef} id="stats">
      
      {/* Özel Animasyon CSS Sınıfları (SVG Çizimleri ve Kayan Çizgiler İçin) */}
      <style>
        {`
          .draw-line { stroke-dasharray: 200; stroke-dashoffset: 200; animation: draw 2s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
          .draw-line-delay { stroke-dasharray: 200; stroke-dashoffset: 200; animation: draw 2s cubic-bezier(0.4, 0, 0.2, 1) 0.5s forwards; }
          @keyframes draw { to { stroke-dashoffset: 0; } }
          
          .flow-line { stroke-dasharray: 4, 4; animation: flow 20s linear infinite; }
          @keyframes flow { to { stroke-dashoffset: -100; } }

          .reveal-up { opacity: 0; transform: translateY(30px); transition: all 0.8s cubic-bezier(0.5, 0, 0, 1); }
          .reveal-up.active { opacity: 1; transform: translateY(0); }
        `}
      </style>

      {/* Arka Plan Dekoratif Elementleri */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none"></div>
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-purple-200/40 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-1/2 -left-32 w-96 h-96 bg-blue-200/40 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Üst Başlık */}
        <div className={`mb-12 text-center reveal-up ${isVisible ? 'active' : ''}`} style={{ transitionDelay: '0ms' }}>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1b2559] mb-4 tracking-tight">
            {tDash.title}
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">{tDash.subtitle}</p>
        </div>

        {/* Dashboard Grid Yapısı */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* 1. SATIR - SOL (4 Renkli Kart) */}
          <div className={`lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-[24px] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 reveal-up ${isVisible ? 'active' : ''}`} style={{ transitionDelay: '100ms' }}>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-2xl font-bold text-[#1b2559]">{tDash.statsTitle}</h3>
                <p className="text-sm text-gray-500 mt-1">{tDash.statsSub}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
              {/* Pembe Kart */}
              <div className="relative overflow-hidden bg-gradient-to-br from-[#ffe2e5] to-[#fff0f2] rounded-[20px] p-6 group hover:-translate-y-1 hover:shadow-lg hover:shadow-[#fa5a7d]/20 transition-all duration-300">
                <div className="absolute -right-4 -top-4 w-20 h-20 bg-[#fa5a7d]/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                <div className="w-12 h-12 bg-gradient-to-br from-[#fa5a7d] to-[#ff7b99] rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-3xl font-bold text-[#1b2559] mb-1">
                  <AnimatedCounter end={350} suffix="+" isVisible={isVisible} />
                </h4>
                <p className="text-sm text-[#1b2559]/80 font-medium mb-2">{tDash.card1Title}</p>
                <div className="inline-flex items-center gap-1 text-xs font-bold text-[#fa5a7d] bg-white/50 px-2 py-1 rounded-lg">
                  <TrendingUp className="w-3 h-3" /> +8% {tDash.card1Desc}
                </div>
              </div>

              {/* Sarı Kart */}
              <div className="relative overflow-hidden bg-gradient-to-br from-[#fff4de] to-[#fff9ee] rounded-[20px] p-6 group hover:-translate-y-1 hover:shadow-lg hover:shadow-[#ff947a]/20 transition-all duration-300">
                <div className="absolute -right-4 -top-4 w-20 h-20 bg-[#ff947a]/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                <div className="w-12 h-12 bg-gradient-to-br from-[#ff947a] to-[#ffaa96] rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-3xl font-bold text-[#1b2559] mb-1">
                  <AnimatedCounter end={85} suffix="" isVisible={isVisible} />
                </h4>
                <p className="text-sm text-[#1b2559]/80 font-medium mb-2">{tDash.card2Title}</p>
                <div className="inline-flex items-center gap-1 text-xs font-bold text-[#ff947a] bg-white/50 px-2 py-1 rounded-lg">
                  <TrendingUp className="w-3 h-3" /> +5% {tDash.card2Desc}
                </div>
              </div>

              {/* Yeşil Kart */}
              <div className="relative overflow-hidden bg-gradient-to-br from-[#dcfce7] to-[#eefcf3] rounded-[20px] p-6 group hover:-translate-y-1 hover:shadow-lg hover:shadow-[#3cd856]/20 transition-all duration-300">
                <div className="absolute -right-4 -top-4 w-20 h-20 bg-[#3cd856]/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                <div className="w-12 h-12 bg-gradient-to-br from-[#3cd856] to-[#5bed73] rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-3xl font-bold text-[#1b2559] mb-1">
                  <AnimatedCounter end={98} suffix="%" isVisible={isVisible} />
                </h4>
                <p className="text-sm text-[#1b2559]/80 font-medium mb-2">{tDash.card3Title}</p>
                <div className="inline-flex items-center gap-1 text-xs font-bold text-[#3cd856] bg-white/50 px-2 py-1 rounded-lg">
                  <TrendingUp className="w-3 h-3" /> +1.2% {tDash.card3Desc}
                </div>
              </div>

              {/* Mor Kart */}
              <div className="relative overflow-hidden bg-gradient-to-br from-[#f3e8ff] to-[#f8f3ff] rounded-[20px] p-6 group hover:-translate-y-1 hover:shadow-lg hover:shadow-[#bf83ff]/20 transition-all duration-300">
                <div className="absolute -right-4 -top-4 w-20 h-20 bg-[#bf83ff]/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                <div className="w-12 h-12 bg-gradient-to-br from-[#bf83ff] to-[#d0a3ff] rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-3xl font-bold text-[#1b2559] mb-1">
                  <AnimatedCounter end={1200} suffix="+" isVisible={isVisible} />
                </h4>
                <p className="text-sm text-[#1b2559]/80 font-medium mb-2">{tDash.card4Title}</p>
                <div className="inline-flex items-center gap-1 text-xs font-bold text-[#bf83ff] bg-white/50 px-2 py-1 rounded-lg">
                  <TrendingUp className="w-3 h-3" /> +12% {tDash.card4Desc}
                </div>
              </div>
            </div>
          </div>

          {/* 1. SATIR - SAĞ (Ziyaretçi Line Grafiği) */}
          <div className={`bg-white/80 backdrop-blur-xl rounded-[24px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 flex flex-col group reveal-up ${isVisible ? 'active' : ''}`} style={{ transitionDelay: '200ms' }}>
            <h3 className="text-xl font-bold text-[#1b2559] mb-6">{tDash.chart1}</h3>
            <div className="flex-grow relative w-full h-40">
              {isVisible && (
                <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="25" x2="100" y2="25" stroke="#f1f5f9" strokeWidth="0.5" />
                  <line x1="0" y1="0" x2="100" y2="0" stroke="#f1f5f9" strokeWidth="0.5" />
                  
                  {/* Animated Lines */}
                  <path className="draw-line" d="M0,45 C20,25 40,50 60,30 C80,10 100,20 100,20" fill="none" stroke="#bf83ff" strokeWidth="2.5" strokeLinecap="round" />
                  <path className="draw-line" d="M0,40 C20,20 40,45 60,25 C80,5 100,15 100,15" fill="none" stroke="#fa5a7d" strokeWidth="2.5" strokeLinecap="round" />
                  <path className="draw-line" d="M0,20 C20,0 40,30 60,10 C80,-5 100,5 100,5" fill="none" stroke="#3cd856" strokeWidth="2.5" strokeLinecap="round" />
                  
                  {/* Glowing Dots */}
                  <circle cx="60" cy="10" r="3" fill="#3cd856" className="animate-pulse" />
                  <circle cx="60" cy="25" r="3" fill="#fa5a7d" className="animate-pulse delay-75" />
                  <circle cx="60" cy="30" r="3" fill="#bf83ff" className="animate-pulse delay-150" />
                  
                  <line x1="60" y1="10" x2="60" y2="50" stroke="#1b2559" strokeDasharray="2,2" strokeWidth="0.5" className="opacity-20" />
                </svg>
              )}
            </div>
            <div className="flex justify-center gap-4 mt-4 text-xs font-semibold text-gray-500">
              <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-[#bf83ff] rounded-full shadow-[0_0_8px_#bf83ff]"></div> Lojistik</span>
              <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-[#fa5a7d] rounded-full shadow-[0_0_8px_#fa5a7d]"></div> Teknik</span>
              <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-[#3cd856] rounded-full shadow-[0_0_8px_#3cd856]"></div> Sağlık</span>
            </div>
          </div>

          {/* 2. SATIR - SOL (Bar Chart) */}
          <div className={`bg-white/80 backdrop-blur-xl rounded-[24px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 hover:shadow-xl transition-shadow duration-500 reveal-up ${isVisible ? 'active' : ''}`} style={{ transitionDelay: '300ms' }}>
            <h3 className="text-xl font-bold text-[#1b2559] mb-6">{tDash.chart2}</h3>
            <div className="flex items-end justify-between h-40 mt-4 gap-2">
              {[60, 80, 40, 70, 50, 90, 65].map((val, i) => (
                <div key={i} className="flex gap-1.5 w-full h-full items-end justify-center group/bar cursor-pointer">
                  {/* Mavi Bar */}
                  <div className="w-full max-w-[14px] bg-gradient-to-t from-[#0070f3] to-[#0095ff] rounded-t-md transition-all duration-[1500ms] ease-out group-hover/bar:bg-gradient-to-t group-hover/bar:from-[#0057be] group-hover/bar:to-[#0070f3] relative" 
                       style={{ height: isVisible ? `${val}%` : '0%' }}>
                  </div>
                  {/* Yeşil Bar */}
                  <div className="w-full max-w-[14px] bg-gradient-to-t from-[#00b076] to-[#00e096] rounded-t-md transition-all duration-[1500ms] ease-out delay-[200ms] group-hover/bar:bg-gradient-to-t group-hover/bar:from-[#008f5e] group-hover/bar:to-[#00b076]" 
                       style={{ height: isVisible ? `${val * 0.7}%` : '0%' }}>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-5 mt-6 text-xs font-semibold text-gray-500">
              <span className="flex items-center gap-1.5"><div className="w-3 h-3 bg-[#0095ff] rounded-md"></div> Anfragen</span>
              <span className="flex items-center gap-1.5"><div className="w-3 h-3 bg-[#00e096] rounded-md"></div> Erfolgreich</span>
            </div>
          </div>

          {/* 2. SATIR - ORTA (Area Chart) */}
          <div className={`bg-white/80 backdrop-blur-xl rounded-[24px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 flex flex-col hover:shadow-xl transition-shadow duration-500 reveal-up ${isVisible ? 'active' : ''}`} style={{ transitionDelay: '400ms' }}>
            <h3 className="text-xl font-bold text-[#1b2559] mb-4">{tDash.chart3}</h3>
            <div className="flex-grow relative w-full h-32 mt-4">
              {isVisible && (
                <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#00e096" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#00e096" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {/* Animasyonlu Gradient Alan */}
                  <path className="animate-[pulse_4s_ease-in-out_infinite]" d="M0,20 C20,10 40,30 60,15 C80,0 100,20 100,20 L100,50 L0,50 Z" fill="url(#grad1)" style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 2s' }} />
                  {/* Çizgiler */}
                  <path className="draw-line" d="M0,20 C20,10 40,30 60,15 C80,0 100,20 100,20" fill="none" stroke="#00e096" strokeWidth="2.5" strokeLinecap="round" />
                  <path className="draw-line-delay" d="M0,35 C20,25 40,40 60,35 C80,30 100,25 100,25" fill="none" stroke="#0095ff" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4,4" />
                </svg>
              )}
            </div>
            <div className="flex justify-center gap-8 mt-4 text-sm font-bold text-[#1b2559] bg-gray-50/50 rounded-xl p-3">
              <div className="text-center">
                <p className="text-xs text-gray-400 font-semibold mb-1">{tDash.lastMonth}</p>
                <span className="text-[#0095ff]">📈 %5</span>
              </div>
              <div className="w-px h-8 bg-gray-200"></div>
              <div className="text-center">
                <p className="text-xs text-gray-400 font-semibold mb-1">{tDash.thisMonth}</p>
                <span className="text-[#00e096]">🚀 %12</span>
              </div>
            </div>
          </div>

          {/* 2. SATIR - SAĞ (Target vs Reality) */}
          <div className={`bg-white/80 backdrop-blur-xl rounded-[24px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 hover:shadow-xl transition-shadow duration-500 reveal-up ${isVisible ? 'active' : ''}`} style={{ transitionDelay: '500ms' }}>
            <h3 className="text-xl font-bold text-[#1b2559] mb-6">{tDash.chart4}</h3>
            <div className="flex items-end justify-between h-32 mt-4 gap-3 relative">
              {/* Arka Plan Rehber Çizgileri */}
              <div className="absolute w-full h-full flex flex-col justify-between z-0">
                <div className="border-b border-gray-100 w-full h-0"></div>
                <div className="border-b border-gray-100 w-full h-0"></div>
                <div className="border-b border-gray-100 w-full h-0"></div>
              </div>
              
              {[40, 60, 50, 80, 70, 90, 85].map((val, i) => (
                <div key={i} className="flex flex-col gap-1 w-full h-full items-center justify-end z-10 group/target cursor-pointer">
                  <div className="w-full max-w-[16px] bg-[#ffcf00] rounded-md transition-all duration-[1200ms] ease-bounce group-hover/target:-translate-y-1 shadow-sm" 
                       style={{ height: isVisible ? `${val}%` : '0%' }}></div>
                  <div className="w-full max-w-[16px] bg-[#3cd856] rounded-md transition-all duration-[1200ms] delay-[150ms] ease-bounce group-hover/target:-translate-y-1 shadow-sm" 
                       style={{ height: isVisible ? `${val * 0.8}%` : '0%' }}></div>
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex justify-between items-center text-sm p-3 bg-green-50/50 rounded-xl hover:bg-green-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-sm">
                    <Briefcase className="w-4 h-4 text-green-500" />
                  </div> 
                  <span className="font-bold text-[#1b2559]">Reality Sales</span>
                </div>
                <span className="text-green-500 font-bold bg-white px-2 py-1 rounded-md shadow-sm">+8.823%</span>
              </div>
              <div className="flex justify-between items-center text-sm p-3 bg-yellow-50/50 rounded-xl hover:bg-yellow-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-sm">
                    <Activity className="w-4 h-4 text-yellow-500" />
                  </div> 
                  <span className="font-bold text-[#1b2559]">Target Sales</span>
                </div>
                <span className="text-yellow-500 font-bold bg-white px-2 py-1 rounded-md shadow-sm">-12.122%</span>
              </div>
            </div>
          </div>

          {/* 3. SATIR - SOL (Progress Bars) */}
          <div className={`bg-white/80 backdrop-blur-xl rounded-[24px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 hover:shadow-xl transition-shadow duration-500 reveal-up ${isVisible ? 'active' : ''}`} style={{ transitionDelay: '600ms' }}>
            <h3 className="text-xl font-bold text-[#1b2559] mb-8">{tDash.chart5}</h3>
            <div className="space-y-7">
              {[
                { name: tDash.logistics, val: 95, color: '#0095ff', bg: 'bg-blue-50' },
                { name: tDash.technician, val: 78, color: '#00e096', bg: 'bg-green-50' },
                { name: tDash.health, val: 89, color: '#bf83ff', bg: 'bg-purple-50' },
                { name: tDash.other, val: 56, color: '#ff947a', bg: 'bg-orange-50' }
              ].map((item, i) => (
                <div key={i} className="group">
                  <div className="flex justify-between text-sm font-semibold mb-3">
                    <span className="text-gray-400 flex items-center gap-2">
                      <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs ${item.bg}`} style={{ color: item.color }}>0{i+1}</span> 
                      <span className="text-[#1b2559] text-base group-hover:translate-x-1 transition-transform">{item.name}</span>
                    </span>
                    <span className="font-bold text-lg" style={{ color: item.color }}>{item.val}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden shadow-inner">
                    <div className="h-2.5 rounded-full transition-all duration-[1500ms] ease-out relative" 
                         style={{ width: isVisible ? `${item.val}%` : '0%', backgroundColor: item.color, transitionDelay: `${i * 100}ms` }}>
                      {/* Animasyonlu Parlama Efekti */}
                      <div className="absolute top-0 right-0 bottom-0 w-10 bg-white/30 blur-[2px] animate-[pulse_2s_infinite]"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. SATIR - ORTA (TÜRKİYE, ALMANYA, ÖZBEKİSTAN RENKLİ HARİTA) */}
          <div className={`bg-white/80 backdrop-blur-xl rounded-[24px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 flex flex-col relative overflow-hidden group reveal-up ${isVisible ? 'active' : ''}`} style={{ transitionDelay: '700ms' }}>
            <h3 className="text-xl font-bold text-[#1b2559] mb-1">{tDash.chart6}</h3>
            <p className="text-xs text-gray-500 mb-6">{tDash.chart6Sub}</p>
            
            <div className="relative flex-grow flex items-center justify-center w-full min-h-[220px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#f4f7fe]/80 to-white border border-blue-50/50">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
              
              <div className="relative w-full max-w-[400px] z-10 transition-transform duration-700 group-hover:scale-105">
                
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg" 
                  alt="World Map" 
                  className="w-full h-auto opacity-[0.15] grayscale contrast-200 drop-shadow-md" 
                />
                
                {/* Almanya (Turuncu) */}
                <div className="absolute top-[26%] left-[51%] flex flex-col items-center group/pin cursor-pointer">
                  <div className="absolute w-6 h-6 bg-[#ff947a]/30 rounded-full animate-ping"></div>
                  <div className="w-3 h-3 bg-[#ff947a] rounded-full shadow-[0_0_12px_#ff947a] z-10 border border-white"></div>
                  <div className="absolute -top-10 bg-white/90 backdrop-blur shadow-xl rounded-lg px-3 py-1.5 text-xs font-bold text-[#1b2559] opacity-0 group-hover/pin:opacity-100 group-hover/pin:-translate-y-2 transition-all whitespace-nowrap z-30 border border-gray-100 flex items-center gap-1 pointer-events-none">
                    <MapPin className="w-3 h-3 text-[#ff947a]" /> Deutschland (Ziel)
                  </div>
                </div>

                {/* Türkiye (Mor - Merkez) */}
                <div className="absolute top-[33%] left-[56%] flex flex-col items-center group/pin cursor-pointer z-20">
                  <div className="absolute w-8 h-8 bg-[#bf83ff]/30 rounded-full animate-ping delay-75"></div>
                  <div className="w-4 h-4 bg-[#bf83ff] rounded-full shadow-[0_0_15px_#bf83ff] flex items-center justify-center border-2 border-white z-10">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                  <div className="absolute -bottom-10 bg-white/90 backdrop-blur shadow-xl rounded-lg px-3 py-1.5 text-xs font-bold text-[#1b2559] opacity-0 group-hover/pin:opacity-100 group-hover/pin:translate-y-2 transition-all whitespace-nowrap z-30 border border-gray-100 flex items-center gap-1 pointer-events-none">
                    <MapPin className="w-3 h-3 text-[#bf83ff]" /> Türkiye (Hub)
                  </div>
                </div>

                {/* Özbekistan (Yeşil) */}
                <div className="absolute top-[30%] left-[63%] flex flex-col items-center group/pin cursor-pointer">
                  <div className="absolute w-6 h-6 bg-[#3cd856]/30 rounded-full animate-ping delay-150"></div>
                  <div className="w-3 h-3 bg-[#3cd856] rounded-full shadow-[0_0_12px_#3cd856] z-10 border border-white"></div>
                  <div className="absolute -top-10 bg-white/90 backdrop-blur shadow-xl rounded-lg px-3 py-1.5 text-xs font-bold text-[#1b2559] opacity-0 group-hover/pin:opacity-100 group-hover/pin:-translate-y-2 transition-all whitespace-nowrap z-30 border border-gray-100 flex items-center gap-1 pointer-events-none">
                    <MapPin className="w-3 h-3 text-[#3cd856]" /> Usbekistan (Quelle)
                  </div>
                </div>

                {/* Akan Bağlantı Çizgileri */}
                {isVisible && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-md" style={{ zIndex: 0 }}>
                    <path className="flow-line" d="M 56% 33% Q 53% 28% 51% 26%" fill="none" stroke="#bf83ff" strokeWidth="2" />
                    <path className="flow-line" d="M 63% 30% Q 59% 34% 56% 33%" fill="none" stroke="#3cd856" strokeWidth="2" style={{ animationDirection: 'reverse' }} />
                  </svg>
                )}

              </div>
            </div>
          </div>

          {/* 3. SATIR - SAĞ (Volume vs Service Level) */}
          <div className={`bg-white/80 backdrop-blur-xl rounded-[24px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 hover:shadow-xl transition-shadow duration-500 reveal-up ${isVisible ? 'active' : ''}`} style={{ transitionDelay: '800ms' }}>
            <h3 className="text-xl font-bold text-[#1b2559] mb-6">{tDash.chart7}</h3>
            <div className="flex items-end justify-between h-40 mt-4 gap-4 px-2">
              {[80, 50, 70, 40, 60, 30].map((val, i) => (
                <div key={i} className="flex flex-col w-full h-full items-center justify-end group/vol">
                  <div className="w-full max-w-[20px] bg-gradient-to-t from-[#0057be] to-[#0095ff] rounded-md transition-all duration-[1200ms] ease-out group-hover/vol:scale-y-110 origin-bottom" 
                       style={{ height: isVisible ? `${val}%` : '0%' }}></div>
                  <div className="w-full max-w-[20px] bg-gradient-to-t from-[#008f5e] to-[#00e096] rounded-md transition-all duration-[1200ms] delay-100 ease-out -mt-2 border-2 border-white group-hover/vol:scale-y-110 origin-bottom z-10" 
                       style={{ height: isVisible ? `${val * 0.4}%` : '0%' }}></div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center gap-8 mt-8 text-sm font-bold text-[#1b2559] bg-gray-50/50 rounded-xl p-4 border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-[#0095ff] rounded-md shadow-sm"></div> 
                <div className="flex flex-col">
                  <span className="text-gray-400 font-medium text-xs">Volume</span>
                  <span className="text-lg">1,135</span>
                </div>
              </div>
              <div className="w-px h-10 bg-gray-200"></div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-[#00e096] rounded-md shadow-sm"></div> 
                <div className="flex flex-col">
                  <span className="text-gray-400 font-medium text-xs">Services</span>
                  <span className="text-lg">635</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default StatsSection;