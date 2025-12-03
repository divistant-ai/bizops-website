import { generateMetadata as genMeta } from '@/libs/utils/metadata';
import ServicesContent from './ServicesContent';

export const metadata = genMeta({
  title: 'Layanan Profesional & Konsultasi ERP | BizOps',
  description: 'Dari konsultasi strategi hingga implementasi teknis. Kami mendampingi setiap langkah transformasi digital Anda.',
});

export default function ServicesPage() {
  return <ServicesContent />;
}
