import { generateMetadata as genMeta } from '@/libs/utils/metadata';
import PricingContent from './PricingContent';

export const metadata = genMeta({
  title: 'Harga & Paket Langganan ERP | BizOps',
  description: 'Pilih paket Business, Growth, atau Enterprise. Investasi cerdas mulai Rp 2.5 Juta/bulan. Hitung kebutuhan spesifik Anda dengan kalkulator kami.',
});

export default function PricingPage() {
  return <PricingContent />;
}
