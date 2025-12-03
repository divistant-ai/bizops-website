import { generateMetadata as genMeta } from '@/libs/utils/metadata';
import ResourcesContent from './ResourcesContent';

export const metadata = genMeta({
  title: 'Resource Center | BizOps',
  description: 'Pusat pengetahuan dan perangkat bantu untuk pertumbuhan bisnis Anda. Blog, panduan, tools, dan dokumentasi lengkap.',
});

export default function ResourcesPage() {
  return <ResourcesContent />;
}
