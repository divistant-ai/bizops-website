// React not needed 'react';
import Link from 'next/link';
import React from 'react';

const NavbarLogo: React.FC = () => {
  return (
    <div className="flex flex-shrink-0 items-center">
      <Link href="/" className="flex items-center gap-2" aria-label="BizOps Homepage">
        <div className="bg-primary-600 flex h-8 w-8 items-center justify-center rounded-lg">
          <div className="h-4 w-4 rotate-45 transform rounded-sm bg-white"></div>
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
          BizOps
        </span>
      </Link>
    </div>
  );
};

export default NavbarLogo;
