'use client';

import { MessageSquare, ThumbsUp, X } from 'lucide-react';

import React, { useEffect, useState } from 'react';
import { logger } from '@/libs/utils/logger';
import Button from './ui/Button';

const NPSModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'rating' | 'comment' | 'thanks'>('rating');
  const [_rating, setRating] = useState<number | null>(null);

  useEffect(() => {
    // Check if already completed or dismissed recently
    const npsStatus = localStorage.getItem('bizops_nps_status');
    const sessionStart = sessionStorage.getItem('bizops_session_start');

    if (!sessionStart) {
      sessionStorage.setItem('bizops_session_start', Date.now().toString());
    }

    if (npsStatus === 'completed' || npsStatus === 'dismissed') {
      return;
    }

    // Trigger logic: Show after 15 seconds of engagement
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
    localStorage.setItem('bizops_nps_status', 'dismissed');
  };

  const handleRate = (score: number) => {
    setRating(score);
    setStep('comment');
    // In a real app, send score to analytics endpoint here
    if (process.env.NODE_ENV === 'development') {
      logger.log(`[NPS] Score recorded: ${score}`);
    }
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('thanks');
    localStorage.setItem('bizops_nps_status', 'completed');

    // Auto close after showing thanks
    setTimeout(() => {
      setIsOpen(false);
    }, 3000);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="animate-fade-in-up fixed bottom-4 left-4 z-[60] w-full max-w-sm">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl ring-1 ring-black/5 dark:border-slate-800 dark:bg-slate-900">

        {/* Header with Close */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-4 dark:border-slate-800 dark:bg-slate-800/50">
          <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
            <MessageSquare className="text-primary-600 h-4 w-4" />
            {' '}
            Feedback
          </h3>
          <button onClick={handleDismiss} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6">
          {step === 'rating' && (
            <>
              <p className="mb-4 text-sm leading-relaxed font-medium text-slate-700 dark:text-slate-300">
                Seberapa besar kemungkinan Anda merekomendasikan BizOps kepada rekan bisnis Anda?
              </p>
              <div className="mb-4 grid grid-cols-11 gap-1">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <button
                    key={num}
                    onClick={() => handleRate(num)}
                    className={`flex aspect-square items-center justify-center rounded text-xs font-bold transition-all
                      ${num <= 6
                    ? 'bg-slate-50 text-slate-500 hover:bg-red-100 hover:text-red-700 dark:bg-slate-800'
                    : num <= 8
                      ? 'bg-slate-50 text-slate-500 hover:bg-amber-100 hover:text-amber-700 dark:bg-slate-800'
                      : 'bg-slate-50 text-slate-500 hover:bg-green-100 hover:text-green-700 dark:bg-slate-800'}
                    `}
                  >
                    {num}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                <span>Tidak Mungkin</span>
                <span>Sangat Mungkin</span>
              </div>
            </>
          )}

          {step === 'comment' && (
            <form onSubmit={handleSubmitComment}>
              <p className="mb-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                Apa alasan utama penilaian Anda?
              </p>
              <textarea
                className="focus:ring-primary-500 mb-4 h-24 w-full resize-none rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-900 outline-none focus:ring-2 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                placeholder="Ceritakan pengalaman Anda..."
                autoFocus
              >
              </textarea>
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="sm" type="button" onClick={() => setStep('rating')}>Back</Button>
                <Button size="sm" type="submit">Kirim Feedback</Button>
              </div>
            </form>
          )}

          {step === 'thanks' && (
            <div className="py-4 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 animate-bounce items-center justify-center rounded-full bg-green-100 text-green-600">
                <ThumbsUp className="h-6 w-6" />
              </div>
              <h4 className="mb-1 font-bold text-slate-900 dark:text-white">Terima Kasih!</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Masukan Anda membantu kami berkembang.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NPSModal;
