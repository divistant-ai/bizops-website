import TurnoverCostCalculator from '@/components/tools/consultant/TurnoverCostCalculator';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';

export const metadata = genMeta({
  title: 'Kalkulator Biaya Turnover Karyawan - Hitung Hidden Cost',
  description: 'Kalkulator biaya turnover karyawan. Hitung berapa biaya tersembunyi yang perusahaan keluarkan akibat turnover.',
});

export default function TurnoverCostPage() {
  return <TurnoverCostCalculator />;
}
