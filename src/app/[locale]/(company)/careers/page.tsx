import { generateMetadata as genMeta } from '@/libs/utils/metadata';
import CareersContent from './CareersContent';

export const metadata = genMeta({
  title: 'Karir di BizOps | Bangun Peradaban Digital',
  description: 'Bergabunglah dengan tim yang membangun sistem saraf pusat bagi ribuan bisnis di Indonesia. Engineering first culture, remote-friendly, dan continuous learning.',
});

export default function CareersPage() {
  return <CareersContent />;
}
