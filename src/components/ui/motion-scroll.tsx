'use client';

import { motion, useInView, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import OptimizedImage from './OptimizedImage';

// 1. Sticky Header Reveal
export const StickyHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const diff = latest - lastY;
    if (Math.abs(diff) > 20) { // Threshold to prevent jitter
      setVisible(diff < 0 || latest < 50); // Show if scrolling up OR at top
      setLastY(latest);
    }
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: '-100%', opacity: 0 },
      }}
      animate={visible ? 'visible' : 'hidden'}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`fixed top-0 left-0 z-50 w-full ${className}`}
    >
      {children}
    </motion.header>
  );
};

// 2. Counter Up (Data Viz)
export const CounterUp: React.FC<{ to: number; label: string; prefix?: string; suffix?: string }> = ({ to, label, prefix = '', suffix = '' }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const count = useSpring(0, { duration: 2000 }); // Duration based spring
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      count.set(to);
    }
  }, [isInView, to, count]);

  useEffect(() => {
    const unsubscribe = count.on('change', (latest) => {
      setDisplayValue(Math.round(latest));
    });
    return unsubscribe;
  }, [count]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <motion.span className="from-primary-600 mb-2 block bg-gradient-to-r to-blue-600 bg-clip-text text-4xl font-extrabold text-transparent md:text-5xl">
        {prefix}
        {displayValue.toLocaleString()}
        {suffix}
      </motion.span>
      <span className="text-sm font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">{label}</span>
    </div>
  );
};

// 3. Parallax Image (Scroll Effect)
export const ParallaxImage: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className }) => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Background bergerak lebih lambat (y: -10% to 10%)
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <div ref={ref} className={`relative overflow-hidden rounded-2xl ${className}`}>
      <motion.div style={{ y }} className="absolute inset-0 -top-[10%] h-[120%] w-full">
        <OptimizedImage src={src} alt={alt} className="h-full w-full" objectFit="cover" />
      </motion.div>
    </div>
  );
};

// 4. Infinite Scroll Loop (Marquee)
export const InfiniteScrollLoop: React.FC<{ children: React.ReactNode; speed?: number; direction?: 'left' | 'right'; className?: string }> = ({
  children,
  speed = 20,
  direction = 'left',
  className,
}) => {
  return (
    <div className={`flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)] ${className}`}>
      <motion.div
        initial={{ x: direction === 'left' ? 0 : '-50%' }}
        animate={{ x: direction === 'left' ? '-50%' : 0 }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="flex flex-none items-center gap-12 py-4 pr-12"
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
};
