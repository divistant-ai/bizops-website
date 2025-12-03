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
    <div className="flex flex-col bg-slate-50 dark:bg-slate-950">
      {/* 1. HERO SECTION - Clean & Balanced */}
      <div className="relative overflow-hidden bg-white pb-16 pt-24 dark:bg-slate-950 lg:pb-24 lg:pt-32">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-800"></div>
        
        <Container size="7xl" className="relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 flex justify-center">
              <span className="rounded-full border border-blue-100 bg-blue-50/50 px-3 py-1 text-xs font-medium text-blue-600 ring-4 ring-blue-50/20 dark:border-blue-900/30 dark:bg-blue-900/10 dark:text-blue-400 dark:ring-blue-900/10">
                Enterprise Grade Platform
              </span>
            </div>
            
            <h1 className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 dark:text-white md:text-5xl lg:text-6xl">
              The Adaptive <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Business Operating System</span>
            </h1>
            
            <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-600 dark:text-slate-400 md:text-xl">
              Satu platform terintegrasi untuk seluruh operasional bisnis. Dari HR, Finance, hingga Supply Chain—tanpa silo data.
            </p>

            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <BouncyLink href="/demo" className="flex h-12 w-full items-center justify-center rounded-xl bg-blue-600 px-8 font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-blue-600/30 sm:w-auto">
                Lihat Demo
              </BouncyLink>
              <BouncyLink href="/pricing" className="flex h-12 w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-8 font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 sm:w-auto">
                Lihat Harga
              </BouncyLink>
            </div>
          </div>
        </Container>
      </div>

      {/* 2. MODULES GRID - Clean Layout */}
      <Section className="border-y border-slate-200 bg-slate-50/50 py-20 dark:border-slate-800 dark:bg-slate-950/50">
        <Container size="7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">Core Modules</h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
              Modul bisnis esensial yang saling terhubung secara native.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((module) => {
              const Icon = module.icon;
              const colors = getModuleColor(module.id);
              return (
                <Link key={module.id} href={`/platform/modules/${module.id}`} className="group flex h-full flex-col">
                  <div className="relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-slate-900/50">
                    <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl ${colors.bg} transition-transform group-hover:scale-110 dark:bg-opacity-10`}>
                      <Icon className={`h-7 w-7 ${colors.text}`} />
                    </div>
                    
                    <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">{module.title}</h3>
                    <p className="mb-6 flex-grow text-base leading-relaxed text-slate-600 dark:text-slate-400">{module.subtitle}</p>
                    
                    <div className="flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400">
                      <span>Explore Module</span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 3. CAPABILITIES - Compact Grid */}
      <Section className="bg-white py-20 dark:bg-slate-950">
        <Container size="7xl">
          <div className="mb-16 flex flex-col items-center justify-between gap-4 border-b border-slate-100 pb-8 text-center md:flex-row md:text-left dark:border-slate-800">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Platform Capabilities</h2>
              <p className="mt-2 text-slate-600 dark:text-slate-400">Teknologi pendukung untuk skalabilitas bisnis.</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/platform/technology">Lihat Semua Teknologi</Link>
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((capability) => {
              const Icon = capability.icon;
              return (
                <Link key={capability.id} href={`/platform/capabilities/${capability.id}`} className="group">
                  <div className="flex h-full flex-col rounded-xl border border-slate-200 bg-slate-50 p-6 transition-all hover:border-blue-200 hover:bg-white hover:shadow-lg hover:shadow-blue-100/50 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-blue-900 dark:hover:bg-slate-900 dark:hover:shadow-none">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
                      <Icon className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                    </div>
                    <h3 className="mb-2 text-base font-bold text-slate-900 dark:text-white">{capability.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 line-clamp-2">{capability.subtitle}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 4. CTA SECTION - Clean Finish */}
      <Section className="bg-slate-900 py-20 dark:bg-slate-950">
        <Container size="5xl" className="text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-400"></span>
            </span>
            Trusted by 500+ Companies
          </div>
          
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            Siap Transformasi Digital?
          </h2>
          
          <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-300">
            Bergabunglah dengan ratusan perusahaan yang telah meningkatkan efisiensi operasional mereka dengan BizOps.
          </p>
          
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild className="h-12 rounded-xl bg-white px-8 font-semibold text-slate-900 shadow-lg hover:bg-slate-50">
              <Link href="/demo">Request Demo</Link>
            </Button>
            <Button asChild variant="outline" className="h-12 rounded-xl border-slate-600 px-8 font-medium text-white hover:bg-slate-800">
              <Link href="/contact">Hubungi Sales</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  );
}
