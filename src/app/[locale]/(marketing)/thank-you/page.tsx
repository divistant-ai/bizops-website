import Link from 'next/link';
import { CheckCircle, Download, Video, Linkedin } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Typography } from '@/components/ui';
import { Grid } from '@/components/ui';
import Stack from '@/components/ui/Stack';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';

export const metadata = genMeta({
  title: 'Terima Kasih | Permintaan Diterima',
  description: 'Konfirmasi pengiriman formulir BizOps.',
  url: '/thank-you',
});

export default function ThankYouPage() {
  return (
    <Stack direction="vertical" gap={4} align="center" justify="center" className="min-h-[80vh] py-16 px-4 bg-slate-50">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-slate-200 max-w-2xl w-full text-center">
        <Stack direction="horizontal" gap={4} align="center" justify="center" className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-8 animate-bounce">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </Stack>
        
        <Typography variant="h1" as="h1">Terima Kasih! Langkah Pertama Transformasi Dimulai.</Typography>
        <Typography variant="body" className="text-slate-600 dark:text-slate-400 leading-relaxed">
          Tim Solution Architect kami telah menerima data permintaan Anda. Kami sedang menganalisis profil bisnis Anda dan akan menghubungi Anda via WhatsApp atau Email dalam waktu maksimal <strong>24 Jam Kerja</strong> (Senin-Jumat) untuk menjadwalkan sesi.
        </Typography>
        
        <div className="h-px bg-slate-100 w-full my-8"></div>
        
        <Typography variant="h3" as="h3">Sambil Menunggu, Para Pemimpin Bisnis Biasanya:</Typography>
        
        <Grid cols={3} gap={4} className="text-left mt-6">
          <a href="#" className="p-4 rounded-xl border border-slate-200 hover:border-primary-200 hover:bg-primary-50 transition-all group">
            <Download className="w-5 h-5 text-slate-400 mb-2 group-hover:text-primary-600" />
            <div className="font-bold text-slate-900 dark:text-white text-sm mb-1">Download E-Book</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Panduan Efisiensi Pajak 2024</div>
          </a>
          <Link href="/customers" className="p-4 rounded-xl border border-slate-200 hover:border-primary-200 hover:bg-primary-50 transition-all group">
            <Video className="w-5 h-5 text-slate-400 mb-2 group-hover:text-primary-600" />
            <div className="font-bold text-slate-900 dark:text-white text-sm mb-1">Tonton Kisah Sukses</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Hemat 2 Milyar/Tahun</div>
          </Link>
          <a href="#" className="p-4 rounded-xl border border-slate-200 hover:border-primary-200 hover:bg-primary-50 transition-all group">
            <Linkedin className="w-5 h-5 text-slate-400 mb-2 group-hover:text-primary-600" />
            <div className="font-bold text-slate-900 dark:text-white text-sm mb-1">Follow LinkedIn</div>
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
