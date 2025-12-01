import { ArrowRight, Code, Coffee, Globe, Heart, Rocket } from 'lucide-react';
import Link from 'next/link';
import { Container, Section } from '@/components/layout';
import { Badge, Button } from '@/components/ui';
import { FadeIn } from '@/components/ui/FadeIn';
import { careersContent, jobsData } from '@/data/companyContent';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';
import { ScrollToSectionButton } from '@/components/ScrollToSectionButton';

export const metadata = genMeta({
  title: 'Karir di BizOps | Bangun Peradaban Digital',
  description: 'Bergabunglah dengan tim yang membangun sistem saraf pusat bagi ribuan bisnis di Indonesia.',
});

export default function CareersPage() {
  const { hero, culture, benefits } = careersContent;

  const cultureIcons = [Code, Globe, Rocket];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero */}
      <Section className="bg-neutral-900 pt-32 pb-20 text-center text-white">
        <Container size="4xl">
          <Badge variant="outline" className="text-primary-300 border-primary-500/30 mb-6 tracking-wider uppercase">
            We Are Hiring
          </Badge>
          <h1 className="mb-8 text-4xl leading-tight font-extrabold md:text-6xl">
            {hero.headline}
          </h1>
          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-neutral-300">
            {hero.subheadline}
          </p>
          <div className="mt-10">
            <ScrollToSectionButton sectionId="openings" size="lg" className="bg-primary-600 hover:bg-primary-700 rounded-full px-8 text-white">
              Lihat Posisi Terbuka
            </ScrollToSectionButton>
          </div>
        </Container>
      </Section>

      {/* Culture */}
      <Section className="bg-white">
        <Container>
          <div className="grid gap-8 md:grid-cols-3">
            {culture.map((item, i) => {
              const Icon = cultureIcons[i] || Heart;
              return (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="h-full rounded-3xl border border-neutral-100 bg-neutral-50 p-8">
                    <div className="bg-primary-50 text-primary-600 mb-6 flex h-12 w-12 items-center justify-center rounded-xl">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-4 text-xl font-bold text-neutral-900">{item.title}</h3>
                    <p className="leading-relaxed text-neutral-600">{item.desc}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Benefits Grid */}
      <Section className="bg-neutral-900 text-white">
        <Container>
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold">Perks & Benefits</h2>
            <p className="text-neutral-400">Kami mengurus Anda, agar Anda bisa mengurus pekerjaan terbaik Anda.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10">
                <h3 className="text-primary-300 mb-2 text-lg font-bold">{benefit.title}</h3>
                <p className="text-sm text-neutral-400">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Job Openings */}
      <Section id="openings" className="bg-white">
        <Container size="5xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-neutral-900">Posisi Terbuka</h2>

          <div className="space-y-4">
            {jobsData.map((job, i) => (
              <div key={i} className="group hover:border-primary-300 flex flex-col items-start justify-between gap-6 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 transition-all hover:shadow-lg md:flex-row md:items-center md:p-8">
                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-3">
                    <h3 className="group-hover:text-primary-600 text-xl font-bold text-neutral-900 transition-colors">{job.title}</h3>
                    <Badge variant="outline" className="bg-white">{job.dept}</Badge>
                  </div>
                  <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-neutral-500">
                    <span className="flex items-center gap-1">
                      <Globe className="h-3 w-3" />
                      {' '}
                      {job.loc}
                    </span>
                    <span className="flex items-center gap-1">
                      <Coffee className="h-3 w-3" />
                      {' '}
                      {job.type}
                    </span>
                  </div>
                  <p className="max-w-2xl text-neutral-600">{job.desc}</p>
                  <div className="mt-4 flex gap-2">
                    {job.tags.map(tag => (
                      <span key={tag} className="rounded bg-neutral-200 px-2 py-1 text-xs text-neutral-700">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="shrink-0">
                  <Link href={`mailto:careers@bizops.id?subject=Apply: ${job.title}`}>
                    <Button variant="outline" className="group-hover:bg-primary-600 group-hover:border-primary-600 rounded-full transition-all group-hover:text-white">
                      Apply Now
                      {' '}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
