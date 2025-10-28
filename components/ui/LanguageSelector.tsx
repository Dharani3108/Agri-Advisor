import React from 'react';
import { useTranslation } from 'next-i18next';
import { LanguageSelectorProps } from '../../types';

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  onLanguageChange,
  currentLanguage,
  languages = ['Hindi', 'English', 'Tamil', 'Telugu', 'Marathi', 'Kannada', 'Bengali'],
}) => {
  const { t } = useTranslation('common');

  const languageMap = {
    Hindi: { code: 'hi', native: 'हिन्दी' },
    English: { code: 'en', native: 'English' },
    Tamil: { code: 'ta', native: 'தமிழ்' },
    Telugu: { code: 'te', native: 'తెలుగు' },
    Marathi: { code: 'mr', native: 'मराठी' },
    Kannada: { code: 'kn', native: 'ಕನ್ನಡ' },
    Bengali: { code: 'bn', native: 'বাংলা' },
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-primary-800 mb-6">
        {t('selectLanguage')}
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {languages.map((language) => {
          const langInfo = languageMap[language as keyof typeof languageMap];
          const isSelected = currentLanguage === langInfo?.code;
          
          return (
            <button
              key={language}
              onClick={() => onLanguageChange(langInfo?.code || 'hi')}
              className={`
                p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md
                ${isSelected 
                  ? 'border-primary-500 bg-primary-50 text-primary-800' 
                  : 'border-gray-200 bg-white text-gray-700 hover:border-primary-300'
                }
                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
              `}
            >
              <div className="text-center">
                <div className="text-lg font-semibold mb-1">
                  {langInfo?.native}
                </div>
                <div className="text-sm text-gray-600">
                  {language}
                </div>
              </div>
            </button>
          );
        })}
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          {t('languageNote')}
        </p>
      </div>
    </div>
  );
};

export default LanguageSelector;
