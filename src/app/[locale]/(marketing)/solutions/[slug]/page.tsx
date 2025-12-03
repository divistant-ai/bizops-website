import { notFound } from 'next/navigation';
import GenericLandingPage from '@/components/templates/GenericLandingPage';
import { industriesData } from '@/data/solutionsContent';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';
import { transformContent } from '@/libs/utils/transformContent';

export function generateStaticParams() {
  return Object.keys(industriesData).map(slug => ({
    slug,
  }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const data = industriesData[slug];

  if (!data) {
    return {};
  }

  return genMeta({
    title: data.metaTitle || `${data.title} | BizOps Solutions`,
    description: data.metaDesc || data.description,
  });
}

export default async function IndustryPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const rawData = industriesData[slug];

  if (!rawData) {
    notFound();
  }

  // Transform data on server
  const data = transformContent(rawData);

  return <GenericLandingPage data={data as any} />;
}
