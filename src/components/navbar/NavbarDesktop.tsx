import { ChevronDown, Search } from 'lucide-react';
// React not needed 'react';
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
        <div className="group flex h-full items-center">
          <Link href="/platform" className="group-hover:text-primary-600 dark:group-hover:text-primary-400 flex h-full items-center gap-1 px-1 py-2 text-sm font-medium text-slate-600 transition-colors dark:text-slate-300">
            Platform
            {' '}
            <ChevronDown className="h-3 w-3 opacity-50 transition-opacity group-hover:opacity-100" />
          </Link>
          <MegaMenu type="platform" />
        </div>

        {/* MENU 2: SOLUTIONS */}
        <div className="group flex h-full items-center">
          <Link href="/solutions" className="group-hover:text-primary-600 dark:group-hover:text-primary-400 flex h-full items-center gap-1 px-1 py-2 text-sm font-medium text-slate-600 transition-colors dark:text-slate-300">
            Solutions
            {' '}
            <ChevronDown className="h-3 w-3 opacity-50 transition-opacity group-hover:opacity-100" />
          </Link>
          <MegaMenu type="solutions" />
        </div>

        {/* MENU 3: SERVICES */}
        <div className="group relative flex h-full items-center">
          <Link href="/services" className="group-hover:text-primary-600 dark:group-hover:text-primary-400 flex items-center gap-1 px-1 py-2 text-sm font-medium text-slate-600 transition-colors dark:text-slate-300">
            Services
            {' '}
            <ChevronDown className="h-3 w-3 opacity-50 transition-opacity group-hover:opacity-100" />
          </Link>
          <div className="invisible absolute top-full left-0 z-50 mt-0 w-80 origin-top-left translate-y-2 transform rounded-xl border border-slate-100 bg-white p-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 dark:border-slate-800 dark:bg-slate-900">
            {servicesItems.map(item => (
              <Link
                key={item.to}
                href={item.to}
                className="hover:text-primary-600 dark:hover:text-primary-400 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-700 transition-all hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <item.icon className="h-4 w-4 flex-shrink-0 text-slate-400" />
                {' '}
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <Link href="/pricing" className="hover:text-primary-600 dark:hover:text-primary-400 px-1 py-2 text-sm font-medium text-slate-600 transition-colors dark:text-slate-300">
          Pricing
        </Link>

        {/* MENU 4: RESOURCES */}
        <div className="group flex h-full items-center">
          <button className="group-hover:text-primary-600 dark:group-hover:text-primary-400 flex h-full items-center gap-1 px-1 py-2 text-sm font-medium text-slate-600 transition-colors focus:outline-none dark:text-slate-300">
            Resources
            {' '}
            <ChevronDown className="h-3 w-3 opacity-50 transition-opacity group-hover:opacity-100" />
          </button>
          <MegaMenu type="resources" />
        </div>

        {/* MENU 5: COMPANY */}
        <div className="group flex h-full items-center">
          <button className="group-hover:text-primary-600 dark:group-hover:text-primary-400 flex h-full items-center gap-1 px-1 py-2 text-sm font-medium text-slate-600 transition-colors focus:outline-none dark:text-slate-300">
            Company
            {' '}
            <ChevronDown className="h-3 w-3 opacity-50 transition-opacity group-hover:opacity-100" />
          </button>
          <MegaMenu type="company" />
        </div>
      </nav>

      <div className="ml-4 hidden items-center gap-4 lg:flex">
        <NotificationCenter />
        <Link href="/search" className="hover:text-primary-600 dark:hover:text-primary-400 p-2 text-slate-400 transition-colors" aria-label="Search">
          <Search className="h-5 w-5" />
        </Link>
        <Link href="/login" className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
          Login
        </Link>
        <Button size="sm" className="shadow-primary-100 shadow-md dark:shadow-none" onClick={onDemoClick}>
          Book a Demo
        </Button>
      </div>
    </>
  );
};

export default NavbarDesktop;
