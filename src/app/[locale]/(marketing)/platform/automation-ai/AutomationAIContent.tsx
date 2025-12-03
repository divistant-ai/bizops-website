'use client';

import { ArrowRight, BrainCircuit, GitMerge, ScanLine, ShieldAlert, Zap } from 'lucide-react';
import Link from 'next/link';
import { Container, Section } from '@/components/layout';
import { Button } from '@/components/ui';
import { BouncyLink } from '@/components/ui/BouncyLink';
import { FadeIn, FadeInStagger } from '@/components/ui/FadeIn';

export default function AutomationAIContent() {
  return (
    <div className="flex flex-col bg-slate-50 dark:bg-slate-950">
      {/* Hero Section - Premium Dark */}
      <div className="relative overflow-hidden bg-slate-900 py-20 text-white lg:py-24 dark:bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.15),transparent_50%)]"></div>
        <Container size="7xl" className="relative z-10 text-center">
          <FadeIn delay={0.1}>
            <div className="mb-6 inline-flex rounded-2xl bg-slate-800/50 p-3 ring-1 ring-slate-700">
              <Zap className="h-8 w-8 text-indigo-400" />
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h1 className="mb-6 text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
              Biarkan Sistem yang Bekerja,
              {' '}
              <br />
              <span className="text-indigo-400">Bukan Anda.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-300 md:text-xl">
              Kurangi pekerjaan manual yang repetitif hingga 80%. BizOps dilengkapi dengan
              {' '}
              <em className="text-indigo-300">Workflow Builder</em>
              {' '}
              dan
              {' '}
              <em className="text-indigo-300">Applied AI</em>
              {' '}
              yang praktis.
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <BouncyLink href="/demo" className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-8 font-semibold text-slate-900 shadow-lg hover:bg-slate-50">
              Lihat Demo Otomatisasi
            </BouncyLink>
          </FadeIn>
        </Container>
      </div>

      {/* Workflow Automation Grid */}
      <Section className="py-20 lg:py-24">
        <Container size="7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <FadeIn delay={0.1}>
              <div className="flex h-full flex-col justify-center">
                <h2 className="mb-6 text-3xl font-bold text-slate-900 md:text-4xl dark:text-white">
                  Workflow Automation (No-Code Logic)
                </h2>
                <div className="space-y-8">
                  <div className="flex gap-5">
                    <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                      <GitMerge className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">Visual Builder</h3>
                      <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
                        Antarmuka
                        {' '}
                        <em>drag-and-drop</em>
                        {' '}
                        intuitif untuk membuat aturan logika "Jika X maka Y" tanpa perlu coding.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-5">
                    <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400">
                      <ArrowRight className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">Scenario Example</h3>
                      <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
                        "Jika Stok Barang &lt; 10 unit, otomatis buat
                        {' '}
                        <em>Purchase Request</em>
                        {' '}
                        ke Vendor A, kirim email PO, dan notifikasi WA ke Manajer Gudang."
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-5">
                    <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400">
                      <Zap className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">Auto-Assignment</h3>
                      <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
                        Distribusi tugas otomatis. Misal: "Setiap Lead baru dari Jakarta Selatan otomatis di-assign ke Salesman Budi."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2} className="relative">
              {/* Visual Representation / Placeholder for Graphic */}
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-inner lg:aspect-auto lg:h-full dark:border-slate-800 dark:bg-slate-900/50">
                <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                  <span className="text-sm">Workflow Visualizer Graphic</span>
                </div>
                {/* Decorative Elements */}
                <div className="absolute top-12 -right-12 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl"></div>
                <div className="absolute -bottom-12 -left-12 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl"></div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </Section>

      {/* Workflow Automation Grid */}
      <Section className="py-20 lg:py-24">
        <Container size="7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <FadeIn delay={0.1}>
              <div className="flex h-full flex-col justify-center">
                <h2 className="mb-6 text-3xl font-bold text-slate-900 md:text-4xl dark:text-white">
                  Workflow Automation (No-Code Logic)
                </h2>
                <div className="space-y-8">
                  <div className="flex gap-5">
                    <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                      <GitMerge className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">Visual Builder</h3>
                      <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
                        Antarmuka
                        {' '}
                        <em>drag-and-drop</em>
                        {' '}
                        intuitif untuk membuat aturan logika "Jika X maka Y" tanpa perlu coding.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-5">
                    <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400">
                      <ArrowRight className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">Scenario Example</h3>
                      <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
                        "Jika Stok Barang &lt; 10 unit, otomatis buat
                        {' '}
                        <em>Purchase Request</em>
                        {' '}
                        ke Vendor A, kirim email PO, dan notifikasi WA ke Manajer Gudang."
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-5">
                    <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400">
                      <Zap className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">Auto-Assignment</h3>
                      <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
                        Distribusi tugas otomatis. Misal: "Setiap Lead baru dari Jakarta Selatan otomatis di-assign ke Salesman Budi."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2} className="relative">
              {/* Visual Representation / Placeholder for Graphic */}
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-inner lg:aspect-auto lg:h-full dark:border-slate-800 dark:bg-slate-900/50">
                <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                  <span className="text-sm">Workflow Visualizer Graphic</span>
                </div>
                {/* Decorative Elements */}
                <div className="absolute top-12 -right-12 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl"></div>
                <div className="absolute -bottom-12 -left-12 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl"></div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </Section>

      {/* Applied AI Section - Clean Grid */}
      <Section className="bg-slate-50 py-20 lg:py-24 dark:bg-slate-900">
        <Container size="7xl">
          <FadeIn delay={0.1}>
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <div className="mb-4 inline-flex rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700 dark:border-purple-900/30 dark:bg-purple-900/10 dark:text-purple-400">
                Applied AI
              </div>
              <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl dark:text-white">
                Kecerdasan Buatan yang Praktis
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Bukan sekadar
                {' '}
                <em>gimmick</em>
                . Fitur AI kami dirancang untuk menyelesaikan masalah nyata sehari-hari.
              </p>
            </div>
          </FadeIn>

          <FadeInStagger>
            <div className="grid gap-8 sm:grid-cols-3">
              <FadeIn delay={0.1}>
                <div className="group h-full rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-200/50 dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-none">
                  <div className="mb-6 inline-flex rounded-xl bg-purple-50 p-4 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400">
                    <BrainCircuit className="h-7 w-7" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">Smart Forecasting</h3>
                  <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
                    Algoritma prediktif yang menganalisis data penjualan historis dan tren musiman untuk merekomendasikan jumlah
                    {' '}
                    <em>restock</em>
                    {' '}
                    yang optimal bulan depan.
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="group h-full rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-200/50 dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-none">
                  <div className="mb-6 inline-flex rounded-xl bg-blue-50 p-4 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                    <ScanLine className="h-7 w-7" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">OCR Document Parsing</h3>
                  <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
                    Foto invoice/kwitansi dari smartphone langsung ter-
                    <em>extract</em>
                    {' '}
                    datanya. Tidak perlu ketik manual satu per satu. Akurasi 95%+.
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="group h-full rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-red-200/50 dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-none">
                  <div className="mb-6 inline-flex rounded-xl bg-red-50 p-4 text-red-600 dark:bg-red-900/20 dark:text-red-400">
                    <ShieldAlert className="h-7 w-7" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">Anomaly Detection</h3>
                  <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
                    Sistem mendeteksi pola transaksi yang mencurigakan secara real-time untuk mencegah fraud dan pengeluaran tidak wajar.
                  </p>
                </div>
              </FadeIn>
            </div>
          </FadeInStagger>
        </Container>
      </Section>

      {/* Use Cases - Compact Grid */}
      <Section className="py-20 lg:py-24">
        <Container size="7xl">
          <FadeIn delay={0.1}>
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <div className="mb-4 inline-flex rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-medium text-green-700 dark:border-green-900/30 dark:bg-green-900/10 dark:text-green-400">
                Real-World Examples
              </div>
              <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl dark:text-white">
                Contoh Implementasi Nyata
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Lihat bagaimana bisnis menggunakan otomatisasi untuk menghemat waktu dan biaya.
              </p>
            </div>
          </FadeIn>

          <FadeInStagger>
            <div className="grid gap-6 sm:grid-cols-3">
              <FadeIn delay={0.1}>
                <div className="group h-full rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                  <div className="mb-4 inline-flex rounded-xl bg-blue-50 p-3 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                    <Zap className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">Auto-Approval PR</h3>
                  <p className="mb-4 text-base text-slate-600 dark:text-slate-400">
                    PR di bawah Rp 5 juta otomatis disetujui sistem tanpa approval manual.
                  </p>
                  <div className="rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-900/30 dark:bg-green-900/10">
                    <p className="text-sm font-medium text-green-900 dark:text-green-300">
                      ⚡ 3 hari → 30 menit
                    </p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="group h-full rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                  <div className="mb-4 inline-flex rounded-xl bg-purple-50 p-3 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400">
                    <BrainCircuit className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">Smart Lead Distribution</h3>
                  <p className="mb-4 text-base text-slate-600 dark:text-slate-400">
                    Lead baru otomatis di-assign ke salesman berdasarkan wilayah dan workload.
                  </p>
                  <div className="rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-900/30 dark:bg-green-900/10">
                    <p className="text-sm font-medium text-green-900 dark:text-green-300">
                      📈 Conversion +40%
                    </p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="group h-full rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                  <div className="mb-4 inline-flex rounded-xl bg-amber-50 p-3 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400">
                    <ScanLine className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">Expense Claim OCR</h3>
                  <p className="mb-4 text-base text-slate-600 dark:text-slate-400">
                    Karyawan foto struk/invoice, sistem OCR extract data dan auto-fill form.
                  </p>
                  <div className="rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-900/30 dark:bg-green-900/10">
                    <p className="text-sm font-medium text-green-900 dark:text-green-300">
                      ⏱️ Hemat 15 jam/bulan
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </FadeInStagger>
        </Container>
      </Section>

      {/* CTA Section - Consistent with Other Pages */}
      <Section className="bg-slate-900 py-20 dark:bg-slate-950">
        <Container size="5xl" className="text-center">
          <FadeIn>
            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
              Siap untuk Operasional Autopilot?
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-300">
              Jadwalkan demo 30 menit untuk melihat bagaimana otomatisasi dan AI bekerja secara real-time.
            </p>
            <Link href="/demo">
              <Button className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-8 font-semibold text-slate-900 shadow-lg hover:bg-slate-50">
                Jadwalkan Demo Sekarang
              </Button>
            </Link>
          </FadeIn>
        </Container>
      </Section>
    </div>
  );
}
