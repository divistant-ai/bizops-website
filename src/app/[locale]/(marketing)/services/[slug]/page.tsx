import { notFound } from 'next/navigation';
import GenericLandingPage from '@/components/templates/GenericLandingPage';
import { servicesData } from '@/data/servicesContent';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';
import { transformContent } from '@/libs/utils/transformContent';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const data = servicesData[slug];

  if (!data) {
    return {};
  }

  return genMeta({
    title: `${data.title} | Layanan BizOps`,
    description: data.subtitle || data.description,
  });
}

export async function generateStaticParams() {
  return Object.keys(servicesData).map(slug => ({
    slug,
  }));
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const rawData = servicesData[slug];

  if (!rawData) {
    notFound();
  }

  // Transform data (serialize icons, handle mapping)
  // Note: servicesData already has 'methodology', 'benefits', 'deliverables' which match the updated GenericLandingPage props.
  // We just need to ensure icons are serialized.
  const data = transformContent(rawData);

  return <GenericLandingPage data={data} />;
}
