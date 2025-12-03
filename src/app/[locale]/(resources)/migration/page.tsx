import { generateMetadata as genMeta } from '@/libs/utils/metadata';
import MigrationContent from './MigrationContent';

export const metadata = genMeta({
  title: 'Migration Center | Panduan Migrasi ke BizOps',
  description: 'Panduan lengkap migrasi data dari Excel, Software Akuntansi, atau Legacy ERP ke BizOps. Template, timeline, dan best practices.',
  url: '/migration',
});

export default function MigrationPage() {
  return <MigrationContent />;
}
