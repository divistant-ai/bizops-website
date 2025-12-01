'use client';

import { Check, Frown, Meh, Smile } from 'lucide-react';

import React, { useEffect, useState } from 'react';

type QuickFeedbackProps = {
  contextId: string; // Unique ID for the page/section
};

const QuickFeedback: React.FC<QuickFeedbackProps> = ({ contextId }) => {
  const [rating, setRating] = useState<'happy' | 'neutral' | 'sad' | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(`bizops_feedback_${contextId}`);
    if (saved) {
      setRating(saved as any);
    }
  }, [contextId]);

  const handleRate = (value: 'happy' | 'neutral' | 'sad') => {
    setRating(value);
    localStorage.setItem(`bizops_feedback_${contextId}`, value);
    // In a real app, fire analytics event here
  };

  if (rating) {
    return (
      <div className="animate-fade-in-up mx-auto flex w-fit items-center gap-2 rounded-full border border-green-100 bg-green-50 px-4 py-2 text-sm text-green-600">
        <Check className="h-4 w-4" />
        {' '}
        Terima kasih atas feedback Anda!
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-sm flex-col items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/50">
      <span className="text-xs font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400">Apakah halaman ini membantu?</span>
      <div className="flex gap-4">
        <button
          onClick={() => handleRate('sad')}
          className="rounded-full p-2 text-slate-400 transition-colors hover:bg-red-100 hover:text-red-600"
          aria-label="Tidak membantu"
        >
          <Frown className="h-6 w-6" />
        </button>
        <button
          onClick={() => handleRate('neutral')}
          className="rounded-full p-2 text-slate-400 transition-colors hover:bg-amber-100 hover:text-amber-600"
          aria-label="Biasa saja"
        >
          <Meh className="h-6 w-6" />
        </button>
        <button
          onClick={() => handleRate('happy')}
          className="rounded-full p-2 text-slate-400 transition-colors hover:bg-green-100 hover:text-green-600"
          aria-label="Sangat membantu"
        >
          <Smile className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default QuickFeedback;
