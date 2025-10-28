import React from 'react';
import { useTranslation } from 'next-i18next';
import { WeatherAlert, MarketPriceAlert } from '../../types';

interface AlertComponentProps {
  alerts: (WeatherAlert | MarketPriceAlert)[];
  onDismiss: (alertId: string) => void;
}

const AlertComponent: React.FC<AlertComponentProps> = ({
  alerts,
  onDismiss,
}) => {
  const { t } = useTranslation('common');

  const getAlertIcon = (alert: WeatherAlert | MarketPriceAlert) => {
    if ('alertType' in alert) {
      // Weather Alert
      switch (alert.alertType) {
        case 'rain':
          return '🌧️';
        case 'drought':
          return '☀️';
        case 'storm':
          return '⛈️';
        case 'temperature':
          return '🌡️';
        default:
          return '⚠️';
      }
    } else {
      // Market Price Alert
      return '💰';
    }
  };

  const getAlertSeverityColor = (alert: WeatherAlert | MarketPriceAlert) => {
    if ('severity' in alert) {
      switch (alert.severity) {
        case 'high':
          return 'bg-red-100 border-red-500 text-red-800';
        case 'medium':
          return 'bg-yellow-100 border-yellow-500 text-yellow-800';
        case 'low':
          return 'bg-green-100 border-green-500 text-green-800';
        default:
          return 'bg-gray-100 border-gray-500 text-gray-800';
      }
    } else {
      // Market price change color
      const changePercent = alert.changePercent;
      if (changePercent > 0) {
        return 'bg-green-100 border-green-500 text-green-800';
      } else if (changePercent < 0) {
        return 'bg-red-100 border-red-500 text-red-800';
      } else {
        return 'bg-gray-100 border-gray-500 text-gray-800';
      }
    }
  };

  const formatAlertTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const getAlertTitle = (alert: WeatherAlert | MarketPriceAlert) => {
    if ('alertType' in alert) {
      return t(`weatherAlert_${alert.alertType}`);
    } else {
      return t('marketPriceAlert');
    }
  };

  if (alerts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-primary-800 mb-4">
          {t('alerts')}
        </h3>
        <div className="text-center text-gray-500 py-8">
          <div className="text-4xl mb-2">✅</div>
          <p>{t('noAlerts')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold text-primary-800 mb-4">
        {t('alerts')} ({alerts.length})
      </h3>
      
      <div className="space-y-4">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className={`
              border-l-4 p-4 rounded-r-lg
              ${getAlertSeverityColor(alert)}
            `}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">{getAlertIcon(alert)}</span>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold">
                      {getAlertTitle(alert)}
                    </h4>
                    {'severity' in alert && (
                      <span className="text-xs px-2 py-1 rounded-full bg-white bg-opacity-50">
                        {t(alert.severity)}
                      </span>
                    )}
                  </div>
                  
                  <div className="mt-2">
                    {'alertType' in alert ? (
                      // Weather Alert
                      <div>
                        <p className="text-sm">{alert.message}</p>
                        <div className="mt-2 text-xs opacity-75">
                          <p><strong>{t('location')}:</strong> {alert.location.village}, {alert.location.district}</p>
                          <p><strong>{t('validUntil')}:</strong> {formatAlertTime(alert.validUntil)}</p>
                        </div>
                      </div>
                    ) : (
                      // Market Price Alert
                      <div>
                        <div className="flex items-center space-x-4">
                          <div>
                            <p className="font-medium">{alert.cropName}</p>
                            <p className="text-sm">{t('market')}: {alert.market}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">₹{alert.currentPrice}</p>
                            <p className={`text-sm ${alert.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {alert.changePercent >= 0 ? '+' : ''}{alert.changePercent.toFixed(1)}%
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 text-xs opacity-75">
                          <p><strong>{t('previousPrice')}:</strong> ₹{alert.previousPrice}</p>
                          <p><strong>{t('lastUpdated')}:</strong> {formatAlertTime(alert.lastUpdated)}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => onDismiss(index.toString())}
                className="text-gray-400 hover:text-gray-600 ml-2"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <button className="text-sm text-primary-600 hover:text-primary-800">
          {t('viewAllAlerts')}
        </button>
      </div>
    </div>
  );
};

export default AlertComponent;
