'use client';

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import React, { memo } from 'react';
import { twMerge } from 'tailwind-merge';

/**
 * Button component with multiple variants and sizes
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="lg" onClick={handleClick}>
 *   Click Me
 * </Button>
 * ```
 *
 * @example
 * ```tsx
 * <Button variant="outline" isLoading={isSubmitting}>
 *   Submit
 * </Button>
 * ```
 */
type ButtonProps = {
  /** Button content */
  'children'?: React.ReactNode;
  /** Visual style variant */
  'variant'?: 'primary' | 'secondary' | 'accent' | 'white' | 'outline' | 'outline-white' | 'ghost' | 'link';
  /** Size of the button */
  'size'?: 'sm' | 'md' | 'lg';
  /** Make button full width */
  'fullWidth'?: boolean;
  /** Show loading spinner */
  'isLoading'?: boolean;
  /** Additional CSS classes */
  'className'?: string;
  /** Disable button */
  'disabled'?: boolean;
  /** Click handler */
  'onClick'?: React.MouseEventHandler<HTMLButtonElement>;
  /** Button type */
  'type'?: 'button' | 'submit' | 'reset';
  /** Use as child component (for Next.js Link) */
  'asChild'?: boolean;
  /** ARIA label for accessibility (required for icon-only buttons) */
  'aria-label'?: string;
  /** ARIA described by */
  'aria-describedby'?: string;
  /** ARIA expanded (for dropdowns) */
  'aria-expanded'?: boolean;
  /** ARIA controls (for dropdowns/modals) */
  'aria-controls'?: string;
  /** ARIA pressed (for toggle buttons) */
  'aria-pressed'?: boolean;
};

const Button: React.FC<ButtonProps> = memo(({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  className = '',
  disabled,
  onClick,
  type = 'button',
  asChild = false,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
  'aria-expanded': ariaExpanded,
  'aria-controls': ariaControls,
  'aria-pressed': ariaPressed,
}: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed rounded-lg active:scale-[0.98]';

  // Design System: Ensure proper color contrast for all variants
  const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
    // Primary: Dark blue background with white text (high contrast)
    'primary': 'bg-primary-600 text-white hover:bg-primary-700 border border-transparent shadow-sm focus:ring-primary-500 dark:bg-primary-500 dark:hover:bg-primary-600',
    // Secondary: Dark background with white text (high contrast)
    'secondary': 'bg-slate-900 text-white hover:bg-slate-800 border border-transparent shadow-sm focus:ring-slate-900 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100',
    // Accent: Amber background with dark text (high contrast)
    'accent': 'bg-amber-500 text-slate-950 hover:bg-amber-400 border border-transparent shadow-sm focus:ring-amber-500',
    // White: White background with dark text (high contrast)
    'white': 'bg-white text-slate-900 hover:bg-slate-50 border border-transparent shadow-sm focus:ring-white dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700',
    // Outline: Transparent with border, adapts to context
    'outline': 'bg-transparent text-slate-900 border border-slate-300 hover:bg-slate-50 hover:border-slate-400 focus:ring-slate-500 dark:text-slate-100 dark:border-slate-600 dark:hover:bg-slate-800',
    // Outline-white: For use on dark backgrounds only (explicit)
    'outline-white': 'bg-transparent text-white border border-white/30 hover:bg-white/10 hover:border-white/50 focus:ring-white',
    // Ghost: Subtle hover effect
    'ghost': 'bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-500 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white',
    // Link: Text-only button
    'link': 'text-primary-600 hover:text-primary-700 hover:underline px-0 shadow-none active:scale-100 dark:text-primary-400 dark:hover:text-primary-300',
  };

  const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
    sm: 'h-11 px-3 text-sm',
    md: 'h-11 px-5 text-base',
    lg: 'h-14 px-8 text-lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const buttonClassName = twMerge(baseStyles, variants[variant], sizes[size], widthClass, className);

  if (asChild && React.isValidElement(children)) {
    const childProps = children.props as { className?: string };
    return React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
      'className': twMerge(buttonClassName, childProps.className),
      'disabled': disabled || isLoading,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedby,
      'aria-expanded': ariaExpanded,
      'aria-controls': ariaControls,
      'aria-pressed': ariaPressed,
      'aria-busy': isLoading,
    } as Record<string, unknown>);
  }

  return (
    <motion.button
      type={type}
      className={buttonClassName}
      disabled={disabled || isLoading}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedby}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      aria-pressed={ariaPressed}
      aria-busy={isLoading}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />}
      {children}
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;
