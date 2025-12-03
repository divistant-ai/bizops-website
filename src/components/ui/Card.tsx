import React from 'react';
import { cn } from '@/libs/utils/cn';

/**
 * Card component for displaying content in a contained box
 * Server Component - interactive features handled via props
 */
type CardProps = {
  /** Card content */
  'children': React.ReactNode;
  /** Additional CSS classes */
  'className'?: string;
  /** Enable hover elevation effect */
  'hoverEffect'?: boolean;
  /** Visual style variant */
  'variant'?: 'default' | 'outline' | 'flat' | 'dark' | 'glass';
  /** Click handler */
  'onClick'?: () => void;
  /** Padding size */
  'padding'?: 'none' | 'sm' | 'md' | 'lg';
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** ARIA labelledby */
  'aria-labelledby'?: string;
  /** Role attribute */
  'role'?: string;
  /** HTML element to render */
  'as'?: React.ElementType;
};

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverEffect = false,
  variant = 'default',
  onClick,
  padding = 'md',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  role,
  as: Component = 'div',
}) => {
  const variants = {
    default: 'bg-card text-card-foreground border border-border shadow-sm',
    outline: 'bg-transparent border border-border',
    flat: 'bg-muted/50 text-foreground border-none',
    dark: 'bg-slate-900 text-white border border-white/10',
    glass: 'bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-lg',
  };

  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6 md:p-8',
    lg: 'p-8 md:p-10',
  };

  return (
    <Component
      className={cn(
        'rounded-2xl transition-all duration-300 relative overflow-hidden group',
        variants[variant],
        paddings[padding],
        hoverEffect && 'hover:shadow-premium hover:-translate-y-1 hover:border-primary/50 cursor-pointer',
        className,
      )}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      role={role || (onClick ? 'button' : undefined)}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick
        ? (e: React.KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onClick();
            }
          }
        : undefined}
    >
      {children}
    </Component>
  );
};

Card.displayName = 'Card';

export default Card;
