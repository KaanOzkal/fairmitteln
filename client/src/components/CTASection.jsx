import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CTASection = () => {
  const { t } = useTranslation();

  // Scroll animasyonu için Observer
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 } // Kutu %20 ekrana girdiğinde tetikle
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 bg-white font-sans relative" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Ana Kutu - Büyüyerek ve yukarı kayarak belirir */}
        <div 
          className={`relative bg-[#043873] rounded-[2.5rem] p-10 lg:p-20 overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-12 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
          }`}
        >
          
          {/* Arka plan parıltıları (Sabit kalıyor) */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4F9CF9] rounded-full mix-blend-screen filter blur-[100px] opacity-20 translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#4F9CF9] rounded-full mix-blend-screen filter blur-[80px] opacity-20 -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

          {/* Sol Kısım (Yazılar) - Soldan sağa kayarak gelir (Gecikmeli) */}
          <div 
            className={`relative z-10 w-full lg:w-2/3 text-center lg:text-left transition-all duration-1000 delay-300 ease-out ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full mb-8 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-[#4F9CF9]" />
              <span className="text-sm font-semibold text-white uppercase tracking-wider">
                {t('nav.request')}
              </span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
              {t('cta.title')}
            </h2>
            
            <p className="text-lg sm:text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {t('cta.desc')}
            </p>
          </div>

          {/* Sağ Kısım (Buton) - Sağdan sola kayarak gelir (Daha Gecikmeli) */}
          <div 
            className={`relative z-10 w-full lg:w-1/3 flex justify-center lg:justify-end flex-shrink-0 transition-all duration-1000 delay-500 ease-out ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <Link
              to="/anfrage"
              className="group relative inline-flex justify-center items-center px-10 py-5 text-lg font-bold rounded-2xl text-[#043873] bg-[#FFE492] hover:bg-yellow-400 hover:scale-105 transition-all duration-300 shadow-[0_20px_40px_rgba(255,228,146,0.2)] w-full sm:w-auto overflow-hidden"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
              
              <span className="relative flex items-center">
                {t('cta.btn')}
                <ArrowRight className="ml-3 w-6 h-6 text-[#043873] group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default CTASection;