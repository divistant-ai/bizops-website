import { BarChart2, Calendar, Filter, PieChart } from 'lucide-react';
import Link from 'next/link';
import { Section } from '@/components/layout';
import Container from '@/components/layout/Container';
import { Grid, Typography } from '@/components/ui';
import Button from '@/components/ui/Button';
import Stack from '@/components/ui/Stack';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';

export const metadata = genMeta({
  title: 'Real-time Dashboard & Custom Report Builder | BizOps',
  description: 'Buat laporan bisnis kustom tanpa coding. Analisis data penjualan, stok, dan keuangan dengan fitur Drag-and-Drop Report Builder yang powerful.',
  url: '/analytics',
});

export default function AnalyticsPage() {
  return (
    <Stack direction="vertical" gap={4}>
      {/* Hero */}
      <Section className="bg-slate-900 py-24 text-center text-white">
        <Container size="7xl">
          <Stack direction="horizontal" gap={4} className="mx-auto mb-6 w-fit rounded-2xl bg-slate-800 p-3">
            <BarChart2 className="text-primary-400 h-8 w-8" />
          </Stack>
          <Typography variant="h1" as="h1" className="mb-6 leading-tight font-bold">
            Laporan Anda, Cara Anda.
            <br />
            Tanpa Coding.
          </Typography>
          <Typography variant="body" className="mx-auto mb-8 max-w-3xl leading-relaxed text-slate-300">
            Setiap bisnis punya cara unik melihat data. Jangan terpaku pada laporan standar yang kaku. Dengan
            {' '}
            <em>Report Builder</em>
            , Anda menjadi analis data bagi perusahaan Anda sendiri.
          </Typography>
          <Link href="/demo">
            <Button size="lg" variant="white">Coba Report Builder</Button>
          </Link>
        </Container>
      </Section>

      {/* Key Capabilities */}
      <Section className="bg-white py-24 dark:bg-slate-950">
        <Container size="7xl">
          <Grid cols={3} gap={8}>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 dark:border-slate-800 dark:bg-slate-900">
              <Stack direction="horizontal" gap={4} align="center" justify="center" className="mb-6 h-12 w-12 rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/30">
                <PieChart className="h-6 w-6" />
              </Stack>
              <Typography variant="h3" as="h3" className="mb-3">Real-time Dashboard</Typography>
              <Typography variant="small" className="leading-relaxed text-slate-600 dark:text-slate-400">
                Widget visual (Grafik Batang, Pie Chart, KPI Card, Heatmap) yang dapat dikustomisasi dan diperbarui detik demi detik. Pantau kesehatan bisnis dalam satu pandangan.
              </Typography>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 dark:border-slate-800 dark:bg-slate-900">
              <Stack direction="horizontal" gap={4} align="center" justify="center" className="mb-6 h-12 w-12 rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-900/30">
                <Filter className="h-6 w-6" />
              </Stack>
              <Typography variant="h3" as="h3" className="mb-3">Drag-and-Drop Report Builder</Typography>
              <Typography variant="small" className="leading-relaxed text-slate-600 dark:text-slate-400">
                Antarmuka intuitif untuk membuat laporan tabular. Pilih kolom data yang diinginkan (misal: "Nama Sales", "Wilayah", "Total Omzet"), tarik ke kanvas, terapkan filter kompleks, dan lihat hasilnya seketika.
              </Typography>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 dark:border-slate-800 dark:bg-slate-900">
              <Stack direction="horizontal" gap={4} align="center" justify="center" className="mb-6 h-12 w-12 rounded-xl bg-green-100 text-green-600 dark:bg-green-900/30">
                <Calendar className="h-6 w-6" />
              </Stack>
              <Typography variant="h3" as="h3" className="mb-3">Auto-Schedule Email</Typography>
              <Typography variant="small" className="leading-relaxed text-slate-600 dark:text-slate-400">
                Buat laporan sekali, lalu jadwalkan pengiriman otomatis. "Kirim laporan Penjualan Mingguan ini ke Email Direksi setiap Senin pagi jam 08:00." Sistem akan menjalankannya secara disiplin.
              </Typography>
            </div>
          </Grid>
        </Container>
      </Section>
    </Stack>
  );
}
