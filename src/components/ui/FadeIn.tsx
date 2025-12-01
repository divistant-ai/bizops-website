'use client';

import type { HTMLMotionProps } from 'framer-motion';
import { motion, useReducedMotion } from 'framer-motion';
import { createContext, useContext } from 'react';

const FadeInStaggerContext = createContext(false);

const viewport = { once: true, margin: '0px 0px -200px' };

type FadeInProps = {
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  fullWidth?: boolean;
} & HTMLMotionProps<'div'>;

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.5,
  ...props
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();
  const isInStaggerGroup = useContext(FadeInStaggerContext);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration, delay }}
      {...(isInStaggerGroup
        ? {}
        : {
            initial: 'hidden',
            whileInView: 'visible',
            viewport,
          })}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function FadeInStagger({ faster = false, className, children, ...props }: any) {
  return (
    <FadeInStaggerContext.Provider value={true}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        transition={{ staggerChildren: faster ? 0.12 : 0.2 }}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    </FadeInStaggerContext.Provider>
  );
}
