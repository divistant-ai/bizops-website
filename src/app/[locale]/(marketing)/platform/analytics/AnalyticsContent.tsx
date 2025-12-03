'use client';

import { BarChart2, Calendar, FileBarChart, Filter, PieChart, TrendingUp } from 'lucide-react';
import { Container, Section } from '@/components/layout';
import { Badge, Card, Grid } from '@/components/ui';
import { BouncyLink } from '@/components/ui/BouncyLink';
import { FadeIn } from '@/components/ui/FadeIn';

export default function AnalyticsContent() {
  return (
    <div className="flex flex-col bg-white">
      {/* Hero */}
      <Section className="bg-slate-900 pt-32 pb-20 text-white">
        <Container size="4xl" className="text-center">
          <FadeIn delay={0.1}>
            <div className="mb-6 inline-flex rounded-2xl bg-slate-800 p-3">
              <BarChart2 className="text-primary-400 h-8 w-8" />
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h1 className="mb-6 text-3xl leading-tight font-bold md:text-4xl lg:text-5xl">
              Laporan Anda, Cara Anda.
              <br />
              Tanpa Coding.
            </h1>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="mx-auto mb-10 max-w-3xl text-xl leading-relaxed text-slate-300">
              Setiap bisnis punya cara unik melihat data. Jangan terpaku pada laporan standar yang kaku. Dengan
              {' '}
              <em>Report Builder</em>
              , Anda menjadi analis data bagi perusahaan Anda sendiri.
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <BouncyLink href="/demo" className="h-14 bg-white px-8 text-lg text-slate-900 hover:bg-slate-100">
              Coba Report Builder
            </BouncyLink>
          </FadeIn>
        </Container>
      </Section>

      {/* Key Capabilities */}
      <Section>
        <Container size="7xl">
          <Grid cols={1} mdCols={3} gap={8}>
            <FadeIn delay={0.1}>
              <Card className="p-8">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <PieChart className="h-6 w-6" />
                </div>
                <h3 className="mb-4 text-xl font-bold text-slate-900">Real-time Dashboard</h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  Widget visual (Grafik Batang, Pie Chart, KPI Card, Heatmap) yang dapat dikustomisasi dan diperbarui
                  detik demi detik. Pantau kesehatan bisnis dalam satu pandangan.
                </p>
              </Card>
            </FadeIn>

            <FadeIn delay={0.2}>
              <Card className="p-8">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                  <Filter className="h-6 w-6" />
                </div>
                <h3 className="mb-4 text-xl font-bold text-slate-900">Drag-and-Drop Report Builder</h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  Antarmuka intuitif untuk membuat laporan tabular. Pilih kolom data yang diinginkan (misal: "Nama
                  Sales", "Wilayah", "Total Omzet"), tarik ke kanvas, terapkan filter kompleks, dan lihat hasilnya
                  seketika.
                </p>
              </Card>
            </FadeIn>

            <FadeIn delay={0.3}>
              <Card className="p-8">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600">
                  <Calendar className="h-6 w-6" />
                </div>
                <h3 className="mb-4 text-xl font-bold text-slate-900">Auto-Schedule Email</h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  Buat laporan sekali, lalu jadwalkan pengiriman otomatis. "Kirim laporan Penjualan Mingguan ini ke
                  Email Direksi setiap Senin pagi jam 08:00." Sistem akan menjalankannya secara disiplin.
                </p>
              </Card>
            </FadeIn>
          </Grid>
        </Container>
      </Section>

      {/* Report Types */}
      <Section className="bg-slate-50">
        <Container size="7xl">
          <FadeIn delay={0.1}>
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <Badge className="mb-4">Report Gallery</Badge>
              <h2 className="mb-6 text-3xl font-bold text-slate-900 md:text-4xl">Jenis Laporan yang Bisa Dibuat</h2>
              <p className="text-lg text-slate-600">
                Dari laporan sederhana hingga analisis kompleks, semua bisa dibuat tanpa coding.
              </p>
            </div>
          </FadeIn>

          <div className="space-y-6">
            <FadeIn delay={0.1}>
              <div className="rounded-2xl border border-slate-200 bg-white p-8">
                <div className="flex items-start gap-4">
                  <div className="bg-primary-50 text-primary-600 rounded-xl p-3">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-bold text-slate-900">Sales Performance Report</h3>
                    <p className="mb-3 text-slate-600">
                      Analisis performa sales per wilayah, per produk, per periode. Bandingkan target vs realisasi,
                      identifikasi top performer dan underperformer.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                        Filter by Region
                      </span>
                      <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                        Group by Product
                      </span>
                      <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                        Time Comparison
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="rounded-2xl border border-slate-200 bg-white p-8">
                <div className="flex items-start gap-4">
                  <div className="bg-primary-50 text-primary-600 rounded-xl p-3">
                    <FileBarChart className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-bold text-slate-900">Inventory Movement Report</h3>
                    <p className="mb-3 text-slate-600">
                      Track pergerakan stok: barang masuk, keluar, transfer antar gudang. Identifikasi slow-moving items
                      dan fast-moving items untuk optimasi inventory.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                        Stock Aging
                      </span>
                      <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                        Turnover Ratio
                      </span>
                      <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                        Reorder Alert
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="rounded-2xl border border-slate-200 bg-white p-8">
                <div className="flex items-start gap-4">
                  <div className="bg-primary-50 text-primary-600 rounded-xl p-3">
                    <BarChart2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-bold text-slate-900">Financial Summary Report</h3>
                    <p className="mb-3 text-slate-600">
                      Laporan keuangan komprehensif: Profit & Loss, Cash Flow, Balance Sheet. Export ke Excel atau PDF
                      untuk presentasi ke stakeholder.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                        Multi-Currency
                      </span>
                      <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                        Budget vs Actual
                      </span>
                      <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
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

      {/* Benefits */}
      <Section>
        <Container size="7xl">
          <FadeIn delay={0.1}>
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <h2 className="mb-6 text-3xl font-bold text-slate-900 md:text-4xl">Mengapa Report Builder Penting?</h2>
              <p className="text-lg text-slate-600">
                Laporan yang tepat waktu dan akurat adalah kunci pengambilan keputusan yang cerdas.
              </p>
            </div>
          </FadeIn>

          <Grid cols={1} mdCols={2} gap={8}>
            <FadeIn delay={0.1}>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
                <h3 className="mb-3 text-xl font-bold text-slate-900">Hemat Waktu Tim Finance</h3>
                <p className="text-slate-600">
                  Tidak perlu lagi export data ke Excel, copy-paste, dan format manual. Laporan otomatis ter-generate
                  dengan 1 klik. Tim finance bisa fokus ke analisis, bukan administrasi.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
                <h3 className="mb-3 text-xl font-bold text-slate-900">Keputusan Lebih Cepat</h3>
                <p className="text-slate-600">
                  Data real-time berarti Anda bisa bereaksi lebih cepat terhadap perubahan pasar. Lihat penjualan turun
                  hari ini? Langsung ambil tindakan, tidak perlu tunggu laporan bulanan.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
                <h3 className="mb-3 text-xl font-bold text-slate-900">Transparansi Penuh</h3>
                <p className="text-slate-600">
                  Setiap stakeholder bisa lihat data yang relevan untuk mereka. Sales Manager lihat performa tim, CFO
                  lihat cash flow, Owner lihat profitability. Semua dari dashboard masing-masing.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
                <h3 className="mb-3 text-xl font-bold text-slate-900">Audit Trail Lengkap</h3>
                <p className="text-slate-600">
                  Setiap laporan menyimpan history: siapa yang buat, kapan, dengan filter apa. Penting untuk compliance
                  dan audit internal/eksternal.
                </p>
              </div>
            </FadeIn>
          </Grid>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="border-t border-slate-200 bg-slate-50">
        <Container size="4xl" className="text-center">
          <FadeIn delay={0.1}>
            <h2 className="mb-8 text-4xl leading-tight font-bold text-slate-900 md:text-5xl">
              Ubah Data Menjadi Insight
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mx-auto mb-12 max-w-2xl text-xl text-slate-600">
              Lihat bagaimana Report Builder bisa mengubah cara Anda menganalisis bisnis. Demo 15 menit, tanpa
              komitmen.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <BouncyLink href="/demo" className="shadow-primary-500/20 h-16 px-10 text-xl shadow-xl">
                Lihat Demo Analytics
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
