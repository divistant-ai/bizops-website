'use client';

import { useEffect } from 'react';
import { initializePWA } from '@/libs/utils/pwa';

export function PWAInit() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      initializePWA().catch((error) => {
        console.warn('PWA initialization failed:', error);
      });
    }
  }, []);

  return null;
}
