'use client';

import React from 'react';

type InfiniteScrollLoopProps = {
  children: React.ReactNode;
  speed?: number;
  direction?: 'left' | 'right';
  className?: string;
};

const InfiniteScrollLoop: React.FC<InfiniteScrollLoopProps> = ({
  children,
  speed = 30,
  direction = 'left',
  className = '',
}) => {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className="flex gap-4"
        style={{
          animation: `scroll ${speed}s linear infinite`,
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
};

export default InfiniteScrollLoop;
