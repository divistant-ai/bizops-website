import { ArrowLeft, Clock } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container, Section } from '@/components/layout';
import { legalContent } from '@/data/legalContent';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';

type PageProps = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const data = legalContent[slug];
  if (!data) {
    return {};
  }

  return genMeta({
    title: `${data.title} | Legal BizOps`,
    description: data.subtitle,
  });
}

export async function generateStaticParams() {
  return Object.keys(legalContent).map(slug => ({
    slug,
  }));
}

export default async function LegalDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const data = legalContent[slug];

  if (!data) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <Section className="border-b border-neutral-200 bg-neutral-50 pt-32 pb-16">
        <Container size="4xl">
          <Link href="/legal" className="hover:text-primary-600 mb-8 inline-flex items-center text-neutral-500 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {' '}
            Kembali ke Pusat Legal
          </Link>
          <h1 className="mb-4 text-4xl font-bold text-neutral-900 md:text-5xl">{data.title}</h1>
          <p className="mb-6 text-xl text-neutral-600">{data.subtitle}</p>
          <div className="flex items-center text-sm text-neutral-500">
            <Clock className="mr-2 h-4 w-4" />
            {' '}
            Terakhir diperbarui:
            {data.updated}
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="3xl">
          <div className="prose prose-lg prose-neutral prose-headings:font-bold prose-headings:text-neutral-900 prose-a:text-primary-600 max-w-none">
            <div dangerouslySetInnerHTML={{ __html: data.content }} />
          </div>
        </Container>
      </Section>
    </div>
  );
}
