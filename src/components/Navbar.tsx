'use client';

import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import NavbarDesktop from './navbar/NavbarDesktop';
import NavbarLogo from './navbar/NavbarLogo';
import NavbarMobile from './navbar/NavbarMobile';
import { DemoModal } from './ui/ClientLazyComponents';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastY, setLastY] = useState(0);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const { scrollY } = useScroll();
  const pathname = usePathname();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const diff = latest - lastY;
    // Hide header on scroll down, show on scroll up OR if at top
    if (Math.abs(diff) > 20) {
      setIsVisible(diff < 0 || latest < 50);
      setLastY(latest);
    }
    // Styling logic
    setIsScrolled(latest > 20);
  });

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const openDemo = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    setIsDemoModalOpen(true);
    setIsOpen(false);
  };

  const handleMobileClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Skip Navigation Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-primary-600 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      >
        Skip to main content
      </a>
      
      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />

      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: '-100%' },
        }}
        animate={isVisible ? 'visible' : 'hidden'}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'border-b border-neutral-200/50 bg-white/95 backdrop-blur-md shadow-sm dark:border-white/5 dark:bg-slate-950/95'
            : 'border-b border-transparent bg-white dark:bg-slate-950'
        }`}
      >
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-3 sm:gap-4 md:gap-6 lg:h-20 lg:gap-8">
            {/* Logo - Left side */}
            <NavbarLogo />

            {/* Desktop Navigation - Takes remaining space */}
            <NavbarDesktop onDemoClick={openDemo} />

            {/* Mobile Navigation - Right side */}
            <NavbarMobile
              isOpen={isOpen}
              onToggle={() => setIsOpen(!isOpen)}
              onClose={handleMobileClose}
              onDemoClick={openDemo}
            />
          </div>
        </div>
      </motion.header>
    </>
  );
};
