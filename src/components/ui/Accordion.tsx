'use client';

import { Minus, Plus } from 'lucide-react';
import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Typography from './Typography';

type AccordionProps = {
  question: string;
  answer: string;
  className?: string;
};

const Accordion: React.FC<AccordionProps> = ({ question, answer, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={twMerge('bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all hover:border-purple-300 dark:hover:border-purple-700', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={isOpen}
      >
        <Typography variant="h3" as="h3" className="text-lg font-bold text-slate-900 dark:text-white">{question}</Typography>
        <div className={twMerge(
          'p-2 rounded-full transition-colors',
          isOpen ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400',
        )}
        >
          {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </div>
      </button>
      {isOpen && (
        <div className="border-t border-slate-200 px-6 pt-4 pb-6 leading-relaxed text-slate-600 dark:border-slate-800 dark:text-slate-400">
          {answer}
        </div>
      )}
    </div>
  );
};

export default Accordion;
