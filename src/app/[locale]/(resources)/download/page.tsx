'use client';

import { motion } from 'framer-motion';
import { Bell, Download, FileCode, Fingerprint, Layers, ShieldCheck, Smartphone, Star, WifiOff, Zap } from 'lucide-react';
import { Section } from '@/components/layout';
import Container from '@/components/layout/Container';
import { CardSlider, Grid, Typography } from '@/components/ui';
import Button from '@/components/ui/Button';
import Stack from '@/components/ui/Stack';

export default function DownloadPage() {
  return (
    <div className="bg-white transition-colors dark:bg-slate-950">
      {/* --- HERO SECTION --- */}
      <Section className="overflow-hidden pt-32 pb-20">
        <Container className="px-4 md:px-6 lg:px-8" size="7xl">
          <Grid cols={2} gap={12} className="items-center">

            {/* Left Content */}
            <div className="relative z-10">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold tracking-wider text-blue-600 uppercase dark:bg-blue-900/30 dark:text-blue-400">
                <Smartphone className="h-3 w-3" />
                {' '}
                BizOps Mobile v4.2
              </div>

              <Typography variant="h1" as="h1" className="leading-[1.1] font-extrabold tracking-tight text-slate-900 dark:text-white">
                Your entire business,
                {' '}
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">in your pocket.</span>
              </Typography>

              <Typography variant="body" className="text-slate-600 dark:text-slate-400">
                Jangan biarkan meja kerja membatasi produktivitas. Approve PO, cek stok gudang, dan pantau sales—kapan saja, di mana saja.
              </Typography>

              {/* Store Buttons */}
              <Stack direction="vertical" gap={4} className="mb-10">
                <a href="#" className="flex items-center gap-3 rounded-xl bg-slate-900 px-6 py-3.5 text-white shadow-xl transition-opacity hover:opacity-90 dark:bg-white dark:text-slate-900">
                  <svg className="h-8 w-8 fill-current" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.21-1.98 1.07-3.12-1.02.05-2.27.69-3.02 1.55-.67.78-1.26 2.03-1.11 3.17 1.14.09 2.3-.63 3.06-1.6z" />
                  </svg>
                  <div className="text-left leading-none">
                    <div className="mb-1 text-[10px] font-medium opacity-80">Download on the</div>
                    <div className="text-lg font-bold">App Store</div>
                  </div>
                </a>
                <a href="#" className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-100 px-6 py-3.5 text-slate-900 transition-colors hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700">
                  <svg className="h-7 w-7 fill-current" viewBox="0 0 24 24">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,25.88L5.03,24.86L16.81,13.08L16.81,15.12M21.83,12.79L18.12,16.42L14.7,13L21.83,12.79M16.81,8.88L5.03,1.96L6.05,0.94L16.81,11.7V8.88Z" transform="rotate(45 12 12)" />
                  </svg>
                  <div className="text-left leading-none">
                    <div className="mb-1 text-[10px] font-medium opacity-80">GET IT ON</div>
                    <div className="text-lg font-bold">Google Play</div>
                  </div>
                </a>
              </Stack>

              {/* QR Code & Enterprise */}
              <div className="flex items-center gap-6">
                <div className="hidden rounded-xl border border-slate-100 bg-white p-2 shadow-md sm:block">
                  <div className="flex h-20 w-20 items-center justify-center bg-slate-900 p-1 text-center text-[8px] leading-tight text-white">
                    SCAN TO
                    <br />
                    DOWNLOAD
                  </div>
                </div>
                <div className="hidden h-12 w-px bg-slate-200 sm:block dark:bg-slate-800"></div>
                <div>
                  <div className="mb-1 flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
                    <span className="ml-2 text-sm font-bold text-slate-900 dark:text-white">4.8</span>
                  </div>
                  <Typography variant="body" className="text-slate-500 dark:text-slate-400">Based on 1,200+ reviews from verified users.</Typography>
                </div>
              </div>
            </div>

            {/* Right Visual (Phone) */}
            <div className="relative">
              <div className="absolute top-10 right-10 h-72 w-72 animate-pulse rounded-full bg-blue-500/20 blur-[80px]"></div>
              <div className="absolute bottom-10 left-10 h-72 w-72 animate-pulse rounded-full bg-purple-500/20 blur-[80px]"></div>

              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 mx-auto max-w-[300px]"
              >
                <div className="rounded-[3rem] border-4 border-slate-800 bg-slate-900 p-3 shadow-2xl ring-1 ring-white/10">
                  <div className="relative h-[600px] overflow-hidden rounded-[2.5rem] bg-white dark:bg-slate-950">
                    {/* Status Bar */}
                    <div className="flex h-8 items-center justify-between bg-slate-900 px-6">
                      <span className="text-[10px] font-bold text-white">9:41</span>
                      <div className="flex gap-1">
                        <div className="h-3 w-3 rounded-full bg-white opacity-20"></div>
                        <div className="h-3 w-3 rounded-full bg-white"></div>
                      </div>
                    </div>

                    {/* App Header */}
                    <div className="relative z-10 rounded-b-[2rem] bg-slate-900 p-6 pb-8 text-white shadow-lg">
                      <div className="mb-6 flex items-center justify-between">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500"></div>
                        <Bell className="h-5 w-5 text-slate-300" />
                      </div>
                      <Typography variant="h2" as="h2">Good Morning,</Typography>
                      <Typography variant="body" className="text-slate-400">Site Manager - Jakarta</Typography>
                    </div>

                    {/* App Body */}
                    <Stack direction="vertical" gap={4} className="relative z-20 -mt-6 p-4">
                      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-lg dark:border-slate-800 dark:bg-slate-900">
                        <div className="mb-4 flex items-center justify-between">
                          <Typography variant="h3" as="h3">Today's Approval</Typography>
                          <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-bold text-red-600 dark:text-slate-300">3 Pending</span>
                        </div>
                        <div className="flex gap-3 overflow-x-auto pb-2">
                          {[1, 2, 3].map(i => (
                            <div key={i} className="h-10 w-10 flex-shrink-0 rounded-full border-2 border-white bg-slate-100 dark:border-slate-700 dark:bg-slate-800"></div>
                          ))}
                        </div>
                      </div>

                      <Grid cols={2} gap={4}>
                        {[
                          { icon: Layers, label: 'Stock', color: 'bg-blue-100 text-blue-600' },
                          { icon: Zap, label: 'Sales', color: 'bg-amber-100 text-amber-600' },
                          { icon: FileCode, label: 'Report', color: 'bg-purple-100 text-purple-600' },
                          { icon: ShieldCheck, label: 'Audit', color: 'bg-green-100 text-green-600' },
                        ].map((item, i) => (
                          <div key={i} className="flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl bg-slate-50 p-4 transition-colors hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800">
                            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.color}`}>
                              <item.icon className="h-5 w-5" />
                            </div>
                            <Typography variant="small" className="text-slate-700 dark:text-slate-300">{item.label}</Typography>
                          </div>
                        ))}
                      </Grid>
                    </Stack>

                    <div className="absolute right-6 bottom-6 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/30 transition-transform hover:scale-110">
                      <Download className="h-6 w-6" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </Grid>
        </Container>
      </Section>

      {/* --- FEATURES GRID --- */}
      <Section className="border-y border-slate-200 bg-slate-50 py-24 dark:border-slate-800 dark:bg-slate-900">
        <Container className="px-4 md:px-6 lg:px-8" size="7xl">
          <Container noPadding size="3xl" className="mb-16 text-center">
            <Typography variant="h2" as="h2">Built for the Field Workforce</Typography>
            <Typography variant="body" className="text-slate-600 dark:text-slate-400">
              Didesain khusus untuk Salesman, Kurir, Teknisi, dan Warehouse Staff yang bekerja di lapangan.
            </Typography>
          </Container>

          <div className="md:hidden">
            <CardSlider mobileItemWidth="w-[85vw] sm:w-[350px]">
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-8 transition-shadow hover:shadow-lg dark:border-slate-800 dark:bg-slate-950">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-900/30">
                  <WifiOff className="h-7 w-7" />
                </div>
                <Typography variant="h3" as="h3">Offline-First Mode</Typography>
                <Typography variant="small" className="text-slate-600 dark:text-slate-400">
                  Input order atau stock opname di gudang bawah tanah tanpa sinyal. Data tersimpan lokal dan auto-sync begitu kembali online.
                </Typography>
              </div>
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-8 transition-shadow hover:shadow-lg dark:border-slate-800 dark:bg-slate-950">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-900/30">
                  <Fingerprint className="h-7 w-7" />
                </div>
                <Typography variant="h3" as="h3">Biometric Security</Typography>
                <Typography variant="small" className="text-slate-600 dark:text-slate-400">
                  Login cepat dalam 0.5 detik menggunakan FaceID atau Fingerprint. Keamanan enterprise-grade tanpa ribet password.
                </Typography>
              </div>
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-8 transition-shadow hover:shadow-lg dark:border-slate-800 dark:bg-slate-950">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 dark:bg-purple-900/30">
                  <Bell className="h-7 w-7" />
                </div>
                <Typography variant="h3" as="h3">Instant Push Notif</Typography>
                <Typography variant="small" className="text-slate-600 dark:text-slate-400">
                  Jangan jadi bottleneck. Terima notifikasi Purchase Approval atau Low Stock Alert secara real-time dan action langsung.
                </Typography>
              </div>
            </CardSlider>
          </div>

          <Grid cols={3} gap={8} className="hidden md:grid">
            <div className="h-full rounded-2xl border border-slate-200 bg-white p-8 transition-shadow hover:shadow-lg dark:border-slate-800 dark:bg-slate-950">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-900/30">
                <WifiOff className="h-7 w-7" />
              </div>
              <Typography variant="h3" as="h3">Offline-First Mode</Typography>
              <Typography variant="small" className="text-slate-600 dark:text-slate-400">
                Input order atau stock opname di gudang bawah tanah tanpa sinyal. Data tersimpan lokal dan auto-sync begitu kembali online.
              </Typography>
            </div>
            <div className="h-full rounded-2xl border border-slate-200 bg-white p-8 transition-shadow hover:shadow-lg dark:border-slate-800 dark:bg-slate-950">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-900/30">
                <Fingerprint className="h-7 w-7" />
              </div>
              <Typography variant="h3" as="h3">Biometric Security</Typography>
              <Typography variant="small" className="text-slate-600 dark:text-slate-400">
                Login cepat dalam 0.5 detik menggunakan FaceID atau Fingerprint. Keamanan enterprise-grade tanpa ribet password.
              </Typography>
            </div>
            <div className="h-full rounded-2xl border border-slate-200 bg-white p-8 transition-shadow hover:shadow-lg dark:border-slate-800 dark:bg-slate-950">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 dark:bg-purple-900/30">
                <Bell className="h-7 w-7" />
              </div>
              <Typography variant="h3" as="h3">Instant Push Notif</Typography>
              <Typography variant="small" className="text-slate-600 dark:text-slate-400">
                Jangan jadi bottleneck. Terima notifikasi Purchase Approval atau Low Stock Alert secara real-time dan action langsung.
              </Typography>
            </div>
          </Grid>
        </Container>
      </Section>

      {/* --- ENTERPRISE SIDELOAD --- */}
      <Section className="dark relative overflow-hidden bg-slate-900 py-24 text-white">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
        <Container size="7xl" className="relative z-10 text-center">
          <Typography variant="h2" as="h2">Enterprise Deployment?</Typography>
          <Typography variant="body" className="text-slate-400">
            Untuk penggunaan di perangkat industri (Zebra, Honeywell) tanpa Google Mobile Services (GMS), atau deployment via MDM (Mobile Device Management) internal.
          </Typography>
          <Stack direction="vertical" gap={4} className="mt-8 justify-center">
            <Button size="md" variant="outline" className="border-slate-700 text-white hover:bg-slate-800">
              <FileCode className="mr-2 h-4 w-4" />
              {' '}
              Download APK (v4.2.1)
            </Button>
            <Button size="md" variant="outline" className="border-slate-700 text-white hover:bg-slate-800">
              <ShieldCheck className="mr-2 h-4 w-4" />
              {' '}
              MDM Config Guide
            </Button>
          </Stack>
        </Container>
      </Section>
    </div>
  );
}
