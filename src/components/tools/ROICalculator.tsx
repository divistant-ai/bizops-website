'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertTriangle,
  Building2,
  Calculator,
  Clock,
  Database,
  Download,
  FileText,
  Mail,
  Phone,
  Settings,
  TrendingUp,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import ToolsNavigation from './ToolsNavigation';

// Pricing Tiers for Comparison
const PRICING_TIERS = [
  { id: 'starter', name: 'Starter Plan', cost: 2500000, label: 'Rp 2.5 Juta/bln' },
  { id: 'growth', name: 'Growth Plan', cost: 7500000, label: 'Rp 7.5 Juta/bln' },
  { id: 'scale', name: 'Scale Plan', cost: 15000000, label: 'Rp 15 Juta/bln' },
];

export default function ROICalculator() {
  // --- STATE ---
  const [adminCount, setAdminCount] = useState(3);
  const [salary, setSalary] = useState(6000000);
  const [overtime, setOvertime] = useState(20);
  const [losses, setLosses] = useState(50000000);
  const [existingTechCost, setExistingTechCost] = useState(2000000);
  const [efficiencyRate, setEfficiencyRate] = useState(30);

  const [selectedPlanId, setSelectedPlanId] = useState('growth');

  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadData, setLeadData] = useState({ name: '', company: '', email: '', phone: '' });

  // --- CALCULATIONS ---
  const selectedPlan = PRICING_TIERS.find(p => p.id === selectedPlanId) || PRICING_TIERS[1]!;
  const subscriptionCost = selectedPlan.cost;

  // 1. Efficiency / Productivity Gain
  const efficiencySavings = adminCount * salary * (efficiencyRate / 100);

  // 2. Overtime Savings
  const hourlyRate = salary / 173;
  const overtimeCostPerMonth = adminCount * overtime * hourlyRate * 1.5;
  const overtimeSavings = overtimeCostPerMonth * 0.9;

  // 3. Fraud/Loss Prevention
  const monthlyLossSavings = (losses / 12) * 0.8;

  // 4. IT Cost Reduction (Hard Savings)
  const techSavings = existingTechCost;

  const totalMonthlySavings = efficiencySavings + overtimeSavings + monthlyLossSavings + techSavings;
  const netMonthlyBenefit = totalMonthlySavings - subscriptionCost;
  const roiPercentage = subscriptionCost > 0 ? (netMonthlyBenefit / subscriptionCost) * 100 : 0;
  const paybackMonths = totalMonthlySavings > 0 ? subscriptionCost / totalMonthlySavings : 0;
  const annualSavings = totalMonthlySavings * 12;

  // --- FORMATTERS ---
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(val);
  };

  const formatCompactCurrency = (val: number) => {
    if (val >= 1000000000) {
      return `Rp ${(val / 1000000000).toFixed(1)} M`;
    }
    if (val >= 1000000) {
      return `Rp ${(val / 1000000).toFixed(1)} Jt`;
    }
    return formatCurrency(val);
  };

  // --- HANDLERS ---
  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowLeadForm(false);
    window.print();
  };

  const handleReset = () => {
    setAdminCount(3);
    setSalary(6000000);
    setOvertime(20);
    setLosses(50000000);
    setExistingTechCost(2000000);
    setEfficiencyRate(30);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 pt-24 pb-24 text-white">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute top-0 left-0 z-0 size-full overflow-hidden">
        <div className="absolute -top-[10%] -right-[10%] size-[50%] rounded-full bg-blue-900/10 blur-[120px]" />
        <div className="absolute -bottom-[10%] -left-[10%] size-[50%] rounded-full bg-emerald-900/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400">
            <Calculator className="size-4" />
            {' '}
            ROI Calculator
          </div>
          <h1 className="mb-6 text-4xl leading-tight font-bold text-white md:text-5xl lg:text-6xl">
            Hitung Nilai Investasi
            {' '}
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Transformasi Digital
            </span>
          </h1>
          <p className="text-lg text-slate-400">
            Jangan hanya menebak. Gunakan data operasional Anda untuk mengestimasi penghematan biaya nyata dan waktu
            balik modal (BEP).
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* LEFT: INPUTS */}
          <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-xl lg:col-span-5">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="flex items-center gap-3 text-xl font-bold text-white">
                <Settings className="size-5 text-blue-400" />
                Parameter Operasional
              </h2>
              <button onClick={handleReset} className="text-xs text-slate-500 transition-colors hover:text-white">
                Reset Default
              </button>
            </div>

            <div className="space-y-8">
              {/* 1. Admin Count */}
              <div>
                <div className="mb-2 flex justify-between">
                  <label className="text-sm font-medium text-slate-300">Jumlah Staf Admin</label>
                  <span className="rounded bg-blue-400/10 px-2 py-0.5 text-sm font-bold text-blue-400">
                    {adminCount}
                    {' '}
                    Orang
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={adminCount}
                  onChange={e => setAdminCount(Number.parseInt(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-800 accent-blue-500 hover:accent-blue-400"
                />
              </div>

              {/* 2. Salary & Efficiency */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">Gaji Rata-rata</label>
                  <div className="group relative">
                    <span className="absolute top-3 left-3 text-xs text-slate-500">Rp</span>
                    <input
                      type="number"
                      value={salary}
                      onChange={e => setSalary(Number.parseInt(e.target.value))}
                      className="[&:-webkit-autofill]:-webkit-text-fill-color-white w-full rounded-xl border border-white/10 bg-slate-950 py-2.5 pr-2 pl-8 text-sm text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 [&:-webkit-autofill]:shadow-[0_0_0_100px_#0f172a_inset]"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">Estimasi Efisiensi</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="10"
                      max="90"
                      step="5"
                      value={efficiencyRate}
                      onChange={e => setEfficiencyRate(Number.parseInt(e.target.value))}
                      className="h-2 flex-1 cursor-pointer appearance-none rounded-lg bg-slate-800 accent-emerald-500"
                    />
                    <span className="w-10 text-sm font-bold text-emerald-400">
                      {efficiencyRate}
                      %
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">
                    Persentase waktu yang dihemat staf admin setelah tugas rutin diotomatisasi (Contoh: Input data,
                    rekap laporan).
                  </p>
                </div>
              </div>

              {/* 3. Overtime */}
              <div>
                <div className="mb-2 flex justify-between">
                  <label className="text-sm font-medium text-slate-300">Lembur (Jam/Orang/Bulan)</label>
                  <span className="rounded bg-amber-400/10 px-2 py-0.5 text-sm font-bold text-amber-400">
                    {overtime}
                    {' '}
                    Jam
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={overtime}
                  onChange={e => setOvertime(Number.parseInt(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-800 accent-amber-500 hover:accent-amber-400"
                />
              </div>

              {/* 4. Losses & Existing Cost */}
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Estimasi Kebocoran (IDR/Tahun)
                  </label>
                  <div className="relative">
                    <span className="absolute top-3.5 left-4 text-sm text-slate-500">Rp</span>
                    <input
                      type="number"
                      value={losses}
                      onChange={e => setLosses(Number.parseInt(e.target.value))}
                      className="[&:-webkit-autofill]:-webkit-text-fill-color-white w-full rounded-xl border border-white/10 bg-slate-950 py-3 pr-4 pl-10 text-white outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 [&:-webkit-autofill]:shadow-[0_0_0_100px_#0f172a_inset]"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Biaya Aplikasi/Server Lama (IDR/Bulan)
                  </label>
                  <div className="relative">
                    <span className="absolute top-3.5 left-4 text-sm text-slate-500">Rp</span>
                    <input
                      type="number"
                      value={existingTechCost}
                      onChange={e => setExistingTechCost(Number.parseInt(e.target.value))}
                      className="[&:-webkit-autofill]:-webkit-text-fill-color-white w-full rounded-xl border border-white/10 bg-slate-950 py-3 pr-4 pl-10 text-white outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 [&:-webkit-autofill]:shadow-[0_0_0_100px_#0f172a_inset]"
                    />
                  </div>
                  <p className="mt-2 text-xs text-slate-500">
                    Biaya maintenance, hosting, atau langganan aplikasi yang bisa dihentikan.
                  </p>
                </div>
              </div>

              <hr className="border-white/5" />

              {/* Plan Selection */}
              <div>
                <label className="mb-3 block text-sm font-medium text-slate-300">Pilih Paket BizOps</label>
                <div className="grid grid-cols-3 gap-2">
                  {PRICING_TIERS.map(plan => (
                    <button
                      key={plan.id}
                      onClick={() => setSelectedPlanId(plan.id)}
                      className={`rounded-lg border px-3 py-2 text-xs font-medium transition-all ${
                        selectedPlanId === plan.id
                          ? 'border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                          : 'border-white/10 bg-slate-950 text-slate-400 hover:bg-slate-900'
                      }`}
                    >
                      {plan.name}
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-right text-xs text-slate-500">
                  Biaya:
                  {' '}
                  {formatCurrency(subscriptionCost)}
                  /bulan
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: RESULTS */}
          <div className="space-y-6 lg:col-span-7">
            {/* Savings Breakdown Cards - 2x2 Grid */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Efficiency */}
              <div className="group rounded-2xl border border-white/5 bg-slate-900/50 p-5 backdrop-blur-sm transition-all hover:bg-slate-900">
                <div className="mb-2 flex items-start justify-between">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 transition-transform group-hover:scale-110">
                    <TrendingUp className="size-5" />
                  </div>
                  <span className="rounded bg-blue-500/10 px-2 py-1 text-xs font-bold text-blue-400">
                    Soft Savings
                  </span>
                </div>
                <h3 className="mb-1 text-xs font-bold tracking-wide text-slate-400 uppercase">Nilai Produktivitas</h3>
                <div className="text-xl font-bold text-white">
                  {formatCompactCurrency(efficiencySavings)}
                  <span className="text-xs font-normal text-slate-500">/bln</span>
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  Efisiensi
                  {' '}
                  {efficiencyRate}
                  % dari
                  {' '}
                  {adminCount}
                  {' '}
                  staf.
                </p>
              </div>

              {/* Overtime */}
              <div className="group rounded-2xl border border-white/5 bg-slate-900/50 p-5 backdrop-blur-sm transition-all hover:bg-slate-900">
                <div className="mb-2 flex items-start justify-between">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 transition-transform group-hover:scale-110">
                    <Clock className="size-5" />
                  </div>
                  <span className="rounded bg-amber-500/10 px-2 py-1 text-xs font-bold text-amber-400">
                    Hard Savings
                  </span>
                </div>
                <h3 className="mb-1 text-xs font-bold tracking-wide text-slate-400 uppercase">Penghematan Lembur</h3>
                <div className="text-xl font-bold text-white">
                  {formatCompactCurrency(overtimeSavings)}
                  <span className="text-xs font-normal text-slate-500">/bln</span>
                </div>
                <p className="mt-2 text-xs text-slate-500">Mengurangi 90% lembur manual.</p>
              </div>

              {/* Fraud */}
              <div className="group rounded-2xl border border-white/5 bg-slate-900/50 p-5 backdrop-blur-sm transition-all hover:bg-slate-900">
                <div className="mb-2 flex items-start justify-between">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-red-500/10 text-red-400 transition-transform group-hover:scale-110">
                    <AlertTriangle className="size-5" />
                  </div>
                  <span className="rounded bg-red-500/10 px-2 py-1 text-xs font-bold text-red-400">
                    Risk Avoidance
                  </span>
                </div>
                <h3 className="mb-1 text-xs font-bold tracking-wide text-slate-400 uppercase">Loss Prevention</h3>
                <div className="text-xl font-bold text-white">
                  {formatCompactCurrency(monthlyLossSavings)}
                  <span className="text-xs font-normal text-slate-500">/bln</span>
                </div>
                <p className="mt-2 text-xs text-slate-500">Mengurangi 80% risiko kebocoran.</p>
              </div>

              {/* Tech Cost Savings */}
              <div className="group rounded-2xl border border-white/5 bg-slate-900/50 p-5 backdrop-blur-sm transition-all hover:bg-slate-900">
                <div className="mb-2 flex items-start justify-between">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 transition-transform group-hover:scale-110">
                    <Database className="size-5" />
                  </div>
                  <span className="rounded bg-purple-500/10 px-2 py-1 text-xs font-bold text-purple-400">
                    Hard Savings
                  </span>
                </div>
                <h3 className="mb-1 text-xs font-bold tracking-wide text-slate-400 uppercase">Tech Cost Reduction</h3>
                <div className="text-xl font-bold text-white">
                  {formatCompactCurrency(techSavings)}
                  <span className="text-xs font-normal text-slate-500">/bln</span>
                </div>
                <p className="mt-2 text-xs text-slate-500">Biaya sistem lama yang dihapus.</p>
              </div>
            </div>

            {/* MAIN HERO RESULT */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-8 text-center shadow-2xl md:p-10 md:text-left">
              <div className="relative z-10 flex flex-col items-center gap-8 md:flex-row md:justify-between">
                <div className="flex-1">
                  <h2 className="mb-2 text-sm font-bold tracking-widest text-slate-400 uppercase">
                    Total Penghematan Tahunan
                  </h2>
                  <div className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                    {formatCompactCurrency(annualSavings)}
                  </div>

                  <div className="flex flex-wrap justify-center gap-4 md:justify-start">
                    <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2">
                      <div className="rounded-full bg-emerald-500 p-1 text-black">
                        <TrendingUp className="size-3" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-medium text-emerald-300">ROI Year 1</div>
                        <div className="text-lg font-bold text-emerald-400">
                          {roiPercentage.toFixed(0)}
                          %
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-2">
                      <div className="rounded-full bg-blue-500 p-1 text-white">
                        <Clock className="size-3" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-medium text-blue-300">Break Even</div>
                        <div className="text-lg font-bold text-blue-400">
                          {paybackMonths < 1 ? '< 1 Bulan' : `${paybackMonths.toFixed(1)} Bulan`}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex min-w-[200px] flex-col gap-3 md:w-auto">
                  <Button
                    onClick={() => setShowLeadForm(true)}
                    size="lg"
                    className="w-full border-none bg-white font-bold text-slate-950 shadow-xl shadow-white/10 hover:bg-slate-200"
                  >
                    <Download className="mr-2 size-4" />
                    {' '}
                    Unduh Proposal
                  </Button>
                  <Link href="/contact" className="w-full">
                    <Button
                      variant="outline-white"
                      className="w-full border-white/20 text-slate-300 hover:bg-white/5 hover:text-white"
                    >
                      Validasi Angka Ini
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Decor */}
              <div className="pointer-events-none absolute top-0 right-0 size-64 rounded-full bg-emerald-500/10 blur-[80px]" />
              <div className="pointer-events-none absolute bottom-0 left-0 size-64 rounded-full bg-blue-500/10 blur-[80px]" />
            </div>

            {/* Disclaimer */}
            <div className="flex items-start gap-4 rounded-2xl border border-white/5 bg-slate-900/30 p-6">
              <div className="mt-1 rounded-lg bg-slate-800 p-2 text-slate-400">
                <AlertTriangle className="size-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-300">Catatan Analis</h4>
                <p className="mt-1 text-sm leading-relaxed text-slate-500">
                  Perhitungan ini adalah estimasi konservatif (asumsi efisiensi 30%). Banyak klien kami melaporkan
                  {' '}
                  <strong>Intangible Benefits</strong>
                  {' '}
                  yang lebih besar seperti kepuasan karyawan, akurasi data
                  real-time, dan kecepatan pengambilan keputusan strategis.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* --- LEAD FORM MODAL --- */}
        <AnimatePresence>
          {showLeadForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl"
              >
                <button
                  onClick={() => setShowLeadForm(false)}
                  className="absolute top-4 right-4 text-slate-500 hover:text-white"
                >
                  ✕
                </button>

                <div className="mb-6 text-center">
                  <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                    <FileText className="size-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-white">Simpan Kalkulasi ROI</h3>
                  <p className="text-sm text-slate-400">
                    Masukkan detail Anda untuk mengunduh laporan PDF lengkap.
                  </p>
                </div>

                <form onSubmit={handleLeadSubmit} className="space-y-4">
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-400 uppercase">Nama Lengkap</label>
                    <div className="relative">
                      <User className="absolute top-3 left-3 size-4 text-slate-500" />
                      <input
                        required
                        type="text"
                        value={leadData.name}
                        onChange={e => setLeadData({ ...leadData, name: e.target.value })}
                        className="[&:-webkit-autofill]:-webkit-text-fill-color-white w-full rounded-xl border border-white/10 bg-slate-950 py-2.5 pr-4 pl-10 text-white focus:border-emerald-500 focus:outline-none [&:-webkit-autofill]:shadow-[0_0_0_100px_#0f172a_inset]"
                        placeholder="Nama Anda"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-400 uppercase">Perusahaan</label>
                    <div className="relative">
                      <Building2 className="absolute top-3 left-3 size-4 text-slate-500" />
                      <input
                        required
                        type="text"
                        value={leadData.company}
                        onChange={e => setLeadData({ ...leadData, company: e.target.value })}
                        className="[&:-webkit-autofill]:-webkit-text-fill-color-white w-full rounded-xl border border-white/10 bg-slate-950 py-2.5 pr-4 pl-10 text-white focus:border-emerald-500 focus:outline-none [&:-webkit-autofill]:shadow-[0_0_0_100px_#0f172a_inset]"
                        placeholder="Nama PT"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-400 uppercase">Email Bisnis</label>
                    <div className="relative">
                      <Mail className="absolute top-3 left-3 size-4 text-slate-500" />
                      <input
                        required
                        type="email"
                        value={leadData.email}
                        onChange={e => setLeadData({ ...leadData, email: e.target.value })}
                        className="[&:-webkit-autofill]:-webkit-text-fill-color-white w-full rounded-xl border border-white/10 bg-slate-950 py-2.5 pr-4 pl-10 text-white focus:border-emerald-500 focus:outline-none [&:-webkit-autofill]:shadow-[0_0_0_100px_#0f172a_inset]"
                        placeholder="email@kantor.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-400 uppercase">WhatsApp</label>
                    <div className="relative">
                      <Phone className="absolute top-3 left-3 size-4 text-slate-500" />
                      <input
                        type="tel"
                        value={leadData.phone}
                        onChange={e => setLeadData({ ...leadData, phone: e.target.value })}
                        className="[&:-webkit-autofill]:-webkit-text-fill-color-white w-full rounded-xl border border-white/10 bg-slate-950 py-2.5 pr-4 pl-10 text-white focus:border-emerald-500 focus:outline-none [&:-webkit-autofill]:shadow-[0_0_0_100px_#0f172a_inset]"
                        placeholder="0812..."
                      />
                    </div>
                  </div>

                  <Button type="submit" fullWidth className="mt-2 bg-emerald-600 hover:bg-emerald-500">
                    Unduh PDF Sekarang
                  </Button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Cross-Tool Navigation */}
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <ToolsNavigation
            currentTool="roi-calculator"
            title="Lanjutkan Perencanaan"
            description="Setelah mengetahui ROI, lengkapi perencanaan Anda:"
            recommendedNext={['timeline-generator', 'pricing-calculator', 'assessment']}
          />
        </div>
      </div>
    </div>
  );
}
