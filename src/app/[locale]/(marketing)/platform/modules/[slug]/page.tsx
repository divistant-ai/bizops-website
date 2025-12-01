import { notFound } from 'next/navigation';
import GenericLandingPage from '@/components/templates/GenericLandingPage';
import { modulesData } from '@/data/platformContent';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';
import { transformContent } from '@/libs/utils/transformContent';

export function generateStaticParams() {
  return Object.keys(modulesData).map(slug => ({
    slug,
  }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const data = modulesData[slug];

  if (!data) {
    return {};
  }

  return genMeta({
    title: data.metaTitle || `${data.title} | BizOps Platform`,
    description: data.metaDesc || data.description,
  });
}

export default async function ModulePage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const rawData = modulesData[slug];

  if (!rawData) {
    notFound();
  }

  const data = transformContent(rawData);

  return <GenericLandingPage data={data as any} />;
}
