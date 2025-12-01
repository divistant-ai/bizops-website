import type { LocalizationResource } from '@clerk/types';
import type { LocalePrefixMode } from 'next-intl/routing';
import { enUS, frFR } from '@clerk/localizations';

const localePrefix: LocalePrefixMode = 'as-needed';

// FIXME: Update this configuration file based on your project information
export const AppConfig = {
  name: 'BizOps ERP',
  locales: ['id', 'en', 'fr'], // Added 'id' for Indonesian
  defaultLocale: 'id', // Set Indonesian as default
  localePrefix,
};

const supportedLocales: Record<string, LocalizationResource> = {
  en: enUS,
  fr: frFR,
};

export const ClerkLocalizations = {
  defaultLocale: enUS,
  supportedLocales,
};
