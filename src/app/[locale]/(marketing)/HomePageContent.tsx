'use client';

import {
  ArrowRight,
  ArrowUpRight,
  Calculator,
  CheckCircle2,
  ChevronRight,
  Lock,
  PlayCircle,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import { Container, Section } from '@/components/layout';
import {
  Badge,
  Button,
  Grid,
  OptimizedImage,
  Stack,
} from '@/components/ui';
import { BouncyLink } from '@/components/ui/BouncyLink';
import { FadeIn } from '@/components/ui/FadeIn';
import { BarChart, CardSlider, InfiniteScrollLoop, SpotlightCard } from '@/components/ui/LazyComponents';
import { StaggeredText } from '@/components/ui/motion-text';
import {
  homeIndustriesData,
  homeIntegrations,
  homeProblems,
  homeProcess,
  homeRolesData,
  homeSolutions,
  homeUVP,
} from '@/data/homeContent';

export default function HomePageContent() {
  const t = useTranslations('Homepage');
  const [activeTab, setActiveTab] = useState(homeSolutions[0]?.id || '');
  const activeSolution = homeSolutions.find(s => s.id === activeTab) || homeSolutions[0];

  if (!activeSolution) {
    return null; // Early return if no solution found
  }

  // Helper to convert object to array for mapping
  const industries = Object.entries(homeIndustriesData).map(([key, val]) => ({ id: key, ...val }));
  const roles = Object.entries(homeRolesData).map(([key, val]) => ({ id: key, ...val }));

  return (
    <>
      {/* 1. HERO SECTION */}
      <div className="relative overflow-hidden bg-white pt-32 pb-20 lg:pt-48 lg:pb-32 dark:bg-slate-950">
        {/* Background Elements */}
        <div className="pointer-events-none absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="pointer-events-none absolute top-0 left-1/2 h-full w-full max-w-7xl -translate-x-1/2">
          <div className="animate-pulse-slow absolute top-[10%] left-[10%] h-96 w-96 rounded-full bg-blue-500/20 blur-[100px]"></div>
          <div className="animate-pulse-slow absolute right-[10%] bottom-[20%] h-80 w-80 rounded-full bg-sky-500/20 blur-[100px]"></div>
          <div className="animate-pulse-slow absolute top-[40%] left-[60%] h-64 w-64 rounded-full bg-indigo-500/20 blur-[80px]"></div>
        </div>

        <Container size="7xl" className="relative z-10 text-center">
          {/* Announcement Pill */}
          <FadeIn delay={0.1} className="mb-8 inline-flex w-full justify-center">
            <div className="group inline-flex cursor-pointer items-center gap-3 rounded-full border border-slate-200/60 bg-white px-5 py-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:border-blue-200 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] dark:border-slate-800/60 dark:bg-slate-900 dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] dark:hover:border-blue-800 dark:hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600"></span>
              </span>
              <span className="text-sm font-semibold text-slate-600 transition-colors group-hover:text-blue-700 dark:text-slate-400 dark:group-hover:text-blue-400">
                {t('announcement')}
              </span>
              <ArrowRight className="h-4 w-4 text-slate-400 transition-all group-hover:translate-x-0.5 group-hover:text-blue-600 dark:text-slate-500 dark:group-hover:text-blue-400" />
            </div>
          </FadeIn>

          {/* Main Headline */}
          <div className="mx-auto mb-8 max-w-6xl">
            <h1 className="text-5xl leading-[1.1] font-bold tracking-tight text-slate-900 md:text-7xl lg:text-8xl dark:text-white">
              <StaggeredText
                text={t('hero_title_prefix')}
                className="mb-2 flex w-full justify-center"
                delay={0.2}
              />
              <span className="mt-2 block bg-gradient-to-r from-slate-900 via-blue-700 to-blue-600 bg-clip-text pb-4 text-transparent dark:from-white dark:via-blue-400 dark:to-blue-500">
                {t('hero_title_highlight')}
              </span>
            </h1>
          </div>

          {/* Subheadline */}
          <FadeIn delay={0.3}>
            <p className="mx-auto mb-12 max-w-3xl text-xl leading-relaxed font-normal text-slate-500 md:text-2xl dark:text-slate-400">
              {t('hero_description')}
            </p>
          </FadeIn>

          {/* CTAs */}
          <FadeIn delay={0.4}>
            <div className="mb-20 flex flex-col justify-center gap-4 sm:flex-row">
              <BouncyLink
                href="/demo"
                className="h-14 px-10 text-lg font-semibold shadow-xl shadow-blue-900/10"
              >
                {t('cta_demo')}
              </BouncyLink>
              <BouncyLink
                href="/pricing/calculator"
                className="h-14 bg-white px-10 text-lg font-medium text-slate-700 shadow-sm hover:bg-slate-50 hover:text-slate-900 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
              >
                <Calculator className="mr-2 h-5 w-5 text-slate-400" />
                {' '}
                {t('cta_pricing')}
              </BouncyLink>
            </div>
          </FadeIn>

          {/* Hero Visual / Dashboard Preview */}
          <div className="group relative mx-auto mt-8 max-w-6xl">
            <div className="pointer-events-none absolute inset-0 z-20 h-full w-full bg-gradient-to-t from-white via-transparent to-transparent"></div>
            <div className="relative aspect-[16/9] transform overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] transition-transform duration-700 group-hover:scale-[1.01] group-hover:shadow-[0_20px_60px_-12px_rgba(37,99,235,0.2)] md:aspect-[21/9]">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
                alt="Preview dashboard BizOps ERP"
                width={1920}
                height={1080}
                priority={true}
                loading="eager"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                className="h-full w-full object-cover opacity-90 transition-opacity hover:opacity-100"
              />

              {/* Overlay UI Badge */}
              <Stack direction="horizontal" gap={2} align="center" className="absolute top-4 left-4 z-30 rounded-full border border-slate-800 bg-slate-950/80 px-3 py-1.5 text-[10px] text-slate-300 shadow-lg backdrop-blur-md">
                <Lock className="h-3 w-3 text-green-400" />
                {' '}
                <span className="font-mono">secure://bizops.id/dashboard</span>
              </Stack>
            </div>
          </div>

          {/* Social Proof Logos */}
          <div className="mt-20 overflow-hidden border-t border-slate-100 pt-10">
            <p className="mb-6 text-sm leading-normal text-slate-500">Dipercaya oleh Pemimpin Industri</p>
            <div className="flex items-center justify-center gap-8 opacity-70 grayscale transition-all duration-500 hover:grayscale-0">
              {['Divistant', 'Dikstra', 'Arena Rasa Nusantara', 'Aero Travel Indonesia', 'TechCorp', 'BuildCo'].map(brand => (
                <span key={brand} className="cursor-default text-xl font-black tracking-tighter whitespace-nowrap text-slate-800 md:text-2xl">{brand}</span>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* 2. PROBLEMS SECTION */}
      <Section id="problems" className="relative overflow-hidden bg-slate-50 dark:bg-slate-950" noPadding containerClassName="py-24 md:py-32">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
        >
        </div>

        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="text-3xl leading-tight font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
            Mengapa Bisnis Anda
            {' '}
            <span className="relative inline-block text-red-500">
              Stuck?
              {' '}
              <span className="absolute bottom-2 left-0 -z-10 h-3 w-full -rotate-2 transform bg-red-200 opacity-30"></span>
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-600 md:text-lg">
            Pertumbuhan bisnis seringkali terhambat bukan karena kurangnya penjualan, tapi karena kekacauan operasional internal.
          </p>
        </div>

        <CardSlider desktopClassName="md:grid md:grid-cols-3 gap-8" mobileItemWidth="w-[85vw] sm:w-[350px]">
          {homeProblems.map((prob, idx) => {
            const Icon = prob.icon;
            return (
              <SpotlightCard key={idx} className="h-full rounded-3xl" spotlightColor="rgba(239, 68, 68, 0.1)">
                <div className="flex h-full flex-col p-8">
                  <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${prob.bg} ring-1 ring-black/5 ring-inset`}>
                    <Icon className={`h-7 w-7 ${prob.color}`} aria-hidden="true" />
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-slate-900">{prob.title}</h3>
                  <p className="mb-3 text-sm font-bold tracking-wide text-red-500 uppercase">{prob.subtitle}</p>
                  <p className="flex-grow leading-relaxed text-slate-600">{prob.desc}</p>
                </div>
              </SpotlightCard>
            );
          })}
        </CardSlider>
      </Section>

      {/* 3. SOLUTIONS SECTION */}
      <Section id="solutions" className="relative overflow-hidden !bg-slate-900" noPadding containerClassName="py-24 md:py-32">
        <div className="pointer-events-none absolute top-0 right-0 h-full w-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900 to-slate-950"></div>
        <div className="pointer-events-none absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-t from-slate-950 to-transparent"></div>

        <Stack direction="vertical" gap={8} className="relative z-10 mb-16 items-end justify-between md:flex-row">
          <div className="max-w-2xl">
            <Badge variant="outline-white" className="mb-4">BizOps Platform</Badge>
            <h2 className="text-3xl leading-tight font-bold text-white md:text-4xl lg:text-5xl">
              Satu Solusi,
              {' '}
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Tak Terbatas Kemungkinan.</span>
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              Modul yang saling berbicara satu sama lain. Input di satu tempat, terupdate di mana-mana.
            </p>
          </div>
          <Button asChild size="md" variant="white" className="group">
            <Link href="/platform">
              Lihat Semua Modul
              {' '}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </Stack>

        <Grid cols={12} gap={8} className="relative z-10">
          {/* Navigation Tabs */}
          <div className="space-y-3 lg:col-span-4" role="tablist" aria-label="Solution categories">
            {homeSolutions.map((sol) => {
              const Icon = sol.icon;
              return (
                <button
                  key={sol.id}
                  onClick={() => setActiveTab(sol.id)}
                  role="tab"
                  aria-selected={activeTab === sol.id}
                  aria-controls={`panel-${sol.id}`}
                  id={`tab-${sol.id}`}
                  className={`group flex w-full items-center justify-between rounded-2xl border px-6 py-5 text-left transition-all duration-300 ${
                    activeTab === sol.id
                      ? 'translate-x-2 border-slate-700 bg-gradient-to-r from-slate-800 to-slate-800/50 shadow-lg'
                      : 'border-transparent text-slate-400 hover:bg-slate-800/30'
                  }`}
                >
                  <Stack direction="horizontal" gap={4} align="center">
                    <div className={`rounded-xl p-2.5 transition-colors ${activeTab === sol.id ? sol.bg : 'bg-slate-800 group-hover:bg-slate-700'}`}>
                      <Icon className={`h-5 w-5 ${activeTab === sol.id ? sol.color : 'text-slate-500'}`} aria-hidden="true" />
                    </div>
                    <div>
                      <div className={`text-base font-bold ${activeTab === sol.id ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                        {sol.label}
                      </div>
                      <div className="mt-0.5 text-xs font-medium tracking-wider text-slate-500 uppercase">
                        {sol.category}
                      </div>
                    </div>
                  </Stack>
                  {activeTab === sol.id && <ChevronRight className={`h-5 w-5 ${sol.color}`} aria-hidden="true" />}
                </button>
              );
            })}
          </div>

          {/* Content Panel */}
          <div className="lg:col-span-8">
            <div
              key={activeTab}
              role="tabpanel"
              id={`panel-${activeTab}`}
              aria-labelledby={`tab-${activeTab}`}
              className="animate-fade-in relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl border border-slate-700 bg-slate-800/40 p-8 backdrop-blur-md transition-all duration-500 md:p-12"
            >
              <div className={`absolute top-0 right-0 h-96 w-96 ${activeSolution.bg} pointer-events-none rounded-full opacity-20 blur-[120px]`}></div>

              <div className="relative z-10">
                <div className="mb-10">
                  <Stack direction="horizontal" gap={3} align="center" className="mb-4">
                    <div className={`rounded-lg p-2 ${activeSolution.bg} bg-opacity-20`}>
                      {(() => {
                        const Icon = activeSolution.icon;
                        return <Icon className={`h-6 w-6 ${activeSolution.color}`} aria-hidden="true" />;
                      })()}
                    </div>
                    <h3 className="text-3xl leading-tight font-bold text-white">{activeSolution.label}</h3>
                  </Stack>
                  <p className="border-l-4 border-slate-700 pl-4 text-xl leading-relaxed text-slate-300 italic">
                    "
                    {activeSolution.impact}
                    "
                  </p>
                </div>

                <Grid cols={1} mdCols={2} gap={8}>
                  <div>
                    <h4 className="mb-4 text-xl font-semibold text-white">Fitur Utama</h4>
                    <ul className="space-y-4">
                      {activeSolution.modules.map((mod, idx) => (
                        <li key={idx} className="group flex items-start gap-3">
                          <CheckCircle2 className={`h-5 w-5 ${activeSolution.color} mt-0.5 flex-shrink-0 transition-transform group-hover:scale-110`} aria-hidden="true" />
                          <span className="text-sm text-slate-300 transition-colors group-hover:text-white md:text-base">{mod}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Stack direction="vertical" gap={4} align="center" justify="center" className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-8 text-center transition-colors hover:border-slate-600">
                    <div className="group mb-2 cursor-pointer rounded-full bg-slate-800 p-4 ring-1 ring-slate-700 transition-all hover:ring-slate-600">
                      <PlayCircle className={`h-10 w-10 ${activeSolution.color} transition-transform group-hover:scale-110`} aria-hidden="true" />
                    </div>
                    <h5 className="text-lg font-semibold text-white">Lihat Demo Modul Ini</h5>
                    <p className="text-sm text-slate-400">Video singkat 2 menit penjelasan fitur.</p>
                    <Button asChild size="sm" variant="outline-white" className="mt-2">
                      <Link href="/platform">Tonton Video</Link>
                    </Button>
                  </Stack>
                </Grid>
              </div>
            </div>
          </div>
        </Grid>
      </Section>

      {/* 4. VALUE PROPOSITION (UVP) */}
      <Section id="uvp" className="!bg-white" noPadding containerClassName="py-24 md:py-32">
        <Container size="3xl" className="mb-16 text-center">
          <h2 className="text-3xl leading-tight font-bold tracking-tight text-slate-900 md:text-4xl">
            Bukan Sekadar ERP Biasa
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Kami membangun BizOps dengan filosofi "Indonesia-First". Sesuai regulasi lokal, fleksibel untuk budaya kerja lokal.
          </p>
        </Container>

        <CardSlider desktopClassName="md:grid md:grid-cols-3 gap-8" mobileItemWidth="w-[85vw] sm:w-[350px]">
          {homeUVP.map((uvp, idx) => {
            const Icon = uvp.icon;
            return (
              <SpotlightCard key={idx} className="h-full rounded-3xl bg-slate-50 dark:border dark:border-slate-700 dark:bg-slate-800" spotlightColor="rgba(37, 99, 235, 0.1)">
                <div className="relative flex h-full flex-col p-8">
                  <div className="pointer-events-none absolute top-8 right-8 text-slate-200 transition-colors group-hover:text-blue-100">
                    <Icon className="h-24 w-24 transform opacity-20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6" aria-hidden="true" />
                  </div>
                  <div className="relative z-10 flex-grow">
                    <Stack direction="horizontal" gap={4} align="center" justify="center" className="mb-6 h-14 w-14 rounded-2xl bg-white text-blue-600 shadow-sm ring-1 ring-slate-100 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white dark:bg-slate-900 dark:ring-slate-700">
                      <Icon className="h-7 w-7" aria-hidden="true" />
                    </Stack>
                    <h3 className="mb-2 text-2xl font-bold text-slate-900">{uvp.title}</h3>
                    <p className="mb-3 font-medium tracking-wide text-blue-600">{uvp.subtitle}</p>
                    <p className="leading-relaxed text-slate-600">{uvp.desc}</p>
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </CardSlider>
      </Section>

      {/* 5. PRICING COMPARISON */}
      <Section id="pricing-comparison" className="relative overflow-hidden border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900" noPadding containerClassName="py-24 md:py-32">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent"></div>

        <div className="relative z-10 mb-20 text-center">
          <h2 className="text-3xl leading-tight font-extrabold tracking-tight text-slate-900 md:text-5xl">
            <span className="bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
              Bandingkan Nilai Investasi Anda
            </span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            BizOps bukan hanya soal "lebih murah". Ini soal
            {' '}
            <span className="font-semibold text-slate-900">efisiensi total</span>
            . Bandingkan kompleksitas, waktu implementasi, dan hidden cost.
          </p>
        </div>

        <Grid cols={12} gap={6} className="relative z-10 items-stretch">
          {/* LEFT COLUMN: The Problems */}
          <CardSlider
            breakpoint="lg"
            className="h-full lg:col-span-5"
            desktopClassName="lg:grid lg:grid-cols-1 lg:grid-rows-2 gap-6 h-full"
            mobileItemWidth="w-full"
            desktopItemWidth="lg:w-full"
          >
            {/* Card 1: Fragmented Stack */}
            <SpotlightCard className="h-full rounded-3xl border-red-200" spotlightColor="rgba(239, 68, 68, 0.1)">
              <div className="flex h-full flex-col p-8">
                <Stack direction="horizontal" justify="between" className="mb-6">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold tracking-wider text-slate-500 uppercase">Problem #1</span>
                  <div className="rounded-xl bg-red-50 p-2 text-red-500">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                  </div>
                </Stack>

                <h3 className="mb-2 text-2xl font-bold text-slate-900">Fragmented Stack</h3>
                <p className="mb-6 leading-relaxed text-slate-500">
                  Menggabungkan 3-5 aplikasi SaaS berbeda. Akibatnya:
                  {' '}
                  <span className="font-semibold text-red-500">Data Silo & Vendor Fatigue.</span>
                </p>

                <div className="mt-auto">
                  <Stack direction="vertical" gap={3} className="mb-6 border-b border-slate-100 pb-4">
                    {[{ label: 'CRM License', price: 'Rp 150rb' }, { label: 'Accounting App', price: 'Rp 250rb' }, { label: 'HRIS App', price: 'Rp 20rb' }].map((item, i) => (
                      <Stack key={i} direction="horizontal" justify="between" className="text-xs text-slate-500">
                        <span>{item.label}</span>
                        <span className="font-bold text-slate-700">
                          {item.price}
                          <span className="font-normal opacity-70">/user</span>
                        </span>
                      </Stack>
                    ))}
                  </Stack>

                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <Stack direction="horizontal" align="end" justify="between" className="mb-2">
                      <span className="text-sm text-slate-500">Total Cost (50 Users)</span>
                      <span className="text-lg font-bold text-slate-900">
                        ~Rp 21 Jt
                        <span className="text-xs font-normal text-slate-400">/bln</span>
                      </span>
                    </Stack>
                    <div className="mb-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                      <div className="h-full w-[90%] bg-red-400"></div>
                    </div>
                    <Stack direction="horizontal" justify="between" className="text-[10px] text-slate-400">
                      <span>Integration Time:</span>
                      <span className="font-bold text-red-500">3-6 Bulan</span>
                    </Stack>
                  </div>
                </div>
              </div>
            </SpotlightCard>

            {/* Card 2: Legacy ERP */}
            <SpotlightCard className="h-full rounded-3xl border-amber-200" spotlightColor="rgba(245, 158, 11, 0.1)">
              <div className="flex h-full flex-col p-8">
                <Stack direction="horizontal" justify="between" className="mb-6">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold tracking-wider text-slate-500 uppercase">Problem #2</span>
                  <div className="rounded-xl bg-amber-50 p-2 text-amber-500">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                  </div>
                </Stack>
                <h3 className="mb-2 text-2xl font-bold text-slate-900">Legacy / Global ERP</h3>
                <p className="mb-6 leading-relaxed text-slate-500">
                  Model lisensi per user yang kaku. Akibatnya:
                  {' '}
                  <span className="font-semibold text-amber-500">Growth Penalty & Mahal.</span>
                </p>

                <div className="mt-auto">
                  <Stack direction="vertical" gap={3} className="mb-6 border-b border-slate-100 pb-4">
                    {[{ label: 'Standard License', price: '~Rp 210rb' }, { label: 'Implementation', price: '$$$ (Extra)' }, { label: 'Maintenance', price: '~20% / year' }].map((item, i) => (
                      <Stack key={i} direction="horizontal" justify="between" className="text-xs text-slate-500">
                        <span>{item.label}</span>
                        <span className="font-bold text-slate-700">
                          {item.price}
                          {item.label.includes('License') && <span className="font-normal opacity-70">/user</span>}
                        </span>
                      </Stack>
                    ))}
                  </Stack>

                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <Stack direction="horizontal" align="end" justify="between" className="mb-2">
                      <span className="text-sm text-slate-500">Total Cost (50 Users)</span>
                      <span className="text-lg font-bold text-slate-900">
                        ~Rp 10.5 Jt
                        <span className="text-xs font-normal text-slate-400">/bln</span>
                      </span>
                    </Stack>
                    <div className="mb-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                      <div className="h-full w-[60%] bg-amber-400"></div>
                    </div>
                    <Stack direction="horizontal" justify="between" className="text-[10px] text-slate-400">
                      <span>Implementation Time:</span>
                      <span className="font-bold text-amber-500">6-12 Bulan</span>
                    </Stack>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </CardSlider>

          {/* RIGHT COLUMN: The Solution */}
          <div className="lg:col-span-7">
            <div className="group relative h-full rounded-[2.5rem] bg-slate-950 p-1 shadow-2xl ring-1 shadow-blue-900/40 ring-white/10">
              <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 p-[2px] opacity-100"></div>

              <Stack direction="vertical" gap={4} justify="between" className="relative h-full overflow-hidden rounded-[2.4rem] bg-slate-900 p-8 md:p-12">
                <div className="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[120px]"></div>
                <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-indigo-500/10 blur-[100px]"></div>
                <div className="pointer-events-none absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

                <div className="relative z-10 flex h-full flex-col">
                  <Stack direction="vertical" gap={4} className="mb-8 justify-between md:items-center">
                    <Stack direction="horizontal" gap={2} align="center" className="w-fit rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-1.5 text-xs font-bold tracking-wider text-white uppercase shadow-lg shadow-blue-500/20">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      {' '}
                      The BizOps Way
                    </Stack>
                    <div className="text-left md:text-right">
                      <span className="text-xs font-semibold tracking-widest text-slate-400 uppercase">Best Value Choice</span>
                    </div>
                  </Stack>

                  <h3 className="mb-4 text-3xl leading-tight font-black tracking-tight text-white md:text-4xl">
                    Satu Platform.
                    <br />
                    <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Tanpa Batas User.</span>
                  </h3>
                  <p className="mb-8 text-lg text-slate-300">
                    Platform terintegrasi dengan harga flat yang adil. Infrastruktur managed service, siap mendukung pertumbuhan bisnis Anda tanpa penalti biaya.
                  </p>

                  <div className="relative mb-8 flex-grow rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-colors duration-500 group-hover:bg-white/10 md:p-8">
                    <div className="absolute top-0 bottom-0 left-0 w-1.5 rounded-l-3xl bg-gradient-to-b from-green-400 to-emerald-600"></div>
                    <Grid cols={1} mdCols={2} gap={8} className="h-full items-center">
                      <div>
                        <span className="text-sm font-medium tracking-wider text-slate-400">Flat Monthly Cost</span>
                        <p className="my-2 text-4xl leading-tight font-black tracking-tighter text-white md:text-5xl">Rp 3 Jt</p>
                        <p className="text-sm text-slate-500">Paket Business (50 User)</p>
                      </div>
                      <Stack direction="vertical" gap={2} align="end" justify="center" className="border-white/10 text-right md:border-l md:pl-6">
                        <div className="mb-1 ml-auto w-fit rounded-lg border border-green-500/30 bg-green-500/20 px-3 py-1.5 text-sm font-bold text-green-400">
                          HEMAT 85%
                        </div>
                        <span className="text-xs text-slate-400">vs Fragmented Stack</span>
                        <span className="mt-2 text-xs text-slate-400">
                          Go-Live:
                          <span className="font-bold text-white">14 Hari</span>
                        </span>
                      </Stack>
                    </Grid>
                  </div>

                  <Grid cols={1} smCols={2} gap={4} className="mb-8">
                    <Stack direction="horizontal" gap={3} align="start" className="rounded-xl border border-white/5 bg-slate-900/50 p-4">
                      <div className="mt-1 text-green-400"><CheckCircle2 className="h-5 w-5" /></div>
                      <div>
                        <h4 className="text-sm font-bold text-white">Local Compliance</h4>
                        <p className="text-xs text-slate-400">Pajak, BPJS, Kasbon Ready.</p>
                      </div>
                    </Stack>
                    <Stack direction="horizontal" gap={3} align="start" className="rounded-xl border border-white/5 bg-slate-900/50 p-4">
                      <div className="mt-1 text-blue-400"><CheckCircle2 className="h-5 w-5" /></div>
                      <div>
                        <h4 className="text-sm font-bold text-white">Managed Infrastructure</h4>
                        <p className="text-xs text-slate-400">Server & Security Included.</p>
                      </div>
                    </Stack>
                  </Grid>
                </div>

                <div className="relative z-10 mt-auto">
                  <Button asChild size="md" variant="primary" className="h-14 w-full transform border-none bg-gradient-to-r from-blue-600 to-indigo-600 text-base font-bold shadow-xl shadow-blue-600/20 transition-all hover:scale-[1.01] hover:from-blue-500 hover:to-indigo-500 hover:shadow-blue-600/40">
                    <Link href="/pricing/calculator">Hitung Penghematan Anda</Link>
                  </Button>
                </div>
              </Stack>
            </div>
          </div>
        </Grid>
      </Section>

      {/* 6. PROCESS SECTION */}
      <Section id="process" className="relative overflow-hidden !bg-slate-950" noPadding containerClassName="py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px]"></div>

        <Stack direction="vertical" gap={6} className="relative z-10 mb-16 items-end justify-between md:flex-row">
          <div className="max-w-2xl">
            <h2 className="text-3xl leading-tight font-extrabold tracking-tight text-white md:text-4xl">
              Go-Live dalam
              {' '}
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">30 Hari.</span>
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-300">
              Metodologi implementasi "Sprint" kami memangkas waktu setup hingga 70%.
              {' '}
              <strong className="font-medium text-white">Tanpa drama</strong>
              , tanpa biaya konsultan yang membengkak.
            </p>
          </div>
          <Button asChild size="md" variant="outline-white" className="border-white/20 px-6 font-medium text-white hover:bg-white/10">
            <Link href="/services">Pelajari Metodologi Kami</Link>
          </Button>
        </Stack>

        <CardSlider desktopClassName="md:grid md:grid-cols-4 gap-6" mobileItemWidth="w-[85vw] sm:w-[350px]">
          {homeProcess.map((step, idx) => {
            return (
              <div key={idx} className="group relative h-full">
                {idx < homeProcess.length - 1 && (
                  <div className="absolute top-12 left-full z-0 -ml-4 hidden h-0.5 w-full bg-slate-800/50 md:block">
                    <div className="absolute inset-0 w-0 bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-1000 ease-out group-hover:w-full"></div>
                  </div>
                )}

                <div className="relative z-10 flex h-full flex-col rounded-2xl border border-slate-700/50 bg-slate-900/50 p-8 backdrop-blur-md transition-all duration-300 group-hover:-translate-y-1 hover:border-blue-500/50 hover:bg-slate-800 hover:shadow-2xl hover:shadow-blue-900/20">
                  <div className="mb-6 text-5xl leading-tight font-black text-slate-800 transition-colors duration-500 group-hover:text-blue-500/20">{step.step}</div>
                  <h3 className="mb-3 text-2xl font-bold text-white group-hover:text-blue-400">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-400 group-hover:text-slate-300">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </CardSlider>
      </Section>

      {/* 7. INDUSTRIES & ROLES */}
      <Section id="industries" className="bg-white dark:bg-slate-950" noPadding containerClassName="py-24 md:py-32">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Solusi Spesifik Industri</h2>
          <p className="mt-2 text-slate-600">Kami tidak percaya pada solusi "Satu Ukuran untuk Semua".</p>
        </div>

        <CardSlider desktopClassName="md:grid md:grid-cols-2 lg:grid-cols-4 gap-6" mobileItemWidth="w-[85vw] sm:w-[350px]" className="mb-24">
          {industries.map((ind) => {
            const Icon = ind.icon;
            return (
              <Link key={ind.id} href={`/solutions/${ind.id}`} className="group block h-full">
                <SpotlightCard className="h-full rounded-3xl" spotlightColor="rgba(37, 99, 235, 0.1)">
                  <div className="flex h-full flex-col p-8">
                    <Stack direction="horizontal" gap={4} align="center" justify="center" className="mb-6 h-12 w-12 rounded-xl bg-slate-50 text-slate-600 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </Stack>
                    <h3 className="mb-3 text-xl font-bold text-slate-900 group-hover:text-blue-600">{ind.title}</h3>
                    <p className="mb-4 flex-grow text-sm leading-relaxed text-slate-600">{ind.description}</p>
                    <Stack direction="horizontal" gap={4} align="center" className="-translate-x-2 text-sm font-bold text-blue-600 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                      Explore
                      {' '}
                      <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                    </Stack>
                  </div>
                </SpotlightCard>
              </Link>
            );
          })}
        </CardSlider>

        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-slate-900">Didesain untuk Peran Anda</h2>
          <p className="mt-2 text-slate-600">Dashboard yang relevan untuk setiap pemangku kepentingan.</p>
        </div>

        <CardSlider desktopClassName="md:grid md:grid-cols-3 lg:grid-cols-5 gap-4" mobileItemWidth="w-[85vw] sm:w-[250px]">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <Link key={role.id} href={`/role/${role.id}`} className="group block h-full">
                <SpotlightCard className="h-full rounded-2xl text-center" spotlightColor="rgba(59, 130, 246, 0.1)">
                  <div className="flex h-full flex-col items-center p-6">
                    <Stack direction="horizontal" gap={4} align="center" justify="center" className="mx-auto mb-3 h-10 w-10 rounded-full bg-blue-50 text-blue-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </Stack>
                    <h3 className="mb-1 text-lg font-bold text-slate-900">{role.title}</h3>
                    <p className="text-xs text-slate-600">{role.subtitle}</p>
                  </div>
                </SpotlightCard>
              </Link>
            );
          })}
        </CardSlider>
      </Section>

      {/* 8. INFRASTRUCTURE & SECURITY */}
      <Section id="security" className="relative overflow-hidden border-t border-slate-800/50 !bg-slate-900" noPadding containerClassName="py-24 md:py-32">
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-900/10 blur-[120px]"></div>

        <Grid cols={1} mdCols={2} gap={12} className="relative z-10 mb-16 items-center">
          <div>
            <Badge variant="outline-white" className="mb-4">Reliability & Security</Badge>
            <h2 className="text-3xl leading-tight font-bold tracking-tight text-white md:text-4xl">Tenang, Data Anda Aman.</h2>
            <p className="mt-4 mb-8 text-lg leading-relaxed text-slate-300">
              Fokuslah mengembangkan bisnis, biarkan kami menjaga infrastruktur Anda. BizOps menjamin keamanan data setara standar perbankan.
            </p>

            <Stack direction="vertical" gap={6}>
              {[
                { title: 'Enkripsi End-to-End', desc: 'Data sensitif (gaji, profit) terenkripsi saat dikirim dan disimpan (AES-256).', icon: Lock },
                { title: '99.9% Uptime SLA', desc: 'Server kami selalu aktif. Redundansi otomatis mencegah downtime saat jam sibuk.', icon: CheckCircle2 },
                { title: 'Backup Otomatis Harian', desc: 'Data di-backup setiap hari ke lokasi terpisah. Restore data kapan saja dalam hitungan menit.', icon: PlayCircle },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="group flex gap-4">
                    <Stack direction="horizontal" gap={4} align="center" justify="center" className="h-12 w-12 flex-shrink-0 rounded-xl bg-slate-800/50 ring-1 ring-white/10 transition-all group-hover:ring-blue-500/50">
                      <Icon className="h-6 w-6 text-blue-400" aria-hidden="true" />
                    </Stack>
                    <div>
                      <h3 className="mb-1 text-lg font-bold text-white">{item.title}</h3>
                      <p className="text-sm leading-relaxed text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </Stack>
          </div>

          <div className="relative mt-8 md:mt-0">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-500/20 to-purple-500/20 blur-2xl"></div>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 p-8 backdrop-blur-xl">
              <Stack direction="horizontal" gap={4} align="center" justify="between" className="mb-8 border-b border-white/10 pb-6">
                <div>
                  <div className="mb-1 text-xs font-bold tracking-wider text-slate-400 uppercase">System Status</div>
                  <Stack direction="horizontal" gap={2} align="center">
                    <span className="relative flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
                    </span>
                    <span className="font-bold text-white">All Systems Operational</span>
                  </Stack>
                </div>
                <div className="text-right">
                  <div className="mb-1 text-xs font-bold tracking-wider text-slate-400 uppercase">Uptime (30 Hari)</div>
                  <div className="font-bold text-white">99.98%</div>
                </div>
              </Stack>

              <Stack direction="vertical" gap={4}>
                <Stack direction="horizontal" gap={4} justify="between" className="mb-4 text-xs text-slate-500">
                  <span>00:00</span>
                  <span>06:00</span>
                  <span>12:00</span>
                  <span>18:00</span>
                  <span>24:00</span>
                </Stack>
                <BarChart bars={40} animated={true} />
                <Stack direction="horizontal" gap={2} align="center" className="mt-4 rounded-lg bg-slate-800/50 p-3 text-xs text-slate-400">
                  <CheckCircle2 className="h-4 w-4 text-green-500" aria-hidden="true" />
                  <span>Backup terakhir berhasil: Hari ini, 03:00 WIB</span>
                </Stack>
              </Stack>
            </div>
          </div>
        </Grid>
      </Section>

      {/* 9. INTEGRATIONS */}
      <Section id="integrations" className="border-y border-slate-200 !bg-slate-50" noPadding containerClassName="py-24 md:py-32">
        <Container size="4xl" className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Terhubung dengan Ekosistem</h2>
          <p className="mt-2 text-slate-600">Open API kami memudahkan integrasi dengan bank, pajak, dan marketplace.</p>
        </Container>

        <div className="max-w-full overflow-hidden">
          <InfiniteScrollLoop speed={40} direction="right">
            {homeIntegrations.map((int, idx) => (
              <div key={idx} className="mx-2 flex cursor-default items-center gap-3 rounded-full border border-slate-200 bg-white px-6 py-3 whitespace-nowrap shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-lg">
                <div className="text-xs font-bold tracking-wider text-slate-400 uppercase" aria-hidden="true">{int.icon}</div>
                <div className="text-sm font-semibold text-slate-900">{int.name}</div>
              </div>
            ))}
          </InfiniteScrollLoop>
        </div>

        <div className="mt-12 text-center">
          <Link href="/platform/technologies/integration" className="inline-flex items-center gap-2 font-bold text-blue-600 transition-colors hover:text-blue-700">
            Lihat 50+ Integrasi Lainnya
            {' '}
            <ArrowUpRight className="ml-1 h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </Section>

      {/* 10. CTA / FOOTER PREVIEW */}
      <Section id="cta" className="relative overflow-hidden" noPadding containerClassName="py-24 md:py-32">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-900 to-slate-900"></div>
        <div className="pointer-events-none absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-blue-500/20 blur-[120px]"></div>
        <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-indigo-500/20 blur-[100px]"></div>

        <Container size="4xl" className="relative z-10 text-center">
          <h2 className="mb-6 text-4xl leading-tight font-extrabold text-white md:text-5xl">Siap Mengubah Cara Anda Bekerja?</h2>
          <p className="mb-10 text-xl text-blue-100">Bergabunglah dengan 500+ perusahaan yang telah beralih ke BizOps. Tanpa komitmen jangka panjang, batalkan kapan saja.</p>
          <Stack direction="vertical" gap={4} className="justify-center sm:flex-row">
            <Button asChild size="lg" variant="primary" className="h-16 w-full bg-white px-10 text-xl font-bold text-blue-700 shadow-2xl shadow-blue-900/20 hover:bg-blue-50 sm:w-auto">
              <Link href="/contact">Hubungi Sales</Link>
            </Button>
            <Button asChild variant="outline-white" size="lg" className="h-16 w-full px-10 text-xl transition-colors hover:bg-white/10 sm:w-auto">
              <Link href="/pricing/calculator">Lihat Harga</Link>
            </Button>
          </Stack>
          <p className="mt-6 block text-sm text-blue-200/60">14-day free trial available. No credit card required.</p>
        </Container>
      </Section>
    </>
  );
}
