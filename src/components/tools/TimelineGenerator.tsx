'use client';

import type { TimelineInput } from '@/data/timelineData';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Box,
  Calendar,
  CheckSquare,
  ChevronDown,
  ChevronUp,
  ClipboardList,
  Database,
  Download,
  FileText,
  RefreshCw,
  ShieldAlert,
  Users,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import Button from '@/components/ui/Button';
import { calculateTimeline } from '@/data/timelineData';
import ToolsNavigation from './ToolsNavigation';

export default function TimelineGenerator() {
  const [step, setStep] = useState<'input' | 'result'>('input');
  const [input, setInput] = useState<TimelineInput>({
    employeeCount: 50,
    modules: ['finance', 'inventory'],
    dataReadiness: 'ready',
    teamAvailability: 'full',
    customizationLevel: 'none',
  });

  const [expandedPhase, setExpandedPhase] = useState<string | null>(null);

  const result = useMemo(() => calculateTimeline(input), [input]);

  const handleGenerate = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStep('result');
  };

  const togglePhase = (id: string) => {
    setExpandedPhase(expandedPhase === id ? null : id);
  };

  // Helper to format weeks
  const formatWeeks = (days: number) => {
    const weeks = Math.ceil(days / 5);
    return `${weeks} Minggu`;
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 pt-24 pb-24 transition-colors duration-300 dark:bg-slate-950">
      {/* Background */}
      <div className="pointer-events-none absolute top-0 left-0 z-0 size-full overflow-hidden">
        <div className="absolute -top-[10%] -right-[10%] size-[40%] rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute -bottom-[10%] -left-[10%] size-[40%] rounded-full bg-purple-500/10 blur-[100px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-100 px-3 py-1 text-xs font-bold tracking-wider text-blue-600 uppercase dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
            <Calendar className="size-4" />
            {' '}
            Project Planner
          </div>
          <h1 className="mb-4 text-3xl leading-tight font-bold text-slate-900 md:text-5xl dark:text-white">
            Estimasi Waktu Implementasi
            {' '}
            <br />
            {' '}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Secara Realistis
            </span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Setiap perusahaan berbeda. Masukkan parameter proyek Anda untuk mendapatkan Timeline & Resource Plan yang
            akurat.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {step === 'input' ? (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-xl md:p-12 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="grid gap-10 md:grid-cols-2">
                {/* Col 1 */}
                <div className="space-y-8">
                  <div>
                    <label className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                      <Users className="text-primary-500 size-4" />
                      {' '}
                      Skala Perusahaan (Karyawan)
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="1000"
                      step="10"
                      value={input.employeeCount}
                      onChange={e => setInput({ ...input, employeeCount: Number.parseInt(e.target.value) })}
                      className="accent-primary-600 h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 dark:bg-slate-700"
                    />
                    <div className="mt-2 flex justify-between text-xs font-medium text-slate-500">
                      <span>Small (10)</span>
                      <span className="text-primary-600 text-sm font-bold">
                        {input.employeeCount}
                        {' '}
                        Users
                      </span>
                      <span>Enterprise (1000+)</span>
                    </div>
                  </div>

                  <div>
                    <label className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                      <Database className="size-4 text-amber-500" />
                      {' '}
                      Kesiapan Data Master
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'ready', label: 'Rapi (Excel)', desc: 'Siap import' },
                        { id: 'partial', label: 'Parsial', desc: 'Butuh cleansing' },
                        { id: 'messy', label: 'Berantakan', desc: 'Butuh overhaul' },
                        { id: 'hardcopy', label: 'Hardcopy', desc: 'Input manual' },
                      ].map(opt => (
                        <button
                          key={opt.id}
                          onClick={() => setInput({ ...input, dataReadiness: opt.id as any })}
                          className={`rounded-xl border p-3 text-left transition-all ${
                            input.dataReadiness === opt.id
                              ? 'border-amber-500 bg-amber-50 text-amber-700 ring-1 ring-amber-500 dark:bg-amber-900/20 dark:text-amber-400'
                              : 'border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800'
                          }`}
                        >
                          <div className="text-sm font-bold">{opt.label}</div>
                          <div className="text-[10px] opacity-80">{opt.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Col 2 */}
                <div className="space-y-8">
                  <div>
                    <label className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                      <CheckSquare className="size-4 text-green-500" />
                      {' '}
                      Ketersediaan Tim Internal
                    </label>
                    <div className="space-y-3">
                      {[
                        {
                          id: 'full',
                          label: 'Dedicated PIC',
                          desc: 'Ada 1 orang fokus penuh mengawal proyek.',
                        },
                        {
                          id: 'partial',
                          label: 'Part-Time',
                          desc: 'Tim sibuk, hanya bisa luangkan waktu 2-3 jam/hari.',
                        },
                        {
                          id: 'none',
                          label: 'Sangat Sibuk',
                          desc: 'Tidak ada waktu khusus, sambil kerja operasional.',
                        },
                      ].map(opt => (
                        <button
                          key={opt.id}
                          onClick={() => setInput({ ...input, teamAvailability: opt.id as any })}
                          className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition-all ${
                            input.teamAvailability === opt.id
                              ? 'border-green-500 bg-green-50 text-green-700 ring-1 ring-green-500 dark:bg-green-900/20 dark:text-green-400'
                              : 'border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800'
                          }`}
                        >
                          <div>
                            <div className="text-sm font-bold">{opt.label}</div>
                            <div className="text-[10px] opacity-80">{opt.desc}</div>
                          </div>
                          {input.teamAvailability === opt.id && <CheckSquare className="size-4" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                      <FileText className="size-4 text-purple-500" />
                      {' '}
                      Kebutuhan Kustomisasi
                    </label>
                    <div className="flex gap-2 rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
                      {['none', 'minor', 'major'].map(level => (
                        <button
                          key={level}
                          onClick={() => setInput({ ...input, customizationLevel: level as any })}
                          className={`flex-1 rounded-lg py-2 text-sm font-medium capitalize transition-all ${
                            input.customizationLevel === level
                              ? 'text-primary-600 bg-white shadow dark:bg-slate-700 dark:text-white'
                              : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex justify-end border-t border-slate-100 pt-8 dark:border-slate-800">
                <Button onClick={handleGenerate} size="lg" className="shadow-primary-500/20 gap-2 shadow-lg">
                  Generate Timeline Project
                  {' '}
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </motion.div>
          ) : (
            /* --- RESULT VIEW --- */
            <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <div className="mb-2 text-xs font-bold text-slate-400 uppercase">Total Durasi</div>
                  <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
                    {formatWeeks(result.totalDays)}
                  </div>
                  <p className="mt-1 text-xs text-slate-500">Estimasi Go-Live realistis.</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <div className="mb-2 text-xs font-bold text-slate-400 uppercase">Tingkat Kompleksitas</div>
                  <div className="text-primary-600 dark:text-primary-400 text-3xl font-extrabold capitalize">
                    {result.complexity}
                  </div>
                  <p className="mt-1 text-xs text-slate-500">Berdasarkan skala & kustomisasi.</p>
                </div>
                <div
                  className={`rounded-2xl border p-6 shadow-sm ${
                    result.riskFactor === 'high'
                      ? 'border-red-200 bg-red-50 dark:border-red-900/30 dark:bg-red-900/10'
                      : 'border-emerald-200 bg-emerald-50 dark:border-emerald-900/30 dark:bg-emerald-900/10'
                  }`}
                >
                  <div
                    className={`mb-2 text-xs font-bold uppercase ${result.riskFactor === 'high' ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'}`}
                  >
                    Faktor Risiko
                  </div>
                  <div
                    className={`text-3xl font-extrabold capitalize ${result.riskFactor === 'high' ? 'text-red-700 dark:text-red-300' : 'text-emerald-700 dark:text-emerald-300'}`}
                  >
                    {result.riskFactor === 'high' ? 'Tinggi' : 'Rendah'}
                  </div>
                  <p
                    className={`mt-1 text-xs ${result.riskFactor === 'high' ? 'text-red-600/80' : 'text-emerald-600/80'}`}
                  >
                    {result.riskFactor === 'high'
                      ? 'Perbaiki data/tim untuk mengurangi risiko.'
                      : 'Kondisi proyek optimal.'}
                  </p>
                </div>
              </div>

              {/* INTERACTIVE GANTT CHART */}
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-8 flex items-center justify-between">
                  <h3 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
                    <BarChart3 className="text-primary-500 size-5" />
                    {' '}
                    Project Schedule
                  </h3>
                  <div className="flex gap-4 text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                      <div className="size-3 rounded-full bg-blue-500" />
                      {' '}
                      Planning
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="size-3 rounded-full bg-amber-500" />
                      {' '}
                      Data
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="size-3 rounded-full bg-green-500" />
                      {' '}
                      Launch
                    </div>
                  </div>
                </div>

                <div className="relative overflow-x-auto pb-4">
                  <div className="min-w-[800px]">
                    {/* Weeks Header */}
                    <div className="mb-4 flex border-b border-slate-100 pb-2 dark:border-slate-800">
                      <div className="w-1/4 text-xs font-bold text-slate-400 uppercase">Phase & Detail</div>
                      <div className="relative flex w-3/4">
                        {Array.from({ length: result.totalWeeks + 2 }).map((_, i) => (
                          <div
                            key={i}
                            className="flex-1 border-l border-dashed border-slate-100 text-center text-[10px] text-slate-400 dark:border-slate-800"
                          >
                            W
                            {i + 1}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Phases Bars */}
                    <div className="space-y-6">
                      {result.phases.map(phase => (
                        <div key={phase.id} className="group">
                          <div
                            className="-mx-2 flex cursor-pointer items-center rounded-lg p-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
                            onClick={() => togglePhase(phase.id)}
                          >
                            <div className="w-1/4 pr-4">
                              <div className="flex items-center justify-between">
                                <div className="text-sm font-bold text-slate-800 dark:text-white">{phase.title}</div>
                                {expandedPhase === phase.id
                                  ? (
                                      <ChevronUp className="size-4 text-slate-400" />
                                    )
                                  : (
                                      <ChevronDown className="size-4 text-slate-400" />
                                    )}
                              </div>
                              <div className="text-[10px] text-slate-500">
                                {phase.duration}
                                {' '}
                                Hari Kerja
                              </div>
                            </div>
                            <div className="relative h-8 w-3/4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(phase.duration / (result.totalDays + 10)) * 100}%` }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className={`absolute top-1 bottom-1 flex items-center rounded-md px-2 opacity-90 shadow-sm transition-opacity hover:opacity-100 ${phase.color}`}
                                style={{
                                  left: `${(phase.startDay / (result.totalDays + 10)) * 100}%`,
                                }}
                              >
                                {phase.duration > 3 && (
                                  <span className="truncate text-[10px] font-bold text-white">
                                    {phase.duration}
                                    d
                                  </span>
                                )}
                              </motion.div>
                            </div>
                          </div>

                          {/* EXPANDED DETAIL PANEL */}
                          <AnimatePresence>
                            {expandedPhase === phase.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="mt-2 ml-4 grid gap-6 rounded-xl border border-slate-100 bg-slate-50 p-4 md:grid-cols-4 dark:border-slate-800 dark:bg-slate-800/50">
                                  {/* Preparation */}
                                  <div>
                                    <h4 className="mb-2 flex items-center gap-2 text-xs font-bold tracking-wider text-slate-500 uppercase">
                                      <ClipboardList className="size-3" />
                                      {' '}
                                      Preparation
                                    </h4>
                                    <ul className="space-y-1">
                                      {phase.preparation.map((item, i) => (
                                        <li
                                          key={i}
                                          className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300"
                                        >
                                          <span className="mt-1 size-1 rounded-full bg-slate-400" />
                                          {' '}
                                          {item}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>

                                  {/* Roles */}
                                  <div>
                                    <h4 className="mb-2 flex items-center gap-2 text-xs font-bold tracking-wider text-slate-500 uppercase">
                                      <Users className="size-3" />
                                      {' '}
                                      Key Roles
                                    </h4>
                                    <ul className="space-y-1">
                                      {phase.roles.map((item, i) => (
                                        <li
                                          key={i}
                                          className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300"
                                        >
                                          <span className="mt-1 size-1 rounded-full bg-blue-400" />
                                          {' '}
                                          {item}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>

                                  {/* Deliverables */}
                                  <div>
                                    <h4 className="mb-2 flex items-center gap-2 text-xs font-bold tracking-wider text-slate-500 uppercase">
                                      <Box className="size-3" />
                                      {' '}
                                      Deliverables
                                    </h4>
                                    <ul className="space-y-1">
                                      {phase.deliverables.map((item, i) => (
                                        <li
                                          key={i}
                                          className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300"
                                        >
                                          <CheckSquare className="mt-0.5 size-3 flex-shrink-0 text-emerald-500" />
                                          {' '}
                                          {item}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>

                                  {/* Risks */}
                                  <div>
                                    <h4 className="mb-2 flex items-center gap-2 text-xs font-bold tracking-wider text-slate-500 uppercase">
                                      <ShieldAlert className="size-3 text-amber-500" />
                                      {' '}
                                      Risk Watch
                                    </h4>
                                    <ul className="space-y-1">
                                      {phase.risks.map((item, i) => (
                                        <li
                                          key={i}
                                          className="flex items-start gap-2 text-xs text-amber-700 dark:text-amber-400"
                                        >
                                          <AlertTriangle className="mt-0.5 size-3 flex-shrink-0" />
                                          {' '}
                                          {item}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
                <Button variant="outline" onClick={() => setStep('input')} className="gap-2">
                  <RefreshCw className="size-4" />
                  {' '}
                  Ubah Parameter
                </Button>
                <Button onClick={() => window.print()} className="shadow-primary-500/20 gap-2 shadow-lg">
                  <Download className="size-4" />
                  {' '}
                  Download Proposal PDF
                </Button>
              </div>

              {/* Cross-Tool Navigation */}
              <ToolsNavigation
                currentTool="timeline-generator"
                title="Langkah Selanjutnya"
                description="Setelah mengetahui timeline, saatnya menghitung ROI dan mempersiapkan budget:"
                recommendedNext={['roi-calculator', 'pricing-calculator', 'needs-analysis']}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
