import { Container, Section } from '@/components/layout';
import ROICalculator from '@/components/tools/ROICalculator';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';

export const metadata = genMeta({
  title: 'Kalkulator ROI ERP | Hitung Penghematan Bisnis',
  description: 'Simulasikan berapa banyak biaya operasional yang bisa Anda hemat dengan beralih ke sistem ERP modern.',
});

export default function ROIPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Section className="pt-32 pb-20">
        <Container>
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-extrabold text-neutral-900 md:text-5xl">
              Hitung ROI Transformasi Digital Anda
            </h1>
            <p className="text-xl text-neutral-600">
              Jangan hanya menebak. Gunakan data riil operasional Anda untuk melihat seberapa cepat investasi sistem ERP akan balik modal (Break Even Point).
            </p>
          </div>

          <ROICalculator />

        </Container>
      </Section>
    </div>
  );
}
