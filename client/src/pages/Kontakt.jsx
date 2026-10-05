import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  MapPin, Phone, Mail, Clock, Send, 
  MessageSquare, User, AtSign, Sparkles, CheckCircle2, AlertCircle
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

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

  const baseStyles = "transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]";
  
  const getTransform = () => {
    if (isVisible) return "translate-y-0 translate-x-0 opacity-100 scale-100 blur-none";
    switch (direction) {
      case "up": return "translate-y-24 opacity-0 scale-95 blur-[2px]";
      case "left": return "translate-x-24 opacity-0 blur-[2px]";
      case "right": return "-translate-x-24 opacity-0 blur-[2px]";
      default: return "opacity-0";
    }
  };

  return (
    <div ref={ref} className={`${baseStyles} ${getTransform()} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

const Kontakt = () => {
  const { i18n } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [focusedInput, setFocusedInput] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }; 


  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      // Backend'e SMTP üzerinden mail atması için istek atıyoruz (İleride bağlayacağımız yer)
      await axios.post('http://localhost:5000/api/contact', formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // 5 saniye sonra formu eski haline getir
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error("Mail gönderme hatası:", error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const pageTexts = {
    de: {
      tag: "Kontaktieren Sie uns",
      title: "Lassen Sie uns ins",
      titleSpan: "Gespräch kommen",
      desc: "Haben Sie Fragen zu unseren Dienstleistungen oder möchten Sie direkt eine Personalanfrage stellen? Unser Team steht Ihnen jederzeit zur Verfügung.",
      info: {
        address: { title: "Unser Büro", value: "Musterstraße 123, 10115 Berlin, Deutschland" },
        email: { title: "E-Mail Adresse", value: "info@fairmitteln.com.tr" },
        phone: { title: "Telefon", value: "+49 (0) 30 123 456 78" },
        hours: { title: "Öffnungszeiten", value: "Mo. - Fr.: 09:00 - 18:00 Uhr" }
      },
      form: {
        name: "Ihr Name",
        email: "Ihre E-Mail",
        subject: "Betreff",
        message: "Ihre Nachricht",
        btnText: "Nachricht senden",
        btnSending: "Wird gesendet...",
        success: "Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.",
        error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später noch einmal."
      }
    },
    tr: {
      tag: "Bize Ulaşın",
      title: "İletişime",
      titleSpan: "Geçelim",
      desc: "Hizmetlerimiz hakkında sorularınız mı var veya doğrudan personel talebinde mi bulunmak istiyorsunuz? Ekibimiz size her zaman yardımcı olmaya hazırdır.",
      info: {
        address: { title: "Ofisimiz", value: "Musterstraße 123, 10115 Berlin, Almanya" },
        email: { title: "E-Posta Adresi", value: "info@fairmitteln.com.tr" },
        phone: { title: "Telefon", value: "+49 (0) 30 123 456 78" },
        hours: { title: "Çalışma Saatleri", value: "Pzt. - Cum.: 09:00 - 18:00" }
      },
      form: {
        name: "Adınız",
        email: "E-Posta Adresiniz",
        subject: "Konu",
        message: "Mesajınız",
        btnText: "Mesajı Gönder",
        btnSending: "Gönderiliyor...",
        success: "Teşekkürler! Mesajınız başarıyla gönderildi.",
        error: "Bir hata oluştu. Lütfen daha sonra tekrar deneyin."
      }
    },
    en: {
      tag: "Get in Touch",
      title: "Let's Start a",
      titleSpan: "Conversation",
      desc: "Do you have questions about our services or would you like to submit a personnel request directly? Our team is always at your disposal.",
      info: {
        address: { title: "Our Office", value: "Musterstraße 123, 10115 Berlin, Germany" },
        email: { title: "Email Address", value: "info@fairmitteln.com.tr" },
        phone: { title: "Phone", value: "+49 (0) 30 123 456 78" },
        hours: { title: "Working Hours", value: "Mon. - Fri.: 09:00 - 18:00" }
      },
      form: {
        name: "Your Name",
        email: "Your Email",
        subject: "Subject",
        message: "Your Message",
        btnText: "Send Message",
        btnSending: "Sending...",
        success: "Thank you! Your message has been sent successfully.",
        error: "An error occurred. Please try again later."
      }
    }
  };

  const currentLang = pageTexts[i18n.language] ? i18n.language : 'de';
  const tPage = pageTexts[currentLang];


  const contactCards = [
    { icon: <Mail />, title: tPage.info.email.title, value: tPage.info.email.value, href: `mailto:${tPage.info.email.value}`, delay: 100 },
    { icon: <Phone />, title: tPage.info.phone.title, value: tPage.info.phone.value, href: "tel:+493012345678", delay: 200 },
    { icon: <MapPin />, title: tPage.info.address.title, value: tPage.info.address.value, href: null, delay: 300 },
    { icon: <Clock />, title: tPage.info.hours.title, value: tPage.info.hours.value, href: null, delay: 400 }
  ];

  return (
    <div className="min-h-screen bg-[#fcfcfd] flex flex-col font-sans overflow-hidden">
      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        
        {/* HERO ALANI */}
        <div className="w-full relative z-20 mb-16">
          <div className="absolute top-0 right-1/4 w-[500px] h-[400px] bg-[#4F9CF9]/10 rounded-full blur-[120px] -z-10"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <Reveal direction="up" delay={100}>
                <div className="inline-flex items-center space-x-2 bg-white border border-gray-100 px-5 py-2 rounded-full mb-8 shadow-sm">
                  <Sparkles className="w-4 h-4 text-[#FFE492]" />
                  <span className="text-sm font-bold text-[#043873] uppercase tracking-widest">
                    {tPage.tag}
                  </span>
                </div>
              </Reveal>
              
              <Reveal direction="up" delay={200}>
                <h1 className="text-5xl sm:text-6xl font-black text-[#043873] mb-6 tracking-tight leading-[1.1]">
                  {tPage.title} <br className="hidden sm:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#043873] to-[#4F9CF9]">
                    {tPage.titleSpan}
                  </span>
                </h1>
              </Reveal>
              
              <Reveal direction="up" delay={300}>
                <p className="text-lg text-gray-500 leading-relaxed font-medium">
                  {tPage.desc}
                </p>
              </Reveal>
            </div>
          </div>
        </div>

        {/* İKİ KOLONLU İLETİŞİM ALANI */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            
            {/* SOL TARAF: İletişim Kartları */}
            <div className="w-full lg:w-5/12 flex flex-col justify-center space-y-6">
              {contactCards.map((card, idx) => (
                <Reveal key={idx} direction="right" delay={card.delay}>
                  <div className="group relative bg-white p-6 lg:p-8 rounded-[2rem] border border-gray-100 shadow-[0_10px_40px_rgba(4,56,115,0.03)] hover:shadow-xl transition-all duration-500 overflow-hidden">
                    {/* Hover Glow */}
                    <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#4F9CF9]/5 rounded-full blur-2xl group-hover:bg-[#4F9CF9]/10 transition-colors duration-500"></div>
                    
                    <div className="flex items-center relative z-10">
                      <div className="w-16 h-16 bg-[#f4f7fe] rounded-2xl flex items-center justify-center text-[#043873] group-hover:bg-[#4F9CF9] group-hover:text-white transition-colors duration-500 mr-6 shadow-sm flex-shrink-0">
                        {React.cloneElement(card.icon, { className: "w-7 h-7" })}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">
                          {card.title}
                        </h4>
                        {card.href ? (
                          <a href={card.href} className="text-xl font-bold text-[#043873] hover:text-[#4F9CF9] transition-colors">
                            {card.value}
                          </a>
                        ) : (
                          <p className="text-lg font-bold text-[#043873]">
                            {card.value}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* SAĞ TARAF: İletişim Formu */}
            <div className="w-full lg:w-7/12">
              <Reveal direction="left" delay={300} className="h-full">
                <div className="bg-white p-8 lg:p-12 rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-blue-900/5 h-full relative overflow-hidden">
                  
                  {/* Başarı Mesajı Animasyonu */}
                  <div className={`absolute inset-0 bg-[#043873] z-50 flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${status === 'success' ? 'opacity-100 pointer-events-auto scale-100 rounded-[2.5rem]' : 'opacity-0 pointer-events-none scale-110 rounded-full'}`}>
                    <CheckCircle2 className="w-20 h-20 text-[#FFE492] mb-6 animate-bounce" />
                    <h3 className="text-3xl font-black text-white mb-2">{tPage.form.success}</h3>
                    <p className="text-blue-100/80">Wir werden uns in Kürze bei Ihnen melden.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* İsim Alanı */}
                      <div className="relative">
                        <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-300 ${focusedInput === 'name' ? 'text-[#4F9CF9]' : 'text-gray-400'}`}>
                          <User className="w-5 h-5" />
                        </div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => setFocusedInput('name')}
                          onBlur={() => setFocusedInput(null)}
                          required
                          className="w-full pl-12 pr-4 py-4 bg-[#f8f9fa] border-2 border-transparent rounded-xl focus:bg-white focus:border-[#4F9CF9] outline-none transition-all duration-300 text-gray-700 font-medium"
                          placeholder={tPage.form.name}
                        />
                      </div>

                      {/* E-Posta Alanı */}
                      <div className="relative">
                        <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-300 ${focusedInput === 'email' ? 'text-[#4F9CF9]' : 'text-gray-400'}`}>
                          <AtSign className="w-5 h-5" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => setFocusedInput('email')}
                          onBlur={() => setFocusedInput(null)}
                          required
                          className="w-full pl-12 pr-4 py-4 bg-[#f8f9fa] border-2 border-transparent rounded-xl focus:bg-white focus:border-[#4F9CF9] outline-none transition-all duration-300 text-gray-700 font-medium"
                          placeholder={tPage.form.email}
                        />
                      </div>
                    </div>

                    {/* Konu Alanı */}
                    <div className="relative">
                      <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-300 ${focusedInput === 'subject' ? 'text-[#4F9CF9]' : 'text-gray-400'}`}>
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onFocus={() => setFocusedInput('subject')}
                        onBlur={() => setFocusedInput(null)}
                        required
                        className="w-full pl-12 pr-4 py-4 bg-[#f8f9fa] border-2 border-transparent rounded-xl focus:bg-white focus:border-[#4F9CF9] outline-none transition-all duration-300 text-gray-700 font-medium"
                        placeholder={tPage.form.subject}
                      />
                    </div>

                    {/* Mesaj Alanı */}
                    <div className="relative">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedInput('message')}
                        onBlur={() => setFocusedInput(null)}
                        required
                        rows="5"
                        className="w-full p-4 bg-[#f8f9fa] border-2 border-transparent rounded-xl focus:bg-white focus:border-[#4F9CF9] outline-none transition-all duration-300 text-gray-700 font-medium resize-none"
                        placeholder={tPage.form.message}
                      ></textarea>
                    </div>

                    {/* Hata Mesajı */}
                    {status === 'error' && (
                      <div className="flex items-center text-red-500 font-medium bg-red-50 p-3 rounded-lg">
                        <AlertCircle className="w-5 h-5 mr-2" />
                        {tPage.form.error}
                      </div>
                    )}

                    {/* Gönder Butonu */}
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="group w-full flex items-center justify-center px-8 py-5 text-lg font-bold rounded-xl text-[#043873] bg-[#FFE492] hover:bg-[#f5d97f] hover:shadow-lg transition-all duration-300 disabled:opacity-70"
                    >
                      {status === 'submitting' ? (
                        <span className="flex items-center">
                          <div className="w-5 h-5 border-2 border-[#043873] border-t-transparent rounded-full animate-spin mr-3"></div>
                          {tPage.form.btnSending}
                        </span>
                      ) : (
                        <span className="flex items-center">
                          {tPage.form.btnText}
                          <Send className="ml-3 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </span>
                      )}
                    </button>
                    
                  </form>
                  div
                </div>
              </Reveal>
            </div>
            
          </div>  
        </div>
      </main> 
      <Footer />
    </div>
  );
};

export default Kontakt;