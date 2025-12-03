'use client';

import type { CaseStudy } from '@/data/caseStudies';
import { ArrowLeft, ArrowRight, Award, Building2, CheckCircle2, MapPin, Quote, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';
import { Container, Section } from '@/components/layout';
import { Badge, Button } from '@/components/ui';
import { FadeIn } from '@/components/ui/FadeIn';

type CaseStudyDetailContentProps = {
  caseStudy: CaseStudy;
};

export default function CaseStudyDetailContent({ caseStudy }: CaseStudyDetailContentProps) {
  return (
    <div className="bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <Section className="bg-gradient-to-br from-slate-50 to-white pt-32 pb-20 dark:from-slate-900 dark:to-slate-950">
        <Container size="4xl">
          <FadeIn>
            <Link
              href="/portfolio"
              className="group hover:text-primary-600 dark:hover:text-primary-400 mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors dark:text-slate-400"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Portfolio
            </Link>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mb-8 flex flex-wrap gap-2">
              {caseStudy.tags.map(tag => (
                <Badge key={tag} variant="primary">
                  {tag}
                </Badge>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1 className="mb-6 text-4xl font-bold text-slate-900 md:text-5xl lg:text-6xl dark:text-white">
              {caseStudy.title}
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-start gap-3">
                <Building2 className="text-primary-600 mt-1 h-5 w-5" />
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Client</p>
                  <p className="font-semibold text-slate-900 dark:text-white">{caseStudy.client.name}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Award className="text-primary-600 dark:text-primary-400 mt-1 h-5 w-5" />
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Industry</p>
                  <p className="font-semibold text-slate-900 dark:text-white">{caseStudy.client.industry}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="text-primary-600 mt-1 h-5 w-5" />
                <div>
                  <p className="text-sm font-medium text-slate-500">Company Size</p>
                  <p className="font-semibold text-slate-900">{caseStudy.client.size}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="text-primary-600 mt-1 h-5 w-5" />
                <div>
                  <p className="text-sm font-medium text-slate-500">Location</p>
                  <p className="font-semibold text-slate-900">{caseStudy.client.location}</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Challenge Section */}
      <Section>
        <Container size="4xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-slate-900">{caseStudy.challenge.title}</h2>
              <p className="mb-8 text-lg leading-relaxed text-slate-600">
                {caseStudy.challenge.description}
              </p>
              <div className="space-y-4">
                <p className="font-semibold text-slate-900">Key Pain Points:</p>
                {caseStudy.challenge.painPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100">
                      <div className="h-2 w-2 rounded-full bg-red-600"></div>
                    </div>
                    <p className="text-slate-700">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100 p-8 lg:p-12">
              <div className="flex h-full flex-col justify-center">
                <div className="bg-primary-100 mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl">
                  <TrendingUp className="text-primary-600 h-8 w-8" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-slate-900">The Opportunity</h3>
                <p className="text-lg leading-relaxed text-slate-600">
                  Dengan mengintegrasikan sistem yang terpisah-pisah dan mengotomatisasi proses manual,
                  {' '}
                  {caseStudy.client.name}
                  {' '}
                  berpotensi meningkatkan efisiensi operasional secara signifikan.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Solution Section */}
      <Section className="bg-slate-50">
        <Container size="4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900">{caseStudy.solution.title}</h2>
            <p className="mx-auto max-w-3xl text-lg text-slate-600">
              {caseStudy.solution.description}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {caseStudy.solution.modules.map((module, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg"
              >
                <CheckCircle2 className="mb-4 h-8 w-8 text-green-600" />
                <h3 className="font-semibold text-slate-900">{module}</h3>
              </div>
            ))}
          </div>

          <div className="border-primary-200 bg-primary-50 mt-12 rounded-3xl border p-8 lg:p-12">
            <h3 className="mb-4 text-xl font-bold text-slate-900">Implementation Timeline</h3>
            <p className="text-lg text-slate-700">{caseStudy.solution.implementation}</p>
          </div>
        </Container>
      </Section>

      {/* Results Section */}
      <Section>
        <Container size="4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900">{caseStudy.results.title}</h2>
            <p className="text-lg text-slate-600">Dampak nyata yang terukur</p>
          </div>

          <div className="mb-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {caseStudy.results.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm"
              >
                <div className="text-primary-600 mb-4 text-4xl font-bold lg:text-5xl">
                  {metric.value}
                </div>
                <div className="mb-2 font-semibold text-slate-900">{metric.label}</div>
                <div className="text-sm text-slate-600">{metric.description}</div>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 lg:p-12">
            <Quote className="text-primary-600 mb-6 h-12 w-12 opacity-50" />
            <p className="mb-8 text-2xl leading-relaxed font-medium text-slate-900">
              "
              {caseStudy.results.testimonial.quote}
              "
            </p>
            <div className="flex items-center gap-4">
              <div className="bg-primary-100 text-primary-600 flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold">
                {caseStudy.results.testimonial.author.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-slate-900">{caseStudy.results.testimonial.author}</div>
                <div className="text-sm text-slate-600">
                  {caseStudy.results.testimonial.role}
                  {' '}
                  at
                  {' '}
                  {caseStudy.client.name}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="from-primary-600 to-primary-700 bg-gradient-to-br text-white">
        <Container size="4xl">
          <div className="text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              Siap Mencapai Hasil Serupa?
            </h2>
            <p className="text-primary-100 mx-auto mb-8 max-w-2xl text-lg">
              Konsultasikan kebutuhan bisnis Anda dengan tim kami dan temukan bagaimana BizOps
              dapat membantu transformasi digital perusahaan Anda.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                <Link href="/demo">
                  Jadwalkan Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="hover:text-primary-600 w-full border-white text-white hover:bg-white sm:w-auto"
              >
                <Link href="/contact">
                  Hubungi Sales
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
