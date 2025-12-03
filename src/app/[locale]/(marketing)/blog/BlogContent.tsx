'use client';

import { AnimatePresence, motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import {
  Calendar,
  Clock,
  Search,
  X,
} from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Pagination from '@/components/Pagination';
import { OptimizedImage } from '@/components/ui';
import Button from '@/components/ui/Button';

// SpotlightCard Component
const SpotlightCard = ({ children, className = '', spotlightColor = 'rgba(59, 130, 246, 0.1)' }: { children: React.ReactNode; className?: string; spotlightColor?: string }) => {
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
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
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

// Sample blog data - should come from props or API
const blogPosts = [
  {
    title: '10 Tanda Perusahaan Anda Butuh ERP',
    summary: 'Pelajari indikator kunci yang menunjukkan bisnis Anda siap untuk transformasi digital dengan sistem ERP terintegrasi.',
    category: 'Business Strategy',
    date: '15 Nov 2024',
    author: 'Tim BizOps',
    slug: '10-tanda-butuh-erp',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  },
  {
    title: 'Panduan Implementasi ERP untuk UMKM',
    summary: 'Langkah-langkah praktis memulai digitalisasi untuk bisnis skala kecil dan menengah.',
    category: 'Implementation',
    date: '10 Nov 2024',
    author: 'Andi Wijaya',
    slug: 'panduan-erp-umkm',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80',
  },
  {
    title: 'Cara Menghitung ROI Investasi ERP',
    summary: 'Metode perhitungan return on investment yang akurat untuk proyek transformasi digital.',
    category: 'Finance',
    date: '5 Nov 2024',
    author: 'Sarah Chen',
    slug: 'hitung-roi-erp',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  },
  {
    title: 'Otomasi Proses Bisnis dengan Workflow Engine',
    summary: 'Tingkatkan efisiensi operasional dengan mengotomatisasi approval dan notifikasi.',
    category: 'Technology',
    date: '1 Nov 2024',
    author: 'Budi Hartono',
    slug: 'otomasi-workflow',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
  },
  {
    title: 'Manajemen Inventory untuk Retail Modern',
    summary: 'Strategi mengelola stok multi-gudang dengan akurasi tinggi dan real-time tracking.',
    category: 'Operations',
    date: '28 Okt 2024',
    author: 'Linda Tan',
    slug: 'manajemen-inventory',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
  },
  {
    title: 'Kepatuhan Pajak Digital: Update Regulasi 2024',
    summary: 'Perubahan terbaru dalam perpajakan digital dan dampaknya terhadap bisnis Anda.',
    category: 'Compliance',
    date: '25 Okt 2024',
    author: 'Dewi Kusuma',
    slug: 'pajak-digital-2024',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80',
  },
  {
    title: 'Dashboard Analytics untuk Pengambilan Keputusan',
    summary: 'Visualisasi data yang efektif untuk insight bisnis yang actionable.',
    category: 'Analytics',
    date: '20 Okt 2024',
    author: 'Rudi Santoso',
    slug: 'dashboard-analytics',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  },
];

const featuredPost = blogPosts[0]!;

export default function BlogContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document.getElementById('blog-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Extract unique categories and counts
  const categories = ['All', ...Array.from(new Set(blogPosts.map(p => p.category))).sort()];

  const getCategoryCount = (cat: string) => {
    if (cat === 'All') {
      return blogPosts.length;
    }
    return blogPosts.filter(p => p.category === cat).length;
  };

  // Filter Logic
  const filteredPosts = blogPosts.filter((post) => {
    const matchSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase())
      || post.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  // If filtering, show all matches. If not filtering (All), exclude featured from grid to avoid duplicate
  const gridPosts = (selectedCategory === 'All' && !searchQuery && featuredPost)
    ? filteredPosts.filter(p => p.slug !== featuredPost.slug)
    : filteredPosts;

  // Pagination Logic
  const totalPages = Math.ceil(gridPosts.length / ITEMS_PER_PAGE);
  const paginatedPosts = gridPosts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      {/* Hero Section */}
      <section className="relative border-b border-slate-200 bg-white px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 md:text-6xl">
              BizOps
              {' '}
              <span className="text-primary-600">Insights</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              Panduan praktis, tren industri, dan best practices untuk pemimpin bisnis yang ingin bertumbuh.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mb-8 max-w-2xl"
          >
            <div className="relative">
              <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari artikel..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="focus:ring-primary-500 w-full rounded-2xl border border-slate-300 bg-white py-4 pr-12 pl-12 text-slate-900 placeholder-slate-400 transition-all focus:ring-2 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </motion.div>

          {/* Category Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'hover:border-primary-400 border border-slate-300 bg-white text-slate-600'
                }`}
              >
                {cat}
                {' '}
                <span className="text-xs opacity-70">
                  (
                  {getCategoryCount(cat)}
                  )
                </span>
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Post (only show if no filters) */}
      {selectedCategory === 'All' && !searchQuery && featuredPost && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="group relative min-h-[500px] overflow-hidden rounded-3xl shadow-2xl">
            <OptimizedImage
              src={featuredPost.image}
              alt={featuredPost.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              width={1200}
              height={600}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 max-w-3xl p-8 md:p-12">
              <span className="bg-primary-600 mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-bold tracking-wider text-white uppercase">
                Featured Article
              </span>
              <h2 className="group-hover:text-primary-200 mb-4 text-3xl font-bold text-white transition-colors md:text-5xl">
                <Link href={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
              </h2>
              <p className="mb-6 line-clamp-2 text-lg text-slate-300">
                {featuredPost.summary}
              </p>
              <div className="flex items-center gap-6 text-slate-300">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {featuredPost.date}
                </span>
                <span>•</span>
                <span>{featuredPost.author}</span>
                <span>•</span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  8 min read
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section id="blog-grid" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[...Array.from({ length: 6 })].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="mb-4 h-48 rounded-2xl bg-slate-200"></div>
                <div className="mb-2 h-4 rounded bg-slate-200"></div>
                <div className="h-4 w-3/4 rounded bg-slate-200"></div>
              </div>
            ))}
          </div>
        ) : paginatedPosts.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-lg text-slate-500">
              Tidak ada artikel yang sesuai dengan pencarian Anda.
            </p>
            <Button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-6"
            >
              Reset Filter
            </Button>
          </div>
        ) : (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              >
                {paginatedPosts.map(post => (
                  <Link key={post.slug} href={`/blog/${post.slug}`}>
                    <SpotlightCard className="h-full rounded-2xl">
                      <article className="flex h-full flex-col p-6">
                        <div className="relative mb-4 h-48 overflow-hidden rounded-xl">
                          <OptimizedImage
                            src={post.image}
                            alt={post.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            width={400}
                            height={300}
                          />
                        </div>
                        <span className="text-primary-600 mb-2 text-xs font-bold tracking-wider uppercase">
                          {post.category}
                        </span>
                        <h3 className="group-hover:text-primary-600 mb-3 line-clamp-2 text-xl font-bold text-slate-900 transition-colors">
                          {post.title}
                        </h3>
                        <p className="mb-4 line-clamp-3 flex-grow text-sm text-slate-600">
                          {post.summary}
                        </p>
                        <div className="mt-auto flex items-center justify-between border-t border-slate-200 pt-4 text-xs text-slate-500">
                          <span>{post.date}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            5 min
                          </span>
                        </div>
                      </article>
                    </SpotlightCard>
                  </Link>
                ))}
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
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">
            Ingin Artikel Dikirim ke Email Anda?
          </h2>
          <p className="mb-8 text-slate-300">
            Dapatkan insight terbaru setiap minggu langsung ke inbox Anda.
          </p>
          <div className="mx-auto flex max-w-md flex-col justify-center gap-4 sm:flex-row">
            <input
              type="email"
              placeholder="email@perusahaan.com"
              className="focus:ring-primary-500 flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:ring-2 focus:outline-none"
            />
            <Button className="bg-primary-600 hover:bg-primary-700 text-white">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
