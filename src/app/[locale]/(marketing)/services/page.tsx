import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Container, Section } from '@/components/layout';
import { servicesData } from '@/data/servicesContent';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';
import { transformContent } from '@/libs/utils/transformContent';

export const metadata = genMeta({
  title: 'Layanan Profesional & Konsultasi ERP | BizOps',
  description: 'Dari konsultasi strategi hingga implementasi teknis. Kami mendampingi setiap langkah transformasi digital Anda.',
});

export default function ServicesPage() {
  const services = Object.entries(servicesData).map(([key, val]) => ({ id: key, ...val }));

  return (
    <div className="min-h-screen bg-neutral-50">
      <Section className="bg-neutral-900 pt-32 pb-20 text-white">
        <Container className="text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">Layanan Profesional</h1>
          <p className="mx-auto max-w-2xl text-xl text-neutral-300">
            Keahlian teknis dan strategis untuk menjamin kesuksesan implementasi Anda.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((item) => {
              const transformed = transformContent(item);

              return (
                <Link key={item.id} href={`/services/${item.id}`} className="group block h-full">
                  <div className="flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                    <div className="bg-primary-50 text-primary-600 mb-6 flex h-14 w-14 items-center justify-center rounded-xl transition-transform group-hover:scale-110">
                      {transformed?.icon}
                    </div>
                    <h3 className="group-hover:text-primary-600 mb-3 text-2xl font-bold text-neutral-900">{item.title}</h3>
                    <p className="mb-6 flex-grow text-neutral-600">{item.description}</p>
                    <div className="text-primary-600 mt-auto flex items-center text-sm font-bold font-medium">
                      Lihat Layanan
                      {' '}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-neutral-200 bg-white">
        <Container className="text-center">
          <h2 className="mb-6 text-3xl font-bold">Butuh Pendekatan Khusus?</h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-neutral-600">
            Tim kami siap mendiskusikan kebutuhan unik perusahaan Anda. Jadwalkan sesi discovery call gratis.
          </p>
          <Link href="/contact" className="bg-primary-600 hover:bg-primary-700 shadow-primary-500/30 inline-flex items-center justify-center rounded-full px-8 py-3 text-base font-medium text-white shadow-lg transition-all">
            Hubungi Tim Ahli Kami
          </Link>
        </Container>
      </Section>
    </div>
  );
}
