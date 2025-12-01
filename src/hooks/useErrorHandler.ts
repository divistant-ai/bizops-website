'use client';

import { useCallback } from 'react';

type ErrorContext = {
  component?: string;
  action?: string;
  userId?: string;
  [key: string]: string | number | boolean | null | undefined;
};

/**
 * Custom hook for handling errors with automatic reporting
 *
 * @example
 * const handleError = useErrorHandler();
 *
 * try {
 *   await riskyOperation();
 * } catch (error) {
 *   handleError(error, { component: 'MyComponent', action: 'fetchData' });
 * }
 */
export const useErrorHandler = () => {
  const handleError = useCallback((error: Error | unknown, context?: ErrorContext) => {
    const errorObj = error instanceof Error ? error : new Error(String(error));

    // Log error
    console.error('Error caught:', errorObj, context);

    // TODO: Integrate with error tracking service (Sentry, etc.)
    // TODO: Track error analytics
  }, []);

  return handleError;
};

/**
 * Hook for async error handling with retry logic
 */
export const useAsyncErrorHandler = () => {
  const handleError = useErrorHandler();

  const executeWithRetry = useCallback(
    async <T>(
      fn: () => Promise<T>,
      options: {
        maxRetries?: number;
        retryDelay?: number;
        onRetry?: (attempt: number) => void;
        context?: ErrorContext;
      } = {},
    ): Promise<T> => {
      const { maxRetries = 3, retryDelay = 1000, onRetry, context } = options;
      let lastError: Error | null = null;

      for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
          return await fn();
        } catch (error) {
          lastError = error instanceof Error ? error : new Error(String(error));

          if (attempt < maxRetries) {
            if (onRetry) {
              onRetry(attempt + 1);
            }
            await new Promise(resolve => setTimeout(resolve, retryDelay * (attempt + 1)));
            continue;
          }

          handleError(lastError, {
            ...context,
            maxRetries,
            finalAttempt: attempt + 1,
          });
          throw lastError;
        }
      }

      throw lastError || new Error('Unknown error');
    },
    [handleError],
  );

  return { executeWithRetry, handleError };
};
