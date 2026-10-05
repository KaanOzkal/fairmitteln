import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ShieldCheck, Globe2, Users, CheckCircle2, Sparkles, Zap, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// --- VİDEO, NEON VE KARELERİN BİRLEŞTİĞİ EFSANE ARKA PLAN ---
const AnimatedBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden bg-[#000000]">
    
    {/* 1. SENİN VİDEON (Sinematik ve arka planda uyumlu halde) */}
    <video
      autoPlay
      loop
      muted
      playsInline
      className="absolute inset-0 w-full h-full object-cover z-0 opacity-[0.25] mix-blend-luminosity scale-105 pointer-events-none"
      src="/videos/81asurec.mp4"
    />

    {/* Video üzerine koyu bir maske (Metinlerin ve karelerin net okunması için) */}
    <div className="absolute inset-0 bg-[#000000]/40 z-0 pointer-events-none"></div>

    {/* 2. HAREKETLİ NEON BLOBLAR (Videonun üzerinde renkli parlamalar yaratır) */}
    <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-[#8a2be2]/30 rounded-full blur-[120px] mix-blend-screen animate-[blob_10s_infinite] pointer-events-none"></div>
    <div className="absolute top-[20%] right-[-10%] w-[60vw] h-[60vw] bg-[#00f0ff]/20 rounded-full blur-[150px] mix-blend-screen animate-[blob_12s_infinite_reverse_2s] pointer-events-none"></div>
    <div className="absolute bottom-[-20%] left-[20%] w-[40vw] h-[40vw] bg-[#ff007f]/20 rounded-full blur-[130px] mix-blend-screen animate-[blob_14s_infinite_4s] pointer-events-none"></div>
    
    {/* 3. İSTEDİĞİN MODERN KARELER (Grid Pattern) */}
    <div className="absolute inset-0 z-10 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_40%,#000_30%,transparent_100%)] pointer-events-none"></div>
    
    {/* 4. Uçuşan Minik Parçacıklar (Hologram efekti katar) */}
    <div className="absolute top-[20%] left-[10%] w-2 h-2 bg-cyan-400 rounded-full blur-[2px] animate-[floatUp_8s_infinite] z-10 pointer-events-none"></div>
    <div className="absolute top-[60%] right-[15%] w-1.5 h-1.5 bg-purple-500 rounded-full blur-[2px] animate-[floatUp_12s_infinite_3s] z-10 pointer-events-none"></div>
    <div className="absolute top-[40%] left-[80%] w-2.5 h-2.5 bg-pink-500 rounded-full blur-[2px] animate-[floatUp_10s_infinite_1s] z-10 pointer-events-none"></div>
  </div>
);

const Hero = () => {
  const { t } = useTranslation();
  const cardRefs = useRef([]);
  const screenWidth = useRef(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const totalItems = 25;
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const allImages = [
    '/images/mehmetvize.jpg',
    '/images/mustafavize.jpg',
    '/images/osmanvize.jpg',
    '/images/celalvize.png',
    '/images/emrevize.png',
    '/images/kerimvize.png',
    '/images/enusvize.png',
  ];

  useEffect(() => {
    const handleResize = () => { screenWidth.current = window.innerWidth; };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- KUSURSUZ YAY (ARC) ALGORİTMASI ---
  const getCardStyle = (distance, sign, width) => {
    const isMobile = width < 768;
    const txSpread = isMobile ? 50 : 75;   
    const tyDrop = isMobile ? 6 : 14;      
    const scaleDrop = isMobile ? 0.05 : 0.07;
    const rotateStep = isMobile ? 6 : 8;   
    const opacityDrop = isMobile ? 0.12 : 0.15; 

    const tx = sign * distance * txSpread;
    const baseYOffset = isMobile ? -20 : -10; 
    const ty = baseYOffset + (distance * distance) * tyDrop; 
    
    const scale = Math.max(0, (isMobile ? 1.05 : 1.15) - (distance * scaleDrop));
    const rotate = sign * distance * rotateStep;
    const opacity = Math.max(0, 1 - (distance * opacityDrop));
    const zIndex = 100 - Math.round(distance * 10);

    return {
      transform: `translate(-50%, -100%) translateX(${tx}px) translateY(${ty}px) scale(${scale}) rotate(${rotate}deg)`,
      opacity: opacity.toFixed(3),
      zIndex,
      display: opacity > 0 ? 'block' : 'none', 
    };
  };

  // 60FPS Akıcı Dönüş Animasyonu
  useEffect(() => {
    let animationId;
    let centerIndex = 12;
    const speed = 0.015; // Dinamik dönüş hızı

    const updateAllCards = () => {
      centerIndex += speed;
      if (centerIndex > totalItems) centerIndex -= totalItems;
      const currentWidth = screenWidth.current;

      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        let rawDist = i - centerIndex;
        if (rawDist > totalItems / 2) rawDist -= totalItems;
        if (rawDist < -totalItems / 2) rawDist += totalItems;

        const distance = Math.abs(rawDist);
        const sign = Math.sign(rawDist) || 0;
        const style = getCardStyle(distance, sign, currentWidth);

        el.style.transform = style.transform;
        el.style.opacity = style.opacity;
        el.style.zIndex = style.zIndex.toString();
        el.style.display = style.display;
      });

      animationId = requestAnimationFrame(updateAllCards);
    };

    animationId = requestAnimationFrame(updateAllCards);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const initialCards = Array.from({ length: totalItems }, (_, i) => ({
    id: i,
    image: allImages[i % allImages.length],
  }));

  return (
    <div className="relative min-h-[100svh] w-full flex flex-col justify-between items-center overflow-hidden bg-[#000000] pt-24 md:pt-32 font-sans text-white">

      {/* SİSTEM & FULL ANİMASYON STİLLERİ */}
      <style>{`
        /* Çılgın Arka Plan Blobları */
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        /* Yukarı Uçan Parçacıklar */
        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(-100vh) scale(0); opacity: 0; }
        }

        /* Giriş (Reveal) Animasyonları */
        @keyframes revealUp {
          from { opacity: 0; transform: translateY(50px) scale(0.95); filter: blur(10px); }
          to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        .reveal { opacity: 0; animation: revealUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; }

        /* Kayar Işıklı Metin (Text Shimmer) */
        @keyframes textShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .animate-text-shimmer {
          background-size: 200% auto;
          animation: textShimmer 4s linear infinite;
        }

        /* Dönen Neon Border (Magic Border) */
        @keyframes spinGradient {
          100% { transform: rotate(360deg); }
        }
        .magic-border-container {
          position: relative;
          overflow: hidden;
        }
        .magic-border-container::before {
          content: '';
          position: absolute;
          top: -50%; left: -50%; width: 200%; height: 200%;
          background: conic-gradient(transparent, transparent, transparent, #00f0ff, #8a2be2, #ff007f);
          animation: spinGradient 4s linear infinite;
          z-index: 0;
        }
        .magic-border-inner {
          position: relative;
          z-index: 1;
          background: #050505; 
        }

        /* Kartların İç Hover Animasyonu - Devasa Pop-up Etkisi */
        .card-inner-hover {
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .visa-wrapper:hover .card-inner-hover {
          transform: translateY(-50px) scale(1.3) rotate(0deg) !important;
          box-shadow: 0 0 50px rgba(0, 240, 255, 0.5), 0 0 100px rgba(138, 43, 226, 0.3);
        }
        .visa-wrapper:hover {
          z-index: 9999 !important;
        }
      `}</style>

      {/* 1. HAREKETLİ NEON, VİDEO VE KARELİ ARKA PLAN */}
      <AnimatedBackground />

      {/* 2. ANA İÇERİK BÖLÜMÜ */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-4 sm:px-6 flex-grow mt-4 md:mt-8">

        {/* Işıklı Etiket */}
        <div className={`reveal delay-100 inline-flex items-center space-x-2 bg-white/[0.05] backdrop-blur-xl border border-white/10 px-5 py-2.5 rounded-full mb-8 shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:border-[#00f0ff]/50 transition-colors duration-500`}>
          <div className="relative flex items-center justify-center">
            <span className="absolute w-full h-full bg-[#00f0ff] blur-[10px] animate-pulse"></span>
            <Sparkles className="w-4 h-4 text-[#00f0ff] relative z-10" />
          </div>
          <span className="text-xs sm:text-sm font-bold text-white tracking-[0.2em] uppercase">
            {t('hero.tag')}
          </span>
        </div>

        {/* Hareketli Shimmer Başlık */}
        <h1 className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[6rem] font-black leading-[1.05] tracking-tighter mb-6 text-center max-w-5xl">
          <span className="block reveal delay-200">
            {t('hero.t1')}
          </span>
          <span className="block mt-2 sm:mt-1 reveal delay-300">
            {/* Animasyonlu Renkli Metin */}
            <span className="animate-text-shimmer bg-clip-text text-transparent bg-[linear-gradient(to_right,#00f0ff,40%,#8a2be2,60%,#00f0ff)]">
              {t('hero.t2')}
            </span>
          </span>
          <span className="block sm:inline reveal delay-400">
            {' '}{t('hero.t3')} <span className="opacity-50 font-normal">{t('hero.t4')}</span>
          </span>
        </h1>

        {/* Açıklama */}
        <p className="reveal delay-400 text-base sm:text-lg md:text-xl text-zinc-300 mb-12 text-center max-w-2xl leading-relaxed font-medium">
          {t('hero.desc')}
        </p>

        {/* Animasyonlu Buton Grubu */}
        <div className="reveal delay-500 flex flex-col sm:flex-row gap-5 mb-16 items-center w-full justify-center">
          
          {/* Sihirli Dönen Neon Buton (Magic Border) */}
          <Link to="/anfrage" className="group relative w-full sm:w-auto p-[2px] rounded-2xl overflow-hidden magic-border-container">
            <div className="magic-border-inner px-8 py-4 sm:px-10 sm:py-5 rounded-2xl flex items-center justify-center gap-3 transition-colors group-hover:bg-zinc-900">
              <span className="text-base sm:text-lg font-bold text-white group-hover:text-[#00f0ff] transition-colors">
                {t('hero.cta1')}
              </span>
              <ArrowRight className="w-5 h-5 text-white group-hover:text-[#00f0ff] group-hover:translate-x-1 transition-all" />
            </div>
          </Link>

          {/* İkincil Glass Buton */}
          <a href="#ablauf" className="group flex justify-center items-center px-8 py-4 sm:px-10 sm:py-[22px] border border-white/15 text-base sm:text-lg font-bold rounded-2xl text-white bg-white/[0.05] backdrop-blur-lg hover:bg-white/[0.1] hover:border-white/30 transition-all duration-300 w-full sm:w-auto">
            {t('hero.cta2')}
            <ChevronRight className="ml-2 w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
          </a>
        </div>

        {/* Cam Efektli Modern Güven Rozetleri */}
        <div className="reveal delay-500 flex flex-wrap justify-center gap-4 sm:gap-6 w-full max-w-4xl px-2">
          {[
            { icon: ShieldCheck, text: "100% Legal & Sicher", color: "text-[#00f0ff]", glow: "shadow-[0_0_15px_rgba(0,240,255,0.3)]" },
            { icon: Globe2, text: "Direktes Netzwerk", color: "text-[#8a2be2]", glow: "shadow-[0_0_15px_rgba(138,43,226,0.3)]" },
            { icon: Users, text: "Nachhaltige Integration", color: "text-[#ff007f]", glow: "shadow-[0_0_15px_rgba(255,0,127,0.3)]" }
          ].map((badge, idx) => (
            <div key={idx} className={`flex items-center space-x-3 px-5 py-3 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-white/30 transition-all hover:-translate-y-1 ${badge.glow}`}>
              <badge.icon className={`w-5 h-5 ${badge.color}`} />
              <span className="text-xs sm:text-sm font-bold text-zinc-200">{badge.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. VİZESİ ÇIKAN ADAYLAR - NEON ÇERÇEVELİ ARC */}
      <div className="relative z-30 w-full h-[320px] sm:h-[400px] md:h-[500px] mt-10 md:mt-12 pointer-events-none">
        
        {/* Karartma Maskeleri (Karanlık temaya tam uyum) */}
        <div className="absolute inset-0 z-40 pointer-events-none" style={{ background: 'linear-gradient(90deg, #000 0%, transparent 20%, transparent 80%, #000 100%)' }}></div>
        <div className="absolute bottom-0 w-full h-1/2 z-40 pointer-events-none bg-gradient-to-t from-[#000] via-[#000]/80 to-transparent"></div>

        <div className="relative w-full max-w-[100vw] h-full mx-auto flex justify-center items-end pointer-events-auto perspective-[1000px]">
          {initialCards.map((card) => (
            /* WRAPPER YAPI (Pozisyonlama JS'de) */
            <div
              key={card.id}
              ref={(el) => { cardRefs.current[card.id] = el; }}
              className="visa-wrapper absolute top-full left-1/2 will-change-transform"
              style={{ transformOrigin: '50% 100%' }}
            >

              <div className="card-inner-hover relative w-[130px] h-[180px] sm:w-[170px] sm:h-[240px] md:w-[240px] md:h-[340px] rounded-[1.5rem] md:rounded-[2rem] p-[2px] magic-border-container cursor-pointer group">
                
                {/* Resim Konteyneri (İç Kısım Siyah) */}
                <div className="magic-border-inner relative w-full h-full rounded-[1.4rem] md:rounded-[1.9rem] overflow-hidden">
                  <img
                    src={card.image}
                    alt="Vizesi Çıkan Aday"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Resim üzerine vignette karartması */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-300"></div>
                </div>

                {/* Cyberpunk Onay Rozeti */}
                <div className="absolute bottom-6 inset-x-0 flex justify-center translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out z-20">
                  <div className="flex items-center space-x-2 bg-black/60 backdrop-blur-xl px-4 py-2 rounded-full border border-[#00f0ff]/50 shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                    <Zap className="w-3 h-3 md:w-4 md:h-4 text-[#00f0ff] animate-pulse" />
                    <p className="text-[#00f0ff] text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">
                      Onaylandı
                    </p>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;