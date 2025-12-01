'use client';

import { useState } from 'react';
import { 
  Smartphone, Briefcase, Package, UserCheck, 
  MousePointer, Check, ArrowRight, Loader2, 
  ChevronRight, DollarSign, BarChart3, Zap, 
  ShieldCheck, Globe, RefreshCw, Send, Users,
  FileText, Bell, Plus
} from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Typography } from '@/components/ui';
import Container from '@/components/layout/Container';
import { Grid } from '@/components/ui';
import Stack from '@/components/ui/Stack';
import { CardSlider } from '@/components/ui';
import Badge from '@/components/ui/Badge';

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
    color: 'text-blue-400'
  },
  { 
    id: 'manager', 
    label: 'Manager', 
    role: 'General Manager',
    icon: Briefcase, 
    device: 'desktop',
    title: 'Approval Jarak Jauh',
    desc: 'Review dan setujui permintaan pembelian (PO) yang masuk dari tim procurement.',
    color: 'text-purple-400'
  },
  { 
    id: 'warehouse', 
    label: 'Staff Gudang', 
    role: 'Warehouse Keeper',
    icon: Package, 
    device: 'mobile',
    title: 'Terima Barang Masuk',
    desc: 'Scan barcode barang yang datang dari supplier untuk update stok otomatis.',
    color: 'text-amber-400'
  },
  { 
    id: 'employee', 
    label: 'Karyawan', 
    role: 'Staff',
    icon: UserCheck, 
    device: 'mobile',
    title: 'Absensi & Cuti',
    desc: 'Clock-in kehadiran dengan Face ID dan ajukan cuti sakit mendadak.',
    color: 'text-pink-400'
  },
  { 
    id: 'finance', 
    label: 'Finance', 
    role: 'Accountant',
    icon: DollarSign, 
    device: 'desktop',
    title: 'Auto-Reconciliation',
    desc: 'Cocokkan mutasi bank dengan invoice penjualan secara otomatis tanpa input manual.',
    color: 'text-emerald-400'
  },
  { 
    id: 'ceo', 
    label: 'CEO / Owner', 
    role: 'Chief Executive',
    icon: BarChart3, 
    device: 'mobile',
    title: 'Executive Dashboard',
    desc: 'Pantau profitabilitas, cashflow, dan performa tim sales real-time dari genggaman.',
    color: 'text-indigo-400'
  }
];

