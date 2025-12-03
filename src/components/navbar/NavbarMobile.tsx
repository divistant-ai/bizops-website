import { Menu, Search, X } from 'lucide-react';
// React not needed 'react';
import Link from 'next/link';
import React from 'react';
import NotificationCenter from '../NotificationCenter';
import MobileMenu from './MobileMenu';

type NavbarMobileProps = {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  onDemoClick: () => void;
};

const NavbarMobile: React.FC<NavbarMobileProps> = ({ isOpen, onToggle, onClose, onDemoClick }) => {
  return (
    <>
      <div className="flex items-center gap-2 lg:hidden">
        <NotificationCenter />
        <Link href="/search" className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition-all hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white" aria-label="Search">
          <Search className="h-5 w-5" />
        </Link>
        <button
          onClick={onToggle}
          className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition-all hover:bg-slate-100 hover:text-slate-900 focus:outline-none dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
          aria-label="Toggle Menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <MobileMenu isOpen={isOpen} onClose={onClose} onDemoClick={onDemoClick} />
    </>
  );
};

export default NavbarMobile;
