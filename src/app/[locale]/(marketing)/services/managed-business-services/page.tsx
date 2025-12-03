import { generateMetadata as genMeta } from '@/libs/utils/metadata';
import ManagedServicesContent from './ManagedServicesContent';

export const metadata = genMeta({
  title: 'Enterprise Managed Services | Virtual Head Office',
  description: 'Layanan pengelolaan operasional bisnis end-to-end. Finance, HR, Legal, dan IT dikelola oleh jaringan ahli terbaik, terintegrasi dengan platform BizOps.',
  url: '/services/managed-business-services',
});

export default function ManagedServicesPage() {
  return <ManagedServicesContent />;
}
