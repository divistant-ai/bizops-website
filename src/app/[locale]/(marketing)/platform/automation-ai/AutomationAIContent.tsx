'use client';

import { ArrowRight, BrainCircuit, GitMerge, ScanLine, ShieldAlert, Zap } from 'lucide-react';
import { Container, Section } from '@/components/layout';
import { Badge, Card, Grid } from '@/components/ui';
import { BouncyLink } from '@/components/ui/BouncyLink';
import { FadeIn } from '@/components/ui/FadeIn';

export default function AutomationAIContent() {
  return (
    <div className="flex flex-col bg-white">
      {/* Hero */}
      <Section className="bg-slate-900 pt-32 pb-20 text-white">
        <Container size="4xl" className="text-center">
          <FadeIn delay={0.1}>
            <div className="mb-6 inline-flex rounded-2xl bg-slate-800 p-3">
              <Zap className="text-primary-400 h-8 w-8" />
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h1 className="mb-6 text-3xl leading-tight font-bold md:text-4xl lg:text-5xl">
              Biarkan Sistem yang Bekerja,
              <br />
              Bukan Anda.
            </h1>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="mx-auto mb-10 max-w-3xl text-xl leading-relaxed text-slate-300">
              Kurangi pekerjaan manual yang repetitif dan membosankan hingga 80%. BizOps dilengkapi dengan mesin
              Otomatisasi (
              <em>Workflow Builder</em>
              ) dan Kecerdasan Buatan (
              <em>Applied AI</em>
              ) yang praktis untuk
              membuat bisnis Anda berjalan secara autopilot.
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <BouncyLink href="/demo" className="h-14 bg-white px-8 text-lg text-slate-900 hover:bg-slate-100">
              Lihat Demo Otomatisasi
            </BouncyLink>
          </FadeIn>
        </Container>
      </Section>

      {/* Workflow Automation */}
      <Section>
        <Container size="7xl">
          <Grid cols={1} lgCols={2} gap={16} className="items-center">
            <FadeIn delay={0.1}>
              <div>
                <h2 className="mb-6 text-2xl leading-tight font-bold text-slate-900 md:text-3xl lg:text-4xl">
                  Workflow Automation (No-Code Logic)
                </h2>
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="mt-1 h-fit rounded-lg bg-blue-50 p-2">
                      <GitMerge className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-bold text-slate-900">Visual Builder</h3>
                      <p className="text-sm text-slate-600">
                        Antarmuka
                        {' '}
                        <em>drag-and-drop</em>
                        {' '}
                        intuitif untuk membuat aturan logika "Jika X maka Y" tanpa
                        perlu menulis satu baris kode pun.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="mt-1 h-fit rounded-lg bg-purple-50 p-2">
                      <ArrowRight className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-bold text-slate-900">Scenario Example</h3>
                      <p className="text-sm text-slate-600">
                        "Jika Stok Barang &lt; 10 unit, otomatis buat
                        {' '}
                        <em>Purchase Request</em>
                        {' '}
                        ke Vendor A, kirim
                        email PO PDF ke vendor, dan kirim notifikasi WhatsApp ke Manajer Gudang."
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="mt-1 h-fit rounded-lg bg-green-50 p-2">
                      <Zap className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-bold text-slate-900">Auto-Assignment</h3>
                      <p className="text-sm text-slate-600">
                        Distribusi tugas otomatis berdasarkan aturan. Misal: "Setiap Lead baru yang berasal dari
                        wilayah Jakarta Selatan otomatis di-
                        <em>assign</em>
                        {' '}
                        ke Salesman Budi."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Visual Placeholder */}
            <FadeIn delay={0.2}>
              <div className="relative flex aspect-square items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 shadow-inner">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-10"></div>
                <div className="relative z-10 w-full max-w-xs rounded-xl bg-white p-6 shadow-lg">
                  <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase">Logic Flow</span>
                    <div className="flex gap-1">
                      <div className="h-2 w-2 rounded-full bg-red-400"></div>
                      <div className="h-2 w-2 rounded-full bg-yellow-400"></div>
                      <div className="h-2 w-2 rounded-full bg-green-400"></div>
                    </div>
                  </div>
                  <div className="space-y-3 text-xs">
                    <div className="rounded border border-slate-200 bg-slate-50 p-2 font-bold text-slate-700">
                      IF Stock &lt; 10
                    </div>
                    <div className="flex justify-center">
                      <ArrowRight className="h-4 w-4 rotate-90 text-slate-400" />
                    </div>
                    <div className="rounded border border-blue-100 bg-blue-50 p-2 font-bold text-blue-700">
                      THEN Create PR
                    </div>
                    <div className="flex justify-center">
                      <ArrowRight className="h-4 w-4 rotate-90 text-slate-400" />
                    </div>
                    <div className="rounded border border-green-100 bg-green-50 p-2 font-bold text-green-700">
                      THEN Email Vendor
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </Grid>
        </Container>
      </Section>

      {/* Applied AI */}
      <Section className="border-t border-slate-200 bg-slate-50">
        <Container size="7xl">
          <FadeIn delay={0.1}>
            <h2 className="mb-16 text-center text-2xl leading-tight font-bold text-slate-900 md:text-3xl lg:text-4xl">
              Applied AI Capabilities
            </h2>
          </FadeIn>

          <Grid cols={1} mdCols={3} gap={8}>
            <FadeIn delay={0.1}>
              <Card className="p-8 transition-shadow hover:shadow-lg">
                <BrainCircuit className="mb-6 h-12 w-12 text-purple-600" />
                <h3 className="mb-3 text-xl font-bold text-slate-900">Smart Forecasting</h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  Algoritma prediktif yang menganalisis data penjualan historis 2 tahun terakhir dan tren musiman untuk
                  merekomendasikan jumlah
                  {' '}
                  <em>restock</em>
                  {' '}
                  yang optimal bulan depan. Mencegah
                  {' '}
                  <em>Overstock</em>
                  {' '}
                  (uang
                  mati) dan
                  {' '}
                  <em>Stockout</em>
                  {' '}
                  (hilang omzet).
                </p>
              </Card>
            </FadeIn>

            <FadeIn delay={0.2}>
              <Card className="p-8 transition-shadow hover:shadow-lg">
                <ScanLine className="mb-6 h-12 w-12 text-blue-600" />
                <h3 className="mb-3 text-xl font-bold text-slate-900">OCR Document Scanner</h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  Foto invoice/kwitansi dari smartphone langsung ter-
                  <em>extract</em>
                  {' '}
                  datanya (Nomor Invoice, Tanggal,
                  Nominal, Vendor). Tidak perlu lagi ketik manual satu per satu. Akurasi 95%+ untuk dokumen berbahasa
                  Indonesia.
                </p>
              </Card>
            </FadeIn>

            <FadeIn delay={0.3}>
              <Card className="p-8 transition-shadow hover:shadow-lg">
                <ShieldAlert className="mb-6 h-12 w-12 text-red-600" />
                <h3 className="mb-3 text-xl font-bold text-slate-900">Anomaly Detection</h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  Sistem mendeteksi pola transaksi yang mencurigakan. Misal: "Pembelian barang X dari Vendor Y naik
                  300% dalam 1 bulan terakhir tanpa ada kenaikan penjualan." Cegah potensi fraud sejak dini.
                </p>
              </Card>
            </FadeIn>
          </Grid>
        </Container>
      </Section>

      {/* Use Cases */}
      <Section>
        <Container size="7xl">
          <FadeIn delay={0.1}>
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <Badge className="mb-4">Real-World Examples</Badge>
              <h2 className="mb-6 text-3xl font-bold text-slate-900 md:text-4xl">Contoh Implementasi Nyata</h2>
              <p className="text-lg text-slate-600">
                Lihat bagaimana bisnis lain menggunakan otomatisasi untuk menghemat waktu dan biaya.
              </p>
            </div>
          </FadeIn>

          <div className="space-y-6">
            <FadeIn delay={0.1}>
              <div className="rounded-2xl border border-slate-200 bg-white p-8">
                <div className="mb-4 flex items-start gap-4">
                  <div className="bg-primary-50 text-primary-600 rounded-xl p-3">
                    <Zap className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-bold text-slate-900">Auto-Approval Purchase Request</h3>
                    <p className="text-slate-600">
                      <strong>Skenario:</strong>
                      {' '}
                      PR di bawah Rp 5 juta otomatis disetujui oleh sistem tanpa perlu
                      approval manual. PR di atas Rp 5 juta masuk ke approval manager.
                    </p>
                    <p className="mt-2 text-sm text-slate-500">
                      <strong>Hasil:</strong>
                      {' '}
                      Waktu proses procurement turun dari 3 hari menjadi 30 menit.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="rounded-2xl border border-slate-200 bg-white p-8">
                <div className="mb-4 flex items-start gap-4">
                  <div className="bg-primary-50 text-primary-600 rounded-xl p-3">
                    <BrainCircuit className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-bold text-slate-900">Smart Lead Distribution</h3>
                    <p className="text-slate-600">
                      <strong>Skenario:</strong>
                      {' '}
                      Lead baru dari website otomatis di-assign ke salesman berdasarkan
                      wilayah dan workload saat ini. Salesman dengan lead paling sedikit mendapat prioritas.
                    </p>
                    <p className="mt-2 text-sm text-slate-500">
                      <strong>Hasil:</strong>
                      {' '}
                      Response time ke customer turun 70%, conversion rate naik 40%.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="rounded-2xl border border-slate-200 bg-white p-8">
                <div className="mb-4 flex items-start gap-4">
                  <div className="bg-primary-50 text-primary-600 rounded-xl p-3">
                    <ScanLine className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-bold text-slate-900">Expense Claim Automation</h3>
                    <p className="text-slate-600">
                      <strong>Skenario:</strong>
                      {' '}
                      Karyawan foto struk/invoice dari HP, sistem OCR extract data, auto-fill
                      form expense claim, kirim ke approval manager via email.
                    </p>
                    <p className="mt-2 text-sm text-slate-500">
                      <strong>Hasil:</strong>
                      {' '}
                      Proses claim dari 2 minggu menjadi 2 hari. Admin finance hemat 15 jam/bulan.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="border-t border-slate-200 bg-slate-50">
        <Container size="4xl" className="text-center">
          <FadeIn delay={0.1}>
            <h2 className="mb-8 text-4xl leading-tight font-bold text-slate-900 md:text-5xl">
              Siap untuk Operasional Autopilot?
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mx-auto mb-12 max-w-2xl text-xl text-slate-600">
              Jadwalkan demo 30 menit untuk melihat bagaimana otomatisasi dan AI bekerja secara real-time di bisnis
              Anda.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <BouncyLink href="/demo" className="shadow-primary-500/20 h-16 px-10 text-xl shadow-xl">
                Jadwalkan Demo Sekarang
              </BouncyLink>
              <BouncyLink href="/contact" className="h-16 bg-white px-10 text-xl hover:bg-slate-50">
                Hubungi Sales
              </BouncyLink>
            </div>
          </FadeIn>
        </Container>
      </Section>
    </div>
  );
}
