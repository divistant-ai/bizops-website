import { ChevronDown, Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { servicesItems } from '../../data/navData';
import NotificationCenter from '../NotificationCenter';
import Button from '../ui/Button';
import MegaMenu from './MegaMenu';
import { getCTAButtonClasses, getIconButtonClasses, getMenuItemClasses, getTextButtonClasses, navbarStyles } from './navbarStyles';

type NavbarDesktopProps = {
  onDemoClick: () => void;
};

const NavbarDesktop: React.FC<NavbarDesktopProps> = ({ onDemoClick }) => {
  const pathname = usePathname();
  return (
    <div className="hidden flex-1 items-center justify-between gap-4 lg:flex xl:gap-6">
      {/* Navigation Menu */}
      <nav className={navbarStyles.container.nav} aria-label="Main Navigation">
        {/* MENU 1: PLATFORM */}
        <div className="group relative flex h-full items-center">
          <Link 
            href="/platform" 
            className={getMenuItemClasses(pathname?.startsWith('/platform') || false)}
            aria-current={pathname?.startsWith('/platform') ? 'page' : undefined}
          >
            Platform
            <ChevronDown className={`${navbarStyles.iconSize.chevron} opacity-60 transition-transform duration-200 group-hover:rotate-180`} />
          </Link>
          <MegaMenu type="platform" />
        </div>

        {/* MENU 2: SOLUTIONS */}
        <div className="group relative flex h-full items-center">
          <Link 
            href="/solutions" 
            className={getMenuItemClasses(pathname?.startsWith('/solutions') || false)}
            aria-current={pathname?.startsWith('/solutions') ? 'page' : undefined}
          >
            Solutions
            <ChevronDown className={`${navbarStyles.iconSize.chevron} opacity-60 transition-transform duration-200 group-hover:rotate-180`} />
          </Link>
          <MegaMenu type="solutions" />
        </div>

        {/* MENU 3: SERVICES */}
        <div className="group relative flex h-full items-center">
          <Link 
            href="/services" 
            className={getMenuItemClasses(pathname?.startsWith('/services') || false)}
            aria-current={pathname?.startsWith('/services') ? 'page' : undefined}
          >
            Services
            <ChevronDown className={`${navbarStyles.iconSize.chevron} opacity-60 transition-transform duration-200 group-hover:rotate-180`} />
          </Link>
          <div className="invisible absolute top-full left-0 z-50 mt-2 w-72 origin-top-left translate-y-1 transform rounded-xl border border-slate-200/80 bg-white/95 p-2 opacity-0 shadow-xl backdrop-blur-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 dark:border-slate-700/50 dark:bg-slate-900/95">
            {servicesItems.map(item => (
              <Link
                key={item.to}
                href={item.to}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 hover:text-primary-600 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-primary-400"
              >
                <item.icon className="h-4 w-4 flex-shrink-0 opacity-70" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <Link 
          href="/pricing" 
          className={getMenuItemClasses(pathname?.startsWith('/pricing') || false)}
          aria-current={pathname?.startsWith('/pricing') ? 'page' : undefined}
        >
          Pricing
        </Link>

        {/* MENU 4: RESOURCES */}
        <div className="group relative flex h-full items-center">
          <Link 
            href="/resources" 
            className={getMenuItemClasses(pathname?.startsWith('/resources') || false)}
            aria-current={pathname?.startsWith('/resources') ? 'page' : undefined}
          >
            Resources
            <ChevronDown className={`${navbarStyles.iconSize.chevron} opacity-60 transition-transform duration-200 group-hover:rotate-180`} />
          </Link>
          <MegaMenu type="resources" />
        </div>

        {/* MENU 5: COMPANY */}
        <div className="group relative flex h-full items-center">
          <Link 
            href="/about" 
            className={getMenuItemClasses(pathname?.startsWith('/about') || pathname?.startsWith('/company') || pathname?.startsWith('/careers') || pathname?.startsWith('/partners') || false)}
            aria-current={pathname?.startsWith('/about') || pathname?.startsWith('/company') ? 'page' : undefined}
          >
            Company
            <ChevronDown className={`${navbarStyles.iconSize.chevron} opacity-60 transition-transform duration-200 group-hover:rotate-180`} />
          </Link>
          <MegaMenu type="company" />
        </div>
      </nav>

      {/* Visual Separator */}
      <div className={navbarStyles.container.separator} aria-hidden="true" />
      
      {/* Action Buttons */}
      <div className={navbarStyles.container.actions}>
        <NotificationCenter />
        <Link 
          href="/search" 
          className={getIconButtonClasses()} 
          aria-label="Search"
        >
          <Search className={navbarStyles.iconSize.medium} />
        </Link>
        <Link 
          href="/login" 
          className={getTextButtonClasses()}
        >
          Login
        </Link>
        <Button 
          size="sm" 
          className={getCTAButtonClasses()} 
          onClick={onDemoClick}
        >
          Book a Demo
        </Button>
      </div>
    </div>
  );
};

export default NavbarDesktop;
