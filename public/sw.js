/**
 * Service Worker - BizOps Website v3
 *
 * Provides offline functionality and caching strategies
 * for Progressive Web App experience.
 */

const CACHE_NAME = 'bizops-v3';
const RUNTIME_CACHE = 'bizops-runtime-v3';

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  // Add more critical assets as needed
];

// Cache-first strategy for these patterns
const CACHE_FIRST_PATTERNS = [
  /\.css$/,
  /\.woff2?$/,
  /\.ttf$/,
  /\.eot$/,
  /\.svg$/,
  /\.png$/,
  /\.jpg$/,
  /\.jpeg$/,
  /\.gif$/,
  /\.webp$/,
];

// Network-first strategy for these patterns
const NETWORK_FIRST_PATTERNS = [
  /\/api\//,
  /\.json$/,
];

// Helper function to log SW events (only in dev, via postMessage)
const swLog = (message, data) => {
  // Only log in development
  const isDev = self.location.hostname === 'localhost' || self.location.hostname === '127.0.0.1';
  if (isDev) {
    self.clients.matchAll().then((clients) => {
      clients.forEach((client) => {
        client.postMessage({
          type: 'SW_LOG',
          message,
          data,
          timestamp: new Date().toISOString(),
        });
      });
    });
  }
};

const swError = (message, error) => {
  // Always log errors
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage({
        type: 'SW_ERROR',
        message,
        error: error?.message || String(error),
        timestamp: new Date().toISOString(),
      });
    });
  });
};

// Install event - cache static assets
self.addEventListener('install', (event) => {
  swLog('Service Worker installing', { cacheName: CACHE_NAME });

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        swLog('Caching static assets', { count: STATIC_ASSETS.length });
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        // Skip waiting to activate immediately
        return self.skipWaiting();
      })
      .catch((error) => {
        swError('Service Worker install failed', error);
      }),
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  swLog('Service Worker activating', { cacheName: CACHE_NAME });

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter(name => name !== CACHE_NAME && name !== RUNTIME_CACHE)
            .map((name) => {
              swLog('Deleting old cache', { name });
              return caches.delete(name);
            }),
        );
      })
      .then(() => {
        // Take control of all pages immediately
        return self.clients.claim();
      })
      .catch((error) => {
        swError('Service Worker activation failed', error);
      }),
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip cross-origin requests
  if (url.origin !== self.location.origin) {
    return;
  }

  // Skip Next.js internal requests
  if (url.pathname.startsWith('/_next/')) {
    return;
  }

  // Cache-first strategy for static assets
  if (CACHE_FIRST_PATTERNS.some(pattern => pattern.test(url.pathname))) {
    event.respondWith(
      caches.match(request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            swLog('Cache hit (cache-first)', { url: url.pathname });
            return cachedResponse;
          }

          return fetch(request)
            .then((response) => {
              // Don't cache non-successful responses
              if (!response || response.status !== 200 || response.type === 'error') {
                return response;
              }

              // Clone the response
              const responseToCache = response.clone();

              // Cache the response
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(request, responseToCache);
                });

              return response;
            })
            .catch((error) => {
              swError('Cache-first fetch failed', error);
              // Return offline fallback if available
              return caches.match('/offline');
            });
        }),
    );
    return;
  }

  // Network-first strategy for API and JSON
  if (NETWORK_FIRST_PATTERNS.some(pattern => pattern.test(url.pathname))) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Don't cache non-successful responses
          if (!response || response.status !== 200 || response.type === 'error') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          // Cache the response
          caches.open(RUNTIME_CACHE)
            .then((cache) => {
              cache.put(request, responseToCache);
            });

          return response;
        })
        .catch((error) => {
          swLog('Network-first fetch failed, trying cache', { url: url.pathname });
          return caches.match(request)
            .then((cachedResponse) => {
              if (cachedResponse) {
                swLog('Cache hit (network-first fallback)', { url: url.pathname });
                return cachedResponse;
              }
              throw error;
            });
        }),
    );
    return;
  }

  // Stale-while-revalidate for HTML pages
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        // Fetch from network in parallel
        const fetchPromise = fetch(request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type === 'error') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            // Cache the response
            caches.open(RUNTIME_CACHE)
              .then((cache) => {
                cache.put(request, responseToCache);
              });

            return response;
          })
          .catch((error) => {
            swLog('Stale-while-revalidate fetch failed', { url: url.pathname });
            // Ignore fetch errors, return cached if available
            return null;
          });

        // Return cached immediately if available, otherwise wait for network
        return cachedResponse || fetchPromise;
      }),
  );
});

// Message event - handle messages from clients
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CACHE_URLS') {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then((cache) => {
          return cache.addAll(event.data.urls);
        }),
    );
  }
});

swLog('Service Worker script loaded', { version: 'v3' });
