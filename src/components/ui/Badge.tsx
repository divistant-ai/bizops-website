import React from 'react';
import { cn } from '@/libs/utils/cn';

/**
 * Badge component for labels, tags, and status indicators
 * Server Component - no client-side interactivity needed
 *
 * @example
 * ```tsx
 * <Badge variant="success" size="sm">Active</Badge>
 * <Badge variant="warning">Pending</Badge>
 * ```
 */
type BadgeProps = {
  /** Badge content */
  children: React.ReactNode;
  /** Color variant */
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral' | 'outline' | 'dark' | 'outline-white';
  /** Additional CSS classes */
  className?: string;
  /** Size of the badge */
  size?: 'sm' | 'md';
};

const Badge: React.FC<BadgeProps> = ({ children, variant = 'neutral', className = '', size = 'sm' }) => {
  const variants = {
    'primary': 'bg-primary/10 text-primary border-primary/20',
    'success': 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20',
    'warning': 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
    'danger': 'bg-destructive/10 text-destructive border-destructive/20',
    'neutral': 'bg-muted text-muted-foreground border-border',
    'outline': 'bg-transparent text-muted-foreground border-border',
    'outline-white': 'bg-transparent text-white border-white/30',
    'dark': 'bg-slate-900 text-white border-slate-800',
  };

  const sizes = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span className={cn(
      'inline-flex items-center rounded-full font-bold uppercase tracking-wide border',
      variants[variant],
      sizes[size],
      className,
    )}
    >
      {children}
    </span>
  );
};

Badge.displayName = 'Badge';

export default Badge;
