'use client';

import React, { useEffect, useRef, useState } from 'react';

type CardSliderProps = {
  children: React.ReactNode;
  desktopClassName?: string;
  mobileItemWidth?: string;
  desktopItemWidth?: string;
  desktopItemClassName?: string | ((index: number) => string);
  className?: string;
  label?: string;
  breakpoint?: 'md' | 'lg';
};

const CardSlider: React.FC<CardSliderProps> = ({
  children,
  desktopClassName = 'md:grid md:grid-cols-3 md:gap-8',
  mobileItemWidth = 'w-[85vw] sm:w-[60vw]',
  desktopItemWidth,
  desktopItemClassName,
  className = '',
  label = 'Content Slider',
  breakpoint = 'md',
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const childCount = React.Children.count(children);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) {
      return;
    }

    const handleScroll = () => {
      const scrollLeft = slider.scrollLeft;
      const itemWidth = slider.children[0]?.clientWidth || 0;

      if (itemWidth > 0) {
        const index = Math.round(scrollLeft / itemWidth);
        setActiveIndex(Math.min(Math.max(index, 0), childCount - 1));
      }
    };

    slider.addEventListener('scroll', handleScroll, { passive: true });
    return () => slider.removeEventListener('scroll', handleScroll);
  }, [childCount]);

  const scrollTo = (index: number) => {
    const slider = sliderRef.current;
    if (slider) {
      const itemWidth = slider.children[0]?.clientWidth || 0;
      const targetIndex = Math.max(0, Math.min(index, childCount - 1));
      slider.scrollTo({ left: targetIndex * itemWidth, behavior: 'smooth' });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollTo(activeIndex + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollTo(activeIndex - 1);
    }
  };

  const resetClass = breakpoint === 'lg'
    ? 'lg:mx-0 lg:px-0 lg:pb-0 lg:overflow-visible lg:snap-none'
    : 'md:mx-0 md:px-0 md:pb-0 md:overflow-visible md:snap-none';

  const defaultDesktopWidthClass = breakpoint === 'lg' ? 'lg:w-auto' : 'md:w-auto';
  const finalDesktopWidth = desktopItemWidth !== undefined ? desktopItemWidth : defaultDesktopWidthClass;

  const indicatorHideClass = breakpoint === 'lg' ? 'lg:hidden' : 'md:hidden';

  return (
    <div className={`group relative ${className}`} role="region" aria-label={label}>
      <div
        ref={sliderRef}
        onKeyDown={handleKeyDown}
        className={`
          -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-8
          ${resetClass}
          scrollbar-hide focus:ring-primary-500/20 rounded-xl focus:ring-2 focus:outline-none
          ${desktopClassName}
        `}
        tabIndex={0}
      >
        {React.Children.map(children, (child, index) => {
          let desktopClass = finalDesktopWidth;
          if (desktopItemClassName) {
            if (typeof desktopItemClassName === 'function') {
              desktopClass = desktopItemClassName(index);
            } else {
              desktopClass = desktopItemClassName;
            }
          }

          return (
            <div key={index} className={`flex-shrink-0 snap-center ${mobileItemWidth} ${desktopClass} h-full`}>
              {child}
            </div>
          );
        })}
      </div>

      <div className={`absolute right-0 bottom-0 left-0 flex justify-center gap-2 ${indicatorHideClass} pointer-events-none h-6`} aria-hidden="true">
        {Array.from({ length: childCount }).map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`focus:ring-primary-500 pointer-events-auto h-1.5 rounded-full transition-all duration-300 focus:ring-2 focus:ring-offset-2 focus:outline-none ${
              i === activeIndex ? 'bg-primary-600 w-6' : 'hover:bg-primary-400 w-1.5 bg-slate-300'
            }`}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === activeIndex}
          />
        ))}
      </div>
    </div>
  );
};

export default CardSlider;
