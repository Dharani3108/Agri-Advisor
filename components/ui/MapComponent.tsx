import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { Location } from '../../types';

interface MapComponentProps {
  location: Location;
  onLocationChange: (location: Location) => void;
  readonly?: boolean;
}

const MapComponent: React.FC<MapComponentProps> = ({
  location,
  onLocationChange,
  readonly = false,
}) => {
  const { t } = useTranslation('common');
  const [mapLoaded, setMapLoaded] = useState(false);
  const [userLocation, setUserLocation] = useState<Location | null>(null);

  useEffect(() => {
    // Load Leaflet dynamically to avoid SSR issues
    const loadMap = async () => {
      if (typeof window !== 'undefined') {
        const L = await import('leaflet');
        await import('leaflet/dist/leaflet.css');
        
        // Initialize map
        const map = L.map('map').setView([20.5937, 78.9629], 6); // Center on India
        
        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Add marker
        const marker = L.marker([location.coordinates.latitude, location.coordinates.longitude]).addTo(map);
        
        if (!readonly) {
          // Add click handler for new location
          map.on('click', (e) => {
            const { lat, lng } = e.latlng;
            marker.setLatLng([lat, lng]);
            
            onLocationChange({
              ...location,
              coordinates: { latitude: lat, longitude: lng }
            });
          });
        }

        setMapLoaded(true);
      }
    };

    loadMap();
  }, [location, onLocationChange, readonly]);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation: Location = {
            ...location,
            coordinates: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          };
          setUserLocation(newLocation);
          onLocationChange(newLocation);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-primary-800">
        {t('selectLocation')}
      </h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('villageOrTown')} *
            </label>
            <input
              type="text"
              value={location.village}
              onChange={(e) => onLocationChange({ ...location, village: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder={t('enterVillage')}
              disabled={readonly}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('state')} *
            </label>
            <input
              type="text"
              value={location.state}
              onChange={(e) => onLocationChange({ ...location, state: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder={t('enterState')}
              disabled={readonly}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('district')} *
            </label>
            <input
              type="text"
              value={location.district}
              onChange={(e) => onLocationChange({ ...location, district: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder={t('enterDistrict')}
              disabled={readonly}
            />
          </div>
        </div>

        {!readonly && (
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={getCurrentLocation}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              📍 {t('useCurrentLocation')}
            </button>
            
            <div className="text-sm text-gray-600">
              {t('clickOnMap')}
            </div>
          </div>
        )}

        <div className="relative">
          <div
            id="map"
            className="w-full h-64 border border-gray-300 rounded-md"
            style={{ minHeight: '256px' }}
          />
          {!mapLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-md">
              <div className="text-gray-500">{t('loadingMap')}...</div>
            </div>
          )}
        </div>

        <div className="text-sm text-gray-600">
          <p><strong>{t('coordinates')}:</strong> {location.coordinates.latitude.toFixed(6)}, {location.coordinates.longitude.toFixed(6)}</p>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
