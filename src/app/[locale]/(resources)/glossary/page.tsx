'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, BookOpen, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Typography } from '@/components/ui';
import Container from '@/components/layout/Container';
import { Grid } from '@/components/ui';
import Stack from '@/components/ui/Stack';
import { glossaryData } from '@/data/resourcesContent';

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = glossaryData.filter(item => 
    item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.def.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-16 pb-24 bg-white dark:bg-slate-950 min-h-screen">
      <Container className="px-4 md:px-6 lg:px-8" size="7xl">
        
        {/* Hero */}
        <Container noPadding size="3xl" className="text-center mb-16">
          <Stack direction="horizontal" gap={4} align="center" justify="center" className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-xl mb-6 text-primary-600 dark:text-primary-400">
            <BookOpen className="w-8 h-8" />
          </Stack>
          <Typography variant="h1" as="h1">Pahami Bahasa Bisnis & Teknologi.</Typography>
          <Typography variant="body" className="text-slate-600 dark:text-slate-400">
            Dunia manajemen perusahaan penuh dengan akronim yang membingungkan. Kami menyusun pusat pengetahuan ini untuk Anda.
          </Typography>
          
          {/* Search Bar */}
          <Container noPadding className="mt-8 relative">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari istilah (e.g. 'TER', 'Lead Time')..." 
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm focus:ring-2 focus:ring-primary-500 outline-none text-slate-900 dark:text-white"
            />
            <Search className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
          </Container>
        </Container>

        {/* Glossary Grid */}
        <Grid cols={2} gap={8} className="mb-16">
          {filteredData.map((item, idx) => (
            <div key={idx} className="p-8 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg hover:border-primary-100 dark:hover:border-primary-900 transition-all group">
              <Stack direction="horizontal" gap={4} align="center" className="mb-4">
                <Stack direction="horizontal" gap={4} align="center" justify="center" className="w-12 h-12 bg-white dark:bg-slate-800 rounded-lg font-bold text-2xl text-primary-600 dark:text-primary-400 border border-slate-200 dark:border-slate-700 shadow-sm group-hover:bg-primary-600 group-hover:text-white transition-colors">
                  {item.char}
                </Stack>
                <Typography variant="h3" as="h3" className="font-bold text-slate-900 dark:text-white">{item.term}</Typography>
              </Stack>
              <Stack direction="vertical" gap={4}>
                <div>
                  <Typography variant="small" className="text-slate-400 dark:text-slate-500">Definisi</Typography>
                  <Typography variant="small" className="text-slate-700 dark:text-slate-300 leading-relaxed block mt-1">{item.def}</Typography>
                </div>
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                  <Typography variant="small" className="text-slate-400 dark:text-slate-500">Why It Matters</Typography>
                  <Typography variant="small" className="text-slate-600 dark:text-slate-400 leading-relaxed block mt-1">"{item.context}"</Typography>
                </div>
              </Stack>
            </div>
          ))}
        </Grid>

        {/* CTA */}
        <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <Container noPadding size="4xl" className="relative z-10">
            <Typography variant="h2" as="h2">Ingin Menerapkan Konsep Ini Secara Otomatis?</Typography>
            <Typography variant="body" className="text-slate-300">
              BizOps menerjemahkan teori manajemen ini menjadi fitur software yang praktis. Tidak perlu menghitung manual.
            </Typography>
            <Link href="/demo">
              <Button size="md" className="bg-white text-slate-900 hover:bg-slate-200 border-none mt-6">
                Coba Gratis BizOps <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </Container>
        </div>

      </Container>
    </div>
  );
}
