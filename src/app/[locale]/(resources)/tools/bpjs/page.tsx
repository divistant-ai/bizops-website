import BPJSCalculator from '@/components/tools/customer/BPJSCalculator';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';

export const metadata = genMeta({
  title: 'Kalkulator BPJS Kesehatan & Ketenagakerjaan - Hitung Iuran BPJS',
  description: 'Kalkulator BPJS online gratis. Hitung iuran BPJS Kesehatan dan Ketenagakerjaan (JHT, JP, JKK, JKM) untuk karyawan dan perusahaan.',
});

export default function BPJSPage() {
  return <BPJSCalculator />;
}
