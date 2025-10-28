module.exports = {
  i18n: {
    defaultLocale: 'hi',
    locales: ['en', 'hi', 'ta', 'te', 'mr', 'kn', 'bn'],
    localeDetection: true,
  },
  fallbackLng: {
    default: ['hi'],
  },
  debug: process.env.NODE_ENV === 'development',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
};
