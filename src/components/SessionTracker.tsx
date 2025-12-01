'use client';

import { ArrowRight, History, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const SessionTracker: React.FC = () => {
  const pathname = usePathname();
  const [resumePath, setResumePath] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // 1. Scroll to top on route change
    window.scrollTo(0, 0);

    // 2. Personalization: Save Last Visited Page
    // Ignore utility pages, home, and short visits
    const ignorePaths = ['/', '/login', '/search', '/thank-you', '/404'];
    if (!ignorePaths.includes(pathname)) {
      localStorage.setItem('bizops_last_visit', pathname);
    }
  }, [pathname]);

  useEffect(() => {
    // 3. Personalization: Check for Resume Opportunity on Homepage
    let timer: ReturnType<typeof setTimeout>;

    if (pathname === '/') {
      const lastVisit = localStorage.getItem('bizops_last_visit');
      if (lastVisit && lastVisit !== '/') {
        setResumePath(lastVisit);
        // Delay toast slightly for better UX
        timer = setTimeout(() => setShowToast(true), 2000);
      }
    } else {
      setShowToast(false);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [pathname]);

  if (!showToast || !resumePath) {
    return null;
  }

  return (
    <div className="animate-fade-in-up fixed bottom-32 left-4 z-40 max-w-[calc(100vw-2rem)] md:bottom-24 md:left-8 md:max-w-sm">
      <div className="flex items-center gap-4 rounded-full bg-slate-900 px-5 py-3 pr-2 text-white shadow-2xl ring-4 ring-white/20 backdrop-blur-sm">
        <div className="flex items-center gap-2 text-sm">
          <History className="text-primary-400 h-4 w-4" />
          <span>Lanjutkan sesi terakhir Anda?</span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={resumePath}
            onClick={() => setShowToast(false)}
            className="flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-900 transition-colors hover:bg-slate-100"
          >
            Lanjut
            {' '}
            <ArrowRight className="h-3 w-3" />
          </Link>
          <button
            onClick={() => setShowToast(false)}
            className="rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionTracker;
