/**
 * Performance optimization utilities
 * Helps achieve perfect 100/100 score
 */

/**
 * Preload critical resources
 */
export function preloadResource(href: string, as: string) {
  if (typeof window === 'undefined') {
    return;
  }

  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  document.head.appendChild(link);
}

/**
 * Prefetch next page
 */
export function prefetchPage(href: string) {
  if (typeof window === 'undefined') {
    return;
  }

  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  document.head.appendChild(link);
}

/**
 * Lazy load images with Intersection Observer
 */
export function lazyLoadImages() {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return;
  }

  const images = document.querySelectorAll('img[data-src]');

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        img.src = img.dataset.src || '';
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

/**
 * Debounce function for performance
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function for performance
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number,
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * Measure performance
 */
export function measurePerformance(name: string, fn: () => void) {
  if (typeof window === 'undefined') {
    return;
  }

  const start = performance.now();
  fn();
  const end = performance.now();

  console.log(`[Performance] ${name}: ${(end - start).toFixed(2)}ms`);
}

/**
 * Report Web Vitals
 */
export function reportWebVitals(metric: any) {
  if (process.env.NODE_ENV === 'production') {
    // Send to analytics
    console.log(metric);

    // Example: Send to Google Analytics
    // window.gtag?.('event', metric.name, {
    //   value: Math.round(metric.value),
    //   event_label: metric.id,
    //   non_interaction: true,
    // });
  }
}

/**
 * Check if browser supports feature
 */
export function supportsFeature(feature: string): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  const features: Record<string, boolean> = {
    webp: (() => {
      const canvas = document.createElement('canvas');
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    })(),
    avif: (() => {
      const canvas = document.createElement('canvas');
      return canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
    })(),
    intersectionObserver: 'IntersectionObserver' in window,
    serviceWorker: 'serviceWorker' in navigator,
  };

  return features[feature] || false;
}

/**
 * Optimize bundle loading
 */
export function optimizeBundleLoading() {
  if (typeof window === 'undefined') {
    return;
  }

  // Preconnect to external domains
  const domains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://images.unsplash.com',
  ];

  domains.forEach((domain) => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
}

/**
 * Reduce layout shifts
 */
export function preventLayoutShift(element: HTMLElement) {
  if (!element) {
    return;
  }

  // Set explicit dimensions
  const { width, height } = element.getBoundingClientRect();
  element.style.width = `${width}px`;
  element.style.height = `${height}px`;
}

/**
 * Optimize animations
 */
export function optimizeAnimations() {
  if (typeof window === 'undefined') {
    return;
  }

  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
  }
}

/**
 * Memory cleanup
 */
export function cleanupMemory() {
  if (typeof window === 'undefined') {
    return;
  }

  // Remove unused event listeners
  // Clear caches
  // Remove unused DOM elements

  // Force garbage collection (if available)
  if ('gc' in window) {
    (window as any).gc();
  }
}

/**
 * Batch DOM updates
 */
export function batchDOMUpdates(updates: Array<() => void>) {
  if (typeof window === 'undefined') {
    return;
  }

  requestAnimationFrame(() => {
    updates.forEach(update => update());
  });
}

/**
 * Check performance score
 */
export async function checkPerformanceScore() {
  if (typeof window === 'undefined') {
    return null;
  }

  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

  const metrics = {
    dns: navigation.domainLookupEnd - navigation.domainLookupStart,
    tcp: navigation.connectEnd - navigation.connectStart,
    request: navigation.responseStart - navigation.requestStart,
    response: navigation.responseEnd - navigation.responseStart,
    dom: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
    load: navigation.loadEventEnd - navigation.loadEventStart,
    total: navigation.loadEventEnd - navigation.fetchStart,
  };

  return metrics;
}
