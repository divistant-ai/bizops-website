import ROICalculator from '@/components/tools/ROICalculator';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';

export const metadata = genMeta({
  title: 'Kalkulator ROI ERP | Hitung Penghematan Bisnis',
  description: 'Simulasikan berapa banyak biaya operasional yang bisa Anda hemat dengan beralih ke sistem ERP modern.',
});

export default function ROIPage() {
  return <ROICalculator />;
}
