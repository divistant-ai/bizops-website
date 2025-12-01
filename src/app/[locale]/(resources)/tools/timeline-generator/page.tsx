import { Container, Section } from '@/components/layout';
import TimelineGenerator from '@/components/tools/TimelineGenerator';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';

export const metadata = genMeta({
  title: 'ERP Implementation Timeline Generator | BizOps',
  description: 'Buat estimasi timeline implementasi ERP yang realistis berdasarkan skala dan kompleksitas bisnis Anda.',
});

export default function TimelinePage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Section className="pt-32 pb-20">
        <Container>
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-extrabold text-neutral-900 md:text-5xl">
              Estimasi Waktu Implementasi
            </h1>
            <p className="text-xl text-neutral-600">
              Setiap bisnis unik. Gunakan kalkulator ini untuk mendapatkan gambaran berapa lama waktu yang dibutuhkan dari Kickoff hingga Go-Live.
            </p>
          </div>

          <TimelineGenerator />

        </Container>
      </Section>
    </div>
  );
}
