'use client';

import type { SlideData } from '@/components/presentation/SlideDeck';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Briefcase,
  CheckCircle2,
  Code,
  Factory,
  Globe,
  Layers,
  Puzzle,
  Shield,
  TrendingUp,
  Users,
  Wallet,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import SlideDeck from '@/components/presentation/SlideDeck';
import { Badge, Button, Stack } from '@/components/ui';

// --- ANIMATION HELPERS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'spring' as const, stiffness: 100, damping: 20 } 
  },
};

const AnimatedSlide = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    className={`relative z-10 flex h-full w-full flex-col items-center justify-center ${className}`}
  >
    {children}
  </motion.div>
);

const MotionItem = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <motion.div variants={itemVariants} className={className}>{children}</motion.div>
);

// --- COMPONENTS ---
const SlideBg = ({ variant = 'default' }: { variant?: 'default' | 'blue' | 'dark' }) => (
  <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
    {variant === 'default' && (
      <>
        <div className="absolute top-0 left-0 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-900/10 blur-[120px]"></div>
        <div className="absolute right-0 bottom-0 h-[600px] w-[600px] translate-x-1/3 translate-y-1/3 rounded-full bg-indigo-900/10 blur-[100px]"></div>
      </>
    )}
    {variant === 'blue' && (
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-950 to-slate-950"></div>
    )}
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
  </div>
);

const Card = ({ title, icon: Icon, desc, color = 'blue', children }: any) => (
  <div className={`hover:border- h-full rounded-3xl border border-white/5 bg-slate-900/50 p-8${color}-500/30 group backdrop-blur-sm transition-all duration-300 hover:bg-slate-800/50`}>
    <div className="mb-6 flex items-start justify-between">
      <div className={`bg- rounded-2xl p-3${color}-500/10 text-${color}-400 transition-transform duration-300 group-hover:scale-110`}>
        {Icon && <Icon className="h-8 w-8" />}
      </div>
    </div>
    <h3 className="mb-3 text-2xl font-bold text-white">{title}</h3>
    <p className="leading-relaxed text-slate-400">{desc}</p>
    {children}
  </div>
);

