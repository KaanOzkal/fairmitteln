import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  Globe2, Target, HeartHandshake, ShieldCheck, 
  Compass, ArrowRight, Play, CheckCircle2, 
  Building2, Users2, Award
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

// --- PÜRÜZSÜZ KAYDIRMA ANİMASYONU (SCROLL REVEAL) ---
const Reveal = ({ children, delay = 0, direction = "up", className = "", threshold = 0.15 }) => {
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

  const baseStyles = "transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)]";
  
  const getTransform = () => {
    if (isVisible) return "translate-y-0 translate-x-0 opacity-100 scale-100 blur-none";
    switch (direction) {
      case "up": return "translate-y-24 opacity-0 scale-95 blur-[2px]";
      case "left": return "translate-x-24 opacity-0 blur-[2px]";
      case "right": return "-translate-x-24 opacity-0 blur-[2px]";
      case "scale": return "translate-y-0 opacity-0 scale-90 blur-[4px]";
      default: return "opacity-0";
    }
  };

  return (
    <div ref={ref} className={`${baseStyles} ${getTransform()} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

const UberUns = () => {
  const { i18n } = useTranslation();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStory, setActiveStory] = useState(0);
  const timelineRef = useRef(null);
  const storyRefs = useRef([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sayfa kaydırma yüzdesini hesaplama (Timeline çizgisi için)
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const { top, height } = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const scrolled = windowHeight - top;
      const maxScroll = height + windowHeight;
      const progress = Math.max(0, Math.min(1, scrolled / maxScroll));
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hangi hikaye adımının okunduğunu tespit etme
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveStory(Number(entry.target.getAttribute('data-index')));
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    storyRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // --- ÇOK DİLLİ METİNLER ---
  const pageTexts = {
    de: {
      heroTag: "Wer wir sind",
      heroTitle: "Brücken bauen.",
      heroTitleSpan: "Potenziale entfalten.",
      heroDesc: "Wir sind mehr als eine Personalvermittlung. Wir sind der direkte Weg zwischen dem deutschen Fachkräftemangel und hochqualifizierten Talenten aus der Türkei und Usbekistan.",
      
      missionTitle: "Unsere Mission",
      missionDesc: "Deutschlands Wirtschaft braucht Macher. Wir finden sie. Mit rechtlicher Expertise (81a), interkulturellem Verständnis und einem unermüdlichen Fokus auf Qualität bringen wir Unternehmen und Menschen nachhaltig zusammen.",
      
      storyTitle: "Unsere Reise in 3 Phasen",
      stories: [
        {
          title: "Die Vision",
          subtitle: "Grenzenlose Expertise",
          desc: "Wir erkannten früh: Der lokale Markt ist erschöpft, aber der globale Talentpool ist voll von motivierten Fachkräften. Unsere Vision war es, diese Lücke mit einem ethischen, transparenten Prozess zu schließen.",
          image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200"
        },
        {
          title: "Die Brücke",
          subtitle: "Türkei, Usbekistan & Deutschland",
          desc: "Durch den Aufbau starker Netzwerke vor Ort in der Türkei und Usbekistan filtern wir die besten Talente. Wir investieren in ihre sprachliche und fachliche Vorbereitung, lange bevor sie deutschen Boden betreten.",
          image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200"
        },
        {
          title: "Der Erfolg",
          subtitle: "Nachhaltige Integration",
          desc: "Unser Job endet nicht mit dem Visum. Wahre Vermittlung bedeutet erfolgreiche Integration. Wir begleiten Unternehmen und Fachkräfte bei den ersten Schritten in Deutschland, um langfristige Bindungen zu schaffen.",
          image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1200"
        }
      ],
      
      valuesTitle: "Werte, die uns leiten",
      values: [
        { icon: <ShieldCheck />, title: "Transparenz", desc: "Keine versteckten Kosten, klare Kommunikation und realistische Zeitpläne für beide Seiten." },
        { icon: <HeartHandshake />, title: "Menschlichkeit", desc: "Hinter jedem Visum und jedem Vertrag steht ein Mensch mit Träumen. Empathie ist unser Fundament." },
        { icon: <Target />, title: "Präzision", desc: "Wir arbeiten nicht mit Massen. Wir liefern handverlesene Qualität, die exakt zu Ihrem Profil passt." },
        { icon: <Compass />, title: "Compliance", desc: "100%ige Einhaltung aller rechtlichen Vorgaben des Fachkräfteeinwanderungsgesetzes (FEG)." }
      ],
      
      stats: [
        { value: "3+", label: "Länder vernetzt" },
        { value: "100%", label: "Rechtssicherheit" },
        { value: "24/7", label: "Persönlicher Support" },
      ],
      
      ctaTitle: "Lassen Sie uns gemeinsam wachsen",
      ctaBtn: "Kontakt aufnehmen"
    },
    tr: {
      heroTag: "Biz Kimiz",
      heroTitle: "Köprüler Kuruyor,",
      heroTitleSpan: "Potansiyelleri Ortaya Çıkarıyoruz.",
      heroDesc: "Biz bir işe alım ajansından daha fazlasıyız. Almanya'daki kalifiye eleman açığı ile Türkiye ve Özbekistan'daki yüksek nitelikli yetenekler arasındaki doğrudan yoluz.",
      
      missionTitle: "Misyonumuz",
      missionDesc: "Alman ekonomisinin gerçek profesyonellere ihtiyacı var ve biz onları buluyoruz. Hukuki uzmanlığımız (81a), kültürlerarası anlayışımız ve kalite odaklı yapımızla şirketleri ve insanları kalıcı olarak bir araya getiriyoruz.",
      
      storyTitle: "3 Aşamada Yolculuğumuz",
      stories: [
        {
          title: "Vizyon",
          subtitle: "Sınırsız Uzmanlık",
          desc: "Erkenden fark ettik: Yerel pazar tükenmişti, ancak küresel yetenek havuzu motive olmuş profesyonellerle doluydu. Vizyonumuz, bu boşluğu etik ve şeffaf bir süreçle doldurmaktı.",
          image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200"
        },
        {
          title: "Köprü",
          subtitle: "Türkiye, Özbekistan ve Almanya",
          desc: "Türkiye ve Özbekistan'da kurduğumuz güçlü yerel ağlar sayesinde en iyi yetenekleri filtreliyoruz. Onlar Alman topraklarına ayak basmadan çok önce dilsel ve mesleki hazırlıklarına yatırım yapıyoruz.",
          image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200"
        },
        {
          title: "Başarı",
          subtitle: "Sürdürülebilir Entegrasyon",
          desc: "İşimiz vize ile bitmiyor. Gerçek yerleştirme başarılı entegrasyon demektir. Uzun vadeli bağlar kurmak için Almanya'daki ilk adımlarında şirketlere ve uzmanlara eşlik ediyoruz.",
          image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1200"
        }
      ],
      
      valuesTitle: "Bize Yön Veren Değerler",
      values: [
        { icon: <ShieldCheck />, title: "Şeffaflık", desc: "Gizli maliyetler yok, her iki taraf için de net iletişim ve gerçekçi zaman çizelgeleri sunuyoruz." },
        { icon: <HeartHandshake />, title: "İnsan Odaklılık", desc: "Her vizenin ve sözleşmenin arkasında hayalleri olan bir insan var. Temelimiz empatidir." },
        { icon: <Target />, title: "Hassasiyet", desc: "Kitlelerle çalışmıyoruz. Tam olarak profilinize uyan, özenle seçilmiş kalite sunuyoruz." },
        { icon: <Compass />, title: "Hukuki Uyumluluk", desc: "Nitelikli İşgücü Göç Yasası'nın (FEG) tüm yasal gerekliliklerine %100 uyum sağlıyoruz." }
      ],
      
      stats: [
        { value: "3+", label: "Bağlantılı Ülke" },
        { value: "%100", label: "Hukuki Güvenlik" },
        { value: "7/24", label: "Kişisel Destek" },
      ],
      
      ctaTitle: "Birlikte Büyüyelim",
      ctaBtn: "İletişime Geçin"
    },
    en: {
      heroTag: "Who We Are",
      heroTitle: "Building Bridges.",
      heroTitleSpan: "Unleashing Potential.",
      heroDesc: "We are more than a recruitment agency. We are the direct path between the German shortage of skilled workers and highly qualified talent from Turkey and Uzbekistan.",
      
      missionTitle: "Our Mission",
      missionDesc: "Germany's economy needs doers. We find them. With legal expertise (81a), intercultural understanding, and a relentless focus on quality, we bring companies and people together sustainably.",
      
      storyTitle: "Our Journey in 3 Phases",
      stories: [
        {
          title: "The Vision",
          subtitle: "Borderless Expertise",
          desc: "We recognized early on: the local market is exhausted, but the global talent pool is full of motivated professionals. Our vision was to close this gap with an ethical, transparent process.",
          image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200"
        },
        {
          title: "The Bridge",
          subtitle: "Turkey, Uzbekistan & Germany",
          desc: "By building strong local networks in Turkey and Uzbekistan, we filter the best talent. We invest in their linguistic and professional preparation long before they set foot on German soil.",
          image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200"
        },
        {
          title: "The Success",
          subtitle: "Sustainable Integration",
          desc: "Our job doesn't end with the visa. True placement means successful integration. We accompany companies and specialists during their first steps in Germany to create long-term bonds.",
          image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1200"
        }
      ],
      
      valuesTitle: "Values That Guide Us",
      values: [
        { icon: <ShieldCheck />, title: "Transparency", desc: "No hidden costs, clear communication, and realistic timelines for both sides." },
        { icon: <HeartHandshake />, title: "Humanity", desc: "Behind every visa and contract is a person with dreams. Empathy is our foundation." },
        { icon: <Target />, title: "Precision", desc: "We don't work with masses. We deliver hand-picked quality that exactly fits your profile." },
        { icon: <Compass />, title: "Compliance", desc: "100% compliance with all legal requirements of the Skilled Immigration Act (FEG)." }
      ],
      
      stats: [
        { value: "3+", label: "Connected Countries" },
        { value: "100%", label: "Legal Security" },
        { value: "24/7", label: "Personal Support" },
      ],
      
      ctaTitle: "Let's grow together",
      ctaBtn: "Get in Touch"
    }
  };

  const currentLang = pageTexts[i18n.language] ? i18n.language : 'de';
  const tPage = pageTexts[currentLang];

  return (
    <div className="min-h-screen bg-[#fafbfc] flex flex-col font-sans overflow-hidden">
      <Navbar />

      <main className="flex-grow pt-32 pb-0">
        
        {/* 1. SİNEMATİK HERO ALANI */}
        <div className="w-full bg-[#fafbfc] py-24 lg:py-32 px-4 relative z-20">
          <div className="absolute top-0 right-0 w-full h-[60vh] bg-gradient-to-b from-[#f4f7fe] to-transparent -z-10"></div>
          
          <div className="max-w-5xl mx-auto text-center relative">
            <Reveal direction="scale" delay={100}>
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-3xl shadow-xl shadow-[#043873]/5 mb-10 border border-gray-100">
                <Globe2 className="w-10 h-10 text-[#4F9CF9]" />
              </div>
            </Reveal>

            <Reveal direction="up" delay={300}>
              <h4 className="text-[#4F9CF9] font-extrabold text-sm tracking-[0.2em] uppercase mb-6">
                {tPage.heroTag}
              </h4>
            </Reveal>
            
            <Reveal direction="up" delay={500}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-[#043873] mb-8 tracking-tight leading-[1.1]">
                {tPage.heroTitle} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#043873] to-[#4F9CF9]">
                  {tPage.heroTitleSpan}
                </span>
              </h1>
            </Reveal>
            
            <Reveal direction="up" delay={700}>
              <p className="text-xl lg:text-2xl text-gray-500 leading-relaxed max-w-3xl mx-auto font-medium">
                {tPage.heroDesc}
              </p>
            </Reveal>
          </div>
        </div>

        {/* 2. MİSYON (Kısa Vurgu) */}
        <div className="w-full bg-[#043873] py-24 relative overflow-hidden">
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#4F9CF9]/20 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
          <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
            <Reveal direction="up">
              <Compass className="w-12 h-12 text-[#FFE492] mx-auto mb-8" />
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8">
                {tPage.missionTitle}
              </h2>
              <p className="text-xl lg:text-3xl text-blue-100/90 leading-relaxed font-medium">
                "{tPage.missionDesc}"
              </p>
            </Reveal>
          </div>
        </div>

        {/* 3. HİKAYEMİZ (SCROLLYTELLING TIMELINE) */}
        <div className="w-full bg-white py-32 relative" ref={timelineRef}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <Reveal direction="up">
              <div className="text-center mb-24">
                <h2 className="text-4xl lg:text-5xl font-black text-[#043873]">
                  {tPage.storyTitle}
                </h2>
              </div>
            </Reveal>

            <div className="relative">
              {/* Dinamik İlerleme Çizgisi (Timeline Line) */}
              <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gray-100 -translate-x-1/2 rounded-full overflow-hidden">
                <div 
                  className="w-full bg-gradient-to-b from-[#4F9CF9] to-[#043873] rounded-full"
                  style={{ height: `${scrollProgress * 100}%`, transition: 'height 0.1s ease-out' }}
                ></div>
              </div>

              {/* Hikaye Adımları */}
              <div className="space-y-32 lg:space-y-48">
                {tPage.stories.map((story, i) => {
                  const isEven = i % 2 === 0;
                  const isActive = activeStory === i;

                  return (
                    <div 
                      key={i} 
                      data-index={i}
                      ref={el => storyRefs.current[i] = el}
                      className={`relative flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24 transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-40'}`}
                    >
                      
                      {/* Ortadaki Yuvarlak Nokta (Desktop) */}
                      <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border-4 border-gray-100 items-center justify-center z-10 transition-colors duration-700">
                        <div className={`w-4 h-4 rounded-full transition-all duration-700 ${isActive ? 'bg-[#4F9CF9] scale-150' : 'bg-gray-300'}`}></div>
                      </div>

                      {/* Resim Tarafı */}
                      <div className="w-full lg:w-1/2 relative group">
                        <Reveal direction={isEven ? "left" : "right"}>
                          <div className={`aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl transition-all duration-700 ${isActive ? 'scale-100 ring-1 ring-[#4F9CF9]/30' : 'scale-95'}`}>
                            <img src={story.image} alt={story.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-[#043873]/10 mix-blend-multiply"></div>
                          </div>
                          {/* Mobil Adım Göstergesi */}
                          <div className="lg:hidden absolute -bottom-6 left-6 w-12 h-12 bg-[#043873] text-white rounded-full flex items-center justify-center font-bold text-xl border-4 border-white shadow-lg">
                            {i + 1}
                          </div>
                        </Reveal>
                      </div>

                      {/* Metin Tarafı */}
                      <div className={`w-full lg:w-1/2 ${isEven ? 'lg:text-left' : 'lg:text-right'}`}>
                        <Reveal direction="up" delay={200}>
                          <h4 className="text-[#4F9CF9] font-extrabold text-sm tracking-[0.2em] uppercase mb-4">
                            {story.subtitle}
                          </h4>
                          <h3 className="text-4xl lg:text-5xl font-black text-[#043873] mb-6">
                            {story.title}
                          </h3>
                          <p className="text-lg text-gray-600 leading-relaxed font-medium">
                            {story.desc}
                          </p>
                        </Reveal>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* 4. DEĞERLERİMİZ (Glassmorphism Grid) */}
        <div className="w-full bg-[#f8f9fa] py-32 relative border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <Reveal direction="up">
              <div className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-black text-[#043873]">
                  {tPage.valuesTitle}
                </h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {tPage.values.map((val, idx) => (
                <Reveal key={idx} direction="up" delay={idx * 150}>
                  <div className="bg-white p-10 lg:p-12 rounded-[2.5rem] shadow-[0_10px_40px_rgba(4,56,115,0.04)] border border-gray-100 hover:border-[#4F9CF9]/30 hover:shadow-2xl transition-all duration-700 group h-full flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-20 h-20 flex-shrink-0 bg-[#f4f7fe] text-[#043873] rounded-[1.5rem] flex items-center justify-center group-hover:bg-[#4F9CF9] group-hover:text-white transition-colors duration-500 shadow-sm">
                      {React.cloneElement(val.icon, { className: "w-10 h-10" })}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#043873] mb-4">{val.title}</h3>
                      <p className="text-gray-600 leading-relaxed text-lg">{val.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* 5. İSTATİSTİKLER */}
        <div className="w-full bg-white py-24 relative z-10 border-t border-gray-100">
           <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                {tPage.stats.map((stat, idx) => (
                  <Reveal key={idx} direction="scale" delay={idx * 200}>
                    <div className="flex flex-col items-center justify-center text-center p-4">
                      <div className="text-6xl font-black text-[#043873] mb-3 tracking-tighter">
                        {stat.value}
                      </div>
                      <div className="text-[#4F9CF9] text-sm font-extrabold uppercase tracking-[0.15em]">
                        {stat.label}
                      </div>
                    </div>
                  </Reveal>
                ))}
             </div>
           </div>
        </div>

        {/* 6. CTA ALANI */}
        <div className="bg-[#043873] py-32 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FFE492]/10 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <Reveal direction="up" delay={100}>
              <h2 className="text-5xl md:text-6xl font-black text-white mb-10 leading-[1.1]">
                {tPage.ctaTitle}
              </h2>
              <Link 
                to="/anfrage" 
                className="group inline-flex justify-center items-center px-12 py-6 text-xl font-bold rounded-full text-[#043873] bg-[#FFE492] hover:bg-white hover:scale-105 transition-all duration-700 shadow-[0_20px_40px_rgba(255,228,146,0.2)]"
              >
                {tPage.ctaBtn}
                <ArrowRight className="ml-4 w-6 h-6 group-hover:translate-x-2 transition-transform duration-700" />
              </Link>
            </Reveal>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
};

export default UberUns;