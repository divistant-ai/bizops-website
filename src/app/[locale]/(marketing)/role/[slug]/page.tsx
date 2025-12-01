import { notFound } from 'next/navigation';
import GenericLandingPage from '@/components/templates/GenericLandingPage';
import { rolesData } from '@/data/solutionsContent';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';
import { transformContent } from '@/libs/utils/transformContent';

export function generateStaticParams() {
  return Object.keys(rolesData).map(slug => ({
    slug,
  }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const data = rolesData[slug];

  if (!data) {
    return {};
  }

  return genMeta({
    title: data.metaTitle || `${data.title} | BizOps for Roles`,
    description: data.metaDesc,
  });
}

export default async function RolePage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const rawData = rolesData[slug];

  if (!rawData) {
    notFound();
  }

  const data = transformContent(rawData);

  return <GenericLandingPage data={data as any} />;
}
