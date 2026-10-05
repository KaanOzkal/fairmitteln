import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#043873] text-blue-100 font-sans border-t border-blue-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <h2 className="text-3xl font-bold text-white tracking-wider">
                FAIRMITTELN
              </h2>
            </Link>
            <p className="text-blue-200/80 leading-relaxed mb-8 max-w-sm">
              {t('foot.desc')}
            </p>
            <div className="flex items-center space-x-4">
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">
              {t('foot.t1')}
            </h3>
            <ul className="space-y-4">
              <li>
                <a href="#ablauf" className="hover:text-[#FFE492] transition-colors flex items-center group">
                  <ArrowRight className="w-4 h-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[#FFE492]" />
                  {t('foot.l2')}
                </a>
              </li>
              <li>
                <Link to="/anfrage" className="hover:text-[#FFE492] transition-colors flex items-center group">
                  <ArrowRight className="w-4 h-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[#FFE492]" />
                  {t('foot.l4')}
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-[#FFE492] transition-colors flex items-center group">
                  <ArrowRight className="w-4 h-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[#FFE492]" />
                  {t('foot.l3')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">
              {t('foot.t2')}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-[#4F9CF9] flex-shrink-0 mt-1" />
                <span><br />Berlin, Deutschland</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-[#4F9CF9] flex-shrink-0" />
                <a href="tel:+905069998080" className="hover:text-white transition-colors">+90 506 999 80 80</a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-[#4F9CF9] flex-shrink-0" />
                <a href="mailto:info@fairmitteln.com.tr" className="hover:text-white transition-colors">info@fairmitteln.com.tr</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">
              {t('nav.request')}
            </h3>
            <p className="text-blue-200/80 mb-4">
              {t('cta.desc')}
            </p>
            <Link 
              to="/anfrage"
              className="inline-flex justify-center items-center px-6 py-3 bg-[#FFE492] hover:bg-yellow-400 text-[#043873] font-bold rounded-lg transition-colors"
            >
              {t('cta.btn')}
            </Link>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-blue-200/60">
          <p>
            &copy; {currentYear} FAIRMITTELN. {t('foot.rights')}
          </p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">{t('foot.l6')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('foot.l5')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;