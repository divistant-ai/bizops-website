import { notFound } from 'next/navigation';
import { UseCaseTemplate } from '@/components/templates/UseCaseTemplate';
import { useCasesData } from '@/data/useCasesContent';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';
import { transformContent } from '@/libs/utils/transformContent';

type PageProps = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const data = useCasesData[slug];
  if (!data) {
    return {};
  }

  return genMeta({
    title: `${data.title} - ${data.industry} Case Study | BizOps`,
    description: data.subtitle,
  });
}

export async function generateStaticParams() {
  return Object.keys(useCasesData).map(slug => ({
    slug,
  }));
}

export default async function UseCaseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const data = useCasesData[slug];

  if (!data) {
    notFound();
  }

  // Transform icon to React Element for serialization
  const transformedData = transformContent(data);

  return <UseCaseTemplate data={transformedData} />;
}
