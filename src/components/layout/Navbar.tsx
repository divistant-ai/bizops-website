'use client';

import { Menu, Search, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import { useIsScrolled } from '@/hooks';
import { cn } from '@/libs/utils/cn';

const Navbar: React.FC = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const isScrolled = useIsScrolled(20);

  const navLinks = [
    { href: '/platform', label: 'Platform' },
    { href: '/solutions', label: 'Solutions' },
    { href: '/services', label: 'Services' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/resources', label: 'Resources' },
    { href: '/about', label: 'Company' },
  ];

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-sm border-b border-slate-100 dark:border-slate-800'
          : 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-transparent',
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" aria-label="BizOps Homepage">
            <div className="bg-primary-600 flex h-8 w-8 items-center justify-center rounded-lg">
              <div className="h-4 w-4 rotate-45 transform rounded-sm bg-white"></div>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              BizOps
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-6 lg:flex">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400',
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden items-center gap-4 lg:flex">
            <Link
              href="/search"
              className="hover:text-primary-600 dark:hover:text-primary-400 p-2 text-slate-400 transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Link>
            <Button asChild variant="outline" size="sm">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild variant="primary" size="sm">
              <Link href="/demo">Demo</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="p-2 text-slate-600 lg:hidden dark:text-slate-300"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileOpen && (
          <div className="border-t border-slate-200 py-4 lg:hidden dark:border-slate-800">
            <div className="flex flex-col space-y-4">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    'text-base font-medium transition-colors',
                    pathname === link.href
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-slate-600 dark:text-slate-300',
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="space-y-2 pt-4">
                <Button asChild variant="outline" fullWidth>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild variant="primary" fullWidth>
                  <Link href="/demo">Demo</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
