'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

type BarChartProps = {
  data?: Array<{ label: string; value: number }>;
  bars?: number; // Number of bars to display (for activity chart)
  className?: string;
  animated?: boolean;
};

export function BarChart({
  data = [],
  bars = 40,
  className = '',
  animated = true,
}: BarChartProps) {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = animated && !prefersReducedMotion;

  // If data is provided, use traditional bar chart
  if (data && data.length > 0) {
    const maxValue = Math.max(...data.map(d => d.value));

    return (
      <div className={`space-y-4 ${className}`}>
        {data.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-slate-700 dark:text-slate-300">
                {item.label}
              </span>
              <span className="text-slate-600 dark:text-slate-400">
                {item.value}
                %
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
              <motion.div
                initial={shouldAnimate ? { width: 0 } : undefined}
                animate={{ width: `${(item.value / maxValue) * 100}%` }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600"
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Otherwise, use activity chart (40 bars like old version)
  // Use useState to ensure client-side only generation to avoid hydration mismatch
  const [heights, setHeights] = useState<number[]>([]);

  useEffect(() => {
    // Only generate random heights on client side
    setHeights(Array.from({ length: bars }, () => 30 + Math.random() * 70));
  }, [bars]);

  // Don't render until heights are generated (client-side only)
  if (heights.length === 0) {
    return <div className={`h-32 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800 ${className}`} />;
  }

  return (
    <div className={`flex h-32 items-end gap-1 ${className}`}>
      {heights.map((height, i) => {
        const BarComponent = shouldAnimate ? motion.div : 'div';
        const animationProps = shouldAnimate
          ? {
              initial: { scaleY: 0 },
              whileInView: { scaleY: 1 },
              viewport: { once: true },
              transition: { delay: i * 0.02 },
            }
          : {};

        return (
          <BarComponent
            key={i}
            className="flex-1 origin-bottom rounded-t-sm bg-blue-500/30 transition-colors hover:bg-blue-500/80"
            style={{ height: `${height}%` }}
            {...(shouldAnimate ? animationProps : {})}
          />
        );
      })}
    </div>
  );
}
