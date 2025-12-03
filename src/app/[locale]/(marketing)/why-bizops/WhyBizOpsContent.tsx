'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle,
  Code,
  Layers,
  Leaf,
  Shield,
  Smartphone,
  X,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { Container, Section } from '@/components/layout';
import { Button, CardSlider } from '@/components/ui';

const comparisonData = [
  { feature: 'Mobile Native (Offline-First)', bizops: true, legacy: false, saas: false },
  { feature: 'Customizable Workflow', bizops: true, legacy: true, saas: false },
  { feature: 'Fast Implementation (< 3 bulan)', bizops: true, legacy: false, saas: true },
  { feature: 'On-Premise Option', bizops: true, legacy: true, saas: false },
  { feature: 'Modern UX', bizops: true, legacy: false, saas: true },
  { feature: 'API-First Architecture', bizops: true, legacy: false, saas: true },
  { feature: 'Bahasa Indonesia Native', bizops: true, legacy: false, saas: true },
  { feature: 'Dedicated Support 24/7', bizops: true, legacy: true, saas: false },
];

const differentiators = [
  {
    icon: Smartphone,
    title: 'Mobile Native',
    desc: 'Aplikasi mobile yang bekerja offline-first. Sales, teknisi lapangan, dan supervisor bisa bekerja tanpa internet.',
    color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
  },
  {
    icon: Shield,
    title: 'Data Sovereignty',
    desc: 'Data Anda, server Anda. Pilih cloud kami atau deploy di infrastruktur sendiri. Full control.',
    color: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
  },
  {
    icon: Layers,
    title: 'Unified Layer',
    desc: 'Integrasikan sistem legacy (SAP, mesin absensi, Excel) atau gunakan sebagai ERP standalone. Fleksibel.',
    color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
  },
  {
    icon: Zap,
    title: 'Fast Implementation',
    desc: 'Go-live dalam 2-3 bulan, bukan 1-2 tahun. Metodologi proven dari 500+ implementasi.',
    color: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400',
  },
  {
    icon: Code,
    title: 'API-First',
    desc: 'Semua fitur tersedia via REST API. Integrasikan dengan sistem apapun: e-commerce, CRM, IoT devices.',
    color: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400',
  },
  {
    icon: Leaf,
    title: 'Built for Indonesia',
    desc: 'Compliance PPh 21 TER, e-Faktur, BPJS, dan regulasi lokal lainnya. Update otomatis setiap ada perubahan aturan.',
    color: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400',
  },
];

