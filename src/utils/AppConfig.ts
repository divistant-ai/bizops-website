import type { LocalePrefixMode } from 'next-intl/routing';

const localePrefix: LocalePrefixMode = 'as-needed';

export const AppConfig = {
  name: 'BizOps ERP',
  locales: ['id', 'en'], // Indonesian and English only
  defaultLocale: 'id', // Set Indonesian as default
  localePrefix,
};
