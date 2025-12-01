import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Container, Section } from '@/components/layout';
import { industriesData, rolesData } from '@/data/solutionsContent';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';

export const metadata = genMeta({
  title: 'Solusi Bisnis & Industri | BizOps',
  description: 'Temukan solusi ERP yang dirancang khusus untuk industri dan peran Anda.',
});

export default function SolutionsPage() {
  const industries = Object.entries(industriesData).map(([key, val]) => ({ id: key, ...val }));
  const roles = Object.entries(rolesData).map(([key, val]) => ({ id: key, ...val }));

  return (
    <div className="min-h-screen bg-neutral-50">
      <Section className="bg-neutral-900 pt-32 pb-20 text-white">
        <Container className="text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">Solusi BizOps</h1>
          <p className="mx-auto max-w-2xl text-xl text-neutral-300">
            Dikontekstualisasikan untuk kebutuhan spesifik industri dan peran Anda.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="mb-10 text-center text-3xl font-bold">Berdasarkan Industri</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {industries.map(item => (
              <Link key={item.id} href={`/solutions/${item.id}`} className="group block">
                <div className="h-full rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                  <h3 className="group-hover:text-primary-600 mb-2 text-xl font-bold text-neutral-900">{item.title}</h3>
                  <p className="mb-4 line-clamp-3 text-neutral-600">{item.description}</p>
                  <div className="text-primary-600 flex items-center text-sm font-medium">
                    Pelajari Selengkapnya
                    {' '}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-neutral-200 bg-white">
        <Container>
          <h2 className="mb-10 text-center text-3xl font-bold">Berdasarkan Peran</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {roles.map(item => (
              <Link key={item.id} href={`/role/${item.id}`} className="group block">
                <div className="hover:border-primary-200 h-full rounded-2xl border border-neutral-200 bg-neutral-50 p-8 transition-all">
                  <h3 className="mb-2 text-xl font-bold text-neutral-900">{item.title}</h3>
                  <p className="mb-4 text-sm text-neutral-500">{item.subtitle}</p>
                  <div className="group-hover:text-primary-600 flex items-center text-sm font-medium text-neutral-600">
                    Lihat Dashboard
                    {' '}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
