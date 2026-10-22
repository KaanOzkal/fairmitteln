import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslation } from 'react-i18next';

const bundeslaender = ["Baden-Württemberg", "Bayern", "Berlin", "Brandenburg", "Bremen", "Hamburg", "Hessen", "Mecklenburg-Vorpommern", "Niedersachsen", "Nordrhein-Westfalen", "Rheinland-Pfalz", "Saarland", "Sachsen", "Sachsen-Anhalt", "Schleswig-Holstein", "Thüringen"];

const FormStepCompany = ({ defaultValues, onNext }) => {
  const { t } = useTranslation();

  const schema = useMemo(() => z.object({
    companyName: z.string().min(1, { message: t('form.errors.required') }),
    contactPerson: z.string().min(1, { message: t('form.errors.required') }),
    email: z.string().email({ message: t('form.errors.email') }),
    phone: z.string().min(1, { message: t('form.errors.required') }),
    website: z.string().optional(),
    street: z.string().optional(),
    postalCode: z.string().optional(),
    city: z.string().min(1, { message: t('form.errors.required') }),
    state: z.string().min(1, { message: t('form.errors.required') }),
  }), [t]);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues || {}
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h2 className="text-2xl font-bold text-navy-900">{t('form.company.title')}</h2>
        <p className="text-sm text-gray-500 mt-1">{t('form.company.desc')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-navy-900 mb-1">{t('form.company.name')}</label>
          <input {...register('companyName')} className={`w-full px-4 py-2.5 border rounded-md focus:ring-2 focus:ring-accent-600 outline-none transition-all ${errors.companyName ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'}`} />
          {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-navy-900 mb-1">{t('form.company.contact')}</label>
          <input {...register('contactPerson')} className={`w-full px-4 py-2.5 border rounded-md focus:ring-2 focus:ring-accent-600 outline-none transition-all ${errors.contactPerson ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'}`} />
          {errors.contactPerson && <p className="text-red-500 text-xs mt-1">{errors.contactPerson.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-navy-900 mb-1">{t('form.company.email')}</label>
          <input type="email" {...register('email')} className={`w-full px-4 py-2.5 border rounded-md focus:ring-2 focus:ring-accent-600 outline-none transition-all ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'}`} />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-navy-900 mb-1">{t('form.company.phone')}</label>
          <input {...register('phone')} className={`w-full px-4 py-2.5 border rounded-md focus:ring-2 focus:ring-accent-600 outline-none transition-all ${errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'}`} />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-navy-900 mb-1">{t('form.company.web')}</label>
          <input {...register('website')} className="w-full px-4 py-2.5 border border-gray-300 bg-gray-50 rounded-md focus:ring-2 focus:ring-accent-600 outline-none transition-all" />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-navy-900 mb-1">{t('form.company.street')}</label>
          <input {...register('street')} className="w-full px-4 py-2.5 border border-gray-300 bg-gray-50 rounded-md focus:ring-2 focus:ring-accent-600 outline-none transition-all" />
        </div>

        <div>
          <label className="block text-sm font-medium text-navy-900 mb-1">{t('form.company.zip')}</label>
          <input {...register('postalCode')} className="w-full px-4 py-2.5 border border-gray-300 bg-gray-50 rounded-md focus:ring-2 focus:ring-accent-600 outline-none transition-all" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-navy-900 mb-1">{t('form.company.city')}</label>
          <input {...register('city')} className={`w-full px-4 py-2.5 border rounded-md focus:ring-2 focus:ring-accent-600 outline-none transition-all ${errors.city ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'}`} />
          {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-navy-900 mb-1">{t('form.company.state')}</label>
          <select {...register('state')} className={`w-full px-4 py-2.5 border rounded-md focus:ring-2 focus:ring-accent-600 outline-none transition-all ${errors.state ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'}`}>
            <option value="">{t('form.demand.select')}</option>
            {bundeslaender.map(land => <option key={land} value={land}>{land}</option>)}
          </select>
          {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
        </div>
      </div>
      
        

      <div className="pt-8 flex justify-end">                                
        <button type="submit" className="px-8 py-3 bg-accent-600 hover:bg-accent-700 text-white font-bold rounded-md transition-all shadow-md">
          {t('form.btns.next')}
        </button>
      </div>
    </form>
  );
};

export default FormStepCompany;