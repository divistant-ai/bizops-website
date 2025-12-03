import { notFound } from 'next/navigation';
import { legalContent } from '@/data/legalContent';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';
import LegalDetailContent from './LegalDetailContent';

type PageProps = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const data = legalContent[slug];
  if (!data) {
    return {};
  }

  return genMeta({
    title: `${data.title} | Legal BizOps`,
    description: data.subtitle,
  });
}

export async function generateStaticParams() {
  return Object.keys(legalContent).map(slug => ({
    slug,
  }));
}

export default async function LegalDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const data = legalContent[slug];

  if (!data) {
    notFound();
  }

  return <LegalDetailContent slug={slug} data={data} />;
}
