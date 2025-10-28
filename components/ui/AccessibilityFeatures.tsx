import React from 'react';
import { useTranslation } from 'next-i18next';
import { AccessibilityFeatures } from '../../types';

interface AccessibilityFeaturesProps {
  features: AccessibilityFeatures;
}

const AccessibilityFeaturesComponent: React.FC<AccessibilityFeaturesProps> = ({ features }) => {
  const { t } = useTranslation('common');

  const featureItems = [
    {
      key: 'keyboard_navigation',
      icon: '⌨️',
      title: t('keyboardNavigation'),
      description: t('keyboardNavigationDesc'),
      enabled: features.keyboard_navigation,
    },
    {
      key: 'large_click_targets',
      icon: '👆',
      title: t('largeClickTargets'),
      description: t('largeClickTargetsDesc'),
      enabled: features.large_click_targets,
    },
    {
      key: 'visual_and_audio_guides',
      icon: '🔊',
      title: t('visualAudioGuides'),
      description: t('visualAudioGuidesDesc'),
      enabled: features.visual_and_audio_guides,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-center text-primary-800 mb-8">
        {t('accessibilityFeatures')}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featureItems.map((item) => (
          <div
            key={item.key}
            className={`
              p-6 rounded-lg border-2 transition-all duration-200
              ${item.enabled 
                ? 'border-primary-500 bg-primary-50' 
                : 'border-gray-200 bg-gray-50'
              }
            `}
          >
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">{item.icon}</span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {item.title}
                </h3>
                <div className="flex items-center">
                  <div className={`
                    w-3 h-3 rounded-full mr-2
                    ${item.enabled ? 'bg-green-500' : 'bg-red-500'}
                  `} />
                  <span className="text-sm text-gray-600">
                    {item.enabled ? t('enabled') : t('disabled')}
                  </span>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-gray-700 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <span className="text-blue-500 text-xl">ℹ️</span>
          </div>
          <div className="ml-3">
            <h4 className="text-sm font-medium text-blue-800">
              {t('accessibilityNote')}
            </h4>
            <p className="text-sm text-blue-700 mt-1">
              {t('accessibilityNoteDesc')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityFeaturesComponent;
