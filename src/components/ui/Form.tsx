import React from 'react';
import { twMerge } from 'tailwind-merge';

type InputProps = {
  label?: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ ref, className, label, error, ...props }: InputProps & { ref?: React.RefObject<HTMLInputElement | null> }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={twMerge(
          'w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed',
          error && 'border-red-500 focus:ring-red-500',
          className,
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};
Input.displayName = 'Input';

type TextAreaProps = {
  label?: string;
  error?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea = ({ ref, className, label, error, ...props }: TextAreaProps & { ref?: React.RefObject<HTMLTextAreaElement | null> }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        className={twMerge(
          'w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed',
          error && 'border-red-500 focus:ring-red-500',
          className,
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};
TextArea.displayName = 'TextArea';

type SelectProps = {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = ({ ref, className, label, error, options, ...props }: SelectProps & { ref?: React.RefObject<HTMLSelectElement | null> }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          className={twMerge(
            'w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed appearance-none',
            error && 'border-red-500 focus:ring-red-500',
            className,
          )}
          {...props}
        >
          <option value="" disabled selected>Pilih opsi...</option>
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-slate-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
        </div>
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};
Select.displayName = 'Select';

type CheckboxProps = {
  label: React.ReactNode;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Checkbox = ({ ref, className, label, error, ...props }: CheckboxProps & { ref?: React.RefObject<HTMLInputElement | null> }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="flex cursor-pointer items-start gap-3">
        <div className="relative flex items-center">
          <input
            type="checkbox"
            ref={ref}
            className={twMerge(
              'peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 transition-all checked:border-blue-600 checked:bg-blue-600 focus:ring-2 focus:ring-blue-500/20',
              className,
            )}
            {...props}
          />
          <svg
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <span className="text-sm select-none">{label}</span>
      </label>
      {error && <p className="ml-8 text-xs text-red-500">{error}</p>}
    </div>
  );
};
Checkbox.displayName = 'Checkbox';
