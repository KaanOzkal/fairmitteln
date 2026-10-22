import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UploadCloud, FileText, X, Award, Sparkles } from 'lucide-react';

const FormStepAdditional = ({ defaultValues, onSubmit, onBack }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'de';

  const dict = {
    de: { certs: 'Erforderliche Zertifikate (Optional)', certPlace: 'z.B. ADR-Schein, Staplerschein...', skills: 'Besondere Fähigkeiten (Optional)', skillPlace: 'z.B. Kranbedienung, Zollabwicklung...' },
    tr: { certs: 'Gerekli Sertifikalar (İsteğe Bağlı)', certPlace: 'Örn. ADR Belgesi, Forklift Ehliyeti...', skills: 'Özel Beceriler (İsteğe Bağlı)', skillPlace: 'Örn. Vinç kullanımı, Gümrük işlemleri...' },
    en: { certs: 'Required Certificates (Optional)', certPlace: 'e.g. ADR Certificate, Forklift License...', skills: 'Special Skills (Optional)', skillPlace: 'e.g. Crane operation, Customs clearance...' }
  };
  const l = dict[currentLang] || dict.de;

  const [requirements, setRequirements] = useState(defaultValues.requirements || '');
  const [certificates, setCertificates] = useState(defaultValues.certificates || '');
  const [specialSkills, setSpecialSkills] = useState(defaultValues.specialSkills || '');
  const [privacyAccepted, setPrivacyAccepted] = useState(defaultValues.privacyAccepted || false);
  const [file, setFile] = useState(defaultValues.document || null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => { e.target.files && e.target.files[0] && setFile(e.target.files[0]); };
  const removeFile = () => setFile(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!privacyAccepted) return setError(t('form.errors.required'));
    setError('');
    onSubmit({ requirements, certificates, specialSkills, privacyAccepted, document: file });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in slide-in-from-right-4 duration-500">
      <h2 className="text-2xl font-bold text-[#043873]">{t('form.add.title')}</h2>
      
      {/* Yeni: Sertifikalar */}
      <div>
        <label className="flex items-center text-sm font-semibold text-gray-700 mb-2"><Award className="w-4 h-4 mr-2 text-[#4F9CF9]"/>{l.certs}</label>
        <input type="text" value={certificates} onChange={(e) => setCertificates(e.target.value)} placeholder={l.certPlace} className="w-full px-4 py-3 bg-white rounded-lg border border-gray-300 focus:border-[#4F9CF9] outline-none" />
      </div>

      {/* Yeni: Özel Beceriler */}
      <div>
        <label className="flex items-center text-sm font-semibold text-gray-700 mb-2"><Sparkles className="w-4 h-4 mr-2 text-[#4F9CF9]"/>{l.skills}</label>
        <input type="text" value={specialSkills} onChange={(e) => setSpecialSkills(e.target.value)} placeholder={l.skillPlace} className="w-full px-4 py-3 bg-white rounded-lg border border-gray-300 focus:border-[#4F9CF9] outline-none" />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">{t('form.add.req')}</label>
        <textarea rows="4" value={requirements} onChange={(e) => setRequirements(e.target.value)} placeholder={t('form.add.reqPlace')} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#4F9CF9] outline-none resize-none"></textarea>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Dokumente hochladen (Optional)</label>
        {!file ? (
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-[#f8f9fa] hover:bg-gray-50 transition-colors">
            <UploadCloud className="w-8 h-8 text-[#4F9CF9] mb-2" />
            <p className="text-sm text-gray-600 font-medium">PDF, DOCX oder JPG hier ablegen</p>
            <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.doc,.docx,.jpg,.png" />
          </label>
        ) : (
          <div className="flex items-center justify-between p-4 bg-blue-50 border border-[#4F9CF9]/30 rounded-lg">
            <div className="flex items-center space-x-3"><FileText className="w-6 h-6 text-[#4F9CF9]" /><span className="text-sm font-medium text-[#043873]">{file.name}</span></div>
            <button type="button" onClick={removeFile} className="text-gray-400 hover:text-red-500"><X className="w-5 h-5" /></button>
          </div>
        )}
      </div>

      <div className="flex items-start mt-8">
        <input id="privacy" type="checkbox" checked={privacyAccepted} onChange={(e) => { setPrivacyAccepted(e.target.checked); if (e.target.checked) setError(''); }} className="w-5 h-5 mt-0.5 text-[#4F9CF9] rounded" />
        <div className="ml-3 text-sm">
          <label htmlFor="privacy" className="font-medium text-gray-700 cursor-pointer">{t('form.add.privacy')}</label>
          {error && <p className="text-red-500 mt-1">{error}</p>}
        </div>
      </div>

      <div className="flex justify-between pt-6 border-t border-gray-100">
        <button type="button" onClick={onBack} className="px-6 py-3 text-sm font-bold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">{t('form.btns.back')}</button>
        <button type="submit" className="px-8 py-3 text-sm font-bold text-[#043873] bg-[#FFE492] rounded-lg hover:bg-yellow-400 shadow-sm">{t('form.btns.submit')}</button>
      </div>
    </form>
  );
};
export default FormStepAdditional;