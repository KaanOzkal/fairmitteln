import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, Truck, Globe, Clock, Banknote } from 'lucide-react';

const FormStepDemand = ({ defaultValues, onNext, onBack }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'de';

  // --- DİNAMİK YEREL ÇEVİRİLER ---
  const dict = {
    de: {
      nat: 'Nationalität', natTr: 'Türkisch', natUz: 'Usbekisch', natOther: 'Andere', natSpecify: 'Bitte angeben...',
      ger: 'Deutschkenntnisse', gerNone: 'Nicht zwingend erforderlich', gerBasic: 'Grundkenntnisse (A1-A2)', gerGood: 'Gute Kenntnisse (B1-B2)', gerFluent: 'Fließend (C1-C2)',
      hours: 'Wöchentliche Arbeitszeit (Std.)', wage: 'Bruttostundenlohn (€)',
      expAny: 'Keine Präferenz', exp15: '1–5 Jahre', exp5: '5+ Jahre',
      route: 'Einsatzbereich (Mehrfachauswahl)', routeShort: 'Nahverkehr', routeLong: 'Fernverkehr', routeInt: 'International'
    },
    tr: {
      nat: 'Uyruk Tercihi', natTr: 'Türk', natUz: 'Özbek', natOther: 'Diğer', natSpecify: 'Lütfen belirtin...',
      ger: 'Almanca Dil Seviyesi', gerNone: 'Gerekli Değil', gerBasic: 'Temel Seviye (A1-A2)', gerGood: 'İyi Seviye (B1-B2)', gerFluent: 'Akıcı (C1-C2)',
      hours: 'Haftalık Çalışma Süresi (Saat)', wage: 'Brüt Saatlik Ücret (€)',
      expAny: 'Farketmez', exp15: '1-5 Yıl', exp5: '5+ Yıl',
      route: 'Çalışma Rotası (Çoklu Seçim)', routeShort: 'Kısa Mesafe', routeLong: 'Uzun Mesafe', routeInt: 'Uluslararası'
    },
    en: {
      nat: 'Nationality Preference', natTr: 'Turkish', natUz: 'Uzbek', natOther: 'Other', natSpecify: 'Please specify...',
      ger: 'German Language Level', gerNone: 'Not mandatory', gerBasic: 'Basic (A1-A2)', gerGood: 'Good (B1-B2)', gerFluent: 'Fluent (C1-C2)',
      hours: 'Weekly Working Hours', wage: 'Gross Hourly Wage (€)',
      expAny: 'No Preference', exp15: '1-5 Years', exp5: '5+ Years',
      route: 'Driving Route (Multi-select)', routeShort: 'Short Distance', routeLong: 'Long Distance', routeInt: 'International'
    }
  };
  const l = dict[currentLang] || dict.de;

  const schema = useMemo(() => z.object({
    industry: z.string().min(1, { message: t('form.errors.required') }),
    position: z.string().min(1, { message: t('form.errors.required') }),
    employeeCount: z.coerce.number().min(1, { message: t('form.errors.min1') }),
    employmentType: z.string().min(1, { message: t('form.errors.required') }),
    workLocation: z.string().min(1, { message: t('form.errors.required') }),
    startDate: z.string().min(1, { message: t('form.errors.required') }),
    nationality: z.string().optional(),
    otherNationality: z.string().optional(),
    germanLevel: z.string().optional(),
    weeklyHours: z.string().optional(),
    hourlyWage: z.string().optional(),
    drivingLicense: z.string().optional(),
    experience: z.string().optional(),
    accommodation: z.string().optional(),
    drivingRoute: z.array(z.string()).optional(),
    truckType: z.array(z.string()).optional(),
  }), [t]);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { employeeCount: 1, truckType: [], drivingRoute: [], ...defaultValues }
  });

  const selectedIndustry = watch('industry');
  const selectedPosition = watch('position');
  const selectedTruckTypes = watch('truckType') || [];
  const selectedRoutes = watch('drivingRoute') || [];
  const selectedNat = watch('nationality');

  const isDriver = (selectedIndustry === 'Transport' || selectedIndustry === 'Logistik' || selectedIndustry === 'Spedition') 
                    && (selectedPosition === 'LKW-Fahrer' || selectedPosition === 'Berufskraftfahrer');

  useEffect(() => {
    if (!isDriver) {
      setValue('drivingLicense', ''); setValue('drivingRoute', []); setValue('truckType', []);
    }
  }, [isDriver, setValue]);

  const toggleTruckType = (type) => {
    setValue('truckType', selectedTruckTypes.includes(type) ? selectedTruckTypes.filter(t => t !== type) : [...selectedTruckTypes, type], { shouldValidate: true });
  };

  const toggleRoute = (route) => {
    setValue('drivingRoute', selectedRoutes.includes(route) ? selectedRoutes.filter(r => r !== route) : [...selectedRoutes, route], { shouldValidate: true });
  };

  const truckOptions = [
    { id: 'cekici', image: '/images/cekicit.jpg', tr: 'Çekici (Standart)', de: 'Sattelzugmaschine', en: 'Tractor Unit (Standard)' },
    { id: 'tenteli', image: '/images/tenteli.jpeg', tr: 'Tenteli Tır (Curtainsider)', de: 'Planensattelzug', en: 'Curtainsider' },
    { id: 'mega', image: '/images/mega.webp', tr: 'Mega Tır (Mega Trailer)', de: 'Mega-Trailer', en: 'Mega Trailer' },
    { id: 'frigo', image: '/images/frigo.jpg', tr: 'Frigo Tır (Refrigerated)', de: 'Kühlkoffer / Frigo', en: 'Refrigerated Truck' },
    { id: 'lowbed', image: '/images/lowbed.jpg', tr: 'Lowbed Tır', de: 'Tieflader', en: 'Lowbed Trailer' },
    { id: 'konteyner', image: '/images/konteynır.jpeg', tr: 'Konteyner Taşıyıcı', de: 'Containerchassis', en: 'Container Chassis' },
    { id: 'tanker', image: '/images/tanker.jpg', tr: 'Tanker Tır', de: 'Tankwagen', en: 'Tanker Truck' },
    { id: 'silobas', image: '/images/silobas.webp', tr: 'Silobas Tır', de: 'Silozug', en: 'Silo Truck' },
    { id: 'damperli', image: '/images/damper.jpg', tr: 'Damperli Tır', de: 'Kipper', en: 'Tipper Truck' },
    { id: 'oto', image: '/images/ototas.webp', tr: 'Oto Taşıyıcı Tır', de: 'Autotransporter', en: 'Car Transporter' }
  ];

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6 animate-in fade-in duration-500">
      
      <div className="border-b border-gray-100 pb-5 mb-8">
        <h2 className="text-2xl sm:text-3xl font-black text-[#043873]">{t('form.demand.title')}</h2>
      </div>

      {/* --- TEMEL BİLGİLER --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-[#043873] mb-2">{t('form.demand.ind')}</label>
          <select {...register('industry')} className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-[#4F9CF9] outline-none">
            <option value="">{t('form.demand.select')}</option>
            <option value="Transport">{t('form.opts.transport')}</option>
            <option value="Logistik">{t('form.opts.logistik')}</option>
            <option value="Spedition">{t('form.opts.spedition')}</option>
            <option value="Lager">{t('form.opts.lager')}</option>
            <option value="Produktion">{t('form.opts.produktion')}</option>
            <option value="Bau">{t('form.opts.bau')}</option>
            <option value="Sonstige">{t('form.opts.sonstige')}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-[#043873] mb-2">{t('form.demand.pos')}</label>
          <select {...register('position')} className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-[#4F9CF9] outline-none">
            <option value="">{t('form.demand.select')}</option>
            <option value="LKW-Fahrer">{t('form.opts.lkw')}</option>
            <option value="Berufskraftfahrer">{t('form.opts.beruf')}</option>
            <option value="Lagerhelfer">{t('form.opts.lagerhelfer')}</option>
            <option value="Lagermitarbeiter">{t('form.opts.lagermit')}</option>
            <option value="Produktionsmitarbeiter">{t('form.opts.prodmit')}</option>
            <option value="Sonstige">{t('form.opts.sonstige')}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-[#043873] mb-2">{t('form.demand.count')} (Miktar)</label>
          <input type="number" min="1" {...register('employeeCount')} className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-[#4F9CF9] outline-none" />
        </div>

        <div>
          <label className="block text-sm font-bold text-[#043873] mb-2">{t('form.demand.type')}</label>
          <select {...register('employmentType')} className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-[#4F9CF9] outline-none">
            <option value="">{t('form.demand.select')}</option>
            <option value="Vollzeit">{t('form.opts.vollzeit')}</option>
            <option value="Teilzeit">{t('form.opts.teilzeit')}</option>
            <option value="Minijob">{t('form.opts.minijob')}</option>
            <option value="Sonstige">{t('form.opts.sonstige')}</option>
          </select>
        </div>
      </div>

      {/* --- YENİ KURUMSAL DETAYLAR (Uyruk, Maaş, Süre, Almanca) --- */}
      <div className="mt-8 p-6 bg-gradient-to-br from-[#f8f9fa] to-white border border-gray-200 rounded-[2rem] shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Uyruk */}
          <div>
            <label className="flex items-center text-sm font-bold text-[#043873] mb-2"><Globe className="w-4 h-4 mr-2 text-[#4F9CF9]"/>{l.nat}</label>
            <select {...register('nationality')} className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-[#4F9CF9] outline-none">
              <option value="">{t('form.demand.select')}</option>
              <option value="Türk">{l.natTr}</option>
              <option value="Özbek">{l.natUz}</option>
              <option value="Diğer">{l.natOther}</option>
            </select>
            {selectedNat === 'Diğer' && (
              <input {...register('otherNationality')} placeholder={l.natSpecify} className="w-full mt-3 px-4 py-3 bg-white border-2 border-[#4F9CF9]/50 rounded-xl focus:border-[#4F9CF9] outline-none animate-in fade-in" />
            )}
          </div>

          {/* Almanca Seviyesi */}
          <div>
            <label className="block text-sm font-bold text-[#043873] mb-2">{l.ger}</label>
            <select {...register('germanLevel')} className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-[#4F9CF9] outline-none">
              <option value="">{t('form.demand.select')}</option>
              <option value="Gerekli Değil">{l.gerNone}</option>
              <option value="A1/A2">{l.gerBasic}</option>
              <option value="B1/B2">{l.gerGood}</option>
              <option value="C1+">{l.gerFluent}</option>
            </select>
          </div>

          {/* Çalışma Saatleri */}
          <div>
            <label className="flex items-center text-sm font-bold text-[#043873] mb-2"><Clock className="w-4 h-4 mr-2 text-[#4F9CF9]"/>{l.hours}</label>
            <input type="number" {...register('weeklyHours')} placeholder="z.B. 40" className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-[#4F9CF9] outline-none" />
          </div>

          {/* Saatlik Ücret */}
          <div>
            <label className="flex items-center text-sm font-bold text-[#043873] mb-2"><Banknote className="w-4 h-4 mr-2 text-[#4F9CF9]"/>{l.wage}</label>
            <input type="text" {...register('hourlyWage')} placeholder="z.B. 18.50" className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-[#4F9CF9] outline-none" />
          </div>

        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <div>
          <label className="block text-sm font-bold text-[#043873] mb-2">{t('form.demand.loc')}</label>
          <input {...register('workLocation')} placeholder="z.B. Berlin, München" className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-[#4F9CF9] outline-none" />
        </div>
        <div>
          <label className="block text-sm font-bold text-[#043873] mb-2">{t('form.demand.start')}</label>
          <select {...register('startDate')} className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-[#4F9CF9] outline-none">
            <option value="">{t('form.demand.select')}</option>
            <option value="Sofort">{t('form.opts.sofort')}</option>
            <option value="Innerhalb eines Monats">{t('form.opts.monat1')}</option>
            <option value="In 1–3 Monaten">{t('form.opts.monat3')}</option>
          </select>
        </div>
      </div>

      {/* --- ŞOFÖR SEÇİLDİYSE ÖZEL ALAN --- */}
      {isDriver && (
        <div className="mt-12 p-6 sm:p-10 bg-[#043873]/5 border border-[#043873]/10 rounded-[2rem] space-y-10">
          <div className="flex items-center space-x-4 border-b border-gray-200 pb-5">
            <div className="w-12 h-12 bg-[#043873] rounded-xl flex items-center justify-center shadow-md">
              <Truck className="w-6 h-6 text-[#FFE492]" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-[#043873]">LKW-Fahrer Details</h3>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-bold text-[#043873] mb-2">{t('form.demand.license')}</label>
              <select {...register('drivingLicense')} className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-[#4F9CF9] outline-none">
                <option value="">{t('form.demand.select')}</option>
                <option value="Klasse C">{t('form.opts.c')}</option>
                <option value="Klasse CE">{t('form.opts.ce')}</option>
                <option value="C + CE">{t('form.opts.cce')}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-[#043873] mb-2">{t('form.demand.exp')}</label>
              <select {...register('experience')} className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-[#4F9CF9] outline-none">
                <option value="">{t('form.demand.select')}</option>
                <option value="Farketmez">{l.expAny}</option>
                <option value="1-5 Yıl">{l.exp15}</option>
                <option value="5+ Yıl">{l.exp5}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-[#043873] mb-2">{t('form.demand.acc')}</label>
              <select {...register('accommodation')} className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-[#4F9CF9] outline-none">
                <option value="">{t('form.demand.select')}</option>
                <option value="Ja">{t('form.opts.ja')}</option>
                <option value="Nein">{t('form.opts.nein')}</option>
              </select>
            </div>
          </div>

          {/* Çalışma Rotası (Kısa, Uzun, Uluslararası) */}
          <div>
            <label className="block text-sm font-bold text-[#043873] mb-4">{l.route}</label>
            <div className="flex flex-wrap gap-3">
              {[
                { id: 'Kısa Mesafe', label: l.routeShort }, 
                { id: 'Uzun Mesafe', label: l.routeLong }, 
                { id: 'Uluslararası', label: l.routeInt }
              ].map(route => (
                <div 
                  key={route.id} 
                  onClick={() => toggleRoute(route.id)}
                  className={`cursor-pointer px-5 py-2.5 rounded-full text-sm font-bold border-2 transition-all ${
                    selectedRoutes.includes(route.id) 
                    ? 'bg-[#4F9CF9] border-[#4F9CF9] text-white shadow-md' 
                    : 'bg-white border-gray-200 text-gray-600 hover:border-[#4F9CF9]/50'
                  }`}
                >
                  {route.label}
                </div>
              ))}
            </div>
          </div>

          {/* Tır Seçimi */}
          <div className="pt-8 border-t border-gray-200">
            <h4 className="text-lg font-black text-[#043873] mb-4">Welche Art von LKW werden gefahren?</h4>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {truckOptions.map((truck) => {
                const isSelected = selectedTruckTypes.includes(truck.id);
                return (
                  <div key={truck.id} onClick={() => toggleTruckType(truck.id)} className={`relative cursor-pointer rounded-2xl overflow-hidden border-2 transition-all bg-white ${isSelected ? 'border-[#4F9CF9] ring-4 ring-[#4F9CF9]/20 scale-[1.02]' : 'border-gray-100'}`}>
                    <img src={truck.image} alt={truck.de} className={`w-full h-24 sm:h-32 object-cover transition-transform ${isSelected ? 'scale-110' : ''}`} />
                    <div className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center ${isSelected ? 'bg-[#4F9CF9] text-white' : 'hidden'}`}><CheckCircle2 className="w-5 h-5" /></div>
                    <div className={`p-4 ${isSelected ? 'bg-[#4F9CF9]/5' : 'bg-white'}`}>
                      <p className={`text-sm sm:text-base font-bold ${isSelected ? 'text-[#043873]' : 'text-gray-700'}`}>{truck[currentLang] || truck.de}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className="pt-10 flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
        <button type="button" onClick={onBack} className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-gray-200 text-gray-600 font-bold rounded-xl">{t('form.btns.back')}</button>
        <button type="submit" className="w-full sm:w-auto px-10 py-4 bg-[#FFE492] hover:bg-[#FFD700] text-[#043873] font-black rounded-xl shadow-lg hover:scale-105 transition-all">{t('form.btns.next')}</button>
      </div>
    </form>
  );
};
export default FormStepDemand;