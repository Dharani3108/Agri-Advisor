import { NextApiRequest, NextApiResponse } from 'next';
import { WeatherAlert, ApiResponse } from '../../../types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<WeatherAlert[]>>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  }

  try {
    const { location } = req.query;

    if (!location) {
      return res.status(400).json({
        success: false,
        error: 'Missing required parameter: location',
      });
    }

    // TODO: Implement weather API integration
    // - Call weather service API
    // - Process weather data
    // - Generate agricultural alerts

    // Mock weather alerts
    const mockWeatherAlerts: WeatherAlert[] = [
      {
        location: {
          village: 'Sample Village',
          state: 'Sample State',
          district: 'Sample District',
          coordinates: {
            latitude: 20.5937,
            longitude: 78.9629,
          },
        },
        alertType: 'rain',
        severity: 'medium',
        message: 'Heavy rainfall expected in next 24 hours. Avoid irrigation and protect crops.',
        validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        location: {
          village: 'Sample Village',
          state: 'Sample State',
          district: 'Sample District',
          coordinates: {
            latitude: 20.5937,
            longitude: 78.9629,
          },
        },
        alertType: 'temperature',
        severity: 'high',
        message: 'High temperature warning. Ensure adequate irrigation and shade for crops.',
        validUntil: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
      },
    ];

    res.status(200).json({
      success: true,
      data: mockWeatherAlerts,
      message: 'Weather alerts retrieved successfully',
    });
  } catch (error) {
    console.error('Weather alerts error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
}
