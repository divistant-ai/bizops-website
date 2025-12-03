'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle,
  ChevronRight,
  Code,
  DollarSign,
  FileText,
  Minus,
  Play,
  Plus,
  Rocket,
  Server,
  ShieldCheck,
  TrendingUp,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Container, Section } from '@/components/layout';
import { Button, CardSlider } from '@/components/ui';

const perks = [
  {
    icon: DollarSign,
    title: 'Up to $5,000 Credits',
    desc: 'Kredit penggunaan BizOps Cloud selama 12 bulan pertama. Cukup untuk meng-cover biaya operasional tim hingga 50 orang tanpa membebani cashflow awal Anda.',
    color: 'bg-green-100 dark:bg-green-900/30 text-green-600',
  },
  {
    icon: Code,
    title: 'Technical Mentorship',
    desc: 'Akses langsung ("Red Phone") ke Solution Architect kami. Konsultasi desain sistem, integrasi API, dan security best practices agar produk Anda scalable sejak hari pertama.',
    color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600',
  },
  {
    icon: Users,
    title: 'Founder Community',
    desc: 'Bergabung dengan jaringan eksklusif founder. Dapatkan kesempatan co-marketing, akses ke event networking privat, dan pengenalan ke partner investor kami.',
    color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600',
  },
  {
    icon: Server,
    title: 'Priority Infrastructure',
    desc: 'Dedicated resources dan priority support 24/7. Tidak akan ada downtime saat Anda viral atau saat investor datang berkunjung.',
    color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600',
  },
  {
    icon: ShieldCheck,
    title: 'Compliance Ready',
    desc: 'Infrastruktur audit-ready sejak hari pertama. ISO 27001, GDPR compliant, dan siap untuk due diligence investor kapan saja.',
    color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600',
  },
  {
    icon: TrendingUp,
    title: 'Growth Resources',
    desc: 'Template pitch deck, financial model, dan akses ke library SOP operasional dari 500+ startup yang sudah berhasil scale.',
    color: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600',
  },
];

const eligibility = [
  'Startup yang sudah incorporated (PT/CV) di Indonesia',
  'Funding stage: Pre-seed hingga Series A',
  'Tim minimal 3 orang full-time',
  'Belum pernah menggunakan BizOps sebelumnya',
  'Produk/layanan sudah live atau dalam tahap MVP',
];

const faqs = [
  {
    q: 'Apakah ada biaya tersembunyi?',
    a: 'Tidak ada. Kredit yang diberikan adalah 100% gratis. Setelah kredit habis atau masa berlaku berakhir, Anda bisa memilih untuk melanjutkan dengan harga startup-friendly atau migrasi data keluar tanpa biaya.',
  },
  {
    q: 'Berapa lama proses approval?',
    a: 'Biasanya 2-3 hari kerja. Kami akan review aplikasi Anda dan melakukan quick call (15 menit) untuk memahami kebutuhan teknis Anda.',
  },
  {
    q: 'Apakah ada equity yang diambil?',
    a: 'Tidak sama sekali. Ini adalah program akselerasi murni, bukan investasi. Data Anda tetap milik Anda 100%.',
  },
  {
    q: 'Apa yang terjadi setelah 12 bulan?',
    a: 'Anda mendapat diskon 40% dari harga reguler selama 12 bulan berikutnya. Setelah itu, harga normal berlaku atau Anda bisa negosiasi kontrak enterprise jika sudah scale.',
  },
];

