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

// Elegant FAQ Component
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-slate-50 focus:outline-none dark:hover:bg-slate-800/50"
      >
        <span className="pr-4 text-sm font-semibold text-slate-900 transition-colors group-hover:text-blue-600 md:text-base dark:text-white dark:group-hover:text-blue-400">
          {question}
        </span>
        <div
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
            isOpen ? 'rotate-180 bg-blue-600 text-white dark:bg-blue-500' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
          }`}
        >
          <ChevronRight className="h-4 w-4" />
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ease-in-out ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <p className="px-4 pb-4 text-xs leading-relaxed text-slate-600 md:text-sm dark:text-slate-400">{answer}</p>
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
    <div className="flex flex-col bg-slate-50 dark:bg-slate-950">
      {/* 1. COMPACT PREMIUM HERO */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white pt-24 pb-12 lg:pt-32 lg:pb-16 dark:border-slate-800 dark:bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.08),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%)]"></div>

        <Container size="5xl" className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex items-center justify-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400"
          >
            <Link href="/platform" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">Platform</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-blue-600 dark:text-blue-400">{data.title}</span>
          </motion.div>

          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mb-6 inline-flex items-center justify-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg ring-4 shadow-blue-600/20 ring-blue-50 dark:ring-blue-900/20">
                <Icon className="h-8 w-8 text-white" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 text-3xl leading-tight font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl dark:text-white"
            >
              {data.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8 text-lg font-medium text-blue-600 dark:text-blue-400"
            >
              {data.subtitle}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg dark:text-slate-400"
            >
              {data.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col justify-center gap-3 sm:flex-row"
            >
              <BouncyLink href="/demo" className="flex h-11 items-center justify-center rounded-xl bg-blue-600 px-6 font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700">
                {data.cta?.buttonLabel || 'Lihat Demo'}
              </BouncyLink>
              <BouncyLink href="/contact" className="flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800">
                Hubungi Sales
              </BouncyLink>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 2. COMPACT METRICS */}
      {data.metrics && data.metrics.length > 0 && (
        <Section className="border-b border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-slate-950">
          <Container size="5xl">
            <div className="grid gap-6 sm:grid-cols-3">
              {data.metrics.map((metric: { value: string; label: string }, idx: number) => (
                <FadeIn key={idx} delay={0.1 * idx}>
                  <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-6 text-center transition-colors hover:border-slate-200 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-slate-700">
                    <div className="mb-1 text-3xl font-bold text-blue-600 md:text-4xl dark:text-blue-400">
                      <CounterUp to={Number.parseInt(metric.value.replace(/\D/g, '')) || 0} label={metric.label} suffix={metric.value.replace(/\d/g, '')} />
                    </div>
                    <div className="text-sm font-medium text-slate-600 dark:text-slate-400">{metric.label}</div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* 3. ELEGANT FEATURES GRID */}
      <Section className="py-20 lg:py-24">
        <Container size="6xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">Fitur Unggulan</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Dirancang untuk produktivitas dan kemudahan penggunaan.
            </p>
          </div>

          <FadeInStagger>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.features?.map((feature: { title: string; desc: string; icon?: React.ComponentType<{ className?: string }> }, idx: number) => {
                const FeatureIcon = feature.icon || Check;
                return (
                  <FadeIn key={idx} className="h-full">
                    <div className="group h-full rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-none">
                      <div className="mb-4 inline-flex rounded-lg bg-blue-50 p-3 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                        <FeatureIcon className="h-6 w-6" />
                      </div>
                      <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">{feature.title}</h3>
                      <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">{feature.desc}</p>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
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
