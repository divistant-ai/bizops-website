/**
 * Client-only lazy-loaded components
 * These components use ssr: false and should only be imported in Client Components
 */

'use client';

import dynamic from 'next/dynamic';

// Modal components (only load when needed, no SSR)
export const DemoModal = dynamic(() => import('@/components/DemoModal'), {
  loading: () => <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" />,
  ssr: false,
});

export const NPSModal = dynamic(() => import('@/components/NPSModal'), {
  loading: () => <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" />,
  ssr: false,
});



