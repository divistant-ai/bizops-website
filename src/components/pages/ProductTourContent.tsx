'use client';

import {
  ArrowRight,
  BarChart3,
  Bell,
  Briefcase,
  Check,
  ChevronRight,
  DollarSign,
  FileText,
  Globe,
  Loader2,
  MousePointer,
  Package,
  Plus,
  RefreshCw,
  Send,
  ShieldCheck,
  Smartphone,
  UserCheck,
  Users,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import Container from '@/components/layout/Container';
import { CardSlider, Grid, Typography } from '@/components/ui';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Stack from '@/components/ui/Stack';

type ScenarioType = 'sales' | 'manager' | 'warehouse' | 'employee' | 'finance' | 'ceo';

type ScenarioDef = {
  id: ScenarioType;
  label: string;
  role: string;
  icon: any;
  device: 'mobile' | 'desktop';
  title: string;
  desc: string;
  color: string;
};

const scenarios: ScenarioDef[] = [
  {
    id: 'sales',
    label: 'Salesman',
    role: 'Field Sales',
    icon: Smartphone,
    device: 'mobile',
    title: 'Closing Deal di Lapangan',
    desc: 'Buat penawaran harga (Quotation) saat meeting dengan klien hanya dalam 3 ketukan.',
    color: 'text-blue-400',
  },
  {
    id: 'manager',
    label: 'Manager',
    role: 'General Manager',
    icon: Briefcase,
    device: 'desktop',
    title: 'Approval Jarak Jauh',
    desc: 'Review dan setujui permintaan pembelian (PO) yang masuk dari tim procurement.',
    color: 'text-purple-400',
  },
  {
    id: 'warehouse',
    label: 'Staff Gudang',
    role: 'Warehouse Keeper',
    icon: Package,
    device: 'mobile',
    title: 'Terima Barang Masuk',
    desc: 'Scan barcode barang yang datang dari supplier untuk update stok otomatis.',
    color: 'text-amber-400',
  },
  {
    id: 'employee',
    label: 'Karyawan',
    role: 'Staff',
    icon: UserCheck,
    device: 'mobile',
    title: 'Absensi & Cuti',
    desc: 'Clock-in kehadiran dengan Face ID dan ajukan cuti sakit mendadak.',
    color: 'text-pink-400',
  },
  {
    id: 'finance',
    label: 'Finance',
    role: 'Accountant',
    icon: DollarSign,
    device: 'desktop',
    title: 'Auto-Reconciliation',
    desc: 'Cocokkan mutasi bank dengan invoice penjualan secara otomatis tanpa input manual.',
    color: 'text-emerald-400',
  },
  {
    id: 'ceo',
    label: 'CEO / Owner',
    role: 'Chief Executive',
    icon: BarChart3,
    device: 'mobile',
    title: 'Executive Dashboard',
    desc: 'Pantau profitabilitas, cashflow, dan performa tim sales real-time dari genggaman.',
    color: 'text-indigo-400',
  },
];

export default function ProductTourContent() {
  const [activeId, setActiveId] = useState<ScenarioType>('sales');
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const currentScenario = scenarios.find(s => s.id === activeId) || scenarios[0];

  const switchScenario = (id: ScenarioType) => {
    if (id === activeId) {
      return;
    }
    setIsLoading(true);
    setActiveId(id);
    setStep(0);
    setTimeout(() => setIsLoading(false), 600);
  };

  const nextStep = () => {
    setIsLoading(true);
    setTimeout(() => {
      setStep(prev => Math.min(prev + 1, 3));
      setIsLoading(false);
    }, 800);
  };

  const resetScenario = () => {
    setStep(0);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0B1120] pt-20 font-sans text-white">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
      <div className="bg-primary-500/5 pointer-events-none absolute top-0 left-0 h-[600px] w-[600px] rounded-full blur-[120px]"></div>
      <div className="pointer-events-none absolute right-0 bottom-0 h-[600px] w-[600px] rounded-full bg-blue-500/5 blur-[120px]"></div>

      {/* MAIN INTERFACE CONTAINER */}
      <Container size="7xl" className="relative z-10 flex min-h-[calc(100vh-5rem)] flex-col justify-center py-8 lg:py-0">

        <Grid cols={12} gap={12} className="items-center">

          {/* LEFT PANEL: CONTROLS */}
          <Stack direction="vertical" gap={8} className="lg:col-span-4">

            {/* Header Title */}
            <div>
              <div className="text-primary-300 mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold tracking-wider uppercase ring-1 ring-white/5 backdrop-blur-xl">
                <MousePointer className="h-3 w-3 animate-bounce" />
                {' '}
                Interactive Demo
              </div>
              <Typography variant="h1" as="h1" className="leading-tight font-extrabold tracking-tight">
                Pilih Peran,
                <br />
                <span className="from-primary-400 bg-gradient-to-r to-blue-400 bg-clip-text text-transparent">Rasakan Bedanya.</span>
              </Typography>
              <Typography variant="small" className="leading-relaxed text-slate-400">Simulasi hands-on bagaimana BizOps mempermudah pekerjaan setiap departemen.</Typography>
            </div>

            {/* Mobile Scenario Selector */}
            <div className="scrollbar-hide -mx-4 w-full overflow-x-auto px-4 pb-4 lg:hidden">
              <div className="flex min-w-max gap-3">
                {scenarios.map(sc => (
                  <button
                    key={sc.id}
                    onClick={() => switchScenario(sc.id)}
                    className={`group relative flex min-w-[200px] items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-300 ${
                      activeId === sc.id
                        ? 'border-primary-500/50 shadow-primary-900/20 ring-primary-500/50 bg-white/10 shadow-lg ring-1'
                        : 'border-transparent bg-white/5 text-slate-400 hover:border-white/10 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className={`shrink-0 rounded-lg p-2 transition-colors ${activeId === sc.id ? 'bg-primary-500 text-white shadow-md' : 'bg-slate-800 text-slate-400 group-hover:text-white'}`}>
                      <sc.icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className={`truncate text-sm font-bold ${activeId === sc.id ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>{sc.label}</div>
                      <div className="truncate text-[10px] text-slate-500 group-hover:text-slate-400">{sc.role}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop Vertical Scenario Menu */}
            <Stack direction="vertical" gap={2} className="hidden lg:flex">
              <Typography variant="small" className="mb-1 px-2 text-xs font-bold tracking-wider text-slate-500 uppercase">Select Scenario</Typography>
              {scenarios.map(sc => (
                <button
                  key={sc.id}
                  onClick={() => switchScenario(sc.id)}
                  className={`group relative flex items-center gap-4 rounded-xl border px-4 py-3 text-left transition-all duration-300 ${
                    activeId === sc.id
                      ? 'border-primary-500/50 shadow-primary-900/20 ring-primary-500/50 translate-x-2 bg-white/10 shadow-lg ring-1'
                      : 'border-transparent bg-white/5 text-slate-400 hover:translate-x-1 hover:border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className={`rounded-lg p-2 transition-colors ${activeId === sc.id ? 'bg-primary-500 text-white shadow-md' : 'bg-slate-800 text-slate-400 group-hover:text-white'}`}>
                    <sc.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className={`text-sm font-bold ${activeId === sc.id ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>{sc.label}</div>
                    <div className="text-[10px] text-slate-500 group-hover:text-slate-400">{sc.role}</div>
                  </div>
                  {activeId === sc.id && <ChevronRight className="text-primary-400 h-4 w-4 animate-pulse" />}
                </button>
              ))}
            </Stack>

            {/* Active Scenario Info Card */}
            <div className="hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-5 backdrop-blur-sm lg:block">
              <div className={`mb-2 text-xs font-bold tracking-widest uppercase ${currentScenario!.color} flex items-center gap-2`}>
                <span className="h-2 w-2 animate-pulse rounded-full bg-current"></span>
                Current Mission
              </div>
              <Typography variant="h3" as="h3" className="font-bold text-white">{currentScenario!.title}</Typography>
              <Typography variant="small" className="leading-relaxed text-slate-400">{currentScenario!.desc}</Typography>
            </div>

          </Stack>

          {/* RIGHT PANEL: MAIN STAGE */}
          <div className="relative flex min-h-[600px] w-full flex-col items-center lg:col-span-8 lg:block lg:pt-8">

            {/* Mobile Info */}
            <div className="relative z-20 mb-4 block w-full px-4 text-center lg:hidden">
              <Typography variant="h2" as="h2" className="leading-tight font-bold text-white">{currentScenario!.title}</Typography>
              <Typography variant="small" className="leading-snug text-slate-400">{currentScenario!.desc}</Typography>
            </div>

            {/* Loading Overlay */}
            {isLoading && (
              <div className="absolute inset-0 z-50 flex flex-col items-center justify-center rounded-3xl bg-[#0B1120]/90 backdrop-blur-sm transition-opacity duration-300">
                <Loader2 className="text-primary-500 mb-4 h-12 w-12 animate-spin" />
                <span className="text-primary-200 animate-pulse text-sm font-medium tracking-wider">
                  LOADING
                  {currentScenario!.label.toUpperCase()}
                  ...
                </span>
              </div>
            )}

            {/* Device Frame */}
            <div className="flex w-full transform justify-center transition-all duration-500">
              {currentScenario!.device === 'mobile'
                ? (
                    <div className="origin-top scale-[0.85] transform sm:scale-95 md:origin-center md:scale-100 lg:scale-90 xl:scale-100">
                      <MobileFrame>
                        <ScenarioContent id={activeId} step={step} onNext={nextStep} onReset={resetScenario} />
                      </MobileFrame>
                    </div>
                  )
                : (
                    <div className="-mt-4 w-full origin-top scale-[0.55] transform sm:scale-[0.75] md:-mt-0 md:origin-center md:scale-90 lg:scale-90 xl:scale-100">
                      <DesktopFrame role={currentScenario!.role}>
                        <ScenarioContent id={activeId} step={step} onNext={nextStep} onReset={resetScenario} />
                      </DesktopFrame>
                    </div>
                  )}
            </div>

          </div>

        </Grid>
      </Container>

      {/* SUPPORTING SECTIONS */}

      {/* Benefits */}
      <section className="relative overflow-hidden border-t border-slate-900 bg-slate-950/50 py-16 md:py-24">
        <Container size="7xl" className="relative z-10">
          <div className="mb-12 text-center md:mb-16">
            <Typography variant="h2" as="h2">Mengapa Kami Buat Simulasi Ini?</Typography>
            <Typography variant="body" className="text-slate-400">Kami percaya pada transparansi. Anda berhak tahu persis apa yang Anda beli sebelum mengeluarkan biaya sepeser pun.</Typography>
          </div>

          <CardSlider desktopClassName="md:grid md:grid-cols-3 md:gap-8" mobileItemWidth="w-[85vw] sm:w-[350px]">
            <div className="hover:border-primary-500/30 h-full rounded-2xl border border-slate-800 bg-slate-900 p-6 transition-colors">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 ring-1 ring-blue-500/30">
                <Zap className="h-6 w-6 text-blue-400" />
              </div>
              <Typography variant="h3" as="h3">Zero-Setup Experience</Typography>
              <Typography variant="small" className="text-slate-400">Tidak perlu menunggu tim IT melakukan instalasi server. Cukup klik dan rasakan pengalamannya langsung di browser.</Typography>
            </div>
            <div className="h-full rounded-2xl border border-slate-800 bg-slate-900 p-6 transition-colors hover:border-purple-500/30">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 ring-1 ring-purple-500/30">
                <ShieldCheck className="h-6 w-6 text-purple-400" />
              </div>
              <Typography variant="h3" as="h3">Realistic Workflows</Typography>
              <Typography variant="small" className="text-slate-400">Skenario yang Anda jalankan adalah 100% alur kerja asli yang digunakan oleh klien-klien enterprise kami setiap hari.</Typography>
            </div>
            <div className="h-full rounded-2xl border border-slate-800 bg-slate-900 p-6 transition-colors hover:border-emerald-500/30">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 ring-1 ring-emerald-500/30">
                <Globe className="h-6 w-6 text-emerald-400" />
              </div>
              <Typography variant="h3" as="h3">Unified Ecosystem</Typography>
              <Typography variant="small" className="text-slate-400">Lihat bagaimana data dari Sales (Mobile) langsung terhubung ke Finance (Web) dan Gudang tanpa jeda.</Typography>
            </div>
          </CardSlider>
        </Container>
      </section>

      {/* CTA Final */}
      <section className="relative overflow-hidden py-24">
        <div className="bg-primary-900/10 absolute inset-0"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-20"></div>

        <Container size="7xl" className="relative z-10 text-center">
          <Badge variant="outline" className="border-primary-500/30 text-primary-300 bg-primary-500/10 mb-6">Ready for the real thing?</Badge>
          <Typography variant="h2" as="h2" className="font-extrabold tracking-tight text-white">
            Bawa Efisiensi Ini ke
            <span className="text-primary-400">Bisnis Anda.</span>
          </Typography>
          <Typography variant="body" className="text-slate-400">Coba full version dengan data perusahaan Anda sendiri. Gratis 14 hari, tanpa komitmen.</Typography>
          <Stack direction="vertical" gap={4} className="mt-8 justify-center">
            <Link href="/demo">
              <Button size="lg" className="bg-primary-600 hover:bg-primary-500 group w-full border-none px-10 text-lg font-bold shadow-[0_0_40px_rgba(14,165,233,0.3)] sm:w-auto">
                Mulai Trial Gratis
                {' '}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/tools/pricing-calculator">
              <Button variant="outline" size="lg" className="w-full border-slate-700 px-10 text-lg text-white hover:bg-slate-800 sm:w-auto">
                Cek Estimasi Harga
              </Button>
            </Link>
          </Stack>
        </Container>
      </section>

    </div>
  );
}

// Mobile Frame Component
const MobileFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="relative mx-auto flex h-[650px] w-[320px] transform flex-col overflow-hidden rounded-[2.5rem] border-[12px] border-slate-800 bg-slate-950 shadow-2xl ring-1 ring-slate-700/50 transition-transform duration-500 hover:scale-[1.02] md:h-[720px] md:w-[360px] md:rounded-[3rem] md:border-[14px]">
    <div className="pointer-events-none absolute top-0 right-0 z-30 h-full w-1/2 bg-gradient-to-l from-white/5 to-transparent"></div>
    <div className="absolute top-[80px] -left-[15px] h-[32px] w-[3px] rounded-l-lg bg-slate-700 md:-left-[17px]"></div>
    <div className="absolute top-[140px] -left-[15px] h-[46px] w-[3px] rounded-l-lg bg-slate-700 md:-left-[17px]"></div>
    <div className="absolute top-[160px] -right-[15px] h-[64px] w-[3px] rounded-r-lg bg-slate-700 md:-right-[17px]"></div>
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[2rem] bg-slate-50 dark:bg-slate-950">
      <div className="z-20 flex h-10 shrink-0 items-center justify-between bg-slate-950 px-6 text-[10px] text-white select-none">
        <span>9:41</span>
        <div className="absolute top-0 left-1/2 h-5 w-20 -translate-x-1/2 rounded-b-2xl bg-black"></div>
        <div className="flex gap-1.5">
          <span className="text-xs">📶</span>
          <div className="h-2.5 w-5 rounded bg-white"></div>
        </div>
      </div>
      {children}
      <div className="absolute bottom-2 left-1/2 z-20 h-1 w-1/3 -translate-x-1/2 rounded-full bg-slate-400/50 backdrop-blur-sm"></div>
    </div>
  </div>
);

// Desktop Frame Component
const DesktopFrame: React.FC<{ children: React.ReactNode; role: string }> = ({ children, role }) => (
  <div className="relative flex aspect-[16/10] w-full transform flex-col overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-2xl ring-4 ring-slate-900/50 transition-transform duration-500 hover:scale-[1.01] md:rounded-2xl">
    <div className="flex h-8 items-center border-b border-slate-700 bg-slate-800 px-4 select-none md:h-10">
      <div className="flex gap-1.5 md:gap-2">
        <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f56] md:h-3 md:w-3"></div>
        <div className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e] md:h-3 md:w-3"></div>
        <div className="h-2.5 w-2.5 rounded-full bg-[#27c93f] md:h-3 md:w-3"></div>
      </div>
      <div className="ml-4 flex h-5 flex-1 items-center overflow-hidden rounded-md border border-slate-800/50 bg-slate-900/80 px-3 text-[10px] whitespace-nowrap text-slate-400 shadow-inner md:h-6 md:text-xs">
        <span className="mr-1 text-slate-500">https://</span>
        app.bizops.id/desk
      </div>
    </div>
    <div className="flex flex-1 overflow-hidden bg-slate-50 text-slate-900 dark:bg-[#0B1120] dark:text-white">
      <div className="flex hidden w-48 shrink-0 flex-col border-r border-slate-800 bg-slate-900 p-3 sm:flex md:w-64 md:p-4">
        <div className="mb-6 flex items-center gap-3 px-2 text-base font-bold text-white md:mb-8 md:text-lg">
          <div className="from-primary-600 to-primary-700 shadow-primary-900/50 flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br text-xs shadow-lg md:h-8 md:w-8 md:text-sm">B</div>
          <span className="tracking-tight">BizOps</span>
        </div>
        <Stack direction="vertical" gap={1}>
          <div className="bg-primary-600/10 text-primary-400 border-primary-500/10 flex items-center gap-3 rounded-lg border px-3 py-2 text-xs font-medium md:py-2.5 md:text-sm">
            <BarChart3 className="h-3.5 w-3.5 md:h-4 md:w-4" />
            {' '}
            Dashboard
          </div>
          <div className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200 md:py-2.5 md:text-sm">
            <Bell className="h-3.5 w-3.5 md:h-4 md:w-4" />
            {' '}
            Inbox
            <span className="ml-auto rounded-md bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white shadow-md shadow-red-500/20">3</span>
          </div>
          <div className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200 md:py-2.5 md:text-sm">
            <FileText className="h-3.5 w-3.5 md:h-4 md:w-4" />
            {' '}
            Reports
          </div>
        </Stack>
        <div className="mt-auto flex items-center gap-3 border-t border-slate-800/50 pt-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-indigo-500 to-purple-600 text-xs font-bold text-white shadow-md md:h-9 md:w-9">
            {role.charAt(0)}
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="truncate text-xs font-bold text-white">{role}</div>
            <div className="flex items-center gap-1 text-[10px] text-emerald-400">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400"></div>
              {' '}
              Online
            </div>
          </div>
        </div>
      </div>
      <div className="relative flex flex-1 flex-col overflow-hidden bg-slate-900">
        <div className="z-10 flex h-12 items-center justify-between border-b border-slate-800 bg-slate-900/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 md:h-16 md:px-6">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400 md:text-sm">
            <span className="text-slate-500">Workspace</span>
            {' '}
            <ChevronRight className="h-3 w-3" />
            {' '}
            <span className="text-white">Desk</span>
          </div>
        </div>
        <div className="relative flex-1 overflow-y-auto bg-[#0B1120] bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] p-4 md:p-8">
          {children}
        </div>
      </div>
    </div>
  </div>
);

// Scenario Content Component (Simplified version with key scenarios)
const ScenarioContent: React.FC<{
  id: ScenarioType;
  step: number;
  onNext: () => void;
  onReset: () => void;
}> = ({ id, step, onNext, onReset }) => {
  // Success screen (shared)
  if (step === 3) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
        <div className="animate-bounce-slow mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-400/20 to-emerald-600/20 ring-1 ring-green-500/30 md:h-24 md:w-24">
          <Check className="h-10 w-10 text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.5)] md:h-12 md:w-12" />
        </div>
        <Typography variant="h3" as="h3">Task Completed!</Typography>
        <Typography variant="small" className="leading-relaxed text-slate-400">Bayangkan efisiensi ini dikalikan dengan ribuan transaksi.</Typography>
        <Stack direction="vertical" gap={3} className="mt-6 w-full max-w-xs">
          <Link href="/demo" className="w-full">
            <Button size="md" fullWidth className="shadow-primary-500/20 bg-primary-600 hover:bg-primary-500 h-12 border-none text-base shadow-xl">Mulai Trial Gratis</Button>
          </Link>
          <button onClick={onReset} className="group flex items-center justify-center gap-2 py-2 text-sm text-slate-500 transition-colors hover:text-white">
            <RefreshCw className="h-3 w-3 transition-transform duration-500 group-hover:rotate-180" />
            {' '}
            Ulangi Simulasi
          </button>
        </Stack>
      </div>
    );
  }

  // SALES SCENARIO
  if (id === 'sales') {
    if (step === 0) {
      return (
        <div className="flex h-full flex-col bg-slate-950">
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-800 bg-slate-900 p-4">
            <div className="text-lg font-bold text-white">Quotations</div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 transition-transform active:scale-90"><Plus className="text-primary-500 h-5 w-5" /></div>
          </div>
          <Stack direction="vertical" gap={4} className="flex-1 overflow-y-auto p-4">
            <div className="relative mb-4 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-5 text-white shadow-lg">
              <div className="mb-1 text-xs font-bold tracking-wider text-blue-200 uppercase">Sales Target (Oct)</div>
              <div className="flex items-end justify-between">
                <div className="text-3xl font-bold">85%</div>
                <div className="text-sm text-blue-100">IDR 850jt</div>
              </div>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-black/20 backdrop-blur-sm">
                <div className="h-full w-[85%] rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
              </div>
            </div>
            <div className="mb-2 px-1 text-xs font-bold tracking-wider text-slate-500 uppercase">Recent Drafts</div>
            {[1, 2].map(i => (
              <div key={i} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/50 p-4 transition-colors hover:bg-slate-800">
                <div>
                  <div className="font-bold text-slate-200">PT Sumber Makmur</div>
                  <div className="mt-1 text-xs text-slate-500">
                    QT-2023-00
                    {i}
                    {' '}
                    • IDR 25.000.000
                  </div>
                </div>
                <Badge variant="outline" size="sm" className="border-slate-700 text-slate-400">Draft</Badge>
              </div>
            ))}
            <div className="fixed bottom-8 left-1/2 z-20 w-full max-w-[300px] -translate-x-1/2 px-4">
              <Button size="md" onClick={onNext} className="shadow-primary-500/30 bg-primary-600 hover:bg-primary-500 h-12 w-full animate-pulse rounded-xl border-none font-bold text-white shadow-xl">
                + Buat Penawaran Baru
              </Button>
            </div>
          </Stack>
        </div>
      );
    }
    if (step === 1) {
      return (
        <div className="flex h-full flex-col bg-slate-950">
          <Stack direction="vertical" gap={5} className="flex-1 p-4">
            <Stack direction="vertical" gap={2}>
              <Typography variant="small" className="text-xs font-bold text-slate-500 uppercase">Customer</Typography>
              <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 p-4 text-sm font-medium text-white shadow-sm">
                PT Mitra Abadi Teknik
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/20"><Check className="h-3 w-3 text-green-500" /></div>
              </div>
            </Stack>
            <Stack direction="vertical" gap={2}>
              <Typography variant="small" className="text-xs font-bold text-slate-500 uppercase">Items</Typography>
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 shadow-sm">
                <div className="mb-1 flex justify-between text-sm font-medium text-white">
                  <span>MacBook Pro M3</span>
                  <span>x 5</span>
                </div>
                <div className="text-xs text-slate-500">Rp 25.000.000 / unit</div>
              </div>
            </Stack>
            <div className="mt-auto">
              <div className="mb-4 rounded-xl border border-slate-800 bg-slate-800/50 p-5">
                <div className="mb-2 flex justify-between text-sm text-slate-400">
                  <span>Subtotal</span>
                  <span>Rp 125.000.000</span>
                </div>
                <div className="mb-4 flex justify-between text-sm text-slate-400">
                  <span>Tax (11%)</span>
                  <span>Rp 13.750.000</span>
                </div>
                <div className="my-3 h-px bg-slate-700"></div>
                <div className="flex justify-between text-lg font-bold text-white">
                  <span>Total</span>
                  <span className="text-emerald-400">Rp 138.750.000</span>
                </div>
              </div>
              <Button size="md" fullWidth onClick={onNext} className="bg-primary-600 hover:bg-primary-500 shadow-primary-900/50 h-12 border-none text-base font-bold shadow-lg">Simpan & Kirim</Button>
            </div>
          </Stack>
        </div>
      );
    }
    if (step === 2) {
      return (
        <div className="flex h-full flex-col bg-slate-950">
          <Stack direction="vertical" gap={6} className="flex flex-1 flex-col items-center justify-center p-6 text-center">
            <div className="group relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
              <div className="bg-primary-500/10 absolute inset-0 blur-xl"></div>
              <FileText className="text-primary-500 relative z-10 h-10 w-10" />
            </div>
            <div>
              <Typography variant="h3" as="h3">Quotation Created!</Typography>
              <Typography variant="small" className="text-slate-500">QT-2023-088 siap dikirim.</Typography>
            </div>
            <Stack direction="vertical" gap={3} className="w-full">
              <button onClick={onNext} className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#25D366] p-4 font-bold text-white shadow-lg shadow-green-900/20 transition-transform hover:bg-[#20bd5a] active:scale-95">
                <Send className="h-5 w-5" />
                {' '}
                Kirim via WhatsApp
              </button>
              <button onClick={onNext} className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-700 bg-slate-800 p-4 font-bold text-slate-300 transition-colors hover:bg-slate-700">
                <Users className="h-5 w-5" />
                {' '}
                Kirim Email
              </button>
            </Stack>
          </Stack>
        </div>
      );
    }
  }

  // Simplified scenarios for other roles
  return (
    <div className="flex h-full flex-col items-center justify-center p-6 text-center">
      <div className="mb-6">
        <Typography variant="h3" as="h3" className="mb-2">{id === 'manager' ? 'Approval Dashboard' : id === 'finance' ? 'Bank Reconciliation' : id === 'ceo' ? 'Executive Dashboard' : id === 'warehouse' ? 'Warehouse Scanner' : 'HR Dashboard'}</Typography>
        <Typography variant="small" className="text-slate-400">
          Step
          {step + 1}
          {' '}
          of 3
        </Typography>
      </div>
      <div className="mb-6 flex h-32 w-32 items-center justify-center rounded-2xl bg-slate-800">
        {id === 'manager' && <Briefcase className="h-16 w-16 text-purple-400" />}
        {id === 'finance' && <DollarSign className="h-16 w-16 text-emerald-400" />}
        {id === 'ceo' && <BarChart3 className="h-16 w-16 text-indigo-400" />}
        {id === 'warehouse' && <Package className="h-16 w-16 text-amber-400" />}
        {id === 'employee' && <UserCheck className="h-16 w-16 text-pink-400" />}
      </div>
      <Button onClick={onNext} size="lg" className="bg-primary-600 hover:bg-primary-500">Continue Scenario</Button>
    </div>
  );
};
