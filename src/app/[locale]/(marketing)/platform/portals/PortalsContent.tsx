'use client';

import { Check, Globe, ShoppingBag, Truck } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Container, Section } from '@/components/layout';
import { Button } from '@/components/ui';
import { FadeIn, FadeInStagger } from '@/components/ui/FadeIn';

const PortalsContent: React.FC = () => {
  return (
    <div className="flex flex-col bg-slate-50 dark:bg-slate-950">
      {/* Hero Section - Consistent */}
      <Section className="bg-slate-900 py-20 text-white dark:bg-slate-950 lg:py-24">
        <Container size="5xl" className="text-center">
          <FadeIn delay={0.1}>
            <div className="mb-6 inline-flex rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 p-3 shadow-lg shadow-blue-500/30">
              <Globe className="h-8 w-8 text-white" />
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Berhenti Menjadi Admin <br />
              <span className="text-cyan-400">untuk Klien Anda.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-300 md:text-xl">
              Bebaskan tim CS, Sales Admin, dan Purchasing Anda dari pertanyaan berulang. Berikan akses portal mandiri 24/7 kepada mitra bisnis Anda.
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <Link href="/demo">
              <Button className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-8 font-semibold text-slate-900 shadow-lg hover:bg-slate-50">
                Lihat Demo Portal
              </Button>
            </Link>
          </FadeIn>
        </Container>
      </Section>

      {/* Portal Types Grid - Clean Layout */}
      <Section className="py-20 lg:py-24">
        <Container size="6xl">
          <FadeInStagger>
            <div className="grid gap-8 md:grid-cols-2">
              <FadeIn delay={0.1}>
                <div className="group h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-200/50 dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-none">
                  <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 text-white">
                    <div className="mb-4 inline-flex rounded-xl bg-white/20 p-3">
                      <ShoppingBag className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">B2B Customer Portal</h3>
                  </div>
                  <div className="p-8">
                    <p className="mb-6 text-base leading-relaxed text-slate-600 dark:text-slate-400">
                      Memberikan pengalaman layaknya e-commerce B2B kepada klien Anda.
                    </p>
                    <ul className="mb-8 space-y-3">
                      <li className="flex items-start gap-3 text-base text-slate-700 dark:text-slate-300">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />
                        Melihat katalog produk dengan harga khusus kontrak.
                      </li>
                      <li className="flex items-start gap-3 text-base text-slate-700 dark:text-slate-300">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />
                        Menginput order pembelian (Sales Order) mandiri.
                      </li>
                      <li className="flex items-start gap-3 text-base text-slate-700 dark:text-slate-300">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />
                        Download ulang Invoice PDF & lacak status pengiriman.
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full rounded-xl border-slate-300 py-3 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
                      Lihat Demo Customer Portal
                    </Button>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="group h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-200/50 dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-none">
                  <div className="bg-gradient-to-br from-amber-600 to-amber-700 p-8 text-white">
                    <div className="mb-4 inline-flex rounded-xl bg-white/20 p-3">
                      <Truck className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">Supplier / Vendor Portal</h3>
                  </div>
                  <div className="p-8">
                    <p className="mb-6 text-base leading-relaxed text-slate-600 dark:text-slate-400">
                      Mendigitalisasi interaksi dengan supplier untuk transparansi pengadaan.
                    </p>
                    <ul className="mb-8 space-y-3">
                      <li className="flex items-start gap-3 text-base text-slate-700 dark:text-slate-300">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
                        Melihat daftar RFQ (Request for Quotation) terbuka.
                      </li>
                      <li className="flex items-start gap-3 text-base text-slate-700 dark:text-slate-300">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
                        Mengunggah penawaran harga (Bidding) secara kompetitif.
                      </li>
                      <li className="flex items-start gap-3 text-base text-slate-700 dark:text-slate-300">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
                        Cek status pembayaran tagihan tanpa menelepon Finance.
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full rounded-xl border-slate-300 py-3 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
                      Lihat Demo Vendor Portal
                    </Button>
                  </div>
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
              Tingkatkan Kolaborasi Bisnis
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-300">
              Lihat bagaimana portal B2B dapat meningkatkan efisiensi tim dan kepuasan mitra bisnis Anda.
            </p>
            <Link href="/demo">
              <Button className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-8 font-semibold text-slate-900 shadow-lg hover:bg-slate-50">
                Request Demo
              </Button>
            </Link>
          </FadeIn>
        </Container>
      </Section>
    </div>
  );
};

export default PortalsContent;
