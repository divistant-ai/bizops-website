import { ArrowRight, FileText, Shield } from 'lucide-react';
import Link from 'next/link';
import { Container, Section } from '@/components/layout';
import { legalContent } from '@/data/legalContent';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';

export const metadata = genMeta({
  title: 'Pusat Legal & Kepatuhan | BizOps',
  description: 'Transparansi adalah prioritas kami. Akses semua dokumen legal, kebijakan privasi, dan ketentuan layanan di sini.',
});

export default function LegalIndexPage() {
  const docs = Object.entries(legalContent).map(([slug, data]) => ({ slug, ...data }));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Section className="bg-slate-900 pt-32 pb-20 text-white">
        <Container className="text-center">
          <div className="mb-6 inline-flex items-center justify-center rounded-2xl bg-white/10 p-3">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">Pusat Legal & Kepatuhan</h1>
          <p className="mx-auto max-w-2xl text-xl text-slate-300 dark:text-slate-400">
            Komitmen kami terhadap transparansi, keamanan data, dan kepatuhan regulasi.
          </p>
        </Container>
      </Section>

      <Section>
        <Container size="4xl">
          <div className="grid gap-6">
            {docs.map(doc => (
              <Link key={doc.slug} href={`/legal/${doc.slug}`} className="group block">
                <div className="flex items-center justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm transition-all hover:shadow-md md:p-8">
                  <div className="flex items-start gap-6">
                    <div className="group-hover:bg-primary-50 dark:group-hover:bg-primary-900/30 group-hover:text-primary-600 dark:group-hover:text-primary-400 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="group-hover:text-primary-600 dark:group-hover:text-primary-400 mb-2 text-xl font-bold text-slate-900 dark:text-white transition-colors">
                        {doc.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 md:text-base">{doc.subtitle}</p>
                      <div className="mt-2 text-xs text-slate-400 dark:text-slate-500">
                        Update:
                        {doc.updated}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="group-hover:text-primary-600 dark:group-hover:text-primary-400 h-5 w-5 text-slate-300 dark:text-slate-600 transition-all group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
