import { generateMetadata as genMeta } from '@/libs/utils/metadata';
import WhyBizOpsContent from './WhyBizOpsContent';

export const metadata = genMeta({
  title: 'Mengapa Memilih BizOps? | The BizOps Difference',
  description: 'Kami bukan sekadar software ERP. Kami adalah "Middleware Cerdas" yang menyatukan operasional bisnis Anda. Fleksibel seperti SAP, mudah seperti SaaS.',
});

export default function WhyBizOpsPage() {
  return <WhyBizOpsContent />;
}
