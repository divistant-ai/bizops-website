import Link from 'next/link';
import { BarChart2, PieChart, Calendar, Filter } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Typography } from '@/components/ui';
import Container from '@/components/layout/Container';
import { Grid } from '@/components/ui';
import Stack from '@/components/ui/Stack';
import { Section } from '@/components/layout';
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
      <Section className="bg-slate-900 py-24 text-white text-center">
        <Container size="7xl">
          <Stack direction="horizontal" gap={4} className="p-3 bg-slate-800 rounded-2xl mb-6 w-fit mx-auto">
            <BarChart2 className="w-8 h-8 text-primary-400" />
          </Stack>
          <Typography variant="h1" as="h1" className="font-bold leading-tight mb-6">
            Laporan Anda, Cara Anda.<br/>Tanpa Coding.
          </Typography>
          <Typography variant="body" className="text-slate-300 leading-relaxed mb-8 max-w-3xl mx-auto">
            Setiap bisnis punya cara unik melihat data. Jangan terpaku pada laporan standar yang kaku. Dengan <em>Report Builder</em>, Anda menjadi analis data bagi perusahaan Anda sendiri.
          </Typography>
          <Link href="/demo">
            <Button size="lg" variant="white">Coba Report Builder</Button>
          </Link>
        </Container>
      </Section>

      {/* Key Capabilities */}
      <Section className="py-24 bg-white dark:bg-slate-950">
        <Container size="7xl">
          <Grid cols={3} gap={8}>
            <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <Stack direction="horizontal" gap={4} align="center" justify="center" className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl mb-6">
                <PieChart className="w-6 h-6" />
              </Stack>
              <Typography variant="h3" as="h3" className="mb-3">Real-time Dashboard</Typography>
              <Typography variant="small" className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Widget visual (Grafik Batang, Pie Chart, KPI Card, Heatmap) yang dapat dikustomisasi dan diperbarui detik demi detik. Pantau kesehatan bisnis dalam satu pandangan.
              </Typography>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <Stack direction="horizontal" gap={4} align="center" justify="center" className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-xl mb-6">
                <Filter className="w-6 h-6" />
              </Stack>
              <Typography variant="h3" as="h3" className="mb-3">Drag-and-Drop Report Builder</Typography>
              <Typography variant="small" className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Antarmuka intuitif untuk membuat laporan tabular. Pilih kolom data yang diinginkan (misal: "Nama Sales", "Wilayah", "Total Omzet"), tarik ke kanvas, terapkan filter kompleks, dan lihat hasilnya seketika.
              </Typography>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <Stack direction="horizontal" gap={4} align="center" justify="center" className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-xl mb-6">
                <Calendar className="w-6 h-6" />
              </Stack>
              <Typography variant="h3" as="h3" className="mb-3">Auto-Schedule Email</Typography>
              <Typography variant="small" className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Buat laporan sekali, lalu jadwalkan pengiriman otomatis. "Kirim laporan Penjualan Mingguan ini ke Email Direksi setiap Senin pagi jam 08:00." Sistem akan menjalankannya secara disiplin.
              </Typography>
            </div>
          </Grid>
        </Container>
      </Section>
    </Stack>
  );
}

