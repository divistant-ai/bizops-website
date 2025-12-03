'use client';

import { BarChart2, Calendar, FileBarChart, Filter, PieChart, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { Container, Section } from '@/components/layout';
import { Button } from '@/components/ui';
import { FadeIn, FadeInStagger } from '@/components/ui/FadeIn';

export default function AnalyticsContent() {
  return (
    <div className="flex flex-col bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-slate-900 py-20 text-white lg:py-24 dark:bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <Container size="5xl" className="relative z-10 text-center">
          <FadeIn delay={0.1}>
            <div className="mb-6 inline-flex rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 p-3 shadow-lg shadow-blue-500/30">
              <BarChart2 className="h-8 w-8 text-white" />
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h1 className="mb-6 text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
              Laporan Anda, Cara Anda.
              {' '}
              <br />
              <span className="text-cyan-400">Tanpa Coding.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-300 md:text-xl">
              Setiap bisnis punya cara unik melihat data. Jangan terpaku pada laporan standar yang kaku. Dengan
              {' '}
              <em className="text-cyan-300">Report Builder</em>
              , Anda menjadi analis data bagi perusahaan Anda sendiri.
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <Link href="/demo">
              <Button className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-8 font-semibold text-slate-900 shadow-lg hover:bg-slate-50">
                Coba Report Builder
              </Button>
            </Link>
          </FadeIn>
        </Container>
      </div>

      {/* Key Capabilities Grid */}
      <Section className="py-20 lg:py-24">
        <Container size="7xl">
          <FadeIn delay={0.1}>
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <div className="mb-4 inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:border-blue-900/30 dark:bg-blue-900/10 dark:text-blue-400">
                Key Features
              </div>
              <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl dark:text-white">
                Bangun Laporan Sesuai Kebutuhan
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Tools analitik yang fleksibel untuk setiap skenario bisnis.
              </p>
            </div>
          </FadeIn>

          <FadeInStagger>
            <div className="grid gap-8 sm:grid-cols-3">
              <FadeIn delay={0.1}>
                <div className="group h-full rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-200/50 dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-none">
                  <div className="mb-6 inline-flex rounded-xl bg-blue-50 p-4 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                    <PieChart className="h-7 w-7" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">Real-time Dashboard</h3>
                  <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
                    Widget visual yang dapat dikustomisasi dan diperbarui detik demi detik. Grafik Batang, Pie Chart, KPI Card, Heatmap.
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="group h-full rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-200/50 dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-none">
                  <div className="mb-6 inline-flex rounded-xl bg-amber-50 p-4 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400">
                    <Filter className="h-7 w-7" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">Drag-and-Drop Builder</h3>
                  <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
                    Antarmuka intuitif untuk membuat laporan tabular. Pilih kolom, tarik ke kanvas, terapkan filter kompleks tanpa coding.
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="group h-full rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-green-200/50 dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-none">
                  <div className="mb-6 inline-flex rounded-xl bg-green-50 p-4 text-green-600 dark:bg-green-900/20 dark:text-green-400">
                    <Calendar className="h-7 w-7" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">Auto-Schedule Email</h3>
                  <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
                    Buat laporan sekali, jadwalkan pengiriman otomatis. Sistem akan menjalankannya secara disiplin setiap hari/minggu/bulan.
                  </p>
                </div>
              </FadeIn>
            </div>
          </FadeInStagger>
        </Container>
      </Section>

      {/* Report Types - Contextual Layout */}
      <Section className="bg-white py-20 lg:py-24 dark:bg-slate-900">
        <Container size="6xl">
          <FadeIn delay={0.1}>
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <div className="mb-4 inline-flex rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700 dark:border-purple-900/30 dark:bg-purple-900/10 dark:text-purple-400">
                Popular Reports
              </div>
              <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl dark:text-white">
                Contoh Laporan yang Sering Dipakai
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Template siap pakai yang bisa Anda sesuaikan dengan kebutuhan bisnis.
              </p>
            </div>
          </FadeIn>

          <div className="space-y-6">
            <FadeIn delay={0.1}>
              <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 transition-all hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                <div className="flex flex-col gap-6 p-8 md:flex-row md:items-start">
                  <div className="inline-flex shrink-0 rounded-xl bg-blue-50 p-4 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                    <TrendingUp className="h-7 w-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">Sales Performance Report</h3>
                    <p className="mb-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
                      Analisis performa sales per wilayah, per produk, per periode. Bandingkan target vs realisasi, identifikasi top performer dan underperformer.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        Filter by Region
                      </span>
                      <span className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        Group by Product
                      </span>
                      <span className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        Time Comparison
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 transition-all hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                <div className="flex flex-col gap-6 p-8 md:flex-row md:items-start">
                  <div className="inline-flex shrink-0 rounded-xl bg-amber-50 p-4 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400">
                    <FileBarChart className="h-7 w-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">Inventory Movement Report</h3>
                    <p className="mb-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
                      Track pergerakan stok: barang masuk, keluar, transfer antar gudang. Identifikasi slow-moving items dan fast-moving items untuk optimasi inventory.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        Stock Aging
                      </span>
                      <span className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        Turnover Ratio
                      </span>
                      <span className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        Reorder Alert
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 transition-all hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                <div className="flex flex-col gap-6 p-8 md:flex-row md:items-start">
                  <div className="inline-flex shrink-0 rounded-xl bg-green-50 p-4 text-green-600 dark:bg-green-900/20 dark:text-green-400">
                    <BarChart2 className="h-7 w-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">Financial Summary Report</h3>
                    <p className="mb-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
                      Laporan keuangan komprehensif: Profit & Loss, Cash Flow, Balance Sheet. Export ke Excel atau PDF untuk presentasi ke stakeholder.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        Multi-Currency
                      </span>
                      <span className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        Budget vs Actual
                      </span>
                      <span className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        Drill-down
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="bg-slate-900 py-20 dark:bg-slate-950">
        <Container size="5xl" className="text-center">
          <FadeIn>
            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
              Ubah Data Menjadi Insight
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-300">
              Lihat betapa mudahnya membuat laporan custom tanpa perlu bantuan IT atau konsultan.
            </p>
            <Link href="/demo">
              <Button className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-8 font-semibold text-slate-900 shadow-lg hover:bg-slate-50">
                Jadwalkan Demo Analytics
              </Button>
            </Link>
          </FadeIn>
        </Container>
      </Section>
    </div>
  );
}
