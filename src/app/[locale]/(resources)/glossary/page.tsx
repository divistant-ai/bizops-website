'use client';

import { ArrowRight, BookOpen, Search } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import Container from '@/components/layout/Container';
import { Grid, Typography } from '@/components/ui';
import Button from '@/components/ui/Button';
import Stack from '@/components/ui/Stack';
import { glossaryData } from '@/data/resourcesContent';

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = glossaryData.filter(item =>
    item.term.toLowerCase().includes(searchQuery.toLowerCase())
    || item.def.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-white pt-16 pb-24 dark:bg-slate-950">
      <Container className="px-4 md:px-6 lg:px-8" size="7xl">

        {/* Hero */}
        <Container noPadding size="3xl" className="mb-16 text-center">
          <Stack direction="horizontal" gap={4} align="center" justify="center" className="bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 mb-6 rounded-xl p-3">
            <BookOpen className="h-8 w-8" />
          </Stack>
          <Typography variant="h1" as="h1">Pahami Bahasa Bisnis & Teknologi.</Typography>
          <Typography variant="body" className="text-slate-600 dark:text-slate-400">
            Dunia manajemen perusahaan penuh dengan akronim yang membingungkan. Kami menyusun pusat pengetahuan ini untuk Anda.
          </Typography>

          {/* Search Bar */}
          <Container noPadding className="relative mt-8">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Cari istilah (e.g. 'TER', 'Lead Time')..."
              className="focus:ring-primary-500 w-full rounded-xl border border-slate-200 bg-white py-3 pr-4 pl-12 text-slate-900 shadow-sm outline-none focus:ring-2 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            />
            <Search className="absolute top-3.5 left-4 h-5 w-5 text-slate-400" />
          </Container>
        </Container>

        {/* Glossary Grid */}
        <Grid cols={2} gap={8} className="mb-16">
          {filteredData.map((item, idx) => (
            <div key={idx} className="hover:border-primary-100 dark:hover:border-primary-900 group rounded-2xl border border-slate-100 bg-slate-50 p-8 transition-all hover:bg-white hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800">
              <Stack direction="horizontal" gap={4} align="center" className="mb-4">
                <Stack direction="horizontal" gap={4} align="center" justify="center" className="text-primary-600 dark:text-primary-400 group-hover:bg-primary-600 h-12 w-12 rounded-lg border border-slate-200 bg-white text-2xl font-bold shadow-sm transition-colors group-hover:text-white dark:border-slate-700 dark:bg-slate-800">
                  {item.char}
                </Stack>
                <Typography variant="h3" as="h3" className="font-bold text-slate-900 dark:text-white">{item.term}</Typography>
              </Stack>
              <Stack direction="vertical" gap={4}>
                <div>
                  <Typography variant="small" className="text-slate-400 dark:text-slate-500">Definisi</Typography>
                  <Typography variant="small" className="mt-1 block leading-relaxed text-slate-700 dark:text-slate-300">{item.def}</Typography>
                </div>
                <div className="border-t border-slate-200 pt-4 dark:border-slate-800">
                  <Typography variant="small" className="text-slate-400 dark:text-slate-500">Why It Matters</Typography>
                  <Typography variant="small" className="mt-1 block leading-relaxed text-slate-600 dark:text-slate-400">
                    "
                    {item.context}
                    "
                  </Typography>
                </div>
              </Stack>
            </div>
          ))}
        </Grid>

        {/* CTA */}
        <div className="relative overflow-hidden rounded-2xl bg-slate-900 p-8 text-center text-white md:p-12">
          <Container noPadding size="4xl" className="relative z-10">
            <Typography variant="h2" as="h2">Ingin Menerapkan Konsep Ini Secara Otomatis?</Typography>
            <Typography variant="body" className="text-slate-300">
              BizOps menerjemahkan teori manajemen ini menjadi fitur software yang praktis. Tidak perlu menghitung manual.
            </Typography>
            <Link href="/demo">
              <Button size="md" className="mt-6 border-none bg-white text-slate-900 hover:bg-slate-200">
                Coba Gratis BizOps
                {' '}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </Container>
        </div>

      </Container>
    </div>
  );
}
