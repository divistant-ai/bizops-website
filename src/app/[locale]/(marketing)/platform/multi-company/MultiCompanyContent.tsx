'use client';

import { FileText, Key, Network, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui';

const MultiCompanyContent: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-slate-900 py-24 text-center text-white">
        <div className="mx-auto max-w-4xl px-4">
          <div className="mb-6 inline-flex rounded-2xl bg-slate-800 p-3">
            <Network className="text-primary-400 h-8 w-8" />
          </div>
          <h1 className="mb-6 text-3xl leading-tight font-bold md:text-4xl lg:text-5xl">
            Satu Platform untuk
            <br />
            Seluruh Grup Bisnis Anda.
          </h1>
          <p className="mx-auto mb-10 max-w-3xl text-xl leading-relaxed text-slate-300">
            Punya banyak PT, CV, atau unit bisnis berbeda? Jangan kelola mereka di pulau-pulau
            terpisah. Satukan manajemen grup perusahaan Anda dengan struktur
            {' '}
            <em>Multi-Company</em>
            {' '}
            yang
            {' '}
            <em>native</em>
            .
          </p>
          <Link href="/demo?plan=enterprise">
            <Button size="lg" variant="white">
              Demo Struktur Holding
            </Button>
          </Link>
        </div>
      </section>

      {/* Key Features */}
      <section className="bg-white py-24 transition-colors dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <div className="text-center md:text-left">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 md:mx-0 dark:bg-blue-900/30 dark:text-blue-400">
                <Key className="h-8 w-8" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">
                Unified Login & Access
              </h3>
              <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                Cukup satu
                {' '}
                <em>username</em>
                {' '}
                untuk mengakses data PT A, PT B, dan CV C. Pindah
                antar perusahaan semudah ganti saluran TV, namun hak akses data tetap terpisah
                secara ketat demi keamanan dan kerahasiaan antar unit.
              </p>
            </div>

            <div className="text-center md:text-left">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-green-600 md:mx-0 dark:bg-green-900/30 dark:text-green-400">
                <FileText className="h-8 w-8" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">
                Financial Consolidation
              </h3>
              <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                Lupakan proses 'VLOOKUP' Excel yang memusingkan di akhir bulan. BizOps menarik data
                Neraca dan Laba Rugi dari seluruh anak perusahaan dan menyajikannya dalam satu
                Laporan Konsolidasi Grup secara
                {' '}
                <em>real-time</em>
                .
              </p>
            </div>

            <div className="text-center md:text-left">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 md:mx-0 dark:bg-purple-900/30 dark:text-purple-400">
                <RefreshCw className="h-8 w-8" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">
                Inter-Company Transactions
              </h3>
              <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                Otomatisasi transaksi internal. Saat PT A menjual barang ke PT B, sistem otomatis
                membuat
                {' '}
                <em>Sales Invoice</em>
                {' '}
                di pembukuan PT A dan
                {' '}
                <em>Purchase Invoice</em>
                {' '}
                di pembukuan PT B secara bersamaan. Hemat waktu input dan eliminasi selisih
                pencatatan.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MultiCompanyContent;
