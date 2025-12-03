import React from 'react';
import { twMerge } from 'tailwind-merge';

/**
 * Section component for page sections
 * Server Component - no client-side interactivity needed
 */
type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  containerClassName?: string;
  noPadding?: boolean;
  dark?: boolean;
};

const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  id,
  containerClassName = '',
  noPadding = false,
  dark = false,
}) => {
  // Design System: Ensure proper color contrast for light & dark mode
  // Dark prop sections: bg-slate-900 with text-white
  // Light sections: bg-white with text-slate-900 (respects dark mode)
  const bgClass = dark
    ? 'bg-slate-900 text-white'
    : 'bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50';
  const paddingClass = noPadding ? '' : 'py-16 md:py-20 lg:py-24';

  return (
    <section id={id} className={twMerge(bgClass, paddingClass, className, 'transition-colors duration-300')}>
      <div className={twMerge('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8', containerClassName)}>
        {children}
      </div>
    </section>
  );
};

Section.displayName = 'Section';

export default Section;
