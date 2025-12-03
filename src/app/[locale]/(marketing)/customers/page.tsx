import { generateMetadata as genMeta } from '@/libs/utils/metadata';
import CustomersContent from './CustomersContent';

export const metadata = genMeta({
  title: 'Customer Stories - Cerita Sukses Pelanggan BizOps',
  description: 'Dari startup hingga enterprise, lihat bagaimana 500+ perusahaan Indonesia mencapai efisiensi operasional dan pertumbuhan berkelanjutan dengan BizOps. Transformasi nyata, hasil terukur.',
  url: '/customers',
  keywords: ['Customer Stories', 'Success Stories', 'Case Studies', 'BizOps Customers', 'Customer Testimonials', 'ERP Success Stories'],
});

export default function CustomersPage() {
  return <CustomersContent />;
}

