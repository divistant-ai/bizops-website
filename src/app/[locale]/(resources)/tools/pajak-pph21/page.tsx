import PajakPPh21Calculator from '@/components/tools/customer/PajakPPh21Calculator';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';

export const metadata = genMeta({
  title: 'Kalkulator Pajak PPh 21 Online - Hitung Pajak Karyawan Gratis',
  description: 'Kalkulator pajak PPh 21 online gratis. Hitung pajak penghasilan karyawan sesuai aturan terbaru dengan akurat dan mudah.',
});

export default function PajakPPh21Page() {
  return <PajakPPh21Calculator />;
}
