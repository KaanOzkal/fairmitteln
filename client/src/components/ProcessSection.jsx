import React, { useEffect, useState, useRef } from 'react';
import { Search, FileCheck, Users, Plane, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const ProcessSection = () => {
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
      { threshold: 0.2 } // %20'si ekranda göründüğünde tetikle
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      id: "01",
      icon: <Search className="w-8 h-8 text-[#4F9CF9]" />,
      title: t('proc.s1t'),
      desc: t('proc.s1d')
    },
    {
      id: "02",
      icon: <FileCheck className="w-8 h-8 text-[#4F9CF9]" />,
      title: t('proc.s2t'),
      desc: t('proc.s2d')
    },
    {
      id: "03",
      icon: <Users className="w-8 h-8 text-[#4F9CF9]" />,
      title: t('proc.s3t'),
      desc: t('proc.s3d')
    },
    {
      id: "04",
      icon: <Plane className="w-8 h-8 text-[#4F9CF9]" />,
      title: t('proc.s4t'),
      desc: t('proc.s4d')
    }
  ];

  return (
    <section className="py-24 bg-white font-sans overflow-hidden" id="ablauf" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Başlık Alanı - Aşağıdan yukarı fade-in */}
        <div 
          className={`text-center max-w-3xl mx-auto mb-20 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-[#043873] mb-6 tracking-tight">
            {t('proc.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          
          {/* Arkadaki Bağlantı Çizgisi - Soldan sağa çizilme animasyonu */}
          <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-[2px] bg-gray-50 z-0 overflow-hidden rounded-full">
            <div 
              className="h-full bg-gradient-to-r from-[#4F9CF9]/20 via-[#4F9CF9] to-[#4F9CF9]/20 transition-all duration-[1500ms] ease-in-out"
              style={{ 
                width: isVisible ? '100%' : '0%',
                transitionDelay: '300ms' // Kartlar belirmeden hemen önce çizilmeye başlar
              }}
            ></div>
          </div>

          {/* Adımlar (Kartlar) - Sırayla gecikmeli fade-in */}
          {steps.map((step, index) => (
            <div 
              key={step.id} 
              className={`relative z-10 flex flex-col items-center text-center group transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="w-24 h-24 bg-white rounded-full shadow-[0_10px_30px_rgba(4,56,115,0.08)] border-2 border-gray-50 flex items-center justify-center mb-8 relative group-hover:border-[#4F9CF9] transition-colors duration-300">
                {step.icon}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#043873] text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                  {step.id}
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#043873] mb-4">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed px-2">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Alt Kısımdaki CTA Butonu - En son belirir */}
        <div 
          className={`mt-20 flex justify-center transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '1000ms' }}
        >
          <Link 
            to="/anfrage" 
            className="inline-flex justify-center items-center px-8 py-4 text-base font-semibold rounded-lg text-[#043873] bg-[#f8f9fa] border border-gray-200 hover:bg-[#043873] hover:text-white transition-all duration-300 group shadow-sm"
          >
            {t('cta.btn')}
            <ArrowRight className="ml-2 w-5 h-5 text-[#4F9CF9] group-hover:text-white transition-colors" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default ProcessSection;