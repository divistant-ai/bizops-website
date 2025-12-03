import { generateMetadata as genMeta } from '@/libs/utils/metadata';
import SolutionsContent from './SolutionsContent';

export const metadata = genMeta({
  title: 'Solusi Bisnis & Industri | BizOps',
  description: 'Temukan solusi ERP yang dirancang khusus untuk industri dan peran Anda.',
});

export default function SolutionsPage() {
  return <SolutionsContent />;
}
