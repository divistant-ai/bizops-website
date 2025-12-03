import NeedsAnalysis from '@/components/tools/NeedsAnalysis';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';

export const metadata = genMeta({
  title: 'Needs Analysis | Solution Finder | BizOps',
  description: 'Temukan solusi ERP yang tepat untuk bisnis Anda dengan analisis kebutuhan yang komprehensif.',
});

export default function NeedsAnalysisPage() {
  return <NeedsAnalysis />;
}
