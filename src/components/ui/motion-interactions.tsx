// React not needed 'react';
import { motion } from 'framer-motion';
import React from 'react';

// Shake Input (Validation Error)
export const ShakeInput: React.FC<{ isError: boolean } & React.InputHTMLAttributes<HTMLInputElement>> = ({ isError, className, ...props }) => {
  return (
    <motion.input
      animate={isError ? { x: [-10, 10, -10, 10, 0], borderColor: '#ef4444' } : { x: 0 }}
      transition={{ type: 'spring', stiffness: 500, damping: 15 }} // Fast vibration
      className={`w-full rounded-md border-2 p-2 transition-colors ${isError ? 'border-red-500 bg-red-50' : 'border-slate-200'} ${className}`}
      {...props as any}
    />
  );
};
