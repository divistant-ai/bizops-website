import { notFound } from 'next/navigation';
import ModulePage from '@/components/templates/ModulePage';
import { capabilitiesData, modulesData } from '@/data/platformContent';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';

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

// Helper function to get related modules (moved from client)
function getRelatedModules(slug: string) {
  const allModulesAndCapabilities = [
    ...Object.entries(modulesData).map(([key, val]) => ({ id: key, ...val, type: 'module' })),
    ...Object.entries(capabilitiesData).map(([key, val]) => ({ id: key, ...val, type: 'capability' })),
  ];

  const filtered = allModulesAndCapabilities.filter(item => item.id !== slug);

  const recommendations: Record<string, string[]> = {
    'hr': ['finance', 'operations', 'sales'],
    'finance': ['sales', 'supply-chain', 'hr'],
    'sales': ['finance', 'supply-chain', 'operations'],
    'supply-chain': ['sales', 'finance', 'operations'],
    'operations': ['hr', 'finance', 'supply-chain'],
    'governance': ['automation-ai', 'analytics', 'multi-company'],
  };

  const recommended = recommendations[slug] || [];
  const relatedItems = filtered.filter(m => recommended.includes(m.id));
  return relatedItems.length > 0 ? relatedItems.slice(0, 3) : filtered.slice(0, 3);
}

export default async function ModulePageRoute(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const data = modulesData[slug];

  if (!data) {
    notFound();
  }

  // Get related modules on server and pass only IDs
  const relatedModulesRaw = getRelatedModules(slug);
  const relatedModuleIds = relatedModulesRaw.map(m => ({
    id: m.id,
    type: (m.type as 'module' | 'capability') || 'module',
  }));

  return <ModulePage moduleId={slug} relatedModuleIds={relatedModuleIds} />;
}
