import React from 'react';
import { useTranslation } from 'next-i18next';
import { AdvisoryResultsProps, AdvisoryOutput } from '../../types';

const AdvisoryResults: React.FC<AdvisoryResultsProps> = ({
  advisory,
  onDownload,
  onPrint,
}) => {
  const { t } = useTranslation('common');

  const renderCropRecommendations = () => (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h3 className="text-xl font-bold text-primary-800 mb-4">
        {t('recommendedCrops')}
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {advisory.recommendedCrops.map((crop, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-lg font-semibold text-primary-700">
                {crop.name}
              </h4>
              <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-sm font-medium">
                {Math.round(crop.suitabilityScore * 100)}%
              </span>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">{t('inputCost')}:</span>
                <span className="font-medium">₹{crop.inputCost.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">{t('timeToHarvest')}:</span>
                <span className="font-medium">{crop.timeToHarvest} {t('days')}</span>
              </div>
              
              {crop.expectedYield && (
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('expectedYield')}:</span>
                  <span className="font-medium">{crop.expectedYield} kg/hectare</span>
                </div>
              )}
            </div>
            
            {crop.prosCons && (
              <div className="mt-3 p-3 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-700">{crop.prosCons}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderCropCalendar = () => (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h3 className="text-xl font-bold text-primary-800 mb-4">
        {t('cropCalendar')}
      </h3>
      
      <div className="space-y-4">
        {advisory.cropCalendar.map((item, index) => (
          <div key={index} className="border-l-4 border-primary-500 pl-4 py-2">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-gray-900">{item.operation}</h4>
                <p className="text-sm text-gray-600 mt-1">{item.details}</p>
              </div>
              <span className="text-sm font-medium text-primary-600 bg-primary-100 px-2 py-1 rounded">
                {item.period}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderFertilizerPlan = () => (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h3 className="text-xl font-bold text-primary-800 mb-4">
        {t('fertilizerPlan')}
      </h3>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('stage')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('inputs')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('frequency')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('quantity')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {advisory.fertilizerPlan.map((plan, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {plan.stage}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {plan.inputs}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {plan.frequency}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {plan.quantity} kg
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderPestSchedule = () => (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h3 className="text-xl font-bold text-primary-800 mb-4">
        {t('pestDiseaseWarnings')}
      </h3>
      
      <div className="space-y-4">
        {advisory.pestSchedule.map((pest, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-gray-900">{pest.crop}</h4>
              <span className={`
                px-2 py-1 rounded-full text-sm font-medium
                ${pest.riskLevel === 'High' ? 'bg-red-100 text-red-800' :
                  pest.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'}
              `}>
                {pest.riskLevel}
              </span>
            </div>
            
            <div className="space-y-2">
              <div>
                <span className="text-sm font-medium text-gray-600">{t('symptoms')}:</span>
                <p className="text-sm text-gray-700 mt-1">{pest.symptoms}</p>
              </div>
              
              <div>
                <span className="text-sm font-medium text-gray-600">{t('recommendedAction')}:</span>
                <p className="text-sm text-gray-700 mt-1">{pest.recommendedAction}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-3xl font-bold text-primary-800">
          {t('advisoryResults')}
        </h2>
        
        <div className="flex space-x-3">
          {onPrint && (
            <button
              onClick={onPrint}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              {t('print')}
            </button>
          )}
          {onDownload && (
            <button
              onClick={onDownload}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              {t('download')}
            </button>
          )}
        </div>
      </div>

      {renderCropRecommendations()}
      {renderCropCalendar()}
      {renderFertilizerPlan()}
      {renderPestSchedule()}
    </div>
  );
};

export default AdvisoryResults;
