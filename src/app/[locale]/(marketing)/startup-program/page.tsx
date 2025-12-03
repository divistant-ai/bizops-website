import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Code, DollarSign, Layout, Play, Rocket, ShieldCheck, TrendingUp, Users, Zap } from 'lucide-react';
import Link from 'next/link';
import Container from '@/components/layout/Container';
import { Grid, Typography } from '@/components/ui';
import Accordion from '@/components/ui/Accordion';
import Button from '@/components/ui/Button';

import Stack from '@/components/ui/Stack';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';

export const metadata = genMeta({
  title: 'Program BizOps for Startups | Diskon & Kredit Gratis',
  description: 'Program akselerasi eksklusif untuk startup. Dapatkan akses teknologi ERP kelas dunia dengan harga khusus agar Anda bisa fokus pada pertumbuhan.',
  url: '/startup-program',
});

export default function StartupProgramPage() {
  return (
    <div className="flex flex-col bg-slate-50 font-sans transition-colors dark:bg-slate-950">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-900 pt-32 pb-32 text-center text-white lg:pt-48 lg:pb-40">
        <div className="pointer-events-none absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-[size:24px_24px]"></div>
        <div className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-[1000px] -translate-x-1/2 rounded-full bg-purple-600/20 blur-[120px]"></div>

        <Container size="7xl" className="relative z-10">
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
              <Button size="lg" className="w-full transform border-none bg-white px-10 text-lg font-bold text-slate-900 shadow-xl transition-all hover:-translate-y-1 hover:bg-slate-100 hover:shadow-2xl hover:shadow-purple-500/20 sm:w-auto">
                Apply for Credits
                {' '}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full border-slate-700 px-10 font-medium text-white hover:bg-white/10 sm:w-auto">
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
        </Container>
      </section>

      {/* LOGO WALL */}
      <section className="border-b border-slate-800 bg-slate-900 pb-16">
        <Container size="7xl" className="overflow-hidden">
          <div className="flex flex-wrap justify-center gap-12 opacity-40 grayscale transition-opacity duration-500 hover:opacity-70">
            <div className="text-xl font-bold text-white">ACME Corp</div>
            <div className="text-xl font-bold text-white">Nebula AI</div>
            <div className="text-xl font-bold text-white">Quantum Leap</div>
            <div className="text-xl font-bold text-white">HyperGrowth</div>
            <div className="hidden text-xl font-bold text-white md:block">Stark Industries</div>
          </div>
        </Container>
      </section>

      {/* THE PERKS */}
      <section className="bg-slate-50 py-24 dark:bg-slate-950">
        <Container size="7xl">
          <div className="mb-20 text-center">
            <Typography variant="h2" as="h2">More Than Just Free Credits</Typography>
            <Typography variant="body" className="text-slate-600 dark:text-slate-400">Kami berinvestasi pada kesuksesan jangka panjang Anda dengan ekosistem pendukung yang lengkap.</Typography>
          </div>

          <Grid cols={3} gap={8}>
            <div className="group flex h-full flex-col rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition-all hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-600 transition-transform duration-300 group-hover:scale-110 dark:bg-green-900/30 dark:text-slate-300">
                <DollarSign className="h-7 w-7" />
              </div>
              <Typography variant="h3" as="h3">Up to $5,000 Credits</Typography>
              <Typography variant="body" className="leading-relaxed text-slate-600 dark:text-slate-400">Kredit penggunaan BizOps Cloud selama 12 bulan pertama. Cukup untuk meng-cover biaya operasional tim hingga 50 orang tanpa membebani cashflow awal Anda.</Typography>
            </div>

            <div className="group flex h-full flex-col rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition-all hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-purple-600 transition-transform duration-300 group-hover:scale-110 dark:bg-purple-900/30 dark:text-slate-300">
                <Code className="h-7 w-7" />
              </div>
              <Typography variant="h3" as="h3">Technical Mentorship</Typography>
              <Typography variant="body" className="leading-relaxed text-slate-600 dark:text-slate-400">Akses langsung ("Red Phone") ke Solution Architect kami. Konsultasi desain sistem, integrasi API, dan security best practices agar produk Anda scalable sejak hari pertama.</Typography>
            </div>

            <div className="group flex h-full flex-col rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition-all hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 transition-transform duration-300 group-hover:scale-110 dark:bg-blue-900/30 dark:text-slate-300">
                <Users className="h-7 w-7" />
              </div>
              <Typography variant="h3" as="h3">Founder Community</Typography>
              <Typography variant="body" className="leading-relaxed text-slate-600 dark:text-slate-400">Bergabung dengan jaringan eksklusif founder. Dapatkan kesempatan co-marketing, akses ke event networking privat, dan pengenalan ke partner investor kami.</Typography>
            </div>
          </Grid>
        </Container>
      </section>

      {/* WHY IT MATTERS */}
      <section className="border-y border-slate-100 bg-white py-32 dark:border-slate-800 dark:bg-slate-900">
        <Container size="7xl">
          <Grid cols={2} gap={12} className="items-center">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-xs font-bold tracking-wider text-red-700 uppercase dark:bg-red-900/30 dark:text-red-300">
                The Scaling Trap
              </div>
              <Typography variant="h2" as="h2" className="leading-tight font-bold text-slate-900 dark:text-white">
                Jangan Biarkan "Admin Chaos"
                <br />
                Membunuh Momentum.
              </Typography>
              <Typography variant="body" className="text-slate-600 dark:text-slate-400">Startup sering gagal bukan karena produknya, tapi karena operasional yang berantakan saat scaling. Spreadsheet yang tidak sinkron dan HR manual adalah "utang teknis" operasional yang berbahaya.</Typography>

              <Stack direction="vertical" gap={8} className="mt-8">
                <div className="flex gap-5">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    <Layout className="h-6 w-6" />
                  </div>
                  <div>
                    <Typography variant="h4" as="h4">Investor-Ready Reports</Typography>
                    <Typography variant="body" className="leading-relaxed text-slate-600 dark:text-slate-400">Laporan keuangan, Burn Rate, dan MRR real-time untuk due diligence investor. Tidak perlu begadang menyusun laporan manual setiap akhir bulan.</Typography>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <Typography variant="h4" as="h4">Enterprise-Grade Compliance</Typography>
                    <Typography variant="body" className="leading-relaxed text-slate-600 dark:text-slate-400">Siap untuk audit ISO 27001 dan GDPR tanpa perlu menyewa konsultan mahal. Amankan data pelanggan Anda dengan standar perbankan.</Typography>
                  </div>
                </div>
              </Stack>
            </div>

            <div className="relative">
              <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-purple-500/10 blur-[80px]"></div>
              <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-blue-500/10 blur-[80px]"></div>

              <div className="relative rotate-2 transform overflow-hidden rounded-[2.5rem] border border-slate-200 bg-slate-50 p-10 shadow-2xl backdrop-blur-xl transition-transform duration-500 hover:rotate-0 dark:border-slate-700 dark:bg-slate-800/80">
                <div className="mb-10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="rounded-full bg-slate-200 px-3 py-1 text-[10px] text-slate-500 dark:bg-slate-700 dark:text-slate-400">dashboard.bizops.id</div>
                </div>
                <Stack direction="vertical" gap={6}>
                  <Grid cols={2} gap={4}>
                    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                      <div className="mb-2 text-xs font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">Runway</div>
                      <div className="mb-1 text-3xl font-bold text-slate-900 dark:text-white">18 Mo</div>
                      <div className="flex items-center gap-1 text-xs font-bold text-green-500 dark:text-green-400">
                        <TrendingUp className="h-3 w-3" />
                        {' '}
                        Healthy
                      </div>
                    </div>
                    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                      <div className="mb-2 text-xs font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">Monthly Burn</div>
                      <div className="mb-1 text-3xl font-bold text-slate-900 dark:text-white">$12k</div>
                      <div className="w-fit rounded-full bg-green-50 px-2 py-0.5 text-xs font-bold text-green-500 dark:bg-green-900/30 dark:text-green-400">-5% vs Last Mo</div>
                    </div>
                  </Grid>

                  <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="mb-4 flex items-end justify-between">
                      <div className="text-sm font-bold text-slate-700 dark:text-slate-300">Revenue Growth (MRR)</div>
                      <div className="text-xs text-slate-400 dark:text-slate-300">Last 6 Months</div>
                    </div>
                    <div className="flex h-32 items-end justify-between gap-3">
                      {[30, 45, 40, 60, 55, 85, 70, 95].map((h, i) => (
                        <div key={i} className="group relative w-full overflow-hidden rounded-t-lg bg-slate-100 dark:bg-slate-800">
                          <div
                            className="absolute bottom-0 w-full rounded-t-lg bg-indigo-500 transition-all duration-700 ease-out group-hover:bg-indigo-400"
                            style={{ height: `${h}%` }}
                          >
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Stack>
              </div>
            </div>
          </Grid>
        </Container>
      </section>

      {/* TRACKS */}
      <section className="bg-slate-50 py-32 dark:bg-slate-950">
        <Container size="7xl">
          <div className="mb-20 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold tracking-wider text-blue-700 uppercase dark:bg-blue-900/30 dark:text-blue-300">
              Eligibility Criteria
            </div>
            <Typography variant="h2" as="h2">Choose Your Growth Track</Typography>
            <Typography variant="body" className="text-slate-600 dark:text-slate-400">Program kami disesuaikan dengan fase pertumbuhan startup Anda. Dari ide di garasi hingga ekspansi regional.</Typography>
          </div>

          <Grid cols={2} gap={10} className="mx-auto max-w-5xl">
            {/* Bootstrap Track */}
            <div className="group relative flex h-full flex-col overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white p-10 shadow-lg transition-all hover:border-blue-500/50 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900">
              <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-blue-500/5 blur-[80px] transition-colors group-hover:bg-blue-500/10"></div>

              <div className="mb-10 flex items-center gap-5">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-inner dark:bg-blue-900/30 dark:text-blue-400">
                  <Zap className="h-8 w-8" />
                </div>
                <div>
                  <Typography variant="h3" as="h3">Bootstrap</Typography>
                  <Typography variant="body" className="text-slate-500 dark:text-slate-400">Pre-Seed / Angel Round</Typography>
                </div>
              </div>

              <div className="mb-10 rounded-3xl border border-slate-100 bg-slate-50 p-8 dark:border-slate-700/50 dark:bg-slate-800/50">
                <div className="mb-2 flex items-baseline gap-2">
                  <span className="text-5xl leading-tight font-extrabold tracking-tight text-slate-900 dark:text-white">90%</span>
                  <span className="text-xl font-bold text-slate-500 uppercase dark:text-slate-400">OFF</span>
                </div>
                <Typography variant="body" className="text-slate-600 dark:text-slate-300">Selama 12 bulan pertama.</Typography>
              </div>

              <Stack direction="vertical" gap={5} className="mb-12 flex-grow">
                <div className="flex items-center gap-4">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
                    <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    Total Funding
                    <span className="font-bold text-slate-900 dark:text-white">&lt; $1M</span>
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
                    <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="font-medium text-slate-700 dark:text-slate-300">Usia &lt; 2 tahun</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
                    <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="font-medium text-slate-700 dark:text-slate-300">Produk/Website Aktif</span>
                </div>
              </Stack>

              <Link href="/partners/apply?track=bootstrap" className="mt-auto">
                <Button size="md" fullWidth variant="outline" className="h-14 rounded-2xl border-slate-200 text-lg font-bold text-slate-900 transition-all group-hover:border-blue-500/50 group-hover:text-blue-600 hover:bg-slate-50 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800">
                  Apply Bootstrap Track
                </Button>
              </Link>
            </div>

            {/* Scale-Up Track */}
            <div className="group relative flex h-full transform flex-col overflow-hidden rounded-[2.5rem] border border-slate-700 bg-slate-900 p-10 text-white shadow-2xl transition-all hover:border-purple-500 md:-translate-y-4">
              <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-purple-500/20 blur-[80px] transition-colors group-hover:bg-purple-500/30"></div>
              <div className="absolute top-0 left-8 rounded-b-xl bg-purple-500 px-4 py-1.5 text-xs font-bold text-white shadow-lg">MOST POPULAR</div>

              <div className="mt-4 mb-10 flex items-center gap-5">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-purple-500/30 bg-purple-500/20 text-purple-300 shadow-inner">
                  <TrendingUp className="h-8 w-8" />
                </div>
                <div>
                  <Typography variant="h3" as="h3">Scale-Up</Typography>
                  <Typography variant="body">Seed / Series A+</Typography>
                </div>
              </div>

              <div className="mb-10 rounded-3xl border border-slate-700 bg-slate-800/50 p-8">
                <div className="mb-2 flex items-baseline gap-2">
                  <span className="text-5xl leading-tight font-extrabold tracking-tight text-white">50%</span>
                  <span className="text-xl font-bold text-slate-400 uppercase">OFF</span>
                </div>
                <Typography variant="body" className="text-slate-300">Selama 24 bulan berturut-turut.</Typography>
              </div>

              <Stack direction="vertical" gap={5} className="mb-12 flex-grow">
                <div className="flex items-center gap-4">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-500/20">
                    <CheckCircle className="h-4 w-4 text-purple-400" />
                  </div>
                  <span className="font-medium text-slate-200">
                    Total Funding
                    <span className="font-bold text-white">&gt; $1M</span>
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-500/20">
                    <CheckCircle className="h-4 w-4 text-purple-400" />
                  </div>
                  <span className="font-medium text-slate-200">Priority Support (SLA 4 Jam)</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-500/20">
                    <CheckCircle className="h-4 w-4 text-purple-400" />
                  </div>
                  <span className="font-medium text-slate-200">Dedicated Success Manager</span>
                </div>
              </Stack>

              <Link href="/partners/apply?track=scaleup" className="mt-auto">
                <Button size="md" fullWidth className="h-14 rounded-2xl border-none bg-purple-600 text-lg font-bold shadow-lg shadow-purple-900/50 transition-all hover:scale-[1.02] hover:bg-purple-500">
                  Apply Scale-Up Track
                </Button>
              </Link>
            </div>
          </Grid>
        </Container>
      </section>

      {/* APPLICATION PROCESS */}
      <section className="border-t border-slate-100 bg-white py-24 dark:border-slate-800 dark:bg-slate-900">
        <Container size="7xl" className="text-center">
          <Typography variant="h2" as="h2">Proses Aplikasi Seamless</Typography>

          <Grid cols={4} gap={12} className="relative mt-16">
            <div className="absolute top-10 right-[12%] left-[12%] -z-10 hidden h-0.5 bg-slate-200 md:block dark:bg-slate-800"></div>

            <div className="group flex flex-col items-center">
              <div className="z-10 mb-8 flex h-20 w-20 items-center justify-center rounded-full border-4 border-slate-100 bg-white text-xl font-bold text-slate-400 transition-colors duration-500 group-hover:border-purple-500 group-hover:text-purple-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">1</div>
              <Typography variant="h3" as="h3">Submit Form</Typography>
              <Typography variant="small" className="text-slate-500 dark:text-slate-400">Isi formulir aplikasi online. Hanya butuh 5 menit.</Typography>
            </div>
            <div className="group flex flex-col items-center">
              <div className="z-10 mb-8 flex h-20 w-20 items-center justify-center rounded-full border-4 border-slate-100 bg-white text-xl font-bold text-slate-400 transition-colors delay-100 duration-500 group-hover:border-purple-500 group-hover:text-purple-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">2</div>
              <Typography variant="h3" as="h3">Verification</Typography>
              <Typography variant="small" className="text-slate-500 dark:text-slate-400">Tim kami memverifikasi profil startup Anda (LinkedIn/Pitch Deck).</Typography>
            </div>
            <div className="group flex flex-col items-center">
              <div className="z-10 mb-8 flex h-20 w-20 items-center justify-center rounded-full border-4 border-slate-100 bg-white text-xl font-bold text-slate-400 transition-colors delay-200 duration-500 group-hover:border-purple-500 group-hover:text-purple-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">3</div>
              <Typography variant="h3" as="h3">Approval</Typography>
              <Typography variant="small" className="text-slate-500 dark:text-slate-400">Terima email konfirmasi & kode promo dalam 48 jam.</Typography>
            </div>
            <div className="group flex flex-col items-center">
              <div className="z-10 mb-8 flex h-20 w-20 items-center justify-center rounded-full border-4 border-emerald-100 bg-emerald-50 text-xl font-bold text-emerald-600 shadow-lg shadow-emerald-500/20 dark:border-emerald-900/50 dark:bg-emerald-900/20 dark:text-emerald-400">
                <CheckCircle className="h-8 w-8" />
              </div>
              <Typography variant="h3" as="h3">Onboarding</Typography>
              <Typography variant="small" className="text-slate-500 dark:text-slate-400">Setup akun Enterprise Anda dan mulai scaling.</Typography>
            </div>
          </Grid>
        </Container>
      </section>

      {/* FAQ */}
      <section className="border-t border-slate-200 bg-slate-50 py-24 dark:border-slate-800 dark:bg-slate-950">
        <Container size="7xl">
          <Typography variant="h2" as="h2">Founder's FAQ</Typography>
          <Stack direction="vertical" gap={4} className="mt-8">
            {[
              { q: 'Apakah ada biaya tersembunyi?', a: 'Tidak ada. Diskon diberikan dimuka pada tagihan bulanan/tahunan. Setelah periode program berakhir (12 atau 24 bulan), tagihan akan kembali ke harga normal. Kami akan mengirimkan notifikasi 30 hari sebelumnya.' },
              { q: 'Bagaimana jika kami belum punya badan hukum?', a: 'Anda bisa mendaftar dengan nama tim sementara atau \'Stealth Mode\'. Namun, untuk aktivasi lisensi komersial dan faktur pajak, kami memerlukan dokumen legalitas (NIB/SK Kemenkumham) dalam waktu 3 bulan setelah onboarding.' },
              { q: 'Bisakah kami pindah ke Self-Hosted nanti?', a: 'Tentu saja. Salah satu keunggulan BizOps adalah Data Sovereignty. Jika startup Anda berkembang dan membutuhkan infrastruktur on-premise atau private cloud sendiri, kami menyediakan jalur migrasi data yang mulus.' },
              { q: 'Apakah ini termasuk support?', a: 'Ya. Paket startup mendapatkan akses Standard Support (Email & Chat) dengan SLA 24 jam. Untuk Scale-Up Track, Anda mendapatkan Prioritas Support dengan SLA 4 jam.' },
            ].map((item, idx) => (
              <Accordion key={idx} question={item.q} answer={item.a} />
            ))}
          </Stack>
        </Container>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-[#0B1120] py-40 text-center text-white">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-indigo-600/30 blur-[150px]"></div>

        <Container size="4xl" className="relative z-10">
          <Typography variant="h2" as="h2" className="leading-tight font-extrabold tracking-tight">
            Siap Membangun
            <br />
            Unicorn Berikutnya?
          </Typography>
          <Typography variant="body" className="text-slate-300">Fokus pada inovasi produk Anda, biarkan kami yang menangani infrastruktur operasional yang membosankan (tapi krusial).</Typography>
          <Stack direction="vertical" gap={6} className="mt-8 justify-center">
            <Link href="/partners/apply">
              <Button size="lg" className="w-full transform rounded-2xl border-none bg-white px-12 text-lg font-bold text-slate-900 shadow-2xl transition-all hover:-translate-y-1 hover:bg-slate-100 hover:shadow-white/20 sm:w-auto">
                Apply Now - It's Free
                {' '}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full rounded-2xl border-slate-700 px-10 text-lg text-white hover:bg-white/10 sm:w-auto">
              Talk to Founder Success
            </Button>
          </Stack>
        </Container>
      </section>

    </div>
  );
}
