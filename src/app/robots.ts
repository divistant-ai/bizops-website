import type { MetadataRoute } from 'next';
import { getBaseUrl } from '@/libs/utils/helpers';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard',
          '/api/',
          '/admin/',
          '/_next/',
          '/login',
          '/demo', // Demo page might be behind auth in future
          '/thank-you',
          '/search', // Search results are dynamic
          '/slide', // Presentation slide (internal use)
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/dashboard',
          '/api/',
          '/admin/',
          '/_next/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
