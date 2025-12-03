'use client';

import type { Metadata } from 'next';
import { ArrowRight, FileText, HelpCircle, Home, LogIn } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: '404 - Page Not Found | BizOps',
  description: 'Halaman yang Anda cari tidak ditemukan.',
};

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-50 px-4 text-center font-sans">
      {/* Abstract Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bg-primary-500/10 absolute -top-[10%] -left-[10%] size-[500px] rounded-full blur-[120px]" />
        <div className="absolute -right-[10%] -bottom-[10%] size-[500px] rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 size-[800px] -translate-x-1/2 -translate-y-1/2 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl">
        <div className="text-[10rem] leading-none font-black tracking-tighter text-slate-300 select-none md:text-[14rem]">
          404
        </div>

        <div className="relative -mt-16 md:-mt-24">
          <div className="relative z-10 mb-8 inline-flex size-24 items-center justify-center rounded-3xl border-4 border-slate-100 bg-white shadow-2xl">
            <span className="animate-bounce text-5xl">🤔</span>
          </div>

          <h1 className="mb-6 text-3xl leading-tight font-extrabold text-slate-900 md:text-5xl">
            Halaman Ini Sedang
            {' '}
            <br />
            <span className="from-primary-500 bg-gradient-to-r to-indigo-500 bg-clip-text text-transparent">
              "Cuti Di Luar Tanggungan"
            </span>
          </h1>
          <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl">
            Seperti karyawan yang butuh istirahat sejenak, halaman yang Anda cari sepertinya sedang tidak ada di
            tempat, telah dipindahkan, atau tautannya sudah kadaluarsa.
          </p>

          <div className="mb-16 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/">
              <Button
                size="lg"
                className="shadow-primary-500/10 hover:shadow-primary-500/20 h-14 rounded-2xl px-8 text-lg shadow-lg"
              >
                Kembali ke Dashboard
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.history.back()}
              className="h-14 rounded-2xl border-slate-300 px-8 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-900"
            >
              Kembali Sebelumnya
            </Button>
          </div>

          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 text-left md:grid-cols-4">
            <Link
              href="/platform"
              className="group hover:border-primary-200 dark:hover:border-primary-800 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700 transition-transform group-hover:scale-110 dark:bg-blue-900/30 dark:text-blue-400">
                <Home className="size-5" />
              </div>
              <div className="mb-1 font-bold text-slate-900 dark:text-white">Produk</div>
              <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                Lihat solusi
                {' '}
                <ArrowRight className="ml-1 size-3 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </Link>
            <Link
              href="/blog"
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-purple-200 hover:bg-purple-50 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-purple-800 dark:hover:bg-purple-900/20"
            >
              <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-purple-100 text-purple-700 transition-transform group-hover:scale-110 dark:bg-purple-900/30 dark:text-purple-400">
                <FileText className="size-5" />
              </div>
              <div className="mb-1 font-bold text-slate-900 dark:text-white">Blog</div>
              <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                Baca wawasan
                {' '}
                <ArrowRight className="ml-1 size-3 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </Link>
            <Link
              href="/contact"
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-emerald-200 hover:bg-emerald-50 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-800 dark:hover:bg-emerald-900/20"
            >
              <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 transition-transform group-hover:scale-110 dark:bg-emerald-900/30 dark:text-emerald-400">
                <HelpCircle className="size-5" />
              </div>
              <div className="mb-1 font-bold text-slate-900 dark:text-white">Support</div>
              <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                Hubungi kami
                {' '}
                <ArrowRight className="ml-1 size-3 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </Link>
            <Link
              href="/login"
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-orange-200 hover:bg-orange-50 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-orange-800 dark:hover:bg-orange-900/20"
            >
              <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-orange-100 text-orange-700 transition-transform group-hover:scale-110 dark:bg-orange-900/30 dark:text-orange-400">
                <LogIn className="size-5" />
              </div>
              <div className="mb-1 font-bold text-slate-900 dark:text-white">Login</div>
              <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                Masuk akun
                {' '}
                <ArrowRight className="ml-1 size-3 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
