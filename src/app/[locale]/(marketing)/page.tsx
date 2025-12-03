import { generateMetadata as genMeta } from '@/libs/utils/metadata';
import HomePageContent from './HomePageContent';

export const metadata = genMeta({
  title: 'BizOps - The Adaptive Business Operating System',
  description: 'Platform ERP Indonesia yang menyatukan HR, Finance, Operations, Sales, dan Supply Chain dalam satu sistem terintegrasi. Hemat hingga 85% biaya operasional dengan solusi all-in-one untuk bisnis modern.',
  url: '/',
  keywords: ['ERP Indonesia', 'Business Operating System', 'Enterprise Software', 'HR Software Indonesia', 'Finance Software', 'Operations Management', 'ERP Cloud', 'Sistem ERP', 'Software Bisnis'],
});

export default function HomePage() {
  return <HomePageContent />;
}
