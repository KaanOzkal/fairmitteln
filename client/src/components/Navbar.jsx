import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const navTexts = {
    de: { services: "Leistungen", process: "Ablauf", industries: "Branchen", about: "Über uns", contact: "Kontakt", cta: "Anfrage starten" },
    tr: { services: "Hizmetlerimiz", process: "Süreç", industries: "Sektörler", about: "Hakkımızda", contact: "İletişim", cta: "Talep Oluştur" },
    en: { services: "Services", process: "Process", industries: "Industries", about: "About Us", contact: "Contact", cta: "Start Request" }
  };

  const currentLang = navTexts[i18n.language] ? i18n.language : 'de';
  const tNav = navTexts[currentLang];

  return (
    <nav 
      className={`w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between fixed top-0 z-50 transition-all duration-500 ease-out ${
        mobileMenuOpen 
          ? 'py-3.5 bg-[#043873] shadow-lg' // Mobil menü açıkken tamamen tok (solid) lacivert
          : isScrolled 
            ? 'py-3.5 bg-[#043873]/30 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]' // Scroll yapıldığında cam efekti
            : 'py-6 bg-transparent' // En üstteyken şeffaf
      }`}
    >
      
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <span className="font-black text-3xl text-[#c50000] tracking-wide relative inline-flex items-center">
          <span className="relative inline-block">
            <span className="absolute -inset-1 bg-[#ebb102] blur-md opacity-30 rounded-lg"></span>
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#ebb102] via-[#fff9db] to-[#ebb102] bg-[length:200%_auto] animate-shine drop-shadow-sm">
              FAIR
            </span>
          </span>
          <span className="drop-shadow-sm ml-1 text-white">MITTELN</span>
          <style>{`
            @keyframes shine {
              0% { background-position: -200% center; }
              100% { background-position: 200% center; }
            }
            .animate-shine {
              animation: shine 3.5s linear infinite;
            }
          `}</style>
        </span>
      </Link>

      {/* Orta Linkler */}
      <div className="hidden lg:flex items-center gap-8 text-white/90 text-sm font-semibold tracking-wide">
        <Link to="/leistungen" className="hover:text-[#FFE492] hover:scale-105 transition-all">{tNav.services}</Link>
        <Link to="/ablauf" className="hover:text-[#FFE492] hover:scale-105 transition-all">{tNav.process}</Link>
        <Link to="/branchen" className="hover:text-[#FFE492] hover:scale-105 transition-all">{tNav.industries}</Link>
        <Link to="/ueber-uns" className="hover:text-[#FFE492] hover:scale-105 transition-all">{tNav.about}</Link>
        <Link to="/kontakt" className="hover:text-[#FFE492] hover:scale-105 transition-all">{tNav.contact}</Link>
      </div>

      {/* Sağ Kısım (Dil ve Buton) */}
      <div className="hidden lg:flex items-center gap-6">
        <div className="flex items-center gap-2 text-white/70 text-xs font-bold tracking-widest bg-black/10 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/5">
          <button onClick={() => changeLanguage('tr')} className={`hover:text-[#FFE492] transition-colors ${i18n.language === 'tr' ? 'text-[#FFE492]' : ''}`}>TR</button>
          <span className="text-white/20">|</span>
          <button onClick={() => changeLanguage('de')} className={`hover:text-[#FFE492] transition-colors ${i18n.language === 'de' ? 'text-[#FFE492]' : ''}`}>DE</button>
          <span className="text-white/20">|</span>
          <button onClick={() => changeLanguage('en')} className={`hover:text-[#FFE492] transition-colors ${i18n.language === 'en' ? 'text-[#FFE492]' : ''}`}>EN</button>
        </div>

        <Link 
          to="/anfrage" 
          className="bg-gradient-to-r from-[#4F9CF9] to-[#2563eb] text-white px-6 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 hover:shadow-[0_0_20px_rgba(79,156,249,0.4)] hover:-translate-y-0.5 transition-all duration-300 border border-white/10"
        >
          {tNav.cta} <ArrowRight size={16} />
        </Link>
      </div>

      {/* Mobil Menü Butonu */}
      <button 
        className="lg:hidden text-white focus:outline-none p-2 rounded-full bg-white/5 border border-white/10"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobil Açılır Menü (Tok Lacivert Renk) */}
      <div className={`absolute top-full left-0 w-full transition-all duration-300 origin-top overflow-hidden lg:hidden ${mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-[#043873] border-t border-white/10 shadow-2xl py-6 px-6 flex flex-col gap-5 rounded-b-3xl">
          <Link to="/leistungen" onClick={() => setMobileMenuOpen(false)} className="text-white/90 text-lg font-medium hover:text-[#FFE492] hover:translate-x-2 transition-all">{tNav.services}</Link>
          <Link to="/ablauf" onClick={() => setMobileMenuOpen(false)} className="text-white/90 text-lg font-medium hover:text-[#FFE492] hover:translate-x-2 transition-all">{tNav.process}</Link>
          <Link to="/branchen" onClick={() => setMobileMenuOpen(false)} className="text-white/90 text-lg font-medium hover:text-[#FFE492] hover:translate-x-2 transition-all">{tNav.industries}</Link>
          <Link to="/ueber-uns" onClick={() => setMobileMenuOpen(false)} className="text-white/90 text-lg font-medium hover:text-[#FFE492] hover:translate-x-2 transition-all">{tNav.about}</Link>
          <Link to="/kontakt" onClick={() => setMobileMenuOpen(false)} className="text-white/90 text-lg font-medium hover:text-[#FFE492] hover:translate-x-2 transition-all">{tNav.contact}</Link>

          <div className="flex items-center flex-col gap-4 pt-5 border-t border-white/10 mt-2">
            <div className="flex items-center gap-4 text-white/70 text-sm font-bold bg-white/5 px-6 py-2 rounded-full w-max">
              <button onClick={() => changeLanguage('tr')} className={i18n.language === 'tr' ? 'text-[#FFE492]' : ''}>TR</button>
              <span>|</span>
              <button onClick={() => changeLanguage('de')} className={i18n.language === 'de' ? 'text-[#FFE492]' : ''}>DE</button>
              <span>|</span>
              <button onClick={() => changeLanguage('en')} className={i18n.language === 'en' ? 'text-[#FFE492]' : ''}>EN</button>
            </div>

            <Link 
              to="/anfrage" 
              onClick={() => setMobileMenuOpen(false)}
              className="bg-gradient-to-r from-[#4F9CF9] to-[#2563eb] text-white w-full justify-center py-3 rounded-xl font-bold text-base flex items-center gap-2 shadow-lg"
            >
              {tNav.cta} <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;