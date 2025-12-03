import { generateMetadata as genMeta } from '@/libs/utils/metadata';
import BlogContent from './BlogContent';

export const metadata = genMeta({
  title: 'Blog & Insights | BizOps',
  description: 'Artikel terbaru seputar strategi operasional, perpajakan, teknologi ERP, dan best practices bisnis.',
});

export default function BlogPage() {
  return <BlogContent />;
}
