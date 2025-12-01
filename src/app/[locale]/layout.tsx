import type { Metadata } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import React from 'react';
import { PostHogProvider } from '@/components/analytics/PostHogProvider';
import ErrorBoundary from '@/components/ErrorBoundary';
import { PWAInit } from '@/components/PWAInit';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';
import ScrollToTop from '@/components/ScrollToTop';
import { routing } from '@/libs/I18nRouting';
import '@/styles/global.css';

export const metadata: Metadata = {
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
    <html lang={locale} className="">
      <head>
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  localStorage.removeItem('theme');
                  document.documentElement.classList.remove('dark');
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-white text-slate-900" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <PWAInit />
          <ScrollToTop />
          <PWAInstallPrompt />
          <ErrorBoundary>
            <PostHogProvider>
              {props.children}
            </PostHogProvider>
          </ErrorBoundary>

          {/* <DemoBadge /> */}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
