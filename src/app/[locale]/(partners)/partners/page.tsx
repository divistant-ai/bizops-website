import { generateMetadata as genMeta } from '@/libs/utils/metadata';
import PartnersContent from './PartnersContent';

export const metadata = genMeta({
  title: 'Program Mitra & Reseller | BizOps Partner Network',
  description: 'Transformasi bisnis konsultan Anda dengan White-label ERP. Recurring revenue tinggi, nol risiko R&D. Bergabung dengan 100+ partner di Indonesia.',
});

export default function PartnerLandingPage() {
  return <PartnersContent />;
}
