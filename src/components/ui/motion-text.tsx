// React not needed 'react';
import { motion, useReducedMotion } from 'framer-motion';
import React from 'react';
import { FADE_UP_VARIANTS, STAGGER_CONTAINER } from '../../libs/utils/animation';

export const StaggeredText: React.FC<{ text: string; className?: string }> = ({ text, className }) => {
  // Split per kata untuk a11y yang lebih baik daripada per huruf
  const words = text.split(' ');
  const shouldReduceMotion = useReducedMotion();

  // Jika user prefer reduced motion, render text biasa
  if (shouldReduceMotion) {
    return <h1 className={className}>{text}</h1>;
  }

  return (
    <motion.span
      className={`inline-flex flex-wrap gap-x-2 overflow-hidden ${className}`}
      variants={STAGGER_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={FADE_UP_VARIANTS}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};
