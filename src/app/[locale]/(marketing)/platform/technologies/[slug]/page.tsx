import { notFound } from 'next/navigation';
import GenericLandingPage from '@/components/templates/GenericLandingPage';
import { capabilitiesData } from '@/data/platformContent';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';
import { transformContent } from '@/libs/utils/transformContent';

export function generateStaticParams() {
  return Object.keys(capabilitiesData).map(slug => ({
    slug,
  }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const data = capabilitiesData[slug];

  if (!data) {
    return {};
  }

  return genMeta({
    title: `${data.title} | BizOps Technologies`,
    description: data.description || data.subtitle,
  });
}

export default async function TechnologyPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const rawData = capabilitiesData[slug];

  if (!rawData) {
    notFound();
  }

  const data = transformContent(rawData);

  return <GenericLandingPage data={data as any} />;
}
