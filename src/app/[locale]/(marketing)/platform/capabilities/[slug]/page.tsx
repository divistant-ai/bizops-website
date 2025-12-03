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
    title: data.metaTitle || `${data.title} | BizOps Platform`,
    description: data.metaDesc || data.description,
  });
}

// Helper function to get related items (moved from client)
function getRelatedItems(slug: string) {
  const allModulesAndCapabilities = [
    ...Object.entries(modulesData).map(([key, val]) => ({ id: key, ...val, type: 'module' })),
    ...Object.entries(capabilitiesData).map(([key, val]) => ({ id: key, ...val, type: 'capability' })),
  ];

  const filtered = allModulesAndCapabilities.filter(item => item.id !== slug);

  const recommendations: Record<string, string[]> = {
    'automation-ai': ['analytics', 'low-code', 'governance'],
    'multi-company': ['governance', 'finance', 'analytics'],
    'portals': ['sales', 'supply-chain', 'collaboration'],
    'analytics': ['governance', 'automation-ai', 'finance'],
    'mobile': ['sales', 'operations', 'hr'],
    'low-code': ['automation-ai', 'analytics', 'portals'],
    'collaboration': ['operations', 'portals', 'mobile'],
  };

  const recommended = recommendations[slug] || [];
  const relatedItems = filtered.filter(m => recommended.includes(m.id));
  return relatedItems.length > 0 ? relatedItems.slice(0, 3) : filtered.slice(0, 3);
}

export default async function CapabilityPageRoute(props: { params: Promise<{ slug: string }> }) {
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
