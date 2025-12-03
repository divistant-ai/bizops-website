'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  Check,
  ChevronRight,
  HelpCircle,
  Smartphone,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Container, Section } from '@/components/layout';
import { Badge, Card, Grid } from '@/components/ui';
import { BouncyLink } from '@/components/ui/BouncyLink';
import { FadeIn, FadeInStagger } from '@/components/ui/FadeIn';
import { CounterUp } from '@/components/ui/motion-scroll';
import { capabilitiesData, modulesData } from '@/data/platformContent';

type ModulePageProps = {
  moduleId: string;
  relatedModuleIds?: Array<{
    id: string;
    type: 'module' | 'capability';
  }>;
};

// FAQ Component
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex w-full items-center justify-between py-6 text-left focus:outline-none"
      >
        <span className="text-primary-600 group-hover:text-primary-600 text-lg font-bold text-slate-900 transition-colors">
          {question}
        </span>
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${
            isOpen ? 'bg-primary-600 rotate-180 text-white' : 'bg-slate-100 text-slate-500'
          }`}
        >
          <ChevronRight className="h-5 w-5" />
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'mb-6 max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="leading-relaxed text-slate-600">{answer}</p>
      </div>
    </div>
  );
}

export default function ModulePage({ moduleId, relatedModuleIds = [] }: ModulePageProps) {
  // Rehydrate data on client side to avoid serialization issues
  const data = modulesData[moduleId] || capabilitiesData[moduleId];

  if (!data) {
    return null;
  } // Or handle not found

  const Icon = data.icon || HelpCircle;
  const testimonial = data.testimonial || {
    quote: 'Sistem ini mengubah cara kami bekerja. Sangat intuitif dan powerful.',
    author: 'Budi Santoso',
    role: 'CEO at Teknologi Maju',
    avatar: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=0D8ABC&color=fff',
  };

  // Rehydrate related modules
  const relatedModules = relatedModuleIds.map((item) => {
    const source = item.type === 'module' ? modulesData : capabilitiesData;
    const modData = source[item.id];
    return {
      id: item.id,
      title: modData?.title || '',
      subtitle: modData?.subtitle,
      icon: modData?.icon || HelpCircle,
      type: item.type,
    };
  }).filter(m => m.title); // Filter out invalid ones

  return (
    <div className="flex flex-col bg-white">
      {/* 1. PREMIUM HERO SECTION */}
      <section className="relative overflow-hidden border-b border-white/5 bg-[#0B1120] pt-24 pb-16 lg:pt-48 lg:pb-40">
        {/* Premium Background Effects */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-[size:24px_24px]"></div>
        <div className="bg-primary-500/20 pointer-events-none absolute top-0 left-1/2 h-[600px] w-[1000px] -translate-x-1/2 rounded-full mix-blend-screen blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

        <Container size="7xl" className="relative z-10 text-center">
          {/* Breadcrumbs */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 flex items-center justify-center gap-2 overflow-x-auto text-xs font-medium tracking-wide whitespace-nowrap text-slate-300 uppercase md:mb-10 md:text-sm"
          >
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-500" />
            <Link href="/platform" className="transition-colors hover:text-white">
              Platform
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-500" />
            <span className="text-primary-400">{data.title}</span>
          </motion.div>

          {/* Icon - Visual Anchor */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="group relative mb-6 inline-flex items-center justify-center rounded-2xl border border-white/10 bg-slate-900/50 p-4 shadow-2xl backdrop-blur-xl md:mb-8 md:p-5"
          >
            <div className="from-primary-500/20 absolute inset-0 rounded-2xl bg-gradient-to-br to-blue-500/20 opacity-0 transition-opacity group-hover:opacity-100"></div>
            <Icon className="text-primary-400 relative z-10 h-12 w-12 md:h-16 md:w-16" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 text-4xl leading-[1.1] font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl"
          >
            {data.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-primary-300 mx-auto mb-8 max-w-3xl text-xl font-medium md:text-2xl"
          >
            {data.subtitle}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mx-auto mb-12 max-w-4xl text-lg leading-relaxed text-slate-300"
          >
            {data.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col justify-center gap-4 sm:flex-row"
          >
            <BouncyLink href="/demo" className="shadow-primary-500/30 h-14 px-8 text-lg shadow-xl">
              {data.cta?.buttonLabel || 'Lihat Demo'}
            </BouncyLink>
            <BouncyLink href="/contact" className="h-14 bg-white px-8 text-lg text-slate-900 hover:bg-slate-100">
              Hubungi Sales
            </BouncyLink>
          </motion.div>
        </Container>
      </section>

      {/* 2. METRICS SECTION */}
      {data.metrics && data.metrics.length > 0 && (
        <Section className="border-b border-slate-200 bg-slate-50">
          <Container size="7xl">
            <Grid cols={1} mdCols={3} gap={8}>
              {data.metrics.map((metric: { value: string; label: string }, idx: number) => (
                <FadeIn key={idx} delay={0.1 * idx}>
                  <div className="text-center">
                    <div className="text-primary-600 mb-2 text-5xl font-black md:text-6xl">
                      <CounterUp to={Number.parseInt(metric.value.replace(/\D/g, '')) || 0} label={metric.label} suffix={metric.value.replace(/\d/g, '')} />
                    </div>
                    <div className="text-lg font-medium text-slate-600">{metric.label}</div>
                  </div>
                </FadeIn>
              ))}
            </Grid>
          </Container>
        </Section>
      )}

      {/* 3. FEATURES GRID */}
      <Section>
        <Container size="7xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-slate-900 md:text-4xl">Fitur Unggulan</h2>
            <p className="text-lg text-slate-600">
              Setiap fitur dirancang untuk menyelesaikan masalah nyata yang Anda hadapi setiap hari.
            </p>
          </div>

          <FadeInStagger>
            <Grid cols={1} mdCols={2} lgCols={3} gap={6}>
              {data.features?.map((feature: { title: string; desc: string; icon?: React.ComponentType<{ className?: string }> }, idx: number) => {
                const FeatureIcon = feature.icon || Check;
                return (
                  <FadeIn key={idx} className="h-full">
                    <Card className="hover:border-primary-500 h-full border-slate-200 bg-white p-8 transition-all hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
                      <div className="bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 mb-6 inline-flex rounded-2xl p-3">
                        <FeatureIcon className="h-8 w-8" />
                      </div>
                      <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">{feature.title}</h3>
                      <p className="leading-relaxed text-slate-600 dark:text-slate-400">{feature.desc}</p>
                    </Card>
                  </FadeIn>
                );
              })}
            </Grid>
          </FadeInStagger>
        </Container>
      </Section>

      {/* 4. PROBLEMS SECTION */}
      {data.problems && data.problems.length > 0 && (
        <Section className="bg-slate-50">
          <Container size="7xl">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <h2 className="mb-6 text-3xl font-bold text-slate-900 md:text-4xl">
                Masalah yang Kami Selesaikan
              </h2>
              <p className="text-lg text-slate-600">
                Kami memahami tantangan yang Anda hadapi karena kami mendengarkan ratusan bisnis seperti Anda.
              </p>
            </div>

            <FadeInStagger>
              <Grid cols={1} mdCols={3} gap={6}>
                {data.problems.map((problem: { title: string; desc: string; icon?: React.ComponentType<{ className?: string }> }, idx: number) => {
                  const ProblemIcon = problem.icon || HelpCircle;
                  return (
                    <FadeIn key={idx} className="h-full">
                      <div className="h-full rounded-3xl border border-red-200 bg-white p-8 transition-all hover:shadow-lg dark:border-red-900/30 dark:bg-slate-900">
                        <div className="mb-6 inline-flex rounded-2xl bg-red-50 p-3 text-red-600 dark:bg-red-900/20 dark:text-red-400">
                          <ProblemIcon className="h-8 w-8" />
                        </div>
                        <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">{problem.title}</h3>
                        <p className="leading-relaxed text-slate-600 dark:text-slate-400">{problem.desc}</p>
                      </div>
                    </FadeIn>
                  );
                })}
              </Grid>
            </FadeInStagger>
          </Container>
        </Section>
      )}

      {/* 5. MOBILE ADVANTAGE */}
      {data.mobileAdvantage && (
        <Section>
          <Container size="7xl">
            <Grid cols={1} lgCols={2} gap={16} className="items-center">
              <div>
                <Badge className="mb-6 bg-emerald-100 text-emerald-700">Mobile First</Badge>
                <h2 className="mb-6 text-3xl font-bold text-slate-900 md:text-4xl">{data.mobileAdvantage.title}</h2>
                <p className="text-lg leading-relaxed text-slate-600">{data.mobileAdvantage.desc}</p>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-emerald-500/20 to-blue-500/20 blur-2xl"></div>
                  <div className="relative flex items-center justify-center rounded-3xl border border-slate-200 bg-white p-12 shadow-2xl">
                    <Smartphone className="text-primary-600 h-32 w-32" />
                  </div>
                </div>
              </div>
            </Grid>
          </Container>
        </Section>
      )}

      {/* 6. MODULE CONNECTIONS */}
      {data.connections && data.connections.length > 0 && (
        <Section className="bg-slate-50">
          <Container size="7xl">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <h2 className="mb-6 text-3xl font-bold text-slate-900 md:text-4xl">Integrasi Antar Modul</h2>
              <p className="text-lg text-slate-600">
                Data mengalir otomatis antar modul. Sekali input, update di mana-mana.
              </p>
            </div>

            <div className="space-y-6">
              {data.connections.map((conn: { target: string; desc: string }, idx: number) => (
                <FadeIn key={idx} delay={0.1 * idx}>
                  <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6">
                    <div className="bg-primary-50 text-primary-600 flex-shrink-0 rounded-xl p-3">
                      <ArrowRight className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-bold text-slate-900">
                        →
                        {conn.target}
                      </h3>
                      <p className="leading-relaxed text-slate-600">{conn.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* 7. TESTIMONIAL */}
      <Section>
        <Container size="4xl">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 md:p-12">
            <div className="mb-6 text-5xl text-slate-300">"</div>
            <p className="mb-8 text-2xl leading-relaxed font-medium text-slate-900">{testimonial.quote}</p>
            <div className="flex items-center gap-4">
              <img
                src={testimonial.avatar}
                alt={testimonial.author}
                className="h-16 w-16 rounded-full"
              />
              <div>
                <div className="font-bold text-slate-900">{testimonial.author}</div>
                <div className="text-sm text-slate-600">{testimonial.role}</div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 8. FAQs */}
      {data.faqs && data.faqs.length > 0 && (
        <Section className="bg-slate-50">
          <Container size="4xl">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <h2 className="mb-6 text-3xl font-bold text-slate-900 md:text-4xl">Pertanyaan yang Sering Diajukan</h2>
              <p className="text-lg text-slate-600">
                Jawaban untuk pertanyaan umum tentang modul ini.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8">
              {data.faqs.map((faq: { question: string; answer: string }, idx: number) => (
                <FAQItem key={idx} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* 9. RELATED MODULES */}
      {relatedModules.length > 0 && (
        <Section>
          <Container size="7xl">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <h2 className="mb-6 text-3xl font-bold text-slate-900 md:text-4xl">Modul Terkait</h2>
              <p className="text-lg text-slate-600">
                Jelajahi modul lain yang saling terintegrasi dengan
                {' '}
                {data.title}
                .
              </p>
            </div>

            <Grid cols={1} mdCols={3} gap={6}>
              {relatedModules.map((module) => {
                const ModuleIcon = module.icon || HelpCircle;
                const linkPath = module.type === 'capability'
                  ? `/platform/capabilities/${module.id}`
                  : `/platform/modules/${module.id}`;

                return (
                  <Link key={module.id} href={linkPath} className="group block">
                    <Card className="hover:border-primary-500 h-full p-8 transition-all hover:shadow-xl">
                      <div className="bg-primary-50 text-primary-600 group-hover:bg-primary-600 mb-6 inline-flex rounded-2xl p-3 transition-colors group-hover:text-white">
                        <ModuleIcon className="h-8 w-8" />
                      </div>
                      <h3 className="text-primary-600 group-hover:text-primary-600 mb-3 text-xl font-bold text-slate-900 transition-colors">
                        {module.title}
                      </h3>
                      {module.subtitle && (
                        <p className="leading-relaxed text-slate-600">{module.subtitle}</p>
                      )}
                    </Card>
                  </Link>
                );
              })}
            </Grid>
          </Container>
        </Section>
      )}

      {/* 10. FINAL CTA */}
      <Section className="border-t border-slate-200 bg-slate-50">
        <Container size="4xl" className="text-center">
          <h2 className="mb-8 text-4xl leading-tight font-bold text-slate-900 md:text-5xl">
            {data.cta?.text || 'Siap untuk Transformasi Digital?'}
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-xl text-slate-600">
            Jadwalkan demo 30 menit untuk melihat bagaimana modul ini bekerja secara real-time. Tanpa komitmen.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <BouncyLink
              href="/demo"
              className="shadow-primary-500/20 h-16 px-10 text-xl shadow-xl"
            >
              {data.cta?.buttonLabel || 'Lihat Demo'}
            </BouncyLink>
            <BouncyLink
              href="/pricing/calculator"
              className="h-16 bg-white px-10 text-xl hover:bg-slate-50"
            >
              Hitung Harga
            </BouncyLink>
          </div>
        </Container>
      </Section>
    </div>
  );
}
