/**
 * Design System - Color & Layout Standards
 * Ensures consistent dark/light mode and responsive layouts
 */

// ============================================================================
// COLOR SYSTEM - Dark/Light Mode Safe
// ============================================================================

export const colors = {
  // Background Colors
  bg: {
    // Page Backgrounds
    page: {
      light: 'bg-white dark:bg-slate-950',
      dark: 'bg-slate-900 dark:bg-slate-950',
      muted: 'bg-slate-50 dark:bg-slate-900',
      subtle: 'bg-slate-100 dark:bg-slate-800',
    },
    // Card/Component Backgrounds
    card: {
      default: 'bg-white dark:bg-slate-900',
      elevated: 'bg-white dark:bg-slate-800',
      muted: 'bg-slate-50 dark:bg-slate-900',
      subtle: 'bg-slate-100 dark:bg-slate-800',
    },
    // Interactive Backgrounds
    interactive: {
      hover: 'hover:bg-slate-100 dark:hover:bg-slate-800',
      active: 'active:bg-slate-200 dark:active:bg-slate-700',
    },
  },

  // Text Colors
  text: {
    // Body Text
    primary: 'text-slate-900 dark:text-slate-50',
    secondary: 'text-slate-700 dark:text-slate-300',
    tertiary: 'text-slate-600 dark:text-slate-400',
    muted: 'text-slate-500 dark:text-slate-500',
    disabled: 'text-slate-400 dark:text-slate-600',
    // Special Text
    brand: 'text-primary-600 dark:text-primary-400',
    onDark: 'text-white dark:text-slate-50',
    onLight: 'text-slate-900 dark:text-slate-900',
    // Status Text
    success: 'text-green-700 dark:text-green-400',
    warning: 'text-amber-700 dark:text-amber-400',
    danger: 'text-red-700 dark:text-red-400',
    info: 'text-blue-700 dark:text-blue-400',
  },

  // Border Colors
  border: {
    default: 'border-slate-200 dark:border-slate-800',
    strong: 'border-slate-300 dark:border-slate-700',
    subtle: 'border-slate-100 dark:border-slate-900',
    brand: 'border-primary-600 dark:border-primary-400',
    transparent: 'border-transparent',
  },

  // Ring/Focus Colors
  ring: {
    default: 'ring-slate-200 dark:ring-slate-800',
    brand: 'ring-primary-500 dark:ring-primary-400',
  },
} as const;

// ============================================================================
// RESPONSIVE LAYOUT SYSTEM
// ============================================================================

export const layout = {
  // Container Sizes
  container: {
    xs: 'max-w-xs',     // 320px
    sm: 'max-w-sm',     // 384px
    md: 'max-w-md',     // 448px
    lg: 'max-w-lg',     // 512px
    xl: 'max-w-xl',     // 576px
    '2xl': 'max-w-2xl', // 672px
    '3xl': 'max-w-3xl', // 768px
    '4xl': 'max-w-4xl', // 896px
    '5xl': 'max-w-5xl', // 1024px
    '6xl': 'max-w-6xl', // 1152px
    '7xl': 'max-w-7xl', // 1280px
    full: 'max-w-full',
  },

  // Spacing Scale (consistent padding/margin)
  spacing: {
    section: {
      mobile: 'py-12',
      tablet: 'sm:py-16 md:py-20',
      desktop: 'lg:py-24 xl:py-32',
      all: 'py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32',
    },
    container: {
      mobile: 'px-4',
      tablet: 'sm:px-6',
      desktop: 'lg:px-8',
      all: 'px-4 sm:px-6 lg:px-8',
    },
  },

  // Grid Systems
  grid: {
    // Desktop-specific (2-3 columns)
    desktop2: 'grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8',
    desktop3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8',
    desktop4: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6',
    // Asymmetric grids
    sidebar: 'grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8',
    contentWithSidebar: 'grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8',
  },

  // Flexbox Patterns
  flex: {
    center: 'flex items-center justify-center',
    between: 'flex items-center justify-between',
    start: 'flex items-center justify-start',
    end: 'flex items-center justify-end',
    column: 'flex flex-col',
    row: 'flex flex-row',
    // Responsive flex direction
    responsiveColumn: 'flex flex-col md:flex-row',
    responsiveRow: 'flex flex-row md:flex-col',
  },
} as const;

// ============================================================================
// COMPONENT PATTERNS
// ============================================================================

export const components = {
  // Card Patterns
  card: {
    base: `rounded-xl ${colors.bg.card.default} ${colors.border.default} border p-6 transition-colors duration-200`,
    elevated: `rounded-xl ${colors.bg.card.elevated} ${colors.border.default} border p-6 shadow-lg transition-all duration-200`,
    interactive: `rounded-xl ${colors.bg.card.default} ${colors.border.default} border p-6 ${colors.bg.interactive.hover} cursor-pointer transition-all duration-200`,
  },

  // Section Patterns
  section: {
    light: `${colors.bg.page.light} ${layout.spacing.section.all}`,
    dark: `${colors.bg.page.dark} ${layout.spacing.section.all}`,
    muted: `${colors.bg.page.muted} ${layout.spacing.section.all}`,
  },

  // Typography Scale
  typography: {
    h1: `text-4xl md:text-5xl lg:text-6xl font-bold ${colors.text.primary}`,
    h2: `text-3xl md:text-4xl lg:text-5xl font-bold ${colors.text.primary}`,
    h3: `text-2xl md:text-3xl lg:text-4xl font-bold ${colors.text.primary}`,
    h4: `text-xl md:text-2xl font-bold ${colors.text.primary}`,
    h5: `text-lg md:text-xl font-semibold ${colors.text.primary}`,
    h6: `text-base md:text-lg font-semibold ${colors.text.primary}`,
    body: `text-base md:text-lg ${colors.text.secondary}`,
    bodySmall: `text-sm md:text-base ${colors.text.tertiary}`,
  },
} as const;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Combine multiple Tailwind classes safely
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Get responsive text color based on background
 */
export function getTextOnBg(bgType: 'light' | 'dark' | 'muted'): string {
  switch (bgType) {
    case 'dark':
      return colors.text.onDark;
    case 'light':
      return colors.text.primary;
    case 'muted':
      return colors.text.primary;
    default:
      return colors.text.primary;
  }
}

/**
 * Get responsive grid columns
 */
export function getGridCols(cols: 2 | 3 | 4): string {
  switch (cols) {
    case 2:
      return layout.grid.desktop2;
    case 3:
      return layout.grid.desktop3;
    case 4:
      return layout.grid.desktop4;
    default:
      return layout.grid.desktop3;
  }
}

