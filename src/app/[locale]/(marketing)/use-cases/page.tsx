import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Container, Section } from '@/components/layout';
import { useCasesData } from '@/data/useCasesContent';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';
import { transformContent } from '@/libs/utils/transformContent';

export const metadata = genMeta({
  title: 'Studi Kasus & Success Stories | BizOps',
  description: 'Lihat bagaimana BizOps menyelesaikan masalah nyata di berbagai industri, dari manufaktur hingga retail.',
});

export default function UseCasesIndexPage() {
  const cases = Object.values(useCasesData);

  // Group by category for better UX
  const categories = Array.from(new Set(cases.map(c => c.category)));

  return (
    <div className="min-h-screen bg-neutral-50">
      <Section className="bg-neutral-900 pt-32 pb-20 text-white">
        <Container className="text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">Bukti Nyata, Bukan Teori.</h1>
          <p className="mx-auto max-w-2xl text-xl text-neutral-300">
            Kumpulan studi kasus implementasi BizOps yang berhasil memecahkan masalah operasional kompleks di lapangan.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          {categories.map(category => (
            <div key={category} className="mb-20 last:mb-0">
              <h2 className="mb-8 border-b border-neutral-200 pb-4 text-2xl font-bold text-neutral-900">
                {category}
              </h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {cases.filter(c => c.category === category).map((item) => {
                  const icon = transformContent({ icon: item.icon }).icon;

                  return (
                    <Link key={item.id} href={`/use-cases/${item.id}`} className="group block h-full">
                      <div className="flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                        <div className={`bg- h-12 w-12 rounded-xl${item.color}-50 text- flex items-center justify-center${item.color}-600 mb-6 transition-transform group-hover:scale-110`}>
                          {icon}
                        </div>
                        <div className="mb-2 text-xs font-bold tracking-wider text-neutral-400 uppercase">{item.industry}</div>
                        <h3 className="group-hover:text-primary-600 mb-3 text-xl font-bold text-neutral-900 transition-colors">
                          {item.title}
                        </h3>
                        <p className="mb-6 line-clamp-3 flex-grow text-sm text-neutral-600">
                          {item.challenge}
                        </p>
                        <div className="text-primary-600 mt-auto flex items-center text-sm font-bold">
                          Pelajari Kasus Ini
                          {' '}
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </Container>
      </Section>
    </div>
  );
}
