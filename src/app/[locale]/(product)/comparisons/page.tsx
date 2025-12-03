import ComparisonsContent from '@/components/pages/ComparisonsContent';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';

export const metadata = genMeta({
  title: 'Architecture Comparison | BizOps',
  description: 'Analisis teknis arsitektur BizOps dibandingkan dengan Excel, Odoo, Bitrix, dan Legacy ERP.',
  url: '/comparisons',
});

export default function ComparisonsPage() {
  return <ComparisonsContent />;
}
