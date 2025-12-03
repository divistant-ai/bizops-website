import { generateMetadata as genMeta } from '@/libs/utils/metadata';
import SlideContent from './SlideContent';

export const metadata = genMeta({
  title: 'BizOps Presentation Deck',
  description: 'Interactive presentation slides for BizOps platform overview.',
});

export default function SlidePage() {
  return <SlideContent />;
}
