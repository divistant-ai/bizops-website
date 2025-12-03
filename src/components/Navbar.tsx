'use client';

import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { DemoModal } from './ui/ClientLazyComponents';
import NavbarDesktop from './navbar/NavbarDesktop';
import NavbarLogo from './navbar/NavbarLogo';
import NavbarMobile from './navbar/NavbarMobile';

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
      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />

      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: '-100%' },
        }}
        animate={isVisible ? 'visible' : 'hidden'}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'border-b border-neutral-200/50 bg-white/90 shadow-sm backdrop-blur-xl dark:border-white/5 dark:bg-slate-950/90'
            : 'border-b border-transparent bg-white/80 backdrop-blur-md dark:bg-slate-950/80'
        }`}
      >
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <NavbarLogo />
            <NavbarDesktop onDemoClick={openDemo} />
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
