'use client';

import { ArrowUpRight, Bug, CheckCircle, ChevronRight, Instagram, Linkedin, Lock, Mail, MapPin, Moon, Phone, ShieldCheck, Signal, Sun, Twitter, Youtube } from 'lucide-react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useTransition } from 'react';
import { subscribeToNewsletter } from '@/app/actions/newsletter';
import { useTheme } from '@/contexts/ThemeContext';
import { usePathname } from '@/libs/I18nNavigation';
import { routing } from '@/libs/I18nRouting';

// SVG Assets for App Stores
const AppleIcon = () => (
  <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" role="img" aria-label="Apple Logo">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.21-.93 3.69-.74 1.6.19 2.72.79 3.42 1.82-3.06 1.86-2.51 5.71.6 7.02-.62 1.58-1.53 3.14-2.79 4.13zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
  </svg>
);

const PlayStoreIcon = () => (
  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" role="img" aria-label="Google Play Logo">
    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.89l1.434 1.433 4.505-2.503a1 1 0 0 0 .003-1.737l-4.507-2.505-1.435 1.435zm-9.98 10.208l10.66-10.66 2.452 2.45-11.793 6.552a1 1 0 0 1-1.319-1.658zM4.52 1.088l11.795 6.553-2.454 2.45-10.66-10.66A1 1 0 0 1 4.52 1.088z" />
  </svg>
);

type FooterLinkProps = {
  href: string;
  children: React.ReactNode;
  isExternal?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
};

const FooterLink: React.FC<FooterLinkProps> = ({ href, children, isExternal = false, icon: Icon }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li>
      <Link
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className={`group flex items-center gap-2 py-1 text-[14px] transition-colors ${isActive ? 'font-medium text-white' : 'text-slate-400 hover:text-white'}`}
      >
        {Icon && <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-primary-400' : 'group-hover:text-primary-400 text-slate-500'} transition-colors`} />}
        <span className="inline-block truncate transition-transform duration-200 group-hover:translate-x-1">{children}</span>
        {isExternal && <ArrowUpRight className="h-3 w-3 text-slate-500 opacity-0 transition-opacity group-hover:opacity-100" />}
      </Link>
    </li>
  );
};

type SocialLinkProps = {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
};

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon: Icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 bg-slate-900 text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white hover:text-slate-950"
  >
    <Icon className="h-5 w-5" />
  </a>
);

type FooterLinkGroupProps = {
  title: string;
  children: React.ReactNode;
};

