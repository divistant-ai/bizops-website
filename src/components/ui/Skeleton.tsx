import React, { memo } from 'react';

import { twMerge } from 'tailwind-merge';

export const Skeleton: React.FC<{ className?: string }> = memo(({ className = '' }) => (
  <div className={twMerge('bg-slate-200 dark:bg-slate-800 animate-pulse rounded', className)}></div>
));

Skeleton.displayName = 'Skeleton';

export const SkeletonText: React.FC<{ lines?: number; className?: string }> = memo(({ lines = 3, className = '' }) => (
  <div className={twMerge('space-y-3', className)}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton key={i} className={twMerge('h-4', i === lines - 1 ? 'w-2/3' : 'w-full')} />
    ))}
  </div>
));

SkeletonText.displayName = 'SkeletonText';

export const SkeletonCard: React.FC = memo(() => (
  <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
    <Skeleton className="mb-6 h-48 w-full rounded-xl" />
    <Skeleton className="mb-4 h-6 w-3/4" />
    <SkeletonText lines={2} />
    <div className="mt-6 flex gap-4">
      <Skeleton className="h-10 w-24 rounded-lg" />
    </div>
  </div>
));

SkeletonCard.displayName = 'SkeletonCard';
