import { generateMetadata } from '@/libs/utils/metadata';
import ContactContent from './ContactContent';

export const metadata = generateMetadata({
  title: 'Contact BizOps | Enterprise Support & Sales',
  description: 'Hubungi tim BizOps untuk konsultasi implementasi ERP, bantuan teknis, atau pertanyaan umum. Kantor di Jakarta & Yogyakarta.',
  url: '/contact',
});

export default function ContactPage() {
  return <ContactContent />;
}
