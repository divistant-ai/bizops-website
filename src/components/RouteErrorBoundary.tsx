'use client';

import type { ErrorInfo, ReactNode } from 'react';
import * as Sentry from '@sentry/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { usePathname } from '@/libs/I18nNavigation';
import { logger } from '@/libs/utils/logger';
import { trackError } from '@/libs/utils/tracking';

type RouteErrorBoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
};

type RouteErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  retryCount: number;
};

export class RouteErrorBoundary extends React.Component<
  RouteErrorBoundaryProps,
  RouteErrorBoundaryState
> {
  private location: string = '';

  constructor(props: RouteErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0,
    };
  }

  public static getDerivedStateFromError(error: Error): Partial<RouteErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { onError } = this.props;

    // Log error
    logger.error('Route Error:', error, errorInfo);

    // Track error
    trackError(error, {
      route: this.location,
      component_stack: errorInfo.componentStack,
      retry_count: this.state.retryCount,
    });

    // Report to Sentry
    try {
      Sentry.captureException(error, {
        contexts: {
          react: {
            componentStack: errorInfo.componentStack,
          },
          route: {
            path: this.location,
          },
        },
        tags: {
          errorBoundary: 'route',
          retryCount: this.state.retryCount,
        },
      });
    } catch (sentryError) {
      logger.warn('Sentry error reporting failed:', sentryError);
    }

    // Call custom error handler if provided
    if (onError) {
      onError(error, errorInfo);
    }

    // Store error info for display
    this.setState({ errorInfo });
  }

  private handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: this.state.retryCount + 1,
    });
  };

  public override render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Use ErrorBoundary component for error display
      return (
        <div className="flex min-h-screen items-center justify-center p-4">
          <div className="max-w-2xl text-center">
            <h1 className="mb-4 text-4xl font-bold text-red-600 dark:text-red-400">
              Something went wrong
            </h1>
            <p className="mb-6 text-slate-600 dark:text-slate-400">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={this.handleReset}
              className="bg-primary-600 hover:bg-primary-700 rounded-lg px-6 py-3 text-white transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return <RouteErrorBoundaryWrapper boundary={this}>{this.props.children}</RouteErrorBoundaryWrapper>;
  }
}

// Wrapper component to access hooks
const RouteErrorBoundaryWrapper: React.FC<{
  boundary: RouteErrorBoundary;
  children: ReactNode;
}> = ({ boundary, children }) => {
  const router = useRouter();
  const location = usePathname();

  React.useEffect(() => {
    // Inject navigate and location into boundary
    (boundary as any).navigate = (path: string) => router.push(path);
    (boundary as any).location = location;
  }, [router, location, boundary]);

  return <>{children}</>;
};

export default RouteErrorBoundary;
