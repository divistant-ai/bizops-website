import { motion } from 'framer-motion';
import { AlertTriangle, ChevronRight, Clock, Database, Download, Eye, FileCheck, Globe, Layers, Lock, RefreshCw, Server, Shield } from 'lucide-react';
import Link from 'next/link';
import { Section } from '@/components/layout';
import Container from '@/components/layout/Container';
import { CardSlider, Grid, Typography } from '@/components/ui';
import Button from '@/components/ui/Button';
import Stack from '@/components/ui/Stack';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';

export const metadata = genMeta({
  title: 'Trust Center | Security, Compliance & Privacy',
  description: 'Pusat transparansi keamanan BizOps. ISO 27001, Enkripsi AES-256, dan Kepatuhan GDPR/UU PDP.',
  url: '/trust',
});

export default function TrustPage() {
  return (
    <div className="bg-slate-50 font-sans transition-colors dark:bg-slate-950">
      {/* HERO SECTION */}
      <Section className="relative overflow-hidden bg-[#0B1120] pt-32 pb-24 text-white lg:pt-48 lg:pb-32">
        <div className="pointer-events-none absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="pointer-events-none absolute top-0 right-0 h-[800px] w-[800px] animate-pulse rounded-full bg-emerald-900/20 blur-[120px]"></div>
        <div className="pointer-events-none absolute bottom-0 left-0 h-[600px] w-[600px] rounded-full bg-blue-900/20 blur-[100px]"></div>

        <Container size="5xl" className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-800 bg-emerald-900/30 px-4 py-1.5 text-xs font-bold tracking-wider text-emerald-400 uppercase backdrop-blur-md"
          >
            <Shield className="h-3 w-3" />
            {' '}
            BizOps Trust Center
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="mb-8 text-4xl leading-[1.1] font-extrabold tracking-tight md:text-6xl lg:text-7xl"
          >
            Keamanan Data Anda Adalah
            {' '}
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Prioritas Absolut Kami.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mx-auto mb-12 max-w-3xl text-xl leading-relaxed font-light text-slate-300"
          >
            Kami membangun BizOps dengan filosofi "Security by Design". Transparansi penuh mengenai infrastruktur, enkripsi, dan kepatuhan regulasi kami ada di sini.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-col justify-center gap-4 sm:flex-row"
          >
            <Button size="lg" className="w-full border-none bg-emerald-600 font-bold text-white shadow-lg shadow-emerald-900/20 hover:bg-emerald-500 sm:w-auto">
              Download Security Whitepaper
              {' '}
              <Download className="ml-2 h-4 w-4" />
            </Button>
            <Link href="/security/report">
              <Button size="lg" variant="outline" className="w-full border-slate-700 text-white hover:bg-white/10 sm:w-auto">
                Laporkan Celah Keamanan
                {' '}
                <AlertTriangle className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </Container>
      </Section>

      {/* LIVE SYSTEM STATUS BAR */}
      <div className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <Container size="7xl" className="flex flex-col items-center justify-between gap-4 py-4 sm:flex-row">
          <div className="flex items-center gap-3">
            <div className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
            </div>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">All Systems Operational</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {' '}
              Uptime (30 Days): 99.99%
            </span>
            <span className="hidden items-center gap-1 sm:flex">
              <RefreshCw className="h-3 w-3" />
              {' '}
              Last Updated: Just now
            </span>
            <Link href="/status" className="text-emerald-600 hover:underline">View History →</Link>
          </div>
        </Container>
      </div>

      <Container size="7xl" className="space-y-32 py-24">

        {/* COMPLIANCE BADGES */}
        <section>
          <div className="mb-16 text-center">
            <Typography variant="h2" as="h2">Standar Kepatuhan Global</Typography>
            <Typography variant="body" className="text-slate-600 dark:text-slate-400">
              Kami diaudit secara berkala oleh pihak ketiga independen untuk memastikan standar keamanan tertinggi.
            </Typography>
          </div>

          <div className="md:hidden">
            <CardSlider mobileItemWidth="w-[60vw] sm:w-[250px]">
              <div className="group flex h-full flex-col items-center rounded-3xl border border-slate-200 bg-white p-8 text-center transition-all hover:border-emerald-500/50 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 transition-transform group-hover:scale-110 dark:bg-slate-800">
                  <Shield className="h-8 w-8 text-slate-700 transition-colors group-hover:text-emerald-500 dark:text-slate-300" />
                </div>
                <Typography variant="h3" as="h3" className="mb-2">ISO 27001</Typography>
                <Typography variant="body" className="mb-4 text-slate-500 dark:text-slate-400">Information Security Management</Typography>
                <span className="mt-auto inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold tracking-wide text-emerald-700 uppercase dark:bg-emerald-900/20 dark:text-emerald-400">
                  Certified
                </span>
              </div>

              <div className="group flex h-full flex-col items-center rounded-3xl border border-slate-200 bg-white p-8 text-center transition-all hover:border-blue-500/50 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 transition-transform group-hover:scale-110 dark:bg-slate-800">
                  <Globe className="h-8 w-8 text-slate-700 transition-colors group-hover:text-blue-500 dark:text-slate-300" />
                </div>
                <Typography variant="h3" as="h3" className="mb-2">GDPR & UU PDP</Typography>
                <Typography variant="body" className="mb-4 text-slate-500 dark:text-slate-400">Data Privacy Compliance</Typography>
                <span className="mt-auto inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-[10px] font-bold tracking-wide text-blue-700 uppercase dark:bg-blue-900/20 dark:text-blue-400">
                  Compliant
                </span>
              </div>

              <div className="group flex h-full flex-col items-center rounded-3xl border border-slate-200 bg-white p-8 text-center transition-all hover:border-red-500/50 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 transition-transform group-hover:scale-110 dark:bg-slate-800">
                  <FileCheck className="h-8 w-8 text-slate-700 transition-colors group-hover:text-red-500 dark:text-slate-300" />
                </div>
                <Typography variant="h3" as="h3" className="mb-2">PSE Kominfo</Typography>
                <Typography variant="body" className="mb-4 text-slate-500 dark:text-slate-400">Terdaftar Resmi</Typography>
                <span className="mt-auto inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-[10px] font-bold tracking-wide text-red-700 uppercase dark:bg-red-900/20 dark:text-red-400">
                  Registered
                </span>
              </div>
            </CardSlider>
          </div>

          <Grid cols={4} gap={8} className="hidden md:grid">
            <div className="group flex h-full flex-col items-center rounded-3xl border border-slate-200 bg-white p-8 text-center transition-all hover:border-emerald-500/50 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 transition-transform group-hover:scale-110 dark:bg-slate-800">
                <Shield className="h-8 w-8 text-slate-700 transition-colors group-hover:text-emerald-500 dark:text-slate-300" />
              </div>
              <Typography variant="h3" as="h3" className="mb-2">ISO 27001</Typography>
              <Typography variant="body" className="mb-4 text-slate-500 dark:text-slate-400">Information Security Management</Typography>
              <span className="mt-auto inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold tracking-wide text-emerald-700 uppercase dark:bg-emerald-900/20 dark:text-emerald-400">
                Certified
              </span>
            </div>

            <div className="group flex h-full flex-col items-center rounded-3xl border border-slate-200 bg-white p-8 text-center transition-all hover:border-blue-500/50 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 transition-transform group-hover:scale-110 dark:bg-slate-800">
                <Globe className="h-8 w-8 text-slate-700 transition-colors group-hover:text-blue-500 dark:text-slate-300" />
              </div>
              <Typography variant="h3" as="h3" className="mb-2">GDPR & UU PDP</Typography>
              <Typography variant="body" className="mb-4 text-slate-500 dark:text-slate-400">Data Privacy Compliance</Typography>
              <span className="mt-auto inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-[10px] font-bold tracking-wide text-blue-700 uppercase dark:bg-blue-900/20 dark:text-blue-400">
                Compliant
              </span>
            </div>

            <div className="group flex h-full flex-col items-center rounded-3xl border border-slate-200 bg-white p-8 text-center transition-all hover:border-red-500/50 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 transition-transform group-hover:scale-110 dark:bg-slate-800">
                <FileCheck className="h-8 w-8 text-slate-700 transition-colors group-hover:text-red-500 dark:text-slate-300" />
              </div>
              <Typography variant="h3" as="h3" className="mb-2">PSE Kominfo</Typography>
              <Typography variant="body" className="mb-4 text-slate-500 dark:text-slate-400">Terdaftar Resmi</Typography>
              <span className="mt-auto inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-[10px] font-bold tracking-wide text-red-700 uppercase dark:bg-red-900/20 dark:text-red-400">
                Registered
              </span>
            </div>

            <div className="group flex h-full flex-col items-center rounded-3xl border border-slate-200 bg-white p-8 text-center opacity-75 transition-all hover:border-purple-500/50 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800">
                <Lock className="h-8 w-8 text-slate-400" />
              </div>
              <Typography variant="h3" as="h3" className="mb-2">SOC 2 Type II</Typography>
              <Typography variant="body" className="mb-4 text-slate-500 dark:text-slate-400">Security Controls</Typography>
              <span className="mt-auto inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold tracking-wide text-slate-500 uppercase dark:bg-slate-800 dark:text-slate-400">
                In Progress
              </span>
            </div>
          </Grid>
        </section>

        {/* SECURITY ARCHITECTURE */}
        <section className="grid grid-cols-1 items-center gap-16 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold tracking-wider text-slate-600 uppercase dark:bg-slate-800 dark:text-slate-400">
              <Layers className="h-3 w-3" />
              {' '}
              Defense in Depth
            </div>
            <Typography variant="h2" as="h2" className="mb-6">Arsitektur Keamanan Berlapis</Typography>
            <Typography variant="body" className="mb-8 leading-relaxed text-slate-600 dark:text-slate-400">
              Kami tidak hanya mengandalkan satu kunci pintu. Data Anda dilindungi oleh berbagai lapisan keamanan mulai dari fisik, jaringan, aplikasi, hingga level data itu sendiri.
            </Typography>

            <div className="lg:hidden">
              <CardSlider mobileItemWidth="w-[85vw] sm:w-[400px]">
                <div className="flex gap-4 rounded-xl border border-transparent p-4 transition-colors hover:border-emerald-500/30">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30">
                    <Database className="h-5 w-5" />
                  </div>
                  <div>
                    <Typography variant="h3" as="h3" className="mb-2">Encryption at Rest & Transit</Typography>
                    <Typography variant="small" className="text-slate-600 dark:text-slate-400">
                      Semua data database dienkripsi menggunakan AES-256. Komunikasi data menggunakan TLS 1.3 terbaru.
                    </Typography>
                  </div>
                </div>
                <div className="flex gap-4 rounded-xl border border-transparent p-4 transition-colors hover:border-blue-500/30">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30">
                    <Server className="h-5 w-5" />
                  </div>
                  <div>
                    <Typography variant="h3" as="h3" className="mb-2">Infrastructure Isolation</Typography>
                    <Typography variant="small" className="text-slate-600 dark:text-slate-400">
                      Setiap tenant Enterprise berjalan di container terisolasi (Virtual Private Cloud). Data Anda tidak bercampur dengan klien lain.
                    </Typography>
                  </div>
                </div>
                <div className="flex gap-4 rounded-xl border border-transparent p-4 transition-colors hover:border-amber-500/30">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/30">
                    <Eye className="h-5 w-5" />
                  </div>
                  <div>
                    <Typography variant="h3" as="h3" className="mb-2">24/7 Threat Monitoring</Typography>
                    <Typography variant="small" className="text-slate-600 dark:text-slate-400">
                      Tim Security Operations Center (SOC) kami memantau anomali traffic dan upaya intrusi secara real-time.
                    </Typography>
                  </div>
                </div>
              </CardSlider>
            </div>

            <Stack direction="vertical" gap={6} className="hidden lg:block">
              <div className="flex gap-4 rounded-xl border border-transparent p-4 transition-colors hover:border-emerald-500/30">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30">
                  <Database className="h-5 w-5" />
                </div>
                <div>
                  <Typography variant="h3" as="h3" className="mb-2">Encryption at Rest & Transit</Typography>
                  <Typography variant="small" className="text-slate-600 dark:text-slate-400">
                    Semua data database dienkripsi menggunakan AES-256. Komunikasi data menggunakan TLS 1.3 terbaru.
                  </Typography>
                </div>
              </div>
              <div className="flex gap-4 rounded-xl border border-transparent p-4 transition-colors hover:border-blue-500/30">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30">
                  <Server className="h-5 w-5" />
                </div>
                <div>
                  <Typography variant="h3" as="h3" className="mb-2">Infrastructure Isolation</Typography>
                  <Typography variant="small" className="text-slate-600 dark:text-slate-400">
                    Setiap tenant Enterprise berjalan di container terisolasi (Virtual Private Cloud). Data Anda tidak bercampur dengan klien lain.
                  </Typography>
                </div>
              </div>
              <div className="flex gap-4 rounded-xl border border-transparent p-4 transition-colors hover:border-amber-500/30">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/30">
                  <Eye className="h-5 w-5" />
                </div>
                <div>
                  <Typography variant="h3" as="h3" className="mb-2">24/7 Threat Monitoring</Typography>
                  <Typography variant="small" className="text-slate-600 dark:text-slate-400">
                    Tim Security Operations Center (SOC) kami memantau anomali traffic dan upaya intrusi secara real-time.
                  </Typography>
                </div>
              </div>
            </Stack>
          </div>

          <Container noPadding className="relative w-full">
            <div className="relative aspect-square overflow-hidden rounded-[2.5rem] border border-slate-800 bg-slate-900 p-6 shadow-2xl sm:p-10">
              <div className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-emerald-500/20 blur-[80px]"></div>

              <Stack direction="vertical" gap={4} className="relative z-10 h-full justify-center">
                <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-700 bg-slate-800/80 p-4 backdrop-blur">
                  <div className="flex items-center gap-3 text-xs text-emerald-400">
                    <Globe className="h-4 w-4" />
                    {' '}
                    Cloudflare WAF
                  </div>
                  <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500"></div>
                </div>
                <div className="ml-4 flex items-center justify-between gap-4 rounded-xl border border-slate-700 bg-slate-800/80 p-4 backdrop-blur sm:ml-8">
                  <div className="flex items-center gap-3 text-xs text-blue-400">
                    <Server className="h-4 w-4" />
                    {' '}
                    Load Balancer
                  </div>
                  <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500"></div>
                </div>
                <div className="ml-8 flex items-center justify-between gap-4 rounded-xl border border-slate-700 bg-slate-800/80 p-4 backdrop-blur sm:ml-16">
                  <div className="flex items-center gap-3 text-xs text-purple-400">
                    <Lock className="h-4 w-4" />
                    {' '}
                    App Server (Pod)
                  </div>
                  <div className="h-2 w-2 animate-pulse rounded-full bg-purple-500"></div>
                </div>
                <div className="ml-12 flex items-center justify-between gap-4 rounded-xl border border-emerald-500/30 bg-emerald-900/50 p-4 shadow-[0_0_30px_rgba(16,185,129,0.2)] backdrop-blur sm:ml-24">
                  <div className="flex items-center gap-3 text-xs font-bold text-white">
                    <Database className="h-4 w-4" />
                    {' '}
                    Encrypted DB
                  </div>
                  <div className="flex gap-1">
                    <Lock className="h-3 w-3 text-emerald-400" />
                  </div>
                </div>
              </Stack>
            </div>
          </Container>
        </section>

        {/* TRANSPARENCY & DATA */}
        <section className="rounded-[3rem] border border-slate-200 bg-slate-50 p-8 py-16 md:p-16 md:py-24 dark:border-slate-800 dark:bg-slate-900">
          <Container noPadding size="4xl">
            <Typography variant="h2" as="h2" className="mb-6">Data Sub-processors</Typography>
            <Typography variant="body" className="mb-8 text-slate-600 dark:text-slate-400">
              Daftar penyedia layanan pihak ketiga yang kami gunakan untuk memproses data. Kami meminimalkan jumlah pihak ketiga untuk mengurangi risiko.
            </Typography>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] text-left text-sm">
                  <thead className="border-b border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900">
                    <tr>
                      <th className="p-4 font-bold text-slate-700 dark:text-slate-300">Provider</th>
                      <th className="p-4 font-bold text-slate-700 dark:text-slate-300">Purpose</th>
                      <th className="p-4 font-bold text-slate-700 dark:text-slate-300">Location</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    <tr>
                      <td className="p-4 font-medium text-slate-900 dark:text-white">Google Cloud Platform</td>
                      <td className="p-4 text-slate-600 dark:text-slate-400">Cloud Infrastructure (Compute & Storage)</td>
                      <td className="p-4 text-slate-600 dark:text-slate-400">Jakarta (asia-southeast2)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-slate-900 dark:text-white">Amazon Web Services (S3)</td>
                      <td className="p-4 text-slate-600 dark:text-slate-400">Encrypted Backup Storage</td>
                      <td className="p-4 text-slate-600 dark:text-slate-400">Singapore (ap-southeast-1)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-slate-900 dark:text-white">Cloudflare</td>
                      <td className="p-4 text-slate-600 dark:text-slate-400">WAF, DDoS Protection, CDN</td>
                      <td className="p-4 text-slate-600 dark:text-slate-400">Global (Anycast)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-slate-900 dark:text-white">Sentry</td>
                      <td className="p-4 text-slate-600 dark:text-slate-400">Error Tracking (No PII Data)</td>
                      <td className="p-4 text-slate-600 dark:text-slate-400">USA</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Container>
        </section>

        {/* CTA: ACCESS REPORTS */}
        <section className="py-16 text-center md:py-24">
          <Typography variant="h2" as="h2" className="mb-6">Butuh Dokumen Audit?</Typography>
          <Typography variant="body" className="mb-8 text-slate-600 dark:text-slate-400">
            Akses laporan audit keamanan lengkap kami (Penetration Test Result & Compliance Certifications) melalui portal khusus klien Enterprise.
          </Typography>
          <Button size="lg" className="px-8 font-bold">
            Request Access to Trust Portal
            {' '}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </section>

      </Container>
    </div>
  );
}
