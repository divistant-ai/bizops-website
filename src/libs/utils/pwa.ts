import { logger } from './logger';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
  preventDefault: () => void;
};

/**
 * PWA Utilities - Service Worker Registration
 *
 * Handles Progressive Web App functionality including:
 * - Service Worker registration
 * - Update notifications
 * - Offline detection
 * - Install prompt handling
 */

// Check if service workers are supported
export const isServiceWorkerSupported = (): boolean => {
  return typeof window !== 'undefined' && 'serviceWorker' in navigator;
};

// Register service worker
export const registerServiceWorker = async (): Promise<ServiceWorkerRegistration | null> => {
  if (!isServiceWorkerSupported()) {
    logger.warn('PWA: Service Workers not supported in this browser');
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
    });

    logger.debug('PWA: Service Worker registered successfully');

    // Check for updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;

      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            logger.info('PWA: New version available! Reload to update.');
            showUpdateNotification();
          }
        });
      }
    });

    return registration;
  } catch (error) {
    logger.error('PWA: Service Worker registration failed', error);
    return null;
  }
};

// Unregister service worker
export const unregisterServiceWorker = async (): Promise<boolean> => {
  if (!isServiceWorkerSupported()) {
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration();

    if (registration) {
      const success = await registration.unregister();
      logger.debug('PWA: Service Worker unregistered', success);
      return success;
    }

    return false;
  } catch (error) {
    logger.error('PWA: Service Worker unregister failed', error);
    return false;
  }
};

// Show update notification
const showUpdateNotification = (): void => {
  if (typeof window === 'undefined') {
    return;
  }

  const event = new CustomEvent('sw-update', {
    detail: {
      message: 'New version available! Reload to update.',
    },
  });

  window.dispatchEvent(event);
};

// Skip waiting and activate new service worker
export const skipWaiting = async (): Promise<void> => {
  if (typeof window === 'undefined') {
    return;
  }

  const registration = await navigator.serviceWorker.getRegistration();

  if (registration && registration.waiting) {
    registration.waiting.postMessage({ type: 'SKIP_WAITING' });
  }
};

// Check if app is running in standalone mode (installed PWA)
export const isStandalone = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }

  const nav = window.navigator as Navigator & { standalone?: boolean };
  return (
    window.matchMedia('(display-mode: standalone)').matches
    || nav.standalone === true
    || document.referrer.includes('android-app://')
  );
};

// Check online/offline status
export const isOnline = (): boolean => {
  if (typeof window === 'undefined') {
    return true;
  }
  return navigator.onLine;
};

// Listen for online/offline events
export const setupOnlineListener = (
  onOnline?: () => void,
  onOffline?: () => void,
): (() => void) => {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const handleOnline = () => {
    logger.debug('PWA: Back online');
    if (onOnline) {
      onOnline();
    }
  };

  const handleOffline = () => {
    logger.debug('PWA: Gone offline');
    if (onOffline) {
      onOffline();
    }
  };

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
};

// PWA Install Prompt
let deferredPrompt: BeforeInstallPromptEvent | null = null;

// Listen for beforeinstallprompt event
export const setupInstallPrompt = (): void => {
  if (typeof window === 'undefined') {
    return;
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();

    deferredPrompt = e as BeforeInstallPromptEvent;

    logger.debug('PWA: Install prompt available');

    const event = new CustomEvent('pwa-installable');
    window.dispatchEvent(event);
  });

  window.addEventListener('appinstalled', () => {
    logger.info('PWA: App installed successfully');

    deferredPrompt = null;

    const event = new CustomEvent('pwa-installed');
    window.dispatchEvent(event);
  });
};

// Show install prompt
export const showInstallPrompt = async (): Promise<boolean> => {
  if (!deferredPrompt) {
    logger.warn('PWA: Install prompt not available');
    return false;
  }

  await deferredPrompt.prompt();

  const { outcome } = await deferredPrompt.userChoice;

  logger.debug(`PWA: User response: ${outcome}`);

  deferredPrompt = null;

  return outcome === 'accepted';
};

// Check if install prompt is available
export const isInstallPromptAvailable = (): boolean => {
  return deferredPrompt !== null;
};

// Initialize PWA
export const initializePWA = async (): Promise<void> => {
  if (typeof window === 'undefined') {
    return;
  }

  logger.debug('PWA: Initializing...');

  await registerServiceWorker();
  setupInstallPrompt();

  setupOnlineListener(
    () => {
      const event = new CustomEvent('connection-status', {
        detail: { online: true },
      });
      window.dispatchEvent(event);
    },
    () => {
      const event = new CustomEvent('connection-status', {
        detail: { online: false },
      });
      window.dispatchEvent(event);
    },
  );

  logger.info('PWA: Initialized successfully');
  logger.debug('PWA: Standalone mode', isStandalone());
  logger.debug('PWA: Online status', isOnline());
};
