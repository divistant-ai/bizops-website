import GajiBersihCalculator from '@/components/tools/customer/GajiBersihCalculator';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';

export const metadata = genMeta({
  title: 'Kalkulator Gaji Bersih - Hitung Take Home Pay Anda',
  description: 'Kalkulator gaji bersih online gratis. Hitung berapa gaji yang Anda terima setelah dipotong pajak dan BPJS.',
});

export default function GajiBersihPage() {
  return <GajiBersihCalculator />;
}
