// Telemetry disabled - OpenTelemetry packages not installed
// This file can be re-enabled when @opentelemetry packages are installed

import { logger } from './logger';

// Stub types
type Span = {
  setAttribute: (key: string, value: string) => void;
  setStatus: (status: { code: string; message?: string }) => void;
  recordException: (error: Error) => void;
  end: () => void;
};

type SpanAttributes = Record<string, string | number | boolean>;

/**
 * Initialize Telemetry (disabled)
 */
export const initTelemetry = () => {
  logger.info('Telemetry: Disabled (packages not installed)');
};

/**
 * Start a manual span (stub)
 */
export const startSpan = (_name: string, _attributes: SpanAttributes = {}): Span => {
  return {
    setAttribute: () => {},
    setStatus: () => {},
    recordException: () => {},
    end: () => {},
  };
};

/**
 * Helper to wrap a function execution in a span (stub)
 */
export const traceAction = async <T>(
  _name: string,
  action: () => Promise<T>,
  _attributes: SpanAttributes = {},
): Promise<T> => {
  return action();
};
