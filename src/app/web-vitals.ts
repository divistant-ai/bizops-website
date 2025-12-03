'use client';

/**
 * Web Vitals monitoring for performance tracking
 * Helps achieve and maintain 100/100 score
 */

import type { Metric } from 'web-vitals';

const vitalsUrl = 'https://vitals.vercel-analytics.com/v1/vitals';

function getConnectionSpeed() {
  if (typeof navigator === 'undefined') {
    return '';
  }

  const connection = (navigator as any).connection;
  return connection?.effectiveType || '';
}

export function reportWebVitals(metric: Metric) {
  const body: Record<string, string> = {
    dsn: process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ID || '',
    id: metric.id,
    page: window.location.pathname,
    href: window.location.href,
    event_name: metric.name,
    value: metric.value.toString(),
    speed: getConnectionSpeed(),
  };

  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Web Vitals]', {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
    });
  }

  // Send to analytics in production
  if (process.env.NODE_ENV === 'production' && body.dsn) {
    const blob = new Blob([new URLSearchParams(body).toString()], {
      type: 'application/x-www-form-urlencoded',
    });

    if (navigator.sendBeacon) {
      navigator.sendBeacon(vitalsUrl, blob);
    } else {
      fetch(vitalsUrl, {
        body: blob,
        method: 'POST',
        credentials: 'omit',
        keepalive: true,
      });
    }
  }

  // Custom tracking for specific metrics
  trackMetricThresholds(metric);
}

/**
 * Track if metrics exceed thresholds
 */
function trackMetricThresholds(metric: Metric) {
  const thresholds = {
    CLS: 0.1, // Cumulative Layout Shift
    FID: 100, // First Input Delay (ms)
    LCP: 2500, // Largest Contentful Paint (ms)
    FCP: 1800, // First Contentful Paint (ms)
    TTFB: 800, // Time to First Byte (ms)
    INP: 200, // Interaction to Next Paint (ms)
  };

  const threshold = thresholds[metric.name as keyof typeof thresholds];

  if (threshold && metric.value > threshold) {
    console.warn(`[Web Vitals] ${metric.name} exceeded threshold:`, {
      value: metric.value,
      threshold,
      rating: metric.rating,
    });

    // Send warning to monitoring service
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to Sentry
      // Sentry.captureMessage(`Web Vital threshold exceeded: ${metric.name}`, {
      //   level: 'warning',
      //   extra: { metric },
      // });
    }
  }
}

/**
 * Get performance score based on Web Vitals
 */
export function getPerformanceScore(metrics: Record<string, number>): number {
  const weights = {
    LCP: 0.25,
    FID: 0.25,
    CLS: 0.25,
    FCP: 0.15,
    TTFB: 0.10,
  };

  const scores = {
    LCP: calculateLCPScore(metrics.LCP || 0),
    FID: calculateFIDScore(metrics.FID || 0),
    CLS: calculateCLSScore(metrics.CLS || 0),
    FCP: calculateFCPScore(metrics.FCP || 0),
    TTFB: calculateTTFBScore(metrics.TTFB || 0),
  };

  let totalScore = 0;
  for (const [metric, weight] of Object.entries(weights)) {
    totalScore += scores[metric as keyof typeof scores] * weight;
  }

  return Math.round(totalScore);
}

function calculateLCPScore(value: number): number {
  if (value <= 2500) {
    return 100;
  }
  if (value <= 4000) {
    return 50;
  }
  return 0;
}

function calculateFIDScore(value: number): number {
  if (value <= 100) {
    return 100;
  }
  if (value <= 300) {
    return 50;
  }
  return 0;
}

function calculateCLSScore(value: number): number {
  if (value <= 0.1) {
    return 100;
  }
  if (value <= 0.25) {
    return 50;
  }
  return 0;
}

function calculateFCPScore(value: number): number {
  if (value <= 1800) {
    return 100;
  }
  if (value <= 3000) {
    return 50;
  }
  return 0;
}

function calculateTTFBScore(value: number): number {
  if (value <= 800) {
    return 100;
  }
  if (value <= 1800) {
    return 50;
  }
  return 0;
}

/**
 * Monitor performance continuously
 */
export function startPerformanceMonitoring() {
  if (typeof window === 'undefined') {
    return;
  }

  // Monitor long tasks
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) {
            console.warn('[Performance] Long task detected:', {
              duration: entry.duration,
              startTime: entry.startTime,
            });
          }
        }
      });

      observer.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      // PerformanceObserver not supported
    }
  }

  // Monitor memory usage
  if ('memory' in performance) {
    setInterval(() => {
      const memory = (performance as any).memory;
      const usedPercent = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;

      if (usedPercent > 90) {
        console.warn('[Performance] High memory usage:', {
          used: Math.round(memory.usedJSHeapSize / 1048576),
          limit: Math.round(memory.jsHeapSizeLimit / 1048576),
          percent: Math.round(usedPercent),
        });
      }
    }, 30000); // Check every 30 seconds
  }
}
