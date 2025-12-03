/**
 * Lazy-loaded components for code splitting
 * Reduces initial bundle size and improves performance
 */

'use client';

import dynamic from 'next/dynamic';

// Heavy UI components (loaded on demand)
export const CardSlider = dynamic(() => import('./CardSlider'), {
  loading: () => <div className="h-64 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />,
  ssr: true,
});

export const InfiniteScrollLoop = dynamic(() => import('./InfiniteScrollLoop'), {
  loading: () => <div className="h-32 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />,
  ssr: true,
});

export const BarChart = dynamic(() => import('@/components/BarChart').then(mod => ({ default: mod.BarChart })), {
  loading: () => <div className="h-64 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />,
  ssr: true,
});

export const SpotlightCard = dynamic(() => import('./SpotlightCard'), {
  loading: () => <div className="h-48 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />,
  ssr: true,
});

// Modal components moved to ClientLazyComponents.tsx to avoid SSR issues

// Heavy page content components (for route-based code splitting)
export const SlideContent = dynamic(() => import('@/app/[locale]/(marketing)/slide/SlideContent'), {
  loading: () => <div className="flex min-h-screen items-center justify-center"><div className="border-primary-500 h-12 w-12 animate-spin rounded-full border-4 border-t-transparent" /></div>,
  ssr: true,
});

export const PricingCalculator = dynamic(() => import('@/components/PricingCalculator'), {
  loading: () => <div className="h-96 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />,
  ssr: true,
});

// Tools components (heavy calculators)
export const ROICalculator = dynamic(() => import('@/components/tools/ROICalculator'), {
  loading: () => <div className="h-96 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />,
  ssr: true,
});

export const MaturityAssessment = dynamic(() => import('@/components/tools/MaturityAssessment'), {
  loading: () => <div className="h-96 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />,
  ssr: true,
});
