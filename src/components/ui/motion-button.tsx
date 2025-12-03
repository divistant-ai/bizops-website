'use client';

import type { ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

type BouncyButtonProps = {
  children: React.ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const BouncyButton = ({
  ref,
  children,
  className = '',
  onAnimationStart,
  onAnimationEnd,
  onDrag,
  onDragStart,
  onDragEnd,
  ...props
}: BouncyButtonProps & { ref?: React.RefObject<HTMLButtonElement | null> }) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-3 text-base font-semibold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        onAnimationStart={onAnimationStart}
        onAnimationEnd={onAnimationEnd}
        onDrag={onDrag}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <motion.button
      ref={ref}
      className={`inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-3 text-base font-semibold text-white shadow-lg transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      whileHover={{
        scale: 1.05,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

BouncyButton.displayName = 'BouncyButton';
