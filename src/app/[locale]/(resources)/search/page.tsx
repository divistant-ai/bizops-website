'use client';

import { BookOpen, Box, Building, FileText, HelpCircle, Layers, Search, User, Wrench } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import Container from '@/components/layout/Container';
import { EmptyState, Typography } from '@/components/ui';
import Stack from '@/components/ui/Stack';
import { searchMockData } from '@/data/searchData';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredResults = searchMockData.filter((item) => {
    const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase()) || item.snippet.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === 'all' || item.category === filter;
    return matchesQuery && matchesFilter;
  });

  const getIcon = (cat: string) => {
    switch (cat) {
      case 'product': return <Box className="h-4 w-4 text-blue-500" />;
      case 'solution': return <Layers className="h-4 w-4 text-indigo-500" />;
      case 'tool': return <Wrench className="h-4 w-4 text-amber-500" />;
      case 'docs': return <FileText className="h-4 w-4 text-orange-500" />;
      case 'blog': return <BookOpen className="h-4 w-4 text-green-500" />;
      case 'partner': return <User className="h-4 w-4 text-purple-500" />;
      case 'company': return <Building className="h-4 w-4 text-slate-500" />;
      default: return <HelpCircle className="h-4 w-4 text-slate-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-24 transition-colors dark:bg-slate-950">
      <Container className="px-4 md:px-6 lg:px-8" size="7xl">

        {/* Search Header */}
        <div className="mb-12 text-center">
          <Typography variant="h1" as="h1">Pencarian Global</Typography>
          <Container noPadding size="4xl" className="relative">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Cari 'HRIS', 'Integrasi API', atau 'Harga'..."
              className="focus:ring-primary-500/20 focus:border-primary-500 w-full rounded-2xl border border-slate-200 bg-white py-4 pr-4 pl-14 text-lg text-slate-900 shadow-xl shadow-slate-200/20 transition-all outline-none focus:ring-4 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:shadow-none"
              autoFocus
              aria-label="Search query"
            />
            <Search className="absolute top-5 left-5 h-6 w-6 text-slate-400" aria-hidden="true" />
          </Container>
        </div>

        {/* Filters */}
        <div className="mb-12 flex flex-wrap justify-center gap-2" role="radiogroup" aria-label="Content type filter">
          {['all', 'product', 'solution', 'tool', 'docs', 'blog', 'company'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                filter === f
                  ? 'border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800'
              }`}
              aria-pressed={filter === f}
            >
              {f === 'all' ? 'Semua' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="space-y-4" role="region" aria-live="polite">
          {!query
            ? (
                <EmptyState
                  type="empty"
                  icon={Search}
                  title="Mulai Pencarian"
                  description="Ketikan kata kunci di atas untuk mencari di seluruh konten BizOps."
                />
              )
            : filteredResults.length === 0
              ? (
                  <EmptyState
                    type="no-results"
                    icon={Search}
                    title={`Tidak ditemukan hasil untuk "${query}"`}
                    description="Coba gunakan kata kunci yang lebih umum atau periksa ejaan Anda."
                    actionLabel="Lihat Semua Fitur"
                    onAction={() => window.location.href = '/platform'}
                  />
                )
              : (
                  filteredResults.map((res, idx) => (
                    <Link
                      key={idx}
                      href={res.path}
                      className="hover:border-primary-500 dark:hover:border-primary-500 group block cursor-pointer rounded-xl border border-slate-200 bg-white p-6 transition-all hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
                    >
                      <Stack direction="horizontal" gap={2} align="center" className="mb-2 text-xs font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                        {getIcon(res.category)}
                        <span>{res.category}</span>
                        <span className="text-slate-300 dark:text-slate-700">•</span>
                        <span>{res.tag}</span>
                      </Stack>
                      <Typography variant="h3" as="h3" className="group-hover:text-primary-600 dark:group-hover:text-primary-400 font-bold text-slate-900 dark:text-white">{res.title}</Typography>
                      <Typography variant="small" className="leading-relaxed text-slate-600 dark:text-slate-400">{res.snippet}</Typography>
                    </Link>
                  ))
                )}
        </div>

      </Container>
    </div>
  );
}
