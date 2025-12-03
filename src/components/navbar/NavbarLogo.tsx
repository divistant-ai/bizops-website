// React not needed 'react';
import Link from 'next/link';
import React from 'react';

const NavbarLogo: React.FC = () => {
  return (
    <div className="flex flex-shrink-0 items-center">
      <Link 
        href="/" 
        className="group flex items-center gap-2.5 transition-all duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-lg" 
        aria-label="BizOps Homepage"
      >
        <div className="bg-gradient-to-br from-primary-600 to-primary-700 flex h-10 w-10 items-center justify-center rounded-lg shadow-sm transition-all duration-200 group-hover:shadow-md group-hover:scale-105 group-active:scale-95">
          <div className="h-4 w-4 rotate-45 transform rounded-sm bg-white"></div>
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-900 transition-colors dark:text-white sm:text-lg">
          BizOps
        </span>
      </Link>
    </div>
  );
};

export default NavbarLogo;
