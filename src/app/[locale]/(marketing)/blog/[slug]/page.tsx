import { ArrowLeft, Calendar, Tag, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container, Section } from '@/components/layout';
import { Badge } from '@/components/ui';
import { blogPosts } from '@/data/resourcesContent';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return {};
  }

  return genMeta({
    title: `${post.title} | Blog BizOps`,
    description: post.summary,
  });
}

export async function generateStaticParams() {
  return blogPosts.map(post => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <Section className="pt-32 pb-20">
        <Container size="4xl">
          <Link href="/blog" className="hover:text-primary-600 mb-8 inline-flex items-center text-sm font-medium text-neutral-500 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {' '}
            Kembali ke Blog
          </Link>

          <div className="mb-6 flex flex-wrap items-center gap-4">
             <Badge variant="neutral" className="bg-primary-50 text-primary-700 hover:bg-primary-100">
              <Tag className="mr-1 h-3 w-3" />
              {' '}
              {post.category}
            </Badge>
            <span className="flex items-center text-sm text-neutral-500">
              <Calendar className="mr-1 h-3 w-3" />
              {' '}
              {post.date}
            </span>
            <span className="flex items-center text-sm text-neutral-500">
              <User className="mr-1 h-3 w-3" />
              {' '}
              {post.author}
            </span>
          </div>

          <h1 className="mb-8 text-3xl leading-tight font-extrabold text-neutral-900 md:text-5xl">
            {post.title}
          </h1>

          {post.image && (
            <div className="relative mb-12 aspect-video w-full overflow-hidden rounded-3xl shadow-xl">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="prose prose-lg prose-neutral prose-headings:font-bold prose-headings:text-neutral-900 prose-a:text-primary-600 hover:prose-a:text-primary-700 max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          {/* Author Bio or CTA could go here */}
          <div className="mt-16 border-t border-neutral-200 pt-8">
            <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-neutral-50 p-8 md:flex-row">
              <div>
                <h3 className="mb-2 text-lg font-bold text-neutral-900">Tertarik menerapkan strategi ini?</h3>
                <p className="text-neutral-600">Diskusikan kebutuhan spesifik perusahaan Anda dengan tim konsultan kami.</p>
              </div>
              <Link href="/contact" className="bg-primary-600 hover:bg-primary-700 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium whitespace-nowrap text-white transition-colors">
                Jadwalkan Konsultasi
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