const FooterLinkGroup: React.FC<FooterLinkGroupProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-6 border-b border-white/5 pb-6 md:border-none md:pb-0">
      <div
        className="group flex cursor-pointer items-center justify-between select-none md:cursor-default"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-xs font-bold tracking-widest text-slate-500 uppercase transition-colors group-hover:text-white md:group-hover:text-slate-500">{title}</h3>
        <ChevronRight className={`h-4 w-4 text-slate-500 transition-transform duration-300 md:hidden ${isOpen ? 'text-primary-400 rotate-90' : ''}`} />
      </div>

      <div className={`space-y-3 overflow-hidden transition-all duration-300 ${isOpen ? 'mt-4 max-h-96 opacity-100' : 'max-h-0 opacity-0 md:mt-0 md:max-h-full md:opacity-100'}`}>
        {children}
      </div>
    </div>
  );
};

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by rendering theme toggle only on client
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError('Email tidak boleh kosong');
      return;
    }

    startTransition(async () => {
      const formData = new FormData();
      formData.append('email', email);

      const result = await subscribeToNewsletter(formData);

      if (result.success) {
        setSubscribed(true);
        setEmail('');
        setTimeout(() => {
          setSubscribed(false);
        }, 3000);
      } else {
        setError(result.error || 'Terjadi kesalahan');
      }
    });
  };

  return (
    <footer className="relative z-10 overflow-hidden border-t border-slate-900/50 bg-[#0B0F19] font-sans text-white">
      {/* Ambient Background Glow */}
      <div className="pointer-events-none absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-blue-600/5 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-indigo-600/5 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-12 pb-8 sm:px-6 md:pt-20 md:pb-10 lg:px-8">

        {/* MAIN GRID */}
        <div className="mb-12 grid grid-cols-1 gap-10 md:mb-20 md:grid-cols-12 md:gap-12 xl:gap-12">

          {/* BRAND COLUMN (Left) */}
          <div className="space-y-6 md:col-span-12 md:space-y-8 lg:col-span-4">
            <Link href="/" className="group flex w-fit items-center gap-3 focus:outline-none" aria-label="BizOps Home">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-lg shadow-white/5 transition-transform group-hover:rotate-6">
                <div className="h-5 w-5 rotate-45 transform rounded-sm bg-[#0B0F19]"></div>
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">BizOps</span>
            </Link>

            <p className="w-full text-sm leading-relaxed text-slate-400 md:max-w-sm">
              Sistem operasi bisnis adaptif yang menyatukan HR, Finance, dan Operasional dalam satu platform aman terintegrasi.
            </p>

            <div className="space-y-5 pt-2">
              <div className="flex items-start gap-4">
                <div className="text-primary-400 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white/5">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="mb-1.5 text-xs font-bold tracking-wider text-slate-500 uppercase">Kantor Pusat</p>
                  <span className="block text-sm leading-relaxed text-slate-300">
                    PT BizOps Indonesia
                    <br />
                    Eco-S Sahid Sudirman Residence
                    <br />
                    Jl. Jenderal Sudirman No.86
                    <br />
                    Jakarta Selatan 10250, Indonesia
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-primary-400 group-hover:bg-primary-500 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white/5 transition-colors group-hover:text-white">
                  <Mail className="h-4 w-4" />
                </div>
                <a href="mailto:hello@bizops.id" className="text-sm text-slate-300 transition-colors hover:text-white">hello@bizops.id</a>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-primary-400 group-hover:bg-primary-500 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white/5 transition-colors group-hover:text-white">
                  <Phone className="h-4 w-4" />
                </div>
                <a href="tel:+622139702834" className="text-sm text-slate-300 transition-colors hover:text-white">+62 21 3970 2834</a>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <SocialLink href="https://linkedin.com/company/bizops" icon={Linkedin} label="LinkedIn" />
              <SocialLink href="https://twitter.com/bizops" icon={Twitter} label="Twitter" />
              <SocialLink href="https://youtube.com/@bizops" icon={Youtube} label="YouTube" />
              <SocialLink href="https://instagram.com/bizops.id" icon={Instagram} label="Instagram" />
            </div>
          </div>

          {/* LINKS COLUMNS (Middle) */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 md:col-span-7 lg:col-span-5 lg:gap-4">

            <FooterLinkGroup title="Platform">
              <ul className="space-y-2.5">
                <FooterLink href="/platform">Overview</FooterLink>
                <FooterLink href="/platform/modules/hr">HR System</FooterLink>
                <FooterLink href="/platform/modules/finance">Finance</FooterLink>
                <FooterLink href="/platform/modules/operations">Operations</FooterLink>
                <FooterLink href="/platform/technologies/integration">Integrations</FooterLink>
                <FooterLink href="/pricing">Pricing</FooterLink>
                <FooterLink href="/roadmap">Roadmap</FooterLink>
              </ul>
            </FooterLinkGroup>

            <FooterLinkGroup title="Company">
              <ul className="space-y-2.5">
                <FooterLink href="/about">About Us</FooterLink>
                <FooterLink href="/customers">Customers</FooterLink>
                <FooterLink href="/partners">Partners</FooterLink>
                <FooterLink href="/careers">Careers</FooterLink>
                <FooterLink href="/media-kit">Media Kit</FooterLink>
                <FooterLink href="/contact">Contact</FooterLink>
                <FooterLink href="/trust" icon={ShieldCheck}>Trust Center</FooterLink>
              </ul>
            </FooterLinkGroup>

            <FooterLinkGroup title="Resources">
              <ul className="space-y-2.5">
                <FooterLink href="/blog">Blog</FooterLink>
                <FooterLink href="/docs">Docs</FooterLink>
                <FooterLink href="/tools/roi-calculator">ROI Calc</FooterLink>
                <FooterLink href="/tools/assessment">Assessment</FooterLink>
                <FooterLink href="/status" icon={Signal}>Status</FooterLink>
              </ul>
            </FooterLinkGroup>

          </div>

          {/* NEWSLETTER & APP (Right) */}
          <div className="space-y-8 md:col-span-5 lg:col-span-3">

            {/* Newsletter */}
            <div className="relative space-y-4 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <h3 className="text-sm font-bold text-white">Stay Updated</h3>

              {subscribed
                ? (
                    <div className="animate-fade-in-up flex items-center gap-3 rounded-xl border border-green-500/20 bg-green-500/10 p-4 text-green-400">
                      <CheckCircle className="h-5 w-5 shrink-0" />
                      <span className="text-sm font-medium">Subscribed successfully!</span>
                    </div>
                  )
                : (
                    <form onSubmit={handleSubscribe} className="relative">
                      <div className="relative flex items-center">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setError(null);
                          }}
                          placeholder="Email kerja..."
                          className="focus:border-primary-500 focus:ring-primary-500/50 w-full rounded-xl border border-white/10 bg-slate-950/50 py-3 pr-12 pl-4 text-sm text-white transition-all placeholder:text-slate-500 focus:ring-1 focus:outline-none"
                          required
                          disabled={isPending}
                        />
                        <button
                          type="submit"
                          aria-label="Subscribe"
                          disabled={isPending}
                          className="bg-primary-600 hover:bg-primary-500 disabled:hover:bg-primary-600 absolute right-1.5 rounded-lg p-1.5 text-white transition-all disabled:opacity-50"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                      {error && (
                        <p className="animate-fade-in mt-2 text-xs text-red-400">{error}</p>
                      )}
                    </form>
                  )}
            </div>

            {/* Mobile Apps - Compact */}
            <div className="space-y-4">
              <h3 className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">Mobile App</h3>
              <div className="flex flex-col gap-2.5">
                <a
                  href="#"
                  className="group flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900 p-2.5 pr-4 transition-all hover:border-slate-700 hover:bg-slate-800"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-black text-white transition-transform group-hover:scale-105">
                    <AppleIcon />
                  </div>
                  <div className="text-left">
                    <div className="text-[9px] font-bold text-slate-500 uppercase">Download on the</div>
                    <div className="text-xs leading-tight font-bold text-white">App Store</div>
                  </div>
                </a>
                <a
                  href="#"
                  className="group flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900 p-2.5 pr-4 transition-all hover:border-slate-700 hover:bg-slate-800"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded border border-slate-700 bg-slate-800 text-white transition-transform group-hover:scale-105">
                    <PlayStoreIcon />
                  </div>
                  <div className="text-left">
                    <div className="text-[9px] font-bold text-slate-500 uppercase">Get it on</div>
                    <div className="text-xs leading-tight font-bold text-white">Google Play</div>
                  </div>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="flex flex-col items-center justify-between gap-6 border-t border-slate-900 pt-6 md:flex-row">
          {/* Copyright & Language Switcher */}
          <div className="flex w-full flex-col items-center gap-4 md:w-auto md:flex-row">
            <p className="text-xs text-slate-500">
              ©
              {' '}
              {new Date().getFullYear()}
              {' '}
              PT Divistant Teknologi Indonesia. All rights reserved.
            </p>

            {/* Language & Theme Switcher Pill - Compact */}
            <div className="hidden items-center gap-0.5 rounded-full border border-slate-800 bg-slate-900/80 p-0.5 md:flex">
              {routing.locales.map(loc => (
                <button
                  key={loc}
                  onClick={() => {
                    router.push(`/${loc}${pathname}`);
                    router.refresh();
                  }}
                  className={`rounded-full px-2 py-1 text-[10px] font-bold transition-all ${
                    locale === loc
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                  aria-label={`Switch to ${loc.toUpperCase()}`}
                >
                  {loc.toUpperCase()}
                </button>
              ))}
              <div className="h-2.5 w-px bg-slate-800" />
              <button
                onClick={toggleTheme}
                className="rounded-full p-1 text-slate-400 transition-all hover:bg-slate-800 hover:text-white"
                aria-label="Toggle Theme"
              >
                {mounted ? (theme === 'dark' ? <Sun className="h-3 w-3" /> : <Moon className="h-3 w-3" />) : <div className="h-3 w-3" />}
              </button>
            </div>
          </div>

          {/* Legal Links - Compact */}
          <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-500 md:gap-6">
            <Link href="/legal/privacy" className="transition-colors hover:text-white">Privacy</Link>
            <Link href="/legal/terms" className="transition-colors hover:text-white">Terms</Link>
            <Link href="/legal/dpa" className="flex items-center gap-1 transition-colors hover:text-white">
              <Lock className="h-3 w-3" />
              {' '}
              DPA
            </Link>
            <Link href="/security/report" className="flex items-center gap-1 transition-colors hover:text-white">
              <Bug className="h-3 w-3" />
              {' '}
              Report Bug
            </Link>
            <Link href="/sitemap" className="transition-colors hover:text-white">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
