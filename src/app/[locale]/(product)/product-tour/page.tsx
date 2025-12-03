import ProductTourContent from '@/components/pages/ProductTourContent';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';

export const metadata = genMeta({
  title: 'Interactive Product Tour | BizOps ERP In Action',
  description: 'Simulasi penggunaan BizOps ERP secara interaktif. Pilih peran dan rasakan bagaimana BizOps mempermudah pekerjaan setiap departemen.',
  url: '/product-tour',
});

export default function ProductTourPage() {
  return <ProductTourContent />;
}
