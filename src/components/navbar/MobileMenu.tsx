'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, MousePointer, X } from 'lucide-react';
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
    setMobilePlatformOpen(false);
    setMobileSolutionsOpen(false);
    setMobileServicesOpen(false);
    setMobileResourcesOpen(false);
    setMobileCompanyOpen(false);
  }, [location]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const AccordionItem = ({
    title,
    isOpen,
    onToggle,
    children,
  }: {
    title: string;
    isOpen: boolean;
    onToggle: () => void;
    children: React.ReactNode;
  }) => (
    <div className="overflow-hidden rounded-xl border border-slate-200/80 shadow-sm dark:border-slate-800/50">
      <button
        onClick={onToggle}
        className="focus-visible:ring-primary-500 flex w-full items-center justify-between bg-slate-50/80 px-5 py-4 text-base font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-100 focus-visible:ring-2 focus-visible:outline-none active:scale-[0.98] dark:bg-slate-900/50 dark:text-white dark:hover:bg-slate-800"
        aria-expanded={isOpen}
      >
        {title}
        <ChevronDown className={`h-4 w-4 transition-all duration-200 ${isOpen ? 'text-primary-600 dark:text-primary-400 rotate-180' : 'text-slate-400'}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden bg-white dark:bg-slate-950"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden"
          />

          {/* Menu Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md overflow-y-auto bg-white shadow-2xl lg:hidden dark:bg-slate-950"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/95">
              <span className="text-lg font-bold text-slate-900 dark:text-white">Menu</span>
              <button
                onClick={onClose}
                className="focus-visible:ring-primary-500 rounded-lg p-2 text-slate-500 transition-all duration-200 hover:scale-105 hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-2 focus-visible:outline-none active:scale-95 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex flex-col space-y-3 p-5 pb-24">
              {/* Platform Accordion */}
              <AccordionItem
                title="Platform"
                isOpen={mobilePlatformOpen}
                onToggle={() => setMobilePlatformOpen(!mobilePlatformOpen)}
              >
                <div className="space-y-6 p-4">
                  {/* Core Modules */}
                  <div>
                    <div className="mb-3 text-xs font-bold tracking-wider text-slate-400 uppercase dark:text-slate-500">
                      Core Modules
                    </div>
                    <div className="space-y-2">
                      {platformContent.modules?.items.map(item => (
                        <Link
                          key={item.to}
                          href={item.to}
                          onClick={onClose}
                          className="hover:text-primary-600 dark:hover:text-primary-400 focus-visible:ring-primary-500 flex items-center gap-3 rounded-lg p-3 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-50 focus-visible:ring-2 focus-visible:outline-none active:scale-[0.98] dark:text-slate-300 dark:hover:bg-slate-800"
                        >
                          <item.icon className="h-5 w-5 text-slate-400" />
                          <div className="flex flex-col">
                            <span>{item.label}</span>
                            {item.desc && (
                              <span className="text-xs text-slate-400 dark:text-slate-500">{item.desc}</span>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Capabilities */}
                  <div>
                    <div className="mb-3 text-xs font-bold tracking-wider text-slate-400 uppercase dark:text-slate-500">
                      Capabilities
                    </div>
                    <div className="space-y-2">
                      {platformContent.capabilities?.items.map(item => (
                        <Link
                          key={item.to}
                          href={item.to}
                          onClick={onClose}
                          className="hover:text-primary-600 dark:hover:text-primary-400 focus-visible:ring-primary-500 flex items-center gap-3 rounded-lg p-3 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-50 focus-visible:ring-2 focus-visible:outline-none active:scale-[0.98] dark:text-slate-300 dark:hover:bg-slate-800"
                        >
                          <item.icon className="h-5 w-5 text-slate-400" />
                          <div className="flex flex-col">
                            <span>{item.label}</span>
                            {item.desc && (
                              <span className="text-xs text-slate-400 dark:text-slate-500">{item.desc}</span>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Technology */}
                  <div>
                    <div className="mb-3 text-xs font-bold tracking-wider text-slate-400 uppercase dark:text-slate-500">
                      Technology
                    </div>
                    <div className="space-y-2">
                      {platformContent.technology?.items.map(item => (
                        <Link
                          key={item.to}
                          href={item.to}
                          onClick={onClose}
                          className="hover:text-primary-600 dark:hover:text-primary-400 focus-visible:ring-primary-500 flex items-center gap-3 rounded-lg p-3 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-50 focus-visible:ring-2 focus-visible:outline-none active:scale-[0.98] dark:text-slate-300 dark:hover:bg-slate-800"
                        >
                          <item.icon className="h-5 w-5 text-slate-400" />
                          <div className="flex flex-col">
                            <span>{item.label}</span>
                            {item.desc && (
                              <span className="text-xs text-slate-400 dark:text-slate-500">{item.desc}</span>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Tour */}
                  <div className="pt-2">
                    <Link
                      href="/product-tour"
                      onClick={onClose}
                      className="bg-primary-50 text-primary-700 hover:bg-primary-100 dark:bg-primary-900/20 dark:text-primary-400 dark:hover:bg-primary-900/30 flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-bold transition-colors"
                    >
                      <MousePointer className="h-4 w-4" />
                      Interactive Tour
                    </Link>
                  </div>
                </div>
              </AccordionItem>

              {/* Solutions Accordion */}
              <AccordionItem
                title="Solutions"
                isOpen={mobileSolutionsOpen}
                onToggle={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
              >
                <div className="space-y-6 p-4">
                  {/* By Industry */}
                  <div>
                    <div className="mb-3 text-xs font-bold tracking-wider text-slate-400 uppercase dark:text-slate-500">
                      By Industry
                    </div>
                    <div className="space-y-2">
                      {solutionsContent.industry?.items.map(item => (
                        <Link
                          key={item.to}
                          href={item.to}
                          onClick={onClose}
                          className="hover:text-primary-600 dark:hover:text-primary-400 focus-visible:ring-primary-500 flex items-center gap-3 rounded-lg p-3 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-50 focus-visible:ring-2 focus-visible:outline-none active:scale-[0.98] dark:text-slate-300 dark:hover:bg-slate-800"
                        >
                          <item.icon className="h-5 w-5 text-slate-400" />
                          <div className="flex flex-col">
                            <span>{item.label}</span>
                            {item.desc && (
                              <span className="text-xs text-slate-400 dark:text-slate-500">{item.desc}</span>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* By Role */}
                  <div>
                    <div className="mb-3 text-xs font-bold tracking-wider text-slate-400 uppercase dark:text-slate-500">
                      By Role
                    </div>
                    <div className="space-y-2">
                      {solutionsContent.role?.items.map(item => (
                        <Link
                          key={item.to}
                          href={item.to}
                          onClick={onClose}
                          className="hover:text-primary-600 dark:hover:text-primary-400 focus-visible:ring-primary-500 flex items-center gap-3 rounded-lg p-3 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-50 focus-visible:ring-2 focus-visible:outline-none active:scale-[0.98] dark:text-slate-300 dark:hover:bg-slate-800"
                        >
                          <item.icon className="h-5 w-5 text-slate-400" />
                          <div className="flex flex-col">
                            <span>{item.label}</span>
                            {item.desc && (
                              <span className="text-xs text-slate-400 dark:text-slate-500">{item.desc}</span>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </AccordionItem>

              {/* Services Accordion */}
              <AccordionItem
                title="Services"
                isOpen={mobileServicesOpen}
                onToggle={() => setMobileServicesOpen(!mobileServicesOpen)}
              >
                <div className="p-4">
                  <div className="space-y-2">
                    {servicesItems.map(item => (
                      <Link
                        key={item.to}
                        href={item.to}
                        onClick={onClose}
                        className="hover:text-primary-600 dark:hover:text-primary-400 flex items-center gap-3 rounded-lg p-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                      >
                        <item.icon className="h-4 w-4 text-slate-400" />
                        <div className="flex flex-col">
                          <span>{item.label}</span>
                          {item.desc && (
                            <span className="text-xs text-slate-400 dark:text-slate-500">{item.desc}</span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </AccordionItem>

              {/* Resources Accordion */}
              <AccordionItem
                title="Resources"
                isOpen={mobileResourcesOpen}
                onToggle={() => setMobileResourcesOpen(!mobileResourcesOpen)}
              >
                <div className="space-y-6 p-4">
                  {/* Insights & News */}
                  <div>
                    <div className="mb-3 text-xs font-bold tracking-wider text-slate-400 uppercase dark:text-slate-500">
                      Insights & News
                    </div>
                    <div className="space-y-2">
                      {resourcesContent.insights?.items.map(item => (
                        <Link
                          key={item.to}
                          href={item.to}
                          onClick={onClose}
                          className="hover:text-primary-600 dark:hover:text-primary-400 focus-visible:ring-primary-500 flex items-center gap-3 rounded-lg p-3 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-50 focus-visible:ring-2 focus-visible:outline-none active:scale-[0.98] dark:text-slate-300 dark:hover:bg-slate-800"
                        >
                          <item.icon className="h-5 w-5 text-slate-400" />
                          <div className="flex flex-col">
                            <span>{item.label}</span>
                            {item.desc && (
                              <span className="text-xs text-slate-400 dark:text-slate-500">{item.desc}</span>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Customer Tools */}
                  <div>
                    <div className="mb-3 text-xs font-bold tracking-wider text-slate-400 uppercase dark:text-slate-500">
                      Customer Tools
                    </div>
                    <div className="space-y-2">
                      {resourcesContent['customer-tools']?.items.slice(0, 5).map(item => (
                        <Link
                          key={item.to}
                          href={item.to}
                          onClick={onClose}
                          className="hover:text-primary-600 dark:hover:text-primary-400 focus-visible:ring-primary-500 flex items-center gap-3 rounded-lg p-3 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-50 focus-visible:ring-2 focus-visible:outline-none active:scale-[0.98] dark:text-slate-300 dark:hover:bg-slate-800"
                        >
                          <item.icon className="h-5 w-5 text-slate-400" />
                          <div className="flex flex-col">
                            <span>{item.label}</span>
                            {item.desc && (
                              <span className="text-xs text-slate-400 dark:text-slate-500">{item.desc}</span>
                            )}
                          </div>
                        </Link>
                      ))}
                      <Link
                        href="/tools"
                        onClick={onClose}
                        className="text-primary-600 hover:bg-primary-50 dark:text-primary-400 dark:hover:bg-primary-900/20 flex items-center gap-3 rounded-lg p-2 text-sm font-medium transition-colors"
                      >
                        View All Tools →
                      </Link>
                    </div>
                  </div>

                  {/* Strategic Tools */}
                  <div>
                    <div className="mb-3 text-xs font-bold tracking-wider text-slate-400 uppercase dark:text-slate-500">
                      Strategic Tools
                    </div>
                    <div className="space-y-2">
                      {resourcesContent['strategic-tools']?.items.slice(0, 4).map(item => (
                        <Link
                          key={item.to}
                          href={item.to}
                          onClick={onClose}
                          className="hover:text-primary-600 dark:hover:text-primary-400 focus-visible:ring-primary-500 flex items-center gap-3 rounded-lg p-3 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-50 focus-visible:ring-2 focus-visible:outline-none active:scale-[0.98] dark:text-slate-300 dark:hover:bg-slate-800"
                        >
                          <item.icon className="h-5 w-5 text-slate-400" />
                          <div className="flex flex-col">
                            <span>{item.label}</span>
                            {item.desc && (
                              <span className="text-xs text-slate-400 dark:text-slate-500">{item.desc}</span>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Support */}
                  <div>
                    <div className="mb-3 text-xs font-bold tracking-wider text-slate-400 uppercase dark:text-slate-500">
                      Support
                    </div>
                    <div className="space-y-2">
                      {resourcesContent.support?.items.map(item => (
                        <Link
                          key={item.to}
                          href={item.to}
                          onClick={onClose}
                          className="hover:text-primary-600 dark:hover:text-primary-400 focus-visible:ring-primary-500 flex items-center gap-3 rounded-lg p-3 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-50 focus-visible:ring-2 focus-visible:outline-none active:scale-[0.98] dark:text-slate-300 dark:hover:bg-slate-800"
                        >
                          <item.icon className="h-5 w-5 text-slate-400" />
                          <div className="flex flex-col">
                            <span>{item.label}</span>
                            {item.desc && (
                              <span className="text-xs text-slate-400 dark:text-slate-500">{item.desc}</span>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </AccordionItem>

              {/* Company Accordion */}
              <AccordionItem
                title="Company"
                isOpen={mobileCompanyOpen}
                onToggle={() => setMobileCompanyOpen(!mobileCompanyOpen)}
              >
                <div className="space-y-6 p-4">
                  {/* Our Story */}
                  <div>
                    <div className="mb-3 text-xs font-bold tracking-wider text-slate-400 uppercase dark:text-slate-500">
                      Our Story
                    </div>
                    <div className="space-y-2">
                      {companyContent.story?.items.map(item => (
                        <Link
                          key={item.to}
                          href={item.to}
                          onClick={onClose}
                          className="hover:text-primary-600 dark:hover:text-primary-400 focus-visible:ring-primary-500 flex items-center gap-3 rounded-lg p-3 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-50 focus-visible:ring-2 focus-visible:outline-none active:scale-[0.98] dark:text-slate-300 dark:hover:bg-slate-800"
                        >
                          <item.icon className="h-5 w-5 text-slate-400" />
                          <div className="flex flex-col">
                            <span>{item.label}</span>
                            {item.desc && (
                              <span className="text-xs text-slate-400 dark:text-slate-500">{item.desc}</span>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Ecosystem */}
                  <div>
                    <div className="mb-3 text-xs font-bold tracking-wider text-slate-400 uppercase dark:text-slate-500">
                      Ecosystem
                    </div>
                    <div className="space-y-2">
                      {companyContent.ecosystem?.items.map(item => (
                        <Link
                          key={item.to}
                          href={item.to}
                          onClick={onClose}
                          className="hover:text-primary-600 dark:hover:text-primary-400 focus-visible:ring-primary-500 flex items-center gap-3 rounded-lg p-3 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-50 focus-visible:ring-2 focus-visible:outline-none active:scale-[0.98] dark:text-slate-300 dark:hover:bg-slate-800"
                        >
                          <item.icon className="h-5 w-5 text-slate-400" />
                          <div className="flex flex-col">
                            <span>{item.label}</span>
                            {item.desc && (
                              <span className="text-xs text-slate-400 dark:text-slate-500">{item.desc}</span>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </AccordionItem>

              {/* Direct Links */}
              <Link
                href="/pricing"
                onClick={onClose}
                className="focus-visible:ring-primary-500 flex w-full items-center justify-between rounded-xl border border-slate-200/80 bg-slate-50/80 px-5 py-4 text-base font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-100 focus-visible:ring-2 focus-visible:outline-none active:scale-[0.98] dark:border-slate-800/50 dark:bg-slate-900/50 dark:text-white dark:hover:bg-slate-800"
              >
                Pricing
              </Link>

              {/* Mobile Login & CTA */}
              <div className="mt-6 space-y-3 border-t border-slate-200 pt-6 dark:border-slate-800">
                <Link
                  href="/login"
                  onClick={onClose}
                  className="focus-visible:ring-primary-500 flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white py-3.5 text-sm font-bold text-slate-700 shadow-sm transition-all duration-200 hover:scale-[1.02] hover:bg-slate-50 focus-visible:ring-2 focus-visible:outline-none active:scale-[0.98] dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
                >
                  Login
                </Link>
                <Button
                  fullWidth
                  size="lg"
                  onClick={onDemoClick}
                  className="rounded-xl shadow-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
                >
                  Book a Demo
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
