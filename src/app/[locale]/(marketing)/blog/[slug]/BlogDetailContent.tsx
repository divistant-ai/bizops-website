'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Facebook,
  Linkedin,
  Menu,
  Twitter,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Badge, OptimizedImage } from '@/components/ui';
import Button from '@/components/ui/Button';

type BlogPost = {
  title: string;
  summary: string;
  category: string;
  date: string;
  author: string;
  slug: string;
  image: string;
  content: string;
};

type BlogDetailContentProps = {
  post: BlogPost;
  relatedPosts: BlogPost[];
};

export default function BlogDetailContent({ post, relatedPosts }: BlogDetailContentProps) {
  const containerRef = useRef(null);

  // Scroll Progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Parallax Hero
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  // Table of Contents State
  const [activeId, setActiveId] = useState<string>('');
  const [headings, setHeadings] = useState<{ id: string; text: string }[]>([]);
  const [tocOpen, setTocOpen] = useState(false);

  useEffect(() => {
    if (post?.content) {
      // Extract h2 headings using regex
      const regex = /<h2 id="([^"]+)"[^>]*>(.*?)<\/h2>/g;
      const extractedHeadings = [];
      let match;
      while ((match = regex.exec(post.content)) !== null) {
        if (match[1] && match[2]) {
          extractedHeadings.push({ id: match[1], text: match[2].replace(/<[^>]*>?/g, '') });
        }
      }
      setHeadings(extractedHeadings);
    }
  }, [post]);

  // Scroll Spy Logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -60% 0px' },
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  // Share functionality
  const handleShare = (platform: string) => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const text = post.title;

    const shareUrls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-white selection:bg-blue-500/30 dark:bg-slate-950">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 right-0 left-0 z-50 h-1 origin-left bg-blue-600"
        style={{ scaleX }}
      />

      {/* HERO SECTION */}
      <div className="relative h-[80vh] min-h-[600px] w-full overflow-hidden bg-slate-900">
        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="absolute inset-0">
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
          <OptimizedImage
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover opacity-80"
            width={1920}
            height={1080}
            priority
            sizes="100vw"
          />
        </motion.div>

        <div className="absolute inset-0 z-20 mx-auto flex w-full max-w-7xl flex-col justify-end px-4 pb-20 sm:px-6 sm:pb-32 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="max-w-4xl">
            <div className="mb-8 flex flex-wrap items-center gap-3">
              <Link href="/blog" className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold text-white/80 backdrop-blur-md transition-colors hover:bg-white/20 hover:text-white">
                <ArrowLeft className="h-4 w-4" />
                {' '}
                Back to Blog
              </Link>
              <span className="rounded-full border border-blue-500/30 bg-blue-500/20 px-4 py-2 text-xs font-bold tracking-widest text-blue-300 uppercase backdrop-blur-md">
                {post.category}
              </span>
            </div>

            <h1 className="mb-8 font-sans text-4xl leading-[1.1] font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-8 font-sans text-sm font-medium text-white/90">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/20 text-xs font-bold text-white backdrop-blur-md">
                  {post.author.split(' ').map(n => n[0]).join('')}
                </div>
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>8 min read</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">

          {/* Table of Contents (Sidebar) */}
          {headings.length > 0 && (
            <aside className="relative lg:col-span-3">
              <div className="sticky top-24">
                {/* Mobile Toggle */}
                <button
                  onClick={() => setTocOpen(!tocOpen)}
                  className="mb-4 flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4 lg:hidden dark:border-slate-800 dark:bg-slate-900"
                >
                  <span className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                    <Menu className="h-4 w-4" />
                    Table of Contents
                  </span>
                </button>

                {/* TOC Content */}
                <div className={`${tocOpen ? 'block' : 'hidden'} rounded-2xl border border-slate-200 bg-slate-50 p-6 lg:block dark:border-slate-800 dark:bg-slate-900`}>
                  <h3 className="mb-4 text-sm font-bold tracking-wider text-slate-900 uppercase dark:text-white">On This Page</h3>
                  <nav className="space-y-2">
                    {headings.map(({ id, text }) => (
                      <a
                        key={id}
                        href={`#${id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          setTocOpen(false);
                        }}
                        className={`block rounded-lg px-3 py-2 text-sm transition-all ${
                          activeId === id
                            ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 border-primary-600 border-l-2 font-bold'
                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'
                        }`}
                      >
                        {text}
                      </a>
                    ))}
                  </nav>
                </div>

                {/* Share Buttons */}
                <div className="mt-8 hidden rounded-2xl border border-slate-200 bg-slate-50 p-6 lg:block dark:border-slate-800 dark:bg-slate-900">
                  <h3 className="mb-4 text-sm font-bold tracking-wider text-slate-900 uppercase dark:text-white">Share Article</h3>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-2.5 transition-colors hover:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-500"
                    >
                      <Linkedin className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600 dark:text-slate-300">LinkedIn</span>
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-2.5 transition-colors hover:border-sky-500 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-sky-500"
                    >
                      <Twitter className="h-4 w-4 text-sky-500" />
                      <span className="text-sm font-medium text-slate-700 group-hover:text-sky-500 dark:text-slate-300">Twitter</span>
                    </button>
                    <button
                      onClick={() => handleShare('facebook')}
                      className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-2.5 transition-colors hover:border-blue-700 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-700"
                    >
                      <Facebook className="h-4 w-4 text-blue-700" />
                      <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700 dark:text-slate-300">Facebook</span>
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          )}

          {/* Article Content */}
          <article className={`${headings.length > 0 ? 'lg:col-span-9' : 'lg:col-span-12'} max-w-4xl`}>
            <div
              className="prose prose-lg prose-slate dark:prose-invert prose-headings:font-bold
                prose-headings:tracking-tight prose-h2:text-3xl
                prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-2xl
                prose-h3:mt-8 prose-h3:mb-4 prose-p:leading-relaxed
                prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-a:text-primary-600
                prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-900
                dark:prose-strong:text-white prose-code:text-primary-600
                prose-code:bg-slate-100 dark:prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-slate-900
                dark:prose-pre:bg-slate-950 prose-pre:border prose-pre:border-slate-800 prose-img:rounded-2xl
                prose-img:shadow-xl prose-blockquote:border-l-4
                prose-blockquote:border-primary-500 prose-blockquote:bg-slate-50 dark:prose-blockquote:bg-slate-900 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-ul:list-disc
                prose-ol:list-decimal prose-li:text-slate-700
                dark:prose-li:text-slate-300 max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Author CTA */}
            <div className="mt-16 border-t border-slate-200 pt-12 dark:border-slate-800">
              <div className="from-primary-50 dark:from-primary-900/20 border-primary-100 dark:border-primary-900/50 rounded-3xl border bg-gradient-to-br to-blue-50 p-8 md:p-12 dark:to-blue-900/20">
                <div className="flex items-start gap-6">
                  <div className="bg-primary-600 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full text-xl font-bold text-white">
                    {post.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
                      Written by
                      {' '}
                      {post.author}
                    </h3>
                    <p className="mb-6 text-slate-600 dark:text-slate-400">
                      Tim ahli BizOps yang berpengalaman dalam transformasi digital dan optimasi operasional bisnis.
                    </p>
                    <Link href="/contact">
                      <Button className="bg-primary-600 hover:bg-primary-700 text-white">
                        Konsultasi dengan Tim Kami
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-slate-200 bg-slate-50 px-4 py-16 sm:px-6 lg:px-8 dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-10 text-3xl font-bold text-slate-900 dark:text-white">
              Artikel Terkait
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {relatedPosts.map(related => (
                <Link key={related.slug} href={`/blog/${related.slug}`} className="group">
                  <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-950">
                    <div className="relative h-48 overflow-hidden">
                      <OptimizedImage
                        src={related.image}
                        alt={related.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        width={400}
                        height={300}
                      />
                    </div>
                    <div className="flex flex-grow flex-col p-6">
                      <Badge variant="neutral" className="bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 mb-3 w-fit">
                        {related.category}
                      </Badge>
                      <h3 className="group-hover:text-primary-600 dark:group-hover:text-primary-400 mb-3 line-clamp-2 text-lg font-bold text-slate-900 transition-colors dark:text-white">
                        {related.title}
                      </h3>
                      <p className="line-clamp-2 flex-grow text-sm text-slate-600 dark:text-slate-400">
                        {related.summary}
                      </p>
                      <div className="text-primary-600 dark:text-primary-400 mt-4 flex items-center text-sm font-bold transition-all group-hover:gap-2">
                        Baca Artikel
                        {' '}
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-slate-900 px-4 py-16 sm:px-6 lg:px-8 dark:bg-slate-950">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">
            Siap Menerapkan Strategi Ini?
          </h2>
          <p className="mb-8 text-lg text-slate-300">
            Diskusikan kebutuhan spesifik perusahaan Anda dengan tim konsultan kami.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/contact">
              <Button size="lg" className="bg-primary-600 hover:bg-primary-700 w-full text-white sm:w-auto">
                Jadwalkan Konsultasi Gratis
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
