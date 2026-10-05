import React from 'react';
import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FormProgress = ({ currentStep }) => {
  const { t } = useTranslation();

  const steps = [
    { num: 1, title: t('form.steps.s1') },
    { num: 2, title: t('form.steps.s2') },
    { num: 3, title: t('form.steps.s3') }
  ];

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 rounded-full -z-10"></div>
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-accent-600 rounded-full -z-10 transition-all duration-500 ease-in-out"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        ></div>

        {steps.map((step) => {
          const isCompleted = currentStep > step.num;
          const isActive = currentStep === step.num;

          return (
            <div key={step.num} className="flex flex-col items-center relative z-10 bg-background px-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${isCompleted ? 'bg-accent-600 text-white shadow-md' : isActive ? 'bg-navy-900 text-white shadow-lg ring-4 ring-blue-100' : 'bg-white text-gray-400 border-2 border-gray-200'}`}>
                {isCompleted ? <Check className="w-5 h-5" /> : `0${step.num}`}
              </div>
              <span className={`mt-3 text-xs font-semibold uppercase tracking-wider ${isActive ? 'text-navy-900' : isCompleted ? 'text-accent-600' : 'text-gray-400'}`}>
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FormProgress;