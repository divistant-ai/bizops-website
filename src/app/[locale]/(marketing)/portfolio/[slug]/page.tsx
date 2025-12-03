import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { caseStudiesData } from '@/data/caseStudies';
import { routing } from '@/libs/I18nRouting';
import CaseStudyDetailContent from './CaseStudyDetailContent';

type IPortfolioDetailProps = {
  params: Promise<{ slug: string; locale: string }>;
};

export function generateStaticParams() {
  const slugs = Object.keys(caseStudiesData);
  return routing.locales
    .map(locale =>
      slugs.map(slug => ({
        slug,
        locale,
      })),
    )
    .flat(1);
}

export async function generateMetadata(props: IPortfolioDetailProps): Promise<Metadata> {
  const { slug } = await props.params;
  const caseStudy = caseStudiesData[slug];

  if (!caseStudy) {
    return {
      title: 'Case Study Not Found',
    };
  }

  return {
    title: `${caseStudy.title} | BizOps Case Study`,
    description: caseStudy.challenge.description,
  };
}

export default async function PortfolioDetail(props: IPortfolioDetailProps) {
  const { locale, slug } = await props.params;
  setRequestLocale(locale);

  const caseStudy = caseStudiesData[slug];

  if (!caseStudy) {
    notFound();
  }

  return <CaseStudyDetailContent caseStudy={caseStudy} />;
}

export const dynamicParams = false;
