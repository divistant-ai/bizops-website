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
      <div className="flex items-center gap-4 lg:hidden">
        <NotificationCenter />
        <Link href="/search" className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200" aria-label="Search">
          <Search className="h-6 w-6" />
        </Link>
        <button
          onClick={onToggle}
          className="p-2 text-slate-500 hover:text-slate-700 focus:outline-none dark:text-slate-400 dark:hover:text-slate-200"
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