export default function ProductTourContent() {
  const [activeId, setActiveId] = useState<ScenarioType>('sales');
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const currentScenario = scenarios.find(s => s.id === activeId) || scenarios[0];

  const switchScenario = (id: ScenarioType) => {
    if (id === activeId) return;
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
    <div className="pt-20 bg-[#0B1120] text-white min-h-screen relative overflow-x-hidden font-sans">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-20"></div>
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* MAIN INTERFACE CONTAINER */}
      <Container size="7xl" className="relative z-10 min-h-[calc(100vh-5rem)] flex flex-col justify-center py-8 lg:py-0">
        
        <Grid cols={12} gap={12} className="items-center">
          
          {/* LEFT PANEL: CONTROLS */}
          <Stack direction="vertical" gap={8} className="lg:col-span-4">
            
            {/* Header Title */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-primary-300 text-[10px] font-bold uppercase tracking-wider mb-4 ring-1 ring-white/5">
                <MousePointer className="w-3 h-3 animate-bounce" /> Interactive Demo
              </div>
              <Typography variant="h1" as="h1" className="font-extrabold leading-tight tracking-tight">Pilih Peran,<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-400">Rasakan Bedanya.</span></Typography>
              <Typography variant="small" className="text-slate-400 leading-relaxed">Simulasi hands-on bagaimana BizOps mempermudah pekerjaan setiap departemen.</Typography>
            </div>

            {/* Mobile Scenario Selector */}
            <div className="lg:hidden w-full overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
              <div className="flex gap-3 min-w-max">
                {scenarios.map((sc) => (
                  <button
                    key={sc.id}
                    onClick={() => switchScenario(sc.id)}
                    className={`group relative px-4 py-3 rounded-xl border flex items-center gap-3 transition-all duration-300 text-left min-w-[200px] ${
                      activeId === sc.id 
                        ? 'bg-white/10 border-primary-500/50 shadow-lg shadow-primary-900/20 ring-1 ring-primary-500/50' 
                        : 'bg-white/5 border-transparent hover:bg-white/10 hover:border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className={`p-2 rounded-lg transition-colors shrink-0 ${activeId === sc.id ? 'bg-primary-500 text-white shadow-md' : 'bg-slate-800 text-slate-400 group-hover:text-white'}`}>
                      <sc.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm font-bold truncate ${activeId === sc.id ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>{sc.label}</div>
                      <div className="text-[10px] text-slate-500 group-hover:text-slate-400 truncate">{sc.role}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop Vertical Scenario Menu */}
            <Stack direction="vertical" gap={2} className="hidden lg:flex">
              <Typography variant="small" className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 px-2">Select Scenario</Typography>
              {scenarios.map((sc) => (
                <button
                  key={sc.id}
                  onClick={() => switchScenario(sc.id)}
                  className={`group relative px-4 py-3 rounded-xl border flex items-center gap-4 transition-all duration-300 text-left ${
                    activeId === sc.id 
                      ? 'bg-white/10 border-primary-500/50 shadow-lg shadow-primary-900/20 ring-1 ring-primary-500/50 translate-x-2' 
                      : 'bg-white/5 border-transparent hover:bg-white/10 hover:border-white/10 text-slate-400 hover:text-white hover:translate-x-1'
                  }`}
                >
                  <div className={`p-2 rounded-lg transition-colors ${activeId === sc.id ? 'bg-primary-500 text-white shadow-md' : 'bg-slate-800 text-slate-400 group-hover:text-white'}`}>
                    <sc.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className={`text-sm font-bold ${activeId === sc.id ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>{sc.label}</div>
                    <div className="text-[10px] text-slate-500 group-hover:text-slate-400">{sc.role}</div>
                  </div>
                  {activeId === sc.id && <ChevronRight className="w-4 h-4 text-primary-400 animate-pulse" />}
                </button>
              ))}
            </Stack>

            {/* Active Scenario Info Card */}
            <div className="p-5 bg-slate-900/50 border border-slate-800 rounded-2xl backdrop-blur-sm hidden lg:block">
              <div className={`text-xs font-bold uppercase tracking-widest mb-2 ${currentScenario!.color} flex items-center gap-2`}>
                <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
                Current Mission
              </div>
              <Typography variant="h3" as="h3" className="font-bold text-white">{currentScenario!.title}</Typography>
              <Typography variant="small" className="text-slate-400 leading-relaxed">{currentScenario!.desc}</Typography>
            </div>

          </Stack>

          {/* RIGHT PANEL: MAIN STAGE */}
          <div className="lg:col-span-8 relative min-h-[600px] flex flex-col items-center lg:block lg:pt-8 w-full">
             
            {/* Mobile Info */}
            <div className="block lg:hidden mb-4 text-center w-full px-4 relative z-20">
              <Typography variant="h2" as="h2" className="font-bold text-white leading-tight">{currentScenario!.title}</Typography>
              <Typography variant="small" className="text-slate-400 leading-snug">{currentScenario!.desc}</Typography>
            </div>

            {/* Loading Overlay */}
            {isLoading && (
              <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0B1120]/90 backdrop-blur-sm rounded-3xl transition-opacity duration-300">
                <Loader2 className="w-12 h-12 text-primary-500 animate-spin mb-4" />
                <span className="text-primary-200 font-medium tracking-wider text-sm animate-pulse">LOADING {currentScenario!.label.toUpperCase()}...</span>
              </div>
            )}

            {/* Device Frame */}
            <div className="w-full flex justify-center transform transition-all duration-500">
              {currentScenario!.device === 'mobile' ? (
                <div className="transform scale-[0.85] sm:scale-95 md:scale-100 lg:scale-90 xl:scale-100 origin-top md:origin-center">
                  <MobileFrame>
                    <ScenarioContent id={activeId} step={step} onNext={nextStep} onReset={resetScenario} />
                  </MobileFrame>
                </div>
              ) : (
                <div className="w-full transform scale-[0.55] sm:scale-[0.75] md:scale-90 lg:scale-90 xl:scale-100 origin-top md:origin-center -mt-4 md:-mt-0">
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
      <section className="py-16 md:py-24 bg-slate-950/50 border-t border-slate-900 relative overflow-hidden">
        <Container size="7xl" className="relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <Typography variant="h2" as="h2">Mengapa Kami Buat Simulasi Ini?</Typography>
            <Typography variant="body" className="text-slate-400">Kami percaya pada transparansi. Anda berhak tahu persis apa yang Anda beli sebelum mengeluarkan biaya sepeser pun.</Typography>
          </div>
          
          <CardSlider desktopClassName="md:grid md:grid-cols-3 md:gap-8" mobileItemWidth="w-[85vw] sm:w-[350px]">
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 hover:border-primary-500/30 transition-colors h-full">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-5 ring-1 ring-blue-500/30">
                <Zap className="w-6 h-6 text-blue-400" />
              </div>
              <Typography variant="h3" as="h3">Zero-Setup Experience</Typography>
              <Typography variant="small" className="text-slate-400">Tidak perlu menunggu tim IT melakukan instalasi server. Cukup klik dan rasakan pengalamannya langsung di browser.</Typography>
            </div>
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 hover:border-purple-500/30 transition-colors h-full">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-5 ring-1 ring-purple-500/30">
                <ShieldCheck className="w-6 h-6 text-purple-400" />
              </div>
              <Typography variant="h3" as="h3">Realistic Workflows</Typography>
              <Typography variant="small" className="text-slate-400">Skenario yang Anda jalankan adalah 100% alur kerja asli yang digunakan oleh klien-klien enterprise kami setiap hari.</Typography>
            </div>
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 hover:border-emerald-500/30 transition-colors h-full">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-5 ring-1 ring-emerald-500/30">
                <Globe className="w-6 h-6 text-emerald-400" />
              </div>
              <Typography variant="h3" as="h3">Unified Ecosystem</Typography>
              <Typography variant="small" className="text-slate-400">Lihat bagaimana data dari Sales (Mobile) langsung terhubung ke Finance (Web) dan Gudang tanpa jeda.</Typography>
            </div>
          </CardSlider>
        </Container>
      </section>

      {/* CTA Final */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary-900/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-20"></div>
        
        <Container size="7xl" className="text-center relative z-10">
          <Badge variant="outline" className="mb-6 border-primary-500/30 text-primary-300 bg-primary-500/10">Ready for the real thing?</Badge>
          <Typography variant="h2" as="h2" className="font-extrabold text-white tracking-tight">Bawa Efisiensi Ini ke <span className="text-primary-400">Bisnis Anda.</span></Typography>
          <Typography variant="body" className="text-slate-400">Coba full version dengan data perusahaan Anda sendiri. Gratis 14 hari, tanpa komitmen.</Typography>
          <Stack direction="vertical" gap={4} className="justify-center mt-8">
            <Link href="/demo">
              <Button size="lg" className="px-10 text-lg font-bold bg-primary-600 hover:bg-primary-500 border-none shadow-[0_0_40px_rgba(14,165,233,0.3)] w-full sm:w-auto group">
                Mulai Trial Gratis <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/tools/pricing-calculator">
              <Button variant="outline" size="lg" className="px-10 text-lg border-slate-700 hover:bg-slate-800 text-white w-full sm:w-auto">
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
const MobileFrame: React.FC<{children: React.ReactNode}> = ({ children }) => (
  <div className="relative mx-auto border-slate-800 bg-slate-950 border-[12px] md:border-[14px] rounded-[2.5rem] md:rounded-[3rem] h-[650px] md:h-[720px] w-[320px] md:w-[360px] shadow-2xl flex flex-col overflow-hidden ring-1 ring-slate-700/50 transform transition-transform duration-500 hover:scale-[1.02]">
    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none z-30"></div>
    <div className="h-[32px] w-[3px] bg-slate-700 absolute -left-[15px] md:-left-[17px] top-[80px] rounded-l-lg"></div>
    <div className="h-[46px] w-[3px] bg-slate-700 absolute -left-[15px] md:-left-[17px] top-[140px] rounded-l-lg"></div>
    <div className="h-[64px] w-[3px] bg-slate-700 absolute -right-[15px] md:-right-[17px] top-[160px] rounded-r-lg"></div>
    <div className="rounded-[2rem] overflow-hidden w-full h-full bg-slate-50 dark:bg-slate-950 relative flex flex-col">
      <div className="h-10 bg-slate-950 flex justify-between items-center px-6 text-[10px] text-white select-none z-20 shrink-0">
        <span>9:41</span>
        <div className="w-20 h-5 bg-black rounded-b-2xl absolute left-1/2 -translate-x-1/2 top-0"></div>
        <div className="flex gap-1.5">
          <span className="text-xs">📶</span>
          <div className="w-5 h-2.5 bg-white rounded"></div>
        </div>
      </div>
      {children}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-slate-400/50 rounded-full z-20 backdrop-blur-sm"></div>
    </div>
  </div>
);

// Desktop Frame Component
const DesktopFrame: React.FC<{children: React.ReactNode, role: string}> = ({ children, role }) => (
  <div className="w-full aspect-[16/10] bg-slate-900 rounded-xl md:rounded-2xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col ring-4 ring-slate-900/50 relative transform transition-transform duration-500 hover:scale-[1.01]">
    <div className="h-8 md:h-10 bg-slate-800 border-b border-slate-700 flex items-center px-4 select-none">
      <div className="flex gap-1.5 md:gap-2">
        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#ff5f56]"></div>
        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#ffbd2e]"></div>
        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#27c93f]"></div>
      </div>
      <div className="ml-4 flex-1 bg-slate-900/80 rounded-md h-5 md:h-6 flex items-center px-3 text-[10px] md:text-xs text-slate-400 border border-slate-800/50 shadow-inner overflow-hidden whitespace-nowrap">
        <span className="text-slate-500 mr-1">https://</span>app.bizops.id/desk
      </div>
    </div>
    <div className="flex-1 flex overflow-hidden bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-white">
      <div className="w-48 md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col p-3 md:p-4 hidden sm:flex shrink-0">
        <div className="flex items-center gap-3 mb-6 md:mb-8 text-white font-bold text-base md:text-lg px-2">
          <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center text-xs md:text-sm shadow-lg shadow-primary-900/50">B</div>
          <span className="tracking-tight">BizOps</span>
        </div>
        <Stack direction="vertical" gap={1}>
          <div className="px-3 py-2 md:py-2.5 bg-primary-600/10 text-primary-400 rounded-lg text-xs md:text-sm font-medium flex items-center gap-3 border border-primary-500/10">
            <BarChart3 className="w-3.5 h-3.5 md:w-4 md:h-4" /> Dashboard
          </div>
          <div className="px-3 py-2 md:py-2.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200 rounded-lg text-xs md:text-sm font-medium flex items-center gap-3 transition-colors cursor-pointer">
            <Bell className="w-3.5 h-3.5 md:w-4 md:h-4" /> Inbox <span className="ml-auto bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-md font-bold shadow-md shadow-red-500/20">3</span>
          </div>
          <div className="px-3 py-2 md:py-2.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200 rounded-lg text-xs md:text-sm font-medium flex items-center gap-3 transition-colors cursor-pointer">
            <FileText className="w-3.5 h-3.5 md:w-4 md:h-4" /> Reports
          </div>
        </Stack>
        <div className="mt-auto flex items-center gap-3 pt-4 border-t border-slate-800/50">
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs text-white font-bold shadow-md border border-white/10">
            {role.charAt(0)}
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="text-xs font-bold text-white truncate">{role}</div>
            <div className="text-[10px] text-emerald-400 flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div> Online
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col relative overflow-hidden bg-slate-900">
        <div className="h-12 md:h-16 border-b border-slate-800 flex items-center justify-between px-4 md:px-6 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 z-10">
          <div className="text-xs md:text-sm font-medium text-slate-400 flex items-center gap-2">
            <span className="text-slate-500">Workspace</span> <ChevronRight className="w-3 h-3"/> <span className="text-white">Desk</span>
          </div>
        </div>
        <div className="flex-1 relative p-4 md:p-8 overflow-y-auto bg-[#0B1120] bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]">
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
      <div className="h-full w-full flex flex-col items-center justify-center text-center p-6">
        <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-green-400/20 to-emerald-600/20 rounded-full flex items-center justify-center mb-6 ring-1 ring-green-500/30 animate-bounce-slow">
          <Check className="w-10 h-10 md:w-12 md:h-12 text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]" />
        </div>
        <Typography variant="h3" as="h3">Task Completed!</Typography>
        <Typography variant="small" className="text-slate-400 leading-relaxed">Bayangkan efisiensi ini dikalikan dengan ribuan transaksi.</Typography>
        <Stack direction="vertical" gap={3} className="w-full max-w-xs mt-6">
          <Link href="/demo" className="w-full">
            <Button size="md" fullWidth className="shadow-xl shadow-primary-500/20 bg-primary-600 hover:bg-primary-500 border-none h-12 text-base">Mulai Trial Gratis</Button>
          </Link>
          <button onClick={onReset} className="text-sm text-slate-500 hover:text-white transition-colors flex items-center justify-center gap-2 py-2 group">
            <RefreshCw className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" /> Ulangi Simulasi
          </button>
        </Stack>
      </div>
    );
  }

  // SALES SCENARIO
  if (id === 'sales') {
    if (step === 0) {
      return (
        <div className="h-full flex flex-col bg-slate-950">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900 sticky top-0 z-10">
            <div className="font-bold text-lg text-white">Quotations</div>
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center active:scale-90 transition-transform"><Plus className="w-5 h-5 text-primary-500"/></div>
          </div>
          <Stack direction="vertical" gap={4} className="flex-1 p-4 overflow-y-auto">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-5 rounded-2xl shadow-lg mb-4 text-white relative overflow-hidden">
              <div className="text-xs text-blue-200 font-bold uppercase tracking-wider mb-1">Sales Target (Oct)</div>
              <div className="flex justify-between items-end">
                <div className="text-3xl font-bold">85%</div>
                <div className="text-sm text-blue-100">IDR 850jt</div>
              </div>
              <div className="h-1.5 w-full bg-black/20 mt-3 rounded-full overflow-hidden backdrop-blur-sm">
                <div className="h-full w-[85%] bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
              </div>
            </div>
            <div className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider px-1">Recent Drafts</div>
            {[1, 2].map((i) => (
              <div key={i} className="p-4 rounded-2xl border border-slate-800 bg-slate-900/50 flex justify-between items-center hover:bg-slate-800 transition-colors">
                <div>
                  <div className="font-bold text-slate-200">PT Sumber Makmur</div>
                  <div className="text-xs text-slate-500 mt-1">QT-2023-00{i} • IDR 25.000.000</div>
                </div>
                <Badge variant="outline" size="sm" className="border-slate-700 text-slate-400">Draft</Badge>
              </div>
            ))}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 w-full max-w-[300px] px-4">
              <Button size="md" onClick={onNext} className="w-full rounded-xl h-12 shadow-xl shadow-primary-500/30 animate-pulse bg-primary-600 hover:bg-primary-500 text-white font-bold border-none">
                + Buat Penawaran Baru
              </Button>
            </div>
          </Stack>
        </div>
      );
    }
    if (step === 1) {
      return (
        <div className="h-full flex flex-col bg-slate-950">
          <Stack direction="vertical" gap={5} className="flex-1 p-4">
            <Stack direction="vertical" gap={2}>
              <Typography variant="small" className="text-xs font-bold text-slate-500 uppercase">Customer</Typography>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-sm font-medium text-white flex justify-between items-center shadow-sm">
                PT Mitra Abadi Teknik
                <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center"><Check className="w-3 h-3 text-green-500" /></div>
              </div>
            </Stack>
            <Stack direction="vertical" gap={2}>
              <Typography variant="small" className="text-xs font-bold text-slate-500 uppercase">Items</Typography>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
                <div className="flex justify-between text-sm mb-1 text-white font-medium">
                  <span>MacBook Pro M3</span>
                  <span>x 5</span>
                </div>
                <div className="text-xs text-slate-500">Rp 25.000.000 / unit</div>
              </div>
            </Stack>
            <div className="mt-auto">
              <div className="p-5 bg-slate-800/50 rounded-xl border border-slate-800 mb-4">
                <div className="flex justify-between text-sm text-slate-400 mb-2">
                  <span>Subtotal</span>
                  <span>Rp 125.000.000</span>
                </div>
                <div className="flex justify-between text-sm text-slate-400 mb-4">
                  <span>Tax (11%)</span>
                  <span>Rp 13.750.000</span>
                </div>
                <div className="h-px bg-slate-700 my-3"></div>
                <div className="flex justify-between text-lg font-bold text-white">
                  <span>Total</span>
                  <span className="text-emerald-400">Rp 138.750.000</span>
                </div>
              </div>
              <Button size="md" fullWidth onClick={onNext} className="h-12 text-base font-bold bg-primary-600 hover:bg-primary-500 border-none shadow-lg shadow-primary-900/50">Simpan & Kirim</Button>
            </div>
          </Stack>
        </div>
      );
    }
    if (step === 2) {
      return (
        <div className="h-full flex flex-col bg-slate-950">
          <Stack direction="vertical" gap={6} className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-20 h-20 bg-slate-900 rounded-3xl border border-slate-800 flex items-center justify-center shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-primary-500/10 blur-xl"></div>
              <FileText className="w-10 h-10 text-primary-500 relative z-10" />
            </div>
            <div>
              <Typography variant="h3" as="h3">Quotation Created!</Typography>
              <Typography variant="small" className="text-slate-500">QT-2023-088 siap dikirim.</Typography>
            </div>
            <Stack direction="vertical" gap={3} className="w-full">
              <button onClick={onNext} className="w-full p-4 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl font-bold flex items-center justify-center gap-3 transition-transform active:scale-95 shadow-lg shadow-green-900/20">
                <Send className="w-5 h-5" /> Kirim via WhatsApp
              </button>
              <button onClick={onNext} className="w-full p-4 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 rounded-xl font-bold flex items-center justify-center gap-3 transition-colors">
                <Users className="w-5 h-5" /> Kirim Email
              </button>
            </Stack>
          </Stack>
        </div>
      );
    }
  }

  // Simplified scenarios for other roles
  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-6">
      <div className="mb-6">
        <Typography variant="h3" as="h3" className="mb-2">{id === 'manager' ? 'Approval Dashboard' : id === 'finance' ? 'Bank Reconciliation' : id === 'ceo' ? 'Executive Dashboard' : id === 'warehouse' ? 'Warehouse Scanner' : 'HR Dashboard'}</Typography>
        <Typography variant="small" className="text-slate-400">Step {step + 1} of 3</Typography>
      </div>
      <div className="w-32 h-32 bg-slate-800 rounded-2xl flex items-center justify-center mb-6">
        {id === 'manager' && <Briefcase className="w-16 h-16 text-purple-400" />}
        {id === 'finance' && <DollarSign className="w-16 h-16 text-emerald-400" />}
        {id === 'ceo' && <BarChart3 className="w-16 h-16 text-indigo-400" />}
        {id === 'warehouse' && <Package className="w-16 h-16 text-amber-400" />}
        {id === 'employee' && <UserCheck className="w-16 h-16 text-pink-400" />}
      </div>
      <Button onClick={onNext} size="lg" className="bg-primary-600 hover:bg-primary-500">Continue Scenario</Button>
    </div>
  );
};

