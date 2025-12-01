import type { Metadata } from 'next';

type MetadataProps = {
  title?: string;
  description?: string;
  keywords?: Array<string>;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
};

/**
 * Generate metadata for Next.js pages
 */
export function generateMetadata({
  title = 'BizOps - The Adaptive Business Operating System',
  description = 'Enterprise-grade ERP solution for modern businesses. Streamline operations, boost productivity, and scale with confidence.',
  keywords = ['ERP', 'Business Operations', 'Enterprise Software', 'Indonesia'],
  image = '/og-image.jpg',
  url,
  type = 'website',
  noIndex = false,
}: MetadataProps = {}): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bizops.id';
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const imageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;

  return {
    title: {
      default: title,
      template: '%s | BizOps',
    },
    description,
    keywords,
    authors: [{ name: 'BizOps Team' }],
    creator: 'BizOps',
    publisher: 'BizOps',
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
      },
    },
    openGraph: {
      type,
      url: fullUrl,
      title,
      description,
      siteName: 'BizOps',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: fullUrl,
    },
  };
}
