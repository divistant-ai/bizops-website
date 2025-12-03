import { Menu, Search, X } from 'lucide-react';
// React not needed 'react';
import Link from 'next/link';
import React from 'react';
import NotificationCenter from '../NotificationCenter';
import MobileMenu from './MobileMenu';
import { getIconButtonClasses, navbarStyles } from './navbarStyles';

type NavbarMobileProps = {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  onDemoClick: () => void;
};

const NavbarMobile: React.FC<NavbarMobileProps> = ({ isOpen, onToggle, onClose, onDemoClick }) => {
  return (
    <>
      <div className="flex items-center gap-2 sm:gap-3 lg:hidden">
        <NotificationCenter />
        <Link
          href="/search"
          className={getIconButtonClasses(true)}
          aria-label="Search"
        >
          <Search className={navbarStyles.iconSize.medium} />
        </Link>
        <button
          onClick={onToggle}
          className={getIconButtonClasses(true)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className={navbarStyles.iconSize.large} /> : <Menu className={navbarStyles.iconSize.large} />}
        </button>
      </div>

      <MobileMenu isOpen={isOpen} onClose={onClose} onDemoClick={onDemoClick} />
    </>
  );
};

export default NavbarMobile;
