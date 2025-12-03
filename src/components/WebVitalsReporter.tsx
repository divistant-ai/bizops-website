'use client';

/**
 * Web Vitals Reporter Component
 * Automatically reports web vitals when mounted
 */

import { useReportWebVitals } from 'next/web-vitals';
import { useEffect } from 'react';
import { reportWebVitals, startPerformanceMonitoring } from '@/app/web-vitals';

export function WebVitalsReporter() {
  useReportWebVitals(reportWebVitals);

  useEffect(() => {
    // Start continuous performance monitoring
    startPerformanceMonitoring();
  }, []);

  return null;
}
