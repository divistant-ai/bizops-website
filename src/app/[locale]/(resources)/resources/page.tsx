import {
  ArrowRight,
  BookOpen,
  Calendar,
  Download,
  FileText,
  Map,
  Video,
} from 'lucide-react';
import Link from 'next/link';
import { Container, Section } from '@/components/layout';
import { Button } from '@/components/ui';
import { FadeIn } from '@/components/ui/FadeIn';
import { blogContent, docsData, eventsData } from '@/data/resourcesContent';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';

export const metadata = genMeta({
  title: 'Pusat Sumber Daya & Belajar | BizOps',
  description: 'Artikel, dokumentasi, webinar, dan alat bantu untuk memaksimalkan operasional bisnis Anda.',
});

export default function ResourcesPage() {
  const latestEvent = eventsData.upcoming[0];
  const featuredPost = blogContent.featured;

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero */}
      <Section className="relative overflow-hidden bg-neutral-900 pt-32 pb-20 text-white">
        <div className="bg-primary-600/10 pointer-events-none absolute top-0 right-0 h-[600px] w-[600px] rounded-full blur-[120px]"></div>
        <Container className="relative z-10 text-center">
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-6xl">
            Resources Hub
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-xl text-neutral-300">
            Kumpulan panduan, wawasan industri, dan alat bantu teknis untuk membantu Anda tumbuh.
          </p>

          {/* Quick Links Grid */}
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { label: 'Blog & Artikel', icon: BookOpen, href: '/blog' },
              { label: 'Event & Webinar', icon: Calendar, href: '/events' },
              { label: 'Dokumentasi', icon: FileText, href: '/docs' },
              { label: 'Product Roadmap', icon: Map, href: '/roadmap' },
            ].map((item, i) => (
              <Link key={i} href={item.href} className="group">
                <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:bg-white/10">
                  <item.icon className="text-primary-400 h-8 w-8 transition-transform group-hover:scale-110" />
                  <span className="font-medium">{item.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Featured Content (Blog & Event) */}
      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Featured Blog */}
            <FadeIn>
              <div className="hover:border-primary-200 flex h-full flex-col rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm transition-colors">
                <div className="text-primary-600 mb-4 flex items-center gap-2 text-sm font-bold tracking-wider uppercase">
                  <BookOpen className="h-4 w-4" />
                  {' '}
                  Featured Article
                </div>
                <h3 className="mb-4 text-2xl font-bold text-neutral-900">
                  {featuredPost.title}
                </h3>
                <p className="mb-6 flex-grow text-neutral-600">
                  {featuredPost.summary}
                </p>
                <Link href={`/blog/${featuredPost.slug}`} className="text-primary-600 inline-flex items-center font-bold transition-all hover:gap-2">
                  Baca Selengkapnya
                  {' '}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </FadeIn>

            {/* Upcoming Event */}
            {latestEvent && (
              <FadeIn delay={0.1}>
                <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-neutral-900 p-8 text-white">
                  <div className="bg-primary-600/20 group-hover:bg-primary-600/30 absolute top-0 right-0 h-64 w-64 rounded-full blur-[80px] transition-colors"></div>
                  <div className="relative z-10 flex h-full flex-col">
                    <div className="text-primary-400 mb-4 flex items-center gap-2 text-sm font-bold tracking-wider uppercase">
                      <Video className="h-4 w-4" />
                      {' '}
                      Upcoming Webinar
                    </div>
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <h3 className="text-2xl font-bold text-white">
                        {latestEvent.title}
                      </h3>
                      <div className="min-w-[60px] rounded-lg bg-white/10 px-3 py-1 text-center">
                        <div className="text-xs text-neutral-400 uppercase">Date</div>
                        <div className="font-bold">{latestEvent.formattedDate.split(' ')[0]}</div>
                      </div>
                    </div>
                    <p className="mb-6 flex-grow text-neutral-400">
                      {latestEvent.desc}
                    </p>
                    <div className="mt-auto flex items-center gap-4">
                      <Button className="bg-primary-600 hover:bg-primary-700 border-none text-white">
                        Daftar Gratis
                      </Button>
                      <Link href="/events" className="hover:text-primary-400 text-sm font-medium">
                        Lihat Jadwal Lain
                      </Link>
                    </div>
                  </div>
                </div>
              </FadeIn>
            )}
          </div>
        </Container>
      </Section>

      {/* Categories / Hub */}
      <Section className="border-t border-neutral-200 bg-white">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-neutral-900">Eksplorasi Berdasarkan Topik</h2>
            <p className="text-lg text-neutral-600">Temukan panduan spesifik untuk peran Anda.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {docsData.categories.slice(0, 6).map((cat, i) => (
              <Link key={i} href="/docs" className="group">
                <FadeIn delay={i * 0.05}>
                  <div className="hover:border-primary-200 h-full rounded-2xl border border-neutral-100 bg-neutral-50 p-6 transition-all hover:shadow-lg">
                    <div className="text-primary-600 mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm transition-transform group-hover:scale-110">
                      {/* Note: Icon is a component in data, need to render it.
                          But here we are in Client Component (if imported)?
                          No, this is Server Component by default unless 'use client' top.
                          Wait, lucide icons are components.
                          We can render them directly as <cat.icon />
                      */}
                      <cat.icon className="h-6 w-6" />
                    </div>
                    <h3 className="group-hover:text-primary-600 mb-2 text-lg font-bold text-neutral-900">{cat.title}</h3>
                    <p className="text-sm text-neutral-600">{cat.desc}</p>
                  </div>
                </FadeIn>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Migration Tools Teaser */}
      <Section className="bg-primary-50">
        <Container>
          <div className="border-primary-100 shadow-primary-500/5 flex flex-col items-center justify-between gap-8 rounded-[2.5rem] border bg-white p-8 shadow-xl md:flex-row md:p-12">
            <div className="max-w-xl">
              <h2 className="mb-4 text-3xl font-bold text-neutral-900">Sedang Migrasi dari Sistem Lama?</h2>
              <p className="mb-6 text-lg text-neutral-600">
                Kami menyediakan panduan langkah-demi-langkah dan template Excel untuk memindahkan data Anda dengan aman.
              </p>
              <div className="flex gap-4">
                <Link href="/migration">
                  <Button size="lg" className="bg-primary-600 hover:bg-primary-700 rounded-full text-white">
                    Lihat Panduan Migrasi
                  </Button>
                </Link>
                <Link href="/migration">
                  <Button variant="outline" className="gap-2 rounded-full border-neutral-300 hover:bg-neutral-50">
                    <Download className="h-4 w-4" />
                    {' '}
                    Download Template
                  </Button>
                </Link>
              </div>
            </div>
            <div className="w-full max-w-xs opacity-80">
              {/* Visual illustration could go here */}
              <div className="from-primary-100 to-primary-50 flex aspect-square items-center justify-center rounded-full bg-gradient-to-tr">
                <FileText className="text-primary-200 h-32 w-32" />
              </div>
            </div>
          </div>
        </Container>
      </Section>

    </div>
  );
}
