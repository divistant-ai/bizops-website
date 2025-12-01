'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, FileText, Box, BookOpen, User, HelpCircle, Layers, Wrench, Building } from 'lucide-react';
import { EmptyState } from '@/components/ui';
import { searchMockData } from '@/data/searchData';
import { Typography } from '@/components/ui';
import Container from '@/components/layout/Container';
import Stack from '@/components/ui/Stack';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredResults = searchMockData.filter(item => {
    const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase()) || item.snippet.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === 'all' || item.category === filter;
    return matchesQuery && matchesFilter;
  });

  const getIcon = (cat: string) => {
    switch (cat) {
      case 'product': return <Box className="w-4 h-4 text-blue-500" />;
      case 'solution': return <Layers className="w-4 h-4 text-indigo-500" />;
      case 'tool': return <Wrench className="w-4 h-4 text-amber-500" />;
      case 'docs': return <FileText className="w-4 h-4 text-orange-500" />;
      case 'blog': return <BookOpen className="w-4 h-4 text-green-500" />;
      case 'partner': return <User className="w-4 h-4 text-purple-500" />;
      case 'company': return <Building className="w-4 h-4 text-slate-500" />;
      default: return <HelpCircle className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="pt-24 pb-24 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors">
      <Container className="px-4 md:px-6 lg:px-8" size="7xl">
        
        {/* Search Header */}
        <div className="mb-12 text-center">
          <Typography variant="h1" as="h1">Pencarian Global</Typography>
          <Container noPadding size="4xl" className="relative">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari 'HRIS', 'Integrasi API', atau 'Harga'..." 
              className="w-full pl-14 pr-4 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xl shadow-slate-200/20 dark:shadow-none focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 outline-none text-lg transition-all"
              autoFocus
              aria-label="Search query"
            />
            <Search className="absolute left-5 top-5 text-slate-400 w-6 h-6" aria-hidden="true" />
          </Container>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12" role="radiogroup" aria-label="Content type filter">
          {['all', 'product', 'solution', 'tool', 'docs', 'blog', 'company'].map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                filter === f 
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white' 
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
              aria-pressed={filter === f}
            >
              {f === 'all' ? 'Semua' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="space-y-4" role="region" aria-live="polite">
          {!query ? (
            <EmptyState
              type="empty"
              icon={Search}
              title="Mulai Pencarian"
              description="Ketikan kata kunci di atas untuk mencari di seluruh konten BizOps."
            />
          ) : filteredResults.length === 0 ? (
            <EmptyState
              type="no-results"
              icon={Search}
              title={`Tidak ditemukan hasil untuk "${query}"`}
              description="Coba gunakan kata kunci yang lebih umum atau periksa ejaan Anda."
              actionLabel="Lihat Semua Fitur"
              onAction={() => window.location.href = '/platform'}
            />
          ) : (
            filteredResults.map((res, idx) => (
              <Link 
                key={idx} 
                href={res.path}
                className="block bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary-500 dark:hover:border-primary-500 hover:shadow-lg transition-all group cursor-pointer"
              >
                <Stack direction="horizontal" gap={2} align="center" className="text-xs text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider font-bold">
                  {getIcon(res.category)}
                  <span>{res.category}</span>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <span>{res.tag}</span>
                </Stack>
                <Typography variant="h3" as="h3" className="font-bold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">{res.title}</Typography>
                <Typography variant="small" className="text-slate-600 dark:text-slate-400 leading-relaxed">{res.snippet}</Typography>
              </Link>
            ))
          )}
        </div>

      </Container>
    </div>
  );
}