export default function StartupProgramContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="flex flex-col bg-slate-50 font-sans transition-colors selection:bg-purple-500/30 dark:bg-slate-950">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-[#0F172A] pt-32 pb-32 text-center text-white lg:pt-48 lg:pb-40">
        {/* Modern Grid Background */}
        <div className="pointer-events-none absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-[size:24px_24px]"></div>

        {/* Glow Effects */}
        <div className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-[1000px] -translate-x-1/2 rounded-full bg-purple-600/20 blur-[120px]"></div>

        <div className="relative z-10 mx-auto max-w-5xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-purple-700/50 bg-purple-900/30 px-3 py-1 text-xs font-bold tracking-wider text-purple-300 uppercase shadow-[0_0_15px_rgba(168,85,247,0.3)] backdrop-blur-md"
          >
            <Rocket className="h-3 w-3" />
            {' '}
            BizOps for Startups
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="mb-8 text-5xl leading-tight font-extrabold tracking-tight md:text-7xl lg:text-8xl"
          >
            Build Fast.
            {' '}
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">Scale Safe.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mx-auto mb-12 max-w-3xl text-xl leading-relaxed font-light text-slate-300 md:text-2xl"
          >
            Infrastruktur operasional
            {' '}
            <em>audit-ready</em>
            {' '}
            untuk startup ambisius. Hemat
            {' '}
            <em>burn rate</em>
            {' '}
            dengan kredit hingga $5,000 dan akses ke teknologi Enterprise sejak Day 1.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-col justify-center gap-4 sm:flex-row"
          >
            <Link href="/partners/apply">
              <Button size="lg" className="h-14 w-full transform border-none bg-white px-10 text-lg font-bold text-slate-900 shadow-xl transition-all hover:-translate-y-1 hover:bg-slate-100 hover:shadow-2xl hover:shadow-purple-500/20 sm:w-auto">
                Apply for Credits
                {' '}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-14 w-full border-slate-700 px-10 font-medium text-white hover:bg-white/10 sm:w-auto">
              <Play className="mr-2 h-4 w-4 fill-current" />
              {' '}
              Watch Founder Stories
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-sm font-medium text-slate-500"
          >
            Trusted by 500+ High-Growth Startups in Indonesia
          </motion.p>
        </div>
      </section>

      {/* LOGO WALL (Social Proof) */}
      <section className="border-b border-slate-800 bg-[#0F172A] pb-16">
        <div className="mx-auto max-w-7xl overflow-hidden px-4">
          <div className="flex flex-wrap justify-center gap-12 opacity-40 grayscale transition-opacity duration-500 hover:opacity-70">
            {/* Placeholder Logos */}
            <div className="text-xl font-bold text-white">ACME Corp</div>
            <div className="text-xl font-bold text-white">Nebula AI</div>
            <div className="text-xl font-bold text-white">Quantum Leap</div>
            <div className="text-xl font-bold text-white">HyperGrowth</div>
            <div className="hidden text-xl font-bold text-white md:block">Stark Industries</div>
          </div>
        </div>
      </section>

      {/* THE PERKS (Bento Grid Style) */}
      <section className="relative z-20 bg-slate-50 py-24 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-20 text-center">
            <h2 className="mb-6 text-3xl font-bold text-slate-900 md:text-4xl dark:text-white">More Than Just Free Credits</h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">Kami berinvestasi pada kesuksesan jangka panjang Anda dengan ekosistem pendukung yang lengkap.</p>
          </div>

          {/* Mobile: CardSlider */}
          <div className="md:hidden">
            <CardSlider mobileItemWidth="w-[85vw] sm:w-[350px]">
              {perks.map((perk, idx) => {
                const Icon = perk.icon;
                return (
                  <div key={idx} className="group flex h-full flex-col rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition-all hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
                    <div className={`h-14 w-14 ${perk.color} mb-8 flex items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">{perk.title}</h3>
                    <p className="flex-grow leading-relaxed text-slate-600 dark:text-slate-400">
                      {perk.desc}
                    </p>
                  </div>
                );
              })}
            </CardSlider>
          </div>

          {/* Desktop: Grid */}
          <div className="hidden gap-8 md:grid md:grid-cols-3">
            {perks.map((perk, idx) => {
              const Icon = perk.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group flex h-full flex-col rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition-all hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className={`h-14 w-14 ${perk.color} mb-8 flex items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">{perk.title}</h3>
                  <p className="flex-grow leading-relaxed text-slate-600 dark:text-slate-400">
                    {perk.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ELIGIBILITY CRITERIA */}
      <Section className="border-y border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <Container size="4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-6 text-3xl font-bold text-slate-900 md:text-4xl dark:text-white">Siapa yang Eligible?</h2>
            <p className="mx-auto max-w-2xl text-slate-600 dark:text-slate-400">
              Kami mencari startup yang serius untuk scale dan membutuhkan infrastruktur yang solid.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 md:p-12 dark:border-slate-800 dark:bg-slate-950">
            <div className="space-y-4">
              {eligibility.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <p className="leading-relaxed text-slate-700 dark:text-slate-300">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* HOW TO APPLY */}
      <Section className="bg-slate-50 dark:bg-slate-950">
        <Container size="6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-3xl font-bold text-slate-900 md:text-4xl dark:text-white">How to Apply</h2>
            <p className="mx-auto max-w-2xl text-slate-600 dark:text-slate-400">
              Proses aplikasi dirancang cepat dan tidak ribet. Kami respect waktu founder.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {[
              { step: '1', title: 'Submit Application', desc: 'Isi form singkat (5 menit) tentang startup Anda', icon: FileText },
              { step: '2', title: 'Quick Call', desc: '15 menit video call dengan tim kami', icon: Users },
              { step: '3', title: 'Approval', desc: 'Keputusan dalam 2-3 hari kerja', icon: CheckCircle },
              { step: '4', title: 'Onboarding', desc: 'Setup akun dan mulai build!', icon: Rocket },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative"
                >
                  <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                    <div className="absolute -top-4 -left-4 flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-lg font-bold text-white shadow-lg">
                      {item.step}
                    </div>
                    <div className="mt-2 mb-4">
                      <Icon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">{item.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
                  </div>
                  {idx < 3 && (
                    <div className="absolute top-1/2 -right-3 hidden -translate-y-1/2 transform md:block">
                      <ChevronRight className="h-6 w-6 text-slate-300 dark:text-slate-700" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link href="/partners/apply">
              <Button size="lg" className="bg-purple-600 text-white hover:bg-purple-700">
                Start Application
                {' '}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section className="border-y border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <Container size="4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-6 text-3xl font-bold text-slate-900 md:text-4xl dark:text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <span className="pr-4 font-bold text-slate-900 dark:text-white">{faq.q}</span>
                  {openFaq === idx
                    ? (
                        <Minus className="h-5 w-5 flex-shrink-0 text-purple-600 dark:text-purple-400" />
                      )
                    : (
                        <Plus className="h-5 w-5 flex-shrink-0 text-slate-400" />
                      )}
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 leading-relaxed text-slate-600 dark:text-slate-400">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* FINAL CTA */}
      <Section className="bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
        <Container size="4xl" className="text-center">
          <h2 className="mb-6 text-3xl font-extrabold tracking-tight md:text-5xl">
            Ready to Build the Future?
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg font-light text-purple-200">
            Join 500+ startups yang sudah percaya pada BizOps untuk menghandle operasional mereka.
          </p>
          <Link href="/partners/apply">
            <Button size="lg" className="bg-white font-bold text-purple-900 hover:bg-slate-100">
              Apply Now - It's Free
              {' '}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </Container>
      </Section>
    </div>
  );
}
