import { AlertCircle, Check, ChevronDown } from 'lucide-react';
import React, { memo } from 'react';
import { cn } from '@/libs/utils/cn';

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
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={id}
          className={cn('block text-sm font-medium text-foreground', labelClassName)}
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            {icon}
          </div>
        )}
        <input
          className={cn(
            'flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all',
            icon && 'pl-10',
            error && 'border-destructive focus-visible:ring-destructive',
            className,
          )}
          aria-invalid={!!error}
          aria-describedby={describedBy || undefined}
          {...props}
        />
        {error && (
          <div className="text-destructive pointer-events-none absolute inset-y-0 right-0 flex animate-pulse items-center pr-3">
            <AlertCircle className="h-5 w-5" />
          </div>
        )}
      </div>
      {helperText && !error && <p id={helperId} className="text-muted-foreground text-xs">{helperText}</p>}
      {error && (
        <div role="alert" id={errorId} className="animate-fade-in-up text-destructive flex items-center gap-1 text-xs font-medium">
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
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={id}
          className={cn('block text-sm font-medium text-foreground', labelClassName)}
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            {icon}
          </div>
        )}
        <select
          className={cn(
            'flex h-11 w-full appearance-none rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all',
            icon ? 'pl-10' : 'pl-3',
            'pr-10', // Space for chevron
            error && 'border-destructive focus-visible:ring-destructive',
            className,
          )}
          aria-invalid={!!error}
          aria-describedby={describedBy || undefined}
          {...props}
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <div className="text-muted-foreground pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
          <ChevronDown className="h-4 w-4 opacity-50" />
        </div>
      </div>
      {helperText && !error && <p id={helperId} className="text-muted-foreground text-xs">{helperText}</p>}
      {error && (
        <div role="alert" id={errorId} className="animate-fade-in-up text-destructive flex items-center gap-1 text-xs font-medium">
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
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={id}
          className={cn('block text-sm font-medium text-foreground', labelClassName)}
        >
          {label}
        </label>
      )}
      <textarea
        className={cn(
          'flex min-h-[120px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all resize-y',
          error && 'border-destructive focus-visible:ring-destructive',
          className,
        )}
        aria-invalid={!!error}
        aria-describedby={describedBy || undefined}
        {...props}
      />
      {helperText && !error && <p id={helperId} className="text-muted-foreground text-xs">{helperText}</p>}
      {error && (
        <div role="alert" id={errorId} className="animate-fade-in-up text-destructive flex items-center gap-1 text-xs font-medium">
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
        className={cn(
          'peer h-5 w-5 shrink-0 rounded-md border border-input ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground checked:bg-primary checked:border-primary transition-all appearance-none cursor-pointer shadow-sm',
          className,
        )}
        {...props}
      />
      <Check className="text-primary-foreground pointer-events-none absolute top-1/2 left-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity peer-checked:opacity-100" strokeWidth={3} />
    </div>
    <span className={cn('text-sm text-muted-foreground transition-colors select-none group-hover:text-foreground', labelClassName)}>{label}</span>
  </label>
));

Checkbox.displayName = 'Checkbox';
