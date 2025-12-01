'use client';

import { ArrowRight, CheckCircle2, ChevronRight, Quote, Share2, Smartphone, Table as TableIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import FAQAccordion from '@/components/FAQAccordion';
import { Container, Section } from '@/components/layout';
import { Button } from '@/components/ui';
import { FadeIn } from '@/components/ui/FadeIn';

// Flexible types to accommodate different data structures (Industries vs Roles vs Services)
type Metric = {
  value: string;
  label: string;
};

type Feature = {
  title: string;
  desc: string; // or description
  description?: string; // alternate key
  icon?: React.ReactNode; // Changed from any to ReactNode for serialized icons
};

type Challenge = {
  title?: string;
  desc?: string;
  // Alternate structure for Roles data
  pain?: string;
  context?: string;
  gain?: string;
  gainDesc?: string;
};

type FAQ = {
  question: string;
  answer: string;
};

type Testimonial = {
  quote: string;
  author: string;
  role: string;
  avatar?: string;
};

type MobileAdvantage = {
  title: string;
  desc: string;
};

type Connection = {
  target: string;
  desc: string;
};

type ExtraSection = {
  title: string;
  type: string; // 'table'
  headers: string[];
  rows: string[][];
};

type Methodology = {
  title: string;
  desc: string;
};

type Benefit = {
  title: string;
  desc: string;
};

export type GenericLandingPageProps = {
  title: string; // Page Title
  subtitle?: string;
  description?: string;

  // Hero variations
  heroHeadline?: string;
  heroSub?: string;
  cta?: { btn: string; head?: string } | string; // CTA can be object or string (in Services)

  icon?: React.ReactNode; // Hero icon (serialized)

  metrics?: Metric[];
  challenges?: Challenge[];
  solutions?: Feature[]; // Sometimes called 'features' or 'solutions'
  features?: Feature[]; // Alternate key
  faqs?: FAQ[];

  caseStudyTitle?: string;
  caseStudy?: string;
  testimonial?: Testimonial;

  // Dashboard specific (for Roles)
  dashboardInsight?: string;
  dashboardFeatures?: string[];

  // Advanced features (for Platform/Capabilities)
  mobileAdvantage?: MobileAdvantage;
  connections?: Connection[];
  extraSection?: ExtraSection;

  // Services Specific
  methodology?: Methodology[];
  benefits?: Benefit[];
  deliverables?: string[];
};

const GenericLandingPage: React.FC<{ data: GenericLandingPageProps }> = ({ data }) => {
  // Normalize data
  const headline = data.heroHeadline || data.title;
  const subheadline = data.heroSub || data.description || data.subtitle;
  const featuresList = data.solutions || data.features || [];

  // Normalize CTA
  const ctaBtnText = typeof data.cta === 'string' ? data.cta : data.cta?.btn || 'Jadwalkan Demo';
  const ctaHeadText = typeof data.cta === 'string' ? 'Siap Memulai?' : data.cta?.head || 'Siap untuk Transformasi?';

  return (
    <div className="selection:bg-primary-500/30 bg-neutral-50 font-sans transition-colors">

      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden bg-white pt-32 pb-24 lg:pt-48 lg:pb-32">
        <div className="pointer-events-none absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        {/* Animated Glow Orbs */}
        <div className="bg-primary-100/50 pointer-events-none absolute top-0 right-0 h-[800px] w-[800px] rounded-full opacity-60 blur-[120px]"></div>
        <div className="bg-primary-200/50 pointer-events-none absolute bottom-0 left-0 h-[600px] w-[600px] rounded-full opacity-60 blur-[100px]"></div>

        <Container size="7xl" className="relative z-10 text-center">
          {data.icon && (
            <FadeIn>
              <div className="bg-primary-50 text-primary-600 border-primary-100 mx-auto mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl border shadow-sm">
                {data.icon}
              </div>
            </FadeIn>
          )}

          <FadeIn delay={0.1}>
            <h1 className="mb-6 text-4xl leading-[1.1] font-extrabold tracking-tight text-neutral-900 md:text-6xl lg:text-7xl">
              {headline}
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="mx-auto mb-10 max-w-3xl text-xl leading-relaxed font-normal text-neutral-600 md:text-2xl">
              {subheadline}
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="bg-primary-600 hover:bg-primary-700 shadow-primary-500/20 transform rounded-full px-8 text-white shadow-xl transition-all hover:-translate-y-1">
                {ctaBtnText}
                {' '}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="rounded-full border-neutral-300 px-8 text-neutral-700 hover:bg-neutral-50">
                  Hubungi Kami
                </Button>
              </Link>
            </div>
          </FadeIn>

          {/* Metrics Grid */}
          {data.metrics && (
            <FadeIn delay={0.4} className="mt-20">
              <div className="mx-auto grid max-w-4xl grid-cols-3 divide-x divide-neutral-200 md:gap-8">
                {data.metrics.map((m, i) => (
                  <div key={i} className="px-4">
                    <div className="mb-1 text-3xl font-extrabold tracking-tight text-neutral-900 md:text-5xl">{m.value}</div>
                    <div className="text-sm font-medium tracking-wide text-neutral-500 uppercase md:text-base">{m.label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          )}
        </Container>
      </section>

      {/* --- DASHBOARD HIGHLIGHTS (ROLES) --- */}
      {data.dashboardInsight && (
        <Section className="relative overflow-hidden bg-neutral-900 text-white">
          <div className="pointer-events-none absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
          <Container>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <h2 className="mb-6 text-3xl font-bold">{data.dashboardInsight}</h2>
                <p className="mb-8 text-lg text-neutral-400">
                  Dapatkan visibilitas total tanpa perlu menunggu laporan manual.
                </p>
                {data.dashboardFeatures && (
                  <div className="grid gap-4">
                    {data.dashboardFeatures.map((feat, i) => (
                      <FadeIn key={i} delay={i * 0.1}>
                        <div className="flex items-center rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10">
                          <div className="bg-primary-600 shadow-primary-500/30 mr-4 flex h-8 w-8 items-center justify-center rounded-lg text-white shadow-lg">
                            <CheckCircle2 className="h-5 w-5" />
                          </div>
                          <span className="font-semibold">{feat}</span>
                        </div>
                      </FadeIn>
                    ))}
                  </div>
                )}
              </div>
              <div className="relative">
                {/* Placeholder for Dashboard UI Image - simplified as abstract visual or mock */}
                <FadeIn delay={0.3}>
                  <div className="group relative flex aspect-video transform items-center justify-center overflow-hidden rounded-2xl border border-neutral-700 bg-gradient-to-br from-neutral-800 to-neutral-900 shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
                    <div className="bg-primary-500/5 group-hover:bg-primary-500/10 absolute inset-0 transition-colors"></div>
                    <div className="z-10 font-mono text-sm text-neutral-500">Dashboard Visual Preview</div>

                    {/* Fake UI Elements */}
                    <div className="absolute top-4 right-4 left-4 h-8 rounded border border-neutral-700 bg-neutral-800"></div>
                    <div className="absolute top-16 bottom-4 left-4 w-1/3 rounded border border-neutral-700 bg-neutral-800 opacity-50"></div>
                    <div className="absolute top-16 right-4 h-32 w-1/2 rounded border border-neutral-700 bg-neutral-800 opacity-50"></div>
                    <div className="absolute right-4 bottom-4 h-20 w-1/2 rounded border border-neutral-700 bg-neutral-800 opacity-50"></div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* --- METHODOLOGY (SERVICES) --- */}
      {data.methodology && (
        <Section className="border-y border-neutral-200 bg-neutral-50">
          <Container size="6xl">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold text-neutral-900">Metodologi Kami</h2>
              <p className="text-lg text-neutral-600">Pendekatan terstruktur untuk hasil yang terukur.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-4">
              {data.methodology.map((m, i) => (
                <FadeIn key={i} delay={i * 0.1} className="relative">
                  <div className="relative z-10 h-full rounded-2xl border border-neutral-200 bg-white p-6">
                    <div className="absolute top-4 right-4 z-0 text-4xl font-black text-neutral-100">{i + 1}</div>
                    <div className="relative z-10">
                      <h3 className="mb-3 text-lg font-bold text-neutral-900">{m.title}</h3>
                      <p className="text-sm leading-relaxed text-neutral-600">{m.desc}</p>
                    </div>
                  </div>
                  {/* Connector Line (Desktop) */}
                  {i < data.methodology!.length - 1 && (
                    <div className="absolute top-1/2 -right-4 z-0 hidden h-0.5 w-8 -translate-y-1/2 transform bg-neutral-300 md:block"></div>
                  )}
                </FadeIn>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* --- BENEFITS (SERVICES) --- */}
      {data.benefits && (
        <Section className="bg-white">
          <Container size="6xl">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold text-neutral-900">Nilai Tambah</h2>
              <p className="text-lg text-neutral-600">Mengapa memilih layanan kami?</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {data.benefits.map((b, i) => (
                <div key={i} className="bg-primary-50/50 border-primary-100 rounded-3xl border p-8">
                  <h3 className="text-primary-900 mb-3 text-xl font-bold">{b.title}</h3>
                  <p className="text-primary-800/80 leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* --- DELIVERABLES (SERVICES) --- */}
      {data.deliverables && (
        <Section className="relative overflow-hidden bg-neutral-900 text-white">
          <div className="pointer-events-none absolute top-0 left-0 h-full w-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
          <Container size="4xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-white">Apa yang Anda Dapatkan?</h2>
              <p className="text-neutral-400">Deliverables nyata, bukan sekadar konsep.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-md">
              <div className="grid gap-4 md:grid-cols-2">
                {data.deliverables.map((d, i) => (
                  <div key={i} className="flex items-center gap-3 text-neutral-200">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-400" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* --- PROBLEMS / CHALLENGES --- */}
      {data.challenges && (
        <Section className="border-y border-neutral-200 bg-neutral-50">
          <Container size="6xl">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold text-neutral-900">Mengapa Cara Lama Tidak Cukup?</h2>
              <p className="text-lg text-neutral-600">Tantangan yang sering dihadapi tanpa sistem yang tepat.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {data.challenges.map((c, i) => (
                <FadeIn key={i} delay={i * 0.1} className="h-full">
                  <div className="h-full rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
                    {/* Industry Style Challenge */}
                    {c.title && (
                      <>
                        <h3 className="mb-3 text-xl font-bold text-red-600">{c.title}</h3>
                        <p className="leading-relaxed text-neutral-600">{c.desc}</p>
                      </>
                    )}

                    {/* Role Style Challenge (Pain vs Gain) */}
                    {c.pain && (
                      <>
                        <div className="mb-6">
                          <div className="mb-2 text-xs font-bold tracking-wider text-red-500 uppercase">Pain Point</div>
                          <h3 className="mb-2 text-xl font-bold text-neutral-900">{c.pain}</h3>
                          <p className="text-sm leading-relaxed text-neutral-600">{c.context}</p>
                        </div>
                        <div className="border-t border-neutral-100 pt-6">
                          <div className="mb-2 text-xs font-bold tracking-wider text-green-600 uppercase">The BizOps Way</div>
                          <h3 className="mb-2 text-lg font-bold text-neutral-900">{c.gain}</h3>
                          <p className="text-sm leading-relaxed text-neutral-600">{c.gainDesc}</p>
                        </div>
                      </>
                    )}
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* --- SOLUTIONS / FEATURES --- */}
      {featuresList.length > 0 && (
        <Section className="bg-white">
          <Container size="7xl">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold text-neutral-900">Solusi BizOps</h2>
              <p className="text-lg text-neutral-600">Fitur yang dirancang khusus untuk kebutuhan Anda.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {featuresList.map((f, i) => {
                return (
                  <FadeIn key={i} delay={i * 0.1} className="h-full">
                    <div className="group hover:bg-primary-50/50 hover:border-primary-100 h-full rounded-[2rem] border border-neutral-100 bg-neutral-50 p-8 transition-colors">
                      <div className="text-primary-600 mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-neutral-100 bg-white shadow-sm transition-transform duration-300 group-hover:scale-110">
                        {f.icon ? f.icon : <CheckCircle2 className="h-7 w-7" />}
                      </div>
                      <h3 className="mb-3 text-xl font-bold text-neutral-900">{f.title || f.desc}</h3>
                      {' '}
                      {/* Handle generic lists */}
                      <p className="leading-relaxed text-neutral-600">{f.desc || f.description}</p>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </Container>
        </Section>
      )}

      {/* --- MOBILE ADVANTAGE --- */}
      {data.mobileAdvantage && (
        <Section className="relative overflow-hidden bg-neutral-900">
          <div className="bg-primary-600/10 absolute top-0 right-0 h-[600px] w-[600px] rounded-full blur-[120px]"></div>
          <Container size="5xl" className="relative z-10 text-center">
            <div className="bg-primary-500/20 text-primary-400 mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full">
              <Smartphone className="h-8 w-8" />
            </div>
            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">{data.mobileAdvantage.title}</h2>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-neutral-300">{data.mobileAdvantage.desc}</p>
          </Container>
        </Section>
      )}

      {/* --- CONNECTIONS / INTEGRATIONS --- */}
      {data.connections && (
        <Section className="border-y border-neutral-200 bg-neutral-50">
          <Container size="6xl">
            <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <h2 className="flex items-center gap-3 text-2xl font-bold text-neutral-900">
                  <Share2 className="text-primary-600 h-6 w-6" />
                  Ecosystem Connections
                </h2>
                <p className="mt-2 text-neutral-600">Bagaimana modul ini terhubung dengan sistem lainnya.</p>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {data.connections.map((c, i) => (
                <div key={i} className="hover:border-primary-300 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-colors">
                  <div className="text-primary-600 mb-2 text-xs font-bold tracking-wider uppercase">Connected to</div>
                  <h3 className="mb-2 text-lg font-bold text-neutral-900">{c.target}</h3>
                  <p className="text-sm leading-relaxed text-neutral-600">{c.desc}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* --- EXTRA SECTION (TABLES) --- */}
      {data.extraSection && data.extraSection.type === 'table' && (
        <Section className="bg-white">
          <Container size="5xl">
            <div className="mb-10 text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100 text-neutral-600">
                <TableIcon className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-900">{data.extraSection.title}</h2>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-neutral-200 shadow-sm">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-neutral-200 bg-neutral-50 text-xs font-bold tracking-wider text-neutral-900 uppercase">
                  <tr>
                    {data.extraSection.headers.map((h, i) => (
                      <th key={i} className="px-6 py-4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 bg-white">
                  {data.extraSection.rows.map((row, i) => (
                    <tr key={i} className="transition-colors hover:bg-neutral-50/50">
                      {row.map((cell, j) => (
                        <td key={j} className="first:text-primary-600 px-6 py-4 font-medium whitespace-nowrap text-neutral-600 first:font-bold">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Container>
        </Section>
      )}

      {/* --- CASE STUDY / TESTIMONIAL --- */}
      {(data.caseStudy || data.testimonial) && (
        <Section className="relative overflow-hidden bg-neutral-900 text-white">
          <div className="pointer-events-none absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
          <div className="bg-primary-600/10 absolute top-0 right-0 h-[600px] w-[600px] rounded-full blur-[120px]"></div>

          <Container size="6xl" className="relative z-10">
            <div className="grid items-center gap-16 md:grid-cols-2">
              <div>
                {data.caseStudyTitle && (
                  <div className="mb-6 inline-block rounded-full border border-green-500/30 bg-green-500/20 px-3 py-1 text-xs font-bold tracking-wider text-green-300 uppercase">
                    Impact Story
                  </div>
                )}
                <h2 className="mb-6 text-3xl leading-tight font-bold md:text-4xl">
                  {data.caseStudyTitle || 'Real Results'}
                </h2>
                <p className="mb-8 text-xl leading-relaxed text-neutral-300">
                  {data.caseStudy || 'Lihat bagaimana klien kami bertransformasi.'}
                </p>
                <Button variant="white" className="rounded-full">
                  Baca Use Case Lengkap
                  {' '}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              {data.testimonial && (
                <div className="relative rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-md md:p-10">
                  <Quote className="text-primary-400 mb-6 h-10 w-10 opacity-50" />
                  <p className="mb-8 text-lg leading-relaxed font-medium text-white italic md:text-xl">
                    "
                    {data.testimonial.quote}
                    "
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="border-primary-500 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 bg-neutral-700 text-lg font-bold text-white">
                      {data.testimonial.avatar?.includes('http')
                        ? (
                            <img src={data.testimonial.avatar} alt={data.testimonial.author} className="h-full w-full object-cover" />
                          )
                        : (
                            data.testimonial.author.charAt(0)
                          )}
                    </div>
                    <div>
                      <div className="font-bold text-white">{data.testimonial.author}</div>
                      <div className="text-primary-300 text-sm">{data.testimonial.role}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Container>
        </Section>
      )}

      {/* --- FAQ SECTION --- */}
      {data.faqs && (
        <Section className="bg-white">
          <Container size="4xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-neutral-900">Common Questions</h2>
            </div>
            <FAQAccordion faqs={data.faqs.map(f => ({ q: f.question, a: f.answer }))} />
          </Container>
        </Section>
      )}

      {/* --- FINAL CTA --- */}
      <Section className="border-t border-neutral-200 bg-neutral-50">
        <Container size="4xl" className="text-center">
          <h2 className="mb-6 text-3xl font-extrabold text-neutral-900 md:text-4xl">
            {ctaHeadText}
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-neutral-600">
            Jangan biarkan operasional manual menghambat pertumbuhan bisnis Anda. Mulai digitalisasi sekarang.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" className="shadow-primary-500/20 bg-primary-600 hover:bg-primary-700 h-14 rounded-xl px-10 text-lg text-white shadow-xl">
              {ctaBtnText}
            </Button>
            <Button size="lg" variant="outline" className="h-14 rounded-xl border-neutral-300 bg-white px-10 text-lg text-neutral-700 hover:bg-neutral-50">
              Jadwalkan Konsultasi Gratis
            </Button>
          </div>
        </Container>
      </Section>

    </div>
  );
};

export default GenericLandingPage;
