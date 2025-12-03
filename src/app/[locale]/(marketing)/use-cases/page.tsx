import { generateMetadata as genMeta } from '@/libs/utils/metadata';
import UseCasesContent from './UseCasesContent';

export const metadata = genMeta({
  title: 'Studi Kasus & Success Stories | BizOps',
  description: 'Lihat bagaimana BizOps menyelesaikan masalah nyata di berbagai industri, dari manufaktur hingga retail. Bukti nyata, bukan teori.',
});

export default function UseCasesIndexPage() {
  return <UseCasesContent />;
}
