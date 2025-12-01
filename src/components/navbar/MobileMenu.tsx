'use client';

import { ChevronDown, Download, MousePointer, Phone } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { usePathname } from '@/libs/I18nNavigation';
import { companyContent, platformContent, resourcesContent, servicesItems, solutionsContent } from '../../data/navData';
import Button from '../ui/Button';

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  onDemoClick: () => void;
};

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, onDemoClick }) => {
  const [mobilePlatformOpen, setMobilePlatformOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false);

  const location = usePathname();

  useEffect(() => {
    // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
    setMobilePlatformOpen(false);
    // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
    setMobileSolutionsOpen(false);
    // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
    setMobileServicesOpen(false);
    // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
    setMobileResourcesOpen(false);
    // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
    setMobileCompanyOpen(false);
  }, [location]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="animate-fade-in-up fixed top-20 left-0 z-40 h-[calc(100vh-80px)] w-full overflow-y-auto overscroll-contain border-t border-slate-100 bg-white lg:hidden dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col space-y-2 p-4 pb-20">
        {/* Mobile Platform Accordion */}
        <div>
          <button
            onClick={() => setMobilePlatformOpen(!mobilePlatformOpen)}
            className="flex w-full items-center justify-between border-b border-slate-50 py-3 text-base font-medium text-slate-700 dark:border-slate-800 dark:text-slate-200"
            aria-expanded={mobilePlatformOpen}
          >
            Platform
            <ChevronDown className={`h-4 w-4 transition-transform ${mobilePlatformOpen ? 'rotate-180' : ''}`} />
          </button>
          {mobilePlatformOpen && (
            <div className="mb-2 space-y-2 rounded-lg bg-slate-50/50 py-2 pl-4 dark:bg-slate-800/50">
              <div className="py-2 text-xs font-bold tracking-wider text-slate-400 uppercase">Core Modules</div>
              {platformContent.modules?.items.map(item => (
                <Link key={item.to} href={item.to} onClick={onClose} className="block py-2 text-sm text-slate-600 dark:text-slate-300">
                  {item.label}
                </Link>
              ))}

              <div className="my-2 border-t border-slate-200 dark:border-slate-700"></div>
              <div className="py-2 text-xs font-bold tracking-wider text-slate-400 uppercase">Capabilities</div>
              {platformContent.capabilities?.items.map(item => (
                <Link key={item.to} href={item.to} onClick={onClose} className="block py-2 text-sm text-slate-600 dark:text-slate-300">
                  {item.label}
                </Link>
              ))}

              <div className="my-2 border-t border-slate-200 dark:border-slate-700"></div>
              <div className="py-2 text-xs font-bold tracking-wider text-slate-400 uppercase">Technology</div>
              {platformContent.technology?.items.map(item => (
                <Link key={item.to} href={item.to} onClick={onClose} className="block py-2 text-sm text-slate-600 dark:text-slate-300">
                  {item.label}
                </Link>
              ))}

              <div className="my-2 border-t border-slate-200 dark:border-slate-700"></div>
              <div className="space-y-2 pt-2">
                <Link href="/tour" onClick={onClose} className="text-primary-600 dark:text-primary-400 flex items-center gap-2 py-2 text-sm font-semibold">
                  <span className="bg-primary-50 dark:bg-primary-900/20 flex h-6 w-6 items-center justify-center rounded"><MousePointer className="h-3.5 w-3.5" /></span>
                  {' '}
                  Interactive Tour
                </Link>
                <Link href="/download" onClick={onClose} className="flex items-center gap-2 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
                  <span className="flex h-6 w-6 items-center justify-center rounded bg-slate-100 dark:bg-slate-800"><Download className="h-3.5 w-3.5" /></span>
                  {' '}
                  Download Apps
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Solutions Accordion */}
        <div>
          <button
            onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
            className="flex w-full items-center justify-between border-b border-slate-50 py-3 text-base font-medium text-slate-700 dark:border-slate-800 dark:text-slate-200"
            aria-expanded={mobileSolutionsOpen}
          >
            Solutions
            <ChevronDown className={`h-4 w-4 transition-transform ${mobileSolutionsOpen ? 'rotate-180' : ''}`} />
          </button>
          {mobileSolutionsOpen && (
            <div className="mb-2 space-y-2 rounded-lg bg-slate-50/50 py-2 pl-4 dark:bg-slate-800/50">
              <div className="py-2 text-xs font-bold tracking-wider text-slate-400 uppercase">By Industry</div>
              {solutionsContent.industry?.items.map(item => (
                <Link key={item.to} href={item.to} onClick={onClose} className="block py-2 text-sm text-slate-600 dark:text-slate-300">
                  {item.label}
                </Link>
              ))}

              <div className="my-2 border-t border-slate-200 dark:border-slate-700"></div>
              <div className="py-2 text-xs font-bold tracking-wider text-slate-400 uppercase">By Role</div>
              {solutionsContent.role?.items.map(item => (
                <Link key={item.to} href={item.to} onClick={onClose} className="block py-2 text-sm text-slate-600 dark:text-slate-300">
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Mobile Services Accordion */}
        <div>
          <button
            onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
            className="flex w-full items-center justify-between border-b border-slate-50 py-3 text-base font-medium text-slate-700 dark:border-slate-800 dark:text-slate-200"
            aria-expanded={mobileServicesOpen}
          >
            Services
            <ChevronDown className={`h-4 w-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
          </button>
          {mobileServicesOpen && (
            <div className="mb-2 space-y-2 rounded-lg bg-slate-50/50 py-2 pl-4 dark:bg-slate-800/50">
              {servicesItems.map(item => (
                <Link key={item.to} href={item.to} onClick={onClose} className="block py-2 text-sm text-slate-600 dark:text-slate-300">
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link href="/pricing" onClick={onClose} className="block border-b border-slate-50 py-3 text-base font-medium text-slate-700 dark:border-slate-800 dark:text-slate-200">
          Pricing
        </Link>

        {/* Mobile Resources Accordion */}
        <div>
          <button
            onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
            className="flex w-full items-center justify-between border-b border-slate-50 py-3 text-base font-medium text-slate-700 dark:border-slate-800 dark:text-slate-200"
            aria-expanded={mobileResourcesOpen}
          >
            Resources
            <ChevronDown className={`h-4 w-4 transition-transform ${mobileResourcesOpen ? 'rotate-180' : ''}`} />
          </button>
          {mobileResourcesOpen && (
            <div className="mb-2 space-y-2 rounded-lg bg-slate-50/50 py-2 pl-4 dark:bg-slate-800/50">
              <div className="py-2 text-xs font-bold tracking-wider text-slate-400 uppercase">Insights & News</div>
              {resourcesContent.insights?.items.map(item => (
                <Link key={item.to} href={item.to} onClick={onClose} className="block py-2 text-sm text-slate-600 dark:text-slate-300">
                  {item.label}
                </Link>
              ))}

              <div className="my-2 border-t border-slate-200 dark:border-slate-700"></div>
              <div className="py-2 text-xs font-bold tracking-wider text-slate-400 uppercase">Tools & Utilities</div>
              {resourcesContent.tools?.items.map(item => (
                <Link key={item.to} href={item.to} onClick={onClose} className="block py-2 text-sm text-slate-600 dark:text-slate-300">
                  {item.label}
                </Link>
              ))}

              <div className="my-2 border-t border-slate-200 dark:border-slate-700"></div>
              <div className="py-2 text-xs font-bold tracking-wider text-slate-400 uppercase">Support Center</div>
              {resourcesContent.support?.items.map(item => (
                <Link key={item.to} href={item.to} onClick={onClose} className="block py-2 text-sm text-slate-600 dark:text-slate-300">
                  {item.label}
                </Link>
              ))}

              <div className="my-2 border-t border-slate-200 dark:border-slate-700"></div>
              <Link href="/resources" onClick={onClose} className="text-primary-600 dark:text-primary-400 flex items-center gap-2 py-2 text-sm font-semibold">
                View All Resources
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Company Accordion */}
        <div>
          <button
            onClick={() => setMobileCompanyOpen(!mobileCompanyOpen)}
            className="flex w-full items-center justify-between border-b border-slate-50 py-3 text-base font-medium text-slate-700 dark:border-slate-800 dark:text-slate-200"
            aria-expanded={mobileCompanyOpen}
          >
            Company
            <ChevronDown className={`h-4 w-4 transition-transform ${mobileCompanyOpen ? 'rotate-180' : ''}`} />
          </button>
          {mobileCompanyOpen && (
            <div className="mb-2 space-y-2 rounded-lg bg-slate-50/50 py-2 pl-4 dark:bg-slate-800/50">
              <div className="py-2 text-xs font-bold tracking-wider text-slate-400 uppercase">Our Story</div>
              {companyContent.story?.items.map(item => (
                <Link key={item.to} href={item.to} onClick={onClose} className="block py-2 text-sm text-slate-600 dark:text-slate-300">
                  {item.label}
                </Link>
              ))}

              <div className="my-2 border-t border-slate-200 dark:border-slate-700"></div>
              <div className="py-2 text-xs font-bold tracking-wider text-slate-400 uppercase">Ecosystem</div>
              {companyContent.ecosystem?.items.map(item => (
                <Link key={item.to} href={item.to} onClick={onClose} className="block py-2 text-sm text-slate-600 dark:text-slate-300">
                  {item.label}
                </Link>
              ))}

              <div className="my-2 border-t border-slate-200 dark:border-slate-700"></div>
              <Link href="/contact" onClick={onClose} className="flex items-center gap-2 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                <span className="flex h-6 w-6 items-center justify-center rounded bg-slate-100 dark:bg-slate-800"><Phone className="h-3.5 w-3.5" /></span>
                {' '}
                Contact Us
              </Link>
            </div>
          )}
        </div>

        <Link href="/login" onClick={onClose} className="mt-2 block border-t border-slate-100 py-3 text-base font-medium text-slate-700 dark:border-slate-800 dark:text-slate-200">
          Login
        </Link>
        <div className="block pt-2">
          <Button fullWidth onClick={onDemoClick}>Book a Demo</Button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
