'use client';

import React, { memo } from 'react';

type GridProps = {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  mdCols?: 1 | 2 | 3 | 4;
  smCols?: 1 | 2;
  gap?: 2 | 4 | 6 | 8 | 10 | 12;
  className?: string;
};

const Grid: React.FC<GridProps> = memo(({
  children,
  cols = 3,
  mdCols = 2,
  smCols = 1,
  gap = 6,
  className = '',
}) => {
  const colsClass = `lg:grid-cols-${cols}`;
  const mdColsClass = `md:grid-cols-${mdCols}`;
  const smColsClass = `grid-cols-${smCols}`;
  const gapClass = `gap-${gap}`;

  const classes = [
    'grid',
    smColsClass,
    mdColsClass,
    colsClass,
    gapClass,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {children}
    </div>
  );
});

Grid.displayName = 'Grid';

export default Grid;