export default function WhyBizOpsContent() {

  return (
    <div className="flex flex-col bg-slate-50 transition-colors dark:bg-slate-950">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-[#0B1120] pt-32 pb-20 text-white lg:pt-48 lg:pb-32">
        <div className="pointer-events-none absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="bg-primary-600/20 animate-pulse-slow pointer-events-none absolute top-0 right-0 h-[800px] w-[800px] rounded-full blur-[120px]"></div>
        <div className="pointer-events-none absolute bottom-0 left-0 h-[600px] w-[600px] rounded-full bg-indigo-600/10 blur-[100px]"></div>

        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-primary-300 mb-8 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/50 px-4 py-1.5 text-xs font-bold tracking-wider uppercase backdrop-blur-md"
          >
            <Layers className="h-3 w-3" />
            {' '}
            The Unified Layer
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="mb-8 text-4xl leading-[1.1] font-extrabold tracking-tight md:text-6xl lg:text-7xl"
          >
            Modernisasi Operasional
            {' '}
            <br />
            <span className="from-primary-400 bg-gradient-to-r to-indigo-400 bg-clip-text text-transparent">Tanpa Merombak Segalanya.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mx-auto mb-12 max-w-3xl text-xl leading-relaxed font-light text-slate-300"
          >
            BizOps dirancang sebagai 'Unified Layer' yang menghubungkan sistem legacy Anda (SAP, Mesin Absensi, Excel) atau bisa berfungsi sebagai sistem ERP tunggal yang lengkap. Pilihan di tangan Anda.
          </motion.p>
        </div>
      </section>

      {/* THE SWEET SPOT (Visual Comparison) */}
      <section className="border-b border-slate-100 bg-white py-24 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-20 text-center">
            <h2 className="mb-6 text-3xl font-bold text-slate-900 md:text-4xl dark:text-white">The "Sweet Spot"</h2>
            <p className="mx-auto max-w-2xl text-slate-600 dark:text-slate-400">
              Mengapa bisnis Indonesia sering gagal implementasi ERP? Karena dipaksa memilih antara fleksibilitas atau kemudahan. Kami memberikan keduanya.
            </p>
          </div>

          <div className="flex flex-col items-center gap-16 lg:flex-row">
            {/* Quadrant Chart */}
            <div className="relative mx-auto aspect-square w-full max-w-[500px] rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-inner lg:w-1/2 dark:border-slate-700 dark:bg-slate-800/50">
              {/* Axes */}
              <div className="absolute top-8 bottom-8 left-1/2 w-px -translate-x-1/2 transform border-l border-dashed border-slate-400 bg-slate-300 dark:border-slate-500 dark:bg-slate-600"></div>
              <div className="absolute top-1/2 right-8 left-8 h-px -translate-y-1/2 transform border-t border-dashed border-slate-400 bg-slate-300 dark:border-slate-500 dark:bg-slate-600"></div>

              {/* Labels */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-slate-50 px-2 text-[10px] font-bold tracking-widest text-slate-500 uppercase dark:bg-slate-800 dark:text-slate-400">High Flexibility</div>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-slate-50 px-2 text-[10px] font-bold tracking-widest text-slate-500 uppercase dark:bg-slate-800 dark:text-slate-400">Low Flexibility</div>
              <div className="absolute top-1/2 left-0 origin-center -translate-y-1/2 -rotate-90 bg-slate-50 px-2 text-[10px] font-bold tracking-widest text-slate-500 uppercase dark:bg-slate-800 dark:text-slate-400">Hard to Use</div>
              <div className="absolute top-1/2 right-0 origin-center -translate-y-1/2 rotate-90 bg-slate-50 px-2 text-[10px] font-bold tracking-widest text-slate-500 uppercase dark:bg-slate-800 dark:text-slate-400">Easy to Use</div>

              {/* Competitors */}
              <div className="group absolute top-[25%] left-[25%] -translate-x-1/2 -translate-y-1/2 transform cursor-help text-center opacity-70">
                <div className="mx-auto mb-2 h-4 w-4 rounded-full bg-slate-400 transition-transform group-hover:scale-125"></div>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                  Legacy ERP
                  <br />
                  (SAP/Oracle)
                </span>
              </div>

              <div className="group absolute right-[25%] bottom-[25%] -translate-x-1/2 -translate-y-1/2 transform cursor-help text-center opacity-70">
                <div className="mx-auto mb-2 h-4 w-4 rounded-full bg-slate-400 transition-transform group-hover:scale-125"></div>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                  SaaS Lokal
                  <br />
                  (Accounting App)
                </span>
              </div>

              {/* BizOps Winner */}
              <div className="absolute top-[15%] right-[15%] z-10 -translate-x-1/2 -translate-y-1/2 transform text-center">
                <div className="relative">
                  <div className="bg-primary-500 absolute inset-0 animate-ping rounded-full opacity-20"></div>
                  <div className="from-primary-500 shadow-primary-500/30 mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br to-indigo-600 text-2xl font-bold text-white shadow-xl dark:border-slate-800">
                    B
                  </div>
                </div>
                <span className="text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-primary-900/30 border-primary-100 dark:border-primary-800 rounded-full border px-3 py-1 text-sm font-bold">BizOps</span>
              </div>
            </div>

            {/* Explanation */}
            <div className="w-full space-y-6 lg:w-1/2">
              <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-red-50 dark:bg-red-900/20">
                  <X className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h4 className="mb-2 font-bold text-slate-900 dark:text-white">Legacy ERP (SAP, Oracle)</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Powerful tapi kompleks. Butuh konsultan mahal, implementasi 1-2 tahun, dan training intensif.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-amber-50 dark:bg-amber-900/20">
                  <X className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h4 className="mb-2 font-bold text-slate-900 dark:text-white">SaaS Lokal (Accounting Apps)</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Mudah dipakai tapi terbatas. Tidak bisa customize, tidak cocok untuk bisnis kompleks.</p>
                </div>
              </div>

              <div className="from-primary-50 dark:from-primary-900/20 border-primary-200 dark:border-primary-800 flex items-start gap-4 rounded-2xl border bg-gradient-to-br to-indigo-50 p-6 shadow-lg dark:to-indigo-900/20">
                <div className="bg-primary-500 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="text-primary-900 dark:text-primary-100 mb-2 font-bold">BizOps (The Sweet Spot)</h4>
                  <p className="text-primary-800 dark:text-primary-200 text-sm">Fleksibel seperti SAP, mudah seperti SaaS. Best of both worlds.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KEY DIFFERENTIATORS */}
      <Section className="bg-slate-50 dark:bg-slate-950">
        <Container size="7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-3xl font-bold text-slate-900 md:text-4xl dark:text-white">Keunggulan Kompetitif</h2>
            <p className="mx-auto max-w-2xl text-slate-600 dark:text-slate-400">
              Fitur-fitur yang membedakan BizOps dari kompetitor.
            </p>
          </div>

          {/* Mobile: CardSlider */}
          <div className="md:hidden">
            <CardSlider>
              {differentiators.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="w-[300px]">
                    <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-lg transition-all hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
                      <div className={`h-14 w-14 rounded-xl ${item.color} mb-4 flex items-center justify-center`}>
                        <Icon className="h-7 w-7" />
                      </div>
                      <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">{item.title}</h3>
                      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </CardSlider>
          </div>

          {/* Desktop: Grid */}
          <div className="hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
            {differentiators.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group"
                >
                  <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
                    <div className={`h-14 w-14 rounded-xl ${item.color} mb-4 flex items-center justify-center transition-transform group-hover:scale-110`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* COMPARISON TABLE */}
      <Section className="border-y border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <Container size="6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-6 text-3xl font-bold text-slate-900 md:text-4xl dark:text-white">Feature Comparison</h2>
            <p className="text-slate-600 dark:text-slate-400">
              Bandingkan fitur BizOps dengan kompetitor secara objektif.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-200 dark:border-slate-700">
                  <th className="p-4 text-left font-bold text-slate-900 dark:text-white">Feature</th>
                  <th className="text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 p-4 text-center font-bold">BizOps</th>
                  <th className="p-4 text-center font-bold text-slate-600 dark:text-slate-400">Legacy ERP</th>
                  <th className="p-4 text-center font-bold text-slate-600 dark:text-slate-400">SaaS Lokal</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className="border-b border-slate-100 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50">
                    <td className="p-4 text-slate-700 dark:text-slate-300">{row.feature}</td>
                    <td className="bg-primary-50/50 dark:bg-primary-900/10 p-4 text-center">
                      {row.bizops
                        ? (
                            <CheckCircle className="mx-auto h-5 w-5 text-green-600 dark:text-green-400" />
                          )
                        : (
                            <X className="mx-auto h-5 w-5 text-slate-300 dark:text-slate-600" />
                          )}
                    </td>
                    <td className="p-4 text-center">
                      {row.legacy
                        ? (
                            <CheckCircle className="mx-auto h-5 w-5 text-green-600 dark:text-green-400" />
                          )
                        : (
                            <X className="mx-auto h-5 w-5 text-slate-300 dark:text-slate-600" />
                          )}
                    </td>
                    <td className="p-4 text-center">
                      {row.saas
                        ? (
                            <CheckCircle className="mx-auto h-5 w-5 text-green-600 dark:text-green-400" />
                          )
                        : (
                            <X className="mx-auto h-5 w-5 text-slate-300 dark:text-slate-600" />
                          )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* CTA SECTION */}
      <Section className="bg-slate-900 text-white dark:bg-slate-950">
        <Container size="4xl" className="text-center">
          <h2 className="mb-6 text-3xl font-extrabold tracking-tight md:text-5xl">
            Siap untuk Transformasi?
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg font-light text-slate-300">
            Lihat sendiri bagaimana BizOps bisa mengubah operasional bisnis Anda.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/demo">
              <Button size="lg" className="bg-primary-600 hover:bg-primary-700 w-full text-white sm:w-auto">
                Jadwalkan Demo
                {' '}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/compare">
              <Button size="lg" variant="outline" className="w-full border-slate-600 text-white hover:bg-white/10 sm:w-auto">
                Bandingkan Kompetitor
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
}
