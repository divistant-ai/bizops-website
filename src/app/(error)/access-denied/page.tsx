import type { Metadata } from 'next';
import { ArrowLeft, Lock } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: '403 - Access Denied | BizOps',
  description: 'Anda tidak memiliki izin untuk mengakses halaman ini.',
};

export default function AccessDeniedPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-50 px-4 text-center font-sans dark:bg-slate-950">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-200/20 blur-[120px] dark:bg-slate-800/20" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-2xl">
        <div className="relative mx-auto mb-8 size-24">
          <div className="absolute inset-0 rotate-6 transform rounded-[2rem] bg-slate-200 dark:bg-slate-800" />
          <div className="absolute inset-0 flex items-center justify-center rounded-[2rem] border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
            <Lock className="size-10 text-slate-500 dark:text-slate-400" />
          </div>
          <div className="absolute -top-2 -right-2 flex size-8 items-center justify-center rounded-full border-2 border-white bg-red-500 text-white shadow-lg dark:border-slate-900">
            <span className="text-xs font-bold">403</span>
          </div>
        </div>

        <h1 className="mb-6 text-3xl leading-tight font-extrabold text-slate-900 md:text-5xl dark:text-white">
          Access Denied
        </h1>

        <p className="mx-auto mb-10 max-w-md text-lg leading-relaxed text-slate-600 dark:text-slate-400">
          Anda tidak memiliki izin untuk mengakses halaman ini. Ini mungkin area terbatas untuk Administrator atau
          Partner level tertentu.
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/login">
            <Button size="lg" className="h-14 rounded-2xl px-8 shadow-lg">
              Login with Different Account
            </Button>
          </Link>
          <Link href="/">
            <Button
              variant="outline"
              size="lg"
              className="h-14 rounded-2xl border-slate-300 px-8 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-900"
            >
              <ArrowLeft className="mr-2 size-4" />
              {' '}
              Go Back Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
