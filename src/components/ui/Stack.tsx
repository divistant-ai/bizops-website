import React from 'react';

/**
 * Stack component for flex layouts
 * Server Component - no client-side interactivity needed
 */
type StackProps = {
  children: React.ReactNode;
  direction?: 'vertical' | 'horizontal';
  gap?: 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  wrap?: boolean;
  className?: string;
};

const Stack: React.FC<StackProps> = ({
  children,
  direction = 'vertical',
  gap = 4,
  align,
  justify,
  wrap = false,
  className = '',
}) => {
  const directionClass = direction === 'vertical' ? 'flex-col' : 'flex-row';
  const gapClass = `gap-${gap}`;

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  };

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
  };

  const classes = [
    'flex',
    directionClass,
    gapClass,
    align ? alignClasses[align] : '',
    justify ? justifyClasses[justify] : '',
    wrap ? 'flex-wrap' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

Stack.displayName = 'Stack';

export default Stack;
