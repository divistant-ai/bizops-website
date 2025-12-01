/**
 * Environment variable validation and access utilities
 * Provides type-safe access to environment variables with validation
 * Adapted for Next.js (NEXT_PUBLIC_* prefix)
 */

type EnvConfig = {
  // Monitoring
  sentryDsn?: string;
  logrocketAppId?: string;
  datadogApplicationId?: string;
  datadogClientToken?: string;

  // Analytics
  ga4MeasurementId?: string;
  gtmContainerId?: string;
  mixpanelToken?: string;
  amplitudeApiKey?: string;
  segmentWriteKey?: string;
  heapAppId?: string;
  hotjarId?: string;
  clarityProjectId?: string;

  // Marketing
  metaPixelId?: string;
  linkedInPartnerId?: string;
  twitterPixelId?: string;
  tiktokPixelId?: string;

  // Chat & Support
  intercomAppId?: string;
  crispWebsiteId?: string;
  tawkPropertyId?: string;
  tawkWidgetId?: string;
  driftAppId?: string;
  zendeskKey?: string;

  // SEO
  siteUrl?: string;
  googleSiteVerification?: string;
  bingSiteVerification?: string;

  // AI
  geminiApiKey?: string;
  openaiApiKey?: string;

  // Environment
  environment: 'development' | 'production' | 'test';
  isDevelopment: boolean;
  isProduction: boolean;
  isTest: boolean;
};

const getEnvVar = (key: string): string | undefined => {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key];
  }
  return undefined;
};

const getEnvironment = (): 'development' | 'production' | 'test' => {
  const nodeEnv = process.env?.NODE_ENV;
  if (nodeEnv === 'development' || nodeEnv === 'production' || nodeEnv === 'test') {
    return nodeEnv;
  }
  return 'production';
};

let cachedConfig: EnvConfig | null = null;

/**
 * Get validated environment configuration
 * Caches the result for performance
 */
export const getEnvConfig = (): EnvConfig => {
  if (cachedConfig) {
    return cachedConfig;
  }

  const environment = getEnvironment();

  cachedConfig = {
    // Monitoring
    sentryDsn: getEnvVar('NEXT_PUBLIC_SENTRY_DSN'),
    logrocketAppId: getEnvVar('NEXT_PUBLIC_LOGROCKET_APP_ID'),
    datadogApplicationId: getEnvVar('NEXT_PUBLIC_DATADOG_APPLICATION_ID'),
    datadogClientToken: getEnvVar('NEXT_PUBLIC_DATADOG_CLIENT_TOKEN'),

    // Analytics
    ga4MeasurementId: getEnvVar('NEXT_PUBLIC_GA4_MEASUREMENT_ID'),
    gtmContainerId: getEnvVar('NEXT_PUBLIC_GTM_CONTAINER_ID'),
    mixpanelToken: getEnvVar('NEXT_PUBLIC_MIXPANEL_TOKEN'),
    amplitudeApiKey: getEnvVar('NEXT_PUBLIC_AMPLITUDE_API_KEY'),
    segmentWriteKey: getEnvVar('NEXT_PUBLIC_SEGMENT_WRITE_KEY'),
    heapAppId: getEnvVar('NEXT_PUBLIC_HEAP_APP_ID'),
    hotjarId: getEnvVar('NEXT_PUBLIC_HOTJAR_ID'),
    clarityProjectId: getEnvVar('NEXT_PUBLIC_CLARITY_PROJECT_ID'),

    // Marketing
    metaPixelId: getEnvVar('NEXT_PUBLIC_META_PIXEL_ID'),
    linkedInPartnerId: getEnvVar('NEXT_PUBLIC_LINKEDIN_PARTNER_ID'),
    twitterPixelId: getEnvVar('NEXT_PUBLIC_TWITTER_PIXEL_ID'),
    tiktokPixelId: getEnvVar('NEXT_PUBLIC_TIKTOK_PIXEL_ID'),

    // Chat & Support
    intercomAppId: getEnvVar('NEXT_PUBLIC_INTERCOM_APP_ID'),
    crispWebsiteId: getEnvVar('NEXT_PUBLIC_CRISP_WEBSITE_ID'),
    tawkPropertyId: getEnvVar('NEXT_PUBLIC_TAWK_PROPERTY_ID'),
    tawkWidgetId: getEnvVar('NEXT_PUBLIC_TAWK_WIDGET_ID'),
    driftAppId: getEnvVar('NEXT_PUBLIC_DRIFT_APP_ID'),
    zendeskKey: getEnvVar('NEXT_PUBLIC_ZENDESK_KEY'),

    // SEO
    siteUrl: getEnvVar('NEXT_PUBLIC_SITE_URL') || 'https://bizops.id',
    googleSiteVerification: getEnvVar('NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION'),
    bingSiteVerification: getEnvVar('NEXT_PUBLIC_BING_SITE_VERIFICATION'),

    // AI
    geminiApiKey: getEnvVar('GEMINI_API_KEY') || getEnvVar('NEXT_PUBLIC_GEMINI_API_KEY'),
    openaiApiKey: getEnvVar('NEXT_PUBLIC_OPENAI_API_KEY'),

    // Environment
    environment,
    isDevelopment: environment === 'development',
    isProduction: environment === 'production',
    isTest: environment === 'test',
  };

  return cachedConfig;
};

/**
 * Validate required environment variables
 * Throws error if required vars are missing in production
 */
export const validateEnv = (required: Array<keyof EnvConfig> = []): void => {
  const config = getEnvConfig();
  const missing: Array<string> = [];

  if (required.includes('sentryDsn') && !config.sentryDsn && config.isProduction) {
    missing.push('NEXT_PUBLIC_SENTRY_DSN');
  }

  if (required.includes('geminiApiKey') && !config.geminiApiKey) {
    missing.push('GEMINI_API_KEY or NEXT_PUBLIC_GEMINI_API_KEY');
  }

  if (missing.length > 0) {
    const errorMessage = `Missing required environment variables: ${missing.join(', ')}`;

    if (config.isProduction) {
      throw new Error(errorMessage);
    } else {
      console.warn(`[Env Validation] ${errorMessage}`);
    }
  }
};

/**
 * Get environment variable with fallback
 */
export const env = (key: string, fallback?: string): string => {
  return getEnvVar(key) || fallback || '';
};

/**
 * Check if running in development
 */
export const isDev = (): boolean => {
  return getEnvConfig().isDevelopment;
};

/**
 * Check if running in production
 */
export const isProd = (): boolean => {
  return getEnvConfig().isProduction;
};
