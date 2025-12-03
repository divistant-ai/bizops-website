'use client';

import type { UseCase } from '@/data/useCasesContent';
import { CheckCircle2, Layers, Lightbulb, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { Container, Section } from '@/components/layout';
import { Badge, Button } from '@/components/ui';
import { FadeIn, FadeInStagger } from '@/components/ui/FadeIn';

type UseCaseWithTransformedIcon = Omit<UseCase, 'icon'> & {
  icon: React.ReactNode;
};
type UseCaseTemplateProps = {
  data: UseCaseWithTransformedIcon;
};

export function UseCaseTemplate({ data }: UseCaseTemplateProps) {
  // Icon is already transformed in the server component as ReactNode
  const icon = data.icon;

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero */}
      <Section className="relative overflow-hidden bg-neutral-900 pt-32 pb-20 text-white">
        {/* Background Decoration */}
        <div className="bg-primary-900/20 pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] rounded-full blur-[100px]"></div>
        <div className="pointer-events-none absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-blue-900/20 blur-[80px]"></div>

        <Container size="4xl" className="relative z-10 text-center">
          <div className={`bg- inline-flex items-center justify-center rounded-2xl p-3${data.color}-500/20 text-${data.color}-300 ring- mb-8 ring-1${data.color}-500/30`}>
            {icon}
          </div>
          <h2 className="text-primary-400 mb-4 text-lg font-bold tracking-wider uppercase">
            {data.industry}
            {' '}
            Case Study
          </h2>
          <h1 className="mb-6 text-4xl leading-tight font-extrabold md:text-6xl">{data.title}</h1>
          <p className="mx-auto max-w-2xl text-2xl leading-relaxed font-light text-neutral-300">
            {data.subtitle}
          </p>
        </Container>
      </Section>

      {/* Challenge & Solution Grid */}
      <Section className="relative z-20 -mt-16">
        <Container size="6xl">
          <FadeInStagger>
            <div className="grid gap-8 md:grid-cols-2">
              {/* Challenge Card */}
              <FadeIn>
                <div className="flex h-full flex-col rounded-3xl border border-neutral-100 bg-white p-10 shadow-xl">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                    <TrendingUp className="h-6 w-6 rotate-180" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-neutral-900">The Challenge</h3>
                  <p className="flex-grow text-lg leading-relaxed text-neutral-600">
                    "
                    {data.challenge}
                    "
                  </p>
                </div>
              </FadeIn>

              {/* Solution Card */}
              <FadeIn>
                <div className="flex h-full flex-col rounded-3xl border border-neutral-800 bg-neutral-900 p-10 text-white shadow-xl">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                    <Lightbulb className="h-6 w-6" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold">The BizOps Solution</h3>
                  <p className="flex-grow text-lg leading-relaxed text-neutral-300">
                    {data.solution}
                  </p>
                </div>
              </FadeIn>
            </div>
          </FadeInStagger>
        </Container>
      </Section>

      {/* Results Section */}
      <Section className="border-y border-neutral-200 bg-white">
        <Container size="5xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-neutral-900">Impact & Results</h2>
            <p className="text-lg text-neutral-600">Dampak nyata implementasi sistem terhadap operasional bisnis.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {data.results.map((result, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="hover:border-primary-200 h-full rounded-2xl border border-neutral-200 bg-neutral-50 p-6 text-center transition-colors">
                  <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <p className="text-lg font-medium text-neutral-800">{result}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      {/* Tech Stack */}
      <Section className="bg-neutral-50">
        <Container size="4xl" className="text-center">
          <h3 className="mb-8 flex items-center justify-center gap-2 text-xl font-bold text-neutral-900">
            <Layers className="h-5 w-5 text-neutral-500" />
            {' '}
            Technology Stack Used
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {data.techStack.map((tech, i) => (
              <Badge key={i} variant="outline" className="border-neutral-300 bg-white px-4 py-2 text-base text-neutral-700">
                {tech}
              </Badge>
            ))}
          </div>

          <div className="mt-20">
            <div className="bg-primary-600 shadow-primary-600/30 rounded-3xl p-10 text-center text-white shadow-2xl md:p-16">
              <h2 className="mb-6 text-3xl font-bold md:text-4xl">Hadapi Masalah Serupa?</h2>
              <p className="text-primary-100 mx-auto mb-10 max-w-2xl text-xl">
                Jangan biarkan inefisiensi memakan profit Anda. Diskusikan solusi yang tepat dengan tim ahli kami.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link href="/contact">
                  <Button size="lg" variant="white" className="text-primary-600 w-full sm:w-auto">
                    Konsultasi Gratis
                  </Button>
                </Link>
                <Link href="/use-cases">
                  <Button size="lg" variant="outline" className="w-full border-white text-white hover:bg-white/10 sm:w-auto">
                    Lihat Studi Kasus Lain
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
