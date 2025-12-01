import React, { memo } from 'react';
import { twMerge } from 'tailwind-merge';

/**
 * Container component for consistent max-width and padding
 *
 * @example
 * ```tsx
 * <Container>Content</Container>
 * <Container size="lg">Wide content</Container>
 * <Container size="sm" noPadding>Custom padding</Container>
 * ```
 */
type ContainerProps = {
  /** Content */
  children: React.ReactNode;
  /** Container max-width */
  size?: 'sm' | 'default' | 'lg' | 'xl' | 'full' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';
  /** Remove horizontal padding */
  noPadding?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** HTML element to render */
  as?: 'div' | 'section' | 'article' | 'main' | 'aside';
};

const Container: React.FC<ContainerProps> = memo(({
  children,
  size = 'default',
  noPadding = false,
  className = '',
  as: Component = 'div',
}) => {
  const sizeClasses: Record<string, string> = {
    'sm': 'max-w-4xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    'default': 'max-w-7xl',
    'lg': 'max-w-[1400px]',
    'xl': 'max-w-[1600px]',
    'full': 'max-w-full',
  };

  const maxWidthClass = sizeClasses[size] || sizeClasses.default;
  const paddingClass = noPadding ? '' : 'px-4 md:px-6 lg:px-8';

  return (
    <Component className={twMerge(maxWidthClass, 'mx-auto', paddingClass, className)}>
      {children}
    </Component>
  );
});

Container.displayName = 'Container';

export default Container;
