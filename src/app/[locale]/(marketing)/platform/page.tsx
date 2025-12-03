import StructuredData from '@/components/StructuredData';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';
import { getSoftwareApplicationSchema, getWebPageSchema } from '@/libs/utils/structured-data';
import PlatformContent from './PlatformContent';

export const metadata = genMeta({
  title: 'BizOps Platform - The Adaptive Business Operating System',
  description: 'Platform ERP all-in-one yang menyatukan HR, Finance, Operations, Sales, dan Supply Chain. Modul terintegrasi, teknologi modern, dan kemudahan implementasi untuk bisnis Indonesia.',
  url: '/platform',
  keywords: ['ERP Platform', 'Business Operating System', 'Integrated ERP', 'HR Module', 'Finance Module', 'Operations Module', 'Sales Module', 'Supply Chain Module'],
});

export default function PlatformPage() {
  const structuredData = [
    getWebPageSchema({
      url: '/platform',
      title: 'BizOps Platform - The Adaptive Business Operating System',
      description: 'Platform ERP all-in-one yang menyatukan HR, Finance, Operations, Sales, dan Supply Chain.',
    }),
    getSoftwareApplicationSchema({
      name: 'BizOps ERP Platform',
      description: 'Enterprise-grade ERP solution yang menyatukan HR, Finance, Operations, Sales, dan Supply Chain dalam satu sistem terintegrasi.',
      url: '/platform',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web, iOS, Android',
    }),
  ];

  return (
    <>
      <StructuredData data={structuredData} />
      <PlatformContent />
    </>
  );
}
