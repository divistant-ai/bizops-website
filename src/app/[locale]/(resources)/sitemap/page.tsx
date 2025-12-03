import { BookOpen, Briefcase, Code, Globe, HelpCircle, Layers, Shield, Users, Wrench } from 'lucide-react';
import Link from 'next/link';
import Container from '@/components/layout/Container';
import { Grid, Typography } from '@/components/ui';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';

export const metadata = genMeta({
  title: 'Sitemap | BizOps',
  description: 'Complete overview of BizOps website structure.',
  url: '/sitemap',
});

export default function SitemapPage() {
  const sitemapData = [
    {
      title: 'Main',
      icon: Globe,
      color: 'text-indigo-600 dark:text-slate-300 bg-indigo-50',
      links: [
        { label: 'Home', href: '/' },
        { label: 'Product Tour', href: '/product-tour' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Login', href: '/login' },
        { label: 'Request Demo', href: '/demo' },
        { label: 'Global Search', href: '/search' },
      ],
    },
    {
      title: 'Platform',
      icon: Layers,
      color: 'text-blue-600 dark:text-slate-300 bg-blue-50',
      links: [
        { label: 'Platform Overview', href: '/platform' },
        { label: 'Human Capital Module', href: '/platform/modules/hr' },
        { label: 'Finance Module', href: '/platform/modules/finance' },
        { label: 'Operations Module', href: '/platform/modules/operations' },
        { label: 'Capabilities', href: '/platform#capabilities' },
        { label: 'Technology Stack', href: '/platform/technologies/architecture' },
        { label: 'Integrations Library', href: '/platform/technologies/integration' },
        { label: 'Download Apps', href: '/download' },
        { label: 'System Status', href: '/status' },
      ],
    },
    {
      title: 'Solutions',
      icon: Briefcase,
      color: 'text-purple-600 dark:text-slate-300 bg-purple-50',
      links: [
        { label: 'All Industries', href: '/solutions' },
        { label: 'Manufacturing ERP', href: '/solutions/manufacturing' },
        { label: 'Retail & Distribution', href: '/solutions/retail' },
        { label: 'Construction & Engineering', href: '/solutions/construction' },
        { label: 'Outsourcing Service', href: '/solutions/outsourcing' },
        { label: 'Professional Services', href: '/solutions/consulting' },
        { label: 'Enterprise / Holding', href: '/solutions/enterprise' },
        { label: 'By Role Overview', href: '/solutions#role' },
        { label: 'For CEO/Founders', href: '/role/ceo' },
        { label: 'For CFO/Finance', href: '/role/finance' },
        { label: 'For HR Managers', href: '/role/hr' },
        { label: 'For IT Managers (CTO)', href: '/role/it' },
        { label: 'For Ops Managers', href: '/role/ops' },
      ],
    },
    {
      title: 'Services',
      icon: HelpCircle,
      color: 'text-teal-600 dark:text-slate-300 bg-teal-50',
      links: [
        { label: 'Professional Services Overview', href: '/services' },
        { label: 'Strategic Consulting', href: '/services/consulting' },
        { label: 'Implementation & Migration', href: '/services/implementation' },
        { label: 'Custom Development', href: '/services/custom-dev' },
        { label: 'Training & Adoption', href: '/services/training' },
        { label: 'Managed Support (SLA)', href: '/services/support' },
      ],
    },
    {
      title: 'Interactive Tools',
      icon: Wrench,
      color: 'text-amber-600 dark:text-slate-300 bg-amber-50',
      links: [
        { label: 'Digital Maturity Assessment', href: '/tools/assessment' },
        { label: 'Needs Analysis Tool', href: '/tools/needs-analysis' },
        { label: 'ROI Calculator', href: '/tools/roi-calculator' },
        { label: 'Pricing Calculator', href: '/tools/pricing-calculator' },
        { label: 'System Comparison', href: '/tools/comparison' },
        { label: 'Implementation Timeline', href: '/tools/timeline-generator' },
        { label: 'Migration Center', href: '/migration' },
      ],
    },
    {
      title: 'Resources',
      icon: BookOpen,
      color: 'text-orange-600 dark:text-slate-300 bg-orange-50',
      links: [
        { label: 'Resource Center', href: '/resources' },
        { label: 'Blog & Insights', href: '/blog' },
        { label: 'Customer Stories', href: '/customers' },
        { label: 'Use Cases', href: '/use-cases' },
        { label: 'Events & Webinars', href: '/events' },
        { label: 'Glossary', href: '/glossary' },
        { label: 'Product Roadmap', href: '/roadmap' },
      ],
    },
    {
      title: 'Developers & Docs',
      icon: Code,
      color: 'text-slate-600 dark:text-slate-300 bg-slate-100',
      links: [
        { label: 'Documentation Hub', href: '/docs' },
        { label: 'API Reference', href: '/docs/api' },
        { label: 'Integration Guides', href: '/docs/integrations' },
        { label: 'Release Notes', href: '/docs/changelog' },
      ],
    },
    {
      title: 'Company',
      icon: Users,
      color: 'text-green-600 dark:text-slate-300 bg-green-50',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Why BizOps', href: '/why-bizops' },
        { label: 'Careers', href: '/careers' },
        { label: 'Partners Program', href: '/partners' },
        { label: 'Partner Directory', href: '/partners/directory' },
        { label: 'Apply for Partnership', href: '/partners/apply' },
        { label: 'Startup Program', href: '/partners/startup' },
        { label: 'Contact Us', href: '/contact' },
        { label: 'Media Kit', href: '/media-kit' },
      ],
    },
    {
      title: 'Legal & Trust',
      icon: Shield,
      color: 'text-red-600 dark:text-slate-300 bg-red-50',
      links: [
        { label: 'Trust Center', href: '/trust' },
        { label: 'Privacy Policy', href: '/legal/privacy' },
        { label: 'Privacy Center (DSAR)', href: '/legal/data-rights' },
        { label: 'Terms of Service', href: '/legal/terms' },
        { label: 'SLA', href: '/legal/sla' },
        { label: 'Data Processing Agmt', href: '/legal/dpa' },
        { label: 'AI Ethics', href: '/legal/ai-ethics' },
        { label: 'Security Report', href: '/security/report' },
        { label: 'Accessibility', href: '/accessibility' },
        { label: 'Cookie Preferences', href: '/legal/cookies' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white pt-24 pb-24 transition-colors dark:bg-slate-950">
      <Container className="px-4 md:px-6 lg:px-8" size="7xl">
        <div className="mb-16 text-center">
          <Typography variant="h1" as="h1">Sitemap</Typography>
          <Typography variant="body" className="text-slate-600 dark:text-slate-400">
            Jelajahi seluruh halaman dan fitur yang tersedia di ekosistem BizOps.
          </Typography>
        </div>

        <Grid cols={3} gap={8}>
          {sitemapData.map((section, idx) => (
            <div key={idx} className="rounded-2xl border border-slate-100 bg-white p-6 transition-all duration-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-slate-900/50">
              <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${section.color}`}>
                <section.icon className="h-5 w-5" />
              </div>
              <Typography variant="h2" as="h2" className="mb-4 font-bold text-slate-900 dark:text-white">{section.title}</Typography>
              <ul className="space-y-2.5">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link href={link.href} className="hover:text-primary-600 dark:hover:text-primary-400 group flex items-center gap-2 text-sm text-slate-600 transition-colors hover:underline dark:text-slate-400">
                      <span className="group-hover:bg-primary-500 h-1 w-1 rounded-full bg-slate-300 transition-colors dark:bg-slate-700"></span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
