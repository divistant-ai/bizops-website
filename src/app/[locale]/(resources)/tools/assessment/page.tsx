import { Container, Section } from '@/components/layout';
import AssessmentWizard from '@/components/tools/AssessmentWizard';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';

export const metadata = genMeta({
  title: 'ERP Readiness Assessment | BizOps',
  description: 'Evaluasi kesiapan digital bisnis Anda dan dapatkan rekomendasi modul ERP yang paling relevan.',
});

export default function AssessmentPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Section className="pt-32 pb-20">
        <Container>
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <div className="bg-primary-100 text-primary-700 mb-6 inline-flex items-center justify-center rounded-full px-4 py-1.5 text-sm font-bold">
              Gratis & Tanpa Login
            </div>
            <h1 className="mb-6 text-4xl font-extrabold text-neutral-900 md:text-5xl">
              Cek Kesehatan Digital Bisnis Anda
            </h1>
            <p className="text-xl text-neutral-600">
              Jawab 5 pertanyaan singkat untuk mendapatkan analisis kebutuhan sistem dan rekomendasi solusi yang dipersonalisasi.
            </p>
          </div>

          <AssessmentWizard />

        </Container>
      </Section>
    </div>
  );
}
