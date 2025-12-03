/**
 * Rate Limiting Utilities
 * Simple in-memory rate limiter for forms and API routes
 */

type RateLimitStore = Map<string, { count: number; resetTime: number }>;

const store: RateLimitStore = new Map();

export type RateLimitConfig = {
  /**
   * Unique identifier for the rate limit (e.g., IP address, user ID)
   */
  identifier: string;

  /**
   * Maximum number of requests allowed in the time window
   */
  limit: number;

  /**
   * Time window in seconds
   */
  windowInSeconds: number;
};

export type RateLimitResult = {
  success: boolean;
  remaining: number;
  resetTime: number;
};

/**
 * Check if a request is rate limited
 */
export function checkRateLimit(config: RateLimitConfig): RateLimitResult {
  const now = Date.now();
  const key = config.identifier;
  const windowMs = config.windowInSeconds * 1000;

  // Get or create rate limit entry
  let entry = store.get(key);

  // Reset if window has passed
  if (!entry || now > entry.resetTime) {
    entry = {
      count: 0,
      resetTime: now + windowMs,
    };
    store.set(key, entry);
  }

  // Increment count
  entry.count += 1;

  // Check if limit exceeded
  const success = entry.count <= config.limit;
  const remaining = Math.max(0, config.limit - entry.count);

  return {
    success,
    remaining,
    resetTime: entry.resetTime,
  };
}

/**
 * Get client IP from request headers
 */
export function getClientIp(request: Request): string {
  // Try various headers in order of preference
  const headers = request.headers;

  const forwardedFor = headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() || 'unknown';
  }

  const realIp = headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  const cfConnectingIp = headers.get('cf-connecting-ip');
  if (cfConnectingIp) {
    return cfConnectingIp;
  }

  return 'unknown';
}

/**
 * Clean up old entries (run periodically)
 */
export function cleanupRateLimitStore() {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (now > entry.resetTime) {
      store.delete(key);
    }
  }
}

// Clean up every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupRateLimitStore, 5 * 60 * 1000);
}

/**
 * Preset rate limit configurations
 */
export const RATE_LIMITS = {
  FORM_SUBMISSION: {
    limit: 5,
    windowInSeconds: 60, // 5 submissions per minute
  },
  API_CALL: {
    limit: 30,
    windowInSeconds: 60, // 30 calls per minute
  },
  LOGIN_ATTEMPT: {
    limit: 5,
    windowInSeconds: 300, // 5 attempts per 5 minutes
  },
  DEMO_REQUEST: {
    limit: 3,
    windowInSeconds: 3600, // 3 requests per hour
  },
} as const;
