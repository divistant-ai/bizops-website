/**
 * Design System Utilities
 * Ensures consistent color usage across the application
 */

/**
 * Standard background and text color combinations
 * Use these to ensure proper contrast ratios
 */
export const colorSchemes = {
  // Light backgrounds
  light: {
    bg: 'bg-white',
    text: 'text-slate-900',
    textMuted: 'text-slate-600',
    textSubtle: 'text-slate-500',
    border: 'border-slate-200',
  },
  lightAlt: {
    bg: 'bg-slate-50',
    text: 'text-slate-900',
    textMuted: 'text-slate-600',
    textSubtle: 'text-slate-500',
    border: 'border-slate-200',
  },
  // Dark backgrounds
  dark: {
    bg: 'bg-slate-900',
    text: 'text-white',
    textMuted: 'text-slate-300',
    textSubtle: 'text-slate-400',
    border: 'border-slate-700',
  },
  darkAlt: {
    bg: 'bg-slate-800',
    text: 'text-white',
    textMuted: 'text-slate-300',
    textSubtle: 'text-slate-400',
    border: 'border-slate-700',
  },
  // Primary colored backgrounds
  primary: {
    bg: 'bg-primary-600',
    text: 'text-white',
    textMuted: 'text-primary-100',
    textSubtle: 'text-primary-200',
    border: 'border-primary-500',
  },
  primaryLight: {
    bg: 'bg-primary-50',
    text: 'text-primary-900',
    textMuted: 'text-primary-700',
    textSubtle: 'text-primary-600',
    border: 'border-primary-200',
  },
} as const;

/**
 * Get appropriate text color for a given background
 */
export function getTextColorForBackground(bgClass: string): string {
  // Dark backgrounds
  if (
    bgClass.includes('slate-900')
    || bgClass.includes('slate-800')
    || bgClass.includes('slate-950')
    || bgClass.includes('neutral-900')
    || bgClass.includes('neutral-800')
    || bgClass.includes('primary-900')
    || bgClass.includes('primary-800')
    || bgClass.includes('primary-700')
    || bgClass.includes('primary-600')
  ) {
    return 'text-white';
  }

  // Light backgrounds
  if (
    bgClass.includes('white')
    || bgClass.includes('slate-50')
    || bgClass.includes('slate-100')
    || bgClass.includes('neutral-50')
    || bgClass.includes('neutral-100')
    || bgClass.includes('primary-50')
    || bgClass.includes('primary-100')
  ) {
    return 'text-slate-900';
  }

  // Default to dark text for safety
  return 'text-slate-900';
}

/**
 * Validate color combination
 * Returns true if combination is valid (good contrast)
 */
export function isValidColorCombination(textClass: string, bgClass: string): boolean {
  const isDarkBg
    = bgClass.includes('slate-900')
      || bgClass.includes('slate-800')
      || bgClass.includes('slate-950')
      || bgClass.includes('neutral-900')
      || bgClass.includes('neutral-800')
      || bgClass.includes('primary-900')
      || bgClass.includes('primary-800')
      || bgClass.includes('primary-700')
      || bgClass.includes('primary-600');

  const isLightBg
    = bgClass.includes('white')
      || bgClass.includes('slate-50')
      || bgClass.includes('slate-100')
      || bgClass.includes('neutral-50')
      || bgClass.includes('neutral-100')
      || bgClass.includes('primary-50')
      || bgClass.includes('primary-100');

  const isWhiteText = textClass.includes('text-white') || textClass.includes('white');
  const isDarkText
    = textClass.includes('text-slate-900')
      || textClass.includes('text-slate-800')
      || textClass.includes('text-neutral-900')
      || textClass.includes('text-black');

  // Dark background should have white text
  if (isDarkBg && isDarkText) {
    return false;
  }

  // Light background should have dark text
  if (isLightBg && isWhiteText) {
    return false;
  }

  return true;
}

/**
 * Common section background patterns
 */
export const sectionPatterns = {
  default: {
    bg: 'bg-white',
    text: 'text-slate-900',
    className: 'bg-white text-slate-900',
  },
  alt: {
    bg: 'bg-slate-50',
    text: 'text-slate-900',
    className: 'bg-slate-50 text-slate-900',
  },
  dark: {
    bg: 'bg-slate-900',
    text: 'text-white',
    className: 'bg-slate-900 text-white',
  },
  darkAlt: {
    bg: 'bg-slate-800',
    text: 'text-white',
    className: 'bg-slate-800 text-white',
  },
} as const;
