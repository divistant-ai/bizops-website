import { generateMetadata as genMeta } from '@/libs/utils/metadata';
import MediaKitContent from '@/components/pages/MediaKitContent';

export const metadata = genMeta({
  title: 'Brand Assets, Logo & Press Resources | BizOps Media Kit',
  description: 'Unduh aset resmi BizOps. Logo High-Res, Panduan Brand, dan Boilerplate perusahaan.',
  url: '/media-kit',
});

export default function MediaKitPage() {
  return <MediaKitContent />;
}
