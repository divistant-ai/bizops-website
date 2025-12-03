import { Plug } from 'lucide-react';
import Link from 'next/link';
import Container from '@/components/layout/Container';
import { CardSlider, Grid, Typography } from '@/components/ui';
import Button from '@/components/ui/Button';

import Stack from '@/components/ui/Stack';
import { integrationsData } from '@/data/platformContent';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';

export const metadata = genMeta({
  title: 'Integrations Library',
  description: 'Pustaka konektor BizOps untuk SAP, Odoo, Bank, dan E-Commerce.',
  url: '/integrations',
});

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-16 pb-24 dark:bg-slate-950">
      {/* Hero */}
      <Container size="7xl" className="mb-20 text-center">
        <Stack direction="horizontal" gap={4} className="mx-auto mb-6 w-fit rounded-xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <Plug className="text-primary-600 h-8 w-8" />
        </Stack>
        <Typography variant="h1" as="h1" className="mb-6">
          Ekosistem yang Saling Terhubung.
        </Typography>
        <Typography variant="body" className="mx-auto max-w-3xl text-slate-600 dark:text-slate-400">
          Jangan buang waktu membangun integrasi dari nol. Gunakan pustaka konektor siap pakai (Plug-and-Play) kami untuk menghubungkan BizOps dengan aplikasi bisnis populer.
        </Typography>
      </Container>

      {/* Grid */}
      <Container size="7xl">
        <Stack direction="vertical" gap={12}>
          {integrationsData.map((cat, idx) => (
            <div key={idx}>
              <Stack direction="horizontal" gap={4} align="end" className="mb-6 border-b border-slate-200 pb-4 dark:border-slate-800">
                <Typography variant="h2" as="h2" className="font-bold text-slate-900 dark:text-white">{cat.category}</Typography>
                <Typography variant="body" className="text-slate-500 dark:text-slate-400">{cat.desc}</Typography>
              </Stack>

              <div className="md:hidden">
                <CardSlider>
                  {cat.apps.map((app, i) => (
                    <div key={i} className="hover:border-primary-300 group h-full w-[85vw] cursor-default rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md sm:w-[350px] dark:border-slate-800 dark:bg-slate-900">
                      <Stack direction="horizontal" gap={4} align="center" justify="between" className="mb-4">
                        <Stack direction="horizontal" gap={4} align="center" justify="center" className="group-hover:bg-primary-50 dark:group-hover:bg-primary-900/20 group-hover:text-primary-600 h-10 w-10 rounded-lg border border-slate-100 bg-slate-50 text-xs font-bold text-slate-600 transition-colors dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
                          {app.name.substring(0, 2).toUpperCase()}
                        </Stack>
                        <div className="rounded-full border border-green-100 bg-green-50 px-2 py-1 text-[10px] font-bold text-green-700 uppercase dark:border-green-900/30 dark:bg-green-900/20 dark:text-green-400">
                          Verified
                        </div>
                      </Stack>
                      <Typography variant="h3" as="h3" className="group-hover:text-primary-600 mb-2 font-bold text-slate-900 dark:text-white">{app.name}</Typography>
                      <Typography variant="small" className="leading-snug text-slate-600 dark:text-slate-400">{app.desc}</Typography>
                    </div>
                  ))}
                </CardSlider>
              </div>

              <Grid cols={3} gap={6} className="hidden md:grid">
                {cat.apps.map((app, i) => (
                  <div key={i} className="hover:border-primary-300 group h-full cursor-default rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
                    <Stack direction="horizontal" gap={4} align="center" justify="between" className="mb-4">
                      <Stack direction="horizontal" gap={4} align="center" justify="center" className="group-hover:bg-primary-50 dark:group-hover:bg-primary-900/20 group-hover:text-primary-600 h-10 w-10 rounded-lg border border-slate-100 bg-slate-50 text-xs font-bold text-slate-600 transition-colors dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
                        {app.name.substring(0, 2).toUpperCase()}
                      </Stack>
                      <div className="rounded-full border border-green-100 bg-green-50 px-2 py-1 text-[10px] font-bold text-green-700 uppercase dark:border-green-900/30 dark:bg-green-900/20 dark:text-green-400">
                        Verified
                      </div>
                    </Stack>
                    <Typography variant="h3" as="h3" className="group-hover:text-primary-600 mb-2 font-bold text-slate-900 dark:text-white">{app.name}</Typography>
                    <Typography variant="small" className="leading-snug text-slate-600 dark:text-slate-400">{app.desc}</Typography>
                  </div>
                ))}
              </Grid>
            </div>
          ))}
        </Stack>

        <div className="mt-24 rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <Typography variant="h2" as="h2" className="mb-4">Butuh Integrasi Khusus?</Typography>
          <Typography variant="body" className="mb-8 text-slate-600 dark:text-slate-400">
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
