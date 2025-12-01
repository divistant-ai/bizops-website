import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Container, Section } from '@/components/layout';
import { blogContent } from '@/data/resourcesContent';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';

export const metadata = genMeta({
  title: 'Blog & Insight Bisnis | BizOps',
  description: 'Artikel terbaru seputar strategi operasional, perpajakan, dan teknologi ERP.',
});

export default function BlogPage() {
  const featured = blogContent.featured;
  const pillars = blogContent.pillars;

  return (
    <div className="min-h-screen bg-neutral-50">
      <Section className="bg-white pt-32 pb-12">
        <Container>
          <div className="mb-16 text-center">
            <h1 className="mb-4 text-4xl font-bold text-neutral-900 md:text-5xl">BizOps Insights</h1>
            <p className="mx-auto max-w-2xl text-xl text-neutral-600">
              Panduan praktis untuk pemimpin bisnis yang ingin bertumbuh.
            </p>
          </div>

          {/* Featured Post (Hero) */}
          <div className="group relative mb-20 overflow-hidden rounded-3xl bg-neutral-900 shadow-2xl">
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-transparent"></div>
            {/* Fallback image or pattern */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700"></div>

            <div className="relative z-20 max-w-3xl p-8 md:p-16">
              <div className="bg-primary-600 mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold tracking-wider text-white uppercase">
                Featured Story
              </div>
              <h2 className="mb-6 text-3xl leading-tight font-bold text-white md:text-5xl">
                <Link href={`/blog/${featured.slug}`}>
                  <span className="decoration-primary-500 decoration-2 underline-offset-4 hover:underline">
                    {featured.title}
                  </span>
                </Link>
              </h2>
              <p className="mb-8 text-xl leading-relaxed text-neutral-300">
                {featured.summary}
              </p>
              <div className="flex items-center gap-6 text-sm font-medium text-neutral-400">
                <span>{featured.meta}</span>
                <Link href={`/blog/${featured.slug}`} className="hover:text-primary-400 flex items-center text-white transition-colors">
                  Baca Artikel
                  {' '}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Pillars Grid */}
          <h2 className="mb-8 border-b border-neutral-200 pb-4 text-2xl font-bold text-neutral-900">
            Topik Pilihan
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {pillars.map((post, i) => {
              // Render icon directly since we are in Server Component context for page
              // But if we want to be safe or if 'post' data has function icon, we can render it as Component
              const Icon = post.icon;

              return (
                <Link key={i} href={`/blog/${post.slug}`} className="group block h-full">
                  <article className="hover:border-primary-200 flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-8 transition-all hover:shadow-lg">
                    <div className="mb-6 flex items-start justify-between">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${post.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-bold tracking-wider text-neutral-400 uppercase">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="group-hover:text-primary-600 mb-3 text-xl font-bold text-neutral-900 transition-colors">
                      {post.title}
                    </h3>
                    <p className="mb-6 flex-grow text-neutral-600">
                      {post.snippet}
                    </p>
                    <div className="text-primary-600 mt-auto flex items-center text-sm font-bold transition-transform group-hover:translate-x-1">
                      Baca Selengkapnya
                      {' '}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>
    </div>
  );
}
