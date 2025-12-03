import type { Metadata } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import { notFound } from 'next/navigation';
import React from 'react';
import { PostHogProvider } from '@/components/analytics/PostHogProvider';
import { Providers } from '@/components/providers';
import { PWAInit } from '@/components/PWAInit';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';
import ScrollToTop from '@/components/ScrollToTop';
import StructuredData from '@/components/StructuredData';
import { WebVitalsReporter } from '@/components/WebVitalsReporter';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import { routing } from '@/libs/I18nRouting';
import { getOrganizationSchema, getWebSiteSchema } from '@/libs/utils/structured-data';
import '@/styles/global.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://bizops.id'),
  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon-16x16.png',
    },
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
  ],
};

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = (await import(`../../locales/${locale}.json`)).default;

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const shouldBeDark = theme === 'dark' || (!theme && systemPrefersDark);
                  if (shouldBeDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        {/* Structured Data for SEO */}
        <StructuredData data={[getOrganizationSchema(), getWebSiteSchema()]} />
      </head>
      <body className={`${inter.variable} ${plusJakartaSans.variable} bg-background text-foreground font-sans antialiased transition-colors`} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <PWAInit />
            <ScrollToTop />
            <PWAInstallPrompt />
            <WebVitalsReporter />
            <WhatsAppFloat />
            <PostHogProvider>
              {props.children}
            </PostHogProvider>
          </Providers>

          {/* <DemoBadge /> */}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
