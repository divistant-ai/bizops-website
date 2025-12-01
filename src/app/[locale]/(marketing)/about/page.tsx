import { generateMetadata } from '@/libs/utils/metadata';
import AboutContent from './AboutContent';

export const metadata = generateMetadata({
  title: 'Tentang Kami - PT Divistant Teknologi Indonesia',
  description: 'Profil perusahaan, visi kedaulatan digital, dan tim praktisi di balik BizOps.',
  url: '/about',
});

export default function AboutPage() {
  return <AboutContent />;
}
