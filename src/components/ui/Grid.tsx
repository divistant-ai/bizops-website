import React from 'react';
import { twMerge } from 'tailwind-merge';

/**
 * Grid component for responsive grid layouts
 * Server Component - no client-side interactivity needed
 */
type GridProps = {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12; // Desktop (LG)
  mdCols?: 1 | 2 | 3 | 4; // Tablet (MD)
  smCols?: 1 | 2; // Mobile (Base)
  gap?: 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;
  className?: string;
  lgCols?: 1 | 2 | 3 | 4; // Explicit LG override if needed
};

const Grid: React.FC<GridProps> = ({
  children,
  cols = 3, // Default desktop columns
  mdCols = 2, // Default tablet columns
  smCols = 1, // Default mobile columns
  lgCols, // Optional override
  gap = 6,
  className = '',
}) => {
  // Tailwind safelist pattern required or use dynamic construction carefully
  // Mapping for safer class generation
  const getColsClass = (count: number, prefix = '') => {
    const p = prefix ? `${prefix}:` : '';
    return `${p}grid-cols-${count}`;
  };

  const baseClass = getColsClass(smCols); // Mobile first
  const mdClass = getColsClass(mdCols, 'md');
  const lgClass = getColsClass(lgCols || cols, 'lg');
  const gapClass = `gap-${gap}`;

  const classes = twMerge(
    'grid',
    baseClass,
    mdClass,
    lgClass,
    gapClass,
    className,
  );

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

Grid.displayName = 'Grid';

export default Grid;
