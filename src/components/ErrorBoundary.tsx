'use client';

import type { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import { Component } from 'react';
import { isDev } from '@/libs/utils/env';
import { logger } from '@/libs/utils/logger';
import { trackError } from '@/libs/utils/tracking';
import Button from './ui/Button';

type ErrorBoundaryProps = {
  children?: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public override state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error('Uncaught error:', error, errorInfo);

    // Track error
    trackError(error, {
      component_stack: errorInfo.componentStack,
      error_boundary: 'root',
    });

    // TODO: Report to Sentry if available
    // try {
    //   Sentry.captureException(error, {
    //     contexts: {
    //       react: {
    //         componentStack: errorInfo.componentStack,
    //       },
    //     },
    //     tags: {
    //       errorBoundary: 'root',
    //     },
    //   });
    // } catch (sentryError) {
    //   logger.warn('Sentry error reporting failed:', sentryError);
    // }
  }

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6 text-center transition-colors duration-300 dark:bg-slate-900">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-700 dark:bg-slate-800">
            <div className="mx-auto mb-6 flex h-16 w-16 animate-bounce items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
              <AlertTriangle className="h-8 w-8" />
            </div>

            <h1 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
              Something went wrong.
            </h1>
            <p className="mb-8 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              We've encountered an unexpected error. Our engineering team has been notified automatically.
            </p>

            <div className="flex flex-col gap-3">
              <Button
                onClick={() => window.location.reload()}
                fullWidth
                className="flex items-center justify-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                {' '}
                Reload Application
              </Button>
              <Button
                variant="ghost"
                onClick={() => window.location.href = '/'}
                className="flex items-center justify-center gap-2"
              >
                <Home className="h-4 w-4" />
                Return to Homepage
              </Button>
            </div>

            {/* DEBUG MODE: Show Error Details */}
            {this.state.error && isDev() && (
              <details className="mt-8 w-full rounded-lg border border-slate-200 bg-slate-100 p-4 dark:border-slate-800 dark:bg-slate-950">
                <summary className="mb-2 cursor-pointer text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Error Details (Development Only)
                </summary>
                <div className="font-mono text-xs break-all text-red-600 dark:text-red-400">
                  <p className="mb-2">{this.state.error.toString()}</p>
                  {this.state.error.stack && (
                    <pre className="max-h-40 overflow-auto text-[10px] whitespace-pre-wrap text-slate-500">
                      {this.state.error.stack}
                    </pre>
                  )}
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Lighter Error Boundary for specific sections/widgets
export class SectionErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public override state: ErrorBoundaryState = { hasError: false, error: null };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error('Section Error:', error, errorInfo);

    trackError(error, {
      component_stack: errorInfo.componentStack,
      error_boundary: 'section',
    });

    // TODO: Report to Sentry
  }

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center dark:border-slate-800 dark:bg-slate-900">
          <AlertTriangle className="mx-auto mb-2 h-6 w-6 text-slate-400" />
          <p className="mb-3 text-sm text-slate-500 dark:text-slate-400">
            Gagal memuat bagian ini.
          </p>
          <Button
            size="sm"
            variant="outline"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Coba Lagi
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}
