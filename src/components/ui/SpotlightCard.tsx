'use client';

import React, { useRef, useState } from 'react';

type SpotlightCardProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
};

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(14, 165, 233, 0.15)',
  ...props
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) {
      return;
    }
    const { left, top } = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - left,
      y: e.clientY - top,
    });
    if (props.onMouseMove) {
      props.onMouseMove(e);
    }
  }

  return (
    <div
      ref={cardRef}
      className={`group relative overflow-hidden border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 ${className}`}
      onMouseMove={handleMouseMove}
      {...props}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(
            650px circle at ${mousePosition.x}px ${mousePosition.y}px,
            ${spotlightColor},
            transparent 80%
          )`,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

export default SpotlightCard;
