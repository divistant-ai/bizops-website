import type { MetadataRoute } from 'next';
import { servicesItems, solutionsContent } from '@/data/navData';
import { capabilitiesData, modulesData } from '@/data/platformContent';
import { getBaseUrl } from '@/libs/utils/helpers';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const now = new Date();

  // Helper to create sitemap entry
  const createEntry = (
    path: string,
    priority: number = 0.7,
    changeFreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' = 'weekly',
  ): MetadataRoute.Sitemap[0] => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: changeFreq,
    priority,
  });

  const routes: MetadataRoute.Sitemap = [
    // Main Pages (High Priority)
    createEntry('/', 1.0, 'daily'),
    createEntry('/platform', 0.9, 'weekly'),
    createEntry('/solutions', 0.9, 'weekly'),
    createEntry('/services', 0.9, 'weekly'),
    createEntry('/pricing', 0.9, 'weekly'),
    createEntry('/resources', 0.8, 'weekly'),
    createEntry('/about', 0.8, 'monthly'),
    createEntry('/why-bizops', 0.8, 'monthly'),
    createEntry('/trust', 0.7, 'monthly'),
    createEntry('/contact', 0.7, 'monthly'),
    createEntry('/demo', 0.8, 'weekly'),
    createEntry('/product-tour', 0.7, 'monthly'),

    // Platform Modules
    ...Object.keys(modulesData).map(slug =>
      createEntry(`/platform/modules/${slug}`, 0.8, 'monthly'),
    ),

    // Platform Capabilities
    ...Object.keys(capabilitiesData).map(slug =>
      createEntry(`/platform/capabilities/${slug}`, 0.7, 'monthly'),
    ),

    // Platform Technologies (hardcoded for now)
    createEntry('/platform/technologies/integration', 0.7, 'monthly'),
    createEntry('/platform/technologies/self-hosted', 0.7, 'monthly'),
    createEntry('/platform/technologies/architecture', 0.7, 'monthly'),

    // Solutions - By Industry
    ...(solutionsContent.industry?.items.map(item =>
      createEntry(item.to, 0.7, 'monthly'),
    ) || []),

    // Solutions - By Role
    ...(solutionsContent.role?.items.map(item =>
      createEntry(item.to, 0.7, 'monthly'),
    ) || []),

    // Services
    ...servicesItems.map(item =>
      createEntry(item.to, 0.8, 'monthly'),
    ),

    // Resources
    createEntry('/blog', 0.8, 'daily'),
    createEntry('/use-cases', 0.7, 'weekly'),
    createEntry('/customers', 0.7, 'weekly'),
    createEntry('/events', 0.6, 'weekly'),
    createEntry('/glossary', 0.6, 'monthly'),
    createEntry('/roadmap', 0.6, 'weekly'),
    createEntry('/docs', 0.7, 'weekly'),
    createEntry('/status', 0.5, 'daily'),
    createEntry('/download', 0.6, 'monthly'),
    createEntry('/migration', 0.7, 'monthly'),
    createEntry('/integrations', 0.7, 'monthly'),
    createEntry('/analytics', 0.6, 'monthly'),
    createEntry('/sitemap', 0.3, 'monthly'),

    // Tools (Customer Tools)
    createEntry('/tools', 0.8, 'weekly'),
    createEntry('/tools/pajak-pph21', 0.7, 'monthly'),
    createEntry('/tools/gaji-bersih', 0.7, 'monthly'),
    createEntry('/tools/bpjs', 0.7, 'monthly'),
    createEntry('/tools/margin-markup', 0.7, 'monthly'),
    createEntry('/tools/invoice-checker', 0.7, 'monthly'),
    createEntry('/tools/break-even-point', 0.7, 'monthly'),
    createEntry('/tools/efisiensi-produksi', 0.7, 'monthly'),

    // Tools (Strategic Tools)
    createEntry('/tools/assessment', 0.8, 'monthly'),
    createEntry('/tools/needs-analysis', 0.8, 'monthly'),
    createEntry('/tools/roi-calculator', 0.8, 'monthly'),
    createEntry('/tools/timeline-generator', 0.7, 'monthly'),
    createEntry('/tools/biaya-turnover', 0.7, 'monthly'),
    createEntry('/pricing/calculator', 0.8, 'monthly'),

    // Company Pages
    createEntry('/careers', 0.7, 'weekly'),
    createEntry('/partners', 0.7, 'monthly'),
    createEntry('/partners/directory', 0.6, 'monthly'),
    createEntry('/partners/startup', 0.6, 'monthly'),
    createEntry('/media-kit', 0.5, 'monthly'),

    // Legal Pages
    createEntry('/legal/privacy', 0.5, 'yearly'),
    createEntry('/legal/terms', 0.5, 'yearly'),
    createEntry('/legal/cookies', 0.5, 'yearly'),
    createEntry('/legal/accessibility', 0.5, 'yearly'),

    // Utility Pages
    createEntry('/compare', 0.6, 'monthly'),
    createEntry('/thank-you', 0.3, 'never'),
    createEntry('/coming-soon', 0.3, 'monthly'),
  ];

  return routes;
}
