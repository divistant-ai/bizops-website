import Link from 'next/link';
import { Plug } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Typography } from '@/components/ui';
import Container from '@/components/layout/Container';
import { Grid } from '@/components/ui';
import Stack from '@/components/ui/Stack';

import { CardSlider } from '@/components/ui';
import { integrationsData } from '@/data/platformContent';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';

export const metadata = genMeta({
  title: 'Integrations Library',
  description: 'Pustaka konektor BizOps untuk SAP, Odoo, Bank, dan E-Commerce.',
  url: '/integrations',
});

export default function IntegrationsPage() {
  return (
    <div className="pt-16 pb-24 bg-slate-50 dark:bg-slate-950 min-h-screen">
      {/* Hero */}
      <Container size="7xl" className="mb-20 text-center">
        <Stack direction="horizontal" gap={4} className="p-3 bg-white dark:bg-slate-900 rounded-xl shadow-sm mb-6 w-fit mx-auto border border-slate-200 dark:border-slate-800">
          <Plug className="w-8 h-8 text-primary-600" />
        </Stack>
        <Typography variant="h1" as="h1" className="mb-6">
          Ekosistem yang Saling Terhubung.
        </Typography>
        <Typography variant="body" className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
          Jangan buang waktu membangun integrasi dari nol. Gunakan pustaka konektor siap pakai (Plug-and-Play) kami untuk menghubungkan BizOps dengan aplikasi bisnis populer.
        </Typography>
      </Container>

      {/* Grid */}
      <Container size="7xl">
        <Stack direction="vertical" gap={12}>
          {integrationsData.map((cat, idx) => (
            <div key={idx}>
              <Stack direction="horizontal" gap={4} align="end" className="mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
                <Typography variant="h2" as="h2" className="font-bold text-slate-900 dark:text-white">{cat.category}</Typography>
                <Typography variant="body" className="text-slate-500 dark:text-slate-400">{cat.desc}</Typography>
              </Stack>
              
              <div className="md:hidden">
                <CardSlider>
                  {cat.apps.map((app, i) => (
                    <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-primary-300 hover:shadow-md transition-all group cursor-default h-full w-[85vw] sm:w-[350px]">
                      <Stack direction="horizontal" gap={4} align="center" justify="between" className="mb-4">
                        <Stack direction="horizontal" gap={4} align="center" justify="center" className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-700 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/20 group-hover:text-primary-600 transition-colors">
                          {app.name.substring(0,2).toUpperCase()}
                        </Stack>
                        <div className="px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-[10px] font-bold uppercase rounded-full border border-green-100 dark:border-green-900/30">
                          Verified
                        </div>
                      </Stack>
                      <Typography variant="h3" as="h3" className="font-bold text-slate-900 dark:text-white group-hover:text-primary-600 mb-2">{app.name}</Typography>
                      <Typography variant="small" className="text-slate-600 dark:text-slate-400 leading-snug">{app.desc}</Typography>
                    </div>
                  ))}
                </CardSlider>
              </div>

              <Grid cols={3} gap={6} className="hidden md:grid">
                {cat.apps.map((app, i) => (
                  <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-primary-300 hover:shadow-md transition-all group cursor-default h-full">
                    <Stack direction="horizontal" gap={4} align="center" justify="between" className="mb-4">
                      <Stack direction="horizontal" gap={4} align="center" justify="center" className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-700 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/20 group-hover:text-primary-600 transition-colors">
                        {app.name.substring(0,2).toUpperCase()}
                      </Stack>
                      <div className="px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-[10px] font-bold uppercase rounded-full border border-green-100 dark:border-green-900/30">
                        Verified
                      </div>
                    </Stack>
                    <Typography variant="h3" as="h3" className="font-bold text-slate-900 dark:text-white group-hover:text-primary-600 mb-2">{app.name}</Typography>
                    <Typography variant="small" className="text-slate-600 dark:text-slate-400 leading-snug">{app.desc}</Typography>
                  </div>
                ))}
              </Grid>
            </div>
          ))}
        </Stack>
        
        <div className="mt-24 text-center bg-white dark:bg-slate-900 p-12 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <Typography variant="h2" as="h2" className="mb-4">Butuh Integrasi Khusus?</Typography>
          <Typography variant="body" className="text-slate-600 dark:text-slate-400 mb-8">
            Gunakan REST API standar kami untuk menghubungkan sistem legacy atau aplikasi custom internal Anda. Dokumentasi lengkap tersedia.
          </Typography>
          <Stack direction="vertical" gap={4} className="justify-center">
            <Link href="/platform/technologies/integration">
              <Button size="lg" variant="primary">Lihat Dokumentasi API</Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline">Hubungi Tim Integrasi</Button>
            </Link>
          </Stack>
        </div>
      </Container>
    </div>
  );
}

