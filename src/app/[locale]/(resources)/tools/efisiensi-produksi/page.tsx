import OEECalculator from '@/components/tools/customer/OEECalculator';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';

export const metadata = genMeta({
  title: 'Kalkulator Efisiensi Produksi (OEE) - Ukur Produktivitas Mesin',
  description: 'Kalkulator OEE online gratis. Hitung Overall Equipment Effectiveness untuk mengukur efisiensi mesin dan proses produksi.',
});

export default function OEEPage() {
  return <OEECalculator />;
}
