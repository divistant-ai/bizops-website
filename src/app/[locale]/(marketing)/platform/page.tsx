import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Container, Section } from '@/components/layout';
import { capabilitiesData, modulesData } from '@/data/platformContent';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';

export const metadata = genMeta({
  title: 'Platform & Modul | BizOps',
  description: 'Jelajahi modul ERP lengkap dan teknologi di balik BizOps.',
});

export default function PlatformPage() {
  const modules = Object.entries(modulesData).map(([key, val]) => ({ id: key, ...val }));
  const technologies = Object.entries(capabilitiesData).map(([key, val]) => ({ id: key, ...val }));

  return (
    <div className="min-h-screen bg-neutral-50">
      <Section className="bg-neutral-900 pt-32 pb-20 text-white">
        <Container className="text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">Platform BizOps</h1>
          <p className="mx-auto max-w-2xl text-xl text-neutral-300">
            Satu sistem terintegrasi untuk seluruh operasional bisnis Anda.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="mb-10 text-center text-3xl font-bold">Modul Utama</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {modules.map(item => (
              <Link key={item.id} href={`/platform/modules/${item.id}`} className="group block">
                <div className="h-full rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                  <h3 className="group-hover:text-primary-600 mb-2 text-xl font-bold text-neutral-900">{item.title}</h3>
                  <p className="mb-4 line-clamp-3 text-neutral-600">{item.description}</p>
                  <div className="text-primary-600 flex items-center text-sm font-medium">
                    Lihat Fitur
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
          <h2 className="mb-10 text-center text-3xl font-bold">Teknologi & Kapabilitas</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {technologies.map(item => (
              <Link key={item.id} href={`/platform/technologies/${item.id}`} className="group block">
                <div className="hover:border-primary-200 h-full rounded-2xl border border-neutral-200 bg-neutral-50 p-6 transition-all">
                  <h3 className="group-hover:text-primary-600 mb-2 text-lg font-bold text-neutral-900">{item.title}</h3>
                  <p className="mb-4 line-clamp-2 text-sm text-neutral-500">{item.subtitle}</p>
                  <div className="group-hover:text-primary-600 flex items-center text-xs font-medium text-neutral-600">
                    Pelajari Tech
                    {' '}
                    <ArrowRight className="ml-2 h-3 w-3" />
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
