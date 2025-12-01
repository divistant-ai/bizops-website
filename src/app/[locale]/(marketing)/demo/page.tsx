import { generateMetadata as genMeta } from '@/libs/utils/metadata';
import { DemoContent } from '@/components/pages/DemoContent';

export const metadata = genMeta({
  title: 'Book a Demo | BizOps Enterprise ERP',
  description: 'Jadwalkan sesi konsultasi dan demo eksklusif dengan Solution Architect kami. Validasi kebutuhan operasional Anda sekarang.',
  url: '/demo',
});

export default function DemoPage() {
  return <DemoContent />;
}
