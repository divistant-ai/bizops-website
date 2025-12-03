import { generateMetadata as genMeta } from '@/libs/utils/metadata';
import StartupProgramContent from './StartupProgramContent';

export const metadata = genMeta({
  title: 'Program BizOps for Startups | Diskon & Kredit Gratis',
  description: 'Program akselerasi eksklusif untuk startup. Dapatkan akses teknologi ERP kelas dunia dengan harga khusus agar Anda bisa fokus pada pertumbuhan.',
  url: '/partners/startup-program',
});

export default function StartupProgramPage() {
  return <StartupProgramContent />;
}
