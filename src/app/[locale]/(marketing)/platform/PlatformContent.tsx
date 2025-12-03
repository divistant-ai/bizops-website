'use client';

import {
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import { Container, Section } from '@/components/layout';
import { Badge, Button, Grid } from '@/components/ui';
import { BouncyLink } from '@/components/ui/BouncyLink';
import { FadeIn, FadeInStagger } from '@/components/ui/FadeIn';
import { StaggeredText } from '@/components/ui/motion-text';
import { capabilitiesData, modulesData } from '@/data/platformContent';

// Helper Pattern
const GridPattern = () => (
  <div
    className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05]"
    style={{ backgroundImage: 'linear-gradient(#64748b 1px, transparent 1px), linear-gradient(to right, #64748b 1px, transparent 1px)', backgroundSize: '32px 32px' }}
  />
);

export default function PlatformContent() {
  const modules = Object.entries(modulesData).map(([key, val]) => ({ id: key, ...val }));
  const capabilities = Object.entries(capabilitiesData).map(([key, val]) => ({ id: key, ...val }));

  // Color mapping for modules
  const getModuleColor = (id: string) => {
    const colorMap: Record<string, { bg: string; text: string; hover: string }> = {
      'hr': { bg: 'bg-pink-50', text: 'text-pink-600', hover: 'hover:bg-pink-100' },
      'finance': { bg: 'bg-emerald-50', text: 'text-emerald-600', hover: 'hover:bg-emerald-100' },
      'operations': { bg: 'bg-blue-50', text: 'text-blue-600', hover: 'hover:bg-blue-100' },
      'sales': { bg: 'bg-amber-50', text: 'text-amber-600', hover: 'hover:bg-amber-100' },
      'supply-chain': { bg: 'bg-indigo-50', text: 'text-indigo-600', hover: 'hover:bg-indigo-100' },
      'governance': { bg: 'bg-slate-100', text: 'text-slate-700', hover: 'hover:bg-slate-200' },
    };
    return colorMap[id] || { bg: 'bg-slate-50', text: 'text-slate-600', hover: 'hover:bg-slate-100' };
  };

  return (
    <div className="flex flex-col bg-white dark:bg-slate-950">
      {/* 1. HERO SECTION */}
      <div className="relative overflow-hidden pt-24 pb-16 lg:pt-36 lg:pb-24">
        {/* Background Gradients */}
        <div className="pointer-events-none absolute top-0 right-0 h-full w-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent"></div>
        <div className="from-primary-100/40 pointer-events-none absolute bottom-0 left-0 h-full w-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] via-transparent to-transparent"></div>

        <Container size="7xl" className="relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="primary" className="mb-6">BizOps Platform</Badge>
            <h1 className="text-5xl leading-[1.1] font-bold tracking-tight text-slate-900 md:text-6xl lg:text-7xl">
              <StaggeredText
                text="The Adaptive"
                className="mb-2 flex w-full justify-center"
                delay={0.1}
              />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Business Operating System
              </span>
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-xl text-slate-600">
              Platform ERP all-in-one yang menyatukan HR, Finance, Operations, Sales, dan Supply Chain dalam satu ekosistem terintegrasi.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <BouncyLink href="/demo" className="h-14 px-8 text-lg font-semibold">
                Lihat Demo Platform
              </BouncyLink>
              <BouncyLink href="/pricing" className="h-14 bg-white px-8 text-lg font-medium text-slate-700 shadow-sm hover:bg-slate-50">
                Lihat Harga
              </BouncyLink>
            </div>
          </div>
        </Container>
      </div>

      {/* 2. MODULES SECTION */}
      <Section className="relative overflow-hidden bg-slate-50 dark:bg-slate-900">
        <GridPattern />
        <Container size="7xl" className="relative z-10">
          <FadeIn className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl dark:text-white">
              Modul Bisnis Terintegrasi
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
              Semua modul saling terhubung. Input di satu tempat, terupdate di mana-mana.
            </p>
          </FadeIn>

          <FadeInStagger>
            <Grid cols={1} mdCols={2} lgCols={3} gap={6}>
              {modules.map((module) => {
                const Icon = module.icon;
                const colors = getModuleColor(module.id);
                return (
                  <FadeIn key={module.id}>
                    <Link
                      href={`/platform/modules/${module.id}`}
                      className="group block h-full"
                    >
                      <div className={`flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-950 ${colors.hover} dark:hover:bg-slate-900`}>
                        <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${colors.bg} dark:bg-opacity-10`}>
                          <Icon className={`h-6 w-6 ${colors.text} dark:text-white`} />
                        </div>
                        <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">{module.title}</h3>
                        <p className="mb-4 flex-grow text-sm text-slate-600 dark:text-slate-400">{module.subtitle}</p>
                        <div className="flex items-center text-sm font-semibold text-blue-600 transition-colors group-hover:text-blue-700 dark:text-blue-400 dark:group-hover:text-blue-300">
                          Pelajari Lebih Lanjut
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </Link>
                  </FadeIn>
                );
              })}
            </Grid>
          </FadeInStagger>
        </Container>
      </Section>

      {/* 3. CAPABILITIES SECTION */}
      <Section className="bg-white dark:bg-slate-950">
        <Container size="7xl">
          <FadeIn className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl dark:text-white">
              Kemampuan Platform
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
              Teknologi modern untuk mendukung pertumbuhan bisnis Anda.
            </p>
          </FadeIn>

          <FadeInStagger>
            <Grid cols={1} mdCols={2} lgCols={4} gap={6}>
              {capabilities.map((capability) => {
                const Icon = capability.icon;
                return (
                  <FadeIn key={capability.id}>
                    <Link
                      href={`/platform/capabilities/${capability.id}`}
                      className="group block h-full"
                    >
                      <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-700">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/20">
                          <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">{capability.title}</h3>
                        <p className="mb-4 flex-grow text-sm text-slate-600 dark:text-slate-400">{capability.subtitle}</p>
                        <div className="flex items-center text-sm font-semibold text-blue-600 opacity-0 transition-all group-hover:opacity-100 dark:text-blue-400">
                          Lihat Detail
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </div>
                      </div>
                    </Link>
                  </FadeIn>
                );
              })}
            </Grid>
          </FadeInStagger>
        </Container>
      </Section>

      {/* 4. CTA SECTION */}
      <Section className="!bg-slate-900">
        <Container size="4xl" className="text-center">
          <h2 className="mb-6 text-4xl font-extrabold text-white md:text-5xl">
            Siap Transformasi Digital?
          </h2>
          <p className="mb-10 text-xl text-slate-300">
            Bergabunglah dengan ratusan perusahaan yang telah meningkatkan efisiensi operasional mereka dengan BizOps.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" variant="primary" className="bg-white text-blue-700 hover:bg-blue-50">
              <Link href="/demo">Request Demo</Link>
            </Button>
            <Button asChild size="lg" variant="outline-white">
              <Link href="/contact">Hubungi Sales</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  );
}
