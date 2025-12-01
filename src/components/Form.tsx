import { AlertCircle } from 'lucide-react';
import React, { memo } from 'react';

// Helper to generate ARIA IDs
const getAriaIds = (id?: string, hasError?: boolean, hasHelper?: boolean) => {
  if (!id) {
    return {};
  }
  const errorId = hasError ? `${id}-error` : undefined;
  const helperId = hasHelper ? `${id}-helper` : undefined;
  // Combine IDs for aria-describedby
  const describedBy = [errorId, helperId].filter(Boolean).join(' ');
  return { errorId, helperId, describedBy };
};

type InputProps = {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  labelClassName?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<InputProps> = memo(({ label, error, helperText, icon, className = '', labelClassName = '', ...props }) => {
  const id = props.id || props.name;
  const { errorId, helperId, describedBy } = getAriaIds(id, !!error, !!helperText);

  return (
    <div className="w-full">
      {label && <label htmlFor={id} className={`mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300 ${labelClassName}`}>{label}</label>}
      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            {icon}
          </div>
        )}
        <input
          className={`h-11 w-full ${icon ? 'pl-10' : 'px-4'} focus:ring-primary-500/20 focus:border-primary-500 rounded-lg border bg-white py-2.5 text-slate-900 transition-all focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-950 dark:text-white ${error ? 'border-red-500 pr-10 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-300 dark:border-slate-700'} autofill:text-slate-900 autofill:shadow-[0_0_0_100px_white_inset] dark:autofill:text-white dark:autofill:shadow-[0_0_0_100px_#020617_inset] ${className}`}
          aria-invalid={!!error}
          aria-describedby={describedBy || undefined}
          {...props}
        />
        {error && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex animate-pulse items-center pr-3 text-red-500">
            <AlertCircle className="h-5 w-5" />
          </div>
        )}
      </div>
      {helperText && !error && <p id={helperId} className="mt-1 text-xs text-slate-500 dark:text-slate-400">{helperText}</p>}
      {error && (
        <div role="alert" id={errorId} className="animate-fade-in-up mt-1 flex items-center gap-1 text-xs font-medium text-red-500">
          {error}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

type SelectProps = {
  label?: string;
  error?: string;
  helperText?: string;
  options: { value: string; label: string }[];
  icon?: React.ReactNode;
  labelClassName?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select: React.FC<SelectProps> = memo(({ label, error, helperText, options, icon, className = '', labelClassName = '', ...props }) => {
  const id = props.id || props.name;
  const { errorId, helperId, describedBy } = getAriaIds(id, !!error, !!helperText);

  return (
    <div className="w-full">
      {label && <label htmlFor={id} className={`mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300 ${labelClassName}`}>{label}</label>}
      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            {icon}
          </div>
        )}
        <select
          className={`h-11 w-full ${icon ? 'pl-10' : 'px-4'} focus:ring-primary-500/20 focus:border-primary-500 appearance-none rounded-lg border bg-white py-2.5 text-slate-900 transition-all focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-950 dark:text-white ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-300 dark:border-slate-700'} autofill:text-slate-900 autofill:shadow-[0_0_0_100px_white_inset] dark:autofill:text-white dark:autofill:shadow-[0_0_0_100px_#020617_inset] ${className}`}
          aria-invalid={!!error}
          aria-describedby={describedBy || undefined}
          {...props}
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </div>
      {helperText && !error && <p id={helperId} className="mt-1 text-xs text-slate-500 dark:text-slate-400">{helperText}</p>}
      {error && (
        <div role="alert" id={errorId} className="animate-fade-in-up mt-1 flex items-center gap-1 text-xs font-medium text-red-500">
          <AlertCircle className="h-4 w-4" />
          {' '}
          {error}
        </div>
      )}
    </div>
  );
});

Select.displayName = 'Select';

type TextAreaProps = {
  label?: string;
  error?: string;
  helperText?: string;
  labelClassName?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea: React.FC<TextAreaProps> = memo(({ label, error, helperText, className = '', labelClassName = '', ...props }) => {
  const id = props.id || props.name;
  const { errorId, helperId, describedBy } = getAriaIds(id, !!error, !!helperText);

  return (
    <div className="w-full">
      {label && <label htmlFor={id} className={`mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300 ${labelClassName}`}>{label}</label>}
      <textarea
        className={`focus:ring-primary-500/20 focus:border-primary-500 min-h-[120px] w-full resize-y rounded-lg border bg-white px-4 py-2.5 text-slate-900 transition-all focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-950 dark:text-white ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-300 dark:border-slate-700'} autofill:text-slate-900 autofill:shadow-[0_0_0_100px_white_inset] dark:autofill:text-white dark:autofill:shadow-[0_0_0_100px_#020617_inset] ${className}`}
        aria-invalid={!!error}
        aria-describedby={describedBy || undefined}
        {...props}
      />
      {helperText && !error && <p id={helperId} className="mt-1 text-xs text-slate-500 dark:text-slate-400">{helperText}</p>}
      {error && (
        <div role="alert" id={errorId} className="animate-fade-in-up mt-1 flex items-center gap-1 text-xs font-medium text-red-500">
          <AlertCircle className="h-4 w-4" />
          {' '}
          {error}
        </div>
      )}
    </div>
  );
});

TextArea.displayName = 'TextArea';

type CheckboxProps = {
  label: React.ReactNode;
  labelClassName?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Checkbox: React.FC<CheckboxProps> = memo(({ label, className = '', labelClassName = '', ...props }) => (
  <label className="group flex cursor-pointer items-start gap-3">
    <div className="relative mt-0.5 flex items-center">
      <input
        type="checkbox"
        className={`peer checked:border-primary-600 checked:bg-primary-600 hover:border-primary-500 focus:ring-primary-500/20 h-5 w-5 cursor-pointer appearance-none rounded border border-slate-300 shadow-sm transition-all focus:ring-2 focus:outline-none dark:border-slate-600 ${className}`}
        {...props}
      />
      <svg className="pointer-events-none absolute top-1/2 left-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <span className={`text-sm text-slate-600 transition-colors select-none group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-slate-200 ${labelClassName}`}>{label}</span>
  </label>
));

Checkbox.displayName = 'Checkbox';
