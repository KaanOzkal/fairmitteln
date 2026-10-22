import React, { useEffect, useState, useRef } from 'react';
import { ShieldCheck, Globe2, Truck, Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const BenefitsSection = () => {
  const { t } = useTranslation();
  
  // Scroll animasyonu için Observer State ve Ref
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Ekrana %15'i girdiğinde animasyonu tetikle
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const benefits = [
    {
      id: 1,
      icon: <ShieldCheck className="w-8 h-8 text-[#4F9CF9]" />,
      title: t('ben.b1t'),
      desc: t('ben.b1d')
    },
    {
      id: 2,
      icon: <Globe2 className="w-8 h-8 text-[#4F9CF9]" />,
      title: t('ben.b2t'),
      desc: t('ben.b2d')
    },
    {
      id: 3,
      icon: <Truck className="w-8 h-8 text-[#4F9CF9]" />,
      title: t('ben.b3t'),
      desc: t('ben.b3d')
    },
    {
      id: 4,
      icon: <Settings className="w-8 h-8 text-[#4F9CF9]" />,
      title: t('ben.b4t'),
      desc: t('ben.b4d')
    }
  ];

  return (
    <section className="py-24 bg-white font-sans overflow-hidden" id="vorteile" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Başlık Alanı - Aşağıdan yukarı fade-in */}
        <div 
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-[#043873] mb-6 tracking-tight">
            {t('ben.title')}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {t('ben.desc')}
          </p>
        </div>

        {/* Kartlar - Sırayla (Staggered) fade-in */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={benefit.id} 
              // Her karta index * 150ms gecikme veriyoruz ki sırayla gelsinler
              style={{ transitionDelay: `${index * 150}ms` }}
              className={`bg-[#f8f9fa] rounded-2xl p-8 hover:shadow-[0_15px_40px_rgba(4,56,115,0.08)] border border-gray-100 group hover:-translate-y-1 transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
              }`}
            >
              <div className="w-16 h-16 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-[#043873] mb-4">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BenefitsSection;