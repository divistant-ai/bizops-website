import MaturityAssessment from '@/components/tools/MaturityAssessment';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';

export const metadata = genMeta({
  title: 'Digital Maturity Assessment | BizOps',
  description: 'Evaluasi tingkat kematangan digital perusahaan Anda secara komprehensif. Dapatkan roadmap strategis yang dipersonalisasi dalam hitungan menit.',
});

export default function AssessmentPage() {
  return <MaturityAssessment />;
}
