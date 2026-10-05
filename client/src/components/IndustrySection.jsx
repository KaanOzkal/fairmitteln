import React, { useEffect, useState, useRef } from 'react';
import { Truck, Package, Box, Layers, ArrowRight, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const IndustrySection = () => {
  const { t } = useTranslation();

  // Scroll animasyonu için Observer State ve Ref
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 } // %15'i ekrana girdiğinde tetikle
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const industries = [
    {
      id: 1,
      icon: <Truck className="w-8 h-8 text-[#4F9CF9]" />,
      title: t('ind.c1t'),
      desc: t('ind.c1d')
    },
    {
      id: 2,
      icon: <Package className="w-8 h-8 text-[#4F9CF9]" />,
      title: t('ind.c2t'),
      desc: t('ind.c2d')
    },
    {
      id: 3,
      icon: <Box className="w-8 h-8 text-[#4F9CF9]" />,
      title: t('ind.c3t'),
      desc: t('ind.c3d')
    },
    {
      id: 4,
      icon: <Layers className="w-8 h-8 text-[#4F9CF9]" />,
      title: t('ind.c4t'),
      desc: t('ind.c4d')
    }
  ];

  return (
    <section className="py-24 lg:py-32 bg-[#043873] font-sans relative overflow-hidden" id="branchen" ref={sectionRef}>
      
      {/* Arka Plan Dekorları - Yumuşak fade-in */}
      <div className={`absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0 transition-opacity duration-[2000ms] ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <svg className="absolute right-0 top-10 opacity-10 w-1/2 h-auto animate-[spin_60s_linear_infinite]" viewBox="0 0 400 400" fill="none">
          <circle cx="200" cy="200" r="199" stroke="white" strokeWidth="2" strokeDasharray="6 6"/>
          <circle cx="200" cy="200" r="150" stroke="white" strokeWidth="1" opacity="0.5"/>
          <circle cx="200" cy="200" r="100" stroke="white" strokeWidth="1" opacity="0.2"/>
        </svg>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#4F9CF9] rounded-full mix-blend-screen filter blur-[120px] opacity-20 -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 mb-20">
          
          {/* Sol Başlık Alanı - Soldan sağa kayarak gelir */}
          <div 
            className={`w-full lg:w-3/5 transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-[#FFE492]" />
              <span className="text-sm font-bold text-white uppercase tracking-wider">
                {t('nav.companies')}
              </span>
            </div>
            
            <h2 className="text-5xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
              <span className="relative inline-block mt-2">
                {t('ind.title')}
                <svg 
                  className={`absolute w-[105%] h-5 lg:h-6 -bottom-1 lg:-bottom-2 -left-2 text-[#FFE492] -z-10 transition-all duration-1000 delay-500 ease-out ${
                    isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                  }`} 
                  style={{ transformOrigin: 'left' }}
                  viewBox="0 0 100 20" 
                  preserveAspectRatio="none"
                >
                  <path d="M0,15 Q50,25 100,10 L100,20 L0,20 Z" fill="currentColor"></path>
                </svg>
              </span>
            </h2>
          </div>

          {/* Sağ Buton Alanı - Sağdan sola kayarak gelir (Gecikmeli) */}
          <div 
            className={`w-full lg:w-2/5 flex flex-col items-start lg:items-end text-left lg:text-right transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <Link 
              to="/anfrage" 
              className="group inline-flex justify-center items-center px-8 py-4 rounded-lg font-bold text-[#043873] bg-[#FFE492] hover:bg-yellow-400 transition-all duration-300 shadow-[0_10px_30px_rgba(255,228,146,0.3)] hover:shadow-[0_15px_40px_rgba(255,228,146,0.5)] hover:-translate-y-1"
            >
              {t('cta.btn')}
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* 4 Sektör Maddesi - Aşağıdan yukarı sırayla gelir */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {industries.map((industry, index) => (
            <div 
              key={industry.id} 
              style={{ transitionDelay: `${index * 150 + 500}ms` }}
              className={`group bg-white rounded-2xl p-8 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-700 hover:-translate-y-2 cursor-pointer flex flex-col h-full relative overflow-hidden ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
              }`}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-[#FFE492] transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <div className="mb-8 w-16 h-16 bg-[#043873]/5 rounded-xl flex items-center justify-center group-hover:bg-[#4F9CF9]/10 group-hover:scale-110 transition-all duration-300">
                {industry.icon}
              </div>
              <h3 className="text-2xl font-bold text-[#043873] mb-4 group-hover:text-[#4F9CF9] transition-colors duration-300">
                {industry.title}
              </h3>
              <p className="text-gray-600 leading-relaxed flex-grow text-lg">
                {industry.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default IndustrySection;