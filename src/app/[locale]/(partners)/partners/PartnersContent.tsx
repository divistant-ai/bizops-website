'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Container, Section } from '@/components/layout';
import { Button, CardSlider } from '@/components/ui';
import { FadeIn } from '@/components/ui/FadeIn';
import { partnerContent } from '@/data/companyContent';

export default function PartnersContent() {
  const { shift, benefits, personas } = partnerContent;

  // Calculator State
  const [sellingPrice, setSellingPrice] = useState(2500000); // Harga Jual ke Klien (Monthly)
  const [partnerCost, setPartnerCost] = useState(2000000); // Biaya Dasar Partner (Monthly)
  const [setupFee, setSetupFee] = useState(15000000); // Biaya Implementasi Awal (One-time)
  const [activeClients, setActiveClients] = useState(5); // Jumlah Klien Saat Ini
  const [growthRate, setGrowthRate] = useState(1); // Penambahan Klien per Bulan

  // Derived Metrics
  const monthlyMarginPerClient = sellingPrice - partnerCost;
  const currentMonthlyProfit = monthlyMarginPerClient * activeClients;

  // Projections
  const [year1Profit, setYear1Profit] = useState(0);
  const [year2Profit, setYear2Profit] = useState(0);

  useEffect(() => {
    // Calculate Year 1
    let totalY1 = 0;
    let clients = activeClients;
    for (let i = 0; i < 12; i++) {
      clients += growthRate;
      const monthlyRec = clients * monthlyMarginPerClient;
      const monthlySetup = growthRate * setupFee;
      totalY1 += monthlyRec + monthlySetup;
    }
    setYear1Profit(totalY1);

    // Calculate Year 2 (continuing from end of Year 1)
    let totalY2 = 0;
    for (let i = 0; i < 12; i++) {
      clients += growthRate;
      const monthlyRec = clients * monthlyMarginPerClient;
      const monthlySetup = growthRate * setupFee;
      totalY2 += monthlyRec + monthlySetup;
    }
    setYear2Profit(totalY2);
  }, [sellingPrice, partnerCost, setupFee, activeClients, growthRate, monthlyMarginPerClient]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="min-h-screen bg-slate-50 transition-colors dark:bg-slate-950">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-[#0B1120] pt-32 pb-24 text-white lg:pt-48 lg:pb-32">
        <div className="pointer-events-none absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="pointer-events-none absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-blue-600/20 blur-[120px]"></div>
        <div className="bg-primary-900/30 pointer-events-none absolute bottom-0 left-0 h-[800px] w-[800px] rounded-full blur-[100px]"></div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold tracking-wider text-blue-400 uppercase"
              >
                <Users className="mr-2 h-3 w-3" />
                {' '}
                Partner Ecosystem
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-8 text-4xl leading-[1.1] font-extrabold tracking-tight md:text-5xl lg:text-6xl"
              >
                Scale Your Consulting Business
                {' '}
                <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">With BizOps.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-10 max-w-xl text-lg leading-relaxed font-light text-slate-300"
              >
                Fokus pada keahlian konsultasi dan implementasi Anda. Biarkan kami menyediakan teknologi ERP kelas dunia yang stabil, aman, dan mudah dikustomisasi.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col gap-4 sm:flex-row"
              >
                <Link href="/partners/apply">
                  <Button size="lg" className="h-14 w-full rounded-full border-none bg-white px-10 text-lg font-bold text-slate-900 shadow-xl transition-all hover:bg-slate-100 sm:w-auto">
                    Daftar Jadi Partner
                    {' '}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/partners/directory">
                  <Button size="lg" variant="outline" className="h-14 w-full border-slate-700 px-10 font-medium text-white hover:bg-white/10 sm:w-auto">
                    Cari Partner
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Revenue Preview Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-md"
            >
              <div className="mb-2 text-sm font-bold tracking-wider text-slate-400 uppercase">Potential Revenue</div>
              <div className="mb-6 text-4xl font-bold">
                {formatCurrency(currentMonthlyProfit)}
                <span className="text-lg font-normal text-slate-400">/bulan</span>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Active Clients:</span>
                  <span className="font-bold text-white">{activeClients}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Margin per Client:</span>
                  <span className="font-bold text-green-400">{formatCurrency(monthlyMarginPerClient)}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* THE SHIFT (Old vs New) */}
      <Section className="bg-white dark:bg-slate-900">
        <Container>
          <div className="grid gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-10 dark:border-slate-800 dark:bg-slate-950"
            >
              <h3 className="mb-2 text-2xl font-bold text-slate-500 dark:text-slate-400">{shift.old.title}</h3>
              <h4 className="mb-6 text-xl font-bold text-slate-900 dark:text-white">{shift.old.subtitle}</h4>
              <p className="leading-relaxed text-slate-600 dark:text-slate-400">{shift.old.desc}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl border border-indigo-200 bg-indigo-50 p-10 dark:border-indigo-900 dark:bg-indigo-900/20"
            >
              <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-indigo-200 blur-3xl dark:bg-indigo-800/50" />
              <h3 className="relative z-10 mb-2 text-2xl font-bold text-indigo-600 dark:text-indigo-400">{shift.new.title}</h3>
              <h4 className="relative z-10 mb-6 text-xl font-bold text-slate-900 dark:text-white">{shift.new.subtitle}</h4>
              <p className="relative z-10 leading-relaxed text-slate-700 dark:text-slate-300">{shift.new.desc}</p>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* REVENUE CALCULATOR */}
      <Section className="bg-slate-900 text-white dark:bg-slate-950">
        <Container size="6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Partner Revenue Calculator</h2>
            <p className="mx-auto max-w-2xl text-slate-400">
              Simulasikan potensi revenue Anda sebagai partner BizOps. Adjust parameter sesuai target bisnis Anda.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md md:p-12">
            <div className="grid gap-12 md:grid-cols-2">
              {/* Input Controls */}
              <div className="space-y-6">
                <h3 className="mb-6 text-xl font-bold">Input Parameters</h3>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-400">Harga Jual ke Klien (Monthly)</label>
                  <input
                    type="range"
                    min="2000000"
                    max="10000000"
                    step="500000"
                    value={sellingPrice}
                    onChange={e => setSellingPrice(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="mt-2 text-right text-2xl font-bold text-white">{formatCurrency(sellingPrice)}</div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-400">Biaya Partner (Monthly)</label>
                  <input
                    type="range"
                    min="1500000"
                    max="8000000"
                    step="500000"
                    value={partnerCost}
                    onChange={e => setPartnerCost(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="mt-2 text-right text-2xl font-bold text-white">{formatCurrency(partnerCost)}</div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-400">Setup Fee (One-time)</label>
                  <input
                    type="range"
                    min="5000000"
                    max="50000000"
                    step="5000000"
                    value={setupFee}
                    onChange={e => setSetupFee(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="mt-2 text-right text-2xl font-bold text-white">{formatCurrency(setupFee)}</div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-400">Active Clients</label>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    step="1"
                    value={activeClients}
                    onChange={e => setActiveClients(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="mt-2 text-right text-2xl font-bold text-white">
                    {activeClients}
                    {' '}
                    clients
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-400">Growth Rate (clients/month)</label>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="1"
                    value={growthRate}
                    onChange={e => setGrowthRate(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="mt-2 text-right text-2xl font-bold text-white">
                    +
                    {growthRate}
                    /month
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="space-y-6">
                <h3 className="mb-6 text-xl font-bold">Projected Revenue</h3>

                <div className="rounded-2xl border border-green-500/30 bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-6">
                  <div className="mb-2 text-sm font-medium text-green-400">Current Monthly Revenue</div>
                  <div className="text-4xl font-bold text-white">{formatCurrency(currentMonthlyProfit)}</div>
                  <div className="mt-2 text-xs text-slate-400">
                    From
                    {activeClients}
                    {' '}
                    active clients
                  </div>
                </div>

                <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 p-6">
                  <div className="mb-2 text-sm font-medium text-blue-400">Year 1 Total Revenue</div>
                  <div className="text-4xl font-bold text-white">{formatCurrency(year1Profit)}</div>
                  <div className="mt-2 text-xs text-slate-400">Recurring + Setup Fees</div>
                </div>

                <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6">
                  <div className="mb-2 text-sm font-medium text-purple-400">Year 2 Total Revenue</div>
                  <div className="text-4xl font-bold text-white">{formatCurrency(year2Profit)}</div>
                  <div className="mt-2 text-xs text-slate-400">Compounding growth effect</div>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-xs text-slate-400">
                  <strong className="text-white">Note:</strong>
                  {' '}
                  Kalkulasi ini adalah estimasi. Revenue aktual tergantung pada harga jual, retensi klien, dan effort sales Anda.
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* BENEFITS */}
      <Section className="bg-slate-50 dark:bg-slate-950">
        <Container>
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">Mengapa Bermitra?</h2>
            <p className="mx-auto max-w-2xl text-slate-600 dark:text-slate-400">
              Benefit yang Anda dapatkan sebagai partner resmi BizOps.
            </p>
          </div>

          {/* Mobile: CardSlider */}
          <div className="md:hidden">
            <CardSlider>
              {benefits.map((benefit, i) => {
                const Icon = benefit.icon;
                return (
                  <div key={i} className="w-[300px]">
                    <div className="h-full rounded-3xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
                      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-600 dark:text-indigo-400">
                        {Icon && <Icon className="h-6 w-6" />}
                      </div>
                      <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">{benefit.title}</h3>
                      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{benefit.desc}</p>
                    </div>
                  </div>
                );
              })}
            </CardSlider>
          </div>

          {/* Desktop: Grid */}
          <div className="hidden gap-8 md:grid md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="h-full rounded-3xl border border-slate-200 bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-600 dark:text-indigo-400">
                      {Icon && <Icon className="h-6 w-6" />}
                    </div>
                    <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">{benefit.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{benefit.desc}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* PERSONAS */}
      <Section className="border-y border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <Container size="5xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900 dark:text-white">Siapa yang Cocok?</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {personas.map((persona, i) => {
              return (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="h-full rounded-3xl border border-slate-200 bg-slate-50 p-8 dark:border-slate-800 dark:bg-slate-950">
                    <div className="bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 mb-6 flex h-14 w-14 items-center justify-center rounded-2xl">
                      <Users className="h-7 w-7" />
                    </div>
                    <h3 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">{persona.title}</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="mb-2 text-sm font-semibold text-slate-900 dark:text-white">Pain Point:</p>
                        <p className="mb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{persona.pain}</p>
                      </div>
                      <div>
                        <p className="mb-2 text-sm font-semibold text-slate-900 dark:text-white">Solution:</p>
                        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{persona.solution}</p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* CTA SECTION */}
      <Section className="bg-gradient-to-br from-indigo-900 to-blue-900 text-white">
        <Container size="4xl" className="text-center">
          <h2 className="mb-6 text-3xl font-extrabold tracking-tight md:text-5xl">
            Ready to Partner with Us?
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg font-light text-indigo-200">
            Bergabunglah dengan 100+ partner yang sudah mempercayai BizOps untuk melayani klien mereka.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/partners/apply">
              <Button size="lg" className="w-full bg-white text-indigo-900 hover:bg-slate-100 sm:w-auto">
                Apply as Partner
                {' '}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="w-full border-white/30 text-white hover:bg-white/10 sm:w-auto">
                Contact Partnership Team
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
}
