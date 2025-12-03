import type { CalculationError } from '@/utils/errorHandling';
import { AlertCircle } from 'lucide-react';
import { formatErrorMessage } from '@/utils/errorHandling';

type ErrorDisplayProps = {
  errors: CalculationError[];
  className?: string;
};

export default function ErrorDisplay({ errors, className = '' }: ErrorDisplayProps) {
  if (errors.length === 0) {
    return null;
  }

  return (
    <div className={`rounded-lg border-l-4 border-red-500 bg-red-50 p-4 ${className}`}>
      <div className="flex items-start gap-3">
        <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-600" />
        <div>
          <p className="font-semibold text-red-900">Terjadi Kesalahan:</p>
          <ul className="mt-1 list-inside list-disc text-sm text-red-700">
            {errors.map((error, idx) => (
              <li key={idx}>{formatErrorMessage(error)}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
