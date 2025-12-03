'use client';

import type { LegalDoc } from '@/data/legalContent';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  BrainCircuit,
  CheckCircle,
  Clock,
  Cookie,
  Database,
  Download,
  FileText,
  Lock,
  Menu,
  Save,
  Scale,
  Shield,
  Trash2,
  X,
} from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Container, Section } from '@/components/layout';
import { Button } from '@/components/ui';

const LEGAL_LINKS = [
  { id: 'privacy', label: 'Privacy Policy', icon: Shield },
  { id: 'data-rights', label: 'Privacy Center (DSAR)', icon: Database },
  { id: 'dpa', label: 'Data Processing Agmt', icon: Lock },
  { id: 'ai-ethics', label: 'AI Ethics & Safety', icon: BrainCircuit },
  { id: 'terms', label: 'Terms of Service', icon: FileText },
  { id: 'sla', label: 'Service Level Agreement', icon: Scale },
  { id: 'cookies', label: 'Cookie Preferences', icon: Cookie },
];

type LegalDetailContentProps = {
  slug: string;
  data: LegalDoc;
};

export default function LegalDetailContent({ slug, data }: LegalDetailContentProps) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [headings, setHeadings] = useState<{ id: string; text: string }[]>([]);

  // Cookie Preferences State
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });
  const [saved, setSaved] = useState(false);

  // Data Rights State
  const [requestType, setRequestType] = useState<'export' | 'delete' | null>(null);
  const [email, setEmail] = useState('');
  const [requestStatus, setRequestStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  useEffect(() => {
    // Parse headings for TOC
    if (data?.content) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data.content, 'text/html');
      const h2s = Array.from(doc.querySelectorAll('h2')).map((h2, index) => {
        const id = h2.id || `section-${index}`;
        return { id, text: h2.textContent || '' };
      });
      setHeadings(h2s);
    }
  }, [data]);

  useEffect(() => {
    if (slug === 'cookies') {
      const stored = localStorage.getItem('bizops_cookie_consent');
      if (stored) {
        try {
          setPreferences(JSON.parse(stored));
        } catch (e) {
          // Ignore parse errors
        }
      }
    }
    setRequestType(null);
    setRequestStatus('idle');
    setEmail('');
    setIsMobileNavOpen(false);
  }, [slug]);

  const handleSaveCookies = () => {
    const newPrefs = {
      ...preferences,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('bizops_cookie_consent', JSON.stringify(newPrefs));
    setSaved(true);

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('bizops_cookie_updated'));
    }
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDataRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setRequestStatus('loading');
    setTimeout(() => {
      setRequestStatus('success');
      setTimeout(() => {
        setRequestStatus('idle');
        setRequestType(null);
        setEmail('');
      }, 3000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Header */}
      <Section className="border-b border-slate-200 bg-slate-50 pt-32 pb-16 dark:border-slate-800 dark:bg-slate-900">
        <Container size="6xl">
          <div className="mb-8 flex items-center justify-between">
            <Link href="/legal" className="hover:text-primary-600 dark:hover:text-primary-400 inline-flex items-center text-slate-500 transition-colors dark:text-slate-400">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Pusat Legal
            </Link>

            {/* Mobile Nav Toggle */}
            <button
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              className="rounded-lg border border-slate-200 bg-white p-2 lg:hidden dark:border-slate-700 dark:bg-slate-800"
            >
              {isMobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
            {/* Sidebar Navigation */}
            <AnimatePresence>
              {(isMobileNavOpen || (typeof window !== 'undefined' && window.innerWidth >= 1024)) && (
                <motion.aside
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="fixed top-24 right-0 left-0 z-40 max-h-[calc(100vh-6rem)] overflow-y-auto border-b border-slate-200 bg-white p-4 lg:sticky lg:right-auto lg:left-auto lg:block lg:border-0 lg:bg-transparent lg:p-0 dark:border-slate-800 dark:bg-slate-900"
                >
                  <nav className="space-y-2">
                    {LEGAL_LINKS.map((link) => {
                      const Icon = link.icon;
                      const isActive = slug === link.id;
                      return (
                        <Link
                          key={link.id}
                          href={`/legal/${link.id}`}
                          onClick={() => setIsMobileNavOpen(false)}
                          className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
                            isActive
                              ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium'
                              : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                          }`}
                        >
                          <Icon className="h-4 w-4 shrink-0" />
                          <span className="text-sm">{link.label}</span>
                        </Link>
                      );
                    })}
                  </nav>
                </motion.aside>
              )}
            </AnimatePresence>

            {/* Main Content */}
            <div>
              <h1 className="mb-4 text-4xl font-bold text-slate-900 md:text-5xl dark:text-white">{data.title}</h1>
              <p className="mb-6 text-xl text-slate-600 dark:text-slate-400">{data.subtitle}</p>
              <div className="mb-8 flex items-center text-sm text-slate-500 dark:text-slate-400">
                <Clock className="mr-2 h-4 w-4" />
                Terakhir diperbarui:
                {' '}
                {data.updated}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Content */}
      <Section>
        <Container size="4xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_250px]">
            {/* Main Content */}
            <div>
              {/* Cookie Preferences Interactive UI */}
              {slug === 'cookies' && (
                <div className="mb-12 rounded-2xl border border-slate-200 bg-slate-50 p-8 dark:border-slate-800 dark:bg-slate-900">
                  <h3 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">Manage Your Preferences</h3>

                  <div className="mb-6 space-y-4">
                    <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white">Necessary Cookies</div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">Required for basic site functionality</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={preferences.necessary}
                        disabled
                        className="h-5 w-5"
                      />
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white">Analytics Cookies</div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">Help us improve our services</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={e => setPreferences({ ...preferences, analytics: e.target.checked })}
                        className="h-5 w-5"
                      />
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white">Marketing Cookies</div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">Personalized content and ads</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={preferences.marketing}
                        onChange={e => setPreferences({ ...preferences, marketing: e.target.checked })}
                        className="h-5 w-5"
                      />
                    </div>
                  </div>

                  <Button onClick={handleSaveCookies} className="w-full sm:w-auto">
                    <Save className="mr-2 h-4 w-4" />
                    {saved ? 'Saved!' : 'Save Preferences'}
                  </Button>
                </div>
              )}

              {/* Data Rights Interactive UI */}
              {slug === 'data-rights' && (
                <div className="mb-12 rounded-2xl border border-slate-200 bg-slate-50 p-8 dark:border-slate-800 dark:bg-slate-900">
                  <h3 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">Submit Data Request</h3>

                  {requestStatus === 'success'
                    ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="py-8 text-center"
                        >
                          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                            <CheckCircle className="h-8 w-8" />
                          </div>
                          <h4 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">Request Submitted!</h4>
                          <p className="text-slate-600 dark:text-slate-400">We'll process your request within 30 days.</p>
                        </motion.div>
                      )
                    : (
                        <>
                          <div className="mb-6 grid gap-4 sm:grid-cols-2">
                            <button
                              onClick={() => setRequestType('export')}
                              className={`rounded-xl border-2 p-6 transition-all ${
                                requestType === 'export'
                                  ? 'border-primary-600 dark:border-primary-400 bg-primary-50 dark:bg-primary-900/20'
                                  : 'border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700'
                              }`}
                            >
                              <Download className="text-primary-600 dark:text-primary-400 mb-3 h-8 w-8" />
                              <div className="font-bold text-slate-900 dark:text-white">Export My Data</div>
                              <div className="text-sm text-slate-600 dark:text-slate-400">Download all your data</div>
                            </button>

                            <button
                              onClick={() => setRequestType('delete')}
                              className={`rounded-xl border-2 p-6 transition-all ${
                                requestType === 'delete'
                                  ? 'border-red-600 bg-red-50 dark:border-red-400 dark:bg-red-900/20'
                                  : 'border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700'
                              }`}
                            >
                              <Trash2 className="mb-3 h-8 w-8 text-red-600 dark:text-red-400" />
                              <div className="font-bold text-slate-900 dark:text-white">Delete My Data</div>
                              <div className="text-sm text-slate-600 dark:text-slate-400">Permanently remove data</div>
                            </button>
                          </div>

                          {requestType && (
                            <motion.form
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              onSubmit={handleDataRequest}
                              className="space-y-4"
                            >
                              <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                                  Email Address
                                </label>
                                <input
                                  type="email"
                                  value={email}
                                  onChange={e => setEmail(e.target.value)}
                                  required
                                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                                  placeholder="your@email.com"
                                />
                              </div>
                              <Button
                                type="submit"
                                disabled={requestStatus === 'loading'}
                                className="w-full sm:w-auto"
                              >
                                {requestStatus === 'loading' ? 'Processing...' : 'Submit Request'}
                              </Button>
                            </motion.form>
                          )}
                        </>
                      )}
                </div>
              )}

              {/* Legal Content */}
              <div className="prose prose-lg prose-slate dark:prose-invert prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white prose-a:text-primary-600 dark:prose-a:text-primary-400 max-w-none">
                <div dangerouslySetInnerHTML={{ __html: data.content }} />
              </div>
            </div>

            {/* TOC Sidebar */}
            {headings.length > 0 && (
              <aside className="hidden lg:block">
                <div className="sticky top-24">
                  <h4 className="mb-4 text-sm font-bold tracking-wider text-slate-900 uppercase dark:text-white">
                    Table of Contents
                  </h4>
                  <nav className="space-y-2">
                    {headings.map(heading => (
                      <a
                        key={heading.id}
                        href={`#${heading.id}`}
                        className="hover:text-primary-600 dark:hover:text-primary-400 block py-1 text-sm text-slate-600 transition-colors dark:text-slate-400"
                      >
                        {heading.text}
                      </a>
                    ))}
                  </nav>
                </div>
              </aside>
            )}
          </div>
        </Container>
      </Section>
    </div>
  );
}
