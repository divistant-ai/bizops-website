import InvoiceChecker from '@/components/tools/customer/InvoiceChecker';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';

export const metadata = genMeta({
  title: 'Checker Kelengkapan Invoice - Validasi Invoice Online',
  description: 'Checker kelengkapan invoice online gratis. Validasi kelengkapan dan kebenaran data invoice sebelum diproses.',
});

export default function InvoiceCheckerPage() {
  return <InvoiceChecker />;
}
