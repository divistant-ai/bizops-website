'use client';

import { FileText, Key, Network, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Container, Section } from '@/components/layout';
import { Button } from '@/components/ui';
import { FadeIn, FadeInStagger } from '@/components/ui/FadeIn';

const MultiCompanyContent: React.FC = () => {
  return (
    <div className="flex flex-col bg-slate-50 dark:bg-slate-950">
      {/* Hero Section - Consistent with Platform */}
      <Section className="bg-slate-900 py-20 text-white dark:bg-slate-950 lg:py-24">
        <Container size="5xl" className="text-center">
          <FadeIn delay={0.1}>
            <div className="mb-6 inline-flex rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 p-3 shadow-lg shadow-purple-500/30">
              <Network className="h-8 w-8 text-white" />
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Satu Platform untuk <br />
              <span className="text-purple-400">Seluruh Grup Bisnis Anda.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-300 md:text-xl">
              Punya banyak PT, CV, atau unit bisnis berbeda? Satukan manajemen grup perusahaan Anda dengan struktur <em className="text-purple-300">Multi-Company</em> yang <em className="text-purple-300">native</em>.
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <Link href="/demo?plan=enterprise">
              <Button className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-8 font-semibold text-slate-900 shadow-lg hover:bg-slate-50">
                Demo Struktur Holding
              </Button>
            </Link>
          </FadeIn>
        </Container>
      </Section>

      {/* Key Features Grid - Consistent Layout */}
      <Section className="py-20 lg:py-24">
        <Container size="7xl">
          <FadeInStagger>
            <div className="grid gap-8 sm:grid-cols-3">
              <FadeIn delay={0.1}>
                <div className="group h-full rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-200/50 dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-none">
                  <div className="mb-6 inline-flex rounded-xl bg-blue-50 p-4 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                    <Key className="h-7 w-7" />
                  </div>
                  <h3 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">
                    Unified Login & Access
                  </h3>
                  <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
                    Cukup satu <em>username</em> untuk mengakses data PT A, PT B, dan CV C. Pindah antar perusahaan semudah ganti saluran TV, namun hak akses data tetap terpisah secara ketat.
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="group h-full rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-green-200/50 dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-none">
                  <div className="mb-6 inline-flex rounded-xl bg-green-50 p-4 text-green-600 dark:bg-green-900/20 dark:text-green-400">
                    <FileText className="h-7 w-7" />
                  </div>
                  <h3 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">
                    Financial Consolidation
                  </h3>
                  <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
                    Lupakan proses 'VLOOKUP' Excel yang memusingkan. BizOps menarik data Neraca dan Laba Rugi dari seluruh anak perusahaan dan menyajikannya dalam satu Laporan Konsolidasi Grup secara <em>real-time</em>.
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="group h-full rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-200/50 dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-none">
                  <div className="mb-6 inline-flex rounded-xl bg-purple-50 p-4 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400">
                    <RefreshCw className="h-7 w-7" />
                  </div>
                  <h3 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">
                    Inter-Company Transactions
                  </h3>
                  <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
                    Otomatisasi transaksi internal. Saat PT A menjual barang ke PT B, sistem otomatis membuat <em>Sales Invoice</em> di pembukuan PT A dan <em>Purchase Invoice</em> di PT B secara bersamaan.
                  </p>
                </div>
              </FadeIn>
            </div>
          </FadeInStagger>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="bg-slate-900 py-20 dark:bg-slate-950">
        <Container size="5xl" className="text-center">
          <FadeIn>
            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
              Kelola Grup Bisnis dengan Efisien
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-300">
              Jadwalkan demo untuk melihat bagaimana multi-company management bekerja untuk bisnis Anda.
            </p>
            <Link href="/demo?plan=enterprise">
              <Button className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-8 font-semibold text-slate-900 shadow-lg hover:bg-slate-50">
                Request Demo Enterprise
              </Button>
            </Link>
          </FadeIn>
        </Container>
      </Section>
    </div>
  );
};

export default MultiCompanyContent;
