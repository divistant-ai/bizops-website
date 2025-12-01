'use client';

import { Cookie, Settings, Shield, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { logger } from '@/libs/utils/logger';
import Button from './ui/Button';

const CookieConsent: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Default preferences
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if consent is already stored
    const consent = localStorage.getItem('bizops_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setShowBanner(true), 1500);
      return () => clearTimeout(timer);
    } else {
      // Load saved preferences
      try {
        const parsed = JSON.parse(consent);
        setPreferences(parsed);
      } catch (e) {
        logger.error('Error parsing cookie consent', e);
      }
    }

    // Listen for reopen event from Footer
    const handleOpenSettings = () => {
      setShowBanner(false);
      setShowSettings(true);
    };

    window.addEventListener('openCookieSettings', handleOpenSettings);
    return () => window.removeEventListener('openCookieSettings', handleOpenSettings);
  }, []);

  const saveConsent = (prefs: typeof preferences) => {
    localStorage.setItem('bizops_cookie_consent', JSON.stringify({
      ...prefs,
      timestamp: new Date().toISOString(),
    }));
    setPreferences(prefs);
    setShowBanner(false);
    setShowSettings(false);

    // Apply logic based on consent
    if (prefs.analytics) {
      logger.debug('Analytics Cookies Enabled');
    }
    if (prefs.marketing) {
      logger.debug('Marketing Cookies Enabled');
    }
  };

  const handleAcceptAll = () => {
    const allGranted = { necessary: true, analytics: true, marketing: true };
    saveConsent(allGranted);
  };

  const handleRejectAll = () => {
    const allRejected = { necessary: true, analytics: false, marketing: false };
    saveConsent(allRejected);
  };

  if (!showBanner && !showSettings) {
    return null;
  }

  return (
    <>
      {/* Settings Modal */}
      {showSettings && (
        <div className="animate-fade-in-up fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-950">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-slate-50/50 p-6 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/50">
              <h3 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
                <Settings className="text-primary-600 h-5 w-5" />
                {' '}
                Cookie Preferences
              </h3>
              <button
                onClick={() => setShowSettings(false)}
                className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                aria-label="Close Settings"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-grow space-y-6 p-6">
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Kami menggunakan cookies untuk meningkatkan pengalaman browsing, menyajikan konten yang dipersonalisasi, dan menganalisis trafik situs kami. Sesuai dengan
                {' '}
                <strong>UU PDP</strong>
                {' '}
                dan
                {' '}
                <strong>GDPR</strong>
                , Anda memiliki kendali penuh atas data yang dikumpulkan.
              </p>

              {/* Necessary */}
              <div className="flex items-start gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 opacity-75 dark:border-slate-800 dark:bg-slate-900">
                <div className="mt-1"><Shield className="h-5 w-5 text-green-600" /></div>
                <div className="flex-grow">
                  <div className="mb-1 flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Strictly Necessary</h4>
                    <span className="rounded border border-green-200 bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-700 dark:border-green-800 dark:bg-green-900/30 dark:text-green-400">REQUIRED</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Wajib untuk fungsi dasar situs seperti keamanan, manajemen sesi login, dan preferensi bahasa. Tidak dapat dimatikan.</p>
                </div>
                <div>
                  <input type="checkbox" checked disabled className="text-primary-600 focus:ring-primary-500 h-5 w-5 rounded border-slate-300 bg-slate-100 dark:border-slate-600 dark:bg-slate-800" />
                </div>
              </div>

              {/* Analytics */}
              <div className="hover:border-primary-200 dark:hover:border-primary-900 flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-4 transition-colors dark:border-slate-800 dark:bg-slate-900">
                <div className="mt-1"><Cookie className="h-5 w-5 text-blue-600" /></div>
                <div className="flex-grow">
                  <div className="mb-1 flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Analytics & Performance</h4>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Membantu kami memahami bagaimana pengunjung berinteraksi dengan situs web (misal: halaman populer, waktu kunjungan). Data dikumpulkan secara anonim.</p>
                </div>
                <div>
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={e => setPreferences({ ...preferences, analytics: e.target.checked })}
                    className="text-primary-600 focus:ring-primary-500 h-5 w-5 cursor-pointer rounded border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800"
                  />
                </div>
              </div>

              {/* Marketing */}
              <div className="hover:border-primary-200 dark:hover:border-primary-900 flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-4 transition-colors dark:border-slate-800 dark:bg-slate-900">
                <div className="mt-1"><Cookie className="h-5 w-5 text-amber-600" /></div>
                <div className="flex-grow">
                  <div className="mb-1 flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Marketing & Targeting</h4>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Digunakan untuk menampilkan iklan yang relevan bagi Anda di platform lain dan mengukur efektivitas kampanye.</p>
                </div>
                <div>
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={e => setPreferences({ ...preferences, marketing: e.target.checked })}
                    className="text-primary-600 focus:ring-primary-500 h-5 w-5 cursor-pointer rounded border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 rounded-b-2xl border-t border-slate-100 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/50">
              <Button variant="ghost" onClick={() => setShowSettings(false)}>Batal</Button>
              <Button onClick={() => saveConsent(preferences)} className="shadow-lg">Simpan Preferensi</Button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Banner */}
      {showBanner && !showSettings && (
        <div className="animate-fade-in-up fixed right-4 bottom-4 left-4 z-[90] md:right-auto md:left-8 md:max-w-md">
          <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl ring-1 ring-black/5 dark:border-slate-800 dark:bg-slate-950">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary-50 dark:bg-primary-900/30 text-primary-600 rounded-lg p-2">
                  <Shield className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Privasi & Data</h3>
              </div>
              <button onClick={() => setShowBanner(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              BizOps menghormati privasi Anda. Kami menggunakan cookies untuk keamanan dan analisis. Anda dapat mengatur preferensi Anda sesuai
              {' '}
              <strong>UU PDP</strong>
              .
            </p>

            <div className="flex flex-col gap-2">
              <Button size="sm" fullWidth onClick={handleAcceptAll} className="shadow-md">Terima Semua</Button>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowSettings(true)} className="text-xs">Atur</Button>
                <Button variant="ghost" size="sm" onClick={handleRejectAll} className="text-xs text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">Tolak</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;
