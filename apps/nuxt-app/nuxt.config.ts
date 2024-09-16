import type { Channel } from '@geins/core';

export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: '2024-08-19',
  runtimeConfig: {
    public: {
      geins: {
        debug: true,
        credentials: {
          apiKey:
            process.env.GEINS_API_KEY || 'CF2FF80B-6F85-4CD9-ACE5-F41962891E07',
          accountName: process.env.GEINS_ACCOUNT_NAME || 'demogeins',
          environment: 'prod',
          channel: process.env.GEINS_CHANNEL || '1',
          tld: process.env.GEINS_TLD || 'se',
          locale: process.env.GEINS_LOCALE || 'sv-SE',
          market: process.env.GEINS_MARKET || 'se',
        },
      },
      channel: {
        siteId: process.env.GEINS_SITE_ID || '1',
        siteTopDomain: process.env.GEINS_TOP_DOMAIN || 'se',
      },
      defaultLanguage: process.env.GEINS_LANGUAGE_ID || 'sv-SE',
      defaultMarket: process.env.GEINS_MARKET_ID || 'se',
      currentChannel: {} as Channel, // Placeholder
    },
    apiCredentials: {}, // Add this line
  },
});
