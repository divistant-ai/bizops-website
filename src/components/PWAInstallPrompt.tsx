'use client';

import { Download, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { isInstallPromptAvailable, showInstallPrompt } from '@/libs/utils/pwa';
import Button from './ui/Button';

type PWAInstallPromptProps = {
  onDismiss?: () => void;
};

const PWAInstallPrompt: React.FC<PWAInstallPromptProps> = ({ onDismiss }) => {
  const [show, setShow] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if install prompt is available
    const checkAvailability = () => {
      const available = isInstallPromptAvailable();
      setIsAvailable(available);
      setShow(available);
    };

    // Listen for install prompt events
    const handleInstallable = () => {
      setIsAvailable(true);
      setShow(true);
    };

    const handleInstalled = () => {
      setIsAvailable(false);
      setShow(false);
    };

    window.addEventListener('pwa-installable', handleInstallable);
    window.addEventListener('pwa-installed', handleInstalled);

    // Initial check
    checkAvailability();

    return () => {
      window.removeEventListener('pwa-installable', handleInstallable);
      window.removeEventListener('pwa-installed', handleInstalled);
    };
  }, []);

  const handleInstall = async () => {
    const success = await showInstallPrompt();
    if (success) {
      setShow(false);
      if (onDismiss) {
        onDismiss();
      }
    }
  };

  const handleDismiss = () => {
    setShow(false);
    if (onDismiss) {
      onDismiss();
    }
    // Store dismissal in localStorage to not show again for 7 days
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('pwa_install_dismissed', Date.now().toString());
      }
    } catch (e) {
      // localStorage not available
      console.warn('localStorage not available:', e);
    }
  };

  // Check if user dismissed recently
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      const dismissed = localStorage.getItem('pwa_install_dismissed');
      if (dismissed) {
        const dismissedTime = Number.parseInt(dismissed, 10);
        const sevenDays = 7 * 24 * 60 * 60 * 1000;
        if (Date.now() - dismissedTime < sevenDays) {
          setShow(false);
        }
      }
    } catch (e) {
      // localStorage not available
      console.warn('localStorage not available:', e);
    }
  }, []);

  if (!show || !isAvailable) {
    return null;
  }

  return (
    <div className="animate-fade-in-up fixed right-4 bottom-4 left-4 z-50 md:right-8 md:left-auto md:max-w-sm">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-950">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary-50 dark:bg-primary-900/30 text-primary-600 rounded-lg p-2">
              <Download className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Install BizOps
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Add to home screen for quick access
              </p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            aria-label="Dismiss"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex gap-2">
          <Button size="sm" fullWidth onClick={handleInstall}>
            Install Now
          </Button>
          <Button variant="ghost" size="sm" onClick={handleDismiss}>
            Later
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;
