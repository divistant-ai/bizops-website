'use client';

import { AnimatePresence, motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { ArrowRight, Briefcase, Filter, Search, X } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Pagination from '@/components/Pagination';
import Button from '@/components/ui/Button';
import { StaggeredText } from '@/components/ui/motion-text';
import { useCasesData } from '@/data/useCasesContent';

const FADE_UP_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const STAGGER_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// SpotlightCard Component
const SpotlightCard = ({ children, className = '', spotlightColor = 'rgba(14, 165, 233, 0.15)' }: { children: React.ReactNode; className?: string; spotlightColor?: string }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`group relative overflow-hidden border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              ${spotlightColor},
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

const ITEMS_PER_PAGE = 6;

export default function UseCasesContent() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const cases = Object.values(useCasesData);

  // Extract unique industries and categories
  const industries = ['All', ...Array.from(new Set(cases.map(c => c.industry))).sort()];
  const categories = ['All', ...Array.from(new Set(cases.map(c => c.category))).sort()];

  // Filtering Logic
  const filteredCases = cases.filter((c) => {
    const matchIndustry = selectedIndustry === 'All' || c.industry === selectedIndustry;
    const matchCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const matchSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase())
      || c.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      || c.challenge.toLowerCase().includes(searchQuery.toLowerCase());
    return matchIndustry && matchCategory && matchSearch;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredCases.length / ITEMS_PER_PAGE);
  const paginatedCases = filteredCases.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedIndustry, selectedCategory, searchQuery]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document.getElementById('case-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Calculate counts for filters
  const getIndustryCount = (industry: string) => {
    let filtered = cases;
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(c => c.category === selectedCategory);
    }
    if (industry === 'All') {
      return filtered.length;
    }
    return filtered.filter(c => c.industry === industry).length;
  };

  const getCategoryCount = (category: string) => {
    let filtered = cases;
    if (selectedIndustry !== 'All') {
      filtered = filtered.filter(c => c.industry === selectedIndustry);
    }
    if (category === 'All') {
      return filtered.length;
    }
    return filtered.filter(c => c.category === category).length;
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20 transition-colors dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white px-4 py-16 sm:px-6 md:py-24 lg:px-8 dark:border-slate-800 dark:bg-slate-900">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="bg-primary-500/10 pointer-events-none absolute top-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full blur-[100px]"></div>

        <div className="relative z-10 mx-auto max-w-7xl text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={STAGGER_CONTAINER}
          >
            <motion.div variants={FADE_UP_VARIANTS} className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-2 dark:border-slate-700 dark:bg-slate-800">
              <Briefcase className="text-primary-500 h-4 w-4" />
              <span className="text-xs font-bold tracking-wider text-slate-600 uppercase dark:text-slate-300">Customer Success</span>
            </motion.div>

            <h1 className="mb-6 text-4xl leading-tight font-extrabold tracking-tight text-slate-900 md:text-6xl dark:text-white">
              <StaggeredText text="Bukti Nyata," className="mb-2 flex w-full justify-center" delay={0.1} />
              <motion.span
                variants={FADE_UP_VARIANTS}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
                className="text-primary-600 dark:text-primary-400"
              >
                Bukan Teori.
              </motion.span>
            </h1>

            <motion.p
              variants={FADE_UP_VARIANTS}
              className="mx-auto mb-12 max-w-3xl text-lg text-slate-600 dark:text-slate-400"
            >
              Kumpulan studi kasus implementasi BizOps yang berhasil memecahkan masalah operasional kompleks di lapangan. Dari startup hingga enterprise, dari manufaktur hingga retail.
            </motion.p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mx-auto max-w-2xl"
          >
            <div className="relative">
              <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari studi kasus..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="focus:ring-primary-500 w-full rounded-2xl border border-slate-200 bg-white py-4 pr-12 pl-12 text-slate-900 placeholder-slate-400 transition-all focus:ring-2 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-slate-300"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12">

          {/* Sidebar Filters */}
          <aside className="lg:col-span-3">
            <div className="sticky top-24 space-y-6">
              {/* Industry Filter */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                <h3 className="mb-4 flex items-center gap-2 text-sm font-bold tracking-wider text-slate-900 uppercase dark:text-white">
                  <Filter className="h-4 w-4" />
                  Industry
                </h3>
                <div className="space-y-2">
                  {industries.map(industry => (
                    <button
                      key={industry}
                      onClick={() => setSelectedIndustry(industry)}
                      className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-all ${
                        selectedIndustry === industry
                          ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 font-bold'
                          : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>{industry}</span>
                      <span className="float-right text-xs opacity-70">
                        (
                        {getIndustryCount(industry)}
                        )
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                <h3 className="mb-4 text-sm font-bold tracking-wider text-slate-900 uppercase dark:text-white">Category</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-all ${
                        selectedCategory === category
                          ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 font-bold'
                          : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>{category}</span>
                      <span className="float-right text-xs opacity-70">
                        (
                        {getCategoryCount(category)}
                        )
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset Button */}
              {(selectedIndustry !== 'All' || selectedCategory !== 'All' || searchQuery) && (
                <Button
                  onClick={() => {
                    setSelectedIndustry('All');
                    setSelectedCategory('All');
                    setSearchQuery('');
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Reset Filters
                </Button>
              )}
            </div>
          </aside>

          {/* Cases Grid */}
          <div className="lg:col-span-9">
            <div className="mb-8 flex items-center justify-between">
              <p className="text-slate-600 dark:text-slate-400">
                Menampilkan
                {' '}
                <span className="font-bold text-slate-900 dark:text-white">{filteredCases.length}</span>
                {' '}
                studi kasus
              </p>
            </div>

            {paginatedCases.length === 0 ? (
              <div className="py-20 text-center">
                <p className="mb-6 text-lg text-slate-500 dark:text-slate-400">
                  Tidak ada studi kasus yang sesuai dengan filter Anda.
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedIndustry('All');
                    setSelectedCategory('All');
                  }}
                >
                  Reset Filter
                </Button>
              </div>
            ) : (
              <>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPage}
                    id="case-grid"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="grid scroll-mt-24 gap-8 md:grid-cols-2"
                  >
                    {paginatedCases.map((useCase) => {
                      const IconComponent = useCase.icon;

                      return (
                        <Link key={useCase.id} href={`/use-cases/${useCase.id}`}>
                          <SpotlightCard className="h-full rounded-2xl">
                            <article className="flex h-full flex-col p-8">
                              <div className="mb-6 flex items-start justify-between">
                                <div className="bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 flex h-14 w-14 items-center justify-center rounded-xl transition-transform group-hover:scale-110">
                                  <IconComponent className="h-7 w-7" />
                                </div>
                                <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-bold tracking-wider text-slate-400 uppercase dark:bg-slate-800">
                                  {useCase.industry}
                                </span>
                              </div>

                              <h3 className="group-hover:text-primary-600 dark:group-hover:text-primary-400 mb-2 text-2xl font-bold text-slate-900 transition-colors dark:text-white">
                                {useCase.title}
                              </h3>
                              <p className="mb-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                                {useCase.subtitle}
                              </p>

                              <div className="mb-6 flex-grow">
                                <h4 className="mb-2 text-xs font-bold tracking-wider text-slate-400 uppercase">Challenge:</h4>
                                <p className="line-clamp-3 text-sm text-slate-600 dark:text-slate-400">
                                  {useCase.challenge}
                                </p>
                              </div>

                              {/* Results Preview */}
                              {useCase.results && useCase.results.length > 0 && (
                                <div className="border-t border-slate-100 pt-4 dark:border-slate-800">
                                  <h4 className="mb-3 text-xs font-bold tracking-wider text-green-600 uppercase dark:text-green-400">Key Results:</h4>
                                  <ul className="space-y-2">
                                    {useCase.results.slice(0, 2).map((result, idx) => (
                                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                                        <span className="mt-0.5 text-green-500">✓</span>
                                        <span className="line-clamp-1">{result}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              <div className="text-primary-600 dark:text-primary-400 mt-6 flex items-center text-sm font-bold transition-all group-hover:gap-2">
                                Baca Studi Kasus
                                {' '}
                                <ArrowRight className="ml-1 h-4 w-4" />
                              </div>
                            </article>
                          </SpotlightCard>
                        </Link>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-16">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-slate-800 bg-slate-900 px-4 py-16 sm:px-6 lg:px-8 dark:bg-slate-950">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">
            Ingin Hasil Serupa untuk Bisnis Anda?
          </h2>
          <p className="mb-8 text-lg text-slate-300">
            Diskusikan tantangan operasional Anda dengan tim konsultan kami. Gratis dan tanpa komitmen.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/contact">
              <Button size="lg" className="bg-primary-600 hover:bg-primary-700 w-full text-white sm:w-auto">
                Jadwalkan Konsultasi
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline" className="w-full border-slate-600 text-white hover:bg-white/10 sm:w-auto">
                Lihat Demo Platform
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
