import type { Metadata } from 'next';
import MultiCompanyContent from './MultiCompanyContent';

export const metadata: Metadata = {
  title: 'Multi-Company ERP & Financial Consolidation | BizOps',
  description:
    'Kelola banyak anak perusahaan (PT/CV) dalam satu sistem terpusat. Konsolidasi laporan keuangan otomatis dan transaksi antar-perusahaan yang mulus.',
};

export default function MultiCompanyPage() {
  return <MultiCompanyContent />;
}
