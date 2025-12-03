'use client';

import { motion } from 'framer-motion';
import { Check, Copy, Download, ExternalLink, FileText, Globe, Image as ImageIcon, Mail, Palette, Type, X } from 'lucide-react';
import { useState } from 'react';
import Container from '@/components/layout/Container';
import { CardSlider, Grid, Typography } from '@/components/ui';
import Button from '@/components/ui/Button';
import Stack from '@/components/ui/Stack';

const boilerplate = {
  short: 'BizOps adalah Business Operating System end-to-end yang membantu perusahaan Indonesia mendigitalisasi operasional dari hulu ke hilir. Menggabungkan kekuatan teknologi Enterprise berbasis Open Source dengan kepatuhan regulasi lokal, BizOps menawarkan solusi yang fleksibel, aman, dan berdaulat data di bawah naungan PT Divistant Teknologi Indonesia.',
  standard: 'BizOps, dikembangkan oleh PT Divistant Teknologi Indonesia, adalah platform \'Business Operating System\' yang dirancang untuk menjembatani kesenjangan antara software akuntansi lokal yang sederhana dan ERP global yang kompleks. Dengan filosofi \'Mobile-First\' dan \'Data Sovereignty\', BizOps menyediakan solusi terintegrasi untuk HR, Keuangan, Operasional Proyek, dan Rantai Pasok dalam satu ekosistem. BizOps memberdayakan perusahaan Indonesia untuk memiliki kendali penuh atas data mereka melalui opsi Self-Hosted, sambil tetap menikmati kemudahan penggunaan aplikasi mobile modern.',
};

