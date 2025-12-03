// Navbar Design Tokens and Style Constants

export const navbarStyles = {
  // Menu Item Styles
  menuItem: {
    base: 'flex h-10 items-center gap-1.5 rounded-lg px-3.5 text-sm font-semibold transition-all duration-200 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:hover:bg-slate-800/70 dark:hover:text-white',
    inactive: 'text-slate-700 dark:text-slate-300',
    active: 'bg-slate-100 text-primary-600 dark:bg-slate-800 dark:text-primary-400',
  },

  // Icon Button Styles - Improved for accessibility (44x44 touch target)
  iconButton: {
    base: 'flex h-11 w-11 items-center justify-center rounded-lg transition-all duration-200 hover:bg-slate-100 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
    colors: 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/70 dark:hover:text-white',
    mobile: 'active:scale-95 sm:h-10 sm:w-10',
  },

  // Text Button Styles
  textButton: {
    base: 'rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
    colors: 'text-slate-700 dark:text-slate-300 dark:hover:bg-slate-800/70 dark:hover:text-white',
  },

  // CTA Button Enhancement
  ctaButton: {
    gradient: 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800',
    shadow: 'shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 dark:shadow-primary-500/20',
    animation: 'transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98]',
  },

  // Container Styles
  container: {
    nav: 'flex h-full items-center gap-1.5',
    actions: 'flex flex-shrink-0 items-center gap-2 sm:gap-3',
    separator: 'mx-4 hidden h-8 w-px bg-slate-200 dark:bg-slate-700 xl:block',
  },

  // Icon Sizes
  iconSize: {
    small: 'h-4 w-4',
    medium: 'h-5 w-5',
    large: 'h-6 w-6',
    chevron: 'h-3.5 w-3.5',
  },
} as const;

// Helper function to combine classes
export const getMenuItemClasses = (isActive: boolean): string => {
  return `${navbarStyles.menuItem.base} ${isActive ? navbarStyles.menuItem.active : navbarStyles.menuItem.inactive}`;
};

export const getIconButtonClasses = (isMobile = false): string => {
  return `${navbarStyles.iconButton.base} ${navbarStyles.iconButton.colors} ${isMobile ? navbarStyles.iconButton.mobile : ''}`;
};

export const getTextButtonClasses = (): string => {
  return `${navbarStyles.textButton.base} ${navbarStyles.textButton.colors}`;
};

export const getCTAButtonClasses = (): string => {
  return `${navbarStyles.ctaButton.gradient} ${navbarStyles.ctaButton.shadow} ${navbarStyles.ctaButton.animation}`;
};

