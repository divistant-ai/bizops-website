'use client';

import { ArrowUpRight, Bug, ChevronRight, Instagram, Linkedin, Lock, Mail, MapPin, Phone, Signal, Twitter, Youtube } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
// import { useTheme } from '@/contexts/ThemeContext';

// SVG Assets for App Stores (removed unused icons)

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
    <div className="space-y-5 border-b border-slate-800/50 pb-5 md:border-none md:pb-0">
      <div
        className="group flex cursor-pointer items-center justify-between select-none md:cursor-default"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-[11px] font-bold tracking-widest text-slate-500 uppercase transition-colors group-hover:text-white md:group-hover:text-slate-500">{title}</h3>
        <ChevronRight className={`h-4 w-4 text-slate-500 transition-transform duration-300 md:hidden ${isOpen ? 'text-primary-400 rotate-90' : ''}`} />
      </div>

      <div className={`space-y-2.5 overflow-hidden transition-all duration-300 ${isOpen ? 'mt-4 max-h-96 opacity-100' : 'max-h-0 opacity-0 md:mt-0 md:max-h-full md:opacity-100'}`}>
        {children}
      </div>
    </div>
  );
};

export const Footer: React.FC = () => {
  // const { theme, toggleTheme } = useTheme();

  return (
    <footer className="relative z-10 overflow-hidden border-t border-slate-900/50 bg-[#0B0F19] font-sans text-white">
      {/* Ambient Background Glow */}
      <div className="pointer-events-none absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-blue-900/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-indigo-900/10 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-20 pb-10 sm:px-6 lg:px-8">

        {/* MAIN GRID */}
        <div className="mb-20 grid grid-cols-1 gap-12 md:grid-cols-12 xl:gap-12">

          {/* BRAND COLUMN (Left) */}
          <div className="space-y-8 md:col-span-12 lg:col-span-4">
            <Link href="/" className="group flex w-fit items-center gap-3 focus:outline-none" aria-label="BizOps Home">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-lg shadow-white/5 transition-transform group-hover:rotate-6">
                <div className="h-5 w-5 rotate-45 transform rounded-sm bg-[#0B0F19]"></div>
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">BizOps</span>
            </Link>

            <p className="max-w-sm text-[14px] leading-relaxed text-slate-400">
              Sistem operasi bisnis adaptif yang menyatukan HR, Finance, dan Operasional dalam satu platform aman terintegrasi.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3 text-[13px] text-slate-400">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                <span>
                  Eco-S Sahid Sudirman Residence
                  <br />
                  Jl. Jenderal Sudirman No.86, Jakarta 10250
                </span>
              </div>
              <div className="flex items-center gap-3 text-[13px] text-slate-400 transition-colors hover:text-white">
                <Mail className="h-4 w-4 text-slate-500" />
                <a href="mailto:hello@bizops.id">hello@bizops.id</a>
              </div>
              <div className="flex items-center gap-3 text-[13px] text-slate-400 transition-colors hover:text-white">
                <Phone className="h-4 w-4 text-slate-500" />
                <a href="tel:+622139702834">+62 21 3970 2834</a>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <SocialLink href="https://linkedin.com/company/bizops" icon={Linkedin} label="LinkedIn" />
              <SocialLink href="https://twitter.com/bizops" icon={Twitter} label="Twitter" />
              <SocialLink href="https://youtube.com/@bizops" icon={Youtube} label="YouTube" />
              <SocialLink href="https://instagram.com/bizops.id" icon={Instagram} label="Instagram" />
            </div>
          </div>

          {/* LINKS GRID (Right) */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:col-span-12 lg:col-span-8 lg:grid-cols-4 lg:gap-6">

            <FooterLinkGroup title="Product">
              <ul className="space-y-2.5">
                <FooterLink href="/platform">Platform Overview</FooterLink>
                <FooterLink href="/pricing">Pricing</FooterLink>
                <FooterLink href="/demo">Request Demo</FooterLink>
                <FooterLink href="/product-tour">Product Tour</FooterLink>
                <FooterLink href="/integrations">Integrations</FooterLink>
              </ul>
            </FooterLinkGroup>

            <FooterLinkGroup title="Solutions">
              <ul className="space-y-2.5">
                <FooterLink href="/solutions">All Solutions</FooterLink>
                <FooterLink href="/use-cases">Use Cases</FooterLink>
                <FooterLink href="/role/ceo">For CEOs</FooterLink>
                <FooterLink href="/role/finance">For Finance</FooterLink>
                <FooterLink href="/role/hr">For HR</FooterLink>
              </ul>
            </FooterLinkGroup>

            <FooterLinkGroup title="Resources">
              <ul className="space-y-2.5">
                <FooterLink href="/docs">Documentation</FooterLink>
                <FooterLink href="/blog">Blog</FooterLink>
                <FooterLink href="/glossary">Glossary</FooterLink>
                <FooterLink href="/roadmap">Roadmap</FooterLink>
                <FooterLink href="/status" icon={Signal}>System Status</FooterLink>
              </ul>
            </FooterLinkGroup>

            <FooterLinkGroup title="Company">
              <ul className="space-y-2.5">
                <FooterLink href="/about">About Us</FooterLink>
                <FooterLink href="/careers">Careers</FooterLink>
                <FooterLink href="/customers">Customers</FooterLink>
                <FooterLink href="/contact">Contact</FooterLink>
                <FooterLink href="/media-kit">Media Kit</FooterLink>
              </ul>
            </FooterLinkGroup>

          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="space-y-6 border-t border-slate-800/50 pt-10">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <p className="text-center text-sm text-slate-500 md:text-left">
              ©
              {' '}
              {new Date().getFullYear()}
              {' '}
              PT Divistant Teknologi Indonesia. All rights reserved.
            </p>

            {/* Theme toggle removed - will be added to navbar instead */}
          </div>

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
