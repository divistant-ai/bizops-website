import MarginMarkupCalculator from '@/components/tools/customer/MarginMarkupCalculator';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';

export const metadata = genMeta({
  title: 'Kalkulator Margin & Markup - Hitung Harga Jual Optimal',
  description: 'Kalkulator margin dan markup online gratis. Hitung harga jual optimal berdasarkan margin profit atau markup yang Anda inginkan.',
});

export default function MarginMarkupPage() {
  return <MarginMarkupCalculator />;
}
