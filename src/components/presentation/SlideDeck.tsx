'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Maximize2, Minimize2 } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui';
import { cn } from '@/libs/utils/cn';

export type SlideData = {
  id: string;
  content: React.ReactNode;
  className?: string;
};

type SlideDeckProps = {
  slides: SlideData[];
};

export default function SlideDeck({ slides }: SlideDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex(prev => (prev + 1 < slides.length ? prev + 1 : prev));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 >= 0 ? prev - 1 : prev));
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // Sync fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Auto-hide controls in fullscreen
  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      if (isFullscreen) {
        controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 3000);
      }
    };

    if (isFullscreen) {
      handleMouseMove(); // Reset timer on enter fullscreen
      window.addEventListener('mousemove', handleMouseMove);
    } else {
      setShowControls(true);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isFullscreen]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const progress = ((currentIndex + 1) / slides.length) * 100;

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-slate-950 text-white selection:bg-blue-500/30"
    >
      {/* Slide Content */}
      <div className="relative h-full w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className={cn(
              'absolute inset-0 flex h-full w-full flex-col items-center justify-center p-8 md:p-16',
              slides[currentIndex]?.className,
            )}
          >
            {slides[currentIndex]?.content}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls UI */}
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 20 }}
        transition={{ duration: 0.3 }}
        className="absolute right-0 bottom-0 left-0 z-50 p-6 md:p-8"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-slate-900/80 px-6 py-4 backdrop-blur-md">

          {/* Left: Branding & Home */}
          <div className="flex items-center gap-4">
            <Link href="/" className="group flex items-center gap-2 transition-opacity hover:opacity-80">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-lg">
                <div className="h-4 w-4 rotate-45 transform rounded-sm bg-slate-950"></div>
              </div>
              <span className="hidden text-lg font-bold tracking-tight text-white sm:block">BizOps</span>
            </Link>
            <div className="mx-2 hidden h-6 w-px bg-white/10 sm:block"></div>
            <span className="hidden text-sm text-slate-400 sm:block">
              Slide
              {' '}
              {currentIndex + 1}
              {' '}
              /
              {' '}
              {slides.length}
            </span>
          </div>

          {/* Center: Navigation Buttons */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline-white"
              size="sm"
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="h-10 w-10 rounded-full p-0"
              aria-label="Previous Slide"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="primary"
              size="lg"
              onClick={nextSlide}
              disabled={currentIndex === slides.length - 1}
              className="h-12 rounded-full px-8 shadow-lg shadow-blue-600/20"
            >
              {currentIndex === slides.length - 1 ? 'Selesai' : 'Lanjut'}
            </Button>
          </div>

          {/* Right: Fullscreen */}
          <div className="flex items-center justify-end gap-4">
            <button
              onClick={toggleFullscreen}
              className="text-slate-400 transition-colors hover:text-white"
              aria-label="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 h-1 w-full bg-slate-800">
          <motion.div
            className="h-full bg-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>
    </div>
  );
}
