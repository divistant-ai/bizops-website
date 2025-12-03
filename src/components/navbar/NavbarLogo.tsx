// React not needed 'react';
import Link from 'next/link';
import React from 'react';

const NavbarLogo: React.FC = () => {
  return (
    <div className="flex flex-shrink-0 items-center">
      <Link
        href="/"
        className="group focus-visible:ring-primary-500 flex items-center gap-2.5 rounded-lg transition-all duration-200 hover:opacity-90 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        aria-label="BizOps Homepage"
      >
        <div className="from-primary-600 to-primary-700 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br shadow-sm transition-all duration-200 group-hover:scale-105 group-hover:shadow-md group-active:scale-95">
          <div className="h-4 w-4 rotate-45 transform rounded-sm bg-white"></div>
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-900 transition-colors sm:text-lg dark:text-white">
          BizOps
        </span>
      </Link>
    </div>
  );
};

export default NavbarLogo;
