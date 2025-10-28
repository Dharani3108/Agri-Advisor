import React from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import LanguageSelector from '../components/ui/LanguageSelector';
import FarmerForm from '../components/forms/FarmerForm';
import AdvisoryResults from '../components/ui/AdvisoryResults';
import AccessibilityFeaturesComponent from '../components/ui/AccessibilityFeatures';
import AlertComponent from '../components/ui/AlertComponent';
import ErrorBoundary from '../components/ui/ErrorBoundary';
import { FarmerInputRequest, AdvisoryOutput, AccessibilityFeatures, WeatherAlert, MarketPriceAlert } from '../types';

interface HomePageProps {
  locale: string;
}

const HomePage: React.FC<HomePageProps> = ({ locale }) => {
  const [currentLanguage, setCurrentLanguage] = React.useState(locale);
  const [farmerInputs, setFarmerInputs] = React.useState<FarmerInputRequest | null>(null);
  const [advisoryResults, setAdvisoryResults] = React.useState<AdvisoryOutput | null>(null);
  const [currentView, setCurrentView] = React.useState<'language' | 'form' | 'results' | 'accessibility' | 'alerts'>('language');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLanguageChange = React.useCallback((language: string) => {
    setCurrentLanguage(language);
    setCurrentView('form');
  }, []);

  const handleFarmerInputSubmit = React.useCallback(async (inputs: FarmerInputRequest) => {
    setFarmerInputs(inputs);
    setIsLoading(true);
    
    try {
      // Call the advisory API
      const response = await fetch('/api/advisory/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: inputs.userId || 'demo-user',
          farmerInputs: inputs,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setAdvisoryResults(result.data);
        setCurrentView('results');
      } else {
        console.error('Failed to generate advisory');
      }
    } catch (error) {
      console.error('Error generating advisory:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDownload = React.useCallback(() => {
    // TODO: Implement PDF download functionality
    console.log('Download advisory results');
  }, []);

  const handlePrint = React.useCallback(() => {
    window.print();
  }, []);

  const handleDismissAlert = React.useCallback((alertId: string) => {
    // TODO: Implement alert dismissal
    console.log('Dismiss alert:', alertId);
  }, []);

  const accessibilityFeatures: AccessibilityFeatures = {
    keyboard_navigation: true,
    large_click_targets: true,
    visual_and_audio_guides: true,
  };

  // Mock alerts for demonstration
  const mockAlerts: (WeatherAlert | MarketPriceAlert)[] = React.useMemo(() => [
    {
      location: {
        village: 'Sample Village',
        state: 'Sample State',
        district: 'Sample District',
        coordinates: { latitude: 20.5937, longitude: 78.9629 }
      },
      alertType: 'rain',
      severity: 'medium',
      message: 'Heavy rainfall expected in next 24 hours. Avoid irrigation and protect crops.',
      validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      cropName: 'Rice',
      currentPrice: 2500,
      previousPrice: 2300,
      changePercent: 8.7,
      market: 'Local Mandi',
      lastUpdated: new Date().toISOString(),
    }
  ], []);

  const renderCurrentView = React.useCallback(() => {
    switch (currentView) {
      case 'language':
        return (
          <ErrorBoundary>
            <LanguageSelector
              onLanguageChange={handleLanguageChange}
              currentLanguage={currentLanguage}
            />
          </ErrorBoundary>
        );
      
      case 'form':
        return (
          <ErrorBoundary>
            <FarmerForm
              onSubmit={handleFarmerInputSubmit}
              initialData={farmerInputs || undefined}
              isLoading={isLoading}
            />
          </ErrorBoundary>
        );
      
      case 'results':
        return advisoryResults ? (
          <ErrorBoundary>
            <AdvisoryResults
              advisory={advisoryResults}
              onDownload={handleDownload}
              onPrint={handlePrint}
            />
          </ErrorBoundary>
        ) : null;
      
      case 'accessibility':
        return (
          <ErrorBoundary>
            <AccessibilityFeaturesComponent features={accessibilityFeatures} />
          </ErrorBoundary>
        );
      
      case 'alerts':
        return (
          <ErrorBoundary>
            <AlertComponent
              alerts={mockAlerts}
              onDismiss={handleDismissAlert}
            />
          </ErrorBoundary>
        );
      
      default:
        return null;
    }
  }, [currentView, currentLanguage, farmerInputs, isLoading, advisoryResults, accessibilityFeatures, mockAlerts, handleLanguageChange, handleFarmerInputSubmit, handleDownload, handlePrint, handleDismissAlert]);

  return (
    <>
      <Head>
        <title>Agri Advisor Web Platform</title>
        <meta name="description" content="A responsive, multilingual agricultural website for small Indian farmers" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ErrorBoundary>
        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold text-primary-800">
                    🌾 Agri Advisor
                  </h1>
                </div>
                
                <nav className="flex space-x-4">
                  <button
                    onClick={() => setCurrentView('language')}
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600"
                  >
                    Language
                  </button>
                  <button
                    onClick={() => setCurrentView('form')}
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600"
                  >
                    Form
                  </button>
                  <button
                    onClick={() => setCurrentView('alerts')}
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600"
                  >
                    Alerts
                  </button>
                  <button
                    onClick={() => setCurrentView('accessibility')}
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600"
                  >
                    Accessibility
                  </button>
                </nav>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {renderCurrentView()}
          </main>

          {/* Footer */}
          <footer className="bg-white border-t mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center text-gray-600">
                <p>&copy; 2024 Agri Advisor. Built for Indian farmers.</p>
              </div>
            </div>
          </footer>
        </div>
      </ErrorBoundary>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'hi', ['common'])),
      locale: locale ?? 'hi',
    },
  };
};

export default HomePage;
