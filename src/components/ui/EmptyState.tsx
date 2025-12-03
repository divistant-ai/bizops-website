'use client';

import type { LucideIcon } from 'lucide-react';
import { AlertCircle, FileX, Inbox, Search } from 'lucide-react';

import React, { memo } from 'react';
import { twMerge } from 'tailwind-merge';
import Button from './Button';

type EmptyStateType = 'no-data' | 'no-results' | 'error' | 'empty';

type EmptyStateProps = {
  type?: EmptyStateType;
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
};

const defaultIcons: Record<EmptyStateType, LucideIcon> = {
  'no-data': Inbox,
  'no-results': Search,
  'error': AlertCircle,
  'empty': FileX,
};

const EmptyState: React.FC<EmptyStateProps> = memo(({
  type = 'no-data',
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}) => {
  const Icon = icon || defaultIcons[type];
  const iconColor = type === 'error' ? 'text-red-500 dark:text-red-400' : 'text-slate-400 dark:text-slate-600';

  return (
    <div className={twMerge('flex flex-col items-center justify-center py-16 px-4 text-center', className)}>
      <div className={twMerge('w-16 h-16', iconColor, 'mb-4 flex items-center justify-center')}>
        <Icon className="h-full w-full" strokeWidth={1.5} />
      </div>
      <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">
        {title}
      </h3>
      <p className="mb-6 max-w-md leading-relaxed text-slate-600 dark:text-slate-400">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="primary">
          {actionLabel}
        </Button>
      )}
    </div>
  );
});

EmptyState.displayName = 'EmptyState';

export default EmptyState;
