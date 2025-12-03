/**
 * Error handling utilities for calculator tools
 */

export type CalculationError = {
  field?: string;
  message: string;
  type: 'validation' | 'calculation' | 'system';
};

/**
 * Safe calculation wrapper with error handling
 */
export function safeCalculate<T>(
  calculationFn: () => T,
  onError?: (error: CalculationError) => void,
): T | null {
  try {
    const result = calculationFn();

    // Check for invalid results
    if (typeof result === 'number') {
      if (!isFinite(result)) {
        const error: CalculationError = {
          message: 'Hasil perhitungan tidak valid. Mohon periksa input Anda.',
          type: 'calculation',
        };
        onError?.(error);
        return null;
      }
    }

    return result;
  } catch (error) {
    const calcError: CalculationError = {
      message: error instanceof Error ? error.message : 'Terjadi kesalahan dalam perhitungan',
      type: 'system',
    };
    onError?.(calcError);
    return null;
  }
}

/**
 * Validate numeric input
 */
export function validateNumber(
  value: string | number,
  options: {
    min?: number;
    max?: number;
    required?: boolean;
    fieldName?: string;
  } = {},
): CalculationError | null {
  const { min, max, required = true, fieldName = 'Field' } = options;

  // Check if empty
  if (value === '' || value === null || value === undefined) {
    if (required) {
      return {
        field: fieldName,
        message: `${fieldName} wajib diisi`,
        type: 'validation',
      };
    }
    return null;
  }

  const numValue = typeof value === 'string' ? Number.parseFloat(value) : value;

  // Check if valid number
  if (isNaN(numValue)) {
    return {
      field: fieldName,
      message: `${fieldName} harus berupa angka`,
      type: 'validation',
    };
  }

  // Check if finite
  if (!isFinite(numValue)) {
    return {
      field: fieldName,
      message: `${fieldName} tidak valid`,
      type: 'validation',
    };
  }

  // Check min
  if (min !== undefined && numValue < min) {
    return {
      field: fieldName,
      message: `${fieldName} minimal ${min}`,
      type: 'validation',
    };
  }

  // Check max
  if (max !== undefined && numValue > max) {
    return {
      field: fieldName,
      message: `${fieldName} maksimal ${max}`,
      type: 'validation',
    };
  }

  return null;
}

/**
 * Validate multiple fields
 */
export function validateFields(
  validations: Array<() => CalculationError | null>,
): CalculationError[] {
  const errors: CalculationError[] = [];

  for (const validation of validations) {
    const error = validation();
    if (error) {
      errors.push(error);
    }
  }

  return errors;
}

/**
 * Format error message for display
 */
export function formatErrorMessage(error: CalculationError): string {
  if (error.field) {
    return `${error.field}: ${error.message}`;
  }
  return error.message;
}

/**
 * Safe division with zero check
 */
export function safeDivide(numerator: number, denominator: number, fallback: number = 0): number {
  if (denominator === 0 || !isFinite(denominator)) {
    return fallback;
  }
  const result = numerator / denominator;
  return isFinite(result) ? result : fallback;
}

/**
 * Safe percentage calculation
 */
export function safePercentage(value: number, total: number, fallback: number = 0): number {
  return safeDivide(value * 100, total, fallback);
}
