'use client';

import { Accessibility as AccessibilityIcon, CheckCircle, Eye, Keyboard, MessageSquare, Volume2, ZoomIn } from 'lucide-react';
import { Section } from '@/components/layout';
import Container from '@/components/layout/Container';
import { Grid, Typography } from '@/components/ui';
import Button from '@/components/ui/Button';
import Stack from '@/components/ui/Stack';

export default function AccessibilityPage() {
  const features = [
    {
      icon: Keyboard,
      title: 'Keyboard Navigation',
      desc: 'Seluruh interaksi di situs ini dapat dilakukan hanya menggunakan keyboard (Tab, Enter, Arrow Keys) tanpa mouse.',
    },
    {
      icon: Volume2,
      title: 'Screen Reader Friendly',
      desc: 'Kode semantik ARIA label yang lengkap memastikan kompatibilitas dengan NVDA, JAWS, dan VoiceOver.',
    },
    {
      icon: Eye,
      title: 'High Contrast',
      desc: 'Rasio kontras warna teks dan background memenuhi standar WCAG AA (4.5:1) untuk keterbacaan maksimal.',
    },
    {
      icon: ZoomIn,
      title: 'Scalable Text',
      desc: 'Layout responsif yang tetap rapi meskipun diperbesar hingga 200% pada browser Anda.',
    },
  ];

  return (
    <div className="min-h-screen bg-white pt-20 dark:bg-slate-950">
      {/* Hero Section */}
      <Section className="bg-primary-50 border-primary-100 border-b py-20 text-center dark:border-slate-800 dark:bg-slate-900">
        <Container size="4xl">
          <div className="bg-primary-100 dark:bg-primary-900/20 text-primary-600 mb-6 inline-flex items-center justify-center rounded-2xl p-3">
            <AccessibilityIcon className="h-8 w-8" />
          </div>
          <Typography variant="h1" as="h1" className="font-extrabold text-slate-900 dark:text-white">
            Teknologi untuk
            {' '}
            <span className="text-primary-600">Semua Orang.</span>
          </Typography>
          <Typography variant="body" className="text-slate-600 dark:text-slate-400">
            BizOps berkomitmen membangun platform yang inklusif. Kami percaya bahwa hambatan fisik tidak boleh menjadi penghalang produktivitas bisnis.
          </Typography>
        </Container>
      </Section>

      {/* Standards & Features */}
      <Section className="mx-auto max-w-7xl py-20">
        <Grid cols={4} gap={8} className="mb-20">
          {features.map((feat, idx) => (
            <div key={idx} className="group rounded-2xl border border-slate-100 bg-slate-50 p-8 transition-all duration-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
              <div className="text-primary-600 mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow-sm transition-transform group-hover:scale-110 dark:bg-slate-800">
                <feat.icon className="h-7 w-7" />
              </div>
              <Typography variant="h3" as="h3" className="mb-2 font-bold text-slate-900 dark:text-white">{feat.title}</Typography>
              <Typography variant="small" className="leading-relaxed text-slate-600 dark:text-slate-400">{feat.desc}</Typography>
            </div>
          ))}
        </Grid>

        <Stack direction="vertical" gap={12} className="items-center rounded-3xl border border-slate-200 bg-white p-8 shadow-xl md:p-12 dark:border-slate-800 dark:bg-slate-900">
          <div className="md:w-1/2">
            <span className="mb-2 block text-sm font-bold tracking-wider text-green-600 uppercase">Standar Kepatuhan</span>
            <Typography variant="h2" as="h2" className="mb-4">WCAG 2.1 Level AA</Typography>
            <Typography variant="body" className="mb-6 leading-relaxed text-slate-600 dark:text-slate-400">
              Kami secara aktif mengaudit dan memperbarui antarmuka kami agar sesuai dengan pedoman Web Content Accessibility Guidelines (WCAG) yang diakui secara global.
            </Typography>
            <div className="flex flex-wrap gap-4">
              {['Perceivable', 'Operable', 'Understandable', 'Robust'].map(item => (
                <div key={item} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  {' '}
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="w-full rounded-2xl bg-slate-100 p-8 md:w-1/2 dark:bg-slate-800">
            <Typography variant="h3" as="h3" className="mb-4 flex items-center gap-2 font-bold text-slate-900 dark:text-white">
              <MessageSquare className="h-5 w-5" />
              {' '}
              Laporkan Masalah
            </Typography>
            <Typography variant="small" className="mb-6 block text-slate-600 dark:text-slate-400">
              Menemukan bug aksesibilitas? Tim engineering kami memprioritaskan perbaikan isu ini.
            </Typography>
            <form className="space-y-4" onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                placeholder="Email Anda"
                className="focus:ring-primary-500 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:ring-2 dark:border-slate-700 dark:bg-slate-950"
              />
              <textarea
                placeholder="Deskripsikan masalah (cth: Tombol login tidak terbaca screen reader)"
                rows={3}
                className="focus:ring-primary-500 w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:ring-2 dark:border-slate-700 dark:bg-slate-950"
              />
              <Button size="md" fullWidth>Kirim Laporan</Button>
            </form>
          </div>
        </Stack>
      </Section>
    </div>
  );
}
