import type { Metadata } from 'next';
import AnalyticsContent from './AnalyticsContent';

export const metadata: Metadata = {
  title: 'Real-time Dashboard & Custom Report Builder | BizOps',
  description:
    'Buat laporan bisnis kustom tanpa coding. Analisis data penjualan, stok, dan keuangan dengan fitur Drag-and-Drop Report Builder yang powerful.',
};

export default function AnalyticsPage() {
  return <AnalyticsContent />;
}
