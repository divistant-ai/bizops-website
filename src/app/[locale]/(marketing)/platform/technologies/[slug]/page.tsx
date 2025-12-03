import { notFound } from 'next/navigation';
import ModulePage from '@/components/templates/ModulePage';
import { capabilitiesData, modulesData } from '@/data/platformContent';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';

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
    title: data.metaTitle || `${data.title} | BizOps Technologies`,
    description: data.metaDesc || data.description,
  });
}

// Helper function to get related items (moved from client)
function getRelatedItems(slug: string) {
  const allItems = [
    ...Object.entries(capabilitiesData).map(([key, val]) => ({ id: key, ...val, type: 'capability' })),
    ...Object.entries(modulesData).map(([key, val]) => ({ id: key, ...val, type: 'module' })),
  ];

  const filtered = allItems.filter(item => item.id !== slug);

  const recommendations: Record<string, string[]> = {
    'integration': ['automation-ai', 'self-hosted', 'analytics'],
    'self-hosted': ['integration', 'multi-company', 'architecture'],
    'architecture': ['self-hosted', 'integration', 'governance'],
  };

  const recommended = recommendations[slug] || [];
  const relatedItems = filtered.filter(m => recommended.includes(m.id));
  return relatedItems.length > 0 ? relatedItems.slice(0, 3) : filtered.slice(0, 3);
}

export default async function TechnologyPageRoute(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const data = capabilitiesData[slug];

  if (!data) {
    notFound();
  }

  // Get related items on server and pass only IDs
  const relatedModulesRaw = getRelatedItems(slug);
  const relatedModuleIds = relatedModulesRaw.map(m => ({
    id: m.id,
    type: (m.type as 'module' | 'capability') || 'capability',
  }));

  return <ModulePage moduleId={slug} relatedModuleIds={relatedModuleIds} />;
}
