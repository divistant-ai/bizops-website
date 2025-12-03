import { CheckCircle, Download, Linkedin, Video } from 'lucide-react';
import Link from 'next/link';
import { Grid, Typography } from '@/components/ui';
import Button from '@/components/ui/Button';
import Stack from '@/components/ui/Stack';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';

export const metadata = genMeta({
  title: 'Terima Kasih | Permintaan Diterima',
  description: 'Konfirmasi pengiriman formulir BizOps.',
  url: '/thank-you',
});

export default function ThankYouPage() {
  return (
    <Stack direction="vertical" gap={4} align="center" justify="center" className="min-h-[80vh] bg-slate-50 px-4 py-16">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xl md:p-12">
        <Stack direction="horizontal" gap={4} align="center" justify="center" className="mx-auto mb-8 h-20 w-20 animate-bounce rounded-full bg-green-100">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </Stack>

        <Typography variant="h1" as="h1">Terima Kasih! Langkah Pertama Transformasi Dimulai.</Typography>
        <Typography variant="body" className="leading-relaxed text-slate-600 dark:text-slate-400">
          Tim Solution Architect kami telah menerima data permintaan Anda. Kami sedang menganalisis profil bisnis Anda dan akan menghubungi Anda via WhatsApp atau Email dalam waktu maksimal
          {' '}
          <strong>24 Jam Kerja</strong>
          {' '}
          (Senin-Jumat) untuk menjadwalkan sesi.
        </Typography>

        <div className="my-8 h-px w-full bg-slate-100"></div>

        <Typography variant="h3" as="h3">Sambil Menunggu, Para Pemimpin Bisnis Biasanya:</Typography>

        <Grid cols={3} gap={4} className="mt-6 text-left">
          <a href="#" className="hover:border-primary-200 hover:bg-primary-50 group rounded-xl border border-slate-200 p-4 transition-all">
            <Download className="group-hover:text-primary-600 mb-2 h-5 w-5 text-slate-400" />
            <div className="mb-1 text-sm font-bold text-slate-900 dark:text-white">Download E-Book</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Panduan Efisiensi Pajak 2024</div>
          </a>
          <Link href="/customers" className="hover:border-primary-200 hover:bg-primary-50 group rounded-xl border border-slate-200 p-4 transition-all">
            <Video className="group-hover:text-primary-600 mb-2 h-5 w-5 text-slate-400" />
            <div className="mb-1 text-sm font-bold text-slate-900 dark:text-white">Tonton Kisah Sukses</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Hemat 2 Milyar/Tahun</div>
          </Link>
          <a href="#" className="hover:border-primary-200 hover:bg-primary-50 group rounded-xl border border-slate-200 p-4 transition-all">
            <Linkedin className="group-hover:text-primary-600 mb-2 h-5 w-5 text-slate-400" />
            <div className="mb-1 text-sm font-bold text-slate-900 dark:text-white">Follow LinkedIn</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Update industri harian</div>
          </a>
        </Grid>

        <div className="mt-10">
          <Link href="/">
            <Button size="md" variant="ghost">Kembali ke Beranda</Button>
          </Link>
        </div>
      </div>
    </Stack>
  );
}
