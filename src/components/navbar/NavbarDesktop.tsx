import { ChevronDown, Search } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { servicesItems } from '../../data/navData';
import NotificationCenter from '../NotificationCenter';
import Button from '../ui/Button';
import MegaMenu from './MegaMenu';

type NavbarDesktopProps = {
  onDemoClick: () => void;
};

const NavbarDesktop: React.FC<NavbarDesktopProps> = ({ onDemoClick }) => {
  return (
    <>
      <nav className="hidden h-full items-center space-x-6 lg:flex" aria-label="Main Navigation">
        {/* MENU 1: PLATFORM */}
        <div className="group relative flex h-full items-center">
          <Link href="/platform" className="flex h-10 items-center gap-1.5 rounded-full px-4 text-sm font-medium text-slate-700 transition-all hover:bg-slate-100 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white">
            Platform
            <ChevronDown className="h-3.5 w-3.5 opacity-50 transition-transform duration-300 group-hover:rotate-180" />
          </Link>
          <MegaMenu type="platform" />
        </div>

        {/* MENU 2: SOLUTIONS */}
        <div className="group relative flex h-full items-center">
          <Link href="/solutions" className="flex h-10 items-center gap-1.5 rounded-full px-4 text-sm font-medium text-slate-700 transition-all hover:bg-slate-100 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white">
            Solutions
            <ChevronDown className="h-3.5 w-3.5 opacity-50 transition-transform duration-300 group-hover:rotate-180" />
          </Link>
          <MegaMenu type="solutions" />
        </div>

        {/* MENU 3: SERVICES */}
        <div className="group relative flex h-full items-center">
          <Link href="/services" className="flex h-10 items-center gap-1.5 rounded-full px-4 text-sm font-medium text-slate-700 transition-all hover:bg-slate-100 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white">
            Services
            <ChevronDown className="h-3.5 w-3.5 opacity-50 transition-transform duration-300 group-hover:rotate-180" />
          </Link>
          <div className="invisible absolute top-full left-0 z-50 mt-2 w-80 origin-top-left translate-y-2 transform rounded-2xl border border-slate-200/60 bg-white/90 p-2 opacity-0 shadow-xl backdrop-blur-xl transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 dark:border-white/10 dark:bg-slate-900/90">
            {servicesItems.map(item => (
              <Link
                key={item.to}
                href={item.to}
                className="hover:text-primary-600 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white"
              >
                <item.icon className="h-4 w-4 flex-shrink-0 opacity-70" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <Link href="/pricing" className="flex h-10 items-center rounded-full px-4 text-sm font-medium text-slate-700 transition-all hover:bg-slate-100 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white">
          Pricing
        </Link>

        {/* MENU 4: RESOURCES */}
        <div className="group relative flex h-full items-center">
          <Link href="/resources" className="flex h-10 items-center gap-1.5 rounded-full px-4 text-sm font-medium text-slate-700 transition-all hover:bg-slate-100 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white">
            Resources
            <ChevronDown className="h-3.5 w-3.5 opacity-50 transition-transform duration-300 group-hover:rotate-180" />
          </Link>
          <MegaMenu type="resources" />
        </div>

        {/* MENU 5: COMPANY */}
        <div className="group relative flex h-full items-center">
          <Link href="/about" className="flex h-10 items-center gap-1.5 rounded-full px-4 text-sm font-medium text-slate-700 transition-all hover:bg-slate-100 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white">
            Company
            <ChevronDown className="h-3.5 w-3.5 opacity-50 transition-transform duration-300 group-hover:rotate-180" />
          </Link>
          <MegaMenu type="company" />
        </div>
      </nav>

      <div className="ml-4 hidden items-center gap-3 lg:flex">
        <NotificationCenter />
        <Link href="/search" className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition-all hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white" aria-label="Search">
          <Search className="h-5 w-5" />
        </Link>
        <Link href="/login" className="text-sm font-medium text-slate-700 transition-colors hover:text-slate-900 dark:text-slate-200 dark:hover:text-white">
          Login
        </Link>
        <Button size="sm" className="shadow-primary-500/20 hover:shadow-primary-500/40 shadow-lg transition-all duration-300 hover:-translate-y-0.5 dark:shadow-none" onClick={onDemoClick}>
          Book a Demo
        </Button>
      </div>
    </>
  );
};

export default NavbarDesktop;
