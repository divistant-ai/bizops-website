import TimelineGenerator from '@/components/tools/TimelineGenerator';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';

export const metadata = genMeta({
  title: 'ERP Implementation Timeline Generator | BizOps',
  description: 'Buat estimasi timeline implementasi ERP yang realistis berdasarkan skala dan kompleksitas bisnis Anda.',
});

export default function TimelinePage() {
  return <TimelineGenerator />;
}
