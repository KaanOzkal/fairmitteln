import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FormProgress from '../components/FormProgress';
import FormStepCompany from '../components/FormStepCompany';
import FormStepDemand from '../components/FormStepDemand';
import FormStepAdditional from '../components/FormStepAdditional';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { CheckCircle2, Loader2, ArrowLeft, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Application = () => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({}); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [appNumber, setAppNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Sayfa yüklendiğinde en üste çık
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNext = (stepData) => {
    setFormData((prev) => ({ ...prev, ...stepData }));
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (finalData) => {
    const completeData = { ...formData, ...finalData };
    
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      const formDataToSend = new FormData();
      
      Object.keys(completeData).forEach(key => {
        // Dosya yükleme kontrolü
        if (key === 'document' && completeData[key]) {
          formDataToSend.append('document', completeData[key]);
        } 
        // Çoklu tır seçimi (Array) gibi dizileri arka plana (Node.js) doğru formata çevirme
        else if (Array.isArray(completeData[key])) {
          completeData[key].forEach(val => formDataToSend.append(key, val));
        } 
        // Normal metin/sayı alanları
        else {
          formDataToSend.append(key, completeData[key]);
        }
      });

      // GERÇEK BACKEND İSTEĞİ (Node.js API)
      const response = await axios.post('http://localhost:5000/api/applications', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.success) {
        setAppNumber(response.data.applicationNumber);
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("Form Gönderim Hatası:", error);
      setErrorMessage(error.response?.data?.message || 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fcfcfd]">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative">
        {/* Arka Plan Süslemeleri */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#4F9CF9]/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FFE492]/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>

        <div className="max-w-4xl mx-auto">
          
          {isSuccess ? (
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-16 text-center animate-in zoom-in-95 duration-500">
              <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              
              <h1 className="text-4xl font-black text-[#043873] mb-6">
                Vielen Dank!
              </h1>
              
              <p className="text-gray-600 text-lg mb-10 leading-relaxed max-w-lg mx-auto">
                Ihre Anfrage wurde erfolgreich übermittelt. Unser Team wird sich in Kürze persönlich bei Ihnen melden.
              </p>

              <div className="bg-[#f8f9fa] border border-gray-200 rounded-2xl p-8 mb-10 inline-block max-w-md w-full shadow-sm">
                <span className="text-sm uppercase tracking-widest text-gray-400 font-bold block mb-2">
                  Referenznummer
                </span>
                <span className="text-3xl font-black text-[#4F9CF9] tracking-wider">
                  {appNumber}
                </span>
              </div>

              <div>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center px-10 py-4 bg-[#043873] text-white font-bold rounded-xl hover:bg-[#4F9CF9] transition-all duration-300 shadow-lg hover:shadow-[#4F9CF9]/30"
                >
                  <ArrowLeft className="w-5 h-5 mr-3" />
                  Zurück zur Startseite
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-16 animate-in slide-in-from-bottom-4 duration-700">
                <h1 className="text-4xl md:text-5xl font-black text-[#043873] mb-6 tracking-tight">
                  {t('form.title')}
                </h1>
                <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">
                  {t('form.desc')}
                </p>
              </div>

              <div className="bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(4,56,115,0.05)] border border-gray-100 p-8 sm:p-12 lg:p-16 min-h-[500px] relative overflow-hidden">
                
                {/* YÜKLENİYOR EKRANI */}
                {isSubmitting && (
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center rounded-[2.5rem]">
                    <Loader2 className="w-12 h-12 text-[#4F9CF9] animate-spin mb-4" />
                    <p className="text-[#043873] font-bold text-lg">Ihre Anfrage wird gesendet...</p>
                  </div>
                )}

                {/* HATA MESAJI */}
                {errorMessage && (
                  <div className="mb-8 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-bold text-center flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    {errorMessage}
                  </div>
                )}

                <FormProgress currentStep={currentStep} />
                
                <div className="mt-12 overflow-hidden">
                  {currentStep === 1 && <FormStepCompany defaultValues={formData} onNext={handleNext} />}
                  {currentStep === 2 && <FormStepDemand defaultValues={formData} onNext={handleNext} onBack={handleBack} />}
                  {currentStep === 3 && <FormStepAdditional defaultValues={formData} onSubmit={handleSubmit} onBack={handleBack} />}
                </div>
              </div>
            </>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Application;