// --- MAIN CONTENT ---
export default function SlideContent() {
  const slides: SlideData[] = [
    // 1. COVER
    {
      id: 'intro',
      content: (
        <>
          <SlideBg />
          <AnimatedSlide>
            <MotionItem className="mb-10">
              <div className="animate-pulse-slow flex h-24 w-24 items-center justify-center rounded-3xl bg-white shadow-[0_0_50px_rgba(59,130,246,0.3)]">
                <div className="h-12 w-12 rotate-45 rounded-xl bg-slate-950"></div>
              </div>
            </MotionItem>
            <MotionItem>
              <Badge variant="outline-white" className="mb-8 border-blue-500/30 bg-blue-500/10 px-6 py-2 text-base text-blue-300 backdrop-blur-md">
                The Adaptive Business Operating System
              </Badge>
            </MotionItem>
            <MotionItem className="max-w-5xl text-center">
              <h1 className="mb-8 text-5xl leading-tight font-extrabold tracking-tight text-white md:text-7xl lg:text-8xl">
                Modernisasi Tanpa
                {' '}
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Merombak Segalanya.
                </span>
              </h1>
            </MotionItem>
            <MotionItem>
              <p className="max-w-3xl text-center text-xl leading-relaxed text-slate-400 md:text-2xl">
                Satu platform terintegrasi untuk menyatukan HR, Finance, dan Operasional.
              </p>
            </MotionItem>
          </AnimatedSlide>
        </>
      ),
    },

    // 2. CONTEXT
    {
      id: 'context',
      content: (
        <>
          <SlideBg />
          <AnimatedSlide className="!block flex h-full items-center">
            <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-4 md:grid-cols-2">
              <div>
                <MotionItem>
                  <h2 className="mb-8 text-4xl font-bold text-white md:text-5xl">Mengapa Sekarang?</h2>
                </MotionItem>
                <MotionItem>
                  <p className="mb-10 text-xl leading-relaxed text-slate-400">
                    Bisnis menghadapi tekanan efisiensi yang belum pernah terjadi sebelumnya. Cara lama tidak lagi cukup.
                  </p>
                </MotionItem>
                <div className="space-y-6">
                  {[
                    { text: 'Kompetisi semakin global & digital.', icon: Globe, color: 'red' },
                    { text: 'Ekspektasi pelanggan terhadap kecepatan.', icon: Zap, color: 'amber' },
                    { text: 'Regulasi & Compliance semakin ketat.', icon: Shield, color: 'blue' },
                  ].map((item, i) => (
                    <MotionItem key={i}>
                      <div className="flex items-center gap-6 rounded-2xl border border-white/5 bg-white/5 p-5 transition-colors hover:border-white/10">
                        <div className={`bg- rounded-xl p-3${item.color}-500/20 text-${item.color}-400`}>
                          <item.icon className="h-6 w-6" />
                        </div>
                        <span className="text-lg font-medium text-slate-200">{item.text}</span>
                      </div>
                    </MotionItem>
                  ))}
                </div>
              </div>
              <MotionItem className="group relative flex h-[500px] items-center justify-center overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-1">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="relative z-10 text-center">
                  <TrendingUp className="mx-auto mb-6 h-32 w-32 text-blue-500 drop-shadow-lg" />
                  <p className="mb-2 text-3xl font-bold text-white">Efficiency Gap</p>
                  <p className="text-slate-400">Cost of Inaction is Rising</p>
                </div>
              </MotionItem>
            </div>
          </AnimatedSlide>
        </>
      ),
    },

    // 3. PROBLEM
    {
      id: 'problem',
      content: (
        <>
          <SlideBg />
          <AnimatedSlide>
            <div className="w-full max-w-7xl px-4">
              <MotionItem className="mb-16 text-center">
                <h2 className="mb-6 text-4xl font-bold text-white md:text-6xl">Dilema Sistem Enterprise</h2>
                <p className="text-xl text-slate-400">Dua pilihan ekstrem yang sama-sama menyakitkan.</p>
              </MotionItem>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <MotionItem>
                  <div className="group h-full rounded-[2.5rem] border border-red-500/20 bg-red-950/10 p-10 text-left transition-all duration-500 hover:bg-red-950/20">
                    <div className="mb-8 w-fit rounded-2xl bg-red-500/10 p-4 text-red-400">
                      <Layers className="h-10 w-10" />
                    </div>
                    <h3 className="mb-4 text-3xl font-bold text-white">Fragmented Stack</h3>
                    <p className="mb-8 text-lg text-slate-400">
                      "Frankenstein" system: Menggabungkan 5+ aplikasi SaaS berbeda.
                    </p>
                    <ul className="space-y-4 text-lg text-red-200/80">
                      <li className="flex items-center gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/20 text-sm text-red-500">✕</span>
                        {' '}
                        Data Silo & Duplikasi
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/20 text-sm text-red-500">✕</span>
                        {' '}
                        Biaya Langganan Bertumpuk
                      </li>
                    </ul>
                  </div>
                </MotionItem>

                <MotionItem>
                  <div className="group h-full rounded-[2.5rem] border border-amber-500/20 bg-amber-950/10 p-10 text-left transition-all duration-500 hover:bg-amber-950/20">
                    <div className="mb-8 w-fit rounded-2xl bg-amber-500/10 p-4 text-amber-400">
                      <Shield className="h-10 w-10" />
                    </div>
                    <h3 className="mb-4 text-3xl font-bold text-white">Legacy ERP</h3>
                    <p className="mb-8 text-lg text-slate-400">
                      Software raksasa masa lalu yang kaku dan mahal.
                    </p>
                    <ul className="space-y-4 text-lg text-amber-200/80">
                      <li className="flex items-center gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-sm text-amber-500">✕</span>
                        {' '}
                        Implementasi 1-2 Tahun
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-sm text-amber-500">✕</span>
                        {' '}
                        Sulit Dikustomisasi
                      </li>
                    </ul>
                  </div>
                </MotionItem>
              </div>
            </div>
          </AnimatedSlide>
        </>
      ),
    },

    // 4. SOLUTION (PHILOSOPHY)
    {
      id: 'philosophy',
      content: (
        <>
          <SlideBg variant="blue" />
          <AnimatedSlide>
            <div className="w-full max-w-5xl px-4 text-center">
              <MotionItem>
                <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-white">
                  <Puzzle className="h-4 w-4 text-blue-300" />
                  THE PHILOSOPHY
                </div>
              </MotionItem>
              <MotionItem>
                <h2 className="mb-10 text-5xl font-bold text-white md:text-7xl">Adaptive Business OS</h2>
              </MotionItem>
              <MotionItem>
                <p className="mx-auto mb-16 max-w-4xl text-2xl leading-relaxed font-light text-blue-100">
                  Bayangkan ERP seperti mainan
                  {' '}
                  <strong className="text-white">LEGO</strong>
                  . Kami menyediakan blok standar industri, Anda menyusunnya sesuai workflow unik perusahaan.
                </p>
              </MotionItem>

              <div className="grid grid-cols-3 gap-8">
                {[
                  { title: 'Modular', desc: 'Mulai dari yang butuh saja.', color: 'blue' },
                  { title: 'Integrated', desc: 'Semua terhubung by design.', color: 'green' },
                  { title: 'Low-Code', desc: 'Mudah disesuaikan tanpa dev.', color: 'purple' },
                ].map((item, i) => (
                  <MotionItem key={i}>
                    <div className="h-full rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
                      <h3 className="mb-3 text-2xl font-bold text-white">{item.title}</h3>
                      <p className="text-blue-100/70">{item.desc}</p>
                    </div>
                  </MotionItem>
                ))}
              </div>
            </div>
          </AnimatedSlide>
        </>
      ),
    },

    // 5. SWEET SPOT (COMPARISON)
    {
      id: 'sweet-spot',
      content: (
        <>
          <SlideBg />
          <AnimatedSlide>
            <div className="w-full max-w-7xl px-4">
              <MotionItem className="mb-16 text-center">
                <h2 className="mb-6 text-5xl font-bold text-white">Positioning BizOps</h2>
                <p className="text-xl text-slate-400">Titik temu antara fleksibilitas Enterprise dan kemudahan SaaS.</p>
              </MotionItem>

              <div className="grid grid-cols-3 items-center gap-8">
                <MotionItem>
                  <div className="scale-95 rounded-[2rem] border border-slate-800 bg-slate-900/50 p-10 opacity-50 grayscale">
                    <h3 className="mb-4 text-2xl font-bold text-slate-400">SaaS Lokal</h3>
                    <p className="text-slate-500">Mudah, murah, tapi fitur terbatas.</p>
                  </div>
                </MotionItem>

                <MotionItem className="z-10">
                  <div className="relative scale-110 transform overflow-hidden rounded-[2.5rem] border border-blue-500/50 bg-gradient-to-b from-blue-900 to-slate-900 p-12 shadow-[0_0_80px_rgba(37,99,235,0.3)]">
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-6 py-2 text-sm font-bold tracking-wider text-white uppercase shadow-lg">
                      The Winner
                    </div>
                    <h3 className="mt-4 mb-8 text-center text-4xl font-bold text-white">BizOps</h3>
                    <ul className="space-y-4 text-lg text-blue-100">
                      <li className="flex items-center gap-4">
                        <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-blue-400" />
                        {' '}
                        Enterprise Grade Security
                      </li>
                      <li className="flex items-center gap-4">
                        <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-blue-400" />
                        {' '}
                        Fully Customizable
                      </li>
                      <li className="flex items-center gap-4">
                        <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-blue-400" />
                        {' '}
                        Mobile Native
                      </li>
                      <li className="flex items-center gap-4">
                        <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-blue-400" />
                        {' '}
                        Fast Implementation
                      </li>
                    </ul>
                  </div>
                </MotionItem>

                <MotionItem>
                  <div className="scale-95 rounded-[2rem] border border-slate-800 bg-slate-900/50 p-10 opacity-50 grayscale">
                    <h3 className="mb-4 text-2xl font-bold text-slate-400">Legacy ERP</h3>
                    <p className="text-slate-500">Powerful, tapi kompleks & mahal.</p>
                  </div>
                </MotionItem>
              </div>
            </div>
          </AnimatedSlide>
        </>
      ),
    },

    // 6. PLATFORM MAP
    {
      id: 'platform',
      content: (
        <>
          <SlideBg />
          <AnimatedSlide>
            <div className="w-full max-w-7xl px-4">
              <MotionItem className="mb-16 text-center">
                <h2 className="mb-6 text-5xl font-bold text-white">Satu Platform, Solusi End-to-End</h2>
                <p className="text-xl text-slate-400">Pilih modul yang Anda butuhkan sekarang, tambah nanti.</p>
              </MotionItem>

              <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                <MotionItem><Card title="Human Capital" icon={Users} desc="Payroll, KPI, Absensi, Recruit" color="pink" /></MotionItem>
                <MotionItem><Card title="Finance" icon={Wallet} desc="General Ledger, Budgeting, Tax" color="emerald" /></MotionItem>
                <MotionItem><Card title="Operations" icon={Zap} desc="Project Mgmt, Asset, Maintenance" color="blue" /></MotionItem>
                <MotionItem><Card title="Sales & CRM" icon={Briefcase} desc="Pipeline, Quotation, Support" color="amber" /></MotionItem>
                <MotionItem><Card title="Supply Chain" icon={Layers} desc="Inventory, Procurement, Logistic" color="indigo" /></MotionItem>
                <MotionItem><Card title="Manufacturing" icon={Factory} desc="Production Plan, BOM, Quality" color="purple" /></MotionItem>
              </div>
            </div>
          </AnimatedSlide>
        </>
      ),
    },

    // 7. DEEP DIVE: HR
    {
      id: 'module-hr',
      content: (
        <>
          <SlideBg />
          <AnimatedSlide className="!block flex h-full items-center">
            <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-4 md:grid-cols-2">
              <div>
                <MotionItem>
                  <Badge className="mb-6 border-pink-500/20 bg-pink-500/10 text-pink-400">Human Capital Management</Badge>
                  <h2 className="mb-8 text-5xl font-bold text-white">Kelola Karyawan, Bukan Kertas</h2>
                </MotionItem>
                <MotionItem>
                  <p className="mb-10 text-xl leading-relaxed text-slate-400">
                    Otomatisasi seluruh siklus karyawan dari rekrutmen hingga pensiun. Hitung gaji dan pajak dalam hitungan detik.
                  </p>
                </MotionItem>
                <div className="space-y-4">
                  {[
                    'Perhitungan PPh 21 & BPJS Otomatis',
                    'Absensi Mobile dengan Geotagging',
                    'Self-Service Portal (Cuti/Reimburse)',
                    'KPI & Performance Appraisal',
                  ].map((feat, i) => (
                    <MotionItem key={i}>
                      <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-900/50 p-4">
                        <CheckCircle2 className="h-6 w-6 text-pink-500" />
                        <span className="text-lg text-slate-200">{feat}</span>
                      </div>
                    </MotionItem>
                  ))}
                </div>
              </div>
              <MotionItem className="relative flex h-[500px] items-center justify-center rounded-3xl border border-slate-800 bg-slate-900 p-8">
                {/* Placeholder UI */}
                <div className="relative h-full w-full overflow-hidden rounded-2xl border border-slate-700 bg-slate-800/50">
                  <div className="absolute top-4 right-4 left-4 h-8 rounded-lg bg-slate-700"></div>
                  <div className="absolute top-16 left-4 h-32 w-1/3 rounded-lg bg-slate-700/50"></div>
                  <div className="absolute top-16 right-4 h-32 w-1/2 rounded-lg bg-slate-700/50"></div>
                  <div className="absolute right-4 bottom-4 left-4 h-40 rounded-lg bg-slate-700/30"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Users className="h-24 w-24 text-pink-500/20" />
                  </div>
                </div>
              </MotionItem>
            </div>
          </AnimatedSlide>
        </>
      ),
    },

    // 8. DEEP DIVE: FINANCE
    {
      id: 'module-finance',
      content: (
        <>
          <SlideBg />
          <AnimatedSlide className="!block flex h-full items-center">
            <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-4 md:grid-cols-2">
              <MotionItem className="relative order-2 flex h-[500px] items-center justify-center rounded-3xl border border-slate-800 bg-slate-900 p-8 md:order-1">
                <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border border-slate-700 bg-slate-800/50">
                  <BarChart3 className="h-24 w-24 text-emerald-500/20" />
                </div>
              </MotionItem>
              <div className="order-1 md:order-2">
                <MotionItem>
                  <Badge className="mb-6 border-emerald-500/20 bg-emerald-500/10 text-emerald-400">Finance & Accounting</Badge>
                  <h2 className="mb-8 text-5xl font-bold text-white">Keuangan Real-time, Keputusan Cepat</h2>
                </MotionItem>
                <MotionItem>
                  <p className="mb-10 text-xl leading-relaxed text-slate-400">
                    Tinggalkan spreadsheet manual. Dapatkan laporan Laba Rugi, Neraca, dan Arus Kas secara otomatis setiap saat.
                  </p>
                </MotionItem>
                <div className="space-y-4">
                  {[
                    'Multi-Currency & Multi-Company',
                    'Budgeting & Cost Control',
                    'Otomasi Rekonsiliasi Bank',
                    'e-Faktur Pajak Integration',
                  ].map((feat, i) => (
                    <MotionItem key={i}>
                      <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-900/50 p-4">
                        <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                        <span className="text-lg text-slate-200">{feat}</span>
                      </div>
                    </MotionItem>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSlide>
        </>
      ),
    },

    // 9. INTEGRATION
    {
      id: 'integration',
      content: (
        <>
          <SlideBg />
          <AnimatedSlide>
            <div className="w-full max-w-7xl px-4">
              <MotionItem className="mb-16 text-center">
                <h2 className="mb-6 text-5xl font-bold text-white">Open Ecosystem</h2>
                <p className="text-xl text-slate-400">Terhubung native dengan ekosistem digital Indonesia.</p>
              </MotionItem>

              <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                {['Bank BCA', 'Bank Mandiri', 'DJP Online (Pajak)', 'Tokopedia', 'Shopee', 'WooCommerce', 'Fingerprint', 'WhatsApp'].map((item, i) => (
                  <MotionItem key={i}>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center transition-colors hover:bg-white/10">
                      <div className="text-lg font-bold text-white">{item}</div>
                    </div>
                  </MotionItem>
                ))}
              </div>

              <MotionItem className="mx-auto mt-16 max-w-3xl rounded-3xl border border-slate-800 bg-slate-900/80 p-8 text-center">
                <Code className="mx-auto mb-4 h-10 w-10 text-blue-500" />
                <h3 className="mb-2 text-2xl font-bold text-white">API-First Architecture</h3>
                <p className="text-slate-400">Punya sistem custom sendiri? Hubungkan dengan mudah melalui REST API kami yang terdokumentasi lengkap.</p>
              </MotionItem>
            </div>
          </AnimatedSlide>
        </>
      ),
    },

    // 10. SOCIAL PROOF
    {
      id: 'trust',
      content: (
        <>
          <SlideBg />
          <AnimatedSlide>
            <div className="w-full max-w-6xl px-4 text-center">
              <MotionItem>
                <h2 className="mb-12 text-5xl font-bold text-white">Dipercaya Pemimpin Industri</h2>
              </MotionItem>

              <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2">
                <MotionItem>
                  <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-10 text-left">
                    <p className="mb-8 text-xl leading-relaxed text-slate-300 italic">
                      "BizOps mengubah cara kami bekerja. Laporan keuangan yang dulu butuh 2 minggu, sekarang selesai dalam 2 hari. Efisiensi luar biasa."
                    </p>
                    <div className="flex items-center gap-6">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">B</div>
                      <div>
                        <p className="text-lg font-bold text-white">Budi Santoso</p>
                        <p className="text-slate-400">CFO, PT Maju Mundur</p>
                      </div>
                    </div>
                  </div>
                </MotionItem>
                <MotionItem>
                  <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-10 text-left">
                    <p className="mb-8 text-xl leading-relaxed text-slate-300 italic">
                      "Implementasi tercepat yang pernah kami alami. Support tim BizOps sangat responsif dan mengerti kebutuhan unik industri kami."
                    </p>
                    <div className="flex items-center gap-6">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-xl font-bold text-white">S</div>
                      <div>
                        <p className="text-lg font-bold text-white">Siti Aminah</p>
                        <p className="text-slate-400">Ops Manager, RetailIndo</p>
                      </div>
                    </div>
                  </div>
                </MotionItem>
              </div>
            </div>
          </AnimatedSlide>
        </>
      ),
    },

    // 11. PRICING
    {
      id: 'pricing',
      content: (
        <>
          <SlideBg />
          <AnimatedSlide>
            <div className="w-full max-w-6xl px-4 text-center">
              <MotionItem>
                <h2 className="mb-16 text-5xl font-bold text-white">Investasi Transparan</h2>
              </MotionItem>

              <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-3">
                <MotionItem>
                  <div className="rounded-[2rem] border border-slate-800 bg-slate-900/50 p-8 text-left">
                    <h3 className="mb-2 text-xl font-bold text-slate-300">Starter</h3>
                    <p className="mb-2 text-4xl font-bold text-white">
                      Rp 2.5jt
                      <span className="text-lg font-normal text-slate-500">/bln</span>
                    </p>
                    <p className="mb-8 text-sm text-slate-400">Untuk bisnis kecil.</p>
                    <ul className="space-y-3 text-slate-300">
                      <li className="flex gap-3">
                        <CheckCircle2 className="h-5 w-5 text-blue-500" />
                        {' '}
                        5 Users
                      </li>
                      <li className="flex gap-3">
                        <CheckCircle2 className="h-5 w-5 text-blue-500" />
                        {' '}
                        Core Modules
                      </li>
                    </ul>
                  </div>
                </MotionItem>

                <MotionItem>
                  <div className="relative z-10 scale-105 transform rounded-[2.5rem] border-2 border-blue-500 bg-slate-900 p-10 text-left shadow-2xl shadow-blue-900/50">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-sm font-bold tracking-wider text-white">POPULAR</div>
                    <h3 className="mb-2 text-2xl font-bold text-white">Business</h3>
                    <p className="mb-2 text-5xl font-bold text-white">
                      Rp 7.5jt
                      <span className="text-lg font-normal text-slate-500">/bln</span>
                    </p>
                    <p className="mb-8 text-sm text-slate-400">Scale up tanpa batas.</p>
                    <ul className="space-y-4 text-lg text-white">
                      <li className="flex gap-3">
                        <CheckCircle2 className="h-6 w-6 text-blue-400" />
                        {' '}
                        <span className="font-bold">50 Users</span>
                      </li>
                      <li className="flex gap-3">
                        <CheckCircle2 className="h-6 w-6 text-blue-400" />
                        {' '}
                        All Modules
                      </li>
                      <li className="flex gap-3">
                        <CheckCircle2 className="h-6 w-6 text-blue-400" />
                        {' '}
                        Priority Support
                      </li>
                    </ul>
                  </div>
                </MotionItem>

                <MotionItem>
                  <div className="rounded-[2rem] border border-slate-800 bg-slate-900/50 p-8 text-left">
                    <h3 className="mb-2 text-xl font-bold text-slate-300">Enterprise</h3>
                    <p className="mb-2 text-4xl font-bold text-white">Custom</p>
                    <p className="mb-8 text-sm text-slate-400">Kebutuhan khusus.</p>
                    <ul className="space-y-3 text-slate-300">
                      <li className="flex gap-3">
                        <CheckCircle2 className="h-5 w-5 text-blue-500" />
                        {' '}
                        Unlimited Users
                      </li>
                      <li className="flex gap-3">
                        <CheckCircle2 className="h-5 w-5 text-blue-500" />
                        {' '}
                        Dedicated Server
                      </li>
                    </ul>
                  </div>
                </MotionItem>
              </div>
            </div>
          </AnimatedSlide>
        </>
      ),
    },

    // 12. CTA
    {
      id: 'cta',
      content: (
        <>
          <SlideBg variant="blue" />
          <AnimatedSlide>
            <div className="max-w-5xl px-4 text-center">
              <MotionItem>
                <h2 className="mb-12 text-6xl leading-tight font-black tracking-tighter text-white md:text-8xl">
                  Let's Build
                  {' '}
                  <br />
                  The Future.
                </h2>
              </MotionItem>
              <MotionItem>
                <p className="mb-16 text-2xl font-light text-blue-100">
                  Siap mengubah operasional bisnis Anda menjadi keunggulan kompetitif?
                </p>
              </MotionItem>
              <MotionItem>
                <Stack direction="horizontal" gap={8} className="justify-center">
                  <Link href="/demo">
                    <Button size="lg" className="h-20 rounded-full border-none bg-white px-16 text-2xl font-bold text-blue-700 shadow-xl hover:bg-blue-50">
                      Jadwalkan Demo
                    </Button>
                  </Link>
                </Stack>
              </MotionItem>

              <MotionItem className="mt-24 w-full border-t border-white/10 pt-12">
                <div className="grid grid-cols-3 gap-12 text-lg text-slate-300">
                  <div>
                    <p className="mb-2 text-sm font-bold tracking-wider text-white uppercase opacity-70">Email</p>
                    hello@bizops.id
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-bold tracking-wider text-white uppercase opacity-70">Phone/WA</p>
                    +62 21 3970 2834
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-bold tracking-wider text-white uppercase opacity-70">Website</p>
                    bizops.id
                  </div>
                </div>
              </MotionItem>
            </div>
          </AnimatedSlide>
        </>
      ),
    },
  ];

  return <SlideDeck slides={slides} />;
}