export default function MediaKitContent() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    }
  };

  return (
    <div className="bg-slate-50 font-sans transition-colors duration-300 dark:bg-slate-950">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-[#0B1120] pt-32 pb-24 text-white lg:pt-48 lg:pb-32">
        <div className="pointer-events-none absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="pointer-events-none absolute top-0 right-0 h-[800px] w-[800px] rounded-full bg-indigo-600/20 blur-[120px]"></div>

        <Container size="5xl" className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/50 px-4 py-1.5 text-xs font-bold tracking-wider text-indigo-300 uppercase backdrop-blur-md"
          >
            <Download className="h-3 w-3" />
            {' '}
            Official Press Resources
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="mb-8 text-4xl leading-[1.1] font-extrabold tracking-tight md:text-6xl lg:text-7xl"
          >
            Ceritakan Kisah Kami
            {' '}
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-300 bg-clip-text text-transparent">Dengan Benar.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mx-auto mb-12 max-w-3xl text-xl leading-relaxed font-light text-slate-300"
          >
            Aset resmi, panduan merek, dan informasi perusahaan yang terkurasi untuk memudahkan rekan media, partner strategis, dan event organizer.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-col justify-center gap-4 sm:flex-row"
          >
            <Button size="lg" className="border-none bg-white font-bold text-slate-900 shadow-xl hover:bg-slate-100">
              Download All Assets (ZIP)
              {' '}
              <Download className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-slate-700 text-white hover:bg-white/10">
              Lihat Brand Guidelines
              {' '}
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </Container>
      </section>

      <Container size="7xl" className="space-y-32 py-24">

        {/* LOGO PACK */}
        <section>
          <div className="mb-10 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
              <ImageIcon className="h-6 w-6" />
            </div>
            <div>
              <Typography variant="h2" as="h2">Brand Assets (Logo)</Typography>
              <Typography variant="body" className="text-slate-500 dark:text-slate-400">Gunakan logo sesuai konteks background.</Typography>
            </div>
          </div>

          <Grid cols={2} gap={8}>
            {/* Primary Logo */}
            <motion.div
              whileHover={{ y: -5 }}
              className="flex flex-col rounded-3xl border border-slate-200 bg-white p-10 shadow-sm transition-all hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="bg-opacity-50 mb-10 flex min-h-[160px] w-full flex-grow items-center justify-center bg-[url('https://grainy-gradients.vercel.app/noise.svg')]">
                <div className="flex scale-150 transform items-center gap-3">
                  <div className="bg-primary-600 shadow-primary-500/30 flex h-10 w-10 items-center justify-center rounded-xl shadow-lg">
                    <div className="h-5 w-5 rotate-45 transform rounded-md bg-white"></div>
                  </div>
                  <Typography variant="body" className="text-3xl text-slate-900 dark:text-white">BizOps</Typography>
                </div>
              </div>
              <div className="w-full border-t border-slate-100 pt-6 dark:border-slate-800">
                <div className="mb-4 flex items-end justify-between">
                  <div>
                    <Typography variant="h3" as="h3">Primary Logo</Typography>
                    <Typography variant="small" className="text-slate-500 dark:text-slate-400">Gunakan pada background terang/putih.</Typography>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="h-8 text-xs">SVG</Button>
                    <Button size="sm" variant="outline" className="h-8 text-xs">PNG</Button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Inverse/Dark Logo */}
            <motion.div
              whileHover={{ y: -5 }}
              className="relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 p-10 shadow-sm transition-all hover:shadow-xl dark:border-slate-800"
            >
              <div className="absolute inset-0 bg-slate-800/50 mix-blend-overlay"></div>
              <div className="relative z-10 mb-10 flex min-h-[160px] w-full flex-grow items-center justify-center">
                <div className="flex scale-150 transform items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-lg">
                    <div className="h-5 w-5 rotate-45 transform rounded-md bg-slate-900"></div>
                  </div>
                  <Typography variant="body" className="text-3xl text-white">BizOps</Typography>
                </div>
              </div>
              <div className="relative z-10 w-full border-t border-slate-700/50 pt-6">
                <div className="mb-4 flex items-end justify-between">
                  <div>
                    <Typography variant="h3" as="h3">Monochrome (Inverse)</Typography>
                    <Typography variant="small" className="text-slate-400">Gunakan pada background gelap/foto.</Typography>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="h-8 border-slate-600 text-xs hover:bg-slate-800">SVG</Button>
                    <Button size="sm" variant="outline" className="h-8 border-slate-600 text-xs hover:bg-slate-800">PNG</Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </Grid>

          {/* Do's and Don'ts */}
          <Grid cols={4} gap={6} className="mt-8">
            <div className="flex flex-col items-center rounded-2xl border border-green-100 bg-green-50 p-6 text-center dark:border-green-900/30 dark:bg-green-900/10">
              <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-slate-300">
                <Check className="h-4 w-4" />
              </div>
              <Typography variant="body" className="dark:text-green-400">Gunakan Space yang Cukup</Typography>
            </div>
            <div className="flex flex-col items-center rounded-2xl border border-red-100 bg-red-50 p-6 text-center dark:border-red-900/30 dark:bg-red-900/10">
              <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900 dark:text-slate-300">
                <X className="h-4 w-4" />
              </div>
              <Typography variant="body" className="dark:text-red-400">Jangan Mengubah Proporsi</Typography>
            </div>
            <div className="flex flex-col items-center rounded-2xl border border-red-100 bg-red-50 p-6 text-center dark:border-red-900/30 dark:bg-red-900/10">
              <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900 dark:text-slate-300">
                <X className="h-4 w-4" />
              </div>
              <Typography variant="body" className="dark:text-red-400">Jangan Mengganti Warna</Typography>
            </div>
            <div className="flex flex-col items-center rounded-2xl border border-red-100 bg-red-50 p-6 text-center dark:border-red-900/30 dark:bg-red-900/10">
              <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900 dark:text-slate-300">
                <X className="h-4 w-4" />
              </div>
              <Typography variant="body" className="dark:text-red-400">Jangan Menambah Efek</Typography>
            </div>
          </Grid>
        </section>

        {/* COLOR PALETTE */}
        <section>
          <div className="mb-10 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <Palette className="h-6 w-6" />
            </div>
            <div>
              <Typography variant="h2" as="h2">Color System</Typography>
              <Typography variant="body" className="text-slate-500 dark:text-slate-400">Klik HEX code untuk menyalin.</Typography>
            </div>
          </div>

          <div className="md:hidden">
            <CardSlider mobileItemWidth="w-[85vw] sm:w-[350px]">
              <motion.div whileHover={{ y: -5 }} className="group h-full">
                <div className="bg-primary-600 group-hover:shadow-primary-500/30 mb-4 flex h-40 items-center justify-center rounded-3xl shadow-lg transition-shadow">
                  <span className="text-white/80 opacity-0 transition-opacity group-hover:opacity-100">Primary</span>
                </div>
                <div className="flex items-center justify-between px-2">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">Electric Blue</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Brand Primary</div>
                  </div>
                  <button
                    onClick={() => copyToClipboard('#2563EB', 'c1')}
                    className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1 text-xs text-slate-600 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                  >
                    {copied === 'c1' ? <Check className="h-3 w-3 text-green-500 dark:text-green-400" /> : <Copy className="h-3 w-3" />}
                    {copied !== 'c1' && '#2563EB'}
                  </button>
                </div>
              </motion.div>
            </CardSlider>
          </div>

          <Grid cols={4} gap={8} className="hidden md:grid">
            <motion.div whileHover={{ y: -5 }} className="group h-full">
              <div className="bg-primary-600 group-hover:shadow-primary-500/30 mb-4 flex h-40 items-center justify-center rounded-3xl shadow-lg transition-shadow">
                <span className="text-white/80 opacity-0 transition-opacity group-hover:opacity-100">Primary</span>
              </div>
              <div className="flex items-center justify-between px-2">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Electric Blue</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Brand Primary</div>
                </div>
                <button
                  onClick={() => copyToClipboard('#2563EB', 'c1')}
                  className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1 text-xs text-slate-600 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  {copied === 'c1' ? <Check className="h-3 w-3 text-green-500 dark:text-green-400" /> : <Copy className="h-3 w-3" />}
                  {copied !== 'c1' && '#2563EB'}
                </button>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="group h-full">
              <div className="mb-4 flex h-40 items-center justify-center rounded-3xl border border-slate-800 bg-slate-900 shadow-lg">
                <span className="text-white/80 opacity-0 transition-opacity group-hover:opacity-100">Neutral</span>
              </div>
              <div className="flex items-center justify-between px-2">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Deep Space</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Backgrounds / Text</div>
                </div>
                <button
                  onClick={() => copyToClipboard('#0F172A', 'c2')}
                  className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1 text-xs text-slate-600 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  {copied === 'c2' ? <Check className="h-3 w-3 text-green-500 dark:text-green-400" /> : <Copy className="h-3 w-3" />}
                  {copied !== 'c2' && '#0F172A'}
                </button>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="group h-full">
              <div className="mb-4 flex h-40 items-center justify-center rounded-3xl bg-emerald-500 shadow-lg transition-shadow group-hover:shadow-emerald-500/30">
                <span className="text-white/80 opacity-0 transition-opacity group-hover:opacity-100">Success</span>
              </div>
              <div className="flex items-center justify-between px-2">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Signal Green</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Positive Actions</div>
                </div>
                <button
                  onClick={() => copyToClipboard('#10B981', 'c3')}
                  className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1 text-xs text-slate-600 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  {copied === 'c3' ? <Check className="h-3 w-3 text-green-500 dark:text-green-400" /> : <Copy className="h-3 w-3" />}
                  {copied !== 'c3' && '#10B981'}
                </button>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="group h-full">
              <div className="mb-4 flex h-40 items-center justify-center rounded-3xl bg-amber-500 shadow-lg transition-shadow group-hover:shadow-amber-500/30">
                <span className="text-white/80 opacity-0 transition-opacity group-hover:opacity-100">Warning</span>
              </div>
              <div className="flex items-center justify-between px-2">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Safety Orange</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Alerts / Attention</div>
                </div>
                <button
                  onClick={() => copyToClipboard('#F59E0B', 'c4')}
                  className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1 text-xs text-slate-600 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  {copied === 'c4' ? <Check className="h-3 w-3 text-green-500 dark:text-green-400" /> : <Copy className="h-3 w-3" />}
                  {copied !== 'c4' && '#F59E0B'}
                </button>
              </div>
            </motion.div>
          </Grid>
        </section>

        {/* TYPOGRAPHY */}
        <section className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div>
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                <Type className="h-6 w-6" />
              </div>
              <div>
                <Typography variant="h2" as="h2">Typography</Typography>
                <Typography variant="body" className="text-slate-500 dark:text-slate-400">Plus Jakarta Sans (Google Fonts) untuk keterbacaan UI.</Typography>
              </div>
            </div>
            <Typography variant="body" className="leading-relaxed text-slate-600 dark:text-slate-400">
              BizOps menggunakan typeface
              <strong>Plus Jakarta Sans</strong>
              {' '}
              untuk seluruh materi komunikasi digital. Font ini dipilih karena karakteristiknya yang modern, netral, dan memiliki keterbacaan tinggi pada layar mobile maupun desktop.
            </Typography>
          </div>

          <div>
            <Stack direction="vertical" gap={6}>
              <div>
                <span className="text-6xl leading-tight font-extrabold tracking-tight text-slate-900 dark:text-white">Aa</span>
                <span className="ml-4 text-6xl leading-tight font-normal text-slate-900 dark:text-white">Aa</span>
              </div>
              <Grid cols={3} gap={4}>
                <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                  <div className="mb-1 text-2xl font-bold">Bold</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Headings</div>
                </div>
                <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                  <div className="mb-1 text-2xl font-medium">Medium</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Buttons / UI</div>
                </div>
                <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                  <div className="mb-1 text-2xl font-normal">Regular</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Body Text</div>
                </div>
              </Grid>
            </Stack>
          </div>

          <div className="relative lg:col-span-2">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-r from-purple-500/20 to-indigo-500/20 opacity-70 blur-xl"></div>
            <div className="relative rounded-[2rem] border border-slate-200 bg-white p-8 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
              <Stack direction="vertical" gap={4}>
                <Typography variant="h1" as="h1">The Quick Brown Fox</Typography>
                <Typography variant="h2" as="h2">Jumps Over The Lazy Dog</Typography>
                <Typography variant="h3" as="h3">1234567890</Typography>
                <Typography variant="body" className="leading-relaxed text-slate-600 dark:text-slate-400">BizOps adalah platform Business Operating System yang membantu perusahaan Indonesia mendigitalisasi operasional dari hulu ke hilir. Satu sistem terintegrasi untuk HR, Finance, Operations, Sales, dan Supply Chain.</Typography>
              </Stack>
            </div>
          </div>
        </section>

        {/* BOILERPLATE */}
        <section>
          <div className="mb-10 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <Typography variant="h2" as="h2">Company Boilerplate</Typography>
              <Typography variant="body" className="text-slate-500 dark:text-slate-400">Deskripsi perusahaan standar untuk press release.</Typography>
            </div>
          </div>

          <Grid cols={2} gap={8}>
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-6 flex items-center justify-between">
                <Typography variant="h3" as="h3" className="font-bold text-slate-900 dark:text-white">
                  Short Bio
                  <Typography variant="small" className="text-slate-500 dark:text-slate-400">~50 Words</Typography>
                </Typography>
                <button onClick={() => copyToClipboard(boilerplate.short, 'short')} className="text-primary-600 hover:text-primary-700 hover:bg-primary-50 dark:hover:bg-primary-900/20 flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-bold transition-colors">
                  {copied === 'short'
                    ? (
                        <>
                          <Check className="h-4 w-4" />
                          {' '}
                          Copied
                        </>
                      )
                    : (
                        <>
                          <Copy className="h-4 w-4" />
                          {' '}
                          Copy Text
                        </>
                      )}
                </button>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 text-sm leading-relaxed text-slate-700 italic dark:border-slate-700/50 dark:bg-slate-800/50 dark:text-slate-300">
                "
                {boilerplate.short}
                "
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-6 flex items-center justify-between">
                <Typography variant="h3" as="h3" className="font-bold text-slate-900 dark:text-white">
                  Standard Bio
                  <Typography variant="small" className="text-slate-500 dark:text-slate-400">~100 Words</Typography>
                </Typography>
                <button onClick={() => copyToClipboard(boilerplate.standard, 'standard')} className="text-primary-600 hover:text-primary-700 hover:bg-primary-50 dark:hover:bg-primary-900/20 flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-bold transition-colors">
                  {copied === 'standard'
                    ? (
                        <>
                          <Check className="h-4 w-4" />
                          {' '}
                          Copied
                        </>
                      )
                    : (
                        <>
                          <Copy className="h-4 w-4" />
                          {' '}
                          Copy Text
                        </>
                      )}
                </button>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 text-sm leading-relaxed text-slate-700 italic dark:border-slate-700/50 dark:bg-slate-800/50 dark:text-slate-300">
                "
                {boilerplate.standard}
                "
              </div>
            </div>
          </Grid>
        </section>

        {/* PRESS CONTACT */}
        <section className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 text-center md:rounded-[3rem] md:p-12 lg:text-left">
          <div className="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[100px]"></div>
          <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[100px]"></div>

          <Stack direction="vertical" gap={12} className="relative z-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <Typography variant="h2" as="h2">Media Inquiries</Typography>
              <Typography variant="body" className="leading-relaxed text-slate-300">Untuk permintaan wawancara, kutipan ahli, atau undangan sebagai pembicara, silakan hubungi tim komunikasi kami. Kami merespon dalam waktu 24 jam kerja.</Typography>
              <Stack direction="vertical" gap={4} className="mt-6">
                <a href="mailto:pr@divistant.com" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-slate-900 transition-colors hover:bg-slate-100">
                  <Mail className="h-4 w-4" />
                  {' '}
                  Hubungi PR Team
                </a>
                <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-transparent px-6 py-3 font-bold text-white transition-colors hover:bg-white/10">
                  WhatsApp
                </a>
              </Stack>
            </div>

            <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-md">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-indigo-400 bg-gradient-to-br from-indigo-400 to-purple-500 text-lg font-bold text-white">
                  SJ
                </div>
                <div>
                  <div className="text-lg font-bold text-white">Sarah Jenkins</div>
                  <div className="text-sm text-indigo-300">Head of Communications</div>
                </div>
              </div>
              <Stack direction="vertical" gap={3} className="text-sm text-slate-300">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-slate-400" />
                  {' '}
                  pr@divistant.com
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-slate-400" />
                  {' '}
                  Jakarta, Indonesia
                </div>
              </Stack>
            </div>
          </Stack>
        </section>

      </Container>
    </div>
  );
}
