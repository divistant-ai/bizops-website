'use client';

import { ChevronRight, Home } from 'lucide-react';

// React not needed 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type BreadcrumbProps = {
  items?: { label: string; path: string }[];
  className?: string;
};

const Breadcrumbs: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
  const pathname = usePathname();

  // Default generation if no items provided
  const pathnames = pathname.split('/').filter(x => x);
  const defaultItems = items || pathnames.map((value, index) => {
    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
    return {
      label: value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, ' '),
      path: to,
    };
  });

  // Schema.org JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://bizops.id/',
      },
      ...defaultItems.map((item, index) => ({
        '@type': 'ListItem',
        'position': index + 2,
        'name': item.label,
        'item': `https://bizops.id${item.path}`,
      })),
    ],
  };

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
      <nav aria-label="Breadcrumb" className={`animate-fade-in-up mb-6 flex text-sm text-slate-500 ${className}`}>
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="hover:text-primary-600 focus:ring-primary-500 flex items-center rounded p-1 focus:ring-2 focus:outline-none">
              <Home className="h-4 w-4" />
              <span className="sr-only">Home</span>
            </Link>
          </li>
          {defaultItems.map((item, index) => (
            <li key={item.path} className="flex items-center">
              <ChevronRight className="mx-1 h-4 w-4 text-slate-400" />
              <Link
                href={item.path}
                className={`hover:text-primary-600 focus:ring-primary-500 rounded px-1 font-medium focus:ring-2 focus:outline-none ${index === defaultItems.length - 1 ? 'pointer-events-none font-bold text-slate-900' : ''}`}
                aria-current={index === defaultItems.length - 1 ? 'page' : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;
