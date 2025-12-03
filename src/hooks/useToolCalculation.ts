'use client';

import type { CalculationError } from '@/utils/errorHandling';
import { useCallback, useState } from 'react';
import { safeCalculate } from '@/utils/errorHandling';
import { downloadAsText, formatResultAsText, generateShareText, shareResult } from '@/utils/exportTools';

type UseToolCalculationOptions<T> = {
  toolName: string;
  calculateFn: () => T;
  formatInputs: (result: T) => Record<string, string>;
  formatResults: (result: T) => Record<string, string>;
  formatShareSummary: (result: T) => string;
};

export function useToolCalculation<T>({
  toolName,
  calculateFn,
  formatInputs,
  formatResults,
  formatShareSummary,
}: UseToolCalculationOptions<T>) {
  const [result, setResult] = useState<T | null>(null);
  const [errors, setErrors] = useState<CalculationError[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculate = useCallback(() => {
    setErrors([]);
    setIsCalculating(true);

    // Use setTimeout to show loading state (even if calculation is instant)
    setTimeout(() => {
      const calculatedResult = safeCalculate<T>(calculateFn, (error) => {
        setErrors([error]);
      });

      if (calculatedResult) {
        setResult(calculatedResult);
      }

      setIsCalculating(false);
    }, 100);
  }, [calculateFn]);

  const handleDownload = useCallback(() => {
    if (!result) {
      return;
    }

    const content = formatResultAsText(
      toolName,
      formatInputs(result),
      formatResults(result),
    );

    downloadAsText(content, `${toolName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.txt`);
  }, [result, toolName, formatInputs, formatResults]);

  const handleShare = useCallback(async () => {
    if (!result) {
      return;
    }

    const shareText = generateShareText(toolName, formatShareSummary(result));

    await shareResult(`Hasil ${toolName}`, shareText);
  }, [result, toolName, formatShareSummary]);

  const reset = useCallback(() => {
    setResult(null);
    setErrors([]);
    setIsCalculating(false);
  }, []);

  return {
    result,
    errors,
    isCalculating,
    calculate,
    handleDownload,
    handleShare,
    reset,
  };
}
