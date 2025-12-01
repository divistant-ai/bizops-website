'use client';

import Image from 'next/image';
import React, { memo, useState } from 'react';

type OptimizedImageProps = {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  loading?: 'lazy' | 'eager';
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  style?: React.CSSProperties;
  sizes?: string;
};

const OptimizedImage: React.FC<OptimizedImageProps> = memo(({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  objectFit = 'cover',
  priority = false,
  onLoad,
  onError,
  style,
  sizes,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) {
      onLoad();
    }
  };

  const handleError = () => {
    setHasError(true);
    if (onError) {
      onError();
    }
  };

  const objectFitClass = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
    none: 'object-none',
  }[objectFit];

  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-slate-100 dark:bg-slate-800 ${className}`}
        style={{ width, height, ...style }}
      >
        <div className="p-4 text-center">
          <svg
            className="mx-auto mb-2 h-8 w-8 text-slate-400 dark:text-slate-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>
    );
  }

  const numWidth = typeof width === 'number' ? width : typeof width === 'string' ? Number.parseInt(width) : 1920;
  const numHeight = typeof height === 'number' ? height : typeof height === 'string' ? Number.parseInt(height) : 1080;

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width, height, ...style }}>
      {!isLoaded && (
        <div className="absolute inset-0 z-10 animate-pulse bg-slate-200 dark:bg-slate-800" />
      )}

      <Image
        src={src}
        alt={alt}
        width={numWidth}
        height={numHeight}
        loading={priority ? 'eager' : loading}
        priority={priority}
        className={`${objectFitClass} h-full w-full transition-all duration-500 ${
          isLoaded ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
        }`}
        onLoad={handleLoad}
        onError={handleError}
        sizes={sizes}
      />
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;
