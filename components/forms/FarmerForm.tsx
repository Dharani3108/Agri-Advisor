import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { FarmerFormProps, FarmerInputRequest } from '../../types';

const FarmerForm: React.FC<FarmerFormProps> = ({
  onSubmit,
  initialData,
  isLoading = false,
}) => {
  const { t } = useTranslation('common');
  const [currentStep, setCurrentStep] = useState(0);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useForm<FarmerInputRequest>({
    defaultValues: initialData || {
      userId: 'demo-user',
      location: {
        village: '',
        state: '',
        district: '',
        coordinates: { latitude: 0, longitude: 0 }
      },
      landArea: { value: 0, unit: '' },
      soilType: {
        texture: '',
        photoUrl: '',
        labTested: false,
        NPK: { N: 0, P: 0, K: 0 },
        pH: 0,
        organicContent: ''
      },
      waterAvailability: {
        type: '',
        depth: 0,
        frequency: '',
        irrigationAvailable: false
      },
      budgetINR: 0,
      timelineDays: 0,
      laborCount: 0,
      riskPreference: '',
      pastCropHistory: []
    },
  });

  const steps = [
    'location',
    'landArea',
    'soilType',
    'waterAvailability',
    'budget',
    'timeline',
    'labor',
    'riskPreference',
  ];

  const handleNext = useCallback(async () => {
    const isValid = await trigger();
    if (isValid && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep, steps.length, trigger]);

  const handlePrevious = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const onFormSubmit = useCallback((data: FarmerInputRequest) => {
    onSubmit(data);
  }, [onSubmit]);

  const renderStep = React.useCallback(() => {
    switch (steps[currentStep]) {
      case 'location':
        return (
          <div key="location-step" className="space-y-6">
            <h3 className="text-xl font-semibold text-primary-800 mb-4">
              {t('locationDetails')}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('villageOrTown')} *
                </label>
                <input
                  {...register('location.village', { required: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder={t('enterVillage')}
                />
                {errors.location?.village && (
                  <p className="text-red-500 text-sm mt-1">{t('required')}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('state')} *
                </label>
                <input
                  {...register('location.state', { required: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder={t('enterState')}
                />
                {errors.location?.state && (
                  <p className="text-red-500 text-sm mt-1">{t('required')}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('district')} *
                </label>
                <input
                  {...register('location.district', { required: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder={t('enterDistrict')}
                />
                {errors.location?.district && (
                  <p className="text-red-500 text-sm mt-1">{t('required')}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 'landArea':
        return (
          <div key="landArea-step" className="space-y-6">
            <h3 className="text-xl font-semibold text-primary-800 mb-4">
              {t('landArea')}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('areaValue')} *
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register('landArea.value', { required: true, min: 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="0.00"
                />
                {errors.landArea?.value && (
                  <p className="text-red-500 text-sm mt-1">{t('required')}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('unit')} *
                </label>
                <select
                  {...register('landArea.unit', { required: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">{t('selectUnit')}</option>
                  <option value="hectare">{t('hectare')}</option>
                  <option value="acre">{t('acre')}</option>
                  <option value="bigha">{t('bigha')}</option>
                  <option value="other">{t('other')}</option>
                </select>
                {errors.landArea?.unit && (
                  <p className="text-red-500 text-sm mt-1">{t('required')}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 'soilType':
        return (
          <div key="soilType-step" className="space-y-6">
            <h3 className="text-xl font-semibold text-primary-800 mb-4">
              {t('soilType')}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('soilTexture')} *
                </label>
                <select
                  {...register('soilType.texture', { required: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">{t('selectSoilTexture')}</option>
                  <option value="clay">{t('clay')}</option>
                  <option value="sandy">{t('sandy')}</option>
                  <option value="loamy">{t('loamy')}</option>
                  <option value="clay_loam">{t('clayLoam')}</option>
                  <option value="sandy_loam">{t('sandyLoam')}</option>
                  <option value="unknown">{t('unknown')}</option>
                </select>
                {errors.soilType?.texture && (
                  <p className="text-red-500 text-sm mt-1">{t('required')}</p>
                )}
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    {...register('soilType.labTested')}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    {t('labTested')}
                  </span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('soilPhoto')}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setValue('soilType.photoUrl', file.name);
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {t('soilPhotoHelp')}
                </p>
              </div>
            </div>
          </div>
        );

      case 'waterAvailability':
        return (
          <div key="waterAvailability-step" className="space-y-6">
            <h3 className="text-xl font-semibold text-primary-800 mb-4">
              {t('waterAvailability')}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('waterSource')} *
                </label>
                <select
                  {...register('waterAvailability.type', { required: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">{t('selectWaterSource')}</option>
                  <option value="well">{t('well')}</option>
                  <option value="dug_well">{t('dugWell')}</option>
                  <option value="river">{t('river')}</option>
                  <option value="tank">{t('tank')}</option>
                  <option value="canal">{t('canal')}</option>
                  <option value="rainfed">{t('rainfed')}</option>
                  <option value="other">{t('other')}</option>
                </select>
                {errors.waterAvailability?.type && (
                  <p className="text-red-500 text-sm mt-1">{t('required')}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('waterDepth')} (meters)
                </label>
                <input
                  type="number"
                  step="0.1"
                  {...register('waterAvailability.depth')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="0.0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('irrigationFrequency')} *
                </label>
                <select
                  {...register('waterAvailability.frequency', { required: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">{t('selectFrequency')}</option>
                  <option value="daily">{t('daily')}</option>
                  <option value="weekly">{t('weekly')}</option>
                  <option value="seasonal">{t('seasonal')}</option>
                </select>
                {errors.waterAvailability?.frequency && (
                  <p className="text-red-500 text-sm mt-1">{t('required')}</p>
                )}
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    {...register('waterAvailability.irrigationAvailable')}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    {t('irrigationAvailable')}
                  </span>
                </label>
              </div>
            </div>
          </div>
        );

      case 'budget':
        return (
          <div key="budget-step" className="space-y-6">
            <h3 className="text-xl font-semibold text-primary-800 mb-4">
              {t('budget')}
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('totalBudget')} (INR) *
              </label>
              <input
                type="number"
                step="100"
                {...register('budgetINR', { required: true, min: 0 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="0"
              />
              {errors.budgetINR && (
                <p className="text-red-500 text-sm mt-1">{t('required')}</p>
              )}
              <p className="text-sm text-gray-500 mt-1">
                {t('budgetHelp')}
              </p>
            </div>
          </div>
        );

      case 'timeline':
        return (
          <div key="timeline-step" className="space-y-6">
            <h3 className="text-xl font-semibold text-primary-800 mb-4">
              {t('timeline')}
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('daysToHarvest')} *
              </label>
              <input
                type="number"
                {...register('timelineDays', { required: true, min: 30, max: 365 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="90"
              />
              {errors.timelineDays && (
                <p className="text-red-500 text-sm mt-1">{t('required')}</p>
              )}
              <p className="text-sm text-gray-500 mt-1">
                {t('timelineHelp')}
              </p>
            </div>
          </div>
        );

      case 'labor':
        return (
          <div key="labor-step" className="space-y-6">
            <h3 className="text-xl font-semibold text-primary-800 mb-4">
              {t('labor')}
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('numberOfPeople')} *
              </label>
              <input
                type="number"
                min="1"
                {...register('laborCount', { required: true, min: 1 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="1"
              />
              {errors.laborCount && (
                <p className="text-red-500 text-sm mt-1">{t('required')}</p>
              )}
              <p className="text-sm text-gray-500 mt-1">
                {t('laborHelp')}
              </p>
            </div>
          </div>
        );

      case 'riskPreference':
        return (
          <div key="riskPreference-step" className="space-y-6">
            <h3 className="text-xl font-semibold text-primary-800 mb-4">
              {t('riskPreference')}
            </h3>
            
            <div className="space-y-4">
              {['high_yield', 'stable_income', 'low_risk'].map((risk) => (
                <label key={risk} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    value={risk}
                    {...register('riskPreference', { required: true })}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                  />
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">
                      {t(risk)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {t(`${risk}_description`)}
                    </div>
                  </div>
                </label>
              ))}
              {errors.riskPreference && (
                <p className="text-red-500 text-sm">{t('required')}</p>
              )}
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-8">
            <h3 className="text-xl font-semibold text-primary-800 mb-4">
              {t('step')} {currentStep + 1}
            </h3>
            <p className="text-gray-600">{t('comingSoon')}</p>
          </div>
        );
    }
  }, [currentStep, steps, t, register, errors, watch, setValue]);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      {/* Progress Bar */}
      <div className="bg-gray-200 h-2 rounded-t-lg">
        <div
          className="bg-primary-500 h-2 rounded-t-lg transition-all duration-300"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        />
      </div>
      
      <div className="p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-primary-800 mb-2">
            {t('farmerInformation')}
          </h2>
          <p className="text-gray-600">
            {t('step')} {currentStep + 1} {t('of')} {steps.length}
          </p>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)}>
          {renderStep()}

          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t('previous')}
            </button>
            
            {currentStep === steps.length - 1 ? (
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? t('submitting') : t('submit')}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
              >
                {t('next')}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default FarmerForm;
