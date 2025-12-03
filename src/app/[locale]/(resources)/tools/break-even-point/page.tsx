import BreakEvenCalculator from '@/components/tools/customer/BreakEvenCalculator';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';

export const metadata = genMeta({
  title: 'Kalkulator Break Even Point (BEP) - Hitung Titik Impas Bisnis',
  description: 'Kalkulator BEP online gratis. Hitung berapa unit yang harus dijual agar bisnis Anda mencapai titik impas (break even).',
});

export default function BreakEvenPage() {
  return <BreakEvenCalculator />;
}
