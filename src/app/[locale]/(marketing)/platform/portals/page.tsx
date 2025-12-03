import type { Metadata } from 'next';
import PortalsContent from './PortalsContent';

export const metadata: Metadata = {
  title: 'B2B Customer & Vendor Portals | BizOps',
  description:
    'Berikan akses mandiri kepada pelanggan dan supplier Anda. Cek tagihan, status pengiriman, dan bidding tender secara online 24/7.',
};

export default function PortalsPage() {
  return <PortalsContent />;
}
