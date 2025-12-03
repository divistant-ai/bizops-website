import { notFound } from 'next/navigation';
import StructuredData from '@/components/StructuredData';
import { blogPosts } from '@/data/resourcesContent';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';
import { getArticleSchema, getBreadcrumbSchema, getWebPageSchema } from '@/libs/utils/structured-data';
import BlogDetailContent from './BlogDetailContent';

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
  const { slug, locale } = await params;
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Related Posts Logic
  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  if (relatedPosts.length < 3) {
    const otherPosts = blogPosts
      .filter(p => p.slug !== post.slug && !relatedPosts.find(rp => rp.slug === p.slug))
      .slice(0, 3 - relatedPosts.length);
    relatedPosts.push(...otherPosts);
  }

  // Structured Data for SEO
  const structuredData = [
    getWebPageSchema({
      url: `/${locale}/blog/${slug}`,
      title: post.title,
      description: post.summary,
      datePublished: post.date,
    }),
    getArticleSchema({
      headline: post.title,
      description: post.summary,
      url: `/${locale}/blog/${slug}`,
      image: post.image,
      datePublished: post.date,
      author: {
        name: post.author,
      },
    }),
    getBreadcrumbSchema([
      { name: 'Home', url: `/${locale}` },
      { name: 'Blog', url: `/${locale}/blog` },
      { name: post.title, url: `/${locale}/blog/${slug}` },
    ]),
  ];

  return (
    <>
      <StructuredData data={structuredData} />
      <BlogDetailContent post={post} relatedPosts={relatedPosts} />
    </>
  );
}
