'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertTriangle,
  ArrowRight,
  Calculator,
  CheckCircle2,
  Clock,
  DollarSign,
  Info,
  LayoutGrid,
  Lock,
  Settings,
  TrendingUp,
  Wrench,
  XCircle,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import Container from '@/components/layout/Container';
import { Grid, Typography } from '@/components/ui';
import Button from '@/components/ui/Button';
import Stack from '@/components/ui/Stack';
import { comparisonsData } from '@/data/comparisonData';
import { transformContent } from '@/libs/utils/transformContent';

export default function ComparisonsContent() {
  const [selectedId, setSelectedId] = useState<string>('manual');

  const selectedData = comparisonsData[selectedId]!;
  const isBizOps = selectedId === 'bizops';

  const getScoreColor = (score: number) => {
    if (score <= 20) {
      return 'text-emerald-500 dark:text-emerald-400';
    }
    if (score > 70) {
      return 'text-red-500 dark:text-red-400';
    }
    if (score > 50) {
      return 'text-amber-500 dark:text-amber-400';
    }
    return 'text-blue-500 dark:text-blue-400';
  };

  const getScoreBg = (score: number) => {
    if (score <= 20) {
      return 'bg-emerald-500';
    }
    if (score > 70) {
      return 'bg-red-500';
    }
    if (score > 50) {
      return 'bg-amber-500';
    }
    return 'bg-blue-500';
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 pt-24 pb-32 font-sans transition-colors duration-300 dark:bg-slate-950">
      <div className="pointer-events-none absolute top-0 left-0 z-0 h-full w-full overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] h-[50%] w-[50%] rounded-full bg-blue-500/10 mix-blend-multiply blur-[120px] dark:mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-10%] h-[50%] w-[50%] rounded-full bg-emerald-500/10 mix-blend-multiply blur-[120px] dark:mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      <Container size="7xl" className="relative z-10">

        {/* HEADER */}
        <Container noPadding size="3xl" className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-300/50 bg-slate-200/50 px-4 py-1.5 text-xs font-bold tracking-wider text-slate-600 uppercase backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-800/50 dark:text-slate-400"
          >
            <LayoutGrid className="h-4 w-4" />
            {' '}
            System Architecture Comparison
          </motion.div>
          <Typography variant="h1" as="h1" className="leading-tight font-extrabold tracking-tight text-slate-900 dark:text-white">
            Upgrade Your
            <br />
            {' '}
            Business Engine.
          </Typography>
          <Typography variant="body" className="leading-relaxed text-slate-600 dark:text-slate-400">
            Bandingkan arsitektur sistem Anda saat ini dengan
            <span className="font-semibold text-slate-900 dark:text-white">BizOps Evolution</span>
            . Lihat perbedaannya secara radikal.
          </Typography>
        </Container>

        <Grid cols={12} gap={8} className="items-start">

          {/* SIDEBAR SELECTION */}
          <Stack direction="vertical" gap={6} className="lg:sticky lg:top-28 lg:col-span-3">
            <div className="rounded-3xl border border-slate-200/60 bg-white/80 p-3 shadow-xl shadow-slate-200/20 backdrop-blur-md dark:border-slate-800/60 dark:bg-slate-900/80 dark:shadow-black/20">
              <div className="mb-1 px-4 py-3 text-xs font-bold tracking-widest text-slate-400 uppercase dark:text-slate-300">
                Select System
              </div>
              <Stack direction="vertical" gap={2} className="scrollbar-hide overflow-x-auto pb-2 lg:overflow-visible lg:pb-0">
                {Object.values(comparisonsData).map((item) => {
                  const icon = transformContent({ icon: item.icon }).icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedId(item.id)}
                      className={`group relative flex w-full min-w-[240px] items-center gap-4 overflow-hidden rounded-2xl p-4 text-left transition-all duration-300 lg:min-w-0 ${
                        selectedId === item.id
                          ? 'scale-[1.02] bg-slate-900 text-white shadow-lg dark:bg-white dark:text-slate-900'
                          : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                        selectedId === item.id ? 'bg-white/20 text-white dark:bg-slate-900/10 dark:text-slate-900' : 'bg-slate-200/50 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                      }`}
                      >
                        {icon}
                      </div>
                      <div>
                        <div className={`text-sm font-bold ${
                          selectedId === item.id ? 'text-white dark:text-slate-900' : 'text-slate-700 dark:text-slate-300'
                        }`}
                        >
                          {item.name}
                        </div>
                        {selectedId === item.id && (
                          <div className="mt-0.5 text-[10px] font-medium opacity-70">Viewing Details</div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </Stack>
            </div>

            {/* CTA Mini */}
            <div className="group relative hidden overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-center text-white shadow-lg shadow-blue-500/20 lg:block">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 h-32 w-32 rounded-full bg-white/10 blur-2xl transition-all group-hover:bg-white/20"></div>
              <div className="relative z-10">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/20 backdrop-blur-sm">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
                <Typography variant="h3" as="h3">Hitung Kerugian</Typography>
                <Typography variant="body" className="leading-relaxed">Lihat berapa banyak biaya yang terbuang karena inefisiensi sistem lama.</Typography>
                <Link href="/tools/roi-calculator">
                  <Button
                    size="sm"
                    fullWidth
                    className="mt-4 border-none bg-white font-bold text-blue-700 hover:bg-blue-50"
                  >
                    Buka Kalkulator ROI
                  </Button>
                </Link>
              </div>
            </div>
          </Stack>

          {/* MAIN CONTENT AREA */}
          <div className="lg:col-span-9">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedId}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="space-y-8"
              >
                {/* 1. HERO ANALYSIS CARD */}
                <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-2xl md:p-12 dark:border-slate-800 dark:bg-slate-900">
                  <div className={`pointer-events-none absolute top-0 right-0 -mt-32 -mr-32 h-[500px] w-[500px] rounded-full opacity-20 blur-[120px] ${getScoreBg(selectedData!.bottleneckScore)}`}></div>

                  <div className="relative z-10">
                    <Stack direction="vertical" gap={10} className="mb-12 items-start">
                      <div className="flex-1">
                        <div className="mb-6 flex items-center gap-3">
                          <span className={`rounded-full border px-4 py-1.5 text-[10px] font-bold tracking-wider uppercase backdrop-blur-sm ${
                            selectedData!.bottleneckScore <= 20
                              ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                              : selectedData!.bottleneckScore > 70
                                ? 'border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400'
                                : 'border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400'
                          }`}
                          >
                            {selectedData!.bottleneckLabel}
                          </span>
                        </div>
                        <Typography variant="h2" as="h2" className="leading-tight font-extrabold text-slate-900 dark:text-white">
                          "
                          {selectedData!.verdict}
                          "
                        </Typography>
                        <Typography variant="body" className="leading-relaxed text-slate-600 dark:text-slate-400">{selectedData!.description}</Typography>
                      </div>

                      {/* Score Meter */}
                      <div className="mx-auto flex-shrink-0 rounded-3xl border border-slate-100 bg-slate-50 p-6 backdrop-blur-sm md:mx-0 dark:border-slate-700 dark:bg-slate-800/50">
                        <div className="relative flex h-40 w-40 items-center justify-center">
                          <svg className="h-full w-full -rotate-90 transform drop-shadow-lg">
                            <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-200 dark:text-slate-700" />
                            <circle
                              cx="80"
                              cy="80"
                              r="70"
                              stroke="currentColor"
                              strokeWidth="12"
                              fill="transparent"
                              className={`${getScoreColor(selectedData!.bottleneckScore)} transition-all duration-1000 ease-out`}
                              strokeDasharray={440}
                              strokeDashoffset={440 - (440 * selectedData!.bottleneckScore) / 100}
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <div className="text-4xl leading-tight font-extrabold text-slate-900 dark:text-white">{selectedData!.bottleneckScore}</div>
                            <div className="mt-1 text-[10px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">Bottleneck</div>
                          </div>
                        </div>
                      </div>
                    </Stack>

                    {/* 2. STRATEGIC METRICS GRID */}
                    <Grid cols={5} gap={4} className="border-t border-slate-100 pt-10 dark:border-slate-800">
                      {[
                        { icon: Clock, label: 'Time to Value', value: selectedData!.ttv },
                        { icon: DollarSign, label: '3-Year TCO', value: selectedData!.avgTCO },
                        { icon: Wrench, label: 'Maintenance', value: selectedData!.maintenance },
                        { icon: Settings, label: 'Flexibility', value: selectedData!.customizability },
                        { icon: Lock, label: 'Security', value: selectedData!.securityLevel },
                      ].map((metric, idx) => (
                        <div key={idx} className="group rounded-2xl border border-transparent bg-slate-50 p-4 transition-colors hover:border-slate-200 hover:bg-white dark:bg-slate-800/50 dark:hover:border-slate-700 dark:hover:bg-slate-800">
                          <div className="group-hover:text-primary-500 mb-2 flex items-center gap-2 text-xs font-bold text-slate-400 uppercase transition-colors dark:text-slate-300">
                            <metric.icon className="h-3.5 w-3.5" />
                            {' '}
                            {metric.label}
                          </div>
                          <div className="text-sm font-bold text-slate-900 dark:text-white">{metric.value}</div>
                        </div>
                      ))}
                    </Grid>
                  </div>
                </div>

                {/* 3. COMPARISON LIST (WIDE STACKED) */}
                <Stack direction="vertical" gap={6}>
                  <div className="flex items-center justify-between px-2">
                    <Typography variant="h3" as="h3" className="font-bold text-slate-900 dark:text-white">
                      <LayoutGrid className="text-primary-500 inline h-5 w-5" />
                      {' '}
                      Detail Perbandingan
                    </Typography>
                  </div>

                  {selectedData!.points.map((point, idx) => (
                    <div key={idx} className="hover:border-primary-500/20 group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 transition-all duration-300 hover:shadow-xl md:p-8 dark:border-slate-800 dark:bg-slate-900">
                      <Grid cols={12} gap={8} className="relative z-10 items-center">

                        {/* Col 1: Feature & Limit */}
                        <Stack direction="vertical" gap={4} className="md:col-span-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-sm font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                              {idx + 1}
                            </div>
                            <Typography variant="h4" as="h4" className="font-bold text-slate-900 dark:text-white">{point.feature}</Typography>
                          </div>

                          <div className={`rounded-xl border p-4 ${isBizOps ? 'border-blue-100 bg-blue-50 dark:border-blue-900/20 dark:bg-blue-900/10' : 'border-red-100 bg-red-50 dark:border-red-900/20 dark:bg-red-900/10'}`}>
                            <div className={`mb-1 flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase ${isBizOps ? 'text-blue-500' : 'text-red-500 dark:text-red-400'}`}>
                              {isBizOps ? <Info className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                              {isBizOps ? 'Standard Capability' : 'Current Limit'}
                            </div>
                            <Typography variant="small" className="leading-relaxed text-slate-700 dark:text-slate-300">{point.them}</Typography>
                          </div>
                        </Stack>

                        {/* Arrow */}
                        <div className="hidden justify-center md:col-span-1 md:flex">
                          <ArrowRight className="h-6 w-6 text-slate-300 dark:text-slate-700" />
                        </div>

                        {/* Col 2: BizOps Solution */}
                        <Grid cols={2} gap={6} className="md:col-span-7">
                          <div className="relative rounded-xl border border-emerald-100 bg-emerald-50 p-5 dark:border-emerald-900/20 dark:bg-emerald-900/10">
                            <div className="mb-1 flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-emerald-600 uppercase dark:text-emerald-400">
                              <CheckCircle2 className="h-3 w-3" />
                              {' '}
                              {isBizOps ? 'BizOps Advantage' : 'BizOps Solution'}
                            </div>
                            <Typography variant="body" className="leading-relaxed text-slate-900 dark:text-white">{point.us}</Typography>
                          </div>

                          <div className="flex flex-col justify-center border-l border-slate-100 pl-4 dark:border-slate-800">
                            <div className="flex items-start gap-2">
                              <div className="mt-0.5">
                                <TrendingUp className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                              </div>
                              <div>
                                <div className="mb-1 text-[10px] font-bold tracking-wider text-slate-400 uppercase dark:text-slate-300">Business Impact</div>
                                <Typography variant="small" className="leading-relaxed text-slate-600 dark:text-slate-400">
                                  "
                                  {point.impact}
                                  "
                                </Typography>
                              </div>
                            </div>
                          </div>
                        </Grid>

                      </Grid>
                    </div>
                  ))}
                </Stack>

                {/* 4. WHY UPGRADE CARD (Hide for BizOps) */}
                {!isBizOps && (
                  <div className="relative mt-12 overflow-hidden rounded-[2.5rem] bg-slate-900 p-8 text-white shadow-2xl md:p-12">
                    <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-emerald-500/20 blur-[100px]"></div>

                    <Grid cols={2} gap={12} className="relative z-10 items-center">
                      <div>
                        <Typography variant="h3" as="h3" className="font-bold">
                          <AlertTriangle className="mr-2 inline h-6 w-6 text-amber-500" />
                          {' '}
                          Why Upgrade Now?
                        </Typography>
                        <Typography variant="body" className="leading-relaxed text-slate-400">Sistem lama Anda memiliki keterbatasan yang menahan laju pertumbuhan. Lihat daftar di samping untuk mengetahui apa yang menghambat Anda saat ini.</Typography>
                        <Link href="/tools/roi-calculator">
                          <Button
                            className="mt-4 border-none bg-white font-bold text-slate-900 shadow-lg shadow-white/10 hover:bg-slate-200"
                            size="lg"
                          >
                            <Calculator className="mr-2 h-4 w-4" />
                            {' '}
                            Hitung Nominal Kerugian
                          </Button>
                        </Link>
                      </div>

                      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                        <div className="mb-6 text-xs font-bold tracking-widest text-slate-500 uppercase">Identified Bottlenecks</div>
                        <ul className="space-y-4">
                          {selectedData!.limitations.map((lim, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-slate-200">
                              <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-500/20">
                                <XCircle className="h-4 w-4 text-red-400" />
                              </div>
                              <span className="leading-relaxed font-medium">{lim}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Grid>
                  </div>
                )}

                {/* MOBILE CTA */}
                <div className="mt-8 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-center text-white shadow-xl lg:hidden">
                  <Typography variant="h3" as="h3">Hitung ROI Upgrade</Typography>
                  <Typography variant="small">Lihat berapa banyak biaya yang bisa dihemat.</Typography>
                  <Link href="/tools/roi-calculator">
                    <Button size="md" fullWidth className="mt-4 border-none bg-white font-bold text-blue-700 hover:bg-blue-50">
                      Buka Kalkulator ROI
                    </Button>
                  </Link>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </Grid>

      </Container>
    </div>
  );
}
