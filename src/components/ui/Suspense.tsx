/**
 * Suspense boundary components for better loading states
 * Improves perceived performance and user experience
 */

import type { ReactNode } from 'react';
import { Suspense as ReactSuspense } from 'react';
import Loading from './Loading';
import { Skeleton } from './Skeleton';

type SuspenseWrapperProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

/**
 * Generic Suspense wrapper with default loading state
 */
export function SuspenseWrapper({ children, fallback }: SuspenseWrapperProps) {
  return (
    <ReactSuspense fallback={fallback || <Loading />}>
      {children}
    </ReactSuspense>
  );
}

/**
 * Suspense wrapper for content sections
 */
export function SuspenseContent({ children }: { children: ReactNode }) {
  return (
    <ReactSuspense
      fallback={(
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
      )}
    >
      {children}
    </ReactSuspense>
  );
}

/**
 * Suspense wrapper for card grids
 */
export function SuspenseCardGrid({ children }: { children: ReactNode }) {
  return (
    <ReactSuspense
      fallback={(
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array.from({ length: 6 })].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-48 w-full rounded-2xl" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          ))}
        </div>
      )}
    >
      {children}
    </ReactSuspense>
  );
}

/**
 * Suspense wrapper for lists
 */
export function SuspenseList({ children }: { children: ReactNode }) {
  return (
    <ReactSuspense
      fallback={(
        <div className="space-y-3">
          {[...Array.from({ length: 5 })].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      )}
    >
      {children}
    </ReactSuspense>
  );
}

/**
 * Suspense wrapper for images
 */
export function SuspenseImage({ children }: { children: ReactNode }) {
  return (
    <ReactSuspense
      fallback={
        <Skeleton className="h-full w-full rounded-2xl" />
      }
    >
      {children}
    </ReactSuspense>
  );
}

/**
 * Suspense wrapper for data tables
 */
export function SuspenseTable({ children }: { children: ReactNode }) {
  return (
    <ReactSuspense
      fallback={(
        <div className="space-y-2">
          <Skeleton className="h-12 w-full" />
          {[...Array.from({ length: 8 })].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      )}
    >
      {children}
    </ReactSuspense>
  );
}

/**
 * Suspense wrapper for charts
 */
export function SuspenseChart({ children }: { children: ReactNode }) {
  return (
    <ReactSuspense
      fallback={(
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/4" />
          <Skeleton className="h-96 w-full rounded-2xl" />
        </div>
      )}
    >
      {children}
    </ReactSuspense>
  );
}

/**
 * Suspense wrapper for forms
 */
export function SuspenseForm({ children }: { children: ReactNode }) {
  return (
    <ReactSuspense
      fallback={(
        <div className="space-y-6">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-12 w-32" />
        </div>
      )}
    >
      {children}
    </ReactSuspense>
  );
}
